define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['list'],
    data: function () {
      return {
      }
    },
    template: $g.getTemplate('Components/info/index.html')
  }
})