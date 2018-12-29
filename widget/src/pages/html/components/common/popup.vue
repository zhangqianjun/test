<template>
    <div>
        <div ref="popupPic"></div>
    </div>
</template>
<script>
export default {
    props: {
    value: {
      default() {
        return null
      }
    },
    titleName: String,
    selectData: Array,
    popupVisible: {  // 控制面板显示隐藏的值
      default() {
        return false
      }
    },
  },
    data() {
        return {
            selectPopupVisible: false,
        }
    },
    created() {

    },
    watch: {
        'popupVisible'() {
            this.selectPopupVisible = this.popupVisible
            if (this.popupVisible) {
                console.log(this.popupVisible)
                console.log(this.$refs.popupPic)
                // this.init()
            } else {
            }
        },
    }
}
</script>