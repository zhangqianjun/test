define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var statusBar = require('../../Components/status/index.js')
  var info = require('../../Components/info/index.js')
  var formInfo = require('../../Components/formInfo/index.js')
  var relateProcess = require('../../Components/relateProcess/index.js')

  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-info': info,
      'v-status-bar': statusBar,
      'v-form-info': formInfo,
      'v-relate-process': relateProcess
    },
    data: {
      // confirm 完工确认
      // certify 完工证明
      // order   变更指令
      typeList: {
        confirm: 'doneConfirm',
        certify: 'doneCertify',
        order: 'order'
      },
      type: '',
      statusInfo: {
        title: '工程指令单',
        name: '张三',
        date: '2018年11月1日',
        status: '已审核'
      },
      detail: {
        title: '表单信息',
        list: [{
          label: '项目名称',
          value: 'XXXX整改项目合同'
        }, {
          label: '项目编号',
          value: 'HYNXXXX001'
        }, {
          label: '协商主题',
          value: '外观设计变更',
        }, {
          label: '变更类型',
          value: '工程变更',
        }, {
          label: '详细内容',
          value: '因主题商铺施工过程产生大量土方和建筑垃圾，为避免影响贵公司后期施工进度，申请清理',
        }, {
          label: '附件',
          img_list: ['http://module.apicloud.com/icon/1422538036856_mam.png', 'http://module.apicloud.com/icon/1422538036856_mam.png', 'http://module.apicloud.com/icon/1422538036856_mam.png', 'http://module.apicloud.com/icon/1422538036856_mam.png', 'http://module.apicloud.com/icon/1422538036856_mam.png', 'http://module.apicloud.com/icon/1422538036856_mam.png']
        }]
      }
    },
    created: function () {
      // 页面类型通过传参实现
      if (!api.pageParam.type) {
        $g.toastMsg('请传入正确的流程类型')
        return
      }
      this.type = api.pageParam.type
    },
    methods: {
      // 跳转到对应的流程编辑页面
      submit: function () {
        if (this.type == this.typeList.certify) {
          // 完工证明
          $g.openWin({
            name: 'doneCertify',
            url: 'Process/doneCertify.html',
            pageParam: {
              flowId: '',
              type: 'edit'
            }
          })
        } else if (this.type == this.typeList.confirm) {
          // 完工确认
          $g.openWin({
            name: 'doneConfirm',
            url: 'Process/doneConfirm.html',
            pageParam: {
              flowId: ''
            }
          })
        }
      }
    }
  })
})