<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import PostListDisplay from '@/components/displays/PostsListDisplay.vue'
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import CreatePost from '@/components/modals/CreatePost.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'posts', expand: 'author,tractor'})
})
watch(useModalStore().isTriggerPosts, ()=>{
    getCollection({collectionName: 'posts', expand: 'author,tractor'})
})
</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <!-- <div class="flex justify-between items-center mt-2 mb-5">
            <button @click="useModalStore().SetModal({component: CreatePost})" v-if="useAuthStore().isAdmin() || useAuthStore().isMod() || useAuthStore().isGuest() " class="  rounded-xl px-4 h-12 text-xl button">Prideti skelbima</button>
        </div> -->
        <div class="">
            <PostListDisplay v-if="!isLoading && totalCount != 0" :posts="data"></PostListDisplay>
            <NoDataFoundDisplay class="mt-10" v-else-if=" totalCount == 0"></NoDataFoundDisplay>
        </div>
    </div>
</div>

</template>

<style scoped>




</style>