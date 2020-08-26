import Vue from "vue"
import VueRouter from "vue-router"
import ExplorePage from "./pages/ExplorePage.vue"
import WatchListPage from "./pages/WatchListPage.vue"
import AboutPage from "./pages/AboutPage.vue"
import NotFound from "./pages/NotFound.vue"
import HomePage from "./pages/HomePage.vue"

Vue.use(VueRouter)

import { getInstance } from "./auth/index.js";

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }
    // Otherwise, redirect
    router.push({ path: "/" })
    // Better alternative is to send to Auth0 to login
    // authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", loading => {
    if (loading === false) {
      return fn();
    }
  });
};



const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: 'Grainsmiths',
      },
    },
    {
      path: '/explore',
      name: 'ExplorePage',
      component: ExplorePage,
      beforeEnter: authGuard,
      meta: {
        title: 'Explore',
      }
    },
    {
      path: '/explore/:species',
      name: 'ExplorePageSpecies',
      component: ExplorePage,
      beforeEnter: authGuard,
      meta: {
        title: 'Explore',
      }
    },
    {
      path: '/explore/:species/:tags',
      name: 'ExplorePageSpeciesTags',
      component: ExplorePage,
      beforeEnter: authGuard,
      meta: {
        title: 'Explore',
      }
    },
    {
      path: '/watch-list',
      name: 'WatchList',
      component: WatchListPage,
      beforeEnter: authGuard,
      meta: {
        title: 'Watch List',
      }
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
      meta: {
        title: 'About Grainsmiths',
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404 Not Found',
      }
    }

  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Grainsmiths';
  next();
});




export default router;
