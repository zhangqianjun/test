<template>
  <div class="checkEvent">
    <div style="background:#fff;height: 25px;"></div>
    <header class="bar bar-nav">
      <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
      <button class="button pull-right" @click="postEvent()">
          提交
      </button>
      <h1 v-if="isdeal" class="title">处理事件</h1>
      <h1 v-if="alldone" class="title">核查问题</h1>
    </header>
    <div class="content" style="padding-top: 25px;">
      <div class="list-block">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">服务事项</div>
              <div class="item-after">{{dataDetail.type}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">处理级别</div>
              <div class="item-after">{{dataDetail.level == 1 ? '日常' : '紧急'}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul class="todo-li">
          <li class="item-content">
            <div class="todo-content" style="width: 100%;">
              <div class="item-title">上报地址</div>
              <p class="item-content-line">{{dataDetail.address}}</p>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题标题</div>
              <div class="item-content-line">{{dataDetail.title}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题描述</div>
              <div class="item-content-line">{{dataDetail.description}}</div>
            </div>
          </li>
          <li class="item-content" v-if="alldone">
            <div class="todo-content">
              <div class="item-title">办案结果</div>
              <div class="item-content-line">{{dataDetail.handle}}</div>
            </div>
          </li>
          <li class="align-top">
              <div class="address-content">
                  <div class="address-title">图片信息</div>
                  <div class="imgBorder">
                    <!-- <div style="width:100%;height:50px;" v-if="dataDetail.files.length == 0">无</div> -->
                    <div v-for="(item, index) in dataDetail.files" :key="index" @click="getBigImg(item)">
                      <img class="imgSize" :src="`${HOST}${item}`"/>
                    </div>
                  </div>
              </div>
          </li>
        </ul>
      </div>
      <div class="list-block" v-if="alldone">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <span style="color: red;padding-right:5px;">* </span>
              <div class="item-title label">核查结果</div>
              <div class="item-input selectItem">
                  <select v-model="results">
                      <option value="1">结案</option>
                      <option value="2">未解决</option>
                  </select>
                  <span class="icon icon-right"></span>
              </div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <span style="color: red;padding-right:5px;">* </span>
              <div class="item-title label">群众满意度</div>
                    <div class="item-input selectItem">
                        <select v-model="mass">
                            <option value="1">满意</option>
                            <option value="2">不满意</option>
                        </select>
                        <span class="icon icon-right"></span>
                    </div>
                </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <!-- <div class="item-title">结果评价</div> -->
              <!-- <div class="item-after">合格</div> -->
              <span style="color: red;padding-right:5px;">* </span>
              <div class="item-title label">结果评价</div>
                    <div class="item-input selectItem">
                        <select dir="rtl" v-model="evaluation">
                            <option value="1">合格</option>
                            <option value="2">不合格</option>
                        </select>
                        <span class="icon icon-right"></span>
                    </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul>
          <li v-if="alldone">
            <div class="address-content">
                <div class="address-title"><span style="color: red;padding-right:5px;">* </span>结案意见</div>
                <div class="address-input">
                  <textarea v-model="opinion"></textarea>
                </div>
            </div>
          </li>
          <li v-if="isdeal" class="item-content">
            <div class="item-inner">
              <span style="color: red;padding-right:5px;">* </span>
              <div class="item-title label">处理结果</div>
              <div class="item-input selectItem">
                  <select v-model="eventState">
                      <option value="1">已解决</option>
                      <option value="2">未解决</option>
                  </select>
                  <span class="icon icon-right"></span>
              </div>
            </div>
          </li>
          <li v-if="isdeal">
            <div class="address-content">
                <div class="address-title"><span style="color: red;padding-right:5px;">* </span>处理说明</div>
                <div class="address-input">
                  <textarea v-model="result"></textarea>
                </div>
            </div>
          </li>
          <li class="align-top">
              <div class="address-content">
                  <div class="address-title"><span v-if="!isdeal"  style="color: red;padding-right:5px;">* </span>附件</div>
                  <upload @inputFile="inputFile"></upload>
                  <!-- <div class="file-upload">+ -->
                      <!-- <upload @inputFile="inputFile"></upload> -->
                  <!-- </div> -->
              </div>
          </li>
          <li class="look-record" @click="pushRecordPage()">
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wenjian"></use>
              </svg>
            </span>
            <span>查看处理记录</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="bigImg" @click="closeBigImg()" class="bigImgb">
      <img :src="`${HOST}${bigImgSrc}`"/>
      </div>
    <div v-if="isLoading" class="loadingStyle"><loading></loading></div>
  </div>
</template>

<script>
import apiMap from 'assets/js/map.js'
import loading from '../common/loading.vue'
import upload from 'components/form/upload.vue'
export default {
  data() {
    return {
      dataDetail: [],
      result:'',
      results: '1',
      mass: '1',
      evaluation: '1',
      opinion: '',
      alldone: false,
      isdeal: false,
      HOST: window.HOST,
      isLoading: false,
      bigImg: false,
      bigImgSrc: '',
      eventfile: [],
      eventState: '1'
    }
  },
  created() {
    api.setStatusBarStyle({
      style: 'dark'
    });
    this.getEventDetail()
  },
  mounted() {
  },
  methods: {
    inputFile(files) {
      this.eventfile = files
    },
    closeBigImg() {
      this.bigImg = false
    },
    getBigImg(url) {
      this.bigImg = true
      this.bigImgSrc = url
    },
    getEventDetail() {
      this.isLoading = true
      let id = this.$route.query.id
      let param = {
        eventId: id
      }
      let callback = (res) => {
        this.isLoading = false
        this.dataDetail = res.data
        let status = this.dataDetail.state
        if (status == 1) {

        } else if (status == 2) {
          this.isdeal = true
          this.alldone = false
        } else if (status == 3) {
          this.alldone = true
          this.isdeal = false
        } else if (status == 4) {

        }
      }
      $http.getEventInfo(api, param, callback)
    },
    postEvent() {
      if (this.isdeal) {
        if (!(this.result.length > 0)) {
          api.toast({
              msg: '请输入处理说明',
              duration: 2000,
              location: 'middle'
            })
            return
        }
        let param = {
          info: {
            files: this.eventfile,
            eventId: this.$route.query.id,
            result: this.result,
            event_state:this.eventState
          }
        }
        let callback = (res) => {
          api.toast({
              msg: '提交成功',
              duration: 2000,
              location: 'middle'
            })
            router.push({ name: 'entrance' })
        }
        $http.dealEvent(api, param, callback)
      } else if (this.alldone) {
        if (!(this.opinion.length>0)) {
          api.toast({
              msg: '请输入结案意见',
              duration: 2000,
              location: 'middle'
            })
            return
        }
        if (!(this.eventfile.length > 0)) {
          api.toast({
              msg: '请上传附件',
              duration: 2000,
              location: 'middle'
            })
            return
        }
        let param = {
          info: {
            files: this.eventfile,
            eventId: this.$route.query.id,
            results: this.results,
            mass: this.mass,
            evaluation: this.evaluation,
            opinion: this.opinion
          }
        }
        let callback = (res) => {
          api.toast({
              msg: '提交成功',
              duration: 2000,
              location: 'middle'
          })
          router.push({ name: 'entrance' })
        }
        $http.checkEvent(api, param, callback)
      }
      
    },
    pushRecordPage() {
      router.push({ name: 'lookRecord', query: {id: this.$route.query.id}})
    },
    goback() {
      router.go(-1)
    }
  },
  components: {
    loading,
    upload
  }
}
</script>

<style>
.list-block li {
  margin: 0;
  padding: 0;
}
.list-block ul {
  margin-bottom: 10px;
}
.checkEvent .bar{
    background: #fff;
    top: 20px;
}
.checkEvent .list-block {
  margin: 0;
}
.checkEvent .content{
  background:#fafafa;
}
.checkEvent .todo-content .item-after{
  margin-bottom:10px;
  color: #999999;
}
.checkEvent .todo-content .item-title{
  margin: 15px 0 10px;
  padding-left:10px;
}
.todo-content .item-title{
  font-size: 0.85rem;
  line-height: 0.85rem;
  border-left: 2px solid #64ABFB;
}
.todo-li li{
  padding:0;
  border-bottom: 1px solid #E6E6E6;
}
.checkEvent .address-content{
    padding: 5px 0.75rem 25px 0.75rem;
}
.checkEvent .address-content .address-input{
    border:1px solid #E6E6E6;
    color:#333333;
    font-size: 12px;
}
.checkEvent .address-title{
    padding: 10px 0;
}
.checkEvent .file-upload{
    border:1px solid #E6E6E6;
    color:#333333;
    width:100px;
    height:100px;
    line-height:90px;
    text-align: center;
    font-size:60px;
}
.checkEvent .look-record{
  padding-left: 1rem !important;
  font-size:0.7rem;
  color:#64ABFB;
}
.checkEvent .list-block select {
  direction: rtl;
}
.checkEvent .list-block select option {
    direction: ltr;
}
.selectItem{
  position:relative;
  padding-right:1rem;
}
.selectItem span {
  width: 1rem;
  height: 1rem;
  color: #999;
  position: absolute;
  right: 0;
  top: 0.5rem;
}
.checkEvent .imgBorder{
  display: flex;
}
.imgSize{
  width:100%;
}
.checkEvent .imgBorder div{
  width:100px;
  height: 100px;
  padding: 5px;
  overflow:hidden;
}
.bigImgb{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:#000;
  z-index:999;
}
.bigImgb img{
  width:100%;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  margin: auto;
}
.loadingStyle{
  position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.2;z-index:999;padding-top:100px;
}
.checkEvent .item-content-line{
  padding-right:0.75rem;display:block;margin-bottom: 10px;color: #999999;
}
</style>
