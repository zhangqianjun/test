define(function (require, exports, module) {
  var list = require('../../Components/list/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-list': list
    },
    data: {
      msg_list: []
    },
    mounted: function () {
      this.setRefresh()
      this.getMsgList()
    },
    methods: {
      setRefresh: function () {
        $g.refresh({
          success: function () {
            api.refreshHeaderLoadDone()
            location.reload()
          }
        })
      },
      getMsgList: function () {
        var _this = this
        $http.getMsgList(function (res) {
          var count = 0
          var arr = []
          $g.forEach(res, function (v) {
            $g.forEach(v.children, function (v1) {
              arr.push({
                name: v1.theme,
                no: $g.getDate(v1.create_time)
              })
              if (v1.status == 10) {
                count++
              }
            })
          })
          _this.msg_list = arr
          api.sendEvent({
            name: 'msgCount',
            extra: count
          })
        })
      },
      clickMsg: function () {
      }
    }
  })
})