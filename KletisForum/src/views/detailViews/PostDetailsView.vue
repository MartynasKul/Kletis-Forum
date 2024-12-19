<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useCollections } from '@/composables/getData';
import CommentDisplay from '@/components/displays/CommentDisplay.vue';
import CreateComment from '@/components/CreateComment.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { User } from '@/types/User'
import type { Post } from '@/types/Post';
import type { Tractor } from '@/types/Tractor';
import type { Comment } from '@/types/Comment';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditPost from '@/components/modals/EditPost.vue';
import DeletePost from '@/components/modals/DeletePost.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';


const AuthStore = useAuthStore();
const { data: postData, isLoading: postIsLoading, getCollection: getPostCollection } = useCollections();
const { data: postCommentsData, isLoading: commentsAreLoading, getCollection: getPostCommentsCollection } = useCollections();

const props = defineProps({
    id: { type: String, required: true }
});

onMounted(async () => {
    getPostCollection({ collectionName: 'posts', expand: 'author,tractor', id: props.id });
    getPostCommentsCollection({ collectionName: 'post', expand: 'author', id: `${props.id}/comments` });
});

watch(useModalStore().isTriggerComment, () => {
    getPostCommentsCollection({ collectionName: 'post', expand: 'author', id: `${props.id}/comments` });
});

</script>

<template >
    <div class="flex items-start mx-auto w-full min-h-screen bg-cweam p-4 space-x-6 ">
      <!-- Main Content Area -->
      <div class="flex-1 bg-white rounded-lg shadow-lg p-6 pt-15 shadow-xl">
        <!-- Post Content -->
        <div v-if="!postIsLoading" class="mb-6 bg-JDlightGreen text-JDyellow font-bold justify-center rounded-xl pl-4">
          <h1 class="text-4xl font-bold text-JDyellow mb-2 pt-5 ">
            {{ (postData as Post).title }}
          </h1>
          <p class="text-sm text-gray-500 mb-4 font-bold">
            Autorius: {{ ((postData as Post).author as User)?.username || 'Unknown' }} • 
            {{ new Date((postData as Post).created_at).toLocaleString() }}
          </p>
          <p class="text-base text-black mb-6">{{ (postData as Post).content }}</p>
  
          <!-- Admin Buttons -->
          <div v-if="AuthStore.isAdmin()" class="space-x-4 mb-6 bg-JDdarkestGreen shadow-xl">
            <button
              @click="useModalStore().SetModal({ component: EditPost, componentProps: { id: (postData as Post)._id } })"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-xl"
            >
              Redaguoti skelbimą
            </button>
            <button
              @click="useModalStore().SetModal({ component: DeletePost, componentProps: { id: (postData as Post)._id } })"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 shadow-xl"
            >
                Trinti skelbimą
            </button>
          </div>
  
          <!-- Upvote and Downvote Buttons -->
          <div class="flex space-x-4 shadow-xl">
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 shadow-xl">
              Patinka
            </button>
            <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 shadow-xl">
              Nepatinka
            </button>
          </div>
        </div>
  
        <!-- Comments Section -->
        <div v-if="!commentsAreLoading" class="mt-6">
          <h2 class="text-2xl font-bold text-JDyellow mb-4 bg-JDlightGreen pl-5 rounded-xl">Komentarai</h2>
          <CreateComment v-if="(postData as Post)?._id" :id="(postData as Post)._id" class="w-full mb-6 bg-JDlightGreen rounded-xl shadow-xl"/>
          <CommentDisplay :comments="postCommentsData" />
        </div>
        <NoDataFoundDisplay v-else class="mt-6" />
      </div>
  
      <!-- Sidebar -->
      <aside class="w-1/4 bg-JDlightGreen text-JDyellow p-6 rounded-lg shadow-lg sticky top-4 h-fit pt-15">
        <h3 class="text-2xl font-bold mb-4">{{ ((postData as Post).tractor as Tractor)?.name || 'Unknown Tractor' }}</h3>
        <p class="mb-4">
          <span class="font-semibold">Description:</span> {{ ((postData as Post).tractor as Tractor)?.description || 'No description available' }}
        </p>
        <p>
          <span class="font-semibold">Created By:</span> 
          {{ (((postData as Post).tractor as Tractor)?.created_By as User)?.username || 'Unknown' }}
        </p>
      </aside>
    </div>
  </template>

<style scoped>
.bg-cweam {
  background-color: #FFFEF2; /* Cream */
}

.sticky {
  position: sticky;
  top: 1rem;
}

.w-full {
  width: 100%;
}

.h-fit {
  height: fit-content;
}

.text-JDyellow {
  color: #FDE100;
}

.bg-JDlightGreen {
  background-color: #479829;
}

</style>
