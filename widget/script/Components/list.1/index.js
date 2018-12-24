define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['list'],
    data: function () {
      return {
      }
    },
    methods: {
      clickLi: function (index, item) {
        this.$emit('clickli',index, item)
      }
    },
    template: $g.getTemplate('Components/list/index.html')
  }
})