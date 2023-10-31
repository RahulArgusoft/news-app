import { createRouter, createWebHistory } from "vue-router";
import NewsList from "@/views/NewsList.vue";
import CategoryNewsList from "@/views/CategoryNewsList.vue";
import LocalNewsList from "@/views/LocalNewsList.vue";
import SignIn from "@/views/SignIn.vue";
import LocalNewsForm from "@/components/dialogs/LocalNewsForm.vue";
import UserProfile from "@/views/UserProfile.vue"
import LocalNewsUpload from "@/views/LocalNewsUploads.vue"
import NewsDescription from '@/components/NewsDescription.vue'
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "all-news",
    component: NewsList,
  },
  {
    path: "/:category",
    name: "category-news",
    props: true,
    component: CategoryNewsList,
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/local",
    name: "local-news-form",
    beforeEnter: () => {
      const loggedIn = store.getters['user/isLoggedIn'];
      if (!loggedIn) {
        console.log(loggedIn);
        return { name: "all-news" };
      }
    },
    children: [
      {
        path: "",
        name: 'local-news-list',
        component: LocalNewsList,
      },
      {
        path: ":article_id",
        props: true,
        name: 'news-detail',
        component: NewsDescription
      },
      {
        path: "new",
        name: 'local-news-form',
        component: LocalNewsForm,
      },
      {
        path: "uploads",
        name: "uploaded-news",
        component: LocalNewsUpload
      }
    ],
  },
  {
    path: "/user",
    name: "user-profile",
    component: UserProfile
  },
  { 
    path: "/:catchAll(.*)",
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log(`Navigating from "${from.fullPath}" to "${to.fullPath}"`);
//   next(); // Continue with the navigation
// })

export default router;
