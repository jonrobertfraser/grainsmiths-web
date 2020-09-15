<template>
  <div class="container-fluid mt-3">

    <ImageLightbox
      :items="lightboxImages"
      :index="lightboxIndex"
      @closeLightbox="closeLightbox"
    />

    <!-- MASONRY AREA -->
    <masonry
      :cols="{default: 5, 1000: 4, 700: 3, 600: 2}"
      :gutter="{default: '30px', 700: '15px'}"
      >
      <div v-for="(product, index) in products" :key="index" class="card mb-5 text-center">

        <ProductCard
          :productId="product.id"
          :thumbnailUrl="product.thumbnail_url"
          :count="product.count"
          :price="product.price"
          :maxLength="product.max_length"
          :maxWidth="product.max_width"
          :maxThickness="product.max_thickness"
          :diameter="product.diameter"
          :species="product.species"
          :subspecies="product.subspecies"
          :gsTags="product.gs_tags"
          :url="product.url"
          :title="product.title"
          :description="product.description"
          :imageUrls="product.image_urls"
          :companyName="product.company_name"
          :favorited="favorites.includes(product.id)"
          @addTagFilter="addTagFilter"
          @addSpeciesFilter="addSpeciesFilter"
          @addFavorite="addFavorite"
          @removeFavorite="removeFavorite"
          @showLightbox="showLightbox"
        />

      </div>
    </masonry>
    <!-- MASONRY AREA -->

  </div>
</template>


<script>

import axios from 'axios'
import ImageLightbox from '../components/ImageLightbox.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: "TiledCards",
  components: {
    ImageLightbox,
    ProductCard,
  },
  methods: {
    async getFavorites() {
      if (this.retrievedFavorites || this.$auth.loading || !this.$auth.isAuthenticated) return;
      const accessToken = await this.$auth.getTokenSilently()
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/get_favorites'
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {this.favorites = response.data.favorites})
      this.retrievedFavorites = true
    },
    async addFavorite(productId) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) {
        this.$bvModal.show("requires-login")
        return;
      }
      const accessToken = await this.$auth.getTokenSilently()
      this.favorites.push(productId)
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/add_favorite'
      let query_params = {
        'product_id': productId,
      }
      axios.post(url, query_params, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    async removeFavorite(productId) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) {
        this.$bvModal.show("requires-login")
        return;
      }
      const accessToken = await this.$auth.getTokenSilently()
      const index = this.favorites.indexOf(productId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/remove_favorite'
      let query_params = {
        'product_id': productId,
      }
      axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: query_params
      })
    },
    addSpeciesFilter(species) {
      this.$emit('addSpeciesFilter', species)
    },
    addTagFilter(tag) {
      this.$emit('addTagFilter', tag)
    },
    showLightbox(imageUrls) {
      this.lightboxIndex = 0
      this.lightboxImages.length = 0;
      imageUrls.forEach(element => this.lightboxImages.push(element));
    },
    closeLightbox() {
      this.lightboxIndex = null
    },
  },
  props: {
    products: Array,
  },
  data () {
    return {
      favorites: [],
      lightboxIndex: null,
      lightboxImages: [],
      retrievedFavorites: false,
    }
  },
  updated() {
    this.getFavorites()
  },
  mounted() {
    this.getFavorites()
  },
  watch: {
    '$auth.loading' () {
      this.getFavorites()
    },
    'favorites'() {
      this.$emit('favoritesUpdated', this.favorites)
    }
  }
};


</script>

<!-- Non scoped style passes style to children. -->
<style>

</style>

<!-- Scoped style doesn't pass style to children. -->
<style lang="css" scoped>
  .card {
    border: none;
  }
</style>
