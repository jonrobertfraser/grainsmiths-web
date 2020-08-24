<template>
    <div class="footer text-center py-5 mt-auto">
        <div class="footer-brand-image">
          <img src="../assets/build-something-beautiful-grey.svg" alt="">
        </div>
        <div>
          &copy; Grainsmiths {{ new Date().getFullYear() }}
        </div>
    </div>

</template>

<script>

export default {
  name: "Footer",
  methods: {}
};
</script>

<style scoped>

  .footer {
    background-color: rgb(51,51,51);
    color: rgb(192, 192, 192);;
  }
  .footer-brand-image {
    margin-bottom: 1em;
  }
  .footer-brand-image img {
    height: 4em;
  }

</style>
