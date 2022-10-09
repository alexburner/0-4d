var aM=Object.defineProperty;var oM=(o,e,t)=>e in o?aM(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var Ge=(o,e,t)=>(oM(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const dd=Symbol("Comlink.proxy"),lM=Symbol("Comlink.endpoint"),cM=Symbol("Comlink.releaseProxy"),oc=Symbol("Comlink.thrown"),pd=o=>typeof o=="object"&&o!==null||typeof o=="function",uM={canHandle:o=>pd(o)&&o[dd],serialize(o){const{port1:e,port2:t}=new MessageChannel;return gd(o,e),[t,[t]]},deserialize(o){return o.start(),xd(o)}},fM={canHandle:o=>pd(o)&&oc in o,serialize({value:o}){let e;return o instanceof Error?e={isError:!0,value:{message:o.message,name:o.name,stack:o.stack}}:e={isError:!1,value:o},[e,[]]},deserialize(o){throw o.isError?Object.assign(new Error(o.value.message),o.value):o.value}},md=new Map([["proxy",uM],["throw",fM]]);function gd(o,e=self){e.addEventListener("message",function t(r){if(!r||!r.data)return;const{id:s,type:l,path:u}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(cr);let d;try{const h=u.slice(0,-1).reduce((g,_)=>g[_],o),m=u.reduce((g,_)=>g[_],o);switch(l){case"GET":d=m;break;case"SET":h[u.slice(-1)[0]]=cr(r.data.value),d=!0;break;case"APPLY":d=m.apply(h,c);break;case"CONSTRUCT":{const g=new m(...c);d=mM(g)}break;case"ENDPOINT":{const{port1:g,port2:_}=new MessageChannel;gd(o,_),d=pM(g,[g])}break;case"RELEASE":d=void 0;break;default:return}}catch(h){d={value:h,[oc]:0}}Promise.resolve(d).catch(h=>({value:h,[oc]:0})).then(h=>{const[m,g]=vc(h);e.postMessage(Object.assign(Object.assign({},m),{id:s}),g),l==="RELEASE"&&(e.removeEventListener("message",t),_d(e))})}),e.start&&e.start()}function hM(o){return o.constructor.name==="MessagePort"}function _d(o){hM(o)&&o.close()}function xd(o,e){return lc(o,[],e)}function Ra(o){if(o)throw new Error("Proxy has been released and is not useable")}function lc(o,e=[],t=function(){}){let r=!1;const s=new Proxy(t,{get(l,u){if(Ra(r),u===cM)return()=>Br(o,{type:"RELEASE",path:e.map(c=>c.toString())}).then(()=>{_d(o),r=!0});if(u==="then"){if(e.length===0)return{then:()=>s};const c=Br(o,{type:"GET",path:e.map(d=>d.toString())}).then(cr);return c.then.bind(c)}return lc(o,[...e,u])},set(l,u,c){Ra(r);const[d,h]=vc(c);return Br(o,{type:"SET",path:[...e,u].map(m=>m.toString()),value:d},h).then(cr)},apply(l,u,c){Ra(r);const d=e[e.length-1];if(d===lM)return Br(o,{type:"ENDPOINT"}).then(cr);if(d==="bind")return lc(o,e.slice(0,-1));const[h,m]=qf(c);return Br(o,{type:"APPLY",path:e.map(g=>g.toString()),argumentList:h},m).then(cr)},construct(l,u){Ra(r);const[c,d]=qf(u);return Br(o,{type:"CONSTRUCT",path:e.map(h=>h.toString()),argumentList:c},d).then(cr)}});return s}function dM(o){return Array.prototype.concat.apply([],o)}function qf(o){const e=o.map(vc);return[e.map(t=>t[0]),dM(e.map(t=>t[1]))]}const vd=new WeakMap;function pM(o,e){return vd.set(o,e),o}function mM(o){return Object.assign(o,{[dd]:!0})}function vc(o){for(const[e,t]of md)if(t.canHandle(o)){const[r,s]=t.serialize(o);return[{type:"HANDLER",name:e,value:r},s]}return[{type:"RAW",value:o},vd.get(o)||[]]}function cr(o){switch(o.type){case"HANDLER":return md.get(o.name).deserialize(o.value);case"RAW":return o.value}}function Br(o,e,t){return new Promise(r=>{const s=gM();o.addEventListener("message",function l(u){!u.data||!u.data.id||u.data.id!==s||(o.removeEventListener("message",l),r(u.data))}),o.start&&o.start(),o.postMessage(Object.assign({id:s},e),t)})}function gM(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Rs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Zi={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */(function(o,e){(function(){var t,r="4.17.21",s=200,l="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",u="Expected a function",c="Invalid `variable` option passed into `_.template`",d="__lodash_hash_undefined__",h=500,m="__lodash_placeholder__",g=1,_=2,M=4,b=1,x=2,p=1,w=2,R=4,I=8,P=16,C=32,O=64,H=128,E=256,N=512,X=30,ue="...",ye=800,J=16,k=1,ae=2,he=3,le=1/0,ee=9007199254740991,q=17976931348623157e292,Z=0/0,ce=4294967295,pe=ce-1,de=ce>>>1,Ae=[["ary",H],["bind",p],["bindKey",w],["curry",I],["curryRight",P],["flip",N],["partial",C],["partialRight",O],["rearg",E]],Ue="[object Arguments]",se="[object Array]",ct="[object AsyncFunction]",Fe="[object Boolean]",Be="[object Date]",Ee="[object DOMException]",at="[object Error]",Xe="[object Function]",Pe="[object GeneratorFunction]",ft="[object Map]",Nt="[object Number]",Vt="[object Null]",Dt="[object Object]",Pt="[object Promise]",ht="[object Proxy]",Qt="[object RegExp]",Tt="[object Set]",L="[object String]",T="[object Symbol]",te="[object Undefined]",fe="[object WeakMap]",me="[object WeakSet]",xe="[object ArrayBuffer]",ze="[object DataView]",$="[object Float32Array]",Re="[object Float64Array]",we="[object Int8Array]",Le="[object Int16Array]",Te="[object Int32Array]",ke="[object Uint8Array]",rt="[object Uint8ClampedArray]",_t="[object Uint16Array]",z="[object Uint32Array]",Se=/\b__p \+= '';/g,Q=/\b(__p \+=) '' \+/g,Me=/(__e\(.*?\)|\b__t\)) \+\n'';/g,ve=/&(?:amp|lt|gt|quot|#39);/g,et=/[&<>"']/g,It=RegExp(ve.source),bt=RegExp(et.source),jn=/<%-([\s\S]+?)%>/g,Mt=/<%([\s\S]+?)%>/g,En=/<%=([\s\S]+?)%>/g,ln=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,po=/^\w*$/,Sr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,yr=/[\\^$.*+?()[\]{}|]/g,mo=RegExp(yr.source),hs=/^\s+/,go=/\s/,A=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,V=/\{\n\/\* \[wrapped with (.+)\] \*/,j=/,? & /,W=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ne=/[()=,{}\[\]\/\s]/,De=/\\(\\)?/g,We=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Ye=/\w*$/,Ve=/^[-+]0x[0-9a-f]+$/i,ot=/^0b[01]+$/i,tt=/^\[object .+?Constructor\]$/,nt=/^0o[0-7]+$/i,St=/^(?:0|[1-9]\d*)$/,si=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Vn=/($^)/,Ei=/['\n\r\u2028\u2029\\]/g,jt="\\ud800-\\udfff",st="\\u0300-\\u036f",Ai="\\ufe20-\\ufe2f",Et="\\u20d0-\\u20ff",en=st+Ai+Et,Hn="\\u2700-\\u27bf",Ci="a-z\\xdf-\\xf6\\xf8-\\xff",ds="\\xac\\xb1\\xd7\\xf7",Ht="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",ai="\\u2000-\\u206f",ps=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Yt="A-Z\\xc0-\\xd6\\xd8-\\xde",br="\\ufe0e\\ufe0f",Hs=ds+Ht+ai+ps,wr="['\u2019]",ap="["+jt+"]",Tc="["+Hs+"]",ks="["+en+"]",Ec="\\d+",op="["+Hn+"]",Ac="["+Ci+"]",Cc="[^"+jt+Hs+Ec+Hn+Ci+Yt+"]",_o="\\ud83c[\\udffb-\\udfff]",lp="(?:"+ks+"|"+_o+")",Lc="[^"+jt+"]",xo="(?:\\ud83c[\\udde6-\\uddff]){2}",vo="[\\ud800-\\udbff][\\udc00-\\udfff]",Tr="["+Yt+"]",Rc="\\u200d",Dc="(?:"+Ac+"|"+Cc+")",cp="(?:"+Tr+"|"+Cc+")",Pc="(?:"+wr+"(?:d|ll|m|re|s|t|ve))?",Ic="(?:"+wr+"(?:D|LL|M|RE|S|T|VE))?",Fc=lp+"?",Nc="["+br+"]?",up="(?:"+Rc+"(?:"+[Lc,xo,vo].join("|")+")"+Nc+Fc+")*",fp="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",hp="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Oc=Nc+Fc+up,dp="(?:"+[op,xo,vo].join("|")+")"+Oc,pp="(?:"+[Lc+ks+"?",ks,xo,vo,ap].join("|")+")",mp=RegExp(wr,"g"),gp=RegExp(ks,"g"),Mo=RegExp(_o+"(?="+_o+")|"+pp+Oc,"g"),_p=RegExp([Tr+"?"+Ac+"+"+Pc+"(?="+[Tc,Tr,"$"].join("|")+")",cp+"+"+Ic+"(?="+[Tc,Tr+Dc,"$"].join("|")+")",Tr+"?"+Dc+"+"+Pc,Tr+"+"+Ic,hp,fp,Ec,dp].join("|"),"g"),xp=RegExp("["+Rc+jt+en+br+"]"),vp=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Mp=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Sp=-1,xt={};xt[$]=xt[Re]=xt[we]=xt[Le]=xt[Te]=xt[ke]=xt[rt]=xt[_t]=xt[z]=!0,xt[Ue]=xt[se]=xt[xe]=xt[Fe]=xt[ze]=xt[Be]=xt[at]=xt[Xe]=xt[ft]=xt[Nt]=xt[Dt]=xt[Qt]=xt[Tt]=xt[L]=xt[fe]=!1;var mt={};mt[Ue]=mt[se]=mt[xe]=mt[ze]=mt[Fe]=mt[Be]=mt[$]=mt[Re]=mt[we]=mt[Le]=mt[Te]=mt[ft]=mt[Nt]=mt[Dt]=mt[Qt]=mt[Tt]=mt[L]=mt[T]=mt[ke]=mt[rt]=mt[_t]=mt[z]=!0,mt[at]=mt[Xe]=mt[fe]=!1;var yp={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},bp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wp={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Tp={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Ep=parseFloat,Ap=parseInt,Uc=typeof Rs=="object"&&Rs&&Rs.Object===Object&&Rs,Cp=typeof self=="object"&&self&&self.Object===Object&&self,kt=Uc||Cp||Function("return this")(),So=e&&!e.nodeType&&e,$i=So&&!0&&o&&!o.nodeType&&o,zc=$i&&$i.exports===So,yo=zc&&Uc.process,An=function(){try{var U=$i&&$i.require&&$i.require("util").types;return U||yo&&yo.binding&&yo.binding("util")}catch{}}(),Bc=An&&An.isArrayBuffer,Gc=An&&An.isDate,Wc=An&&An.isMap,Vc=An&&An.isRegExp,Hc=An&&An.isSet,kc=An&&An.isTypedArray;function gn(U,K,Y){switch(Y.length){case 0:return U.call(K);case 1:return U.call(K,Y[0]);case 2:return U.call(K,Y[0],Y[1]);case 3:return U.call(K,Y[0],Y[1],Y[2])}return U.apply(K,Y)}function Lp(U,K,Y,be){for(var He=-1,lt=U==null?0:U.length;++He<lt;){var Ot=U[He];K(be,Ot,Y(Ot),U)}return be}function Cn(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be&&K(U[Y],Y,U)!==!1;);return U}function Rp(U,K){for(var Y=U==null?0:U.length;Y--&&K(U[Y],Y,U)!==!1;);return U}function qc(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be;)if(!K(U[Y],Y,U))return!1;return!0}function Li(U,K){for(var Y=-1,be=U==null?0:U.length,He=0,lt=[];++Y<be;){var Ot=U[Y];K(Ot,Y,U)&&(lt[He++]=Ot)}return lt}function qs(U,K){var Y=U==null?0:U.length;return!!Y&&Er(U,K,0)>-1}function bo(U,K,Y){for(var be=-1,He=U==null?0:U.length;++be<He;)if(Y(K,U[be]))return!0;return!1}function yt(U,K){for(var Y=-1,be=U==null?0:U.length,He=Array(be);++Y<be;)He[Y]=K(U[Y],Y,U);return He}function Ri(U,K){for(var Y=-1,be=K.length,He=U.length;++Y<be;)U[He+Y]=K[Y];return U}function wo(U,K,Y,be){var He=-1,lt=U==null?0:U.length;for(be&&lt&&(Y=U[++He]);++He<lt;)Y=K(Y,U[He],He,U);return Y}function Dp(U,K,Y,be){var He=U==null?0:U.length;for(be&&He&&(Y=U[--He]);He--;)Y=K(Y,U[He],He,U);return Y}function To(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be;)if(K(U[Y],Y,U))return!0;return!1}var Pp=Eo("length");function Ip(U){return U.split("")}function Fp(U){return U.match(W)||[]}function Xc(U,K,Y){var be;return Y(U,function(He,lt,Ot){if(K(He,lt,Ot))return be=lt,!1}),be}function Xs(U,K,Y,be){for(var He=U.length,lt=Y+(be?1:-1);be?lt--:++lt<He;)if(K(U[lt],lt,U))return lt;return-1}function Er(U,K,Y){return K===K?Xp(U,K,Y):Xs(U,Yc,Y)}function Np(U,K,Y,be){for(var He=Y-1,lt=U.length;++He<lt;)if(be(U[He],K))return He;return-1}function Yc(U){return U!==U}function Zc(U,K){var Y=U==null?0:U.length;return Y?Co(U,K)/Y:Z}function Eo(U){return function(K){return K==null?t:K[U]}}function Ao(U){return function(K){return U==null?t:U[K]}}function $c(U,K,Y,be,He){return He(U,function(lt,Ot,pt){Y=be?(be=!1,lt):K(Y,lt,Ot,pt)}),Y}function Op(U,K){var Y=U.length;for(U.sort(K);Y--;)U[Y]=U[Y].value;return U}function Co(U,K){for(var Y,be=-1,He=U.length;++be<He;){var lt=K(U[be]);lt!==t&&(Y=Y===t?lt:Y+lt)}return Y}function Lo(U,K){for(var Y=-1,be=Array(U);++Y<U;)be[Y]=K(Y);return be}function Up(U,K){return yt(K,function(Y){return[Y,U[Y]]})}function Kc(U){return U&&U.slice(0,eu(U)+1).replace(hs,"")}function _n(U){return function(K){return U(K)}}function Ro(U,K){return yt(K,function(Y){return U[Y]})}function ms(U,K){return U.has(K)}function Jc(U,K){for(var Y=-1,be=U.length;++Y<be&&Er(K,U[Y],0)>-1;);return Y}function Qc(U,K){for(var Y=U.length;Y--&&Er(K,U[Y],0)>-1;);return Y}function zp(U,K){for(var Y=U.length,be=0;Y--;)U[Y]===K&&++be;return be}var Bp=Ao(yp),Gp=Ao(bp);function Wp(U){return"\\"+Tp[U]}function Vp(U,K){return U==null?t:U[K]}function Ar(U){return xp.test(U)}function Hp(U){return vp.test(U)}function kp(U){for(var K,Y=[];!(K=U.next()).done;)Y.push(K.value);return Y}function Do(U){var K=-1,Y=Array(U.size);return U.forEach(function(be,He){Y[++K]=[He,be]}),Y}function jc(U,K){return function(Y){return U(K(Y))}}function Di(U,K){for(var Y=-1,be=U.length,He=0,lt=[];++Y<be;){var Ot=U[Y];(Ot===K||Ot===m)&&(U[Y]=m,lt[He++]=Y)}return lt}function Ys(U){var K=-1,Y=Array(U.size);return U.forEach(function(be){Y[++K]=be}),Y}function qp(U){var K=-1,Y=Array(U.size);return U.forEach(function(be){Y[++K]=[be,be]}),Y}function Xp(U,K,Y){for(var be=Y-1,He=U.length;++be<He;)if(U[be]===K)return be;return-1}function Yp(U,K,Y){for(var be=Y+1;be--;)if(U[be]===K)return be;return be}function Cr(U){return Ar(U)?$p(U):Pp(U)}function kn(U){return Ar(U)?Kp(U):Ip(U)}function eu(U){for(var K=U.length;K--&&go.test(U.charAt(K)););return K}var Zp=Ao(wp);function $p(U){for(var K=Mo.lastIndex=0;Mo.test(U);)++K;return K}function Kp(U){return U.match(Mo)||[]}function Jp(U){return U.match(_p)||[]}var Qp=function U(K){K=K==null?kt:Lr.defaults(kt.Object(),K,Lr.pick(kt,Mp));var Y=K.Array,be=K.Date,He=K.Error,lt=K.Function,Ot=K.Math,pt=K.Object,Po=K.RegExp,jp=K.String,Ln=K.TypeError,Zs=Y.prototype,em=lt.prototype,Rr=pt.prototype,$s=K["__core-js_shared__"],Ks=em.toString,dt=Rr.hasOwnProperty,tm=0,tu=function(){var n=/[^.]+$/.exec($s&&$s.keys&&$s.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),Js=Rr.toString,nm=Ks.call(pt),im=kt._,rm=Po("^"+Ks.call(dt).replace(yr,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Qs=zc?K.Buffer:t,Pi=K.Symbol,js=K.Uint8Array,nu=Qs?Qs.allocUnsafe:t,ea=jc(pt.getPrototypeOf,pt),iu=pt.create,ru=Rr.propertyIsEnumerable,ta=Zs.splice,su=Pi?Pi.isConcatSpreadable:t,gs=Pi?Pi.iterator:t,Ki=Pi?Pi.toStringTag:t,na=function(){try{var n=tr(pt,"defineProperty");return n({},"",{}),n}catch{}}(),sm=K.clearTimeout!==kt.clearTimeout&&K.clearTimeout,am=be&&be.now!==kt.Date.now&&be.now,om=K.setTimeout!==kt.setTimeout&&K.setTimeout,ia=Ot.ceil,ra=Ot.floor,Io=pt.getOwnPropertySymbols,lm=Qs?Qs.isBuffer:t,au=K.isFinite,cm=Zs.join,um=jc(pt.keys,pt),Ut=Ot.max,Zt=Ot.min,fm=be.now,hm=K.parseInt,ou=Ot.random,dm=Zs.reverse,Fo=tr(K,"DataView"),_s=tr(K,"Map"),No=tr(K,"Promise"),Dr=tr(K,"Set"),xs=tr(K,"WeakMap"),vs=tr(pt,"create"),sa=xs&&new xs,Pr={},pm=nr(Fo),mm=nr(_s),gm=nr(No),_m=nr(Dr),xm=nr(xs),aa=Pi?Pi.prototype:t,Ms=aa?aa.valueOf:t,lu=aa?aa.toString:t;function S(n){if(At(n)&&!qe(n)&&!(n instanceof je)){if(n instanceof Rn)return n;if(dt.call(n,"__wrapped__"))return uf(n)}return new Rn(n)}var Ir=function(){function n(){}return function(i){if(!wt(i))return{};if(iu)return iu(i);n.prototype=i;var a=new n;return n.prototype=t,a}}();function oa(){}function Rn(n,i){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!i,this.__index__=0,this.__values__=t}S.templateSettings={escape:jn,evaluate:Mt,interpolate:En,variable:"",imports:{_:S}},S.prototype=oa.prototype,S.prototype.constructor=S,Rn.prototype=Ir(oa.prototype),Rn.prototype.constructor=Rn;function je(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=ce,this.__views__=[]}function vm(){var n=new je(this.__wrapped__);return n.__actions__=cn(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=cn(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=cn(this.__views__),n}function Mm(){if(this.__filtered__){var n=new je(this);n.__dir__=-1,n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function Sm(){var n=this.__wrapped__.value(),i=this.__dir__,a=qe(n),f=i<0,v=a?n.length:0,y=Ig(0,v,this.__views__),D=y.start,F=y.end,B=F-D,ie=f?F:D-1,re=this.__iteratees__,oe=re.length,_e=0,Ce=Zt(B,this.__takeCount__);if(!a||!f&&v==B&&Ce==B)return Pu(n,this.__actions__);var Ne=[];e:for(;B--&&_e<Ce;){ie+=i;for(var $e=-1,Oe=n[ie];++$e<oe;){var Je=re[$e],it=Je.iteratee,Mn=Je.type,rn=it(Oe);if(Mn==ae)Oe=rn;else if(!rn){if(Mn==k)continue e;break e}}Ne[_e++]=Oe}return Ne}je.prototype=Ir(oa.prototype),je.prototype.constructor=je;function Ji(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function ym(){this.__data__=vs?vs(null):{},this.size=0}function bm(n){var i=this.has(n)&&delete this.__data__[n];return this.size-=i?1:0,i}function wm(n){var i=this.__data__;if(vs){var a=i[n];return a===d?t:a}return dt.call(i,n)?i[n]:t}function Tm(n){var i=this.__data__;return vs?i[n]!==t:dt.call(i,n)}function Em(n,i){var a=this.__data__;return this.size+=this.has(n)?0:1,a[n]=vs&&i===t?d:i,this}Ji.prototype.clear=ym,Ji.prototype.delete=bm,Ji.prototype.get=wm,Ji.prototype.has=Tm,Ji.prototype.set=Em;function oi(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function Am(){this.__data__=[],this.size=0}function Cm(n){var i=this.__data__,a=la(i,n);if(a<0)return!1;var f=i.length-1;return a==f?i.pop():ta.call(i,a,1),--this.size,!0}function Lm(n){var i=this.__data__,a=la(i,n);return a<0?t:i[a][1]}function Rm(n){return la(this.__data__,n)>-1}function Dm(n,i){var a=this.__data__,f=la(a,n);return f<0?(++this.size,a.push([n,i])):a[f][1]=i,this}oi.prototype.clear=Am,oi.prototype.delete=Cm,oi.prototype.get=Lm,oi.prototype.has=Rm,oi.prototype.set=Dm;function li(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function Pm(){this.size=0,this.__data__={hash:new Ji,map:new(_s||oi),string:new Ji}}function Im(n){var i=Ma(this,n).delete(n);return this.size-=i?1:0,i}function Fm(n){return Ma(this,n).get(n)}function Nm(n){return Ma(this,n).has(n)}function Om(n,i){var a=Ma(this,n),f=a.size;return a.set(n,i),this.size+=a.size==f?0:1,this}li.prototype.clear=Pm,li.prototype.delete=Im,li.prototype.get=Fm,li.prototype.has=Nm,li.prototype.set=Om;function Qi(n){var i=-1,a=n==null?0:n.length;for(this.__data__=new li;++i<a;)this.add(n[i])}function Um(n){return this.__data__.set(n,d),this}function zm(n){return this.__data__.has(n)}Qi.prototype.add=Qi.prototype.push=Um,Qi.prototype.has=zm;function qn(n){var i=this.__data__=new oi(n);this.size=i.size}function Bm(){this.__data__=new oi,this.size=0}function Gm(n){var i=this.__data__,a=i.delete(n);return this.size=i.size,a}function Wm(n){return this.__data__.get(n)}function Vm(n){return this.__data__.has(n)}function Hm(n,i){var a=this.__data__;if(a instanceof oi){var f=a.__data__;if(!_s||f.length<s-1)return f.push([n,i]),this.size=++a.size,this;a=this.__data__=new li(f)}return a.set(n,i),this.size=a.size,this}qn.prototype.clear=Bm,qn.prototype.delete=Gm,qn.prototype.get=Wm,qn.prototype.has=Vm,qn.prototype.set=Hm;function cu(n,i){var a=qe(n),f=!a&&ir(n),v=!a&&!f&&Ui(n),y=!a&&!f&&!v&&Ur(n),D=a||f||v||y,F=D?Lo(n.length,jp):[],B=F.length;for(var ie in n)(i||dt.call(n,ie))&&!(D&&(ie=="length"||v&&(ie=="offset"||ie=="parent")||y&&(ie=="buffer"||ie=="byteLength"||ie=="byteOffset")||hi(ie,B)))&&F.push(ie);return F}function uu(n){var i=n.length;return i?n[Xo(0,i-1)]:t}function km(n,i){return Sa(cn(n),ji(i,0,n.length))}function qm(n){return Sa(cn(n))}function Oo(n,i,a){(a!==t&&!Xn(n[i],a)||a===t&&!(i in n))&&ci(n,i,a)}function Ss(n,i,a){var f=n[i];(!(dt.call(n,i)&&Xn(f,a))||a===t&&!(i in n))&&ci(n,i,a)}function la(n,i){for(var a=n.length;a--;)if(Xn(n[a][0],i))return a;return-1}function Xm(n,i,a,f){return Ii(n,function(v,y,D){i(f,v,a(v),D)}),f}function fu(n,i){return n&&ti(i,Gt(i),n)}function Ym(n,i){return n&&ti(i,fn(i),n)}function ci(n,i,a){i=="__proto__"&&na?na(n,i,{configurable:!0,enumerable:!0,value:a,writable:!0}):n[i]=a}function Uo(n,i){for(var a=-1,f=i.length,v=Y(f),y=n==null;++a<f;)v[a]=y?t:_l(n,i[a]);return v}function ji(n,i,a){return n===n&&(a!==t&&(n=n<=a?n:a),i!==t&&(n=n>=i?n:i)),n}function Dn(n,i,a,f,v,y){var D,F=i&g,B=i&_,ie=i&M;if(a&&(D=v?a(n,f,v,y):a(n)),D!==t)return D;if(!wt(n))return n;var re=qe(n);if(re){if(D=Ng(n),!F)return cn(n,D)}else{var oe=$t(n),_e=oe==Xe||oe==Pe;if(Ui(n))return Nu(n,F);if(oe==Dt||oe==Ue||_e&&!v){if(D=B||_e?{}:ef(n),!F)return B?wg(n,Ym(D,n)):bg(n,fu(D,n))}else{if(!mt[oe])return v?n:{};D=Og(n,oe,F)}}y||(y=new qn);var Ce=y.get(n);if(Ce)return Ce;y.set(n,D),Rf(n)?n.forEach(function(Oe){D.add(Dn(Oe,i,a,Oe,n,y))}):Cf(n)&&n.forEach(function(Oe,Je){D.set(Je,Dn(Oe,i,a,Je,n,y))});var Ne=ie?B?il:nl:B?fn:Gt,$e=re?t:Ne(n);return Cn($e||n,function(Oe,Je){$e&&(Je=Oe,Oe=n[Je]),Ss(D,Je,Dn(Oe,i,a,Je,n,y))}),D}function Zm(n){var i=Gt(n);return function(a){return hu(a,n,i)}}function hu(n,i,a){var f=a.length;if(n==null)return!f;for(n=pt(n);f--;){var v=a[f],y=i[v],D=n[v];if(D===t&&!(v in n)||!y(D))return!1}return!0}function du(n,i,a){if(typeof n!="function")throw new Ln(u);return Cs(function(){n.apply(t,a)},i)}function ys(n,i,a,f){var v=-1,y=qs,D=!0,F=n.length,B=[],ie=i.length;if(!F)return B;a&&(i=yt(i,_n(a))),f?(y=bo,D=!1):i.length>=s&&(y=ms,D=!1,i=new Qi(i));e:for(;++v<F;){var re=n[v],oe=a==null?re:a(re);if(re=f||re!==0?re:0,D&&oe===oe){for(var _e=ie;_e--;)if(i[_e]===oe)continue e;B.push(re)}else y(i,oe,f)||B.push(re)}return B}var Ii=Gu(ei),pu=Gu(Bo,!0);function $m(n,i){var a=!0;return Ii(n,function(f,v,y){return a=!!i(f,v,y),a}),a}function ca(n,i,a){for(var f=-1,v=n.length;++f<v;){var y=n[f],D=i(y);if(D!=null&&(F===t?D===D&&!vn(D):a(D,F)))var F=D,B=y}return B}function Km(n,i,a,f){var v=n.length;for(a=Ze(a),a<0&&(a=-a>v?0:v+a),f=f===t||f>v?v:Ze(f),f<0&&(f+=v),f=a>f?0:Pf(f);a<f;)n[a++]=i;return n}function mu(n,i){var a=[];return Ii(n,function(f,v,y){i(f,v,y)&&a.push(f)}),a}function qt(n,i,a,f,v){var y=-1,D=n.length;for(a||(a=zg),v||(v=[]);++y<D;){var F=n[y];i>0&&a(F)?i>1?qt(F,i-1,a,f,v):Ri(v,F):f||(v[v.length]=F)}return v}var zo=Wu(),gu=Wu(!0);function ei(n,i){return n&&zo(n,i,Gt)}function Bo(n,i){return n&&gu(n,i,Gt)}function ua(n,i){return Li(i,function(a){return di(n[a])})}function er(n,i){i=Ni(i,n);for(var a=0,f=i.length;n!=null&&a<f;)n=n[ni(i[a++])];return a&&a==f?n:t}function _u(n,i,a){var f=i(n);return qe(n)?f:Ri(f,a(n))}function tn(n){return n==null?n===t?te:Vt:Ki&&Ki in pt(n)?Pg(n):qg(n)}function Go(n,i){return n>i}function Jm(n,i){return n!=null&&dt.call(n,i)}function Qm(n,i){return n!=null&&i in pt(n)}function jm(n,i,a){return n>=Zt(i,a)&&n<Ut(i,a)}function Wo(n,i,a){for(var f=a?bo:qs,v=n[0].length,y=n.length,D=y,F=Y(y),B=1/0,ie=[];D--;){var re=n[D];D&&i&&(re=yt(re,_n(i))),B=Zt(re.length,B),F[D]=!a&&(i||v>=120&&re.length>=120)?new Qi(D&&re):t}re=n[0];var oe=-1,_e=F[0];e:for(;++oe<v&&ie.length<B;){var Ce=re[oe],Ne=i?i(Ce):Ce;if(Ce=a||Ce!==0?Ce:0,!(_e?ms(_e,Ne):f(ie,Ne,a))){for(D=y;--D;){var $e=F[D];if(!($e?ms($e,Ne):f(n[D],Ne,a)))continue e}_e&&_e.push(Ne),ie.push(Ce)}}return ie}function eg(n,i,a,f){return ei(n,function(v,y,D){i(f,a(v),y,D)}),f}function bs(n,i,a){i=Ni(i,n),n=sf(n,i);var f=n==null?n:n[ni(In(i))];return f==null?t:gn(f,n,a)}function xu(n){return At(n)&&tn(n)==Ue}function tg(n){return At(n)&&tn(n)==xe}function ng(n){return At(n)&&tn(n)==Be}function ws(n,i,a,f,v){return n===i?!0:n==null||i==null||!At(n)&&!At(i)?n!==n&&i!==i:ig(n,i,a,f,ws,v)}function ig(n,i,a,f,v,y){var D=qe(n),F=qe(i),B=D?se:$t(n),ie=F?se:$t(i);B=B==Ue?Dt:B,ie=ie==Ue?Dt:ie;var re=B==Dt,oe=ie==Dt,_e=B==ie;if(_e&&Ui(n)){if(!Ui(i))return!1;D=!0,re=!1}if(_e&&!re)return y||(y=new qn),D||Ur(n)?Ju(n,i,a,f,v,y):Rg(n,i,B,a,f,v,y);if(!(a&b)){var Ce=re&&dt.call(n,"__wrapped__"),Ne=oe&&dt.call(i,"__wrapped__");if(Ce||Ne){var $e=Ce?n.value():n,Oe=Ne?i.value():i;return y||(y=new qn),v($e,Oe,a,f,y)}}return _e?(y||(y=new qn),Dg(n,i,a,f,v,y)):!1}function rg(n){return At(n)&&$t(n)==ft}function Vo(n,i,a,f){var v=a.length,y=v,D=!f;if(n==null)return!y;for(n=pt(n);v--;){var F=a[v];if(D&&F[2]?F[1]!==n[F[0]]:!(F[0]in n))return!1}for(;++v<y;){F=a[v];var B=F[0],ie=n[B],re=F[1];if(D&&F[2]){if(ie===t&&!(B in n))return!1}else{var oe=new qn;if(f)var _e=f(ie,re,B,n,i,oe);if(!(_e===t?ws(re,ie,b|x,f,oe):_e))return!1}}return!0}function vu(n){if(!wt(n)||Gg(n))return!1;var i=di(n)?rm:tt;return i.test(nr(n))}function sg(n){return At(n)&&tn(n)==Qt}function ag(n){return At(n)&&$t(n)==Tt}function og(n){return At(n)&&Aa(n.length)&&!!xt[tn(n)]}function Mu(n){return typeof n=="function"?n:n==null?hn:typeof n=="object"?qe(n)?bu(n[0],n[1]):yu(n):Hf(n)}function Ho(n){if(!As(n))return um(n);var i=[];for(var a in pt(n))dt.call(n,a)&&a!="constructor"&&i.push(a);return i}function lg(n){if(!wt(n))return kg(n);var i=As(n),a=[];for(var f in n)f=="constructor"&&(i||!dt.call(n,f))||a.push(f);return a}function ko(n,i){return n<i}function Su(n,i){var a=-1,f=un(n)?Y(n.length):[];return Ii(n,function(v,y,D){f[++a]=i(v,y,D)}),f}function yu(n){var i=sl(n);return i.length==1&&i[0][2]?nf(i[0][0],i[0][1]):function(a){return a===n||Vo(a,n,i)}}function bu(n,i){return ol(n)&&tf(i)?nf(ni(n),i):function(a){var f=_l(a,n);return f===t&&f===i?xl(a,n):ws(i,f,b|x)}}function fa(n,i,a,f,v){n!==i&&zo(i,function(y,D){if(v||(v=new qn),wt(y))cg(n,i,D,a,fa,f,v);else{var F=f?f(cl(n,D),y,D+"",n,i,v):t;F===t&&(F=y),Oo(n,D,F)}},fn)}function cg(n,i,a,f,v,y,D){var F=cl(n,a),B=cl(i,a),ie=D.get(B);if(ie){Oo(n,a,ie);return}var re=y?y(F,B,a+"",n,i,D):t,oe=re===t;if(oe){var _e=qe(B),Ce=!_e&&Ui(B),Ne=!_e&&!Ce&&Ur(B);re=B,_e||Ce||Ne?qe(F)?re=F:Lt(F)?re=cn(F):Ce?(oe=!1,re=Nu(B,!0)):Ne?(oe=!1,re=Ou(B,!0)):re=[]:Ls(B)||ir(B)?(re=F,ir(F)?re=If(F):(!wt(F)||di(F))&&(re=ef(B))):oe=!1}oe&&(D.set(B,re),v(re,B,f,y,D),D.delete(B)),Oo(n,a,re)}function wu(n,i){var a=n.length;if(!!a)return i+=i<0?a:0,hi(i,a)?n[i]:t}function Tu(n,i,a){i.length?i=yt(i,function(y){return qe(y)?function(D){return er(D,y.length===1?y[0]:y)}:y}):i=[hn];var f=-1;i=yt(i,_n(Ie()));var v=Su(n,function(y,D,F){var B=yt(i,function(ie){return ie(y)});return{criteria:B,index:++f,value:y}});return Op(v,function(y,D){return yg(y,D,a)})}function ug(n,i){return Eu(n,i,function(a,f){return xl(n,f)})}function Eu(n,i,a){for(var f=-1,v=i.length,y={};++f<v;){var D=i[f],F=er(n,D);a(F,D)&&Ts(y,Ni(D,n),F)}return y}function fg(n){return function(i){return er(i,n)}}function qo(n,i,a,f){var v=f?Np:Er,y=-1,D=i.length,F=n;for(n===i&&(i=cn(i)),a&&(F=yt(n,_n(a)));++y<D;)for(var B=0,ie=i[y],re=a?a(ie):ie;(B=v(F,re,B,f))>-1;)F!==n&&ta.call(F,B,1),ta.call(n,B,1);return n}function Au(n,i){for(var a=n?i.length:0,f=a-1;a--;){var v=i[a];if(a==f||v!==y){var y=v;hi(v)?ta.call(n,v,1):$o(n,v)}}return n}function Xo(n,i){return n+ra(ou()*(i-n+1))}function hg(n,i,a,f){for(var v=-1,y=Ut(ia((i-n)/(a||1)),0),D=Y(y);y--;)D[f?y:++v]=n,n+=a;return D}function Yo(n,i){var a="";if(!n||i<1||i>ee)return a;do i%2&&(a+=n),i=ra(i/2),i&&(n+=n);while(i);return a}function Ke(n,i){return ul(rf(n,i,hn),n+"")}function dg(n){return uu(zr(n))}function pg(n,i){var a=zr(n);return Sa(a,ji(i,0,a.length))}function Ts(n,i,a,f){if(!wt(n))return n;i=Ni(i,n);for(var v=-1,y=i.length,D=y-1,F=n;F!=null&&++v<y;){var B=ni(i[v]),ie=a;if(B==="__proto__"||B==="constructor"||B==="prototype")return n;if(v!=D){var re=F[B];ie=f?f(re,B,F):t,ie===t&&(ie=wt(re)?re:hi(i[v+1])?[]:{})}Ss(F,B,ie),F=F[B]}return n}var Cu=sa?function(n,i){return sa.set(n,i),n}:hn,mg=na?function(n,i){return na(n,"toString",{configurable:!0,enumerable:!1,value:Ml(i),writable:!0})}:hn;function gg(n){return Sa(zr(n))}function Pn(n,i,a){var f=-1,v=n.length;i<0&&(i=-i>v?0:v+i),a=a>v?v:a,a<0&&(a+=v),v=i>a?0:a-i>>>0,i>>>=0;for(var y=Y(v);++f<v;)y[f]=n[f+i];return y}function _g(n,i){var a;return Ii(n,function(f,v,y){return a=i(f,v,y),!a}),!!a}function ha(n,i,a){var f=0,v=n==null?f:n.length;if(typeof i=="number"&&i===i&&v<=de){for(;f<v;){var y=f+v>>>1,D=n[y];D!==null&&!vn(D)&&(a?D<=i:D<i)?f=y+1:v=y}return v}return Zo(n,i,hn,a)}function Zo(n,i,a,f){var v=0,y=n==null?0:n.length;if(y===0)return 0;i=a(i);for(var D=i!==i,F=i===null,B=vn(i),ie=i===t;v<y;){var re=ra((v+y)/2),oe=a(n[re]),_e=oe!==t,Ce=oe===null,Ne=oe===oe,$e=vn(oe);if(D)var Oe=f||Ne;else ie?Oe=Ne&&(f||_e):F?Oe=Ne&&_e&&(f||!Ce):B?Oe=Ne&&_e&&!Ce&&(f||!$e):Ce||$e?Oe=!1:Oe=f?oe<=i:oe<i;Oe?v=re+1:y=re}return Zt(y,pe)}function Lu(n,i){for(var a=-1,f=n.length,v=0,y=[];++a<f;){var D=n[a],F=i?i(D):D;if(!a||!Xn(F,B)){var B=F;y[v++]=D===0?0:D}}return y}function Ru(n){return typeof n=="number"?n:vn(n)?Z:+n}function xn(n){if(typeof n=="string")return n;if(qe(n))return yt(n,xn)+"";if(vn(n))return lu?lu.call(n):"";var i=n+"";return i=="0"&&1/n==-le?"-0":i}function Fi(n,i,a){var f=-1,v=qs,y=n.length,D=!0,F=[],B=F;if(a)D=!1,v=bo;else if(y>=s){var ie=i?null:Cg(n);if(ie)return Ys(ie);D=!1,v=ms,B=new Qi}else B=i?[]:F;e:for(;++f<y;){var re=n[f],oe=i?i(re):re;if(re=a||re!==0?re:0,D&&oe===oe){for(var _e=B.length;_e--;)if(B[_e]===oe)continue e;i&&B.push(oe),F.push(re)}else v(B,oe,a)||(B!==F&&B.push(oe),F.push(re))}return F}function $o(n,i){return i=Ni(i,n),n=sf(n,i),n==null||delete n[ni(In(i))]}function Du(n,i,a,f){return Ts(n,i,a(er(n,i)),f)}function da(n,i,a,f){for(var v=n.length,y=f?v:-1;(f?y--:++y<v)&&i(n[y],y,n););return a?Pn(n,f?0:y,f?y+1:v):Pn(n,f?y+1:0,f?v:y)}function Pu(n,i){var a=n;return a instanceof je&&(a=a.value()),wo(i,function(f,v){return v.func.apply(v.thisArg,Ri([f],v.args))},a)}function Ko(n,i,a){var f=n.length;if(f<2)return f?Fi(n[0]):[];for(var v=-1,y=Y(f);++v<f;)for(var D=n[v],F=-1;++F<f;)F!=v&&(y[v]=ys(y[v]||D,n[F],i,a));return Fi(qt(y,1),i,a)}function Iu(n,i,a){for(var f=-1,v=n.length,y=i.length,D={};++f<v;){var F=f<y?i[f]:t;a(D,n[f],F)}return D}function Jo(n){return Lt(n)?n:[]}function Qo(n){return typeof n=="function"?n:hn}function Ni(n,i){return qe(n)?n:ol(n,i)?[n]:cf(ut(n))}var xg=Ke;function Oi(n,i,a){var f=n.length;return a=a===t?f:a,!i&&a>=f?n:Pn(n,i,a)}var Fu=sm||function(n){return kt.clearTimeout(n)};function Nu(n,i){if(i)return n.slice();var a=n.length,f=nu?nu(a):new n.constructor(a);return n.copy(f),f}function jo(n){var i=new n.constructor(n.byteLength);return new js(i).set(new js(n)),i}function vg(n,i){var a=i?jo(n.buffer):n.buffer;return new n.constructor(a,n.byteOffset,n.byteLength)}function Mg(n){var i=new n.constructor(n.source,Ye.exec(n));return i.lastIndex=n.lastIndex,i}function Sg(n){return Ms?pt(Ms.call(n)):{}}function Ou(n,i){var a=i?jo(n.buffer):n.buffer;return new n.constructor(a,n.byteOffset,n.length)}function Uu(n,i){if(n!==i){var a=n!==t,f=n===null,v=n===n,y=vn(n),D=i!==t,F=i===null,B=i===i,ie=vn(i);if(!F&&!ie&&!y&&n>i||y&&D&&B&&!F&&!ie||f&&D&&B||!a&&B||!v)return 1;if(!f&&!y&&!ie&&n<i||ie&&a&&v&&!f&&!y||F&&a&&v||!D&&v||!B)return-1}return 0}function yg(n,i,a){for(var f=-1,v=n.criteria,y=i.criteria,D=v.length,F=a.length;++f<D;){var B=Uu(v[f],y[f]);if(B){if(f>=F)return B;var ie=a[f];return B*(ie=="desc"?-1:1)}}return n.index-i.index}function zu(n,i,a,f){for(var v=-1,y=n.length,D=a.length,F=-1,B=i.length,ie=Ut(y-D,0),re=Y(B+ie),oe=!f;++F<B;)re[F]=i[F];for(;++v<D;)(oe||v<y)&&(re[a[v]]=n[v]);for(;ie--;)re[F++]=n[v++];return re}function Bu(n,i,a,f){for(var v=-1,y=n.length,D=-1,F=a.length,B=-1,ie=i.length,re=Ut(y-F,0),oe=Y(re+ie),_e=!f;++v<re;)oe[v]=n[v];for(var Ce=v;++B<ie;)oe[Ce+B]=i[B];for(;++D<F;)(_e||v<y)&&(oe[Ce+a[D]]=n[v++]);return oe}function cn(n,i){var a=-1,f=n.length;for(i||(i=Y(f));++a<f;)i[a]=n[a];return i}function ti(n,i,a,f){var v=!a;a||(a={});for(var y=-1,D=i.length;++y<D;){var F=i[y],B=f?f(a[F],n[F],F,a,n):t;B===t&&(B=n[F]),v?ci(a,F,B):Ss(a,F,B)}return a}function bg(n,i){return ti(n,al(n),i)}function wg(n,i){return ti(n,Qu(n),i)}function pa(n,i){return function(a,f){var v=qe(a)?Lp:Xm,y=i?i():{};return v(a,n,Ie(f,2),y)}}function Fr(n){return Ke(function(i,a){var f=-1,v=a.length,y=v>1?a[v-1]:t,D=v>2?a[2]:t;for(y=n.length>3&&typeof y=="function"?(v--,y):t,D&&nn(a[0],a[1],D)&&(y=v<3?t:y,v=1),i=pt(i);++f<v;){var F=a[f];F&&n(i,F,f,y)}return i})}function Gu(n,i){return function(a,f){if(a==null)return a;if(!un(a))return n(a,f);for(var v=a.length,y=i?v:-1,D=pt(a);(i?y--:++y<v)&&f(D[y],y,D)!==!1;);return a}}function Wu(n){return function(i,a,f){for(var v=-1,y=pt(i),D=f(i),F=D.length;F--;){var B=D[n?F:++v];if(a(y[B],B,y)===!1)break}return i}}function Tg(n,i,a){var f=i&p,v=Es(n);function y(){var D=this&&this!==kt&&this instanceof y?v:n;return D.apply(f?a:this,arguments)}return y}function Vu(n){return function(i){i=ut(i);var a=Ar(i)?kn(i):t,f=a?a[0]:i.charAt(0),v=a?Oi(a,1).join(""):i.slice(1);return f[n]()+v}}function Nr(n){return function(i){return wo(Wf(Gf(i).replace(mp,"")),n,"")}}function Es(n){return function(){var i=arguments;switch(i.length){case 0:return new n;case 1:return new n(i[0]);case 2:return new n(i[0],i[1]);case 3:return new n(i[0],i[1],i[2]);case 4:return new n(i[0],i[1],i[2],i[3]);case 5:return new n(i[0],i[1],i[2],i[3],i[4]);case 6:return new n(i[0],i[1],i[2],i[3],i[4],i[5]);case 7:return new n(i[0],i[1],i[2],i[3],i[4],i[5],i[6])}var a=Ir(n.prototype),f=n.apply(a,i);return wt(f)?f:a}}function Eg(n,i,a){var f=Es(n);function v(){for(var y=arguments.length,D=Y(y),F=y,B=Or(v);F--;)D[F]=arguments[F];var ie=y<3&&D[0]!==B&&D[y-1]!==B?[]:Di(D,B);if(y-=ie.length,y<a)return Yu(n,i,ma,v.placeholder,t,D,ie,t,t,a-y);var re=this&&this!==kt&&this instanceof v?f:n;return gn(re,this,D)}return v}function Hu(n){return function(i,a,f){var v=pt(i);if(!un(i)){var y=Ie(a,3);i=Gt(i),a=function(F){return y(v[F],F,v)}}var D=n(i,a,f);return D>-1?v[y?i[D]:D]:t}}function ku(n){return fi(function(i){var a=i.length,f=a,v=Rn.prototype.thru;for(n&&i.reverse();f--;){var y=i[f];if(typeof y!="function")throw new Ln(u);if(v&&!D&&va(y)=="wrapper")var D=new Rn([],!0)}for(f=D?f:a;++f<a;){y=i[f];var F=va(y),B=F=="wrapper"?rl(y):t;B&&ll(B[0])&&B[1]==(H|I|C|E)&&!B[4].length&&B[9]==1?D=D[va(B[0])].apply(D,B[3]):D=y.length==1&&ll(y)?D[F]():D.thru(y)}return function(){var ie=arguments,re=ie[0];if(D&&ie.length==1&&qe(re))return D.plant(re).value();for(var oe=0,_e=a?i[oe].apply(this,ie):re;++oe<a;)_e=i[oe].call(this,_e);return _e}})}function ma(n,i,a,f,v,y,D,F,B,ie){var re=i&H,oe=i&p,_e=i&w,Ce=i&(I|P),Ne=i&N,$e=_e?t:Es(n);function Oe(){for(var Je=arguments.length,it=Y(Je),Mn=Je;Mn--;)it[Mn]=arguments[Mn];if(Ce)var rn=Or(Oe),Sn=zp(it,rn);if(f&&(it=zu(it,f,v,Ce)),y&&(it=Bu(it,y,D,Ce)),Je-=Sn,Ce&&Je<ie){var Rt=Di(it,rn);return Yu(n,i,ma,Oe.placeholder,a,it,Rt,F,B,ie-Je)}var Yn=oe?a:this,mi=_e?Yn[n]:n;return Je=it.length,F?it=Xg(it,F):Ne&&Je>1&&it.reverse(),re&&B<Je&&(it.length=B),this&&this!==kt&&this instanceof Oe&&(mi=$e||Es(mi)),mi.apply(Yn,it)}return Oe}function qu(n,i){return function(a,f){return eg(a,n,i(f),{})}}function ga(n,i){return function(a,f){var v;if(a===t&&f===t)return i;if(a!==t&&(v=a),f!==t){if(v===t)return f;typeof a=="string"||typeof f=="string"?(a=xn(a),f=xn(f)):(a=Ru(a),f=Ru(f)),v=n(a,f)}return v}}function el(n){return fi(function(i){return i=yt(i,_n(Ie())),Ke(function(a){var f=this;return n(i,function(v){return gn(v,f,a)})})})}function _a(n,i){i=i===t?" ":xn(i);var a=i.length;if(a<2)return a?Yo(i,n):i;var f=Yo(i,ia(n/Cr(i)));return Ar(i)?Oi(kn(f),0,n).join(""):f.slice(0,n)}function Ag(n,i,a,f){var v=i&p,y=Es(n);function D(){for(var F=-1,B=arguments.length,ie=-1,re=f.length,oe=Y(re+B),_e=this&&this!==kt&&this instanceof D?y:n;++ie<re;)oe[ie]=f[ie];for(;B--;)oe[ie++]=arguments[++F];return gn(_e,v?a:this,oe)}return D}function Xu(n){return function(i,a,f){return f&&typeof f!="number"&&nn(i,a,f)&&(a=f=t),i=pi(i),a===t?(a=i,i=0):a=pi(a),f=f===t?i<a?1:-1:pi(f),hg(i,a,f,n)}}function xa(n){return function(i,a){return typeof i=="string"&&typeof a=="string"||(i=Fn(i),a=Fn(a)),n(i,a)}}function Yu(n,i,a,f,v,y,D,F,B,ie){var re=i&I,oe=re?D:t,_e=re?t:D,Ce=re?y:t,Ne=re?t:y;i|=re?C:O,i&=~(re?O:C),i&R||(i&=~(p|w));var $e=[n,i,v,Ce,oe,Ne,_e,F,B,ie],Oe=a.apply(t,$e);return ll(n)&&af(Oe,$e),Oe.placeholder=f,of(Oe,n,i)}function tl(n){var i=Ot[n];return function(a,f){if(a=Fn(a),f=f==null?0:Zt(Ze(f),292),f&&au(a)){var v=(ut(a)+"e").split("e"),y=i(v[0]+"e"+(+v[1]+f));return v=(ut(y)+"e").split("e"),+(v[0]+"e"+(+v[1]-f))}return i(a)}}var Cg=Dr&&1/Ys(new Dr([,-0]))[1]==le?function(n){return new Dr(n)}:bl;function Zu(n){return function(i){var a=$t(i);return a==ft?Do(i):a==Tt?qp(i):Up(i,n(i))}}function ui(n,i,a,f,v,y,D,F){var B=i&w;if(!B&&typeof n!="function")throw new Ln(u);var ie=f?f.length:0;if(ie||(i&=~(C|O),f=v=t),D=D===t?D:Ut(Ze(D),0),F=F===t?F:Ze(F),ie-=v?v.length:0,i&O){var re=f,oe=v;f=v=t}var _e=B?t:rl(n),Ce=[n,i,a,f,v,re,oe,y,D,F];if(_e&&Hg(Ce,_e),n=Ce[0],i=Ce[1],a=Ce[2],f=Ce[3],v=Ce[4],F=Ce[9]=Ce[9]===t?B?0:n.length:Ut(Ce[9]-ie,0),!F&&i&(I|P)&&(i&=~(I|P)),!i||i==p)var Ne=Tg(n,i,a);else i==I||i==P?Ne=Eg(n,i,F):(i==C||i==(p|C))&&!v.length?Ne=Ag(n,i,a,f):Ne=ma.apply(t,Ce);var $e=_e?Cu:af;return of($e(Ne,Ce),n,i)}function $u(n,i,a,f){return n===t||Xn(n,Rr[a])&&!dt.call(f,a)?i:n}function Ku(n,i,a,f,v,y){return wt(n)&&wt(i)&&(y.set(i,n),fa(n,i,t,Ku,y),y.delete(i)),n}function Lg(n){return Ls(n)?t:n}function Ju(n,i,a,f,v,y){var D=a&b,F=n.length,B=i.length;if(F!=B&&!(D&&B>F))return!1;var ie=y.get(n),re=y.get(i);if(ie&&re)return ie==i&&re==n;var oe=-1,_e=!0,Ce=a&x?new Qi:t;for(y.set(n,i),y.set(i,n);++oe<F;){var Ne=n[oe],$e=i[oe];if(f)var Oe=D?f($e,Ne,oe,i,n,y):f(Ne,$e,oe,n,i,y);if(Oe!==t){if(Oe)continue;_e=!1;break}if(Ce){if(!To(i,function(Je,it){if(!ms(Ce,it)&&(Ne===Je||v(Ne,Je,a,f,y)))return Ce.push(it)})){_e=!1;break}}else if(!(Ne===$e||v(Ne,$e,a,f,y))){_e=!1;break}}return y.delete(n),y.delete(i),_e}function Rg(n,i,a,f,v,y,D){switch(a){case ze:if(n.byteLength!=i.byteLength||n.byteOffset!=i.byteOffset)return!1;n=n.buffer,i=i.buffer;case xe:return!(n.byteLength!=i.byteLength||!y(new js(n),new js(i)));case Fe:case Be:case Nt:return Xn(+n,+i);case at:return n.name==i.name&&n.message==i.message;case Qt:case L:return n==i+"";case ft:var F=Do;case Tt:var B=f&b;if(F||(F=Ys),n.size!=i.size&&!B)return!1;var ie=D.get(n);if(ie)return ie==i;f|=x,D.set(n,i);var re=Ju(F(n),F(i),f,v,y,D);return D.delete(n),re;case T:if(Ms)return Ms.call(n)==Ms.call(i)}return!1}function Dg(n,i,a,f,v,y){var D=a&b,F=nl(n),B=F.length,ie=nl(i),re=ie.length;if(B!=re&&!D)return!1;for(var oe=B;oe--;){var _e=F[oe];if(!(D?_e in i:dt.call(i,_e)))return!1}var Ce=y.get(n),Ne=y.get(i);if(Ce&&Ne)return Ce==i&&Ne==n;var $e=!0;y.set(n,i),y.set(i,n);for(var Oe=D;++oe<B;){_e=F[oe];var Je=n[_e],it=i[_e];if(f)var Mn=D?f(it,Je,_e,i,n,y):f(Je,it,_e,n,i,y);if(!(Mn===t?Je===it||v(Je,it,a,f,y):Mn)){$e=!1;break}Oe||(Oe=_e=="constructor")}if($e&&!Oe){var rn=n.constructor,Sn=i.constructor;rn!=Sn&&"constructor"in n&&"constructor"in i&&!(typeof rn=="function"&&rn instanceof rn&&typeof Sn=="function"&&Sn instanceof Sn)&&($e=!1)}return y.delete(n),y.delete(i),$e}function fi(n){return ul(rf(n,t,df),n+"")}function nl(n){return _u(n,Gt,al)}function il(n){return _u(n,fn,Qu)}var rl=sa?function(n){return sa.get(n)}:bl;function va(n){for(var i=n.name+"",a=Pr[i],f=dt.call(Pr,i)?a.length:0;f--;){var v=a[f],y=v.func;if(y==null||y==n)return v.name}return i}function Or(n){var i=dt.call(S,"placeholder")?S:n;return i.placeholder}function Ie(){var n=S.iteratee||Sl;return n=n===Sl?Mu:n,arguments.length?n(arguments[0],arguments[1]):n}function Ma(n,i){var a=n.__data__;return Bg(i)?a[typeof i=="string"?"string":"hash"]:a.map}function sl(n){for(var i=Gt(n),a=i.length;a--;){var f=i[a],v=n[f];i[a]=[f,v,tf(v)]}return i}function tr(n,i){var a=Vp(n,i);return vu(a)?a:t}function Pg(n){var i=dt.call(n,Ki),a=n[Ki];try{n[Ki]=t;var f=!0}catch{}var v=Js.call(n);return f&&(i?n[Ki]=a:delete n[Ki]),v}var al=Io?function(n){return n==null?[]:(n=pt(n),Li(Io(n),function(i){return ru.call(n,i)}))}:wl,Qu=Io?function(n){for(var i=[];n;)Ri(i,al(n)),n=ea(n);return i}:wl,$t=tn;(Fo&&$t(new Fo(new ArrayBuffer(1)))!=ze||_s&&$t(new _s)!=ft||No&&$t(No.resolve())!=Pt||Dr&&$t(new Dr)!=Tt||xs&&$t(new xs)!=fe)&&($t=function(n){var i=tn(n),a=i==Dt?n.constructor:t,f=a?nr(a):"";if(f)switch(f){case pm:return ze;case mm:return ft;case gm:return Pt;case _m:return Tt;case xm:return fe}return i});function Ig(n,i,a){for(var f=-1,v=a.length;++f<v;){var y=a[f],D=y.size;switch(y.type){case"drop":n+=D;break;case"dropRight":i-=D;break;case"take":i=Zt(i,n+D);break;case"takeRight":n=Ut(n,i-D);break}}return{start:n,end:i}}function Fg(n){var i=n.match(V);return i?i[1].split(j):[]}function ju(n,i,a){i=Ni(i,n);for(var f=-1,v=i.length,y=!1;++f<v;){var D=ni(i[f]);if(!(y=n!=null&&a(n,D)))break;n=n[D]}return y||++f!=v?y:(v=n==null?0:n.length,!!v&&Aa(v)&&hi(D,v)&&(qe(n)||ir(n)))}function Ng(n){var i=n.length,a=new n.constructor(i);return i&&typeof n[0]=="string"&&dt.call(n,"index")&&(a.index=n.index,a.input=n.input),a}function ef(n){return typeof n.constructor=="function"&&!As(n)?Ir(ea(n)):{}}function Og(n,i,a){var f=n.constructor;switch(i){case xe:return jo(n);case Fe:case Be:return new f(+n);case ze:return vg(n,a);case $:case Re:case we:case Le:case Te:case ke:case rt:case _t:case z:return Ou(n,a);case ft:return new f;case Nt:case L:return new f(n);case Qt:return Mg(n);case Tt:return new f;case T:return Sg(n)}}function Ug(n,i){var a=i.length;if(!a)return n;var f=a-1;return i[f]=(a>1?"& ":"")+i[f],i=i.join(a>2?", ":" "),n.replace(A,`{
/* [wrapped with `+i+`] */
`)}function zg(n){return qe(n)||ir(n)||!!(su&&n&&n[su])}function hi(n,i){var a=typeof n;return i=i==null?ee:i,!!i&&(a=="number"||a!="symbol"&&St.test(n))&&n>-1&&n%1==0&&n<i}function nn(n,i,a){if(!wt(a))return!1;var f=typeof i;return(f=="number"?un(a)&&hi(i,a.length):f=="string"&&i in a)?Xn(a[i],n):!1}function ol(n,i){if(qe(n))return!1;var a=typeof n;return a=="number"||a=="symbol"||a=="boolean"||n==null||vn(n)?!0:po.test(n)||!ln.test(n)||i!=null&&n in pt(i)}function Bg(n){var i=typeof n;return i=="string"||i=="number"||i=="symbol"||i=="boolean"?n!=="__proto__":n===null}function ll(n){var i=va(n),a=S[i];if(typeof a!="function"||!(i in je.prototype))return!1;if(n===a)return!0;var f=rl(a);return!!f&&n===f[0]}function Gg(n){return!!tu&&tu in n}var Wg=$s?di:Tl;function As(n){var i=n&&n.constructor,a=typeof i=="function"&&i.prototype||Rr;return n===a}function tf(n){return n===n&&!wt(n)}function nf(n,i){return function(a){return a==null?!1:a[n]===i&&(i!==t||n in pt(a))}}function Vg(n){var i=Ta(n,function(f){return a.size===h&&a.clear(),f}),a=i.cache;return i}function Hg(n,i){var a=n[1],f=i[1],v=a|f,y=v<(p|w|H),D=f==H&&a==I||f==H&&a==E&&n[7].length<=i[8]||f==(H|E)&&i[7].length<=i[8]&&a==I;if(!(y||D))return n;f&p&&(n[2]=i[2],v|=a&p?0:R);var F=i[3];if(F){var B=n[3];n[3]=B?zu(B,F,i[4]):F,n[4]=B?Di(n[3],m):i[4]}return F=i[5],F&&(B=n[5],n[5]=B?Bu(B,F,i[6]):F,n[6]=B?Di(n[5],m):i[6]),F=i[7],F&&(n[7]=F),f&H&&(n[8]=n[8]==null?i[8]:Zt(n[8],i[8])),n[9]==null&&(n[9]=i[9]),n[0]=i[0],n[1]=v,n}function kg(n){var i=[];if(n!=null)for(var a in pt(n))i.push(a);return i}function qg(n){return Js.call(n)}function rf(n,i,a){return i=Ut(i===t?n.length-1:i,0),function(){for(var f=arguments,v=-1,y=Ut(f.length-i,0),D=Y(y);++v<y;)D[v]=f[i+v];v=-1;for(var F=Y(i+1);++v<i;)F[v]=f[v];return F[i]=a(D),gn(n,this,F)}}function sf(n,i){return i.length<2?n:er(n,Pn(i,0,-1))}function Xg(n,i){for(var a=n.length,f=Zt(i.length,a),v=cn(n);f--;){var y=i[f];n[f]=hi(y,a)?v[y]:t}return n}function cl(n,i){if(!(i==="constructor"&&typeof n[i]=="function")&&i!="__proto__")return n[i]}var af=lf(Cu),Cs=om||function(n,i){return kt.setTimeout(n,i)},ul=lf(mg);function of(n,i,a){var f=i+"";return ul(n,Ug(f,Yg(Fg(f),a)))}function lf(n){var i=0,a=0;return function(){var f=fm(),v=J-(f-a);if(a=f,v>0){if(++i>=ye)return arguments[0]}else i=0;return n.apply(t,arguments)}}function Sa(n,i){var a=-1,f=n.length,v=f-1;for(i=i===t?f:i;++a<i;){var y=Xo(a,v),D=n[y];n[y]=n[a],n[a]=D}return n.length=i,n}var cf=Vg(function(n){var i=[];return n.charCodeAt(0)===46&&i.push(""),n.replace(Sr,function(a,f,v,y){i.push(v?y.replace(De,"$1"):f||a)}),i});function ni(n){if(typeof n=="string"||vn(n))return n;var i=n+"";return i=="0"&&1/n==-le?"-0":i}function nr(n){if(n!=null){try{return Ks.call(n)}catch{}try{return n+""}catch{}}return""}function Yg(n,i){return Cn(Ae,function(a){var f="_."+a[0];i&a[1]&&!qs(n,f)&&n.push(f)}),n.sort()}function uf(n){if(n instanceof je)return n.clone();var i=new Rn(n.__wrapped__,n.__chain__);return i.__actions__=cn(n.__actions__),i.__index__=n.__index__,i.__values__=n.__values__,i}function Zg(n,i,a){(a?nn(n,i,a):i===t)?i=1:i=Ut(Ze(i),0);var f=n==null?0:n.length;if(!f||i<1)return[];for(var v=0,y=0,D=Y(ia(f/i));v<f;)D[y++]=Pn(n,v,v+=i);return D}function $g(n){for(var i=-1,a=n==null?0:n.length,f=0,v=[];++i<a;){var y=n[i];y&&(v[f++]=y)}return v}function Kg(){var n=arguments.length;if(!n)return[];for(var i=Y(n-1),a=arguments[0],f=n;f--;)i[f-1]=arguments[f];return Ri(qe(a)?cn(a):[a],qt(i,1))}var Jg=Ke(function(n,i){return Lt(n)?ys(n,qt(i,1,Lt,!0)):[]}),Qg=Ke(function(n,i){var a=In(i);return Lt(a)&&(a=t),Lt(n)?ys(n,qt(i,1,Lt,!0),Ie(a,2)):[]}),jg=Ke(function(n,i){var a=In(i);return Lt(a)&&(a=t),Lt(n)?ys(n,qt(i,1,Lt,!0),t,a):[]});function e_(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ze(i),Pn(n,i<0?0:i,f)):[]}function t_(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ze(i),i=f-i,Pn(n,0,i<0?0:i)):[]}function n_(n,i){return n&&n.length?da(n,Ie(i,3),!0,!0):[]}function i_(n,i){return n&&n.length?da(n,Ie(i,3),!0):[]}function r_(n,i,a,f){var v=n==null?0:n.length;return v?(a&&typeof a!="number"&&nn(n,i,a)&&(a=0,f=v),Km(n,i,a,f)):[]}function ff(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var v=a==null?0:Ze(a);return v<0&&(v=Ut(f+v,0)),Xs(n,Ie(i,3),v)}function hf(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var v=f-1;return a!==t&&(v=Ze(a),v=a<0?Ut(f+v,0):Zt(v,f-1)),Xs(n,Ie(i,3),v,!0)}function df(n){var i=n==null?0:n.length;return i?qt(n,1):[]}function s_(n){var i=n==null?0:n.length;return i?qt(n,le):[]}function a_(n,i){var a=n==null?0:n.length;return a?(i=i===t?1:Ze(i),qt(n,i)):[]}function o_(n){for(var i=-1,a=n==null?0:n.length,f={};++i<a;){var v=n[i];f[v[0]]=v[1]}return f}function pf(n){return n&&n.length?n[0]:t}function l_(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var v=a==null?0:Ze(a);return v<0&&(v=Ut(f+v,0)),Er(n,i,v)}function c_(n){var i=n==null?0:n.length;return i?Pn(n,0,-1):[]}var u_=Ke(function(n){var i=yt(n,Jo);return i.length&&i[0]===n[0]?Wo(i):[]}),f_=Ke(function(n){var i=In(n),a=yt(n,Jo);return i===In(a)?i=t:a.pop(),a.length&&a[0]===n[0]?Wo(a,Ie(i,2)):[]}),h_=Ke(function(n){var i=In(n),a=yt(n,Jo);return i=typeof i=="function"?i:t,i&&a.pop(),a.length&&a[0]===n[0]?Wo(a,t,i):[]});function d_(n,i){return n==null?"":cm.call(n,i)}function In(n){var i=n==null?0:n.length;return i?n[i-1]:t}function p_(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var v=f;return a!==t&&(v=Ze(a),v=v<0?Ut(f+v,0):Zt(v,f-1)),i===i?Yp(n,i,v):Xs(n,Yc,v,!0)}function m_(n,i){return n&&n.length?wu(n,Ze(i)):t}var g_=Ke(mf);function mf(n,i){return n&&n.length&&i&&i.length?qo(n,i):n}function __(n,i,a){return n&&n.length&&i&&i.length?qo(n,i,Ie(a,2)):n}function x_(n,i,a){return n&&n.length&&i&&i.length?qo(n,i,t,a):n}var v_=fi(function(n,i){var a=n==null?0:n.length,f=Uo(n,i);return Au(n,yt(i,function(v){return hi(v,a)?+v:v}).sort(Uu)),f});function M_(n,i){var a=[];if(!(n&&n.length))return a;var f=-1,v=[],y=n.length;for(i=Ie(i,3);++f<y;){var D=n[f];i(D,f,n)&&(a.push(D),v.push(f))}return Au(n,v),a}function fl(n){return n==null?n:dm.call(n)}function S_(n,i,a){var f=n==null?0:n.length;return f?(a&&typeof a!="number"&&nn(n,i,a)?(i=0,a=f):(i=i==null?0:Ze(i),a=a===t?f:Ze(a)),Pn(n,i,a)):[]}function y_(n,i){return ha(n,i)}function b_(n,i,a){return Zo(n,i,Ie(a,2))}function w_(n,i){var a=n==null?0:n.length;if(a){var f=ha(n,i);if(f<a&&Xn(n[f],i))return f}return-1}function T_(n,i){return ha(n,i,!0)}function E_(n,i,a){return Zo(n,i,Ie(a,2),!0)}function A_(n,i){var a=n==null?0:n.length;if(a){var f=ha(n,i,!0)-1;if(Xn(n[f],i))return f}return-1}function C_(n){return n&&n.length?Lu(n):[]}function L_(n,i){return n&&n.length?Lu(n,Ie(i,2)):[]}function R_(n){var i=n==null?0:n.length;return i?Pn(n,1,i):[]}function D_(n,i,a){return n&&n.length?(i=a||i===t?1:Ze(i),Pn(n,0,i<0?0:i)):[]}function P_(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ze(i),i=f-i,Pn(n,i<0?0:i,f)):[]}function I_(n,i){return n&&n.length?da(n,Ie(i,3),!1,!0):[]}function F_(n,i){return n&&n.length?da(n,Ie(i,3)):[]}var N_=Ke(function(n){return Fi(qt(n,1,Lt,!0))}),O_=Ke(function(n){var i=In(n);return Lt(i)&&(i=t),Fi(qt(n,1,Lt,!0),Ie(i,2))}),U_=Ke(function(n){var i=In(n);return i=typeof i=="function"?i:t,Fi(qt(n,1,Lt,!0),t,i)});function z_(n){return n&&n.length?Fi(n):[]}function B_(n,i){return n&&n.length?Fi(n,Ie(i,2)):[]}function G_(n,i){return i=typeof i=="function"?i:t,n&&n.length?Fi(n,t,i):[]}function hl(n){if(!(n&&n.length))return[];var i=0;return n=Li(n,function(a){if(Lt(a))return i=Ut(a.length,i),!0}),Lo(i,function(a){return yt(n,Eo(a))})}function gf(n,i){if(!(n&&n.length))return[];var a=hl(n);return i==null?a:yt(a,function(f){return gn(i,t,f)})}var W_=Ke(function(n,i){return Lt(n)?ys(n,i):[]}),V_=Ke(function(n){return Ko(Li(n,Lt))}),H_=Ke(function(n){var i=In(n);return Lt(i)&&(i=t),Ko(Li(n,Lt),Ie(i,2))}),k_=Ke(function(n){var i=In(n);return i=typeof i=="function"?i:t,Ko(Li(n,Lt),t,i)}),q_=Ke(hl);function X_(n,i){return Iu(n||[],i||[],Ss)}function Y_(n,i){return Iu(n||[],i||[],Ts)}var Z_=Ke(function(n){var i=n.length,a=i>1?n[i-1]:t;return a=typeof a=="function"?(n.pop(),a):t,gf(n,a)});function _f(n){var i=S(n);return i.__chain__=!0,i}function $_(n,i){return i(n),n}function ya(n,i){return i(n)}var K_=fi(function(n){var i=n.length,a=i?n[0]:0,f=this.__wrapped__,v=function(y){return Uo(y,n)};return i>1||this.__actions__.length||!(f instanceof je)||!hi(a)?this.thru(v):(f=f.slice(a,+a+(i?1:0)),f.__actions__.push({func:ya,args:[v],thisArg:t}),new Rn(f,this.__chain__).thru(function(y){return i&&!y.length&&y.push(t),y}))});function J_(){return _f(this)}function Q_(){return new Rn(this.value(),this.__chain__)}function j_(){this.__values__===t&&(this.__values__=Df(this.value()));var n=this.__index__>=this.__values__.length,i=n?t:this.__values__[this.__index__++];return{done:n,value:i}}function e0(){return this}function t0(n){for(var i,a=this;a instanceof oa;){var f=uf(a);f.__index__=0,f.__values__=t,i?v.__wrapped__=f:i=f;var v=f;a=a.__wrapped__}return v.__wrapped__=n,i}function n0(){var n=this.__wrapped__;if(n instanceof je){var i=n;return this.__actions__.length&&(i=new je(this)),i=i.reverse(),i.__actions__.push({func:ya,args:[fl],thisArg:t}),new Rn(i,this.__chain__)}return this.thru(fl)}function i0(){return Pu(this.__wrapped__,this.__actions__)}var r0=pa(function(n,i,a){dt.call(n,a)?++n[a]:ci(n,a,1)});function s0(n,i,a){var f=qe(n)?qc:$m;return a&&nn(n,i,a)&&(i=t),f(n,Ie(i,3))}function a0(n,i){var a=qe(n)?Li:mu;return a(n,Ie(i,3))}var o0=Hu(ff),l0=Hu(hf);function c0(n,i){return qt(ba(n,i),1)}function u0(n,i){return qt(ba(n,i),le)}function f0(n,i,a){return a=a===t?1:Ze(a),qt(ba(n,i),a)}function xf(n,i){var a=qe(n)?Cn:Ii;return a(n,Ie(i,3))}function vf(n,i){var a=qe(n)?Rp:pu;return a(n,Ie(i,3))}var h0=pa(function(n,i,a){dt.call(n,a)?n[a].push(i):ci(n,a,[i])});function d0(n,i,a,f){n=un(n)?n:zr(n),a=a&&!f?Ze(a):0;var v=n.length;return a<0&&(a=Ut(v+a,0)),Ca(n)?a<=v&&n.indexOf(i,a)>-1:!!v&&Er(n,i,a)>-1}var p0=Ke(function(n,i,a){var f=-1,v=typeof i=="function",y=un(n)?Y(n.length):[];return Ii(n,function(D){y[++f]=v?gn(i,D,a):bs(D,i,a)}),y}),m0=pa(function(n,i,a){ci(n,a,i)});function ba(n,i){var a=qe(n)?yt:Su;return a(n,Ie(i,3))}function g0(n,i,a,f){return n==null?[]:(qe(i)||(i=i==null?[]:[i]),a=f?t:a,qe(a)||(a=a==null?[]:[a]),Tu(n,i,a))}var _0=pa(function(n,i,a){n[a?0:1].push(i)},function(){return[[],[]]});function x0(n,i,a){var f=qe(n)?wo:$c,v=arguments.length<3;return f(n,Ie(i,4),a,v,Ii)}function v0(n,i,a){var f=qe(n)?Dp:$c,v=arguments.length<3;return f(n,Ie(i,4),a,v,pu)}function M0(n,i){var a=qe(n)?Li:mu;return a(n,Ea(Ie(i,3)))}function S0(n){var i=qe(n)?uu:dg;return i(n)}function y0(n,i,a){(a?nn(n,i,a):i===t)?i=1:i=Ze(i);var f=qe(n)?km:pg;return f(n,i)}function b0(n){var i=qe(n)?qm:gg;return i(n)}function w0(n){if(n==null)return 0;if(un(n))return Ca(n)?Cr(n):n.length;var i=$t(n);return i==ft||i==Tt?n.size:Ho(n).length}function T0(n,i,a){var f=qe(n)?To:_g;return a&&nn(n,i,a)&&(i=t),f(n,Ie(i,3))}var E0=Ke(function(n,i){if(n==null)return[];var a=i.length;return a>1&&nn(n,i[0],i[1])?i=[]:a>2&&nn(i[0],i[1],i[2])&&(i=[i[0]]),Tu(n,qt(i,1),[])}),wa=am||function(){return kt.Date.now()};function A0(n,i){if(typeof i!="function")throw new Ln(u);return n=Ze(n),function(){if(--n<1)return i.apply(this,arguments)}}function Mf(n,i,a){return i=a?t:i,i=n&&i==null?n.length:i,ui(n,H,t,t,t,t,i)}function Sf(n,i){var a;if(typeof i!="function")throw new Ln(u);return n=Ze(n),function(){return--n>0&&(a=i.apply(this,arguments)),n<=1&&(i=t),a}}var dl=Ke(function(n,i,a){var f=p;if(a.length){var v=Di(a,Or(dl));f|=C}return ui(n,f,i,a,v)}),yf=Ke(function(n,i,a){var f=p|w;if(a.length){var v=Di(a,Or(yf));f|=C}return ui(i,f,n,a,v)});function bf(n,i,a){i=a?t:i;var f=ui(n,I,t,t,t,t,t,i);return f.placeholder=bf.placeholder,f}function wf(n,i,a){i=a?t:i;var f=ui(n,P,t,t,t,t,t,i);return f.placeholder=wf.placeholder,f}function Tf(n,i,a){var f,v,y,D,F,B,ie=0,re=!1,oe=!1,_e=!0;if(typeof n!="function")throw new Ln(u);i=Fn(i)||0,wt(a)&&(re=!!a.leading,oe="maxWait"in a,y=oe?Ut(Fn(a.maxWait)||0,i):y,_e="trailing"in a?!!a.trailing:_e);function Ce(Rt){var Yn=f,mi=v;return f=v=t,ie=Rt,D=n.apply(mi,Yn),D}function Ne(Rt){return ie=Rt,F=Cs(Je,i),re?Ce(Rt):D}function $e(Rt){var Yn=Rt-B,mi=Rt-ie,kf=i-Yn;return oe?Zt(kf,y-mi):kf}function Oe(Rt){var Yn=Rt-B,mi=Rt-ie;return B===t||Yn>=i||Yn<0||oe&&mi>=y}function Je(){var Rt=wa();if(Oe(Rt))return it(Rt);F=Cs(Je,$e(Rt))}function it(Rt){return F=t,_e&&f?Ce(Rt):(f=v=t,D)}function Mn(){F!==t&&Fu(F),ie=0,f=B=v=F=t}function rn(){return F===t?D:it(wa())}function Sn(){var Rt=wa(),Yn=Oe(Rt);if(f=arguments,v=this,B=Rt,Yn){if(F===t)return Ne(B);if(oe)return Fu(F),F=Cs(Je,i),Ce(B)}return F===t&&(F=Cs(Je,i)),D}return Sn.cancel=Mn,Sn.flush=rn,Sn}var C0=Ke(function(n,i){return du(n,1,i)}),L0=Ke(function(n,i,a){return du(n,Fn(i)||0,a)});function R0(n){return ui(n,N)}function Ta(n,i){if(typeof n!="function"||i!=null&&typeof i!="function")throw new Ln(u);var a=function(){var f=arguments,v=i?i.apply(this,f):f[0],y=a.cache;if(y.has(v))return y.get(v);var D=n.apply(this,f);return a.cache=y.set(v,D)||y,D};return a.cache=new(Ta.Cache||li),a}Ta.Cache=li;function Ea(n){if(typeof n!="function")throw new Ln(u);return function(){var i=arguments;switch(i.length){case 0:return!n.call(this);case 1:return!n.call(this,i[0]);case 2:return!n.call(this,i[0],i[1]);case 3:return!n.call(this,i[0],i[1],i[2])}return!n.apply(this,i)}}function D0(n){return Sf(2,n)}var P0=xg(function(n,i){i=i.length==1&&qe(i[0])?yt(i[0],_n(Ie())):yt(qt(i,1),_n(Ie()));var a=i.length;return Ke(function(f){for(var v=-1,y=Zt(f.length,a);++v<y;)f[v]=i[v].call(this,f[v]);return gn(n,this,f)})}),pl=Ke(function(n,i){var a=Di(i,Or(pl));return ui(n,C,t,i,a)}),Ef=Ke(function(n,i){var a=Di(i,Or(Ef));return ui(n,O,t,i,a)}),I0=fi(function(n,i){return ui(n,E,t,t,t,i)});function F0(n,i){if(typeof n!="function")throw new Ln(u);return i=i===t?i:Ze(i),Ke(n,i)}function N0(n,i){if(typeof n!="function")throw new Ln(u);return i=i==null?0:Ut(Ze(i),0),Ke(function(a){var f=a[i],v=Oi(a,0,i);return f&&Ri(v,f),gn(n,this,v)})}function O0(n,i,a){var f=!0,v=!0;if(typeof n!="function")throw new Ln(u);return wt(a)&&(f="leading"in a?!!a.leading:f,v="trailing"in a?!!a.trailing:v),Tf(n,i,{leading:f,maxWait:i,trailing:v})}function U0(n){return Mf(n,1)}function z0(n,i){return pl(Qo(i),n)}function B0(){if(!arguments.length)return[];var n=arguments[0];return qe(n)?n:[n]}function G0(n){return Dn(n,M)}function W0(n,i){return i=typeof i=="function"?i:t,Dn(n,M,i)}function V0(n){return Dn(n,g|M)}function H0(n,i){return i=typeof i=="function"?i:t,Dn(n,g|M,i)}function k0(n,i){return i==null||hu(n,i,Gt(i))}function Xn(n,i){return n===i||n!==n&&i!==i}var q0=xa(Go),X0=xa(function(n,i){return n>=i}),ir=xu(function(){return arguments}())?xu:function(n){return At(n)&&dt.call(n,"callee")&&!ru.call(n,"callee")},qe=Y.isArray,Y0=Bc?_n(Bc):tg;function un(n){return n!=null&&Aa(n.length)&&!di(n)}function Lt(n){return At(n)&&un(n)}function Z0(n){return n===!0||n===!1||At(n)&&tn(n)==Fe}var Ui=lm||Tl,$0=Gc?_n(Gc):ng;function K0(n){return At(n)&&n.nodeType===1&&!Ls(n)}function J0(n){if(n==null)return!0;if(un(n)&&(qe(n)||typeof n=="string"||typeof n.splice=="function"||Ui(n)||Ur(n)||ir(n)))return!n.length;var i=$t(n);if(i==ft||i==Tt)return!n.size;if(As(n))return!Ho(n).length;for(var a in n)if(dt.call(n,a))return!1;return!0}function Q0(n,i){return ws(n,i)}function j0(n,i,a){a=typeof a=="function"?a:t;var f=a?a(n,i):t;return f===t?ws(n,i,t,a):!!f}function ml(n){if(!At(n))return!1;var i=tn(n);return i==at||i==Ee||typeof n.message=="string"&&typeof n.name=="string"&&!Ls(n)}function ex(n){return typeof n=="number"&&au(n)}function di(n){if(!wt(n))return!1;var i=tn(n);return i==Xe||i==Pe||i==ct||i==ht}function Af(n){return typeof n=="number"&&n==Ze(n)}function Aa(n){return typeof n=="number"&&n>-1&&n%1==0&&n<=ee}function wt(n){var i=typeof n;return n!=null&&(i=="object"||i=="function")}function At(n){return n!=null&&typeof n=="object"}var Cf=Wc?_n(Wc):rg;function tx(n,i){return n===i||Vo(n,i,sl(i))}function nx(n,i,a){return a=typeof a=="function"?a:t,Vo(n,i,sl(i),a)}function ix(n){return Lf(n)&&n!=+n}function rx(n){if(Wg(n))throw new He(l);return vu(n)}function sx(n){return n===null}function ax(n){return n==null}function Lf(n){return typeof n=="number"||At(n)&&tn(n)==Nt}function Ls(n){if(!At(n)||tn(n)!=Dt)return!1;var i=ea(n);if(i===null)return!0;var a=dt.call(i,"constructor")&&i.constructor;return typeof a=="function"&&a instanceof a&&Ks.call(a)==nm}var gl=Vc?_n(Vc):sg;function ox(n){return Af(n)&&n>=-ee&&n<=ee}var Rf=Hc?_n(Hc):ag;function Ca(n){return typeof n=="string"||!qe(n)&&At(n)&&tn(n)==L}function vn(n){return typeof n=="symbol"||At(n)&&tn(n)==T}var Ur=kc?_n(kc):og;function lx(n){return n===t}function cx(n){return At(n)&&$t(n)==fe}function ux(n){return At(n)&&tn(n)==me}var fx=xa(ko),hx=xa(function(n,i){return n<=i});function Df(n){if(!n)return[];if(un(n))return Ca(n)?kn(n):cn(n);if(gs&&n[gs])return kp(n[gs]());var i=$t(n),a=i==ft?Do:i==Tt?Ys:zr;return a(n)}function pi(n){if(!n)return n===0?n:0;if(n=Fn(n),n===le||n===-le){var i=n<0?-1:1;return i*q}return n===n?n:0}function Ze(n){var i=pi(n),a=i%1;return i===i?a?i-a:i:0}function Pf(n){return n?ji(Ze(n),0,ce):0}function Fn(n){if(typeof n=="number")return n;if(vn(n))return Z;if(wt(n)){var i=typeof n.valueOf=="function"?n.valueOf():n;n=wt(i)?i+"":i}if(typeof n!="string")return n===0?n:+n;n=Kc(n);var a=ot.test(n);return a||nt.test(n)?Ap(n.slice(2),a?2:8):Ve.test(n)?Z:+n}function If(n){return ti(n,fn(n))}function dx(n){return n?ji(Ze(n),-ee,ee):n===0?n:0}function ut(n){return n==null?"":xn(n)}var px=Fr(function(n,i){if(As(i)||un(i)){ti(i,Gt(i),n);return}for(var a in i)dt.call(i,a)&&Ss(n,a,i[a])}),Ff=Fr(function(n,i){ti(i,fn(i),n)}),La=Fr(function(n,i,a,f){ti(i,fn(i),n,f)}),mx=Fr(function(n,i,a,f){ti(i,Gt(i),n,f)}),gx=fi(Uo);function _x(n,i){var a=Ir(n);return i==null?a:fu(a,i)}var xx=Ke(function(n,i){n=pt(n);var a=-1,f=i.length,v=f>2?i[2]:t;for(v&&nn(i[0],i[1],v)&&(f=1);++a<f;)for(var y=i[a],D=fn(y),F=-1,B=D.length;++F<B;){var ie=D[F],re=n[ie];(re===t||Xn(re,Rr[ie])&&!dt.call(n,ie))&&(n[ie]=y[ie])}return n}),vx=Ke(function(n){return n.push(t,Ku),gn(Nf,t,n)});function Mx(n,i){return Xc(n,Ie(i,3),ei)}function Sx(n,i){return Xc(n,Ie(i,3),Bo)}function yx(n,i){return n==null?n:zo(n,Ie(i,3),fn)}function bx(n,i){return n==null?n:gu(n,Ie(i,3),fn)}function wx(n,i){return n&&ei(n,Ie(i,3))}function Tx(n,i){return n&&Bo(n,Ie(i,3))}function Ex(n){return n==null?[]:ua(n,Gt(n))}function Ax(n){return n==null?[]:ua(n,fn(n))}function _l(n,i,a){var f=n==null?t:er(n,i);return f===t?a:f}function Cx(n,i){return n!=null&&ju(n,i,Jm)}function xl(n,i){return n!=null&&ju(n,i,Qm)}var Lx=qu(function(n,i,a){i!=null&&typeof i.toString!="function"&&(i=Js.call(i)),n[i]=a},Ml(hn)),Rx=qu(function(n,i,a){i!=null&&typeof i.toString!="function"&&(i=Js.call(i)),dt.call(n,i)?n[i].push(a):n[i]=[a]},Ie),Dx=Ke(bs);function Gt(n){return un(n)?cu(n):Ho(n)}function fn(n){return un(n)?cu(n,!0):lg(n)}function Px(n,i){var a={};return i=Ie(i,3),ei(n,function(f,v,y){ci(a,i(f,v,y),f)}),a}function Ix(n,i){var a={};return i=Ie(i,3),ei(n,function(f,v,y){ci(a,v,i(f,v,y))}),a}var Fx=Fr(function(n,i,a){fa(n,i,a)}),Nf=Fr(function(n,i,a,f){fa(n,i,a,f)}),Nx=fi(function(n,i){var a={};if(n==null)return a;var f=!1;i=yt(i,function(y){return y=Ni(y,n),f||(f=y.length>1),y}),ti(n,il(n),a),f&&(a=Dn(a,g|_|M,Lg));for(var v=i.length;v--;)$o(a,i[v]);return a});function Ox(n,i){return Of(n,Ea(Ie(i)))}var Ux=fi(function(n,i){return n==null?{}:ug(n,i)});function Of(n,i){if(n==null)return{};var a=yt(il(n),function(f){return[f]});return i=Ie(i),Eu(n,a,function(f,v){return i(f,v[0])})}function zx(n,i,a){i=Ni(i,n);var f=-1,v=i.length;for(v||(v=1,n=t);++f<v;){var y=n==null?t:n[ni(i[f])];y===t&&(f=v,y=a),n=di(y)?y.call(n):y}return n}function Bx(n,i,a){return n==null?n:Ts(n,i,a)}function Gx(n,i,a,f){return f=typeof f=="function"?f:t,n==null?n:Ts(n,i,a,f)}var Uf=Zu(Gt),zf=Zu(fn);function Wx(n,i,a){var f=qe(n),v=f||Ui(n)||Ur(n);if(i=Ie(i,4),a==null){var y=n&&n.constructor;v?a=f?new y:[]:wt(n)?a=di(y)?Ir(ea(n)):{}:a={}}return(v?Cn:ei)(n,function(D,F,B){return i(a,D,F,B)}),a}function Vx(n,i){return n==null?!0:$o(n,i)}function Hx(n,i,a){return n==null?n:Du(n,i,Qo(a))}function kx(n,i,a,f){return f=typeof f=="function"?f:t,n==null?n:Du(n,i,Qo(a),f)}function zr(n){return n==null?[]:Ro(n,Gt(n))}function qx(n){return n==null?[]:Ro(n,fn(n))}function Xx(n,i,a){return a===t&&(a=i,i=t),a!==t&&(a=Fn(a),a=a===a?a:0),i!==t&&(i=Fn(i),i=i===i?i:0),ji(Fn(n),i,a)}function Yx(n,i,a){return i=pi(i),a===t?(a=i,i=0):a=pi(a),n=Fn(n),jm(n,i,a)}function Zx(n,i,a){if(a&&typeof a!="boolean"&&nn(n,i,a)&&(i=a=t),a===t&&(typeof i=="boolean"?(a=i,i=t):typeof n=="boolean"&&(a=n,n=t)),n===t&&i===t?(n=0,i=1):(n=pi(n),i===t?(i=n,n=0):i=pi(i)),n>i){var f=n;n=i,i=f}if(a||n%1||i%1){var v=ou();return Zt(n+v*(i-n+Ep("1e-"+((v+"").length-1))),i)}return Xo(n,i)}var $x=Nr(function(n,i,a){return i=i.toLowerCase(),n+(a?Bf(i):i)});function Bf(n){return vl(ut(n).toLowerCase())}function Gf(n){return n=ut(n),n&&n.replace(si,Bp).replace(gp,"")}function Kx(n,i,a){n=ut(n),i=xn(i);var f=n.length;a=a===t?f:ji(Ze(a),0,f);var v=a;return a-=i.length,a>=0&&n.slice(a,v)==i}function Jx(n){return n=ut(n),n&&bt.test(n)?n.replace(et,Gp):n}function Qx(n){return n=ut(n),n&&mo.test(n)?n.replace(yr,"\\$&"):n}var jx=Nr(function(n,i,a){return n+(a?"-":"")+i.toLowerCase()}),ev=Nr(function(n,i,a){return n+(a?" ":"")+i.toLowerCase()}),tv=Vu("toLowerCase");function nv(n,i,a){n=ut(n),i=Ze(i);var f=i?Cr(n):0;if(!i||f>=i)return n;var v=(i-f)/2;return _a(ra(v),a)+n+_a(ia(v),a)}function iv(n,i,a){n=ut(n),i=Ze(i);var f=i?Cr(n):0;return i&&f<i?n+_a(i-f,a):n}function rv(n,i,a){n=ut(n),i=Ze(i);var f=i?Cr(n):0;return i&&f<i?_a(i-f,a)+n:n}function sv(n,i,a){return a||i==null?i=0:i&&(i=+i),hm(ut(n).replace(hs,""),i||0)}function av(n,i,a){return(a?nn(n,i,a):i===t)?i=1:i=Ze(i),Yo(ut(n),i)}function ov(){var n=arguments,i=ut(n[0]);return n.length<3?i:i.replace(n[1],n[2])}var lv=Nr(function(n,i,a){return n+(a?"_":"")+i.toLowerCase()});function cv(n,i,a){return a&&typeof a!="number"&&nn(n,i,a)&&(i=a=t),a=a===t?ce:a>>>0,a?(n=ut(n),n&&(typeof i=="string"||i!=null&&!gl(i))&&(i=xn(i),!i&&Ar(n))?Oi(kn(n),0,a):n.split(i,a)):[]}var uv=Nr(function(n,i,a){return n+(a?" ":"")+vl(i)});function fv(n,i,a){return n=ut(n),a=a==null?0:ji(Ze(a),0,n.length),i=xn(i),n.slice(a,a+i.length)==i}function hv(n,i,a){var f=S.templateSettings;a&&nn(n,i,a)&&(i=t),n=ut(n),i=La({},i,f,$u);var v=La({},i.imports,f.imports,$u),y=Gt(v),D=Ro(v,y),F,B,ie=0,re=i.interpolate||Vn,oe="__p += '",_e=Po((i.escape||Vn).source+"|"+re.source+"|"+(re===En?We:Vn).source+"|"+(i.evaluate||Vn).source+"|$","g"),Ce="//# sourceURL="+(dt.call(i,"sourceURL")?(i.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Sp+"]")+`
`;n.replace(_e,function(Oe,Je,it,Mn,rn,Sn){return it||(it=Mn),oe+=n.slice(ie,Sn).replace(Ei,Wp),Je&&(F=!0,oe+=`' +
__e(`+Je+`) +
'`),rn&&(B=!0,oe+=`';
`+rn+`;
__p += '`),it&&(oe+=`' +
((__t = (`+it+`)) == null ? '' : __t) +
'`),ie=Sn+Oe.length,Oe}),oe+=`';
`;var Ne=dt.call(i,"variable")&&i.variable;if(!Ne)oe=`with (obj) {
`+oe+`
}
`;else if(ne.test(Ne))throw new He(c);oe=(B?oe.replace(Se,""):oe).replace(Q,"$1").replace(Me,"$1;"),oe="function("+(Ne||"obj")+`) {
`+(Ne?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(F?", __e = _.escape":"")+(B?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+oe+`return __p
}`;var $e=Vf(function(){return lt(y,Ce+"return "+oe).apply(t,D)});if($e.source=oe,ml($e))throw $e;return $e}function dv(n){return ut(n).toLowerCase()}function pv(n){return ut(n).toUpperCase()}function mv(n,i,a){if(n=ut(n),n&&(a||i===t))return Kc(n);if(!n||!(i=xn(i)))return n;var f=kn(n),v=kn(i),y=Jc(f,v),D=Qc(f,v)+1;return Oi(f,y,D).join("")}function gv(n,i,a){if(n=ut(n),n&&(a||i===t))return n.slice(0,eu(n)+1);if(!n||!(i=xn(i)))return n;var f=kn(n),v=Qc(f,kn(i))+1;return Oi(f,0,v).join("")}function _v(n,i,a){if(n=ut(n),n&&(a||i===t))return n.replace(hs,"");if(!n||!(i=xn(i)))return n;var f=kn(n),v=Jc(f,kn(i));return Oi(f,v).join("")}function xv(n,i){var a=X,f=ue;if(wt(i)){var v="separator"in i?i.separator:v;a="length"in i?Ze(i.length):a,f="omission"in i?xn(i.omission):f}n=ut(n);var y=n.length;if(Ar(n)){var D=kn(n);y=D.length}if(a>=y)return n;var F=a-Cr(f);if(F<1)return f;var B=D?Oi(D,0,F).join(""):n.slice(0,F);if(v===t)return B+f;if(D&&(F+=B.length-F),gl(v)){if(n.slice(F).search(v)){var ie,re=B;for(v.global||(v=Po(v.source,ut(Ye.exec(v))+"g")),v.lastIndex=0;ie=v.exec(re);)var oe=ie.index;B=B.slice(0,oe===t?F:oe)}}else if(n.indexOf(xn(v),F)!=F){var _e=B.lastIndexOf(v);_e>-1&&(B=B.slice(0,_e))}return B+f}function vv(n){return n=ut(n),n&&It.test(n)?n.replace(ve,Zp):n}var Mv=Nr(function(n,i,a){return n+(a?" ":"")+i.toUpperCase()}),vl=Vu("toUpperCase");function Wf(n,i,a){return n=ut(n),i=a?t:i,i===t?Hp(n)?Jp(n):Fp(n):n.match(i)||[]}var Vf=Ke(function(n,i){try{return gn(n,t,i)}catch(a){return ml(a)?a:new He(a)}}),Sv=fi(function(n,i){return Cn(i,function(a){a=ni(a),ci(n,a,dl(n[a],n))}),n});function yv(n){var i=n==null?0:n.length,a=Ie();return n=i?yt(n,function(f){if(typeof f[1]!="function")throw new Ln(u);return[a(f[0]),f[1]]}):[],Ke(function(f){for(var v=-1;++v<i;){var y=n[v];if(gn(y[0],this,f))return gn(y[1],this,f)}})}function bv(n){return Zm(Dn(n,g))}function Ml(n){return function(){return n}}function wv(n,i){return n==null||n!==n?i:n}var Tv=ku(),Ev=ku(!0);function hn(n){return n}function Sl(n){return Mu(typeof n=="function"?n:Dn(n,g))}function Av(n){return yu(Dn(n,g))}function Cv(n,i){return bu(n,Dn(i,g))}var Lv=Ke(function(n,i){return function(a){return bs(a,n,i)}}),Rv=Ke(function(n,i){return function(a){return bs(n,a,i)}});function yl(n,i,a){var f=Gt(i),v=ua(i,f);a==null&&!(wt(i)&&(v.length||!f.length))&&(a=i,i=n,n=this,v=ua(i,Gt(i)));var y=!(wt(a)&&"chain"in a)||!!a.chain,D=di(n);return Cn(v,function(F){var B=i[F];n[F]=B,D&&(n.prototype[F]=function(){var ie=this.__chain__;if(y||ie){var re=n(this.__wrapped__),oe=re.__actions__=cn(this.__actions__);return oe.push({func:B,args:arguments,thisArg:n}),re.__chain__=ie,re}return B.apply(n,Ri([this.value()],arguments))})}),n}function Dv(){return kt._===this&&(kt._=im),this}function bl(){}function Pv(n){return n=Ze(n),Ke(function(i){return wu(i,n)})}var Iv=el(yt),Fv=el(qc),Nv=el(To);function Hf(n){return ol(n)?Eo(ni(n)):fg(n)}function Ov(n){return function(i){return n==null?t:er(n,i)}}var Uv=Xu(),zv=Xu(!0);function wl(){return[]}function Tl(){return!1}function Bv(){return{}}function Gv(){return""}function Wv(){return!0}function Vv(n,i){if(n=Ze(n),n<1||n>ee)return[];var a=ce,f=Zt(n,ce);i=Ie(i),n-=ce;for(var v=Lo(f,i);++a<n;)i(a);return v}function Hv(n){return qe(n)?yt(n,ni):vn(n)?[n]:cn(cf(ut(n)))}function kv(n){var i=++tm;return ut(n)+i}var qv=ga(function(n,i){return n+i},0),Xv=tl("ceil"),Yv=ga(function(n,i){return n/i},1),Zv=tl("floor");function $v(n){return n&&n.length?ca(n,hn,Go):t}function Kv(n,i){return n&&n.length?ca(n,Ie(i,2),Go):t}function Jv(n){return Zc(n,hn)}function Qv(n,i){return Zc(n,Ie(i,2))}function jv(n){return n&&n.length?ca(n,hn,ko):t}function eM(n,i){return n&&n.length?ca(n,Ie(i,2),ko):t}var tM=ga(function(n,i){return n*i},1),nM=tl("round"),iM=ga(function(n,i){return n-i},0);function rM(n){return n&&n.length?Co(n,hn):0}function sM(n,i){return n&&n.length?Co(n,Ie(i,2)):0}return S.after=A0,S.ary=Mf,S.assign=px,S.assignIn=Ff,S.assignInWith=La,S.assignWith=mx,S.at=gx,S.before=Sf,S.bind=dl,S.bindAll=Sv,S.bindKey=yf,S.castArray=B0,S.chain=_f,S.chunk=Zg,S.compact=$g,S.concat=Kg,S.cond=yv,S.conforms=bv,S.constant=Ml,S.countBy=r0,S.create=_x,S.curry=bf,S.curryRight=wf,S.debounce=Tf,S.defaults=xx,S.defaultsDeep=vx,S.defer=C0,S.delay=L0,S.difference=Jg,S.differenceBy=Qg,S.differenceWith=jg,S.drop=e_,S.dropRight=t_,S.dropRightWhile=n_,S.dropWhile=i_,S.fill=r_,S.filter=a0,S.flatMap=c0,S.flatMapDeep=u0,S.flatMapDepth=f0,S.flatten=df,S.flattenDeep=s_,S.flattenDepth=a_,S.flip=R0,S.flow=Tv,S.flowRight=Ev,S.fromPairs=o_,S.functions=Ex,S.functionsIn=Ax,S.groupBy=h0,S.initial=c_,S.intersection=u_,S.intersectionBy=f_,S.intersectionWith=h_,S.invert=Lx,S.invertBy=Rx,S.invokeMap=p0,S.iteratee=Sl,S.keyBy=m0,S.keys=Gt,S.keysIn=fn,S.map=ba,S.mapKeys=Px,S.mapValues=Ix,S.matches=Av,S.matchesProperty=Cv,S.memoize=Ta,S.merge=Fx,S.mergeWith=Nf,S.method=Lv,S.methodOf=Rv,S.mixin=yl,S.negate=Ea,S.nthArg=Pv,S.omit=Nx,S.omitBy=Ox,S.once=D0,S.orderBy=g0,S.over=Iv,S.overArgs=P0,S.overEvery=Fv,S.overSome=Nv,S.partial=pl,S.partialRight=Ef,S.partition=_0,S.pick=Ux,S.pickBy=Of,S.property=Hf,S.propertyOf=Ov,S.pull=g_,S.pullAll=mf,S.pullAllBy=__,S.pullAllWith=x_,S.pullAt=v_,S.range=Uv,S.rangeRight=zv,S.rearg=I0,S.reject=M0,S.remove=M_,S.rest=F0,S.reverse=fl,S.sampleSize=y0,S.set=Bx,S.setWith=Gx,S.shuffle=b0,S.slice=S_,S.sortBy=E0,S.sortedUniq=C_,S.sortedUniqBy=L_,S.split=cv,S.spread=N0,S.tail=R_,S.take=D_,S.takeRight=P_,S.takeRightWhile=I_,S.takeWhile=F_,S.tap=$_,S.throttle=O0,S.thru=ya,S.toArray=Df,S.toPairs=Uf,S.toPairsIn=zf,S.toPath=Hv,S.toPlainObject=If,S.transform=Wx,S.unary=U0,S.union=N_,S.unionBy=O_,S.unionWith=U_,S.uniq=z_,S.uniqBy=B_,S.uniqWith=G_,S.unset=Vx,S.unzip=hl,S.unzipWith=gf,S.update=Hx,S.updateWith=kx,S.values=zr,S.valuesIn=qx,S.without=W_,S.words=Wf,S.wrap=z0,S.xor=V_,S.xorBy=H_,S.xorWith=k_,S.zip=q_,S.zipObject=X_,S.zipObjectDeep=Y_,S.zipWith=Z_,S.entries=Uf,S.entriesIn=zf,S.extend=Ff,S.extendWith=La,yl(S,S),S.add=qv,S.attempt=Vf,S.camelCase=$x,S.capitalize=Bf,S.ceil=Xv,S.clamp=Xx,S.clone=G0,S.cloneDeep=V0,S.cloneDeepWith=H0,S.cloneWith=W0,S.conformsTo=k0,S.deburr=Gf,S.defaultTo=wv,S.divide=Yv,S.endsWith=Kx,S.eq=Xn,S.escape=Jx,S.escapeRegExp=Qx,S.every=s0,S.find=o0,S.findIndex=ff,S.findKey=Mx,S.findLast=l0,S.findLastIndex=hf,S.findLastKey=Sx,S.floor=Zv,S.forEach=xf,S.forEachRight=vf,S.forIn=yx,S.forInRight=bx,S.forOwn=wx,S.forOwnRight=Tx,S.get=_l,S.gt=q0,S.gte=X0,S.has=Cx,S.hasIn=xl,S.head=pf,S.identity=hn,S.includes=d0,S.indexOf=l_,S.inRange=Yx,S.invoke=Dx,S.isArguments=ir,S.isArray=qe,S.isArrayBuffer=Y0,S.isArrayLike=un,S.isArrayLikeObject=Lt,S.isBoolean=Z0,S.isBuffer=Ui,S.isDate=$0,S.isElement=K0,S.isEmpty=J0,S.isEqual=Q0,S.isEqualWith=j0,S.isError=ml,S.isFinite=ex,S.isFunction=di,S.isInteger=Af,S.isLength=Aa,S.isMap=Cf,S.isMatch=tx,S.isMatchWith=nx,S.isNaN=ix,S.isNative=rx,S.isNil=ax,S.isNull=sx,S.isNumber=Lf,S.isObject=wt,S.isObjectLike=At,S.isPlainObject=Ls,S.isRegExp=gl,S.isSafeInteger=ox,S.isSet=Rf,S.isString=Ca,S.isSymbol=vn,S.isTypedArray=Ur,S.isUndefined=lx,S.isWeakMap=cx,S.isWeakSet=ux,S.join=d_,S.kebabCase=jx,S.last=In,S.lastIndexOf=p_,S.lowerCase=ev,S.lowerFirst=tv,S.lt=fx,S.lte=hx,S.max=$v,S.maxBy=Kv,S.mean=Jv,S.meanBy=Qv,S.min=jv,S.minBy=eM,S.stubArray=wl,S.stubFalse=Tl,S.stubObject=Bv,S.stubString=Gv,S.stubTrue=Wv,S.multiply=tM,S.nth=m_,S.noConflict=Dv,S.noop=bl,S.now=wa,S.pad=nv,S.padEnd=iv,S.padStart=rv,S.parseInt=sv,S.random=Zx,S.reduce=x0,S.reduceRight=v0,S.repeat=av,S.replace=ov,S.result=zx,S.round=nM,S.runInContext=U,S.sample=S0,S.size=w0,S.snakeCase=lv,S.some=T0,S.sortedIndex=y_,S.sortedIndexBy=b_,S.sortedIndexOf=w_,S.sortedLastIndex=T_,S.sortedLastIndexBy=E_,S.sortedLastIndexOf=A_,S.startCase=uv,S.startsWith=fv,S.subtract=iM,S.sum=rM,S.sumBy=sM,S.template=hv,S.times=Vv,S.toFinite=pi,S.toInteger=Ze,S.toLength=Pf,S.toLower=dv,S.toNumber=Fn,S.toSafeInteger=dx,S.toString=ut,S.toUpper=pv,S.trim=mv,S.trimEnd=gv,S.trimStart=_v,S.truncate=xv,S.unescape=vv,S.uniqueId=kv,S.upperCase=Mv,S.upperFirst=vl,S.each=xf,S.eachRight=vf,S.first=pf,yl(S,function(){var n={};return ei(S,function(i,a){dt.call(S.prototype,a)||(n[a]=i)}),n}(),{chain:!1}),S.VERSION=r,Cn(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){S[n].placeholder=S}),Cn(["drop","take"],function(n,i){je.prototype[n]=function(a){a=a===t?1:Ut(Ze(a),0);var f=this.__filtered__&&!i?new je(this):this.clone();return f.__filtered__?f.__takeCount__=Zt(a,f.__takeCount__):f.__views__.push({size:Zt(a,ce),type:n+(f.__dir__<0?"Right":"")}),f},je.prototype[n+"Right"]=function(a){return this.reverse()[n](a).reverse()}}),Cn(["filter","map","takeWhile"],function(n,i){var a=i+1,f=a==k||a==he;je.prototype[n]=function(v){var y=this.clone();return y.__iteratees__.push({iteratee:Ie(v,3),type:a}),y.__filtered__=y.__filtered__||f,y}}),Cn(["head","last"],function(n,i){var a="take"+(i?"Right":"");je.prototype[n]=function(){return this[a](1).value()[0]}}),Cn(["initial","tail"],function(n,i){var a="drop"+(i?"":"Right");je.prototype[n]=function(){return this.__filtered__?new je(this):this[a](1)}}),je.prototype.compact=function(){return this.filter(hn)},je.prototype.find=function(n){return this.filter(n).head()},je.prototype.findLast=function(n){return this.reverse().find(n)},je.prototype.invokeMap=Ke(function(n,i){return typeof n=="function"?new je(this):this.map(function(a){return bs(a,n,i)})}),je.prototype.reject=function(n){return this.filter(Ea(Ie(n)))},je.prototype.slice=function(n,i){n=Ze(n);var a=this;return a.__filtered__&&(n>0||i<0)?new je(a):(n<0?a=a.takeRight(-n):n&&(a=a.drop(n)),i!==t&&(i=Ze(i),a=i<0?a.dropRight(-i):a.take(i-n)),a)},je.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},je.prototype.toArray=function(){return this.take(ce)},ei(je.prototype,function(n,i){var a=/^(?:filter|find|map|reject)|While$/.test(i),f=/^(?:head|last)$/.test(i),v=S[f?"take"+(i=="last"?"Right":""):i],y=f||/^find/.test(i);!v||(S.prototype[i]=function(){var D=this.__wrapped__,F=f?[1]:arguments,B=D instanceof je,ie=F[0],re=B||qe(D),oe=function(Je){var it=v.apply(S,Ri([Je],F));return f&&_e?it[0]:it};re&&a&&typeof ie=="function"&&ie.length!=1&&(B=re=!1);var _e=this.__chain__,Ce=!!this.__actions__.length,Ne=y&&!_e,$e=B&&!Ce;if(!y&&re){D=$e?D:new je(this);var Oe=n.apply(D,F);return Oe.__actions__.push({func:ya,args:[oe],thisArg:t}),new Rn(Oe,_e)}return Ne&&$e?n.apply(this,F):(Oe=this.thru(oe),Ne?f?Oe.value()[0]:Oe.value():Oe)})}),Cn(["pop","push","shift","sort","splice","unshift"],function(n){var i=Zs[n],a=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",f=/^(?:pop|shift)$/.test(n);S.prototype[n]=function(){var v=arguments;if(f&&!this.__chain__){var y=this.value();return i.apply(qe(y)?y:[],v)}return this[a](function(D){return i.apply(qe(D)?D:[],v)})}}),ei(je.prototype,function(n,i){var a=S[i];if(a){var f=a.name+"";dt.call(Pr,f)||(Pr[f]=[]),Pr[f].push({name:i,func:a})}}),Pr[ma(t,w).name]=[{name:"wrapper",func:t}],je.prototype.clone=vm,je.prototype.reverse=Mm,je.prototype.value=Sm,S.prototype.at=K_,S.prototype.chain=J_,S.prototype.commit=Q_,S.prototype.next=j_,S.prototype.plant=t0,S.prototype.reverse=n0,S.prototype.toJSON=S.prototype.valueOf=S.prototype.value=i0,S.prototype.first=S.prototype.head,gs&&(S.prototype[gs]=e0),S},Lr=Qp();$i?(($i.exports=Lr)._=Lr,So._=Lr):kt._=Lr}).call(Rs)})(Zi,Zi.exports);const Md={orbiting:{name:"orbiting",config:{mass:{g:1,orbiter:10,attractor:30},distance:{min:50,max:250}}},wandering:{name:"wandering",config:{jitter:.3}}},_M=o=>typeof o=="string"&&o in Md,xM=new Set(["centerScaling","edgeBinding","edgeWrapping"]),vM=o=>typeof o=="string"&&xM.has(o),MM=["stacking","trailing"],SM=new Set(MM),yM=o=>typeof o=="string"&&SM.has(o);/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mc="144",bM=0,Xf=1,wM=2,Sd=1,TM=2,Fs=3,rs=0,Gn=1,qi=2,Yi=0,ns=1,gr=2,Yf=3,Zf=4,EM=5,es=100,AM=101,CM=102,$f=103,Kf=104,LM=200,RM=201,DM=202,PM=203,yd=204,bd=205,IM=206,FM=207,NM=208,OM=209,UM=210,zM=0,BM=1,GM=2,cc=3,WM=4,VM=5,HM=6,kM=7,wd=0,qM=1,XM=2,bi=0,YM=1,ZM=2,$M=3,KM=4,JM=5,Td=300,ss=301,as=302,uc=303,fc=304,so=306,hc=1e3,Qn=1001,dc=1002,dn=1003,Jf=1004,Qf=1005,On=1006,QM=1007,ao=1008,_r=1009,jM=1010,eS=1011,Ed=1012,tS=1013,fr=1014,hr=1015,Os=1016,nS=1017,iS=1018,is=1020,rS=1021,sS=1022,ri=1023,aS=1024,oS=1025,pr=1026,os=1027,lS=1028,cS=1029,uS=1030,fS=1031,hS=1033,El=33776,Al=33777,Cl=33778,Ll=33779,jf=35840,eh=35841,th=35842,nh=35843,dS=36196,ih=37492,rh=37496,sh=37808,ah=37809,oh=37810,lh=37811,ch=37812,uh=37813,fh=37814,hh=37815,dh=37816,ph=37817,mh=37818,gh=37819,_h=37820,xh=37821,vh=36492,xr=3e3,Ct=3001,pS=3200,mS=3201,gS=0,_S=1,Si="srgb",dr="srgb-linear",Rl=7680,xS=519,Mh=35044,oo=35048,Sh="300 es",pc=1035;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const l=s.indexOf(t);l!==-1&&s.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const s=r.slice(0);for(let l=0,u=s.length;l<u;l++)s[l].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dl=Math.PI/180,yh=180/Math.PI;function Us(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Kt[o&255]+Kt[o>>8&255]+Kt[o>>16&255]+Kt[o>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[r&255]+Kt[r>>8&255]+Kt[r>>16&255]+Kt[r>>24&255]).toLowerCase()}function Tn(o,e,t){return Math.max(e,Math.min(t,o))}function vS(o,e){return(o%e+e)%e}function Pl(o,e,t){return(1-t)*o+t*e}function bh(o){return(o&o-1)===0&&o!==0}function mc(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function Da(o,e){switch(e.constructor){case Float32Array:return o;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function yn(o,e){switch(e.constructor){case Float32Array:return o;case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class gt{constructor(e=0,t=0){gt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6],this.y=s[1]*t+s[4]*r+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),s=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*s+e.x,this.y=l*s+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zn{constructor(){zn.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,r,s,l,u,c,d,h){const m=this.elements;return m[0]=e,m[1]=s,m[2]=c,m[3]=t,m[4]=l,m[5]=d,m[6]=r,m[7]=u,m[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,l=this.elements,u=r[0],c=r[3],d=r[6],h=r[1],m=r[4],g=r[7],_=r[2],M=r[5],b=r[8],x=s[0],p=s[3],w=s[6],R=s[1],I=s[4],P=s[7],C=s[2],O=s[5],H=s[8];return l[0]=u*x+c*R+d*C,l[3]=u*p+c*I+d*O,l[6]=u*w+c*P+d*H,l[1]=h*x+m*R+g*C,l[4]=h*p+m*I+g*O,l[7]=h*w+m*P+g*H,l[2]=_*x+M*R+b*C,l[5]=_*p+M*I+b*O,l[8]=_*w+M*P+b*H,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8];return t*u*m-t*c*h-r*l*m+r*c*d+s*l*h-s*u*d}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8],g=m*u-c*h,_=c*d-m*l,M=h*l-u*d,b=t*g+r*_+s*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/b;return e[0]=g*x,e[1]=(s*h-m*r)*x,e[2]=(c*r-s*u)*x,e[3]=_*x,e[4]=(m*t-s*d)*x,e[5]=(s*l-c*t)*x,e[6]=M*x,e[7]=(r*d-h*t)*x,e[8]=(u*t-r*l)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,s,l,u,c){const d=Math.cos(l),h=Math.sin(l);return this.set(r*d,r*h,-r*(d*u+h*c)+u+e,-s*h,s*d,-s*(-h*u+d*c)+c+t,0,0,1),this}scale(e,t){const r=this.elements;return r[0]*=e,r[3]*=e,r[6]*=e,r[1]*=t,r[4]*=t,r[7]*=t,this}rotate(e){const t=Math.cos(e),r=Math.sin(e),s=this.elements,l=s[0],u=s[3],c=s[6],d=s[1],h=s[4],m=s[7];return s[0]=t*l+r*d,s[3]=t*u+r*h,s[6]=t*c+r*m,s[1]=-r*l+t*d,s[4]=-r*u+t*h,s[7]=-r*c+t*m,this}translate(e,t){const r=this.elements;return r[0]+=e*r[2],r[3]+=e*r[5],r[6]+=e*r[8],r[1]+=t*r[2],r[4]+=t*r[5],r[7]+=t*r[8],this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<9;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}function Ad(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function io(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function mr(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function to(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}const Il={[Si]:{[dr]:mr},[dr]:{[Si]:to}},Zn={legacyMode:!0,get workingColorSpace(){return dr},set workingColorSpace(o){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(o,e,t){if(this.legacyMode||e===t||!e||!t)return o;if(Il[e]&&Il[e][t]!==void 0){const r=Il[e][t];return o.r=r(o.r),o.g=r(o.g),o.b=r(o.b),o}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(o,e){return this.convert(o,this.workingColorSpace,e)},toWorkingColorSpace:function(o,e){return this.convert(o,e,this.workingColorSpace)}},Cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zt={r:0,g:0,b:0},$n={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function Fl(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}function Ia(o,e){return e.r=o.r,e.g=o.g,e.b=o.b,e}class vt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&r===void 0?this.set(e):this.setRGB(e,t,r)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Si){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Zn.toWorkingColorSpace(this,t),this}setRGB(e,t,r,s=dr){return this.r=e,this.g=t,this.b=r,Zn.toWorkingColorSpace(this,s),this}setHSL(e,t,r,s=dr){if(e=vS(e,1),t=Tn(t,0,1),r=Tn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=Fl(u,l,e+1/3),this.g=Fl(u,l,e),this.b=Fl(u,l,e-1/3)}return Zn.toWorkingColorSpace(this,s),this}setStyle(e,t=Si){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let l;const u=s[1],c=s[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return this.r=Math.min(255,parseInt(l[1],10))/255,this.g=Math.min(255,parseInt(l[2],10))/255,this.b=Math.min(255,parseInt(l[3],10))/255,Zn.toWorkingColorSpace(this,t),r(l[4]),this;if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return this.r=Math.min(100,parseInt(l[1],10))/100,this.g=Math.min(100,parseInt(l[2],10))/100,this.b=Math.min(100,parseInt(l[3],10))/100,Zn.toWorkingColorSpace(this,t),r(l[4]),this;break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c)){const d=parseFloat(l[1])/360,h=parseFloat(l[2])/100,m=parseFloat(l[3])/100;return r(l[4]),this.setHSL(d,h,m,t)}break}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=s[1],u=l.length;if(u===3)return this.r=parseInt(l.charAt(0)+l.charAt(0),16)/255,this.g=parseInt(l.charAt(1)+l.charAt(1),16)/255,this.b=parseInt(l.charAt(2)+l.charAt(2),16)/255,Zn.toWorkingColorSpace(this,t),this;if(u===6)return this.r=parseInt(l.charAt(0)+l.charAt(1),16)/255,this.g=parseInt(l.charAt(2)+l.charAt(3),16)/255,this.b=parseInt(l.charAt(4)+l.charAt(5),16)/255,Zn.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=Si){const r=Cd[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=to(e.r),this.g=to(e.g),this.b=to(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Si){return Zn.fromWorkingColorSpace(Ia(this,zt),e),Tn(zt.r*255,0,255)<<16^Tn(zt.g*255,0,255)<<8^Tn(zt.b*255,0,255)<<0}getHexString(e=Si){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dr){Zn.fromWorkingColorSpace(Ia(this,zt),t);const r=zt.r,s=zt.g,l=zt.b,u=Math.max(r,s,l),c=Math.min(r,s,l);let d,h;const m=(c+u)/2;if(c===u)d=0,h=0;else{const g=u-c;switch(h=m<=.5?g/(u+c):g/(2-u-c),u){case r:d=(s-l)/g+(s<l?6:0);break;case s:d=(l-r)/g+2;break;case l:d=(r-s)/g+4;break}d/=6}return e.h=d,e.s=h,e.l=m,e}getRGB(e,t=dr){return Zn.fromWorkingColorSpace(Ia(this,zt),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Si){return Zn.fromWorkingColorSpace(Ia(this,zt),e),e!==Si?`color(${e} ${zt.r} ${zt.g} ${zt.b})`:`rgb(${zt.r*255|0},${zt.g*255|0},${zt.b*255|0})`}offsetHSL(e,t,r){return this.getHSL($n),$n.h+=e,$n.s+=t,$n.l+=r,this.setHSL($n.h,$n.s,$n.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL($n),e.getHSL(Pa);const r=Pl($n.h,Pa.h,t),s=Pl($n.s,Pa.s,t),l=Pl($n.l,Pa.l,t);return this.setHSL(r,s,l),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}vt.NAMES=Cd;let Gr;class Ld{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gr===void 0&&(Gr=io("canvas")),Gr.width=e.width,Gr.height=e.height;const r=Gr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Gr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=io("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const s=r.getImageData(0,0,e.width,e.height),l=s.data;for(let u=0;u<l.length;u++)l[u]=mr(l[u]/255)*255;return r.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(mr(t[r]/255)*255):t[r]=mr(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Rd{constructor(e=null){this.isSource=!0,this.uuid=Us(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},s=this.data;if(s!==null){let l;if(Array.isArray(s)){l=[];for(let u=0,c=s.length;u<c;u++)s[u].isDataTexture?l.push(Nl(s[u].image)):l.push(Nl(s[u]))}else l=Nl(s);r.url=l}return t||(e.images[this.uuid]=r),r}}function Nl(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Ld.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let MS=0;class Wn extends cs{constructor(e=Wn.DEFAULT_IMAGE,t=Wn.DEFAULT_MAPPING,r=Qn,s=Qn,l=On,u=ao,c=ri,d=_r,h=1,m=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:MS++}),this.uuid=Us(),this.name="",this.source=new Rd(e),this.mipmaps=[],this.mapping=t,this.wrapS=r,this.wrapT=s,this.magFilter=l,this.minFilter=u,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=d,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Td)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hc:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hc:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Wn.DEFAULT_IMAGE=null;Wn.DEFAULT_MAPPING=Td;class Xt{constructor(e=0,t=0,r=0,s=1){Xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,s){return this.x=e,this.y=t,this.z=r,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*s+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*s+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*s+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*s+u[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,s,l;const d=e.elements,h=d[0],m=d[4],g=d[8],_=d[1],M=d[5],b=d[9],x=d[2],p=d[6],w=d[10];if(Math.abs(m-_)<.01&&Math.abs(g-x)<.01&&Math.abs(b-p)<.01){if(Math.abs(m+_)<.1&&Math.abs(g+x)<.1&&Math.abs(b+p)<.1&&Math.abs(h+M+w-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const I=(h+1)/2,P=(M+1)/2,C=(w+1)/2,O=(m+_)/4,H=(g+x)/4,E=(b+p)/4;return I>P&&I>C?I<.01?(r=0,s=.707106781,l=.707106781):(r=Math.sqrt(I),s=O/r,l=H/r):P>C?P<.01?(r=.707106781,s=0,l=.707106781):(s=Math.sqrt(P),r=O/s,l=E/s):C<.01?(r=.707106781,s=.707106781,l=0):(l=Math.sqrt(C),r=H/l,s=E/l),this.set(r,s,l,t),this}let R=Math.sqrt((p-b)*(p-b)+(g-x)*(g-x)+(_-m)*(_-m));return Math.abs(R)<.001&&(R=1),this.x=(p-b)/R,this.y=(g-x)/R,this.z=(_-m)/R,this.w=Math.acos((h+M+w-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vr extends cs{constructor(e,t,r={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t);const s={width:e,height:t,depth:1};this.texture=new Wn(s,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps!==void 0?r.generateMipmaps:!1,this.texture.internalFormat=r.internalFormat!==void 0?r.internalFormat:null,this.texture.minFilter=r.minFilter!==void 0?r.minFilter:On,this.depthBuffer=r.depthBuffer!==void 0?r.depthBuffer:!0,this.stencilBuffer=r.stencilBuffer!==void 0?r.stencilBuffer:!1,this.depthTexture=r.depthTexture!==void 0?r.depthTexture:null,this.samples=r.samples!==void 0?r.samples:0}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Rd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dd extends Wn{constructor(e=null,t=1,r=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class SS extends Wn{constructor(e=null,t=1,r=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zs{constructor(e=0,t=0,r=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=s}static slerpFlat(e,t,r,s,l,u,c){let d=r[s+0],h=r[s+1],m=r[s+2],g=r[s+3];const _=l[u+0],M=l[u+1],b=l[u+2],x=l[u+3];if(c===0){e[t+0]=d,e[t+1]=h,e[t+2]=m,e[t+3]=g;return}if(c===1){e[t+0]=_,e[t+1]=M,e[t+2]=b,e[t+3]=x;return}if(g!==x||d!==_||h!==M||m!==b){let p=1-c;const w=d*_+h*M+m*b+g*x,R=w>=0?1:-1,I=1-w*w;if(I>Number.EPSILON){const C=Math.sqrt(I),O=Math.atan2(C,w*R);p=Math.sin(p*O)/C,c=Math.sin(c*O)/C}const P=c*R;if(d=d*p+_*P,h=h*p+M*P,m=m*p+b*P,g=g*p+x*P,p===1-c){const C=1/Math.sqrt(d*d+h*h+m*m+g*g);d*=C,h*=C,m*=C,g*=C}}e[t]=d,e[t+1]=h,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,r,s,l,u){const c=r[s],d=r[s+1],h=r[s+2],m=r[s+3],g=l[u],_=l[u+1],M=l[u+2],b=l[u+3];return e[t]=c*b+m*g+d*M-h*_,e[t+1]=d*b+m*_+h*g-c*M,e[t+2]=h*b+m*M+c*_-d*g,e[t+3]=m*b-c*g-d*_-h*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,s){return this._x=e,this._y=t,this._z=r,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const r=e._x,s=e._y,l=e._z,u=e._order,c=Math.cos,d=Math.sin,h=c(r/2),m=c(s/2),g=c(l/2),_=d(r/2),M=d(s/2),b=d(l/2);switch(u){case"XYZ":this._x=_*m*g+h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g-_*M*b;break;case"YXZ":this._x=_*m*g+h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g+_*M*b;break;case"ZXY":this._x=_*m*g-h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g-_*M*b;break;case"ZYX":this._x=_*m*g-h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g+_*M*b;break;case"YZX":this._x=_*m*g+h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g-_*M*b;break;case"XZY":this._x=_*m*g-h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g+_*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,s=Math.sin(r);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],s=t[4],l=t[8],u=t[1],c=t[5],d=t[9],h=t[2],m=t[6],g=t[10],_=r+c+g;if(_>0){const M=.5/Math.sqrt(_+1);this._w=.25/M,this._x=(m-d)*M,this._y=(l-h)*M,this._z=(u-s)*M}else if(r>c&&r>g){const M=2*Math.sqrt(1+r-c-g);this._w=(m-d)/M,this._x=.25*M,this._y=(s+u)/M,this._z=(l+h)/M}else if(c>g){const M=2*Math.sqrt(1+c-r-g);this._w=(l-h)/M,this._x=(s+u)/M,this._y=.25*M,this._z=(d+m)/M}else{const M=2*Math.sqrt(1+g-r-c);this._w=(u-s)/M,this._x=(l+h)/M,this._y=(d+m)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const s=Math.min(1,t/r);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,s=e._y,l=e._z,u=e._w,c=t._x,d=t._y,h=t._z,m=t._w;return this._x=r*m+u*c+s*h-l*d,this._y=s*m+u*d+l*c-r*h,this._z=l*m+u*h+r*d-s*c,this._w=u*m-r*c-s*d-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,s=this._y,l=this._z,u=this._w;let c=u*e._w+r*e._x+s*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=u,this._x=r,this._y=s,this._z=l,this;const d=1-c*c;if(d<=Number.EPSILON){const M=1-t;return this._w=M*u+t*this._w,this._x=M*r+t*this._x,this._y=M*s+t*this._y,this._z=M*l+t*this._z,this.normalize(),this._onChangeCallback(),this}const h=Math.sqrt(d),m=Math.atan2(h,c),g=Math.sin((1-t)*m)/h,_=Math.sin(t*m)/h;return this._w=u*g+this._w*_,this._x=r*g+this._x*_,this._y=s*g+this._y*_,this._z=l*g+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),s=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(s),r*Math.sin(l),r*Math.cos(l),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,r=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,s=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*s,this.y=l[1]*t+l[4]*r+l[7]*s,this.z=l[2]*t+l[5]*r+l[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*s+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*s+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*s+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*s+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,s=this.z,l=e.x,u=e.y,c=e.z,d=e.w,h=d*t+u*s-c*r,m=d*r+c*t-l*s,g=d*s+l*r-u*t,_=-l*t-u*r-c*s;return this.x=h*d+_*-l+m*-c-g*-u,this.y=m*d+_*-u+g*-l-h*-c,this.z=g*d+_*-c+h*-u-m*-l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,s=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*s,this.y=l[1]*t+l[5]*r+l[9]*s,this.z=l[2]*t+l[6]*r+l[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,s=e.y,l=e.z,u=t.x,c=t.y,d=t.z;return this.x=s*d-l*c,this.y=l*u-r*d,this.z=r*c-s*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Ol.copy(this).projectOnVector(e),this.sub(Ol)}reflect(e){return this.sub(Ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Tn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,s=this.z-e.z;return t*t+r*r+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const s=Math.sin(t)*e;return this.x=s*Math.sin(r),this.y=Math.cos(t)*e,this.z=s*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ol=new G,wh=new zs;class Bs{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,r=1/0,s=1/0,l=-1/0,u=-1/0,c=-1/0;for(let d=0,h=e.length;d<h;d+=3){const m=e[d],g=e[d+1],_=e[d+2];m<t&&(t=m),g<r&&(r=g),_<s&&(s=_),m>l&&(l=m),g>u&&(u=g),_>c&&(c=_)}return this.min.set(t,r,s),this.max.set(l,u,c),this}setFromBufferAttribute(e){let t=1/0,r=1/0,s=1/0,l=-1/0,u=-1/0,c=-1/0;for(let d=0,h=e.count;d<h;d++){const m=e.getX(d),g=e.getY(d),_=e.getZ(d);m<t&&(t=m),g<r&&(r=g),_<s&&(s=_),m>l&&(l=m),g>u&&(u=g),_>c&&(c=_)}return this.min.set(t,r,s),this.max.set(l,u,c),this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=rr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0)if(t&&r.attributes!=null&&r.attributes.position!==void 0){const l=r.attributes.position;for(let u=0,c=l.count;u<c;u++)rr.fromBufferAttribute(l,u).applyMatrix4(e.matrixWorld),this.expandByPoint(rr)}else r.boundingBox===null&&r.computeBoundingBox(),Ul.copy(r.boundingBox),Ul.applyMatrix4(e.matrixWorld),this.union(Ul);const s=e.children;for(let l=0,u=s.length;l<u;l++)this.expandByObject(s[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,rr),rr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ds),Fa.subVectors(this.max,Ds),Wr.subVectors(e.a,Ds),Vr.subVectors(e.b,Ds),Hr.subVectors(e.c,Ds),zi.subVectors(Vr,Wr),Bi.subVectors(Hr,Vr),sr.subVectors(Wr,Hr);let t=[0,-zi.z,zi.y,0,-Bi.z,Bi.y,0,-sr.z,sr.y,zi.z,0,-zi.x,Bi.z,0,-Bi.x,sr.z,0,-sr.x,-zi.y,zi.x,0,-Bi.y,Bi.x,0,-sr.y,sr.x,0];return!zl(t,Wr,Vr,Hr,Fa)||(t=[1,0,0,0,1,0,0,0,1],!zl(t,Wr,Vr,Hr,Fa))?!1:(Na.crossVectors(zi,Bi),t=[Na.x,Na.y,Na.z],zl(t,Wr,Vr,Hr,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return rr.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(rr).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gi=[new G,new G,new G,new G,new G,new G,new G,new G],rr=new G,Ul=new Bs,Wr=new G,Vr=new G,Hr=new G,zi=new G,Bi=new G,sr=new G,Ds=new G,Fa=new G,Na=new G,ar=new G;function zl(o,e,t,r,s){for(let l=0,u=o.length-3;l<=u;l+=3){ar.fromArray(o,l);const c=s.x*Math.abs(ar.x)+s.y*Math.abs(ar.y)+s.z*Math.abs(ar.z),d=e.dot(ar),h=t.dot(ar),m=r.dot(ar);if(Math.max(-Math.max(d,h,m),Math.min(d,h,m))>c)return!1}return!0}const yS=new Bs,Th=new G,Oa=new G,Bl=new G;class Gs{constructor(e=new G,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):yS.setFromPoints(e).getCenter(r);let s=0;for(let l=0,u=e.length;l<u;l++)s=Math.max(s,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){Bl.subVectors(e,this.center);const t=Bl.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),s=(r-this.radius)*.5;this.center.add(Bl.multiplyScalar(s/r)),this.radius+=s}return this}union(e){return this.center.equals(e.center)===!0?Oa.set(0,0,1).multiplyScalar(e.radius):Oa.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(Th.copy(e.center).add(Oa)),this.expandByPoint(Th.copy(e.center).sub(Oa)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _i=new G,Gl=new G,Ua=new G,Gi=new G,Wl=new G,za=new G,Vl=new G;class Sc{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(r).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.direction).multiplyScalar(t).add(this.origin),_i.distanceToSquared(e))}distanceSqToSegment(e,t,r,s){Gl.copy(e).add(t).multiplyScalar(.5),Ua.copy(t).sub(e).normalize(),Gi.copy(this.origin).sub(Gl);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Ua),c=Gi.dot(this.direction),d=-Gi.dot(Ua),h=Gi.lengthSq(),m=Math.abs(1-u*u);let g,_,M,b;if(m>0)if(g=u*d-c,_=u*c-d,b=l*m,g>=0)if(_>=-b)if(_<=b){const x=1/m;g*=x,_*=x,M=g*(g+u*_+2*c)+_*(u*g+_+2*d)+h}else _=l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;else _=-l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;else _<=-b?(g=Math.max(0,-(-u*l+c)),_=g>0?-l:Math.min(Math.max(-l,-d),l),M=-g*g+_*(_+2*d)+h):_<=b?(g=0,_=Math.min(Math.max(-l,-d),l),M=_*(_+2*d)+h):(g=Math.max(0,-(u*l+c)),_=g>0?l:Math.min(Math.max(-l,-d),l),M=-g*g+_*(_+2*d)+h);else _=u>0?-l:l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;return r&&r.copy(this.direction).multiplyScalar(g).add(this.origin),s&&s.copy(Ua).multiplyScalar(_).add(Gl),M}intersectSphere(e,t){_i.subVectors(e.center,this.origin);const r=_i.dot(this.direction),s=_i.dot(_i)-r*r,l=e.radius*e.radius;if(s>l)return null;const u=Math.sqrt(l-s),c=r-u,d=r+u;return c<0&&d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,s,l,u,c,d;const h=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,_=this.origin;return h>=0?(r=(e.min.x-_.x)*h,s=(e.max.x-_.x)*h):(r=(e.max.x-_.x)*h,s=(e.min.x-_.x)*h),m>=0?(l=(e.min.y-_.y)*m,u=(e.max.y-_.y)*m):(l=(e.max.y-_.y)*m,u=(e.min.y-_.y)*m),r>u||l>s||((l>r||r!==r)&&(r=l),(u<s||s!==s)&&(s=u),g>=0?(c=(e.min.z-_.z)*g,d=(e.max.z-_.z)*g):(c=(e.max.z-_.z)*g,d=(e.min.z-_.z)*g),r>d||c>s)||((c>r||r!==r)&&(r=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(r>=0?r:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,r,s,l){Wl.subVectors(t,e),za.subVectors(r,e),Vl.crossVectors(Wl,za);let u=this.direction.dot(Vl),c;if(u>0){if(s)return null;c=1}else if(u<0)c=-1,u=-u;else return null;Gi.subVectors(this.origin,e);const d=c*this.direction.dot(za.crossVectors(Gi,za));if(d<0)return null;const h=c*this.direction.dot(Wl.cross(Gi));if(h<0||d+h>u)return null;const m=-c*Gi.dot(Vl);return m<0?null:this.at(m/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,r,s,l,u,c,d,h,m,g,_,M,b,x,p){const w=this.elements;return w[0]=e,w[4]=t,w[8]=r,w[12]=s,w[1]=l,w[5]=u,w[9]=c,w[13]=d,w[2]=h,w[6]=m,w[10]=g,w[14]=_,w[3]=M,w[7]=b,w[11]=x,w[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,s=1/kr.setFromMatrixColumn(e,0).length(),l=1/kr.setFromMatrixColumn(e,1).length(),u=1/kr.setFromMatrixColumn(e,2).length();return t[0]=r[0]*s,t[1]=r[1]*s,t[2]=r[2]*s,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,s=e.y,l=e.z,u=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const _=u*m,M=u*g,b=c*m,x=c*g;t[0]=d*m,t[4]=-d*g,t[8]=h,t[1]=M+b*h,t[5]=_-x*h,t[9]=-c*d,t[2]=x-_*h,t[6]=b+M*h,t[10]=u*d}else if(e.order==="YXZ"){const _=d*m,M=d*g,b=h*m,x=h*g;t[0]=_+x*c,t[4]=b*c-M,t[8]=u*h,t[1]=u*g,t[5]=u*m,t[9]=-c,t[2]=M*c-b,t[6]=x+_*c,t[10]=u*d}else if(e.order==="ZXY"){const _=d*m,M=d*g,b=h*m,x=h*g;t[0]=_-x*c,t[4]=-u*g,t[8]=b+M*c,t[1]=M+b*c,t[5]=u*m,t[9]=x-_*c,t[2]=-u*h,t[6]=c,t[10]=u*d}else if(e.order==="ZYX"){const _=u*m,M=u*g,b=c*m,x=c*g;t[0]=d*m,t[4]=b*h-M,t[8]=_*h+x,t[1]=d*g,t[5]=x*h+_,t[9]=M*h-b,t[2]=-h,t[6]=c*d,t[10]=u*d}else if(e.order==="YZX"){const _=u*d,M=u*h,b=c*d,x=c*h;t[0]=d*m,t[4]=x-_*g,t[8]=b*g+M,t[1]=g,t[5]=u*m,t[9]=-c*m,t[2]=-h*m,t[6]=M*g+b,t[10]=_-x*g}else if(e.order==="XZY"){const _=u*d,M=u*h,b=c*d,x=c*h;t[0]=d*m,t[4]=-g,t[8]=h*m,t[1]=_*g+x,t[5]=u*m,t[9]=M*g-b,t[2]=b*g-M,t[6]=c*m,t[10]=x*g+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bS,e,wS)}lookAt(e,t,r){const s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Wi.crossVectors(r,bn),Wi.lengthSq()===0&&(Math.abs(r.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Wi.crossVectors(r,bn)),Wi.normalize(),Ba.crossVectors(bn,Wi),s[0]=Wi.x,s[4]=Ba.x,s[8]=bn.x,s[1]=Wi.y,s[5]=Ba.y,s[9]=bn.y,s[2]=Wi.z,s[6]=Ba.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,l=this.elements,u=r[0],c=r[4],d=r[8],h=r[12],m=r[1],g=r[5],_=r[9],M=r[13],b=r[2],x=r[6],p=r[10],w=r[14],R=r[3],I=r[7],P=r[11],C=r[15],O=s[0],H=s[4],E=s[8],N=s[12],X=s[1],ue=s[5],ye=s[9],J=s[13],k=s[2],ae=s[6],he=s[10],le=s[14],ee=s[3],q=s[7],Z=s[11],ce=s[15];return l[0]=u*O+c*X+d*k+h*ee,l[4]=u*H+c*ue+d*ae+h*q,l[8]=u*E+c*ye+d*he+h*Z,l[12]=u*N+c*J+d*le+h*ce,l[1]=m*O+g*X+_*k+M*ee,l[5]=m*H+g*ue+_*ae+M*q,l[9]=m*E+g*ye+_*he+M*Z,l[13]=m*N+g*J+_*le+M*ce,l[2]=b*O+x*X+p*k+w*ee,l[6]=b*H+x*ue+p*ae+w*q,l[10]=b*E+x*ye+p*he+w*Z,l[14]=b*N+x*J+p*le+w*ce,l[3]=R*O+I*X+P*k+C*ee,l[7]=R*H+I*ue+P*ae+C*q,l[11]=R*E+I*ye+P*he+C*Z,l[15]=R*N+I*J+P*le+C*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],s=e[8],l=e[12],u=e[1],c=e[5],d=e[9],h=e[13],m=e[2],g=e[6],_=e[10],M=e[14],b=e[3],x=e[7],p=e[11],w=e[15];return b*(+l*d*g-s*h*g-l*c*_+r*h*_+s*c*M-r*d*M)+x*(+t*d*M-t*h*_+l*u*_-s*u*M+s*h*m-l*d*m)+p*(+t*h*g-t*c*M-l*u*g+r*u*M+l*c*m-r*h*m)+w*(-s*c*m-t*d*g+t*c*_+s*u*g-r*u*_+r*d*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8],g=e[9],_=e[10],M=e[11],b=e[12],x=e[13],p=e[14],w=e[15],R=g*p*h-x*_*h+x*d*M-c*p*M-g*d*w+c*_*w,I=b*_*h-m*p*h-b*d*M+u*p*M+m*d*w-u*_*w,P=m*x*h-b*g*h+b*c*M-u*x*M-m*c*w+u*g*w,C=b*g*d-m*x*d-b*c*_+u*x*_+m*c*p-u*g*p,O=t*R+r*I+s*P+l*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/O;return e[0]=R*H,e[1]=(x*_*l-g*p*l-x*s*M+r*p*M+g*s*w-r*_*w)*H,e[2]=(c*p*l-x*d*l+x*s*h-r*p*h-c*s*w+r*d*w)*H,e[3]=(g*d*l-c*_*l-g*s*h+r*_*h+c*s*M-r*d*M)*H,e[4]=I*H,e[5]=(m*p*l-b*_*l+b*s*M-t*p*M-m*s*w+t*_*w)*H,e[6]=(b*d*l-u*p*l-b*s*h+t*p*h+u*s*w-t*d*w)*H,e[7]=(u*_*l-m*d*l+m*s*h-t*_*h-u*s*M+t*d*M)*H,e[8]=P*H,e[9]=(b*g*l-m*x*l-b*r*M+t*x*M+m*r*w-t*g*w)*H,e[10]=(u*x*l-b*c*l+b*r*h-t*x*h-u*r*w+t*c*w)*H,e[11]=(m*c*l-u*g*l-m*r*h+t*g*h+u*r*M-t*c*M)*H,e[12]=C*H,e[13]=(m*x*s-b*g*s+b*r*_-t*x*_-m*r*p+t*g*p)*H,e[14]=(b*c*s-u*x*s-b*r*d+t*x*d+u*r*p-t*c*p)*H,e[15]=(u*g*s-m*c*s+m*r*d-t*g*d-u*r*_+t*c*_)*H,this}scale(e){const t=this.elements,r=e.x,s=e.y,l=e.z;return t[0]*=r,t[4]*=s,t[8]*=l,t[1]*=r,t[5]*=s,t[9]*=l,t[2]*=r,t[6]*=s,t[10]*=l,t[3]*=r,t[7]*=s,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,s))}makeTranslation(e,t,r){return this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),s=Math.sin(t),l=1-r,u=e.x,c=e.y,d=e.z,h=l*u,m=l*c;return this.set(h*u+r,h*c-s*d,h*d+s*c,0,h*c+s*d,m*c+r,m*d-s*u,0,h*d-s*c,m*d+s*u,l*d*d+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,s,l,u){return this.set(1,r,l,0,e,1,u,0,t,s,1,0,0,0,0,1),this}compose(e,t,r){const s=this.elements,l=t._x,u=t._y,c=t._z,d=t._w,h=l+l,m=u+u,g=c+c,_=l*h,M=l*m,b=l*g,x=u*m,p=u*g,w=c*g,R=d*h,I=d*m,P=d*g,C=r.x,O=r.y,H=r.z;return s[0]=(1-(x+w))*C,s[1]=(M+P)*C,s[2]=(b-I)*C,s[3]=0,s[4]=(M-P)*O,s[5]=(1-(_+w))*O,s[6]=(p+R)*O,s[7]=0,s[8]=(b+I)*H,s[9]=(p-R)*H,s[10]=(1-(_+x))*H,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,r){const s=this.elements;let l=kr.set(s[0],s[1],s[2]).length();const u=kr.set(s[4],s[5],s[6]).length(),c=kr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(l=-l),e.x=s[12],e.y=s[13],e.z=s[14],Kn.copy(this);const h=1/l,m=1/u,g=1/c;return Kn.elements[0]*=h,Kn.elements[1]*=h,Kn.elements[2]*=h,Kn.elements[4]*=m,Kn.elements[5]*=m,Kn.elements[6]*=m,Kn.elements[8]*=g,Kn.elements[9]*=g,Kn.elements[10]*=g,t.setFromRotationMatrix(Kn),r.x=l,r.y=u,r.z=c,this}makePerspective(e,t,r,s,l,u){const c=this.elements,d=2*l/(t-e),h=2*l/(r-s),m=(t+e)/(t-e),g=(r+s)/(r-s),_=-(u+l)/(u-l),M=-2*u*l/(u-l);return c[0]=d,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=h,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,r,s,l,u){const c=this.elements,d=1/(t-e),h=1/(r-s),m=1/(u-l),g=(t+e)*d,_=(r+s)*h,M=(u+l)*m;return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-g,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-_,c[2]=0,c[6]=0,c[10]=-2*m,c[14]=-M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<16;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const kr=new G,Kn=new Bt,bS=new G(0,0,0),wS=new G(1,1,1),Wi=new G,Ba=new G,bn=new G,Eh=new Bt,Ah=new zs;class Ws{constructor(e=0,t=0,r=0,s=Ws.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,s=this._order){return this._x=e,this._y=t,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const s=e.elements,l=s[0],u=s[4],c=s[8],d=s[1],h=s[5],m=s[9],g=s[2],_=s[6],M=s[10];switch(t){case"XYZ":this._y=Math.asin(Tn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,M),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Tn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,M),this._z=Math.atan2(d,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(Tn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-u,h)):(this._y=0,this._z=Math.atan2(d,l));break;case"ZYX":this._y=Math.asin(-Tn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(_,M),this._z=Math.atan2(d,l)):(this._x=0,this._z=Math.atan2(-u,h));break;case"YZX":this._z=Math.asin(Tn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(c,M));break;case"XZY":this._z=Math.asin(-Tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-m,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eh,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ah.setFromEuler(this),this.setFromQuaternion(Ah,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}Ws.DefaultOrder="XYZ";Ws.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Pd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let TS=0;const Ch=new G,qr=new zs,xi=new Bt,Ga=new G,Ps=new G,ES=new G,AS=new zs,Lh=new G(1,0,0),Rh=new G(0,1,0),Dh=new G(0,0,1),CS={type:"added"},Ph={type:"removed"};class sn extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:TS++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DefaultUp.clone();const e=new G,t=new Ws,r=new zs,s=new G(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Bt},normalMatrix:{value:new zn}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=sn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=sn.DefaultMatrixWorldAutoUpdate,this.layers=new Pd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qr.setFromAxisAngle(e,t),this.quaternion.multiply(qr),this}rotateOnWorldAxis(e,t){return qr.setFromAxisAngle(e,t),this.quaternion.premultiply(qr),this}rotateX(e){return this.rotateOnAxis(Lh,e)}rotateY(e){return this.rotateOnAxis(Rh,e)}rotateZ(e){return this.rotateOnAxis(Dh,e)}translateOnAxis(e,t){return Ch.copy(e).applyQuaternion(this.quaternion),this.position.add(Ch.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lh,e)}translateY(e){return this.translateOnAxis(Rh,e)}translateZ(e){return this.translateOnAxis(Dh,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Ga.copy(e):Ga.set(e,t,r);const s=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(Ps,Ga,this.up):xi.lookAt(Ga,Ps,this.up),this.quaternion.setFromRotationMatrix(xi),s&&(xi.extractRotation(s.matrixWorld),qr.setFromRotationMatrix(xi),this.quaternion.premultiply(qr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(CS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ph)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Ph)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,s=this.children.length;r<s;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,e,ES),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,AS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,s=t.length;r<s;r++){const l=t[r];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let l=0,u=s.length;l<u;l++){const c=s[l];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function l(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const d=c.shapes;if(Array.isArray(d))for(let h=0,m=d.length;h<m;h++){const g=d[h];l(e.shapes,g)}else l(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let d=0,h=this.material.length;d<h;d++)c.push(l(e.materials,this.material[d]));s.material=c}else s.material=l(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const d=this.animations[c];s.animations.push(l(e.animations,d))}}if(t){const c=u(e.geometries),d=u(e.materials),h=u(e.textures),m=u(e.images),g=u(e.shapes),_=u(e.skeletons),M=u(e.animations),b=u(e.nodes);c.length>0&&(r.geometries=c),d.length>0&&(r.materials=d),h.length>0&&(r.textures=h),m.length>0&&(r.images=m),g.length>0&&(r.shapes=g),_.length>0&&(r.skeletons=_),M.length>0&&(r.animations=M),b.length>0&&(r.nodes=b)}return r.object=s,r;function u(c){const d=[];for(const h in c){const m=c[h];delete m.metadata,d.push(m)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const s=e.children[r];this.add(s.clone())}return this}}sn.DefaultUp=new G(0,1,0);sn.DefaultMatrixAutoUpdate=!0;sn.DefaultMatrixWorldAutoUpdate=!0;const Jn=new G,vi=new G,Hl=new G,Mi=new G,Xr=new G,Yr=new G,Ih=new G,kl=new G,ql=new G,Xl=new G;class yi{constructor(e=new G,t=new G,r=new G){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,s){s.subVectors(r,t),Jn.subVectors(e,t),s.cross(Jn);const l=s.lengthSq();return l>0?s.multiplyScalar(1/Math.sqrt(l)):s.set(0,0,0)}static getBarycoord(e,t,r,s,l){Jn.subVectors(s,t),vi.subVectors(r,t),Hl.subVectors(e,t);const u=Jn.dot(Jn),c=Jn.dot(vi),d=Jn.dot(Hl),h=vi.dot(vi),m=vi.dot(Hl),g=u*h-c*c;if(g===0)return l.set(-2,-1,-1);const _=1/g,M=(h*d-c*m)*_,b=(u*m-c*d)*_;return l.set(1-M-b,b,M)}static containsPoint(e,t,r,s){return this.getBarycoord(e,t,r,s,Mi),Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getUV(e,t,r,s,l,u,c,d){return this.getBarycoord(e,t,r,s,Mi),d.set(0,0),d.addScaledVector(l,Mi.x),d.addScaledVector(u,Mi.y),d.addScaledVector(c,Mi.z),d}static isFrontFacing(e,t,r,s){return Jn.subVectors(r,t),vi.subVectors(e,t),Jn.cross(vi).dot(s)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,s){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,r,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Jn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,s,l){return yi.getUV(e,this.a,this.b,this.c,t,r,s,l)}containsPoint(e){return yi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,s=this.b,l=this.c;let u,c;Xr.subVectors(s,r),Yr.subVectors(l,r),kl.subVectors(e,r);const d=Xr.dot(kl),h=Yr.dot(kl);if(d<=0&&h<=0)return t.copy(r);ql.subVectors(e,s);const m=Xr.dot(ql),g=Yr.dot(ql);if(m>=0&&g<=m)return t.copy(s);const _=d*g-m*h;if(_<=0&&d>=0&&m<=0)return u=d/(d-m),t.copy(r).addScaledVector(Xr,u);Xl.subVectors(e,l);const M=Xr.dot(Xl),b=Yr.dot(Xl);if(b>=0&&M<=b)return t.copy(l);const x=M*h-d*b;if(x<=0&&h>=0&&b<=0)return c=h/(h-b),t.copy(r).addScaledVector(Yr,c);const p=m*b-M*g;if(p<=0&&g-m>=0&&M-b>=0)return Ih.subVectors(l,s),c=(g-m)/(g-m+(M-b)),t.copy(s).addScaledVector(Ih,c);const w=1/(p+x+_);return u=x*w,c=_*w,t.copy(r).addScaledVector(Xr,u).addScaledVector(Yr,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let LS=0;class us extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:LS++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=ns,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=yd,this.blendDst=bd,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=cc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xS,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rl,this.stencilZFail=Rl,this.stencilZPass=Rl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const s=this[t];if(s===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}s&&s.isColor?s.set(r):s&&s.isVector3&&r&&r.isVector3?s.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(r.blending=this.blending),this.side!==rs&&(r.side=this.side),this.vertexColors&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=this.transparent),r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.stencilWrite=this.stencilWrite,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(r.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(r.wireframe=this.wireframe),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=this.flatShading),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData);function s(l){const u=[];for(const c in l){const d=l[c];delete d.metadata,u.push(d)}return u}if(t){const l=s(e.textures),u=s(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const s=t.length;r=new Array(s);for(let l=0;l!==s;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Id extends us{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ft=new G,Wa=new gt;class pn{constructor(e,t,r){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r===!0,this.usage=Mh,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let s=0,l=this.itemSize;s<l;s++)this.array[e+s]=t.array[r+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Wa.fromBufferAttribute(this,t),Wa.applyMatrix3(e),this.setXY(t,Wa.x,Wa.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Da(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Da(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Da(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Da(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),r=yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,s){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),r=yn(r,this.array),s=yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this}setXYZW(e,t,r,s,l){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),r=yn(r,this.array),s=yn(s,this.array),l=yn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mh&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Fd extends pn{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Nd extends pn{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class wi extends pn{constructor(e,t,r){super(new Float32Array(e),t,r)}}let RS=0;const Nn=new Bt,Yl=new sn,Zr=new G,wn=new Bs,Is=new Bs,Wt=new G;class mn extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:RS++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ad(e)?Nd:Fd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new zn().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,r){return Nn.makeTranslation(e,t,r),this.applyMatrix4(Nn),this}scale(e,t,r){return Nn.makeScale(e,t,r),this.applyMatrix4(Nn),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(e){const t=[];for(let r=0,s=e.length;r<s;r++){const l=e[r];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new wi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const l=t[r];wn.setFromBufferAttribute(l),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(e){const r=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const c=t[l];Is.setFromBufferAttribute(c),this.morphTargetsRelative?(Wt.addVectors(wn.min,Is.min),wn.expandByPoint(Wt),Wt.addVectors(wn.max,Is.max),wn.expandByPoint(Wt)):(wn.expandByPoint(Is.min),wn.expandByPoint(Is.max))}wn.getCenter(r);let s=0;for(let l=0,u=e.count;l<u;l++)Wt.fromBufferAttribute(e,l),s=Math.max(s,r.distanceToSquared(Wt));if(t)for(let l=0,u=t.length;l<u;l++){const c=t[l],d=this.morphTargetsRelative;for(let h=0,m=c.count;h<m;h++)Wt.fromBufferAttribute(c,h),d&&(Zr.fromBufferAttribute(e,h),Wt.add(Zr)),s=Math.max(s,r.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,s=t.position.array,l=t.normal.array,u=t.uv.array,c=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*c),4));const d=this.getAttribute("tangent").array,h=[],m=[];for(let X=0;X<c;X++)h[X]=new G,m[X]=new G;const g=new G,_=new G,M=new G,b=new gt,x=new gt,p=new gt,w=new G,R=new G;function I(X,ue,ye){g.fromArray(s,X*3),_.fromArray(s,ue*3),M.fromArray(s,ye*3),b.fromArray(u,X*2),x.fromArray(u,ue*2),p.fromArray(u,ye*2),_.sub(g),M.sub(g),x.sub(b),p.sub(b);const J=1/(x.x*p.y-p.x*x.y);!isFinite(J)||(w.copy(_).multiplyScalar(p.y).addScaledVector(M,-x.y).multiplyScalar(J),R.copy(M).multiplyScalar(x.x).addScaledVector(_,-p.x).multiplyScalar(J),h[X].add(w),h[ue].add(w),h[ye].add(w),m[X].add(R),m[ue].add(R),m[ye].add(R))}let P=this.groups;P.length===0&&(P=[{start:0,count:r.length}]);for(let X=0,ue=P.length;X<ue;++X){const ye=P[X],J=ye.start,k=ye.count;for(let ae=J,he=J+k;ae<he;ae+=3)I(r[ae+0],r[ae+1],r[ae+2])}const C=new G,O=new G,H=new G,E=new G;function N(X){H.fromArray(l,X*3),E.copy(H);const ue=h[X];C.copy(ue),C.sub(H.multiplyScalar(H.dot(ue))).normalize(),O.crossVectors(E,ue);const J=O.dot(m[X])<0?-1:1;d[X*4]=C.x,d[X*4+1]=C.y,d[X*4+2]=C.z,d[X*4+3]=J}for(let X=0,ue=P.length;X<ue;++X){const ye=P[X],J=ye.start,k=ye.count;for(let ae=J,he=J+k;ae<he;ae+=3)N(r[ae+0]),N(r[ae+1]),N(r[ae+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let _=0,M=r.count;_<M;_++)r.setXYZ(_,0,0,0);const s=new G,l=new G,u=new G,c=new G,d=new G,h=new G,m=new G,g=new G;if(e)for(let _=0,M=e.count;_<M;_+=3){const b=e.getX(_+0),x=e.getX(_+1),p=e.getX(_+2);s.fromBufferAttribute(t,b),l.fromBufferAttribute(t,x),u.fromBufferAttribute(t,p),m.subVectors(u,l),g.subVectors(s,l),m.cross(g),c.fromBufferAttribute(r,b),d.fromBufferAttribute(r,x),h.fromBufferAttribute(r,p),c.add(m),d.add(m),h.add(m),r.setXYZ(b,c.x,c.y,c.z),r.setXYZ(x,d.x,d.y,d.z),r.setXYZ(p,h.x,h.y,h.z)}else for(let _=0,M=t.count;_<M;_+=3)s.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),u.fromBufferAttribute(t,_+2),m.subVectors(u,l),g.subVectors(s,l),m.cross(g),r.setXYZ(_+0,m.x,m.y,m.z),r.setXYZ(_+1,m.x,m.y,m.z),r.setXYZ(_+2,m.x,m.y,m.z);this.normalizeNormals(),r.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(c,d){const h=c.array,m=c.itemSize,g=c.normalized,_=new h.constructor(d.length*m);let M=0,b=0;for(let x=0,p=d.length;x<p;x++){c.isInterleavedBufferAttribute?M=d[x]*c.data.stride+c.offset:M=d[x]*m;for(let w=0;w<m;w++)_[b++]=h[M++]}return new pn(_,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mn,r=this.index.array,s=this.attributes;for(const c in s){const d=s[c],h=e(d,r);t.setAttribute(c,h)}const l=this.morphAttributes;for(const c in l){const d=[],h=l[c];for(let m=0,g=h.length;m<g;m++){const _=h[m],M=e(_,r);d.push(M)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let c=0,d=u.length;c<d;c++){const h=u[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const h in d)d[h]!==void 0&&(e[h]=d[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const d in r){const h=r[d];e.data.attributes[d]=h.toJSON(e.data)}const s={};let l=!1;for(const d in this.morphAttributes){const h=this.morphAttributes[d],m=[];for(let g=0,_=h.length;g<_;g++){const M=h[g];m.push(M.toJSON(e.data))}m.length>0&&(s[d]=m,l=!0)}l&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const s=e.attributes;for(const h in s){const m=s[h];this.setAttribute(h,m.clone(t))}const l=e.morphAttributes;for(const h in l){const m=[],g=l[h];for(let _=0,M=g.length;_<M;_++)m.push(g[_].clone(t));this.morphAttributes[h]=m}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let h=0,m=u.length;h<m;h++){const g=u[h];this.addGroup(g.start,g.count,g.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fh=new Bt,$r=new Sc,Zl=new Gs,Vi=new G,Hi=new G,ki=new G,$l=new G,Kl=new G,Jl=new G,Va=new G,Ha=new G,ka=new G,qa=new gt,Xa=new gt,Ya=new gt,Ql=new G,Za=new G;class Xi extends sn{constructor(e=new mn,t=new Id){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}raycast(e,t){const r=this.geometry,s=this.material,l=this.matrixWorld;if(s===void 0||(r.boundingSphere===null&&r.computeBoundingSphere(),Zl.copy(r.boundingSphere),Zl.applyMatrix4(l),e.ray.intersectsSphere(Zl)===!1)||(Fh.copy(l).invert(),$r.copy(e.ray).applyMatrix4(Fh),r.boundingBox!==null&&$r.intersectsBox(r.boundingBox)===!1))return;let u;const c=r.index,d=r.attributes.position,h=r.morphAttributes.position,m=r.morphTargetsRelative,g=r.attributes.uv,_=r.attributes.uv2,M=r.groups,b=r.drawRange;if(c!==null)if(Array.isArray(s))for(let x=0,p=M.length;x<p;x++){const w=M[x],R=s[w.materialIndex],I=Math.max(w.start,b.start),P=Math.min(c.count,Math.min(w.start+w.count,b.start+b.count));for(let C=I,O=P;C<O;C+=3){const H=c.getX(C),E=c.getX(C+1),N=c.getX(C+2);u=$a(this,R,e,$r,d,h,m,g,_,H,E,N),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=w.materialIndex,t.push(u))}}else{const x=Math.max(0,b.start),p=Math.min(c.count,b.start+b.count);for(let w=x,R=p;w<R;w+=3){const I=c.getX(w),P=c.getX(w+1),C=c.getX(w+2);u=$a(this,s,e,$r,d,h,m,g,_,I,P,C),u&&(u.faceIndex=Math.floor(w/3),t.push(u))}}else if(d!==void 0)if(Array.isArray(s))for(let x=0,p=M.length;x<p;x++){const w=M[x],R=s[w.materialIndex],I=Math.max(w.start,b.start),P=Math.min(d.count,Math.min(w.start+w.count,b.start+b.count));for(let C=I,O=P;C<O;C+=3){const H=C,E=C+1,N=C+2;u=$a(this,R,e,$r,d,h,m,g,_,H,E,N),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=w.materialIndex,t.push(u))}}else{const x=Math.max(0,b.start),p=Math.min(d.count,b.start+b.count);for(let w=x,R=p;w<R;w+=3){const I=w,P=w+1,C=w+2;u=$a(this,s,e,$r,d,h,m,g,_,I,P,C),u&&(u.faceIndex=Math.floor(w/3),t.push(u))}}}}function DS(o,e,t,r,s,l,u,c){let d;if(e.side===Gn?d=r.intersectTriangle(u,l,s,!0,c):d=r.intersectTriangle(s,l,u,e.side!==qi,c),d===null)return null;Za.copy(c),Za.applyMatrix4(o.matrixWorld);const h=t.ray.origin.distanceTo(Za);return h<t.near||h>t.far?null:{distance:h,point:Za.clone(),object:o}}function $a(o,e,t,r,s,l,u,c,d,h,m,g){Vi.fromBufferAttribute(s,h),Hi.fromBufferAttribute(s,m),ki.fromBufferAttribute(s,g);const _=o.morphTargetInfluences;if(l&&_){Va.set(0,0,0),Ha.set(0,0,0),ka.set(0,0,0);for(let b=0,x=l.length;b<x;b++){const p=_[b],w=l[b];p!==0&&($l.fromBufferAttribute(w,h),Kl.fromBufferAttribute(w,m),Jl.fromBufferAttribute(w,g),u?(Va.addScaledVector($l,p),Ha.addScaledVector(Kl,p),ka.addScaledVector(Jl,p)):(Va.addScaledVector($l.sub(Vi),p),Ha.addScaledVector(Kl.sub(Hi),p),ka.addScaledVector(Jl.sub(ki),p)))}Vi.add(Va),Hi.add(Ha),ki.add(ka)}o.isSkinnedMesh&&(o.boneTransform(h,Vi),o.boneTransform(m,Hi),o.boneTransform(g,ki));const M=DS(o,e,t,r,Vi,Hi,ki,Ql);if(M){c&&(qa.fromBufferAttribute(c,h),Xa.fromBufferAttribute(c,m),Ya.fromBufferAttribute(c,g),M.uv=yi.getUV(Ql,Vi,Hi,ki,qa,Xa,Ya,new gt)),d&&(qa.fromBufferAttribute(d,h),Xa.fromBufferAttribute(d,m),Ya.fromBufferAttribute(d,g),M.uv2=yi.getUV(Ql,Vi,Hi,ki,qa,Xa,Ya,new gt));const b={a:h,b:m,c:g,normal:new G,materialIndex:0};yi.getNormal(Vi,Hi,ki,b.normal),M.face=b}return M}class Vs extends mn{constructor(e=1,t=1,r=1,s=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:s,heightSegments:l,depthSegments:u};const c=this;s=Math.floor(s),l=Math.floor(l),u=Math.floor(u);const d=[],h=[],m=[],g=[];let _=0,M=0;b("z","y","x",-1,-1,r,t,e,u,l,0),b("z","y","x",1,-1,r,t,-e,u,l,1),b("x","z","y",1,1,e,r,t,s,u,2),b("x","z","y",1,-1,e,r,-t,s,u,3),b("x","y","z",1,-1,e,t,r,s,l,4),b("x","y","z",-1,-1,e,t,-r,s,l,5),this.setIndex(d),this.setAttribute("position",new wi(h,3)),this.setAttribute("normal",new wi(m,3)),this.setAttribute("uv",new wi(g,2));function b(x,p,w,R,I,P,C,O,H,E,N){const X=P/H,ue=C/E,ye=P/2,J=C/2,k=O/2,ae=H+1,he=E+1;let le=0,ee=0;const q=new G;for(let Z=0;Z<he;Z++){const ce=Z*ue-J;for(let pe=0;pe<ae;pe++){const de=pe*X-ye;q[x]=de*R,q[p]=ce*I,q[w]=k,h.push(q.x,q.y,q.z),q[x]=0,q[p]=0,q[w]=O>0?1:-1,m.push(q.x,q.y,q.z),g.push(pe/H),g.push(1-Z/E),le+=1}}for(let Z=0;Z<E;Z++)for(let ce=0;ce<H;ce++){const pe=_+ce+ae*Z,de=_+ce+ae*(Z+1),Ae=_+(ce+1)+ae*(Z+1),Ue=_+(ce+1)+ae*Z;d.push(pe,de,Ue),d.push(de,Ae,Ue),ee+=6}c.addGroup(M,ee,N),M+=ee,_+=le}}static fromJSON(e){return new Vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ls(o){const e={};for(const t in o){e[t]={};for(const r in o[t]){const s=o[t][r];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?e[t][r]=s.clone():Array.isArray(s)?e[t][r]=s.slice():e[t][r]=s}}return e}function Jt(o){const e={};for(let t=0;t<o.length;t++){const r=ls(o[t]);for(const s in r)e[s]=r[s]}return e}function PS(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}const IS={clone:ls,merge:Jt};var FS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,NS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mr extends us{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=FS,this.fragmentShader=NS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=PS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const u=this.uniforms[s].value;u&&u.isTexture?t.uniforms[s]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[s]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[s]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[s]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[s]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[s]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[s]={type:"m4",value:u.toArray()}:t.uniforms[s]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const r={};for(const s in this.extensions)this.extensions[s]===!0&&(r[s]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Od extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Un extends Od{constructor(e=50,t=1,r=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yh*2*Math.atan(Math.tan(Dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,s,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dl*.5*this.fov)/this.zoom,r=2*t,s=this.aspect*r,l=-.5*s;const u=this.view;if(this.view!==null&&this.view.enabled){const d=u.fullWidth,h=u.fullHeight;l+=u.offsetX*s/d,t-=u.offsetY*r/h,s*=u.width/d,r*=u.height/h}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+s,t,t-r,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Kr=90,Jr=1;class OS extends sn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r;const s=new Un(Kr,Jr,e,t);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new G(1,0,0)),this.add(s);const l=new Un(Kr,Jr,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new G(-1,0,0)),this.add(l);const u=new Un(Kr,Jr,e,t);u.layers=this.layers,u.up.set(0,0,1),u.lookAt(new G(0,1,0)),this.add(u);const c=new Un(Kr,Jr,e,t);c.layers=this.layers,c.up.set(0,0,-1),c.lookAt(new G(0,-1,0)),this.add(c);const d=new Un(Kr,Jr,e,t);d.layers=this.layers,d.up.set(0,-1,0),d.lookAt(new G(0,0,1)),this.add(d);const h=new Un(Kr,Jr,e,t);h.layers=this.layers,h.up.set(0,-1,0),h.lookAt(new G(0,0,-1)),this.add(h)}update(e,t){this.parent===null&&this.updateMatrixWorld();const r=this.renderTarget,[s,l,u,c,d,h]=this.children,m=e.getRenderTarget(),g=e.toneMapping,_=e.xr.enabled;e.toneMapping=bi,e.xr.enabled=!1;const M=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0),e.render(t,s),e.setRenderTarget(r,1),e.render(t,l),e.setRenderTarget(r,2),e.render(t,u),e.setRenderTarget(r,3),e.render(t,c),e.setRenderTarget(r,4),e.render(t,d),r.texture.generateMipmaps=M,e.setRenderTarget(r,5),e.render(t,h),e.setRenderTarget(m),e.toneMapping=g,e.xr.enabled=_,r.texture.needsPMREMUpdate=!0}}class Ud extends Wn{constructor(e,t,r,s,l,u,c,d,h,m){e=e!==void 0?e:[],t=t!==void 0?t:ss,super(e,t,r,s,l,u,c,d,h,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class US extends vr{constructor(e,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},s=[r,r,r,r,r,r];this.texture=new Ud(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:On}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Vs(5,5,5),l=new Mr({name:"CubemapFromEquirect",uniforms:ls(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Gn,blending:Yi});l.uniforms.tEquirect.value=t;const u=new Xi(s,l),c=t.minFilter;return t.minFilter===ao&&(t.minFilter=On),new OS(1,10,this).update(e,u),t.minFilter=c,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,r,s){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,s);e.setRenderTarget(l)}}const jl=new G,zS=new G,BS=new zn;class or{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,s){return this.normal.set(e,t,r),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const s=jl.subVectors(r,t).cross(zS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const r=e.delta(jl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/s;return l<0||l>1?null:t.copy(r).multiplyScalar(l).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||BS.getNormalMatrix(e),s=this.coplanarPoint(jl).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-s.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qr=new Gs,Ka=new G;class zd{constructor(e=new or,t=new or,r=new or,s=new or,l=new or,u=new or){this.planes=[e,t,r,s,l,u]}set(e,t,r,s,l,u){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(r),c[3].copy(s),c[4].copy(l),c[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e){const t=this.planes,r=e.elements,s=r[0],l=r[1],u=r[2],c=r[3],d=r[4],h=r[5],m=r[6],g=r[7],_=r[8],M=r[9],b=r[10],x=r[11],p=r[12],w=r[13],R=r[14],I=r[15];return t[0].setComponents(c-s,g-d,x-_,I-p).normalize(),t[1].setComponents(c+s,g+d,x+_,I+p).normalize(),t[2].setComponents(c+l,g+h,x+M,I+w).normalize(),t[3].setComponents(c-l,g-h,x-M,I-w).normalize(),t[4].setComponents(c-u,g-m,x-b,I-R).normalize(),t[5].setComponents(c+u,g+m,x+b,I+R).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Qr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Qr)}intersectsSprite(e){return Qr.center.set(0,0,0),Qr.radius=.7071067811865476,Qr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qr)}intersectsSphere(e){const t=this.planes,r=e.center,s=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const s=t[r];if(Ka.x=s.normal.x>0?e.max.x:e.min.x,Ka.y=s.normal.y>0?e.max.y:e.min.y,Ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bd(){let o=null,e=!1,t=null,r=null;function s(l,u){t(l,u),r=o.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(r=o.requestAnimationFrame(s),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){o=l}}}function GS(o,e){const t=e.isWebGL2,r=new WeakMap;function s(h,m){const g=h.array,_=h.usage,M=o.createBuffer();o.bindBuffer(m,M),o.bufferData(m,g,_),h.onUploadCallback();let b;if(g instanceof Float32Array)b=5126;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)b=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=5123;else if(g instanceof Int16Array)b=5122;else if(g instanceof Uint32Array)b=5125;else if(g instanceof Int32Array)b=5124;else if(g instanceof Int8Array)b=5120;else if(g instanceof Uint8Array)b=5121;else if(g instanceof Uint8ClampedArray)b=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:M,type:b,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version}}function l(h,m,g){const _=m.array,M=m.updateRange;o.bindBuffer(g,h),M.count===-1?o.bufferSubData(g,0,_):(t?o.bufferSubData(g,M.offset*_.BYTES_PER_ELEMENT,_,M.offset,M.count):o.bufferSubData(g,M.offset*_.BYTES_PER_ELEMENT,_.subarray(M.offset,M.offset+M.count)),M.count=-1)}function u(h){return h.isInterleavedBufferAttribute&&(h=h.data),r.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=r.get(h);m&&(o.deleteBuffer(m.buffer),r.delete(h))}function d(h,m){if(h.isGLBufferAttribute){const _=r.get(h);(!_||_.version<h.version)&&r.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=r.get(h);g===void 0?r.set(h,s(h,m)):g.version<h.version&&(l(g.buffer,h,m),g.version=h.version)}return{get:u,remove:c,update:d}}class yc extends mn{constructor(e=1,t=1,r=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:s};const l=e/2,u=t/2,c=Math.floor(r),d=Math.floor(s),h=c+1,m=d+1,g=e/c,_=t/d,M=[],b=[],x=[],p=[];for(let w=0;w<m;w++){const R=w*_-u;for(let I=0;I<h;I++){const P=I*g-l;b.push(P,-R,0),x.push(0,0,1),p.push(I/c),p.push(1-w/d)}}for(let w=0;w<d;w++)for(let R=0;R<c;R++){const I=R+h*w,P=R+h*(w+1),C=R+1+h*(w+1),O=R+1+h*w;M.push(I,P,O),M.push(P,C,O)}this.setIndex(M),this.setAttribute("position",new wi(b,3)),this.setAttribute("normal",new wi(x,3)),this.setAttribute("uv",new wi(p,2))}static fromJSON(e){return new yc(e.width,e.height,e.widthSegments,e.heightSegments)}}var WS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,VS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HS=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,kS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,XS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,YS="vec3 transformed = vec3( position );",ZS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$S=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,KS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,JS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,QS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,jS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ty=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,iy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ry=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ay=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,oy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ly=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,fy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dy="gl_FragColor = linearToOutputTexel( gl_FragColor );",py=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,my=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_y=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,My=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,by=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ty=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ey=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ay=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
#define Material_LightProbeLOD( material )	(0)`,Ly=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ry=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Dy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Py=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Iy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Ny=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Oy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Uy=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,By=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Gy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ky=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$y=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ky=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Qy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,jy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,eb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,tb=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,ab=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,ob=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,lb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,cb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ub=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,hb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,db=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xb=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,vb=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Mb=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Sb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,wb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ab=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Db=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Pb=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Ib=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Fb=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Nb=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Ob=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Ub=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,zb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gb=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vb=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Hb=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$b=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jb=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ew=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ow=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dw=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,mw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Qe={alphamap_fragment:WS,alphamap_pars_fragment:VS,alphatest_fragment:HS,alphatest_pars_fragment:kS,aomap_fragment:qS,aomap_pars_fragment:XS,begin_vertex:YS,beginnormal_vertex:ZS,bsdfs:$S,iridescence_fragment:KS,bumpmap_pars_fragment:JS,clipping_planes_fragment:QS,clipping_planes_pars_fragment:jS,clipping_planes_pars_vertex:ey,clipping_planes_vertex:ty,color_fragment:ny,color_pars_fragment:iy,color_pars_vertex:ry,color_vertex:sy,common:ay,cube_uv_reflection_fragment:oy,defaultnormal_vertex:ly,displacementmap_pars_vertex:cy,displacementmap_vertex:uy,emissivemap_fragment:fy,emissivemap_pars_fragment:hy,encodings_fragment:dy,encodings_pars_fragment:py,envmap_fragment:my,envmap_common_pars_fragment:gy,envmap_pars_fragment:_y,envmap_pars_vertex:xy,envmap_physical_pars_fragment:Ry,envmap_vertex:vy,fog_vertex:My,fog_pars_vertex:Sy,fog_fragment:yy,fog_pars_fragment:by,gradientmap_pars_fragment:wy,lightmap_fragment:Ty,lightmap_pars_fragment:Ey,lights_lambert_fragment:Ay,lights_lambert_pars_fragment:Cy,lights_pars_begin:Ly,lights_toon_fragment:Dy,lights_toon_pars_fragment:Py,lights_phong_fragment:Iy,lights_phong_pars_fragment:Fy,lights_physical_fragment:Ny,lights_physical_pars_fragment:Oy,lights_fragment_begin:Uy,lights_fragment_maps:zy,lights_fragment_end:By,logdepthbuf_fragment:Gy,logdepthbuf_pars_fragment:Wy,logdepthbuf_pars_vertex:Vy,logdepthbuf_vertex:Hy,map_fragment:ky,map_pars_fragment:qy,map_particle_fragment:Xy,map_particle_pars_fragment:Yy,metalnessmap_fragment:Zy,metalnessmap_pars_fragment:$y,morphcolor_vertex:Ky,morphnormal_vertex:Jy,morphtarget_pars_vertex:Qy,morphtarget_vertex:jy,normal_fragment_begin:eb,normal_fragment_maps:tb,normal_pars_fragment:nb,normal_pars_vertex:ib,normal_vertex:rb,normalmap_pars_fragment:sb,clearcoat_normal_fragment_begin:ab,clearcoat_normal_fragment_maps:ob,clearcoat_pars_fragment:lb,iridescence_pars_fragment:cb,output_fragment:ub,packing:fb,premultiplied_alpha_fragment:hb,project_vertex:db,dithering_fragment:pb,dithering_pars_fragment:mb,roughnessmap_fragment:gb,roughnessmap_pars_fragment:_b,shadowmap_pars_fragment:xb,shadowmap_pars_vertex:vb,shadowmap_vertex:Mb,shadowmask_pars_fragment:Sb,skinbase_vertex:yb,skinning_pars_vertex:bb,skinning_vertex:wb,skinnormal_vertex:Tb,specularmap_fragment:Eb,specularmap_pars_fragment:Ab,tonemapping_fragment:Cb,tonemapping_pars_fragment:Lb,transmission_fragment:Rb,transmission_pars_fragment:Db,uv_pars_fragment:Pb,uv_pars_vertex:Ib,uv_vertex:Fb,uv2_pars_fragment:Nb,uv2_pars_vertex:Ob,uv2_vertex:Ub,worldpos_vertex:zb,background_vert:Bb,background_frag:Gb,cube_vert:Wb,cube_frag:Vb,depth_vert:Hb,depth_frag:kb,distanceRGBA_vert:qb,distanceRGBA_frag:Xb,equirect_vert:Yb,equirect_frag:Zb,linedashed_vert:$b,linedashed_frag:Kb,meshbasic_vert:Jb,meshbasic_frag:Qb,meshlambert_vert:jb,meshlambert_frag:ew,meshmatcap_vert:tw,meshmatcap_frag:nw,meshnormal_vert:iw,meshnormal_frag:rw,meshphong_vert:sw,meshphong_frag:aw,meshphysical_vert:ow,meshphysical_frag:lw,meshtoon_vert:cw,meshtoon_frag:uw,points_vert:fw,points_frag:hw,shadow_vert:dw,shadow_frag:pw,sprite_vert:mw,sprite_frag:gw},ge={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new zn},uv2Transform:{value:new zn},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new zn}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new zn}}},ii={basic:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new vt(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Jt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Jt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new vt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Jt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Jt([ge.points,ge.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Jt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Jt([ge.common,ge.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Jt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Jt([ge.sprite,ge.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new zn},t2D:{value:null}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},cube:{uniforms:Jt([ge.envmap,{opacity:{value:1}}]),vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:Jt([ge.common,ge.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:Jt([ge.lights,ge.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};ii.physical={uniforms:Jt([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new gt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};function _w(o,e,t,r,s,l){const u=new vt(0);let c=s===!0?0:1,d,h,m=null,g=0,_=null;function M(x,p){let w=!1,R=p.isScene===!0?p.background:null;R&&R.isTexture&&(R=e.get(R));const I=o.xr,P=I.getSession&&I.getSession();P&&P.environmentBlendMode==="additive"&&(R=null),R===null?b(u,c):R&&R.isColor&&(b(R,1),w=!0),(o.autoClear||w)&&o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil),R&&(R.isCubeTexture||R.mapping===so)?(h===void 0&&(h=new Xi(new Vs(1,1,1),new Mr({name:"BackgroundCubeMaterial",uniforms:ls(ii.cube.uniforms),vertexShader:ii.cube.vertexShader,fragmentShader:ii.cube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,O,H){this.matrixWorld.copyPosition(H.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,(m!==R||g!==R.version||_!==o.toneMapping)&&(h.material.needsUpdate=!0,m=R,g=R.version,_=o.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(d===void 0&&(d=new Xi(new yc(2,2),new Mr({name:"BackgroundMaterial",uniforms:ls(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=R,R.matrixAutoUpdate===!0&&R.updateMatrix(),d.material.uniforms.uvTransform.value.copy(R.matrix),(m!==R||g!==R.version||_!==o.toneMapping)&&(d.material.needsUpdate=!0,m=R,g=R.version,_=o.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null))}function b(x,p){t.buffers.color.setClear(x.r,x.g,x.b,p,l)}return{getClearColor:function(){return u},setClearColor:function(x,p=1){u.set(x),c=p,b(u,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,b(u,c)},render:M}}function xw(o,e,t,r){const s=o.getParameter(34921),l=r.isWebGL2?null:e.get("OES_vertex_array_object"),u=r.isWebGL2||l!==null,c={},d=p(null);let h=d,m=!1;function g(k,ae,he,le,ee){let q=!1;if(u){const Z=x(le,he,ae);h!==Z&&(h=Z,M(h.object)),q=w(k,le,he,ee),q&&R(k,le,he,ee)}else{const Z=ae.wireframe===!0;(h.geometry!==le.id||h.program!==he.id||h.wireframe!==Z)&&(h.geometry=le.id,h.program=he.id,h.wireframe=Z,q=!0)}ee!==null&&t.update(ee,34963),(q||m)&&(m=!1,E(k,ae,he,le),ee!==null&&o.bindBuffer(34963,t.get(ee).buffer))}function _(){return r.isWebGL2?o.createVertexArray():l.createVertexArrayOES()}function M(k){return r.isWebGL2?o.bindVertexArray(k):l.bindVertexArrayOES(k)}function b(k){return r.isWebGL2?o.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function x(k,ae,he){const le=he.wireframe===!0;let ee=c[k.id];ee===void 0&&(ee={},c[k.id]=ee);let q=ee[ae.id];q===void 0&&(q={},ee[ae.id]=q);let Z=q[le];return Z===void 0&&(Z=p(_()),q[le]=Z),Z}function p(k){const ae=[],he=[],le=[];for(let ee=0;ee<s;ee++)ae[ee]=0,he[ee]=0,le[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ae,enabledAttributes:he,attributeDivisors:le,object:k,attributes:{},index:null}}function w(k,ae,he,le){const ee=h.attributes,q=ae.attributes;let Z=0;const ce=he.getAttributes();for(const pe in ce)if(ce[pe].location>=0){const Ae=ee[pe];let Ue=q[pe];if(Ue===void 0&&(pe==="instanceMatrix"&&k.instanceMatrix&&(Ue=k.instanceMatrix),pe==="instanceColor"&&k.instanceColor&&(Ue=k.instanceColor)),Ae===void 0||Ae.attribute!==Ue||Ue&&Ae.data!==Ue.data)return!0;Z++}return h.attributesNum!==Z||h.index!==le}function R(k,ae,he,le){const ee={},q=ae.attributes;let Z=0;const ce=he.getAttributes();for(const pe in ce)if(ce[pe].location>=0){let Ae=q[pe];Ae===void 0&&(pe==="instanceMatrix"&&k.instanceMatrix&&(Ae=k.instanceMatrix),pe==="instanceColor"&&k.instanceColor&&(Ae=k.instanceColor));const Ue={};Ue.attribute=Ae,Ae&&Ae.data&&(Ue.data=Ae.data),ee[pe]=Ue,Z++}h.attributes=ee,h.attributesNum=Z,h.index=le}function I(){const k=h.newAttributes;for(let ae=0,he=k.length;ae<he;ae++)k[ae]=0}function P(k){C(k,0)}function C(k,ae){const he=h.newAttributes,le=h.enabledAttributes,ee=h.attributeDivisors;he[k]=1,le[k]===0&&(o.enableVertexAttribArray(k),le[k]=1),ee[k]!==ae&&((r.isWebGL2?o:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,ae),ee[k]=ae)}function O(){const k=h.newAttributes,ae=h.enabledAttributes;for(let he=0,le=ae.length;he<le;he++)ae[he]!==k[he]&&(o.disableVertexAttribArray(he),ae[he]=0)}function H(k,ae,he,le,ee,q){r.isWebGL2===!0&&(he===5124||he===5125)?o.vertexAttribIPointer(k,ae,he,ee,q):o.vertexAttribPointer(k,ae,he,le,ee,q)}function E(k,ae,he,le){if(r.isWebGL2===!1&&(k.isInstancedMesh||le.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;I();const ee=le.attributes,q=he.getAttributes(),Z=ae.defaultAttributeValues;for(const ce in q){const pe=q[ce];if(pe.location>=0){let de=ee[ce];if(de===void 0&&(ce==="instanceMatrix"&&k.instanceMatrix&&(de=k.instanceMatrix),ce==="instanceColor"&&k.instanceColor&&(de=k.instanceColor)),de!==void 0){const Ae=de.normalized,Ue=de.itemSize,se=t.get(de);if(se===void 0)continue;const ct=se.buffer,Fe=se.type,Be=se.bytesPerElement;if(de.isInterleavedBufferAttribute){const Ee=de.data,at=Ee.stride,Xe=de.offset;if(Ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<pe.locationSize;Pe++)C(pe.location+Pe,Ee.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Pe=0;Pe<pe.locationSize;Pe++)P(pe.location+Pe);o.bindBuffer(34962,ct);for(let Pe=0;Pe<pe.locationSize;Pe++)H(pe.location+Pe,Ue/pe.locationSize,Fe,Ae,at*Be,(Xe+Ue/pe.locationSize*Pe)*Be)}else{if(de.isInstancedBufferAttribute){for(let Ee=0;Ee<pe.locationSize;Ee++)C(pe.location+Ee,de.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ee=0;Ee<pe.locationSize;Ee++)P(pe.location+Ee);o.bindBuffer(34962,ct);for(let Ee=0;Ee<pe.locationSize;Ee++)H(pe.location+Ee,Ue/pe.locationSize,Fe,Ae,Ue*Be,Ue/pe.locationSize*Ee*Be)}}else if(Z!==void 0){const Ae=Z[ce];if(Ae!==void 0)switch(Ae.length){case 2:o.vertexAttrib2fv(pe.location,Ae);break;case 3:o.vertexAttrib3fv(pe.location,Ae);break;case 4:o.vertexAttrib4fv(pe.location,Ae);break;default:o.vertexAttrib1fv(pe.location,Ae)}}}}O()}function N(){ye();for(const k in c){const ae=c[k];for(const he in ae){const le=ae[he];for(const ee in le)b(le[ee].object),delete le[ee];delete ae[he]}delete c[k]}}function X(k){if(c[k.id]===void 0)return;const ae=c[k.id];for(const he in ae){const le=ae[he];for(const ee in le)b(le[ee].object),delete le[ee];delete ae[he]}delete c[k.id]}function ue(k){for(const ae in c){const he=c[ae];if(he[k.id]===void 0)continue;const le=he[k.id];for(const ee in le)b(le[ee].object),delete le[ee];delete he[k.id]}}function ye(){J(),m=!0,h!==d&&(h=d,M(h.object))}function J(){d.geometry=null,d.program=null,d.wireframe=!1}return{setup:g,reset:ye,resetDefaultState:J,dispose:N,releaseStatesOfGeometry:X,releaseStatesOfProgram:ue,initAttributes:I,enableAttribute:P,disableUnusedAttributes:O}}function vw(o,e,t,r){const s=r.isWebGL2;let l;function u(h){l=h}function c(h,m){o.drawArrays(l,h,m),t.update(m,l,1)}function d(h,m,g){if(g===0)return;let _,M;if(s)_=o,M="drawArraysInstanced";else if(_=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",_===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[M](l,h,m,g),t.update(m,l,g)}this.setMode=u,this.render=c,this.renderInstances=d}function Mw(o,e,t){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const H=e.get("EXT_texture_filter_anisotropic");r=o.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function l(H){if(H==="highp"){if(o.getShaderPrecisionFormat(35633,36338).precision>0&&o.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";H="mediump"}return H==="mediump"&&o.getShaderPrecisionFormat(35633,36337).precision>0&&o.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&o instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&o instanceof WebGL2ComputeRenderingContext;let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=u||e.has("WEBGL_draw_buffers"),m=t.logarithmicDepthBuffer===!0,g=o.getParameter(34930),_=o.getParameter(35660),M=o.getParameter(3379),b=o.getParameter(34076),x=o.getParameter(34921),p=o.getParameter(36347),w=o.getParameter(36348),R=o.getParameter(36349),I=_>0,P=u||e.has("OES_texture_float"),C=I&&P,O=u?o.getParameter(36183):0;return{isWebGL2:u,drawBuffers:h,getMaxAnisotropy:s,getMaxPrecision:l,precision:c,logarithmicDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:b,maxAttributes:x,maxVertexUniforms:p,maxVaryings:w,maxFragmentUniforms:R,vertexTextures:I,floatFragmentTextures:P,floatVertexTextures:C,maxSamples:O}}function Sw(o){const e=this;let t=null,r=0,s=!1,l=!1;const u=new or,c=new zn,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(g,_,M){const b=g.length!==0||_||r!==0||s;return s=_,t=m(g,M,0),r=g.length,b},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1,h()},this.setState=function(g,_,M){const b=g.clippingPlanes,x=g.clipIntersection,p=g.clipShadows,w=o.get(g);if(!s||b===null||b.length===0||l&&!p)l?m(null):h();else{const R=l?0:r,I=R*4;let P=w.clippingState||null;d.value=P,P=m(b,_,I,M);for(let C=0;C!==I;++C)P[C]=t[C];w.clippingState=P,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=R}};function h(){d.value!==t&&(d.value=t,d.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function m(g,_,M,b){const x=g!==null?g.length:0;let p=null;if(x!==0){if(p=d.value,b!==!0||p===null){const w=M+x*4,R=_.matrixWorldInverse;c.getNormalMatrix(R),(p===null||p.length<w)&&(p=new Float32Array(w));for(let I=0,P=M;I!==x;++I,P+=4)u.copy(g[I]).applyMatrix4(R,c),u.normal.toArray(p,P),p[P+3]=u.constant}d.value=p,d.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function yw(o){let e=new WeakMap;function t(u,c){return c===uc?u.mapping=ss:c===fc&&(u.mapping=as),u}function r(u){if(u&&u.isTexture&&u.isRenderTargetTexture===!1){const c=u.mapping;if(c===uc||c===fc)if(e.has(u)){const d=e.get(u).texture;return t(d,u.mapping)}else{const d=u.image;if(d&&d.height>0){const h=new US(d.height/2);return h.fromEquirectangularTexture(o,u),e.set(u,h),u.addEventListener("dispose",s),t(h.texture,u.mapping)}else return null}}return u}function s(u){const c=u.target;c.removeEventListener("dispose",s);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class bw extends Od{constructor(e=-1,t=1,r=1,s=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=s,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,s,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let l=r-e,u=r+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,u=l+h*this.view.width,c-=m*this.view.offsetY,d=c-m*this.view.height}this.projectionMatrix.makeOrthographic(l,u,c,d,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ts=4,Nh=[.125,.215,.35,.446,.526,.582],ur=20,ec=new bw,Oh=new vt;let tc=null;const lr=(1+Math.sqrt(5))/2,jr=1/lr,Uh=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,lr,jr),new G(0,lr,-jr),new G(jr,0,lr),new G(-jr,0,lr),new G(lr,jr,0),new G(-lr,jr,0)];class zh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,s=100){tc=this._renderer.getRenderTarget(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,s,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tc),e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:On,minFilter:On,generateMipmaps:!1,type:Os,format:ri,encoding:xr,depthBuffer:!1},s=Bh(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bh(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ww(l)),this._blurMaterial=Tw(l,e,t)}return s}_compileMaterial(e){const t=new Xi(this._lodPlanes[0],e);this._renderer.compile(t,ec)}_sceneToCubeUV(e,t,r,s){const c=new Un(90,1,t,r),d=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,_=m.toneMapping;m.getClearColor(Oh),m.toneMapping=bi,m.autoClear=!1;const M=new Id({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1}),b=new Xi(new Vs,M);let x=!1;const p=e.background;p?p.isColor&&(M.color.copy(p),e.background=null,x=!0):(M.color.copy(Oh),x=!0);for(let w=0;w<6;w++){const R=w%3;R===0?(c.up.set(0,d[w],0),c.lookAt(h[w],0,0)):R===1?(c.up.set(0,0,d[w]),c.lookAt(0,h[w],0)):(c.up.set(0,d[w],0),c.lookAt(0,0,h[w]));const I=this._cubeSize;Ja(s,R*I,w>2?I:0,I,I),m.setRenderTarget(s),x&&m.render(b,c),m.render(e,c)}b.geometry.dispose(),b.material.dispose(),m.toneMapping=_,m.autoClear=g,e.background=p}_textureToCubeUV(e,t){const r=this._renderer,s=e.mapping===ss||e.mapping===as;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gh());const l=s?this._cubemapMaterial:this._equirectMaterial,u=new Xi(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const d=this._cubeSize;Ja(t,0,0,3*d,2*d),r.setRenderTarget(t),r.render(u,ec)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const l=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),u=Uh[(s-1)%Uh.length];this._blur(e,s-1,s,l,u)}t.autoClear=r}_blur(e,t,r,s,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,s,"latitudinal",l),this._halfBlur(u,e,r,r,s,"longitudinal",l)}_halfBlur(e,t,r,s,l,u,c){const d=this._renderer,h=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new Xi(this._lodPlanes[s],h),_=h.uniforms,M=this._sizeLods[r]-1,b=isFinite(l)?Math.PI/(2*M):2*Math.PI/(2*ur-1),x=l/b,p=isFinite(l)?1+Math.floor(m*x):ur;p>ur&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ur}`);const w=[];let R=0;for(let H=0;H<ur;++H){const E=H/x,N=Math.exp(-E*E/2);w.push(N),H===0?R+=N:H<p&&(R+=2*N)}for(let H=0;H<w.length;H++)w[H]=w[H]/R;_.envMap.value=e.texture,_.samples.value=p,_.weights.value=w,_.latitudinal.value=u==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:I}=this;_.dTheta.value=b,_.mipInt.value=I-r;const P=this._sizeLods[s],C=3*P*(s>I-ts?s-I+ts:0),O=4*(this._cubeSize-P);Ja(t,C,O,3*P,2*P),d.setRenderTarget(t),d.render(g,ec)}}function ww(o){const e=[],t=[],r=[];let s=o;const l=o-ts+1+Nh.length;for(let u=0;u<l;u++){const c=Math.pow(2,s);t.push(c);let d=1/c;u>o-ts?d=Nh[u-o+ts-1]:u===0&&(d=0),r.push(d);const h=1/(c-2),m=-h,g=1+h,_=[m,m,g,m,g,g,m,m,g,g,m,g],M=6,b=6,x=3,p=2,w=1,R=new Float32Array(x*b*M),I=new Float32Array(p*b*M),P=new Float32Array(w*b*M);for(let O=0;O<M;O++){const H=O%3*2/3-1,E=O>2?0:-1,N=[H,E,0,H+2/3,E,0,H+2/3,E+1,0,H,E,0,H+2/3,E+1,0,H,E+1,0];R.set(N,x*b*O),I.set(_,p*b*O);const X=[O,O,O,O,O,O];P.set(X,w*b*O)}const C=new mn;C.setAttribute("position",new pn(R,x)),C.setAttribute("uv",new pn(I,p)),C.setAttribute("faceIndex",new pn(P,w)),e.push(C),s>ts&&s--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Bh(o,e,t){const r=new vr(o,e,t);return r.texture.mapping=so,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ja(o,e,t,r,s){o.viewport.set(e,t,r,s),o.scissor.set(e,t,r,s)}function Tw(o,e,t){const r=new Float32Array(ur),s=new G(0,1,0);return new Mr({name:"SphericalGaussianBlur",defines:{n:ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Gh(){return new Mr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Wh(){return new Mr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function bc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ew(o){let e=new WeakMap,t=null;function r(c){if(c&&c.isTexture){const d=c.mapping,h=d===uc||d===fc,m=d===ss||d===as;if(h||m)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let g=e.get(c);return t===null&&(t=new zh(o)),g=h?t.fromEquirectangular(c,g):t.fromCubemap(c,g),e.set(c,g),g.texture}else{if(e.has(c))return e.get(c).texture;{const g=c.image;if(h&&g&&g.height>0||m&&g&&s(g)){t===null&&(t=new zh(o));const _=h?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,_),c.addEventListener("dispose",l),_.texture}else return null}}}return c}function s(c){let d=0;const h=6;for(let m=0;m<h;m++)c[m]!==void 0&&d++;return d===h}function l(c){const d=c.target;d.removeEventListener("dispose",l);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function Aw(o){const e={};function t(r){if(e[r]!==void 0)return e[r];let s;switch(r){case"WEBGL_depth_texture":s=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=o.getExtension(r)}return e[r]=s,s}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const s=t(r);return s===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),s}}}function Cw(o,e,t,r){const s={},l=new WeakMap;function u(g){const _=g.target;_.index!==null&&e.remove(_.index);for(const b in _.attributes)e.remove(_.attributes[b]);_.removeEventListener("dispose",u),delete s[_.id];const M=l.get(_);M&&(e.remove(M),l.delete(_)),r.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(g,_){return s[_.id]===!0||(_.addEventListener("dispose",u),s[_.id]=!0,t.memory.geometries++),_}function d(g){const _=g.attributes;for(const b in _)e.update(_[b],34962);const M=g.morphAttributes;for(const b in M){const x=M[b];for(let p=0,w=x.length;p<w;p++)e.update(x[p],34962)}}function h(g){const _=[],M=g.index,b=g.attributes.position;let x=0;if(M!==null){const R=M.array;x=M.version;for(let I=0,P=R.length;I<P;I+=3){const C=R[I+0],O=R[I+1],H=R[I+2];_.push(C,O,O,H,H,C)}}else{const R=b.array;x=b.version;for(let I=0,P=R.length/3-1;I<P;I+=3){const C=I+0,O=I+1,H=I+2;_.push(C,O,O,H,H,C)}}const p=new(Ad(_)?Nd:Fd)(_,1);p.version=x;const w=l.get(g);w&&e.remove(w),l.set(g,p)}function m(g){const _=l.get(g);if(_){const M=g.index;M!==null&&_.version<M.version&&h(g)}else h(g);return l.get(g)}return{get:c,update:d,getWireframeAttribute:m}}function Lw(o,e,t,r){const s=r.isWebGL2;let l;function u(_){l=_}let c,d;function h(_){c=_.type,d=_.bytesPerElement}function m(_,M){o.drawElements(l,M,c,_*d),t.update(M,l,1)}function g(_,M,b){if(b===0)return;let x,p;if(s)x=o,p="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[p](l,M,c,_*d,b),t.update(M,l,b)}this.setMode=u,this.setIndex=h,this.render=m,this.renderInstances=g}function Rw(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,c){switch(t.calls++,u){case 4:t.triangles+=c*(l/3);break;case 1:t.lines+=c*(l/2);break;case 3:t.lines+=c*(l-1);break;case 2:t.lines+=c*l;break;case 0:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function s(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:r}}function Dw(o,e){return o[0]-e[0]}function Pw(o,e){return Math.abs(e[1])-Math.abs(o[1])}function Iw(o,e,t){const r={},s=new Float32Array(8),l=new WeakMap,u=new Xt,c=[];for(let h=0;h<8;h++)c[h]=[h,0];function d(h,m,g,_){const M=h.morphTargetInfluences;if(e.isWebGL2===!0){const x=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,p=x!==void 0?x.length:0;let w=l.get(m);if(w===void 0||w.count!==p){let he=function(){k.dispose(),l.delete(m),m.removeEventListener("dispose",he)};var b=he;w!==void 0&&w.texture.dispose();const P=m.morphAttributes.position!==void 0,C=m.morphAttributes.normal!==void 0,O=m.morphAttributes.color!==void 0,H=m.morphAttributes.position||[],E=m.morphAttributes.normal||[],N=m.morphAttributes.color||[];let X=0;P===!0&&(X=1),C===!0&&(X=2),O===!0&&(X=3);let ue=m.attributes.position.count*X,ye=1;ue>e.maxTextureSize&&(ye=Math.ceil(ue/e.maxTextureSize),ue=e.maxTextureSize);const J=new Float32Array(ue*ye*4*p),k=new Dd(J,ue,ye,p);k.type=hr,k.needsUpdate=!0;const ae=X*4;for(let le=0;le<p;le++){const ee=H[le],q=E[le],Z=N[le],ce=ue*ye*4*le;for(let pe=0;pe<ee.count;pe++){const de=pe*ae;P===!0&&(u.fromBufferAttribute(ee,pe),J[ce+de+0]=u.x,J[ce+de+1]=u.y,J[ce+de+2]=u.z,J[ce+de+3]=0),C===!0&&(u.fromBufferAttribute(q,pe),J[ce+de+4]=u.x,J[ce+de+5]=u.y,J[ce+de+6]=u.z,J[ce+de+7]=0),O===!0&&(u.fromBufferAttribute(Z,pe),J[ce+de+8]=u.x,J[ce+de+9]=u.y,J[ce+de+10]=u.z,J[ce+de+11]=Z.itemSize===4?u.w:1)}}w={count:p,texture:k,size:new gt(ue,ye)},l.set(m,w),m.addEventListener("dispose",he)}let R=0;for(let P=0;P<M.length;P++)R+=M[P];const I=m.morphTargetsRelative?1:1-R;_.getUniforms().setValue(o,"morphTargetBaseInfluence",I),_.getUniforms().setValue(o,"morphTargetInfluences",M),_.getUniforms().setValue(o,"morphTargetsTexture",w.texture,t),_.getUniforms().setValue(o,"morphTargetsTextureSize",w.size)}else{const x=M===void 0?0:M.length;let p=r[m.id];if(p===void 0||p.length!==x){p=[];for(let C=0;C<x;C++)p[C]=[C,0];r[m.id]=p}for(let C=0;C<x;C++){const O=p[C];O[0]=C,O[1]=M[C]}p.sort(Pw);for(let C=0;C<8;C++)C<x&&p[C][1]?(c[C][0]=p[C][0],c[C][1]=p[C][1]):(c[C][0]=Number.MAX_SAFE_INTEGER,c[C][1]=0);c.sort(Dw);const w=m.morphAttributes.position,R=m.morphAttributes.normal;let I=0;for(let C=0;C<8;C++){const O=c[C],H=O[0],E=O[1];H!==Number.MAX_SAFE_INTEGER&&E?(w&&m.getAttribute("morphTarget"+C)!==w[H]&&m.setAttribute("morphTarget"+C,w[H]),R&&m.getAttribute("morphNormal"+C)!==R[H]&&m.setAttribute("morphNormal"+C,R[H]),s[C]=E,I+=E):(w&&m.hasAttribute("morphTarget"+C)===!0&&m.deleteAttribute("morphTarget"+C),R&&m.hasAttribute("morphNormal"+C)===!0&&m.deleteAttribute("morphNormal"+C),s[C]=0)}const P=m.morphTargetsRelative?1:1-I;_.getUniforms().setValue(o,"morphTargetBaseInfluence",P),_.getUniforms().setValue(o,"morphTargetInfluences",s)}}return{update:d}}function Fw(o,e,t,r){let s=new WeakMap;function l(d){const h=r.render.frame,m=d.geometry,g=e.get(d,m);return s.get(g)!==h&&(e.update(g),s.set(g,h)),d.isInstancedMesh&&(d.hasEventListener("dispose",c)===!1&&d.addEventListener("dispose",c),t.update(d.instanceMatrix,34962),d.instanceColor!==null&&t.update(d.instanceColor,34962)),g}function u(){s=new WeakMap}function c(d){const h=d.target;h.removeEventListener("dispose",c),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:u}}const Gd=new Wn,Wd=new Dd,Vd=new SS,Hd=new Ud,Vh=[],Hh=[],kh=new Float32Array(16),qh=new Float32Array(9),Xh=new Float32Array(4);function fs(o,e,t){const r=o[0];if(r<=0||r>0)return o;const s=e*t;let l=Vh[s];if(l===void 0&&(l=new Float32Array(s),Vh[s]=l),e!==0){r.toArray(l,0);for(let u=1,c=0;u!==e;++u)c+=t,o[u].toArray(l,c)}return l}function an(o,e){if(o.length!==e.length)return!1;for(let t=0,r=o.length;t<r;t++)if(o[t]!==e[t])return!1;return!0}function on(o,e){for(let t=0,r=e.length;t<r;t++)o[t]=e[t]}function lo(o,e){let t=Hh[e];t===void 0&&(t=new Int32Array(e),Hh[e]=t);for(let r=0;r!==e;++r)t[r]=o.allocateTextureUnit();return t}function Nw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function Ow(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;o.uniform2fv(this.addr,e),on(t,e)}}function Uw(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;o.uniform3fv(this.addr,e),on(t,e)}}function zw(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;o.uniform4fv(this.addr,e),on(t,e)}}function Bw(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;Xh.set(r),o.uniformMatrix2fv(this.addr,!1,Xh),on(t,r)}}function Gw(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;qh.set(r),o.uniformMatrix3fv(this.addr,!1,qh),on(t,r)}}function Ww(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;kh.set(r),o.uniformMatrix4fv(this.addr,!1,kh),on(t,r)}}function Vw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function Hw(o,e){const t=this.cache;an(t,e)||(o.uniform2iv(this.addr,e),on(t,e))}function kw(o,e){const t=this.cache;an(t,e)||(o.uniform3iv(this.addr,e),on(t,e))}function qw(o,e){const t=this.cache;an(t,e)||(o.uniform4iv(this.addr,e),on(t,e))}function Xw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function Yw(o,e){const t=this.cache;an(t,e)||(o.uniform2uiv(this.addr,e),on(t,e))}function Zw(o,e){const t=this.cache;an(t,e)||(o.uniform3uiv(this.addr,e),on(t,e))}function $w(o,e){const t=this.cache;an(t,e)||(o.uniform4uiv(this.addr,e),on(t,e))}function Kw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture2D(e||Gd,s)}function Jw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture3D(e||Vd,s)}function Qw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTextureCube(e||Hd,s)}function jw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture2DArray(e||Wd,s)}function e1(o){switch(o){case 5126:return Nw;case 35664:return Ow;case 35665:return Uw;case 35666:return zw;case 35674:return Bw;case 35675:return Gw;case 35676:return Ww;case 5124:case 35670:return Vw;case 35667:case 35671:return Hw;case 35668:case 35672:return kw;case 35669:case 35673:return qw;case 5125:return Xw;case 36294:return Yw;case 36295:return Zw;case 36296:return $w;case 35678:case 36198:case 36298:case 36306:case 35682:return Kw;case 35679:case 36299:case 36307:return Jw;case 35680:case 36300:case 36308:case 36293:return Qw;case 36289:case 36303:case 36311:case 36292:return jw}}function t1(o,e){o.uniform1fv(this.addr,e)}function n1(o,e){const t=fs(e,this.size,2);o.uniform2fv(this.addr,t)}function i1(o,e){const t=fs(e,this.size,3);o.uniform3fv(this.addr,t)}function r1(o,e){const t=fs(e,this.size,4);o.uniform4fv(this.addr,t)}function s1(o,e){const t=fs(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function a1(o,e){const t=fs(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function o1(o,e){const t=fs(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function l1(o,e){o.uniform1iv(this.addr,e)}function c1(o,e){o.uniform2iv(this.addr,e)}function u1(o,e){o.uniform3iv(this.addr,e)}function f1(o,e){o.uniform4iv(this.addr,e)}function h1(o,e){o.uniform1uiv(this.addr,e)}function d1(o,e){o.uniform2uiv(this.addr,e)}function p1(o,e){o.uniform3uiv(this.addr,e)}function m1(o,e){o.uniform4uiv(this.addr,e)}function g1(o,e,t){const r=e.length,s=lo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture2D(e[l]||Gd,s[l])}function _1(o,e,t){const r=e.length,s=lo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture3D(e[l]||Vd,s[l])}function x1(o,e,t){const r=e.length,s=lo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTextureCube(e[l]||Hd,s[l])}function v1(o,e,t){const r=e.length,s=lo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture2DArray(e[l]||Wd,s[l])}function M1(o){switch(o){case 5126:return t1;case 35664:return n1;case 35665:return i1;case 35666:return r1;case 35674:return s1;case 35675:return a1;case 35676:return o1;case 5124:case 35670:return l1;case 35667:case 35671:return c1;case 35668:case 35672:return u1;case 35669:case 35673:return f1;case 5125:return h1;case 36294:return d1;case 36295:return p1;case 36296:return m1;case 35678:case 36198:case 36298:case 36306:case 35682:return g1;case 35679:case 36299:case 36307:return _1;case 35680:case 36300:case 36308:case 36293:return x1;case 36289:case 36303:case 36311:case 36292:return v1}}class S1{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.setValue=e1(t.type)}}class y1{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.size=t.size,this.setValue=M1(t.type)}}class b1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const s=this.seq;for(let l=0,u=s.length;l!==u;++l){const c=s[l];c.setValue(e,t[c.id],r)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function Yh(o,e){o.seq.push(e),o.map[e.id]=e}function w1(o,e,t){const r=o.name,s=r.length;for(nc.lastIndex=0;;){const l=nc.exec(r),u=nc.lastIndex;let c=l[1];const d=l[2]==="]",h=l[3];if(d&&(c=c|0),h===void 0||h==="["&&u+2===s){Yh(t,h===void 0?new S1(c,o,e):new y1(c,o,e));break}else{let g=t.map[c];g===void 0&&(g=new b1(c),Yh(t,g)),t=g}}}class no{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,35718);for(let s=0;s<r;++s){const l=e.getActiveUniform(t,s),u=e.getUniformLocation(t,l.name);w1(l,u,this)}}setValue(e,t,r,s){const l=this.map[t];l!==void 0&&l.setValue(e,r,s)}setOptional(e,t,r){const s=t[r];s!==void 0&&this.setValue(e,r,s)}static upload(e,t,r,s){for(let l=0,u=t.length;l!==u;++l){const c=t[l],d=r[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){const r=[];for(let s=0,l=e.length;s!==l;++s){const u=e[s];u.id in t&&r.push(u)}return r}}function Zh(o,e,t){const r=o.createShader(e);return o.shaderSource(r,t),o.compileShader(r),r}let T1=0;function E1(o,e){const t=o.split(`
`),r=[],s=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=s;u<l;u++){const c=u+1;r.push(`${c===e?">":" "} ${c}: ${t[u]}`)}return r.join(`
`)}function A1(o){switch(o){case xr:return["Linear","( value )"];case Ct:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",o),["Linear","( value )"]}}function $h(o,e,t){const r=o.getShaderParameter(e,35713),s=o.getShaderInfoLog(e).trim();if(r&&s==="")return"";const l=/ERROR: 0:(\d+)/.exec(s);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+s+`

`+E1(o.getShaderSource(e),u)}else return s}function C1(o,e){const t=A1(e);return"vec4 "+o+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function L1(o,e){let t;switch(e){case YM:t="Linear";break;case ZM:t="Reinhard";break;case $M:t="OptimizedCineon";break;case KM:t="ACESFilmic";break;case JM:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function R1(o){return[o.extensionDerivatives||!!o.envMapCubeUVHeight||o.bumpMap||o.tangentSpaceNormalMap||o.clearcoatNormalMap||o.flatShading||o.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(o.extensionFragDepth||o.logarithmicDepthBuffer)&&o.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",o.extensionDrawBuffers&&o.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(o.extensionShaderTextureLOD||o.envMap||o.transmission)&&o.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ns).join(`
`)}function D1(o){const e=[];for(const t in o){const r=o[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function P1(o,e){const t={},r=o.getProgramParameter(e,35721);for(let s=0;s<r;s++){const l=o.getActiveAttrib(e,s),u=l.name;let c=1;l.type===35674&&(c=2),l.type===35675&&(c=3),l.type===35676&&(c=4),t[u]={type:l.type,location:o.getAttribLocation(e,u),locationSize:c}}return t}function Ns(o){return o!==""}function Kh(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jh(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const I1=/^[ \t]*#include +<([\w\d./]+)>/gm;function gc(o){return o.replace(I1,F1)}function F1(o,e){const t=Qe[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return gc(t)}const N1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(o){return o.replace(N1,O1)}function O1(o,e,t,r){let s="";for(let l=parseInt(e);l<parseInt(t);l++)s+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return s}function jh(o){let e="precision "+o.precision+` float;
precision `+o.precision+" int;";return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function U1(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Sd?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===TM?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Fs&&(e="SHADOWMAP_TYPE_VSM"),e}function z1(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case ss:case as:e="ENVMAP_TYPE_CUBE";break;case so:e="ENVMAP_TYPE_CUBE_UV";break}return e}function B1(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case as:e="ENVMAP_MODE_REFRACTION";break}return e}function G1(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case wd:e="ENVMAP_BLENDING_MULTIPLY";break;case qM:e="ENVMAP_BLENDING_MIX";break;case XM:e="ENVMAP_BLENDING_ADD";break}return e}function W1(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function V1(o,e,t,r){const s=o.getContext(),l=t.defines;let u=t.vertexShader,c=t.fragmentShader;const d=U1(t),h=z1(t),m=B1(t),g=G1(t),_=W1(t),M=t.isWebGL2?"":R1(t),b=D1(l),x=s.createProgram();let p,w,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[b].filter(Ns).join(`
`),p.length>0&&(p+=`
`),w=[M,b].filter(Ns).join(`
`),w.length>0&&(w+=`
`)):(p=[jh(t),"#define SHADER_NAME "+t.shaderName,b,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),w=[M,jh(t),"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==bi?L1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.encodings_pars_fragment,C1("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),u=gc(u),u=Kh(u,t),u=Jh(u,t),c=gc(c),c=Kh(c,t),c=Jh(c,t),u=Qh(u),c=Qh(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,w=["#define varying in",t.glslVersion===Sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const I=R+p+u,P=R+w+c,C=Zh(s,35633,I),O=Zh(s,35632,P);if(s.attachShader(x,C),s.attachShader(x,O),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x),o.debug.checkShaderErrors){const N=s.getProgramInfoLog(x).trim(),X=s.getShaderInfoLog(C).trim(),ue=s.getShaderInfoLog(O).trim();let ye=!0,J=!0;if(s.getProgramParameter(x,35714)===!1){ye=!1;const k=$h(s,C,"vertex"),ae=$h(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,35715)+`

Program Info Log: `+N+`
`+k+`
`+ae)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(X===""||ue==="")&&(J=!1);J&&(this.diagnostics={runnable:ye,programLog:N,vertexShader:{log:X,prefix:p},fragmentShader:{log:ue,prefix:w}})}s.deleteShader(C),s.deleteShader(O);let H;this.getUniforms=function(){return H===void 0&&(H=new no(s,x)),H};let E;return this.getAttributes=function(){return E===void 0&&(E=P1(s,x)),E},this.destroy=function(){r.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.name=t.shaderName,this.id=T1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=O,this}let H1=0;class k1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,s=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(s)===!1&&(u.add(s),s.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new q1(e),t.set(e,r)),r}}class q1{constructor(e){this.id=H1++,this.code=e,this.usedTimes=0}}function X1(o,e,t,r,s,l,u){const c=new Pd,d=new k1,h=[],m=s.isWebGL2,g=s.logarithmicDepthBuffer,_=s.vertexTextures;let M=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E,N,X,ue,ye){const J=ue.fog,k=ye.geometry,ae=E.isMeshStandardMaterial?ue.environment:null,he=(E.isMeshStandardMaterial?t:e).get(E.envMap||ae),le=!!he&&he.mapping===so?he.image.height:null,ee=b[E.type];E.precision!==null&&(M=s.getMaxPrecision(E.precision),M!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",M,"instead."));const q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Z=q!==void 0?q.length:0;let ce=0;k.morphAttributes.position!==void 0&&(ce=1),k.morphAttributes.normal!==void 0&&(ce=2),k.morphAttributes.color!==void 0&&(ce=3);let pe,de,Ae,Ue;if(ee){const at=ii[ee];pe=at.vertexShader,de=at.fragmentShader}else pe=E.vertexShader,de=E.fragmentShader,d.update(E),Ae=d.getVertexShaderID(E),Ue=d.getFragmentShaderID(E);const se=o.getRenderTarget(),ct=E.alphaTest>0,Fe=E.clearcoat>0,Be=E.iridescence>0;return{isWebGL2:m,shaderID:ee,shaderName:E.type,vertexShader:pe,fragmentShader:de,defines:E.defines,customVertexShaderID:Ae,customFragmentShaderID:Ue,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:M,instancing:ye.isInstancedMesh===!0,instancingColor:ye.isInstancedMesh===!0&&ye.instanceColor!==null,supportsVertexTextures:_,outputEncoding:se===null?o.outputEncoding:se.isXRRenderTarget===!0?se.texture.encoding:xr,map:!!E.map,matcap:!!E.matcap,envMap:!!he,envMapMode:he&&he.mapping,envMapCubeUVHeight:le,lightMap:!!E.lightMap,aoMap:!!E.aoMap,emissiveMap:!!E.emissiveMap,bumpMap:!!E.bumpMap,normalMap:!!E.normalMap,objectSpaceNormalMap:E.normalMapType===_S,tangentSpaceNormalMap:E.normalMapType===gS,decodeVideoTexture:!!E.map&&E.map.isVideoTexture===!0&&E.map.encoding===Ct,clearcoat:Fe,clearcoatMap:Fe&&!!E.clearcoatMap,clearcoatRoughnessMap:Fe&&!!E.clearcoatRoughnessMap,clearcoatNormalMap:Fe&&!!E.clearcoatNormalMap,iridescence:Be,iridescenceMap:Be&&!!E.iridescenceMap,iridescenceThicknessMap:Be&&!!E.iridescenceThicknessMap,displacementMap:!!E.displacementMap,roughnessMap:!!E.roughnessMap,metalnessMap:!!E.metalnessMap,specularMap:!!E.specularMap,specularIntensityMap:!!E.specularIntensityMap,specularColorMap:!!E.specularColorMap,opaque:E.transparent===!1&&E.blending===ns,alphaMap:!!E.alphaMap,alphaTest:ct,gradientMap:!!E.gradientMap,sheen:E.sheen>0,sheenColorMap:!!E.sheenColorMap,sheenRoughnessMap:!!E.sheenRoughnessMap,transmission:E.transmission>0,transmissionMap:!!E.transmissionMap,thicknessMap:!!E.thicknessMap,combine:E.combine,vertexTangents:!!E.normalMap&&!!k.attributes.tangent,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUvs:!!E.map||!!E.bumpMap||!!E.normalMap||!!E.specularMap||!!E.alphaMap||!!E.emissiveMap||!!E.roughnessMap||!!E.metalnessMap||!!E.clearcoatMap||!!E.clearcoatRoughnessMap||!!E.clearcoatNormalMap||!!E.iridescenceMap||!!E.iridescenceThicknessMap||!!E.displacementMap||!!E.transmissionMap||!!E.thicknessMap||!!E.specularIntensityMap||!!E.specularColorMap||!!E.sheenColorMap||!!E.sheenRoughnessMap,uvsVertexOnly:!(!!E.map||!!E.bumpMap||!!E.normalMap||!!E.specularMap||!!E.alphaMap||!!E.emissiveMap||!!E.roughnessMap||!!E.metalnessMap||!!E.clearcoatNormalMap||!!E.iridescenceMap||!!E.iridescenceThicknessMap||E.transmission>0||!!E.transmissionMap||!!E.thicknessMap||!!E.specularIntensityMap||!!E.specularColorMap||E.sheen>0||!!E.sheenColorMap||!!E.sheenRoughnessMap)&&!!E.displacementMap,fog:!!J,useFog:E.fog===!0,fogExp2:J&&J.isFogExp2,flatShading:!!E.flatShading,sizeAttenuation:E.sizeAttenuation,logarithmicDepthBuffer:g,skinning:ye.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ce,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:E.dithering,shadowMapEnabled:o.shadowMap.enabled&&X.length>0,shadowMapType:o.shadowMap.type,toneMapping:E.toneMapped?o.toneMapping:bi,physicallyCorrectLights:o.physicallyCorrectLights,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===qi,flipSided:E.side===Gn,useDepthPacking:!!E.depthPacking,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:E.extensions&&E.extensions.derivatives,extensionFragDepth:E.extensions&&E.extensions.fragDepth,extensionDrawBuffers:E.extensions&&E.extensions.drawBuffers,extensionShaderTextureLOD:E.extensions&&E.extensions.shaderTextureLOD,rendererExtensionFragDepth:m||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:m||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:m||r.has("EXT_shader_texture_lod"),customProgramCacheKey:E.customProgramCacheKey()}}function p(E){const N=[];if(E.shaderID?N.push(E.shaderID):(N.push(E.customVertexShaderID),N.push(E.customFragmentShaderID)),E.defines!==void 0)for(const X in E.defines)N.push(X),N.push(E.defines[X]);return E.isRawShaderMaterial===!1&&(w(N,E),R(N,E),N.push(o.outputEncoding)),N.push(E.customProgramCacheKey),N.join()}function w(E,N){E.push(N.precision),E.push(N.outputEncoding),E.push(N.envMapMode),E.push(N.envMapCubeUVHeight),E.push(N.combine),E.push(N.vertexUvs),E.push(N.fogExp2),E.push(N.sizeAttenuation),E.push(N.morphTargetsCount),E.push(N.morphAttributeCount),E.push(N.numDirLights),E.push(N.numPointLights),E.push(N.numSpotLights),E.push(N.numSpotLightMaps),E.push(N.numHemiLights),E.push(N.numRectAreaLights),E.push(N.numDirLightShadows),E.push(N.numPointLightShadows),E.push(N.numSpotLightShadows),E.push(N.numSpotLightShadowsWithMaps),E.push(N.shadowMapType),E.push(N.toneMapping),E.push(N.numClippingPlanes),E.push(N.numClipIntersection),E.push(N.depthPacking)}function R(E,N){c.disableAll(),N.isWebGL2&&c.enable(0),N.supportsVertexTextures&&c.enable(1),N.instancing&&c.enable(2),N.instancingColor&&c.enable(3),N.map&&c.enable(4),N.matcap&&c.enable(5),N.envMap&&c.enable(6),N.lightMap&&c.enable(7),N.aoMap&&c.enable(8),N.emissiveMap&&c.enable(9),N.bumpMap&&c.enable(10),N.normalMap&&c.enable(11),N.objectSpaceNormalMap&&c.enable(12),N.tangentSpaceNormalMap&&c.enable(13),N.clearcoat&&c.enable(14),N.clearcoatMap&&c.enable(15),N.clearcoatRoughnessMap&&c.enable(16),N.clearcoatNormalMap&&c.enable(17),N.iridescence&&c.enable(18),N.iridescenceMap&&c.enable(19),N.iridescenceThicknessMap&&c.enable(20),N.displacementMap&&c.enable(21),N.specularMap&&c.enable(22),N.roughnessMap&&c.enable(23),N.metalnessMap&&c.enable(24),N.gradientMap&&c.enable(25),N.alphaMap&&c.enable(26),N.alphaTest&&c.enable(27),N.vertexColors&&c.enable(28),N.vertexAlphas&&c.enable(29),N.vertexUvs&&c.enable(30),N.vertexTangents&&c.enable(31),N.uvsVertexOnly&&c.enable(32),E.push(c.mask),c.disableAll(),N.fog&&c.enable(0),N.useFog&&c.enable(1),N.flatShading&&c.enable(2),N.logarithmicDepthBuffer&&c.enable(3),N.skinning&&c.enable(4),N.morphTargets&&c.enable(5),N.morphNormals&&c.enable(6),N.morphColors&&c.enable(7),N.premultipliedAlpha&&c.enable(8),N.shadowMapEnabled&&c.enable(9),N.physicallyCorrectLights&&c.enable(10),N.doubleSided&&c.enable(11),N.flipSided&&c.enable(12),N.useDepthPacking&&c.enable(13),N.dithering&&c.enable(14),N.specularIntensityMap&&c.enable(15),N.specularColorMap&&c.enable(16),N.transmission&&c.enable(17),N.transmissionMap&&c.enable(18),N.thicknessMap&&c.enable(19),N.sheen&&c.enable(20),N.sheenColorMap&&c.enable(21),N.sheenRoughnessMap&&c.enable(22),N.decodeVideoTexture&&c.enable(23),N.opaque&&c.enable(24),E.push(c.mask)}function I(E){const N=b[E.type];let X;if(N){const ue=ii[N];X=IS.clone(ue.uniforms)}else X=E.uniforms;return X}function P(E,N){let X;for(let ue=0,ye=h.length;ue<ye;ue++){const J=h[ue];if(J.cacheKey===N){X=J,++X.usedTimes;break}}return X===void 0&&(X=new V1(o,N,E,l),h.push(X)),X}function C(E){if(--E.usedTimes===0){const N=h.indexOf(E);h[N]=h[h.length-1],h.pop(),E.destroy()}}function O(E){d.remove(E)}function H(){d.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:I,acquireProgram:P,releaseProgram:C,releaseShaderCache:O,programs:h,dispose:H}}function Y1(){let o=new WeakMap;function e(l){let u=o.get(l);return u===void 0&&(u={},o.set(l,u)),u}function t(l){o.delete(l)}function r(l,u,c){o.get(l)[u]=c}function s(){o=new WeakMap}return{get:e,remove:t,update:r,dispose:s}}function Z1(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function ed(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function td(){const o=[];let e=0;const t=[],r=[],s=[];function l(){e=0,t.length=0,r.length=0,s.length=0}function u(g,_,M,b,x,p){let w=o[e];return w===void 0?(w={id:g.id,object:g,geometry:_,material:M,groupOrder:b,renderOrder:g.renderOrder,z:x,group:p},o[e]=w):(w.id=g.id,w.object=g,w.geometry=_,w.material=M,w.groupOrder=b,w.renderOrder=g.renderOrder,w.z=x,w.group=p),e++,w}function c(g,_,M,b,x,p){const w=u(g,_,M,b,x,p);M.transmission>0?r.push(w):M.transparent===!0?s.push(w):t.push(w)}function d(g,_,M,b,x,p){const w=u(g,_,M,b,x,p);M.transmission>0?r.unshift(w):M.transparent===!0?s.unshift(w):t.unshift(w)}function h(g,_){t.length>1&&t.sort(g||Z1),r.length>1&&r.sort(_||ed),s.length>1&&s.sort(_||ed)}function m(){for(let g=e,_=o.length;g<_;g++){const M=o[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:r,transparent:s,init:l,push:c,unshift:d,finish:m,sort:h}}function $1(){let o=new WeakMap;function e(r,s){const l=o.get(r);let u;return l===void 0?(u=new td,o.set(r,[u])):s>=l.length?(u=new td,l.push(u)):u=l[s],u}function t(){o=new WeakMap}return{get:e,dispose:t}}function K1(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new vt};break;case"SpotLight":t={position:new G,direction:new G,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new vt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":t={color:new vt,position:new G,halfWidth:new G,halfHeight:new G};break}return o[e.id]=t,t}}}function J1(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let Q1=0;function j1(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function eT(o,e){const t=new K1,r=J1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let m=0;m<9;m++)s.probe.push(new G);const l=new G,u=new Bt,c=new Bt;function d(m,g){let _=0,M=0,b=0;for(let ue=0;ue<9;ue++)s.probe[ue].set(0,0,0);let x=0,p=0,w=0,R=0,I=0,P=0,C=0,O=0,H=0,E=0;m.sort(j1);const N=g!==!0?Math.PI:1;for(let ue=0,ye=m.length;ue<ye;ue++){const J=m[ue],k=J.color,ae=J.intensity,he=J.distance,le=J.shadow&&J.shadow.map?J.shadow.map.texture:null;if(J.isAmbientLight)_+=k.r*ae*N,M+=k.g*ae*N,b+=k.b*ae*N;else if(J.isLightProbe)for(let ee=0;ee<9;ee++)s.probe[ee].addScaledVector(J.sh.coefficients[ee],ae);else if(J.isDirectionalLight){const ee=t.get(J);if(ee.color.copy(J.color).multiplyScalar(J.intensity*N),J.castShadow){const q=J.shadow,Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,s.directionalShadow[x]=Z,s.directionalShadowMap[x]=le,s.directionalShadowMatrix[x]=J.shadow.matrix,P++}s.directional[x]=ee,x++}else if(J.isSpotLight){const ee=t.get(J);ee.position.setFromMatrixPosition(J.matrixWorld),ee.color.copy(k).multiplyScalar(ae*N),ee.distance=he,ee.coneCos=Math.cos(J.angle),ee.penumbraCos=Math.cos(J.angle*(1-J.penumbra)),ee.decay=J.decay,s.spot[w]=ee;const q=J.shadow;if(J.map&&(s.spotLightMap[H]=J.map,H++,q.updateMatrices(J),J.castShadow&&E++),s.spotLightMatrix[w]=q.matrix,J.castShadow){const Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,s.spotShadow[w]=Z,s.spotShadowMap[w]=le,O++}w++}else if(J.isRectAreaLight){const ee=t.get(J);ee.color.copy(k).multiplyScalar(ae),ee.halfWidth.set(J.width*.5,0,0),ee.halfHeight.set(0,J.height*.5,0),s.rectArea[R]=ee,R++}else if(J.isPointLight){const ee=t.get(J);if(ee.color.copy(J.color).multiplyScalar(J.intensity*N),ee.distance=J.distance,ee.decay=J.decay,J.castShadow){const q=J.shadow,Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,Z.shadowCameraNear=q.camera.near,Z.shadowCameraFar=q.camera.far,s.pointShadow[p]=Z,s.pointShadowMap[p]=le,s.pointShadowMatrix[p]=J.shadow.matrix,C++}s.point[p]=ee,p++}else if(J.isHemisphereLight){const ee=t.get(J);ee.skyColor.copy(J.color).multiplyScalar(ae*N),ee.groundColor.copy(J.groundColor).multiplyScalar(ae*N),s.hemi[I]=ee,I++}}R>0&&(e.isWebGL2||o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_FLOAT_1,s.rectAreaLTC2=ge.LTC_FLOAT_2):o.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_HALF_1,s.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=_,s.ambient[1]=M,s.ambient[2]=b;const X=s.hash;(X.directionalLength!==x||X.pointLength!==p||X.spotLength!==w||X.rectAreaLength!==R||X.hemiLength!==I||X.numDirectionalShadows!==P||X.numPointShadows!==C||X.numSpotShadows!==O||X.numSpotMaps!==H)&&(s.directional.length=x,s.spot.length=w,s.rectArea.length=R,s.point.length=p,s.hemi.length=I,s.directionalShadow.length=P,s.directionalShadowMap.length=P,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=O,s.spotShadowMap.length=O,s.directionalShadowMatrix.length=P,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=O+H-E,s.spotLightMap.length=H,s.numSpotLightShadowsWithMaps=E,X.directionalLength=x,X.pointLength=p,X.spotLength=w,X.rectAreaLength=R,X.hemiLength=I,X.numDirectionalShadows=P,X.numPointShadows=C,X.numSpotShadows=O,X.numSpotMaps=H,s.version=Q1++)}function h(m,g){let _=0,M=0,b=0,x=0,p=0;const w=g.matrixWorldInverse;for(let R=0,I=m.length;R<I;R++){const P=m[R];if(P.isDirectionalLight){const C=s.directional[_];C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(w),_++}else if(P.isSpotLight){const C=s.spot[b];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(w),b++}else if(P.isRectAreaLight){const C=s.rectArea[x];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),c.identity(),u.copy(P.matrixWorld),u.premultiply(w),c.extractRotation(u),C.halfWidth.set(P.width*.5,0,0),C.halfHeight.set(0,P.height*.5,0),C.halfWidth.applyMatrix4(c),C.halfHeight.applyMatrix4(c),x++}else if(P.isPointLight){const C=s.point[M];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),M++}else if(P.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(P.matrixWorld),C.direction.transformDirection(w),p++}}}return{setup:d,setupView:h,state:s}}function nd(o,e){const t=new eT(o,e),r=[],s=[];function l(){r.length=0,s.length=0}function u(g){r.push(g)}function c(g){s.push(g)}function d(g){t.setup(r,g)}function h(g){t.setupView(r,g)}return{init:l,state:{lightsArray:r,shadowsArray:s,lights:t},setupLights:d,setupLightsView:h,pushLight:u,pushShadow:c}}function tT(o,e){let t=new WeakMap;function r(l,u=0){const c=t.get(l);let d;return c===void 0?(d=new nd(o,e),t.set(l,[d])):u>=c.length?(d=new nd(o,e),c.push(d)):d=c[u],d}function s(){t=new WeakMap}return{get:r,dispose:s}}class nT extends us{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class iT extends us{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new G,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const rT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function aT(o,e,t){let r=new zd;const s=new gt,l=new gt,u=new Xt,c=new nT({depthPacking:mS}),d=new iT,h={},m=t.maxTextureSize,g={0:Gn,1:rs,2:qi},_=new Mr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:rT,fragmentShader:sT}),M=_.clone();M.defines.HORIZONTAL_PASS=1;const b=new mn;b.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Xi(b,_),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd,this.render=function(P,C,O){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const H=o.getRenderTarget(),E=o.getActiveCubeFace(),N=o.getActiveMipmapLevel(),X=o.state;X.setBlending(Yi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);for(let ue=0,ye=P.length;ue<ye;ue++){const J=P[ue],k=J.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const ae=k.getFrameExtents();if(s.multiply(ae),l.copy(k.mapSize),(s.x>m||s.y>m)&&(s.x>m&&(l.x=Math.floor(m/ae.x),s.x=l.x*ae.x,k.mapSize.x=l.x),s.y>m&&(l.y=Math.floor(m/ae.y),s.y=l.y*ae.y,k.mapSize.y=l.y)),k.map===null){const le=this.type!==Fs?{minFilter:dn,magFilter:dn}:{};k.map=new vr(s.x,s.y,le),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}o.setRenderTarget(k.map),o.clear();const he=k.getViewportCount();for(let le=0;le<he;le++){const ee=k.getViewport(le);u.set(l.x*ee.x,l.y*ee.y,l.x*ee.z,l.y*ee.w),X.viewport(u),k.updateMatrices(J,le),r=k.getFrustum(),I(C,O,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Fs&&w(k,O),k.needsUpdate=!1}p.needsUpdate=!1,o.setRenderTarget(H,E,N)};function w(P,C){const O=e.update(x);_.defines.VSM_SAMPLES!==P.blurSamples&&(_.defines.VSM_SAMPLES=P.blurSamples,M.defines.VSM_SAMPLES=P.blurSamples,_.needsUpdate=!0,M.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new vr(s.x,s.y)),_.uniforms.shadow_pass.value=P.map.texture,_.uniforms.resolution.value=P.mapSize,_.uniforms.radius.value=P.radius,o.setRenderTarget(P.mapPass),o.clear(),o.renderBufferDirect(C,null,O,_,x,null),M.uniforms.shadow_pass.value=P.mapPass.texture,M.uniforms.resolution.value=P.mapSize,M.uniforms.radius.value=P.radius,o.setRenderTarget(P.map),o.clear(),o.renderBufferDirect(C,null,O,M,x,null)}function R(P,C,O,H,E,N){let X=null;const ue=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(ue!==void 0?X=ue:X=O.isPointLight===!0?d:c,o.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0){const ye=X.uuid,J=C.uuid;let k=h[ye];k===void 0&&(k={},h[ye]=k);let ae=k[J];ae===void 0&&(ae=X.clone(),k[J]=ae),X=ae}return X.visible=C.visible,X.wireframe=C.wireframe,N===Fs?X.side=C.shadowSide!==null?C.shadowSide:C.side:X.side=C.shadowSide!==null?C.shadowSide:g[C.side],X.alphaMap=C.alphaMap,X.alphaTest=C.alphaTest,X.clipShadows=C.clipShadows,X.clippingPlanes=C.clippingPlanes,X.clipIntersection=C.clipIntersection,X.displacementMap=C.displacementMap,X.displacementScale=C.displacementScale,X.displacementBias=C.displacementBias,X.wireframeLinewidth=C.wireframeLinewidth,X.linewidth=C.linewidth,O.isPointLight===!0&&X.isMeshDistanceMaterial===!0&&(X.referencePosition.setFromMatrixPosition(O.matrixWorld),X.nearDistance=H,X.farDistance=E),X}function I(P,C,O,H,E){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&E===Fs)&&(!P.frustumCulled||r.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);const ue=e.update(P),ye=P.material;if(Array.isArray(ye)){const J=ue.groups;for(let k=0,ae=J.length;k<ae;k++){const he=J[k],le=ye[he.materialIndex];if(le&&le.visible){const ee=R(P,le,H,O.near,O.far,E);o.renderBufferDirect(O,null,ue,ee,P,he)}}}else if(ye.visible){const J=R(P,ye,H,O.near,O.far,E);o.renderBufferDirect(O,null,ue,J,P,null)}}const X=P.children;for(let ue=0,ye=X.length;ue<ye;ue++)I(X[ue],C,O,H,E)}}function oT(o,e,t){const r=t.isWebGL2;function s(){let z=!1;const Se=new Xt;let Q=null;const Me=new Xt(0,0,0,0);return{setMask:function(ve){Q!==ve&&!z&&(o.colorMask(ve,ve,ve,ve),Q=ve)},setLocked:function(ve){z=ve},setClear:function(ve,et,It,bt,jn){jn===!0&&(ve*=bt,et*=bt,It*=bt),Se.set(ve,et,It,bt),Me.equals(Se)===!1&&(o.clearColor(ve,et,It,bt),Me.copy(Se))},reset:function(){z=!1,Q=null,Me.set(-1,0,0,0)}}}function l(){let z=!1,Se=null,Q=null,Me=null;return{setTest:function(ve){ve?ct(2929):Fe(2929)},setMask:function(ve){Se!==ve&&!z&&(o.depthMask(ve),Se=ve)},setFunc:function(ve){if(Q!==ve){if(ve)switch(ve){case zM:o.depthFunc(512);break;case BM:o.depthFunc(519);break;case GM:o.depthFunc(513);break;case cc:o.depthFunc(515);break;case WM:o.depthFunc(514);break;case VM:o.depthFunc(518);break;case HM:o.depthFunc(516);break;case kM:o.depthFunc(517);break;default:o.depthFunc(515)}else o.depthFunc(515);Q=ve}},setLocked:function(ve){z=ve},setClear:function(ve){Me!==ve&&(o.clearDepth(ve),Me=ve)},reset:function(){z=!1,Se=null,Q=null,Me=null}}}function u(){let z=!1,Se=null,Q=null,Me=null,ve=null,et=null,It=null,bt=null,jn=null;return{setTest:function(Mt){z||(Mt?ct(2960):Fe(2960))},setMask:function(Mt){Se!==Mt&&!z&&(o.stencilMask(Mt),Se=Mt)},setFunc:function(Mt,En,ln){(Q!==Mt||Me!==En||ve!==ln)&&(o.stencilFunc(Mt,En,ln),Q=Mt,Me=En,ve=ln)},setOp:function(Mt,En,ln){(et!==Mt||It!==En||bt!==ln)&&(o.stencilOp(Mt,En,ln),et=Mt,It=En,bt=ln)},setLocked:function(Mt){z=Mt},setClear:function(Mt){jn!==Mt&&(o.clearStencil(Mt),jn=Mt)},reset:function(){z=!1,Se=null,Q=null,Me=null,ve=null,et=null,It=null,bt=null,jn=null}}}const c=new s,d=new l,h=new u,m=new WeakMap,g=new WeakMap;let _={},M={},b=new WeakMap,x=[],p=null,w=!1,R=null,I=null,P=null,C=null,O=null,H=null,E=null,N=!1,X=null,ue=null,ye=null,J=null,k=null;const ae=o.getParameter(35661);let he=!1,le=0;const ee=o.getParameter(7938);ee.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(ee)[1]),he=le>=1):ee.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),he=le>=2);let q=null,Z={};const ce=o.getParameter(3088),pe=o.getParameter(2978),de=new Xt().fromArray(ce),Ae=new Xt().fromArray(pe);function Ue(z,Se,Q){const Me=new Uint8Array(4),ve=o.createTexture();o.bindTexture(z,ve),o.texParameteri(z,10241,9728),o.texParameteri(z,10240,9728);for(let et=0;et<Q;et++)o.texImage2D(Se+et,0,6408,1,1,0,6408,5121,Me);return ve}const se={};se[3553]=Ue(3553,3553,1),se[34067]=Ue(34067,34069,6),c.setClear(0,0,0,1),d.setClear(1),h.setClear(0),ct(2929),d.setFunc(cc),Vt(!1),Dt(Xf),ct(2884),ft(Yi);function ct(z){_[z]!==!0&&(o.enable(z),_[z]=!0)}function Fe(z){_[z]!==!1&&(o.disable(z),_[z]=!1)}function Be(z,Se){return M[z]!==Se?(o.bindFramebuffer(z,Se),M[z]=Se,r&&(z===36009&&(M[36160]=Se),z===36160&&(M[36009]=Se)),!0):!1}function Ee(z,Se){let Q=x,Me=!1;if(z)if(Q=b.get(Se),Q===void 0&&(Q=[],b.set(Se,Q)),z.isWebGLMultipleRenderTargets){const ve=z.texture;if(Q.length!==ve.length||Q[0]!==36064){for(let et=0,It=ve.length;et<It;et++)Q[et]=36064+et;Q.length=ve.length,Me=!0}}else Q[0]!==36064&&(Q[0]=36064,Me=!0);else Q[0]!==1029&&(Q[0]=1029,Me=!0);Me&&(t.isWebGL2?o.drawBuffers(Q):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Q))}function at(z){return p!==z?(o.useProgram(z),p=z,!0):!1}const Xe={[es]:32774,[AM]:32778,[CM]:32779};if(r)Xe[$f]=32775,Xe[Kf]=32776;else{const z=e.get("EXT_blend_minmax");z!==null&&(Xe[$f]=z.MIN_EXT,Xe[Kf]=z.MAX_EXT)}const Pe={[LM]:0,[RM]:1,[DM]:768,[yd]:770,[UM]:776,[NM]:774,[IM]:772,[PM]:769,[bd]:771,[OM]:775,[FM]:773};function ft(z,Se,Q,Me,ve,et,It,bt){if(z===Yi){w===!0&&(Fe(3042),w=!1);return}if(w===!1&&(ct(3042),w=!0),z!==EM){if(z!==R||bt!==N){if((I!==es||O!==es)&&(o.blendEquation(32774),I=es,O=es),bt)switch(z){case ns:o.blendFuncSeparate(1,771,1,771);break;case gr:o.blendFunc(1,1);break;case Yf:o.blendFuncSeparate(0,769,0,1);break;case Zf:o.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case ns:o.blendFuncSeparate(770,771,1,771);break;case gr:o.blendFunc(770,1);break;case Yf:o.blendFuncSeparate(0,769,0,1);break;case Zf:o.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}P=null,C=null,H=null,E=null,R=z,N=bt}return}ve=ve||Se,et=et||Q,It=It||Me,(Se!==I||ve!==O)&&(o.blendEquationSeparate(Xe[Se],Xe[ve]),I=Se,O=ve),(Q!==P||Me!==C||et!==H||It!==E)&&(o.blendFuncSeparate(Pe[Q],Pe[Me],Pe[et],Pe[It]),P=Q,C=Me,H=et,E=It),R=z,N=null}function Nt(z,Se){z.side===qi?Fe(2884):ct(2884);let Q=z.side===Gn;Se&&(Q=!Q),Vt(Q),z.blending===ns&&z.transparent===!1?ft(Yi):ft(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.premultipliedAlpha),d.setFunc(z.depthFunc),d.setTest(z.depthTest),d.setMask(z.depthWrite),c.setMask(z.colorWrite);const Me=z.stencilWrite;h.setTest(Me),Me&&(h.setMask(z.stencilWriteMask),h.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),h.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),ht(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ct(32926):Fe(32926)}function Vt(z){X!==z&&(z?o.frontFace(2304):o.frontFace(2305),X=z)}function Dt(z){z!==bM?(ct(2884),z!==ue&&(z===Xf?o.cullFace(1029):z===wM?o.cullFace(1028):o.cullFace(1032))):Fe(2884),ue=z}function Pt(z){z!==ye&&(he&&o.lineWidth(z),ye=z)}function ht(z,Se,Q){z?(ct(32823),(J!==Se||k!==Q)&&(o.polygonOffset(Se,Q),J=Se,k=Q)):Fe(32823)}function Qt(z){z?ct(3089):Fe(3089)}function Tt(z){z===void 0&&(z=33984+ae-1),q!==z&&(o.activeTexture(z),q=z)}function L(z,Se){q===null&&Tt();let Q=Z[q];Q===void 0&&(Q={type:void 0,texture:void 0},Z[q]=Q),(Q.type!==z||Q.texture!==Se)&&(o.bindTexture(z,Se||se[z]),Q.type=z,Q.texture=Se)}function T(){const z=Z[q];z!==void 0&&z.type!==void 0&&(o.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function te(){try{o.compressedTexImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function fe(){try{o.texSubImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{o.texSubImage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function xe(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ze(){try{o.texStorage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $(){try{o.texStorage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{o.texImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(){try{o.texImage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Le(z){de.equals(z)===!1&&(o.scissor(z.x,z.y,z.z,z.w),de.copy(z))}function Te(z){Ae.equals(z)===!1&&(o.viewport(z.x,z.y,z.z,z.w),Ae.copy(z))}function ke(z,Se){let Q=g.get(Se);Q===void 0&&(Q=new WeakMap,g.set(Se,Q));let Me=Q.get(z);Me===void 0&&(Me=o.getUniformBlockIndex(Se,z.name),Q.set(z,Me))}function rt(z,Se){const Me=g.get(Se).get(z);m.get(z)!==Me&&(o.uniformBlockBinding(Se,Me,z.__bindingPointIndex),m.set(z,Me))}function _t(){o.disable(3042),o.disable(2884),o.disable(2929),o.disable(32823),o.disable(3089),o.disable(2960),o.disable(32926),o.blendEquation(32774),o.blendFunc(1,0),o.blendFuncSeparate(1,0,1,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(513),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(519,0,4294967295),o.stencilOp(7680,7680,7680),o.clearStencil(0),o.cullFace(1029),o.frontFace(2305),o.polygonOffset(0,0),o.activeTexture(33984),o.bindFramebuffer(36160,null),r===!0&&(o.bindFramebuffer(36009,null),o.bindFramebuffer(36008,null)),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),_={},q=null,Z={},M={},b=new WeakMap,x=[],p=null,w=!1,R=null,I=null,P=null,C=null,O=null,H=null,E=null,N=!1,X=null,ue=null,ye=null,J=null,k=null,de.set(0,0,o.canvas.width,o.canvas.height),Ae.set(0,0,o.canvas.width,o.canvas.height),c.reset(),d.reset(),h.reset()}return{buffers:{color:c,depth:d,stencil:h},enable:ct,disable:Fe,bindFramebuffer:Be,drawBuffers:Ee,useProgram:at,setBlending:ft,setMaterial:Nt,setFlipSided:Vt,setCullFace:Dt,setLineWidth:Pt,setPolygonOffset:ht,setScissorTest:Qt,activeTexture:Tt,bindTexture:L,unbindTexture:T,compressedTexImage2D:te,texImage2D:Re,texImage3D:we,updateUBOMapping:ke,uniformBlockBinding:rt,texStorage2D:ze,texStorage3D:$,texSubImage2D:fe,texSubImage3D:me,compressedTexSubImage2D:xe,scissor:Le,viewport:Te,reset:_t}}function lT(o,e,t,r,s,l,u){const c=s.isWebGL2,d=s.maxTextures,h=s.maxCubemapSize,m=s.maxTextureSize,g=s.maxSamples,_=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,M=/OculusBrowser/g.test(navigator.userAgent),b=new WeakMap;let x;const p=new WeakMap;let w=!1;try{w=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(L,T){return w?new OffscreenCanvas(L,T):io("canvas")}function I(L,T,te,fe){let me=1;if((L.width>fe||L.height>fe)&&(me=fe/Math.max(L.width,L.height)),me<1||T===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const xe=T?mc:Math.floor,ze=xe(me*L.width),$=xe(me*L.height);x===void 0&&(x=R(ze,$));const Re=te?R(ze,$):x;return Re.width=ze,Re.height=$,Re.getContext("2d").drawImage(L,0,0,ze,$),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+ze+"x"+$+")."),Re}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function P(L){return bh(L.width)&&bh(L.height)}function C(L){return c?!1:L.wrapS!==Qn||L.wrapT!==Qn||L.minFilter!==dn&&L.minFilter!==On}function O(L,T){return L.generateMipmaps&&T&&L.minFilter!==dn&&L.minFilter!==On}function H(L){o.generateMipmap(L)}function E(L,T,te,fe,me=!1){if(c===!1)return T;if(L!==null){if(o[L]!==void 0)return o[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let xe=T;return T===6403&&(te===5126&&(xe=33326),te===5131&&(xe=33325),te===5121&&(xe=33321)),T===33319&&(te===5126&&(xe=33328),te===5131&&(xe=33327),te===5121&&(xe=33323)),T===6408&&(te===5126&&(xe=34836),te===5131&&(xe=34842),te===5121&&(xe=fe===Ct&&me===!1?35907:32856),te===32819&&(xe=32854),te===32820&&(xe=32855)),(xe===33325||xe===33326||xe===33327||xe===33328||xe===34842||xe===34836)&&e.get("EXT_color_buffer_float"),xe}function N(L,T,te){return O(L,te)===!0||L.isFramebufferTexture&&L.minFilter!==dn&&L.minFilter!==On?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function X(L){return L===dn||L===Jf||L===Qf?9728:9729}function ue(L){const T=L.target;T.removeEventListener("dispose",ue),J(T),T.isVideoTexture&&b.delete(T)}function ye(L){const T=L.target;T.removeEventListener("dispose",ye),ae(T)}function J(L){const T=r.get(L);if(T.__webglInit===void 0)return;const te=L.source,fe=p.get(te);if(fe){const me=fe[T.__cacheKey];me.usedTimes--,me.usedTimes===0&&k(L),Object.keys(fe).length===0&&p.delete(te)}r.remove(L)}function k(L){const T=r.get(L);o.deleteTexture(T.__webglTexture);const te=L.source,fe=p.get(te);delete fe[T.__cacheKey],u.memory.textures--}function ae(L){const T=L.texture,te=r.get(L),fe=r.get(T);if(fe.__webglTexture!==void 0&&(o.deleteTexture(fe.__webglTexture),u.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let me=0;me<6;me++)o.deleteFramebuffer(te.__webglFramebuffer[me]),te.__webglDepthbuffer&&o.deleteRenderbuffer(te.__webglDepthbuffer[me]);else{if(o.deleteFramebuffer(te.__webglFramebuffer),te.__webglDepthbuffer&&o.deleteRenderbuffer(te.__webglDepthbuffer),te.__webglMultisampledFramebuffer&&o.deleteFramebuffer(te.__webglMultisampledFramebuffer),te.__webglColorRenderbuffer)for(let me=0;me<te.__webglColorRenderbuffer.length;me++)te.__webglColorRenderbuffer[me]&&o.deleteRenderbuffer(te.__webglColorRenderbuffer[me]);te.__webglDepthRenderbuffer&&o.deleteRenderbuffer(te.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let me=0,xe=T.length;me<xe;me++){const ze=r.get(T[me]);ze.__webglTexture&&(o.deleteTexture(ze.__webglTexture),u.memory.textures--),r.remove(T[me])}r.remove(T),r.remove(L)}let he=0;function le(){he=0}function ee(){const L=he;return L>=d&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+d),he+=1,L}function q(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.encoding),T.join()}function Z(L,T){const te=r.get(L);if(L.isVideoTexture&&Qt(L),L.isRenderTargetTexture===!1&&L.version>0&&te.__version!==L.version){const fe=L.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(te,L,T);return}}t.activeTexture(33984+T),t.bindTexture(3553,te.__webglTexture)}function ce(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Fe(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(35866,te.__webglTexture)}function pe(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Fe(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(32879,te.__webglTexture)}function de(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Be(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(34067,te.__webglTexture)}const Ae={[hc]:10497,[Qn]:33071,[dc]:33648},Ue={[dn]:9728,[Jf]:9984,[Qf]:9986,[On]:9729,[QM]:9985,[ao]:9987};function se(L,T,te){if(te?(o.texParameteri(L,10242,Ae[T.wrapS]),o.texParameteri(L,10243,Ae[T.wrapT]),(L===32879||L===35866)&&o.texParameteri(L,32882,Ae[T.wrapR]),o.texParameteri(L,10240,Ue[T.magFilter]),o.texParameteri(L,10241,Ue[T.minFilter])):(o.texParameteri(L,10242,33071),o.texParameteri(L,10243,33071),(L===32879||L===35866)&&o.texParameteri(L,32882,33071),(T.wrapS!==Qn||T.wrapT!==Qn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),o.texParameteri(L,10240,X(T.magFilter)),o.texParameteri(L,10241,X(T.minFilter)),T.minFilter!==dn&&T.minFilter!==On&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const fe=e.get("EXT_texture_filter_anisotropic");if(T.type===hr&&e.has("OES_texture_float_linear")===!1||c===!1&&T.type===Os&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||r.get(T).__currentAnisotropy)&&(o.texParameterf(L,fe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy)}}function ct(L,T){let te=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",ue));const fe=T.source;let me=p.get(fe);me===void 0&&(me={},p.set(fe,me));const xe=q(T);if(xe!==L.__cacheKey){me[xe]===void 0&&(me[xe]={texture:o.createTexture(),usedTimes:0},u.memory.textures++,te=!0),me[xe].usedTimes++;const ze=me[L.__cacheKey];ze!==void 0&&(me[L.__cacheKey].usedTimes--,ze.usedTimes===0&&k(T)),L.__cacheKey=xe,L.__webglTexture=me[xe].texture}return te}function Fe(L,T,te){let fe=3553;T.isDataArrayTexture&&(fe=35866),T.isData3DTexture&&(fe=32879);const me=ct(L,T),xe=T.source;if(t.activeTexture(33984+te),t.bindTexture(fe,L.__webglTexture),xe.version!==xe.__currentVersion||me===!0){o.pixelStorei(37440,T.flipY),o.pixelStorei(37441,T.premultiplyAlpha),o.pixelStorei(3317,T.unpackAlignment),o.pixelStorei(37443,0);const ze=C(T)&&P(T.image)===!1;let $=I(T.image,ze,!1,m);$=Tt(T,$);const Re=P($)||c,we=l.convert(T.format,T.encoding);let Le=l.convert(T.type),Te=E(T.internalFormat,we,Le,T.encoding,T.isVideoTexture);se(fe,T,Re);let ke;const rt=T.mipmaps,_t=c&&T.isVideoTexture!==!0,z=xe.__currentVersion===void 0||me===!0,Se=N(T,$,Re);if(T.isDepthTexture)Te=6402,c?T.type===hr?Te=36012:T.type===fr?Te=33190:T.type===is?Te=35056:Te=33189:T.type===hr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===pr&&Te===6402&&T.type!==Ed&&T.type!==fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=fr,Le=l.convert(T.type)),T.format===os&&Te===6402&&(Te=34041,T.type!==is&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=is,Le=l.convert(T.type))),z&&(_t?t.texStorage2D(3553,1,Te,$.width,$.height):t.texImage2D(3553,0,Te,$.width,$.height,0,we,Le,null));else if(T.isDataTexture)if(rt.length>0&&Re){_t&&z&&t.texStorage2D(3553,Se,Te,rt[0].width,rt[0].height);for(let Q=0,Me=rt.length;Q<Me;Q++)ke=rt[Q],_t?t.texSubImage2D(3553,Q,0,0,ke.width,ke.height,we,Le,ke.data):t.texImage2D(3553,Q,Te,ke.width,ke.height,0,we,Le,ke.data);T.generateMipmaps=!1}else _t?(z&&t.texStorage2D(3553,Se,Te,$.width,$.height),t.texSubImage2D(3553,0,0,0,$.width,$.height,we,Le,$.data)):t.texImage2D(3553,0,Te,$.width,$.height,0,we,Le,$.data);else if(T.isCompressedTexture){_t&&z&&t.texStorage2D(3553,Se,Te,rt[0].width,rt[0].height);for(let Q=0,Me=rt.length;Q<Me;Q++)ke=rt[Q],T.format!==ri?we!==null?_t?t.compressedTexSubImage2D(3553,Q,0,0,ke.width,ke.height,we,ke.data):t.compressedTexImage2D(3553,Q,Te,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?t.texSubImage2D(3553,Q,0,0,ke.width,ke.height,we,Le,ke.data):t.texImage2D(3553,Q,Te,ke.width,ke.height,0,we,Le,ke.data)}else if(T.isDataArrayTexture)_t?(z&&t.texStorage3D(35866,Se,Te,$.width,$.height,$.depth),t.texSubImage3D(35866,0,0,0,0,$.width,$.height,$.depth,we,Le,$.data)):t.texImage3D(35866,0,Te,$.width,$.height,$.depth,0,we,Le,$.data);else if(T.isData3DTexture)_t?(z&&t.texStorage3D(32879,Se,Te,$.width,$.height,$.depth),t.texSubImage3D(32879,0,0,0,0,$.width,$.height,$.depth,we,Le,$.data)):t.texImage3D(32879,0,Te,$.width,$.height,$.depth,0,we,Le,$.data);else if(T.isFramebufferTexture){if(z)if(_t)t.texStorage2D(3553,Se,Te,$.width,$.height);else{let Q=$.width,Me=$.height;for(let ve=0;ve<Se;ve++)t.texImage2D(3553,ve,Te,Q,Me,0,we,Le,null),Q>>=1,Me>>=1}}else if(rt.length>0&&Re){_t&&z&&t.texStorage2D(3553,Se,Te,rt[0].width,rt[0].height);for(let Q=0,Me=rt.length;Q<Me;Q++)ke=rt[Q],_t?t.texSubImage2D(3553,Q,0,0,we,Le,ke):t.texImage2D(3553,Q,Te,we,Le,ke);T.generateMipmaps=!1}else _t?(z&&t.texStorage2D(3553,Se,Te,$.width,$.height),t.texSubImage2D(3553,0,0,0,we,Le,$)):t.texImage2D(3553,0,Te,we,Le,$);O(T,Re)&&H(fe),xe.__currentVersion=xe.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Be(L,T,te){if(T.image.length!==6)return;const fe=ct(L,T),me=T.source;if(t.activeTexture(33984+te),t.bindTexture(34067,L.__webglTexture),me.version!==me.__currentVersion||fe===!0){o.pixelStorei(37440,T.flipY),o.pixelStorei(37441,T.premultiplyAlpha),o.pixelStorei(3317,T.unpackAlignment),o.pixelStorei(37443,0);const xe=T.isCompressedTexture||T.image[0].isCompressedTexture,ze=T.image[0]&&T.image[0].isDataTexture,$=[];for(let Q=0;Q<6;Q++)!xe&&!ze?$[Q]=I(T.image[Q],!1,!0,h):$[Q]=ze?T.image[Q].image:T.image[Q],$[Q]=Tt(T,$[Q]);const Re=$[0],we=P(Re)||c,Le=l.convert(T.format,T.encoding),Te=l.convert(T.type),ke=E(T.internalFormat,Le,Te,T.encoding),rt=c&&T.isVideoTexture!==!0,_t=me.__currentVersion===void 0||fe===!0;let z=N(T,Re,we);se(34067,T,we);let Se;if(xe){rt&&_t&&t.texStorage2D(34067,z,ke,Re.width,Re.height);for(let Q=0;Q<6;Q++){Se=$[Q].mipmaps;for(let Me=0;Me<Se.length;Me++){const ve=Se[Me];T.format!==ri?Le!==null?rt?t.compressedTexSubImage2D(34069+Q,Me,0,0,ve.width,ve.height,Le,ve.data):t.compressedTexImage2D(34069+Q,Me,ke,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):rt?t.texSubImage2D(34069+Q,Me,0,0,ve.width,ve.height,Le,Te,ve.data):t.texImage2D(34069+Q,Me,ke,ve.width,ve.height,0,Le,Te,ve.data)}}}else{Se=T.mipmaps,rt&&_t&&(Se.length>0&&z++,t.texStorage2D(34067,z,ke,$[0].width,$[0].height));for(let Q=0;Q<6;Q++)if(ze){rt?t.texSubImage2D(34069+Q,0,0,0,$[Q].width,$[Q].height,Le,Te,$[Q].data):t.texImage2D(34069+Q,0,ke,$[Q].width,$[Q].height,0,Le,Te,$[Q].data);for(let Me=0;Me<Se.length;Me++){const et=Se[Me].image[Q].image;rt?t.texSubImage2D(34069+Q,Me+1,0,0,et.width,et.height,Le,Te,et.data):t.texImage2D(34069+Q,Me+1,ke,et.width,et.height,0,Le,Te,et.data)}}else{rt?t.texSubImage2D(34069+Q,0,0,0,Le,Te,$[Q]):t.texImage2D(34069+Q,0,ke,Le,Te,$[Q]);for(let Me=0;Me<Se.length;Me++){const ve=Se[Me];rt?t.texSubImage2D(34069+Q,Me+1,0,0,Le,Te,ve.image[Q]):t.texImage2D(34069+Q,Me+1,ke,Le,Te,ve.image[Q])}}}O(T,we)&&H(34067),me.__currentVersion=me.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Ee(L,T,te,fe,me){const xe=l.convert(te.format,te.encoding),ze=l.convert(te.type),$=E(te.internalFormat,xe,ze,te.encoding);r.get(T).__hasExternalTextures||(me===32879||me===35866?t.texImage3D(me,0,$,T.width,T.height,T.depth,0,xe,ze,null):t.texImage2D(me,0,$,T.width,T.height,0,xe,ze,null)),t.bindFramebuffer(36160,L),ht(T)?_.framebufferTexture2DMultisampleEXT(36160,fe,me,r.get(te).__webglTexture,0,Pt(T)):o.framebufferTexture2D(36160,fe,me,r.get(te).__webglTexture,0),t.bindFramebuffer(36160,null)}function at(L,T,te){if(o.bindRenderbuffer(36161,L),T.depthBuffer&&!T.stencilBuffer){let fe=33189;if(te||ht(T)){const me=T.depthTexture;me&&me.isDepthTexture&&(me.type===hr?fe=36012:me.type===fr&&(fe=33190));const xe=Pt(T);ht(T)?_.renderbufferStorageMultisampleEXT(36161,xe,fe,T.width,T.height):o.renderbufferStorageMultisample(36161,xe,fe,T.width,T.height)}else o.renderbufferStorage(36161,fe,T.width,T.height);o.framebufferRenderbuffer(36160,36096,36161,L)}else if(T.depthBuffer&&T.stencilBuffer){const fe=Pt(T);te&&ht(T)===!1?o.renderbufferStorageMultisample(36161,fe,35056,T.width,T.height):ht(T)?_.renderbufferStorageMultisampleEXT(36161,fe,35056,T.width,T.height):o.renderbufferStorage(36161,34041,T.width,T.height),o.framebufferRenderbuffer(36160,33306,36161,L)}else{const fe=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let me=0;me<fe.length;me++){const xe=fe[me],ze=l.convert(xe.format,xe.encoding),$=l.convert(xe.type),Re=E(xe.internalFormat,ze,$,xe.encoding),we=Pt(T);te&&ht(T)===!1?o.renderbufferStorageMultisample(36161,we,Re,T.width,T.height):ht(T)?_.renderbufferStorageMultisampleEXT(36161,we,Re,T.width,T.height):o.renderbufferStorage(36161,Re,T.width,T.height)}}o.bindRenderbuffer(36161,null)}function Xe(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Z(T.depthTexture,0);const fe=r.get(T.depthTexture).__webglTexture,me=Pt(T);if(T.depthTexture.format===pr)ht(T)?_.framebufferTexture2DMultisampleEXT(36160,36096,3553,fe,0,me):o.framebufferTexture2D(36160,36096,3553,fe,0);else if(T.depthTexture.format===os)ht(T)?_.framebufferTexture2DMultisampleEXT(36160,33306,3553,fe,0,me):o.framebufferTexture2D(36160,33306,3553,fe,0);else throw new Error("Unknown depthTexture format")}function Pe(L){const T=r.get(L),te=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");Xe(T.__webglFramebuffer,L)}else if(te){T.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)t.bindFramebuffer(36160,T.__webglFramebuffer[fe]),T.__webglDepthbuffer[fe]=o.createRenderbuffer(),at(T.__webglDepthbuffer[fe],L,!1)}else t.bindFramebuffer(36160,T.__webglFramebuffer),T.__webglDepthbuffer=o.createRenderbuffer(),at(T.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function ft(L,T,te){const fe=r.get(L);T!==void 0&&Ee(fe.__webglFramebuffer,L,L.texture,36064,3553),te!==void 0&&Pe(L)}function Nt(L){const T=L.texture,te=r.get(L),fe=r.get(T);L.addEventListener("dispose",ye),L.isWebGLMultipleRenderTargets!==!0&&(fe.__webglTexture===void 0&&(fe.__webglTexture=o.createTexture()),fe.__version=T.version,u.memory.textures++);const me=L.isWebGLCubeRenderTarget===!0,xe=L.isWebGLMultipleRenderTargets===!0,ze=P(L)||c;if(me){te.__webglFramebuffer=[];for(let $=0;$<6;$++)te.__webglFramebuffer[$]=o.createFramebuffer()}else{if(te.__webglFramebuffer=o.createFramebuffer(),xe)if(s.drawBuffers){const $=L.texture;for(let Re=0,we=$.length;Re<we;Re++){const Le=r.get($[Re]);Le.__webglTexture===void 0&&(Le.__webglTexture=o.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&L.samples>0&&ht(L)===!1){const $=xe?T:[T];te.__webglMultisampledFramebuffer=o.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,te.__webglMultisampledFramebuffer);for(let Re=0;Re<$.length;Re++){const we=$[Re];te.__webglColorRenderbuffer[Re]=o.createRenderbuffer(),o.bindRenderbuffer(36161,te.__webglColorRenderbuffer[Re]);const Le=l.convert(we.format,we.encoding),Te=l.convert(we.type),ke=E(we.internalFormat,Le,Te,we.encoding),rt=Pt(L);o.renderbufferStorageMultisample(36161,rt,ke,L.width,L.height),o.framebufferRenderbuffer(36160,36064+Re,36161,te.__webglColorRenderbuffer[Re])}o.bindRenderbuffer(36161,null),L.depthBuffer&&(te.__webglDepthRenderbuffer=o.createRenderbuffer(),at(te.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(me){t.bindTexture(34067,fe.__webglTexture),se(34067,T,ze);for(let $=0;$<6;$++)Ee(te.__webglFramebuffer[$],L,T,36064,34069+$);O(T,ze)&&H(34067),t.unbindTexture()}else if(xe){const $=L.texture;for(let Re=0,we=$.length;Re<we;Re++){const Le=$[Re],Te=r.get(Le);t.bindTexture(3553,Te.__webglTexture),se(3553,Le,ze),Ee(te.__webglFramebuffer,L,Le,36064+Re,3553),O(Le,ze)&&H(3553)}t.unbindTexture()}else{let $=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(c?$=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture($,fe.__webglTexture),se($,T,ze),Ee(te.__webglFramebuffer,L,T,36064,$),O(T,ze)&&H($),t.unbindTexture()}L.depthBuffer&&Pe(L)}function Vt(L){const T=P(L)||c,te=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let fe=0,me=te.length;fe<me;fe++){const xe=te[fe];if(O(xe,T)){const ze=L.isWebGLCubeRenderTarget?34067:3553,$=r.get(xe).__webglTexture;t.bindTexture(ze,$),H(ze),t.unbindTexture()}}}function Dt(L){if(c&&L.samples>0&&ht(L)===!1){const T=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],te=L.width,fe=L.height;let me=16384;const xe=[],ze=L.stencilBuffer?33306:36096,$=r.get(L),Re=L.isWebGLMultipleRenderTargets===!0;if(Re)for(let we=0;we<T.length;we++)t.bindFramebuffer(36160,$.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+we,36161,null),t.bindFramebuffer(36160,$.__webglFramebuffer),o.framebufferTexture2D(36009,36064+we,3553,null,0);t.bindFramebuffer(36008,$.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,$.__webglFramebuffer);for(let we=0;we<T.length;we++){xe.push(36064+we),L.depthBuffer&&xe.push(ze);const Le=$.__ignoreDepthValues!==void 0?$.__ignoreDepthValues:!1;if(Le===!1&&(L.depthBuffer&&(me|=256),L.stencilBuffer&&(me|=1024)),Re&&o.framebufferRenderbuffer(36008,36064,36161,$.__webglColorRenderbuffer[we]),Le===!0&&(o.invalidateFramebuffer(36008,[ze]),o.invalidateFramebuffer(36009,[ze])),Re){const Te=r.get(T[we]).__webglTexture;o.framebufferTexture2D(36009,36064,3553,Te,0)}o.blitFramebuffer(0,0,te,fe,0,0,te,fe,me,9728),M&&o.invalidateFramebuffer(36008,xe)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),Re)for(let we=0;we<T.length;we++){t.bindFramebuffer(36160,$.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+we,36161,$.__webglColorRenderbuffer[we]);const Le=r.get(T[we]).__webglTexture;t.bindFramebuffer(36160,$.__webglFramebuffer),o.framebufferTexture2D(36009,36064+we,3553,Le,0)}t.bindFramebuffer(36009,$.__webglMultisampledFramebuffer)}}function Pt(L){return Math.min(g,L.samples)}function ht(L){const T=r.get(L);return c&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Qt(L){const T=u.render.frame;b.get(L)!==T&&(b.set(L,T),L.update())}function Tt(L,T){const te=L.encoding,fe=L.format,me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===pc||te!==xr&&(te===Ct?c===!1?e.has("EXT_sRGB")===!0&&fe===ri?(L.format=pc,L.minFilter=On,L.generateMipmaps=!1):T=Ld.sRGBToLinear(T):(fe!==ri||me!==_r)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",te)),T}this.allocateTextureUnit=ee,this.resetTextureUnits=le,this.setTexture2D=Z,this.setTexture2DArray=ce,this.setTexture3D=pe,this.setTextureCube=de,this.rebindTextures=ft,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=ht}function cT(o,e,t){const r=t.isWebGL2;function s(l,u=null){let c;if(l===_r)return 5121;if(l===nS)return 32819;if(l===iS)return 32820;if(l===jM)return 5120;if(l===eS)return 5122;if(l===Ed)return 5123;if(l===tS)return 5124;if(l===fr)return 5125;if(l===hr)return 5126;if(l===Os)return r?5131:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(l===rS)return 6406;if(l===ri)return 6408;if(l===aS)return 6409;if(l===oS)return 6410;if(l===pr)return 6402;if(l===os)return 34041;if(l===lS)return 6403;if(l===sS)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(l===pc)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(l===cS)return 36244;if(l===uS)return 33319;if(l===fS)return 33320;if(l===hS)return 36249;if(l===El||l===Al||l===Cl||l===Ll)if(u===Ct)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(l===El)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Al)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Cl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Ll)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(l===El)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Al)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Cl)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Ll)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===jf||l===eh||l===th||l===nh)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(l===jf)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===eh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===th)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===nh)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===dS)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===ih||l===rh)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(l===ih)return u===Ct?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(l===rh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===sh||l===ah||l===oh||l===lh||l===ch||l===uh||l===fh||l===hh||l===dh||l===ph||l===mh||l===gh||l===_h||l===xh)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(l===sh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===ah)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===oh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===lh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===ch)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===uh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===fh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===hh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===dh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===ph)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===mh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===gh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===_h)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===xh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===vh)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(l===vh)return u===Ct?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return l===is?r?34042:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):o[l]!==void 0?o[l]:null}return{convert:s}}class uT extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bn extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fT={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let s=null,l=null,u=null;const c=this._targetRay,d=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){u=!0;for(const x of e.hand.values()){const p=t.getJointPose(x,r);if(h.joints[x.jointName]===void 0){const R=new Bn;R.matrixAutoUpdate=!1,R.visible=!1,h.joints[x.jointName]=R,h.add(R)}const w=h.joints[x.jointName];p!==null&&(w.matrix.fromArray(p.transform.matrix),w.matrix.decompose(w.position,w.rotation,w.scale),w.jointRadius=p.radius),w.visible=p!==null}const m=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],_=m.position.distanceTo(g.position),M=.02,b=.005;h.inputState.pinching&&_>M+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&_<=M-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1));c!==null&&(s=t.getPose(e.targetRaySpace,r),s===null&&l!==null&&(s=l),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(fT)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=l!==null),h!==null&&(h.visible=u!==null),this}}class hT extends Wn{constructor(e,t,r,s,l,u,c,d,h,m){if(m=m!==void 0?m:pr,m!==pr&&m!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&m===pr&&(r=fr),r===void 0&&m===os&&(r=is),super(null,s,l,u,c,d,m,r,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:dn,this.minFilter=d!==void 0?d:dn,this.flipY=!1,this.generateMipmaps=!1}}class dT extends cs{constructor(e,t){super();const r=this;let s=null,l=1,u=null,c="local-floor",d=null,h=null,m=null,g=null,_=null,M=null;const b=t.getContextAttributes();let x=null,p=null;const w=[],R=[],I=new Un;I.layers.enable(1),I.viewport=new Xt;const P=new Un;P.layers.enable(2),P.viewport=new Xt;const C=[I,P],O=new uT;O.layers.enable(1),O.layers.enable(2);let H=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=w[q];return Z===void 0&&(Z=new ic,w[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=w[q];return Z===void 0&&(Z=new ic,w[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=w[q];return Z===void 0&&(Z=new ic,w[q]=Z),Z.getHandSpace()};function N(q){const Z=R.indexOf(q.inputSource);if(Z===-1)return;const ce=w[Z];ce!==void 0&&ce.dispatchEvent({type:q.type,data:q.inputSource})}function X(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ue);for(let q=0;q<w.length;q++){const Z=R[q];Z!==null&&(R[q]=null,w[q].disconnect(Z))}H=null,E=null,e.setRenderTarget(x),_=null,g=null,m=null,s=null,p=null,ee.stop(),r.isPresenting=!1,r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){l=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(q){d=q},this.getBaseLayer=function(){return g!==null?g:_},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(x=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ue),b.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:s.renderState.layers===void 0?b.antialias:!0,alpha:b.alpha,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:l};_=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:_}),p=new vr(_.framebufferWidth,_.framebufferHeight,{format:ri,type:_r,encoding:e.outputEncoding,stencilBuffer:b.stencil})}else{let Z=null,ce=null,pe=null;b.depth&&(pe=b.stencil?35056:33190,Z=b.stencil?os:pr,ce=b.stencil?is:fr);const de={colorFormat:32856,depthFormat:pe,scaleFactor:l};m=new XRWebGLBinding(s,t),g=m.createProjectionLayer(de),s.updateRenderState({layers:[g]}),p=new vr(g.textureWidth,g.textureHeight,{format:ri,type:_r,depthTexture:new hT(g.textureWidth,g.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:b.stencil,encoding:e.outputEncoding,samples:b.antialias?4:0});const Ae=e.properties.get(p);Ae.__ignoreDepthValues=g.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),d=null,u=await s.requestReferenceSpace(c),ee.setContext(s),ee.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}};function ue(q){for(let Z=0;Z<q.removed.length;Z++){const ce=q.removed[Z],pe=R.indexOf(ce);pe>=0&&(R[pe]=null,w[pe].dispatchEvent({type:"disconnected",data:ce}))}for(let Z=0;Z<q.added.length;Z++){const ce=q.added[Z];let pe=R.indexOf(ce);if(pe===-1){for(let Ae=0;Ae<w.length;Ae++)if(Ae>=R.length){R.push(ce),pe=Ae;break}else if(R[Ae]===null){R[Ae]=ce,pe=Ae;break}if(pe===-1)break}const de=w[pe];de&&de.dispatchEvent({type:"connected",data:ce})}}const ye=new G,J=new G;function k(q,Z,ce){ye.setFromMatrixPosition(Z.matrixWorld),J.setFromMatrixPosition(ce.matrixWorld);const pe=ye.distanceTo(J),de=Z.projectionMatrix.elements,Ae=ce.projectionMatrix.elements,Ue=de[14]/(de[10]-1),se=de[14]/(de[10]+1),ct=(de[9]+1)/de[5],Fe=(de[9]-1)/de[5],Be=(de[8]-1)/de[0],Ee=(Ae[8]+1)/Ae[0],at=Ue*Be,Xe=Ue*Ee,Pe=pe/(-Be+Ee),ft=Pe*-Be;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ft),q.translateZ(Pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const Nt=Ue+Pe,Vt=se+Pe,Dt=at-ft,Pt=Xe+(pe-ft),ht=ct*se/Vt*Nt,Qt=Fe*se/Vt*Nt;q.projectionMatrix.makePerspective(Dt,Pt,ht,Qt,Nt,Vt)}function ae(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;O.near=P.near=I.near=q.near,O.far=P.far=I.far=q.far,(H!==O.near||E!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,E=O.far);const Z=q.parent,ce=O.cameras;ae(O,Z);for(let de=0;de<ce.length;de++)ae(ce[de],Z);O.matrixWorld.decompose(O.position,O.quaternion,O.scale),q.matrix.copy(O.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale);const pe=q.children;for(let de=0,Ae=pe.length;de<Ae;de++)pe[de].updateMatrixWorld(!0);ce.length===2?k(O,I,P):O.projectionMatrix.copy(I.projectionMatrix)},this.getCamera=function(){return O},this.getFoveation=function(){if(g!==null)return g.fixedFoveation;if(_!==null)return _.fixedFoveation},this.setFoveation=function(q){g!==null&&(g.fixedFoveation=q),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=q)};let he=null;function le(q,Z){if(h=Z.getViewerPose(d||u),M=Z,h!==null){const ce=h.views;_!==null&&(e.setRenderTargetFramebuffer(p,_.framebuffer),e.setRenderTarget(p));let pe=!1;ce.length!==O.cameras.length&&(O.cameras.length=0,pe=!0);for(let de=0;de<ce.length;de++){const Ae=ce[de];let Ue=null;if(_!==null)Ue=_.getViewport(Ae);else{const ct=m.getViewSubImage(g,Ae);Ue=ct.viewport,de===0&&(e.setRenderTargetTextures(p,ct.colorTexture,g.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(p))}let se=C[de];se===void 0&&(se=new Un,se.layers.enable(de),se.viewport=new Xt,C[de]=se),se.matrix.fromArray(Ae.transform.matrix),se.projectionMatrix.fromArray(Ae.projectionMatrix),se.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),de===0&&O.matrix.copy(se.matrix),pe===!0&&O.cameras.push(se)}}for(let ce=0;ce<w.length;ce++){const pe=R[ce],de=w[ce];pe!==null&&de!==void 0&&de.update(pe,Z,d||u)}he&&he(q,Z),M=null}const ee=new Bd;ee.setAnimationLoop(le),this.setAnimationLoop=function(q){he=q},this.dispose=function(){}}}function pT(o,e){function t(x,p){x.fogColor.value.copy(p.color),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function r(x,p,w,R,I){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(x,p):p.isMeshToonMaterial?(s(x,p),m(x,p)):p.isMeshPhongMaterial?(s(x,p),h(x,p)):p.isMeshStandardMaterial?(s(x,p),g(x,p),p.isMeshPhysicalMaterial&&_(x,p,I)):p.isMeshMatcapMaterial?(s(x,p),M(x,p)):p.isMeshDepthMaterial?s(x,p):p.isMeshDistanceMaterial?(s(x,p),b(x,p)):p.isMeshNormalMaterial?s(x,p):p.isLineBasicMaterial?(l(x,p),p.isLineDashedMaterial&&u(x,p)):p.isPointsMaterial?c(x,p,w,R):p.isSpriteMaterial?d(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map),p.alphaMap&&(x.alphaMap.value=p.alphaMap),p.bumpMap&&(x.bumpMap.value=p.bumpMap,x.bumpScale.value=p.bumpScale,p.side===Gn&&(x.bumpScale.value*=-1)),p.displacementMap&&(x.displacementMap.value=p.displacementMap,x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap),p.normalMap&&(x.normalMap.value=p.normalMap,x.normalScale.value.copy(p.normalScale),p.side===Gn&&x.normalScale.value.negate()),p.specularMap&&(x.specularMap.value=p.specularMap),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);const w=e.get(p).envMap;if(w&&(x.envMap.value=w,x.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap){x.lightMap.value=p.lightMap;const P=o.physicallyCorrectLights!==!0?Math.PI:1;x.lightMapIntensity.value=p.lightMapIntensity*P}p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity);let R;p.map?R=p.map:p.specularMap?R=p.specularMap:p.displacementMap?R=p.displacementMap:p.normalMap?R=p.normalMap:p.bumpMap?R=p.bumpMap:p.roughnessMap?R=p.roughnessMap:p.metalnessMap?R=p.metalnessMap:p.alphaMap?R=p.alphaMap:p.emissiveMap?R=p.emissiveMap:p.clearcoatMap?R=p.clearcoatMap:p.clearcoatNormalMap?R=p.clearcoatNormalMap:p.clearcoatRoughnessMap?R=p.clearcoatRoughnessMap:p.iridescenceMap?R=p.iridescenceMap:p.iridescenceThicknessMap?R=p.iridescenceThicknessMap:p.specularIntensityMap?R=p.specularIntensityMap:p.specularColorMap?R=p.specularColorMap:p.transmissionMap?R=p.transmissionMap:p.thicknessMap?R=p.thicknessMap:p.sheenColorMap?R=p.sheenColorMap:p.sheenRoughnessMap&&(R=p.sheenRoughnessMap),R!==void 0&&(R.isWebGLRenderTarget&&(R=R.texture),R.matrixAutoUpdate===!0&&R.updateMatrix(),x.uvTransform.value.copy(R.matrix));let I;p.aoMap?I=p.aoMap:p.lightMap&&(I=p.lightMap),I!==void 0&&(I.isWebGLRenderTarget&&(I=I.texture),I.matrixAutoUpdate===!0&&I.updateMatrix(),x.uv2Transform.value.copy(I.matrix))}function l(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity}function u(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function c(x,p,w,R){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*w,x.scale.value=R*.5,p.map&&(x.map.value=p.map),p.alphaMap&&(x.alphaMap.value=p.alphaMap),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);let I;p.map?I=p.map:p.alphaMap&&(I=p.alphaMap),I!==void 0&&(I.matrixAutoUpdate===!0&&I.updateMatrix(),x.uvTransform.value.copy(I.matrix))}function d(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map),p.alphaMap&&(x.alphaMap.value=p.alphaMap),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);let w;p.map?w=p.map:p.alphaMap&&(w=p.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),x.uvTransform.value.copy(w.matrix))}function h(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function m(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function g(x,p){x.roughness.value=p.roughness,x.metalness.value=p.metalness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function _(x,p,w){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),x.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===Gn&&x.clearcoatNormalScale.value.negate())),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap)}function M(x,p){p.matcap&&(x.matcap.value=p.matcap)}function b(x,p){x.referencePosition.value.copy(p.referencePosition),x.nearDistance.value=p.nearDistance,x.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:r}}function mT(o,e,t,r){let s={},l={},u=[];const c=t.isWebGL2?o.getParameter(35375):0;function d(R,I){const P=I.program;r.uniformBlockBinding(R,P)}function h(R,I){let P=s[R.id];P===void 0&&(b(R),P=m(R),s[R.id]=P,R.addEventListener("dispose",p));const C=I.program;r.updateUBOMapping(R,C);const O=e.render.frame;l[R.id]!==O&&(_(R),l[R.id]=O)}function m(R){const I=g();R.__bindingPointIndex=I;const P=o.createBuffer(),C=R.__size,O=R.usage;return o.bindBuffer(35345,P),o.bufferData(35345,C,O),o.bindBuffer(35345,null),o.bindBufferBase(35345,I,P),P}function g(){for(let R=0;R<c;R++)if(u.indexOf(R)===-1)return u.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(R){const I=s[R.id],P=R.uniforms,C=R.__cache;o.bindBuffer(35345,I);for(let O=0,H=P.length;O<H;O++){const E=P[O];if(M(E,O,C)===!0){const N=E.value,X=E.__offset;typeof N=="number"?(E.__data[0]=N,o.bufferSubData(35345,X,E.__data)):(E.value.isMatrix3?(E.__data[0]=E.value.elements[0],E.__data[1]=E.value.elements[1],E.__data[2]=E.value.elements[2],E.__data[3]=E.value.elements[0],E.__data[4]=E.value.elements[3],E.__data[5]=E.value.elements[4],E.__data[6]=E.value.elements[5],E.__data[7]=E.value.elements[0],E.__data[8]=E.value.elements[6],E.__data[9]=E.value.elements[7],E.__data[10]=E.value.elements[8],E.__data[11]=E.value.elements[0]):N.toArray(E.__data),o.bufferSubData(35345,X,E.__data))}}o.bindBuffer(35345,null)}function M(R,I,P){const C=R.value;if(P[I]===void 0)return typeof C=="number"?P[I]=C:P[I]=C.clone(),!0;if(typeof C=="number"){if(P[I]!==C)return P[I]=C,!0}else{const O=P[I];if(O.equals(C)===!1)return O.copy(C),!0}return!1}function b(R){const I=R.uniforms;let P=0;const C=16;let O=0;for(let H=0,E=I.length;H<E;H++){const N=I[H],X=x(N);if(N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=P,H>0){O=P%C;const ue=C-O;O!==0&&ue-X.boundary<0&&(P+=C-O,N.__offset=P)}P+=X.storage}return O=P%C,O>0&&(P+=C-O),R.__size=P,R.__cache={},this}function x(R){const I=R.value,P={boundary:0,storage:0};return typeof I=="number"?(P.boundary=4,P.storage=4):I.isVector2?(P.boundary=8,P.storage=8):I.isVector3||I.isColor?(P.boundary=16,P.storage=12):I.isVector4?(P.boundary=16,P.storage=16):I.isMatrix3?(P.boundary=48,P.storage=48):I.isMatrix4?(P.boundary=64,P.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),P}function p(R){const I=R.target;I.removeEventListener("dispose",p);const P=u.indexOf(I.__bindingPointIndex);u.splice(P,1),o.deleteBuffer(s[I.id]),delete s[I.id],delete l[I.id]}function w(){for(const R in s)o.deleteBuffer(s[R]);u=[],s={},l={}}return{bind:d,update:h,dispose:w}}function gT(){const o=io("canvas");return o.style.display="block",o}function kd(o={}){this.isWebGLRenderer=!0;const e=o.canvas!==void 0?o.canvas:gT(),t=o.context!==void 0?o.context:null,r=o.depth!==void 0?o.depth:!0,s=o.stencil!==void 0?o.stencil:!0,l=o.antialias!==void 0?o.antialias:!1,u=o.premultipliedAlpha!==void 0?o.premultipliedAlpha:!0,c=o.preserveDrawingBuffer!==void 0?o.preserveDrawingBuffer:!1,d=o.powerPreference!==void 0?o.powerPreference:"default",h=o.failIfMajorPerformanceCaveat!==void 0?o.failIfMajorPerformanceCaveat:!1;let m;t!==null?m=t.getContextAttributes().alpha:m=o.alpha!==void 0?o.alpha:!1;let g=null,_=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=xr,this.physicallyCorrectLights=!1,this.toneMapping=bi,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const x=this;let p=!1,w=0,R=0,I=null,P=-1,C=null;const O=new Xt,H=new Xt;let E=null,N=e.width,X=e.height,ue=1,ye=null,J=null;const k=new Xt(0,0,N,X),ae=new Xt(0,0,N,X);let he=!1;const le=new zd;let ee=!1,q=!1,Z=null;const ce=new Bt,pe=new gt,de=new G,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ue(){return I===null?ue:1}let se=t;function ct(A,V){for(let j=0;j<A.length;j++){const W=A[j],ne=e.getContext(W,V);if(ne!==null)return ne}return null}try{const A={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Mc}`),e.addEventListener("webglcontextlost",ke,!1),e.addEventListener("webglcontextrestored",rt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),se===null){const V=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&V.shift(),se=ct(V,A),se===null)throw ct(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}se.getShaderPrecisionFormat===void 0&&(se.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Fe,Be,Ee,at,Xe,Pe,ft,Nt,Vt,Dt,Pt,ht,Qt,Tt,L,T,te,fe,me,xe,ze,$,Re,we;function Le(){Fe=new Aw(se),Be=new Mw(se,Fe,o),Fe.init(Be),$=new cT(se,Fe,Be),Ee=new oT(se,Fe,Be),at=new Rw,Xe=new Y1,Pe=new lT(se,Fe,Ee,Xe,Be,$,at),ft=new yw(x),Nt=new Ew(x),Vt=new GS(se,Be),Re=new xw(se,Fe,Vt,Be),Dt=new Cw(se,Vt,at,Re),Pt=new Fw(se,Dt,Vt,at),me=new Iw(se,Be,Pe),T=new Sw(Xe),ht=new X1(x,ft,Nt,Fe,Be,Re,T),Qt=new pT(x,Xe),Tt=new $1,L=new tT(Fe,Be),fe=new _w(x,ft,Ee,Pt,m,u),te=new aT(x,Pt,Be),we=new mT(se,at,Be,Ee),xe=new vw(se,Fe,at,Be),ze=new Lw(se,Fe,at,Be),at.programs=ht.programs,x.capabilities=Be,x.extensions=Fe,x.properties=Xe,x.renderLists=Tt,x.shadowMap=te,x.state=Ee,x.info=at}Le();const Te=new dT(x,se);this.xr=Te,this.getContext=function(){return se},this.getContextAttributes=function(){return se.getContextAttributes()},this.forceContextLoss=function(){const A=Fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(A){A!==void 0&&(ue=A,this.setSize(N,X,!1))},this.getSize=function(A){return A.set(N,X)},this.setSize=function(A,V,j){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,X=V,e.width=Math.floor(A*ue),e.height=Math.floor(V*ue),j!==!1&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(N*ue,X*ue).floor()},this.setDrawingBufferSize=function(A,V,j){N=A,X=V,ue=j,e.width=Math.floor(A*j),e.height=Math.floor(V*j),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(O)},this.getViewport=function(A){return A.copy(k)},this.setViewport=function(A,V,j,W){A.isVector4?k.set(A.x,A.y,A.z,A.w):k.set(A,V,j,W),Ee.viewport(O.copy(k).multiplyScalar(ue).floor())},this.getScissor=function(A){return A.copy(ae)},this.setScissor=function(A,V,j,W){A.isVector4?ae.set(A.x,A.y,A.z,A.w):ae.set(A,V,j,W),Ee.scissor(H.copy(ae).multiplyScalar(ue).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(A){Ee.setScissorTest(he=A)},this.setOpaqueSort=function(A){ye=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor.apply(fe,arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha.apply(fe,arguments)},this.clear=function(A=!0,V=!0,j=!0){let W=0;A&&(W|=16384),V&&(W|=256),j&&(W|=1024),se.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ke,!1),e.removeEventListener("webglcontextrestored",rt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),Tt.dispose(),L.dispose(),Xe.dispose(),ft.dispose(),Nt.dispose(),Pt.dispose(),Re.dispose(),we.dispose(),ht.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",et),Te.removeEventListener("sessionend",It),Z&&(Z.dispose(),Z=null),bt.stop()};function ke(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const A=at.autoReset,V=te.enabled,j=te.autoUpdate,W=te.needsUpdate,ne=te.type;Le(),at.autoReset=A,te.enabled=V,te.autoUpdate=j,te.needsUpdate=W,te.type=ne}function _t(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function z(A){const V=A.target;V.removeEventListener("dispose",z),Se(V)}function Se(A){Q(A),Xe.remove(A)}function Q(A){const V=Xe.get(A).programs;V!==void 0&&(V.forEach(function(j){ht.releaseProgram(j)}),A.isShaderMaterial&&ht.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,j,W,ne,De){V===null&&(V=Ae);const We=ne.isMesh&&ne.matrixWorld.determinant()<0,Ye=mo(A,V,j,W,ne);Ee.setMaterial(W,We);let Ve=j.index;const ot=j.attributes.position;if(Ve===null){if(ot===void 0||ot.count===0)return}else if(Ve.count===0)return;let tt=1;W.wireframe===!0&&(Ve=Dt.getWireframeAttribute(j),tt=2),Re.setup(ne,W,Ye,j,Ve);let nt,St=xe;Ve!==null&&(nt=Vt.get(Ve),St=ze,St.setIndex(nt));const si=Ve!==null?Ve.count:ot.count,Vn=j.drawRange.start*tt,Ei=j.drawRange.count*tt,jt=De!==null?De.start*tt:0,st=De!==null?De.count*tt:1/0,Ai=Math.max(Vn,jt),Et=Math.min(si,Vn+Ei,jt+st)-1,en=Math.max(0,Et-Ai+1);if(en!==0){if(ne.isMesh)W.wireframe===!0?(Ee.setLineWidth(W.wireframeLinewidth*Ue()),St.setMode(1)):St.setMode(4);else if(ne.isLine){let Hn=W.linewidth;Hn===void 0&&(Hn=1),Ee.setLineWidth(Hn*Ue()),ne.isLineSegments?St.setMode(1):ne.isLineLoop?St.setMode(2):St.setMode(3)}else ne.isPoints?St.setMode(0):ne.isSprite&&St.setMode(4);if(ne.isInstancedMesh)St.renderInstances(Ai,en,ne.count);else if(j.isInstancedBufferGeometry){const Hn=Math.min(j.instanceCount,j._maxInstanceCount);St.renderInstances(Ai,en,Hn)}else St.render(Ai,en)}},this.compile=function(A,V){function j(W,ne,De){W.transparent===!0&&W.side===qi?(W.side=Gn,W.needsUpdate=!0,Sr(W,ne,De),W.side=rs,W.needsUpdate=!0,Sr(W,ne,De),W.side=qi):Sr(W,ne,De)}_=L.get(A),_.init(),b.push(_),A.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(_.pushLight(W),W.castShadow&&_.pushShadow(W))}),_.setupLights(x.physicallyCorrectLights),A.traverse(function(W){const ne=W.material;if(ne)if(Array.isArray(ne))for(let De=0;De<ne.length;De++){const We=ne[De];j(We,A,W)}else j(ne,A,W)}),b.pop(),_=null};let Me=null;function ve(A){Me&&Me(A)}function et(){bt.stop()}function It(){bt.start()}const bt=new Bd;bt.setAnimationLoop(ve),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(A){Me=A,Te.setAnimationLoop(A),A===null?bt.stop():bt.start()},Te.addEventListener("sessionstart",et),Te.addEventListener("sessionend",It),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(V),V=Te.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,V,I),_=L.get(A,b.length),_.init(),b.push(_),ce.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),le.setFromProjectionMatrix(ce),q=this.localClippingEnabled,ee=T.init(this.clippingPlanes,q,V),g=Tt.get(A,M.length),g.init(),M.push(g),jn(A,V,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ye,J),ee===!0&&T.beginShadows();const j=_.state.shadowsArray;if(te.render(j,A,V),ee===!0&&T.endShadows(),this.info.autoReset===!0&&this.info.reset(),fe.render(g,A),_.setupLights(x.physicallyCorrectLights),V.isArrayCamera){const W=V.cameras;for(let ne=0,De=W.length;ne<De;ne++){const We=W[ne];Mt(g,A,We,We.viewport)}}else Mt(g,A,V);I!==null&&(Pe.updateMultisampleRenderTarget(I),Pe.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(x,A,V),Re.resetDefaultState(),P=-1,C=null,b.pop(),b.length>0?_=b[b.length-1]:_=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function jn(A,V,j,W){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||le.intersectsSprite(A)){W&&de.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ce);const We=Pt.update(A),Ye=A.material;Ye.visible&&g.push(A,We,Ye,j,de.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==at.render.frame&&(A.skeleton.update(),A.skeleton.frame=at.render.frame),!A.frustumCulled||le.intersectsObject(A))){W&&de.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ce);const We=Pt.update(A),Ye=A.material;if(Array.isArray(Ye)){const Ve=We.groups;for(let ot=0,tt=Ve.length;ot<tt;ot++){const nt=Ve[ot],St=Ye[nt.materialIndex];St&&St.visible&&g.push(A,We,St,j,de.z,nt)}}else Ye.visible&&g.push(A,We,Ye,j,de.z,null)}}const De=A.children;for(let We=0,Ye=De.length;We<Ye;We++)jn(De[We],V,j,W)}function Mt(A,V,j,W){const ne=A.opaque,De=A.transmissive,We=A.transparent;_.setupLightsView(j),De.length>0&&En(ne,V,j),W&&Ee.viewport(O.copy(W)),ne.length>0&&ln(ne,V,j),De.length>0&&ln(De,V,j),We.length>0&&ln(We,V,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function En(A,V,j){const W=Be.isWebGL2;Z===null&&(Z=new vr(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")?Os:_r,minFilter:ao,samples:W&&l===!0?4:0})),x.getDrawingBufferSize(pe),W?Z.setSize(pe.x,pe.y):Z.setSize(mc(pe.x),mc(pe.y));const ne=x.getRenderTarget();x.setRenderTarget(Z),x.clear();const De=x.toneMapping;x.toneMapping=bi,ln(A,V,j),x.toneMapping=De,Pe.updateMultisampleRenderTarget(Z),Pe.updateRenderTargetMipmap(Z),x.setRenderTarget(ne)}function ln(A,V,j){const W=V.isScene===!0?V.overrideMaterial:null;for(let ne=0,De=A.length;ne<De;ne++){const We=A[ne],Ye=We.object,Ve=We.geometry,ot=W===null?We.material:W,tt=We.group;Ye.layers.test(j.layers)&&po(Ye,V,j,Ve,ot,tt)}}function po(A,V,j,W,ne,De){A.onBeforeRender(x,V,j,W,ne,De),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(x,V,j,W,A,De),ne.transparent===!0&&ne.side===qi?(ne.side=Gn,ne.needsUpdate=!0,x.renderBufferDirect(j,V,W,ne,A,De),ne.side=rs,ne.needsUpdate=!0,x.renderBufferDirect(j,V,W,ne,A,De),ne.side=qi):x.renderBufferDirect(j,V,W,ne,A,De),A.onAfterRender(x,V,j,W,ne,De)}function Sr(A,V,j){V.isScene!==!0&&(V=Ae);const W=Xe.get(A),ne=_.state.lights,De=_.state.shadowsArray,We=ne.state.version,Ye=ht.getParameters(A,ne.state,De,V,j),Ve=ht.getProgramCacheKey(Ye);let ot=W.programs;W.environment=A.isMeshStandardMaterial?V.environment:null,W.fog=V.fog,W.envMap=(A.isMeshStandardMaterial?Nt:ft).get(A.envMap||W.environment),ot===void 0&&(A.addEventListener("dispose",z),ot=new Map,W.programs=ot);let tt=ot.get(Ve);if(tt!==void 0){if(W.currentProgram===tt&&W.lightsStateVersion===We)return yr(A,Ye),tt}else Ye.uniforms=ht.getUniforms(A),A.onBuild(j,Ye,x),A.onBeforeCompile(Ye,x),tt=ht.acquireProgram(Ye,Ve),ot.set(Ve,tt),W.uniforms=Ye.uniforms;const nt=W.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(nt.clippingPlanes=T.uniform),yr(A,Ye),W.needsLights=go(A),W.lightsStateVersion=We,W.needsLights&&(nt.ambientLightColor.value=ne.state.ambient,nt.lightProbe.value=ne.state.probe,nt.directionalLights.value=ne.state.directional,nt.directionalLightShadows.value=ne.state.directionalShadow,nt.spotLights.value=ne.state.spot,nt.spotLightShadows.value=ne.state.spotShadow,nt.rectAreaLights.value=ne.state.rectArea,nt.ltc_1.value=ne.state.rectAreaLTC1,nt.ltc_2.value=ne.state.rectAreaLTC2,nt.pointLights.value=ne.state.point,nt.pointLightShadows.value=ne.state.pointShadow,nt.hemisphereLights.value=ne.state.hemi,nt.directionalShadowMap.value=ne.state.directionalShadowMap,nt.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,nt.spotShadowMap.value=ne.state.spotShadowMap,nt.spotLightMatrix.value=ne.state.spotLightMatrix,nt.spotLightMap.value=ne.state.spotLightMap,nt.pointShadowMap.value=ne.state.pointShadowMap,nt.pointShadowMatrix.value=ne.state.pointShadowMatrix);const St=tt.getUniforms(),si=no.seqWithValue(St.seq,nt);return W.currentProgram=tt,W.uniformsList=si,tt}function yr(A,V){const j=Xe.get(A);j.outputEncoding=V.outputEncoding,j.instancing=V.instancing,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function mo(A,V,j,W,ne){V.isScene!==!0&&(V=Ae),Pe.resetTextureUnits();const De=V.fog,We=W.isMeshStandardMaterial?V.environment:null,Ye=I===null?x.outputEncoding:I.isXRRenderTarget===!0?I.texture.encoding:xr,Ve=(W.isMeshStandardMaterial?Nt:ft).get(W.envMap||We),ot=W.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,tt=!!W.normalMap&&!!j.attributes.tangent,nt=!!j.morphAttributes.position,St=!!j.morphAttributes.normal,si=!!j.morphAttributes.color,Vn=W.toneMapped?x.toneMapping:bi,Ei=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,jt=Ei!==void 0?Ei.length:0,st=Xe.get(W),Ai=_.state.lights;if(ee===!0&&(q===!0||A!==C)){const Yt=A===C&&W.id===P;T.setState(W,A,Yt)}let Et=!1;W.version===st.__version?(st.needsLights&&st.lightsStateVersion!==Ai.state.version||st.outputEncoding!==Ye||ne.isInstancedMesh&&st.instancing===!1||!ne.isInstancedMesh&&st.instancing===!0||ne.isSkinnedMesh&&st.skinning===!1||!ne.isSkinnedMesh&&st.skinning===!0||st.envMap!==Ve||W.fog===!0&&st.fog!==De||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==T.numPlanes||st.numIntersection!==T.numIntersection)||st.vertexAlphas!==ot||st.vertexTangents!==tt||st.morphTargets!==nt||st.morphNormals!==St||st.morphColors!==si||st.toneMapping!==Vn||Be.isWebGL2===!0&&st.morphTargetsCount!==jt)&&(Et=!0):(Et=!0,st.__version=W.version);let en=st.currentProgram;Et===!0&&(en=Sr(W,V,ne));let Hn=!1,Ci=!1,ds=!1;const Ht=en.getUniforms(),ai=st.uniforms;if(Ee.useProgram(en.program)&&(Hn=!0,Ci=!0,ds=!0),W.id!==P&&(P=W.id,Ci=!0),Hn||C!==A){if(Ht.setValue(se,"projectionMatrix",A.projectionMatrix),Be.logarithmicDepthBuffer&&Ht.setValue(se,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),C!==A&&(C=A,Ci=!0,ds=!0),W.isShaderMaterial||W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshStandardMaterial||W.envMap){const Yt=Ht.map.cameraPosition;Yt!==void 0&&Yt.setValue(se,de.setFromMatrixPosition(A.matrixWorld))}(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ht.setValue(se,"isOrthographic",A.isOrthographicCamera===!0),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial||W.isShadowMaterial||ne.isSkinnedMesh)&&Ht.setValue(se,"viewMatrix",A.matrixWorldInverse)}if(ne.isSkinnedMesh){Ht.setOptional(se,ne,"bindMatrix"),Ht.setOptional(se,ne,"bindMatrixInverse");const Yt=ne.skeleton;Yt&&(Be.floatVertexTextures?(Yt.boneTexture===null&&Yt.computeBoneTexture(),Ht.setValue(se,"boneTexture",Yt.boneTexture,Pe),Ht.setValue(se,"boneTextureSize",Yt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ps=j.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0&&Be.isWebGL2===!0)&&me.update(ne,j,W,en),(Ci||st.receiveShadow!==ne.receiveShadow)&&(st.receiveShadow=ne.receiveShadow,Ht.setValue(se,"receiveShadow",ne.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(ai.envMap.value=Ve,ai.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Ci&&(Ht.setValue(se,"toneMappingExposure",x.toneMappingExposure),st.needsLights&&hs(ai,ds),De&&W.fog===!0&&Qt.refreshFogUniforms(ai,De),Qt.refreshMaterialUniforms(ai,W,ue,X,Z),no.upload(se,st.uniformsList,ai,Pe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(no.upload(se,st.uniformsList,ai,Pe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ht.setValue(se,"center",ne.center),Ht.setValue(se,"modelViewMatrix",ne.modelViewMatrix),Ht.setValue(se,"normalMatrix",ne.normalMatrix),Ht.setValue(se,"modelMatrix",ne.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Yt=W.uniformsGroups;for(let br=0,Hs=Yt.length;br<Hs;br++)if(Be.isWebGL2){const wr=Yt[br];we.update(wr,en),we.bind(wr,en)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return en}function hs(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function go(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,V,j){Xe.get(A.texture).__webglTexture=V,Xe.get(A.depthTexture).__webglTexture=j;const W=Xe.get(A);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=j===void 0,W.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,V){const j=Xe.get(A);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,j=0){I=A,w=V,R=j;let W=!0;if(A){const Ve=Xe.get(A);Ve.__useDefaultFramebuffer!==void 0?(Ee.bindFramebuffer(36160,null),W=!1):Ve.__webglFramebuffer===void 0?Pe.setupRenderTarget(A):Ve.__hasExternalTextures&&Pe.rebindTextures(A,Xe.get(A.texture).__webglTexture,Xe.get(A.depthTexture).__webglTexture)}let ne=null,De=!1,We=!1;if(A){const Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture)&&(We=!0);const ot=Xe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(ne=ot[V],De=!0):Be.isWebGL2&&A.samples>0&&Pe.useMultisampledRTT(A)===!1?ne=Xe.get(A).__webglMultisampledFramebuffer:ne=ot,O.copy(A.viewport),H.copy(A.scissor),E=A.scissorTest}else O.copy(k).multiplyScalar(ue).floor(),H.copy(ae).multiplyScalar(ue).floor(),E=he;if(Ee.bindFramebuffer(36160,ne)&&Be.drawBuffers&&W&&Ee.drawBuffers(A,ne),Ee.viewport(O),Ee.scissor(H),Ee.setScissorTest(E),De){const Ve=Xe.get(A.texture);se.framebufferTexture2D(36160,36064,34069+V,Ve.__webglTexture,j)}else if(We){const Ve=Xe.get(A.texture),ot=V||0;se.framebufferTextureLayer(36160,36064,Ve.__webglTexture,j||0,ot)}P=-1},this.readRenderTargetPixels=function(A,V,j,W,ne,De,We){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=Xe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&We!==void 0&&(Ye=Ye[We]),Ye){Ee.bindFramebuffer(36160,Ye);try{const Ve=A.texture,ot=Ve.format,tt=Ve.type;if(ot!==ri&&$.convert(ot)!==se.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const nt=tt===Os&&(Fe.has("EXT_color_buffer_half_float")||Be.isWebGL2&&Fe.has("EXT_color_buffer_float"));if(tt!==_r&&$.convert(tt)!==se.getParameter(35738)&&!(tt===hr&&(Be.isWebGL2||Fe.has("OES_texture_float")||Fe.has("WEBGL_color_buffer_float")))&&!nt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-W&&j>=0&&j<=A.height-ne&&se.readPixels(V,j,W,ne,$.convert(ot),$.convert(tt),De)}finally{const Ve=I!==null?Xe.get(I).__webglFramebuffer:null;Ee.bindFramebuffer(36160,Ve)}}},this.copyFramebufferToTexture=function(A,V,j=0){const W=Math.pow(2,-j),ne=Math.floor(V.image.width*W),De=Math.floor(V.image.height*W);Pe.setTexture2D(V,0),se.copyTexSubImage2D(3553,j,0,0,A.x,A.y,ne,De),Ee.unbindTexture()},this.copyTextureToTexture=function(A,V,j,W=0){const ne=V.image.width,De=V.image.height,We=$.convert(j.format),Ye=$.convert(j.type);Pe.setTexture2D(j,0),se.pixelStorei(37440,j.flipY),se.pixelStorei(37441,j.premultiplyAlpha),se.pixelStorei(3317,j.unpackAlignment),V.isDataTexture?se.texSubImage2D(3553,W,A.x,A.y,ne,De,We,Ye,V.image.data):V.isCompressedTexture?se.compressedTexSubImage2D(3553,W,A.x,A.y,V.mipmaps[0].width,V.mipmaps[0].height,We,V.mipmaps[0].data):se.texSubImage2D(3553,W,A.x,A.y,We,Ye,V.image),W===0&&j.generateMipmaps&&se.generateMipmap(3553),Ee.unbindTexture()},this.copyTextureToTexture3D=function(A,V,j,W,ne=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=A.max.x-A.min.x+1,We=A.max.y-A.min.y+1,Ye=A.max.z-A.min.z+1,Ve=$.convert(W.format),ot=$.convert(W.type);let tt;if(W.isData3DTexture)Pe.setTexture3D(W,0),tt=32879;else if(W.isDataArrayTexture)Pe.setTexture2DArray(W,0),tt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}se.pixelStorei(37440,W.flipY),se.pixelStorei(37441,W.premultiplyAlpha),se.pixelStorei(3317,W.unpackAlignment);const nt=se.getParameter(3314),St=se.getParameter(32878),si=se.getParameter(3316),Vn=se.getParameter(3315),Ei=se.getParameter(32877),jt=j.isCompressedTexture?j.mipmaps[0]:j.image;se.pixelStorei(3314,jt.width),se.pixelStorei(32878,jt.height),se.pixelStorei(3316,A.min.x),se.pixelStorei(3315,A.min.y),se.pixelStorei(32877,A.min.z),j.isDataTexture||j.isData3DTexture?se.texSubImage3D(tt,ne,V.x,V.y,V.z,De,We,Ye,Ve,ot,jt.data):j.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),se.compressedTexSubImage3D(tt,ne,V.x,V.y,V.z,De,We,Ye,Ve,jt.data)):se.texSubImage3D(tt,ne,V.x,V.y,V.z,De,We,Ye,Ve,ot,jt),se.pixelStorei(3314,nt),se.pixelStorei(32878,St),se.pixelStorei(3316,si),se.pixelStorei(3315,Vn),se.pixelStorei(32877,Ei),ne===0&&W.generateMipmaps&&se.generateMipmap(tt),Ee.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?Pe.setTextureCube(A,0):A.isData3DTexture?Pe.setTexture3D(A,0):A.isDataArrayTexture?Pe.setTexture2DArray(A,0):Pe.setTexture2D(A,0),Ee.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,Ee.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class _T extends kd{}_T.prototype.isWebGL1Renderer=!0;class xT extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class co extends us{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new vt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const id=new G,rd=new G,sd=new Bt,rc=new Sc,Qa=new Gs;class qd extends sn{constructor(e=new mn,t=new co){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let s=1,l=t.count;s<l;s++)id.fromBufferAttribute(t,s-1),rd.fromBufferAttribute(t,s),r[s]=r[s-1],r[s]+=id.distanceTo(rd);e.setAttribute("lineDistance",new wi(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Qa.copy(r.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=l,e.ray.intersectsSphere(Qa)===!1)return;sd.copy(s).invert(),rc.copy(e.ray).applyMatrix4(sd);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,h=new G,m=new G,g=new G,_=new G,M=this.isLineSegments?2:1,b=r.index,p=r.attributes.position;if(b!==null){const w=Math.max(0,u.start),R=Math.min(b.count,u.start+u.count);for(let I=w,P=R-1;I<P;I+=M){const C=b.getX(I),O=b.getX(I+1);if(h.fromBufferAttribute(p,C),m.fromBufferAttribute(p,O),rc.distanceSqToSegment(h,m,_,g)>d)continue;_.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(_);E<e.near||E>e.far||t.push({distance:E,point:g.clone().applyMatrix4(this.matrixWorld),index:I,face:null,faceIndex:null,object:this})}}else{const w=Math.max(0,u.start),R=Math.min(p.count,u.start+u.count);for(let I=w,P=R-1;I<P;I+=M){if(h.fromBufferAttribute(p,I),m.fromBufferAttribute(p,I+1),rc.distanceSqToSegment(h,m,_,g)>d)continue;_.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(_);O<e.near||O>e.far||t.push({distance:O,point:g.clone().applyMatrix4(this.matrixWorld),index:I,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}const ad=new G,od=new G;class Xd extends qd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let s=0,l=t.count;s<l;s+=2)ad.fromBufferAttribute(t,s),od.fromBufferAttribute(t,s+1),r[s]=s===0?0:r[s-1],r[s+1]=r[s]+ad.distanceTo(od);e.setAttribute("lineDistance",new wi(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wc extends us{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ld=new Bt,_c=new Sc,ja=new Gs,eo=new G;class Yd extends sn{constructor(e=new mn,t=new wc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),ja.copy(r.boundingSphere),ja.applyMatrix4(s),ja.radius+=l,e.ray.intersectsSphere(ja)===!1)return;ld.copy(s).invert(),_c.copy(e.ray).applyMatrix4(ld);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,h=r.index,g=r.attributes.position;if(h!==null){const _=Math.max(0,u.start),M=Math.min(h.count,u.start+u.count);for(let b=_,x=M;b<x;b++){const p=h.getX(b);eo.fromBufferAttribute(g,p),cd(eo,p,d,s,e,t,this)}}else{const _=Math.max(0,u.start),M=Math.min(g.count,u.start+u.count);for(let b=_,x=M;b<x;b++)eo.fromBufferAttribute(g,b),cd(eo,b,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}function cd(o,e,t,r,s,l,u){const c=_c.distanceSqToPoint(o);if(c<t){const d=new G;_c.closestPointToPoint(o,d),d.applyMatrix4(r);const h=s.ray.origin.distanceTo(d);if(h<s.near||h>s.far)return;l.push({distance:h,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,object:u})}}class Zd extends Wn{constructor(e,t,r,s,l,u,c,d,h){super(e,t,r,s,l,u,c,d,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mc);const vT=45,MT=1,ST=5e3,yT=7;class bT{constructor(e,t,r){Ge(this,"scene");Ge(this,"canvas");Ge(this,"renderer");Ge(this,"camera");this.renderer=new kd({antialias:!0,alpha:!0,canvas:r}),this.renderer.setSize(e,t),this.canvas=this.renderer.domElement,this.scene=new xT,this.camera=new Un(vT,e/t,MT,ST),this.camera.position.z=40*yT,this.camera.position.x=50}render(){this.renderer.render(this.scene,this.camera)}resize(e,t){this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}}const wT=new co({blending:gr,transparent:!0,color:3185663,opacity:.4}),TT=o=>{const e=new Bn;return Zi.exports.times(o.length,t=>{if(t%2)return;const r=o[t],s=o[t+1];if(!r||!s)throw new Error("Odd plane vectors");const l=new G(...r),u=new G(...s),c=new mn;c.setFromPoints([l,u]);const d=new qd(c,wT);d.computeLineDistances(),e.add(d)}),e},$d=o=>TT([[-o,0,0],[o,0,0],[0,-o,0],[0,o,0],[o,-o,0],[o,o,0],[-o,-o,0],[-o,o,0],[-o,-o,0],[o,-o,0],[-o,o,0],[o,o,0]]),ET=new G(1,0,0);class AT{constructor({dimensions:e,radius:t,x:r,y:s,z:l,spaceView:u}){Ge(this,"group");Ge(this,"view");Ge(this,"dimensions");this.dimensions=e,this.view=u,this.group=new Bn,this.group.add($d(t)),this.group.add(this.view.group),this.group.position.set(r,s,l),this.group.rotateOnAxis(new G(0,0,1),-Math.PI/2)}rotate(e){this.dimensions<3||this.group.rotateOnAxis(ET,e/2)}}const CT=new G(0,0,1);class LT{constructor({dimensions:e,radius:t,x:r,y:s,z:l,timeView:u}){Ge(this,"group");Ge(this,"view");Ge(this,"dimensions");this.dimensions=e,this.view=u,this.group=new Bn,this.group.add($d(t)),this.group.add(this.view.group),this.group.position.set(r,s,l),this.group.rotateOnAxis(new G(0,0,1),-Math.PI/2),this.group.rotateOnAxis(new G(1,0,0),Math.PI/2)}rotate(e){this.dimensions<2||this.group.rotateOnAxis(CT,e)}}class RT{constructor({dimensions:e,radius:t,x:r,y:s,z:l,spaceView:u,timeView:c}){Ge(this,"group");Ge(this,"spaceCell");Ge(this,"timeCell");this.spaceCell=new AT({dimensions:e,radius:t,x:-110,y:0,z:0,spaceView:u,timeView:c}),this.timeCell=new LT({dimensions:e,radius:t,x:-70,y:0,z:0,spaceView:u,timeView:c}),this.group=new Bn,this.group.position.set(r,s,l),this.group.add(this.spaceCell.group),this.group.add(this.timeCell.group)}update(e){this.spaceCell.view.update(e),this.timeCell.view.update(e)}rotate(e){this.spaceCell.rotate(e),this.timeCell.rotate(e)}}class uo{}const DT=1e3,PT=4,IT=(()=>{const s=document.createElement("canvas");s.width=256,s.height=256;const l=s.getContext("2d");if(!l)throw new Error("Failed to get 2d canvas context");return l.beginPath(),l.arc(128,128,124,0,2*Math.PI),l.fillStyle="rgba(255, 255, 255, 1)",l.fill(),new Zd(s)})();class fo{constructor(){Ge(this,"positions");Ge(this,"posAttr");Ge(this,"geometry");Ge(this,"pointCloud");this.positions=new Float32Array(DT*3),this.posAttr=new pn(this.positions,3),this.posAttr.setUsage(oo),this.geometry=new mn,this.geometry.setAttribute("position",this.posAttr),this.geometry.setDrawRange(0,0),this.pointCloud=new Yd(this.geometry,new wc({blending:gr,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.9,map:IT,size:PT}))}update({particles:e}){e.forEach((t,r)=>{var s,l,u;this.positions[r*3+0]=(s=t.position[0])!=null?s:0,this.positions[r*3+1]=(l=t.position[1])!=null?l:0,this.positions[r*3+2]=(u=t.position[2])!=null?u:0}),this.geometry.setDrawRange(0,e.length),this.posAttr.needsUpdate=!0}clear(){this.geometry.setDrawRange(0,0)}getObject(){return this.pointCloud}}const FT=100,NT=FT*3;class OT{constructor(){Ge(this,"geometry");Ge(this,"lineSegments");Ge(this,"positions");Ge(this,"posAttr");this.positions=new Float32Array(NT),this.posAttr=new pn(this.positions,3),this.posAttr.setUsage(oo),this.geometry=new mn,this.geometry.setAttribute("position",this.posAttr),this.geometry.computeBoundingSphere(),this.geometry.setDrawRange(0,0),this.lineSegments=new Xd(this.geometry,new co({transparent:!0,color:16777215,opacity:.6,blending:gr,depthTest:!1}))}update({particles:e,neighborhood:t}){let r=0,s=0;e.forEach((u,c)=>{var d;(d=t[c])==null||d.forEach(h=>{var g,_,M,b,x,p;const m=e[h.index];!m||(this.positions[r++]=(g=u.position[0])!=null?g:0,this.positions[r++]=(_=u.position[1])!=null?_:0,this.positions[r++]=(M=u.position[2])!=null?M:0,this.positions[r++]=(b=m.position[0])!=null?b:0,this.positions[r++]=(x=m.position[1])!=null?x:0,this.positions[r++]=(p=m.position[2])!=null?p:0,s++)})}),this.posAttr.needsUpdate=!0;const l=s*2;this.geometry.setDrawRange(0,l)}getObject(){return this.lineSegments}}class UT extends uo{constructor(){super();Ge(this,"group");Ge(this,"dots");Ge(this,"lines");this.dots=new fo,this.lines=new OT,this.group=new Bn,this.group.add(this.dots.getObject()),this.group.add(this.lines.getObject())}update(t){this.dots.update(t),this.lines.update(t)}}class Kd{constructor(e){Ge(this,"queue",[]);Ge(this,"limit");this.limit=e}add(e){this.queue.unshift(e),this.queue.length>this.limit&&this.queue.pop()}values(){return this.queue}}const zT=100,Jd=80,BT=5,GT=zT*Jd*3;class WT{constructor(){Ge(this,"simulationQueue");Ge(this,"geometry");Ge(this,"lineSegments");Ge(this,"positions");Ge(this,"posAttr");this.simulationQueue=new Kd(Jd),this.positions=new Float32Array(GT),this.posAttr=new pn(this.positions,3),this.posAttr.setUsage(oo),this.geometry=new mn,this.geometry.setAttribute("position",this.posAttr),this.geometry.computeBoundingSphere(),this.geometry.setDrawRange(0,0),this.lineSegments=new Xd(this.geometry,new co({transparent:!0,color:16777215,opacity:.6,blending:gr,depthTest:!1}))}update(e){this.simulationQueue.values().forEach(l=>{l.particles.forEach(u=>{var d;const c=(d=u.position[2])!=null?d:0;u.position[2]=c-BT})}),this.simulationQueue.add(e);let t=0,r=0;this.simulationQueue.values().forEach(l=>{l.particles.forEach((u,c)=>{var d;(d=l.neighborhood[c])==null||d.forEach(h=>{var g,_,M,b,x,p;const m=l.particles[h.index];!m||(this.positions[t++]=(g=u.position[0])!=null?g:0,this.positions[t++]=(_=u.position[1])!=null?_:0,this.positions[t++]=(M=u.position[2])!=null?M:0,this.positions[t++]=(b=m.position[0])!=null?b:0,this.positions[t++]=(x=m.position[1])!=null?x:0,this.positions[t++]=(p=m.position[2])!=null?p:0,r++)})})}),this.posAttr.needsUpdate=!0;const s=r*2;this.geometry.setDrawRange(0,s)}getObject(){return this.lineSegments}}class VT extends uo{constructor(){super();Ge(this,"group");Ge(this,"dots");Ge(this,"timeLines");this.dots=new fo,this.timeLines=new WT,this.group=new Bn,this.group.add(this.dots.getObject()),this.group.add(this.timeLines.getObject())}update(t){this.dots.update(t),this.timeLines.update(t)}}const HT=o=>{for(let e=o.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1)),r=o[e];o[e]=o[t],o[t]=r}},kT=()=>Boolean(Math.round(Math.random())),qT=o=>new Array(o).fill(0),sc=(o,e=1)=>{let t=e*e;const r=qT(o).map(()=>{const s=Math.random()*Math.sqrt(t);return t-=s*s,kT()?s:-s});return HT(r),r},XT=({dimensions:o,position:e,velocity:t,acceleration:r})=>({dimensions:o,position:[...e],velocity:[...t],acceleration:[...r]}),YT=(o,e,t)=>Zi.exports.times(t,()=>Qd(o,e)),ZT=(o,e,t)=>t.map(r=>$T(o,e,r)),Qd=(o,e)=>({dimensions:o,position:sc(o,e/2),velocity:sc(o,.5),acceleration:sc(o,.5)}),$T=(o,e,t)=>{const r=Qd(o,e);return r.position=ac(r.position,t.position),r.velocity=ac(r.velocity,t.velocity),r.acceleration=ac(r.acceleration,t.acceleration),r},ac=(o,e)=>o.map((t,r)=>{const s=e[r];return s!==void 0?s:t}),jd=200,KT=jd*100,JT=1,QT=(()=>{const s=document.createElement("canvas");s.width=256,s.height=256;const l=s.getContext("2d");if(!l)throw new Error("Failed to get 2d canvas context");return l.beginPath(),l.arc(128,128,124,0,2*Math.PI),l.fillStyle="rgba(255, 255, 255, 1)",l.fill(),new Zd(s)})();class ep{constructor(){Ge(this,"trailLength",jd);Ge(this,"particleQueues",[]);Ge(this,"positions");Ge(this,"posAttr");Ge(this,"geometry");Ge(this,"pointCloud");this.positions=new Float32Array(KT*3),this.posAttr=new pn(this.positions,3),this.posAttr.setUsage(oo),this.geometry=new mn,this.geometry.setAttribute("position",this.posAttr),this.geometry.setDrawRange(0,0),this.pointCloud=new Yd(this.geometry,new wc({blending:gr,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.9,map:QT,size:JT}))}update({particles:e}){for(;this.particleQueues.length<e.length;)this.particleQueues.push(new Kd(this.trailLength));for(;this.particleQueues.length>e.length;)this.particleQueues.pop();this.particleQueues.forEach((r,s)=>{const l=e[s];if(!l)throw new Error("Unreachable");r.add(XT(l))});let t=0;this.particleQueues.forEach(r=>{r.values().forEach(s=>{var l,u,c;this.positions[t*3+0]=(l=s.position[0])!=null?l:0,this.positions[t*3+1]=(u=s.position[1])!=null?u:0,this.positions[t*3+2]=(c=s.position[2])!=null?c:0,t++})}),this.geometry.setDrawRange(0,t),this.posAttr.needsUpdate=!0}clear(){this.geometry.setDrawRange(0,0),this.particleQueues=[]}getObject(){return this.pointCloud}}class jT extends uo{constructor(){super();Ge(this,"group");Ge(this,"dots");Ge(this,"trails");this.dots=new fo,this.trails=new ep,this.group=new Bn,this.group.add(this.dots.getObject()),this.group.add(this.trails.getObject())}update(t){this.dots.update(t),this.trails.update(t)}}class eE extends ep{constructor(){super();Ge(this,"trailGap",1/4);this.trailLength=1200}update(t){this.particleQueues.forEach(r=>{r.values().forEach(s=>{var u;const l=(u=s.position[2])!=null?u:0;s.position[2]=l-this.trailGap})}),super.update(t)}}class tE extends uo{constructor(){super();Ge(this,"group");Ge(this,"dots");Ge(this,"timeTrails");this.dots=new fo,this.timeTrails=new eE,this.group=new Bn,this.group.add(this.dots.getObject()),this.group.add(this.timeTrails.getObject())}update(t){this.dots.update(t),this.timeTrails.update(t)}}function nE(){return new Worker("/0-4d/assets/SimulationWorker.c5503228.js")}const iE=()=>{const o={},e=window.location.hash;return e.startsWith("#")&&e.slice(1).split("&").forEach(s=>{const[l,u]=s.split("=");l&&u&&(o[l]=rE(u)?Number(u):u)}),o},rE=o=>{const e=Number(o);return!Number.isNaN(e)},tp=1440/1980,sE=1920*tp,aE=1080*tp,ro=14,oE=9,lE=.0125,cE=4,uE="orbiting",fE="centerScaling",hE="trailing",Ti=iE(),dE=Zi.exports.isNumber(Ti.spin)?Ti.spin:lE,pE=Zi.exports.isNumber(Ti.count)?Ti.count:oE,mE=Zi.exports.isNumber(Ti.d)?Ti.d:cE,ud=Ti.behavior,fd=Ti.bounding,hd=Ti.view,np=mE+1,gE=vM(fd)?fd:fE,_E=_M(ud)?ud:uE,xE=Md[_E],ip=yM(hd)?hd:hE,vE=ip==="trailing"?jT:UT,ME=ip==="trailing"?tE:VT,ho=document.createElement("canvas");ho.style.display="block";ho.style.margin="auto";document.body.appendChild(ho);const rp=new bT(sE,aE,ho),xc=[];for(let o=0;o<np;o++){const e=xc[o-1],t=e?ZT(o,ro,e):YT(o,ro,pE);xc.push(t)}const SE=xc.map(o=>{const e=xd(new nE);return e.init(o,{behavior:xE,bounding:gE,radius:ro}),e}),yE=Zi.exports.times(np,o=>{const e=new RT({dimensions:o,radius:ro,x:0,y:85-o*42,z:0,spaceView:new vE,timeView:new ME});return rp.scene.add(e.group),e}),sp=async()=>{requestAnimationFrame(()=>void sp()),rp.render();const o=await Promise.all(SE.map(e=>e.tick()));yE.forEach((e,t)=>{const r=o[t];if(!r)throw new Error("Unreachable");e.update(r),e.rotate(dE)})};sp();
