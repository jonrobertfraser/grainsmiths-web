<template>
  <div class="container-fluid">

    <ImageLightbox
      :items="lightboxImages"
      :index="lightboxIndex"
      @closeLightbox="closeLightbox"
    />

    <FiltersMenu
      :tag_filters="tag_filters"
      :species_filters="species_filters"
      @addTagFilter="addTagFilter"
      @removeTagFilter="removeTagFilter"
    />


    <!-- MASONRY AREA -->
    <masonry
      :cols="{default: 5, 1000: 4, 700: 3, 600: 2}"
      :gutter="{default: '30px', 700: '15px'}"
      >
      <div v-for="(product, index) in products" :key="index" class="card mb-5 text-center">


        <!-- PRODUCT IMAGE AND COUNT -->
        <a v-on:click="updateLightboxImages(product.image_urls)" class="content text-center inline">
          <img v-bind:src="product.thumbnail_url" class="card-img-top rounded mb-1" v-bind:alt="product.title">
          <span v-if="product.count > 1" class="gs-badge badge count-badge white-badge">
              {{ product.count }} pieces
          </span>
        </a>
        <!-- PRODUCT IMAGE AND COUNT -->

        <!-- FAVORITE AND PRICE -->
        <div class="d-flex justify-content-between mx-2 my-1">
          <div v-if="favorites.includes(product.id)" v-on:click="removeFavorite(product.id)" class="favorite favorited">
            <font-awesome-icon :icon="['fas', 'heart']" size="1x"/>
          </div>
          <div  v-else class="favorite" v-on:click="addFavorite(product.id)">
            <font-awesome-icon :icon="['far', 'heart']" size="1x"/>
          </div>
          <div class="price">
            {{ Math.floor(product.price) }}
          </div>
        </div>
        <!-- FAVORITE AND PRICE -->

        <!-- DIMENSIONS -->
        <div class="my-0 mx-1 text-center">
          <DimensionSet
            :length="product.max_length"
            :width="product.max_width"
            :thickness="product.max_thickness"
            :diameter="product.max_diameter"
          />
        </div>
        <!-- DIMENSIONS -->


        <!-- SPECIES, SUBSPECIES -->
        <div class="my-0 mx-1">
          <span v-for="species in [product.species, product.subspecies]" v-bind:key="species">
            <router-link v-if="species" v-bind:key="species" class="gs-badge badge species-badge" :to="addSpeciesForUrl(species)">
              {{ cleanTagSpecies(species) }}
          </router-link>
          </span>
        </div>
        <!-- SPECIES, SUBSPECIES -->


        <!-- TAGS -->
        <div class="my-0 mx-1">
          <div v-for="tag in product.gs_tags" v-bind:key="tag" class="gs-badge badge tag-badge" v-on:click="addTagFilter(tag)">
              {{ cleanTagSpecies(tag) }}
          </div>
        </div>
        <!-- TAGS -->


        <!-- STORE LINK -->
        <div class="mt-2 mb-1 mx-1">
          <a class="store-link" v-bind:href="product.url" target="_blank">
            <font-awesome-icon :icon="['fas', 'link']" size="1x"/>&nbsp;{{ product.company_name }}
          </a>
        </div>
        <!-- STORE LINK -->


        <!-- MORE DETAIL -->
        <div v-if="showMore[product.id]" class="text-left more-detail">
          <div class="bold">{{product.title}}</div>
          <div>{{product.description.substring(0, 500) + "..."}}</div>
        </div>
        <!-- MORE DETAIL -->


        <!-- SHOW MORE BUTTON -->
        <span v-on:click="toggleShowMore(product.id)" v-if="!showMore[product.id]" class="show-more-button"><font-awesome-icon :icon="['fas', 'chevron-down']" size="sm" />&nbsp;Show more</span>
        <!-- SHOW MORE BUTTON -->


        <!-- SHOW LESS BUTTON -->
        <span v-on:click="toggleShowLess(product.id)" v-if="showMore[product.id]" class="show-more-button"><font-awesome-icon :icon="['fas', 'chevron-up']" size="sm" />&nbsp;Show less</span>
        <!-- SHOW LESS BUTTON -->


      </div>
    </masonry>

    <!-- MASONRY AREA -->

    <!-- LOAD MORE RESULTS -->
    <div class="text-center">
      <button v-if="last_call_count == api_call_limit" v-on:click="addMore()" type="button" class="btn btn-light mb-5">Load more...</button>
    </div>
    <!-- LOAD MORE RESULTS -->


  </div>
