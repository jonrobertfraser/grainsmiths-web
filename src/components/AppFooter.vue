<template>
    <div class="container-fluid footer pt-5 mt-auto">
      <div class="row">
        <div class="col-sm-12 footer-brand-image text-center">
          <img src="../assets/logo-build-something-beautiful-grey.svg" alt="">

            <!-- <router-link class="nav-link" :to="{'name': 'AboutPage'}">
              About Grainsmiths
            </router-link> -->

          <div class="mt-4 mb-3">
            &copy; Grainsmiths {{ new Date().getFullYear() }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "Footer",
  methods: {}
};
</script>

<style scoped>

  .footer {
    background-color: rgb(51,51,51);
    color: rgb(192, 192, 192);
  }
  .footer a {
    color: rgb(192, 192, 192);
  }
  .footer a:hover {
    color: #FFFFFF;
  }
  .footer-brand-image {
    margin-bottom: 1em;
  }
  .footer-brand-image img {
    height: 4em;
  }

</style>
