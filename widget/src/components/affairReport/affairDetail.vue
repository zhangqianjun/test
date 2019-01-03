<template>
    <div class="affairDetail">
        <div style="background:#fff;padding-top:20px;"></div>
        <header class="bar bar-nav">
            <button class="button pull-left" @click="goback()">
                返回
            </button>
            <button class="button pull-right">
                上报
            </button>
            <h1 class="title">事件上报</h1>
        </header>
        <div class="content" style="margin-top: 20px;">
            <div class="list-block">
                <ul>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <hr-selector
                            v-model="value"
                            :label="label"
                            :value-key="'value'"
                            :label-key="'name'"
                            :placeholder="show_tips"
                            :required="is_needed"
                            :list="options"
                            @input="change">
                            </hr-selector>
                        </div>
                    </div>
                </li>
                <li class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <hr-selector
                            v-model="value"
                            :label="label"
                            :value-key="'value'"
                            :label-key="'name'"
                            :placeholder="show_tips"
                            :required="is_needed"
                            :list="options"
                            @input="change">
                            </hr-selector>
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
                            <input type="text" placeholder="请输入标题" v-model="addressName">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="address-content">
                        <div class="address-title">问题标题</div>
                        <div class="address-input">
                        <textarea v-model="addressName"></textarea>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="address-content">
                        <div class="address-title">问题描述</div>
                        <div class="address-input">
                            <textarea v-model="addressName"></textarea>
                        </div>
                    </div>
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
        </div>
    </div>
</template>

<script>
    import apiMap from 'assets/js/map.js'
    import hrSelector from '../hr-selector/index.vue'
    // import popupList from '../common/popup.vue'
    export default {
        data() {
            return {
                addressName: '',
                popupVisible: false,
                selectData: [],
                value: '',
                label:'服务事项',
                show_tips: '12',
                is_needed:true
            }
        },
        created() {
            var aMap = api.require('aMap');
            let nameBack = (ret) => {
                let param = {
                    lon: ret.lon,
                    lat: ret.lat
                }
                let nameBack = (ret) => {
                    this.addressName = ret.address
                }
                apiMap.getAdress(aMap, param, nameBack)
            }
            apiMap.getLocation(api, nameBack)
            // api.getLocation(function(ret, err) {
            //     if (ret && ret.status) {
                    
            //     } else {
            //         alert(JSON.stringify(err));
            //     }
            // });
            // var aMap = api.require('aMap');
            // let param = {
            //     width: 0,
            //     height: 0
            // }
            // let callback = (status) => {
            //     if (status) {
            //         let locationBack = (ret) => {
            //             let param = {
            //                 lon: ret.lon,
            //                 lat: ret.lat
            //             }
            //             let nameBack = (ret) => {
            //                 console.log(ret)
            //                 this.addressName = ret.address
            //             }
            //             apiMap.getAdress(aMap, param, nameBack)
            //         }
            //         apiMap.getlocation(aMap, locationBack)  
            //     }
                
            // }
            // apiMap.openMap(api, aMap, param, callback)
        },
        mounted() {
        },
        methods: {
            openpopup() {
                this.popupVisible = true
            },
            closePopup() {
                this.change(this.childValue)
                this.popupVisible = false
            },
            change(value) {

            },
            goback() {
                router.go(-1)
            }
        },
        components: {
            // popupList
            hrSelector
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
</style>