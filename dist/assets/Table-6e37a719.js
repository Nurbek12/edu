import{a as A}from"./index-7376b9a9.js";import{r as B,a as s,o as l,c as D,w as e,b as a,h as c,i as f,F as h,d as t,t as n}from"./index-1d6c4b32.js";const S=t("div",{class:"d-flex justify-center"},"DARS JADVALI",-1),C={class:"text-h6"},F=t("thead",null,[t("tr",null,[t("th",{class:"text-left"},"Fan Nomi"),t("th",{class:"text-left"},"Guruh"),t("th",{class:"text-left"},"Auditoriya")])],-1),L={__name:"Table",setup(N){const r=B({}),v=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];return(async()=>{const{data:_}=await A.get("/table");r.value=_})(),(_,j)=>{const u=s("v-sheet"),d=s("v-col"),i=s("v-card-text"),x=s("v-table"),b=s("v-card"),y=s("v-row"),k=s("v-container");return l(),D(k,{fluid:""},{default:e(()=>[a(y,null,{default:e(()=>[a(d,{cols:"12"},{default:e(()=>[a(u,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[S]),_:1})]),_:1}),(l(),c(h,null,f(v,(p,w)=>a(d,{key:w,cols:"12",sm:"6",md:"4"},{default:e(()=>[a(b,null,{default:e(()=>[a(i,{class:"pa-0"},{default:e(()=>[a(u,{color:"surface",class:"px-4 py-2"},{default:e(()=>[t("span",C,n(p),1)]),_:2},1024)]),_:2},1024),a(i,{class:"px-0"},{default:e(()=>[a(x,{density:"compact"},{default:e(()=>[F,t("tbody",null,[(l(!0),c(h,null,f(r.value[p]||[],(o,g)=>{var m;return l(),c("tr",{key:g},[t("td",null,n(o.index)+". "+n(o.subject),1),t("td",null,n((m=o.group)==null?void 0:m.name),1),t("td",null,n(o.room),1)])}),128))])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)),64))]),_:1})]),_:1})}}};export{L as default};
