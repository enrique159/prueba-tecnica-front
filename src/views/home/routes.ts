import HomeModule from './HomeModule.vue';
import InvitationsView from './views/InvitationsView.vue';

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
      {
        path: 'invitations',
        name: 'Invitations',
        component: InvitationsView,
      }
    ]
  }
]