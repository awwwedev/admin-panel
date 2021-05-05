(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-576e1a62"],{"2e87":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v("Комплектация")]),a("ModalDeletingConfirm",{attrs:{show:e.showConfirmModal,"confirm-handler":e.onConfirm},on:{close:function(t){e.showConfirmModal=!1},cancel:function(t){e.showConfirmModal=!1}}}),a("b-card",{staticClass:"mb-4 shadow-sm"},[a("div",{staticClass:"d-flex"},[a("b-button",{staticClass:"mr-2",attrs:{variant:"primary",to:{name:"admin.equipment.create"}}},[e._v("Создать")]),a("b-button",{staticClass:"mr-3",attrs:{variant:"info"},on:{click:e.onSelectAll}},[e._v(e._s(e.selectionBtnText))]),a("b-button",{staticClass:"my-2 my-sm-0",attrs:{variant:"danger",disabled:!e.selected.length},on:{click:e.onDelete}},[e._v("Удалить выбранное")])],1)]),a("b-card",{staticClass:"shadow-sm"},[a("b-table",{ref:"table",attrs:{fields:e.fields,items:e.items,responsive:"md","select-mode":"multi",striped:"",hover:"",selectable:"","sort-icon-left":"",busy:e.inRequestState},on:{"row-selected":e.onRowSelected,"sort-changed":e.onChangeSort},scopedSlots:e._u([{key:"cell(selected)",fn:function(t){var n=t.rowSelected;return[n?[a("span",[e._v("✓")])]:[a("span")]]}},{key:"cell(name)",fn:function(t){var n=t.item;return[a("b-link",{attrs:{to:{name:"admin.equipment.change",params:{id:n.id}}},domProps:{innerHTML:e._s(n.name)}})]}}])}),a("ItemsCountInfo",{attrs:{total:e.items.length}})],1)],1)},r=[],o=a("d4ec"),i=a("bee2"),s=a("262e"),c=a("2caf"),l=(a("d81d"),a("9ab4")),u=a("1b40"),d=a("f39e"),f=a("affa"),b=a("6fc5"),m=a("37c5"),h=a("3855"),p=a("d79d"),v=a("e7a9"),y=function(e){Object(s["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.fields=[{key:"selected",label:""},{key:"id",label:"ID",sortable:!0,searchable:!0},{key:"realtyTypeName",label:"Тип",sortable:!0,searchable:!0},{key:"name",label:"Название",searchable:!0,sortable:!0},{key:"created_at",label:"Создан",sortable:!0},{key:"updated_at",label:"Изменен",sortable:!0}],e.items=[],e.showConfirmModal=!1,e}return Object(i["a"])(a,[{key:"selectionBtnText",get:function(){return this.selectedAllRows?"Снять выделение":"Выбрать все"}},{key:"onDelete",value:function(){this.showConfirmModal=!0}},{key:"onConfirm",value:function(){var e=this;h["a"].destroy(this.selected.map((function(e){return e.id}))).then((function(){Object(b["e"])(m["a"],e.$store).setData({title:"Удаление прошло успешно",variant:"success"}),e.updateTableData()})).catch((function(t){var a=t.response.data,n=a.id,r=a.message,o=a.allowCheckRelations;Object(b["e"])(m["a"],e.$store).setData({title:r,variant:"danger",links:o?[{label:"Просмотреть зависимости",routeName:"relationship.equipments",params:{id:n}}]:[]})})),this.showConfirmModal=!1}},{key:"updateTableData",value:function(){var e=this;return h["a"].getList(this.tableOptionsCleared).then((function(t){return e.items=t.data,t}))}}]),a}(Object(u["d"])(d["a"],f["a"]));y=Object(l["a"])([Object(u["a"])({components:{ModalDeletingConfirm:v["a"],ItemsCountInfo:p["a"]}})],y);var w=y,k=w,C=a("2877"),g=Object(C["a"])(k,n,r,!1,null,"41d4bf0a",null);t["default"]=g.exports},3855:function(e,t,a){"use strict";var n=a("5530"),r=a("d4ec"),o=a("bee2"),i=a("262e"),s=a("2caf"),c=(a("d3b7"),a("3949")),l=a("c873"),u=a("72df"),d=function(e){Object(i["a"])(a,e);var t=Object(s["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,null,[{key:"get",value:function(e){return new Promise((function(e){e({data:c.realtyType[0]})}))}},{key:"getList",value:function(){return new Promise((function(e){e({data:c.equipments})}))}},{key:"create",value:function(e){return l["a"].post("equipment",a.prepareFormData(e))}},{key:"update",value:function(e){return l["a"].post("equipment/"+e.id,a.prepareFormData(Object(n["a"])(Object(n["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return l["a"].delete("equipment",{params:{id:e}})}}]),a}(u["a"]);t["a"]=d},"99af":function(e,t,a){"use strict";var n=a("23e7"),r=a("d039"),o=a("e8b5"),i=a("861d"),s=a("7b0b"),c=a("50c4"),l=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),b=a("2d00"),m=f("isConcatSpreadable"),h=9007199254740991,p="Maximum allowed index exceeded",v=b>=51||!r((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),y=d("concat"),w=function(e){if(!i(e))return!1;var t=e[m];return void 0!==t?!!t:o(e)},k=!v||!y;n({target:"Array",proto:!0,forced:k},{concat:function(e){var t,a,n,r,o,i=s(this),d=u(i,0),f=0;for(t=-1,n=arguments.length;t<n;t++)if(o=-1===t?i:arguments[t],w(o)){if(r=c(o.length),f+r>h)throw TypeError(p);for(a=0;a<r;a++,f++)a in o&&l(d,f,o[a])}else{if(f>=h)throw TypeError(p);l(d,f++,o)}return d.length=f,d}})},affa:function(e,t,a){"use strict";var n=a("d4ec"),r=a("bee2"),o=a("262e"),i=a("2caf"),s=(a("99af"),a("fb6a"),a("9ab4")),c=a("1b40"),l=function(e){Object(o["a"])(a,e);var t=Object(i["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(r["a"])(a,[{key:"getValueWithSearchPart",value:function(e,t){var a=e.toLowerCase(),n=e.toLowerCase(),r=a.indexOf(n),o=r+t.length;return"".concat(e.slice(0,r),"<b>").concat(t,"</b>").concat(e.slice(o,e.length))}}]),a}(Object(c["d"])());l=Object(s["a"])([c["a"]],l),t["a"]=l},fb6a:function(e,t,a){"use strict";var n=a("23e7"),r=a("861d"),o=a("e8b5"),i=a("23cb"),s=a("50c4"),c=a("fc6a"),l=a("8418"),u=a("b622"),d=a("1dde"),f=d("slice"),b=u("species"),m=[].slice,h=Math.max;n({target:"Array",proto:!0,forced:!f},{slice:function(e,t){var a,n,u,d=c(this),f=s(d.length),p=i(e,f),v=i(void 0===t?f:t,f);if(o(d)&&(a=d.constructor,"function"!=typeof a||a!==Array&&!o(a.prototype)?r(a)&&(a=a[b],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return m.call(d,p,v);for(n=new(void 0===a?Array:a)(h(v-p,0)),u=0;p<v;p++,u++)p in d&&l(n,u,d[p]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-576e1a62.3ad931c7.js.map