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
  font-family: 'Proxima Nova', helvetica, arial, sans-serif;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1em;
}

@import 'http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css';

</style>
