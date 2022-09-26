var Kv=Object.defineProperty;var Jv=(o,e,t)=>e in o?Kv(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var dt=(o,e,t)=>(Jv(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const ad=Symbol("Comlink.proxy"),Qv=Symbol("Comlink.endpoint"),jv=Symbol("Comlink.releaseProxy"),ic=Symbol("Comlink.thrown"),od=o=>typeof o=="object"&&o!==null||typeof o=="function",eM={canHandle:o=>od(o)&&o[ad],serialize(o){const{port1:e,port2:t}=new MessageChannel;return cd(o,e),[t,[t]]},deserialize(o){return o.start(),fd(o)}},tM={canHandle:o=>od(o)&&ic in o,serialize({value:o}){let e;return o instanceof Error?e={isError:!0,value:{message:o.message,name:o.name,stack:o.stack}}:e={isError:!1,value:o},[e,[]]},deserialize(o){throw o.isError?Object.assign(new Error(o.value.message),o.value):o.value}},ld=new Map([["proxy",eM],["throw",tM]]);function cd(o,e=self){e.addEventListener("message",function t(r){if(!r||!r.data)return;const{id:s,type:l,path:u}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(cr);let d;try{const h=u.slice(0,-1).reduce((g,_)=>g[_],o),m=u.reduce((g,_)=>g[_],o);switch(l){case"GET":d=m;break;case"SET":h[u.slice(-1)[0]]=cr(r.data.value),d=!0;break;case"APPLY":d=m.apply(h,c);break;case"CONSTRUCT":{const g=new m(...c);d=sM(g)}break;case"ENDPOINT":{const{port1:g,port2:_}=new MessageChannel;cd(o,_),d=rM(g,[g])}break;case"RELEASE":d=void 0;break;default:return}}catch(h){d={value:h,[ic]:0}}Promise.resolve(d).catch(h=>({value:h,[ic]:0})).then(h=>{const[m,g]=mc(h);e.postMessage(Object.assign(Object.assign({},m),{id:s}),g),l==="RELEASE"&&(e.removeEventListener("message",t),ud(e))})}),e.start&&e.start()}function nM(o){return o.constructor.name==="MessagePort"}function ud(o){nM(o)&&o.close()}function fd(o,e){return rc(o,[],e)}function Ra(o){if(o)throw new Error("Proxy has been released and is not useable")}function rc(o,e=[],t=function(){}){let r=!1;const s=new Proxy(t,{get(l,u){if(Ra(r),u===jv)return()=>zr(o,{type:"RELEASE",path:e.map(c=>c.toString())}).then(()=>{ud(o),r=!0});if(u==="then"){if(e.length===0)return{then:()=>s};const c=zr(o,{type:"GET",path:e.map(d=>d.toString())}).then(cr);return c.then.bind(c)}return rc(o,[...e,u])},set(l,u,c){Ra(r);const[d,h]=mc(c);return zr(o,{type:"SET",path:[...e,u].map(m=>m.toString()),value:d},h).then(cr)},apply(l,u,c){Ra(r);const d=e[e.length-1];if(d===Qv)return zr(o,{type:"ENDPOINT"}).then(cr);if(d==="bind")return rc(o,e.slice(0,-1));const[h,m]=Wf(c);return zr(o,{type:"APPLY",path:e.map(g=>g.toString()),argumentList:h},m).then(cr)},construct(l,u){Ra(r);const[c,d]=Wf(u);return zr(o,{type:"CONSTRUCT",path:e.map(h=>h.toString()),argumentList:c},d).then(cr)}});return s}function iM(o){return Array.prototype.concat.apply([],o)}function Wf(o){const e=o.map(mc);return[e.map(t=>t[0]),iM(e.map(t=>t[1]))]}const hd=new WeakMap;function rM(o,e){return hd.set(o,e),o}function sM(o){return Object.assign(o,{[ad]:!0})}function mc(o){for(const[e,t]of ld)if(t.canHandle(o)){const[r,s]=t.serialize(o);return[{type:"HANDLER",name:e,value:r},s]}return[{type:"RAW",value:o},hd.get(o)||[]]}function cr(o){switch(o.type){case"HANDLER":return ld.get(o.name).deserialize(o.value);case"RAW":return o.value}}function zr(o,e,t){return new Promise(r=>{const s=aM();o.addEventListener("message",function l(u){!u.data||!u.data.id||u.data.id!==s||(o.removeEventListener("message",l),r(u.data))}),o.start&&o.start(),o.postMessage(Object.assign({id:s},e),t)})}function aM(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Ls=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Yi={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */(function(o,e){(function(){var t,r="4.17.21",s=200,l="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",u="Expected a function",c="Invalid `variable` option passed into `_.template`",d="__lodash_hash_undefined__",h=500,m="__lodash_placeholder__",g=1,_=2,M=4,b=1,v=2,p=1,w=2,R=4,I=8,P=16,C=32,O=64,H=128,E=256,N=512,X=30,ue="...",ye=800,J=16,k=1,ae=2,he=3,le=1/0,ee=9007199254740991,q=17976931348623157e292,Z=0/0,ce=4294967295,pe=ce-1,de=ce>>>1,Ae=[["ary",H],["bind",p],["bindKey",w],["curry",I],["curryRight",P],["flip",N],["partial",C],["partialRight",O],["rearg",E]],Ue="[object Arguments]",se="[object Array]",lt="[object AsyncFunction]",Fe="[object Boolean]",Be="[object Date]",Ee="[object DOMException]",st="[object Error]",qe="[object Function]",Pe="[object GeneratorFunction]",ut="[object Map]",Nt="[object Number]",Vt="[object Null]",Dt="[object Object]",Pt="[object Promise]",ft="[object Proxy]",Qt="[object RegExp]",Tt="[object Set]",L="[object String]",T="[object Symbol]",te="[object Undefined]",fe="[object WeakMap]",me="[object WeakSet]",xe="[object ArrayBuffer]",ze="[object DataView]",$="[object Float32Array]",Re="[object Float64Array]",we="[object Int8Array]",Le="[object Int16Array]",Te="[object Int32Array]",He="[object Uint8Array]",it="[object Uint8ClampedArray]",_t="[object Uint16Array]",z="[object Uint32Array]",Se=/\b__p \+= '';/g,Q=/\b(__p \+=) '' \+/g,Me=/(__e\(.*?\)|\b__t\)) \+\n'';/g,ve=/&(?:amp|lt|gt|quot|#39);/g,je=/[&<>"']/g,It=RegExp(ve.source),bt=RegExp(je.source),Qn=/<%-([\s\S]+?)%>/g,Mt=/<%([\s\S]+?)%>/g,wn=/<%=([\s\S]+?)%>/g,ln=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,co=/^\w*$/,Mr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Sr=/[\\^$.*+?()[\]{}|]/g,uo=RegExp(Sr.source),fs=/^\s+/,fo=/\s/,A=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,V=/\{\n\/\* \[wrapped with (.+)\] \*/,j=/,? & /,G=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ne=/[()=,{}\[\]\/\s]/,De=/\\(\\)?/g,Ge=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Xe=/\w*$/,We=/^[-+]0x[0-9a-f]+$/i,at=/^0b[01]+$/i,et=/^\[object .+?Constructor\]$/,tt=/^0o[0-7]+$/i,St=/^(?:0|[1-9]\d*)$/,ri=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Wn=/($^)/,bi=/['\n\r\u2028\u2029\\]/g,jt="\\ud800-\\udfff",rt="\\u0300-\\u036f",wi="\\ufe20-\\ufe2f",Et="\\u20d0-\\u20ff",en=rt+wi+Et,Vn="\\u2700-\\u27bf",Ti="a-z\\xdf-\\xf6\\xf8-\\xff",hs="\\xac\\xb1\\xd7\\xf7",Ht="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",si="\\u2000-\\u206f",ds=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Yt="A-Z\\xc0-\\xd6\\xd8-\\xde",yr="\\ufe0e\\ufe0f",Hs=hs+Ht+si+ds,br="['\u2019]",Kd="["+jt+"]",Sc="["+Hs+"]",ks="["+en+"]",yc="\\d+",Jd="["+Vn+"]",bc="["+Ti+"]",wc="[^"+jt+Hs+yc+Vn+Ti+Yt+"]",ho="\\ud83c[\\udffb-\\udfff]",Qd="(?:"+ks+"|"+ho+")",Tc="[^"+jt+"]",po="(?:\\ud83c[\\udde6-\\uddff]){2}",mo="[\\ud800-\\udbff][\\udc00-\\udfff]",wr="["+Yt+"]",Ec="\\u200d",Ac="(?:"+bc+"|"+wc+")",jd="(?:"+wr+"|"+wc+")",Cc="(?:"+br+"(?:d|ll|m|re|s|t|ve))?",Lc="(?:"+br+"(?:D|LL|M|RE|S|T|VE))?",Rc=Qd+"?",Dc="["+yr+"]?",ep="(?:"+Ec+"(?:"+[Tc,po,mo].join("|")+")"+Dc+Rc+")*",tp="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",np="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Pc=Dc+Rc+ep,ip="(?:"+[Jd,po,mo].join("|")+")"+Pc,rp="(?:"+[Tc+ks+"?",ks,po,mo,Kd].join("|")+")",sp=RegExp(br,"g"),ap=RegExp(ks,"g"),go=RegExp(ho+"(?="+ho+")|"+rp+Pc,"g"),op=RegExp([wr+"?"+bc+"+"+Cc+"(?="+[Sc,wr,"$"].join("|")+")",jd+"+"+Lc+"(?="+[Sc,wr+Ac,"$"].join("|")+")",wr+"?"+Ac+"+"+Cc,wr+"+"+Lc,np,tp,yc,ip].join("|"),"g"),lp=RegExp("["+Ec+jt+en+yr+"]"),cp=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,up=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],fp=-1,xt={};xt[$]=xt[Re]=xt[we]=xt[Le]=xt[Te]=xt[He]=xt[it]=xt[_t]=xt[z]=!0,xt[Ue]=xt[se]=xt[xe]=xt[Fe]=xt[ze]=xt[Be]=xt[st]=xt[qe]=xt[ut]=xt[Nt]=xt[Dt]=xt[Qt]=xt[Tt]=xt[L]=xt[fe]=!1;var mt={};mt[Ue]=mt[se]=mt[xe]=mt[ze]=mt[Fe]=mt[Be]=mt[$]=mt[Re]=mt[we]=mt[Le]=mt[Te]=mt[ut]=mt[Nt]=mt[Dt]=mt[Qt]=mt[Tt]=mt[L]=mt[T]=mt[He]=mt[it]=mt[_t]=mt[z]=!0,mt[st]=mt[qe]=mt[fe]=!1;var hp={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},dp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pp={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},mp={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},gp=parseFloat,_p=parseInt,Ic=typeof Ls=="object"&&Ls&&Ls.Object===Object&&Ls,xp=typeof self=="object"&&self&&self.Object===Object&&self,kt=Ic||xp||Function("return this")(),_o=e&&!e.nodeType&&e,$i=_o&&!0&&o&&!o.nodeType&&o,Fc=$i&&$i.exports===_o,xo=Fc&&Ic.process,Tn=function(){try{var U=$i&&$i.require&&$i.require("util").types;return U||xo&&xo.binding&&xo.binding("util")}catch{}}(),Nc=Tn&&Tn.isArrayBuffer,Oc=Tn&&Tn.isDate,Uc=Tn&&Tn.isMap,zc=Tn&&Tn.isRegExp,Bc=Tn&&Tn.isSet,Gc=Tn&&Tn.isTypedArray;function pn(U,K,Y){switch(Y.length){case 0:return U.call(K);case 1:return U.call(K,Y[0]);case 2:return U.call(K,Y[0],Y[1]);case 3:return U.call(K,Y[0],Y[1],Y[2])}return U.apply(K,Y)}function vp(U,K,Y,be){for(var Ve=-1,ot=U==null?0:U.length;++Ve<ot;){var Ot=U[Ve];K(be,Ot,Y(Ot),U)}return be}function En(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be&&K(U[Y],Y,U)!==!1;);return U}function Mp(U,K){for(var Y=U==null?0:U.length;Y--&&K(U[Y],Y,U)!==!1;);return U}function Wc(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be;)if(!K(U[Y],Y,U))return!1;return!0}function Ei(U,K){for(var Y=-1,be=U==null?0:U.length,Ve=0,ot=[];++Y<be;){var Ot=U[Y];K(Ot,Y,U)&&(ot[Ve++]=Ot)}return ot}function qs(U,K){var Y=U==null?0:U.length;return!!Y&&Tr(U,K,0)>-1}function vo(U,K,Y){for(var be=-1,Ve=U==null?0:U.length;++be<Ve;)if(Y(K,U[be]))return!0;return!1}function yt(U,K){for(var Y=-1,be=U==null?0:U.length,Ve=Array(be);++Y<be;)Ve[Y]=K(U[Y],Y,U);return Ve}function Ai(U,K){for(var Y=-1,be=K.length,Ve=U.length;++Y<be;)U[Ve+Y]=K[Y];return U}function Mo(U,K,Y,be){var Ve=-1,ot=U==null?0:U.length;for(be&&ot&&(Y=U[++Ve]);++Ve<ot;)Y=K(Y,U[Ve],Ve,U);return Y}function Sp(U,K,Y,be){var Ve=U==null?0:U.length;for(be&&Ve&&(Y=U[--Ve]);Ve--;)Y=K(Y,U[Ve],Ve,U);return Y}function So(U,K){for(var Y=-1,be=U==null?0:U.length;++Y<be;)if(K(U[Y],Y,U))return!0;return!1}var yp=yo("length");function bp(U){return U.split("")}function wp(U){return U.match(G)||[]}function Vc(U,K,Y){var be;return Y(U,function(Ve,ot,Ot){if(K(Ve,ot,Ot))return be=ot,!1}),be}function Xs(U,K,Y,be){for(var Ve=U.length,ot=Y+(be?1:-1);be?ot--:++ot<Ve;)if(K(U[ot],ot,U))return ot;return-1}function Tr(U,K,Y){return K===K?Op(U,K,Y):Xs(U,Hc,Y)}function Tp(U,K,Y,be){for(var Ve=Y-1,ot=U.length;++Ve<ot;)if(be(U[Ve],K))return Ve;return-1}function Hc(U){return U!==U}function kc(U,K){var Y=U==null?0:U.length;return Y?wo(U,K)/Y:Z}function yo(U){return function(K){return K==null?t:K[U]}}function bo(U){return function(K){return U==null?t:U[K]}}function qc(U,K,Y,be,Ve){return Ve(U,function(ot,Ot,pt){Y=be?(be=!1,ot):K(Y,ot,Ot,pt)}),Y}function Ep(U,K){var Y=U.length;for(U.sort(K);Y--;)U[Y]=U[Y].value;return U}function wo(U,K){for(var Y,be=-1,Ve=U.length;++be<Ve;){var ot=K(U[be]);ot!==t&&(Y=Y===t?ot:Y+ot)}return Y}function To(U,K){for(var Y=-1,be=Array(U);++Y<U;)be[Y]=K(Y);return be}function Ap(U,K){return yt(K,function(Y){return[Y,U[Y]]})}function Xc(U){return U&&U.slice(0,Kc(U)+1).replace(fs,"")}function mn(U){return function(K){return U(K)}}function Eo(U,K){return yt(K,function(Y){return U[Y]})}function ps(U,K){return U.has(K)}function Yc(U,K){for(var Y=-1,be=U.length;++Y<be&&Tr(K,U[Y],0)>-1;);return Y}function Zc(U,K){for(var Y=U.length;Y--&&Tr(K,U[Y],0)>-1;);return Y}function Cp(U,K){for(var Y=U.length,be=0;Y--;)U[Y]===K&&++be;return be}var Lp=bo(hp),Rp=bo(dp);function Dp(U){return"\\"+mp[U]}function Pp(U,K){return U==null?t:U[K]}function Er(U){return lp.test(U)}function Ip(U){return cp.test(U)}function Fp(U){for(var K,Y=[];!(K=U.next()).done;)Y.push(K.value);return Y}function Ao(U){var K=-1,Y=Array(U.size);return U.forEach(function(be,Ve){Y[++K]=[Ve,be]}),Y}function $c(U,K){return function(Y){return U(K(Y))}}function Ci(U,K){for(var Y=-1,be=U.length,Ve=0,ot=[];++Y<be;){var Ot=U[Y];(Ot===K||Ot===m)&&(U[Y]=m,ot[Ve++]=Y)}return ot}function Ys(U){var K=-1,Y=Array(U.size);return U.forEach(function(be){Y[++K]=be}),Y}function Np(U){var K=-1,Y=Array(U.size);return U.forEach(function(be){Y[++K]=[be,be]}),Y}function Op(U,K,Y){for(var be=Y-1,Ve=U.length;++be<Ve;)if(U[be]===K)return be;return-1}function Up(U,K,Y){for(var be=Y+1;be--;)if(U[be]===K)return be;return be}function Ar(U){return Er(U)?Bp(U):yp(U)}function Hn(U){return Er(U)?Gp(U):bp(U)}function Kc(U){for(var K=U.length;K--&&fo.test(U.charAt(K)););return K}var zp=bo(pp);function Bp(U){for(var K=go.lastIndex=0;go.test(U);)++K;return K}function Gp(U){return U.match(go)||[]}function Wp(U){return U.match(op)||[]}var Vp=function U(K){K=K==null?kt:Cr.defaults(kt.Object(),K,Cr.pick(kt,up));var Y=K.Array,be=K.Date,Ve=K.Error,ot=K.Function,Ot=K.Math,pt=K.Object,Co=K.RegExp,Hp=K.String,An=K.TypeError,Zs=Y.prototype,kp=ot.prototype,Lr=pt.prototype,$s=K["__core-js_shared__"],Ks=kp.toString,ht=Lr.hasOwnProperty,qp=0,Jc=function(){var n=/[^.]+$/.exec($s&&$s.keys&&$s.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),Js=Lr.toString,Xp=Ks.call(pt),Yp=kt._,Zp=Co("^"+Ks.call(ht).replace(Sr,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Qs=Fc?K.Buffer:t,Li=K.Symbol,js=K.Uint8Array,Qc=Qs?Qs.allocUnsafe:t,ea=$c(pt.getPrototypeOf,pt),jc=pt.create,eu=Lr.propertyIsEnumerable,ta=Zs.splice,tu=Li?Li.isConcatSpreadable:t,ms=Li?Li.iterator:t,Ki=Li?Li.toStringTag:t,na=function(){try{var n=tr(pt,"defineProperty");return n({},"",{}),n}catch{}}(),$p=K.clearTimeout!==kt.clearTimeout&&K.clearTimeout,Kp=be&&be.now!==kt.Date.now&&be.now,Jp=K.setTimeout!==kt.setTimeout&&K.setTimeout,ia=Ot.ceil,ra=Ot.floor,Lo=pt.getOwnPropertySymbols,Qp=Qs?Qs.isBuffer:t,nu=K.isFinite,jp=Zs.join,em=$c(pt.keys,pt),Ut=Ot.max,Zt=Ot.min,tm=be.now,nm=K.parseInt,iu=Ot.random,im=Zs.reverse,Ro=tr(K,"DataView"),gs=tr(K,"Map"),Do=tr(K,"Promise"),Rr=tr(K,"Set"),_s=tr(K,"WeakMap"),xs=tr(pt,"create"),sa=_s&&new _s,Dr={},rm=nr(Ro),sm=nr(gs),am=nr(Do),om=nr(Rr),lm=nr(_s),aa=Li?Li.prototype:t,vs=aa?aa.valueOf:t,ru=aa?aa.toString:t;function S(n){if(At(n)&&!ke(n)&&!(n instanceof Qe)){if(n instanceof Cn)return n;if(ht.call(n,"__wrapped__"))return af(n)}return new Cn(n)}var Pr=function(){function n(){}return function(i){if(!wt(i))return{};if(jc)return jc(i);n.prototype=i;var a=new n;return n.prototype=t,a}}();function oa(){}function Cn(n,i){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!i,this.__index__=0,this.__values__=t}S.templateSettings={escape:Qn,evaluate:Mt,interpolate:wn,variable:"",imports:{_:S}},S.prototype=oa.prototype,S.prototype.constructor=S,Cn.prototype=Pr(oa.prototype),Cn.prototype.constructor=Cn;function Qe(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=ce,this.__views__=[]}function cm(){var n=new Qe(this.__wrapped__);return n.__actions__=cn(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=cn(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=cn(this.__views__),n}function um(){if(this.__filtered__){var n=new Qe(this);n.__dir__=-1,n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function fm(){var n=this.__wrapped__.value(),i=this.__dir__,a=ke(n),f=i<0,x=a?n.length:0,y=bg(0,x,this.__views__),D=y.start,F=y.end,B=F-D,ie=f?F:D-1,re=this.__iteratees__,oe=re.length,_e=0,Ce=Zt(B,this.__takeCount__);if(!a||!f&&x==B&&Ce==B)return Cu(n,this.__actions__);var Ne=[];e:for(;B--&&_e<Ce;){ie+=i;for(var Ze=-1,Oe=n[ie];++Ze<oe;){var Ke=re[Ze],nt=Ke.iteratee,xn=Ke.type,rn=nt(Oe);if(xn==ae)Oe=rn;else if(!rn){if(xn==k)continue e;break e}}Ne[_e++]=Oe}return Ne}Qe.prototype=Pr(oa.prototype),Qe.prototype.constructor=Qe;function Ji(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function hm(){this.__data__=xs?xs(null):{},this.size=0}function dm(n){var i=this.has(n)&&delete this.__data__[n];return this.size-=i?1:0,i}function pm(n){var i=this.__data__;if(xs){var a=i[n];return a===d?t:a}return ht.call(i,n)?i[n]:t}function mm(n){var i=this.__data__;return xs?i[n]!==t:ht.call(i,n)}function gm(n,i){var a=this.__data__;return this.size+=this.has(n)?0:1,a[n]=xs&&i===t?d:i,this}Ji.prototype.clear=hm,Ji.prototype.delete=dm,Ji.prototype.get=pm,Ji.prototype.has=mm,Ji.prototype.set=gm;function ai(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function _m(){this.__data__=[],this.size=0}function xm(n){var i=this.__data__,a=la(i,n);if(a<0)return!1;var f=i.length-1;return a==f?i.pop():ta.call(i,a,1),--this.size,!0}function vm(n){var i=this.__data__,a=la(i,n);return a<0?t:i[a][1]}function Mm(n){return la(this.__data__,n)>-1}function Sm(n,i){var a=this.__data__,f=la(a,n);return f<0?(++this.size,a.push([n,i])):a[f][1]=i,this}ai.prototype.clear=_m,ai.prototype.delete=xm,ai.prototype.get=vm,ai.prototype.has=Mm,ai.prototype.set=Sm;function oi(n){var i=-1,a=n==null?0:n.length;for(this.clear();++i<a;){var f=n[i];this.set(f[0],f[1])}}function ym(){this.size=0,this.__data__={hash:new Ji,map:new(gs||ai),string:new Ji}}function bm(n){var i=Ma(this,n).delete(n);return this.size-=i?1:0,i}function wm(n){return Ma(this,n).get(n)}function Tm(n){return Ma(this,n).has(n)}function Em(n,i){var a=Ma(this,n),f=a.size;return a.set(n,i),this.size+=a.size==f?0:1,this}oi.prototype.clear=ym,oi.prototype.delete=bm,oi.prototype.get=wm,oi.prototype.has=Tm,oi.prototype.set=Em;function Qi(n){var i=-1,a=n==null?0:n.length;for(this.__data__=new oi;++i<a;)this.add(n[i])}function Am(n){return this.__data__.set(n,d),this}function Cm(n){return this.__data__.has(n)}Qi.prototype.add=Qi.prototype.push=Am,Qi.prototype.has=Cm;function kn(n){var i=this.__data__=new ai(n);this.size=i.size}function Lm(){this.__data__=new ai,this.size=0}function Rm(n){var i=this.__data__,a=i.delete(n);return this.size=i.size,a}function Dm(n){return this.__data__.get(n)}function Pm(n){return this.__data__.has(n)}function Im(n,i){var a=this.__data__;if(a instanceof ai){var f=a.__data__;if(!gs||f.length<s-1)return f.push([n,i]),this.size=++a.size,this;a=this.__data__=new oi(f)}return a.set(n,i),this.size=a.size,this}kn.prototype.clear=Lm,kn.prototype.delete=Rm,kn.prototype.get=Dm,kn.prototype.has=Pm,kn.prototype.set=Im;function su(n,i){var a=ke(n),f=!a&&ir(n),x=!a&&!f&&Fi(n),y=!a&&!f&&!x&&Or(n),D=a||f||x||y,F=D?To(n.length,Hp):[],B=F.length;for(var ie in n)(i||ht.call(n,ie))&&!(D&&(ie=="length"||x&&(ie=="offset"||ie=="parent")||y&&(ie=="buffer"||ie=="byteLength"||ie=="byteOffset")||fi(ie,B)))&&F.push(ie);return F}function au(n){var i=n.length;return i?n[Vo(0,i-1)]:t}function Fm(n,i){return Sa(cn(n),ji(i,0,n.length))}function Nm(n){return Sa(cn(n))}function Po(n,i,a){(a!==t&&!qn(n[i],a)||a===t&&!(i in n))&&li(n,i,a)}function Ms(n,i,a){var f=n[i];(!(ht.call(n,i)&&qn(f,a))||a===t&&!(i in n))&&li(n,i,a)}function la(n,i){for(var a=n.length;a--;)if(qn(n[a][0],i))return a;return-1}function Om(n,i,a,f){return Ri(n,function(x,y,D){i(f,x,a(x),D)}),f}function ou(n,i){return n&&ei(i,Gt(i),n)}function Um(n,i){return n&&ei(i,fn(i),n)}function li(n,i,a){i=="__proto__"&&na?na(n,i,{configurable:!0,enumerable:!0,value:a,writable:!0}):n[i]=a}function Io(n,i){for(var a=-1,f=i.length,x=Y(f),y=n==null;++a<f;)x[a]=y?t:dl(n,i[a]);return x}function ji(n,i,a){return n===n&&(a!==t&&(n=n<=a?n:a),i!==t&&(n=n>=i?n:i)),n}function Ln(n,i,a,f,x,y){var D,F=i&g,B=i&_,ie=i&M;if(a&&(D=x?a(n,f,x,y):a(n)),D!==t)return D;if(!wt(n))return n;var re=ke(n);if(re){if(D=Tg(n),!F)return cn(n,D)}else{var oe=$t(n),_e=oe==qe||oe==Pe;if(Fi(n))return Du(n,F);if(oe==Dt||oe==Ue||_e&&!x){if(D=B||_e?{}:Ku(n),!F)return B?pg(n,Um(D,n)):dg(n,ou(D,n))}else{if(!mt[oe])return x?n:{};D=Eg(n,oe,F)}}y||(y=new kn);var Ce=y.get(n);if(Ce)return Ce;y.set(n,D),Ef(n)?n.forEach(function(Oe){D.add(Ln(Oe,i,a,Oe,n,y))}):wf(n)&&n.forEach(function(Oe,Ke){D.set(Ke,Ln(Oe,i,a,Ke,n,y))});var Ne=ie?B?jo:Qo:B?fn:Gt,Ze=re?t:Ne(n);return En(Ze||n,function(Oe,Ke){Ze&&(Ke=Oe,Oe=n[Ke]),Ms(D,Ke,Ln(Oe,i,a,Ke,n,y))}),D}function zm(n){var i=Gt(n);return function(a){return lu(a,n,i)}}function lu(n,i,a){var f=a.length;if(n==null)return!f;for(n=pt(n);f--;){var x=a[f],y=i[x],D=n[x];if(D===t&&!(x in n)||!y(D))return!1}return!0}function cu(n,i,a){if(typeof n!="function")throw new An(u);return As(function(){n.apply(t,a)},i)}function Ss(n,i,a,f){var x=-1,y=qs,D=!0,F=n.length,B=[],ie=i.length;if(!F)return B;a&&(i=yt(i,mn(a))),f?(y=vo,D=!1):i.length>=s&&(y=ps,D=!1,i=new Qi(i));e:for(;++x<F;){var re=n[x],oe=a==null?re:a(re);if(re=f||re!==0?re:0,D&&oe===oe){for(var _e=ie;_e--;)if(i[_e]===oe)continue e;B.push(re)}else y(i,oe,f)||B.push(re)}return B}var Ri=Ou(jn),uu=Ou(No,!0);function Bm(n,i){var a=!0;return Ri(n,function(f,x,y){return a=!!i(f,x,y),a}),a}function ca(n,i,a){for(var f=-1,x=n.length;++f<x;){var y=n[f],D=i(y);if(D!=null&&(F===t?D===D&&!_n(D):a(D,F)))var F=D,B=y}return B}function Gm(n,i,a,f){var x=n.length;for(a=Ye(a),a<0&&(a=-a>x?0:x+a),f=f===t||f>x?x:Ye(f),f<0&&(f+=x),f=a>f?0:Cf(f);a<f;)n[a++]=i;return n}function fu(n,i){var a=[];return Ri(n,function(f,x,y){i(f,x,y)&&a.push(f)}),a}function qt(n,i,a,f,x){var y=-1,D=n.length;for(a||(a=Cg),x||(x=[]);++y<D;){var F=n[y];i>0&&a(F)?i>1?qt(F,i-1,a,f,x):Ai(x,F):f||(x[x.length]=F)}return x}var Fo=Uu(),hu=Uu(!0);function jn(n,i){return n&&Fo(n,i,Gt)}function No(n,i){return n&&hu(n,i,Gt)}function ua(n,i){return Ei(i,function(a){return hi(n[a])})}function er(n,i){i=Pi(i,n);for(var a=0,f=i.length;n!=null&&a<f;)n=n[ti(i[a++])];return a&&a==f?n:t}function du(n,i,a){var f=i(n);return ke(n)?f:Ai(f,a(n))}function tn(n){return n==null?n===t?te:Vt:Ki&&Ki in pt(n)?yg(n):Ng(n)}function Oo(n,i){return n>i}function Wm(n,i){return n!=null&&ht.call(n,i)}function Vm(n,i){return n!=null&&i in pt(n)}function Hm(n,i,a){return n>=Zt(i,a)&&n<Ut(i,a)}function Uo(n,i,a){for(var f=a?vo:qs,x=n[0].length,y=n.length,D=y,F=Y(y),B=1/0,ie=[];D--;){var re=n[D];D&&i&&(re=yt(re,mn(i))),B=Zt(re.length,B),F[D]=!a&&(i||x>=120&&re.length>=120)?new Qi(D&&re):t}re=n[0];var oe=-1,_e=F[0];e:for(;++oe<x&&ie.length<B;){var Ce=re[oe],Ne=i?i(Ce):Ce;if(Ce=a||Ce!==0?Ce:0,!(_e?ps(_e,Ne):f(ie,Ne,a))){for(D=y;--D;){var Ze=F[D];if(!(Ze?ps(Ze,Ne):f(n[D],Ne,a)))continue e}_e&&_e.push(Ne),ie.push(Ce)}}return ie}function km(n,i,a,f){return jn(n,function(x,y,D){i(f,a(x),y,D)}),f}function ys(n,i,a){i=Pi(i,n),n=ef(n,i);var f=n==null?n:n[ti(Dn(i))];return f==null?t:pn(f,n,a)}function pu(n){return At(n)&&tn(n)==Ue}function qm(n){return At(n)&&tn(n)==xe}function Xm(n){return At(n)&&tn(n)==Be}function bs(n,i,a,f,x){return n===i?!0:n==null||i==null||!At(n)&&!At(i)?n!==n&&i!==i:Ym(n,i,a,f,bs,x)}function Ym(n,i,a,f,x,y){var D=ke(n),F=ke(i),B=D?se:$t(n),ie=F?se:$t(i);B=B==Ue?Dt:B,ie=ie==Ue?Dt:ie;var re=B==Dt,oe=ie==Dt,_e=B==ie;if(_e&&Fi(n)){if(!Fi(i))return!1;D=!0,re=!1}if(_e&&!re)return y||(y=new kn),D||Or(n)?Yu(n,i,a,f,x,y):Mg(n,i,B,a,f,x,y);if(!(a&b)){var Ce=re&&ht.call(n,"__wrapped__"),Ne=oe&&ht.call(i,"__wrapped__");if(Ce||Ne){var Ze=Ce?n.value():n,Oe=Ne?i.value():i;return y||(y=new kn),x(Ze,Oe,a,f,y)}}return _e?(y||(y=new kn),Sg(n,i,a,f,x,y)):!1}function Zm(n){return At(n)&&$t(n)==ut}function zo(n,i,a,f){var x=a.length,y=x,D=!f;if(n==null)return!y;for(n=pt(n);x--;){var F=a[x];if(D&&F[2]?F[1]!==n[F[0]]:!(F[0]in n))return!1}for(;++x<y;){F=a[x];var B=F[0],ie=n[B],re=F[1];if(D&&F[2]){if(ie===t&&!(B in n))return!1}else{var oe=new kn;if(f)var _e=f(ie,re,B,n,i,oe);if(!(_e===t?bs(re,ie,b|v,f,oe):_e))return!1}}return!0}function mu(n){if(!wt(n)||Rg(n))return!1;var i=hi(n)?Zp:et;return i.test(nr(n))}function $m(n){return At(n)&&tn(n)==Qt}function Km(n){return At(n)&&$t(n)==Tt}function Jm(n){return At(n)&&Aa(n.length)&&!!xt[tn(n)]}function gu(n){return typeof n=="function"?n:n==null?hn:typeof n=="object"?ke(n)?vu(n[0],n[1]):xu(n):Bf(n)}function Bo(n){if(!Es(n))return em(n);var i=[];for(var a in pt(n))ht.call(n,a)&&a!="constructor"&&i.push(a);return i}function Qm(n){if(!wt(n))return Fg(n);var i=Es(n),a=[];for(var f in n)f=="constructor"&&(i||!ht.call(n,f))||a.push(f);return a}function Go(n,i){return n<i}function _u(n,i){var a=-1,f=un(n)?Y(n.length):[];return Ri(n,function(x,y,D){f[++a]=i(x,y,D)}),f}function xu(n){var i=tl(n);return i.length==1&&i[0][2]?Qu(i[0][0],i[0][1]):function(a){return a===n||zo(a,n,i)}}function vu(n,i){return il(n)&&Ju(i)?Qu(ti(n),i):function(a){var f=dl(a,n);return f===t&&f===i?pl(a,n):bs(i,f,b|v)}}function fa(n,i,a,f,x){n!==i&&Fo(i,function(y,D){if(x||(x=new kn),wt(y))jm(n,i,D,a,fa,f,x);else{var F=f?f(sl(n,D),y,D+"",n,i,x):t;F===t&&(F=y),Po(n,D,F)}},fn)}function jm(n,i,a,f,x,y,D){var F=sl(n,a),B=sl(i,a),ie=D.get(B);if(ie){Po(n,a,ie);return}var re=y?y(F,B,a+"",n,i,D):t,oe=re===t;if(oe){var _e=ke(B),Ce=!_e&&Fi(B),Ne=!_e&&!Ce&&Or(B);re=B,_e||Ce||Ne?ke(F)?re=F:Lt(F)?re=cn(F):Ce?(oe=!1,re=Du(B,!0)):Ne?(oe=!1,re=Pu(B,!0)):re=[]:Cs(B)||ir(B)?(re=F,ir(F)?re=Lf(F):(!wt(F)||hi(F))&&(re=Ku(B))):oe=!1}oe&&(D.set(B,re),x(re,B,f,y,D),D.delete(B)),Po(n,a,re)}function Mu(n,i){var a=n.length;if(!!a)return i+=i<0?a:0,fi(i,a)?n[i]:t}function Su(n,i,a){i.length?i=yt(i,function(y){return ke(y)?function(D){return er(D,y.length===1?y[0]:y)}:y}):i=[hn];var f=-1;i=yt(i,mn(Ie()));var x=_u(n,function(y,D,F){var B=yt(i,function(ie){return ie(y)});return{criteria:B,index:++f,value:y}});return Ep(x,function(y,D){return hg(y,D,a)})}function eg(n,i){return yu(n,i,function(a,f){return pl(n,f)})}function yu(n,i,a){for(var f=-1,x=i.length,y={};++f<x;){var D=i[f],F=er(n,D);a(F,D)&&ws(y,Pi(D,n),F)}return y}function tg(n){return function(i){return er(i,n)}}function Wo(n,i,a,f){var x=f?Tp:Tr,y=-1,D=i.length,F=n;for(n===i&&(i=cn(i)),a&&(F=yt(n,mn(a)));++y<D;)for(var B=0,ie=i[y],re=a?a(ie):ie;(B=x(F,re,B,f))>-1;)F!==n&&ta.call(F,B,1),ta.call(n,B,1);return n}function bu(n,i){for(var a=n?i.length:0,f=a-1;a--;){var x=i[a];if(a==f||x!==y){var y=x;fi(x)?ta.call(n,x,1):qo(n,x)}}return n}function Vo(n,i){return n+ra(iu()*(i-n+1))}function ng(n,i,a,f){for(var x=-1,y=Ut(ia((i-n)/(a||1)),0),D=Y(y);y--;)D[f?y:++x]=n,n+=a;return D}function Ho(n,i){var a="";if(!n||i<1||i>ee)return a;do i%2&&(a+=n),i=ra(i/2),i&&(n+=n);while(i);return a}function $e(n,i){return al(ju(n,i,hn),n+"")}function ig(n){return au(Ur(n))}function rg(n,i){var a=Ur(n);return Sa(a,ji(i,0,a.length))}function ws(n,i,a,f){if(!wt(n))return n;i=Pi(i,n);for(var x=-1,y=i.length,D=y-1,F=n;F!=null&&++x<y;){var B=ti(i[x]),ie=a;if(B==="__proto__"||B==="constructor"||B==="prototype")return n;if(x!=D){var re=F[B];ie=f?f(re,B,F):t,ie===t&&(ie=wt(re)?re:fi(i[x+1])?[]:{})}Ms(F,B,ie),F=F[B]}return n}var wu=sa?function(n,i){return sa.set(n,i),n}:hn,sg=na?function(n,i){return na(n,"toString",{configurable:!0,enumerable:!1,value:gl(i),writable:!0})}:hn;function ag(n){return Sa(Ur(n))}function Rn(n,i,a){var f=-1,x=n.length;i<0&&(i=-i>x?0:x+i),a=a>x?x:a,a<0&&(a+=x),x=i>a?0:a-i>>>0,i>>>=0;for(var y=Y(x);++f<x;)y[f]=n[f+i];return y}function og(n,i){var a;return Ri(n,function(f,x,y){return a=i(f,x,y),!a}),!!a}function ha(n,i,a){var f=0,x=n==null?f:n.length;if(typeof i=="number"&&i===i&&x<=de){for(;f<x;){var y=f+x>>>1,D=n[y];D!==null&&!_n(D)&&(a?D<=i:D<i)?f=y+1:x=y}return x}return ko(n,i,hn,a)}function ko(n,i,a,f){var x=0,y=n==null?0:n.length;if(y===0)return 0;i=a(i);for(var D=i!==i,F=i===null,B=_n(i),ie=i===t;x<y;){var re=ra((x+y)/2),oe=a(n[re]),_e=oe!==t,Ce=oe===null,Ne=oe===oe,Ze=_n(oe);if(D)var Oe=f||Ne;else ie?Oe=Ne&&(f||_e):F?Oe=Ne&&_e&&(f||!Ce):B?Oe=Ne&&_e&&!Ce&&(f||!Ze):Ce||Ze?Oe=!1:Oe=f?oe<=i:oe<i;Oe?x=re+1:y=re}return Zt(y,pe)}function Tu(n,i){for(var a=-1,f=n.length,x=0,y=[];++a<f;){var D=n[a],F=i?i(D):D;if(!a||!qn(F,B)){var B=F;y[x++]=D===0?0:D}}return y}function Eu(n){return typeof n=="number"?n:_n(n)?Z:+n}function gn(n){if(typeof n=="string")return n;if(ke(n))return yt(n,gn)+"";if(_n(n))return ru?ru.call(n):"";var i=n+"";return i=="0"&&1/n==-le?"-0":i}function Di(n,i,a){var f=-1,x=qs,y=n.length,D=!0,F=[],B=F;if(a)D=!1,x=vo;else if(y>=s){var ie=i?null:xg(n);if(ie)return Ys(ie);D=!1,x=ps,B=new Qi}else B=i?[]:F;e:for(;++f<y;){var re=n[f],oe=i?i(re):re;if(re=a||re!==0?re:0,D&&oe===oe){for(var _e=B.length;_e--;)if(B[_e]===oe)continue e;i&&B.push(oe),F.push(re)}else x(B,oe,a)||(B!==F&&B.push(oe),F.push(re))}return F}function qo(n,i){return i=Pi(i,n),n=ef(n,i),n==null||delete n[ti(Dn(i))]}function Au(n,i,a,f){return ws(n,i,a(er(n,i)),f)}function da(n,i,a,f){for(var x=n.length,y=f?x:-1;(f?y--:++y<x)&&i(n[y],y,n););return a?Rn(n,f?0:y,f?y+1:x):Rn(n,f?y+1:0,f?x:y)}function Cu(n,i){var a=n;return a instanceof Qe&&(a=a.value()),Mo(i,function(f,x){return x.func.apply(x.thisArg,Ai([f],x.args))},a)}function Xo(n,i,a){var f=n.length;if(f<2)return f?Di(n[0]):[];for(var x=-1,y=Y(f);++x<f;)for(var D=n[x],F=-1;++F<f;)F!=x&&(y[x]=Ss(y[x]||D,n[F],i,a));return Di(qt(y,1),i,a)}function Lu(n,i,a){for(var f=-1,x=n.length,y=i.length,D={};++f<x;){var F=f<y?i[f]:t;a(D,n[f],F)}return D}function Yo(n){return Lt(n)?n:[]}function Zo(n){return typeof n=="function"?n:hn}function Pi(n,i){return ke(n)?n:il(n,i)?[n]:sf(ct(n))}var lg=$e;function Ii(n,i,a){var f=n.length;return a=a===t?f:a,!i&&a>=f?n:Rn(n,i,a)}var Ru=$p||function(n){return kt.clearTimeout(n)};function Du(n,i){if(i)return n.slice();var a=n.length,f=Qc?Qc(a):new n.constructor(a);return n.copy(f),f}function $o(n){var i=new n.constructor(n.byteLength);return new js(i).set(new js(n)),i}function cg(n,i){var a=i?$o(n.buffer):n.buffer;return new n.constructor(a,n.byteOffset,n.byteLength)}function ug(n){var i=new n.constructor(n.source,Xe.exec(n));return i.lastIndex=n.lastIndex,i}function fg(n){return vs?pt(vs.call(n)):{}}function Pu(n,i){var a=i?$o(n.buffer):n.buffer;return new n.constructor(a,n.byteOffset,n.length)}function Iu(n,i){if(n!==i){var a=n!==t,f=n===null,x=n===n,y=_n(n),D=i!==t,F=i===null,B=i===i,ie=_n(i);if(!F&&!ie&&!y&&n>i||y&&D&&B&&!F&&!ie||f&&D&&B||!a&&B||!x)return 1;if(!f&&!y&&!ie&&n<i||ie&&a&&x&&!f&&!y||F&&a&&x||!D&&x||!B)return-1}return 0}function hg(n,i,a){for(var f=-1,x=n.criteria,y=i.criteria,D=x.length,F=a.length;++f<D;){var B=Iu(x[f],y[f]);if(B){if(f>=F)return B;var ie=a[f];return B*(ie=="desc"?-1:1)}}return n.index-i.index}function Fu(n,i,a,f){for(var x=-1,y=n.length,D=a.length,F=-1,B=i.length,ie=Ut(y-D,0),re=Y(B+ie),oe=!f;++F<B;)re[F]=i[F];for(;++x<D;)(oe||x<y)&&(re[a[x]]=n[x]);for(;ie--;)re[F++]=n[x++];return re}function Nu(n,i,a,f){for(var x=-1,y=n.length,D=-1,F=a.length,B=-1,ie=i.length,re=Ut(y-F,0),oe=Y(re+ie),_e=!f;++x<re;)oe[x]=n[x];for(var Ce=x;++B<ie;)oe[Ce+B]=i[B];for(;++D<F;)(_e||x<y)&&(oe[Ce+a[D]]=n[x++]);return oe}function cn(n,i){var a=-1,f=n.length;for(i||(i=Y(f));++a<f;)i[a]=n[a];return i}function ei(n,i,a,f){var x=!a;a||(a={});for(var y=-1,D=i.length;++y<D;){var F=i[y],B=f?f(a[F],n[F],F,a,n):t;B===t&&(B=n[F]),x?li(a,F,B):Ms(a,F,B)}return a}function dg(n,i){return ei(n,nl(n),i)}function pg(n,i){return ei(n,Zu(n),i)}function pa(n,i){return function(a,f){var x=ke(a)?vp:Om,y=i?i():{};return x(a,n,Ie(f,2),y)}}function Ir(n){return $e(function(i,a){var f=-1,x=a.length,y=x>1?a[x-1]:t,D=x>2?a[2]:t;for(y=n.length>3&&typeof y=="function"?(x--,y):t,D&&nn(a[0],a[1],D)&&(y=x<3?t:y,x=1),i=pt(i);++f<x;){var F=a[f];F&&n(i,F,f,y)}return i})}function Ou(n,i){return function(a,f){if(a==null)return a;if(!un(a))return n(a,f);for(var x=a.length,y=i?x:-1,D=pt(a);(i?y--:++y<x)&&f(D[y],y,D)!==!1;);return a}}function Uu(n){return function(i,a,f){for(var x=-1,y=pt(i),D=f(i),F=D.length;F--;){var B=D[n?F:++x];if(a(y[B],B,y)===!1)break}return i}}function mg(n,i,a){var f=i&p,x=Ts(n);function y(){var D=this&&this!==kt&&this instanceof y?x:n;return D.apply(f?a:this,arguments)}return y}function zu(n){return function(i){i=ct(i);var a=Er(i)?Hn(i):t,f=a?a[0]:i.charAt(0),x=a?Ii(a,1).join(""):i.slice(1);return f[n]()+x}}function Fr(n){return function(i){return Mo(Uf(Of(i).replace(sp,"")),n,"")}}function Ts(n){return function(){var i=arguments;switch(i.length){case 0:return new n;case 1:return new n(i[0]);case 2:return new n(i[0],i[1]);case 3:return new n(i[0],i[1],i[2]);case 4:return new n(i[0],i[1],i[2],i[3]);case 5:return new n(i[0],i[1],i[2],i[3],i[4]);case 6:return new n(i[0],i[1],i[2],i[3],i[4],i[5]);case 7:return new n(i[0],i[1],i[2],i[3],i[4],i[5],i[6])}var a=Pr(n.prototype),f=n.apply(a,i);return wt(f)?f:a}}function gg(n,i,a){var f=Ts(n);function x(){for(var y=arguments.length,D=Y(y),F=y,B=Nr(x);F--;)D[F]=arguments[F];var ie=y<3&&D[0]!==B&&D[y-1]!==B?[]:Ci(D,B);if(y-=ie.length,y<a)return Hu(n,i,ma,x.placeholder,t,D,ie,t,t,a-y);var re=this&&this!==kt&&this instanceof x?f:n;return pn(re,this,D)}return x}function Bu(n){return function(i,a,f){var x=pt(i);if(!un(i)){var y=Ie(a,3);i=Gt(i),a=function(F){return y(x[F],F,x)}}var D=n(i,a,f);return D>-1?x[y?i[D]:D]:t}}function Gu(n){return ui(function(i){var a=i.length,f=a,x=Cn.prototype.thru;for(n&&i.reverse();f--;){var y=i[f];if(typeof y!="function")throw new An(u);if(x&&!D&&va(y)=="wrapper")var D=new Cn([],!0)}for(f=D?f:a;++f<a;){y=i[f];var F=va(y),B=F=="wrapper"?el(y):t;B&&rl(B[0])&&B[1]==(H|I|C|E)&&!B[4].length&&B[9]==1?D=D[va(B[0])].apply(D,B[3]):D=y.length==1&&rl(y)?D[F]():D.thru(y)}return function(){var ie=arguments,re=ie[0];if(D&&ie.length==1&&ke(re))return D.plant(re).value();for(var oe=0,_e=a?i[oe].apply(this,ie):re;++oe<a;)_e=i[oe].call(this,_e);return _e}})}function ma(n,i,a,f,x,y,D,F,B,ie){var re=i&H,oe=i&p,_e=i&w,Ce=i&(I|P),Ne=i&N,Ze=_e?t:Ts(n);function Oe(){for(var Ke=arguments.length,nt=Y(Ke),xn=Ke;xn--;)nt[xn]=arguments[xn];if(Ce)var rn=Nr(Oe),vn=Cp(nt,rn);if(f&&(nt=Fu(nt,f,x,Ce)),y&&(nt=Nu(nt,y,D,Ce)),Ke-=vn,Ce&&Ke<ie){var Rt=Ci(nt,rn);return Hu(n,i,ma,Oe.placeholder,a,nt,Rt,F,B,ie-Ke)}var Xn=oe?a:this,pi=_e?Xn[n]:n;return Ke=nt.length,F?nt=Og(nt,F):Ne&&Ke>1&&nt.reverse(),re&&B<Ke&&(nt.length=B),this&&this!==kt&&this instanceof Oe&&(pi=Ze||Ts(pi)),pi.apply(Xn,nt)}return Oe}function Wu(n,i){return function(a,f){return km(a,n,i(f),{})}}function ga(n,i){return function(a,f){var x;if(a===t&&f===t)return i;if(a!==t&&(x=a),f!==t){if(x===t)return f;typeof a=="string"||typeof f=="string"?(a=gn(a),f=gn(f)):(a=Eu(a),f=Eu(f)),x=n(a,f)}return x}}function Ko(n){return ui(function(i){return i=yt(i,mn(Ie())),$e(function(a){var f=this;return n(i,function(x){return pn(x,f,a)})})})}function _a(n,i){i=i===t?" ":gn(i);var a=i.length;if(a<2)return a?Ho(i,n):i;var f=Ho(i,ia(n/Ar(i)));return Er(i)?Ii(Hn(f),0,n).join(""):f.slice(0,n)}function _g(n,i,a,f){var x=i&p,y=Ts(n);function D(){for(var F=-1,B=arguments.length,ie=-1,re=f.length,oe=Y(re+B),_e=this&&this!==kt&&this instanceof D?y:n;++ie<re;)oe[ie]=f[ie];for(;B--;)oe[ie++]=arguments[++F];return pn(_e,x?a:this,oe)}return D}function Vu(n){return function(i,a,f){return f&&typeof f!="number"&&nn(i,a,f)&&(a=f=t),i=di(i),a===t?(a=i,i=0):a=di(a),f=f===t?i<a?1:-1:di(f),ng(i,a,f,n)}}function xa(n){return function(i,a){return typeof i=="string"&&typeof a=="string"||(i=Pn(i),a=Pn(a)),n(i,a)}}function Hu(n,i,a,f,x,y,D,F,B,ie){var re=i&I,oe=re?D:t,_e=re?t:D,Ce=re?y:t,Ne=re?t:y;i|=re?C:O,i&=~(re?O:C),i&R||(i&=~(p|w));var Ze=[n,i,x,Ce,oe,Ne,_e,F,B,ie],Oe=a.apply(t,Ze);return rl(n)&&tf(Oe,Ze),Oe.placeholder=f,nf(Oe,n,i)}function Jo(n){var i=Ot[n];return function(a,f){if(a=Pn(a),f=f==null?0:Zt(Ye(f),292),f&&nu(a)){var x=(ct(a)+"e").split("e"),y=i(x[0]+"e"+(+x[1]+f));return x=(ct(y)+"e").split("e"),+(x[0]+"e"+(+x[1]-f))}return i(a)}}var xg=Rr&&1/Ys(new Rr([,-0]))[1]==le?function(n){return new Rr(n)}:vl;function ku(n){return function(i){var a=$t(i);return a==ut?Ao(i):a==Tt?Np(i):Ap(i,n(i))}}function ci(n,i,a,f,x,y,D,F){var B=i&w;if(!B&&typeof n!="function")throw new An(u);var ie=f?f.length:0;if(ie||(i&=~(C|O),f=x=t),D=D===t?D:Ut(Ye(D),0),F=F===t?F:Ye(F),ie-=x?x.length:0,i&O){var re=f,oe=x;f=x=t}var _e=B?t:el(n),Ce=[n,i,a,f,x,re,oe,y,D,F];if(_e&&Ig(Ce,_e),n=Ce[0],i=Ce[1],a=Ce[2],f=Ce[3],x=Ce[4],F=Ce[9]=Ce[9]===t?B?0:n.length:Ut(Ce[9]-ie,0),!F&&i&(I|P)&&(i&=~(I|P)),!i||i==p)var Ne=mg(n,i,a);else i==I||i==P?Ne=gg(n,i,F):(i==C||i==(p|C))&&!x.length?Ne=_g(n,i,a,f):Ne=ma.apply(t,Ce);var Ze=_e?wu:tf;return nf(Ze(Ne,Ce),n,i)}function qu(n,i,a,f){return n===t||qn(n,Lr[a])&&!ht.call(f,a)?i:n}function Xu(n,i,a,f,x,y){return wt(n)&&wt(i)&&(y.set(i,n),fa(n,i,t,Xu,y),y.delete(i)),n}function vg(n){return Cs(n)?t:n}function Yu(n,i,a,f,x,y){var D=a&b,F=n.length,B=i.length;if(F!=B&&!(D&&B>F))return!1;var ie=y.get(n),re=y.get(i);if(ie&&re)return ie==i&&re==n;var oe=-1,_e=!0,Ce=a&v?new Qi:t;for(y.set(n,i),y.set(i,n);++oe<F;){var Ne=n[oe],Ze=i[oe];if(f)var Oe=D?f(Ze,Ne,oe,i,n,y):f(Ne,Ze,oe,n,i,y);if(Oe!==t){if(Oe)continue;_e=!1;break}if(Ce){if(!So(i,function(Ke,nt){if(!ps(Ce,nt)&&(Ne===Ke||x(Ne,Ke,a,f,y)))return Ce.push(nt)})){_e=!1;break}}else if(!(Ne===Ze||x(Ne,Ze,a,f,y))){_e=!1;break}}return y.delete(n),y.delete(i),_e}function Mg(n,i,a,f,x,y,D){switch(a){case ze:if(n.byteLength!=i.byteLength||n.byteOffset!=i.byteOffset)return!1;n=n.buffer,i=i.buffer;case xe:return!(n.byteLength!=i.byteLength||!y(new js(n),new js(i)));case Fe:case Be:case Nt:return qn(+n,+i);case st:return n.name==i.name&&n.message==i.message;case Qt:case L:return n==i+"";case ut:var F=Ao;case Tt:var B=f&b;if(F||(F=Ys),n.size!=i.size&&!B)return!1;var ie=D.get(n);if(ie)return ie==i;f|=v,D.set(n,i);var re=Yu(F(n),F(i),f,x,y,D);return D.delete(n),re;case T:if(vs)return vs.call(n)==vs.call(i)}return!1}function Sg(n,i,a,f,x,y){var D=a&b,F=Qo(n),B=F.length,ie=Qo(i),re=ie.length;if(B!=re&&!D)return!1;for(var oe=B;oe--;){var _e=F[oe];if(!(D?_e in i:ht.call(i,_e)))return!1}var Ce=y.get(n),Ne=y.get(i);if(Ce&&Ne)return Ce==i&&Ne==n;var Ze=!0;y.set(n,i),y.set(i,n);for(var Oe=D;++oe<B;){_e=F[oe];var Ke=n[_e],nt=i[_e];if(f)var xn=D?f(nt,Ke,_e,i,n,y):f(Ke,nt,_e,n,i,y);if(!(xn===t?Ke===nt||x(Ke,nt,a,f,y):xn)){Ze=!1;break}Oe||(Oe=_e=="constructor")}if(Ze&&!Oe){var rn=n.constructor,vn=i.constructor;rn!=vn&&"constructor"in n&&"constructor"in i&&!(typeof rn=="function"&&rn instanceof rn&&typeof vn=="function"&&vn instanceof vn)&&(Ze=!1)}return y.delete(n),y.delete(i),Ze}function ui(n){return al(ju(n,t,cf),n+"")}function Qo(n){return du(n,Gt,nl)}function jo(n){return du(n,fn,Zu)}var el=sa?function(n){return sa.get(n)}:vl;function va(n){for(var i=n.name+"",a=Dr[i],f=ht.call(Dr,i)?a.length:0;f--;){var x=a[f],y=x.func;if(y==null||y==n)return x.name}return i}function Nr(n){var i=ht.call(S,"placeholder")?S:n;return i.placeholder}function Ie(){var n=S.iteratee||_l;return n=n===_l?gu:n,arguments.length?n(arguments[0],arguments[1]):n}function Ma(n,i){var a=n.__data__;return Lg(i)?a[typeof i=="string"?"string":"hash"]:a.map}function tl(n){for(var i=Gt(n),a=i.length;a--;){var f=i[a],x=n[f];i[a]=[f,x,Ju(x)]}return i}function tr(n,i){var a=Pp(n,i);return mu(a)?a:t}function yg(n){var i=ht.call(n,Ki),a=n[Ki];try{n[Ki]=t;var f=!0}catch{}var x=Js.call(n);return f&&(i?n[Ki]=a:delete n[Ki]),x}var nl=Lo?function(n){return n==null?[]:(n=pt(n),Ei(Lo(n),function(i){return eu.call(n,i)}))}:Ml,Zu=Lo?function(n){for(var i=[];n;)Ai(i,nl(n)),n=ea(n);return i}:Ml,$t=tn;(Ro&&$t(new Ro(new ArrayBuffer(1)))!=ze||gs&&$t(new gs)!=ut||Do&&$t(Do.resolve())!=Pt||Rr&&$t(new Rr)!=Tt||_s&&$t(new _s)!=fe)&&($t=function(n){var i=tn(n),a=i==Dt?n.constructor:t,f=a?nr(a):"";if(f)switch(f){case rm:return ze;case sm:return ut;case am:return Pt;case om:return Tt;case lm:return fe}return i});function bg(n,i,a){for(var f=-1,x=a.length;++f<x;){var y=a[f],D=y.size;switch(y.type){case"drop":n+=D;break;case"dropRight":i-=D;break;case"take":i=Zt(i,n+D);break;case"takeRight":n=Ut(n,i-D);break}}return{start:n,end:i}}function wg(n){var i=n.match(V);return i?i[1].split(j):[]}function $u(n,i,a){i=Pi(i,n);for(var f=-1,x=i.length,y=!1;++f<x;){var D=ti(i[f]);if(!(y=n!=null&&a(n,D)))break;n=n[D]}return y||++f!=x?y:(x=n==null?0:n.length,!!x&&Aa(x)&&fi(D,x)&&(ke(n)||ir(n)))}function Tg(n){var i=n.length,a=new n.constructor(i);return i&&typeof n[0]=="string"&&ht.call(n,"index")&&(a.index=n.index,a.input=n.input),a}function Ku(n){return typeof n.constructor=="function"&&!Es(n)?Pr(ea(n)):{}}function Eg(n,i,a){var f=n.constructor;switch(i){case xe:return $o(n);case Fe:case Be:return new f(+n);case ze:return cg(n,a);case $:case Re:case we:case Le:case Te:case He:case it:case _t:case z:return Pu(n,a);case ut:return new f;case Nt:case L:return new f(n);case Qt:return ug(n);case Tt:return new f;case T:return fg(n)}}function Ag(n,i){var a=i.length;if(!a)return n;var f=a-1;return i[f]=(a>1?"& ":"")+i[f],i=i.join(a>2?", ":" "),n.replace(A,`{
/* [wrapped with `+i+`] */
`)}function Cg(n){return ke(n)||ir(n)||!!(tu&&n&&n[tu])}function fi(n,i){var a=typeof n;return i=i==null?ee:i,!!i&&(a=="number"||a!="symbol"&&St.test(n))&&n>-1&&n%1==0&&n<i}function nn(n,i,a){if(!wt(a))return!1;var f=typeof i;return(f=="number"?un(a)&&fi(i,a.length):f=="string"&&i in a)?qn(a[i],n):!1}function il(n,i){if(ke(n))return!1;var a=typeof n;return a=="number"||a=="symbol"||a=="boolean"||n==null||_n(n)?!0:co.test(n)||!ln.test(n)||i!=null&&n in pt(i)}function Lg(n){var i=typeof n;return i=="string"||i=="number"||i=="symbol"||i=="boolean"?n!=="__proto__":n===null}function rl(n){var i=va(n),a=S[i];if(typeof a!="function"||!(i in Qe.prototype))return!1;if(n===a)return!0;var f=el(a);return!!f&&n===f[0]}function Rg(n){return!!Jc&&Jc in n}var Dg=$s?hi:Sl;function Es(n){var i=n&&n.constructor,a=typeof i=="function"&&i.prototype||Lr;return n===a}function Ju(n){return n===n&&!wt(n)}function Qu(n,i){return function(a){return a==null?!1:a[n]===i&&(i!==t||n in pt(a))}}function Pg(n){var i=Ta(n,function(f){return a.size===h&&a.clear(),f}),a=i.cache;return i}function Ig(n,i){var a=n[1],f=i[1],x=a|f,y=x<(p|w|H),D=f==H&&a==I||f==H&&a==E&&n[7].length<=i[8]||f==(H|E)&&i[7].length<=i[8]&&a==I;if(!(y||D))return n;f&p&&(n[2]=i[2],x|=a&p?0:R);var F=i[3];if(F){var B=n[3];n[3]=B?Fu(B,F,i[4]):F,n[4]=B?Ci(n[3],m):i[4]}return F=i[5],F&&(B=n[5],n[5]=B?Nu(B,F,i[6]):F,n[6]=B?Ci(n[5],m):i[6]),F=i[7],F&&(n[7]=F),f&H&&(n[8]=n[8]==null?i[8]:Zt(n[8],i[8])),n[9]==null&&(n[9]=i[9]),n[0]=i[0],n[1]=x,n}function Fg(n){var i=[];if(n!=null)for(var a in pt(n))i.push(a);return i}function Ng(n){return Js.call(n)}function ju(n,i,a){return i=Ut(i===t?n.length-1:i,0),function(){for(var f=arguments,x=-1,y=Ut(f.length-i,0),D=Y(y);++x<y;)D[x]=f[i+x];x=-1;for(var F=Y(i+1);++x<i;)F[x]=f[x];return F[i]=a(D),pn(n,this,F)}}function ef(n,i){return i.length<2?n:er(n,Rn(i,0,-1))}function Og(n,i){for(var a=n.length,f=Zt(i.length,a),x=cn(n);f--;){var y=i[f];n[f]=fi(y,a)?x[y]:t}return n}function sl(n,i){if(!(i==="constructor"&&typeof n[i]=="function")&&i!="__proto__")return n[i]}var tf=rf(wu),As=Jp||function(n,i){return kt.setTimeout(n,i)},al=rf(sg);function nf(n,i,a){var f=i+"";return al(n,Ag(f,Ug(wg(f),a)))}function rf(n){var i=0,a=0;return function(){var f=tm(),x=J-(f-a);if(a=f,x>0){if(++i>=ye)return arguments[0]}else i=0;return n.apply(t,arguments)}}function Sa(n,i){var a=-1,f=n.length,x=f-1;for(i=i===t?f:i;++a<i;){var y=Vo(a,x),D=n[y];n[y]=n[a],n[a]=D}return n.length=i,n}var sf=Pg(function(n){var i=[];return n.charCodeAt(0)===46&&i.push(""),n.replace(Mr,function(a,f,x,y){i.push(x?y.replace(De,"$1"):f||a)}),i});function ti(n){if(typeof n=="string"||_n(n))return n;var i=n+"";return i=="0"&&1/n==-le?"-0":i}function nr(n){if(n!=null){try{return Ks.call(n)}catch{}try{return n+""}catch{}}return""}function Ug(n,i){return En(Ae,function(a){var f="_."+a[0];i&a[1]&&!qs(n,f)&&n.push(f)}),n.sort()}function af(n){if(n instanceof Qe)return n.clone();var i=new Cn(n.__wrapped__,n.__chain__);return i.__actions__=cn(n.__actions__),i.__index__=n.__index__,i.__values__=n.__values__,i}function zg(n,i,a){(a?nn(n,i,a):i===t)?i=1:i=Ut(Ye(i),0);var f=n==null?0:n.length;if(!f||i<1)return[];for(var x=0,y=0,D=Y(ia(f/i));x<f;)D[y++]=Rn(n,x,x+=i);return D}function Bg(n){for(var i=-1,a=n==null?0:n.length,f=0,x=[];++i<a;){var y=n[i];y&&(x[f++]=y)}return x}function Gg(){var n=arguments.length;if(!n)return[];for(var i=Y(n-1),a=arguments[0],f=n;f--;)i[f-1]=arguments[f];return Ai(ke(a)?cn(a):[a],qt(i,1))}var Wg=$e(function(n,i){return Lt(n)?Ss(n,qt(i,1,Lt,!0)):[]}),Vg=$e(function(n,i){var a=Dn(i);return Lt(a)&&(a=t),Lt(n)?Ss(n,qt(i,1,Lt,!0),Ie(a,2)):[]}),Hg=$e(function(n,i){var a=Dn(i);return Lt(a)&&(a=t),Lt(n)?Ss(n,qt(i,1,Lt,!0),t,a):[]});function kg(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ye(i),Rn(n,i<0?0:i,f)):[]}function qg(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ye(i),i=f-i,Rn(n,0,i<0?0:i)):[]}function Xg(n,i){return n&&n.length?da(n,Ie(i,3),!0,!0):[]}function Yg(n,i){return n&&n.length?da(n,Ie(i,3),!0):[]}function Zg(n,i,a,f){var x=n==null?0:n.length;return x?(a&&typeof a!="number"&&nn(n,i,a)&&(a=0,f=x),Gm(n,i,a,f)):[]}function of(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var x=a==null?0:Ye(a);return x<0&&(x=Ut(f+x,0)),Xs(n,Ie(i,3),x)}function lf(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var x=f-1;return a!==t&&(x=Ye(a),x=a<0?Ut(f+x,0):Zt(x,f-1)),Xs(n,Ie(i,3),x,!0)}function cf(n){var i=n==null?0:n.length;return i?qt(n,1):[]}function $g(n){var i=n==null?0:n.length;return i?qt(n,le):[]}function Kg(n,i){var a=n==null?0:n.length;return a?(i=i===t?1:Ye(i),qt(n,i)):[]}function Jg(n){for(var i=-1,a=n==null?0:n.length,f={};++i<a;){var x=n[i];f[x[0]]=x[1]}return f}function uf(n){return n&&n.length?n[0]:t}function Qg(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var x=a==null?0:Ye(a);return x<0&&(x=Ut(f+x,0)),Tr(n,i,x)}function jg(n){var i=n==null?0:n.length;return i?Rn(n,0,-1):[]}var e_=$e(function(n){var i=yt(n,Yo);return i.length&&i[0]===n[0]?Uo(i):[]}),t_=$e(function(n){var i=Dn(n),a=yt(n,Yo);return i===Dn(a)?i=t:a.pop(),a.length&&a[0]===n[0]?Uo(a,Ie(i,2)):[]}),n_=$e(function(n){var i=Dn(n),a=yt(n,Yo);return i=typeof i=="function"?i:t,i&&a.pop(),a.length&&a[0]===n[0]?Uo(a,t,i):[]});function i_(n,i){return n==null?"":jp.call(n,i)}function Dn(n){var i=n==null?0:n.length;return i?n[i-1]:t}function r_(n,i,a){var f=n==null?0:n.length;if(!f)return-1;var x=f;return a!==t&&(x=Ye(a),x=x<0?Ut(f+x,0):Zt(x,f-1)),i===i?Up(n,i,x):Xs(n,Hc,x,!0)}function s_(n,i){return n&&n.length?Mu(n,Ye(i)):t}var a_=$e(ff);function ff(n,i){return n&&n.length&&i&&i.length?Wo(n,i):n}function o_(n,i,a){return n&&n.length&&i&&i.length?Wo(n,i,Ie(a,2)):n}function l_(n,i,a){return n&&n.length&&i&&i.length?Wo(n,i,t,a):n}var c_=ui(function(n,i){var a=n==null?0:n.length,f=Io(n,i);return bu(n,yt(i,function(x){return fi(x,a)?+x:x}).sort(Iu)),f});function u_(n,i){var a=[];if(!(n&&n.length))return a;var f=-1,x=[],y=n.length;for(i=Ie(i,3);++f<y;){var D=n[f];i(D,f,n)&&(a.push(D),x.push(f))}return bu(n,x),a}function ol(n){return n==null?n:im.call(n)}function f_(n,i,a){var f=n==null?0:n.length;return f?(a&&typeof a!="number"&&nn(n,i,a)?(i=0,a=f):(i=i==null?0:Ye(i),a=a===t?f:Ye(a)),Rn(n,i,a)):[]}function h_(n,i){return ha(n,i)}function d_(n,i,a){return ko(n,i,Ie(a,2))}function p_(n,i){var a=n==null?0:n.length;if(a){var f=ha(n,i);if(f<a&&qn(n[f],i))return f}return-1}function m_(n,i){return ha(n,i,!0)}function g_(n,i,a){return ko(n,i,Ie(a,2),!0)}function __(n,i){var a=n==null?0:n.length;if(a){var f=ha(n,i,!0)-1;if(qn(n[f],i))return f}return-1}function x_(n){return n&&n.length?Tu(n):[]}function v_(n,i){return n&&n.length?Tu(n,Ie(i,2)):[]}function M_(n){var i=n==null?0:n.length;return i?Rn(n,1,i):[]}function S_(n,i,a){return n&&n.length?(i=a||i===t?1:Ye(i),Rn(n,0,i<0?0:i)):[]}function y_(n,i,a){var f=n==null?0:n.length;return f?(i=a||i===t?1:Ye(i),i=f-i,Rn(n,i<0?0:i,f)):[]}function b_(n,i){return n&&n.length?da(n,Ie(i,3),!1,!0):[]}function w_(n,i){return n&&n.length?da(n,Ie(i,3)):[]}var T_=$e(function(n){return Di(qt(n,1,Lt,!0))}),E_=$e(function(n){var i=Dn(n);return Lt(i)&&(i=t),Di(qt(n,1,Lt,!0),Ie(i,2))}),A_=$e(function(n){var i=Dn(n);return i=typeof i=="function"?i:t,Di(qt(n,1,Lt,!0),t,i)});function C_(n){return n&&n.length?Di(n):[]}function L_(n,i){return n&&n.length?Di(n,Ie(i,2)):[]}function R_(n,i){return i=typeof i=="function"?i:t,n&&n.length?Di(n,t,i):[]}function ll(n){if(!(n&&n.length))return[];var i=0;return n=Ei(n,function(a){if(Lt(a))return i=Ut(a.length,i),!0}),To(i,function(a){return yt(n,yo(a))})}function hf(n,i){if(!(n&&n.length))return[];var a=ll(n);return i==null?a:yt(a,function(f){return pn(i,t,f)})}var D_=$e(function(n,i){return Lt(n)?Ss(n,i):[]}),P_=$e(function(n){return Xo(Ei(n,Lt))}),I_=$e(function(n){var i=Dn(n);return Lt(i)&&(i=t),Xo(Ei(n,Lt),Ie(i,2))}),F_=$e(function(n){var i=Dn(n);return i=typeof i=="function"?i:t,Xo(Ei(n,Lt),t,i)}),N_=$e(ll);function O_(n,i){return Lu(n||[],i||[],Ms)}function U_(n,i){return Lu(n||[],i||[],ws)}var z_=$e(function(n){var i=n.length,a=i>1?n[i-1]:t;return a=typeof a=="function"?(n.pop(),a):t,hf(n,a)});function df(n){var i=S(n);return i.__chain__=!0,i}function B_(n,i){return i(n),n}function ya(n,i){return i(n)}var G_=ui(function(n){var i=n.length,a=i?n[0]:0,f=this.__wrapped__,x=function(y){return Io(y,n)};return i>1||this.__actions__.length||!(f instanceof Qe)||!fi(a)?this.thru(x):(f=f.slice(a,+a+(i?1:0)),f.__actions__.push({func:ya,args:[x],thisArg:t}),new Cn(f,this.__chain__).thru(function(y){return i&&!y.length&&y.push(t),y}))});function W_(){return df(this)}function V_(){return new Cn(this.value(),this.__chain__)}function H_(){this.__values__===t&&(this.__values__=Af(this.value()));var n=this.__index__>=this.__values__.length,i=n?t:this.__values__[this.__index__++];return{done:n,value:i}}function k_(){return this}function q_(n){for(var i,a=this;a instanceof oa;){var f=af(a);f.__index__=0,f.__values__=t,i?x.__wrapped__=f:i=f;var x=f;a=a.__wrapped__}return x.__wrapped__=n,i}function X_(){var n=this.__wrapped__;if(n instanceof Qe){var i=n;return this.__actions__.length&&(i=new Qe(this)),i=i.reverse(),i.__actions__.push({func:ya,args:[ol],thisArg:t}),new Cn(i,this.__chain__)}return this.thru(ol)}function Y_(){return Cu(this.__wrapped__,this.__actions__)}var Z_=pa(function(n,i,a){ht.call(n,a)?++n[a]:li(n,a,1)});function $_(n,i,a){var f=ke(n)?Wc:Bm;return a&&nn(n,i,a)&&(i=t),f(n,Ie(i,3))}function K_(n,i){var a=ke(n)?Ei:fu;return a(n,Ie(i,3))}var J_=Bu(of),Q_=Bu(lf);function j_(n,i){return qt(ba(n,i),1)}function e0(n,i){return qt(ba(n,i),le)}function t0(n,i,a){return a=a===t?1:Ye(a),qt(ba(n,i),a)}function pf(n,i){var a=ke(n)?En:Ri;return a(n,Ie(i,3))}function mf(n,i){var a=ke(n)?Mp:uu;return a(n,Ie(i,3))}var n0=pa(function(n,i,a){ht.call(n,a)?n[a].push(i):li(n,a,[i])});function i0(n,i,a,f){n=un(n)?n:Ur(n),a=a&&!f?Ye(a):0;var x=n.length;return a<0&&(a=Ut(x+a,0)),Ca(n)?a<=x&&n.indexOf(i,a)>-1:!!x&&Tr(n,i,a)>-1}var r0=$e(function(n,i,a){var f=-1,x=typeof i=="function",y=un(n)?Y(n.length):[];return Ri(n,function(D){y[++f]=x?pn(i,D,a):ys(D,i,a)}),y}),s0=pa(function(n,i,a){li(n,a,i)});function ba(n,i){var a=ke(n)?yt:_u;return a(n,Ie(i,3))}function a0(n,i,a,f){return n==null?[]:(ke(i)||(i=i==null?[]:[i]),a=f?t:a,ke(a)||(a=a==null?[]:[a]),Su(n,i,a))}var o0=pa(function(n,i,a){n[a?0:1].push(i)},function(){return[[],[]]});function l0(n,i,a){var f=ke(n)?Mo:qc,x=arguments.length<3;return f(n,Ie(i,4),a,x,Ri)}function c0(n,i,a){var f=ke(n)?Sp:qc,x=arguments.length<3;return f(n,Ie(i,4),a,x,uu)}function u0(n,i){var a=ke(n)?Ei:fu;return a(n,Ea(Ie(i,3)))}function f0(n){var i=ke(n)?au:ig;return i(n)}function h0(n,i,a){(a?nn(n,i,a):i===t)?i=1:i=Ye(i);var f=ke(n)?Fm:rg;return f(n,i)}function d0(n){var i=ke(n)?Nm:ag;return i(n)}function p0(n){if(n==null)return 0;if(un(n))return Ca(n)?Ar(n):n.length;var i=$t(n);return i==ut||i==Tt?n.size:Bo(n).length}function m0(n,i,a){var f=ke(n)?So:og;return a&&nn(n,i,a)&&(i=t),f(n,Ie(i,3))}var g0=$e(function(n,i){if(n==null)return[];var a=i.length;return a>1&&nn(n,i[0],i[1])?i=[]:a>2&&nn(i[0],i[1],i[2])&&(i=[i[0]]),Su(n,qt(i,1),[])}),wa=Kp||function(){return kt.Date.now()};function _0(n,i){if(typeof i!="function")throw new An(u);return n=Ye(n),function(){if(--n<1)return i.apply(this,arguments)}}function gf(n,i,a){return i=a?t:i,i=n&&i==null?n.length:i,ci(n,H,t,t,t,t,i)}function _f(n,i){var a;if(typeof i!="function")throw new An(u);return n=Ye(n),function(){return--n>0&&(a=i.apply(this,arguments)),n<=1&&(i=t),a}}var cl=$e(function(n,i,a){var f=p;if(a.length){var x=Ci(a,Nr(cl));f|=C}return ci(n,f,i,a,x)}),xf=$e(function(n,i,a){var f=p|w;if(a.length){var x=Ci(a,Nr(xf));f|=C}return ci(i,f,n,a,x)});function vf(n,i,a){i=a?t:i;var f=ci(n,I,t,t,t,t,t,i);return f.placeholder=vf.placeholder,f}function Mf(n,i,a){i=a?t:i;var f=ci(n,P,t,t,t,t,t,i);return f.placeholder=Mf.placeholder,f}function Sf(n,i,a){var f,x,y,D,F,B,ie=0,re=!1,oe=!1,_e=!0;if(typeof n!="function")throw new An(u);i=Pn(i)||0,wt(a)&&(re=!!a.leading,oe="maxWait"in a,y=oe?Ut(Pn(a.maxWait)||0,i):y,_e="trailing"in a?!!a.trailing:_e);function Ce(Rt){var Xn=f,pi=x;return f=x=t,ie=Rt,D=n.apply(pi,Xn),D}function Ne(Rt){return ie=Rt,F=As(Ke,i),re?Ce(Rt):D}function Ze(Rt){var Xn=Rt-B,pi=Rt-ie,Gf=i-Xn;return oe?Zt(Gf,y-pi):Gf}function Oe(Rt){var Xn=Rt-B,pi=Rt-ie;return B===t||Xn>=i||Xn<0||oe&&pi>=y}function Ke(){var Rt=wa();if(Oe(Rt))return nt(Rt);F=As(Ke,Ze(Rt))}function nt(Rt){return F=t,_e&&f?Ce(Rt):(f=x=t,D)}function xn(){F!==t&&Ru(F),ie=0,f=B=x=F=t}function rn(){return F===t?D:nt(wa())}function vn(){var Rt=wa(),Xn=Oe(Rt);if(f=arguments,x=this,B=Rt,Xn){if(F===t)return Ne(B);if(oe)return Ru(F),F=As(Ke,i),Ce(B)}return F===t&&(F=As(Ke,i)),D}return vn.cancel=xn,vn.flush=rn,vn}var x0=$e(function(n,i){return cu(n,1,i)}),v0=$e(function(n,i,a){return cu(n,Pn(i)||0,a)});function M0(n){return ci(n,N)}function Ta(n,i){if(typeof n!="function"||i!=null&&typeof i!="function")throw new An(u);var a=function(){var f=arguments,x=i?i.apply(this,f):f[0],y=a.cache;if(y.has(x))return y.get(x);var D=n.apply(this,f);return a.cache=y.set(x,D)||y,D};return a.cache=new(Ta.Cache||oi),a}Ta.Cache=oi;function Ea(n){if(typeof n!="function")throw new An(u);return function(){var i=arguments;switch(i.length){case 0:return!n.call(this);case 1:return!n.call(this,i[0]);case 2:return!n.call(this,i[0],i[1]);case 3:return!n.call(this,i[0],i[1],i[2])}return!n.apply(this,i)}}function S0(n){return _f(2,n)}var y0=lg(function(n,i){i=i.length==1&&ke(i[0])?yt(i[0],mn(Ie())):yt(qt(i,1),mn(Ie()));var a=i.length;return $e(function(f){for(var x=-1,y=Zt(f.length,a);++x<y;)f[x]=i[x].call(this,f[x]);return pn(n,this,f)})}),ul=$e(function(n,i){var a=Ci(i,Nr(ul));return ci(n,C,t,i,a)}),yf=$e(function(n,i){var a=Ci(i,Nr(yf));return ci(n,O,t,i,a)}),b0=ui(function(n,i){return ci(n,E,t,t,t,i)});function w0(n,i){if(typeof n!="function")throw new An(u);return i=i===t?i:Ye(i),$e(n,i)}function T0(n,i){if(typeof n!="function")throw new An(u);return i=i==null?0:Ut(Ye(i),0),$e(function(a){var f=a[i],x=Ii(a,0,i);return f&&Ai(x,f),pn(n,this,x)})}function E0(n,i,a){var f=!0,x=!0;if(typeof n!="function")throw new An(u);return wt(a)&&(f="leading"in a?!!a.leading:f,x="trailing"in a?!!a.trailing:x),Sf(n,i,{leading:f,maxWait:i,trailing:x})}function A0(n){return gf(n,1)}function C0(n,i){return ul(Zo(i),n)}function L0(){if(!arguments.length)return[];var n=arguments[0];return ke(n)?n:[n]}function R0(n){return Ln(n,M)}function D0(n,i){return i=typeof i=="function"?i:t,Ln(n,M,i)}function P0(n){return Ln(n,g|M)}function I0(n,i){return i=typeof i=="function"?i:t,Ln(n,g|M,i)}function F0(n,i){return i==null||lu(n,i,Gt(i))}function qn(n,i){return n===i||n!==n&&i!==i}var N0=xa(Oo),O0=xa(function(n,i){return n>=i}),ir=pu(function(){return arguments}())?pu:function(n){return At(n)&&ht.call(n,"callee")&&!eu.call(n,"callee")},ke=Y.isArray,U0=Nc?mn(Nc):qm;function un(n){return n!=null&&Aa(n.length)&&!hi(n)}function Lt(n){return At(n)&&un(n)}function z0(n){return n===!0||n===!1||At(n)&&tn(n)==Fe}var Fi=Qp||Sl,B0=Oc?mn(Oc):Xm;function G0(n){return At(n)&&n.nodeType===1&&!Cs(n)}function W0(n){if(n==null)return!0;if(un(n)&&(ke(n)||typeof n=="string"||typeof n.splice=="function"||Fi(n)||Or(n)||ir(n)))return!n.length;var i=$t(n);if(i==ut||i==Tt)return!n.size;if(Es(n))return!Bo(n).length;for(var a in n)if(ht.call(n,a))return!1;return!0}function V0(n,i){return bs(n,i)}function H0(n,i,a){a=typeof a=="function"?a:t;var f=a?a(n,i):t;return f===t?bs(n,i,t,a):!!f}function fl(n){if(!At(n))return!1;var i=tn(n);return i==st||i==Ee||typeof n.message=="string"&&typeof n.name=="string"&&!Cs(n)}function k0(n){return typeof n=="number"&&nu(n)}function hi(n){if(!wt(n))return!1;var i=tn(n);return i==qe||i==Pe||i==lt||i==ft}function bf(n){return typeof n=="number"&&n==Ye(n)}function Aa(n){return typeof n=="number"&&n>-1&&n%1==0&&n<=ee}function wt(n){var i=typeof n;return n!=null&&(i=="object"||i=="function")}function At(n){return n!=null&&typeof n=="object"}var wf=Uc?mn(Uc):Zm;function q0(n,i){return n===i||zo(n,i,tl(i))}function X0(n,i,a){return a=typeof a=="function"?a:t,zo(n,i,tl(i),a)}function Y0(n){return Tf(n)&&n!=+n}function Z0(n){if(Dg(n))throw new Ve(l);return mu(n)}function $0(n){return n===null}function K0(n){return n==null}function Tf(n){return typeof n=="number"||At(n)&&tn(n)==Nt}function Cs(n){if(!At(n)||tn(n)!=Dt)return!1;var i=ea(n);if(i===null)return!0;var a=ht.call(i,"constructor")&&i.constructor;return typeof a=="function"&&a instanceof a&&Ks.call(a)==Xp}var hl=zc?mn(zc):$m;function J0(n){return bf(n)&&n>=-ee&&n<=ee}var Ef=Bc?mn(Bc):Km;function Ca(n){return typeof n=="string"||!ke(n)&&At(n)&&tn(n)==L}function _n(n){return typeof n=="symbol"||At(n)&&tn(n)==T}var Or=Gc?mn(Gc):Jm;function Q0(n){return n===t}function j0(n){return At(n)&&$t(n)==fe}function ex(n){return At(n)&&tn(n)==me}var tx=xa(Go),nx=xa(function(n,i){return n<=i});function Af(n){if(!n)return[];if(un(n))return Ca(n)?Hn(n):cn(n);if(ms&&n[ms])return Fp(n[ms]());var i=$t(n),a=i==ut?Ao:i==Tt?Ys:Ur;return a(n)}function di(n){if(!n)return n===0?n:0;if(n=Pn(n),n===le||n===-le){var i=n<0?-1:1;return i*q}return n===n?n:0}function Ye(n){var i=di(n),a=i%1;return i===i?a?i-a:i:0}function Cf(n){return n?ji(Ye(n),0,ce):0}function Pn(n){if(typeof n=="number")return n;if(_n(n))return Z;if(wt(n)){var i=typeof n.valueOf=="function"?n.valueOf():n;n=wt(i)?i+"":i}if(typeof n!="string")return n===0?n:+n;n=Xc(n);var a=at.test(n);return a||tt.test(n)?_p(n.slice(2),a?2:8):We.test(n)?Z:+n}function Lf(n){return ei(n,fn(n))}function ix(n){return n?ji(Ye(n),-ee,ee):n===0?n:0}function ct(n){return n==null?"":gn(n)}var rx=Ir(function(n,i){if(Es(i)||un(i)){ei(i,Gt(i),n);return}for(var a in i)ht.call(i,a)&&Ms(n,a,i[a])}),Rf=Ir(function(n,i){ei(i,fn(i),n)}),La=Ir(function(n,i,a,f){ei(i,fn(i),n,f)}),sx=Ir(function(n,i,a,f){ei(i,Gt(i),n,f)}),ax=ui(Io);function ox(n,i){var a=Pr(n);return i==null?a:ou(a,i)}var lx=$e(function(n,i){n=pt(n);var a=-1,f=i.length,x=f>2?i[2]:t;for(x&&nn(i[0],i[1],x)&&(f=1);++a<f;)for(var y=i[a],D=fn(y),F=-1,B=D.length;++F<B;){var ie=D[F],re=n[ie];(re===t||qn(re,Lr[ie])&&!ht.call(n,ie))&&(n[ie]=y[ie])}return n}),cx=$e(function(n){return n.push(t,Xu),pn(Df,t,n)});function ux(n,i){return Vc(n,Ie(i,3),jn)}function fx(n,i){return Vc(n,Ie(i,3),No)}function hx(n,i){return n==null?n:Fo(n,Ie(i,3),fn)}function dx(n,i){return n==null?n:hu(n,Ie(i,3),fn)}function px(n,i){return n&&jn(n,Ie(i,3))}function mx(n,i){return n&&No(n,Ie(i,3))}function gx(n){return n==null?[]:ua(n,Gt(n))}function _x(n){return n==null?[]:ua(n,fn(n))}function dl(n,i,a){var f=n==null?t:er(n,i);return f===t?a:f}function xx(n,i){return n!=null&&$u(n,i,Wm)}function pl(n,i){return n!=null&&$u(n,i,Vm)}var vx=Wu(function(n,i,a){i!=null&&typeof i.toString!="function"&&(i=Js.call(i)),n[i]=a},gl(hn)),Mx=Wu(function(n,i,a){i!=null&&typeof i.toString!="function"&&(i=Js.call(i)),ht.call(n,i)?n[i].push(a):n[i]=[a]},Ie),Sx=$e(ys);function Gt(n){return un(n)?su(n):Bo(n)}function fn(n){return un(n)?su(n,!0):Qm(n)}function yx(n,i){var a={};return i=Ie(i,3),jn(n,function(f,x,y){li(a,i(f,x,y),f)}),a}function bx(n,i){var a={};return i=Ie(i,3),jn(n,function(f,x,y){li(a,x,i(f,x,y))}),a}var wx=Ir(function(n,i,a){fa(n,i,a)}),Df=Ir(function(n,i,a,f){fa(n,i,a,f)}),Tx=ui(function(n,i){var a={};if(n==null)return a;var f=!1;i=yt(i,function(y){return y=Pi(y,n),f||(f=y.length>1),y}),ei(n,jo(n),a),f&&(a=Ln(a,g|_|M,vg));for(var x=i.length;x--;)qo(a,i[x]);return a});function Ex(n,i){return Pf(n,Ea(Ie(i)))}var Ax=ui(function(n,i){return n==null?{}:eg(n,i)});function Pf(n,i){if(n==null)return{};var a=yt(jo(n),function(f){return[f]});return i=Ie(i),yu(n,a,function(f,x){return i(f,x[0])})}function Cx(n,i,a){i=Pi(i,n);var f=-1,x=i.length;for(x||(x=1,n=t);++f<x;){var y=n==null?t:n[ti(i[f])];y===t&&(f=x,y=a),n=hi(y)?y.call(n):y}return n}function Lx(n,i,a){return n==null?n:ws(n,i,a)}function Rx(n,i,a,f){return f=typeof f=="function"?f:t,n==null?n:ws(n,i,a,f)}var If=ku(Gt),Ff=ku(fn);function Dx(n,i,a){var f=ke(n),x=f||Fi(n)||Or(n);if(i=Ie(i,4),a==null){var y=n&&n.constructor;x?a=f?new y:[]:wt(n)?a=hi(y)?Pr(ea(n)):{}:a={}}return(x?En:jn)(n,function(D,F,B){return i(a,D,F,B)}),a}function Px(n,i){return n==null?!0:qo(n,i)}function Ix(n,i,a){return n==null?n:Au(n,i,Zo(a))}function Fx(n,i,a,f){return f=typeof f=="function"?f:t,n==null?n:Au(n,i,Zo(a),f)}function Ur(n){return n==null?[]:Eo(n,Gt(n))}function Nx(n){return n==null?[]:Eo(n,fn(n))}function Ox(n,i,a){return a===t&&(a=i,i=t),a!==t&&(a=Pn(a),a=a===a?a:0),i!==t&&(i=Pn(i),i=i===i?i:0),ji(Pn(n),i,a)}function Ux(n,i,a){return i=di(i),a===t?(a=i,i=0):a=di(a),n=Pn(n),Hm(n,i,a)}function zx(n,i,a){if(a&&typeof a!="boolean"&&nn(n,i,a)&&(i=a=t),a===t&&(typeof i=="boolean"?(a=i,i=t):typeof n=="boolean"&&(a=n,n=t)),n===t&&i===t?(n=0,i=1):(n=di(n),i===t?(i=n,n=0):i=di(i)),n>i){var f=n;n=i,i=f}if(a||n%1||i%1){var x=iu();return Zt(n+x*(i-n+gp("1e-"+((x+"").length-1))),i)}return Vo(n,i)}var Bx=Fr(function(n,i,a){return i=i.toLowerCase(),n+(a?Nf(i):i)});function Nf(n){return ml(ct(n).toLowerCase())}function Of(n){return n=ct(n),n&&n.replace(ri,Lp).replace(ap,"")}function Gx(n,i,a){n=ct(n),i=gn(i);var f=n.length;a=a===t?f:ji(Ye(a),0,f);var x=a;return a-=i.length,a>=0&&n.slice(a,x)==i}function Wx(n){return n=ct(n),n&&bt.test(n)?n.replace(je,Rp):n}function Vx(n){return n=ct(n),n&&uo.test(n)?n.replace(Sr,"\\$&"):n}var Hx=Fr(function(n,i,a){return n+(a?"-":"")+i.toLowerCase()}),kx=Fr(function(n,i,a){return n+(a?" ":"")+i.toLowerCase()}),qx=zu("toLowerCase");function Xx(n,i,a){n=ct(n),i=Ye(i);var f=i?Ar(n):0;if(!i||f>=i)return n;var x=(i-f)/2;return _a(ra(x),a)+n+_a(ia(x),a)}function Yx(n,i,a){n=ct(n),i=Ye(i);var f=i?Ar(n):0;return i&&f<i?n+_a(i-f,a):n}function Zx(n,i,a){n=ct(n),i=Ye(i);var f=i?Ar(n):0;return i&&f<i?_a(i-f,a)+n:n}function $x(n,i,a){return a||i==null?i=0:i&&(i=+i),nm(ct(n).replace(fs,""),i||0)}function Kx(n,i,a){return(a?nn(n,i,a):i===t)?i=1:i=Ye(i),Ho(ct(n),i)}function Jx(){var n=arguments,i=ct(n[0]);return n.length<3?i:i.replace(n[1],n[2])}var Qx=Fr(function(n,i,a){return n+(a?"_":"")+i.toLowerCase()});function jx(n,i,a){return a&&typeof a!="number"&&nn(n,i,a)&&(i=a=t),a=a===t?ce:a>>>0,a?(n=ct(n),n&&(typeof i=="string"||i!=null&&!hl(i))&&(i=gn(i),!i&&Er(n))?Ii(Hn(n),0,a):n.split(i,a)):[]}var ev=Fr(function(n,i,a){return n+(a?" ":"")+ml(i)});function tv(n,i,a){return n=ct(n),a=a==null?0:ji(Ye(a),0,n.length),i=gn(i),n.slice(a,a+i.length)==i}function nv(n,i,a){var f=S.templateSettings;a&&nn(n,i,a)&&(i=t),n=ct(n),i=La({},i,f,qu);var x=La({},i.imports,f.imports,qu),y=Gt(x),D=Eo(x,y),F,B,ie=0,re=i.interpolate||Wn,oe="__p += '",_e=Co((i.escape||Wn).source+"|"+re.source+"|"+(re===wn?Ge:Wn).source+"|"+(i.evaluate||Wn).source+"|$","g"),Ce="//# sourceURL="+(ht.call(i,"sourceURL")?(i.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++fp+"]")+`
`;n.replace(_e,function(Oe,Ke,nt,xn,rn,vn){return nt||(nt=xn),oe+=n.slice(ie,vn).replace(bi,Dp),Ke&&(F=!0,oe+=`' +
__e(`+Ke+`) +
'`),rn&&(B=!0,oe+=`';
`+rn+`;
__p += '`),nt&&(oe+=`' +
((__t = (`+nt+`)) == null ? '' : __t) +
'`),ie=vn+Oe.length,Oe}),oe+=`';
`;var Ne=ht.call(i,"variable")&&i.variable;if(!Ne)oe=`with (obj) {
`+oe+`
}
`;else if(ne.test(Ne))throw new Ve(c);oe=(B?oe.replace(Se,""):oe).replace(Q,"$1").replace(Me,"$1;"),oe="function("+(Ne||"obj")+`) {
`+(Ne?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(F?", __e = _.escape":"")+(B?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+oe+`return __p
}`;var Ze=zf(function(){return ot(y,Ce+"return "+oe).apply(t,D)});if(Ze.source=oe,fl(Ze))throw Ze;return Ze}function iv(n){return ct(n).toLowerCase()}function rv(n){return ct(n).toUpperCase()}function sv(n,i,a){if(n=ct(n),n&&(a||i===t))return Xc(n);if(!n||!(i=gn(i)))return n;var f=Hn(n),x=Hn(i),y=Yc(f,x),D=Zc(f,x)+1;return Ii(f,y,D).join("")}function av(n,i,a){if(n=ct(n),n&&(a||i===t))return n.slice(0,Kc(n)+1);if(!n||!(i=gn(i)))return n;var f=Hn(n),x=Zc(f,Hn(i))+1;return Ii(f,0,x).join("")}function ov(n,i,a){if(n=ct(n),n&&(a||i===t))return n.replace(fs,"");if(!n||!(i=gn(i)))return n;var f=Hn(n),x=Yc(f,Hn(i));return Ii(f,x).join("")}function lv(n,i){var a=X,f=ue;if(wt(i)){var x="separator"in i?i.separator:x;a="length"in i?Ye(i.length):a,f="omission"in i?gn(i.omission):f}n=ct(n);var y=n.length;if(Er(n)){var D=Hn(n);y=D.length}if(a>=y)return n;var F=a-Ar(f);if(F<1)return f;var B=D?Ii(D,0,F).join(""):n.slice(0,F);if(x===t)return B+f;if(D&&(F+=B.length-F),hl(x)){if(n.slice(F).search(x)){var ie,re=B;for(x.global||(x=Co(x.source,ct(Xe.exec(x))+"g")),x.lastIndex=0;ie=x.exec(re);)var oe=ie.index;B=B.slice(0,oe===t?F:oe)}}else if(n.indexOf(gn(x),F)!=F){var _e=B.lastIndexOf(x);_e>-1&&(B=B.slice(0,_e))}return B+f}function cv(n){return n=ct(n),n&&It.test(n)?n.replace(ve,zp):n}var uv=Fr(function(n,i,a){return n+(a?" ":"")+i.toUpperCase()}),ml=zu("toUpperCase");function Uf(n,i,a){return n=ct(n),i=a?t:i,i===t?Ip(n)?Wp(n):wp(n):n.match(i)||[]}var zf=$e(function(n,i){try{return pn(n,t,i)}catch(a){return fl(a)?a:new Ve(a)}}),fv=ui(function(n,i){return En(i,function(a){a=ti(a),li(n,a,cl(n[a],n))}),n});function hv(n){var i=n==null?0:n.length,a=Ie();return n=i?yt(n,function(f){if(typeof f[1]!="function")throw new An(u);return[a(f[0]),f[1]]}):[],$e(function(f){for(var x=-1;++x<i;){var y=n[x];if(pn(y[0],this,f))return pn(y[1],this,f)}})}function dv(n){return zm(Ln(n,g))}function gl(n){return function(){return n}}function pv(n,i){return n==null||n!==n?i:n}var mv=Gu(),gv=Gu(!0);function hn(n){return n}function _l(n){return gu(typeof n=="function"?n:Ln(n,g))}function _v(n){return xu(Ln(n,g))}function xv(n,i){return vu(n,Ln(i,g))}var vv=$e(function(n,i){return function(a){return ys(a,n,i)}}),Mv=$e(function(n,i){return function(a){return ys(n,a,i)}});function xl(n,i,a){var f=Gt(i),x=ua(i,f);a==null&&!(wt(i)&&(x.length||!f.length))&&(a=i,i=n,n=this,x=ua(i,Gt(i)));var y=!(wt(a)&&"chain"in a)||!!a.chain,D=hi(n);return En(x,function(F){var B=i[F];n[F]=B,D&&(n.prototype[F]=function(){var ie=this.__chain__;if(y||ie){var re=n(this.__wrapped__),oe=re.__actions__=cn(this.__actions__);return oe.push({func:B,args:arguments,thisArg:n}),re.__chain__=ie,re}return B.apply(n,Ai([this.value()],arguments))})}),n}function Sv(){return kt._===this&&(kt._=Yp),this}function vl(){}function yv(n){return n=Ye(n),$e(function(i){return Mu(i,n)})}var bv=Ko(yt),wv=Ko(Wc),Tv=Ko(So);function Bf(n){return il(n)?yo(ti(n)):tg(n)}function Ev(n){return function(i){return n==null?t:er(n,i)}}var Av=Vu(),Cv=Vu(!0);function Ml(){return[]}function Sl(){return!1}function Lv(){return{}}function Rv(){return""}function Dv(){return!0}function Pv(n,i){if(n=Ye(n),n<1||n>ee)return[];var a=ce,f=Zt(n,ce);i=Ie(i),n-=ce;for(var x=To(f,i);++a<n;)i(a);return x}function Iv(n){return ke(n)?yt(n,ti):_n(n)?[n]:cn(sf(ct(n)))}function Fv(n){var i=++qp;return ct(n)+i}var Nv=ga(function(n,i){return n+i},0),Ov=Jo("ceil"),Uv=ga(function(n,i){return n/i},1),zv=Jo("floor");function Bv(n){return n&&n.length?ca(n,hn,Oo):t}function Gv(n,i){return n&&n.length?ca(n,Ie(i,2),Oo):t}function Wv(n){return kc(n,hn)}function Vv(n,i){return kc(n,Ie(i,2))}function Hv(n){return n&&n.length?ca(n,hn,Go):t}function kv(n,i){return n&&n.length?ca(n,Ie(i,2),Go):t}var qv=ga(function(n,i){return n*i},1),Xv=Jo("round"),Yv=ga(function(n,i){return n-i},0);function Zv(n){return n&&n.length?wo(n,hn):0}function $v(n,i){return n&&n.length?wo(n,Ie(i,2)):0}return S.after=_0,S.ary=gf,S.assign=rx,S.assignIn=Rf,S.assignInWith=La,S.assignWith=sx,S.at=ax,S.before=_f,S.bind=cl,S.bindAll=fv,S.bindKey=xf,S.castArray=L0,S.chain=df,S.chunk=zg,S.compact=Bg,S.concat=Gg,S.cond=hv,S.conforms=dv,S.constant=gl,S.countBy=Z_,S.create=ox,S.curry=vf,S.curryRight=Mf,S.debounce=Sf,S.defaults=lx,S.defaultsDeep=cx,S.defer=x0,S.delay=v0,S.difference=Wg,S.differenceBy=Vg,S.differenceWith=Hg,S.drop=kg,S.dropRight=qg,S.dropRightWhile=Xg,S.dropWhile=Yg,S.fill=Zg,S.filter=K_,S.flatMap=j_,S.flatMapDeep=e0,S.flatMapDepth=t0,S.flatten=cf,S.flattenDeep=$g,S.flattenDepth=Kg,S.flip=M0,S.flow=mv,S.flowRight=gv,S.fromPairs=Jg,S.functions=gx,S.functionsIn=_x,S.groupBy=n0,S.initial=jg,S.intersection=e_,S.intersectionBy=t_,S.intersectionWith=n_,S.invert=vx,S.invertBy=Mx,S.invokeMap=r0,S.iteratee=_l,S.keyBy=s0,S.keys=Gt,S.keysIn=fn,S.map=ba,S.mapKeys=yx,S.mapValues=bx,S.matches=_v,S.matchesProperty=xv,S.memoize=Ta,S.merge=wx,S.mergeWith=Df,S.method=vv,S.methodOf=Mv,S.mixin=xl,S.negate=Ea,S.nthArg=yv,S.omit=Tx,S.omitBy=Ex,S.once=S0,S.orderBy=a0,S.over=bv,S.overArgs=y0,S.overEvery=wv,S.overSome=Tv,S.partial=ul,S.partialRight=yf,S.partition=o0,S.pick=Ax,S.pickBy=Pf,S.property=Bf,S.propertyOf=Ev,S.pull=a_,S.pullAll=ff,S.pullAllBy=o_,S.pullAllWith=l_,S.pullAt=c_,S.range=Av,S.rangeRight=Cv,S.rearg=b0,S.reject=u0,S.remove=u_,S.rest=w0,S.reverse=ol,S.sampleSize=h0,S.set=Lx,S.setWith=Rx,S.shuffle=d0,S.slice=f_,S.sortBy=g0,S.sortedUniq=x_,S.sortedUniqBy=v_,S.split=jx,S.spread=T0,S.tail=M_,S.take=S_,S.takeRight=y_,S.takeRightWhile=b_,S.takeWhile=w_,S.tap=B_,S.throttle=E0,S.thru=ya,S.toArray=Af,S.toPairs=If,S.toPairsIn=Ff,S.toPath=Iv,S.toPlainObject=Lf,S.transform=Dx,S.unary=A0,S.union=T_,S.unionBy=E_,S.unionWith=A_,S.uniq=C_,S.uniqBy=L_,S.uniqWith=R_,S.unset=Px,S.unzip=ll,S.unzipWith=hf,S.update=Ix,S.updateWith=Fx,S.values=Ur,S.valuesIn=Nx,S.without=D_,S.words=Uf,S.wrap=C0,S.xor=P_,S.xorBy=I_,S.xorWith=F_,S.zip=N_,S.zipObject=O_,S.zipObjectDeep=U_,S.zipWith=z_,S.entries=If,S.entriesIn=Ff,S.extend=Rf,S.extendWith=La,xl(S,S),S.add=Nv,S.attempt=zf,S.camelCase=Bx,S.capitalize=Nf,S.ceil=Ov,S.clamp=Ox,S.clone=R0,S.cloneDeep=P0,S.cloneDeepWith=I0,S.cloneWith=D0,S.conformsTo=F0,S.deburr=Of,S.defaultTo=pv,S.divide=Uv,S.endsWith=Gx,S.eq=qn,S.escape=Wx,S.escapeRegExp=Vx,S.every=$_,S.find=J_,S.findIndex=of,S.findKey=ux,S.findLast=Q_,S.findLastIndex=lf,S.findLastKey=fx,S.floor=zv,S.forEach=pf,S.forEachRight=mf,S.forIn=hx,S.forInRight=dx,S.forOwn=px,S.forOwnRight=mx,S.get=dl,S.gt=N0,S.gte=O0,S.has=xx,S.hasIn=pl,S.head=uf,S.identity=hn,S.includes=i0,S.indexOf=Qg,S.inRange=Ux,S.invoke=Sx,S.isArguments=ir,S.isArray=ke,S.isArrayBuffer=U0,S.isArrayLike=un,S.isArrayLikeObject=Lt,S.isBoolean=z0,S.isBuffer=Fi,S.isDate=B0,S.isElement=G0,S.isEmpty=W0,S.isEqual=V0,S.isEqualWith=H0,S.isError=fl,S.isFinite=k0,S.isFunction=hi,S.isInteger=bf,S.isLength=Aa,S.isMap=wf,S.isMatch=q0,S.isMatchWith=X0,S.isNaN=Y0,S.isNative=Z0,S.isNil=K0,S.isNull=$0,S.isNumber=Tf,S.isObject=wt,S.isObjectLike=At,S.isPlainObject=Cs,S.isRegExp=hl,S.isSafeInteger=J0,S.isSet=Ef,S.isString=Ca,S.isSymbol=_n,S.isTypedArray=Or,S.isUndefined=Q0,S.isWeakMap=j0,S.isWeakSet=ex,S.join=i_,S.kebabCase=Hx,S.last=Dn,S.lastIndexOf=r_,S.lowerCase=kx,S.lowerFirst=qx,S.lt=tx,S.lte=nx,S.max=Bv,S.maxBy=Gv,S.mean=Wv,S.meanBy=Vv,S.min=Hv,S.minBy=kv,S.stubArray=Ml,S.stubFalse=Sl,S.stubObject=Lv,S.stubString=Rv,S.stubTrue=Dv,S.multiply=qv,S.nth=s_,S.noConflict=Sv,S.noop=vl,S.now=wa,S.pad=Xx,S.padEnd=Yx,S.padStart=Zx,S.parseInt=$x,S.random=zx,S.reduce=l0,S.reduceRight=c0,S.repeat=Kx,S.replace=Jx,S.result=Cx,S.round=Xv,S.runInContext=U,S.sample=f0,S.size=p0,S.snakeCase=Qx,S.some=m0,S.sortedIndex=h_,S.sortedIndexBy=d_,S.sortedIndexOf=p_,S.sortedLastIndex=m_,S.sortedLastIndexBy=g_,S.sortedLastIndexOf=__,S.startCase=ev,S.startsWith=tv,S.subtract=Yv,S.sum=Zv,S.sumBy=$v,S.template=nv,S.times=Pv,S.toFinite=di,S.toInteger=Ye,S.toLength=Cf,S.toLower=iv,S.toNumber=Pn,S.toSafeInteger=ix,S.toString=ct,S.toUpper=rv,S.trim=sv,S.trimEnd=av,S.trimStart=ov,S.truncate=lv,S.unescape=cv,S.uniqueId=Fv,S.upperCase=uv,S.upperFirst=ml,S.each=pf,S.eachRight=mf,S.first=uf,xl(S,function(){var n={};return jn(S,function(i,a){ht.call(S.prototype,a)||(n[a]=i)}),n}(),{chain:!1}),S.VERSION=r,En(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){S[n].placeholder=S}),En(["drop","take"],function(n,i){Qe.prototype[n]=function(a){a=a===t?1:Ut(Ye(a),0);var f=this.__filtered__&&!i?new Qe(this):this.clone();return f.__filtered__?f.__takeCount__=Zt(a,f.__takeCount__):f.__views__.push({size:Zt(a,ce),type:n+(f.__dir__<0?"Right":"")}),f},Qe.prototype[n+"Right"]=function(a){return this.reverse()[n](a).reverse()}}),En(["filter","map","takeWhile"],function(n,i){var a=i+1,f=a==k||a==he;Qe.prototype[n]=function(x){var y=this.clone();return y.__iteratees__.push({iteratee:Ie(x,3),type:a}),y.__filtered__=y.__filtered__||f,y}}),En(["head","last"],function(n,i){var a="take"+(i?"Right":"");Qe.prototype[n]=function(){return this[a](1).value()[0]}}),En(["initial","tail"],function(n,i){var a="drop"+(i?"":"Right");Qe.prototype[n]=function(){return this.__filtered__?new Qe(this):this[a](1)}}),Qe.prototype.compact=function(){return this.filter(hn)},Qe.prototype.find=function(n){return this.filter(n).head()},Qe.prototype.findLast=function(n){return this.reverse().find(n)},Qe.prototype.invokeMap=$e(function(n,i){return typeof n=="function"?new Qe(this):this.map(function(a){return ys(a,n,i)})}),Qe.prototype.reject=function(n){return this.filter(Ea(Ie(n)))},Qe.prototype.slice=function(n,i){n=Ye(n);var a=this;return a.__filtered__&&(n>0||i<0)?new Qe(a):(n<0?a=a.takeRight(-n):n&&(a=a.drop(n)),i!==t&&(i=Ye(i),a=i<0?a.dropRight(-i):a.take(i-n)),a)},Qe.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Qe.prototype.toArray=function(){return this.take(ce)},jn(Qe.prototype,function(n,i){var a=/^(?:filter|find|map|reject)|While$/.test(i),f=/^(?:head|last)$/.test(i),x=S[f?"take"+(i=="last"?"Right":""):i],y=f||/^find/.test(i);!x||(S.prototype[i]=function(){var D=this.__wrapped__,F=f?[1]:arguments,B=D instanceof Qe,ie=F[0],re=B||ke(D),oe=function(Ke){var nt=x.apply(S,Ai([Ke],F));return f&&_e?nt[0]:nt};re&&a&&typeof ie=="function"&&ie.length!=1&&(B=re=!1);var _e=this.__chain__,Ce=!!this.__actions__.length,Ne=y&&!_e,Ze=B&&!Ce;if(!y&&re){D=Ze?D:new Qe(this);var Oe=n.apply(D,F);return Oe.__actions__.push({func:ya,args:[oe],thisArg:t}),new Cn(Oe,_e)}return Ne&&Ze?n.apply(this,F):(Oe=this.thru(oe),Ne?f?Oe.value()[0]:Oe.value():Oe)})}),En(["pop","push","shift","sort","splice","unshift"],function(n){var i=Zs[n],a=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",f=/^(?:pop|shift)$/.test(n);S.prototype[n]=function(){var x=arguments;if(f&&!this.__chain__){var y=this.value();return i.apply(ke(y)?y:[],x)}return this[a](function(D){return i.apply(ke(D)?D:[],x)})}}),jn(Qe.prototype,function(n,i){var a=S[i];if(a){var f=a.name+"";ht.call(Dr,f)||(Dr[f]=[]),Dr[f].push({name:i,func:a})}}),Dr[ma(t,w).name]=[{name:"wrapper",func:t}],Qe.prototype.clone=cm,Qe.prototype.reverse=um,Qe.prototype.value=fm,S.prototype.at=G_,S.prototype.chain=W_,S.prototype.commit=V_,S.prototype.next=H_,S.prototype.plant=q_,S.prototype.reverse=X_,S.prototype.toJSON=S.prototype.valueOf=S.prototype.value=Y_,S.prototype.first=S.prototype.head,ms&&(S.prototype[ms]=k_),S},Cr=Vp();$i?(($i.exports=Cr)._=Cr,_o._=Cr):kt._=Cr}).call(Ls)})(Yi,Yi.exports);const dd={orbiting:{name:"orbiting",config:{mass:{g:1,orbiter:10,attractor:30},distance:{min:50,max:250}}},wandering:{name:"wandering",config:{jitter:.3}}},oM=new Set(["centerScaling","edgeBinding"]),lM=o=>typeof o=="string"&&o in dd,cM=o=>typeof o=="string"&&oM.has(o);const uM=o=>{for(let e=o.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1)),r=o[e];o[e]=o[t],o[t]=r}},fM=()=>Boolean(Math.round(Math.random())),hM=o=>new Array(o).fill(0),yl=(o,e=1)=>{let t=e*e;const r=hM(o).map(()=>{const s=Math.random()*Math.sqrt(t);return t-=s*s,fM()?s:-s});return uM(r),r},dM=({dimensions:o,position:e,velocity:t,acceleration:r})=>({dimensions:o,position:[...e],velocity:[...t],acceleration:[...r]}),pM=(o,e,t)=>Yi.exports.times(t,()=>pd(o,e)),mM=(o,e,t)=>t.map(r=>gM(o,e,r)),pd=(o,e)=>({dimensions:o,position:yl(o,e/2),velocity:yl(o,.5),acceleration:yl(o,.5)}),gM=(o,e,t)=>{const r=pd(o,e);return r.position=bl(r.position,t.position),r.velocity=bl(r.velocity,t.velocity),r.acceleration=bl(r.acceleration,t.acceleration),r},bl=(o,e)=>o.map((t,r)=>{const s=e[r];return s!==void 0?s:t});function _M(){return new Worker("/assets/SimulationWorker.ebe3b26a.js")}const xM=()=>{const o={},e=window.location.hash;return e.startsWith("#")&&e.slice(1).split("&").forEach(s=>{const[l,u]=s.split("=");l&&u&&(o[l]=vM(u)?Number(u):u)}),o},vM=o=>{const e=Number(o);return!Number.isNaN(e)};/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gc="144",MM=0,Vf=1,SM=2,md=1,yM=2,Is=3,is=0,Un=1,Vi=2,qi=0,ts=1,Ns=2,Hf=3,kf=4,bM=5,jr=100,wM=101,TM=102,qf=103,Xf=104,EM=200,AM=201,CM=202,LM=203,gd=204,_d=205,RM=206,DM=207,PM=208,IM=209,FM=210,NM=0,OM=1,UM=2,sc=3,zM=4,BM=5,GM=6,WM=7,xd=0,VM=1,HM=2,yi=0,kM=1,qM=2,XM=3,YM=4,ZM=5,vd=300,rs=301,ss=302,ac=303,oc=304,so=306,lc=1e3,Jn=1001,cc=1002,dn=1003,Yf=1004,Zf=1005,Fn=1006,$M=1007,ao=1008,gr=1009,KM=1010,JM=1011,Md=1012,QM=1013,fr=1014,hr=1015,Os=1016,jM=1017,eS=1018,ns=1020,tS=1021,nS=1022,ii=1023,iS=1024,rS=1025,pr=1026,as=1027,sS=1028,aS=1029,oS=1030,lS=1031,cS=1033,wl=33776,Tl=33777,El=33778,Al=33779,$f=35840,Kf=35841,Jf=35842,Qf=35843,uS=36196,jf=37492,eh=37496,th=37808,nh=37809,ih=37810,rh=37811,sh=37812,ah=37813,oh=37814,lh=37815,ch=37816,uh=37817,fh=37818,hh=37819,dh=37820,ph=37821,mh=36492,_r=3e3,Ct=3001,fS=3200,hS=3201,dS=0,pS=1,Mi="srgb",dr="srgb-linear",Cl=7680,mS=519,gh=35044,Sd=35048,_h="300 es",uc=1035;class ls{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const l=s.indexOf(t);l!==-1&&s.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const s=r.slice(0);for(let l=0,u=s.length;l<u;l++)s[l].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ll=Math.PI/180,xh=180/Math.PI;function Us(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Kt[o&255]+Kt[o>>8&255]+Kt[o>>16&255]+Kt[o>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[r&255]+Kt[r>>8&255]+Kt[r>>16&255]+Kt[r>>24&255]).toLowerCase()}function bn(o,e,t){return Math.max(e,Math.min(t,o))}function gS(o,e){return(o%e+e)%e}function Rl(o,e,t){return(1-t)*o+t*e}function vh(o){return(o&o-1)===0&&o!==0}function fc(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function Da(o,e){switch(e.constructor){case Float32Array:return o;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Mn(o,e){switch(e.constructor){case Float32Array:return o;case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class gt{constructor(e=0,t=0){gt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6],this.y=s[1]*t+s[4]*r+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),s=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*s+e.x,this.y=l*s+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class On{constructor(){On.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,r,s,l,u,c,d,h){const m=this.elements;return m[0]=e,m[1]=s,m[2]=c,m[3]=t,m[4]=l,m[5]=d,m[6]=r,m[7]=u,m[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,l=this.elements,u=r[0],c=r[3],d=r[6],h=r[1],m=r[4],g=r[7],_=r[2],M=r[5],b=r[8],v=s[0],p=s[3],w=s[6],R=s[1],I=s[4],P=s[7],C=s[2],O=s[5],H=s[8];return l[0]=u*v+c*R+d*C,l[3]=u*p+c*I+d*O,l[6]=u*w+c*P+d*H,l[1]=h*v+m*R+g*C,l[4]=h*p+m*I+g*O,l[7]=h*w+m*P+g*H,l[2]=_*v+M*R+b*C,l[5]=_*p+M*I+b*O,l[8]=_*w+M*P+b*H,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8];return t*u*m-t*c*h-r*l*m+r*c*d+s*l*h-s*u*d}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8],g=m*u-c*h,_=c*d-m*l,M=h*l-u*d,b=t*g+r*_+s*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/b;return e[0]=g*v,e[1]=(s*h-m*r)*v,e[2]=(c*r-s*u)*v,e[3]=_*v,e[4]=(m*t-s*d)*v,e[5]=(s*l-c*t)*v,e[6]=M*v,e[7]=(r*d-h*t)*v,e[8]=(u*t-r*l)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,s,l,u,c){const d=Math.cos(l),h=Math.sin(l);return this.set(r*d,r*h,-r*(d*u+h*c)+u+e,-s*h,s*d,-s*(-h*u+d*c)+c+t,0,0,1),this}scale(e,t){const r=this.elements;return r[0]*=e,r[3]*=e,r[6]*=e,r[1]*=t,r[4]*=t,r[7]*=t,this}rotate(e){const t=Math.cos(e),r=Math.sin(e),s=this.elements,l=s[0],u=s[3],c=s[6],d=s[1],h=s[4],m=s[7];return s[0]=t*l+r*d,s[3]=t*u+r*h,s[6]=t*c+r*m,s[1]=-r*l+t*d,s[4]=-r*u+t*h,s[7]=-r*c+t*m,this}translate(e,t){const r=this.elements;return r[0]+=e*r[2],r[3]+=e*r[5],r[6]+=e*r[8],r[1]+=t*r[2],r[4]+=t*r[5],r[7]+=t*r[8],this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<9;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}function yd(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function io(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function mr(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function to(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}const Dl={[Mi]:{[dr]:mr},[dr]:{[Mi]:to}},Yn={legacyMode:!0,get workingColorSpace(){return dr},set workingColorSpace(o){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(o,e,t){if(this.legacyMode||e===t||!e||!t)return o;if(Dl[e]&&Dl[e][t]!==void 0){const r=Dl[e][t];return o.r=r(o.r),o.g=r(o.g),o.b=r(o.b),o}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(o,e){return this.convert(o,this.workingColorSpace,e)},toWorkingColorSpace:function(o,e){return this.convert(o,e,this.workingColorSpace)}},bd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zt={r:0,g:0,b:0},Zn={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function Pl(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}function Ia(o,e){return e.r=o.r,e.g=o.g,e.b=o.b,e}class vt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&r===void 0?this.set(e):this.setRGB(e,t,r)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Yn.toWorkingColorSpace(this,t),this}setRGB(e,t,r,s=dr){return this.r=e,this.g=t,this.b=r,Yn.toWorkingColorSpace(this,s),this}setHSL(e,t,r,s=dr){if(e=gS(e,1),t=bn(t,0,1),r=bn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=Pl(u,l,e+1/3),this.g=Pl(u,l,e),this.b=Pl(u,l,e-1/3)}return Yn.toWorkingColorSpace(this,s),this}setStyle(e,t=Mi){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let l;const u=s[1],c=s[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return this.r=Math.min(255,parseInt(l[1],10))/255,this.g=Math.min(255,parseInt(l[2],10))/255,this.b=Math.min(255,parseInt(l[3],10))/255,Yn.toWorkingColorSpace(this,t),r(l[4]),this;if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return this.r=Math.min(100,parseInt(l[1],10))/100,this.g=Math.min(100,parseInt(l[2],10))/100,this.b=Math.min(100,parseInt(l[3],10))/100,Yn.toWorkingColorSpace(this,t),r(l[4]),this;break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c)){const d=parseFloat(l[1])/360,h=parseFloat(l[2])/100,m=parseFloat(l[3])/100;return r(l[4]),this.setHSL(d,h,m,t)}break}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=s[1],u=l.length;if(u===3)return this.r=parseInt(l.charAt(0)+l.charAt(0),16)/255,this.g=parseInt(l.charAt(1)+l.charAt(1),16)/255,this.b=parseInt(l.charAt(2)+l.charAt(2),16)/255,Yn.toWorkingColorSpace(this,t),this;if(u===6)return this.r=parseInt(l.charAt(0)+l.charAt(1),16)/255,this.g=parseInt(l.charAt(2)+l.charAt(3),16)/255,this.b=parseInt(l.charAt(4)+l.charAt(5),16)/255,Yn.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=Mi){const r=bd[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=to(e.r),this.g=to(e.g),this.b=to(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mi){return Yn.fromWorkingColorSpace(Ia(this,zt),e),bn(zt.r*255,0,255)<<16^bn(zt.g*255,0,255)<<8^bn(zt.b*255,0,255)<<0}getHexString(e=Mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dr){Yn.fromWorkingColorSpace(Ia(this,zt),t);const r=zt.r,s=zt.g,l=zt.b,u=Math.max(r,s,l),c=Math.min(r,s,l);let d,h;const m=(c+u)/2;if(c===u)d=0,h=0;else{const g=u-c;switch(h=m<=.5?g/(u+c):g/(2-u-c),u){case r:d=(s-l)/g+(s<l?6:0);break;case s:d=(l-r)/g+2;break;case l:d=(r-s)/g+4;break}d/=6}return e.h=d,e.s=h,e.l=m,e}getRGB(e,t=dr){return Yn.fromWorkingColorSpace(Ia(this,zt),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Mi){return Yn.fromWorkingColorSpace(Ia(this,zt),e),e!==Mi?`color(${e} ${zt.r} ${zt.g} ${zt.b})`:`rgb(${zt.r*255|0},${zt.g*255|0},${zt.b*255|0})`}offsetHSL(e,t,r){return this.getHSL(Zn),Zn.h+=e,Zn.s+=t,Zn.l+=r,this.setHSL(Zn.h,Zn.s,Zn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Pa);const r=Rl(Zn.h,Pa.h,t),s=Rl(Zn.s,Pa.s,t),l=Rl(Zn.l,Pa.l,t);return this.setHSL(r,s,l),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}vt.NAMES=bd;let Br;class wd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Br===void 0&&(Br=io("canvas")),Br.width=e.width,Br.height=e.height;const r=Br.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Br}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=io("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const s=r.getImageData(0,0,e.width,e.height),l=s.data;for(let u=0;u<l.length;u++)l[u]=mr(l[u]/255)*255;return r.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(mr(t[r]/255)*255):t[r]=mr(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Td{constructor(e=null){this.isSource=!0,this.uuid=Us(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},s=this.data;if(s!==null){let l;if(Array.isArray(s)){l=[];for(let u=0,c=s.length;u<c;u++)s[u].isDataTexture?l.push(Il(s[u].image)):l.push(Il(s[u]))}else l=Il(s);r.url=l}return t||(e.images[this.uuid]=r),r}}function Il(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?wd.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _S=0;class Bn extends ls{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,r=Jn,s=Jn,l=Fn,u=ao,c=ii,d=gr,h=1,m=_r){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_S++}),this.uuid=Us(),this.name="",this.source=new Td(e),this.mipmaps=[],this.mapping=t,this.wrapS=r,this.wrapT=s,this.magFilter=l,this.minFilter=u,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=d,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new On,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lc:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lc:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=vd;class Xt{constructor(e=0,t=0,r=0,s=1){Xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,s){return this.x=e,this.y=t,this.z=r,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*s+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*s+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*s+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*s+u[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,s,l;const d=e.elements,h=d[0],m=d[4],g=d[8],_=d[1],M=d[5],b=d[9],v=d[2],p=d[6],w=d[10];if(Math.abs(m-_)<.01&&Math.abs(g-v)<.01&&Math.abs(b-p)<.01){if(Math.abs(m+_)<.1&&Math.abs(g+v)<.1&&Math.abs(b+p)<.1&&Math.abs(h+M+w-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const I=(h+1)/2,P=(M+1)/2,C=(w+1)/2,O=(m+_)/4,H=(g+v)/4,E=(b+p)/4;return I>P&&I>C?I<.01?(r=0,s=.707106781,l=.707106781):(r=Math.sqrt(I),s=O/r,l=H/r):P>C?P<.01?(r=.707106781,s=0,l=.707106781):(s=Math.sqrt(P),r=O/s,l=E/s):C<.01?(r=.707106781,s=.707106781,l=0):(l=Math.sqrt(C),r=H/l,s=E/l),this.set(r,s,l,t),this}let R=Math.sqrt((p-b)*(p-b)+(g-v)*(g-v)+(_-m)*(_-m));return Math.abs(R)<.001&&(R=1),this.x=(p-b)/R,this.y=(g-v)/R,this.z=(_-m)/R,this.w=Math.acos((h+M+w-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xr extends ls{constructor(e,t,r={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t);const s={width:e,height:t,depth:1};this.texture=new Bn(s,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps!==void 0?r.generateMipmaps:!1,this.texture.internalFormat=r.internalFormat!==void 0?r.internalFormat:null,this.texture.minFilter=r.minFilter!==void 0?r.minFilter:Fn,this.depthBuffer=r.depthBuffer!==void 0?r.depthBuffer:!0,this.stencilBuffer=r.stencilBuffer!==void 0?r.stencilBuffer:!1,this.depthTexture=r.depthTexture!==void 0?r.depthTexture:null,this.samples=r.samples!==void 0?r.samples:0}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Td(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ed extends Bn{constructor(e=null,t=1,r=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xS extends Bn{constructor(e=null,t=1,r=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zs{constructor(e=0,t=0,r=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=s}static slerpFlat(e,t,r,s,l,u,c){let d=r[s+0],h=r[s+1],m=r[s+2],g=r[s+3];const _=l[u+0],M=l[u+1],b=l[u+2],v=l[u+3];if(c===0){e[t+0]=d,e[t+1]=h,e[t+2]=m,e[t+3]=g;return}if(c===1){e[t+0]=_,e[t+1]=M,e[t+2]=b,e[t+3]=v;return}if(g!==v||d!==_||h!==M||m!==b){let p=1-c;const w=d*_+h*M+m*b+g*v,R=w>=0?1:-1,I=1-w*w;if(I>Number.EPSILON){const C=Math.sqrt(I),O=Math.atan2(C,w*R);p=Math.sin(p*O)/C,c=Math.sin(c*O)/C}const P=c*R;if(d=d*p+_*P,h=h*p+M*P,m=m*p+b*P,g=g*p+v*P,p===1-c){const C=1/Math.sqrt(d*d+h*h+m*m+g*g);d*=C,h*=C,m*=C,g*=C}}e[t]=d,e[t+1]=h,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,r,s,l,u){const c=r[s],d=r[s+1],h=r[s+2],m=r[s+3],g=l[u],_=l[u+1],M=l[u+2],b=l[u+3];return e[t]=c*b+m*g+d*M-h*_,e[t+1]=d*b+m*_+h*g-c*M,e[t+2]=h*b+m*M+c*_-d*g,e[t+3]=m*b-c*g-d*_-h*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,s){return this._x=e,this._y=t,this._z=r,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const r=e._x,s=e._y,l=e._z,u=e._order,c=Math.cos,d=Math.sin,h=c(r/2),m=c(s/2),g=c(l/2),_=d(r/2),M=d(s/2),b=d(l/2);switch(u){case"XYZ":this._x=_*m*g+h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g-_*M*b;break;case"YXZ":this._x=_*m*g+h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g+_*M*b;break;case"ZXY":this._x=_*m*g-h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g-_*M*b;break;case"ZYX":this._x=_*m*g-h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g+_*M*b;break;case"YZX":this._x=_*m*g+h*M*b,this._y=h*M*g+_*m*b,this._z=h*m*b-_*M*g,this._w=h*m*g-_*M*b;break;case"XZY":this._x=_*m*g-h*M*b,this._y=h*M*g-_*m*b,this._z=h*m*b+_*M*g,this._w=h*m*g+_*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,s=Math.sin(r);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],s=t[4],l=t[8],u=t[1],c=t[5],d=t[9],h=t[2],m=t[6],g=t[10],_=r+c+g;if(_>0){const M=.5/Math.sqrt(_+1);this._w=.25/M,this._x=(m-d)*M,this._y=(l-h)*M,this._z=(u-s)*M}else if(r>c&&r>g){const M=2*Math.sqrt(1+r-c-g);this._w=(m-d)/M,this._x=.25*M,this._y=(s+u)/M,this._z=(l+h)/M}else if(c>g){const M=2*Math.sqrt(1+c-r-g);this._w=(l-h)/M,this._x=(s+u)/M,this._y=.25*M,this._z=(d+m)/M}else{const M=2*Math.sqrt(1+g-r-c);this._w=(u-s)/M,this._x=(l+h)/M,this._y=(d+m)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const s=Math.min(1,t/r);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,s=e._y,l=e._z,u=e._w,c=t._x,d=t._y,h=t._z,m=t._w;return this._x=r*m+u*c+s*h-l*d,this._y=s*m+u*d+l*c-r*h,this._z=l*m+u*h+r*d-s*c,this._w=u*m-r*c-s*d-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,s=this._y,l=this._z,u=this._w;let c=u*e._w+r*e._x+s*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=u,this._x=r,this._y=s,this._z=l,this;const d=1-c*c;if(d<=Number.EPSILON){const M=1-t;return this._w=M*u+t*this._w,this._x=M*r+t*this._x,this._y=M*s+t*this._y,this._z=M*l+t*this._z,this.normalize(),this._onChangeCallback(),this}const h=Math.sqrt(d),m=Math.atan2(h,c),g=Math.sin((1-t)*m)/h,_=Math.sin(t*m)/h;return this._w=u*g+this._w*_,this._x=r*g+this._x*_,this._y=s*g+this._y*_,this._z=l*g+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),s=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(s),r*Math.sin(l),r*Math.cos(l),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,r=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,s=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*s,this.y=l[1]*t+l[4]*r+l[7]*s,this.z=l[2]*t+l[5]*r+l[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*s+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*s+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*s+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*s+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,s=this.z,l=e.x,u=e.y,c=e.z,d=e.w,h=d*t+u*s-c*r,m=d*r+c*t-l*s,g=d*s+l*r-u*t,_=-l*t-u*r-c*s;return this.x=h*d+_*-l+m*-c-g*-u,this.y=m*d+_*-u+g*-l-h*-c,this.z=g*d+_*-c+h*-u-m*-l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,s=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*s,this.y=l[1]*t+l[5]*r+l[9]*s,this.z=l[2]*t+l[6]*r+l[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,s=e.y,l=e.z,u=t.x,c=t.y,d=t.z;return this.x=s*d-l*c,this.y=l*u-r*d,this.z=r*c-s*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Fl.copy(this).projectOnVector(e),this.sub(Fl)}reflect(e){return this.sub(Fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(bn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,s=this.z-e.z;return t*t+r*r+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const s=Math.sin(t)*e;return this.x=s*Math.sin(r),this.y=Math.cos(t)*e,this.z=s*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fl=new W,Mh=new zs;class Bs{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,r=1/0,s=1/0,l=-1/0,u=-1/0,c=-1/0;for(let d=0,h=e.length;d<h;d+=3){const m=e[d],g=e[d+1],_=e[d+2];m<t&&(t=m),g<r&&(r=g),_<s&&(s=_),m>l&&(l=m),g>u&&(u=g),_>c&&(c=_)}return this.min.set(t,r,s),this.max.set(l,u,c),this}setFromBufferAttribute(e){let t=1/0,r=1/0,s=1/0,l=-1/0,u=-1/0,c=-1/0;for(let d=0,h=e.count;d<h;d++){const m=e.getX(d),g=e.getY(d),_=e.getZ(d);m<t&&(t=m),g<r&&(r=g),_<s&&(s=_),m>l&&(l=m),g>u&&(u=g),_>c&&(c=_)}return this.min.set(t,r,s),this.max.set(l,u,c),this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=rr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0)if(t&&r.attributes!=null&&r.attributes.position!==void 0){const l=r.attributes.position;for(let u=0,c=l.count;u<c;u++)rr.fromBufferAttribute(l,u).applyMatrix4(e.matrixWorld),this.expandByPoint(rr)}else r.boundingBox===null&&r.computeBoundingBox(),Nl.copy(r.boundingBox),Nl.applyMatrix4(e.matrixWorld),this.union(Nl);const s=e.children;for(let l=0,u=s.length;l<u;l++)this.expandByObject(s[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,rr),rr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rs),Fa.subVectors(this.max,Rs),Gr.subVectors(e.a,Rs),Wr.subVectors(e.b,Rs),Vr.subVectors(e.c,Rs),Ni.subVectors(Wr,Gr),Oi.subVectors(Vr,Wr),sr.subVectors(Gr,Vr);let t=[0,-Ni.z,Ni.y,0,-Oi.z,Oi.y,0,-sr.z,sr.y,Ni.z,0,-Ni.x,Oi.z,0,-Oi.x,sr.z,0,-sr.x,-Ni.y,Ni.x,0,-Oi.y,Oi.x,0,-sr.y,sr.x,0];return!Ol(t,Gr,Wr,Vr,Fa)||(t=[1,0,0,0,1,0,0,0,1],!Ol(t,Gr,Wr,Vr,Fa))?!1:(Na.crossVectors(Ni,Oi),t=[Na.x,Na.y,Na.z],Ol(t,Gr,Wr,Vr,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return rr.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(rr).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new W,new W,new W,new W,new W,new W,new W,new W],rr=new W,Nl=new Bs,Gr=new W,Wr=new W,Vr=new W,Ni=new W,Oi=new W,sr=new W,Rs=new W,Fa=new W,Na=new W,ar=new W;function Ol(o,e,t,r,s){for(let l=0,u=o.length-3;l<=u;l+=3){ar.fromArray(o,l);const c=s.x*Math.abs(ar.x)+s.y*Math.abs(ar.y)+s.z*Math.abs(ar.z),d=e.dot(ar),h=t.dot(ar),m=r.dot(ar);if(Math.max(-Math.max(d,h,m),Math.min(d,h,m))>c)return!1}return!0}const vS=new Bs,Sh=new W,Oa=new W,Ul=new W;class Gs{constructor(e=new W,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):vS.setFromPoints(e).getCenter(r);let s=0;for(let l=0,u=e.length;l<u;l++)s=Math.max(s,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){Ul.subVectors(e,this.center);const t=Ul.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),s=(r-this.radius)*.5;this.center.add(Ul.multiplyScalar(s/r)),this.radius+=s}return this}union(e){return this.center.equals(e.center)===!0?Oa.set(0,0,1).multiplyScalar(e.radius):Oa.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(Sh.copy(e.center).add(Oa)),this.expandByPoint(Sh.copy(e.center).sub(Oa)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new W,zl=new W,Ua=new W,Ui=new W,Bl=new W,za=new W,Gl=new W;class _c{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(r).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.direction).multiplyScalar(t).add(this.origin),gi.distanceToSquared(e))}distanceSqToSegment(e,t,r,s){zl.copy(e).add(t).multiplyScalar(.5),Ua.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(zl);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Ua),c=Ui.dot(this.direction),d=-Ui.dot(Ua),h=Ui.lengthSq(),m=Math.abs(1-u*u);let g,_,M,b;if(m>0)if(g=u*d-c,_=u*c-d,b=l*m,g>=0)if(_>=-b)if(_<=b){const v=1/m;g*=v,_*=v,M=g*(g+u*_+2*c)+_*(u*g+_+2*d)+h}else _=l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;else _=-l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;else _<=-b?(g=Math.max(0,-(-u*l+c)),_=g>0?-l:Math.min(Math.max(-l,-d),l),M=-g*g+_*(_+2*d)+h):_<=b?(g=0,_=Math.min(Math.max(-l,-d),l),M=_*(_+2*d)+h):(g=Math.max(0,-(u*l+c)),_=g>0?l:Math.min(Math.max(-l,-d),l),M=-g*g+_*(_+2*d)+h);else _=u>0?-l:l,g=Math.max(0,-(u*_+c)),M=-g*g+_*(_+2*d)+h;return r&&r.copy(this.direction).multiplyScalar(g).add(this.origin),s&&s.copy(Ua).multiplyScalar(_).add(zl),M}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const r=gi.dot(this.direction),s=gi.dot(gi)-r*r,l=e.radius*e.radius;if(s>l)return null;const u=Math.sqrt(l-s),c=r-u,d=r+u;return c<0&&d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,s,l,u,c,d;const h=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,_=this.origin;return h>=0?(r=(e.min.x-_.x)*h,s=(e.max.x-_.x)*h):(r=(e.max.x-_.x)*h,s=(e.min.x-_.x)*h),m>=0?(l=(e.min.y-_.y)*m,u=(e.max.y-_.y)*m):(l=(e.max.y-_.y)*m,u=(e.min.y-_.y)*m),r>u||l>s||((l>r||r!==r)&&(r=l),(u<s||s!==s)&&(s=u),g>=0?(c=(e.min.z-_.z)*g,d=(e.max.z-_.z)*g):(c=(e.max.z-_.z)*g,d=(e.min.z-_.z)*g),r>d||c>s)||((c>r||r!==r)&&(r=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(r>=0?r:s,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,r,s,l){Bl.subVectors(t,e),za.subVectors(r,e),Gl.crossVectors(Bl,za);let u=this.direction.dot(Gl),c;if(u>0){if(s)return null;c=1}else if(u<0)c=-1,u=-u;else return null;Ui.subVectors(this.origin,e);const d=c*this.direction.dot(za.crossVectors(Ui,za));if(d<0)return null;const h=c*this.direction.dot(Bl.cross(Ui));if(h<0||d+h>u)return null;const m=-c*Ui.dot(Gl);return m<0?null:this.at(m/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,r,s,l,u,c,d,h,m,g,_,M,b,v,p){const w=this.elements;return w[0]=e,w[4]=t,w[8]=r,w[12]=s,w[1]=l,w[5]=u,w[9]=c,w[13]=d,w[2]=h,w[6]=m,w[10]=g,w[14]=_,w[3]=M,w[7]=b,w[11]=v,w[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,s=1/Hr.setFromMatrixColumn(e,0).length(),l=1/Hr.setFromMatrixColumn(e,1).length(),u=1/Hr.setFromMatrixColumn(e,2).length();return t[0]=r[0]*s,t[1]=r[1]*s,t[2]=r[2]*s,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,s=e.y,l=e.z,u=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const _=u*m,M=u*g,b=c*m,v=c*g;t[0]=d*m,t[4]=-d*g,t[8]=h,t[1]=M+b*h,t[5]=_-v*h,t[9]=-c*d,t[2]=v-_*h,t[6]=b+M*h,t[10]=u*d}else if(e.order==="YXZ"){const _=d*m,M=d*g,b=h*m,v=h*g;t[0]=_+v*c,t[4]=b*c-M,t[8]=u*h,t[1]=u*g,t[5]=u*m,t[9]=-c,t[2]=M*c-b,t[6]=v+_*c,t[10]=u*d}else if(e.order==="ZXY"){const _=d*m,M=d*g,b=h*m,v=h*g;t[0]=_-v*c,t[4]=-u*g,t[8]=b+M*c,t[1]=M+b*c,t[5]=u*m,t[9]=v-_*c,t[2]=-u*h,t[6]=c,t[10]=u*d}else if(e.order==="ZYX"){const _=u*m,M=u*g,b=c*m,v=c*g;t[0]=d*m,t[4]=b*h-M,t[8]=_*h+v,t[1]=d*g,t[5]=v*h+_,t[9]=M*h-b,t[2]=-h,t[6]=c*d,t[10]=u*d}else if(e.order==="YZX"){const _=u*d,M=u*h,b=c*d,v=c*h;t[0]=d*m,t[4]=v-_*g,t[8]=b*g+M,t[1]=g,t[5]=u*m,t[9]=-c*m,t[2]=-h*m,t[6]=M*g+b,t[10]=_-v*g}else if(e.order==="XZY"){const _=u*d,M=u*h,b=c*d,v=c*h;t[0]=d*m,t[4]=-g,t[8]=h*m,t[1]=_*g+v,t[5]=u*m,t[9]=M*g-b,t[2]=b*g-M,t[6]=c*m,t[10]=v*g+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(MS,e,SS)}lookAt(e,t,r){const s=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),zi.crossVectors(r,Sn),zi.lengthSq()===0&&(Math.abs(r.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),zi.crossVectors(r,Sn)),zi.normalize(),Ba.crossVectors(Sn,zi),s[0]=zi.x,s[4]=Ba.x,s[8]=Sn.x,s[1]=zi.y,s[5]=Ba.y,s[9]=Sn.y,s[2]=zi.z,s[6]=Ba.z,s[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,l=this.elements,u=r[0],c=r[4],d=r[8],h=r[12],m=r[1],g=r[5],_=r[9],M=r[13],b=r[2],v=r[6],p=r[10],w=r[14],R=r[3],I=r[7],P=r[11],C=r[15],O=s[0],H=s[4],E=s[8],N=s[12],X=s[1],ue=s[5],ye=s[9],J=s[13],k=s[2],ae=s[6],he=s[10],le=s[14],ee=s[3],q=s[7],Z=s[11],ce=s[15];return l[0]=u*O+c*X+d*k+h*ee,l[4]=u*H+c*ue+d*ae+h*q,l[8]=u*E+c*ye+d*he+h*Z,l[12]=u*N+c*J+d*le+h*ce,l[1]=m*O+g*X+_*k+M*ee,l[5]=m*H+g*ue+_*ae+M*q,l[9]=m*E+g*ye+_*he+M*Z,l[13]=m*N+g*J+_*le+M*ce,l[2]=b*O+v*X+p*k+w*ee,l[6]=b*H+v*ue+p*ae+w*q,l[10]=b*E+v*ye+p*he+w*Z,l[14]=b*N+v*J+p*le+w*ce,l[3]=R*O+I*X+P*k+C*ee,l[7]=R*H+I*ue+P*ae+C*q,l[11]=R*E+I*ye+P*he+C*Z,l[15]=R*N+I*J+P*le+C*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],s=e[8],l=e[12],u=e[1],c=e[5],d=e[9],h=e[13],m=e[2],g=e[6],_=e[10],M=e[14],b=e[3],v=e[7],p=e[11],w=e[15];return b*(+l*d*g-s*h*g-l*c*_+r*h*_+s*c*M-r*d*M)+v*(+t*d*M-t*h*_+l*u*_-s*u*M+s*h*m-l*d*m)+p*(+t*h*g-t*c*M-l*u*g+r*u*M+l*c*m-r*h*m)+w*(-s*c*m-t*d*g+t*c*_+s*u*g-r*u*_+r*d*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],l=e[3],u=e[4],c=e[5],d=e[6],h=e[7],m=e[8],g=e[9],_=e[10],M=e[11],b=e[12],v=e[13],p=e[14],w=e[15],R=g*p*h-v*_*h+v*d*M-c*p*M-g*d*w+c*_*w,I=b*_*h-m*p*h-b*d*M+u*p*M+m*d*w-u*_*w,P=m*v*h-b*g*h+b*c*M-u*v*M-m*c*w+u*g*w,C=b*g*d-m*v*d-b*c*_+u*v*_+m*c*p-u*g*p,O=t*R+r*I+s*P+l*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/O;return e[0]=R*H,e[1]=(v*_*l-g*p*l-v*s*M+r*p*M+g*s*w-r*_*w)*H,e[2]=(c*p*l-v*d*l+v*s*h-r*p*h-c*s*w+r*d*w)*H,e[3]=(g*d*l-c*_*l-g*s*h+r*_*h+c*s*M-r*d*M)*H,e[4]=I*H,e[5]=(m*p*l-b*_*l+b*s*M-t*p*M-m*s*w+t*_*w)*H,e[6]=(b*d*l-u*p*l-b*s*h+t*p*h+u*s*w-t*d*w)*H,e[7]=(u*_*l-m*d*l+m*s*h-t*_*h-u*s*M+t*d*M)*H,e[8]=P*H,e[9]=(b*g*l-m*v*l-b*r*M+t*v*M+m*r*w-t*g*w)*H,e[10]=(u*v*l-b*c*l+b*r*h-t*v*h-u*r*w+t*c*w)*H,e[11]=(m*c*l-u*g*l-m*r*h+t*g*h+u*r*M-t*c*M)*H,e[12]=C*H,e[13]=(m*v*s-b*g*s+b*r*_-t*v*_-m*r*p+t*g*p)*H,e[14]=(b*c*s-u*v*s-b*r*d+t*v*d+u*r*p-t*c*p)*H,e[15]=(u*g*s-m*c*s+m*r*d-t*g*d-u*r*_+t*c*_)*H,this}scale(e){const t=this.elements,r=e.x,s=e.y,l=e.z;return t[0]*=r,t[4]*=s,t[8]*=l,t[1]*=r,t[5]*=s,t[9]*=l,t[2]*=r,t[6]*=s,t[10]*=l,t[3]*=r,t[7]*=s,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,s))}makeTranslation(e,t,r){return this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),s=Math.sin(t),l=1-r,u=e.x,c=e.y,d=e.z,h=l*u,m=l*c;return this.set(h*u+r,h*c-s*d,h*d+s*c,0,h*c+s*d,m*c+r,m*d-s*u,0,h*d-s*c,m*d+s*u,l*d*d+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,s,l,u){return this.set(1,r,l,0,e,1,u,0,t,s,1,0,0,0,0,1),this}compose(e,t,r){const s=this.elements,l=t._x,u=t._y,c=t._z,d=t._w,h=l+l,m=u+u,g=c+c,_=l*h,M=l*m,b=l*g,v=u*m,p=u*g,w=c*g,R=d*h,I=d*m,P=d*g,C=r.x,O=r.y,H=r.z;return s[0]=(1-(v+w))*C,s[1]=(M+P)*C,s[2]=(b-I)*C,s[3]=0,s[4]=(M-P)*O,s[5]=(1-(_+w))*O,s[6]=(p+R)*O,s[7]=0,s[8]=(b+I)*H,s[9]=(p-R)*H,s[10]=(1-(_+v))*H,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,r){const s=this.elements;let l=Hr.set(s[0],s[1],s[2]).length();const u=Hr.set(s[4],s[5],s[6]).length(),c=Hr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(l=-l),e.x=s[12],e.y=s[13],e.z=s[14],$n.copy(this);const h=1/l,m=1/u,g=1/c;return $n.elements[0]*=h,$n.elements[1]*=h,$n.elements[2]*=h,$n.elements[4]*=m,$n.elements[5]*=m,$n.elements[6]*=m,$n.elements[8]*=g,$n.elements[9]*=g,$n.elements[10]*=g,t.setFromRotationMatrix($n),r.x=l,r.y=u,r.z=c,this}makePerspective(e,t,r,s,l,u){const c=this.elements,d=2*l/(t-e),h=2*l/(r-s),m=(t+e)/(t-e),g=(r+s)/(r-s),_=-(u+l)/(u-l),M=-2*u*l/(u-l);return c[0]=d,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=h,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,r,s,l,u){const c=this.elements,d=1/(t-e),h=1/(r-s),m=1/(u-l),g=(t+e)*d,_=(r+s)*h,M=(u+l)*m;return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-g,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-_,c[2]=0,c[6]=0,c[10]=-2*m,c[14]=-M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<16;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Hr=new W,$n=new Bt,MS=new W(0,0,0),SS=new W(1,1,1),zi=new W,Ba=new W,Sn=new W,yh=new Bt,bh=new zs;class Ws{constructor(e=0,t=0,r=0,s=Ws.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,s=this._order){return this._x=e,this._y=t,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const s=e.elements,l=s[0],u=s[4],c=s[8],d=s[1],h=s[5],m=s[9],g=s[2],_=s[6],M=s[10];switch(t){case"XYZ":this._y=Math.asin(bn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,M),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-bn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,M),this._z=Math.atan2(d,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(bn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-u,h)):(this._y=0,this._z=Math.atan2(d,l));break;case"ZYX":this._y=Math.asin(-bn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(_,M),this._z=Math.atan2(d,l)):(this._x=0,this._z=Math.atan2(-u,h));break;case"YZX":this._z=Math.asin(bn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(c,M));break;case"XZY":this._z=Math.asin(-bn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-m,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return yh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yh,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bh.setFromEuler(this),this.setFromQuaternion(bh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}Ws.DefaultOrder="XYZ";Ws.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Ad{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yS=0;const wh=new W,kr=new zs,_i=new Bt,Ga=new W,Ds=new W,bS=new W,wS=new zs,Th=new W(1,0,0),Eh=new W(0,1,0),Ah=new W(0,0,1),TS={type:"added"},Ch={type:"removed"};class sn extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yS++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DefaultUp.clone();const e=new W,t=new Ws,r=new zs,s=new W(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Bt},normalMatrix:{value:new On}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=sn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=sn.DefaultMatrixWorldAutoUpdate,this.layers=new Ad,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return kr.setFromAxisAngle(e,t),this.quaternion.multiply(kr),this}rotateOnWorldAxis(e,t){return kr.setFromAxisAngle(e,t),this.quaternion.premultiply(kr),this}rotateX(e){return this.rotateOnAxis(Th,e)}rotateY(e){return this.rotateOnAxis(Eh,e)}rotateZ(e){return this.rotateOnAxis(Ah,e)}translateOnAxis(e,t){return wh.copy(e).applyQuaternion(this.quaternion),this.position.add(wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Th,e)}translateY(e){return this.translateOnAxis(Eh,e)}translateZ(e){return this.translateOnAxis(Ah,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Ga.copy(e):Ga.set(e,t,r);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Ds,Ga,this.up):_i.lookAt(Ga,Ds,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),kr.setFromRotationMatrix(_i),this.quaternion.premultiply(kr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(TS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ch)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Ch)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,s=this.children.length;r<s;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,bS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,wS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,s=t.length;r<s;r++){const l=t[r];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let l=0,u=s.length;l<u;l++){const c=s[l];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function l(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const d=c.shapes;if(Array.isArray(d))for(let h=0,m=d.length;h<m;h++){const g=d[h];l(e.shapes,g)}else l(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let d=0,h=this.material.length;d<h;d++)c.push(l(e.materials,this.material[d]));s.material=c}else s.material=l(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const d=this.animations[c];s.animations.push(l(e.animations,d))}}if(t){const c=u(e.geometries),d=u(e.materials),h=u(e.textures),m=u(e.images),g=u(e.shapes),_=u(e.skeletons),M=u(e.animations),b=u(e.nodes);c.length>0&&(r.geometries=c),d.length>0&&(r.materials=d),h.length>0&&(r.textures=h),m.length>0&&(r.images=m),g.length>0&&(r.shapes=g),_.length>0&&(r.skeletons=_),M.length>0&&(r.animations=M),b.length>0&&(r.nodes=b)}return r.object=s,r;function u(c){const d=[];for(const h in c){const m=c[h];delete m.metadata,d.push(m)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const s=e.children[r];this.add(s.clone())}return this}}sn.DefaultUp=new W(0,1,0);sn.DefaultMatrixAutoUpdate=!0;sn.DefaultMatrixWorldAutoUpdate=!0;const Kn=new W,xi=new W,Wl=new W,vi=new W,qr=new W,Xr=new W,Lh=new W,Vl=new W,Hl=new W,kl=new W;class Si{constructor(e=new W,t=new W,r=new W){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,s){s.subVectors(r,t),Kn.subVectors(e,t),s.cross(Kn);const l=s.lengthSq();return l>0?s.multiplyScalar(1/Math.sqrt(l)):s.set(0,0,0)}static getBarycoord(e,t,r,s,l){Kn.subVectors(s,t),xi.subVectors(r,t),Wl.subVectors(e,t);const u=Kn.dot(Kn),c=Kn.dot(xi),d=Kn.dot(Wl),h=xi.dot(xi),m=xi.dot(Wl),g=u*h-c*c;if(g===0)return l.set(-2,-1,-1);const _=1/g,M=(h*d-c*m)*_,b=(u*m-c*d)*_;return l.set(1-M-b,b,M)}static containsPoint(e,t,r,s){return this.getBarycoord(e,t,r,s,vi),vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getUV(e,t,r,s,l,u,c,d){return this.getBarycoord(e,t,r,s,vi),d.set(0,0),d.addScaledVector(l,vi.x),d.addScaledVector(u,vi.y),d.addScaledVector(c,vi.z),d}static isFrontFacing(e,t,r,s){return Kn.subVectors(r,t),xi.subVectors(e,t),Kn.cross(xi).dot(s)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,s){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,r,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Kn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Si.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Si.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,s,l){return Si.getUV(e,this.a,this.b,this.c,t,r,s,l)}containsPoint(e){return Si.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Si.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,s=this.b,l=this.c;let u,c;qr.subVectors(s,r),Xr.subVectors(l,r),Vl.subVectors(e,r);const d=qr.dot(Vl),h=Xr.dot(Vl);if(d<=0&&h<=0)return t.copy(r);Hl.subVectors(e,s);const m=qr.dot(Hl),g=Xr.dot(Hl);if(m>=0&&g<=m)return t.copy(s);const _=d*g-m*h;if(_<=0&&d>=0&&m<=0)return u=d/(d-m),t.copy(r).addScaledVector(qr,u);kl.subVectors(e,l);const M=qr.dot(kl),b=Xr.dot(kl);if(b>=0&&M<=b)return t.copy(l);const v=M*h-d*b;if(v<=0&&h>=0&&b<=0)return c=h/(h-b),t.copy(r).addScaledVector(Xr,c);const p=m*b-M*g;if(p<=0&&g-m>=0&&M-b>=0)return Lh.subVectors(l,s),c=(g-m)/(g-m+(M-b)),t.copy(s).addScaledVector(Lh,c);const w=1/(p+v+_);return u=v*w,c=_*w,t.copy(r).addScaledVector(qr,u).addScaledVector(Xr,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let ES=0;class cs extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ES++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=ts,this.side=is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=gd,this.blendDst=_d,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=sc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mS,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cl,this.stencilZFail=Cl,this.stencilZPass=Cl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const s=this[t];if(s===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}s&&s.isColor?s.set(r):s&&s.isVector3&&r&&r.isVector3?s.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(r.blending=this.blending),this.side!==is&&(r.side=this.side),this.vertexColors&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=this.transparent),r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.stencilWrite=this.stencilWrite,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(r.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(r.wireframe=this.wireframe),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=this.flatShading),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData);function s(l){const u=[];for(const c in l){const d=l[c];delete d.metadata,u.push(d)}return u}if(t){const l=s(e.textures),u=s(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const s=t.length;r=new Array(s);for(let l=0;l!==s;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Cd extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=xd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ft=new W,Wa=new gt;class zn{constructor(e,t,r){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r===!0,this.usage=gh,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let s=0,l=this.itemSize;s<l;s++)this.array[e+s]=t.array[r+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Wa.fromBufferAttribute(this,t),Wa.applyMatrix3(e),this.setXY(t,Wa.x,Wa.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Da(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Da(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Da(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Da(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Mn(t,this.array),r=Mn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,s){return e*=this.itemSize,this.normalized&&(t=Mn(t,this.array),r=Mn(r,this.array),s=Mn(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this}setXYZW(e,t,r,s,l){return e*=this.itemSize,this.normalized&&(t=Mn(t,this.array),r=Mn(r,this.array),s=Mn(s,this.array),l=Mn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gh&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Ld extends zn{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Rd extends zn{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Xi extends zn{constructor(e,t,r){super(new Float32Array(e),t,r)}}let AS=0;const In=new Bt,ql=new sn,Yr=new W,yn=new Bs,Ps=new Bs,Wt=new W;class Gn extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:AS++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?Rd:Ld)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new On().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,r){return In.makeTranslation(e,t,r),this.applyMatrix4(In),this}scale(e,t,r){return In.makeScale(e,t,r),this.applyMatrix4(In),this}lookAt(e){return ql.lookAt(e),ql.updateMatrix(),this.applyMatrix4(ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(e){const t=[];for(let r=0,s=e.length;r<s;r++){const l=e[r];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Xi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const l=t[r];yn.setFromBufferAttribute(l),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new W,1/0);return}if(e){const r=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const c=t[l];Ps.setFromBufferAttribute(c),this.morphTargetsRelative?(Wt.addVectors(yn.min,Ps.min),yn.expandByPoint(Wt),Wt.addVectors(yn.max,Ps.max),yn.expandByPoint(Wt)):(yn.expandByPoint(Ps.min),yn.expandByPoint(Ps.max))}yn.getCenter(r);let s=0;for(let l=0,u=e.count;l<u;l++)Wt.fromBufferAttribute(e,l),s=Math.max(s,r.distanceToSquared(Wt));if(t)for(let l=0,u=t.length;l<u;l++){const c=t[l],d=this.morphTargetsRelative;for(let h=0,m=c.count;h<m;h++)Wt.fromBufferAttribute(c,h),d&&(Yr.fromBufferAttribute(e,h),Wt.add(Yr)),s=Math.max(s,r.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,s=t.position.array,l=t.normal.array,u=t.uv.array,c=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zn(new Float32Array(4*c),4));const d=this.getAttribute("tangent").array,h=[],m=[];for(let X=0;X<c;X++)h[X]=new W,m[X]=new W;const g=new W,_=new W,M=new W,b=new gt,v=new gt,p=new gt,w=new W,R=new W;function I(X,ue,ye){g.fromArray(s,X*3),_.fromArray(s,ue*3),M.fromArray(s,ye*3),b.fromArray(u,X*2),v.fromArray(u,ue*2),p.fromArray(u,ye*2),_.sub(g),M.sub(g),v.sub(b),p.sub(b);const J=1/(v.x*p.y-p.x*v.y);!isFinite(J)||(w.copy(_).multiplyScalar(p.y).addScaledVector(M,-v.y).multiplyScalar(J),R.copy(M).multiplyScalar(v.x).addScaledVector(_,-p.x).multiplyScalar(J),h[X].add(w),h[ue].add(w),h[ye].add(w),m[X].add(R),m[ue].add(R),m[ye].add(R))}let P=this.groups;P.length===0&&(P=[{start:0,count:r.length}]);for(let X=0,ue=P.length;X<ue;++X){const ye=P[X],J=ye.start,k=ye.count;for(let ae=J,he=J+k;ae<he;ae+=3)I(r[ae+0],r[ae+1],r[ae+2])}const C=new W,O=new W,H=new W,E=new W;function N(X){H.fromArray(l,X*3),E.copy(H);const ue=h[X];C.copy(ue),C.sub(H.multiplyScalar(H.dot(ue))).normalize(),O.crossVectors(E,ue);const J=O.dot(m[X])<0?-1:1;d[X*4]=C.x,d[X*4+1]=C.y,d[X*4+2]=C.z,d[X*4+3]=J}for(let X=0,ue=P.length;X<ue;++X){const ye=P[X],J=ye.start,k=ye.count;for(let ae=J,he=J+k;ae<he;ae+=3)N(r[ae+0]),N(r[ae+1]),N(r[ae+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let _=0,M=r.count;_<M;_++)r.setXYZ(_,0,0,0);const s=new W,l=new W,u=new W,c=new W,d=new W,h=new W,m=new W,g=new W;if(e)for(let _=0,M=e.count;_<M;_+=3){const b=e.getX(_+0),v=e.getX(_+1),p=e.getX(_+2);s.fromBufferAttribute(t,b),l.fromBufferAttribute(t,v),u.fromBufferAttribute(t,p),m.subVectors(u,l),g.subVectors(s,l),m.cross(g),c.fromBufferAttribute(r,b),d.fromBufferAttribute(r,v),h.fromBufferAttribute(r,p),c.add(m),d.add(m),h.add(m),r.setXYZ(b,c.x,c.y,c.z),r.setXYZ(v,d.x,d.y,d.z),r.setXYZ(p,h.x,h.y,h.z)}else for(let _=0,M=t.count;_<M;_+=3)s.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),u.fromBufferAttribute(t,_+2),m.subVectors(u,l),g.subVectors(s,l),m.cross(g),r.setXYZ(_+0,m.x,m.y,m.z),r.setXYZ(_+1,m.x,m.y,m.z),r.setXYZ(_+2,m.x,m.y,m.z);this.normalizeNormals(),r.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(c,d){const h=c.array,m=c.itemSize,g=c.normalized,_=new h.constructor(d.length*m);let M=0,b=0;for(let v=0,p=d.length;v<p;v++){c.isInterleavedBufferAttribute?M=d[v]*c.data.stride+c.offset:M=d[v]*m;for(let w=0;w<m;w++)_[b++]=h[M++]}return new zn(_,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gn,r=this.index.array,s=this.attributes;for(const c in s){const d=s[c],h=e(d,r);t.setAttribute(c,h)}const l=this.morphAttributes;for(const c in l){const d=[],h=l[c];for(let m=0,g=h.length;m<g;m++){const _=h[m],M=e(_,r);d.push(M)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let c=0,d=u.length;c<d;c++){const h=u[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const h in d)d[h]!==void 0&&(e[h]=d[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const d in r){const h=r[d];e.data.attributes[d]=h.toJSON(e.data)}const s={};let l=!1;for(const d in this.morphAttributes){const h=this.morphAttributes[d],m=[];for(let g=0,_=h.length;g<_;g++){const M=h[g];m.push(M.toJSON(e.data))}m.length>0&&(s[d]=m,l=!0)}l&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const s=e.attributes;for(const h in s){const m=s[h];this.setAttribute(h,m.clone(t))}const l=e.morphAttributes;for(const h in l){const m=[],g=l[h];for(let _=0,M=g.length;_<M;_++)m.push(g[_].clone(t));this.morphAttributes[h]=m}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let h=0,m=u.length;h<m;h++){const g=u[h];this.addGroup(g.start,g.count,g.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rh=new Bt,Zr=new _c,Xl=new Gs,Bi=new W,Gi=new W,Wi=new W,Yl=new W,Zl=new W,$l=new W,Va=new W,Ha=new W,ka=new W,qa=new gt,Xa=new gt,Ya=new gt,Kl=new W,Za=new W;class Hi extends sn{constructor(e=new Gn,t=new Cd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}raycast(e,t){const r=this.geometry,s=this.material,l=this.matrixWorld;if(s===void 0||(r.boundingSphere===null&&r.computeBoundingSphere(),Xl.copy(r.boundingSphere),Xl.applyMatrix4(l),e.ray.intersectsSphere(Xl)===!1)||(Rh.copy(l).invert(),Zr.copy(e.ray).applyMatrix4(Rh),r.boundingBox!==null&&Zr.intersectsBox(r.boundingBox)===!1))return;let u;const c=r.index,d=r.attributes.position,h=r.morphAttributes.position,m=r.morphTargetsRelative,g=r.attributes.uv,_=r.attributes.uv2,M=r.groups,b=r.drawRange;if(c!==null)if(Array.isArray(s))for(let v=0,p=M.length;v<p;v++){const w=M[v],R=s[w.materialIndex],I=Math.max(w.start,b.start),P=Math.min(c.count,Math.min(w.start+w.count,b.start+b.count));for(let C=I,O=P;C<O;C+=3){const H=c.getX(C),E=c.getX(C+1),N=c.getX(C+2);u=$a(this,R,e,Zr,d,h,m,g,_,H,E,N),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=w.materialIndex,t.push(u))}}else{const v=Math.max(0,b.start),p=Math.min(c.count,b.start+b.count);for(let w=v,R=p;w<R;w+=3){const I=c.getX(w),P=c.getX(w+1),C=c.getX(w+2);u=$a(this,s,e,Zr,d,h,m,g,_,I,P,C),u&&(u.faceIndex=Math.floor(w/3),t.push(u))}}else if(d!==void 0)if(Array.isArray(s))for(let v=0,p=M.length;v<p;v++){const w=M[v],R=s[w.materialIndex],I=Math.max(w.start,b.start),P=Math.min(d.count,Math.min(w.start+w.count,b.start+b.count));for(let C=I,O=P;C<O;C+=3){const H=C,E=C+1,N=C+2;u=$a(this,R,e,Zr,d,h,m,g,_,H,E,N),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=w.materialIndex,t.push(u))}}else{const v=Math.max(0,b.start),p=Math.min(d.count,b.start+b.count);for(let w=v,R=p;w<R;w+=3){const I=w,P=w+1,C=w+2;u=$a(this,s,e,Zr,d,h,m,g,_,I,P,C),u&&(u.faceIndex=Math.floor(w/3),t.push(u))}}}}function CS(o,e,t,r,s,l,u,c){let d;if(e.side===Un?d=r.intersectTriangle(u,l,s,!0,c):d=r.intersectTriangle(s,l,u,e.side!==Vi,c),d===null)return null;Za.copy(c),Za.applyMatrix4(o.matrixWorld);const h=t.ray.origin.distanceTo(Za);return h<t.near||h>t.far?null:{distance:h,point:Za.clone(),object:o}}function $a(o,e,t,r,s,l,u,c,d,h,m,g){Bi.fromBufferAttribute(s,h),Gi.fromBufferAttribute(s,m),Wi.fromBufferAttribute(s,g);const _=o.morphTargetInfluences;if(l&&_){Va.set(0,0,0),Ha.set(0,0,0),ka.set(0,0,0);for(let b=0,v=l.length;b<v;b++){const p=_[b],w=l[b];p!==0&&(Yl.fromBufferAttribute(w,h),Zl.fromBufferAttribute(w,m),$l.fromBufferAttribute(w,g),u?(Va.addScaledVector(Yl,p),Ha.addScaledVector(Zl,p),ka.addScaledVector($l,p)):(Va.addScaledVector(Yl.sub(Bi),p),Ha.addScaledVector(Zl.sub(Gi),p),ka.addScaledVector($l.sub(Wi),p)))}Bi.add(Va),Gi.add(Ha),Wi.add(ka)}o.isSkinnedMesh&&(o.boneTransform(h,Bi),o.boneTransform(m,Gi),o.boneTransform(g,Wi));const M=CS(o,e,t,r,Bi,Gi,Wi,Kl);if(M){c&&(qa.fromBufferAttribute(c,h),Xa.fromBufferAttribute(c,m),Ya.fromBufferAttribute(c,g),M.uv=Si.getUV(Kl,Bi,Gi,Wi,qa,Xa,Ya,new gt)),d&&(qa.fromBufferAttribute(d,h),Xa.fromBufferAttribute(d,m),Ya.fromBufferAttribute(d,g),M.uv2=Si.getUV(Kl,Bi,Gi,Wi,qa,Xa,Ya,new gt));const b={a:h,b:m,c:g,normal:new W,materialIndex:0};Si.getNormal(Bi,Gi,Wi,b.normal),M.face=b}return M}class Vs extends Gn{constructor(e=1,t=1,r=1,s=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:s,heightSegments:l,depthSegments:u};const c=this;s=Math.floor(s),l=Math.floor(l),u=Math.floor(u);const d=[],h=[],m=[],g=[];let _=0,M=0;b("z","y","x",-1,-1,r,t,e,u,l,0),b("z","y","x",1,-1,r,t,-e,u,l,1),b("x","z","y",1,1,e,r,t,s,u,2),b("x","z","y",1,-1,e,r,-t,s,u,3),b("x","y","z",1,-1,e,t,r,s,l,4),b("x","y","z",-1,-1,e,t,-r,s,l,5),this.setIndex(d),this.setAttribute("position",new Xi(h,3)),this.setAttribute("normal",new Xi(m,3)),this.setAttribute("uv",new Xi(g,2));function b(v,p,w,R,I,P,C,O,H,E,N){const X=P/H,ue=C/E,ye=P/2,J=C/2,k=O/2,ae=H+1,he=E+1;let le=0,ee=0;const q=new W;for(let Z=0;Z<he;Z++){const ce=Z*ue-J;for(let pe=0;pe<ae;pe++){const de=pe*X-ye;q[v]=de*R,q[p]=ce*I,q[w]=k,h.push(q.x,q.y,q.z),q[v]=0,q[p]=0,q[w]=O>0?1:-1,m.push(q.x,q.y,q.z),g.push(pe/H),g.push(1-Z/E),le+=1}}for(let Z=0;Z<E;Z++)for(let ce=0;ce<H;ce++){const pe=_+ce+ae*Z,de=_+ce+ae*(Z+1),Ae=_+(ce+1)+ae*(Z+1),Ue=_+(ce+1)+ae*Z;d.push(pe,de,Ue),d.push(de,Ae,Ue),ee+=6}c.addGroup(M,ee,N),M+=ee,_+=le}}static fromJSON(e){return new Vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(o){const e={};for(const t in o){e[t]={};for(const r in o[t]){const s=o[t][r];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?e[t][r]=s.clone():Array.isArray(s)?e[t][r]=s.slice():e[t][r]=s}}return e}function Jt(o){const e={};for(let t=0;t<o.length;t++){const r=os(o[t]);for(const s in r)e[s]=r[s]}return e}function LS(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}const RS={clone:os,merge:Jt};var DS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,PS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vr extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=DS,this.fragmentShader=PS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=LS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const u=this.uniforms[s].value;u&&u.isTexture?t.uniforms[s]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[s]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[s]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[s]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[s]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[s]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[s]={type:"m4",value:u.toArray()}:t.uniforms[s]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const r={};for(const s in this.extensions)this.extensions[s]===!0&&(r[s]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Dd extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nn extends Dd{constructor(e=50,t=1,r=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ll*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xh*2*Math.atan(Math.tan(Ll*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,s,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ll*.5*this.fov)/this.zoom,r=2*t,s=this.aspect*r,l=-.5*s;const u=this.view;if(this.view!==null&&this.view.enabled){const d=u.fullWidth,h=u.fullHeight;l+=u.offsetX*s/d,t-=u.offsetY*r/h,s*=u.width/d,r*=u.height/h}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+s,t,t-r,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $r=90,Kr=1;class IS extends sn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r;const s=new Nn($r,Kr,e,t);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new W(1,0,0)),this.add(s);const l=new Nn($r,Kr,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new W(-1,0,0)),this.add(l);const u=new Nn($r,Kr,e,t);u.layers=this.layers,u.up.set(0,0,1),u.lookAt(new W(0,1,0)),this.add(u);const c=new Nn($r,Kr,e,t);c.layers=this.layers,c.up.set(0,0,-1),c.lookAt(new W(0,-1,0)),this.add(c);const d=new Nn($r,Kr,e,t);d.layers=this.layers,d.up.set(0,-1,0),d.lookAt(new W(0,0,1)),this.add(d);const h=new Nn($r,Kr,e,t);h.layers=this.layers,h.up.set(0,-1,0),h.lookAt(new W(0,0,-1)),this.add(h)}update(e,t){this.parent===null&&this.updateMatrixWorld();const r=this.renderTarget,[s,l,u,c,d,h]=this.children,m=e.getRenderTarget(),g=e.toneMapping,_=e.xr.enabled;e.toneMapping=yi,e.xr.enabled=!1;const M=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0),e.render(t,s),e.setRenderTarget(r,1),e.render(t,l),e.setRenderTarget(r,2),e.render(t,u),e.setRenderTarget(r,3),e.render(t,c),e.setRenderTarget(r,4),e.render(t,d),r.texture.generateMipmaps=M,e.setRenderTarget(r,5),e.render(t,h),e.setRenderTarget(m),e.toneMapping=g,e.xr.enabled=_,r.texture.needsPMREMUpdate=!0}}class Pd extends Bn{constructor(e,t,r,s,l,u,c,d,h,m){e=e!==void 0?e:[],t=t!==void 0?t:rs,super(e,t,r,s,l,u,c,d,h,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class FS extends xr{constructor(e,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},s=[r,r,r,r,r,r];this.texture=new Pd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vs(5,5,5),l=new vr({name:"CubemapFromEquirect",uniforms:os(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Un,blending:qi});l.uniforms.tEquirect.value=t;const u=new Hi(s,l),c=t.minFilter;return t.minFilter===ao&&(t.minFilter=Fn),new IS(1,10,this).update(e,u),t.minFilter=c,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,r,s){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,s);e.setRenderTarget(l)}}const Jl=new W,NS=new W,OS=new On;class or{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,s){return this.normal.set(e,t,r),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const s=Jl.subVectors(r,t).cross(NS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const r=e.delta(Jl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/s;return l<0||l>1?null:t.copy(r).multiplyScalar(l).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||OS.getNormalMatrix(e),s=this.coplanarPoint(Jl).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-s.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jr=new Gs,Ka=new W;class Id{constructor(e=new or,t=new or,r=new or,s=new or,l=new or,u=new or){this.planes=[e,t,r,s,l,u]}set(e,t,r,s,l,u){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(r),c[3].copy(s),c[4].copy(l),c[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e){const t=this.planes,r=e.elements,s=r[0],l=r[1],u=r[2],c=r[3],d=r[4],h=r[5],m=r[6],g=r[7],_=r[8],M=r[9],b=r[10],v=r[11],p=r[12],w=r[13],R=r[14],I=r[15];return t[0].setComponents(c-s,g-d,v-_,I-p).normalize(),t[1].setComponents(c+s,g+d,v+_,I+p).normalize(),t[2].setComponents(c+l,g+h,v+M,I+w).normalize(),t[3].setComponents(c-l,g-h,v-M,I-w).normalize(),t[4].setComponents(c-u,g-m,v-b,I-R).normalize(),t[5].setComponents(c+u,g+m,v+b,I+R).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Jr)}intersectsSprite(e){return Jr.center.set(0,0,0),Jr.radius=.7071067811865476,Jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jr)}intersectsSphere(e){const t=this.planes,r=e.center,s=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const s=t[r];if(Ka.x=s.normal.x>0?e.max.x:e.min.x,Ka.y=s.normal.y>0?e.max.y:e.min.y,Ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fd(){let o=null,e=!1,t=null,r=null;function s(l,u){t(l,u),r=o.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(r=o.requestAnimationFrame(s),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){o=l}}}function US(o,e){const t=e.isWebGL2,r=new WeakMap;function s(h,m){const g=h.array,_=h.usage,M=o.createBuffer();o.bindBuffer(m,M),o.bufferData(m,g,_),h.onUploadCallback();let b;if(g instanceof Float32Array)b=5126;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)b=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=5123;else if(g instanceof Int16Array)b=5122;else if(g instanceof Uint32Array)b=5125;else if(g instanceof Int32Array)b=5124;else if(g instanceof Int8Array)b=5120;else if(g instanceof Uint8Array)b=5121;else if(g instanceof Uint8ClampedArray)b=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:M,type:b,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version}}function l(h,m,g){const _=m.array,M=m.updateRange;o.bindBuffer(g,h),M.count===-1?o.bufferSubData(g,0,_):(t?o.bufferSubData(g,M.offset*_.BYTES_PER_ELEMENT,_,M.offset,M.count):o.bufferSubData(g,M.offset*_.BYTES_PER_ELEMENT,_.subarray(M.offset,M.offset+M.count)),M.count=-1)}function u(h){return h.isInterleavedBufferAttribute&&(h=h.data),r.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=r.get(h);m&&(o.deleteBuffer(m.buffer),r.delete(h))}function d(h,m){if(h.isGLBufferAttribute){const _=r.get(h);(!_||_.version<h.version)&&r.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=r.get(h);g===void 0?r.set(h,s(h,m)):g.version<h.version&&(l(g.buffer,h,m),g.version=h.version)}return{get:u,remove:c,update:d}}class xc extends Gn{constructor(e=1,t=1,r=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:s};const l=e/2,u=t/2,c=Math.floor(r),d=Math.floor(s),h=c+1,m=d+1,g=e/c,_=t/d,M=[],b=[],v=[],p=[];for(let w=0;w<m;w++){const R=w*_-u;for(let I=0;I<h;I++){const P=I*g-l;b.push(P,-R,0),v.push(0,0,1),p.push(I/c),p.push(1-w/d)}}for(let w=0;w<d;w++)for(let R=0;R<c;R++){const I=R+h*w,P=R+h*(w+1),C=R+1+h*(w+1),O=R+1+h*w;M.push(I,P,O),M.push(P,C,O)}this.setIndex(M),this.setAttribute("position",new Xi(b,3)),this.setAttribute("normal",new Xi(v,3)),this.setAttribute("uv",new Xi(p,2))}static fromJSON(e){return new xc(e.width,e.height,e.widthSegments,e.heightSegments)}}var zS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,BS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GS=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,WS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,VS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,HS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kS="vec3 transformed = vec3( position );",qS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XS=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
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
#endif`,YS=`#ifdef USE_IRIDESCENCE
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
#endif`,ZS=`#ifdef USE_BUMPMAP
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
#endif`,$S=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,KS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,iy=`#define PI 3.141592653589793
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
}`,ry=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sy=`vec3 transformedNormal = objectNormal;
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
#endif`,ay=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,ly=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",fy=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hy=`#ifdef USE_ENVMAP
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
#endif`,dy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,py=`#ifdef USE_ENVMAP
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
#endif`,my=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
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
#endif`,_y=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,My=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sy=`#ifdef USE_GRADIENTMAP
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
}`,yy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,by=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ty=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Ey=`uniform bool receiveShadow;
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
#endif`,Ay=`#if defined( USE_ENVMAP )
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
#endif`,Cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ly=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Ry=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dy=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Py=`PhysicalMaterial material;
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
#endif`,Iy=`struct PhysicalMaterial {
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
}`,Fy=`
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
#endif`,Ny=`#if defined( RE_IndirectDiffuse )
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
#endif`,Oy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Uy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,By=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Gy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Wy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ky=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zy=`#ifdef USE_MORPHNORMALS
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
#endif`,$y=`#ifdef USE_MORPHTARGETS
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
#endif`,Ky=`#ifdef USE_MORPHTARGETS
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
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 geometryNormal = normal;`,Qy=`#ifdef OBJECTSPACE_NORMALMAP
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
#endif`,jy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nb=`#ifdef USE_NORMALMAP
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
#endif`,ib=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,rb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,sb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,ab=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ob=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ub=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,db=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_b=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xb=`float getShadowMask() {
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
}`,vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mb=`#ifdef USE_SKINNING
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
#endif`,Sb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yb=`#ifdef USE_SKINNING
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
#endif`,bb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ab=`#ifdef USE_TRANSMISSION
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
#endif`,Cb=`#ifdef USE_TRANSMISSION
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
#endif`,Lb=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Rb=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Db=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Pb=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Ib=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Fb=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Nb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ob=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ub=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bb=`#include <envmap_common_pars_fragment>
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
}`,Gb=`#include <common>
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
}`,Wb=`#if DEPTH_PACKING == 3200
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
}`,Vb=`#define DISTANCE
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
}`,Hb=`#define DISTANCE
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
}`,kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Xb=`uniform float scale;
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
}`,Yb=`uniform vec3 diffuse;
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
}`,Zb=`#include <common>
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
}`,$b=`uniform vec3 diffuse;
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
}`,Kb=`#define LAMBERT
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
}`,Jb=`#define LAMBERT
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
}`,Qb=`#define MATCAP
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
}`,jb=`#define MATCAP
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
}`,ew=`#define NORMAL
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
}`,tw=`#define NORMAL
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
}`,nw=`#define PHONG
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
}`,iw=`#define PHONG
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
}`,rw=`#define STANDARD
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
}`,sw=`#define STANDARD
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
}`,aw=`#define TOON
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
}`,ow=`#define TOON
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
}`,lw=`uniform float size;
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
}`,cw=`uniform vec3 diffuse;
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
}`,uw=`#include <common>
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
}`,fw=`uniform vec3 color;
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
}`,hw=`uniform float rotation;
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
}`,dw=`uniform vec3 diffuse;
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
}`,Je={alphamap_fragment:zS,alphamap_pars_fragment:BS,alphatest_fragment:GS,alphatest_pars_fragment:WS,aomap_fragment:VS,aomap_pars_fragment:HS,begin_vertex:kS,beginnormal_vertex:qS,bsdfs:XS,iridescence_fragment:YS,bumpmap_pars_fragment:ZS,clipping_planes_fragment:$S,clipping_planes_pars_fragment:KS,clipping_planes_pars_vertex:JS,clipping_planes_vertex:QS,color_fragment:jS,color_pars_fragment:ey,color_pars_vertex:ty,color_vertex:ny,common:iy,cube_uv_reflection_fragment:ry,defaultnormal_vertex:sy,displacementmap_pars_vertex:ay,displacementmap_vertex:oy,emissivemap_fragment:ly,emissivemap_pars_fragment:cy,encodings_fragment:uy,encodings_pars_fragment:fy,envmap_fragment:hy,envmap_common_pars_fragment:dy,envmap_pars_fragment:py,envmap_pars_vertex:my,envmap_physical_pars_fragment:Ay,envmap_vertex:gy,fog_vertex:_y,fog_pars_vertex:xy,fog_fragment:vy,fog_pars_fragment:My,gradientmap_pars_fragment:Sy,lightmap_fragment:yy,lightmap_pars_fragment:by,lights_lambert_fragment:wy,lights_lambert_pars_fragment:Ty,lights_pars_begin:Ey,lights_toon_fragment:Cy,lights_toon_pars_fragment:Ly,lights_phong_fragment:Ry,lights_phong_pars_fragment:Dy,lights_physical_fragment:Py,lights_physical_pars_fragment:Iy,lights_fragment_begin:Fy,lights_fragment_maps:Ny,lights_fragment_end:Oy,logdepthbuf_fragment:Uy,logdepthbuf_pars_fragment:zy,logdepthbuf_pars_vertex:By,logdepthbuf_vertex:Gy,map_fragment:Wy,map_pars_fragment:Vy,map_particle_fragment:Hy,map_particle_pars_fragment:ky,metalnessmap_fragment:qy,metalnessmap_pars_fragment:Xy,morphcolor_vertex:Yy,morphnormal_vertex:Zy,morphtarget_pars_vertex:$y,morphtarget_vertex:Ky,normal_fragment_begin:Jy,normal_fragment_maps:Qy,normal_pars_fragment:jy,normal_pars_vertex:eb,normal_vertex:tb,normalmap_pars_fragment:nb,clearcoat_normal_fragment_begin:ib,clearcoat_normal_fragment_maps:rb,clearcoat_pars_fragment:sb,iridescence_pars_fragment:ab,output_fragment:ob,packing:lb,premultiplied_alpha_fragment:cb,project_vertex:ub,dithering_fragment:fb,dithering_pars_fragment:hb,roughnessmap_fragment:db,roughnessmap_pars_fragment:pb,shadowmap_pars_fragment:mb,shadowmap_pars_vertex:gb,shadowmap_vertex:_b,shadowmask_pars_fragment:xb,skinbase_vertex:vb,skinning_pars_vertex:Mb,skinning_vertex:Sb,skinnormal_vertex:yb,specularmap_fragment:bb,specularmap_pars_fragment:wb,tonemapping_fragment:Tb,tonemapping_pars_fragment:Eb,transmission_fragment:Ab,transmission_pars_fragment:Cb,uv_pars_fragment:Lb,uv_pars_vertex:Rb,uv_vertex:Db,uv2_pars_fragment:Pb,uv2_pars_vertex:Ib,uv2_vertex:Fb,worldpos_vertex:Nb,background_vert:Ob,background_frag:Ub,cube_vert:zb,cube_frag:Bb,depth_vert:Gb,depth_frag:Wb,distanceRGBA_vert:Vb,distanceRGBA_frag:Hb,equirect_vert:kb,equirect_frag:qb,linedashed_vert:Xb,linedashed_frag:Yb,meshbasic_vert:Zb,meshbasic_frag:$b,meshlambert_vert:Kb,meshlambert_frag:Jb,meshmatcap_vert:Qb,meshmatcap_frag:jb,meshnormal_vert:ew,meshnormal_frag:tw,meshphong_vert:nw,meshphong_frag:iw,meshphysical_vert:rw,meshphysical_frag:sw,meshtoon_vert:aw,meshtoon_frag:ow,points_vert:lw,points_frag:cw,shadow_vert:uw,shadow_frag:fw,sprite_vert:hw,sprite_frag:dw},ge={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new On},uv2Transform:{value:new On},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new On}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new On}}},ni={basic:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new vt(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Jt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Jt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Jt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new vt(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Jt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Jt([ge.points,ge.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Jt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Jt([ge.common,ge.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Jt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Jt([ge.sprite,ge.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new On},t2D:{value:null}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},cube:{uniforms:Jt([ge.envmap,{opacity:{value:1}}]),vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Jt([ge.common,ge.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Jt([ge.lights,ge.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};ni.physical={uniforms:Jt([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new gt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};function pw(o,e,t,r,s,l){const u=new vt(0);let c=s===!0?0:1,d,h,m=null,g=0,_=null;function M(v,p){let w=!1,R=p.isScene===!0?p.background:null;R&&R.isTexture&&(R=e.get(R));const I=o.xr,P=I.getSession&&I.getSession();P&&P.environmentBlendMode==="additive"&&(R=null),R===null?b(u,c):R&&R.isColor&&(b(R,1),w=!0),(o.autoClear||w)&&o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil),R&&(R.isCubeTexture||R.mapping===so)?(h===void 0&&(h=new Hi(new Vs(1,1,1),new vr({name:"BackgroundCubeMaterial",uniforms:os(ni.cube.uniforms),vertexShader:ni.cube.vertexShader,fragmentShader:ni.cube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,O,H){this.matrixWorld.copyPosition(H.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,(m!==R||g!==R.version||_!==o.toneMapping)&&(h.material.needsUpdate=!0,m=R,g=R.version,_=o.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(d===void 0&&(d=new Hi(new xc(2,2),new vr({name:"BackgroundMaterial",uniforms:os(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:is,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=R,R.matrixAutoUpdate===!0&&R.updateMatrix(),d.material.uniforms.uvTransform.value.copy(R.matrix),(m!==R||g!==R.version||_!==o.toneMapping)&&(d.material.needsUpdate=!0,m=R,g=R.version,_=o.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null))}function b(v,p){t.buffers.color.setClear(v.r,v.g,v.b,p,l)}return{getClearColor:function(){return u},setClearColor:function(v,p=1){u.set(v),c=p,b(u,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,b(u,c)},render:M}}function mw(o,e,t,r){const s=o.getParameter(34921),l=r.isWebGL2?null:e.get("OES_vertex_array_object"),u=r.isWebGL2||l!==null,c={},d=p(null);let h=d,m=!1;function g(k,ae,he,le,ee){let q=!1;if(u){const Z=v(le,he,ae);h!==Z&&(h=Z,M(h.object)),q=w(k,le,he,ee),q&&R(k,le,he,ee)}else{const Z=ae.wireframe===!0;(h.geometry!==le.id||h.program!==he.id||h.wireframe!==Z)&&(h.geometry=le.id,h.program=he.id,h.wireframe=Z,q=!0)}ee!==null&&t.update(ee,34963),(q||m)&&(m=!1,E(k,ae,he,le),ee!==null&&o.bindBuffer(34963,t.get(ee).buffer))}function _(){return r.isWebGL2?o.createVertexArray():l.createVertexArrayOES()}function M(k){return r.isWebGL2?o.bindVertexArray(k):l.bindVertexArrayOES(k)}function b(k){return r.isWebGL2?o.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function v(k,ae,he){const le=he.wireframe===!0;let ee=c[k.id];ee===void 0&&(ee={},c[k.id]=ee);let q=ee[ae.id];q===void 0&&(q={},ee[ae.id]=q);let Z=q[le];return Z===void 0&&(Z=p(_()),q[le]=Z),Z}function p(k){const ae=[],he=[],le=[];for(let ee=0;ee<s;ee++)ae[ee]=0,he[ee]=0,le[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ae,enabledAttributes:he,attributeDivisors:le,object:k,attributes:{},index:null}}function w(k,ae,he,le){const ee=h.attributes,q=ae.attributes;let Z=0;const ce=he.getAttributes();for(const pe in ce)if(ce[pe].location>=0){const Ae=ee[pe];let Ue=q[pe];if(Ue===void 0&&(pe==="instanceMatrix"&&k.instanceMatrix&&(Ue=k.instanceMatrix),pe==="instanceColor"&&k.instanceColor&&(Ue=k.instanceColor)),Ae===void 0||Ae.attribute!==Ue||Ue&&Ae.data!==Ue.data)return!0;Z++}return h.attributesNum!==Z||h.index!==le}function R(k,ae,he,le){const ee={},q=ae.attributes;let Z=0;const ce=he.getAttributes();for(const pe in ce)if(ce[pe].location>=0){let Ae=q[pe];Ae===void 0&&(pe==="instanceMatrix"&&k.instanceMatrix&&(Ae=k.instanceMatrix),pe==="instanceColor"&&k.instanceColor&&(Ae=k.instanceColor));const Ue={};Ue.attribute=Ae,Ae&&Ae.data&&(Ue.data=Ae.data),ee[pe]=Ue,Z++}h.attributes=ee,h.attributesNum=Z,h.index=le}function I(){const k=h.newAttributes;for(let ae=0,he=k.length;ae<he;ae++)k[ae]=0}function P(k){C(k,0)}function C(k,ae){const he=h.newAttributes,le=h.enabledAttributes,ee=h.attributeDivisors;he[k]=1,le[k]===0&&(o.enableVertexAttribArray(k),le[k]=1),ee[k]!==ae&&((r.isWebGL2?o:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,ae),ee[k]=ae)}function O(){const k=h.newAttributes,ae=h.enabledAttributes;for(let he=0,le=ae.length;he<le;he++)ae[he]!==k[he]&&(o.disableVertexAttribArray(he),ae[he]=0)}function H(k,ae,he,le,ee,q){r.isWebGL2===!0&&(he===5124||he===5125)?o.vertexAttribIPointer(k,ae,he,ee,q):o.vertexAttribPointer(k,ae,he,le,ee,q)}function E(k,ae,he,le){if(r.isWebGL2===!1&&(k.isInstancedMesh||le.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;I();const ee=le.attributes,q=he.getAttributes(),Z=ae.defaultAttributeValues;for(const ce in q){const pe=q[ce];if(pe.location>=0){let de=ee[ce];if(de===void 0&&(ce==="instanceMatrix"&&k.instanceMatrix&&(de=k.instanceMatrix),ce==="instanceColor"&&k.instanceColor&&(de=k.instanceColor)),de!==void 0){const Ae=de.normalized,Ue=de.itemSize,se=t.get(de);if(se===void 0)continue;const lt=se.buffer,Fe=se.type,Be=se.bytesPerElement;if(de.isInterleavedBufferAttribute){const Ee=de.data,st=Ee.stride,qe=de.offset;if(Ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<pe.locationSize;Pe++)C(pe.location+Pe,Ee.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Pe=0;Pe<pe.locationSize;Pe++)P(pe.location+Pe);o.bindBuffer(34962,lt);for(let Pe=0;Pe<pe.locationSize;Pe++)H(pe.location+Pe,Ue/pe.locationSize,Fe,Ae,st*Be,(qe+Ue/pe.locationSize*Pe)*Be)}else{if(de.isInstancedBufferAttribute){for(let Ee=0;Ee<pe.locationSize;Ee++)C(pe.location+Ee,de.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ee=0;Ee<pe.locationSize;Ee++)P(pe.location+Ee);o.bindBuffer(34962,lt);for(let Ee=0;Ee<pe.locationSize;Ee++)H(pe.location+Ee,Ue/pe.locationSize,Fe,Ae,Ue*Be,Ue/pe.locationSize*Ee*Be)}}else if(Z!==void 0){const Ae=Z[ce];if(Ae!==void 0)switch(Ae.length){case 2:o.vertexAttrib2fv(pe.location,Ae);break;case 3:o.vertexAttrib3fv(pe.location,Ae);break;case 4:o.vertexAttrib4fv(pe.location,Ae);break;default:o.vertexAttrib1fv(pe.location,Ae)}}}}O()}function N(){ye();for(const k in c){const ae=c[k];for(const he in ae){const le=ae[he];for(const ee in le)b(le[ee].object),delete le[ee];delete ae[he]}delete c[k]}}function X(k){if(c[k.id]===void 0)return;const ae=c[k.id];for(const he in ae){const le=ae[he];for(const ee in le)b(le[ee].object),delete le[ee];delete ae[he]}delete c[k.id]}function ue(k){for(const ae in c){const he=c[ae];if(he[k.id]===void 0)continue;const le=he[k.id];for(const ee in le)b(le[ee].object),delete le[ee];delete he[k.id]}}function ye(){J(),m=!0,h!==d&&(h=d,M(h.object))}function J(){d.geometry=null,d.program=null,d.wireframe=!1}return{setup:g,reset:ye,resetDefaultState:J,dispose:N,releaseStatesOfGeometry:X,releaseStatesOfProgram:ue,initAttributes:I,enableAttribute:P,disableUnusedAttributes:O}}function gw(o,e,t,r){const s=r.isWebGL2;let l;function u(h){l=h}function c(h,m){o.drawArrays(l,h,m),t.update(m,l,1)}function d(h,m,g){if(g===0)return;let _,M;if(s)_=o,M="drawArraysInstanced";else if(_=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",_===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[M](l,h,m,g),t.update(m,l,g)}this.setMode=u,this.render=c,this.renderInstances=d}function _w(o,e,t){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const H=e.get("EXT_texture_filter_anisotropic");r=o.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function l(H){if(H==="highp"){if(o.getShaderPrecisionFormat(35633,36338).precision>0&&o.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";H="mediump"}return H==="mediump"&&o.getShaderPrecisionFormat(35633,36337).precision>0&&o.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&o instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&o instanceof WebGL2ComputeRenderingContext;let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=u||e.has("WEBGL_draw_buffers"),m=t.logarithmicDepthBuffer===!0,g=o.getParameter(34930),_=o.getParameter(35660),M=o.getParameter(3379),b=o.getParameter(34076),v=o.getParameter(34921),p=o.getParameter(36347),w=o.getParameter(36348),R=o.getParameter(36349),I=_>0,P=u||e.has("OES_texture_float"),C=I&&P,O=u?o.getParameter(36183):0;return{isWebGL2:u,drawBuffers:h,getMaxAnisotropy:s,getMaxPrecision:l,precision:c,logarithmicDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:b,maxAttributes:v,maxVertexUniforms:p,maxVaryings:w,maxFragmentUniforms:R,vertexTextures:I,floatFragmentTextures:P,floatVertexTextures:C,maxSamples:O}}function xw(o){const e=this;let t=null,r=0,s=!1,l=!1;const u=new or,c=new On,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(g,_,M){const b=g.length!==0||_||r!==0||s;return s=_,t=m(g,M,0),r=g.length,b},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1,h()},this.setState=function(g,_,M){const b=g.clippingPlanes,v=g.clipIntersection,p=g.clipShadows,w=o.get(g);if(!s||b===null||b.length===0||l&&!p)l?m(null):h();else{const R=l?0:r,I=R*4;let P=w.clippingState||null;d.value=P,P=m(b,_,I,M);for(let C=0;C!==I;++C)P[C]=t[C];w.clippingState=P,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=R}};function h(){d.value!==t&&(d.value=t,d.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function m(g,_,M,b){const v=g!==null?g.length:0;let p=null;if(v!==0){if(p=d.value,b!==!0||p===null){const w=M+v*4,R=_.matrixWorldInverse;c.getNormalMatrix(R),(p===null||p.length<w)&&(p=new Float32Array(w));for(let I=0,P=M;I!==v;++I,P+=4)u.copy(g[I]).applyMatrix4(R,c),u.normal.toArray(p,P),p[P+3]=u.constant}d.value=p,d.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function vw(o){let e=new WeakMap;function t(u,c){return c===ac?u.mapping=rs:c===oc&&(u.mapping=ss),u}function r(u){if(u&&u.isTexture&&u.isRenderTargetTexture===!1){const c=u.mapping;if(c===ac||c===oc)if(e.has(u)){const d=e.get(u).texture;return t(d,u.mapping)}else{const d=u.image;if(d&&d.height>0){const h=new FS(d.height/2);return h.fromEquirectangularTexture(o,u),e.set(u,h),u.addEventListener("dispose",s),t(h.texture,u.mapping)}else return null}}return u}function s(u){const c=u.target;c.removeEventListener("dispose",s);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class Mw extends Dd{constructor(e=-1,t=1,r=1,s=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=s,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,s,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let l=r-e,u=r+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,u=l+h*this.view.width,c-=m*this.view.offsetY,d=c-m*this.view.height}this.projectionMatrix.makeOrthographic(l,u,c,d,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const es=4,Dh=[.125,.215,.35,.446,.526,.582],ur=20,Ql=new Mw,Ph=new vt;let jl=null;const lr=(1+Math.sqrt(5))/2,Qr=1/lr,Ih=[new W(1,1,1),new W(-1,1,1),new W(1,1,-1),new W(-1,1,-1),new W(0,lr,Qr),new W(0,lr,-Qr),new W(Qr,0,lr),new W(-Qr,0,lr),new W(lr,Qr,0),new W(-lr,Qr,0)];class Fh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,s=100){jl=this._renderer.getRenderTarget(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,s,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jl),e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rs||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jl=this._renderer.getRenderTarget();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Os,format:ii,encoding:_r,depthBuffer:!1},s=Nh(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sw(l)),this._blurMaterial=yw(l,e,t)}return s}_compileMaterial(e){const t=new Hi(this._lodPlanes[0],e);this._renderer.compile(t,Ql)}_sceneToCubeUV(e,t,r,s){const c=new Nn(90,1,t,r),d=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,_=m.toneMapping;m.getClearColor(Ph),m.toneMapping=yi,m.autoClear=!1;const M=new Cd({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1}),b=new Hi(new Vs,M);let v=!1;const p=e.background;p?p.isColor&&(M.color.copy(p),e.background=null,v=!0):(M.color.copy(Ph),v=!0);for(let w=0;w<6;w++){const R=w%3;R===0?(c.up.set(0,d[w],0),c.lookAt(h[w],0,0)):R===1?(c.up.set(0,0,d[w]),c.lookAt(0,h[w],0)):(c.up.set(0,d[w],0),c.lookAt(0,0,h[w]));const I=this._cubeSize;Ja(s,R*I,w>2?I:0,I,I),m.setRenderTarget(s),v&&m.render(b,c),m.render(e,c)}b.geometry.dispose(),b.material.dispose(),m.toneMapping=_,m.autoClear=g,e.background=p}_textureToCubeUV(e,t){const r=this._renderer,s=e.mapping===rs||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());const l=s?this._cubemapMaterial:this._equirectMaterial,u=new Hi(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const d=this._cubeSize;Ja(t,0,0,3*d,2*d),r.setRenderTarget(t),r.render(u,Ql)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const l=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),u=Ih[(s-1)%Ih.length];this._blur(e,s-1,s,l,u)}t.autoClear=r}_blur(e,t,r,s,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,s,"latitudinal",l),this._halfBlur(u,e,r,r,s,"longitudinal",l)}_halfBlur(e,t,r,s,l,u,c){const d=this._renderer,h=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new Hi(this._lodPlanes[s],h),_=h.uniforms,M=this._sizeLods[r]-1,b=isFinite(l)?Math.PI/(2*M):2*Math.PI/(2*ur-1),v=l/b,p=isFinite(l)?1+Math.floor(m*v):ur;p>ur&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ur}`);const w=[];let R=0;for(let H=0;H<ur;++H){const E=H/v,N=Math.exp(-E*E/2);w.push(N),H===0?R+=N:H<p&&(R+=2*N)}for(let H=0;H<w.length;H++)w[H]=w[H]/R;_.envMap.value=e.texture,_.samples.value=p,_.weights.value=w,_.latitudinal.value=u==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:I}=this;_.dTheta.value=b,_.mipInt.value=I-r;const P=this._sizeLods[s],C=3*P*(s>I-es?s-I+es:0),O=4*(this._cubeSize-P);Ja(t,C,O,3*P,2*P),d.setRenderTarget(t),d.render(g,Ql)}}function Sw(o){const e=[],t=[],r=[];let s=o;const l=o-es+1+Dh.length;for(let u=0;u<l;u++){const c=Math.pow(2,s);t.push(c);let d=1/c;u>o-es?d=Dh[u-o+es-1]:u===0&&(d=0),r.push(d);const h=1/(c-2),m=-h,g=1+h,_=[m,m,g,m,g,g,m,m,g,g,m,g],M=6,b=6,v=3,p=2,w=1,R=new Float32Array(v*b*M),I=new Float32Array(p*b*M),P=new Float32Array(w*b*M);for(let O=0;O<M;O++){const H=O%3*2/3-1,E=O>2?0:-1,N=[H,E,0,H+2/3,E,0,H+2/3,E+1,0,H,E,0,H+2/3,E+1,0,H,E+1,0];R.set(N,v*b*O),I.set(_,p*b*O);const X=[O,O,O,O,O,O];P.set(X,w*b*O)}const C=new Gn;C.setAttribute("position",new zn(R,v)),C.setAttribute("uv",new zn(I,p)),C.setAttribute("faceIndex",new zn(P,w)),e.push(C),s>es&&s--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Nh(o,e,t){const r=new xr(o,e,t);return r.texture.mapping=so,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ja(o,e,t,r,s){o.viewport.set(e,t,r,s),o.scissor.set(e,t,r,s)}function yw(o,e,t){const r=new Float32Array(ur),s=new W(0,1,0);return new vr({name:"SphericalGaussianBlur",defines:{n:ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vc(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Oh(){return new vr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Uh(){return new vr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function vc(){return`

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
	`}function bw(o){let e=new WeakMap,t=null;function r(c){if(c&&c.isTexture){const d=c.mapping,h=d===ac||d===oc,m=d===rs||d===ss;if(h||m)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let g=e.get(c);return t===null&&(t=new Fh(o)),g=h?t.fromEquirectangular(c,g):t.fromCubemap(c,g),e.set(c,g),g.texture}else{if(e.has(c))return e.get(c).texture;{const g=c.image;if(h&&g&&g.height>0||m&&g&&s(g)){t===null&&(t=new Fh(o));const _=h?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,_),c.addEventListener("dispose",l),_.texture}else return null}}}return c}function s(c){let d=0;const h=6;for(let m=0;m<h;m++)c[m]!==void 0&&d++;return d===h}function l(c){const d=c.target;d.removeEventListener("dispose",l);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function ww(o){const e={};function t(r){if(e[r]!==void 0)return e[r];let s;switch(r){case"WEBGL_depth_texture":s=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=o.getExtension(r)}return e[r]=s,s}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const s=t(r);return s===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),s}}}function Tw(o,e,t,r){const s={},l=new WeakMap;function u(g){const _=g.target;_.index!==null&&e.remove(_.index);for(const b in _.attributes)e.remove(_.attributes[b]);_.removeEventListener("dispose",u),delete s[_.id];const M=l.get(_);M&&(e.remove(M),l.delete(_)),r.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(g,_){return s[_.id]===!0||(_.addEventListener("dispose",u),s[_.id]=!0,t.memory.geometries++),_}function d(g){const _=g.attributes;for(const b in _)e.update(_[b],34962);const M=g.morphAttributes;for(const b in M){const v=M[b];for(let p=0,w=v.length;p<w;p++)e.update(v[p],34962)}}function h(g){const _=[],M=g.index,b=g.attributes.position;let v=0;if(M!==null){const R=M.array;v=M.version;for(let I=0,P=R.length;I<P;I+=3){const C=R[I+0],O=R[I+1],H=R[I+2];_.push(C,O,O,H,H,C)}}else{const R=b.array;v=b.version;for(let I=0,P=R.length/3-1;I<P;I+=3){const C=I+0,O=I+1,H=I+2;_.push(C,O,O,H,H,C)}}const p=new(yd(_)?Rd:Ld)(_,1);p.version=v;const w=l.get(g);w&&e.remove(w),l.set(g,p)}function m(g){const _=l.get(g);if(_){const M=g.index;M!==null&&_.version<M.version&&h(g)}else h(g);return l.get(g)}return{get:c,update:d,getWireframeAttribute:m}}function Ew(o,e,t,r){const s=r.isWebGL2;let l;function u(_){l=_}let c,d;function h(_){c=_.type,d=_.bytesPerElement}function m(_,M){o.drawElements(l,M,c,_*d),t.update(M,l,1)}function g(_,M,b){if(b===0)return;let v,p;if(s)v=o,p="drawElementsInstanced";else if(v=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[p](l,M,c,_*d,b),t.update(M,l,b)}this.setMode=u,this.setIndex=h,this.render=m,this.renderInstances=g}function Aw(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,c){switch(t.calls++,u){case 4:t.triangles+=c*(l/3);break;case 1:t.lines+=c*(l/2);break;case 3:t.lines+=c*(l-1);break;case 2:t.lines+=c*l;break;case 0:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function s(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:r}}function Cw(o,e){return o[0]-e[0]}function Lw(o,e){return Math.abs(e[1])-Math.abs(o[1])}function Rw(o,e,t){const r={},s=new Float32Array(8),l=new WeakMap,u=new Xt,c=[];for(let h=0;h<8;h++)c[h]=[h,0];function d(h,m,g,_){const M=h.morphTargetInfluences;if(e.isWebGL2===!0){const v=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,p=v!==void 0?v.length:0;let w=l.get(m);if(w===void 0||w.count!==p){let he=function(){k.dispose(),l.delete(m),m.removeEventListener("dispose",he)};var b=he;w!==void 0&&w.texture.dispose();const P=m.morphAttributes.position!==void 0,C=m.morphAttributes.normal!==void 0,O=m.morphAttributes.color!==void 0,H=m.morphAttributes.position||[],E=m.morphAttributes.normal||[],N=m.morphAttributes.color||[];let X=0;P===!0&&(X=1),C===!0&&(X=2),O===!0&&(X=3);let ue=m.attributes.position.count*X,ye=1;ue>e.maxTextureSize&&(ye=Math.ceil(ue/e.maxTextureSize),ue=e.maxTextureSize);const J=new Float32Array(ue*ye*4*p),k=new Ed(J,ue,ye,p);k.type=hr,k.needsUpdate=!0;const ae=X*4;for(let le=0;le<p;le++){const ee=H[le],q=E[le],Z=N[le],ce=ue*ye*4*le;for(let pe=0;pe<ee.count;pe++){const de=pe*ae;P===!0&&(u.fromBufferAttribute(ee,pe),J[ce+de+0]=u.x,J[ce+de+1]=u.y,J[ce+de+2]=u.z,J[ce+de+3]=0),C===!0&&(u.fromBufferAttribute(q,pe),J[ce+de+4]=u.x,J[ce+de+5]=u.y,J[ce+de+6]=u.z,J[ce+de+7]=0),O===!0&&(u.fromBufferAttribute(Z,pe),J[ce+de+8]=u.x,J[ce+de+9]=u.y,J[ce+de+10]=u.z,J[ce+de+11]=Z.itemSize===4?u.w:1)}}w={count:p,texture:k,size:new gt(ue,ye)},l.set(m,w),m.addEventListener("dispose",he)}let R=0;for(let P=0;P<M.length;P++)R+=M[P];const I=m.morphTargetsRelative?1:1-R;_.getUniforms().setValue(o,"morphTargetBaseInfluence",I),_.getUniforms().setValue(o,"morphTargetInfluences",M),_.getUniforms().setValue(o,"morphTargetsTexture",w.texture,t),_.getUniforms().setValue(o,"morphTargetsTextureSize",w.size)}else{const v=M===void 0?0:M.length;let p=r[m.id];if(p===void 0||p.length!==v){p=[];for(let C=0;C<v;C++)p[C]=[C,0];r[m.id]=p}for(let C=0;C<v;C++){const O=p[C];O[0]=C,O[1]=M[C]}p.sort(Lw);for(let C=0;C<8;C++)C<v&&p[C][1]?(c[C][0]=p[C][0],c[C][1]=p[C][1]):(c[C][0]=Number.MAX_SAFE_INTEGER,c[C][1]=0);c.sort(Cw);const w=m.morphAttributes.position,R=m.morphAttributes.normal;let I=0;for(let C=0;C<8;C++){const O=c[C],H=O[0],E=O[1];H!==Number.MAX_SAFE_INTEGER&&E?(w&&m.getAttribute("morphTarget"+C)!==w[H]&&m.setAttribute("morphTarget"+C,w[H]),R&&m.getAttribute("morphNormal"+C)!==R[H]&&m.setAttribute("morphNormal"+C,R[H]),s[C]=E,I+=E):(w&&m.hasAttribute("morphTarget"+C)===!0&&m.deleteAttribute("morphTarget"+C),R&&m.hasAttribute("morphNormal"+C)===!0&&m.deleteAttribute("morphNormal"+C),s[C]=0)}const P=m.morphTargetsRelative?1:1-I;_.getUniforms().setValue(o,"morphTargetBaseInfluence",P),_.getUniforms().setValue(o,"morphTargetInfluences",s)}}return{update:d}}function Dw(o,e,t,r){let s=new WeakMap;function l(d){const h=r.render.frame,m=d.geometry,g=e.get(d,m);return s.get(g)!==h&&(e.update(g),s.set(g,h)),d.isInstancedMesh&&(d.hasEventListener("dispose",c)===!1&&d.addEventListener("dispose",c),t.update(d.instanceMatrix,34962),d.instanceColor!==null&&t.update(d.instanceColor,34962)),g}function u(){s=new WeakMap}function c(d){const h=d.target;h.removeEventListener("dispose",c),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:u}}const Nd=new Bn,Od=new Ed,Ud=new xS,zd=new Pd,zh=[],Bh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Vh=new Float32Array(4);function us(o,e,t){const r=o[0];if(r<=0||r>0)return o;const s=e*t;let l=zh[s];if(l===void 0&&(l=new Float32Array(s),zh[s]=l),e!==0){r.toArray(l,0);for(let u=1,c=0;u!==e;++u)c+=t,o[u].toArray(l,c)}return l}function an(o,e){if(o.length!==e.length)return!1;for(let t=0,r=o.length;t<r;t++)if(o[t]!==e[t])return!1;return!0}function on(o,e){for(let t=0,r=e.length;t<r;t++)o[t]=e[t]}function oo(o,e){let t=Bh[e];t===void 0&&(t=new Int32Array(e),Bh[e]=t);for(let r=0;r!==e;++r)t[r]=o.allocateTextureUnit();return t}function Pw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function Iw(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;o.uniform2fv(this.addr,e),on(t,e)}}function Fw(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;o.uniform3fv(this.addr,e),on(t,e)}}function Nw(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;o.uniform4fv(this.addr,e),on(t,e)}}function Ow(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;Vh.set(r),o.uniformMatrix2fv(this.addr,!1,Vh),on(t,r)}}function Uw(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;Wh.set(r),o.uniformMatrix3fv(this.addr,!1,Wh),on(t,r)}}function zw(o,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,r))return;Gh.set(r),o.uniformMatrix4fv(this.addr,!1,Gh),on(t,r)}}function Bw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function Gw(o,e){const t=this.cache;an(t,e)||(o.uniform2iv(this.addr,e),on(t,e))}function Ww(o,e){const t=this.cache;an(t,e)||(o.uniform3iv(this.addr,e),on(t,e))}function Vw(o,e){const t=this.cache;an(t,e)||(o.uniform4iv(this.addr,e),on(t,e))}function Hw(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function kw(o,e){const t=this.cache;an(t,e)||(o.uniform2uiv(this.addr,e),on(t,e))}function qw(o,e){const t=this.cache;an(t,e)||(o.uniform3uiv(this.addr,e),on(t,e))}function Xw(o,e){const t=this.cache;an(t,e)||(o.uniform4uiv(this.addr,e),on(t,e))}function Yw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture2D(e||Nd,s)}function Zw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture3D(e||Ud,s)}function $w(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTextureCube(e||zd,s)}function Kw(o,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(o.uniform1i(this.addr,s),r[0]=s),t.setTexture2DArray(e||Od,s)}function Jw(o){switch(o){case 5126:return Pw;case 35664:return Iw;case 35665:return Fw;case 35666:return Nw;case 35674:return Ow;case 35675:return Uw;case 35676:return zw;case 5124:case 35670:return Bw;case 35667:case 35671:return Gw;case 35668:case 35672:return Ww;case 35669:case 35673:return Vw;case 5125:return Hw;case 36294:return kw;case 36295:return qw;case 36296:return Xw;case 35678:case 36198:case 36298:case 36306:case 35682:return Yw;case 35679:case 36299:case 36307:return Zw;case 35680:case 36300:case 36308:case 36293:return $w;case 36289:case 36303:case 36311:case 36292:return Kw}}function Qw(o,e){o.uniform1fv(this.addr,e)}function jw(o,e){const t=us(e,this.size,2);o.uniform2fv(this.addr,t)}function e1(o,e){const t=us(e,this.size,3);o.uniform3fv(this.addr,t)}function t1(o,e){const t=us(e,this.size,4);o.uniform4fv(this.addr,t)}function n1(o,e){const t=us(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function i1(o,e){const t=us(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function r1(o,e){const t=us(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function s1(o,e){o.uniform1iv(this.addr,e)}function a1(o,e){o.uniform2iv(this.addr,e)}function o1(o,e){o.uniform3iv(this.addr,e)}function l1(o,e){o.uniform4iv(this.addr,e)}function c1(o,e){o.uniform1uiv(this.addr,e)}function u1(o,e){o.uniform2uiv(this.addr,e)}function f1(o,e){o.uniform3uiv(this.addr,e)}function h1(o,e){o.uniform4uiv(this.addr,e)}function d1(o,e,t){const r=e.length,s=oo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture2D(e[l]||Nd,s[l])}function p1(o,e,t){const r=e.length,s=oo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture3D(e[l]||Ud,s[l])}function m1(o,e,t){const r=e.length,s=oo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTextureCube(e[l]||zd,s[l])}function g1(o,e,t){const r=e.length,s=oo(t,r);o.uniform1iv(this.addr,s);for(let l=0;l!==r;++l)t.setTexture2DArray(e[l]||Od,s[l])}function _1(o){switch(o){case 5126:return Qw;case 35664:return jw;case 35665:return e1;case 35666:return t1;case 35674:return n1;case 35675:return i1;case 35676:return r1;case 5124:case 35670:return s1;case 35667:case 35671:return a1;case 35668:case 35672:return o1;case 35669:case 35673:return l1;case 5125:return c1;case 36294:return u1;case 36295:return f1;case 36296:return h1;case 35678:case 36198:case 36298:case 36306:case 35682:return d1;case 35679:case 36299:case 36307:return p1;case 35680:case 36300:case 36308:case 36293:return m1;case 36289:case 36303:case 36311:case 36292:return g1}}class x1{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.setValue=Jw(t.type)}}class v1{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.size=t.size,this.setValue=_1(t.type)}}class M1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const s=this.seq;for(let l=0,u=s.length;l!==u;++l){const c=s[l];c.setValue(e,t[c.id],r)}}}const ec=/(\w+)(\])?(\[|\.)?/g;function Hh(o,e){o.seq.push(e),o.map[e.id]=e}function S1(o,e,t){const r=o.name,s=r.length;for(ec.lastIndex=0;;){const l=ec.exec(r),u=ec.lastIndex;let c=l[1];const d=l[2]==="]",h=l[3];if(d&&(c=c|0),h===void 0||h==="["&&u+2===s){Hh(t,h===void 0?new x1(c,o,e):new v1(c,o,e));break}else{let g=t.map[c];g===void 0&&(g=new M1(c),Hh(t,g)),t=g}}}class no{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,35718);for(let s=0;s<r;++s){const l=e.getActiveUniform(t,s),u=e.getUniformLocation(t,l.name);S1(l,u,this)}}setValue(e,t,r,s){const l=this.map[t];l!==void 0&&l.setValue(e,r,s)}setOptional(e,t,r){const s=t[r];s!==void 0&&this.setValue(e,r,s)}static upload(e,t,r,s){for(let l=0,u=t.length;l!==u;++l){const c=t[l],d=r[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){const r=[];for(let s=0,l=e.length;s!==l;++s){const u=e[s];u.id in t&&r.push(u)}return r}}function kh(o,e,t){const r=o.createShader(e);return o.shaderSource(r,t),o.compileShader(r),r}let y1=0;function b1(o,e){const t=o.split(`
`),r=[],s=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=s;u<l;u++){const c=u+1;r.push(`${c===e?">":" "} ${c}: ${t[u]}`)}return r.join(`
`)}function w1(o){switch(o){case _r:return["Linear","( value )"];case Ct:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",o),["Linear","( value )"]}}function qh(o,e,t){const r=o.getShaderParameter(e,35713),s=o.getShaderInfoLog(e).trim();if(r&&s==="")return"";const l=/ERROR: 0:(\d+)/.exec(s);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+s+`

`+b1(o.getShaderSource(e),u)}else return s}function T1(o,e){const t=w1(e);return"vec4 "+o+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function E1(o,e){let t;switch(e){case kM:t="Linear";break;case qM:t="Reinhard";break;case XM:t="OptimizedCineon";break;case YM:t="ACESFilmic";break;case ZM:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function A1(o){return[o.extensionDerivatives||!!o.envMapCubeUVHeight||o.bumpMap||o.tangentSpaceNormalMap||o.clearcoatNormalMap||o.flatShading||o.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(o.extensionFragDepth||o.logarithmicDepthBuffer)&&o.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",o.extensionDrawBuffers&&o.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(o.extensionShaderTextureLOD||o.envMap||o.transmission)&&o.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fs).join(`
`)}function C1(o){const e=[];for(const t in o){const r=o[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function L1(o,e){const t={},r=o.getProgramParameter(e,35721);for(let s=0;s<r;s++){const l=o.getActiveAttrib(e,s),u=l.name;let c=1;l.type===35674&&(c=2),l.type===35675&&(c=3),l.type===35676&&(c=4),t[u]={type:l.type,location:o.getAttribLocation(e,u),locationSize:c}}return t}function Fs(o){return o!==""}function Xh(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yh(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const R1=/^[ \t]*#include +<([\w\d./]+)>/gm;function hc(o){return o.replace(R1,D1)}function D1(o,e){const t=Je[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return hc(t)}const P1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zh(o){return o.replace(P1,I1)}function I1(o,e,t,r){let s="";for(let l=parseInt(e);l<parseInt(t);l++)s+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return s}function $h(o){let e="precision "+o.precision+` float;
precision `+o.precision+" int;";return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function F1(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===md?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===yM?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Is&&(e="SHADOWMAP_TYPE_VSM"),e}function N1(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case rs:case ss:e="ENVMAP_TYPE_CUBE";break;case so:e="ENVMAP_TYPE_CUBE_UV";break}return e}function O1(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case ss:e="ENVMAP_MODE_REFRACTION";break}return e}function U1(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case xd:e="ENVMAP_BLENDING_MULTIPLY";break;case VM:e="ENVMAP_BLENDING_MIX";break;case HM:e="ENVMAP_BLENDING_ADD";break}return e}function z1(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function B1(o,e,t,r){const s=o.getContext(),l=t.defines;let u=t.vertexShader,c=t.fragmentShader;const d=F1(t),h=N1(t),m=O1(t),g=U1(t),_=z1(t),M=t.isWebGL2?"":A1(t),b=C1(l),v=s.createProgram();let p,w,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[b].filter(Fs).join(`
`),p.length>0&&(p+=`
`),w=[M,b].filter(Fs).join(`
`),w.length>0&&(w+=`
`)):(p=[$h(t),"#define SHADER_NAME "+t.shaderName,b,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),w=[M,$h(t),"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Je.tonemapping_pars_fragment:"",t.toneMapping!==yi?E1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.encodings_pars_fragment,T1("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),u=hc(u),u=Xh(u,t),u=Yh(u,t),c=hc(c),c=Xh(c,t),c=Yh(c,t),u=Zh(u),c=Zh(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,w=["#define varying in",t.glslVersion===_h?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const I=R+p+u,P=R+w+c,C=kh(s,35633,I),O=kh(s,35632,P);if(s.attachShader(v,C),s.attachShader(v,O),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v),o.debug.checkShaderErrors){const N=s.getProgramInfoLog(v).trim(),X=s.getShaderInfoLog(C).trim(),ue=s.getShaderInfoLog(O).trim();let ye=!0,J=!0;if(s.getProgramParameter(v,35714)===!1){ye=!1;const k=qh(s,C,"vertex"),ae=qh(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,35715)+`

Program Info Log: `+N+`
`+k+`
`+ae)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(X===""||ue==="")&&(J=!1);J&&(this.diagnostics={runnable:ye,programLog:N,vertexShader:{log:X,prefix:p},fragmentShader:{log:ue,prefix:w}})}s.deleteShader(C),s.deleteShader(O);let H;this.getUniforms=function(){return H===void 0&&(H=new no(s,v)),H};let E;return this.getAttributes=function(){return E===void 0&&(E=L1(s,v)),E},this.destroy=function(){r.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.name=t.shaderName,this.id=y1++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=O,this}let G1=0;class W1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,s=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(s)===!1&&(u.add(s),s.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new V1(e),t.set(e,r)),r}}class V1{constructor(e){this.id=G1++,this.code=e,this.usedTimes=0}}function H1(o,e,t,r,s,l,u){const c=new Ad,d=new W1,h=[],m=s.isWebGL2,g=s.logarithmicDepthBuffer,_=s.vertexTextures;let M=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E,N,X,ue,ye){const J=ue.fog,k=ye.geometry,ae=E.isMeshStandardMaterial?ue.environment:null,he=(E.isMeshStandardMaterial?t:e).get(E.envMap||ae),le=!!he&&he.mapping===so?he.image.height:null,ee=b[E.type];E.precision!==null&&(M=s.getMaxPrecision(E.precision),M!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",M,"instead."));const q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Z=q!==void 0?q.length:0;let ce=0;k.morphAttributes.position!==void 0&&(ce=1),k.morphAttributes.normal!==void 0&&(ce=2),k.morphAttributes.color!==void 0&&(ce=3);let pe,de,Ae,Ue;if(ee){const st=ni[ee];pe=st.vertexShader,de=st.fragmentShader}else pe=E.vertexShader,de=E.fragmentShader,d.update(E),Ae=d.getVertexShaderID(E),Ue=d.getFragmentShaderID(E);const se=o.getRenderTarget(),lt=E.alphaTest>0,Fe=E.clearcoat>0,Be=E.iridescence>0;return{isWebGL2:m,shaderID:ee,shaderName:E.type,vertexShader:pe,fragmentShader:de,defines:E.defines,customVertexShaderID:Ae,customFragmentShaderID:Ue,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:M,instancing:ye.isInstancedMesh===!0,instancingColor:ye.isInstancedMesh===!0&&ye.instanceColor!==null,supportsVertexTextures:_,outputEncoding:se===null?o.outputEncoding:se.isXRRenderTarget===!0?se.texture.encoding:_r,map:!!E.map,matcap:!!E.matcap,envMap:!!he,envMapMode:he&&he.mapping,envMapCubeUVHeight:le,lightMap:!!E.lightMap,aoMap:!!E.aoMap,emissiveMap:!!E.emissiveMap,bumpMap:!!E.bumpMap,normalMap:!!E.normalMap,objectSpaceNormalMap:E.normalMapType===pS,tangentSpaceNormalMap:E.normalMapType===dS,decodeVideoTexture:!!E.map&&E.map.isVideoTexture===!0&&E.map.encoding===Ct,clearcoat:Fe,clearcoatMap:Fe&&!!E.clearcoatMap,clearcoatRoughnessMap:Fe&&!!E.clearcoatRoughnessMap,clearcoatNormalMap:Fe&&!!E.clearcoatNormalMap,iridescence:Be,iridescenceMap:Be&&!!E.iridescenceMap,iridescenceThicknessMap:Be&&!!E.iridescenceThicknessMap,displacementMap:!!E.displacementMap,roughnessMap:!!E.roughnessMap,metalnessMap:!!E.metalnessMap,specularMap:!!E.specularMap,specularIntensityMap:!!E.specularIntensityMap,specularColorMap:!!E.specularColorMap,opaque:E.transparent===!1&&E.blending===ts,alphaMap:!!E.alphaMap,alphaTest:lt,gradientMap:!!E.gradientMap,sheen:E.sheen>0,sheenColorMap:!!E.sheenColorMap,sheenRoughnessMap:!!E.sheenRoughnessMap,transmission:E.transmission>0,transmissionMap:!!E.transmissionMap,thicknessMap:!!E.thicknessMap,combine:E.combine,vertexTangents:!!E.normalMap&&!!k.attributes.tangent,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUvs:!!E.map||!!E.bumpMap||!!E.normalMap||!!E.specularMap||!!E.alphaMap||!!E.emissiveMap||!!E.roughnessMap||!!E.metalnessMap||!!E.clearcoatMap||!!E.clearcoatRoughnessMap||!!E.clearcoatNormalMap||!!E.iridescenceMap||!!E.iridescenceThicknessMap||!!E.displacementMap||!!E.transmissionMap||!!E.thicknessMap||!!E.specularIntensityMap||!!E.specularColorMap||!!E.sheenColorMap||!!E.sheenRoughnessMap,uvsVertexOnly:!(!!E.map||!!E.bumpMap||!!E.normalMap||!!E.specularMap||!!E.alphaMap||!!E.emissiveMap||!!E.roughnessMap||!!E.metalnessMap||!!E.clearcoatNormalMap||!!E.iridescenceMap||!!E.iridescenceThicknessMap||E.transmission>0||!!E.transmissionMap||!!E.thicknessMap||!!E.specularIntensityMap||!!E.specularColorMap||E.sheen>0||!!E.sheenColorMap||!!E.sheenRoughnessMap)&&!!E.displacementMap,fog:!!J,useFog:E.fog===!0,fogExp2:J&&J.isFogExp2,flatShading:!!E.flatShading,sizeAttenuation:E.sizeAttenuation,logarithmicDepthBuffer:g,skinning:ye.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ce,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:E.dithering,shadowMapEnabled:o.shadowMap.enabled&&X.length>0,shadowMapType:o.shadowMap.type,toneMapping:E.toneMapped?o.toneMapping:yi,physicallyCorrectLights:o.physicallyCorrectLights,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Vi,flipSided:E.side===Un,useDepthPacking:!!E.depthPacking,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:E.extensions&&E.extensions.derivatives,extensionFragDepth:E.extensions&&E.extensions.fragDepth,extensionDrawBuffers:E.extensions&&E.extensions.drawBuffers,extensionShaderTextureLOD:E.extensions&&E.extensions.shaderTextureLOD,rendererExtensionFragDepth:m||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:m||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:m||r.has("EXT_shader_texture_lod"),customProgramCacheKey:E.customProgramCacheKey()}}function p(E){const N=[];if(E.shaderID?N.push(E.shaderID):(N.push(E.customVertexShaderID),N.push(E.customFragmentShaderID)),E.defines!==void 0)for(const X in E.defines)N.push(X),N.push(E.defines[X]);return E.isRawShaderMaterial===!1&&(w(N,E),R(N,E),N.push(o.outputEncoding)),N.push(E.customProgramCacheKey),N.join()}function w(E,N){E.push(N.precision),E.push(N.outputEncoding),E.push(N.envMapMode),E.push(N.envMapCubeUVHeight),E.push(N.combine),E.push(N.vertexUvs),E.push(N.fogExp2),E.push(N.sizeAttenuation),E.push(N.morphTargetsCount),E.push(N.morphAttributeCount),E.push(N.numDirLights),E.push(N.numPointLights),E.push(N.numSpotLights),E.push(N.numSpotLightMaps),E.push(N.numHemiLights),E.push(N.numRectAreaLights),E.push(N.numDirLightShadows),E.push(N.numPointLightShadows),E.push(N.numSpotLightShadows),E.push(N.numSpotLightShadowsWithMaps),E.push(N.shadowMapType),E.push(N.toneMapping),E.push(N.numClippingPlanes),E.push(N.numClipIntersection),E.push(N.depthPacking)}function R(E,N){c.disableAll(),N.isWebGL2&&c.enable(0),N.supportsVertexTextures&&c.enable(1),N.instancing&&c.enable(2),N.instancingColor&&c.enable(3),N.map&&c.enable(4),N.matcap&&c.enable(5),N.envMap&&c.enable(6),N.lightMap&&c.enable(7),N.aoMap&&c.enable(8),N.emissiveMap&&c.enable(9),N.bumpMap&&c.enable(10),N.normalMap&&c.enable(11),N.objectSpaceNormalMap&&c.enable(12),N.tangentSpaceNormalMap&&c.enable(13),N.clearcoat&&c.enable(14),N.clearcoatMap&&c.enable(15),N.clearcoatRoughnessMap&&c.enable(16),N.clearcoatNormalMap&&c.enable(17),N.iridescence&&c.enable(18),N.iridescenceMap&&c.enable(19),N.iridescenceThicknessMap&&c.enable(20),N.displacementMap&&c.enable(21),N.specularMap&&c.enable(22),N.roughnessMap&&c.enable(23),N.metalnessMap&&c.enable(24),N.gradientMap&&c.enable(25),N.alphaMap&&c.enable(26),N.alphaTest&&c.enable(27),N.vertexColors&&c.enable(28),N.vertexAlphas&&c.enable(29),N.vertexUvs&&c.enable(30),N.vertexTangents&&c.enable(31),N.uvsVertexOnly&&c.enable(32),E.push(c.mask),c.disableAll(),N.fog&&c.enable(0),N.useFog&&c.enable(1),N.flatShading&&c.enable(2),N.logarithmicDepthBuffer&&c.enable(3),N.skinning&&c.enable(4),N.morphTargets&&c.enable(5),N.morphNormals&&c.enable(6),N.morphColors&&c.enable(7),N.premultipliedAlpha&&c.enable(8),N.shadowMapEnabled&&c.enable(9),N.physicallyCorrectLights&&c.enable(10),N.doubleSided&&c.enable(11),N.flipSided&&c.enable(12),N.useDepthPacking&&c.enable(13),N.dithering&&c.enable(14),N.specularIntensityMap&&c.enable(15),N.specularColorMap&&c.enable(16),N.transmission&&c.enable(17),N.transmissionMap&&c.enable(18),N.thicknessMap&&c.enable(19),N.sheen&&c.enable(20),N.sheenColorMap&&c.enable(21),N.sheenRoughnessMap&&c.enable(22),N.decodeVideoTexture&&c.enable(23),N.opaque&&c.enable(24),E.push(c.mask)}function I(E){const N=b[E.type];let X;if(N){const ue=ni[N];X=RS.clone(ue.uniforms)}else X=E.uniforms;return X}function P(E,N){let X;for(let ue=0,ye=h.length;ue<ye;ue++){const J=h[ue];if(J.cacheKey===N){X=J,++X.usedTimes;break}}return X===void 0&&(X=new B1(o,N,E,l),h.push(X)),X}function C(E){if(--E.usedTimes===0){const N=h.indexOf(E);h[N]=h[h.length-1],h.pop(),E.destroy()}}function O(E){d.remove(E)}function H(){d.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:I,acquireProgram:P,releaseProgram:C,releaseShaderCache:O,programs:h,dispose:H}}function k1(){let o=new WeakMap;function e(l){let u=o.get(l);return u===void 0&&(u={},o.set(l,u)),u}function t(l){o.delete(l)}function r(l,u,c){o.get(l)[u]=c}function s(){o=new WeakMap}return{get:e,remove:t,update:r,dispose:s}}function q1(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Kh(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Jh(){const o=[];let e=0;const t=[],r=[],s=[];function l(){e=0,t.length=0,r.length=0,s.length=0}function u(g,_,M,b,v,p){let w=o[e];return w===void 0?(w={id:g.id,object:g,geometry:_,material:M,groupOrder:b,renderOrder:g.renderOrder,z:v,group:p},o[e]=w):(w.id=g.id,w.object=g,w.geometry=_,w.material=M,w.groupOrder=b,w.renderOrder=g.renderOrder,w.z=v,w.group=p),e++,w}function c(g,_,M,b,v,p){const w=u(g,_,M,b,v,p);M.transmission>0?r.push(w):M.transparent===!0?s.push(w):t.push(w)}function d(g,_,M,b,v,p){const w=u(g,_,M,b,v,p);M.transmission>0?r.unshift(w):M.transparent===!0?s.unshift(w):t.unshift(w)}function h(g,_){t.length>1&&t.sort(g||q1),r.length>1&&r.sort(_||Kh),s.length>1&&s.sort(_||Kh)}function m(){for(let g=e,_=o.length;g<_;g++){const M=o[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:r,transparent:s,init:l,push:c,unshift:d,finish:m,sort:h}}function X1(){let o=new WeakMap;function e(r,s){const l=o.get(r);let u;return l===void 0?(u=new Jh,o.set(r,[u])):s>=l.length?(u=new Jh,l.push(u)):u=l[s],u}function t(){o=new WeakMap}return{get:e,dispose:t}}function Y1(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new vt};break;case"SpotLight":t={position:new W,direction:new W,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new vt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":t={color:new vt,position:new W,halfWidth:new W,halfHeight:new W};break}return o[e.id]=t,t}}}function Z1(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let $1=0;function K1(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function J1(o,e){const t=new Y1,r=Z1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let m=0;m<9;m++)s.probe.push(new W);const l=new W,u=new Bt,c=new Bt;function d(m,g){let _=0,M=0,b=0;for(let ue=0;ue<9;ue++)s.probe[ue].set(0,0,0);let v=0,p=0,w=0,R=0,I=0,P=0,C=0,O=0,H=0,E=0;m.sort(K1);const N=g!==!0?Math.PI:1;for(let ue=0,ye=m.length;ue<ye;ue++){const J=m[ue],k=J.color,ae=J.intensity,he=J.distance,le=J.shadow&&J.shadow.map?J.shadow.map.texture:null;if(J.isAmbientLight)_+=k.r*ae*N,M+=k.g*ae*N,b+=k.b*ae*N;else if(J.isLightProbe)for(let ee=0;ee<9;ee++)s.probe[ee].addScaledVector(J.sh.coefficients[ee],ae);else if(J.isDirectionalLight){const ee=t.get(J);if(ee.color.copy(J.color).multiplyScalar(J.intensity*N),J.castShadow){const q=J.shadow,Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,s.directionalShadow[v]=Z,s.directionalShadowMap[v]=le,s.directionalShadowMatrix[v]=J.shadow.matrix,P++}s.directional[v]=ee,v++}else if(J.isSpotLight){const ee=t.get(J);ee.position.setFromMatrixPosition(J.matrixWorld),ee.color.copy(k).multiplyScalar(ae*N),ee.distance=he,ee.coneCos=Math.cos(J.angle),ee.penumbraCos=Math.cos(J.angle*(1-J.penumbra)),ee.decay=J.decay,s.spot[w]=ee;const q=J.shadow;if(J.map&&(s.spotLightMap[H]=J.map,H++,q.updateMatrices(J),J.castShadow&&E++),s.spotLightMatrix[w]=q.matrix,J.castShadow){const Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,s.spotShadow[w]=Z,s.spotShadowMap[w]=le,O++}w++}else if(J.isRectAreaLight){const ee=t.get(J);ee.color.copy(k).multiplyScalar(ae),ee.halfWidth.set(J.width*.5,0,0),ee.halfHeight.set(0,J.height*.5,0),s.rectArea[R]=ee,R++}else if(J.isPointLight){const ee=t.get(J);if(ee.color.copy(J.color).multiplyScalar(J.intensity*N),ee.distance=J.distance,ee.decay=J.decay,J.castShadow){const q=J.shadow,Z=r.get(J);Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,Z.shadowCameraNear=q.camera.near,Z.shadowCameraFar=q.camera.far,s.pointShadow[p]=Z,s.pointShadowMap[p]=le,s.pointShadowMatrix[p]=J.shadow.matrix,C++}s.point[p]=ee,p++}else if(J.isHemisphereLight){const ee=t.get(J);ee.skyColor.copy(J.color).multiplyScalar(ae*N),ee.groundColor.copy(J.groundColor).multiplyScalar(ae*N),s.hemi[I]=ee,I++}}R>0&&(e.isWebGL2||o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_FLOAT_1,s.rectAreaLTC2=ge.LTC_FLOAT_2):o.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_HALF_1,s.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=_,s.ambient[1]=M,s.ambient[2]=b;const X=s.hash;(X.directionalLength!==v||X.pointLength!==p||X.spotLength!==w||X.rectAreaLength!==R||X.hemiLength!==I||X.numDirectionalShadows!==P||X.numPointShadows!==C||X.numSpotShadows!==O||X.numSpotMaps!==H)&&(s.directional.length=v,s.spot.length=w,s.rectArea.length=R,s.point.length=p,s.hemi.length=I,s.directionalShadow.length=P,s.directionalShadowMap.length=P,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=O,s.spotShadowMap.length=O,s.directionalShadowMatrix.length=P,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=O+H-E,s.spotLightMap.length=H,s.numSpotLightShadowsWithMaps=E,X.directionalLength=v,X.pointLength=p,X.spotLength=w,X.rectAreaLength=R,X.hemiLength=I,X.numDirectionalShadows=P,X.numPointShadows=C,X.numSpotShadows=O,X.numSpotMaps=H,s.version=$1++)}function h(m,g){let _=0,M=0,b=0,v=0,p=0;const w=g.matrixWorldInverse;for(let R=0,I=m.length;R<I;R++){const P=m[R];if(P.isDirectionalLight){const C=s.directional[_];C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(w),_++}else if(P.isSpotLight){const C=s.spot[b];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(w),b++}else if(P.isRectAreaLight){const C=s.rectArea[v];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),c.identity(),u.copy(P.matrixWorld),u.premultiply(w),c.extractRotation(u),C.halfWidth.set(P.width*.5,0,0),C.halfHeight.set(0,P.height*.5,0),C.halfWidth.applyMatrix4(c),C.halfHeight.applyMatrix4(c),v++}else if(P.isPointLight){const C=s.point[M];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(w),M++}else if(P.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(P.matrixWorld),C.direction.transformDirection(w),p++}}}return{setup:d,setupView:h,state:s}}function Qh(o,e){const t=new J1(o,e),r=[],s=[];function l(){r.length=0,s.length=0}function u(g){r.push(g)}function c(g){s.push(g)}function d(g){t.setup(r,g)}function h(g){t.setupView(r,g)}return{init:l,state:{lightsArray:r,shadowsArray:s,lights:t},setupLights:d,setupLightsView:h,pushLight:u,pushShadow:c}}function Q1(o,e){let t=new WeakMap;function r(l,u=0){const c=t.get(l);let d;return c===void 0?(d=new Qh(o,e),t.set(l,[d])):u>=c.length?(d=new Qh(o,e),c.push(d)):d=c[u],d}function s(){t=new WeakMap}return{get:r,dispose:s}}class j1 extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eT extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new W,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nT=`uniform sampler2D shadow_pass;
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
}`;function iT(o,e,t){let r=new Id;const s=new gt,l=new gt,u=new Xt,c=new j1({depthPacking:hS}),d=new eT,h={},m=t.maxTextureSize,g={0:Un,1:is,2:Vi},_=new vr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:tT,fragmentShader:nT}),M=_.clone();M.defines.HORIZONTAL_PASS=1;const b=new Gn;b.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Hi(b,_),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=md,this.render=function(P,C,O){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const H=o.getRenderTarget(),E=o.getActiveCubeFace(),N=o.getActiveMipmapLevel(),X=o.state;X.setBlending(qi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);for(let ue=0,ye=P.length;ue<ye;ue++){const J=P[ue],k=J.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const ae=k.getFrameExtents();if(s.multiply(ae),l.copy(k.mapSize),(s.x>m||s.y>m)&&(s.x>m&&(l.x=Math.floor(m/ae.x),s.x=l.x*ae.x,k.mapSize.x=l.x),s.y>m&&(l.y=Math.floor(m/ae.y),s.y=l.y*ae.y,k.mapSize.y=l.y)),k.map===null){const le=this.type!==Is?{minFilter:dn,magFilter:dn}:{};k.map=new xr(s.x,s.y,le),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}o.setRenderTarget(k.map),o.clear();const he=k.getViewportCount();for(let le=0;le<he;le++){const ee=k.getViewport(le);u.set(l.x*ee.x,l.y*ee.y,l.x*ee.z,l.y*ee.w),X.viewport(u),k.updateMatrices(J,le),r=k.getFrustum(),I(C,O,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Is&&w(k,O),k.needsUpdate=!1}p.needsUpdate=!1,o.setRenderTarget(H,E,N)};function w(P,C){const O=e.update(v);_.defines.VSM_SAMPLES!==P.blurSamples&&(_.defines.VSM_SAMPLES=P.blurSamples,M.defines.VSM_SAMPLES=P.blurSamples,_.needsUpdate=!0,M.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new xr(s.x,s.y)),_.uniforms.shadow_pass.value=P.map.texture,_.uniforms.resolution.value=P.mapSize,_.uniforms.radius.value=P.radius,o.setRenderTarget(P.mapPass),o.clear(),o.renderBufferDirect(C,null,O,_,v,null),M.uniforms.shadow_pass.value=P.mapPass.texture,M.uniforms.resolution.value=P.mapSize,M.uniforms.radius.value=P.radius,o.setRenderTarget(P.map),o.clear(),o.renderBufferDirect(C,null,O,M,v,null)}function R(P,C,O,H,E,N){let X=null;const ue=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(ue!==void 0?X=ue:X=O.isPointLight===!0?d:c,o.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0){const ye=X.uuid,J=C.uuid;let k=h[ye];k===void 0&&(k={},h[ye]=k);let ae=k[J];ae===void 0&&(ae=X.clone(),k[J]=ae),X=ae}return X.visible=C.visible,X.wireframe=C.wireframe,N===Is?X.side=C.shadowSide!==null?C.shadowSide:C.side:X.side=C.shadowSide!==null?C.shadowSide:g[C.side],X.alphaMap=C.alphaMap,X.alphaTest=C.alphaTest,X.clipShadows=C.clipShadows,X.clippingPlanes=C.clippingPlanes,X.clipIntersection=C.clipIntersection,X.displacementMap=C.displacementMap,X.displacementScale=C.displacementScale,X.displacementBias=C.displacementBias,X.wireframeLinewidth=C.wireframeLinewidth,X.linewidth=C.linewidth,O.isPointLight===!0&&X.isMeshDistanceMaterial===!0&&(X.referencePosition.setFromMatrixPosition(O.matrixWorld),X.nearDistance=H,X.farDistance=E),X}function I(P,C,O,H,E){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&E===Is)&&(!P.frustumCulled||r.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);const ue=e.update(P),ye=P.material;if(Array.isArray(ye)){const J=ue.groups;for(let k=0,ae=J.length;k<ae;k++){const he=J[k],le=ye[he.materialIndex];if(le&&le.visible){const ee=R(P,le,H,O.near,O.far,E);o.renderBufferDirect(O,null,ue,ee,P,he)}}}else if(ye.visible){const J=R(P,ye,H,O.near,O.far,E);o.renderBufferDirect(O,null,ue,J,P,null)}}const X=P.children;for(let ue=0,ye=X.length;ue<ye;ue++)I(X[ue],C,O,H,E)}}function rT(o,e,t){const r=t.isWebGL2;function s(){let z=!1;const Se=new Xt;let Q=null;const Me=new Xt(0,0,0,0);return{setMask:function(ve){Q!==ve&&!z&&(o.colorMask(ve,ve,ve,ve),Q=ve)},setLocked:function(ve){z=ve},setClear:function(ve,je,It,bt,Qn){Qn===!0&&(ve*=bt,je*=bt,It*=bt),Se.set(ve,je,It,bt),Me.equals(Se)===!1&&(o.clearColor(ve,je,It,bt),Me.copy(Se))},reset:function(){z=!1,Q=null,Me.set(-1,0,0,0)}}}function l(){let z=!1,Se=null,Q=null,Me=null;return{setTest:function(ve){ve?lt(2929):Fe(2929)},setMask:function(ve){Se!==ve&&!z&&(o.depthMask(ve),Se=ve)},setFunc:function(ve){if(Q!==ve){if(ve)switch(ve){case NM:o.depthFunc(512);break;case OM:o.depthFunc(519);break;case UM:o.depthFunc(513);break;case sc:o.depthFunc(515);break;case zM:o.depthFunc(514);break;case BM:o.depthFunc(518);break;case GM:o.depthFunc(516);break;case WM:o.depthFunc(517);break;default:o.depthFunc(515)}else o.depthFunc(515);Q=ve}},setLocked:function(ve){z=ve},setClear:function(ve){Me!==ve&&(o.clearDepth(ve),Me=ve)},reset:function(){z=!1,Se=null,Q=null,Me=null}}}function u(){let z=!1,Se=null,Q=null,Me=null,ve=null,je=null,It=null,bt=null,Qn=null;return{setTest:function(Mt){z||(Mt?lt(2960):Fe(2960))},setMask:function(Mt){Se!==Mt&&!z&&(o.stencilMask(Mt),Se=Mt)},setFunc:function(Mt,wn,ln){(Q!==Mt||Me!==wn||ve!==ln)&&(o.stencilFunc(Mt,wn,ln),Q=Mt,Me=wn,ve=ln)},setOp:function(Mt,wn,ln){(je!==Mt||It!==wn||bt!==ln)&&(o.stencilOp(Mt,wn,ln),je=Mt,It=wn,bt=ln)},setLocked:function(Mt){z=Mt},setClear:function(Mt){Qn!==Mt&&(o.clearStencil(Mt),Qn=Mt)},reset:function(){z=!1,Se=null,Q=null,Me=null,ve=null,je=null,It=null,bt=null,Qn=null}}}const c=new s,d=new l,h=new u,m=new WeakMap,g=new WeakMap;let _={},M={},b=new WeakMap,v=[],p=null,w=!1,R=null,I=null,P=null,C=null,O=null,H=null,E=null,N=!1,X=null,ue=null,ye=null,J=null,k=null;const ae=o.getParameter(35661);let he=!1,le=0;const ee=o.getParameter(7938);ee.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(ee)[1]),he=le>=1):ee.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),he=le>=2);let q=null,Z={};const ce=o.getParameter(3088),pe=o.getParameter(2978),de=new Xt().fromArray(ce),Ae=new Xt().fromArray(pe);function Ue(z,Se,Q){const Me=new Uint8Array(4),ve=o.createTexture();o.bindTexture(z,ve),o.texParameteri(z,10241,9728),o.texParameteri(z,10240,9728);for(let je=0;je<Q;je++)o.texImage2D(Se+je,0,6408,1,1,0,6408,5121,Me);return ve}const se={};se[3553]=Ue(3553,3553,1),se[34067]=Ue(34067,34069,6),c.setClear(0,0,0,1),d.setClear(1),h.setClear(0),lt(2929),d.setFunc(sc),Vt(!1),Dt(Vf),lt(2884),ut(qi);function lt(z){_[z]!==!0&&(o.enable(z),_[z]=!0)}function Fe(z){_[z]!==!1&&(o.disable(z),_[z]=!1)}function Be(z,Se){return M[z]!==Se?(o.bindFramebuffer(z,Se),M[z]=Se,r&&(z===36009&&(M[36160]=Se),z===36160&&(M[36009]=Se)),!0):!1}function Ee(z,Se){let Q=v,Me=!1;if(z)if(Q=b.get(Se),Q===void 0&&(Q=[],b.set(Se,Q)),z.isWebGLMultipleRenderTargets){const ve=z.texture;if(Q.length!==ve.length||Q[0]!==36064){for(let je=0,It=ve.length;je<It;je++)Q[je]=36064+je;Q.length=ve.length,Me=!0}}else Q[0]!==36064&&(Q[0]=36064,Me=!0);else Q[0]!==1029&&(Q[0]=1029,Me=!0);Me&&(t.isWebGL2?o.drawBuffers(Q):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Q))}function st(z){return p!==z?(o.useProgram(z),p=z,!0):!1}const qe={[jr]:32774,[wM]:32778,[TM]:32779};if(r)qe[qf]=32775,qe[Xf]=32776;else{const z=e.get("EXT_blend_minmax");z!==null&&(qe[qf]=z.MIN_EXT,qe[Xf]=z.MAX_EXT)}const Pe={[EM]:0,[AM]:1,[CM]:768,[gd]:770,[FM]:776,[PM]:774,[RM]:772,[LM]:769,[_d]:771,[IM]:775,[DM]:773};function ut(z,Se,Q,Me,ve,je,It,bt){if(z===qi){w===!0&&(Fe(3042),w=!1);return}if(w===!1&&(lt(3042),w=!0),z!==bM){if(z!==R||bt!==N){if((I!==jr||O!==jr)&&(o.blendEquation(32774),I=jr,O=jr),bt)switch(z){case ts:o.blendFuncSeparate(1,771,1,771);break;case Ns:o.blendFunc(1,1);break;case Hf:o.blendFuncSeparate(0,769,0,1);break;case kf:o.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case ts:o.blendFuncSeparate(770,771,1,771);break;case Ns:o.blendFunc(770,1);break;case Hf:o.blendFuncSeparate(0,769,0,1);break;case kf:o.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}P=null,C=null,H=null,E=null,R=z,N=bt}return}ve=ve||Se,je=je||Q,It=It||Me,(Se!==I||ve!==O)&&(o.blendEquationSeparate(qe[Se],qe[ve]),I=Se,O=ve),(Q!==P||Me!==C||je!==H||It!==E)&&(o.blendFuncSeparate(Pe[Q],Pe[Me],Pe[je],Pe[It]),P=Q,C=Me,H=je,E=It),R=z,N=null}function Nt(z,Se){z.side===Vi?Fe(2884):lt(2884);let Q=z.side===Un;Se&&(Q=!Q),Vt(Q),z.blending===ts&&z.transparent===!1?ut(qi):ut(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.premultipliedAlpha),d.setFunc(z.depthFunc),d.setTest(z.depthTest),d.setMask(z.depthWrite),c.setMask(z.colorWrite);const Me=z.stencilWrite;h.setTest(Me),Me&&(h.setMask(z.stencilWriteMask),h.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),h.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),ft(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?lt(32926):Fe(32926)}function Vt(z){X!==z&&(z?o.frontFace(2304):o.frontFace(2305),X=z)}function Dt(z){z!==MM?(lt(2884),z!==ue&&(z===Vf?o.cullFace(1029):z===SM?o.cullFace(1028):o.cullFace(1032))):Fe(2884),ue=z}function Pt(z){z!==ye&&(he&&o.lineWidth(z),ye=z)}function ft(z,Se,Q){z?(lt(32823),(J!==Se||k!==Q)&&(o.polygonOffset(Se,Q),J=Se,k=Q)):Fe(32823)}function Qt(z){z?lt(3089):Fe(3089)}function Tt(z){z===void 0&&(z=33984+ae-1),q!==z&&(o.activeTexture(z),q=z)}function L(z,Se){q===null&&Tt();let Q=Z[q];Q===void 0&&(Q={type:void 0,texture:void 0},Z[q]=Q),(Q.type!==z||Q.texture!==Se)&&(o.bindTexture(z,Se||se[z]),Q.type=z,Q.texture=Se)}function T(){const z=Z[q];z!==void 0&&z.type!==void 0&&(o.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function te(){try{o.compressedTexImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function fe(){try{o.texSubImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{o.texSubImage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function xe(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ze(){try{o.texStorage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $(){try{o.texStorage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{o.texImage2D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(){try{o.texImage3D.apply(o,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Le(z){de.equals(z)===!1&&(o.scissor(z.x,z.y,z.z,z.w),de.copy(z))}function Te(z){Ae.equals(z)===!1&&(o.viewport(z.x,z.y,z.z,z.w),Ae.copy(z))}function He(z,Se){let Q=g.get(Se);Q===void 0&&(Q=new WeakMap,g.set(Se,Q));let Me=Q.get(z);Me===void 0&&(Me=o.getUniformBlockIndex(Se,z.name),Q.set(z,Me))}function it(z,Se){const Me=g.get(Se).get(z);m.get(z)!==Me&&(o.uniformBlockBinding(Se,Me,z.__bindingPointIndex),m.set(z,Me))}function _t(){o.disable(3042),o.disable(2884),o.disable(2929),o.disable(32823),o.disable(3089),o.disable(2960),o.disable(32926),o.blendEquation(32774),o.blendFunc(1,0),o.blendFuncSeparate(1,0,1,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(513),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(519,0,4294967295),o.stencilOp(7680,7680,7680),o.clearStencil(0),o.cullFace(1029),o.frontFace(2305),o.polygonOffset(0,0),o.activeTexture(33984),o.bindFramebuffer(36160,null),r===!0&&(o.bindFramebuffer(36009,null),o.bindFramebuffer(36008,null)),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),_={},q=null,Z={},M={},b=new WeakMap,v=[],p=null,w=!1,R=null,I=null,P=null,C=null,O=null,H=null,E=null,N=!1,X=null,ue=null,ye=null,J=null,k=null,de.set(0,0,o.canvas.width,o.canvas.height),Ae.set(0,0,o.canvas.width,o.canvas.height),c.reset(),d.reset(),h.reset()}return{buffers:{color:c,depth:d,stencil:h},enable:lt,disable:Fe,bindFramebuffer:Be,drawBuffers:Ee,useProgram:st,setBlending:ut,setMaterial:Nt,setFlipSided:Vt,setCullFace:Dt,setLineWidth:Pt,setPolygonOffset:ft,setScissorTest:Qt,activeTexture:Tt,bindTexture:L,unbindTexture:T,compressedTexImage2D:te,texImage2D:Re,texImage3D:we,updateUBOMapping:He,uniformBlockBinding:it,texStorage2D:ze,texStorage3D:$,texSubImage2D:fe,texSubImage3D:me,compressedTexSubImage2D:xe,scissor:Le,viewport:Te,reset:_t}}function sT(o,e,t,r,s,l,u){const c=s.isWebGL2,d=s.maxTextures,h=s.maxCubemapSize,m=s.maxTextureSize,g=s.maxSamples,_=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,M=/OculusBrowser/g.test(navigator.userAgent),b=new WeakMap;let v;const p=new WeakMap;let w=!1;try{w=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(L,T){return w?new OffscreenCanvas(L,T):io("canvas")}function I(L,T,te,fe){let me=1;if((L.width>fe||L.height>fe)&&(me=fe/Math.max(L.width,L.height)),me<1||T===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const xe=T?fc:Math.floor,ze=xe(me*L.width),$=xe(me*L.height);v===void 0&&(v=R(ze,$));const Re=te?R(ze,$):v;return Re.width=ze,Re.height=$,Re.getContext("2d").drawImage(L,0,0,ze,$),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+ze+"x"+$+")."),Re}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function P(L){return vh(L.width)&&vh(L.height)}function C(L){return c?!1:L.wrapS!==Jn||L.wrapT!==Jn||L.minFilter!==dn&&L.minFilter!==Fn}function O(L,T){return L.generateMipmaps&&T&&L.minFilter!==dn&&L.minFilter!==Fn}function H(L){o.generateMipmap(L)}function E(L,T,te,fe,me=!1){if(c===!1)return T;if(L!==null){if(o[L]!==void 0)return o[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let xe=T;return T===6403&&(te===5126&&(xe=33326),te===5131&&(xe=33325),te===5121&&(xe=33321)),T===33319&&(te===5126&&(xe=33328),te===5131&&(xe=33327),te===5121&&(xe=33323)),T===6408&&(te===5126&&(xe=34836),te===5131&&(xe=34842),te===5121&&(xe=fe===Ct&&me===!1?35907:32856),te===32819&&(xe=32854),te===32820&&(xe=32855)),(xe===33325||xe===33326||xe===33327||xe===33328||xe===34842||xe===34836)&&e.get("EXT_color_buffer_float"),xe}function N(L,T,te){return O(L,te)===!0||L.isFramebufferTexture&&L.minFilter!==dn&&L.minFilter!==Fn?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function X(L){return L===dn||L===Yf||L===Zf?9728:9729}function ue(L){const T=L.target;T.removeEventListener("dispose",ue),J(T),T.isVideoTexture&&b.delete(T)}function ye(L){const T=L.target;T.removeEventListener("dispose",ye),ae(T)}function J(L){const T=r.get(L);if(T.__webglInit===void 0)return;const te=L.source,fe=p.get(te);if(fe){const me=fe[T.__cacheKey];me.usedTimes--,me.usedTimes===0&&k(L),Object.keys(fe).length===0&&p.delete(te)}r.remove(L)}function k(L){const T=r.get(L);o.deleteTexture(T.__webglTexture);const te=L.source,fe=p.get(te);delete fe[T.__cacheKey],u.memory.textures--}function ae(L){const T=L.texture,te=r.get(L),fe=r.get(T);if(fe.__webglTexture!==void 0&&(o.deleteTexture(fe.__webglTexture),u.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let me=0;me<6;me++)o.deleteFramebuffer(te.__webglFramebuffer[me]),te.__webglDepthbuffer&&o.deleteRenderbuffer(te.__webglDepthbuffer[me]);else{if(o.deleteFramebuffer(te.__webglFramebuffer),te.__webglDepthbuffer&&o.deleteRenderbuffer(te.__webglDepthbuffer),te.__webglMultisampledFramebuffer&&o.deleteFramebuffer(te.__webglMultisampledFramebuffer),te.__webglColorRenderbuffer)for(let me=0;me<te.__webglColorRenderbuffer.length;me++)te.__webglColorRenderbuffer[me]&&o.deleteRenderbuffer(te.__webglColorRenderbuffer[me]);te.__webglDepthRenderbuffer&&o.deleteRenderbuffer(te.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let me=0,xe=T.length;me<xe;me++){const ze=r.get(T[me]);ze.__webglTexture&&(o.deleteTexture(ze.__webglTexture),u.memory.textures--),r.remove(T[me])}r.remove(T),r.remove(L)}let he=0;function le(){he=0}function ee(){const L=he;return L>=d&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+d),he+=1,L}function q(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.encoding),T.join()}function Z(L,T){const te=r.get(L);if(L.isVideoTexture&&Qt(L),L.isRenderTargetTexture===!1&&L.version>0&&te.__version!==L.version){const fe=L.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(te,L,T);return}}t.activeTexture(33984+T),t.bindTexture(3553,te.__webglTexture)}function ce(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Fe(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(35866,te.__webglTexture)}function pe(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Fe(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(32879,te.__webglTexture)}function de(L,T){const te=r.get(L);if(L.version>0&&te.__version!==L.version){Be(te,L,T);return}t.activeTexture(33984+T),t.bindTexture(34067,te.__webglTexture)}const Ae={[lc]:10497,[Jn]:33071,[cc]:33648},Ue={[dn]:9728,[Yf]:9984,[Zf]:9986,[Fn]:9729,[$M]:9985,[ao]:9987};function se(L,T,te){if(te?(o.texParameteri(L,10242,Ae[T.wrapS]),o.texParameteri(L,10243,Ae[T.wrapT]),(L===32879||L===35866)&&o.texParameteri(L,32882,Ae[T.wrapR]),o.texParameteri(L,10240,Ue[T.magFilter]),o.texParameteri(L,10241,Ue[T.minFilter])):(o.texParameteri(L,10242,33071),o.texParameteri(L,10243,33071),(L===32879||L===35866)&&o.texParameteri(L,32882,33071),(T.wrapS!==Jn||T.wrapT!==Jn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),o.texParameteri(L,10240,X(T.magFilter)),o.texParameteri(L,10241,X(T.minFilter)),T.minFilter!==dn&&T.minFilter!==Fn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const fe=e.get("EXT_texture_filter_anisotropic");if(T.type===hr&&e.has("OES_texture_float_linear")===!1||c===!1&&T.type===Os&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||r.get(T).__currentAnisotropy)&&(o.texParameterf(L,fe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy)}}function lt(L,T){let te=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",ue));const fe=T.source;let me=p.get(fe);me===void 0&&(me={},p.set(fe,me));const xe=q(T);if(xe!==L.__cacheKey){me[xe]===void 0&&(me[xe]={texture:o.createTexture(),usedTimes:0},u.memory.textures++,te=!0),me[xe].usedTimes++;const ze=me[L.__cacheKey];ze!==void 0&&(me[L.__cacheKey].usedTimes--,ze.usedTimes===0&&k(T)),L.__cacheKey=xe,L.__webglTexture=me[xe].texture}return te}function Fe(L,T,te){let fe=3553;T.isDataArrayTexture&&(fe=35866),T.isData3DTexture&&(fe=32879);const me=lt(L,T),xe=T.source;if(t.activeTexture(33984+te),t.bindTexture(fe,L.__webglTexture),xe.version!==xe.__currentVersion||me===!0){o.pixelStorei(37440,T.flipY),o.pixelStorei(37441,T.premultiplyAlpha),o.pixelStorei(3317,T.unpackAlignment),o.pixelStorei(37443,0);const ze=C(T)&&P(T.image)===!1;let $=I(T.image,ze,!1,m);$=Tt(T,$);const Re=P($)||c,we=l.convert(T.format,T.encoding);let Le=l.convert(T.type),Te=E(T.internalFormat,we,Le,T.encoding,T.isVideoTexture);se(fe,T,Re);let He;const it=T.mipmaps,_t=c&&T.isVideoTexture!==!0,z=xe.__currentVersion===void 0||me===!0,Se=N(T,$,Re);if(T.isDepthTexture)Te=6402,c?T.type===hr?Te=36012:T.type===fr?Te=33190:T.type===ns?Te=35056:Te=33189:T.type===hr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===pr&&Te===6402&&T.type!==Md&&T.type!==fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=fr,Le=l.convert(T.type)),T.format===as&&Te===6402&&(Te=34041,T.type!==ns&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=ns,Le=l.convert(T.type))),z&&(_t?t.texStorage2D(3553,1,Te,$.width,$.height):t.texImage2D(3553,0,Te,$.width,$.height,0,we,Le,null));else if(T.isDataTexture)if(it.length>0&&Re){_t&&z&&t.texStorage2D(3553,Se,Te,it[0].width,it[0].height);for(let Q=0,Me=it.length;Q<Me;Q++)He=it[Q],_t?t.texSubImage2D(3553,Q,0,0,He.width,He.height,we,Le,He.data):t.texImage2D(3553,Q,Te,He.width,He.height,0,we,Le,He.data);T.generateMipmaps=!1}else _t?(z&&t.texStorage2D(3553,Se,Te,$.width,$.height),t.texSubImage2D(3553,0,0,0,$.width,$.height,we,Le,$.data)):t.texImage2D(3553,0,Te,$.width,$.height,0,we,Le,$.data);else if(T.isCompressedTexture){_t&&z&&t.texStorage2D(3553,Se,Te,it[0].width,it[0].height);for(let Q=0,Me=it.length;Q<Me;Q++)He=it[Q],T.format!==ii?we!==null?_t?t.compressedTexSubImage2D(3553,Q,0,0,He.width,He.height,we,He.data):t.compressedTexImage2D(3553,Q,Te,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?t.texSubImage2D(3553,Q,0,0,He.width,He.height,we,Le,He.data):t.texImage2D(3553,Q,Te,He.width,He.height,0,we,Le,He.data)}else if(T.isDataArrayTexture)_t?(z&&t.texStorage3D(35866,Se,Te,$.width,$.height,$.depth),t.texSubImage3D(35866,0,0,0,0,$.width,$.height,$.depth,we,Le,$.data)):t.texImage3D(35866,0,Te,$.width,$.height,$.depth,0,we,Le,$.data);else if(T.isData3DTexture)_t?(z&&t.texStorage3D(32879,Se,Te,$.width,$.height,$.depth),t.texSubImage3D(32879,0,0,0,0,$.width,$.height,$.depth,we,Le,$.data)):t.texImage3D(32879,0,Te,$.width,$.height,$.depth,0,we,Le,$.data);else if(T.isFramebufferTexture){if(z)if(_t)t.texStorage2D(3553,Se,Te,$.width,$.height);else{let Q=$.width,Me=$.height;for(let ve=0;ve<Se;ve++)t.texImage2D(3553,ve,Te,Q,Me,0,we,Le,null),Q>>=1,Me>>=1}}else if(it.length>0&&Re){_t&&z&&t.texStorage2D(3553,Se,Te,it[0].width,it[0].height);for(let Q=0,Me=it.length;Q<Me;Q++)He=it[Q],_t?t.texSubImage2D(3553,Q,0,0,we,Le,He):t.texImage2D(3553,Q,Te,we,Le,He);T.generateMipmaps=!1}else _t?(z&&t.texStorage2D(3553,Se,Te,$.width,$.height),t.texSubImage2D(3553,0,0,0,we,Le,$)):t.texImage2D(3553,0,Te,we,Le,$);O(T,Re)&&H(fe),xe.__currentVersion=xe.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Be(L,T,te){if(T.image.length!==6)return;const fe=lt(L,T),me=T.source;if(t.activeTexture(33984+te),t.bindTexture(34067,L.__webglTexture),me.version!==me.__currentVersion||fe===!0){o.pixelStorei(37440,T.flipY),o.pixelStorei(37441,T.premultiplyAlpha),o.pixelStorei(3317,T.unpackAlignment),o.pixelStorei(37443,0);const xe=T.isCompressedTexture||T.image[0].isCompressedTexture,ze=T.image[0]&&T.image[0].isDataTexture,$=[];for(let Q=0;Q<6;Q++)!xe&&!ze?$[Q]=I(T.image[Q],!1,!0,h):$[Q]=ze?T.image[Q].image:T.image[Q],$[Q]=Tt(T,$[Q]);const Re=$[0],we=P(Re)||c,Le=l.convert(T.format,T.encoding),Te=l.convert(T.type),He=E(T.internalFormat,Le,Te,T.encoding),it=c&&T.isVideoTexture!==!0,_t=me.__currentVersion===void 0||fe===!0;let z=N(T,Re,we);se(34067,T,we);let Se;if(xe){it&&_t&&t.texStorage2D(34067,z,He,Re.width,Re.height);for(let Q=0;Q<6;Q++){Se=$[Q].mipmaps;for(let Me=0;Me<Se.length;Me++){const ve=Se[Me];T.format!==ii?Le!==null?it?t.compressedTexSubImage2D(34069+Q,Me,0,0,ve.width,ve.height,Le,ve.data):t.compressedTexImage2D(34069+Q,Me,He,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(34069+Q,Me,0,0,ve.width,ve.height,Le,Te,ve.data):t.texImage2D(34069+Q,Me,He,ve.width,ve.height,0,Le,Te,ve.data)}}}else{Se=T.mipmaps,it&&_t&&(Se.length>0&&z++,t.texStorage2D(34067,z,He,$[0].width,$[0].height));for(let Q=0;Q<6;Q++)if(ze){it?t.texSubImage2D(34069+Q,0,0,0,$[Q].width,$[Q].height,Le,Te,$[Q].data):t.texImage2D(34069+Q,0,He,$[Q].width,$[Q].height,0,Le,Te,$[Q].data);for(let Me=0;Me<Se.length;Me++){const je=Se[Me].image[Q].image;it?t.texSubImage2D(34069+Q,Me+1,0,0,je.width,je.height,Le,Te,je.data):t.texImage2D(34069+Q,Me+1,He,je.width,je.height,0,Le,Te,je.data)}}else{it?t.texSubImage2D(34069+Q,0,0,0,Le,Te,$[Q]):t.texImage2D(34069+Q,0,He,Le,Te,$[Q]);for(let Me=0;Me<Se.length;Me++){const ve=Se[Me];it?t.texSubImage2D(34069+Q,Me+1,0,0,Le,Te,ve.image[Q]):t.texImage2D(34069+Q,Me+1,He,Le,Te,ve.image[Q])}}}O(T,we)&&H(34067),me.__currentVersion=me.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Ee(L,T,te,fe,me){const xe=l.convert(te.format,te.encoding),ze=l.convert(te.type),$=E(te.internalFormat,xe,ze,te.encoding);r.get(T).__hasExternalTextures||(me===32879||me===35866?t.texImage3D(me,0,$,T.width,T.height,T.depth,0,xe,ze,null):t.texImage2D(me,0,$,T.width,T.height,0,xe,ze,null)),t.bindFramebuffer(36160,L),ft(T)?_.framebufferTexture2DMultisampleEXT(36160,fe,me,r.get(te).__webglTexture,0,Pt(T)):o.framebufferTexture2D(36160,fe,me,r.get(te).__webglTexture,0),t.bindFramebuffer(36160,null)}function st(L,T,te){if(o.bindRenderbuffer(36161,L),T.depthBuffer&&!T.stencilBuffer){let fe=33189;if(te||ft(T)){const me=T.depthTexture;me&&me.isDepthTexture&&(me.type===hr?fe=36012:me.type===fr&&(fe=33190));const xe=Pt(T);ft(T)?_.renderbufferStorageMultisampleEXT(36161,xe,fe,T.width,T.height):o.renderbufferStorageMultisample(36161,xe,fe,T.width,T.height)}else o.renderbufferStorage(36161,fe,T.width,T.height);o.framebufferRenderbuffer(36160,36096,36161,L)}else if(T.depthBuffer&&T.stencilBuffer){const fe=Pt(T);te&&ft(T)===!1?o.renderbufferStorageMultisample(36161,fe,35056,T.width,T.height):ft(T)?_.renderbufferStorageMultisampleEXT(36161,fe,35056,T.width,T.height):o.renderbufferStorage(36161,34041,T.width,T.height),o.framebufferRenderbuffer(36160,33306,36161,L)}else{const fe=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let me=0;me<fe.length;me++){const xe=fe[me],ze=l.convert(xe.format,xe.encoding),$=l.convert(xe.type),Re=E(xe.internalFormat,ze,$,xe.encoding),we=Pt(T);te&&ft(T)===!1?o.renderbufferStorageMultisample(36161,we,Re,T.width,T.height):ft(T)?_.renderbufferStorageMultisampleEXT(36161,we,Re,T.width,T.height):o.renderbufferStorage(36161,Re,T.width,T.height)}}o.bindRenderbuffer(36161,null)}function qe(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Z(T.depthTexture,0);const fe=r.get(T.depthTexture).__webglTexture,me=Pt(T);if(T.depthTexture.format===pr)ft(T)?_.framebufferTexture2DMultisampleEXT(36160,36096,3553,fe,0,me):o.framebufferTexture2D(36160,36096,3553,fe,0);else if(T.depthTexture.format===as)ft(T)?_.framebufferTexture2DMultisampleEXT(36160,33306,3553,fe,0,me):o.framebufferTexture2D(36160,33306,3553,fe,0);else throw new Error("Unknown depthTexture format")}function Pe(L){const T=r.get(L),te=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");qe(T.__webglFramebuffer,L)}else if(te){T.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)t.bindFramebuffer(36160,T.__webglFramebuffer[fe]),T.__webglDepthbuffer[fe]=o.createRenderbuffer(),st(T.__webglDepthbuffer[fe],L,!1)}else t.bindFramebuffer(36160,T.__webglFramebuffer),T.__webglDepthbuffer=o.createRenderbuffer(),st(T.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function ut(L,T,te){const fe=r.get(L);T!==void 0&&Ee(fe.__webglFramebuffer,L,L.texture,36064,3553),te!==void 0&&Pe(L)}function Nt(L){const T=L.texture,te=r.get(L),fe=r.get(T);L.addEventListener("dispose",ye),L.isWebGLMultipleRenderTargets!==!0&&(fe.__webglTexture===void 0&&(fe.__webglTexture=o.createTexture()),fe.__version=T.version,u.memory.textures++);const me=L.isWebGLCubeRenderTarget===!0,xe=L.isWebGLMultipleRenderTargets===!0,ze=P(L)||c;if(me){te.__webglFramebuffer=[];for(let $=0;$<6;$++)te.__webglFramebuffer[$]=o.createFramebuffer()}else{if(te.__webglFramebuffer=o.createFramebuffer(),xe)if(s.drawBuffers){const $=L.texture;for(let Re=0,we=$.length;Re<we;Re++){const Le=r.get($[Re]);Le.__webglTexture===void 0&&(Le.__webglTexture=o.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&L.samples>0&&ft(L)===!1){const $=xe?T:[T];te.__webglMultisampledFramebuffer=o.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,te.__webglMultisampledFramebuffer);for(let Re=0;Re<$.length;Re++){const we=$[Re];te.__webglColorRenderbuffer[Re]=o.createRenderbuffer(),o.bindRenderbuffer(36161,te.__webglColorRenderbuffer[Re]);const Le=l.convert(we.format,we.encoding),Te=l.convert(we.type),He=E(we.internalFormat,Le,Te,we.encoding),it=Pt(L);o.renderbufferStorageMultisample(36161,it,He,L.width,L.height),o.framebufferRenderbuffer(36160,36064+Re,36161,te.__webglColorRenderbuffer[Re])}o.bindRenderbuffer(36161,null),L.depthBuffer&&(te.__webglDepthRenderbuffer=o.createRenderbuffer(),st(te.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(me){t.bindTexture(34067,fe.__webglTexture),se(34067,T,ze);for(let $=0;$<6;$++)Ee(te.__webglFramebuffer[$],L,T,36064,34069+$);O(T,ze)&&H(34067),t.unbindTexture()}else if(xe){const $=L.texture;for(let Re=0,we=$.length;Re<we;Re++){const Le=$[Re],Te=r.get(Le);t.bindTexture(3553,Te.__webglTexture),se(3553,Le,ze),Ee(te.__webglFramebuffer,L,Le,36064+Re,3553),O(Le,ze)&&H(3553)}t.unbindTexture()}else{let $=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(c?$=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture($,fe.__webglTexture),se($,T,ze),Ee(te.__webglFramebuffer,L,T,36064,$),O(T,ze)&&H($),t.unbindTexture()}L.depthBuffer&&Pe(L)}function Vt(L){const T=P(L)||c,te=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let fe=0,me=te.length;fe<me;fe++){const xe=te[fe];if(O(xe,T)){const ze=L.isWebGLCubeRenderTarget?34067:3553,$=r.get(xe).__webglTexture;t.bindTexture(ze,$),H(ze),t.unbindTexture()}}}function Dt(L){if(c&&L.samples>0&&ft(L)===!1){const T=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],te=L.width,fe=L.height;let me=16384;const xe=[],ze=L.stencilBuffer?33306:36096,$=r.get(L),Re=L.isWebGLMultipleRenderTargets===!0;if(Re)for(let we=0;we<T.length;we++)t.bindFramebuffer(36160,$.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+we,36161,null),t.bindFramebuffer(36160,$.__webglFramebuffer),o.framebufferTexture2D(36009,36064+we,3553,null,0);t.bindFramebuffer(36008,$.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,$.__webglFramebuffer);for(let we=0;we<T.length;we++){xe.push(36064+we),L.depthBuffer&&xe.push(ze);const Le=$.__ignoreDepthValues!==void 0?$.__ignoreDepthValues:!1;if(Le===!1&&(L.depthBuffer&&(me|=256),L.stencilBuffer&&(me|=1024)),Re&&o.framebufferRenderbuffer(36008,36064,36161,$.__webglColorRenderbuffer[we]),Le===!0&&(o.invalidateFramebuffer(36008,[ze]),o.invalidateFramebuffer(36009,[ze])),Re){const Te=r.get(T[we]).__webglTexture;o.framebufferTexture2D(36009,36064,3553,Te,0)}o.blitFramebuffer(0,0,te,fe,0,0,te,fe,me,9728),M&&o.invalidateFramebuffer(36008,xe)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),Re)for(let we=0;we<T.length;we++){t.bindFramebuffer(36160,$.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+we,36161,$.__webglColorRenderbuffer[we]);const Le=r.get(T[we]).__webglTexture;t.bindFramebuffer(36160,$.__webglFramebuffer),o.framebufferTexture2D(36009,36064+we,3553,Le,0)}t.bindFramebuffer(36009,$.__webglMultisampledFramebuffer)}}function Pt(L){return Math.min(g,L.samples)}function ft(L){const T=r.get(L);return c&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Qt(L){const T=u.render.frame;b.get(L)!==T&&(b.set(L,T),L.update())}function Tt(L,T){const te=L.encoding,fe=L.format,me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===uc||te!==_r&&(te===Ct?c===!1?e.has("EXT_sRGB")===!0&&fe===ii?(L.format=uc,L.minFilter=Fn,L.generateMipmaps=!1):T=wd.sRGBToLinear(T):(fe!==ii||me!==gr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",te)),T}this.allocateTextureUnit=ee,this.resetTextureUnits=le,this.setTexture2D=Z,this.setTexture2DArray=ce,this.setTexture3D=pe,this.setTextureCube=de,this.rebindTextures=ut,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=ft}function aT(o,e,t){const r=t.isWebGL2;function s(l,u=null){let c;if(l===gr)return 5121;if(l===jM)return 32819;if(l===eS)return 32820;if(l===KM)return 5120;if(l===JM)return 5122;if(l===Md)return 5123;if(l===QM)return 5124;if(l===fr)return 5125;if(l===hr)return 5126;if(l===Os)return r?5131:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(l===tS)return 6406;if(l===ii)return 6408;if(l===iS)return 6409;if(l===rS)return 6410;if(l===pr)return 6402;if(l===as)return 34041;if(l===sS)return 6403;if(l===nS)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(l===uc)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(l===aS)return 36244;if(l===oS)return 33319;if(l===lS)return 33320;if(l===cS)return 36249;if(l===wl||l===Tl||l===El||l===Al)if(u===Ct)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(l===wl)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Tl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===El)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Al)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(l===wl)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Tl)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===El)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Al)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===$f||l===Kf||l===Jf||l===Qf)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(l===$f)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Kf)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Jf)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Qf)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===uS)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===jf||l===eh)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(l===jf)return u===Ct?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(l===eh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===th||l===nh||l===ih||l===rh||l===sh||l===ah||l===oh||l===lh||l===ch||l===uh||l===fh||l===hh||l===dh||l===ph)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(l===th)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===nh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===ih)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===rh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===sh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===ah)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===oh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===lh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===ch)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===uh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===fh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===hh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===dh)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===ph)return u===Ct?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===mh)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(l===mh)return u===Ct?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return l===ns?r?34042:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):o[l]!==void 0?o[l]:null}return{convert:s}}class oT extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ki extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lT={type:"move"};class tc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let s=null,l=null,u=null;const c=this._targetRay,d=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){u=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,r);if(h.joints[v.jointName]===void 0){const R=new ki;R.matrixAutoUpdate=!1,R.visible=!1,h.joints[v.jointName]=R,h.add(R)}const w=h.joints[v.jointName];p!==null&&(w.matrix.fromArray(p.transform.matrix),w.matrix.decompose(w.position,w.rotation,w.scale),w.jointRadius=p.radius),w.visible=p!==null}const m=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],_=m.position.distanceTo(g.position),M=.02,b=.005;h.inputState.pinching&&_>M+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&_<=M-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1));c!==null&&(s=t.getPose(e.targetRaySpace,r),s===null&&l!==null&&(s=l),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(lT)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=l!==null),h!==null&&(h.visible=u!==null),this}}class cT extends Bn{constructor(e,t,r,s,l,u,c,d,h,m){if(m=m!==void 0?m:pr,m!==pr&&m!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&m===pr&&(r=fr),r===void 0&&m===as&&(r=ns),super(null,s,l,u,c,d,m,r,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:dn,this.minFilter=d!==void 0?d:dn,this.flipY=!1,this.generateMipmaps=!1}}class uT extends ls{constructor(e,t){super();const r=this;let s=null,l=1,u=null,c="local-floor",d=null,h=null,m=null,g=null,_=null,M=null;const b=t.getContextAttributes();let v=null,p=null;const w=[],R=[],I=new Nn;I.layers.enable(1),I.viewport=new Xt;const P=new Nn;P.layers.enable(2),P.viewport=new Xt;const C=[I,P],O=new oT;O.layers.enable(1),O.layers.enable(2);let H=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=w[q];return Z===void 0&&(Z=new tc,w[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=w[q];return Z===void 0&&(Z=new tc,w[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=w[q];return Z===void 0&&(Z=new tc,w[q]=Z),Z.getHandSpace()};function N(q){const Z=R.indexOf(q.inputSource);if(Z===-1)return;const ce=w[Z];ce!==void 0&&ce.dispatchEvent({type:q.type,data:q.inputSource})}function X(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ue);for(let q=0;q<w.length;q++){const Z=R[q];Z!==null&&(R[q]=null,w[q].disconnect(Z))}H=null,E=null,e.setRenderTarget(v),_=null,g=null,m=null,s=null,p=null,ee.stop(),r.isPresenting=!1,r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){l=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(q){d=q},this.getBaseLayer=function(){return g!==null?g:_},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(v=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ue),b.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:s.renderState.layers===void 0?b.antialias:!0,alpha:b.alpha,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:l};_=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:_}),p=new xr(_.framebufferWidth,_.framebufferHeight,{format:ii,type:gr,encoding:e.outputEncoding,stencilBuffer:b.stencil})}else{let Z=null,ce=null,pe=null;b.depth&&(pe=b.stencil?35056:33190,Z=b.stencil?as:pr,ce=b.stencil?ns:fr);const de={colorFormat:32856,depthFormat:pe,scaleFactor:l};m=new XRWebGLBinding(s,t),g=m.createProjectionLayer(de),s.updateRenderState({layers:[g]}),p=new xr(g.textureWidth,g.textureHeight,{format:ii,type:gr,depthTexture:new cT(g.textureWidth,g.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:b.stencil,encoding:e.outputEncoding,samples:b.antialias?4:0});const Ae=e.properties.get(p);Ae.__ignoreDepthValues=g.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),d=null,u=await s.requestReferenceSpace(c),ee.setContext(s),ee.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}};function ue(q){for(let Z=0;Z<q.removed.length;Z++){const ce=q.removed[Z],pe=R.indexOf(ce);pe>=0&&(R[pe]=null,w[pe].dispatchEvent({type:"disconnected",data:ce}))}for(let Z=0;Z<q.added.length;Z++){const ce=q.added[Z];let pe=R.indexOf(ce);if(pe===-1){for(let Ae=0;Ae<w.length;Ae++)if(Ae>=R.length){R.push(ce),pe=Ae;break}else if(R[Ae]===null){R[Ae]=ce,pe=Ae;break}if(pe===-1)break}const de=w[pe];de&&de.dispatchEvent({type:"connected",data:ce})}}const ye=new W,J=new W;function k(q,Z,ce){ye.setFromMatrixPosition(Z.matrixWorld),J.setFromMatrixPosition(ce.matrixWorld);const pe=ye.distanceTo(J),de=Z.projectionMatrix.elements,Ae=ce.projectionMatrix.elements,Ue=de[14]/(de[10]-1),se=de[14]/(de[10]+1),lt=(de[9]+1)/de[5],Fe=(de[9]-1)/de[5],Be=(de[8]-1)/de[0],Ee=(Ae[8]+1)/Ae[0],st=Ue*Be,qe=Ue*Ee,Pe=pe/(-Be+Ee),ut=Pe*-Be;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ut),q.translateZ(Pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const Nt=Ue+Pe,Vt=se+Pe,Dt=st-ut,Pt=qe+(pe-ut),ft=lt*se/Vt*Nt,Qt=Fe*se/Vt*Nt;q.projectionMatrix.makePerspective(Dt,Pt,ft,Qt,Nt,Vt)}function ae(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;O.near=P.near=I.near=q.near,O.far=P.far=I.far=q.far,(H!==O.near||E!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,E=O.far);const Z=q.parent,ce=O.cameras;ae(O,Z);for(let de=0;de<ce.length;de++)ae(ce[de],Z);O.matrixWorld.decompose(O.position,O.quaternion,O.scale),q.matrix.copy(O.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale);const pe=q.children;for(let de=0,Ae=pe.length;de<Ae;de++)pe[de].updateMatrixWorld(!0);ce.length===2?k(O,I,P):O.projectionMatrix.copy(I.projectionMatrix)},this.getCamera=function(){return O},this.getFoveation=function(){if(g!==null)return g.fixedFoveation;if(_!==null)return _.fixedFoveation},this.setFoveation=function(q){g!==null&&(g.fixedFoveation=q),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=q)};let he=null;function le(q,Z){if(h=Z.getViewerPose(d||u),M=Z,h!==null){const ce=h.views;_!==null&&(e.setRenderTargetFramebuffer(p,_.framebuffer),e.setRenderTarget(p));let pe=!1;ce.length!==O.cameras.length&&(O.cameras.length=0,pe=!0);for(let de=0;de<ce.length;de++){const Ae=ce[de];let Ue=null;if(_!==null)Ue=_.getViewport(Ae);else{const lt=m.getViewSubImage(g,Ae);Ue=lt.viewport,de===0&&(e.setRenderTargetTextures(p,lt.colorTexture,g.ignoreDepthValues?void 0:lt.depthStencilTexture),e.setRenderTarget(p))}let se=C[de];se===void 0&&(se=new Nn,se.layers.enable(de),se.viewport=new Xt,C[de]=se),se.matrix.fromArray(Ae.transform.matrix),se.projectionMatrix.fromArray(Ae.projectionMatrix),se.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),de===0&&O.matrix.copy(se.matrix),pe===!0&&O.cameras.push(se)}}for(let ce=0;ce<w.length;ce++){const pe=R[ce],de=w[ce];pe!==null&&de!==void 0&&de.update(pe,Z,d||u)}he&&he(q,Z),M=null}const ee=new Fd;ee.setAnimationLoop(le),this.setAnimationLoop=function(q){he=q},this.dispose=function(){}}}function fT(o,e){function t(v,p){v.fogColor.value.copy(p.color),p.isFog?(v.fogNear.value=p.near,v.fogFar.value=p.far):p.isFogExp2&&(v.fogDensity.value=p.density)}function r(v,p,w,R,I){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(v,p):p.isMeshToonMaterial?(s(v,p),m(v,p)):p.isMeshPhongMaterial?(s(v,p),h(v,p)):p.isMeshStandardMaterial?(s(v,p),g(v,p),p.isMeshPhysicalMaterial&&_(v,p,I)):p.isMeshMatcapMaterial?(s(v,p),M(v,p)):p.isMeshDepthMaterial?s(v,p):p.isMeshDistanceMaterial?(s(v,p),b(v,p)):p.isMeshNormalMaterial?s(v,p):p.isLineBasicMaterial?(l(v,p),p.isLineDashedMaterial&&u(v,p)):p.isPointsMaterial?c(v,p,w,R):p.isSpriteMaterial?d(v,p):p.isShadowMaterial?(v.color.value.copy(p.color),v.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(v,p){v.opacity.value=p.opacity,p.color&&v.diffuse.value.copy(p.color),p.emissive&&v.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(v.map.value=p.map),p.alphaMap&&(v.alphaMap.value=p.alphaMap),p.bumpMap&&(v.bumpMap.value=p.bumpMap,v.bumpScale.value=p.bumpScale,p.side===Un&&(v.bumpScale.value*=-1)),p.displacementMap&&(v.displacementMap.value=p.displacementMap,v.displacementScale.value=p.displacementScale,v.displacementBias.value=p.displacementBias),p.emissiveMap&&(v.emissiveMap.value=p.emissiveMap),p.normalMap&&(v.normalMap.value=p.normalMap,v.normalScale.value.copy(p.normalScale),p.side===Un&&v.normalScale.value.negate()),p.specularMap&&(v.specularMap.value=p.specularMap),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest);const w=e.get(p).envMap;if(w&&(v.envMap.value=w,v.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=p.reflectivity,v.ior.value=p.ior,v.refractionRatio.value=p.refractionRatio),p.lightMap){v.lightMap.value=p.lightMap;const P=o.physicallyCorrectLights!==!0?Math.PI:1;v.lightMapIntensity.value=p.lightMapIntensity*P}p.aoMap&&(v.aoMap.value=p.aoMap,v.aoMapIntensity.value=p.aoMapIntensity);let R;p.map?R=p.map:p.specularMap?R=p.specularMap:p.displacementMap?R=p.displacementMap:p.normalMap?R=p.normalMap:p.bumpMap?R=p.bumpMap:p.roughnessMap?R=p.roughnessMap:p.metalnessMap?R=p.metalnessMap:p.alphaMap?R=p.alphaMap:p.emissiveMap?R=p.emissiveMap:p.clearcoatMap?R=p.clearcoatMap:p.clearcoatNormalMap?R=p.clearcoatNormalMap:p.clearcoatRoughnessMap?R=p.clearcoatRoughnessMap:p.iridescenceMap?R=p.iridescenceMap:p.iridescenceThicknessMap?R=p.iridescenceThicknessMap:p.specularIntensityMap?R=p.specularIntensityMap:p.specularColorMap?R=p.specularColorMap:p.transmissionMap?R=p.transmissionMap:p.thicknessMap?R=p.thicknessMap:p.sheenColorMap?R=p.sheenColorMap:p.sheenRoughnessMap&&(R=p.sheenRoughnessMap),R!==void 0&&(R.isWebGLRenderTarget&&(R=R.texture),R.matrixAutoUpdate===!0&&R.updateMatrix(),v.uvTransform.value.copy(R.matrix));let I;p.aoMap?I=p.aoMap:p.lightMap&&(I=p.lightMap),I!==void 0&&(I.isWebGLRenderTarget&&(I=I.texture),I.matrixAutoUpdate===!0&&I.updateMatrix(),v.uv2Transform.value.copy(I.matrix))}function l(v,p){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity}function u(v,p){v.dashSize.value=p.dashSize,v.totalSize.value=p.dashSize+p.gapSize,v.scale.value=p.scale}function c(v,p,w,R){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity,v.size.value=p.size*w,v.scale.value=R*.5,p.map&&(v.map.value=p.map),p.alphaMap&&(v.alphaMap.value=p.alphaMap),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest);let I;p.map?I=p.map:p.alphaMap&&(I=p.alphaMap),I!==void 0&&(I.matrixAutoUpdate===!0&&I.updateMatrix(),v.uvTransform.value.copy(I.matrix))}function d(v,p){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity,v.rotation.value=p.rotation,p.map&&(v.map.value=p.map),p.alphaMap&&(v.alphaMap.value=p.alphaMap),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest);let w;p.map?w=p.map:p.alphaMap&&(w=p.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),v.uvTransform.value.copy(w.matrix))}function h(v,p){v.specular.value.copy(p.specular),v.shininess.value=Math.max(p.shininess,1e-4)}function m(v,p){p.gradientMap&&(v.gradientMap.value=p.gradientMap)}function g(v,p){v.roughness.value=p.roughness,v.metalness.value=p.metalness,p.roughnessMap&&(v.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(v.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(v.envMapIntensity.value=p.envMapIntensity)}function _(v,p,w){v.ior.value=p.ior,p.sheen>0&&(v.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),v.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(v.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(v.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(v.clearcoat.value=p.clearcoat,v.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(v.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(v.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),v.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===Un&&v.clearcoatNormalScale.value.negate())),p.iridescence>0&&(v.iridescence.value=p.iridescence,v.iridescenceIOR.value=p.iridescenceIOR,v.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(v.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(v.transmission.value=p.transmission,v.transmissionSamplerMap.value=w.texture,v.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(v.transmissionMap.value=p.transmissionMap),v.thickness.value=p.thickness,p.thicknessMap&&(v.thicknessMap.value=p.thicknessMap),v.attenuationDistance.value=p.attenuationDistance,v.attenuationColor.value.copy(p.attenuationColor)),v.specularIntensity.value=p.specularIntensity,v.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(v.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(v.specularColorMap.value=p.specularColorMap)}function M(v,p){p.matcap&&(v.matcap.value=p.matcap)}function b(v,p){v.referencePosition.value.copy(p.referencePosition),v.nearDistance.value=p.nearDistance,v.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:r}}function hT(o,e,t,r){let s={},l={},u=[];const c=t.isWebGL2?o.getParameter(35375):0;function d(R,I){const P=I.program;r.uniformBlockBinding(R,P)}function h(R,I){let P=s[R.id];P===void 0&&(b(R),P=m(R),s[R.id]=P,R.addEventListener("dispose",p));const C=I.program;r.updateUBOMapping(R,C);const O=e.render.frame;l[R.id]!==O&&(_(R),l[R.id]=O)}function m(R){const I=g();R.__bindingPointIndex=I;const P=o.createBuffer(),C=R.__size,O=R.usage;return o.bindBuffer(35345,P),o.bufferData(35345,C,O),o.bindBuffer(35345,null),o.bindBufferBase(35345,I,P),P}function g(){for(let R=0;R<c;R++)if(u.indexOf(R)===-1)return u.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(R){const I=s[R.id],P=R.uniforms,C=R.__cache;o.bindBuffer(35345,I);for(let O=0,H=P.length;O<H;O++){const E=P[O];if(M(E,O,C)===!0){const N=E.value,X=E.__offset;typeof N=="number"?(E.__data[0]=N,o.bufferSubData(35345,X,E.__data)):(E.value.isMatrix3?(E.__data[0]=E.value.elements[0],E.__data[1]=E.value.elements[1],E.__data[2]=E.value.elements[2],E.__data[3]=E.value.elements[0],E.__data[4]=E.value.elements[3],E.__data[5]=E.value.elements[4],E.__data[6]=E.value.elements[5],E.__data[7]=E.value.elements[0],E.__data[8]=E.value.elements[6],E.__data[9]=E.value.elements[7],E.__data[10]=E.value.elements[8],E.__data[11]=E.value.elements[0]):N.toArray(E.__data),o.bufferSubData(35345,X,E.__data))}}o.bindBuffer(35345,null)}function M(R,I,P){const C=R.value;if(P[I]===void 0)return typeof C=="number"?P[I]=C:P[I]=C.clone(),!0;if(typeof C=="number"){if(P[I]!==C)return P[I]=C,!0}else{const O=P[I];if(O.equals(C)===!1)return O.copy(C),!0}return!1}function b(R){const I=R.uniforms;let P=0;const C=16;let O=0;for(let H=0,E=I.length;H<E;H++){const N=I[H],X=v(N);if(N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=P,H>0){O=P%C;const ue=C-O;O!==0&&ue-X.boundary<0&&(P+=C-O,N.__offset=P)}P+=X.storage}return O=P%C,O>0&&(P+=C-O),R.__size=P,R.__cache={},this}function v(R){const I=R.value,P={boundary:0,storage:0};return typeof I=="number"?(P.boundary=4,P.storage=4):I.isVector2?(P.boundary=8,P.storage=8):I.isVector3||I.isColor?(P.boundary=16,P.storage=12):I.isVector4?(P.boundary=16,P.storage=16):I.isMatrix3?(P.boundary=48,P.storage=48):I.isMatrix4?(P.boundary=64,P.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),P}function p(R){const I=R.target;I.removeEventListener("dispose",p);const P=u.indexOf(I.__bindingPointIndex);u.splice(P,1),o.deleteBuffer(s[I.id]),delete s[I.id],delete l[I.id]}function w(){for(const R in s)o.deleteBuffer(s[R]);u=[],s={},l={}}return{bind:d,update:h,dispose:w}}function dT(){const o=io("canvas");return o.style.display="block",o}function Bd(o={}){this.isWebGLRenderer=!0;const e=o.canvas!==void 0?o.canvas:dT(),t=o.context!==void 0?o.context:null,r=o.depth!==void 0?o.depth:!0,s=o.stencil!==void 0?o.stencil:!0,l=o.antialias!==void 0?o.antialias:!1,u=o.premultipliedAlpha!==void 0?o.premultipliedAlpha:!0,c=o.preserveDrawingBuffer!==void 0?o.preserveDrawingBuffer:!1,d=o.powerPreference!==void 0?o.powerPreference:"default",h=o.failIfMajorPerformanceCaveat!==void 0?o.failIfMajorPerformanceCaveat:!1;let m;t!==null?m=t.getContextAttributes().alpha:m=o.alpha!==void 0?o.alpha:!1;let g=null,_=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=_r,this.physicallyCorrectLights=!1,this.toneMapping=yi,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const v=this;let p=!1,w=0,R=0,I=null,P=-1,C=null;const O=new Xt,H=new Xt;let E=null,N=e.width,X=e.height,ue=1,ye=null,J=null;const k=new Xt(0,0,N,X),ae=new Xt(0,0,N,X);let he=!1;const le=new Id;let ee=!1,q=!1,Z=null;const ce=new Bt,pe=new gt,de=new W,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ue(){return I===null?ue:1}let se=t;function lt(A,V){for(let j=0;j<A.length;j++){const G=A[j],ne=e.getContext(G,V);if(ne!==null)return ne}return null}try{const A={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${gc}`),e.addEventListener("webglcontextlost",He,!1),e.addEventListener("webglcontextrestored",it,!1),e.addEventListener("webglcontextcreationerror",_t,!1),se===null){const V=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&V.shift(),se=lt(V,A),se===null)throw lt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}se.getShaderPrecisionFormat===void 0&&(se.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Fe,Be,Ee,st,qe,Pe,ut,Nt,Vt,Dt,Pt,ft,Qt,Tt,L,T,te,fe,me,xe,ze,$,Re,we;function Le(){Fe=new ww(se),Be=new _w(se,Fe,o),Fe.init(Be),$=new aT(se,Fe,Be),Ee=new rT(se,Fe,Be),st=new Aw,qe=new k1,Pe=new sT(se,Fe,Ee,qe,Be,$,st),ut=new vw(v),Nt=new bw(v),Vt=new US(se,Be),Re=new mw(se,Fe,Vt,Be),Dt=new Tw(se,Vt,st,Re),Pt=new Dw(se,Dt,Vt,st),me=new Rw(se,Be,Pe),T=new xw(qe),ft=new H1(v,ut,Nt,Fe,Be,Re,T),Qt=new fT(v,qe),Tt=new X1,L=new Q1(Fe,Be),fe=new pw(v,ut,Ee,Pt,m,u),te=new iT(v,Pt,Be),we=new hT(se,st,Be,Ee),xe=new gw(se,Fe,st,Be),ze=new Ew(se,Fe,st,Be),st.programs=ft.programs,v.capabilities=Be,v.extensions=Fe,v.properties=qe,v.renderLists=Tt,v.shadowMap=te,v.state=Ee,v.info=st}Le();const Te=new uT(v,se);this.xr=Te,this.getContext=function(){return se},this.getContextAttributes=function(){return se.getContextAttributes()},this.forceContextLoss=function(){const A=Fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(A){A!==void 0&&(ue=A,this.setSize(N,X,!1))},this.getSize=function(A){return A.set(N,X)},this.setSize=function(A,V,j){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,X=V,e.width=Math.floor(A*ue),e.height=Math.floor(V*ue),j!==!1&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(N*ue,X*ue).floor()},this.setDrawingBufferSize=function(A,V,j){N=A,X=V,ue=j,e.width=Math.floor(A*j),e.height=Math.floor(V*j),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(O)},this.getViewport=function(A){return A.copy(k)},this.setViewport=function(A,V,j,G){A.isVector4?k.set(A.x,A.y,A.z,A.w):k.set(A,V,j,G),Ee.viewport(O.copy(k).multiplyScalar(ue).floor())},this.getScissor=function(A){return A.copy(ae)},this.setScissor=function(A,V,j,G){A.isVector4?ae.set(A.x,A.y,A.z,A.w):ae.set(A,V,j,G),Ee.scissor(H.copy(ae).multiplyScalar(ue).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(A){Ee.setScissorTest(he=A)},this.setOpaqueSort=function(A){ye=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor.apply(fe,arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha.apply(fe,arguments)},this.clear=function(A=!0,V=!0,j=!0){let G=0;A&&(G|=16384),V&&(G|=256),j&&(G|=1024),se.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",He,!1),e.removeEventListener("webglcontextrestored",it,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),Tt.dispose(),L.dispose(),qe.dispose(),ut.dispose(),Nt.dispose(),Pt.dispose(),Re.dispose(),we.dispose(),ft.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",je),Te.removeEventListener("sessionend",It),Z&&(Z.dispose(),Z=null),bt.stop()};function He(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function it(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const A=st.autoReset,V=te.enabled,j=te.autoUpdate,G=te.needsUpdate,ne=te.type;Le(),st.autoReset=A,te.enabled=V,te.autoUpdate=j,te.needsUpdate=G,te.type=ne}function _t(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function z(A){const V=A.target;V.removeEventListener("dispose",z),Se(V)}function Se(A){Q(A),qe.remove(A)}function Q(A){const V=qe.get(A).programs;V!==void 0&&(V.forEach(function(j){ft.releaseProgram(j)}),A.isShaderMaterial&&ft.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,j,G,ne,De){V===null&&(V=Ae);const Ge=ne.isMesh&&ne.matrixWorld.determinant()<0,Xe=uo(A,V,j,G,ne);Ee.setMaterial(G,Ge);let We=j.index;const at=j.attributes.position;if(We===null){if(at===void 0||at.count===0)return}else if(We.count===0)return;let et=1;G.wireframe===!0&&(We=Dt.getWireframeAttribute(j),et=2),Re.setup(ne,G,Xe,j,We);let tt,St=xe;We!==null&&(tt=Vt.get(We),St=ze,St.setIndex(tt));const ri=We!==null?We.count:at.count,Wn=j.drawRange.start*et,bi=j.drawRange.count*et,jt=De!==null?De.start*et:0,rt=De!==null?De.count*et:1/0,wi=Math.max(Wn,jt),Et=Math.min(ri,Wn+bi,jt+rt)-1,en=Math.max(0,Et-wi+1);if(en!==0){if(ne.isMesh)G.wireframe===!0?(Ee.setLineWidth(G.wireframeLinewidth*Ue()),St.setMode(1)):St.setMode(4);else if(ne.isLine){let Vn=G.linewidth;Vn===void 0&&(Vn=1),Ee.setLineWidth(Vn*Ue()),ne.isLineSegments?St.setMode(1):ne.isLineLoop?St.setMode(2):St.setMode(3)}else ne.isPoints?St.setMode(0):ne.isSprite&&St.setMode(4);if(ne.isInstancedMesh)St.renderInstances(wi,en,ne.count);else if(j.isInstancedBufferGeometry){const Vn=Math.min(j.instanceCount,j._maxInstanceCount);St.renderInstances(wi,en,Vn)}else St.render(wi,en)}},this.compile=function(A,V){function j(G,ne,De){G.transparent===!0&&G.side===Vi?(G.side=Un,G.needsUpdate=!0,Mr(G,ne,De),G.side=is,G.needsUpdate=!0,Mr(G,ne,De),G.side=Vi):Mr(G,ne,De)}_=L.get(A),_.init(),b.push(_),A.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(_.pushLight(G),G.castShadow&&_.pushShadow(G))}),_.setupLights(v.physicallyCorrectLights),A.traverse(function(G){const ne=G.material;if(ne)if(Array.isArray(ne))for(let De=0;De<ne.length;De++){const Ge=ne[De];j(Ge,A,G)}else j(ne,A,G)}),b.pop(),_=null};let Me=null;function ve(A){Me&&Me(A)}function je(){bt.stop()}function It(){bt.start()}const bt=new Fd;bt.setAnimationLoop(ve),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(A){Me=A,Te.setAnimationLoop(A),A===null?bt.stop():bt.start()},Te.addEventListener("sessionstart",je),Te.addEventListener("sessionend",It),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(V),V=Te.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,V,I),_=L.get(A,b.length),_.init(),b.push(_),ce.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),le.setFromProjectionMatrix(ce),q=this.localClippingEnabled,ee=T.init(this.clippingPlanes,q,V),g=Tt.get(A,M.length),g.init(),M.push(g),Qn(A,V,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ye,J),ee===!0&&T.beginShadows();const j=_.state.shadowsArray;if(te.render(j,A,V),ee===!0&&T.endShadows(),this.info.autoReset===!0&&this.info.reset(),fe.render(g,A),_.setupLights(v.physicallyCorrectLights),V.isArrayCamera){const G=V.cameras;for(let ne=0,De=G.length;ne<De;ne++){const Ge=G[ne];Mt(g,A,Ge,Ge.viewport)}}else Mt(g,A,V);I!==null&&(Pe.updateMultisampleRenderTarget(I),Pe.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(v,A,V),Re.resetDefaultState(),P=-1,C=null,b.pop(),b.length>0?_=b[b.length-1]:_=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Qn(A,V,j,G){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||le.intersectsSprite(A)){G&&de.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ce);const Ge=Pt.update(A),Xe=A.material;Xe.visible&&g.push(A,Ge,Xe,j,de.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==st.render.frame&&(A.skeleton.update(),A.skeleton.frame=st.render.frame),!A.frustumCulled||le.intersectsObject(A))){G&&de.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ce);const Ge=Pt.update(A),Xe=A.material;if(Array.isArray(Xe)){const We=Ge.groups;for(let at=0,et=We.length;at<et;at++){const tt=We[at],St=Xe[tt.materialIndex];St&&St.visible&&g.push(A,Ge,St,j,de.z,tt)}}else Xe.visible&&g.push(A,Ge,Xe,j,de.z,null)}}const De=A.children;for(let Ge=0,Xe=De.length;Ge<Xe;Ge++)Qn(De[Ge],V,j,G)}function Mt(A,V,j,G){const ne=A.opaque,De=A.transmissive,Ge=A.transparent;_.setupLightsView(j),De.length>0&&wn(ne,V,j),G&&Ee.viewport(O.copy(G)),ne.length>0&&ln(ne,V,j),De.length>0&&ln(De,V,j),Ge.length>0&&ln(Ge,V,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function wn(A,V,j){const G=Be.isWebGL2;Z===null&&(Z=new xr(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")?Os:gr,minFilter:ao,samples:G&&l===!0?4:0})),v.getDrawingBufferSize(pe),G?Z.setSize(pe.x,pe.y):Z.setSize(fc(pe.x),fc(pe.y));const ne=v.getRenderTarget();v.setRenderTarget(Z),v.clear();const De=v.toneMapping;v.toneMapping=yi,ln(A,V,j),v.toneMapping=De,Pe.updateMultisampleRenderTarget(Z),Pe.updateRenderTargetMipmap(Z),v.setRenderTarget(ne)}function ln(A,V,j){const G=V.isScene===!0?V.overrideMaterial:null;for(let ne=0,De=A.length;ne<De;ne++){const Ge=A[ne],Xe=Ge.object,We=Ge.geometry,at=G===null?Ge.material:G,et=Ge.group;Xe.layers.test(j.layers)&&co(Xe,V,j,We,at,et)}}function co(A,V,j,G,ne,De){A.onBeforeRender(v,V,j,G,ne,De),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(v,V,j,G,A,De),ne.transparent===!0&&ne.side===Vi?(ne.side=Un,ne.needsUpdate=!0,v.renderBufferDirect(j,V,G,ne,A,De),ne.side=is,ne.needsUpdate=!0,v.renderBufferDirect(j,V,G,ne,A,De),ne.side=Vi):v.renderBufferDirect(j,V,G,ne,A,De),A.onAfterRender(v,V,j,G,ne,De)}function Mr(A,V,j){V.isScene!==!0&&(V=Ae);const G=qe.get(A),ne=_.state.lights,De=_.state.shadowsArray,Ge=ne.state.version,Xe=ft.getParameters(A,ne.state,De,V,j),We=ft.getProgramCacheKey(Xe);let at=G.programs;G.environment=A.isMeshStandardMaterial?V.environment:null,G.fog=V.fog,G.envMap=(A.isMeshStandardMaterial?Nt:ut).get(A.envMap||G.environment),at===void 0&&(A.addEventListener("dispose",z),at=new Map,G.programs=at);let et=at.get(We);if(et!==void 0){if(G.currentProgram===et&&G.lightsStateVersion===Ge)return Sr(A,Xe),et}else Xe.uniforms=ft.getUniforms(A),A.onBuild(j,Xe,v),A.onBeforeCompile(Xe,v),et=ft.acquireProgram(Xe,We),at.set(We,et),G.uniforms=Xe.uniforms;const tt=G.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(tt.clippingPlanes=T.uniform),Sr(A,Xe),G.needsLights=fo(A),G.lightsStateVersion=Ge,G.needsLights&&(tt.ambientLightColor.value=ne.state.ambient,tt.lightProbe.value=ne.state.probe,tt.directionalLights.value=ne.state.directional,tt.directionalLightShadows.value=ne.state.directionalShadow,tt.spotLights.value=ne.state.spot,tt.spotLightShadows.value=ne.state.spotShadow,tt.rectAreaLights.value=ne.state.rectArea,tt.ltc_1.value=ne.state.rectAreaLTC1,tt.ltc_2.value=ne.state.rectAreaLTC2,tt.pointLights.value=ne.state.point,tt.pointLightShadows.value=ne.state.pointShadow,tt.hemisphereLights.value=ne.state.hemi,tt.directionalShadowMap.value=ne.state.directionalShadowMap,tt.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,tt.spotShadowMap.value=ne.state.spotShadowMap,tt.spotLightMatrix.value=ne.state.spotLightMatrix,tt.spotLightMap.value=ne.state.spotLightMap,tt.pointShadowMap.value=ne.state.pointShadowMap,tt.pointShadowMatrix.value=ne.state.pointShadowMatrix);const St=et.getUniforms(),ri=no.seqWithValue(St.seq,tt);return G.currentProgram=et,G.uniformsList=ri,et}function Sr(A,V){const j=qe.get(A);j.outputEncoding=V.outputEncoding,j.instancing=V.instancing,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function uo(A,V,j,G,ne){V.isScene!==!0&&(V=Ae),Pe.resetTextureUnits();const De=V.fog,Ge=G.isMeshStandardMaterial?V.environment:null,Xe=I===null?v.outputEncoding:I.isXRRenderTarget===!0?I.texture.encoding:_r,We=(G.isMeshStandardMaterial?Nt:ut).get(G.envMap||Ge),at=G.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,et=!!G.normalMap&&!!j.attributes.tangent,tt=!!j.morphAttributes.position,St=!!j.morphAttributes.normal,ri=!!j.morphAttributes.color,Wn=G.toneMapped?v.toneMapping:yi,bi=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,jt=bi!==void 0?bi.length:0,rt=qe.get(G),wi=_.state.lights;if(ee===!0&&(q===!0||A!==C)){const Yt=A===C&&G.id===P;T.setState(G,A,Yt)}let Et=!1;G.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==wi.state.version||rt.outputEncoding!==Xe||ne.isInstancedMesh&&rt.instancing===!1||!ne.isInstancedMesh&&rt.instancing===!0||ne.isSkinnedMesh&&rt.skinning===!1||!ne.isSkinnedMesh&&rt.skinning===!0||rt.envMap!==We||G.fog===!0&&rt.fog!==De||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==T.numPlanes||rt.numIntersection!==T.numIntersection)||rt.vertexAlphas!==at||rt.vertexTangents!==et||rt.morphTargets!==tt||rt.morphNormals!==St||rt.morphColors!==ri||rt.toneMapping!==Wn||Be.isWebGL2===!0&&rt.morphTargetsCount!==jt)&&(Et=!0):(Et=!0,rt.__version=G.version);let en=rt.currentProgram;Et===!0&&(en=Mr(G,V,ne));let Vn=!1,Ti=!1,hs=!1;const Ht=en.getUniforms(),si=rt.uniforms;if(Ee.useProgram(en.program)&&(Vn=!0,Ti=!0,hs=!0),G.id!==P&&(P=G.id,Ti=!0),Vn||C!==A){if(Ht.setValue(se,"projectionMatrix",A.projectionMatrix),Be.logarithmicDepthBuffer&&Ht.setValue(se,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),C!==A&&(C=A,Ti=!0,hs=!0),G.isShaderMaterial||G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshStandardMaterial||G.envMap){const Yt=Ht.map.cameraPosition;Yt!==void 0&&Yt.setValue(se,de.setFromMatrixPosition(A.matrixWorld))}(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ht.setValue(se,"isOrthographic",A.isOrthographicCamera===!0),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial||G.isShadowMaterial||ne.isSkinnedMesh)&&Ht.setValue(se,"viewMatrix",A.matrixWorldInverse)}if(ne.isSkinnedMesh){Ht.setOptional(se,ne,"bindMatrix"),Ht.setOptional(se,ne,"bindMatrixInverse");const Yt=ne.skeleton;Yt&&(Be.floatVertexTextures?(Yt.boneTexture===null&&Yt.computeBoneTexture(),Ht.setValue(se,"boneTexture",Yt.boneTexture,Pe),Ht.setValue(se,"boneTextureSize",Yt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ds=j.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0&&Be.isWebGL2===!0)&&me.update(ne,j,G,en),(Ti||rt.receiveShadow!==ne.receiveShadow)&&(rt.receiveShadow=ne.receiveShadow,Ht.setValue(se,"receiveShadow",ne.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(si.envMap.value=We,si.flipEnvMap.value=We.isCubeTexture&&We.isRenderTargetTexture===!1?-1:1),Ti&&(Ht.setValue(se,"toneMappingExposure",v.toneMappingExposure),rt.needsLights&&fs(si,hs),De&&G.fog===!0&&Qt.refreshFogUniforms(si,De),Qt.refreshMaterialUniforms(si,G,ue,X,Z),no.upload(se,rt.uniformsList,si,Pe)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(no.upload(se,rt.uniformsList,si,Pe),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ht.setValue(se,"center",ne.center),Ht.setValue(se,"modelViewMatrix",ne.modelViewMatrix),Ht.setValue(se,"normalMatrix",ne.normalMatrix),Ht.setValue(se,"modelMatrix",ne.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Yt=G.uniformsGroups;for(let yr=0,Hs=Yt.length;yr<Hs;yr++)if(Be.isWebGL2){const br=Yt[yr];we.update(br,en),we.bind(br,en)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return en}function fs(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function fo(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,V,j){qe.get(A.texture).__webglTexture=V,qe.get(A.depthTexture).__webglTexture=j;const G=qe.get(A);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=j===void 0,G.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,V){const j=qe.get(A);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,j=0){I=A,w=V,R=j;let G=!0;if(A){const We=qe.get(A);We.__useDefaultFramebuffer!==void 0?(Ee.bindFramebuffer(36160,null),G=!1):We.__webglFramebuffer===void 0?Pe.setupRenderTarget(A):We.__hasExternalTextures&&Pe.rebindTextures(A,qe.get(A.texture).__webglTexture,qe.get(A.depthTexture).__webglTexture)}let ne=null,De=!1,Ge=!1;if(A){const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture)&&(Ge=!0);const at=qe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(ne=at[V],De=!0):Be.isWebGL2&&A.samples>0&&Pe.useMultisampledRTT(A)===!1?ne=qe.get(A).__webglMultisampledFramebuffer:ne=at,O.copy(A.viewport),H.copy(A.scissor),E=A.scissorTest}else O.copy(k).multiplyScalar(ue).floor(),H.copy(ae).multiplyScalar(ue).floor(),E=he;if(Ee.bindFramebuffer(36160,ne)&&Be.drawBuffers&&G&&Ee.drawBuffers(A,ne),Ee.viewport(O),Ee.scissor(H),Ee.setScissorTest(E),De){const We=qe.get(A.texture);se.framebufferTexture2D(36160,36064,34069+V,We.__webglTexture,j)}else if(Ge){const We=qe.get(A.texture),at=V||0;se.framebufferTextureLayer(36160,36064,We.__webglTexture,j||0,at)}P=-1},this.readRenderTargetPixels=function(A,V,j,G,ne,De,Ge){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=qe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(Xe=Xe[Ge]),Xe){Ee.bindFramebuffer(36160,Xe);try{const We=A.texture,at=We.format,et=We.type;if(at!==ii&&$.convert(at)!==se.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const tt=et===Os&&(Fe.has("EXT_color_buffer_half_float")||Be.isWebGL2&&Fe.has("EXT_color_buffer_float"));if(et!==gr&&$.convert(et)!==se.getParameter(35738)&&!(et===hr&&(Be.isWebGL2||Fe.has("OES_texture_float")||Fe.has("WEBGL_color_buffer_float")))&&!tt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-G&&j>=0&&j<=A.height-ne&&se.readPixels(V,j,G,ne,$.convert(at),$.convert(et),De)}finally{const We=I!==null?qe.get(I).__webglFramebuffer:null;Ee.bindFramebuffer(36160,We)}}},this.copyFramebufferToTexture=function(A,V,j=0){const G=Math.pow(2,-j),ne=Math.floor(V.image.width*G),De=Math.floor(V.image.height*G);Pe.setTexture2D(V,0),se.copyTexSubImage2D(3553,j,0,0,A.x,A.y,ne,De),Ee.unbindTexture()},this.copyTextureToTexture=function(A,V,j,G=0){const ne=V.image.width,De=V.image.height,Ge=$.convert(j.format),Xe=$.convert(j.type);Pe.setTexture2D(j,0),se.pixelStorei(37440,j.flipY),se.pixelStorei(37441,j.premultiplyAlpha),se.pixelStorei(3317,j.unpackAlignment),V.isDataTexture?se.texSubImage2D(3553,G,A.x,A.y,ne,De,Ge,Xe,V.image.data):V.isCompressedTexture?se.compressedTexSubImage2D(3553,G,A.x,A.y,V.mipmaps[0].width,V.mipmaps[0].height,Ge,V.mipmaps[0].data):se.texSubImage2D(3553,G,A.x,A.y,Ge,Xe,V.image),G===0&&j.generateMipmaps&&se.generateMipmap(3553),Ee.unbindTexture()},this.copyTextureToTexture3D=function(A,V,j,G,ne=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=A.max.x-A.min.x+1,Ge=A.max.y-A.min.y+1,Xe=A.max.z-A.min.z+1,We=$.convert(G.format),at=$.convert(G.type);let et;if(G.isData3DTexture)Pe.setTexture3D(G,0),et=32879;else if(G.isDataArrayTexture)Pe.setTexture2DArray(G,0),et=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}se.pixelStorei(37440,G.flipY),se.pixelStorei(37441,G.premultiplyAlpha),se.pixelStorei(3317,G.unpackAlignment);const tt=se.getParameter(3314),St=se.getParameter(32878),ri=se.getParameter(3316),Wn=se.getParameter(3315),bi=se.getParameter(32877),jt=j.isCompressedTexture?j.mipmaps[0]:j.image;se.pixelStorei(3314,jt.width),se.pixelStorei(32878,jt.height),se.pixelStorei(3316,A.min.x),se.pixelStorei(3315,A.min.y),se.pixelStorei(32877,A.min.z),j.isDataTexture||j.isData3DTexture?se.texSubImage3D(et,ne,V.x,V.y,V.z,De,Ge,Xe,We,at,jt.data):j.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),se.compressedTexSubImage3D(et,ne,V.x,V.y,V.z,De,Ge,Xe,We,jt.data)):se.texSubImage3D(et,ne,V.x,V.y,V.z,De,Ge,Xe,We,at,jt),se.pixelStorei(3314,tt),se.pixelStorei(32878,St),se.pixelStorei(3316,ri),se.pixelStorei(3315,Wn),se.pixelStorei(32877,bi),ne===0&&G.generateMipmaps&&se.generateMipmap(et),Ee.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?Pe.setTextureCube(A,0):A.isData3DTexture?Pe.setTexture3D(A,0):A.isDataArrayTexture?Pe.setTexture2DArray(A,0):Pe.setTexture2D(A,0),Ee.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,Ee.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class pT extends Bd{}pT.prototype.isWebGL1Renderer=!0;class mT extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Gd extends cs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new vt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const jh=new W,ed=new W,td=new Bt,nc=new _c,Qa=new Gs;class gT extends sn{constructor(e=new Gn,t=new Gd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let s=1,l=t.count;s<l;s++)jh.fromBufferAttribute(t,s-1),ed.fromBufferAttribute(t,s),r[s]=r[s-1],r[s]+=jh.distanceTo(ed);e.setAttribute("lineDistance",new Xi(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Qa.copy(r.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=l,e.ray.intersectsSphere(Qa)===!1)return;td.copy(s).invert(),nc.copy(e.ray).applyMatrix4(td);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,h=new W,m=new W,g=new W,_=new W,M=this.isLineSegments?2:1,b=r.index,p=r.attributes.position;if(b!==null){const w=Math.max(0,u.start),R=Math.min(b.count,u.start+u.count);for(let I=w,P=R-1;I<P;I+=M){const C=b.getX(I),O=b.getX(I+1);if(h.fromBufferAttribute(p,C),m.fromBufferAttribute(p,O),nc.distanceSqToSegment(h,m,_,g)>d)continue;_.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(_);E<e.near||E>e.far||t.push({distance:E,point:g.clone().applyMatrix4(this.matrixWorld),index:I,face:null,faceIndex:null,object:this})}}else{const w=Math.max(0,u.start),R=Math.min(p.count,u.start+u.count);for(let I=w,P=R-1;I<P;I+=M){if(h.fromBufferAttribute(p,I),m.fromBufferAttribute(p,I+1),nc.distanceSqToSegment(h,m,_,g)>d)continue;_.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(_);O<e.near||O>e.far||t.push({distance:O,point:g.clone().applyMatrix4(this.matrixWorld),index:I,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}class Mc extends cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nd=new Bt,dc=new _c,ja=new Gs,eo=new W;class Wd extends sn{constructor(e=new Gn,t=new Mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),ja.copy(r.boundingSphere),ja.applyMatrix4(s),ja.radius+=l,e.ray.intersectsSphere(ja)===!1)return;nd.copy(s).invert(),dc.copy(e.ray).applyMatrix4(nd);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,h=r.index,g=r.attributes.position;if(h!==null){const _=Math.max(0,u.start),M=Math.min(h.count,u.start+u.count);for(let b=_,v=M;b<v;b++){const p=h.getX(b);eo.fromBufferAttribute(g,p),id(eo,p,d,s,e,t,this)}}else{const _=Math.max(0,u.start),M=Math.min(g.count,u.start+u.count);for(let b=_,v=M;b<v;b++)eo.fromBufferAttribute(g,b),id(eo,b,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=s.length;l<u;l++){const c=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}function id(o,e,t,r,s,l,u){const c=dc.distanceSqToPoint(o);if(c<t){const d=new W;dc.closestPointToPoint(o,d),d.applyMatrix4(r);const h=s.ray.origin.distanceTo(d);if(h<s.near||h>s.far)return;l.push({distance:h,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,object:u})}}class Vd extends Bn{constructor(e,t,r,s,l,u,c,d,h){super(e,t,r,s,l,u,c,d,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gc);const _T=45,xT=1,vT=5e3,MT=8;class ST{constructor(e,t,r){dt(this,"scene");dt(this,"canvas");dt(this,"renderer");dt(this,"camera");this.renderer=new Bd({antialias:!0,alpha:!0,canvas:r}),this.renderer.setSize(e,t),this.canvas=this.renderer.domElement,this.scene=new mT,this.camera=new Nn(_T,e/t,xT,vT),this.camera.position.z=40*MT}render(){this.renderer.render(this.scene,this.camera)}resize(e,t){this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}}const yT=1e3,bT=4,wT=(()=>{const s=document.createElement("canvas");s.width=256,s.height=256;const l=s.getContext("2d");if(!l)throw new Error("Failed to get 2d canvas context");return l.beginPath(),l.arc(128,128,124,0,2*Math.PI),l.fillStyle="rgba(255, 255, 255, 1)",l.fill(),new Vd(s)})();class Hd{constructor(){dt(this,"positions");dt(this,"posAttr");dt(this,"geometry");dt(this,"pointCloud");this.positions=new Float32Array(yT*3),this.posAttr=new zn(this.positions,3),this.posAttr.setUsage(Sd),this.geometry=new Gn,this.geometry.setAttribute("position",this.posAttr),this.geometry.setDrawRange(0,0),this.pointCloud=new Wd(this.geometry,new Mc({blending:Ns,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.9,map:wT,size:bT}))}update({particles:e}){e.forEach((t,r)=>{var s,l,u;this.positions[r*3+0]=(s=t.position[0])!=null?s:0,this.positions[r*3+1]=(l=t.position[1])!=null?l:0,this.positions[r*3+2]=(u=t.position[2])!=null?u:0}),this.geometry.setDrawRange(0,e.length),this.posAttr.needsUpdate=!0}clear(){this.geometry.setDrawRange(0,0)}getObject(){return this.pointCloud}}const TT=new Gd({blending:Ns,transparent:!0,color:3185663,opacity:.4}),ET=o=>{const e=new ki;return Yi.exports.times(o.length,t=>{if(t%2)return;const r=o[t],s=o[t+1];if(!r||!s)throw new Error("Odd plane vectors");const l=new W(...r),u=new W(...s),c=new Gn;c.setFromPoints([l,u]);const d=new gT(c,TT);d.computeLineDistances(),e.add(d)}),e},kd=o=>ET([[-o,0,0],[o,0,0],[0,-o,0],[0,o,0],[o,-o,0],[o,o,0],[-o,-o,0],[-o,o,0],[-o,-o,0],[o,-o,0],[-o,o,0],[o,o,0]]);class AT{constructor(e){dt(this,"queue",[]);dt(this,"limit");this.limit=e}add(e){this.queue.unshift(e),this.queue.length>this.limit&&this.queue.pop()}values(){return this.queue}}const qd=200,CT=qd*100,LT=1,RT=(()=>{const s=document.createElement("canvas");s.width=256,s.height=256;const l=s.getContext("2d");if(!l)throw new Error("Failed to get 2d canvas context");return l.beginPath(),l.arc(128,128,124,0,2*Math.PI),l.fillStyle="rgba(255, 255, 255, 1)",l.fill(),new Vd(s)})();class Xd{constructor(){dt(this,"trailLength",qd);dt(this,"particleQueues",[]);dt(this,"positions");dt(this,"posAttr");dt(this,"geometry");dt(this,"pointCloud");this.positions=new Float32Array(CT*3),this.posAttr=new zn(this.positions,3),this.posAttr.setUsage(Sd),this.geometry=new Gn,this.geometry.setAttribute("position",this.posAttr),this.geometry.setDrawRange(0,0),this.pointCloud=new Wd(this.geometry,new Mc({blending:Ns,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.9,map:RT,size:LT}))}update({particles:e}){for(;this.particleQueues.length<e.length;)this.particleQueues.push(new AT(this.trailLength));for(;this.particleQueues.length>e.length;)this.particleQueues.pop();this.particleQueues.forEach((r,s)=>{const l=e[s];if(!l)throw new Error("Unreachable");r.add(dM(l))});let t=0;this.particleQueues.forEach(r=>{r.values().forEach(s=>{var l,u,c;this.positions[t*3+0]=(l=s.position[0])!=null?l:0,this.positions[t*3+1]=(u=s.position[1])!=null?u:0,this.positions[t*3+2]=(c=s.position[2])!=null?c:0,t++})}),this.geometry.setDrawRange(0,t),this.posAttr.needsUpdate=!0}clear(){this.geometry.setDrawRange(0,0),this.particleQueues=[]}getObject(){return this.pointCloud}}class DT extends Xd{constructor(){super();dt(this,"trailGap",1/4);this.trailLength=800}update(t){this.particleQueues.forEach(r=>{r.values().forEach(s=>{var u;const l=(u=s.position[2])!=null?u:0;s.position[2]=l-this.trailGap})}),super.update(t)}}const PT=new W(1,0,0);class IT{constructor({dimensions:e,radius:t,x:r,y:s,z:l}){dt(this,"dimensions");dt(this,"group");dt(this,"dots");dt(this,"trails");this.dimensions=e,this.dots=new Hd,this.trails=new Xd,this.group=new ki,this.group.add(kd(t)),this.group.add(this.dots.getObject()),this.group.add(this.trails.getObject()),this.group.position.set(r,s,l),this.group.rotateOnAxis(new W(0,0,1),-Math.PI/2)}update(e){this.dots.update(e),this.trails.update(e)}rotate(e){this.dimensions<3||this.group.rotateOnAxis(PT,e)}getObject(){return this.group}}const FT=new W(0,0,1);class NT{constructor({dimensions:e,radius:t,x:r,y:s,z:l}){dt(this,"dimensions");dt(this,"group");dt(this,"dots");dt(this,"timeTrails");this.dimensions=e,this.dots=new Hd,this.timeTrails=new DT,this.group=new ki,this.group.add(kd(t)),this.group.add(this.dots.getObject()),this.group.add(this.timeTrails.getObject()),this.group.position.set(r,s,l),this.group.rotateOnAxis(new W(0,0,1),-Math.PI/2),this.group.rotateOnAxis(new W(1,0,0),Math.PI/2)}update(e){this.dots.update(e),this.timeTrails.update(e)}rotate(e){this.dimensions<2||this.group.rotateOnAxis(FT,-e)}getObject(){return this.group}}class OT{constructor({dimensions:e,radius:t,x:r,y:s,z:l}){dt(this,"group");dt(this,"spaceCell");dt(this,"timeCell");this.spaceCell=new IT({dimensions:e,radius:t,x:-110,y:0,z:0}),this.timeCell=new NT({dimensions:e,radius:t,x:-70,y:0,z:0}),this.group=new ki,this.group.position.set(r,s,l),this.group.add(this.spaceCell.getObject()),this.group.add(this.timeCell.getObject())}update(e){this.spaceCell.update(e),this.timeCell.update(e)}rotate(e){this.spaceCell.rotate(e),this.timeCell.rotate(e)}getObject(){return this.group}}const UT=900,zT=800,ro=14,BT=9,GT=.007,WT=3,VT="orbiting",HT="centerScaling",Zi=xM(),kT=Yi.exports.isNumber(Zi.spin)?Zi.spin:GT,qT=Yi.exports.isNumber(Zi.count)?Zi.count:BT,XT=Yi.exports.isNumber(Zi.d)?Zi.d:WT,rd=Zi.behavior,sd=Zi.bounding,Yd=XT+1,YT=cM(sd)?sd:HT,ZT=lM(rd)?rd:VT,$T=dd[ZT],lo=document.createElement("canvas");lo.style.display="block";lo.style.margin="4% auto";document.body.appendChild(lo);const Zd=new ST(UT,zT,lo),pc=[];for(let o=0;o<Yd;o++){const e=pc[o-1],t=e?mM(o,ro,e):pM(o,ro,qT);pc.push(t)}const KT=pc.map(o=>{const e=fd(new _M);return e.init(o,{behavior:$T,bounding:YT,radius:ro}),e}),JT=Yi.exports.times(Yd,o=>{const e=new OT({dimensions:o,radius:ro,x:0,y:100-o*42,z:0});return Zd.scene.add(e.getObject()),e}),$d=async()=>{requestAnimationFrame(()=>void $d());const o=await Promise.all(KT.map(e=>e.tick()));JT.forEach((e,t)=>{const r=o[t];if(!r)throw new Error("Unreachable");e.update(r),e.rotate(kT)}),Zd.render()};$d();
