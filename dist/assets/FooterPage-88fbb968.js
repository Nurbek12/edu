import{u as d,r as g,a as l,o as w,c as y,w as c,b as i,e as D,p as h,f as S,t as I}from"./index-868e85fe.js";const x={__name:"FooterPage",setup(b){var _;const m=d(),p=parseInt(((_=m.getters.user)==null?void 0:_.start_year)|0),u=g(0);function v(n,e){e=parseInt(e),n=parseInt(n);const o=n+Math.floor(e/2),a=e%2===0?5:10;let t,s;return a>=9||a<=2?(t=new Date(o,8,1),s=new Date(o+1,1,28)):(t=new Date(o,2,1),s=new Date(o,7,31)),new URLSearchParams({gte:t.toISOString(),lte:s.toISOString()})}return(n=>{const e=new Date,o=e.getFullYear(),a=e.getMonth();let t=(o-n)*2;return a>=8||a<=0?t+=1:t+=2,u.value=t,t})(p),(n,e)=>{const o=l("v-btn"),a=l("v-pagination"),t=l("v-sheet"),s=l("v-footer");return w(),y(s,{app:"",elevation:"1",color:"background"},{default:c(()=>[i(t,{color:"transparent",width:"100%",rounded:""},{default:c(()=>[i(a,{density:"comfortable",elevation:"1",length:4,modelValue:u.value,"onUpdate:modelValue":[e[0]||(e[0]=r=>u.value=r),e[1]||(e[1]=r=>n.$emit("getDate",v(D(p),r)))],"active-color":"primary"},{item:c(({props:r,page:f})=>[i(o,h({size:"35"},r,{flat:"",elevation:"1"}),{default:c(()=>[S(I(f),1)]),_:2},1040)]),_:1},8,["modelValue"])]),_:1})]),_:1})}}};export{x as _};
