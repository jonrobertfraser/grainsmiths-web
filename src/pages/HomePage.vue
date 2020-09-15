<template>
  <div>
    <div class="hero-image container-fluid">
      <div class="row py-5 px-4">
        <div class="col-sm-4">
          <!-- spacer -->
        </div>
        <div class="hero-text col-sm-8">
          The world's largest and fastest growing online catalog of specialty wood products.
        </div>
      </div>
      <div class="row py-5 px-0 justify-content-center">
        <div id="" class="text-left home-hero-search col-md-12 mb-5">
          <div class="mb-2 font-weight-light">
            Get started here.
          </div>
          <multiselect
            v-model="speciesValue"
            :options="options"
            :multiple="false"
            :close-on-select="true"
            placeholder="Search for species"
            track-by="name_for_url"
            label="name"
            @select="selectedSpecies"
            >
          </multiselect>
        </div>
      </div>
    </div>
    <div class="container-fluid p-3">
      <div class="row p-4">
        <div class="col-md-6">
          <div class="text-center">
            <img style="max-width:75%;" src="https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/picture-cookie.jpg">
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="mb-5">
            No ads. No BS.
          </h1>
          <p>
            Just lightning fast access to tens of thousands of wood products (and growing).
          </p>
          <p>
            We built Grainsmiths to bring high quality wood products online in a frustration-free format. Our goal is to continue to give woodworkers the easiest access to the world's largest collection of premium products.
          </p>
          <p>
            We're here to serve the woodworker so if you have any ideas you want to share please chat with us. We're actively growing and want to make the perfect resource for you.
          </p>
          <p>
            Want to add a sawmill or wood lumber yard? Chat with us and tell us more.
          </p>
          <p>
            We're {{ daysOld }} days old!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import Multiselect from 'vue-multiselect'

export default {
  name: "HomePage",
  components: {
    Multiselect,
  },
  methods: {
    populateSpeciesMenu() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_species_menu'
      axios
        .get(url)
        .then(response => {
            this.options = [...response.data.menu]
        })
    },
    selectedSpecies(species) {
      this.$router.push({ 'name': 'ExplorePage', params: {
        pathSpecies: species.name_for_url
      }})
    }
  },
  data () {
    return {
      speciesValue: [],
      options: [],
    }
  },
  mounted() {
    this.populateSpeciesMenu()
  },
  computed: {
    daysOld: function () {
      let time = new Date() - new Date("September 14, 2020")
      return Math.round(time / (1000 * 60 * 60 * 24))
    }
  }
}

</script>

<style lang="css" scoped>

  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url("https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/teo-duldulao-4op9_2Bt2Eg-unsplash-2400x1600.jpg");
    min-height: 75vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    text-align: center
  }
  @media screen and (max-width: 750px) {
    .hero-image {
      background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url("https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/teo-duldulao-4op9_2Bt2Eg-unsplash-750x1728.jpg");
    }
  }
  @media screen and (min-width: 750px) and (max-width: 1200px) {
    .hero-image {
      background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url("https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/teo-duldulao-4op9_2Bt2Eg-unsplash-1200x1728.jpg");
    }
  }
  @media screen and (min-width: 1200px) and (max-width: 1800px) {
    .hero-image {
      background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url("https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/teo-duldulao-4op9_2Bt2Eg-unsplash-1800x1200.jpg");
    }
  }





  .hero-text {
    color: #FFF;
    font-size: 3em;
    font-weight: 100;
    text-align: right;
  }
  .home-hero-search {
    padding: 3em 2.5em 3.5em 2.5em;
    background-color:rgba(0,0,0,0.3);
    color: #FFF;
    font-size: 2em;
  }

</style>

