webpackJsonp([8],{165:function(e,t,n){n(288);var i=n(129)(n(219),n(268),null,null);e.exports=i.exports},166:function(e,t,n){function i(e){for(var t=0;t<e.length;t++){var n=e[t],i=d[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(a(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{for(var r=[],o=0;o<n.parts.length;o++)r.push(a(n.parts[o]));d[n.id]={id:n.id,refs:1,parts:r}}}}function o(){var e=document.createElement("style");return e.type="text/css",u.appendChild(e),e}function a(e){var t,n,i=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(i){if(p)return h;i.parentNode.removeChild(i)}if(m){var a=g++;i=f||(f=o()),t=r.bind(null,i,a,!1),n=r.bind(null,i,a,!0)}else i=o(),t=s.bind(null,i),n=function(){i.parentNode.removeChild(i)};return t(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;t(e=i)}else n()}}function r(e,t,n,i){var o=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=v(t,o);else{var a=document.createTextNode(o),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(a,r[t]):e.appendChild(a)}}function s(e,t){var n=t.css,i=t.media,o=t.sourceMap;if(i&&e.setAttribute("media",i),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(167),d={},u=l&&(document.head||document.getElementsByTagName("head")[0]),f=null,g=0,p=!1,h=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){p=n;var o=c(e,t);return i(o),function(t){for(var n=[],a=0;a<o.length;a++){var r=o[a],s=d[r.id];s.refs--,n.push(s)}t?(o=c(e,t),i(o)):o=[];for(var a=0;a<n.length;a++){var s=n[a];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete d[s.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},167:function(e,t){e.exports=function(e,t){for(var n=[],i={},o=0;o<t.length;o++){var a=t[o],r=a[0],s=a[1],l=a[2],c=a[3],d={id:e+":"+o,css:s,media:l,sourceMap:c};i[r]?i[r].parts.push(d):n.push(i[r]={id:r,parts:[d]})}return n}},176:function(e,t,i){var o,a;(function(){function i(e){return!!e.exifdata}function r(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(e),i=n.length,o=new ArrayBuffer(i),a=new Uint8Array(o),r=0;r<i;r++)a[r]=n.charCodeAt(r);return o}function s(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){200!=this.status&&0!==this.status||t(this.response)},n.send()}function l(e,t){function n(n){var i=c(n);e.exifdata=i||{};var o=d(n);if(e.iptcdata=o||{},y.isXmpEnabled){var a=S(n);e.xmpdata=a||{}}t&&t.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var i=r(e.src);n(i)}else if(/^blob\:/i.test(e.src)){var o=new FileReader;o.onload=function(e){n(e.target.result)},s(e.src,function(e){o.readAsArrayBuffer(e)})}else{var a=new XMLHttpRequest;a.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";n(a.response),a=null},a.open("GET",e.src,!0),a.responseType="arraybuffer",a.send(null)}else if(self.FileReader&&(e instanceof self.Blob||e instanceof self.File)){var o=new FileReader;o.onload=function(e){x&&console.log("Got file of length "+e.target.result.byteLength),n(e.target.result)},o.readAsArrayBuffer(e)}}function c(e){var t=new DataView(e);if(x&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return x&&console.log("Not a valid JPEG"),!1;for(var n,i=2,o=e.byteLength;i<o;){if(255!=t.getUint8(i))return x&&console.log("Not a valid marker at offset "+i+", found: "+t.getUint8(i)),!1;if(n=t.getUint8(i+1),x&&console.log(n),225==n)return x&&console.log("Found 0xFFE1 marker"),v(t,i+4,t.getUint16(i+2));i+=2+t.getUint16(i+2)}}function d(e){var t=new DataView(e);if(x&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return x&&console.log("Not a valid JPEG"),!1;for(var n=2,i=e.byteLength;n<i;){if(function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)}(t,n)){var o=t.getUint8(n+7);o%2!=0&&(o+=1),0===o&&(o=4);return u(e,n+8+o,t.getUint16(n+6+o))}n++}}function u(e,t,n){for(var i,o,a,r,s=new DataView(e),l={},c=t;c<t+n;)28===s.getUint8(c)&&2===s.getUint8(c+1)&&(r=s.getUint8(c+2))in D&&(a=s.getInt16(c+3),a+5,o=D[r],i=m(s,c+5,a),l.hasOwnProperty(o)?l[o]instanceof Array?l[o].push(i):l[o]=[l[o],i]:l[o]=i),c++;return l}function f(e,t,n,i,o){var a,r,s,l=e.getUint16(n,!o),c={};for(s=0;s<l;s++)a=n+12*s+2,r=i[e.getUint16(a,!o)],!r&&x&&console.log("Unknown tag: "+e.getUint16(a,!o)),c[r]=g(e,a,t,n,o);return c}function g(e,t,n,i,o){var a,r,s,l,c,d,u=e.getUint16(t+2,!o),f=e.getUint32(t+4,!o),g=e.getUint32(t+8,!o)+n;switch(u){case 1:case 7:if(1==f)return e.getUint8(t+8,!o);for(a=f>4?g:t+8,r=[],l=0;l<f;l++)r[l]=e.getUint8(a+l);return r;case 2:return a=f>4?g:t+8,m(e,a,f-1);case 3:if(1==f)return e.getUint16(t+8,!o);for(a=f>2?g:t+8,r=[],l=0;l<f;l++)r[l]=e.getUint16(a+2*l,!o);return r;case 4:if(1==f)return e.getUint32(t+8,!o);for(r=[],l=0;l<f;l++)r[l]=e.getUint32(g+4*l,!o);return r;case 5:if(1==f)return c=e.getUint32(g,!o),d=e.getUint32(g+4,!o),s=new Number(c/d),s.numerator=c,s.denominator=d,s;for(r=[],l=0;l<f;l++)c=e.getUint32(g+8*l,!o),d=e.getUint32(g+4+8*l,!o),r[l]=new Number(c/d),r[l].numerator=c,r[l].denominator=d;return r;case 9:if(1==f)return e.getInt32(t+8,!o);for(r=[],l=0;l<f;l++)r[l]=e.getInt32(g+4*l,!o);return r;case 10:if(1==f)return e.getInt32(g,!o)/e.getInt32(g+4,!o);for(r=[],l=0;l<f;l++)r[l]=e.getInt32(g+8*l,!o)/e.getInt32(g+4+8*l,!o);return r}}function p(e,t,n){var i=e.getUint16(t,!n);return e.getUint32(t+2+12*i,!n)}function h(e,t,n,i){var o=p(e,t+n,i);if(!o)return{};if(o>e.byteLength)return{};var a=f(e,t,t+o,F,i);if(a.Compression)switch(a.Compression){case 6:if(a.JpegIFOffset&&a.JpegIFByteCount){var r=t+a.JpegIFOffset,s=a.JpegIFByteCount;a.blob=new Blob([new Uint8Array(e.buffer,r,s)],{type:"image/jpeg"})}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.");break;default:console.log("Unknown thumbnail image format '%s'",a.Compression)}else 2==a.PhotometricInterpretation&&console.log("Thumbnail image format is RGB, which is not implemented.");return a}function m(e,t,i){var o="";for(n=t;n<t+i;n++)o+=String.fromCharCode(e.getUint8(n));return o}function v(e,t){if("Exif"!=m(e,t,4))return x&&console.log("Not valid EXIF data! "+m(e,t,4)),!1;var n,i,o,a,r,s=t+6;if(18761==e.getUint16(s))n=!1;else{if(19789!=e.getUint16(s))return x&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;n=!0}if(42!=e.getUint16(s+2,!n))return x&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var l=e.getUint32(s+4,!n);if(l<8)return x&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(s+4,!n)),!1;if(i=f(e,s,s+l,P,n),i.ExifIFDPointer){a=f(e,s,s+i.ExifIFDPointer,w,n);for(o in a){switch(o){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":a[o]=U[o][a[o]];break;case"ExifVersion":case"FlashpixVersion":a[o]=String.fromCharCode(a[o][0],a[o][1],a[o][2],a[o][3]);break;case"ComponentsConfiguration":a[o]=U.Components[a[o][0]]+U.Components[a[o][1]]+U.Components[a[o][2]]+U.Components[a[o][3]]}i[o]=a[o]}}if(i.GPSInfoIFDPointer){r=f(e,s,s+i.GPSInfoIFDPointer,I,n);for(o in r){switch(o){case"GPSVersionID":r[o]=r[o][0]+"."+r[o][1]+"."+r[o][2]+"."+r[o][3]}i[o]=r[o]}}return i.thumbnail=h(e,s,l,n),i}function S(e){if("DOMParser"in self){var t=new DataView(e);if(x&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return x&&console.log("Not a valid JPEG"),!1;for(var n=2,i=e.byteLength,o=new DOMParser;n<i-4;){if("http"==m(t,n,4)){var a=n-1,r=t.getUint16(n-2)-1,s=m(t,a,r),l=s.indexOf("xmpmeta>")+8;s=s.substring(s.indexOf("<x:xmpmeta"),l);var c=s.indexOf("x:xmpmeta")+10;s=s.slice(0,c)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+s.slice(c);return C(o.parseFromString(s,"text/xml"))}n++}}}function b(e){var t={};if(1==e.nodeType){if(e.attributes.length>0){t["@attributes"]={};for(var n=0;n<e.attributes.length;n++){var i=e.attributes.item(n);t["@attributes"][i.nodeName]=i.nodeValue}}}else if(3==e.nodeType)return e.nodeValue;if(e.hasChildNodes())for(var o=0;o<e.childNodes.length;o++){var a=e.childNodes.item(o),r=a.nodeName;if(null==t[r])t[r]=b(a);else{if(null==t[r].push){var s=t[r];t[r]=[],t[r].push(s)}t[r].push(b(a))}}return t}function C(e){try{var t={};if(e.children.length>0)for(var n=0;n<e.children.length;n++){var i=e.children.item(n),o=i.attributes;for(var a in o){var r=o[a],s=r.nodeName,l=r.nodeValue;void 0!==s&&(t[s]=l)}var c=i.nodeName;if(void 0===t[c])t[c]=b(i);else{if(void 0===t[c].push){var d=t[c];t[c]=[],t[c].push(d)}t[c].push(b(i))}}else t=e.textContent;return t}catch(e){console.log(e.message)}}var x=!1,y=function(e){return e instanceof y?e:this instanceof y?void(this.EXIFwrapped=e):new y(e)};void 0!==e&&e.exports&&(t=e.exports=y),t.EXIF=y;var w=y.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},P=y.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},I=y.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},F=y.IFD1Tags={256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:"ResolutionUnit",513:"JpegIFOffset",514:"JpegIFByteCount",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite"},U=y.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},D={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};y.enableXmp=function(){y.isXmpEnabled=!0},y.disableXmp=function(){y.isXmpEnabled=!1},y.getData=function(e,t){return!((self.Image&&e instanceof self.Image||self.HTMLImageElement&&e instanceof self.HTMLImageElement)&&!e.complete)&&(i(e)?t&&t.call(e):l(e,t),!0)},y.getTag=function(e,t){if(i(e))return e.exifdata[t]},y.getIptcTag=function(e,t){if(i(e))return e.iptcdata[t]},y.getAllTags=function(e){if(!i(e))return{};var t,n=e.exifdata,o={};for(t in n)n.hasOwnProperty(t)&&(o[t]=n[t]);return o},y.getAllIptcTags=function(e){if(!i(e))return{};var t,n=e.iptcdata,o={};for(t in n)n.hasOwnProperty(t)&&(o[t]=n[t]);return o},y.pretty=function(e){if(!i(e))return"";var t,n=e.exifdata,o="";for(t in n)n.hasOwnProperty(t)&&("object"==typeof n[t]?n[t]instanceof Number?o+=t+" : "+n[t]+" ["+n[t].numerator+"/"+n[t].denominator+"]\r\n":o+=t+" : ["+n[t].length+" values]\r\n":o+=t+" : "+n[t]+"\r\n");return o},y.readFromBinaryFile=function(e){return c(e)},o=[],void 0!==(a=function(){return y}.apply(t,o))&&(e.exports=a)}).call(this)},219:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(176),o=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default={data:function(){return{changePass:!1,newPassword:"",oldPassword:"",userInfo:{},userImg:"",HOST:window.HOST,version:"",fileLook:!0}},created:function(){this.version=api.appVersion,this.getUserInfo()},mounted:function(){api.setStatusBarStyle({style:"dark"}),this.$refs.mainTop.style.paddingTop=api.safeArea.top+"px"},methods:{getUserInfo:function(){var e=this,t={},n=function(t){e.userInfo=t.data,console.log(e.userInfo),e.userImg=e.userInfo.photo};$http.getUserInfo(api,t,n)},uploadFile:function(e){var t=e.target.files[0];if(t){var n=0,i=this;o.default.getData(e.target.files[0],function(){o.default.getAllTags(this);if(n=o.default.getTag(this,"Orientation"))lrz(e.target.files[0]).then(function(e){console.log(e.formData);var t=e.formData;i.getUpdateImg(t)}).catch(function(e){var n=new FormData;n.append("file",t),i.getUpdateImg(n)});else{var a=new FormData;a.append("file",t),i.getUpdateImg(a)}})}},getUpdateImg:function(e){var t=this;this.isLoading=!0,$g.upload(e,function(e,n){if(console.log(JSON.stringify(n)),400!=n.code){var i={photo:n.data},o=function(e){t.isLoading=!1,api.toast({msg:"已成功修改",duration:2e3,location:"middle"}),t.getUserInfo()};$http.getUserPhoto(api,i,o)}})},goback:function(){router.go(-1)},passwordChange:function(){var e=this,t={new_pwd:this.newPassword,old_pwd:this.oldPassword},n=function(t){e.changePass=!1,e.fileLook=!0};$http.changePassword(api,t,n)},passwordNo:function(){this.changePass=!1,this.fileLook=!0},goPassChangeToast:function(){this.fileLook=!1,this.changePass||(this.changePass=!0)},outLogin:function(){if(!this.changePass){var e={line:2},t=function(e){if(200==e.code)if(0==e.data.result);else{var t=function(e){Cookies.remove("token"),clearInterval(window.timer),router.push({name:"login"}),api.toast({msg:"已退出登陆",duration:2e3,location:"middle"});var t=api.require("ajpush"),n={alias:"",tags:[]};t.bindAliasAndTags(n,function(e){e.statusCode})};$http.logout(api,t)}};$http.checkInlineState(api,e,t)}}}}},232:function(e,t,n){t=e.exports=n(153)(),t.push([e.i,".set-list{width:100%;height:100%}.set-list .icon{width:auto;height:auto}.set-list .bar-nav{background:#fff;top:auto}.list-block li{padding:0}.set-list .content{background:#fafafa;margin-top:20px}.set-list .list-block{margin:0}.set-list .item-inner img{width:2.75rem;height:2.75rem;border-radius:50%}.block-toast{width:100%;height:100%;background:#000;opacity:.5;position:fixed;top:0;left:0;z-index:20}.set-toast{width:70%;height:190px;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;z-index:30;border-radius:15px;padding-top:20px}.set-toast .button{display:flex;position:absolute;justify-content:space-around;bottom:0;border:0;padding:0;margin:0;width:100%;height:auto;font-size:.9rem}.set-toast .button span{display:block;flex:1;background:#0894ec;color:#fff;height:50px;line-height:50px}.inputPassword{font-size:.8rem;padding:10px 20px}.inputPassword input{margin-left:3%;width:65%;height:1.5rem;border:1px solid #e6e6e6}.outlogin{height:50px;line-height:50px;background:#fff}.outlogin,.versionStyle{width:100%;text-align:center}.versionStyle{position:absolute;bottom:20px;left:0;height:40px;line-height:40px;font-size:16px;color:#888}",""])},268:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"set-list"},[n("div",{ref:"mainTop",staticStyle:{background:"#fff"}}),e._v(" "),n("header",{staticClass:"bar bar-nav"},[n("span",{staticClass:"icon icon-left pull-left",on:{click:function(t){e.goback()}}}),e._v(" "),n("h1",{staticClass:"title"},[e._v("设置")])]),e._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"list-block",staticStyle:{"margin-top":"10px"}},[n("ul",[n("li",{staticClass:"item-content"},[n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("姓名")]),e._v(" "),n("div",{staticClass:"item-after"},[e._v(e._s(e.userInfo.name))])])]),e._v(" "),n("li",{staticClass:"item-content"},[n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("手机号")]),e._v(" "),n("div",{staticClass:"item-after"},[e._v(e._s(e.userInfo.mobile))])])]),e._v(" "),n("li",{staticClass:"item-content"},[n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("部门")]),e._v(" "),n("div",{staticClass:"item-after"},[e._v(e._s(e.userInfo.deptName))])])]),e._v(" "),n("li",{staticClass:"item-content"},[n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("所属网格")]),e._v(" "),n("div",{staticClass:"item-after"},[e._v(e._s(e.userInfo.gridName))])])]),e._v(" "),n("li",{staticClass:"item-content item-link"},[e.fileLook?n("input",{staticStyle:{opacity:"0",position:"absolute",top:"0",left:"0",width:"100%",height:"100%","z-index":"66"},attrs:{id:"uploaderInput",value:"123",type:"file",accept:"image/*"},on:{change:function(t){e.uploadFile(t)}}}):e._e(),e._v(" "),n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("修改头像")]),e._v(" "),e.userImg?n("img",{attrs:{src:""+e.HOST+e.userImg}}):e._e(),e._v(" "),e.userImg?e._e():n("span",{staticStyle:{width:"50px",height:"50px"}},[n("svg",{staticClass:"icon",staticStyle:{width:"50px",height:"50px"},attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-iconfonticon-yonghu"}})])])])])])]),e._v(" "),n("div",{staticClass:"list-block",staticStyle:{"margin-top":"10px"}},[n("ul",[n("li",{staticClass:"item-content item-link",on:{click:function(t){e.goPassChangeToast()}}},[e._m(0)])])]),e._v(" "),n("div",{staticClass:"list-block",staticStyle:{position:"absolute",bottom:"60px",left:"0",width:"100%"}},[n("ul",[n("li",[n("div",{staticClass:"outlogin item-title",on:{click:function(t){e.outLogin()}}},[e._v("\n                退出登录\n            ")])])])]),e._v(" "),n("div",{staticClass:"versionStyle"},[e._v("版本号： "+e._s(e.version))])]),e._v(" "),e.changePass?n("div",{staticClass:"block-toast"}):e._e(),e._v(" "),e.changePass?n("div",{staticClass:"set-toast"},[n("div",{staticClass:"inputPassword"},[n("span",[e._v("旧密码")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.oldPassword,expression:"oldPassword"}],attrs:{type:"password"},domProps:{value:e.oldPassword},on:{input:function(t){t.target.composing||(e.oldPassword=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"inputPassword"},[n("span",[e._v("新密码")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newPassword,expression:"newPassword"}],attrs:{type:"password"},domProps:{value:e.newPassword},on:{input:function(t){t.target.composing||(e.newPassword=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"button",staticStyle:{"border-bottom-left-radius":"15px"}},[n("span",{staticStyle:{"border-bottom-left-radius":"15px",background:"#fff",color:"#000"},on:{click:function(t){e.passwordNo()}}},[e._v("取消")]),e._v(" "),n("span",{staticStyle:{"border-bottom-right-radius":"15px"},on:{click:function(t){e.passwordChange()}}},[e._v("确定")])])]):e._e()])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"item-inner"},[n("div",{staticClass:"item-title"},[e._v("修改密码")])])}]}},288:function(e,t,n){var i=n(232);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(166)("5ba0f461",i,!0)}});