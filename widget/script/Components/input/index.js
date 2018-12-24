define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value', 'placeholder', 'disabled', 'type'],
    data: function () {
      return {
      }
    },
    methods: {
      blur: function () {
        this.$emit('blur')
      }
    },
    template: $g.getTemplate('Components/input/index.html')
  }
})