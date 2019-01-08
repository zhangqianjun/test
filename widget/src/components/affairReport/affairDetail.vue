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
            <div class="list-block">
                <ul>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <hr-selector
                            v-model="value1"
                            :label="label1"
                            :placeholder="show_tips"
                            :required="is_needed"
                            :list="options1"
                            @input="change1">
                            </hr-selector>
                        </div>
                    </div>
                </li>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <hr-selector
                            v-model="value2"
                            :label="label2"
                            :placeholder="show_tips"
                            :required="is_needed"
                            :list="options2"
                            @input="change2">
                            </hr-selector>
                        </div>
                    </div>
                </li>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="right-selector" @click="openlist()">
                                <span style="color: red;padding-right:5px;">* </span>
                                <div class="label">服务事项
                                </div>
                                <div class="right-content">
                                    <span style="color:#888;">{{casValue ? casValue : '请选择'}}</span>
                                    <span class="icon icon-right"></span>
                                </div>
                            </div>
                        </div>
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
                            <!-- <input type="text" placeholder="请输入标题" v-model="addressName"> -->
                        </div>
                    </div>
                </li>
                <li>
                    <div class="address-content">
                        <div class="address-title">问题标题</div>
                        <div class="address-input">
                        <textarea v-model="requestTitle"></textarea>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="address-content">
                        <div class="address-title">问题描述</div>
                        <div class="address-input">
                            <textarea v-model="requestDes"></textarea>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="address-content">
                        <div class="address-title">附件</div>
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
                value1: '1',
                value2: '1',
                label1:'是否需要调度',
                label2:'处理级别',
                show_tips: '12',
                is_needed:true,
                options1: [
                    '是',
                    '否'
                ],
                options2: [
                    '日常',
                    '紧急'
                ],
                pickerData:[],
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
                eventfile:[]
            }
        },
        created() {
            this.getTypeList()
            api.setStatusBarStyle({
                style: 'dark'
            });
            var aMap = api.require('aMap');
            let nameBack = (ret) => {
                let param = {
                    lon: ret.longitude,
                    lat: ret.latitude
                }
                this.lonAndLat = {
                    lon: ret.longitude,
                    lat: ret.latitude
                }
                let nameBack = (ret) => {
                    console.log('ret'+ret)
                    this.addressName = ret.address
                }
                apiMap.getAdress(aMap, param, nameBack)
            }
            apiMap.getLocation(api, nameBack)
        },
        mounted() {
            // console.log(this.$refs.header)
            // $g.winInit(this.refs.header)
        },
        methods: {
            openlist() {
                this.openCas = true
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
            change1(value) {
                console.log('val'+value)
                if( value == '是' ) {
                    this.eventIf = 1
                } else {
                    this.eventIf = 2
                }
            },
            change2(value) {
                console.log('val'+value)
                if (value == '日常') {
                    this.eventLevel = 1
                } else {
                    this.eventLevel = 2
                }
            },
            goback() {
                if (this.openCas) {
                    this.openCas = false
                } else {
                    router.go(-1) 
                }
                
            },
            getTypeList() {
                let callback = (res) => {
                    // this.initPicker(res)
                    this.pickerData = res.data
                }
                $http.getTypeList(api, callback)
            },
            changeList(data) {
                console.log(data)
                this.pickerData = data
            },
            changeok(data) {
                this.casValue = data.name
                this.eventType = data.id
                this.openCas = false
            },
            inputFile(files) {
                this.eventfile = files
            },
            postEvent() {
                let info = {
                    level: this.eventLevel,
                    type: this.eventType,
                    need_scheduling: this.eventIf,
                    title: this.requestTitle,
                    description: this.requestDes,
                    address: this.addressName,
                    lng: this.lonAndLat.lon,
                    lat: this.lonAndLat.lat,
                    files: this.eventfile
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
    border:0;
    color: #333;
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
.right-content .icon{
  font-weight: bold;
  color:#ccc;
  width:auto;
  height:auto;
  margin-right:10px;
  font-size:12px;
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
</style>