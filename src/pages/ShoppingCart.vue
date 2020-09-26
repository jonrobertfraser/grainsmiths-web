<template>
  <div class="justify-content-center d-flex">

    <div class="col-md-9 col-lg-6">


      <div class="d-flex mt-5">
        <div class="title">
          Shopping Cart
        </div>
      </div>
      <hr>
      <!-- BIG BUTTONS -->
      <div class="row mt-3">
        <div class="col-12 col-md-6 my-1">
          <div class="big-button d-flex">
            <img src="../assets/shipping-truck.svg">
            <div class="big-button-text">
              Same day shipping guarantee
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 my-1">
          <div class="big-button d-flex">
            <img src="../assets/money-back-guarantee.svg">
            <div class="big-button-text">
              No questions asked return policy
            </div>
          </div>
        </div>
      </div>
      <!-- BIG BUTTONS -->
      <hr>

      <div class="size-table">

          <div class="d-flex size-row" v-for="(cartItem, index) in cart" v-bind:key="index">
            <div class="">

              <router-link class="mr-4 species-name" :to="{name: 'BlanksPage', params: { species: cartItem.species }}">
                {{ cleanTagSpecies(cartItem.species) }}
              </router-link>
              <div v-html="cartItem.name" class="">

              </div>

              <div class="">
                ${{ cartItem.price }} each
              </div>
              <div>
                {{ cartItem.qty }}
                <span v-if="cartItem.qty > 1">pieces</span>
                <span v-else>piece</span>
              </div>
            </div>
            <div v-on:click="removeFromCart(index)" class="remove-from-cart ml-auto">
              &times;
            </div>
          </div>


      </div>
      <div v-if="subtotal > 0">

        <div class="summary size-row">
          Shipping: ${{ shippingCost }}
        </div>

        <div class="summary size-row">
          Total: ${{ grandTotal }}
        </div>

        <div class="checkout" v-on:click="checkout">
          Checkout
        </div>

      </div>
      <div v-else class="text-center">
        Nothing in your cart.
      </div>





    </div>
  </div>


</template>

<script>

import 'vue-slider-component/theme/default.css'
import axios from 'axios'

export default {
  name: "BlankSelector",
  components: {

  },
  data () {
    return {
      cart: [],
    }
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.$emit('updatedCart')
    },
    cleanTagSpecies(thing) {
      thing = thing.replace(/_/g," ").replace(/-/g," ")
      return thing.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    checkout() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/update_cart'
      let query_params = {
        'visitor': localStorage.getItem('visitor'),
        'action': 'checkout',
        'data': this.cart,
      }
      axios.post(url, query_params)
      this.$router.push({'name': 'CheckoutPage'})
    }
  },
  props: {

  },
  watch: {
  },
  mounted() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.cart = JSON.parse(localStorage.getItem('cart'))
  },
  computed: {
    // a computed getter
    subtotal: function () {
      var subtotal = 0
      this.cart.forEach(function (item) {
        subtotal += item.price * item.qty
      });
      return subtotal;
    },
    shippingCost: function () {
      if (this.subtotal > 20 || this.subtotal == 0) {
        return 0
      }
      return 10
    },
    grandTotal: function() {
      return this.subtotal + this.shippingCost
    }
  }
}
</script>

<style scoped>

.size-row {
  margin: 1em 0em;
  border-color: #CCC;
  border-width: 1px 0px;
  border-style: solid;

  font-size: 1.1em;


}
.v-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  padding-right: 1em;
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.species-name {
  text-decoration: underline;
  color: #333;
}
.big-button {
  padding: 1em;
  border-color: #666;
  border-width: 1px 1px;
  border-style: solid;
  border-radius: 0.5em;
}
.big-button img {
  height: 50px;
  width: 50px;
}
.big-button-text {
  padding: 0em 0em 0em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.remove-from-cart {
  margin-left: 0.5em;
  display: inline-block;
  font-size: 1.5em;
  font-weight: normal;
  color: rgb(100,100,100);
  background-color: #333;
  color: #FFF;
  cursor: pointer;
  padding: 0.3em 1em;
}
.remove-from-cart:hover {
  background-color: #CCC;
  color: #000;
}
.summary {
  text-align: center;
  font-size: 1.5em;
}
.checkout {
  background-color: #333;
  margin-left: 3em;
  margin-right: 3em;
  color: #FFF;
  cursor: pointer;
  padding: 0.3em 1em;
  font-size: 1.5em;
  font-weight: normal;
  margin-bottom: 2em;
  text-align: center;
  border-radius: 0.5em;
}
.checkout:hover {
  background-color: #CCC;
  color: #000;
}
</style>
