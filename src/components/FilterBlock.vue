<template>

  <div class="my-2">

    <!-- TITLE AREA -->
    <div class="filter-block-title-line" v-bind:class="{'filter-title-when-closed': !showFilterMenu}">

      <!-- STUFF WHEN OPEN -->
      <div v-if="showFilterMenu" class="d-flex">
        <div class="filter-block-button mr-4" v-on:click="closeFilterMenu">
            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ml-2"/>
        </div>
        <div class="">
          {{ openTitle }}
        </div>
        <div class="filter-block-button ml-auto" v-on:click="resetFilterMenu">
          Reset<font-awesome-icon :icon="['fas', 'undo']" size="sm" class="ml-2"/>
        </div>

      </div>
      <!-- STUFF WHEN OPEN -->

      <!-- STUFF WHEN CLOSED -->
      <div v-else class="d-flex" v-on:click="openFilterMenu">
        <div class="filter-block-button mr-4">
          <font-awesome-icon :icon="['fas', 'chevron-down']" size="lg" class="ml-2"/>
        </div>
        <div class="">
          {{ closedTitle }}
        </div>
      </div>
      <!-- STUFF WHEN CLOSED -->


    </div>
    <!-- TITLE AREA -->

    <!-- FILTER AREA -->
    <div class="filter-menu-block" v-if="showFilterMenu">
      <slot name="body">
      </slot>
    </div>
    <!-- FILTER AREA -->

  </div>
</template>

<script>


export default {
  name: "FilterBlock",
  components: {

  },
  methods: {
    closeFilterMenu() {
      this.$emit("closeFilterMenu")
    },
    resetFilterMenu() {
      this.$emit("resetFilterMenu")
    },
    openFilterMenu() {
      this.$emit("openFilterMenu")
    }
  },
  props: {
    showFilterMenu: Boolean,
    openTitle: String,
    closedTitle: String,
  },
  data () {
    return {

    }
  }
};


</script>

<style lang="css" scoped>
  .filter-menu-block {
    background-color: rgb(247,247,247);
    border-radius: 0em 0em 0.5em 0.5em;
    position: relative;
    margin: 0em 0.5em;
    padding: 1em 2em;
  }
  .filter-block-button {
    cursor: pointer;
  }
  .close-button {
    font-size: 1.5em;
  }
  .filter-block-title-line {
    background-color: #333;
    border-radius: 0.5em 0.5em 0em 0em;
    color: #FFF;
    margin: 0em 0.5em;
    padding: 1em;
  }
  .filter-title-when-closed {
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    cursor: pointer;
  }
</style>
