<script setup lang="ts">
import Input from '@/components/Input.vue';
import { Form } from 'vee-validate';
import { login } from '@/validation/validationSchemas';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const router = useRouter();

function onSubmit(values: any): void {
    useAuthStore().logUserIn(values.email, values.password);
}
</script>

<template>
  <div class="background flex items-center justify-center h-full w-full bg-JDlightGreen">
      <div class="box purple p-10 flex-col flex items-center shadow-orange-500/50 shadow-[0px_0px_25px_10px_rgba(0,0,0,0.3)]">
          <div class="flex flex-col justify-items-center" style="width: 400px;">
              <Form @submit="onSubmit" :validation-schema="login">
                  <div class="flex justify-center">
                      <a class="text-4xl text-yellow-300">Prisijungimas</a>
                  </div>
                  <div class="mt-4">
                      <Input 
                          :place-holder="'Enter email...'" 
                          :left-icon="'https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png'" 
                          :name="'email'" 
                          :label="'Email'" 
                          class="input-field"
                      ></Input>
                  </div>
                  <div class="mt-4">
                      <Input 
                          :type="'password'" 
                          :place-holder="'Enter password...'" 
                          :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" 
                          :right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" 
                          :name="'password'" 
                          :label="'Password'" 
                          class="input-field"
                      ></Input>
                  </div>
                  <div class="w-full flex justify-center mt-6">
                      <button 
                          class="w-full text-lg rounded-xl bg-JDdarkestGreen text-white py-2 px-4 hover:bg-green-700 shadow-md"  
                          type="submit"
                      >
                          Prisijungti
                      </button>
                  </div>
              </Form>
              <div class="flex justify-center mt-5">
                  <a class="text-yellow-300">Neturite paskyros? Susikurkite: 
                      <button 
                          class="bg-JDdarkestGreen text-white rounded-l px-2 py-1 ml-2 hover:bg-green-700" 
                          @click="router.push({ name: 'register' })"
                      >
                          Registruotis
                      </button>
                  </a>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
.box {
    width: 600px;
    height: 750px;
}

.input-field input {
    color: black; /* Ensures manually typed text is visible */
    background-color: white; /* Background of input */
    border: 1px solid #ccc; /* Border styling */
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    color: yellow
}

.input-field input::placeholder {
    color: black; /* Placeholder text color */
    opacity: 1;
}

.input-field input:-webkit-autofill {
    -webkit-text-fill-color: black; /* Autofill text color */
    box-shadow: 0 0 0px 1000px black inset; /* Autofill background fix */
}

.input-field input:focus {
    border-color: #20720D; /* JDdarkestGreen for focus */
    outline: none;
    box-shadow: 0 0 5px rgba(32, 114, 13, 0.5);
}

.button {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #3B8927; /* JDmidGreen */
}
</style>
