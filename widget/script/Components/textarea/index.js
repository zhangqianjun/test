define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value', 'disabled', 'placeholder'],
    data: function () {
      return {
      }
    },
    template: $g.getTemplate('Components/textarea/index.html')
  }
})