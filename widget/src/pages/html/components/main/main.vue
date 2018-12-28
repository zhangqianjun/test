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
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dizhi"></use>
                    </svg>
                    <span>广州市</span>
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
                    <p @click="gotoPhoto()">
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
    export default {
        data() {
            return {
            }
        },
        created() {
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
            gotoPhoto() {
                api.getLocation(function(ret, err) {
                    if (ret && ret.status) {
                        
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
                api.getPicture({
                sourceType: 'camera',
                encodingType: 'png',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: true,
                quality: 100,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
                }, function(ret, err) {
                    if (ret) {
                        var pictureWatermark = api.require('pictureWatermark');
                         pictureWatermark.getPictureSize({
                            path:ret.data
                        }, function(ret, err) {
                            if (ret) {
                                alert(JSON.stringify(ret));
                            }
                        });
                        pictureWatermark.mark({
                            watermark : {
                                text:'133ygygyggyyfytf',                  //（可选项）字符串类型；文字描述(不传则不添加)    
                                textAttribute:{          //（可选项）JSON对象；水印文字
                                    point:{
                                        x:0,           //（可选项）数字类型；文字水印左上角的 x 坐标（相对于所属的原始图片的位置）；默认：0
                                        y:0            //（可选项）数字类型；文字水印左上角的 y 坐标（相对于所属的原始图片的位置）；默认：0
                                    },
                                    textSize:30,         //（可选项）数字类型；文字大小；默认：14
                                    textColor:'#fff'     //(可选项）字符串类型；文字颜色；默认：'#fff'
                                },
                            },
                        }, function(ret, err) {
                            if (ret) {
                                api.saveMediaToAlbum({
                                    path: ret.path
                                }, function(ret, err) {
                                    if (ret && ret.status) {
                                        alert('保存成功');
                                    } else {
                                        alert('保存失败');
                                    }
                                });
                            }
                        })
                        } else {
                            alert(JSON.stringify(err));
                        }
                });
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