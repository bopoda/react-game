(this["webpackJsonpreact-game"]=this["webpackJsonpreact-game"]||[]).push([[0],[,,,,,,,,,,,function(e,t,c){},,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),r=c(6),a=c.n(r),l=(c(11),c(3)),o=c(2),i=c(0);var u=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),c=t[0],s=t[1];function r(e){e.target&&(e.target.classList.contains("new-game-button")||s(!1))}return Object(n.useEffect)((function(){return document.addEventListener("click",r),function(){document.removeEventListener("click",r)}}),[]),Object(i.jsxs)("div",{className:"new-game-button-wrapper",children:[Object(i.jsx)("div",{className:"button new-game-button",onClick:function(){s(!c)},children:"New Game"}),c&&Object(i.jsxs)("div",{className:"new-game-menu",children:[Object(i.jsx)("div",{className:"tooltip-arrow",children:" "}),Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{className:"lost-progress-label",children:"Current game progress will be lost"}),Object(i.jsx)("li",{children:Object(i.jsx)("a",{href:"/#",className:"new-game-menu-new",onClick:function(e){e.preventDefault(),localStorage.removeItem("CELLS"),localStorage.removeItem("SECONDS_SPENT"),window.document.location.reload()},children:"New Game"})}),Object(i.jsx)("li",{children:Object(i.jsx)("a",{href:"/#",className:"new-game-menu-cancel",onClick:function(e){e.preventDefault()},children:"Cancel"})})]})]})]})};var j=function(){var e=[{mission:"970000600201509034830040010000402000706050002052038000500817006620394051000060403",solution:"974123685261589734835746219319472568786951342452638197543817926627394851198265473"},{mission:"020000000158000030340160902009208175000040000035601000000300594513480007690752003",solution:"926873451158924736347165982469238175281547369735691248872316594513489627694752813"},{mission:"060003000000004703074100020490038057208040096700600204501489600009000031000316509",solution:"962873415185924763374165928496238157218547396753691284531489672649752831827316549"},{mission:"209060038004508100605000409050340020000001000470006891000420913042910600097000204",solution:"219764538734598162685132479851349726926871345473256891568427913342915687197683254"},{mission:"038764200160008030479102600300000020020340051000250400013027500607010000250600007",solution:"538764219162598734479132685345871926726349851891256473913427568687915342254683197"},{mission:"068027901000910008107003040470206000051349700020870350019060000030500006605000407",solution:"568427931342915678197683245473256819851349762926871354219764583734598126685132497"},{mission:"004300001007091240190040800709200506002050030000076912405080000270000158000625370",solution:"524368791867591243193742865749213586612859437358476912435187629276934158981625374"},{mission:"503200100006007802100300705351002084007040610460801000000008561002415070805060000",solution:"573284196946157832128396745351672984287549613469831257734928561692415378815763429"}];return e[Math.floor(Math.random()*e.length)]};var d=function(e){var t=e.cellConfig;return Object(i.jsx)("td",{className:function(){var c=["game-cell"];return e.selected&&c.push("cell-selected"),t&&t.value>0&&t.value!==t.solution&&c.push("cell-mistake"),c.join(" ")}(),onClick:function(){console.log("clicked cell:",t),null!==t&&e.setSelectedCell(t)},children:Object(i.jsx)("div",{className:"cell-value"+((null===t||void 0===t?void 0:t.prefilled)?" cell-prefilled":""),children:(null===t||void 0===t?void 0:t.value)?t.value:""})})};c(13);var m=function(){return Object(i.jsxs)("div",{className:"hotkeys-wrapper",children:[Object(i.jsx)("p",{children:"Hotkeys:"}),Object(i.jsxs)("ul",{children:[Object(i.jsxs)("li",{children:[Object(i.jsx)("code",{children:"1-9"})," \u2014 fill selected cell"]}),Object(i.jsxs)("li",{children:[Object(i.jsx)("code",{children:"0"}),", ",Object(i.jsx)("code",{children:"Backspace"})," \u2014 erase selected cell"]})]})]})};function f(e){return function(e){if(e<60)return"00";var t=Math.floor(e/60);return t>=100?t.toString():("0"+t).slice(-2)}(e)+":"+function(e){return("0"+e%60).slice(-2)}(e)}var b=function(e){var t=e.secondsSpent;return Object(n.useEffect)((function(){if(!e.finished){var c=setTimeout((function(){console.log("timer +1"),e.setSecondsSpent(t+1)}),1e3);return function(){return clearTimeout(c)}}})),Object(i.jsx)("span",{className:"timer",children:f(e.secondsSpent)})};var O=function(e){return Object(i.jsxs)("div",{className:"records-wrapper",children:[Object(i.jsx)("p",{children:"Last 10 Records:"}),e.records.length?Object(i.jsx)("ul",{children:e.records.map((function(e,t){return Object(i.jsx)("li",{children:f(e)},t)}))}):null]})};var h=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),c=t[0],s=t[1],r=Object(n.useState)(!1),a=Object(o.a)(r,2),h=a[0],v=a[1],p=Object(n.useState)([]),x=Object(o.a)(p,2),g=x[0],S=x[1],N=Object(n.useState)(),w=Object(o.a)(N,2),k=w[0],y=w[1],E=Object(n.useState)(!1),C=Object(o.a)(E,2),I=C[0],L=C[1],T=Object(n.useState)(0),J=Object(o.a)(T,2),D=J[0],F=J[1];function M(e,t){for(var c=[],n=e;n<=t;n++)c.push(n);return c}function _(e){return void 0!==k&&k.row===e.row&&k.col===e.col}function P(e){if(console.log("key pressed:",e.key),k)switch(e.key){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":R(parseInt(e.key));break;case"0":case"Backspace":R(0)}else console.log("No cell selected when key pressed:",e.key)}function R(e){if(k&&!k.prefilled&&!h){var t=JSON.parse(JSON.stringify(g));t[k.row][k.col].value=e,S(t),function(e){var t,c=Object(l.a)(e);try{for(c.s();!(t=c.n()).done;){var n,s=t.value,r=Object(l.a)(s);try{for(r.s();!(n=r.n()).done;){var a=n.value;if(a.value!==a.solution)return!1}}catch(o){r.e(o)}finally{r.f()}}}catch(o){c.e(o)}finally{c.f()}return!0}(t)&&A()}}function A(){localStorage.removeItem("CELLS"),localStorage.removeItem("SECONDS_SPENT"),v(!0),alert("Congrats! Your score is "+f(D)+". You can start new game."),c.unshift(D),s(c.slice(0,10))}return Object(n.useEffect)((function(){return document.addEventListener("keydown",P),function(){document.removeEventListener("keydown",P)}}),[k]),Object(n.useEffect)((function(){var e=localStorage.getItem("RECORDS");e&&s(JSON.parse(e));var t=localStorage.getItem("SECONDS_SPENT");t&&F(parseInt(t));var c=JSON.parse(localStorage.getItem("CELLS"));c&&S(c);var n="1"===localStorage.getItem("SHOW_MISTAKES");if(L(n),!c){var r=setTimeout((function(){!function(){var e=j();console.log("Start new game...",e);for(var t=new Array,c=0,n=0;n<=8;n++){t[n]=new Array;for(var s=0;s<=8;s++)t[n][s]={value:parseInt(e.mission[c]),solution:parseInt(e.solution[c]),prefilled:e.mission[c]===e.solution[c],row:n,col:s},c++}S(t)}()}),500);return function(){clearTimeout(r)}}}),[]),Object(n.useEffect)((function(){localStorage.setItem("RECORDS",JSON.stringify(c)),localStorage.setItem("SHOW_MISTAKES",I?"0":"1"),localStorage.setItem("SECONDS_SPENT",D.toString()),localStorage.setItem("CELLS",JSON.stringify(g))})),Object(i.jsxs)("div",{className:"sudoku-wrapper",children:[Object(i.jsxs)("div",{className:"game-info-wrapper flex-wrapper",children:[Object(i.jsx)("div",{className:"check-mistakes-wrapper",children:Object(i.jsxs)("label",{className:"check-mistakes",children:[Object(i.jsx)("span",{className:"label-text",children:"Show Mistakes"}),Object(i.jsx)("span",{className:"switch",children:Object(i.jsx)("input",{type:"checkbox",checked:I,onChange:function(){L(!I)}})})]})}),Object(i.jsx)("div",{className:"timer-wrapper",children:Object(i.jsx)(b,{secondsSpent:D,setSecondsSpent:function(e){F(e)},finished:h})}),Object(i.jsx)("div",{className:"full-screen-wrapper",children:Object(i.jsx)("input",{type:"button",value:document.fullscreenElement?"Minimize":"Full Screen",onClick:function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}})})]}),Object(i.jsxs)("div",{className:"game-flex-wrapper",children:[Object(i.jsx)("div",{className:"game-wrapper",children:Object(i.jsx)("div",{className:"game",children:Object(i.jsx)("table",{className:"game-table"+(I?" show-mistakes":""),children:Object(i.jsx)("tbody",{children:M(0,8).map((function(e){return Object(i.jsx)("tr",{className:"game-row",children:M(0,8).map((function(t){var c=g.length?g[e][t]:null;return Object(i.jsx)(d,{cellConfig:c,selected:!!c&&_(c),setSelectedCell:y},e.toString()+t.toString())}))},e)}))})})})}),Object(i.jsx)("div",{className:"game-controls-wrapper",children:Object(i.jsxs)("nav",{children:[Object(i.jsx)(u,{}),Object(i.jsx)("input",{type:"button",value:"Solve all automatically",onClick:function(){if(h)alert("The game is already solved");else{var e,t=JSON.parse(JSON.stringify(g)),c=Object(l.a)(t);try{for(c.s();!(e=c.n()).done;){var n,s=e.value,r=Object(l.a)(s);try{for(r.s();!(n=r.n()).done;){var a=n.value;a.value=a.solution}}catch(o){r.e(o)}finally{r.f()}}}catch(o){c.e(o)}finally{c.f()}S(t),A()}}}),Object(i.jsx)(m,{}),Object(i.jsx)(O,{records:c})]})})]})]})};c(14);var v=function(){return Object(i.jsx)("header",{className:"site-header",children:Object(i.jsx)("div",{className:"content-wrapper",children:Object(i.jsx)("a",{href:"/",className:"logo-sudoku",children:" "})})})},p=c.p+"static/media/rs_school_js.ad178c0d.svg";c(15);var x=function(){return Object(i.jsx)("footer",{className:"site-footer",children:Object(i.jsxs)("div",{className:"content-wrapper flex-wrapper",children:[Object(i.jsx)("div",{className:"footer-item",children:Object(i.jsx)("a",{className:"rs-logo",href:"https://rs.school/js/",children:Object(i.jsx)("img",{src:p,alt:"RS School"})})}),Object(i.jsxs)("div",{className:"footer-item",children:[Object(i.jsx)("a",{href:"https://github.com/bopoda",children:"Eugene Yurkevich"}),", 2021"]}),Object(i.jsx)("div",{className:"footer-item",children:" "})]})})};var g=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(v,{}),Object(i.jsx)("div",{className:"content-wrapper site-content-wrapper",id:"site-content-wrapper",children:Object(i.jsx)("div",{className:"site-content",children:Object(i.jsx)(h,{})})}),Object(i.jsx)(x,{})]})},S=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,17)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;c(e),n(e),s(e),r(e),a(e)}))};a.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(g,{})}),document.getElementById("root")),S()}],[[16,1,2]]]);
//# sourceMappingURL=main.e4ae671b.chunk.js.map