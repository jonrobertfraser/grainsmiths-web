<template>
    <nav class="navbar navbar-expand-md navbar-light">

      <router-link class="navbar-brand" :to="{'name': 'HomePage'}">
          <img style="height:35px;" src="../assets/logo-grainsmiths.svg" alt="">
      </router-link>

      <button class="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#gsNavbar" aria-controls="gsNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse text-center" id="gsNavbar">
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a class="nav-link" href="https://instagram.com/grainsmiths" target="_blank">
              <font-awesome-icon size="lg" :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://reddit.com/r/grainsmiths" target="_blank">
              <font-awesome-icon size="lg" :icon="['fab', 'reddit-alien']" />
            </a>
          </li> -->
          <!-- <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'ContactPage'}" data-toggle="collapse" data-target=".navbar-collapse.show">
              Contact Us
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'ExplorePage'}" data-toggle="collapse" data-target=".navbar-collapse.show">
              Specialty Boards
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'BlanksPage'}" data-toggle="collapse" data-target=".navbar-collapse.show">
              Premium Blanks
            </router-link>
          </li>
          <li class="nav-item" v-if="!$auth.loading && !$auth.isAuthenticated">
            <!-- show login when not authenticated -->
            <div class="nav-link auth-link menu-button" @click="login" data-toggle="collapse"  data-target=".navbar-collapse.show">
              Log in / Sign Up
            </div>
            <!-- show login when not authenticated -->
          </li>

          <li class="nav-item" v-if="!$auth.loading && $auth.isAuthenticated">
            <router-link class="nav-link menu-button" :to="{'name': 'FavoritesPage'}" data-toggle="collapse" data-target=".navbar-collapse.show">
              <font-awesome-icon :icon="['far', 'heart']" size="1x" class="mr-2"/>Your Favorites
            </router-link>
          </li>

          <div class="dropdown-divider" v-if="!$auth.loading && $auth.isAuthenticated"></div>

          <li class="nav-item" v-if="!$auth.loading && $auth.isAuthenticated">
            <!-- show favorites, picture, and logout when authenticated -->
            <div class="dropdown">
              <img class="auth-image px-2" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :src="$auth.user.picture">
              <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="dropdownMenuButton">
                <div class="dropdown-item auth-link text-center py-0" @click="logout"  data-toggle="collapse" data-target=".navbar-collapse.show">
                  Log Out <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="1x" class="ml-2"/>
                </div>
              </div>
            </div>

            <!-- show picture and logout when authenticated -->
          </li>




        </ul>

      </div>

      <router-link to="/shopping-cart" class="ml-3 my-3 px-0 shopping-cart-link">
        <font-awesome-icon size="lg" :icon="['fas', 'shopping-cart']"/><span class="ml-1">{{ shoppingCartCount }}</span>
      </router-link>



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
  },
  data () {
    return {

    }
  },
  props: {
    shoppingCartCount: {type: Number, default: 0}
  }
};
</script>

<style scoped>

  .navbar {
    border-bottom:1px solid rgb(235,235,235);
  }
  nav .navbar-nav li a, .nav-link{
    color: rgb(51,51,51)!important;
  }
  .nav-item {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .nav-item img {
    border-radius: 50%;
    height: 35px;
  }
  .auth-image {
    display: inline-block;
    cursor: pointer;
  }
  .auth-link {
    display: inline-block;
    cursor: pointer;
    vertical-align: top;
  }
  .dropdown-menu {
    border: 1px solid #666;
  }
  .dropdown-item {
    font-size: 0.9em;
  }
  .dropdown-item:active {
    color: #FFFFFF;
    background-color: rgb(51,51,51);
  }
  .menu-button {
    border-radius:.25rem;
    border: 1px solid #666;
    padding-top: 0.5em!important;
    padding-bottom: 0.5em!important;
    padding-left: 1em!important;
    padding-right: 1em!important;
  }
  .menu-button:hover {
    background-color: rgb(51,51,51);
    color: #FFFFFF!important;
  }
  .shopping-cart-link {
    color: #333;
  }

</style>
