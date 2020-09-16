<template>
  <WrittenContent>
    <template v-slot:header>
      We're online! Chat with us below...
    </template>
    <p>
      Click the chat icon at the bottom right of this page.
    </p>
    <p>
      We're here to provide woodworkers the easiest access to the finest products. If you have any suggestions on how we can improve we are <strong>always</strong> available. Chat with us and tell us what you think.
    </p>


  </WrittenContent>
</template>

<script>

import WrittenContent from '../components/WrittenContent.vue'

export default {
  name: "ContactPage",
  components: {
    WrittenContent,
  },
  methods: {

  },
  data() {
    return {

    };
  },
  mounted() {
  }
}

</script>

<style scoped>

</style>
