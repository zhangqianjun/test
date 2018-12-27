/*
 * Ryan's JavaScript Library
 */
(function (window) {
  var g = {}
  g.ajaxPrefix = 'http://test-hyn-mobile.buildingqm.com'
  g.uploadUrl = g.ajaxPrefix + '/api/mobile/upload-file'
  g.isAndroid = function () {
    return (/android/gi).test(navigator.appVersion)
  }
  g.isIOS = function () {
    return (/mac/gi).test(navigator.appVersion)
  }
  g.winInit = function (obj) {
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
  }
  g.j2s = function (obj) {
    return JSON.stringify(obj)
  }
  g.s2j = function (obj) {
    return JSON.parse(obj)
  }
  g.isEmpty = function (val) {
    if (val == '' || val == null || val == undefined) {
      return true
    } else {
      return false
    }
  }
  g.log = function (obj) {
    console.log(JSON.stringify(obj))
  }
  g.logAndroid = function (log) {
    if (g.isAndroid()) {
      console.log(log)
    }
  }
  g.logIos = function (log) {
    if (g.isIOS()) {
      console.log(log)
    }
  }
  // 获取html模板
  g.getTemplate = function (url) {
    var template = ''
    var xhr = new XMLHttpRequest()
    xhr.open('GET', api.wgtRootDir + '/script/' + url, false)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.responseText !== '') {
        template = xhr.responseText
      } else {
        console.log('找不到 ' + url + ' 模板')
      }
    }
    xhr.send(null)
    return template
  }
  g.openWin = function (opts) {
    if (!opts.name || !opts.url) {
      return
    }
    console.log('\n============================================')
    console.log('当前页面：' + opts.name)
    this.logs('参数', opts.pageParam)
    console.log('============================================')
    api.openWin({
      name: opts.name,
      url: api.wgtRootDir + '/html/' + opts.url,
      bounces: opts.bounces || false,
      bgColor: opts.bgColor || '#f9f9f9',
      delay: opts.delay ? opts.delay : $g.isAndroid ? 100 : 0,
      slidBackEnabled: opts.slidBackEnabled === undefined ? true : opts.slidBackEnabled,
      slidBackType: opts.slidBackType || 'full',
      scaleEnabled: opts.scaleEnabled || false,
      reload: opts.reload === undefined ? true : opts.reload,
      pageParam: opts.pageParam || {}
    })
  }
  g.openFrame = function (opts) {
    if (!opts.name || !opts.url) {
      return
    }
    api.openFrame({
      name: opts.name,
      url: api.wgtRootDir + '/html/' + opts.url,
      rect: {
        x: opts.x || 0,
        y: opts.y !== undefined ? opts.y : ($api.byId('header') ? $api.offset($api.byId('header')).h : 0),
        w: 'auto',
        h: opts.h !== undefined ? opts.h : 'auto'
      },
      bounces: opts.bounces || false,
      reload: true,
      scaleEnabled: opts.scaleEnabled || false,
      pageParam: opts.pageParam || {}
    })
  }
  g.toastMsg = function (tips, time, location) {
    api.toast({
      msg: tips,
      duration: time || 1500,
      location: location || 'middle'
    })
  }
  g.closeWin = function (name) {
    if (name) {
      api.closeWin({
        name: name
      })
    } else {
      api.closeWin()
    }
  }
  g.closeToHome = function () {
    this.openWin({
      name: 'home',
      url: $api.getStorage('homeUrl')
    })
    // api.closeToWin({
    //   name: 'home'
    // })
  }
  g.closeFrame = function (name) {
    var frame = name ? name : api.frameName
    api.closeFrame({ name: frame })
  }
  /**
   * @param opts api.ajax里面的内容
   * @param callback code==200,成功的回调 失败的情况会自动处理
   */
  g.ajax = function (opts, callback, errCallback, unUseToken) {
    var loading = weui.loading('loading');
    var self = this
    // 拼接url
    opts.url = g.ajaxPrefix + opts.url
    opts.dataType = opts.dataType ? opts.dataType : 'json'
    if (unUseToken) {
      opts.headers = {
        'content-Type': 'application/json'
      }
    } else {
      var token = $api.getStorage('token') + '%' + window.btoa(new Date().getTime())
      // 设置header
      opts.headers = {
        'token': token,
        'content-Type': 'application/json'
      }
    }
    g.log(opts)
    api.ajax(opts, function (ret, err) {
      loading.hide();
      if (err) {
        if (errCallback && typeof (errCallback) == 'function') {
          errCallback(err)
        } else {
          $g.toastMsg('请求失败，请检查网络连接')
        }
      }
      if (ret) {
        $g.handleRet(ret, callback, errCallback)
      }
    })
  }
  g.clearUserInfo = function () {
    var storage = new apiStorage()
    storage.remove('token')
    storage.remove('userInfo')
  }

  g.reLogin = function () {
    var $this = this
    $g.toastMsg('登录失效 请重新登录!')
    this.clearUserInfo()
    setTimeout(function () {
      $this.openLogin()
    }, 1500)
  }

  g.openLogin = function () {
    this.openWin({
      name: 'login',
      url: 'Account/login.html',
      slidBackEnabled: false
    })
    var name = api.winName
    setTimeout(function () {
      api.closeWin({
        name: name
      })
    }, 1000);
  }

  g.handleRet = function (ret, callback, errCallback) {
    // 请求成功
    if (ret.code == 200) {
      callback(ret.data)
    } else if (ret.code == 101) { // 无效用户，跳转到登录页面
      $g.reLogin()
    } else {
      if (typeof errCallback == 'function') {
        errCallback(ret)
      } else {
        $g.toastMsg(ret.error)
      }
    }
  }
  /**
   * get请求参数拼接成字符串
   */
  g.makeQueryStr = function (paramObj) {
    if (paramObj) {
      var param = '?'
      for (var item in paramObj) {
        param += item + '=' + paramObj[item] + '&'
      }
      return param.substr(0, param.length - 1) // 去掉最后一个&符号
    } else {
      return ''
    }
  }
  /**
   * 监听上拉加载
   */
  g.topLoading = function (opts) {
    api.addEventListener({
      name: 'scrolltobottom',
      extra: {
        threshold: opts.threshold || 15
      }
    }, function (ret, err) {
      opts.success && opts.success(ret);
    });
  }
  g.refreshDone = function () {
    api && api.refreshHeaderLoadDone();
  }
  g.refresh = function (opts) {
    api.setRefreshHeaderInfo({
      visible: true,
      loadingImg: '',
      bgColor: '#eee',
      textColor: '#999',
      textDown: opts.textDown || '下拉刷新...',
      textUp: opts.textUp || '松开刷新...',
      showTime: true
    }, function (ret, err) {
      // setTimeout是为了解决页面刷新不执行ajax 回调的问题
      setTimeout(opts.success && opts.success(ret), 0)

      //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
      // api.refreshHeaderLoadDone()
    });
  }

  /**
   * 第一个对象为目标 其余的就是源
   * author Hoody
   */
  g.assign = function () {
    var target = arguments[0]
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var i in source) {
        target[i] = source[i]
      }
    }
    return target
  }

  // 重写map方法
  g.map = function (arr, cb) {
    var list = []
    if (typeof cb !== 'function') {
      throw new Error('请输入正确的函数!')
    }
    for (var i = 0; i < arr.length; i++) {
      list.push(cb(arr[i]))
    }
    return list
  }

  // 重写forEach方法
  g.forEach = function (arr, cb) {
    if (typeof cb !== 'function') {
      throw new Error('请输入正确的函数!')
    }
    for (var i = 0, len = arr.length; i < len; i++) {
      cb(arr[i], i)
    }
  }
  // 重写indexOf方法
  // 返回第一个找到的index
  g.indexOf = function (arr, target) {
    var index = -1
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == target) {
        index = i
        break
      }
    }
    return index
  }

  g.hideFrame = function (frameName) {
    api.setFrameAttr({
      name: frameName ? frameName : api.frameName,
      hidden: true
    })
  }
  /**
   * 文件上传
   */
  g.upload = function (file, successCb) {
    var fd = new FormData()
    fd.append('file', file)
    var XHR = new XMLHttpRequest()
    if (XHR) {
      XHR.open("POST", $g.uploadUrl)
      XHR.setRequestHeader('token', g.getToken())
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

  // apicloud ajax方法上传
  g.apiUpload = function (path, successCb) {
    console.log('apiUpload path = ' + path)
    var moment1 = moment(moment().unix())
    api.ajax({
      url: $g.uploadUrl,
      method: 'post',
      data: {
        files: {
          file: path
        }
      }
    }, function (ret, err) {
      var moment2 = moment(moment().unix())
      var gap = moment2 - moment1
      console.log('gap = ' + gap)
      if (ret) {
        successCb(ret)
      } else {
        console.log('error path = ' + path)
        console.log('upload error = ' + $g.j2s(err))
      }
    })
  }
  // 打开文件并预览
  g.openFile = function (url, title) {
    if (!fileReader && fileManager) {
      var fileReader = new fileManager()
      window.fileReader = fileReader
      fileReader.downloadFile(url, title)
    } else if (fileReader) {
      fileReader.downloadFile(url, title)
    } else {
      $g.toastMsg('打开文件失败')
    }
  }

  /**
   * 根据file对象拿到本地地址
   */
  g.getLocalFilePath = function (file) {
    var url = null
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url
    // blob:file:///336c8886-64e8-4b3e-877c-bcda4648dc07
  }
  /**
  /**
   * author Hoody
   * hammer事件委托
   * @param {string} rootQuery 根节点querySelector
   * @param {*} targetQuery 目标节点querySelector
   * @param {*} eventName hammer事件
   * @param {*} cb  回调 参数为响应事件的dom节点, 事件 cb(dom,ev)
   * @param {string} excludeCls 冒泡中碰到指定类的元素则停止
   */
  g.bindEvent = function (rootQuery, targetQuery, eventName, cb, excludeCls) {
    if (typeof cb !== 'function') {
      throw new Error('bindEvent -- 使用了非函数回调')
    }
    return new Hammer($api.dom(rootQuery)).on(eventName, function (ev) {
      var target = ev.target
      // 直接使用 targetQuery做查询
      while (target) {
        if (typeof (excludeCls) == 'string') {
          if (excludeCls && $api.hasCls(target, excludeCls)) {
            return false
          }
        } else if (typeof (excludeCls) == 'object') {
          for (var i = 0; i < excludeCls.length; i++) {
            if (excludeCls[i] && $api.hasCls(target, excludeCls[i])) {
              return false
            }
          }
        }
        if (Array.prototype.indexOf.call($api.domAll(targetQuery), target) != -1) {
          cb(target, ev)
          return false
        } else {
          target = target.parentNode
        }
      }
    })
  }

  /**
   * 解除事件委托
   * @param {hammer Manganer} hamManager 由bindEvent返回的内容 或者是一个new Hammer()
   */
  g.unBindEvent = function (hamManager) {
    hamManager.destroy()
  }
  /**
   * author Hoody
   *  禁用页面a标签
   */
  g.preventATag = function () {
    document.addEventListener('click', function (ev) {
      if (ev.target.tagName.toLowerCase() == 'a') {
        ev.preventDefault()
        return false
      }
    })
  }
  /**
   * 模板字符串替换
   * @formatStr 模板字符串
   * @formatObj 需要替换的对象
   * eg: formatStr: 'SELECT * FROM ${table_name} LIMIT ${pageSize} OFFSET ${offset}'
   *     formatObj: { table_name: 'form_test', pageSize: 10, offset: 10 }
   */
  g.format = function (formatStr, formatObj) {
    var reg = new RegExp('\\$\\{(' + Object.keys(formatObj).join('|') + ')\\}', 'g')
    return formatStr.replace(reg, function (match) {
      return formatObj[match.replace(/\$|\{|\}/g, '')]
    })
  }
  // 下载图片到本地相册
  g.downLoadToAlbum = function (url) {
    api.download({
      url: url,
      report: true,
      allowResume: true
    }, function (ret, err) {
      if (ret.state == 1) {
        var savedPath = ret.savePath
        // 保存后删除源图片
        $g.saveToAlbum(savedPath, function () {
          var fs = api.require('fs')
          fs.remove({ path: savedPath })
        })
      } else if (ret.state == 2) {
        $g.toastMsg('下载失败')
      }
    })
  }
  // 保存本地图片到系统相册
  g.saveToAlbum = function (path, callback) {
    api.actionSheet({
      title: '操作',
      cancle: '取消',
      buttons: ['保存到系统相册']
    }, function (ret) {
      if (ret.buttonIndex == 1) {
        api.saveMediaToAlbum({
          path: path
        }, function (ret, err) {
          if (ret && ret.status) {
            $g.toastMsg('保存成功')
            if (callback instanceof Function) {
              callback()
            }
          } else {
            $g.toastMsg('保存失败')
          }
        });
      }
    })
  }
  /**
   * 去除头尾空格
   * @param {string} str  目标字符串
   */
  g.trim = function (str) {
    if (typeof str == 'string') {
      return str.replace(/(^\s*)|(\s*$)/g, "")
    } else {
      return ''
    }
  }
  g.showProgress = function (title, content, showModal) {
    api.showProgress({
      title: title || '努力加载中',
      text: content || '',
      modal: showModal || false
    });
  }
  g.hideProgress = function () {
    api.hideProgress()
  }
  g.getCurrentTime = function () {
    return Math.floor(new Date().getTime() / 1000)
  }
  g.getTimeFromNow = function (timesTamp) {
    var time = timesTamp.toString().length > 10 ? moment(timesTamp).unix() : timesTamp
    if (!moment) {
      console.log('当前页面未引入 moment')
      return
    }
    var fromNow = moment(time.toString(), "X").fromNow()
    fromNow = fromNow.replace(/days ago/g, "天前")
    fromNow = fromNow.replace(/minutes ago/g, "分钟前")
    fromNow = fromNow.replace(/hours ago/g, "小时前")
    fromNow = fromNow.replace(/an hour ago/g, "1小时前")
    fromNow = fromNow.replace(/a minute ago/g, "1分钟前")
    fromNow = fromNow.replace(/a day ago/g, "1天前")
    fromNow = fromNow.replace(/a few seconds ago/g, "刚刚")
    return fromNow
  }
  /**
   * 播放音频
   */
  g.playRadio = function (path, cb) {
    if (g.radio == path) {  // 正在播放该音频
      g.radio = ''
      api.stopPlay()
      if (typeof cb == 'function') {
        cb()
      }
    } else {
      g.radio = path
      api.startPlay({
        path: path
      }, function (ret, err) {
        if (ret) {
          g.radio = ''
          if (typeof cb == 'function') {
            cb()
          }
        } else {
          g.radio = ''
        }
      });
    }
  }
  g.cloneDeep = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  // 检测联网状态
  g.isOnline = function () {
    var result = api.connectionType
    if (result == 'none') {
      return false
    } else {
      return true
    }
  }
  g.transConversationType = function (type) {
    var result = null
    if (typeof (type) == 'string') {
      if (type == 'PRIVATE') {
        result = 10
      } else if (type == 'DISCUSSION') {
        result = 20
      } else if (type == 'MESSAGE') {
        result = 30
      } else {
        console.log('类型转换失败，未知类型：' + type)
      }
    } else {
      if (type == 10) {
        result = 'PRIVATE'
      } else if (type == 20 || type == 50 || type == 60) {
        result = 'DISCUSSION'
      } else if (type == 30) {
        result = 'MESSAGE'
      } else {
        console.log('类型转换失败，未知类型：' + type)
      }
    }
    return result
  }
  g.sortByKey = function (key, sort) {
    // desc: 降序； asc：升序
    var sort = sort || 'desc'
    return function (obj1, obj2) {
      var val1 = obj1[key]
      var val2 = obj2[key]
      if (val1 < val2) {
        return sort == 'desc' ? -1 : 1
      } else if (val1 > val2) {
        return sort == 'asc' ? 1 : -1
      } else {
        return 0
      }
    }
  }
  g.listenBack = function () {
    api.addEventListener({
      name: 'keyback'
    }, function (ret, err) {
      // 第一次点击时间
      var firstClick = new Date().getTime()
      api.toast({
        msg: '再次点击返回键退出软件',
        duration: 2000,
        location: 'bottom'
      });
      api.addEventListener({
        name: 'keyback'
      }, function (ret, err) {
        // 第二次点击时间
        var secondClick = new Date().getTime()
        // 两次点击时间在两秒内则退出APP
        if (secondClick < firstClick + 2000) {
          api.closeWidget({
            id: api.appId,
            retData: { name: 'closeWidget' },
            silent: true
          });
        } else {
          $g.listenBack()
        }
      });
    });
  }
  g.reFreshConversation = function () {
    api.execScript({
      name: 'home',
      frameName: 'msgList-f',
      script: 'reloadMsgList()'
    })
  }
  g.sleep = function (milliSeconds) {
    var startTime = new Date().getTime()
    while (new Date().getTime() < startTime + milliSeconds);
  }
  g.encodeb64 = function (str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  g.decodeb64 = function (str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  g.toast = function (title) {
    weui.toast(title, {
      duration: 1500,
      className: 'myToast'
    });
  }
  g.logs = function (str, obj) {
    console.log(str + ':' + JSON.stringify(obj))
  }
  g._log = function (obj) {
    for (var k in obj) {
      console.log(k + ':' + obj[k])
    }
  }
  g.checkFile = function (filename) {
    if (!/\.(pdf|doc|docx)$/i.test(filename)) {
      weui.alert('请上传pdf或word文件')
      return false
    }
    return true
  }
  g.getFileType = function (filename) {
    if (/\.(pdf|doc|docx)$/i.test(filename)) {
      return 'file'
    } else {
      return 'image'
    }
  }
  g.getToken = function () {
    return $api.getStorage('token') + '%' + window.btoa(new Date().getTime())
  }
  g.getDate = function (time) {
    return new Date(time * 1000).format('yyyy年M月d日')
  }
  g.getTime = function (time) {
    return new Date(time * 1000).format('yyyy-M-d hh:mm')
  }
  g.getSecond = function (time) {
    return new Date(time * 1000).format('yyyy-M-d hh:mm:ss')
  }
  g.goWin = function (obj) {
    this.closeWin(obj.name)
    this.openWin({
      name: obj.name,
      url: obj.url
    })
  }
  g.openList = function (page, pageParam) {
    var headerH = $api.offset($api.byId('header')).h
    var tabH = 0
    if ($api.byId('tab')) {
      tabH = $api.offset($api.byId('tab')).h
      $api.byId('tab').style.top = headerH + 'px';
    }
    var footerH = 54
    var offsetY = headerH + tabH
    var safeTop = 0
    if (this.isIOS() && api.winWidth == 375 && api.winHeight == 812) {
      safeTop = api.safeArea.top
    }
    console.log(safeTop)
    this.openFrame({
      name: 'list',
      url: 'Frame/' + page + '.html',
      y: offsetY,
      h: api.winHeight - offsetY - footerH - safeTop,
      bounces: true,
      pageParam: pageParam || {}
    })
  }
  g.setReadList = function (item) {
    var read_list = $api.getStorage('read_list') || []
    read_list.push(item.id)
    $api.setStorage('read_list', read_list)
  }
  /*end*/
  window.$g = g

})(window)
