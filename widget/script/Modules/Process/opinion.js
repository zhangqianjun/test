define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  var textarea = require('../../Components/textarea/index.js')
  var select = require('../../Components/select/index.js')
  var upload = require('../../Components/upload/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-textarea': textarea,
      'v-select': select,
      'v-upload': upload
    },
    data: {
      opinion: '',
      filelist: [],
      imagelist: [],
      sender: {},
      param: api.pageParam
    },
    mounted: function () {
      this.addEvent()
      this.opinion = this.param.agree ? '同意' : '不同意'
    },
    methods: {
      addEvent: function () {
        api.removeEventListener({
          name: 'selectSender'
        });
        var _this = this;
        api.addEventListener({
          name: 'selectSender'
        }, function (ret, err) {
          _this.sender = ret.value
        });
      },
      select: function () {
        $g.openWin({
          name: 'search_list',
          url: 'Process/search_list.html',
          pageParam: {
            pagename: 'reportSubmiter'
          }
        })
      },
      submit: function () {
        var _this = this;
        if (!this.opinion) {
          $g.toastMsg('请填写意见')
          return
        }
        if (this.param.agree) {
          if (!this.sender.id) {
            $g.toastMsg('请选择变更申报发起人')
            return
          }
          var data = {
            consultId: api.pageParam.id,
            requestUserId: this.sender.id,
            approvalContent: this.opinion,
            image: this.imagelist,
            file: this.filelist
          }
          $http.consultAgree(data, function (res) {
            _this.alert()
          })
        } else {
          $http.consultReject(api.pageParam.id, function (res) {
            _this.alert()
          })
        }
      },
      alert: function () {
        weui.alert('提交成功', function () {
          $g.closeToHome()
          // $g.openWin({
          //   name: 'home',
          //   url: 'home.html',
          //   reload: true
          // })
        })
      }
    }
  })
})