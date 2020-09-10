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
    <div v-if="$route.name == 'ProductImage'">
      <router-view />
    </div>
    <div v-else class="d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="container-fluid">
        <router-view />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
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
