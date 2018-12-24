define(function (require, exports, module) {
  var searchList = require('../../Components/searchList/index.js')
  var header = require('../../Components/header/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-header': header,
      'v-search-list': searchList,
    },
    data: {
      pages: {
        contract: {
          title: '合同选择',
          list: [],
          name: 'contractName',
          requestname: 'getContractList',
          resultname: 'contract'
        },
        person: {
          title: '人员选择',
          list: [],
          name: 'realname',
          requestname: 'getConsultUserList',
          resultname: 'user',
          showconfirm: true
        },
        reportSubmiter: {
          title: '变更申报发起人',
          list: [],
          name: 'realname',
          requestname: 'getSenderList',
          resultname: 'users'
        },
        project: {
          title: '项目选择',
          list: [],
          name: 'projectName',
          requestname: 'getProjectList',
          resultname: ''
        }
      },
      param: api.pageParam
    },
    mounted: function () {
    },
    methods: {
      click: function (item, list) {
        var pagename = api.pageParam.pagename
        if (pagename == 'contract') {
          api.sendEvent({
            name: 'selectContract',
            extra: item
          })
          api.closeWin();
        } else if (pagename == 'person') {
          item.checked = !item.checked
          this.pages.person.list = list
        } else if (pagename == 'reportSubmiter') {
          api.sendEvent({
            name: 'selectSender',
            extra: item
          })
          api.closeWin();
        }else if (pagename == 'project') {
          api.sendEvent({
            name: 'selectProject',
            extra: item
          })
          api.closeWin();
        }
      },
      confirm: function () {
        var userIds = []
        $g.log(this.pages.person)
        if (!this.pages.person.list.length) {
          $g.toastMsg('请选择人员')
          return
        }
        $g.forEach(this.pages.person.list, function (v) {
          if (v.checked) {
            userIds.push(v.userId)
          }
        })
        var data = {
          consultId: api.pageParam.id,
          userIds: userIds
        }
        $http.consultInvite(data, function (res) {
          weui.alert('已邀请选择的用户参与协商', function () {
            api.closeWin()
          })
        })
      }
    }
  })
})