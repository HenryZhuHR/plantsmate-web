<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import { ElButton } from "element-plus";

import HelloWorld from "./components/HelloWorld.vue";

</script>

<template>

  <!-- <RouterLink to="/">Home</RouterLink> -->
  <RouterView />

</template>

<style scoped lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
