(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bbbdd772"],{8368:function(e,t,a){"use strict";var n=a("5530"),r=a("d4ec"),o=a("bee2"),i=a("262e"),c=a("2caf"),s=(a("d3b7"),a("3949")),l=a("c873"),d=a("72df"),u=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,null,[{key:"getList",value:function(){return new Promise((function(e){e({data:s.Slide})}))}},{key:"get",value:function(e){return new Promise((function(e){e({data:s.Slide[0]})}))}},{key:"create",value:function(e){return l["a"].post("slide",a.prepareFormData(e))}},{key:"update",value:function(e){return l["a"].post("slide/"+e.id,a.prepareFormData(Object(n["a"])(Object(n["a"])({},e),{},{_method:"PUT"})))}},{key:"destroy",value:function(e){return l["a"].delete("slide",{params:{id:e}})}}]),a}(d["a"]);t["a"]=u},"99af":function(e,t,a){"use strict";var n=a("23e7"),r=a("d039"),o=a("e8b5"),i=a("861d"),c=a("7b0b"),s=a("50c4"),l=a("8418"),d=a("65f0"),u=a("1dde"),f=a("b622"),b=a("2d00"),h=f("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",p=b>=51||!r((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),y=u("concat"),g=function(e){if(!i(e))return!1;var t=e[h];return void 0!==t?!!t:o(e)},w=!p||!y;n({target:"Array",proto:!0,forced:w},{concat:function(e){var t,a,n,r,o,i=c(this),u=d(i,0),f=0;for(t=-1,n=arguments.length;t<n;t++)if(o=-1===t?i:arguments[t],g(o)){if(r=s(o.length),f+r>m)throw TypeError(v);for(a=0;a<r;a++,f++)a in o&&l(u,f,o[a])}else{if(f>=m)throw TypeError(v);l(u,f++,o)}return u.length=f,u}})},affa:function(e,t,a){"use strict";var n=a("d4ec"),r=a("bee2"),o=a("262e"),i=a("2caf"),c=(a("99af"),a("fb6a"),a("9ab4")),s=a("1b40"),l=function(e){Object(o["a"])(a,e);var t=Object(i["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(r["a"])(a,[{key:"getValueWithSearchPart",value:function(e,t){var a=e.toLowerCase(),n=e.toLowerCase(),r=a.indexOf(n),o=r+t.length;return"".concat(e.slice(0,r),"<b>").concat(t,"</b>").concat(e.slice(o,e.length))}}]),a}(Object(s["d"])());l=Object(c["a"])([s["a"]],l),t["a"]=l},eed6:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section"},[a("h1",{staticClass:"mb-5"},[e._v("Слайды")]),a("ModalDeletingConfirm",{attrs:{show:e.showConfirmModal,"confirm-handler":e.onConfirm},on:{close:function(t){e.showConfirmModal=!1},cancel:function(t){e.showConfirmModal=!1}}}),a("b-card",{staticClass:"mb-4 shadow-sm"},[a("div",{staticClass:"d-flex"},[a("b-button",{staticClass:"mr-2",attrs:{variant:"primary",to:{name:"admin.slide.create"}}},[e._v("Создать")]),a("b-button",{staticClass:"mr-3",attrs:{variant:"info"},on:{click:e.onSelectAll}},[e._v(e._s(e.selectionBtnText))]),a("b-button",{staticClass:"my-2 my-sm-0",attrs:{variant:"danger",disabled:!e.selected.length},on:{click:e.onDelete}},[e._v("Удалить выбранное")])],1)]),a("b-card",{staticClass:"shadow-sm"},[a("b-table",{ref:"table",attrs:{fields:e.fields,items:e.items,responsive:"md","select-mode":"multi",striped:"",hover:"","sort-icon-left":"",selectable:"",busy:e.inRequestState},on:{"row-selected":e.onRowSelected,"sort-changed":e.onChangeSort},scopedSlots:e._u([{key:"cell(selected)",fn:function(t){var n=t.rowSelected;return[n?[a("span",[e._v("✓")])]:[a("span")]]}},{key:"cell(image)",fn:function(t){var n=t.item;return[a("b-img",{attrs:{fluid:"",width:"150",src:e.basePath+n.image}})]}},{key:"cell(header)",fn:function(t){var n=t.item;return[a("b-link",{attrs:{to:{name:"admin.slide.change",params:{id:n.id}}},domProps:{innerHTML:e._s(e.tableOptions.searchValue?e.getValueWithSearchPart(n.header,e.tableOptions.searchValue):n.header)}})]}}])}),a("ItemsCountInfo",{attrs:{total:e.items.length}})],1)],1)},r=[],o=a("d4ec"),i=a("bee2"),c=a("262e"),s=a("2caf"),l=(a("d81d"),a("9ab4")),d=a("1b40"),u=a("f39e"),f=a("affa"),b=a("6fc5"),h=a("37c5"),m=a("8368"),v=a("d79d"),p=a("e7a9"),y=function(e){Object(c["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.showConfirmModal=!1,e.fields=[{key:"selected",label:""},{key:"image",label:""},{key:"id",label:"ID",sortable:!0,searchable:!0},{key:"header",label:"Название",searchable:!0,sortable:!0},{key:"created_at",label:"Создан",sortable:!0},{key:"updated_at",label:"Изменен",sortable:!0}],e.items=[],e}return Object(i["a"])(a,[{key:"selectionBtnText",get:function(){return this.selectedAllRows?"Снять выделение":"Выбрать все"}},{key:"onConfirm",value:function(){var e=this;m["a"].destroy(this.selected.map((function(e){return e.id}))).then((function(){Object(b["e"])(h["a"],e.$store).setData({title:"Удаление прошло успешно",variant:"success"}),e.updateTableData()}))}},{key:"onDelete",value:function(){this.showConfirmModal=!0}},{key:"updateTableData",value:function(){var e=this;return m["a"].getList(this.tableOptionsCleared).then((function(t){return e.items=t.data,t}))}}]),a}(Object(d["d"])(u["a"],f["a"]));Object(l["a"])([Object(d["c"])("basePath")],y.prototype,"basePath",void 0),y=Object(l["a"])([Object(d["a"])({components:{ModalDeletingConfirm:p["a"],ItemsCountInfo:v["a"]}})],y);var g=y,w=g,O=a("2877"),k=Object(O["a"])(w,n,r,!1,null,"eab5dffe",null);t["default"]=k.exports},fb6a:function(e,t,a){"use strict";var n=a("23e7"),r=a("861d"),o=a("e8b5"),i=a("23cb"),c=a("50c4"),s=a("fc6a"),l=a("8418"),d=a("b622"),u=a("1dde"),f=u("slice"),b=d("species"),h=[].slice,m=Math.max;n({target:"Array",proto:!0,forced:!f},{slice:function(e,t){var a,n,d,u=s(this),f=c(u.length),v=i(e,f),p=i(void 0===t?f:t,f);if(o(u)&&(a=u.constructor,"function"!=typeof a||a!==Array&&!o(a.prototype)?r(a)&&(a=a[b],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return h.call(u,v,p);for(n=new(void 0===a?Array:a)(m(p-v,0)),d=0;v<p;v++,d++)v in u&&l(n,d,u[v]);return n.length=d,n}})}}]);
//# sourceMappingURL=chunk-bbbdd772.33e89c26.js.map