<template>
  <div>

    <FiltersMenu
      :tag_filters="tag_filters"
      :species_filters="species_filters"
      @addSpeciesFilter="addSpeciesFilter"
      @removeSpeciesFilter="removeSpeciesFilter"
      @addTagFilter="addTagFilter"
      @removeTagFilter="removeTagFilter"
    />

    <TiledCards
      :products="products"
      :species_filters="species_filters"
      :tag_filters="tag_filters"
      :data_available="last_call_count == api_call_limit"
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
    addSpeciesFilter(species) {
      if (!this.species_filters.includes(species)) {
        this.species_filters.push(species)
      }
      let new_url = this.makeUrl(this.species_filters, this.tag_filters)
      this.$router.push({ path: new_url })
    },
    removeSpeciesFilter(species) {
      const index = this.species_filters.indexOf(species);
      if (index > -1) {
        this.species_filters.splice(index, 1);
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
      this.addMoreProducts()
    }
  }
};
</script>

<style scoped>

</style>
