<template>
  <div>

    <FiltersMenu
      :tag_filters="tagFilters"
      :species_filters="speciesFilters"
      :resultsCount="resultsCount"
      @addSpeciesFilter="addSpeciesFilter"
      @removeSpeciesFilter="removeSpeciesFilter"
      @addTagFilter="addTagFilter"
      @removeTagFilter="removeTagFilter"
    />

    <TiledCards
      :products="products"
      :dataAvailable="lastCallCount == apiCallLimit"
      @addTagFilter="addTagFilter"
      @addSpeciesFilter="addSpeciesFilter"
      @addMoreProducts="addMoreProducts"
    />
  </div>
</template>

<script>

import axios from 'axios'
import TiledCards from '../components/TiledCards.vue'
import FiltersMenu from '../components/FiltersMenu.vue'

export default {
  name: "ExploreView",
  components: {
    TiledCards,
    FiltersMenu
  },
  methods: {
    addMoreProducts() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_active_products'
      let query_params = {
        'convert_dims_to_fractions': true,
        'tag_filters': this.tagFilters.join("+"),
        'species_filters': this.speciesFilters.join("+"),
        'offset': this.offset,
        'limit': this.apiCallLimit,
        'seed': this.seed
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          this.lastCallCount = response.data.products.length
          this.resultsCount = response.data.count
          if (this.products.length == 0) {
            this.products = response.data.products
          } else {
            this.products = [...this.products.concat(response.data.products)]
          }
        })
      this.offset += this.apiCallLimit;
    },
    makeUrl(speciesFilters, tagFilters) {
      if (speciesFilters.length == 0) {
        return '/explore/all-species/'+tagFilters.join("+")
      } else {
        return '/explore/'+speciesFilters.join("+")+'/'+tagFilters.join("+")
      }
    },
    addSpeciesFilter(species) {
      if (!this.speciesFilters.includes(species)) {
        this.speciesFilters.push(species)
      }
      let new_url = this.makeUrl(this.speciesFilters, this.tagFilters)
      this.$router.push({ path: new_url })
    },
    removeSpeciesFilter(species) {
      const index = this.speciesFilters.indexOf(species);
      if (index > -1) {
        this.speciesFilters.splice(index, 1);
      }
      let new_url = this.makeUrl(this.speciesFilters, this.tagFilters)
      this.$router.push({ path: new_url })
    },
    addTagFilter(tag) {
      if (!this.tagFilters.includes(tag)) {
        this.tagFilters.push(tag.replace(/\s/g,"_"))
      }
      let new_url = this.makeUrl(this.speciesFilters, this.tagFilters)
      this.$router.push({ path: new_url })
    },
    removeTagFilter(tag) {
      const index = this.tagFilters.indexOf(tag);
      if (index > -1) {
        this.tagFilters.splice(index, 1);
      }
      let new_url = this.makeUrl(this.speciesFilters, this.tagFilters)
      this.$router.push({ path: new_url })
    },
    updateDataFromRoute(params) {
      if (params.species) {
        this.speciesFilters = params.species.split("+")
      }
      const index = this.speciesFilters.indexOf('all-species');
      if (index > -1) {
        this.speciesFilters.splice(index, 1);
      }
      if (params.tags) {
        this.tagFilters = params.tags.split("+")
      } else {
        this.tagFilters.length = 0
      }
    },
  },
  data () {
    return {
      products: [],
      speciesFilters: [],
      tagFilters: [],
      offset: 0,
      apiCallLimit: 25,
      lastCallCount: 0,
      seed: 0,
      resultsCount: -1,
    }
  },
  mounted() {
    this.seed = Math.ceil(Math.random() * 10)
    this.updateDataFromRoute(this.$router.currentRoute.params)
    this.addMoreProducts()
  },
  watch: {
    '$route'(to) {
      this.updateDataFromRoute(to.params)
      this.products.length = 0
      this.offset = 0
      this.resultsCount = null
      this.addMoreProducts()
    }
  }
};
</script>

<style scoped>

</style>
