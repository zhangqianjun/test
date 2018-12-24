define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['value', 'placeholder'],
    data: function () {
      return {
      }
    },
    methods: {
      search:function(){
        this.$emit('search')
      }
    },
    template: $g.getTemplate('Components/search/index.html')
  }
})