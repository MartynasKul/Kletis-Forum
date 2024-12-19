<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { editTractor } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import type { Tractor } from '@/types/Tractor';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';

const { data, isLoading, getCollection, totalCount } = useCollections();
const props = defineProps({
    id: { type: String, required: true }
});
const { updateModalData } = useCollectionsUpdater(`tractors/${props.id}`);

onMounted(() => {
    getCollection({ collectionName: 'tractors', id: `${props.id}` });
});

function onSubmit(values: any) {
    updateModalData(
        {
            name: values.name,
            description: values.description,
            created_By: (data.value as Tractor).created_By, // Preserve the existing creator
            photo: values.photo ?? (data.value as Tractor).photo,
        },
        'Tractor successfully updated.',
        'tractor'
    );
    useModalStore().ResetModal();
}

// Helper function to ensure the data is of Tractor type
function isTractor(obj: any): obj is Tractor {
    return obj && typeof obj.name === 'string' && typeof obj.description === 'string';
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Edit Tractor</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editTractor">
            <div v-if="!isLoading && isTractor(data)" class="flex flex-col">
                <!-- Tractor Name -->
                <Input 
                    class="mt-2" 
                    :value="data.name" 
                    :place-holder="'Enter tractor name...'" 
                    :name="'name'" 
                    :label="'Tractor Name'"
                ></Input>
                
                <!-- Tractor Description -->
                <Input 
                    class="mt-2" 
                    :value="data.description" 
                    :is-text-area="true" 
                    :type="'textarea'" 
                    :place-holder="'Enter tractor description...'" 
                    :name="'description'" 
                    :label="'Description'"
                ></Input>

                <!-- Tractor Photo
                <FileInput 
                    class="mt-2" 
                    :name="'photo'" 
                    :accept="'image/*'" 
                    :placeholder="'Add a new photo'" 
                    :label="''"
                ></FileInput>     -->
            </div>

            <!-- Submit Button -->
            <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">
                    Submit Updated Tractor
                </button>
            </div>
        </Form>
        <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
    </div>
</div>
</template>

<style scoped>
</style>
