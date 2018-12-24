(function (window) {

  var $http = {};
  /*============================================
   * 用户管理
   *============================================*/
  // 用户登录
  $http.login = function (data, success) {
    this.ajax({
      url: '/api/mobile/login',
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

  // 流程撤回
  $http.returnToStart = function (opinion, success) {
    this.ajax({
      url: '/bpm/cases/' + $api.getStorage('case_id') + '/nodes/' + $api.getStorage('case_node_id'),
      method: 'put',
      data: {
        body: {
          examine_opinion: opinion,
          examine_status: 20,
          isFlow: 1,
          rollback_direction: 10
        }
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

  /*============================================
   * 协商
   *============================================*/

  // 变更类型
  $http.getChangeType = function (success) {
    this.ajax({
      url: '/api/mobile/alter-type',
      method: 'get',
      data: {
        body: {}
      }
    }, function (res) {
      success(res);
    });
  }

  // 发起协商
  $http.createConsult = function (data, success) {
    this.ajax({
      url: '/api/mobile/consult-create',
      method: 'post',
      data: {
        body: {
          data: data
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 协商详情
  $http.getConsultInfo = function (consultId, success) {
    this.ajax({
      url: '/api/mobile/consult-info',
      method: 'get',
      data: {
        body: {
          consultId: consultId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 发表意见
  $http.createComment = function (data, success) {
    this.ajax({
      url: '/api/web/consult-express-create',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 获取可参与协商的用户列表
  $http.getConsultUserList = function (data, success) {
    this.ajax({
      url: '/api/mobile/consult-user-list',
      method: 'get',
      data: {
        body: data
      }
    }, function (res) {
      success(res);
    });
  }

  // 邀请用户参加协商
  $http.consultInvite = function (data, success) {
    this.ajax({
      url: '/api/mobile/consult-invite',
      method: 'get',
      data: {
        body: data
      }
    }, function (res) {
      success(res);
    });
  }

  // 同意变更协商
  $http.consultAgree = function (data, success) {
    this.ajax({
      url: '/api/mobile/consult-agree',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 不同意(驳回)变更协商
  $http.consultReject = function (consultId, success) {
    this.ajax({
      url: '/api/mobile/consult-reject',
      method: 'post',
      data: {
        body: {
          consultId: consultId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  /*============================================
   * 变更申报
   *============================================*/
  // 变更原因
  $http.getChangeReason = function (success) {
    this.ajax({
      url: '/api/mobile/alter-reason',
      method: 'get',
      data: {
        body: {}
      }
    }, function (res) {
      success(res);
    });
  }

  // 移动端发起变更申报
  $http.createReport = function (data, success) {
    this.ajax({
      url: '/api/mobile/alter-create',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 合同列表
  $http.getContractList = function (data, success) {
    this.ajax({
      url: '/api/mobile/contract-list',
      method: 'get',
      data: {
        body: data
      }
    }, function (res) {
      success(res);
    });
  }

  // 变更申报详情
  $http.getReportInfo = function (requestId, success) {
    this.ajax({
      url: '/api/mobile/request-detail',
      method: 'get',
      data: {
        body: {
          requestId: requestId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 发起申报的被指派人
  $http.getSenderList = function (data, success) {
    this.ajax({
      url: '/api/mobile/consult-request-user',
      method: 'get',
      data: {
        body: data
      }
    }, function (res) {
      success(res);
    });
  }
  /*============================================
   * 指令单
   *============================================*/
  // 填写指令单
  $http.createOrder = function (data, success) {
    this.ajax({
      url: '/api/mobile/instruction-create',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 获取变更申报内容
  $http.getOrderField = function (requestId, success) {
    this.ajax({
      url: '/api/mobile/request-content',
      method: 'get',
      data: {
        body: {
          requestId: requestId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 审批指令单
  $http.approvalOrder = function (data, success) {
    this.ajax({
      url: '/api/mobile/instruction-approval',
      method: 'post',
      data: {
        body: assign(data, {
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        })
      }
    }, function (res) {
      success(res);
    });
  }

  // 接收指令单
  $http.receiveOrder = function (commandId, success) {
    this.ajax({
      url: '/api/mobile/instruction-receive',
      method: 'post',
      data: {
        body: {
          commandId: commandId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 指令单详情
  $http.getOrderInfo = function (instructionId, success) {
    this.ajax({
      url: '/api/mobile/instruction-info',
      method: 'get',
      data: {
        body: {
          instructionId: instructionId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 指令单详情
  $http.getOrderInfo2 = function (commandId, success) {
    this.ajax({
      url: '/api/mobile/instruction-info2',
      method: 'post',
      data: {
        body: {
          commandId: commandId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 确认完工
  $http.completeConfirm = function (commandId, success) {
    this.ajax({
      url: '/api/mobile/complete-confirm',
      method: 'post',
      data: {
        body: assign({
          commandId: commandId
        }, {
            case_id: $api.getStorage('case_id'),
            case_node_id: $api.getStorage('case_node_id')
          })
      }
    }, function (res) {
      success(res);
    });
  }

  /*============================================
   * 完工证明
   *============================================*/
  // 变更申报与指令单相关内容
  $http.getDoneField = function (commandId, success) {
    this.ajax({
      url: '/api/mobile/complete-request-content',
      method: 'get',
      data: {
        body: {
          commandId: commandId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 提交完工证明
  $http.createDone = function (data, success) {
    this.ajax({
      url: '/api/mobile/complete-create',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 完工证明审批详情
  $http.getCompleteInfo = function (completeId, success) {
    this.ajax({
      url: '/api/mobile/complete-info',
      method: 'get',
      data: {
        body: {
          completeId: completeId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 审核完工证明
  $http.completeApproval = function (data, success) {
    this.ajax({
      url: '/api/mobile/complete-approval',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  /*============================================
  * 完工确认
  *============================================*/
  
  // 完工确认相关信息
  $http.getCompleteConfirmInfo = function (instructionId, success) {
    this.ajax({
      url: '/api/mobile/complete-confirm-info',
      method: 'get',
      data: {
        body: {
          instructionId: instructionId
        }
      }
    }, function (res) {
      success(res);
    });
  }
  
  // 完工确认详情
  $http.getCompleteConfirmDetail = function (instructionId, success) {
    this.ajax({
      url: '/api/mobile/complete-confirm-detail',
      method: 'get',
      data: {
        body: {
          instructionId: instructionId
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 提交完工确认
  $http.completeSubmit = function (data, success) {
    this.ajax({
      url: '/api/mobile/complete-submit',
      method: 'post',
      data: {
        body: {
          param: data,
          caseId: $api.getStorage('case_id'),
          nodeId: $api.getStorage('case_node_id')
        }
      }
    }, function (res) {
      success(res);
    });
  }

  // 封装ajax请求
  $http.ajax = function (opts, callback, errCallback) {
    var hideLoading = opts.hideLoading || false
    if (!hideLoading) {
      var loading = weui.loading('loading');
    }
    // 拼接url
    opts.url = 'http://test-hyn-mobile.buildingqm.com' + opts.url;
    // opts.url = 'http://a385api.wkuai.cc' + opts.url;
    opts.dataType = opts.dataType ? opts.dataType : 'json';
    // 设置header
    opts.headers = {
      'content-Type': 'application/json'
    };
    var token = $api.getStorage('token');
    if (token) {
      opts.headers.token = token + '%' + window.btoa(new Date().getTime())
    }
    console.log('\n请求参数：' + JSON.stringify(opts));
    // ajax请求
    api.ajax(opts, function (ret, err) {
      if (!hideLoading) {
        loading.hide();
      }
      if (ret) {
        if (ret.code == 101) {
          $api.rmStorage('token');
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