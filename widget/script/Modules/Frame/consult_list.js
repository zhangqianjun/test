define(function (require, exports, module) {
  var uploadDetail = require('../../Components/uploadDetail/index.js')
  new Vue({
    el: '#page',
    components: {
      'upload-detail': uploadDetail
    },
    data: {
      list: [],
      param: api.pageParam
    },
    mounted: function () {
      this.setRefresh()
      this.getConsultInfo()
    },
    methods: {
      getConsultInfo: function () {
        var _this = this;
        $http.getConsultInfo(api.pageParam.id, function (res) {
          if (!res.opinion) {
            return
          }
          $g.forEach(res.opinion, function (v) {
            v.createTime = $g.getTime(v.createTime)
          })
          _this.list = res.opinion
        })
      },
      setRefresh: function () {
        $g.refresh({
          success: function () {
            api.refreshHeaderLoadDone()
            location.reload()
          }
        })
      }
    }
  })
})