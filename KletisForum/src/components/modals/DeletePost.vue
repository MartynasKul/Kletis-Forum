<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import type { Post } from '@/types/Post';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';

const { data, isLoading, getCollection, totalCount } = useCollections();
const props = defineProps({
    id: { type: String, required: true }
});

const { deleteModalData } = useCollectionsUpdater(`posts/${props.id}`);

onMounted(() => {
    getCollection({ collectionName: 'posts', id: `${props.id}` });
});

function onSubmit() {
    deleteModalData('Post successfully deleted.', 'post', '/posts');
    useModalStore().ResetModal();
}

// Helper function to narrow the type
function isPost(obj: any): obj is Post {
    return obj && typeof obj.title === 'string' && typeof obj.content === 'string';
}
</script>

<template>
    <div style="min-width: 800px; max-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
        <div class="flex flex-col">
            <div>
                <a class="text-4xl">Delete Post</a>
            </div>
            <div class="flex mt-6 mb-4" v-if="!isLoading && isPost(data)">
                <div class="flex flex-col break-all">
                    <div class="text-xl">
                        <a>{{ data.title }}</a>
                    </div>
                    <div class="mt-3">
                        <a>{{ data.content }}</a>
                    </div>
                </div>
            </div>  
            <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this post?</a>
            <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
                <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete Post</button>
            </div>
            <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
        </div>
    </div>
</template>

<style scoped>

</style>
