(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cba87"],{"4b36":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("EntityIndexPageLayout",{ref:"EntityIndexPageLayout",attrs:{columns:e.columns,items:e.items,"page-title":"Пользователи","selected-all-rows":e.selectedAllRows,selected:e.selected,"route-name-change":"admin.user.change","route-name-create":"admin.user.create","in-request-state":e.inRequestState,"table-info":e.tableInfo,"table-temp":e.tableTemp,"update-items-collback":e.updateTableData,"items-count-info":e.itemsCountInfo,"table-options":e.tableOptions,"disable-multiple-deletion-btn":""},on:{deleteItem:e.onDelete,changeSort:e.onChangeSort,selectAll:e.onSelectAll,rowSelected:e.onRowSelected,search:e.onSearch},scopedSlots:e._u([{key:"cell(email)",fn:function(t){var n=t.item;return[a("b-link",{attrs:{to:{name:"admin.user.change",params:{id:n.id}}},domProps:{innerHTML:e._s(n.email)}})]}},{key:"cell(actions)",fn:function(t){var n=t.item;return[a("b-button",{attrs:{variant:"info",to:{name:"admin.user.chat",params:{id:n.id}}}},[e._v("Сообщеия")]),a("b-button",{attrs:{variant:"danger"},on:{click:function(t){return e.onDeleteSingle(n)}}},[e._v("Удалить")])]}},{key:"cell(ticketStatus)",fn:function(t){var n=t.item;return[0===n.ticketStatus?a("b-badge",{attrs:{variant:"success"}},[e._v("Есть новые")]):1===n.ticketStatus?a("b-badge",{attrs:{variant:"primary"}},[e._v("Просмотрены")]):2===n.ticketStatus?a("b-badge",{attrs:{variant:"danger"}},[e._v("В ожидании ответа")]):e._e()]}}])})},l=[],o=a("5530"),s=a("d4ec"),i=a("bee2"),r=a("262e"),c=a("2caf"),u=(a("d3b7"),a("9ab4")),b=a("1b40"),d=a("f39e"),m=a("affa"),f=a("6fc5"),h=a("37c5"),p=a("d79d"),v=a("e7a9"),y=a("458f"),k=a("4a70"),g=function(e){Object(r["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.columns=[{key:"name",label:"ФИО",sortable:!0,searchable:!0},{key:"email",label:"Email",sortable:!0,searchable:!0},{key:"phone",label:"Номер телефона",searchable:!0,sortable:!0},{key:"ticketStatus",label:"Статус сообщений"},{key:"created_at",label:"Создан",sortable:!0},{key:"updated_at",label:"Изменен",sortable:!0},{key:"actions",label:""}],e.items=[],e.userToDelete=null,e}return Object(i["a"])(a,[{key:"onDelete",value:function(){var e,t=this;console.log(this.userToDelete),y["a"].destroySingle(null===(e=this.userToDelete)||void 0===e?void 0:e.id).then((function(){Object(f["e"])(h["a"],t.$store).setData({title:"Удаление прошло успешно",variant:"success"}),t.updateTableData()})).finally((function(){t.userToDelete=null}))}},{key:"onDeleteSingle",value:function(e){this.userToDelete=e,this.$refLayout.onOpenConfirm()}},{key:"updateTableData",value:function(){var e=this;return y["a"].getList(Object(o["a"])(Object(o["a"])({},this.tableOptionsCleared),{},{withHasNewMessage:!0})).then((function(t){return e.items=t.data,t}))}},{key:"mounted",value:function(){this.$table=this.$refLayout.$table}}]),a}(Object(b["e"])(d["a"],m["a"]));Object(u["a"])([Object(b["c"])("basePath")],g.prototype,"basePath",void 0),g=Object(u["a"])([Object(b["a"])({components:{EntityIndexPageLayout:k["a"],ModalDeletingConfirm:v["a"],ItemsCountInfo:p["a"]}})],g);var O=g,S=O,D=a("2877"),j=Object(D["a"])(S,n,l,!1,null,"7fe9ba93",null);t["default"]=j.exports}}]);
//# sourceMappingURL=chunk-2d0cba87.77dc0433.js.map