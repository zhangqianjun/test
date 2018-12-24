define(function (require, exports, module) {
  new Vue({
    el: '#login',
    data: {
      // 用户输入的数据
      loginForm: {
        // 用户名
        username: '',
        // 密码
        password: ''
      },
      // 是否隐藏用户名输入框中的icon
      hideUIcon: false,
      // 是否隐藏密码输入框中的icon
      hidePIcon: false,
      // 密码输入框的type
      type: 'password',
      // 密码输入框的小眼睛class
      passwordClass: 'iconfont icon-tubiao-yincang'
    },
    computed: {
      isPass: function () {
        return this.loginForm.username !== '' && this.loginForm.password !== '' && /^.{1,5}$/.test(this.loginForm.password) === false
      }
    },
    created: function () {
      if ($api.getStorage('token')) {
        $g.toastMsg('登录成功');
        setTimeout(function () {
          $g.openWin({
            name: 'home',
            url: 'home.html',
            slidBackEnabled: false
          })
        }, 500);
      }
    },
    methods: {
      handleFocus: function (val) {
        this.hideUIcon = !val
        this.hidePIcon = val
      },
      handleReset: function (val) {
        if (val) {
          this.loginForm.password = ''
          return
        }
        this.loginForm.username = ''
      },
      handleHide: function () {
        this.hide = !this.hide
        this.type = this.hide ? 'password' : 'text'
        this.passwordClass = this.hide ? 'iconfont icon-tubiao-yincang' : 'iconfont icon-tubiao-xianshi'
      },
      login: function () {
        var _this = this;
        var data = {
          username: _this.loginForm.username,
          password: $g.encodeb64(_this.loginForm.password)
        }
        $http.login(data, function (res) {
          $api.setStorage('token', res.token);
          // 第一次登陆强制修改密码
          // res.firstLogin = 1
          if (res.firstLogin) {
            $api.setStorage('firstLogin', true);
            weui.alert('密码不能与初始密码一致，请先修改密码', function () {
              _this.changePwd();
            });
          } else {
            // 登陆成功
            $g.toastMsg('登录成功');
            setTimeout(function () {
              $g.openWin({
                name: 'home',
                url: 'home.html',
                slidBackEnabled: false
              })
            }, 1e3);
          }
        })
      },
      changePwd: function () {
        $g.openWin({
          name: 'changePwd',
          url: 'Account/changePwd.html'
        })
      }
    }
  })
})
