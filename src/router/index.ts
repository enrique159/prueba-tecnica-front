import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/appStore';

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { validToken } = useAppStore()
  if (to.path === '/login' && validToken) {
    next({ name: 'Home' })
  }
  else if (to.meta.requiresAuth && !validToken) {
    next({ name: 'SignIn' })
  }
  else {
    next()
  }
})

export default router
