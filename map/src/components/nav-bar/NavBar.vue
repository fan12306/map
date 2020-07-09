<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">坐标工具</template>
        <el-menu-item index="2-1" @click="selectCoordTransform">坐标转换</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="selectServerCenter">服务中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    selectCoordTransform() {
      this.$router.push({ path: "/coordTransform" });
    },
    selectServerCenter() {
      this.$router.push({ path: "/severCenter" });
    }
  }
};
</script>
<style  scoped lang='stylus' rel='sheetstyle/stylus'>

// .nav {

//   width: 100%;

//   position: absolute;

//   top: 0;

//   left: 0;

//   z-index: 20;

// }

</style>
