webpackJsonp([4],{157:function(t,i,e){e(259);var a=e(129)(e(202),e(242),null,null);t.exports=a.exports},161:function(t,i,e){function a(t){for(var i=0;i<t.length;i++){var e=t[i],a=d[e.id];if(a){a.refs++;for(var n=0;n<a.parts.length;n++)a.parts[n](e.parts[n]);for(;n<e.parts.length;n++)a.parts.push(s(e.parts[n]));a.parts.length>e.parts.length&&(a.parts.length=e.parts.length)}else{for(var o=[],n=0;n<e.parts.length;n++)o.push(s(e.parts[n]));d[e.id]={id:e.id,refs:1,parts:o}}}}function n(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function s(t){var i,e,a=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(a){if(f)return m;a.parentNode.removeChild(a)}if(h){var s=v++;a=u||(u=n()),i=o.bind(null,a,s,!1),e=o.bind(null,a,s,!0)}else a=n(),i=r.bind(null,a),e=function(){a.parentNode.removeChild(a)};return i(t),function(a){if(a){if(a.css===t.css&&a.media===t.media&&a.sourceMap===t.sourceMap)return;i(t=a)}else e()}}function o(t,i,e,a){var n=e?"":a.css;if(t.styleSheet)t.styleSheet.cssText=g(i,n);else{var s=document.createTextNode(n),o=t.childNodes;o[i]&&t.removeChild(o[i]),o.length?t.insertBefore(s,o[i]):t.appendChild(s)}}function r(t,i){var e=i.css,a=i.media,n=i.sourceMap;if(a&&t.setAttribute("media",a),n&&(e+="\n/*# sourceURL="+n.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=e(162),d={},p=l&&(document.head||document.getElementsByTagName("head")[0]),u=null,v=0,f=!1,m=function(){},h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,i,e){f=e;var n=c(t,i);return a(n),function(i){for(var e=[],s=0;s<n.length;s++){var o=n[s],r=d[o.id];r.refs--,e.push(r)}i?(n=c(t,i),a(n)):n=[];for(var s=0;s<e.length;s++){var r=e[s];if(0===r.refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete d[r.id]}}}};var g=function(){var t=[];return function(i,e){return t[i]=e,t.filter(Boolean).join("\n")}}()},162:function(t,i){t.exports=function(t,i){for(var e=[],a={},n=0;n<i.length;n++){var s=i[n],o=s[0],r=s[1],l=s[2],c=s[3],d={id:t+":"+n,css:r,media:l,sourceMap:c};a[o]?a[o].parts.push(d):e.push(a[o]={id:o,parts:[d]})}return e}},163:function(t,i,e){e(167);var a=e(129)(e(164),e(166),null,null);t.exports=a.exports},164:function(t,i,e){"use strict"},165:function(t,i,e){i=t.exports=e(150)(),i.push([t.i,".spinner{margin:100px auto;width:30px;height:30px;position:relative}.container1>div,.container2>div,.container3>div{width:6px;height:6px;background-color:#999;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.spinner .spinner-container{position:absolute;width:100%;height:100%}.container2{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.container3{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.container3 .circle1{-webkit-animation-delay:-1s;animation-delay:-1s}.container1 .circle2{-webkit-animation-delay:-.9s;animation-delay:-.9s}.container2 .circle2{-webkit-animation-delay:-.8s;animation-delay:-.8s}.container3 .circle2{-webkit-animation-delay:-.7s;animation-delay:-.7s}.container1 .circle3{-webkit-animation-delay:-.6s;animation-delay:-.6s}.container2 .circle3{-webkit-animation-delay:-.5s;animation-delay:-.5s}.container3 .circle3{-webkit-animation-delay:-.4s;animation-delay:-.4s}.container1 .circle4{-webkit-animation-delay:-.3s;animation-delay:-.3s}.container2 .circle4{-webkit-animation-delay:-.2s;animation-delay:-.2s}.container3 .circle4{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes bouncedelay{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes bouncedelay{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}",""])},166:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"spinner"},[e("div",{staticClass:"spinner-container container1"},[e("div",{staticClass:"circle1"}),t._v(" "),e("div",{staticClass:"circle2"}),t._v(" "),e("div",{staticClass:"circle3"}),t._v(" "),e("div",{staticClass:"circle4"})]),t._v(" "),e("div",{staticClass:"spinner-container container2"},[e("div",{staticClass:"circle1"}),t._v(" "),e("div",{staticClass:"circle2"}),t._v(" "),e("div",{staticClass:"circle3"}),t._v(" "),e("div",{staticClass:"circle4"})]),t._v(" "),e("div",{staticClass:"spinner-container container3"},[e("div",{staticClass:"circle1"}),t._v(" "),e("div",{staticClass:"circle2"}),t._v(" "),e("div",{staticClass:"circle3"}),t._v(" "),e("div",{staticClass:"circle4"})])])])}]}},167:function(t,i,e){var a=e(165);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(161)("61b0edda",a,!0)},202:function(t,i,e){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var n=e(130),s=a(n),o=e(163),r=a(o);i.default={data:function(){return{openMap:!1,dispatchDetail:{},hasdown:!1,isLoading:!1,bigImg:!1,bigImgSrc:"",HOST:window.HOST}},created:function(){this.getEventDetail(),api.setStatusBarStyle({style:"dark"})},mounted:function(){this.showMap(),api.setStatusBarStyle({style:"dark"})},watch:{hasdown:function(){this.showMap()}},methods:{getBigImg:function(t){this.bigImg=!0,this.bigImgSrc=t},closeBigImg:function(){this.bigImg=!1},getArrive:function(){var t=this;this.isLoading=!0;var i=api.require("aMap"),e={},a=function(e){Cookies.set("isOpenMap",!0);var a=function(e){var a={id:t.$route.query.id,lng:e.lon,lat:e.lat},n=function(e){t.isLoading=!1,1==e.data?(api.toast({msg:"签到成功",duration:2e3,location:"middle"}),router.push({name:"entrance"})):(i.close(),api.toast({msg:"不在位置范围内",duration:2e3,location:"middle"}))};$http.postDispatch(api,a,n)};s.default.getLocation(i,a)};s.default.openMap(api,i,e,a)},getEventDetail:function(){var t=this;this.isLoading=!0;var i=this.$route.query.id,e={id:i},a=function(i){t.isLoading=!1,t.dispatchDetail=i.data,t.hasdown=!0;var e=t.dispatchDetail.state;t.dispatchDetail.time=moment.unix(t.dispatchDetail.time).format("YYYY-MM-DD HH:mm"),t.dispatchDetail.timeliness=moment.unix(t.dispatchDetail.timeliness).format("YYYY-MM-DD HH:mm"),t.dispatchDetail.statusContent=t.getStatus(e)};$http.getDispatchDetail(api,e,a)},getStatus:function(t){return 1==t?"未确认":2==t?"已确认":3==t?"准时抵达":4==t?"超时抵达":5==t?"已取消":void 0},showMap:function(){if(this.dispatchDetail.lng){var t=this.dispatchDetail.lng,i=this.dispatchDetail.lat,e=new AMap.Map("container",{zoom:11,center:[t,i]}),a=new AMap.Marker({position:new AMap.LngLat(t,i),title:"北京"});e.add(a)}},getLine:function(t){this.openMap=!0;var i=this.dispatchDetail.lng,e=this.dispatchDetail.lat,a=Cookies.get("isOpenMap"),n=api.require("aMap");a&&n.close();var o={width:"auto",height:"auto",lon:i,lat:e},r=1,l=function(){Cookies.set("isOpenMap",!0),n.getLocation({autoStop:!1},function(a,o){if(Cookies.set("isLocation",JSON.stringify({lon:a.lon,lat:a.lat})),a.status)if(1==r){r++;var l={start:{lon:a.lon,lat:a.lat},end:{lon:i,lat:e}},c=function(i){n.drawRoute({id:t,autoresizing:!0,index:0,styles:{walkLine:{width:3,color:"#698B22",lineDash:!1,strokeImg:""},icons:{start:"",end:"",bus:"",car:"",man:""}}})};s.default.getLine(n,t,l.start,l.end,c)}else n.showUserLocation({isShow:!0});else alert(JSON.stringify(o))})};s.default.openMap(api,n,o,l)},outMap:function(){var t=this.$route.query.id;this.openMap=!1;var i=api.require("aMap");i.stopLocation(),i.close(),Cookies.set("isOpenMap",!1),Cookies.remove("isLocation"),i.removeRoute({ids:[t]})},pushRecordPage:function(){router.push({name:"lookRecord"})},goback:function(){router.go(-1)}},components:{loading:r.default}}},210:function(t,i,e){i=t.exports=e(150)(),i.push([t.i,".list-block li{margin:0;padding:0}.list-block ul{margin-bottom:10px}.todoDetail .bar{background:#fff;top:20px}.todoDetail .list-block{margin:0}.todoDetail .content{background:#fafafa}.todoDetail .todo-content .item-after{margin-bottom:10px;color:#999}.todoDetail .todo-content .item-title{margin:15px 0 10px;padding-left:10px}.todo-content .item-title{font-size:.85rem;line-height:.85rem;border-left:2px solid #64abfb}.todo-li li{padding:0;border-bottom:1px solid #e6e6e6}.todoDetail .address-content{padding:5px .75rem 25px}.todoDetail .address-content .address-input{border:1px solid #e6e6e6;color:#333;font-size:12px}.todoDetail .address-title{padding:10px 0}.todoDetail .file-upload{border:1px solid #e6e6e6;color:#333;width:100px;height:100px;line-height:90px;text-align:center;font-size:60px}.look-record{padding-left:1rem!important;font-size:.7rem;color:#64abfb}",""])},242:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"todoDetail"},[e("div",{staticStyle:{background:"#fff",height:"25px"}}),t._v(" "),e("header",{staticClass:"bar bar-nav"},[t.openMap?t._e():e("span",{staticClass:"icon icon-left pull-left",staticStyle:{width:"auto",height:"auto"},on:{click:function(i){t.goback()}}}),t._v(" "),t.openMap?e("button",{staticClass:"button pull-left",staticStyle:{border:"0"},on:{click:function(i){t.outMap()}}},[t._v("\n      退出导航\n    ")]):t._e(),t._v(" "),t.openMap?t._e():e("button",{staticClass:"button pull-right",on:{click:function(i){t.getArrive()}}},[t._v("\n        签到\n    ")]),t._v(" "),t.openMap?t._e():e("h1",{staticClass:"title"},[t._v("调度指挥")])]),t._v(" "),e("div",{staticClass:"content",staticStyle:{"padding-top":"25px"}},[e("div",{staticClass:"list-block"},[e("ul",[e("li",{staticClass:"item-content"},[e("div",{staticClass:"item-inner"},[e("div",{staticClass:"item-title"},[t._v("发起人")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.userName))])])]),t._v(" "),e("li",{staticClass:"item-content"},[e("div",{staticClass:"item-inner"},[e("div",{staticClass:"item-title"},[t._v("时间")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.time))])])]),t._v(" "),e("li",{staticClass:"item-content"},[e("div",{staticClass:"item-inner"},[e("div",{staticClass:"item-title"},[t._v("时效性")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.timeliness))])])]),t._v(" "),e("li",{staticClass:"item-content"},[e("div",{staticClass:"item-inner"},[e("div",{staticClass:"item-title"},[t._v("状态")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.statusContent))])])])])]),t._v(" "),e("div",{staticClass:"list-block"},[e("ul",{staticClass:"todo-li"},[e("li",{staticClass:"item-content"},[e("div",{staticClass:"todo-content"},[e("div",{staticClass:"item-title"},[t._v("标题")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.title))])])]),t._v(" "),e("li",{staticClass:"item-content"},[e("div",{staticClass:"todo-content"},[e("div",{staticClass:"item-title"},[t._v("问题描述")]),t._v(" "),e("div",{staticClass:"item-after"},[t._v(t._s(t.dispatchDetail.explain))])])]),t._v(" "),e("li",{staticClass:"align-top"},[e("div",{staticClass:"address-content",staticStyle:{"padding-top":"10px"}},[e("div",{staticStyle:{"border-left":"2px solid #64ABFB","padding-left":"10px",height:"18px","line-height":"18px"}},[t._v("图片信息")]),t._v(" "),e("div",{staticClass:"imgBorder"},t._l(t.dispatchDetail.files,function(i,a){return e("div",{key:a,on:{click:function(e){t.getBigImg(i)}}},[e("img",{staticClass:"imgSize",attrs:{src:""+t.HOST+i}})])}),0)])])])]),t._v(" "),e("div",{staticClass:"list-block"},[e("ul",[e("li",{staticClass:"item-content"},[e("div",{staticClass:"item-inner"},[e("div",{staticClass:"item-title"},[t._v("目标地址")]),t._v(" "),e("div",{staticClass:"item-after",on:{click:function(i){t.getLine(t.dispatchDetail.id)}}},[t._v("导航")])])]),t._v(" "),e("div",{ref:"map",staticStyle:{margin:"10px 10px 20px",border:"1px solid #fafafa",height:"10rem"},attrs:{id:"container"}})])])]),t._v(" "),t.bigImg?e("div",{staticClass:"bigImgb",on:{click:function(i){t.closeBigImg()}}},[e("img",{attrs:{src:""+t.HOST+t.bigImgSrc}})]):t._e(),t._v(" "),t.isLoading?e("div",{staticStyle:{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",background:"#000",opacity:"0.2","z-index":"999","padding-top":"100px"}},[e("loading")],1):t._e()])},staticRenderFns:[]}},259:function(t,i,e){var a=e(210);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(161)("740c21b1",a,!0)}});