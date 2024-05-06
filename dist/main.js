(()=>{"use strict";const t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function e(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const n={date:e({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:e({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:e({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},a={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function r(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function o(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let u;return u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:e.slice(i.length)}}}var i;const s={code:"en-US",formatDistance:(e,n,a)=>{let r;const o=t[e];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:n,formatRelative:(t,e,n,r)=>a[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:r({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:r({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:r({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:r({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:r({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(i.matchPattern);if(!n)return null;const a=n[0],r=t.match(i.parsePattern);if(!r)return null;let o=i.valueCallback?i.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:o({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:o({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:o({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:o({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let c={};function u(){return c}Math.pow(10,8);const d=6048e5,l=864e5;function m(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function h(t){const e=m(t);return e.setHours(0,0,0,0),e}function f(t){const e=m(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function p(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function g(t){const e=m(t);return function(t,e){const n=h(t),a=h(e),r=+n-f(n),o=+a-f(a);return Math.round((r-o)/l)}(e,function(t){const e=m(t),n=p(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e))+1}function w(t,e){const n=u(),a=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=m(t),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function k(t){return w(t,{weekStartsOn:1})}function b(t){const e=m(t),n=e.getFullYear(),a=p(t,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=k(a),o=p(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=k(o);return e.getTime()>=r.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function y(t){const e=m(t),n=+k(e)-+function(t){const e=b(t),n=p(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),k(n)}(e);return Math.round(n/d)+1}function v(t,e){const n=m(t),a=n.getFullYear(),r=u(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=p(t,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=w(i,e),c=p(t,0);c.setFullYear(a,0,o),c.setHours(0,0,0,0);const d=w(c,e);return n.getTime()>=s.getTime()?a+1:n.getTime()>=d.getTime()?a:a-1}function C(t,e){const n=m(t),a=+w(n,e)-+function(t,e){const n=u(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=v(t,e),o=p(t,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),w(o,e)}(n,e);return Math.round(a/d)+1}function N(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const M={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return N("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):N(n+1,2)},d:(t,e)=>N(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>N(t.getHours()%12||12,e.length),H:(t,e)=>N(t.getHours(),e.length),m:(t,e)=>N(t.getMinutes(),e.length),s:(t,e)=>N(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return N(Math.trunc(a*Math.pow(10,n-3)),e.length)}},j={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return M.y(t,e)},Y:function(t,e,n,a){const r=v(t,a),o=r>0?r:1-r;return"YY"===e?N(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):N(o,e.length)},R:function(t,e){return N(b(t),e.length)},u:function(t,e){return N(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return N(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return N(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return M.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return N(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=C(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):N(r,e.length)},I:function(t,e,n){const a=y(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):N(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):M.d(t,e)},D:function(t,e,n){const a=g(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):N(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return N(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return N(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return N(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return M.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):M.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):N(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):N(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):M.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):M.s(t,e)},S:function(t,e){return M.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return D(a);case"XXXX":case"XX":return S(a);default:return S(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return D(a);case"xxxx":case"xx":return S(a);default:return S(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+T(a,":");default:return"GMT"+S(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+T(a,":");default:return"GMT"+S(a,":")}},t:function(t,e,n){return N(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return N(t.getTime(),e.length)}};function T(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+N(o,2)}function D(t,e){return t%60==0?(t>0?"-":"+")+N(Math.abs(t)/60,2):S(t,e)}function S(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+N(Math.trunc(a/60),2)+e+N(a%60,2)}const P=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},x=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},E={p:x,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return P(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",P(a,e)).replace("{{time}}",x(r,e))}},W=/^D+$/,B=/^Y+$/,L=["D","DD","YY","YYYY"];function q(t){if(!(e=t,e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)||"number"==typeof t))return!1;var e;const n=m(t);return!isNaN(Number(n))}const O=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Y=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,H=/^'([^]*?)'?$/,$=/''/g,F=/[a-zA-Z]/;function A(t,e,n){const a=u(),r=n?.locale??a.locale??s,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,c=m(t);if(!q(c))throw new RangeError("Invalid time value");let d=e.match(Y).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,E[e])(t,r.formatLong):t})).join("").match(O).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:z(t)};if(j[e])return{isToken:!0,value:t};if(e.match(F))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));r.localize.preprocessor&&(d=r.localize.preprocessor(c,d));const l={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return d.map((a=>{if(!a.isToken)return a.value;const o=a.value;return(!n?.useAdditionalWeekYearTokens&&function(t){return B.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return W.test(t)}(o))&&function(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(a),L.includes(t))throw new RangeError(a)}(o,e,String(t)),(0,j[o[0]])(c,o,r.localize,l)})).join("")}function z(t){const e=t.match(H);return e?e[1].replace($,"'"):t}let Q=[];function X(t){let e=JSON.stringify(t);localStorage.setItem("Projects",e)}function G(t,e){if("edit"===t){const t=e.replace(/(st|nd|rd|th),/,","),n=new Date(t);return`${n.getFullYear()}-${("0"+(n.getMonth()+1)).slice(-2)}-${("0"+n.getDate()).slice(-2)}`}{const t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=t=>{if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},a=e.split("-"),r=a[0],o=parseInt(a[1],10)-1,i=parseInt(a[2],10);return`${t[o]} ${i}${n(i)}, ${r}`}}let I={projectName:"New Project",projectTasks:[{name:"Task Name",description:"Task Description",date:A(new Date,"MMMM do, yyyy h:mm aa"),status:!1}],projectIndex:"new"};Q.push({projectName:"Test Project 1",projectTasks:[{name:"Task 1",description:"Task Description 1",date:"December 31st, 1999, 11:57 PM",status:!1},{name:"Task  2",description:"Task Description 2",date:"December 31st, 1999, 11:57 PM",status:!1}],projectIndex:1}),Q.push({projectName:"Test Project 2",projectTasks:[{name:"Task 1",description:"Task Description 1",date:"December 31st, 1999, 11:57 PM",status:!1}],projectIndex:2}),document.getElementById("projectTemplate"),document.getElementById("taskTemplate");const J=document.querySelector(".projects-container"),R=document.querySelector(".completed-tasks-container");function U(){R.innerHTML="";for(const t of Q){const e=document.createElement("div"),n=document.createElement("div"),a=document.createElement("div");e.className="tasks-list-container",n.className="completed-task-project-name",n.id=Q.indexOf(t),n.innerHTML=t.projectName;for(const r of t.projectTasks)if(!0===r.status){const o=document.createElement("div");o.innerHTML=r.name,a.appendChild(o);let i=`${t.projectName}`;i=i.replace(/ /g,"_"),console.log(i),document.getElementById(i)?(e.appendChild(a),R.appendChild(e)):(e.appendChild(n),e.appendChild(a),R.appendChild(e))}}}function V(t,e,n){!0===n.status?(t.style.backgroundColor="rgb(235 209 178)",t.classList.add("strike"),e.checked=!0,U()):(t.style.backgroundColor="rgb(255, 244, 230",e.checked=!1,t.classList.remove("strike"),U())}const K={view:"all",style:"view",getStatus:function(){return{view:this.view,style:this.style}}};function Z(t){const e=document.createElement("div"),n=document.createElement("div");return"view"===t?{mainContainer:e,projectNameContainer:n,projectName:document.createElement("div"),editProjectButton:document.createElement("button"),deleteProjectButton:document.createElement("button")}:{mainContainer:e,projectNameContainer:n,projectName:document.createElement("input"),addTaskButton:document.createElement("button"),saveButton:document.createElement("button"),deleteProjectButton:document.createElement("button")}}function _(t,e,n,a){return t.mainContainer.className="project-container",t.projectNameContainer.className="project-name-container",t.projectName.className="project-name","view"===e?(t.editProjectButton.className="add-task-button",t.editProjectButton.innerText="Edit Project",t.editProjectButton.id=a,t.deleteProjectButton.className="delete-project-button",t.deleteProjectButton.innerText="Delete Project",t.projectName.innerText=n.projectName,t.editProjectButton.addEventListener("click",(()=>{nt("edit","single",a)})),t.deleteProjectButton.addEventListener("click",(()=>{!function(t){Q=Q.filter((e=>e!==t))}(n),X(Q),U(),nt("view","all")})),t.projectNameContainer.appendChild(t.projectName),t.projectNameContainer.appendChild(t.editProjectButton),t.projectNameContainer.appendChild(t.deleteProjectButton),t.mainContainer.appendChild(t.projectNameContainer),t.mainContainer):(t.projectName.value=n.projectName,t.addTaskButton.className="add-task-button",t.addTaskButton.innerText="Add New Task",t.saveButton.className="save-button",t.saveButton.innerText="Save",t.deleteProjectButton.className="delete-project-button",t.deleteProjectButton.innerText="Delete Project",t.projectName.innerText=n.projectName,t.addTaskButton.addEventListener("click",(()=>{!function(t){const e={name:`Task ${t.projectTasks.length+1}`,description:`Task Description ${t.projectTasks.length+1}`,status:!1,date:A(new Date,"MMMM do, yyyy h:mm aa")};t.projectTasks.push(e)}(n),nt("edit","single",a)})),t.saveButton.addEventListener("click",(()=>{!function(t,e){e.projectName=t.projectName.value;let n=0;for(let t of e.projectTasks){let e=null;if(t.name=document.querySelector(`#name${n}`).value,t.description=document.querySelector(`#description${n}`).value,document.querySelector(`#date${n}`)){const t=document.querySelector(`#date${n}`).querySelector(":first-child").value;e=G("save",t),console.log(t)}t.date=e,n++}X(Q),console.log(Q),console.log(localStorage)}(t,n),nt(K.getStatus().style,K.getStatus().view,a)})),t.projectNameContainer.appendChild(t.projectName),t.projectNameContainer.appendChild(t.addTaskButton),t.projectNameContainer.appendChild(t.saveButton),t.mainContainer.appendChild(t.projectNameContainer),t.mainContainer)}function tt(t,e,n,a,r){return t.taskContainer.className="task-container",t.taskNameContainer.className="task-name-container",t.taskDescriptionContainer.className="task-description-container",t.taskDate.innerHTML=n.date,"view"===e?(t.taskName.className="task-name",t.taskName.innerText=n.name,t.taskName.id=`name${a}`,t.taskStatus.type="checkbox",t.taskDate.innerHTML=n.date,t.taskDate.id=`date${a}`,t.taskStatus.innerHTML="Not Complete",t.taskStatus.innerText=n.status,t.taskStatus.id=`status${a}`,t.taskDescription.id=`description${a}`,t.taskDescription.className="task-description",t.taskDescription.innerText=n.description,t.taskStatus.addEventListener("change",(()=>{!0===t.taskStatus.checked?n.status=!0:n.status=!1,V(t.taskContainer,t.taskStatus,n),X(Q)})),V(t.taskContainer,t.taskStatus,n),t.taskNameContainer.appendChild(t.taskName),t.taskNameContainer.appendChild(t.taskDate),t.taskNameContainer.appendChild(t.taskStatus),t.taskContainer.appendChild(t.taskNameContainer),t.taskDescriptionContainer.appendChild(t.taskDescription),t.taskContainer.appendChild(t.taskDescriptionContainer),t.taskContainer):(t.taskName.className="task-name",t.taskName.value=n.name,t.taskName.id=`name${a}`,t.taskDescription.id=`description${a}`,t.taskDate.id=`date${a}`,t.taskDate.innerHTML=`<input type="date" value="${G("edit",n.date)}">`,t.deleteTaskButton.className="delete-task-button",t.deleteTaskButton.innerText="X",t.taskDescription.className="task-description",t.taskDescription.value=n.description,t.deleteTaskButton.addEventListener("click",(()=>{!function(t,e){Q[e].projectTasks=Q[e].projectTasks.filter((e=>e!==t))}(n,r),U(),nt("edit","single",r)})),t.taskNameContainer.appendChild(t.taskName),t.taskNameContainer.appendChild(t.taskDate),t.taskNameContainer.appendChild(t.deleteTaskButton),t.taskContainer.appendChild(t.taskNameContainer),t.taskDescriptionContainer.appendChild(t.taskDescription),t.taskContainer.appendChild(t.taskDescriptionContainer),t.taskContainer)}function et(t){const e=document.createElement("div"),n=document.createElement("div"),a=document.createElement("div"),r=document.createElement("div");return"view"===t?{taskContainer:e,taskNameContainer:n,taskName:document.createElement("div"),taskDate:r,taskStatus:document.createElement("input"),taskDescriptionContainer:a,taskDescription:document.createElement("div")}:{taskContainer:e,taskNameContainer:n,taskName:document.createElement("input"),taskDate:r,deleteTaskButton:document.createElement("button"),taskDescriptionContainer:a,taskDescription:document.createElement("input")}}function nt(t,e,n){if(function(){const t=document.querySelector(".projects-list-container");t.innerHTML="";for(let e of Q){const n=document.createElement("button");n.innerText=e.projectName,n.id=Q.indexOf(e),n.dataset.buttons="list-buttons",n.className="project-buttons",n.addEventListener("click",(()=>{nt("view","single",n.id)})),t.appendChild(n)}}(),J.innerHTML="","single"===e){const e=document.createElement("div");e.className="main-container";const a=_(Z(t),t,Q[n],n);e.appendChild(a);let r=0;for(let a of Q[n].projectTasks){const o=tt(et(t),t,a,r,n);e.appendChild(o),r++}J.appendChild(e)}else for(let e of Q){const n=document.createElement("div");n.className="main-container";const a=_(Z(t),t,e,Q.indexOf(e));n.appendChild(a);let r=0;for(let a of e.projectTasks){const e=tt(et(t),t,a);n.appendChild(e),r++}J.appendChild(n)}}!function(){const t=document.querySelector("#view-all-button"),e=document.querySelector("#add-new-project-button"),n=document.querySelector(".clear-data-button");t.addEventListener("click",(()=>{K.view="all",K.style="view",nt("view")})),e.addEventListener("click",(()=>{!function(){const t=structuredClone(I);Q.push(t),nt("edit","single",Q.length-1)}()})),n.addEventListener("click",(()=>{!0===confirm("Are You Sure? This will delete ALL of the projects on this device.")&&(localStorage.clear(),Q=[],nt("view","all"))}))}(),localStorage.getItem("Projects")&&(Q=JSON.parse(localStorage.getItem("Projects"))),nt(K.getStatus().style)})();