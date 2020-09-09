<template>
  <div class="container-fluid mt-3">
    <div class="row justify-content-center">

      <div class="col-md-8 col-lg-6">
        <div>
          <h5 class="my-4">{{title}}</h5>
          <b-carousel
            id="product-large-carousel"
            v-model="slide"
            :interval="0"
            :indicators="hasControls"
            :controls="hasControls"
            background="#fff"
            transition=".6s ease-in-out left"
          >
            <b-carousel-slide v-for="(image_url, i) in image_urls" v-bind:key="i" style="text-align: center;">
              <template v-slot:img>
                <router-link target="_blank" :to="{name: 'ProductImage', params: { productId: product_id, imageIndex: i }}">
                  <img :src="image_url">
                </router-link>
              </template>
            </b-carousel-slide>
          </b-carousel>

        </div>
      </div>
    </div>
    <!-- PRODUCT IMAGE AND COUNT -->

    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <!-- FAVORITE AND PRICE -->
        <div class="d-flex justify-content-between mx-2 my-1">
          <div v-if="favorited" v-on:click="removeFavorite" class="favorite favorited py-1">
            <font-awesome-icon :icon="['fas', 'heart']" size="1x"/>
          </div>
          <div  v-else class="favorite py-1" v-on:click="addFavorite">
            <font-awesome-icon :icon="['far', 'heart']" size="1x"/>
          </div>
          <div class="my-0 mx-1 text-center">
            <DimensionSet
              :length="max_length"
              :width="max_width"
              :thickness="max_thickness"
              :diameter="diameter"
            />
          </div>
          <div class="price py-1">
            {{ Math.floor(price) }}
          </div>
        </div>
        <!-- FAVORITE AND PRICE -->

        <!-- SPECIES, SUBSPECIES -->
        <div class="my-0 mx-0">
          <div v-for="this_species in [species, subspecies].filter(x => x)" v-bind:key="this_species" v-on:click="addSpeciesFilter(this_species)" class="gs-badge badge species-badge">
              {{ cleanTagSpecies(this_species) }}
          </div>
        </div>
        <!-- SPECIES, SUBSPECIES -->


        <!-- TAGS -->
        <div class="my-0 mx-0">
          <div v-for="tag in gs_tags" v-bind:key="tag" class="gs-badge badge tag-badge" v-on:click="addTagFilter(tag)">
              {{ cleanTagSpecies(tag) }}
          </div>
        </div>
        <!-- TAGS -->
        <div class="my-0 mx-0">
          <div v-if="count > 1" class="gs-badge badge count-badge">
                {{ count }} pieces
          </div>
        </div>

        <!-- STORE LINK -->
        <div class="mt-3 mb-1 mx-0">
          <a class="store-link" v-bind:href="url" target="_blank">
            Buy it now at {{ company_name }}<font-awesome-icon :icon="['fas', 'external-link-alt']" size="1x" class="ml-2"/>&nbsp;
          </a>
        </div>
        <!-- STORE LINK -->


        <!-- MORE DETAIL -->
        <div class="text-left more-detail">
          <div>{{description}}</div>
        </div>
        <!-- MORE DETAIL -->
      </div>
    </div>



  </div>
</template>

<script>
import DimensionSet from '../components/DimensionSet.vue'


export default {
  name: "ProductLarge",
  components: {
    DimensionSet,
  },
  methods: {
    cleanTagSpecies(thing) {
      return thing.replace(/_/g," ").replace(/-/g," ")
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
    image_urls: {type: Array, default: function () { return [] }},
    company_name: String,
    favorited: Boolean,
  },
  data () {
    return {
      slide: 0,
      showMore: false,
      hasControls: false,
    }
  },
  updated() {
    this.hasControls = this.image_urls.length > 1
  },
}
</script>

<style lang="css">
  .carousel {
    margin-bottom: 40px;
  }
  .carousel-indicators {
    bottom: -55px;
  }
  .carousel-item {
    transition: 0.1s
  }
  .carousel img {
    max-height: 50vh;
    width: auto;
    max-width:100%
  }
  .carousel .carousel-indicators li {
    background-color: #000;
    opacity: 0.2;
    height: 10px;
    width: 10px;
  }
  .carousel .carousel-indicators li.active {
    opacity: 0.9;
  }
  @media (hover: hover) {
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      filter: invert(1);
    }
  }
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
  @media (hover: hover) {
    .species-badge:hover {
      background-color: rgb(50,75,31);
      color: #FFFFFF;
      cursor: pointer;
    }
  }
  .tag-badge {
    background-color: rgb(90,90,90);
  }
  @media (hover: hover) {
    .tag-badge:hover {
      background-color: rgb(40,40,40);
      color: #FFFFFF;
      cursor: pointer;
    }
  }
  .count-badge {
    border: 1px solid #999;
    background-color: rgb(255,255,255);
    color: #666;
  }
  .store-link {
    color: rgb(100,100,100);
    font-weight: 600;
  }
  @media (hover: hover) {
    .store-link:hover {
      text-decoration: underline;

    }
  }
  .content .content-overlay {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: #000000;
  }
  @media (hover: hover) {
    .content:hover img {
      opacity: 0.8;
      -webkit-transition: all 0.4s ease-in-out 0s;
      -moz-transition: all 0.4s ease-in-out 0s;
      transition: all 0.4s ease-in-out 0s;
      cursor: pointer;
    }
  }
  .content:focus {
    outline: none;
    box-shadow: none;
  }
  .more-detail {
    padding-top: 0.5em;
    padding-bottom: 0.8em;
    font-size:1em;
  }
  .show-more-button {
    color: rgb(150,150,150);

  }
  @media (hover: hover) {
    .show-more-button:hover {
      color: rgb(100,100,100);
      cursor: pointer;
    }
  }
  .bold {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .price {
    color: #666;
    font-weight: 700;
    font-size: 1.2em;
    border: 0;
  }
  .price:before {
    color: #666;
    content: '$';
    font-size: 0.7em;
  }
  .favorite {
    font-size: 1.2em;
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
  @media (hover: hover) {
    .favorited:hover {
      color: #E60023;
      background-color: #FFFFFF
    }
  }
</style>
