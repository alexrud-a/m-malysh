(function(t){function e(e){for(var r,l,s=e[0],c=e[1],i=e[2],f=0,p=[];f<s.length;f++)l=s[f],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&p.push(o[l][0]),o[l]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=l(l.s=n[0]))}return t}var r={},o={info:0},a=[];function l(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=t,l.c=r,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(n,r,function(e){return t[e]}.bind(null,r));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var i=0;i<s.length;i++)e(s[i]);var u=c;a.push([11,"chunk-vendors"]),n()})({11:function(t,e,n){t.exports=n("e781")},8477:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-form",{staticClass:"form contact-form",on:{submit:t.onSubmit}},[n("h3",[t._v(" Связаться с нами ")]),n("b-form-group",[n("b-input",{attrs:{placeholder:"Ваше имя*"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("b-form-group",[n("b-input",{attrs:{placeholder:"Телефон*"},model:{value:t.form.tel,callback:function(e){t.$set(t.form,"tel",e)},expression:"form.tel"}})],1),n("b-form-group",[n("b-input",{attrs:{placeholder:"Email*"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),n("b-form-group",[n("b-form-checkbox",{attrs:{id:"accept"},model:{value:t.form.accept,callback:function(e){t.$set(t.form,"accept",e)},expression:"form.accept"}},[t._v(" Согласие на обработку персональных данных ")])],1),n("b-btn",{staticClass:"btn btn-blue",attrs:{type:"submit"}},[t._v(" Оставить заявку ")])],1)},o=[],a={name:"Form",data:function(){return{form:{name:"",tel:"",email:"",accept:!0}}},methods:{onSubmit:function(t){t.preventDefault(),alert(JSON.stringify(this.form)),this.onReset()},onReset:function(t){t.preventDefault(),this.form={name:"",tel:"",email:""}}}},l=a,s=n("2877"),c=Object(s["a"])(l,r,o,!1,null,null,null);e["a"]=c.exports},e781:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-container",{staticClass:"pt-5 pb-5"},[n("b-row",[n("b-col",{attrs:{sm:"12"}},[n("b-breadcrumb",[n("b-breadcrumb-item",{attrs:{href:"/"}},[t._v(" Главная ")]),n("b-breadcrumb-item",{attrs:{active:""}},[t._v(" "+t._s(t.title)+" ")])],1)],1),n("b-col",{attrs:{xl:"7",lg:"8",md:"12"}},[n("h1",[t._v(" "+t._s(t.title)+" ")]),t.content.length>0?n("div",{staticClass:"mb-4",domProps:{innerHTML:t._s(t.content)}}):t._e(),t._l(t.tabs,(function(e,r){return n("div",{key:r,staticClass:"tabs-collapse"},[n("b-link",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"collapse-"+r,expression:"'collapse-'+ind"}],staticClass:"tabs-collapse__link"},[n("svg",{attrs:{width:"10",height:"10"}},[n("use",{attrs:{"xlink:href":"/wp-content/themes/malysh/img/sprite.svg#right-arrow"}})]),n("span",[t._v(" "+t._s(e.title)+" ")])]),n("b-collapse",{staticClass:"pt-4",attrs:{id:"collapse-"+r}},[n("div",{domProps:{innerHTML:t._s(e.text)}})])],1)}))],2),n("b-col",{attrs:{xl:"5",lg:"4",md:"12"}},[n("Form")],1)],1)],1)],1)},a=[],l=n("bc3a"),s=n.n(l),c=n("8477"),i={name:"Info",components:{Form:c["a"]},data:function(){return{title:"",content:[],tabs:[]}},methods:{getContent:function(){var t=this;return s()("https://m-malysh.ru/wp-json/wp/v2/pages/66",{method:"GET"}).then((function(e){t.title=e.data.title.rendered,t.content=e.data.content.rendered,t.tabs=e.data.acf.tabs})).catch((function(t){return console.log(t),t}))}},created:function(){this.getContent()}},u=i,f=n("2877"),p=Object(f["a"])(u,o,a,!1,null,null,null),m=p.exports,b=n("5f5b");r["default"].use(b["a"]),r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(m)}}).$mount("#app")}});
//# sourceMappingURL=info.js.map