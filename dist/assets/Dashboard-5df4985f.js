import{u as g,r as _,a as i,o as w,c as y,w as t,b as o,d as a,t as s,e as k}from"./index-1d6c4b32.js";import{l as x}from"./index-61c3fb60.js";const T={class:"d-flex justify-center"},B={class:"responsive-datatable"},D={"data-label":"T/r"},S={"data-label":"Talaba"},q={"data-label":"Test baza"},I={"data-label":"Kirgan vaqti"},z={"data-label":"IP"},C={"data-label":"Qurilma"},V={__name:"Dashboard",setup(K){const n=x("/"),m=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Talaba",key:"name"},{title:"Test baza",key:"test",sortable:!1},{title:"Kirgan vaqti",key:"time",sortable:!1},{title:"IP",key:"ip",sortable:!1},{title:"Qurilma",key:"device",sortable:!1}],u=g(),p=_(""),r=_([]);n.emit("req-data"),n.on("send-admin",l=>{r.value=l});const h=l=>new Date(parseInt(l)).toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}).replace(/[/,-]/g,":").replace(/\b\d\b/g,"0$&");return(l,N)=>{const c=i("v-sheet"),d=i("v-col"),f=i("v-data-table"),v=i("v-row"),b=i("v-container");return w(),y(b,{fluid:""},{default:t(()=>[o(v,null,{default:t(()=>[o(d,{cols:"12"},{default:t(()=>[o(c,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>{var e;return[a("div",T,s(((e=k(u).getters.user)==null?void 0:e.name)||"Bosh Sahifa"),1)]}),_:1})]),_:1}),o(d,{cols:"12"},{default:t(()=>[o(c,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[a("div",B,[o(f,{"items-per-page-text":"",headers:m,"sort-by":[{field:"name",direction:"asc"}],"no-data-text":"Hech narsa topilmadi",search:p.value,items:r.value},{"item.no":t(({index:e})=>[a("td",D,s(e+1)+".",1)]),"item.name":t(({item:e})=>[a("td",S,s(e.raw.user),1)]),"item.test":t(({item:e})=>[a("td",q,s(e.raw.test),1)]),"item.time":t(({item:e})=>[a("td",I,s(h(e.raw.time)),1)]),"item.ip":t(({item:e})=>[a("td",z,s(e.raw.ip),1)]),"item.device":t(({item:e})=>[a("td",C,s(e.raw.device),1)]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{V as default};