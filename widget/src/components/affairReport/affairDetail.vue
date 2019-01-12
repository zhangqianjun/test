<template>
    <div class="affairDetail">
        <div style="background:#fff;padding-top:25px;"></div>
        <header ref="header" class="bar bar-nav">
            <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
            <button v-if="!openCas" class="button pull-right" @click="postEvent()">
                上报
            </button>
            <h1 v-if="!openCas" class="title">事件上报</h1>
        </header>
        <div class="content" style="margin-top: 25px;">
            <div class="list-block"  v-if="!openCas">
                <ul>
                <!-- <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <span style="color: red;padding-right:5px;">* </span>
                            <div class="item-title label" style="width:150px;">是否需要调度</div>
                            <div class="item-input selectItem">
                                <select v-model="eventLevel">
                                    <option value="1">是</option>
                                    <option value="2">否</option>
                                </select>
                                <span class="icon icon-right"></span>
                            </div>
                        </div>
                    </div>
                </li> -->
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <span style="color: red;padding-right:5px;">* </span>
                            <div class="item-title label" style="width:150px;">事件级别</div>
                            <div class="item-input selectItem">
                                <select v-model="eventIf">
                                    <option value="1">日常</option>
                                    <option value="2">紧急</option>
                                </select>
                                <span class="icon icon-right"></span>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <span style="color: red;padding-right:5px;">* </span>
                            <div class="right-selector" @click="openlist()">
                                <div class="item-title label">服务事项
                                </div>
                                <div class="right-content" style="position:relative;">
                                    <span style="color:#000;text-align:right;margin-right:20px;">{{casValue ? casValue : '请选择'}}</span>
                                    <span class="icon icon-right" style="position:absolute;right:0;top:0.2rem;text-align:center;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <span style="color: red;padding-right:5px;">* </span>
                            <div class="right-selector" @click="openGridList()">
                                <div class="item-title label">所属网格
                                </div>
                                <div class="right-content" style="position:relative;">
                                    <span style="color:#000;text-align:right;margin-right:20px;">{{gridValue ? gridValue : '请选择'}}</span>
                                    <span class="icon icon-right" style="position:absolute;right:0;top:0.2rem;text-align:center;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                </ul>
            </div>
            <div class="list-block"  v-if="!openCas">
                <ul>
                    <li>
                    <div class="address-content">
                        <div class="address-title dingwei">
                            <span>地址信息</span>
                            <span style="color: #64ABFB;" @click="getAdress()">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-Location"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="address-input">
                            <textarea v-model="addressName"></textarea>
                            <!-- <input type="text" placeholder="请输入标题" v-model="addressName"> -->
                        </div>
                    </div>
                </li>
                <li>
                    <div class="address-content">
                        <div class="address-title"><span style="color: red;padding-right:5px;">* </span>问题标题</div>
                        <div class="address-input">
                        <textarea v-model="requestTitle"></textarea>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="address-content">
                        <div class="address-title"><span style="color: red;padding-right:5px;">* </span>问题描述</div>
                        <div class="address-input">
                            <textarea v-model="requestDes"></textarea>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="address-content">
                        <div class="address-title"><span style="color: red;padding-right:5px;">* </span>附件</div>
                        <upload @inputFile="inputFile"></upload>
                        <!-- <div class="file-upload">+ -->
                            <!-- <upload @inputFile="inputFile"></upload> -->
                        <!-- </div> -->
                    </div>
                </li>
                </ul>
            </div>
            <cascader v-if="openCas"
            :list="pickerData"
            @changelist="changeList"
            @changeok="changeok"></cascader>

        </div>
        <!-- <cascader v-if="openCas"
        :list="pickerData"></cascader> -->
    </div>
</template>

