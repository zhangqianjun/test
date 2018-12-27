<template>
  <div>
    <scroller
      ref="scroller"
      :height="height"
      :on-infinite="infinite">
      <slot name="listItem"></slot>
    </scroller>
    <empty :tips="tips" v-show="dataCount == 0"></empty>
  </div>
</template>
<script>
  import empty from './empty'

  export default {
    props: {
      finish: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '100%'
      },
      cssClass: {
        // type: String,
        default: ''
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
    methods: {
      infinite(done) {
        if (this.finish) {
          done()
          return
        }
        this.$emit('infinite')
      },
      finishRefresh() {
        this.$refs.scroller.finishPullToRefresh()
      },
      finishLoadmore(finish) {
        this.$refs.scroller.finishInfinite(finish)
      }
    },
    components: {
      empty
    }
  }
</script>
<style>
._v-container{
    position:static !important;
}
</style>