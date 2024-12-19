<script setup lang="ts">
import { type Post } from '@/types/Post';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { isPopulatedUser, isPopulatedTractor } from '@/utils/typeGuards'; // Import the type guards

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true },
});

const router = useRouter();

const handleRedirectToPost = () => {
  router.push({ path: `/posts/${props.post._id}` });
};
const handleRedirectToUser = ()=>{
    router.push({path: `/users/${props.post.author}`});
}
const handleRedirectToTractor =()=>{
    router.push({ path: `/tractors/${props.post.tractor}` });
}
</script>

<template>
  <div
    class="bg-gray-800 rounded-lg p-4 mb-4 flex items-start space-x-4 cursor-pointer hover:bg-gray-700 transition w-96"
    @click="handleRedirectToPost"
  >
    
  <div>
    <img
      src="@/assets/Icons/userLogo.png"
      alt="User Avatar"
      class="w-10 h-10 rounded-full"
    />
  </div>

    <!-- Post Content -->
    <div class="flex-grow w-auto">
      <!-- User and Time -->
      <div class="text-sm text-gray-400" @click="handleRedirectToUser">
        <span v-if="isPopulatedUser(post.author )">
          u/{{ post.author?.username || 'Ištrintas naudotojas' }} |
        </span>
        
        <span>{{ new Date(post.created_at).toLocaleTimeString() }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-white mb-2">{{ post.title }}</h3>

      <!-- Content Preview -->
      <p class="text-sm text-gray-300 line-clamp-3">
        {{ post.content }}
      </p>

      <!-- Metadata -->
      <div class="flex items-center space-x-4 mt-2 text-gray-400 text-sm" @click=handleRedirectToTractor>
        <p v-if="isPopulatedTractor(post.tractor)" class="bg-JDdarkestGreen text-blue-400 rounded px-2 py-1 text-xs" >
          {{ post.tractor.name }}
        </p>
        <button class="flex items-center space-x-1 hover:text-green-400 transition" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
          <span>{{ post.upvotes }}</span>
        </button>
        <button
          class="flex items-center space-x-1 hover:text-red-400 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          <span>{{ post.downvotes }}</span>
        </button>
        <button class="flex items-center space-x-1 hover:text-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M9 21V3m6 18V3" />
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
