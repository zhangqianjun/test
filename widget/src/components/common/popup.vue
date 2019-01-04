<template>
    <div class="popup-component">
        <div class="popup-bac" @click="ifopen()"></div>
        <div class="popup-content popup-in">
            <div class="popup-group">
                <span style="color: red;" @click="inline()">在线</span>
                <span @click="outline()">离线</span>
            </div>
            <div class="noselect" @click="ifopen()">取消</div>
        </div>
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
    },
    methods: {
        ifopen() {
            this.$emit('ifopen')
        }
    }
}
</script>
<style>
.popup-component{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
}
.popup-component .popup-bac {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    -webkit-transition-duration: .4s;
    transition-duration: .4s;
}
.popup-component .popup-content{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
}
.popup-component .popup-in {
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}
.popup-group{
    margin: .4rem;
}
.popup-group span {
    cursor: pointer;
    line-height: 2.15rem;
    font-size: 1rem;
    color: #0894ec;
    width: 100%;
    text-align: center;
    font-weight: 400;
    margin: 0;
    background: rgba(243,243,243,.95);
    display: block;
    position: relative;
}
.noselect{
    border-radius: .2rem;
    line-height: 2.15rem;
    font-size: 1rem;
    color:#fff;
    background: #f6383a;
    text-align: center;
    font-weight: 400;
    margin: .4rem;
}
</style>