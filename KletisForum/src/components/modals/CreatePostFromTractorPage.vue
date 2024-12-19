<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../Input.vue';
import { createPost } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import { computed } from 'vue';

// Use the composable for POST actions
const { postModalData } = useCollectionsUpdater('posts');

// Props: Receive tractor ID from parent
const props = defineProps({
  tractor: { type: String, required: true },
});

// Submit Handler
function onSubmit(values: any) {
  console.log('🟢 Post Submission Triggered:', values);
  console.log('🟢 Tractor ID:', props.tractor);

  postModalData(
    {
      title: values.title,
      content: values.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      author: useAuthStore().currentUser?._id, // Fetch current user ID
      tractor: props.tractor, // Pass tractor ID
    },
    'Skelbimas sėkmingai sukurtas',
    'post'
  );

  // Close the modal
  useModalStore().ResetModal();
}
</script>

<template>
  <div class="p-16 bg-JDlightGreen rounded-xl shadow-lg" style="min-width: 600px; min-height: 400px;">
    <div class="flex flex-col">
      <!-- Modal Title -->
      <div class="mb-4">
        <h2 class="text-4xl font-bold text-center text-white">Skelbimo kūrimas</h2>
      </div>

      <!-- Create Post Form -->
      <Form @submit="onSubmit" :validation-schema="createPost">
        <div class="mb-4">
          <Input
            class="mt-2"
            :place-holder="'Įveskite titulą...'"
            :name="'title'"
            :label="'Pavadinimas'"
          />
        </div>
        <div class="mb-4">
          <Input
            class="mt-2"
            :is-text-area="true"
            :type="'textarea'"
            :place-holder="'Įveskite aprašymą...'"
            :name="'content'"
            :label="'Aprašymas'"
          />
        </div>
        <div class="flex justify-center mt-6">
          <button class="button" type="submit">Sukurti skelbimą</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.button {
  background-color: #20720d; /* JDdarkestGreen */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #3b8927; /* JDmidGreen */
}
</style>
