<template>
  <div>
    <div
      :class="types == 'search' ? 'topLittle' : 'topMain'"
      >
      <!-- <div class="content-box" ref="contentBox">
        <div class="refreshing-box">
          <div>{{tipText}}</div>
        </div>
        <div> -->
          <slot name="listItem"></slot>
        <!-- </div>
      </div> -->
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
      /**
       * 绑定touch事件
       */
      bindTouchEvent(){
        let that = this;
        console.log('el'+this.el)
        this.el.addEventListener('touchstart', this._touchStart);
 
        this.el.addEventListener('touchmove', this._touchMove);
 
        this.el.addEventListener('touchend', this._touchEnd)
      },
      /**
       * 开始下拉的监听 这里主要是记录下初始坐标 下拉只需记录y即可(这里方便以后测其他的使用,也记录了 x)
       * @param e 下拉事件
       */
      _touchStart(e){
        let touch = e.changedTouches[0];
        this.tipText = '下拉刷新';
        this.startX = touch.clientX;
        this.startY = touch.clientY;
      },
      /**
       * 下拉过程的监听 这里记录下移动的距离
       * @param e
       */
       _touchMove(e){
        let touch = e.changedTouches[0];
        //获取下拉的距离
        let _move = touch.clientY - this.startY;
        //这里主要是让内容区随着下拉操作而往下滚动
        //_move>0是指往下滑动(下拉),_move<100是给一个上限,不然一直下拉的话整个内容区就会随着下拉距离一直增大,用户体验不是很好
        //这里下拉操作主要是显示出顶上的一层tipText
        if (_move > 0 && _move < 100) {
          this.el.style.marginTop = _move + 'px';
          //记录下下拉的距离
          this.moveDistance = touch.clientY - this.startY;
          if (_move > 50) {
            this.tipText = '松开即可刷新'
          }
        }
      },
      /**
       * 下拉动作结束(松开手指)监听
       * @param e
       * @private
       * */
      _touchEnd(e){
        let touch = e.changedTouches[0];
        this.endX = touch.clientX;
        this.endY = touch.clientY;
        let that = this;
        if (this.moveDistance > 50) {
          this.tipText = '数据加载中...';
          //调用父组件的加载数据的方法
          //这时候要在父组件的数据加载完成后,才将div还原,所以这里把resolve传进了父组件中,也可以采取其他方法
          // new Promise((resolve, reject) => {
          //   this.$emit('load', resolve);
          // }).then(() => {
          //   that._resetBox();
          // })
          this.$emit('load', that.$data);
        } else {
          this._resetBox();
        }
      },
      resetLoading() {
        let that = this;
        that.el.style.marginTop = '-40px';
        // clearInterval(timer)
      },
      _resetBox(){
        let that = this;
        if (this.moveDistance > 0) {
          let timer = setInterval(function () {
            that.el.style.marginTop = --that.moveDistance + 'px';
            if (Number(that.el.style.marginTop.split('px')[0]) <= 0) clearInterval(timer);
          }, 1)
        }
      }
    },
    components: {
      empty
    },
    mounted() {
      // this.el = this.$refs.contentBox
      // this.bindTouchEvent()
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