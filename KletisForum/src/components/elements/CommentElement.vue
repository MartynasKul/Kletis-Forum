<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { type Comment } from '@/types/Comment'
// import { prepareImageSrc } from '@/utils/imageUtils';
import { timeSince } from '@/utils/timeUtils'
import { useAuthStore } from '@/stores/AuthStore'
import { useModalStore } from '@/stores/ModalStore'
import EditComment from '@/components/modals/EditComment.vue'
import DeleteComment from '@/components/modals/DeleteComment.vue'
import type { User } from '@/types/User'

const props = defineProps({
    comment: {type: Object as PropType<Comment>, required: true}
        
})
const router = useRouter()
</script>

<template>
    <div class=" min-h-50 w-full flex p-1">
        <!-- Cia nuotraukom galima ideti kodo jeigu noresiu nuotraukas ideti i foruma
        <img class="w-12 h-12 rounded-full mr-2"  v-if="((comment as Comment).userId as User).photo" :src="prepareImageSrc(((comment as Comment).userId as User).photo)">
        <img class="w-12 h-12 rounded-full mr-2" v-else src="@/assets/icons/userIcon.png"> -->
        <div class="flex flex-col shadow-xl bg-JDlightGreen text-JDyellow rounded-xl pl-5 pr-5 pt-1 pb-1">
            <div class="flex">
                <a class="text-JDyellow"> {{ ((comment as Comment).author as User).username }}</a>
                <div class="ml-5">
                    <a class="text-xs time w-full text-JDyellow"> {{ timeSince(comment.created_at as string) }}</a>
                </div>
            </div>
            <div class="whitespace-pre-wrap commentBody mt-1 break-all flex flex-col pr-4 text-JDyellow">
                <a class="text-JDyellow">{{ comment.content }}</a>
            </div>
        </div>
        <div class="flex ml-auto justify-center items-center">
            <button @click=" useModalStore().SetModal({component: EditComment, componentProps: {id: props.comment._id}})" v-if="useAuthStore().isUserLoggedIn() &&
                (useAuthStore().currentUser?._id === ((comment as Comment).author as User)._id || useAuthStore().isAdmin() || useAuthStore().isMod())" class="button mr-2">Redaguoti</button>
            
            <button @click=" useModalStore().SetModal({component: DeleteComment, componentProps: {id: props.comment._id}})" v-if="useAuthStore().isUserLoggedIn() &&
                (useAuthStore().currentUser?._id === ((comment as Comment).author as User)._id || useAuthStore().isAdmin() || useAuthStore().isMod())" class="delete mr-4">Trinti</button>
        </div>
    </div>
</template>

<style scoped>
.truncate{
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
.time{
    color: #FDE100;
}
.commentBody, a{
    color: #fde100;
    font-style: italic;
    
    
}
.iconer{
    width: 50px;
}
</style>