<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  '@/assets/main.css'
import NavBar from './components/NavBar.vue';
import Modal from './components/Modal.vue';
import NotificationDisplay from '@/components/displays/NotificationDisplay.vue';

// import Modal from '@/'

</script>

<template>
  <main class="bg-cweam ming-h-screen flex flex-col">
    <header class="bg-JDmidGreen h-auto pt-10 ">
      <NavBar/>
      <Modal></Modal>
    </header>
    <div class="pt-20 flex justify-center items-center h-full mx-auto" style="width:1600px">
      <NotificationDisplay></NotificationDisplay>
      <RouterView />
    </div>
    <footer>
      Klėtis Forum © 2024
    </footer>
  </main>
    
</template>

<style>
main{
  background-color: #FFFEF2;
  min-height: 100vh;
  height: auto;
}
a{
  color: #FDE100
}

html, body{
  margin:0;
  height:100%;
}

body{
  background-color: #FFFEF2;
}

</style>