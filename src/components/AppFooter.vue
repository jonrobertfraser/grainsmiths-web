<template>
    <div class="container-fluid footer py-5 mt-auto">
      <div class="row">
        <div class="col-sm-6 footer-brand-image text-center">
          <img src="../assets/build-something-beautiful-grey.svg" alt="">
        </div>
        <div class="col-sm-6 text-center">
          <div>
            <router-link class="nav-link" to="/about">
              About Grainsmiths
            </router-link>
          </div>
          <div>
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
