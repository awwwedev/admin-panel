(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e83cede"],{"0ee9":function(e,t,a){"use strict";a("ebea")},"6f88":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v(e._s(e.pageName))]),a("b-form",[a("b-card",{staticClass:"mb-3 shadow-sm",attrs:{header:"Основное"}},[a("b-form-group",{attrs:{label:"Заголовок","label-for":"header","invalid-feedback":e.getValidationMessage(e.$v.formData.header)}},[a("b-form-input",{attrs:{id:"header",state:e.getFieldState(e.$v.formData.header)},model:{value:e.formData.header,callback:function(t){e.$set(e.formData,"header","string"===typeof t?t.trim():t)},expression:"formData.header"}})],1),a("b-form-group",{attrs:{label:"Описание","label-for":"description","invalid-feedback":e.getValidationMessage(e.$v.formData.content)}},[a("vue-editor",{staticClass:"text-editor",class:{"is-invalid":e.$v.formData.content.$error},attrs:{id:"textarea","editor-toolbar":e.customToolbar},model:{value:e.formData.content,callback:function(t){e.$set(e.formData,"content","string"===typeof t?t.trim():t)},expression:"formData.content"}})],1)],1),a("b-card",{staticClass:"mb-3 shadow-sm",attrs:{header:"Основное изображение"}},[a("UploadedImage",{attrs:{image:e.formData.photo},on:{imageInitialized:function(t){e.temp.previewImagePath=t}}}),a("b-form-group",{attrs:{"label-for":"img_path","invalid-feedback":e.getValidationMessage(e.$v.formData.photo)}},[a("b-file",{attrs:{"browse-text":"Обзор...",id:"img_path",state:e.getFieldState(e.$v.formData.photo)},scopedSlots:e._u([{key:"placeholder",fn:function(){return[e._v(" Нет файлов ")]},proxy:!0}]),model:{value:e.temp.previewImageModel,callback:function(t){e.$set(e.temp,"previewImageModel",t)},expression:"temp.previewImageModel"}})],1)],1)],1),a("ConstructorActions",{attrs:{"cancel-to":{name:"admin.news"},"is-create-page":e.isCreatePage},on:{submit:e.onSubmit}})],1)},o=[],i=a("d4ec"),n=a("bee2"),s=a("262e"),c=a("2caf"),l=(a("a9e3"),a("9ab4")),d=a("1b40"),u=a("bf19"),m=a("1dce"),p=a("c67c"),f=a("b5ae"),b=a("c3e5"),h=a("0763"),v=a("fa10"),g=a("6fc5"),w=a("37c5"),D=a("5873"),k=function(e){Object(s["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(i["a"])(this,a),e=t.apply(this,arguments),e.entityName="новости",e.formData={id:null,header:"",content:"",photo:null},e.temp={previewImagePath:"",previewImageModel:null},e}return Object(n["a"])(a,[{key:"onSubmit",value:function(){var e=this;this.$v.$touch(),this.$v.$invalid||(this.isCreatePage?v["a"].create(this.formData).then((function(t){Object(g["e"])(w["a"],e.$store).setData({title:"Запись успешно создана",variant:"success"}),e.$router.push({name:"admin.news.change",params:{id:t.data.id}})})):v["a"].update(this.formData).then((function(t){Object(g["e"])(w["a"],e.$store).setData({title:"Запись успешно изменена",variant:"success"}),e.updateFormData(t.data)})))}},{key:"updateFormData",value:function(e){this.temp={previewImageModel:null,previewImagePath:e.photo},this.formData={content:e.content,header:e.header,id:e.id,photo:e.photo}}},{key:"created",value:function(){var e=this;this.isCreatePage||v["a"].get({id:Number(this.$route.params.id)}).then((function(t){e.updateFormData(t.data)}))}},{key:"watchTempPreviewImageModel",value:function(e){e&&(this.formData.photo=e)}}]),a}(Object(d["c"])(m["validationMixin"],p["a"],u["a"]));Object(l["a"])([Object(d["g"])("temp.previewImageModel")],k.prototype,"watchTempPreviewImageModel",null),k=Object(l["a"])([Object(d["a"])({components:{UploadedImage:h["a"],ConstructorActions:b["a"],VueEditor:D["a"]},validations:{formData:{header:{required:f["required"]},photo:{required:f["required"]},content:{required:f["required"]}}},data:function(){return{customToolbar:[[{header:[!1,2,3,4,5,6]}],["bold","italic","underline","strike"],[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link"],["clean"]]}}})],k);var j=k,y=j,$=(a("0ee9"),a("2877")),O=Object($["a"])(y,r,o,!1,null,"21c51250",null);t["default"]=O.exports},ebea:function(e,t,a){},fa10:function(e,t,a){"use strict";var r=a("5530"),o=a("d4ec"),i=a("bee2"),n=a("262e"),s=a("2caf"),c=(a("d3b7"),a("3949"),a("c873")),l=a("72df"),d=function(e){Object(n["a"])(a,e);var t=Object(s["a"])(a);function a(){return Object(o["a"])(this,a),t.apply(this,arguments)}return Object(i["a"])(a,null,[{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page:1};return c["a"].get("news",{params:e})}},{key:"get",value:function(e){return c["a"].get("news/"+e.id,{params:e})}},{key:"create",value:function(e){return c["a"].post("news",a.prepareFormData(e))}},{key:"update",value:function(e){return c["a"].post("news/"+e.id,a.prepareFormData(Object(r["a"])(Object(r["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return c["a"].delete("news",{params:{id:e}})}}]),a}(l["a"]);t["a"]=d}}]);
//# sourceMappingURL=chunk-6e83cede.55a3dfae.js.map