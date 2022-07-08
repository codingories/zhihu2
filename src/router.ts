import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/components/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/store'

const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isLogin } = store.state.user
  if (to.meta.requiredLogin && !isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && isLogin) {
    next('/')
  } else {
    next()
  }
})
