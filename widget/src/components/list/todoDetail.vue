<template>
  <div class="todoDetail">
    <div style="background:#fff;height: 25px;"></div>
    <header class="bar bar-nav">
      <span v-if="!openMap" class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
      <button v-if="openMap"
        class="button pull-left"
        style="border:0;"
        @click="outMap()">
        退出导航
      </button>
      <!-- <span v-if="openMap" class="icon icon-left pull-left" @click="outMap()" style="width:auto; height: auto;"></span> -->
      <h1 v-if="!openMap"
        class="title">视图列表</h1>
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
              <div class="item-title">状态</div>
              <div class="item-after">在线</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">状态</div>
              <div class="item-after">在线</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul>
          <li>
            <div class="address-content">
                <div class="address-title">地址信息</div>
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
      <div class="list-block">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">目标地址</div>
              <div class="item-after"
                @click="getLine()">导航</div>
            </div>
          </li>
          <div ref="map"
            id="container"
            style=" margin:10px 10px 20px;border: 1px solid #fafafa; height: 10rem;"></div>
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
      openMap: false
    }
  },
  created() {
    api.setStatusBarStyle({
      style: 'dark'
    });
  },
  mounted() {
    this.showMap()
  },
  methods: {
    getIcon() {
      var aMap = api.require('aMap');
      let mapBack = (ret) => {
        let param = {
          lon: ret.longitude,
          lat: ret.latitude
        }
        let nameBack = (res) => {
          this.addressName = res.address
        }
        apiMap.getAdress(aMap, param, nameBack)
      }
      apiMap.openMap(api, aMap, param, mapBack)
    },
    showMap() {
      // let map = new AMap.Map(this.$refs.map)
      // console.log(map)
      // console.log(new AMap)
      var map = new AMap.Map('container', {
        zoom: 11,//级别
        center: [116.397428, 39.90923]//中心点坐标
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      });
      map.add(marker);//添加到地图
    },
    getLine(id) {
      var aMap = api.require('aMap');
      let param = {
        width: 'auto',
        height: 'auto',
        lon: '113.32034789',
        lat: '23.11588743'
      }
      // let openCallback = (res) => {
        // this.openMap = true
        let nameBack = (ret) => {
          let param = {
            start: {
              lon: ret.longitude,
              lat: ret.latitude
            },
            end: {
              lon: '113.32034789',
              lat: '23.11588743'
            }

          }
          let LineCallback = (res) => {
            let openCallback = (res) => {
              this.openMap = true
              aMap.drawRoute({
                id: 1,
                autoresizing: true,
                index: 0,
                styles: {
                    walkLine: {
                        width: 3,
                        color: '#698B22',
                        lineDash: false,
                        strokeImg: ''
                    },
                    icons: {
                        start: '',
                        end: '',
                        bus: '',
                        car: '',
                        man: ''
                    }
                }
            });
            }
            console.log(res)
            let param = {
              width: 'auto',
              height: 'auto',
              lon: '113.32034789',
              lat: '23.11588743'
            }
            apiMap.openMap(api, aMap, param, openCallback)
          }
          apiMap.getLine(aMap, 1, param.start, param.end, LineCallback)
        }
        apiMap.getLocation(api, nameBack)
      // }
      // apiMap.openMap(api, aMap, param, openCallback)
    },
    outMap() {
      this.openMap = false
      var aMap = api.require('aMap');
      aMap.close();
      aMap.removeRoute({
        ids: [1]
      });
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
