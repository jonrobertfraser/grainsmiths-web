<template>
  <WrittenContent>
    <template v-slot:header>
      Something went wrong...
    </template>
    <p>
      Sorry, there was an error. Please try again later.
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
