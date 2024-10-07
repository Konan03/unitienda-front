
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import Home from '@/pages/Home.vue';
import MapUnibague from '@/pages/mapPage/MapPage.vue'
import Login from '@/pages/userPages/LoginPage.vue'
import Register from '@/pages/userPages/RegisterPage.vue'
import ChangePassword from '@/pages/passwordPages/ChangePasswordPage.vue';
import VerifyCode from '@/pages/passwordPages/VerifyCodePage.vue';
import NewPassword from '@/pages/passwordPages/NewPasswordPage.vue';
import UserDetails from '@/pages/userPages/userDetails/UserDatailsPage.vue'
import Cart from '@/pages/cartPage/CartPage.vue'
import Books from '@/pages/categoryPages/BooksPage.vue'
import Thermos from '@/pages/categoryPages/ThermosPage.vue'
import Stationery from '@/pages/categoryPages/StationeryPage.vue'
import Clothes from '@/pages/categoryPages/ClothesPage.vue'
import ConfirmPayPage from '@/pages/payPage/ConfirmPayPage.vue';

const routesPages = [
  {path: '/', component: Home, name: 'Home'},
  {path: '/map', component: MapUnibague, name: 'Map'},
  {path: '/login', component: Login, name: 'Login'},
  {path: '/register', component: Register, name: 'Register'},
  {path: '/changePassword', component: ChangePassword, name: 'ChangePassword'},
  {path: '/changePassword/verifyCode', component: VerifyCode, name: 'VerifyCode'},
  {path: '/changePassword/verifyCode/newPassword', component: NewPassword, name: 'NewPassword'},
  {path: '/details', component: UserDetails, name: 'UserDetails' },
  {path: '/cart', component: Cart, name: 'Cart'},
  {path: '/books', component: Books, name: 'Books'},
  {path: '/thermos', component: Thermos, name: 'Thermos'},
  {path: '/stationery', component: Stationery, name: 'Stationery'},
  {path: '/clothes', component: Clothes, name: 'Clothes'},
  {path: '/messagePay', component: ConfirmPayPage, name: 'ConfirmPayPage'}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    ...routesPages,
    ...routes
  ]
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
