define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var input = require('../../Components/input/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-input': input,
    },
    data: {
      oldPwd: '',
      newPwd: '',
      newPwd1: ''
    },
    methods: {
      submit: function () {
        if (!this.validateForm()) {
          return
        }
        var data = {
          oldPwd: $g.encodeb64(this.oldPwd),
          newPwd: $g.encodeb64(this.newPwd)
        }
        $http.resetPwd(data, function (res) {
          if ($api.getStorage('firstLogin')) {
            $g.toastMsg('登录成功');
            $api.rmStorage('firstLogin');
            setTimeout(function () {
              $g.openWin({
                name: 'home',
                url: 'home.html'
              })
            }, 1e3);
          } else {
            weui.toast('修改密码成功')
          }
        })
      },
      validateForm: function () {
        if (!this.oldPwd || !this.newPwd || !this.newPwd1) {
          $g.toastMsg('密码不能为空')
          return false
        }
        if (this.newPwd.length < 6) {
          $g.toastMsg('密码不少于6位数')
          return false
        }
        if (this.newPwd != this.newPwd1) {
          $g.toastMsg('新密码不一致')
          return false
        }
        if (this.oldPwd == this.newPwd) {
          $g.toastMsg('旧密码与新密码不能相同')
          return false
        }
        return true
      }
    }
  })
})