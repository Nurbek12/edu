import{a as v}from"./index-7376b9a9.js";import{u as w,r as _,a as n,o as y,c as k,w as t,b as o,d as a,t as l}from"./index-6f11c559.js";const T=a("div",{class:"d-flex justify-center"},"Davomat",-1),g={class:"responsive-datatable"},j={"data-label":"T/r"},x={"data-label":"Talaba"},B={"data-label":"Talaba"},S={"data-label":"Talaba"},C={"data-label":"Talaba"},D={"data-label":"Talaba"},N=a("div",null,"Hech narsa topilmadi",-1),H={__name:"Attendence",setup(V){const u=w(),m=_(""),c=_([]),h=[{title:"T/r",align:"start",sortable:!1,key:"no"},{title:"Talaba",sortable:!1,key:"student"},{title:"O'qituvchi",sortable:!1,key:"teacher"},{title:"Guruh",sortable:!1,key:"group"},{title:"Fan nomi",sortable:!1,key:"subject"},{title:"Sanasi",sortable:!1,key:"date"}];return(async()=>{const{data:d}=await v.get(`/attendence?student=${u.getters.userid}`);c.value=d})(),(d,A)=>{const r=n("v-sheet"),i=n("v-col"),b=n("v-data-table"),f=n("v-row"),p=n("v-container");return y(),k(p,{fluid:""},{default:t(()=>[o(f,null,{default:t(()=>[o(i,{cols:"12"},{default:t(()=>[o(r,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[T]),_:1})]),_:1}),o(i,{cols:"12"},{default:t(()=>[o(r,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[a("div",g,[o(b,{headers:h,search:m.value,items:c.value},{"item.no":t(({index:e})=>[a("td",j,l(e+1)+".",1)]),"item.student":t(({item:e})=>{var s;return[a("td",x,l((s=e.raw.student)==null?void 0:s.name),1)]}),"item.teacher":t(({item:e})=>{var s;return[a("td",B,l((s=e.raw.teacher)==null?void 0:s.name),1)]}),"item.group":t(({item:e})=>{var s;return[a("td",S,l((s=e.raw.group)==null?void 0:s.name),1)]}),"item.subject":t(({item:e})=>[a("td",C,l(e.raw.subject),1)]),"item.date":t(({item:e})=>[a("td",D,l(e.raw.date),1)]),"no-data":t(()=>[N]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{H as default};
