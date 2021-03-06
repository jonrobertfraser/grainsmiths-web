<template>

    <!-- FILTER AREA -->
    <div class="py-2 mt-2 mb-3">

      <div class="row">
        <div class="col-md-2"><!-- Left Spacer --></div>
        <div class="col-md-8">

          <!-- SPECIES MENU -->
          <FilterBlock
            :showFilterMenu="showSpeciesFilterMenu"
            openTitle="Select one or more species"
            closedTitle="Search for species"
            @openFilterMenu="showSpeciesFilterMenu = true"
            @closeFilterMenu="closeSpeciesFilterMenu"
            @resetFilterMenu="resetSpeciesFilterMenu"
            >
            <template v-slot:body>
              <multiselect
                v-model="multiValue"
                :options="options"
                :multiple="true"
                :close-on-select="true"
                placeholder="Search for species"
                track-by="name_for_url"
                label="name"
                @select="addSpeciesFilter"
                @remove="removeSpeciesFilter"
                >
              </multiselect>
            </template>
          </FilterBlock>
          <!-- SPECIES MENU -->

          <!-- DIMENSION MENU -->
          <FilterBlock
            :showFilterMenu="showDimFilterMenu"
            openTitle="Choose dimension ranges"
            closedTitle="Search for board dimensions"
            @openFilterMenu="showDimFilterMenu = true"
            @closeFilterMenu="closeDimFilterMenu"
            @resetFilterMenu="resetDimFilterMenu"
            >
            <template v-slot:body>
              <div class="w-100 px-4" v-for="(value, key) in sliderValueDefaults" :key="key+'-slider'">
                <div class="mb-2 mx-2">
                  {{ key }}
                </div>
                <vue-slider class="mt-0 mb-2 pt-0"
                  v-model="sliderValues[key]"
                  :dotSize="[20, 20]"
                  :height="10"
                  :lazy="true"
                  :max="value[1]"
                  width="auto"
                  :interval="1"
                  :enable-cross="false"
                  tooltip="always"
                  :tooltipPlacement="['left','right']"
                  :contained="true"
                  :tooltip-formatter="val => {
                    if (val == value[1]) {
                      return 'No max'
                    } else {
                      return val+' in'
                    }}"
                  @change="dimFilterChange"
                >
                </vue-slider>
              </div>
            </template>
          </FilterBlock>
          <!-- DIMENSION MENU -->

          <!-- TAG MENU -->
          <FilterBlock
            :showFilterMenu="showTagFilterMenu"
            openTitle="Choose your tags"
            closedTitle="Search for product types"
            @openFilterMenu="showTagFilterMenu = true"
            @closeFilterMenu="closeTagFilterMenu"
            @resetFilterMenu="resetTagFilterMenu"
            >
            <template v-slot:body>
              <div class="px-2 text-center">
                <span v-for="tag in tag_menu" v-bind:key="tag">
                  <div v-if="tagFilters.includes(tag)" v-on:click="removeTagFilter(tag)" class="gs-badge badge filter-badge selected-filter-badge py-1 px-4 mx-1 my-1">
                    {{ cleanTagSpecies(tag) }}
                  </div>
                  <div v-else v-on:click="addTagFilter(tag)" class="gs-badge badge filter-badge py-1 px-4 mx-1 my-1">
                    {{ cleanTagSpecies(tag) }}
                  </div>
                </span>
              </div>
            </template>
          </FilterBlock>
          <!-- TAG MENU -->


        </div>
        <div class="col-md-2"><!-- Right Spacer --></div>
      </div>
      <div class="row results-count mt-3">
        <div v-if="resultsCount == -1" class="mx-4 mb-1">
          Found thousands of results
        </div>
        <div v-if="resultsCount >= 0 && resultsCount != null" class="mx-4 mb-1">
          Found {{ resultsCount }} results
        </div>
      </div>
    </div>
    <!-- FILTER AREA -->
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import FilterBlock from './FilterBlock.vue'

