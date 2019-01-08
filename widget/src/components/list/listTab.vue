<template>
  <div>
    <div
      ref="scroller"
      :on-infinite="infinite"
      >
      <!-- :on-infinite="infinite" -->
      <slot name="listItem"></slot>
    </div>
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
      dataCount: {
        type: Number,
        default: 1
      },
      tips: {
        type: String,
        default: '没有数据'
      }
    },
    created() {
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