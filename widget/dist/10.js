webpackJsonp([10],{158:function(e,t,r){r(281);var o=r(129)(r(207),r(261),null,null);e.exports=o.exports},165:function(e,t,r){function o(e){for(var t=0;t<e.length;t++){var r=e[t],o=l[r.id];if(o){o.refs++;for(var n=0;n<o.parts.length;n++)o.parts[n](r.parts[n]);for(;n<r.parts.length;n++)o.parts.push(a(r.parts[n]));o.parts.length>r.parts.length&&(o.parts.length=r.parts.length)}else{for(var i=[],n=0;n<r.parts.length;n++)i.push(a(r.parts[n]));l[r.id]={id:r.id,refs:1,parts:i}}}}function n(){var e=document.createElement("style");return e.type="text/css",u.appendChild(e),e}function a(e){var t,r,o=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(o){if(h)return v;o.parentNode.removeChild(o)}if(m){var a=f++;o=p||(p=n()),t=i.bind(null,o,a,!1),r=i.bind(null,o,a,!0)}else o=n(),t=s.bind(null,o),r=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else r()}}function i(e,t,r,o){var n=r?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,n);else{var a=document.createTextNode(n),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function s(e,t){var r=t.css,o=t.media,n=t.sourceMap;if(o&&e.setAttribute("media",o),n&&(r+="\n/*# sourceURL="+n.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var d="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!d)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=r(166),l={},u=d&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,r){h=r;var n=c(e,t);return o(n),function(t){for(var r=[],a=0;a<n.length;a++){var i=n[a],s=l[i.id];s.refs--,r.push(s)}t?(n=c(e,t),o(n)):n=[];for(var a=0;a<r.length;a++){var s=r[a];if(0===s.refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete l[s.id]}}}};var g=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},166:function(e,t){e.exports=function(e,t){for(var r=[],o={},n=0;n<t.length;n++){var a=t[n],i=a[0],s=a[1],d=a[2],c=a[3],l={id:e+":"+n,css:s,media:d,sourceMap:c};o[i]?o[i].parts.push(l):r.push(o[i]={id:i,parts:[l]})}return r}},207:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{HOST:window.HOST,recordDetail:[]}},created:function(){api.setStatusBarStyle({style:"dark"}),this.getlist()},mounted:function(){api.setStatusBarStyle({style:"dark"}),this.$refs.mainTop.style.paddingTop=api.safeArea.top+"px"},methods:{getlist:function(){var e=this,t=this.$route.query.id,r=function(t){e.recordDetail=t.data;for(var r=0;r<e.recordDetail.length;r++)e.recordDetail[r].time=moment.unix(e.recordDetail[r].time).format("YYYY-MM-DD HH:mm")},o={eventId:t};$http.getRecordList(api,o,r)},goback:function(){router.go(-1)}},components:{}}},225:function(e,t,r){t=e.exports=r(152)(),t.push([e.i,".lookRecord .bar{background:#fff}.lookRecord .content{background:#fafafa}.lookRecord ul{background:#fff}.lookRecord ul li img{width:2.4rem;height:2.4rem;border-radius:50%;margin-right:10px}.lookRecord ul li{display:flex;margin:5px 0 0;padding-bottom:0}.record-right{flex:1;border-bottom:1px solid #e6e6e6}.record-top{display:flex;justify-content:space-between;color:#333;font-size:.8rem;padding-right:10px}.record-bottom,.record-top .time{color:#999;font-size:.7rem}.record-bottom{padding:5px 10px 5px 0}.lookRecord .bar-nav{top:auto}",""])},261:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"lookRecord"},[r("div",{staticClass:"topUI",staticStyle:{background:"#fff","padding-top":"25px"}}),e._v(" "),r("header",{staticClass:"bar bar-nav"},[r("span",{staticClass:"icon icon-left pull-left",staticStyle:{width:"auto",height:"auto"},on:{click:function(t){e.goback()}}}),e._v(" "),r("h1",{staticClass:"title"},[e._v("处理记录")])]),e._v(" "),r("div",{staticClass:"content",staticStyle:{"padding-top":"25px"}},[r("ul",e._l(e.recordDetail,function(t,o){return r("li",{key:o},[r("img",{attrs:{src:""+e.HOST+t.photo}}),e._v(" "),r("div",{staticClass:"record-right"},[r("p",{staticClass:"record-top"},[r("span",[e._v(e._s(t.realname))]),r("span",{staticClass:"time"},[e._v(e._s(t.time))])]),e._v(" "),r("p",{staticClass:"record-bottom"},[e._v(e._s(t.title)+" ("+e._s(t.type)+")")])])])}),0)])])},staticRenderFns:[]}},281:function(e,t,r){var o=r(225);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r(165)("4d5e041d",o,!0)}});