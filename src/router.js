import Vue from "vue"
import VueRouter from "vue-router"
import ExploreView from "./views/ExploreView.vue"
import WatchList from "./views/WatchList.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ExploreView,
      meta: {
        title: 'Grainsmiths',
      },
      alias: '/explore/'
    },
    {
      path: '/explore/:species',
      name: 'ExploreViewSpecies',
      component: ExploreView,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/explore/:species/:tags',
      name: 'ExploreViewSpeciesTags',
      component: ExploreView,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/watch-list',
      name: 'WatchList',
      component: WatchList,
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
