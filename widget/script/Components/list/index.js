define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['list'],
    data: function () {
      return {
      }
    },
    methods: {
      clickLi: function (item,index) {
        this.$emit('clickli',item,index)
      }
    },
    template: $g.getTemplate('Components/list/index.html')
  }
})