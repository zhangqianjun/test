<template>
  <div style="width:100%;height:100%;">
    <div class="open-wrapper" style="width:100%;height:100%;" @click="openWin">
      <slot></slot>
    </div>
    <div @click="close" class="picker-container" :class="{'open':open}">
      <div class="picker-wrapper" @click.stop>
        <div class="picker-action">
          <span class="picker-btn" @click="close">取消</span>
          <span class="picker-btn picker-btn-confirm" @click="choose">确定</span>
        </div>
        <slot name="header"></slot>
        <div :style="style" v-for="(item, index) in datas" :key="index">
          <Picker
            :list="item"
            @picker="picker"
            :alias="index"
            :label="label"
            :cur-idx="curIdxs[index]">
          </Picker>
        </div>
      </div>
    </div>
    <div class="picker-mask" v-show="open"></div>
  </div>
</template>
<script type="text/babel">
//   import { Cell } from 'vux'
  import Picker from './Picker'
  
  const defaultFnObj = {
    type: Function,
    required: false,
    default: function () {
    }
  }

  const props = {
    list: {
      type: [Object, Array],
      required: true
    },
    label: {
      type: String,
      required: false,
      default: 'label'
    },
    curIdxs: {
      type: Array,
      required: false,
      default: function () {
        if (this.list[0] instanceof Array) {
          var arr = []
          for (let i = 0; i < this.list.length; i++) {
            arr[i] = 0
          }
          return arr
        }
        return [0, 0]
      }
    },
    cancel: defaultFnObj,
    confirm: defaultFnObj,
    change: defaultFnObj
  }

  export default {
    name: 'vue-m-picker',
    props,
    data () {
      return { open: false }
    },

    computed: {
      datas () {
        var list = this.list
        if (!(this.list[0] instanceof Array)) {
          list = [this.list]
        }
        var obj = {}
        list.forEach(function (arr, index) {
          obj[index] = arr
        })
        console.log(obj)
        return obj
      },
      style () {
        var length = Object.keys(this.datas).length
        return {
          width: 100 / length + '%',
          float: 'left'
        }
      }
    },

    watch: {
      // curIdxs(val, oval){
      //     this.cache = val
      // }
      datas (nobj, oobj) {
        // 主要修复在数据更改时,初始化的对应下表为0
        let size = Object.keys(nobj).length
        for (let i = 0; i < size; i++) {
          if (nobj[i] !== oobj[i]) {
            this.cache[i] = 0
          }
        }
      }
    },

    methods: {
      openWin () {
        this.open = true
      },
      close () {
        this.open = false
        this.cancel()
      },
      choose () {
        this.open = false
        this.confirm.apply(this, this.cache)
      },
      picker (index, alias) {
        this.cache[parseInt(alias)] = index
        this.change(parseInt(alias), index)
      }
    },

    mounted () {
      this.cache = []
      this.$nextTick(function () {
        this.cache = this.curIdxs
      })
    },

    components: {
      Picker
    }
  }

</script>
<style>
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
  .picker-container .picker-wrapper .picker-action .picker-btn.picker-btn-confirm {
    float: right;
  }
  .picker-container.open {
    z-index: 11000;
    visibility: visible;
  }
  .picker-container.open .picker-wrapper {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
  .m-picker, .m-picker * {
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
    -webkit-mask-box-image: -webkit-linear-gradient(to top, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
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
    font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
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
</style>