export default {
  name: "FiltersMenu",
  components: {
    Multiselect,
    VueSlider,
    FilterBlock,
  },
  methods: {
    resetSpeciesFilterMenu() {
      this.$emit("removeAllSpeciesFilters")
    },
    resetDimFilterMenu() {
      this.sliderValues = Object.assign({}, this.sliderValueDefaults)
      this.$emit("dimFilterChange", this.sliderValues)
    },
    resetTagFilterMenu() {
      this.$emit("removeAllTagFilters")
    },
    closeSpeciesFilterMenu() {
      this.showSpeciesFilterMenu = false
      this.resetSpeciesFilterMenu()
    },
    closeDimFilterMenu() {
      this.showDimFilterMenu = false
      this.resetDimFilterMenu()
    },
    closeTagFilterMenu() {
      this.showTagFilterMenu = false
      this.resetTagFilterMenu()
    },
    dimFilterChange() {
      this.$emit("dimFilterChange", this.sliderValues)
    },
    populateSpeciesMenu() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_species_menu'
      axios
        .get(url)
        .then(response => {
            this.options = [...response.data.menu]
        })
    },
    populateTagMenu() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_tag_menu'
      axios
        .get(url)
        .then(response => {
            this.tag_menu = [...response.data.menu]
        })
    },
    cleanTagSpecies(thing) {
      return thing.replace(/_/g," ").replace(/-/g," ")
    },
    addSpeciesFilter(species) {
      this.$emit('addSpeciesFilter', species.name_for_url)
    },
    removeSpeciesFilter(species) {
      this.$emit('removeSpeciesFilter', species.name_for_url)
    },
    addTagFilter(tag) {
      this.$emit('addTagFilter',tag)
    },
    removeTagFilter(tag) {
      this.$emit('removeTagFilter',tag)
    },

  },
  props: {
    tagFilters: {type: Array, default: () => []},
    speciesFilters: {type: Array, default: () => []},
    resultsCount: Number,
    sliderValueDefaults: Object,
    setSliderValues: Object,
    initialShowSpeciesFilterMenu: Boolean,
    initialShowTagFilterMenu: Boolean,
    initialShowDimFilterMenu: Boolean,
  },
  data () {
    return {
      sliderValues: Object.assign({}, this.setSliderValues),
      multiValue: [],
      options: [],
      tag_menu: [],
      showSpeciesFilterMenu: this.initialShowSpeciesFilterMenu,
      showTagFilterMenu: this.initialShowTagFilterMenu,
      showDimFilterMenu: this.initialShowDimFilterMenu,
    }
  },
  watch: {
    /*
    When parent (tileview) updates species list based on URL
    then it propagates down to this property and thus we should
    watch it and update the search menu accordingly. We can't
    do it on 'mounted' since this components gets mounted before
    the tileview gets to update its data based on the URL.
    */
    speciesFilters: function () {
      if (this.speciesFilters.length > 0)
        this.showSpeciesFilterMenu = true

      this.multiValue = []
      this.speciesFilters.forEach(element => {
        this.multiValue.push({
          'name': this.cleanTagSpecies(element),
          'name_for_url': element
        })
      })
    },
    tagFilters: function () {
      if (this.tagFilters.length > 0)
        this.showTagFilterMenu = true
    },
    setSliderValues: function () {
      this.sliderValues = Object.assign({}, this.setSliderValues);
    },
  },
  mounted() {
    this.populateSpeciesMenu()
    this.populateTagMenu()
  },
};


</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style lang="css" scoped>

  .instruction {
    background-color: #000000;
    color: #FFFFFF;
  }
  .close-button {
    position: absolute;
    right: 1.9em;
    top: 0.2em;
    color: #FFFFFF;
    font-size: 1.5em;
    cursor: pointer;
  }

  .filter-badge {
    position: relative;
    border: 1px solid rgb(238,238,238);
    font-size: 1em;
    font-weight: normal;
    color: rgb(100,100,100);
    background-color: rgb(255,255,255);
    border-radius:2rem;
    cursor: pointer;
  }
  .remove-filter-button {
    color: rgb(150,150,150);
    position: absolute;
    top: -0.3em;
    left: -0.3em;
  }
  .filter-badge:hover .remove-filter-button{
    color: rgb(0,0,0);
  }
  .selected-filter-badge {
    background-color: rgb(90,90,90);
    color: rgb(255,255,255);
    padding-right:0.8em!important;
  }
  .selected-filter-badge:after {
    content: "\D7";
    margin-left:0.5em;
  }
  .results-count {
    border-bottom:1px solid rgb(235,235,235);
  }
  .filter-menu-block {
    background-color: rgb(247,247,247);
    border-radius: 0em 0em 0.5em 0.5em;
    position: relative;
    margin: 0em 0.5em 2em 0.5em;
    padding: 1em 2em;
  }
  .filter-block-close-button {
    cursor: pointer;
  }
  .filter-block-title-line {
    background-color: #888;
    border-radius: 0.5em 0.5em 0em 0em;
    color: #FFF;
    margin: 2em 0.5em 0em 0.5em;
    padding: 1em;
  }
</style>

<style lang="css">
  /* process style */
  .vue-slider-process {
    background-color: #000;
  }
  .vue-slider-dot-tooltip-inner {
    color: #fff;
    border-color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .multiselect__input, .multiselect__placeholder {
    color: rgb(51,51,51);
    padding: 0.2em;
    font-size: 1em;
  }
  .multiselect__tag {
    background-color: rgb(100,150,62);
    border-radius:.75rem;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
  .multiselect__option:hover, .multiselect__option:after,
  .multiselect__option--highlight, .multiselect__tag-icon:hover {
    background-color: rgb(100,150,62);
  }
  .multiselect__tag-icon {
    padding-top: 0.2em;
  }
  .multiselect__tag-icon:after {
    color: #FFFFFF;
    font-size: 1.2em;
    font-weight: 200;
  }
</style>