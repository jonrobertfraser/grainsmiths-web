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
import { faHeart as faHeartSolid, faInfoCircle, faSearchPlus, faSignOutAlt, faChevronUp, faChevronDown, faFilter, faLink, faBookmark, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faSearchPlus)
library.add(faInfoCircle)
library.add(faHeartSolid)
library.add(faSignOutAlt)
library.add(faHeartRegular)
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

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
let domain = process.env.VUE_APP_AUTH_DOMAIN
let clientId = process.env.VUE_APP_AUTH_CLIENT_ID
let audience = process.env.VUE_APP_AUTH_AUDIENCE

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.$cookies.config('7d')

Vue.config.productionTip = false

let driftAppId = process.env.VUE_APP_DRIFT_APP_ID

import VueDrift from 'vue-drift'
Vue.use(VueDrift, {
  appId: driftAppId,
  development: false,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
