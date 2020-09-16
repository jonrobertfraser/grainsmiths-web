<template>
  <WrittenContent>
    <template v-slot:header>
      We're online! Chat with us below...
    </template>
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
    this.$drift.showWelcomeMessage("Hey! I'm the creator of Grainsmiths. What's up?");
  }
}

</script>

<style scoped>

</style>
