define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value', 'options', 'disabled', 'getlabel'],
    data: function () {
      return {
        option: {}
      }
    },
    mounted: function () {
      this.setDefault()
    },
    watch: {
      'options': function () {
        this.setDefault()
        this.$emit('change');
      }
    },
    methods: {
      setDefault: function () {
        if (this.options.length) {
          this.option = this.options[0];
          if (this.getlabel !== undefined) {
            this.$emit('input', this.option.label);
          } else {
            this.$emit('input', this.option.value);
          }
        }
      },
      picker: function (e) {
        if (this.disabled != undefined) {
          return
        }
        var _this = this;
        weui.picker(_this.options, {
          defaultValue: [_this.options[0].value],
          onConfirm: function (value) {
            _this.confirm(value)
          }
        })
      },
      confirm: function (value) {
        var _this = this;
        $g.forEach(this.options, function (item) {
          if (item.value == value) {
            _this.option = item;
            if (_this.getlabel !== undefined) {
              _this.$emit('input', item.label);
            } else {
              _this.$emit('input', item.value);
            }
            return false;
          }
        })
        this.$emit('change');
      }
    },
    template: $g.getTemplate('Components/select/index.html')
  }
})