define(function (require, exports, module) {
  var header = require('../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header
    },
    data: {
      tabs: ['待办', '消息'],
      tabIndex: 0,
      todoCount: 0,
      msgCount: 0,
    },
    mounted: function () {
      $g.listenBack();
      $util.setFooter(0);
      this.addEvent()
      this.tabClick(0)
    },
    methods: {
      addEvent: function () {
        var _this = this;
        api.addEventListener({
          name: 'todoCount'
        }, function (ret, err) {
          _this.todoCount = ret.value
        });
        api.addEventListener({
          name: 'msgCount'
        }, function (ret, err) {
          _this.msgCount = ret.value
        });
      },
      tabClick: function (index) {
        this.tabIndex = index
        var page = index ? 'msg_list' : 'todo_list'
        $g.openList(page)
      }
    }
  })
})