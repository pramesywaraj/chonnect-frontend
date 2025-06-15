import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@views/Landing/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@views/Register/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/Login/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
