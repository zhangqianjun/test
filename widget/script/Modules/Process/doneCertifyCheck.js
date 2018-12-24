define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  var text = require('../../Components/text/index.js')
  var select = require('../../Components/select/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var upload = require('../../Components/upload/index.js')
  var info = require('../../Components/info/index.js')
  var subform = require('../../Components/subform/index.js')
  var attach = require('../../Components/attach/index.js')
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
      'v-subform': subform,
      'v-attach': attach,
    },
    data: {
      info: {
        number: '',
        contractName: '',
        contractNo: '',
        supplierName: '',
        completion: '',
        amount: '',
        image: [],
        file: [],
        doc: [],
        detail: []
      },
      status: {
        doneCertifyApproval: 20,
        doneCertifyApproval1: 30,
        doneCertifyApproval2: 40,
        doneCertifyApproval3: 50
      },
      childForm: [[
        {
          type: 'input',
          label: '项目',
          value: '',
          disabled: true
        },
        {
          type: 'number',
          label: '工程量',
          value: '',
          disabled: true
        },
        // {
        //   type: 'unit',
        //   label: '单位',
        //   value: '',
        //   disabled: true
        // },
        {
          type: 'number',
          label: '单价（元）',
          value: '',
          disabled: true
        },
        {
          type: 'text',
          label: '总价',
          value: ''
        },
        {
          type: 'check',
          label: '监理审核工程量',
          value: ''
        }
      ]],
      form: {
        opinion: '同意',
        image: [],
        file: []
      },
      minlength: 1,
      maxlength: 99,
      param: api.pageParam
    },
    mounted: function () {
      this.getCompleteInfo()
      if (api.pageParam.type == 'done') {
        // this.maxlength = 0
        // this.childForm[0][4].disabled = true
      }
    },
    methods: {
      getCompleteInfo: function () {
        var _this = this
        $http.getCompleteInfo(api.pageParam.id, function (res) {
          _this.info.number = res.info.number
          _this.info.contractName = res.info.contractName
          _this.info.contractNo = res.info.contractNo
          _this.info.supplierName = res.info.supplierName
          _this.info.amount = res.info.total
          _this.info.completion = res.info.completion
          _this.info.file = res.info.file
          _this.info.image = res.info.image
          _this.info.doc = res.info.doc
          _this.info.detail = res.detail
          // 工程量明细
          // res.detail = []
          _this.minlength = res.detail.length

          var status = _this.status[api.pageParam.type]
          var form = _this.childForm[0]
          _this.childForm = []
          $g.forEach(res.detail, function (v) {
            form[0].value = v.project
            form[1].value = v.engineeringQuantity
            form[2].value = v.price
            form[3].value = v.total
            _this.childForm.push($g.cloneDeep(form))
          })
          // 监理总监
          if (status == 30) {
            _this.maxlength = res.detail.length
            $g.forEach(_this.childForm, function (v, i) {
              v[4].disabled = true
              v[4].value = res.detail[i].reviewEngineeringQuantity || '无'
            })
          } else if (status == 40) {
            // 项目部工程师
            $g.forEach(_this.childForm, function (v, i) {
              v[4].disabled = true
              v[4].value = res.detail[i].reviewEngineeringQuantity || '无'
              v.push({
                type: 'check',
                label: '项目部审核工程量',
                value: '',
                disabled: api.pageParam.type == 'done'
              })
            })
          } else if (status == 50) {
            // 项目部总监
            _this.maxlength = res.detail.length
            $g.forEach(_this.childForm, function (v, i) {
              v[4].disabled = true
              v[4].value = res.detail[i].reviewEngineeringQuantity || '无'
              v.push({
                type: 'check',
                label: '项目部审核工程量',
                value: res.detail[i].reviewProjectQuantity || '无',
                disabled: true
              })
            })
          }
        })
      },
      validateForm: function () {
        if (!this.form.opinion) {
          $g.toastMsg('请填写意见');
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
        var _this = this
        var quantities = []
        $g.forEach(this.childForm, function (v, i) {
          if (v[0].disabled) {
            quantities.push({
              quantityId: _this.info.detail[i].quantityId,
              reviewEngineeringQuantity: v[4].value,
              reviewProjectQuantity: v[5] ? v[5].value : '',
              project: v[0].value,
              engineeringQuantity: v[1].value,
              price: v[2].value,
              total: v[3].value,
            })
          } else {
            quantities.push({
              quantityId: 0,
              reviewEngineeringQuantity: '',
              reviewProjectQuantity: '',
              project: v[0].value,
              engineeringQuantity: v[1].value,
              price: v[2].value,
              total: v[3].value
            })
          }
        })
        var data = {
          completeId: api.pageParam.id,
          content: this.form.opinion,
          file: [],
          image: [],
          status: this.status[api.pageParam.type],
          quantities: quantities
        }
        $g.log(data)
        $http.completeApproval(data, function (res) {
          weui.alert('提交成功', function () {
            $g.closeToHome()
          })
        })
      },
      agree: function () {
        var data = {
          completeId: api.pageParam.id,
          content: this.form.opinion,
          file: this.form.file,
          image: this.form.image,
          status: this.status[api.pageParam.type],
          quantities: this.info.detail
        }
        $http.completeApproval(data, function () {
          weui.alert('已同意', function () {
            $g.closeToHome()
          })
        })
      },
      disagree: function () {
        $http.returnToStart(this.form.opinion, function () {
          weui.alert('驳回成功', function () {
            $g.closeToHome()
          })
        })
      },
      blur: function (index) {
        var total = this.childForm[index][1].value * this.childForm[index][2].value
        this.childForm[index][3].value = Number(total).toFixed(2)
      }
    }
  })
})