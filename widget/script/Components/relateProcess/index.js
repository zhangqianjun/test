define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    template: $g.getTemplate('Components/relateProcess/index.html'),
    props: ['list'],
    data: function () {
      return {
        flow: {}
      }
    },
    created: function () {
      this.getFlowList()
    },
    methods: {
      goPage: function (item) {
        var type = this.flow[item.flowId]
        var pages = {
          // 协商
          consult: {
            name: 'changeConsultDetail',
            url: 'Process/changeConsultDetail.html',
            pageParam: {
              id: item.id,
              type: type
            }
          },
          // 申报
          external: {
            name: 'reportDetail',
            url: 'Process/reportDetail.html',
            pageParam: {
              id: item.id,
              type: type
            }
          },
          internal: {
            name: 'reportDetail',
            url: 'Process/reportDetail.html',
            pageParam: {
              id: item.id,
              type: type
            }
          },
          // 指令单
          instructio: {
            name: 'orderDetail',
            url: 'Process/orderDetail.html',
            pageParam: {
              id: item.id,
              type: type
            }
          }
        }
        $g.openWin(pages[type])
      },
      getFlowList: function () {
        var _this = this
        $http.getFlowList(function (res) {
          _this.flow = res.flow
        })
      }
    }
  }
})