define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['title', 'back', 'project','showconfirm','projectname'],
    data: function () {
      return {
      }
    },
    template: $g.getTemplate('Components/header/index.html'),
    mounted: function () {
      $g.winInit();
    },
    methods: {
      projectchange: function () {
        this.$emit('projectchange')
      },
      confirm: function () {
        this.$emit('confirm')
      }
    }
  }
})