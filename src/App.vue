<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Helvetica,Arial, sans-serif;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-size: 0.9em;
}

@import 'http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css';

</style>
