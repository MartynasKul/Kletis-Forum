<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../Input.vue';
import { createTractor } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';

// API Logic
const { postModalData } = useCollectionsUpdater('/tractors');


function onSubmit(values: any) {
  if (!useAuthStore().currentUser?._id) {
    return;
  }

  postModalData(
    {
      name: values.name,
      description: values.description,
      created_by: useAuthStore().currentUser?._id,
    },
    'Traktorius sėkmingai sukurtas.',
    'base', '/tractors'
  );

  useModalStore().ResetModal();
}
</script>

<template>
  <div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
      <div>
        <a class="text-4xl">Traktoriaus pridėjimas</a>
      </div>

      <!-- Form Component -->
      <Form @submit="onSubmit" :validation-schema="createTractor">
        <!-- Tractor Name Input -->
        <Input
          class="mt-2"
          :value="''"
          :place-holder="'Įveskite traktoriaus pavadinimą...'"
          :name="'name'"
          :label="'Traktoriaus modelis'"
        />

        <!-- Tractor Description Input -->
        <Input
          class="mt-2"
          :value="''"
          :is-text-area="true"
          :type="'textarea'"
          :place-holder="'Aprašymas...'"
          :name="'description'"
          :label="'Aprašymas'"
        />

        <!-- Submit Button -->
        <div class="w-full mt-5 flex justify-center">
          <button class="button w-auto h-auto justify-center items-center" type="submit">
            Pridėti traktorių
          </button>
        </div>
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
