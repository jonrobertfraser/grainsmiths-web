import Vue from "vue"
import VueRouter from "vue-router"
import Home from "./views/Home.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Grainsmiths',
      }
    },
    {
      path: '/explore/',
      name: 'explore',
      component: Home,
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
