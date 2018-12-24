define(function (require, exports, module) {
  var list = require('../../Components/list/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-list': list
    },
    data: {
      list: [],
      flow_list: {},
      flow: {
        // 协商
        consult: {
          10: 'consult',
          20: 'consultApproval',
          30: 'reportCreate',
          40: 'consult'
        },
        // 外部申报
        external: {
          10: 'reportCreate',
          20: 'reportCreate',
          30: 'reportCreate'
        },
        // 内部申报
        internal: {
          10: 'reportCreate',
          20: 'reportCreate',
          30: 'reportCreate'
        },
        // 填写指令单
        instructio: {
          10: 'orderCreate',
          20: 'orderApproval'
        },
        prove: {
          10: 'doneCertify',
          20: 'doneCertifyApproval',
          30: 'doneCertifyApproval1',
          40: 'doneCertifyApproval2',
          50: 'doneCertifyApproval3'
        },
        confirm: {
          10: 'doneConfirm'
        },
      },
      field: {
        consult: {
          id: 'a385_change_consult_self_define_1',
          status: 'a385_change_consult_status'
        },
        external: {
          id: 'a385_change_request_consult_id',
          status: 'a385_change_request_status'
        },
        internal: {
          id: 'a385_change_request_consult_id',
          status: 'a385_change_request_status'
        },
        instructio: {
          id: 'a385_instruction_list_key_declare_change_name',
          status: 'a385_instruction_list_status'
        },
        prove: {
          id: 'a385_complete_certify_command',
          status: 'a385_complete_certify_status'
        },
        confirm: {
          id: 'a385_complete_confirm_instruction',
          status: 'a385_complete_confirm_status'
        }
      },
    },
    mounted: function () {
      this.setRefresh()
      this.getTaskList()
      this.getFlowList()
    },
    methods: {
      clickTodo: function (item,index) {
        $g.setReadList(item)
        this.list[index].read = true
        var _this = this
        var loading = weui.loading('loading');
        $http.getCaseId(item.id, function (res) {
          var case_id = res.case_id
          var case_node_id = res.case_node_id
          $api.setStorage('case_id', case_id)
          $api.setStorage('case_node_id', case_node_id)

          $http.getFlowId(case_id, case_node_id, function (res) {
            loading.hide()
            var table_key = res.caseInfo.table_key
            $api.setStorage('table_key', table_key)
            var flow_id = res.caseInfo.flow_id
            // consult
            var node = _this.flow_list[flow_id]
            var status = ''
            var type = ''
            var id = ''
            var commandId = ''
            // 接收指令单
            if (node == 'instructas') {
              id = res.formData.a385_command_instruction
              commandId = table_key
              var command_received = res.formData.a385_command_received
              if (command_received == 10) {
                type = 'orderReceive'
              } else if (command_received == 20) {
                type = 'doneSure'
              }
            } else {
              id = res.formData[_this.field[node].id]
              status = res.formData[_this.field[node].status]
              type = _this.flow[node][status]
            }
            console.log('node：' + node)
            console.log('status：' + status)
            // 填写指令单
            if (node == 'instructio' && status == 20) {
              id = table_key
            }
            // 完工证明复核
            if (node == 'prove' && status > 10) {
              id = table_key
            }
            // 跳转到下一页
            _this.goPage({
              id: id,
              type: type,
              commandId: commandId
            })
          }, function () {
            loading.hide()
          })

        }, function () {
          loading.hide()
        })
      },
      goPage: function (item) {
        $api.setStorage('homeUrl', 'home.html')
        console.log('流程节点：' + item.type)
        var pages = {
          // 协商
          consult: {
            name: 'changeConsultDetail',
            url: 'Process/changeConsultDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 协商审批
          consultApproval: {
            name: 'changeConsultDetail',
            url: 'Process/changeConsultDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 申报发起
          reportCreate: {
            name: 'changeConsultDetail',
            url: 'Process/changeConsultDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 指令单发起
          orderCreate: {
            name: 'reportDetail',
            url: 'Process/reportDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 指令单审批
          orderApproval: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 指令单接收
          orderReceive: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              commandId: item.commandId,
              type: item.type
            }
          },
          // 确认完工
          doneSure: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              commandId: item.commandId,
              type: item.type
            }
          },
          // 提交完工证明
          doneCertify: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 监理工程师复核完工证明
          doneCertifyApproval: {
            name: 'doneCertifyCheck',
            url: 'Process/doneCertifyCheck.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 监理总监审批
          doneCertifyApproval1: {
            name: 'doneCertifyCheck',
            url: 'Process/doneCertifyCheck.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 项目工程师复核完工证明
          doneCertifyApproval2: {
            name: 'doneCertifyCheck',
            url: 'Process/doneCertifyCheck.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 项目总监审批
          doneCertifyApproval3: {
            name: 'doneCertifyCheck',
            url: 'Process/doneCertifyCheck.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          },
          // 提交完工确认
          doneConfirm: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          }
        }
        $g.openWin(pages[item.type])
      },
      setRefresh: function () {
        $g.refresh({
          success: function () {
            api.refreshHeaderLoadDone()
            location.reload()
          }
        })
      },
      getTaskList: function () {
        var _this = this
        var data = {
          status: 10
        }
        $http.getTaskList(data, function (res) {
          var count = 0
          var read_list = $api.getStorage('read_list') || []
          $g.forEach(res, function (v) {
            v.name = v.title
            v.no = $g.getSecond(v.create_time)
            v.read = false
            $g.forEach(read_list, function (v1) {
              if (v1 == v.id) {
                v.read = true
              }
            })
            if (v.status == 10) {
              count++
            }
          })
          _this.list = res
          api.sendEvent({
            name: 'todoCount',
            extra: count
          })
        })
      },
      getFlowList: function () {
        var _this = this
        $http.getFlowList(function (res) {
          _this.flow_list = res.flow
        })
      }
    }
  })
})