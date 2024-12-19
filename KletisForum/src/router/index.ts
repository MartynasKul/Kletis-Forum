import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import PostsView from '../views/PostsView.vue' nereikalingas nes home rodys ta pati xd
import PostDetailsView from '@/views/detailViews/PostDetailsView.vue'
import TractorsView from '@/views/TractorsView.vue'
import TractorView from '@/views/detailViews/TractorDetailsView.vue'
import { useAuthStore } from '@/stores/AuthStore'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UsersView from '@/views/UsersView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import AboutView from '@/views/AboutView.vue'
import SearchView from '@/views/SearchView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UserProfileView from '@/views/UserProfileView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          alias: '/posts'
        },
        {
          path: '/posts',
          name: 'posts',
          component: HomeView,
          alias: '/posts'
        },
        {
          path: '/posts/:id',
          name: 'postDetails',
          component: PostDetailsView,
          props: true
        }
      ]
    },
    {
      path: '/',
      children: [{
          path: 'tractors',
          name: 'tractors',
          component: TractorsView,
        },
        {
          path: 'tractors/:id',
          name: 'tractorDetails',
          component: TractorView,
          props: true
        }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/user/:id',
      name: 'userDetails',
      component: UserProfileView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'pathNotFound',
      component: PageNotFoundView
    },
  ],
})

router.beforeEach((to, from) => {
  if(useAuthStore().isUserLoggedIn()){
    if(useAuthStore().currentUser?.type === 'admin'){
      return true
    }
    if(to.path !== '/users'){
      return true
    }
    return {name: 'pathNotFound'}
  }
  if(
    to.path === '/login' || 
    to.path === '/' || 
    to.path === '/register' ||
    to.path === '/tractors' || 
    to.path.startsWith('/tractors/') ||
    to.path.startsWith('/posts/') ||
    to.path === '/posts' ||
    to.path === '/users' ||
    to.path === '/profile' ||
    to.path === '/about' ||
    to.path === '/search' ||
    to.name === 'pathNotFound' 
  ) {
    return true; 
  }
  if (to.path === '/users' || to.path === '/dev') {
    return { path: '/login' }
  }
  return {name: 'pathNotFound'}
})

export default router
