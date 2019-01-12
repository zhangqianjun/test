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
      <button v-if="!openMap" class="button pull-right" @click="getArrive()">
          签到
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
              <div class="item-title">发起人</div>
              <div class="item-after">{{dispatchDetail.userName}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">时间</div>
              <div class="item-after">{{dispatchDetail.time}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">时效性</div>
              <div class="item-after">{{dispatchDetail.timeliness}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">状态</div>
              <div class="item-after">{{dispatchDetail.statusContent}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-block">
        <ul class="todo-li">
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">标题</div>
              <div class="item-after">{{dispatchDetail.title}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="todo-content">
              <div class="item-title">问题描述</div>
              <div class="item-after">{{dispatchDetail.explain}}</div>
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
                @click="getLine(dispatchDetail.id)">导航</div>
            </div>
          </li>
          <div ref="map"
            id="container"
            style=" margin:10px 10px 20px;border: 1px solid #fafafa; height: 10rem;"></div>
        </ul>
      </div>
    </div>
    <div v-if="isLoading" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.2;z-index:999;padding-top:100px;"><loading></loading></div>
  </div>
</template>

<script>
import apiMap from 'assets/js/map.js'
import loading from '../common/loading.vue'
export default {
  data() {
    return {
      openMap: false,
      dispatchDetail: {},
      hasdown: false,
      isLoading: false
    }
  },
  created() {
    this.getEventDetail()
    api.setStatusBarStyle({
      style: 'dark'
    });
  },
  mounted() {
    this.showMap()
  },
  watch: {
    'hasdown'() {
      this.showMap()
    }
  },
  methods: {
    getArrive() {
      this.isLoading = true
      var aMap = api.require('aMap');
      let data = {}
      let openCallBack = (res) => {
          let nameBack = (ret) => {
              let param = {
                id: this.$route.query.id,
                lng: ret.lon,
                lat: ret.lat
              }
              let callback = (res) => {
                this.isLoading = false
                if (res.data == 1) {
                  api.toast({
                    msg: '签到成功',
                    duration: 2000,
                    location: 'middle'
                  })
                  router.push({ name: 'entrance'})
                } else {
                  api.toast({
                    msg: '签到失败',
                    duration: 2000,
                    location: 'middle'
                  })
                }
              }
              $http.postDispatch(api, param, callback)
          }
          apiMap.getLocation(aMap, nameBack)
      }
      apiMap.openMap(api, aMap, data, openCallBack)
    },
    getEventDetail() {
      this.isLoading = true
      let id = this.$route.query.id
      let param = {
        id: id
      }
      let callback = (res) => {
        this.isLoading = false
        this.dispatchDetail = res.data
        this.hasdown = true
        let status = this.dispatchDetail.state
        this.dispatchDetail.time = moment.unix(this.dispatchDetail.time).format('YYYY-MM-DD HH:mm')
        this.dispatchDetail.timeliness = moment.unix(this.dispatchDetail.timeliness).format('YYYY-MM-DD HH:mm')
        this.dispatchDetail.statusContent = this.getStatus(status)
      }
      $http.getDispatchDetail(api, param, callback)
    },
    getStatus(status) {
      if (status == 1) {
          return '未确认'
        } else if (status == 2) {
          return '已确认'
        } else if (status == 3) {
          return '准时抵达'
        } else if (status == 4) {
          return '超时抵达'
        } else if (status == 5) {
          return '已取消'
        }
    },
    showMap() {
      if (!this.dispatchDetail.lng) {
        return
      }
      var lon = this.dispatchDetail.lng
      var lat = this.dispatchDetail.lat
      // let map = new AMap.Map(this.$refs.map)
      // console.log(map)
      // console.log(new AMap)
      var map = new AMap.Map('container', {
        zoom: 11,//级别
        center: [lon, lat]//中心点坐标
      })
      var marker = new AMap.Marker({
        position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })
      map.add(marker);//添加到地图
    },
    getLine(id) {
      this.openMap = true
      // this.isLoading = true
      var aMap = api.require('aMap');
      aMap.convertCoordinate({
          type:'google',
          location:{
            lat: this.dispatchDetail.lat,
            lon: this.dispatchDetail.lng
          }
        },function(ret){
          let param = {
              width: 'auto',
              height: 'auto',
              lon: ret.lon,
              lat: ret.lat
            }
            let firstAddress = 1
            // alert(this.dispatchDetail.lng)
            let openCallback = () => {
              // this.openMap = true
              // let locationCallback = (res) => {
                 aMap.getLocation({
                      autoStop: false
                    },function(res, err) {
                        if (res.status) {
                            if (firstAddress == 1) {
                              alert(firstAddress)
                              firstAddress ++
                              let param = {
                                start: {
                                  lon: res.lon,
                                  lat: res.lat
                                },
                                end: {
                                  lon: ret.lon,
                                  lat: ret.lat
                                }
                              }
                              let LineCallback = (res) => {
                                  aMap.drawRoute({
                                    id: id,
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
                              apiMap.getLine(aMap, id, param.start, param.end, LineCallback)
                            } else {
                              aMap.showUserLocation({
                                  isShow: true
                              });
                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
            }
            apiMap.openMap(api, aMap, param, openCallback)
        });
    },
    outMap() {
      let id = this.$route.query.id
      this.openMap = false
      var aMap = api.require('aMap');
      aMap.stopLocation();
      aMap.close();
      aMap.removeRoute({
        ids: [id]
      });
    },
    pushRecordPage() {
      router.push({ name: 'lookRecord'})
    },
    goback() {
      router.go(-1)
    }
  },
  components: {
    loading
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
