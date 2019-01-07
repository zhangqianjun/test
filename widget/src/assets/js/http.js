(function (window) {

    var $http = {};
    /*============================================
     * 用户管理
     *============================================*/
    // 用户登录
    $http.login = function (api, data, success) {
      this.ajax(api, {
        url: 'admin/base/login',
        method: 'post',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 用户基本信息
    $http.getUserInfo = function (api, success) {
      this.ajax(api, {
        url: '/api/app/getUserInfo',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }

    // 修改头像
    $http.getUserPhoto = function (api, data, success) {
      this.ajax(api, {
        url: 'api/app/uploadPhoto',
        method: 'post',
        data: {
          body: data
        }
      }, function (res) {
        success(res)
      })
    }
  
    // 修改密码
    $http.changePassword = function (api, data, success) {
      this.ajax(api, {
        url: '/admin/users/setInfo',
        method: 'post',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 退出登录
    $http.logout = function (api, success) {
      this.ajax(api, {
        url: '/admin/users/logout',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
    //获取详情
    $http.getEventInfo = function (api, data, success) {
      console.log('data'+data.eventId)
      this.ajax(api, {
        url: '/api/app/getEventInfo',
        method: 'get',
        data: {
          body: data
        }
      },function (res) {
        success(res)
      })
    }

    //搜索
    $http.getSearch = function (api, data, success) {
      this.ajax(api, {
        url: '/api/app/queryNeed',
        method: 'get',
        data: {
          body: data
        }
      },function (res) {
        success(res)
      })
    }
    /*============================================
     * 列表
     *============================================*/
    // 项目列表
    $http.getProjectList = function (api, success) {
      this.ajax(api, {
        url: '/api/app/getUserNeed',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }


  
    // 类型列表
    $http.getTypeList = function (api, success) {
      this.ajax(api, {
        url: '/api/app/getEventType',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 事件上传
    $http.getNoticeList = function (api, data, success) {
      this.ajax(api, {
        url: '/api/app/reportEvent',
        method: 'post',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }
    //获取事件详情
    $http.getEventDetail = function (api, data, success) {
      this.ajax(api, {
        url: '',
        method: 'get',
        data: {
          body: data
        }
      }, function (res) {
        success(res)
      })
    }
    //实时上传位置

    $http.postAddress = function (api, data, success) {
      this.ajax(api, {
        url: '/api/app/updateGps',
        method: 'post',
        data: {
          body: data
        }
      },function (res) {
        success(res)
      })
    }
    //核查问题
    $http.checkEvent = function (api, data, success) {
      this.ajax(api, {
        url: '/api/app/checkEvent',
        method: 'post',
        data: {
          body: data
        }
      },function (res) {
        success(res)
      })
    }

  
    // 封装ajax请求
    $http.ajax = function (api, opts, callback, errCallback) {
      // var hideLoading = opts.hideLoading || false
      // if (!hideLoading) {
      //   var loading = weui.loading('loading');
      // }
      // 拼接url
      opts.url = HOST + opts.url;
      opts.dataType = opts.dataType ? opts.dataType : 'json';
      // 设置header
      opts.headers = {
        'content-Type': 'application/json'
      };
      var token = Cookies.get('token');
      if (token) {
        opts.headers.token = token + '%' + window.btoa(new Date().getTime())
      }
      console.log('\n请求参数：' + JSON.stringify(opts));
      // ajax请求
      api.ajax(opts, function (ret, err) {
        if (ret) {
          if (ret.code == 101) {
            // $api.rmStorage('token');
            api.toast({
              msg: '登录过期，请重新登录',
              duration: 1500,
              location: 'middle'
            });
            setTimeout(function () {
              api.closeToWin({
                name: 'login'
              })
            }, 1e3);
          } else if (ret.code == 200) {
            if (opts.url.indexOf('/missions') == -1 && opts.url.indexOf('/bpm/cases/') == -1) {
              console.log('\n返回数据：' + JSON.stringify(ret.data));
            }
            callback(ret);
          } else {
            console.log('\n报错400：' + ret.error);
            api.toast({
              msg: ret.error,
              duration: 1500,
              location: 'middle'
            });
            if (errCallback && typeof (errCallback) == 'function') {
              errCallback(err);
            }
          }
        }
        // 请求失败
        if (err) {
          console.log('\n报错：' + JSON.stringify(err))
          if (errCallback && typeof (errCallback) == 'function') {
            errCallback(err);
          } else {
            api.toast({
              msg: '请求失败，请检查网络连接',
              duration: 1500,
              location: 'middle'
            });
          }
        }
      });
    }
  
    function assign() {
      var target = arguments[0]
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var i in source) {
          target[i] = source[i]
        }
      }
      return target
    }
  
    window.$http = $http;
  })(window)