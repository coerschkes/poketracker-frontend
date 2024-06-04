import{a as z}from"./chunk-TSVUNOY7.js";import{a as B}from"./chunk-54AFTCKF.js";import{b as V,d as k}from"./chunk-XHGBUWCM.js";import"./chunk-NS62TDHS.js";import"./chunk-NV5XOKYQ.js";import{Ma as L,c as j,d as x,e as v,f as _,i as A}from"./chunk-V5POAINQ.js";import{f as U,g as l,h as C,m as W,n as I,p as Y,u as H}from"./chunk-TIRN3THN.js";import{$a as g,Da as d,Ta as O,Ua as E,Ub as T,Wa as h,X as M,Ya as u,Z as c,_a as f,ca as m,da as s,ga as F,ib as w,ja as b,nc as y,pb as P,vb as N}from"./chunk-X52NIM47.js";var D=(()=>{let e=class e{};e.canActivate=()=>(s(A).isLoggedIn()||s(V).navigate(["/auth"]),!0);let r=e;return r})();var Z=[{path:"auth",loadComponent:()=>import("./chunk-YBDZ2T5G.js").then(r=>r.AuthComponent)},{path:"",pathMatch:"full",redirectTo:"dashboard"},{path:"dashboard",loadComponent:()=>import("./chunk-SBKOM6TH.js").then(r=>r.DashboardComponent),canActivate:[D.canActivate]},{path:"create",loadComponent:()=>import("./chunk-R4YTR2RV.js").then(r=>r.CreateTrackerSetComponent),canActivate:[D.canActivate]},{path:"**",redirectTo:"dashboard"}];var $=(()=>{let e=class e extends I{constructor(i,o,n){super(i,o,n,s(h,{optional:!0}))}ngOnDestroy(){this.flush()}};e.\u0275fac=function(o){return new(o||e)(m(y),m(l),m(C))},e.\u0275prov=c({token:e,factory:e.\u0275fac});let r=e;return r})();function ee(){return new W}function te(r,e,t){return new H(r,e,t)}var q=[{provide:C,useFactory:ee},{provide:I,useClass:$},{provide:u,useFactory:te,deps:[v,I,g]}],re=[{provide:l,useFactory:()=>new Y},{provide:d,useValue:"BrowserAnimations"},...q],Re=[{provide:l,useClass:U},{provide:d,useValue:"NoopAnimations"},...q];function G(){return f("NgEagerAnimations"),[...re]}var ie="@",oe=(()=>{let e=class e{constructor(i,o,n,a,p){this.doc=i,this.delegate=o,this.zone=n,this.animationType=a,this.moduleImpl=p,this._rendererFactoryPromise=null,this.scheduler=s(h,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-2EQWZW3D.js")).catch(o=>{throw new M(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:n})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let a=new n(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(i,o){let n=this.delegate.createRenderer(i,o);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let a=new R(n);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(p=>{let Q=p.createRenderer(i,o);a.use(Q)}).catch(p=>{a.use(n)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){E()},e.\u0275prov=c({token:e,factory:e.\u0275fac});let r=e;return r})(),R=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,i,o){this.delegate.insertBefore(e,t,i,o)}removeChild(e,t,i){this.delegate.removeChild(e,t,i)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,i,o){this.delegate.setAttribute(e,t,i,o)}removeAttribute(e,t,i){this.delegate.removeAttribute(e,t,i)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,i,o){this.delegate.setStyle(e,t,i,o)}removeStyle(e,t,i){this.delegate.removeStyle(e,t,i)}setProperty(e,t,i){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,i)),this.delegate.setProperty(e,t,i)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,i){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,i)),this.delegate.listen(e,t,i)}shouldReplay(e){return this.replay!==null&&e.startsWith(ie)}};function S(r="animations"){return f("NgAsyncAnimations"),b([{provide:u,useFactory:(e,t,i)=>new oe(e,t,i,r),deps:[y,v,g]},{provide:d,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var J={providers:[k(Z),j(x()),G(),S(),S()]};function ne(r,e){r&1&&N(0,"app-sidenav")}function ae(r,e){r&1&&N(0,"app-auth")}var K=(()=>{let e=class e{constructor(i){this.title=L.APP_NAME,this._authState=i}isLoggedIn(){return this._authState.isLoggedIn()}};e.\u0275fac=function(o){return new(o||e)(O(A))},e.\u0275cmp=F({type:e,selectors:[["app-root"]],standalone:!0,features:[T],decls:2,vars:1,template:function(o,n){o&1&&w(0,ne,1,0,"app-sidenav")(1,ae,1,0),o&2&&P(0,n.isLoggedIn()?0:1)},dependencies:[B,z]});let r=e;return r})();_(K,J).catch(r=>console.error(r));
