webpackJsonp([4],{156:function(t,e,s){s(227);var n=s(127)(s(174),s(213),null,null);t.exports=n.exports},157:function(t,e,s){function n(t){for(var e=0;e<t.length;e++){var s=t[e],n=d[s.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](s.parts[i]);for(;i<s.parts.length;i++)n.parts.push(a(s.parts[i]));n.parts.length>s.parts.length&&(n.parts.length=s.parts.length)}else{for(var o=[],i=0;i<s.parts.length;i++)o.push(a(s.parts[i]));d[s.id]={id:s.id,refs:1,parts:o}}}}function i(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function a(t){var e,s,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(h)return v;n.parentNode.removeChild(n)}if(g){var a=f++;n=p||(p=i()),e=o.bind(null,n,a,!1),s=o.bind(null,n,a,!0)}else n=i(),e=r.bind(null,n),s=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else s()}}function o(t,e,s,n){var i=s?"":n.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var a=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function r(t,e){var s=e.css,n=e.media,i=e.sourceMap;if(n&&t.setAttribute("media",n),i&&(s+="\n/*# sourceURL="+i.sources[0]+" */",s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=s(158),d={},u=c&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,v=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,s){h=s;var i=l(t,e);return n(i),function(e){for(var s=[],a=0;a<i.length;a++){var o=i[a],r=d[o.id];r.refs--,s.push(r)}e?(i=l(t,e),n(i)):i=[];for(var a=0;a<s.length;a++){var r=s[a];if(0===r.refs){for(var c=0;c<r.parts.length;c++)r.parts[c]();delete d[r.id]}}}};var m=function(){var t=[];return function(e,s){return t[e]=s,t.filter(Boolean).join("\n")}}()},158:function(t,e){t.exports=function(t,e){for(var s=[],n={},i=0;i<e.length;i++){var a=e[i],o=a[0],r=a[1],c=a[2],l=a[3],d={id:t+":"+i,css:r,media:c,sourceMap:l};n[o]?n[o].parts.push(d):s.push(n[o]={id:o,parts:[d]})}return s}},174:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{changePass:!1}},created:function(){api.setStatusBarStyle({style:"dark"})},methods:{goback:function(){router.go(-1)},gotoPhoto:function(){api.getPicture({sourceType:"camera",encodingType:"png",mediaValue:"pic",destinationType:"url",allowEdit:!0,quality:100,targetWidth:500,targetHeight:500,saveToPhotoAlbum:!0},function(t,e){})},passwordChange:function(){this.changePass=!1},passwordNo:function(){this.changePass=!1},goPassChangeToast:function(){this.changePass=!0}}}},184:function(t,e,s){e=t.exports=s(148)(),e.push([t.i,".set-list{width:100%;height:100%}.set-list .icon{width:auto;height:auto}.set-list .bar-nav{background:#fff;top:auto}.list-block li{padding:0}.set-list .content{background:#fafafa;margin-top:20px}.set-list .list-block{margin:0}.set-list .item-inner img{width:2.75rem;height:2.75rem}.block-toast{width:100%;height:100%;background:#000;opacity:.5;position:fixed;top:0;left:0;z-index:20}.set-toast{width:80%;height:200px;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;z-index:30;border-radius:5px;padding-top:20px}.set-toast .button{display:flex;position:absolute;bottom:0;border:0;padding:0;margin:0;width:100%;height:auto;font-size:1rem}.set-toast .button span{display:block;flex:1;background:#0894ec;color:#fff;height:50px;line-height:50px}.inputPassword{font-size:.8rem;padding:10px 20px}.inputPassword input{margin-left:3%;width:60%;height:1.5rem;border:1px solid #e6e6e6}",""])},213:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"set-list"},[s("div",{staticClass:"topUI",staticStyle:{background:"#fff","padding-top":"20px"}}),t._v(" "),s("header",{staticClass:"bar bar-nav"},[s("span",{staticClass:"icon icon-left pull-left",on:{click:function(e){t.goback()}}}),t._v(" "),s("h1",{staticClass:"title"},[t._v("设置")])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"list-block"},[s("ul",[s("li",{staticClass:"item-content item-link",on:{click:function(e){t.gotoPhoto()}}},[t._m(0)]),t._v(" "),s("li",{staticClass:"item-content item-link",on:{click:function(e){t.goPassChangeToast()}}},[t._m(1)])])])]),t._v(" "),t.changePass?s("div",{staticClass:"block-toast"}):t._e(),t._v(" "),t.changePass?s("div",{staticClass:"set-toast"},[t._m(2),t._v(" "),t._m(3),t._v(" "),s("div",{staticClass:"button"},[s("span",{on:{click:function(e){t.passwordChange()}}},[t._v("确定")]),t._v(" "),s("span",{on:{click:function(e){t.passwordNo()}}},[t._v("取消")])])]):t._e()])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item-inner"},[s("div",{staticClass:"item-title"},[t._v("修改头像")]),t._v(" "),s("img",{attrs:{src:""}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item-inner"},[s("div",{staticClass:"item-title"},[t._v("修改密码")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"inputPassword"},[s("span",[t._v("旧密码")]),t._v(" "),s("input",{attrs:{type:"password"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"inputPassword"},[s("span",[t._v("新密码")]),t._v(" "),s("input",{attrs:{type:"password"}})])}]}},227:function(t,e,s){var n=s(184);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s(157)("5ba0f461",n,!0)}});