<template>
    <div>
        <div class="person-detail">
            <div class="person-title">
                <img src="" />
                <p class="person-name">
                    <span class="name">liukjj</span>
                    <span class="ifInline">在线</span>
                </p>
                <p class="sets">
                    <span class="search" @click="search()">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </span>
                    <span class="reset" @click="gotoSet()">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shezhi"></use>
                        </svg>
                    </span>
                </p>
            </div>
            <div class="person-address">
                <span class="address">
                    <i>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dizhi"></use>
                        </svg>
                    </i>
                    <span style="padding-left:10px;"></span>
                </span>
                <span class="address-f5">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shuaxin"></use>
                    </svg>
                </span>
            </div>
            <div class="handle-affair">
                <div>
                    <p @click="gotoReport()">
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yunduanshangchuan"></use>
                            </svg>
                        </span>
                        <span>
                            上报事件
                        </span>
                    </p>
                </div>
                <div>
                    <p @click="getWater()">
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-paizhao"></use>
                            </svg>
                        </span>
                        <span>
                            信息采集
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <list-content></list-content>
    </div>
</template>

<script>
    import listContent from '../list/listContent.vue'
    import photoApi from 'assets/js/photo.js'
    import apiMap from 'assets/js/map.js'
    export default {
        data() {
            return {
                addressName: ''
            }
        },
        created() {
            this.getAdress()
        },
        methods: {
            gotoReport() {
                router.push({ name: 'affairReport'})
            },
            search() {
                router.push({ name: 'search' })
            },
            gotoSet() {
                router.push({ name: 'set' })
            },
            getWater() {
                let getpicture = (ret) => {
                    var pictureWatermark = api.require('pictureWatermark');
                    let param = {
                        text: '2018-10-20',
                        x: 0,
                        y: 0
                    }
                    let waterBack = (ret) => {
                        // this.getAdress(callback)
                        let param = {
                            text: 'this.addressName',
                            x: 0,
                            y: 20
                        }
                        let againBack = (ret) => {
                            photoApi.saveAlbum(api, ret.path)
                        }
                        photoApi.waterMark(pictureWatermark, ret.path, param, againBack)
                    }
                    photoApi.waterMark(pictureWatermark, ret.data, param, waterBack)
                }
                photoApi.getPhoto(api, getpicture)
            },
            getAdress(callback) {
                var aMap = api.require('aMap');
                let nameBack = (ret) => {
                    let param = {
                        lon: ret.longitude,
                        lat: ret.latitude
                    }
                    let nameBack = (res) => {
                        this.addressName = res.address
                    }
                    apiMap.getAdress(aMap, param, nameBack)
                }
                apiMap.getLocation(api, nameBack)
            }
        },
        components:{
            listContent
        }
    }
</script>
<style>
.person-detail{
    background: rgb(102, 204, 204)
}
.person-detail .person-title{
    display:flex;
    padding:10px 15px 0;
}
.person-title img{
    width:60px; height:60px;
}
.person-name{
    display:flex;
    flex-direction: column;
    padding-left:10px;
    height:70px;
    width:150px;
}
.person-name .name{
    font-size:20px;
    color:#fff;
    height:36px;
}
.person-name .ifInline{
    height:20px;
    color: rgb(255, 255, 51)
}
.sets{
    float:right;
    flex:1;
    text-align:right;
}
.sets .icon{
    font-size:26px;
    color:#fff;
    margin-left:10px;
}
.person-address{
    display:flex;
    padding:0px 15px 20px;
    color:#fff;
}
.person-address .address{
    width:80%;
    display:flex;
    line-height:26px;
}
.person-address .address .icon{
    font-size:26px;
}
.address-f5{
    flex:1;
    text-align:right;
    font-size:20px;
    line-height:26px;
    margin-right:20px;
    color:#fff;
}
.handle-affair{
    display:flex;
    justify-content: space-around;
    padding-bottom:30px;
}
.handle-affair div{
    width:120px;
    height:40px;
    background:#fff;
    line-height:40px;
    text-align:center;
}
.handle-affair div .icon{
    font-size:26px;
}
</style>