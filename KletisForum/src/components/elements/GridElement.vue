<script setup lang="ts">
import { type Tractor } from '@/types/Tractor'
import type { PropType } from 'vue'
//import { prepareImageSrc } from '@/utils/imageUtils'
import { useRouter } from 'vue-router'

const props = defineProps({
    tractor: {type: Object as PropType<Tractor>, required: true}
})
const router = useRouter()

</script>

<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-JDlightGreen">
        <div @click="router.push({ name: 'tractorDetails', params: { id: tractor._id } })" class="p-4">
            <div class="text-center font-bold text-green-600 mb-2 truncate">
                {{ tractor.name }}
            </div>
            <div class="text-gray-500 text-sm truncate">
                {{ tractor.description }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.truncate {   
    white-space: nowrap;  
    overflow:hidden;          
    text-overflow: ellipsis; 
    max-width: 200px;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .imgDisplay {
  opacity: 1;
  -webkit-filter: blur(6px);
}

.container:hover .middle {
  opacity: 1;
}

</style>