<template>
  <div style="width:100%;">
    <div class="hr-selector">
      <div v-if="!!label" class="label">
        <template v-if="required">
          <span style="color: red">* </span>
        </template>
        <slot name="left">
          {{label}}
        </slot>
      </div>
      <div class="right-content item-link" @click="openWin">
        <slot name="right">
          <span v-if="childLabel" class="vux-cell-value">{{ childLabel }}</span>
          <span v-else class="placeholder" style="color:#999;">{{placeholder ? '123':'请选择'}}</span>
          <span class="icon icon-right"></span>
        </slot>
      </div>
    </div>
    <div @click="close" class="picker-container" :class="{'open':open}">
      <div class="picker-wrapper" @click.stop>
        <div class="picker-action">
          <span class="picker-btn" @click="close">取消</span>
          <span class="picker-btn picker-btn-confirm" @click="select">确定</span>
        </div>
        <slot name="header"></slot>
        <Picker :value-key="valueKey" :label-key="labelKey" :list="list" :alias="0" :label="label" :cur-idx="[curIdx]" @picker="picker">
        </Picker>
      </div>
    </div>
    <div class="picker-mask" v-show="open"></div>
  </div>
</template>
<script type="text/babel">
import Picker from './Picker'
const props = {
  value: {},
  list: {
    type: [Object, Array],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  valueKey: {
    type: String,
    require: true
  },
  labelKey: {
    type: String,
    require: true
  },
  required: {
    type: Boolean,
    default() {
      return false
    }
  },
  // 缺省提示内容
  placeholder: {
    type: String,
    default() {
      return ''
    }
  }
}
export default {
  name: 'hr-selector',
  props,
  data() {
    return {
      open: false,
      curIdx: 0,
      childValue: '',
      childLabel: ''
    }
  },
  computed: {
    datas() {
      var list = this.list
      if (!(this.list[0] instanceof Array)) {
        list = [this.list]
      }
      var obj = {}
      list.forEach(function (arr, index) {
        obj[index] = arr
      })
      return obj
    }
  },
  created() {
    this.changeChildLabel(this.value)
  },
  watch: {
    'value'(val, oval) {
      if (val != this.childValue) {
        this.changeChildLabel(val)
      }
    },
    'datas'(nobj, oobj) {
      // 主要修复在数据更改时,初始化的对应下表为0
      if (nobj[0] !== oobj[0]) {
        this.curIdx = 0
      }
    }
  },
  methods: {
    changeChildLabel(val) {
      if (val != null && val != undefined && val != '') {
        this.childValue = val
        this.setCurIndex()
        if (this.labelKey) {
          this.childLabel = this.list[this.curIdx][this.labelKey]
        } else {
          this.childLabel = this.list[this.curIdx]
        }
      }
    },
    setCurIndex() {
      _(this.list).forEach((res, index) => {
        if (res[this.valueKey] == this.value) {
          this.curIdx = index
        }
      })
    },
    openWin() {
        this.open = true
    },
    close() {
      this.open = false
      this.$emit('cancel', this.list[this.curIdx][this.valueKey])
    },
    select() {
      this.open = false
      if (this.valueKey) {
        this.childValue = this.list[this.curIdx][this.valueKey]
      } else {
        this.childValue = this.list[this.curIdx]
      }
      if (this.labelKey) {
        this.childLabel = this.list[this.curIdx][this.labelKey]
      } else {
        this.childLabel = this.list[this.curIdx]
      }
      this.$emit('input', this.childValue)
    },
    picker(index, alias) {
      this.curIdx = index
      this.$emit('picker', this.childValue)
    }
  },
  components: {
    Picker
  }
}

</script>
<style>
.hr-selector {
  display: -webkit-box;
  display: flex;
  -webkit-display: flex;
  /* position: relative; */
  background-color: #fff;
  max-width: 37.5rem;
  justify-content: space-between
}

/* .hr-selector.disabled {
  background-color: rgba(0,0,0,0.1);
} */
.hr-selector.disabled .vux-cell-value {
  color: #888;
}
.right-content {
  color:#ccc;
  flex-grow: 1;
  text-align:right;
}

.hr-selector .fa-chevron-right {
  width: 1.5rem;
  text-align: right;
}
/**
   transform
       1: transform的值有先后顺序,如rotateX(40deg) translateZ(60px);表示先在X轴旋转40度,再在Z轴上移动60px
           如果translateZ(60px) rotateX(40deg);表示先在Z轴上移动60px,再在X轴旋转40度
      2: transform-origin要和transform一起使用才有效
  */
.picker-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  visibility: hidden;
}
.picker-container .picker-wrapper {
  position: fixed;
  width: 100%;
  z-index: 1;
  bottom: 0;
  left: 0;
  background: #fff;
  overflow: hidden;
  transition: transform 0.3s linear;
  -webkit-transition: -webkit-transform 0.3s linear;
  transform: translate3d(0, 250px, 0);
  -webkit-transform: translate3d(0, 250px, 0);
}
.picker-container .picker-wrapper .picker-action {
  box-sizing: border-box;
  background-color: #faf9fe;
  padding: 5px 10px;
  box-shadow: 0 -1px 3px 1px #ddd;
  border-bottom: 1px solid #e5e5e5;
}
.picker-container .picker-wrapper .picker-action .picker-btn {
  display: inline-block;
  outline: none;
  line-height: 1.42;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  color: #5f6c92;
  text-decoration: none;
  white-space: nowrap;
}
.picker-container
  .picker-wrapper
  .picker-action
  .picker-btn.picker-btn-confirm {
  float: right;
}
.picker-container.open {
  z-index: 500;
  visibility: visible;
}
.picker-container.open .picker-wrapper {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}
.m-picker,
.m-picker * {
  box-sizing: border-box;
}

.m-picker {
  height: 200px;
  background-color: #fff;
}
.m-picker .m-picker-inner {
  position: relative;
  height: 100%;
  width: 100%;
  -webkit-mask-box-image: -webkit-linear-gradient(
    to top,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
  -webkit-mask-box-image: linear-gradient(
    to top,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
}
.m-picker .m-picker-inner .m-picker-list,
.m-picker .m-picker-inner .m-picker-rule {
  z-index: 1;
  position: absolute;
  top: 50%;
  margin-top: -18px;
  width: 100%;
  list-style: none;
  padding: 0;
  line-height: 36px;
  height: 36px;
}
.m-picker .m-picker-inner .m-picker-rule {
  z-index: 2;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.m-picker .m-picker-inner .m-picker-list {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  /*perspective: 1000px;*/
  /*-webkit-perspective: 1000px;*/
}
.m-picker .m-picker-inner .m-picker-list .m-picker-item {
  display: inline-block;
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
  color: #959595;
  /* 超出的部分省略 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* 元素不面向屏幕时是否可见 */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.m-picker .m-picker-inner .m-picker-list .m-picker-item.highlight {
  color: #353535;
  font-weight: bold;
}
/*.open-wrapper {
    display: inline-block;
  }
*/
.picker-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.start-edit-disabled{
  opacity:0.4;
}
.right-content .icon{
  color:#ccc;
  width:auto;
  height:auto;
  font-size:14px;
}
</style>