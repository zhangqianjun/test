<template>
  <div>
    <div :class="types == 'search' ? 'topLittle' : 'topMain'">
         <slot name="listItem"></slot>
    </div>
    <empty :tips="tips" v-show="dataCount == 0"></empty>
  </div>
</template>
<script>
  import empty from './empty'

  export default {
    props: {
      types: {
        type: String,
        default: 'main'
      },
      dataCount: {
        type: Number,
        default: 1
      },
      tips: {
        type: String,
        default: '没有数据'
      }
    },
    data() {
      return {
        startX: '',
        endX: '',
        startY: '',
        endY: '',
        moveDistance: 0,
        tipText: '下拉刷新',
        ifLoading: ''
      }
    },
    watch: {
      ifLoading(val) {
        if (this.ifLoading == 'yes') {
          this.resetLoading()
        }
      }
    },
    created() {
      console.log(this.ifLoading)
    },
    methods: {
    },
    components: {
      empty
    },
    mounted() {
    }
  }
</script>
<style>
._v-container{
    position:static !important;
}
.topMain{
  position:absolute;
  top: 13.5rem;
  left:0;
  bottom:0;
  right:0;
  overflow: auto;
}
.topLittle{
  position:absolute;
  top: 1.6rem;
  left:0;
  bottom:0;
  right:0;
  overflow: auto;
  margin-top:45px;
}
.content-box {
  position: relative;
}
.refreshing-box {
  line-height: 40px;
  height: 40px;
  text-align: center;
  margin-top:-40px;
}

</style>