define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
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
      'v-select': select,
      'v-textarea': textarea,
      'v-upload': upload,
      'v-info': info,
      'v-subform': subform,
    },
    data: {
      filelist: [],
      imagelist: [],
      change_list: [
        { label: '申报变更单号', value: '' },
        { label: '申报变更名称', value: '' },
      ],
      childForm: [[
        {
          type: 'text',
          label: '合同名称',
          value: '',
        },
        {
          type: 'text',
          label: '施工单位',
          value: ''
        },
        {
          type: 'input',
          label: '指令内容',
          value: ''
        }
      ]],
      company: '',
      fee_belong: '',
      fee_belong_list: [{
        label: '工程费用',
        value: 1
      }, {
        label: '开发费用',
        value: 2
      }, {
        label: '设计费用',
        value: 3
      }, {
        label: '营销费用',
        value: 4
      }, {
        label: '其他',
        value: 5
      }],
      change_effect: '',
      change_effect_list: [{
        label: '本指令不涉及增减工程费用',
        value: 1
      }, {
        label: '本指令不涉及增减工程工期',
        value: 2
      }, {
        label: '本指令涉及扣款（请提供详情）',
        value: 3
      }, {
        label: '本指令属改善工程工作',
        value: 4
      }],
      discuss: '',
      discuss_list: [{
        label: '技术洽商',
        value: 1
      }, {
        label: '经济洽商',
        value: 2
      }],
      contract: {}
    },
    mounted: function () {
      this.addEvent()
      this.getInfo()
    },
    methods: {
      getInfo: function () {
        var _this = this;
        $http.getOrderField(api.pageParam.id, function (res) {
          _this.change_list[0].value = res.change.changeNo
          _this.change_list[1].value = res.change.changeName
          _this.contract = res.contract[0]
          _this.childForm[0][0].value = _this.contract.name
          _this.childForm[0][1].value = _this.contract.supplierName
        })
      },
      addForm: function () {
        this.childForm[this.childForm.length - 1][0].value = this.contract.name
        this.childForm[this.childForm.length - 1][1].value = this.contract.supplierName
      },
      addEvent: function () {
        api.removeEventListener({
          name: 'selectCompany'
        });
        var _this = this;
        api.addEventListener({
          name: 'selectCompany'
        }, function (ret, err) {
          $g.log(ret)
          var data = ret.value
          _this.childForm[data.index][1].value = data.value.name
        });
      },
      submit: function () {
        if (!this.validateForm()) {
          return
        }
        var _this = this;
        var instructionObject = []
        $g.forEach(this.childForm, function (v) {
          instructionObject.push({
            contractId: _this.contract.id,
            unit: _this.contract.supplierId,
            content: v[2].value
          })
        })
        var data = {
          instructionObject: instructionObject,
          requestId: api.pageParam.id,
          requestNo: _this.change_list[0].value,
          costUnit: _this.company,
          costAttr: _this.fee_belong,
          changeImpact: _this.change_effect,
          negotiationCategory: _this.discuss,
          file: _this.filelist,
          image: _this.imagelist,
          instructionId: $api.getStorage('table_key')
        }
        weui.confirm('提交后，指令单将发给项目部项目负责人下发操作', function () {
          $http.createOrder(data, function (res) {
            setTimeout(function () {
              _this.alert()
            }, 300);
          })
        }, {
            title: '是否提交指令单'
          });
      },
      alert: function () {
        weui.alert('提交后，指令单将发给项目部项目负责人下发操作', function () {
          $g.closeToHome()
        }, { title: '指令单提交成功' });
      },
      validateForm: function () {
        var bool = true
        $g.forEach(this.childForm, function (v) {
          $g.forEach(v, function (v1) {
            if (!v1.value) {
              bool = false
            }
          })
        })
        if (!bool) {
          $g.toastMsg('请填写完整指令下发对象');
          return false
        }
        if (!this.company) {
          $g.toastMsg('请填写费用承担单位');
          return false
        }
        return true
      }
    }
  })
})