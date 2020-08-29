<template>
  <WrittenContent>
    <template v-slot:header>
      404: Nothing Here.
    </template>
    <p>
      (Except bread and a cookie)
    </p>
    <div class="text-center">
      <img style="max-width:75%;" src="https://grainsmiths-images.s3.us-east-2.amazonaws.com/static-assets/picture-cookie.jpg">
    </div>
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
