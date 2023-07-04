import{a as g}from"./index-7376b9a9.js";import{r,l as J,m as N,a as n,o as K,c as M,w as a,b as e,f as b,d as i,t as p,e as W,p as B}from"./index-6f11c559.js";const X={class:"responsive-datatable"},Z={"data-label":"T/r"},ee={"data-label":"Boshqarish"},ae={class:"d-flex justify-end"},le={"data-label":"Ism familiyasi"},te={"data-label":"Login"},oe={"data-label":"Paroli"},se={"data-label":"Telefoni"},ne=i("div",null,"Hech narsa topilmadi",-1),ie={class:"text-h5"},ce={__name:"Inspectors",setup(de){const $=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Ism familiyasi",key:"name"},{title:"Login",key:"login"},{title:"Paroli",key:"password"},{title:"Telefoni",key:"phone"},{title:"Boshqarish",key:"actions",sortable:!1}],w=[l=>!!l||"Required"],y=r(null),x=r(""),c=r([]),v=r(!1),f=r(!1),u=r(-1),m=r(-1),s=r({name:"",phone:"",login:"",password:"",role:"inspector"}),C={name:"",phone:"",login:"",password:"",role:"inspector"},D=J(()=>u.value===-1?"Nazoratchi yaratish":"Nazoratchi o'zgartirish");N(v,l=>l||I()),N(f,l=>l||V());const L=async()=>{const{data:l}=await g.get("/user/inspector");c.value=l},P=async()=>{const{valid:l}=await y.value.validate();l&&Q()},H=l=>{u.value=c.value.indexOf(l),m.value=l._id,s.value=Object.assign({},l),v.value=!0},S=l=>{u.value=c.value.indexOf(l),s.value=Object.assign({},l),m.value=l._id,f.value=!0},Y=async()=>{const{data:l}=await g.delete(`/user/${m.value}`);l&&(c.value.splice(u.value,1),V())},I=()=>{v.value=!1,B(()=>{var l;s.value=Object.assign({},C),m.value=-1,u.value=-1,(l=y.value)==null||l.reset()})},V=()=>{f.value=!1,B(()=>{var l;s.value=Object.assign({},C),m.value=-1,u.value=-1,(l=y.value)==null||l.reset()})},Q=async()=>{if(u.value>-1){const{data:l}=await g.put(`/user/${m.value}`,s.value);Object.assign(c.value[u.value],l)}else{const{data:l}=await g.post("/user",s.value);c.value.push(l)}I()};return L(),(l,o)=>{const h=n("v-text-field"),d=n("v-col"),_=n("v-btn"),k=n("v-row"),z=n("v-sheet"),R=n("v-data-table"),T=n("v-card-title"),A=n("v-form"),U=n("v-container"),E=n("v-card-text"),j=n("v-card"),q=n("v-dialog"),O=n("v-spacer"),F=n("v-card-actions");return K(),M(U,{fluid:""},{default:a(()=>[e(k,null,{default:a(()=>[e(d,{cols:"12"},{default:a(()=>[e(z,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:a(()=>[e(k,{justify:"space-between"},{default:a(()=>[e(d,{cols:"12",sm:"4"},{default:a(()=>[e(h,{label:"Qidirish",modelValue:x.value,"onUpdate:modelValue":o[0]||(o[0]=t=>x.value=t),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",sm:"4",md:"3"},{default:a(()=>[e(_,{block:"",color:"primary",onClick:o[1]||(o[1]=t=>v.value=!0),variant:"tonal"},{default:a(()=>[b("Yangi Nazoratchi")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(d,{cols:"12"},{default:a(()=>[e(z,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:a(()=>[i("div",X,[e(R,{headers:$,search:x.value,items:c.value},{"item.no":a(({index:t})=>[i("td",Z,p(t+1)+".",1)]),"item.actions":a(({item:t})=>[i("td",ee,[i("div",ae,[e(_,{icon:"mdi-pencil",variant:"text",size:"40",color:"primary",onClick:G=>H(t.raw)},null,8,["onClick"]),e(_,{icon:"mdi-delete",variant:"text",size:"40",color:"primary",onClick:G=>S(t.raw)},null,8,["onClick"])])])]),"item.name":a(({item:t})=>[i("td",le,p(t.raw.name),1)]),"item.login":a(({item:t})=>[i("td",te,p(t.raw.login),1)]),"item.password":a(({item:t})=>[i("td",oe,p(t.raw.password),1)]),"item.phone":a(({item:t})=>[i("td",se,p(t.raw.phone),1)]),"no-data":a(()=>[ne]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),e(q,{modelValue:v.value,"onUpdate:modelValue":o[6]||(o[6]=t=>v.value=t),"max-width":"550px"},{default:a(()=>[e(j,null,{default:a(()=>[e(T,{class:"mt-2 ml-2 mb-0"},{default:a(()=>[i("span",ie,p(W(D)),1)]),_:1}),e(E,{class:"px-2 pt-0"},{default:a(()=>[e(U,null,{default:a(()=>[e(A,{ref_key:"form",ref:y},{default:a(()=>[e(k,null,{default:a(()=>[e(d,{cols:"12"},{default:a(()=>[e(h,{modelValue:s.value.name,"onUpdate:modelValue":o[2]||(o[2]=t=>s.value.name=t),label:"Ism familiya","hide-details":"",rules:w,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12"},{default:a(()=>[e(h,{modelValue:s.value.phone,"onUpdate:modelValue":o[3]||(o[3]=t=>s.value.phone=t),label:"Telefon raqami","hide-details":"",rules:w,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",sm:"6"},{default:a(()=>[e(h,{modelValue:s.value.login,"onUpdate:modelValue":o[4]||(o[4]=t=>s.value.login=t),label:"Login","hide-details":"",rules:w,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",sm:"6"},{default:a(()=>[e(h,{modelValue:s.value.password,"onUpdate:modelValue":o[5]||(o[5]=t=>s.value.password=t),label:"Parol","hide-details":"",rules:w,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12"},{default:a(()=>[e(_,{variant:"tonal",color:"primary",block:"",onClick:P,height:"45"},{default:a(()=>[b(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:f.value,"onUpdate:modelValue":o[7]||(o[7]=t=>f.value=t),"max-width":"500px"},{default:a(()=>[e(j,null,{default:a(()=>[e(T,{class:"text-h6"},{default:a(()=>[b(" Ushbu ma'lumotni ochirmoqchimisiz ")]),_:1}),e(F,null,{default:a(()=>[e(O),e(_,{color:"blue-darken-1",variant:"text",onClick:V},{default:a(()=>[b(" Yo'q ")]),_:1}),e(_,{color:"blue-darken-1",variant:"text",onClick:Y},{default:a(()=>[b(" Ha ")]),_:1}),e(O)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{ce as default};
