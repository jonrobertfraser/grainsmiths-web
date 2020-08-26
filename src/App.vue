<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader />
    <div class="container-fluid">
      <router-view />
    </div>
    <AppFooter />
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
