import HomeModule from './HomeModule.vue';
import { InvitationsRoutes } from '@/views/Invitations/routes';

export const HomeRoutes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/invitations',
    component: HomeModule,
    meta: {
      title: 'Home',
      requiresAuth: true
    },
    children: [
      ...InvitationsRoutes,
    ]
  }
]