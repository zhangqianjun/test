define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  var text = require('../../Components/text/index.js')
  var select = require('../../Components/select/index.js')
  var select1 = require('../../Components/select1/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var upload = require('../../Components/upload/index.js')
  var date = require('../../Components/date/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-input': input,
      'v-text': text,
      'v-select': select,
      'v-select1': select1,
      'v-textarea': textarea,
      'v-upload': upload,
      'v-date': date
    },
    data: {
      changeReason_list: [],
      majorChange_list: [{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }],
      preChange_list: [{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }],
      contractDetail: [{
        contractName: '',
        contractNo: '',
        applyAmount: '',
        changeContent: ''
      }],
      changeType_list: [],
      changeType: {
        1: '工程指令',
        2: '设计变更'
      },
      form: {
        consultId: api.pageParam.id,
        changeName: '',
        changeType: api.pageParam.changeType,
        changeReason: '',
        majorChange: '',
        implementationDate: '',
        file: [],
        image: []
      }
    },
    mounted: function () {
      this.addEvent()
      // this.getChangeType()
      this.getChangeReason()
    },
    methods: {
      getChangeType: function () {
        var _this = this;
        $http.getChangeType(function (res) {
          var list = []
          var obj = res.type
          for (var k in obj) {
            list.push({
              label: obj[k],
              value: k
            })
          }
          _this.changeType_list = list
        })
      },
      getChangeReason: function () {
        var _this = this;
        $http.getChangeReason(function (res) {
          var list = []
          var obj = res.reason
          for (var k in obj) {
            list.push({
              label: obj[k],
              value: k
            })
          }
          _this.changeReason_list = list
        })
      },
      addEvent: function () {
        var _this = this;
        api.addEventListener({
          name: 'selectContract'
        }, function (ret, err) {
          _this.contractDetail[0].contractName = ret.value.contractName
          _this.contractDetail[0].contractNo = ret.value.contractNo
        });
      },
      submit: function () {
        $g.log(this.form)
        if (this.validateForm()) {
          var data = $g.cloneDeep(this.form);
          data.contractDetail = $g.cloneDeep(this.contractDetail);
          $g.forEach(data.contractDetail, function (v) {
            v.applyAmount = Number(v.applyAmount).toFixed(2)
          })
          $http.createReport(data, function (res) {
            weui.alert('您的变更申报已提交', function () {
              $g.closeToHome()
            })
          })
        }
      },
      validateForm: function () {
        if (!this.contractDetail[0].contractName) {
          $g.toastMsg('请选择合同');
          return false
        }
        if (!this.contractDetail[0].applyAmount || !this.contractDetail[0].changeContent || !this.form.changeName) {
          $g.toastMsg('内容不能为空');
          return false
        }
        if (!this.form.implementationDate) {
          $g.toastMsg('请选择实施日期');
          return false
        }
        return true
      },
      selectContract: function () {
        $g.openWin({
          name: 'search_list',
          url: 'Process/search_list.html',
          pageParam: {
            pagename: 'contract'
          }
        })
      }
    }
  })
})