import{u as $,r as v,a as s,o as F,c as N,w as t,h as p,b as a,d as o,t as r,f as b}from"./index-2e243627.js";const q={class:"responsive-datatable"},G={"data-label":"T/r"},I={"data-label":"Test nomi"},O={"data-label":"Talaba"},S={"data-label":"Guruhi"},j={"data-label":"Bahosi"},K={"data-label":"Foizi"},U={"data-label":"Ochirish"},A={"data-label":"Ko'rish"},D={"data-label":"Boshqarish"},H={class:"d-flex justify-end"},Q=o("div",null,"Hech narsa topilmadi",-1),J={__name:"SecretAdmin",setup(R){$();const k=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Test Nomi",key:"test.name"},{title:"Talaba",key:"student.name"},{title:"Guruhi",key:"group"},{title:"Bahosi",key:"rate"},{title:"Foizi",key:"percent"},{title:"Ko'rish",key:"view"},{title:"O'chirish",key:"remove"}],u=v(""),c=v([]),h=v([]),g=async()=>{const{data:i}=await p.get("/group");h.value=i},x=async i=>{const{data:l}=await p.get(`/test/result?group=${i}`);c.value=l};async function z(i){if(confirm("O'chirishga rozimisiz")){const{data:l}=await p.delete(`/test/result/${i}`);if(l){const m=c.value.findIndex(d=>d._id===i);c.value.splice(m,1)}}}return g(),(i,l)=>{const m=s("v-select"),d=s("v-col"),C=s("v-text-field"),f=s("v-row"),w=s("v-sheet"),y=s("v-icon"),_=s("v-btn"),T=s("v-spacer"),V=s("v-data-table"),B=s("v-container");return F(),N(B,{fluid:""},{default:t(()=>[a(f,null,{default:t(()=>[a(d,{cols:"12"},{default:t(()=>[a(w,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[a(f,{justify:"start",align:"center"},{default:t(()=>[a(d,{cols:"12",sm:"4"},{default:t(()=>[a(m,{label:"Guruh","onUpdate:modelValue":l[0]||(l[0]=e=>x(e)),"hide-details":"",density:"compact",items:h.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["items"])]),_:1}),a(d,{cols:"12",sm:"4"},{default:t(()=>[a(C,{label:"Qidirish",modelValue:u.value,"onUpdate:modelValue":l[1]||(l[1]=e=>u.value=e),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),a(d,{cols:"12"},{default:t(()=>[a(w,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[o("div",q,[a(V,{headers:k,search:u.value,items:c.value},{"item.no":t(({index:e})=>[o("td",G,r(e+1)+".",1)]),"item.test.name":t(({item:e})=>[o("td",I,r(e.raw.test.name),1)]),"item.student.name":t(({item:e})=>{var n;return[o("td",O,r((n=e.raw.student)==null?void 0:n.name),1)]}),"item.group":t(({item:e})=>{var n;return[o("td",S,r((n=e.raw.group)==null?void 0:n.name),1)]}),"item.rate":t(({item:e})=>[o("td",j,r(e.raw.rate)+" / "+r(e.raw.questions),1)]),"item.percent":t(({item:e})=>[o("td",K,r(parseFloat(e.raw.rate*100/e.raw.questions).toFixed(1))+" % ",1)]),"item.remove":t(({item:e})=>[o("td",U,[a(_,{color:"primary",size:"30",variant:"flat",onClick:n=>z(e.raw._id)},{default:t(()=>[a(y,null,{default:t(()=>[b("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])]),"item.view":t(({item:e})=>[o("td",A,[a(_,{color:"primary",size:"30",to:`/secrettest/${e.raw._id}`},{default:t(()=>[a(y,null,{default:t(()=>[b("mdi-eye-arrow-right")]),_:1})]),_:2},1032,["to"])])]),"item.actions":t(({item:e})=>[o("td",D,[a(T),o("div",H,[a(_,{icon:"mdi-pencil",variant:"text",size:"40",color:"primary",onClick:n=>i.editItem(e.raw)},null,8,["onClick"]),a(_,{icon:"mdi-delete",variant:"text",size:"40",color:"primary",onClick:n=>i.deleteItem(e.raw)},null,8,["onClick"])])])]),"no-data":t(()=>[Q]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{J as default};