<template>
  <div class="wrapper">
    <iframe
      src="static/map.html"
      height="100%"
      width="100%"
      name="demo"
      frameborder="0"
      scrolling="auto"
      sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts"
    ></iframe>
    <base-controls class="controls"></base-controls>
  </div>
</template>

<script>
import BaseControls from "base/Controls.vue";
export default {
  components: {
    BaseControls
  }
};
</script>
<style  scoped lang='stylus' rel='sheetstyle/stylus'>
.wrapper {
  box-sizing: border-box;
  padding-top: 20px;
  // display: block;
  display: flex;

  .container {
    width: 100%;
    height: 100%;

    .amap-wrapper {
      height: 100%;
    }
  }

  .controls {
    min-width: 150px;
  }
}
</style>
