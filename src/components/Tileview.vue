<template>
  <div class="container-fluid">
    Offset: {{ offset }}<br />
    Length: {{ products.length }}<br />

    <!-- FILTER AREA -->
    <div class="text-center py-2 my-5">
      <div v-if="species_filters.length == 0 && tag_filters.length == 0"  class="badge filter-badge py-3 px-5 mx-3">
        click species or tags to filter
      </div>
      <div v-for="species in species_filters" v-bind:key="species" class="badge filter-badge py-3 px-5 mx-3">
          <router-link v-bind:to="removeSpeciesForUrl(species)">
            <font-awesome-icon :icon="['fas', 'window-close']" size="lg" class="remove-filter-button"/>
          </router-link>
          {{ cleanTagSpecies(species) }}
      </div>
      <div v-for="tag in tag_filters" v-bind:key="tag" class="badge filter-badge py-3 px-5 mx-3">
          <router-link v-bind:to="removeTagForUrl(tag)"><font-awesome-icon :icon="['fas', 'window-close']" size="lg" class="remove-filter-button"/>
          </router-link>
          {{ cleanTagSpecies(tag) }}
      </div>
    </div>
    <!-- FILTER AREA -->

    <!-- CARDS AREA -->
    <div class="card-columns mx-0 mt-2">
      <div v-for="product in products" v-bind:key="product.id" class="card mx-0 p-0 mb-4">

          <!-- PRODUCT IMAGE AND COUNT -->
          <div href="#" class="content text-center inline">
            <img v-bind:src="product.thumbnail_url" class="card-img-top rounded mb-1" v-bind:alt="product.title">
            <span v-if="product.count > 1" class="gs-badge badge count-badge position-absolute">
                {{ product.count }} pieces
            </span>
          </div>
          <!-- PRODUCT IMAGE AND COUNT -->

          <!-- SPECIES, SUBSPECIES -->
          <p class="my-0 mx-1">
            <span v-for="species in [product.subspecies, product.species]" v-bind:key="species">
              <router-link v-if="species" v-bind:key="species" class="gs-badge badge species-badge" :to="addSpeciesForUrl(species)">
              {{ cleanTagSpecies(species) }}
            </router-link>
            </span>
          </p>
          <!-- SPECIES, SUBSPECIES -->

          <!-- TAGS -->
          <p class="my-0 mx-1">
            <router-link v-for="tag in product.gs_tags" v-bind:key="tag" class="gs-badge badge tag-badge" :to="addTagForUrl(tag)">
                {{ cleanTagSpecies(tag) }}
            </router-link>
          </p>
          <!-- TAGS -->

          <!-- DIMENSIONS -->
          <p class="my-1 mx-1">
            <span v-if="product.max_length" class="dimension-block">
              <span class="dimension-badge gs-badge badge">
                  {{ product.max_length }} in
              </span>
            </span>
            <span v-if="product.max_width" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.max_width }} in
              </span>
            </span>
            <span v-if="product.max_thickness" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.max_thickness }} in
              </span>
            </span>
            <span v-if="product.diameter" class="dimension-block">
              <span class="gs-badge badge dimension-badge">
                  {{ product.diameter }} in diam.
              </span>
            </span>
          </p>
          <!-- DIMENSIONS -->

          <!-- STORE LINK -->
          <p class="my-1 mx-1">
            <a class="store-link" v-bind:href="product.url" target="_blank">
              <font-awesome-icon :icon="['fas', 'link']" size="1x"/>&nbsp;{{ product.company_name }} {{ product.score }}
            </a>
          </p>
          <!-- STORE LINK -->

      </div>
      <div class="card mx-0 p-0 mb-4">Hello world</div>
    </div>
    <!-- CARDS AREA -->
    <div class="text-center">
      <button v-on:click="addMore()" type="button" class="btn btn-light">More...</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "TileView",
  methods: {
    refreshData() {
      console.log("Refresh Data.")
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/get_active_products'
      //let url = 'http://localhost:5000/get_active_products'
      axios
        .post(url, {
          'api_key': process.env.VUE_APP_GRAINSMITHS_API_KEY,
          'convert_dims_to_fractions': true,
          'tag_filters': this.tag_filters,
          'species_filters': this.species_filters,
          'offset': this.offset,
          'limit': 5
        })
        .then(response => {

          console.log("Cur products: "+this.products.length)
          console.log("Found products: "+response.data.products.length)
          console.log(response.data.products)
          if (this.products.length == 0) {
            this.products = response.data.products
          } else {
            this.products = [...this.products.concat(response.data.products)]
          }

          console.log("Cur products: "+this.products.length)
        })
    },
    cleanTagSpecies(thing) {
      return thing.replace("_"," ").replace("-"," ")
    },
    addMore() {
      this.offset += 5;
      this.refreshData();
    },
    /* NOT NECESSARY WHEN REFRESHING BASED ON ROUTE WATCHER */
    /*
    addTag(tag) {
      const index = this.tag_filters.indexOf(tag);
      if (index == -1) {
        this.tag_filters.push(tag);
      }
      // this.refreshData()
    },
    removeTag(tag) {
      const index = this.tag_filters.indexOf(tag);
      if (index > -1) {
        this.tag_filters.splice(index, 1);
      }
      // this.refreshData()
    },
    addSpecies(species) {
      const index = this.species_filters.indexOf(species);
      if (index == -1) {
        this.species_filters.push(species);
      }
      // this.refreshData()
    },
    removeSpecies(species) {
      const index = this.species_filters.indexOf(species);
      if (index > -1) {
        this.species_filters.splice(index, 1);
      }
      // this.refreshData()
    },
    */
    /* NOT NECESSARY WHEN REFRESHING BASED ON ROUTE WATCHER */
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
        new_tag_filters.push(tag.replace(" ","_"))
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
    updateDataFromRoute(params) {
      console.log("updateDataFromRoute")
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
      offset: 0
    }
  },
  mounted() {
    console.log("Initial mounting...")
    this.updateDataFromRoute(this.$router.currentRoute.params)
    this.refreshData()
  },
  watch: {
    '$route'(to) {
      console.log("Route changed...")
      this.updateDataFromRoute(to.params)
      this.refreshData()
    }
  }
};


