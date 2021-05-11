var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function o(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(e,t){e.appendChild(t)}function s(e,t,n){e.insertBefore(t,n||null)}function c(e){e.parentNode.removeChild(e)}function u(e){return document.createElement(e)}function f(e){return document.createTextNode(e)}function l(){return f(" ")}function d(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function p(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let h;function m(e){h=e}const g=[],y=[],v=[],w=[],b=Promise.resolve();let x=!1;function E(e){v.push(e)}let A=!1;const C=new Set;function S(){if(!A){A=!0;do{for(let e=0;e<g.length;e+=1){const t=g[e];m(t),$(t.$$)}for(m(null),g.length=0;y.length;)y.pop()();for(let e=0;e<v.length;e+=1){const t=v[e];C.has(t)||(C.add(t),t())}v.length=0}while(g.length);for(;w.length;)w.pop()();x=!1,A=!1,C.clear()}}function $(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(E)}}const U=new Set;function j(e,t){-1===e.$$.dirty[0]&&(g.push(e),x||(x=!0,b.then(S)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function O(i,a,s,u,f,l,d=[-1]){const p=h;m(i);const g=i.$$={fragment:null,ctx:null,props:l,update:e,not_equal:f,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:n(),dirty:d,skip_bound:!1};let y=!1;if(g.ctx=s?s(i,a.props||{},((e,t,...n)=>{const r=n.length?n[0]:t;return g.ctx&&f(g.ctx[e],g.ctx[e]=r)&&(!g.skip_bound&&g.bound[e]&&g.bound[e](r),y&&j(i,e)),t})):[],g.update(),y=!0,r(g.before_update),g.fragment=!!u&&u(g.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);g.fragment&&g.fragment.l(e),e.forEach(c)}else g.fragment&&g.fragment.c();a.intro&&((v=i.$$.fragment)&&v.i&&(U.delete(v),v.i(w))),function(e,n,i){const{fragment:a,on_mount:s,on_destroy:c,after_update:u}=e.$$;a&&a.m(n,i),E((()=>{const n=s.map(t).filter(o);c?c.push(...n):r(n),e.$$.on_mount=[]})),u.forEach(E)}(i,a.target,a.anchor),S()}var v,w;m(p)}var R=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}},N=Object.prototype.toString;function T(e){return"[object Array]"===N.call(e)}function B(e){return void 0===e}function k(e){return null!==e&&"object"==typeof e}function _(e){if("[object Object]"!==N.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function L(e){return"[object Function]"===N.call(e)}function P(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),T(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var D={isArray:T,isArrayBuffer:function(e){return"[object ArrayBuffer]"===N.call(e)},isBuffer:function(e){return null!==e&&!B(e)&&null!==e.constructor&&!B(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:k,isPlainObject:_,isUndefined:B,isDate:function(e){return"[object Date]"===N.call(e)},isFile:function(e){return"[object File]"===N.call(e)},isBlob:function(e){return"[object Blob]"===N.call(e)},isFunction:L,isStream:function(e){return k(e)&&L(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:P,merge:function e(){var t={};function n(n,r){_(t[r])&&_(n)?t[r]=e(t[r],n):_(n)?t[r]=e({},n):T(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)P(arguments[r],n);return t},extend:function(e,t,n){return P(t,(function(t,r){e[r]=n&&"function"==typeof t?R(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}};function q(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var F=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(D.isURLSearchParams(t))r=t.toString();else{var o=[];D.forEach(t,(function(e,t){null!=e&&(D.isArray(e)?t+="[]":e=[e],D.forEach(e,(function(e){D.isDate(e)?e=e.toISOString():D.isObject(e)&&(e=JSON.stringify(e)),o.push(q(t)+"="+q(e))})))})),r=o.join("&")}if(r){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e};function M(){this.handlers=[]}M.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},M.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},M.prototype.forEach=function(e){D.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var H=M,I=function(e,t,n){return D.forEach(n,(function(n){e=n(e,t)})),e},z=function(e){return!(!e||!e.__CANCEL__)},V=function(e,t){D.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))},J=function(e,t,n,r,o){return function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}(new Error(e),t,n,r,o)},X=D.isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),D.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),D.isString(r)&&a.push("path="+r),D.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},K=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],G=D.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=D.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0},W=function(e){return new Promise((function(t,n){var r=e.data,o=e.headers;D.isFormData(r)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var a=e.auth.username||"",s=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(a+":"+s)}var c,u,f=(c=e.baseURL,u=e.url,c&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(u)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(c,u):u);if(i.open(e.method.toUpperCase(),F(f,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i.onreadystatechange=function(){if(i&&4===i.readyState&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var r,o,a,s,c,u="getAllResponseHeaders"in i?(r=i.getAllResponseHeaders(),c={},r?(D.forEach(r.split("\n"),(function(e){if(s=e.indexOf(":"),o=D.trim(e.substr(0,s)).toLowerCase(),a=D.trim(e.substr(s+1)),o){if(c[o]&&K.indexOf(o)>=0)return;c[o]="set-cookie"===o?(c[o]?c[o]:[]).concat([a]):c[o]?c[o]+", "+a:a}})),c):c):null,f={data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:i.status,statusText:i.statusText,headers:u,config:e,request:i};!function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(J("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}(t,n,f),i=null}},i.onabort=function(){i&&(n(J("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){n(J("Network Error",e,null,i)),i=null},i.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(J(t,e,"ECONNABORTED",i)),i=null},D.isStandardBrowserEnv()){var l=(e.withCredentials||G(f))&&e.xsrfCookieName?X.read(e.xsrfCookieName):void 0;l&&(o[e.xsrfHeaderName]=l)}if("setRequestHeader"in i&&D.forEach(o,(function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)})),D.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),e.responseType)try{i.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){i&&(i.abort(),n(e),i=null)})),r||(r=null),i.send(r)}))},Q={"Content-Type":"application/x-www-form-urlencoded"};function Y(e,t){!D.isUndefined(e)&&D.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var Z,ee={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(Z=W),Z),transformRequest:[function(e,t){return V(t,"Accept"),V(t,"Content-Type"),D.isFormData(e)||D.isArrayBuffer(e)||D.isBuffer(e)||D.isStream(e)||D.isFile(e)||D.isBlob(e)?e:D.isArrayBufferView(e)?e.buffer:D.isURLSearchParams(e)?(Y(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):D.isObject(e)?(Y(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};ee.headers={common:{Accept:"application/json, text/plain, */*"}},D.forEach(["delete","get","head"],(function(e){ee.headers[e]={}})),D.forEach(["post","put","patch"],(function(e){ee.headers[e]=D.merge(Q)}));var te=ee;function ne(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var re=function(e){return ne(e),e.headers=e.headers||{},e.data=I(e.data,e.headers,e.transformRequest),e.headers=D.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),D.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||te.adapter)(e).then((function(t){return ne(e),t.data=I(t.data,t.headers,e.transformResponse),t}),(function(t){return z(t)||(ne(e),t&&t.response&&(t.response.data=I(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},oe=function(e,t){t=t||{};var n={},r=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function s(e,t){return D.isPlainObject(e)&&D.isPlainObject(t)?D.merge(e,t):D.isPlainObject(t)?D.merge({},t):D.isArray(t)?t.slice():t}function c(r){D.isUndefined(t[r])?D.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(e[r],t[r])}D.forEach(r,(function(e){D.isUndefined(t[e])||(n[e]=s(void 0,t[e]))})),D.forEach(o,c),D.forEach(i,(function(r){D.isUndefined(t[r])?D.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(void 0,t[r])})),D.forEach(a,(function(r){r in t?n[r]=s(e[r],t[r]):r in e&&(n[r]=s(void 0,e[r]))}));var u=r.concat(o).concat(i).concat(a),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===u.indexOf(e)}));return D.forEach(f,c),n};function ie(e){this.defaults=e,this.interceptors={request:new H,response:new H}}ie.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=oe(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[re,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},ie.prototype.getUri=function(e){return e=oe(this.defaults,e),F(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},D.forEach(["delete","get","head","options"],(function(e){ie.prototype[e]=function(t,n){return this.request(oe(n||{},{method:e,url:t,data:(n||{}).data}))}})),D.forEach(["post","put","patch"],(function(e){ie.prototype[e]=function(t,n,r){return this.request(oe(r||{},{method:e,url:t,data:n}))}}));var ae=ie;function se(e){this.message=e}se.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},se.prototype.__CANCEL__=!0;var ce=se;function ue(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new ce(e),t(n.reason))}))}ue.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},ue.source=function(){var e;return{token:new ue((function(t){e=t})),cancel:e}};var fe=ue;function le(e){var t=new ae(e),n=R(ae.prototype.request,t);return D.extend(n,ae.prototype,t),D.extend(n,t),n}var de=le(te);de.Axios=ae,de.create=function(e){return le(oe(de.defaults,e))},de.Cancel=ce,de.CancelToken=fe,de.isCancel=z,de.all=function(e){return Promise.all(e)},de.spread=function(e){return function(t){return e.apply(null,t)}},de.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError};var pe=de,he=de;pe.default=he;var me=pe;function ge(e,t,n){const r=e.slice();return r[17]=t[n],r}function ye(e){let t,n,r,o,i,h,m,g,y,v,w,b=e[3](e[17].dateTime)+"",x=e[17].species+"",E=Math.round(1e4*e[17].confidence)/100+"";return{c(){t=u("div"),n=u("span"),r=f(b),o=l(),i=u("span"),h=f(x),m=l(),g=u("span"),y=f(E),v=f("%"),w=l(),d(n,"class","svelte-1chmtx0"),d(i,"class","svelte-1chmtx0"),d(g,"class","svelte-1chmtx0"),d(t,"class","result-item svelte-1chmtx0")},m(e,c){s(e,t,c),a(t,n),a(n,r),a(t,o),a(t,i),a(i,h),a(t,m),a(t,g),a(g,y),a(g,v),a(t,w)},p(e,t){4&t&&b!==(b=e[3](e[17].dateTime)+"")&&p(r,b),4&t&&x!==(x=e[17].species+"")&&p(h,x),4&t&&E!==(E=Math.round(1e4*e[17].confidence)/100+"")&&p(y,E)},d(e){e&&c(t)}}}function ve(t){let n,r,o,i,h,m,g,y,v=t[2],w=[];for(let e=0;e<v.length;e+=1)w[e]=ye(ge(t,v,e));return{c(){n=u("main"),r=u("div"),o=u("div"),i=f(t[0]),h=l(),m=u("p"),g=f(t[1]),y=l();for(let e=0;e<w.length;e+=1)w[e].c();d(o,"class","record-text svelte-1chmtx0"),d(r,"class","content svelte-1chmtx0"),d(n,"class","svelte-1chmtx0")},m(e,t){s(e,n,t),a(n,r),a(r,o),a(o,i),a(r,h),a(r,m),a(m,g),a(r,y);for(let e=0;e<w.length;e+=1)w[e].m(r,null)},p(e,[t]){if(1&t&&p(i,e[0]),2&t&&p(g,e[1]),12&t){let n;for(v=e[2],n=0;n<v.length;n+=1){const o=ge(e,v,n);w[n]?w[n].p(o,t):(w[n]=ye(o),w[n].c(),w[n].m(r,null))}for(;n<w.length;n+=1)w[n].d(1);w.length=v.length}},i:e,o:e,d(e){e&&c(n),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(w,e)}}}function we(e,t,n){let r,o=[],i="开始发现",a="",s=[],c=[];const u=e=>{let t=e.inputBuffer,r=t.getChannelData(0),o=t.getChannelData(1);s.push(r.slice(0)),c.push(o.slice(0)),n(0,i="收集声音中 ...")},f=e=>{let t=e.length*e[0].length,n=new Float32Array(t),r=0;for(let t=0;t<e.length;t++)n.set(e[t],r),r+=e[t].length;return n},l=(e,t,n)=>{let r=n.length;for(let o=0;o<r;o++)e.setUint8(t+o,n.charCodeAt(o))},d=()=>{let e=(e=>{let t=new ArrayBuffer(2*e.length+44),n=new DataView(t);l(n,0,"RIFF"),n.setUint32(4,44+2*e.length,!0),l(n,8,"WAVE"),l(n,12,"fmt "),n.setUint32(16,16,!0),n.setUint16(20,1,!0),n.setUint16(22,2,!0),n.setUint32(24,44100,!0),n.setUint32(28,88200,!0),n.setUint16(32,4,!0),n.setUint16(34,16,!0),l(n,36,"data"),n.setUint32(40,2*e.length,!0);let r=e.length,o=44;for(let t=0;t<r;t++)n.setInt16(o,32767*e[t],!0),o+=2;return t})(((e,t)=>{let n=e.length+t.length,r=new Float32Array(n);for(let n=0;n<e.length;n++){let o=2*n;r[o]=e[n],r[o+1]=t[n]}return r})(f(s),f(c)));p(e),s=[],c=[]},p=e=>{let t=new Blob([new Uint8Array(e)]),r=new FormData;r.append("file",t),n(1,a="识别中 ..."),me.post("http://127.0.0.1:8000/files",r,{headers:{"Access-Control-Allow-Origin":"*","Content-Type":"multipart/form-data"}}).then((e=>{let t=new Date;console.log("data",e.data);let r=e.data.text.flat().filter(((e,t)=>!!e&&t>0)).map(((e,n)=>{const r=e.replace(/\t/g,",").replace(/;/g,",").split(",");return{dateTime:t,start:r[4],end:r[5],low:r[6],high:r[7],species:r[9],confidence:Number(r[10])}})).filter((e=>"Human"!==e.species)).filter((e=>e.confidence>.5)).map(((e,t)=>({...e,index:o.length+t})));r.length>0?(n(4,o=[...o,...r]),n(1,a="发现新的")):n(1,a="未发现新的"),console.log("---detectResults",o)}))},h=e=>{let t=e.createScriptProcessor||e.createJavaScriptNode;return t=t.bind(e),t(4096,2,2)},m=()=>{n(1,a="准备中"),n(0,i="等待授权中"),console.log(window.navigator),window.navigator.mediaDevices.getUserMedia({audio:!0}).then((e=>{console.log(e),(e=>{let t=new(window.AudioContext||window.webkitAudioContext),n=t.createMediaStreamSource(e),r=h(t);r.connect(t.destination),r.onaudioprocess=u,n.connect(r)})(e)})).catch((e=>{console.error(e)}))};return setInterval((function(){d()}),1e4),setTimeout((()=>{m()}),1e3),e.$$.update=()=>{16&e.$$.dirty&&n(2,r=o.filter(((e,t)=>t>o.length-20)))},[i,a,r,e=>{let t=e.toLocaleDateString().split("/");return t[2]+"-"+t[0]+"-"+t[1]+" "+e.toLocaleTimeString().substr(0,8)},o]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),O(this,e,we,ve,i,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map