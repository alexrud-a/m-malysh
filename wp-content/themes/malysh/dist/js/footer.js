(function(t){function s(s){for(var a,o,i=s[0],c=s[1],l=s[2],m=0,h=[];m<i.length;m++)o=i[m],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&h.push(n[o][0]),n[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(s);while(h.length)h.shift()();return r.push.apply(r,l||[]),e()}function e(){for(var t,s=0;s<r.length;s++){for(var e=r[s],a=!0,i=1;i<e.length;i++){var c=e[i];0!==n[c]&&(a=!1)}a&&(r.splice(s--,1),t=o(o.s=e[0]))}return t}var a={},n={footer:0},r=[];function o(s){if(a[s])return a[s].exports;var e=a[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=a,o.d=function(t,s,e){o.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:e})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,s){if(1&s&&(t=o(t)),8&s)return t;if(4&s&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var a in t)o.d(e,a,function(s){return t[s]}.bind(null,a));return e},o.n=function(t){var s=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(s,"a",s),s},o.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=s,i=i.slice();for(var l=0;l<i.length;l++)s(i[l]);var u=c;r.push([1,"chunk-vendors"]),e()})({1:function(t,s,e){t.exports=e("34f1")},"34f1":function(t,s,e){"use strict";e.r(s);e("e260"),e("e6cf"),e("cca6"),e("a79d");var a=e("2b0e"),n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("footer",{staticClass:"footer",attrs:{id:"footer"}},[e("div",{staticClass:"footer__top"},[e("b-container",[e("b-row",[e("b-col",{attrs:{md:"4"}},[e("b-link",{attrs:{href:"/"}},[e("img",{staticClass:"img-fluid mb-2",attrs:{src:t.siteInfo.logo,width:"220"}})]),e("div",{staticClass:"contacts"},[e("div",{staticClass:"contacts__item"},[e("a",{attrs:{href:"tel:"+t.contacts.phone}},[e("svg",{attrs:{width:"20",height:"20"}},[e("use",{attrs:{"xlink:href":"/wp-content/themes/malysh/img/sprite.svg#phone-call"}})]),t._v(" "+t._s(t.contacts.phone)+" ")])]),e("div",{staticClass:"contacts__item"},[e("a",{attrs:{href:"mailto:"+t.contacts.email}},[e("svg",{attrs:{width:"20",height:"20"}},[e("use",{attrs:{"xlink:href":"/wp-content/themes/malysh/img/sprite.svg#mail"}})]),t._v(" "+t._s(t.contacts.email)+" ")])]),e("div",{staticClass:"contacts__item"},[e("span",[e("svg",{attrs:{width:"20",height:"20"}},[e("use",{attrs:{"xlink:href":"/wp-content/themes/malysh/img/sprite.svg#time"}})]),t._v(" "+t._s(t.contacts.time)+" ")])])]),e("b-link",{staticClass:"btn btn-blue-outline",attrs:{href:"/support"}},[t._v(" Служба поддержки ")])],1),e("b-col",{staticClass:"align-self-center",attrs:{md:"4"}},[e("b-nav",{staticClass:"footer__menu",attrs:{vertical:""}},t._l(this.menu,(function(s,a){return e("b-nav-item",{key:a,staticClass:"footer__menu-item",attrs:{href:s.url}},[t._v(" "+t._s(s.title)+" ")])})),1)],1),e("b-col",{attrs:{md:"4"}},[e("h3",[t._v(" Мы в INSTAGRAM ")]),e("b-row",[e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1),e("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[e("b-img",{attrs:{thumbnail:"",src:"https://picsum.photos/125/125/?image=58"}})],1)],1)],1)],1)],1)],1),e("div",{staticClass:"footer__copyright"},[e("b-container",[t._v(" (C) 2014-"+t._s(t.date.getFullYear())+". Моему малышу ")])],1)])},r=[],o=e("bc3a"),i=e.n(o),c={name:"Footer",data:function(){return{siteInfo:"",contacts:[],menu:[],date:new Date}},methods:{getContacts:function(){var t=this;return i()("https://m-malysh.ru/wp-json/wp/v2/pages/35",{method:"GET"}).then((function(s){t.contacts=s.data.acf.contacts})).catch((function(t){return console.log(t),t}))},getMenu:function(){var t=this;return i()("https://m-malysh.ru/wp-json/wp-api-menus/v2/menus/22",{method:"GET"}).then((function(s){t.menu=s.data.items})).catch((function(t){return console.log(t),t}))}},created:function(){this.siteInfo=window.siteInfo,this.getContacts(),this.getMenu()}},l=c,u=e("2877"),m=Object(u["a"])(l,n,r,!1,null,null,null),h=m.exports,p=e("5f5b");a["default"].use(p["a"]),a["default"].config.productionTip=!1,new a["default"]({render:function(t){return t(h)}}).$mount("#footer")}});
//# sourceMappingURL=footer.js.map