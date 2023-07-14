import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import useUserStore from '@/stores/user'
import SongView from '@/views/SongView.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  // ---------------------------------------//

  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  // ---------------------------------------//

  {
    name: 'manage',
    path: '/manage-music',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  // ---------------------------------------//

  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  // ---------------------------------------//

  {
    name: 'song',
    path: '/song/:id',
    component: SongView
  },


  // {
  //   path: "/:catchAll(.*)*",
  //   redirect: { name: "home" },
  // },
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})
router.beforeEach((to, from, next) => {
  console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})
export default router
