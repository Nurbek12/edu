import{r as g,a as s,o as l,i as c,b as t,w as a,F as _,h as j,j as x,d as e,t as n}from"./index-439559a6.js";import{_ as B}from"./FooterPage-0a1b0f32.js";const C=e("div",{class:"d-flex justify-center"},"DARS JADVALI",-1),F={class:"text-h6"},N=e("thead",null,[e("tr",null,[e("th",{class:"text-left"},"Fan Nomi"),e("th",{class:"text-left"},"O'qituvchi"),e("th",{class:"text-left"},"Auditoriya")])],-1),$={__name:"Table",setup(V){const r=g({}),b=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],u=async d=>{const{data:i}=await j.get(`/table?${d||""}`);r.value=i};return u(),(d,i)=>{const m=s("v-sheet"),f=s("v-col"),p=s("v-card-text"),y=s("v-table"),w=s("v-card"),k=s("v-row"),D=s("v-container");return l(),c(_,null,[t(D,{fluid:""},{default:a(()=>[t(k,null,{default:a(()=>[t(f,{cols:"12"},{default:a(()=>[t(m,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:a(()=>[C]),_:1})]),_:1}),(l(),c(_,null,x(b,(h,A)=>t(f,{key:A,cols:"12",sm:"6",md:"4"},{default:a(()=>[t(w,null,{default:a(()=>[t(p,{class:"pa-0"},{default:a(()=>[t(m,{color:"surface",class:"px-4 py-2"},{default:a(()=>[e("span",F,n(h),1)]),_:2},1024)]),_:2},1024),t(p,{class:"px-0"},{default:a(()=>[t(y,{density:"compact"},{default:a(()=>[N,e("tbody",null,[(l(!0),c(_,null,x(r.value[h]||[],(o,S)=>{var v;return l(),c("tr",{key:S},[e("td",null,n(o.index)+". "+n(o.subject),1),e("td",null,n((v=o.teacher)==null?void 0:v.name),1),e("td",null,n(o.room),1)])}),128))])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)),64))]),_:1})]),_:1}),t(B,{onGetDate:u})],64)}}};export{$ as default};
