<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { createUser } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import {  userTypes } from '@/enums/enums.ts';
const { postModalData } = useCollectionsUpdater('register')
function onSubmit(values: any): void{
    console.log("UNGA")
    postModalData({ 
        username: values.username,
         email: values.email,
          password: values.password,
           type: values.type
    }, 'User successifuly created.', 'base', '/users')
    useModalStore().ResetModal();
}

</script>
<template>
    <div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
        <div class="flex flex-col">
            <div>
                <a class="text-4xl">Sukurti naują vartotoją </a>
            </div>
            <Form @submit="onSubmit"  :validation-schema="createUser">
                <div class="flex">
                    <div class="w-full mr-2">
                        <Input class="mt-2"  :place-holder="'Slapyvardis'"   :name="'username'" :label="'Username'"></Input>
                        <Input class="mt-2" :place-holder="'El. paštas'"  :name="'email'" :label="'Email'"></Input>
                        <Input class="mt-2 " :type="'password'":right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :place-holder="'Slaptažodis...'"  :name="'password'" :label="'Password'"></Input>
                        <Select class="mt-2" :name="'type'" :default-values="Object.values(userTypes)" :place-holder="'Pasirinkite naudotojo tipą'" :label="'User type'" :showing="'type'" ></Select>
                    </div>
                </div>
                <!-- <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>   NUOTRAUKŲ ĮDĖJIMAS  -->
                <div class="w-full mt-5 flex  justify-center">
                    <button class="button w-auto h-auto justify-center items-center" type="submit">Sukurti naują naudotoją</button>
                </div>
            </Form>
        </div>
    </div>
    
    </template>
    
    <style scoped>
    
    </style>