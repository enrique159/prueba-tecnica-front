import InvitationsModule from './InvitationsModule.vue'
import InvitationsView from './views/InvitationsView.vue'
import NewInvitationView from './views/NewInvitationView.vue'

export const InvitationsRoutes = [
  {
    path: '/invitations',
    name: 'InvitationsModule',
    component: InvitationsModule,
    meta: {
      title: 'Invitations',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Invitations',
        component: InvitationsView,
      },
      {
        path: 'new',
        name: 'NewInvitation',
        component: NewInvitationView,
      },
    ]
  }
]