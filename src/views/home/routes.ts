import HomeModule from './HomeModule.vue';

export const HomeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomeModule,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  }
]