<script setup lang="ts"> 
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import TractorsGridDisplay from '@/components/displays/TractorsGridDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import CreateTractor from '@/components/modals/CreateTractor.vue';
import type { Tractor } from '@/types/Tractor';

const { data, isLoading, getCollection, totalCount } = useCollections();

onMounted(async () => {
    getCollection({ collectionName: 'tractors', expand: 'created_By' });
});

watch(useModalStore().isTriggerTractors, () => {
    getCollection({ collectionName: 'tractors', expand: 'created_By' });
});
</script>

<template>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-cweam px-4">
    <div class="w-full max-w-6xl">
      <!-- Header Section -->
      <div class="flex justify-between items-center mt-8 mb-6">
        <h1 class="text-5xl font-bold text-JDyellow">Tractors</h1>
        <button 
          @click="useModalStore().SetModal({ component: CreateTractor })" 
          v-if="useAuthStore().isAdmin()" 
          class="rounded-xl px-6 py-2 text-xl font-semibold text-white bg-JDdarkestGreen hover:bg-JDmidGreen transition">
          Prideti traktoriu
        </button>
      </div>

      <!-- Tractor Grid Section -->
      <div class="w-full bg-white p-4 rounded-lg shadow-lg">
        <TractorsGridDisplay 
          v-if="!isLoading && totalCount !== 0" 
          :tractors="data" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        />
        <NoDataFoundDisplay class="mt-10" v-else-if="totalCount === 0" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-cweam {
  background-color: #FFFEF2; /* Cream background */
}

.text-JDyellow {
  color: #FDE100; /* JDyellow */
}

.bg-JDdarkestGreen {
  background-color: #20720D; /* JDdarkestGreen */
}

.hover\:bg-JDmidGreen:hover {
  background-color: #3B8927; /* JDmidGreen */
}

.min-h-screen {
  min-height: 100vh;
}
</style>
