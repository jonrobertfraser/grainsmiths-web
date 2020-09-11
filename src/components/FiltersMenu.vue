<template>

    <!-- FILTER AREA -->
    <div class="py-2 my-4">

      <div class="row">
        <div class="col-md-2"><!-- Left Spacer --></div>
        <div class="col-md-8">

          <!-- INSTRUCTIONS -->
          <div class="mx-3 mb-4" v-if="show_filter_instructions">
            <div class="text-center gs-badge instruction px-5 mx-0">
              Search by species in the search box or look for specific features by clicking the tags below.
            </div>
            <div class="close-button" v-on:click="turnOffInstructions">
              &times;
            </div>
          </div>
          <!-- INSTRUCTIONS -->

          <!-- MULTISELECT FOR SPECIES -->
          <div class="mx-3">
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
          </div>
          <!-- MULTISELECT FOR SPECIES -->

          <!-- TAG LIST -->
          <div class="mx-1 mt-3 text-center">
            <span v-for="tag in tag_menu" v-bind:key="tag">
              <div v-if="tag_filters.includes(tag)" v-on:click="removeTagFilter(tag)" class="gs-badge badge filter-badge selected-filter-badge py-1 px-4 mx-2 my-1">
                {{ cleanTagSpecies(tag) }}
              </div>
              <div v-else v-on:click="addTagFilter(tag)" class="gs-badge badge filter-badge py-1 px-4 mx-2 my-1">
                {{ cleanTagSpecies(tag) }}
              </div>
            </span>
          </div>
          <!-- TAG LIST -->

          <!-- SLIDERS -->
          <div v-if="!showDimFilterMenu" class="d-flex justify-content-center">
            <div v-on:click="showDimFilterMenu = true" class="mt-4 mb-3 text-center w-md-50 gs-badge white-badge btn">
              Narrow search by dimensions<font-awesome-icon :icon="['fas', 'chevron-down']" size="sm" class="ml-3"/>
            </div>
          </div>

          <div class="position-relative mx-3 pt-3 pb-2 px-5 mt-4 dimFilterMenu" v-else>
            <div class="text-center pb-3">
              Narrow search by dimensions
            </div>
            <div class="filter-menu-close-button" v-on:click="closeDimFilterMenu">

            </div>
            <div class="w-100 px-4" v-for="(value, key) in sliderValueDefaults" :key="key+'-slider'">
              <div class="mb-2 mx-2">
                {{ key }}
              </div>
              <vue-slider class="mt-0 mb-4 pt-0"
                v-model="sliderValues[key]"
                :dotSize="[20, 20]"
                :height="10"
                :lazy="true"
                :max="value[1]"
                width="auto"
                :interval="1"
                tooltip="always"
                :tooltipPlacement="['left','right']"
                :minRange="2"
                :contained="true"
                :tooltip-formatter="val => {
                  if (val == value[1]) {
                    return val+'+ in'
                  } else {
                    return val+' in'
                  }}"
                @change="dimFilterChange"
              >
              </vue-slider>
            </div>
          </div>
          <!-- SLIDERS -->

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

export default {
  name: "FiltersMenu",
  components: {
    Multiselect,
    VueSlider
  },
  methods: {
    dimFilterChange() {
      this.$emit("dimFilterChange", this.sliderValues)
    },
    closeDimFilterMenu() {
      this.showDimFilterMenu = false
      this.sliderValues = this.sliderValueDefaults
      this.$emit("dimFilterChange", this.sliderValues)
    },
    turnOffInstructions() {
      this.show_filter_instructions = !this.show_filter_instructions
      this.$cookies.set('show_filter_instructions',this.show_filter_instructions)
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
    tag_filters: Array,
    species_filters: Array,
    resultsCount: Number,
    sliderValueDefaults: Object,
    setSliderValues: Object,
    showSliders: Boolean
  },
  data () {
    return {
      sliderValues: Object.assign({}, this.setSliderValues),
      multiValue: [],
      options: [],
      tag_menu: [],
      show_filter_instructions: true,
      showDimFilterMenu: this.showSliders
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
    species_filters: function () {
      this.multiValue = []
      this.species_filters.forEach(element => {
        this.multiValue.push({
          'name': this.cleanTagSpecies(element),
          'name_for_url': element
        })
      })
    },
    setSliderValues: function () {
      this.sliderValues = Object.assign({}, this.setSliderValues);
    },
  },
  mounted() {
    this.populateSpeciesMenu()
    this.populateTagMenu()
    if (this.$cookies.isKey("show_filter_instructions")) {
      this.show_filter_instructions = (this.$cookies.get("show_filter_instructions") == 'true')
    } else {
      this.$cookies.set("show_filter_instructions",this.show_filter_instructions)
    }
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
  .dimFilterMenu {
    background-color: rgb(247,247,247);
    border-radius:.75rem;
  }
  .filter-menu-close-button {
    cursor: pointer;
    position: absolute;
    color: #666;
    top: 0.2em;
    right: 1em;
    font-size: 1em;
  }
  .filter-menu-close-button:after {
    content: '\D7';
    font-size: 1.6em;
    margin-left: 0.2em;
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