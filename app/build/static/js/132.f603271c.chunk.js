"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[132],{8132:function(n,e,r){r.r(e);var t,o,a,i,s,c,d,l,p,u,f,x=r(4165),h=r(5861),g=r(9439),Z=r(168),m=r(2791),v=r(6487),w=r(3855),b=r(6157),j=r(9126),y=r(6099),C=r(9214),k=r(6413),P=r(1360),S=r(1830),U=r.n(S),z=r(7689),V=r(184),Y=v.ZP.div(t||(t=(0,Z.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: auto;\n  overflow: hidden;\n  height: 100%;\n"]))),F=v.ZP.div(o||(o=(0,Z.Z)(["\n  display: flex;\n  flex-direction: row;\n  width: 960px;\n  height: 600px;\n  border-radius: 10px;\n  margin-top: 150px;\n  background-color: #f7f7f7;\n"]))),R=v.ZP.div(a||(a=(0,Z.Z)(["\n  flex: 2;\n  border-radius: 10px 0px 0px 10px;\n  background-color: #ff3f6c; /* Updated to primaryColor */\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-size: medium;\n"]))),D=v.ZP.div(i||(i=(0,Z.Z)(["\n  flex: 3;\n  border-radius: 0px 10px 10px 0px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 30px;\n"]))),E=(0,v.ZP)(w.Z)(s||(s=(0,Z.Z)(["\n  padding: 30px;\n"]))),L=(0,v.ZP)(w.Z.Control)(c||(c=(0,Z.Z)(["\n  margin-top: 20px;\n  background-color: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  transition: border-color 0.3s;\n  &:focus {\n    border-color: #ff3f6c; /* Updated to primaryColor on focus */\n    box-shadow: 0 0 0 0.2rem rgba(255, 63, 108, 0.25); /* Updated to primaryColor shadow on focus */\n  }\n"]))),A=(0,v.ZP)(b.Z)(d||(d=(0,Z.Z)(["\n  background-color: #ff3f6c; /* Updated to primaryColor */\n  border: none;\n  margin-top: 20px;\n  width: 100px;\n  height: 40px;\n\n  &:hover {\n    background-color: #ff2e5a; /* Slightly darker shade for hover effect */\n  }\n"]))),G=v.ZP.p(l||(l=(0,Z.Z)(["\n  margin-top: 20px;\n  text-align: left;\n  font-weight: 500;\n  color: #555;\n  & > span {\n    color: #ff3f6c; /* Updated to primaryColor */\n    cursor: pointer;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"]))),M=v.ZP.div(p||(p=(0,Z.Z)(["\n  width: 100%;\n  position: relative;\n  "," {\n    padding-right: 80px;\n  }\n"])),L),N=v.ZP.span(u||(u=(0,Z.Z)(["\n  color: #ff0a33;\n  position: absolute;\n  right: 10px;\n  top: 50%; /* Vertically center the link */\n  transform: translateY(-50%);\n  cursor: pointer;\n"]))),O=v.ZP.p(f||(f=(0,Z.Z)(["\n  color: #0ca9f1;\n"])));e.default=function(){var n=(0,m.useState)(""),e=(0,g.Z)(n,2),r=e[0],t=e[1],o=(0,m.useState)(""),a=(0,g.Z)(o,2),i=a[0],s=a[1],c=(0,m.useState)(!1),d=(0,g.Z)(c,2),l=d[0],p=(d[1],(0,m.useState)(!1)),u=(0,g.Z)(p,2),f=u[0],Z=u[1],v=(0,m.useState)(!1),w=(0,g.Z)(v,2),b=w[0],S=w[1],Q=(0,m.useState)(!1),T=(0,g.Z)(Q,2),W=T[0],q=T[1],B=(0,m.useState)(""),H=(0,g.Z)(B,2),I=H[0],J=H[1],K=function(){var n=(0,h.Z)((0,x.Z)().mark((function n(){var e;return(0,x.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Z(!0),n.prev=1,n.next=4,k.g8.post("/user/send-otp",{email:r});case 4:e=n.sent,console.log(e),S(e.data),200===e.status&&q(!0),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(1),console.log(n.t0),S(n.t0.response.data.error);case 14:Z(!1);case 15:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(){return n.apply(this,arguments)}}(),X=function(){var n=(0,h.Z)((0,x.Z)().mark((function n(e){var t;return(0,x.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),n.prev=1,n.next=4,k.g8.post("/user/reset-password",{email:r,password:i,verificationCode:I});case 4:return t=n.sent,n.next=7,U().fire({icon:"success",title:"Reset Successful",text:t.data.message});case 7:_(),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(1),console.log(n.t0),U().fire({icon:"success",title:"Reset Failed",text:n.t0.response.data.error});case 14:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(e){return n.apply(this,arguments)}}(),$=(0,z.s0)(),_=function(){$("/auth",{replace:!0})};return(0,V.jsxs)(Y,{children:[(0,V.jsx)(C.default,{}),(0,V.jsxs)(F,{children:[(0,V.jsxs)(R,{children:[(0,V.jsx)("h1",{children:"Forgot Password?"}),(0,V.jsx)(j.QyC,{fontSize:100})]}),(0,V.jsx)(D,{children:(0,V.jsxs)(E,{onSubmit:X,children:[(0,V.jsx)("h2",{style:{fontSize:"28px",fontWeight:"700",color:"#333"},children:"Forgot Your Password?"}),(0,V.jsxs)(M,{children:[(0,V.jsx)(L,{type:"text",placeholder:"Email",id:"email",name:"email",onChange:function(n){return t(n.target.value)}}),!W&&(0,V.jsx)(N,{onClick:K,isVerificationCodeSent:f,children:f?(0,V.jsx)(P.default,{size:15}):"Get OTP"})]}),(0,V.jsx)(O,{children:b}),W&&(0,V.jsx)(L,{type:"number",inputMode:"numeric",maxLength:"6",placeholder:"Enter Verification Code",title:"Verification Code",onChange:function(n){return J(n.target.value)}}),(0,V.jsx)(L,{type:"password",placeholder:"Password",hint:"At least 8 characters",onChange:function(n){return s(n.target.value)},id:"password",name:"password"}),(0,V.jsx)("div",{className:"d-flex justify-content-between",children:(0,V.jsx)(A,{variant:"dark",type:"submit",children:l?(0,V.jsx)(y.Z,{}):"Change"})}),(0,V.jsxs)(G,{children:["Did You Remember Your Password?"," ",(0,V.jsx)("span",{onClick:_,children:"Login"})]})]})})]})]})}}}]);
//# sourceMappingURL=132.f603271c.chunk.js.map