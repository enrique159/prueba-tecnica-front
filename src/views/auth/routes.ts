import AuthModule from './AuthModule.vue';
import SignInView from './views/SignInView.vue';
import SignUpView from './views/SignUpView.vue';

export const AuthRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: AuthModule,
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'SignIn',
        component: SignInView,
      },
      {
        path: 'register',
        name: 'SignUp',
        component: SignUpView,
      }
    ]
  }
]