<template>
  <div class="menu-container">
    <el-row class="tac">
      <el-col :span="12" class="el-col-self">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>地图展示</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="1-1" @click="selectMapShow">地图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    selectMapShow() {
      this.$router.push({ path: "/severCenter/mapshow" });
    }
  }
};
</script>
<style  scoped lang='stylus' rel='sheetstyle/stylus'>
@import '~common/stylus/variable.styl';

.menu-container {
  width: 100px;
  height: 100%;
  background: $color-highlight-background;
  box-sizing: border-box;

  .tac {
    width: 100px;
    height: 100%;
    background: $color-highlight-background;

    .el-col-self {
      width: 100%;
      height: 100%;

      .el-menu {
        border: none;
      }
    }
  }
}
</style>
