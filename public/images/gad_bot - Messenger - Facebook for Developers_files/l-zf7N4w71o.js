if (self.CavalryLogger) { CavalryLogger.start_js(["\/nTcC"]); }

__d("DeveloperEventSurvey",["AsyncRequest"],(function a(b,c,d,e,f,g){"use strict";var h={init:function i(j,k,l){k.subscribeSurveyFinished(function(){j.hide();new(c("AsyncRequest"))().setURI(l).send()})}};f.exports=h}),null);
__d("DialogExpansion",["Animation","DialogPosition","LoadingDialogDimensions","Style"],(function a(b,c,d,e,f,g){__p&&__p();var h=400,i=100;function j(k){"use strict";this._dialog=k;this._fixedTopMargin=k.getFixedTopPosition();this._ignoreFixedTopInShortViewport=k.shouldIgnoreFixedTopInShortViewport()}j.prototype.enable=function(){"use strict";this._subscription=this._dialog.subscribe("aftershow",this._onAfterShow.bind(this))};j.prototype.disable=function(){"use strict";this._subscription.unsubscribe();this._subscription=null};j.prototype.setTargetWidth=function(k){"use strict";this._targetWidth=k};j.prototype._onAfterShow=function(){"use strict";__p&&__p();this._outer=this._dialog.getContentRoot();this._inner=this._dialog.getInnerContent();if(isNaN(parseInt(c("Style").get(this._inner,"height"),10)))return;var k=this._getWidth(),l=this._getHeight(),m=c("DialogPosition").calculateTopMargin(k,l);c("Style").apply(this._inner,{opacity:"0",width:this._dialog.getWidth()+"px"});c("Style").apply(this._outer,{width:k+"px",height:l+"px",marginTop:m+"px",overflow:"hidden"});setTimeout(function(){var n=parseInt(this._dialog.getWidth(),10);if(this._targetWidth)n=this._targetWidth;var o=parseInt(c("Style").get(this._inner,"height"),10),p=c("DialogPosition").calculateTopMargin(n,o,this._fixedTopMargin,this._ignoreFixedTopInShortViewport);this._growThenFade(n,o,p)}.bind(this),100)};j.prototype._growThenFade=function(k,l,m){"use strict";new(c("Animation"))(this._outer).to("width",k).to("height",l).to("marginTop",m).duration(h).ease(c("Animation").ease.both).ondone(this._fadeIn.bind(this)).go()};j.prototype._fadeIn=function(){"use strict";c("Style").set(this._outer,"overflow","");c("Style").set(this._outer,"height","");new(c("Animation"))(this._inner).from("opacity",0).to("opacity",1).ondone(function(){c("Style").set(this._inner,"opacity","1");c("Style").set(this._inner,"width","");this._dialog.inform("afterexpand")}.bind(this)).duration(i).go()};j.prototype._getWidth=function(){"use strict";return c("LoadingDialogDimensions").WIDTH};j.prototype._getHeight=function(){"use strict";return c("LoadingDialogDimensions").HEIGHT};f.exports=j}),null);