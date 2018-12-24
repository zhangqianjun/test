define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header
    },
    data: {
      list: [],
      showBtn: false,
      comment: '',
      param: api.pageParam
    },
    mounted: function () {
      this.openList('consult_list', api.pageParam)
    },
    methods: {
      openList: function (page, pageParam) {
        var headerH = $api.offset($api.byId('header')).h
        var footerH = $api.dom('.footer') && $api.offset($api.dom('.footer')).h
        var safeTop = 0
        if ($g.isIOS() && api.winWidth == 375 && api.winHeight == 812) {
          safeTop = api.safeArea.top
        }
        console.log(safeTop)
        $g.openFrame({
          name: 'list',
          url: 'Frame/' + page + '.html',
          y: headerH,
          h: api.winHeight - headerH - footerH - safeTop,
          bounces: true,
          pageParam: pageParam || {}
        })
      },
      selectPerson: function () {
        $g.openWin({
          name: 'search_list',
          url: 'Process/search_list.html',
          pageParam: {
            id: api.pageParam.id,
            pagename: 'person'
          }
        })
      },
      input: function () {
        this.showBtn = this.comment != ''
      },
      send: function () {
        console.log(api.frameName)
        var data = {
          consultId: api.pageParam.id,
          content: this.comment,
          file: [],
          image: []
        }
        var _this = this;
        $http.createComment(data, function (res) {
          _this.commentSuccess()
        })
        this.comment = ''
        this.showBtn = false
      },
      commentSuccess: function () {
        //如果超过两小时或者全部人发表了意见
        $g.closeFrame('list')
        weui.alert('评论成功', function () {
          location.reload();
        })
      },
      uploadFile: function (e) {
        var _this = this;
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
          var type = $g.getFileType(file.name)
          _this.sendFile([{
            fileName: file.name,
            fileUrl: res.data.data
          }], type)
        })
      },
      sendFile: function (file, type) {
        var data = {
          consultId: api.pageParam.id,
          content: '',
          file: type == 'file' ? file : [],
          image: type == 'image' ? file : []
        }
        var _this = this;
        $http.createComment(data, function (res) {
          _this.commentSuccess()
        })
      },
      checkFile: function (filename) {
        if (!/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/i.test(filename)) {
          weui.alert('请上传图片，pdf或word文件')
          return false
        }
        return true
      }
    }
  })
})