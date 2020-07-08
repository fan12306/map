<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "components/nav-bar/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #fff;
  width: 100%;
  height: 100%;
}
</style>
