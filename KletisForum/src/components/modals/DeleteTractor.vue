<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Tractor } from '@/types/Tractor';

const { data, isLoading, getCollection, totalCount } = useCollections();
const props = defineProps({
    id: { type: String, required: true }
});
const { deleteModalData } = useCollectionsUpdater(`tractors/${props.id}`);

onMounted(() => {
    getCollection({ collectionName: 'tractors', id: `${props.id}` });
});

function onSubmit() {
    deleteModalData('Tractor successfully deleted.', 'tractor', '/tractors');
    useModalStore().ResetModal();
}

// Helper function to narrow the type
function isTractor(obj: any): obj is Tractor {
    return obj && typeof obj.name === 'string' && typeof obj.description === 'string';
}
</script>

<template>
<div style="min-width: 800px; max-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Delete Tractor</a>
        </div>
        <div class="flex mt-6 mb-4" v-if="!isLoading && isTractor(data)">
            <div class="flex flex-col break-all">
                <div class="text-xl">
                    <a>{{ data.name }}</a>
                </div>
                <div class="mt-3">
                    <a>{{ data.description }}</a>
                </div>
            </div>
        </div>  

        <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this tractor?</a>
        <a v-if="!isLoading" class="text-red-500 text-xl">Posts related to this tractor will also be deleted!</a>
        <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
            <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete Tractor</button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
    </div>
</div>
</template>

<style scoped>

</style>