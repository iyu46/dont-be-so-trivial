(this["webpackJsonpdont-be-so-trivial"]=this["webpackJsonpdont-be-so-trivial"]||[]).push([[10],{83:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(77),i=a(88),l=a(85),c=a(84),s=a(2),p=a(31),m=(a(7),a(32)),h=a(33),d=a(35),y={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p"},g=o.forwardRef((function(e,t){var a=e.align,r=void 0===a?"inherit":a,n=e.classes,i=e.className,l=e.color,c=void 0===l?"initial":l,h=e.component,g=e.display,u=void 0===g?"initial":g,v=e.gutterBottom,b=void 0!==v&&v,f=e.noWrap,E=void 0!==f&&f,S=e.paragraph,O=void 0!==S&&S,j=e.variant,x=void 0===j?"body1":j,w=e.variantMapping,z=void 0===w?y:w,N=Object(p.a)(e,["align","classes","className","color","component","display","gutterBottom","noWrap","paragraph","variant","variantMapping"]),A=h||(O?"p":z[x]||y[x])||"span";return o.createElement(A,Object(s.a)({className:Object(m.a)(n.root,i,"inherit"!==x&&n[x],"initial"!==c&&n["color".concat(Object(d.a)(c))],E&&n.noWrap,b&&n.gutterBottom,O&&n.paragraph,"inherit"!==r&&n["align".concat(Object(d.a)(r))],"initial"!==u&&n["display".concat(Object(d.a)(u))]),ref:t},N))})),u=Object(h.a)((function(e){return{root:{margin:0},body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,h1:e.typography.h1,h2:e.typography.h2,h3:e.typography.h3,h4:e.typography.h4,h5:e.typography.h5,h6:e.typography.h6,subtitle1:e.typography.subtitle1,subtitle2:e.typography.subtitle2,overline:e.typography.overline,srOnly:{position:"absolute",height:1,width:1,overflow:"hidden"},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:16},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextPrimary:{color:e.palette.text.primary},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main},displayInline:{display:"inline"},displayBlock:{display:"block"}}}),{name:"MuiTypography"})(g),v=a(37),b=o.forwardRef((function(e,t){var a=e.children,r=e.classes,n=e.className,i=e.component,l=void 0===i?"div":i,c=e.disablePointerEvents,h=void 0!==c&&c,d=e.disableTypography,y=void 0!==d&&d,g=e.position,b=e.variant,f=Object(p.a)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),E=Object(v.b)()||{},S=b;return b&&E.variant,E&&!S&&(S=E.variant),o.createElement(v.a.Provider,{value:null},o.createElement(l,Object(s.a)({className:Object(m.a)(r.root,n,h&&r.disablePointerEvents,E.hiddenLabel&&r.hiddenLabel,"filled"===S&&r.filled,{start:r.positionStart,end:r.positionEnd}[g],"dense"===E.margin&&r.marginDense),ref:t},f),"string"!==typeof a||y?a:o.createElement(u,{color:"textSecondary"},a)))})),f=Object(h.a)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(b),E=o.forwardRef((function(e,t){var a=e.children,r=e.classes,n=e.className,i=e.color,l=void 0===i?"inherit":i,c=e.component,h=void 0===c?"svg":c,y=e.fontSize,g=void 0===y?"default":y,u=e.htmlColor,v=e.titleAccess,b=e.viewBox,f=void 0===b?"0 0 24 24":b,E=Object(p.a)(e,["children","classes","className","color","component","fontSize","htmlColor","titleAccess","viewBox"]);return o.createElement(h,Object(s.a)({className:Object(m.a)(r.root,n,"inherit"!==l&&r["color".concat(Object(d.a)(l))],"default"!==g&&r["fontSize".concat(Object(d.a)(g))]),focusable:"false",viewBox:f,color:u,"aria-hidden":!v||void 0,role:v?"img":void 0,ref:t},E),a,v?o.createElement("title",null,v):null)}));E.muiName="SvgIcon";var S=Object(h.a)((function(e){return{root:{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,fontSize:e.typography.pxToRem(24),transition:e.transitions.create("fill",{duration:e.transitions.duration.shorter})},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorAction:{color:e.palette.action.active},colorError:{color:e.palette.error.main},colorDisabled:{color:e.palette.action.disabled},fontSizeInherit:{fontSize:"inherit"},fontSizeSmall:{fontSize:e.typography.pxToRem(20)},fontSizeLarge:{fontSize:e.typography.pxToRem(35)}}}),{name:"MuiSvgIcon"})(E);function O(e,t){var a=r.a.memo(r.a.forwardRef((function(t,a){return r.a.createElement(S,Object(s.a)({ref:a},t),e)})));return a.muiName=S.muiName,a}var j=O(r.a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"})),x=O(r.a.createElement("path",{d:"M14 6v15H3v-2h2V3h9v1h5v15h2v2h-4V6h-3zm-4 5v2h2v-2h-2z"})),w=Object(n.a)((function(e){return{margin:{margin:e.spacing(1),color:"#FFFFFF"}}}));t.default=function(e){var t=w();return r.a.createElement("div",null,r.a.createElement(i.a,{className:t.margin},r.a.createElement(l.a,{htmlFor:"input-username"},"Name"),r.a.createElement(c.a,{id:"input-username",startAdornment:r.a.createElement(f,{position:"start"},r.a.createElement(j,null))})),r.a.createElement(i.a,{className:t.margin},r.a.createElement(l.a,{htmlFor:"input-roomcode"},"Room Code"),r.a.createElement(c.a,{id:"input-roomcode",startAdornment:r.a.createElement(f,{position:"start"},r.a.createElement(x,null))})))}}}]);
//# sourceMappingURL=10.1035de40.chunk.js.map