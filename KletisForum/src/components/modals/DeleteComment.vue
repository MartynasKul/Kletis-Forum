<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { timeSince } from '@/utils/timeUtils';
import { useCollections } from '@/composables/getData';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { Comment } from '@/types/Comment';
import type { User } from '@/types/User';

function isPopulatedComment(value: any): value is Comment & { author: User } {
    return (
        value &&
        typeof value === 'object' &&
        'author' in value &&
        typeof value.author === 'object' &&
        'username' in value.author
    );
}

// Define props
const props = defineProps({
    id: { type: String, required: true }
});

// Fetch data
const { data, isLoading, getCollection, totalCount } = useCollections();
const { deleteModalData } = useCollectionsUpdater(`comments/${props.id}`);

onMounted(() => {
    getCollection({ collectionName: 'comments', expand: 'author', id: `${props.id}` });
});

// Check if the data is of type Comment
function isComment(value: any): value is Comment {
    return value && typeof value === 'object' && 'userId' in value && 'body' in value;
}

// Handle comment deletion
function onSubmit() {
    deleteModalData('Komentaras ištrintas.', 'comment');
    useModalStore().ResetModal();
}
</script>


<template>
    <div style="min-width: 800px; max-width: 800px; min-height: 300px;" class="purple p-16 bg-JDlightGreen rounded-xl">
        <div class="flex flex-col">
            <div>
                <a class="text-4xl">Ištrinti komentarą</a>
            </div>
            <div class="flex mt-6 mb-4" v-if="!isLoading && isPopulatedComment(data)">
                <img
                    class="w-12 h-12 mr-2 rounded-full"
                    :src="prepareImageSrc('@/assets/icons/userLogopng')"
                />
                <div class="flex flex-col">
                    <div class="flex">
                        <a class="">{{ data.author.username }}</a>
                        <div class="ml-5">
                            <a class="text-xs time w-full">{{ timeSince(data.created_at as string) }}</a>
                        </div>
                    </div>
                    <div class="commentBody mt-1 break-all flex flex-col pr-4">
                        <a>{{ data.content }}</a>
                    </div>
                </div>
            </div>
            <a v-if="!isLoading" class="text-red-500 text-xl">Ar tikrai norite ištrinti komentarą</a>
            <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
                <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Ištrinti komentarą</button>
            </div>
            <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
        </div>
    </div>
</template>

    
    <style scoped>
    
    </style>