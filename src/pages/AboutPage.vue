<template>
  <WrittenContent>
    <template v-slot:header>
      About Grainsmiths
    </template>
    <p>
      Grainsmiths is the largest online repository of specialty wood products in the world.
    </p>
    <p>
      We're here to provide woodworkers the easiest access to the finest products. If you have any suggestions on how we can improve we are <strong>always</strong> available. Chat with us here on this page and tell us what you think.
    </p>
  </WrittenContent>
</template>

<script>

import WrittenContent from '../components/WrittenContent.vue'

export default {
  name: "AboutPage",
  components: {
    WrittenContent,
  },
}

</script>

<style scoped>

</style>
