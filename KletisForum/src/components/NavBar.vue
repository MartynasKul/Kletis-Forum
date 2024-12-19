<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '../stores/AuthStore';
import type { User } from '@/types/User';
import { onMounted, ref, watch, type PropType } from 'vue';
import { useCollections } from '@/composables/getData';
import { useModalStore } from '@/stores/ModalStore';
import EditUserProfile from './modals/EditUserProfile.vue';
import Menu from "@/components/Menu.vue"

const {data, isLoading, getCollection} = useCollections()
const authStore = useAuthStore();
const user = authStore.currentUser || {role: 'unregistered' }; //Kaip default neprijungtam useriui dedu unregistered role

const isMenuOpen = ref(false)
onMounted(()=> {
  getCollection({collectionName: 'users', id: useAuthStore().currentUser?._id})
})
watch(useModalStore().isTriggerUser, ()=>{
  getCollection({collectionName: 'users', id: useAuthStore().currentUser?._id})
})

function toggleMenu(){
    console.log("I CHANGE")
  isMenuOpen.value = !isMenuOpen.value
}
function logOut(){
  toggleMenu()
  useAuthStore().logUserOut()
}
function editProfile(){
  toggleMenu()
  if(useAuthStore().isUserLoggedIn()){
    useModalStore().SetModal({component: EditUserProfile, componentProps: {id: useAuthStore().currentUser?._id}})
  }
}

</script>

<template>
    <nav class="fixed top-0 left-0 w-full p-4 z-10 bg-JDmidGreen shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo jei noriu -->
            <div class="flex items-center space-x-2">
                <img class="icon h-10 w-10 rounded-xl bg-cweam" style="width: 50px; height:50px" src="@/assets/Icons/tractorLogo.png" alt="tractorLogo" />
                <div class="text-3xl font-bold font-sans">Klėtis</div>

            </div>

            <!-- Navigation links -->
            <ul class="flex space-x-4">
                <li><router-link to="/" class=" hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Pagrindinis</router-link></li>
                <li><router-link to="/tractors" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Traktoriai</router-link></li>

                <!-- Conditional links based on role -->
                <!-- Admin -->
                <template v-if="useAuthStore().isAdmin()">
                    <li><router-link to="/users" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Naudotojai</router-link></li>
                </template>
                <!-- Mod --><template v-if="useAuthStore().isMod()"><!-- kolkas nieko neturi --></template>
                <!-- User --><template v-if="useAuthStore().isGuest()"><!-- kolkas nieko neturi --></template>

                <!-- <li ><router-link to="/search" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Paieška</router-link></li> -->
                <li><router-link to="/about" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Apie</router-link></li>

                <!-- CONDITIONAL LINKS BASED ON WHETHER USER ISI LOGGED IN-->
                <template v-if="!useAuthStore().isUserLoggedIn()">
                    <li><router-link to="/login" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Prisijungti</router-link></li>
                </template>
                <template v-if="!useAuthStore().isUserLoggedIn()">
                    <li><router-link to="/register" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Registruotis</router-link></li>
                </template>
                <template v-else>
                    <li @click.stop="toggleMenu()" v-if="useAuthStore().isUserLoggedIn()" ><router-link to="" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Profilis</router-link></li>
                    <!-- <li v-if="useAuthStore().isUserLoggedIn()" @click="handleRedirectToUser" class="hover:text-blue-400 bg-JDdarkestGreen px-4 py-2 rounded-xl shadow hover:bg-green-700 transition font-bold">Profilis</li> -->
                </template>
            </ul>
        </div>
        <Transition name="bounce">
            <Menu  v-if="isMenuOpen && useAuthStore().isUserLoggedIn()" @remove-menu="toggleMenu()" @editProfile="editProfile()" @logout="logOut()"></Menu>
        </Transition>
    </nav>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.icon{
    height: 75px;
}
.profileIcon{
    background-color: blanchedalmond;
}
.topnav {
  width: 100%;
  overflow: hidden;
  min-width: 100px;

}
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  height: 75px;
  width: 200px;
}
.topnav a:hover {
  background-color: #ecc08d;
  color: #000000;
}

.topnav a.active {
  background-color: #ecc08d;
  color: #000000;
}

@media (max-width: 1000px) {
  .topnav a {
    width: 125px;
  }
}

@media (max-width: 750px) {
  .topnav .ZZZ {
    display: none;
  }
}


</style>