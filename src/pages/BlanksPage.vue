<template>
  <div v-if="species" class="justify-content-center d-flex">



    <div class="col-md-9 col-lg-6">

      <div class="d-flex mt-5">
        <div>
          <div class="title">
            {{ cleanTagSpecies(species) }} Blanks
          </div>
          <router-link :to="{name: 'BlanksPage'}" class="see-all-button">
            See all species
          </router-link>
        </div>
        <div class="ml-auto">
          <img class="species-image" v-bind:src="getSpeciesImage(species)">
        </div>
      </div>
      <hr>
      <PromoBadges />
      <hr>


      <div class="size-table mb-5">
        <div class="d-flex size-row" v-for="(size, index) in sizes" v-bind:key="index">
          <div class="py-2">
            <div v-html="size.name+' inch'" class="size-name my-1">
            </div>
            <div class="my-1">
              <select class="qty-box btn btn-mini" v-model="lengthInput[index]">
                <option v-for="lengthOption in lengthOptions" :value="lengthOption" v-bind:key="lengthOption">{{ lengthOption }} inches long
                </option>
              </select>
            </div>
            <div class="my-1">
              <select class="qty-box btn btn-mini" v-model="qtyInput[index]">
                <option v-for="qtyOption in qtyOptions" :value="qtyOption" v-bind:key="qtyOption">{{ qtyOption }} <span v-if="qtyOption == 1">piece</span><span v-else>pieces</span></option>
              </select>
            </div>

          </div>
          <div class="ml-auto price">
            ${{ price(size.widthTimesThickness, index) }}
          </div>
          <div class="ml-3 add-to-cart" v-on:click="addToCart(index)">
            Add to Cart
          </div>

        </div>

      </div>
    </div>

  </div>


  <div v-else class="mb-5 justify-content-center d-flex text-center">
    <div class="col-md-9 justify-content-center">
      <div class="title px-1 mt-5 mb-5">
        Premium and Exotic Blanks
      </div>

      <router-link :to="{name: 'BlanksPage', params: { species: species }}" v-for="(species, index) in speciesList" v-bind:key="index" class="species-button">
        {{ cleanTagSpecies(species) }} <img class="tiny-species-image" :src="getSpeciesImage(species)">
      </router-link>

    </div>
  </div>
</template>

<script>
import speciesPricesPerBdft from '../data/speciesPricesPerBdft.json'

import PromoBadges from '../components/PromoBadges.vue'

import axios from 'axios'

/*import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'*/


export default {
  name: "BlankSelector",
  components: {
    PromoBadges,
    //VueSlider,

  },
  data () {
    return {
      cart: [],
      count: null,
      qtyOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,25,30,35,40,45,50],
      qtyInput: [1,1,1,1,1,1,],
      lengthOptions: [4,5,6,7,8,9,10,12,14,16,18,20,25,30],
      lengthInput: [6,6,6,6,6,6,],
      margin: 2,
      speciesList: Object.keys(speciesPricesPerBdft),
      pricePerBdft: speciesPricesPerBdft[this.species],
      sizes: [
        {widthTimesThickness: 0.5625, name: "<sup>3</sup>&frasl;<sub>4</sub>&nbsp;&times;&nbsp;<sup>3</sup>&frasl;<sub>4</sub>&nbsp;"},
        {widthTimesThickness: 1, name: "1 &times; 1"},
        {widthTimesThickness: 2.25, name: "1 <sup>1</sup>&frasl;<sub>2</sub>&nbsp;&times;&nbsp;1 <sup>1</sup>&frasl;<sub>2</sub>&nbsp;"},
        {widthTimesThickness: 4, name: "2 &times; 2"},
        {widthTimesThickness: 9, name: "3 &times; 3"},
        {widthTimesThickness: 16, name: "4 &times; 4"},
      ],
    }
  },
  methods: {
    addToCart(index) {
      let thisItem = {
        species: this.species,
        name: this.makeFullName(this.sizes[index].name, index),
        price: this.price(this.sizes[index].widthTimesThickness, index),
        qty: this.qtyInput[index],
      }
      this.cart.push(thisItem)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.$emit('updatedCart')

      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/update_cart'
      let query_params = {
        'visitor': localStorage.getItem('visitor'),
        'action': 'add_to_cart',
        'data': thisItem,
      }
      axios.post(url, query_params)
    },
    clearLocalStorage() {
      localStorage.removeItem('cart')
      this.cart = []
    },
    cleanTagSpecies(thing) {
      thing = thing.replace(/_/g," ").replace(/-/g," ")
      return thing.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    price(widthTimesThickness, index) {
      let price = (widthTimesThickness * this.lengthInput[index] * this.pricePerBdft * (1+this.margin) / 144.0).toFixed();
      if (price < 1)
        return 1;
      return price;
    },
    getSpeciesImage(species) {
      return "https://grainsmiths-images.s3.amazonaws.com/static-assets/species/"+species+".jpg"
    },
    makeFullName(name, index) {
      return name+" &times; "+this.lengthInput[index]+" in"
    },
  },
  props: {
    species: {type: String, default: null},
  },
  watch: {
    '$route'() {
      window.scrollTo(0, 0);
      this.pricePerBdft = speciesPricesPerBdft[this.species]
      this.lengthInput = [6,6,6,6,6,6,]
    },
  },
  mounted() {
    //console.log(localStorage.getItem('cart'))
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.cart = JSON.parse(localStorage.getItem('cart'))
  }
}
</script>

<style scoped>

.size-row {
  margin: 1em 0em;
  border-color: #CCC;
  border-width: 1px 0px 1px 1px;
  border-style: solid;
  font-size: 1.1em;
  padding-left: 0.75em;
}
.price {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #B12704!important;
  font-weight: 700;
}
.title {
  padding-right: 1em;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.species-image {
  margin-top: 1em;
  height: 100px;
  width: 100px;
}
.tiny-species-image {
  height: 40px;
  width: 40px;
  margin-left: 1em;
}
.species-button {
  display: inline-block;
  border-color: #666;
  border-width: 1px 1px;
  border-style: solid;
  border-radius: 1em 0em 0em 1em;
  margin:0.5em;
  padding:0 0 0 1.5em;
  cursor: pointer;
  color: #333;
}
.species-button:hover {
  background-color: #EEE
}
.add-to-cart {
  margin-left: 0.5em;
  display: inline-block;
  font-size: 1em;
  font-weight: normal;
  color: rgb(100,100,100);
  background-color: #333;
  color: #FFF;
  cursor: pointer;
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (hover: hover) {
  .add-to-cart:hover {
    background-color: #CCC;
    color: #000;
  }
}
.added-to-cart {
  background-color: #CCC;
}
.qty-box {
  padding-right: 0.5em;

  padding-left: 0.5em;
  margin-right: 0em;
  border-color: #CCC;

  background-color: #FFF;

  border-radius: 0em;
}
.see-all-button {
  display: inline-block;
  padding: 1em 1.5em;
  width: auto;
  border-width: 1px 1px;

  border-radius: 1em;
  background-color: #DDD;
  margin-top: 1em;
  cursor: pointer;
  color: #000;
  font-size: 1.1em;
}
.see-all-button:hover {
  background-color: #000;
  color: #FFF;
}
.choose-your-length-button {
  display: block;
  border-color: #666;
  border-width: 1px 1px;
  border-style: solid;
  border-radius: 0.5em;
  margin-top: 1em;
  cursor: pointer;
  color: #FFF;
  background-color: #333;
  padding: 1em;
  text-align: center;
  margin: 2em;
}
.choose-your-length-button:hover {
  color: #000;
  background-color: #FFF;
}
</style>
