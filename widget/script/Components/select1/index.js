define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value'],
    data: function () {
      return {
        option: {}
      }
    },
    mounted: function () {
    },
    methods: {
      select: function () {
        this.$emit('select')
      }
    },
    template: $g.getTemplate('Components/select1/index.html')
  }
})