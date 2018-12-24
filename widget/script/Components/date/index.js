define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value'],
    data: function () {
      return {
        year: '',
        month: '',
        day: ''
      }
    },
    mounted: function () {
      var date = new Date();
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
      var value = [this.year, this.month, this.day].join('-')
      this.$emit('input', value);
    },
    methods: {
      picker: function (e) {
        var _this = this;
        weui.datePicker({
          start: 2018,
          end: 2050,
          defaultValue: [this.year, this.month, this.day],
          onConfirm: function (result) {
            // [{"label":"2017年","value":2017},{"label":"7月","value":7},{"label":"30日","value":30}]
            var value = result[0] + '-' + result[1] + '-' + result[2];
            _this.$emit('input', value);
          },
          id: 'datePicker'
        });
      },
    },
    template: $g.getTemplate('Components/date/index.html')
  }
})