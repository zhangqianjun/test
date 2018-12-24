/**
 * storage.js
 * @author Ryan
 */

(function (window, undefined) {
  "use strict";
  var apiStorage = function () {
    this.isFirstOpen = $api.getStorage('isFirstOpen')           // 是否第一次打开App
    this.token = $api.getStorage('token')                       // 用户令牌
    this.userInfo = $api.getStorage('userInfo')                 // 用户信息
    this.checkDataTime = $api.getStorage('checkDataTime')       // 上次请求数据的时间戳，第一次为登录的时间
  };
  apiStorage.prototype = {
    set: function (key, value) {
      $api.setStorage(key, value)
    },
    get: function (key) {
      return $api.getStorage(key)
    },
    remove: function (key) {
      $api.rmStorage(key)
    },
    clear: function () {
      $api.clearStorage()
    }
  }
  window.apiStorage = apiStorage;
})(window)
