define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var status = require('../../Components/status/index.js')
  var formInfo = require('../../Components/formInfo/index.js')
  var relateProcess = require('../../Components/relateProcess/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-status': status,
      'v-forminfo': formInfo,
      'v-relate-process': relateProcess
    },
    data: {
      flow_list: [],
      info: {
        title: '指令单',
        name: '',
        date: '',
        status: '',
        type: 'order'
      },
      issuedForm: {
        title: '指令下发对象',
        list: [{
          label: '合同名称',
          value: '',
        }, {
          label: '施工单位',
          value: '',
        }, {
          label: '指令内容',
          value: '',
        }]
      },
      form: {
        title: '表单信息',
        list: [{
          label: '申报变更单号',
          value: ''
        }, {
          label: '申报变更名称',
          value: ''
        }, {
          label: '费用承担单位',
          value: '',
        }, {
          label: '费用归属',
          value: '',
          type: 'fee_belong'
        }, {
          label: '变更影响',
          value: '',
          type: 'change_effect'
        }, {
          label: '洽商类型',
          value: '',
          type: 'discuss'
        }, {
          label: '附件',
          image: [],
          file: []
        }]
      },
      param: {}
    },
    mounted: function () {
      this.param = api.pageParam
      var _this = this
      if (this.param.type == 'doneCertify') {
        $http.getOrderInfo2(api.pageParam.id, function (res) {
          _this.setInfo(res)
          _this.info.deadline = $g.getTime(Number(res.command[0].confirmCompleteTime) + 60 * 60 * 24 * 10)
        })
      } else {
        $http.getOrderInfo(api.pageParam.id, function (res) {
          _this.setInfo(res)
        })
      }
    },
    methods: {
      setInfo: function (res) {
        this.info.name = res.info.realname
        this.info.date = res.info.createTime
        this.info.status = res.info.status

        // 关联流程
        this.flow_list = res.flow
        // 指令下发对象
        this.issuedForm.list[0].value = res.command[0].contractName
        this.issuedForm.list[1].value = res.command[0].supplierName
        this.issuedForm.list[2].value = res.command[0].content
        // 表单信息
        this.form.list[0].value = res.info.changeNo
        this.form.list[1].value = res.info.changeName
        this.form.list[2].value = res.info.costUnit
        this.form.list[3].value = res.info.costAttr
        this.form.list[4].value = res.info.changeImpact
        this.form.list[5].value = res.info.negotiationCategory
        this.form.list[6].image = res.info.image
        this.form.list[6].file = res.info.file
      },
      agree: function () {
        weui.confirm('是否将指令单下发给施工单位', function () {
          var data = {
            instructionId: api.pageParam.id,
            status: '30'
          }
          $http.approvalOrder(data, function () {
            setTimeout(function () {
              weui.alert('已成功将指令单下发给施工单位！', function () {
                $g.closeToHome()
              });
            }, 300);
          });
        });
      },
      disagree: function () {
        var data = {
          instructionId: api.pageParam.id,
          status: '40'
        }
        $http.approvalOrder(data, function () {
          weui.alert('已驳回该指令单', function () {
            $g.closeToHome()
          })
        })
      },
      receiveOrder: function () {
        weui.alert('完工施工后，请及时在系统确认完工', function () {
          $http.receiveOrder(api.pageParam.commandId, function () {
            $g.openWin({
              name: 'home',
              url: $api.getStorage('homeUrl')
            })
          })
        }, {
            title: '已接收指令单'
          });
      },
      finishWork: function () {
        weui.confirm('确认完工后，需要在10个工作日内提交完工证明；若超过时间，完工证明申报入口将关闭，本次产生的费用将不予结算！', function () {
          $http.completeConfirm(api.pageParam.commandId, function () {
            setTimeout(function () {
              weui.alert('确认完工后，需要在10个工作日内提交完工证明；若超过时间，完工证明申报入口将关闭，本次产生的费用将不予结算！', function () {
                $g.openWin({
                  name: 'home',
                  url: $api.getStorage('homeUrl')
                })
              }, { title: '你已确认完工' });
            }, 300)
          })
        }, {
            title: '是否确认完工？'
          });
      },
      submitDone: function () {
        $g.openWin({
          name: 'doneCertify',
          url: 'Process/doneCertify.html',
          pageParam: api.pageParam
        })
      },
      submitConfirm: function () {
        $g.openWin({
          name: 'doneConfirm',
          url: 'Process/doneConfirm.html',
          pageParam: api.pageParam
        })
      },
    }
  })
})