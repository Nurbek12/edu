import{a as b}from"./index-7376b9a9.js";import{r as d,l as X,m as B,a as s,o as Z,c as ee,w as e,b as a,f as _,d as o,t as n,e as ae,n as N}from"./index-1d6c4b32.js";const te={class:"responsive-datatable"},le={"data-label":"T/r"},oe={"data-label":"Fan nomi"},se={"data-label":"Talabalar soni"},ie={"data-label":"Boshqarish"},ne={class:"d-flex justify-end align-center"},de=o("div",null,"Hech narsa topilmadi",-1),ue={class:"text-h5"},re={class:"responsive-datatable"},ce={"data-label":"T/r"},_e={"data-label":"Ism familiyasi"},me={"data-label":"Guruhi"},ve={"data-label":"Login"},pe={"data-label":"Paroli"},fe={"data-label":"Telefoni"},he={"data-label":"Tugilgan sanasi"},be=o("div",null,"Hech narsa topilmadi",-1),ke={__name:"Groups",setup(ge){const H=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Guruh Nomi",key:"name"},{title:"Talabalar soni",key:"users"},{title:"Boshqarish",key:"actions",sortable:!1}],L=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Ism familiyasi",key:"name"},{title:"Guruhi",key:"group"},{title:"Login",key:"login"},{title:"Paroli",key:"password"},{title:"Telefoni",key:"phone"},{title:"Tugilgan sanasi",key:"birthdate"}],P=[l=>!!l||"Required"],g=d(""),u=d([]),x=d([]),V=d(null),m=d(!1),f=d(!1),r=d(-1),h=d(-1),c=d({name:""}),S={name:""},D=X(()=>r.value===-1?"Guruh Yaratish":"Guruhni O'zgartirish");B(m,l=>l||y()),B(f,l=>l||C());const F=async()=>{const{data:l}=await b.get("/group?users=1");u.value=l},Q=async()=>{const{valid:l}=await V.value.validate();l&&J()},R=async l=>{const{data:i}=await b.get(`/user/student?group=${l}`);x.value=i,f.value=!0},Y=l=>{r.value=u.value.indexOf(l),h.value=l._id,c.value=Object.assign({},l),m.value=!0},A=l=>{r.value=u.value.indexOf(l),c.value=Object.assign({},l),h.value=l._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?E():y()},E=async()=>{const{data:l}=await b.delete(`/group/${h.value}`);l&&(u.value.splice(r.value,1),y())},y=()=>{m.value=!1,N(()=>{var l;c.value=Object.assign({},S),h.value=-1,r.value=-1,(l=V.value)==null||l.reset()})},C=()=>{f.value=!1,N(()=>{x.value=[]})},J=async()=>{if(r.value>-1){const{data:l}=await b.put(`/group/${h.value}`,c.value);Object.assign(u.value[r.value],l)}else{const{data:l}=await b.post("/group",c.value);u.value.push({...l,users:0})}y()};return F(),(l,i)=>{const I=s("v-text-field"),v=s("v-col"),p=s("v-btn"),T=s("v-row"),G=s("v-sheet"),w=s("v-icon"),z=s("v-data-table"),j=s("v-card-title"),K=s("v-form"),O=s("v-container"),U=s("v-card-text"),$=s("v-card"),q=s("v-dialog"),M=s("v-spacer"),W=s("v-select");return Z(),ee(O,{fluid:""},{default:e(()=>[a(T,null,{default:e(()=>[a(v,{cols:"12"},{default:e(()=>[a(G,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:e(()=>[a(T,{justify:"space-between"},{default:e(()=>[a(v,{cols:"12",class:"py-1",sm:"4"},{default:e(()=>[a(I,{label:"Qidirish",modelValue:g.value,"onUpdate:modelValue":i[0]||(i[0]=t=>g.value=t),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),a(v,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:e(()=>[a(p,{block:"",height:"42",color:"primary",onClick:i[1]||(i[1]=t=>m.value=!0),variant:"flat"},{default:e(()=>[_("Guruh yaratish")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(v,{cols:"12"},{default:e(()=>[a(G,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[o("div",te,[a(z,{"items-per-page-text":"",headers:H,search:g.value,items:u.value},{"item.no":e(({index:t})=>[o("td",le,n(t+1)+".",1)]),"item.name":e(({item:t})=>[o("td",oe,n(t.raw.name),1)]),"item.users":e(({item:t})=>[o("td",se,n(t.raw.users),1)]),"item.actions":e(({item:t})=>[o("td",ie,[o("div",ne,[a(p,{variant:"flat",size:"30",color:"primary",onClick:k=>R(t.raw._id)},{default:e(()=>[a(w,null,{default:e(()=>[_("mdi-list-box")]),_:1})]),_:2},1032,["onClick"]),a(p,{variant:"flat",size:"30",class:"ml-1",color:"primary",onClick:k=>Y(t.raw)},{default:e(()=>[a(w,null,{default:e(()=>[_("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),a(p,{variant:"flat",size:"30",class:"ml-1",color:"primary",onClick:k=>A(t.raw)},{default:e(()=>[a(w,null,{default:e(()=>[_("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])])]),"no-data":e(()=>[de]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),a(q,{modelValue:m.value,"onUpdate:modelValue":i[3]||(i[3]=t=>m.value=t),"max-width":"550px"},{default:e(()=>[a($,null,{default:e(()=>[a(j,{class:"mt-2 ml-2 mb-0"},{default:e(()=>[o("span",ue,n(ae(D)),1)]),_:1}),a(U,{class:"px-2 pt-0"},{default:e(()=>[a(O,null,{default:e(()=>[a(K,{ref_key:"form",ref:V},{default:e(()=>[a(T,null,{default:e(()=>[a(v,{cols:"12"},{default:e(()=>[a(I,{modelValue:c.value.name,"onUpdate:modelValue":i[2]||(i[2]=t=>c.value.name=t),label:"Guruh Nomi","hide-details":"",rules:P,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(v,{cols:"12"},{default:e(()=>[a(p,{variant:"flat",color:"primary",block:"",onClick:Q,height:"45"},{default:e(()=>[_(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(q,{modelValue:f.value,"onUpdate:modelValue":i[4]||(i[4]=t=>f.value=t)},{default:e(()=>[a($,null,{default:e(()=>[a(j,{class:"text-h6 d-flex justify-space-between align-center"},{default:e(()=>[_(" Guruhdagi o'quvchilar ruytati "),a(M),a(p,{size:"30",color:"primary",onClick:C},{default:e(()=>[a(w,{size:"small"},{default:e(()=>[_("mdi-close")]),_:1})]),_:1})]),_:1}),a(U,{class:"px-2"},{default:e(()=>[o("div",re,[a(z,{"items-per-page-text":"","items-per-page":"-1",headers:L,search:g.value,items:x.value},{"item.no":e(({index:t})=>[o("td",ce,n(t+1)+".",1)]),"item.name":e(({item:t})=>[o("td",_e,n(t.raw.name),1)]),bottom:e(()=>[]),"item.group":e(({item:t})=>[o("td",me,[a(W,{items:u.value,readonly:"",chips:"","item-value":"_id","item-title":"name",variant:"solo","hide-details":"",flat:"",modelValue:t.raw.group,"onUpdate:modelValue":k=>t.raw.group=k},null,8,["items","modelValue","onUpdate:modelValue"])])]),"item.login":e(({item:t})=>[o("td",ve,n(t.raw.login),1)]),"item.password":e(({item:t})=>[o("td",pe,n(t.raw.password),1)]),"item.phone":e(({item:t})=>[o("td",fe,n(t.raw.phone),1)]),"item.birthdate":e(({item:t})=>[o("td",he,n(t.raw.birthdate),1)]),"no-data":e(()=>[be]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{ke as default};
