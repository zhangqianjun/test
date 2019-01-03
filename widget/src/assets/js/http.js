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
    $http.getUserInfo = function (success) {
      this.ajax({
        url: '/api/mobile/user-info',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 修改密码
    $http.resetPwd = function (data, success) {
      this.ajax({
        url: '/api/mobile/reset-pwd',
        method: 'post',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 退出登录
    $http.logout = function (success) {
      this.ajax({
        url: '/api/mobile/logout',
        method: 'post',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
  
  
    // 上传签名图片
    $http.uploadSign = function (imageUrl, success) {
      this.ajax({
        url: '/api/mobile/upload-sign',
        method: 'post',
        data: {
          body: {
            imageUrl: imageUrl
          }
        }
      }, function (res) {
        success(res);
      });
    }
  
    /*============================================
     * 列表
     *============================================*/
    // 项目列表
    $http.getProjectList = function (data, success) {
      this.ajax({
        url: '/api/mobile/project',
        method: 'get',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 待办列表和全部列表
    $http.getTaskList = function (data, success) {
      this.ajax({
        url: '/missions',
        method: 'get',
        data: {
          body: {
            mission_type: data.mission_type || '',
            title: data.title || '',
            status: data.status || 1
          }
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 获取case_id
    $http.getCaseId = function (id, success, error) {
      this.ajax({
        url: '/missions/' + id,
        method: 'get',
        data: {
          body: {}
        },
        hideLoading: true
      }, function (res) {
        success(res);
      }, function () {
        error()
      });
    }
  
    // 获取待办流程id
    $http.getFlowId = function (case_id, case_node_id, success, error) {
      this.ajax({
        url: '/bpm/cases/' + case_id + '/nodes/' + case_node_id,
        method: 'get',
        data: {
          body: {}
        },
        hideLoading: true
      }, function (res) {
        success(res);
      }, function () {
        error()
      });
    }
  
    // 获取已办流程id
    $http.getDoneFlowId = function (case_id, success, error) {
      this.ajax({
        url: '/bpm/flowCases/' + case_id + '/catch',
        method: 'get',
        data: {
          body: {}
        },
        hideLoading: true
      }, function (res) {
        success(res);
      }, function () {
        error()
      });
    }
  
    // 待办类型列表
    $http.getTypeList = function (success) {
      this.ajax({
        url: '/mission/category/?data_type=1',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 流程列表
    $http.getFlowList = function (success) {
      this.ajax({
        url: '/api/mobile/mission-flow',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
  
    // 通知列表
    $http.getNoticeList = function (data, success) {
      this.ajax({
        url: '/api/mobile/notice',
        method: 'get',
        data: {
          body: data
        }
      }, function (res) {
        success(res);
      });
    }

  
    // 消息列表
    $http.getMsgList = function (success) {
      this.ajax({
        url: '/msg/center?date_range[]=&keywords=&status=0',
        method: 'get',
        data: {
          body: {}
        }
      }, function (res) {
        success(res);
      });
    }
    // 封装ajax请求
    $http.ajax = function (api, opts, callback, errCallback) {
      // var hideLoading = opts.hideLoading || false
      // if (!hideLoading) {
      //   var loading = weui.loading('loading');
      // }
      // 拼接url
      opts.url = HOST + opts.url;
      console.log(opts)
      opts.dataType = opts.dataType ? opts.dataType : 'json';
      // 设置header
      opts.headers = {
        'content-Type': 'application/json'
      };
      // var token = $api.getStorage('token');
      // if (token) {
      //   opts.headers.token = token + '%' + window.btoa(new Date().getTime())
      // }
      console.log('\n请求参数：' + JSON.stringify(opts));
      // ajax请求
      api.ajax(opts, function (ret, err) {
        if (ret) {
          console.log(ret)
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
            callback(ret.data);
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