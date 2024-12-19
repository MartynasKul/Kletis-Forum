<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  '@/assets/main.css'
</script>

<template>
  <div class="min-h-screen bg-JDmidGreen text-JDyellow  mx-auto p-8 " >
    <!-- Page Title -->
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-teal-400">About Klėtis</h1>
    </header>

    <!-- About Section -->
    <section class="space-y-6">
      <p class="text-lg ">
        Welcome to <span class="font-bold text-teal-400">Klėtis</span>, your go-to forum for tractor enthusiasts. This platform is designed to bring together hobbyists, professionals, and anyone passionate about tractors.
      </p>
      <p class="text-lg">
        Here, you can:
      </p>
      <ul class="list-disc list-inside ml-4 space-y-2 text-lg">
        <li>Discover and discuss tractors from around the world.</li>
        <li>Share and find tips, tricks, and advice for maintenance and operation.</li>
        <li>Engage in lively conversations about the latest tractor technology.</li>
        <li>Connect with like-minded individuals in a friendly and engaging community.</li>
      </ul>
    </section>

    <!-- Mission Statement -->
    <section class="mt-8">
      <h2 class="text-2xl font-bold text-teal-300 mb-4">Our Mission</h2>
      <p class="text-lg">
        Our mission is to cultivate a vibrant community where tractor enthusiasts can share their knowledge and passion. Whether you're a farmer, mechanic, or just a fan of big machines, <span class="font-bold text-teal-400">Klėtis</span> is the place for you.
      </p>
    </section>

    <!-- Footer -->
    <footer class="mt-12 bg-JDdarkestGreen">
      <p class="text-sm text-gray-400 text-JDyellow" >
        Klėtis Forum &copy; {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>