</template>


<script>

import axios from 'axios'
import ImageLightbox from '../components/ImageLightbox.vue'
import FiltersMenu from '../components/FiltersMenu.vue'
import DimensionSet from '../components/DimensionSet.vue'

export default {
  name: "TileView",
  components: {
    ImageLightbox,
    FiltersMenu,
    DimensionSet
  },
  methods: {
    refreshData() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_active_products'
      let query_params = {
        'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
        'convert_dims_to_fractions': true,
        'tag_filters': this.tag_filters,
        'species_filters': this.species_filters,
        'offset': this.offset,
        'limit': this.api_call_limit,
        'seed': this.seed
      }

      axios
        .post(url, query_params)
        .then(response => {
          this.last_call_count = response.data.products.length
          if (this.products.length == 0) {
            this.products = response.data.products
          } else {
            this.products = [...this.products.concat(response.data.products)]
          }
        })
    },
    getFavorites() {
      if (this.$auth.loading || !this.$auth.isAuthenticated) return;
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_favorites'
      let query_params = {
        'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
        'user_id': this.$auth.user.sub
      }
      axios
        .post(url, query_params)
        .then(response => {this.favorites = response.data.favorites})
    },
    addFavorite(product_id) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) return;
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/add_favorite'
      let query_params = {
        'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
        'user_id': this.$auth.user.sub,
        'product_id': product_id,
      }
      axios.post(url, query_params)
      this.favorites.push(product_id)
    },
    removeFavorite(product_id) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) return;
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/remove_favorite'
      let query_params = {
        'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
        'user_id': this.$auth.user.sub,
        'product_id': product_id,
      }
      axios.post(url, query_params)
      const index = this.favorites.indexOf(product_id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    },
    updateLightboxImages(image_urls) {
      this.lightboxIndex = 0
      this.lightboxImages.length = 0;
      image_urls.forEach(element => this.lightboxImages.push(element));
    },
    closeLightbox() {
      this.lightboxIndex = null
    },
    toggleShowMore(id) {
      this.$set(this.showMore, id, true);
    },
    toggleShowLess(id) {
      this.$set(this.showMore, id, false);
    },
    cleanTagSpecies(thing) {
      return thing.replace(/_/g," ").replace(/-/g," ")
    },
    addMore() {
      this.requested_more_products = true
      this.scroll_pos = window.scrollY
      this.offset += this.api_call_limit;
      this.refreshData();
    },
    makeUrl(species_filters, tag_filters) {
      if (species_filters.length == 0) {
        return '/explore/all-species/'+tag_filters.join("+")
      } else {
        return '/explore/'+species_filters.join("+")+'/'+tag_filters.join("+")
      }
    },
    addSpeciesForUrl(species) {
      var new_species_filters = [...this.species_filters]
      if (!this.species_filters.includes(species)) {
        new_species_filters.push(species)
      }
      return this.makeUrl(new_species_filters, this.tag_filters)
    },
    addTagFilter(tag) {

      if (!this.tag_filters.includes(tag)) {
        this.tag_filters.push(tag.replace(/\s/g,"_"))
      }
      let new_url = this.makeUrl(this.species_filters, this.tag_filters)
      this.$router.push({ path: new_url })
    },
    removeTagFilter(tag) {
      const index = this.tag_filters.indexOf(tag);
      if (index > -1) {
        this.tag_filters.splice(index, 1);
      }
      let new_url = this.makeUrl(this.species_filters, this.tag_filters)
      this.$router.push({ path: new_url })
    },
    removeSpeciesForUrl(species) {
      const index = this.species_filters.indexOf(species);
      var new_species_filters = [...this.species_filters] // shallow copy the list
      if (index > -1) {
        new_species_filters.splice(index, 1);
      }
      if (new_species_filters.length == 0) {
        new_species_filters = ['all-species']
      }
      return this.makeUrl(new_species_filters, this.tag_filters)
    },
    updateDataFromRoute(params) {
      if (params.species) {
        this.species_filters = params.species.split("+")
      }
      const index = this.species_filters.indexOf('all-species');
      if (index > -1) {
        this.species_filters.splice(index, 1);
      }
      if (params.tags) {
        this.tag_filters = params.tags.split("+")
      } else {
        this.tag_filters.length = 0
      }
    },
  },
  data () {
    return {
      products: [],
      species_filters: [],
      tag_filters: [],
      offset: 0,
      api_call_limit: 10,
      last_call_count: 0,
      seed: 0,
      showMore: {},
      lightboxIndex: null,
      lightboxImages: [],
      favorites: [],
      scroll_pos: 0,
      requested_more_products: false
    }
  },
  updated() {
    if (this.requested_more_products) {
      /* Update scroll position back to where
      you were previously after more products
      are loaded. */
      window.scrollTo(0, this.scroll_pos);
      this.requested_more_products = false;
    }
    console.log("Favorites: "+this.favorites)
  },
  mounted() {
    this.seed = Math.ceil(Math.random() * 10)
    this.updateDataFromRoute(this.$router.currentRoute.params)
    this.refreshData()
  },
  watch: {
    '$auth.loading': function () {
      console.log("loading changed...")
      console.log("Authenticated: "+this.$auth.isAuthenticated)
      console.log("Loading: "+this.$auth.loading)
      this.getFavorites()
    },
    '$route'(to) {
      this.scroll_pos = 0
      this.updateDataFromRoute(to.params)
      this.products.length = 0
      this.offset = 0
      this.refreshData()
    }
  }
};


