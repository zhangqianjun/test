define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var info = require('../../Components/info/index.js')
  var attach = require('../../Components/attach/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-info': info,
      'v-attach': attach,
    },
    data: {
      list: [
        { label: '账号', value: '' },
        { label: '姓名', value: '' },
      ],
      list1: [
        { label: '部门', value: '' },
        { label: '角色', value: '' },
        { label: '公司', value: '' }
      ],
      image: []
    },
    mounted: function () {
      $g.listenBack();
      $util.setFooter(3);
      this.getUserInfo()
    },
    methods: {
      getUserInfo: function () {
        var _this = this;
        $http.getUserInfo(function (res) {
          _this.list[0].value = res.username;
          _this.list[1].value = res.realname;
          _this.list1[0].value = res.structure;
          _this.list1[1].value = res.access;
          _this.list1[2].value = res.supplierName;
          _this.image = res.signImage.url ? [res.signImage] : []
        })
      },
      uploadFile: function (e) {
        var file = e.target.files[0];
        if (!file) {
          return
        }
        if (!this.checkFile(file.name)) {
          return
        }
        $g._log(file);
        var loading = weui.loading('loading');
        $g.upload(file, function (file, res) {
          loading.hide();
          $g.log(res);
          $http.uploadSign(res.data.data, function (res) {
            weui.alert('上传成功', function () {
              location.reload()
            })
          })
        })
      },
      checkFile: function (filename) {
        if (!/\.(jpg|jpeg|png|gif)$/i.test(filename)) {
          weui.alert('请上传图片')
          return false
        }
        return true
      },
      logout: function () {
        $http.logout(function () {
          $api.rmStorage('token');
          $g.toastMsg('退出登录成功');
          setTimeout(function () {
            api.closeToWin({
              name: 'login'
            })
          }, 1e3);
        })
      }
    }
  })
})