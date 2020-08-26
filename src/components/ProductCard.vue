<template>
  <div>
    <!-- PRODUCT IMAGE AND COUNT -->
    <a v-on:click="showLightbox" class="content text-center inline">
      <img v-bind:src="thumbnail_url" class="card-img-top rounded mb-1" v-bind:alt="title">
      <span v-if="count > 1" class="gs-badge badge count-badge white-badge">
          {{ count }} pieces
      </span>
    </a>
    <!-- PRODUCT IMAGE AND COUNT -->

    <!-- FAVORITE AND PRICE -->
    <div class="d-flex justify-content-between mx-2 my-1">
      <div v-if="favorited" v-on:click="removeFavorite" class="favorite favorited">
        <font-awesome-icon :icon="['fas', 'heart']" size="1x"/>
      </div>
      <div  v-else class="favorite" v-on:click="addFavorite">
        <font-awesome-icon :icon="['far', 'heart']" size="1x"/>
      </div>
      <div class="price">
        {{ Math.floor(price) }}
      </div>
    </div>
    <!-- FAVORITE AND PRICE -->

    <!-- DIMENSIONS -->
    <div class="my-0 mx-1 text-center">
      <DimensionSet
        :length="max_length"
        :width="max_width"
        :thickness="max_thickness"
        :diameter="diameter"
      />
    </div>
    <!-- DIMENSIONS -->


    <!-- SPECIES, SUBSPECIES -->
    <div class="my-0 mx-1">
      <div v-for="this_species in [species, subspecies].filter(x => x)" v-bind:key="this_species" v-on:click="addSpeciesFilter(this_species)" class="gs-badge badge species-badge">
          {{ cleanTagSpecies(this_species) }}
      </div>
    </div>
    <!-- SPECIES, SUBSPECIES -->


    <!-- TAGS -->
    <div class="my-0 mx-1">
      <div v-for="tag in gs_tags" v-bind:key="tag" class="gs-badge badge tag-badge" v-on:click="addTagFilter(tag)">
          {{ cleanTagSpecies(tag) }}
      </div>
    </div>
    <!-- TAGS -->


    <!-- STORE LINK -->
    <div class="mt-2 mb-1 mx-1">
      <a class="store-link" v-bind:href="url" target="_blank">
        <font-awesome-icon :icon="['fas', 'link']" size="1x"/>&nbsp;{{ company_name }}
      </a>
    </div>
    <!-- STORE LINK -->


    <!-- MORE DETAIL -->
    <div v-if="showMore" class="text-left more-detail">
      <div class="bold">{{title}}</div>
      <div>{{description.substring(0, 500) + "..."}}</div>
    </div>
    <!-- MORE DETAIL -->


    <!-- SHOW MORE BUTTON -->
    <span v-on:click="showMore = !showMore" v-if="!showMore" class="show-more-button"><font-awesome-icon :icon="['fas', 'chevron-down']" size="sm" />&nbsp;Show more</span>
    <!-- SHOW MORE BUTTON -->


    <!-- SHOW LESS BUTTON -->
    <span v-on:click="showMore = !showMore" v-if="showMore" class="show-more-button"><font-awesome-icon :icon="['fas', 'chevron-up']" size="sm" />&nbsp;Show less</span>
    <!-- SHOW LESS BUTTON -->
  </div>
</template>

<script>
import DimensionSet from '../components/DimensionSet.vue'

export default {
  name: "ProductCard",
  components: {
    DimensionSet
  },
  methods: {
    cleanTagSpecies(thing) {
      return thing.replace(/_/g," ").replace(/-/g," ")
    },
    showLightbox() {
      this.$emit('showLightbox',this.image_urls)
    },
    addTagFilter(tag) {
      this.$emit('addTagFilter', tag)
    },
    addSpeciesFilter(species) {
      this.$emit('addSpeciesFilter', species)
    },
    addFavorite() {
      this.$emit('addFavorite', this.product_id)
    },
    removeFavorite() {
      this.$emit('removeFavorite', this.product_id)
    },
  },
  props: {
    product_id: Number,
    thumbnail_url: String,
    count: Number,
    price: Number,
    max_length: String,
    max_width: String,
    max_thickness: String,
    diameter: String,
    species: String,
    subspecies: String,
    gs_tags: Array,
    url: String,
    title: String,
    description: String,
    image_urls: Array,
    company_name: String,
    favorited: Boolean,
  },
  data () {
    return {
      showMore: false,
    }
  },
}
</script>

<style lang="css">
  .gs-badge {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    margin-right: 0.4em;
    padding-top: 0.5em;
    padding-bottom: 0.45em;
    padding-left: 0.7em;
    padding-right: 0.7em;
    border-radius:.75rem;
    color: rgb(255,255,255);
    font-size: 1em;
    font-weight: 400;
  }
  .white-badge {
    background-color: #FFFFFF;
    color: #666;
    border: 1px solid #999;
    padding-left: 0.6em;
    padding-right: 0.6em;
    margin-right: 0.1em;
  }
</style>

<!-- Scoped style doesn't pass style to children. -->
<style lang="css" scoped>
  .rounded {
    border-radius:1rem!important
  }
  .species-badge {
    background-color: rgb(100,150,62);
  }
  .species-badge:hover {
    background-color: rgb(50,75,31);
    color: #FFFFFF;
    cursor: pointer;
  }
  .tag-badge {
    background-color: rgb(90,90,90);
  }
  .tag-badge:hover {
    background-color: rgb(40,40,40);
    color: #FFFFFF;
    cursor: pointer;
  }
  .count-badge {
    position: absolute;
    top: 0.75em;
    left: 0.75em;
    font-size: 0.9em;
  }
  .store-link {
    color: rgb(150,150,150);
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
  .content:focus {
    outline: none;
    box-shadow: none;
  }
  .more-detail {
    padding-top: 0.5em;
    padding-bottom: 0.8em;
    font-size:0.9em;
  }
  .show-more-button {
    color: rgb(150,150,150);

  }
  .show-more-button:hover {
    color: rgb(100,100,100);
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .price {
    color: #666;
    font-weight: 700;
  }
  .price:before {
    color: #666;
    content: '$';
    font-size: 0.7em;
  }
  .favorite {
    cursor: pointer;
    color: #666;
    padding-top: 0.1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-radius:.6rem;
  }
  /* Mobile devices fail the @media
  call so the insides don't get processed.
  This means that you don't get
  sticky hover states on mobile. */
  @media (hover: hover) {
    .favorite:hover {
      color: #FFF;
      background-color: #E60023;
    }
  }
  .favorited {
    color: #E60023;
  }
  .favorited:hover {
    color: #E60023;
    background-color: #FFFFFF
  }
</style>
