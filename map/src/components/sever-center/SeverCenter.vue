<template>
  <div class="sever-wrapper">
    <base-menu class="menu-container"></base-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseMenu from "base/Menu.vue";
export default {
  components: {
    BaseMenu
  }
};
</script>
<style  scoped lang='stylus' rel='sheetstyle/stylus'>
@import '~common/stylus/variable.styl';

.sever-wrapper {
  // padding-top: 28px;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;

  .menu-container {
    height: 100%;
  }
}
</style>
