define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header
    },
    data: {
    },
    mounted: function () {
      this.setFrame()
    },
    methods: {
      setFrame: function () {
        var headerH = $api.offset($api.byId('header')).h
        var safeTop = 0
        if ($g.isIOS() && api.winWidth == 375 && api.winHeight == 812) {
          safeTop = api.safeArea.top
        }
        $g.openFrame({
          name: 'list',
          url: 'Frame/changeConsultDetail.html',
          y: headerH,
          h: api.winHeight - headerH - safeTop,
          bounces: true,
          pageParam: api.pageParam
        })
      }
    }
  })
})