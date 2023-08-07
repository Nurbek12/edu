import{r as c,a as n,o as _,c as V,w as e,b as t,f as m,d as s,t as d,i as q,F as B,k as Z,j as Q,h as k,u as ce,l as me,m as pe,e as _e,n as ve}from"./index-439559a6.js";const fe={class:"responsive-datatable"},he={"data-label":"Ism familiyasi"},ye={"data-label":"Yuborilgan vaqti"},be={"data-label":"Baho"},we=["colspan"],ke={class:"text-body-2"},ge=s("br",null,null,-1),xe={class:"text-body-2"},Ve=["href"],$e={"data-label":"Guruhi"},ze=s("div",null,"Hech narsa topilmadi",-1),je={__name:"HomeWorkTable",props:{homeworkid:{type:String}},setup(A){const S=A,$=[{title:"Talaba",key:"name",align:"start",sortable:!1},{title:"Guruhi",key:"group",sortable:!1},{title:"Yuborilgan vaqti",key:"date"},{title:"Baho",key:"rate"}],C=c([]),j=c([]),U=c(""),f=async()=>{const{data:y}=await k.get(`/homework/id/${S.homeworkid}`);y&&(C.value=y.studentHomeworks||[])},O=async(y,p,g)=>{if(confirm(`Siz talaba ${p.student}ga ${y} baho qo'yyapsiz!`)){let r;do r=prompt("Bahoga qo'yilgan izohni yozing");while(!r.trim());const b={rate:y,rate_description:r};Object.assign(C.value[g],b),await k.put(`/homework/edit/${p._id}?student=true`,b)}};return f(),(y,p)=>{const g=n("v-spacer"),r=n("v-icon"),b=n("v-btn"),H=n("v-card-title"),i=n("v-select"),T=n("v-chip"),G=n("v-divider"),N=n("v-list-item-title"),Y=n("v-list-item"),D=n("v-list"),M=n("v-data-table"),E=n("v-card-text"),R=n("v-card");return _(),V(R,null,{default:e(()=>[t(H,{class:"text-h6 d-flex justify-space-between align-center"},{default:e(()=>[m(" Yuborilgan topshiriqlar "),t(g),t(b,{size:"30",color:"primary",onClick:p[0]||(p[0]=u=>y.$emit("closeView"))},{default:e(()=>[t(r,{size:"small"},{default:e(()=>[m("mdi-close")]),_:1})]),_:1})]),_:1}),t(E,{class:"px-2"},{default:e(()=>[s("div",fe,[t(M,{density:"compact","items-per-page-text":"","items-per-page":"-1",headers:$,search:U.value,items:C.value,"item-value":"_id","show-expand":"",expanded:j.value,"onUpdate:expanded":p[1]||(p[1]=u=>j.value=u)},{"item.name":e(({index:u,item:h})=>[s("td",he,d(u+1)+". "+d(h.raw.student),1)]),"item.date":e(({item:u})=>[s("td",ye,d(u.raw.date),1)]),"item.rate":e(({index:u,item:h})=>[s("td",be,[h.raw.rate?(_(),V(T,{key:1,label:"",color:"primary"},{default:e(()=>[m(d(h.raw.rate),1)]),_:2},1024)):(_(),V(i,{key:0,items:[0,1,2,3,4,5],"onUpdate:modelValue":z=>O(z,h.raw,u),"hide-details":"",density:"compact",flat:"",color:"primary",variant:"outlined"},null,8,["onUpdate:modelValue"]))])]),"expanded-row":e(({columns:u,item:h})=>[s("tr",null,[s("td",{colspan:u.length},[s("span",ke,"Vazifa izohi: "+d(h.raw.description),1),m(),ge,h.raw.rate_description?(_(),q(B,{key:0},[t(G),s("span",xe,"Baho izohi: "+d(h.raw.rate_description),1)],64)):Z("",!0),t(G),t(D,{density:"compact"},{default:e(()=>[(_(!0),q(B,null,Q(h.raw.files,(z,W)=>(_(),V(Y,{key:z,class:"px-0"},{append:e(()=>[s("a",{href:`/files/${z}`,target:"_blank",download:"true"},[t(b,{color:"primary",size:"30",variant:"flat",class:"ml-3"},{default:e(()=>[t(r,null,{default:e(()=>[m("mdi-download")]),_:1})]),_:1})],8,Ve)]),default:e(()=>[t(N,{class:"text-body-2"},{default:e(()=>[m(d(W+1)+". "+d(z),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)],8,we)])]),"item.group":e(({item:u})=>[s("td",$e,d(u.raw.group),1)]),"no-data":e(()=>[ze]),_:1},8,["search","items","expanded"])])]),_:1})]),_:1})}}},qe={class:"responsive-datatable"},Ce={"data-label":"T/r"},Ue={"data-label":"Topshiriq nomi"},Te={"data-label":"Fan nomi"},Ie={"data-label":"Guruhlar"},Fe={"data-label":"Muxlati"},Be={"data-label":"Izohi"},Oe={"data-label":"Boshqarish"},He={class:"d-flex justify-end"},Ge=s("div",null,"Hech narsa topilmadi",-1),Se={class:"text-h5"},Ne=s("thead",null,[s("tr",null,[s("th",{class:"text-left"},"Fayl Nomi"),s("th",{class:"text-left"})])],-1),Ye={class:"text-caption gray"},De=["href"],Re={__name:"HomeWorks",setup(A){const S=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Topshiriq nomi",key:"name"},{title:"Fani",key:"subject"},{title:"Guruhlar",key:"group"},{title:"Muhlati",key:"date"},{title:"Izohi",key:"description"},{title:"Boshqarish",key:"actions",sortable:!1}],$=[l=>!!l||"Required"],C=ce(),j=c(""),U=c(null),f=c([]),O=c([]),y=c([]),p=c(!1),g=c(!1),r=c(-1),b=c(-1),H=c(null),i=c({groups:[],teacher:"",name:"",description:"",subject:null,date:""}),T=c([]),G={groups:[],teacher:"",name:"",description:"",subject:null,date:""},N=me(()=>r.value===-1?"Topshiriq Yaratish":"Topshiriqni O'zgartirish");pe(p,l=>l||u());const Y=async()=>{const l=await Promise.all([k.get("/subject/access"),k.get("/group/access"),k.get("/homework")]);O.value=l[0].data,y.value=l[1].data,f.value=l[2].data,console.log(f.value)},D=async()=>{const{valid:l}=await U.value.validate();l&&h()},M=l=>{r.value=f.value.indexOf(l),b.value=l._id,i.value=Object.assign({},l),p.value=!0},E=l=>{r.value=f.value.indexOf(l),i.value=Object.assign({},l),b.value=l._id,confirm("Ushbu malumotni o'chirmoqchimisiz?")?R():u()},R=async()=>{const{data:l}=await k.delete(`/homework/${b.value}`);l&&(f.value.splice(r.value,1),u())},u=()=>{p.value=!1,ve(()=>{var l;i.value=Object.assign({},G),b.value=-1,r.value=-1,(l=U.value)==null||l.reset()})},h=async()=>{const l=new FormData;if(l.append("name",i.value.name),l.append("subject",i.value.subject),l.append("description",i.value.description),l.append("date",i.value.date),l.append("teacher",C.getters.userid),T.value.map(o=>l.append("files",o)),i.value.groups.map(o=>l.append("groups",o)),r.value>-1){const{data:o}=await k.put(`/homework/edit/${b.value}`,i.value);Object.assign(f.value[r.value],o)}else{const{data:o}=await k.post("/homework",l);f.value.push(o)}u()},z=async l=>{const o=new FormData;o.append("file",l.target.files[0]);const{data:I}=await k.put(`/resource/addfile/${i.value._id}`,o);f.value[r.value].files.push(I)},W=async(l,o)=>{confirm("Ushbu malumotni o'chirmoqchimisiz?")&&(await k.put(`/resource/rmfile/${i.value._id}/${l}`),f.value[r.value].files.splice(o,1))},ee=()=>document.getElementById("file-input").click();return Y(),(l,o)=>{const I=n("v-text-field"),v=n("v-col"),x=n("v-btn"),L=n("v-row"),J=n("v-sheet"),P=n("v-select"),te=n("v-spacer"),F=n("v-icon"),ae=n("v-data-table"),le=n("v-card-title"),oe=n("v-chip"),se=n("v-file-input"),ne=n("v-table"),ie=n("v-textarea"),de=n("v-form"),K=n("v-container"),re=n("v-card-text"),ue=n("v-card"),X=n("v-dialog");return _(),V(K,{fluid:""},{default:e(()=>[t(L,null,{default:e(()=>[t(v,{cols:"12"},{default:e(()=>[t(J,{elevation:"1",color:"surface",width:"100%",class:"pa-2 py-4",rounded:""},{default:e(()=>[t(L,{justify:"space-between",align:"center"},{default:e(()=>[t(v,{class:"py-1",cols:"12",sm:"4"},{default:e(()=>[t(I,{label:"Qidirish",modelValue:j.value,"onUpdate:modelValue":o[0]||(o[0]=a=>j.value=a),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),t(v,{class:"py-1",cols:"12",sm:"4",md:"3"},{default:e(()=>[t(x,{block:"",height:"42",color:"primary",onClick:o[1]||(o[1]=a=>p.value=!0),variant:"flat"},{default:e(()=>[m("Topshiriq yaratish")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(v,{cols:"12"},{default:e(()=>[t(J,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[s("div",qe,[t(ae,{"items-per-page-text":"",headers:S,search:j.value,items:f.value},{"item.no":e(({index:a})=>[s("td",Ce,d(a+1)+".",1)]),"item.name":e(({item:a})=>[s("td",Ue,d(a.raw.name),1)]),"item.subject":e(({item:a})=>[s("td",Te,d(a.raw.subject),1)]),"item.group":e(({item:a})=>[s("td",Ie,[t(P,{items:y.value,readonly:"",chips:"",multiple:"","item-value":"_id","item-title":"name",variant:"solo","hide-details":"",flat:"",modelValue:a.raw.groups,"onUpdate:modelValue":w=>a.raw.groups=w},null,8,["items","modelValue","onUpdate:modelValue"])])]),"item.date":e(({item:a})=>[s("td",Fe,d(a.raw.date),1)]),"item.description":e(({item:a})=>[s("td",Be,d(a.raw.description),1)]),"item.actions":e(({item:a})=>[s("td",Oe,[t(te),s("div",He,[t(x,{variant:"flat",class:"ml-1",size:"30",color:"primary",onClick:w=>M(a.raw)},{default:e(()=>[t(F,null,{default:e(()=>[m("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),t(x,{variant:"flat",class:"ml-1",size:"30",color:"primary",onClick:w=>E(a.raw)},{default:e(()=>[t(F,null,{default:e(()=>[m("mdi-delete")]),_:1})]),_:2},1032,["onClick"]),t(x,{variant:"flat",class:"ml-1",size:"30",color:"primary",onClick:w=>(g.value=!0,H.value=a.raw._id)},{default:e(()=>[t(F,null,{default:e(()=>[m("mdi-briefcase-eye")]),_:1})]),_:2},1032,["onClick"])])])]),"no-data":e(()=>[Ge]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),t(X,{modelValue:p.value,"onUpdate:modelValue":o[8]||(o[8]=a=>p.value=a),"max-width":"550px"},{default:e(()=>[t(ue,null,{default:e(()=>[t(le,{class:"mt-2 ml-2 mb-0"},{default:e(()=>[s("span",Se,d(_e(N)),1)]),_:1}),t(re,{class:"px-2 pt-0"},{default:e(()=>[t(K,null,{default:e(()=>[t(de,{ref_key:"form",ref:U},{default:e(()=>[t(L,null,{default:e(()=>[t(v,{cols:"12"},{default:e(()=>[t(I,{modelValue:i.value.name,"onUpdate:modelValue":o[2]||(o[2]=a=>i.value.name=a),label:"Topshiriq nomi","hide-details":"",color:"primary",rules:$,variant:"outlined"},null,8,["modelValue"])]),_:1}),t(v,{cols:"12"},{default:e(()=>[t(P,{modelValue:i.value.groups,"onUpdate:modelValue":o[3]||(o[3]=a=>i.value.groups=a),label:"Guruhlar",rules:$,"hide-details":"",multiple:"",items:y.value,color:"primary","item-title":"name","item-value":"_id",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),t(v,{cols:"12",sm:"6"},{default:e(()=>[t(P,{modelValue:i.value.subject,"onUpdate:modelValue":o[4]||(o[4]=a=>i.value.subject=a),label:"Fan nomi",rules:$,"hide-details":"",items:O.value,color:"primary","item-title":"name","item-value":"name",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),t(v,{cols:"12",sm:"6"},{default:e(()=>[t(I,{type:"date",modelValue:i.value.date,"onUpdate:modelValue":o[5]||(o[5]=a=>i.value.date=a),label:"Muhlati","hide-details":"",color:"primary",rules:$,variant:"outlined"},null,8,["modelValue"])]),_:1}),r.value===-1?(_(),V(v,{key:0,cols:"12"},{default:e(()=>[t(se,{"hide-details":"",variant:"outlined",color:"primary",modelValue:T.value,"onUpdate:modelValue":o[6]||(o[6]=a=>T.value=a),"prepend-icon":null,label:"Fayllar",multiple:"","show-size":!0},{selection:e(({fileNames:a})=>[(_(!0),q(B,null,Q(a,w=>(_(),V(oe,{key:w,size:"small",label:"",color:"primary",class:"me-2"},{default:e(()=>[m(d(w),1)]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1})):(_(),q(B,{key:1},[t(v,{cols:"12",class:"px-0 py-0"},{default:e(()=>[t(ne,{density:"compact"},{default:e(()=>[Ne,s("tbody",null,[(_(!0),q(B,null,Q(i.value.files,(a,w)=>(_(),q("tr",{key:a},[s("td",null,[s("span",Ye,d(w+1)+". "+d(a),1)]),s("td",null,[s("a",{href:`/files/${a}`,download:"",target:"_blank"},[t(x,{color:"primary",variant:"flat",size:"25",class:"mr-1"},{default:e(()=>[t(F,{size:"small"},{default:e(()=>[m("mdi-download")]),_:1})]),_:1})],8,De),t(x,{color:"primary",variant:"flat",size:"25",onClick:Me=>W(a,w)},{default:e(()=>[t(F,{size:"small"},{default:e(()=>[m("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])]))),128))])]),_:1})]),_:1}),t(v,{cols:"12"},{default:e(()=>[s("input",{type:"file",hidden:"",id:"file-input",onChange:z},null,32),t(x,{variant:"flat",onClick:ee,color:"primary",block:"",height:"45"},{default:e(()=>[m(" Fayl qo'shish ")]),_:1})]),_:1})],64)),t(v,{cols:"12"},{default:e(()=>[t(ie,{modelValue:i.value.description,"onUpdate:modelValue":o[7]||(o[7]=a=>i.value.description=a),label:"Topshiriq izohi","hide-details":"",color:"primary",rules:$,variant:"outlined"},null,8,["modelValue"])]),_:1}),t(v,{cols:"12",class:"pt-0"},{default:e(()=>[t(x,{variant:"flat",color:"primary",block:"",onClick:D,height:"45"},{default:e(()=>[m(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(X,{modelValue:g.value,"onUpdate:modelValue":o[10]||(o[10]=a=>g.value=a),persistent:""},{default:e(()=>[g.value?(_(),V(je,{key:0,onCloseView:o[9]||(o[9]=a=>g.value=!1),homeworkid:H.value},null,8,["homeworkid"])):Z("",!0)]),_:1},8,["modelValue"])]),_:1})}}};export{Re as default};