<template>
<div class="set-list">
    <div class="topUI" style="background:#fff;padding-top:20px;"></div>
    <header class="bar bar-nav">
        <span class="icon icon-left pull-left" @click="goback()"></span>
        <h1 class="title">设置</h1>
    </header>
    <div class="content">
    <div class="list-block">
        <ul>
        <li class="item-content item-link" @click="gotoPhoto()">
            <div class="item-inner">
            <div class="item-title">修改头像</div>
            <img src=""/>
            </div>
        </li>
        <li class="item-content item-link" @click="goPassChangeToast()">
            <div class="item-inner">
            <div class="item-title">修改密码</div>
            </div>
        </li>
        </ul>
    </div>
    </div>
    <div class="block-toast" v-if="changePass"></div>
    <div class="set-toast" v-if="changePass">
        <div class="inputPassword">
            <span>旧密码</span>
            <input type="password"/>
        </div>
        <div class="inputPassword">
            <span>新密码</span>
            <input type="password"/>
        </div>
        <div class="button">
            <span @click="passwordChange()">确定</span>
            <span @click="passwordNo()">取消</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            changePass: false,
        }
    },
    created() {
        api.setStatusBarStyle({
            style: 'dark'
        });
    },
    methods: {
        goback() {
            router.go(-1)
        },
        gotoPhoto() {
            api.getPicture({
            sourceType: 'camera',
            encodingType: 'png',
            mediaValue: 'pic',
            destinationType: 'url',
            allowEdit: true,
            quality: 100,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
            }, function(ret, err) {
            });
        },
        passwordChange() {
            this.changePass = false
        },
        passwordNo() {
            this.changePass = false 
        },
        goPassChangeToast() {
            this.changePass = true
        }
    }
}
</script>

<style>
.set-list {
    width:100%;
    height: 100%;
}
.set-list .icon{
    width:auto;
    height:auto;
}
.set-list .bar-nav{
    background: #fff;
    top: auto;
}
.list-block li{
    padding:0;
}
.set-list .content{
    background: #fafafa;
    margin-top:20px;
}
.set-list .list-block{
    margin: 0;
}
.set-list .item-inner img {
    width: 2.75rem;
    height: 2.75rem;
}
.block-toast {
    width:100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    top:0;
    left:0;
    z-index: 20;
}
.set-toast {
    width:80%;
    height: 200px;
    background: #fff;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 30;
    border-radius: 5px;
    padding-top: 20px;
}
.set-toast .button {
    display: flex;
    position:absolute;
    bottom: 0;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    font-size: 1rem;
}
.set-toast .button span {
    display: block;
    flex:1;
    background: #0894ec;
    color: #fff;
    height: 50px;
    line-height: 50px;
}
.inputPassword {
    font-size: 0.8rem;
    padding: 10px 20px;
}
.inputPassword input{
    margin-left: 3%;
    width: 60%;
    height: 1.5rem;
    border: 1px solid #E6E6E6;
}
</style>
