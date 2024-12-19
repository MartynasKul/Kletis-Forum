<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue'
import Input from '../Input.vue'
import FileInput from '../FileInput.vue'
import { createPost } from '@/validation/validationSchemas'
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore'
import { useAuthStore } from '@/stores/AuthStore';
import { computed } from 'vue';

const { postModalData } = useCollectionsUpdater('posts')
function onSubmit(values: any){
    postModalData({title: values.title, content: values.content, created_at: Date.now, updated_at: Date.now, upvotes: 0,
         downvotes: 0, author: values.author, tractor: values.tractor },
        'Skelbimas sėkmingai sukurtas', 'post')
    useModalStore().ResetModal()
}
const collection = computed(()=>{
    return useAuthStore().isAdmin()?`tractors`:`users/${useAuthStore().currentUser?._id}/tractors`
})
</script>


<!-- 
PABAIGTI RYTOJ KAI PRABUS CHATGTP
-->

<template>
    <div class="purple p-16 min-w-800 min-h-500 bg-JDlightGreen rounded-xl">
        <div class="flex flex-col ">
            <div>
                <a class="text-4xl">Skelbimo kūrimas</a>
            </div>
            <Form @submit="onSubmit" :validation-schema="createPost">
                <div class="flex">
                    <div class="w-full mr-2 rounded-xl shadow-JDdarkestGreen">
                        <Input class="mt-2"  :place-holder="'Įveskite titulą...'"   :name="'title'" :label="'Title'"></Input>
                    </div>
                    <div class="w-full ml-2">
                        <Input class="mt-2" :place-holder="'Enter language...'"  :name="'language'" :label="'Language'"></Input>
                      </div>
                </div>
                <Input class="mt-2" :is-text-area="true" :type="'textarea'"   :place-holder="'Skelbimo kontentas...'"  :name="'description'" :label="'Description'"></Input>
                <!-- <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput> PRIDETI FAILUS KADANORS     -->
                <div class="w-full mt-5 flex  justify-center">
                    <button class="button w-auto h-auto justify-center items-center" type="submit">Sukurti skelbimą</button>
                </div>
            </Form>
        </div>
    </div>
    
    </template>
    
    <style scoped>
    
    </style>