define(function (require, exports, module) {
  var status = require('../../Components/status/index.js')
  var formInfo = require('../../Components/formInfo/index.js')
  new Vue({
    el: '#page',
    components: {
      'v-status': status,
      'v-forminfo': formInfo
    },
    data: {
      info: {
        title: '变更协商',
        name: '',
        date: '',
        status: '',
        type: 'consult'
      },
      form: {
        title: '表单信息',
        list: [{
          label: '项目名称',
          value: ''
        }, {
          label: '项目编号',
          value: ''
        }, {
          label: '协商主题',
          value: ''
        }, {
          label: '变更类型',
          value: '',
          type: 'changeType'
        }, {
          label: '详细内容',
          value: ''
        }, {
          label: '附件',
          image: [],
          file: []
        }]
      },
      part: '',
      notPart: '',
      cronTime: '',
      param: api.pageParam
    },
    mounted: function () {
      this.setRefresh()
      this.getConsultInfo()
    },
    methods: {
      getConsultInfo: function () {
        var _this = this;
        $g.log(this.param);
        $http.getConsultInfo(this.param.id, function (res) {
          _this.info.name = res.realname;
          _this.info.date = res.createTime;
          _this.info.status = res.status;
          // 表单信息
          _this.form.list[0].value = res.projectName;
          _this.form.list[1].value = res.projectNo;
          _this.form.list[2].value = res.title;
          _this.form.list[3].value = res.changeType;
          _this.form.list[4].value = res.content;
          _this.form.list[5].image = res.image;
          _this.form.list[5].file = res.file;
          // 协商详情
          _this.part = res.part;
          _this.notPart = res.notPart;
          _this.cronTime = $g.getTime(res.cronTime) || '';
        })
      },
      setRefresh: function () {
        $g.refresh({
          success: function () {
            api.refreshHeaderLoadDone()
            location.reload()
          }
        })
      },
      tabClick: function (index) {
        this.tabIndex = index;
      },
      goConsult: function () {
        $g.openWin({
          name: 'consult',
          url: 'Process/consult.html',
          pageParam: {
            id: api.pageParam.id,
            status: this.info.status
          }
        })
      },
      agree: function () {
        $g.openWin({
          name: 'opinion',
          url: 'Process/opinion.html',
          pageParam: {
            id: api.pageParam.id,
            agree: true
          }
        })
      },
      disagree: function () {
        $g.openWin({
          name: 'opinion',
          url: 'Process/opinion.html',
          pageParam: {
            id: api.pageParam.id,
            agree: false
          }
        })
      },
      submitReport: function () {
        $g.openWin({
          name: 'changeReport',
          url: 'Process/changeReport.html',
          pageParam: {
            id: api.pageParam.id,
            changeType: this.form.list[3].value
          }
        })
      }
    }
  })
})