(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c119d87"],{"03b8":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v(e._s(e.pageName))]),a("b-form",[a("b-card",{staticClass:"mb-3 shadow-sm",attrs:{header:"Основное"}},[a("b-form-group",{attrs:{label:"Название","label-for":"name","invalid-feedback":e.getValidationMessage(e.$v.formData.name)}},[a("b-form-input",{attrs:{id:"name",state:e.getFieldState(e.$v.formData.name)},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name","string"===typeof t?t.trim():t)},expression:"formData.name"}})],1),a("b-form-group",{attrs:{label:"Тип","label-for":"type","invalid-feedback":e.getValidationMessage(e.$v.formData.realty_type_id)}},[a("b-select",{attrs:{id:"type",state:e.getFieldState(e.$v.formData.realty_type_id)},model:{value:e.formData.realty_type_id,callback:function(t){e.$set(e.formData,"realty_type_id",t)},expression:"formData.realty_type_id"}},[a("b-select-option",{attrs:{value:null}},[e._v("--- Выберите тип ---")]),e._l(e.types,(function(t,r){return a("b-select-option",{key:r,attrs:{value:t.id}},[e._v(" "+e._s(t.name)+" ")])}))],2)],1)],1)],1),a("ConstructorActions",{attrs:{"cancel-to":{name:"admin.equipment"},"is-create-page":e.isCreatePage},on:{submit:e.onSubmit}})],1)},n=[],i=a("d4ec"),u=a("bee2"),c=a("262e"),s=a("2caf"),o=(a("b0c0"),a("9ab4")),l=a("1b40"),d=a("bf19"),m=a("1dce"),p=a("c67c"),f=a("b5ae"),b=a("c3e5"),y=a("de84"),v=a("6fc5"),h=a("37c5"),g=a("0763"),_=a("3855"),D=function(e){Object(c["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(i["a"])(this,a),e=t.apply(this,arguments),e.entityName="комплектация недвижимости",e.types=[],e.formData={id:null,name:"",realty_type_id:null},e}return Object(u["a"])(a,[{key:"onSubmit",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$v.$touch(),this.$v.$invalid?Object(v["e"])(h["a"],this.$store).setData({title:"Ошибка валидации!",text:"Проверте корректность и запоолненость полей",variant:"danger"}):(this.isCreatePage?_["a"].create(this.formData).then((function(t){Object(v["e"])(h["a"],e.$store).setData({title:"Запись успешно создана",variant:"success"}),e.$router.push({name:"admin.equipment.change",params:{id:t.data.id}})})):_["a"].update(this.formData).then((function(t){Object(v["e"])(h["a"],e.$store).setData({title:"Запись успешно изменена",variant:"success"}),e.updateFormData(t.data)})),t&&this.$router.push({name:"admin.equipment"}))}},{key:"updateFormData",value:function(e){this.formData={name:e.name,id:e.id,realty_type_id:e.realty_type_id}}},{key:"created",value:function(){var e=this;y["a"].getList().then((function(t){e.types=t.data})),this.isCreatePage||_["a"].get({id:this.$route.params.id}).then((function(t){return e.updateFormData(t.data)}))}}]),a}(Object(l["c"])(m["validationMixin"],p["a"],d["a"]));D=Object(o["a"])([Object(l["a"])({components:{UploadedImage:g["a"],ConstructorActions:b["a"]},validations:{formData:{name:{required:f["required"]},realty_type_id:{required:f["required"]}}}})],D);var j=D,O=j,k=a("2877"),$=Object(k["a"])(O,r,n,!1,null,"3e637db0",null);t["default"]=$.exports},3855:function(e,t,a){"use strict";var r=a("5530"),n=a("d4ec"),i=a("bee2"),u=a("262e"),c=a("2caf"),s=(a("d3b7"),a("3949"),a("c873")),o=a("72df"),l=function(e){Object(u["a"])(a,e);var t=Object(c["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(i["a"])(a,null,[{key:"get",value:function(e){return s["a"].get("equipment/"+e.id,{params:e})}},{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s["a"].get("equipment",{params:e})}},{key:"create",value:function(e){return s["a"].post("equipment",a.prepareFormData(e))}},{key:"update",value:function(e){return s["a"].post("equipment/"+e.id,a.prepareFormData(Object(r["a"])(Object(r["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return s["a"].delete("equipment",{params:{id:e}})}}]),a}(o["a"]);t["a"]=l},de84:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a("5530"),n=a("d4ec"),i=a("bee2"),u=a("262e"),c=a("2caf"),s=(a("b0c0"),a("d3b7"),a("3949"),a("c873")),o=a("72df"),l=function(e){Object(u["a"])(a,e);var t=Object(c["a"])(a);function a(e){var r;return Object(n["a"])(this,a),r=t.call(this),r.id=e.id,r.name=e.name,r}return Object(i["a"])(a,null,[{key:"get",value:function(e){return s["a"].get("realtyType/"+e.id,{params:e})}},{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s["a"].get("realtyType",{params:e})}},{key:"create",value:function(e){return s["a"].post("realtyType",a.prepareFormData(e))}},{key:"update",value:function(e){return s["a"].post("realtyType/"+e.id,a.prepareFormData(Object(r["a"])(Object(r["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return s["a"].delete("realtyType",{params:{id:e}})}}]),a}(o["a"])}}]);
//# sourceMappingURL=chunk-7c119d87.56904f91.js.map