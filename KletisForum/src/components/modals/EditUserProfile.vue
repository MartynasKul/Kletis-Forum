<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import { editUser } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { userTypes } from '@/enums/enums';
import { useCollections } from '@/composables/getData';
import { onMounted } from 'vue';
import type { User } from '@/types/User';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';

// Props
const props = defineProps({
  id: { type: String, required: true },
});

// State and API logic
const { data, isLoading, getCollection, totalCount } = useCollections();
const { updateModalData } = useCollectionsUpdater(`users/${props.id}`);

// Fetch user data on component mount
onMounted(() => {
  console.log('Fetching user data...');
  getCollection({ collectionName: 'users', id: props.id });
});

// Handle form submission
function onSubmit(values: any) {
  console.log('🟢 Form Submitted:', values);

  updateModalData(
    {
      username: values.username || (data as User).username,
      email: values.email || (data as User).email,
      password: values.password || (data as User).password,
      
    },
    'User successfully updated.',
    'base'
  );

  useModalStore().ResetModal();
}
</script>

<template>
  <div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
      <div>
        <a class="text-4xl">Atnaujinti naudotoją</a>
      </div>

      <!-- Vee-Validate Form -->
      <Form @submit="onSubmit" :validation-schema="editUser">
        <div v-if="!isLoading" class="flex">
          <div class="w-full mr-2">
            <!-- Username Input -->
            <Input
              class="mt-2"
              :value="(data as User)?.username"
              :place-holder="'Slapyvardis...'"
              :name="'username'"
              :label="'Slapyvardis'"
            />

            <!-- Email Input -->
            <Input
              class="mt-2"
              :value="(data as User)?.email"
              :place-holder="'E.Paštas...'"
              :name="'email'"
              :label="'E. Paštas'"
            />

            <!-- Password Input -->
            <Input
              class="mt-2"
              :type="'password'"
              :place-holder="'Slaptažodis...'"
              :name="'password'"
              :label="'Slaptažodis'"
            />

          </div>
        </div>

        <!-- Submit Button -->
        <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
          <button class="button w-auto h-auto justify-center items-center" type="submit">
            Išsaugoti naudotoją
          </button>
        </div>

        <!-- No Data Found Display -->
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
