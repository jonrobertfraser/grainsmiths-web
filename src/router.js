import Vue from "vue"
import VueRouter from "vue-router"
import ProductPage from "./pages/ProductPage.vue"
import ExplorePage from "./pages/ExplorePage.vue"
import FavoritesPage from "./pages/FavoritesPage.vue"
//import BlanksPage from "./pages/BlanksPage.vue"
//import ShoppingCart from "./pages/ShoppingCart.vue"
import ContactPage from "./pages/ContactPage.vue"
//import CheckoutPage from "./pages/CheckoutPage.vue"
import NotFound from "./pages/NotFound.vue"
import HomePage from "./pages/HomePage.vue"
import ProductImage from "./pages/ProductImage.vue"

Vue.use(VueRouter)

import VueMeta from 'vue-meta';
Vue.use(VueMeta);


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
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: 'Grainsmiths',
      },
    },
    /*{
      path: '/blanks/:species?',
      name: 'BlanksPage',
      component: BlanksPage,
      meta: {
        title: 'Grainsmiths Blanks',
      },
      props: true,
    },
    {
      path: '/shopping-cart',
      name: 'ShoppingCart',
      component: ShoppingCart,
      meta: {
        title: 'Grainsmiths Shopping Cart',
      },
    },
    {
      path: '/checkout',
      name: 'CheckoutPage',
      component: CheckoutPage,
      meta: {
        title: 'Grainsmiths Shopping Cart',
      },
    },*/
    {
      path: '/product/:productId',
      name: 'ProductPage',
      component: ProductPage,
      //beforeEnter: authGuard,
      meta: {
        title: 'Grainsmiths',
      },
      props: true,
    },
    {
      path: '/explore/:pathSpecies?/:pathTags?/:pathDims?',
      name: 'ExplorePage',
      component: ExplorePage,
      //beforeEnter: authGuard,
      meta: {
        title: 'Explore',
      },
      props: true,
    },
    {
      path: '/favorites',
      name: 'FavoritesPage',
      component: FavoritesPage,
      beforeEnter: authGuard,
      meta: {
        title: 'Your Favorites',
      }
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage,
      meta: {
        title: 'Contact Grainsmiths',
      }
    },
    {
      path: '/product-image/:productId/:imageIndex',
      name: 'ProductImage',
      component: ProductImage,
      meta: {
        title: 'Grainsmiths',
      },
      props: true,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404 Not Found',
      }
    }
  ],
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Grainsmiths';
  next();
});





export default router;
