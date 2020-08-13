<template>
  <div class="container-fluid">
    <div class="card-columns mx-0 mt-5">
      <div v-for="product in products" v-bind:key="product.id" class="card mx-0 p-0 mb-4">

          <div href="#" class="content text-center inline">

            <img v-bind:src="product.thumbnail_url" class="card-img-top rounded mb-1" v-bind:alt="product.title">
            <span v-if="product.count > 1" class="gs-badge badge count-badge position-absolute">
                {{ product.count }} pieces
            </span>
          </div>
          <p class="my-0 mx-1">
            <a v-if="product.subspecies" class="gs-badge badge species-badge" v-bind:href="'/' + product.subspecies + '_' + product.species">
              {{ product.subspecies }} {{ product.species }}
            </a>
            <span v-if="product.species" class="gs-badge badge species-badge">
              {{ product.species }}
            </span>
          </p>
          <p class="my-0 mx-1">
            <a v-for="tag in product.gs_tags" v-bind:key="tag" class="gs-badge badge tag-badge">
                {{ tag }}
            </a>
          </p>
          <p class="my-0 mx-1">

          </p>
          <p class="my-1 mx-1">
            <span v-if="product.max_length" class="dimension-block">
              <span class="dimension-badge gs-badge badge">
                  {{ product.max_length }} in
              </span>
            </span>
            <span v-if="product.max_width" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.max_width }} in
              </span>
            </span>
            <span v-if="product.max_thickness" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.max_thickness }} in
              </span>
            </span>
            <span v-if="product.diameter" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.diameter }} in dia.
              </span>
            </span>
          </p>

          <p class="my-1 mx-1">
            <a class="store-link" v-bind:href="product.url" target="_blank">
              <font-awesome-icon :icon="['fas', 'link']" size="1x"/>&nbsp;{{ product.company_name }}
            </a>
          </p>


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
      //let url = 'http://localhost:5000/get_active_products'
      console.log(url)

      axios
        .post(url, {
          'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
          'convert_dims_to_fractions': true,
        })
        .then(response => {
          this.products = response.data.products
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
  }
};
</script>


<style lang="scss" scoped>
  @import 'bootstrap/scss/_functions.scss';
  @import 'bootstrap/scss/_variables.scss';
  @import 'bootstrap/scss/_mixins.scss';
  @import "bootstrap/scss/mixins/_breakpoints";

  .card-columns {
    column-count: 5;

    @include media-breakpoint-down(xl) {
      column-count: 5;
    }
    @include media-breakpoint-down(lg) {
      column-count: 4;
    }
    @include media-breakpoint-down(md) {
      column-count: 3;
    }
    @include media-breakpoint-down(sm) {
      column-count: 2;
    }
    @include media-breakpoint-down(xs) {
      column-count: 2;
    }
  }
  .card {
    border: none;
  }
  .card.img:hover {
    border-radius:2rem!important
  }
  .rounded {
    border-radius:1rem!important
  }
  .badge {
    font-size: 0.9em;
  }
  .species-badge {
    background-color: rgb(100,150,62);
    color: rgb(255,255,255);
  }
  .species-badge:hover {
    background-color: rgb(50,75,31);
  }
  .tag-badge {
    background-color: rgb(90,90,90);
    color: rgb(255,255,255);
  }
  .tag-badge:hover {
    background-color: rgb(40,40,40);
  }
  .count-badge {
    background-color: rgb(255,255,255);
    border: 1px solid #999;
    top: 0.75em;
    left: 0.75em;
    font-size: 0.8em;
  }
  .dimension-badge {
    border: 1px solid #999;
    font-size: 0.8em;
    margin-right: 0em!important;
    padding-left: 0.6em!important;
    padding-right: 0.6em!important;
  }
  .dimension-block + .dimension-block:before {
    content: " x ";
  }
  .gs-badge {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    margin-right: 0.5em;
    padding-top: 0.5em;
    padding-bottom: 0.45em;
    padding-left: 0.95em;
    padding-right: 0.95em;
    border-radius:.75rem!important
  }
  .store-link {
    font-size: 0.9em;
    color: rgb(150,150,150);
    margin-left: 0.35em;
  }
  .store-link:hover {
    color: rgb(100,100,100);
    text-decoration: none;
  }
  .content .content-overlay {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: #000000;
  }

  .content:hover img {
    opacity: 0.8;
    -webkit-transition: all 0.4s ease-in-out 0s;
    -moz-transition: all 0.4s ease-in-out 0s;
    transition: all 0.4s ease-in-out 0s;
  }

</style>
