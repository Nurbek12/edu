import{u as ue,r as v,l as pe,m as me,a as l,o as r,i as f,b as t,w as e,F as h,h as j,j as C,d as I,t as d,e as ve,f as s,n as fe,c as V,k as B}from"./index-439559a6.js";import{_ as he}from"./FooterPage-0a1b0f32.js";const we=I("div",{class:"d-flex justify-center"},"FAN TOPSHIRIQLARI",-1),ke=["href"],ye=["href"],be={class:"text-h5"},De={__name:"Homeworks",setup(xe){const F=ue(),k=v(!1),u=v([]),w=v(-1),y=v(null),b=v({description:""}),O=v(null),T=v([]),P={description:""},Q=pe(()=>y.value?"Vazifani O'zgartirish":"Vazifa Yaratish"),J=[o=>!!o||"Required"],N=async o=>{const{data:n}=await j.get(`/homework?${o||""}`);u.value=n};me(k,o=>o||S());const K=o=>{var n;w.value=u.value.indexOf(o),y.value=o.student_homeworks?o.student_homeworks._id:null,b.value=Object.assign({},{description:((n=o.student_homeworks)==null?void 0:n.description)||""}),k.value=!0},M=async()=>{const{valid:o}=await O.value.validate();o&&W()},W=async()=>{var n;const o=new FormData;if(o.append("homework",u.value[w.value]._id),o.append("subject",u.value[w.value].subject),o.append("description",b.value.description),o.append("date",new Date().toLocaleString()),o.append("student",F.getters.userid),o.append("group",(n=F.getters.user)==null?void 0:n.group),T.value.map(c=>o.append("files",c)),y.value){const{data:c}=await j.put(`/homework/edit/${y.value}`,o);Object.assign(u.value[w.value],{student_homeworks:c})}else{const{data:c}=await j.post("/homework",o);Object.assign(u.value[w.value],{student_homeworks:c})}S()},S=()=>{k.value=!1,fe(()=>{var o;b.value=Object.assign({},P),y.value=null,w.value=-1,(o=O.value)==null||o.reset()})},X=async(o,n,c,_)=>{if(!confirm("Bu faylni o'chirmoqchimisiz?"))return;const{data:m}=await j.put(`/homework/removefile/${o}`,{file:_});m&&u.value[n].student_homeworks.files.splice(c,1)};return N(),(o,n)=>{const c=l("v-sheet"),_=l("v-col"),m=l("v-icon"),$=l("v-chip"),Z=l("v-expansion-panel-title"),p=l("v-card-text"),Y=l("v-list-subheader"),H=l("v-list-item-title"),x=l("v-btn"),L=l("v-list-item"),R=l("v-list"),U=l("v-divider"),ee=l("v-spacer"),te=l("v-card-actions"),A=l("v-card"),ae=l("v-expansion-panel-text"),oe=l("v-expansion-panel"),le=l("v-expansion-panels"),q=l("v-row"),se=l("v-timeline-item"),ne=l("v-timeline"),E=l("v-container"),de=l("v-card-title"),re=l("v-file-input"),ie=l("v-textarea"),ce=l("v-form"),_e=l("v-dialog");return r(),f(h,null,[t(E,{fluid:""},{default:e(()=>[t(q,null,{default:e(()=>[t(_,{cols:"12"},{default:e(()=>[t(c,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:e(()=>[we]),_:1})]),_:1}),t(_,{cols:"12"},{default:e(()=>[t(ne,{density:"compact",side:"end"},{default:e(()=>[(r(!0),f(h,null,C(u.value,(a,D)=>(r(),V(se,{key:a._id,width:"100%","dot-color":a.student_homeworks?"primary":"red",size:"small"},{default:e(()=>[t(q,null,{default:e(()=>[t(_,{cols:"12",class:"py-1"},{default:e(()=>[t($,{label:"",variant:"elevated",color:new Date<new Date(a.date)?"primary":"red",class:"mb-2 mr-1",size:"large"},{default:e(()=>[t(m,{class:"mr-2",size:"small"},{default:e(()=>[s("mdi-clock-outline")]),_:1}),s(d(a.date),1)]),_:2},1032,["color"]),t($,{label:"",variant:"elevated",color:"primary",class:"mb-2 mr-1",size:"large"},{default:e(()=>{var g;return[t(m,{class:"mr-2",size:"small"},{default:e(()=>[s("mdi-star-outline")]),_:1}),s(d(((g=a.student_homeworks)==null?void 0:g.rate)||0)+" / 5 ",1)]}),_:2},1024)]),_:2},1024),t(_,{cols:"12",class:"py-1"},{default:e(()=>[t(le,{variant:"accordion"},{default:e(()=>[t(oe,null,{default:e(()=>[t(Z,null,{default:e(()=>[s(d(a.subject)+": "+d(a.name),1)]),_:2},1024),t(ae,{class:"resources"},{default:e(()=>[t(A,{color:"transparent",elevation:"0"},{default:e(()=>{var g;return[t(p,{class:"pb-0"},{default:e(()=>[s(" Topshiriq izohi: "+d(a.description),1)]),_:2},1024),t(p,{class:"pb-0"},{default:e(()=>[s(" Topshiriq muddati: "+d(a.date),1)]),_:2},1024),t(p,{class:"py-0"},{default:e(()=>[t(R,{density:"compact"},{default:e(()=>[t(Y,null,{default:e(()=>[s("Topshiriq fayllari")]),_:1}),(r(!0),f(h,null,C(a.files,(i,z)=>(r(),V(L,{key:i,class:"px-0"},{append:e(()=>[I("a",{href:`/files/${i}`,target:"_blank",download:"true"},[t(x,{color:"primary",size:"30",variant:"flat",class:"ml-3"},{default:e(()=>[t(m,null,{default:e(()=>[s("mdi-download")]),_:1})]),_:1})],8,ke)]),default:e(()=>[t(H,{class:"text-body-2"},{default:e(()=>[s(d(z+1)+". "+d(i),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024),a.student_homeworks?(r(),f(h,{key:0},[t(U),t(p,{class:"pb-0"},{default:e(()=>[s(" Vazifa izohi: "+d(a.student_homeworks.description),1)]),_:2},1024),t(p,{class:"py-0"},{default:e(()=>[t(R,{density:"compact"},{default:e(()=>[t(Y,null,{default:e(()=>[s("Yuborilgan fayllar")]),_:1}),(r(!0),f(h,null,C(a.student_homeworks.files,(i,z)=>(r(),V(L,{key:i,class:"px-0"},{append:e(()=>{var G;return[I("a",{href:`/files/${i}`,target:"_blank",download:"true"},[t(x,{color:"primary",size:"30",variant:"flat",class:"ml-3"},{default:e(()=>[t(m,null,{default:e(()=>[s("mdi-download")]),_:1})]),_:1})],8,ye),new Date<new Date(a.date)?(r(),V(x,{key:0,color:"primary",disabled:!!((G=a.student_homeworks)!=null&&G.rate_description),size:"30",onClick:ge=>X(a.student_homeworks._id,D,z,i),variant:"flat",class:"ml-1"},{default:e(()=>[t(m,null,{default:e(()=>[s("mdi-delete")]),_:1})]),_:2},1032,["disabled","onClick"])):B("",!0)]}),default:e(()=>[t(H,{class:"text-body-2"},{default:e(()=>[s(d(z+1)+". "+d(i),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)],64)):B("",!0),(g=a.student_homeworks)!=null&&g.rate_description?(r(),f(h,{key:1},[t(U),t(p,{class:"pb-0"},{default:e(()=>[s(" Baholandi: "+d(a.student_homeworks.rate)+" / 5 ",1)]),_:2},1024),t(p,{class:"py-1 pb-0"},{default:e(()=>[s(" Baho izohi: "+d(a.student_homeworks.rate_description),1)]),_:2},1024)],64)):B("",!0),t(te,null,{default:e(()=>{var i;return[t(ee),t(x,{height:"35",color:"primary",variant:"flat",onClick:z=>K(a),disabled:!!((i=a.student_homeworks)!=null&&i.rate_description)||new Date>new Date(a.date)},{default:e(()=>[s(d(a.student_homeworks?"O'zgartirish":"Yuborish"),1)]),_:2},1032,["onClick","disabled"])]}),_:2},1024)]}),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["dot-color"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),t(_e,{modelValue:k.value,"onUpdate:modelValue":n[2]||(n[2]=a=>k.value=a),"max-width":"550px"},{default:e(()=>[t(A,null,{default:e(()=>[t(de,{class:"mt-2 ml-2 mb-0"},{default:e(()=>[I("span",be,d(ve(Q)),1)]),_:1}),t(p,{class:"px-2 pt-0"},{default:e(()=>[t(E,null,{default:e(()=>[t(ce,{ref_key:"form",ref:O},{default:e(()=>[t(q,null,{default:e(()=>[t(_,{cols:"12"},{default:e(()=>[t(re,{"hide-details":"",variant:"outlined",color:"primary",modelValue:T.value,"onUpdate:modelValue":n[0]||(n[0]=a=>T.value=a),"prepend-icon":null,label:"Fayllar qo'shish",multiple:"","show-size":!0},{selection:e(({fileNames:a})=>[(r(!0),f(h,null,C(a,D=>(r(),V($,{key:D,size:"small",label:"",color:"primary",class:"me-2"},{default:e(()=>[s(d(D),1)]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1}),t(_,{cols:"12"},{default:e(()=>[t(ie,{modelValue:b.value.description,"onUpdate:modelValue":n[1]||(n[1]=a=>b.value.description=a),label:"Topshiriq izohi","hide-details":"",color:"primary",rules:J,variant:"outlined"},null,8,["modelValue"])]),_:1}),t(_,{cols:"12",class:"pt-0"},{default:e(()=>[t(x,{variant:"flat",color:"primary",block:"",onClick:M,height:"45"},{default:e(()=>[s(" Yuborish ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(he,{onGetDate:N})],64)}}};export{De as default};
