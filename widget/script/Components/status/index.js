define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['info'],
    data: function () {
      return {
        status_list: {
          consult: {
            10: '协商中',
            20: '待审核',
            30: '审核通过',
            40: '审核不通过'
          },
          report: {
            10: '申报审批中',
            20: '审批通过',
            30: '指令已下发'
          },
          order: {
            10: '待填写',
            20: '待审批',
            30: '审批通过',
            40: '审批不通过'
          },
        }
      }
    },
    computed: {
      status: function () {
        return this.status_list[this.info.type][this.info.status]
      },
      date: function () {
        return $g.getDate(this.info.date)
      }
    },
    template: $g.getTemplate('Components/status/index.html')
  }
})