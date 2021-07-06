(this["webpackJsonpreact-rb-auth-example"]=this["webpackJsonpreact-rb-auth-example"]||[]).push([[0],{21:function(e,t,n){e.exports=n.p+"static/media/udilia-logo.a02392f5.svg"},23:function(e,t,n){e.exports=n(37)},28:function(e,t,n){},29:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(20),a=n.n(i),c=n(13);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(28);var u=n(10);function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function h(e,t){try{var n=e()}catch(r){return t(r)}return n&&n.then?n.then(void 0,t):n}var f,p={role:"public"},d={accessToken:"",refreshToken:"",openIdToken:"",tokenType:"",expiresIn:"",scope:""},m=Object(r.createContext)({isAuth:!1,reloading:!0,user:p,logic:{login:function(){try{return Promise.resolve(console.log("please change login"))}catch(e){return Promise.reject(e)}},signup:function(){try{return Promise.resolve(console.log("please change signup"))}catch(e){return Promise.reject(e)}},logout:function(){try{return Promise.resolve(console.log("please change logout"))}catch(e){return Promise.reject(e)}},silent:function(){try{return Promise.resolve(console.log("please change silent"))}catch(e){return Promise.reject(e)}},handle:function(){try{return Promise.resolve(console.log("please change handle"))}catch(e){return Promise.reject(e)}},refresh:function(){try{return Promise.resolve(console.log("please change refresh"))}catch(e){return Promise.reject(e)}},apis:{}},routes:{public:"/",private:"/dashboard"},rules:{public:{static:["home-page:visit"]},admin:{static:["home-page:visit","dashboard-page:visit"]}}}),g=function(){function e(){}return e.setStorage=function(t){e.s=t},e.getTokens=function(){return{accessToken:e.s.accessToken||"",refreshToken:e.s.refreshToken||"",openIdToken:e.s.openIdToken||"",tokenType:e.s.tokenType||"",expiresIn:e.s.expiresIn||"",scope:e.s.scope||""}},e}();g.s={accessToken:"",refreshToken:"",openIdToken:"",tokenType:"",expiresIn:"",scope:"",setTokens:function(){return null}},g.setTokens=function(e){return void 0===e&&(e=d),g.s.setTokens(e)},function(e){e.INVALID_GRANT="invalid_grant",e.REFRESH_TOKEN_REVOKED="refreshTokenRevoked",e.REFRESH_TOKEN_NOT_PRESENT="noRefreshToken",e.UNAUTHORIZED="Unauthorized",e.TOO_MANY_REQUESTS="Too Many Requests",e.FAILLED_TO_FETCH="failled to fetch",e.UNKNOWN="UNKNOWN"}(f||(f={}));var v=function(){function e(){}return e.handle=function(t,n,r,o,i,a){return void 0===o&&(o=1),void 0===i&&(i=f.UNAUTHORIZED),void 0===a&&(a=f.INVALID_GRANT),function(c){return function(){try{return Promise.resolve(e.recursion(c,t,n,r,o,i,a))}catch(u){return Promise.reject(u)}}}},e}();v.recursion=function(e,t,n,r,o,i,a){void 0===o&&(o=1);try{return void 0===i&&(i=f.UNAUTHORIZED),void 0===a&&(a=f.INVALID_GRANT),Promise.resolve(h((function(){return Promise.resolve(t()).then((function(){}))}),(function(c){var u=!1;function s(e){if(u)return e;throw c}var l=function(){if(c.message===i&&o>=1)return h((function(){return Promise.resolve(e()).then((function(){return u=!0,v.recursion(e,t,n,r,o-1,i,a)}))}),(function(){throw r(f.REFRESH_TOKEN_REVOKED),new Error(f.REFRESH_TOKEN_REVOKED)}));r(c)}();return l&&l.then?l.then(s):s(l)})))}catch(c){return Promise.reject(c)}};var E=function(){function e(e){this.success=function(){return null},this.failure=function(){return null},this.recursions=1,this.accessTokenError=f.INVALID_GRANT,this.refreshTokenError=f.REFRESH_TOKEN_REVOKED,this.logic=e}var t=e.prototype;return t.withAccessTokenError=function(e){return this.accessTokenError=e,this},t.withRefreshTokenError=function(e){return this.refreshTokenError=e,this},t.withSuccess=function(e){return this.success=e,this},t.withFailure=function(e){return this.failure=e,this},t.withCustomRecursions=function(e){return this.recursions=e,this},t.build=function(e){return v.handle(this.logic,this.success,this.failure,this.recursions,this.accessTokenError,this.refreshTokenError)(e)},e}(),b=function(e){return new Promise((function(t){return t(e)}))},k=function(e){var t,n,r,o,i;function a(t){var n,r=t.setReloading,o=t.setUser,i=t.authApi,a=t.onAuthExpired,c=t.appApis,u=t.reloadFlag;return(n=e.call(this,r,o)||this).defaultLogin=b,n.defaultLogout=b,n.defaultSignupLogic=b,n.defaultSilentLogic=b,n.defaultHandleLogic=b,n.defaultRefreshLogic=b,n.loginLogic=n.defaultLogin,n.logoutLogic=n.defaultLogout,n.signupLogic=n.defaultSignupLogic,n.silentLogic=n.defaultSilentLogic,n.handleLogic=n.defaultHandleLogic,n.refreshLogic=n.defaultRefreshLogic,n.errorCallback=function(){return null},n.appApis={},n.reloadFlag=!0,n.login=function(){try{return Promise.resolve(n.runLogic(n.loginLogic).apply(void 0,arguments))}catch(e){return Promise.reject(e)}},n.handle=function(){try{return Promise.resolve(n.runLogic(n.handleLogic).apply(void 0,arguments))}catch(e){return Promise.reject(e)}},n.silent=function(){try{return Promise.resolve(n.runLogic(n.silentLogic).apply(void 0,arguments))}catch(e){return Promise.reject(e)}},n.signup=function(){var e;return(e=n).signupLogic.apply(e,arguments)},n.refresh=function(){try{return Promise.resolve(n.runRefresh(n.refreshLogic)())}catch(e){return Promise.reject(e)}},n.logout=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];try{return Promise.resolve(n.wrap((function(){try{var e;return Promise.resolve((e=n).logoutLogic.apply(e,t)).then((function(e){return Promise.resolve(n.authenticate()).then((function(){return e}))}))}catch(r){return Promise.reject(r)}})))}catch(o){return Promise.reject(o)}},n.runLogic=function(e){return function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];try{return Promise.resolve(n.wrap((function(){try{return Promise.resolve(e.apply(void 0,r)).then((function(e){return Promise.resolve(n.authenticate(e)).then((function(){return e}))}))}catch(t){return Promise.reject(t)}})))}catch(i){return Promise.reject(i)}}},n.runRefresh=function(e){return function(){try{return Promise.resolve(n.wrap((function(){try{return Promise.resolve(e()).then((function(e){var t=function(){if(e.refreshToken)return Promise.resolve(g.setTokens(e)).then((function(){}))}();return t&&t.then?t.then((function(){return e})):e}))}catch(t){return Promise.reject(t)}})))}catch(t){return Promise.reject(t)}}},n.accessTokenError=f.UNAUTHORIZED,n.refreshTokenError=f.INVALID_GRANT,n.apiWrap=function(e){return function(t,r){return new E(e).withSuccess(t).withFailure(r).withAccessTokenError(n.accessTokenError).withRefreshTokenError(n.refreshTokenError).build(n.refresh)}},n.wrap=function(e){try{return n.reloadFlag&&n.setReloading(!0),Promise.resolve(function(e,t){try{var n=e()}catch(r){return t(!0,r)}return n&&n.then?n.then(t.bind(null,!1),t.bind(null,!0)):t(!1,n)}((function(){return h(e,(function(e){throw"Failed to fetch"===e.message?n.errorCallback(f.FAILLED_TO_FETCH,e):e.message===f.UNAUTHORIZED?n.errorCallback(e):e.message===f.REFRESH_TOKEN_NOT_PRESENT||e.message!==f.REFRESH_TOKEN_NOT_PRESENT&&n.errorCallback(f.UNKNOWN,e),e}))}),(function(e,t){if(n.reloadFlag&&n.setReloading(!1),e)throw t;return t})))}catch(t){return Promise.reject(t)}},n.authenticate=function(e){void 0===e&&(e=null);try{var t=e&&e.user&&e.tokens?(n.setUser(e.user),Promise.resolve(g.setTokens(e.tokens)).then((function(){}))):(n.setUser(null),Promise.resolve(g.setTokens(d)).then((function(){})));return Promise.resolve(t&&t.then?t.then((function(){})):void 0)}catch(r){return Promise.reject(r)}},a&&(n.errorCallback=a),c&&(n.appApis=n.embedWrapperLogicIntoApis(c)),u&&(n.reloadFlag=u),i?(i.login&&(n.loginLogic=i.login),i.logout&&(n.logoutLogic=i.logout),i.signup&&(n.signupLogic=i.signup),i.handle&&(n.handleLogic=i.handle),i.silent&&(n.silentLogic=i.silent),i.refresh&&(n.refreshLogic=i.refresh),n):function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(n)}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,l(t,n),a.prototype.embedWrapperLogicIntoApis=function(e){var t=this,n={};return Object.keys(e).forEach((function(r){r.startsWith("logic")&&e[r]&&"function"===typeof e[r]?n[r]=t.apiWrap(e[r]):null!==e[r]&&"object"===typeof e[r]?n[r]=t.embedWrapperLogicIntoApis(e[r]):n[r]=e[r]})),n},r=a,(o=[{key:"apis",get:function(){return this.appApis}}])&&s(r.prototype,o),i&&s(r,i),a}((function(e,t){this.setReloading=e,this.setUser=t})),T=function(e){var t=e.children,n=e.authApi,i=e.routes,a=e.onAuthExpired,c=e.appApis,u=void 0===c?{}:c,s=e.monitorUserChanges,l=void 0===s?null:s,h=o.a.useState(!0),f=h[0],d=h[1],g=o.a.useState(null),v=g[0],E=g[1],b=new k({setReloading:d,setUser:E,authApi:n,onAuthExpired:a,appApis:u});Object(r.useEffect)((function(){l&&l(v)}),[v]);var T={isAuth:!(!v||!v.role||"public"===v.role),reloading:f,logic:b,routes:{private:(null===i||void 0===i?void 0:i.private)||"/private",public:(null===i||void 0===i?void 0:i.public)||"/"},user:v||p,rules:{admin:{},public:{}}};return o.a.createElement(m.Provider,{value:T},t)},w=function(){};w.done=!1;var y,O=function(e){var t=e.children,n=e.locationPathName,i=e.AuthReloadingComp,a=e.AuthLoadingComp,c=void 0===a?void 0:a,u=e.authCallbackRoute,s=e.onRefreshFinished,l=e.debug,h=void 0!==l&&l,f=Object(r.useContext)(m),p=Object(r.useState)(!0),d=p[0],g=p[1];Object(r.useEffect)((function(){f.reloading&&void 0!==c?g(!0):g(!1)}),[f.reloading,c]);return Object(r.useEffect)((function(){w.done||n===u||(w.done=!0,function(){try{var e=function(){};h&&(e=console.log),Promise.resolve(f.logic.silent().then(e).catch(e).finally((function(){h&&console.log("Finished refreshing"),s&&s()}))).then((function(){}))}catch(t){return Promise.reject(t)}}())}),[]),!w.done&&i?o.a.createElement(i,null):o.a.createElement(o.a.Fragment,null,d&&c&&o.a.createElement(c,null),t)},A=function(e){var t=e.Redirect,n=e.Allowed,r=e.NotAllowed;return o.a.createElement(m.Consumer,null,(function(e){var i;return e.isAuth?o.a.createElement(n,null):r?o.a.createElement(r,null):o.a.createElement(t,{to:(null===(i=e.routes)||void 0===i?void 0:i.public)||"/"})}))},P=function(){function e(){return this.headers=new Headers,this}var t=e.prototype;return t.withKeyValuePair=function(e,t){return this.headers.append(e,t),this},t.withContentTypeJson=function(){return this.headers.append("Content-Type","application/json"),this},t.withToken=function(e,t){return this.headers.append("Authorization",e+" "+t),this},t.withRBAuthToken=function(){return this.headers.append("Authorization",g.getTokens().tokenType+" "+g.getTokens().accessToken),this},t.build=function(){return this.headers},e}();!function(e){e.POST="POST",e.GET="GET",e.PATCH="PATCH",e.PUT="PUT",e.DELETE="DELETE",e.HEAD="HEAD",e.CONNECT="CONNECT",e.TRACE="TRACE"}(y||(y={}));var j=function(){function e(e,t){return void 0===t&&(t=!1),this.debug=t,this.route="",this.body=null,this.headers=new Headers,this.method=y.GET,this.mode=null,this.errorHandling=null,this.timeout=1e4,this.route=e,this}var t=e.prototype;return t.withAuth0Body=function(e){return void 0===e&&(e={}),this.body=e,this},t.withErrorHandling=function(e){return this.errorHandling=e,this},t.withBody=function(e){return void 0===e&&(e={}),this.body=e,this},t.withHeaders=function(e){return this.headers=e,this},t.withMethod=function(e){return this.method=e,this},t.withMode=function(e){return this.mode=e,this},t.withTimeout=function(e){return this.timeout=e,this},t.request=function(){if(this.debug){var e={};this.headers.forEach((function(t,n){return e[n]=t})),console.log("will request: ",this.route,this.method,JSON.stringify(e),JSON.stringify(this.body))}var t,n,r,o={method:this.method,headers:this.headers};return this.mode&&(o.mode=this.mode),this.method!==y.GET&&this.method!==y.HEAD&&this.body&&(o.body=JSON.stringify(this.body)),t=this.route,n=o,void 0===(r=this.timeout)&&(r=1e4),Promise.race([fetch(t,n),new Promise((function(e,t){return setTimeout((function(){return t(new Error("timeout"))}),r)}))])},t.build=function(){try{var e=this;return Promise.resolve(e.request()).then((function(t){var n=t.headers.get("content-type"),r=t.ok;return n&&-1!==n.indexOf("application/json")?Promise.resolve(t.json()):Promise.resolve(t.text()).then((function(t){return r||(e.debug&&console.log(t),e.errorHandling&&e.errorHandling(t)),t}))}))}catch(t){return Promise.reject(t)}},e}(),R=n(2),S=n(21),x=n.n(S),N=(n(29),function(e){return o.a.createElement("div",{className:"Example"},e.children,o.a.createElement("img",{src:x.a,alt:"React logo",width:"62"}),o.a.createElement("h1",{className:"Example-text"},"React Role Based Auth Library"))}),I=function(e){var t=e.to;return o.a.createElement(R.a,{to:t})},L=function(e){var t=e.path,n=e.Allowed,r=e.NotAllowed;return o.a.createElement(R.b,{to:t,render:function(){return o.a.createElement(A,{Allowed:n,Redirect:I,NotAllowed:r})}})},_=m,H=function(){var e=Object(r.useContext)(_).logic,t=Object(r.useState)(""),n=Object(u.a)(t,2),i=n[0],a=n[1],c=Object(r.useState)(""),s=Object(u.a)(c,2),l=s[0],h=s[1],f=function(e){return function(t){return e(t.target.value)}};return o.a.createElement("div",null,o.a.createElement("h3",null,"You are anonymous"),o.a.createElement("h3",null,"Please login"),o.a.createElement("input",{value:i,type:"text",onChange:f(a)}),o.a.createElement("input",{value:l,type:"password",onChange:f(h)}),o.a.createElement("button",{onClick:function(){return e.login(i,l)}},"Login"))};function C(e){return"".concat(e.length<2?"0":"").concat(e)}var F=function(e){if(null===e)return"";var t=(e.getMonth()+1).toString(),n=e.getDate().toString(),r=(e.getHours()+1).toString(),o=(e.getMinutes()+1).toString(),i=(e.getSeconds()+1).toString(),a=[e.getFullYear(),C(t),C(n)].join("-"),c="".concat(C(r),":").concat(C(o),":").concat(C(i));return"".concat(a," ").concat(c)},U=function(){var e=Object(r.useContext)(_),t=Object(r.useState)(null),n=Object(u.a)(t,2),i=n[0],a=n[1];return o.a.createElement("div",null,o.a.createElement("h3",null,"Welcome USER!"),o.a.createElement("h5",null,"Your name is: ",e.user.name),o.a.createElement("img",{style:{maxHeight:100,borderRadius:50},src:e.user.picture,alt:e.user.name}),o.a.createElement("h5",null,"Your slug is: ",e.user.nickname),o.a.createElement("button",{onClick:function(){return e.logic.logout().then((function(){return null})).catch((function(){return null}))}},"Logout"),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return e.logic.refresh().then(console.log).catch(console.log)}},"Refresh tokens"),o.a.createElement("button",{onClick:function(){e.logic.apis.external.getUser().then((function(e){return a({nickname:e.nickname,date:new Date,lastFetched:(null===i||void 0===i?void 0:i.date)||null})})).catch(console.log)}},"Get user"),i&&o.a.createElement("div",null,o.a.createElement("h3",null,"Got user: "),o.a.createElement("h5",null,i.nickname),o.a.createElement("p",null,"Last retrieved:","\t".concat(F(i.lastFetched))),o.a.createElement("p",null,"Retrieved:","\t\t".concat(F(i.date))))))},D=function(){return o.a.createElement(_.Consumer,null,(function(e){return o.a.createElement(o.a.Fragment,null,e.isAuth&&o.a.createElement(U,null),!e.isAuth&&o.a.createElement(H,null))}))},M=(n(35),function(e){var t=e.children;return o.a.createElement("div",{style:{display:"flex"}},t)}),K=function(e){return o.a.createElement("div",{className:"SecondExample"},o.a.createElement("div",{className:"SecondExample-text"},o.a.createElement(M,null)),o.a.createElement("a",{className:"SecondExample-github-link",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/nmpribeiro/react-role-based-auth/blob/master/README.md"},"Documentation"),e.children)},G=function(e){var t=e.children;return o.a.createElement("div",{className:"appMenu"},t)},W=function(e){var t=e.to,n=e.label;return o.a.createElement("div",{className:"appLink"},o.a.createElement(c.b,{to:t},n))},J=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,null),o.a.createElement("div",{className:"Example appBounding"},o.a.createElement(G,null,o.a.createElement(W,{to:"/",label:"Home"}),o.a.createElement(W,{to:"/secure",label:"Secure"}),o.a.createElement(W,{to:"/super-secure",label:"Super Secure"})),o.a.createElement(R.d,null,o.a.createElement(L,{path:"/secure",Allowed:function(){return o.a.createElement("h3",null,"Secure area")},NotAllowed:function(){return o.a.createElement("h3",null,"You are not allowed")}}),o.a.createElement(L,{path:"/super-secure",Allowed:function(){return o.a.createElement("h3",null,"Super Secure area")}})),o.a.createElement(D,null)),o.a.createElement(K,null))},V=n(9),B=n(1),Z=n.n(B),q=n(4),Y=n(8),z={nickname:"anon",name:"",role:"public",picture:"https://s.gravatar.com/avatar/af17b538f2e14a4a5c4a23799233af63?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnu.png",sub:"",updated_at:new Date},Q=n(14),X="react-rb-auth.eu.auth0.com",$="IQHjsH8rbRctSLd2dqErP3SC6WJ4mqx5",ee=function(){function e(){Object(Y.a)(this,e)}return Object(Q.a)(e,null,[{key:"mapTokens",value:function(e){return{accessToken:e.access_token,refreshToken:e.refresh_token,openIdToken:e.id_token,scope:e.scope,expiresIn:e.expires_in,tokenType:e.token_type}}}]),e}();ee.connection="Username-Password-Authentication",ee.scope="profile openid offline_access",ee.auth0body={client_id:$,audience:"https://react-rb-auth.eu.auth0.com/api/v2/"},ee.authorize=function(e,t){return new j("https://".concat(X,"/oauth/token")).withMethod(y.POST).withHeaders((new P).withContentTypeJson().build()).withAuth0Body(Object(V.a)(Object(V.a)({},ee.auth0body),{},{connection:ee.connection,scope:ee.scope,grant_type:"password",username:e,password:t})).withErrorHandling((function(e){if(e.error)throw Error(e.error)})).build()},ee.refresh=Object(q.a)(Z.a.mark((function e(){var t,n,r=arguments;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t=r.length>0&&void 0!==r[0]?r[0]:g.getTokens().refreshToken)&&""!==t){e.next=3;break}throw new Error("noRefreshToken");case 3:return e.next=5,new j("https://".concat(X,"/oauth/token")).withMethod(y.POST).withHeaders((new P).withContentTypeJson().build()).withBody({grant_type:"refresh_token",client_id:$,refresh_token:t}).withErrorHandling((function(e){if(e.error&&(console.log("Auth0Api::refresh result.error: ",e.error),"invalid_grant"===e.error))throw Error(f.INVALID_GRANT)})).build();case 5:return n=e.sent,e.abrupt("return",ee.mapTokens(n));case 7:case"end":return e.stop()}}),e)}))),ee.logout=Object(q.a)(Z.a.mark((function e(){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new j("https://".concat(X,"/v2/logout")).withMode("no-cors").build());case 1:case"end":return e.stop()}}),e)}))),ee.revoke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g.getTokens();return e.refreshToken&&new j("https://".concat(X,"/oauth/revoke"),!0).withMethod(y.POST).withBody({client_id:$,client_secret:"gCZVMcdV2q9n7G7jjnZrYEwee1FdAOGV7-b7AnMhJZIzAIGBE6Fb4LMTeIr0XIn0",token:e.refreshToken}).withHeaders((new P).withContentTypeJson().withKeyValuePair("origin","http://localhost:3000").build()).withMode("same-origin").withErrorHandling((function(e){if(e.error)throw Error(e.error)})).build()},ee.signup=function(e,t,n){return new j("https://".concat(X,"/dbconnections/signup")).withMethod(y.POST).withHeaders((new P).withContentTypeJson().build()).withAuth0Body(Object(V.a)(Object(V.a)({},ee.auth0body),{},{connection:ee.connection,scope:ee.scope,grant_type:"password",device:"mydevice",email:t,name:e,password:n})).withErrorHandling((function(e){if(e.error)throw Error(e.error)})).build()},ee.getUser=function(e,t){return new j("https://".concat(X,"/userinfo")).withMethod(y.GET).withHeaders((new P).withToken(e,t).build()).withErrorHandling((function(e){if(e.error)throw Error(e.error)})).build()},ee.getUserInfo=function(e,t,n){return new j("https://".concat(X,"/api/v2/users/").concat(n)).withMethod(y.GET).withHeaders((new P).withToken(e,t).withContentTypeJson().build()).withErrorHandling((function(e){if(e.error)throw Error(e.error)})).build()};var te=function e(){Object(Y.a)(this,e)};te.login=function(){var e=Object(q.a)(Z.a.mark((function e(t,n){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",te.authWrapper(Object(q.a)(Z.a.mark((function e(){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=ee,e.next=3,ee.authorize(t,n);case 3:return e.t1=e.sent,e.abrupt("return",e.t0.mapTokens.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),te.silent=Object(q.a)(Z.a.mark((function e(){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",te.authWrapper(Object(q.a)(Z.a.mark((function e(){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",te.refresh());case 1:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)}))),te.logout=function(){return ee.logout()},te.signup=function(e,t,n){return ee.signup(e,t,n)},te.refresh=function(){return ee.refresh()},te.authWrapper=function(){var e=Object(q.a)(Z.a.mark((function e(t){var n,r,o,i;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d,r=z,e.prev=2,e.next=5,t();case 5:return n=e.sent,e.next=8,ee.getUser(n.tokenType,n.accessToken);case 8:if(!(o=e.sent)||!o.sub){e.next=14;break}return e.next=12,ee.getUserInfo(n.tokenType,n.accessToken,o.sub);case 12:i=e.sent,r=Object(V.a)(Object(V.a)({},o||z),{},{role:te.getRole(i)});case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.log("authWrapper catch: ",e.t0);case 19:return e.abrupt("return",{tokens:n,user:r});case 20:case"end":return e.stop()}}),e,null,[[2,16]])})));return function(t){return e.apply(this,arguments)}}(),te.getRole=function(e){var t=z.role;return e&&e.user_metadata&&e.user_metadata.role&&(t=e.user_metadata.role),t};var ne={external:new function e(){Object(Y.a)(this,e),this.getUser=function(){return new j("https://".concat("react-rb-auth.eu.auth0.com","/userinfo")).withMethod(y.GET).withHeaders((new P).withRBAuthToken().build()).build()}}},re=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"react_rb_auth_tokens";Object(Y.a)(this,e),this.tokensKey=void 0,this.accessToken="",this.refreshToken="",this.openIdToken="",this.tokenType="",this.expiresIn="",this.scope="",this.setItem=function(){var e=Object(q.a)(Z.a.mark((function e(t){var n,r=arguments;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.length>1&&void 0!==r[1]?r[1]:{},!t||!n){e.next=5;break}return e.abrupt("return",localStorage.setItem(t,JSON.stringify(n)));case 5:return e.abrupt("return");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.tokensKey=n,this.init(t)}return Object(Q.a)(e,[{key:"init",value:function(){var e=Object(q.a)(Z.a.mark((function e(t){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loadTokensFromStorage().then((function(){return t(!0)}));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"loadTokensFromStorage",value:function(){var e=Object(q.a)(Z.a.mark((function e(){var t,n;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=localStorage.getItem(this.tokensKey))&&t.length>0&&(n=JSON.parse(t),console.log("AppStorage::loadTokensFromStorage tokens => ",n.refreshToken),this.refreshToken=n.refreshToken,this.accessToken=n.accessToken,this.openIdToken=n.openIdToken,this.expiresIn=n.expiresIn,this.scope=n.scope,this.tokenType=n.tokenType),g.setStorage(this);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setTokens",value:function(){var e=Object(q.a)(Z.a.mark((function e(t){var n;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.accessToken&&(this.accessToken=t.accessToken),t.expiresIn&&(this.expiresIn=t.expiresIn),t.openIdToken&&(this.openIdToken=t.openIdToken),t.tokenType&&(this.tokenType=t.tokenType),t.scope&&(this.scope=t.scope),t.refreshToken&&(this.refreshToken=t.refreshToken);try{n={refreshToken:t.refreshToken},this.setItem(this.tokensKey,n)}catch(r){console.log("error while saving to your storage: ",r)}case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),oe=function(){return o.a.createElement(ae,null,o.a.createElement("h3",null,"AuthReloading"))},ie=function(){return o.a.createElement(ae,null,o.a.createElement("h3",null,"AuthLoading"))},ae=function(e){var t=e.children;return o.a.createElement("div",{style:{position:"absolute",display:"flex",top:0,bottom:0,left:0,right:0,backgroundColor:"white"}},o.a.createElement("div",{style:{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}},t))},ce=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],i=t[1];Object(r.useEffect)((function(){g.setStorage(new re(i))}),[]),Object(r.useEffect)((function(){console.log("is initiated: ",n)}),[n]);return n?o.a.createElement(T,{authApi:te,routes:{private:"/super-secure",public:"/"},onAuthExpired:function(e,t){return setTimeout((function(){alert(e),t&&console.log(t)}))},appApis:ne},o.a.createElement(O,{locationPathName:"none",AuthReloadingComp:oe,AuthLoadingComp:ie,onRefreshFinished:function(){return console.log("Main::onRefreshFinished")},debug:!0},o.a.createElement(J,null))):o.a.createElement(o.a.Fragment,null)};a.a.render(o.a.createElement(c.a,null,o.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.a0450140.chunk.js.map