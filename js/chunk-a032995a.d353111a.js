(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a032995a"],{5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var r=a("1d80"),o=a("5899"),n="["+o+"]",i=RegExp("^"+n+n+"*"),c=RegExp(n+n+"*$"),s=function(e){return function(t){var a=String(r(t));return 1&e&&(a=a.replace(i,"")),2&e&&(a=a.replace(c,"")),a}};e.exports={start:s(1),end:s(2),trim:s(3)}},"6f88":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v(e._s(e.pageName))]),a("b-form",[a("b-card",{staticClass:"mb-3 shadow-sm",attrs:{header:"Основное"}},[a("b-form-group",{attrs:{label:"Заголовок","label-for":"header","invalid-feedback":e.getValidationMessage(e.$v.formData.header)}},[a("b-form-input",{attrs:{id:"header",state:e.getFieldState(e.$v.formData.header)},model:{value:e.formData.header,callback:function(t){e.$set(e.formData,"header","string"===typeof t?t.trim():t)},expression:"formData.header"}})],1),a("b-form-group",{attrs:{label:"Описание","label-for":"description","invalid-feedback":e.getValidationMessage(e.$v.formData.content)}},[a("b-form-textarea",{attrs:{id:"textarea",rows:"3","max-rows":"10",state:e.getFieldState(e.$v.formData.content)},model:{value:e.formData.content,callback:function(t){e.$set(e.formData,"content","string"===typeof t?t.trim():t)},expression:"formData.content"}})],1)],1),a("b-card",{staticClass:"mb-3 shadow-sm",attrs:{header:"Основное изображение"}},[a("UploadedImage",{attrs:{image:e.formData.photo},on:{imageInitialized:function(t){e.temp.previewImagePath=t}}}),a("b-form-group",{attrs:{"label-for":"img_path","invalid-feedback":e.getValidationMessage(e.$v.formData.photo)}},[a("b-file",{attrs:{"browse-text":"Обзор...",id:"img_path",state:e.getFieldState(e.$v.formData.photo)},scopedSlots:e._u([{key:"placeholder",fn:function(){return[e._v(" Нет файлов ")]},proxy:!0}]),model:{value:e.temp.previewImageModel,callback:function(t){e.$set(e.temp,"previewImageModel",t)},expression:"temp.previewImageModel"}})],1)],1)],1),a("ConstructorActions",{attrs:{"cancel-to":{name:"admin.news"},"is-create-page":e.isCreatePage},on:{submit:e.onSubmit}})],1)},o=[],n=a("5530"),i=a("d4ec"),c=a("bee2"),s=a("262e"),u=a("2caf"),f=(a("a9e3"),a("9ab4")),d=a("1b40"),l=a("bf19"),p=a("1dce"),m=a("c67c"),h=a("b5ae"),b=a("c3e5"),v=a("0763"),g=a("fa10"),w=a("6fc5"),I=a("37c5"),D=function(e){Object(s["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(i["a"])(this,a),e=t.apply(this,arguments),e.entityName="новости",e.formData={id:null,header:"",content:"",photo:null},e.temp={previewImagePath:"",previewImageModel:null},e}return Object(c["a"])(a,[{key:"onSubmit",value:function(){var e=this;this.$v.$touch(),this.$v.$invalid||(this.isCreatePage?g["a"].create(this.formData).then((function(t){Object(w["e"])(I["a"],e.$store).setData({title:"Запись успешно создана",variant:"success"}),e.$router.push({name:"admin.news.change",params:{id:t.data.id}})})):g["a"].update(this.formData).then((function(t){Object(w["e"])(I["a"],e.$store).setData({title:"Запись успешно изменена",variant:"success"}),e.updateFormData(t.data)})))}},{key:"updateFormData",value:function(e){this.temp={previewImageModel:null,previewImagePath:e.photo},this.formData={content:e.content,header:e.header,id:e.id,photo:e.photo}}},{key:"created",value:function(){var e=this;this.isCreatePage||g["a"].get({id:Number(this.$route.params.id)}).then((function(t){var a=t.data;e.formData=Object(n["a"])(Object(n["a"])({},e.formData),a),e.temp.previewImagePath=a.photo,e.formData.photo=a.photo}))}},{key:"watchTempPreviewImageModel",value:function(e){e&&(this.formData.photo=e)}}]),a}(Object(d["c"])(p["validationMixin"],m["a"],l["a"]));Object(f["a"])([Object(d["g"])("temp.previewImageModel")],D.prototype,"watchTempPreviewImageModel",null),D=Object(f["a"])([Object(d["a"])({components:{UploadedImage:v["a"],ConstructorActions:b["a"]},validations:{formData:{header:{required:h["required"]},photo:{required:h["required"]},content:{required:h["required"]}}}})],D);var y=D,O=y,N=(a("bde8"),a("2877")),k=Object(N["a"])(O,r,o,!1,null,"994ede1c",null);t["default"]=k.exports},7156:function(e,t,a){var r=a("861d"),o=a("d2bb");e.exports=function(e,t,a){var n,i;return o&&"function"==typeof(n=t.constructor)&&n!==a&&r(i=n.prototype)&&i!==a.prototype&&o(e,i),e}},a9e3:function(e,t,a){"use strict";var r=a("83ab"),o=a("da84"),n=a("94ca"),i=a("6eeb"),c=a("5135"),s=a("c6b6"),u=a("7156"),f=a("c04e"),d=a("d039"),l=a("7c73"),p=a("241c").f,m=a("06cf").f,h=a("9bf2").f,b=a("58a8").trim,v="Number",g=o[v],w=g.prototype,I=s(l(w))==v,D=function(e){var t,a,r,o,n,i,c,s,u=f(e,!1);if("string"==typeof u&&u.length>2)if(u=b(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+u}for(n=u.slice(2),i=n.length,c=0;c<i;c++)if(s=n.charCodeAt(c),s<48||s>o)return NaN;return parseInt(n,r)}return+u};if(n(v,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var y,O=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof O&&(I?d((function(){w.valueOf.call(a)})):s(a)!=v)?u(new g(D(t)),a,O):D(t)},N=r?p(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),k=0;N.length>k;k++)c(g,y=N[k])&&!c(O,y)&&h(O,y,m(g,y));O.prototype=w,w.constructor=O,i(o,v,O)}},bde8:function(e,t,a){"use strict";a("f587")},f587:function(e,t,a){},fa10:function(e,t,a){"use strict";var r=a("5530"),o=a("d4ec"),n=a("bee2"),i=a("262e"),c=a("2caf"),s=(a("d3b7"),a("3949"),a("c873")),u=a("72df"),f=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),t.apply(this,arguments)}return Object(n["a"])(a,null,[{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page:1};return s["a"].get("news",{params:e})}},{key:"get",value:function(e){return s["a"].get("news/"+e.id,{params:e})}},{key:"create",value:function(e){return s["a"].post("news",a.prepareFormData(e))}},{key:"update",value:function(e){return s["a"].post("news/"+e.id,a.prepareFormData(Object(r["a"])(Object(r["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return s["a"].delete("news",{params:{id:e}})}}]),a}(u["a"]);t["a"]=f}}]);
//# sourceMappingURL=chunk-a032995a.d353111a.js.map