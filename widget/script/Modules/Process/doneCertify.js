define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  var text = require('../../Components/text/index.js')
  var select = require('../../Components/select/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var upload = require('../../Components/upload/index.js')
  var info = require('../../Components/info/index.js')
  var subform = require('../../Components/subform/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-input': input,
      'v-text': text,
      'v-select': select,
      'v-textarea': textarea,
      'v-upload': upload,
      'v-info': info,
      'v-subform': subform
    },
    data: {
      isEdit: true,
      certifyDetail: {
        number: '',
        contractName: '',
        contractNo: '',
        supplierName: '',
        amount: 0
      },
      childForm: [[
        {
          type: 'input',
          label: '项目',
          value: ''
        },
        {
          type: 'number',
          label: '工程量',
          value: ''
        },
        {
          type: 'number',
          label: '单价（元）',
          value: ''
        },
        {
          type: 'text',
          label: '总价',
          value: ''
        }
      ]],
      form: {
        content: '',
        image: [],
        file: []
      },
      param: api.pageParam
    },
    mounted: function () {
      this.getDoneField()
    },
    methods: {
      getDoneField: function () {
        var _this = this
        $http.getDoneField(api.pageParam.id, function (res) {
          _this.certifyDetail.number = res.number
          _this.certifyDetail.contractName = res.contractName
          _this.certifyDetail.contractNo = res.contractNo
          _this.certifyDetail.supplierName = res.supplierName
        })
      },
      validateForm: function () {
        if (!this.form.content) {
          $g.toastMsg('请填写变更完成情况');
          return false
        }
        var bool = true
        $g.forEach(this.childForm, function (v) {
          var count = 0
          $g.forEach(v, function (v1) {
            if (v1.value) {
              count += 1
            }
          })
          if (count > 0 && count < 4) {
            bool = false
          }
        })
        if (!bool) {
          $g.toastMsg('请填写完整的工程量明细');
          return false
        }
        return true
      },
      submit: function () {
        if (!this.validateForm()) {
          return
        }
        var quantity = []
        $g.forEach(this.childForm, function (v) {
          if (v[0].value) {
            quantity.push({
              project: v[0].value,
              engineeringQuantity: v[1].value,
              price: v[2].value,
              total: v[3].value
            })
          }
        })
        var data = {
          quantity: quantity,
          commandId: api.pageParam.id,
          amount: this.certifyDetail.amount,
          completion: this.form.content,
          image: this.form.image,
          file: this.form.file,
          completeId: $api.getStorage('table_key')
        }
        $g.log(data)
        $http.createDone(data, function (res) {
          weui.alert('提交成功', function () {
            $g.closeToHome()
          })
        })
      },
      // submit: function () {
      //   if (this.isEdit) {
      //     $g.toastMsg('提交成功')
      //     setTimeout(function () {
      //       $g.closeToHome()
      //     }, 1000)
      //   } else {
      //     $g.openWin({
      //       name: 'doneCertifyCheck',
      //       url: 'Process/doneCertifyCheck.html'
      //     })
      //   }
      // },
      blur: function (index) {
        var total = this.childForm[index][1].value * this.childForm[index][2].value
        this.childForm[index][3].value = Number(total).toFixed(2)
        var _this = this;
        _this.certifyDetail.amount = 0
        $g.forEach(this.childForm, function (v) {
          _this.certifyDetail.amount += Number(v[3].value)
        })
      }
    }
  })
})