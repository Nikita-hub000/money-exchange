import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import Convert from '../pages/ConvertPage.vue';
import store from '../store';

const routes = [
  { path: '/', component: Home },
  { path: '/convert', component: Convert },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (f, t, next) => {
  await store.dispatch('fetchCurrencyData');
  next();
});

export default router;
