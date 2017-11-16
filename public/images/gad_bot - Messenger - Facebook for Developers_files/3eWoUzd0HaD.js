if (self.CavalryLogger) { CavalryLogger.start_js(["DDt3Q"]); }

__d("ArtilleryLoggerType",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({PRELIMINARY_UPLOAD:"preliminary",FULL_UPLOAD:"full_upload"})}),null);
__d("ArtillerySWDataCollector",["Promise","ArtillerySWConfig","ClientServiceWorkerMessage","ServiceWorkerRegistration","pageLoadedViaSWCache","setTimeoutAcrossTransitions"],(function a(b,c,d,e,f,g){__p&&__p();var h=5e3,i=null;function j(l){__p&&__p();var m=false,n=new(c("ClientServiceWorkerMessage"))("asw-pageTraceDataRequest",{fullSWEFLog:c("ArtillerySWConfig").shouldLogEFRsrcs},function(o){__p&&__p();var p=o.data,q=p.command,r=p.data;if(m)return;m=true;if(q==="trace"&&r.workerPerf){var s=void 0;if(r.workerPerf.annotations.stringProps&&r.workerPerf.annotations.stringProps.fullCacheHitData){s=r.workerPerf.annotations.stringProps.fullCacheHitData;delete r.workerPerf.annotations.stringProps.fullCacheHitData}l({workerPerf:r.workerPerf,fullCacheHitData:s});return}});n.sendViaController()}var k={collect:function l(){__p&&__p();if(i!==null)return i;i=new(c("Promise"))(function(m,n){if(!c("pageLoadedViaSWCache")())c("ServiceWorkerRegistration").isAWorkerActivated().then(function(o){if(o)c("setTimeoutAcrossTransitions")(function(){m()},h);else{m();return}})["catch"](m);j(m)});return i}};f.exports=k}),null);
__d("BrowserProfiler",[],(function a(b,c,d,e,f,g){var h={isEnabled:function i(){return this.isAvailable()},isAvailable:function i(){return!!window.facebookLowLevelProfiler},getProfile:function i(j){window.facebookLowLevelProfiler.getData(function(k){j(k)})},notifyTracePosted:function i(j,k){window.facebookLowLevelProfiler.notifyTracePosted(j,k)}};f.exports=h}),null);
__d("ReactSpeedHelper",["LogBuffer","ReactDOM"],(function a(b,c,d,e,f,g){var h={enableRenderMeasurements:function i(){if(!c("ReactDOM").enableRenderMeasurements)return;c("ReactDOM").enableRenderMeasurements()},getMetrics:function i(j,k){return c("LogBuffer").read("react_speed").filter(function(l){return(j==null||l.begin>=j)&&(k==null||l.end<=k)})}};f.exports=h}),null);
__d("sourceMetaToString",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i,j){__p&&__p();var k;if(i.name){k=i.name;if(i.module)k=i.module+"."+k}else if(i.module)k=i.module+".<anonymous>";if(j&&i.line){k=(k?k:"<anonymous>")+":"+i.line;if(i.column)k+=":"+i.column}return k}f.exports=h}),null);
__d("TimeSliceHelper",["LogBuffer","Map","ProfilingCounters","ProfilingCountersStore","ReactSpeedHelper","sourceMetaToString"],(function a(b,c,d,e,f,g){__p&&__p();var h=function h(o,p){return Math.round((o-p)*1e3)},i={counterFunction:function o(p){return c("ProfilingCountersStore").getNestedTotals(p)}};function j(o,p,q,r){__p&&__p();var s=p.counterFunction,t=void 0;if(q.guard){var u=c("sourceMetaToString")(q),v=q.guard.toString();t=u?v+" at "+u:v}else t=q.desc;var w=r!=null?s(r):null,x={begin:q.begin,end:q.end,name:t,id:q.id,counters:w,isEdgeContinuation:q.isEdgeContinuation};if(q.parentID&&q.parentID!==q.id)x.parentID=q.parentID;o.push(x)}function k(o,p,q){var r=p.counterFunction,s={begin:q.begin,end:q.end,name:"JS["+q.count+"]",counters:r(c("ProfilingCounters").wrapInSingleContext(q.contextsToBeMerged))};o.push(s)}function l(o,p){var q=p.indirectParentID,r=p.id,s=p.isEdgeContinuation;if(q!=null){var t=o.get(q),u=void 0;s=s;if(t!=null)u={indirectParentID:t.indirectParentID,isEdgeContinuation:s&&t.isEdgeContinuation};else u={indirectParentID:q,isEdgeContinuation:s};o.set(r,u)}}function m(o,p){__p&&__p();var q=p.indirectParentID,r=p.isEdgeContinuation,s=p.id;if(q!=null&&q!==s){var t=o.get(q);if(t!=null){q=t.indirectParentID;r=t.isEdgeContinuation&&r}return babelHelpers["extends"]({},p,{parentID:q,isEdgeContinuation:r})}return p}var n={formatMetricsForTransport:function o(p){__p&&__p();var q=[],r=[],s=[],t=new(c("Map"))(),u=new(c("Map"))(),v=0,w=function w(y,z,A){var B=void 0;if(z.has(y))B=z.get(y);else{B=A.length;z.set(y,B);A.push(y)}return B},x=[];if(p!=null)p.forEach(function(y){__p&&__p();var z=y.begin,A=y.end,B=y.name,C=y.id,D=y.counters,E=y.parentID,F=y.isEdgeContinuation,G=h(z,v),H=h(A,z);v=A;var I=w(B,t,q),J=[G,H,I],K=D||{},L=Object.keys(K).filter(function(P){return K[P]!==0}).sort(),M=void 0;if(L.length>0){var N=L.join(),O=w(N,u,s);M=L.map(function(B){return K[B]});M.unshift(O)}else M=[];if(C)J.push(C);if(E){J.push(E);J.push(F)}x.push(J);r.push(M)});return{version:"compact",items:x,names:q,counters:r,counterSchemas:s}},getMetrics:function o(p,q,r,s,t,u){var v=function v(w,x){var y=x.end-x.begin<r,z=w&&x.begin-w.end<s&&y;return{shouldMergeIntoCurrentMerge:z,shouldFlushCurrentThenNewMerge:y}};return this.getCustomMergeMetrics(p,q,v,t,u)},getCustomMergeMetrics:function o(p,q,r,s,t){__p&&__p();var u;if(t==null)t=i;else t=babelHelpers["extends"]({},i,t);var v=function v(K){var L=K.id;return L&&s[L]?s[L]:null},w=[],x=j.bind(undefined,w,t),y=k.bind(undefined,w,t),z=c("LogBuffer").read("time_slice"),A=c("LogBuffer").read("time_slice_heartbeat");if(z.length>0)(function(){var K=Math.max.apply(null,z.map(function(L){return L.id}));A.forEach(function(L){return L.id+=K})})();var B=c("ReactSpeedHelper").getMetrics().map(function(K){return babelHelpers["extends"]({},K,{desc:"React["+K.name+"]"})}),C=z.concat(A,B),D=void 0,E=new(c("Map"))(),F=l.bind(undefined,E),G=m.bind(undefined,E),H=function H(){if(D)if(D.count>1)y(D);else x(G(D.first),v(D.first));D=null},I=C.sort(function(K,L){if(K.begin!==L.begin)return K.begin-L.begin;else if(K.end!==L.end)return K.end-L.end;else return 0}).filter(function(K){return(p==null||K.end>=p)&&(q==null||K.begin<=q)});if(I.length>0&&!I[0].representsExecution&&I[0].begin<p){var J=I[0];I[0]=babelHelpers["extends"]({},J,{begin:p})}I.forEach(function(K){__p&&__p();var L=r(D,K),M=L.shouldMergeIntoCurrentMerge,N=L.shouldFlushCurrentThenNewMerge,O=v(K);if(D&&M){D.end=K.end;D.count++;if(O)D.contextsToBeMerged.push(O);if(D.count===2)F(D.first);F(K)}else if(N){H();var P=[];if(O)P.push(O);D={begin:K.begin,end:K.end,count:1,first:K,contextsToBeMerged:P}}else if(!N){H();x(G(K),O)}});H();return w}};f.exports=n}),null);
__d("getFirstPaint",["performance"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){var i=void 0;if(c("performance")&&c("performance").timing)if(window.chrome&&window.chrome.loadTimes){var j=window.chrome.loadTimes();i=parseInt(j.firstPaintTime*1e3,10)}else if(typeof c("performance").timing.msFirstPaint==="number")i=c("performance").timing.msFirstPaint;return i||null}f.exports=h}),null);
__d("ArtilleryLogger",["Arbiter","ArtilleryExperiments","ArtilleryLoggerType","ArtilleryOnUntilOffLogging","ArtillerySWDataCollector","AsyncProfiler","Banzai","BigPipe","BigPipeExperiments","BrowserProfiler","Heartbeat","ImageTimingHelper","Map","NavigationMetrics","NavigationTimingHelper","PageletEventsHelper","ProfilingCountersStore","ResourceTimingBootloaderHelper","SnappyCompress","TimeSliceHelper","TimeSliceInteraction","forEachObject","pageLoadedViaSWCache","performance","performanceAbsoluteNow","getFirstPaint"],(function aa(ba,a,ca,da,b,ea){__p&&__p();var c=a("BigPipeExperiments").link_images_to_pagelets,d=a("ArtilleryExperiments").artillery_static_resources_pagelet_attribution,e=a("ArtilleryExperiments").artillery_timeslice_compressed_data,f=a("ArtilleryExperiments").artillery_miny_client_payload,g="generation_time",h="__user_annotations",fa="serviceworker_trace",i="serviceworker",j="first_paint",ga="browser_profile",k="sampler_profile",l="user_timing_profile",m="artillery_logger_data",n="artillery_browser_perf_data",o=new(a("Map"))(),p=new(a("Map"))(),q=false,r=new(a("Map"))(),s=new(a("Map"))();function t(){return a("performance")&&a("performance").timing&&a("performance").timing.navigationStart}function u(E){if(!o.has(E))o.set(E,{})}function v(E){E.subscribe(a("BigPipe").Events.tti,function(F,G){var H=G.ts,I=G.lid,J=G.metrics;u(I);var K=o.get(I);K.t_bigpipe_tti=H;a("forEachObject")(J,function(L,M){K[M]=L})})}function w(E){E.subscribe(a("BigPipe").Events.displayed,function(F,G){var H=G.ts,I=G.lid;u(I);o.get(I).t_marker_all_pagelets_displayed=H;a("Heartbeat").disablePageHeartbeat();a("ArtillerySWDataCollector").collect().done(function(J){if(J)s.set(I,J)})})}function x(E){E.subscribe(a("BigPipe").Events.loaded,function(F,G){var H=G.ts,I=G.lid;u(I);o.get(I).t_marker_bigpipe_e2e=H})}function y(E,F){__p&&__p();if(!E)return;if(F.profile){var G=C(F.profile);if(G!==null){F.profile=G;F.snappy=true}}var H={clientData:E,browserPerfData:F,traceType:"pageload"};a("Banzai").post(n,H,a("Banzai").VITAL);a("BrowserProfiler").notifyTracePosted(H.clientData.traceID,H.traceType)}function z(E,F,G){var H,I=G;if(a("BrowserProfiler").isEnabled()&&p.has(I))(function(){var J=p.get(I);window.requestIdleCallback(function(){a("BrowserProfiler").getProfile(function(K){y(J,K)})})})();A(E,F,G)}function A(E,F,G){__p&&__p();var H,I=a("performanceAbsoluteNow")(),J=G;if(!p.has(J)||!o.has(J))return;var K=o.get(J);K.uploadType=a("ArtilleryLoggerType").FULL_UPLOAD;ja(K);B();var L=a("performanceAbsoluteNow")(),M=null;if(E==="normal"){M=0;K.navigation_timing=a("NavigationTimingHelper").getNavTimings()}else if(E==="quickling"&&a("performance").getEntriesByName){var N=a("performance").getEntriesByName(F);K.navigation_timing=a("NavigationTimingHelper").getAsyncRequestTimings(F);if(N.length)M=N[0].startTime}var O=a("ArtilleryOnUntilOffLogging").finish(),P=O.sampleRecorder,ma=O.profilingCountersData,Q=O.userTimingPerfData;if(M!=null&&t()){var R=M+a("performance").timing.navigationStart;K.resource_timing_bootloader=a("ResourceTimingBootloaderHelper").getMetrics(R,c,J).data;var S=a("TimeSliceHelper").getMetrics(R,K.t_onload,1,1,a("ProfilingCountersStore").toMap(ma));if(e)K.time_slice=a("TimeSliceHelper").formatMetricsForTransport(S);else K.time_slice=S;K.extra_points=a("TimeSliceInteraction").getPageLoadPoints(R,L);K.interaction_ids=a("TimeSliceInteraction").getInteractionIDsBetween(R,L)}K.pagelet_events=a("PageletEventsHelper").getMetrics(J);if(!d&&K.pagelet_events){if(K.pagelet_events.display_resources)delete K.pagelet_events.display_resources;if(K.pagelet_events.all_resources)delete K.pagelet_events.all_resources}la(J);ka(K);var T=babelHelpers["extends"]({},K,p.get(J).data),U=s.get(J);if(E==="normal"&&U!=null)T[i]=U.workerPerf;if(E==="normal")T[j]=a("getFirstPaint")();if(r.size){T[h]={};r.forEach(function(W,X){T[h][X]=W})}p["delete"](J);o["delete"](J);if(f)(function(){__p&&__p();var W=["resource_timing_bootloader","pagelet_events"],X={};W.forEach(function(Y){var Z=T[Y];if(Z==null)return;var na=JSON.stringify(Z),$=C(na);if($!==null){X[Y]=$;delete T[Y]}});T.miny=X})();T[g]=a("performanceAbsoluteNow")()-I;if(Q&&t())T[l]=babelHelpers["extends"]({navStart:a("performance").timing.navigationStart},Q);var V=function V(){return a("Banzai").post(m,T,a("Banzai").VITAL)};if(P!==null&&P!==undefined)a("AsyncProfiler").stopRecording(P).then(function(W){T[k]=W;V()},function(W){setTimeout(function(){throw W},0);V()});else V()}function B(){__p&&__p();var E=navigator&&navigator.hardwareConcurrency;D.recordUserAnnotation("num_cores",E!=null?E.toString():"unknown");if(navigator&&navigator.deviceMemory&&typeof navigator.deviceMemory==="number")D.recordUserAnnotation("ram_gb",navigator.deviceMemory.toString());if(navigator&&navigator.connection){if(typeof navigator.connection.downlink==="number")D.recordUserAnnotation("browser_downlink_megabits",navigator.connection.downlink.toString());if(typeof navigator.connection.rtt==="number")D.recordUserAnnotation("browser_rtt_ms",navigator.connection.rtt.toString());if(typeof navigator.connection.effectiveType==="string")D.recordUserAnnotation("browser_effective_connection_type",navigator.connection.effectiveType)}D.recordUserAnnotation("client_pixel_ratio_10x",((window.devicePixelRatio||1)*10).toString());D.recordUserAnnotation("is_sw_page_loaded_via_cache",a("pageLoadedViaSWCache")()?"1":"0");if(a("performance")&&a("performance").navigation)D.recordUserAnnotation("nav_type",ha(a("performance").navigation.type));D.recordUserAnnotation("images_preparsed",a("BigPipeExperiments").preparse_content&&a("BigPipeExperiments").preparse_content!=="off"?"1":"0")}function ha(E){switch(E){case 0:return"TYPE_NAVIGATE";case 1:return"TYPE_RELOAD";case 2:return"TYPE_BACK_FORWARD";case 255:return"TYPE_RESERVED";default:return"unknown navigation type"}}function ia(){a("NavigationMetrics").addListener(a("NavigationMetrics").Events.NAVIGATION_DONE,function(E,F){var G=F.pageType,H=F.pageURI,I=F.serverLID;z(G,H,I)})}function ja(E){var F;if(window.CavalryLogger)(function(){var G=window.CavalryLogger.getInstance(),H=["t_domcontent","t_pagelet_cssload_early_resources","t_tti","t_onload"];H.forEach(function(I){if(Object.prototype.hasOwnProperty.call(G.values,I))E[I]=G.values[I]})})()}function ka(E){if(window.CavalryLogger){var F=window.CavalryLogger.getInstance();a("ResourceTimingBootloaderHelper").mergeBootloaderMetricsAndResourceTimings(E.resource_timing_bootloader,F.bootloader_metrics,true)}}function la(E){var F=o.get(E);if(t()){var G=a("performance").timing.navigationStart,H=F.t_bigpipe_tti,I=F.t_marker_bigpipe_e2e,J=a("ImageTimingHelper").getImageTimings(E),K=a("ResourceTimingBootloaderHelper").getLastTTIAndE2EImageResponseEnds(H,I,J),L=K.TTI,M=K.E2E;if(!isNaN(L)&&L!==G)F.t_tti_with_images=L;if(!isNaN(M)&&M!==G)F.t_marker_bigpipe_e2e_with_images=M}}function C(E){if(window.Uint8Array===undefined||window.btoa===undefined)return null;var F=new window.Uint8Array(E.length);for(var G=0;G<E.length;G++)F[G]=E.charCodeAt(G);var H=a("SnappyCompress").compress(F),I="";for(var J=0;J<H.length;J++)I+=String.fromCharCode(H[J]);return window.btoa(I)}var D={enableProfilingWithClientData:function E(F,G,H){__p&&__p();u(F);p.set(F,{traceID:G,data:H});if(q)return;q=true;a("PageletEventsHelper").init();a("Arbiter").subscribe(a("BigPipe").Events.init,function(I,J){var K=J.arbiter;if(K){v(K);w(K);x(K)}});ia()},recordUserAnnotation:function E(F,G){var H=arguments.length<=2||arguments[2]===undefined?true:arguments[2];if(!H&&r.has(F))return false;r.set(F,G);return true}};b.exports=D}),null);