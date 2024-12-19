<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { editPost } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useCollections } from '@/composables/getData';
import { onMounted, computed } from 'vue';
import type { Post } from '@/types/Post';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';

const { data, isLoading, getCollection, totalCount } = useCollections();

const props = defineProps({
  id: { type: String, required: true },
});

// API logic
const { updateModalData } = useCollectionsUpdater(`posts/${props.id}`);

onMounted(() => {
  getCollection({ collectionName: 'posts', expand: 'author,tractor', id: `${props.id}` });
});

function onSubmit(values: any) {
  console.log('Form Submitted:', values);
  updateModalData(
    {
      title: values.title,
      content: values.content,
      updated_at: new Date().toISOString(),
      author: (data as Post).author,
      tractor: (data as Post).tractor,
      created_at: (data as Post).created_at,
      upvotes: (data as Post).upvotes,
      downvotes: (data as Post).downvotes

    },
    'Post successfully updated.',
    'post'
  );
  useModalStore().ResetModal();
}

// Compute collection for tractors based on user role
const tractorCollection = computed(() => {
  return useAuthStore().isAdmin()
    ? 'tractors'
    : `users/${useAuthStore().currentUser?._id}/tractors`;
});
</script>

<template>
  <div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
      <div>
        <a class="text-4xl">Edit Post</a>
      </div>
      <Form @submit="onSubmit" :validation-schema="editPost">
        <div v-if="!isLoading" class="flex">
          <div class="w-full mr-2">
            <Input
              class="mt-2"
              :value="(data as Post).title"
              :place-holder="'Enter title...'"
              :name="'title'"
              :label="'Title'"
            />
            <Select
              class="mt-2"
              :value="((data as Post).tractor as string)"
              :name="'tractor'"
              :collection-name="tractorCollection"
              :place-holder="'Select tractor...'"
              :label="'Tractor'"
              showing="name"
            />
          </div>
          <div class="w-full ml-2">
            <Input
              class="mt-2"
              :value="(data as Post).content"
              :is-text-area="true"
              :type="'textarea'"
              :place-holder="'Enter content...'"
              :name="'content'"
              :label="'Content'"
            />
          </div>
        </div>
        <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
          <button class="button w-auto h-auto justify-center items-center" type="submit">
            Submit Updated Post
          </button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.button {
  background-color: #20720d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #185a0a;
}
</style>
