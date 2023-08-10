import{r as u,l as Z,m as ee,a as n,o as $,c as ae,w as a,h as v,b as e,e as D,f as w,i as le,j as te,F as oe,d as c,t as f,n as se}from"./index-eee0caed.js";import{s as ne}from"./semesters-2992cfa7.js";const ie={class:"text-h6"},ue={class:"responsive-datatable"},de={"data-label":"Fan Nomi"},re={"data-label":"O'qituvchi"},ce={"data-label":"Auditoriya"},me={"data-label":"Boshqarish"},ve={class:"d-flex justify-end align-center"},_e={class:"text-h5"},he={__name:"LessonTable",setup(pe){const C=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],T=[{title:"Fan nomi",key:"name"},{title:"O'qituvchi",key:"teacher"},{title:"Auditoriya",key:"room"},{title:"Boshqarish",key:"actions",sortable:!1}],b=[l=>!!l||"Required"];u("");const k=u(null),d=u({Dushanba:[],Seshanba:[],Chorshanba:[],Payshanba:[],Juma:[],Shanba:[]}),O=u([]),U=u([]),S=u([]),_=u(!1),m=u(-1),h=u(-1),t=u({group:null,teacher:null,subject:null,day:null,index:null,room:""}),A={teacher:null,subject:null,day:null,index:null,room:""},N=Z(()=>m.value===-1?"Fan Yaratish":"Fanni O'zgartirish");ee(_,l=>l||y());const P=async()=>{const l=await Promise.all([v.get("/user/teacher"),v.get("/group"),v.get("/subject")]);O.value=l[0].data,U.value=l[1].data,S.value=l[2].data},q=async l=>{const{data:o}=await v.get(`/table?group=${t.value.group}&${l}`);d.value=Object.assign({},o)},J=async()=>{const{valid:l}=await k.value.validate();l&&E()},L=l=>{m.value=d.value[l.day].indexOf(l),h.value=l._id,t.value=Object.assign({},l),_.value=!0},Y=l=>{m.value=d.value[l.day].indexOf(l),t.value=Object.assign({},l),h.value=l._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?R():y()},R=async()=>{const{data:l}=await v.delete(`/table/${h.value}`);l&&(d.value[t.value.day].splice(m.value,1),y())},y=()=>{_.value=!1,se(()=>{var l;t.value=Object.assign({},{...A,group:t.value.group}),h.value=-1,m.value=-1,(l=k.value)==null||l.reset()})},E=async()=>{if(m.value>-1){const{data:l}=await v.put(`/table/${h.value}`,t.value);Object.assign(d.value[t.value.day][m.value],l)}else{const{data:l}=await v.post("/table",t.value);d.value[t.value.day]?d.value[t.value.day].push(l):d.value[t.value.day]=[l]}y()},G=l=>{delete l.title,q(new URLSearchParams(l).toString())};return P(),(l,o)=>{const p=n("v-select"),i=n("v-col"),g=n("v-btn"),x=n("v-row"),z=n("v-sheet"),j=n("v-card-text"),B=n("v-icon"),H=n("v-data-table"),F=n("v-card"),K=n("v-card-title"),M=n("v-text-field"),Q=n("v-form"),I=n("v-container"),W=n("v-dialog");return $(),ae(I,{fluid:""},{default:a(()=>[e(x,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(z,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:a(()=>[e(x,{justify:"space-between",align:"center"},{default:a(()=>[e(i,{cols:"12",class:"py-1",sm:"4"},{default:a(()=>[e(p,{modelValue:t.value.group,"onUpdate:modelValue":[o[0]||(o[0]=s=>t.value.group=s),q],label:"Guruhni tanlang","hide-details":"",items:U.value,density:"compact",color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(i,{cols:"12",class:"py-1",sm:"4"},{default:a(()=>[e(p,{label:"Semestr",disabled:!t.value.group,"onUpdate:modelValue":G,"hide-details":"",items:D(ne),density:"compact",color:"primary","item-title":"title","return-object":"",variant:"outlined"},null,8,["disabled","items"])]),_:1}),e(i,{cols:"12",class:"py-1",sm:"4"},{default:a(()=>[e(g,{block:"",color:"primary",disabled:!t.value.group,onClick:o[1]||(o[1]=s=>_.value=!0),variant:"flat",height:"42"},{default:a(()=>[w("Jadval yaratish")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(x,null,{default:a(()=>[($(),le(oe,null,te(C,(s,X)=>e(i,{key:X,cols:"12",sm:"6"},{default:a(()=>[e(F,null,{default:a(()=>[e(j,{class:"pa-0"},{default:a(()=>[e(z,{color:"surface",class:"px-4 py-2"},{default:a(()=>[c("span",ie,f(s),1)]),_:2},1024)]),_:2},1024),e(j,{class:"px-0 pt-0"},{default:a(()=>[c("div",ue,[e(H,{density:"comfortable","hide-no-data":"","items-per-page-text":"",headers:T,items:d.value[s]||[]},{bottom:a(()=>[]),"item.name":a(({item:r})=>[c("td",de,f(r.raw.index)+". "+f(r.raw.subject),1)]),"item.teacher":a(({item:r})=>{var V;return[c("td",re,f((V=r.raw.teacher)==null?void 0:V.name),1)]}),"item.room":a(({item:r})=>[c("td",ce,f(r.raw.room),1)]),"item.actions":a(({item:r})=>[c("td",me,[c("div",ve,[e(g,{size:"30",elevation:"0",color:"primary",onClick:V=>L(r.raw)},{default:a(()=>[e(B,{size:"small"},{default:a(()=>[w("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),e(g,{size:"30",elevation:"0",color:"primary",class:"ml-1",onClick:V=>Y(r.raw)},{default:a(()=>[e(B,{size:"small"},{default:a(()=>[w("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])])]),_:2},1032,["items"])])]),_:2},1024)]),_:2},1024)]),_:2},1024)),64))]),_:1}),e(W,{modelValue:_.value,"onUpdate:modelValue":o[7]||(o[7]=s=>_.value=s),"max-width":"550px"},{default:a(()=>[e(F,null,{default:a(()=>[e(K,{class:"mt-2 ml-2 mb-0"},{default:a(()=>[c("span",_e,f(D(N)),1)]),_:1}),e(j,{class:"px-2 pt-0"},{default:a(()=>[e(I,null,{default:a(()=>[e(Q,{ref_key:"form",ref:k},{default:a(()=>[e(x,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(p,{modelValue:t.value.day,"onUpdate:modelValue":o[2]||(o[2]=s=>t.value.day=s),label:"Hafta kuni",rules:b,"hide-details":"",items:C,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(p,{modelValue:t.value.index,"onUpdate:modelValue":o[3]||(o[3]=s=>t.value.index=s),label:"Dars soati",rules:b,"hide-details":"",items:[1,2,3,4,5,6,7,8,9,10,11],color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(p,{modelValue:t.value.subject,"onUpdate:modelValue":o[4]||(o[4]=s=>t.value.subject=s),label:"Fan nomi",rules:b,"hide-details":"",items:S.value,color:"primary","item-title":"name","item-value":"name",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(p,{modelValue:t.value.teacher,"onUpdate:modelValue":o[5]||(o[5]=s=>t.value.teacher=s),label:"O'qituvchi",rules:b,"hide-details":"",items:O.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(M,{modelValue:t.value.room,"onUpdate:modelValue":o[6]||(o[6]=s=>t.value.room=s),label:"Auditoriya",rules:b,"hide-details":"",color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(i,{cols:"12"},{default:a(()=>[e(g,{variant:"flat",color:"primary",block:"",onClick:J,height:"45"},{default:a(()=>[w(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{he as default};
