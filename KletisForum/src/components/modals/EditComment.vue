<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../Input.vue';
import { editComment } from '@/validation/validationSchemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import { type Comment } from '@/types/Comment';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';

const { data, isLoading, getCollection, totalCount } = useCollections();
const props = defineProps({
    id: { type: String, required: true }
});
const { updateModalData } = useCollectionsUpdater(`comments/${props.id}`);

onMounted(() => {
    getCollection({ collectionName: 'comments', expand: 'post,author', id: `${props.id}` });
});

function onSubmit(values: any) {
    updateModalData(
        { content: values.content },
        'Comment successfully updated.',
        'comment'
    );
    useModalStore().ResetModal();
}

// Helper function to validate if the data is a comment
function isComment(obj: any): obj is Comment {
    return obj && typeof obj.content === 'string';
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16 bg-JDlightGreen rounded-xl">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Edit Comment</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editComment">
            <Input
                v-if="!isLoading && isComment(data)"
                class="mt-2"
                :value="data.content"
                :is-text-area="true"
                :type="'textarea'"
                :place-holder="'Edit your comment...'"
                :name="'content'"
                :label="'Comment Content'"
            ></Input>
            <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">
                    Submit Updated Comment
                </button>
            </div>
        </Form>
        <NoDataFoundDisplay class="mt-10" v-if="totalCount === 0"></NoDataFoundDisplay>
    </div>
</div>
</template>

<style scoped>
</style>