<script>
    import apiMap from 'assets/js/map.js'
    import hrSelector from '../hr-selector/index.vue'
    import upload from 'components/form/upload.vue'
    import honrayPicker from 'components/common/pickerContainer'
    import cascader from 'components/common/cascader.vue'
    // import popupList from '../common/popup.vue'
    export default {
        data() {
            return {
                addressName: '定位中...',
                popupVisible: false,
                selectData: [],
                show_tips: '12',
                pickerData:[],
                contentList: [],
                valueKey: 'id',
                title: 'jil',
                name: 'name',
                openCas: false,
                eventIf: 1,
                eventLevel: 1,
                requestTitle: '',
                requestDes: '',
                lonAndLat: {
                    lon: '',
                    lat: ''
                },
                eventfile:[],
                doublePic: false,
                casValue: '',
                gridValue: '',
                cas: ''
            }
        },
        created() {
            this.getTypeList()
            api.setStatusBarStyle({
                style: 'dark'
            });
            this.getAdress()
        },
        mounted() {
            // console.log(this.$refs.header)
            // $g.winInit(this.refs.header)
        },
        methods: {
            getAdress() {
                this.addressName = '定位中...'
                var aMap = api.require('aMap');
                let data = {}
                let openCallBack = (res) => {
                    let nameBack = (ret) => {
                        let param = {
                            lon: ret.lon,
                            lat: ret.lat
                        }
                        this.lonAndLat.lon = ret.lon
                        this.lonAndLat.lat = ret.lat
                        this.getGridList(ret.lon, ret.lat)
                        aMap.close()
                        aMap.stopLocation();
                        let namesBack = (res) => {
                            this.addressName = res.address
                        }
                        apiMap.getAdress(aMap, param, namesBack)
                    }
                    apiMap.getLocation(aMap, nameBack)
                }
                apiMap.openMap(api, aMap, data, openCallBack)
            },
            openlist() {
                this.cas = 'event'
                this.openCas = true
                this.pickerData = this.contentList
            },
            getGridList(lon, lat) {
                let param = {
                    lng: lon,
                    lat: lat
                }
                let callback = (res) => {
                    if (res.data.grid) {
                        this.gridValue = res.gridId.name
                        this.grid = res.id
                    }
                    this.gridLists = res.data.list
                }
                $http.gridList(api, param, callback)
            },
            openGridList() {
                this.cas = 'grid'
                this.openCas = true;
                this.pickerData = this.gridLists
            },
            // initPicker(data) {
            //     let curList = data
            //     console.log(data)
            //     while(curList && curList.length) {
            //     this.pickerData.push(curList)
            //     curList = curList[0].children
            //     }
            // },
            openpopup() {
                this.popupVisible = true
            },
            closePopup() {
                this.change(this.childValue)
                this.popupVisible = false
            },
            goback() {
                if (this.doublePic) {
                    this.doublePic = false
                    if (this.cas == 'event') {
                        this.pickerData = this.contentList
                    } else if (this.cas == 'grid') {
                        this.pickerData = this.gridLists
                    }
                } else if (this.openCas) {
                    this.openCas = false
                } else {
                    router.go(-1) 
                }
                
            },
            getTypeList() {
                let callback = (res) => {
                    this.contentList = res.data
                    // this.pickerData = res.data
                }
                $http.getTypeList(api, callback)
            },
            changeList(data) {
                this.pickerData = data
                this.doublePic = true
            },
            changeok(data) {
                if (this.cas == 'event') {
                    this.casValue = data.name
                    this.eventType = data.id
                } else if (this.cas == 'grid') {
                    this.gridValue = data.name
                    this.grid = data.id
                }
                this.openCas = false
            },
            inputFile(files) {
                this.eventfile = files
            },
            postEvent() {
                if (!this.eventType) {
                    api.toast({
                        msg: '请选择服务事项',
                        duration: 2000,
                        location: 'middle'
                    })
                    return
                }
                if (!this.grid) {
                    api.toast({
                        msg: '请选择所属网格',
                        duration: 2000,
                        location: 'middle'
                    })
                    return
                }
                if (!this.requestTitle) {
                    api.toast({
                        msg: '请输入问题标题',
                        duration: 2000,
                        location: 'middle'
                    })
                    return
                }
                if (!this.requestDes) {
                    api.toast({
                        msg: '请输入问题描述',
                        duration: 2000,
                        location: 'middle'
                    })
                    return
                }
                if (this.eventfile.length == 0) {
                    api.toast({
                        msg: '请上传附件',
                        duration: 2000,
                        location: 'middle'
                    })
                    return
                }
                let info = {
                    // level: this.eventLevel,
                    type: this.eventType,
                    need_scheduling: this.eventIf,
                    title: this.requestTitle,
                    description: this.requestDes,
                    address: this.addressName,
                    lng: this.lonAndLat.lon,
                    lat: this.lonAndLat.lat,
                    files: this.eventfile,
                    grid: this.grid
                }
                let param ={
                    info: info
                }
                let callback = (res) => {
                    api.toast({
                        msg: '上报成功',
                        duration: 1500,
                        location: 'middle'
                    });
                    router.go(-1) 
                }
                console.log(param)
                $http.getNoticeList(api, param, callback)
            }
        },
        components: {
            // popupList
            hrSelector,
            upload,
            honrayPicker,
            cascader
            
        }
    }
</script>
<style>
.affairDetail .bar{
    background: #fff;
    top: auto;
}
.affairDetail .content{
    background:#FAFAFA;
}
.affairDetail .bar .button{
    /* border:0; */
    /* color: #333; */
}
.affairDetail .content .list-block{
    margin:0.5rem 0;
}
.affairDetail .content .list-block li{
    margin: 0;
    padding: 0;
}
.affairDetail .content .list-block .item-title.label{
    width:100px;
}
.affairDetail .list-block textarea{
    padding-top: 4px !important;
}
.affairDetail .list-block .item-input{
    margin: 0 !important;
}
.affairDetail .list-block .item-inner{
    padding: 0 !important;
}
.affairDetail .address-content{
    padding: 5px 0.75rem 25px 0.75rem;
}
.affairDetail .address-content .address-input{
    border:1px solid #E6E6E6;
    color:#333333;
    font-size: 12px;
}
.affairDetail .address-title{
    margin: 10px 0;
    padding-left: 10px;
    font-size: 0.85rem;
    line-height: 0.85rem;
    border-left: 2px solid #64ABFB;
}
.affairDetail .file-upload{
    border:1px solid #E6E6E6;
    color:#333333;
    width:100px;
    height:100px;
    line-height:90px;
    text-align: center;
    font-size:60px;
}
.affairDetail .right-content .icon{
  /* font-weight: bold; */
  width:auto;
  height:auto;
  font-size:14px;
  width: 0.8rem;
  height: 1rem;
  color: #999;
}
.right-content {
  color:#ccc;
  flex: 1;
  text-align:right;
}
.right-selector {
  display: -webkit-box;
  display: flex;
  -webkit-display: flex;
  /* position: relative; */
  background-color: #fff;
  /* max-width: 37.5rem; */
  justify-content: space-between;
  width:100%;
}
.affairDetail .list-block select {
  direction: rtl;
}
.affairDetail .list-block select option {
    direction: ltr;
}
.affairDetail .selectItem{
  position:relative;
  padding-right:1rem;
}
.affairDetail .selectItem span {
  font-size:14px;
  width: 0.8rem;
  height: 1rem;
  color: #999;
  position: absolute;
  right: 0;
  top: 0.65rem;
  bottom:0;
}
.affairDetail .list-block .item-content{
    margin-right: 0.5rem;
}
.affairDetail .dingwei{
    padding-right:10px;
    display:flex;
    justify-content: space-between;
}

</style>