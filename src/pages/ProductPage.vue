<template>
  <div>

      <ProductLarge
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
        :favorited="false"
        @addTagFilter="exploreByTag"
        @addSpeciesFilter="exploreBySpecies"
        @addFavorite="addFavorite"
        @removeFavorite="removeFavorite"
      />

    <TiledCards
      :products="products"
      :species_filters="species_filters"
      :tag_filters="tag_filters"
      :data_available="last_call_count == api_call_limit"
      @addTagFilter="exploreByTag"
      @addSpeciesFilter="exploreBySpecies"
      @addMoreProducts="addMoreProducts"
    />
  </div>
</template>

<script>

import axios from 'axios'
import TiledCards from '../components/TiledCards.vue'
import ProductLarge from '../components/ProductLarge.vue'

export default {
  name: "ProductPage",
  components: {
    ProductLarge,
    TiledCards,
  },
  methods: {
    async addFavorite(product_id) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) return;
      const accessToken = await this.$auth.getTokenSilently()
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/add_favorite'
      let query_params = {
        'product_id': product_id,
      }
      axios.post(url, query_params, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    async removeFavorite(product_id) {
      if (this.$auth.loading || !this.$auth.isAuthenticated) return;
      const accessToken = await this.$auth.getTokenSilently()
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/remove_favorite'
      let query_params = {
        'product_id': product_id,
      }
      axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: query_params
      })
    },
    getProductDetail(product_id) {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_product'
      let query_params = {
        'product_id': product_id,
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          this.product = response.data.product
        })
    },
    addMoreProducts() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_active_products'
      let query_params = {
        'convert_dims_to_fractions': true,
        'tag_filters': this.tag_filters.join("+"),
        'species_filters': this.species_filters.join("+"),
        'offset': this.offset,
        'limit': this.api_call_limit,
        'seed': this.seed
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          this.last_call_count = response.data.products.length
          if (this.products.length == 0) {
            this.products = response.data.products
          } else {
            this.products = [...this.products.concat(response.data.products)]
          }
        })
      this.offset += this.api_call_limit;
    },
    makeUrl(species_filters, tag_filters) {
      if (species_filters.length == 0) {
        return '/explore/all-species/'+tag_filters.join("+")
      } else {
        return '/explore/'+species_filters.join("+")+'/'+tag_filters.join("+")
      }
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
      product: {},
      products: [],
      species_filters: [],
      tag_filters: [],
      offset: 0,
      api_call_limit: 10,
      last_call_count: 0,
      seed: 0,
    }
  },
  mounted() {
    this.seed = Math.ceil(Math.random() * 10)
    this.getProductDetail(this.$router.currentRoute.params.product_id)
    this.addMoreProducts()
  },
};
</script>

<style scoped>

</style>
