define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var status = require('../../Components/status/index.js')
  var formInfo = require('../../Components/formInfo/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-status': status,
      'v-forminfo': formInfo,
    },
    data: {
      info: {
        title: '变更申报',
        name: '',
        date: '',
        status: '',
        type: 'report'
      },
      detailForm: {
        title: '变更明细',
        list: [{
          label: '合同名称',
          value: ''
        }, {
          label: '申报金额',
          value: ''
        }, {
          label: '变更内容',
          value: ''
        }]
      },
      form: {
        title: '表单信息',
        list: [{
          label: '变更名称',
          value: '',
        }, {
          label: '变更类型',
          value: '',
        }, {
          label: '变更原因',
          value: '',
        }, {
          label: '是否重大变更',
          value: '',
        },{
          label: '实施日期',
          value: '',
        }, {
          label: '附件',
          imagelist: [],
          filelist: [],
        }]
      },
      param: api.pageParam
    },
    mounted: function () {
      var _this = this;
      $http.getReportInfo(this.param.id, function (res) {
        _this.info.name = res.realname
        _this.info.date = res.applyDate
        _this.info.status = res.status
        // 变更明细
        if (res.detail[0]) {
          _this.detailForm.list[0].value = res.detail[0].contractName
          _this.detailForm.list[1].value = res.detail[0].amount
          _this.detailForm.list[2].value = res.detail[0].content
        }
        // 表单信息
        // _this.form.list[0].value = res.contractName
        // _this.form.list[1].value = res.amount
        // _this.form.list[2].value = res.content
        _this.form.list[0].value = res.changeName
        _this.form.list[1].value = res.changeType
        _this.form.list[2].value = res.changeReason
        _this.form.list[3].value = res.majorChange ? '是' : '否'
        _this.form.list[4].value = $g.getDate(res.implementationDate)
        _this.form.list[5].imagelist = res.image
        _this.form.list[5].filelist = res.file
      })
    },
    methods: {
      tabClick: function (index) {
        this.tabIndex = index
      },
      goNext: function () {
        $g.openWin({
          name: 'consult',
          url: 'Process/consult.html'
        })
      },
      writeOrder: function () {
        $g.openWin({
          name: 'order',
          url: 'Process/order.html',
          pageParam: api.pageParam
        })
      }
    }
  })
})