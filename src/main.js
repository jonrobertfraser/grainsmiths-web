import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Refer to this URL for more information:
// https://github.com/FortAwesome/vue-fontawesome#using-brand-icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faFilter, faLink, faBookmark, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faInstagram)
library.add(faRedditAlien)
library.add(faLink)
library.add(faBookmark)
library.add(faWindowClose)
library.add(faFilter)

import 'bootstrap';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue)

import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
