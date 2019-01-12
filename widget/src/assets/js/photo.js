const photoApi = {
    //拍照
    getPhoto(api, callback) {
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
                if (ret.data) {
                    callback(ret)
                } else {
                    // alert(JSON.stringify(err));
                }
            });
    },
    //加水印
    waterMark(pictureWatermark, path, data, callback){
        pictureWatermark.getPictureSize({
            path:path
        }, function(ret, err) {
            if (ret) {
            }
        });
        pictureWatermark.mark({
            watermark : {
                text: data.text,                  //（可选项）字符串类型；文字描述(不传则不添加)  
                textAttribute:{          //（可选项）JSON对象；水印文字
                    point:{
                        x: data.x,           //（可选项）数字类型；文字水印左上角的 x 坐标（相对于所属的原始图片的位置）；默认：0
                        y: data.y            //（可选项）数字类型；文字水印左上角的 y 坐标（相对于所属的原始图片的位置）；默认：0
                    },
                    textSize:18,         //（可选项）数字类型；文字大小；默认：14
                    textColor:'#fff'     //(可选项）字符串类型；文字颜色；默认：'#fff'
                },
            },
        }, function(ret, err) {
            if (ret.status) {
                callback(ret)
            } else {
                // alert(JSON.stringify(err));
            }
        })
    },
    //加水印图片放入系统相册
    saveAlbum(api, path) {
        api.saveMediaToAlbum({
            path: path
        }, function(ret, err) {
            if (ret && ret.status) {
                alert('保存成功');
            } else {
                alert('保存失败');
            }
        });
    }
}
export default photoApi;