<template>
  <div class="checkEvent">
    <div style="background:#fff;height: 25px;"></div>
    <header class="bar bar-nav">
      <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
      <button class="button pull-right" @click="postEvent()">
          提交
      </button>
      <h1 class="title">核查问题</h1>
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
            <div class="todo-content">
              <div class="item-title">上报地址</div>
              <div class="item-after">{{dataDetail.address}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题标题</div>
              <div class="item-after">{{dataDetail.title}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题描述</div>
              <div class="item-after">{{dataDetail.description}}</div>
            </div>
          </li>
          <li class="item-content" v-if="alldone">
            <div class="todo-content">
              <div class="item-title">办案结果</div>
              <div class="item-after">{{dataDetail.handle}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block" v-if="alldone">
        <ul>
          <li class="item-content">
            <div class="item-inner">
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
                <div class="address-title">结案意见</div>
                <div class="address-input">
                  <textarea v-model="opinion"></textarea>
                </div>
            </div>
          </li>
          <li v-if="isdeal">
            <div class="address-content">
                <div class="address-title">处理结果说明</div>
                <div class="address-input">
                  <textarea v-model="result"></textarea>
                </div>
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
          <li class="align-top">
              <div class="address-content">
                  <div class="address-title">附件</div>
                  <div>
                    <img v-for="(item, index) in dataDetail.files" :key="index" :src="`${HOST}${item}`"/>
                  </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import apiMap from 'assets/js/map.js'
export default {
  data() {
    return {
      dataDetail: [],
      results: '',
      mass: '',
      evaluation: '',
      opinion: '',
      alldone: false,
      isdeal: false,
      HOST: window.HOST
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
    getEventDetail() {
      let id = this.$route.query.id
      let param = {
        eventId: id
      }
      let callback = (res) => {
        this.dataDetail = res.data
        let status = this.dataDetail.status
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
        let param = {
          eventId: this.$route.query.id,
          result: this.result
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
        let param = {
          info: {
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
      router.push({ name: 'lookRecord'})
    },
    goback() {
      router.go(-1)
    }
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
</style>
