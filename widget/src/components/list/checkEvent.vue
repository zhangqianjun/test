<template>
  <div class="todoDetail">
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
              <div class="item-after">李二</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">处理级别</div>
              <div class="item-after">2018-12-01 12:32</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul class="todo-li">
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">上报地址</div>
              <div class="item-after">2018-12-01 12:32</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题标题</div>
              <div class="item-after">2018-12-01 12:32</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题描述</div>
              <div class="item-after">2018-12-01 12:32</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">办案结果</div>
              <div class="item-after">2018-12-01 12:32</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <!-- <div class="item-title">群众满意度</div> -->
              <!-- <div class="item-after">满意</div> -->
              <div class="item-title label">群众满意度</div>
                    <div class="item-input">
                        <select>
                            <option>满意</option>
                            <option>不满意</option>
                        </select>
                    </div>
                </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <!-- <div class="item-title">结果评价</div> -->
              <!-- <div class="item-after">合格</div> -->
              <div class="item-title label">结果评价</div>
                    <div class="item-input">
                        <select>
                            <option>合格</option>
                            <option>不合格</option>
                        </select>
                    </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul>
          <li>
            <div class="address-content">
                <div class="address-title">结案意见</div>
                <div class="address-input">
                  <textarea v-model="addressName"></textarea>
                </div>
            </div>
          </li>
          <li class="look-record" @click="pushRecordPage()">
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jilu"></use>
              </svg>
            </span>
            <span>查看处理记录</span>
          </li>
          <li class="align-top">
              <div class="address-content">
                  <div class="address-title">附件</div>
                  <div class="file-upload">+
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
      dataDetail: []
    }
  },
  created() {
    api.setStatusBarStyle({
      style: 'dark'
    });
  },
  mounted() {
  },
  methods: {
    getEventDetail() {
      let id = this.$route.query.id
      let callback = (res) => {
        this.dataDetail = res.data
      }
      $http.getEventDetail(api, id, callback)
    },
    postEvent() {

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
