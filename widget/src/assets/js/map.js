const mapApi = {
    //打开地图
    openMap(api, obj ,param, callback) {
        let status = false
        obj.open({
            rect: {
                x: 0,
                y: 65,
                w: param.width,
                h: param.height
            },
            showUserLocation: true,
            zoomLevel: 11,
            center: {
                lon: param.lon || 116.4021310000,
                lat: param.lat || 39.9994480000
            },
            fixedOn: api.frameName,
            fixed: true
        }, function(ret, err) {
            if (ret.status) {
                callback(ret.status)
            } else {
                alert(JSON.stringify(err));
            }
        });
    },
    // 获取当前位置得经纬度
    // getlocation(obj, callback) {
    //     obj.getLocation(function(ret, err) {
    //         if (ret.status) {
    //             callback(ret)
    //         } else {
    //             alert(JSON.stringify(err));
    //         }
    //     });
    // },
    getLocation(obj, callback) {
            obj.getLocation(function(ret, err) {
                if (ret.status) {
                    callback(ret)
                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
    // 获取地址名字
    getAdress(obj, param, callback) {
        obj.getNameFromCoords({
            lon: param.lon,
            lat: param.lat
        }, function(ret, err) {
            if (ret.status) {
                // return ret
                callback(ret)
                // this.addressName = ret
            } else {
                alert(JSON.stringify(err));
            }
        });
    },
    //设置中心位置
    setCenter(obj, param){
        obj.setCenter({
            coords: {
                lon: param.lon,
                lat: param.lat
            },
            animation: false
        });
    },
    //标注位置
    setIcon(obj, param, id) {
        obj.addAnnotations({
            annotations: [{
                id: id,
                lon: param.lon,
                lat: param.lat
            }],
                icons: ['widget://'],
                draggable: true,
                timeInterval: 2.0
            }, function(ret) {
                if (ret.eventType == 'click') {

                }
            });
    },
    // 显示信息气泡
    adressLook(obj, param, id){
        obj.setBubble({
            id: id,
            bgImg: 'widget://res/bubble_bg.png',
            content: {
                title: this.addressName.address,
            },
            styles: {
                titleColor: '#000',
                titleSize: 12,
                subTitleColor: '#999',
                subTitleSize: 12,
                illusAlign: 'left',
                w: 300
            }
        }, function(ret) {
            if (ret) {
                alert(JSON.stringify(ret));
            }
        });
    },
    //获取导航路线
    getLine(obj, id, start, end, callback) {
        obj.searchRoute({
            id: id,
            type: 'walk',
            start: start,
            end: end
        }, function(ret, err) {
            if (ret.status) {
                    obj.drawRoute({
                        id: 1,
                        autoresizing: true,
                        index: 0,
                        styles: {
                            walkLine: {
                                width: 3,
                                color: '#698B22',
                                lineDash: false,
                                strokeImg: ''
                            },
                            icons: {
                                start: '',
                                end: '',
                                bus: '',
                                car: '',
                                man: ''
                            }
                        }
                    });
                api.alert({ msg: JSON.stringify(ret) });
            }
        });    
    }
}
export default mapApi;