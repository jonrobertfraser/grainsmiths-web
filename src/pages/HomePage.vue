<template>
  <WrittenContent>
    <template v-slot:header>
      Grainsmiths is launching soon
    </template>
    <p>
      Grainsmiths is the largest online repository of specialty wood products in the world.
    </p>
    <p>
      We're here to provide woodworkers the easiest access to the finest products. If you have any suggestions on how we can improve we are always available. Chat with us here on this page and tell us what you think.
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
}

</script>

<style scoped>

</style>
