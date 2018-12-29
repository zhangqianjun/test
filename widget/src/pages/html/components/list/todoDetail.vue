<template>
<div class="todoDetail">
    <header class="bar bar-nav">
        <h1 class="title">视图列表</h1>
    </header>
    <div class="content">
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
                    <div class="item-after">导航</div>
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
