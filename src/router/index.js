import { createRouter, createWebHistory } from 'vue-router';
import validate from './validate';
import Login from '../views/Login.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: Login
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home/:id',
    name: 'home',
    props: true,
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/choose-a-plan',
    name: 'chooseAPlan',
    component: () => import('@/views/ChooseAPlan.vue')
  },
  {
    path: '/sign-up/:id',
    name: 'signUp',
    props: true,
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Validate login / signup
router.beforeEach(validate.validateLogin);

// Validate choose a plan router
router.beforeEach(validate.validateSignUp);

// Validate not-found page
router.beforeEach(validate.validateNotFound);

export default router;
