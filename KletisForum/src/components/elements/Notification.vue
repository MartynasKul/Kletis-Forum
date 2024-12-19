<script setup lang="ts">
import { type Notification } from '@/types/Notification';
import { type PropType } from 'vue';
const props = defineProps({
    Notification: {type: Object as PropType<Notification>, required: true},
})
</script>

<template>
<div class="bg-red iconPointer opacity-90 p-4 z-50 mt-2 mb-2 word-break rounded-xl" style="min-width: 200px; max-width: 300px; height: auto;" :class="{delete: props.Notification.type === 'error'}">
    <a style="color: black">{{ Notification.message }}</a>
</div>
</template>

<style scoped>



</style>