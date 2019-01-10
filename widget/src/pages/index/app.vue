<template>
  <div>
    <!-- <ul v-if="dataHasLoaded">
            <li>引擎版本信息: {{ver}}</li>
            <li>系统类型: {{sType}}</li>
            <li>系统版本: {{sVer}}</li>
            <li>设备标识: {{id}}</li>
            <li>设备型号: {{model}}</li>
            <li>设备名称: {{name}}</li>
            <li>网络状态: {{cType}}</li>
            <li>主窗口名字: {{winName}}</li>
            <li>主窗口宽度: {{winWidth}}</li>
            <li>主窗口高度: {{winHeight}}</li>
            <li>子窗口名字: {{frameName}}</li>
            <li>子窗口宽度: {{frameWidth}}</li>
            <li>子窗口高度: {{frameHeight}}</li>
        </ul> -->
    <!-- <div class="content">
      <div>123</div>
      <div>{{test}}</div> -->
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataHasLoaded: false,
      test: 222331
    }
  },
  created() {
    var ajpush = api.require('ajpush');
    // ajpush.init(function (ret, err) {
    //   if (ret && ret.status) {
    //     // alert('操作成功!');
    //   } else {
    //     alert('操作失败!');
    //   }
    // });
    // api.addEventListener({name:'appintent'}, function(ret,err) {
    //     alert('通知被点击，收到数据：\n' + JSON.stringify(ret));//监听通知被点击后收到的数据
    //     if(ret && ret.appParam.ajpush){
    //     }
    //    })
    ajpush.setListener((ret) => {
      var isif = Cookies.get('ifFront')
      var sw = api.require('screenWake');
      var notificationId = null
      sw.addScreenWake();
      api.notification({
        vibrate: [100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500],
        // light: true,
        sound: 'widget://res/music.mp3',
        notify: {
          title: '测试',
          content: '测试试试',
          extra: 'fdsfds',
          updateCurrent: true
        }
      }, function(ret, err) {
          notificationId = ret.id;
      })
      var id = ret.id;
      var title = ret.title;
      var content = ret.content;
      var extra = ret.extra;
      this.test = content;
        api.confirm({
          title: '提示',
          msg: '收到一条待办通知',
          buttons: ['确定', '取消']
      }, function(ret, err) {
          var index = ret.buttonIndex;
          api.cancelNotification({
              id: notificationId
          });
          if (index == 1) {
            if (extra.type == 1) {
                router.push({ name: 'todoDetails', params: {id: extra.id} ,query: {id: extra.id}})
            } else if (extra.type == 2) {
                router.push({ name: 'checkEvent', params: {id: extra.id}, query: {id: extra.id, type: 1}})
            } else if (extra.type == 3) {
                router.push({ name: 'checkEvent', params: {id: extra.id} ,query: {id: extra.id, type: 2}})
            }
          }
          // alert(index)
      });
      
    });
  }
}
</script>