<template>
  <NotFound v-if="product == null"/>
  <div v-else>
    <ProductLarge
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
      :favorited="favorited"
      @addTagFilter="exploreByTag"
      @addSpeciesFilter="exploreBySpecies"
      @addFavorite="addFavorite"
      @removeFavorite="removeFavorite"
    />
    <div class="mx-3 mt-5 mb-2">
      <h5 class="">Compare with similar items</h5>
      <hr />
    </div>

    <TiledCards
      :products="similar_products"
      @favoritesUpdated="isProductFavorited"
      @addTagFilter="exploreByTag"
      @addSpeciesFilter="exploreBySpecies"
    />

    <infinite-loading @infinite="addMoreProducts">
    </infinite-loading>
  </div>



</template>

<script>

import axios from 'axios'
import TiledCards from '../components/TiledCards.vue'
import ProductLarge from '../components/ProductLarge.vue'
import NotFound from './NotFound.vue'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "ProductPage",
  components: {
    ProductLarge,
    TiledCards,
    NotFound,
    InfiniteLoading,
  },
  methods: {
    isProductFavorited(favorites) {
      this.favorited = favorites.includes(this.product.id)
    },
    async addFavorite(productId) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) {
        this.$bvModal.show("requires-login")
        return;
      }
      const accessToken = await this.$auth.getTokenSilently()
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/add_favorite'
      let query_params = {
        'product_id': productId,
      }
      axios.post(url, query_params, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      this.favorited = true
      console.log("Added favorite "+productId)
    },
    async removeFavorite(productId) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) {
        this.$bvModal.show("requires-login")
        return;
      }
      const accessToken = await this.$auth.getTokenSilently()
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
      this.favorited = false
      console.log("Removed favorite "+productId)
    },
    getProductDetail(productId) {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_product'
      let query_params = {
        'product_id': productId,
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          if (Object.keys(response.data.product).length === 0 && response.data.product.constructor === Object) {
            this.product = null
          } else {
             this.product = response.data.product
            if (this.product.species) {
              this.species_filters.push(this.product.species)
            }
            if (this.product.subspecies) {
              this.species_filters.push(this.product.subspecies)
            }
            this.tag_filters = this.product.gs_tags
          }
        })
    },
    addMoreProducts($state) {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_active_products'
      let query_params = {
        'convert_dims_to_fractions': true,
        'tag_filters': this.tag_filters.join("+"),
        'species_filters': this.species_filters.join("+"),
        'offset': this.offset,
        'limit': this.apiCallLimit,
        'seed': this.seed
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          this.resultsCount = response.data.count
          if (response.data.products.length == 0) {
            $state.complete()
          } else {
            $state.loaded()
          }
          this.similar_products.push(...response.data.products)
        })
      this.offset += this.apiCallLimit;
    },
    exploreBySpecies(species) {
      this.$router.push({ path: '/explore/'+species })
    },
    exploreByTag(tag) {
      this.$router.push({ path: '/explore/all-species/'+tag })
    },
  },
  data () {
    return {
      product: {
        productId: 0,
        price: 0,
        image_urls: ["https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/logo-image-placeholder.png"]
      },
      favorited: false,
      similar_products: [],
      species_filters: [],
      tag_filters: [],
      offset: 0,
      apiCallLimit: 25,
      lastCallCount: 0,
      seed: 0,
    }
  },
  mounted() {
    this.seed = Math.ceil(Math.random() * 10)
    this.getProductDetail(this.$router.currentRoute.params.productId)
  },
  watch: {
    '$route'() {
      window.scrollTo(0, 0)
      this.product.image_urls = ["https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/logo-image-placeholder.png"]
      this.getProductDetail(this.$router.currentRoute.params.productId)
      this.similar_products.length = 0
      this.offset = 0
      this.favorited = false
    },
    'similar_products' () {
      const isProductId = (element) => element.id == this.product.id;
      const index = this.similar_products.findIndex(isProductId)
      if (index > -1) {
        this.similar_products.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>

</style>
