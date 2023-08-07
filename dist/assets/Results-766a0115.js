import{u as K,r,m as O,a as o,o as P,c as Y,w as e,h as b,b as t,f as _,d,t as m,n as $}from"./index-439559a6.js";const A={class:"responsive-datatable"},D={"data-label":"Test nomi"},E={"data-label":"Talaba"},H={"data-label":"Guruhi"},M={"data-label":"Bahosi"},Q={"data-label":"Foizi"},I={"data-label":"Ko'rish"},J=d("div",null,"Hech narsa topilmadi",-1),Z={__name:"Results",setup(W){K();const U=[{key:"group.name",order:"asc"}],B=[{title:"Test Nomi",key:"test.name"},{title:"Talaba",key:"student.name"},{title:"Guruhi",key:"group"},{title:"Bahosi",key:"rate"},{title:"Foizi",key:"percent"},{title:"Ko'rish",key:"view"}],p=r(""),u=r(!1),y=r([]),w=r([]),g=r([]),n=r({group:null,test:null}),k=r(!1),C=async()=>{const i=await Promise.all([b.get("/test/result"),b.get("/all/names")]);w.value=i[1].data.tests,g.value=i[1].data.groups,y.value=i[0].data};async function z(){for(const l in n.value)(n.value[l]===null||n.value[l]==="")&&delete n.value[l];const i=new URLSearchParams(n.value).toString();k.value=!0,await b({method:"get",url:"/test/download?"+i,responseType:"blob",headers:{"Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}}).then(l=>{const v=window.URL.createObjectURL(new Blob([l.data])),s=document.createElement("a");s.href=v,s.setAttribute("download","result.xlsx"),document.body.appendChild(s),s.click()}),k.value=!1}const F=()=>{u.value=!1,$(()=>{Object.assign(n.value,{group:null,test:null})})};return O(u,i=>i||F()),C(),(i,l)=>{const v=o("v-text-field"),s=o("v-col"),f=o("v-btn"),h=o("v-row"),x=o("v-sheet"),N=o("v-icon"),R=o("v-data-table"),S=o("v-card-title"),V=o("v-select"),j=o("v-form"),T=o("v-container"),q=o("v-card-text"),G=o("v-card"),L=o("v-dialog");return P(),Y(T,{fluid:""},{default:e(()=>[t(h,null,{default:e(()=>[t(s,{cols:"12"},{default:e(()=>[t(x,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:e(()=>[t(h,{justify:"space-between",align:"center"},{default:e(()=>[t(s,{class:"py-1",cols:"12",sm:"4"},{default:e(()=>[t(v,{label:"Qidirish",modelValue:p.value,"onUpdate:modelValue":l[0]||(l[0]=a=>p.value=a),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),t(s,{class:"py-1",cols:"12",sm:"4"},{default:e(()=>[t(f,{block:"",color:"primary",height:"42",onClick:l[1]||(l[1]=a=>u.value=!0),variant:"flat"},{default:e(()=>[_("Yuklab olish")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(s,{cols:"12"},{default:e(()=>[t(x,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[d("div",A,[t(R,{"items-per-page-text":"",headers:B,search:p.value,items:y.value,"group-by":U},{"item.test.name":e(({item:a})=>[d("td",D,m(a.raw.test.name),1)]),"item.student.name":e(({item:a})=>{var c;return[d("td",E,m((c=a.raw.student)==null?void 0:c.name),1)]}),"item.group":e(({item:a})=>{var c;return[d("td",H,m((c=a.raw.group)==null?void 0:c.name),1)]}),"item.rate":e(({item:a})=>[d("td",M,m(a.raw.rate),1)]),"item.percent":e(({item:a})=>[d("td",Q,m(parseFloat(a.raw.rate*100/a.raw.questions).toFixed(1))+" % ",1)]),"item.view":e(({item:a})=>[d("td",I,[t(f,{variant:"flat",size:"30",color:"primary",to:`/test/${a.raw._id}`},{default:e(()=>[t(N,null,{default:e(()=>[_("mdi-eye-arrow-right")]),_:1})]),_:2},1032,["to"])])]),"no-data":e(()=>[J]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),t(L,{modelValue:u.value,"onUpdate:modelValue":l[4]||(l[4]=a=>u.value=a),"max-width":"550px"},{default:e(()=>[t(G,null,{default:e(()=>[t(q,{class:"px-2 pt-0"},{default:e(()=>[t(T,null,{default:e(()=>[t(j,{ref:"form"},{default:e(()=>[t(h,null,{default:e(()=>[t(S,null,{default:e(()=>[_("Ma'lumotlarni yuklab olish")]),_:1}),t(s,{cols:"12"},{default:e(()=>[t(V,{modelValue:n.value.test,"onUpdate:modelValue":l[2]||(l[2]=a=>n.value.test=a),items:w.value,label:"Test bo'yicha",clearable:"","clear-icon":"mdi-close","hide-details":"","item-title":"name",color:"primary","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),t(s,{cols:"12"},{default:e(()=>[t(V,{modelValue:n.value.group,"onUpdate:modelValue":l[3]||(l[3]=a=>n.value.group=a),clearable:"","clear-icon":"mdi-close",label:"Guruh bo'yicha",items:g.value,"hide-details":"","item-title":"name",color:"primary","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),t(s,{cols:"12"},{default:e(()=>[t(f,{variant:"flat",color:"primary",block:"",onClick:z,height:"45"},{default:e(()=>[_(" Yuklab olish ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{Z as default};