<template>
    <div style="width:100%; height: 100%;">
        <!-- <div style="margin-top: 5rem;" @click="getapp()">首页111</div> -->
        <!-- <transition name="fade" mode="in-out"> -->
            <!-- <transition name="right-slide"> -->
            <!-- <router-view></router-view> -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <!-- </transition> -->
        <!-- </transition> -->
    </div>
</template>

<script>
import apiMap from 'assets/js/map.js'
    export default {
        data() {
            return {
                lng: '',
                lat: '',
                address: ''
            }
        },
        created() {
            if (Cookies.get('token')) {
                setTimeout(function() {
                    router.push({ name: 'entrance'})
                }, 500)
                
            } else {
                setTimeout(function() {
                    router.push({ name: 'login'})
                }, 500)
                // router.push({ name: 'login'})
            }
            setInterval(function() {
                var aMap = api.require('aMap');
                let nameBack = (ret) => {
                    let param = {
                        lon: ret.longitude,
                        lat: ret.latitude
                    }
                    this.lng = ret.longitude
                    this.lat = ret.latitude
                    let namesBack = (res) => {
                        this.address = res.address
                        let param = {
                            lng: this.lng,
                            lat: this.lat,
                            address: this.address
                        }
                        let success = (res) => {
                            console.log(res)
                        }
                        $http.postAddress(api, param, success)
                    }
                    apiMap.getAdress(aMap, param, namesBack)
                }
                apiMap.getLocation(api, nameBack)
            }, 60000)
        },
        methods: {
            getapp() {
                router.push({ name: 'entrance' })
            }
        }
    }
</script>
<style>
.right-slide-enter-active{
transition: all 0.5s;
}
.right-slide-enter{
transform: translateX(130px);
}
.bounce-enter-active {
    /* animation: bounce-in .5s; */
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
  }

  .bounce-leave-active {
    /* animation: bounce-out .2s; */
    transition: all 0.5s linear;
    transform: translate3d(-100%, 0, 0);
  }
  .bounce-enter, .bounce-leave {
      transform: translate3d(100%, 0, 0);
  } 

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.01);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }
</style>