define(function (require, exports, module) {
  require('./index.css')
  var text = require('../text/index.js')
  var Input = require('../input/index.js')
  var select1 = require('../select1/index.js')
  var date = require('../date/index.js')
  module.exports = {
    template: $g.getTemplate('Components/subform/index.html'),
    components: {
      'v-text': text,
      'v-input': Input,
      'v-select1': select1,
      'v-date': date,
    },
    props: {
      /**
       * 传入的子表单内容 传入时需要有第一个元素作为默认模板
       * [[
       *   { type: 'input', label: 'labelName', value: ''}
       * ],...]
       */
      childForm: Array,
      // 标题
      title: String,
      // 描述
      description: String,
      disabled: Boolean,
      addContent: String,
      minlength: {
        type: Number,
        default: 0
      },
      maxlength: {
        type: Number,
        default: 1
      },
    },
    data: function () {
      return {
        tempItem: ''
      }
    },
    created: function () {
      if (!this.childForm.length) {
        $g.toastMsg('请传入正确子表单类型')
      }
      this.tempItem = JSON.parse(JSON.stringify(this.childForm[0]))
    },
    methods: {
      // 添加一个子表单
      addSubformItem: function () {
        $g.forEach(this.tempItem, function (v) {
          v.disabled = false
        })
        this.childForm.push($g.cloneDeep(this.tempItem))
        this.$emit('add')
      },
      // 删除一个子表单
      deleteSubformItem: function (index) {
        var $this = this
        weui.confirm('确认删除该项?', function () {
          $this.childForm.splice(index, 1)
        }, {
            title: '提示'
          });
      },
      select: function (index) {
        this.$emit('select', index)
      },
      blur: function (index) {
        this.$emit('blur', index)
      }
    },
  }
})