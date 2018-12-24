define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['list'],
    data: function () {
      return {

      }
    },
    methods: {
      toggle: function (index, index1) {
        this.list[index].sublist[index1].expand = !this.list[index].sublist[index1].expand
      },
      clickli:function(index){
        this.$emit('clickli',index)
      }
    },
    template: $g.getTemplate('Components/contract_list/index.html')
  }
})