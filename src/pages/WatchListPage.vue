<template>
  <div>

    <div class="py-2 my-4">
      <div class="row">
        <div class="col-sm-2"><!-- Left Spacer --></div>
        <div class="col-sm-8">
          <div class="mx-4">
            <h3 class="mb-4">
              Your Watch List
            </h3>
            <p>
              This is a list of products you have selected to watch.
            </p>
            <p>
              Tell us what else you'd like to see here! Would you like to be notified of price changes? Or similar products? Anything else?
            </p>
          </div>
        </div>
        <div class="col-sm-2"><!-- Right Spacer --></div>
      </div>
    </div>

    <TiledCards
      :products="products"
      :data_available="false"
      @addTagFilter="addTagFilter"
      @addSpeciesFilter="addSpeciesFilter"
    />
  </div>
</template>

<script>

import axios from 'axios'
import TiledCards from '../components/TiledCards.vue'

export default {
  name: "WatchList",
  components: {
    TiledCards,
  },
  methods: {
    getFavoriteProducts() {
      if (this.retrieved_favorite_products || this.$auth.loading || !this.$auth.isAuthenticated) return;
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_favorite_products'
      let query_params = {
        'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
        'convert_dims_to_fractions': true,
        'user_id': this.$auth.user.sub
      }
      console.log("Executing get_favorite_products")
      axios
        .post(url, query_params)
        .then(response => {
          this.last_call_count = response.data.products.length
            this.products = response.data.products
        })
      this.retrieved_favorite_products = true
    },
    makeUrl(species_filters, tag_filters) {
      if (species_filters.length == 0) {
        return '/explore/all-species/'+tag_filters.join("+")
      } else {
        return '/explore/'+species_filters.join("+")+'/'+tag_filters.join("+")
      }
    },
    addSpeciesFilter(species) {
      this.$router.push({ path: '/explore/'+species })
    },
    addTagFilter(tag) {
      this.$router.push({ path: '/explore/all-species/'+tag })
    },
  },
  data () {
    return {
      products: [],
      retrieved_favorite_products: false
    }
  },
  watch: {
    '$auth.loading' () {
      this.getFavoriteProducts()
    }
  },
  updated () {
    this.getFavoriteProducts()
  },
  mounted () {
    this.getFavoriteProducts()
  },
};
</script>

<style scoped>

</style>
