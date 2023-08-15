import{r as c,l as F,m as G,a as s,o as J,c as K,w as a,h as g,b as e,f as h,d,t as _,e as M,n as W}from"./index-2e243627.js";const X={class:"responsive-datatable"},Z={"data-label":"Boshqarish"},ee={class:"d-flex justify-end"},ae={"data-label":"Ism familiyasi"},le={"data-label":"Login"},te={"data-label":"Telefoni"},oe={"data-label":"Roli"},ne={class:"text-h5"},de={__name:"Inspectors",setup(se){const U=[{title:"Ism familiyasi",key:"name"},{title:"Login",key:"login",sortable:!1},{title:"Telefoni",key:"phone",sortable:!1},{title:"Roli",key:"role",sortable:!1},{title:"Boshqarish",key:"actions",sortable:!1}],p=[l=>!!l||"Required"],B=[{name:"Nazoratchi",role:"inspector"},{name:"Dekanat",role:"dean"},{name:"Bugalter",role:"accountant"},{name:"Direktor",role:"director"},{name:"Admin",role:"admin"}],w=c(null),V=c(""),r=c([]),m=c(!1),u=c(-1),v=c(null),n=c({name:"",phone:"",login:"",password:"",role:null}),j={name:"",phone:"",login:"",password:"",role:null},q=F(()=>u.value===-1?"Hodim yaratish":"Hodim o'zgartirish");G(m,l=>l||y());const N=async()=>{const{data:l}=await g.get("/user/inspector");r.value=l},O=async()=>{const{valid:l}=await w.value.validate();l&&R()},T=l=>{u.value=r.value.indexOf(l),v.value=l._id,n.value=Object.assign({},l),m.value=!0},D=l=>{u.value=r.value.indexOf(l),n.value=Object.assign({},l),v.value=l._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?$():y()},$=async()=>{const{data:l}=await g.delete(`/user/${v.value}`);l&&(r.value.splice(u.value,1),y())},y=()=>{m.value=!1,W(()=>{var l;n.value=Object.assign({},j),v.value=null,u.value=-1,(l=w.value)==null||l.reset()})},R=async()=>{if(u.value>-1){const{data:l}=await g.put(`/user/${v.value}`,n.value);Object.assign(r.value[u.value],l)}else{const{data:l}=await g.post("/user",n.value);r.value.push(l)}y()};return N(),(l,o)=>{const f=s("v-text-field"),i=s("v-col"),b=s("v-btn"),k=s("v-row"),I=s("v-sheet"),C=s("v-icon"),H=s("v-chip"),L=s("v-data-table"),A=s("v-card-title"),S=s("v-select"),P=s("v-form"),z=s("v-container"),Q=s("v-card-text"),Y=s("v-card"),E=s("v-dialog");return J(),K(z,{fluid:""},{default:a(()=>[e(k,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(I,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:a(()=>[e(k,{justify:"space-between"},{default:a(()=>[e(i,{class:"py-1",cols:"12",sm:"4"},{default:a(()=>[e(f,{label:"Qidirish",modelValue:V.value,"onUpdate:modelValue":o[0]||(o[0]=t=>V.value=t),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),e(i,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:a(()=>[e(b,{block:"",height:"42",color:"primary",onClick:o[1]||(o[1]=t=>m.value=!0),variant:"flat"},{default:a(()=>[h("Yangi Nazoratchi")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(I,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:a(()=>[d("div",X,[e(L,{"no-data-text":"Hech narsa topilmadi","items-per-page-text":"",headers:U,search:V.value,items:r.value},{"item.actions":a(({item:t})=>[d("td",Z,[d("div",ee,[e(b,{variant:"flat",size:"30",color:"primary",onClick:x=>T(t.raw)},{default:a(()=>[e(C,null,{default:a(()=>[h("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),e(b,{variant:"flat",size:"30",class:"ml-1",color:"primary",onClick:x=>D(t.raw)},{default:a(()=>[e(C,null,{default:a(()=>[h("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])])]),"item.name":a(({index:t,item:x})=>[d("td",ae,_(t+1)+". "+_(x.raw.name),1)]),"item.login":a(({item:t})=>[d("td",le,_(t.raw.login),1)]),"item.phone":a(({item:t})=>[d("td",te,_(t.raw.phone),1)]),"item.role":a(({item:t})=>[d("td",oe,[e(H,{label:"",color:"primary"},{default:a(()=>[h(_({accountant:"Bugalter",dean:"Dekanat",inspector:"Nazoratchi",admin:"Admin",director:"Direktor"}[t.raw.role]),1)]),_:2},1024)])]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),e(E,{modelValue:m.value,"onUpdate:modelValue":o[7]||(o[7]=t=>m.value=t),"max-width":"550px"},{default:a(()=>[e(Y,null,{default:a(()=>[e(A,{class:"mt-2 ml-2 mb-0"},{default:a(()=>[d("span",ne,_(M(q)),1)]),_:1}),e(Q,{class:"px-2 pt-0"},{default:a(()=>[e(z,null,{default:a(()=>[e(P,{ref_key:"form",ref:w},{default:a(()=>[e(k,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(f,{modelValue:n.value.name,"onUpdate:modelValue":o[2]||(o[2]=t=>n.value.name=t),label:"Ism familiya","hide-details":"",rules:p,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(f,{modelValue:n.value.phone,"onUpdate:modelValue":o[3]||(o[3]=t=>n.value.phone=t),label:"Telefon raqami","hide-details":"",rules:p,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",sm:"6"},{default:a(()=>[e(f,{modelValue:n.value.login,"onUpdate:modelValue":o[4]||(o[4]=t=>n.value.login=t),label:"Login","hide-details":"",rules:p,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",sm:"6"},{default:a(()=>[e(f,{modelValue:n.value.password,"onUpdate:modelValue":o[5]||(o[5]=t=>n.value.password=t),label:"Parol","hide-details":"",rules:v.value?[]:p,color:"primary",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(S,{modelValue:n.value.role,"onUpdate:modelValue":o[6]||(o[6]=t=>n.value.role=t),label:"Roli",rules:p,"hide-details":"",items:B,color:"primary","item-title":"name","item-value":"role",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(b,{variant:"flat",color:"primary",block:"",onClick:O,height:"45"},{default:a(()=>[h(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{de as default};