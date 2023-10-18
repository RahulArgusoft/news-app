import { createRouter, createWebHistory } from 'vue-router'
import AppView from '../App.vue'
import NavCategory from '../components/NavCategory.vue'
import NewsList from '@/views/NewsList.vue'
import CategoryNewsList from '@/views/CategoryNewsList.vue'
import SignIn from '@/views/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'all-news',
    component: NewsList
  },
  {
    path: '/:category',
    name: 'category-news',
    props: true,
    component: CategoryNewsList
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(`Navigating from "${from.fullPath}" to "${to.fullPath}"`);
//   next(); // Continue with the navigation
// })

export default router
