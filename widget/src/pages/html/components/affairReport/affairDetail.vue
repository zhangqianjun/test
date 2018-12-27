<template>
    <div class="affairDetail">
        <header class="bar bar-nav">
            <button class="button pull-left" @click="goback()">
                返回
            </button>
            <button class="button pull-right">
                上报
            </button>
            <h1 class="title">事件上报</h1>
        </header>
        <div class="content">
            <div class="list-block">
                <ul>
                <li>
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">服务事项</div>
                        <div class="item-input">
                        <select>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">处理级别</div>
                        <div class="item-input">
                        <select>
                            <option>日常</option>
                            <option>日常</option>
                            <option>日常</option>
                            <option>日常</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">位置信息</div>
                        <div class="item-input">
                        <input type="text" placeholder="位置信息">
                        </div>
                    </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">地址信息</div>
                        <div class="item-input">
                        <textarea v-model="addressName"></textarea>
                        </div>
                    </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">问题标题</div>
                        <div class="item-input">
                        <input type="text" placeholder="请输入标题">
                        </div>
                    </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">问题描述</div>
                        <div class="item-input">
                        <textarea placeholder="请输入标题"></textarea>
                        </div>
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
                addressName: ''
            }
        },
        created() {
            var aMap = api.require('aMap');
            let param = {
                width: 0,
                height: 0
            }
            let callback = (status) => {
                if (status) {
                    let locationBack = (ret) => {
                        let param = {
                            lon: ret.lon,
                            lat: ret.lat
                        }
                        let nameBack = (ret) => {
                            console.log(ret)
                            this.addressName = ret.address
                        }
                        apiMap.getAdress(aMap, param, nameBack)
                    }
                    apiMap.getlocation(aMap, locationBack)  
                }
                
            }
            // this.isOpen = apiMap.openMap(api, aMap, param)
            apiMap.openMap(api, aMap, param, callback)
            // new Promise((resolve, reject) => {
            //     console.log('apiMap', apiMap)
            //   let isopen = apiMap.openMap(api, aMap, param)
            //   console.log('isopen', isopen)
            //   resolve(isopen)
            // }).then((res) => {
            //     console.log('this.isOpen2', res)
            // })
            // console.log('this.isOpen', this.isOpen)
            // if (this.isOpen) {
            //     let address =  apiMap.getlocation(aMap)
            //     if (this.address.status) {
            //         let param = {
            //             lon: address.lon,
            //             lat: address.lat
            //         }
            //         this.addressName =  apiMap.getAdress(aMap. param)
            //     }
            // }
        },
        methods: {
            goback() {
                router.go(-1)
            }
        }
    }
</script>
<style>
.affairDetail .title{
    background: rgb(130, 220, 194);
    color:#fff;
}
.bar .button{
    border:0;
    color:#fff;
}
.content .list-block{
    margin:0;
}
.content .list-block li{
    margin: 0;
    padding: 0;
}
.content .list-block .item-title.label{
    width:100px;
}
.list-block textarea{
    padding-top: 4px !important;
}
.list-block .item-input{
    margin: 0 !important;
}
.list-block .item-inner{
    padding:0 !important;
}
</style>