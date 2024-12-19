<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import UserTableDisplay from '@/components/displays/UserTableDisplay.vue';
import CreateUser from '@/components/modals/CreateUser.vue';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { User } from '@/types/User';
const {data, isLoading, getCollection, totalCount} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'users'})
})
watch(useModalStore().isTrigger, ()=>{
    getCollection({collectionName: 'users'})
})
</script>

<template>

<div class="bg-JDlightGreen block items-center justify-center mx-auto max-w-6xl rounded-xl">
    <div class="bg-JDlightGreen p-1 shadow-xl rounded-xl">
        <div class="flex justify-between items-center mb-2 p-2">
            <a class="text-white text-4xl">Naudotojai</a>
            <button v-if="useAuthStore().isAdmin()" @click="useModalStore().SetModal({component: CreateUser})" class="button">prideti naudotoja</button>
        </div>
        <div class="">
            <UserTableDisplay v-if="!isLoading" :users="data "></UserTableDisplay>
            <NoDataFoundDisplay class="mt-10" v-else-if=" totalCount == 0"></NoDataFoundDisplay>
        </div>
    </div>
    
</div>

</template>

<style scoped>


</style>