<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.8em;
}

@import 'http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css';

</style>
