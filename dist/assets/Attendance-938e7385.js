import{a as v}from"./index-7376b9a9.js";import{r as u,u as U,a as l,o as B,c as C,w as t,b as e,f as D,d as N}from"./index-6f11c559.js";const P=N("div",{class:"d-flex justify-center"},"Davomat",-1),A={__name:"Attendance",setup(F){const p=[a=>!!a||"Required"],d=u([]),f=u([]),h=U(),g=u([]),s=u({group:null,subject:null}),y=[{title:"Talaba",align:"start",sortable:!1,key:"name"}],r=u([]),V=async()=>{const a=await Promise.all([v.get("/group"),v.get("/science")]);f.value=a[0].data,g.value=a[1].data},w=async()=>{const{data:a}=await v.get(`/attendence/${s.value.group}`);r.value=a,console.log(r.value)},j=async()=>{if(d.value.length===0||!s.value.subject)return;const a=new Date,i=[a.getFullYear().toString().substring(0),(a.getMonth()+1).toString().padStart(2,"0"),a.getDate().toString().padStart(2,"0")].join("-"),o=d.value.map(m=>(Object.assign(r.value.find(_=>_._id===m),{att:!1}),{student:m,date:i,teacher:h.getters.userid,...s.value}));await v.post("/attendence",o)};return V(),(a,n)=>{const i=l("v-sheet"),o=l("v-col"),m=l("v-select"),_=l("v-autocomplete"),k=l("v-btn"),b=l("v-row"),x=l("v-data-table"),S=l("v-container");return B(),C(S,{fluid:""},{default:t(()=>[e(b,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(i,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[P]),_:1})]),_:1}),e(o,{cols:"12",md:"4"},{default:t(()=>[e(i,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[e(b,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(m,{modelValue:s.value.group,"onUpdate:modelValue":[n[0]||(n[0]=c=>s.value.group=c),w],label:"Guruh",rules:p,"hide-details":"",density:"compact",items:f.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(o,{cols:"12",class:"py-0"},{default:t(()=>[e(_,{modelValue:s.value.subject,"onUpdate:modelValue":n[1]||(n[1]=c=>s.value.subject=c),label:"Fan",density:"compact",rules:p,"hide-details":"",items:g.value,color:"primary","item-title":"name","item-value":"name",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(o,{cols:"12"},{default:t(()=>[e(k,{color:"#222f3b",onClick:j,block:"",theme:"dark",elevation:"0",height:"40px"},{default:t(()=>[D(" Kiritish ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(o,{cols:"12",md:"8"},{default:t(()=>[e(x,{modelValue:d.value,"onUpdate:modelValue":n[2]||(n[2]=c=>d.value=c),headers:y,items:r.value,"item-value":"_id","item-selectable":"att","show-select":"",density:"compact",class:"elevation-1"},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1})}}};export{A as default};