</script>

<!-- Non scoped style passes style to children. -->
<style>
  .gs-badge {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    margin-right: 0.4em;
    padding-top: 0.5em;
    padding-bottom: 0.45em;
    padding-left: 0.7em;
    padding-right: 0.7em;
    border-radius:.75rem;
    color: rgb(255,255,255);
    font-size: 1em;
    font-weight: 400;
  }

  .white-badge {
    background-color: #FFFFFF;
    color: #666;
    border: 1px solid #999;
    padding-left: 0.6em;
    padding-right: 0.6em;
    margin-right: 0.1em;
  }
</style>

<!-- Scoped style doesn't pass style to children. -->
<style lang="css" scoped>

  .card {
    border: none;
  }
  .rounded {
    border-radius:1rem!important
  }
  .species-badge {
    background-color: rgb(100,150,62);
  }
  .species-badge:hover {
    background-color: rgb(50,75,31);
    color: #FFFFFF;
  }
  .tag-badge {
    background-color: rgb(90,90,90);
  }
  .tag-badge:hover {
    background-color: rgb(40,40,40);
    color: #FFFFFF;
    cursor: pointer;
  }

  .count-badge {
    position: absolute;
    top: 0.75em;
    left: 0.75em;
    font-size: 0.9em;
  }
  .store-link {
    color: rgb(150,150,150);

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
  .content:focus {
    outline: none;
    box-shadow: none;
  }

  .more-detail {
    padding-top: 0.5em;
    padding-bottom: 0.8em;
    font-size:0.9em;
  }
  .show-more-button {
    color: rgb(150,150,150);

  }
  .show-more-button:hover {
    color: rgb(100,100,100);
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .price {
    color: #666;
    font-weight: 700;
  }
  .price:before {
    color: #666;
    content: '$';
    font-size: 0.7em;
  }
  .favorite {
    cursor: pointer;
    color: #666;
    padding-top: 0.1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-radius:.6rem;
  }
  .favorite:hover {
    color: #FFF;
    background-color: #E60023;
  }
  .favorited {
    color: #E60023;
  }
  .favorited:hover {
    color: #E60023;
    background-color: #FFFFFF
  }
</style>
