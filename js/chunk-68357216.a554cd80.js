(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68357216"],{"75c3":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v("Новости")]),a("b-card",{staticClass:"mb-4 shadow-sm"},[a("div",{staticClass:"d-flex"},[a("b-button",{staticClass:"mr-2",attrs:{variant:"primary",to:{name:"admin.news.create"}}},[e._v("Создать")]),a("b-button",{staticClass:"mr-3",attrs:{variant:"info"},on:{click:e.onSelectAll}},[e._v(e._s(e.selectionBtnText))]),a("b-button",{staticClass:"my-2 my-sm-0",attrs:{variant:"danger",disabled:!e.selected.length},on:{click:e.onDelete}},[e._v("Удалить выбранное")])],1)]),a("b-card",{staticClass:"shadow-sm"},[a("b-form",{staticClass:"mb-3",attrs:{inline:""},on:{submit:function(t){return t.preventDefault(),e.omSearch(t)}}},[a("b-form-input",{staticClass:"mr-sm-2",attrs:{placeholder:"Поиск"},model:{value:e.tableTemp.searchValue,callback:function(t){e.$set(e.tableTemp,"searchValue",t)},expression:"tableTemp.searchValue"}}),a("b-select",{staticClass:"mr-sm-3",model:{value:e.tableTemp.searchField,callback:function(t){e.$set(e.tableTemp,"searchField",t)},expression:"tableTemp.searchField"}},[a("b-select-option",{attrs:{value:null}},[e._v(" --- Выберите поле для поиска --- ")]),e._l(e.fields,(function(t,s){return t.searchable?a("b-select-option",{key:s,attrs:{value:t.key}},[e._v(" "+e._s(t.label)+" ")]):e._e()}))],2),a("b-button",{staticClass:"my-2 my-sm-0",attrs:{variant:"outline-primary",type:"submit"}},[e._v("Найти")])],1),a("b-table",{ref:"table",attrs:{fields:e.fields,items:e.items,responsive:"md","select-mode":"multi",striped:"",hover:"",selectable:"",busy:e.inRequestState},on:{"row-selected":e.onRowSelected,"sort-changed":e.onChangeSort},scopedSlots:e._u([{key:"cell(selected)",fn:function(t){var s=t.rowSelected;return[s?[a("span",[e._v("✓")])]:[a("span")]]}},{key:"cell(header)",fn:function(t){var s=t.item;return[a("b-link",{attrs:{to:{name:"admin.news.change",params:{id:s.id}}},domProps:{innerHTML:e._s(e.tableOptions.searchValue?e.getValueWithSearchPart(s.header,e.tableOptions.searchValue):s.header)}})]}}])}),a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("b-pagination",{attrs:{"total-rows":e.tableInfo.totalItems,"per-page":e.tableOptions.perPage},model:{value:e.tableOptions.page,callback:function(t){e.$set(e.tableOptions,"page",t)},expression:"tableOptions.page"}}),a("b-select",{staticStyle:{width:"auto"},model:{value:e.tableTemp.perPage,callback:function(t){e.$set(e.tableTemp,"perPage",t)},expression:"tableTemp.perPage"}},[a("b-select-option",{attrs:{value:10}},[e._v(" 10 ")]),a("b-select-option",{attrs:{value:25}},[e._v(" 25 ")]),a("b-select-option",{attrs:{value:50}},[e._v(" 50 ")]),a("b-select-option",{attrs:{value:75}},[e._v(" 75 ")]),a("b-select-option",{attrs:{value:100}},[e._v(" 100 ")]),a("b-select-option",{attrs:{value:"all"}},[e._v(" ВСЕ ")])],1)],1)],1)],1)},n=[],l=a("d4ec"),r=a("bee2"),c=a("262e"),i=a("2caf"),o=(a("d81d"),a("9ab4")),u=a("1b40"),b=a("f39e"),p=a("affa"),d=a("fa10"),m=a("6fc5"),v=a("37c5"),f=function(e){Object(c["a"])(a,e);var t=Object(i["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.fields=[{key:"selected",label:""},{key:"id",label:"ID",sortable:!0,searchable:!0},{key:"header",label:"Название",searchable:!0,sortable:!0}],e.items=[],e}return Object(r["a"])(a,[{key:"selectionBtnText",get:function(){return this.selectedAllRows?"Снять выделение":"Выбрать все"}},{key:"onDelete",value:function(){var e=this;d["a"].destroy(this.selected.map((function(e){return e.id}))).then((function(){Object(m["e"])(v["a"],e.$store).setData({title:"Удаление прошло успешно",variant:"success"}),e.updateTableData()}))}},{key:"updateTableData",value:function(){var e=this;return d["a"].getList(this.tableOptionsCleared).then((function(t){return e.items=t.data.data,t}))}}]),a}(Object(u["c"])(b["a"],p["a"]));f=Object(o["a"])([Object(u["a"])({})],f);var h=f,y=h,k=a("2877"),g=Object(k["a"])(y,s,n,!1,null,"d6e1741a",null);t["default"]=g.exports},fa10:function(e,t,a){"use strict";var s=a("5530"),n=a("d4ec"),l=a("bee2"),r=a("262e"),c=a("2caf"),i=(a("d3b7"),a("3949"),a("c873")),o=a("72df"),u=function(e){Object(r["a"])(a,e);var t=Object(c["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(l["a"])(a,null,[{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page:1};return i["a"].get("news",{params:e})}},{key:"get",value:function(e){return i["a"].get("news/"+e.id,{params:e})}},{key:"create",value:function(e){return i["a"].post("news",a.prepareFormData(e))}},{key:"update",value:function(e){return i["a"].post("news/"+e.id,a.prepareFormData(Object(s["a"])(Object(s["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return i["a"].delete("news",{params:{id:e}})}}]),a}(o["a"]);t["a"]=u}}]);
//# sourceMappingURL=chunk-68357216.a554cd80.js.map