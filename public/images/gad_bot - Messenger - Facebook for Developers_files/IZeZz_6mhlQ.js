if (self.CavalryLogger) { CavalryLogger.start_js(["krWbU"]); }

__d("DeveloperDialogValidation",[],(function a(b,c,d,e,f,g){var h={init:function i(j){this._dialog=j;j.subscribe("success",this._handleSuccess.bind(this))},_handleSuccess:function i(j,k){var l=k.getData(),m=l.response.payload;if(m!==null&&m.success)this._dialog.hide()}};f.exports=h}),null);