</script>


<style lang="scss" scoped>

  @import 'bootstrap/scss/_functions.scss';
  @import 'bootstrap/scss/_variables.scss';
  @import 'bootstrap/scss/_mixins.scss';
  @import "bootstrap/scss/mixins/_breakpoints";

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

  .card-columns {
    column-count: 5;

    @include media-breakpoint-down(xl) {
      column-count: 5;
    }
    @include media-breakpoint-down(lg) {
      column-count: 4;
    }
    @include media-breakpoint-down(md) {
      column-count: 3;
    }
    @include media-breakpoint-down(sm) {
      column-count: 2;
    }
    @include media-breakpoint-down(xs) {
      column-count: 2;
    }
  }
  .card {
    border: none;
  }
  .card.img:hover {
    border-radius:2rem!important
  }
  .rounded {
    border-radius:1rem!important
  }

  .species-badge {
    background-color: rgb(100,150,62);
    color: rgb(255,255,255);
    font-size: 0.75em;
  }
  .species-badge:hover {
    background-color: rgb(50,75,31);
  }
  .tag-badge {
    background-color: rgb(90,90,90);
    color: rgb(255,255,255);
    font-size: 0.75em;
  }
  .tag-badge:hover {
    background-color: rgb(40,40,40);
  }
  .count-badge {
    background-color: rgb(255,255,255);
    border: 1px solid #999;
    top: 0.75em;
    left: 0.75em;
    font-size: 0.75em;
  }
  .dimension-badge {
    border: 1px solid #999;
    font-size: 0.75em;
    margin-right: 0em!important;
    padding-left: 0.6em!important;
    padding-right: 0.6em!important;
  }
  .dimension-block + .dimension-block:before {
    color: rgb(170,170,170);
    content: "\00A0\00D7\00A0";
  }
  .gs-badge {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    margin-right: 0.5em;
    padding-top: 0.5em;
    padding-bottom: 0.45em;
    padding-left: 0.95em;
    padding-right: 0.95em;
    border-radius:.75rem!important
  }
  .store-link {
    font-size: 0.9em;
    color: rgb(150,150,150);
    margin-left: 0.35em;
  }
  .store-link:hover {
    color: rgb(100,100,100);
    text-decoration: none;
  }
  .content .content-overlay {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: #000000;
  }

  .content:hover img {
    opacity: 0.8;
    -webkit-transition: all 0.4s ease-in-out 0s;
    -moz-transition: all 0.4s ease-in-out 0s;
    transition: all 0.4s ease-in-out 0s;
  }

</style>
