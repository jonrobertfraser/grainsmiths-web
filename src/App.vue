<template>
  <div id="app">
    <b-modal
      id="requires-login"
      title=""
      hide-footer
      headerBgVariant="dark"
      headerTextVariant="light"
      centered
    >
      <div class="text-center">
        <img class="my-2" style="height:75px;" src="./assets/logo-grainsmiths.svg" alt="">
        <div class="menu-button my-4 mx-4 p-2" @click="login">
          Log in / Sign Up
        </div>
      </div>
    </b-modal>
    <div class="d-flex flex-column min-vh-100">
      <AppHeader v-if="$route.name != 'ProductImage'" />
      <div v-bind:class="{'container-fluid': $route.name != 'HomePage'}">
        <router-view />
      </div>
      <AppFooter v-if="$route.name != 'ProductImage'"/>
    </div>
  </div>
</template>

<script>

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      // Twitter Card
      {name: 'twitter:card', content: "Grainsmiths Wood Finder"},
      {name: 'twitter:title', content: "Grainsmiths Wood Finder"},
      {name: 'twitter:description', content: "The world's largest catalog of specialty wood products."},
      // image must be an absolute path
      {name: 'twitter:image', content: "https://grainsmiths-images.s3.us-east-2.amazonaws.com/other-assets/logo_grainsmiths_bsb_1000x1000.png"},
      // Facebook OpenGraph
      {property: 'og:title', content: "Grainsmiths Wood Finder"},
      {property: 'og:site_name', content: "Grainsmiths Wood Finder"},
      {property: 'og:type', content: 'website'},
      {property: 'og:image', content:  "https://grainsmiths-images.s3.us-east-2.amazonaws.com/other-assets/logo_grainsmiths_bsb_1000x1000.png"},
      {property: 'og:description', content: "The world's largest catalog of specialty wood products."},
    ],
  },
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      siteLogoSrc: "https://grainsmiths-images.s3.us-east-2.amazonaws.com/other-assets/logo_grainsmiths_bsb_1000x1000.png",
      siteDescription: "The world's largest catalog of specialty wood products.",
      siteTitle: "Grainsmiths Wood Finder",
    }
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
  }
}
</script>

<style>
  #app {
    font-family: Muli, Helvetica,Arial, sans-serif;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgb(51,51,51);
    font-size: 0.9em;
  }
</style>

<style lang="css" scoped>
  .menu-button {
    border-radius:.25rem;
    border: 1px solid #666;
    cursor: pointer;
  }
  .menu-button:hover {
    background-color: rgb(51,51,51);
    color: #FFFFFF!important;
  }
</style>
