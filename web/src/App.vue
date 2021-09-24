
<template>
  <div id="app">
    <background />
    <router-view />
  </div>
</template>
<script>
import background from "@/views/background.vue";
export default {
  name: "app",
  components: { background }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
}
</style>
