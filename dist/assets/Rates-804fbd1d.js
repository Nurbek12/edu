import{u as F,r as l,a as i,o as x,i as k,b as a,w as t,F as R,h as j,d as o,t as n}from"./index-eee0caed.js";import{_ as g}from"./FooterPage-a499760e.js";const A=o("div",{class:"d-flex justify-center"},"BAHOLAR JADVALI",-1),B={class:"responsive-datatable"},D={"data-label":"Fan nomi"},E={"data-label":"Joriy"},J={"data-label":"Oraliq"},N={"data-label":"Yakuniy"},O={"data-label":"Umumiy"},V=o("div",null,"Hech narsa topilmadi",-1),H={__name:"Rates",setup($){const p=F(),v=[{title:"Fan Nomi",key:"subject"},{title:"Joriy",key:"totalRate"},{title:"Oraliq",key:"totalMidmRate"},{title:"Yakuniy",key:"totalExamRate"},{title:"Umumiy",key:"total"}],h=l(""),s=l({}),r=l([]);l(!1),l(!1),l(-1),l(-1);const d=async _=>{const{data:c}=await j.get(`/rate/student/${p.getters.userid}?${_}`);s.value=c,r.value=c.subjects};return d(""),(_,c)=>{const u=i("v-sheet"),m=i("v-col"),f=i("v-data-table"),y=i("v-row"),b=i("v-container");return x(),k(R,null,[a(b,{fluid:""},{default:t(()=>[a(y,null,{default:t(()=>[a(m,{cols:"12"},{default:t(()=>[a(u,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[A]),_:1})]),_:1}),a(m,{cols:"12"},{default:t(()=>[a(u,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[o("div",B,[a(f,{"items-per-page-text":"","items-per-page":"-1",headers:v,search:h.value,items:r.value},{"item.subject":t(({index:e,item:w})=>[o("td",D,n(e+1)+". "+n(w.raw),1)]),"item.totalRate":t(({item:e})=>[o("td",E,n(parseFloat(s.value.jn[e.raw]||0).toFixed(1)),1)]),"item.totalMidmRate":t(({item:e})=>[o("td",J,n(parseFloat(s.value.on[e.raw]||0).toFixed(1)),1)]),"item.totalExamRate":t(({item:e})=>[o("td",N,n(parseFloat(s.value.yn[e.raw]||0).toFixed(1)),1)]),"item.total":t(({item:e})=>[o("td",O,n(parseFloat(((s.value.yn[e.raw]||0)+(s.value.on[e.raw]||0)+(s.value.jn[e.raw]||0))/3).toFixed(1)),1)]),bottom:t(()=>[]),"no-data":t(()=>[V]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1})]),_:1}),a(g,{onGetDate:d})],64)}}};export{H as default};