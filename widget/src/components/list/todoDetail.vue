<template>
<div class="todoDetail">
    <header class="bar bar-nav" style="height:60px;padding-top:20px;">
        <button v-if="!openMap" class="button pull-left" @click="outMap()">
            返回
        </button>
        <h1 v-if="!openMap" class="title">视图列表</h1>
    </header>
    <div class="content" style="top:60px;">
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">发起人</div>
                    <div class="item-after">李二</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">时间</div>
                    <div class="item-after">2018-12-01 12:32</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">时间</div>
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
            </ul>
        </div>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">标题</div>
                    <div class="item-after">地聚会的</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">描述</div>
                    <div class="item-after">地聚会的</div>
                    </div>
                </li>
            </ul>
        </div>
         <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                    <div class="item-title">目标地址</div>
                    <div class="item-after" @click="getLine()">导航</div>
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
            openMap: false
        }
    },
    created() {

    },
    mounted() {

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
                apiMap.openMap(api, aMap, param,  mapBack)
        },
        openMap() {
            
        },
        getLine(id) {
            var aMap = api.require('aMap');
            let param = {
                width: 'auto',
                height: 'auto'
            }
            let openCallback = (res) => {
                this.openMap = true
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
                    console.log(res)
                }
                apiMap.getLine(aMap, 1, param.start, param.end, LineCallback)
            }
            apiMap.getLocation(api, nameBack)
            }
            apiMap.openMap(api, aMap, param, openCallback)
        },
        outMap() {
            var aMap = api.require('aMap');
            aMap.close();
            aMap.removeRoute({
                ids: [1]
            });
        }
    }
}
</script>

<style>
.list-block li{
    margin:0;
    padding:0;
}
.list-block ul{
    margin-bottom:10px;
}
.todoDetail .list-block{
    margin:0;
}
</style>
