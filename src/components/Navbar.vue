<template>
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #013220;">


      <router-link class="navbar-brand" to="/">
          <img style="height:35px;" src="../assets/grainsmiths-logo-white.svg" alt="">
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7" aria-controls="myNavbar7" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="myNavbar7">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/faq">How It Works</router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link waves-effect waves-light" href="https://twitter.com/grainsmiths" target="_blank">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link waves-effect waves-light" href="https://instagram.com/grainsmiths" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
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
