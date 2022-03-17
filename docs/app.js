var gf=Object.create;var No=Object.defineProperty;var mf=Object.getOwnPropertyDescriptor;var yf=Object.getOwnPropertyNames;var bf=Object.getPrototypeOf,wf=Object.prototype.hasOwnProperty;var xf=t=>No(t,"__esModule",{value:!0});var kn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var kf=(t,e,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of yf(e))!wf.call(t,a)&&a!=="default"&&No(t,a,{get:()=>e[a],enumerable:!(r=mf(e,a))||r.enumerable});return t},Vo=t=>kf(xf(No(t!=null?gf(bf(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var yc=kn((vL,mc)=>{var Ig="Expected a function",vc=0/0,Og="[object Symbol]",$g=/^\s+|\s+$/g,Bg=/^[-+]0x[0-9a-f]+$/i,zg=/^0b[01]+$/i,Mg=/^0o[0-7]+$/i,Rg=parseInt,Fg=typeof global=="object"&&global&&global.Object===Object&&global,Ng=typeof self=="object"&&self&&self.Object===Object&&self,Vg=Fg||Ng||Function("return this")(),jg=Object.prototype,Kg=jg.toString,Hg=Math.max,Qg=Math.min,bs=function(){return Vg.Date.now()};function Yg(t,e,r){var a,n,o,i,s,l,u=0,c=!1,d=!1,h=!0;if(typeof t!="function")throw new TypeError(Ig);e=gc(e)||0,ws(r)&&(c=!!r.leading,d="maxWait"in r,o=d?Hg(gc(r.maxWait)||0,e):o,h="trailing"in r?!!r.trailing:h);function p(E){var _=a,T=n;return a=n=void 0,u=E,i=t.apply(T,_),i}function g(E){return u=E,s=setTimeout(m,e),c?p(E):i}function f(E){var _=E-l,T=E-u,C=e-_;return d?Qg(C,o-T):C}function v(E){var _=E-l,T=E-u;return l===void 0||_>=e||_<0||d&&T>=o}function m(){var E=bs();if(v(E))return y(E);s=setTimeout(m,f(E))}function y(E){return s=void 0,h&&a?p(E):(a=n=void 0,i)}function b(){s!==void 0&&clearTimeout(s),u=0,a=l=n=s=void 0}function x(){return s===void 0?i:y(bs())}function k(){var E=bs(),_=v(E);if(a=arguments,n=this,l=E,_){if(s===void 0)return g(l);if(d)return s=setTimeout(m,e),p(l)}return s===void 0&&(s=setTimeout(m,e)),i}return k.cancel=b,k.flush=x,k}function ws(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function Xg(t){return!!t&&typeof t=="object"}function Ug(t){return typeof t=="symbol"||Xg(t)&&Kg.call(t)==Og}function gc(t){if(typeof t=="number")return t;if(Ug(t))return vc;if(ws(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=ws(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace($g,"");var r=zg.test(t);return r||Mg.test(t)?Rg(t.slice(2),r?2:8):Bg.test(t)?vc:+t}mc.exports=Yg});var wc=kn((xs,bc)=>{(function(){var t,e,r,a,n,o,i,s,l,u,c,d,h,p,g;r=Math.floor,u=Math.min,e=function(f,v){return f<v?-1:f>v?1:0},l=function(f,v,m,y,b){var x;if(m==null&&(m=0),b==null&&(b=e),m<0)throw new Error("lo must be non-negative");for(y==null&&(y=f.length);m<y;)x=r((m+y)/2),b(v,f[x])<0?y=x:m=x+1;return[].splice.apply(f,[m,m-m].concat(v)),v},o=function(f,v,m){return m==null&&(m=e),f.push(v),p(f,0,f.length-1,m)},n=function(f,v){var m,y;return v==null&&(v=e),m=f.pop(),f.length?(y=f[0],f[0]=m,g(f,0,v)):y=m,y},s=function(f,v,m){var y;return m==null&&(m=e),y=f[0],f[0]=v,g(f,0,m),y},i=function(f,v,m){var y;return m==null&&(m=e),f.length&&m(f[0],v)<0&&(y=[f[0],v],v=y[0],f[0]=y[1],g(f,0,m)),v},a=function(f,v){var m,y,b,x,k,E,_,T;for(v==null&&(v=e),E=function(){T=[];for(var C=0,D=r(f.length/2);0<=D?C<D:C>D;0<=D?C++:C--)T.push(C);return T}.apply(this).reverse(),_=[],y=0,x=E.length;y<x;y++)m=E[y],_.push(g(f,m,v));return _},h=function(f,v,m){var y;if(m==null&&(m=e),y=f.indexOf(v),y!==-1)return p(f,0,y,m),g(f,y,m)},c=function(f,v,m){var y,b,x,k,E;if(m==null&&(m=e),b=f.slice(0,v),!b.length)return b;for(a(b,m),E=f.slice(v),x=0,k=E.length;x<k;x++)y=E[x],i(b,y,m);return b.sort(m).reverse()},d=function(f,v,m){var y,b,x,k,E,_,T,C,D,L;if(m==null&&(m=e),v*10<=f.length){if(k=f.slice(0,v).sort(m),!k.length)return k;for(x=k[k.length-1],C=f.slice(v),E=0,T=C.length;E<T;E++)y=C[E],m(y,x)<0&&(l(k,y,0,null,m),k.pop(),x=k[k.length-1]);return k}for(a(f,m),L=[],b=_=0,D=u(v,f.length);0<=D?_<D:_>D;b=0<=D?++_:--_)L.push(n(f,m));return L},p=function(f,v,m,y){var b,x,k;for(y==null&&(y=e),b=f[m];m>v;){if(k=m-1>>1,x=f[k],y(b,x)<0){f[m]=x,m=k;continue}break}return f[m]=b},g=function(f,v,m){var y,b,x,k,E;for(m==null&&(m=e),b=f.length,E=v,x=f[v],y=2*v+1;y<b;)k=y+1,k<b&&!(m(f[y],f[k])<0)&&(y=k),f[v]=f[y],v=y,y=2*v+1;return f[v]=x,p(f,E,v,m)},t=function(){f.push=o,f.pop=n,f.replace=s,f.pushpop=i,f.heapify=a,f.updateItem=h,f.nlargest=c,f.nsmallest=d;function f(v){this.cmp=v??e,this.nodes=[]}return f.prototype.push=function(v){return o(this.nodes,v,this.cmp)},f.prototype.pop=function(){return n(this.nodes,this.cmp)},f.prototype.peek=function(){return this.nodes[0]},f.prototype.contains=function(v){return this.nodes.indexOf(v)!==-1},f.prototype.replace=function(v){return s(this.nodes,v,this.cmp)},f.prototype.pushpop=function(v){return i(this.nodes,v,this.cmp)},f.prototype.heapify=function(){return a(this.nodes,this.cmp)},f.prototype.updateItem=function(v){return h(this.nodes,v,this.cmp)},f.prototype.clear=function(){return this.nodes=[]},f.prototype.empty=function(){return this.nodes.length===0},f.prototype.size=function(){return this.nodes.length},f.prototype.clone=function(){var v;return v=new f,v.nodes=this.nodes.slice(0),v},f.prototype.toArray=function(){return this.nodes.slice(0)},f.prototype.insert=f.prototype.push,f.prototype.top=f.prototype.peek,f.prototype.front=f.prototype.peek,f.prototype.has=f.prototype.contains,f.prototype.copy=f.prototype.clone,f}(),function(f,v){return typeof define=="function"&&define.amd?define([],v):typeof xs=="object"?bc.exports=v():f.Heap=v()}(this,function(){return t})}).call(xs)});var kc=kn((gL,xc)=>{xc.exports=wc()});var dl=kn((bL,qh)=>{"use strict";function _c(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var Ui=_c(yc()),zn=_c(kc());function ct(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ct=function(e){return typeof e}:ct=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ct(t)}function ks(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Cc(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function _s(t,e,r){return e&&Cc(t.prototype,e),r&&Cc(t,r),t}function Ec(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Ir(t,e){return qg(t)||Gg(t,e)||Zg()}function qg(t){if(Array.isArray(t))return t}function Gg(t,e){var r=[],a=!0,n=!1,o=void 0;try{for(var i=t[Symbol.iterator](),s;!(a=(s=i.next()).done)&&(r.push(s.value),!(e&&r.length===e));a=!0);}catch(l){n=!0,o=l}finally{try{!a&&i.return!=null&&i.return()}finally{if(n)throw o}}return r}function Zg(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var tt=typeof window=="undefined"?null:window,Sc=tt?tt.navigator:null,mL=tt?tt.document:null,Wg=ct(""),Tc=ct({}),Jg=ct(function(){}),em=typeof HTMLElement=="undefined"?"undefined":ct(HTMLElement),Mn=function(e){return e&&e.instanceString&&rt(e.instanceString)?e.instanceString():null},we=function(e){return e!=null&&ct(e)==Wg},rt=function(e){return e!=null&&ct(e)===Jg},Qe=function(e){return!Jt(e)&&(Array.isArray?Array.isArray(e):e!=null&&e instanceof Array)},Oe=function(e){return e!=null&&ct(e)===Tc&&!Qe(e)&&e.constructor===Object},tm=function(e){return e!=null&&ct(e)===Tc},ce=function(e){return e!=null&&ct(e)===ct(1)&&!isNaN(e)},rm=function(e){return ce(e)&&Math.floor(e)===e},qi=function(e){if(em!=="undefined")return e!=null&&e instanceof HTMLElement},Jt=function(e){return Rn(e)||Dc(e)},Rn=function(e){return Mn(e)==="collection"&&e._private.single},Dc=function(e){return Mn(e)==="collection"&&!e._private.single},Cs=function(e){return Mn(e)==="core"},Pc=function(e){return Mn(e)==="stylesheet"},am=function(e){return Mn(e)==="event"},Zr=function(e){return e==null?!0:!!(e===""||e.match(/^\s+$/))},nm=function(e){return typeof HTMLElement=="undefined"?!1:e instanceof HTMLElement},im=function(e){return Oe(e)&&ce(e.x1)&&ce(e.x2)&&ce(e.y1)&&ce(e.y2)},om=function(e){return tm(e)&&rt(e.then)},sm=function(){return Sc&&Sc.userAgent.match(/msie|trident|edge/i)},Fn=function(e,r){r||(r=function(){if(arguments.length===1)return arguments[0];if(arguments.length===0)return"undefined";for(var o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);return o.join("$")});var a=function n(){var o=this,i=arguments,s,l=r.apply(o,i),u=n.cache;return(s=u[l])||(s=u[l]=e.apply(o,i)),s};return a.cache={},a},Es=Fn(function(t){return t.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}),Gi=Fn(function(t){return t.replace(/(-\w)/g,function(e){return e[1].toUpperCase()})}),Ac=Fn(function(t,e){return t+e[0].toUpperCase()+e.substring(1)},function(t,e){return t+"$"+e}),Lc=function(e){return Zr(e)?e:e.charAt(0).toUpperCase()+e.substring(1)},dt="(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))",lm="rgb[a]?\\(("+dt+"[%]?)\\s*,\\s*("+dt+"[%]?)\\s*,\\s*("+dt+"[%]?)(?:\\s*,\\s*("+dt+"))?\\)",um="rgb[a]?\\((?:"+dt+"[%]?)\\s*,\\s*(?:"+dt+"[%]?)\\s*,\\s*(?:"+dt+"[%]?)(?:\\s*,\\s*(?:"+dt+"))?\\)",cm="hsl[a]?\\(("+dt+")\\s*,\\s*("+dt+"[%])\\s*,\\s*("+dt+"[%])(?:\\s*,\\s*("+dt+"))?\\)",dm="hsl[a]?\\((?:"+dt+")\\s*,\\s*(?:"+dt+"[%])\\s*,\\s*(?:"+dt+"[%])(?:\\s*,\\s*(?:"+dt+"))?\\)",hm="\\#[0-9a-fA-F]{3}",fm="\\#[0-9a-fA-F]{6}",Ic=function(e,r){return e<r?-1:e>r?1:0},pm=function(e,r){return-1*Ic(e,r)},ke=Object.assign!=null?Object.assign.bind(Object):function(t){for(var e=arguments,r=1;r<e.length;r++){var a=e[r];if(a!=null)for(var n=Object.keys(a),o=0;o<n.length;o++){var i=n[o];t[i]=a[i]}}return t},vm=function(e){if(!(!(e.length===4||e.length===7)||e[0]!=="#")){var r=e.length===4,a,n,o,i=16;return r?(a=parseInt(e[1]+e[1],i),n=parseInt(e[2]+e[2],i),o=parseInt(e[3]+e[3],i)):(a=parseInt(e[1]+e[2],i),n=parseInt(e[3]+e[4],i),o=parseInt(e[5]+e[6],i)),[a,n,o]}},gm=function(e){var r,a,n,o,i,s,l,u;function c(g,f,v){return v<0&&(v+=1),v>1&&(v-=1),v<1/6?g+(f-g)*6*v:v<1/2?f:v<2/3?g+(f-g)*(2/3-v)*6:g}var d=new RegExp("^"+cm+"$").exec(e);if(d){if(a=parseInt(d[1]),a<0?a=(360- -1*a%360)%360:a>360&&(a=a%360),a/=360,n=parseFloat(d[2]),n<0||n>100||(n=n/100,o=parseFloat(d[3]),o<0||o>100)||(o=o/100,i=d[4],i!==void 0&&(i=parseFloat(i),i<0||i>1)))return;if(n===0)s=l=u=Math.round(o*255);else{var h=o<.5?o*(1+n):o+n-o*n,p=2*o-h;s=Math.round(255*c(p,h,a+1/3)),l=Math.round(255*c(p,h,a)),u=Math.round(255*c(p,h,a-1/3))}r=[s,l,u,i]}return r},mm=function(e){var r,a=new RegExp("^"+lm+"$").exec(e);if(a){r=[];for(var n=[],o=1;o<=3;o++){var i=a[o];if(i[i.length-1]==="%"&&(n[o]=!0),i=parseFloat(i),n[o]&&(i=i/100*255),i<0||i>255)return;r.push(Math.floor(i))}var s=n[1]||n[2]||n[3],l=n[1]&&n[2]&&n[3];if(s&&!l)return;var u=a[4];if(u!==void 0){if(u=parseFloat(u),u<0||u>1)return;r.push(u)}}return r},ym=function(e){return wm[e.toLowerCase()]},bm=function(e){return(Qe(e)?e:null)||ym(e)||vm(e)||mm(e)||gm(e)},wm={transparent:[0,0,0,0],aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},Oc=function(e){for(var r=e.map,a=e.keys,n=a.length,o=0;o<n;o++){var i=a[o];if(Oe(i))throw Error("Tried to set map with object key");o<a.length-1?(r[i]==null&&(r[i]={}),r=r[i]):r[i]=e.value}},$c=function(e){for(var r=e.map,a=e.keys,n=a.length,o=0;o<n;o++){var i=a[o];if(Oe(i))throw Error("Tried to get map with object key");if(r=r[i],r==null)return r}return r},Ss=tt?tt.performance:null,Bc=Ss&&Ss.now?function(){return Ss.now()}:function(){return Date.now()},xm=function(){if(tt){if(tt.requestAnimationFrame)return function(t){tt.requestAnimationFrame(t)};if(tt.mozRequestAnimationFrame)return function(t){tt.mozRequestAnimationFrame(t)};if(tt.webkitRequestAnimationFrame)return function(t){tt.webkitRequestAnimationFrame(t)};if(tt.msRequestAnimationFrame)return function(t){tt.msRequestAnimationFrame(t)}}return function(t){t&&setTimeout(function(){t(Bc())},1e3/60)}}(),Zi=function(e){return xm(e)},Or=Bc,Ja=9261,zc=65599,Nn=5381,Mc=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ja,a=r,n;n=e.next(),!n.done;)a=a*zc+n.value|0;return a},Vn=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ja;return r*zc+e|0},jn=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Nn;return(r<<5)+r+e|0},km=function(e,r){return e*2097152+r},Wr=function(e){return e[0]*2097152+e[1]},Wi=function(e,r){return[Vn(e[0],r[0]),jn(e[1],r[1])]},_m=function(e,r){var a={value:0,done:!1},n=0,o=e.length,i={next:function(){return n<o?a.value=e[n++]:a.done=!0,a}};return Mc(i,r)},wa=function(e,r){var a={value:0,done:!1},n=0,o=e.length,i={next:function(){return n<o?a.value=e.charCodeAt(n++):a.done=!0,a}};return Mc(i,r)},Rc=function(){return Cm(arguments)},Cm=function(e){for(var r,a=0;a<e.length;a++){var n=e[a];a===0?r=wa(n):r=wa(n,r)}return r},Fc=!0,Em=console.warn!=null,Sm=console.trace!=null,Ts=Number.MAX_SAFE_INTEGER||9007199254740991,Nc=function(){return!0},Ji=function(){return!1},Vc=function(){return 0},Ds=function(){},st=function(e){throw new Error(e)},jc=function(e){if(e!==void 0)Fc=!!e;else return Fc},Ke=function(e){!jc()||(Em?console.warn(e):(console.log(e),Sm&&console.trace()))},Tm=function(e){return ke({},e)},xr=function(e){return e==null?e:Qe(e)?e.slice():Oe(e)?Tm(e):e},Dm=function(e){return e.slice()},Kc=function(e,r){for(r=e="";e++<36;r+=e*51&52?(e^15?8^Math.random()*(e^20?16:4):4).toString(16):"-");return r},Pm={},Hc=function(){return Pm},_t=function(e){var r=Object.keys(e);return function(a){for(var n={},o=0;o<r.length;o++){var i=r[o],s=a==null?void 0:a[i];n[i]=s===void 0?e[i]:s}return n}},Jr=function(e,r,a){for(var n=e.length-1;n>=0&&!(e[n]===r&&(e.splice(n,1),a));n--);},Ps=function(e){e.splice(0,e.length)},Am=function(e,r){for(var a=0;a<r.length;a++){var n=r[a];e.push(n)}},pr=function(e,r,a){return a&&(r=Ac(a,r)),e[r]},ea=function(e,r,a,n){a&&(r=Ac(a,r)),e[r]=n},Lm=function(){function t(){ks(this,t),this._obj={}}return _s(t,[{key:"set",value:function(r,a){return this._obj[r]=a,this}},{key:"delete",value:function(r){return this._obj[r]=void 0,this}},{key:"clear",value:function(){this._obj={}}},{key:"has",value:function(r){return this._obj[r]!==void 0}},{key:"get",value:function(r){return this._obj[r]}}]),t}(),kr=typeof Map!="undefined"?Map:Lm,Im="undefined",Om=function(){function t(e){if(ks(this,t),this._obj=Object.create(null),this.size=0,e!=null){var r;e.instanceString!=null&&e.instanceString()===this.instanceString()?r=e.toArray():r=e;for(var a=0;a<r.length;a++)this.add(r[a])}}return _s(t,[{key:"instanceString",value:function(){return"set"}},{key:"add",value:function(r){var a=this._obj;a[r]!==1&&(a[r]=1,this.size++)}},{key:"delete",value:function(r){var a=this._obj;a[r]===1&&(a[r]=0,this.size--)}},{key:"clear",value:function(){this._obj=Object.create(null)}},{key:"has",value:function(r){return this._obj[r]===1}},{key:"toArray",value:function(){var r=this;return Object.keys(this._obj).filter(function(a){return r.has(a)})}},{key:"forEach",value:function(r,a){return this.toArray().forEach(r,a)}}]),t}(),en=(typeof Set=="undefined"?"undefined":ct(Set))!==Im?Set:Om,eo=function(e,r){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;if(e===void 0||r===void 0||!Cs(e)){st("An element must have a core reference and parameters set");return}var n=r.group;if(n==null&&(r.data&&r.data.source!=null&&r.data.target!=null?n="edges":n="nodes"),n!=="nodes"&&n!=="edges"){st("An element must be of type `nodes` or `edges`; you specified `"+n+"`");return}this.length=1,this[0]=this;var o=this._private={cy:e,single:!0,data:r.data||{},position:r.position||{x:0,y:0},autoWidth:void 0,autoHeight:void 0,autoPadding:void 0,compoundBoundsClean:!1,listeners:[],group:n,style:{},rstyle:{},styleCxts:[],styleKeys:{},removed:!0,selected:!!r.selected,selectable:r.selectable===void 0?!0:!!r.selectable,locked:!!r.locked,grabbed:!1,grabbable:r.grabbable===void 0?!0:!!r.grabbable,pannable:r.pannable===void 0?n==="edges":!!r.pannable,active:!1,classes:new en,animation:{current:[],queue:[]},rscratch:{},scratch:r.scratch||{},edges:[],children:[],parent:null,traversalCache:{},backgrounding:!1,bbCache:null,bbCacheShift:{x:0,y:0},bodyBounds:null,overlayBounds:null,labelBounds:{all:null,source:null,target:null,main:null},arrowBounds:{source:null,target:null,"mid-source":null,"mid-target":null}};if(o.position.x==null&&(o.position.x=0),o.position.y==null&&(o.position.y=0),r.renderedPosition){var i=r.renderedPosition,s=e.pan(),l=e.zoom();o.position={x:(i.x-s.x)/l,y:(i.y-s.y)/l}}var u=[];Qe(r.classes)?u=r.classes:we(r.classes)&&(u=r.classes.split(/\s+/));for(var c=0,d=u.length;c<d;c++){var h=u[c];!h||h===""||o.classes.add(h)}this.createEmitter();var p=r.style||r.css;p&&(Ke("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."),this.style(p)),(a===void 0||a)&&this.restore()},Qc=function(e){return e={bfs:e.bfs||!e.dfs,dfs:e.dfs||!e.bfs},function(a,n,o){var i;Oe(a)&&!Jt(a)&&(i=a,a=i.roots||i.root,n=i.visit,o=i.directed),o=arguments.length===2&&!rt(n)?n:o,n=rt(n)?n:function(){};for(var s=this._private.cy,l=a=we(a)?this.filter(a):a,u=[],c=[],d={},h={},p={},g=0,f,v=this.byGroup(),m=v.nodes,y=v.edges,b=0;b<l.length;b++){var x=l[b],k=x.id();x.isNode()&&(u.unshift(x),e.bfs&&(p[k]=!0,c.push(x)),h[k]=0)}var E=function(){var O=e.bfs?u.shift():u.pop(),I=O.id();if(e.dfs){if(p[I])return"continue";p[I]=!0,c.push(O)}var N=h[I],z=d[I],$=z!=null?z.source():null,B=z!=null?z.target():null,R=z==null?void 0:O.same($)?B[0]:$[0],H=void 0;if(H=n(O,z,R,g++,N),H===!0)return f=O,"break";if(H===!1)return"break";for(var M=O.connectedEdges().filter(function(Y){return(!o||Y.source().same(O))&&y.has(Y)}),j=0;j<M.length;j++){var W=M[j],te=W.connectedNodes().filter(function(Y){return!Y.same(O)&&m.has(Y)}),X=te.id();te.length!==0&&!p[X]&&(te=te[0],u.push(te),e.bfs&&(p[X]=!0,c.push(te)),d[X]=W,h[X]=h[I]+1)}};e:for(;u.length!==0;){var _=E();switch(_){case"continue":continue;case"break":break e}}for(var T=s.collection(),C=0;C<c.length;C++){var D=c[C],L=d[D.id()];L!=null&&T.push(L),T.push(D)}return{path:s.collection(T),found:s.collection(f)}}},Kn={breadthFirstSearch:Qc({bfs:!0}),depthFirstSearch:Qc({dfs:!0})};Kn.bfs=Kn.breadthFirstSearch;Kn.dfs=Kn.depthFirstSearch;var $m=_t({root:null,weight:function(e){return 1},directed:!1}),Bm={dijkstra:function(e){if(!Oe(e)){var r=arguments;e={root:r[0],weight:r[1],directed:r[2]}}var a=$m(e),n=a.root,o=a.weight,i=a.directed,s=this,l=o,u=we(n)?this.filter(n)[0]:n[0],c={},d={},h={},p=this.byGroup(),g=p.nodes,f=p.edges;f.unmergeBy(function(N){return N.isLoop()});for(var v=function(z){return c[z.id()]},m=function(z,$){c[z.id()]=$,y.updateItem(z)},y=new zn(function(N,z){return v(N)-v(z)}),b=0;b<g.length;b++){var x=g[b];c[x.id()]=x.same(u)?0:1/0,y.push(x)}for(var k=function(z,$){for(var B=(i?z.edgesTo($):z.edgesWith($)).intersect(f),R=1/0,H,M=0;M<B.length;M++){var j=B[M],W=l(j);(W<R||!H)&&(R=W,H=j)}return{edge:H,dist:R}};y.size()>0;){var E=y.pop(),_=v(E),T=E.id();if(h[T]=_,_!==1/0)for(var C=E.neighborhood().intersect(g),D=0;D<C.length;D++){var L=C[D],A=L.id(),O=k(E,L),I=_+O.dist;I<v(L)&&(m(L,I),d[A]={node:E,edge:O.edge})}}return{distanceTo:function(z){var $=we(z)?g.filter(z)[0]:z[0];return h[$.id()]},pathTo:function(z){var $=we(z)?g.filter(z)[0]:z[0],B=[],R=$,H=R.id();if($.length>0)for(B.unshift($);d[H];){var M=d[H];B.unshift(M.edge),B.unshift(M.node),R=M.node,H=R.id()}return s.spawn(B)}}}},zm={kruskal:function(e){e=e||function(b){return 1};for(var r=this.byGroup(),a=r.nodes,n=r.edges,o=a.length,i=new Array(o),s=a,l=function(x){for(var k=0;k<i.length;k++){var E=i[k];if(E.has(x))return k}},u=0;u<o;u++)i[u]=this.spawn(a[u]);for(var c=n.sort(function(b,x){return e(b)-e(x)}),d=0;d<c.length;d++){var h=c[d],p=h.source()[0],g=h.target()[0],f=l(p),v=l(g),m=i[f],y=i[v];f!==v&&(s.merge(h),m.merge(y),i.splice(v,1))}return s}},Mm=_t({root:null,goal:null,weight:function(e){return 1},heuristic:function(e){return 0},directed:!1}),Rm={aStar:function(e){var r=this.cy(),a=Mm(e),n=a.root,o=a.goal,i=a.heuristic,s=a.directed,l=a.weight;n=r.collection(n)[0],o=r.collection(o)[0];var u=n.id(),c=o.id(),d={},h={},p={},g=new zn(function(H,M){return h[H.id()]-h[M.id()]}),f=new en,v={},m={},y=function(M,j){g.push(M),f.add(j)},b,x,k=function(){b=g.pop(),x=b.id(),f.delete(x)},E=function(M){return f.has(M)};y(n,u),d[u]=0,h[u]=i(n);for(var _=0;g.size()>0;){if(k(),_++,x===c){for(var T=[],C=o,D=c,L=m[D];T.unshift(C),L!=null&&T.unshift(L),C=v[D],C!=null;)D=C.id(),L=m[D];return{found:!0,distance:d[x],path:this.spawn(T),steps:_}}p[x]=!0;for(var A=b._private.edges,O=0;O<A.length;O++){var I=A[O];if(!!this.hasElementWithId(I.id())&&!(s&&I.data("source")!==x)){var N=I.source(),z=I.target(),$=N.id()!==x?N:z,B=$.id();if(!!this.hasElementWithId(B)&&!p[B]){var R=d[x]+l(I);if(!E(B)){d[B]=R,h[B]=R+i($),y($,B),v[B]=b,m[B]=I;continue}R<d[B]&&(d[B]=R,h[B]=R+i($),v[B]=b,m[B]=I)}}}}return{found:!1,distance:void 0,path:void 0,steps:_}}},Fm=_t({weight:function(e){return 1},directed:!1}),Nm={floydWarshall:function(e){for(var r=this.cy(),a=Fm(e),n=a.weight,o=a.directed,i=n,s=this.byGroup(),l=s.nodes,u=s.edges,c=l.length,d=c*c,h=function(W){return l.indexOf(W)},p=function(W){return l[W]},g=new Array(d),f=0;f<d;f++){var v=f%c,m=(f-v)/c;m===v?g[f]=0:g[f]=1/0}for(var y=new Array(d),b=new Array(d),x=0;x<u.length;x++){var k=u[x],E=k.source()[0],_=k.target()[0];if(E!==_){var T=h(E),C=h(_),D=T*c+C,L=i(k);if(g[D]>L&&(g[D]=L,y[D]=C,b[D]=k),!o){var A=C*c+T;!o&&g[A]>L&&(g[A]=L,y[A]=T,b[A]=k)}}}for(var O=0;O<c;O++)for(var I=0;I<c;I++)for(var N=I*c+O,z=0;z<c;z++){var $=I*c+z,B=O*c+z;g[N]+g[B]<g[$]&&(g[$]=g[N]+g[B],y[$]=y[N])}var R=function(W){return(we(W)?r.filter(W):W)[0]},H=function(W){return h(R(W))},M={distance:function(W,te){var X=H(W),Y=H(te);return g[X*c+Y]},path:function(W,te){var X=H(W),Y=H(te),F=p(X);if(X===Y)return F.collection();if(y[X*c+Y]==null)return r.collection();var Z=r.collection(),se=X,ie;for(Z.merge(F);X!==Y;)se=X,X=y[X*c+Y],ie=b[se*c+X],Z.merge(ie),Z.merge(p(X));return Z}};return M}},Vm=_t({weight:function(e){return 1},directed:!1,root:null}),jm={bellmanFord:function(e){var r=this,a=Vm(e),n=a.weight,o=a.directed,i=a.root,s=n,l=this,u=this.cy(),c=this.byGroup(),d=c.edges,h=c.nodes,p=h.length,g=new kr,f=!1,v=[];i=u.collection(i)[0],d.unmergeBy(function(Y){return Y.isLoop()});for(var m=d.length,y=function(F){var Z=g.get(F.id());return Z||(Z={},g.set(F.id(),Z)),Z},b=function(F){return(we(F)?u.$(F):F)[0]},x=function(F){return y(b(F)).dist},k=function(F){for(var Z=arguments.length>1&&arguments[1]!==void 0?arguments[1]:i,se=b(F),ie=[],pe=se;;){if(pe==null)return r.spawn();var De=y(pe),Te=De.edge,fe=De.pred;if(ie.unshift(pe[0]),pe.same(Z)&&ie.length>0)break;Te!=null&&ie.unshift(Te),pe=fe}return l.spawn(ie)},E=0;E<p;E++){var _=h[E],T=y(_);_.same(i)?T.dist=0:T.dist=1/0,T.pred=null,T.edge=null}for(var C=!1,D=function(F,Z,se,ie,pe,De){var Te=ie.dist+De;Te<pe.dist&&!se.same(ie.edge)&&(pe.dist=Te,pe.pred=F,pe.edge=se,C=!0)},L=1;L<p;L++){C=!1;for(var A=0;A<m;A++){var O=d[A],I=O.source(),N=O.target(),z=s(O),$=y(I),B=y(N);D(I,N,O,$,B,z),o||D(N,I,O,B,$,z)}if(!C)break}if(C)for(var R=0;R<m;R++){var H=d[R],M=H.source(),j=H.target(),W=s(H),te=y(M).dist,X=y(j).dist;if(te+W<X||!o&&X+W<te){Ke("Graph contains a negative weight cycle for Bellman-Ford"),f=!0;break}}return{distanceTo:x,pathTo:k,hasNegativeWeightCycle:f,negativeWeightCycles:v}}},Km=Math.sqrt(2),Hm=function(e,r,a){a.length===0&&st("Karger-Stein must be run on a connected (sub)graph");for(var n=a[e],o=n[1],i=n[2],s=r[o],l=r[i],u=a,c=u.length-1;c>=0;c--){var d=u[c],h=d[1],p=d[2];(r[h]===s&&r[p]===l||r[h]===l&&r[p]===s)&&u.splice(c,1)}for(var g=0;g<u.length;g++){var f=u[g];f[1]===l?(u[g]=f.slice(),u[g][1]=s):f[2]===l&&(u[g]=f.slice(),u[g][2]=s)}for(var v=0;v<r.length;v++)r[v]===l&&(r[v]=s);return u},As=function(e,r,a,n){for(;a>n;){var o=Math.floor(Math.random()*r.length);r=Hm(o,e,r),a--}return r},Qm={kargerStein:function(){var e=this,r=this.byGroup(),a=r.nodes,n=r.edges;n.unmergeBy(function(B){return B.isLoop()});var o=a.length,i=n.length,s=Math.ceil(Math.pow(Math.log(o)/Math.LN2,2)),l=Math.floor(o/Km);if(o<2){st("At least 2 nodes are required for Karger-Stein algorithm");return}for(var u=[],c=0;c<i;c++){var d=n[c];u.push([c,a.indexOf(d.source()),a.indexOf(d.target())])}for(var h=1/0,p=[],g=new Array(o),f=new Array(o),v=new Array(o),m=function(R,H){for(var M=0;M<o;M++)H[M]=R[M]},y=0;y<=s;y++){for(var b=0;b<o;b++)f[b]=b;var x=As(f,u.slice(),o,l),k=x.slice();m(f,v);var E=As(f,x,l,2),_=As(v,k,l,2);E.length<=_.length&&E.length<h?(h=E.length,p=E,m(f,g)):_.length<=E.length&&_.length<h&&(h=_.length,p=_,m(v,g))}for(var T=this.spawn(p.map(function(B){return n[B[0]]})),C=this.spawn(),D=this.spawn(),L=g[0],A=0;A<g.length;A++){var O=g[A],I=a[A];O===L?C.merge(I):D.merge(I)}var N=function(R){var H=e.spawn();return R.forEach(function(M){H.merge(M),M.connectedEdges().forEach(function(j){e.contains(j)&&!T.contains(j)&&H.merge(j)})}),H},z=[N(C),N(D)],$={cut:T,components:z,partition1:C,partition2:D};return $}},Ym=function(e){return{x:e.x,y:e.y}},to=function(e,r,a){return{x:e.x*r+a.x,y:e.y*r+a.y}},Yc=function(e,r,a){return{x:(e.x-a.x)/r,y:(e.y-a.y)/r}},tn=function(e){return{x:e[0],y:e[1]}},Xm=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=1/0,o=r;o<a;o++){var i=e[o];isFinite(i)&&(n=Math.min(i,n))}return n},Um=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=-1/0,o=r;o<a;o++){var i=e[o];isFinite(i)&&(n=Math.max(i,n))}return n},qm=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=0,o=0,i=r;i<a;i++){var s=e[i];isFinite(s)&&(n+=s,o++)}return n/o},Gm=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0;n?e=e.slice(r,a):(a<e.length&&e.splice(a,e.length-a),r>0&&e.splice(0,r));for(var s=0,l=e.length-1;l>=0;l--){var u=e[l];i?isFinite(u)||(e[l]=-1/0,s++):e.splice(l,1)}o&&e.sort(function(h,p){return h-p});var c=e.length,d=Math.floor(c/2);return c%2!=0?e[d+1+s]:(e[d-1+s]+e[d+s])/2},Zm=function(e){return Math.PI*e/180},ro=function(e,r){return Math.atan2(r,e)-Math.PI/2},Ls=Math.log2||function(t){return Math.log(t)/Math.log(2)},Xc=function(e){return e>0?1:e<0?-1:0},xa=function(e,r){return Math.sqrt(ka(e,r))},ka=function(e,r){var a=r.x-e.x,n=r.y-e.y;return a*a+n*n},Wm=function(e){for(var r=e.length,a=0,n=0;n<r;n++)a+=e[n];for(var o=0;o<r;o++)e[o]=e[o]/a;return e},mt=function(e,r,a,n){return(1-n)*(1-n)*e+2*(1-n)*n*r+n*n*a},rn=function(e,r,a,n){return{x:mt(e.x,r.x,a.x,n),y:mt(e.y,r.y,a.y,n)}},Jm=function(e,r,a,n){var o={x:r.x-e.x,y:r.y-e.y},i=xa(e,r),s={x:o.x/i,y:o.y/i};return a=a??0,n=n??a*i,{x:e.x+s.x*n,y:e.y+s.y*n}},Hn=function(e,r,a){return Math.max(e,Math.min(a,r))},Qt=function(e){if(e==null)return{x1:1/0,y1:1/0,x2:-1/0,y2:-1/0,w:0,h:0};if(e.x1!=null&&e.y1!=null){if(e.x2!=null&&e.y2!=null&&e.x2>=e.x1&&e.y2>=e.y1)return{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,w:e.x2-e.x1,h:e.y2-e.y1};if(e.w!=null&&e.h!=null&&e.w>=0&&e.h>=0)return{x1:e.x1,y1:e.y1,x2:e.x1+e.w,y2:e.y1+e.h,w:e.w,h:e.h}}},e0=function(e){return{x1:e.x1,x2:e.x2,w:e.w,y1:e.y1,y2:e.y2,h:e.h}},t0=function(e){e.x1=1/0,e.y1=1/0,e.x2=-1/0,e.y2=-1/0,e.w=0,e.h=0},r0=function(e,r){e.x1=Math.min(e.x1,r.x1),e.x2=Math.max(e.x2,r.x2),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,r.y1),e.y2=Math.max(e.y2,r.y2),e.h=e.y2-e.y1},a0=function(e,r,a){e.x1=Math.min(e.x1,r),e.x2=Math.max(e.x2,r),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,a),e.y2=Math.max(e.y2,a),e.h=e.y2-e.y1},ao=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return e.x1-=r,e.x2+=r,e.y1-=r,e.y2+=r,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},Is=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[0],a,n,o,i;if(r.length===1)a=n=o=i=r[0];else if(r.length===2)a=o=r[0],i=n=r[1];else if(r.length===4){var s=Ir(r,4);a=s[0],n=s[1],o=s[2],i=s[3]}return e.x1-=i,e.x2+=n,e.y1-=a,e.y2+=o,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},Uc=function(e,r){e.x1=r.x1,e.y1=r.y1,e.x2=r.x2,e.y2=r.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1},Os=function(e,r){return!(e.x1>r.x2||r.x1>e.x2||e.x2<r.x1||r.x2<e.x1||e.y2<r.y1||r.y2<e.y1||e.y1>r.y2||r.y1>e.y2)},an=function(e,r,a){return e.x1<=r&&r<=e.x2&&e.y1<=a&&a<=e.y2},n0=function(e,r){return an(e,r.x,r.y)},qc=function(e,r){return an(e,r.x1,r.y1)&&an(e,r.x2,r.y2)},Gc=function(e,r,a,n,o,i,s){var l=Xn(o,i),u=o/2,c=i/2,d;{var h=a-u+l-s,p=n-c-s,g=a+u-l+s,f=p;if(d=ta(e,r,a,n,h,p,g,f,!1),d.length>0)return d}{var v=a+u+s,m=n-c+l-s,y=v,b=n+c-l+s;if(d=ta(e,r,a,n,v,m,y,b,!1),d.length>0)return d}{var x=a-u+l-s,k=n+c+s,E=a+u-l+s,_=k;if(d=ta(e,r,a,n,x,k,E,_,!1),d.length>0)return d}{var T=a-u-s,C=n-c+l-s,D=T,L=n+c-l+s;if(d=ta(e,r,a,n,T,C,D,L,!1),d.length>0)return d}var A;{var O=a-u+l,I=n-c+l;if(A=Qn(e,r,a,n,O,I,l+s),A.length>0&&A[0]<=O&&A[1]<=I)return[A[0],A[1]]}{var N=a+u-l,z=n-c+l;if(A=Qn(e,r,a,n,N,z,l+s),A.length>0&&A[0]>=N&&A[1]<=z)return[A[0],A[1]]}{var $=a+u-l,B=n+c-l;if(A=Qn(e,r,a,n,$,B,l+s),A.length>0&&A[0]>=$&&A[1]>=B)return[A[0],A[1]]}{var R=a-u+l,H=n+c-l;if(A=Qn(e,r,a,n,R,H,l+s),A.length>0&&A[0]<=R&&A[1]>=H)return[A[0],A[1]]}return[]},i0=function(e,r,a,n,o,i,s){var l=s,u=Math.min(a,o),c=Math.max(a,o),d=Math.min(n,i),h=Math.max(n,i);return u-l<=e&&e<=c+l&&d-l<=r&&r<=h+l},o0=function(e,r,a,n,o,i,s,l,u){var c={x1:Math.min(a,s,o)-u,x2:Math.max(a,s,o)+u,y1:Math.min(n,l,i)-u,y2:Math.max(n,l,i)+u};return!(e<c.x1||e>c.x2||r<c.y1||r>c.y2)},s0=function(e,r,a,n){a-=n;var o=r*r-4*e*a;if(o<0)return[];var i=Math.sqrt(o),s=2*e,l=(-r+i)/s,u=(-r-i)/s;return[l,u]},l0=function(e,r,a,n,o){var i=1e-5;e===0&&(e=i),r/=e,a/=e,n/=e;var s,l,u,c,d,h,p,g;if(l=(3*a-r*r)/9,u=-(27*n)+r*(9*a-2*(r*r)),u/=54,s=l*l*l+u*u,o[1]=0,p=r/3,s>0){d=u+Math.sqrt(s),d=d<0?-Math.pow(-d,1/3):Math.pow(d,1/3),h=u-Math.sqrt(s),h=h<0?-Math.pow(-h,1/3):Math.pow(h,1/3),o[0]=-p+d+h,p+=(d+h)/2,o[4]=o[2]=-p,p=Math.sqrt(3)*(-h+d)/2,o[3]=p,o[5]=-p;return}if(o[5]=o[3]=0,s===0){g=u<0?-Math.pow(-u,1/3):Math.pow(u,1/3),o[0]=-p+2*g,o[4]=o[2]=-(g+p);return}l=-l,c=l*l*l,c=Math.acos(u/Math.sqrt(c)),g=2*Math.sqrt(l),o[0]=-p+g*Math.cos(c/3),o[2]=-p+g*Math.cos((c+2*Math.PI)/3),o[4]=-p+g*Math.cos((c+4*Math.PI)/3)},u0=function(e,r,a,n,o,i,s,l){var u=1*a*a-4*a*o+2*a*s+4*o*o-4*o*s+s*s+n*n-4*n*i+2*n*l+4*i*i-4*i*l+l*l,c=1*9*a*o-3*a*a-3*a*s-6*o*o+3*o*s+9*n*i-3*n*n-3*n*l-6*i*i+3*i*l,d=1*3*a*a-6*a*o+a*s-a*e+2*o*o+2*o*e-s*e+3*n*n-6*n*i+n*l-n*r+2*i*i+2*i*r-l*r,h=1*a*o-a*a+a*e-o*e+n*i-n*n+n*r-i*r,p=[];l0(u,c,d,h,p);for(var g=1e-7,f=[],v=0;v<6;v+=2)Math.abs(p[v+1])<g&&p[v]>=0&&p[v]<=1&&f.push(p[v]);f.push(1),f.push(0);for(var m=-1,y,b,x,k=0;k<f.length;k++)y=Math.pow(1-f[k],2)*a+2*(1-f[k])*f[k]*o+f[k]*f[k]*s,b=Math.pow(1-f[k],2)*n+2*(1-f[k])*f[k]*i+f[k]*f[k]*l,x=Math.pow(y-e,2)+Math.pow(b-r,2),m>=0?x<m&&(m=x):m=x;return m},c0=function(e,r,a,n,o,i){var s=[e-a,r-n],l=[o-a,i-n],u=l[0]*l[0]+l[1]*l[1],c=s[0]*s[0]+s[1]*s[1],d=s[0]*l[0]+s[1]*l[1],h=d*d/u;return d<0?c:h>u?(e-o)*(e-o)+(r-i)*(r-i):c-h},Yt=function(e,r,a){for(var n,o,i,s,l,u=0,c=0;c<a.length/2;c++)if(n=a[c*2],o=a[c*2+1],c+1<a.length/2?(i=a[(c+1)*2],s=a[(c+1)*2+1]):(i=a[(c+1-a.length/2)*2],s=a[(c+1-a.length/2)*2+1]),!(n==e&&i==e))if(n>=e&&e>=i||n<=e&&e<=i)l=(e-n)/(i-n)*(s-o)+o,l>r&&u++;else continue;return u%2!=0},$r=function(e,r,a,n,o,i,s,l,u){var c=new Array(a.length),d;l[0]!=null?(d=Math.atan(l[1]/l[0]),l[0]<0?d=d+Math.PI/2:d=-d-Math.PI/2):d=l;for(var h=Math.cos(-d),p=Math.sin(-d),g=0;g<c.length/2;g++)c[g*2]=i/2*(a[g*2]*h-a[g*2+1]*p),c[g*2+1]=s/2*(a[g*2+1]*h+a[g*2]*p),c[g*2]+=n,c[g*2+1]+=o;var f;if(u>0){var v=Wc(c,-u);f=Zc(v)}else f=c;return Yt(e,r,f)},d0=function(e,r,a,n,o,i,s){for(var l=new Array(a.length),u=i/2,c=s/2,d=zs(i,s),h=d*d,p=0;p<a.length/4;p++){var g=void 0,f=void 0;p===0?g=a.length-2:g=p*4-2,f=p*4+2;var v=n+u*a[p*4],m=o+c*a[p*4+1],y=-a[g]*a[f]-a[g+1]*a[f+1],b=d/Math.tan(Math.acos(y)/2),x=v-b*a[g],k=m-b*a[g+1],E=v+b*a[f],_=m+b*a[f+1];l[p*4]=x,l[p*4+1]=k,l[p*4+2]=E,l[p*4+3]=_;var T=a[g+1],C=-a[g],D=T*a[f]+C*a[f+1];D<0&&(T*=-1,C*=-1);var L=x+T*d,A=k+C*d,O=Math.pow(L-e,2)+Math.pow(A-r,2);if(O<=h)return!0}return Yt(e,r,l)},Zc=function(e){for(var r=new Array(e.length/2),a,n,o,i,s,l,u,c,d=0;d<e.length/4;d++){a=e[d*4],n=e[d*4+1],o=e[d*4+2],i=e[d*4+3],d<e.length/4-1?(s=e[(d+1)*4],l=e[(d+1)*4+1],u=e[(d+1)*4+2],c=e[(d+1)*4+3]):(s=e[0],l=e[1],u=e[2],c=e[3]);var h=ta(a,n,o,i,s,l,u,c,!0);r[d*2]=h[0],r[d*2+1]=h[1]}return r},Wc=function(e,r){for(var a=new Array(e.length*2),n,o,i,s,l=0;l<e.length/2;l++){n=e[l*2],o=e[l*2+1],l<e.length/2-1?(i=e[(l+1)*2],s=e[(l+1)*2+1]):(i=e[0],s=e[1]);var u=s-o,c=-(i-n),d=Math.sqrt(u*u+c*c),h=u/d,p=c/d;a[l*4]=n+h*r,a[l*4+1]=o+p*r,a[l*4+2]=i+h*r,a[l*4+3]=s+p*r}return a},h0=function(e,r,a,n,o,i){var s=a-e,l=n-r;s/=o,l/=i;var u=Math.sqrt(s*s+l*l),c=u-1;if(c<0)return[];var d=c/u;return[(a-e)*d+e,(n-r)*d+r]},_a=function(e,r,a,n,o,i,s){return e-=o,r-=i,e/=a/2+s,r/=n/2+s,e*e+r*r<=1},Qn=function(e,r,a,n,o,i,s){var l=[a-e,n-r],u=[e-o,r-i],c=l[0]*l[0]+l[1]*l[1],d=2*(u[0]*l[0]+u[1]*l[1]),h=u[0]*u[0]+u[1]*u[1]-s*s,p=d*d-4*c*h;if(p<0)return[];var g=(-d+Math.sqrt(p))/(2*c),f=(-d-Math.sqrt(p))/(2*c),v=Math.min(g,f),m=Math.max(g,f),y=[];if(v>=0&&v<=1&&y.push(v),m>=0&&m<=1&&y.push(m),y.length===0)return[];var b=y[0]*l[0]+e,x=y[0]*l[1]+r;if(y.length>1){if(y[0]==y[1])return[b,x];var k=y[1]*l[0]+e,E=y[1]*l[1]+r;return[b,x,k,E]}else return[b,x]},$s=function(e,r,a){return r<=e&&e<=a||a<=e&&e<=r?e:e<=r&&r<=a||a<=r&&r<=e?r:a},ta=function(e,r,a,n,o,i,s,l,u){var c=e-o,d=a-e,h=s-o,p=r-i,g=n-r,f=l-i,v=h*p-f*c,m=d*p-g*c,y=f*d-h*g;if(y!==0){var b=v/y,x=m/y,k=.001,E=0-k,_=1+k;return E<=b&&b<=_&&E<=x&&x<=_?[e+b*d,r+b*g]:u?[e+b*d,r+b*g]:[]}else return v===0||m===0?$s(e,a,s)===s?[s,l]:$s(e,a,o)===o?[o,i]:$s(o,s,a)===a?[a,n]:[]:[]},Yn=function(e,r,a,n,o,i,s,l){var u=[],c,d=new Array(a.length),h=!0;i==null&&(h=!1);var p;if(h){for(var g=0;g<d.length/2;g++)d[g*2]=a[g*2]*i+n,d[g*2+1]=a[g*2+1]*s+o;if(l>0){var f=Wc(d,-l);p=Zc(f)}else p=d}else p=a;for(var v,m,y,b,x=0;x<p.length/2;x++)v=p[x*2],m=p[x*2+1],x<p.length/2-1?(y=p[(x+1)*2],b=p[(x+1)*2+1]):(y=p[0],b=p[1]),c=ta(e,r,n,o,v,m,y,b),c.length!==0&&u.push(c[0],c[1]);return u},f0=function(e,r,a,n,o,i,s,l){for(var u=[],c,d=new Array(a.length),h=i/2,p=s/2,g=zs(i,s),f=0;f<a.length/4;f++){var v=void 0,m=void 0;f===0?v=a.length-2:v=f*4-2,m=f*4+2;var y=n+h*a[f*4],b=o+p*a[f*4+1],x=-a[v]*a[m]-a[v+1]*a[m+1],k=g/Math.tan(Math.acos(x)/2),E=y-k*a[v],_=b-k*a[v+1],T=y+k*a[m],C=b+k*a[m+1];f===0?(d[a.length-2]=E,d[a.length-1]=_):(d[f*4-2]=E,d[f*4-1]=_),d[f*4]=T,d[f*4+1]=C;var D=a[v+1],L=-a[v],A=D*a[m]+L*a[m+1];A<0&&(D*=-1,L*=-1);var O=E+D*g,I=_+L*g;c=Qn(e,r,n,o,O,I,g),c.length!==0&&u.push(c[0],c[1])}for(var N=0;N<d.length/4;N++)c=ta(e,r,n,o,d[N*4],d[N*4+1],d[N*4+2],d[N*4+3],!1),c.length!==0&&u.push(c[0],c[1]);if(u.length>2){for(var z=[u[0],u[1]],$=Math.pow(z[0]-e,2)+Math.pow(z[1]-r,2),B=1;B<u.length/2;B++){var R=Math.pow(u[B*2]-e,2)+Math.pow(u[B*2+1]-r,2);R<=$&&(z[0]=u[B*2],z[1]=u[B*2+1],$=R)}return z}return u},no=function(e,r,a){var n=[e[0]-r[0],e[1]-r[1]],o=Math.sqrt(n[0]*n[0]+n[1]*n[1]),i=(o-a)/o;return i<0&&(i=1e-5),[r[0]+i*n[0],r[1]+i*n[1]]},Mt=function(e,r){var a=Bs(e,r);return a=Jc(a),a},Jc=function(e){for(var r,a,n=e.length/2,o=1/0,i=1/0,s=-1/0,l=-1/0,u=0;u<n;u++)r=e[2*u],a=e[2*u+1],o=Math.min(o,r),s=Math.max(s,r),i=Math.min(i,a),l=Math.max(l,a);for(var c=2/(s-o),d=2/(l-i),h=0;h<n;h++)r=e[2*h]=e[2*h]*c,a=e[2*h+1]=e[2*h+1]*d,o=Math.min(o,r),s=Math.max(s,r),i=Math.min(i,a),l=Math.max(l,a);if(i<-1)for(var p=0;p<n;p++)a=e[2*p+1]=e[2*p+1]+(-1-i);return e},Bs=function(e,r){var a=1/e*2*Math.PI,n=e%2==0?Math.PI/2+a/2:Math.PI/2;n+=r;for(var o=new Array(e*2),i,s=0;s<e;s++)i=s*a+n,o[2*s]=Math.cos(i),o[2*s+1]=Math.sin(-i);return o},Xn=function(e,r){return Math.min(e/4,r/4,8)},zs=function(e,r){return Math.min(e/10,r/10,8)},ed=function(){return 8},p0=function(e,r,a){return[e-2*r+a,2*(r-e),e]},Ms=function(e,r){return{heightOffset:Math.min(15,.05*r),widthOffset:Math.min(100,.25*e),ctrlPtOffsetPct:.05}},v0=_t({dampingFactor:.8,precision:1e-6,iterations:200,weight:function(e){return 1}}),g0={pageRank:function(e){for(var r=v0(e),a=r.dampingFactor,n=r.precision,o=r.iterations,i=r.weight,s=this._private.cy,l=this.byGroup(),u=l.nodes,c=l.edges,d=u.length,h=d*d,p=c.length,g=new Array(h),f=new Array(d),v=(1-a)/d,m=0;m<d;m++){for(var y=0;y<d;y++){var b=m*d+y;g[b]=0}f[m]=0}for(var x=0;x<p;x++){var k=c[x],E=k.data("source"),_=k.data("target");if(E!==_){var T=u.indexOfId(E),C=u.indexOfId(_),D=i(k),L=C*d+T;g[L]+=D,f[T]+=D}}for(var A=1/d+v,O=0;O<d;O++)if(f[O]===0)for(var I=0;I<d;I++){var N=I*d+O;g[N]=A}else for(var z=0;z<d;z++){var $=z*d+O;g[$]=g[$]/f[O]+v}for(var B=new Array(d),R=new Array(d),H,M=0;M<d;M++)B[M]=1;for(var j=0;j<o;j++){for(var W=0;W<d;W++)R[W]=0;for(var te=0;te<d;te++)for(var X=0;X<d;X++){var Y=te*d+X;R[te]+=g[Y]*B[X]}Wm(R),H=B,B=R,R=H;for(var F=0,Z=0;Z<d;Z++){var se=H[Z]-B[Z];F+=se*se}if(F<n)break}var ie={rank:function(De){return De=s.collection(De)[0],B[u.indexOf(De)]}};return ie}},td=_t({root:null,weight:function(e){return 1},directed:!1,alpha:0}),nn={degreeCentralityNormalized:function(e){e=td(e);var r=this.cy(),a=this.nodes(),n=a.length;if(e.directed){for(var c={},d={},h=0,p=0,g=0;g<n;g++){var f=a[g],v=f.id();e.root=f;var m=this.degreeCentrality(e);h<m.indegree&&(h=m.indegree),p<m.outdegree&&(p=m.outdegree),c[v]=m.indegree,d[v]=m.outdegree}return{indegree:function(b){return h==0?0:(we(b)&&(b=r.filter(b)),c[b.id()]/h)},outdegree:function(b){return p===0?0:(we(b)&&(b=r.filter(b)),d[b.id()]/p)}}}else{for(var o={},i=0,s=0;s<n;s++){var l=a[s];e.root=l;var u=this.degreeCentrality(e);i<u.degree&&(i=u.degree),o[l.id()]=u.degree}return{degree:function(b){return i===0?0:(we(b)&&(b=r.filter(b)),o[b.id()]/i)}}}},degreeCentrality:function(e){e=td(e);var r=this.cy(),a=this,n=e,o=n.root,i=n.weight,s=n.directed,l=n.alpha;if(o=r.collection(o)[0],s){for(var p=o.connectedEdges(),g=p.filter(function(E){return E.target().same(o)&&a.has(E)}),f=p.filter(function(E){return E.source().same(o)&&a.has(E)}),v=g.length,m=f.length,y=0,b=0,x=0;x<g.length;x++)y+=i(g[x]);for(var k=0;k<f.length;k++)b+=i(f[k]);return{indegree:Math.pow(v,1-l)*Math.pow(y,l),outdegree:Math.pow(m,1-l)*Math.pow(b,l)}}else{for(var u=o.connectedEdges().intersection(a),c=u.length,d=0,h=0;h<u.length;h++)d+=i(u[h]);return{degree:Math.pow(c,1-l)*Math.pow(d,l)}}}};nn.dc=nn.degreeCentrality;nn.dcn=nn.degreeCentralityNormalised=nn.degreeCentralityNormalized;var rd=_t({harmonic:!0,weight:function(){return 1},directed:!1,root:null}),on={closenessCentralityNormalized:function(e){for(var r=rd(e),a=r.harmonic,n=r.weight,o=r.directed,i=this.cy(),s={},l=0,u=this.nodes(),c=this.floydWarshall({weight:n,directed:o}),d=0;d<u.length;d++){for(var h=0,p=u[d],g=0;g<u.length;g++)if(d!==g){var f=c.distance(p,u[g]);a?h+=1/f:h+=f}a||(h=1/h),l<h&&(l=h),s[p.id()]=h}return{closeness:function(m){return l==0?0:(we(m)?m=i.filter(m)[0].id():m=m.id(),s[m]/l)}}},closenessCentrality:function(e){var r=rd(e),a=r.root,n=r.weight,o=r.directed,i=r.harmonic;a=this.filter(a)[0];for(var s=this.dijkstra({root:a,weight:n,directed:o}),l=0,u=this.nodes(),c=0;c<u.length;c++){var d=u[c];if(!d.same(a)){var h=s.distanceTo(d);i?l+=1/h:l+=h}}return i?l:1/l}};on.cc=on.closenessCentrality;on.ccn=on.closenessCentralityNormalised=on.closenessCentralityNormalized;var m0=_t({weight:null,directed:!1}),Rs={betweennessCentrality:function(e){for(var r=m0(e),a=r.directed,n=r.weight,o=n!=null,i=this.cy(),s=this.nodes(),l={},u={},c=0,d={set:function(b,x){u[b]=x,x>c&&(c=x)},get:function(b){return u[b]}},h=0;h<s.length;h++){var p=s[h],g=p.id();a?l[g]=p.outgoers().nodes():l[g]=p.openNeighborhood().nodes(),d.set(g,0)}for(var f=function(b){for(var x=s[b].id(),k=[],E={},_={},T={},C=new zn(function(X,Y){return T[X]-T[Y]}),D=0;D<s.length;D++){var L=s[D].id();E[L]=[],_[L]=0,T[L]=1/0}for(_[x]=1,T[x]=0,C.push(x);!C.empty();){var A=C.pop();if(k.push(A),o)for(var O=0;O<l[A].length;O++){var I=l[A][O],N=i.getElementById(A),z=void 0;N.edgesTo(I).length>0?z=N.edgesTo(I)[0]:z=I.edgesTo(N)[0];var $=n(z);I=I.id(),T[I]>T[A]+$&&(T[I]=T[A]+$,C.nodes.indexOf(I)<0?C.push(I):C.updateItem(I),_[I]=0,E[I]=[]),T[I]==T[A]+$&&(_[I]=_[I]+_[A],E[I].push(A))}else for(var B=0;B<l[A].length;B++){var R=l[A][B].id();T[R]==1/0&&(C.push(R),T[R]=T[A]+1),T[R]==T[A]+1&&(_[R]=_[R]+_[A],E[R].push(A))}}for(var H={},M=0;M<s.length;M++)H[s[M].id()]=0;for(;k.length>0;){for(var j=k.pop(),W=0;W<E[j].length;W++){var te=E[j][W];H[te]=H[te]+_[te]/_[j]*(1+H[j])}j!=s[b].id()&&d.set(j,d.get(j)+H[j])}},v=0;v<s.length;v++)f(v);var m={betweenness:function(b){var x=i.collection(b).id();return d.get(x)},betweennessNormalized:function(b){if(c==0)return 0;var x=i.collection(b).id();return d.get(x)/c}};return m.betweennessNormalised=m.betweennessNormalized,m}};Rs.bc=Rs.betweennessCentrality;var y0=_t({expandFactor:2,inflateFactor:2,multFactor:1,maxIterations:20,attributes:[function(t){return 1}]}),b0=function(e){return y0(e)},w0=function(e,r){for(var a=0,n=0;n<r.length;n++)a+=r[n](e);return a},x0=function(e,r,a){for(var n=0;n<r;n++)e[n*r+n]=a},ad=function(e,r){for(var a,n=0;n<r;n++){a=0;for(var o=0;o<r;o++)a+=e[o*r+n];for(var i=0;i<r;i++)e[i*r+n]=e[i*r+n]/a}},k0=function(e,r,a){for(var n=new Array(a*a),o=0;o<a;o++){for(var i=0;i<a;i++)n[o*a+i]=0;for(var s=0;s<a;s++)for(var l=0;l<a;l++)n[o*a+l]+=e[o*a+s]*r[s*a+l]}return n},_0=function(e,r,a){for(var n=e.slice(0),o=1;o<a;o++)e=k0(e,n,r);return e},C0=function(e,r,a){for(var n=new Array(r*r),o=0;o<r*r;o++)n[o]=Math.pow(e[o],a);return ad(n,r),n},E0=function(e,r,a,n){for(var o=0;o<a;o++){var i=Math.round(e[o]*Math.pow(10,n))/Math.pow(10,n),s=Math.round(r[o]*Math.pow(10,n))/Math.pow(10,n);if(i!==s)return!1}return!0},S0=function(e,r,a,n){for(var o=[],i=0;i<r;i++){for(var s=[],l=0;l<r;l++)Math.round(e[i*r+l]*1e3)/1e3>0&&s.push(a[l]);s.length!==0&&o.push(n.collection(s))}return o},T0=function(e,r){for(var a=0;a<e.length;a++)if(!r[a]||e[a].id()!==r[a].id())return!1;return!0},D0=function(e){for(var r=0;r<e.length;r++)for(var a=0;a<e.length;a++)r!=a&&T0(e[r],e[a])&&e.splice(a,1);return e},nd=function(e){for(var r=this.nodes(),a=this.edges(),n=this.cy(),o=b0(e),i={},s=0;s<r.length;s++)i[r[s].id()]=s;for(var l=r.length,u=l*l,c=new Array(u),d,h=0;h<u;h++)c[h]=0;for(var p=0;p<a.length;p++){var g=a[p],f=i[g.source().id()],v=i[g.target().id()],m=w0(g,o.attributes);c[f*l+v]+=m,c[v*l+f]+=m}x0(c,l,o.multFactor),ad(c,l);for(var y=!0,b=0;y&&b<o.maxIterations;)y=!1,d=_0(c,l,o.expandFactor),c=C0(d,l,o.inflateFactor),E0(c,d,u,4)||(y=!0),b++;var x=S0(c,l,r,n);return x=D0(x),x},P0={markovClustering:nd,mcl:nd},A0=function(e){return e},id=function(e,r){return Math.abs(r-e)},od=function(e,r,a){return e+id(r,a)},sd=function(e,r,a){return e+Math.pow(a-r,2)},L0=function(e){return Math.sqrt(e)},I0=function(e,r,a){return Math.max(e,id(r,a))},Un=function(e,r,a,n,o){for(var i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:A0,s=n,l,u,c=0;c<e;c++)l=r(c),u=a(c),s=o(s,l,u);return i(s)},sn={euclidean:function(e,r,a){return e>=2?Un(e,r,a,0,sd,L0):Un(e,r,a,0,od)},squaredEuclidean:function(e,r,a){return Un(e,r,a,0,sd)},manhattan:function(e,r,a){return Un(e,r,a,0,od)},max:function(e,r,a){return Un(e,r,a,-1/0,I0)}};sn["squared-euclidean"]=sn.squaredEuclidean;sn.squaredeuclidean=sn.squaredEuclidean;function io(t,e,r,a,n,o){var i;return rt(t)?i=t:i=sn[t]||sn.euclidean,e===0&&rt(t)?i(n,o):i(e,r,a,n,o)}var O0=_t({k:2,m:2,sensitivityThreshold:1e-4,distance:"euclidean",maxIterations:10,attributes:[],testMode:!1,testCentroids:null}),Fs=function(e){return O0(e)},oo=function(e,r,a,n,o){var i=o!=="kMedoids",s=i?function(d){return a[d]}:function(d){return n[d](a)},l=function(h){return n[h](r)},u=a,c=r;return io(e,n.length,s,l,u,c)},Ns=function(e,r,a){for(var n=a.length,o=new Array(n),i=new Array(n),s=new Array(r),l=null,u=0;u<n;u++)o[u]=e.min(a[u]).value,i[u]=e.max(a[u]).value;for(var c=0;c<r;c++){l=[];for(var d=0;d<n;d++)l[d]=Math.random()*(i[d]-o[d])+o[d];s[c]=l}return s},ld=function(e,r,a,n,o){for(var i=1/0,s=0,l=0;l<r.length;l++){var u=oo(a,e,r[l],n,o);u<i&&(i=u,s=l)}return s},ud=function(e,r,a){for(var n=[],o=null,i=0;i<r.length;i++)o=r[i],a[o.id()]===e&&n.push(o);return n},$0=function(e,r,a){return Math.abs(r-e)<=a},B0=function(e,r,a){for(var n=0;n<e.length;n++)for(var o=0;o<e[n].length;o++){var i=Math.abs(e[n][o]-r[n][o]);if(i>a)return!1}return!0},z0=function(e,r,a){for(var n=0;n<a;n++)if(e===r[n])return!0;return!1},cd=function(e,r){var a=new Array(r);if(e.length<50)for(var n=0;n<r;n++){for(var o=e[Math.floor(Math.random()*e.length)];z0(o,a,n);)o=e[Math.floor(Math.random()*e.length)];a[n]=o}else for(var i=0;i<r;i++)a[i]=e[Math.floor(Math.random()*e.length)];return a},dd=function(e,r,a){for(var n=0,o=0;o<r.length;o++)n+=oo("manhattan",r[o],e,a,"kMedoids");return n},M0=function(e){var r=this.cy(),a=this.nodes(),n=null,o=Fs(e),i=new Array(o.k),s={},l;o.testMode?typeof o.testCentroids=="number"?l=Ns(a,o.k,o.attributes):ct(o.testCentroids)==="object"?l=o.testCentroids:l=Ns(a,o.k,o.attributes):l=Ns(a,o.k,o.attributes);for(var u=!0,c=0;u&&c<o.maxIterations;){for(var d=0;d<a.length;d++)n=a[d],s[n.id()]=ld(n,l,o.distance,o.attributes,"kMeans");u=!1;for(var h=0;h<o.k;h++){var p=ud(h,a,s);if(p.length!==0){for(var g=o.attributes.length,f=l[h],v=new Array(g),m=new Array(g),y=0;y<g;y++){m[y]=0;for(var b=0;b<p.length;b++)n=p[b],m[y]+=o.attributes[y](n);v[y]=m[y]/p.length,$0(v[y],f[y],o.sensitivityThreshold)||(u=!0)}l[h]=v,i[h]=r.collection(p)}}c++}return i},R0=function(e){var r=this.cy(),a=this.nodes(),n=null,o=Fs(e),i=new Array(o.k),s,l={},u,c=new Array(o.k);o.testMode?typeof o.testCentroids=="number"||(ct(o.testCentroids)==="object"?s=o.testCentroids:s=cd(a,o.k)):s=cd(a,o.k);for(var d=!0,h=0;d&&h<o.maxIterations;){for(var p=0;p<a.length;p++)n=a[p],l[n.id()]=ld(n,s,o.distance,o.attributes,"kMedoids");d=!1;for(var g=0;g<s.length;g++){var f=ud(g,a,l);if(f.length!==0){c[g]=dd(s[g],f,o.attributes);for(var v=0;v<f.length;v++)u=dd(f[v],f,o.attributes),u<c[g]&&(c[g]=u,s[g]=f[v],d=!0);i[g]=r.collection(f)}}h++}return i},F0=function(e,r,a,n,o){for(var i,s,l=0;l<r.length;l++)for(var u=0;u<e.length;u++)n[l][u]=Math.pow(a[l][u],o.m);for(var c=0;c<e.length;c++)for(var d=0;d<o.attributes.length;d++){i=0,s=0;for(var h=0;h<r.length;h++)i+=n[h][c]*o.attributes[d](r[h]),s+=n[h][c];e[c][d]=i/s}},N0=function(e,r,a,n,o){for(var i=0;i<e.length;i++)r[i]=e[i].slice();for(var s,l,u,c=2/(o.m-1),d=0;d<a.length;d++)for(var h=0;h<n.length;h++){s=0;for(var p=0;p<a.length;p++)l=oo(o.distance,n[h],a[d],o.attributes,"cmeans"),u=oo(o.distance,n[h],a[p],o.attributes,"cmeans"),s+=Math.pow(l/u,c);e[h][d]=1/s}},V0=function(e,r,a,n){for(var o=new Array(a.k),i=0;i<o.length;i++)o[i]=[];for(var s,l,u=0;u<r.length;u++){s=-1/0,l=-1;for(var c=0;c<r[0].length;c++)r[u][c]>s&&(s=r[u][c],l=c);o[l].push(e[u])}for(var d=0;d<o.length;d++)o[d]=n.collection(o[d]);return o},hd=function(e){var r=this.cy(),a=this.nodes(),n=Fs(e),o,i,s,l,u;l=new Array(a.length);for(var c=0;c<a.length;c++)l[c]=new Array(n.k);s=new Array(a.length);for(var d=0;d<a.length;d++)s[d]=new Array(n.k);for(var h=0;h<a.length;h++){for(var p=0,g=0;g<n.k;g++)s[h][g]=Math.random(),p+=s[h][g];for(var f=0;f<n.k;f++)s[h][f]=s[h][f]/p}i=new Array(n.k);for(var v=0;v<n.k;v++)i[v]=new Array(n.attributes.length);u=new Array(a.length);for(var m=0;m<a.length;m++)u[m]=new Array(n.k);for(var y=!0,b=0;y&&b<n.maxIterations;)y=!1,F0(i,a,s,u,n),N0(s,l,i,a,n),B0(s,l,n.sensitivityThreshold)||(y=!0),b++;return o=V0(a,s,n,r),{clusters:o,degreeOfMembership:s}},j0={kMeans:M0,kMedoids:R0,fuzzyCMeans:hd,fcm:hd},K0=_t({distance:"euclidean",linkage:"min",mode:"threshold",threshold:1/0,addDendrogram:!1,dendrogramDepth:0,attributes:[]}),H0={single:"min",complete:"max"},Q0=function(e){var r=K0(e),a=H0[r.linkage];return a!=null&&(r.linkage=a),r},fd=function(e,r,a,n,o){for(var i=0,s=1/0,l,u=o.attributes,c=function(C,D){return io(o.distance,u.length,function(L){return u[L](C)},function(L){return u[L](D)},C,D)},d=0;d<e.length;d++){var h=e[d].key,p=a[h][n[h]];p<s&&(i=h,s=p)}if(o.mode==="threshold"&&s>=o.threshold||o.mode==="dendrogram"&&e.length===1)return!1;var g=r[i],f=r[n[i]],v;o.mode==="dendrogram"?v={left:g,right:f,key:g.key}:v={value:g.value.concat(f.value),key:g.key},e[g.index]=v,e.splice(f.index,1),r[g.key]=v;for(var m=0;m<e.length;m++){var y=e[m];g.key===y.key?l=1/0:o.linkage==="min"?(l=a[g.key][y.key],a[g.key][y.key]>a[f.key][y.key]&&(l=a[f.key][y.key])):o.linkage==="max"?(l=a[g.key][y.key],a[g.key][y.key]<a[f.key][y.key]&&(l=a[f.key][y.key])):o.linkage==="mean"?l=(a[g.key][y.key]*g.size+a[f.key][y.key]*f.size)/(g.size+f.size):o.mode==="dendrogram"?l=c(y.value,g.value):l=c(y.value[0],g.value[0]),a[g.key][y.key]=a[y.key][g.key]=l}for(var b=0;b<e.length;b++){var x=e[b].key;if(n[x]===g.key||n[x]===f.key){for(var k=x,E=0;E<e.length;E++){var _=e[E].key;a[x][_]<a[x][k]&&(k=_)}n[x]=k}e[b].index=b}return g.key=f.key=g.index=f.index=null,!0},so=function t(e,r,a){!e||(e.value?r.push(e.value):(e.left&&t(e.left,r),e.right&&t(e.right,r)))},Y0=function t(e,r){if(!e)return"";if(e.left&&e.right){var a=t(e.left,r),n=t(e.right,r),o=r.add({group:"nodes",data:{id:a+","+n}});return r.add({group:"edges",data:{source:a,target:o.id()}}),r.add({group:"edges",data:{source:n,target:o.id()}}),o.id()}else if(e.value)return e.value.id()},X0=function t(e,r,a){if(!e)return[];var n=[],o=[],i=[];return r===0?(e.left&&so(e.left,n),e.right&&so(e.right,o),i=n.concat(o),[a.collection(i)]):r===1?e.value?[a.collection(e.value)]:(e.left&&so(e.left,n),e.right&&so(e.right,o),[a.collection(n),a.collection(o)]):e.value?[a.collection(e.value)]:(e.left&&(n=t(e.left,r-1,a)),e.right&&(o=t(e.right,r-1,a)),n.concat(o))},pd=function(e){for(var r=this.cy(),a=this.nodes(),n=Q0(e),o=n.attributes,i=function(b,x){return io(n.distance,o.length,function(k){return o[k](b)},function(k){return o[k](x)},b,x)},s=[],l=[],u=[],c=[],d=0;d<a.length;d++){var h={value:n.mode==="dendrogram"?a[d]:[a[d]],key:d,index:d};s[d]=h,c[d]=h,l[d]=[],u[d]=0}for(var p=0;p<s.length;p++)for(var g=0;g<=p;g++){var f=void 0;n.mode==="dendrogram"?f=p===g?1/0:i(s[p].value,s[g].value):f=p===g?1/0:i(s[p].value[0],s[g].value[0]),l[p][g]=f,l[g][p]=f,f<l[p][u[p]]&&(u[p]=g)}for(var v=fd(s,c,l,u,n);v;)v=fd(s,c,l,u,n);var m;return n.mode==="dendrogram"?(m=X0(s[0],n.dendrogramDepth,r),n.addDendrogram&&Y0(s[0],r)):(m=new Array(s.length),s.forEach(function(y,b){y.key=y.index=null,m[b]=r.collection(y.value)})),m},U0={hierarchicalClustering:pd,hca:pd},q0=_t({distance:"euclidean",preference:"median",damping:.8,maxIterations:1e3,minIterations:100,attributes:[]}),G0=function(e){var r=e.damping,a=e.preference;.5<=r&&r<1||st("Damping must range on [0.5, 1).  Got: ".concat(r));var n=["median","mean","min","max"];return n.some(function(o){return o===a})||ce(a)||st("Preference must be one of [".concat(n.map(function(o){return"'".concat(o,"'")}).join(", "),"] or a number.  Got: ").concat(a)),q0(e)},Z0=function(e,r,a,n){var o=function(s,l){return n[l](s)};return-io(e,n.length,function(i){return o(r,i)},function(i){return o(a,i)},r,a)},W0=function(e,r){var a=null;return r==="median"?a=Gm(e):r==="mean"?a=qm(e):r==="min"?a=Xm(e):r==="max"?a=Um(e):a=r,a},J0=function(e,r,a){for(var n=[],o=0;o<e;o++)r[o*e+o]+a[o*e+o]>0&&n.push(o);return n},vd=function(e,r,a){for(var n=[],o=0;o<e;o++){for(var i=-1,s=-1/0,l=0;l<a.length;l++){var u=a[l];r[o*e+u]>s&&(i=u,s=r[o*e+u])}i>0&&n.push(i)}for(var c=0;c<a.length;c++)n[a[c]]=a[c];return n},ey=function(e,r,a){for(var n=vd(e,r,a),o=0;o<a.length;o++){for(var i=[],s=0;s<n.length;s++)n[s]===a[o]&&i.push(s);for(var l=-1,u=-1/0,c=0;c<i.length;c++){for(var d=0,h=0;h<i.length;h++)d+=r[i[h]*e+i[c]];d>u&&(l=c,u=d)}a[o]=i[l]}return n=vd(e,r,a),n},gd=function(e){for(var r=this.cy(),a=this.nodes(),n=G0(e),o={},i=0;i<a.length;i++)o[a[i].id()]=i;var s,l,u,c,d,h;s=a.length,l=s*s,u=new Array(l);for(var p=0;p<l;p++)u[p]=-1/0;for(var g=0;g<s;g++)for(var f=0;f<s;f++)g!==f&&(u[g*s+f]=Z0(n.distance,a[g],a[f],n.attributes));c=W0(u,n.preference);for(var v=0;v<s;v++)u[v*s+v]=c;d=new Array(l);for(var m=0;m<l;m++)d[m]=0;h=new Array(l);for(var y=0;y<l;y++)h[y]=0;for(var b=new Array(s),x=new Array(s),k=new Array(s),E=0;E<s;E++)b[E]=0,x[E]=0,k[E]=0;for(var _=new Array(s*n.minIterations),T=0;T<_.length;T++)_[T]=0;var C;for(C=0;C<n.maxIterations;C++){for(var D=0;D<s;D++){for(var L=-1/0,A=-1/0,O=-1,I=0,N=0;N<s;N++)b[N]=d[D*s+N],I=h[D*s+N]+u[D*s+N],I>=L?(A=L,L=I,O=N):I>A&&(A=I);for(var z=0;z<s;z++)d[D*s+z]=(1-n.damping)*(u[D*s+z]-L)+n.damping*b[z];d[D*s+O]=(1-n.damping)*(u[D*s+O]-A)+n.damping*b[O]}for(var $=0;$<s;$++){for(var B=0,R=0;R<s;R++)b[R]=h[R*s+$],x[R]=Math.max(0,d[R*s+$]),B+=x[R];B-=x[$],x[$]=d[$*s+$],B+=x[$];for(var H=0;H<s;H++)h[H*s+$]=(1-n.damping)*Math.min(0,B-x[H])+n.damping*b[H];h[$*s+$]=(1-n.damping)*(B-x[$])+n.damping*b[$]}for(var M=0,j=0;j<s;j++){var W=h[j*s+j]+d[j*s+j]>0?1:0;_[C%n.minIterations*s+j]=W,M+=W}if(M>0&&(C>=n.minIterations-1||C==n.maxIterations-1)){for(var te=0,X=0;X<s;X++){k[X]=0;for(var Y=0;Y<n.minIterations;Y++)k[X]+=_[Y*s+X];(k[X]===0||k[X]===n.minIterations)&&te++}if(te===s)break}}for(var F=J0(s,d,h),Z=ey(s,u,F),se={},ie=0;ie<F.length;ie++)se[F[ie]]=[];for(var pe=0;pe<a.length;pe++){var De=o[a[pe].id()],Te=Z[De];Te!=null&&se[Te].push(a[pe])}for(var fe=new Array(F.length),de=0;de<F.length;de++)fe[de]=r.collection(se[F[de]]);return fe},ty={affinityPropagation:gd,ap:gd},ry=_t({root:void 0,directed:!1}),ay={hierholzer:function(e){if(!Oe(e)){var r=arguments;e={root:r[0],directed:r[1]}}var a=ry(e),n=a.root,o=a.directed,i=this,s=!1,l,u,c;n&&(c=we(n)?this.filter(n)[0].id():n[0].id());var d={},h={};o?i.forEach(function(y){var b=y.id();if(y.isNode()){var x=y.indegree(!0),k=y.outdegree(!0),E=x-k,_=k-x;E==1?l?s=!0:l=b:_==1?u?s=!0:u=b:(_>1||E>1)&&(s=!0),d[b]=[],y.outgoers().forEach(function(T){T.isEdge()&&d[b].push(T.id())})}else h[b]=[void 0,y.target().id()]}):i.forEach(function(y){var b=y.id();if(y.isNode()){var x=y.degree(!0);x%2&&(l?u?s=!0:u=b:l=b),d[b]=[],y.connectedEdges().forEach(function(k){return d[b].push(k.id())})}else h[b]=[y.source().id(),y.target().id()]});var p={found:!1,trail:void 0};if(s)return p;if(u&&l)if(o){if(c&&u!=c)return p;c=u}else{if(c&&u!=c&&l!=c)return p;c||(c=u)}else c||(c=i[0].id());var g=function(b){for(var x=b,k=[b],E,_,T;d[x].length;)E=d[x].shift(),_=h[E][0],T=h[E][1],x!=T?(d[T]=d[T].filter(function(C){return C!=E}),x=T):!o&&x!=_&&(d[_]=d[_].filter(function(C){return C!=E}),x=_),k.unshift(E),k.unshift(x);return k},f=[],v=[];for(v=g(c);v.length!=1;)d[v[0]].length==0?(f.unshift(i.getElementById(v.shift())),f.unshift(i.getElementById(v.shift()))):v=g(v.shift()).concat(v);f.unshift(i.getElementById(v.shift()));for(var m in d)if(d[m].length)return p;return p.found=!0,p.trail=this.spawn(f,!0),p}},lo=function(){var e=this,r={},a=0,n=0,o=[],i=[],s={},l=function(h,p){for(var g=i.length-1,f=[],v=e.spawn();i[g].x!=h||i[g].y!=p;)f.push(i.pop().edge),g--;f.push(i.pop().edge),f.forEach(function(m){var y=m.connectedNodes().intersection(e);v.merge(m),y.forEach(function(b){var x=b.id(),k=b.connectedEdges().intersection(e);v.merge(b),r[x].cutVertex?v.merge(k.filter(function(E){return E.isLoop()})):v.merge(k)})}),o.push(v)},u=function d(h,p,g){h===g&&(n+=1),r[p]={id:a,low:a++,cutVertex:!1};var f=e.getElementById(p).connectedEdges().intersection(e);if(f.size()===0)o.push(e.spawn(e.getElementById(p)));else{var v,m,y,b;f.forEach(function(x){v=x.source().id(),m=x.target().id(),y=v===p?m:v,y!==g&&(b=x.id(),s[b]||(s[b]=!0,i.push({x:p,y,edge:x})),y in r?r[p].low=Math.min(r[p].low,r[y].id):(d(h,y,p),r[p].low=Math.min(r[p].low,r[y].low),r[p].id<=r[y].low&&(r[p].cutVertex=!0,l(p,y))))})}};e.forEach(function(d){if(d.isNode()){var h=d.id();h in r||(n=0,u(h,h),r[h].cutVertex=n>1)}});var c=Object.keys(r).filter(function(d){return r[d].cutVertex}).map(function(d){return e.getElementById(d)});return{cut:e.spawn(c),components:o}},ny={hopcroftTarjanBiconnected:lo,htbc:lo,htb:lo,hopcroftTarjanBiconnectedComponents:lo},uo=function(){var e=this,r={},a=0,n=[],o=[],i=e.spawn(e),s=function l(u){o.push(u),r[u]={index:a,low:a++,explored:!1};var c=e.getElementById(u).connectedEdges().intersection(e);if(c.forEach(function(f){var v=f.target().id();v!==u&&(v in r||l(v),r[v].explored||(r[u].low=Math.min(r[u].low,r[v].low)))}),r[u].index===r[u].low){for(var d=e.spawn();;){var h=o.pop();if(d.merge(e.getElementById(h)),r[h].low=r[u].index,r[h].explored=!0,h===u)break}var p=d.edgesWith(d),g=d.merge(p);n.push(g),i=i.difference(g)}};return e.forEach(function(l){if(l.isNode()){var u=l.id();u in r||s(u)}}),{cut:i,components:n}},iy={tarjanStronglyConnected:uo,tsc:uo,tscc:uo,tarjanStronglyConnectedComponents:uo},md={};[Kn,Bm,zm,Rm,Nm,jm,Qm,g0,nn,on,Rs,P0,j0,U0,ty,ay,ny,iy].forEach(function(t){ke(md,t)});var yd=0,bd=1,wd=2,Br=function t(e){if(!(this instanceof t))return new t(e);this.id="Thenable/1.0.7",this.state=yd,this.fulfillValue=void 0,this.rejectReason=void 0,this.onFulfilled=[],this.onRejected=[],this.proxy={then:this.then.bind(this)},typeof e=="function"&&e.call(this,this.fulfill.bind(this),this.reject.bind(this))};Br.prototype={fulfill:function(e){return xd(this,bd,"fulfillValue",e)},reject:function(e){return xd(this,wd,"rejectReason",e)},then:function(e,r){var a=this,n=new Br;return a.onFulfilled.push(Cd(e,n,"fulfill")),a.onRejected.push(Cd(r,n,"reject")),kd(a),n.proxy}};var xd=function(e,r,a,n){return e.state===yd&&(e.state=r,e[a]=n,kd(e)),e},kd=function(e){e.state===bd?_d(e,"onFulfilled",e.fulfillValue):e.state===wd&&_d(e,"onRejected",e.rejectReason)},_d=function(e,r,a){if(e[r].length!==0){var n=e[r];e[r]=[];var o=function(){for(var s=0;s<n.length;s++)n[s](a)};typeof setImmediate=="function"?setImmediate(o):setTimeout(o,0)}},Cd=function(e,r,a){return function(n){if(typeof e!="function")r[a].call(r,n);else{var o;try{o=e(n)}catch(i){r.reject(i);return}oy(r,o)}}},oy=function t(e,r){if(e===r||e.proxy===r){e.reject(new TypeError("cannot resolve promise with itself"));return}var a;if(ct(r)==="object"&&r!==null||typeof r=="function")try{a=r.then}catch(o){e.reject(o);return}if(typeof a=="function"){var n=!1;try{a.call(r,function(o){n||(n=!0,o===r?e.reject(new TypeError("circular thenable chain")):t(e,o))},function(o){n||(n=!0,e.reject(o))})}catch(o){n||e.reject(o)}return}e.fulfill(r)};Br.all=function(t){return new Br(function(e,r){for(var a=new Array(t.length),n=0,o=function(l,u){a[l]=u,n++,n===t.length&&e(a)},i=0;i<t.length;i++)(function(s){var l=t[s],u=l!=null&&l.then!=null;if(u)l.then(function(d){o(s,d)},function(d){r(d)});else{var c=l;o(s,c)}})(i)})};Br.resolve=function(t){return new Br(function(e,r){e(t)})};Br.reject=function(t){return new Br(function(e,r){r(t)})};var ln=typeof Promise!="undefined"?Promise:Br,Vs=function(e,r,a){var n=Cs(e),o=!n,i=this._private=ke({duration:1e3},r,a);if(i.target=e,i.style=i.style||i.css,i.started=!1,i.playing=!1,i.hooked=!1,i.applying=!1,i.progress=0,i.completes=[],i.frames=[],i.complete&&rt(i.complete)&&i.completes.push(i.complete),o){var s=e.position();i.startPosition=i.startPosition||{x:s.x,y:s.y},i.startStyle=i.startStyle||e.cy().style().getAnimationStartStyle(e,i.style)}if(n){var l=e.pan();i.startPan={x:l.x,y:l.y},i.startZoom=e.zoom()}this.length=1,this[0]=this},Ca=Vs.prototype;ke(Ca,{instanceString:function(){return"animation"},hook:function(){var e=this._private;if(!e.hooked){var r,a=e.target._private.animation;e.queue?r=a.queue:r=a.current,r.push(this),Jt(e.target)&&e.target.cy().addToAnimationPool(e.target),e.hooked=!0}return this},play:function(){var e=this._private;return e.progress===1&&(e.progress=0),e.playing=!0,e.started=!1,e.stopped=!1,this.hook(),this},playing:function(){return this._private.playing},apply:function(){var e=this._private;return e.applying=!0,e.started=!1,e.stopped=!1,this.hook(),this},applying:function(){return this._private.applying},pause:function(){var e=this._private;return e.playing=!1,e.started=!1,this},stop:function(){var e=this._private;return e.playing=!1,e.started=!1,e.stopped=!0,this},rewind:function(){return this.progress(0)},fastforward:function(){return this.progress(1)},time:function(e){var r=this._private;return e===void 0?r.progress*r.duration:this.progress(e/r.duration)},progress:function(e){var r=this._private,a=r.playing;return e===void 0?r.progress:(a&&this.pause(),r.progress=e,r.started=!1,a&&this.play(),this)},completed:function(){return this._private.progress===1},reverse:function(){var e=this._private,r=e.playing;r&&this.pause(),e.progress=1-e.progress,e.started=!1;var a=function(u,c){var d=e[u];d!=null&&(e[u]=e[c],e[c]=d)};if(a("zoom","startZoom"),a("pan","startPan"),a("position","startPosition"),e.style)for(var n=0;n<e.style.length;n++){var o=e.style[n],i=o.name,s=e.startStyle[i];e.startStyle[i]=o,e.style[n]=s}return r&&this.play(),this},promise:function(e){var r=this._private,a;switch(e){case"frame":a=r.frames;break;default:case"complete":case"completed":a=r.completes}return new ln(function(n,o){a.push(function(){n()})})}});Ca.complete=Ca.completed;Ca.run=Ca.play;Ca.running=Ca.playing;var sy={animated:function(){return function(){var r=this,a=r.length!==void 0,n=a?r:[r],o=this._private.cy||this;if(!o.styleEnabled())return!1;var i=n[0];if(i)return i._private.animation.current.length>0}},clearQueue:function(){return function(){var r=this,a=r.length!==void 0,n=a?r:[r],o=this._private.cy||this;if(!o.styleEnabled())return this;for(var i=0;i<n.length;i++){var s=n[i];s._private.animation.queue=[]}return this}},delay:function(){return function(r,a){var n=this._private.cy||this;return n.styleEnabled()?this.animate({delay:r,duration:r,complete:a}):this}},delayAnimation:function(){return function(r,a){var n=this._private.cy||this;return n.styleEnabled()?this.animation({delay:r,duration:r,complete:a}):this}},animation:function(){return function(r,a){var n=this,o=n.length!==void 0,i=o?n:[n],s=this._private.cy||this,l=!o,u=!l;if(!s.styleEnabled())return this;var c=s.style();r=ke({},r,a);var d=Object.keys(r).length===0;if(d)return new Vs(i[0],r);switch(r.duration===void 0&&(r.duration=400),r.duration){case"slow":r.duration=600;break;case"fast":r.duration=200;break}if(u&&(r.style=c.getPropsList(r.style||r.css),r.css=void 0),u&&r.renderedPosition!=null){var h=r.renderedPosition,p=s.pan(),g=s.zoom();r.position=Yc(h,g,p)}if(l&&r.panBy!=null){var f=r.panBy,v=s.pan();r.pan={x:v.x+f.x,y:v.y+f.y}}var m=r.center||r.centre;if(l&&m!=null){var y=s.getCenterPan(m.eles,r.zoom);y!=null&&(r.pan=y)}if(l&&r.fit!=null){var b=r.fit,x=s.getFitViewport(b.eles||b.boundingBox,b.padding);x!=null&&(r.pan=x.pan,r.zoom=x.zoom)}if(l&&Oe(r.zoom)){var k=s.getZoomedViewport(r.zoom);k!=null?(k.zoomed&&(r.zoom=k.zoom),k.panned&&(r.pan=k.pan)):r.zoom=null}return new Vs(i[0],r)}},animate:function(){return function(r,a){var n=this,o=n.length!==void 0,i=o?n:[n],s=this._private.cy||this;if(!s.styleEnabled())return this;a&&(r=ke({},r,a));for(var l=0;l<i.length;l++){var u=i[l],c=u.animated()&&(r.queue===void 0||r.queue),d=u.animation(r,c?{queue:!0}:void 0);d.play()}return this}},stop:function(){return function(r,a){var n=this,o=n.length!==void 0,i=o?n:[n],s=this._private.cy||this;if(!s.styleEnabled())return this;for(var l=0;l<i.length;l++){for(var u=i[l],c=u._private,d=c.animation.current,h=0;h<d.length;h++){var p=d[h],g=p._private;a&&(g.duration=0)}r&&(c.animation.queue=[]),a||(c.animation.current=[])}return s.notify("draw"),this}}},ly={data:function(e){var r={field:"data",bindingEvent:"data",allowBinding:!1,allowSetting:!1,allowGetting:!1,settingEvent:"data",settingTriggersEvent:!1,triggerFnName:"trigger",immutableKeys:{},updateStyle:!1,beforeGet:function(n){},beforeSet:function(n,o){},onSet:function(n){},canSet:function(n){return!0}};return e=ke({},r,e),function(n,o){var i=e,s=this,l=s.length!==void 0,u=l?s:[s],c=l?s[0]:s;if(we(n)){if(i.allowGetting&&o===void 0){var d;return c&&(i.beforeGet(c),d=c._private[i.field][n]),d}else if(i.allowSetting&&o!==void 0){var h=!i.immutableKeys[n];if(h){var p=Ec({},n,o);i.beforeSet(s,p);for(var g=0,f=u.length;g<f;g++){var v=u[g];i.canSet(v)&&(v._private[i.field][n]=o)}i.updateStyle&&s.updateStyle(),i.onSet(s),i.settingTriggersEvent&&s[i.triggerFnName](i.settingEvent)}}}else if(i.allowSetting&&Oe(n)){var m=n,y,b,x=Object.keys(m);i.beforeSet(s,m);for(var k=0;k<x.length;k++){y=x[k],b=m[y];var E=!i.immutableKeys[y];if(E)for(var _=0;_<u.length;_++){var T=u[_];i.canSet(T)&&(T._private[i.field][y]=b)}}i.updateStyle&&s.updateStyle(),i.onSet(s),i.settingTriggersEvent&&s[i.triggerFnName](i.settingEvent)}else if(i.allowBinding&&rt(n)){var C=n;s.on(i.bindingEvent,C)}else if(i.allowGetting&&n===void 0){var D;return c&&(i.beforeGet(c),D=c._private[i.field]),D}return s}},removeData:function(e){var r={field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!1,immutableKeys:{}};return e=ke({},r,e),function(n){var o=e,i=this,s=i.length!==void 0,l=s?i:[i];if(we(n)){for(var u=n.split(/\s+/),c=u.length,d=0;d<c;d++){var h=u[d];if(!Zr(h)){var p=!o.immutableKeys[h];if(p)for(var g=0,f=l.length;g<f;g++)l[g]._private[o.field][h]=void 0}}o.triggerEvent&&i[o.triggerFnName](o.event)}else if(n===void 0){for(var v=0,m=l.length;v<m;v++)for(var y=l[v]._private[o.field],b=Object.keys(y),x=0;x<b.length;x++){var k=b[x],E=!o.immutableKeys[k];E&&(y[k]=void 0)}o.triggerEvent&&i[o.triggerFnName](o.event)}return i}}},uy={eventAliasesOn:function(e){var r=e;r.addListener=r.listen=r.bind=r.on,r.unlisten=r.unbind=r.off=r.removeListener,r.trigger=r.emit,r.pon=r.promiseOn=function(a,n){var o=this,i=Array.prototype.slice.call(arguments,0);return new ln(function(s,l){var u=function(p){o.off.apply(o,d),s(p)},c=i.concat([u]),d=c.concat([]);o.on.apply(o,c)})}}},Ve={};[sy,ly,uy].forEach(function(t){ke(Ve,t)});var cy={animate:Ve.animate(),animation:Ve.animation(),animated:Ve.animated(),clearQueue:Ve.clearQueue(),delay:Ve.delay(),delayAnimation:Ve.delayAnimation(),stop:Ve.stop()},co={classes:function(e){var r=this;if(e===void 0){var a=[];return r[0]._private.classes.forEach(function(g){return a.push(g)}),a}else Qe(e)||(e=(e||"").match(/\S+/g)||[]);for(var n=[],o=new en(e),i=0;i<r.length;i++){for(var s=r[i],l=s._private,u=l.classes,c=!1,d=0;d<e.length;d++){var h=e[d],p=u.has(h);if(!p){c=!0;break}}c||(c=u.size!==e.length),c&&(l.classes=o,n.push(s))}return n.length>0&&this.spawn(n).updateStyle().emit("class"),r},addClass:function(e){return this.toggleClass(e,!0)},hasClass:function(e){var r=this[0];return r!=null&&r._private.classes.has(e)},toggleClass:function(e,r){Qe(e)||(e=e.match(/\S+/g)||[]);for(var a=this,n=r===void 0,o=[],i=0,s=a.length;i<s;i++)for(var l=a[i],u=l._private.classes,c=!1,d=0;d<e.length;d++){var h=e[d],p=u.has(h),g=!1;r||n&&!p?(u.add(h),g=!0):(!r||n&&p)&&(u.delete(h),g=!0),!c&&g&&(o.push(l),c=!0)}return o.length>0&&this.spawn(o).updateStyle().emit("class"),a},removeClass:function(e){return this.toggleClass(e,!1)},flashClass:function(e,r){var a=this;if(r==null)r=250;else if(r===0)return a;return a.addClass(e),setTimeout(function(){a.removeClass(e)},r),a}};co.className=co.classNames=co.classes;var $e={metaChar:"[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",comparatorOp:"=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",boolOp:"\\?|\\!|\\^",string:`"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`,number:dt,meta:"degree|indegree|outdegree",separator:"\\s*,\\s*",descendant:"\\s+",child:"\\s+>\\s+",subject:"\\$",group:"node|edge|\\*",directedEdge:"\\s+->\\s+",undirectedEdge:"\\s+<->\\s+"};$e.variable="(?:[\\w-]|(?:\\\\"+$e.metaChar+"))+";$e.value=$e.string+"|"+$e.number;$e.className=$e.variable;$e.id=$e.variable;(function(){var t,e,r;for(t=$e.comparatorOp.split("|"),r=0;r<t.length;r++)e=t[r],$e.comparatorOp+="|@"+e;for(t=$e.comparatorOp.split("|"),r=0;r<t.length;r++)e=t[r],!(e.indexOf("!")>=0)&&e!=="="&&($e.comparatorOp+="|\\!"+e)})();var He=function(){return{checks:[]}},ve={GROUP:0,COLLECTION:1,FILTER:2,DATA_COMPARE:3,DATA_EXIST:4,DATA_BOOL:5,META_COMPARE:6,STATE:7,ID:8,CLASS:9,UNDIRECTED_EDGE:10,DIRECTED_EDGE:11,NODE_SOURCE:12,NODE_TARGET:13,NODE_NEIGHBOR:14,CHILD:15,DESCENDANT:16,PARENT:17,ANCESTOR:18,COMPOUND_SPLIT:19,TRUE:20},js=[{selector:":selected",matches:function(e){return e.selected()}},{selector:":unselected",matches:function(e){return!e.selected()}},{selector:":selectable",matches:function(e){return e.selectable()}},{selector:":unselectable",matches:function(e){return!e.selectable()}},{selector:":locked",matches:function(e){return e.locked()}},{selector:":unlocked",matches:function(e){return!e.locked()}},{selector:":visible",matches:function(e){return e.visible()}},{selector:":hidden",matches:function(e){return!e.visible()}},{selector:":transparent",matches:function(e){return e.transparent()}},{selector:":grabbed",matches:function(e){return e.grabbed()}},{selector:":free",matches:function(e){return!e.grabbed()}},{selector:":removed",matches:function(e){return e.removed()}},{selector:":inside",matches:function(e){return!e.removed()}},{selector:":grabbable",matches:function(e){return e.grabbable()}},{selector:":ungrabbable",matches:function(e){return!e.grabbable()}},{selector:":animated",matches:function(e){return e.animated()}},{selector:":unanimated",matches:function(e){return!e.animated()}},{selector:":parent",matches:function(e){return e.isParent()}},{selector:":childless",matches:function(e){return e.isChildless()}},{selector:":child",matches:function(e){return e.isChild()}},{selector:":orphan",matches:function(e){return e.isOrphan()}},{selector:":nonorphan",matches:function(e){return e.isChild()}},{selector:":compound",matches:function(e){return e.isNode()?e.isParent():e.source().isParent()||e.target().isParent()}},{selector:":loop",matches:function(e){return e.isLoop()}},{selector:":simple",matches:function(e){return e.isSimple()}},{selector:":active",matches:function(e){return e.active()}},{selector:":inactive",matches:function(e){return!e.active()}},{selector:":backgrounding",matches:function(e){return e.backgrounding()}},{selector:":nonbackgrounding",matches:function(e){return!e.backgrounding()}}].sort(function(t,e){return pm(t.selector,e.selector)}),dy=function(){for(var t={},e,r=0;r<js.length;r++)e=js[r],t[e.selector]=e.matches;return t}(),hy=function(e,r){return dy[e](r)},fy="("+js.map(function(t){return t.selector}).join("|")+")",un=function(e){return e.replace(new RegExp("\\\\("+$e.metaChar+")","g"),function(r,a){return a})},ra=function(e,r,a){e[e.length-1]=a},Ks=[{name:"group",query:!0,regex:"("+$e.group+")",populate:function(e,r,a){var n=Ir(a,1),o=n[0];r.checks.push({type:ve.GROUP,value:o==="*"?o:o+"s"})}},{name:"state",query:!0,regex:fy,populate:function(e,r,a){var n=Ir(a,1),o=n[0];r.checks.push({type:ve.STATE,value:o})}},{name:"id",query:!0,regex:"\\#("+$e.id+")",populate:function(e,r,a){var n=Ir(a,1),o=n[0];r.checks.push({type:ve.ID,value:un(o)})}},{name:"className",query:!0,regex:"\\.("+$e.className+")",populate:function(e,r,a){var n=Ir(a,1),o=n[0];r.checks.push({type:ve.CLASS,value:un(o)})}},{name:"dataExists",query:!0,regex:"\\[\\s*("+$e.variable+")\\s*\\]",populate:function(e,r,a){var n=Ir(a,1),o=n[0];r.checks.push({type:ve.DATA_EXIST,field:un(o)})}},{name:"dataCompare",query:!0,regex:"\\[\\s*("+$e.variable+")\\s*("+$e.comparatorOp+")\\s*("+$e.value+")\\s*\\]",populate:function(e,r,a){var n=Ir(a,3),o=n[0],i=n[1],s=n[2],l=new RegExp("^"+$e.string+"$").exec(s)!=null;l?s=s.substring(1,s.length-1):s=parseFloat(s),r.checks.push({type:ve.DATA_COMPARE,field:un(o),operator:i,value:s})}},{name:"dataBool",query:!0,regex:"\\[\\s*("+$e.boolOp+")\\s*("+$e.variable+")\\s*\\]",populate:function(e,r,a){var n=Ir(a,2),o=n[0],i=n[1];r.checks.push({type:ve.DATA_BOOL,field:un(i),operator:o})}},{name:"metaCompare",query:!0,regex:"\\[\\[\\s*("+$e.meta+")\\s*("+$e.comparatorOp+")\\s*("+$e.number+")\\s*\\]\\]",populate:function(e,r,a){var n=Ir(a,3),o=n[0],i=n[1],s=n[2];r.checks.push({type:ve.META_COMPARE,field:un(o),operator:i,value:parseFloat(s)})}},{name:"nextQuery",separator:!0,regex:$e.separator,populate:function(e,r){var a=e.currentSubject,n=e.edgeCount,o=e.compoundCount,i=e[e.length-1];a!=null&&(i.subject=a,e.currentSubject=null),i.edgeCount=n,i.compoundCount=o,e.edgeCount=0,e.compoundCount=0;var s=e[e.length++]=He();return s}},{name:"directedEdge",separator:!0,regex:$e.directedEdge,populate:function(e,r){if(e.currentSubject==null){var a=He(),n=r,o=He();return a.checks.push({type:ve.DIRECTED_EDGE,source:n,target:o}),ra(e,r,a),e.edgeCount++,o}else{var i=He(),s=r,l=He();return i.checks.push({type:ve.NODE_SOURCE,source:s,target:l}),ra(e,r,i),e.edgeCount++,l}}},{name:"undirectedEdge",separator:!0,regex:$e.undirectedEdge,populate:function(e,r){if(e.currentSubject==null){var a=He(),n=r,o=He();return a.checks.push({type:ve.UNDIRECTED_EDGE,nodes:[n,o]}),ra(e,r,a),e.edgeCount++,o}else{var i=He(),s=r,l=He();return i.checks.push({type:ve.NODE_NEIGHBOR,node:s,neighbor:l}),ra(e,r,i),l}}},{name:"child",separator:!0,regex:$e.child,populate:function(e,r){if(e.currentSubject==null){var a=He(),n=He(),o=e[e.length-1];return a.checks.push({type:ve.CHILD,parent:o,child:n}),ra(e,r,a),e.compoundCount++,n}else if(e.currentSubject===r){var i=He(),s=e[e.length-1],l=He(),u=He(),c=He(),d=He();return i.checks.push({type:ve.COMPOUND_SPLIT,left:s,right:l,subject:u}),u.checks=r.checks,r.checks=[{type:ve.TRUE}],d.checks.push({type:ve.TRUE}),l.checks.push({type:ve.PARENT,parent:d,child:c}),ra(e,s,i),e.currentSubject=u,e.compoundCount++,c}else{var h=He(),p=He(),g=[{type:ve.PARENT,parent:h,child:p}];return h.checks=r.checks,r.checks=g,e.compoundCount++,p}}},{name:"descendant",separator:!0,regex:$e.descendant,populate:function(e,r){if(e.currentSubject==null){var a=He(),n=He(),o=e[e.length-1];return a.checks.push({type:ve.DESCENDANT,ancestor:o,descendant:n}),ra(e,r,a),e.compoundCount++,n}else if(e.currentSubject===r){var i=He(),s=e[e.length-1],l=He(),u=He(),c=He(),d=He();return i.checks.push({type:ve.COMPOUND_SPLIT,left:s,right:l,subject:u}),u.checks=r.checks,r.checks=[{type:ve.TRUE}],d.checks.push({type:ve.TRUE}),l.checks.push({type:ve.ANCESTOR,ancestor:d,descendant:c}),ra(e,s,i),e.currentSubject=u,e.compoundCount++,c}else{var h=He(),p=He(),g=[{type:ve.ANCESTOR,ancestor:h,descendant:p}];return h.checks=r.checks,r.checks=g,e.compoundCount++,p}}},{name:"subject",modifier:!0,regex:$e.subject,populate:function(e,r){if(e.currentSubject!=null&&e.currentSubject!==r)return Ke("Redefinition of subject in selector `"+e.toString()+"`"),!1;e.currentSubject=r;var a=e[e.length-1],n=a.checks[0],o=n==null?null:n.type;o===ve.DIRECTED_EDGE?n.type=ve.NODE_TARGET:o===ve.UNDIRECTED_EDGE&&(n.type=ve.NODE_NEIGHBOR,n.node=n.nodes[1],n.neighbor=n.nodes[0],n.nodes=null)}}];Ks.forEach(function(t){return t.regexObj=new RegExp("^"+t.regex)});var py=function(e){for(var r,a,n,o=0;o<Ks.length;o++){var i=Ks[o],s=i.name,l=e.match(i.regexObj);if(l!=null){a=l,r=i,n=s;var u=l[0];e=e.substring(u.length);break}}return{expr:r,match:a,name:n,remaining:e}},vy=function(e){var r=e.match(/^\s+/);if(r){var a=r[0];e=e.substring(a.length)}return e},gy=function(e){var r=this,a=r.inputText=e,n=r[0]=He();for(r.length=1,a=vy(a);;){var o=py(a);if(o.expr==null)return Ke("The selector `"+e+"`is invalid"),!1;var i=o.match.slice(1),s=o.expr.populate(r,n,i);if(s===!1)return!1;if(s!=null&&(n=s),a=o.remaining,a.match(/^\s*$/))break}var l=r[r.length-1];r.currentSubject!=null&&(l.subject=r.currentSubject),l.edgeCount=r.edgeCount,l.compoundCount=r.compoundCount;for(var u=0;u<r.length;u++){var c=r[u];if(c.compoundCount>0&&c.edgeCount>0)return Ke("The selector `"+e+"` is invalid because it uses both a compound selector and an edge selector"),!1;if(c.edgeCount>1)return Ke("The selector `"+e+"` is invalid because it uses multiple edge selectors"),!1;c.edgeCount===1&&Ke("The selector `"+e+"` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.")}return!0},my=function(){if(this.toStringCache!=null)return this.toStringCache;for(var e=function(c){return c??""},r=function(c){return we(c)?'"'+c+'"':e(c)},a=function(c){return" "+c+" "},n=function(c,d){var h=c.type,p=c.value;switch(h){case ve.GROUP:{var g=e(p);return g.substring(0,g.length-1)}case ve.DATA_COMPARE:{var f=c.field,v=c.operator;return"["+f+a(e(v))+r(p)+"]"}case ve.DATA_BOOL:{var m=c.operator,y=c.field;return"["+e(m)+y+"]"}case ve.DATA_EXIST:{var b=c.field;return"["+b+"]"}case ve.META_COMPARE:{var x=c.operator,k=c.field;return"[["+k+a(e(x))+r(p)+"]]"}case ve.STATE:return p;case ve.ID:return"#"+p;case ve.CLASS:return"."+p;case ve.PARENT:case ve.CHILD:return o(c.parent,d)+a(">")+o(c.child,d);case ve.ANCESTOR:case ve.DESCENDANT:return o(c.ancestor,d)+" "+o(c.descendant,d);case ve.COMPOUND_SPLIT:{var E=o(c.left,d),_=o(c.subject,d),T=o(c.right,d);return E+(E.length>0?" ":"")+_+T}case ve.TRUE:return""}},o=function(c,d){return c.checks.reduce(function(h,p,g){return h+(d===c&&g===0?"$":"")+n(p,d)},"")},i="",s=0;s<this.length;s++){var l=this[s];i+=o(l,l.subject),this.length>1&&s<this.length-1&&(i+=", ")}return this.toStringCache=i,i},yy={parse:gy,toString:my},Ed=function(e,r,a){var n,o=we(e),i=ce(e),s=we(a),l,u,c=!1,d=!1,h=!1;switch(r.indexOf("!")>=0&&(r=r.replace("!",""),d=!0),r.indexOf("@")>=0&&(r=r.replace("@",""),c=!0),(o||s||c)&&(l=!o&&!i?"":""+e,u=""+a),c&&(e=l=l.toLowerCase(),a=u=u.toLowerCase()),r){case"*=":n=l.indexOf(u)>=0;break;case"$=":n=l.indexOf(u,l.length-u.length)>=0;break;case"^=":n=l.indexOf(u)===0;break;case"=":n=e===a;break;case">":h=!0,n=e>a;break;case">=":h=!0,n=e>=a;break;case"<":h=!0,n=e<a;break;case"<=":h=!0,n=e<=a;break;default:n=!1;break}return d&&(e!=null||!h)&&(n=!n),n},by=function(e,r){switch(r){case"?":return!!e;case"!":return!e;case"^":return e===void 0}},wy=function(e){return e!==void 0},Hs=function(e,r){return e.data(r)},xy=function(e,r){return e[r]()},nt=[],Ze=function(e,r){return e.checks.every(function(a){return nt[a.type](a,r)})};nt[ve.GROUP]=function(t,e){var r=t.value;return r==="*"||r===e.group()};nt[ve.STATE]=function(t,e){var r=t.value;return hy(r,e)};nt[ve.ID]=function(t,e){var r=t.value;return e.id()===r};nt[ve.CLASS]=function(t,e){var r=t.value;return e.hasClass(r)};nt[ve.META_COMPARE]=function(t,e){var r=t.field,a=t.operator,n=t.value;return Ed(xy(e,r),a,n)};nt[ve.DATA_COMPARE]=function(t,e){var r=t.field,a=t.operator,n=t.value;return Ed(Hs(e,r),a,n)};nt[ve.DATA_BOOL]=function(t,e){var r=t.field,a=t.operator;return by(Hs(e,r),a)};nt[ve.DATA_EXIST]=function(t,e){var r=t.field,a=t.operator;return wy(Hs(e,r))};nt[ve.UNDIRECTED_EDGE]=function(t,e){var r=t.nodes[0],a=t.nodes[1],n=e.source(),o=e.target();return Ze(r,n)&&Ze(a,o)||Ze(a,n)&&Ze(r,o)};nt[ve.NODE_NEIGHBOR]=function(t,e){return Ze(t.node,e)&&e.neighborhood().some(function(r){return r.isNode()&&Ze(t.neighbor,r)})};nt[ve.DIRECTED_EDGE]=function(t,e){return Ze(t.source,e.source())&&Ze(t.target,e.target())};nt[ve.NODE_SOURCE]=function(t,e){return Ze(t.source,e)&&e.outgoers().some(function(r){return r.isNode()&&Ze(t.target,r)})};nt[ve.NODE_TARGET]=function(t,e){return Ze(t.target,e)&&e.incomers().some(function(r){return r.isNode()&&Ze(t.source,r)})};nt[ve.CHILD]=function(t,e){return Ze(t.child,e)&&Ze(t.parent,e.parent())};nt[ve.PARENT]=function(t,e){return Ze(t.parent,e)&&e.children().some(function(r){return Ze(t.child,r)})};nt[ve.DESCENDANT]=function(t,e){return Ze(t.descendant,e)&&e.ancestors().some(function(r){return Ze(t.ancestor,r)})};nt[ve.ANCESTOR]=function(t,e){return Ze(t.ancestor,e)&&e.descendants().some(function(r){return Ze(t.descendant,r)})};nt[ve.COMPOUND_SPLIT]=function(t,e){return Ze(t.subject,e)&&Ze(t.left,e)&&Ze(t.right,e)};nt[ve.TRUE]=function(){return!0};nt[ve.COLLECTION]=function(t,e){var r=t.value;return r.has(e)};nt[ve.FILTER]=function(t,e){var r=t.value;return r(e)};var ky=function(e){var r=this;if(r.length===1&&r[0].checks.length===1&&r[0].checks[0].type===ve.ID)return e.getElementById(r[0].checks[0].value).collection();var a=function(o){for(var i=0;i<r.length;i++){var s=r[i];if(Ze(s,o))return!0}return!1};return r.text()==null&&(a=function(){return!0}),e.filter(a)},_y=function(e){for(var r=this,a=0;a<r.length;a++){var n=r[a];if(Ze(n,e))return!0}return!1},Cy={matches:_y,filter:ky},aa=function(e){this.inputText=e,this.currentSubject=null,this.compoundCount=0,this.edgeCount=0,this.length=0,e==null||we(e)&&e.match(/^\s*$/)||(Jt(e)?this.addQuery({checks:[{type:ve.COLLECTION,value:e.collection()}]}):rt(e)?this.addQuery({checks:[{type:ve.FILTER,value:e}]}):we(e)?this.parse(e)||(this.invalid=!0):st("A selector must be created from a string; found "))},na=aa.prototype;[yy,Cy].forEach(function(t){return ke(na,t)});na.text=function(){return this.inputText};na.size=function(){return this.length};na.eq=function(t){return this[t]};na.sameText=function(t){return!this.invalid&&!t.invalid&&this.text()===t.text()};na.addQuery=function(t){this[this.length++]=t};na.selector=na.toString;var ia={allAre:function(e){var r=new aa(e);return this.every(function(a){return r.matches(a)})},is:function(e){var r=new aa(e);return this.some(function(a){return r.matches(a)})},some:function(e,r){for(var a=0;a<this.length;a++){var n=r?e.apply(r,[this[a],a,this]):e(this[a],a,this);if(n)return!0}return!1},every:function(e,r){for(var a=0;a<this.length;a++){var n=r?e.apply(r,[this[a],a,this]):e(this[a],a,this);if(!n)return!1}return!0},same:function(e){if(this===e)return!0;e=this.cy().collection(e);var r=this.length,a=e.length;return r!==a?!1:r===1?this[0]===e[0]:this.every(function(n){return e.hasElementWithId(n.id())})},anySame:function(e){return e=this.cy().collection(e),this.some(function(r){return e.hasElementWithId(r.id())})},allAreNeighbors:function(e){e=this.cy().collection(e);var r=this.neighborhood();return e.every(function(a){return r.hasElementWithId(a.id())})},contains:function(e){e=this.cy().collection(e);var r=this;return e.every(function(a){return r.hasElementWithId(a.id())})}};ia.allAreNeighbours=ia.allAreNeighbors;ia.has=ia.contains;ia.equal=ia.equals=ia.same;var nr=function(e,r){return function(n,o,i,s){var l=n,u=this,c;if(l==null?c="":Jt(l)&&l.length===1&&(c=l.id()),u.length===1&&c){var d=u[0]._private,h=d.traversalCache=d.traversalCache||{},p=h[r]=h[r]||[],g=wa(c),f=p[g];return f||(p[g]=e.call(u,n,o,i,s))}else return e.call(u,n,o,i,s)}},cn={parent:function(e){var r=[];if(this.length===1){var a=this[0]._private.parent;if(a)return a}for(var n=0;n<this.length;n++){var o=this[n],i=o._private.parent;i&&r.push(i)}return this.spawn(r,!0).filter(e)},parents:function(e){for(var r=[],a=this.parent();a.nonempty();){for(var n=0;n<a.length;n++){var o=a[n];r.push(o)}a=a.parent()}return this.spawn(r,!0).filter(e)},commonAncestors:function(e){for(var r,a=0;a<this.length;a++){var n=this[a],o=n.parents();r=r||o,r=r.intersect(o)}return r.filter(e)},orphans:function(e){return this.stdFilter(function(r){return r.isOrphan()}).filter(e)},nonorphans:function(e){return this.stdFilter(function(r){return r.isChild()}).filter(e)},children:nr(function(t){for(var e=[],r=0;r<this.length;r++)for(var a=this[r],n=a._private.children,o=0;o<n.length;o++)e.push(n[o]);return this.spawn(e,!0).filter(t)},"children"),siblings:function(e){return this.parent().children().not(this).filter(e)},isParent:function(){var e=this[0];if(e)return e.isNode()&&e._private.children.length!==0},isChildless:function(){var e=this[0];if(e)return e.isNode()&&e._private.children.length===0},isChild:function(){var e=this[0];if(e)return e.isNode()&&e._private.parent!=null},isOrphan:function(){var e=this[0];if(e)return e.isNode()&&e._private.parent==null},descendants:function(e){var r=[];function a(n){for(var o=0;o<n.length;o++){var i=n[o];r.push(i),i.children().nonempty()&&a(i.children())}}return a(this.children()),this.spawn(r,!0).filter(e)}};function Qs(t,e,r,a){for(var n=[],o=new en,i=t.cy(),s=i.hasCompoundNodes(),l=0;l<t.length;l++){var u=t[l];r?n.push(u):s&&a(n,o,u)}for(;n.length>0;){var c=n.shift();e(c),o.add(c.id()),s&&a(n,o,c)}return t}function Sd(t,e,r){if(r.isParent())for(var a=r._private.children,n=0;n<a.length;n++){var o=a[n];e.has(o.id())||t.push(o)}}cn.forEachDown=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Qs(this,t,e,Sd)};function Td(t,e,r){if(r.isChild()){var a=r._private.parent;e.has(a.id())||t.push(a)}}cn.forEachUp=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Qs(this,t,e,Td)};function Ey(t,e,r){Td(t,e,r),Sd(t,e,r)}cn.forEachUpAndDown=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Qs(this,t,e,Ey)};cn.ancestors=cn.parents;var qn,Dd;qn=Dd={data:Ve.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),removeData:Ve.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),scratch:Ve.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:Ve.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),rscratch:Ve.data({field:"rscratch",allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!0}),removeRscratch:Ve.removeData({field:"rscratch",triggerEvent:!1}),id:function(){var e=this[0];if(e)return e._private.data.id}};qn.attr=qn.data;qn.removeAttr=qn.removeData;var Sy=Dd,ho={};function Ys(t){return function(e){var r=this;if(e===void 0&&(e=!0),r.length!==0)if(r.isNode()&&!r.removed()){for(var a=0,n=r[0],o=n._private.edges,i=0;i<o.length;i++){var s=o[i];!e&&s.isLoop()||(a+=t(n,s))}return a}else return}}ke(ho,{degree:Ys(function(t,e){return e.source().same(e.target())?2:1}),indegree:Ys(function(t,e){return e.target().same(t)?1:0}),outdegree:Ys(function(t,e){return e.source().same(t)?1:0})});function dn(t,e){return function(r){for(var a,n=this.nodes(),o=0;o<n.length;o++){var i=n[o],s=i[t](r);s!==void 0&&(a===void 0||e(s,a))&&(a=s)}return a}}ke(ho,{minDegree:dn("degree",function(t,e){return t<e}),maxDegree:dn("degree",function(t,e){return t>e}),minIndegree:dn("indegree",function(t,e){return t<e}),maxIndegree:dn("indegree",function(t,e){return t>e}),minOutdegree:dn("outdegree",function(t,e){return t<e}),maxOutdegree:dn("outdegree",function(t,e){return t>e})});ke(ho,{totalDegree:function(e){for(var r=0,a=this.nodes(),n=0;n<a.length;n++)r+=a[n].degree(e);return r}});var vr,Pd,Ad=function(e,r,a){for(var n=0;n<e.length;n++){var o=e[n];if(!o.locked()){var i=o._private.position,s={x:r.x!=null?r.x-i.x:0,y:r.y!=null?r.y-i.y:0};o.isParent()&&!(s.x===0&&s.y===0)&&o.children().shift(s,a),o.dirtyBoundingBoxCache()}}},Ld={field:"position",bindingEvent:"position",allowBinding:!0,allowSetting:!0,settingEvent:"position",settingTriggersEvent:!0,triggerFnName:"emitAndNotify",allowGetting:!0,validKeys:["x","y"],beforeGet:function(e){e.updateCompoundBounds()},beforeSet:function(e,r){Ad(e,r,!1)},onSet:function(e){e.dirtyCompoundBoundsCache()},canSet:function(e){return!e.locked()}};vr=Pd={position:Ve.data(Ld),silentPosition:Ve.data(ke({},Ld,{allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!1,beforeSet:function(e,r){Ad(e,r,!0)},onSet:function(e){e.dirtyCompoundBoundsCache()}})),positions:function(e,r){if(Oe(e))r?this.silentPosition(e):this.position(e);else if(rt(e)){var a=e,n=this.cy();n.startBatch();for(var o=0;o<this.length;o++){var i=this[o],s=void 0;(s=a(i,o))&&(r?i.silentPosition(s):i.position(s))}n.endBatch()}return this},silentPositions:function(e){return this.positions(e,!0)},shift:function(e,r,a){var n;if(Oe(e)?(n={x:ce(e.x)?e.x:0,y:ce(e.y)?e.y:0},a=r):we(e)&&ce(r)&&(n={x:0,y:0},n[e]=r),n!=null){var o=this.cy();o.startBatch();for(var i=0;i<this.length;i++){var s=this[i],l=s.position(),u={x:l.x+n.x,y:l.y+n.y};a?s.silentPosition(u):s.position(u)}o.endBatch()}return this},silentShift:function(e,r){return Oe(e)?this.shift(e,!0):we(e)&&ce(r)&&this.shift(e,r,!0),this},renderedPosition:function(e,r){var a=this[0],n=this.cy(),o=n.zoom(),i=n.pan(),s=Oe(e)?e:void 0,l=s!==void 0||r!==void 0&&we(e);if(a&&a.isNode())if(l)for(var u=0;u<this.length;u++){var c=this[u];r!==void 0?c.position(e,(r-i[e])/o):s!==void 0&&c.position(Yc(s,o,i))}else{var d=a.position();return s=to(d,o,i),e===void 0?s:s[e]}else if(!l)return;return this},relativePosition:function(e,r){var a=this[0],n=this.cy(),o=Oe(e)?e:void 0,i=o!==void 0||r!==void 0&&we(e),s=n.hasCompoundNodes();if(a&&a.isNode())if(i)for(var l=0;l<this.length;l++){var u=this[l],c=s?u.parent():null,d=c&&c.length>0,h=d;d&&(c=c[0]);var p=h?c.position():{x:0,y:0};r!==void 0?u.position(e,r+p[e]):o!==void 0&&u.position({x:o.x+p.x,y:o.y+p.y})}else{var g=a.position(),f=s?a.parent():null,v=f&&f.length>0,m=v;v&&(f=f[0]);var y=m?f.position():{x:0,y:0};return o={x:g.x-y.x,y:g.y-y.y},e===void 0?o:o[e]}else if(!i)return;return this}};vr.modelPosition=vr.point=vr.position;vr.modelPositions=vr.points=vr.positions;vr.renderedPoint=vr.renderedPosition;vr.relativePoint=vr.relativePosition;var Ty=Pd,hn,oa;hn=oa={};oa.renderedBoundingBox=function(t){var e=this.boundingBox(t),r=this.cy(),a=r.zoom(),n=r.pan(),o=e.x1*a+n.x,i=e.x2*a+n.x,s=e.y1*a+n.y,l=e.y2*a+n.y;return{x1:o,x2:i,y1:s,y2:l,w:i-o,h:l-s}};oa.dirtyCompoundBoundsCache=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=this.cy();return!e.styleEnabled()||!e.hasCompoundNodes()?this:(this.forEachUp(function(r){if(r.isParent()){var a=r._private;a.compoundBoundsClean=!1,a.bbCache=null,t||r.emitAndNotify("bounds")}}),this)};oa.updateCompoundBounds=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=this.cy();if(!e.styleEnabled()||!e.hasCompoundNodes())return this;if(!t&&e.batching())return this;function r(i){if(!i.isParent())return;var s=i._private,l=i.children(),u=i.pstyle("compound-sizing-wrt-labels").value==="include",c={width:{val:i.pstyle("min-width").pfValue,left:i.pstyle("min-width-bias-left"),right:i.pstyle("min-width-bias-right")},height:{val:i.pstyle("min-height").pfValue,top:i.pstyle("min-height-bias-top"),bottom:i.pstyle("min-height-bias-bottom")}},d=l.boundingBox({includeLabels:u,includeOverlays:!1,useCache:!1}),h=s.position;(d.w===0||d.h===0)&&(d={w:i.pstyle("width").pfValue,h:i.pstyle("height").pfValue},d.x1=h.x-d.w/2,d.x2=h.x+d.w/2,d.y1=h.y-d.h/2,d.y2=h.y+d.h/2);function p(C,D,L){var A=0,O=0,I=D+L;return C>0&&I>0&&(A=D/I*C,O=L/I*C),{biasDiff:A,biasComplementDiff:O}}function g(C,D,L,A){if(L.units==="%")switch(A){case"width":return C>0?L.pfValue*C:0;case"height":return D>0?L.pfValue*D:0;case"average":return C>0&&D>0?L.pfValue*(C+D)/2:0;case"min":return C>0&&D>0?C>D?L.pfValue*D:L.pfValue*C:0;case"max":return C>0&&D>0?C>D?L.pfValue*C:L.pfValue*D:0;default:return 0}else return L.units==="px"?L.pfValue:0}var f=c.width.left.value;c.width.left.units==="px"&&c.width.val>0&&(f=f*100/c.width.val);var v=c.width.right.value;c.width.right.units==="px"&&c.width.val>0&&(v=v*100/c.width.val);var m=c.height.top.value;c.height.top.units==="px"&&c.height.val>0&&(m=m*100/c.height.val);var y=c.height.bottom.value;c.height.bottom.units==="px"&&c.height.val>0&&(y=y*100/c.height.val);var b=p(c.width.val-d.w,f,v),x=b.biasDiff,k=b.biasComplementDiff,E=p(c.height.val-d.h,m,y),_=E.biasDiff,T=E.biasComplementDiff;s.autoPadding=g(d.w,d.h,i.pstyle("padding"),i.pstyle("padding-relative-to").value),s.autoWidth=Math.max(d.w,c.width.val),h.x=(-x+d.x1+d.x2+k)/2,s.autoHeight=Math.max(d.h,c.height.val),h.y=(-_+d.y1+d.y2+T)/2}for(var a=0;a<this.length;a++){var n=this[a],o=n._private;(!o.compoundBoundsClean||t)&&(r(n),e.batching()||(o.compoundBoundsClean=!0))}return this};var ir=function(e){return e===1/0||e===-1/0?0:e},gr=function(e,r,a,n,o){n-r==0||o-a==0||r==null||a==null||n==null||o==null||(e.x1=r<e.x1?r:e.x1,e.x2=n>e.x2?n:e.x2,e.y1=a<e.y1?a:e.y1,e.y2=o>e.y2?o:e.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1)},Ea=function(e,r){return r==null?e:gr(e,r.x1,r.y1,r.x2,r.y2)},Gn=function(e,r,a){return pr(e,r,a)},fo=function(e,r,a){if(!r.cy().headless()){var n=r._private,o=n.rstyle,i=o.arrowWidth/2,s=r.pstyle(a+"-arrow-shape").value,l,u;if(s!=="none"){a==="source"?(l=o.srcX,u=o.srcY):a==="target"?(l=o.tgtX,u=o.tgtY):(l=o.midX,u=o.midY);var c=n.arrowBounds=n.arrowBounds||{},d=c[a]=c[a]||{};d.x1=l-i,d.y1=u-i,d.x2=l+i,d.y2=u+i,d.w=d.x2-d.x1,d.h=d.y2-d.y1,ao(d,1),gr(e,d.x1,d.y1,d.x2,d.y2)}}},Xs=function(e,r,a){if(!r.cy().headless()){var n;a?n=a+"-":n="";var o=r._private,i=o.rstyle,s=r.pstyle(n+"label").strValue;if(s){var l=r.pstyle("text-halign"),u=r.pstyle("text-valign"),c=Gn(i,"labelWidth",a),d=Gn(i,"labelHeight",a),h=Gn(i,"labelX",a),p=Gn(i,"labelY",a),g=r.pstyle(n+"text-margin-x").pfValue,f=r.pstyle(n+"text-margin-y").pfValue,v=r.isEdge(),m=r.pstyle(n+"text-rotation"),y=r.pstyle("text-outline-width").pfValue,b=r.pstyle("text-border-width").pfValue,x=b/2,k=r.pstyle("text-background-padding").pfValue,E=2,_=d,T=c,C=T/2,D=_/2,L,A,O,I;if(v)L=h-C,A=h+C,O=p-D,I=p+D;else{switch(l.value){case"left":L=h-T,A=h;break;case"center":L=h-C,A=h+C;break;case"right":L=h,A=h+T;break}switch(u.value){case"top":O=p-_,I=p;break;case"center":O=p-D,I=p+D;break;case"bottom":O=p,I=p+_;break}}L+=g-Math.max(y,x)-k-E,A+=g+Math.max(y,x)+k+E,O+=f-Math.max(y,x)-k-E,I+=f+Math.max(y,x)+k+E;var N=a||"main",z=o.labelBounds,$=z[N]=z[N]||{};$.x1=L,$.y1=O,$.x2=A,$.y2=I,$.w=A-L,$.h=I-O;var B=v&&m.strValue==="autorotate",R=m.pfValue!=null&&m.pfValue!==0;if(B||R){var H=B?Gn(o.rstyle,"labelAngle",a):m.pfValue,M=Math.cos(H),j=Math.sin(H),W=(L+A)/2,te=(O+I)/2;if(!v){switch(l.value){case"left":W=A;break;case"right":W=L;break}switch(u.value){case"top":te=I;break;case"bottom":te=O;break}}var X=function(Te,fe){return Te=Te-W,fe=fe-te,{x:Te*M-fe*j+W,y:Te*j+fe*M+te}},Y=X(L,O),F=X(L,I),Z=X(A,O),se=X(A,I);L=Math.min(Y.x,F.x,Z.x,se.x),A=Math.max(Y.x,F.x,Z.x,se.x),O=Math.min(Y.y,F.y,Z.y,se.y),I=Math.max(Y.y,F.y,Z.y,se.y)}var ie=N+"Rot",pe=z[ie]=z[ie]||{};pe.x1=L,pe.y1=O,pe.x2=A,pe.y2=I,pe.w=A-L,pe.h=I-O,gr(e,L,O,A,I),gr(o.labelBounds.all,L,O,A,I)}return e}},Dy=function(e,r){var a=e._private.cy,n=a.styleEnabled(),o=a.headless(),i=Qt(),s=e._private,l=e.isNode(),u=e.isEdge(),c,d,h,p,g,f,v=s.rstyle,m=l&&n?e.pstyle("bounds-expansion").pfValue:[0],y=function(Te){return Te.pstyle("display").value!=="none"},b=!n||y(e)&&(!u||y(e.source())&&y(e.target()));if(b){var x=0,k=0;n&&r.includeOverlays&&(x=e.pstyle("overlay-opacity").value,x!==0&&(k=e.pstyle("overlay-padding").value));var E=0,_=0;if(n&&(E=e.pstyle("width").pfValue,_=E/2),l&&r.includeNodes){var T=e.position();g=T.x,f=T.y;var C=e.outerWidth(),D=C/2,L=e.outerHeight(),A=L/2;c=g-D,d=g+D,h=f-A,p=f+A,gr(i,c,h,d,p)}else if(u&&r.includeEdges)if(n&&!o){var O=e.pstyle("curve-style").strValue;if(c=Math.min(v.srcX,v.midX,v.tgtX),d=Math.max(v.srcX,v.midX,v.tgtX),h=Math.min(v.srcY,v.midY,v.tgtY),p=Math.max(v.srcY,v.midY,v.tgtY),c-=_,d+=_,h-=_,p+=_,gr(i,c,h,d,p),O==="haystack"){var I=v.haystackPts;if(I&&I.length===2){if(c=I[0].x,h=I[0].y,d=I[1].x,p=I[1].y,c>d){var N=c;c=d,d=N}if(h>p){var z=h;h=p,p=z}gr(i,c-_,h-_,d+_,p+_)}}else if(O==="bezier"||O==="unbundled-bezier"||O==="segments"||O==="taxi"){var $;switch(O){case"bezier":case"unbundled-bezier":$=v.bezierPts;break;case"segments":case"taxi":$=v.linePts;break}if($!=null)for(var B=0;B<$.length;B++){var R=$[B];c=R.x-_,d=R.x+_,h=R.y-_,p=R.y+_,gr(i,c,h,d,p)}}}else{var H=e.source(),M=H.position(),j=e.target(),W=j.position();if(c=M.x,d=W.x,h=M.y,p=W.y,c>d){var te=c;c=d,d=te}if(h>p){var X=h;h=p,p=X}c-=_,d+=_,h-=_,p+=_,gr(i,c,h,d,p)}if(n&&r.includeEdges&&u&&(fo(i,e,"mid-source"),fo(i,e,"mid-target"),fo(i,e,"source"),fo(i,e,"target")),n){var Y=e.pstyle("ghost").value==="yes";if(Y){var F=e.pstyle("ghost-offset-x").pfValue,Z=e.pstyle("ghost-offset-y").pfValue;gr(i,i.x1+F,i.y1+Z,i.x2+F,i.y2+Z)}}var se=s.bodyBounds=s.bodyBounds||{};Uc(se,i),Is(se,m),ao(se,1),n&&(c=i.x1,d=i.x2,h=i.y1,p=i.y2,gr(i,c-k,h-k,d+k,p+k));var ie=s.overlayBounds=s.overlayBounds||{};Uc(ie,i),Is(ie,m),ao(ie,1);var pe=s.labelBounds=s.labelBounds||{};pe.all!=null?t0(pe.all):pe.all=Qt(),n&&r.includeLabels&&(r.includeMainLabels&&Xs(i,e,null),u&&(r.includeSourceLabels&&Xs(i,e,"source"),r.includeTargetLabels&&Xs(i,e,"target")))}return i.x1=ir(i.x1),i.y1=ir(i.y1),i.x2=ir(i.x2),i.y2=ir(i.y2),i.w=ir(i.x2-i.x1),i.h=ir(i.y2-i.y1),i.w>0&&i.h>0&&b&&(Is(i,m),ao(i,1)),i},Id=function(e){var r=0,a=function(i){return(i?1:0)<<r++},n=0;return n+=a(e.incudeNodes),n+=a(e.includeEdges),n+=a(e.includeLabels),n+=a(e.includeMainLabels),n+=a(e.includeSourceLabels),n+=a(e.includeTargetLabels),n+=a(e.includeOverlays),n},Od=function(e){if(e.isEdge()){var r=e.source().position(),a=e.target().position(),n=function(i){return Math.round(i)};return _m([n(r.x),n(r.y),n(a.x),n(a.y)])}else return 0},$d=function(e,r){var a=e._private,n,o=e.isEdge(),i=r==null?Bd:Id(r),s=i===Bd,l=Od(e),u=a.bbCachePosKey===l,c=r.useCache&&u,d=function(f){return f._private.bbCache==null||f._private.styleDirty},h=!c||d(e)||o&&d(e.source())||d(e.target());if(h?(u||e.recalculateRenderedStyle(c),n=Dy(e,Zn),a.bbCache=n,a.bbCachePosKey=l):n=a.bbCache,!s){var p=e.isNode();n=Qt(),(r.includeNodes&&p||r.includeEdges&&!p)&&(r.includeOverlays?Ea(n,a.overlayBounds):Ea(n,a.bodyBounds)),r.includeLabels&&(r.includeMainLabels&&(!o||r.includeSourceLabels&&r.includeTargetLabels)?Ea(n,a.labelBounds.all):(r.includeMainLabels&&Ea(n,a.labelBounds.mainRot),r.includeSourceLabels&&Ea(n,a.labelBounds.sourceRot),r.includeTargetLabels&&Ea(n,a.labelBounds.targetRot))),n.w=n.x2-n.x1,n.h=n.y2-n.y1}return n},Zn={includeNodes:!0,includeEdges:!0,includeLabels:!0,includeMainLabels:!0,includeSourceLabels:!0,includeTargetLabels:!0,includeOverlays:!0,useCache:!0},Bd=Id(Zn),zd=_t(Zn);oa.boundingBox=function(t){var e;if(this.length===1&&this[0]._private.bbCache!=null&&!this[0]._private.styleDirty&&(t===void 0||t.useCache===void 0||t.useCache===!0))t===void 0?t=Zn:t=zd(t),e=$d(this[0],t);else{e=Qt(),t=t||Zn;var r=zd(t),a=this,n=a.cy(),o=n.styleEnabled();if(o)for(var i=0;i<a.length;i++){var s=a[i],l=s._private,u=Od(s),c=l.bbCachePosKey===u,d=r.useCache&&c&&!l.styleDirty;s.recalculateRenderedStyle(d)}this.updateCompoundBounds(!t.useCache);for(var h=0;h<a.length;h++){var p=a[h];Ea(e,$d(p,r))}}return e.x1=ir(e.x1),e.y1=ir(e.y1),e.x2=ir(e.x2),e.y2=ir(e.y2),e.w=ir(e.x2-e.x1),e.h=ir(e.y2-e.y1),e};oa.dirtyBoundingBoxCache=function(){for(var t=0;t<this.length;t++){var e=this[t]._private;e.bbCache=null,e.bbCachePosKey=null,e.bodyBounds=null,e.overlayBounds=null,e.labelBounds.all=null,e.labelBounds.source=null,e.labelBounds.target=null,e.labelBounds.main=null,e.labelBounds.sourceRot=null,e.labelBounds.targetRot=null,e.labelBounds.mainRot=null,e.arrowBounds.source=null,e.arrowBounds.target=null,e.arrowBounds["mid-source"]=null,e.arrowBounds["mid-target"]=null}return this.emitAndNotify("bounds"),this};oa.boundingBoxAt=function(t){var e=this.nodes(),r=this.cy(),a=r.hasCompoundNodes(),n=r.collection();if(a&&(n=e.filter(function(u){return u.isParent()}),e=e.not(n)),Oe(t)){var o=t;t=function(){return o}}var i=function(c,d){return c._private.bbAtOldPos=t(c,d)},s=function(c){return c._private.bbAtOldPos};r.startBatch(),e.forEach(i).silentPositions(t),a&&(n.dirtyCompoundBoundsCache(),n.dirtyBoundingBoxCache(),n.updateCompoundBounds(!0));var l=e0(this.boundingBox({useCache:!1}));return e.silentPositions(s),a&&(n.dirtyCompoundBoundsCache(),n.dirtyBoundingBoxCache(),n.updateCompoundBounds(!0)),r.endBatch(),l};hn.boundingbox=hn.bb=hn.boundingBox;hn.renderedBoundingbox=hn.renderedBoundingBox;var Py=oa,Wn,Jn;Wn=Jn={};var Md=function(e){e.uppercaseName=Lc(e.name),e.autoName="auto"+e.uppercaseName,e.labelName="label"+e.uppercaseName,e.outerName="outer"+e.uppercaseName,e.uppercaseOuterName=Lc(e.outerName),Wn[e.name]=function(){var a=this[0],n=a._private,o=n.cy,i=o._private.styleEnabled;if(a)if(i){if(a.isParent())return a.updateCompoundBounds(),n[e.autoName]||0;var s=a.pstyle(e.name);switch(s.strValue){case"label":return a.recalculateRenderedStyle(),n.rstyle[e.labelName]||0;default:return s.pfValue}}else return 1},Wn["outer"+e.uppercaseName]=function(){var a=this[0],n=a._private,o=n.cy,i=o._private.styleEnabled;if(a)if(i){var s=a[e.name](),l=a.pstyle("border-width").pfValue,u=2*a.padding();return s+l+u}else return 1},Wn["rendered"+e.uppercaseName]=function(){var a=this[0];if(a){var n=a[e.name]();return n*this.cy().zoom()}},Wn["rendered"+e.uppercaseOuterName]=function(){var a=this[0];if(a){var n=a[e.outerName]();return n*this.cy().zoom()}}};Md({name:"width"});Md({name:"height"});Jn.padding=function(){var t=this[0],e=t._private;return t.isParent()?(t.updateCompoundBounds(),e.autoPadding!==void 0?e.autoPadding:t.pstyle("padding").pfValue):t.pstyle("padding").pfValue};Jn.paddedHeight=function(){var t=this[0];return t.height()+2*t.padding()};Jn.paddedWidth=function(){var t=this[0];return t.width()+2*t.padding()};var Ay=Jn,Ly=function(e,r){if(e.isEdge())return r(e)},Iy=function(e,r){if(e.isEdge()){var a=e.cy();return to(r(e),a.zoom(),a.pan())}},Oy=function(e,r){if(e.isEdge()){var a=e.cy(),n=a.pan(),o=a.zoom();return r(e).map(function(i){return to(i,o,n)})}},$y=function(e){return e.renderer().getControlPoints(e)},By=function(e){return e.renderer().getSegmentPoints(e)},zy=function(e){return e.renderer().getSourceEndpoint(e)},My=function(e){return e.renderer().getTargetEndpoint(e)},Ry=function(e){return e.renderer().getEdgeMidpoint(e)},Rd={controlPoints:{get:$y,mult:!0},segmentPoints:{get:By,mult:!0},sourceEndpoint:{get:zy},targetEndpoint:{get:My},midpoint:{get:Ry}},Fy=function(e){return"rendered"+e[0].toUpperCase()+e.substr(1)},Ny=Object.keys(Rd).reduce(function(t,e){var r=Rd[e],a=Fy(e);return t[e]=function(){return Ly(this,r.get)},r.mult?t[a]=function(){return Oy(this,r.get)}:t[a]=function(){return Iy(this,r.get)},t},{}),Vy=ke({},Ty,Py,Ay,Ny);var Fd=function(e,r){this.recycle(e,r)};function ei(){return!1}function po(){return!0}Fd.prototype={instanceString:function(){return"event"},recycle:function(e,r){if(this.isImmediatePropagationStopped=this.isPropagationStopped=this.isDefaultPrevented=ei,e!=null&&e.preventDefault?(this.type=e.type,this.isDefaultPrevented=e.defaultPrevented?po:ei):e!=null&&e.type?r=e:this.type=e,r!=null&&(this.originalEvent=r.originalEvent,this.type=r.type!=null?r.type:this.type,this.cy=r.cy,this.target=r.target,this.position=r.position,this.renderedPosition=r.renderedPosition,this.namespace=r.namespace,this.layout=r.layout),this.cy!=null&&this.position!=null&&this.renderedPosition==null){var a=this.position,n=this.cy.zoom(),o=this.cy.pan();this.renderedPosition={x:a.x*n+o.x,y:a.y*n+o.y}}this.timeStamp=e&&e.timeStamp||Date.now()},preventDefault:function(){this.isDefaultPrevented=po;var e=this.originalEvent;!e||e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.isPropagationStopped=po;var e=this.originalEvent;!e||e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=po,this.stopPropagation()},isDefaultPrevented:ei,isPropagationStopped:ei,isImmediatePropagationStopped:ei};var Nd=/^([^.]+)(\.(?:[^.]+))?$/,jy=".*",Vd={qualifierCompare:function(e,r){return e===r},eventMatches:function(){return!0},addEventFields:function(){},callbackContext:function(e){return e},beforeEmit:function(){},afterEmit:function(){},bubble:function(){return!1},parent:function(){return null},context:null},jd=Object.keys(Vd),Ky={};function vo(){for(var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ky,e=arguments.length>1?arguments[1]:void 0,r=0;r<jd.length;r++){var a=jd[r];this[a]=t[a]||Vd[a]}this.context=e||this.context,this.listeners=[],this.emitting=0}var sa=vo.prototype,Kd=function(e,r,a,n,o,i,s){rt(n)&&(o=n,n=null),s&&(i==null?i=s:i=ke({},i,s));for(var l=Qe(a)?a:a.split(/\s+/),u=0;u<l.length;u++){var c=l[u];if(!Zr(c)){var d=c.match(Nd);if(d){var h=d[1],p=d[2]?d[2]:null,g=r(e,c,h,p,n,o,i);if(g===!1)break}}}},Hd=function(e,r){return e.addEventFields(e.context,r),new Fd(r.type,r)},Hy=function(e,r,a){if(am(a)){r(e,a);return}else if(Oe(a)){r(e,Hd(e,a));return}for(var n=Qe(a)?a:a.split(/\s+/),o=0;o<n.length;o++){var i=n[o];if(!Zr(i)){var s=i.match(Nd);if(s){var l=s[1],u=s[2]?s[2]:null,c=Hd(e,{type:l,namespace:u,target:e.context});r(e,c)}}}};sa.on=sa.addListener=function(t,e,r,a,n){return Kd(this,function(o,i,s,l,u,c,d){rt(c)&&o.listeners.push({event:i,callback:c,type:s,namespace:l,qualifier:u,conf:d})},t,e,r,a,n),this};sa.one=function(t,e,r,a){return this.on(t,e,r,a,{one:!0})};sa.removeListener=sa.off=function(t,e,r,a){var n=this;this.emitting!==0&&(this.listeners=Dm(this.listeners));for(var o=this.listeners,i=function(u){var c=o[u];Kd(n,function(d,h,p,g,f,v){if((c.type===p||t==="*")&&(!g&&c.namespace!==".*"||c.namespace===g)&&(!f||d.qualifierCompare(c.qualifier,f))&&(!v||c.callback===v))return o.splice(u,1),!1},t,e,r,a)},s=o.length-1;s>=0;s--)i(s);return this};sa.removeAllListeners=function(){return this.removeListener("*")};sa.emit=sa.trigger=function(t,e,r){var a=this.listeners,n=a.length;return this.emitting++,Qe(e)||(e=[e]),Hy(this,function(o,i){r!=null&&(a=[{event:i.event,type:i.type,namespace:i.namespace,callback:r}],n=a.length);for(var s=function(c){var d=a[c];if(d.type===i.type&&(!d.namespace||d.namespace===i.namespace||d.namespace===jy)&&o.eventMatches(o.context,d,i)){var h=[i];e!=null&&Am(h,e),o.beforeEmit(o.context,d,i),d.conf&&d.conf.one&&(o.listeners=o.listeners.filter(function(f){return f!==d}));var p=o.callbackContext(o.context,d,i),g=d.callback.apply(p,h);o.afterEmit(o.context,d,i),g===!1&&(i.stopPropagation(),i.preventDefault())}},l=0;l<n;l++)s(l);o.bubble(o.context)&&!i.isPropagationStopped()&&o.parent(o.context).emit(i,e)},t),this.emitting--,this};var Qy={qualifierCompare:function(e,r){return e==null||r==null?e==null&&r==null:e.sameText(r)},eventMatches:function(e,r,a){var n=r.qualifier;return n!=null?e!==a.target&&Rn(a.target)&&n.matches(a.target):!0},addEventFields:function(e,r){r.cy=e.cy(),r.target=e},callbackContext:function(e,r,a){return r.qualifier!=null?a.target:e},beforeEmit:function(e,r){r.conf&&r.conf.once&&r.conf.onceCollection.removeListener(r.event,r.qualifier,r.callback)},bubble:function(){return!0},parent:function(e){return e.isChild()?e.parent():e.cy()}},go=function(e){return we(e)?new aa(e):e},Qd={createEmitter:function(){for(var e=0;e<this.length;e++){var r=this[e],a=r._private;a.emitter||(a.emitter=new vo(Qy,r))}return this},emitter:function(){return this._private.emitter},on:function(e,r,a){for(var n=go(r),o=0;o<this.length;o++){var i=this[o];i.emitter().on(e,n,a)}return this},removeListener:function(e,r,a){for(var n=go(r),o=0;o<this.length;o++){var i=this[o];i.emitter().removeListener(e,n,a)}return this},removeAllListeners:function(){for(var e=0;e<this.length;e++){var r=this[e];r.emitter().removeAllListeners()}return this},one:function(e,r,a){for(var n=go(r),o=0;o<this.length;o++){var i=this[o];i.emitter().one(e,n,a)}return this},once:function(e,r,a){for(var n=go(r),o=0;o<this.length;o++){var i=this[o];i.emitter().on(e,n,a,{once:!0,onceCollection:this})}},emit:function(e,r){for(var a=0;a<this.length;a++){var n=this[a];n.emitter().emit(e,r)}return this},emitAndNotify:function(e,r){if(this.length!==0)return this.cy().notify(e,this),this.emit(e,r),this}};Ve.eventAliasesOn(Qd);var Yd={nodes:function(e){return this.filter(function(r){return r.isNode()}).filter(e)},edges:function(e){return this.filter(function(r){return r.isEdge()}).filter(e)},byGroup:function(){for(var e=this.spawn(),r=this.spawn(),a=0;a<this.length;a++){var n=this[a];n.isNode()?e.push(n):r.push(n)}return{nodes:e,edges:r}},filter:function(e,r){if(e===void 0)return this;if(we(e)||Jt(e))return new aa(e).filter(this);if(rt(e)){for(var a=this.spawn(),n=this,o=0;o<n.length;o++){var i=n[o],s=r?e.apply(r,[i,o,n]):e(i,o,n);s&&a.push(i)}return a}return this.spawn()},not:function(e){if(e){we(e)&&(e=this.filter(e));for(var r=this.spawn(),a=0;a<this.length;a++){var n=this[a],o=e.has(n);o||r.push(n)}return r}else return this},absoluteComplement:function(){var e=this.cy();return e.mutableElements().not(this)},intersect:function(e){if(we(e)){var r=e;return this.filter(r)}for(var a=this.spawn(),n=this,o=e,i=this.length<e.length,s=i?n:o,l=i?o:n,u=0;u<s.length;u++){var c=s[u];l.has(c)&&a.push(c)}return a},xor:function(e){var r=this._private.cy;we(e)&&(e=r.$(e));var a=this.spawn(),n=this,o=e,i=function(l,u){for(var c=0;c<l.length;c++){var d=l[c],h=d._private.data.id,p=u.hasElementWithId(h);p||a.push(d)}};return i(n,o),i(o,n),a},diff:function(e){var r=this._private.cy;we(e)&&(e=r.$(e));var a=this.spawn(),n=this.spawn(),o=this.spawn(),i=this,s=e,l=function(c,d,h){for(var p=0;p<c.length;p++){var g=c[p],f=g._private.data.id,v=d.hasElementWithId(f);v?o.merge(g):h.push(g)}};return l(i,s,a),l(s,i,n),{left:a,right:n,both:o}},add:function(e){var r=this._private.cy;if(!e)return this;if(we(e)){var a=e;e=r.mutableElements().filter(a)}for(var n=this.spawnSelf(),o=0;o<e.length;o++){var i=e[o],s=!this.has(i);s&&n.push(i)}return n},merge:function(e){var r=this._private,a=r.cy;if(!e)return this;if(e&&we(e)){var n=e;e=a.mutableElements().filter(n)}for(var o=r.map,i=0;i<e.length;i++){var s=e[i],l=s._private.data.id,u=!o.has(l);if(u){var c=this.length++;this[c]=s,o.set(l,{ele:s,index:c})}}return this},unmergeAt:function(e){var r=this[e],a=r.id(),n=this._private,o=n.map;this[e]=void 0,o.delete(a);var i=e===this.length-1;if(this.length>1&&!i){var s=this.length-1,l=this[s],u=l._private.data.id;this[s]=void 0,this[e]=l,o.set(u,{ele:l,index:e})}return this.length--,this},unmergeOne:function(e){e=e[0];var r=this._private,a=e._private.data.id,n=r.map,o=n.get(a);if(!o)return this;var i=o.index;return this.unmergeAt(i),this},unmerge:function(e){var r=this._private.cy;if(!e)return this;if(e&&we(e)){var a=e;e=r.mutableElements().filter(a)}for(var n=0;n<e.length;n++)this.unmergeOne(e[n]);return this},unmergeBy:function(e){for(var r=this.length-1;r>=0;r--){var a=this[r];e(a)&&this.unmergeAt(r)}return this},map:function(e,r){for(var a=[],n=this,o=0;o<n.length;o++){var i=n[o],s=r?e.apply(r,[i,o,n]):e(i,o,n);a.push(s)}return a},reduce:function(e,r){for(var a=r,n=this,o=0;o<n.length;o++)a=e(a,n[o],o,n);return a},max:function(e,r){for(var a=-1/0,n,o=this,i=0;i<o.length;i++){var s=o[i],l=r?e.apply(r,[s,i,o]):e(s,i,o);l>a&&(a=l,n=s)}return{value:a,ele:n}},min:function(e,r){for(var a=1/0,n,o=this,i=0;i<o.length;i++){var s=o[i],l=r?e.apply(r,[s,i,o]):e(s,i,o);l<a&&(a=l,n=s)}return{value:a,ele:n}}},ze=Yd;ze.u=ze["|"]=ze["+"]=ze.union=ze.or=ze.add;ze["\\"]=ze["!"]=ze["-"]=ze.difference=ze.relativeComplement=ze.subtract=ze.not;ze.n=ze["&"]=ze["."]=ze.and=ze.intersection=ze.intersect;ze["^"]=ze["(+)"]=ze["(-)"]=ze.symmetricDifference=ze.symdiff=ze.xor;ze.fnFilter=ze.filterFn=ze.stdFilter=ze.filter;ze.complement=ze.abscomp=ze.absoluteComplement;var Yy={isNode:function(){return this.group()==="nodes"},isEdge:function(){return this.group()==="edges"},isLoop:function(){return this.isEdge()&&this.source()[0]===this.target()[0]},isSimple:function(){return this.isEdge()&&this.source()[0]!==this.target()[0]},group:function(){var e=this[0];if(e)return e._private.group}},Xd=function(e,r){var a=e.cy(),n=a.hasCompoundNodes();function o(c){var d=c.pstyle("z-compound-depth");return d.value==="auto"?n?c.zDepth():0:d.value==="bottom"?-1:d.value==="top"?Ts:0}var i=o(e)-o(r);if(i!==0)return i;function s(c){var d=c.pstyle("z-index-compare");return d.value==="auto"&&c.isNode()?1:0}var l=s(e)-s(r);if(l!==0)return l;var u=e.pstyle("z-index").value-r.pstyle("z-index").value;return u!==0?u:e.poolIndex()-r.poolIndex()},mo={forEach:function(e,r){if(rt(e))for(var a=this.length,n=0;n<a;n++){var o=this[n],i=r?e.apply(r,[o,n,this]):e(o,n,this);if(i===!1)break}return this},toArray:function(){for(var e=[],r=0;r<this.length;r++)e.push(this[r]);return e},slice:function(e,r){var a=[],n=this.length;r==null&&(r=n),e==null&&(e=0),e<0&&(e=n+e),r<0&&(r=n+r);for(var o=e;o>=0&&o<r&&o<n;o++)a.push(this[o]);return this.spawn(a)},size:function(){return this.length},eq:function(e){return this[e]||this.spawn()},first:function(){return this[0]||this.spawn()},last:function(){return this[this.length-1]||this.spawn()},empty:function(){return this.length===0},nonempty:function(){return!this.empty()},sort:function(e){if(!rt(e))return this;var r=this.toArray().sort(e);return this.spawn(r)},sortByZIndex:function(){return this.sort(Xd)},zDepth:function(){var e=this[0];if(!!e){var r=e._private,a=r.group;if(a==="nodes"){var n=r.data.parent?e.parents().size():0;return e.isParent()?n:Ts-1}else{var o=r.source,i=r.target,s=o.zDepth(),l=i.zDepth();return Math.max(s,l,0)}}}};mo.each=mo.forEach;var Xy=function(){var e="undefined",r=(typeof Symbol=="undefined"?"undefined":ct(Symbol))!=e&&ct(Symbol.iterator)!=e;r&&(mo[Symbol.iterator]=function(){var a=this,n={value:void 0,done:!1},o=0,i=this.length;return Ec({next:function(){return o<i?n.value=a[o++]:(n.value=void 0,n.done=!0),n}},Symbol.iterator,function(){return this})})};Xy();var Uy=_t({nodeDimensionsIncludeLabels:!1}),yo={layoutDimensions:function(e){e=Uy(e);var r;if(!this.takesUpSpace())r={w:0,h:0};else if(e.nodeDimensionsIncludeLabels){var a=this.boundingBox();r={w:a.w,h:a.h}}else r={w:this.outerWidth(),h:this.outerHeight()};return(r.w===0||r.h===0)&&(r.w=r.h=1),r},layoutPositions:function(e,r,a){var n=this.nodes().filter(function(k){return!k.isParent()}),o=this.cy(),i=r.eles,s=function(E){return E.id()},l=Fn(a,s);e.emit({type:"layoutstart",layout:e}),e.animations=[];var u=function(E,_,T){var C={x:_.x1+_.w/2,y:_.y1+_.h/2},D={x:(T.x-C.x)*E,y:(T.y-C.y)*E};return{x:C.x+D.x,y:C.y+D.y}},c=r.spacingFactor&&r.spacingFactor!==1,d=function(){if(!c)return null;for(var E=Qt(),_=0;_<n.length;_++){var T=n[_],C=l(T,_);a0(E,C.x,C.y)}return E},h=d(),p=Fn(function(k,E){var _=l(k,E);if(c){var T=Math.abs(r.spacingFactor);_=u(T,h,_)}return r.transform!=null&&(_=r.transform(k,_)),_},s);if(r.animate){for(var g=0;g<n.length;g++){var f=n[g],v=p(f,g),m=r.animateFilter==null||r.animateFilter(f,g);if(m){var y=f.animation({position:v,duration:r.animationDuration,easing:r.animationEasing});e.animations.push(y)}else f.position(v)}if(r.fit){var b=o.animation({fit:{boundingBox:i.boundingBoxAt(p),padding:r.padding},duration:r.animationDuration,easing:r.animationEasing});e.animations.push(b)}else if(r.zoom!==void 0&&r.pan!==void 0){var x=o.animation({zoom:r.zoom,pan:r.pan,duration:r.animationDuration,easing:r.animationEasing});e.animations.push(x)}e.animations.forEach(function(k){return k.play()}),e.one("layoutready",r.ready),e.emit({type:"layoutready",layout:e}),ln.all(e.animations.map(function(k){return k.promise()})).then(function(){e.one("layoutstop",r.stop),e.emit({type:"layoutstop",layout:e})})}else n.positions(p),r.fit&&o.fit(r.eles,r.padding),r.zoom!=null&&o.zoom(r.zoom),r.pan&&o.pan(r.pan),e.one("layoutready",r.ready),e.emit({type:"layoutready",layout:e}),e.one("layoutstop",r.stop),e.emit({type:"layoutstop",layout:e});return this},layout:function(e){var r=this.cy();return r.makeLayout(ke({},e,{eles:this}))}};yo.createLayout=yo.makeLayout=yo.layout;function Ud(t,e,r){var a=r._private,n=a.styleCache=a.styleCache||[],o;return(o=n[t])!=null||(o=n[t]=e(r)),o}function bo(t,e){return t=wa(t),function(a){return Ud(t,e,a)}}function wo(t,e){t=wa(t);var r=function(n){return e.call(n)};return function(){var n=this[0];if(n)return Ud(t,r,n)}}var Ct={recalculateRenderedStyle:function(e){var r=this.cy(),a=r.renderer(),n=r.styleEnabled();return a&&n&&a.recalculateRenderedStyle(this,e),this},dirtyStyleCache:function(){var e=this.cy(),r=function(o){return o._private.styleCache=null};if(e.hasCompoundNodes()){var a;a=this.spawnSelf().merge(this.descendants()).merge(this.parents()),a.merge(a.connectedEdges()),a.forEach(r)}else this.forEach(function(n){r(n),n.connectedEdges().forEach(r)});return this},updateStyle:function(e){var r=this._private.cy;if(!r.styleEnabled())return this;if(r.batching()){var a=r._private.batchStyleEles;return a.merge(this),this}var n=r.hasCompoundNodes(),o=this;e=!!(e||e===void 0),n&&(o=this.spawnSelf().merge(this.descendants()).merge(this.parents()));var i=o;return e?i.emitAndNotify("style"):i.emit("style"),o.forEach(function(s){return s._private.styleDirty=!0}),this},cleanStyle:function(){var e=this.cy();if(!!e.styleEnabled())for(var r=0;r<this.length;r++){var a=this[r];a._private.styleDirty&&(a._private.styleDirty=!1,e.style().apply(a))}},parsedStyle:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,a=this[0],n=a.cy();if(!!n.styleEnabled()&&a){this.cleanStyle();var o=a._private.style[e];return o??(r?n.style().getDefaultProperty(e):null)}},numericStyle:function(e){var r=this[0];if(!!r.cy().styleEnabled()&&r){var a=r.pstyle(e);return a.pfValue!==void 0?a.pfValue:a.value}},numericStyleUnits:function(e){var r=this[0];if(!!r.cy().styleEnabled()&&r)return r.pstyle(e).units},renderedStyle:function(e){var r=this.cy();if(!r.styleEnabled())return this;var a=this[0];if(a)return r.style().getRenderedStyle(a,e)},style:function(e,r){var a=this.cy();if(!a.styleEnabled())return this;var n=!1,o=a.style();if(Oe(e)){var i=e;o.applyBypass(this,i,n),this.emitAndNotify("style")}else if(we(e))if(r===void 0){var s=this[0];return s?o.getStylePropertyValue(s,e):void 0}else o.applyBypass(this,e,r,n),this.emitAndNotify("style");else if(e===void 0){var l=this[0];return l?o.getRawStyle(l):void 0}return this},removeStyle:function(e){var r=this.cy();if(!r.styleEnabled())return this;var a=!1,n=r.style(),o=this;if(e===void 0)for(var i=0;i<o.length;i++){var s=o[i];n.removeAllBypasses(s,a)}else{e=e.split(/\s+/);for(var l=0;l<o.length;l++){var u=o[l];n.removeBypasses(u,e,a)}}return this.emitAndNotify("style"),this},show:function(){return this.css("display","element"),this},hide:function(){return this.css("display","none"),this},effectiveOpacity:function(){var e=this.cy();if(!e.styleEnabled())return 1;var r=e.hasCompoundNodes(),a=this[0];if(a){var n=a._private,o=a.pstyle("opacity").value;if(!r)return o;var i=n.data.parent?a.parents():null;if(i)for(var s=0;s<i.length;s++){var l=i[s],u=l.pstyle("opacity").value;o=u*o}return o}},transparent:function(){var e=this.cy();if(!e.styleEnabled())return!1;var r=this[0],a=r.cy().hasCompoundNodes();if(r)return a?r.effectiveOpacity()===0:r.pstyle("opacity").value===0},backgrounding:function(){var e=this.cy();if(!e.styleEnabled())return!1;var r=this[0];return!!r._private.backgrounding}};function Us(t,e){var r=t._private,a=r.data.parent?t.parents():null;if(a)for(var n=0;n<a.length;n++){var o=a[n];if(!e(o))return!1}return!0}function qs(t){var e=t.ok,r=t.edgeOkViaNode||t.ok,a=t.parentOk||t.ok;return function(){var n=this.cy();if(!n.styleEnabled())return!0;var o=this[0],i=n.hasCompoundNodes();if(o){var s=o._private;if(!e(o))return!1;if(o.isNode())return!i||Us(o,a);var l=s.source,u=s.target;return r(l)&&(!i||Us(l,r))&&(l===u||r(u)&&(!i||Us(u,r)))}}}var fn=bo("eleTakesUpSpace",function(t){return t.pstyle("display").value==="element"&&t.width()!==0&&(t.isNode()?t.height()!==0:!0)});Ct.takesUpSpace=wo("takesUpSpace",qs({ok:fn}));var qy=bo("eleInteractive",function(t){return t.pstyle("events").value==="yes"&&t.pstyle("visibility").value==="visible"&&fn(t)}),Gy=bo("parentInteractive",function(t){return t.pstyle("visibility").value==="visible"&&fn(t)});Ct.interactive=wo("interactive",qs({ok:qy,parentOk:Gy,edgeOkViaNode:fn}));Ct.noninteractive=function(){var t=this[0];if(t)return!t.interactive()};var Zy=bo("eleVisible",function(t){return t.pstyle("visibility").value==="visible"&&t.pstyle("opacity").pfValue!==0&&fn(t)}),Wy=fn;Ct.visible=wo("visible",qs({ok:Zy,edgeOkViaNode:Wy}));Ct.hidden=function(){var t=this[0];if(t)return!t.visible()};Ct.isBundledBezier=wo("isBundledBezier",function(){return this.cy().styleEnabled()?!this.removed()&&this.pstyle("curve-style").value==="bezier"&&this.takesUpSpace():!1});Ct.bypass=Ct.css=Ct.style;Ct.renderedCss=Ct.renderedStyle;Ct.removeBypass=Ct.removeCss=Ct.removeStyle;Ct.pstyle=Ct.parsedStyle;var la={};function qd(t){return function(){var e=arguments,r=[];if(e.length===2){var a=e[0],n=e[1];this.on(t.event,a,n)}else if(e.length===1&&rt(e[0])){var o=e[0];this.on(t.event,o)}else if(e.length===0||e.length===1&&Qe(e[0])){for(var i=e.length===1?e[0]:null,s=0;s<this.length;s++){var l=this[s],u=!t.ableField||l._private[t.ableField],c=l._private[t.field]!=t.value;if(t.overrideAble){var d=t.overrideAble(l);if(d!==void 0&&(u=d,!d))return this}u&&(l._private[t.field]=t.value,c&&r.push(l))}var h=this.spawn(r);h.updateStyle(),h.emit(t.event),i&&h.emit(i)}return this}}function pn(t){la[t.field]=function(){var e=this[0];if(e){if(t.overrideField){var r=t.overrideField(e);if(r!==void 0)return r}return e._private[t.field]}},la[t.on]=qd({event:t.on,field:t.field,ableField:t.ableField,overrideAble:t.overrideAble,value:!0}),la[t.off]=qd({event:t.off,field:t.field,ableField:t.ableField,overrideAble:t.overrideAble,value:!1})}pn({field:"locked",overrideField:function(e){return e.cy().autolock()?!0:void 0},on:"lock",off:"unlock"});pn({field:"grabbable",overrideField:function(e){return e.cy().autoungrabify()||e.pannable()?!1:void 0},on:"grabify",off:"ungrabify"});pn({field:"selected",ableField:"selectable",overrideAble:function(e){return e.cy().autounselectify()?!1:void 0},on:"select",off:"unselect"});pn({field:"selectable",overrideField:function(e){return e.cy().autounselectify()?!1:void 0},on:"selectify",off:"unselectify"});la.deselect=la.unselect;la.grabbed=function(){var t=this[0];if(t)return t._private.grabbed};pn({field:"active",on:"activate",off:"unactivate"});pn({field:"pannable",on:"panify",off:"unpanify"});la.inactive=function(){var t=this[0];if(t)return!t._private.active};var Pt={},Gd=function(e){return function(a){for(var n=this,o=[],i=0;i<n.length;i++){var s=n[i];if(!!s.isNode()){for(var l=!1,u=s.connectedEdges(),c=0;c<u.length;c++){var d=u[c],h=d.source(),p=d.target();if(e.noIncomingEdges&&p===s&&h!==s||e.noOutgoingEdges&&h===s&&p!==s){l=!0;break}}l||o.push(s)}}return this.spawn(o,!0).filter(a)}},Zd=function(e){return function(r){for(var a=this,n=[],o=0;o<a.length;o++){var i=a[o];if(!!i.isNode())for(var s=i.connectedEdges(),l=0;l<s.length;l++){var u=s[l],c=u.source(),d=u.target();e.outgoing&&c===i?(n.push(u),n.push(d)):e.incoming&&d===i&&(n.push(u),n.push(c))}}return this.spawn(n,!0).filter(r)}},Wd=function(e){return function(r){for(var a=this,n=[],o={};;){var i=e.outgoing?a.outgoers():a.incomers();if(i.length===0)break;for(var s=!1,l=0;l<i.length;l++){var u=i[l],c=u.id();o[c]||(o[c]=!0,n.push(u),s=!0)}if(!s)break;a=i}return this.spawn(n,!0).filter(r)}};Pt.clearTraversalCache=function(){for(var t=0;t<this.length;t++)this[t]._private.traversalCache=null};ke(Pt,{roots:Gd({noIncomingEdges:!0}),leaves:Gd({noOutgoingEdges:!0}),outgoers:nr(Zd({outgoing:!0}),"outgoers"),successors:Wd({outgoing:!0}),incomers:nr(Zd({incoming:!0}),"incomers"),predecessors:Wd({incoming:!0})});ke(Pt,{neighborhood:nr(function(t){for(var e=[],r=this.nodes(),a=0;a<r.length;a++)for(var n=r[a],o=n.connectedEdges(),i=0;i<o.length;i++){var s=o[i],l=s.source(),u=s.target(),c=n===l?u:l;c.length>0&&e.push(c[0]),e.push(s[0])}return this.spawn(e,!0).filter(t)},"neighborhood"),closedNeighborhood:function(e){return this.neighborhood().add(this).filter(e)},openNeighborhood:function(e){return this.neighborhood(e)}});Pt.neighbourhood=Pt.neighborhood;Pt.closedNeighbourhood=Pt.closedNeighborhood;Pt.openNeighbourhood=Pt.openNeighborhood;ke(Pt,{source:nr(function(e){var r=this[0],a;return r&&(a=r._private.source||r.cy().collection()),a&&e?a.filter(e):a},"source"),target:nr(function(e){var r=this[0],a;return r&&(a=r._private.target||r.cy().collection()),a&&e?a.filter(e):a},"target"),sources:Jd({attr:"source"}),targets:Jd({attr:"target"})});function Jd(t){return function(r){for(var a=[],n=0;n<this.length;n++){var o=this[n],i=o._private[t.attr];i&&a.push(i)}return this.spawn(a,!0).filter(r)}}ke(Pt,{edgesWith:nr(eh(),"edgesWith"),edgesTo:nr(eh({thisIsSrc:!0}),"edgesTo")});function eh(t){return function(r){var a=[],n=this._private.cy,o=t||{};we(r)&&(r=n.$(r));for(var i=0;i<r.length;i++)for(var s=r[i]._private.edges,l=0;l<s.length;l++){var u=s[l],c=u._private.data,d=this.hasElementWithId(c.source)&&r.hasElementWithId(c.target),h=r.hasElementWithId(c.source)&&this.hasElementWithId(c.target),p=d||h;!p||(o.thisIsSrc||o.thisIsTgt)&&(o.thisIsSrc&&!d||o.thisIsTgt&&!h)||a.push(u)}return this.spawn(a,!0)}}ke(Pt,{connectedEdges:nr(function(t){for(var e=[],r=this,a=0;a<r.length;a++){var n=r[a];if(!!n.isNode())for(var o=n._private.edges,i=0;i<o.length;i++){var s=o[i];e.push(s)}}return this.spawn(e,!0).filter(t)},"connectedEdges"),connectedNodes:nr(function(t){for(var e=[],r=this,a=0;a<r.length;a++){var n=r[a];!n.isEdge()||(e.push(n.source()[0]),e.push(n.target()[0]))}return this.spawn(e,!0).filter(t)},"connectedNodes"),parallelEdges:nr(th(),"parallelEdges"),codirectedEdges:nr(th({codirected:!0}),"codirectedEdges")});function th(t){var e={codirected:!1};return t=ke({},e,t),function(a){for(var n=[],o=this.edges(),i=t,s=0;s<o.length;s++)for(var l=o[s],u=l._private,c=u.source,d=c._private.data.id,h=u.data.target,p=c._private.edges,g=0;g<p.length;g++){var f=p[g],v=f._private.data,m=v.target,y=v.source,b=m===h&&y===d,x=d===m&&h===y;(i.codirected&&b||!i.codirected&&(b||x))&&n.push(f)}return this.spawn(n,!0).filter(a)}}ke(Pt,{components:function(e){var r=this,a=r.cy(),n=a.collection(),o=e==null?r.nodes():e.nodes(),i=[];e!=null&&o.empty()&&(o=e.sources());var s=function(c,d){n.merge(c),o.unmerge(c),d.merge(c)};if(o.empty())return r.spawn();var l=function(){var c=a.collection();i.push(c);var d=o[0];s(d,c),r.bfs({directed:!1,roots:d,visit:function(p){return s(p,c)}}),c.forEach(function(h){h.connectedEdges().forEach(function(p){r.has(p)&&c.has(p.source())&&c.has(p.target())&&c.merge(p)})})};do l();while(o.length>0);return i},component:function(){var e=this[0];return e.cy().mutableElements().components(e)[0]}});Pt.componentsOf=Pt.components;var Et=function(e,r){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(e===void 0){st("A collection must have a reference to the core");return}var n=new kr,o=!1;if(!r)r=[];else if(r.length>0&&Oe(r[0])&&!Rn(r[0])){o=!0;for(var i=[],s=new en,l=0,u=r.length;l<u;l++){var c=r[l];c.data==null&&(c.data={});var d=c.data;if(d.id==null)d.id=Kc();else if(e.hasElementWithId(d.id)||s.has(d.id))continue;var h=new eo(e,c,!1);i.push(h),s.add(d.id)}r=i}this.length=0;for(var p=0,g=r.length;p<g;p++){var f=r[p][0];if(f!=null){var v=f._private.data.id;(!a||!n.has(v))&&(a&&n.set(v,{index:this.length,ele:f}),this[this.length]=f,this.length++)}}this._private={eles:this,cy:e,get map(){return this.lazyMap==null&&this.rebuildMap(),this.lazyMap},set map(m){this.lazyMap=m},rebuildMap:function(){for(var y=this.lazyMap=new kr,b=this.eles,x=0;x<b.length;x++){var k=b[x];y.set(k.id(),{index:x,ele:k})}}},a&&(this._private.map=n),o&&this.restore()},Xe=eo.prototype=Et.prototype=Object.create(Array.prototype);Xe.instanceString=function(){return"collection"};Xe.spawn=function(t,e){return new Et(this.cy(),t,e)};Xe.spawnSelf=function(){return this.spawn(this)};Xe.cy=function(){return this._private.cy};Xe.renderer=function(){return this._private.cy.renderer()};Xe.element=function(){return this[0]};Xe.collection=function(){return Dc(this)?this:new Et(this._private.cy,[this])};Xe.unique=function(){return new Et(this._private.cy,this,!0)};Xe.hasElementWithId=function(t){return t=""+t,this._private.map.has(t)};Xe.getElementById=function(t){t=""+t;var e=this._private.cy,r=this._private.map.get(t);return r?r.ele:new Et(e)};Xe.$id=Xe.getElementById;Xe.poolIndex=function(){var t=this._private.cy,e=t._private.elements,r=this[0]._private.data.id;return e._private.map.get(r).index};Xe.indexOf=function(t){var e=t[0]._private.data.id;return this._private.map.get(e).index};Xe.indexOfId=function(t){return t=""+t,this._private.map.get(t).index};Xe.json=function(t){var e=this.element(),r=this.cy();if(e==null&&t)return this;if(e!=null){var a=e._private;if(Oe(t)){if(r.startBatch(),t.data){e.data(t.data);var n=a.data;if(e.isEdge()){var o=!1,i={},s=t.data.source,l=t.data.target;s!=null&&s!=n.source&&(i.source=""+s,o=!0),l!=null&&l!=n.target&&(i.target=""+l,o=!0),o&&(e=e.move(i))}else{var u="parent"in t.data,c=t.data.parent;u&&(c!=null||n.parent!=null)&&c!=n.parent&&(c===void 0&&(c=null),c!=null&&(c=""+c),e=e.move({parent:c}))}}t.position&&e.position(t.position);var d=function(f,v,m){var y=t[f];y!=null&&y!==a[f]&&(y?e[v]():e[m]())};return d("removed","remove","restore"),d("selected","select","unselect"),d("selectable","selectify","unselectify"),d("locked","lock","unlock"),d("grabbable","grabify","ungrabify"),d("pannable","panify","unpanify"),t.classes!=null&&e.classes(t.classes),r.endBatch(),this}else if(t===void 0){var h={data:xr(a.data),position:xr(a.position),group:a.group,removed:a.removed,selected:a.selected,selectable:a.selectable,locked:a.locked,grabbable:a.grabbable,pannable:a.pannable,classes:null};h.classes="";var p=0;return a.classes.forEach(function(g){return h.classes+=p++==0?g:" "+g}),h}}};Xe.jsons=function(){for(var t=[],e=0;e<this.length;e++){var r=this[e],a=r.json();t.push(a)}return t};Xe.clone=function(){for(var t=this.cy(),e=[],r=0;r<this.length;r++){var a=this[r],n=a.json(),o=new eo(t,n,!1);e.push(o)}return new Et(t,e)};Xe.copy=Xe.clone;Xe.restore=function(){for(var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=this,a=r.cy(),n=a._private,o=[],i=[],s,l=0,u=r.length;l<u;l++){var c=r[l];e&&!c.removed()||(c.isNode()?o.push(c):i.push(c))}s=o.concat(i);var d,h=function(){s.splice(d,1),d--};for(d=0;d<s.length;d++){var p=s[d],g=p._private,f=g.data;if(p.clearTraversalCache(),!(!e&&!g.removed)){if(f.id===void 0)f.id=Kc();else if(ce(f.id))f.id=""+f.id;else if(Zr(f.id)||!we(f.id)){st("Can not create element with invalid string ID `"+f.id+"`"),h();continue}else if(a.hasElementWithId(f.id)){st("Can not create second element with ID `"+f.id+"`"),h();continue}}var v=f.id;if(p.isNode()){var m=g.position;m.x==null&&(m.x=0),m.y==null&&(m.y=0)}if(p.isEdge()){for(var y=p,b=["source","target"],x=b.length,k=!1,E=0;E<x;E++){var _=b[E],T=f[_];ce(T)&&(T=f[_]=""+f[_]),T==null||T===""?(st("Can not create edge `"+v+"` with unspecified "+_),k=!0):a.hasElementWithId(T)||(st("Can not create edge `"+v+"` with nonexistant "+_+" `"+T+"`"),k=!0)}if(k){h();continue}var C=a.getElementById(f.source),D=a.getElementById(f.target);C.same(D)?C._private.edges.push(y):(C._private.edges.push(y),D._private.edges.push(y)),y._private.source=C,y._private.target=D}g.map=new kr,g.map.set(v,{ele:p,index:0}),g.removed=!1,e&&a.addToPool(p)}for(var L=0;L<o.length;L++){var A=o[L],O=A._private.data;ce(O.parent)&&(O.parent=""+O.parent);var I=O.parent,N=I!=null;if(N){var z=a.getElementById(I);if(z.empty())O.parent=void 0;else{for(var $=!1,B=z;!B.empty();){if(A.same(B)){$=!0,O.parent=void 0;break}B=B.parent()}$||(z[0]._private.children.push(A),A._private.parent=z[0],n.hasCompoundNodes=!0)}}}if(s.length>0){for(var R=s.length===r.length?r:new Et(a,s),H=0;H<R.length;H++){var M=R[H];M.isNode()||(M.parallelEdges().clearTraversalCache(),M.source().clearTraversalCache(),M.target().clearTraversalCache())}var j;n.hasCompoundNodes?j=a.collection().merge(R).merge(R.connectedNodes()).merge(R.parent()):j=R,j.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(t),t?R.emitAndNotify("add"):e&&R.emit("add")}return r};Xe.removed=function(){var t=this[0];return t&&t._private.removed};Xe.inside=function(){var t=this[0];return t&&!t._private.removed};Xe.remove=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=this,a=[],n={},o=r._private.cy;function i(I){for(var N=I._private.edges,z=0;z<N.length;z++)l(N[z])}function s(I){for(var N=I._private.children,z=0;z<N.length;z++)l(N[z])}function l(I){var N=n[I.id()];e&&I.removed()||N||(n[I.id()]=!0,I.isNode()?(a.push(I),i(I),s(I)):a.unshift(I))}for(var u=0,c=r.length;u<c;u++){var d=r[u];l(d)}function h(I,N){var z=I._private.edges;Jr(z,N),I.clearTraversalCache()}function p(I){I.clearTraversalCache()}var g=[];g.ids={};function f(I,N){N=N[0],I=I[0];var z=I._private.children,$=I.id();Jr(z,N),N._private.parent=null,g.ids[$]||(g.ids[$]=!0,g.push(I))}r.dirtyCompoundBoundsCache(),e&&o.removeFromPool(a);for(var v=0;v<a.length;v++){var m=a[v];if(m.isEdge()){var y=m.source()[0],b=m.target()[0];h(y,m),h(b,m);for(var x=m.parallelEdges(),k=0;k<x.length;k++){var E=x[k];p(E),E.isBundledBezier()&&E.dirtyBoundingBoxCache()}}else{var _=m.parent();_.length!==0&&f(_,m)}e&&(m._private.removed=!0)}var T=o._private.elements;o._private.hasCompoundNodes=!1;for(var C=0;C<T.length;C++){var D=T[C];if(D.isParent()){o._private.hasCompoundNodes=!0;break}}var L=new Et(this.cy(),a);L.size()>0&&(t?L.emitAndNotify("remove"):e&&L.emit("remove"));for(var A=0;A<g.length;A++){var O=g[A];(!e||!O.removed())&&O.updateStyle()}return L};Xe.move=function(t){var e=this._private.cy,r=this,a=!1,n=!1,o=function(g){return g==null?g:""+g};if(t.source!==void 0||t.target!==void 0){var i=o(t.source),s=o(t.target),l=i!=null&&e.hasElementWithId(i),u=s!=null&&e.hasElementWithId(s);(l||u)&&(e.batch(function(){r.remove(a,n),r.emitAndNotify("moveout");for(var p=0;p<r.length;p++){var g=r[p],f=g._private.data;g.isEdge()&&(l&&(f.source=i),u&&(f.target=s))}r.restore(a,n)}),r.emitAndNotify("move"))}else if(t.parent!==void 0){var c=o(t.parent),d=c===null||e.hasElementWithId(c);if(d){var h=c===null?void 0:c;e.batch(function(){var p=r.remove(a,n);p.emitAndNotify("moveout");for(var g=0;g<r.length;g++){var f=r[g],v=f._private.data;f.isNode()&&(v.parent=h)}p.restore(a,n)}),r.emitAndNotify("move")}}return this};[md,cy,co,ia,cn,Sy,ho,Vy,Qd,Yd,Yy,mo,yo,Ct,la,Pt].forEach(function(t){ke(Xe,t)});var Jy={add:function(e){var r,a=this;if(Jt(e)){var n=e;if(n._private.cy===a)r=n.restore();else{for(var o=[],i=0;i<n.length;i++){var s=n[i];o.push(s.json())}r=new Et(a,o)}}else if(Qe(e)){var l=e;r=new Et(a,l)}else if(Oe(e)&&(Qe(e.nodes)||Qe(e.edges))){for(var u=e,c=[],d=["nodes","edges"],h=0,p=d.length;h<p;h++){var g=d[h],f=u[g];if(Qe(f))for(var v=0,m=f.length;v<m;v++){var y=ke({group:g},f[v]);c.push(y)}}r=new Et(a,c)}else{var b=e;r=new eo(a,b).collection()}return r},remove:function(e){if(!Jt(e)){if(we(e)){var r=e;e=this.$(r)}}return e.remove()}};function eb(t,e,r,a){var n=4,o=.001,i=1e-7,s=10,l=11,u=1/(l-1),c=typeof Float32Array!="undefined";if(arguments.length!==4)return!1;for(var d=0;d<4;++d)if(typeof arguments[d]!="number"||isNaN(arguments[d])||!isFinite(arguments[d]))return!1;t=Math.min(t,1),r=Math.min(r,1),t=Math.max(t,0),r=Math.max(r,0);var h=c?new Float32Array(l):new Array(l);function p(D,L){return 1-3*L+3*D}function g(D,L){return 3*L-6*D}function f(D){return 3*D}function v(D,L,A){return((p(L,A)*D+g(L,A))*D+f(L))*D}function m(D,L,A){return 3*p(L,A)*D*D+2*g(L,A)*D+f(L)}function y(D,L){for(var A=0;A<n;++A){var O=m(L,t,r);if(O===0)return L;var I=v(L,t,r)-D;L-=I/O}return L}function b(){for(var D=0;D<l;++D)h[D]=v(D*u,t,r)}function x(D,L,A){var O,I,N=0;do I=L+(A-L)/2,O=v(I,t,r)-D,O>0?A=I:L=I;while(Math.abs(O)>i&&++N<s);return I}function k(D){for(var L=0,A=1,O=l-1;A!==O&&h[A]<=D;++A)L+=u;--A;var I=(D-h[A])/(h[A+1]-h[A]),N=L+I*u,z=m(N,t,r);return z>=o?y(D,N):z===0?N:x(D,L,L+u)}var E=!1;function _(){E=!0,(t!==e||r!==a)&&b()}var T=function(L){return E||_(),t===e&&r===a?L:L===0?0:L===1?1:v(k(L),e,a)};T.getControlPoints=function(){return[{x:t,y:e},{x:r,y:a}]};var C="generateBezier("+[t,e,r,a]+")";return T.toString=function(){return C},T}var tb=function(){function t(a){return-a.tension*a.x-a.friction*a.v}function e(a,n,o){var i={x:a.x+o.dx*n,v:a.v+o.dv*n,tension:a.tension,friction:a.friction};return{dx:i.v,dv:t(i)}}function r(a,n){var o={dx:a.v,dv:t(a)},i=e(a,n*.5,o),s=e(a,n*.5,i),l=e(a,n,s),u=1/6*(o.dx+2*(i.dx+s.dx)+l.dx),c=1/6*(o.dv+2*(i.dv+s.dv)+l.dv);return a.x=a.x+u*n,a.v=a.v+c*n,a}return function a(n,o,i){var s={x:-1,v:0,tension:null,friction:null},l=[0],u=0,c=1/1e4,d=16/1e3,h,p,g;for(n=parseFloat(n)||500,o=parseFloat(o)||20,i=i||null,s.tension=n,s.friction=o,h=i!==null,h?(u=a(n,o),p=u/i*d):p=d;g=r(g||s,p),l.push(1+g.x),u+=16,Math.abs(g.x)>c&&Math.abs(g.v)>c;);return h?function(f){return l[f*(l.length-1)|0]}:u}}(),Ue=function(e,r,a,n){var o=eb(e,r,a,n);return function(i,s,l){return i+(s-i)*o(l)}},xo={linear:function(e,r,a){return e+(r-e)*a},ease:Ue(.25,.1,.25,1),"ease-in":Ue(.42,0,1,1),"ease-out":Ue(0,0,.58,1),"ease-in-out":Ue(.42,0,.58,1),"ease-in-sine":Ue(.47,0,.745,.715),"ease-out-sine":Ue(.39,.575,.565,1),"ease-in-out-sine":Ue(.445,.05,.55,.95),"ease-in-quad":Ue(.55,.085,.68,.53),"ease-out-quad":Ue(.25,.46,.45,.94),"ease-in-out-quad":Ue(.455,.03,.515,.955),"ease-in-cubic":Ue(.55,.055,.675,.19),"ease-out-cubic":Ue(.215,.61,.355,1),"ease-in-out-cubic":Ue(.645,.045,.355,1),"ease-in-quart":Ue(.895,.03,.685,.22),"ease-out-quart":Ue(.165,.84,.44,1),"ease-in-out-quart":Ue(.77,0,.175,1),"ease-in-quint":Ue(.755,.05,.855,.06),"ease-out-quint":Ue(.23,1,.32,1),"ease-in-out-quint":Ue(.86,0,.07,1),"ease-in-expo":Ue(.95,.05,.795,.035),"ease-out-expo":Ue(.19,1,.22,1),"ease-in-out-expo":Ue(1,0,0,1),"ease-in-circ":Ue(.6,.04,.98,.335),"ease-out-circ":Ue(.075,.82,.165,1),"ease-in-out-circ":Ue(.785,.135,.15,.86),spring:function(e,r,a){if(a===0)return xo.linear;var n=tb(e,r,a);return function(o,i,s){return o+(i-o)*n(s)}},"cubic-bezier":Ue};function rh(t,e,r,a,n){if(a===1||e===r)return r;var o=n(e,r,a);return t==null||((t.roundValue||t.color)&&(o=Math.round(o)),t.min!==void 0&&(o=Math.max(o,t.min)),t.max!==void 0&&(o=Math.min(o,t.max))),o}function ah(t,e){return t.pfValue!=null||t.value!=null?t.pfValue!=null&&(e==null||e.type.units!=="%")?t.pfValue:t.value:t}function vn(t,e,r,a,n){var o=n!=null?n.type:null;r<0?r=0:r>1&&(r=1);var i=ah(t,n),s=ah(e,n);if(ce(i)&&ce(s))return rh(o,i,s,r,a);if(Qe(i)&&Qe(s)){for(var l=[],u=0;u<s.length;u++){var c=i[u],d=s[u];if(c!=null&&d!=null){var h=rh(o,c,d,r,a);l.push(h)}else l.push(d)}return l}}function rb(t,e,r,a){var n=!a,o=t._private,i=e._private,s=i.easing,l=i.startTime,u=a?t:t.cy(),c=u.style();if(!i.easingImpl)if(s==null)i.easingImpl=xo.linear;else{var d;if(we(s)){var h=c.parse("transition-timing-function",s);d=h.value}else d=s;var p,g;we(d)?(p=d,g=[]):(p=d[1],g=d.slice(2).map(function(R){return+R})),g.length>0?(p==="spring"&&g.push(i.duration),i.easingImpl=xo[p].apply(null,g)):i.easingImpl=xo[p]}var f=i.easingImpl,v;if(i.duration===0?v=1:v=(r-l)/i.duration,i.applying&&(v=i.progress),v<0?v=0:v>1&&(v=1),i.delay==null){var m=i.startPosition,y=i.position;if(y&&n&&!t.locked()){var b={};ti(m.x,y.x)&&(b.x=vn(m.x,y.x,v,f)),ti(m.y,y.y)&&(b.y=vn(m.y,y.y,v,f)),t.position(b)}var x=i.startPan,k=i.pan,E=o.pan,_=k!=null&&a;_&&(ti(x.x,k.x)&&(E.x=vn(x.x,k.x,v,f)),ti(x.y,k.y)&&(E.y=vn(x.y,k.y,v,f)),t.emit("pan"));var T=i.startZoom,C=i.zoom,D=C!=null&&a;D&&(ti(T,C)&&(o.zoom=Hn(o.minZoom,vn(T,C,v,f),o.maxZoom)),t.emit("zoom")),(_||D)&&t.emit("viewport");var L=i.style;if(L&&L.length>0&&n){for(var A=0;A<L.length;A++){var O=L[A],I=O.name,N=O,z=i.startStyle[I],$=c.properties[z.name],B=vn(z,N,v,f,$);c.overrideBypass(t,I,B)}t.emit("style")}}return i.progress=v,v}function ti(t,e){return t==null||e==null?!1:ce(t)&&ce(e)?!0:!!(t&&e)}function ab(t,e,r,a){var n=e._private;n.started=!0,n.startTime=r-n.progress*n.duration}function nh(t,e){var r=e._private.aniEles,a=[];function n(c,d){var h=c._private,p=h.animation.current,g=h.animation.queue,f=!1;if(p.length===0){var v=g.shift();v&&p.push(v)}for(var m=function(E){for(var _=E.length-1;_>=0;_--){var T=E[_];T()}E.splice(0,E.length)},y=p.length-1;y>=0;y--){var b=p[y],x=b._private;if(x.stopped){p.splice(y,1),x.hooked=!1,x.playing=!1,x.started=!1,m(x.frames);continue}!x.playing&&!x.applying||(x.playing&&x.applying&&(x.applying=!1),x.started||ab(c,b,t),rb(c,b,t,d),x.applying&&(x.applying=!1),m(x.frames),x.step!=null&&x.step(t),b.completed()&&(p.splice(y,1),x.hooked=!1,x.playing=!1,x.started=!1,m(x.completes)),f=!0)}return!d&&p.length===0&&g.length===0&&a.push(c),f}for(var o=!1,i=0;i<r.length;i++){var s=r[i],l=n(s);o=o||l}var u=n(e,!0);(o||u)&&(r.length>0?e.notify("draw",r):e.notify("draw")),r.unmerge(a),e.emit("step")}var nb={animate:Ve.animate(),animation:Ve.animation(),animated:Ve.animated(),clearQueue:Ve.clearQueue(),delay:Ve.delay(),delayAnimation:Ve.delayAnimation(),stop:Ve.stop(),addToAnimationPool:function(e){var r=this;!r.styleEnabled()||r._private.aniEles.merge(e)},stopAnimationLoop:function(){this._private.animationsRunning=!1},startAnimationLoop:function(){var e=this;if(e._private.animationsRunning=!0,!e.styleEnabled())return;function r(){!e._private.animationsRunning||Zi(function(o){nh(o,e),r()})}var a=e.renderer();a&&a.beforeRender?a.beforeRender(function(o,i){nh(i,e)},a.beforeRenderPriorities.animations):r()}},ib={qualifierCompare:function(e,r){return e==null||r==null?e==null&&r==null:e.sameText(r)},eventMatches:function(e,r,a){var n=r.qualifier;return n!=null?e!==a.target&&Rn(a.target)&&n.matches(a.target):!0},addEventFields:function(e,r){r.cy=e,r.target=e},callbackContext:function(e,r,a){return r.qualifier!=null?a.target:e}},ko=function(e){return we(e)?new aa(e):e},ih={createEmitter:function(){var e=this._private;return e.emitter||(e.emitter=new vo(ib,this)),this},emitter:function(){return this._private.emitter},on:function(e,r,a){return this.emitter().on(e,ko(r),a),this},removeListener:function(e,r,a){return this.emitter().removeListener(e,ko(r),a),this},removeAllListeners:function(){return this.emitter().removeAllListeners(),this},one:function(e,r,a){return this.emitter().one(e,ko(r),a),this},once:function(e,r,a){return this.emitter().one(e,ko(r),a),this},emit:function(e,r){return this.emitter().emit(e,r),this},emitAndNotify:function(e,r){return this.emit(e),this.notify(e,r),this}};Ve.eventAliasesOn(ih);var Gs={png:function(e){var r=this._private.renderer;return e=e||{},r.png(e)},jpg:function(e){var r=this._private.renderer;return e=e||{},e.bg=e.bg||"#fff",r.jpg(e)}};Gs.jpeg=Gs.jpg;var _o={layout:function(e){var r=this;if(e==null){st("Layout options must be specified to make a layout");return}if(e.name==null){st("A `name` must be specified to make a layout");return}var a=e.name,n=r.extension("layout",a);if(n==null){st("No such layout `"+a+"` found.  Did you forget to import it and `cytoscape.use()` it?");return}var o;we(e.eles)?o=r.$(e.eles):o=e.eles!=null?e.eles:r.$();var i=new n(ke({},e,{cy:r,eles:o}));return i}};_o.createLayout=_o.makeLayout=_o.layout;var ob={notify:function(e,r){var a=this._private;if(this.batching()){a.batchNotifications=a.batchNotifications||{};var n=a.batchNotifications[e]=a.batchNotifications[e]||this.collection();r!=null&&n.merge(r);return}if(!!a.notificationsEnabled){var o=this.renderer();this.destroyed()||!o||o.notify(e,r)}},notifications:function(e){var r=this._private;return e===void 0?r.notificationsEnabled:(r.notificationsEnabled=!!e,this)},noNotifications:function(e){this.notifications(!1),e(),this.notifications(!0)},batching:function(){return this._private.batchCount>0},startBatch:function(){var e=this._private;return e.batchCount==null&&(e.batchCount=0),e.batchCount===0&&(e.batchStyleEles=this.collection(),e.batchNotifications={}),e.batchCount++,this},endBatch:function(){var e=this._private;if(e.batchCount===0)return this;if(e.batchCount--,e.batchCount===0){e.batchStyleEles.updateStyle();var r=this.renderer();Object.keys(e.batchNotifications).forEach(function(a){var n=e.batchNotifications[a];n.empty()?r.notify(a):r.notify(a,n)})}return this},batch:function(e){return this.startBatch(),e(),this.endBatch(),this},batchData:function(e){var r=this;return this.batch(function(){for(var a=Object.keys(e),n=0;n<a.length;n++){var o=a[n],i=e[o],s=r.getElementById(o);s.data(i)}})}},sb=_t({hideEdgesOnViewport:!1,textureOnViewport:!1,motionBlur:!1,motionBlurOpacity:.05,pixelRatio:void 0,desktopTapThreshold:4,touchTapThreshold:8,wheelSensitivity:1,debug:!1,showFps:!1}),Zs={renderTo:function(e,r,a,n){var o=this._private.renderer;return o.renderTo(e,r,a,n),this},renderer:function(){return this._private.renderer},forceRender:function(){return this.notify("draw"),this},resize:function(){return this.invalidateSize(),this.emitAndNotify("resize"),this},initRenderer:function(e){var r=this,a=r.extension("renderer",e.name);if(a==null){st("Can not initialise: No such renderer `".concat(e.name,"` found. Did you forget to import it and `cytoscape.use()` it?"));return}e.wheelSensitivity!==void 0&&Ke("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");var n=sb(e);n.cy=r,r._private.renderer=new a(n),this.notify("init")},destroyRenderer:function(){var e=this;e.notify("destroy");var r=e.container();if(r)for(r._cyreg=null;r.childNodes.length>0;)r.removeChild(r.childNodes[0]);e._private.renderer=null,e.mutableElements().forEach(function(a){var n=a._private;n.rscratch={},n.rstyle={},n.animation.current=[],n.animation.queue=[]})},onRender:function(e){return this.on("render",e)},offRender:function(e){return this.off("render",e)}};Zs.invalidateDimensions=Zs.resize;var Co={collection:function(e,r){return we(e)?this.$(e):Jt(e)?e.collection():Qe(e)?new Et(this,e,r):new Et(this)},nodes:function(e){var r=this.$(function(a){return a.isNode()});return e?r.filter(e):r},edges:function(e){var r=this.$(function(a){return a.isEdge()});return e?r.filter(e):r},$:function(e){var r=this._private.elements;return e?r.filter(e):r.spawnSelf()},mutableElements:function(){return this._private.elements}};Co.elements=Co.filter=Co.$;var At={},ri="t",lb="f";At.apply=function(t){for(var e=this,r=e._private,a=r.cy,n=a.collection(),o=0;o<t.length;o++){var i=t[o],s=e.getContextMeta(i);if(!s.empty){var l=e.getContextStyle(s),u=e.applyContextStyle(s,l,i);i._private.appliedInitStyle?e.updateTransitions(i,u.diffProps):i._private.appliedInitStyle=!0;var c=e.updateStyleHints(i);c&&n.push(i)}}return n};At.getPropertiesDiff=function(t,e){var r=this,a=r._private.propDiffs=r._private.propDiffs||{},n=t+"-"+e,o=a[n];if(o)return o;for(var i=[],s={},l=0;l<r.length;l++){var u=r[l],c=t[l]===ri,d=e[l]===ri,h=c!==d,p=u.mappedProperties.length>0;if(h||d&&p){var g=void 0;h&&p||h?g=u.properties:p&&(g=u.mappedProperties);for(var f=0;f<g.length;f++){for(var v=g[f],m=v.name,y=!1,b=l+1;b<r.length;b++){var x=r[b],k=e[b]===ri;if(!!k&&(y=x.properties[v.name]!=null,y))break}!s[m]&&!y&&(s[m]=!0,i.push(m))}}}return a[n]=i,i};At.getContextMeta=function(t){for(var e=this,r="",a,n=t._private.styleCxtKey||"",o=0;o<e.length;o++){var i=e[o],s=i.selector&&i.selector.matches(t);s?r+=ri:r+=lb}return a=e.getPropertiesDiff(n,r),t._private.styleCxtKey=r,{key:r,diffPropNames:a,empty:a.length===0}};At.getContextStyle=function(t){var e=t.key,r=this,a=this._private.contextStyles=this._private.contextStyles||{};if(a[e])return a[e];for(var n={_private:{key:e}},o=0;o<r.length;o++){var i=r[o],s=e[o]===ri;if(!!s)for(var l=0;l<i.properties.length;l++){var u=i.properties[l];n[u.name]=u}}return a[e]=n,n};At.applyContextStyle=function(t,e,r){for(var a=this,n=t.diffPropNames,o={},i=a.types,s=0;s<n.length;s++){var l=n[s],u=e[l],c=r.pstyle(l);if(!u)if(c)c.bypass?u={name:l,deleteBypassed:!0}:u={name:l,delete:!0};else continue;if(c!==u){if(u.mapped===i.fn&&c!=null&&c.mapping!=null&&c.mapping.value===u.value){var d=c.mapping,h=d.fnValue=u.value(r);if(h===d.prevFnValue)continue}var p=o[l]={prev:c};a.applyParsedProperty(r,u),p.next=r.pstyle(l),p.next&&p.next.bypass&&(p.next=p.next.bypassed)}}return{diffProps:o}};At.updateStyleHints=function(t){var e=t._private,r=this,a=r.propertyGroupNames,n=r.propertyGroupKeys,o=function(ie,pe,De){return r.getPropertiesHash(ie,pe,De)},i=e.styleKey;if(t.removed())return!1;var s=e.group==="nodes",l=t._private.style;a=Object.keys(l);for(var u=0;u<n.length;u++){var c=n[u];e.styleKeys[c]=[Ja,Nn]}for(var d=function(ie,pe){return e.styleKeys[pe][0]=Vn(ie,e.styleKeys[pe][0])},h=function(ie,pe){return e.styleKeys[pe][1]=jn(ie,e.styleKeys[pe][1])},p=function(ie,pe){d(ie,pe),h(ie,pe)},g=function(ie,pe){for(var De=0;De<ie.length;De++){var Te=ie.charCodeAt(De);d(Te,pe),h(Te,pe)}},f=2e9,v=function(ie){return-128<ie&&ie<128&&Math.floor(ie)!==ie?f-(ie*1024|0):ie},m=0;m<a.length;m++){var y=a[m],b=l[y];if(b!=null){var x=this.properties[y],k=x.type,E=x.groupKey,_=void 0;x.hashOverride!=null?_=x.hashOverride(t,b):b.pfValue!=null&&(_=b.pfValue);var T=x.enums==null?b.value:null,C=_!=null,D=T!=null,L=C||D,A=b.units;if(k.number&&L&&!k.multiple){var O=C?_:T;p(v(O),E),!C&&A!=null&&g(A,E)}else g(b.strValue,E)}}for(var I=[Ja,Nn],N=0;N<n.length;N++){var z=n[N],$=e.styleKeys[z];I[0]=Vn($[0],I[0]),I[1]=jn($[1],I[1])}e.styleKey=km(I[0],I[1]);var B=e.styleKeys;e.labelDimsKey=Wr(B.labelDimensions);var R=o(t,["label"],B.labelDimensions);if(e.labelKey=Wr(R),e.labelStyleKey=Wr(Wi(B.commonLabel,R)),!s){var H=o(t,["source-label"],B.labelDimensions);e.sourceLabelKey=Wr(H),e.sourceLabelStyleKey=Wr(Wi(B.commonLabel,H));var M=o(t,["target-label"],B.labelDimensions);e.targetLabelKey=Wr(M),e.targetLabelStyleKey=Wr(Wi(B.commonLabel,M))}if(s){var j=e.styleKeys,W=j.nodeBody,te=j.nodeBorder,X=j.backgroundImage,Y=j.compound,F=j.pie,Z=[W,te,X,Y,F].filter(function(se){return se!=null}).reduce(Wi,[Ja,Nn]);e.nodeKey=Wr(Z),e.hasPie=F!=null&&F[0]!==Ja&&F[1]!==Nn}return i!==e.styleKey};At.clearStyleHints=function(t){var e=t._private;e.styleCxtKey="",e.styleKeys={},e.styleKey=null,e.labelKey=null,e.labelStyleKey=null,e.sourceLabelKey=null,e.sourceLabelStyleKey=null,e.targetLabelKey=null,e.targetLabelStyleKey=null,e.nodeKey=null,e.hasPie=null};At.applyParsedProperty=function(t,e){var r=this,a=e,n=t._private.style,o,i=r.types,s=r.properties[a.name].type,l=a.bypass,u=n[a.name],c=u&&u.bypass,d=t._private,h="mapping",p=function(W){return W==null?null:W.pfValue!=null?W.pfValue:W.value},g=function(){var W=p(u),te=p(a);r.checkTriggers(t,a.name,W,te)};if(a&&a.name.substr(0,3)==="pie"&&Ke("The pie style properties are deprecated.  Create charts using background images instead."),e.name==="curve-style"&&t.isEdge()&&(e.value!=="bezier"&&t.isLoop()||e.value==="haystack"&&(t.source().isParent()||t.target().isParent()))&&(a=e=this.parse(e.name,"bezier",l)),a.delete)return n[a.name]=void 0,g(),!0;if(a.deleteBypassed)return u?u.bypass?(u.bypassed=void 0,g(),!0):!1:(g(),!0);if(a.deleteBypass)return u?u.bypass?(n[a.name]=u.bypassed,g(),!0):!1:(g(),!0);var f=function(){Ke("Do not assign mappings to elements without corresponding data (i.e. ele `"+t.id()+"` has no mapping for property `"+a.name+"` with data field `"+a.field+"`); try a `["+a.field+"]` selector to limit scope to elements with `"+a.field+"` defined")};switch(a.mapped){case i.mapData:{for(var v=a.field.split("."),m=d.data,y=0;y<v.length&&m;y++){var b=v[y];m=m[b]}if(m==null)return f(),!1;var x;if(ce(m)){var k=a.fieldMax-a.fieldMin;k===0?x=0:x=(m-a.fieldMin)/k}else return Ke("Do not use continuous mappers without specifying numeric data (i.e. `"+a.field+": "+m+"` for `"+t.id()+"` is non-numeric)"),!1;if(x<0?x=0:x>1&&(x=1),s.color){var E=a.valueMin[0],_=a.valueMax[0],T=a.valueMin[1],C=a.valueMax[1],D=a.valueMin[2],L=a.valueMax[2],A=a.valueMin[3]==null?1:a.valueMin[3],O=a.valueMax[3]==null?1:a.valueMax[3],I=[Math.round(E+(_-E)*x),Math.round(T+(C-T)*x),Math.round(D+(L-D)*x),Math.round(A+(O-A)*x)];o={bypass:a.bypass,name:a.name,value:I,strValue:"rgb("+I[0]+", "+I[1]+", "+I[2]+")"}}else if(s.number){var N=a.valueMin+(a.valueMax-a.valueMin)*x;o=this.parse(a.name,N,a.bypass,h)}else return!1;if(!o)return f(),!1;o.mapping=a,a=o;break}case i.data:{for(var z=a.field.split("."),$=d.data,B=0;B<z.length&&$;B++){var R=z[B];$=$[R]}if($!=null&&(o=this.parse(a.name,$,a.bypass,h)),!o)return f(),!1;o.mapping=a,a=o;break}case i.fn:{var H=a.value,M=a.fnValue!=null?a.fnValue:H(t);if(a.prevFnValue=M,M==null)return Ke("Custom function mappers may not return null (i.e. `"+a.name+"` for ele `"+t.id()+"` is null)"),!1;if(o=this.parse(a.name,M,a.bypass,h),!o)return Ke("Custom function mappers may not return invalid values for the property type (i.e. `"+a.name+"` for ele `"+t.id()+"` is invalid)"),!1;o.mapping=xr(a),a=o;break}case void 0:break;default:return!1}return l?(c?a.bypassed=u.bypassed:a.bypassed=u,n[a.name]=a):c?u.bypassed=a:n[a.name]=a,g(),!0};At.cleanElements=function(t,e){for(var r=0;r<t.length;r++){var a=t[r];if(this.clearStyleHints(a),a.dirtyCompoundBoundsCache(),a.dirtyBoundingBoxCache(),!e)a._private.style={};else for(var n=a._private.style,o=Object.keys(n),i=0;i<o.length;i++){var s=o[i],l=n[s];l!=null&&(l.bypass?l.bypassed=null:n[s]=null)}}};At.update=function(){var t=this._private.cy,e=t.mutableElements();e.updateStyle()};At.updateTransitions=function(t,e){var r=this,a=t._private,n=t.pstyle("transition-property").value,o=t.pstyle("transition-duration").pfValue,i=t.pstyle("transition-delay").pfValue;if(n.length>0&&o>0){for(var s={},l=!1,u=0;u<n.length;u++){var c=n[u],d=t.pstyle(c),h=e[c];if(!!h){var p=h.prev,g=p,f=h.next!=null?h.next:d,v=!1,m=void 0,y=1e-6;!g||(ce(g.pfValue)&&ce(f.pfValue)?(v=f.pfValue-g.pfValue,m=g.pfValue+y*v):ce(g.value)&&ce(f.value)?(v=f.value-g.value,m=g.value+y*v):Qe(g.value)&&Qe(f.value)&&(v=g.value[0]!==f.value[0]||g.value[1]!==f.value[1]||g.value[2]!==f.value[2],m=g.strValue),v&&(s[c]=f.strValue,this.applyBypass(t,c,m),l=!0))}}if(!l)return;a.transitioning=!0,new ln(function(b){i>0?t.delayAnimation(i).play().promise().then(b):b()}).then(function(){return t.animation({style:s,duration:o,easing:t.pstyle("transition-timing-function").value,queue:!1}).play().promise()}).then(function(){r.removeBypasses(t,n),t.emitAndNotify("style"),a.transitioning=!1})}else a.transitioning&&(this.removeBypasses(t,n),t.emitAndNotify("style"),a.transitioning=!1)};At.checkTrigger=function(t,e,r,a,n,o){var i=this.properties[e],s=n(i);s!=null&&s(r,a)&&o(i)};At.checkZOrderTrigger=function(t,e,r,a){var n=this;this.checkTrigger(t,e,r,a,function(o){return o.triggersZOrder},function(){n._private.cy.notify("zorder",t)})};At.checkBoundsTrigger=function(t,e,r,a){this.checkTrigger(t,e,r,a,function(n){return n.triggersBounds},function(n){t.dirtyCompoundBoundsCache(),t.dirtyBoundingBoxCache(),e==="curve-style"&&(r==="bezier"||a==="bezier")&&n.triggersBoundsOfParallelBeziers&&t.parallelEdges().forEach(function(o){o.isBundledBezier()&&o.dirtyBoundingBoxCache()})})};At.checkTriggers=function(t,e,r,a){t.dirtyStyleCache(),this.checkZOrderTrigger(t,e,r,a),this.checkBoundsTrigger(t,e,r,a)};var ai={};ai.applyBypass=function(t,e,r,a){var n=this,o=[],i=!0;if(e==="*"||e==="**"){if(r!==void 0)for(var s=0;s<n.properties.length;s++){var l=n.properties[s],u=l.name,c=this.parse(u,r,!0);c&&o.push(c)}}else if(we(e)){var d=this.parse(e,r,!0);d&&o.push(d)}else if(Oe(e)){var h=e;a=r;for(var p=Object.keys(h),g=0;g<p.length;g++){var f=p[g],v=h[f];if(v===void 0&&(v=h[Gi(f)]),v!==void 0){var m=this.parse(f,v,!0);m&&o.push(m)}}}else return!1;if(o.length===0)return!1;for(var y=!1,b=0;b<t.length;b++){for(var x=t[b],k={},E=void 0,_=0;_<o.length;_++){var T=o[_];if(a){var C=x.pstyle(T.name);E=k[T.name]={prev:C}}y=this.applyParsedProperty(x,xr(T))||y,a&&(E.next=x.pstyle(T.name))}y&&this.updateStyleHints(x),a&&this.updateTransitions(x,k,i)}return y};ai.overrideBypass=function(t,e,r){e=Es(e);for(var a=0;a<t.length;a++){var n=t[a],o=n._private.style[e],i=this.properties[e].type,s=i.color,l=i.mutiple,u=o?o.pfValue!=null?o.pfValue:o.value:null;!o||!o.bypass?this.applyBypass(n,e,r):(o.value=r,o.pfValue!=null&&(o.pfValue=r),s?o.strValue="rgb("+r.join(",")+")":l?o.strValue=r.join(" "):o.strValue=""+r,this.updateStyleHints(n)),this.checkTriggers(n,e,u,r)}};ai.removeAllBypasses=function(t,e){return this.removeBypasses(t,this.propertyNames,e)};ai.removeBypasses=function(t,e,r){for(var a=!0,n=0;n<t.length;n++){for(var o=t[n],i={},s=0;s<e.length;s++){var l=e[s],u=this.properties[l],c=o.pstyle(u.name);if(!(!c||!c.bypass)){var d="",h=this.parse(l,d,!0),p=i[u.name]={prev:c};this.applyParsedProperty(o,h),p.next=o.pstyle(u.name)}}this.updateStyleHints(o),r&&this.updateTransitions(o,i,a)}};var Ws={};Ws.getEmSizeInPixels=function(){var t=this.containerCss("font-size");return t!=null?parseFloat(t):1};Ws.containerCss=function(t){var e=this._private.cy,r=e.container();if(tt&&r&&tt.getComputedStyle)return tt.getComputedStyle(r).getPropertyValue(t)};var _r={};_r.getRenderedStyle=function(t,e){return e?this.getStylePropertyValue(t,e,!0):this.getRawStyle(t,!0)};_r.getRawStyle=function(t,e){var r=this;if(t=t[0],t){for(var a={},n=0;n<r.properties.length;n++){var o=r.properties[n],i=r.getStylePropertyValue(t,o.name,e);i!=null&&(a[o.name]=i,a[Gi(o.name)]=i)}return a}};_r.getIndexedStyle=function(t,e,r,a){var n=t.pstyle(e)[r][a];return n??t.cy().style().getDefaultProperty(e)[r][0]};_r.getStylePropertyValue=function(t,e,r){var a=this;if(t=t[0],t){var n=a.properties[e];n.alias&&(n=n.pointsTo);var o=n.type,i=t.pstyle(n.name);if(i){var s=i.value,l=i.units,u=i.strValue;if(r&&o.number&&s!=null&&ce(s)){var c=t.cy().zoom(),d=function(v){return v*c},h=function(v,m){return d(v)+m},p=Qe(s),g=p?l.every(function(f){return f!=null}):l!=null;return g?p?s.map(function(f,v){return h(f,l[v])}).join(" "):h(s,l):p?s.map(function(f){return we(f)?f:""+d(f)}).join(" "):""+d(s)}else if(u!=null)return u}return null}};_r.getAnimationStartStyle=function(t,e){for(var r={},a=0;a<e.length;a++){var n=e[a],o=n.name,i=t.pstyle(o);i!==void 0&&(Oe(i)?i=this.parse(o,i.strValue):i=this.parse(o,i)),i&&(r[o]=i)}return r};_r.getPropsList=function(t){var e=this,r=[],a=t,n=e.properties;if(a)for(var o=Object.keys(a),i=0;i<o.length;i++){var s=o[i],l=a[s],u=n[s]||n[Es(s)],c=this.parse(u.name,l);c&&r.push(c)}return r};_r.getNonDefaultPropertiesHash=function(t,e,r){var a=r.slice(),n,o,i,s,l,u;for(l=0;l<e.length;l++)if(n=e[l],o=t.pstyle(n,!1),o!=null)if(o.pfValue!=null)a[0]=Vn(s,a[0]),a[1]=jn(s,a[1]);else for(i=o.strValue,u=0;u<i.length;u++)s=i.charCodeAt(u),a[0]=Vn(s,a[0]),a[1]=jn(s,a[1]);return a};_r.getPropertiesHash=_r.getNonDefaultPropertiesHash;var Eo={};Eo.appendFromJson=function(t){for(var e=this,r=0;r<t.length;r++){var a=t[r],n=a.selector,o=a.style||a.css,i=Object.keys(o);e.selector(n);for(var s=0;s<i.length;s++){var l=i[s],u=o[l];e.css(l,u)}}return e};Eo.fromJson=function(t){var e=this;return e.resetToDefault(),e.appendFromJson(t),e};Eo.json=function(){for(var t=[],e=this.defaultLength;e<this.length;e++){for(var r=this[e],a=r.selector,n=r.properties,o={},i=0;i<n.length;i++){var s=n[i];o[s.name]=s.strValue}t.push({selector:a?a.toString():"core",style:o})}return t};var Js={};Js.appendFromString=function(t){var e=this,r=this,a=""+t,n,o,i;a=a.replace(/[/][*](\s|.)+?[*][/]/g,"");function s(){a.length>n.length?a=a.substr(n.length):a=""}function l(){o.length>i.length?o=o.substr(i.length):o=""}for(;;){var u=a.match(/^\s*$/);if(u)break;var c=a.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);if(!c){Ke("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: "+a);break}n=c[0];var d=c[1];if(d!=="core"){var h=new aa(d);if(h.invalid){Ke("Skipping parsing of block: Invalid selector found in string stylesheet: "+d),s();continue}}var p=c[2],g=!1;o=p;for(var f=[];;){var v=o.match(/^\s*$/);if(v)break;var m=o.match(/^\s*(.+?)\s*:\s*(.+?)\s*;/);if(!m){Ke("Skipping parsing of block: Invalid formatting of style property and value definitions found in:"+p),g=!0;break}i=m[0];var y=m[1],b=m[2],x=e.properties[y];if(!x){Ke("Skipping property: Invalid property name in: "+i),l();continue}var k=r.parse(y,b);if(!k){Ke("Skipping property: Invalid property definition in: "+i),l();continue}f.push({name:y,val:b}),l()}if(g){s();break}r.selector(d);for(var E=0;E<f.length;E++){var _=f[E];r.css(_.name,_.val)}s()}return r};Js.fromString=function(t){var e=this;return e.resetToDefault(),e.appendFromString(t),e};var St={};(function(){var t=dt,e=um,r=dm,a=hm,n=fm,o=function(F){return"^"+F+"\\s*\\(\\s*([\\w\\.]+)\\s*\\)$"},i=function(F){var Z=t+"|\\w+|"+e+"|"+r+"|"+a+"|"+n;return"^"+F+"\\s*\\(([\\w\\.]+)\\s*\\,\\s*("+t+")\\s*\\,\\s*("+t+")\\s*,\\s*("+Z+")\\s*\\,\\s*("+Z+")\\)$"},s=[`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`,"^(none)$","^(.+)$"];St.types={time:{number:!0,min:0,units:"s|ms",implicitUnits:"ms"},percent:{number:!0,min:0,max:100,units:"%",implicitUnits:"%"},percentages:{number:!0,min:0,max:100,units:"%",implicitUnits:"%",multiple:!0},zeroOneNumber:{number:!0,min:0,max:1,unitless:!0},zeroOneNumbers:{number:!0,min:0,max:1,unitless:!0,multiple:!0},nOneOneNumber:{number:!0,min:-1,max:1,unitless:!0},nonNegativeInt:{number:!0,min:0,integer:!0,unitless:!0},position:{enums:["parent","origin"]},nodeSize:{number:!0,min:0,enums:["label"]},number:{number:!0,unitless:!0},numbers:{number:!0,unitless:!0,multiple:!0},positiveNumber:{number:!0,unitless:!0,min:0,strictMin:!0},size:{number:!0,min:0},bidirectionalSize:{number:!0},bidirectionalSizeMaybePercent:{number:!0,allowPercent:!0},bidirectionalSizes:{number:!0,multiple:!0},sizeMaybePercent:{number:!0,min:0,allowPercent:!0},axisDirection:{enums:["horizontal","leftward","rightward","vertical","upward","downward","auto"]},paddingRelativeTo:{enums:["width","height","average","min","max"]},bgWH:{number:!0,min:0,allowPercent:!0,enums:["auto"],multiple:!0},bgPos:{number:!0,allowPercent:!0,multiple:!0},bgRelativeTo:{enums:["inner","include-padding"],multiple:!0},bgRepeat:{enums:["repeat","repeat-x","repeat-y","no-repeat"],multiple:!0},bgFit:{enums:["none","contain","cover"],multiple:!0},bgCrossOrigin:{enums:["anonymous","use-credentials"],multiple:!0},bgClip:{enums:["none","node"],multiple:!0},bgContainment:{enums:["inside","over"],multiple:!0},color:{color:!0},colors:{color:!0,multiple:!0},fill:{enums:["solid","linear-gradient","radial-gradient"]},bool:{enums:["yes","no"]},bools:{enums:["yes","no"],multiple:!0},lineStyle:{enums:["solid","dotted","dashed"]},lineCap:{enums:["butt","round","square"]},borderStyle:{enums:["solid","dotted","dashed","double"]},curveStyle:{enums:["bezier","unbundled-bezier","haystack","segments","straight","taxi"]},fontFamily:{regex:'^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'},fontStyle:{enums:["italic","normal","oblique"]},fontWeight:{enums:["normal","bold","bolder","lighter","100","200","300","400","500","600","800","900",100,200,300,400,500,600,700,800,900]},textDecoration:{enums:["none","underline","overline","line-through"]},textTransform:{enums:["none","uppercase","lowercase"]},textWrap:{enums:["none","wrap","ellipsis"]},textOverflowWrap:{enums:["whitespace","anywhere"]},textBackgroundShape:{enums:["rectangle","roundrectangle","round-rectangle"]},nodeShape:{enums:["rectangle","roundrectangle","round-rectangle","cutrectangle","cut-rectangle","bottomroundrectangle","bottom-round-rectangle","barrel","ellipse","triangle","round-triangle","square","pentagon","round-pentagon","hexagon","round-hexagon","concavehexagon","concave-hexagon","heptagon","round-heptagon","octagon","round-octagon","tag","round-tag","star","diamond","round-diamond","vee","rhomboid","polygon"]},compoundIncludeLabels:{enums:["include","exclude"]},arrowShape:{enums:["tee","triangle","triangle-tee","circle-triangle","triangle-cross","triangle-backcurve","vee","square","circle","diamond","chevron","none"]},arrowFill:{enums:["filled","hollow"]},display:{enums:["element","none"]},visibility:{enums:["hidden","visible"]},zCompoundDepth:{enums:["bottom","orphan","auto","top"]},zIndexCompare:{enums:["auto","manual"]},valign:{enums:["top","center","bottom"]},halign:{enums:["left","center","right"]},justification:{enums:["left","center","right","auto"]},text:{string:!0},data:{mapping:!0,regex:o("data")},layoutData:{mapping:!0,regex:o("layoutData")},scratch:{mapping:!0,regex:o("scratch")},mapData:{mapping:!0,regex:i("mapData")},mapLayoutData:{mapping:!0,regex:i("mapLayoutData")},mapScratch:{mapping:!0,regex:i("mapScratch")},fn:{mapping:!0,fn:!0},url:{regexes:s,singleRegexMatchValue:!0},urls:{regexes:s,singleRegexMatchValue:!0,multiple:!0},propList:{propList:!0},angle:{number:!0,units:"deg|rad",implicitUnits:"rad"},textRotation:{number:!0,units:"deg|rad",implicitUnits:"rad",enums:["none","autorotate"]},polygonPointList:{number:!0,multiple:!0,evenMultiple:!0,min:-1,max:1,unitless:!0},edgeDistances:{enums:["intersection","node-position"]},edgeEndpoint:{number:!0,multiple:!0,units:"%|px|em|deg|rad",implicitUnits:"px",enums:["inside-to-node","outside-to-node","outside-to-node-or-label","outside-to-line","outside-to-line-or-label"],singleEnum:!0,validate:function(F,Z){switch(F.length){case 2:return Z[0]!=="deg"&&Z[0]!=="rad"&&Z[1]!=="deg"&&Z[1]!=="rad";case 1:return we(F[0])||Z[0]==="deg"||Z[0]==="rad";default:return!1}}},easing:{regexes:["^(spring)\\s*\\(\\s*("+t+")\\s*,\\s*("+t+")\\s*\\)$","^(cubic-bezier)\\s*\\(\\s*("+t+")\\s*,\\s*("+t+")\\s*,\\s*("+t+")\\s*,\\s*("+t+")\\s*\\)$"],enums:["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine","ease-out-sine","ease-in-out-sine","ease-in-quad","ease-out-quad","ease-in-out-quad","ease-in-cubic","ease-out-cubic","ease-in-out-cubic","ease-in-quart","ease-out-quart","ease-in-out-quart","ease-in-quint","ease-out-quint","ease-in-out-quint","ease-in-expo","ease-out-expo","ease-in-out-expo","ease-in-circ","ease-out-circ","ease-in-out-circ"]},gradientDirection:{enums:["to-bottom","to-top","to-left","to-right","to-bottom-right","to-bottom-left","to-top-right","to-top-left","to-right-bottom","to-left-bottom","to-right-top","to-left-top"]},boundsExpansion:{number:!0,multiple:!0,min:0,validate:function(F){var Z=F.length;return Z===1||Z===2||Z===4}}};var l={zeroNonZero:function(F,Z){return(F==null||Z==null)&&F!==Z||F==0&&Z!=0?!0:F!=0&&Z==0},any:function(F,Z){return F!=Z},emptyNonEmpty:function(F,Z){var se=Zr(F),ie=Zr(Z);return se&&!ie||!se&&ie}},u=St.types,c=[{name:"label",type:u.text,triggersBounds:l.any,triggersZOrder:l.emptyNonEmpty},{name:"text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any}],d=[{name:"source-label",type:u.text,triggersBounds:l.any},{name:"source-text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"source-text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"source-text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"source-text-offset",type:u.size,triggersBounds:l.any}],h=[{name:"target-label",type:u.text,triggersBounds:l.any},{name:"target-text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"target-text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"target-text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"target-text-offset",type:u.size,triggersBounds:l.any}],p=[{name:"font-family",type:u.fontFamily,triggersBounds:l.any},{name:"font-style",type:u.fontStyle,triggersBounds:l.any},{name:"font-weight",type:u.fontWeight,triggersBounds:l.any},{name:"font-size",type:u.size,triggersBounds:l.any},{name:"text-transform",type:u.textTransform,triggersBounds:l.any},{name:"text-wrap",type:u.textWrap,triggersBounds:l.any},{name:"text-overflow-wrap",type:u.textOverflowWrap,triggersBounds:l.any},{name:"text-max-width",type:u.size,triggersBounds:l.any},{name:"text-outline-width",type:u.size,triggersBounds:l.any},{name:"line-height",type:u.positiveNumber,triggersBounds:l.any}],g=[{name:"text-valign",type:u.valign,triggersBounds:l.any},{name:"text-halign",type:u.halign,triggersBounds:l.any},{name:"color",type:u.color},{name:"text-outline-color",type:u.color},{name:"text-outline-opacity",type:u.zeroOneNumber},{name:"text-background-color",type:u.color},{name:"text-background-opacity",type:u.zeroOneNumber},{name:"text-background-padding",type:u.size,triggersBounds:l.any},{name:"text-border-opacity",type:u.zeroOneNumber},{name:"text-border-color",type:u.color},{name:"text-border-width",type:u.size,triggersBounds:l.any},{name:"text-border-style",type:u.borderStyle,triggersBounds:l.any},{name:"text-background-shape",type:u.textBackgroundShape,triggersBounds:l.any},{name:"text-justification",type:u.justification}],f=[{name:"events",type:u.bool},{name:"text-events",type:u.bool}],v=[{name:"display",type:u.display,triggersZOrder:l.any,triggersBounds:l.any,triggersBoundsOfParallelBeziers:!0},{name:"visibility",type:u.visibility,triggersZOrder:l.any},{name:"opacity",type:u.zeroOneNumber,triggersZOrder:l.zeroNonZero},{name:"text-opacity",type:u.zeroOneNumber},{name:"min-zoomed-font-size",type:u.size},{name:"z-compound-depth",type:u.zCompoundDepth,triggersZOrder:l.any},{name:"z-index-compare",type:u.zIndexCompare,triggersZOrder:l.any},{name:"z-index",type:u.nonNegativeInt,triggersZOrder:l.any}],m=[{name:"overlay-padding",type:u.size,triggersBounds:l.any},{name:"overlay-color",type:u.color},{name:"overlay-opacity",type:u.zeroOneNumber,triggersBounds:l.zeroNonZero}],y=[{name:"transition-property",type:u.propList},{name:"transition-duration",type:u.time},{name:"transition-delay",type:u.time},{name:"transition-timing-function",type:u.easing}],b=function(F,Z){return Z.value==="label"?-F.poolIndex():Z.pfValue},x=[{name:"height",type:u.nodeSize,triggersBounds:l.any,hashOverride:b},{name:"width",type:u.nodeSize,triggersBounds:l.any,hashOverride:b},{name:"shape",type:u.nodeShape,triggersBounds:l.any},{name:"shape-polygon-points",type:u.polygonPointList,triggersBounds:l.any},{name:"background-color",type:u.color},{name:"background-fill",type:u.fill},{name:"background-opacity",type:u.zeroOneNumber},{name:"background-blacken",type:u.nOneOneNumber},{name:"background-gradient-stop-colors",type:u.colors},{name:"background-gradient-stop-positions",type:u.percentages},{name:"background-gradient-direction",type:u.gradientDirection},{name:"padding",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"padding-relative-to",type:u.paddingRelativeTo,triggersBounds:l.any},{name:"bounds-expansion",type:u.boundsExpansion,triggersBounds:l.any}],k=[{name:"border-color",type:u.color},{name:"border-opacity",type:u.zeroOneNumber},{name:"border-width",type:u.size,triggersBounds:l.any},{name:"border-style",type:u.borderStyle}],E=[{name:"background-image",type:u.urls},{name:"background-image-crossorigin",type:u.bgCrossOrigin},{name:"background-image-opacity",type:u.zeroOneNumbers},{name:"background-image-containment",type:u.bgContainment},{name:"background-image-smoothing",type:u.bools},{name:"background-position-x",type:u.bgPos},{name:"background-position-y",type:u.bgPos},{name:"background-width-relative-to",type:u.bgRelativeTo},{name:"background-height-relative-to",type:u.bgRelativeTo},{name:"background-repeat",type:u.bgRepeat},{name:"background-fit",type:u.bgFit},{name:"background-clip",type:u.bgClip},{name:"background-width",type:u.bgWH},{name:"background-height",type:u.bgWH},{name:"background-offset-x",type:u.bgPos},{name:"background-offset-y",type:u.bgPos}],_=[{name:"position",type:u.position,triggersBounds:l.any},{name:"compound-sizing-wrt-labels",type:u.compoundIncludeLabels,triggersBounds:l.any},{name:"min-width",type:u.size,triggersBounds:l.any},{name:"min-width-bias-left",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-width-bias-right",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-height",type:u.size,triggersBounds:l.any},{name:"min-height-bias-top",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-height-bias-bottom",type:u.sizeMaybePercent,triggersBounds:l.any}],T=[{name:"line-style",type:u.lineStyle},{name:"line-color",type:u.color},{name:"line-fill",type:u.fill},{name:"line-cap",type:u.lineCap},{name:"line-opacity",type:u.zeroOneNumber},{name:"line-dash-pattern",type:u.numbers},{name:"line-dash-offset",type:u.number},{name:"line-gradient-stop-colors",type:u.colors},{name:"line-gradient-stop-positions",type:u.percentages},{name:"curve-style",type:u.curveStyle,triggersBounds:l.any,triggersBoundsOfParallelBeziers:!0},{name:"haystack-radius",type:u.zeroOneNumber,triggersBounds:l.any},{name:"source-endpoint",type:u.edgeEndpoint,triggersBounds:l.any},{name:"target-endpoint",type:u.edgeEndpoint,triggersBounds:l.any},{name:"control-point-step-size",type:u.size,triggersBounds:l.any},{name:"control-point-distances",type:u.bidirectionalSizes,triggersBounds:l.any},{name:"control-point-weights",type:u.numbers,triggersBounds:l.any},{name:"segment-distances",type:u.bidirectionalSizes,triggersBounds:l.any},{name:"segment-weights",type:u.numbers,triggersBounds:l.any},{name:"taxi-turn",type:u.bidirectionalSizeMaybePercent,triggersBounds:l.any},{name:"taxi-turn-min-distance",type:u.size,triggersBounds:l.any},{name:"taxi-direction",type:u.axisDirection,triggersBounds:l.any},{name:"edge-distances",type:u.edgeDistances,triggersBounds:l.any},{name:"arrow-scale",type:u.positiveNumber,triggersBounds:l.any},{name:"loop-direction",type:u.angle,triggersBounds:l.any},{name:"loop-sweep",type:u.angle,triggersBounds:l.any},{name:"source-distance-from-node",type:u.size,triggersBounds:l.any},{name:"target-distance-from-node",type:u.size,triggersBounds:l.any}],C=[{name:"ghost",type:u.bool,triggersBounds:l.any},{name:"ghost-offset-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"ghost-offset-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"ghost-opacity",type:u.zeroOneNumber}],D=[{name:"selection-box-color",type:u.color},{name:"selection-box-opacity",type:u.zeroOneNumber},{name:"selection-box-border-color",type:u.color},{name:"selection-box-border-width",type:u.size},{name:"active-bg-color",type:u.color},{name:"active-bg-opacity",type:u.zeroOneNumber},{name:"active-bg-size",type:u.size},{name:"outside-texture-bg-color",type:u.color},{name:"outside-texture-bg-opacity",type:u.zeroOneNumber}],L=[];St.pieBackgroundN=16,L.push({name:"pie-size",type:u.sizeMaybePercent});for(var A=1;A<=St.pieBackgroundN;A++)L.push({name:"pie-"+A+"-background-color",type:u.color}),L.push({name:"pie-"+A+"-background-size",type:u.percent}),L.push({name:"pie-"+A+"-background-opacity",type:u.zeroOneNumber});var O=[],I=St.arrowPrefixes=["source","mid-source","target","mid-target"];[{name:"arrow-shape",type:u.arrowShape,triggersBounds:l.any},{name:"arrow-color",type:u.color},{name:"arrow-fill",type:u.arrowFill}].forEach(function(Y){I.forEach(function(F){var Z=F+"-"+Y.name,se=Y.type,ie=Y.triggersBounds;O.push({name:Z,type:se,triggersBounds:ie})})},{});var N=St.properties=[].concat(f,y,v,m,C,g,p,c,d,h,x,k,E,L,_,T,O,D),z=St.propertyGroups={behavior:f,transition:y,visibility:v,overlay:m,ghost:C,commonLabel:g,labelDimensions:p,mainLabel:c,sourceLabel:d,targetLabel:h,nodeBody:x,nodeBorder:k,backgroundImage:E,pie:L,compound:_,edgeLine:T,edgeArrow:O,core:D},$=St.propertyGroupNames={},B=St.propertyGroupKeys=Object.keys(z);B.forEach(function(Y){$[Y]=z[Y].map(function(F){return F.name}),z[Y].forEach(function(F){return F.groupKey=Y})});var R=St.aliases=[{name:"content",pointsTo:"label"},{name:"control-point-distance",pointsTo:"control-point-distances"},{name:"control-point-weight",pointsTo:"control-point-weights"},{name:"edge-text-rotation",pointsTo:"text-rotation"},{name:"padding-left",pointsTo:"padding"},{name:"padding-right",pointsTo:"padding"},{name:"padding-top",pointsTo:"padding"},{name:"padding-bottom",pointsTo:"padding"}];St.propertyNames=N.map(function(Y){return Y.name});for(var H=0;H<N.length;H++){var M=N[H];N[M.name]=M}for(var j=0;j<R.length;j++){var W=R[j],te=N[W.pointsTo],X={name:W.name,alias:!0,pointsTo:te};N.push(X),N[W.name]=X}})();St.getDefaultProperty=function(t){return this.getDefaultProperties()[t]};St.getDefaultProperties=function(){var t=this._private;if(t.defaultProperties!=null)return t.defaultProperties;for(var e=ke({"selection-box-color":"#ddd","selection-box-opacity":.65,"selection-box-border-color":"#aaa","selection-box-border-width":1,"active-bg-color":"black","active-bg-opacity":.15,"active-bg-size":30,"outside-texture-bg-color":"#000","outside-texture-bg-opacity":.125,events:"yes","text-events":"no","text-valign":"top","text-halign":"center","text-justification":"auto","line-height":1,color:"#000","text-outline-color":"#000","text-outline-width":0,"text-outline-opacity":1,"text-opacity":1,"text-decoration":"none","text-transform":"none","text-wrap":"none","text-overflow-wrap":"whitespace","text-max-width":9999,"text-background-color":"#000","text-background-opacity":0,"text-background-shape":"rectangle","text-background-padding":0,"text-border-opacity":0,"text-border-width":0,"text-border-style":"solid","text-border-color":"#000","font-family":"Helvetica Neue, Helvetica, sans-serif","font-style":"normal","font-weight":"normal","font-size":16,"min-zoomed-font-size":0,"text-rotation":"none","source-text-rotation":"none","target-text-rotation":"none",visibility:"visible",display:"element",opacity:1,"z-compound-depth":"auto","z-index-compare":"auto","z-index":0,label:"","text-margin-x":0,"text-margin-y":0,"source-label":"","source-text-offset":0,"source-text-margin-x":0,"source-text-margin-y":0,"target-label":"","target-text-offset":0,"target-text-margin-x":0,"target-text-margin-y":0,"overlay-opacity":0,"overlay-color":"#000","overlay-padding":10,"transition-property":"none","transition-duration":0,"transition-delay":0,"transition-timing-function":"linear","background-blacken":0,"background-color":"#999","background-fill":"solid","background-opacity":1,"background-image":"none","background-image-crossorigin":"anonymous","background-image-opacity":1,"background-image-containment":"inside","background-image-smoothing":"yes","background-position-x":"50%","background-position-y":"50%","background-offset-x":0,"background-offset-y":0,"background-width-relative-to":"include-padding","background-height-relative-to":"include-padding","background-repeat":"no-repeat","background-fit":"none","background-clip":"node","background-width":"auto","background-height":"auto","border-color":"#000","border-opacity":1,"border-width":0,"border-style":"solid",height:30,width:30,shape:"ellipse","shape-polygon-points":"-1, -1,   1, -1,   1, 1,   -1, 1","bounds-expansion":0,"background-gradient-direction":"to-bottom","background-gradient-stop-colors":"#999","background-gradient-stop-positions":"0%",ghost:"no","ghost-offset-y":0,"ghost-offset-x":0,"ghost-opacity":0,padding:0,"padding-relative-to":"width",position:"origin","compound-sizing-wrt-labels":"include","min-width":0,"min-width-bias-left":0,"min-width-bias-right":0,"min-height":0,"min-height-bias-top":0,"min-height-bias-bottom":0},{"pie-size":"100%"},[{name:"pie-{{i}}-background-color",value:"black"},{name:"pie-{{i}}-background-size",value:"0%"},{name:"pie-{{i}}-background-opacity",value:1}].reduce(function(l,u){for(var c=1;c<=St.pieBackgroundN;c++){var d=u.name.replace("{{i}}",c),h=u.value;l[d]=h}return l},{}),{"line-style":"solid","line-color":"#999","line-fill":"solid","line-cap":"butt","line-opacity":1,"line-gradient-stop-colors":"#999","line-gradient-stop-positions":"0%","control-point-step-size":40,"control-point-weights":.5,"segment-weights":.5,"segment-distances":20,"taxi-turn":"50%","taxi-turn-min-distance":10,"taxi-direction":"auto","edge-distances":"intersection","curve-style":"haystack","haystack-radius":0,"arrow-scale":1,"loop-direction":"-45deg","loop-sweep":"-90deg","source-distance-from-node":0,"target-distance-from-node":0,"source-endpoint":"outside-to-node","target-endpoint":"outside-to-node","line-dash-pattern":[6,3],"line-dash-offset":0},[{name:"arrow-shape",value:"none"},{name:"arrow-color",value:"#999"},{name:"arrow-fill",value:"filled"}].reduce(function(l,u){return St.arrowPrefixes.forEach(function(c){var d=c+"-"+u.name,h=u.value;l[d]=h}),l},{})),r={},a=0;a<this.properties.length;a++){var n=this.properties[a];if(!n.pointsTo){var o=n.name,i=e[o],s=this.parse(o,i);r[o]=s}}return t.defaultProperties=r,t.defaultProperties};St.addDefaultStylesheet=function(){this.selector(":parent").css({shape:"rectangle",padding:10,"background-color":"#eee","border-color":"#ccc","border-width":1}).selector("edge").css({width:3}).selector(":loop").css({"curve-style":"bezier"}).selector("edge:compound").css({"curve-style":"bezier","source-endpoint":"outside-to-line","target-endpoint":"outside-to-line"}).selector(":selected").css({"background-color":"#0169D9","line-color":"#0169D9","source-arrow-color":"#0169D9","target-arrow-color":"#0169D9","mid-source-arrow-color":"#0169D9","mid-target-arrow-color":"#0169D9"}).selector(":parent:selected").css({"background-color":"#CCE1F9","border-color":"#aec8e5"}).selector(":active").css({"overlay-color":"black","overlay-padding":10,"overlay-opacity":.25}),this.defaultLength=this.length};var So={};So.parse=function(t,e,r,a){var n=this;if(rt(e))return n.parseImplWarn(t,e,r,a);var o=a==="mapping"||a===!0||a===!1||a==null?"dontcare":a,i=r?"t":"f",s=""+e,l=Rc(t,s,i,o),u=n.propCache=n.propCache||[],c;return(c=u[l])||(c=u[l]=n.parseImplWarn(t,e,r,a)),(r||a==="mapping")&&(c=xr(c),c&&(c.value=xr(c.value))),c};So.parseImplWarn=function(t,e,r,a){var n=this.parseImpl(t,e,r,a);return!n&&e!=null&&Ke("The style property `".concat(t,": ").concat(e,"` is invalid")),n&&(n.name==="width"||n.name==="height")&&e==="label"&&Ke("The style value of `label` is deprecated for `"+n.name+"`"),n};So.parseImpl=function(t,e,r,a){var n=this;t=Es(t);var o=n.properties[t],i=e,s=n.types;if(!o||e===void 0)return null;o.alias&&(o=o.pointsTo,t=o.name);var l=we(e);l&&(e=e.trim());var u=o.type;if(!u)return null;if(r&&(e===""||e===null))return{name:t,value:e,bypass:!0,deleteBypass:!0};if(rt(e))return{name:t,value:e,strValue:"fn",mapped:s.fn,bypass:r};var c,d;if(!(!l||a||e.length<7||e[1]!=="a")){if(e.length>=7&&e[0]==="d"&&(c=new RegExp(s.data.regex).exec(e))){if(r)return!1;var h=s.data;return{name:t,value:c,strValue:""+e,mapped:h,field:c[1],bypass:r}}else if(e.length>=10&&e[0]==="m"&&(d=new RegExp(s.mapData.regex).exec(e))){if(r||u.multiple)return!1;var p=s.mapData;if(!(u.color||u.number))return!1;var g=this.parse(t,d[4]);if(!g||g.mapped)return!1;var f=this.parse(t,d[5]);if(!f||f.mapped)return!1;if(g.pfValue===f.pfValue||g.strValue===f.strValue)return Ke("`"+t+": "+e+"` is not a valid mapper because the output range is zero; converting to `"+t+": "+g.strValue+"`"),this.parse(t,g.strValue);if(u.color){var v=g.value,m=f.value,y=v[0]===m[0]&&v[1]===m[1]&&v[2]===m[2]&&(v[3]===m[3]||(v[3]==null||v[3]===1)&&(m[3]==null||m[3]===1));if(y)return!1}return{name:t,value:d,strValue:""+e,mapped:p,field:d[1],fieldMin:parseFloat(d[2]),fieldMax:parseFloat(d[3]),valueMin:g.value,valueMax:f.value,bypass:r}}}if(u.multiple&&a!=="multiple"){var b;if(l?b=e.split(/\s+/):Qe(e)?b=e:b=[e],u.evenMultiple&&b.length%2!=0)return null;for(var x=[],k=[],E=[],_="",T=!1,C=0;C<b.length;C++){var D=n.parse(t,b[C],r,"multiple");T=T||we(D.value),x.push(D.value),E.push(D.pfValue!=null?D.pfValue:D.value),k.push(D.units),_+=(C>0?" ":"")+D.strValue}return u.validate&&!u.validate(x,k)?null:u.singleEnum&&T?x.length===1&&we(x[0])?{name:t,value:x[0],strValue:x[0],bypass:r}:null:{name:t,value:x,pfValue:E,strValue:_,bypass:r,units:k}}var L=function(){for(var se=0;se<u.enums.length;se++){var ie=u.enums[se];if(ie===e)return{name:t,value:e,strValue:""+e,bypass:r}}return null};if(u.number){var A,O="px";if(u.units&&(A=u.units),u.implicitUnits&&(O=u.implicitUnits),!u.unitless)if(l){var I="px|em"+(u.allowPercent?"|\\%":"");A&&(I=A);var N=e.match("^("+dt+")("+I+")?$");N&&(e=N[1],A=N[2]||O)}else(!A||u.implicitUnits)&&(A=O);if(e=parseFloat(e),isNaN(e)&&u.enums===void 0)return null;if(isNaN(e)&&u.enums!==void 0)return e=i,L();if(u.integer&&!rm(e)||u.min!==void 0&&(e<u.min||u.strictMin&&e===u.min)||u.max!==void 0&&(e>u.max||u.strictMax&&e===u.max))return null;var z={name:t,value:e,strValue:""+e+(A||""),units:A,bypass:r};return u.unitless||A!=="px"&&A!=="em"?z.pfValue=e:z.pfValue=A==="px"||!A?e:this.getEmSizeInPixels()*e,(A==="ms"||A==="s")&&(z.pfValue=A==="ms"?e:1e3*e),(A==="deg"||A==="rad")&&(z.pfValue=A==="rad"?e:Zm(e)),A==="%"&&(z.pfValue=e/100),z}else if(u.propList){var $=[],B=""+e;if(B!=="none"){for(var R=B.split(/\s*,\s*|\s+/),H=0;H<R.length;H++){var M=R[H].trim();n.properties[M]?$.push(M):Ke("`"+M+"` is not a valid property name")}if($.length===0)return null}return{name:t,value:$,strValue:$.length===0?"none":$.join(" "),bypass:r}}else if(u.color){var j=bm(e);return j?{name:t,value:j,pfValue:j,strValue:"rgb("+j[0]+","+j[1]+","+j[2]+")",bypass:r}:null}else if(u.regex||u.regexes){if(u.enums){var W=L();if(W)return W}for(var te=u.regexes?u.regexes:[u.regex],X=0;X<te.length;X++){var Y=new RegExp(te[X]),F=Y.exec(e);if(F)return{name:t,value:u.singleRegexMatchValue?F[1]:F,strValue:""+e,bypass:r}}return null}else return u.string?{name:t,value:""+e,strValue:""+e,bypass:r}:u.enums?L():null};var Lt=function t(e){if(!(this instanceof t))return new t(e);if(!Cs(e)){st("A style must have a core reference");return}this._private={cy:e,coreStyle:{}},this.length=0,this.resetToDefault()},It=Lt.prototype;It.instanceString=function(){return"style"};It.clear=function(){for(var t=this._private,e=t.cy,r=e.elements(),a=0;a<this.length;a++)this[a]=void 0;return this.length=0,t.contextStyles={},t.propDiffs={},this.cleanElements(r,!0),r.forEach(function(n){var o=n[0]._private;o.styleDirty=!0,o.appliedInitStyle=!1}),this};It.resetToDefault=function(){return this.clear(),this.addDefaultStylesheet(),this};It.core=function(t){return this._private.coreStyle[t]||this.getDefaultProperty(t)};It.selector=function(t){var e=t==="core"?null:new aa(t),r=this.length++;return this[r]={selector:e,properties:[],mappedProperties:[],index:r},this};It.css=function(){var t=this,e=arguments;if(e.length===1)for(var r=e[0],a=0;a<t.properties.length;a++){var n=t.properties[a],o=r[n.name];o===void 0&&(o=r[Gi(n.name)]),o!==void 0&&this.cssRule(n.name,o)}else e.length===2&&this.cssRule(e[0],e[1]);return this};It.style=It.css;It.cssRule=function(t,e){var r=this.parse(t,e);if(r){var a=this.length-1;this[a].properties.push(r),this[a].properties[r.name]=r,r.name.match(/pie-(\d+)-background-size/)&&r.value&&(this._private.hasPie=!0),r.mapped&&this[a].mappedProperties.push(r);var n=!this[a].selector;n&&(this._private.coreStyle[r.name]=r)}return this};It.append=function(t){return Pc(t)?t.appendToStyle(this):Qe(t)?this.appendFromJson(t):we(t)&&this.appendFromString(t),this};Lt.fromJson=function(t,e){var r=new Lt(t);return r.fromJson(e),r};Lt.fromString=function(t,e){return new Lt(t).fromString(e)};[At,ai,Ws,_r,Eo,Js,St,So].forEach(function(t){ke(It,t)});Lt.types=It.types;Lt.properties=It.properties;Lt.propertyGroups=It.propertyGroups;Lt.propertyGroupNames=It.propertyGroupNames;Lt.propertyGroupKeys=It.propertyGroupKeys;var ub={style:function(e){if(e){var r=this.setStyle(e);r.update()}return this._private.style},setStyle:function(e){var r=this._private;return Pc(e)?r.style=e.generateStyle(this):Qe(e)?r.style=Lt.fromJson(this,e):we(e)?r.style=Lt.fromString(this,e):r.style=Lt(this),r.style},updateStyle:function(){this.mutableElements().updateStyle()}},cb="single",Sa={autolock:function(e){if(e!==void 0)this._private.autolock=!!e;else return this._private.autolock;return this},autoungrabify:function(e){if(e!==void 0)this._private.autoungrabify=!!e;else return this._private.autoungrabify;return this},autounselectify:function(e){if(e!==void 0)this._private.autounselectify=!!e;else return this._private.autounselectify;return this},selectionType:function(e){var r=this._private;if(r.selectionType==null&&(r.selectionType=cb),e!==void 0)(e==="additive"||e==="single")&&(r.selectionType=e);else return r.selectionType;return this},panningEnabled:function(e){if(e!==void 0)this._private.panningEnabled=!!e;else return this._private.panningEnabled;return this},userPanningEnabled:function(e){if(e!==void 0)this._private.userPanningEnabled=!!e;else return this._private.userPanningEnabled;return this},zoomingEnabled:function(e){if(e!==void 0)this._private.zoomingEnabled=!!e;else return this._private.zoomingEnabled;return this},userZoomingEnabled:function(e){if(e!==void 0)this._private.userZoomingEnabled=!!e;else return this._private.userZoomingEnabled;return this},boxSelectionEnabled:function(e){if(e!==void 0)this._private.boxSelectionEnabled=!!e;else return this._private.boxSelectionEnabled;return this},pan:function(){var e=arguments,r=this._private.pan,a,n,o,i,s;switch(e.length){case 0:return r;case 1:if(we(e[0]))return a=e[0],r[a];if(Oe(e[0])){if(!this._private.panningEnabled)return this;o=e[0],i=o.x,s=o.y,ce(i)&&(r.x=i),ce(s)&&(r.y=s),this.emit("pan viewport")}break;case 2:if(!this._private.panningEnabled)return this;a=e[0],n=e[1],(a==="x"||a==="y")&&ce(n)&&(r[a]=n),this.emit("pan viewport");break}return this.notify("viewport"),this},panBy:function(e,r){var a=arguments,n=this._private.pan,o,i,s,l,u;if(!this._private.panningEnabled)return this;switch(a.length){case 1:Oe(e)&&(s=a[0],l=s.x,u=s.y,ce(l)&&(n.x+=l),ce(u)&&(n.y+=u),this.emit("pan viewport"));break;case 2:o=e,i=r,(o==="x"||o==="y")&&ce(i)&&(n[o]+=i),this.emit("pan viewport");break}return this.notify("viewport"),this},fit:function(e,r){var a=this.getFitViewport(e,r);if(a){var n=this._private;n.zoom=a.zoom,n.pan=a.pan,this.emit("pan zoom viewport"),this.notify("viewport")}return this},getFitViewport:function(e,r){if(ce(e)&&r===void 0&&(r=e,e=void 0),!(!this._private.panningEnabled||!this._private.zoomingEnabled)){var a;if(we(e)){var n=e;e=this.$(n)}else if(im(e)){var o=e;a={x1:o.x1,y1:o.y1,x2:o.x2,y2:o.y2},a.w=a.x2-a.x1,a.h=a.y2-a.y1}else Jt(e)||(e=this.mutableElements());if(!(Jt(e)&&e.empty())){a=a||e.boundingBox();var i=this.width(),s=this.height(),l;if(r=ce(r)?r:0,!isNaN(i)&&!isNaN(s)&&i>0&&s>0&&!isNaN(a.w)&&!isNaN(a.h)&&a.w>0&&a.h>0){l=Math.min((i-2*r)/a.w,(s-2*r)/a.h),l=l>this._private.maxZoom?this._private.maxZoom:l,l=l<this._private.minZoom?this._private.minZoom:l;var u={x:(i-l*(a.x1+a.x2))/2,y:(s-l*(a.y1+a.y2))/2};return{zoom:l,pan:u}}}}},zoomRange:function(e,r){var a=this._private;if(r==null){var n=e;e=n.min,r=n.max}return ce(e)&&ce(r)&&e<=r?(a.minZoom=e,a.maxZoom=r):ce(e)&&r===void 0&&e<=a.maxZoom?a.minZoom=e:ce(r)&&e===void 0&&r>=a.minZoom&&(a.maxZoom=r),this},minZoom:function(e){return e===void 0?this._private.minZoom:this.zoomRange({min:e})},maxZoom:function(e){return e===void 0?this._private.maxZoom:this.zoomRange({max:e})},getZoomedViewport:function(e){var r=this._private,a=r.pan,n=r.zoom,o,i,s=!1;if(r.zoomingEnabled||(s=!0),ce(e)?i=e:Oe(e)&&(i=e.level,e.position!=null?o=to(e.position,n,a):e.renderedPosition!=null&&(o=e.renderedPosition),o!=null&&!r.panningEnabled&&(s=!0)),i=i>r.maxZoom?r.maxZoom:i,i=i<r.minZoom?r.minZoom:i,s||!ce(i)||i===n||o!=null&&(!ce(o.x)||!ce(o.y)))return null;if(o!=null){var l=a,u=n,c=i,d={x:-c/u*(o.x-l.x)+o.x,y:-c/u*(o.y-l.y)+o.y};return{zoomed:!0,panned:!0,zoom:c,pan:d}}else return{zoomed:!0,panned:!1,zoom:i,pan:a}},zoom:function(e){if(e===void 0)return this._private.zoom;var r=this.getZoomedViewport(e),a=this._private;return r==null||!r.zoomed?this:(a.zoom=r.zoom,r.panned&&(a.pan.x=r.pan.x,a.pan.y=r.pan.y),this.emit("zoom"+(r.panned?" pan":"")+" viewport"),this.notify("viewport"),this)},viewport:function(e){var r=this._private,a=!0,n=!0,o=[],i=!1,s=!1;if(!e)return this;if(ce(e.zoom)||(a=!1),Oe(e.pan)||(n=!1),!a&&!n)return this;if(a){var l=e.zoom;l<r.minZoom||l>r.maxZoom||!r.zoomingEnabled?i=!0:(r.zoom=l,o.push("zoom"))}if(n&&(!i||!e.cancelOnFailedZoom)&&r.panningEnabled){var u=e.pan;ce(u.x)&&(r.pan.x=u.x,s=!1),ce(u.y)&&(r.pan.y=u.y,s=!1),s||o.push("pan")}return o.length>0&&(o.push("viewport"),this.emit(o.join(" ")),this.notify("viewport")),this},center:function(e){var r=this.getCenterPan(e);return r&&(this._private.pan=r,this.emit("pan viewport"),this.notify("viewport")),this},getCenterPan:function(e,r){if(!!this._private.panningEnabled){if(we(e)){var a=e;e=this.mutableElements().filter(a)}else Jt(e)||(e=this.mutableElements());if(e.length!==0){var n=e.boundingBox(),o=this.width(),i=this.height();r=r===void 0?this._private.zoom:r;var s={x:(o-r*(n.x1+n.x2))/2,y:(i-r*(n.y1+n.y2))/2};return s}}},reset:function(){return!this._private.panningEnabled||!this._private.zoomingEnabled?this:(this.viewport({pan:{x:0,y:0},zoom:1}),this)},invalidateSize:function(){this._private.sizeCache=null},size:function(){var e=this._private,r=e.container;return e.sizeCache=e.sizeCache||(r?function(){var a=tt.getComputedStyle(r),n=function(i){return parseFloat(a.getPropertyValue(i))};return{width:r.clientWidth-n("padding-left")-n("padding-right"),height:r.clientHeight-n("padding-top")-n("padding-bottom")}}():{width:1,height:1})},width:function(){return this.size().width},height:function(){return this.size().height},extent:function(){var e=this._private.pan,r=this._private.zoom,a=this.renderedExtent(),n={x1:(a.x1-e.x)/r,x2:(a.x2-e.x)/r,y1:(a.y1-e.y)/r,y2:(a.y2-e.y)/r};return n.w=n.x2-n.x1,n.h=n.y2-n.y1,n},renderedExtent:function(){var e=this.width(),r=this.height();return{x1:0,y1:0,x2:e,y2:r,w:e,h:r}}};Sa.centre=Sa.center;Sa.autolockNodes=Sa.autolock;Sa.autoungrabifyNodes=Sa.autoungrabify;var ni={data:Ve.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeData:Ve.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),scratch:Ve.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:Ve.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0})};ni.attr=ni.data;ni.removeAttr=ni.removeData;var ii=function(e){var r=this;e=ke({},e);var a=e.container;a&&!qi(a)&&qi(a[0])&&(a=a[0]);var n=a?a._cyreg:null;n=n||{},n&&n.cy&&(n.cy.destroy(),n={});var o=n.readies=n.readies||[];a&&(a._cyreg=n),n.cy=r;var i=tt!==void 0&&a!==void 0&&!e.headless,s=e;s.layout=ke({name:i?"grid":"null"},s.layout),s.renderer=ke({name:i?"canvas":"null"},s.renderer);var l=function(g,f,v){return f!==void 0?f:v!==void 0?v:g},u=this._private={container:a,ready:!1,options:s,elements:new Et(this),listeners:[],aniEles:new Et(this),data:s.data||{},scratch:{},layout:null,renderer:null,destroyed:!1,notificationsEnabled:!0,minZoom:1e-50,maxZoom:1e50,zoomingEnabled:l(!0,s.zoomingEnabled),userZoomingEnabled:l(!0,s.userZoomingEnabled),panningEnabled:l(!0,s.panningEnabled),userPanningEnabled:l(!0,s.userPanningEnabled),boxSelectionEnabled:l(!0,s.boxSelectionEnabled),autolock:l(!1,s.autolock,s.autolockNodes),autoungrabify:l(!1,s.autoungrabify,s.autoungrabifyNodes),autounselectify:l(!1,s.autounselectify),styleEnabled:s.styleEnabled===void 0?i:s.styleEnabled,zoom:ce(s.zoom)?s.zoom:1,pan:{x:Oe(s.pan)&&ce(s.pan.x)?s.pan.x:0,y:Oe(s.pan)&&ce(s.pan.y)?s.pan.y:0},animation:{current:[],queue:[]},hasCompoundNodes:!1};this.createEmitter(),this.selectionType(s.selectionType),this.zoomRange({min:s.minZoom,max:s.maxZoom});var c=function(g,f){var v=g.some(om);if(v)return ln.all(g).then(f);f(g)};u.styleEnabled&&r.setStyle([]);var d=ke({},s,s.renderer);r.initRenderer(d);var h=function(g,f,v){r.notifications(!1);var m=r.mutableElements();m.length>0&&m.remove(),g!=null&&(Oe(g)||Qe(g))&&r.add(g),r.one("layoutready",function(b){r.notifications(!0),r.emit(b),r.one("load",f),r.emitAndNotify("load")}).one("layoutstop",function(){r.one("done",v),r.emit("done")});var y=ke({},r._private.options.layout);y.eles=r.elements(),r.layout(y).run()};c([s.style,s.elements],function(p){var g=p[0],f=p[1];u.styleEnabled&&r.style().append(g),h(f,function(){r.startAnimationLoop(),u.ready=!0,rt(s.ready)&&r.on("ready",s.ready);for(var v=0;v<o.length;v++){var m=o[v];r.on("ready",m)}n&&(n.readies=[]),r.emit("ready")},s.done)})},To=ii.prototype;ke(To,{instanceString:function(){return"core"},isReady:function(){return this._private.ready},destroyed:function(){return this._private.destroyed},ready:function(e){return this.isReady()?this.emitter().emit("ready",[],e):this.on("ready",e),this},destroy:function(){var e=this;if(!e.destroyed())return e.stopAnimationLoop(),e.destroyRenderer(),this.emit("destroy"),e._private.destroyed=!0,e},hasElementWithId:function(e){return this._private.elements.hasElementWithId(e)},getElementById:function(e){return this._private.elements.getElementById(e)},hasCompoundNodes:function(){return this._private.hasCompoundNodes},headless:function(){return this._private.renderer.isHeadless()},styleEnabled:function(){return this._private.styleEnabled},addToPool:function(e){return this._private.elements.merge(e),this},removeFromPool:function(e){return this._private.elements.unmerge(e),this},container:function(){return this._private.container||null},mount:function(e){if(e!=null){var r=this,a=r._private,n=a.options;return!qi(e)&&qi(e[0])&&(e=e[0]),r.stopAnimationLoop(),r.destroyRenderer(),a.container=e,a.styleEnabled=!0,r.invalidateSize(),r.initRenderer(ke({},n,n.renderer,{name:n.renderer.name==="null"?"canvas":n.renderer.name})),r.startAnimationLoop(),r.style(n.style),r.emit("mount"),r}},unmount:function(){var e=this;return e.stopAnimationLoop(),e.destroyRenderer(),e.initRenderer({name:"null"}),e.emit("unmount"),e},options:function(){return xr(this._private.options)},json:function(e){var r=this,a=r._private,n=r.mutableElements(),o=function(x){return r.getElementById(x.id())};if(Oe(e)){if(r.startBatch(),e.elements){var i={},s=function(x,k){for(var E=[],_=[],T=0;T<x.length;T++){var C=x[T];if(!C.data.id){Ke("cy.json() cannot handle elements without an ID attribute");continue}var D=""+C.data.id,L=r.getElementById(D);i[D]=!0,L.length!==0?_.push({ele:L,json:C}):(k&&(C.group=k),E.push(C))}r.add(E);for(var A=0;A<_.length;A++){var O=_[A],I=O.ele,N=O.json;I.json(N)}};if(Qe(e.elements))s(e.elements);else for(var l=["nodes","edges"],u=0;u<l.length;u++){var c=l[u],d=e.elements[c];Qe(d)&&s(d,c)}var h=r.collection();n.filter(function(b){return!i[b.id()]}).forEach(function(b){b.isParent()?h.merge(b):b.remove()}),h.forEach(function(b){return b.children().move({parent:null})}),h.forEach(function(b){return o(b).remove()})}e.style&&r.style(e.style),e.zoom!=null&&e.zoom!==a.zoom&&r.zoom(e.zoom),e.pan&&(e.pan.x!==a.pan.x||e.pan.y!==a.pan.y)&&r.pan(e.pan),e.data&&r.data(e.data);for(var p=["minZoom","maxZoom","zoomingEnabled","userZoomingEnabled","panningEnabled","userPanningEnabled","boxSelectionEnabled","autolock","autoungrabify","autounselectify"],g=0;g<p.length;g++){var f=p[g];e[f]!=null&&r[f](e[f])}return r.endBatch(),this}else{var v=!!e,m={};v?m.elements=this.elements().map(function(b){return b.json()}):(m.elements={},n.forEach(function(b){var x=b.group();m.elements[x]||(m.elements[x]=[]),m.elements[x].push(b.json())})),this._private.styleEnabled&&(m.style=r.style().json()),m.data=xr(r.data());var y=a.options;return m.zoomingEnabled=a.zoomingEnabled,m.userZoomingEnabled=a.userZoomingEnabled,m.zoom=a.zoom,m.minZoom=a.minZoom,m.maxZoom=a.maxZoom,m.panningEnabled=a.panningEnabled,m.userPanningEnabled=a.userPanningEnabled,m.pan=xr(a.pan),m.boxSelectionEnabled=a.boxSelectionEnabled,m.renderer=xr(y.renderer),m.hideEdgesOnViewport=y.hideEdgesOnViewport,m.textureOnViewport=y.textureOnViewport,m.wheelSensitivity=y.wheelSensitivity,m.motionBlur=y.motionBlur,m}}});To.$id=To.getElementById;[Jy,nb,ih,Gs,_o,ob,Zs,Co,ub,Sa,ni].forEach(function(t){ke(To,t)});var db={fit:!0,directed:!1,padding:30,circle:!1,grid:!1,spacingFactor:1.75,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,roots:void 0,maximal:!1,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}},gn=function(e){return e.scratch("breadthfirst")},oh=function(e,r){return e.scratch("breadthfirst",r)};function sh(t){this.options=ke({},db,t)}sh.prototype.run=function(){var t=this.options,e=t,r=t.cy,a=e.eles,n=a.nodes().filter(function(fe){return!fe.isParent()}),o=a,i=e.directed,s=e.maximal||e.maximalAdjustments>0,l=Qt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()}),u;if(Jt(e.roots))u=e.roots;else if(Qe(e.roots)){for(var c=[],d=0;d<e.roots.length;d++){var h=e.roots[d],p=r.getElementById(h);c.push(p)}u=r.collection(c)}else if(we(e.roots))u=r.$(e.roots);else if(i)u=n.roots();else{var g=a.components();u=r.collection();for(var f=function(de){var ye=g[de],U=ye.maxDegree(!1),P=ye.filter(function(V){return V.degree(!1)===U});u=u.add(P)},v=0;v<g.length;v++)f(v)}var m=[],y={},b=function(de,ye){m[ye]==null&&(m[ye]=[]);var U=m[ye].length;m[ye].push(de),oh(de,{index:U,depth:ye})},x=function(de,ye){var U=gn(de),P=U.depth,V=U.index;m[P][V]=null,b(de,ye)};o.bfs({roots:u,directed:e.directed,visit:function(de,ye,U,P,V){var G=de[0],K=G.id();b(G,V),y[K]=!0}});for(var k=[],E=0;E<n.length;E++){var _=n[E];y[_.id()]||k.push(_)}var T=function(de){for(var ye=m[de],U=0;U<ye.length;U++){var P=ye[U];if(P==null){ye.splice(U,1),U--;continue}oh(P,{depth:de,index:U})}},C=function(){for(var de=0;de<m.length;de++)T(de)},D=function(de,ye){for(var U=gn(de),P=de.incomers().filter(function(J){return J.isNode()&&a.has(J)}),V=-1,G=de.id(),K=0;K<P.length;K++){var Q=P[K],be=gn(Q);V=Math.max(V,be.depth)}return U.depth<=V?ye[G]?null:(x(de,V+1),ye[G]=!0,!0):!1};if(i&&s){var L=[],A={},O=function(de){return L.push(de)},I=function(){return L.shift()};for(n.forEach(function(fe){return L.push(fe)});L.length>0;){var N=I(),z=D(N,A);if(z)N.outgoers().filter(function(fe){return fe.isNode()&&a.has(fe)}).forEach(O);else if(z===null){Ke("Detected double maximal shift for node `"+N.id()+"`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");break}}}C();var $=0;if(e.avoidOverlap)for(var B=0;B<n.length;B++){var R=n[B],H=R.layoutDimensions(e),M=H.w,j=H.h;$=Math.max($,M,j)}for(var W={},te=function(de){if(W[de.id()])return W[de.id()];for(var ye=gn(de).depth,U=de.neighborhood(),P=0,V=0,G=0;G<U.length;G++){var K=U[G];if(!(K.isEdge()||K.isParent()||!n.has(K))){var Q=gn(K);if(Q!=null){var be=Q.index,J=Q.depth;if(!(be==null||J==null)){var me=m[J].length;J<ye&&(P+=be/me,V++)}}}}return V=Math.max(1,V),P=P/V,V===0&&(P=0),W[de.id()]=P,P},X=function(de,ye){var U=te(de),P=te(ye),V=U-P;return V===0?Ic(de.id(),ye.id()):V},Y=0;Y<m.length;Y++)m[Y].sort(X),T(Y);for(var F=[],Z=0;Z<k.length;Z++)F.push(k[Z]);m.unshift(F),C();for(var se=0,ie=0;ie<m.length;ie++)se=Math.max(m[ie].length,se);var pe={x:l.x1+l.w/2,y:l.x1+l.h/2},De=m.reduce(function(fe,de){return Math.max(fe,de.length)},0),Te=function(de){var ye=gn(de),U=ye.depth,P=ye.index,V=m[U].length,G=Math.max(l.w/((e.grid?De:V)+1),$),K=Math.max(l.h/(m.length+1),$),Q=Math.min(l.w/2/m.length,l.h/2/m.length);if(Q=Math.max(Q,$),e.circle){var J=Q*U+Q-(m.length>0&&m[0].length<=3?Q/2:0),me=2*Math.PI/m[U].length*P;return U===0&&m[0].length===1&&(J=1),{x:pe.x+J*Math.cos(me),y:pe.y+J*Math.sin(me)}}else{var be={x:pe.x+(P+1-(V+1)/2)*G,y:(U+1)*K};return be}};return a.nodes().layoutPositions(this,e,Te),this};var hb={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,radius:void 0,startAngle:3/2*Math.PI,sweep:void 0,clockwise:!0,sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function lh(t){this.options=ke({},hb,t)}lh.prototype.run=function(){var t=this.options,e=t,r=t.cy,a=e.eles,n=e.counterclockwise!==void 0?!e.counterclockwise:e.clockwise,o=a.nodes().not(":parent");e.sort&&(o=o.sort(e.sort));for(var i=Qt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()}),s={x:i.x1+i.w/2,y:i.y1+i.h/2},l=e.sweep===void 0?2*Math.PI-2*Math.PI/o.length:e.sweep,u=l/Math.max(1,o.length-1),c,d=0,h=0;h<o.length;h++){var p=o[h],g=p.layoutDimensions(e),f=g.w,v=g.h;d=Math.max(d,f,v)}if(ce(e.radius)?c=e.radius:o.length<=1?c=0:c=Math.min(i.h,i.w)/2-d,o.length>1&&e.avoidOverlap){d*=1.75;var m=Math.cos(u)-Math.cos(0),y=Math.sin(u)-Math.sin(0),b=Math.sqrt(d*d/(m*m+y*y));c=Math.max(b,c)}var x=function(E,_){var T=e.startAngle+_*u*(n?1:-1),C=c*Math.cos(T),D=c*Math.sin(T),L={x:s.x+C,y:s.y+D};return L};return a.nodes().layoutPositions(this,e,x),this};var fb={fit:!0,padding:30,startAngle:3/2*Math.PI,sweep:void 0,clockwise:!0,equidistant:!1,minNodeSpacing:10,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,height:void 0,width:void 0,spacingFactor:void 0,concentric:function(e){return e.degree()},levelWidth:function(e){return e.maxDegree()/4},animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function uh(t){this.options=ke({},fb,t)}uh.prototype.run=function(){for(var t=this.options,e=t,r=e.counterclockwise!==void 0?!e.counterclockwise:e.clockwise,a=t.cy,n=e.eles,o=n.nodes().not(":parent"),i=Qt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:a.width(),h:a.height()}),s={x:i.x1+i.w/2,y:i.y1+i.h/2},l=[],u=0,c=0;c<o.length;c++){var d=o[c],h=void 0;h=e.concentric(d),l.push({value:h,node:d}),d._private.scratch.concentric=h}o.updateStyle();for(var p=0;p<o.length;p++){var g=o[p],f=g.layoutDimensions(e);u=Math.max(u,f.w,f.h)}l.sort(function(fe,de){return de.value-fe.value});for(var v=e.levelWidth(o),m=[[]],y=m[0],b=0;b<l.length;b++){var x=l[b];if(y.length>0){var k=Math.abs(y[0].value-x.value);k>=v&&(y=[],m.push(y))}y.push(x)}var E=u+e.minNodeSpacing;if(!e.avoidOverlap){var _=m.length>0&&m[0].length>1,T=Math.min(i.w,i.h)/2-E,C=T/(m.length+_?1:0);E=Math.min(E,C)}for(var D=0,L=0;L<m.length;L++){var A=m[L],O=e.sweep===void 0?2*Math.PI-2*Math.PI/A.length:e.sweep,I=A.dTheta=O/Math.max(1,A.length-1);if(A.length>1&&e.avoidOverlap){var N=Math.cos(I)-Math.cos(0),z=Math.sin(I)-Math.sin(0),$=Math.sqrt(E*E/(N*N+z*z));D=Math.max($,D)}A.r=D,D+=E}if(e.equidistant){for(var B=0,R=0,H=0;H<m.length;H++){var M=m[H],j=M.r-R;B=Math.max(B,j)}R=0;for(var W=0;W<m.length;W++){var te=m[W];W===0&&(R=te.r),te.r=R,R+=B}}for(var X={},Y=0;Y<m.length;Y++)for(var F=m[Y],Z=F.dTheta,se=F.r,ie=0;ie<F.length;ie++){var pe=F[ie],De=e.startAngle+(r?1:-1)*Z*ie,Te={x:s.x+se*Math.cos(De),y:s.y+se*Math.sin(De)};X[pe.node.id()]=Te}return n.nodes().layoutPositions(this,e,function(fe){var de=fe.id();return X[de]}),this};var el,pb={ready:function(){},stop:function(){},animate:!0,animationEasing:void 0,animationDuration:void 0,animateFilter:function(e,r){return!0},animationThreshold:250,refresh:20,fit:!0,padding:30,boundingBox:void 0,nodeDimensionsIncludeLabels:!1,randomize:!1,componentSpacing:40,nodeRepulsion:function(e){return 2048},nodeOverlap:4,idealEdgeLength:function(e){return 32},edgeElasticity:function(e){return 32},nestingFactor:1.2,gravity:1,numIter:1e3,initialTemp:1e3,coolingFactor:.99,minTemp:1};function Do(t){this.options=ke({},pb,t),this.options.layout=this}Do.prototype.run=function(){var t=this.options,e=t.cy,r=this;r.stopped=!1,(t.animate===!0||t.animate===!1)&&r.emit({type:"layoutstart",layout:r}),t.debug===!0?el=!0:el=!1;var a=vb(e,r,t);el&&yL(a),t.randomize&&yb(a);var n=Or(),o=function(){bb(a,e,t),t.fit===!0&&e.fit(t.padding)},i=function(h){return!(r.stopped||h>=t.numIter||(wb(a,t),a.temperature=a.temperature*t.coolingFactor,a.temperature<t.minTemp))},s=function(){if(t.animate===!0||t.animate===!1)o(),r.one("layoutstop",t.stop),r.emit({type:"layoutstop",layout:r});else{var h=t.eles.nodes(),p=ch(a,t,h);h.layoutPositions(r,t,p)}},l=0,u=!0;if(t.animate===!0){var c=function d(){for(var h=0;u&&h<t.refresh;)u=i(l),l++,h++;if(!u)hh(a,t),s();else{var p=Or();p-n>=t.animationThreshold&&o(),Zi(d)}};c()}else{for(;u;)u=i(l),l++;hh(a,t),s()}return this};Do.prototype.stop=function(){return this.stopped=!0,this.thread&&this.thread.stop(),this.emit("layoutstop"),this};Do.prototype.destroy=function(){return this.thread&&this.thread.stop(),this};var vb=function(e,r,a){for(var n=a.eles.edges(),o=a.eles.nodes(),i={isCompound:e.hasCompoundNodes(),layoutNodes:[],idToIndex:{},nodeSize:o.size(),graphSet:[],indexToGraph:[],layoutEdges:[],edgeSize:n.size(),temperature:a.initialTemp,clientWidth:e.width(),clientHeight:e.width(),boundingBox:Qt(a.boundingBox?a.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()})},s=a.eles.components(),l={},u=0;u<s.length;u++)for(var c=s[u],d=0;d<c.length;d++){var h=c[d];l[h.id()]=u}for(var u=0;u<i.nodeSize;u++){var p=o[u],g=p.layoutDimensions(a),f={};f.isLocked=p.locked(),f.id=p.data("id"),f.parentId=p.data("parent"),f.cmptId=l[p.id()],f.children=[],f.positionX=p.position("x"),f.positionY=p.position("y"),f.offsetX=0,f.offsetY=0,f.height=g.w,f.width=g.h,f.maxX=f.positionX+f.width/2,f.minX=f.positionX-f.width/2,f.maxY=f.positionY+f.height/2,f.minY=f.positionY-f.height/2,f.padLeft=parseFloat(p.style("padding")),f.padRight=parseFloat(p.style("padding")),f.padTop=parseFloat(p.style("padding")),f.padBottom=parseFloat(p.style("padding")),f.nodeRepulsion=rt(a.nodeRepulsion)?a.nodeRepulsion(p):a.nodeRepulsion,i.layoutNodes.push(f),i.idToIndex[f.id]=u}for(var v=[],m=0,y=-1,b=[],u=0;u<i.nodeSize;u++){var p=i.layoutNodes[u],x=p.parentId;x!=null?i.layoutNodes[i.idToIndex[x]].children.push(p.id):(v[++y]=p.id,b.push(p.id))}for(i.graphSet.push(b);m<=y;){var k=v[m++],E=i.idToIndex[k],h=i.layoutNodes[E],_=h.children;if(_.length>0){i.graphSet.push(_);for(var u=0;u<_.length;u++)v[++y]=_[u]}}for(var u=0;u<i.graphSet.length;u++)for(var T=i.graphSet[u],d=0;d<T.length;d++){var C=i.idToIndex[T[d]];i.indexToGraph[C]=u}for(var u=0;u<i.edgeSize;u++){var D=n[u],L={};L.id=D.data("id"),L.sourceId=D.data("source"),L.targetId=D.data("target");var A=rt(a.idealEdgeLength)?a.idealEdgeLength(D):a.idealEdgeLength,O=rt(a.edgeElasticity)?a.edgeElasticity(D):a.edgeElasticity,I=i.idToIndex[L.sourceId],N=i.idToIndex[L.targetId],z=i.indexToGraph[I],$=i.indexToGraph[N];if(z!=$){for(var B=gb(L.sourceId,L.targetId,i),R=i.graphSet[B],H=0,f=i.layoutNodes[I];R.indexOf(f.id)===-1;)f=i.layoutNodes[i.idToIndex[f.parentId]],H++;for(f=i.layoutNodes[N];R.indexOf(f.id)===-1;)f=i.layoutNodes[i.idToIndex[f.parentId]],H++;A*=H*a.nestingFactor}L.idealLength=A,L.elasticity=O,i.layoutEdges.push(L)}return i},gb=function(e,r,a){var n=mb(e,r,0,a);return 2>n.count?0:n.graph},mb=function t(e,r,a,n){var o=n.graphSet[a];if(-1<o.indexOf(e)&&-1<o.indexOf(r))return{count:2,graph:a};for(var i=0,s=0;s<o.length;s++){var l=o[s],u=n.idToIndex[l],c=n.layoutNodes[u].children;if(c.length!==0){var d=n.indexToGraph[n.idToIndex[c[0]]],h=t(e,r,d,n);if(h.count!==0)if(h.count===1){if(i++,i===2)break}else return h}}return{count:i,graph:a}},yb=function(e,r){for(var a=e.clientWidth,n=e.clientHeight,o=0;o<e.nodeSize;o++){var i=e.layoutNodes[o];i.children.length===0&&!i.isLocked&&(i.positionX=Math.random()*a,i.positionY=Math.random()*n)}},ch=function(e,r,a){var n=e.boundingBox,o={x1:1/0,x2:-1/0,y1:1/0,y2:-1/0};return r.boundingBox&&(a.forEach(function(i){var s=e.layoutNodes[e.idToIndex[i.data("id")]];o.x1=Math.min(o.x1,s.positionX),o.x2=Math.max(o.x2,s.positionX),o.y1=Math.min(o.y1,s.positionY),o.y2=Math.max(o.y2,s.positionY)}),o.w=o.x2-o.x1,o.h=o.y2-o.y1),function(i,s){var l=e.layoutNodes[e.idToIndex[i.data("id")]];if(r.boundingBox){var u=(l.positionX-o.x1)/o.w,c=(l.positionY-o.y1)/o.h;return{x:n.x1+u*n.w,y:n.y1+c*n.h}}else return{x:l.positionX,y:l.positionY}}},bb=function(e,r,a){var n=a.layout,o=a.eles.nodes(),i=ch(e,a,o);o.positions(i),e.ready!==!0&&(e.ready=!0,n.one("layoutready",a.ready),n.emit({type:"layoutready",layout:this}))},wb=function(e,r,a){xb(e,r),Cb(e),Eb(e,r),Sb(e),Tb(e)},xb=function(e,r){for(var a=0;a<e.graphSet.length;a++)for(var n=e.graphSet[a],o=n.length,i=0;i<o;i++)for(var s=e.layoutNodes[e.idToIndex[n[i]]],l=i+1;l<o;l++){var u=e.layoutNodes[e.idToIndex[n[l]]];kb(s,u,e,r)}},dh=function(e){return-e+2*e*Math.random()},kb=function(e,r,a,n){var o=e.cmptId,i=r.cmptId;if(!(o!==i&&!a.isCompound)){var s=r.positionX-e.positionX,l=r.positionY-e.positionY,u=1;s===0&&l===0&&(s=dh(u),l=dh(u));var c=_b(e,r,s,l);if(c>0)var d=n.nodeOverlap*c,h=Math.sqrt(s*s+l*l),p=d*s/h,g=d*l/h;else var f=Po(e,s,l),v=Po(r,-1*s,-1*l),m=v.x-f.x,y=v.y-f.y,b=m*m+y*y,h=Math.sqrt(b),d=(e.nodeRepulsion+r.nodeRepulsion)/b,p=d*m/h,g=d*y/h;e.isLocked||(e.offsetX-=p,e.offsetY-=g),r.isLocked||(r.offsetX+=p,r.offsetY+=g)}},_b=function(e,r,a,n){if(a>0)var o=e.maxX-r.minX;else var o=r.maxX-e.minX;if(n>0)var i=e.maxY-r.minY;else var i=r.maxY-e.minY;return o>=0&&i>=0?Math.sqrt(o*o+i*i):0},Po=function(e,r,a){var n=e.positionX,o=e.positionY,i=e.height||1,s=e.width||1,l=a/r,u=i/s,c={};return r===0&&0<a||r===0&&0>a?(c.x=n,c.y=o+i/2,c):0<r&&-1*u<=l&&l<=u?(c.x=n+s/2,c.y=o+s*a/2/r,c):0>r&&-1*u<=l&&l<=u?(c.x=n-s/2,c.y=o-s*a/2/r,c):0<a&&(l<=-1*u||l>=u)?(c.x=n+i*r/2/a,c.y=o+i/2,c):(0>a&&(l<=-1*u||l>=u)&&(c.x=n-i*r/2/a,c.y=o-i/2),c)},Cb=function(e,r){for(var a=0;a<e.edgeSize;a++){var n=e.layoutEdges[a],o=e.idToIndex[n.sourceId],i=e.layoutNodes[o],s=e.idToIndex[n.targetId],l=e.layoutNodes[s],u=l.positionX-i.positionX,c=l.positionY-i.positionY;if(!(u===0&&c===0)){var d=Po(i,u,c),h=Po(l,-1*u,-1*c),p=h.x-d.x,g=h.y-d.y,f=Math.sqrt(p*p+g*g),v=Math.pow(n.idealLength-f,2)/n.elasticity;if(f!==0)var m=v*p/f,y=v*g/f;else var m=0,y=0;i.isLocked||(i.offsetX+=m,i.offsetY+=y),l.isLocked||(l.offsetX-=m,l.offsetY-=y)}}},Eb=function(e,r){for(var a=1,n=0;n<e.graphSet.length;n++){var o=e.graphSet[n],i=o.length;if(n===0)var s=e.clientHeight/2,l=e.clientWidth/2;else var u=e.layoutNodes[e.idToIndex[o[0]]],c=e.layoutNodes[e.idToIndex[u.parentId]],s=c.positionX,l=c.positionY;for(var d=0;d<i;d++){var h=e.layoutNodes[e.idToIndex[o[d]]];if(!h.isLocked){var p=s-h.positionX,g=l-h.positionY,f=Math.sqrt(p*p+g*g);if(f>a){var v=r.gravity*p/f,m=r.gravity*g/f;h.offsetX+=v,h.offsetY+=m}}}}},Sb=function(e,r){var a=[],n=0,o=-1;for(a.push.apply(a,e.graphSet[0]),o+=e.graphSet[0].length;n<=o;){var i=a[n++],s=e.idToIndex[i],l=e.layoutNodes[s],u=l.children;if(0<u.length&&!l.isLocked){for(var c=l.offsetX,d=l.offsetY,h=0;h<u.length;h++){var p=e.layoutNodes[e.idToIndex[u[h]]];p.offsetX+=c,p.offsetY+=d,a[++o]=u[h]}l.offsetX=0,l.offsetY=0}}},Tb=function(e,r){for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];0<n.children.length&&(n.maxX=void 0,n.minX=void 0,n.maxY=void 0,n.minY=void 0)}for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];if(!(0<n.children.length||n.isLocked)){var o=Db(n.offsetX,n.offsetY,e.temperature);n.positionX+=o.x,n.positionY+=o.y,n.offsetX=0,n.offsetY=0,n.minX=n.positionX-n.width,n.maxX=n.positionX+n.width,n.minY=n.positionY-n.height,n.maxY=n.positionY+n.height,Pb(n,e)}}for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];0<n.children.length&&!n.isLocked&&(n.positionX=(n.maxX+n.minX)/2,n.positionY=(n.maxY+n.minY)/2,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY)}},Db=function(e,r,a){var n=Math.sqrt(e*e+r*r);if(n>a)var o={x:a*e/n,y:a*r/n};else var o={x:e,y:r};return o},Pb=function t(e,r){var a=e.parentId;if(a!=null){var n=r.layoutNodes[r.idToIndex[a]],o=!1;if((n.maxX==null||e.maxX+n.padRight>n.maxX)&&(n.maxX=e.maxX+n.padRight,o=!0),(n.minX==null||e.minX-n.padLeft<n.minX)&&(n.minX=e.minX-n.padLeft,o=!0),(n.maxY==null||e.maxY+n.padBottom>n.maxY)&&(n.maxY=e.maxY+n.padBottom,o=!0),(n.minY==null||e.minY-n.padTop<n.minY)&&(n.minY=e.minY-n.padTop,o=!0),o)return t(n,r)}},hh=function(e,r){for(var a=e.layoutNodes,n=[],o=0;o<a.length;o++){var i=a[o],s=i.cmptId,l=n[s]=n[s]||[];l.push(i)}for(var u=0,o=0;o<n.length;o++){var c=n[o];if(!!c){c.x1=1/0,c.x2=-1/0,c.y1=1/0,c.y2=-1/0;for(var d=0;d<c.length;d++){var h=c[d];c.x1=Math.min(c.x1,h.positionX-h.width/2),c.x2=Math.max(c.x2,h.positionX+h.width/2),c.y1=Math.min(c.y1,h.positionY-h.height/2),c.y2=Math.max(c.y2,h.positionY+h.height/2)}c.w=c.x2-c.x1,c.h=c.y2-c.y1,u+=c.w*c.h}}n.sort(function(y,b){return b.w*b.h-y.w*y.h});for(var p=0,g=0,f=0,v=0,m=Math.sqrt(u)*e.clientWidth/e.clientHeight,o=0;o<n.length;o++){var c=n[o];if(!!c){for(var d=0;d<c.length;d++){var h=c[d];h.isLocked||(h.positionX+=p-c.x1,h.positionY+=g-c.y1)}p+=c.w+r.componentSpacing,f+=c.w+r.componentSpacing,v=Math.max(v,c.h),f>m&&(g+=v+r.componentSpacing,p=0,f=0,v=0)}}},Ab={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,avoidOverlapPadding:10,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,condense:!1,rows:void 0,cols:void 0,position:function(e){},sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function fh(t){this.options=ke({},Ab,t)}fh.prototype.run=function(){var t=this.options,e=t,r=t.cy,a=e.eles,n=a.nodes().not(":parent");e.sort&&(n=n.sort(e.sort));var o=Qt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()});if(o.h===0||o.w===0)a.nodes().layoutPositions(this,e,function(W){return{x:o.x1,y:o.y1}});else{var i=n.size(),s=Math.sqrt(i*o.h/o.w),l=Math.round(s),u=Math.round(o.w/o.h*s),c=function(te){if(te==null)return Math.min(l,u);var X=Math.min(l,u);X==l?l=te:u=te},d=function(te){if(te==null)return Math.max(l,u);var X=Math.max(l,u);X==l?l=te:u=te},h=e.rows,p=e.cols!=null?e.cols:e.columns;if(h!=null&&p!=null)l=h,u=p;else if(h!=null&&p==null)l=h,u=Math.ceil(i/l);else if(h==null&&p!=null)u=p,l=Math.ceil(i/u);else if(u*l>i){var g=c(),f=d();(g-1)*f>=i?c(g-1):(f-1)*g>=i&&d(f-1)}else for(;u*l<i;){var v=c(),m=d();(m+1)*v>=i?d(m+1):c(v+1)}var y=o.w/u,b=o.h/l;if(e.condense&&(y=0,b=0),e.avoidOverlap)for(var x=0;x<n.length;x++){var k=n[x],E=k._private.position;(E.x==null||E.y==null)&&(E.x=0,E.y=0);var _=k.layoutDimensions(e),T=e.avoidOverlapPadding,C=_.w+T,D=_.h+T;y=Math.max(y,C),b=Math.max(b,D)}for(var L={},A=function(te,X){return!!L["c-"+te+"-"+X]},O=function(te,X){L["c-"+te+"-"+X]=!0},I=0,N=0,z=function(){N++,N>=u&&(N=0,I++)},$={},B=0;B<n.length;B++){var R=n[B],H=e.position(R);if(H&&(H.row!==void 0||H.col!==void 0)){var M={row:H.row,col:H.col};if(M.col===void 0)for(M.col=0;A(M.row,M.col);)M.col++;else if(M.row===void 0)for(M.row=0;A(M.row,M.col);)M.row++;$[R.id()]=M,O(M.row,M.col)}}var j=function(te,X){var Y,F;if(te.locked()||te.isParent())return!1;var Z=$[te.id()];if(Z)Y=Z.col*y+y/2+o.x1,F=Z.row*b+b/2+o.y1;else{for(;A(I,N);)z();Y=N*y+y/2+o.x1,F=I*b+b/2+o.y1,O(I,N),z()}return{x:Y,y:F}};n.layoutPositions(this,e,j)}return this};var Lb={ready:function(){},stop:function(){}};function tl(t){this.options=ke({},Lb,t)}tl.prototype.run=function(){var t=this.options,e=t.eles,r=this,a=t.cy;return r.emit("layoutstart"),e.nodes().positions(function(){return{x:0,y:0}}),r.one("layoutready",t.ready),r.emit("layoutready"),r.one("layoutstop",t.stop),r.emit("layoutstop"),this};tl.prototype.stop=function(){return this};var Ib={positions:void 0,zoom:void 0,pan:void 0,fit:!0,padding:30,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function ph(t){this.options=ke({},Ib,t)}ph.prototype.run=function(){var t=this.options,e=t.eles,r=e.nodes(),a=rt(t.positions);function n(o){if(t.positions==null)return Ym(o.position());if(a)return t.positions(o);var i=t.positions[o._private.data.id];return i??null}return r.layoutPositions(this,t,function(o,i){var s=n(o);return o.locked()||s==null?!1:s}),this};var Ob={fit:!0,padding:30,boundingBox:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function vh(t){this.options=ke({},Ob,t)}vh.prototype.run=function(){var t=this.options,e=t.cy,r=t.eles,a=Qt(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()}),n=function(i,s){return{x:a.x1+Math.round(Math.random()*a.w),y:a.y1+Math.round(Math.random()*a.h)}};return r.nodes().layoutPositions(this,t,n),this};var $b=[{name:"breadthfirst",impl:sh},{name:"circle",impl:lh},{name:"concentric",impl:uh},{name:"cose",impl:Do},{name:"grid",impl:fh},{name:"null",impl:tl},{name:"preset",impl:ph},{name:"random",impl:vh}];function gh(t){this.options=t,this.notifications=0}var mh=function(){},yh=function(){throw new Error("A headless instance can not render images")};gh.prototype={recalculateRenderedStyle:mh,notify:function(){this.notifications++},init:mh,isHeadless:function(){return!0},png:yh,jpg:yh};var rl={};rl.arrowShapeWidth=.3;rl.registerArrowShapes=function(){var t=this.arrowShapes={},e=this,r=function(u,c,d,h,p,g,f){var v=p.x-d/2-f,m=p.x+d/2+f,y=p.y-d/2-f,b=p.y+d/2+f,x=v<=u&&u<=m&&y<=c&&c<=b;return x},a=function(u,c,d,h,p){var g=u*Math.cos(h)-c*Math.sin(h),f=u*Math.sin(h)+c*Math.cos(h),v=g*d,m=f*d,y=v+p.x,b=m+p.y;return{x:y,y:b}},n=function(u,c,d,h){for(var p=[],g=0;g<u.length;g+=2){var f=u[g],v=u[g+1];p.push(a(f,v,c,d,h))}return p},o=function(u){for(var c=[],d=0;d<u.length;d++){var h=u[d];c.push(h.x,h.y)}return c},i=function(u){return u.pstyle("width").pfValue*u.pstyle("arrow-scale").pfValue*2},s=function(u,c){we(c)&&(c=t[c]),t[u]=ke({name:u,points:[-.15,-.3,.15,-.3,.15,.3,-.15,.3],collide:function(h,p,g,f,v,m){var y=o(n(this.points,g+2*m,f,v)),b=Yt(h,p,y);return b},roughCollide:r,draw:function(h,p,g,f){var v=n(this.points,p,g,f);e.arrowShapeImpl("polygon")(h,v)},spacing:function(h){return 0},gap:i},c)};s("none",{collide:Ji,roughCollide:Ji,draw:Ds,spacing:Vc,gap:Vc}),s("triangle",{points:[-.15,-.3,0,0,.15,-.3]}),s("arrow","triangle"),s("triangle-backcurve",{points:t.triangle.points,controlPoint:[0,-.15],roughCollide:r,draw:function(u,c,d,h,p){var g=n(this.points,c,d,h),f=this.controlPoint,v=a(f[0],f[1],c,d,h);e.arrowShapeImpl(this.name)(u,g,v)},gap:function(u){return i(u)*.8}}),s("triangle-tee",{points:[0,0,.15,-.3,-.15,-.3,0,0],pointsTee:[-.15,-.4,-.15,-.5,.15,-.5,.15,-.4],collide:function(u,c,d,h,p,g,f){var v=o(n(this.points,d+2*f,h,p)),m=o(n(this.pointsTee,d+2*f,h,p)),y=Yt(u,c,v)||Yt(u,c,m);return y},draw:function(u,c,d,h,p){var g=n(this.points,c,d,h),f=n(this.pointsTee,c,d,h);e.arrowShapeImpl(this.name)(u,g,f)}}),s("circle-triangle",{radius:.15,pointsTr:[0,-.15,.15,-.45,-.15,-.45,0,-.15],collide:function(u,c,d,h,p,g,f){var v=p,m=Math.pow(v.x-u,2)+Math.pow(v.y-c,2)<=Math.pow((d+2*f)*this.radius,2),y=o(n(this.points,d+2*f,h,p));return Yt(u,c,y)||m},draw:function(u,c,d,h,p){var g=n(this.pointsTr,c,d,h);e.arrowShapeImpl(this.name)(u,g,h.x,h.y,this.radius*c)},spacing:function(u){return e.getArrowWidth(u.pstyle("width").pfValue,u.pstyle("arrow-scale").value)*this.radius}}),s("triangle-cross",{points:[0,0,.15,-.3,-.15,-.3,0,0],baseCrossLinePts:[-.15,-.4,-.15,-.4,.15,-.4,.15,-.4],crossLinePts:function(u,c){var d=this.baseCrossLinePts.slice(),h=c/u,p=3,g=5;return d[p]=d[p]-h,d[g]=d[g]-h,d},collide:function(u,c,d,h,p,g,f){var v=o(n(this.points,d+2*f,h,p)),m=o(n(this.crossLinePts(d,g),d+2*f,h,p)),y=Yt(u,c,v)||Yt(u,c,m);return y},draw:function(u,c,d,h,p){var g=n(this.points,c,d,h),f=n(this.crossLinePts(c,p),c,d,h);e.arrowShapeImpl(this.name)(u,g,f)}}),s("vee",{points:[-.15,-.3,0,0,.15,-.3,0,-.15],gap:function(u){return i(u)*.525}}),s("circle",{radius:.15,collide:function(u,c,d,h,p,g,f){var v=p,m=Math.pow(v.x-u,2)+Math.pow(v.y-c,2)<=Math.pow((d+2*f)*this.radius,2);return m},draw:function(u,c,d,h,p){e.arrowShapeImpl(this.name)(u,h.x,h.y,this.radius*c)},spacing:function(u){return e.getArrowWidth(u.pstyle("width").pfValue,u.pstyle("arrow-scale").value)*this.radius}}),s("tee",{points:[-.15,0,-.15,-.1,.15,-.1,.15,0],spacing:function(u){return 1},gap:function(u){return 1}}),s("square",{points:[-.15,0,.15,0,.15,-.3,-.15,-.3]}),s("diamond",{points:[-.15,-.15,0,-.3,.15,-.15,0,0],gap:function(u){return u.pstyle("width").pfValue*u.pstyle("arrow-scale").value}}),s("chevron",{points:[0,0,-.15,-.15,-.1,-.2,0,-.1,.1,-.2,.15,-.15],gap:function(u){return .95*u.pstyle("width").pfValue*u.pstyle("arrow-scale").value}})};var Ta={};Ta.projectIntoViewport=function(t,e){var r=this.cy,a=this.findContainerClientCoords(),n=a[0],o=a[1],i=a[4],s=r.pan(),l=r.zoom(),u=((t-n)/i-s.x)/l,c=((e-o)/i-s.y)/l;return[u,c]};Ta.findContainerClientCoords=function(){if(this.containerBB)return this.containerBB;var t=this.container,e=t.getBoundingClientRect(),r=tt.getComputedStyle(t),a=function(m){return parseFloat(r.getPropertyValue(m))},n={left:a("padding-left"),right:a("padding-right"),top:a("padding-top"),bottom:a("padding-bottom")},o={left:a("border-left-width"),right:a("border-right-width"),top:a("border-top-width"),bottom:a("border-bottom-width")},i=t.clientWidth,s=t.clientHeight,l=n.left+n.right,u=n.top+n.bottom,c=o.left+o.right,d=e.width/(i+c),h=i-l,p=s-u,g=e.left+n.left+o.left,f=e.top+n.top+o.top;return this.containerBB=[g,f,h,p,d]};Ta.invalidateContainerClientCoordsCache=function(){this.containerBB=null};Ta.findNearestElement=function(t,e,r,a){return this.findNearestElements(t,e,r,a)[0]};Ta.findNearestElements=function(t,e,r,a){var n=this,o=this,i=o.getCachedZSortedEles(),s=[],l=o.cy.zoom(),u=o.cy.hasCompoundNodes(),c=(a?24:8)/l,d=(a?8:2)/l,h=(a?8:2)/l,p=1/0,g,f;r&&(i=i.interactive);function v(_,T){if(_.isNode()){if(f)return;f=_,s.push(_)}if(_.isEdge()&&(T==null||T<p))if(g){if(g.pstyle("z-compound-depth").value===_.pstyle("z-compound-depth").value&&g.pstyle("z-compound-depth").value===_.pstyle("z-compound-depth").value){for(var C=0;C<s.length;C++)if(s[C].isEdge()){s[C]=_,g=_,p=T??p;break}}}else s.push(_),g=_,p=T??p}function m(_){var T=_.outerWidth()+2*d,C=_.outerHeight()+2*d,D=T/2,L=C/2,A=_.position();if(A.x-D<=t&&t<=A.x+D&&A.y-L<=e&&e<=A.y+L){var O=o.nodeShapes[n.getNodeShape(_)];if(O.checkPoint(t,e,0,T,C,A.x,A.y))return v(_,0),!0}}function y(_){var T=_._private,C=T.rscratch,D=_.pstyle("width").pfValue,L=_.pstyle("arrow-scale").value,A=D/2+c,O=A*A,I=A*2,N=T.source,z=T.target,$;if(C.edgeType==="segments"||C.edgeType==="straight"||C.edgeType==="haystack"){for(var B=C.allpts,R=0;R+3<B.length;R+=2)if(i0(t,e,B[R],B[R+1],B[R+2],B[R+3],I)&&O>($=c0(t,e,B[R],B[R+1],B[R+2],B[R+3])))return v(_,$),!0}else if(C.edgeType==="bezier"||C.edgeType==="multibezier"||C.edgeType==="self"||C.edgeType==="compound"){for(var B=C.allpts,R=0;R+5<C.allpts.length;R+=4)if(o0(t,e,B[R],B[R+1],B[R+2],B[R+3],B[R+4],B[R+5],I)&&O>($=u0(t,e,B[R],B[R+1],B[R+2],B[R+3],B[R+4],B[R+5])))return v(_,$),!0}for(var N=N||T.source,z=z||T.target,H=n.getArrowWidth(D,L),M=[{name:"source",x:C.arrowStartX,y:C.arrowStartY,angle:C.srcArrowAngle},{name:"target",x:C.arrowEndX,y:C.arrowEndY,angle:C.tgtArrowAngle},{name:"mid-source",x:C.midX,y:C.midY,angle:C.midsrcArrowAngle},{name:"mid-target",x:C.midX,y:C.midY,angle:C.midtgtArrowAngle}],R=0;R<M.length;R++){var j=M[R],W=o.arrowShapes[_.pstyle(j.name+"-arrow-shape").value],te=_.pstyle("width").pfValue;if(W.roughCollide(t,e,H,j.angle,{x:j.x,y:j.y},te,c)&&W.collide(t,e,H,j.angle,{x:j.x,y:j.y},te,c))return v(_),!0}u&&s.length>0&&(m(N),m(z))}function b(_,T,C){return pr(_,T,C)}function x(_,T){var C=_._private,D=h,L;T?L=T+"-":L="",_.boundingBox();var A=C.labelBounds[T||"main"],O=_.pstyle(L+"label").value,I=_.pstyle("text-events").strValue==="yes";if(!(!I||!O)){var N=b(C.rscratch,"labelX",T),z=b(C.rscratch,"labelY",T),$=b(C.rscratch,"labelAngle",T),B=_.pstyle(L+"text-margin-x").pfValue,R=_.pstyle(L+"text-margin-y").pfValue,H=A.x1-D-B,M=A.x2+D-B,j=A.y1-D-R,W=A.y2+D-R;if($){var te=Math.cos($),X=Math.sin($),Y=function(Te,fe){return Te=Te-N,fe=fe-z,{x:Te*te-fe*X+N,y:Te*X+fe*te+z}},F=Y(H,j),Z=Y(H,W),se=Y(M,j),ie=Y(M,W),pe=[F.x+B,F.y+R,se.x+B,se.y+R,ie.x+B,ie.y+R,Z.x+B,Z.y+R];if(Yt(t,e,pe))return v(_),!0}else if(an(A,t,e))return v(_),!0}}for(var k=i.length-1;k>=0;k--){var E=i[k];E.isNode()?m(E)||x(E):y(E)||x(E)||x(E,"source")||x(E,"target")}return s};Ta.getAllInBox=function(t,e,r,a){var n=this.getCachedZSortedEles().interactive,o=[],i=Math.min(t,r),s=Math.max(t,r),l=Math.min(e,a),u=Math.max(e,a);t=i,r=s,e=l,a=u;for(var c=Qt({x1:t,y1:e,x2:r,y2:a}),d=0;d<n.length;d++){var h=n[d];if(h.isNode()){var p=h,g=p.boundingBox({includeNodes:!0,includeEdges:!1,includeLabels:!1});Os(c,g)&&!qc(g,c)&&o.push(p)}else{var f=h,v=f._private,m=v.rscratch;if(m.startX!=null&&m.startY!=null&&!an(c,m.startX,m.startY)||m.endX!=null&&m.endY!=null&&!an(c,m.endX,m.endY))continue;if(m.edgeType==="bezier"||m.edgeType==="multibezier"||m.edgeType==="self"||m.edgeType==="compound"||m.edgeType==="segments"||m.edgeType==="haystack"){for(var y=v.rstyle.bezierPts||v.rstyle.linePts||v.rstyle.haystackPts,b=!0,x=0;x<y.length;x++)if(!n0(c,y[x])){b=!1;break}b&&o.push(f)}else(m.edgeType==="haystack"||m.edgeType==="straight")&&o.push(f)}}return o};var Ao={};Ao.calculateArrowAngles=function(t){var e=t._private.rscratch,r=e.edgeType==="haystack",a=e.edgeType==="bezier",n=e.edgeType==="multibezier",o=e.edgeType==="segments",i=e.edgeType==="compound",s=e.edgeType==="self",l,u,c,d,h,p,g,f;if(r?(c=e.haystackPts[0],d=e.haystackPts[1],h=e.haystackPts[2],p=e.haystackPts[3]):(c=e.arrowStartX,d=e.arrowStartY,h=e.arrowEndX,p=e.arrowEndY),g=e.midX,f=e.midY,o)l=c-e.segpts[0],u=d-e.segpts[1];else if(n||i||s||a){var v=e.allpts,m=mt(v[0],v[2],v[4],.1),y=mt(v[1],v[3],v[5],.1);l=c-m,u=d-y}else l=c-g,u=d-f;e.srcArrowAngle=ro(l,u);var g=e.midX,f=e.midY;if(r&&(g=(c+h)/2,f=(d+p)/2),l=h-c,u=p-d,o){var v=e.allpts;if(v.length/2%2==0){var b=v.length/2,x=b-2;l=v[b]-v[x],u=v[b+1]-v[x+1]}else{var b=v.length/2-1,x=b-2,k=b+2;l=v[b]-v[x],u=v[b+1]-v[x+1]}}else if(n||i||s){var v=e.allpts,E=e.ctrlpts,_,T,C,D;if(E.length/2%2==0){var L=v.length/2-1,A=L+2,O=A+2;_=mt(v[L],v[A],v[O],0),T=mt(v[L+1],v[A+1],v[O+1],0),C=mt(v[L],v[A],v[O],1e-4),D=mt(v[L+1],v[A+1],v[O+1],1e-4)}else{var A=v.length/2-1,L=A-2,O=A+2;_=mt(v[L],v[A],v[O],.4999),T=mt(v[L+1],v[A+1],v[O+1],.4999),C=mt(v[L],v[A],v[O],.5),D=mt(v[L+1],v[A+1],v[O+1],.5)}l=C-_,u=D-T}if(e.midtgtArrowAngle=ro(l,u),e.midDispX=l,e.midDispY=u,l*=-1,u*=-1,o){var v=e.allpts;if(v.length/2%2!=0){var b=v.length/2-1,k=b+2;l=-(v[k]-v[b]),u=-(v[k+1]-v[b+1])}}if(e.midsrcArrowAngle=ro(l,u),o)l=h-e.segpts[e.segpts.length-2],u=p-e.segpts[e.segpts.length-1];else if(n||i||s||a){var v=e.allpts,I=v.length,m=mt(v[I-6],v[I-4],v[I-2],.9),y=mt(v[I-5],v[I-3],v[I-1],.9);l=h-m,u=p-y}else l=h-g,u=p-f;e.tgtArrowAngle=ro(l,u)};Ao.getArrowWidth=Ao.getArrowHeight=function(t,e){var r=this.arrowWidthCache=this.arrowWidthCache||{},a=r[t+", "+e];return a||(a=Math.max(Math.pow(t*13.37,.9),29)*e,r[t+", "+e]=a,a)};var Rt={};Rt.findHaystackPoints=function(t){for(var e=0;e<t.length;e++){var r=t[e],a=r._private,n=a.rscratch;if(!n.haystack){var o=Math.random()*2*Math.PI;n.source={x:Math.cos(o),y:Math.sin(o)},o=Math.random()*2*Math.PI,n.target={x:Math.cos(o),y:Math.sin(o)}}var i=a.source,s=a.target,l=i.position(),u=s.position(),c=i.width(),d=s.width(),h=i.height(),p=s.height(),g=r.pstyle("haystack-radius").value,f=g/2;n.haystackPts=n.allpts=[n.source.x*c*f+l.x,n.source.y*h*f+l.y,n.target.x*d*f+u.x,n.target.y*p*f+u.y],n.midX=(n.allpts[0]+n.allpts[2])/2,n.midY=(n.allpts[1]+n.allpts[3])/2,n.edgeType="haystack",n.haystack=!0,this.storeEdgeProjections(r),this.calculateArrowAngles(r),this.recalculateEdgeLabelProjections(r),this.calculateLabelAngles(r)}};Rt.findSegmentsPoints=function(t,e){var r=t._private.rscratch,a=e.posPts,n=e.intersectionPts,o=e.vectorNormInverse,i=t.pstyle("edge-distances").value,s=t.pstyle("segment-weights"),l=t.pstyle("segment-distances"),u=Math.min(s.pfValue.length,l.pfValue.length);r.edgeType="segments",r.segpts=[];for(var c=0;c<u;c++){var d=s.pfValue[c],h=l.pfValue[c],p=1-d,g=d,f=i==="node-position"?a:n,v={x:f.x1*p+f.x2*g,y:f.y1*p+f.y2*g};r.segpts.push(v.x+o.x*h,v.y+o.y*h)}};Rt.findLoopPoints=function(t,e,r,a){var n=t._private.rscratch,o=e.dirCounts,i=e.srcPos,s=t.pstyle("control-point-distances"),l=s?s.pfValue[0]:void 0,u=t.pstyle("loop-direction").pfValue,c=t.pstyle("loop-sweep").pfValue,d=t.pstyle("control-point-step-size").pfValue;n.edgeType="self";var h=r,p=d;a&&(h=0,p=l);var g=u-Math.PI/2,f=g-c/2,v=g+c/2,m=String(u+"_"+c);h=o[m]===void 0?o[m]=0:++o[m],n.ctrlpts=[i.x+Math.cos(f)*1.4*p*(h/3+1),i.y+Math.sin(f)*1.4*p*(h/3+1),i.x+Math.cos(v)*1.4*p*(h/3+1),i.y+Math.sin(v)*1.4*p*(h/3+1)]};Rt.findCompoundLoopPoints=function(t,e,r,a){var n=t._private.rscratch;n.edgeType="compound";var o=e.srcPos,i=e.tgtPos,s=e.srcW,l=e.srcH,u=e.tgtW,c=e.tgtH,d=t.pstyle("control-point-step-size").pfValue,h=t.pstyle("control-point-distances"),p=h?h.pfValue[0]:void 0,g=r,f=d;a&&(g=0,f=p);var v=50,m={x:o.x-s/2,y:o.y-l/2},y={x:i.x-u/2,y:i.y-c/2},b={x:Math.min(m.x,y.x),y:Math.min(m.y,y.y)},x=.5,k=Math.max(x,Math.log(s*.01)),E=Math.max(x,Math.log(u*.01));n.ctrlpts=[b.x,b.y-(1+Math.pow(v,1.12)/100)*f*(g/3+1)*k,b.x-(1+Math.pow(v,1.12)/100)*f*(g/3+1)*E,b.y]};Rt.findStraightEdgePoints=function(t){t._private.rscratch.edgeType="straight"};Rt.findBezierPoints=function(t,e,r,a,n){var o=t._private.rscratch,i=e.vectorNormInverse,s=e.posPts,l=e.intersectionPts,u=t.pstyle("edge-distances").value,c=t.pstyle("control-point-step-size").pfValue,d=t.pstyle("control-point-distances"),h=t.pstyle("control-point-weights"),p=d&&h?Math.min(d.value.length,h.value.length):1,g=d?d.pfValue[0]:void 0,f=h.value[0],v=a;o.edgeType=v?"multibezier":"bezier",o.ctrlpts=[];for(var m=0;m<p;m++){var y=(.5-e.eles.length/2+r)*c*(n?-1:1),b=void 0,x=Xc(y);v&&(g=d?d.pfValue[m]:c,f=h.value[m]),a?b=g:b=g!==void 0?x*g:void 0;var k=b!==void 0?b:y,E=1-f,_=f,T=u==="node-position"?s:l,C={x:T.x1*E+T.x2*_,y:T.y1*E+T.y2*_};o.ctrlpts.push(C.x+i.x*k,C.y+i.y*k)}};Rt.findTaxiPoints=function(t,e){var r=t._private.rscratch;r.edgeType="segments";var a="vertical",n="horizontal",o="leftward",i="rightward",s="downward",l="upward",u="auto",c=e.posPts,d=e.srcW,h=e.srcH,p=e.tgtW,g=e.tgtH,f=t.pstyle("edge-distances").value,v=f!=="node-position",m=t.pstyle("taxi-direction").value,y=m,b=t.pstyle("taxi-turn"),x=b.units==="%",k=b.pfValue,E=k<0,_=t.pstyle("taxi-turn-min-distance").pfValue,T=v?(d+p)/2:0,C=v?(h+g)/2:0,D=c.x2-c.x1,L=c.y2-c.y1,A=function(_e,Ye){return _e>0?Math.max(_e-Ye,0):Math.min(_e+Ye,0)},O=A(D,T),I=A(L,C),N=!1;y===u?m=Math.abs(O)>Math.abs(I)?n:a:y===l||y===s?(m=a,N=!0):(y===o||y===i)&&(m=n,N=!0);var z=m===a,$=z?I:O,B=z?L:D,R=Xc(B),H=!1;!(N&&(x||E))&&(y===s&&B<0||y===l&&B>0||y===o&&B>0||y===i&&B<0)&&(R*=-1,$=R*Math.abs($),H=!0);var M;if(x){var j=k<0?1+k:k;M=j*$}else{var W=k<0?$:0;M=W+k*R}var te=function(_e){return Math.abs(_e)<_||Math.abs(_e)>=Math.abs($)},X=te(M),Y=te(Math.abs($)-Math.abs(M)),F=X||Y;if(F&&!H)if(z){var Z=Math.abs(B)<=h/2,se=Math.abs(D)<=p/2;if(Z){var ie=(c.x1+c.x2)/2,pe=c.y1,De=c.y2;r.segpts=[ie,pe,ie,De]}else if(se){var Te=(c.y1+c.y2)/2,fe=c.x1,de=c.x2;r.segpts=[fe,Te,de,Te]}else r.segpts=[c.x1,c.y2]}else{var ye=Math.abs(B)<=d/2,U=Math.abs(L)<=g/2;if(ye){var P=(c.y1+c.y2)/2,V=c.x1,G=c.x2;r.segpts=[V,P,G,P]}else if(U){var K=(c.x1+c.x2)/2,Q=c.y1,be=c.y2;r.segpts=[K,Q,K,be]}else r.segpts=[c.x2,c.y1]}else if(z){var J=c.y1+M+(v?h/2*R:0),me=c.x1,Pe=c.x2;r.segpts=[me,J,Pe,J]}else{var Le=c.x1+M+(v?d/2*R:0),Ee=c.y1,Ie=c.y2;r.segpts=[Le,Ee,Le,Ie]}};Rt.tryToCorrectInvalidPoints=function(t,e){var r=t._private.rscratch;if(r.edgeType==="bezier"){var a=e.srcPos,n=e.tgtPos,o=e.srcW,i=e.srcH,s=e.tgtW,l=e.tgtH,u=e.srcShape,c=e.tgtShape,d=!ce(r.startX)||!ce(r.startY),h=!ce(r.arrowStartX)||!ce(r.arrowStartY),p=!ce(r.endX)||!ce(r.endY),g=!ce(r.arrowEndX)||!ce(r.arrowEndY),f=3,v=this.getArrowWidth(t.pstyle("width").pfValue,t.pstyle("arrow-scale").value)*this.arrowShapeWidth,m=f*v,y=xa({x:r.ctrlpts[0],y:r.ctrlpts[1]},{x:r.startX,y:r.startY}),b=y<m,x=xa({x:r.ctrlpts[0],y:r.ctrlpts[1]},{x:r.endX,y:r.endY}),k=x<m,E=!1;if(d||h||b){E=!0;var _={x:r.ctrlpts[0]-a.x,y:r.ctrlpts[1]-a.y},T=Math.sqrt(_.x*_.x+_.y*_.y),C={x:_.x/T,y:_.y/T},D=Math.max(o,i),L={x:r.ctrlpts[0]+C.x*2*D,y:r.ctrlpts[1]+C.y*2*D},A=u.intersectLine(a.x,a.y,o,i,L.x,L.y,0);b?(r.ctrlpts[0]=r.ctrlpts[0]+C.x*(m-y),r.ctrlpts[1]=r.ctrlpts[1]+C.y*(m-y)):(r.ctrlpts[0]=A[0]+C.x*m,r.ctrlpts[1]=A[1]+C.y*m)}if(p||g||k){E=!0;var O={x:r.ctrlpts[0]-n.x,y:r.ctrlpts[1]-n.y},I=Math.sqrt(O.x*O.x+O.y*O.y),N={x:O.x/I,y:O.y/I},z=Math.max(o,i),$={x:r.ctrlpts[0]+N.x*2*z,y:r.ctrlpts[1]+N.y*2*z},B=c.intersectLine(n.x,n.y,s,l,$.x,$.y,0);k?(r.ctrlpts[0]=r.ctrlpts[0]+N.x*(m-x),r.ctrlpts[1]=r.ctrlpts[1]+N.y*(m-x)):(r.ctrlpts[0]=B[0]+N.x*m,r.ctrlpts[1]=B[1]+N.y*m)}E&&this.findEndpoints(t)}};Rt.storeAllpts=function(t){var e=t._private.rscratch;if(e.edgeType==="multibezier"||e.edgeType==="bezier"||e.edgeType==="self"||e.edgeType==="compound"){e.allpts=[],e.allpts.push(e.startX,e.startY);for(var r=0;r+1<e.ctrlpts.length;r+=2)e.allpts.push(e.ctrlpts[r],e.ctrlpts[r+1]),r+3<e.ctrlpts.length&&e.allpts.push((e.ctrlpts[r]+e.ctrlpts[r+2])/2,(e.ctrlpts[r+1]+e.ctrlpts[r+3])/2);e.allpts.push(e.endX,e.endY);var a,n;e.ctrlpts.length/2%2==0?(a=e.allpts.length/2-1,e.midX=e.allpts[a],e.midY=e.allpts[a+1]):(a=e.allpts.length/2-3,n=.5,e.midX=mt(e.allpts[a],e.allpts[a+2],e.allpts[a+4],n),e.midY=mt(e.allpts[a+1],e.allpts[a+3],e.allpts[a+5],n))}else if(e.edgeType==="straight")e.allpts=[e.startX,e.startY,e.endX,e.endY],e.midX=(e.startX+e.endX+e.arrowStartX+e.arrowEndX)/4,e.midY=(e.startY+e.endY+e.arrowStartY+e.arrowEndY)/4;else if(e.edgeType==="segments")if(e.allpts=[],e.allpts.push(e.startX,e.startY),e.allpts.push.apply(e.allpts,e.segpts),e.allpts.push(e.endX,e.endY),e.segpts.length%4==0){var o=e.segpts.length/2,i=o-2;e.midX=(e.segpts[i]+e.segpts[o])/2,e.midY=(e.segpts[i+1]+e.segpts[o+1])/2}else{var s=e.segpts.length/2-1;e.midX=e.segpts[s],e.midY=e.segpts[s+1]}};Rt.checkForInvalidEdgeWarning=function(t){var e=t[0]._private.rscratch;e.nodesOverlap||ce(e.startX)&&ce(e.startY)&&ce(e.endX)&&ce(e.endY)?e.loggedErr=!1:e.loggedErr||(e.loggedErr=!0,Ke("Edge `"+t.id()+"` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."))};Rt.findEdgeControlPoints=function(t){var e=this;if(!(!t||t.length===0)){for(var r=this,a=r.cy,n=a.hasCompoundNodes(),o={map:new kr,get:function(_){var T=this.map.get(_[0]);return T!=null?T.get(_[1]):null},set:function(_,T){var C=this.map.get(_[0]);C==null&&(C=new kr,this.map.set(_[0],C)),C.set(_[1],T)}},i=[],s=[],l=0;l<t.length;l++){var u=t[l],c=u._private,d=u.pstyle("curve-style").value;if(!(u.removed()||!u.takesUpSpace())){if(d==="haystack"){s.push(u);continue}var h=d==="unbundled-bezier"||d==="segments"||d==="straight"||d==="taxi",p=d==="unbundled-bezier"||d==="bezier",g=c.source,f=c.target,v=g.poolIndex(),m=f.poolIndex(),y=[v,m].sort(),b=o.get(y);b==null&&(b={eles:[]},o.set(y,b),i.push(y)),b.eles.push(u),h&&(b.hasUnbundled=!0),p&&(b.hasBezier=!0)}}for(var x=function(_){var T=i[_],C=o.get(T),D=void 0;if(!C.hasUnbundled){var L=C.eles[0].parallelEdges().filter(function(be){return be.isBundledBezier()});Ps(C.eles),L.forEach(function(be){return C.eles.push(be)}),C.eles.sort(function(be,J){return be.poolIndex()-J.poolIndex()})}var A=C.eles[0],O=A.source(),I=A.target();if(O.poolIndex()>I.poolIndex()){var N=O;O=I,I=N}var z=C.srcPos=O.position(),$=C.tgtPos=I.position(),B=C.srcW=O.outerWidth(),R=C.srcH=O.outerHeight(),H=C.tgtW=I.outerWidth(),M=C.tgtH=I.outerHeight(),j=C.srcShape=r.nodeShapes[e.getNodeShape(O)],W=C.tgtShape=r.nodeShapes[e.getNodeShape(I)];C.dirCounts={north:0,west:0,south:0,east:0,northwest:0,southwest:0,northeast:0,southeast:0};for(var te=0;te<C.eles.length;te++){var X=C.eles[te],Y=X[0]._private.rscratch,F=X.pstyle("curve-style").value,Z=F==="unbundled-bezier"||F==="segments"||F==="taxi",se=!O.same(X.source());if(!C.calculatedIntersection&&O!==I&&(C.hasBezier||C.hasUnbundled)){C.calculatedIntersection=!0;var ie=j.intersectLine(z.x,z.y,B,R,$.x,$.y,0),pe=C.srcIntn=ie,De=W.intersectLine($.x,$.y,H,M,z.x,z.y,0),Te=C.tgtIntn=De,fe=C.intersectionPts={x1:ie[0],x2:De[0],y1:ie[1],y2:De[1]},de=C.posPts={x1:z.x,x2:$.x,y1:z.y,y2:$.y},ye=De[1]-ie[1],U=De[0]-ie[0],P=Math.sqrt(U*U+ye*ye),V=C.vector={x:U,y:ye},G=C.vectorNorm={x:V.x/P,y:V.y/P},K={x:-G.y,y:G.x};C.nodesOverlap=!ce(P)||W.checkPoint(ie[0],ie[1],0,H,M,$.x,$.y)||j.checkPoint(De[0],De[1],0,B,R,z.x,z.y),C.vectorNormInverse=K,D={nodesOverlap:C.nodesOverlap,dirCounts:C.dirCounts,calculatedIntersection:!0,hasBezier:C.hasBezier,hasUnbundled:C.hasUnbundled,eles:C.eles,srcPos:$,tgtPos:z,srcW:H,srcH:M,tgtW:B,tgtH:R,srcIntn:Te,tgtIntn:pe,srcShape:W,tgtShape:j,posPts:{x1:de.x2,y1:de.y2,x2:de.x1,y2:de.y1},intersectionPts:{x1:fe.x2,y1:fe.y2,x2:fe.x1,y2:fe.y1},vector:{x:-V.x,y:-V.y},vectorNorm:{x:-G.x,y:-G.y},vectorNormInverse:{x:-K.x,y:-K.y}}}var Q=se?D:C;Y.nodesOverlap=Q.nodesOverlap,Y.srcIntn=Q.srcIntn,Y.tgtIntn=Q.tgtIntn,n&&(O.isParent()||O.isChild()||I.isParent()||I.isChild())&&(O.parents().anySame(I)||I.parents().anySame(O)||O.same(I)&&O.isParent())?e.findCompoundLoopPoints(X,Q,te,Z):O===I?e.findLoopPoints(X,Q,te,Z):F==="segments"?e.findSegmentsPoints(X,Q):F==="taxi"?e.findTaxiPoints(X,Q):F==="straight"||!Z&&C.eles.length%2==1&&te===Math.floor(C.eles.length/2)?e.findStraightEdgePoints(X):e.findBezierPoints(X,Q,te,Z,se),e.findEndpoints(X),e.tryToCorrectInvalidPoints(X,Q),e.checkForInvalidEdgeWarning(X),e.storeAllpts(X),e.storeEdgeProjections(X),e.calculateArrowAngles(X),e.recalculateEdgeLabelProjections(X),e.calculateLabelAngles(X)}},k=0;k<i.length;k++)x(k);this.findHaystackPoints(s)}};function bh(t){var e=[];if(t!=null){for(var r=0;r<t.length;r+=2){var a=t[r],n=t[r+1];e.push({x:a,y:n})}return e}}Rt.getSegmentPoints=function(t){var e=t[0]._private.rscratch,r=e.edgeType;if(r==="segments")return this.recalculateRenderedStyle(t),bh(e.segpts)};Rt.getControlPoints=function(t){var e=t[0]._private.rscratch,r=e.edgeType;if(r==="bezier"||r==="multibezier"||r==="self"||r==="compound")return this.recalculateRenderedStyle(t),bh(e.ctrlpts)};Rt.getEdgeMidpoint=function(t){var e=t[0]._private.rscratch;return this.recalculateRenderedStyle(t),{x:e.midX,y:e.midY}};var oi={};oi.manualEndptToPx=function(t,e){var r=this,a=t.position(),n=t.outerWidth(),o=t.outerHeight();if(e.value.length===2){var i=[e.pfValue[0],e.pfValue[1]];return e.units[0]==="%"&&(i[0]=i[0]*n),e.units[1]==="%"&&(i[1]=i[1]*o),i[0]+=a.x,i[1]+=a.y,i}else{var s=e.pfValue[0];s=-Math.PI/2+s;var l=2*Math.max(n,o),u=[a.x+Math.cos(s)*l,a.y+Math.sin(s)*l];return r.nodeShapes[this.getNodeShape(t)].intersectLine(a.x,a.y,n,o,u[0],u[1],0)}};oi.findEndpoints=function(t){var e=this,r,a=t.source()[0],n=t.target()[0],o=a.position(),i=n.position(),s=t.pstyle("target-arrow-shape").value,l=t.pstyle("source-arrow-shape").value,u=t.pstyle("target-distance-from-node").pfValue,c=t.pstyle("source-distance-from-node").pfValue,d=t.pstyle("curve-style").value,h=t._private.rscratch,p=h.edgeType,g=d==="taxi",f=p==="self"||p==="compound",v=p==="bezier"||p==="multibezier"||f,m=p!=="bezier",y=p==="straight"||p==="segments",b=p==="segments",x=v||m||y,k=f||g,E=t.pstyle("source-endpoint"),_=k?"outside-to-node":E.value,T=t.pstyle("target-endpoint"),C=k?"outside-to-node":T.value;h.srcManEndpt=E,h.tgtManEndpt=T;var D,L,A,O;if(v){var I=[h.ctrlpts[0],h.ctrlpts[1]],N=m?[h.ctrlpts[h.ctrlpts.length-2],h.ctrlpts[h.ctrlpts.length-1]]:I;D=N,L=I}else if(y){var z=b?h.segpts.slice(0,2):[i.x,i.y],$=b?h.segpts.slice(h.segpts.length-2):[o.x,o.y];D=$,L=z}if(C==="inside-to-node")r=[i.x,i.y];else if(T.units)r=this.manualEndptToPx(n,T);else if(C==="outside-to-line")r=h.tgtIntn;else if(C==="outside-to-node"||C==="outside-to-node-or-label"?A=D:(C==="outside-to-line"||C==="outside-to-line-or-label")&&(A=[o.x,o.y]),r=e.nodeShapes[this.getNodeShape(n)].intersectLine(i.x,i.y,n.outerWidth(),n.outerHeight(),A[0],A[1],0),C==="outside-to-node-or-label"||C==="outside-to-line-or-label"){var B=n._private.rscratch,R=B.labelWidth,H=B.labelHeight,M=B.labelX,j=B.labelY,W=R/2,te=H/2,X=n.pstyle("text-valign").value;X==="top"?j-=te:X==="bottom"&&(j+=te);var Y=n.pstyle("text-halign").value;Y==="left"?M-=W:Y==="right"&&(M+=W);var F=Yn(A[0],A[1],[M-W,j-te,M+W,j-te,M+W,j+te,M-W,j+te],i.x,i.y);if(F.length>0){var Z=o,se=ka(Z,tn(r)),ie=ka(Z,tn(F)),pe=se;if(ie<se&&(r=F,pe=ie),F.length>2){var De=ka(Z,{x:F[2],y:F[3]});De<pe&&(r=[F[2],F[3]])}}}var Te=no(r,D,e.arrowShapes[s].spacing(t)+u),fe=no(r,D,e.arrowShapes[s].gap(t)+u);if(h.endX=fe[0],h.endY=fe[1],h.arrowEndX=Te[0],h.arrowEndY=Te[1],_==="inside-to-node")r=[o.x,o.y];else if(E.units)r=this.manualEndptToPx(a,E);else if(_==="outside-to-line")r=h.srcIntn;else if(_==="outside-to-node"||_==="outside-to-node-or-label"?O=L:(_==="outside-to-line"||_==="outside-to-line-or-label")&&(O=[i.x,i.y]),r=e.nodeShapes[this.getNodeShape(a)].intersectLine(o.x,o.y,a.outerWidth(),a.outerHeight(),O[0],O[1],0),_==="outside-to-node-or-label"||_==="outside-to-line-or-label"){var de=a._private.rscratch,ye=de.labelWidth,U=de.labelHeight,P=de.labelX,V=de.labelY,G=ye/2,K=U/2,Q=a.pstyle("text-valign").value;Q==="top"?V-=K:Q==="bottom"&&(V+=K);var be=a.pstyle("text-halign").value;be==="left"?P-=G:be==="right"&&(P+=G);var J=Yn(O[0],O[1],[P-G,V-K,P+G,V-K,P+G,V+K,P-G,V+K],o.x,o.y);if(J.length>0){var me=i,Pe=ka(me,tn(r)),Le=ka(me,tn(J)),Ee=Pe;if(Le<Pe&&(r=[J[0],J[1]],Ee=Le),J.length>2){var Ie=ka(me,{x:J[2],y:J[3]});Ie<Ee&&(r=[J[2],J[3]])}}}var Ce=no(r,L,e.arrowShapes[l].spacing(t)+c),_e=no(r,L,e.arrowShapes[l].gap(t)+c);h.startX=_e[0],h.startY=_e[1],h.arrowStartX=Ce[0],h.arrowStartY=Ce[1],x&&(!ce(h.startX)||!ce(h.startY)||!ce(h.endX)||!ce(h.endY)?h.badLine=!0:h.badLine=!1)};oi.getSourceEndpoint=function(t){var e=t[0]._private.rscratch;switch(this.recalculateRenderedStyle(t),e.edgeType){case"haystack":return{x:e.haystackPts[0],y:e.haystackPts[1]};default:return{x:e.arrowStartX,y:e.arrowStartY}}};oi.getTargetEndpoint=function(t){var e=t[0]._private.rscratch;switch(this.recalculateRenderedStyle(t),e.edgeType){case"haystack":return{x:e.haystackPts[2],y:e.haystackPts[3]};default:return{x:e.arrowEndX,y:e.arrowEndY}}};var al={};function Bb(t,e,r){for(var a=function(u,c,d,h){return mt(u,c,d,h)},n=e._private,o=n.rstyle.bezierPts,i=0;i<t.bezierProjPcts.length;i++){var s=t.bezierProjPcts[i];o.push({x:a(r[0],r[2],r[4],s),y:a(r[1],r[3],r[5],s)})}}al.storeEdgeProjections=function(t){var e=t._private,r=e.rscratch,a=r.edgeType;if(e.rstyle.bezierPts=null,e.rstyle.linePts=null,e.rstyle.haystackPts=null,a==="multibezier"||a==="bezier"||a==="self"||a==="compound"){e.rstyle.bezierPts=[];for(var n=0;n+5<r.allpts.length;n+=4)Bb(this,t,r.allpts.slice(n,n+6))}else if(a==="segments")for(var o=e.rstyle.linePts=[],n=0;n+1<r.allpts.length;n+=2)o.push({x:r.allpts[n],y:r.allpts[n+1]});else if(a==="haystack"){var i=r.haystackPts;e.rstyle.haystackPts=[{x:i[0],y:i[1]},{x:i[2],y:i[3]}]}e.rstyle.arrowWidth=this.getArrowWidth(t.pstyle("width").pfValue,t.pstyle("arrow-scale").value)*this.arrowShapeWidth};al.recalculateEdgeProjections=function(t){this.findEdgeControlPoints(t)};var Cr={};Cr.recalculateNodeLabelProjection=function(t){var e=t.pstyle("label").strValue;if(!Zr(e)){var r,a,n=t._private,o=t.width(),i=t.height(),s=t.padding(),l=t.position(),u=t.pstyle("text-halign").strValue,c=t.pstyle("text-valign").strValue,d=n.rscratch,h=n.rstyle;switch(u){case"left":r=l.x-o/2-s;break;case"right":r=l.x+o/2+s;break;default:r=l.x}switch(c){case"top":a=l.y-i/2-s;break;case"bottom":a=l.y+i/2+s;break;default:a=l.y}d.labelX=r,d.labelY=a,h.labelX=r,h.labelY=a,this.calculateLabelAngles(t),this.applyLabelDimensions(t)}};var wh=function(e,r){var a=Math.atan(r/e);return e===0&&a<0&&(a=a*-1),a},xh=function(e,r){var a=r.x-e.x,n=r.y-e.y;return wh(a,n)},zb=function(e,r,a,n){var o=Hn(0,n-.001,1),i=Hn(0,n+.001,1),s=rn(e,r,a,o),l=rn(e,r,a,i);return xh(s,l)};Cr.recalculateEdgeLabelProjections=function(t){var e,r=t._private,a=r.rscratch,n=this,o={mid:t.pstyle("label").strValue,source:t.pstyle("source-label").strValue,target:t.pstyle("target-label").strValue};if(!!(o.mid||o.source||o.target)){e={x:a.midX,y:a.midY};var i=function(d,h,p){ea(r.rscratch,d,h,p),ea(r.rstyle,d,h,p)};i("labelX",null,e.x),i("labelY",null,e.y);var s=wh(a.midDispX,a.midDispY);i("labelAutoAngle",null,s);var l=function c(){if(c.cache)return c.cache;for(var d=[],h=0;h+5<a.allpts.length;h+=4){var p={x:a.allpts[h],y:a.allpts[h+1]},g={x:a.allpts[h+2],y:a.allpts[h+3]},f={x:a.allpts[h+4],y:a.allpts[h+5]};d.push({p0:p,p1:g,p2:f,startDist:0,length:0,segments:[]})}var v=r.rstyle.bezierPts,m=n.bezierProjPcts.length;function y(_,T,C,D,L){var A=xa(T,C),O=_.segments[_.segments.length-1],I={p0:T,p1:C,t0:D,t1:L,startDist:O?O.startDist+O.length:0,length:A};_.segments.push(I),_.length+=A}for(var b=0;b<d.length;b++){var x=d[b],k=d[b-1];k&&(x.startDist=k.startDist+k.length),y(x,x.p0,v[b*m],0,n.bezierProjPcts[0]);for(var E=0;E<m-1;E++)y(x,v[b*m+E],v[b*m+E+1],n.bezierProjPcts[E],n.bezierProjPcts[E+1]);y(x,v[b*m+m-1],x.p2,n.bezierProjPcts[m-1],1)}return c.cache=d},u=function(d){var h,p=d==="source";if(!!o[d]){var g=t.pstyle(d+"-text-offset").pfValue;switch(a.edgeType){case"self":case"compound":case"bezier":case"multibezier":{for(var f=l(),v,m=0,y=0,b=0;b<f.length;b++){for(var x=f[p?b:f.length-1-b],k=0;k<x.segments.length;k++){var E=x.segments[p?k:x.segments.length-1-k],_=b===f.length-1&&k===x.segments.length-1;if(m=y,y+=E.length,y>=g||_){v={cp:x,segment:E};break}}if(v)break}var T=v.cp,C=v.segment,D=(g-m)/C.length,L=C.t1-C.t0,A=p?C.t0+L*D:C.t1-L*D;A=Hn(0,A,1),e=rn(T.p0,T.p1,T.p2,A),h=zb(T.p0,T.p1,T.p2,A);break}case"straight":case"segments":case"haystack":{for(var O=0,I,N,z,$,B=a.allpts.length,R=0;R+3<B&&(p?(z={x:a.allpts[R],y:a.allpts[R+1]},$={x:a.allpts[R+2],y:a.allpts[R+3]}):(z={x:a.allpts[B-2-R],y:a.allpts[B-1-R]},$={x:a.allpts[B-4-R],y:a.allpts[B-3-R]}),I=xa(z,$),N=O,O+=I,!(O>=g));R+=2);var H=g-N,M=H/I;M=Hn(0,M,1),e=Jm(z,$,M),h=xh(z,$);break}}i("labelX",d,e.x),i("labelY",d,e.y),i("labelAutoAngle",d,h)}};u("source"),u("target"),this.applyLabelDimensions(t)}};Cr.applyLabelDimensions=function(t){this.applyPrefixedLabelDimensions(t),t.isEdge()&&(this.applyPrefixedLabelDimensions(t,"source"),this.applyPrefixedLabelDimensions(t,"target"))};Cr.applyPrefixedLabelDimensions=function(t,e){var r=t._private,a=this.getLabelText(t,e),n=this.calculateLabelDimensions(t,a),o=t.pstyle("line-height").pfValue,i=t.pstyle("text-wrap").strValue,s=pr(r.rscratch,"labelWrapCachedLines",e)||[],l=i!=="wrap"?1:Math.max(s.length,1),u=n.height/l,c=u*o,d=n.width,h=n.height+(l-1)*(o-1)*u;ea(r.rstyle,"labelWidth",e,d),ea(r.rscratch,"labelWidth",e,d),ea(r.rstyle,"labelHeight",e,h),ea(r.rscratch,"labelHeight",e,h),ea(r.rscratch,"labelLineHeight",e,c)};Cr.getLabelText=function(t,e){var r=t._private,a=e?e+"-":"",n=t.pstyle(a+"label").strValue,o=t.pstyle("text-transform").value,i=function(H,M){return M?(ea(r.rscratch,H,e,M),M):pr(r.rscratch,H,e)};if(!n)return"";o=="none"||(o=="uppercase"?n=n.toUpperCase():o=="lowercase"&&(n=n.toLowerCase()));var s=t.pstyle("text-wrap").value;if(s==="wrap"){var l=i("labelKey");if(l!=null&&i("labelWrapKey")===l)return i("labelWrapCachedText");for(var u="\u200B",c=n.split(`
`),d=t.pstyle("text-max-width").pfValue,h=t.pstyle("text-overflow-wrap").value,p=h==="anywhere",g=[],f=/[\s\u200b]+/,v=p?"":" ",m=0;m<c.length;m++){var y=c[m],b=this.calculateLabelDimensions(t,y),x=b.width;if(p){var k=y.split("").join(u);y=k}if(x>d){for(var E=y.split(f),_="",T=0;T<E.length;T++){var C=E[T],D=_.length===0?C:_+v+C,L=this.calculateLabelDimensions(t,D),A=L.width;A<=d?_+=C+v:(_&&g.push(_),_=C+v)}_.match(/^[\s\u200b]+$/)||g.push(_)}else g.push(y)}i("labelWrapCachedLines",g),n=i("labelWrapCachedText",g.join(`
`)),i("labelWrapKey",l)}else if(s==="ellipsis"){var O=t.pstyle("text-max-width").pfValue,I="",N="\u2026",z=!1;if(this.calculateLabelDimensions(t,n).width<O)return n;for(var $=0;$<n.length;$++){var B=this.calculateLabelDimensions(t,I+n[$]+N).width;if(B>O)break;I+=n[$],$===n.length-1&&(z=!0)}return z||(I+=N),I}return n};Cr.getLabelJustification=function(t){var e=t.pstyle("text-justification").strValue,r=t.pstyle("text-halign").strValue;if(e==="auto")if(t.isNode())switch(r){case"left":return"right";case"right":return"left";default:return"center"}else return"center";else return e};Cr.calculateLabelDimensions=function(t,e){var r=this,a=wa(e,t._private.labelDimsKey),n=r.labelDimCache||(r.labelDimCache=[]),o=n[a];if(o!=null)return o;var i=0,s=t.pstyle("font-style").strValue,l=t.pstyle("font-size").pfValue,u=t.pstyle("font-family").strValue,c=t.pstyle("font-weight").strValue,d=this.labelCalcCanvas,h=this.labelCalcCanvasContext;if(!d){d=this.labelCalcCanvas=document.createElement("canvas"),h=this.labelCalcCanvasContext=d.getContext("2d");var p=d.style;p.position="absolute",p.left="-9999px",p.top="-9999px",p.zIndex="-1",p.visibility="hidden",p.pointerEvents="none"}h.font="".concat(s," ").concat(c," ").concat(l,"px ").concat(u);for(var g=0,f=0,v=e.split(`
`),m=0;m<v.length;m++){var y=v[m],b=h.measureText(y),x=Math.ceil(b.width),k=l;g=Math.max(x,g),f+=k}return g+=i,f+=i,n[a]={width:g,height:f}};Cr.calculateLabelAngle=function(t,e){var r=t._private,a=r.rscratch,n=t.isEdge(),o=e?e+"-":"",i=t.pstyle(o+"text-rotation"),s=i.strValue;return s==="none"?0:n&&s==="autorotate"?a.labelAutoAngle:s==="autorotate"?0:i.pfValue};Cr.calculateLabelAngles=function(t){var e=this,r=t.isEdge(),a=t._private,n=a.rscratch;n.labelAngle=e.calculateLabelAngle(t),r&&(n.sourceLabelAngle=e.calculateLabelAngle(t,"source"),n.targetLabelAngle=e.calculateLabelAngle(t,"target"))};var kh={},_h=28,Ch=!1;kh.getNodeShape=function(t){var e=this,r=t.pstyle("shape").value;if(r==="cutrectangle"&&(t.width()<_h||t.height()<_h))return Ch||(Ke("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"),Ch=!0),"rectangle";if(t.isParent())return r==="rectangle"||r==="roundrectangle"||r==="round-rectangle"||r==="cutrectangle"||r==="cut-rectangle"||r==="barrel"?r:"rectangle";if(r==="polygon"){var a=t.pstyle("shape-polygon-points").value;return e.nodeShapes.makePolygon(a).name}return r};var Lo={};Lo.registerCalculationListeners=function(){var t=this.cy,e=t.collection(),r=this,a=function(i){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(e.merge(i),s)for(var l=0;l<i.length;l++){var u=i[l],c=u._private,d=c.rstyle;d.clean=!1,d.cleanConnected=!1}};r.binder(t).on("bounds.* dirty.*",function(i){var s=i.target;a(s)}).on("style.* background.*",function(i){var s=i.target;a(s,!1)});var n=function(i){if(i){var s=r.onUpdateEleCalcsFns;e.cleanStyle();for(var l=0;l<e.length;l++){var u=e[l],c=u._private.rstyle;u.isNode()&&!c.cleanConnected&&(a(u.connectedEdges()),c.cleanConnected=!0)}if(s)for(var d=0;d<s.length;d++){var h=s[d];h(i,e)}r.recalculateRenderedStyle(e),e=t.collection()}};r.flushRenderedStyleQueue=function(){n(!0)},r.beforeRender(n,r.beforeRenderPriorities.eleCalcs)};Lo.onUpdateEleCalcs=function(t){var e=this.onUpdateEleCalcsFns=this.onUpdateEleCalcsFns||[];e.push(t)};Lo.recalculateRenderedStyle=function(t,e){var r=function(x){return x._private.rstyle.cleanConnected},a=[],n=[];if(!this.destroyed){e===void 0&&(e=!0);for(var o=0;o<t.length;o++){var i=t[o],s=i._private,l=s.rstyle;i.isEdge()&&(!r(i.source())||!r(i.target()))&&(l.clean=!1),!(e&&l.clean||i.removed())&&i.pstyle("display").value!=="none"&&(s.group==="nodes"?n.push(i):a.push(i),l.clean=!0)}for(var u=0;u<n.length;u++){var c=n[u],d=c._private,h=d.rstyle,p=c.position();this.recalculateNodeLabelProjection(c),h.nodeX=p.x,h.nodeY=p.y,h.nodeW=c.pstyle("width").pfValue,h.nodeH=c.pstyle("height").pfValue}this.recalculateEdgeProjections(a);for(var g=0;g<a.length;g++){var f=a[g],v=f._private,m=v.rstyle,y=v.rscratch;m.srcX=y.arrowStartX,m.srcY=y.arrowStartY,m.tgtX=y.arrowEndX,m.tgtY=y.arrowEndY,m.midX=y.midX,m.midY=y.midY,m.labelAngle=y.labelAngle,m.sourceLabelAngle=y.sourceLabelAngle,m.targetLabelAngle=y.targetLabelAngle}}};var Io={};Io.updateCachedGrabbedEles=function(){var t=this.cachedZSortedEles;if(!!t){t.drag=[],t.nondrag=[];for(var e=[],r=0;r<t.length;r++){var a=t[r],n=a._private.rscratch;a.grabbed()&&!a.isParent()?e.push(a):n.inDragLayer?t.drag.push(a):t.nondrag.push(a)}for(var r=0;r<e.length;r++){var a=e[r];t.drag.push(a)}}};Io.invalidateCachedZSortedEles=function(){this.cachedZSortedEles=null};Io.getCachedZSortedEles=function(t){if(t||!this.cachedZSortedEles){var e=this.cy.mutableElements().toArray();e.sort(Xd),e.interactive=e.filter(function(r){return r.interactive()}),this.cachedZSortedEles=e,this.updateCachedGrabbedEles()}else e=this.cachedZSortedEles;return e};var Eh={};[Ta,Ao,Rt,oi,al,Cr,kh,Lo,Io].forEach(function(t){ke(Eh,t)});var Sh={};Sh.getCachedImage=function(t,e,r){var a=this,n=a.imageCache=a.imageCache||{},o=n[t];if(o)return o.image.complete||o.image.addEventListener("load",r),o.image;o=n[t]=n[t]||{};var i=o.image=new Image;i.addEventListener("load",r),i.addEventListener("error",function(){i.error=!0});var s="data:",l=t.substring(0,s.length).toLowerCase()===s;return l||(i.crossOrigin=e),i.src=t,i};var mn={};mn.registerBinding=function(t,e,r,a){var n=Array.prototype.slice.apply(arguments,[1]),o=this.binder(t);return o.on.apply(o,n)};mn.binder=function(t){var e=this,r=t===window||t===document||t===document.body||nm(t);if(e.supportsPassiveEvents==null){var a=!1;try{var n=Object.defineProperty({},"passive",{get:function(){return a=!0,!0}});window.addEventListener("test",null,n)}catch{}e.supportsPassiveEvents=a}var o=function(s,l,u){var c=Array.prototype.slice.call(arguments);return r&&e.supportsPassiveEvents&&(c[2]={capture:u??!1,passive:!1,once:!1}),e.bindings.push({target:t,args:c}),(t.addEventListener||t.on).apply(t,c),this};return{on:o,addEventListener:o,addListener:o,bind:o}};mn.nodeIsDraggable=function(t){return t&&t.isNode()&&!t.locked()&&t.grabbable()};mn.nodeIsGrabbable=function(t){return this.nodeIsDraggable(t)&&t.interactive()};mn.load=function(){var t=this,e=function(P){return P.selected()},r=function(P,V,G,K){P==null&&(P=t.cy);for(var Q=0;Q<V.length;Q++){var be=V[Q];P.emit({originalEvent:G,type:be,position:K})}},a=function(P){return P.shiftKey||P.metaKey||P.ctrlKey},n=function(P,V){var G=!0;if(t.cy.hasCompoundNodes()&&P&&P.pannable())for(var K=0;V&&K<V.length;K++){var P=V[K];if(P.isNode()&&P.isParent()&&!P.pannable()){G=!1;break}}else G=!0;return G},o=function(P){P[0]._private.grabbed=!0},i=function(P){P[0]._private.grabbed=!1},s=function(P){P[0]._private.rscratch.inDragLayer=!0},l=function(P){P[0]._private.rscratch.inDragLayer=!1},u=function(P){P[0]._private.rscratch.isGrabTarget=!0},c=function(P){P[0]._private.rscratch.isGrabTarget=!1},d=function(P,V){var G=V.addToList,K=G.has(P);K||(G.merge(P),o(P))},h=function(P,V){if(!!P.cy().hasCompoundNodes()&&!(V.inDragLayer==null&&V.addToList==null)){var G=P.descendants();V.inDragLayer&&(G.forEach(s),G.connectedEdges().forEach(s)),V.addToList&&V.addToList.unmerge(G)}},p=function(P,V){V=V||{};var G=P.cy().hasCompoundNodes();V.inDragLayer&&(P.forEach(s),P.neighborhood().stdFilter(function(K){return!G||K.isEdge()}).forEach(s)),V.addToList&&P.forEach(function(K){d(K,V)}),h(P,V),v(P,{inDragLayer:V.inDragLayer}),t.updateCachedGrabbedEles()},g=p,f=function(P){!P||(t.getCachedZSortedEles().forEach(function(V){i(V),l(V),c(V)}),t.updateCachedGrabbedEles())},v=function(P,V){if(!(V.inDragLayer==null&&V.addToList==null)&&!!P.cy().hasCompoundNodes()){var G=P.ancestors().orphans();if(!G.same(P)){var K=G.descendants().spawnSelf().merge(G).unmerge(P).unmerge(P.descendants()),Q=K.connectedEdges();V.inDragLayer&&(Q.forEach(s),K.forEach(s)),V.addToList&&K.forEach(function(be){d(be,V)})}}},m=function(){document.activeElement!=null&&document.activeElement.blur!=null&&document.activeElement.blur()},y=typeof MutationObserver!="undefined",b=typeof ResizeObserver!="undefined";y?(t.removeObserver=new MutationObserver(function(U){for(var P=0;P<U.length;P++){var V=U[P],G=V.removedNodes;if(G)for(var K=0;K<G.length;K++){var Q=G[K];if(Q===t.container){t.destroy();break}}}}),t.container.parentNode&&t.removeObserver.observe(t.container.parentNode,{childList:!0})):t.registerBinding(t.container,"DOMNodeRemoved",function(U){t.destroy()});var x=Ui(function(){t.cy.resize()},100);y&&(t.styleObserver=new MutationObserver(x),t.styleObserver.observe(t.container,{attributes:!0})),t.registerBinding(window,"resize",x),b&&(t.resizeObserver=new ResizeObserver(x),t.resizeObserver.observe(t.container));var k=function(P,V){for(;P!=null;)V(P),P=P.parentNode},E=function(){t.invalidateContainerClientCoordsCache()};k(t.container,function(U){t.registerBinding(U,"transitionend",E),t.registerBinding(U,"animationend",E),t.registerBinding(U,"scroll",E)}),t.registerBinding(t.container,"contextmenu",function(U){U.preventDefault()});var _=function(){return t.selection[4]!==0},T=function(P){for(var V=t.findContainerClientCoords(),G=V[0],K=V[1],Q=V[2],be=V[3],J=P.touches?P.touches:[P],me=!1,Pe=0;Pe<J.length;Pe++){var Le=J[Pe];if(G<=Le.clientX&&Le.clientX<=G+Q&&K<=Le.clientY&&Le.clientY<=K+be){me=!0;break}}if(!me)return!1;for(var Ee=t.container,Ie=P.target,Ce=Ie.parentNode,_e=!1;Ce;){if(Ce===Ee){_e=!0;break}Ce=Ce.parentNode}return!!_e};t.registerBinding(t.container,"mousedown",function(P){if(!!T(P)){P.preventDefault(),m(),t.hoverData.capture=!0,t.hoverData.which=P.which;var V=t.cy,G=[P.clientX,P.clientY],K=t.projectIntoViewport(G[0],G[1]),Q=t.selection,be=t.findNearestElements(K[0],K[1],!0,!1),J=be[0],me=t.dragData.possibleDragElements;t.hoverData.mdownPos=K,t.hoverData.mdownGPos=G;var Pe=function(){t.hoverData.tapholdCancelled=!1,clearTimeout(t.hoverData.tapholdTimeout),t.hoverData.tapholdTimeout=setTimeout(function(){if(!t.hoverData.tapholdCancelled){var Ye=t.hoverData.down;Ye?Ye.emit({originalEvent:P,type:"taphold",position:{x:K[0],y:K[1]}}):V.emit({originalEvent:P,type:"taphold",position:{x:K[0],y:K[1]}})}},t.tapholdDuration)};if(P.which==3){t.hoverData.cxtStarted=!0;var Le={originalEvent:P,type:"cxttapstart",position:{x:K[0],y:K[1]}};J?(J.activate(),J.emit(Le),t.hoverData.down=J):V.emit(Le),t.hoverData.downTime=new Date().getTime(),t.hoverData.cxtDragged=!1}else if(P.which==1){J&&J.activate();{if(J!=null&&t.nodeIsGrabbable(J)){var Ee=function(Ye){return{originalEvent:P,type:Ye,position:{x:K[0],y:K[1]}}},Ie=function(Ye){Ye.emit(Ee("grab"))};if(u(J),!J.selected())me=t.dragData.possibleDragElements=V.collection(),g(J,{addToList:me}),J.emit(Ee("grabon")).emit(Ee("grab"));else{me=t.dragData.possibleDragElements=V.collection();var Ce=V.$(function(_e){return _e.isNode()&&_e.selected()&&t.nodeIsGrabbable(_e)});p(Ce,{addToList:me}),J.emit(Ee("grabon")),Ce.forEach(Ie)}t.redrawHint("eles",!0),t.redrawHint("drag",!0)}t.hoverData.down=J,t.hoverData.downs=be,t.hoverData.downTime=new Date().getTime()}r(J,["mousedown","tapstart","vmousedown"],P,{x:K[0],y:K[1]}),J==null?(Q[4]=1,t.data.bgActivePosistion={x:K[0],y:K[1]},t.redrawHint("select",!0),t.redraw()):J.pannable()&&(Q[4]=1),Pe()}Q[0]=Q[2]=K[0],Q[1]=Q[3]=K[1]}},!1),t.registerBinding(window,"mousemove",function(P){var V=t.hoverData.capture;if(!(!V&&!T(P))){var G=!1,K=t.cy,Q=K.zoom(),be=[P.clientX,P.clientY],J=t.projectIntoViewport(be[0],be[1]),me=t.hoverData.mdownPos,Pe=t.hoverData.mdownGPos,Le=t.selection,Ee=null;!t.hoverData.draggingEles&&!t.hoverData.dragging&&!t.hoverData.selecting&&(Ee=t.findNearestElement(J[0],J[1],!0,!1));var Ie=t.hoverData.last,Ce=t.hoverData.down,_e=[J[0]-Le[2],J[1]-Le[3]],Ye=t.dragData.possibleDragElements,yt;if(Pe){var or=be[0]-Pe[0],sr=or*or,bt=be[1]-Pe[1],tr=bt*bt,Ot=sr+tr;t.hoverData.isOverThresholdDrag=yt=Ot>=t.desktopTapThreshold2}var Er=a(P);yt&&(t.hoverData.tapholdCancelled=!0);var Rr=function(){var ha=t.hoverData.dragDelta=t.hoverData.dragDelta||[];ha.length===0?(ha.push(_e[0]),ha.push(_e[1])):(ha[0]+=_e[0],ha[1]+=_e[1])};G=!0,r(Ee,["mousemove","vmousemove","tapdrag"],P,{x:J[0],y:J[1]});var Oa=function(){t.data.bgActivePosistion=void 0,t.hoverData.selecting||K.emit({originalEvent:P,type:"boxstart",position:{x:J[0],y:J[1]}}),Le[4]=1,t.hoverData.selecting=!0,t.redrawHint("select",!0),t.redraw()};if(t.hoverData.which===3){if(yt){var ca={originalEvent:P,type:"cxtdrag",position:{x:J[0],y:J[1]}};Ce?Ce.emit(ca):K.emit(ca),t.hoverData.cxtDragged=!0,(!t.hoverData.cxtOver||Ee!==t.hoverData.cxtOver)&&(t.hoverData.cxtOver&&t.hoverData.cxtOver.emit({originalEvent:P,type:"cxtdragout",position:{x:J[0],y:J[1]}}),t.hoverData.cxtOver=Ee,Ee&&Ee.emit({originalEvent:P,type:"cxtdragover",position:{x:J[0],y:J[1]}}))}}else if(t.hoverData.dragging){if(G=!0,K.panningEnabled()&&K.userPanningEnabled()){var $a;if(t.hoverData.justStartedPan){var hi=t.hoverData.mdownPos;$a={x:(J[0]-hi[0])*Q,y:(J[1]-hi[1])*Q},t.hoverData.justStartedPan=!1}else $a={x:_e[0]*Q,y:_e[1]*Q};K.panBy($a),K.emit("dragpan"),t.hoverData.dragged=!0}J=t.projectIntoViewport(P.clientX,P.clientY)}else if(Le[4]==1&&(Ce==null||Ce.pannable())){if(yt){if(!t.hoverData.dragging&&K.boxSelectionEnabled()&&(Er||!K.panningEnabled()||!K.userPanningEnabled()))Oa();else if(!t.hoverData.selecting&&K.panningEnabled()&&K.userPanningEnabled()){var da=n(Ce,t.hoverData.downs);da&&(t.hoverData.dragging=!0,t.hoverData.justStartedPan=!0,Le[4]=0,t.data.bgActivePosistion=tn(me),t.redrawHint("select",!0),t.redraw())}Ce&&Ce.pannable()&&Ce.active()&&Ce.unactivate()}}else{if(Ce&&Ce.pannable()&&Ce.active()&&Ce.unactivate(),(!Ce||!Ce.grabbed())&&Ee!=Ie&&(Ie&&r(Ie,["mouseout","tapdragout"],P,{x:J[0],y:J[1]}),Ee&&r(Ee,["mouseover","tapdragover"],P,{x:J[0],y:J[1]}),t.hoverData.last=Ee),Ce)if(yt){if(K.boxSelectionEnabled()&&Er)Ce&&Ce.grabbed()&&(f(Ye),Ce.emit("freeon"),Ye.emit("free"),t.dragData.didDrag&&(Ce.emit("dragfreeon"),Ye.emit("dragfree"))),Oa();else if(Ce&&Ce.grabbed()&&t.nodeIsDraggable(Ce)){var Ft=!t.dragData.didDrag;Ft&&t.redrawHint("eles",!0),t.dragData.didDrag=!0;var Xt=K.collection();t.hoverData.draggingEles||p(Ye,{inDragLayer:!0});var Nt={x:0,y:0};if(ce(_e[0])&&ce(_e[1])&&(Nt.x+=_e[0],Nt.y+=_e[1],Ft)){var Fr=t.hoverData.dragDelta;Fr&&ce(Fr[0])&&ce(Fr[1])&&(Nt.x+=Fr[0],Nt.y+=Fr[1])}for(var Nr=0;Nr<Ye.length;Nr++){var Ba=Ye[Nr];t.nodeIsDraggable(Ba)&&Ba.grabbed()&&Xt.push(Ba)}t.hoverData.draggingEles=!0,Xt.silentShift(Nt).emit("position drag"),t.redrawHint("drag",!0),t.redraw()}}else Rr();G=!0}if(Le[2]=J[0],Le[3]=J[1],G)return P.stopPropagation&&P.stopPropagation(),P.preventDefault&&P.preventDefault(),!1}},!1),t.registerBinding(window,"mouseup",function(P){var V=t.hoverData.capture;if(!!V){t.hoverData.capture=!1;var G=t.cy,K=t.projectIntoViewport(P.clientX,P.clientY),Q=t.selection,be=t.findNearestElement(K[0],K[1],!0,!1),J=t.dragData.possibleDragElements,me=t.hoverData.down,Pe=a(P);if(t.data.bgActivePosistion&&(t.redrawHint("select",!0),t.redraw()),t.hoverData.tapholdCancelled=!0,t.data.bgActivePosistion=void 0,me&&me.unactivate(),t.hoverData.which===3){var Le={originalEvent:P,type:"cxttapend",position:{x:K[0],y:K[1]}};if(me?me.emit(Le):G.emit(Le),!t.hoverData.cxtDragged){var Ee={originalEvent:P,type:"cxttap",position:{x:K[0],y:K[1]}};me?me.emit(Ee):G.emit(Ee)}t.hoverData.cxtDragged=!1,t.hoverData.which=null}else if(t.hoverData.which===1){if(r(be,["mouseup","tapend","vmouseup"],P,{x:K[0],y:K[1]}),!t.dragData.didDrag&&!t.hoverData.dragged&&!t.hoverData.selecting&&!t.hoverData.isOverThresholdDrag&&r(me,["click","tap","vclick"],P,{x:K[0],y:K[1]}),me==null&&!t.dragData.didDrag&&!t.hoverData.selecting&&!t.hoverData.dragged&&!a(P)&&(G.$(e).unselect(["tapunselect"]),J.length>0&&t.redrawHint("eles",!0),t.dragData.possibleDragElements=J=G.collection()),be==me&&!t.dragData.didDrag&&!t.hoverData.selecting&&be!=null&&be._private.selectable&&(t.hoverData.dragging||(G.selectionType()==="additive"||Pe?be.selected()?be.unselect(["tapunselect"]):be.select(["tapselect"]):Pe||(G.$(e).unmerge(be).unselect(["tapunselect"]),be.select(["tapselect"]))),t.redrawHint("eles",!0)),t.hoverData.selecting){var Ie=G.collection(t.getAllInBox(Q[0],Q[1],Q[2],Q[3]));t.redrawHint("select",!0),Ie.length>0&&t.redrawHint("eles",!0),G.emit({type:"boxend",originalEvent:P,position:{x:K[0],y:K[1]}});var Ce=function(yt){return yt.selectable()&&!yt.selected()};G.selectionType()==="additive"||Pe||G.$(e).unmerge(Ie).unselect(),Ie.emit("box").stdFilter(Ce).select().emit("boxselect"),t.redraw()}if(t.hoverData.dragging&&(t.hoverData.dragging=!1,t.redrawHint("select",!0),t.redrawHint("eles",!0),t.redraw()),!Q[4]){t.redrawHint("drag",!0),t.redrawHint("eles",!0);var _e=me&&me.grabbed();f(J),_e&&(me.emit("freeon"),J.emit("free"),t.dragData.didDrag&&(me.emit("dragfreeon"),J.emit("dragfree")))}}Q[4]=0,t.hoverData.down=null,t.hoverData.cxtStarted=!1,t.hoverData.draggingEles=!1,t.hoverData.selecting=!1,t.hoverData.isOverThresholdDrag=!1,t.dragData.didDrag=!1,t.hoverData.dragged=!1,t.hoverData.dragDelta=[],t.hoverData.mdownPos=null,t.hoverData.mdownGPos=null}},!1);var C=function(P){if(!t.scrollingPage){var V=t.cy,G=V.zoom(),K=V.pan(),Q=t.projectIntoViewport(P.clientX,P.clientY),be=[Q[0]*G+K.x,Q[1]*G+K.y];if(t.hoverData.draggingEles||t.hoverData.dragging||t.hoverData.cxtStarted||_()){P.preventDefault();return}if(V.panningEnabled()&&V.userPanningEnabled()&&V.zoomingEnabled()&&V.userZoomingEnabled()){P.preventDefault(),t.data.wheelZooming=!0,clearTimeout(t.data.wheelTimeout),t.data.wheelTimeout=setTimeout(function(){t.data.wheelZooming=!1,t.redrawHint("eles",!0),t.redraw()},150);var J;P.deltaY!=null?J=P.deltaY/-250:P.wheelDeltaY!=null?J=P.wheelDeltaY/1e3:J=P.wheelDelta/1e3,J=J*t.wheelSensitivity;var me=P.deltaMode===1;me&&(J*=33);var Pe=V.zoom()*Math.pow(10,J);P.type==="gesturechange"&&(Pe=t.gestureStartZoom*P.scale),V.zoom({level:Pe,renderedPosition:{x:be[0],y:be[1]}}),V.emit(P.type==="gesturechange"?"pinchzoom":"scrollzoom")}}};t.registerBinding(t.container,"wheel",C,!0),t.registerBinding(window,"scroll",function(P){t.scrollingPage=!0,clearTimeout(t.scrollingPageTimeout),t.scrollingPageTimeout=setTimeout(function(){t.scrollingPage=!1},250)},!0),t.registerBinding(t.container,"gesturestart",function(P){t.gestureStartZoom=t.cy.zoom(),t.hasTouchStarted||P.preventDefault()},!0),t.registerBinding(t.container,"gesturechange",function(U){t.hasTouchStarted||C(U)},!0),t.registerBinding(t.container,"mouseout",function(P){var V=t.projectIntoViewport(P.clientX,P.clientY);t.cy.emit({originalEvent:P,type:"mouseout",position:{x:V[0],y:V[1]}})},!1),t.registerBinding(t.container,"mouseover",function(P){var V=t.projectIntoViewport(P.clientX,P.clientY);t.cy.emit({originalEvent:P,type:"mouseover",position:{x:V[0],y:V[1]}})},!1);var D,L,A,O,I,N,z,$,B,R,H,M,j,W=function(P,V,G,K){return Math.sqrt((G-P)*(G-P)+(K-V)*(K-V))},te=function(P,V,G,K){return(G-P)*(G-P)+(K-V)*(K-V)},X;t.registerBinding(t.container,"touchstart",X=function(P){if(t.hasTouchStarted=!0,!!T(P)){m(),t.touchData.capture=!0,t.data.bgActivePosistion=void 0;var V=t.cy,G=t.touchData.now,K=t.touchData.earlier;if(P.touches[0]){var Q=t.projectIntoViewport(P.touches[0].clientX,P.touches[0].clientY);G[0]=Q[0],G[1]=Q[1]}if(P.touches[1]){var Q=t.projectIntoViewport(P.touches[1].clientX,P.touches[1].clientY);G[2]=Q[0],G[3]=Q[1]}if(P.touches[2]){var Q=t.projectIntoViewport(P.touches[2].clientX,P.touches[2].clientY);G[4]=Q[0],G[5]=Q[1]}if(P.touches[1]){t.touchData.singleTouchMoved=!0,f(t.dragData.touchDragEles);var be=t.findContainerClientCoords();B=be[0],R=be[1],H=be[2],M=be[3],D=P.touches[0].clientX-B,L=P.touches[0].clientY-R,A=P.touches[1].clientX-B,O=P.touches[1].clientY-R,j=0<=D&&D<=H&&0<=A&&A<=H&&0<=L&&L<=M&&0<=O&&O<=M;var J=V.pan(),me=V.zoom();I=W(D,L,A,O),N=te(D,L,A,O),z=[(D+A)/2,(L+O)/2],$=[(z[0]-J.x)/me,(z[1]-J.y)/me];var Pe=200,Le=Pe*Pe;if(N<Le&&!P.touches[2]){var Ee=t.findNearestElement(G[0],G[1],!0,!0),Ie=t.findNearestElement(G[2],G[3],!0,!0);Ee&&Ee.isNode()?(Ee.activate().emit({originalEvent:P,type:"cxttapstart",position:{x:G[0],y:G[1]}}),t.touchData.start=Ee):Ie&&Ie.isNode()?(Ie.activate().emit({originalEvent:P,type:"cxttapstart",position:{x:G[0],y:G[1]}}),t.touchData.start=Ie):V.emit({originalEvent:P,type:"cxttapstart",position:{x:G[0],y:G[1]}}),t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxt=!0,t.touchData.cxtDragged=!1,t.data.bgActivePosistion=void 0,t.redraw();return}}if(P.touches[2])V.boxSelectionEnabled()&&P.preventDefault();else if(!P.touches[1]){if(P.touches[0]){var Ce=t.findNearestElements(G[0],G[1],!0,!0),_e=Ce[0];if(_e!=null&&(_e.activate(),t.touchData.start=_e,t.touchData.starts=Ce,t.nodeIsGrabbable(_e))){var Ye=t.dragData.touchDragEles=V.collection(),yt=null;t.redrawHint("eles",!0),t.redrawHint("drag",!0),_e.selected()?(yt=V.$(function(Ot){return Ot.selected()&&t.nodeIsGrabbable(Ot)}),p(yt,{addToList:Ye})):g(_e,{addToList:Ye}),u(_e);var or=function(Er){return{originalEvent:P,type:Er,position:{x:G[0],y:G[1]}}};_e.emit(or("grabon")),yt?yt.forEach(function(Ot){Ot.emit(or("grab"))}):_e.emit(or("grab"))}r(_e,["touchstart","tapstart","vmousedown"],P,{x:G[0],y:G[1]}),_e==null&&(t.data.bgActivePosistion={x:Q[0],y:Q[1]},t.redrawHint("select",!0),t.redraw()),t.touchData.singleTouchMoved=!1,t.touchData.singleTouchStartTime=+new Date,clearTimeout(t.touchData.tapholdTimeout),t.touchData.tapholdTimeout=setTimeout(function(){t.touchData.singleTouchMoved===!1&&!t.pinching&&!t.touchData.selecting&&r(t.touchData.start,["taphold"],P,{x:G[0],y:G[1]})},t.tapholdDuration)}}if(P.touches.length>=1){for(var sr=t.touchData.startPosition=[],bt=0;bt<G.length;bt++)sr[bt]=K[bt]=G[bt];var tr=P.touches[0];t.touchData.startGPosition=[tr.clientX,tr.clientY]}}},!1);var Y;t.registerBinding(window,"touchmove",Y=function(P){var V=t.touchData.capture;if(!(!V&&!T(P))){var G=t.selection,K=t.cy,Q=t.touchData.now,be=t.touchData.earlier,J=K.zoom();if(P.touches[0]){var me=t.projectIntoViewport(P.touches[0].clientX,P.touches[0].clientY);Q[0]=me[0],Q[1]=me[1]}if(P.touches[1]){var me=t.projectIntoViewport(P.touches[1].clientX,P.touches[1].clientY);Q[2]=me[0],Q[3]=me[1]}if(P.touches[2]){var me=t.projectIntoViewport(P.touches[2].clientX,P.touches[2].clientY);Q[4]=me[0],Q[5]=me[1]}var Pe=t.touchData.startGPosition,Le;if(V&&P.touches[0]&&Pe){for(var Ee=[],Ie=0;Ie<Q.length;Ie++)Ee[Ie]=Q[Ie]-be[Ie];var Ce=P.touches[0].clientX-Pe[0],_e=Ce*Ce,Ye=P.touches[0].clientY-Pe[1],yt=Ye*Ye,or=_e+yt;Le=or>=t.touchTapThreshold2}if(V&&t.touchData.cxt){P.preventDefault();var sr=P.touches[0].clientX-B,bt=P.touches[0].clientY-R,tr=P.touches[1].clientX-B,Ot=P.touches[1].clientY-R,Er=te(sr,bt,tr,Ot),Rr=Er/N,Oa=150,ca=Oa*Oa,$a=1.5,hi=$a*$a;if(Rr>=hi||Er>=ca){t.touchData.cxt=!1,t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var da={originalEvent:P,type:"cxttapend",position:{x:Q[0],y:Q[1]}};t.touchData.start?(t.touchData.start.unactivate().emit(da),t.touchData.start=null):K.emit(da)}}if(V&&t.touchData.cxt){var da={originalEvent:P,type:"cxtdrag",position:{x:Q[0],y:Q[1]}};t.data.bgActivePosistion=void 0,t.redrawHint("select",!0),t.touchData.start?t.touchData.start.emit(da):K.emit(da),t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxtDragged=!0;var Ft=t.findNearestElement(Q[0],Q[1],!0,!0);(!t.touchData.cxtOver||Ft!==t.touchData.cxtOver)&&(t.touchData.cxtOver&&t.touchData.cxtOver.emit({originalEvent:P,type:"cxtdragout",position:{x:Q[0],y:Q[1]}}),t.touchData.cxtOver=Ft,Ft&&Ft.emit({originalEvent:P,type:"cxtdragover",position:{x:Q[0],y:Q[1]}}))}else if(V&&P.touches[2]&&K.boxSelectionEnabled())P.preventDefault(),t.data.bgActivePosistion=void 0,this.lastThreeTouch=+new Date,t.touchData.selecting||K.emit({originalEvent:P,type:"boxstart",position:{x:Q[0],y:Q[1]}}),t.touchData.selecting=!0,t.touchData.didSelect=!0,G[4]=1,!G||G.length===0||G[0]===void 0?(G[0]=(Q[0]+Q[2]+Q[4])/3,G[1]=(Q[1]+Q[3]+Q[5])/3,G[2]=(Q[0]+Q[2]+Q[4])/3+1,G[3]=(Q[1]+Q[3]+Q[5])/3+1):(G[2]=(Q[0]+Q[2]+Q[4])/3,G[3]=(Q[1]+Q[3]+Q[5])/3),t.redrawHint("select",!0),t.redraw();else if(V&&P.touches[1]&&!t.touchData.didSelect&&K.zoomingEnabled()&&K.panningEnabled()&&K.userZoomingEnabled()&&K.userPanningEnabled()){P.preventDefault(),t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var Xt=t.dragData.touchDragEles;if(Xt){t.redrawHint("drag",!0);for(var Nt=0;Nt<Xt.length;Nt++){var Fr=Xt[Nt]._private;Fr.grabbed=!1,Fr.rscratch.inDragLayer=!1}}var Nr=t.touchData.start,sr=P.touches[0].clientX-B,bt=P.touches[0].clientY-R,tr=P.touches[1].clientX-B,Ot=P.touches[1].clientY-R,Ba=W(sr,bt,tr,Ot),Mo=Ba/I;if(j){var ha=sr-D,uf=bt-L,cf=tr-A,df=Ot-O,hf=(ha+cf)/2,ff=(uf+df)/2,wn=K.zoom(),Ro=wn*Mo,fi=K.pan(),hl=$[0]*wn+fi.x,fl=$[1]*wn+fi.y,pf={x:-Ro/wn*(hl-fi.x-hf)+hl,y:-Ro/wn*(fl-fi.y-ff)+fl};if(Nr&&Nr.active()){var Xt=t.dragData.touchDragEles;f(Xt),t.redrawHint("drag",!0),t.redrawHint("eles",!0),Nr.unactivate().emit("freeon"),Xt.emit("free"),t.dragData.didDrag&&(Nr.emit("dragfreeon"),Xt.emit("dragfree"))}K.viewport({zoom:Ro,pan:pf,cancelOnFailedZoom:!0}),K.emit("pinchzoom"),I=Ba,D=sr,L=bt,A=tr,O=Ot,t.pinching=!0}if(P.touches[0]){var me=t.projectIntoViewport(P.touches[0].clientX,P.touches[0].clientY);Q[0]=me[0],Q[1]=me[1]}if(P.touches[1]){var me=t.projectIntoViewport(P.touches[1].clientX,P.touches[1].clientY);Q[2]=me[0],Q[3]=me[1]}if(P.touches[2]){var me=t.projectIntoViewport(P.touches[2].clientX,P.touches[2].clientY);Q[4]=me[0],Q[5]=me[1]}}else if(P.touches[0]&&!t.touchData.didSelect){var lr=t.touchData.start,Fo=t.touchData.last,Ft;if(!t.hoverData.draggingEles&&!t.swipePanning&&(Ft=t.findNearestElement(Q[0],Q[1],!0,!0)),V&&lr!=null&&P.preventDefault(),V&&lr!=null&&t.nodeIsDraggable(lr))if(Le){var Xt=t.dragData.touchDragEles,pl=!t.dragData.didDrag;pl&&p(Xt,{inDragLayer:!0}),t.dragData.didDrag=!0;var xn={x:0,y:0};if(ce(Ee[0])&&ce(Ee[1])&&(xn.x+=Ee[0],xn.y+=Ee[1],pl)){t.redrawHint("eles",!0);var ur=t.touchData.dragDelta;ur&&ce(ur[0])&&ce(ur[1])&&(xn.x+=ur[0],xn.y+=ur[1])}t.hoverData.draggingEles=!0,Xt.silentShift(xn).emit("position drag"),t.redrawHint("drag",!0),t.touchData.startPosition[0]==be[0]&&t.touchData.startPosition[1]==be[1]&&t.redrawHint("eles",!0),t.redraw()}else{var ur=t.touchData.dragDelta=t.touchData.dragDelta||[];ur.length===0?(ur.push(Ee[0]),ur.push(Ee[1])):(ur[0]+=Ee[0],ur[1]+=Ee[1])}if(r(lr||Ft,["touchmove","tapdrag","vmousemove"],P,{x:Q[0],y:Q[1]}),(!lr||!lr.grabbed())&&Ft!=Fo&&(Fo&&Fo.emit({originalEvent:P,type:"tapdragout",position:{x:Q[0],y:Q[1]}}),Ft&&Ft.emit({originalEvent:P,type:"tapdragover",position:{x:Q[0],y:Q[1]}})),t.touchData.last=Ft,V)for(var Nt=0;Nt<Q.length;Nt++)Q[Nt]&&t.touchData.startPosition[Nt]&&Le&&(t.touchData.singleTouchMoved=!0);if(V&&(lr==null||lr.pannable())&&K.panningEnabled()&&K.userPanningEnabled()){var vf=n(lr,t.touchData.starts);vf&&(P.preventDefault(),t.data.bgActivePosistion||(t.data.bgActivePosistion=tn(t.touchData.startPosition)),t.swipePanning?(K.panBy({x:Ee[0]*J,y:Ee[1]*J}),K.emit("dragpan")):Le&&(t.swipePanning=!0,K.panBy({x:Ce*J,y:Ye*J}),K.emit("dragpan"),lr&&(lr.unactivate(),t.redrawHint("select",!0),t.touchData.start=null)));var me=t.projectIntoViewport(P.touches[0].clientX,P.touches[0].clientY);Q[0]=me[0],Q[1]=me[1]}}for(var Ie=0;Ie<Q.length;Ie++)be[Ie]=Q[Ie];V&&P.touches.length>0&&!t.hoverData.draggingEles&&!t.swipePanning&&t.data.bgActivePosistion!=null&&(t.data.bgActivePosistion=void 0,t.redrawHint("select",!0),t.redraw())}},!1);var F;t.registerBinding(window,"touchcancel",F=function(P){var V=t.touchData.start;t.touchData.capture=!1,V&&V.unactivate()});var Z;if(t.registerBinding(window,"touchend",Z=function(P){var V=t.touchData.start,G=t.touchData.capture;if(G)P.touches.length===0&&(t.touchData.capture=!1),P.preventDefault();else return;var K=t.selection;t.swipePanning=!1,t.hoverData.draggingEles=!1;var Q=t.cy,be=Q.zoom(),J=t.touchData.now,me=t.touchData.earlier;if(P.touches[0]){var Pe=t.projectIntoViewport(P.touches[0].clientX,P.touches[0].clientY);J[0]=Pe[0],J[1]=Pe[1]}if(P.touches[1]){var Pe=t.projectIntoViewport(P.touches[1].clientX,P.touches[1].clientY);J[2]=Pe[0],J[3]=Pe[1]}if(P.touches[2]){var Pe=t.projectIntoViewport(P.touches[2].clientX,P.touches[2].clientY);J[4]=Pe[0],J[5]=Pe[1]}V&&V.unactivate();var Le;if(t.touchData.cxt){if(Le={originalEvent:P,type:"cxttapend",position:{x:J[0],y:J[1]}},V?V.emit(Le):Q.emit(Le),!t.touchData.cxtDragged){var Ee={originalEvent:P,type:"cxttap",position:{x:J[0],y:J[1]}};V?V.emit(Ee):Q.emit(Ee)}t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxt=!1,t.touchData.start=null,t.redraw();return}if(!P.touches[2]&&Q.boxSelectionEnabled()&&t.touchData.selecting){t.touchData.selecting=!1;var Ie=Q.collection(t.getAllInBox(K[0],K[1],K[2],K[3]));K[0]=void 0,K[1]=void 0,K[2]=void 0,K[3]=void 0,K[4]=0,t.redrawHint("select",!0),Q.emit({type:"boxend",originalEvent:P,position:{x:J[0],y:J[1]}});var Ce=function(ca){return ca.selectable()&&!ca.selected()};Ie.emit("box").stdFilter(Ce).select().emit("boxselect"),Ie.nonempty()&&t.redrawHint("eles",!0),t.redraw()}if(V!=null&&V.unactivate(),P.touches[2])t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);else if(!P.touches[1]){if(!P.touches[0]){if(!P.touches[0]){t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var _e=t.dragData.touchDragEles;if(V!=null){var Ye=V._private.grabbed;f(_e),t.redrawHint("drag",!0),t.redrawHint("eles",!0),Ye&&(V.emit("freeon"),_e.emit("free"),t.dragData.didDrag&&(V.emit("dragfreeon"),_e.emit("dragfree"))),r(V,["touchend","tapend","vmouseup","tapdragout"],P,{x:J[0],y:J[1]}),V.unactivate(),t.touchData.start=null}else{var yt=t.findNearestElement(J[0],J[1],!0,!0);r(yt,["touchend","tapend","vmouseup","tapdragout"],P,{x:J[0],y:J[1]})}var or=t.touchData.startPosition[0]-J[0],sr=or*or,bt=t.touchData.startPosition[1]-J[1],tr=bt*bt,Ot=sr+tr,Er=Ot*be*be;t.touchData.singleTouchMoved||(V||Q.$(":selected").unselect(["tapunselect"]),r(V,["tap","vclick"],P,{x:J[0],y:J[1]})),V!=null&&!t.dragData.didDrag&&V._private.selectable&&Er<t.touchTapThreshold2&&!t.pinching&&(Q.selectionType()==="single"?(Q.$(e).unmerge(V).unselect(["tapunselect"]),V.select(["tapselect"])):V.selected()?V.unselect(["tapunselect"]):V.select(["tapselect"]),t.redrawHint("eles",!0)),t.touchData.singleTouchMoved=!0}}}for(var Rr=0;Rr<J.length;Rr++)me[Rr]=J[Rr];t.dragData.didDrag=!1,P.touches.length===0&&(t.touchData.dragDelta=[],t.touchData.startPosition=null,t.touchData.startGPosition=null,t.touchData.didSelect=!1),P.touches.length<2&&(P.touches.length===1&&(t.touchData.startGPosition=[P.touches[0].clientX,P.touches[0].clientY]),t.pinching=!1,t.redrawHint("eles",!0),t.redraw())},!1),typeof TouchEvent=="undefined"){var se=[],ie=function(P){return{clientX:P.clientX,clientY:P.clientY,force:1,identifier:P.pointerId,pageX:P.pageX,pageY:P.pageY,radiusX:P.width/2,radiusY:P.height/2,screenX:P.screenX,screenY:P.screenY,target:P.target}},pe=function(P){return{event:P,touch:ie(P)}},De=function(P){se.push(pe(P))},Te=function(P){for(var V=0;V<se.length;V++){var G=se[V];if(G.event.pointerId===P.pointerId){se.splice(V,1);return}}},fe=function(P){var V=se.filter(function(G){return G.event.pointerId===P.pointerId})[0];V.event=P,V.touch=ie(P)},de=function(P){P.touches=se.map(function(V){return V.touch})},ye=function(P){return P.pointerType==="mouse"||P.pointerType===4};t.registerBinding(t.container,"pointerdown",function(U){ye(U)||(U.preventDefault(),De(U),de(U),X(U))}),t.registerBinding(t.container,"pointerup",function(U){ye(U)||(Te(U),de(U),Z(U))}),t.registerBinding(t.container,"pointercancel",function(U){ye(U)||(Te(U),de(U),F(U))}),t.registerBinding(t.container,"pointermove",function(U){ye(U)||(U.preventDefault(),fe(U),de(U),Y(U))})}};var zr={};zr.generatePolygon=function(t,e){return this.nodeShapes[t]={renderer:this,name:t,points:e,draw:function(a,n,o,i,s){this.renderer.nodeShapeImpl("polygon",a,n,o,i,s,this.points)},intersectLine:function(a,n,o,i,s,l,u){return Yn(s,l,this.points,a,n,o/2,i/2,u)},checkPoint:function(a,n,o,i,s,l,u){return $r(a,n,this.points,l,u,i,s,[0,-1],o)}}};zr.generateEllipse=function(){return this.nodeShapes.ellipse={renderer:this,name:"ellipse",draw:function(e,r,a,n,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,o)},intersectLine:function(e,r,a,n,o,i,s){return h0(o,i,e,r,a/2+s,n/2+s)},checkPoint:function(e,r,a,n,o,i,s){return _a(e,r,n,o,i,s,a)}}};zr.generateRoundPolygon=function(t,e){for(var r=new Array(e.length*2),a=0;a<e.length/2;a++){var n=a*2,o=void 0;a<e.length/2-1?o=(a+1)*2:o=0,r[a*4]=e[n],r[a*4+1]=e[n+1];var i=e[o]-e[n],s=e[o+1]-e[n+1],l=Math.sqrt(i*i+s*s);r[a*4+2]=i/l,r[a*4+3]=s/l}return this.nodeShapes[t]={renderer:this,name:t,points:r,draw:function(c,d,h,p,g){this.renderer.nodeShapeImpl("round-polygon",c,d,h,p,g,this.points)},intersectLine:function(c,d,h,p,g,f,v){return f0(g,f,this.points,c,d,h,p)},checkPoint:function(c,d,h,p,g,f,v){return d0(c,d,this.points,f,v,p,g)}}};zr.generateRoundRectangle=function(){return this.nodeShapes["round-rectangle"]=this.nodeShapes.roundrectangle={renderer:this,name:"round-rectangle",points:Mt(4,0),draw:function(e,r,a,n,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,o)},intersectLine:function(e,r,a,n,o,i,s){return Gc(o,i,e,r,a,n,s)},checkPoint:function(e,r,a,n,o,i,s){var l=Xn(n,o),u=l*2;return!!($r(e,r,this.points,i,s,n,o-u,[0,-1],a)||$r(e,r,this.points,i,s,n-u,o,[0,-1],a)||_a(e,r,u,u,i-n/2+l,s-o/2+l,a)||_a(e,r,u,u,i+n/2-l,s-o/2+l,a)||_a(e,r,u,u,i+n/2-l,s+o/2-l,a)||_a(e,r,u,u,i-n/2+l,s+o/2-l,a))}}};zr.generateCutRectangle=function(){return this.nodeShapes["cut-rectangle"]=this.nodeShapes.cutrectangle={renderer:this,name:"cut-rectangle",cornerLength:ed(),points:Mt(4,0),draw:function(e,r,a,n,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,o)},generateCutTrianglePts:function(e,r,a,n){var o=this.cornerLength,i=r/2,s=e/2,l=a-s,u=a+s,c=n-i,d=n+i;return{topLeft:[l,c+o,l+o,c,l+o,c+o],topRight:[u-o,c,u,c+o,u-o,c+o],bottomRight:[u,d-o,u-o,d,u-o,d-o],bottomLeft:[l+o,d,l,d-o,l+o,d-o]}},intersectLine:function(e,r,a,n,o,i,s){var l=this.generateCutTrianglePts(a+2*s,n+2*s,e,r),u=[].concat.apply([],[l.topLeft.splice(0,4),l.topRight.splice(0,4),l.bottomRight.splice(0,4),l.bottomLeft.splice(0,4)]);return Yn(o,i,u,e,r)},checkPoint:function(e,r,a,n,o,i,s){if($r(e,r,this.points,i,s,n,o-2*this.cornerLength,[0,-1],a)||$r(e,r,this.points,i,s,n-2*this.cornerLength,o,[0,-1],a))return!0;var l=this.generateCutTrianglePts(n,o,i,s);return Yt(e,r,l.topLeft)||Yt(e,r,l.topRight)||Yt(e,r,l.bottomRight)||Yt(e,r,l.bottomLeft)}}};zr.generateBarrel=function(){return this.nodeShapes.barrel={renderer:this,name:"barrel",points:Mt(4,0),draw:function(e,r,a,n,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,o)},intersectLine:function(e,r,a,n,o,i,s){var l=.15,u=.5,c=.85,d=this.generateBarrelBezierPts(a+2*s,n+2*s,e,r),h=function(f){var v=rn({x:f[0],y:f[1]},{x:f[2],y:f[3]},{x:f[4],y:f[5]},l),m=rn({x:f[0],y:f[1]},{x:f[2],y:f[3]},{x:f[4],y:f[5]},u),y=rn({x:f[0],y:f[1]},{x:f[2],y:f[3]},{x:f[4],y:f[5]},c);return[f[0],f[1],v.x,v.y,m.x,m.y,y.x,y.y,f[4],f[5]]},p=[].concat(h(d.topLeft),h(d.topRight),h(d.bottomRight),h(d.bottomLeft));return Yn(o,i,p,e,r)},generateBarrelBezierPts:function(e,r,a,n){var o=r/2,i=e/2,s=a-i,l=a+i,u=n-o,c=n+o,d=Ms(e,r),h=d.heightOffset,p=d.widthOffset,g=d.ctrlPtOffsetPct*e,f={topLeft:[s,u+h,s+g,u,s+p,u],topRight:[l-p,u,l-g,u,l,u+h],bottomRight:[l,c-h,l-g,c,l-p,c],bottomLeft:[s+p,c,s+g,c,s,c-h]};return f.topLeft.isTop=!0,f.topRight.isTop=!0,f.bottomLeft.isBottom=!0,f.bottomRight.isBottom=!0,f},checkPoint:function(e,r,a,n,o,i,s){var l=Ms(n,o),u=l.heightOffset,c=l.widthOffset;if($r(e,r,this.points,i,s,n,o-2*u,[0,-1],a)||$r(e,r,this.points,i,s,n-2*c,o,[0,-1],a))return!0;for(var d=this.generateBarrelBezierPts(n,o,i,s),h=function(_,T,C){var D=C[4],L=C[2],A=C[0],O=C[5],I=C[1],N=Math.min(D,A),z=Math.max(D,A),$=Math.min(O,I),B=Math.max(O,I);if(N<=_&&_<=z&&$<=T&&T<=B){var R=p0(D,L,A),H=s0(R[0],R[1],R[2],_),M=H.filter(function(j){return 0<=j&&j<=1});if(M.length>0)return M[0]}return null},p=Object.keys(d),g=0;g<p.length;g++){var f=p[g],v=d[f],m=h(e,r,v);if(m!=null){var y=v[5],b=v[3],x=v[1],k=mt(y,b,x,m);if(v.isTop&&k<=r||v.isBottom&&r<=k)return!0}}return!1}}};zr.generateBottomRoundrectangle=function(){return this.nodeShapes["bottom-round-rectangle"]=this.nodeShapes.bottomroundrectangle={renderer:this,name:"bottom-round-rectangle",points:Mt(4,0),draw:function(e,r,a,n,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,o)},intersectLine:function(e,r,a,n,o,i,s){var l=e-(a/2+s),u=r-(n/2+s),c=u,d=e+(a/2+s),h=ta(o,i,e,r,l,u,d,c,!1);return h.length>0?h:Gc(o,i,e,r,a,n,s)},checkPoint:function(e,r,a,n,o,i,s){var l=Xn(n,o),u=2*l;if($r(e,r,this.points,i,s,n,o-u,[0,-1],a)||$r(e,r,this.points,i,s,n-u,o,[0,-1],a))return!0;var c=n/2+2*a,d=o/2+2*a,h=[i-c,s-d,i-c,s,i+c,s,i+c,s-d];return!!(Yt(e,r,h)||_a(e,r,u,u,i+n/2-l,s+o/2-l,a)||_a(e,r,u,u,i-n/2+l,s+o/2-l,a))}}};zr.registerNodeShapes=function(){var t=this.nodeShapes={},e=this;this.generateEllipse(),this.generatePolygon("triangle",Mt(3,0)),this.generateRoundPolygon("round-triangle",Mt(3,0)),this.generatePolygon("rectangle",Mt(4,0)),t.square=t.rectangle,this.generateRoundRectangle(),this.generateCutRectangle(),this.generateBarrel(),this.generateBottomRoundrectangle();{var r=[0,1,1,0,0,-1,-1,0];this.generatePolygon("diamond",r),this.generateRoundPolygon("round-diamond",r)}this.generatePolygon("pentagon",Mt(5,0)),this.generateRoundPolygon("round-pentagon",Mt(5,0)),this.generatePolygon("hexagon",Mt(6,0)),this.generateRoundPolygon("round-hexagon",Mt(6,0)),this.generatePolygon("heptagon",Mt(7,0)),this.generateRoundPolygon("round-heptagon",Mt(7,0)),this.generatePolygon("octagon",Mt(8,0)),this.generateRoundPolygon("round-octagon",Mt(8,0));var a=new Array(20);{var n=Bs(5,0),o=Bs(5,Math.PI/5),i=.5*(3-Math.sqrt(5));i*=1.57;for(var s=0;s<o.length/2;s++)o[s*2]*=i,o[s*2+1]*=i;for(var s=0;s<20/4;s++)a[s*4]=n[s*2],a[s*4+1]=n[s*2+1],a[s*4+2]=o[s*2],a[s*4+3]=o[s*2+1]}a=Jc(a),this.generatePolygon("star",a),this.generatePolygon("vee",[-1,-1,0,-.333,1,-1,0,1]),this.generatePolygon("rhomboid",[-1,-1,.333,-1,1,1,-.333,1]),this.nodeShapes.concavehexagon=this.generatePolygon("concave-hexagon",[-1,-.95,-.75,0,-1,.95,1,.95,.75,0,1,-.95]);{var l=[-1,-1,.25,-1,1,0,.25,1,-1,1];this.generatePolygon("tag",l),this.generateRoundPolygon("round-tag",l)}t.makePolygon=function(u){var c=u.join("$"),d="polygon-"+c,h;return(h=this[d])?h:e.generatePolygon(d,u)}};var si={};si.timeToRender=function(){return this.redrawTotalTime/this.redrawCount};si.redraw=function(t){t=t||Hc();var e=this;e.averageRedrawTime===void 0&&(e.averageRedrawTime=0),e.lastRedrawTime===void 0&&(e.lastRedrawTime=0),e.lastDrawTime===void 0&&(e.lastDrawTime=0),e.requestedFrame=!0,e.renderOptions=t};si.beforeRender=function(t,e){if(!this.destroyed){e==null&&st("Priority is not optional for beforeRender");var r=this.beforeRenderCallbacks;r.push({fn:t,priority:e}),r.sort(function(a,n){return n.priority-a.priority})}};var Th=function(e,r,a){for(var n=e.beforeRenderCallbacks,o=0;o<n.length;o++)n[o].fn(r,a)};si.startRenderLoop=function(){var t=this,e=t.cy;if(!t.renderLoopStarted){t.renderLoopStarted=!0;var r=function a(n){if(!t.destroyed){if(!e.batching())if(t.requestedFrame&&!t.skipFrame){Th(t,!0,n);var o=Or();t.render(t.renderOptions);var i=t.lastDrawTime=Or();t.averageRedrawTime===void 0&&(t.averageRedrawTime=i-o),t.redrawCount===void 0&&(t.redrawCount=0),t.redrawCount++,t.redrawTotalTime===void 0&&(t.redrawTotalTime=0);var s=i-o;t.redrawTotalTime+=s,t.lastRedrawTime=s,t.averageRedrawTime=t.averageRedrawTime/2+s/2,t.requestedFrame=!1}else Th(t,!1,n);t.skipFrame=!1,Zi(a)}};Zi(r)}};var Mb=function(e){this.init(e)},Dh=Mb,yn=Dh.prototype;yn.clientFunctions=["redrawHint","render","renderTo","matchCanvasSize","nodeShapeImpl","arrowShapeImpl"];yn.init=function(t){var e=this;e.options=t,e.cy=t.cy;var r=e.container=t.cy.container();if(tt){var a=tt.document,n=a.head,o="__________cytoscape_stylesheet",i="__________cytoscape_container",s=a.getElementById(o)!=null;if(r.className.indexOf(i)<0&&(r.className=(r.className||"")+" "+i),!s){var l=a.createElement("style");l.id=o,l.innerHTML="."+i+" { position: relative; }",n.insertBefore(l,n.children[0])}var u=tt.getComputedStyle(r),c=u.getPropertyValue("position");c==="static"&&Ke("A Cytoscape container has style position:static and so can not use UI extensions properly")}e.selection=[void 0,void 0,void 0,void 0,0],e.bezierProjPcts=[.05,.225,.4,.5,.6,.775,.95],e.hoverData={down:null,last:null,downTime:null,triggerMode:null,dragging:!1,initialPan:[null,null],capture:!1},e.dragData={possibleDragElements:[]},e.touchData={start:null,capture:!1,startPosition:[null,null,null,null,null,null],singleTouchStartTime:null,singleTouchMoved:!0,now:[null,null,null,null,null,null],earlier:[null,null,null,null,null,null]},e.redraws=0,e.showFps=t.showFps,e.debug=t.debug,e.hideEdgesOnViewport=t.hideEdgesOnViewport,e.textureOnViewport=t.textureOnViewport,e.wheelSensitivity=t.wheelSensitivity,e.motionBlurEnabled=t.motionBlur,e.forcedPixelRatio=ce(t.pixelRatio)?t.pixelRatio:null,e.motionBlur=t.motionBlur,e.motionBlurOpacity=t.motionBlurOpacity,e.motionBlurTransparency=1-e.motionBlurOpacity,e.motionBlurPxRatio=1,e.mbPxRBlurry=1,e.minMbLowQualFrames=4,e.fullQualityMb=!1,e.clearedForMotionBlur=[],e.desktopTapThreshold=t.desktopTapThreshold,e.desktopTapThreshold2=t.desktopTapThreshold*t.desktopTapThreshold,e.touchTapThreshold=t.touchTapThreshold,e.touchTapThreshold2=t.touchTapThreshold*t.touchTapThreshold,e.tapholdDuration=500,e.bindings=[],e.beforeRenderCallbacks=[],e.beforeRenderPriorities={animations:400,eleCalcs:300,eleTxrDeq:200,lyrTxrDeq:150,lyrTxrSkip:100},e.registerNodeShapes(),e.registerArrowShapes(),e.registerCalculationListeners()};yn.notify=function(t,e){var r=this,a=r.cy;if(!this.destroyed){if(t==="init"){r.load();return}if(t==="destroy"){r.destroy();return}(t==="add"||t==="remove"||t==="move"&&a.hasCompoundNodes()||t==="load"||t==="zorder"||t==="mount")&&r.invalidateCachedZSortedEles(),t==="viewport"&&r.redrawHint("select",!0),(t==="load"||t==="resize"||t==="mount")&&(r.invalidateContainerClientCoordsCache(),r.matchCanvasSize(r.container)),r.redrawHint("eles",!0),r.redrawHint("drag",!0),this.startRenderLoop(),this.redraw()}};yn.destroy=function(){var t=this;t.destroyed=!0,t.cy.stopAnimationLoop();for(var e=0;e<t.bindings.length;e++){var r=t.bindings[e],a=r,n=a.target;(n.off||n.removeEventListener).apply(n,a.args)}if(t.bindings=[],t.beforeRenderCallbacks=[],t.onUpdateEleCalcsFns=[],t.removeObserver&&t.removeObserver.disconnect(),t.styleObserver&&t.styleObserver.disconnect(),t.resizeObserver&&t.resizeObserver.disconnect(),t.labelCalcDiv)try{document.body.removeChild(t.labelCalcDiv)}catch{}};yn.isHeadless=function(){return!1};[rl,Eh,Sh,mn,zr,si].forEach(function(t){ke(yn,t)});var nl=1e3/60,Ph={setupDequeueing:function(e){return function(){var a=this,n=this.renderer;if(!a.dequeueingSetup){a.dequeueingSetup=!0;var o=Ui(function(){n.redrawHint("eles",!0),n.redrawHint("drag",!0),n.redraw()},e.deqRedrawThreshold),i=function(u,c){var d=Or(),h=n.averageRedrawTime,p=n.lastRedrawTime,g=[],f=n.cy.extent(),v=n.getPixelRatio();for(u||n.flushRenderedStyleQueue();;){var m=Or(),y=m-d,b=m-c;if(p<nl){var x=nl-(u?h:0);if(b>=e.deqFastCost*x)break}else if(u){if(y>=e.deqCost*p||y>=e.deqAvgCost*h)break}else if(b>=e.deqNoDrawCost*nl)break;var k=e.deq(a,v,f);if(k.length>0)for(var E=0;E<k.length;E++)g.push(k[E]);else break}g.length>0&&(e.onDeqd(a,g),!u&&e.shouldRedraw(a,g,v,f)&&o())},s=e.priority||Ds;n.beforeRender(i,s(a))}}}},Rb=function(){function t(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ji;ks(this,t),this.idsByKey=new kr,this.keyForId=new kr,this.cachesByLvl=new kr,this.lvls=[],this.getKey=e,this.doesEleInvalidateKey=r}return _s(t,[{key:"getIdsFor",value:function(r){r==null&&st("Can not get id list for null key");var a=this.idsByKey,n=this.idsByKey.get(r);return n||(n=new en,a.set(r,n)),n}},{key:"addIdForKey",value:function(r,a){r!=null&&this.getIdsFor(r).add(a)}},{key:"deleteIdForKey",value:function(r,a){r!=null&&this.getIdsFor(r).delete(a)}},{key:"getNumberOfIdsForKey",value:function(r){return r==null?0:this.getIdsFor(r).size}},{key:"updateKeyMappingFor",value:function(r){var a=r.id(),n=this.keyForId.get(a),o=this.getKey(r);this.deleteIdForKey(n,a),this.addIdForKey(o,a),this.keyForId.set(a,o)}},{key:"deleteKeyMappingFor",value:function(r){var a=r.id(),n=this.keyForId.get(a);this.deleteIdForKey(n,a),this.keyForId.delete(a)}},{key:"keyHasChangedFor",value:function(r){var a=r.id(),n=this.keyForId.get(a),o=this.getKey(r);return n!==o}},{key:"isInvalid",value:function(r){return this.keyHasChangedFor(r)||this.doesEleInvalidateKey(r)}},{key:"getCachesAt",value:function(r){var a=this.cachesByLvl,n=this.lvls,o=a.get(r);return o||(o=new kr,a.set(r,o),n.push(r)),o}},{key:"getCache",value:function(r,a){return this.getCachesAt(a).get(r)}},{key:"get",value:function(r,a){var n=this.getKey(r),o=this.getCache(n,a);return o!=null&&this.updateKeyMappingFor(r),o}},{key:"getForCachedKey",value:function(r,a){var n=this.keyForId.get(r.id()),o=this.getCache(n,a);return o}},{key:"hasCache",value:function(r,a){return this.getCachesAt(a).has(r)}},{key:"has",value:function(r,a){var n=this.getKey(r);return this.hasCache(n,a)}},{key:"setCache",value:function(r,a,n){n.key=r,this.getCachesAt(a).set(r,n)}},{key:"set",value:function(r,a,n){var o=this.getKey(r);this.setCache(o,a,n),this.updateKeyMappingFor(r)}},{key:"deleteCache",value:function(r,a){this.getCachesAt(a).delete(r)}},{key:"delete",value:function(r,a){var n=this.getKey(r);this.deleteCache(n,a)}},{key:"invalidateKey",value:function(r){var a=this;this.lvls.forEach(function(n){return a.deleteCache(r,n)})}},{key:"invalidate",value:function(r){var a=r.id(),n=this.keyForId.get(a);this.deleteKeyMappingFor(r);var o=this.doesEleInvalidateKey(r);return o&&this.invalidateKey(n),o||this.getNumberOfIdsForKey(n)===0}}]),t}(),Ah=25,Oo=50,$o=-4,il=3,Fb=7.99,Nb=8,Vb=1024,jb=1024,Kb=1024,Hb=.2,Qb=.8,Yb=10,Xb=.15,Ub=.1,qb=.9,Gb=.9,Zb=100,Wb=1,bn={dequeue:"dequeue",downscale:"downscale",highQuality:"highQuality"},Jb=_t({getKey:null,doesEleInvalidateKey:Ji,drawElement:null,getBoundingBox:null,getRotationPoint:null,getRotationOffset:null,isVisible:Nc,allowEdgeTxrCaching:!0,allowParentTxrCaching:!0}),li=function(e,r){var a=this;a.renderer=e,a.onDequeues=[];var n=Jb(r);ke(a,n),a.lookup=new Rb(n.getKey,n.doesEleInvalidateKey),a.setupDequeueing()},ht=li.prototype;ht.reasons=bn;ht.getTextureQueue=function(t){var e=this;return e.eleImgCaches=e.eleImgCaches||{},e.eleImgCaches[t]=e.eleImgCaches[t]||[]};ht.getRetiredTextureQueue=function(t){var e=this,r=e.eleImgCaches.retired=e.eleImgCaches.retired||{},a=r[t]=r[t]||[];return a};ht.getElementQueue=function(){var t=this,e=t.eleCacheQueue=t.eleCacheQueue||new zn(function(r,a){return a.reqs-r.reqs});return e};ht.getElementKeyToQueue=function(){var t=this,e=t.eleKeyToCacheQueue=t.eleKeyToCacheQueue||{};return e};ht.getElement=function(t,e,r,a,n){var o=this,i=this.renderer,s=i.cy.zoom(),l=this.lookup;if(!e||e.w===0||e.h===0||isNaN(e.w)||isNaN(e.h)||!t.visible()||t.removed()||!o.allowEdgeTxrCaching&&t.isEdge()||!o.allowParentTxrCaching&&t.isParent())return null;if(a==null&&(a=Math.ceil(Ls(s*r))),a<$o)a=$o;else if(s>=Fb||a>il)return null;var u=Math.pow(2,a),c=e.h*u,d=e.w*u,h=i.eleTextBiggerThanMin(t,u);if(!this.isVisible(t,h))return null;var p=l.get(t,a);if(p&&p.invalidated&&(p.invalidated=!1,p.texture.invalidatedWidth-=p.width),p)return p;var g;if(c<=Ah?g=Ah:c<=Oo?g=Oo:g=Math.ceil(c/Oo)*Oo,c>Kb||d>jb)return null;var f=o.getTextureQueue(g),v=f[f.length-2],m=function(){return o.recycleTexture(g,d)||o.addTexture(g,d)};v||(v=f[f.length-1]),v||(v=m()),v.width-v.usedWidth<d&&(v=m());for(var y=function(z){return z&&z.scaledLabelShown===h},b=n&&n===bn.dequeue,x=n&&n===bn.highQuality,k=n&&n===bn.downscale,E,_=a+1;_<=il;_++){var T=l.get(t,_);if(T){E=T;break}}var C=E&&E.level===a+1?E:null,D=function(){v.context.drawImage(C.texture.canvas,C.x,0,C.width,C.height,v.usedWidth,0,d,c)};if(v.context.setTransform(1,0,0,1,0,0),v.context.clearRect(v.usedWidth,0,d,g),y(C))D();else if(y(E))if(x){for(var L=E.level;L>a;L--)C=o.getElement(t,e,r,L,bn.downscale);D()}else return o.queueElement(t,E.level-1),E;else{var A;if(!b&&!x&&!k)for(var O=a-1;O>=$o;O--){var I=l.get(t,O);if(I){A=I;break}}if(y(A))return o.queueElement(t,a),A;v.context.translate(v.usedWidth,0),v.context.scale(u,u),this.drawElement(v.context,t,e,h,!1),v.context.scale(1/u,1/u),v.context.translate(-v.usedWidth,0)}return p={x:v.usedWidth,texture:v,level:a,scale:u,width:d,height:c,scaledLabelShown:h},v.usedWidth+=Math.ceil(d+Nb),v.eleCaches.push(p),l.set(t,a,p),o.checkTextureFullness(v),p};ht.invalidateElements=function(t){for(var e=0;e<t.length;e++)this.invalidateElement(t[e])};ht.invalidateElement=function(t){var e=this,r=e.lookup,a=[],n=r.isInvalid(t);if(!!n){for(var o=$o;o<=il;o++){var i=r.getForCachedKey(t,o);i&&a.push(i)}var s=r.invalidate(t);if(s)for(var l=0;l<a.length;l++){var u=a[l],c=u.texture;c.invalidatedWidth+=u.width,u.invalidated=!0,e.checkTextureUtility(c)}e.removeFromQueue(t)}};ht.checkTextureUtility=function(t){t.invalidatedWidth>=Hb*t.width&&this.retireTexture(t)};ht.checkTextureFullness=function(t){var e=this,r=e.getTextureQueue(t.height);t.usedWidth/t.width>Qb&&t.fullnessChecks>=Yb?Jr(r,t):t.fullnessChecks++};ht.retireTexture=function(t){var e=this,r=t.height,a=e.getTextureQueue(r),n=this.lookup;Jr(a,t),t.retired=!0;for(var o=t.eleCaches,i=0;i<o.length;i++){var s=o[i];n.deleteCache(s.key,s.level)}Ps(o);var l=e.getRetiredTextureQueue(r);l.push(t)};ht.addTexture=function(t,e){var r=this,a=r.getTextureQueue(t),n={};return a.push(n),n.eleCaches=[],n.height=t,n.width=Math.max(Vb,e),n.usedWidth=0,n.invalidatedWidth=0,n.fullnessChecks=0,n.canvas=r.renderer.makeOffscreenCanvas(n.width,n.height),n.context=n.canvas.getContext("2d"),n};ht.recycleTexture=function(t,e){for(var r=this,a=r.getTextureQueue(t),n=r.getRetiredTextureQueue(t),o=0;o<n.length;o++){var i=n[o];if(i.width>=e)return i.retired=!1,i.usedWidth=0,i.invalidatedWidth=0,i.fullnessChecks=0,Ps(i.eleCaches),i.context.setTransform(1,0,0,1,0,0),i.context.clearRect(0,0,i.width,i.height),Jr(n,i),a.push(i),i}};ht.queueElement=function(t,e){var r=this,a=r.getElementQueue(),n=r.getElementKeyToQueue(),o=this.getKey(t),i=n[o];if(i)i.level=Math.max(i.level,e),i.eles.merge(t),i.reqs++,a.updateItem(i);else{var s={eles:t.spawn().merge(t),level:e,reqs:1,key:o};a.push(s),n[o]=s}};ht.dequeue=function(t){for(var e=this,r=e.getElementQueue(),a=e.getElementKeyToQueue(),n=[],o=e.lookup,i=0;i<Wb&&r.size()>0;i++){var s=r.pop(),l=s.key,u=s.eles[0],c=o.hasCache(u,s.level);if(a[l]=null,c)continue;n.push(s);var d=e.getBoundingBox(u);e.getElement(u,d,t,s.level,bn.dequeue)}return n};ht.removeFromQueue=function(t){var e=this,r=e.getElementQueue(),a=e.getElementKeyToQueue(),n=this.getKey(t),o=a[n];o!=null&&(o.eles.length===1?(o.reqs=Ts,r.updateItem(o),r.pop(),a[n]=null):o.eles.unmerge(t))};ht.onDequeue=function(t){this.onDequeues.push(t)};ht.offDequeue=function(t){Jr(this.onDequeues,t)};ht.setupDequeueing=Ph.setupDequeueing({deqRedrawThreshold:Zb,deqCost:Xb,deqAvgCost:Ub,deqNoDrawCost:qb,deqFastCost:Gb,deq:function(e,r,a){return e.dequeue(r,a)},onDeqd:function(e,r){for(var a=0;a<e.onDequeues.length;a++){var n=e.onDequeues[a];n(r)}},shouldRedraw:function(e,r,a,n){for(var o=0;o<r.length;o++)for(var i=r[o].eles,s=0;s<i.length;s++){var l=i[s].boundingBox();if(Os(l,n))return!0}return!1},priority:function(e){return e.renderer.beforeRenderPriorities.eleTxrDeq}});var e1=1,ui=-4,Bo=2,t1=3.99,r1=50,a1=50,n1=.15,i1=.1,o1=.9,s1=.9,l1=1,Lh=250,u1=4e3*4e3,c1=!0,Ih=function(e){var r=this,a=r.renderer=e,n=a.cy;r.layersByLevel={},r.firstGet=!0,r.lastInvalidationTime=Or()-2*Lh,r.skipping=!1,r.eleTxrDeqs=n.collection(),r.scheduleElementRefinement=Ui(function(){r.refineElementTextures(r.eleTxrDeqs),r.eleTxrDeqs.unmerge(r.eleTxrDeqs)},a1),a.beforeRender(function(i,s){s-r.lastInvalidationTime<=Lh?r.skipping=!0:r.skipping=!1},a.beforeRenderPriorities.lyrTxrSkip);var o=function(s,l){return l.reqs-s.reqs};r.layersQueue=new zn(o),r.setupDequeueing()},Tt=Ih.prototype,Oh=0,d1=Math.pow(2,53)-1;Tt.makeLayer=function(t,e){var r=Math.pow(2,e),a=Math.ceil(t.w*r),n=Math.ceil(t.h*r),o=this.renderer.makeOffscreenCanvas(a,n),i={id:Oh=++Oh%d1,bb:t,level:e,width:a,height:n,canvas:o,context:o.getContext("2d"),eles:[],elesQueue:[],reqs:0},s=i.context,l=-i.bb.x1,u=-i.bb.y1;return s.scale(r,r),s.translate(l,u),i};Tt.getLayers=function(t,e,r){var a=this,n=a.renderer,o=n.cy,i=o.zoom(),s=a.firstGet;if(a.firstGet=!1,r==null){if(r=Math.ceil(Ls(i*e)),r<ui)r=ui;else if(i>=t1||r>Bo)return null}a.validateLayersElesOrdering(r,t);var l=a.layersByLevel,u=Math.pow(2,r),c=l[r]=l[r]||[],d,h=a.levelIsComplete(r,t),p,g=function(){var D=function(N){if(a.validateLayersElesOrdering(N,t),a.levelIsComplete(N,t))return p=l[N],!0},L=function(N){if(!p)for(var z=r+N;ui<=z&&z<=Bo&&!D(z);z+=N);};L(1),L(-1);for(var A=c.length-1;A>=0;A--){var O=c[A];O.invalid&&Jr(c,O)}};if(!h)g();else return c;var f=function(){if(!d){d=Qt();for(var D=0;D<t.length;D++)r0(d,t[D].boundingBox())}return d},v=function(D){D=D||{};var L=D.after;f();var A=d.w*u*(d.h*u);if(A>u1)return null;var O=a.makeLayer(d,r);if(L!=null){var I=c.indexOf(L)+1;c.splice(I,0,O)}else(D.insert===void 0||D.insert)&&c.unshift(O);return O};if(a.skipping&&!s)return null;for(var m=null,y=t.length/e1,b=!s,x=0;x<t.length;x++){var k=t[x],E=k._private.rscratch,_=E.imgLayerCaches=E.imgLayerCaches||{},T=_[r];if(T){m=T;continue}if((!m||m.eles.length>=y||!qc(m.bb,k.boundingBox()))&&(m=v({insert:!0,after:m}),!m))return null;p||b?a.queueLayer(m,k):a.drawEleInLayer(m,k,r,e),m.eles.push(k),_[r]=m}return p||(b?null:c)};Tt.getEleLevelForLayerLevel=function(t,e){return t};Tt.drawEleInLayer=function(t,e,r,a){var n=this,o=this.renderer,i=t.context,s=e.boundingBox();s.w===0||s.h===0||!e.visible()||(r=n.getEleLevelForLayerLevel(r,a),o.setImgSmoothing(i,!1),o.drawCachedElement(i,e,null,null,r,c1),o.setImgSmoothing(i,!0))};Tt.levelIsComplete=function(t,e){var r=this,a=r.layersByLevel[t];if(!a||a.length===0)return!1;for(var n=0,o=0;o<a.length;o++){var i=a[o];if(i.reqs>0||i.invalid)return!1;n+=i.eles.length}return n===e.length};Tt.validateLayersElesOrdering=function(t,e){var r=this.layersByLevel[t];if(!!r)for(var a=0;a<r.length;a++){for(var n=r[a],o=-1,i=0;i<e.length;i++)if(n.eles[0]===e[i]){o=i;break}if(o<0){this.invalidateLayer(n);continue}for(var s=o,i=0;i<n.eles.length;i++)if(n.eles[i]!==e[s+i]){this.invalidateLayer(n);break}}};Tt.updateElementsInLayers=function(t,e){for(var r=this,a=Rn(t[0]),n=0;n<t.length;n++)for(var o=a?null:t[n],i=a?t[n]:t[n].ele,s=i._private.rscratch,l=s.imgLayerCaches=s.imgLayerCaches||{},u=ui;u<=Bo;u++){var c=l[u];!c||o&&r.getEleLevelForLayerLevel(c.level)!==o.level||e(c,i,o)}};Tt.haveLayers=function(){for(var t=this,e=!1,r=ui;r<=Bo;r++){var a=t.layersByLevel[r];if(a&&a.length>0){e=!0;break}}return e};Tt.invalidateElements=function(t){var e=this;t.length!==0&&(e.lastInvalidationTime=Or(),!(t.length===0||!e.haveLayers())&&e.updateElementsInLayers(t,function(a,n,o){e.invalidateLayer(a)}))};Tt.invalidateLayer=function(t){if(this.lastInvalidationTime=Or(),!t.invalid){var e=t.level,r=t.eles,a=this.layersByLevel[e];Jr(a,t),t.elesQueue=[],t.invalid=!0,t.replacement&&(t.replacement.invalid=!0);for(var n=0;n<r.length;n++){var o=r[n]._private.rscratch.imgLayerCaches;o&&(o[e]=null)}}};Tt.refineElementTextures=function(t){var e=this;e.updateElementsInLayers(t,function(a,n,o){var i=a.replacement;if(i||(i=a.replacement=e.makeLayer(a.bb,a.level),i.replaces=a,i.eles=a.eles),!i.reqs)for(var s=0;s<i.eles.length;s++)e.queueLayer(i,i.eles[s])})};Tt.enqueueElementRefinement=function(t){this.eleTxrDeqs.merge(t),this.scheduleElementRefinement()};Tt.queueLayer=function(t,e){var r=this,a=r.layersQueue,n=t.elesQueue,o=n.hasId=n.hasId||{};if(!t.replacement){if(e){if(o[e.id()])return;n.push(e),o[e.id()]=!0}t.reqs?(t.reqs++,a.updateItem(t)):(t.reqs=1,a.push(t))}};Tt.dequeue=function(t){for(var e=this,r=e.layersQueue,a=[],n=0;n<l1&&r.size()!==0;){var o=r.peek();if(o.replacement){r.pop();continue}if(o.replaces&&o!==o.replaces.replacement){r.pop();continue}if(o.invalid){r.pop();continue}var i=o.elesQueue.shift();i&&(e.drawEleInLayer(o,i,o.level,t),n++),a.length===0&&a.push(!0),o.elesQueue.length===0&&(r.pop(),o.reqs=0,o.replaces&&e.applyLayerReplacement(o),e.requestRedraw())}return a};Tt.applyLayerReplacement=function(t){var e=this,r=e.layersByLevel[t.level],a=t.replaces,n=r.indexOf(a);if(!(n<0||a.invalid)){r[n]=t;for(var o=0;o<t.eles.length;o++){var i=t.eles[o]._private,s=i.imgLayerCaches=i.imgLayerCaches||{};s&&(s[t.level]=t)}e.requestRedraw()}};Tt.requestRedraw=Ui(function(){var t=this.renderer;t.redrawHint("eles",!0),t.redrawHint("drag",!0),t.redraw()},100);Tt.setupDequeueing=Ph.setupDequeueing({deqRedrawThreshold:r1,deqCost:n1,deqAvgCost:i1,deqNoDrawCost:o1,deqFastCost:s1,deq:function(e,r){return e.dequeue(r)},onDeqd:Ds,shouldRedraw:Nc,priority:function(e){return e.renderer.beforeRenderPriorities.lyrTxrDeq}});var $h={},Bh;function h1(t,e){for(var r=0;r<e.length;r++){var a=e[r];t.lineTo(a.x,a.y)}}function f1(t,e,r){for(var a,n=0;n<e.length;n++){var o=e[n];n===0&&(a=o),t.lineTo(o.x,o.y)}t.quadraticCurveTo(r.x,r.y,a.x,a.y)}function zh(t,e,r){t.beginPath&&t.beginPath();for(var a=e,n=0;n<a.length;n++){var o=a[n];t.lineTo(o.x,o.y)}var i=r,s=r[0];t.moveTo(s.x,s.y);for(var n=1;n<i.length;n++){var o=i[n];t.lineTo(o.x,o.y)}t.closePath&&t.closePath()}function p1(t,e,r,a,n){t.beginPath&&t.beginPath(),t.arc(r,a,n,0,Math.PI*2,!1);var o=e,i=o[0];t.moveTo(i.x,i.y);for(var s=0;s<o.length;s++){var l=o[s];t.lineTo(l.x,l.y)}t.closePath&&t.closePath()}function v1(t,e,r,a){t.arc(e,r,a,0,Math.PI*2,!1)}$h.arrowShapeImpl=function(t){return(Bh||(Bh={polygon:h1,"triangle-backcurve":f1,"triangle-tee":zh,"circle-triangle":p1,"triangle-cross":zh,circle:v1}))[t]};var Mr={};Mr.drawElement=function(t,e,r,a,n,o){var i=this;e.isNode()?i.drawNode(t,e,r,a,n,o):i.drawEdge(t,e,r,a,n,o)};Mr.drawElementOverlay=function(t,e){var r=this;e.isNode()?r.drawNodeOverlay(t,e):r.drawEdgeOverlay(t,e)};Mr.drawCachedElementPortion=function(t,e,r,a,n,o,i,s){var l=this,u=r.getBoundingBox(e);if(!(u.w===0||u.h===0)){var c=r.getElement(e,u,a,n,o);if(c!=null){var d=s(l,e);if(d===0)return;var h=i(l,e),p=u.x1,g=u.y1,f=u.w,v=u.h,m,y,b,x,k;if(h!==0){var E=r.getRotationPoint(e);b=E.x,x=E.y,t.translate(b,x),t.rotate(h),k=l.getImgSmoothing(t),k||l.setImgSmoothing(t,!0);var _=r.getRotationOffset(e);m=_.x,y=_.y}else m=p,y=g;var T;d!==1&&(T=t.globalAlpha,t.globalAlpha=T*d),t.drawImage(c.texture.canvas,c.x,0,c.width,c.height,m,y,f,v),d!==1&&(t.globalAlpha=T),h!==0&&(t.rotate(-h),t.translate(-b,-x),k||l.setImgSmoothing(t,!1))}else r.drawElement(t,e)}};var g1=function(){return 0},m1=function(e,r){return e.getTextAngle(r,null)},y1=function(e,r){return e.getTextAngle(r,"source")},b1=function(e,r){return e.getTextAngle(r,"target")},w1=function(e,r){return r.effectiveOpacity()},ol=function(e,r){return r.pstyle("text-opacity").pfValue*r.effectiveOpacity()};Mr.drawCachedElement=function(t,e,r,a,n,o){var i=this,s=i.data,l=s.eleTxrCache,u=s.lblTxrCache,c=s.slbTxrCache,d=s.tlbTxrCache,h=e.boundingBox(),p=o===!0?l.reasons.highQuality:null;if(!(h.w===0||h.h===0||!e.visible())&&(!a||Os(h,a))){var g=e.isEdge(),f=e.element()._private.rscratch.badLine;i.drawCachedElementPortion(t,e,l,r,n,p,g1,w1),(!g||!f)&&i.drawCachedElementPortion(t,e,u,r,n,p,m1,ol),g&&!f&&(i.drawCachedElementPortion(t,e,c,r,n,p,y1,ol),i.drawCachedElementPortion(t,e,d,r,n,p,b1,ol)),i.drawElementOverlay(t,e)}};Mr.drawElements=function(t,e){for(var r=this,a=0;a<e.length;a++){var n=e[a];r.drawElement(t,n)}};Mr.drawCachedElements=function(t,e,r,a){for(var n=this,o=0;o<e.length;o++){var i=e[o];n.drawCachedElement(t,i,r,a)}};Mr.drawCachedNodes=function(t,e,r,a){for(var n=this,o=0;o<e.length;o++){var i=e[o];!i.isNode()||n.drawCachedElement(t,i,r,a)}};Mr.drawLayeredElements=function(t,e,r,a){var n=this,o=n.data.lyrTxrCache.getLayers(e,r);if(o)for(var i=0;i<o.length;i++){var s=o[i],l=s.bb;l.w===0||l.h===0||t.drawImage(s.canvas,l.x1,l.y1,l.w,l.h)}else n.drawCachedElements(t,e,r,a)};var Da={};Da.drawEdge=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,i=this,s=e._private.rscratch;if(!(o&&!e.visible())&&!(s.badLine||s.allpts==null||isNaN(s.allpts[0]))){var l;r&&(l=r,t.translate(-l.x1,-l.y1));var u=o?e.pstyle("opacity").value:1,c=o?e.pstyle("line-opacity").value:1,d=e.pstyle("line-style").value,h=e.pstyle("width").pfValue,p=e.pstyle("line-cap").value,g=u*c,f=u*c,v=function(){var D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:g;t.lineWidth=h,t.lineCap=p,i.eleStrokeStyle(t,e,D),i.drawEdgePath(e,t,s.allpts,d),t.lineCap="butt"},m=function(){!n||i.drawEdgeOverlay(t,e)},y=function(){var D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:f;i.drawArrowheads(t,e,D)},b=function(){i.drawElementText(t,e,null,a)};t.lineJoin="round";var x=e.pstyle("ghost").value==="yes";if(x){var k=e.pstyle("ghost-offset-x").pfValue,E=e.pstyle("ghost-offset-y").pfValue,_=e.pstyle("ghost-opacity").value,T=g*_;t.translate(k,E),v(T),y(T),t.translate(-k,-E)}v(),y(),m(),b(),r&&t.translate(l.x1,l.y1)}};Da.drawEdgeOverlay=function(t,e){if(!!e.visible()){var r=e.pstyle("overlay-opacity").value;if(r!==0){var a=this,n=a.usePaths(),o=e._private.rscratch,i=e.pstyle("overlay-padding").pfValue,s=2*i,l=e.pstyle("overlay-color").value;t.lineWidth=s,o.edgeType==="self"&&!n?t.lineCap="butt":t.lineCap="round",a.colorStrokeStyle(t,l[0],l[1],l[2],r),a.drawEdgePath(e,t,o.allpts,"solid")}}};Da.drawEdgePath=function(t,e,r,a){var n=t._private.rscratch,o=e,i,s=!1,l=this.usePaths(),u=t.pstyle("line-dash-pattern").pfValue,c=t.pstyle("line-dash-offset").pfValue;if(l){var d=r.join("$"),h=n.pathCacheKey&&n.pathCacheKey===d;h?(i=e=n.pathCache,s=!0):(i=e=new Path2D,n.pathCacheKey=d,n.pathCache=i)}if(o.setLineDash)switch(a){case"dotted":o.setLineDash([1,1]);break;case"dashed":o.setLineDash(u),o.lineDashOffset=c;break;case"solid":o.setLineDash([]);break}if(!s&&!n.badLine)switch(e.beginPath&&e.beginPath(),e.moveTo(r[0],r[1]),n.edgeType){case"bezier":case"self":case"compound":case"multibezier":for(var p=2;p+3<r.length;p+=4)e.quadraticCurveTo(r[p],r[p+1],r[p+2],r[p+3]);break;case"straight":case"segments":case"haystack":for(var g=2;g+1<r.length;g+=2)e.lineTo(r[g],r[g+1]);break}e=o,l?e.stroke(i):e.stroke(),e.setLineDash&&e.setLineDash([])};Da.drawArrowheads=function(t,e,r){var a=e._private.rscratch,n=a.edgeType==="haystack";n||this.drawArrowhead(t,e,"source",a.arrowStartX,a.arrowStartY,a.srcArrowAngle,r),this.drawArrowhead(t,e,"mid-target",a.midX,a.midY,a.midtgtArrowAngle,r),this.drawArrowhead(t,e,"mid-source",a.midX,a.midY,a.midsrcArrowAngle,r),n||this.drawArrowhead(t,e,"target",a.arrowEndX,a.arrowEndY,a.tgtArrowAngle,r)};Da.drawArrowhead=function(t,e,r,a,n,o,i){if(!(isNaN(a)||a==null||isNaN(n)||n==null||isNaN(o)||o==null)){var s=this,l=e.pstyle(r+"-arrow-shape").value;if(l!=="none"){var u=e.pstyle(r+"-arrow-fill").value==="hollow"?"both":"filled",c=e.pstyle(r+"-arrow-fill").value,d=e.pstyle("width").pfValue,h=e.pstyle("opacity").value;i===void 0&&(i=h);var p=t.globalCompositeOperation;(i!==1||c==="hollow")&&(t.globalCompositeOperation="destination-out",s.colorFillStyle(t,255,255,255,1),s.colorStrokeStyle(t,255,255,255,1),s.drawArrowShape(e,t,u,d,l,a,n,o),t.globalCompositeOperation=p);var g=e.pstyle(r+"-arrow-color").value;s.colorFillStyle(t,g[0],g[1],g[2],i),s.colorStrokeStyle(t,g[0],g[1],g[2],i),s.drawArrowShape(e,t,c,d,l,a,n,o)}}};Da.drawArrowShape=function(t,e,r,a,n,o,i,s){var l=this,u=this.usePaths()&&n!=="triangle-cross",c=!1,d,h=e,p={x:o,y:i},g=t.pstyle("arrow-scale").value,f=this.getArrowWidth(a,g),v=l.arrowShapes[n];if(u){var m=l.arrowPathCache=l.arrowPathCache||[],y=wa(n),b=m[y];b!=null?(d=e=b,c=!0):(d=e=new Path2D,m[y]=d)}c||(e.beginPath&&e.beginPath(),u?v.draw(e,1,0,{x:0,y:0},1):v.draw(e,f,s,p,a),e.closePath&&e.closePath()),e=h,u&&(e.translate(o,i),e.rotate(s),e.scale(f,f)),(r==="filled"||r==="both")&&(u?e.fill(d):e.fill()),(r==="hollow"||r==="both")&&(e.lineWidth=(v.matchEdgeWidth?a:1)/(u?f:1),e.lineJoin="miter",u?e.stroke(d):e.stroke()),u&&(e.scale(1/f,1/f),e.rotate(-s),e.translate(-o,-i))};var sl={};sl.safeDrawImage=function(t,e,r,a,n,o,i,s,l,u){n<=0||o<=0||l<=0||u<=0||t.drawImage(e,r,a,n,o,i,s,l,u)};sl.drawInscribedImage=function(t,e,r,a,n){var o=this,i=r.position(),s=i.x,l=i.y,u=r.cy().style(),c=u.getIndexedStyle.bind(u),d=c(r,"background-fit","value",a),h=c(r,"background-repeat","value",a),p=r.width(),g=r.height(),f=r.padding()*2,v=p+(c(r,"background-width-relative-to","value",a)==="inner"?0:f),m=g+(c(r,"background-height-relative-to","value",a)==="inner"?0:f),y=r._private.rscratch,b=c(r,"background-clip","value",a),x=b==="node",k=c(r,"background-image-opacity","value",a)*n,E=c(r,"background-image-smoothing","value",a),_=e.width||e.cachedW,T=e.height||e.cachedH;(_==null||T==null)&&(document.body.appendChild(e),_=e.cachedW=e.width||e.offsetWidth,T=e.cachedH=e.height||e.offsetHeight,document.body.removeChild(e));var C=_,D=T;if(c(r,"background-width","value",a)!=="auto"&&(c(r,"background-width","units",a)==="%"?C=c(r,"background-width","pfValue",a)*v:C=c(r,"background-width","pfValue",a)),c(r,"background-height","value",a)!=="auto"&&(c(r,"background-height","units",a)==="%"?D=c(r,"background-height","pfValue",a)*m:D=c(r,"background-height","pfValue",a)),!(C===0||D===0)){if(d==="contain"){var L=Math.min(v/C,m/D);C*=L,D*=L}else if(d==="cover"){var L=Math.max(v/C,m/D);C*=L,D*=L}var A=s-v/2,O=c(r,"background-position-x","units",a),I=c(r,"background-position-x","pfValue",a);O==="%"?A+=(v-C)*I:A+=I;var N=c(r,"background-offset-x","units",a),z=c(r,"background-offset-x","pfValue",a);N==="%"?A+=(v-C)*z:A+=z;var $=l-m/2,B=c(r,"background-position-y","units",a),R=c(r,"background-position-y","pfValue",a);B==="%"?$+=(m-D)*R:$+=R;var H=c(r,"background-offset-y","units",a),M=c(r,"background-offset-y","pfValue",a);H==="%"?$+=(m-D)*M:$+=M,y.pathCache&&(A-=s,$-=l,s=0,l=0);var j=t.globalAlpha;t.globalAlpha=k;var W=o.getImgSmoothing(t),te=!1;if(E==="no"&&W?(o.setImgSmoothing(t,!1),te=!0):E==="yes"&&!W&&(o.setImgSmoothing(t,!0),te=!0),h==="no-repeat")x&&(t.save(),y.pathCache?t.clip(y.pathCache):(o.nodeShapes[o.getNodeShape(r)].draw(t,s,l,v,m),t.clip())),o.safeDrawImage(t,e,0,0,_,T,A,$,C,D),x&&t.restore();else{var X=t.createPattern(e,h);t.fillStyle=X,o.nodeShapes[o.getNodeShape(r)].draw(t,s,l,v,m),t.translate(A,$),t.fill(),t.translate(-A,-$)}t.globalAlpha=j,te&&o.setImgSmoothing(t,W)}};var Pa={};Pa.eleTextBiggerThanMin=function(t,e){if(!e){var r=t.cy().zoom(),a=this.getPixelRatio(),n=Math.ceil(Ls(r*a));e=Math.pow(2,n)}var o=t.pstyle("font-size").pfValue*e,i=t.pstyle("min-zoomed-font-size").pfValue;return!(o<i)};Pa.drawElementText=function(t,e,r,a,n){var o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,i=this;if(a==null){if(o&&!i.eleTextBiggerThanMin(e))return}else if(a===!1)return;if(e.isNode()){var s=e.pstyle("label");if(!s||!s.value)return;var l=i.getLabelJustification(e);t.textAlign=l,t.textBaseline="bottom"}else{var u=e.element()._private.rscratch.badLine,c=e.pstyle("label"),d=e.pstyle("source-label"),h=e.pstyle("target-label");if(u||(!c||!c.value)&&(!d||!d.value)&&(!h||!h.value))return;t.textAlign="center",t.textBaseline="bottom"}var p=!r,g;r&&(g=r,t.translate(-g.x1,-g.y1)),n==null?(i.drawText(t,e,null,p,o),e.isEdge()&&(i.drawText(t,e,"source",p,o),i.drawText(t,e,"target",p,o))):i.drawText(t,e,n,p,o),r&&t.translate(g.x1,g.y1)};Pa.getFontCache=function(t){var e;this.fontCaches=this.fontCaches||[];for(var r=0;r<this.fontCaches.length;r++)if(e=this.fontCaches[r],e.context===t)return e;return e={context:t},this.fontCaches.push(e),e};Pa.setupTextStyle=function(t,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,a=e.pstyle("font-style").strValue,n=e.pstyle("font-size").pfValue+"px",o=e.pstyle("font-family").strValue,i=e.pstyle("font-weight").strValue,s=r?e.effectiveOpacity()*e.pstyle("text-opacity").value:1,l=e.pstyle("text-outline-opacity").value*s,u=e.pstyle("color").value,c=e.pstyle("text-outline-color").value;t.font=a+" "+i+" "+n+" "+o,t.lineJoin="round",this.colorFillStyle(t,u[0],u[1],u[2],s),this.colorStrokeStyle(t,c[0],c[1],c[2],l)};function x1(t,e,r,a,n){var o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:5;t.beginPath(),t.moveTo(e+o,r),t.lineTo(e+a-o,r),t.quadraticCurveTo(e+a,r,e+a,r+o),t.lineTo(e+a,r+n-o),t.quadraticCurveTo(e+a,r+n,e+a-o,r+n),t.lineTo(e+o,r+n),t.quadraticCurveTo(e,r+n,e,r+n-o),t.lineTo(e,r+o),t.quadraticCurveTo(e,r,e+o,r),t.closePath(),t.fill()}Pa.getTextAngle=function(t,e){var r,a=t._private,n=a.rscratch,o=e?e+"-":"",i=t.pstyle(o+"text-rotation"),s=pr(n,"labelAngle",e);return i.strValue==="autorotate"?r=t.isEdge()?s:0:i.strValue==="none"?r=0:r=i.pfValue,r};Pa.drawText=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=e._private,i=o.rscratch,s=n?e.effectiveOpacity():1;if(!(n&&(s===0||e.pstyle("text-opacity").value===0))){r==="main"&&(r=null);var l=pr(i,"labelX",r),u=pr(i,"labelY",r),c,d,h=this.getLabelText(e,r);if(h!=null&&h!==""&&!isNaN(l)&&!isNaN(u)){this.setupTextStyle(t,e,n);var p=r?r+"-":"",g=pr(i,"labelWidth",r),f=pr(i,"labelHeight",r),v=e.pstyle(p+"text-margin-x").pfValue,m=e.pstyle(p+"text-margin-y").pfValue,y=e.isEdge(),b=e.pstyle("text-halign").value,x=e.pstyle("text-valign").value;y&&(b="center",x="center"),l+=v,u+=m;var k;switch(a?k=this.getTextAngle(e,r):k=0,k!==0&&(c=l,d=u,t.translate(c,d),t.rotate(k),l=0,u=0),x){case"top":break;case"center":u+=f/2;break;case"bottom":u+=f;break}var E=e.pstyle("text-background-opacity").value,_=e.pstyle("text-border-opacity").value,T=e.pstyle("text-border-width").pfValue,C=e.pstyle("text-background-padding").pfValue;if(E>0||T>0&&_>0){var D=l-C;switch(b){case"left":D-=g;break;case"center":D-=g/2;break}var L=u-f-C,A=g+2*C,O=f+2*C;if(E>0){var I=t.fillStyle,N=e.pstyle("text-background-color").value;t.fillStyle="rgba("+N[0]+","+N[1]+","+N[2]+","+E*s+")";var z=e.pstyle("text-background-shape").strValue;z.indexOf("round")===0?x1(t,D,L,A,O,2):t.fillRect(D,L,A,O),t.fillStyle=I}if(T>0&&_>0){var $=t.strokeStyle,B=t.lineWidth,R=e.pstyle("text-border-color").value,H=e.pstyle("text-border-style").value;if(t.strokeStyle="rgba("+R[0]+","+R[1]+","+R[2]+","+_*s+")",t.lineWidth=T,t.setLineDash)switch(H){case"dotted":t.setLineDash([1,1]);break;case"dashed":t.setLineDash([4,2]);break;case"double":t.lineWidth=T/4,t.setLineDash([]);break;case"solid":t.setLineDash([]);break}if(t.strokeRect(D,L,A,O),H==="double"){var M=T/2;t.strokeRect(D+M,L+M,A-M*2,O-M*2)}t.setLineDash&&t.setLineDash([]),t.lineWidth=B,t.strokeStyle=$}}var j=2*e.pstyle("text-outline-width").pfValue;if(j>0&&(t.lineWidth=j),e.pstyle("text-wrap").value==="wrap"){var W=pr(i,"labelWrapCachedLines",r),te=pr(i,"labelLineHeight",r),X=g/2,Y=this.getLabelJustification(e);switch(Y==="auto"||(b==="left"?Y==="left"?l+=-g:Y==="center"&&(l+=-X):b==="center"?Y==="left"?l+=-X:Y==="right"&&(l+=X):b==="right"&&(Y==="center"?l+=X:Y==="right"&&(l+=g))),x){case"top":u-=(W.length-1)*te;break;case"center":case"bottom":u-=(W.length-1)*te;break}for(var F=0;F<W.length;F++)j>0&&t.strokeText(W[F],l,u),t.fillText(W[F],l,u),u+=te}else j>0&&t.strokeText(h,l,u),t.fillText(h,l,u);k!==0&&(t.rotate(-k),t.translate(-c,-d))}}};var ci={};ci.drawNode=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,i=this,s,l,u=e._private,c=u.rscratch,d=e.position();if(!(!ce(d.x)||!ce(d.y))&&!(o&&!e.visible())){var h=o?e.effectiveOpacity():1,p=i.usePaths(),g,f=!1,v=e.padding();s=e.width()+2*v,l=e.height()+2*v;var m;r&&(m=r,t.translate(-m.x1,-m.y1));for(var y=e.pstyle("background-image"),b=y.value,x=new Array(b.length),k=new Array(b.length),E=0,_=0;_<b.length;_++){var T=b[_],C=x[_]=T!=null&&T!=="none";if(C){var D=e.cy().style().getIndexedStyle(e,"background-image-crossorigin","value",_);E++,k[_]=i.getCachedImage(T,D,function(){u.backgroundTimestamp=Date.now(),e.emitAndNotify("background")})}}var L=e.pstyle("background-blacken").value,A=e.pstyle("border-width").pfValue,O=e.pstyle("background-opacity").value*h,I=e.pstyle("border-color").value,N=e.pstyle("border-style").value,z=e.pstyle("border-opacity").value*h;t.lineJoin="miter";var $=function(){var U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:O;i.eleFillStyle(t,e,U)},B=function(){var U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:z;i.colorStrokeStyle(t,I[0],I[1],I[2],U)},R=e.pstyle("shape").strValue,H=e.pstyle("shape-polygon-points").pfValue;if(p){t.translate(d.x,d.y);var M=i.nodePathCache=i.nodePathCache||[],j=Rc(R==="polygon"?R+","+H.join(","):R,""+l,""+s),W=M[j];W!=null?(g=W,f=!0,c.pathCache=g):(g=new Path2D,M[j]=c.pathCache=g)}var te=function(){if(!f){var U=d;p&&(U={x:0,y:0}),i.nodeShapes[i.getNodeShape(e)].draw(g||t,U.x,U.y,s,l)}p?t.fill(g):t.fill()},X=function(){for(var U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h,P=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,V=u.backgrounding,G=0,K=0;K<k.length;K++){var Q=e.cy().style().getIndexedStyle(e,"background-image-containment","value",K);if(P&&Q==="over"||!P&&Q==="inside"){G++;continue}x[K]&&k[K].complete&&!k[K].error&&(G++,i.drawInscribedImage(t,k[K],e,K,U))}u.backgrounding=G!==E,V!==u.backgrounding&&e.updateStyle(!1)},Y=function(){var U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,P=arguments.length>1&&arguments[1]!==void 0?arguments[1]:h;i.hasPie(e)&&(i.drawPie(t,e,P),U&&(p||i.nodeShapes[i.getNodeShape(e)].draw(t,d.x,d.y,s,l)))},F=function(){var U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h,P=(L>0?L:-L)*U,V=L>0?0:255;L!==0&&(i.colorFillStyle(t,V,V,V,P),p?t.fill(g):t.fill())},Z=function(){if(A>0){if(t.lineWidth=A,t.lineCap="butt",t.setLineDash)switch(N){case"dotted":t.setLineDash([1,1]);break;case"dashed":t.setLineDash([4,2]);break;case"solid":case"double":t.setLineDash([]);break}if(p?t.stroke(g):t.stroke(),N==="double"){t.lineWidth=A/3;var U=t.globalCompositeOperation;t.globalCompositeOperation="destination-out",p?t.stroke(g):t.stroke(),t.globalCompositeOperation=U}t.setLineDash&&t.setLineDash([])}},se=function(){n&&i.drawNodeOverlay(t,e,d,s,l)},ie=function(){i.drawElementText(t,e,null,a)},pe=e.pstyle("ghost").value==="yes";if(pe){var De=e.pstyle("ghost-offset-x").pfValue,Te=e.pstyle("ghost-offset-y").pfValue,fe=e.pstyle("ghost-opacity").value,de=fe*h;t.translate(De,Te),$(fe*O),te(),X(de,!0),B(fe*z),Z(),Y(L!==0||A!==0),X(de,!1),F(de),t.translate(-De,-Te)}$(),te(),X(h,!0),B(),Z(),Y(L!==0||A!==0),X(h,!1),F(),p&&t.translate(-d.x,-d.y),ie(),se(),r&&t.translate(m.x1,m.y1)}};ci.drawNodeOverlay=function(t,e,r,a,n){var o=this;if(!!e.visible()){var i=e.pstyle("overlay-padding").pfValue,s=e.pstyle("overlay-opacity").value,l=e.pstyle("overlay-color").value;if(s>0){if(r=r||e.position(),a==null||n==null){var u=e.padding();a=e.width()+2*u,n=e.height()+2*u}o.colorFillStyle(t,l[0],l[1],l[2],s),o.nodeShapes.roundrectangle.draw(t,r.x,r.y,a+i*2,n+i*2),t.fill()}}};ci.hasPie=function(t){return t=t[0],t._private.hasPie};ci.drawPie=function(t,e,r,a){e=e[0],a=a||e.position();var n=e.cy().style(),o=e.pstyle("pie-size"),i=a.x,s=a.y,l=e.width(),u=e.height(),c=Math.min(l,u)/2,d=0,h=this.usePaths();h&&(i=0,s=0),o.units==="%"?c=c*o.pfValue:o.pfValue!==void 0&&(c=o.pfValue/2);for(var p=1;p<=n.pieBackgroundN;p++){var g=e.pstyle("pie-"+p+"-background-size").value,f=e.pstyle("pie-"+p+"-background-color").value,v=e.pstyle("pie-"+p+"-background-opacity").value*r,m=g/100;m+d>1&&(m=1-d);var y=1.5*Math.PI+2*Math.PI*d,b=2*Math.PI*m,x=y+b;g===0||d>=1||d+m>1||(t.beginPath(),t.moveTo(i,s),t.arc(i,s,c,y,x),t.closePath(),this.colorFillStyle(t,f[0],f[1],f[2],v),t.fill(),d+=m)}};var er={},k1=100;er.getPixelRatio=function(){var t=this.data.contexts[0];if(this.forcedPixelRatio!=null)return this.forcedPixelRatio;var e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e};er.paintCache=function(t){for(var e=this.paintCaches=this.paintCaches||[],r=!0,a,n=0;n<e.length;n++)if(a=e[n],a.context===t){r=!1;break}return r&&(a={context:t},e.push(a)),a};er.createGradientStyleFor=function(t,e,r,a,n){var o,i=this.usePaths(),s=r.pstyle(e+"-gradient-stop-colors").value,l=r.pstyle(e+"-gradient-stop-positions").pfValue;if(a==="radial-gradient")if(r.isEdge()){var u=r.sourceEndpoint(),c=r.targetEndpoint(),d=r.midpoint(),h=xa(u,d),p=xa(c,d);o=t.createRadialGradient(d.x,d.y,0,d.x,d.y,Math.max(h,p))}else{var g=i?{x:0,y:0}:r.position(),f=r.paddedWidth(),v=r.paddedHeight();o=t.createRadialGradient(g.x,g.y,0,g.x,g.y,Math.max(f,v))}else if(r.isEdge()){var m=r.sourceEndpoint(),y=r.targetEndpoint();o=t.createLinearGradient(m.x,m.y,y.x,y.y)}else{var b=i?{x:0,y:0}:r.position(),x=r.paddedWidth(),k=r.paddedHeight(),E=x/2,_=k/2,T=r.pstyle("background-gradient-direction").value;switch(T){case"to-bottom":o=t.createLinearGradient(b.x,b.y-_,b.x,b.y+_);break;case"to-top":o=t.createLinearGradient(b.x,b.y+_,b.x,b.y-_);break;case"to-left":o=t.createLinearGradient(b.x+E,b.y,b.x-E,b.y);break;case"to-right":o=t.createLinearGradient(b.x-E,b.y,b.x+E,b.y);break;case"to-bottom-right":case"to-right-bottom":o=t.createLinearGradient(b.x-E,b.y-_,b.x+E,b.y+_);break;case"to-top-right":case"to-right-top":o=t.createLinearGradient(b.x-E,b.y+_,b.x+E,b.y-_);break;case"to-bottom-left":case"to-left-bottom":o=t.createLinearGradient(b.x+E,b.y-_,b.x-E,b.y+_);break;case"to-top-left":case"to-left-top":o=t.createLinearGradient(b.x+E,b.y+_,b.x-E,b.y-_);break}}if(!o)return null;for(var C=l.length===s.length,D=s.length,L=0;L<D;L++)o.addColorStop(C?l[L]:L/(D-1),"rgba("+s[L][0]+","+s[L][1]+","+s[L][2]+","+n+")");return o};er.gradientFillStyle=function(t,e,r,a){var n=this.createGradientStyleFor(t,"background",e,r,a);if(!n)return null;t.fillStyle=n};er.colorFillStyle=function(t,e,r,a,n){t.fillStyle="rgba("+e+","+r+","+a+","+n+")"};er.eleFillStyle=function(t,e,r){var a=e.pstyle("background-fill").value;if(a==="linear-gradient"||a==="radial-gradient")this.gradientFillStyle(t,e,a,r);else{var n=e.pstyle("background-color").value;this.colorFillStyle(t,n[0],n[1],n[2],r)}};er.gradientStrokeStyle=function(t,e,r,a){var n=this.createGradientStyleFor(t,"line",e,r,a);if(!n)return null;t.strokeStyle=n};er.colorStrokeStyle=function(t,e,r,a,n){t.strokeStyle="rgba("+e+","+r+","+a+","+n+")"};er.eleStrokeStyle=function(t,e,r){var a=e.pstyle("line-fill").value;if(a==="linear-gradient"||a==="radial-gradient")this.gradientStrokeStyle(t,e,a,r);else{var n=e.pstyle("line-color").value;this.colorStrokeStyle(t,n[0],n[1],n[2],r)}};er.matchCanvasSize=function(t){var e=this,r=e.data,a=e.findContainerClientCoords(),n=a[2],o=a[3],i=e.getPixelRatio(),s=e.motionBlurPxRatio;(t===e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE]||t===e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG])&&(i=s);var l=n*i,u=o*i,c;if(!(l===e.canvasWidth&&u===e.canvasHeight)){e.fontCaches=null;var d=r.canvasContainer;d.style.width=n+"px",d.style.height=o+"px";for(var h=0;h<e.CANVAS_LAYERS;h++)c=r.canvases[h],c.width=l,c.height=u,c.style.width=n+"px",c.style.height=o+"px";for(var h=0;h<e.BUFFER_COUNT;h++)c=r.bufferCanvases[h],c.width=l,c.height=u,c.style.width=n+"px",c.style.height=o+"px";e.textureMult=1,i<=1&&(c=r.bufferCanvases[e.TEXTURE_BUFFER],e.textureMult=2,c.width=l*e.textureMult,c.height=u*e.textureMult),e.canvasWidth=l,e.canvasHeight=u}};er.renderTo=function(t,e,r,a){this.render({forcedContext:t,forcedZoom:e,forcedPan:r,drawAllLayers:!0,forcedPxRatio:a})};er.render=function(t){t=t||Hc();var e=t.forcedContext,r=t.drawAllLayers,a=t.drawOnlyNodeLayer,n=t.forcedZoom,o=t.forcedPan,i=this,s=t.forcedPxRatio===void 0?this.getPixelRatio():t.forcedPxRatio,l=i.cy,u=i.data,c=u.canvasNeedsRedraw,d=i.textureOnViewport&&!e&&(i.pinching||i.hoverData.dragging||i.swipePanning||i.data.wheelZooming),h=t.motionBlur!==void 0?t.motionBlur:i.motionBlur,p=i.motionBlurPxRatio,g=l.hasCompoundNodes(),f=i.hoverData.draggingEles,v=!!(i.hoverData.selecting||i.touchData.selecting);h=h&&!e&&i.motionBlurEnabled&&!v;var m=h;e||(i.prevPxRatio!==s&&(i.invalidateContainerClientCoordsCache(),i.matchCanvasSize(i.container),i.redrawHint("eles",!0),i.redrawHint("drag",!0)),i.prevPxRatio=s),!e&&i.motionBlurTimeout&&clearTimeout(i.motionBlurTimeout),h&&(i.mbFrames==null&&(i.mbFrames=0),i.mbFrames++,i.mbFrames<3&&(m=!1),i.mbFrames>i.minMbLowQualFrames&&(i.motionBlurPxRatio=i.mbPxRBlurry)),i.clearingMotionBlur&&(i.motionBlurPxRatio=1),i.textureDrawLastFrame&&!d&&(c[i.NODE]=!0,c[i.SELECT_BOX]=!0);var y=l.style(),b=l.zoom(),x=n!==void 0?n:b,k=l.pan(),E={x:k.x,y:k.y},_={zoom:b,pan:{x:k.x,y:k.y}},T=i.prevViewport,C=T===void 0||_.zoom!==T.zoom||_.pan.x!==T.pan.x||_.pan.y!==T.pan.y;!C&&!(f&&!g)&&(i.motionBlurPxRatio=1),o&&(E=o),x*=s,E.x*=s,E.y*=s;var D=i.getCachedZSortedEles();function L(fe,de,ye,U,P){var V=fe.globalCompositeOperation;fe.globalCompositeOperation="destination-out",i.colorFillStyle(fe,255,255,255,i.motionBlurTransparency),fe.fillRect(de,ye,U,P),fe.globalCompositeOperation=V}function A(fe,de){var ye,U,P,V;!i.clearingMotionBlur&&(fe===u.bufferContexts[i.MOTIONBLUR_BUFFER_NODE]||fe===u.bufferContexts[i.MOTIONBLUR_BUFFER_DRAG])?(ye={x:k.x*p,y:k.y*p},U=b*p,P=i.canvasWidth*p,V=i.canvasHeight*p):(ye=E,U=x,P=i.canvasWidth,V=i.canvasHeight),fe.setTransform(1,0,0,1,0,0),de==="motionBlur"?L(fe,0,0,P,V):!e&&(de===void 0||de)&&fe.clearRect(0,0,P,V),r||(fe.translate(ye.x,ye.y),fe.scale(U,U)),o&&fe.translate(o.x,o.y),n&&fe.scale(n,n)}if(d||(i.textureDrawLastFrame=!1),d){if(i.textureDrawLastFrame=!0,!i.textureCache){i.textureCache={},i.textureCache.bb=l.mutableElements().boundingBox(),i.textureCache.texture=i.data.bufferCanvases[i.TEXTURE_BUFFER];var O=i.data.bufferContexts[i.TEXTURE_BUFFER];O.setTransform(1,0,0,1,0,0),O.clearRect(0,0,i.canvasWidth*i.textureMult,i.canvasHeight*i.textureMult),i.render({forcedContext:O,drawOnlyNodeLayer:!0,forcedPxRatio:s*i.textureMult});var _=i.textureCache.viewport={zoom:l.zoom(),pan:l.pan(),width:i.canvasWidth,height:i.canvasHeight};_.mpan={x:(0-_.pan.x)/_.zoom,y:(0-_.pan.y)/_.zoom}}c[i.DRAG]=!1,c[i.NODE]=!1;var I=u.contexts[i.NODE],N=i.textureCache.texture,_=i.textureCache.viewport;I.setTransform(1,0,0,1,0,0),h?L(I,0,0,_.width,_.height):I.clearRect(0,0,_.width,_.height);var z=y.core("outside-texture-bg-color").value,$=y.core("outside-texture-bg-opacity").value;i.colorFillStyle(I,z[0],z[1],z[2],$),I.fillRect(0,0,_.width,_.height);var b=l.zoom();A(I,!1),I.clearRect(_.mpan.x,_.mpan.y,_.width/_.zoom/s,_.height/_.zoom/s),I.drawImage(N,_.mpan.x,_.mpan.y,_.width/_.zoom/s,_.height/_.zoom/s)}else i.textureOnViewport&&!e&&(i.textureCache=null);var B=l.extent(),R=i.pinching||i.hoverData.dragging||i.swipePanning||i.data.wheelZooming||i.hoverData.draggingEles||i.cy.animated(),H=i.hideEdgesOnViewport&&R,M=[];if(M[i.NODE]=!c[i.NODE]&&h&&!i.clearedForMotionBlur[i.NODE]||i.clearingMotionBlur,M[i.NODE]&&(i.clearedForMotionBlur[i.NODE]=!0),M[i.DRAG]=!c[i.DRAG]&&h&&!i.clearedForMotionBlur[i.DRAG]||i.clearingMotionBlur,M[i.DRAG]&&(i.clearedForMotionBlur[i.DRAG]=!0),c[i.NODE]||r||a||M[i.NODE]){var j=h&&!M[i.NODE]&&p!==1,I=e||(j?i.data.bufferContexts[i.MOTIONBLUR_BUFFER_NODE]:u.contexts[i.NODE]),W=h&&!j?"motionBlur":void 0;A(I,W),H?i.drawCachedNodes(I,D.nondrag,s,B):i.drawLayeredElements(I,D.nondrag,s,B),i.debug&&i.drawDebugPoints(I,D.nondrag),!r&&!h&&(c[i.NODE]=!1)}if(!a&&(c[i.DRAG]||r||M[i.DRAG])){var j=h&&!M[i.DRAG]&&p!==1,I=e||(j?i.data.bufferContexts[i.MOTIONBLUR_BUFFER_DRAG]:u.contexts[i.DRAG]);A(I,h&&!j?"motionBlur":void 0),H?i.drawCachedNodes(I,D.drag,s,B):i.drawCachedElements(I,D.drag,s,B),i.debug&&i.drawDebugPoints(I,D.drag),!r&&!h&&(c[i.DRAG]=!1)}if(i.showFps||!a&&c[i.SELECT_BOX]&&!r){var I=e||u.contexts[i.SELECT_BOX];if(A(I),i.selection[4]==1&&(i.hoverData.selecting||i.touchData.selecting)){var b=i.cy.zoom(),te=y.core("selection-box-border-width").value/b;I.lineWidth=te,I.fillStyle="rgba("+y.core("selection-box-color").value[0]+","+y.core("selection-box-color").value[1]+","+y.core("selection-box-color").value[2]+","+y.core("selection-box-opacity").value+")",I.fillRect(i.selection[0],i.selection[1],i.selection[2]-i.selection[0],i.selection[3]-i.selection[1]),te>0&&(I.strokeStyle="rgba("+y.core("selection-box-border-color").value[0]+","+y.core("selection-box-border-color").value[1]+","+y.core("selection-box-border-color").value[2]+","+y.core("selection-box-opacity").value+")",I.strokeRect(i.selection[0],i.selection[1],i.selection[2]-i.selection[0],i.selection[3]-i.selection[1]))}if(u.bgActivePosistion&&!i.hoverData.selecting){var b=i.cy.zoom(),X=u.bgActivePosistion;I.fillStyle="rgba("+y.core("active-bg-color").value[0]+","+y.core("active-bg-color").value[1]+","+y.core("active-bg-color").value[2]+","+y.core("active-bg-opacity").value+")",I.beginPath(),I.arc(X.x,X.y,y.core("active-bg-size").pfValue/b,0,2*Math.PI),I.fill()}var Y=i.lastRedrawTime;if(i.showFps&&Y){Y=Math.round(Y);var F=Math.round(1e3/Y);I.setTransform(1,0,0,1,0,0),I.fillStyle="rgba(255, 0, 0, 0.75)",I.strokeStyle="rgba(255, 0, 0, 0.75)",I.lineWidth=1,I.fillText("1 frame = "+Y+" ms = "+F+" fps",0,20);var Z=60;I.strokeRect(0,30,250,20),I.fillRect(0,30,250*Math.min(F/Z,1),20)}r||(c[i.SELECT_BOX]=!1)}if(h&&p!==1){var se=u.contexts[i.NODE],ie=i.data.bufferCanvases[i.MOTIONBLUR_BUFFER_NODE],pe=u.contexts[i.DRAG],De=i.data.bufferCanvases[i.MOTIONBLUR_BUFFER_DRAG],Te=function(de,ye,U){de.setTransform(1,0,0,1,0,0),U||!m?de.clearRect(0,0,i.canvasWidth,i.canvasHeight):L(de,0,0,i.canvasWidth,i.canvasHeight);var P=p;de.drawImage(ye,0,0,i.canvasWidth*P,i.canvasHeight*P,0,0,i.canvasWidth,i.canvasHeight)};(c[i.NODE]||M[i.NODE])&&(Te(se,ie,M[i.NODE]),c[i.NODE]=!1),(c[i.DRAG]||M[i.DRAG])&&(Te(pe,De,M[i.DRAG]),c[i.DRAG]=!1)}i.prevViewport=_,i.clearingMotionBlur&&(i.clearingMotionBlur=!1,i.motionBlurCleared=!0,i.motionBlur=!0),h&&(i.motionBlurTimeout=setTimeout(function(){i.motionBlurTimeout=null,i.clearedForMotionBlur[i.NODE]=!1,i.clearedForMotionBlur[i.DRAG]=!1,i.motionBlur=!1,i.clearingMotionBlur=!d,i.mbFrames=0,c[i.NODE]=!0,c[i.DRAG]=!0,i.redraw()},k1)),e||l.emit("render")};var ua={};ua.drawPolygonPath=function(t,e,r,a,n,o){var i=a/2,s=n/2;t.beginPath&&t.beginPath(),t.moveTo(e+i*o[0],r+s*o[1]);for(var l=1;l<o.length/2;l++)t.lineTo(e+i*o[l*2],r+s*o[l*2+1]);t.closePath()};ua.drawRoundPolygonPath=function(t,e,r,a,n,o){var i=a/2,s=n/2,l=zs(a,n);t.beginPath&&t.beginPath();for(var u=0;u<o.length/4;u++){var c=void 0,d=void 0;u===0?c=o.length-2:c=u*4-2,d=u*4+2;var h=e+i*o[u*4],p=r+s*o[u*4+1],g=-o[c]*o[d]-o[c+1]*o[d+1],f=l/Math.tan(Math.acos(g)/2),v=h-f*o[c],m=p-f*o[c+1],y=h+f*o[d],b=p+f*o[d+1];u===0?t.moveTo(v,m):t.lineTo(v,m),t.arcTo(h,p,y,b,l)}t.closePath()};ua.drawRoundRectanglePath=function(t,e,r,a,n){var o=a/2,i=n/2,s=Xn(a,n);t.beginPath&&t.beginPath(),t.moveTo(e,r-i),t.arcTo(e+o,r-i,e+o,r,s),t.arcTo(e+o,r+i,e,r+i,s),t.arcTo(e-o,r+i,e-o,r,s),t.arcTo(e-o,r-i,e,r-i,s),t.lineTo(e,r-i),t.closePath()};ua.drawBottomRoundRectanglePath=function(t,e,r,a,n){var o=a/2,i=n/2,s=Xn(a,n);t.beginPath&&t.beginPath(),t.moveTo(e,r-i),t.lineTo(e+o,r-i),t.lineTo(e+o,r),t.arcTo(e+o,r+i,e,r+i,s),t.arcTo(e-o,r+i,e-o,r,s),t.lineTo(e-o,r-i),t.lineTo(e,r-i),t.closePath()};ua.drawCutRectanglePath=function(t,e,r,a,n){var o=a/2,i=n/2,s=ed();t.beginPath&&t.beginPath(),t.moveTo(e-o+s,r-i),t.lineTo(e+o-s,r-i),t.lineTo(e+o,r-i+s),t.lineTo(e+o,r+i-s),t.lineTo(e+o-s,r+i),t.lineTo(e-o+s,r+i),t.lineTo(e-o,r+i-s),t.lineTo(e-o,r-i+s),t.closePath()};ua.drawBarrelPath=function(t,e,r,a,n){var o=a/2,i=n/2,s=e-o,l=e+o,u=r-i,c=r+i,d=Ms(a,n),h=d.widthOffset,p=d.heightOffset,g=d.ctrlPtOffsetPct*h;t.beginPath&&t.beginPath(),t.moveTo(s,u+p),t.lineTo(s,c-p),t.quadraticCurveTo(s+g,c,s+h,c),t.lineTo(l-h,c),t.quadraticCurveTo(l-g,c,l,c-p),t.lineTo(l,u+p),t.quadraticCurveTo(l-g,u,l-h,u),t.lineTo(s+h,u),t.quadraticCurveTo(s+g,u,s,u+p),t.closePath()};var Mh=Math.sin(0),Rh=Math.cos(0),ll={},ul={},Fh=Math.PI/40;for(Aa=0*Math.PI;Aa<2*Math.PI;Aa+=Fh)ll[Aa]=Math.sin(Aa),ul[Aa]=Math.cos(Aa);var Aa;ua.drawEllipsePath=function(t,e,r,a,n){if(t.beginPath&&t.beginPath(),t.ellipse)t.ellipse(e,r,a/2,n/2,0,0,2*Math.PI);else for(var o,i,s=a/2,l=n/2,u=0*Math.PI;u<2*Math.PI;u+=Fh)o=e-s*ll[u]*Mh+s*ul[u]*Rh,i=r+l*ul[u]*Mh+l*ll[u]*Rh,u===0?t.moveTo(o,i):t.lineTo(o,i);t.closePath()};var di={};di.createBuffer=function(t,e){var r=document.createElement("canvas");return r.width=t,r.height=e,[r,r.getContext("2d")]};di.bufferCanvasImage=function(t){var e=this.cy,r=e.mutableElements(),a=r.boundingBox(),n=this.findContainerClientCoords(),o=t.full?Math.ceil(a.w):n[2],i=t.full?Math.ceil(a.h):n[3],s=ce(t.maxWidth)||ce(t.maxHeight),l=this.getPixelRatio(),u=1;if(t.scale!==void 0)o*=t.scale,i*=t.scale,u=t.scale;else if(s){var c=1/0,d=1/0;ce(t.maxWidth)&&(c=u*t.maxWidth/o),ce(t.maxHeight)&&(d=u*t.maxHeight/i),u=Math.min(c,d),o*=u,i*=u}s||(o*=l,i*=l,u*=l);var h=document.createElement("canvas");h.width=o,h.height=i,h.style.width=o+"px",h.style.height=i+"px";var p=h.getContext("2d");if(o>0&&i>0){p.clearRect(0,0,o,i),p.globalCompositeOperation="source-over";var g=this.getCachedZSortedEles();if(t.full)p.translate(-a.x1*u,-a.y1*u),p.scale(u,u),this.drawElements(p,g),p.scale(1/u,1/u),p.translate(a.x1*u,a.y1*u);else{var f=e.pan(),v={x:f.x*u,y:f.y*u};u*=e.zoom(),p.translate(v.x,v.y),p.scale(u,u),this.drawElements(p,g),p.scale(1/u,1/u),p.translate(-v.x,-v.y)}t.bg&&(p.globalCompositeOperation="destination-over",p.fillStyle=t.bg,p.rect(0,0,o,i),p.fill())}return h};function _1(t,e){for(var r=atob(t),a=new ArrayBuffer(r.length),n=new Uint8Array(a),o=0;o<r.length;o++)n[o]=r.charCodeAt(o);return new Blob([a],{type:e})}function Nh(t){var e=t.indexOf(",");return t.substr(e+1)}function Vh(t,e,r){var a=function(){return e.toDataURL(r,t.quality)};switch(t.output){case"blob-promise":return new ln(function(n,o){try{e.toBlob(function(i){i!=null?n(i):o(new Error("`canvas.toBlob()` sent a null value in its callback"))},r,t.quality)}catch(i){o(i)}});case"blob":return _1(Nh(a()),r);case"base64":return Nh(a());case"base64uri":default:return a()}}di.png=function(t){return Vh(t,this.bufferCanvasImage(t),"image/png")};di.jpg=function(t){return Vh(t,this.bufferCanvasImage(t),"image/jpeg")};var jh={};jh.nodeShapeImpl=function(t,e,r,a,n,o,i){switch(t){case"ellipse":return this.drawEllipsePath(e,r,a,n,o);case"polygon":return this.drawPolygonPath(e,r,a,n,o,i);case"round-polygon":return this.drawRoundPolygonPath(e,r,a,n,o,i);case"roundrectangle":case"round-rectangle":return this.drawRoundRectanglePath(e,r,a,n,o);case"cutrectangle":case"cut-rectangle":return this.drawCutRectanglePath(e,r,a,n,o);case"bottomroundrectangle":case"bottom-round-rectangle":return this.drawBottomRoundRectanglePath(e,r,a,n,o);case"barrel":return this.drawBarrelPath(e,r,a,n,o)}};var C1=Kh,Me=Kh.prototype;Me.CANVAS_LAYERS=3;Me.SELECT_BOX=0;Me.DRAG=1;Me.NODE=2;Me.BUFFER_COUNT=3;Me.TEXTURE_BUFFER=0;Me.MOTIONBLUR_BUFFER_NODE=1;Me.MOTIONBLUR_BUFFER_DRAG=2;function Kh(t){var e=this;e.data={canvases:new Array(Me.CANVAS_LAYERS),contexts:new Array(Me.CANVAS_LAYERS),canvasNeedsRedraw:new Array(Me.CANVAS_LAYERS),bufferCanvases:new Array(Me.BUFFER_COUNT),bufferContexts:new Array(Me.CANVAS_LAYERS)};var r="-webkit-tap-highlight-color",a="rgba(0,0,0,0)";e.data.canvasContainer=document.createElement("div");var n=e.data.canvasContainer.style;e.data.canvasContainer.style[r]=a,n.position="relative",n.zIndex="0",n.overflow="hidden";var o=t.cy.container();o.appendChild(e.data.canvasContainer),o.style[r]=a;var i={"-webkit-user-select":"none","-moz-user-select":"-moz-none","user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)","outline-style":"none"};sm()&&(i["-ms-touch-action"]="none",i["touch-action"]="none");for(var s=0;s<Me.CANVAS_LAYERS;s++){var l=e.data.canvases[s]=document.createElement("canvas");e.data.contexts[s]=l.getContext("2d"),Object.keys(i).forEach(function(Y){l.style[Y]=i[Y]}),l.style.position="absolute",l.setAttribute("data-id","layer"+s),l.style.zIndex=String(Me.CANVAS_LAYERS-s),e.data.canvasContainer.appendChild(l),e.data.canvasNeedsRedraw[s]=!1}e.data.topCanvas=e.data.canvases[0],e.data.canvases[Me.NODE].setAttribute("data-id","layer"+Me.NODE+"-node"),e.data.canvases[Me.SELECT_BOX].setAttribute("data-id","layer"+Me.SELECT_BOX+"-selectbox"),e.data.canvases[Me.DRAG].setAttribute("data-id","layer"+Me.DRAG+"-drag");for(var s=0;s<Me.BUFFER_COUNT;s++)e.data.bufferCanvases[s]=document.createElement("canvas"),e.data.bufferContexts[s]=e.data.bufferCanvases[s].getContext("2d"),e.data.bufferCanvases[s].style.position="absolute",e.data.bufferCanvases[s].setAttribute("data-id","buffer"+s),e.data.bufferCanvases[s].style.zIndex=String(-s-1),e.data.bufferCanvases[s].style.visibility="hidden";e.pathsEnabled=!0;var u=Qt(),c=function(F){return{x:(F.x1+F.x2)/2,y:(F.y1+F.y2)/2}},d=function(F){return{x:-F.w/2,y:-F.h/2}},h=function(F){var Z=F[0]._private,se=Z.oldBackgroundTimestamp===Z.backgroundTimestamp;return!se},p=function(F){return F[0]._private.nodeKey},g=function(F){return F[0]._private.labelStyleKey},f=function(F){return F[0]._private.sourceLabelStyleKey},v=function(F){return F[0]._private.targetLabelStyleKey},m=function(F,Z,se,ie,pe){return e.drawElement(F,Z,se,!1,!1,pe)},y=function(F,Z,se,ie,pe){return e.drawElementText(F,Z,se,ie,"main",pe)},b=function(F,Z,se,ie,pe){return e.drawElementText(F,Z,se,ie,"source",pe)},x=function(F,Z,se,ie,pe){return e.drawElementText(F,Z,se,ie,"target",pe)},k=function(F){return F.boundingBox(),F[0]._private.bodyBounds},E=function(F){return F.boundingBox(),F[0]._private.labelBounds.main||u},_=function(F){return F.boundingBox(),F[0]._private.labelBounds.source||u},T=function(F){return F.boundingBox(),F[0]._private.labelBounds.target||u},C=function(F,Z){return Z},D=function(F){return c(k(F))},L=function(F,Z,se){var ie=F?F+"-":"";return{x:Z.x+se.pstyle(ie+"text-margin-x").pfValue,y:Z.y+se.pstyle(ie+"text-margin-y").pfValue}},A=function(F,Z,se){var ie=F[0]._private.rscratch;return{x:ie[Z],y:ie[se]}},O=function(F){return L("",A(F,"labelX","labelY"),F)},I=function(F){return L("source",A(F,"sourceLabelX","sourceLabelY"),F)},N=function(F){return L("target",A(F,"targetLabelX","targetLabelY"),F)},z=function(F){return d(k(F))},$=function(F){return d(_(F))},B=function(F){return d(T(F))},R=function(F){var Z=E(F),se=d(E(F));if(F.isNode()){switch(F.pstyle("text-halign").value){case"left":se.x=-Z.w;break;case"right":se.x=0;break}switch(F.pstyle("text-valign").value){case"top":se.y=-Z.h;break;case"bottom":se.y=0;break}}return se},H=e.data.eleTxrCache=new li(e,{getKey:p,doesEleInvalidateKey:h,drawElement:m,getBoundingBox:k,getRotationPoint:D,getRotationOffset:z,allowEdgeTxrCaching:!1,allowParentTxrCaching:!1}),M=e.data.lblTxrCache=new li(e,{getKey:g,drawElement:y,getBoundingBox:E,getRotationPoint:O,getRotationOffset:R,isVisible:C}),j=e.data.slbTxrCache=new li(e,{getKey:f,drawElement:b,getBoundingBox:_,getRotationPoint:I,getRotationOffset:$,isVisible:C}),W=e.data.tlbTxrCache=new li(e,{getKey:v,drawElement:x,getBoundingBox:T,getRotationPoint:N,getRotationOffset:B,isVisible:C}),te=e.data.lyrTxrCache=new Ih(e);e.onUpdateEleCalcs(function(F,Z){H.invalidateElements(Z),M.invalidateElements(Z),j.invalidateElements(Z),W.invalidateElements(Z),te.invalidateElements(Z);for(var se=0;se<Z.length;se++){var ie=Z[se]._private;ie.oldBackgroundTimestamp=ie.backgroundTimestamp}});var X=function(F){for(var Z=0;Z<F.length;Z++)te.enqueueElementRefinement(F[Z].ele)};H.onDequeue(X),M.onDequeue(X),j.onDequeue(X),W.onDequeue(X)}Me.redrawHint=function(t,e){var r=this;switch(t){case"eles":r.data.canvasNeedsRedraw[Me.NODE]=e;break;case"drag":r.data.canvasNeedsRedraw[Me.DRAG]=e;break;case"select":r.data.canvasNeedsRedraw[Me.SELECT_BOX]=e;break}};var E1=typeof Path2D!="undefined";Me.path2dEnabled=function(t){if(t===void 0)return this.pathsEnabled;this.pathsEnabled=!!t};Me.usePaths=function(){return E1&&this.pathsEnabled};Me.setImgSmoothing=function(t,e){t.imageSmoothingEnabled!=null?t.imageSmoothingEnabled=e:(t.webkitImageSmoothingEnabled=e,t.mozImageSmoothingEnabled=e,t.msImageSmoothingEnabled=e)};Me.getImgSmoothing=function(t){return t.imageSmoothingEnabled!=null?t.imageSmoothingEnabled:t.webkitImageSmoothingEnabled||t.mozImageSmoothingEnabled||t.msImageSmoothingEnabled};Me.makeOffscreenCanvas=function(t,e){var r;return(typeof OffscreenCanvas=="undefined"?"undefined":ct(OffscreenCanvas))!=="undefined"?r=new OffscreenCanvas(t,e):(r=document.createElement("canvas"),r.width=t,r.height=e),r};[$h,Mr,Da,sl,Pa,ci,er,ua,di,jh].forEach(function(t){ke(Me,t)});var S1=[{name:"null",impl:gh},{name:"base",impl:Dh},{name:"canvas",impl:C1}],T1=[{type:"layout",extensions:$b},{type:"renderer",extensions:S1}],Hh={},Qh={};function Yh(t,e,r){var a=r,n=function(T){Ke("Can not register `"+e+"` for `"+t+"` since `"+T+"` already exists in the prototype and can not be overridden")};if(t==="core"){if(ii.prototype[e])return n(e);ii.prototype[e]=r}else if(t==="collection"){if(Et.prototype[e])return n(e);Et.prototype[e]=r}else if(t==="layout"){for(var o=function(T){this.options=T,r.call(this,T),Oe(this._private)||(this._private={}),this._private.cy=T.cy,this._private.listeners=[],this.createEmitter()},i=o.prototype=Object.create(r.prototype),s=[],l=0;l<s.length;l++){var u=s[l];i[u]=i[u]||function(){return this}}i.start&&!i.run?i.run=function(){return this.start(),this}:!i.start&&i.run&&(i.start=function(){return this.run(),this});var c=r.prototype.stop;i.stop=function(){var _=this.options;if(_&&_.animate){var T=this.animations;if(T)for(var C=0;C<T.length;C++)T[C].stop()}return c?c.call(this):this.emit("layoutstop"),this},i.destroy||(i.destroy=function(){return this}),i.cy=function(){return this._private.cy};var d=function(T){return T._private.cy},h={addEventFields:function(T,C){C.layout=T,C.cy=d(T),C.target=T},bubble:function(){return!0},parent:function(T){return d(T)}};ke(i,{createEmitter:function(){return this._private.emitter=new vo(h,this),this},emitter:function(){return this._private.emitter},on:function(T,C){return this.emitter().on(T,C),this},one:function(T,C){return this.emitter().one(T,C),this},once:function(T,C){return this.emitter().one(T,C),this},removeListener:function(T,C){return this.emitter().removeListener(T,C),this},removeAllListeners:function(){return this.emitter().removeAllListeners(),this},emit:function(T,C){return this.emitter().emit(T,C),this}}),Ve.eventAliasesOn(i),a=o}else if(t==="renderer"&&e!=="null"&&e!=="base"){var p=Xh("renderer","base"),g=p.prototype,f=r,v=r.prototype,m=function(){p.apply(this,arguments),f.apply(this,arguments)},y=m.prototype;for(var b in g){var x=g[b],k=v[b]!=null;if(k)return n(b);y[b]=x}for(var E in v)y[E]=v[E];g.clientFunctions.forEach(function(_){y[_]=y[_]||function(){st("Renderer does not implement `renderer."+_+"()` on its prototype")}}),a=m}return Oc({map:Hh,keys:[t,e],value:a})}function Xh(t,e){return $c({map:Hh,keys:[t,e]})}function D1(t,e,r,a,n){return Oc({map:Qh,keys:[t,e,r,a],value:n})}function P1(t,e,r,a){return $c({map:Qh,keys:[t,e,r,a]})}var cl=function(){if(arguments.length===2)return Xh.apply(null,arguments);if(arguments.length===3)return Yh.apply(null,arguments);if(arguments.length===4)return P1.apply(null,arguments);if(arguments.length===5)return D1.apply(null,arguments);st("Invalid extension access syntax")};ii.prototype.extension=cl;T1.forEach(function(t){t.extensions.forEach(function(e){Yh(t.type,e.name,e.impl)})});var Uh=function t(){if(!(this instanceof t))return new t;this.length=0},La=Uh.prototype;La.instanceString=function(){return"stylesheet"};La.selector=function(t){var e=this.length++;return this[e]={selector:t,properties:[]},this};La.css=function(t,e){var r=this.length-1;if(we(t))this[r].properties.push({name:t,value:e});else if(Oe(t))for(var a=t,n=Object.keys(a),o=0;o<n.length;o++){var i=n[o],s=a[i];if(s!=null){var l=Lt.properties[i]||Lt.properties[Gi(i)];if(l!=null){var u=l.name,c=s;this[r].properties.push({name:u,value:c})}}}return this};La.style=La.css;La.generateStyle=function(t){var e=new Lt(t);return this.appendToStyle(e)};La.appendToStyle=function(t){for(var e=0;e<this.length;e++){var r=this[e],a=r.selector,n=r.properties;t.selector(a);for(var o=0;o<n.length;o++){var i=n[o];t.css(i.name,i.value)}}return t};var A1="3.19.1",Ia=function(e){if(e===void 0&&(e={}),Oe(e))return new ii(e);if(we(e))return cl.apply(cl,arguments)};Ia.use=function(t){var e=Array.prototype.slice.call(arguments,1);return e.unshift(Ia),t.apply(null,e),this};Ia.warnings=function(t){return jc(t)};Ia.version=A1;Ia.stylesheet=Ia.Stylesheet=Uh;qh.exports=Ia});var rf=kn((ef,tf)=>{(function(){var t=function(e){var r=new t.Builder;return r.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),r.searchPipeline.add(t.stemmer),e.call(r,r),r.build()};t.version="2.3.9";t.utils={},t.utils.warn=function(e){return function(r){e.console&&console.warn&&console.warn(r)}}(this),t.utils.asString=function(e){return e==null?"":e.toString()},t.utils.clone=function(e){if(e==null)return e;for(var r=Object.create(null),a=Object.keys(e),n=0;n<a.length;n++){var o=a[n],i=e[o];if(Array.isArray(i)){r[o]=i.slice();continue}if(typeof i=="string"||typeof i=="number"||typeof i=="boolean"){r[o]=i;continue}throw new TypeError("clone is not deep and does not support nested objects")}return r},t.FieldRef=function(e,r,a){this.docRef=e,this.fieldName=r,this._stringValue=a},t.FieldRef.joiner="/",t.FieldRef.fromString=function(e){var r=e.indexOf(t.FieldRef.joiner);if(r===-1)throw"malformed field ref string";var a=e.slice(0,r),n=e.slice(r+1);return new t.FieldRef(n,a,e)},t.FieldRef.prototype.toString=function(){return this._stringValue==null&&(this._stringValue=this.fieldName+t.FieldRef.joiner+this.docRef),this._stringValue};t.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var r=0;r<this.length;r++)this.elements[e[r]]=!0}else this.length=0},t.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},t.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},t.Set.prototype.contains=function(e){return!!this.elements[e]},t.Set.prototype.intersect=function(e){var r,a,n,o=[];if(e===t.Set.complete)return this;if(e===t.Set.empty)return e;this.length<e.length?(r=this,a=e):(r=e,a=this),n=Object.keys(r.elements);for(var i=0;i<n.length;i++){var s=n[i];s in a.elements&&o.push(s)}return new t.Set(o)},t.Set.prototype.union=function(e){return e===t.Set.complete?t.Set.complete:e===t.Set.empty?this:new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},t.idf=function(e,r){var a=0;for(var n in e)n!="_index"&&(a+=Object.keys(e[n]).length);var o=(r-a+.5)/(a+.5);return Math.log(1+Math.abs(o))},t.Token=function(e,r){this.str=e||"",this.metadata=r||{}},t.Token.prototype.toString=function(){return this.str},t.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},t.Token.prototype.clone=function(e){return e=e||function(r){return r},new t.Token(e(this.str,this.metadata),this.metadata)};t.tokenizer=function(e,r){if(e==null||e==null)return[];if(Array.isArray(e))return e.map(function(d){return new t.Token(t.utils.asString(d).toLowerCase(),t.utils.clone(r))});for(var a=e.toString().toLowerCase(),n=a.length,o=[],i=0,s=0;i<=n;i++){var l=a.charAt(i),u=i-s;if(l.match(t.tokenizer.separator)||i==n){if(u>0){var c=t.utils.clone(r)||{};c.position=[s,u],c.index=o.length,o.push(new t.Token(a.slice(s,i),c))}s=i+1}}return o},t.tokenizer.separator=/[\s\-]+/;t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions=Object.create(null),t.Pipeline.registerFunction=function(e,r){r in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+r),e.label=r,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var r=e.label&&e.label in this.registeredFunctions;r||t.utils.warn(`Function is not registered with pipeline. This may cause problems when serialising the index.
`,e)},t.Pipeline.load=function(e){var r=new t.Pipeline;return e.forEach(function(a){var n=t.Pipeline.registeredFunctions[a];if(n)r.add(n);else throw new Error("Cannot load unregistered function: "+a)}),r},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(r){t.Pipeline.warnIfFunctionNotRegistered(r),this._stack.push(r)},this)},t.Pipeline.prototype.after=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var a=this._stack.indexOf(e);if(a==-1)throw new Error("Cannot find existingFn");a=a+1,this._stack.splice(a,0,r)},t.Pipeline.prototype.before=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var a=this._stack.indexOf(e);if(a==-1)throw new Error("Cannot find existingFn");this._stack.splice(a,0,r)},t.Pipeline.prototype.remove=function(e){var r=this._stack.indexOf(e);r!=-1&&this._stack.splice(r,1)},t.Pipeline.prototype.run=function(e){for(var r=this._stack.length,a=0;a<r;a++){for(var n=this._stack[a],o=[],i=0;i<e.length;i++){var s=n(e[i],i,e);if(!(s==null||s===""))if(Array.isArray(s))for(var l=0;l<s.length;l++)o.push(s[l]);else o.push(s)}e=o}return e},t.Pipeline.prototype.runString=function(e,r){var a=new t.Token(e,r);return this.run([a]).map(function(n){return n.toString()})},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})};t.Vector=function(e){this._magnitude=0,this.elements=e||[]},t.Vector.prototype.positionForIndex=function(e){if(this.elements.length==0)return 0;for(var r=0,a=this.elements.length/2,n=a-r,o=Math.floor(n/2),i=this.elements[o*2];n>1&&(i<e&&(r=o),i>e&&(a=o),i!=e);)n=a-r,o=r+Math.floor(n/2),i=this.elements[o*2];if(i==e||i>e)return o*2;if(i<e)return(o+1)*2},t.Vector.prototype.insert=function(e,r){this.upsert(e,r,function(){throw"duplicate index"})},t.Vector.prototype.upsert=function(e,r,a){this._magnitude=0;var n=this.positionForIndex(e);this.elements[n]==e?this.elements[n+1]=a(this.elements[n+1],r):this.elements.splice(n,0,e,r)},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,r=this.elements.length,a=1;a<r;a+=2){var n=this.elements[a];e+=n*n}return this._magnitude=Math.sqrt(e)},t.Vector.prototype.dot=function(e){for(var r=0,a=this.elements,n=e.elements,o=a.length,i=n.length,s=0,l=0,u=0,c=0;u<o&&c<i;)s=a[u],l=n[c],s<l?u+=2:s>l?c+=2:s==l&&(r+=a[u+1]*n[c+1],u+=2,c+=2);return r},t.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},t.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),r=1,a=0;r<this.elements.length;r+=2,a++)e[a]=this.elements[r];return e},t.Vector.prototype.toJSON=function(){return this.elements};t.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},a="[^aeiou]",n="[aeiouy]",o=a+"[^aeiouy]*",i=n+"[aeiou]*",s="^("+o+")?"+i+o,l="^("+o+")?"+i+o+"("+i+")?$",u="^("+o+")?"+i+o+i+o,c="^("+o+")?"+n,d=new RegExp(s),h=new RegExp(u),p=new RegExp(l),g=new RegExp(c),f=/^(.+?)(ss|i)es$/,v=/^(.+?)([^s])s$/,m=/^(.+?)eed$/,y=/^(.+?)(ed|ing)$/,b=/.$/,x=/(at|bl|iz)$/,k=new RegExp("([^aeiouylsz])\\1$"),E=new RegExp("^"+o+n+"[^aeiouwxy]$"),_=/^(.+?[^aeiou])y$/,T=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,C=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,D=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,L=/^(.+?)(s|t)(ion)$/,A=/^(.+?)e$/,O=/ll$/,I=new RegExp("^"+o+n+"[^aeiouwxy]$"),N=function($){var B,R,H,M,j,W,te;if($.length<3)return $;if(H=$.substr(0,1),H=="y"&&($=H.toUpperCase()+$.substr(1)),M=f,j=v,M.test($)?$=$.replace(M,"$1$2"):j.test($)&&($=$.replace(j,"$1$2")),M=m,j=y,M.test($)){var X=M.exec($);M=d,M.test(X[1])&&(M=b,$=$.replace(M,""))}else if(j.test($)){var X=j.exec($);B=X[1],j=g,j.test(B)&&($=B,j=x,W=k,te=E,j.test($)?$=$+"e":W.test($)?(M=b,$=$.replace(M,"")):te.test($)&&($=$+"e"))}if(M=_,M.test($)){var X=M.exec($);B=X[1],$=B+"i"}if(M=T,M.test($)){var X=M.exec($);B=X[1],R=X[2],M=d,M.test(B)&&($=B+e[R])}if(M=C,M.test($)){var X=M.exec($);B=X[1],R=X[2],M=d,M.test(B)&&($=B+r[R])}if(M=D,j=L,M.test($)){var X=M.exec($);B=X[1],M=h,M.test(B)&&($=B)}else if(j.test($)){var X=j.exec($);B=X[1]+X[2],j=h,j.test(B)&&($=B)}if(M=A,M.test($)){var X=M.exec($);B=X[1],M=h,j=p,W=I,(M.test(B)||j.test(B)&&!W.test(B))&&($=B)}return M=O,j=h,M.test($)&&j.test($)&&(M=b,$=$.replace(M,"")),H=="y"&&($=H.toLowerCase()+$.substr(1)),$};return function(z){return z.update(N)}}(),t.Pipeline.registerFunction(t.stemmer,"stemmer");t.generateStopWordFilter=function(e){var r=e.reduce(function(a,n){return a[n]=n,a},{});return function(a){if(a&&r[a.toString()]!==a.toString())return a}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter");t.trimmer=function(e){return e.update(function(r){return r.replace(/^\W+/,"").replace(/\W+$/,"")})},t.Pipeline.registerFunction(t.trimmer,"trimmer");t.TokenSet=function(){this.final=!1,this.edges={},this.id=t.TokenSet._nextId,t.TokenSet._nextId+=1},t.TokenSet._nextId=1,t.TokenSet.fromArray=function(e){for(var r=new t.TokenSet.Builder,a=0,n=e.length;a<n;a++)r.insert(e[a]);return r.finish(),r.root},t.TokenSet.fromClause=function(e){return"editDistance"in e?t.TokenSet.fromFuzzyString(e.term,e.editDistance):t.TokenSet.fromString(e.term)},t.TokenSet.fromFuzzyString=function(e,r){for(var a=new t.TokenSet,n=[{node:a,editsRemaining:r,str:e}];n.length;){var o=n.pop();if(o.str.length>0){var i=o.str.charAt(0),s;i in o.node.edges?s=o.node.edges[i]:(s=new t.TokenSet,o.node.edges[i]=s),o.str.length==1&&(s.final=!0),n.push({node:s,editsRemaining:o.editsRemaining,str:o.str.slice(1)})}if(o.editsRemaining!=0){if("*"in o.node.edges)var l=o.node.edges["*"];else{var l=new t.TokenSet;o.node.edges["*"]=l}if(o.str.length==0&&(l.final=!0),n.push({node:l,editsRemaining:o.editsRemaining-1,str:o.str}),o.str.length>1&&n.push({node:o.node,editsRemaining:o.editsRemaining-1,str:o.str.slice(1)}),o.str.length==1&&(o.node.final=!0),o.str.length>=1){if("*"in o.node.edges)var u=o.node.edges["*"];else{var u=new t.TokenSet;o.node.edges["*"]=u}o.str.length==1&&(u.final=!0),n.push({node:u,editsRemaining:o.editsRemaining-1,str:o.str.slice(1)})}if(o.str.length>1){var c=o.str.charAt(0),d=o.str.charAt(1),h;d in o.node.edges?h=o.node.edges[d]:(h=new t.TokenSet,o.node.edges[d]=h),o.str.length==1&&(h.final=!0),n.push({node:h,editsRemaining:o.editsRemaining-1,str:c+o.str.slice(2)})}}}return a},t.TokenSet.fromString=function(e){for(var r=new t.TokenSet,a=r,n=0,o=e.length;n<o;n++){var i=e[n],s=n==o-1;if(i=="*")r.edges[i]=r,r.final=s;else{var l=new t.TokenSet;l.final=s,r.edges[i]=l,r=l}}return a},t.TokenSet.prototype.toArray=function(){for(var e=[],r=[{prefix:"",node:this}];r.length;){var a=r.pop(),n=Object.keys(a.node.edges),o=n.length;a.node.final&&(a.prefix.charAt(0),e.push(a.prefix));for(var i=0;i<o;i++){var s=n[i];r.push({prefix:a.prefix.concat(s),node:a.node.edges[s]})}}return e},t.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",r=Object.keys(this.edges).sort(),a=r.length,n=0;n<a;n++){var o=r[n],i=this.edges[o];e=e+o+i.id}return e},t.TokenSet.prototype.intersect=function(e){for(var r=new t.TokenSet,a=void 0,n=[{qNode:e,output:r,node:this}];n.length;){a=n.pop();for(var o=Object.keys(a.qNode.edges),i=o.length,s=Object.keys(a.node.edges),l=s.length,u=0;u<i;u++)for(var c=o[u],d=0;d<l;d++){var h=s[d];if(h==c||c=="*"){var p=a.node.edges[h],g=a.qNode.edges[c],f=p.final&&g.final,v=void 0;h in a.output.edges?(v=a.output.edges[h],v.final=v.final||f):(v=new t.TokenSet,v.final=f,a.output.edges[h]=v),n.push({qNode:g,output:v,node:p})}}}return r},t.TokenSet.Builder=function(){this.previousWord="",this.root=new t.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},t.TokenSet.Builder.prototype.insert=function(e){var r,a=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var n=0;n<e.length&&n<this.previousWord.length&&e[n]==this.previousWord[n];n++)a++;this.minimize(a),this.uncheckedNodes.length==0?r=this.root:r=this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(var n=a;n<e.length;n++){var o=new t.TokenSet,i=e[n];r.edges[i]=o,this.uncheckedNodes.push({parent:r,char:i,child:o}),r=o}r.final=!0,this.previousWord=e},t.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},t.TokenSet.Builder.prototype.minimize=function(e){for(var r=this.uncheckedNodes.length-1;r>=e;r--){var a=this.uncheckedNodes[r],n=a.child.toString();n in this.minimizedNodes?a.parent.edges[a.char]=this.minimizedNodes[n]:(a.child._str=n,this.minimizedNodes[n]=a.child),this.uncheckedNodes.pop()}};t.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},t.Index.prototype.search=function(e){return this.query(function(r){var a=new t.QueryParser(e,r);a.parse()})},t.Index.prototype.query=function(e){for(var r=new t.Query(this.fields),a=Object.create(null),n=Object.create(null),o=Object.create(null),i=Object.create(null),s=Object.create(null),l=0;l<this.fields.length;l++)n[this.fields[l]]=new t.Vector;e.call(r,r);for(var l=0;l<r.clauses.length;l++){var u=r.clauses[l],c=null,d=t.Set.empty;u.usePipeline?c=this.pipeline.runString(u.term,{fields:u.fields}):c=[u.term];for(var h=0;h<c.length;h++){var p=c[h];u.term=p;var g=t.TokenSet.fromClause(u),f=this.tokenSet.intersect(g).toArray();if(f.length===0&&u.presence===t.Query.presence.REQUIRED){for(var v=0;v<u.fields.length;v++){var m=u.fields[v];i[m]=t.Set.empty}break}for(var y=0;y<f.length;y++)for(var b=f[y],x=this.invertedIndex[b],k=x._index,v=0;v<u.fields.length;v++){var m=u.fields[v],E=x[m],_=Object.keys(E),T=b+"/"+m,C=new t.Set(_);if(u.presence==t.Query.presence.REQUIRED&&(d=d.union(C),i[m]===void 0&&(i[m]=t.Set.complete)),u.presence==t.Query.presence.PROHIBITED){s[m]===void 0&&(s[m]=t.Set.empty),s[m]=s[m].union(C);continue}if(n[m].upsert(k,u.boost,function(se,ie){return se+ie}),!o[T]){for(var D=0;D<_.length;D++){var L=_[D],A=new t.FieldRef(L,m),O=E[L],I;(I=a[A])===void 0?a[A]=new t.MatchData(b,m,O):I.add(b,m,O)}o[T]=!0}}}if(u.presence===t.Query.presence.REQUIRED)for(var v=0;v<u.fields.length;v++){var m=u.fields[v];i[m]=i[m].intersect(d)}}for(var N=t.Set.complete,z=t.Set.empty,l=0;l<this.fields.length;l++){var m=this.fields[l];i[m]&&(N=N.intersect(i[m])),s[m]&&(z=z.union(s[m]))}var $=Object.keys(a),B=[],R=Object.create(null);if(r.isNegated()){$=Object.keys(this.fieldVectors);for(var l=0;l<$.length;l++){var A=$[l],H=t.FieldRef.fromString(A);a[A]=new t.MatchData}}for(var l=0;l<$.length;l++){var H=t.FieldRef.fromString($[l]),M=H.docRef;if(!!N.contains(M)&&!z.contains(M)){var j=this.fieldVectors[H],W=n[H.fieldName].similarity(j),te;if((te=R[M])!==void 0)te.score+=W,te.matchData.combine(a[H]);else{var X={ref:M,score:W,matchData:a[H]};R[M]=X,B.push(X)}}}return B.sort(function(Y,F){return F.score-Y.score})},t.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map(function(a){return[a,this.invertedIndex[a]]},this),r=Object.keys(this.fieldVectors).map(function(a){return[a,this.fieldVectors[a].toJSON()]},this);return{version:t.version,fields:this.fields,fieldVectors:r,invertedIndex:e,pipeline:this.pipeline.toJSON()}},t.Index.load=function(e){var r={},a={},n=e.fieldVectors,o=Object.create(null),i=e.invertedIndex,s=new t.TokenSet.Builder,l=t.Pipeline.load(e.pipeline);e.version!=t.version&&t.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+t.version+"' does not match serialized index '"+e.version+"'");for(var u=0;u<n.length;u++){var c=n[u],d=c[0],h=c[1];a[d]=new t.Vector(h)}for(var u=0;u<i.length;u++){var c=i[u],p=c[0],g=c[1];s.insert(p),o[p]=g}return s.finish(),r.fields=e.fields,r.fieldVectors=a,r.invertedIndex=o,r.tokenSet=s.root,r.pipeline=l,new t.Index(r)};t.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=t.tokenizer,this.pipeline=new t.Pipeline,this.searchPipeline=new t.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},t.Builder.prototype.ref=function(e){this._ref=e},t.Builder.prototype.field=function(e,r){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=r||{}},t.Builder.prototype.b=function(e){e<0?this._b=0:e>1?this._b=1:this._b=e},t.Builder.prototype.k1=function(e){this._k1=e},t.Builder.prototype.add=function(e,r){var a=e[this._ref],n=Object.keys(this._fields);this._documents[a]=r||{},this.documentCount+=1;for(var o=0;o<n.length;o++){var i=n[o],s=this._fields[i].extractor,l=s?s(e):e[i],u=this.tokenizer(l,{fields:[i]}),c=this.pipeline.run(u),d=new t.FieldRef(a,i),h=Object.create(null);this.fieldTermFrequencies[d]=h,this.fieldLengths[d]=0,this.fieldLengths[d]+=c.length;for(var p=0;p<c.length;p++){var g=c[p];if(h[g]==null&&(h[g]=0),h[g]+=1,this.invertedIndex[g]==null){var f=Object.create(null);f._index=this.termIndex,this.termIndex+=1;for(var v=0;v<n.length;v++)f[n[v]]=Object.create(null);this.invertedIndex[g]=f}this.invertedIndex[g][i][a]==null&&(this.invertedIndex[g][i][a]=Object.create(null));for(var m=0;m<this.metadataWhitelist.length;m++){var y=this.metadataWhitelist[m],b=g.metadata[y];this.invertedIndex[g][i][a][y]==null&&(this.invertedIndex[g][i][a][y]=[]),this.invertedIndex[g][i][a][y].push(b)}}}},t.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),r=e.length,a={},n={},o=0;o<r;o++){var i=t.FieldRef.fromString(e[o]),s=i.fieldName;n[s]||(n[s]=0),n[s]+=1,a[s]||(a[s]=0),a[s]+=this.fieldLengths[i]}for(var l=Object.keys(this._fields),o=0;o<l.length;o++){var u=l[o];a[u]=a[u]/n[u]}this.averageFieldLength=a},t.Builder.prototype.createFieldVectors=function(){for(var e={},r=Object.keys(this.fieldTermFrequencies),a=r.length,n=Object.create(null),o=0;o<a;o++){for(var i=t.FieldRef.fromString(r[o]),s=i.fieldName,l=this.fieldLengths[i],u=new t.Vector,c=this.fieldTermFrequencies[i],d=Object.keys(c),h=d.length,p=this._fields[s].boost||1,g=this._documents[i.docRef].boost||1,f=0;f<h;f++){var v=d[f],m=c[v],y=this.invertedIndex[v]._index,b,x,k;n[v]===void 0?(b=t.idf(this.invertedIndex[v],this.documentCount),n[v]=b):b=n[v],x=b*((this._k1+1)*m)/(this._k1*(1-this._b+this._b*(l/this.averageFieldLength[s]))+m),x*=p,x*=g,k=Math.round(x*1e3)/1e3,u.insert(y,k)}e[i]=u}this.fieldVectors=e},t.Builder.prototype.createTokenSet=function(){this.tokenSet=t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},t.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new t.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},t.Builder.prototype.use=function(e){var r=Array.prototype.slice.call(arguments,1);r.unshift(this),e.apply(this,r)},t.MatchData=function(e,r,a){for(var n=Object.create(null),o=Object.keys(a||{}),i=0;i<o.length;i++){var s=o[i];n[s]=a[s].slice()}this.metadata=Object.create(null),e!==void 0&&(this.metadata[e]=Object.create(null),this.metadata[e][r]=n)},t.MatchData.prototype.combine=function(e){for(var r=Object.keys(e.metadata),a=0;a<r.length;a++){var n=r[a],o=Object.keys(e.metadata[n]);this.metadata[n]==null&&(this.metadata[n]=Object.create(null));for(var i=0;i<o.length;i++){var s=o[i],l=Object.keys(e.metadata[n][s]);this.metadata[n][s]==null&&(this.metadata[n][s]=Object.create(null));for(var u=0;u<l.length;u++){var c=l[u];this.metadata[n][s][c]==null?this.metadata[n][s][c]=e.metadata[n][s][c]:this.metadata[n][s][c]=this.metadata[n][s][c].concat(e.metadata[n][s][c])}}}},t.MatchData.prototype.add=function(e,r,a){if(!(e in this.metadata)){this.metadata[e]=Object.create(null),this.metadata[e][r]=a;return}if(!(r in this.metadata[e])){this.metadata[e][r]=a;return}for(var n=Object.keys(a),o=0;o<n.length;o++){var i=n[o];i in this.metadata[e][r]?this.metadata[e][r][i]=this.metadata[e][r][i].concat(a[i]):this.metadata[e][r][i]=a[i]}},t.Query=function(e){this.clauses=[],this.allFields=e},t.Query.wildcard=new String("*"),t.Query.wildcard.NONE=0,t.Query.wildcard.LEADING=1,t.Query.wildcard.TRAILING=2,t.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},t.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=t.Query.wildcard.NONE),e.wildcard&t.Query.wildcard.LEADING&&e.term.charAt(0)!=t.Query.wildcard&&(e.term="*"+e.term),e.wildcard&t.Query.wildcard.TRAILING&&e.term.slice(-1)!=t.Query.wildcard&&(e.term=""+e.term+"*"),"presence"in e||(e.presence=t.Query.presence.OPTIONAL),this.clauses.push(e),this},t.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=t.Query.presence.PROHIBITED)return!1;return!0},t.Query.prototype.term=function(e,r){if(Array.isArray(e))return e.forEach(function(n){this.term(n,t.utils.clone(r))},this),this;var a=r||{};return a.term=e.toString(),this.clause(a),this},t.QueryParseError=function(e,r,a){this.name="QueryParseError",this.message=e,this.start=r,this.end=a},t.QueryParseError.prototype=new Error,t.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},t.QueryLexer.prototype.run=function(){for(var e=t.QueryLexer.lexText;e;)e=e(this)},t.QueryLexer.prototype.sliceString=function(){for(var e=[],r=this.start,a=this.pos,n=0;n<this.escapeCharPositions.length;n++)a=this.escapeCharPositions[n],e.push(this.str.slice(r,a)),r=a+1;return e.push(this.str.slice(r,this.pos)),this.escapeCharPositions.length=0,e.join("")},t.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},t.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},t.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return t.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},t.QueryLexer.prototype.width=function(){return this.pos-this.start},t.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},t.QueryLexer.prototype.backup=function(){this.pos-=1},t.QueryLexer.prototype.acceptDigitRun=function(){var e,r;do e=this.next(),r=e.charCodeAt(0);while(r>47&&r<58);e!=t.QueryLexer.EOS&&this.backup()},t.QueryLexer.prototype.more=function(){return this.pos<this.length},t.QueryLexer.EOS="EOS",t.QueryLexer.FIELD="FIELD",t.QueryLexer.TERM="TERM",t.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",t.QueryLexer.BOOST="BOOST",t.QueryLexer.PRESENCE="PRESENCE",t.QueryLexer.lexField=function(e){return e.backup(),e.emit(t.QueryLexer.FIELD),e.ignore(),t.QueryLexer.lexText},t.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(t.QueryLexer.TERM)),e.ignore(),e.more())return t.QueryLexer.lexText},t.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.EDIT_DISTANCE),t.QueryLexer.lexText},t.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.BOOST),t.QueryLexer.lexText},t.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(t.QueryLexer.TERM)},t.QueryLexer.termSeparator=t.tokenizer.separator,t.QueryLexer.lexText=function(e){for(;;){var r=e.next();if(r==t.QueryLexer.EOS)return t.QueryLexer.lexEOS;if(r.charCodeAt(0)==92){e.escapeCharacter();continue}if(r==":")return t.QueryLexer.lexField;if(r=="~")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexEditDistance;if(r=="^")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexBoost;if(r=="+"&&e.width()===1||r=="-"&&e.width()===1)return e.emit(t.QueryLexer.PRESENCE),t.QueryLexer.lexText;if(r.match(t.QueryLexer.termSeparator))return t.QueryLexer.lexTerm}},t.QueryParser=function(e,r){this.lexer=new t.QueryLexer(e),this.query=r,this.currentClause={},this.lexemeIdx=0},t.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=t.QueryParser.parseClause;e;)e=e(this);return this.query},t.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},t.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},t.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},t.QueryParser.parseClause=function(e){var r=e.peekLexeme();if(r!=null)switch(r.type){case t.QueryLexer.PRESENCE:return t.QueryParser.parsePresence;case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var a="expected either a field or a term, found "+r.type;throw r.str.length>=1&&(a+=" with value '"+r.str+"'"),new t.QueryParseError(a,r.start,r.end)}},t.QueryParser.parsePresence=function(e){var r=e.consumeLexeme();if(r!=null){switch(r.str){case"-":e.currentClause.presence=t.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=t.Query.presence.REQUIRED;break;default:var a="unrecognised presence operator'"+r.str+"'";throw new t.QueryParseError(a,r.start,r.end)}var n=e.peekLexeme();if(n==null){var a="expecting term or field, found nothing";throw new t.QueryParseError(a,r.start,r.end)}switch(n.type){case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var a="expecting term or field, found '"+n.type+"'";throw new t.QueryParseError(a,n.start,n.end)}}},t.QueryParser.parseField=function(e){var r=e.consumeLexeme();if(r!=null){if(e.query.allFields.indexOf(r.str)==-1){var a=e.query.allFields.map(function(i){return"'"+i+"'"}).join(", "),n="unrecognised field '"+r.str+"', possible fields: "+a;throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.fields=[r.str];var o=e.peekLexeme();if(o==null){var n="expecting term, found nothing";throw new t.QueryParseError(n,r.start,r.end)}switch(o.type){case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var n="expecting term, found '"+o.type+"'";throw new t.QueryParseError(n,o.start,o.end)}}},t.QueryParser.parseTerm=function(e){var r=e.consumeLexeme();if(r!=null){e.currentClause.term=r.str.toLowerCase(),r.str.indexOf("*")!=-1&&(e.currentClause.usePipeline=!1);var a=e.peekLexeme();if(a==null){e.nextClause();return}switch(a.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+a.type+"'";throw new t.QueryParseError(n,a.start,a.end)}}},t.QueryParser.parseEditDistance=function(e){var r=e.consumeLexeme();if(r!=null){var a=parseInt(r.str,10);if(isNaN(a)){var n="edit distance must be numeric";throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.editDistance=a;var o=e.peekLexeme();if(o==null){e.nextClause();return}switch(o.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+o.type+"'";throw new t.QueryParseError(n,o.start,o.end)}}},t.QueryParser.parseBoost=function(e){var r=e.consumeLexeme();if(r!=null){var a=parseInt(r.str,10);if(isNaN(a)){var n="boost must be numeric";throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.boost=a;var o=e.peekLexeme();if(o==null){e.nextClause();return}switch(o.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+o.type+"'";throw new t.QueryParseError(n,o.start,o.end)}}},function(e,r){typeof define=="function"&&define.amd?define(r):typeof ef=="object"?tf.exports=r():e.lunr=r()}(this,function(){return t})})()});var jo=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ko=Symbol(),vl=new Map,gl=class{constructor(t,e){if(this._$cssResult$=!0,e!==Ko)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=vl.get(this.cssText);return jo&&t===void 0&&(vl.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},Ho=t=>new gl(typeof t=="string"?t:t+"",Ko),oe=(t,...e)=>{let r=t.length===1?t[0]:e.reduce((a,n,o)=>a+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1],t[0]);return new gl(r,Ko)},_f=(t,e)=>{jo?t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):e.forEach(r=>{let a=document.createElement("style"),n=window.litNonce;n!==void 0&&a.setAttribute("nonce",n),a.textContent=r.cssText,t.appendChild(a)})},ml=jo?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let a of e.cssRules)r+=a.cssText;return Ho(r)})(t):t,Qo,yl=window.trustedTypes,Cf=yl?yl.emptyScript:"",bl=window.reactiveElementPolyfillSupport,Yo={toAttribute(t,e){switch(e){case Boolean:t=t?Cf:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},wl=(t,e)=>e!==t&&(e==e||t==t),Xo={attribute:!0,type:String,converter:Yo,reflect:!1,hasChanged:wl},za=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,r)=>{let a=this._$Eh(r,e);a!==void 0&&(this._$Eu.set(a,r),t.push(a))}),t}static createProperty(t,e=Xo){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let r=typeof t=="symbol"?Symbol():"__"+t,a=this.getPropertyDescriptor(t,r,e);a!==void 0&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(a){let n=this[t];this[e]=a,this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Xo}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let e=this.properties,r=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let a of r)this.createProperty(a,e[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let a of r)e.unshift(ml(a))}else t!==void 0&&e.push(ml(t));return e}static _$Eh(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,r;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((r=t.hostConnected)===null||r===void 0||r.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return _f(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var r;return(r=e.hostConnected)===null||r===void 0?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var r;return(r=e.hostDisconnected)===null||r===void 0?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ES(t,e,r=Xo){var a,n;let o=this.constructor._$Eh(t,r);if(o!==void 0&&r.reflect===!0){let i=((n=(a=r.converter)===null||a===void 0?void 0:a.toAttribute)!==null&&n!==void 0?n:Yo.toAttribute)(e,r.type);this._$Ei=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Ei=null}}_$AK(t,e){var r,a,n;let o=this.constructor,i=o._$Eu.get(t);if(i!==void 0&&this._$Ei!==i){let s=o.getPropertyOptions(i),l=s.converter,u=(n=(a=(r=l)===null||r===void 0?void 0:r.fromAttribute)!==null&&a!==void 0?a:typeof l=="function"?l:null)!==null&&n!==void 0?n:Yo.fromAttribute;this._$Ei=i,this[i]=u(e,s.type),this._$Ei=null}}requestUpdate(t,e,r){let a=!0;t!==void 0&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||wl)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Ei!==t&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(t,r))):a=!1),!this.isUpdatePending&&a&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((a,n)=>this[n]=a),this._$Et=void 0);let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(t=this._$Eg)===null||t===void 0||t.forEach(a=>{var n;return(n=a.hostUpdate)===null||n===void 0?void 0:n.call(a)}),this.update(r)):this._$EU()}catch(a){throw e=!1,this._$EU(),a}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(r=>{var a;return(a=r.hostUpdated)===null||a===void 0?void 0:a.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$E_!==void 0&&(this._$E_.forEach((e,r)=>this._$ES(r,this[r],e)),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};za.finalized=!0,za.elementProperties=new Map,za.elementStyles=[],za.shadowRootOptions={mode:"open"},bl==null||bl({ReactiveElement:za}),((Qo=globalThis.reactiveElementVersions)!==null&&Qo!==void 0?Qo:globalThis.reactiveElementVersions=[]).push("1.2.3");var Uo,Ma=globalThis.trustedTypes,xl=Ma?Ma.createPolicy("lit-html",{createHTML:t=>t}):void 0,Vr=`lit$${(Math.random()+"").slice(9)}$`,kl="?"+Vr,Ef=`<${kl}>`,Ra=document,_n=(t="")=>Ra.createComment(t),Cn=t=>t===null||typeof t!="object"&&typeof t!="function",_l=Array.isArray,Sf=t=>{var e;return _l(t)||typeof((e=t)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},En=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cl=/-->/g,El=/>/g,fa=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Sl=/'/g,Tl=/"/g,Dl=/^(?:script|style|textarea|title)$/i,Pl=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),q=Pl(1),Al=Pl(2),wt=Symbol.for("lit-noChange"),qe=Symbol.for("lit-nothing"),Ll=new WeakMap,Tf=(t,e,r)=>{var a,n;let o=(a=r==null?void 0:r.renderBefore)!==null&&a!==void 0?a:e,i=o._$litPart$;if(i===void 0){let s=(n=r==null?void 0:r.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=i=new vi(e.insertBefore(_n(),s),s,void 0,r??{})}return i._$AI(t),i},Fa=Ra.createTreeWalker(Ra,129,null,!1),Df=(t,e)=>{let r=t.length-1,a=[],n,o=e===2?"<svg>":"",i=En;for(let l=0;l<r;l++){let u=t[l],c,d,h=-1,p=0;for(;p<u.length&&(i.lastIndex=p,d=i.exec(u),d!==null);)p=i.lastIndex,i===En?d[1]==="!--"?i=Cl:d[1]!==void 0?i=El:d[2]!==void 0?(Dl.test(d[2])&&(n=RegExp("</"+d[2],"g")),i=fa):d[3]!==void 0&&(i=fa):i===fa?d[0]===">"?(i=n??En,h=-1):d[1]===void 0?h=-2:(h=i.lastIndex-d[2].length,c=d[1],i=d[3]===void 0?fa:d[3]==='"'?Tl:Sl):i===Tl||i===Sl?i=fa:i===Cl||i===El?i=En:(i=fa,n=void 0);let g=i===fa&&t[l+1].startsWith("/>")?" ":"";o+=i===En?u+Ef:h>=0?(a.push(c),u.slice(0,h)+"$lit$"+u.slice(h)+Vr+g):u+Vr+(h===-2?(a.push(void 0),l):g)}let s=o+(t[r]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[xl!==void 0?xl.createHTML(s):s,a]},pi=class{constructor({strings:t,_$litType$:e},r){let a;this.parts=[];let n=0,o=0,i=t.length-1,s=this.parts,[l,u]=Df(t,e);if(this.el=pi.createElement(l,r),Fa.currentNode=this.el.content,e===2){let c=this.el.content,d=c.firstChild;d.remove(),c.append(...d.childNodes)}for(;(a=Fa.nextNode())!==null&&s.length<i;){if(a.nodeType===1){if(a.hasAttributes()){let c=[];for(let d of a.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(Vr)){let h=u[o++];if(c.push(d),h!==void 0){let p=a.getAttribute(h.toLowerCase()+"$lit$").split(Vr),g=/([.?@])?(.*)/.exec(h);s.push({type:1,index:n,name:g[2],strings:p,ctor:g[1]==="."?Af:g[1]==="?"?If:g[1]==="@"?Of:gi})}else s.push({type:6,index:n})}for(let d of c)a.removeAttribute(d)}if(Dl.test(a.tagName)){let c=a.textContent.split(Vr),d=c.length-1;if(d>0){a.textContent=Ma?Ma.emptyScript:"";for(let h=0;h<d;h++)a.append(c[h],_n()),Fa.nextNode(),s.push({type:2,index:++n});a.append(c[d],_n())}}}else if(a.nodeType===8)if(a.data===kl)s.push({type:2,index:n});else{let c=-1;for(;(c=a.data.indexOf(Vr,c+1))!==-1;)s.push({type:7,index:n}),c+=Vr.length-1}n++}}static createElement(t,e){let r=Ra.createElement("template");return r.innerHTML=t,r}};function Na(t,e,r=t,a){var n,o,i,s;if(e===wt)return e;let l=a!==void 0?(n=r._$Cl)===null||n===void 0?void 0:n[a]:r._$Cu,u=Cn(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==u&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),u===void 0?l=void 0:(l=new u(t),l._$AT(t,r,a)),a!==void 0?((i=(s=r)._$Cl)!==null&&i!==void 0?i:s._$Cl=[])[a]=l:r._$Cu=l),l!==void 0&&(e=Na(t,l._$AS(t,e.values),l,a)),e}var Pf=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;let{el:{content:r},parts:a}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:Ra).importNode(r,!0);Fa.currentNode=n;let o=Fa.nextNode(),i=0,s=0,l=a[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new vi(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new $f(o,this,t)),this.v.push(u),l=a[++s]}i!==(l==null?void 0:l.index)&&(o=Fa.nextNode(),i++)}return n}m(t){let e=0;for(let r of this.v)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},vi=class{constructor(t,e,r,a){var n;this.type=2,this._$AH=qe,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=a,this._$Cg=(n=a==null?void 0:a.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Na(this,t,e),Cn(t)?t===qe||t==null||t===""?(this._$AH!==qe&&this._$AR(),this._$AH=qe):t!==this._$AH&&t!==wt&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.S(t):Sf(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==qe&&Cn(this._$AH)?this._$AA.nextSibling.data=t:this.S(Ra.createTextNode(t)),this._$AH=t}T(t){var e;let{values:r,_$litType$:a}=t,n=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=pi.createElement(a.h,this.options)),a);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.m(r);else{let o=new Pf(n,this),i=o.p(this.options);o.m(r),this.S(i),this._$AH=o}}_$AC(t){let e=Ll.get(t.strings);return e===void 0&&Ll.set(t.strings,e=new pi(t)),e}A(t){_l(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,a=0;for(let n of t)a===e.length?e.push(r=new vi(this.M(_n()),this.M(_n()),this,this.options)):r=e[a],r._$AI(n),a++;a<e.length&&(this._$AR(r&&r._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,e);t&&t!==this._$AB;){let a=t.nextSibling;t.remove(),t=a}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},gi=class{constructor(t,e,r,a,n){this.type=1,this._$AH=qe,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=qe}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,a){let n=this.strings,o=!1;if(n===void 0)t=Na(this,t,e,0),o=!Cn(t)||t!==this._$AH&&t!==wt,o&&(this._$AH=t);else{let i=t,s,l;for(t=n[0],s=0;s<n.length-1;s++)l=Na(this,i[r+s],e,s),l===wt&&(l=this._$AH[s]),o||(o=!Cn(l)||l!==this._$AH[s]),l===qe?t=qe:t!==qe&&(t+=(l??"")+n[s+1]),this._$AH[s]=l}o&&!a&&this.k(t)}k(t){t===qe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Af=class extends gi{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===qe?void 0:t}},Lf=Ma?Ma.emptyScript:"",If=class extends gi{constructor(){super(...arguments),this.type=4}k(t){t&&t!==qe?this.element.setAttribute(this.name,Lf):this.element.removeAttribute(this.name)}},Of=class extends gi{constructor(t,e,r,a,n){super(t,e,r,a,n),this.type=5}_$AI(t,e=this){var r;if((t=(r=Na(this,t,e,0))!==null&&r!==void 0?r:qe)===wt)return;let a=this._$AH,n=t===qe&&a!==qe||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,o=t!==qe&&(a===qe||n);n&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;typeof this._$AH=="function"?this._$AH.call((r=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&r!==void 0?r:this.element,t):this._$AH.handleEvent(t)}},$f=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Na(this,t)}},Il=window.litHtmlPolyfillSupport;Il==null||Il(pi,vi),((Uo=globalThis.litHtmlVersions)!==null&&Uo!==void 0?Uo:globalThis.litHtmlVersions=[]).push("2.1.3");var qo,Go,re=class extends za{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;let r=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=r.firstChild),r}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=Tf(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return wt}};re.finalized=!0,re._$litElement$=!0,(qo=globalThis.litElementHydrateSupport)===null||qo===void 0||qo.call(globalThis,{LitElement:re});var Ol=globalThis.litElementPolyfillSupport;Ol==null||Ol({LitElement:re});((Go=globalThis.litElementVersions)!==null&&Go!==void 0?Go:globalThis.litElementVersions=[]).push("3.1.2");var le=oe`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var $l=oe`
  ${le}

  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;var Bf=Object.create,Va=Object.defineProperty,zf=Object.defineProperties,Bl=Object.getOwnPropertyDescriptor,Mf=Object.getOwnPropertyDescriptors,zl=Object.getOwnPropertyNames,mi=Object.getOwnPropertySymbols,Rf=Object.getPrototypeOf,Zo=Object.prototype.hasOwnProperty,Ml=Object.prototype.propertyIsEnumerable,Rl=(t,e,r)=>e in t?Va(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Be=(t,e)=>{for(var r in e||(e={}))Zo.call(e,r)&&Rl(t,r,e[r]);if(mi)for(var r of mi(e))Ml.call(e,r)&&Rl(t,r,e[r]);return t},xt=(t,e)=>zf(t,Mf(e)),Ff=t=>Va(t,"__esModule",{value:!0}),yi=(t,e)=>{var r={};for(var a in t)Zo.call(t,a)&&e.indexOf(a)<0&&(r[a]=t[a]);if(t!=null&&mi)for(var a of mi(t))e.indexOf(a)<0&&Ml.call(t,a)&&(r[a]=t[a]);return r},Sr=(t,e)=>function(){return e||(0,t[zl(t)[0]])((e={exports:{}}).exports,e),e.exports},Fl=(t,e)=>{for(var r in e)Va(t,r,{get:e[r],enumerable:!0})},Nf=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of zl(e))!Zo.call(t,n)&&(r||n!=="default")&&Va(t,n,{get:()=>e[n],enumerable:!(a=Bl(e,n))||a.enumerable});return t},Nl=(t,e)=>Nf(Ff(Va(t!=null?Bf(Rf(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t),w=(t,e,r,a)=>{for(var n=a>1?void 0:a?Bl(e,r):e,o=t.length-1,i;o>=0;o--)(i=t[o])&&(n=(a?i(e,r,n):i(n))||n);return a&&n&&Va(e,r,n),n};var ne=t=>e=>typeof e=="function"?((r,a)=>(window.customElements.define(r,a),a))(t,e):((r,a)=>{let{kind:n,elements:o}=a;return{kind:n,elements:o,finisher(i){window.customElements.define(r,i)}}})(t,e),Vf=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?xt(Be({},e),{finisher(r){r.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function S(t){return(e,r)=>r!==void 0?((a,n,o)=>{n.constructor.createProperty(o,a)})(t,e,r):Vf(t,e)}function Se(t){return S(xt(Be({},t),{state:!0}))}var Vl=({finisher:t,descriptor:e})=>(r,a)=>{var n;if(a===void 0){let o=(n=r.originalKey)!==null&&n!==void 0?n:r.key,i=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(r.key)}:xt(Be({},r),{key:o});return t!=null&&(i.finisher=function(s){t(s,o)}),i}{let o=r.constructor;e!==void 0&&Object.defineProperty(r,a,e(a)),t==null||t(o,a)}};function ue(t,e){return Vl({descriptor:r=>{let a={get(){var n,o;return(o=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(t))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){let n=typeof r=="symbol"?Symbol():"__"+r;a.get=function(){var o,i;return this[n]===void 0&&(this[n]=(i=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(t))!==null&&i!==void 0?i:null),this[n]}}return a}})}function jl(t){return Vl({descriptor:e=>({async get(){var r;return await this.updateComplete,(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t)},enumerable:!0,configurable:!0})})}var Wo,q1=((Wo=window.HTMLSlotElement)===null||Wo===void 0?void 0:Wo.prototype.assignedElements)!=null?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter(r=>r.nodeType===Node.ELEMENT_NODE);var bi=class extends re{render(){return q` <slot></slot> `}};bi.styles=$l;bi=w([ne("sl-visually-hidden")],bi);var jf=0;function wi(){return++jf}var Kl=oe`
  ${le}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`;var ja=class extends re{constructor(){super(...arguments);this.attrId=wi(),this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId}render(){return this.style.display=this.active?"block":"none",q`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${this.active?"false":"true"}>
        <slot></slot>
      </div>
    `}};ja.styles=Kl;w([S({reflect:!0})],ja.prototype,"name",2);w([S({type:Boolean,reflect:!0})],ja.prototype,"active",2);ja=w([ne("sl-tab-panel")],ja);var jr=oe`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`;var Hl=oe`
  ${le}
  ${jr}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }
`;var Ut={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Tr=t=>(...e)=>({_$litDirective$:t,values:e}),Kr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Kf=t=>t.strings===void 0,Hf={},Qf=(t,e=Hf)=>t._$AH=e,$t=Tr(class extends Kr{constructor(t){if(super(t),t.type!==Ut.PROPERTY&&t.type!==Ut.ATTRIBUTE&&t.type!==Ut.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Kf(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===wt||e===qe)return e;let r=t.element,a=t.name;if(t.type===Ut.PROPERTY){if(e===r[a])return wt}else if(t.type===Ut.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(a))return wt}else if(t.type===Ut.ATTRIBUTE&&r.getAttribute(a)===e+"")return wt;return Qf(t),e}});var Yf=class extends Event{constructor(t){super("formdata");this.formData=t}},Xf=class extends FormData{constructor(t){super(t);this.form=t,t.dispatchEvent(new Yf(this))}append(t,e){let r=this.form.elements[t];if(r||(r=document.createElement("input"),r.type="hidden",r.name=t,this.form.appendChild(r)),this.has(t)){let a=this.getAll(t),n=a.indexOf(r.value);n!==-1&&a.splice(n,1),a.push(e),this.set(t,a)}else super.append(t,e);r.value=e}};function Uf(){let t=document.createElement("form"),e=!1;return document.body.append(t),t.addEventListener("submit",r=>{new FormData(r.target),r.preventDefault()}),t.addEventListener("formdata",()=>e=!0),t.dispatchEvent(new Event("submit",{cancelable:!0})),t.remove(),e}function Ql(){!window.FormData||Uf()||(window.FormData=Xf,window.addEventListener("submit",t=>{t.defaultPrevented||new FormData(t.target)}))}document.readyState==="complete"?Ql():window.addEventListener("DOMContentLoaded",()=>Ql());var ft=class{constructor(t,e){(this.host=t).addController(this),this.options=Be({form:r=>r.closest("form"),name:r=>r.name,value:r=>r.value,disabled:r=>r.disabled,reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this)}hostConnected(){this.form=this.options.form(this.host),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form=void 0)}handleFormData(t){let e=this.options.disabled(this.host),r=this.options.name(this.host),a=this.options.value(this.host);!e&&typeof r=="string"&&typeof a!="undefined"&&(Array.isArray(a)?a.forEach(n=>{t.formData.append(r,n.toString())}):t.formData.append(r,a.toString()))}handleFormSubmit(t){let e=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&!e&&!r(this.host)&&(t.preventDefault(),t.stopImmediatePropagation())}submit(t){if(this.form){let e=document.createElement("button");e.type="submit",e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clip="rect(0 0 0 0)",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",t&&(e.formAction=t.formAction,e.formMethod=t.formMethod,e.formNoValidate=t.formNoValidate,e.formTarget=t.formTarget),this.form.append(e),e.click(),e.remove()}}};var lt=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some(t=>t.nodeType===t.TEXT_NODE&&t.textContent.trim()!==""||t.nodeType===t.ELEMENT_NODE&&!t.hasAttribute("slot"))}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){let e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}};function xi(t){if(!t)return"";let e=t.assignedNodes({flatten:!0}),r="";return[...e].forEach(a=>{a.nodeType===Node.TEXT_NODE&&(r+=a.textContent)}),r}var ge=Tr(class extends Kr{constructor(t){var e;if(super(t),t.type!==Ut.ATTRIBUTE||t.name!=="class"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,a;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in e)e[o]&&!((r=this.et)===null||r===void 0?void 0:r.has(o))&&this.st.add(o);return this.render(e)}let n=t.element.classList;this.st.forEach(o=>{o in e||(n.remove(o),this.st.delete(o))});for(let o in e){let i=!!e[o];i===this.st.has(o)||((a=this.et)===null||a===void 0?void 0:a.has(o))||(i?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return wt}});function ae(t,e){let r=Be({waitUntilFirstUpdate:!1},e);return(a,n)=>{let{update:o}=a;if(t in a){let i=t;a.update=function(s){if(s.has(i)){let l=s.get(i),u=this[i];l!==u&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[n](l,u)}o.call(this,s)}}}}function ee(t,e,r){let a=new CustomEvent(e,Be({bubbles:!0,cancelable:!1,composed:!0,detail:{}},r));return t.dispatchEvent(a),a}function pt(t,e){return new Promise(r=>{function a(n){n.target===t&&(t.removeEventListener(e,a),r())}t.addEventListener(e,a)})}var he=t=>t??qe;var Fe=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this),this.hasSlotController=new lt(this,"help-text","label"),this.hasFocus=!1,this.size="medium",this.value="",this.filled=!1,this.label="",this.helpText="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,a="preserve"){this.input.setRangeText(t,e,r,a),this.value!==this.input.value&&(this.value=this.input.value,ee(this,"sl-input")),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight(),ee(this,"sl-input"),ee(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),ee(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleInput(){this.value=this.input.value,this.setTextareaHeight(),ee(this,"sl-input")}handleRowsChange(){this.setTextareaHeight()}handleValueChange(){this.invalid=!this.input.checkValidity()}setTextareaHeight(){this.resize==="auto"?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,a=this.helpText?!0:!!e;return q`
      <div
        part="form-control"
        class=${ge({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":a})}
      >
        <label part="label" class="form-control__label" for="input" aria-hidden=${r?"false":"true"}>
          <slot name="label">${this.label}</slot>
        </label>

        <div class="form-control__input">
          <div
            part="base"
            class=${ge({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":this.value.length===0,"textarea--invalid":this.invalid,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${he(this.name)}
              .value=${$t(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${he(this.placeholder)}
              rows=${he(this.rows)}
              minlength=${he(this.minlength)}
              maxlength=${he(this.maxlength)}
              autocapitalize=${he(this.autocapitalize)}
              autocorrect=${he(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${he(this.spellcheck)}
              inputmode=${he(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${a?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Fe.styles=Hl;w([ue(".textarea__control")],Fe.prototype,"input",2);w([Se()],Fe.prototype,"hasFocus",2);w([S({reflect:!0})],Fe.prototype,"size",2);w([S()],Fe.prototype,"name",2);w([S()],Fe.prototype,"value",2);w([S({type:Boolean,reflect:!0})],Fe.prototype,"filled",2);w([S()],Fe.prototype,"label",2);w([S({attribute:"help-text"})],Fe.prototype,"helpText",2);w([S()],Fe.prototype,"placeholder",2);w([S({type:Number})],Fe.prototype,"rows",2);w([S()],Fe.prototype,"resize",2);w([S({type:Boolean,reflect:!0})],Fe.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],Fe.prototype,"readonly",2);w([S({type:Number})],Fe.prototype,"minlength",2);w([S({type:Number})],Fe.prototype,"maxlength",2);w([S({type:Boolean,reflect:!0})],Fe.prototype,"required",2);w([S({type:Boolean,reflect:!0})],Fe.prototype,"invalid",2);w([S()],Fe.prototype,"autocapitalize",2);w([S()],Fe.prototype,"autocorrect",2);w([S()],Fe.prototype,"autocomplete",2);w([S({type:Boolean})],Fe.prototype,"autofocus",2);w([S({type:Boolean})],Fe.prototype,"spellcheck",2);w([S()],Fe.prototype,"inputmode",2);w([ae("disabled",{waitUntilFirstUpdate:!0})],Fe.prototype,"handleDisabledChange",1);w([ae("rows",{waitUntilFirstUpdate:!0})],Fe.prototype,"handleRowsChange",1);w([ae("value",{waitUntilFirstUpdate:!0})],Fe.prototype,"handleValueChange",1);Fe=w([ne("sl-textarea")],Fe);var Yl=oe`
  ${le}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-target {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip-positioner[data-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-placement^='right'] .tooltip {
    transform-origin: left;
  }

  .tooltip__content {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }

  .tooltip__arrow {
    position: absolute;
    background: var(--sl-tooltip-background-color);
    width: calc(var(--sl-tooltip-arrow-size) * 2);
    height: calc(var(--sl-tooltip-arrow-size) * 2);
    transform: rotate(45deg);
    z-index: -1;
  }
`;function Ka(t){return t.split("-")[0]}function ki(t){return t.split("-")[1]}function Sn(t){return["top","bottom"].includes(Ka(t))?"x":"y"}function Jo(t){return t==="y"?"height":"width"}function Xl(t,e,r){let{reference:a,floating:n}=t,o=a.x+a.width/2-n.width/2,i=a.y+a.height/2-n.height/2,s=Sn(e),l=Jo(s),u=a[l]/2-n[l]/2,c=Ka(e),d=s==="x",h;switch(c){case"top":h={x:o,y:a.y-n.height};break;case"bottom":h={x:o,y:a.y+a.height};break;case"right":h={x:a.x+a.width,y:i};break;case"left":h={x:a.x-n.width,y:i};break;default:h={x:a.x,y:a.y}}switch(ki(e)){case"start":h[s]-=u*(r&&d?-1:1);break;case"end":h[s]+=u*(r&&d?-1:1);break}return h}var qf=async(t,e,r)=>{let{placement:a="bottom",strategy:n="absolute",middleware:o=[],platform:i}=r,s=await(i.isRTL==null?void 0:i.isRTL(e)),l=await i.getElementRects({reference:t,floating:e,strategy:n}),{x:u,y:c}=Xl(l,a,s),d=a,h={},p=new Set,g=0;for(let f=0;f<o.length;f++){let{name:v,fn:m}=o[f];if(p.has(v))continue;let{x:y,y:b,data:x,reset:k}=await m({x:u,y:c,initialPlacement:a,placement:d,strategy:n,middlewareData:h,rects:l,platform:i,elements:{reference:t,floating:e}});if(u=y??u,c=b??c,h=xt(Be({},h),{[v]:Be(Be({},h[v]),x)}),k){typeof k=="object"&&(k.placement&&(d=k.placement),k.rects&&(l=k.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:n}):k.rects),{x:u,y:c}=Xl(l,d,s),k.skip!==!1&&p.add(v)),f=-1;continue}}return{x:u,y:c,placement:d,strategy:n,middlewareData:h}};function Gf(t){return Be({top:0,right:0,bottom:0,left:0},t)}function Ul(t){return typeof t!="number"?Gf(t):{top:t,right:t,bottom:t,left:t}}function _i(t){return xt(Be({},t),{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}async function es(t,e){var r;e===void 0&&(e={});let{x:a,y:n,platform:o,rects:i,elements:s,strategy:l}=t,{boundary:u="clippingAncestors",rootBoundary:c="viewport",elementContext:d="floating",altBoundary:h=!1,padding:p=0}=e,g=Ul(p),v=s[h?d==="floating"?"reference":"floating":d],m=_i(await o.getClippingRect({element:((r=await(o.isElement==null?void 0:o.isElement(v)))!=null?r:!0)?v:v.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(s.floating)),boundary:u,rootBoundary:c})),y=_i(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({rect:d==="floating"?xt(Be({},i.floating),{x:a,y:n}):i.reference,offsetParent:await(o.getOffsetParent==null?void 0:o.getOffsetParent(s.floating)),strategy:l}):i[d]);return{top:m.top-y.top+g.top,bottom:y.bottom-m.bottom+g.bottom,left:m.left-y.left+g.left,right:y.right-m.right+g.right}}var Zf=Math.min,pa=Math.max;function ts(t,e,r){return pa(t,Zf(e,r))}var ql=t=>({name:"arrow",options:t,async fn(e){let{element:r,padding:a=0}=t??{},{x:n,y:o,placement:i,rects:s,platform:l}=e;if(r==null)return{};let u=Ul(a),c={x:n,y:o},d=Sn(i),h=Jo(d),p=await l.getDimensions(r),g=d==="y"?"top":"left",f=d==="y"?"bottom":"right",v=s.reference[h]+s.reference[d]-c[d]-s.floating[h],m=c[d]-s.reference[d],y=await(l.getOffsetParent==null?void 0:l.getOffsetParent(r)),b=y?d==="y"?y.clientHeight||0:y.clientWidth||0:0,x=v/2-m/2,k=u[g],E=b-p[h]-u[f],_=b/2-p[h]/2+x,T=ts(k,_,E);return{data:{[d]:T,centerOffset:_-T}}}}),Wf={left:"right",right:"left",bottom:"top",top:"bottom"};function Ci(t){return t.replace(/left|right|bottom|top/g,e=>Wf[e])}function Jf(t,e,r){r===void 0&&(r=!1);let a=ki(t),n=Sn(t),o=Jo(n),i=n==="x"?a===(r?"end":"start")?"right":"left":a==="start"?"bottom":"top";return e.reference[o]>e.floating[o]&&(i=Ci(i)),{main:i,cross:Ci(i)}}var ep={start:"end",end:"start"};function Gl(t){return t.replace(/start|end/g,e=>ep[e])}function tp(t){let e=Ci(t);return[Gl(t),e,Gl(e)]}var Ei=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r;let{placement:a,middlewareData:n,rects:o,initialPlacement:i,platform:s,elements:l}=e,u=t,{mainAxis:c=!0,crossAxis:d=!0,fallbackPlacements:h,fallbackStrategy:p="bestFit",flipAlignment:g=!0}=u,f=yi(u,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","flipAlignment"]),v=Ka(a),y=h||(v===i||!g?[Ci(i)]:tp(i)),b=[i,...y],x=await es(e,f),k=[],E=((r=n.flip)==null?void 0:r.overflows)||[];if(c&&k.push(x[v]),d){let{main:D,cross:L}=Jf(a,o,await(s.isRTL==null?void 0:s.isRTL(l.floating)));k.push(x[D],x[L])}if(E=[...E,{placement:a,overflows:k}],!k.every(D=>D<=0)){var _,T;let D=((_=(T=n.flip)==null?void 0:T.index)!=null?_:0)+1,L=b[D];if(L)return{data:{index:D,overflows:E},reset:{skip:!1,placement:L}};let A="bottom";switch(p){case"bestFit":{var C;let O=(C=E.slice().sort((I,N)=>I.overflows.filter(z=>z>0).reduce((z,$)=>z+$,0)-N.overflows.filter(z=>z>0).reduce((z,$)=>z+$,0))[0])==null?void 0:C.placement;O&&(A=O);break}case"initialPlacement":A=i;break}return{reset:{placement:A}}}return{}}}};function rp(t,e,r,a){a===void 0&&(a=!1);let n=Ka(t),o=ki(t),i=Sn(t)==="x",s=["left","top"].includes(n)?-1:1,l=1;o==="end"&&(l=-1),a&&i&&(l*=-1);let u=typeof r=="function"?r(xt(Be({},e),{placement:t})):r,{mainAxis:c,crossAxis:d}=typeof u=="number"?{mainAxis:u,crossAxis:0}:Be({mainAxis:0,crossAxis:0},u);return i?{x:d*l,y:c*s}:{x:c*s,y:d*l}}var Si=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){let{x:r,y:a,placement:n,rects:o,platform:i,elements:s}=e,l=rp(n,o,t,await(i.isRTL==null?void 0:i.isRTL(s.floating)));return{x:r+l.x,y:a+l.y,data:l}}}};function ap(t){return t==="x"?"y":"x"}var Ti=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:r,y:a,placement:n}=e,o=t,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:m=>{let{x:y,y:b}=m;return{x:y,y:b}}}}=o,u=yi(o,["mainAxis","crossAxis","limiter"]),c={x:r,y:a},d=await es(e,u),h=Sn(Ka(n)),p=ap(h),g=c[h],f=c[p];if(i){let m=h==="y"?"top":"left",y=h==="y"?"bottom":"right",b=g+d[m],x=g-d[y];g=ts(b,g,x)}if(s){let m=p==="y"?"top":"left",y=p==="y"?"bottom":"right",b=f+d[m],x=f-d[y];f=ts(b,f,x)}let v=l.fn(xt(Be({},e),{[h]:g,[p]:f}));return xt(Be({},v),{data:{x:v.x-r,y:v.y-a}})}}},Zl=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:r,rects:a,platform:n,elements:o}=e,i=t,{apply:s}=i,l=yi(i,["apply"]),u=await es(e,l),c=Ka(r),d=ki(r),h,p;c==="top"||c==="bottom"?(h=c,p=d===(await(n.isRTL==null?void 0:n.isRTL(o.floating))?"start":"end")?"left":"right"):(p=c,h=d==="end"?"top":"bottom");let g=pa(u.left,0),f=pa(u.right,0),v=pa(u.top,0),m=pa(u.bottom,0),y={height:a.floating.height-(["left","right"].includes(r)?2*(v!==0||m!==0?v+m:pa(u.top,u.bottom)):u[h]),width:a.floating.width-(["top","bottom"].includes(r)?2*(g!==0||f!==0?g+f:pa(u.left,u.right)):u[p])};return s==null||s(Be(Be({},y),a)),{reset:{rects:!0}}}}};function rs(t){return(t==null?void 0:t.toString())==="[object Window]"}function Hr(t){if(t==null)return window;if(!rs(t)){let e=t.ownerDocument;return e&&e.defaultView||window}return t}function Tn(t){return Hr(t).getComputedStyle(t)}function Dr(t){return rs(t)?"":t?(t.nodeName||"").toLowerCase():""}function mr(t){return t instanceof Hr(t).HTMLElement}function Ha(t){return t instanceof Hr(t).Element}function np(t){return t instanceof Hr(t).Node}function as(t){let e=Hr(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Di(t){let{overflow:e,overflowX:r,overflowY:a}=Tn(t);return/auto|scroll|overlay|hidden/.test(e+a+r)}function ip(t){return["table","td","th"].includes(Dr(t))}function Wl(t){let e=navigator.userAgent.toLowerCase().includes("firefox"),r=Tn(t);return r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].includes(r.willChange)||e&&r.willChange==="filter"||e&&(r.filter?r.filter!=="none":!1)}var Jl=Math.min,Dn=Math.max,Pi=Math.round;function Pr(t,e){e===void 0&&(e=!1);let r=t.getBoundingClientRect(),a=1,n=1;return e&&mr(t)&&(a=t.offsetWidth>0&&Pi(r.width)/t.offsetWidth||1,n=t.offsetHeight>0&&Pi(r.height)/t.offsetHeight||1),{width:r.width/a,height:r.height/n,top:r.top/n,right:r.right/a,bottom:r.bottom/n,left:r.left/a,x:r.left/a,y:r.top/n}}function Qr(t){return((np(t)?t.ownerDocument:t.document)||window.document).documentElement}function Ai(t){return rs(t)?{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}:{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function eu(t){return Pr(Qr(t)).left+Ai(t).scrollLeft}function op(t){let e=Pr(t);return Pi(e.width)!==t.offsetWidth||Pi(e.height)!==t.offsetHeight}function sp(t,e,r){let a=mr(e),n=Qr(e),o=Pr(t,a&&op(e)),i={scrollLeft:0,scrollTop:0},s={x:0,y:0};if(a||!a&&r!=="fixed")if((Dr(e)!=="body"||Di(n))&&(i=Ai(e)),mr(e)){let l=Pr(e,!0);s.x=l.x+e.clientLeft,s.y=l.y+e.clientTop}else n&&(s.x=eu(n));return{x:o.left+i.scrollLeft-s.x,y:o.top+i.scrollTop-s.y,width:o.width,height:o.height}}function Li(t){return Dr(t)==="html"?t:t.assignedSlot||t.parentNode||(as(t)?t.host:null)||Qr(t)}function tu(t){return!mr(t)||getComputedStyle(t).position==="fixed"?null:t.offsetParent}function lp(t){let e=Li(t);for(as(e)&&(e=e.host);mr(e)&&!["html","body"].includes(Dr(e));){if(Wl(e))return e;e=e.parentNode}return null}function ns(t){let e=Hr(t),r=tu(t);for(;r&&ip(r)&&getComputedStyle(r).position==="static";)r=tu(r);return r&&(Dr(r)==="html"||Dr(r)==="body"&&getComputedStyle(r).position==="static"&&!Wl(r))?e:r||lp(t)||e}function ru(t){if(mr(t))return{width:t.offsetWidth,height:t.offsetHeight};let e=Pr(t);return{width:e.width,height:e.height}}function up(t){let{rect:e,offsetParent:r,strategy:a}=t,n=mr(r),o=Qr(r);if(r===o)return e;let i={scrollLeft:0,scrollTop:0},s={x:0,y:0};if((n||!n&&a!=="fixed")&&((Dr(r)!=="body"||Di(o))&&(i=Ai(r)),mr(r))){let l=Pr(r,!0);s.x=l.x+r.clientLeft,s.y=l.y+r.clientTop}return xt(Be({},e),{x:e.x-i.scrollLeft+s.x,y:e.y-i.scrollTop+s.y})}function cp(t){let e=Hr(t),r=Qr(t),a=e.visualViewport,n=r.clientWidth,o=r.clientHeight,i=0,s=0;return a&&(n=a.width,o=a.height,Math.abs(e.innerWidth/a.scale-a.width)<.01&&(i=a.offsetLeft,s=a.offsetTop)),{width:n,height:o,x:i,y:s}}function dp(t){var e;let r=Qr(t),a=Ai(t),n=(e=t.ownerDocument)==null?void 0:e.body,o=Dn(r.scrollWidth,r.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),i=Dn(r.scrollHeight,r.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),s=-a.scrollLeft+eu(t),l=-a.scrollTop;return Tn(n||r).direction==="rtl"&&(s+=Dn(r.clientWidth,n?n.clientWidth:0)-o),{width:o,height:i,x:s,y:l}}function au(t){return["html","body","#document"].includes(Dr(t))?t.ownerDocument.body:mr(t)&&Di(t)?t:au(Li(t))}function Ii(t,e){var r;e===void 0&&(e=[]);let a=au(t),n=a===((r=t.ownerDocument)==null?void 0:r.body),o=Hr(a),i=n?[o].concat(o.visualViewport||[],Di(a)?a:[]):a,s=e.concat(i);return n?s:s.concat(Ii(Li(i)))}function hp(t,e){let r=e.getRootNode==null?void 0:e.getRootNode();if(t.contains(e))return!0;if(r&&as(r)){let a=e;do{if(a&&t===a)return!0;a=a.parentNode||a.host}while(a)}return!1}function fp(t){let e=Pr(t),r=e.top+t.clientTop,a=e.left+t.clientLeft;return{top:r,left:a,x:a,y:r,right:a+t.clientWidth,bottom:r+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}function nu(t,e){return e==="viewport"?_i(cp(t)):Ha(e)?fp(e):_i(dp(Qr(t)))}function pp(t){let e=Ii(Li(t)),a=["absolute","fixed"].includes(Tn(t).position)&&mr(t)?ns(t):t;return Ha(a)?e.filter(n=>Ha(n)&&hp(n,a)&&Dr(n)!=="body"):[]}function vp(t){let{element:e,boundary:r,rootBoundary:a}=t,o=[...r==="clippingAncestors"?pp(e):[].concat(r),a],i=o[0],s=o.reduce((l,u)=>{let c=nu(e,u);return l.top=Dn(c.top,l.top),l.right=Jl(c.right,l.right),l.bottom=Jl(c.bottom,l.bottom),l.left=Dn(c.left,l.left),l},nu(e,i));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}}var gp={getClippingRect:vp,convertOffsetParentRelativeRectToViewportRelativeRect:up,isElement:Ha,getDimensions:ru,getOffsetParent:ns,getDocumentElement:Qr,getElementRects:t=>{let{reference:e,floating:r,strategy:a}=t;return{reference:sp(e,ns(r),a),floating:xt(Be({},ru(r)),{x:0,y:0})}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>Tn(t).direction==="rtl"};function Oi(t,e,r,a){a===void 0&&(a={});let{ancestorScroll:n=!0,ancestorResize:o=!0,elementResize:i=!0,animationFrame:s=!1}=a,l=!1,u=n&&!s,c=o&&!s,d=i&&!s,h=u||c?[...Ha(t)?Ii(t):[],...Ii(e)]:[];h.forEach(m=>{u&&m.addEventListener("scroll",r,{passive:!0}),c&&m.addEventListener("resize",r)});let p=null;d&&(p=new ResizeObserver(r),Ha(t)&&p.observe(t),p.observe(e));let g,f=s?Pr(t):null;s&&v();function v(){if(l)return;let m=Pr(t);f&&(m.x!==f.x||m.y!==f.y||m.width!==f.width||m.height!==f.height)&&r(),f=m,g=requestAnimationFrame(v)}return()=>{var m;l=!0,h.forEach(y=>{u&&y.removeEventListener("scroll",r),c&&y.removeEventListener("resize",r)}),(m=p)==null||m.disconnect(),p=null,s&&cancelAnimationFrame(g)}}var $i=(t,e,r)=>qf(t,e,Be({platform:gp},r));function We(t,e,r){return new Promise(a=>{if((r==null?void 0:r.duration)===1/0)throw new Error("Promise-based animations must be finite.");let n=t.animate(e,xt(Be({},r),{duration:mp()?0:r.duration}));n.addEventListener("cancel",a,{once:!0}),n.addEventListener("finish",a,{once:!0})})}function is(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function mp(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function at(t){return Promise.all(t.getAnimations().map(e=>new Promise(r=>{let a=requestAnimationFrame(r);e.addEventListener("cancel",()=>a,{once:!0}),e.addEventListener("finish",()=>a,{once:!0}),e.cancel()})))}function os(t,e){return t.map(r=>xt(Be({},r),{height:r.height==="auto"?`${e}px`:r.height}))}var iu=new Map,yp=new WeakMap;function bp(t){return t??{keyframes:[],options:{duration:0}}}function Ne(t,e){iu.set(t,bp(e))}function Je(t,e){let r=yp.get(t);if(r==null?void 0:r[e])return r[e];let a=iu.get(e);return a||{keyframes:[],options:{duration:0}}}var vt=class extends re{constructor(){super(...arguments);this.content="",this.placement="top",this.disabled=!1,this.distance=10,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then(()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),this.target=this.getTarget()})}async firstUpdated(){this.tooltip.hidden=!this.open,this.open&&(await this.updateComplete,this.updatePositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.stopPositioner()}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}getTarget(){let t=[...this.children].find(e=>e.tagName.toLowerCase()!=="style"&&e.getAttribute("slot")!=="content");if(!t)throw new Error("Invalid tooltip target: no child element was found.");return t}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(t){this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){let t=is(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>void this.show(),t)}}handleMouseOut(){if(this.hasTrigger("hover")){let t=is(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>void this.hide(),t)}}async handleOpenChange(){if(!this.disabled)if(this.open){ee(this,"sl-show"),await at(this.tooltip),this.startPositioner(),this.tooltip.hidden=!1;let{keyframes:t,options:e}=Je(this,"tooltip.show");await We(this.tooltip,t,e),ee(this,"sl-after-show")}else{ee(this,"sl-hide"),await at(this.tooltip);let{keyframes:t,options:e}=Je(this,"tooltip.hide");await We(this.tooltip,t,e),this.tooltip.hidden=!0,this.stopPositioner(),ee(this,"sl-after-hide")}}handleOptionsChange(){this.updatePositioner()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}hasTrigger(t){return this.trigger.split(" ").includes(t)}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Oi(this.target,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){!this.open||!this.target||!this.positioner||$i(this.target,this.positioner,{placement:this.placement,middleware:[Si({mainAxis:this.distance,crossAxis:this.skidding}),Ei(),Ti(),ql({element:this.arrow,padding:10})],strategy:this.hoist?"fixed":"absolute"}).then(({x:t,y:e,middlewareData:r,placement:a})=>{let n=r.arrow.x,o=r.arrow.y,i={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];this.positioner.setAttribute("data-placement",a),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${e}px`}),Object.assign(this.arrow.style,{left:typeof n=="number"?`${n}px`:"",top:typeof o=="number"?`${o}px`:"",right:"",bottom:"",[i]:"calc(var(--sl-tooltip-arrow-size) * -1)"})})}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return q`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${ge({tooltip:!0,"tooltip--open":this.open})}
          role="tooltip"
          aria-hidden=${this.open?"false":"true"}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content">
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `}};vt.styles=Yl;w([ue(".tooltip-positioner")],vt.prototype,"positioner",2);w([ue(".tooltip")],vt.prototype,"tooltip",2);w([ue(".tooltip__arrow")],vt.prototype,"arrow",2);w([S()],vt.prototype,"content",2);w([S()],vt.prototype,"placement",2);w([S({type:Boolean,reflect:!0})],vt.prototype,"disabled",2);w([S({type:Number})],vt.prototype,"distance",2);w([S({type:Boolean,reflect:!0})],vt.prototype,"open",2);w([S({type:Number})],vt.prototype,"skidding",2);w([S()],vt.prototype,"trigger",2);w([S({type:Boolean})],vt.prototype,"hoist",2);w([ae("open",{waitUntilFirstUpdate:!0})],vt.prototype,"handleOpenChange",1);w([ae("content"),ae("distance"),ae("hoist"),ae("placement"),ae("skidding")],vt.prototype,"handleOptionsChange",1);w([ae("disabled")],vt.prototype,"handleDisabledChange",1);vt=w([ne("sl-tooltip")],vt);Ne("tooltip.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:150,easing:"ease"}});Ne("tooltip.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:150,easing:"ease"}});var Pn=(()=>{let t=document.createElement("style"),e;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),e=!0}catch{e=!1}finally{t.remove()}return e})(),xe=Ho(Pn?":focus-visible":":focus");var ou=oe`
  ${le}

  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider${xe} {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }
`;function Yr(t,e){function r(n){let o=t.getBoundingClientRect(),i=t.ownerDocument.defaultView,s=o.left+i.pageXOffset,l=o.top+i.pageYOffset,u=n.pageX-s,c=n.pageY-l;e(u,c)}function a(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",a)}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",a)}function it(t,e,r){return t<e?e:t>r?r:t}var ss=new Set,wp=new MutationObserver(su),ls=new Map,An=document.documentElement.lang||navigator.language,Ln;wp.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]});function xp(...t){t.map(e=>{let r=e.$code.toLowerCase();ls.set(r,e),Ln||(Ln=e)}),su()}function kp(t,e,...r){let a=t.toLowerCase().slice(0,2),n=t.length>2?t.toLowerCase():"",o=ls.get(n),i=ls.get(a),s;if(o&&o[e])s=o[e];else if(i&&i[e])s=i[e];else if(Ln&&Ln[e])s=Ln[e];else return console.error(`No translation found for: ${e}`),e;return typeof s=="function"?s(...r):s}function _p(t,e,r){return e=new Date(e),new Intl.DateTimeFormat(t,r).format(e)}function Cp(t,e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(t,r).format(e)}function Ep(t,e,r,a){return new Intl.RelativeTimeFormat(t,a).format(e,r)}function su(){An=document.documentElement.lang||navigator.language,[...ss.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var et=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){ss.add(this.host)}hostDisconnected(){ss.delete(this.host)}term(t,...e){return kp(this.host.lang||An,t,...e)}date(t,e){return _p(this.host.lang||An,t,e)}number(t,e){return Cp(this.host.lang||An,t,e)}relativeTime(t,e,r){return Ep(this.host.lang||An,t,e,r)}},Sp={$code:"en",$name:"English",$dir:"ltr",close:"Close",copy:"Copy",progress:"Progress",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",toggleColorFormat:"Toggle color format"};xp(Sp);var Vt=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.position=50,this.vertical=!1,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}detectSize(){let{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){this.disabled||(t.preventDefault(),Yr(this,(e,r)=>{let a=this.vertical?r:e;this.primary==="end"&&(a=this.size-a),this.snap&&this.snap.split(" ").forEach(o=>{let i;o.endsWith("%")?i=this.size*(parseFloat(o)/100):i=parseFloat(o),a>=i-this.snapThreshold&&a<=i+this.snapThreshold&&(a=i)}),this.position=it(this.pixelsToPercentage(a),0,100)}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){let e=this.position,r=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(e-=r),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(e+=r),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),this.position=it(e,0,100)}}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),ee(this,"sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleResize(t){let{width:e,height:r}=t[0].contentRect;this.size=this.vertical?r:e,this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,r="auto";return this.primary==="end"?this.style[t]=`${r} var(--divider-width) ${e}`:this.style[t]=`${e} var(--divider-width) ${r}`,q`
      <div part="panel start" class="start">
        <slot name="start"></slot>
      </div>

      <div
        part="divider"
        class="divider"
        tabindex=${he(this.disabled?void 0:"0")}
        role="separator"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="handle"></slot>
      </div>

      <div part="panel end" class="end">
        <slot name="end"></slot>
      </div>
    `}};Vt.styles=ou;w([ue(".divider")],Vt.prototype,"divider",2);w([S({type:Number,reflect:!0})],Vt.prototype,"position",2);w([S({attribute:"position-in-pixels",type:Number})],Vt.prototype,"positionInPixels",2);w([S({type:Boolean,reflect:!0})],Vt.prototype,"vertical",2);w([S({type:Boolean,reflect:!0})],Vt.prototype,"disabled",2);w([S()],Vt.prototype,"primary",2);w([S()],Vt.prototype,"snap",2);w([S({type:Number,attribute:"snap-threshold"})],Vt.prototype,"snapThreshold",2);w([ae("position")],Vt.prototype,"handlePositionChange",1);w([ae("positionInPixels")],Vt.prototype,"handlePositionInPixelsChange",1);Vt=w([ne("sl-split-panel")],Vt);var lu=oe`
  ${le}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    transform: translateX(calc((var(--width) - var(--height)) / -2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input${xe} ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled)
    .switch__input${xe}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    transform: translateX(calc((var(--width) - var(--height)) / 2));
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input${xe} ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled)
    .switch__input${xe}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`;var jt=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this,{value:t=>t.checked?t.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleCheckedChange(){this.input.checked=this.checked,this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,ee(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,ee(this,"sl-change")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,ee(this,"sl-change"))}render(){return q`
      <label
        part="base"
        class=${ge({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus})}
      >
        <input
          class="switch__input"
          type="checkbox"
          name=${he(this.name)}
          value=${he(this.value)}
          .checked=${$t(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" class="switch__label">
          <slot></slot>
        </span>
      </label>
    `}};jt.styles=lu;w([ue('input[type="checkbox"]')],jt.prototype,"input",2);w([Se()],jt.prototype,"hasFocus",2);w([S()],jt.prototype,"name",2);w([S()],jt.prototype,"value",2);w([S({type:Boolean,reflect:!0})],jt.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],jt.prototype,"required",2);w([S({type:Boolean,reflect:!0})],jt.prototype,"checked",2);w([S({type:Boolean,reflect:!0})],jt.prototype,"invalid",2);w([ae("checked",{waitUntilFirstUpdate:!0})],jt.prototype,"handleCheckedChange",1);w([ae("disabled",{waitUntilFirstUpdate:!0})],jt.prototype,"handleDisabledChange",1);jt=w([ne("sl-switch")],jt);var uu=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab${xe}:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
    box-shadow: inset var(--sl-focus-ring);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-right: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-large);
    margin-left: var(--sl-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }
`;var yr=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.attrId=wi(),this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}handleCloseClick(){ee(this,"sl-close")}render(){return this.id=this.id.length>0?this.id:this.componentId,q`
      <div
        part="base"
        class=${ge({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        role="tab"
        aria-disabled=${this.disabled?"true":"false"}
        aria-selected=${this.active?"true":"false"}
        tabindex=${this.disabled||!this.active?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?q`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};yr.styles=uu;w([ue(".tab")],yr.prototype,"tab",2);w([S({reflect:!0})],yr.prototype,"panel",2);w([S({type:Boolean,reflect:!0})],yr.prototype,"active",2);w([S({type:Boolean})],yr.prototype,"closable",2);w([S({type:Boolean,reflect:!0})],yr.prototype,"disabled",2);w([S()],yr.prototype,"lang",2);yr=w([ne("sl-tab")],yr);var cu=oe`
  ${le}

  :host {
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: block;
  }

  .tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
  }

  .tab-group .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid 2px var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid 2px var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-right: solid 2px var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid 2px var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;function Tp(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var us=new Set;function Qa(t){us.add(t),document.body.classList.add("sl-scroll-lock")}function Ya(t){us.delete(t),us.size===0&&document.body.classList.remove("sl-scroll-lock")}function In(t,e,r="vertical",a="smooth"){let n=Tp(t,e),o=n.top+e.scrollTop,i=n.left+e.scrollLeft,s=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,u=e.scrollTop,c=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(i<s?e.scrollTo({left:i,behavior:a}):i+t.clientWidth>l&&e.scrollTo({left:i-e.offsetWidth+t.clientWidth,behavior:a})),(r==="vertical"||r==="both")&&(o<u?e.scrollTo({top:o,behavior:a}):o+t.clientHeight>c&&e.scrollTo({top:o-e.offsetHeight+t.clientHeight,behavior:a}))}var Bt=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.preventIndicatorTransition(),this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(e=>!["aria-labelledby","aria-controls"].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels()),t.some(e=>e.attributeName==="disabled")&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,r)=>{var a;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((a=this.getActiveTab())!=null?a:this.tabs[0],{emitEvents:!1}),r.unobserve(e[0].target))}).observe(this.tabGroup)})}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}show(t){let e=this.tabs.find(r=>r.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}getAllTabs(t=!1){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(r=>t?r.tagName.toLowerCase()==="sl-tab":r.tagName.toLowerCase()==="sl-tab"&&!r.disabled)}getAllPanels(){return[...this.body.querySelector("slot").assignedElements()].filter(e=>e.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let r=t.target.closest("sl-tab");(r==null?void 0:r.closest("sl-tab-group"))===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"})}handleKeyDown(t){let r=t.target.closest("sl-tab");if((r==null?void 0:r.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let n=document.activeElement;if((n==null?void 0:n.tagName.toLowerCase())==="sl-tab"){let o=this.tabs.indexOf(n);t.key==="Home"?o=0:t.key==="End"?o=this.tabs.length-1:["top","bottom"].includes(this.placement)&&t.key==="ArrowLeft"||["start","end"].includes(this.placement)&&t.key==="ArrowUp"?o=Math.max(0,o-1):(["top","bottom"].includes(this.placement)&&t.key==="ArrowRight"||["start","end"].includes(this.placement)&&t.key==="ArrowDown")&&(o=Math.min(this.tabs.length-1,o+1)),this.tabs[o].focus({preventScroll:!0}),this.activation==="auto"&&this.setActiveTab(this.tabs[o],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&In(this.tabs[o],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}setActiveTab(t,e){if(e=Be({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){let r=this.activeTab;this.activeTab=t,this.tabs.map(a=>a.active=a===this.activeTab),this.panels.map(a=>{var n;return a.active=a.name===((n=this.activeTab)==null?void 0:n.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&In(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&ee(this,"sl-tab-hide",{detail:{name:r.panel}}),ee(this,"sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{let e=this.panels.find(r=>r.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let e=t.clientWidth,r=t.clientHeight,a=this.getAllTabs(!0),o=a.slice(0,a.indexOf(t)).reduce((i,s)=>({left:i.left+s.clientWidth,top:i.top+s.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.transform=`translateX(${o.left}px)`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.transform=`translateY(${o.top}px)`;break}}preventIndicatorTransition(){let t=this.indicator.style.transition;this.indicator.style.transition="none",requestAnimationFrame(()=>{this.indicator.style.transition=t})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.panels=this.getAllPanels(),this.syncIndicator()}render(){return q`
      <div
        part="base"
        class=${ge({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?q`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name="chevron-left"
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?q`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name="chevron-right"
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `}};Bt.styles=cu;w([ue(".tab-group")],Bt.prototype,"tabGroup",2);w([ue(".tab-group__body")],Bt.prototype,"body",2);w([ue(".tab-group__nav")],Bt.prototype,"nav",2);w([ue(".tab-group__indicator")],Bt.prototype,"indicator",2);w([Se()],Bt.prototype,"hasScrollControls",2);w([S()],Bt.prototype,"placement",2);w([S()],Bt.prototype,"activation",2);w([S({attribute:"no-scroll-controls",type:Boolean})],Bt.prototype,"noScrollControls",2);w([S()],Bt.prototype,"lang",2);w([ae("noScrollControls",{waitUntilFirstUpdate:!0})],Bt.prototype,"updateScrollControls",1);w([ae("placement",{waitUntilFirstUpdate:!0})],Bt.prototype,"syncIndicator",1);Bt=w([ne("sl-tab-group")],Bt);var du=oe`
  ${le}

  :host {
    display: block;
  }

  .responsive-media {
    position: relative;
  }

  .responsive-media ::slotted(*) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .responsive-media--cover ::slotted(embed),
  .responsive-media--cover ::slotted(iframe),
  .responsive-media--cover ::slotted(img),
  .responsive-media--cover ::slotted(video) {
    object-fit: cover !important;
  }

  .responsive-media--contain ::slotted(embed),
  .responsive-media--contain ::slotted(iframe),
  .responsive-media--contain ::slotted(img),
  .responsive-media--contain ::slotted(video) {
    object-fit: contain !important;
  }
`;var Xa=class extends re{constructor(){super(...arguments);this.aspectRatio="16:9",this.fit="cover"}render(){let t=this.aspectRatio.split(":"),e=parseFloat(t[0]),r=parseFloat(t[1]),a=!isNaN(e)&&!isNaN(r)&&e>0&&r>0?`${r/e*100}%`:"0";return q`
      <div
        class=${ge({"responsive-media":!0,"responsive-media--cover":this.fit==="cover","responsive-media--contain":this.fit==="contain"})}
        style="padding-bottom: ${a}"
      >
        <slot></slot>
      </div>
    `}};Xa.styles=du;w([S({attribute:"aspect-ratio"})],Xa.prototype,"aspectRatio",2);w([S()],Xa.prototype,"fit",2);Xa=w([ne("sl-responsive-media")],Xa);var hu=oe`
  ${le}
  ${jr}

  :host {
    display: block;
  }

  .select {
    display: block;
  }

  .select__control {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .select__menu {
    max-height: 50vh;
    overflow: auto;
  }

  /* Standard selects */
  .select--standard .select__control {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    color: var(--sl-input-color);
  }

  .select--standard:not(.select--disabled) .select__control:hover {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
    color: var(--sl-input-color-hover);
  }

  .select--standard.select--focused:not(.select--disabled) .select__control {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    outline: none;
    color: var(--sl-input-color-focus);
  }

  .select--standard.select--disabled .select__control {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  /* Filled selects */
  .select--filled .select__control {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__control {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--focused:not(.select--disabled) .select__control {
    outline: none;
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .select--filled.select--disabled .select__control {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .select__label::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .select__clear {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    width: 1.25em;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: var(--sl-transition-medium) transform ease;
  }

  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color);
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: var(--sl-spacing-2x-small);
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /*
   * Size modifiers
   */

  /* Small */
  .select--small .select__control {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
  }

  .select--small .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .select--small .select__label {
    margin: 0 var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__icon {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__tags {
    padding-bottom: 2px;
  }

  .select--small .select__tags sl-tag {
    padding-top: 2px;
  }

  .select--small .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */
  .select--medium .select__control {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
  }

  .select--medium .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .select--medium .select__label {
    margin: 0 var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__icon {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__tags {
    padding-bottom: 3px;
  }

  .select--medium .select__tags sl-tag {
    padding-top: 3px;
  }

  .select--medium .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Large */
  .select--large .select__control {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
  }

  .select--large .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .select--large .select__label {
    margin: 0 var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__icon {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags sl-tag {
    padding-top: 4px;
  }

  .select--large .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--large.select--has-tags .select__label {
    margin-left: 0;
  }

  /*
   * Pill modifier
   */
  .select--pill.select--small .select__control {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__control {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__control {
    border-radius: var(--sl-input-height-large);
  }
`;var Re=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this),this.hasSlotController=new lt(this,"help-text","label"),this.hasFocus=!1,this.isOpen=!1,this.displayLabel="",this.displayTags=[],this.multiple=!1,this.maxTagsVisible=3,this.disabled=!1,this.name="",this.placeholder="",this.size="medium",this.hoist=!1,this.value="",this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.required=!1,this.clearable=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.handleMenuSlotChange=this.handleMenuSlotChange.bind(this),this.resizeObserver=new ResizeObserver(()=>this.resizeMenu()),this.updateComplete.then(()=>{this.resizeObserver.observe(this),this.syncItemsFromValue()})}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}getItemLabel(t){let e=t.shadowRoot.querySelector("slot:not([name])");return xi(e)}getItems(){return[...this.querySelectorAll("sl-menu-item")]}getValueAsArray(){return this.multiple&&this.value===""?[]:Array.isArray(this.value)?this.value:[this.value]}focus(t){this.control.focus(t)}blur(){this.control.blur()}handleBlur(){this.isOpen||(this.hasFocus=!1,ee(this,"sl-blur"))}handleClearClick(t){t.stopPropagation(),this.value=this.multiple?[]:"",ee(this,"sl-clear"),this.syncItemsFromValue()}handleDisabledChange(){this.disabled&&this.isOpen&&this.dropdown.hide(),this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus||(this.hasFocus=!0,ee(this,"sl-focus"))}handleKeyDown(t){let e=t.target,r=this.getItems(),a=r[0],n=r[r.length-1];if(e.tagName.toLowerCase()!=="sl-tag"){if(t.key==="Tab"){this.isOpen&&this.dropdown.hide();return}if(["ArrowDown","ArrowUp"].includes(t.key)){if(t.preventDefault(),this.isOpen||this.dropdown.show(),t.key==="ArrowDown"){this.menu.setCurrentItem(a),a.focus();return}if(t.key==="ArrowUp"){this.menu.setCurrentItem(n),n.focus();return}}t.ctrlKey||t.metaKey||!this.isOpen&&t.key.length===1&&(t.stopPropagation(),t.preventDefault(),this.dropdown.show(),this.menu.typeToSelect(t))}}handleLabelClick(){this.focus()}handleMenuSelect(t){let e=t.detail.item;this.multiple?this.value=this.value.includes(e.value)?this.value.filter(r=>r!==e.value):[...this.value,e.value]:this.value=e.value,this.syncItemsFromValue()}handleMenuShow(){this.resizeMenu(),this.isOpen=!0}handleMenuHide(){this.isOpen=!1,this.control.focus()}handleMultipleChange(){var t;let e=this.getValueAsArray();this.value=this.multiple?e:(t=e[0])!=null?t:"",this.syncItemsFromValue()}async handleMenuSlotChange(){let t=this.getItems(),e=[];t.forEach(r=>{e.includes(r.value)&&console.error(`Duplicate value found in <sl-select> menu item: '${r.value}'`,r),e.push(r.value)}),await Promise.all(t.map(r=>r.render)).then(()=>this.syncItemsFromValue())}handleTagInteraction(t){t.composedPath().find(a=>a instanceof HTMLElement?a.classList.contains("tag__remove"):!1)&&t.stopPropagation()}async handleValueChange(){this.syncItemsFromValue(),await this.updateComplete,this.invalid=!this.input.checkValidity(),ee(this,"sl-change")}resizeMenu(){this.menu.style.width=`${this.control.clientWidth}px`,this.dropdown.reposition()}syncItemsFromValue(){let t=this.getItems(),e=this.getValueAsArray();if(t.map(r=>r.checked=e.includes(r.value)),this.multiple){let r=t.filter(a=>e.includes(a.value));if(this.displayLabel=r.length>0?this.getItemLabel(r[0]):"",this.displayTags=r.map(a=>q`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-remove=${n=>{n.stopPropagation(),this.disabled||(a.checked=!1,this.syncValueFromItems())}}
          >
            ${this.getItemLabel(a)}
          </sl-tag>
        `),this.maxTagsVisible>0&&this.displayTags.length>this.maxTagsVisible){let a=this.displayTags.length;this.displayLabel="",this.displayTags=this.displayTags.slice(0,this.maxTagsVisible),this.displayTags.push(q`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
          >
            +${a-this.maxTagsVisible}
          </sl-tag>
        `)}}else{let r=t.find(a=>a.value===e[0]);this.displayLabel=r?this.getItemLabel(r):"",this.displayTags=[]}}syncValueFromItems(){let r=this.getItems().filter(a=>a.checked).map(a=>a.value);this.multiple?this.value=this.value.filter(a=>r.includes(a)):this.value=r.length>0?r[0]:""}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.multiple?this.value.length>0:this.value!=="",a=this.label?!0:!!t,n=this.helpText?!0:!!e;return q`
      <div
        part="form-control"
        class=${ge({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":a,"form-control--has-help-text":n})}
      >
        <label
          part="label"
          class="form-control__label"
          for="input"
          aria-hidden=${a?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div class="form-control__input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this}
            ?disabled=${this.disabled}
            class=${ge({select:!0,"select--open":this.isOpen,"select--empty":this.value.length===0,"select--focused":this.hasFocus,"select--clearable":this.clearable,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--standard":!this.filled,"select--filled":this.filled,"select--has-tags":this.multiple&&this.displayTags.length>0,"select--placeholder-visible":this.displayLabel==="","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large","select--pill":this.pill,"select--invalid":this.invalid})}
            @sl-show=${this.handleMenuShow}
            @sl-hide=${this.handleMenuHide}
          >
            <div
              part="control"
              slot="trigger"
              id="input"
              class="select__control"
              role="combobox"
              aria-describedby="help-text"
              aria-haspopup="true"
              aria-expanded=${this.isOpen?"true":"false"}
              aria-controls="menu"
              tabindex=${this.disabled?"-1":"0"}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${this.displayTags.length>0?q` <span part="tags" class="select__tags"> ${this.displayTags} </span> `:this.displayLabel.length>0?this.displayLabel:this.placeholder}
              </div>

              ${this.clearable&&r?q`
                    <button part="clear-button" class="select__clear" @click=${this.handleClearClick} tabindex="-1">
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <span part="suffix" class="select__suffix">
                <slot name="suffix"></slot>
              </span>

              <span part="icon" class="select__icon" aria-hidden="true">
                <sl-icon name="chevron-down" library="system"></sl-icon>
              </span>

              <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
              instead of a select because, otherwise, iOS will show a list of options during validation. The focus
              handler is used to move focus to the primary control when it's marked invalid.  -->
              <input
                class="select__hidden-select"
                aria-hidden="true"
                ?required=${this.required}
                .value=${r?"1":""}
                tabindex="-1"
                @focus=${()=>this.control.focus()}
              />
            </div>

            <sl-menu part="menu" id="menu" class="select__menu" @sl-select=${this.handleMenuSelect}>
              <slot @slotchange=${this.handleMenuSlotChange}></slot>
            </sl-menu>
          </sl-dropdown>
        </div>

        <div
          part="help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Re.styles=hu;w([ue(".select")],Re.prototype,"dropdown",2);w([ue(".select__control")],Re.prototype,"control",2);w([ue(".select__hidden-select")],Re.prototype,"input",2);w([ue(".select__menu")],Re.prototype,"menu",2);w([Se()],Re.prototype,"hasFocus",2);w([Se()],Re.prototype,"isOpen",2);w([Se()],Re.prototype,"displayLabel",2);w([Se()],Re.prototype,"displayTags",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"multiple",2);w([S({attribute:"max-tags-visible",type:Number})],Re.prototype,"maxTagsVisible",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"disabled",2);w([S()],Re.prototype,"name",2);w([S()],Re.prototype,"placeholder",2);w([S()],Re.prototype,"size",2);w([S({type:Boolean})],Re.prototype,"hoist",2);w([S()],Re.prototype,"value",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"filled",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"pill",2);w([S()],Re.prototype,"label",2);w([S()],Re.prototype,"placement",2);w([S({attribute:"help-text"})],Re.prototype,"helpText",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"required",2);w([S({type:Boolean})],Re.prototype,"clearable",2);w([S({type:Boolean,reflect:!0})],Re.prototype,"invalid",2);w([ae("disabled",{waitUntilFirstUpdate:!0})],Re.prototype,"handleDisabledChange",1);w([ae("multiple")],Re.prototype,"handleMultipleChange",1);w([ae("value",{waitUntilFirstUpdate:!0})],Re.prototype,"handleValueChange",1);Re=w([ne("sl-select")],Re);var fu=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    font-size: 1.4em;
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var Xr=class extends re{constructor(){super(...arguments);this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){ee(this,"sl-remove")}render(){return q`
      <span
        part="base"
        class=${ge({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.removable?q`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x"
                library="system"
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            `:""}
      </span>
    `}};Xr.styles=fu;w([S({reflect:!0})],Xr.prototype,"variant",2);w([S({reflect:!0})],Xr.prototype,"size",2);w([S({type:Boolean,reflect:!0})],Xr.prototype,"pill",2);w([S({type:Boolean})],Xr.prototype,"removable",2);Xr=w([ne("sl-tag")],Xr);var pu=oe`
  ${le}

  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;var On=class extends re{constructor(){super(...arguments);this.effect="none"}render(){return q`
      <div
        part="base"
        class=${ge({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};On.styles=pu;w([S()],On.prototype,"effect",2);On=w([ne("sl-skeleton")],On);var vu=oe`
  ${le}
  ${jr}

  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${xe}::-webkit-slider-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${xe}::-moz-range-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control${xe} {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 1px;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    margin-left: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`;var ot=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this),this.hasSlotController=new lt(this,"help-text","label"),this.hasFocus=!1,this.hasTooltip=!1,this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.invalid=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString()}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value||(this.value=this.min),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(t){this.input.focus(t)}blur(){this.input.blur()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleInput(){this.value=parseFloat(this.input.value),ee(this,"sl-change"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,ee(this,"sl-blur")}handleValueChange(){this.invalid=!this.input.checkValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,ee(this,"sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.syncTooltip(t)}syncProgress(t){this.input.style.background=`linear-gradient(to right, var(--track-color-active) 0%, var(--track-color-active) ${t*100}%, var(--track-color-inactive) ${t*100}%, var(--track-color-inactive) 100%)`}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,r=this.output.offsetWidth,a=getComputedStyle(this.input).getPropertyValue("--thumb-size"),n=`calc(${e*t}px - calc(calc(${t} * ${a}) - calc(${a} / 2)))`;this.output.style.transform=`translateX(${n})`,this.output.style.marginLeft=`-${r/2}px`}}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,a=this.helpText?!0:!!e;return q`
      <div
        part="form-control"
        class=${ge({"form-control":!0,"form-control--medium":!0,"form-control--has-label":r,"form-control--has-help-text":a})}
      >
        <label part="label" class="form-control__label" for="input" aria-hidden=${r?"false":"true"}>
          <slot name="label">${this.label}</slot>
        </label>

        <div class="form-control__input">
          <div
            part="base"
            class=${ge({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              type="range"
              class="range__control"
              name=${he(this.name)}
              ?disabled=${this.disabled}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${$t(this.value.toString())}
              aria-describedby="help-text"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?q`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${a?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ot.styles=vu;w([ue(".range__control")],ot.prototype,"input",2);w([ue(".range__tooltip")],ot.prototype,"output",2);w([Se()],ot.prototype,"hasFocus",2);w([Se()],ot.prototype,"hasTooltip",2);w([S()],ot.prototype,"name",2);w([S({type:Number})],ot.prototype,"value",2);w([S()],ot.prototype,"label",2);w([S({attribute:"help-text"})],ot.prototype,"helpText",2);w([S({type:Boolean,reflect:!0})],ot.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],ot.prototype,"invalid",2);w([S({type:Number})],ot.prototype,"min",2);w([S({type:Number})],ot.prototype,"max",2);w([S({type:Number})],ot.prototype,"step",2);w([S()],ot.prototype,"tooltip",2);w([S({attribute:!1})],ot.prototype,"tooltipFormatter",2);w([ae("value",{waitUntilFirstUpdate:!0})],ot.prototype,"handleValueChange",1);w([ae("disabled",{waitUntilFirstUpdate:!0})],ot.prototype,"handleDisabledChange",1);ot=w([ne("sl-range")],ot);var gu=oe`
  ${le}

  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating${xe} {
    box-shadow: var(--sl-focus-ring);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) transform;
  }

  .rating__symbol--hover {
    transform: scale(1.2);
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    transform: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }
`;var gt=Tr(class extends Kr{constructor(t){var e;if(super(t),t.type!==Ut.ATTRIBUTE||t.name!=="style"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{let a=t[r];return a==null?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){let{style:r}=t.element;if(this.ct===void 0){this.ct=new Set;for(let a in e)this.ct.add(a);return this.render(e)}this.ct.forEach(a=>{e[a]==null&&(this.ct.delete(a),a.includes("-")?r.removeProperty(a):r[a]="")});for(let a in e){let n=e[a];n!=null&&(this.ct.add(a),a.includes("-")?r.setProperty(a,n):r[a]=n)}return wt}});var mu="";function cs(t){mu=t}function ds(){return mu.replace(/\/$/,"")}var yu=[...document.getElementsByTagName("script")],bu=yu.find(t=>t.hasAttribute("data-shoelace"));if(bu)cs(bu.getAttribute("data-shoelace"));else{let t=yu.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)),e="";t&&(e=t.getAttribute("src")),cs(e.split("/").slice(0,-1).join("/"))}var Dp={name:"default",resolver:t=>`${ds()}/assets/icons/${t}.svg`},wu=Dp;var xu={"check-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,x:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Pp={name:"system",resolver:t=>t in xu?`data:image/svg+xml,${encodeURIComponent(xu[t])}`:""},ku=Pp;var Bi=[wu,ku],zi=[];function _u(t){zi.push(t)}function Cu(t){zi=zi.filter(e=>e!==t)}function hs(t){return Bi.find(e=>e.name===t)}function Mi(t,e){fs(t),Bi.push({name:t,resolver:e.resolver,mutator:e.mutator}),zi.forEach(r=>{r.library===t&&r.redraw()})}function fs(t){Bi=Bi.filter(e=>e.name!==t)}var ps=new Map;function Ri(t,e="cors"){if(ps.has(t))return ps.get(t);let r=fetch(t,{mode:e}).then(async a=>({ok:a.ok,status:a.status,html:await a.text()}));return ps.set(t,r),r}var vs=new Map;async function Eu(t){if(vs.has(t))return vs.get(t);let e=await Ri(t),r={ok:e.ok,status:e.status,svg:null};if(e.ok){let a=document.createElement("div");a.innerHTML=e.html;let n=a.firstElementChild;r.svg=(n==null?void 0:n.tagName.toLowerCase())==="svg"?n.outerHTML:""}return vs.set(t,r),r}var Su=oe`
  ${le}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var Fi=class extends Kr{constructor(t){if(super(t),this.it=qe,t.type!==Ut.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===qe||t==null)return this.vt=void 0,this.it=t;if(t===wt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;let e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Fi.directiveName="unsafeHTML",Fi.resultType=1;var gs=Tr(Fi),ms=class extends Fi{};ms.directiveName="unsafeSVG",ms.resultType=2;var Ap=Tr(ms),Lp=new DOMParser,br=class extends re{constructor(){super(...arguments);this.svg="",this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),_u(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Cu(this)}getUrl(){let t=hs(this.library);return this.name&&t?t.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var t;let e=hs(this.library),r=this.getUrl();if(r)try{let a=await Eu(r);if(r!==this.getUrl())return;if(a.ok){let o=Lp.parseFromString(a.svg,"text/html").body.querySelector("svg");o!==null?((t=e==null?void 0:e.mutator)==null||t.call(e,o),this.svg=o.outerHTML,ee(this,"sl-load")):(this.svg="",ee(this,"sl-error",{detail:{status:a.status}}))}else this.svg="",ee(this,"sl-error",{detail:{status:a.status}})}catch{ee(this,"sl-error",{detail:{status:-1}})}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){let t=typeof this.label=="string"&&this.label.length>0;return q` <div
      part="base"
      class="icon"
      role=${he(t?"img":void 0)}
      aria-label=${he(t?this.label:void 0)}
      aria-hidden=${he(t?void 0:"true")}
    >
      ${Ap(this.svg)}
    </div>`}};br.styles=Su;w([Se()],br.prototype,"svg",2);w([S()],br.prototype,"name",2);w([S()],br.prototype,"src",2);w([S()],br.prototype,"label",2);w([S()],br.prototype,"library",2);w([ae("name"),ae("src"),ae("library")],br.prototype,"setIcon",1);br=w([ne("sl-icon")],br);var Kt=class extends re{constructor(){super(...arguments);this.hoverValue=0,this.isHovering=!1,this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let e=this.rating.getBoundingClientRect().left,r=this.rating.getBoundingClientRect().width;return it(this.roundToPrecision((t-e)/r*this.max,this.precision),0,this.max)}handleClick(t){this.setValue(this.getValueFromMousePosition(t))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){if(!(this.disabled||this.readonly)){if(t.key==="ArrowLeft"){let e=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-e),t.preventDefault()}if(t.key==="ArrowRight"){let e=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+e),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault())}}handleMouseEnter(){this.isHovering=!0}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),t.preventDefault()}handleValueChange(){ee(this,"sl-change")}roundToPrecision(t,e=.5){let r=1/e;return Math.ceil(t*r)/r}render(){let t=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,q`
      <div
        part="base"
        class=${ge({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${t.map(r=>q`
              <span
                class=${ge({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1})}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${gs(this.getSymbol(r+1))}
              </span>
            `)}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${t.map(r=>q`
              <span
                class=${ge({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1})}
                style=${gt({clipPath:e>r+1?"none":`inset(0 ${100-(e-r)/1*100}% 0 0)`})}
                role="presentation"
              >
                ${gs(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};Kt.styles=gu;w([ue(".rating")],Kt.prototype,"rating",2);w([Se()],Kt.prototype,"hoverValue",2);w([Se()],Kt.prototype,"isHovering",2);w([S({type:Number})],Kt.prototype,"value",2);w([S({type:Number})],Kt.prototype,"max",2);w([S({type:Number})],Kt.prototype,"precision",2);w([S({type:Boolean,reflect:!0})],Kt.prototype,"readonly",2);w([S({type:Boolean,reflect:!0})],Kt.prototype,"disabled",2);w([S()],Kt.prototype,"getSymbol",2);w([ae("value",{waitUntilFirstUpdate:!0})],Kt.prototype,"handleValueChange",1);Kt=w([ne("sl-rating")],Kt);var Ip=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],cr=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.isoTime="",this.relativeTime="",this.titleTime="",this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){let t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";let r=e.getTime()-t.getTime(),{unit:a,value:n}=Ip.find(o=>Math.abs(r)<o.max);if(this.isoTime=e.toISOString(),this.titleTime=this.localize.date(e,{month:"long",year:"numeric",day:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"}),this.relativeTime=this.localize.relativeTime(Math.round(r/n),a,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let o;a==="minute"?o=Ni("second"):a==="hour"?o=Ni("minute"):a==="day"?o=Ni("hour"):o=Ni("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),o)}return q` <time datetime=${this.isoTime} title=${this.titleTime}>${this.relativeTime}</time> `}};w([Se()],cr.prototype,"isoTime",2);w([Se()],cr.prototype,"relativeTime",2);w([Se()],cr.prototype,"titleTime",2);w([S()],cr.prototype,"date",2);w([S()],cr.prototype,"lang",2);w([S()],cr.prototype,"format",2);w([S()],cr.prototype,"numeric",2);w([S({type:Boolean})],cr.prototype,"sync",2);cr=w([ne("sl-relative-time")],cr);function Ni(t){let r={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return r-Date.now()%r}var Tu=oe`
  ${le}

  :host {
    display: contents;
  }
`;var Ua=class extends re{constructor(){super(...arguments);this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{ee(this,"sl-resize",{detail:{entries:t}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let e=t.assignedElements({flatten:!0});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],e.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return q` <slot @slotchange=${this.handleSlotChange}></slot> `}};Ua.styles=Tu;w([S({type:Boolean,reflect:!0})],Ua.prototype,"disabled",2);w([ae("disabled",{waitUntilFirstUpdate:!0})],Ua.prototype,"handleDisabledChange",1);Ua=w([ne("sl-resize-observer")],Ua);var Du=oe`
  ${le}

  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    stroke-width: var(--track-width);
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    transition: 0.35s stroke-dashoffset;
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
  }
`;var Ar=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("percentage")){let e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),r=2*Math.PI*e,a=r-this.value/100*r;this.indicatorOffset=`${a}px`}}render(){return q`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `}};Ar.styles=Du;w([ue(".progress-ring__indicator")],Ar.prototype,"indicator",2);w([Se()],Ar.prototype,"indicatorOffset",2);w([S({type:Number,reflect:!0})],Ar.prototype,"value",2);w([S()],Ar.prototype,"label",2);w([S()],Ar.prototype,"lang",2);Ar=w([ne("sl-progress-ring")],Ar);var Pu=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .qr-code {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;var Au=null,Lu=class{};Lu.render=function(t,e){Au(t,e)};self.QrCreator=Lu;(function(t){function e(s,l,u,c){var d={},h=t(u,l);h.u(s),h.J(),c=c||0;var p=h.h(),g=h.h()+2*c;return d.text=s,d.level=l,d.version=u,d.O=g,d.a=function(f,v){return f-=c,v-=c,0>f||f>=p||0>v||v>=p?!1:h.a(f,v)},d}function r(s,l,u,c,d,h,p,g,f,v){function m(y,b,x,k,E,_,T){y?(s.lineTo(b+_,x+T),s.arcTo(b,x,k,E,h)):s.lineTo(b,x)}p?s.moveTo(l+h,u):s.moveTo(l,u),m(g,c,u,c,d,-h,0),m(f,c,d,l,d,0,-h),m(v,l,d,l,u,h,0),m(p,l,u,c,u,0,h)}function a(s,l,u,c,d,h,p,g,f,v){function m(y,b,x,k){s.moveTo(y+x,b),s.lineTo(y,b),s.lineTo(y,b+k),s.arcTo(y,b,y+x,b,h)}p&&m(l,u,h,h),g&&m(c,u,-h,h),f&&m(c,d,-h,-h),v&&m(l,d,h,-h)}function n(s,l){var u=l.fill;if(typeof u=="string")s.fillStyle=u;else{var c=u.type,d=u.colorStops;if(u=u.position.map(p=>Math.round(p*l.size)),c==="linear-gradient")var h=s.createLinearGradient.apply(s,u);else if(c==="radial-gradient")h=s.createRadialGradient.apply(s,u);else throw Error("Unsupported fill");d.forEach(([p,g])=>{h.addColorStop(p,g)}),s.fillStyle=h}}function o(s,l){e:{var u=l.text,c=l.v,d=l.N,h=l.K,p=l.P;for(d=Math.max(1,d||1),h=Math.min(40,h||40);d<=h;d+=1)try{var g=e(u,c,d,p);break e}catch{}g=void 0}if(!g)return null;for(u=s.getContext("2d"),l.background&&(u.fillStyle=l.background,u.fillRect(l.left,l.top,l.size,l.size)),c=g.O,h=l.size/c,u.beginPath(),p=0;p<c;p+=1)for(d=0;d<c;d+=1){var f=u,v=l.left+d*h,m=l.top+p*h,y=p,b=d,x=g.a,k=v+h,E=m+h,_=y-1,T=y+1,C=b-1,D=b+1,L=Math.floor(Math.min(.5,Math.max(0,l.R))*h),A=x(y,b),O=x(_,C),I=x(_,b);_=x(_,D);var N=x(y,D);D=x(T,D),b=x(T,b),T=x(T,C),y=x(y,C),v=Math.round(v),m=Math.round(m),k=Math.round(k),E=Math.round(E),A?r(f,v,m,k,E,L,!I&&!y,!I&&!N,!b&&!N,!b&&!y):a(f,v,m,k,E,L,I&&y&&O,I&&N&&_,b&&N&&D,b&&y&&T)}return n(u,l),u.fill(),s}var i={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Au=function(s,l){var u={};Object.assign(u,i,s),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,l instanceof HTMLCanvasElement?((l.width!==u.size||l.height!==u.size)&&(l.width=u.size,l.height=u.size),l.getContext("2d").clearRect(0,0,l.width,l.height),o(l,u)):(s=document.createElement("canvas"),s.width=u.size,s.height=u.size,u=o(s,u),l.appendChild(u))}})(function(){function t(l){var u=r.s(l);return{S:function(){return 4},b:function(){return u.length},write:function(c){for(var d=0;d<u.length;d+=1)c.put(u[d],8)}}}function e(){var l=[],u=0,c={B:function(){return l},c:function(d){return(l[Math.floor(d/8)]>>>7-d%8&1)==1},put:function(d,h){for(var p=0;p<h;p+=1)c.m((d>>>h-p-1&1)==1)},f:function(){return u},m:function(d){var h=Math.floor(u/8);l.length<=h&&l.push(0),d&&(l[h]|=128>>>u%8),u+=1}};return c}function r(l,u){function c(y,b){for(var x=-1;7>=x;x+=1)if(!(-1>=y+x||g<=y+x))for(var k=-1;7>=k;k+=1)-1>=b+k||g<=b+k||(p[y+x][b+k]=0<=x&&6>=x&&(k==0||k==6)||0<=k&&6>=k&&(x==0||x==6)||2<=x&&4>=x&&2<=k&&4>=k)}function d(y,b){for(var x=g=4*l+17,k=Array(x),E=0;E<x;E+=1){k[E]=Array(x);for(var _=0;_<x;_+=1)k[E][_]=null}for(p=k,c(0,0),c(g-7,0),c(0,g-7),x=o.G(l),k=0;k<x.length;k+=1)for(E=0;E<x.length;E+=1){_=x[k];var T=x[E];if(p[_][T]==null)for(var C=-2;2>=C;C+=1)for(var D=-2;2>=D;D+=1)p[_+C][T+D]=C==-2||C==2||D==-2||D==2||C==0&&D==0}for(x=8;x<g-8;x+=1)p[x][6]==null&&(p[x][6]=x%2==0);for(x=8;x<g-8;x+=1)p[6][x]==null&&(p[6][x]=x%2==0);for(x=o.w(h<<3|b),k=0;15>k;k+=1)E=!y&&(x>>k&1)==1,p[6>k?k:8>k?k+1:g-15+k][8]=E,p[8][8>k?g-k-1:9>k?15-k:14-k]=E;if(p[g-8][8]=!y,7<=l){for(x=o.A(l),k=0;18>k;k+=1)E=!y&&(x>>k&1)==1,p[Math.floor(k/3)][k%3+g-8-3]=E;for(k=0;18>k;k+=1)E=!y&&(x>>k&1)==1,p[k%3+g-8-3][Math.floor(k/3)]=E}if(f==null){for(y=s.I(l,h),x=e(),k=0;k<v.length;k+=1)E=v[k],x.put(4,4),x.put(E.b(),o.f(4,l)),E.write(x);for(k=E=0;k<y.length;k+=1)E+=y[k].j;if(x.f()>8*E)throw Error("code length overflow. ("+x.f()+">"+8*E+")");for(x.f()+4<=8*E&&x.put(0,4);x.f()%8!=0;)x.m(!1);for(;!(x.f()>=8*E)&&(x.put(236,8),!(x.f()>=8*E));)x.put(17,8);var L=0;for(E=k=0,_=Array(y.length),T=Array(y.length),C=0;C<y.length;C+=1){var A=y[C].j,O=y[C].o-A;for(k=Math.max(k,A),E=Math.max(E,O),_[C]=Array(A),D=0;D<_[C].length;D+=1)_[C][D]=255&x.B()[D+L];for(L+=A,D=o.C(O),A=a(_[C],D.b()-1).l(D),T[C]=Array(D.b()-1),D=0;D<T[C].length;D+=1)O=D+A.b()-T[C].length,T[C][D]=0<=O?A.c(O):0}for(D=x=0;D<y.length;D+=1)x+=y[D].o;for(x=Array(x),D=L=0;D<k;D+=1)for(C=0;C<y.length;C+=1)D<_[C].length&&(x[L]=_[C][D],L+=1);for(D=0;D<E;D+=1)for(C=0;C<y.length;C+=1)D<T[C].length&&(x[L]=T[C][D],L+=1);f=x}for(y=f,x=-1,k=g-1,E=7,_=0,b=o.F(b),T=g-1;0<T;T-=2)for(T==6&&--T;;){for(C=0;2>C;C+=1)p[k][T-C]==null&&(D=!1,_<y.length&&(D=(y[_]>>>E&1)==1),b(k,T-C)&&(D=!D),p[k][T-C]=D,--E,E==-1&&(_+=1,E=7));if(k+=x,0>k||g<=k){k-=x,x=-x;break}}}var h=n[u],p=null,g=0,f=null,v=[],m={u:function(y){y=t(y),v.push(y),f=null},a:function(y,b){if(0>y||g<=y||0>b||g<=b)throw Error(y+","+b);return p[y][b]},h:function(){return g},J:function(){for(var y=0,b=0,x=0;8>x;x+=1){d(!0,x);var k=o.D(m);(x==0||y>k)&&(y=k,b=x)}d(!1,b)}};return m}function a(l,u){if(typeof l.length=="undefined")throw Error(l.length+"/"+u);var c=function(){for(var h=0;h<l.length&&l[h]==0;)h+=1;for(var p=Array(l.length-h+u),g=0;g<l.length-h;g+=1)p[g]=l[g+h];return p}(),d={c:function(h){return c[h]},b:function(){return c.length},multiply:function(h){for(var p=Array(d.b()+h.b()-1),g=0;g<d.b();g+=1)for(var f=0;f<h.b();f+=1)p[g+f]^=i.i(i.g(d.c(g))+i.g(h.c(f)));return a(p,0)},l:function(h){if(0>d.b()-h.b())return d;for(var p=i.g(d.c(0))-i.g(h.c(0)),g=Array(d.b()),f=0;f<d.b();f+=1)g[f]=d.c(f);for(f=0;f<h.b();f+=1)g[f]^=i.i(i.g(h.c(f))+p);return a(g,0).l(h)}};return d}r.s=function(l){for(var u=[],c=0;c<l.length;c++){var d=l.charCodeAt(c);128>d?u.push(d):2048>d?u.push(192|d>>6,128|d&63):55296>d||57344<=d?u.push(224|d>>12,128|d>>6&63,128|d&63):(c++,d=65536+((d&1023)<<10|l.charCodeAt(c)&1023),u.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63))}return u};var n={L:1,M:0,Q:3,H:2},o=function(){function l(d){for(var h=0;d!=0;)h+=1,d>>>=1;return h}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],c={w:function(d){for(var h=d<<10;0<=l(h)-l(1335);)h^=1335<<l(h)-l(1335);return(d<<10|h)^21522},A:function(d){for(var h=d<<12;0<=l(h)-l(7973);)h^=7973<<l(h)-l(7973);return d<<12|h},G:function(d){return u[d-1]},F:function(d){switch(d){case 0:return function(h,p){return(h+p)%2==0};case 1:return function(h){return h%2==0};case 2:return function(h,p){return p%3==0};case 3:return function(h,p){return(h+p)%3==0};case 4:return function(h,p){return(Math.floor(h/2)+Math.floor(p/3))%2==0};case 5:return function(h,p){return h*p%2+h*p%3==0};case 6:return function(h,p){return(h*p%2+h*p%3)%2==0};case 7:return function(h,p){return(h*p%3+(h+p)%2)%2==0};default:throw Error("bad maskPattern:"+d)}},C:function(d){for(var h=a([1],0),p=0;p<d;p+=1)h=h.multiply(a([1,i.i(p)],0));return h},f:function(d,h){if(d!=4||1>h||40<h)throw Error("mode: "+d+"; type: "+h);return 10>h?8:16},D:function(d){for(var h=d.h(),p=0,g=0;g<h;g+=1)for(var f=0;f<h;f+=1){for(var v=0,m=d.a(g,f),y=-1;1>=y;y+=1)if(!(0>g+y||h<=g+y))for(var b=-1;1>=b;b+=1)0>f+b||h<=f+b||(y!=0||b!=0)&&m==d.a(g+y,f+b)&&(v+=1);5<v&&(p+=3+v-5)}for(g=0;g<h-1;g+=1)for(f=0;f<h-1;f+=1)v=0,d.a(g,f)&&(v+=1),d.a(g+1,f)&&(v+=1),d.a(g,f+1)&&(v+=1),d.a(g+1,f+1)&&(v+=1),(v==0||v==4)&&(p+=3);for(g=0;g<h;g+=1)for(f=0;f<h-6;f+=1)d.a(g,f)&&!d.a(g,f+1)&&d.a(g,f+2)&&d.a(g,f+3)&&d.a(g,f+4)&&!d.a(g,f+5)&&d.a(g,f+6)&&(p+=40);for(f=0;f<h;f+=1)for(g=0;g<h-6;g+=1)d.a(g,f)&&!d.a(g+1,f)&&d.a(g+2,f)&&d.a(g+3,f)&&d.a(g+4,f)&&!d.a(g+5,f)&&d.a(g+6,f)&&(p+=40);for(f=v=0;f<h;f+=1)for(g=0;g<h;g+=1)d.a(g,f)&&(v+=1);return p+=Math.abs(100*v/h/h-50)/5*10}};return c}(),i=function(){for(var l=Array(256),u=Array(256),c=0;8>c;c+=1)l[c]=1<<c;for(c=8;256>c;c+=1)l[c]=l[c-4]^l[c-5]^l[c-6]^l[c-8];for(c=0;255>c;c+=1)u[l[c]]=c;return{g:function(d){if(1>d)throw Error("glog("+d+")");return u[d]},i:function(d){for(;0>d;)d+=255;for(;256<=d;)d-=255;return l[d]}}}(),s=function(){function l(d,h){switch(h){case n.L:return u[4*(d-1)];case n.M:return u[4*(d-1)+1];case n.Q:return u[4*(d-1)+2];case n.H:return u[4*(d-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],c={I:function(d,h){var p=l(d,h);if(typeof p=="undefined")throw Error("bad rs block @ typeNumber:"+d+"/errorCorrectLevel:"+h);d=p.length/3,h=[];for(var g=0;g<d;g+=1)for(var f=p[3*g],v=p[3*g+1],m=p[3*g+2],y=0;y<f;y+=1){var b=m,x={};x.o=v,x.j=b,h.push(x)}return h}};return c}();return r}());var Op=QrCreator,qt=class extends re{constructor(){super(...arguments);this.value="",this.label="",this.size=128,this.fill="#000",this.background="#fff",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){!this.hasUpdated||Op.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background==="transparent"?null:this.background,size:this.size*2},this.canvas)}render(){return q`
      <div
        class="qr-code"
        part="base"
        style=${gt({width:`${this.size}px`,height:`${this.size}px`})}
      >
        <canvas role="img" aria-label=${this.label.length>0?this.label:this.value}></canvas>
      </div>
    `}};qt.styles=Pu;w([ue("canvas")],qt.prototype,"canvas",2);w([S()],qt.prototype,"value",2);w([S()],qt.prototype,"label",2);w([S({type:Number})],qt.prototype,"size",2);w([S()],qt.prototype,"fill",2);w([S()],qt.prototype,"background",2);w([S({type:Number})],qt.prototype,"radius",2);w([S({attribute:"error-correction"})],qt.prototype,"errorCorrection",2);w([ae("background"),ae("errorCorrection"),ae("fill"),ae("radius"),ae("size"),ae("value")],qt.prototype,"generate",1);qt=w([ne("sl-qr-code")],qt);var Iu=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .radio__icon svg {
    width: 100%;
    height: 100%;
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__input${xe} ~ .radio__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  .radio.radio--checked:not(.radio--disabled) .radio__input${xe} ~ .radio__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`;var Gt=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this,{value:t=>t.checked?t.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.checked=!1,this.invalid=!1}firstUpdated(){this.updateComplete.then(()=>{let t=this.getAllRadios(),e=t.find(r=>r.checked);t.forEach(r=>{r.input.tabIndex=-1}),e?e.input.tabIndex=0:t.length>0&&(t[0].input.tabIndex=0)})}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}getAllRadios(){let t=this.closest("sl-radio-group");return t===null?[this]:[...t.querySelectorAll("sl-radio")].filter(e=>e.name===this.name)}getSiblingRadios(){return this.getAllRadios().filter(t=>t!==this)}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleCheckedChange(){this.checked&&(this.input.tabIndex=0,this.getSiblingRadios().forEach(t=>{t.input.tabIndex=-1,t.checked=!1}))}handleClick(){this.checked=!0,ee(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleKeyDown(t){if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){let e=this.getAllRadios().filter(n=>!n.disabled),r=["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,a=e.indexOf(this)+r;a<0&&(a=e.length-1),a>e.length-1&&(a=0),this.getAllRadios().forEach(n=>{n.checked=!1,n.input.tabIndex=-1}),e[a].focus(),e[a].checked=!0,e[a].input.tabIndex=0,ee(e[a],"sl-change"),t.preventDefault()}}render(){return this.setAttribute("role","radio"),this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("aria-disabled",this.disabled?"true":"false"),q`
      <label
        part="base"
        class=${ge({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus})}
        @keydown=${this.handleKeyDown}
      >
        <input
          class="radio__input"
          type="radio"
          name=${he(this.name)}
          value=${he(this.value)}
          .checked=${$t(this.checked)}
          .disabled=${this.disabled}
          aria-hidden="true"
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>

        <span part="label" class="radio__label">
          <slot></slot>
        </span>
      </label>
    `}};Gt.styles=Iu;w([ue('input[type="radio"]')],Gt.prototype,"input",2);w([Se()],Gt.prototype,"hasFocus",2);w([S()],Gt.prototype,"name",2);w([S()],Gt.prototype,"value",2);w([S({type:Boolean,reflect:!0})],Gt.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],Gt.prototype,"checked",2);w([S({type:Boolean,reflect:!0})],Gt.prototype,"invalid",2);w([ae("checked",{waitUntilFirstUpdate:!0})],Gt.prototype,"handleCheckedChange",1);w([ae("disabled",{waitUntilFirstUpdate:!0})],Gt.prototype,"handleDisabledChange",1);Gt=w([ne("sl-radio")],Gt);var Ou=oe`
  ${le}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;var va=class extends re{constructor(){super(...arguments);this.label="",this.fieldset=!1}handleFocusIn(){requestAnimationFrame(()=>{let t=[...this.defaultSlot.assignedElements({flatten:!0})].find(e=>e.tagName.toLowerCase()==="sl-radio"&&e.checked);t==null||t.focus()})}render(){return q`
      <fieldset
        part="base"
        class=${ge({"radio-group":!0,"radio-group--has-fieldset":this.fieldset})}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot></slot>
      </fieldset>
    `}};va.styles=Ou;w([ue("slot:not([name])")],va.prototype,"defaultSlot",2);w([S()],va.prototype,"label",2);w([S({type:Boolean,attribute:"fieldset"})],va.prototype,"fieldset",2);va=w([ne("sl-radio-group")],va);var $u=oe`
  ${le}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    text-align: left;
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${xe}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`;var wr=class extends re{constructor(){super(...arguments);this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return q`
      <div
        part="base"
        class=${ge({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="default" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="default" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `}};wr.styles=$u;w([ue(".menu-item")],wr.prototype,"menuItem",2);w([S({type:Boolean,reflect:!0})],wr.prototype,"checked",2);w([S()],wr.prototype,"value",2);w([S({type:Boolean,reflect:!0})],wr.prototype,"disabled",2);w([ae("checked")],wr.prototype,"handleCheckedChange",1);w([ae("disabled")],wr.prototype,"handleDisabledChange",1);wr=w([ne("sl-menu-item")],wr);var Bu=oe`
  ${le}

  :host {
    display: block;
  }

  .menu-label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
  }
`;var Vi=class extends re{render(){return q`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `}};Vi.styles=Bu;Vi=w([ne("sl-menu-label")],Vi);var zu=oe`
  ${le}

  :host {
    display: contents;
  }
`;var rr=class extends re{constructor(){super(...arguments);this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.handleMutation=this.handleMutation.bind(this),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){this.stopObserver()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}handleMutation(t){ee(this,"sl-mutation",{detail:{mutationList:t}})}startObserver(){let t=typeof this.attr=="string"&&this.attr.length>0,e=t&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}render(){return q` <slot></slot> `}};rr.styles=zu;w([S({reflect:!0})],rr.prototype,"attr",2);w([S({attribute:"attr-old-value",type:Boolean,reflect:!0})],rr.prototype,"attrOldValue",2);w([S({attribute:"char-data",type:Boolean,reflect:!0})],rr.prototype,"charData",2);w([S({attribute:"char-data-old-value",type:Boolean,reflect:!0})],rr.prototype,"charDataOldValue",2);w([S({attribute:"child-list",type:Boolean,reflect:!0})],rr.prototype,"childList",2);w([S({type:Boolean,reflect:!0})],rr.prototype,"disabled",2);w([ae("disabled")],rr.prototype,"handleDisabledChange",1);w([ae("attr",{waitUntilFirstUpdate:!0}),ae("attr-old-value",{waitUntilFirstUpdate:!0}),ae("char-data",{waitUntilFirstUpdate:!0}),ae("char-data-old-value",{waitUntilFirstUpdate:!0}),ae("childList",{waitUntilFirstUpdate:!0})],rr.prototype,"handleChange",1);rr=w([ne("sl-mutation-observer")],rr);var Mu=oe`
  ${le}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 400ms width, 400ms background-color;
    user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }
`;var Ur=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return q`
      <div
        part="base"
        class=${ge({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate})}
        role="progressbar"
        title=${he(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${gt({width:`${this.value}%`})}>
          ${this.indeterminate?"":q`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              `}
        </div>
      </div>
    `}};Ur.styles=Mu;w([S({type:Number,reflect:!0})],Ur.prototype,"value",2);w([S({type:Boolean,reflect:!0})],Ur.prototype,"indeterminate",2);w([S()],Ur.prototype,"label",2);w([S()],Ur.prototype,"lang",2);Ur=w([ne("sl-progress-bar")],Ur);var Ru=oe`
  ${le}

  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    pointer-events: none;
  }

  .image-comparer__before ::slotted(img),
  .image-comparer__after ::slotted(img),
  .image-comparer__before ::slotted(svg),
  .image-comparer__after ::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    transform: translateX(calc(var(--divider-width) / -2));
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-600);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle${xe} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }
`;var qr=class extends re{constructor(){super(...arguments);this.position=50}handleDrag(t){let{width:e}=this.base.getBoundingClientRect();t.preventDefault(),Yr(this.base,r=>{this.position=parseFloat(it(r/e*100,0,100).toFixed(2))})}handleKeyDown(t){if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){let e=t.shiftKey?10:1,r=this.position;t.preventDefault(),t.key==="ArrowLeft"&&(r-=e),t.key==="ArrowRight"&&(r+=e),t.key==="Home"&&(r=0),t.key==="End"&&(r=100),r=it(r,0,100),this.position=r}}handlePositionChange(){ee(this,"sl-change")}render(){return q`
      <div part="base" id="image-comparer" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${gt({clipPath:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${gt({left:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" library="system"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};qr.styles=Ru;w([ue(".image-comparer")],qr.prototype,"base",2);w([ue(".image-comparer__handle")],qr.prototype,"handle",2);w([S({type:Number,reflect:!0})],qr.prototype,"position",2);w([ae("position",{waitUntilFirstUpdate:!0})],qr.prototype,"handlePositionChange",1);qr=w([ne("sl-image-comparer")],qr);var Fu=oe`
  ${le}

  :host {
    display: block;
  }
`;var Gr=class extends re{constructor(){super(...arguments);this.mode="cors",this.allowScripts=!1}executeScript(t){let e=document.createElement("script");[...t.attributes].forEach(r=>e.setAttribute(r.name,r.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{let t=this.src,e=await Ri(t,this.mode);if(t!==this.src)return;if(!e.ok){ee(this,"sl-error",{detail:{status:e.status}});return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(r=>this.executeScript(r)),ee(this,"sl-load")}catch{ee(this,"sl-error",{detail:{status:-1}})}}render(){return q`<slot></slot>`}};Gr.styles=Fu;w([S()],Gr.prototype,"src",2);w([S()],Gr.prototype,"mode",2);w([S({attribute:"allow-scripts",type:Boolean})],Gr.prototype,"allowScripts",2);w([ae("src")],Gr.prototype,"handleSrcChange",1);Gr=w([ne("sl-include")],Gr);var Nu=oe`
  ${le}

  :host {
    display: block;
  }

  .menu {
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;var qa=class extends re{constructor(){super(...arguments);this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(t={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.getAttribute("role")!=="menuitem"||!t.includeDisabled&&e.disabled))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){let e=this.getAllItems({includeDisabled:!1}),r=t.disabled?e[0]:t;e.forEach(a=>{a.setAttribute("tabindex",a===r?"0":"-1")})}typeToSelect(t){var e;let r=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?t.metaKey||t.ctrlKey?this.typeToSelectString="":this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase(),Pn||r.forEach(a=>a.classList.remove("sl-focus-invisible"));for(let a of r){let n=(e=a.shadowRoot)==null?void 0:e.querySelector("slot:not([name])");if(xi(n).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(a),a.focus();break}}}handleClick(t){let r=t.target.closest("sl-menu-item");(r==null?void 0:r.disabled)===!1&&ee(this,"sl-select",{detail:{item:r}})}handleKeyUp(){Pn||this.getAllItems().forEach(e=>{e.classList.remove("sl-focus-invisible")})}handleKeyDown(t){if(t.key==="Enter"){let e=this.getCurrentItem();t.preventDefault(),e==null||e.click()}if(t.key===" "&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems({includeDisabled:!1}),r=this.getCurrentItem(),a=r?e.indexOf(r):0;if(e.length>0){t.preventDefault(),t.key==="ArrowDown"?a++:t.key==="ArrowUp"?a--:t.key==="Home"?a=0:t.key==="End"&&(a=e.length-1),a<0&&(a=0),a>e.length-1&&(a=e.length-1),this.setCurrentItem(e[a]),e[a].focus();return}}this.typeToSelect(t)}handleMouseDown(t){let e=t.target;e.getAttribute("role")==="menuitem"&&(this.setCurrentItem(e),Pn||e.classList.add("sl-focus-invisible"))}handleSlotChange(){let t=this.getAllItems({includeDisabled:!1});t.length>0&&this.setCurrentItem(t[0])}render(){return q`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};qa.styles=Nu;w([ue(".menu")],qa.prototype,"menu",2);w([ue("slot")],qa.prototype,"defaultSlot",2);qa=w([ne("sl-menu")],qa);var Vu=oe`
  ${le}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    transition: var(--sl-transition-medium) transform;
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .drawer__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-right: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    position: absolute;
  }
`;function ju(t){let e=t.tagName.toLowerCase();return t.getAttribute("tabindex")==="-1"||t.hasAttribute("disabled")||t.hasAttribute("aria-disabled")&&t.getAttribute("aria-disabled")!=="false"||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||t.offsetParent===null||window.getComputedStyle(t).visibility==="hidden"?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"?!0:["button","input","select","textarea","a","audio","video","summary"].includes(e)}function ji(t){var e,r;let a=[];function n(s){s instanceof HTMLElement&&(a.push(s),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&n(s.shadowRoot)),[...s.querySelectorAll("*")].forEach(l=>n(l))}n(t);let o=(e=a.find(s=>ju(s)))!=null?e:null,i=(r=a.reverse().find(s=>ju(s)))!=null?r:null;return{start:o,end:i}}var $n=[],Ki=class{constructor(t){this.tabDirection="forward",this.element=t,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}activate(){$n.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown)}deactivate(){$n=$n.filter(t=>t!==this.element),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown)}isActive(){return $n[$n.length-1]===this.element}handleFocusIn(t){let e=t.composedPath();if(this.isActive()&&!e.includes(this.element)){let{start:r,end:a}=ji(this.element),n=this.tabDirection==="forward"?r:a;typeof(n==null?void 0:n.focus)=="function"&&n.focus({preventScroll:!0})}}handleKeyDown(t){t.key==="Tab"&&t.shiftKey&&(this.tabDirection="backward",setTimeout(()=>this.tabDirection="forward"))}};function Ku(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Zt=class extends re{constructor(){super(...arguments);this.hasSlotController=new lt(this,"footer"),this.localize=new et(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new Ki(this)}firstUpdated(){this.drawer.hidden=!this.open,this.open&&!this.contained&&(this.modal.activate(),Qa(this))}disconnectedCallback(){super.disconnectedCallback(),Ya(this)}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}requestClose(t){if(ee(this,"sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let r=Je(this,"drawer.denyClose");We(this.panel,r.keyframes,r.options);return}this.hide()}handleKeyDown(t){t.key==="Escape"&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){ee(this,"sl-show"),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),Qa(this));let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([at(this.drawer),at(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{ee(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=Je(this,`drawer.show${Ku(this.placement)}`),r=Je(this,"drawer.overlay.show");await Promise.all([We(this.panel,e.keyframes,e.options),We(this.overlay,r.keyframes,r.options)]),ee(this,"sl-after-show")}else{ee(this,"sl-hide"),this.modal.deactivate(),Ya(this),await Promise.all([at(this.drawer),at(this.overlay)]);let t=Je(this,`drawer.hide${Ku(this.placement)}`),e=Je(this,"drawer.overlay.hide");await Promise.all([We(this.panel,t.keyframes,t.options),We(this.overlay,e.keyframes,e.options)]),this.drawer.hidden=!0;let r=this.originalTrigger;typeof(r==null?void 0:r.focus)=="function"&&setTimeout(()=>r.focus()),ee(this,"sl-after-hide")}}render(){return q`
      <div
        part="base"
        class=${ge({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${he(this.noHeader?this.label:void 0)}
          aria-labelledby=${he(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":q`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="drawer__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click=${()=>this.requestClose("close-button")}
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Zt.styles=Vu;w([ue(".drawer")],Zt.prototype,"drawer",2);w([ue(".drawer__panel")],Zt.prototype,"panel",2);w([ue(".drawer__overlay")],Zt.prototype,"overlay",2);w([S({type:Boolean,reflect:!0})],Zt.prototype,"open",2);w([S({reflect:!0})],Zt.prototype,"label",2);w([S({reflect:!0})],Zt.prototype,"placement",2);w([S({type:Boolean,reflect:!0})],Zt.prototype,"contained",2);w([S({attribute:"no-header",type:Boolean,reflect:!0})],Zt.prototype,"noHeader",2);w([ae("open",{waitUntilFirstUpdate:!0})],Zt.prototype,"handleOpenChange",1);Zt=w([ne("sl-drawer")],Zt);Ne("drawer.showTop",{keyframes:[{opacity:0,transform:"translateY(-100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}});Ne("drawer.hideTop",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-100%)"}],options:{duration:250,easing:"ease"}});Ne("drawer.showEnd",{keyframes:[{opacity:0,transform:"translateX(100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}});Ne("drawer.hideEnd",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(100%)"}],options:{duration:250,easing:"ease"}});Ne("drawer.showBottom",{keyframes:[{opacity:0,transform:"translateY(100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}});Ne("drawer.hideBottom",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(100%)"}],options:{duration:250,easing:"ease"}});Ne("drawer.showStart",{keyframes:[{opacity:0,transform:"translateX(-100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}});Ne("drawer.hideStart",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(-100%)"}],options:{duration:250,easing:"ease"}});Ne("drawer.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}],options:{duration:250}});Ne("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});Ne("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var ga=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";let t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],r=this.unit==="bit"?t:e,a=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),r.length-1)),n=r[a]+this.unit,o=parseFloat((this.value/Math.pow(1e3,a)).toPrecision(3));return this.localize.number(o,{style:"unit",unit:n,unitDisplay:this.display})}};w([S({type:Number})],ga.prototype,"value",2);w([S()],ga.prototype,"unit",2);w([S()],ga.prototype,"display",2);w([S()],ga.prototype,"lang",2);ga=w([ne("sl-format-bytes")],ga);var Dt=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.date=new Date,this.hourFormat="auto"}render(){let t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(t.getMilliseconds()))return this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e})}};w([S()],Dt.prototype,"date",2);w([S()],Dt.prototype,"lang",2);w([S()],Dt.prototype,"weekday",2);w([S()],Dt.prototype,"era",2);w([S()],Dt.prototype,"year",2);w([S()],Dt.prototype,"month",2);w([S()],Dt.prototype,"day",2);w([S()],Dt.prototype,"hour",2);w([S()],Dt.prototype,"minute",2);w([S()],Dt.prototype,"second",2);w([S({attribute:"time-zone-name"})],Dt.prototype,"timeZoneName",2);w([S({attribute:"time-zone"})],Dt.prototype,"timeZone",2);w([S({attribute:"hour-format"})],Dt.prototype,"hourFormat",2);Dt=w([ne("sl-format-date")],Dt);var Ht=class extends re{constructor(){super(...arguments);this.localize=new et(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};w([S({type:Number})],Ht.prototype,"value",2);w([S()],Ht.prototype,"lang",2);w([S()],Ht.prototype,"type",2);w([S({attribute:"no-grouping",type:Boolean})],Ht.prototype,"noGrouping",2);w([S()],Ht.prototype,"currency",2);w([S({attribute:"currency-display"})],Ht.prototype,"currencyDisplay",2);w([S({attribute:"minimum-integer-digits",type:Number})],Ht.prototype,"minimumIntegerDigits",2);w([S({attribute:"minimum-fraction-digits",type:Number})],Ht.prototype,"minimumFractionDigits",2);w([S({attribute:"maximum-fraction-digits",type:Number})],Ht.prototype,"maximumFractionDigits",2);w([S({attribute:"minimum-significant-digits",type:Number})],Ht.prototype,"minimumSignificantDigits",2);w([S({attribute:"maximum-significant-digits",type:Number})],Ht.prototype,"maximumSignificantDigits",2);Ht=w([ne("sl-format-number")],Ht);var Hu=oe`
  ${le}

  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
  }

  .color-picker__grid-handle${xe} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle${xe} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview${xe} {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch${xe} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: var(--sl-transition-fast) box-shadow;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 2px var(--sl-input-border-color), inset 0 0 0 4px var(--sl-color-neutral-0);
    transition: inherit;
  }

  .color-dropdown__trigger${xe} {
    outline: none;
  }

  .color-dropdown__trigger${xe}:not(.color-dropdown__trigger--disabled) {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-dropdown__trigger${xe}:not(.color-dropdown__trigger--disabled):before {
    box-shadow: inset 0 0 0 1px var(--sl-color-primary-500);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var Qu=Sr({"node_modules/color-name/index.js"(t,e){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}}),$p=Sr({"node_modules/simple-swizzle/node_modules/is-arrayish/index.js"(t,e){e.exports=function(a){return!a||typeof a=="string"?!1:a instanceof Array||Array.isArray(a)||a.length>=0&&(a.splice instanceof Function||Object.getOwnPropertyDescriptor(a,a.length-1)&&a.constructor.name!=="String")}}}),Bp=Sr({"node_modules/simple-swizzle/index.js"(t,e){"use strict";var r=$p(),a=Array.prototype.concat,n=Array.prototype.slice,o=e.exports=function(s){for(var l=[],u=0,c=s.length;u<c;u++){var d=s[u];r(d)?l=a.call(l,n.call(d)):l.push(d)}return l};o.wrap=function(i){return function(){return i(o(arguments))}}}}),zp=Sr({"node_modules/color-string/index.js"(t,e){var r=Qu(),a=Bp(),n=Object.hasOwnProperty,o={};for(i in r)n.call(r,i)&&(o[r[i]]=i);var i,s=e.exports={to:{},get:{}};s.get=function(c){var d=c.substring(0,3).toLowerCase(),h,p;switch(d){case"hsl":h=s.get.hsl(c),p="hsl";break;case"hwb":h=s.get.hwb(c),p="hwb";break;default:h=s.get.rgb(c),p="rgb";break}return h?{model:p,value:h}:null},s.get.rgb=function(c){if(!c)return null;var d=/^#([a-f0-9]{3,4})$/i,h=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,p=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,g=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,f=/^(\w+)$/,v=[0,0,0,1],m,y,b;if(m=c.match(h)){for(b=m[2],m=m[1],y=0;y<3;y++){var x=y*2;v[y]=parseInt(m.slice(x,x+2),16)}b&&(v[3]=parseInt(b,16)/255)}else if(m=c.match(d)){for(m=m[1],b=m[3],y=0;y<3;y++)v[y]=parseInt(m[y]+m[y],16);b&&(v[3]=parseInt(b+b,16)/255)}else if(m=c.match(p)){for(y=0;y<3;y++)v[y]=parseInt(m[y+1],0);m[4]&&(m[5]?v[3]=parseFloat(m[4])*.01:v[3]=parseFloat(m[4]))}else if(m=c.match(g)){for(y=0;y<3;y++)v[y]=Math.round(parseFloat(m[y+1])*2.55);m[4]&&(m[5]?v[3]=parseFloat(m[4])*.01:v[3]=parseFloat(m[4]))}else return(m=c.match(f))?m[1]==="transparent"?[0,0,0,0]:n.call(r,m[1])?(v=r[m[1]],v[3]=1,v):null:null;for(y=0;y<3;y++)v[y]=l(v[y],0,255);return v[3]=l(v[3],0,1),v},s.get.hsl=function(c){if(!c)return null;var d=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,h=c.match(d);if(h){var p=parseFloat(h[4]),g=(parseFloat(h[1])%360+360)%360,f=l(parseFloat(h[2]),0,100),v=l(parseFloat(h[3]),0,100),m=l(isNaN(p)?1:p,0,1);return[g,f,v,m]}return null},s.get.hwb=function(c){if(!c)return null;var d=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,h=c.match(d);if(h){var p=parseFloat(h[4]),g=(parseFloat(h[1])%360+360)%360,f=l(parseFloat(h[2]),0,100),v=l(parseFloat(h[3]),0,100),m=l(isNaN(p)?1:p,0,1);return[g,f,v,m]}return null},s.to.hex=function(){var c=a(arguments);return"#"+u(c[0])+u(c[1])+u(c[2])+(c[3]<1?u(Math.round(c[3]*255)):"")},s.to.rgb=function(){var c=a(arguments);return c.length<4||c[3]===1?"rgb("+Math.round(c[0])+", "+Math.round(c[1])+", "+Math.round(c[2])+")":"rgba("+Math.round(c[0])+", "+Math.round(c[1])+", "+Math.round(c[2])+", "+c[3]+")"},s.to.rgb.percent=function(){var c=a(arguments),d=Math.round(c[0]/255*100),h=Math.round(c[1]/255*100),p=Math.round(c[2]/255*100);return c.length<4||c[3]===1?"rgb("+d+"%, "+h+"%, "+p+"%)":"rgba("+d+"%, "+h+"%, "+p+"%, "+c[3]+")"},s.to.hsl=function(){var c=a(arguments);return c.length<4||c[3]===1?"hsl("+c[0]+", "+c[1]+"%, "+c[2]+"%)":"hsla("+c[0]+", "+c[1]+"%, "+c[2]+"%, "+c[3]+")"},s.to.hwb=function(){var c=a(arguments),d="";return c.length>=4&&c[3]!==1&&(d=", "+c[3]),"hwb("+c[0]+", "+c[1]+"%, "+c[2]+"%"+d+")"},s.to.keyword=function(c){return o[c.slice(0,3)]};function l(c,d,h){return Math.min(Math.max(d,c),h)}function u(c){var d=Math.round(c).toString(16).toUpperCase();return d.length<2?"0"+d:d}}}),Yu=Sr({"node_modules/color-convert/conversions.js"(t,e){var r=Qu(),a={};for(let i of Object.keys(r))a[r[i]]=i;var n={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};e.exports=n;for(let i of Object.keys(n)){if(!("channels"in n[i]))throw new Error("missing channels property: "+i);if(!("labels"in n[i]))throw new Error("missing channel labels property: "+i);if(n[i].labels.length!==n[i].channels)throw new Error("channel and label counts mismatch: "+i);let{channels:s,labels:l}=n[i];delete n[i].channels,delete n[i].labels,Object.defineProperty(n[i],"channels",{value:s}),Object.defineProperty(n[i],"labels",{value:l})}n.rgb.hsl=function(i){let s=i[0]/255,l=i[1]/255,u=i[2]/255,c=Math.min(s,l,u),d=Math.max(s,l,u),h=d-c,p,g;d===c?p=0:s===d?p=(l-u)/h:l===d?p=2+(u-s)/h:u===d&&(p=4+(s-l)/h),p=Math.min(p*60,360),p<0&&(p+=360);let f=(c+d)/2;return d===c?g=0:f<=.5?g=h/(d+c):g=h/(2-d-c),[p,g*100,f*100]},n.rgb.hsv=function(i){let s,l,u,c,d,h=i[0]/255,p=i[1]/255,g=i[2]/255,f=Math.max(h,p,g),v=f-Math.min(h,p,g),m=function(y){return(f-y)/6/v+1/2};return v===0?(c=0,d=0):(d=v/f,s=m(h),l=m(p),u=m(g),h===f?c=u-l:p===f?c=1/3+s-u:g===f&&(c=2/3+l-s),c<0?c+=1:c>1&&(c-=1)),[c*360,d*100,f*100]},n.rgb.hwb=function(i){let s=i[0],l=i[1],u=i[2],c=n.rgb.hsl(i)[0],d=1/255*Math.min(s,Math.min(l,u));return u=1-1/255*Math.max(s,Math.max(l,u)),[c,d*100,u*100]},n.rgb.cmyk=function(i){let s=i[0]/255,l=i[1]/255,u=i[2]/255,c=Math.min(1-s,1-l,1-u),d=(1-s-c)/(1-c)||0,h=(1-l-c)/(1-c)||0,p=(1-u-c)/(1-c)||0;return[d*100,h*100,p*100,c*100]};function o(i,s){return(i[0]-s[0])**2+(i[1]-s[1])**2+(i[2]-s[2])**2}n.rgb.keyword=function(i){let s=a[i];if(s)return s;let l=1/0,u;for(let c of Object.keys(r)){let d=r[c],h=o(i,d);h<l&&(l=h,u=c)}return u},n.keyword.rgb=function(i){return r[i]},n.rgb.xyz=function(i){let s=i[0]/255,l=i[1]/255,u=i[2]/255;s=s>.04045?((s+.055)/1.055)**2.4:s/12.92,l=l>.04045?((l+.055)/1.055)**2.4:l/12.92,u=u>.04045?((u+.055)/1.055)**2.4:u/12.92;let c=s*.4124+l*.3576+u*.1805,d=s*.2126+l*.7152+u*.0722,h=s*.0193+l*.1192+u*.9505;return[c*100,d*100,h*100]},n.rgb.lab=function(i){let s=n.rgb.xyz(i),l=s[0],u=s[1],c=s[2];l/=95.047,u/=100,c/=108.883,l=l>.008856?l**(1/3):7.787*l+16/116,u=u>.008856?u**(1/3):7.787*u+16/116,c=c>.008856?c**(1/3):7.787*c+16/116;let d=116*u-16,h=500*(l-u),p=200*(u-c);return[d,h,p]},n.hsl.rgb=function(i){let s=i[0]/360,l=i[1]/100,u=i[2]/100,c,d,h;if(l===0)return h=u*255,[h,h,h];u<.5?c=u*(1+l):c=u+l-u*l;let p=2*u-c,g=[0,0,0];for(let f=0;f<3;f++)d=s+1/3*-(f-1),d<0&&d++,d>1&&d--,6*d<1?h=p+(c-p)*6*d:2*d<1?h=c:3*d<2?h=p+(c-p)*(2/3-d)*6:h=p,g[f]=h*255;return g},n.hsl.hsv=function(i){let s=i[0],l=i[1]/100,u=i[2]/100,c=l,d=Math.max(u,.01);u*=2,l*=u<=1?u:2-u,c*=d<=1?d:2-d;let h=(u+l)/2,p=u===0?2*c/(d+c):2*l/(u+l);return[s,p*100,h*100]},n.hsv.rgb=function(i){let s=i[0]/60,l=i[1]/100,u=i[2]/100,c=Math.floor(s)%6,d=s-Math.floor(s),h=255*u*(1-l),p=255*u*(1-l*d),g=255*u*(1-l*(1-d));switch(u*=255,c){case 0:return[u,g,h];case 1:return[p,u,h];case 2:return[h,u,g];case 3:return[h,p,u];case 4:return[g,h,u];case 5:return[u,h,p]}},n.hsv.hsl=function(i){let s=i[0],l=i[1]/100,u=i[2]/100,c=Math.max(u,.01),d,h;h=(2-l)*u;let p=(2-l)*c;return d=l*c,d/=p<=1?p:2-p,d=d||0,h/=2,[s,d*100,h*100]},n.hwb.rgb=function(i){let s=i[0]/360,l=i[1]/100,u=i[2]/100,c=l+u,d;c>1&&(l/=c,u/=c);let h=Math.floor(6*s),p=1-u;d=6*s-h,(h&1)!=0&&(d=1-d);let g=l+d*(p-l),f,v,m;switch(h){default:case 6:case 0:f=p,v=g,m=l;break;case 1:f=g,v=p,m=l;break;case 2:f=l,v=p,m=g;break;case 3:f=l,v=g,m=p;break;case 4:f=g,v=l,m=p;break;case 5:f=p,v=l,m=g;break}return[f*255,v*255,m*255]},n.cmyk.rgb=function(i){let s=i[0]/100,l=i[1]/100,u=i[2]/100,c=i[3]/100,d=1-Math.min(1,s*(1-c)+c),h=1-Math.min(1,l*(1-c)+c),p=1-Math.min(1,u*(1-c)+c);return[d*255,h*255,p*255]},n.xyz.rgb=function(i){let s=i[0]/100,l=i[1]/100,u=i[2]/100,c,d,h;return c=s*3.2406+l*-1.5372+u*-.4986,d=s*-.9689+l*1.8758+u*.0415,h=s*.0557+l*-.204+u*1.057,c=c>.0031308?1.055*c**(1/2.4)-.055:c*12.92,d=d>.0031308?1.055*d**(1/2.4)-.055:d*12.92,h=h>.0031308?1.055*h**(1/2.4)-.055:h*12.92,c=Math.min(Math.max(0,c),1),d=Math.min(Math.max(0,d),1),h=Math.min(Math.max(0,h),1),[c*255,d*255,h*255]},n.xyz.lab=function(i){let s=i[0],l=i[1],u=i[2];s/=95.047,l/=100,u/=108.883,s=s>.008856?s**(1/3):7.787*s+16/116,l=l>.008856?l**(1/3):7.787*l+16/116,u=u>.008856?u**(1/3):7.787*u+16/116;let c=116*l-16,d=500*(s-l),h=200*(l-u);return[c,d,h]},n.lab.xyz=function(i){let s=i[0],l=i[1],u=i[2],c,d,h;d=(s+16)/116,c=l/500+d,h=d-u/200;let p=d**3,g=c**3,f=h**3;return d=p>.008856?p:(d-16/116)/7.787,c=g>.008856?g:(c-16/116)/7.787,h=f>.008856?f:(h-16/116)/7.787,c*=95.047,d*=100,h*=108.883,[c,d,h]},n.lab.lch=function(i){let s=i[0],l=i[1],u=i[2],c;c=Math.atan2(u,l)*360/2/Math.PI,c<0&&(c+=360);let h=Math.sqrt(l*l+u*u);return[s,h,c]},n.lch.lab=function(i){let s=i[0],l=i[1],c=i[2]/360*2*Math.PI,d=l*Math.cos(c),h=l*Math.sin(c);return[s,d,h]},n.rgb.ansi16=function(i,s=null){let[l,u,c]=i,d=s===null?n.rgb.hsv(i)[2]:s;if(d=Math.round(d/50),d===0)return 30;let h=30+(Math.round(c/255)<<2|Math.round(u/255)<<1|Math.round(l/255));return d===2&&(h+=60),h},n.hsv.ansi16=function(i){return n.rgb.ansi16(n.hsv.rgb(i),i[2])},n.rgb.ansi256=function(i){let s=i[0],l=i[1],u=i[2];return s===l&&l===u?s<8?16:s>248?231:Math.round((s-8)/247*24)+232:16+36*Math.round(s/255*5)+6*Math.round(l/255*5)+Math.round(u/255*5)},n.ansi16.rgb=function(i){let s=i%10;if(s===0||s===7)return i>50&&(s+=3.5),s=s/10.5*255,[s,s,s];let l=(~~(i>50)+1)*.5,u=(s&1)*l*255,c=(s>>1&1)*l*255,d=(s>>2&1)*l*255;return[u,c,d]},n.ansi256.rgb=function(i){if(i>=232){let d=(i-232)*10+8;return[d,d,d]}i-=16;let s,l=Math.floor(i/36)/5*255,u=Math.floor((s=i%36)/6)/5*255,c=s%6/5*255;return[l,u,c]},n.rgb.hex=function(i){let l=(((Math.round(i[0])&255)<<16)+((Math.round(i[1])&255)<<8)+(Math.round(i[2])&255)).toString(16).toUpperCase();return"000000".substring(l.length)+l},n.hex.rgb=function(i){let s=i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!s)return[0,0,0];let l=s[0];s[0].length===3&&(l=l.split("").map(p=>p+p).join(""));let u=parseInt(l,16),c=u>>16&255,d=u>>8&255,h=u&255;return[c,d,h]},n.rgb.hcg=function(i){let s=i[0]/255,l=i[1]/255,u=i[2]/255,c=Math.max(Math.max(s,l),u),d=Math.min(Math.min(s,l),u),h=c-d,p,g;return h<1?p=d/(1-h):p=0,h<=0?g=0:c===s?g=(l-u)/h%6:c===l?g=2+(u-s)/h:g=4+(s-l)/h,g/=6,g%=1,[g*360,h*100,p*100]},n.hsl.hcg=function(i){let s=i[1]/100,l=i[2]/100,u=l<.5?2*s*l:2*s*(1-l),c=0;return u<1&&(c=(l-.5*u)/(1-u)),[i[0],u*100,c*100]},n.hsv.hcg=function(i){let s=i[1]/100,l=i[2]/100,u=s*l,c=0;return u<1&&(c=(l-u)/(1-u)),[i[0],u*100,c*100]},n.hcg.rgb=function(i){let s=i[0]/360,l=i[1]/100,u=i[2]/100;if(l===0)return[u*255,u*255,u*255];let c=[0,0,0],d=s%1*6,h=d%1,p=1-h,g=0;switch(Math.floor(d)){case 0:c[0]=1,c[1]=h,c[2]=0;break;case 1:c[0]=p,c[1]=1,c[2]=0;break;case 2:c[0]=0,c[1]=1,c[2]=h;break;case 3:c[0]=0,c[1]=p,c[2]=1;break;case 4:c[0]=h,c[1]=0,c[2]=1;break;default:c[0]=1,c[1]=0,c[2]=p}return g=(1-l)*u,[(l*c[0]+g)*255,(l*c[1]+g)*255,(l*c[2]+g)*255]},n.hcg.hsv=function(i){let s=i[1]/100,l=i[2]/100,u=s+l*(1-s),c=0;return u>0&&(c=s/u),[i[0],c*100,u*100]},n.hcg.hsl=function(i){let s=i[1]/100,u=i[2]/100*(1-s)+.5*s,c=0;return u>0&&u<.5?c=s/(2*u):u>=.5&&u<1&&(c=s/(2*(1-u))),[i[0],c*100,u*100]},n.hcg.hwb=function(i){let s=i[1]/100,l=i[2]/100,u=s+l*(1-s);return[i[0],(u-s)*100,(1-u)*100]},n.hwb.hcg=function(i){let s=i[1]/100,l=i[2]/100,u=1-l,c=u-s,d=0;return c<1&&(d=(u-c)/(1-c)),[i[0],c*100,d*100]},n.apple.rgb=function(i){return[i[0]/65535*255,i[1]/65535*255,i[2]/65535*255]},n.rgb.apple=function(i){return[i[0]/255*65535,i[1]/255*65535,i[2]/255*65535]},n.gray.rgb=function(i){return[i[0]/100*255,i[0]/100*255,i[0]/100*255]},n.gray.hsl=function(i){return[0,0,i[0]]},n.gray.hsv=n.gray.hsl,n.gray.hwb=function(i){return[0,100,i[0]]},n.gray.cmyk=function(i){return[0,0,0,i[0]]},n.gray.lab=function(i){return[i[0],0,0]},n.gray.hex=function(i){let s=Math.round(i[0]/100*255)&255,u=((s<<16)+(s<<8)+s).toString(16).toUpperCase();return"000000".substring(u.length)+u},n.rgb.gray=function(i){return[(i[0]+i[1]+i[2])/3/255*100]}}}),Mp=Sr({"node_modules/color-convert/route.js"(t,e){var r=Yu();function a(){let s={},l=Object.keys(r);for(let u=l.length,c=0;c<u;c++)s[l[c]]={distance:-1,parent:null};return s}function n(s){let l=a(),u=[s];for(l[s].distance=0;u.length;){let c=u.pop(),d=Object.keys(r[c]);for(let h=d.length,p=0;p<h;p++){let g=d[p],f=l[g];f.distance===-1&&(f.distance=l[c].distance+1,f.parent=c,u.unshift(g))}}return l}function o(s,l){return function(u){return l(s(u))}}function i(s,l){let u=[l[s].parent,s],c=r[l[s].parent][s],d=l[s].parent;for(;l[d].parent;)u.unshift(l[d].parent),c=o(r[l[d].parent][d],c),d=l[d].parent;return c.conversion=u,c}e.exports=function(s){let l=n(s),u={},c=Object.keys(l);for(let d=c.length,h=0;h<d;h++){let p=c[h];l[p].parent!==null&&(u[p]=i(p,l))}return u}}}),Rp=Sr({"node_modules/color-convert/index.js"(t,e){var r=Yu(),a=Mp(),n={},o=Object.keys(r);function i(l){let u=function(...c){let d=c[0];return d==null?d:(d.length>1&&(c=d),l(c))};return"conversion"in l&&(u.conversion=l.conversion),u}function s(l){let u=function(...c){let d=c[0];if(d==null)return d;d.length>1&&(c=d);let h=l(c);if(typeof h=="object")for(let p=h.length,g=0;g<p;g++)h[g]=Math.round(h[g]);return h};return"conversion"in l&&(u.conversion=l.conversion),u}o.forEach(l=>{n[l]={},Object.defineProperty(n[l],"channels",{value:r[l].channels}),Object.defineProperty(n[l],"labels",{value:r[l].labels});let u=a(l);Object.keys(u).forEach(d=>{let h=u[d];n[l][d]=s(h),n[l][d].raw=i(h)})}),e.exports=n}}),Fp=Sr({"node_modules/color/index.js"(t,e){var r=zp(),a=Rp(),n=[].slice,o=["keyword","gray","hex"],i={};for(let f of Object.keys(a))i[n.call(a[f].labels).sort().join("")]=f;var s={};function l(f,v){if(!(this instanceof l))return new l(f,v);if(v&&v in o&&(v=null),v&&!(v in a))throw new Error("Unknown model: "+v);let m,y;if(f==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(f instanceof l)this.model=f.model,this.color=f.color.slice(),this.valpha=f.valpha;else if(typeof f=="string"){let b=r.get(f);if(b===null)throw new Error("Unable to parse color from string: "+f);this.model=b.model,y=a[this.model].channels,this.color=b.value.slice(0,y),this.valpha=typeof b.value[y]=="number"?b.value[y]:1}else if(f.length>0){this.model=v||"rgb",y=a[this.model].channels;let b=n.call(f,0,y);this.color=g(b,y),this.valpha=typeof f[y]=="number"?f[y]:1}else if(typeof f=="number")this.model="rgb",this.color=[f>>16&255,f>>8&255,f&255],this.valpha=1;else{this.valpha=1;let b=Object.keys(f);"alpha"in f&&(b.splice(b.indexOf("alpha"),1),this.valpha=typeof f.alpha=="number"?f.alpha:0);let x=b.sort().join("");if(!(x in i))throw new Error("Unable to parse color from object: "+JSON.stringify(f));this.model=i[x];let k=a[this.model].labels,E=[];for(m=0;m<k.length;m++)E.push(f[k[m]]);this.color=g(E)}if(s[this.model])for(y=a[this.model].channels,m=0;m<y;m++){let b=s[this.model][m];b&&(this.color[m]=b(this.color[m]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}l.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(f){let v=this.model in r.to?this:this.rgb();v=v.round(typeof f=="number"?f:1);let m=v.valpha===1?v.color:v.color.concat(this.valpha);return r.to[v.model](m)},percentString(f){let v=this.rgb().round(typeof f=="number"?f:1),m=v.valpha===1?v.color:v.color.concat(this.valpha);return r.to.rgb.percent(m)},array(){return this.valpha===1?this.color.slice():this.color.concat(this.valpha)},object(){let f={},v=a[this.model].channels,m=a[this.model].labels;for(let y=0;y<v;y++)f[m[y]]=this.color[y];return this.valpha!==1&&(f.alpha=this.valpha),f},unitArray(){let f=this.rgb().color;return f[0]/=255,f[1]/=255,f[2]/=255,this.valpha!==1&&f.push(this.valpha),f},unitObject(){let f=this.rgb().object();return f.r/=255,f.g/=255,f.b/=255,this.valpha!==1&&(f.alpha=this.valpha),f},round(f){return f=Math.max(f||0,0),new l(this.color.map(c(f)).concat(this.valpha),this.model)},alpha(f){return arguments.length>0?new l(this.color.concat(Math.max(0,Math.min(1,f))),this.model):this.valpha},red:d("rgb",0,h(255)),green:d("rgb",1,h(255)),blue:d("rgb",2,h(255)),hue:d(["hsl","hsv","hsl","hwb","hcg"],0,f=>(f%360+360)%360),saturationl:d("hsl",1,h(100)),lightness:d("hsl",2,h(100)),saturationv:d("hsv",1,h(100)),value:d("hsv",2,h(100)),chroma:d("hcg",1,h(100)),gray:d("hcg",2,h(100)),white:d("hwb",1,h(100)),wblack:d("hwb",2,h(100)),cyan:d("cmyk",0,h(100)),magenta:d("cmyk",1,h(100)),yellow:d("cmyk",2,h(100)),black:d("cmyk",3,h(100)),x:d("xyz",0,h(100)),y:d("xyz",1,h(100)),z:d("xyz",2,h(100)),l:d("lab",0,h(100)),a:d("lab",1),b:d("lab",2),keyword(f){return arguments.length>0?new l(f):a[this.model].keyword(this.color)},hex(f){return arguments.length>0?new l(f):r.to.hex(this.rgb().round().color)},hexa(f){if(arguments.length>0)return new l(f);let v=this.rgb().round().color,m=Math.round(this.valpha*255).toString(16).toUpperCase();return m.length===1&&(m="0"+m),r.to.hex(v)+m},rgbNumber(){let f=this.rgb().color;return(f[0]&255)<<16|(f[1]&255)<<8|f[2]&255},luminosity(){let f=this.rgb().color,v=[];for(let[m,y]of f.entries()){let b=y/255;v[m]=b<=.03928?b/12.92:((b+.055)/1.055)**2.4}return .2126*v[0]+.7152*v[1]+.0722*v[2]},contrast(f){let v=this.luminosity(),m=f.luminosity();return v>m?(v+.05)/(m+.05):(m+.05)/(v+.05)},level(f){let v=this.contrast(f);return v>=7.1?"AAA":v>=4.5?"AA":""},isDark(){let f=this.rgb().color;return(f[0]*299+f[1]*587+f[2]*114)/1e3<128},isLight(){return!this.isDark()},negate(){let f=this.rgb();for(let v=0;v<3;v++)f.color[v]=255-f.color[v];return f},lighten(f){let v=this.hsl();return v.color[2]+=v.color[2]*f,v},darken(f){let v=this.hsl();return v.color[2]-=v.color[2]*f,v},saturate(f){let v=this.hsl();return v.color[1]+=v.color[1]*f,v},desaturate(f){let v=this.hsl();return v.color[1]-=v.color[1]*f,v},whiten(f){let v=this.hwb();return v.color[1]+=v.color[1]*f,v},blacken(f){let v=this.hwb();return v.color[2]+=v.color[2]*f,v},grayscale(){let f=this.rgb().color,v=f[0]*.3+f[1]*.59+f[2]*.11;return l.rgb(v,v,v)},fade(f){return this.alpha(this.valpha-this.valpha*f)},opaquer(f){return this.alpha(this.valpha+this.valpha*f)},rotate(f){let v=this.hsl(),m=v.color[0];return m=(m+f)%360,m=m<0?360+m:m,v.color[0]=m,v},mix(f,v){if(!f||!f.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof f);let m=f.rgb(),y=this.rgb(),b=v===void 0?.5:v,x=2*b-1,k=m.alpha()-y.alpha(),E=((x*k==-1?x:(x+k)/(1+x*k))+1)/2,_=1-E;return l.rgb(E*m.red()+_*y.red(),E*m.green()+_*y.green(),E*m.blue()+_*y.blue(),m.alpha()*b+y.alpha()*(1-b))}};for(let f of Object.keys(a)){if(o.includes(f))continue;let v=a[f].channels;l.prototype[f]=function(){if(this.model===f)return new l(this);if(arguments.length>0)return new l(arguments,f);let m=typeof arguments[v]=="number"?v:this.valpha;return new l(p(a[this.model][f].raw(this.color)).concat(m),f)},l[f]=function(m){return typeof m=="number"&&(m=g(n.call(arguments),v)),new l(m,f)}}function u(f,v){return Number(f.toFixed(v))}function c(f){return function(v){return u(v,f)}}function d(f,v,m){f=Array.isArray(f)?f:[f];for(let y of f)(s[y]||(s[y]=[]))[v]=m;return f=f[0],function(y){let b;return arguments.length>0?(m&&(y=m(y)),b=this[f](),b.color[v]=y,b):(b=this[f]().color[v],m&&(b=m(b)),b)}}function h(f){return function(v){return Math.max(0,Math.min(f,v))}}function p(f){return Array.isArray(f)?f:[f]}function g(f,v){for(let m=0;m<v;m++)typeof f[m]!="number"&&(f[m]=0);return f}e.exports=l}}),Np=Nl(Fp(),1),Xu="EyeDropper"in window,je=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this),this.isSafeValue=!1,this.localize=new et(this),this.inputValue="",this.hue=0,this.saturation=100,this.lightness=100,this.alpha=100,this.value="#ffffff",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.invalid=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches=["#d0021b","#f5a623","#f8e71c","#8b572a","#7ed321","#417505","#bd10e0","#9013fe","#4a90e2","#50e3c2","#b8e986","#000","#444","#888","#ccc","#fff"]}firstUpdated(){this.setColor(this.value)||this.setColor("#ffff"),this.inputValue=this.value,this.lastValueEmitted=this.value,this.syncValues()}getFormattedValue(t="hex"){let e=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;default:return""}}reportValidity(){return!this.inline&&this.input.invalid?new Promise(t=>{this.dropdown.addEventListener("sl-after-show",()=>{this.input.reportValidity(),t()},{once:!0}),this.dropdown.show()}):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=this.input.invalid}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){let t=["hex","rgb","hsl"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e]}handleAlphaDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),r=e.querySelector(".color-picker__slider-handle"),{width:a}=e.getBoundingClientRect();r.focus(),t.preventDefault(),Yr(e,n=>{this.alpha=it(n/a*100,0,100),this.syncValues()})}handleHueDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),r=e.querySelector(".color-picker__slider-handle"),{width:a}=e.getBoundingClientRect();r.focus(),t.preventDefault(),Yr(e,n=>{this.hue=it(n/a*360,0,360),this.syncValues()})}handleGridDrag(t){let e=this.shadowRoot.querySelector(".color-picker__grid"),r=e.querySelector(".color-picker__grid-handle"),{width:a,height:n}=e.getBoundingClientRect();r.focus(),t.preventDefault(),Yr(e,(o,i)=>{this.saturation=it(o/a*100,0,100),this.lightness=it(100-i/n*100,0,100),this.syncValues()})}handleAlphaKeyDown(t){let e=t.shiftKey?10:1;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=it(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=it(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues())}handleHueKeyDown(t){let e=t.shiftKey?10:1;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=it(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=it(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues())}handleGridKeyDown(t){let e=t.shiftKey?10:1;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=it(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=it(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.lightness=it(this.lightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.lightness=it(this.lightness-e,0,100),this.syncValues())}handleInputChange(t){let e=t.target;this.setColor(e.value),e.value=this.value,t.stopPropagation()}handleInputKeyDown(t){t.key==="Enter"&&(this.setColor(this.input.value),this.input.value=this.value,setTimeout(()=>this.input.select()))}normalizeColorString(t){if(/rgba?/i.test(t)){let e=t.replace(/[^\d.%]/g," ").split(" ").map(r=>r.trim()).filter(r=>r.length);return e.length<4&&(e[3]="1"),e[3].indexOf("%")>-1&&(e[3]=(parseFloat(e[3].replace(/%/g,""))/100).toString()),`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}if(/hsla?/i.test(t)){let e=t.replace(/[^\d.%]/g," ").split(" ").map(r=>r.trim()).filter(r=>r.length);return e.length<4&&(e[3]="1"),e[3].indexOf("%")>-1&&(e[3]=(parseFloat(e[3].replace(/%/g,""))/100).toString()),`hsla(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}return/^[0-9a-f]+$/i.test(t)?`#${t}`:t}parseColor(t){let e;t=this.normalizeColorString(t);try{e=(0,Np.default)(t)}catch{return null}let r=e.hsl(),a={h:r.hue(),s:r.saturationl(),l:r.lightness(),a:r.alpha()},n=e.rgb(),o={r:n.red(),g:n.green(),b:n.blue(),a:n.alpha()},i={r:Hi(o.r),g:Hi(o.g),b:Hi(o.b),a:Hi(o.a*255)};return{hsl:{h:a.h,s:a.s,l:a.l,string:this.setLetterCase(`hsl(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%)`)},hsla:{h:a.h,s:a.s,l:a.l,a:a.a,string:this.setLetterCase(`hsla(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%, ${a.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${o.a.toFixed(2).toString()})`)},hex:this.setLetterCase(`#${i.r}${i.g}${i.b}`),hexa:this.setLetterCase(`#${i.r}${i.g}${i.b}${i.a}`)}}setColor(t){let e=this.parseColor(t);return e===null?!1:(this.hue=e.hsla.h,this.saturation=e.hsla.s,this.lightness=e.hsla.l,this.alpha=this.opacity?e.hsla.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Xu)return;new EyeDropper().open().then(e=>this.setColor(e.sRGBHex)).catch(()=>{})}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(!this.isSafeValue&&t!==void 0){let r=this.parseColor(e);r!==null?(this.inputValue=this.value,this.hue=r.hsla.h,this.saturation=r.hsla.s,this.lightness=r.hsla.l,this.alpha=r.hsla.a*100):this.inputValue=t}this.value!==this.lastValueEmitted&&(ee(this,"sl-change"),this.lastValueEmitted=this.value)}render(){let t=this.saturation,e=100-this.lightness,r=q`
      <div
        part="base"
        class=${ge({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <div
          part="grid"
          class="color-picker__grid"
          style=${gt({backgroundColor:`hsl(${this.hue}deg, 100%, 50%)`})}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${gt({top:`${e}%`,left:`${t}%`,backgroundColor:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`})}
            role="application"
            aria-label="HSL"
            tabindex=${he(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${gt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${Math.round(this.hue)}
                tabindex=${he(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?q`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${gt({backgroundImage:`linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${gt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${he(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${gt({"--preview-color":`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${$t(this.inputValue)}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":q`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Xu?q`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${this.swatches.length>0?q`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map(a=>q`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${he(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${a}
                      @click=${()=>!this.disabled&&this.setColor(a)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(a)}
                    >
                      <div class="color-picker__swatch-color" style=${gt({backgroundColor:a})}></div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `;return this.inline?r:q`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${ge({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-picker__transparent-bg":!0})}
          style=${gt({color:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
          type="button"
        ></button>
        ${r}
      </sl-dropdown>
    `}};je.styles=Hu;w([ue('[part="input"]')],je.prototype,"input",2);w([ue('[part="preview"]')],je.prototype,"previewButton",2);w([ue(".color-dropdown")],je.prototype,"dropdown",2);w([Se()],je.prototype,"inputValue",2);w([Se()],je.prototype,"hue",2);w([Se()],je.prototype,"saturation",2);w([Se()],je.prototype,"lightness",2);w([Se()],je.prototype,"alpha",2);w([S()],je.prototype,"value",2);w([S()],je.prototype,"format",2);w([S({type:Boolean,reflect:!0})],je.prototype,"inline",2);w([S()],je.prototype,"size",2);w([S({attribute:"no-format-toggle",type:Boolean})],je.prototype,"noFormatToggle",2);w([S()],je.prototype,"name",2);w([S({type:Boolean,reflect:!0})],je.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],je.prototype,"invalid",2);w([S({type:Boolean})],je.prototype,"hoist",2);w([S({type:Boolean})],je.prototype,"opacity",2);w([S({type:Boolean})],je.prototype,"uppercase",2);w([S({attribute:!1})],je.prototype,"swatches",2);w([S()],je.prototype,"lang",2);w([ae("format")],je.prototype,"handleFormatChange",1);w([ae("opacity")],je.prototype,"handleOpacityChange",1);w([ae("value")],je.prototype,"handleValueChange",1);je=w([ne("sl-color-picker")],je);function Hi(t){let e=Math.round(t).toString(16);return e.length===1?`0${e}`:e}var Uu=oe`
  ${le}
  ${jr}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`;var Ae=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this),this.hasSlotController=new lt(this,"help-text","label"),this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){var t,e;return(e=(t=this.input)==null?void 0:t.valueAsDate)!=null?e:null}set valueAsDate(t){this.updateComplete.then(()=>{this.input.valueAsDate=t,this.value=this.input.value})}get valueAsNumber(){var t,e;return(e=(t=this.input)==null?void 0:t.valueAsNumber)!=null?e:parseFloat(this.value)}set valueAsNumber(t){this.updateComplete.then(()=>{this.input.valueAsNumber=t,this.value=this.input.value})}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,a="preserve"){this.input.setRangeText(t,e,r,a),this.value!==this.input.value&&(this.value=this.input.value,ee(this,"sl-input"),ee(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleChange(){this.value=this.input.value,ee(this,"sl-change")}handleClearClick(t){this.value="",ee(this,"sl-clear"),ee(this,"sl-input"),ee(this,"sl-change"),this.input.focus(),t.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleInput(){this.value=this.input.value,ee(this,"sl-input")}handleInvalid(){this.invalid=!0}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&this.formSubmitController.submit()}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,a=this.helpText?!0:!!e;return q`
      <div
        part="form-control"
        class=${ge({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":a})}
      >
        <label part="label" class="form-control__label" for="input" aria-hidden=${r?"false":"true"}>
          <slot name="label">${this.label}</slot>
        </label>

        <div class="form-control__input">
          <div
            part="base"
            class=${ge({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":this.value.length===0,"input--invalid":this.invalid})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.isPasswordVisible?"text":this.type}
              name=${he(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${he(this.placeholder)}
              minlength=${he(this.minlength)}
              maxlength=${he(this.maxlength)}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${$t(this.value)}
              autocapitalize=${he(this.autocapitalize)}
              autocomplete=${he(this.autocomplete)}
              autocorrect=${he(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${he(this.spellcheck)}
              pattern=${he(this.pattern)}
              inputmode=${he(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid?"true":"false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${this.clearable&&this.value.length>0?q`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.togglePassword?q`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.isPasswordVisible?q`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:q`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${a?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Ae.styles=Uu;w([ue(".input__control")],Ae.prototype,"input",2);w([Se()],Ae.prototype,"hasFocus",2);w([Se()],Ae.prototype,"isPasswordVisible",2);w([S({reflect:!0})],Ae.prototype,"type",2);w([S({reflect:!0})],Ae.prototype,"size",2);w([S()],Ae.prototype,"name",2);w([S()],Ae.prototype,"value",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"filled",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"pill",2);w([S()],Ae.prototype,"label",2);w([S({attribute:"help-text"})],Ae.prototype,"helpText",2);w([S({type:Boolean})],Ae.prototype,"clearable",2);w([S({attribute:"toggle-password",type:Boolean})],Ae.prototype,"togglePassword",2);w([S()],Ae.prototype,"placeholder",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"readonly",2);w([S({type:Number})],Ae.prototype,"minlength",2);w([S({type:Number})],Ae.prototype,"maxlength",2);w([S()],Ae.prototype,"min",2);w([S()],Ae.prototype,"max",2);w([S({type:Number})],Ae.prototype,"step",2);w([S()],Ae.prototype,"pattern",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"required",2);w([S({type:Boolean,reflect:!0})],Ae.prototype,"invalid",2);w([S()],Ae.prototype,"autocapitalize",2);w([S()],Ae.prototype,"autocorrect",2);w([S()],Ae.prototype,"autocomplete",2);w([S({type:Boolean})],Ae.prototype,"autofocus",2);w([S({type:Boolean})],Ae.prototype,"spellcheck",2);w([S()],Ae.prototype,"inputmode",2);w([ae("disabled",{waitUntilFirstUpdate:!0})],Ae.prototype,"handleDisabledChange",1);w([ae("value",{waitUntilFirstUpdate:!0})],Ae.prototype,"handleValueChange",1);Ae=w([ne("sl-input")],Ae);var qu=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`;var kt=class extends re{constructor(){super(...arguments);this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}async firstUpdated(){this.panel.hidden=!this.open,this.open&&(await this.updateComplete,this.startPositioner())}disconnectedCallback(){super.disconnectedCallback(),this.hide(),this.stopPositioner()}focusOnTrigger(){let e=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleDocumentKeyDown(t){var e;if(t.key==="Escape"){this.hide(),this.focusOnTrigger();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var r,a,n;let o=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?(n=(a=document.activeElement)==null?void 0:a.shadowRoot)==null?void 0:n.activeElement:document.activeElement;(!this.containingElement||(o==null?void 0:o.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}}handleDocumentMouseDown(t){let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){let e=t.target;In(e,this.panel)}handlePanelSelect(t){let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){this.updatePositioner()}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){let e=this.getMenu(),r=e.defaultSlot.assignedElements({flatten:!0}),a=r[0],n=r[r.length-1];if(t.key==="Escape"){this.focusOnTrigger(),this.hide();return}if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),requestAnimationFrame(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(a),a.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(n),n.focus())}));let o=["Tab","Shift","Meta","Ctrl","Alt"];this.open&&!o.includes(t.key)&&e.typeToSelect(t)}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){let r=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find(a=>ji(a).start);r&&(r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}reposition(){this.updatePositioner()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){ee(this,"sl-show"),this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),await at(this),this.startPositioner(),this.panel.hidden=!1;let{keyframes:t,options:e}=Je(this,"dropdown.show");await We(this.panel,t,e),ee(this,"sl-after-show")}else{ee(this,"sl-hide"),this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),await at(this);let{keyframes:t,options:e}=Je(this,"dropdown.hide");await We(this.panel,t,e),this.panel.hidden=!0,this.stopPositioner(),ee(this,"sl-after-hide")}}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Oi(this.trigger,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){!this.open||!this.trigger||!this.positioner||$i(this.trigger,this.positioner,{placement:this.placement,middleware:[Si({mainAxis:this.distance,crossAxis:this.skidding}),Ei(),Ti(),Zl({apply:({width:t,height:e})=>{Object.assign(this.panel.style,{maxWidth:`${t}px`,maxHeight:`${e}px`})},padding:8})],strategy:this.hoist?"fixed":"absolute"}).then(({x:t,y:e,placement:r})=>{this.positioner.setAttribute("data-placement",r),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${e}px`})})}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return q`
      <div
        part="base"
        id="dropdown"
        class=${ge({dropdown:!0,"dropdown--open":this.open})}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open?"false":"true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `}};kt.styles=qu;w([ue(".dropdown__trigger")],kt.prototype,"trigger",2);w([ue(".dropdown__panel")],kt.prototype,"panel",2);w([ue(".dropdown__positioner")],kt.prototype,"positioner",2);w([S({type:Boolean,reflect:!0})],kt.prototype,"open",2);w([S({reflect:!0})],kt.prototype,"placement",2);w([S({type:Boolean})],kt.prototype,"disabled",2);w([S({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],kt.prototype,"stayOpenOnSelect",2);w([S({attribute:!1})],kt.prototype,"containingElement",2);w([S({type:Number})],kt.prototype,"distance",2);w([S({type:Number})],kt.prototype,"skidding",2);w([S({type:Boolean})],kt.prototype,"hoist",2);w([ae("distance"),ae("hoist"),ae("placement"),ae("skidding")],kt.prototype,"handlePopoverOptionsChange",1);w([ae("open",{waitUntilFirstUpdate:!0})],kt.prototype,"handleOpenChange",1);kt=w([ne("sl-dropdown")],kt);Ne("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}});Ne("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});var Gu=oe`
  ${le}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header${xe} {
    box-shadow: var(--sl-focus-ring);
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header${xe} {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`;var dr=class extends re{constructor(){super(...arguments);this.open=!1,this.disabled=!1}firstUpdated(){this.body.hidden=!this.open,this.body.style.height=this.open?"auto":"0"}async show(){if(!(this.open||this.disabled))return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,pt(this,"sl-after-hide")}handleSummaryClick(){this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){ee(this,"sl-show"),await at(this.body),this.body.hidden=!1;let{keyframes:t,options:e}=Je(this,"details.show");await We(this.body,os(t,this.body.scrollHeight),e),this.body.style.height="auto",ee(this,"sl-after-show")}else{ee(this,"sl-hide"),await at(this.body);let{keyframes:t,options:e}=Je(this,"details.hide");await We(this.body,os(t,this.body.scrollHeight),e),this.body.hidden=!0,this.body.style.height="auto",ee(this,"sl-after-hide")}}render(){return q`
      <div
        part="base"
        class=${ge({details:!0,"details--open":this.open,"details--disabled":this.disabled})}
      >
        <header
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div part="content" id="content" class="details__content" role="region" aria-labelledby="header">
            <slot></slot>
          </div>
        </div>
      </div>
    `}};dr.styles=Gu;w([ue(".details")],dr.prototype,"details",2);w([ue(".details__header")],dr.prototype,"header",2);w([ue(".details__body")],dr.prototype,"body",2);w([S({type:Boolean,reflect:!0})],dr.prototype,"open",2);w([S()],dr.prototype,"summary",2);w([S({type:Boolean,reflect:!0})],dr.prototype,"disabled",2);w([ae("open",{waitUntilFirstUpdate:!0})],dr.prototype,"handleOpenChange",1);dr=w([ne("sl-details")],dr);Ne("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Ne("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});var Zu=oe`
  ${le}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-left: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }
`;var hr=class extends re{constructor(){super(...arguments);this.hasSlotController=new lt(this,"footer"),this.localize=new et(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new Ki(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.modal.activate(),Qa(this))}disconnectedCallback(){super.disconnectedCallback(),Ya(this)}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}requestClose(t){if(ee(this,"sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let r=Je(this,"dialog.denyClose");We(this.panel,r.keyframes,r.options);return}this.hide()}handleKeyDown(t){t.key==="Escape"&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){ee(this,"sl-show"),this.originalTrigger=document.activeElement,this.modal.activate(),Qa(this);let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([at(this.dialog),at(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{ee(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=Je(this,"dialog.show"),r=Je(this,"dialog.overlay.show");await Promise.all([We(this.panel,e.keyframes,e.options),We(this.overlay,r.keyframes,r.options)]),ee(this,"sl-after-show")}else{ee(this,"sl-hide"),this.modal.deactivate(),await Promise.all([at(this.dialog),at(this.overlay)]);let t=Je(this,"dialog.hide"),e=Je(this,"dialog.overlay.hide");await Promise.all([We(this.panel,t.keyframes,t.options),We(this.overlay,e.keyframes,e.options)]),this.dialog.hidden=!0,Ya(this);let r=this.originalTrigger;typeof(r==null?void 0:r.focus)=="function"&&setTimeout(()=>r.focus()),ee(this,"sl-after-hide")}}render(){return q`
      <div
        part="base"
        class=${ge({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${he(this.noHeader?this.label:void 0)}
          aria-labelledby=${he(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":q`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${()=>this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};hr.styles=Zu;w([ue(".dialog")],hr.prototype,"dialog",2);w([ue(".dialog__panel")],hr.prototype,"panel",2);w([ue(".dialog__overlay")],hr.prototype,"overlay",2);w([S({type:Boolean,reflect:!0})],hr.prototype,"open",2);w([S({reflect:!0})],hr.prototype,"label",2);w([S({attribute:"no-header",type:Boolean,reflect:!0})],hr.prototype,"noHeader",2);w([ae("open",{waitUntilFirstUpdate:!0})],hr.prototype,"handleOpenChange",1);hr=w([ne("sl-dialog")],hr);Ne("dialog.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}});Ne("dialog.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});Ne("dialog.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],options:{duration:250}});Ne("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});Ne("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var Wu=oe`
  ${le}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;var Ga=class extends re{constructor(){super(...arguments);this.vertical=!1}firstUpdated(){this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};Ga.styles=Wu;w([S({type:Boolean,reflect:!0})],Ga.prototype,"vertical",2);w([ae("vertical")],Ga.prototype,"handleVerticalChange",1);Ga=w([ne("sl-divider")],Ga);var Ju=oe`
  ${le}

  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);
    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
    transform: scale(1);
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }
`;var ar=class extends re{constructor(){super(...arguments);this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){let t=document.createElement("canvas"),{width:e,height:r}=this.animatedImage;t.width=e,t.height=r,t.getContext("2d").drawImage(this.animatedImage,0,0,e,r),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(ee(this,"sl-load"),this.isLoaded=!0)}handleError(){ee(this,"sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return q`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?q`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                ${this.play?q`<sl-icon part="pause-icon" name="pause-fill" library="system"></sl-icon>`:q`<sl-icon part="play-icon" name="play-fill" library="system"></sl-icon>`}
              </div>
            `:""}
      </div>
    `}};ar.styles=Ju;w([Se()],ar.prototype,"frozenFrame",2);w([Se()],ar.prototype,"isLoaded",2);w([ue(".animated-image__animated")],ar.prototype,"animatedImage",2);w([S()],ar.prototype,"src",2);w([S()],ar.prototype,"alt",2);w([S({type:Boolean,reflect:!0})],ar.prototype,"play",2);w([ae("play")],ar.prototype,"handlePlayChange",1);w([ae("src")],ar.prototype,"handleSrcChange",1);ar=w([ne("sl-animated-image")],ar);var ec=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Za=class extends re{constructor(){super(...arguments);this.label=""}handleFocus(t){let e=Bn(t.target);e==null||e.classList.add("sl-button-group__button--focus")}handleBlur(t){let e=Bn(t.target);e==null||e.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){let e=Bn(t.target);e==null||e.classList.add("sl-button-group__button--hover")}handleMouseOut(t){let e=Bn(t.target);e==null||e.classList.remove("sl-button-group__button--hover")}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{let r=t.indexOf(e),a=Bn(e);a!==null&&(a.classList.add("sl-button-group__button"),a.classList.toggle("sl-button-group__button--first",r===0),a.classList.toggle("sl-button-group__button--inner",r>0&&r<t.length-1),a.classList.toggle("sl-button-group__button--last",r===t.length-1))})}render(){return q`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Za.styles=ec;w([ue("slot")],Za.prototype,"defaultSlot",2);w([S()],Za.prototype,"label",2);Za=w([ne("sl-button-group")],Za);function Bn(t){return t.tagName.toLowerCase()==="sl-button"?t:t.querySelector("sl-button")}var tc=oe`
  ${le}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;var Qi=class extends re{constructor(){super(...arguments);this.hasSlotController=new lt(this,"footer","header","image")}render(){return q`
      <div
        part="base"
        class=${ge({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};Qi.styles=tc;Qi=w([ne("sl-card")],Qi);var rc=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled)
    .checkbox__input${xe}
    ~ .checkbox__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${xe} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled)
    .checkbox__input${xe}
    ~ .checkbox__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`;var zt=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this,{value:t=>t.checked?t.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.indeterminate=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,ee(this,"sl-change")}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleStateChange(){this.invalid=!this.input.checkValidity()}render(){return q`
      <label
        part="base"
        class=${ge({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          name=${he(this.name)}
          value=${he(this.value)}
          .indeterminate=${$t(this.indeterminate)}
          .checked=${$t(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked?q`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
          ${!this.checked&&this.indeterminate?q`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
        </span>

        <span part="label" class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `}};zt.styles=rc;w([ue('input[type="checkbox"]')],zt.prototype,"input",2);w([Se()],zt.prototype,"hasFocus",2);w([S()],zt.prototype,"name",2);w([S()],zt.prototype,"value",2);w([S({type:Boolean,reflect:!0})],zt.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],zt.prototype,"required",2);w([S({type:Boolean,reflect:!0})],zt.prototype,"checked",2);w([S({type:Boolean,reflect:!0})],zt.prototype,"indeterminate",2);w([S({type:Boolean,reflect:!0})],zt.prototype,"invalid",2);w([ae("disabled",{waitUntilFirstUpdate:!0})],zt.prototype,"handleDisabledChange",1);w([ae("checked",{waitUntilFirstUpdate:!0}),ae("indeterminate",{waitUntilFirstUpdate:!0})],zt.prototype,"handleStateChange",1);zt=w([ne("sl-checkbox")],zt);var ac=oe`
  ${le}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-x-small);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 3px 6px;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;var ma=class extends re{constructor(){super(...arguments);this.variant="primary",this.pill=!1,this.pulse=!1}render(){return q`
      <span
        part="base"
        class=${ge({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};ma.styles=ac;w([S({reflect:!0})],ma.prototype,"variant",2);w([S({type:Boolean,reflect:!0})],ma.prototype,"pill",2);w([S({type:Boolean,reflect:!0})],ma.prototype,"pulse",2);ma=w([ne("sl-badge")],ma);var nc=oe`
  ${le}

  :host {
    display: contents;
  }
`;var Yi={};Fl(Yi,{backInDown:()=>ev,backInLeft:()=>tv,backInRight:()=>rv,backInUp:()=>av,backOutDown:()=>nv,backOutLeft:()=>iv,backOutRight:()=>ov,backOutUp:()=>sv,bounce:()=>Vp,bounceIn:()=>lv,bounceInDown:()=>uv,bounceInLeft:()=>cv,bounceInRight:()=>dv,bounceInUp:()=>hv,bounceOut:()=>fv,bounceOutDown:()=>pv,bounceOutLeft:()=>vv,bounceOutRight:()=>gv,bounceOutUp:()=>mv,easings:()=>Lg,fadeIn:()=>yv,fadeInBottomLeft:()=>bv,fadeInBottomRight:()=>wv,fadeInDown:()=>xv,fadeInDownBig:()=>kv,fadeInLeft:()=>_v,fadeInLeftBig:()=>Cv,fadeInRight:()=>Ev,fadeInRightBig:()=>Sv,fadeInTopLeft:()=>Tv,fadeInTopRight:()=>Dv,fadeInUp:()=>Pv,fadeInUpBig:()=>Av,fadeOut:()=>Lv,fadeOutBottomLeft:()=>Iv,fadeOutBottomRight:()=>Ov,fadeOutDown:()=>$v,fadeOutDownBig:()=>Bv,fadeOutLeft:()=>zv,fadeOutLeftBig:()=>Mv,fadeOutRight:()=>Rv,fadeOutRightBig:()=>Fv,fadeOutTopLeft:()=>Nv,fadeOutTopRight:()=>Vv,fadeOutUp:()=>jv,fadeOutUpBig:()=>Kv,flash:()=>jp,flip:()=>Hv,flipInX:()=>Qv,flipInY:()=>Yv,flipOutX:()=>Xv,flipOutY:()=>Uv,headShake:()=>Kp,heartBeat:()=>Hp,hinge:()=>mg,jackInTheBox:()=>yg,jello:()=>Qp,lightSpeedInLeft:()=>qv,lightSpeedInRight:()=>Gv,lightSpeedOutLeft:()=>Zv,lightSpeedOutRight:()=>Wv,pulse:()=>Yp,rollIn:()=>bg,rollOut:()=>wg,rotateIn:()=>Jv,rotateInDownLeft:()=>eg,rotateInDownRight:()=>tg,rotateInUpLeft:()=>rg,rotateInUpRight:()=>ag,rotateOut:()=>ng,rotateOutDownLeft:()=>ig,rotateOutDownRight:()=>og,rotateOutUpLeft:()=>sg,rotateOutUpRight:()=>lg,rubberBand:()=>Xp,shake:()=>Up,shakeX:()=>qp,shakeY:()=>Gp,slideInDown:()=>ug,slideInLeft:()=>cg,slideInRight:()=>dg,slideInUp:()=>hg,slideOutDown:()=>fg,slideOutLeft:()=>pg,slideOutRight:()=>vg,slideOutUp:()=>gg,swing:()=>Zp,tada:()=>Wp,wobble:()=>Jp,zoomIn:()=>xg,zoomInDown:()=>kg,zoomInLeft:()=>_g,zoomInRight:()=>Cg,zoomInUp:()=>Eg,zoomOut:()=>Sg,zoomOutDown:()=>Tg,zoomOutLeft:()=>Dg,zoomOutRight:()=>Pg,zoomOutUp:()=>Ag});var Vp=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],jp=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],Kp=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],Hp=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],Qp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Yp=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Xp=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Up=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],qp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Gp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Zp=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],Wp=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Jp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],ev=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],tv=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],rv=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],av=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],nv=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],iv=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],ov=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],sv=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],lv=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],uv=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],cv=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],dv=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],hv=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],fv=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],pv=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],vv=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],gv=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],mv=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],yv=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],bv=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],wv=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],xv=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],kv=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],_v=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Cv=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ev=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Sv=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Tv=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Dv=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Pv=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Av=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Lv=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],Iv=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],Ov=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],$v=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],Bv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],zv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],Mv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],Rv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],Fv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],Nv=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],Vv=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],jv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],Kv=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],Hv=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],Qv=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],Yv=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],Xv=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],Uv=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],qv=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Gv=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Zv=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],Wv=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],Jv=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],eg=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],tg=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rg=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],ag=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],ng=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],ig=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],og=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],sg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],lg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],ug=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],cg=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],dg=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],hg=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],fg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],pg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],vg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],gg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],mg=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],yg=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],bg=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],wg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],xg=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],kg=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],_g=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Cg=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Eg=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Sg=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],Tg=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Dg=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],Pg=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],Ag=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Lg={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};var ut=class extends re{constructor(){super(...arguments);this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1}get currentTime(){var t,e;return(e=(t=this.animation)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation(),this.handleAnimationCancel=this.handleAnimationCancel.bind(this),this.handleAnimationFinish=this.handleAnimationFinish.bind(this)}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleAnimationChange(){!this.hasUpdated||this.createAnimation()}handleAnimationFinish(){this.play=!1,this.hasStarted=!1,ee(this,"sl-finish")}handleAnimationCancel(){this.play=!1,this.hasStarted=!1,ee(this,"sl-cancel")}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,ee(this,"sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var t,e;let r=(t=Yi.easings[this.easing])!=null?t:this.easing,a=(e=this.keyframes)!=null?e:Yi[this.name],o=(await this.defaultSlot).assignedElements()[0];return!o||!a?!1:(this.destroyAnimation(),this.animation=o.animate(a,{delay:this.delay,direction:this.direction,duration:this.duration,easing:r,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,ee(this,"sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}cancel(){var t;(t=this.animation)==null||t.cancel()}finish(){var t;(t=this.animation)==null||t.finish()}render(){return q` <slot @slotchange=${this.handleSlotChange}></slot> `}};ut.styles=nc;w([jl("slot")],ut.prototype,"defaultSlot",2);w([S()],ut.prototype,"name",2);w([S({type:Boolean,reflect:!0})],ut.prototype,"play",2);w([S({type:Number})],ut.prototype,"delay",2);w([S()],ut.prototype,"direction",2);w([S({type:Number})],ut.prototype,"duration",2);w([S()],ut.prototype,"easing",2);w([S({attribute:"end-delay",type:Number})],ut.prototype,"endDelay",2);w([S()],ut.prototype,"fill",2);w([S({type:Number})],ut.prototype,"iterations",2);w([S({attribute:"iteration-start",type:Number})],ut.prototype,"iterationStart",2);w([S({attribute:!1})],ut.prototype,"keyframes",2);w([S({attribute:"playback-rate",type:Number})],ut.prototype,"playbackRate",2);w([ae("name"),ae("delay"),ae("direction"),ae("duration"),ae("easing"),ae("endDelay"),ae("fill"),ae("iterations"),ae("iterationsStart"),ae("keyframes")],ut.prototype,"handleAnimationChange",1);w([ae("play")],ut.prototype,"handlePlayChange",1);w([ae("playbackRate")],ut.prototype,"handlePlaybackRateChange",1);ut=w([ne("sl-animation")],ut);var ic=oe`
  ${le}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label${xe} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-right: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
  }
`;var ya=class extends re{constructor(){super(...arguments);this.hasSlotController=new lt(this,"prefix","suffix"),this.rel="noreferrer noopener"}render(){let t=!!this.href;return q`
      <div
        part="base"
        class=${ge({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${t?q`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${he(this.target?this.target:void 0)}"
                rel=${he(this.target?this.rel:void 0)}
              >
                <slot></slot>
              </a>
            `:q`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};ya.styles=ic;w([S()],ya.prototype,"href",2);w([S()],ya.prototype,"target",2);w([S()],ya.prototype,"rel",2);ya=w([ne("sl-breadcrumb-item")],ya);var oc=oe`
  ${le}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-fast) background-color, var(--sl-transition-fast) color,
      var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default${xe}:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary${xe}:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success${xe}:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral${xe}:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning${xe}:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger${xe}:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default${xe}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary${xe}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success${xe}:not(.button--disabled) {
    border-color: var(--sl-color-success-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral${xe}:not(.button--disabled) {
    border-color: var(--sl-color-neutral-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning${xe}:not(.button--disabled) {
    border-color: var(--sl-color-warning-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger${xe}:not(.button--disabled) {
    border-color: var(--sl-color-danger-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text${xe}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`;var sc=(t,...e)=>({_$litStatic$:e.reduce((r,a,n)=>r+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(a)+t[n+1],t[0])}),lc=new Map,uc=t=>(e,...r)=>{var a;let n=r.length,o,i,s=[],l=[],u,c=0,d=!1;for(;c<n;){for(u=e[c];c<n&&(i=r[c],(o=(a=i)===null||a===void 0?void 0:a._$litStatic$)!==void 0);)u+=o+e[++c],d=!0;l.push(i),s.push(u),c++}if(c===n&&s.push(e[n]),d){let h=s.join("$$lit$$");(e=lc.get(h))===void 0&&(s.raw=s,lc.set(h,e=s)),r=l}return t(e,...r)},ys=uc(q),j3=uc(Al),Ge=class extends re{constructor(){super(...arguments);this.formSubmitController=new ft(this,{form:t=>{if(t.hasAttribute("form")){let e=t.getRootNode(),r=t.getAttribute("form");return e.getElementById(r)}return t.closest("form")}}),this.hasSlotController=new lt(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button"}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,ee(this,"sl-blur")}handleFocus(){this.hasFocus=!0,ee(this,"sl-focus")}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopPropagation();return}this.type==="submit"&&this.formSubmitController.submit(this)}render(){let t=!!this.href,e=t?sc`a`:sc`button`;return ys`
      <${e}
        part="base"
        class=${ge({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${he(t?void 0:this.disabled)}
        type=${this.type}
        name=${he(t?void 0:this.name)}
        value=${he(t?void 0:this.value)}
        href=${he(this.href)}
        target=${he(this.target)}
        download=${he(this.download)}
        rel=${he(this.target?"noreferrer noopener":void 0)}
        role="button"
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${this.caret?ys`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `:""}
        ${this.loading?ys`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};Ge.styles=oc;w([ue(".button")],Ge.prototype,"button",2);w([Se()],Ge.prototype,"hasFocus",2);w([S({reflect:!0})],Ge.prototype,"variant",2);w([S({reflect:!0})],Ge.prototype,"size",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"caret",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"disabled",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"loading",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"outline",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"pill",2);w([S({type:Boolean,reflect:!0})],Ge.prototype,"circle",2);w([S()],Ge.prototype,"type",2);w([S()],Ge.prototype,"name",2);w([S()],Ge.prototype,"value",2);w([S()],Ge.prototype,"href",2);w([S()],Ge.prototype,"target",2);w([S()],Ge.prototype,"download",2);w([S()],Ge.prototype,"form",2);w([S({attribute:"formaction"})],Ge.prototype,"formAction",2);w([S({attribute:"formmethod"})],Ge.prototype,"formMethod",2);w([S({attribute:"formnovalidate",type:Boolean})],Ge.prototype,"formNoValidate",2);w([S({attribute:"formtarget"})],Ge.prototype,"formTarget",2);Ge=w([ne("sl-button")],Ge);var cc=oe`
  ${le}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;var Xi=class extends re{render(){return q`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Xi.styles=cc;Xi=w([ne("sl-spinner")],Xi);var dc=oe`
  ${le}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-left: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }
`;var Wa=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),fr=class extends re{constructor(){super(...arguments);this.hasSlotController=new lt(this,"icon","suffix"),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}async toast(){return new Promise(t=>{Wa.parentElement===null&&document.body.append(Wa),Wa.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{Wa.removeChild(this),t(),Wa.querySelector("sl-alert")===null&&Wa.remove()},{once:!0})})}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){ee(this,"sl-show"),this.duration<1/0&&this.restartAutoHide(),await at(this.base),this.base.hidden=!1;let{keyframes:t,options:e}=Je(this,"alert.show");await We(this.base,t,e),ee(this,"sl-after-show")}else{ee(this,"sl-hide"),clearTimeout(this.autoHideTimeout),await at(this.base);let{keyframes:t,options:e}=Je(this,"alert.hide");await We(this.base,t,e),this.base.hidden=!0,ee(this,"sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}render(){return q`
      <div
        part="base"
        class=${ge({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable?q`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x"
                library="system"
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};fr.styles=dc;w([ue('[part="base"]')],fr.prototype,"base",2);w([S({type:Boolean,reflect:!0})],fr.prototype,"open",2);w([S({type:Boolean,reflect:!0})],fr.prototype,"closable",2);w([S({reflect:!0})],fr.prototype,"variant",2);w([S({type:Number})],fr.prototype,"duration",2);w([ae("open",{waitUntilFirstUpdate:!0})],fr.prototype,"handleOpenChange",1);w([ae("duration")],fr.prototype,"handleDurationChange",1);fr=w([ne("sl-alert")],fr);Ne("alert.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}});Ne("alert.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});var hc=oe`
  ${le}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${xe} {
    box-shadow: var(--sl-focus-ring);
  }
`;var Wt=class extends re{constructor(){super(...arguments);this.label="",this.disabled=!1}render(){let t=!!this.href,e=q`
      <sl-icon
        name=${he(this.name)}
        library=${he(this.library)}
        src=${he(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;return t?q`
          <a
            part="base"
            class="icon-button"
            href=${he(this.href)}
            target=${he(this.target)}
            download=${he(this.download)}
            rel=${he(this.target?"noreferrer noopener":void 0)}
            role="button"
            aria-disabled=${this.disabled?"true":"false"}
            aria-label="${this.label}"
            tabindex=${this.disabled?"-1":"0"}
          >
            ${e}
          </a>
        `:q`
          <button
            part="base"
            class=${ge({"icon-button":!0,"icon-button--disabled":this.disabled})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${e}
          </button>
        `}};Wt.styles=hc;w([ue("button")],Wt.prototype,"button",2);w([S()],Wt.prototype,"name",2);w([S()],Wt.prototype,"library",2);w([S()],Wt.prototype,"src",2);w([S()],Wt.prototype,"href",2);w([S()],Wt.prototype,"target",2);w([S()],Wt.prototype,"download",2);w([S()],Wt.prototype,"label",2);w([S({type:Boolean,reflect:!0})],Wt.prototype,"disabled",2);Wt=w([ne("sl-icon-button")],Wt);var fc=oe`
  ${le}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;var Lr=class extends re{constructor(){super(...arguments);this.hasError=!1,this.label="",this.shape="circle"}render(){return q`
      <div
        part="base"
        class=${ge({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials?q` <div part="initials" class="avatar__initials">${this.initials}</div> `:q`
              <div part="icon" class="avatar__icon" aria-hidden="true">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${typeof this.image=="string"&&!this.hasError?q`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                alt=""
                @error="${()=>this.hasError=!0}"
              />
            `:""}
      </div>
    `}};Lr.styles=fc;w([Se()],Lr.prototype,"hasError",2);w([S()],Lr.prototype,"image",2);w([S()],Lr.prototype,"label",2);w([S()],Lr.prototype,"initials",2);w([S({reflect:!0})],Lr.prototype,"shape",2);Lr=w([ne("sl-avatar")],Lr);var pc=oe`
  ${le}

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;var ba=class extends re{constructor(){super(...arguments);this.label="Breadcrumb"}getSeparator(){let e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),e.slot="separator",e}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="sl-breadcrumb-item");t.forEach((e,r)=>{e.querySelector('[slot="separator"]')===null&&e.append(this.getSeparator()),r===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return q`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <slot name="separator" hidden aria-hidden="true">
        <sl-icon name="chevron-right" library="system"></sl-icon>
      </slot>
    `}};ba.styles=pc;w([ue("slot")],ba.prototype,"defaultSlot",2);w([ue('slot[name="separator"]')],ba.prototype,"separatorSlot",2);w([S()],ba.prototype,"label",2);ba=w([ne("sl-breadcrumb")],ba);var lf=Vo(dl());var Gh=Vo(dl());async function zo(t){return(await fetch(t)).json()}function L1(t,e,r){let a=(0,Gh.default)({container:t,style:[{selector:"node:selected",style:{"background-color":"#9333ea"}},{selector:"node",style:{label:"data(title)","text-wrap":"wrap","text-max-width":120}},{selector:"edge",style:{"curve-style":"bezier","target-arrow-shape":"triangle"}}],layout:{name:"preset"},...e});return a.nodes().forEach(n=>{let o=document.createElement("div");o.innerHTML=n.data("title"),MathJax.typeset([o]),n.data("title",o.textContent)}),r&&a.on("select","node",r),a}function I1(){let t=window.location.hash.slice(1);return t?t.startsWith("tags/")?`graph/tag/${t.slice(5)}.json`:Number.isInteger(Number(t))?`graph/note/${t}.json`:"graph/data.json":"graph/data.json"}function Zh(t,e){t.addEventListener("click",async()=>{e.show();let r=e.querySelector("div"),a=L1(r,await zo(I1()),i=>{let{title:s,id:l}=i.target.data(),u=document.createElement("span");u.innerHTML=`${s} [<a href="#${l}">${l}</a>]`,e.label=u,u.querySelector("a").onclick=()=>(e.hide(),window.location.hash.slice(1)!==l)}),n=window.location.hash;if(n===""||n==="#"||!Number.isInteger(Number(n.slice(1)))){let i=a.nodes().roots(),s=Math.floor(Math.random()*i.length);n=`#${i[s].data("id")}`}let o=a.$(n);o.select(),a.center(o),a.zoom({level:1,renderedPosition:o.renderedPosition()}),window.cy=a})}function Wh(){window.location.hash.slice(1)||window.location.replace("#home")}function Jh(){window.addEventListener("DOMContentLoaded",Wh),window.addEventListener("hashchange",Wh)}var af=Vo(rf());function O1(t,e){let r=t?.querySelector("h1")?.innerHTML,a=document.createElement("h3"),n=document.createElement("a");return a.appendChild(n),n.href=`#${t.id}`,n.innerHTML=r,e&&(n.onclick=e),r?a:null}function $1(t,e){let r=O1(t,e);if(!r)return null;let a=document.createDocumentFragment();a.appendChild(r);let n=t.querySelector("p");return n&&a.appendChild(n.cloneNode(!0)),a}function B1(t,e){let r=$1(t,e);if(!r)return null;let a=document.createElement("div");return a.appendChild(r),a}function z1(t){return(0,af.default)(function(){this.ref("id"),this.field("textContent"),t.forEach(function(e){this.add(e)},this)})}function nf(){let t=Array.from(document.getElementsByClassName("slipbox-note")),e=z1(t),r=document.querySelector("#slipbox-search-dialog"),a=r.querySelector("sl-input"),n=r.querySelector(".slipbox-search-dialog-results");a.addEventListener("sl-input",()=>{try{let o=a.value===""?[]:e.search(a.value);n.textContent="";for(let i of o){let s=B1(document.getElementById(i.ref),()=>r.hide());s&&n.appendChild(s),n.appendChild(document.createElement("br"))}}catch{}}),r.addEventListener("sl-initial-focus",o=>{o.preventDefault(),a.focus({preventScroll:!0})})}function of(t){let e=Math.floor(Math.random()*t.length);return t[e]}function M1(t){let e=window.location.hash.slice(1);if(e&&Number.isInteger(Number(e))){let r=t.$(`#${e}`).outgoers().nodes();if(r.length>0)return of(r).data("id")}return of(t.nodes().roots()).data("id")}function sf(t,e){e.addEventListener("click",()=>{window.location.hash=`#${M1(t)}`})}Mi("boxicons",{resolver:t=>{let e="regular";return t.substring(0,4)==="bxs-"&&(e="solid"),t.substring(0,4)==="bxl-"&&(e="logos"),`https://cdn.jsdelivr.net/npm/boxicons@2.0.7/svg/${e}/${t}.svg`},mutator:t=>t.setAttribute("fill","currentColor")});window.addEventListener("DOMContentLoaded",async()=>{let t=await zo("graph/data.json"),e=document.getElementById("title-block-header");e&&e.remove(),nf(),Zh(document.querySelector('sl-icon-button[name="bx-network-chart"]'),document.querySelector("#slipbox-graph-dialog")),sf((0,lf.default)({headless:!0,...t}),document.querySelector('sl-icon-button[name="bx-shuffle"]'))});Jh();
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
Licensed under The MIT License (http://opensource.org/licenses/MIT)
*/
/*!
Event object based on jQuery events, MIT license

https://jquery.org/license/
https://tldrlegal.com/license/mit-license
https://github.com/jquery/jquery/blob/master/src/event.js
*/
/*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
/*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
