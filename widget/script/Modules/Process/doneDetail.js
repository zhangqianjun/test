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
      info: {
        title: '完工证明',
        name: '',
        date: '',
        status: '',
        type: 'done'
      },
      flow_list: [],
      subForm: {
        title: '工程量明细',
        list: [{
          label: '项目',
          value: '',
        }, {
          label: '工程量',
          value: '',
        }, {
          label: '单价（元）',
          value: '',
        }, {
          label: '总价',
          value: '',
        }]
      },
      form: {
        title: '表单信息',
        list: [{
          label: '指令单编号',
          value: ''
        }, {
          label: '合同名称',
          value: ''
        }, {
          label: '合同编号',
          value: '',
        }, {
          label: '施工单位名称',
          value: '',
        }, {
          label: '施工单位申报总额',
          value: '',
        }, {
          label: '变更完成情况',
          value: '',
        }, {
          label: '附件',
          imagelist: [],
          filelist: [],
        }]
      },
      param: {}
    },
    mounted: function () {
      this.param = api.pageParam
      var _this = this
      $http.getCompleteDetail(api.pageParam.id, function (res) {
        _this.info.name = res.info.realname
        _this.info.date = res.info.createTime
        _this.info.status = res.info.status
        // 关联流程
        _this.flow_list = res.flow
        // 工程量明细
        _this.subForm.list[0].value = res.detail[0].project
        _this.subForm.list[1].value = res.detail[0].engineeringQuantity
        _this.subForm.list[2].value = res.detail[0].price
        _this.subForm.list[3].value = res.detail[0].total
        // 表单信息
        _this.form.list[0].value = res.info.number
        _this.form.list[1].value = res.info.contractName
        _this.form.list[2].value = res.info.contractNo
        _this.form.list[3].value = res.info.supplierName
        _this.form.list[4].value = res.info.total
        _this.form.list[5].value = res.info.completion
        _this.form.list[6].imagelist = res.info.image
        _this.form.list[6].filelist = res.info.file
      })
    },
    methods: {
      submitConfirm: function () {
        $g.openWin({
          name: 'doneConfirm',
          url: 'Process/doneConfirm.html'
        })
      }
    }
  })
})