<template>
  <!-- BIG BUTTONS -->
  <div class="row mt-3">
    <div class="col-12 col-md-6 my-1">
      <div class="big-button d-flex">
        <img src="../assets/shipping-truck.svg">
        <div class="big-button-text">
          Ships same day. Free shipping on orders over $20.
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 my-1">
      <div class="big-button d-flex">
        <img src="../assets/money-back-guarantee.svg">
        <div class="big-button-text">
          No questions asked return policy.
        </div>
      </div>
    </div>
  </div>
  <!-- BIG BUTTONS -->
</template>

<script>

export default {
  name: "PromoBadges",
  components: {
  },
}
</script>

<style scoped>
.big-button {
  padding: 1em;
  border-color: #666;
  border-width: 1px 1px;
  border-style: solid;
  border-radius: 0.5em;
  min-height: 100%;
  height: 100%;
}
.big-button img {
  height: 50px;
  width: 50px;

}
.big-button-text {
  padding: 0em 0em 0em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>