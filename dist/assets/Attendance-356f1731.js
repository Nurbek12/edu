import{a as m}from"./index-7376b9a9.js";import{r as d,u as D,a as l,o as T,c as U,w as t,b as e,f as A,d as B}from"./index-a79041d6.js";const C=B("div",{class:"d-flex justify-center"},"DAVOMAT",-1),M={__name:"Attendance",setup(N){const _=[a=>!!a||"Required"],c=d([]),f=d([]),h=D(),g=d([]),s=d({group:null,subject:null}),y=[{title:"Talaba ism-familiyasi",align:"start",sortable:!1,key:"name"}],p=d([]),w=async()=>{const a=await Promise.all([m.get("/group/access"),m.get("/subject/access")]);f.value=a[0].data,g.value=a[1].data},V=async()=>{const{data:a}=await m.get(`/attendence/id/${s.value.group}`);p.value=a},x=async()=>{if(c.value.length===0||!s.value.subject)return;const a=new Date,u=[a.getFullYear().toString().substring(0),(a.getMonth()+1).toString().padStart(2,"0"),a.getDate().toString().padStart(2,"0")].join("-"),o=c.value.map(r=>(Object.assign(p.value.find(v=>v._id===r),{att:!1}),{...s.value,student:r,date:u,time:new Date().toLocaleTimeString(),teacher:h.getters.userid}));await m.post("/attendence",o)};return w(),(a,n)=>{const u=l("v-sheet"),o=l("v-col"),r=l("v-select"),v=l("v-autocomplete"),j=l("v-btn"),b=l("v-row"),S=l("v-data-table"),k=l("v-container");return T(),U(k,{fluid:""},{default:t(()=>[e(b,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(u,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[C]),_:1})]),_:1}),e(o,{cols:"12",md:"4"},{default:t(()=>[e(u,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[e(b,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(r,{modelValue:s.value.group,"onUpdate:modelValue":[n[0]||(n[0]=i=>s.value.group=i),V],label:"Guruh",rules:_,"hide-details":"",density:"comfortable",items:f.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(o,{cols:"12",class:"py-0"},{default:t(()=>[e(v,{modelValue:s.value.subject,"onUpdate:modelValue":n[1]||(n[1]=i=>s.value.subject=i),label:"Fan",density:"comfortable",rules:_,"hide-details":"",items:g.value,color:"primary","item-title":"name","item-value":"name",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),e(o,{cols:"12"},{default:t(()=>[e(j,{color:"primary",onClick:x,block:"",elevation:"0",disabled:c.value.length===0,height:"40px"},{default:t(()=>[A(" Kiritish ")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1}),e(o,{cols:"12",md:"8"},{default:t(()=>[e(u,{elevation:"1",color:"surface",width:"100%",class:"py-2 px-0",rounded:""},{default:t(()=>[e(S,{modelValue:c.value,"onUpdate:modelValue":n[2]||(n[2]=i=>c.value=i),headers:y,items:p.value,"items-per-page-text":"","item-value":"_id","items-per-page":"-1","item-selectable":"att","no-data-text":"Hech narsa topilmadi","show-select":"",density:"compact"},{bottom:t(()=>[]),_:1},8,["modelValue","items"])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{M as default};
