<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="content">
      <router-view />
    </div>
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
  display: flex;
  flex-direction: column;
  flex: 1;

  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
