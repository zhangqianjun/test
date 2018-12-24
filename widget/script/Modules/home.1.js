define(function (require, exports, module) {
  var list = require('../Components/list/index.js')
  var header = require('../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-list': list
    },
    data: {
      tabs: ['待办', '消息'],
      tabIndex: 0,
      lists: [{
        page: 0,
        hasMore: true,
        list: []
      }, {
        page: 0,
        hasMore: true,
        list: []
      }],
      pageSize: 20,
      todo_list: [],
      msg_list: [{
        name: '张三在《变更协商》中@了你',
        date: '11月1日',
        no: '20181101001',
      }, {
        name: '张三在《变更协商》中@了你',
        date: '11月1日',
        no: '20181101001',
      }, {
        name: '张三在《变更协商》中@了你',
        date: '11月1日',
        no: '20181101001',
      }, {
        name: '张三在《变更协商》中@了你',
        date: '11月1日',
        no: '20181101001',
      }],
      flow_list: {},
      flow: {
        consult: {
          10: 'consult',
          20: 'consultApproval'
        },
        external: 'reportCreate',
        prove: '',
        external: '',
        internal: '',
        instructas: '',
        instructio: '',
        confirm: '',
      }
    },
    mounted: function () {
      $util.NVTabBar_open();
      $g.listenBack();
      this.setRefresh()
      this.getTaskList()
      this.getFlowList()
      // this.loadMore();
      // this.scroll2bottom();
    },
    methods: {
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
        $http.getTaskList(function (res) {
          $g.forEach(res, function (v) {
            v.name = v.title
            v.no = $g.getDate(v.create_time)
          })
          _this.todo_list = res
        })
      },
      getFlowList: function () {
        var _this = this
        $http.getFlowList(function (res) {
          _this.flow_list = res.flow
        })
      },
      scroll2bottom: function () {
        var _this = this;
        $g.topLoading({
          success: function (res) {
            console.log('到底部');
            _this.loadMore();
          }
        });
      },
      loadMore: function () {
        var tabIndex = this.tabIndex
        var curPage = this.lists[tabIndex]
        if (!curPage.hasMore) {
          return
        }
        curPage.page += 1
        var data = {
          type: tabIndex + 1,
          page: curPage.page,
          limit: this.pageSize
        }
        var _this = this;
        $http.getNoticeList(data, function (res) {
          var list = res
          if (list.length < _this.pageSize) {
            curPage.hasMore = false
          }
          curPage.list = curPage.list.concat(list)
        })
      },
      tabClick: function (index) {
        this.tabIndex = index
        if (!this.lists[index].page && index == 1) {
          this.loadMore()
        }
      },
      clickTodo: function (item) {
        var _this = this
        $http.getCaseId(item.id, function (res) {
          var case_id = res.case_id
          var case_node_id = res.case_node_id
          $api.setStorage('case_id', case_id)
          $api.setStorage('case_node_id', case_node_id)
          $http.getFlowId(case_id, case_node_id, function (res) {
            var flow_id = res.caseInfo.flow_id
            var table_key = res.caseInfo.table_key
            var status = res.formData.a385_change_consult_status
            var node = _this.flow_list[flow_id]
            var type = _this.flow[node][status]
            _this.goPage(table_key, type)
          })
        })
      },
      goPage: function (id, type) {
        console.log('流程节点：' + type)
        switch (type) {
          // 协商
          case 'consult':
            $g.openWin({
              name: 'changeConsultDetail',
              url: 'Process/changeConsultDetail.html',
              pageParam: {
                id: id,
                type: type
              }
            })
            break
          // 协商审批
          case 'consultApproval':
            $g.openWin({
              name: 'changeConsultDetail',
              url: 'Process/changeConsultDetail.html',
              pageParam: {
                id: id,
                type: type
              }
            })
            break
          // 申报发起
          case 'reportCreate':
            $g.openWin({
              name: 'changeConsultDetail',
              url: 'Process/changeConsultDetail.html',
              pageParam: {
                id: id,
                type: type,
              }
            })
            break
          // 指令单发起
          case 'orderCreate':
            $g.openWin({
              name: 'reportDetail',
              url: 'Process/reportDetail.html',
              pageParam: {
                id: id
              }
            })
            break
          // 指令单审批
          case 'orderApproval':
            $g.openWin({
              name: 'orderDetail',
              url: 'Process/orderDetail.html',
              pageParam: {
                id: id,
                type: type
              }
            })
            break
          // 指令单接收
          case 'orderReceive':
            $g.openWin({
              name: 'orderDetail',
              url: 'Process/orderDetail.html',
              pageParam: {
                id: id,
                commandId: 51,
                type: type
              }
            })
            break
          // 确认完工
          case 'doneSure':
            $g.openWin({
              name: 'orderDetail',
              url: 'Process/orderDetail.html',
              pageParam: {
                id: id,
                commandId: 51,
                type: type
              }
            })
            break
          // 提交完工证明
          case 'doneCertify':
            $g.openWin({
              name: 'orderDetail',
              url: 'Process/orderDetail.html',
              pageParam: {
                id: id,
                commandId: 51,
                type: type
              }
            })
            break
          // 监理工程师复核完工证明
          case 'doneCertifyApproval':
            $g.openWin({
              name: 'doneCertifyCheck',
              url: 'Process/doneCertifyCheck.html',
              pageParam: {
                id: id,
                type: type,
                role: '监理工程师'
              }
            })
            break
          // 监理总监审批完工证明
          case 'doneCertifyApproval1':
            $g.openWin({
              name: 'doneCertifyCheck',
              url: 'Process/doneCertifyCheck.html',
              pageParam: {
                id: 17,
                type: type,
                role: '监理总监'
              }
            })
            break
          // 项目工程师复核完工证明
          case 'doneCertifyApproval2':
            $g.openWin({
              name: 'doneCertifyCheck',
              url: 'Process/doneCertifyCheck.html',
              pageParam: {
                id: 17,
                type: type,
                role: '项目工程师'
              }
            })
            break
          // 项目总监审批完工证明
          case 'doneCertifyApproval3':
            $g.openWin({
              name: 'doneCertifyCheck',
              url: 'Process/doneCertifyCheck.html',
              pageParam: {
                id: 17,
                type: type,
                role: '项目总监'
              }
            })
            break
          // 提交完工确认
          case 'doneConfirm':
            $g.openWin({
              name: 'doneDetail',
              url: 'Process/doneDetail.html',
              pageParam: {
                type: type,
                id: 17
              }
            })
            break
          default:
            break
        }
      },
      clickMsg: function () {
        $g.openWin({
          name: 'changeConsultDetail',
          url: 'Process/changeConsultDetail.html'
        })
      }
    }
  })
})