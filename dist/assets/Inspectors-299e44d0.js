import{a as w}from"./index-7376b9a9.js";import{r as c,l as F,m as G,a as s,o as J,c as K,w as e,b as a,f as h,d as i,t as m,e as M,n as W}from"./index-1d6c4b32.js";const X={class:"responsive-datatable"},Z={"data-label":"T/r"},ee={"data-label":"Boshqarish"},ae={class:"d-flex justify-end"},le={"data-label":"Ism familiyasi"},te={"data-label":"Login"},oe={"data-label":"Paroli"},ne={"data-label":"Telefoni"},se={"data-label":"Roli"},ie=i("div",null,"Hech narsa topilmadi",-1),de={class:"text-h5"},me={__name:"Inspectors",setup(re){const C=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Ism familiyasi",key:"name"},{title:"Login",key:"login"},{title:"Paroli",key:"password"},{title:"Telefoni",key:"phone"},{title:"Roli",key:"role"},{title:"Boshqarish",key:"actions",sortable:!1}],_=[t=>!!t||"Required"],N=[{name:"Nazoratchi",role:"inspector"},{name:"Dekanat",role:"dean"},{name:"Bugalter",role:"accountant"}],g=c(null),V=c(""),r=c([]),v=c(!1),u=c(-1),p=c(-1),n=c({name:"",phone:"",login:"",password:"",role:null}),T={name:"",phone:"",login:"",password:"",role:null},U=F(()=>u.value===-1?"Nazoratchi yaratish":"Nazoratchi o'zgartirish");G(v,t=>t||y());const B=async()=>{const{data:t}=await w.get("/user/inspector");r.value=t},j=async()=>{const{valid:t}=await g.value.validate();t&&R()},q=t=>{u.value=r.value.indexOf(t),p.value=t._id,n.value=Object.assign({},t),v.value=!0},O=t=>{u.value=r.value.indexOf(t),n.value=Object.assign({},t),p.value=t._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?$():y()},$=async()=>{const{data:t}=await w.delete(`/user/${p.value}`);t&&(r.value.splice(u.value,1),y())},y=()=>{v.value=!1,W(()=>{var t;n.value=Object.assign({},T),p.value=-1,u.value=-1,(t=g.value)==null||t.reset()})},R=async()=>{if(u.value>-1){const{data:t}=await w.put(`/user/${p.value}`,n.value);Object.assign(r.value[u.value],t)}else{const{data:t}=await w.post("/user",n.value);r.value.push(t)}y()};return B(),(t,o)=>{const f=s("v-text-field"),d=s("v-col"),b=s("v-btn"),k=s("v-row"),x=s("v-sheet"),I=s("v-icon"),D=s("v-chip"),L=s("v-data-table"),P=s("v-card-title"),S=s("v-select"),H=s("v-form"),z=s("v-container"),Q=s("v-card-text"),Y=s("v-card"),A=s("v-dialog");return J(),K(z,{fluid:""},{default:e(()=>[a(k,null,{default:e(()=>[a(d,{cols:"12"},{default:e(()=>[a(x,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:e(()=>[a(k,{justify:"space-between"},{default:e(()=>[a(d,{class:"py-1",cols:"12",sm:"4"},{default:e(()=>[a(f,{label:"Qidirish",modelValue:V.value,"onUpdate:modelValue":o[0]||(o[0]=l=>V.value=l),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),a(d,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:e(()=>[a(b,{block:"",height:"42",color:"primary",onClick:o[1]||(o[1]=l=>v.value=!0),variant:"flat"},{default:e(()=>[h("Yangi Nazoratchi")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(d,{cols:"12"},{default:e(()=>[a(x,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[i("div",X,[a(L,{"items-per-page-text":"",headers:C,search:V.value,items:r.value},{"item.no":e(({index:l})=>[i("td",Z,m(l+1)+".",1)]),"item.actions":e(({item:l})=>[i("td",ee,[i("div",ae,[a(b,{variant:"flat",size:"30",color:"primary",onClick:E=>q(l.raw)},{default:e(()=>[a(I,null,{default:e(()=>[h("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),a(b,{variant:"flat",size:"30",class:"ml-1",color:"primary",onClick:E=>O(l.raw)},{default:e(()=>[a(I,null,{default:e(()=>[h("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])])]),"item.name":e(({item:l})=>[i("td",le,m(l.raw.name),1)]),"item.login":e(({item:l})=>[i("td",te,m(l.raw.login),1)]),"item.password":e(({item:l})=>[i("td",oe,m(l.raw.password),1)]),"item.phone":e(({item:l})=>[i("td",ne,m(l.raw.phone),1)]),"item.role":e(({item:l})=>[i("td",se,[a(D,{label:"",color:"primary"},{default:e(()=>[h(m({accountant:"Bugalter",dean:"Dekanat",inspector:"Nazoratchi"}[l.raw.role]),1)]),_:2},1024)])]),"no-data":e(()=>[ie]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),a(A,{modelValue:v.value,"onUpdate:modelValue":o[7]||(o[7]=l=>v.value=l),"max-width":"550px"},{default:e(()=>[a(Y,null,{default:e(()=>[a(P,{class:"mt-2 ml-2 mb-0"},{default:e(()=>[i("span",de,m(M(U)),1)]),_:1}),a(Q,{class:"px-2 pt-0"},{default:e(()=>[a(z,null,{default:e(()=>[a(H,{ref_key:"form",ref:g},{default:e(()=>[a(k,null,{default:e(()=>[a(d,{cols:"12"},{default:e(()=>[a(f,{modelValue:n.value.name,"onUpdate:modelValue":o[2]||(o[2]=l=>n.value.name=l),label:"Ism familiya","hide-details":"",rules:_,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:e(()=>[a(f,{modelValue:n.value.phone,"onUpdate:modelValue":o[3]||(o[3]=l=>n.value.phone=l),label:"Telefon raqami","hide-details":"",rules:_,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",sm:"6"},{default:e(()=>[a(f,{modelValue:n.value.login,"onUpdate:modelValue":o[4]||(o[4]=l=>n.value.login=l),label:"Login","hide-details":"",rules:_,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",sm:"6"},{default:e(()=>[a(f,{modelValue:n.value.password,"onUpdate:modelValue":o[5]||(o[5]=l=>n.value.password=l),label:"Parol","hide-details":"",rules:_,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:e(()=>[a(S,{modelValue:n.value.role,"onUpdate:modelValue":o[6]||(o[6]=l=>n.value.role=l),label:"Roli",rules:_,"hide-details":"",items:N,chips:"",color:"primary","item-title":"name","item-value":"role",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:e(()=>[a(b,{variant:"flat",color:"primary",block:"",onClick:j,height:"45"},{default:e(()=>[h(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{me as default};