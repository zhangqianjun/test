define(function (require, exports, module) {
  var header = require('../../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
    },
    data: {
      tabs: ['查看全部', '按照合同查询'],
      tabIndex: 0,
      projectname: '项目选择'
    },
    mounted: function () {
      $g.listenBack();
      $util.setFooter(1);
      this.tabClick(0)
      this.addEvent()
    },
    methods: {
      addEvent: function () {
        var _this = this;
        api.addEventListener({
          name: 'selectProject'
        }, function (ret, err) {
          var projectname = ret.value.projectName
          if (projectname.length > 6) {
            projectname = projectname.substring(0, 6) + '...'
          }
          _this.projectname = projectname
        });
      },
      tabClick: function (index) {
        this.tabIndex = index
        var page = index ? 'contract_list' : 'change_list'
        $g.openList(page)
      },
      projectchange: function () {
        $g.openWin({
          name: 'search_list',
          url: 'Process/search_list.html',
          pageParam: {
            pagename: 'project'
          }
        })
      }
    }
  })
})