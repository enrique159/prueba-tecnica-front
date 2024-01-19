import AuthModule from './AuthModule.vue';
import SignInView from './views/SignInView.vue';
import SignUpView from './views/SignUpView.vue';
import RecoverPasswordView from './views/RecoverPasswordView.vue';
import UpdatePasswordView from './views/UpdatePasswordView.vue';

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
      },
      {
        path: 'recover',
        name: 'RecoverPassword',
        component: RecoverPasswordView,
      },
      {
        path: 'update-password/:token',
        name: 'UpdatePassword',
        component: UpdatePasswordView,
      }
    ]
  }
]