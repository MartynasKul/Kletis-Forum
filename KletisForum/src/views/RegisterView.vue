<script setup lang="ts">
import Input from '@/components/Input.vue';
import { Form } from 'vee-validate';
import { createUserSimple, login } from '@/validation/validationSchemas';
import { useRouter } from 'vue-router';
import { useCollectionsUpdater } from '@/composables/postData';
import FileInput from '@/components/FileInput.vue';
import { useModalStore } from '@/stores/ModalStore';
const router = useRouter()
const {postModalData} = useCollectionsUpdater('register')

function onSubmit(values: any): void{
    postModalData({ 
        username: values.username,
         email: values.email,
          password: values.password,
           type: 'guest'
    }, 'User successifuly created.', 'base', '/login')
    useModalStore().ResetModal();
}
</script>

<template>
<div class="bg-JDlightGreen flex items-center justify-center h-full w-full">
    <div class="box purple p-10 flex-col flex items-center shadow-orange-500/50 shadow-[0px_0px_25px_10px_rgba(0,0,0,0.3)]">
        <div class="flex flex-col justify-items-center" style="width: 400px;">
            <Form @submit="onSubmit" :validation-schema="createUserSimple">
                <div class="flex justify-center">   
                    <a class="text-4xl">Registracija</a>    
                </div>
                <div class="mt-2">
                    <Input class="input-field" :type="'username'" :place-holder="'Enter new username...'" :left-icon="'https://cdn-icons-png.flaticon.com/512/2815/2815428.png'" :name="'username'" :label="'Username'" ></Input>
                </div>
                <div class="mt-2">
                    <Input class="input-field" :place-holder="'Enter new email...'" :left-icon="'https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png'" :name="'email'" :label="'Email'"></Input>
                </div>
                <div class="mt-2">
                    <Input class="input-field" :type="'password'" :place-holder="'Enter new password...'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :name="'password'" :label="'Password'"></Input>
                </div>
                <!-- <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>     -->
                <div class="w-full flex justify-center" style="height: 80px;">
                    <button class="w-full text-lg rounded-xl mt-10 bg-JDdarkestGreen"  type="submit">Prisiregistruoti</button>
                </div> 
            </Form>
            <div class="flex justify-center mt-5">
                <a>Turite paskyrą? <button class="rounded-xl p-2" @click="router.push({name: 'login'})">Prisijunkite</button></a>
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
    color: black; /* Text color */
    background-color: white; /* Background color */
    border: 1px solid #ccc; /* Border for better visibility */
    padding: 10px;
    border-radius: 8px;
}

.input-field input::placeholder {
    color: gray; /* Placeholder text color */
}

.input-field input:focus {
    border-color: #20720D; /* Focus border color */
    outline: none;
    box-shadow: 0 0 5px rgba(32, 114, 13, 0.5);
}

</style>