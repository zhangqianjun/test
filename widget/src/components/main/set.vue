<template>
<div class="search-list">
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
            </div>
        </li>
        <li class="item-content item-link">
            <div class="item-inner">
            <div class="item-title">修改密码</div>
            </div>
        </li>
        </ul>
    </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        goback() {
            router.go(-1)
        },
        gotoPhoto() {
            alert(373747)
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
        }
    }
}
</script>

<style>
.search-list .icon{
    width:auto;
    height:auto;
}
.list-block li{
    padding:0;
}
</style>
