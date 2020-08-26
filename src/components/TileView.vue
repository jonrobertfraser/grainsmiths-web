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

        <ProductCard
          :product_id="product.id"
          :thumbnail_url="product.thumbnail_url"
          :count="product.count"
          :price="product.price"
          :max_length="product.max_length"
          :max_width="product.max_width"
          :max_thickness="product.max_thickness"
          :diameter="product.diameter"
          :species="product.species"
          :subspecies="product.subspecies"
          :gs_tags="product.gs_tags"
          :url="product.url"
          :title="product.title"
          :description="product.description"
          :image_urls="product.image_urls"
          :company_name="product.company_name"
          :favorited="favorites.includes(product.id)"
          @addTagFilter="addTagFilter"
          @removeTagFilter="removeTagFilter"
          @addSpeciesFilter="addSpeciesFilter"
          @addFavorite="addFavorite"
          @removeFavorite="removeFavorite"
          @showLightbox="showLightbox"
        />

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
import ProductCard from '../components/ProductCard.vue'

export default {
  name: "TileView",
  components: {
    ImageLightbox,
    FiltersMenu,
    ProductCard
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
    showLightbox(image_urls) {
      this.lightboxIndex = 0
      this.lightboxImages.length = 0;
      image_urls.forEach(element => this.lightboxImages.push(element));
    },
    closeLightbox() {
      this.lightboxIndex = null
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
    addSpeciesFilter(species) {
      if (!this.species_filters.includes(species)) {
        this.species_filters.push(species)
      }
      let new_url = this.makeUrl(this.species_filters, this.tag_filters)
      this.$router.push({ path: new_url })
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
    updateDataFromRoute(params) {
      console.log("Update data from route")
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
</style>
