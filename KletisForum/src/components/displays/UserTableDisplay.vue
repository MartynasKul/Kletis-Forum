<script setup lang="ts">
import { type User } from '@/types/User';
import type { PropType } from 'vue';
import UserTableElement from '../elements/UserTableElement.vue';
const props = defineProps({
    users: {type: Object as PropType<User[]>, required: true}
})
</script>

<template>
<div class="shadow-xl p-5 " style="width: 1000px;">

    <div class="data-block overflow-auto">
        <div class="" v-for="user in users" :key="(user._id as string)">
            <UserTableElement :user="user"></UserTableElement>
        </div>
    </div>
</div>

</template>

<style scoped>

</style>