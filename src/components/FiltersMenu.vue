<template>



    <!-- FILTER AREA -->
    <div class="py-2 mb-5 mt-3">

      <div class="row mt-2 mb-4">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-center">
          <multiselect
            v-model="multiValue"
            :options="options"
            :multiple="true"
            :close-on-select="true"
            placeholder="Search for species"
            track-by="name_for_url"
            label="name"
            @input="updateRouteOnSpecies"
            >
          </multiselect>
        </div>
        <div class="col-sm-2"></div>
      </div>

      <div class="flex-row justify-content-center text-center">
        <span v-for="tag in tag_menu" v-bind:key="tag">
          <div v-if="tag_filters.includes(tag)" v-on:click="removeTagFilter(tag)" class="gs-badge badge filter-badge selected-filter-badge py-1 px-4 mx-2 my-1">
            {{ cleanTagSpecies(tag) }}
          </div>
          <div v-else v-on:click="addTagFilter(tag)" class="gs-badge badge filter-badge py-1 px-4 mx-2 my-1">
            {{ cleanTagSpecies(tag) }}
          </div>
        </span>
      </div>

    </div>
    <!-- FILTER AREA -->
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'

export default {
  name: "FiltersMenu",
  components: {
    Multiselect
  },
  methods: {
    populateSpeciesMenu() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_species_menu'
      let query_params = {'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY}
      axios
        .post(url, query_params)
        .then(response => {
            this.options = [...response.data.menu]
        })
    },
    populateTagMenu() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_tag_menu'
      let query_params = {'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY}
      axios
        .post(url, query_params)
        .then(response => {
            this.tag_menu = [...response.data.menu]
        })
    },
    updateRouteOnSpecies() {
      var new_species_filters = []
      this.multiValue.forEach(element => new_species_filters.push(element.name_for_url));
      let new_url = this.makeUrl(new_species_filters, this.tag_filters)
      this.$router.push({ path: new_url })
    },
    cleanTagSpecies(thing) {
      return thing.replace(/_/g," ").replace(/-/g," ")
    },
    makeUrl(species_filters, tag_filters) {
      if (species_filters.length == 0) {
        return '/explore/all-species/'+tag_filters.join("+")
      } else {
        return '/explore/'+species_filters.join("+")+'/'+tag_filters.join("+")
      }
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
    species_filters: Array
  },
  data () {
    return {
      multiValue: [],
      allSpecies: {},
      options: [],
      tag_menu: []
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
      this.multiValue.length = 0
      this.species_filters.forEach(element => {
        this.multiValue.push({
          'name': this.cleanTagSpecies(element),
          'name_for_url': element
        })
      })
    }
  },
  mounted() {
    console.log("Initial filters menu mounting...")
    this.populateSpeciesMenu()
    this.populateTagMenu()
    console.log()
  }
};


</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style lang="css" scoped>

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

</style>

<style lang="css">
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