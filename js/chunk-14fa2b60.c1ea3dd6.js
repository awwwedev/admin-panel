(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14fa2b60"],{"563b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("EntityIndexPageLayout",{ref:"EntityIndexPageLayout",attrs:{columns:e.columns,items:e.items,"page-title":"Типы недвижимости","selected-all-rows":e.selectedAllRows,selected:e.selected,"route-name-change":"admin.realtyType.change","route-name-create":"admin.realtyType.create","in-request-state":e.inRequestState,"table-info":e.tableInfo,"table-temp":e.tableTemp,"update-items-collback":e.updateTableData,"items-count-info":e.itemsCountInfo,"table-options":e.tableOptions},on:{deleteItem:e.onDelete,changeSort:e.onChangeSort,selectAll:e.onSelectAll,rowSelected:e.onRowSelected,search:e.onSearch},scopedSlots:e._u([{key:"cell(selected)",fn:function(t){var n=t.rowSelected;return[n?[a("span",[e._v("✓")])]:[a("span")]]}},{key:"cell(name)",fn:function(t){var n=t.item;return[a("b-link",{attrs:{to:{name:"admin.realtyType.change",params:{id:n.id}}},domProps:{innerHTML:e._s(n.name)}})]}},{key:"cell(img_path)",fn:function(t){var n=t.item;return[a("b-img",{attrs:{fluid:"",width:"150",src:e.basePath+n.img_path}})]}},{key:"cell(actions)",fn:function(t){var n=t.item;return[a("b-button",{attrs:{variant:"info",to:{name:"relationship.realtyType",params:{id:n.id}}}},[e._v("Недвижимость и комплектация")])]}}])})},r=[],l=a("d4ec"),o=a("bee2"),c=a("262e"),i=a("2caf"),s=(a("d81d"),a("9ab4")),u=a("1b40"),d=a("f39e"),b=a("de84"),p=a("affa"),y=a("6fc5"),f=a("37c5"),m=a("d79d"),h=a("e7a9"),v=a("4a70"),k=function(e){Object(c["a"])(a,e);var t=Object(i["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.columns=[{key:"selected",label:""},{key:"img_path",label:""},{key:"id",label:"ID",sortable:!0,searchable:!0},{key:"name",label:"Название",searchable:!0,sortable:!0},{key:"created_at",label:"Создан",sortable:!0},{key:"updated_at",label:"Изменен",sortable:!0},{key:"actions",label:""}],e.items=[],e}return Object(o["a"])(a,[{key:"onDelete",value:function(){var e=this;b["a"].destroy(this.selected.map((function(e){return e.id}))).then((function(){Object(y["e"])(f["a"],e.$store).setData({title:"Удаление прошло успешно",variant:"success"}),e.updateTableData()})).catch((function(t){var a=t.response.data,n=a.id,r=a.message,l=a.allowCheckRelations;Object(y["e"])(f["a"],e.$store).setData({title:r,variant:"danger",links:l?[{label:"Просмотреть зависимости",routeName:"relationship.realtyType",params:{id:n}}]:[]})}))}},{key:"updateTableData",value:function(){var e=this;return b["a"].getList(this.tableOptionsCleared).then((function(t){return e.items=t.data,t}))}},{key:"mounted",value:function(){this.$table=this.$refLayout.$table}}]),a}(Object(u["e"])(d["a"],p["a"]));Object(s["a"])([Object(u["c"])("basePath")],k.prototype,"basePath",void 0),k=Object(s["a"])([Object(u["a"])({components:{EntityIndexPageLayout:v["a"],ModalDeletingConfirm:h["a"],ItemsCountInfo:m["a"]}})],k);var g=k,O=g,j=a("2877"),T=Object(j["a"])(O,n,r,!1,null,"2ac4bcba",null);t["default"]=T.exports},d81d:function(e,t,a){"use strict";var n=a("23e7"),r=a("b727").map,l=a("1dde"),o=l("map");n({target:"Array",proto:!0,forced:!o},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},de84:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("5530"),r=a("d4ec"),l=a("bee2"),o=a("262e"),c=a("2caf"),i=(a("d3b7"),a("3949"),a("c873")),s=a("72df"),u=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(l["a"])(a,null,[{key:"get",value:function(e){return i["a"].get("realtyType/"+e.id,{params:e})}},{key:"getList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i["a"].get("realtyType",{params:e})}},{key:"create",value:function(e){return i["a"].post("realtyType",a.prepareFormData(e))}},{key:"update",value:function(e){return i["a"].post("realtyType/"+e.id,a.prepareFormData(Object(n["a"])(Object(n["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return i["a"].delete("realtyType",{params:{id:e}})}}]),a}(s["a"])}}]);
//# sourceMappingURL=chunk-14fa2b60.c1ea3dd6.js.map