/*! 2018-04-04 16:46:04 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["grey"]=t():e["grey"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={"i":r,"l":!1,"exports":{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{"configurable":!1,"enumerable":!0,"get":r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){if(e)try{var t=s.createElement("script");t.appendChild(s.createTextNode(e)),p.parentNode.insertBefore(t,p)}catch(n){(c.execScript||function(e){c["eval"].call(c,e)})(e)}}function o(e,t,n,r){var o=void 0,a=function(){o.status>=200&&o.status<300||304==o.status||1223===o.status?t(o.responseText||""):n()};l?(o=new XMLHttpRequest,o.open("GET",e,!0)):(o=new XDomainRequest,o.open("GET",e)),"onload"in o?o.onload=a:o.onreadystatechange=function(){4===o.readyState&&a()},"onerror"in o&&(o.onerror=n);try{o.timeout=r,o.ontimeout=n}catch(u){setTimeout(n,r)}o.send()}var a=n(1),u=n(2),i=function(e){return e&&e.__esModule?e:{"default":e}}(u),c=window,s=document,f=c.XDomainRequest,l=c.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest,d=function(){},p=s.getElementsByTagName("script")[0],y=function(e){e=(0,a.extend)({"before":d,"after":d,"stable":{"url":"","key":"","hash":""},"grey":{"url":"","key":"","hash":""},"hash":function(e){return e},"base":100,"ratio":1,"timeout":1e4},e);var t=void 0;t=e.ratio>=e.base||(0,a.bingo)(e.ratio,e.base)?(0,a.extend)({"type":"grey"},e.grey):(0,a.extend)({"type":"stable"},e.stable);var n=void 0,u=e.hash,c=(0,a.curry)(e.after,t),s=t,p=s.key,y=s.url,m=s.hash;if(e.before(t),p&&(l||f)&&(0,a.isFunction)(u))try{n=localStorage.getItem(p)||"",n&&m===u(n,t)?(r(n),c({"from":"local"})):o(y,function(e){localStorage.setItem(p,e),r(e),c({"from":"cors"})},function(){(0,i["default"])(y,c)},e.timeout)}catch(h){(0,i["default"])(y,c)}else(0,i["default"])(y,c)};e.exports=y},function(e,t,n){"use strict";function r(e,t){return e+Math.floor(Math.random()*(t-e+1))}function o(e,t){return r(1,t)<=e}function a(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function u(e,t){return function(n){return e.call(null,a(n||{},t))}}function i(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}t.__esModule=!0,t.random=r,t.bingo=o,t.extend=a,t.curry=u;t.isArray=Array.isArray||i("Array"),t.isFunction=i("Function")},function(e,t,n){"use strict";function r(e,t){function n(){r.onreadystatechange=r.onload=null,o.removeChild(r),r=null,t({"from":"script"})}var r=document.createElement("script");r.charset="utf-8",r.async=!0,"onload"in r?r.onload=n:r.onreadystatechange=function(){/loaded|complete/.test(r.readyState)&&n()},r.src=e,o.appendChild(r)}t.__esModule=!0;var o=document.head||document.getElementsByTagName("head")[0];t["default"]=r}])});