import{a as x}from"./index-7376b9a9.js";import{g as C,r as S,a as n,o as i,c as m,w as t,b as e,h as T,i as B,F as b,d as D,f as a,t as l}from"./index-856562a7.js";const E=D("div",{class:"d-flex justify-center"},"TESTLAR",-1),R={__name:"ExamCalendar",setup(F){C();const p=S([]),f=S([]);return(async()=>{const r=new Date,v=[r.getFullYear().toString().substring(0),(r.getMonth()+1).toString().padStart(2,"0"),r.getDate().toString().padStart(2,"0")],d=new URLSearchParams({date:v.join("-")}).toString(),c=await Promise.all([x.get(`/exam?${d}`),x.get(`/midterm?${d}`)]);p.value=c[0].data,f.value=c[1].data})(),(r,v)=>{const d=n("v-sheet"),c=n("v-col"),y=n("v-card-title"),o=n("v-card-text"),g=n("v-card"),_=n("v-row"),h=n("v-timeline-item"),k=n("v-timeline"),z=n("v-container");return i(),m(z,{fluid:""},{default:t(()=>[e(_,null,{default:t(()=>[e(c,{cols:"12"},{default:t(()=>[e(d,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[E]),_:1})]),_:1}),e(c,{cols:"12"},{default:t(()=>[e(k,{density:"compact"},{default:t(()=>[(i(!0),T(b,null,B(p.value,(s,u)=>(i(),m(h,{key:u,size:"small","dot-color":"primary","max-width":"550px",width:"100%"},{default:t(()=>[e(_,{align:"center"},{default:t(()=>[e(c,{cols:"12"},{default:t(()=>[e(g,{width:"100%",elevation:"2",rounded:"",class:"pt-4 pb-2"},{default:t(()=>[e(y,{class:"py-1"},{default:t(()=>[a("Imtihon testi")]),_:1}),e(o,{class:"py-1"},{default:t(()=>{var w;return[a("Test bazasi: "+l((w=s.test)==null?void 0:w.name),1)]}),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Test sanasi: "+l(s.date),1)]),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Savollar soni: "+l(s.count),1)]),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Berilgan muhlati: "+l(s.time)+" min",1)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),(i(!0),T(b,null,B(f.value,(s,u)=>(i(),m(h,{key:u,size:"small","dot-color":"primary","max-width":"550px",width:"100%"},{default:t(()=>[e(_,{align:"center"},{default:t(()=>[e(c,{cols:"12"},{default:t(()=>[e(g,{width:"100%",elevation:"2",rounded:"",class:"pt-4 pb-2"},{default:t(()=>[e(y,{class:"py-1"},{default:t(()=>[a("Oraliq testi")]),_:1}),e(o,{class:"py-1"},{default:t(()=>[a("Test nomi: "+l(s.name),1)]),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Testlar soni: "+l(s.count),1)]),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Test sanasi: "+l(s.date),1)]),_:2},1024),e(o,{class:"py-1"},{default:t(()=>[a("Berilgan muhlati: "+l(s.time)+" min",1)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})}}};export{R as default};
