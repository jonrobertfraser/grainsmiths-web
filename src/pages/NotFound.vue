<template>
  <WrittenContent>
    <template v-slot:header>
      404: Nothing Here.
    </template>
    <p>
      (Except bread and a cookie)
    </p>
    <img style="max-width:100%;" src="../assets/cookie.jpg">
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
