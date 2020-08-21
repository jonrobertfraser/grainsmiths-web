<template>

  <div>
    <CoolLightBox
      :items="items"
      :index="index"
      :gallery="false"
      :slideshow="false"
      :useZoomBar="true"
      :closeOnClickOutsideMobile="true"
      @close="closeLightbox">
    </CoolLightBox>
  </div>


</template>

<script>

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  name: 'ImageLightbox',
  props: {
    items: Array,
    showLightbox: Boolean,
    index: Number
  },
  components: {
    CoolLightBox
  },
  methods: {
    closeLightbox() {
      this.$emit('closeLightbox')
    }
  }
}

</script>

<style lang="css" scoped>
</style>
