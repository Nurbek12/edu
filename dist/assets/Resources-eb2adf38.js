import{u as ne,r as m,l as ie,m as ue,a as i,o as _,c as U,w as e,b as a,f,d as n,t as r,e as de,h as V,i as M,F as $,n as re}from"./index-1d6c4b32.js";import{a as p}from"./index-7376b9a9.js";const ce={class:"responsive-datatable"},me={"data-label":"T/r"},ve={"data-label":"Resurs nomi"},pe={"data-label":"Fan nomi"},_e={"data-label":"Guruh"},fe={"data-label":"O'qituvchi"},he={"data-label":"Sanasi"},ye={"data-label":"Auditoriya"},be={"data-label":"Boshqarish"},ge={class:"d-flex justify-end"},ke=n("div",null,"Hech narsa topilmadi",-1),we={class:"text-h5"},Ve=n("thead",null,[n("tr",null,[n("th",{class:"text-left"},"Fan Nomi"),n("th",{class:"text-left"})])],-1),xe={class:"text-caption gray"},Ue={__name:"Resources",setup(je){const R=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Resurs nomi",key:"name"},{title:"Fan nomi",key:"subject"},{title:"Guruhi",key:"group"},{title:"O'qituvchi",key:"teacher"},{title:"Sanasi",key:"date"},{title:"Auditoriya",key:"room"},{title:"Boshqarish",key:"actions",sortable:!1}],g=[l=>!!l||"Required"],q=ne(),x=m(""),j=m(null),v=m([]),I=m([]),O=m([]),h=m(!1),c=m(-1),k=m(-1),s=m({name:null,group:null,subject:null,room:"",date:""}),z=m([]),A={name:null,group:null,subject:null,room:"",date:""},D=ie(()=>c.value===-1?"Ma'ruza Yaratish":"Ma'ruza O'zgartirish");ue(h,l=>l||w());const G=async()=>{const l=await Promise.all([p.get("/subject/"),p.get("/group"),p.get(`/resource?teacher=${q.getters.userid}`)]);I.value=l[0].data,O.value=l[1].data,v.value=l[2].data},N=async()=>{const{valid:l}=await j.value.validate();l&&P()},E=l=>{c.value=v.value.indexOf(l),k.value=l._id,s.value=Object.assign({},l),h.value=!0},H=l=>{c.value=v.value.indexOf(l),s.value=Object.assign({},l),k.value=l._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?L():w()},L=async()=>{const{data:l}=await p.delete(`/resource/${k.value}`);l&&(v.value.splice(c.value,1),w())},w=()=>{h.value=!1,re(()=>{var l;s.value=Object.assign({},A),k.value=-1,c.value=-1,(l=j.value)==null||l.reset()})},P=async()=>{const l=new FormData;if(l.append("name",s.value.name),l.append("group",s.value.group),l.append("subject",s.value.subject),l.append("room",s.value.room),l.append("date",s.value.date),l.append("teacher",q.getters.userid),z.value.map(o=>l.append("files",o)),c.value>-1){const{data:o}=await p.put(`/resource/${k.value}`,s.value);Object.assign(v.value[c.value],o)}else{const{data:o}=await p.post("/resource",l);v.value.push(o)}w()},Q=async l=>{const o=new FormData;o.append("file",l.target.files[0]);const{data:y}=await p.put(`/resource/addfile/${s.value._id}`,o);v.value[c.value].files.push(y)},Y=async(l,o)=>{confirm("Ushbu malumotni o'chirmoqchimisiz?")&&(await p.put(`/resource/rmfile/${s.value._id}/${l}`),v.value[c.value].files.splice(o,1))},J=()=>document.getElementById("file-input").click();return G(),(l,o)=>{const y=i("v-text-field"),u=i("v-col"),b=i("v-btn"),C=i("v-row"),B=i("v-sheet"),K=i("v-spacer"),F=i("v-icon"),W=i("v-data-table"),X=i("v-card-title"),S=i("v-select"),Z=i("v-chip"),ee=i("v-file-input"),ae=i("v-table"),te=i("v-form"),T=i("v-container"),le=i("v-card-text"),oe=i("v-card"),se=i("v-dialog");return _(),U(T,{fluid:""},{default:e(()=>[a(C,null,{default:e(()=>[a(u,{cols:"12"},{default:e(()=>[a(B,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:e(()=>[a(C,{justify:"space-between",align:"center"},{default:e(()=>[a(u,{class:"py-1",cols:"12",sm:"4"},{default:e(()=>[a(y,{label:"Qidirish",modelValue:x.value,"onUpdate:modelValue":o[0]||(o[0]=t=>x.value=t),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),a(u,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:e(()=>[a(b,{block:"",height:"42",color:"primary",onClick:o[1]||(o[1]=t=>h.value=!0),variant:"flat"},{default:e(()=>[f("Ma'ruza yaratish")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(u,{cols:"12"},{default:e(()=>[a(B,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[n("div",ce,[a(W,{"items-per-page-text":"",headers:R,search:x.value,items:v.value},{"item.no":e(({index:t})=>[n("td",me,r(t+1)+".",1)]),"item.name":e(({item:t})=>[n("td",ve,r(t.raw.name),1)]),"item.subject":e(({item:t})=>[n("td",pe,r(t.raw.subject),1)]),"item.group":e(({item:t})=>{var d;return[n("td",_e,r((d=t.raw.group)==null?void 0:d.name),1)]}),"item.teacher":e(({item:t})=>{var d;return[n("td",fe,r((d=t.raw.teacher)==null?void 0:d.name),1)]}),"item.date":e(({item:t})=>[n("td",he,r(t.raw.date),1)]),"item.room":e(({item:t})=>[n("td",ye,r(t.raw.room),1)]),"item.actions":e(({item:t})=>[n("td",be,[a(K),n("div",ge,[a(b,{variant:"flat",class:"ml-1",size:"30",color:"primary",onClick:d=>E(t.raw)},{default:e(()=>[a(F,null,{default:e(()=>[f("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),a(b,{variant:"flat",class:"ml-1",size:"30",color:"primary",onClick:d=>H(t.raw)},{default:e(()=>[a(F,null,{default:e(()=>[f("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])])]),"no-data":e(()=>[ke]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),a(se,{modelValue:h.value,"onUpdate:modelValue":o[8]||(o[8]=t=>h.value=t),"max-width":"550px"},{default:e(()=>[a(oe,null,{default:e(()=>[a(X,{class:"mt-2 ml-2 mb-0"},{default:e(()=>[n("span",we,r(de(D)),1)]),_:1}),a(le,{class:"px-2 pt-0"},{default:e(()=>[a(T,null,{default:e(()=>[a(te,{ref_key:"form",ref:j},{default:e(()=>[a(C,null,{default:e(()=>[a(u,{cols:"12"},{default:e(()=>[a(y,{modelValue:s.value.name,"onUpdate:modelValue":o[2]||(o[2]=t=>s.value.name=t),label:"Ma'ruza mavzusi","hide-details":"",color:"primary",rules:g,variant:"outlined"},null,8,["modelValue"])]),_:1}),a(u,{cols:"12"},{default:e(()=>[a(S,{modelValue:s.value.group,"onUpdate:modelValue":o[3]||(o[3]=t=>s.value.group=t),label:"Guruh",rules:g,"hide-details":"",items:O.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),a(u,{cols:"12"},{default:e(()=>[a(S,{modelValue:s.value.subject,"onUpdate:modelValue":o[4]||(o[4]=t=>s.value.subject=t),label:"Fan nomi",rules:g,"hide-details":"",items:I.value,color:"primary","item-title":"name","item-value":"name",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),a(u,{cols:"12",sm:"6"},{default:e(()=>[a(y,{modelValue:s.value.room,"onUpdate:modelValue":o[5]||(o[5]=t=>s.value.room=t),label:"Auditoriya","hide-details":"",color:"primary",rules:g,variant:"outlined"},null,8,["modelValue"])]),_:1}),a(u,{cols:"12",sm:"6"},{default:e(()=>[a(y,{type:"date",modelValue:s.value.date,"onUpdate:modelValue":o[6]||(o[6]=t=>s.value.date=t),label:"Sanasi","hide-details":"",color:"primary",rules:g,variant:"outlined"},null,8,["modelValue"])]),_:1}),c.value===-1?(_(),U(u,{key:0,cols:"12"},{default:e(()=>[a(ee,{"hide-details":"",variant:"outlined",color:"primary",modelValue:z.value,"onUpdate:modelValue":o[7]||(o[7]=t=>z.value=t),"prepend-icon":null,label:"Fayllar",multiple:"","show-size":!0},{selection:e(({fileNames:t})=>[(_(!0),V($,null,M(t,d=>(_(),U(Z,{key:d,size:"small",label:"",color:"primary",class:"me-2"},{default:e(()=>[f(r(d),1)]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1})):(_(),V($,{key:1},[a(u,{cols:"12",class:"px-0 py-0"},{default:e(()=>[a(ae,{density:"compact"},{default:e(()=>[Ve,n("tbody",null,[(_(!0),V($,null,M(s.value.files,(t,d)=>(_(),V("tr",{key:t},[n("td",null,[n("span",xe,r(d+1)+". "+r(t),1)]),n("td",null,[a(b,{color:"primary",variant:"flat",size:"25",onClick:ze=>Y(t,d)},{default:e(()=>[a(F,{size:"small"},{default:e(()=>[f("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])]))),128))])]),_:1})]),_:1}),a(u,{cols:"12"},{default:e(()=>[n("input",{type:"file",hidden:"",id:"file-input",onChange:Q},null,32),a(b,{variant:"flat",onClick:J,color:"primary",block:"",height:"45"},{default:e(()=>[f(" Fayl qo'shish ")]),_:1})]),_:1})],64)),a(u,{cols:"12",class:"pt-0"},{default:e(()=>[a(b,{variant:"flat",color:"primary",block:"",onClick:N,height:"45"},{default:e(()=>[f(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{Ue as default};