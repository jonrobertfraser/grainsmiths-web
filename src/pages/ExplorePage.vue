<template>
  <div>

    <FiltersMenu
      :tagFilters="tagFilters"
      :speciesFilters="speciesFilters"
      :resultsCount="resultsCount"
      :sliderValueDefaults="dimFilterDefaults"
      :setSliderValues="dimFilters"
      :initialShowSpeciesFilterMenu="speciesFilters.length > 0"
      :initialShowDimFilterMenu="pathDims != null"
      :initialShowTagFilterMenu="tagFilters.length > 0"
      @dimFilterChange="dimFilterChange"
      @addSpeciesFilter="addSpeciesFilter"
      @removeSpeciesFilter="removeSpeciesFilter"
      @removeAllSpeciesFilters="removeAllSpeciesFilters"
      @addTagFilter="addTagFilter"
      @removeTagFilter="removeTagFilter"
      @removeAllTagFilters="removeAllTagFilters"
    />

    <TiledCards
      :products="products"
      @addTagFilter="addTagFilter"
      @addSpeciesFilter="addSpeciesFilter"
    />

    <infinite-loading class="mb-5" @infinite="addMoreProducts" :identifier="infiniteId">
      <div slot="no-more">That's the end of the list...</div>
      <div slot="no-results"></div>
    </infinite-loading>

  </div>
</template>

<script>

