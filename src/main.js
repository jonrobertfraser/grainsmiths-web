import Vue from 'vue'

/*
Import bootstrap first so that my modifications to styles
will not be overwritten by bootstrap. Order of style
declarations matter!
*/
import 'bootstrap';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue)


import App from './App.vue'
import router from './router'


// Refer to this URL for more information:
// https://github.com/FortAwesome/vue-fontawesome#using-brand-icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faChevronUp, faChevronDown, faFilter, faLink, faBookmark, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faInstagram)
library.add(faRedditAlien)
library.add(faLink)
library.add(faBookmark)
library.add(faWindowClose)
library.add(faChevronDown)
library.add(faChevronUp)
library.add(faFilter)


/* Masonry is for the organizing tiles */
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry)


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
