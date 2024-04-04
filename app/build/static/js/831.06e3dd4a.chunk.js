"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[831,214],{9214:function(n,e,t){t.r(e),t.d(e,{default:function(){return wn}});var r,o,i,c,s,a,l,d,u,f,x,p,h,g,m,Z,b,j,v,k,w,P,y,C,S,z=t(4165),F=t(5861),L=t(9439),N=t(168),U=t(2791),A=t(6487),B=(t(7632),t(2677)),E=t(9806),O=t(1632),T=t(184),q=A.zo.div(r||(r=(0,N.Z)(["\n  display: flex;\n  border: 1px solid black;\n  margin-right: 30px;\n  border: ",";\n  border-radius: 5px;\n  max-width: 300px;\n  width: 300px;\n  background-color: ",";\n"])),(function(n){return n.isFocused?"1px solid #9595a081":"none"}),(function(n){return n.isFocused?"#FFFFF":"#f5f5f6"})),H=A.zo.input(o||(o=(0,N.Z)(["\n  width: 100%;\n  padding: 15px;\n  border: none;\n  font-size: 14px;\n  font-family: inherit;\n  font-weight: 100;\n  height: 10px;\n  background-color: inherit;\n  &:focus {\n    outline: none;\n  }\n"]))),R=A.zo.button(i||(i=(0,N.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: none;\n  background-color: inherit;\n  width: 30px;\n"]))),D=(0,A.zo)(E.G)(c||(c=(0,N.Z)(["\n  height: 15px;\n  width: 15px;\n  color: #717288;\n  text-align: center;\n  margin-left: 10px;\n"]))),I=function(){var n=(0,U.useState)(!1),e=(0,L.Z)(n,2),t=e[0],r=e[1],o=(0,U.useState)(""),i=(0,L.Z)(o,2),c=i[0],s=i[1];return(0,T.jsxs)(q,{className:"d-md-flex",isFocused:t,children:[(0,T.jsx)(R,{onClick:function(){var n="/allProducts?search=".concat(c);window.location.href=n},children:(0,T.jsx)(D,{icon:O.wn1})}),(0,T.jsx)(H,{placeholder:"Search for product",onFocus:function(){r(!0)},onBlur:function(){r(!1)},value:c,onChange:function(n){s(n.target.value)}})]})},J=t(3479),M=t(3524),X=t(9434),_=t(1087),G=t(7689),$=t(3853),K=t(1830),Q=t.n(K),V=t(9770),W=t(2552),Y=A.ZP.div(s||(s=(0,N.Z)(["\n  position: fixed;\n  height: 100vh;\n  z-index: 99;\n  display: flex;\n  flex-direction: column;\n  top: 0;\n  left: ",";\n  transform: ",";\n  width: 250px;\n  background-color: #ffffff;\n  transition: transform 0.3s ease-in-out;\n  padding: 0.9rem 2rem;\n  overflow-y: auto; /* Enable vertical scrolling */\n  font-family: ui-serif;\n  border-right: 1px solid #ff3e6c;\n"])),(function(n){return n.open?"0":"-100%"}),(function(n){return n.open?"translateX(0)":"translateX(-100%)"})),nn=A.ZP.h3(a||(a=(0,N.Z)(["\n  font-size: 18px; /* Updated font size for headings */\n  color: #ff3e6c;\n  font-weight: bold;\n  margin-bottom: 10px;\n  margin-left: 15px;\n  margin-top: 15px;\n  line-height: 1.3; /* Adjusted line height */\n"]))),en=(0,A.ZP)(_.rU)(l||(l=(0,N.Z)(["\n  font-size: 16px;\n  text-decoration: none;\n  color: #000000;\n  font-weight: 500;\n  margin-bottom: 8px; /* Reduced margin for items */\n  padding: 8px 0; /* Added padding for better spacing */\n  &:hover {\n    background-color: #f2f2f2;\n    border-radius: 5px;\n  }\n"]))),tn=A.ZP.span(d||(d=(0,N.Z)(["\n  font-size: 16px;\n  text-decoration: none;\n  color: #000000;\n  font-weight: 500;\n  margin-bottom: 8px; /* Reduced margin for items */\n  padding: 8px 0; /* Added padding for better spacing */\n  &:hover {\n    background-color: #f2f2f2;\n    border-radius: 5px;\n  }\n"]))),rn=A.ZP.button(u||(u=(0,N.Z)(["\n  font-weight: 700;\n  cursor: pointer;\n  background-color: ",";\n  border: 1px solid #ff3e6c;\n  color: ",";\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 5px;\n  outline: none;\n  padding: 5px;\n  margin-top: auto;\n  &:hover {\n    border: 1px solid #ff3e6c;\n    background-color: #ff3e6c;\n    color: white;\n  }\n"])),(function(n){return n.primary?"#ff3e6c":"white"}),(function(n){return n.primary?"#fff":"#ff3e6c"})),on=(0,A.ZP)($.xqh)(f||(f=(0,N.Z)(["\n  width: 30px;\n  height: 30px;\n  font-weight: 800;\n  margin-right: 10px;\n"]))),cn=A.ZP.span(x||(x=(0,N.Z)(["\n  font-weight: 700;\n"]))),sn=function(n){var e=n.showSidebar,t=(0,X.v9)((function(n){var e,t;return null===n||void 0===n||null===(e=n.user)||void 0===e||null===(t=e.currentUser)||void 0===t?void 0:t._id})),r=(0,G.s0)(),o=(0,X.I0)(),i=function(){var n=(0,F.Z)((0,z.Z)().mark((function n(){return(0,z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t){n.next=6;break}return o((0,V.kS)()),o((0,W.N6)()),localStorage.clear(),n.next=6,Q().fire({icon:"success",title:"Success",text:"Logout Successful"});case 6:r("/auth");case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),c=function(){var n=(0,F.Z)((0,z.Z)().mark((function n(e){return(0,z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=5;break}return n.next=3,Q().fire({icon:"question",title:"Do you want to Login?",text:"Please Login First to Continue!!",iconColor:"#ff3f6c",confirmButtonColor:"#ff3f6c",cancelButtonColor:"black",showCancelButton:!0,confirmButtonText:"Login"}).then((function(n){n.isConfirmed&&r("/auth")}));case 3:n.next=6;break;case 5:r(e);case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,T.jsxs)(Y,{className:"p-0",open:e,children:[(0,T.jsx)("h3",{style:{color:"#FF3E6C",fontSize:"40px"},className:" m-0 \r px-4 py-3",children:"MarketHub"}),(0,T.jsx)("hr",{style:{color:"#FF3E6C",marginTop:"5px"}}),(0,T.jsx)(nn,{children:"Pages"}),(0,T.jsxs)("div",{className:"px-5 text-left d-flex flex-column",children:[(0,T.jsx)(en,{to:"/",children:"Home"}),(0,T.jsx)(en,{to:"/allProducts",children:"Products"}),(0,T.jsx)(tn,{onClick:function(){c("/cart")},children:"Cart"}),(0,T.jsx)(tn,{onClick:function(){c("/user/"+t)},children:"User Profile"}),(0,T.jsx)(tn,{onClick:function(){c("/orders/"+t)},children:"Orders"})]}),(0,T.jsx)(nn,{children:"Categories"}),(0,T.jsxs)("div",{className:"px-5 text-left d-flex flex-column",children:[(0,T.jsx)(en,{to:"/allProducts?Categories=TShirt",children:"T-Shirt"}),(0,T.jsx)(en,{to:"/allProducts?Categories=Shirt",children:"Shirt"}),(0,T.jsx)(en,{to:"/allProducts?Categories=Pants",children:"Pants"}),(0,T.jsx)(en,{to:"/allProducts?Categories=Shoes",children:"Shoes"}),(0,T.jsx)(en,{to:"/allProducts?Categories=Jeans",children:"Jeans"}),(0,T.jsx)(en,{to:"/allProducts?Categories=Skirt",children:"Skirt"})]}),(0,T.jsxs)(rn,{onClick:i,children:[(0,T.jsx)(on,{}),(0,T.jsx)(cn,{children:t?"Logout":"Login"})]})]})},an=t(7425),ln=A.ZP.header(p||(p=(0,N.Z)(["\n  width: 100%;\n  border-bottom: 1px solid #ff3e6c;\n"]))),dn=A.ZP.div(h||(h=(0,N.Z)([""]))),un=(0,A.ZP)(B.Z)(g||(g=(0,N.Z)(["\n  display: flex;\n  background-color: white;\n  justify-content: space-between;\n  padding: 5px;\n"]))),fn=A.ZP.div(m||(m=(0,N.Z)(["\n  flex: 1;\n  display: flex;\n  font-size: 25px;\n  align-items: center;\n  margin: 0px 20px;\n"]))),xn=A.ZP.div(Z||(Z=(0,N.Z)(["\n  flex: 1;\n  display: flex;\n  font-size: 25px;\n  align-items: center;\n  margin: 0px 20px;\n  text-align: center;\n  justify-content: space-between;\n"]))),pn=A.ZP.div(b||(b=(0,N.Z)(["\n  flex: 1;\n  text-align: center;\n"]))),hn=A.ZP.span(j||(j=(0,N.Z)(['\n  font-family: "Akronim", cursive;\n  font-size: 30px;\n  letter-spacing: 5px;\n  color: #ff3e6c;\n']))),gn=A.ZP.div(v||(v=(0,N.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  width: 24px;\n  height: 24px;\n  text-decoration: none;\n"]))),mn=A.ZP.div(k||(k=(0,N.Z)([""]))),Zn=A.ZP.span(w||(w=(0,N.Z)(["\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  padding: 5px;\n  font-size: 14px;\n  background-color: red;\n  color: white;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),bn=(0,A.ZP)(M.yal)(P||(P=(0,N.Z)(["\n  color: black !important;\n"]))),jn=(0,A.ZP)(an.wb$)(y||(y=(0,N.Z)(["\n  font-size: 25px;\n  margin: 0 20px;\n  cursor: pointer;\n"]))),vn=A.ZP.div(C||(C=(0,N.Z)(["\n  position: absolute;\n  top: 40px; /* Adjust the distance from the user icon */\n  right: 0;\n  width: 200px;\n  background-color: white;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  z-index: 111;\n  padding: 10px;\n  display: ",";\n"])),(function(n){return n.isOpen?"block":"none"})),kn=(0,A.ZP)(_.rU)(S||(S=(0,N.Z)(["\n  padding: 5px 10px;\n  cursor: pointer;\n  text-decoration: none;\n  display: block;\n  color: black;\n  &:hover {\n    background-color: #f2f2f2;\n  }\n"]))),wn=function(){var n=(0,X.v9)((function(n){return n.cart.quantity})),e=(0,U.useState)(!1),t=(0,L.Z)(e,2),r=t[0],o=t[1],i=(0,U.useRef)(null),c=(0,X.v9)((function(n){return n.user.currentUser}));(0,U.useEffect)((function(){var n=function(n){var e;null!==i&&void 0!==i&&null!==(e=i.current)&&void 0!==e&&e.contains(null===n||void 0===n?void 0:n.target)||o(!1)};return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}),[]);var s=(0,U.useState)(!1),a=(0,L.Z)(s,2),l=a[0],d=a[1],u=(0,X.I0)(),f=(0,G.s0)(),x=function(){var n=(0,F.Z)((0,z.Z)().mark((function n(){return(0,z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!c){n.next=6;break}return u((0,V.kS)()),u((0,W.N6)()),localStorage.clear(),n.next=6,Q().fire({icon:"success",title:"Success",text:"Logout Successful"});case 6:f("/auth");case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,T.jsx)(ln,{children:(0,T.jsxs)(dn,{children:[(0,T.jsxs)(un,{children:[(0,T.jsxs)(fn,{ref:i,children:[(0,T.jsx)(J.ZBZ,{style:{cursor:"pointer"},onClick:function(){o(!r)}}),(0,T.jsx)(sn,{showSidebar:r})]}),(0,T.jsx)(pn,{children:(0,T.jsx)(_.rU,{to:"/",style:{textDecoration:"none"},children:(0,T.jsx)(hn,{children:"MarketHub"})})}),(0,T.jsxs)(xn,{className:"justify-content-md-end",children:[(0,T.jsx)(I,{}),(0,T.jsx)(_.rU,{to:"/cart",children:(0,T.jsxs)(gn,{children:[(0,T.jsx)(bn,{}),(0,T.jsx)(Zn,{children:n})," "]})}),(0,T.jsx)(jn,{onClick:function(){d(!l)}}),c?(0,T.jsxs)(vn,{isOpen:l,children:[(0,T.jsx)(kn,{to:"/user/"+(null===c||void 0===c?void 0:c._id),children:"Profile"}),c.isAdmin&&(0,T.jsx)(kn,{to:"/admin",children:"Admin"}),(0,T.jsx)(kn,{onClick:x,children:"Logout"})]}):(0,T.jsx)(vn,{isOpen:l,children:(0,T.jsx)(kn,{to:"/auth",children:"Login"})})]})]}),(0,T.jsx)(mn,{})]})})}}}]);
//# sourceMappingURL=831.06e3dd4a.chunk.js.map