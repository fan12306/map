<template>
  <div class="wrapper">
    <el-alert :title="title" :type="type" close-text="知道了" v-show="showAlert" center class="alert"></el-alert>
    <h1 class="title">坐标转换</h1>
    <div class="container">
      <el-select v-model="value" placeholder="请选择">
        <el-option-group v-for="(group, index) in options" :key="index">
          <el-option v-for="(item) in group" :key="item" :value="item" :label="item"></el-option>
        </el-option-group>
      </el-select>
      <div class="input-container">
        <el-input v-model="xAxis" placeholder="请输入经度坐标" type="number" class="axis"></el-input>
        <el-input v-model="yAxis" placeholder="请输入纬度坐标" type="number" class="axis"></el-input>
      </div>
      <el-button type="primary" @click="submit" size="large">转换</el-button>
    </div>
    <p class="data-wrapper" v-if="showData.arr">转换后数据：{{showDataArray}}</p>
  </div>
</template>

<script>
import { data } from "common/js/coordiate";
import { util } from "common/js/util";
export default {
  data() {
    return {
      options: data,
      value: "",
      xAxis: "",
      yAxis: "",
      corData: {},
      showData: {},
      showAlert: false,
      title: "",
      type: "info"
    };
  },
  computed: {
    showDataArray() {
      if (!this.showData.arr) {
        return;
      }
      return this.showData.arr.join(",");
    }
  },
  methods: {
    submit() {
      if (!this.value) {
        this.title = "请选择转换方式";
        this.showAlert = true;
        return;
      }
      if (!this.xAxis || !this.yAxis) {
        this.title = "请输入坐标";
        this.showAlert = true;
        return;
      }

      this.showData = util.transLonlatArr(
        [this.xAxis, this.yAxis],
        this.corData.scor,
        this.corData.tcor
      );
      if (this.showData.arr) {
        this.showAlert = true;
        this.type = "success";
        this.title = "转换成功";
      }
    },
    _getItemIndex(groups, val) {
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        for (let j = 0; j < group.length; j++) {
          let index = group.findIndex(item => {
            return item === val;
          });
          if (index > -1) {
            return [++i, ++index];
          }
        }
      }
    }
  },
  watch: {
    value(val) {
      const [scor, tcor] = this._getItemIndex(this.options, val);
      this.corData = {
        scor,
        tcor
      };
    },
    showAlert(isShow) {
      if (!isShow) {
        return;
      }
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }
};
</script>
<style scoped lang='stylus' rel='sheetstyle/stylus'>
@import '~common/stylus/variable.styl';

.wrapper {
  text-align: center;
  width: 70%;
  margin: 0 auto;
}

.alert {
  position: absolute;
  top: 18px;
  left: 0;
}

.title {
  margin-bottom: 30px;
  margin-top: 30px;
  font-size: $font-size-large-x;
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.input-container {
  width: 60%;
}

.axis {
  margin-bottom: 20px;
  width: 50%;
}

.data-wrapper {
  font-size: $font-size-large;
}
</style>
