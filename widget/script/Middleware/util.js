(function (window) {
  var util = {}
  var NVTabBar = api.require('NVTabBar');
  util.setFooter = function (selectedIndex) {
    NVTabBar.open({
      styles: {
        bg: 'rgba(255,255,255,1)',
        h: 54,
        dividingLine: {
          width: 0,
          color: '#000'
        },
        badge: {
          bgColor: '#f00',
          numColor: '#fff',
          size: 5.0,
          centerY: 2
        }
      },
      items: [{
        w: api.winWidth / 3.0,
        iconRect: {
          w: 25.0,
          h: 25.0,
        },
        icon: {
          normal: 'widget://image/i-msg.png',
          highlight: 'widget://image/i-msg-selected.png',
          selected: 'widget://image/i-msg-selected.png'
        },
        title: {
          text: '消息',
          size: 12.0,
          normal: '#ccc',
          selected: '#33B2D5',
          marginB: 6.0
        }
      }, {
        w: api.winWidth / 3.0,
        iconRect: {
          w: 25.0,
          h: 25.0,
        },
        icon: {
          normal: 'widget://image/i-change.png',
          highlight: 'widget://image/i-change-selected.png',
          selected: 'widget://image/i-change-selected.png'
        },
        title: {
          text: '变更',
          size: 12.0,
          normal: '#ccc',
          selected: '#33B2D5',
          marginB: 6.0
        }
      }, {
        w: api.winWidth / 3.0,
        iconRect: {
          w: 25.0,
          h: 25.0,
        },
        icon: {
          normal: 'widget://image/i-my.png',
          highlight: 'widget://image/i-my-selected.png',
          selected: 'widget://image/i-my-selected.png'
        },
        title: {
          text: '我的',
          size: 12.0,
          normal: '#ccc',
          selected: '#33B2D5',
          marginB: 6.0
        }
      }],
      selectedIndex: selectedIndex || 0
    }, function (ret, err) {
      if (ret && ret.eventType == "click") {
        var pages = ['home', 'Process/change', 'Account/my']
        var page = pages[ret.index];
        if (ret.index == selectedIndex) {
          return
        }
        // if (!page) {
        //   api.toast({
        //     msg: '该功能尚未开放，敬请期待。',
        //     duration: 1500,
        //     location: 'middle'
        //   })
        //   return
        // }
        api.closeFrame({
          name: 'list'
        })
        // api.closeFrame({
        //   name: 'todo_list'
        // })
        // api.closeFrame({
        //   name: 'msg_list'
        // })
        // api.closeFrame({
        //   name: 'change_list'
        // })
        // api.closeFrame({
        //   name: 'contract_list'
        // })
        api.openWin({
          name: 'home',
          url: api.wgtRootDir + '/html/' + page + '.html'
        })
      }
      // NVTabBar.setBadge({
      //   index: 3,
      //   badge: '22'
      // });
    });
  }
  util.setFooterIndex = function (index) {
    NVTabBar.setSelect({
      index: index
    })
  }
  window.$util = util;
})(window)

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month 
    "d+|D+": this.getDate(), //day 
    "h+": this.getHours(), //hour 
    "m+": this.getMinutes(), //minute 
    "s+": this.getSeconds(), //second 
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
    "S": this.getMilliseconds() //millisecond 
  }
  if (/(y+|Y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}