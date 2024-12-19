<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { Form } from 'vee-validate';
import Input from './Input.vue';
import { createComment } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
// import userLogo from '@/assets/icons/userLogo.png';

const router = useRouter();
const { postModalData } = useCollectionsUpdater('/comments');

// Props for Post ID
const props = defineProps({
  id: { type: String, required: true },
});

// Handle form submission asdasdasd
function onSubmit(values: any) {
  postModalData(
    {
      content: values.content,
      author: useAuthStore().currentUser?._id,
      post: props.id,
    },
    'Comment successfully created.', 'comment'
   
  );
}

// Redirect user to login if not authenticated
function doForward() {
  if (!useAuthStore().isUserLoggedIn()) {
    router.push({ name: 'login' });
  }
}
</script>

<template>
  <div class="w-full flex p-2 mb-5">
    <!-- User Icon -->
    <div class="iconer mr-2 ml-0">
      <!-- <img
        class="w-12 h-12 rounded-full bg-cweam"
        :src="userLogo"
        alt="User Icon"
      /> -->
    </div>

    <!-- Comment Form -->
    <div class="flex flex-col pr-2 rounded-xl shadow-xl pb-2 bg-white" style="width: 400px;">
      <a v-if="!useAuthStore().isUserLoggedIn()" class="text-red-600 font-semibold mb-2">
        Turite prisijungti
        <button
          @click="router.push({ name: 'login' })"
          class="text-orange-500 underline ml-1"
        >
          Prisijunkite
        </button>
        , kad galėtumėte parašyti komentarą.
      </a>

      <Form v-else @submit="onSubmit" :validation-schema="createComment">
        <!-- Textarea for Comment -->
        <div @click="doForward">
          <Input
            :rows="'4'"
            class="mt-2 darkPurple"
            :is-text-area="true"
            :type="'textarea'"
            :place-holder="'Palikite komentarą...'"
            :name="'content'"
          />
        </div>

        <!-- Submit Button -->
        <div class="w-full mt-2 flex justify-end">
          <button
            class="submit-btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            type="submit"
          >
            Pateikti komentarą
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.iconer {
  width: 50px;
}

.submit-btn {
  transition: background-color 0.3s ease;
}

.bg-cweam {
  background-color: #FFFEF2;
}
</style>
