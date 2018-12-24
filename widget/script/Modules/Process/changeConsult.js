define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  var text = require('../../Components/text/index.js')
  var select = require('../../Components/select/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var upload = require('../../Components/upload/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-input': input,
      'v-text': text,
      'v-select': select,
      'v-textarea': textarea,
      'v-upload': upload,
    },
    data: {
      project_list: [],
      change_list: [{
        label: '工程指令',
        value: 1
      }, {
        label: '设计变更',
        value: 2
      }],
      form: {
        projectId: 0,
        title: '',
        content: '',
        changeType: '',
        file: [],
        image: []
      },
      projectNo: '',
      projects: [],
    },
    mounted: function () {
      this.getProjectList()
      // this.getChangeType()
    },
    methods: {
      getChangeType: function () {
        var _this = this;
        $http.getChangeType(function (res) {
          var change_list = []
          for (var k in res.type) {
            change_list.push({
              label: res.type[k],
              value: k
            })
          }
          _this.change_list = change_list
        })
      },
      getProjectList: function () {
        var _this = this;
        $http.getProjectList({}, function (res) {
          _this.projects = res;
          $g.forEach(res, function (v) {
            _this.project_list.push({
              label: v.projectName,
              value: v.projectId
            })
          })
        });
      },
      projectChange: function () {
        var _this = this;
        $g.forEach(this.projects, function (v) {
          if (v.projectId == _this.form.projectId) {
            _this.projectNo = v.projectNo
          }
        })
      },
      submit: function () {
        if (!this.validateForm()) {
          return
        }
        var _this = this
        $http.createConsult(this.form, function (res) {
          weui.alert('提交成功', function () {
            $g.openWin({
              name: 'home',
              url: 'Process/change.html',
              slidBackEnabled: false,
              reload: true
            })
          })
        })
      },
      validateForm: function () {
        if (!this.form.title) {
          $g.toastMsg('请输入协商主题');
          return false
        }
        if (!this.form.content) {
          $g.toastMsg('请输入详细内容');
          return false
        }
        return true
      }
    }
  })
})