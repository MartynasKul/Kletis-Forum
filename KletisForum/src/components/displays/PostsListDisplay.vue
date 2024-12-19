<script setup lang="ts">
import { type Post } from '@/types/Post';
import type { PropType } from 'vue';
import PostListElement from '../elements/PostListElement.vue';

const props = defineProps({
    posts: { type: Object as PropType<Post[]>, required: true },
    class: { type: String, default: 'data-block overflow-auto flex flex-col gap-4' } // Updated layout to flexbox
});
</script>

<template>
    <div :class="`${props.class} rounded-xl p-5 `">
        <div 
            v-for="post in posts" 
            :key="(post._id as string)" 
            class="border-b border-black-300 pb-4 last:border-none bg-JDlightGreen shadow-2xl rounded-xl"
        >
            <PostListElement :post="post"></PostListElement>
        </div>
    </div>
</template>

<style scoped>
/* Ensure a cleaner layout */
.data-block {
    width: 100%;
}
</style>
