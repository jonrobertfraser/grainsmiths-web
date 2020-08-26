<template>
  <div class="py-2 my-4">
    <div class="row">
      <div class="col-sm-2"><!-- Left Spacer --></div>
      <div class="col-sm-8">
        <div class="mx-4">
          <h3 class="mb-4">
            <slot name="header">
              Title goes here.
            </slot>
          </h3>
          <slot>
            Write content here.
          </slot>
        </div>
      </div>
      <div class="col-sm-2"><!-- Right Spacer --></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "WrittenContent",
}

</script>

<style scoped>

</style>
