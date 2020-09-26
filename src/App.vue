<template>
  <div id="app">
    <FlashMessage class="flash-message"/>


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
      <AppHeader v-if="$route.name != 'ProductImage'" :shoppingCartCount="shoppingCartCount"/>
      <div v-bind:class="{'container-fluid': $route.name != 'HomePage'}">
        <router-view
          @updatedCart="updatedCart"
        />
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
      shoppingCartCount: 0,
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
    setShoppingCartCount() {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      var cart = JSON.parse(localStorage.getItem('cart'))
      this.shoppingCartCount = cart.length
    },
    updatedCart() {
      this.setShoppingCartCount()
      this.flashMessage.show({
        status: 'success',
        message: 'Updated shopping cart...',
        blockClass: 'flash-message',
        contentClass: 'flash-message',
        wrapperClass: 'flash-message'
      });
    },
  },
  mounted() {
    this.setShoppingCartCount();
    if (!localStorage.getItem('visitor')) {
      let visitor = Math.floor(Math.random() * Math.floor(10000))
      localStorage.setItem('visitor', visitor)
    }

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
  .flash-message {
    width: 100%;
    position: fixed;
    background-color: #000;
    bottom: 0;
    z-index: 100;
    opacity: 1;
    font-size: 1.5em;

  }
</style>

