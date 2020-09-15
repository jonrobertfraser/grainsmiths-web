<template>
  <WrittenContent>
    <template v-slot:header>
      The World's Largest Specialty Wood Catalog
    </template>
    <p>
      Grainsmiths is the largest and fastest growing online catalog of specialty wood products in the world.
    </p>
    <p>
      We built this for ourselves and to give other woodworkers the easiest access to the finest products. No ads and no BS. If you have any suggestions on how we can improve we are always available. Chat with us here on this page and tell us what you think.
    </p>
    <p>
      Want to add a sawmill or wood lumber yard? Chat with us and tell us more.
    </p>
    <p>
      We're {{ daysOld }} days old!
    </p>
    <div class="text-center">
      <img style="max-width:75%;" src="https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/picture-cookie.jpg">
    </div>
  </WrittenContent>
</template>

<script>

import WrittenContent from '../components/WrittenContent.vue'

export default {
  name: "HomePage",
  components: {
    WrittenContent,
  },
  computed: {
    daysOld: function () {
      let time = new Date() - new Date("September 14, 2020")
      return Math.round(time / (1000 * 60 * 60 * 24))
    }
  }
}

</script>

<style scoped>

</style>
