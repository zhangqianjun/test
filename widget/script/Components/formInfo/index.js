define(function (require, exports, module) {
  require('./index.css')
  var uploadDetail = require('../../Components/uploadDetail/index.js')
  module.exports = {
    props: ['form'],
    components: {
      'upload-detail': uploadDetail
    },
    data: function () {
      return {
        changeType: {
          1: '工程指令',
          2: '设计变更'
        },
        fee_belong: {
          1: '工程费用',
          2: '开发费用',
          3: '设计费用',
          4: '营销费用',
          5: '其他'
        },
        change_effect: {
          1: '本指令不涉及增减工程费用',
          2: '本指令不涉及增减工程工期',
          3: '本指令涉及扣款（请提供详情）',
          4: '本指令属改善工程工作',
        },
        discuss: {
          1: '技术洽商',
          2: '经济洽商',
        },
        showForm: false
      }
    },
    mounted: function () {
      if (this.form.showForm != undefined) {
        this.showForm = this.form.showForm
      }
    },
    methods: {
      getValue: function (item) {
        return item.type ? this[item.type][item.value] : item.value
      },
      toggle: function () {
        this.showForm = !this.showForm
      }
    },
    template: $g.getTemplate('Components/formInfo/index.html')
  }
})