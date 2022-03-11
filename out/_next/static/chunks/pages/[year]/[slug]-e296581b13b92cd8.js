(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[494],{7484:function(n){n.exports=function(){"use strict";var n=1e3,t=6e4,e=36e5,r="millisecond",i="second",o="minute",s="hour",u="day",a="week",c="month",f="quarter",h="year",l="date",d="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(n,t,e){var r=String(n);return!r||r.length>=t?n:""+Array(t+1-r.length).join(e)+n},y={s:g,z:function(n){var t=-n.utcOffset(),e=Math.abs(t),r=Math.floor(e/60),i=e%60;return(t<=0?"+":"-")+g(r,2,"0")+":"+g(i,2,"0")},m:function n(t,e){if(t.date()<e.date())return-n(e,t);var r=12*(e.year()-t.year())+(e.month()-t.month()),i=t.clone().add(r,c),o=e-i<0,s=t.clone().add(r+(o?-1:1),c);return+(-(r+(e-i)/(o?i-s:s-i))||0)},a:function(n){return n<0?Math.ceil(n)||0:Math.floor(n)},p:function(n){return{M:c,y:h,w:a,d:u,D:l,h:s,m:o,s:i,ms:r,Q:f}[n]||String(n||"").toLowerCase().replace(/s$/,"")},u:function(n){return void 0===n}},v="en",x={};x[v]=$;var M=function(n){return n instanceof _},w=function(n,t,e){var r;if(!n)return v;if("string"==typeof n)x[n]&&(r=n),t&&(x[n]=t,r=n);else{var i=n.name;x[i]=n,r=i}return!e&&r&&(v=r),r||!e&&v},D=function(n,t){if(M(n))return n.clone();var e="object"==typeof t?t:{};return e.date=n,e.args=arguments,new _(e)},b=y;b.l=w,b.i=M,b.w=function(n,t){return D(n,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var _=function(){function $(n){this.$L=w(n.locale,null,!0),this.parse(n)}var g=$.prototype;return g.parse=function(n){this.$d=function(n){var t=n.date,e=n.utc;if(null===t)return new Date(NaN);if(b.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(p);if(r){var i=r[2]-1||0,o=(r[7]||"0").substring(0,3);return e?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(n),this.$x=n.x||{},this.init()},g.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},g.$utils=function(){return b},g.isValid=function(){return!(this.$d.toString()===d)},g.isSame=function(n,t){var e=D(n);return this.startOf(t)<=e&&e<=this.endOf(t)},g.isAfter=function(n,t){return D(n)<this.startOf(t)},g.isBefore=function(n,t){return this.endOf(t)<D(n)},g.$g=function(n,t,e){return b.u(n)?this[t]:this.set(e,n)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(n,t){var e=this,r=!!b.u(t)||t,f=b.p(n),d=function(n,t){var i=b.w(e.$u?Date.UTC(e.$y,t,n):new Date(e.$y,t,n),e);return r?i:i.endOf(u)},p=function(n,t){return b.w(e.toDate()[n].apply(e.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),e)},m=this.$W,$=this.$M,g=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case h:return r?d(1,0):d(31,11);case c:return r?d(1,$):d(0,$+1);case a:var v=this.$locale().weekStart||0,x=(m<v?m+7:m)-v;return d(r?g-x:g+(6-x),$);case u:case l:return p(y+"Hours",0);case s:return p(y+"Minutes",1);case o:return p(y+"Seconds",2);case i:return p(y+"Milliseconds",3);default:return this.clone()}},g.endOf=function(n){return this.startOf(n,!1)},g.$set=function(n,t){var e,a=b.p(n),f="set"+(this.$u?"UTC":""),d=(e={},e[u]=f+"Date",e[l]=f+"Date",e[c]=f+"Month",e[h]=f+"FullYear",e[s]=f+"Hours",e[o]=f+"Minutes",e[i]=f+"Seconds",e[r]=f+"Milliseconds",e)[a],p=a===u?this.$D+(t-this.$W):t;if(a===c||a===h){var m=this.clone().set(l,1);m.$d[d](p),m.init(),this.$d=m.set(l,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d](p);return this.init(),this},g.set=function(n,t){return this.clone().$set(n,t)},g.get=function(n){return this[b.p(n)]()},g.add=function(r,f){var l,d=this;r=Number(r);var p=b.p(f),m=function(n){var t=D(d);return b.w(t.date(t.date()+Math.round(n*r)),d)};if(p===c)return this.set(c,this.$M+r);if(p===h)return this.set(h,this.$y+r);if(p===u)return m(1);if(p===a)return m(7);var $=(l={},l[o]=t,l[s]=e,l[i]=n,l)[p]||1,g=this.$d.getTime()+r*$;return b.w(g,this)},g.subtract=function(n,t){return this.add(-1*n,t)},g.format=function(n){var t=this,e=this.$locale();if(!this.isValid())return e.invalidDate||d;var r=n||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),o=this.$H,s=this.$m,u=this.$M,a=e.weekdays,c=e.months,f=function(n,e,i,o){return n&&(n[e]||n(t,r))||i[e].substr(0,o)},h=function(n){return b.s(o%12||12,n,"0")},l=e.meridiem||function(n,t,e){var r=n<12?"AM":"PM";return e?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:b.s(u+1,2,"0"),MMM:f(e.monthsShort,u,c,3),MMMM:f(c,u),D:this.$D,DD:b.s(this.$D,2,"0"),d:String(this.$W),dd:f(e.weekdaysMin,this.$W,a,2),ddd:f(e.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(o),HH:b.s(o,2,"0"),h:h(1),hh:h(2),a:l(o,s,!0),A:l(o,s,!1),m:String(s),mm:b.s(s,2,"0"),s:String(this.$s),ss:b.s(this.$s,2,"0"),SSS:b.s(this.$ms,3,"0"),Z:i};return r.replace(m,(function(n,t){return t||p[n]||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,l,d){var p,m=b.p(l),$=D(r),g=($.utcOffset()-this.utcOffset())*t,y=this-$,v=b.m(this,$);return v=(p={},p[h]=v/12,p[c]=v,p[f]=v/3,p[a]=(y-g)/6048e5,p[u]=(y-g)/864e5,p[s]=y/e,p[o]=y/t,p[i]=y/n,p)[m]||y,d?v:b.a(v)},g.daysInMonth=function(){return this.endOf(c).$D},g.$locale=function(){return x[this.$L]},g.locale=function(n,t){if(!n)return this.$L;var e=this.clone(),r=w(n,t,!0);return r&&(e.$L=r),e},g.clone=function(){return b.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},$}(),S=_.prototype;return D.prototype=S,[["$ms",r],["$s",i],["$m",o],["$H",s],["$W",u],["$M",c],["$y",h],["$D",l]].forEach((function(n){S[n[1]]=function(t){return this.$g(t,n[0],n[1])}})),D.extend=function(n,t){return n.$i||(n(t,_,D),n.$i=!0),D},D.locale=w,D.isDayjs=M,D.unix=function(n){return D(1e3*n)},D.en=x[v],D.Ls=x,D.p={},D}()},7075:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[year]/[slug]",function(){return e(7439)}])},7439:function(n,t,e){"use strict";e.r(t),e.d(t,{__N_SSG:function(){return f},default:function(){return h}});var r=e(5893),i=e(7484),o=e.n(i),s=(e(4359),e(2962)),u=e(1163),a=(e(7294),e(1709)),c=e(9710),f=!0,h=function(n){var t=n.content,e=n.createAt,i=n.title,f=n.excerpt,h=(0,u.useRouter)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.PB,{title:i,description:f,openGraph:{title:i,description:f,locale:"ko_KR",type:"article",url:a.Q+h.asPath,site_name:a.y+" blog"}}),(0,r.jsxs)(c.L8,{children:[(0,r.jsxs)(c.mV,{children:[(0,r.jsx)(c.wz,{children:o()(e).format("YYYY/MM/DD")}),(0,r.jsx)(c.DZ,{children:i}),f&&(0,r.jsx)(c.TC,{children:f})]}),(0,r.jsx)(c.C2,{dangerouslySetInnerHTML:{__html:t}})]})]})}},9710:function(n,t,e){"use strict";e.d(t,{L8:function(){return l},mV:function(){return d},DZ:function(){return p},wz:function(){return m},TC:function(){return $},C2:function(){return g}});var r=e(917),i=e(5934);function o(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}function s(){var n=o(["\n    padding: 20px;\n    max-width: 480px;\n    color: ",";\n  "]);return s=function(){return n},n}function u(){var n=o(["\n    padding-bottom: 20px;\n    margin-bottom: 20px;\n    border-bottom: 1px solid ",";\n  "]);return u=function(){return n},n}function a(){var n=o(["\n    font-size: 36px;\n    font-weight: 700;\n  "]);return a=function(){return n},n}function c(){var n=o(["\n    display: block;\n    font-size: 14px;\n    margin-bottom: 10px;\n  "]);return c=function(){return n},n}function f(){var n=o(["\n    font-size: 14px;\n    margin-top: 10px;\n  "]);return f=function(){return n},n}function h(){var n=o(["\n    color: ",";\n    font-size: 16px;\n    line-height: 1.8;\n    word-break: keep-all;\n    overflow-wrap: break-word;\n\n    hr {\n      border: none;\n      border-bottom: 1px solid ",";\n      margin: 16px 0;\n    }\n\n    /* list */\n    ul {\n      li {\n        margin-left: 32px;\n        list-style: disc;\n        li {\n          list-style: circle;\n          li {\n            list-style: square;\n          }\n        }\n      }\n    }\n\n    ol {\n      li {\n        list-style: decimal;\n        margin-left: 32px;\n      }\n    }\n\n    /* headers */\n    h2 {\n      font-size: 28px;\n      font-weight: 700;\n      margin: 12px 0;\n      border-bottom: 1px solid ",";\n    }\n\n    h3 {\n      font-size: 22px;\n      font-weight: 700;\n      margin-top: 8px;\n    }\n\n    h4 {\n      font-size: 18px;\n      font-weight: 700;\n      margin-top: 8px;\n    }\n\n    h5,\n    h6 {\n      font-weight: 700;\n      margin-top: 6px;\n    }\n\n    /* typography */\n    p {\n      margin-block-start: 1ch;\n      margin-block-end: 1ch;\n    }\n\n    strong {\n      font-weight: 700;\n    }\n\n    em {\n      font-style: italic;\n    }\n\n    blockquote {\n      border-left: 4px solid ",";\n      line-height: 1.5;\n      padding: 4px 0;\n      padding-left: 12px;\n    }\n\n    pre {\n      font-family: JetBrains Mono, monospace;\n      padding: 12px;\n      background-color: ",";\n      border-radius: 4px;\n      line-height: 1.5;\n      overflow-x: auto;\n\n      code {\n        all: unset;\n        font-size: 14px;\n      }\n    }\n\n    code {\n      font-family: JetBrains Mono, monospace;\n      line-height: 1;\n      padding: 2px 4px;\n      background-color: ",";\n      border-radius: 4px;\n      font-size: 14px;\n      margin: 0 2px;\n    }\n\n    /* rich data */\n    img {\n      max-width: 100%;\n    }\n  "]);return h=function(){return n},n}var l=i.Z.article((function(n){var t=n.theme;return(0,r.css)(s(),t.colors.primaryColor)})),d=i.Z.header((function(n){var t=n.theme;return(0,r.css)(u(),t.colors.primaryColor)})),p=i.Z.h1((function(n){n.theme;return(0,r.css)(a())})),m=i.Z.time((function(n){n.theme;return(0,r.css)(c())})),$=i.Z.p((function(n){n.theme;return(0,r.css)(f())})),g=i.Z.section((function(n){var t=n.theme;return(0,r.css)(h(),t.colors.primaryColor,t.colors.gray[300],t.colors.gray[300],t.colors.gray[300],t.colors.gray[200],t.colors.gray[200])}))},4359:function(){}},function(n){n.O(0,[962,774,888,179],(function(){return t=7075,n(n.s=t);var t}));var t=n.O();_N_E=t}]);