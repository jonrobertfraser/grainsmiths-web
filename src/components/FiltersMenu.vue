<template>



    <!-- FILTER AREA -->
    <div class="py-2 my-3 justify-content-center">

      <div class="d-flex flex-row justify-content-center my-2">
        <multiselect class="w-50"
          v-model="selected"
          :options="options"
          :multiple="true"
          :close-on-select="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          >
        </multiselect>
      </div>

      <div class="d-flex flex-row justify-content-center">
        <div v-if="species_filters.length == 0 && tag_filters.length == 0"  class="badge filter-badge py-3 px-4 mx-2 my-2">
          click species or tags to filter
        </div>
        <div v-for="species in species_filters" v-bind:key="species" class="badge filter-badge py-3 px-4 mx-2 my-2">
            <router-link v-bind:to="removeSpeciesForUrl(species)">
              <font-awesome-icon :icon="['fas', 'window-close']" size="lg" class="remove-filter-button"/>
            </router-link>
            {{ cleanTagSpecies(species) }}
        </div>
        <div v-for="tag in tag_filters" v-bind:key="tag" class="badge filter-badge py-3 px-4 mx-2 my-2">
            <router-link v-bind:to="removeTagForUrl(tag)"><font-awesome-icon :icon="['fas', 'window-close']" size="lg" class="remove-filter-button"/>
            </router-link>
            {{ cleanTagSpecies(tag) }}
        </div>
      </div>

    </div>
    <!-- FILTER AREA -->
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  name: "FiltersMenu",
  components: {
    Multiselect
  },
  methods: {
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
    addSpeciesForUrl(species) {
      var new_species_filters = [...this.species_filters]
      if (!this.species_filters.includes(species)) {
        new_species_filters.push(species)
      }
      return this.makeUrl(new_species_filters, this.tag_filters)
    },
    addTagForUrl(tag) {
      var new_tag_filters = [...this.tag_filters]
      if (!this.tag_filters.includes(tag)) {
        new_tag_filters.push(tag.replace(/\s/g,"_"))
      }
      return this.makeUrl(this.species_filters, new_tag_filters)
    },
    removeTagForUrl(tag) {
      const index = this.tag_filters.indexOf(tag);
      var new_tag_filters = [...this.tag_filters]
      if (index > -1) {
        new_tag_filters.splice(index, 1);
      }
      return this.makeUrl(this.species_filters, new_tag_filters)
    },
    removeSpeciesForUrl(species) {
      const index = this.species_filters.indexOf(species);
      var new_species_filters = [...this.species_filters] // shallow copy the list
      if (index > -1) {
        new_species_filters.splice(index, 1);
      }
      if (new_species_filters.length == 0) {
        new_species_filters = ['all-species']
      }
      return this.makeUrl(new_species_filters, this.tag_filters)
    },
  },
  props: {
    tag_filters: Array,
    species_filters: Array
  },
  data () {
    return {
      selected: null,
      options: ['list', 'of', 'options']
    }
  },
  mounted() {
    console.log("Initial filters menu mounting...")
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

  }
  .filter-badge:hover {
    color: rgb(50,50,50);
    background-color: rgb(238,238,238);
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



</style>
