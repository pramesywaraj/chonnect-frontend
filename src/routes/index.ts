import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/welcome',
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
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/Home/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@views/Search/index.vue')
  },
  {
    path: '/profile',
    name: 'CurrentUserProfile',
    component: () => import('@views/Profile/index.vue'),
    children: [
      {
        path: '/profile/user/:userId',
        name: 'UserProfile',
        component: () => import('@views/Profile/index.vue')
      },
      {
        path: '/profile/group/:groupId',
        name: 'GroupProfile',
        component: () => import('@views/Profile/index.vue')
      }
    ]
  },
  {
    path: '/room/:roomId',
    name: 'Room',
    component: () => import('@views/Room/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
