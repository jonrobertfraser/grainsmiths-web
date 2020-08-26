import Vue from "vue"
import VueRouter from "vue-router"
import ExplorePage from "./pages/ExplorePage.vue"
import WatchListPage from "./pages/WatchListPage.vue"
import AboutPage from "./pages/AboutPage.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ExplorePage,
      meta: {
        title: 'Grainsmiths',
      },
      alias: '/explore/'
    },
    {
      path: '/explore/:species',
      name: 'ExplorePageSpecies',
      component: ExplorePage,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/explore/:species/:tags',
      name: 'ExplorePageSpeciesTags',
      component: ExplorePage,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/watch-list',
      name: 'WatchList',
      component: WatchListPage,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
      meta: {
        title: 'Grainsmiths',
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Grainsmiths';
  next();
});

export default router;
