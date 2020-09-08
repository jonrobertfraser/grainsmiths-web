<template>
  <img :src="imgSrc">
</template>

<script>

import axios from 'axios'

export default {
  name: "ProductImage",
  components: {},
  data () {
    return {
      imgSrc: ""
    }
  },
  methods: {
    setProductImageSrc() {
      let url = process.env.VUE_APP_GRAINSMITHS_API_HOST+'/public/get_product'
      axios
        .get(url, {params: {product_id: this.productId}})
        .then(response => {
          this.imgSrc = response.data.product.image_urls[this.imageIndex]
        })
    },
  },
  props: {
    productId: [String,Number],
    imageIndex: [String,Number],
  },
  mounted() {
    this.setProductImageSrc()
  }
};
</script>

<style scoped>

</style>
