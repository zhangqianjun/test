export default {
  winInit(obj) {
    var self = this
    // 适配ios头部
    var header = obj || $api.byId('header')
    $api.fixStatusBar(header)
    api.setStatusBarStyle({
      style: 'light'
    });
    // 设置window返回按钮
    var back = $api.byId('back')
    if (back) {
      $api.addEvt(back, 'click', function (ev) {
        self.closeWin()
      })
    }
  },
  /**
   * 文件上传
   */
  upload(file, successCb) {
    console.log('upload')
    let uploadUrl = window.HOST + '/admin/upload'
    var fd = new FormData()
    fd.append('file', file)
    var XHR = new XMLHttpRequest()
    if (XHR) {
      XHR.open("POST", uploadUrl)
      // XHR.setRequestHeader('token', g.getToken())
      XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
          var resultValue = XHR.responseText
          // 进行json序列化
          var ret = JSON.parse(resultValue)
          successCb(file, ret)
          XHR = null
        }
      }
      XHR.send(fd)
    }
  }
}