import{u as y,r as m,a as l,o as k,i as x,b as a,w as e,F as V,h as j,d as o,t as n,f as F}from"./index-eee0caed.js";import{_ as S}from"./FooterPage-a499760e.js";const q=o("div",{class:"d-flex justify-center"},"Davomat",-1),B={class:"responsive-datatable"},D={"data-label":"Fan"},G={"data-label":"Talaba"},H={"data-label":"Guruh"},N={"data-label":"Vaqti"},$={"data-label":"Holati"},A={__name:"Attendence",setup(C){const b=y(),f=m(""),c=m([]),h=[{title:"Fan nomi",sortable:!1,key:"subject",sortable:!1},{title:"O'qituvchi",sortable:!1,key:"teacher",sortable:!1},{title:"Guruh",sortable:!1,key:"group",sortable:!1},{title:"Vaqti",sortable:!1,key:"date"},{title:"Holati",sortable:!1,key:"status",sortable:!1}],r=async i=>{const{data:d}=await j.get(`/attendence?student=${b.getters.userid}&${i||""}`);c.value=d};return r(),(i,d)=>{const _=l("v-sheet"),u=l("v-col"),p=l("v-chip"),v=l("v-data-table"),w=l("v-row"),g=l("v-container");return k(),x(V,null,[a(g,{fluid:""},{default:e(()=>[a(w,null,{default:e(()=>[a(u,{cols:"12"},{default:e(()=>[a(_,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[q]),_:1})]),_:1}),a(u,{cols:"12"},{default:e(()=>[a(_,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[o("div",B,[a(v,{"no-data-text":"Hech narsa topilmadi","items-per-page-text":"",headers:h,search:f.value,items:c.value},{"item.subject":e(({index:t,item:s})=>[o("td",D,n(t+1)+". "+n(s.raw.subject),1)]),"item.teacher":e(({item:t})=>{var s;return[o("td",G,n((s=t.raw.teacher)==null?void 0:s.name),1)]}),"item.group":e(({item:t})=>{var s;return[o("td",H,n((s=t.raw.group)==null?void 0:s.name),1)]}),"item.date":e(({item:t})=>[o("td",N,n(t.raw.date),1)]),"item.status":e(({item:t})=>[o("td",$,[a(p,{color:t.raw.status?"blue":"red",label:"",variant:"elevated"},{default:e(()=>[F(n(t.raw.status?"Sababli":"Sababsiz"),1)]),_:2},1032,["color"])])]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1})]),_:1}),a(S,{onGetDate:r})],64)}}};export{A as default};