import axios from 'axios'
import TiledCards from '../components/TiledCards.vue'
import FiltersMenu from '../components/FiltersMenu.vue'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "ExploreView",
  components: {
    TiledCards,
    FiltersMenu,
    InfiniteLoading,
  },
  methods: {
    addMoreProducts($state) {
      this.page += 1

      if (this.page > 1)
        this.$router.replace({query: {p: this.page}})

      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_active_products'
      var maxLength = this.dimFilters.length[1]
      var maxWidth = this.dimFilters.width[1]
      var maxThickness = this.dimFilters.thickness[1]
      if (maxLength == this.dimFilterDefaults.length[1])
        maxLength = 10000
      if (maxWidth == this.dimFilterDefaults.width[1])
        maxWidth = 10000
      if (maxThickness == this.dimFilterDefaults.thickness[1])
        maxThickness = 10000

      let query_params = {
        'convert_dims_to_fractions': true,
        'tag_filters': this.tagFilters.join("+"),
        'species_filters': this.speciesFilters.join("+"),
        'offset': this.offset,
        'limit': this.apiCallLimit,
        'seed': this.seed,
        'min_length': this.dimFilters.length[0],
        'max_length': maxLength,
        'min_width': this.dimFilters.width[0],
        'max_width': maxWidth,
        'min_thickness': this.dimFilters.thickness[0],
        'max_thickness': maxThickness,
      }

      axios
        .get(url, {
          params: query_params,
        })
        .then(response => {
          this.resultsCount = response.data.count
          this.products.push(...response.data.products)
          if (response.data.products.length == 0) {
            $state.complete()
          } else {
            $state.loaded()
          }
        })
      this.offset += this.apiCallLimit;
    },
    dimFilterChange(sliderValues) {
      this.dimFilters = Object.assign({}, sliderValues);
      this.routeToNewFilters()
    },
    routeToNewFilters() {
      if (this.pathSpecies != this.speciesForPath || this.pathTags != this.tagsForPath || this.pathDims != this.dimsForPath) {
        this.$router.push({ 'name': 'ExplorePage', params: {
        pathSpecies: this.speciesForPath,
        pathTags: this.tagsForPath,
        pathDims: this.dimsForPath} })
      }
    },
    addSpeciesFilter(species) {
      window.scrollTo(0, 0)
      if (!this.speciesFilters.includes(species)) {
        this.speciesFilters.push(species)
      }
      this.routeToNewFilters()
    },
    removeSpeciesFilter(species) {
      window.scrollTo(0, 0)
      const index = this.speciesFilters.indexOf(species);
      if (index > -1) {
        this.speciesFilters.splice(index, 1);
      }
      this.routeToNewFilters()
    },
    removeAllSpeciesFilters() {
      window.scrollTo(0, 0)
      this.speciesFilters = []
      this.routeToNewFilters()
    },
    addTagFilter(tag) {
      window.scrollTo(0, 0)
      if (!this.tagFilters.includes(tag)) {
        this.tagFilters.push(tag.replace(/\s/g,"_"))
      }
      this.routeToNewFilters()
    },
    removeTagFilter(tag) {
      window.scrollTo(0, 0)
      const index = this.tagFilters.indexOf(tag);
      if (index > -1) {
        this.tagFilters.splice(index, 1);
      }
      this.routeToNewFilters()
    },
    removeAllTagFilters() {
      window.scrollTo(0, 0)
      this.tagFilters = []
      this.routeToNewFilters()
    },
    getDimRange(prefix, string) {
      let regex = new RegExp('(?:'+prefix+')(\\d+)',"g")
      var dimRange = []
      var dimLimit = Number
      while ((dimLimit = regex.exec(string)) != null) {
        dimRange.push(parseInt(dimLimit[1]))
      }
      if (dimRange.length == 2) return dimRange
      else return null
    },
    updateDataFromRoute() {

      if (this.pathSpecies == 'all-species') this.speciesFilters = []
      else this.speciesFilters = this.pathSpecies.split("+")
      if (this.pathTags == 'all-tags') this.tagFilters = []
      else this.tagFilters = this.pathTags.split("+")
      this.dimFilters = Object.assign({}, this.dimFilterDefaults);
      if (this.pathDims != null) {
        let lengthFilters = this.getDimRange("L", this.pathDims)
        let widthFilters = this.getDimRange("W", this.pathDims)
        let thicknessFilters = this.getDimRange("T", this.pathDims)
        if (lengthFilters != null)
          this.dimFilters.length = [parseInt(lengthFilters[0]), parseInt(lengthFilters[1])]
        if (widthFilters != null)
          this.dimFilters.width = [parseInt(widthFilters[0]), parseInt(widthFilters[1])]
        if (thicknessFilters != null)
          this.dimFilters.thickness = [parseInt(thicknessFilters[0]), parseInt(thicknessFilters[1])]
      }
    },
  },
  data () {
    let minLength = 0
    let maxLength = 100
    let minWidth = 0
    let maxWidth = 50
    let minThickness = 0
    let maxThickness = 10

    return {
      page: 0,
      products: [],
      speciesFilters: [],
      tagFilters: [],
      offset: 0,
      apiCallLimit: 25,
      seed: 0,
      resultsCount: null,
      dimFilterDefaults: {
        length: [minLength, maxLength],
        width: [minWidth, maxWidth],
        thickness: [minThickness, maxThickness],
      },
      dimFilters: {
        length: [minLength, maxLength],
        width: [minWidth, maxWidth],
        thickness: [minThickness, maxThickness],
      },
      infiniteId: +new Date(),
    }
  },
  props: {
    pathSpecies: {type: String, default: 'all-species'},
    pathTags: {type: String, default: 'all-tags'},
    pathDims: {type: String, default: null}
  },
  computed: {
    speciesForPath: function () {
      if (this.speciesFilters.length == 0) {
        return 'all-species'
      } else {
        return this.speciesFilters.join("+")
      }
    },
    tagsForPath: function () {
      if (this.tagFilters.length == 0) {
        return 'all-tags'
      } else {
        return this.tagFilters.join("+")
      }
    },
    dimsForPath: function () {
      if (this.dimFilters == null) {
        return null
      } else {
        var dimFiltersForPath = []
        Object.keys(this.dimFilters).forEach((key) => {
          if (this.dimFilters[key][0] != this.dimFilterDefaults[key][0] ||
            this.dimFilters[key][1] != this.dimFilterDefaults[key][1]) {
            let prefix = key.charAt(0).toUpperCase()
            let thisString = prefix+this.dimFilters[key][0]+"-"+prefix+this.dimFilters[key][1]
            if (this.dimFilters[key][1] == this.dimFilterDefaults[key][1]) thisString += '+'
            dimFiltersForPath.push(thisString)
          }
        })
        if (dimFiltersForPath.length == 0) {
          return null
        } else {
          return dimFiltersForPath.join("_")
        }
      }
    }
  },
  mounted() {
    console.log("Mounted.")
    this.seed = Math.ceil(Math.random() * 10)
    this.updateDataFromRoute()
    this.page = 0
    if (Object.entries(this.$route.query).length != 0) {
      this.$router.replace({query: {}})
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.path != from.path) {
        this.updateDataFromRoute()
        this.products = []
        this.infiniteId += 1
        this.offset = 0
        this.resultsCount = null
        this.page = 0
      }
    },
  },
};
</script>

<style scoped>

</style>
