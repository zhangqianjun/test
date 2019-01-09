<template>
  <div class="todoDetail">
    <div style="background:#fff;height: 25px;"></div>
    <header class="bar bar-nav">
      <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
      <h1 class="title">查看事件</h1>
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
          <li class="item-content" v-if="!undone">
            <div class="todo-content">
              <div class="item-title">办案结果</div>
              <div class="item-after">{{dataDetail.handle}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block" v-if="hasDone">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">核查结果</div>
              <div class="item-after">{{dataDetail.results == 1 ? '结案' : '未解决'}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">群众满意度</div>
              <div class="item-after">{{dataDetail.mass == 1 ? '满意' : '不满意'}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">结果评价</div>
              <div class="item-after">{{dataDetail.evaluation == 1 ? '合格' : '不合格'}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul>
          <li v-if="hasDone">
            <div class="address-content">
                <div class="address-title">结案意见</div>
                <div class="address-input" style="border: 0;font-size:16px;">
                  {{dataDetail.opinion}}
                  <!-- <textarea v-model="addressName"></textarea> -->
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
                  <!-- <div class="file-upload">+
                  </div> -->
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
      undone: true,
      hasDone: false,
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
        console.log(res)
        this.dataDetail = res.data
        let status = this.dataDetail.state
        if (status == 1) {
          this.undone = true
          this.hasDone = false
        } else if (status == 2) {
          this.undone = true
          this.hasDone = false
        } else if (status == 3) {
          this.undone = false
          this.hasDone = false
        } else if (status == 4) {
          this.undone = false
          this.hasDone = true
        }
      }
      $http.getEventInfo(api, param, callback)
    },
    postEvent() {

    },
    pushRecordPage() {
      router.push({ name: 'lookRecord', query: {id: this.$route.query.id}})
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
.todoDetail .bar{
    background: #fff;
    top: 20px;
}
.todoDetail .list-block {
  margin: 0;
}
.todoDetail .content{
  background:#fafafa;
}
.todoDetail .todo-content .item-after{
  margin-bottom:10px;
  color: #999999;
}
.todoDetail .todo-content .item-title{
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
.todoDetail .address-content{
    padding: 5px 0.75rem 25px 0.75rem;
}
.todoDetail .address-content .address-input{
    border:1px solid #E6E6E6;
    color:#333333;
    font-size: 12px;
}
.todoDetail .address-title{
    padding: 10px 0;
}
.todoDetail .file-upload{
    border:1px solid #E6E6E6;
    color:#333333;
    width:100px;
    height:100px;
    line-height:90px;
    text-align: center;
    font-size:60px;
}
.look-record{
  padding-left: 1rem !important;
  font-size:0.7rem;
  color:#64ABFB;
}
</style>
