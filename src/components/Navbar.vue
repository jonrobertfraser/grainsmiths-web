<template>
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #013220;">


      <router-link class="navbar-brand" to="/">
          <img style="height:35px;" src="../assets/grainsmiths-logo-white.svg" alt="">
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7" aria-controls="myNavbar7" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="myNavbar7">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/faq">How It Works</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link waves-effect waves-light" href="https://instagram.com/grainsmiths" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link waves-effect waves-light" href="https://reddit.com/r/grainsmiths" target="_blank">
              <font-awesome-icon :icon="['fab', 'reddit-alien']" />
            </a>
          </li>
        </ul>
      </div>
    </nav>

</template>

<script>

export default {
  name: "navbar",
  methods: {}
};
</script>

<style scoped>

</style>
