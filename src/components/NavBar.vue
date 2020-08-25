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
            <router-link class="nav-link" to="/faq">About Grainsmiths</router-link>
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
          <li class="nav-item">

            <div v-if="!$auth.loading" class="nav-link">
              <!-- show login when not authenticated -->
              <div class="auth-link" v-if="!$auth.isAuthenticated" @click="login">Log in / Sign Up
              </div>
              <!-- show logout when authenticated -->
              <div class="auth-link" v-if="$auth.isAuthenticated" @click="logout">Log Out
              </div>
              <router-link class="auth-image" to="/profile" v-if="$auth.isAuthenticated" >
                <img :src="$auth.user.picture">
              </router-link>
            </div>
          </li>
        </ul>
      </div>


    </nav>

</template>

<script>

export default {
  name: "NavBar",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped>


  nav .navbar-nav li a, .nav-link{
    color: rgb(51,51,51)!important;
  }
  .auth-link {
    cursor: pointer;
    vertical-align: top;
  }
  .nav-link {
    vertical-align: text-top!important;
  }
  .nav-item img {
    border-radius: 50%;
    height: 35px;
    margin-left: 1em;
    margin-top: -5px;
  }
  .auth-image {
    display: inline-block;
  }
  .auth-link {
    display: inline-block;
  }

</style>
