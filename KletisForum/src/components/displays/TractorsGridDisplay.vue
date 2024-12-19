<script setup lang="ts">
import { type Tractor } from '@/types/Tractor'
import type { PropType } from 'vue'
import GridElement from '@/components/elements/GridElement.vue'

const props = defineProps({
    tractors: { type: Object as PropType<Tractor[]>, required: true }
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div v-for="tractor in tractors" :key="(tractor._id as string)">
            <GridElement :tractor="tractor" />
        </div>
    </div>
</template>

<style scoped>
/* Optional custom styling if needed */
</style>