<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useCollections } from '@/composables/getData';
import PostsListDisplay from '@/components/displays/PostsListDisplay.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Tractor } from '@/types/Tractor';
import type { User } from '@/types/User';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditTractor from '@/components/modals/EditTractor.vue';
import DeleteTractor from '@/components/modals/DeleteTractor.vue';
import CreatePostFromTractorPage from '@/components/modals/CreatePostFromTractorPage.vue';

const AuthStore = useAuthStore();
const { data: tractorData, isLoading: tractorIsLoading, getCollection: getTractorCollection } = useCollections();
const { data: tractorPostsData, isLoading: postsAreLoading, getCollection: getTractorPostsCollection, totalCount: totalPosts } = useCollections();

const props = defineProps({
    id: { type: String },
});

onMounted(async () => {
    getTractorCollection({ collectionName: 'tractors', expand: 'created_By', id: props.id });
    getTractorPostsCollection({ collectionName: 'tractor', id: `${props.id}/posts`, expand: 'author,tractor' });
});

watch(useModalStore().isTriggerPosts, () => {
      getTractorPostsCollection({ collectionName: 'tractor', id: `${props.id}/posts`, expand: 'author,tractor' });
});

watch(useModalStore().isTriggerTractors, () => {
    getTractorCollection({ collectionName: 'tractors', expand: 'created_By', id: props.id });
});

// Precompute whether the user can edit/delete
const canEditOrDelete = computed(() => {
    const isAdmin = AuthStore.isAdmin();
    const isCreator =
        (tractorData?.created_By as User | undefined)?._id === AuthStore.currentUser?._id;
    return !tractorIsLoading && (isAdmin || isCreator);
});
</script>


<template>
    <div class="flex items-start mx-auto w-full min-h-screen bg-cweam p-4">
      <!-- Main Content Area (Posts) -->
      <div class="flex-1 pr-4">
        <div class="bg-JDdarkestGreen text-2xl justify-center font-bold text-JDyellow mb-4 rounded-l">
             "{{ (tractorData as Tractor).name }}" Skelbimai
        </div>
        <!-- Posts List -->
        <PostsListDisplay
          v-if="!postsAreLoading && totalPosts !== 0"
          :posts="tractorPostsData"
        />
        <NoDataFoundDisplay v-else class="mt-10" />
      </div>
  
      <!-- Sidebar Section (Tractor Info) -->
      <div class="w-1/4 p-6 bg-JDlightGreen text-JDyellow rounded-lg shadow-lg sticky top-4 h-full">
        <div class="text-3xl font-bold mb-4">{{ (tractorData as Tractor).name }}</div>
        <div class="text-sm mb-4">
          <p class="font-semibold">Description:</p>
          <p class="text-gray-200">{{ (tractorData as Tractor).description }}</p>
        </div>
        <div class="text-sm">
          <p class="font-semibold">Created By:</p>
          <p class="text-gray-200">
            {{ ((tractorData as Tractor).created_By as User)?.username || "Unknown" }}
          </p>
        </div>

        <!-- Add Create Post Button -->
        <div class="w-full mt-4">
          <button
            @click="useModalStore().SetModal({ component: CreatePostFromTractorPage, componentProps: { tractor: props.id } })"
            class="create-post-button w-full"
          >
            Sukurti Skelbimą
          </button>
        </div>
  
        <!-- Edit/Delete Buttons -->
        <div v-if="canEditOrDelete" class="mt-6 flex flex-col space-y-2">
          <button
            @click="useModalStore().SetModal({ component: EditTractor, componentProps: { id: (tractorData as Tractor)._id } })"
            class="button w-full"
          >
            Edit
          </button>
          <button
            @click="useModalStore().SetModal({ component: DeleteTractor, componentProps: { id: (tractorData as Tractor)._id } })"
            class="delete w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  

  <style scoped>
.bg-cweam {
  /* background-color: #FFFEF2; Cream background */
  background-color: #FFFEF2

}

.button {
  background-color: #20720D; /* JDdarkestGreen */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #3B8927; /* JDmidGreen */
}

.delete {
  background-color: #c53030; /* Red for delete */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.delete:hover {
  background-color: #a50000;
}

.sticky {
  position: sticky;
  top: 1rem;
}

.min-h-screen {
  min-height: 100vh; /* Full viewport height */
}

.create-post-button {
  background-color: #20720D; /* JDdarkestGreen */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
}

.create-post-button:hover {
  background-color: #3B8927; /* JDmidGreen */
}
</style>