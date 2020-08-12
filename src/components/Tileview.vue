<template>
  <div class="container">
    <div class="row my-1 text-center d-inline-block">
      <!-- Spacer -->
    </div>
    <div class="card-columns">
      <div v-for="product in products" v-bind:key="product.id" class="card p-0 mb-2">
        <img v-bind:src="product.thumbnail_url" class="card-img-top" v-bind:alt="product.title">
        <blockquote class="card-block card-blockquote">
        <p>{{ product.title }}</p>

        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// https://grainsmiths-images.s3.amazonaws.com/thumbnails/

export default {
  name: "tileview",
  methods: {
    refreshData() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_active_products'
      console.log(url)

      axios
        .get(url, {headers: {
    'Authorization': process.env.VUE_APP_GRAINSMITHS_API_KEY
        }})
        .then(response => {
          this.products = response.data.products
          console.log(this.products)
        })
    }
  },
  data () {
    return {
      products: []
    }
  },
  mounted() {
    this.refreshData()
    console.log(process.env.VUE_APP_GRAINSMITHS_API_HOST)
    console.log("Hello")
  }
};
</script>


<style lang="scss" scoped>
  @import 'bootstrap/scss/_functions.scss';
  @import 'bootstrap/scss/_variables.scss';
  @import 'bootstrap/scss/_mixins.scss';
  @import "bootstrap/scss/mixins/_breakpoints";

  .card-columns {
    column-count: 6;
    column-gap: 0.5rem;
    @include media-breakpoint-down(xl) {
      column-count: 6;
    }
    @include media-breakpoint-down(lg) {
      column-count: 5;
    }
    @include media-breakpoint-down(md) {
      column-count: 4;
    }
    @include media-breakpoint-down(sm) {
      column-count: 3;
    }
    @include media-breakpoint-down(xs) {
      column-count: 2;
    }
  }
</style>
