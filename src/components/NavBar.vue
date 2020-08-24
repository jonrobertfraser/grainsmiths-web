<template>
    <nav class="navbar navbar-expand-md navbar-light">


      <router-link class="navbar-brand" to="/">
          <img style="height:35px;" src="../assets/grainsmiths-wood-finder.svg" alt="">
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7" aria-controls="myNavbar7" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="myNavbar7">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/faq">ABOUT GRAINSMITHS</router-link>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="https://instagram.com/grainsmiths" target="_blank">
              <font-awesome-icon size="lg" :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://reddit.com/r/grainsmiths" target="_blank">
              <font-awesome-icon size="lg" :icon="['fab', 'reddit-alien']" />
            </a>
          </li>
        </ul>
      </div>
    </nav>

</template>

<script>

export default {
  name: "NavBar",
  methods: {}
};
</script>

<style scoped>


  nav .navbar-nav li a {
    color: rgb(51,51,51)!important;
  }

</style>
