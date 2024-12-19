<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore';
import  Notification  from '../elements/Notification.vue'
const Notifications = useNotificationStore()

</script>

<template>
    <div class="fixed z-10">
        <div class="flex flex-col" v-for="notification in Notifications.shortenedNotificationList" :key="(notification.id as PropertyKey)">
          <Notification @click="$event => Notifications.removeNotificationById(notification.id)" :-notification="notification"></Notification>
        </div>
    </div>
</template>

<style scoped>

</style>