<template>
  <div>

    <WrittenContent>
      <template v-slot:header>
        Your Favorites
      </template>
      <p>
        This is a list of products you have selected to keep an eye on.
      </p>
      <p>
        Tell us what else you'd like to see here! Would you like to be notified of price changes? Or similar products? Anything else?
      </p>
    </WrittenContent>

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
import WrittenContent from '../components/WrittenContent.vue'

export default {
  name: "FavoritesPage",
  components: {
    TiledCards,
    WrittenContent,
  },
  methods: {
    async getFavoriteProducts() {
      if (this.retrieved_favorite_products || this.$auth.loading || !this.$auth.isAuthenticated) return;
      const accessToken = await this.$auth.getTokenSilently()
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/private/get_favorite_products'
      let query_params = {
        'convert_dims_to_fractions': true,
      }
      console.log("Executing get_favorite_products")
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: query_params
        })
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
