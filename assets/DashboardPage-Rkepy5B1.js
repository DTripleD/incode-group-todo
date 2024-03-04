import{u as x,j as e,l as y,_ as l,r as c,d as u,L as p,m as C,n as S,o as B,p as w}from"./index-cDeT7CwB.js";import{d as k,C as j,X as m,n as i,e as f,S as v,T as D,f as L}from"./selectors-mdf_qFxZ.js";const E=({setCreating:t})=>{const r=x(),n=s=>{s.preventDefault(),r(y(s.target.input.value)).then(()=>{t(!1),s.target.reset()}).then(()=>l.success("Dashboard create succesfully"))};return e.jsxs(k,{onSubmit:n,children:[e.jsx("input",{placeholder:"Name of board",name:"input"}),e.jsx("button",{type:"submit",children:e.jsx(j,{})}),e.jsx("button",{type:"button",onClick:()=>t(s=>!s),children:e.jsx(m,{})})]})},_=i.li`
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;

  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,I=i.input`
  text-align: center;

  border: 1px solid #c6c6c6;
  border-radius: 8px;

  outline: none;
`,T=i.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`,N=({board:t})=>{const[r,n]=c.useState(!1),[s,d]=c.useState(t.title),o=x(),h=u(f),g=a=>{a.preventDefault(),o(B({dashboardId:t._id,newTitle:a.target.elements.input.value})).then(()=>{n(b=>!b),l.success("Board rename sucesfully")})};return e.jsx(_,{children:r?e.jsxs(T,{onSubmit:g,children:[e.jsx(I,{name:"input",value:s,onChange:a=>d(a.target.value)}),h?e.jsx(p,{}):e.jsx("button",{type:"submit",children:e.jsx(j,{})}),h?e.jsx(p,{}):e.jsx("button",{type:"button",onClick:()=>n(a=>!a),children:e.jsx(m,{})})]}):e.jsxs(e.Fragment,{children:[e.jsx(C,{to:t._id,children:e.jsx("p",{children:t.title})}),e.jsx("button",{onClick:()=>n(a=>!a),children:e.jsx(v,{})}),e.jsx("button",{onClick:()=>o(S(t._id)).then(()=>l.success("Dasbord deleted succesfully")),children:e.jsx(D,{})})]})})},F=i.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`,q=i.div`
  width: 200px;
  height: 200px;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
`,P=i.button`
  width: 100%;
  height: 100%;
`,W=()=>{const[t,r]=c.useState(!1),n=u(L),s=u(f),d=x();return c.useEffect(()=>{d(w())},[d]),s?e.jsx(p,{}):e.jsxs("div",{children:[e.jsx(F,{children:n.map(o=>e.jsx(N,{board:o},o._id))}),e.jsx(q,{children:t?e.jsx(E,{setCreating:r}):e.jsx(P,{onClick:()=>r(!0),children:"Create new board"})})]})};export{W as default};
