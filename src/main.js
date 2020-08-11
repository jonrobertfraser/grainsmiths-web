import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Refer to this URL for more information:
// https://github.com/FortAwesome/vue-fontawesome#using-brand-icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faInstagram)
library.add(faRedditAlien)


import 'bootstrap';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
