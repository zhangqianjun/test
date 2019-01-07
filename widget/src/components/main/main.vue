<template>
    <div>
        <div style="padding-top: 20px; background: #64ABFB; height:8.5rem;margin-bottom:3rem;">
            <div class="person-detail">
                <div>
                    <p class="sets">
                        <span class="search" @click="search()">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sousuo"></use>
                            </svg>
                        </span>
                        <span class="reset" @click="gotoSet()">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-icon-test"></use>
                            </svg>
                        </span>
                    </p>
                </div>
                <div class="person-title">
                    <img :src="`${HOST}${userInfo.photo}`" />
                    <div class="person-name">
                        <div class="person-line">
                            <span class="name">{{userInfo.name}}</span>
                            <span class="ifInline" @click="selectInline()">{{userInfo.status == 1 ? '在线' : '离线'}}</span>
                        </div>
                        <div class="person-address">
                            <span class="address">
                                <i>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dizhi"></use>
                                    </svg>
                                </i>
                                <span>{{addressName}}</span>
                            </span>
                            <!-- <p style="width:100%;">{{addressName}}kjfhilhfuihguaueyrgaeruygferuarueiur</p> -->
                            <span class="address-f5" @click="getAdress()">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shuaxin"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="handle-affair">
                    <div>
                        <p @click="gotoReport()">
                            <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-iconset0348"></use>
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
                                    <use xlink:href="#icon-xiangji"></use>
                                </svg>
                            </span>
                            <span>
                                信息采集
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <list-content></list-content>
        <div @click="goto()">123</div>
        <popup v-if="selectLine" @ifopen="ifopen()"></popup>
    </div>
</template>

<script>
    import listContent from '../list/listContent.vue'
    import photoApi from 'assets/js/photo.js'
    import apiMap from 'assets/js/map.js'
    import popup from '../common/popup.vue'
    export default {
        data() {
            return {
                addressName: '',
                selectLine: false,
                userInfo: {},
            }
        },
        created() {
            api.setStatusBarStyle({
                style: 'light'
            });
            this.getAdress()
        },
        mounted() {
        },
        methods: {
            goto() {
                router.push({ name: 'todoDetails', params: {id: '1'}})
            },
            getUserInfo() {
                let callback = (res) => {
                    this.userInfo = res.data
                }
                $http.getUserInfo(api, callback)
            },
            selectInline() {
                this.selectLine = true
            },
            ifopen() {
                this.selectLine = false
            },
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
                        text: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
                        x: 0,
                        y: 0
                    }
                    let waterBack = (ret) => {
                        // this.getAdress(callback)
                        let param = {
                            text: this.addressName,
                            x: 0,
                            y: 30
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
                    let namesBack = (res) => {
                        console.log(res)
                        this.addressName = res.district + res.building
                    }
                    apiMap.getAdress(aMap, param, namesBack)
                }
                apiMap.getLocation(api, nameBack)
            }
        },
        components:{
            listContent,
            popup
        }
    }
</script>
<style>
.person-detail{
    height:8.5rem;
    background: url('../../assets/img/bac.png') no-repeat;
    background-size:100%;
    background-position: 0px 40px;
    position:relative;
}
.person-detail .person-title{
    display:flex;
    padding:15px 15px;
}
.person-title img{
    width:3.25rem; 
    height:3.25rem;
    border-radius:50%;
}
.person-name{
    display:flex;
    flex-direction: column;
    padding-left:10px;
    height:70px;
    flex:1;
    /* width:150px; */
}
.person-line {
    /* overflow: hidden; */
}
.person-name .name{
    font-size:1.1rem;
    color:#fff;
    height:1.8rem;
}
.person-name .ifInline{
    width:2rem;
    padding: 4px 10px;
    height:0.75rem;
    border-radius: 1rem;
    background:#000;
    opacity: 0.4;
    height:20px;
    color:#fff;
    font-size: 12px;
}
.sets{
    flex:1;
    text-align:right;
}
.sets .icon{
    font-size:32px;
    color:#fff;
}
.person-address{
    width:100%;
    height:1.45rem;
    display:flex;
    color:#fff;
    margin-right: 10px;
}
.person-address .address{
    width:80%;
    display:flex;
    line-height:26px;
}
.person-address .address span{
    padding-left:15px;
    line-height:30px;
    overflow:hidden;
    white-space: nowrap;text-overflow: ellipsis;
}
.person-address .address .icon{
    font-size:1rem;
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
    position:absolute;
    bottom:-2.5rem;
    left:0;
    display:flex;
    justify-content: space-around;
    padding-bottom:30px;
    width:100%;
}
.handle-affair div{
    width:7.5rem;
    height:2.75rem;
    background:#fff;
    line-height:2.75rem;
    border-radius:20px;
    text-align:center;
    box-shadow:0 4px 3px -4px #64ABFB;
}
.handle-affair div .icon{
    font-size:1rem;
    margin-right:0.2rem;
    color:#64ABFB;
}
</style>