define(function (require, exports, module) {
  var list = require('../../Components/list/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-list': list
    },
    data: {
      type_list: [],
      showInput: false,
      showTypeList: false,
      list: [],
      flow_list: {},
      flow: {
        external: {
          10: 'reportCreate',
          20: 'reportCreate'
        },
        internal: {
          10: 'reportCreate',
          20: 'reportCreate'
        },
        instructio: {
          10: 'orderCreate'
        },
        prove: '',
        instructas: '',
        confirm: '',
      },
      doneFlow: {
        consult: {
          20: 'consult',
          30: 'consult',
          40: 'consult'
        },
        external: {
          20: 'consult',
        },
        prove: '',
        internal: '',
        instructas: '',
        instructio: '',
        confirm: '',
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
      },
      searchValue: ''
    },
    mounted: function () {
      this.setRefresh()
      this.getTaskList({
        status: 1
      })
      this.getFlowList()
      this.getTypeList()
    },
    methods: {
      getTypeList: function () {
        var _this = this
        $http.getTypeList(function (res) {
          _this.type_list = res
        })
      },
      setRefresh: function () {
        $g.refresh({
          success: function () {
            api.refreshHeaderLoadDone()
            location.reload()
          }
        })
      },
      getTaskList: function (data) {
        var _this = this
        $http.getTaskList(data, function (res) {
          $g.forEach(res, function (v) {
            v.name = v.title
            v.no = $g.getDate(v.create_time)
          })
          _this.list = res
        })
      },
      resetSearch: function () {
        this.showInput = false
        this.searchValue = ''
      },
      getFlowList: function () {
        var _this = this
        $http.getFlowList(function (res) {
          _this.flow_list = res.flow
        })
      },
      clickLi: function (item) {
        var _this = this
        var loading = weui.loading('loading');
        $http.getCaseId(item.id, function (res) {
          var case_id = res.case_id
          var case_node_id = res.case_node_id
          $api.setStorage('case_id', case_id)
          $api.setStorage('case_node_id', case_node_id)
          // 待办
          var mission_status = res.mission_status
          if (mission_status == 10) {
            $http.getFlowId(case_id, case_node_id, function (res) {
              loading.hide()
              var flow_id = res.caseInfo.flow_id
              // consult
              var node = _this.flow_list[flow_id]
              var status = res.formData[_this.field[node].status]
              var type = _this.flow[node][status]
              console.log('status：' + status)
              console.log('node：' + node)
              var id = res.formData[_this.field[node].id]
              _this.goPage({
                id: id,
                type: type
              })
            })
          } else {
            // 已办
            $http.getDoneFlowId(case_id, function (res) {
              loading.hide()
              var flow_id = res.caseInfo.flow_id
              // consult
              var node = _this.flow_list[flow_id]
              var status = res.formData[_this.field[node].status]
              var type = _this.doneFlow[node][status]
              console.log('status：' + status)
              console.log('node：' + node)
              var id = res.formData[_this.field[node].id]
              _this.goPage({
                id: id,
                type: type
              })
            })
          }
        })
      },
      search: function () {
        this.getTaskList({
          title: this.searchValue
        })
      },
      showInputEvent: function () {
        this.showInput = true;
        var searchInput = $api.byId('searchInput');
        searchInput.focus();
      },
      changeType: function () {
        this.showTypeList = !this.showTypeList;
        this.showInput = false;
      },
      clickType: function (mission_type) {
        this.changeType()
        this.getTaskList({
          mission_type: mission_type
        })
      },
      goNext: function () {
        $g.openWin({
          name: 'changeConsult',
          url: 'Process/changeConsult.html',
          reload: true
        })
      },
      goPage: function (item) {
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
              id: item.id
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
              commandId: item.commandId,
              type: item.type
            }
          },
          // 监理工程师复核完工证明
          doneCertifyApproval: {
            name: 'doneCertifyCheck',
            url: 'Process/doneCertifyCheck.html',
            pageParam: {
              id: item.id,
              type: item.type,
              role: '监理工程师'
            }
          },
          // 提交完工确认
          doneConfirm: {
            name: 'doneDetail',
            url: 'Process/doneDetail.html',
            pageParam: {
              id: item.id,
              type: item.type
            }
          }
        }
        $g.openWin(pages[item.type])
      }
    }
  })
})