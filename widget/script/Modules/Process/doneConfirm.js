// 完工确认
define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  var text = require('../../Components/text/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var upload = require('../../Components/upload/index.js')
  var subform = require('../../Components/subform/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-input': input,
      'v-text': text,
      'v-textarea': textarea,
      'v-upload': upload,
      'v-subform': subform
    },
    data: {
      form: {
        contractName: '',
        changeContent: '',
        changeName: '',
        changeType: '',
        changeReason: '',
        majorChange: '',
        applyAmount: '',
        requestId: '',
        amount: '',
        image: [],
        file: []
      }
    },
    mounted: function () {
      var _this = this
      $http.getCompleteConfirmInfo(api.pageParam.id, function (res) {
        _this.form.contractName = res.contractContent[0].contractName
        _this.form.changeContent = res.contractContent[0].changeContent
        _this.form.applyAmount = res.contractContent[0].applyAmount

        _this.form.requestId = res.requestContent.requestId
        _this.form.changeName = res.requestContent.changeName
        _this.form.changeType = res.requestContent.changeType
        _this.form.changeReason = res.requestContent.changeReason
        _this.form.majorChange = res.requestContent.majorChange ? '是' : '否'
      })
    },
    methods: {
      submit: function () {
        var data = {
          requestId: this.form.requestId,
          amount: Number(this.form.amount).toFixed(2),
          file: this.form.file,
          image: this.form.image
        }
        $http.completeSubmit(data, function (res) {
          weui.alert('提交成功', function () {
            $g.closeToHome()
          })
        })
      }
    }
  })
})