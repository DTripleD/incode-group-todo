import{u as l,j as t,l as f,r as d,d as x,L as p,m as b,n as C,o as S,p as y}from"./index-BZIKyahN.js";import{d as w,C as h,X as j,n as r,e as B,S as k,T as v,f as D}from"./selectors-DWyaYCK2.js";const E=({setCreating:e})=>{const i=l(),a=s=>{s.preventDefault(),i(f(s.target.input.value)).then(()=>{e(!1),s.target.reset()})};return t.jsxs(w,{onSubmit:a,children:[t.jsx("input",{placeholder:"Name of board",name:"input"}),t.jsx("button",{type:"submit",children:t.jsx(h,{})}),t.jsx("button",{type:"button",onClick:()=>e(s=>!s),children:t.jsx(j,{})})]})},L=r.li`
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;

  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,I=r.input`
  text-align: center;

  border: 1px solid #c6c6c6;
  border-radius: 8px;

  outline: none;
`,T=r.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`,N=({board:e})=>{const[i,a]=d.useState(!1),[s,o]=d.useState(e.title),c=l(),u=x(B),m=n=>{n.preventDefault(),c(S({dashboardId:e._id,newTitle:n.target.elements.input.value})).then(()=>a(g=>!g))};return t.jsx(L,{children:i?t.jsxs(T,{onSubmit:m,children:[t.jsx(I,{name:"input",value:s,onChange:n=>o(n.target.value)}),u?t.jsx(p,{}):t.jsx("button",{type:"submit",children:t.jsx(h,{})}),u?t.jsx(p,{}):t.jsx("button",{type:"button",onClick:()=>a(n=>!n),children:t.jsx(j,{})})]}):t.jsxs(t.Fragment,{children:[t.jsx(b,{to:e._id,children:t.jsx("p",{children:e.title})}),t.jsx("button",{onClick:()=>a(n=>!n),children:t.jsx(k,{})}),t.jsx("button",{onClick:()=>c(C(e._id)),children:t.jsx(v,{})})]})})},_=r.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`,F=r.div`
  width: 200px;
  height: 200px;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
`,q=r.button`
  width: 100%;
  height: 100%;
`,U=()=>{const[e,i]=d.useState(!1),a=x(D),s=l();return d.useEffect(()=>{s(y())},[s]),t.jsxs("div",{children:[t.jsx(_,{children:a.map(o=>t.jsx(N,{board:o},o._id))}),t.jsx(F,{children:e?t.jsx(E,{setCreating:i}):t.jsx(q,{onClick:()=>i(!0),children:"Create new board"})})]})};export{U as default};
