webpackJsonp([7],{160:function(t,e,s){s(262);var i=s(129)(s(204),s(246),null,null);t.exports=i.exports},161:function(t,e,s){function i(t){for(var e=0;e<t.length;e++){var s=t[e],i=c[s.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](s.parts[o]);for(;o<s.parts.length;o++)i.parts.push(n(s.parts[o]));i.parts.length>s.parts.length&&(i.parts.length=s.parts.length)}else{for(var a=[],o=0;o<s.parts.length;o++)a.push(n(s.parts[o]));c[s.id]={id:s.id,refs:1,parts:a}}}}function o(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function n(t){var e,s,i=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(i){if(g)return h;i.parentNode.removeChild(i)}if(v){var n=f++;i=p||(p=o()),e=a.bind(null,i,n,!1),s=a.bind(null,i,n,!0)}else i=o(),e=r.bind(null,i),s=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else s()}}function a(t,e,s,i){var o=s?"":i.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var n=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(n,a[e]):t.appendChild(n)}}function r(t,e){var s=e.css,i=e.media,o=e.sourceMap;if(i&&t.setAttribute("media",i),o&&(s+="\n/*# sourceURL="+o.sources[0]+" */",s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=s(162),c={},u=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,g=!1,h=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,s){g=s;var o=d(t,e);return i(o),function(e){for(var s=[],n=0;n<o.length;n++){var a=o[n],r=c[a.id];r.refs--,s.push(r)}e?(o=d(t,e),i(o)):o=[];for(var n=0;n<s.length;n++){var r=s[n];if(0===r.refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete c[r.id]}}}};var m=function(){var t=[];return function(e,s){return t[e]=s,t.filter(Boolean).join("\n")}}()},162:function(t,e){t.exports=function(t,e){for(var s=[],i={},o=0;o<e.length;o++){var n=e[o],a=n[0],r=n[1],l=n[2],d=n[3],c={id:t+":"+o,css:r,media:l,sourceMap:d};i[a]?i[a].parts.push(c):s.push(i[a]={id:a,parts:[c]})}return s}},204:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{changePass:!1,newPassword:"",oldPassword:"",userInfo:{},userImg:"",HOST:window.HOST,version:""}},created:function(){this.version=api.appVersion,this.getUserInfo()},mounted:function(){api.setStatusBarStyle({style:"dark"}),this.$refs.mainTop.style.paddingTop=api.safeArea.top+"px"},methods:{getUserInfo:function(){var t=this,e=function(e){t.userInfo=e.data,t.userImg=t.userInfo.photo};$http.getUserInfo(api,e)},uploadFile:function(t){var e=this,s=t.target.files[0];s&&$g.upload(s,function(t,s){if(console.log(JSON.stringify(s)),400!=s.code){var i={photo:s.data},o=function(t){api.toast({msg:"已成功修改",duration:2e3,location:"middle"}),e.userImg=i.photo,e.getUserInfo()};$http.getUserPhoto(api,i,o)}})},goback:function(){router.go(-1)},passwordChange:function(){var t=this,e={new_pwd:this.newPassword,old_pwd:this.oldPassword},s=function(e){t.changePass=!1};$http.changePassword(api,e,s)},passwordNo:function(){this.changePass=!1},goPassChangeToast:function(){this.changePass=!0},outLogin:function(){var t=function(t){Cookies.remove("token"),clearInterval(window.timer),router.push({name:"login"}),api.toast({msg:"已退出登陆",duration:2e3,location:"middle"})};$http.logout(api,t)}}}},216:function(t,e,s){e=t.exports=s(150)(),e.push([t.i,".set-list{width:100%;height:100%}.set-list .icon{width:auto;height:auto}.set-list .bar-nav{background:#fff;top:auto}.list-block li{padding:0}.set-list .content{background:#fafafa;margin-top:20px}.set-list .list-block{margin:0}.set-list .item-inner img{width:2.75rem;height:2.75rem;border-radius:50%}.block-toast{width:100%;height:100%;background:#000;opacity:.5;position:fixed;top:0;left:0;z-index:20}.set-toast{width:70%;height:190px;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;z-index:30;border-radius:15px;padding-top:20px}.set-toast .button{display:flex;position:absolute;justify-content:space-around;bottom:0;border:0;padding:0;margin:0;width:100%;height:auto;font-size:.9rem}.set-toast .button span{display:block;flex:1;background:#0894ec;color:#fff;height:50px;line-height:50px}.inputPassword{font-size:.8rem;padding:10px 20px}.inputPassword input{margin-left:3%;width:65%;height:1.5rem;border:1px solid #e6e6e6}.outlogin{height:50px;line-height:50px;background:#fff}.outlogin,.versionStyle{width:100%;text-align:center}.versionStyle{position:absolute;bottom:20px;left:0;height:40px;line-height:40px;font-size:16px;color:#888}",""])},246:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"set-list"},[s("div",{ref:"mainTop",staticStyle:{background:"#fff"}}),t._v(" "),s("header",{staticClass:"bar bar-nav"},[s("span",{staticClass:"icon icon-left pull-left",on:{click:function(e){t.goback()}}}),t._v(" "),s("h1",{staticClass:"title"},[t._v("设置")])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"list-block",staticStyle:{"margin-top":"10px"}},[s("ul",[s("li",{staticClass:"item-content item-link"},[s("input",{staticStyle:{opacity:"0",position:"absolute",top:"0",left:"0",width:"100%",height:"100%","z-index":"66"},attrs:{id:"uploaderInput",value:"123",type:"file",accept:"image/*"},on:{change:function(e){t.uploadFile(e)}}}),t._v(" "),s("div",{staticClass:"item-inner"},[s("div",{staticClass:"item-title"},[t._v("修改头像")]),t._v(" "),t.userImg?s("img",{attrs:{src:""+t.HOST+t.userImg}}):t._e(),t._v(" "),t.userImg?t._e():s("img",{staticStyle:{opacity:"0.6"},attrs:{src:"/res/icon-yonghu.png"}})])])])]),t._v(" "),s("div",{staticClass:"list-block",staticStyle:{"margin-top":"10px"}},[s("ul",[s("li",{staticClass:"item-content item-link",on:{click:function(e){t.goPassChangeToast()}}},[t._m(0)])])]),t._v(" "),s("div",{staticClass:"list-block",staticStyle:{position:"absolute",bottom:"60px",left:"0",width:"100%"}},[s("ul",[s("li",[s("div",{staticClass:"outlogin item-title",on:{click:function(e){t.outLogin()}}},[t._v("\n                退出登录\n            ")])])])]),t._v(" "),s("div",{staticClass:"versionStyle"},[t._v("版本号： "+t._s(t.version))])]),t._v(" "),t.changePass?s("div",{staticClass:"block-toast"}):t._e(),t._v(" "),t.changePass?s("div",{staticClass:"set-toast"},[s("div",{staticClass:"inputPassword"},[s("span",[t._v("旧密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.oldPassword,expression:"oldPassword"}],attrs:{type:"password"},domProps:{value:t.oldPassword},on:{input:function(e){e.target.composing||(t.oldPassword=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"inputPassword"},[s("span",[t._v("新密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newPassword,expression:"newPassword"}],attrs:{type:"password"},domProps:{value:t.newPassword},on:{input:function(e){e.target.composing||(t.newPassword=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"button",staticStyle:{"border-bottom-left-radius":"15px"}},[s("span",{staticStyle:{"border-bottom-left-radius":"15px",background:"#fff",color:"#000"},on:{click:function(e){t.passwordNo()}}},[t._v("取消")]),t._v(" "),s("span",{staticStyle:{"border-bottom-right-radius":"15px"},on:{click:function(e){t.passwordChange()}}},[t._v("确定")])])]):t._e()])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item-inner"},[s("div",{staticClass:"item-title"},[t._v("修改密码")])])}]}},262:function(t,e,s){var i=s(216);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s(161)("5ba0f461",i,!0)}});