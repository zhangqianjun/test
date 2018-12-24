define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label','value'],
    data: function () {
      return {
      }
    },
    template: $g.getTemplate('Components/text/index.html')
  }
})