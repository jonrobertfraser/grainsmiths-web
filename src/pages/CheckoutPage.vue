<template>
  <WrittenContent>
    <template v-slot:header>
      Not available
    </template>
    <p>
      Sorry, you can't checkout on Grainsmiths yet.
    </p>
  </WrittenContent>
</template>

<script>

import WrittenContent from '../components/WrittenContent.vue'

export default {
  name: "CheckoutPage",
  components: {
    WrittenContent,
  },
}

</script>

<style scoped>

</style>
