import{g as R,r as C,a as n,o as r,c as d,w as t,h as y,b as a,i as S,j as $,F as D,d as q,f as s,t as l,k as L}from"./index-2e243627.js";const A=q("div",{class:"d-flex justify-center"},"TESTLAR",-1),P={__name:"Exam",setup(M){const k=R(),x={created:"Boshlash",start:"Davom Ettirish",finish:"Natijani Ko'rish"},T=C([]),B=C([]),z=async()=>{const i=await Promise.all([y.get("/exam/my"),y.get("/midterm/my")]);T.value=i[0].data,B.value=i[1].data},E=async({count:i,result:u,test:p,time:c})=>{u.status==="created"&&await y.post(`/test/start/${p._id}`,{count:i,result:u._id,time:c}),k.push(`/tests/${u._id}`)},V=async(i,u,p,c)=>{const{data:_}=await y.post(`/midterm/start/${i}`,{count:u,subject:p,time:c});k.push(`/midterms/${_._id}`)};return z(),(i,u)=>{const p=n("v-sheet"),c=n("v-col"),_=n("v-card-title"),o=n("v-card-text"),b=n("v-spacer"),h=n("v-btn"),F=n("v-card-actions"),v=n("v-card"),w=n("v-row"),N=n("v-timeline-item"),I=n("v-timeline"),K=n("v-container");return r(),d(K,{fluid:""},{default:t(()=>[a(w,null,{default:t(()=>[a(c,{cols:"12"},{default:t(()=>[a(p,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[A]),_:1})]),_:1}),a(c,{cols:"12"},{default:t(()=>[a(I,{density:"compact"},{default:t(()=>[(r(!0),S(D,null,$(T.value,(e,g)=>(r(),d(N,{key:g,size:"small","dot-color":"primary",width:"100%"},{default:t(()=>[a(w,{align:"center"},{default:t(()=>{var m,j;return[a(c,{cols:"12",sm:((m=e.result)==null?void 0:m.status)==="finish"?7:12},{default:t(()=>[a(v,{width:"100%",elevation:"2",rounded:"",class:"pt-4"},{default:t(()=>[a(_,{class:"py-1"},{default:t(()=>[s("Imtihon testi")]),_:1}),a(o,{class:"py-1"},{default:t(()=>{var f;return[s("Test bazasi: "+l((f=e.test)==null?void 0:f.name),1)]}),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Test sanasi: "+l(e.date),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Savollar soni: "+l(e.count),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Berilgan muhlati: "+l(e.time)+" min",1)]),_:2},1024),a(F,{class:"mt-3"},{default:t(()=>[a(b),a(h,{variant:"flat",color:"primary",disabled:!e.result,onClick:f=>E(e)},{default:t(()=>{var f;return[s(l(x[(f=e.result)==null?void 0:f.status]||"Boshlash"),1)]}),_:2},1032,["disabled","onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["sm"]),((j=e.result)==null?void 0:j.status)==="finish"?(r(),d(c,{key:0,cols:"12",sm:"5"},{default:t(()=>[a(v,{color:"surface",width:"100%"},{default:t(()=>[a(_,null,{default:t(()=>[s("Natijalar")]),_:1}),a(o,{class:"py-1"},{default:t(()=>[s("Boshlandi: "+l(new Date(e.result.start_time).toLocaleString()),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Tugadi: "+l(new Date(e.result.end_time).toLocaleString()),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("To'gri: "+l(e.result.rate)+" / "+l(e.count),1)]),_:2},1024),a(o,{class:"pt-1"},{default:t(()=>[s("Foiz: "+l(parseFloat(e.result.rate*100/e.count).toFixed(1))+" %",1)]),_:2},1024)]),_:2},1024)]),_:2},1024)):L("",!0)]}),_:2},1024)]),_:2},1024))),128)),(r(!0),S(D,null,$(B.value,(e,g)=>(r(),d(N,{key:g,size:"small","dot-color":"primary",width:"100%"},{default:t(()=>[a(w,{align:"center"},{default:t(()=>[a(c,{cols:"12",sm:e.result?7:12},{default:t(()=>[a(v,{width:"100%",elevation:"2",rounded:"",class:"pt-4"},{default:t(()=>[a(_,{class:"py-1"},{default:t(()=>[s("Oraliq testi")]),_:1}),a(o,{class:"py-1"},{default:t(()=>[s("Test nomi: "+l(e.name),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Testlar soni: "+l(e.count),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Test sanasi: "+l(e.date),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Berilgan muhlati: "+l(e.time)+" min",1)]),_:2},1024),a(F,{class:"mt-3"},{default:t(()=>[a(b),e.result?(r(),d(h,{key:0,color:"primary",variant:"flat",to:`/midterms/${e.result._id}`},{default:t(()=>[s("Natijani Ko'rish")]),_:2},1032,["to"])):(r(),d(h,{key:1,color:"primary",variant:"flat",onClick:m=>V(e._id,e.count,e.subject,e.time)},{default:t(()=>{var m;return[s(l(x[(m=e.result)==null?void 0:m.status]||"Boshlash"),1)]}),_:2},1032,["onClick"]))]),_:2},1024)]),_:2},1024)]),_:2},1032,["sm"]),e.result?(r(),d(c,{key:0,cols:"12",sm:"5"},{default:t(()=>[a(v,{color:"surface",width:"100%"},{default:t(()=>[a(_,null,{default:t(()=>[s("Natijalar")]),_:1}),a(o,{class:"py-1"},{default:t(()=>[s("Boshlandi: "+l(new Date(e.result.start_time).toLocaleString()),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("Tugadi: "+l(new Date(e.result.end_time).toLocaleString()),1)]),_:2},1024),a(o,{class:"py-1"},{default:t(()=>[s("To'gri: "+l(e.result.rate)+" / "+l(e.count),1)]),_:2},1024),a(o,{class:"pt-1"},{default:t(()=>[s("Foiz: "+l(parseFloat(e.result.rate*100/e.count).toFixed(1))+" %",1)]),_:2},1024)]),_:2},1024)]),_:2},1024)):L("",!0)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})}}};export{P as default};