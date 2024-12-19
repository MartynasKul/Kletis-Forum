<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue"
const emit = defineEmits(['removeMenu', 'logout', 'editProfile'])
const menu = ref<HTMLElement | null>(null)

const handleClick = (e: MouseEvent) => {
  if (menu.value && !menu.value.contains(e.target as Node)) {
    emit('removeMenu')
  }
}

onMounted(() => {
  document.addEventListener("click", handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClick)
})
</script>

<template>
<div ref="menu" style=" width: 200px; height: 100px;" class=" z-10 buttonNoHover fixed flex flex-col justify-between border-sm top-20 right-3 shadow-2xl rounded-xl" >
    <div style="width: 100%; height: 100%;" @click="emit('editProfile')" class="menuOption  button rounded-t-lg flex items-center justify-center   text-sm">
      <a class="text-lg">Redaguoti Profilį</a>
    </div>
    <div  style="width: 100%; height: 100%;" @click="emit('logout')" class="menuOption buttonT  justify-center  flex items-center">
      <a class="text-lg">Atsijungti</a>
    </div>
</div>
</template>

<style scoped>
.menuOption{
  cursor:pointer

}
a{
  color: black;
}

</style>