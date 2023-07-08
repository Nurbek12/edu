import{a as g}from"./index-7376b9a9.js";import{r as d,l as J,m as K,a as n,o as M,c as W,w as a,b as t,f as h,d as u,t as r,e as X,n as Z}from"./index-1d6c4b32.js";const ee={class:"responsive-datatable"},ae={"data-label":"T/r"},te={"data-label":"Boshqarish"},le={class:"d-flex justify-end"},oe={"data-label":"Ism familiyasi"},se={"data-label":"Guruhi"},ne={"data-label":"Login"},ie={"data-label":"Paroli"},de={"data-label":"Telefoni"},ue={"data-label":"Holati"},re={"data-label":"Tugilgan sanasi"},me={class:"text-h5"},_e={__name:"Students",setup(ce){const c=[l=>!!l||"Required"],q=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Ism familiyasi",key:"name"},{title:"Guruhi",key:"group"},{title:"Login",key:"login"},{title:"Paroli",key:"password"},{title:"Telefoni",key:"phone"},{title:"Tugilgan sanasi",key:"birthdate"},{title:"Holati",key:"status"},{title:"Boshqarish",align:"start",key:"actions",sortable:!1}],f=d("");d([]);const v=d(!1),b=d(null),p=d(-1),y=d(-1),w=d([]),s=d({name:"",birthdate:"",phone:"",login:"",password:"",group:null,role:"student"}),O={name:"",birthdate:"",phone:"",login:"",password:"",group:null,role:"student"},z=J(()=>p.value===-1?"Talaba yaratish":"Talabani o'zgartirish"),U=d(10),_=d([]),V=d(!0),I=d(0);d(""),K(v,l=>l||k());const G=async()=>{const{data:l}=await g.get("/group");w.value=l},H=async()=>{const{valid:l}=await b.value.validate();l&&N()},L=l=>{p.value=_.value.indexOf(l),y.value=l._id,s.value=Object.assign({},l),v.value=!0},k=()=>{v.value=!1,Z(()=>{var l;s.value=Object.assign({},O),y.value=-1,p.value=-1,(l=b.value)==null||l.reset()})},N=async()=>{if(p.value>-1){const{data:l}=await g.put(`/user/${y.value}`,s.value);l?(Object.assign(_.value[p.value],l),k()):s.value.login=""}else{const{data:l}=await g.post("/user",s.value);l?(_.value.push(l),k()):s.value.login=""}},S=async({page:l,itemsPerPage:o,sortBy:m})=>{V.value=!0;const{data:i}=await g.get("/user/student/page",{params:{page:l,limit:o,search:f.value}});_.value=i.data,I.value=i.total,V.value=!1};return G(),(l,o)=>{const m=n("v-text-field"),i=n("v-col"),x=n("v-btn"),T=n("v-row"),P=n("v-sheet"),$=n("v-icon"),B=n("v-select"),D=n("v-chip"),Q=n("v-data-table-server"),R=n("v-card-title"),Y=n("v-form"),C=n("v-container"),A=n("v-card-text"),E=n("v-card"),F=n("v-dialog");return M(),W(C,{fluid:""},{default:a(()=>[t(T,null,{default:a(()=>[t(i,{cols:"12"},{default:a(()=>[t(P,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:a(()=>[t(T,{justify:"space-between",align:"center"},{default:a(()=>[t(i,{class:"py-1",cols:"12",sm:"4"},{default:a(()=>[t(m,{label:"Qidirish",modelValue:f.value,"onUpdate:modelValue":o[0]||(o[0]=e=>f.value=e),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),t(i,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:a(()=>[t(x,{block:"",height:"42",color:"primary",onClick:o[1]||(o[1]=e=>v.value=!0),variant:"flat"},{default:a(()=>[h("Yangi Talaba")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(i,{cols:"12"},{default:a(()=>[t(P,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:a(()=>[u("div",ee,[t(Q,{"items-per-page":U.value,"onUpdate:itemsPerPage":o[2]||(o[2]=e=>U.value=e),search:f.value,headers:q,"items-length":I.value,items:_.value,loading:V.value,class:"elevation-1","items-per-page-text":"","item-value":"name","no-data-text":"Hech narsa topilmadi","onUpdate:options":S},{"item.no":a(({index:e})=>[u("td",ae,r(e+1)+".",1)]),"item.actions":a(({item:e})=>[u("td",te,[u("div",le,[t(x,{variant:"flat",size:"30",color:"primary",onClick:j=>L(e.raw)},{default:a(()=>[t($,null,{default:a(()=>[h("mdi-pencil")]),_:1})]),_:2},1032,["onClick"])])])]),"item.name":a(({item:e})=>[u("td",oe,r(e.raw.name),1)]),"item.group":a(({item:e})=>[u("td",se,[t(B,{items:w.value,readonly:"",chips:"","item-value":"_id","item-title":"name",variant:"solo","hide-details":"",flat:"",modelValue:e.raw.group,"onUpdate:modelValue":j=>e.raw.group=j},null,8,["items","modelValue","onUpdate:modelValue"])])]),"item.login":a(({item:e})=>[u("td",ne,r(e.raw.login),1)]),"item.password":a(({item:e})=>[u("td",ie,r(e.raw.password),1)]),"item.phone":a(({item:e})=>[u("td",de,r(e.raw.phone),1)]),"item.status":a(({item:e})=>[u("td",ue,[t(D,{label:"",color:{aktiv:"blue",chetlashtirilgan:"red"}[e.raw.status]},{default:a(()=>[h(r(e.raw.status),1)]),_:2},1032,["color"])])]),"item.birthdate":a(({item:e})=>[u("td",re,r(e.raw.birthdate),1)]),_:1},8,["items-per-page","search","items-length","items","loading"])])]),_:1})]),_:1})]),_:1}),t(F,{modelValue:v.value,"onUpdate:modelValue":o[9]||(o[9]=e=>v.value=e),"max-width":"550px"},{default:a(()=>[t(E,null,{default:a(()=>[t(R,{class:"mt-2 ml-2 mb-0"},{default:a(()=>[u("span",me,r(X(z)),1)]),_:1}),t(A,{class:"px-2 pt-0"},{default:a(()=>[t(C,null,{default:a(()=>[t(Y,{ref_key:"form",ref:b},{default:a(()=>[t(T,null,{default:a(()=>[t(i,{cols:"12"},{default:a(()=>[t(m,{modelValue:s.value.name,"onUpdate:modelValue":o[3]||(o[3]=e=>s.value.name=e),label:"Ism familiya","hide-details":"",rules:c,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12"},{default:a(()=>[t(B,{modelValue:s.value.group,"onUpdate:modelValue":o[4]||(o[4]=e=>s.value.group=e),label:"Guruhi",rules:c,"hide-details":"",items:w.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),t(i,{cols:"12",sm:"6"},{default:a(()=>[t(m,{modelValue:s.value.phone,"onUpdate:modelValue":o[5]||(o[5]=e=>s.value.phone=e),label:"Telefon raqami","hide-details":"",rules:c,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",sm:"6"},{default:a(()=>[t(m,{modelValue:s.value.birthdate,"onUpdate:modelValue":o[6]||(o[6]=e=>s.value.birthdate=e),label:"Tug'ilgan sanasi","hide-details":"",type:"date",color:"primary",rules:c,variant:"outlined"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",sm:"6"},{default:a(()=>[t(m,{modelValue:s.value.login,"onUpdate:modelValue":o[7]||(o[7]=e=>s.value.login=e),label:"Login","hide-details":"",rules:c,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",sm:"6"},{default:a(()=>[t(m,{modelValue:s.value.password,"onUpdate:modelValue":o[8]||(o[8]=e=>s.value.password=e),label:"Parol","hide-details":"",rules:c,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12"},{default:a(()=>[t(x,{variant:"flat",color:"primary",block:"",onClick:H,height:"45"},{default:a(()=>[h(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{_e as default};
