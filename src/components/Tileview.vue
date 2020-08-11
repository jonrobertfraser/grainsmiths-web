<template>
  <div class="container">
    <div class="row my-1 text-center d-inline-block">
      <!-- Spacer -->
    </div>
    <div class="card-columns">
      <div v-for="n in 30" v-bind:key="n" class="card p-3 m-1 ">
        <blockquote class="card-block card-blockquote">
          <p>Item #{{ n }}</p>
          <p>Eleifend vehicula curabitur tortor litora suspendisse a a sociosqu molestie?</p>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
// https://grainsmiths-images.s3.amazonaws.com/thumbnails/

export default {
  name: "tileview",
  methods: {}
};
</script>


<style lang="scss" scoped>
  @import 'bootstrap/scss/_functions.scss';
  @import 'bootstrap/scss/_variables.scss';
  @import 'bootstrap/scss/_mixins.scss';
  @import "bootstrap/scss/mixins/_breakpoints";

  .card-columns {
    column-count: 6;
    column-gap: 0.5rem;
    @include media-breakpoint-down(xl) {
      column-count: 6;
    }
    @include media-breakpoint-down(lg) {
      column-count: 5;
    }
    @include media-breakpoint-down(md) {
      column-count: 4;
    }
    @include media-breakpoint-down(sm) {
      column-count: 3;
    }
    @include media-breakpoint-down(xs) {
      column-count: 2;
    }
  }
</style>
