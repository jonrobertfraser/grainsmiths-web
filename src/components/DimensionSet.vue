<template>
  <div>
    <span v-if="length && !diameter" class="dimension-block">
      <span class="gs-badge badge white-badge">
         <span style="white-space: nowrap;"><span v-html="length"></span>&Prime;</span>
      </span>
    </span>
    <span v-if="width && !diameter" class="dimension-block">
      <span class="gs-badge badge white-badge">
          <span style="white-space: nowrap;"><span v-html="width"></span>&Prime;</span>
      </span>
    </span>
    <span v-if="thickness" class="dimension-block">
      <span class="gs-badge badge white-badge">
          <span style="white-space: nowrap;"><span v-html="thickness"></span>&Prime;</span>
      </span>
    </span>
    <span v-if="diameter" class="dimension-block">
      <span class="badge gs-badge white-badge">
          <span style="white-space: nowrap;"><span v-html="diameter"></span>&Prime; (dia.)</span>
      </span>
    </span>
  </div>
</template>

<script>

export default {
  name: "DimensionSet",
  components: {},
  props: {
    length: String,
    width: String,
    thickness: String,
    diameter: String,
  }
};


</script>


<style lang="css" scoped>
  .white-badge {
    background-color: #FFFFFF;
    color: #666;
    border: 1px solid #999;
    padding-left: 0.6em;
    padding-right: 0.6em;
    margin-right: 0.1em;
  }
  .dimension-block + .dimension-block:before {
    color: rgb(170,170,170);
    content: "\00D7";
    margin-right: 0.1em;
  }

</style>
