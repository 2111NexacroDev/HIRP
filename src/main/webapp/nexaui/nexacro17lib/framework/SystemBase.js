//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.1.html
//
//==============================================================================


if (!this.nexacro) {
	this.nexacro = {
	};
}

if (!this.nexacro_init) {
	this.nexacro_init = {
	};
}


if (!nexacro._Init_systembase) {
	"use strict";

	if (nexacro.__proto__) {
		nexacro._createPrototype = function (super_fn, constructor_fn) {
			var ptype = new Object();
			if ((typeof super_fn) == "function") {
				ptype.__proto__ = super_fn.prototype;
				if (constructor_fn) {
					ptype.constructor = constructor_fn;
				}
			}
			return ptype;
		};
	}
	else {
		nexacro._createPrototype = function (super_fn, constructor_fn) {
			if ((typeof super_fn) == "function") {
				var F = function F () {
				}
;
				F.prototype = super_fn.prototype;
				var ptype = new F();
				if (constructor_fn) {
					ptype.constructor = constructor_fn;
				}
				return ptype;
			}
			return new Object();
		};
	}

	var _process = true;
	nexacro._Init_systembase = true;

	nexacro._Browser = "";
	nexacro._BrowserVersion = -1;
	nexacro._BrowserType = "";

	if (nexacro.__getOSType) {
		nexacro._Browser = "Runtime";
		nexacro._BrowserVersion = 17;
		nexacro._BrowserType = "Runtime";
	}
	else {
		if (navigator.appVersion.indexOf('MSIE') > -1) {
			nexacro._Browser = "IE";
			if (document.documentMode) {
				nexacro._BrowserVersion = document.documentMode;
				if (/Trident\/7.0/.test(navigator.appVersion)) {
					nexacro._BrowserType = "IE11";
				}
				else if (/Trident\/6.0/.test(navigator.appVersion)) {
					nexacro._BrowserType = "IE10";
				}
				else if (/Trident\/5.0/.test(navigator.appVersion)) {
					nexacro._BrowserType = "IE9";
				}
				else if (/Trident\/4.0/.test(navigator.appVersion)) {
					nexacro._BrowserType = "IE8";
				}
				else {
					nexacro._BrowserType = nexacro._Browser + nexacro._BrowserVersion;
				}
			}
			else {
				var compatMode = document.compatMode;
				if (compatMode && compatMode.toLowerCase() == "backcompat") {
					if (/MSIE\s+7(.+)[;]/.test(navigator.appVersion)) {
						nexacro._BrowserVersion = 7;
						nexacro._BrowserType = "IE7";
					}
					else if (/MSIE\s+6(.+)[;]/.test(navigator.appVersion)) {
						nexacro._BrowserVersion = 6;
						nexacro._BrowserType = "IE6";
					}
					else if (/MSIE\s+5(.+)[;]/.test(navigator.appVersion)) {
						nexacro._BrowserVersion = 5;
						nexacro._BrowserType = "IE6";
					}
				}
				compatMode = null;
			}
		}
		else if (navigator.userAgent.match(/Trident\/.*rv\:(.+?)[\);]/)) {
			nexacro._Browser = "IE";
			if (document.documentMode) {
				nexacro._BrowserVersion = document.documentMode;
				if (/Trident\/7.0/.test(navigator.appVersion)) {
					nexacro._BrowserType = "IE11";
				}
				else {
					nexacro._BrowserType = nexacro._Browser + nexacro._BrowserVersion;
				}
			}
			else {
				nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
			}
		}
		else if (navigator.userAgent.match(/Edge/)) {
			nexacro._Browser = "Edge";
			nexacro._BrowserType = "Edge";
			/Edge\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
		else if (navigator.userAgent.match(/Edg/)) {
			nexacro._Browser = "Edge";
			nexacro._BrowserType = "WebKit";
			/Edg\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
		else if (navigator.userAgent.match(/Chrome/)) {
			nexacro._Browser = "Chrome";
			nexacro._BrowserType = "WebKit";
			/Chrome\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;

			if (navigator.userAgent.match(/Samsung/)) {
				nexacro._BrowserExtra = "SamsungBrowser";
			}
			else if (navigator.userAgent.match(/NAVER/)) {
				nexacro._BrowserExtra = "NaverBrowser";
			}
			if (navigator.userAgent.match(/XiaoMi/)) {
				nexacro._BrowserExtra = "MiuiBrowser";
			}
		}
		else if (navigator.userAgent.match(/CriOS/)) {
			nexacro._Browser = "Chrome";
			nexacro._BrowserType = "WebKit";
			/CriOS\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;

			if (navigator.userAgent.match(/Samsung/)) {
				nexacro._BrowserExtra = "SamsungBrowser";
			}
		}
		else if (!!window.opera || navigator.userAgent.match(/Opera/) || navigator.userAgent.match(/OPR/)) {
			nexacro._Browser = "Opera";
			nexacro._BrowserType = "Opera";
			/Version\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
		else if (navigator.userAgent.match(/Apple.*Mobile/) || (navigator.platform == "MacIntel" && navigator.maxTouchPoints > 0)) {
			nexacro._Browser = "MobileSafari";
			nexacro._BrowserType = "WebKit";
			nexacro._BrowserVersion = parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)
				
				 || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || -1;
		}
		else if (navigator.userAgent.match(/AppleWebKit\//)) {
			nexacro._Browser = "Safari";
			nexacro._BrowserType = "WebKit";
			/Version\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
		else if (navigator.userAgent.match(/WebKit\//)) {
			nexacro._Browser = "WebKit";
			nexacro._BrowserType = "WebKit";
			/WebKit\/([\.\d]+)/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
		else if (navigator.userAgent.match(/Gecko\//)) {
			nexacro._Browser = "Gecko";
			nexacro._BrowserType = "Gecko";
			/rv\:(.+?)[\);]/.test(navigator.userAgent);
			nexacro._BrowserVersion = parseInt(RegExp.$1) | 0;
		}
	}
	nexacro.Version = "17";
	nexacro._framework_libpath = "./nexacro17lib";

	nexacro._dontenum_descriptor = {
		"writable" : true, 
		"enumerable" : false
	};
	nexacro._dontwritableenum_descriptor = {
		"writable" : false, 
		"enumerable" : false
	};

	nexacro._zindex_popup = 1e6 + 1;
	nexacro._zindex_firstmodal = 1e6 + 2;
	nexacro._zindex_waitcursor = 2e6;
	nexacro._zindex_hide = -2e6;

	nexacro._zoom_factor = 0;
	nexacro._curscreenzoomfactortype = "portrait";

	nexacro._allow_default_pinchzoom = false;

	nexacro._project_absolutepath = "";
	nexacro._comm_contextlist = [];
	nexacro._use_firefirstcount = false;
	nexacro._use_progress_data = true;
	nexacro._interval_onprogress_timer = 10;
	nexacro._touch_velocity_adjust_ratio = 3;


	nexacro.ExportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL2010 : 0x0400, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500, 
		TXT : 0x0510
	};

	nexacro.ImportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL : 0x0420, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500, 
		TXT : 0x0510
	};

	nexacro.ExportItemTypes = 
		{
		GRID : 0x0100
	};

	nexacro.DragDataFormats = 
		{
		FILEDROP : "filedrop", 
		TEXT : "text", 
		UNICODETEXT : "unicodetext", 
		CSV : "csv"
	};

	nexacro.DevicePermissionStatus = 
		{
		DENIED : 0, 
		GRANTED : 1
	};

	nexacro.DevicePermissionType = 
		{
		CALENDAR : "calendar", 
		CAMERA : "camera", 
		CONTACTS : "contacts", 
		LOCATION : "location", 
		MICROPHONE : "microphone", 
		PHONE : "phone", 
		SMS : "sms", 
		STORAGE : "storage", 
		PHOTO : "photo", 
		REMINDERS : "reminders"
			
	};

	nexacro.XPushAction = 
		{
		AUTH : 0, 
		BYEC : 1, 
		ADDF : 2, 
		DELF : 3, 
		REQD : 4, 
		RECT : 5, 
		RGST : 6, 
		UNRG : 7, 
		ADUI : 8, 
		UNUI : 9, 
		MSGC : 10
	};

	nexacro._datatyperule = "1.0";
	nexacro._getDatatypeRule = function () {
		var enum_v = ["1.0", "2.0"];
		var v = nexacro._datatyperule;
		if (enum_v.indexOf(v) > -1) {
			return v;
		}

		return "1.0";
	};

	nexacro._trigger_type_table = 
		{
		"Click" : "onclick", 
		"Row Change" : "onrowposchanged", 
		"Value Change" : "oncolumnchanged", 
		"External Input" : "onextendedcommand", 
		"Action Success" : "onsuccess", 
		"Action Fail" : "onerror", 
		"Model Load Success" : "onmodelloadsuccess", 
		"Model Load Fail" : "onmodelloadfail", 
		"Form Init" : "onload"
	};

	nexacro._cache_edit_set = [];
	nexacro._cache_textarea_set = [];
	nexacro._cache_inputelement_set = [];
	nexacro._cache_textareaelement_set = [];
	nexacro._locale_unicode = {
	};

	nexacro._edit_user_override_func = ["on_deactivate_process", "on_keydown_basic_before_process", "on_keydown_basic_specialkey_process", "on_keydown_basic_process", "on_keydown_default_before_process", "on_keydown_default_specialkey_process", "on_keydown_default_process", "on_keypress_basic_before_process", "on_keypress_basic_specialkey_process", "on_keypress_basic_process", "on_keyinput_basic_before_process", "on_keyinput_basic_process", "on_beforeinput_process_with_HTMLEvent", "on_beforeinput_process_with_NexacroInputEvent", "on_killfocus_basic_process"];

	nexacro._inputelement_user_override_func = ["on_apply_ime_environment_process", "on_apply_force_imeSet", "on_updateEvtOrder_process", "setCompositionComplete_process", "setCompositionCancel_process", "on_sys_keydown_before_process", "on_sys_keydown_specialkey_process", "on_sys_keydown_process", "on_sys_keyup_before_process", "on_sys_keyup_specialkey_process", "on_sys_keyup_process", "on_sys_keypress_before_process", "on_sys_keypress_specialkey_process", "on_sys_keypress_process", "on_sys_beforeinput_forward_before_process", "on_sys_beforeinput_forward_process", "on_sys_propertychange_before_process", "on_sys_propertychange_process", "on_sys_keyinput_before_process", "on_sys_keyinput_process", "on_sys_compositionstart_process", "on_sys_compositionupdate_process", "on_sys_compositionend_process", "on_sys_touchstart_process", "on_sys_touchend_process", "on_sys_paste_before_process", "on_complete_composition_value_process"];



	nexacro._defineImeLocaleEdit = function (locale, obj) {
		if (obj.Edit) {
			nexacro._cache_edit_set[locale] = obj.Edit;
		}
		if (obj.TextArea) {
			nexacro._cache_textarea_set[locale] = obj.TextArea;
		}
		if (obj.InputElement) {
			nexacro._cache_inputelement_set[locale] = obj.InputElement;
		}
		if (obj.TextAreaElement) {
			nexacro._cache_textareaelement_set[locale] = obj.TextAreaElement;
		}
	};

	nexacro._addImeLocaleInfo = function (locale, range) {
		nexacro._locale_unicode[locale] = range;
	};

	nexacro.sort_locale_unicode = function () {
		for (var i = 0, n = nexacro._locale_unicode.length; i < n; i++) {
			nexacro._locale_unicode[i]["range"].begin.sort();
			nexacro._locale_unicode[i]["range"].end.sort();
		}
	};

	nexacro._settracemsg = function (e) {
		return;
	};

	nexacro.FuncBinder = function (pthis, fn) {
		this.pthis = pthis;
		this.fn = fn;
	};
	var _pFuncBinder = nexacro._createPrototype(Object, nexacro.FuncBinder);
	nexacro.FuncBinder.prototype = _pFuncBinder;

	_pFuncBinder.call = function () {
		var fn = this.fn;
		if (fn) {
			return fn.apply(this.pthis, arguments);
		}
	};

	nexacro.SetterBinder = function (pthis, prop, fn) {
		this.pthis = pthis;
		this.prop = prop;
		this.fn = fn;
	};
	var _pSetterBinder = nexacro._createPrototype(Object, nexacro.SetterBinder);
	nexacro.SetterBinder.prototype = _pSetterBinder;

	_pSetterBinder.set = function (val) {
		this.fn.call(this.pthis, val);
		return val;
	};
	_pSetterBinder.addset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] + val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.subset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] - val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.mulset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] *  val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.divset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] / val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.modset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] % val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.andset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] & val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.orset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] | val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pSetterBinder.xorset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] ^ val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.lshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] << val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.rshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] >> val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.zrshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] >>> val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pSetterBinder.preInc = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, ++val);
		return val;
	};
	_pSetterBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, --val);
		return val;
	};
	_pSetterBinder.postInc = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, +val + 1);
		return val;
	};
	_pSetterBinder.postDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, +val - 1);
		return val;
	};

	nexacro.IntSetterBinder = function (pthis, prop, fn) {
		this.pthis = pthis;
		this.prop = prop;
		this.fn = fn;
	};
	var _pIntSetterBinder = nexacro._createPrototype(Object, nexacro.IntSetterBinder);
	nexacro.IntSetterBinder.prototype = _pIntSetterBinder;

	_pIntSetterBinder.set = function (val) {
		this.fn.call(this.pthis, val);
		return val;
	};
	_pIntSetterBinder.addset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) + (val | 0);
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.subset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) - val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.mulset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) *  val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.divset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) / val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.modset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) % val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.andset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) & val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.orset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) | val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pIntSetterBinder.xorset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) ^ val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.lshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) << val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.rshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) >> val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.zrshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) >>> val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pIntSetterBinder.preInc = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, ++val);
		return val;
	};
	_pIntSetterBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, --val);
		return val;
	};
	_pIntSetterBinder.postInc = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, val + 1);
		return val;
	};
	_pIntSetterBinder.postDec = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, val - 1);
		return val;
	};

	nexacro.PropBinder = function (pthis, prop) {
		this.pthis = pthis;
		this.prop = prop;
	};
	var _pPropBinder = nexacro._createPrototype(Object, nexacro.PropBinder);
	nexacro.PropBinder.prototype = _pPropBinder;

	_pPropBinder.set = function (val) {
		return (this.pthis[this.prop] = val);
	};
	_pPropBinder.addset = function (val) {
		return (this.pthis[this.prop] += val);
	};
	_pPropBinder.subset = function (val) {
		return (this.pthis[this.prop] -= val);
	};
	_pPropBinder.mulset = function (val) {
		return (this.pthis[this.prop] *= val);
	};
	_pPropBinder.divset = function (val) {
		return (this.pthis[this.prop] /= val);
	};
	_pPropBinder.modset = function (val) {
		return (this.pthis[this.prop] %= val);
	};
	_pPropBinder.andset = function (val) {
		return (this.pthis[this.prop] &= val);
	};
	_pPropBinder.orset = function (val) {
		return (this.pthis[this.prop] |= val);
	};
	_pPropBinder.xorset = function (val) {
		return (this.pthis[this.prop] ^= val);
	};
	_pPropBinder.lshset = function (val) {
		return (this.pthis[this.prop] <<= val);
	};
	_pPropBinder.rshset = function (val) {
		return (this.pthis[this.prop] >>= val);
	};
	_pPropBinder.zrshset = function (val) {
		return (this.pthis[this.prop] >= val);
	};

	_pPropBinder.preInc = function () {
		return ++this.pthis[this.prop];
	};
	_pPropBinder.preDec = function () {
		return --this.pthis[this.prop];
	};
	_pPropBinder.postInc = function () {
		return this.pthis[this.prop]++;
	};
	_pPropBinder.postDec = function () {
		return this.pthis[this.prop]--;
	};

	nexacro.NumPropBinder = function (pthis, prop) {
		this.pthis = pthis;
		this.prop = prop;
	};
	var _pNumPropBinder = nexacro._createPrototype(Object, nexacro.NumPropBinder);
	nexacro.NumPropBinder.prototype = _pNumPropBinder;

	_pNumPropBinder.set = function (val) {
		return (this.pthis[this.prop] = val);
	};
	_pNumPropBinder.addset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) + (val | 0));
	};
	_pNumPropBinder.subset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) - val);
	};
	_pNumPropBinder.mulset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) *  val);
	};
	_pNumPropBinder.divset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) / val);
	};
	_pNumPropBinder.modset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) % val);
	};
	_pNumPropBinder.andset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) & val);
	};
	_pNumPropBinder.orset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) | val);
	};
	_pNumPropBinder.xorset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) ^ val);
	};
	_pNumPropBinder.lshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) << val);
	};
	_pNumPropBinder.rshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) >> val);
	};
	_pNumPropBinder.zrshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) >>> val);
	};

	_pNumPropBinder.preInc = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = ++val;
		return val;
	};
	_pNumPropBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = --val;
		return val;
	};
	_pNumPropBinder.postInc = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = val + 1;
		return val;
	};
	_pNumPropBinder.postDec = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = val - 1;
		return val;
	};


	Object.prototype.getSetter = function (name) {
		return new nexacro.PropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(Object.prototype, "getSetter", {
				"value" : Object.prototype.getSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			nexacro._settracemsg(e);
		}
	}
	Object.prototype.getNumSetter = function (name) {
		return new nexacro.NumPropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(Object.prototype, "getNumSetter", {
				"value" : Object.prototype.getNumSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			nexacro._settracemsg(e);
		}
	}

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (item) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				if (this[i] == item) {
					return i;
				}
			}
			return -1;
		};
	}

	if (!Array.prototype.map) {
		Array.prototype.map = function (callback) {
			var T, A, k;

			if (this == null) {
				throw new TypeError('this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;

			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}

			if (arguments.length > 1) {
				T = arguments[1];
			}

			A = new Array(len);
			k = 0;

			while (k < len) {
				var kValue, mappedValue;

				if (k in O) {
					kValue = O[k];
					mappedValue = callback.call(T, kValue, k, O);
					A[k] = mappedValue;
				}
				k++;
			}
			return A;
		};
	}

	if (!Array.prototype.reduce) {
		Array.prototype.reduce = function (callback) {
			if (this == null) {
				throw new TypeError('Array.prototype.reduce called on null or undefined');
			}
			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}
			var t = Object(this), len = t.length >>> 0, k = 0, value;
			if (arguments.length == 2) {
				value = arguments[1];
			}
			else {
				while (k < len && !(k in t)) {
					k++;
				}
				if (k >= len) {
					throw new TypeError('Reduce of empty array with no initial value');
				}
				value = t[k++];
			}
			for (; k < len; k++) {
				if (k in t) {
					value = callback(value, t[k], k, t);
				}
			}
			return value;
		};
	}

	if (!Array.prototype.filter) {
		Array.prototype.filter = function (callback) {
			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof callback !== 'function') {
				throw new TypeError();
			}

			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i];

					if (callback.call(thisArg, val, i, t)) {
						res.push(val);
					}
				}
			}
			return res;
		};
	}


	nexacro._indexOf = function (arr, item) {
		if (arr == null) {
			return -1;
		}
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if (arr[i] == item) {
				return i;
			}
		}
		return -1;
	};

	nexacro._lastIndexOf = function (arr, item) {
		if (arr == null) {
			return -1;
		}
		var len = arr.length;
		for (var i = len; i > 0; i--) {
			if (arr[i - 1] == item) {
				return (i - 1);
			}
		}
		return -1;
	};
	if (!String.prototype.trim) {
		String.prototype.trim = function (v) {
			var len = this.length, s, e;
			if (v) {
				s = 0;
				e = len - 1;
				while (++s < len && this.charAt(s) == v) {
				}
				while (--e > s && this.charAt(e) == v) {
				}
				return this.substring(s, e + 1);
			}
			else {
				s = -1;
				e = len;
				var c;
				while (++s < len && ((c = this.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
					c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
					c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
				}
				while (--e > s && ((c = this.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
					c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
					c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
				}
				return this.substring(s, e + 1);
			}
		};
	}

	nexacro.replaceAll = function (str, orgStr, repStr) {
		return str.split(orgStr).join(repStr);
	};

	if (nexacro._Browser == "Runtime" || nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
		nexacro._replaceAll = function (str, orgStr, repStr) {
			return str.split(orgStr).join(repStr);
		};
	}
	else {
		nexacro._replaceAll = function (str, orgStr, repStr) {
			return str.replace(new RegExp(orgStr, "g"), repStr);
		};
	}

	String.prototype.padLeft = function (n, pad) {
		var t = [];
		if (n > this.length) {
			for (var i = 0, cnt = n - this.length; i < cnt; i++) {
				t.push(pad);
			}
		}
		t.push(this);
		return t.join('');
	};

	String.prototype.padRight = function (n, pad) {
		var t = [];
		t.push(this);
		if (n > this.length) {
			for (var i = 0, cnt = n - this.length; i < cnt; i++) {
				t.push(pad);
			}
		}
		return t.join('');
	};

	nexacro.getMatchedCount = function (str, fstr) {
		var cnt = 0;
		var len = str.length;
		if (len.length <= 0 || fstr.length <= 0) {
			return cnt;
		}

		var ret = str.match(RegExp('[' + fstr + ']', 'g'));
		if (ret) {
			cnt = ret.length;
		}

		return cnt;
	};

	nexacro.isNumeric = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 48 && v <= 57) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if (c >= 48 && c <= 57) {
					continue;
				}
				return false;
			}
			return true;
		}
		return false;
	};

	nexacro.isAlpha = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if ((v >= 65 && v <= 90) || (v >= 97 && v <= 122)) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
					continue;
				}
				return false;
			}
			return true;
		}
		return false;
	};

	nexacro.isAlphaNumeric = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if ((v >= 48 && v <= 57) || (v >= 65 && v <= 90) || (v >= 97 && v <= 122) || (v == 95)) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c == 95)) {
					continue;
				}
				return false;
			}
			return true;
		}
		return false;
	};

	nexacro.isSpace = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v == 32 || (v >= 9 && v <= 13) || 
				v == 160 || v == 5760 || v == 6158 || (v >= 8192 && v <= 8202) || 
				v == 8232 || v == 8233 || v == 8239 || v == 8287 || v == 12288) {
				return true;
			}
		}

		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c == 32 || (c >= 9 && c <= 13) || 
						c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
						c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	nexacro.isLower = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 97 && v <= 122) {
				return true;
			}
		}

		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c >= 97 && c <= 122) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	nexacro.isUpper = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 65 && v <= 90) {
				return true;
			}
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c >= 65 && c <= 90) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	if (nexacro._Browser == "Runtime" || nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
		nexacro.wrapQuote = function (str) {
			if (arguments.length === 0) {
				return "";
			}
			if (str == null) {
				return "\"" + str + "\"";
			}

			str = str + "";
			str = str.split(/\\/g).join("\\\\");
			str = str.split(/"/g).join("\\\"");

			return "\"" + str + "\"";
		};

		nexacro.stripQuote = function (v) {
			if (typeof (v) != "string") {
				return v + "";
			}

			if (v.length >= 2 && ((v.substr(0, 1) == "'" && v.substr(v.length - 1, 1) == "'") || (v.substr(0, 1) == '"' && v.substr(v.length - 1, 1) == '"'))) {
				v = v.substring(1, v.length - 1);
			}

			if (v.indexOf("\\") >= 0) {
				v = v.split(/\\\"/g).join("\"");
				v = v.split(/\\\\/g).join("\\");
				return v;
			}

			return v;
		};
	}
	else {
		(function () {
			var re_quot = /"/g, re_esc = /\\/g;
			var un_quot = /\\\"/g, un_esc = /\\\\/g;

			nexacro.wrapQuote = function (str) {
				if (arguments.length === 0) {
					return "";
				}
				if (str == null) {
					return "\"" + str + "\"";
				}

				str = str + "";
				str = str.replace(re_esc, "\\\\").replace(re_quot, "\\\"");

				return "\"" + str + "\"";
			};

			nexacro.stripQuote = function (v) {
				if (typeof (v) != "string") {
					return v + "";
				}

				if (v.length >= 2 && ((v.substr(0, 1) == "'" && v.substr(v.length - 1, 1) == "'") || (v.substr(0, 1) == '"' && v.substr(v.length - 1, 1) == '"'))) {
					v = v.substring(1, v.length - 1);
				}

				if (v.indexOf("\\") >= 0) {
					v = v.replace(un_quot, "\"").replace(un_esc, "\\");
					return v;
				}

				return v;
			};
		})();
	}

	nexacro.trimLeft = function (str, v) {
		var len = str.length, s = -1;
		if (v) {
			while (++s < len && str.charAt(s) == v) {
			}
			return str.substring(s, len);
		}
		else {
			var c;
			while (++s < len && ((c = str.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(s);
		}
	};

	nexacro.trimRight = function (str, v) {
		var len = str.length;
		var e = len;

		if (v) {
			while (e-- >= 0 && str.charAt(e) == v) {
			}
			return str.substring(0, e + 1);
		}
		else {
			var c;
			while (--e >= 0 && ((c = str.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(0, e + 1);
		}
	};

	nexacro.trim = function (str, v) {
		var len = str.length, s, e;
		if (v) {
			s = 0;
			e = len - 1;
			while (s < len && str.charAt(s) == v && ++s) {
			}
			while (e > s && str.charAt(e) == v && --e) {
			}
			return str.substring(s, e + 1);
		}
		else {
			s = -1;
			e = len;
			var c;
			while (++s < len && ((c = str.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			while (--e > s && ((c = str.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(s, e + 1);
		}
	};

	nexacro.toNumber = function (v, NaNval, pinfval, ninfval) {
		var n = (+v);

		if (n != n) {
			return (NaNval !== undefined) ? NaNval : n;
		}
		else if (n == Infinity) {
			return (pinfval !== undefined) ? pinfval : n;
		}
		else if (n == -Infinity) {
			return (ninfval !== undefined) ? ninfval : n;
		}
		return n;
	};

	nexacro.fromCharCode = function () {
		var ar = [];
		var len = arguments.length;
		var arlen;
		var str = "";
		var i, j;
		for (i = 0; i < len; i++) {
			ar = arguments[i].toString().split(",");
			arlen = ar.length;
			if (nexacro._isArray(ar)) {
				for (j = 0; j < arlen; j++) {
					str += String.fromCharCode(ar[j].trim());
				}
			}
			else {
				str += String.fromCharCode(ar);
			}
		}
		return str;
	};

	nexacro._getSSVUnitSeparator = function () {
		var environment = nexacro.getEnvironment();
		var str = nexacro.fromCharCode(environment.ssvunitseparator ? environment.ssvunitseparator : 0x1f);
		str = str.substr(0, 5);
		return str;
	};

	nexacro._getSSVRecordSeparator = function () {
		var environment = nexacro.getEnvironment();
		var str = nexacro.fromCharCode(environment.ssvrecordseparator ? environment.ssvrecordseparator : 0x1e);
		str = str.substring(0, 5);
		return str;
	};

	if (!Date.prototype.addMonth) {
		Date.prototype.addMonth = function (v) {
			return this.setMonth(this.getMonth() + v);
		};

		Date.prototype.addDate = function (v) {
			return this.setDate(this.getDate() + v);
		};

		Date.prototype.addHours = function (v) {
			return this.setHours(this.getHours() + v);
		};

		Date.prototype.addMilliseconds = function (v) {
			return this.setMilliseconds(this.getMilliseconds() + v);
		};

		Date.prototype.addMinutes = function (v) {
			return this.setMinutes(this.getMinutes() + v);
		};

		Date.prototype.addSeconds = function (v) {
			return this.setSeconds(this.getSeconds() + v);
		};

		Date.prototype.addYear = function (v) {
			return this.setFullYear(this.getFullYear() + v);
		};

		Date.prototype.getYear = function () {
			var y = this.getFullYear();
			if (1900 <= y && y <= 1999) {
				return (y - 1900);
			}
			return y;
		};
	}

	nexacro._pow_factors = [1e-30, 1e-29, 1e-28, 1e-27, 1e-26, 1e-25, 1e-24, 1e-23, 1e-22, 1e-21, 1e-20, 1e-19, 1e-18, 1e-17, 1e-16, 1e-15, 1e-14, 1e-13, 1e-12, 1e-11, 1e-10, 1e-9, 1e-8, 1e-7, 1e-6, 1e-5, 1e-4, 1e-3, 1e-2, 1e-1, 1, 1e+1, 1e+2, 1e+3, 1e+4, 1e+5, 1e+6, 1e+7, 1e+8, 1e+9, 1e+10, 1e+11, 1e+12, 1e+13, 1e+14, 1e+15, 1e+16, 1e+17, 1e+18, 1e+19, 1e+20, 1e+21, 1e+22, 1e+23, 1e+24, 1e+25, 1e+26, 1e+27, 1e+28, 1e+29, 1e+30];
	if (!nexacro.floor) {
		nexacro.floor = function (v, digit) {
			if (digit == undefined) {
				return Math.floor(v);
			}
			var p = nexacro._pow_factors[digit + 30];
			return Math.floor(v *  p) / p;
		};
	}

	if (!nexacro.ceil) {
		nexacro.ceil = function (v, digit) {
			if (digit == undefined) {
				return Math.ceil(v);
			}
			var p = nexacro._pow_factors[digit + 30];
			return Math.ceil(v *  p) / p;
		};
	}

	if (!nexacro.round) {
		nexacro.round = function (v, digit) {
			if (digit == undefined) {
				return Math.round(v);
			}
			var m, p = nexacro._pow_factors[digit + 30];

			if (digit && digit > 0) {
				m = (v *  p).toFixed(digit + 1);
			}
			else {
				m = (v *  p);
			}

			return Math.round(m) / p;
		};
	}

	if (!nexacro.parseDate) {
		if (nexacro._Browser == "Runtime" || nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
			nexacro.parseDate = function (date) {
				var ret;
				if (date && date.length > 0) {
					if (date.length > 10) {
						ret = nexacro._parseDatetime(date);
					}
					else {
						ret = Date.parse(date);
					}

					if (!ret) {
						ret = undefined;
					}
				}

				return ret;
			};
		}
		else {
			(function () {
				var ret;
				nexacro.parseDate = function (date) {
					if (date && date.length > 0) {
						if (date.length > 10) {
							ret = nexacro._parseDatetime(date);
						}
						else {
							ret = Date.parse(date);
						}

						if (!ret) {
							ret = undefined;
						}
					}

					return ret;
				};
			})();
		}

		nexacro._parseDatetime = function (datetime) {
			if (datetime.length > 0) {
				var parsedStr = "";
				if (datetime.length > 10 && (datetime[10] === "T" && datetime[5] !== "W" && datetime[datetime.length - 1] == "Z")) {
					datetime = datetime.replace("T", " ");
				}
				parsedStr = datetime.split(" ");
				if (parsedStr.length != 2) {
					return Date.parse(datetime);
				}
				var date = parsedStr[0];
				var time = parsedStr[1];
				var newdatetime = nexacro.parseDate(date);
				newdatetime += nexacro._parseTime(time);
				return newdatetime;
			}
			else {
				return undefined;
			}
		};
		nexacro._parseTime = function (time) {
			if (time.length > 0) {
				var parsedStr = "";
				parsedStr = time.split(":");
				var hour = parseInt(parsedStr[0]) | 0;
				var min = parseInt(parsedStr[1]) | 0;
				var sec = parsedStr[2];
				parsedStr = sec.split(".");
				sec = parseInt(parsedStr[0]) | 0;
				var strMillsec = "";
				if (parsedStr[1] != undefined) {
					strMillsec = parsedStr[1];
				}
				var len = strMillsec.length;
				for (var i = len; i < 3; i++) {
					strMillsec += "0";
				}
				var millsec = parseInt(strMillsec) | 0;
				var newtime = (hour *  3600 *  1000) + (min *  60 *  1000) + (sec *  1000) + millsec;
				return newtime;
			}
			else {
				return undefined;
			}
		};
	}

	nexacro._nexacroBind = function (_this, fn) {
		var retfn = function () {
			return fn.apply(_this, arguments);
		};
		retfn._bindthis = _this;
		return retfn;
	};

	if (nexacro._Browser == "Runtime") {
		nexacro._executeEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}
				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};

		nexacro._executeGlobalEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}
				return eval.call(null, evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};

		nexacro._executeScript = function (script, url) {
			try {
				return nexacro.__executeScript(url, script);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				script = null;
			}
		};
	}
	else if (nexacro._Browser == "Gecko") {
		nexacro._executeEvalStr = function (evalstr, url) {
			var err = null;
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}

				err = new Error('at eval script(' + url + ')');
				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url, err.lineNumber));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};

		nexacro._executeGlobalEvalStr = function (evalstr, url) {
			var err = null;
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}

				err = new Error('at eval script(' + url + ')');
				return eval.call(null, evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url, err.lineNumber));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};
		nexacro._executeScript = nexacro._executeGlobalEvalStr;
	}
	else {
		nexacro._executeEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}

				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};

		nexacro._executeGlobalEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//# sourceURL=" + encodeURI(url));
				}

				return eval.call(null, evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};
		nexacro._executeScript = nexacro._executeGlobalEvalStr;
	}

	nexacro._createInlineFunc = function (inline_expr, arglist) {
		var _fn_ = "_fn_ = function(";
		_fn_ += arglist.join(',');
		_fn_ += ") { ";
		_fn_ += "try { return " + inline_expr + "; } ";
		_fn_ += "catch(e) { return undefined; } };";
		_fn_ = nexacro._executeEvalStr(_fn_);
		return _fn_;
	};

	nexacro._emptyFn = function () {
	};

	nexacro._emptyFnExistReturn = function () {
		return null;
	};

	nexacro._echoFn = function (v) {
		return v;
	};

	nexacro._isBoolean = function (v) {
		return (v === true || v === false || v === "true" || v === "false");
	};

	nexacro._isNumber = function (v) {
		return (typeof (v) == "number");
	};

	nexacro._isInt = function (v) {
		if (typeof (v) == "number") {
			return (v == (v | 0));
		}
		return false;
	};

	nexacro._isString = function (v) {
		return typeof (v) == "string";
	};

	nexacro._isUndefined = function (v) {
		return (v === undefined);
	};

	nexacro._isNull = function (v) {
		return (v === undefined || v === null);
	};

	if (Array.isArray) {
		nexacro._isArray = function (v) {
			return Array.isArray(v);
		};
	}
	else {
		nexacro._isArray = function (v) {
			return (v instanceof Array);
		};
	}

	nexacro._isFunction = function (v) {
		return (typeof (v) == "function");
	};

	nexacro._isObject = function (v) {
		return (typeof (v) == "object");
	};

	nexacro._isDecimal = function (v) {
		return (v instanceof nexacro.Decimal);
	};

	nexacro._nvl = function (v, def) {
		return (v === undefined || v === null || v === "") ? def : v;
	};
	nexacro._parseInt = function (v, def) {
		if (v === undefined || v === null) {
			return def;
		}
		var ret = parseInt(v);
		return (isFinite(ret)) ? ret : def;
	};

	nexacro._toString = function (v) {
		if (v != null && typeof v == "object" && v.toString) {
			return v.toString();
		}

		return (v == null) ? "" : v + "";
	};

	nexacro._toInt = function (v) {
		var num = parseInt(v) | 0;

		return (isFinite(num)) ? num : undefined;
	};

	nexacro._toBoolean = function (v) {
		if (typeof v == "number") {
			return (v == v) && v != 0;
		}
		if (typeof v == 'string') {
			if (v == "false" || v == "NaN") {
				return false;
			}
			return (+v) != 0;
		}
		else if (v instanceof nexacro.Decimal) {
			v = (+v);
			return (v == v) && v !== 0;
		}
		else {
			return !!v;
		}
	};

	nexacro._convertPtToPx = function (ptsize) {
		ptsize = parseInt(ptsize) | 0;
		if (!isNaN(ptsize)) {
			return (ptsize *  (0.35146 / 25.4) *  96);
		}
		return null;
	};

	nexacro._convertPxToPt = function (pxsize) {
		pxsize = parseInt(pxsize) | 0;
		if (!isNaN(pxsize)) {
			return (pxsize / ((0.35146 / 25.4) *  96));
		}
		return null;
	};

	nexacro._isAbsolutePath = function (url) {
		if (!url) {
			return false;
		}

		var ch = url.charAt(0);
		if (ch == '/' || ch == '\\') {
			return true;
		}

		if (url.indexOf("::") >= 0) {
			return false;
		}

		if (url.substring(0, 8).toLowerCase() != "theme://" && url.indexOf(":\/") >= 0) {
			return true;
		}

		var format = nexacro._transImageBase64StringFormat(url, false, true);
		if (format) {
			return true;
		}

		return false;
	};

	if (nexacro._Browser == "Runtime" || nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
		nexacro._getBaseUrl = function (url) {
			if (!url) {
				return url;
			}
			url = url.split("\\").join("/");
			if (url.charAt(url.length - 1) != '/') {
				url = url.substring(0, url.lastIndexOf("/") + 1);
			}

			return url;
		};
	}
	else {
		(function () {
			var re_backslach = /\\/g;

			nexacro._getBaseUrl = function (url) {
				url = url.replace(re_backslach, "/");
				if (url.charAt(url.length - 1) != '/') {
					url = url.substring(0, url.lastIndexOf("/") + 1);
				}
				return url;
			};
		})();
	}

	nexacro._getURIValue = function (uristr) {
		if (uristr && uristr.substring(0, 4).toLowerCase() == "url(") {
			if (uristr.charAt(4) == "'" && uristr.charAt(uristr.length - 2) == "'") {
				uristr = uristr.substring(5, uristr.length - 2);
			}
			else if (uristr.charAt(4) == "\"" && uristr.charAt(uristr.length - 2) == "\"") {
				uristr = uristr.substring(5, uristr.length - 2);
			}
			else {
				uristr = uristr.substring(4, uristr.length - 1);
			}
			return nexacro.stripQuote(uristr);
		}
		return uristr;
	};

	nexacro.__uniqueIdNo = 0;
	nexacro.__getUniqueIdNo = function () {
		return nexacro.__uniqueIdNo++;
	};

	nexacro.Object = function (id, parent) {
		this.id = this.name = id || "";
		this.parent = parent || null;
	};

	var _pObject = nexacro._createPrototype(Object, nexacro.Object);
	nexacro.Object.prototype = _pObject;
	_pObject._type_name = "Object";


	_pObject._toString_str = "[object Object]";


	_pObject._is_array = false;
	_pObject._is_data = false;
	_pObject._is_event = false;
	_pObject._is_elelemt = false;
	_pObject._is_component = false;
	_pObject._is_context = false;
	_pObject._is_form = false;
	_pObject._is_frame = false;
	_pObject._is_window = false;
	_pObject._is_application = false;

	_pObject.destroy = function () {
		this.parent = null;
	};

	_pObject.set_id = function (id) {
		this.id = id;
	};

	_pObject.set_name = function (name) {
		this.name = name;
	};

	_pObject.toString = function () {
		return "[object " + this._type_name + "]";
	};

	_pObject.getSetter = function (name, fnname) {
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(_pObject, "getSetter", {
				"value" : _pObject.getSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			nexacro._settracemsg(e);
		}
	}

	_pObject.getNumSetter = function (name, fnname) {
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.IntSetterBinder(this, name, fn);
		}
		return new nexacro.NumPropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(_pObject, "getNumSetter", {
				"value" : _pObject.getNumSetter, 
				"writable" : false, 
				"enumerable" : false
			});
		}
		catch (e) {
			nexacro._settracemsg(e);
		}
	}

	nexacro.Collection = function () {
		this._idArray = [];
		this._idxMap = {
		};
		this.length = 0;
	};
	var _pCollection = nexacro._createPrototype(Object, nexacro.Collection);
	nexacro.Collection.prototype = _pCollection;
	_pCollection._type_name = "ObjectArray";

	_pCollection._is_array = true;

	_pCollection.toString = function () {
		return "[object " + this._type_name + "]";
	};


	_pCollection.get_id = function (idx) {
		return this._idArray[idx];
	};

	_pCollection.update_id = function (idx, newID) {
		var id_array = this._idArray;
		var oldID = id_array[idx];
		if (oldID != null && oldID != newID) {
			this[newID] = this[oldID];
			delete this[oldID];
			var idx_map = this._idxMap;
			idx_map[newID] = idx;
			delete idx_map[oldID];
			id_array[idx] = newID;
			return true;
		}
		return false;
	};

	_pCollection.indexOf = function (id) {
		return this._idxMap[id];
	};

	_pCollection.get_item = function (key) {
		return this[key];
	};
	_pCollection.set_item = function (key, val) {
		if (typeof (key) == "number") {
			var id = this._idArray[key];
			if (id != null) {
				return (this[id] = this[key] = val);
			}
		}
		else {
			var idx = this._idxMap[key];
			if (idx != null) {
				return (this[key] = this[idx] = val);
			}
		}
		return undefined;
	};

	_pCollection.getItem = function (key) {
		return this.get_item(key);
	};

	_pCollection.setItem = function (key, val) {
		var v = this.get_item(key);
		if (v) {
			return this.set_item(key, val);
		}
		else {
			return this.add_item(key, val);
		}
	};

	_pCollection.clear = function () {
		var id_array = this._idArray;
		var len = id_array.length;
		for (var i = 0; i < len; i++) {
			delete this[id_array[i]];
			delete this[i];
		}
		this._idArray = [];
		this._idxMap = {
		};
		this.length = 0;
	};

	_pCollection.add_item = function (id, obj) {
		var idx_map = this._idxMap;
		var idx = idx_map[id];
		if (idx != null) {
			this[id] = this[idx] = obj;
		}
		else {
			idx = this.length;
			this[id] = this[idx] = obj;
			this._idArray.push(id);
			this._idxMap[id] = idx;
			this.length = this._idArray.length;
		}
		return idx;
	};
	_pCollection.add = _pCollection.add_item;
	_pCollection.append = _pCollection.add_item;
	_pCollection.appendItem = _pCollection.add_item;

	_pCollection.delete_item = function (key) {
		var id_array = this._idArray;
		var idx_map = this._idxMap;
		var len = id_array.length - 1, i;

		if (typeof (key) == "number") {
			if (key >= 0 && key <= len) {
				var id = id_array[key];
				delete this[id];

				id_array.splice(key, 1);
				for (i = key; i < len; i++) {
					idx_map[id_array[i]] = i;
					this[i] = this[i + 1];
				}
				delete this[i];
				delete idx_map[id];

				this.length = id_array.length;
				return key;
			}
			return -1;
		}
		else {
			var idx = idx_map[key];
			if (idx != null) {
				delete this[key];

				id_array.splice(idx, 1);
				for (i = idx; i < len; i++) {
					idx_map[id_array[i]] = i;
					this[i] = this[i + 1];
				}
				delete this[i];
				delete idx_map[key];

				this.length = id_array.length;
				return idx;
			}
			return -1;
		}
	};
	_pCollection.remove = _pCollection.delete_item;
	_pCollection.remove_item = _pCollection.delete_item;

	_pCollection.insert_item = function (idx, id, obj) {
		idx = (idx | 0);
		var id_array = this._idArray;
		var idx_map = this._idxMap;
		var len = id_array.length;
		if (idx >= len || idx == -1) {
			return this.add_item(id, obj);
		}
		if (id in idx_map) {
			return this.set_item(idx, obj);
		}

		this[id] = obj;
		id_array.splice(idx, 0, id);
		len++;
		for (var i = len - 1; i >= idx + 1; i--) {
			idx_map[id_array[i]] = i;
			this[i] = this[i - 1];
		}
		this[idx] = obj;
		idx_map[id] = idx;
		this.length = len;
		return idx;
	};
	_pCollection.insert = _pCollection.insert_item;

	_pCollection.destroy = function () {
		var id_array = this._idArray;
		var len = id_array.length;
		for (var i = 0; i < len; i++) {
			this[id_array[i]] = null;
			this[i] = null;
		}
		this._idArray = null;
		this._idxMap = null;
		this.length = 0;
	};

	_pCollection.set_length = nexacro._emptyFn;

	nexacro.Error = function (name, except) {
		this.id = this.name = name;
		this.except = except;
	};
	var _pError = nexacro._createPrototype(nexacro.Object, nexacro.Error);
	nexacro.Error.prototype = _pError;

	_pError._type_name = "Error";

	_pError.toString = function () {
		return this.name + ": " + this.except;
	};

	nexacro._GetSystemErrorMsg = function () {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		args = Array.prototype.slice.call(arguments, 1);
		var errormsg = nexacro._getErrorMessge.apply(this, args);

		return errormsg;
	};
	nexacro._EventSinkObject = function (id, parent) {
		nexacro.Object.call(this, id, parent);
	};

	var _pEventSinkObject = nexacro._createPrototype(nexacro.Object, nexacro._EventSinkObject);
	nexacro._EventSinkObject.prototype = _pEventSinkObject;
	_pEventSinkObject._type_name = "EventSinkObject";

	_pEventSinkObject._event_list = {
	};
	_pEventSinkObject._loading_event_list = null;
	_pEventSinkObject._created_event_list = null;

	_pEventSinkObject.on_created = nexacro._emptyFn;

	_pEventSinkObject.destroy = function () {
		nexacro.Object.prototype.destroy.call(this);

		this._clearEventListeners();

		this._event_list = null;
		this._loading_event_list = null;
		this._created_event_list = null;
	};

	_pEventSinkObject.addEvent = function (eventid) {
		if (this._event_list && !this._event_list[eventid]) {
			this._event_list[eventid] = 1;
			return true;
		}
		return false;
	};

	_pEventSinkObject.removeEvent = function (eventid) {
		if (this._event_list && this._event_list[eventid]) {
			delete this._event_list[eventid];
			return true;
		}
		return false;
	};

	_pEventSinkObject.setEventHandler = function (evt_id, func, target) {
		if (!func) {
			return -1;
		}

		if (this._is_loading) {
			if (!this._loading_event_list) {
				this._loading_event_list = [];
			}

			this._loading_event_list.push({
				id : evt_id, 
				func : func, 
				target : target
			});
		}

		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandler(target, func, true);
			}
			else {
				idx = listener._setHandler(this, func, true);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._setHandler(target, func, true);
			}
			else {
				idx = listener._setHandler(this, func, true);
			}
		}
		return idx;
	};

	_pEventSinkObject.addEventHandler = function (evt_id, func, target) {
		if (this._is_loading) {
			if (!this._loading_event_list) {
				this._loading_event_list = [];
			}
			this._loading_event_list.push({
				id : evt_id, 
				func : func, 
				target : target
			});
		}

		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandler(target, func, true);
			}
			else {
				idx = listener._addHandler(this, func, true);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandler(target, func, true);
			}
			else {
				idx = listener._addHandler(this, func, true);
			}
		}
		return idx;
	};

	_pEventSinkObject.insertEventHandler = function (evt_id, evt_idx, func, target) {
		evt_idx = evt_idx | 0;
		var listener = this[evt_id];
		var idx = -1;

		if (listener) {
			if (target) {
				idx = listener._insertHandler(target, evt_idx, func, true);
			}
			else {
				idx = listener._insertHandler(this, evt_idx, func, true);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandler(target, func, true);
			}
			else {
				idx = listener._addHandler(this, func, true);
			}
		}

		return idx;
	};

	_pEventSinkObject.removeEventHandler = function (evt_id, func, target) {
		if (!func) {
			return 0;
		}

		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandler(target, func, true);
			}
			else {
				nRemovedEvt = listener._removeHandler(null, func, true);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject.findEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._user_handlers;
			if (target) {
				idx = listener._findHandler(handlers, target, func);
			}
			else {
				idx = listener._findHandler(handlers, this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject.getEventHandler = function (evt_id, idx) {
		var listener = this[evt_id];
		var fn = null;
		if (listener) {
			var handlers = listener._user_handlers;
			fn = listener._getHandler(handlers, idx);
		}
		return fn;
	};

	_pEventSinkObject.clearEventHandler = function (evt_id) {
		var listener = this[evt_id];
		if (listener) {
			return listener._clearAll();
		}
		return 0;
	};

	_pEventSinkObject.setEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._setHandlerLookup(this, funcstr);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}

			if (target) {
				idx = listener._setHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._setHandlerLookup(this, funcstr);
			}
		}
		return idx;
	};

	_pEventSinkObject.addEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._addHandlerLookup(this, funcstr);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._addHandlerLookup(this, funcstr);
			}
		}
		return idx;
	};

	_pEventSinkObject.removeEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandlerLookup(target, funcstr);
			}
			else {
				nRemovedEvt = listener._removeHandlerLookup(this, funcstr);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject.findEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._user_handlers;
			if (target) {
				idx = listener._findHandlerLookup(handlers, target, funcstr);
			}
			else {
				idx = listener._findHandlerLookup(handlers, this, funcstr);
			}
		}
		return idx;
	};

	_pEventSinkObject._clearEventListener = function (evt_id) {
		var evt = this[evt_id];
		if (evt && evt._has_handlers) {
			evt._clearAll();
			this[evt_id] = null;
		}
	};

	_pEventSinkObject._clearEventListeners = function () {
		var evt_list = this._created_event_list;
		if (evt_list) {
			var len = evt_list.length;
			if (len > 0) {
				var i = 0;
				while (true) {
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
				}
			}
		}
	};

	_pEventSinkObject._setEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandler(target, func);
			}
			else {
				idx = listener._setHandler(this, func);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._setHandler(target, func);
			}
			else {
				idx = listener._setHandler(this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject._addEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandler(target, func);
			}
			else {
				idx = listener._addHandler(this, func);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandler(target, func);
			}
			else {
				idx = listener._addHandler(this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject._removeEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandler(target, func);
			}
			else {
				nRemovedEvt = listener._removeHandler(null, func);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject._findEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._sys_handlers;
			if (target) {
				idx = listener._findHandler(handlers, target, func);
			}
			else {
				idx = listener._findHandler(handlers, null, func);
			}
		}
		return idx;
	};

	nexacro.EventHandler = function (obj, fn) {
		this.target = obj;
		this.handler = fn;
	};

	nexacro.EventListener = function (id) {
		this.id = this.name = id;
		this.length = 0;

		this.defaultprevented = false;
		this.stoppropagation = false;

		this._sys_handlers = [];
		this._user_handlers = [];
		this._has_handlers = false;
	};
	var _pEventListener = nexacro._createPrototype(nexacro.Object, nexacro.EventListener);
	nexacro.EventListener.prototype = _pEventListener;

	_pEventListener._type_name = "EventListener";

	_pEventListener.set_length = nexacro._emptyFn;

	_pEventListener._findByObj = function (handlers, obj) {
		var len = handlers.length;
		for (var i = 0; i < len; i++) {
			if (handlers[i].target == obj) {
				return i;
			}
		}
		return -1;
	};

	_pEventListener._findHandler = function (handlers, obj, fn) {
		var len = handlers.length;
		for (var i = 0; i < len; i++) {
			if (handlers[i].target == obj && handlers[i].handler == fn) {
				return i;
			}
		}
		return -1;
	};

	_pEventListener._getHandler = function (handlers, idx) {
		var len = handlers.length;
		if (idx >= 0 && idx < len) {
			return handlers[idx].handler;
		}
		return undefined;
	};

	_pEventListener._setHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}

		var target = obj;
		var idx = this._findByObj(handlers, target);
		if (idx < 0) {
			idx = handlers.length;
			handlers.push(new nexacro.EventHandler(target, fn));
		}
		else {
			handlers[idx] = new nexacro.EventHandler(target, fn);
		}
		this._has_handlers |= handlers.length;
		return idx;
	};

	_pEventListener._addHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}
		var idx = -1;
		if (fn) {
			var target = obj;
			var len = handlers.length;
			var _handler = new nexacro.EventHandler(target, fn);
			for (var i = 0; i < len; i++) {
				if (handlers[i].handler == _handler.handler && handlers[i].target == _handler.target) {
					return i;
				}
			}
			handlers.push(_handler);

			if (user_handler) {
				this.length = handlers.length;
			}

			this._has_handlers |= handlers.length;
			idx = len;
		}
		return idx;
	};

	_pEventListener._insertHandler = function (obj, evt_idx, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}
		var idx = -1;

		if (fn) {
			var target = obj;
			var len = handlers.length;
			var _handler = new nexacro.EventHandler(target, fn);
			for (var i = 0; i < len; i++) {
				if (handlers[i].handler == _handler.handler && handlers[i].target == _handler.target) {
					return i;
				}
			}

			if (evt_idx == -1 || evt_idx >= len) {
				handlers.push(_handler);
				idx = len;
			}
			else {
				handlers.splice(evt_idx, 0, _handler);
				idx = evt_idx;
			}

			this._user_handlers = handlers;

			if (user_handler) {
				this.length = handlers.length;
			}

			this._has_handlers = handlers.length;
		}
		return idx;
	};

	_pEventListener._removeHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}
		var len = handlers.length;
		for (var i = len - 1; i >= 0; i--) {
			if (obj == null) {
				if (fn == null) {
					handlers.splice(i, 1);
				}
				else if (handlers[i].handler == fn) {
					handlers.splice(i, 1);
				}
			}
			else {
				if (fn == null) {
					handlers.splice(i, 1);
				}
				else if (handlers[i].target == obj && handlers[i].handler == fn) {
					handlers.splice(i, 1);
				}
			}
		}
		this._has_handlers |= handlers.length;

		if (user_handler) {
			this.length = handlers.length;
		}

		return len - handlers.length;
	};

	_pEventListener._setHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var idx = -1;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					var target = f;
					idx = this._findByObj(handlers, target);
					if (idx < 0 && handlers.length <= 0) {
						idx = handlers.length;
						handlers.push(new nexacro.EventHandler(target, fn));
					}
					else {
						idx = 0;
						handlers[idx] = new nexacro.EventHandler(target, fn);
					}
					this._has_handlers |= handlers.length;
					return idx;
				}
				if (f._type_name == "Application") {
					return idx;
				}
			}
		}
		return idx;
	};

	_pEventListener._addHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var idx = -1;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					var target = obj;
					idx = handlers.length;

					for (var i = 0; i < idx; i++) {
						if (handlers[i].handler == f[fnstr]) {
							return i;
						}
					}

					handlers.push(new nexacro.EventHandler(target, f[fnstr]));
					this._has_handlers |= handlers.length;
					this.length = handlers.length;
					return idx;
				}
				if (f._type_name == "Application") {
					this.length = handlers.length;
					return idx;
				}
			}
		}
		return idx;
	};

	_pEventListener._removeHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var len;
		var isremove = false;

		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					len = handlers.length;
					for (var i = len - 1; i >= 0; i--) {
						if (handlers[i].handler == fn) {
							handlers.splice(i, 1);
							isremove = true;
						}
					}
					this._has_handlers |= handlers.length;
				}
				if (f._type_name == "Application") {
					this.length = handlers.length;
					return isremove ? 1 : 0;
				}
			}
		}
		return 0;
	};

	_pEventListener._findHandlerLookup = function (handlers, obj, fnstr) {
		var len = handlers.length;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					for (var i = 0; i < len; i++) {
						if (handlers[i].target == f && handlers[i].handler == fn) {
							return i;
						}
					}
					this._has_handlers |= handlers.length;
				}
				if (f._type_name == "Application") {
					return -1;
				}
			}
		}
		return -1;
	};

	_pEventListener._clearAll = function () {
		var numofEvent = this._sys_handlers.length + this._user_handlers.length;
		var len = this._sys_handlers.length;
		var handler;
		for (var i = 0; i < len; i++) {
			handler = this._sys_handlers[i];
			handler.target = null;
			handler.handler = null;
			this._sys_handlers[i] = null;
			delete this._sys_handlers[i];
		}

		len = this._user_handlers.length;
		for (i = 0; i < len; i++) {
			handler = this._user_handlers[i];
			handler.target = null;
			handler.handler = null;
			this._user_handlers[i] = null;
			delete this._user_handlers[i];
		}
		this._sys_handlers = [];
		this._user_handlers = [];
		this.length = 0;
		this._has_handlers = 0;
		return numofEvent;
	};

	_pEventListener._fireEvent = function (obj, evt) {
		var i, ret;
		var h;
		var handlers = this._user_handlers;
		var len = handlers.length;

		try {
			var retrtl = false;
			if (len > 0 && evt._xposConvertToRtl) {
				retrtl = evt._xposConvertToRtl(obj, evt.fromreferenceobject);
			}

			for (i = 0; i < len; i++) {
				h = handlers[i];
				if (obj._is_alive !== false && obj.enableevent !== false) {
					ret = h.handler.call(h.target, obj, evt);
				}
				if (evt) {
					this.defaultprevented = evt._prevented;
					this.stoppropagation = evt._stoppropagation;
				}
			}

			if (retrtl) {
				evt._xposConvertToLtr(obj);
			}
		}
		catch (e) {
			if (e.obj) {
				nexacro._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);

				var environment = nexacro.getEnvironment();
				if (environment) {
					nexacro._onSystemError(environment, e.name, msg);
				}
			}
		}

		handlers = this._sys_handlers;
		len = handlers.length;

		for (i = 0; i < len; i++) {
			h = handlers[i];
			if (obj._is_alive !== false && obj.enableevent !== false) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
		}

		return ret;
	};

	_pEventListener._fireSysEvent = function (obj, evt) {
		var i, ret;
		var handlers = this._sys_handlers;
		var len = handlers.length;
		var h;
		for (i = 0; i < len; i++) {
			h = handlers[i];
			if (obj.enableevent !== false) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
		}
		return ret;
	};

	_pEventListener._fireUserEvent = function (obj, evt) {
		var i, ret;
		var h;
		var handlers = this._user_handlers;
		var len = handlers.length;

		try {
			if (len > 0 && evt._xposConvertToRtl) {
				evt._xposConvertToRtl(obj, evt.fromreferenceobject);
			}

			for (i = 0; i < len; i++) {
				h = handlers[i];

				if (obj.enableevent !== false) {
					ret = h.handler.call(h.target, obj, evt);
				}
				if (evt) {
					this.defaultprevented = evt._prevented;
					this.stoppropagation = evt._stoppropagation;
				}

				if (!obj._is_alive) {
					break;
				}
			}
		}
		catch (e) {
			if (e.obj) {
				nexacro._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);

				var environment = nexacro.getEnvironment();
				if (environment) {
					nexacro._onSystemError(environment, e.name, msg);
				}
			}
		}
		return ret;
	};

	_pEventListener._fireCheckEvent = function (obj, evt) {
		var i, ret;
		var handlers = this._user_handlers;
		var len = handlers.length;
		var h;

		try {
			var retrtl = false;
			if (len > 0 && evt._xposConvertToRtl) {
				retrtl = evt._xposConvertToRtl(obj, evt.fromreferenceobject);
			}

			for (i = 0; i < len; i++) {
				h = handlers[i];

				if (obj.enableevent !== false) {
					ret = h.handler.call(h.target, obj, evt);
				}
				if (evt) {
					this.defaultprevented = evt._prevented;
					this.stoppropagation = evt._stoppropagation;
				}

				if (ret) {
					ret = nexacro._toBoolean(ret);
				}

				if (ret != null && (!ret)) {
					return false;
				}
			}

			if (retrtl) {
				evt._xposConvertToLtr(obj);
			}
		}
		catch (e) {
			if (e.obj) {
				nexacro._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);

				var environment = nexacro.getEnvironment();
				if (environment) {
					nexacro._onSystemError(environment, e.name, msg);
				}
			}
		}

		handlers = this._sys_handlers;
		len = handlers.length;

		for (i = 0; i < len; i++) {
			h = handlers[i];
			if (obj.enableevent) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
			if (ret != null && (!ret)) {
				return false;
			}
		}

		return true;
	};

	_pEventListener.fireEvent = function (obj, evt, cancelable) {
		evt.eventid = this.name;
		evt.fromobject = obj;
		if (cancelable) {
			return this._fireCheckEvent(obj, evt);
		}

		return this._fireEvent(obj, evt);
	};

	_pEventListener.clear = function () {
		var cnt = this._user_handlers.length;
		this._user_handlers = [];
		this.length = 0;
		this._has_handlers = (this.length + this._sys_handlers.length);
		return cnt;
	};

	nexacro.Event = function (obj, evt_id) {
		this.id = this.eventid = evt_id || "";
		this.fromobject = this.fromreferenceobject = obj;
		this._prevented = false;
		this._stoppropagation = false;
		this.cancelable = false;
		this.bubbles = false;
	};

	var _pEvent = nexacro._createPrototype(nexacro.Object, nexacro.Event);
	nexacro.Event.prototype = _pEvent;
	_pEvent._type_name = "Event";


	_pEvent._is_event = true;

	_pEvent.destroy = function () {
		this.fromobject = null;
		this.fromreferenceobject = null;
	};

	_pEvent.preventDefault = function () {
		this._prevented = this.cancelable;
	};

	_pEvent.stopPropagation = function () {
		this._stoppropagation = this.bubbles;
	};

	nexacro.Event.KEY_META = 91;
	nexacro.Event.KEY_RETURN = 13;
	nexacro.Event.KEY_ENTER = 13;
	nexacro.Event.KEY_TAB = 9;
	nexacro.Event.KEY_UP = 38;
	nexacro.Event.KEY_DOWN = 40;
	nexacro.Event.KEY_LEFT = 37;
	nexacro.Event.KEY_RIGHT = 39;
	nexacro.Event.KEY_SPACE = 32;
	nexacro.Event.KEY_SHIFT = 16;
	nexacro.Event.KEY_CTRL = 17;
	nexacro.Event.KEY_CONTROL = 17;
	nexacro.Event.KEY_ALT = 18;
	nexacro.Event.KEY_ESC = 27;
	nexacro.Event.KEY_F1 = 112;
	nexacro.Event.KEY_F2 = 113;
	nexacro.Event.KEY_F3 = 114;
	nexacro.Event.KEY_F4 = 115;
	nexacro.Event.KEY_F5 = 116;
	nexacro.Event.KEY_F6 = 117;
	nexacro.Event.KEY_F7 = 118;
	nexacro.Event.KEY_F8 = 119;
	nexacro.Event.KEY_F9 = 120;
	nexacro.Event.KEY_F10 = 121;
	nexacro.Event.KEY_F11 = 122;
	nexacro.Event.KEY_F12 = 123;
	nexacro.Event.KEY_DEL = 46;
	nexacro.Event.KEY_DELETE = 46;
	nexacro.Event.KEY_BACKSPACE = 8;
	nexacro.Event.KEY_INSERT = 45;
	nexacro.Event.KEY_HOME = 36;
	nexacro.Event.KEY_END = 35;
	nexacro.Event.KEY_PAGE_UP = 33;
	nexacro.Event.KEY_PAGE_DOWN = 34;
	nexacro.Event.KEY_NUM_LOCK = 144;
	nexacro.Event.KEY_NUMPAD0 = 96;
	nexacro.Event.KEY_NUMPAD1 = 97;
	nexacro.Event.KEY_NUMPAD2 = 98;
	nexacro.Event.KEY_NUMPAD3 = 99;
	nexacro.Event.KEY_NUMPAD4 = 100;
	nexacro.Event.KEY_NUMPAD5 = 101;
	nexacro.Event.KEY_NUMPAD6 = 102;
	nexacro.Event.KEY_NUMPAD7 = 103;
	nexacro.Event.KEY_NUMPAD8 = 104;
	nexacro.Event.KEY_NUMPAD9 = 105;
	nexacro.Event.KEY_NUMPAD_DIVIDE = 111;
	nexacro.Event.KEY_NUMPAD_MULTIPLY = 106;
	nexacro.Event.KEY_NUMPAD_MINUS = 109;
	nexacro.Event.KEY_NUMPAD_PLUS = 107;

	nexacro.EventInfo = function (obj, evt_id) {
		this.id = this.eventid = evt_id || "";
		this.fromobject = this.fromreferenceobject = obj;
		this._prevented = false;
		this._stoppropagation = false;
		this.cancelable = false;
		this.bubbles = false;
	};

	var _pEventInfo = nexacro._createPrototype(nexacro.Object, nexacro.EventInfo);
	nexacro.EventInfo.prototype = _pEventInfo;
	_pEventInfo._type_name = "EventInfo";


	_pEventInfo._is_event = true;

	_pEventInfo.destroy = function () {
		this.fromobject = null;
		this.fromreferenceobject = null;
	};

	_pEventInfo.set_eventid = function (v) {
		if (v && v != this.eventid) {
			this.eventid = v;
		}
	};

	_pEventInfo.preventDefault = function () {
		this._prevented = this.cancelable;
	};

	_pEventInfo.stopPropagation = function () {
		this._stoppropagation = this.bubbles;
	};

	nexacro.TimerEventInfo = function (obj, id, timerid) {
		this.id = this.eventid = id || "ontimer";
		this.fromobject = this.fromreferenceobject = obj;
		this.timerid = timerid;
	};
	var _pTimerEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TimerEventInfo);
	nexacro.TimerEventInfo.prototype = _pTimerEventInfo;
	_pTimerEventInfo._type_name = "TimerEventInfo";


	nexacro.ErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, errordata) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = this.fromreferenceobject = obj;

		this.cancelable = true;
		this.errortype = errortype;
		this.errormsg = errormsg;
		this.errorobj = errorobj;
		this.errordata = errordata;

		if (statuscode) {
			this.statuscode = statuscode;
		}
		else {
			this.statuscode = 0;
		}

		this.requesturi = requesturi;
		this.locationuri = locationuri;
	};
	var _pErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ErrorEventInfo);
	nexacro.ErrorEventInfo.prototype = _pErrorEventInfo;
	_pErrorEventInfo._type_name = "ErrorEventInfo";

	_pErrorEventInfo.set_errortype = function (n) {
		if (n && this.errortype != n) {
			this.errortype = n;
		}
	};

	_pErrorEventInfo.set_errormsg = function (v) {
		if (v && this.errormsg != v) {
			this.errormsg = v;
		}
	};

	_pErrorEventInfo.set_errorobj = function (obj) {
		if (obj && this.errorobj != obj) {
			this.errorobj = obj;
		}
	};

	_pErrorEventInfo.set_locationuri = function (v) {
		if (v && this.locationuri != v) {
			this.locationuri = v;
		}
	};

	_pErrorEventInfo.set_requesturi = function (v) {
		if (v && this.requesturi != v) {
			this.requesturi = v;
		}
	};

	_pErrorEventInfo.set_statuscode = function (v) {
		if (v && this.statuscode != v) {
			this.statuscode = v;
		}
	};

	_pErrorEventInfo.set_errordata = function (v) {
		if (v && this.errordata != v) {
			this.errordata = v;
		}
	};

	_pErrorEventInfo.getHexaErrorCode = function () {
		return this.errorcode;
	};


	nexacro.ExitEventInfo = function (obj, id) {
		this.id = this.eventid = id || "onexit";
		this.fromobject = this.fromreferenceobject = obj;
	};
	var _pExitEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExitEventInfo);
	nexacro.ExitEventInfo.prototype = _pExitEventInfo;
	_pExitEventInfo._type_name = "ExitEventInfo";


	nexacro.AccessibilityEventInfo = function (obj, id, text, from_comp, refer_comp) {
		this.id = this.eventid = id || "onaccessibility";

		this.fromobject = from_comp || obj;
		this.fromreferenceobject = refer_comp || obj;

		this.text = text;
	};
	var _pAccessibilityEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.AccessibilityEventInfo);
	nexacro.AccessibilityEventInfo.prototype = _pAccessibilityEventInfo;
	_pAccessibilityEventInfo._type_name = "AccessibilityEventInfo";


	nexacro.ActivateEventInfo = function (obj, id, state) {
		nexacro.Event.call(this, obj, id || "onactivate");
		this.fromobject = this.fromreferenceobject = obj;
		this.state = state;

		this.bubbles = true;
	};
	var _pActivateEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ActivateEventInfo);
	nexacro.ActivateEventInfo.prototype = _pActivateEventInfo;
	_pActivateEventInfo._type_name = "ActivateEventInfo";


	nexacro.SysCommandEventInfo = function (obj, id, systemcommand) {
		this.id = this.eventid = id || "onsyscommand";
		this.fromobject = this.fromreferenceobject = obj;

		this.bubbles = true;

		this.systemcommand = systemcommand;
	};
	var _pSysCommandEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SysCommandEventInfo);
	nexacro.SysCommandEventInfo.prototype = _pSysCommandEventInfo;
	_pSysCommandEventInfo._type_name = "SysCommandEventInfo";


	nexacro.CloseEventInfo = function (obj, id, from_comp, refer_comp, root_closing_comp) {
		nexacro.Event.call(this, obj, id || "onclose");
		this.bubbles = true;

		this.fromobject = from_comp || obj;
		this.fromreferenceobject = refer_comp || obj;

		this._root_closing_comp = root_closing_comp;
	};
	var _pCloseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CloseEventInfo);
	nexacro.CloseEventInfo.prototype = _pCloseEventInfo;
	_pCloseEventInfo._type_name = "CloseEventInfo";


	nexacro.LoadEventInfo = function (obj, id, url) {
		nexacro.Event.call(this, obj, id || "onload");
		this.url = url;
	};
	var _pLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.LoadEventInfo);
	nexacro.LoadEventInfo.prototype = _pLoadEventInfo;
	_pLoadEventInfo._type_name = "LoadEventInfo";


	nexacro.SetFocusEventInfo = function (obj, id, oldcomp, oldrefcomp, fromobject, fromreferenceobject) {
		this.id = this.eventid = id || "onsetfocus";
		this.fromobject = this.fromreferenceobject = obj;

		this.oldcomponent = oldcomp;
		this.oldreferencecomponent = oldrefcomp;

		if (fromobject) {
			this.fromobject = fromobject;
		}

		if (fromreferenceobject) {
			this.fromreferenceobject = fromreferenceobject;
		}
	};
	var _pSetFocusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SetFocusEventInfo);
	nexacro.SetFocusEventInfo.prototype = _pSetFocusEventInfo;
	_pSetFocusEventInfo._type_name = "SetFocusEventInfo";


	nexacro.KillFocusEventInfo = function (obj, id, newcomp, newrefcomp, fromobject, fromreferenceobject) {
		nexacro.Event.call(this, obj, id || "onkillfocus");
		this.newcomponent = newcomp;
		this.newreferencecomponent = newrefcomp;

		if (fromobject) {
			this.fromobject = fromobject;
		}

		if (fromreferenceobject) {
			this.fromreferenceobject = fromreferenceobject;
		}
	};
	var _pKillFocusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.KillFocusEventInfo);
	nexacro.KillFocusEventInfo.prototype = _pKillFocusEventInfo;
	_pKillFocusEventInfo._type_name = "KillFocusEventInfo";


	nexacro.MoveEventInfo = function (obj, id, left, top) {
		this.id = this.eventid = id || "onmove";
		this.fromobject = this.fromreferenceobject = obj;

		this.x = left;
		this.y = top;
	};
	var _pMoveEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.MoveEventInfo);
	nexacro.MoveEventInfo.prototype = _pMoveEventInfo;
	_pMoveEventInfo._type_name = "MoveEventInfo";


	nexacro.SizeEventInfo = function (obj, id, width, height) {
		this.id = this.eventid = id || "onsize";
		this.fromobject = this.fromreferenceobject = obj;

		this.cx = width;
		this.cy = height;

		this.reverse = false;

		this._orientation = nexacro._getMobileOrientation();

		switch (this._orientation) {
			case 0:
				this.orientation = "portrait";
				break;
			case 1:
				this.orientation = "portrait";
				this.reverse = true;
				break;
			case 2:
				this.orientation = "landscape";
				this.reverse = true;
				break;
			case 3:
				this.orientation = "landscape";
				break;
			default:
				this.orientation = "resize";
				break;
		}
	};
	var _pSizeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SizeEventInfo);
	nexacro.SizeEventInfo.prototype = _pSizeEventInfo;
	_pSizeEventInfo._type_name = "SizeEventInfo";


	nexacro.KeyEventInfo = function (obj, id, alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp, meta_key) {
		this.id = this.eventid = id || "onkey";

		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = alt_key;
		this.ctrlkey = ctrl_key;
		this.shiftkey = shift_key;
		this.metakey = meta_key || false;
		this.keycode = key_code;
	};
	var _pKeyEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.KeyEventInfo);
	nexacro.KeyEventInfo.prototype = _pKeyEventInfo;
	_pKeyEventInfo._type_name = "KeyEventInfo";


	nexacro.MouseEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		this.id = this.eventid = id || "onmouse";

		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = altKey || false;
		this.ctrlkey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftkey = shiftKey || false;
		this.metakey = metaKey || false;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;
	};

	var _pMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseEventInfo);
	nexacro.MouseEventInfo.prototype = _pMouseEventInfo;
	_pMouseEventInfo._type_name = "MouseEventInfo";

	_pMouseEventInfo._xposConvertToRtl = function (obj, from_refer_comp) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this._orgcanvasx = this.canvasx;
			this._orgcliendx = this.clientx;
			this.canvasx = nexacro._getRTLCanvasXForMouseEvent(obj, from_refer_comp, this.canvasx);
			this.clientx = obj._getClientXY(this.canvasx, this.canvasy)[0];

			return true;
		}
		return false;
	};

	_pMouseEventInfo._xposConvertToLtr = function (obj) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this.canvasx = this._orgcanvasx;
			this.clientx = this._orgclientx;

			delete this._orgcanvas;
			delete this._orgclientx;
		}
	};

	nexacro.ClickEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		this.id = this.eventid = id || "onclick";

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = altKey || false;
		this.ctrlkey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftkey = shiftKey || false;
		this.metakey = metaKey || false;
		this.screenx = (screenX === undefined ? -1 : screenX);
		this.screeny = (screenY === undefined ? -1 : screenY);
		this.canvasx = (canvasX === undefined ? -1 : canvasX);
		this.canvasy = (canvasY === undefined ? -1 : canvasY);
		this.clientx = (clientX === undefined ? -1 : clientX);
		this.clienty = (clientY === undefined ? -1 : clientY);
	};

	var _pClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ClickEventInfo);
	nexacro.ClickEventInfo.prototype = _pClickEventInfo;
	_pClickEventInfo._type_name = "ClickEventInfo";

	_pClickEventInfo._xposConvertToRtl = function (obj, from_refer_comp) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this._orgcanvasx = this.canvasx;
			this._orgcliendx = this.clientx;
			this.canvasx = nexacro._getRTLCanvasXForMouseEvent(obj, from_refer_comp, this.canvasx);
			this.clientx = obj._getClientXY(this.canvasx, this.canvasy)[0];

			return true;
		}
		return false;
	};

	_pClickEventInfo._xposConvertToLtr = function (obj) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this.canvasx = this._orgcanvasx;
			this.clientx = this._orgclientx;

			delete this._orgcanvas;
			delete this._orgclientx;
		}
	};
	nexacro.MouseWheelEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, delta, from_comp, from_refer_comp, meta_key) {
		this.id = this.eventid = id || "onmousewheel";

		this.bubbles = true;
		this.cancelable = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = alt_key || false;
		this.ctrlkey = ctrl_key || false;
		this.button = button || "";
		this.shiftkey = shift_key || false;
		this.metakey = meta_key || false;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;
		this.amount = delta;
	};
	var _pMouseWheelEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseWheelEventInfo);
	nexacro.MouseWheelEventInfo.prototype = _pMouseWheelEventInfo;
	_pMouseWheelEventInfo._type_name = "MouseWheelEventInfo";

	_pMouseWheelEventInfo._xposConvertToRtl = function (obj, from_refer_comp) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this._orgcanvasx = this.canvasx;
			this._orgcliendx = this.clientx;
			this.canvasx = nexacro._getRTLCanvasXForMouseEvent(obj, from_refer_comp, this.canvasx);
			this.clientx = obj._getClientXY(this.canvasx, this.canvasy)[0];

			return true;
		}
		return false;
	};

	_pMouseWheelEventInfo._xposConvertToLtr = function (obj) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this.canvasx = this._orgcanvasx;
			this.clientx = this._orgclientx;

			delete this._orgcanvas;
			delete this._orgclientx;
		}
	};
	nexacro.ScrollEventInfo = function (obj, id, pos, type, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onscroll";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;

		this.pos = pos;
		this.type = type;
	};
	var _pScrollEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ScrollEventInfo);
	nexacro.ScrollEventInfo.prototype = _pScrollEventInfo;
	_pScrollEventInfo._type_name = "ScrollEventInfo";


	nexacro.DragEventInfo = function (obj, id, dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		this.id = this.eventid = id || "ondrag";
		if (!from_refer_comp) {
			from_refer_comp = from_comp;
		}

		this.cancelable = true;
		this.bubbles = true;

		this.dragdata = dragdata;
		this.userdata = userdata;
		this.datatype = datatype;
		this.filelist = filelist;
		this.sourceobject = src_comp;
		this.sourcereferenceobject = src_refer_comp;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = alt_key || false;
		this.ctrlkey = ctrl_key || false;
		this.button = button || "";
		this.shiftkey = shift_key || false;
		this.metakey = meta_key || false;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;
	};

	var _pDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DragEventInfo);
	nexacro.DragEventInfo.prototype = _pDragEventInfo;
	_pDragEventInfo._type_name = "DragEventInfo";

	_pDragEventInfo._xposConvertToRtl = function (obj, from_refer_comp) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this._orgcanvasx = this.canvasx;
			this._orgcliendx = this.clientx;
			this.canvasx = nexacro._getRTLCanvasXForMouseEvent(obj, from_refer_comp, this.canvasx);
			this.clientx = obj._getClientXY(this.canvasx, this.canvasy)[0];

			return true;
		}
		return false;
	};

	_pDragEventInfo._xposConvertToLtr = function (obj) {
		if (obj && obj._isRtl && obj._isRtl()) {
			this.canvasx = this._orgcanvasx;
			this.clientx = this._orgclientx;

			delete this._orgcanvas;
			delete this._orgclientx;
		}
	};

	_pDragEventInfo.set_dragdata = function (v) {
		if (this.dragdata != v) {
			this.dragdata = v;
		}
	};
	_pDragEventInfo.set_userdata = function (v) {
		if (this.userdata != v) {
			this.userdata = v;
		}
	};

	nexacro.DragDataObject = function (id) {
		this.id = id || "dragdataobject";

		this._data_table = {
		};
	};

	var _pDragDataObject = nexacro._createPrototype(nexacro.Object, nexacro.DragDataObject);
	nexacro.DragDataObject.prototype = _pDragDataObject;
	_pDragDataObject._type_name = "DragDataObject";

	_pDragDataObject.setData = function (type, value) {
		if (this._data_table[type]) {
			delete this._data_table[type];
		}

		this._data_table[type] = value;
	};

	_pDragDataObject.getData = function (type) {
		if (this._data_table[type]) {
			return this._data_table[type];
		}

		return null;
	};

	_pDragDataObject.isAvailableData = function (type) {
		if (this._data_table[type]) {
			return true;
		}

		return false;
	};

	nexacro.CharEventInfo = function (obj, id, chartext, pretext, posttext) {
		this.id = this.eventid = id || "onchar";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
	};
	var _pCharEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CharEventInfo);
	nexacro.CharEventInfo.prototype = _pCharEventInfo;
	_pCharEventInfo._type_name = "CharEventInfo";



	nexacro.GestureEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "ongesture";

		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
	};
	var _pGestureEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GestureEventInfo);
	nexacro.GestureEventInfo.prototype = _pGestureEventInfo;
	_pGestureEventInfo._type_name = "GestureEventInfo";

	nexacro.TapEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "ontap";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
	};
	var _pTapEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TapEventInfo);
	nexacro.TapEventInfo.prototype = _pTapEventInfo;
	_pTapEventInfo._type_name = "TapEventInfo";

	nexacro.LongPressEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onlongpress";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pLongPressEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.LongPressEventInfo);
	nexacro.LongPressEventInfo.prototype = _pLongPressEventInfo;
	_pLongPressEventInfo._type_name = "LongPressEventInfo";

	nexacro.SlideEventInfo = function (obj, id, pointinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onslide";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
		this.xaccvalue = xaccvalue;
		this.yaccvalue = yaccvalue;
		this.xdeltavalue = xdeltavalue;
		this.ydeltavalue = ydeltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pSlideEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.SlideEventInfo);
	nexacro.SlideEventInfo.prototype = _pSlideEventInfo;
	_pSlideEventInfo._type_name = "SlideEventInfo";

	nexacro.PinchEventInfo = function (obj, id, pointinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onpinch";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
		this.accvalue = accvalue;
		this.deltavalue = deltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pPinchEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.PinchEventInfo);
	nexacro.PinchEventInfo.prototype = _pPinchEventInfo;
	_pPinchEventInfo._type_name = "PinchEventInfo";

	nexacro.FlingEventInfo = function (obj, id, pointinfos, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onfling";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;

		this.pointcount = touchlen;
		this.xstartvalue = xstartvalue;
		this.ystartvalue = ystartvalue;
		this.xdeltavalue = xdeltavalue;
		this.ydeltavalue = ydeltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pFlingEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.FlingEventInfo);
	nexacro.FlingEventInfo.prototype = _pFlingEventInfo;
	_pFlingEventInfo._type_name = "FlingEventInfo";

	nexacro.ZoomEventInfo = function (obj, id, zoomfactor, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onzoom";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.zoom = zoomfactor;
	};
	var _pZoomEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ZoomEventInfo);
	nexacro.ZoomEventInfo.prototype = _pZoomEventInfo;
	_pZoomEventInfo._type_name = "ZoomEventInfo";

	nexacro.OrientationChangeEventInfo = function (obj, id, orientation) {
		this.id = this.eventid = id || "onzoom";
		this.fromobject = null;
		this.fromreferenceobject = null;
		this._orientation = orientation;
		if (orientation === 0 || orientation == 1) {
			this.orientation = "portrait";
		}
		else if (orientation == 2 || orientation == 3) {
			this.orientation = "landscape";
		}
		else {
			this.orientation = "";
		}
	};
	var _pOrientationChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.OrientationChangeEventInfo);
	nexacro.OrientationChangeEventInfo.prototype = _pOrientationChangeEventInfo;
	_pOrientationChangeEventInfo._type_name = "OrientationChangeEventInfo";

	nexacro.ContextMenuEventInfo = function (obj, id, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "oncontextmenu";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.cancelable = true;
	};
	var _pContextMenuEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ContextMenuEventInfo);
	nexacro.ContextMenuEventInfo.prototype = _pContextMenuEventInfo;
	_pContextMenuEventInfo._type_name = "ContextMenuEventInfo";

	nexacro.ExtendedCommandEventInfo = function (obj, id, deviceid, eventtype, data) {
		this.id = this.eventid = id || "onextendedcommand";
		this.fromobject = this.fromreferenceobject = obj;

		this.deviceid = deviceid;
		this.eventtype = eventtype;
		this.data = data;
	};
	var _pExtendedCommandEventInfo = nexacro._createPrototype(nexacro.EventInfo, nexacro.ExtendedCommandEventInfo);
	nexacro.ExtendedCommandEventInfo.prototype = _pExtendedCommandEventInfo;
	_pExtendedCommandEventInfo._type_name = "ExtendedCommandEventInfo";

	nexacro.ExtendedCommandErrorEventInfo = function (obj, id, deviceid, eventtype, data) {
		this.id = this.eventid = id || "onextendederrorcommand";
		this.fromobject = this.fromreferenceobject = obj;

		this.deviceid = deviceid;
		this.eventtype = eventtype;
		this.data = data;
	};
	var _pExtendedCommandErrorEventInfo = nexacro._createPrototype(nexacro.EventInfo, nexacro.ExtendedCommandErrorEventInfo);
	nexacro.ExtendedCommandErrorEventInfo.prototype = _pExtendedCommandErrorEventInfo;
	_pExtendedCommandErrorEventInfo._type_name = "ExtendedCommandErrorEventInfo";

	nexacro.TouchInputInfo = function (elem, type, touchid, time, is_first, screenX, screenY, windowX, windowY) {
		this.touchid = touchid;
		this.type = this._TOUCH_TYPES[type];
		this.time = time;
		this.isfirst = is_first;
		this.screenx = screenX;
		this.screeny = screenY;
		this.canvasx = undefined;
		this.canvasy = undefined;
		this.clientx = undefined;
		this.clienty = undefined;

		this._elem = elem;
		this._current_state = type;
		this._x = this._oldx = this._startx = windowX;
		this._y = this._oldy = this._starty = windowY;
	};
	var _pTouchInputInfo = nexacro._createPrototype(nexacro.Object, nexacro.TouchInputInfo);
	nexacro.TouchInputInfo.prototype = _pTouchInputInfo;
	_pTouchInputInfo._type_name = "TouchInputInfo";

	_pTouchInputInfo._TOUCH_TYPES = {
		touchstart : 0, 
		touchmove : 1, 
		touchend : 2
	};
	_pTouchInputInfo._updateInfo = function (elem, type, time, screenX, screenY, windowX, windowY) {
		this.type = this._TOUCH_TYPES[type];
		this.time = time;
		this.screenx = screenX;
		this.screeny = screenY;

		this._elem = elem;
		this._current_state = type;
		this._oldx = this._x;
		this._oldy = this._y;
		this._x = windowX;
		this._y = windowY;
	};


	nexacro.TouchEventInfo = function (obj, id, touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Event.call(this, obj, id || "ontouch");

		this.cancelable = true;
		this.bubbles = true;

		this.touchinputinfos = touchinfos;
		this.changedtouchinputinfos = changedtouchinfos;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
	};
	var _pTouchEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TouchEventInfo);
	nexacro.TouchEventInfo.prototype = _pTouchEventInfo;
	_pTouchEventInfo._type_name = "TouchEventInfo";


	nexacro.Touch = function (id, type, time, target, changed, windowX, windowY, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		this.touchid = id;
		this.type = nexacro.Touch._TOUCH_TYPES[type];
		this.time = time;
		this.target = target;
		this.changed = changed;
		this.windowx = windowX;
		this.windowy = windowY;
		this.screenx = screenX;
		this.screeny = screenY;
		this.canvasx = canvasX;
		this.canvasy = canvasY;
		this.clientx = clientX;
		this.clienty = clientY;
	};
	var _pTouch = nexacro._createPrototype(nexacro.Object, nexacro.Touch);
	nexacro.Touch.prototype = _pTouch;
	_pTouch._type_name = "Touch";

	_pTouch.isfirst = undefined;

	nexacro.Touch._DIRECTION_NONE = 1;
	nexacro.Touch._DIRECTION_LEFT = 2;
	nexacro.Touch._DIRECTION_RIGHT = 4;
	nexacro.Touch._DIRECTION_UP = 8;
	nexacro.Touch._DIRECTION_DOWN = 16;
	nexacro.Touch._DIRECTION_HORZ = nexacro.Touch._DIRECTION_LEFT | nexacro.Touch._DIRECTION_RIGHT;
	nexacro.Touch._DIRECTION_VERT = nexacro.Touch._DIRECTION_UP | nexacro.Touch._DIRECTION_DOWN;
	nexacro.Touch._DIRECTION_ALL = nexacro.Touch._DIRECTION_HORZ | nexacro.Touch._DIRECTION_VERT;
	nexacro.Touch._DIRECTIONS = {
		NONE : nexacro.Touch._DIRECTION_NONE, 
		LEFT : nexacro.Touch._DIRECTION_LEFT, 
		RIGHT : nexacro.Touch._DIRECTION_RIGHT, 
		UP : nexacro.Touch._DIRECTION_UP, 
		DOWN : nexacro.Touch._DIRECTION_DOWN, 
		HORZ : nexacro.Touch._DIRECTION_HORZ, 
		VERT : nexacro.Touch._DIRECTION_VERT, 
		ALL : nexacro.Touch._DIRECTION_ALL
	};

	nexacro.Touch._TOUCH_START = 0;
	nexacro.Touch._TOUCH_MOVE = 1;
	nexacro.Touch._TOUCH_END = 2;
	nexacro.Touch._TOUCH_CANCEL = 3;
	nexacro.Touch._TOUCH_TYPES = {
		touchstart : nexacro.Touch._TOUCH_START, 
		touchmove : nexacro.Touch._TOUCH_MOVE, 
		touchend : nexacro.Touch._TOUCH_END, 
		touchcancel : nexacro.Touch._TOUCH_CANCEL
	};

	delete _pTouch;

	nexacro.TouchInput = function (elem, evtType, time) {
		this.type = nexacro.Touch._TOUCH_TYPES[evtType];
		this.time = time;
		this.target = elem;

		this.touches = [];
		this.changedTouches = [];
	};
	var _pTouchInput = nexacro._createPrototype(nexacro.Object, nexacro.TouchInput);
	nexacro.TouchInput.prototype = _pTouchInput;
	_pTouchInput._type_name = "TouchInput";

	_pTouchInput.touches = null;
	_pTouchInput.changedTouches = null;

	_pTouchInput.isFirst = false;
	_pTouchInput.isLast = false;
	_pTouchInput.prevented = false;

	_pTouchInput.computedData = null;

	_pTouchInput.addTouchInfo = function (touch) {
		if (!touch || touch.touchid === undefined) {
			return null;
		}

		this.touches.push(touch);
		if (touch.changed) {
			this.changedTouches.push(touch);
		}

		var touch_len = this.touches.length, change_len = this.changedTouches.length;
		this.isFirst = (this.type == 0 && touch_len == change_len);
		this.isLast = (this.type >= 2 && touch_len == change_len);
		return touch;
	};



	_pTouchInput.preventAction = function () {
		this.prevented = true;
	};

	nexacro.TouchSession = function (manager, win, elem, prev_session, detectors) {
		this._start_win = win;
		this._start_elem = elem;
		this._manager = manager;

		this.DIRECTIONS = nexacro.Touch._DIRECTIONS;

		if (prev_session && prev_session._cur_session_action_type) {
			this._prev_session_action_type = prev_session._cur_session_action_type;
			this._prev_session_action_data = prev_session._cur_data;
		}

		this._detectors = [];
		if (!detectors) {
			detectors = nexacro.TouchSession._default_gesture_detectors;
		}

		var detector, detector_cnt = detectors ? detectors.length : 0;
		for (var i = 0; i < detector_cnt; i++) {
			detector = nexacro.TouchAction._getGestureDetector(detectors[i]);
			if (detector) {
				this._detectors.push(detector);
			}
		}
		this._applyCurrentZoomInfo();
	};
	var _pTouchSession = nexacro._createPrototype(nexacro.Object, nexacro.TouchSession);
	nexacro.TouchSession.prototype = _pTouchSession;
	_pTouchSession._type_name = "TouchSession";

	_pTouchSession._scale = 1;
	_pTouchSession._start_win = null;
	_pTouchSession._start_elem = null;
	_pTouchSession._cur_elem = null;
	_pTouchSession._manager = null;
	_pTouchSession._last_evttype = 0;

	_pTouchSession._detectors = null;
	_pTouchSession._cur_detector = null;
	_pTouchSession._cur_input = null;

	_pTouchSession._cur_data = null;
	_pTouchSession._first_data = null;
	_pTouchSession._prev_data = null;
	_pTouchSession._offset_data = null;
	_pTouchSession._prev_velocity_data = null;

	_pTouchSession._cur_session_action_type = "";
	_pTouchSession._cur_session_action_status = "";

	_pTouchSession._prev_session_action_type = "";
	_pTouchSession._prev_session_action_data = "";

	_pTouchSession._max_touch_pointers = 0;

	_pTouchSession._first_pointer_spacing = -1;
	_pTouchSession._first_touch_id = undefined;

	_pTouchSession.opt_interval = 50;
	_pTouchSession._velocity_adjust_ratio = 1;

	nexacro.TouchSession._default_gesture_detectors = ['longpress', 'slide', 'tap'];


	_pTouchSession.destroy = function () {
		this.stop();
		this._detectors = null;
	};

	_pTouchSession.stop = function () {
		var detectors = this._detectors;
		var cnt = detectors.length;
		for (var i = 0; i < cnt; i++) {
			var detector = detectors[i];
			if (detector) {
				detector.reset();
			}
		}
	};

	_pTouchSession.update = function (elem, input) {
		this._cur_elem = elem;
		this._cur_input = input;
	};

	_pTouchSession.init = function (win, elem) {
		this._start_win = win;
		this._start_elem = elem;
		this._cur_elem = null;
		this._manager = null;
		this._last_evttype = 0;
		this._cur_input = null;

		this._cur_data = null;
		this._first_data = null;
		this._prev_data = null;
		this._offset_data = null;
		this._prev_velocity_data = null;
		this._first_pointer_spacing = -1;

		this._first_touch_id = undefined;
		this._velocity_adjust_ratio = 1;
	};

	_pTouchSession.getActionData = function () {
		return this._cur_data;
	};

	_pTouchSession.getFirstTouchId = function () {
		return this._first_touch_id;
	};

	_pTouchSession.detectGesture = function () {
		var detectors = this._detectors;
		var cnt = detectors.length;
		for (var i = 0; i < cnt; i++) {
			var detector = detectors[i];
			if (detector) {
				if (!this._cur_detector || this._cur_detector == detector) {
					detector.detect(this._last_evttype, this);
				}
				else {
					detector.reset();
				}

				if (!this._cur_detector && detector._isStarted()) {
					this._cur_detector = detector;
				}
			}
		}
	};

	_pTouchSession.cancelGesture = function () {
		if (this._cur_detector) {
			this._cur_detector.cancel();
			this._cur_detector = null;
			return;
		}
		var detectors = this._detectors;
		var cnt = detectors.length;
		for (var i = 0; i < cnt; i++) {
			var detector = detectors[i];
			if (detector) {
				detector.cancel();
			}
		}
	};

	_pTouchSession.ontouch = function (elem, input) {
		if (!elem || !input) {
			return;
		}

		var type = input.type, isFirst = input.isFirst;
		if (type == nexacro.Touch._TOUCH_START && (!this._start_elem || isFirst)) {
			this._start_elem = elem;
			this._first_touch_id = input.touches[0].id;
			this._cur_data = null;
			this._first_data = null;
			this._prev_data = null;
			this._offset_data = null;
			this._prev_velocity_data = null;
			this._first_pointer_spacing = -1;

			this._velocity_adjust_ratio = nexacro._touch_velocity_adjust_ratio;
		}

		this._cur_elem = elem;
		this._cur_input = input;
		this._prev_data = this._cur_data;

		if ((this._cur_data = this.calcActionData(input))) {
			if (type == nexacro.Touch._TOUCH_START && isFirst) {
				this._first_data = this._cur_data;
			}
		}
		this._last_evttype = type;

		this.detectGesture();
	};

	_pTouchSession.ontouchcancel = function (elem, input) {
		if (!elem || !input) {
			return;
		}

		var type = input.type;
		this._cur_elem = elem;
		this._cur_input = input;
		this._prev_data = this._cur_data;
		this._cur_data = this.calcActionData(input);

		this._last_evttype = type;

		this.cancelGesture();

		this._cur_data = null;
	};

	_pTouchSession.getCurActionType = function () {
		return this._cur_session_action_type;
	};

	_pTouchSession.isStarted = function () {
		if (this._cur_detector) {
			return this._cur_detector._isStarted();
		}

		return (this._cur_session_action_status == nexacro.TouchAction._STATUS_START || 
			this._cur_session_action_status == nexacro.TouchAction._STATUS_PENDING);
	};

	_pTouchSession.onaction = function (name, status, data) {
		var manager = this._manager;
		var elem = this._cur_elem;
		var touches = this._cur_input.touches;
		var changedTouches = this._cur_input.changedTouches;

		this._cur_session_action_type = name;
		this._cur_session_action_status = status;

		if (status == nexacro.TouchAction._STATUS_CANCEL) {
			if (manager && manager.onactioncanceled) {
				manager.onactioncanceled(elem, data, touches, changedTouches);
			}
			return;
		}
		if (name == "slide") {
			switch (status) {
				case nexacro.TouchAction._STATUS_START:
					{

						if (manager && manager.onslidestart) {
							manager.onslidestart(elem, data, touches, changedTouches);
						}
					}
					break;
				case nexacro.TouchAction._STATUS_PENDING:
					{

						if (manager && manager.onslide) {
							manager.onslide(elem, data, touches, changedTouches);
						}
					}
					break;
				case nexacro.TouchAction._STATUS_END:
					{

						if (manager && manager.onslideend) {
							manager.onslideend(elem, data, touches, changedTouches);
						}
					}
					break;
			}
		}
		else if (name == "pinch") {
		}
		else if (name == "longpress") {
			switch (status) {
				case nexacro.TouchAction._STATUS_START:
					{

						if (manager && manager.onlongpress) {
							manager.onlongpress(elem, data, touches, changedTouches);
						}
					}
					break;
				case nexacro.TouchAction._STATUS_END:
					{

						if (manager && manager.onlongpressup) {
							manager.onlongpressup(elem, data, touches, changedTouches);
						}
					}
					break;
			}
		}
		else if (name == "tap") {
			if (manager && manager.ontap) {
				manager.ontap(elem, data, touches, changedTouches);
			}
		}
		else if (name == "dbltap") {
			if (manager && manager.ondbltap) {
				manager.ondbltap(elem, data, touches, changedTouches);
			}
		}
		else if (name == "fling") {
			switch (status) {
				case nexacro.TouchAction._STATUS_START:
					{

						if (manager && manager.onflingstart) {
							manager.onflingstart(elem, data, touches, changedTouches);
						}
					}
					break;
				case nexacro.TouchAction._STATUS_PENDING:
					{

						if (manager && manager.onfling) {
							manager.onfling(elem, data, touches, changedTouches);
						}
					}
					break;
				case nexacro.TouchAction._STATUS_END:
					{

						if (manager && manager.onflingend) {
							manager.onflingend(elem, data, touches, changedTouches);
						}
					}
					break;
			}
		}
	};

	_pTouchSession.calcActionData = function (input) {
		if (!input) {
			return null;
		}

		var type = input.type;
		var touches = input.touches;
		var pointers = touches.length;

		var computed_data = {
			time : input.time, 
			centerX : 0, 
			centerY : 0, 
			touchPointers : pointers, 
			spacing : 0, 
			scale : 1, 
			direction : 0, 
			distanceX : 0, 
			distanceY : 0, 
			distance : 0, 
			leadTime : 0, 
			velocityX : 0, 
			velocityY : 0, 
			velocity : 0, 
			accDeltaSpacing : 0, 
			deltaDirection : 0, 
			deltaDistanceX : 0, 
			deltaDistanceY : 0, 
			deltaDistance : 0, 
			deltaTime : 0, 
			deltaVelocityX : 0, 
			deltaVelocityY : 0, 
			deltaVelocity : 0, 
			deltaSpacing : 0
		};

		var first_data = this._first_data;
		var center = this.getCenter(touches);

		var spacing = 0;
		if (pointers == 1) {
			this._first_pointer_spacing = -1;
		}
		else {
			var windowX, windowY, windowMaxX = 0, windowMinX = touches[0].windowx, windowMaxY = 0, windowMinY = touches[0].windowy;
			for (var i = 0; i < pointers; i++) {
				windowX = touches[i].windowx;
				windowY = touches[i].windowy;

				windowMaxX = Math.max(windowMaxX, windowX);
				windowMinX = Math.min(windowMinX, windowX);

				windowMaxY = Math.max(windowMaxY, windowY);
				windowMinY = Math.min(windowMinY, windowX);
			}
			var spacingX = Math.abs(windowMaxX - windowMinX);
			var spacingY = Math.abs(windowMaxY - windowMinY);
			spacing = this.getDistance(spacingX, spacingY);
			if (this._first_pointer_spacing < 0) {
				this._first_pointer_spacing = spacing;
			}
		}

		computed_data.centerX = center.x;
		computed_data.centerY = center.y;
		computed_data.spacing = spacing;


		var scale = 1, direction = 0, distanceX = 0, distanceY = 0, distance = 0, leadTime = 0, velocityX = 0, velocityY = 0, velocity = 0, accDeltaSpacing = 0;
		if (first_data) {
			distanceX = center.x - first_data.centerX;
			distanceY = center.y - first_data.centerY;
			distance = this.getDistance(distanceX, distanceY);

			leadTime = input.time - first_data.time;
		}

		var offset_data = this._offset_data, prev_data = this._prev_data;
		if (!offset_data || !prev_data || pointers != prev_data.touchPointers) {
			var oDistanceX = 0, oDistanceY = 0;
			if (prev_data) {
				oDistanceX = prev_data.distanceX;
				oDistanceY = prev_data.distanceY;
			}
			offset_data = this._offset_data = {
				centerX : center.x, 
				centerY : center.y, 
				distanceX : oDistanceX, 
				distanceY : oDistanceY
			};
		}
		distanceX = offset_data.distanceX + (center.x - offset_data.centerX);
		distanceY = offset_data.distanceY + (center.y - offset_data.centerY);
		direction = this.getDirection(distanceX, distanceY);

		if (pointers > 1) {
			scale = spacing / this._first_pointer_spacing;
			accDeltaSpacing = spacing - this._first_pointer_spacing;
		}


		var v = this.getVelocity(leadTime, distanceX, distanceY);
		velocityX = v.x;
		velocityY = v.y;
		velocity = (Math.abs(v.x) > Math.abs(v.y)) ? v.x : v.y;

		computed_data.scale = scale;
		computed_data.accDeltaSpacing = accDeltaSpacing;
		computed_data.direction = direction;
		computed_data.distanceX = distanceX;
		computed_data.distanceY = distanceY;
		computed_data.distance = distance;
		computed_data.leadTime = leadTime;
		computed_data.velocityX = velocityX;
		computed_data.velocityY = velocityY;
		computed_data.velocity = velocity;


		var deltaDirection = 0, deltaDistanceX = 0, deltaDistanceY = 0, deltaDistance = 0, deltaTime = 0, deltaVelocityX = 0, deltaVelocityY = 0, deltaVelocity = 0, deltaSpacing = 0;
		if (prev_data) {
			deltaDistanceX = center.x - prev_data.centerX;
			deltaDistanceY = center.y - prev_data.centerY;
			deltaDistance = this.getDistance(deltaDistanceX, deltaDistanceY);
			deltaDirection = this.getDirection(deltaDistanceX, deltaDistanceY);

			deltaTime = input.time - prev_data.time;
			deltaSpacing = prev_data.spacing - spacing;
		}

		var velocity_distanceX = 0, velocity_distanceY = 0, velocity_deltaTime = 0;
		var prev_velocity_data = this._prev_velocity_data;
		if (prev_velocity_data) {
			velocity_deltaTime = input.time - prev_velocity_data.time;
		}

		if (type != nexacro.Touch._TOUCH_CANCEL && (!prev_velocity_data || velocity_deltaTime > this.opt_interval || (type == nexacro.Touch._TOUCH_END && leadTime <= this.opt_interval))) {
			if (prev_velocity_data) {
				velocity_distanceX = distanceX - prev_velocity_data.distanceX;
				velocity_distanceY = distanceY - prev_velocity_data.distanceY;

				v = this.getVelocity(velocity_deltaTime, velocity_distanceX, velocity_distanceY);
				deltaVelocityX = v.x;
				deltaVelocityY = v.y;
				deltaVelocity = (Math.abs(v.x) > Math.abs(v.y)) ? v.x : v.y;
			}

			this._prev_velocity_data = computed_data;
		}
		else if (prev_velocity_data) {
			deltaVelocity = prev_velocity_data.deltaVelocity;
			deltaVelocityX = prev_velocity_data.deltaVelocityX;
			deltaVelocityY = prev_velocity_data.deltaVelocityY;
		}

		computed_data.deltaSpacing = deltaSpacing;
		computed_data.deltaDistanceX = deltaDistanceX;
		computed_data.deltaDistanceY = deltaDistanceY;
		computed_data.deltaDistance = deltaDistance;
		computed_data.deltaDirection = deltaDirection;
		computed_data.deltaTime = deltaTime;
		computed_data.deltaVelocityX = deltaVelocityX;
		computed_data.deltaVelocityY = deltaVelocityY;
		computed_data.deltaVelocity = deltaVelocity;

		this._max_touch_pointers = Math.max(this._max_touch_pointers, pointers);
		return computed_data;
	};

	_pTouchSession.getCenter = function (touches) {
		if (!touches) {
			return null;
		}

		var len = touches.length;
		var touch, pos;
		if (len === 1) {
			touch = touches[0];
			pos = nexacro._getPositionFromTouch(touch);
			return {
				x : Math.round(pos.x), 
				y : Math.round(pos.y)
			};
		}

		var x = 0, y = 0;
		for (var i = 0; i < len; i++) {
			touch = touches[i];
			pos = nexacro._getPositionFromTouch(touch);
			x += pos.x;
			y += pos.y;
		}

		return {
			x : Math.round(x / len), 
			y : Math.round(y / len)
		};
	};

	_pTouchSession.getAngle = function (dX, dY) {
		return Math.atan2(dY, dX) *  180 / Math.PI;
	};

	_pTouchSession.getDistance = function (dX, dY) {
		return Math.sqrt((dX *  dX) + (dY *  dY));
	};

	_pTouchSession.getDirection = function (dX, dY) {
		if (dX === dY) {
			return this.DIRECTIONS.NONE;
		}

		if (Math.abs(dX) >= Math.abs(dY)) {
			return dX < 0 ? this.DIRECTIONS.LEFT : this.DIRECTIONS.RIGHT;
		}
		return dY < 0 ? this.DIRECTIONS.UP : this.DIRECTIONS.DOWN;
	};

	_pTouchSession.getVelocity = function (dT, dX, dY) {
		return {
			x : (dX / dT) *  this._velocity_adjust_ratio || 0, 
			y : (dY / dT) *  this._velocity_adjust_ratio || 0
		};
	};

	if (nexacro._Browser != "Runtime") {
		_pTouchSession._applyCurrentZoomInfo = function () {
			var default_detectors = nexacro.TouchSession._default_gesture_detectors;
			var detector, detector_cnt = default_detectors ? default_detectors.length : 0;
			var zoomfactor = nexacro._getCurrentZoomfactor();
			var detectors = this._detectors;
			for (var i = 0; i < detector_cnt; i++) {
				detector = detectors[i];
				if (detector) {
					detector._on_applyCurrentZoomInfo(zoomfactor);
				}
			}
			this._scale = zoomfactor;
		};
	}
	else {
		_pTouchSession._applyCurrentZoomInfo = nexacro._emptyFn;
	}


	nexacro.TouchAction = function () {
		this.status = nexacro.TouchAction._STATUS_NONE;
	};
	var _pTouchAction = nexacro._createPrototype(nexacro.Object, nexacro.TouchAction);
	nexacro.TouchAction.prototype = _pTouchAction;
	_pTouchAction._type_name = "TouchAction";

	_pTouchAction.type = '';
	_pTouchAction.opt_enable = true;
	_pTouchAction.opt_touches = 1;
	_pTouchAction.opt_mintouches = 1;
	_pTouchAction.opt_accepttypes = 0;

	_pTouchAction._cur_evt_type = 0;
	_pTouchAction._cur_data = null;
	_pTouchAction._cur_session = null;

	_pTouchAction._prev_session_action_type = "";
	_pTouchAction._prev_session_action_data = null;

	nexacro.TouchAction._STATUS_NONE = 1;
	nexacro.TouchAction._STATUS_START = 2;
	nexacro.TouchAction._STATUS_PENDING = 3;
	nexacro.TouchAction._STATUS_END = 4;
	nexacro.TouchAction._STATUS_CANCEL = 5;

	nexacro.TouchAction._gesture_detectors = {
	};
	nexacro.TouchAction._registerGestureDetector = function (name, detector_class) {
		this._gesture_detectors[name] = detector_class;
	};
	nexacro.TouchAction._unregisterGestureDetector = function (name) {
		var detector_class = this._gesture_detectors[name];
		if (detector_class) {
			delete this._gesture_detectors[name];
		}
	};
	nexacro.TouchAction._getGestureDetector = function (name) {
		var detector_class = this._gesture_detectors[name];
		if (!detector_class) {
			return null;
		}

		return (new (detector_class)());
	};

	_pTouchAction._checkOption = function () {
		var data = this._cur_data;
		if (!data) {
			return false;
		}

		if (this.opt_touches == 0) {
			return data.touchPointers >= this.opt_mintouches;
		}
		else {
			return data.touchPointers === this.opt_touches;
		}
	};

	_pTouchAction._resetStatus = function () {
		if (this.status == nexacro.TouchAction._STATUS_END || this.status == nexacro.TouchAction._STATUS_CANCEL) {
			this.reset();
			this._setStatus(nexacro.TouchAction._STATUS_NONE);
		}
	};

	_pTouchAction._setStatus = function (status) {
		this.status = status;
		var evtType = this._cur_evt_type;

		switch (status) {
			case nexacro.TouchAction._STATUS_NONE:
				this.reset();
				break;
			case nexacro.TouchAction._STATUS_START:
				this._on_action(status);
				break;
			case nexacro.TouchAction._STATUS_PENDING:
				if (this.opt_accepttypes == 0 || this.opt_accepttypes & evtType) {
					this._on_action(status);
				}
				break;
			case nexacro.TouchAction._STATUS_END:
				this._on_action(status);
				this.reset();
				break;
			case nexacro.TouchAction._STATUS_CANCEL:
				this._on_cancel();
				this.reset();
				break;
		}
	};

	_pTouchAction._setStart = function () {
		return this._setStatus(nexacro.TouchAction._STATUS_START);
	};
	_pTouchAction._setPending = function () {
		return this._setStatus(nexacro.TouchAction._STATUS_PENDING);
	};
	_pTouchAction._setEnd = function () {
		return this._setStatus(nexacro.TouchAction._STATUS_END);
	};
	_pTouchAction._setCancel = function () {
		return this._setStatus(nexacro.TouchAction._STATUS_CANCEL);
	};

	_pTouchAction._isStarted = function () {
		return (this.status == nexacro.TouchAction._STATUS_START || 
			this.status == nexacro.TouchAction._STATUS_PENDING);
	};

	_pTouchAction._analysysGesture = function () {
		var evtType = this._cur_evt_type;

		var passOption = this._checkOption();
		if (passOption) {
			if (evtType == nexacro.Touch._TOUCH_END) {
				this._setEnd();
			}
			else if (this._isStarted()) {
				this._setPending();
			}
			else {
				this._setStart();
			}
		}
		else {
			if (this._isStarted()) {
				this._setCancel();
			}
			else {
				this.reset();
			}
		}
	};

	_pTouchAction.detect = function (evtType, session) {
		if (!session) {
			return;
		}

		if (!this.opt_enable) {
			this.reset();
			return;
		}

		this._cur_evt_type = evtType;
		this._cur_data = session.getActionData();
		this._cur_session = session;

		if (session._prev_session_action_type) {
			this._prev_session_action_type = session._prev_session_action_type;
			this._prev_session_action_data = session._prev_session_action_data;
		}

		this._resetStatus();

		return this._analysysGesture();
	};

	_pTouchAction.cancel = function () {
		if (this.opt_enable && this._isStarted()) {
			this._setCancel();
		}
		else {
			this.reset();
		}
	};

	_pTouchAction.reset = function () {
	};

	_pTouchAction._on_action = function (status) {
		var session = this._cur_session;
		if (!session) {
			return;
		}

		var data = this._cur_data;
		if (!data) {
			return;
		}

		session.onaction(this.type, status, data);
	};
	_pTouchAction._on_cancel = function () {
		var session = this._cur_session;
		if (!session) {
			return;
		}

		session.onaction(this.type, nexacro.TouchAction._STATUS_CANCEL, this);
	};

	_pTouchAction._on_applyCurrentZoomInfo = function (zoomfactor) {
	};

	nexacro.TouchAction_Slide = function () {
		nexacro.TouchAction.call(this);
		this._target_comp = null;
		this._fling_timing_function = new nexacro._CubicBezier(0, 0, 0.5, 1);
	};
	var _pTouchActionSlide = nexacro._createPrototype(nexacro.TouchAction, nexacro.TouchAction_Slide);
	nexacro.TouchAction_Slide.prototype = _pTouchActionSlide;
	_pTouchActionSlide._type_name = "TouchAction_Slide";

	nexacro.TouchAction._registerGestureDetector('slide', nexacro.TouchAction_Slide);

	_pTouchActionSlide.type = 'slide';
	_pTouchActionSlide.opt_accepttypes = 0;
	_pTouchActionSlide.opt_touches = 1;
	_pTouchActionSlide.opt_mintouches = 1;
	_pTouchActionSlide.opt_threshold = 9;
	_pTouchActionSlide.opt_velocity = 0.3;
	_pTouchActionSlide.opt_friction = 0.997;
	_pTouchActionSlide.opt_fling_threshold = 25;
	_pTouchActionSlide.opt_direction = nexacro.Touch._DIRECTION_ALL;
	_pTouchActionSlide.opt_distance_base = 350;

	_pTouchActionSlide._is_fling = false;
	_pTouchActionSlide._fling_timing_function = null;
	_pTouchActionSlide._fling_timer = null;

	_pTouchActionSlide._fling_start_time = 0;
	_pTouchActionSlide._fling_duration = 0;
	_pTouchActionSlide._fling_point = null;

	_pTouchActionSlide._on_applyCurrentZoomInfo = function (zoomfactor) {
		this.opt_threshold /= zoomfactor;
		this.opt_velocity /= zoomfactor;
		this.opt_distance_base /= zoomfactor;
		this.opt_fling_threshold /= zoomfactor;
	};

	_pTouchActionSlide._checkOption = function () {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		var evtType = this._cur_evt_type;
		if (this._isStarted()) {
			return true;
		}
		else if (evtType == nexacro.Touch._TOUCH_END) {
			return false;
		}

		var data = this._cur_data;
		if (!data) {
			return false;
		}

		var direction = (data.deltaDirection & this.opt_direction);
		if (!direction) {
			return false;
		}
		return data.distance > this.opt_threshold;
	};

	_pTouchActionSlide._checkFlingOption = function (evtType, session) {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		evtType = this._cur_evt_type;
		session = this._cur_session;
		var data = this._cur_data;
		if (!data || evtType != nexacro.Touch._TOUCH_END) {
			return false;
		}

		if (session._fling_blocked === true) {
			return false;
		}

		var velocity, opt_direction = this.opt_direction;
		if (!opt_direction || !data.deltaDirection || data.distance <= this.opt_fling_threshold) {
			return false;
		}

		velocity = data.deltaVelocity;

		return Math.abs(velocity) > this.opt_velocity;
	};

	_pTouchActionSlide._analysysGesture = function () {
		nexacro.TouchAction.prototype._analysysGesture.call(this);

		if (this.status == nexacro.TouchAction._STATUS_END && this._checkFlingOption()) {
			var session = this._cur_session;
			var data = this._cur_data;
			if (!session || !data) {
				return;
			}

			var comp = session._cur_elem;
			while (comp && !comp._is_component) {
				comp = comp.parent;
			}

			if (!comp || !comp._is_component) {
				return;
			}

			this._target_comp = comp;
			this._on_action_fling(this.status);
		}
	};

	_pTouchActionSlide._on_action_fling = function () {
		var session = this._cur_session;
		var data = this._cur_data;
		if (!session || !data) {
			return;
		}

		var comp = this._target_comp;
		if (!comp) {
			return;
		}

		var distance_adjust_ratio = data.distance / this.opt_distance_base;
		if (distance_adjust_ratio > 1) {
			distance_adjust_ratio = 1;
		}

		var durationX = 0, distanceX = 0, velocityX = data.deltaVelocityX;
		if (Math.abs(velocityX) >= this.opt_velocity) {
			durationX = Math.log(this.opt_velocity / Math.abs(velocityX)) / Math.log(this.opt_friction);
			distanceX = velocityX *  (1 - Math.pow(this.opt_friction, durationX + 1)) / (1 - this.opt_friction);
			distanceX *= distance_adjust_ratio;
		}

		var durationY = 0, distanceY = 0, velocityY = data.deltaVelocityY;
		if (Math.abs(velocityY) >= this.opt_velocity) {
			durationY = Math.log(this.opt_velocity / Math.abs(velocityY)) / Math.log(this.opt_friction);
			distanceY = velocityY *  (1 - Math.pow(this.opt_friction, durationY + 1)) / (1 - this.opt_friction);
			distanceY *= distance_adjust_ratio;
		}

		data.leadTime = 0;
		data.distanceX = distanceX;
		data.distanceY = distanceY;
		data.deltaDistanceX = 0;
		data.deltaDistanceY = 0;

		var ret;

		this.status = nexacro.TouchAction._STATUS_START;
		ret = session.onaction("fling", nexacro.TouchAction._STATUS_START, data);

		if (ret === false) {
			this.reset();
			return;
		}

		this._is_fling = true;
		this._fling_duration = Math.max(durationX, durationY);
		this._fling_point = {
			x : 0, 
			y : 0
		};

		var pthis = this;
		this._fling_timer = new nexacro.AnimationFrame(comp, function () {
			pthis._on_fling_frame();
		});
		this._fling_timer.start();
		this._fling_start_time = (new Date()).getTime();
	};

	_pTouchActionSlide._on_fling_frame = function () {
		var session = this._cur_session;
		var data = this._cur_data;
		if (!session || !data) {
			return;
		}

		var distanceX = data.distanceX;
		var distanceY = data.distanceY;

		var timing_function = this._fling_timing_function;

		var leadTime = (new Date()).getTime() - this._fling_start_time;
		data.deltaTime = leadTime - data.leadTime;
		data.leadTime = leadTime;

		var duration = this._fling_duration;
		var c = (leadTime / duration);
		if (c < 1) {
			this._fling_timer.start();
		}
		var epsilon = 1.0 / (200 *  duration);
		var p1_x = timing_function._p1.x, p2_x = timing_function._p2.x;
		var p1_y = timing_function._p1.y, p2_y = timing_function._p2.y;

		var tx = timing_function._getTForCoordinate(c, p1_x, p2_x, epsilon);
		var cy = timing_function._getCoordinateForT(tx, p1_y, p2_y);

		var prev_point = this._fling_point;
		this._fling_point = {
			x : tx, 
			y : cy
		};

		var offset_cy = cy - prev_point.y;
		data.deltaDistanceX = (offset_cy *  distanceX);
		data.deltaDistanceY = (offset_cy *  distanceY);

		this.status = nexacro.TouchAction._STATUS_PENDING;
		session.onaction("fling", this.status, data);

		if (c >= 1) {
			data.deltaDistanceX = 0;
			data.deltaDistanceY = 0;
			this.status = nexacro.TouchAction._STATUS_END;
			session.onaction("fling", this.status, data);
			this._is_fling = false;
			this._fling_start_time = null;
			this._fling_coord = null;
			return;
		}
	};

	_pTouchActionSlide.reset = function () {
		nexacro.TouchAction.prototype.reset.call(this);

		if (this._fling_timer) {
			this._fling_timer.stop();
			this._fling_timer = null;
		}

		if (this._is_fling) {
			var session = this._cur_session;
			var data = this._cur_data;
			if (session && data) {
				data.deltaDistanceX = 0;
				data.deltaDistanceY = 0;
				this.status = nexacro.TouchAction._STATUS_END;
				session.onaction("fling", this.status, data);
				this._is_fling = false;
			}
		}

		this._target_comp = null;
		this._is_fling = false;
		this._fling_start_time = null;
		this._fling_coord = null;
	};

	nexacro.TouchAction_Pinch = function () {
		nexacro.TouchAction.call(this);
	};
	var _pTouchActionPinch = nexacro._createPrototype(nexacro.TouchAction, nexacro.TouchAction_Pinch);
	nexacro.TouchAction_Pinch.prototype = _pTouchActionPinch;
	_pTouchActionPinch._type_name = "TouchAction_Pinch";

	nexacro.TouchAction._registerGestureDetector('pinch', nexacro.TouchAction_Pinch);

	_pTouchActionPinch.type = 'pinch';
	_pTouchActionPinch.opt_accepttypes = 0;
	_pTouchActionPinch.opt_touches = 0;
	_pTouchActionPinch.opt_mintouches = 2;
	_pTouchActionPinch.opt_threshold = 9;

	_pTouchActionPinch._on_applyCurrentZoomInfo = function (zoomfactor) {
		this.opt_threshold /= zoomfactor;
	};

	_pTouchActionPinch._checkOption = function () {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		if (this._isStarted()) {
			return true;
		}

		var data = this._cur_data;
		if (!data) {
			return false;
		}

		if (Math.abs(data.accDeltaSpacing) > this.opt_threshold) {
			return true;
		}
		return false;
	};

	nexacro.TouchAction_Press = function () {
		nexacro.TouchAction.call(this);

		this._timer = null;
		this._data = null;
	};
	var _pTouchActionPress = nexacro._createPrototype(nexacro.TouchAction, nexacro.TouchAction_Press);
	nexacro.TouchAction_Press.prototype = _pTouchActionPress;
	_pTouchActionPress._type_name = "TouchAction_Press";

	nexacro.TouchAction._registerGestureDetector('longpress', nexacro.TouchAction_Press);

	_pTouchActionPress.type = 'longpress';
	_pTouchActionPress.opt_accepttypes = 5;
	_pTouchActionPress.opt_touches = 1;
	_pTouchActionPress.opt_time = 301;
	_pTouchActionPress.opt_threshold = 9;

	_pTouchActionPress._on_applyCurrentZoomInfo = function (zoomfactor) {
		this.opt_threshold /= zoomfactor;
	};

	_pTouchActionPress._checkOption = function () {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		var data = this._cur_data;
		if (!data) {
			return false;
		}

		return (data.distance < this.opt_threshold);
	};

	_pTouchActionPress.reset = function () {
		nexacro.TouchAction.prototype.reset.call(this);
		this._clearTimer();
	};

	_pTouchActionPress._clearTimer = function () {
		if (this._timer) {
			var session = this._cur_session;
			if (session && session._start_win) {
				nexacro._clearSystemTimer(session._start_win.handle, this._timer);
			}
			this._timer = null;
		}
	};

	nexacro._on_bindTouchLongPressTimerHandler = function (pthis) {
		return function (evt) {
			if (pthis) {
				if (evt) {
					window._event = evt;
				}
				pthis._setStart();
				pthis._clearTimer();
				pthis = null;
			}
		};
	};

	_pTouchActionPress._analysysGesture = function () {
		var evtType = this._cur_evt_type;
		var session = this._cur_session;

		if (!session) {
			return;
		}

		var data = this._cur_data;
		if (!data) {
			return;
		}

		var bPressed = data.leadTime > this.opt_time;

		var passOption = this._checkOption();
		if (passOption) {
			if (evtType == nexacro.Touch._TOUCH_START) {
				this.reset();

				var win_handle = nexacro._getWindowHandle(session._start_win.handle);
				var timer_handler = nexacro._on_bindTouchLongPressTimerHandler(this);
				this._timer = nexacro._setSystemTimer(win_handle, timer_handler, this.opt_time, nexacro._getWindowEvent());
			}
			else if (evtType == nexacro.Touch._TOUCH_END) {
				this.reset();
				if (bPressed) {
					this._setEnd();
				}
				else {
					this._resetStatus();
				}
			}
			else if (evtType == nexacro.Touch._TOUCH_CANCEL) {
				this.reset();
				if (bPressed) {
					this._setCancel();
				}
				else {
					this._resetStatus();
				}
			}
		}
		else {
			this.reset();
		}
	};

	nexacro.TouchAction_Tap = function () {
		nexacro.TouchAction.call(this);
	};
	var _pTouchActionTap = nexacro._createPrototype(nexacro.TouchAction, nexacro.TouchAction_Tap);
	nexacro.TouchAction_Tap.prototype = _pTouchActionTap;
	_pTouchActionTap._type_name = "TouchAction_Tap";

	nexacro.TouchAction._registerGestureDetector('tap', nexacro.TouchAction_Tap);

	_pTouchActionTap.type = 'tap';
	_pTouchActionTap.opt_accepttypes = 5;
	_pTouchActionTap.opt_touches = 1;
	_pTouchActionTap.opt_time = 300;
	_pTouchActionTap.opt_distance = 50;
	_pTouchActionTap.opt_interval = 350;
	_pTouchActionTap.opt_threshold = 20;

	_pTouchActionTap._on_applyCurrentZoomInfo = function (zoomfactor) {
		this.opt_threshold /= zoomfactor;
		this.opt_distance /= zoomfactor;
	};

	_pTouchActionTap._checkOption = function () {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		var data = this._cur_data;
		if (!data) {
			return false;
		}
		return (data.distance < this.opt_distance && data.leadTime < this.opt_time);
	};

	_pTouchActionTap._checkDblTapOption = function () {
		if (!nexacro.TouchAction.prototype._checkOption.call(this)) {
			return false;
		}

		var data = this._cur_data;
		var prev_data = this._prev_session_action_data;
		if (!data || !prev_data) {
			return false;
		}

		var distanceX = data.centerX - prev_data.centerX;
		var distanceY = data.centerY - prev_data.centerY;
		var distance = Math.sqrt((distanceX *  distanceX) + (distanceY *  distanceY));
		var intervalTime = data.time - prev_data.time;

		return (intervalTime < this.opt_interval) && (distance < this.opt_threshold);
	};

	_pTouchActionTap.reset = function () {
		nexacro.TouchAction.prototype.reset.call(this);
		this._target_comp = null;
	};

	_pTouchActionTap._analysysGesture = function () {
		var evtType = this._cur_evt_type;
		var session = this._cur_session, comp;

		if (evtType == nexacro.Touch._TOUCH_START && this._target_comp == null) {
			comp = session._cur_elem;
			while (comp && !comp._is_component) {
				comp = comp.parent;
			}
			if (!comp || !comp._is_component) {
				return;
			}

			this._target_comp = comp;
		}

		var passOption = this._checkOption();
		if (passOption) {
			if (!this._target_comp || evtType != nexacro.Touch._TOUCH_END) {
				return;
			}

			comp = session._cur_elem;
			while (comp && !comp._is_component) {
				comp = comp.parent;
			}
			if (!comp || !comp._is_component || this._target_comp != comp) {
				return;
			}

			this._setEnd();

			if (this._prev_session_action_type == "tap") {
				if (this._checkDblTapOption()) {
					this._on_action_dbltap(this.status);
				}
			}
		}

		return this.state;
	};

	_pTouchActionTap._on_action_dbltap = function (status) {
		var session = this._cur_session;
		var data = this._cur_data;
		if (!session || !data) {
			return;
		}

		session.onaction("dbltap", status, data);
	};

	nexacro.ItemClickEventInfo = function (obj, id, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		nexacro.ClickEventInfo.call(this, obj, id || "onitemclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);
		this.fromobject = this.fromreferenceobject = obj;

		this.index = index;
		this.itemtext = itemtext;
		this.itemvalue = itemvalue;
	};
	var _pItemClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.ItemClickEventInfo);
	nexacro.ItemClickEventInfo.prototype = _pItemClickEventInfo;
	_pItemClickEventInfo._type_name = "ItemClickEventInfo";


	nexacro.ChangeEventInfo = function (obj, id, pretext, prevalue, posttext, postvalue) {
		nexacro.Event.call(this, obj, id || "onchange");

		this.pretext = pretext;
		this.prevalue = prevalue;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangeEventInfo);
	nexacro.ChangeEventInfo.prototype = _pChangeEventInfo;
	_pChangeEventInfo._type_name = "ChangeEventInfo";

	nexacro.ChangedEventInfo = function (obj, id, pretext, prevalue, posttext, postvalue) {
		this.id = this.eventid = id || "onchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.prevalue = prevalue;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangedEventInfo);
	nexacro.ChangedEventInfo.prototype = _pChangedEventInfo;
	_pChangedEventInfo._type_name = "ChangedEventInfo";

	nexacro.InnerdataChangedEventInfo = function (obj, id, oldvalue, newvalue, columnid, col, row) {
		this.id = this.eventid = id || "oninnerdatachanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.oldvalue = oldvalue;
		this.newvalue = newvalue;
		this.columnid = columnid;
		this.col = col;
		this.row = row;
	};
	var _pInnerdataChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.InnerdataChangedEventInfo);
	nexacro.InnerdataChangedEventInfo.prototype = _pInnerdataChangedEventInfo;
	_pInnerdataChangedEventInfo._type_name = "InnerdataChangedEventInfo";

	nexacro.ItemChangeEventInfo = function (obj, id, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		this.id = this.eventid = id || "onitemchagne";
		this.fromobject = this.fromreferenceobject = obj;

		this.preindex = preindex;
		this.pretext = pretext;
		this.prevalue = prevalue;
		this.postindex = postindex;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pItemChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ItemChangeEventInfo);
	nexacro.ItemChangeEventInfo.prototype = _pItemChangeEventInfo;
	_pItemChangeEventInfo._type_name = "ItemChangeEventInfo";


	nexacro.DuplicateExecutionEventInfo = function (obj, id, _arguments, apparguments, envarguments, cookiearguments) {
		this.id = this.eventid = id || "onduplicateexecution";
		this.fromobject = this.fromreferenceobject = obj;

		this.arguments = _arguments;
		this.apparguments = apparguments;
		this.envarguments = envarguments;
		this.cookiearguments = cookiearguments;
	};

	var _pDuplicateExecutionEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DuplicateExecutionEventInfo);
	nexacro.DuplicateExecutionEventInfo.prototype = _pDuplicateExecutionEventInfo;
	_pDuplicateExecutionEventInfo._type_name = "DuplicateExecutionEventInfo";


	nexacro.UserNotify = function (obj, id, notifyid, message) {
		this.id = this.eventid = id || "onusernotify";
		this.fromobject = this.fromreferenceobject = obj;

		this.notifyid = notifyid;
		this.message = message;
	};
	var _pEventUserNotify = nexacro._createPrototype(nexacro.Event, nexacro.UserNotify);
	nexacro.UserNotify.prototype = _pEventUserNotify;
	_pEventUserNotify._type_name = "UserNotifyEvent";


	nexacro.ApplicationUserNotify = function (obj, id, userdata) {
		this.id = this.eventid = id || "onusernotify";
		this.fromobject = this.fromreferenceobject = obj;

		this.userdata = userdata;
	};
	var _pEventAppUserNotify = nexacro._createPrototype(nexacro.Event, nexacro.ApplicationUserNotify);
	nexacro.ApplicationUserNotify.prototype = _pEventAppUserNotify;
	_pEventAppUserNotify._type_name = "ApplicationUserNotifyEvent";

	nexacro.AddLog = function (obj, id, message) {
		this.id = this.eventid = id || "onaddlog";
		this.fromobject = this.fromreferenceobject = obj;
		this.message = message;
	};
	var _pEventAddLog = nexacro._createPrototype(nexacro.Event, nexacro.AddLog);
	nexacro.AddLog.prototype = _pEventAddLog;
	_pEventAddLog._type_name = "AddLogEvent";

	nexacro.Communication = function (obj, id, state) {
		this.id = this.eventid = id || "oncommunication";
		this.fromobject = this.fromreferenceobject = obj;
		this.state = state;
	};
	var _pEventCommunication = nexacro._createPrototype(nexacro.Event, nexacro.Communication);
	nexacro.Communication.prototype = _pEventCommunication;
	_pEventCommunication._type_name = "CommunicationEvent";

	nexacro.NotificationEventInfo = function (obj, id, reason, messages) {
		this.id = this.eventid = id || "onnotification";
		this.fromobject = this.fromreferenceobject = obj;

		this.reason = reason;
		if (this.reason == 200 || this.resaon == '200') {
			this.messages = messages;
		}
	};
	var _pNotificationEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.NotificationEventInfo);
	nexacro.NotificationEventInfo.prototype = _pNotificationEventInfo;
	_pNotificationEventInfo._type_name = "NotificationEventInfo";

	nexacro.DevicePermissionEventInfo = function (obj, id, reason, status) {
		this.id = this.eventid = id || "ondevicepermission";
		this.fromobject = this.fromreferenceobject = obj;

		this.reason = reason;
		this.status = status;
	};
	var _pDevicePermissionEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DevicePermissionEventInfo);
	nexacro.DevicePermissionEventInfo.prototype = _pDevicePermissionEventInfo;
	_pDevicePermissionEventInfo._type_name = "DevicePermissionEventInfo";

	delete _pDevicePermissionEventInfo;

	nexacro._gen_arrmap = function (arr) {
		var arr_map = {
		};
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			arr_map[arr[i]] = i;
		}
		return arr_map;
	};

	if (nexacro._Browser == "Runtime") {
		nexacro.base64Encode = function (input) {
			return nexacro.__base64Encode(input);
		};
		nexacro.base64Decode = function (input) {
			return nexacro.__base64Decode(input);
		};
	}

	else {
		(function () {
			var _base64keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split('');
			var _base64keys = nexacro._gen_arrmap(_base64keyStr);
			var _re_not_base64Chars = /[^A-Za-z0-9\+\/\=]/g;

			nexacro.base64Encode = function (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				var _chr2, _chr3;

				input = nexacro.utf8Encode(input);

				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					_chr2 = +chr2;
					_chr3 = +chr3;
					if (_chr2 != _chr2) {
						enc3 = enc4 = 64;
					}
					else if (_chr3 != _chr3) {
						enc4 = 64;
					}

					output = output + _base64keyStr[enc1] + _base64keyStr[enc2] + _base64keyStr[enc3] + _base64keyStr[enc4];
				}

				return output;
			};

			nexacro.base64Decode = function (input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;

				input = input.replace(_re_not_base64Chars, "");

				while (i < input.length) {
					enc1 = _base64keys[input[i++]];
					enc2 = _base64keys[input[i++]];
					enc3 = _base64keys[input[i++]];
					enc4 = _base64keys[input[i++]];

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				return nexacro.utf8Decode(output);
			};

			nexacro.utf8Encode = function (string) {
				var utf = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);

					if (c == 13) {
						if (string.charCodeAt(n + 1) != '\n') {
							utf += String.fromCharCode(c);
						}
					}
					else if (c < 128) {
						utf += String.fromCharCode(c);
					}
					else if ((c > 127) && (c < 2048)) {
						utf += String.fromCharCode((c >> 6) | 192);
						utf += String.fromCharCode((c & 63) | 128);
					}
					else {
						utf += String.fromCharCode((c >> 12) | 224);
						utf += String.fromCharCode(((c >> 6) & 63) | 128);
						utf += String.fromCharCode((c & 63) | 128);
					}
				}
				return utf;
			};

			nexacro.utf8Decode = function (utftext) {
				var i = 0, c = 0, c2 = 0, c3 = 0;

				var string = [];
				while (i < utftext.length) {
					c = utftext.charCodeAt(i);

					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					}
					else if ((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					}
					else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				return string;
			};
		})();
	}

	nexacro._checkBase64String = function (str) {
		var regExp = /[^A-Za-z0-9+\/=]/g;

		if (str === "" || str == null) {
			return false;
		}

		if (str.length >= 10 && str.substr(0, 10).toLowerCase() == "data:image") {
			return true;
		}

		if (str.match(regExp) == null) {
			return true;
		}


		return false;
	};
	nexacro._transImageBase64StringFormat = function (str, isinvaildskip, isnodatacheck) {
		var regExp = /[^A-Za-z0-9+\/=]/g;
		var base64format = {
		};
		if (str === "" || str == null) {
			return null;
		}
		var arrstr = str.split(',');
		var length = arrstr.length;

		var header, reg_exps0, reg_exps1, result, ext;
		switch (length) {
			case 1:
				if (isnodatacheck) {
					return null;
				}
				if (!isinvaildskip) {
					if (str.match(regExp) == null) {
						base64format.data = "data:image";
						base64format.ext = "";
						base64format.encode = ";base64,";
						base64format.contents = arrstr[0];
					}
					else {
						return null;
					}
				}
				else {
					base64format.data = "data:image";
					base64format.ext = "";
					base64format.encode = ";base64,";
					base64format.contents = arrstr[0];
				}
				break;
			case 2:
				header = arrstr[0].toLowerCase();
				reg_exps0 = /(data:image)+?(;base64)/ig;
				reg_exps1 = /(data:image).+?(;base64)/ig;
				result = reg_exps0.exec(header);
				if (result == null) {
					result = reg_exps1.exec(header);
				}
				if (result != null && result.length == 3) {
					base64format.data = result[1];
					ext = header.replace("data:image", "");
					ext = ext.replace("\;base64", "");


					if (ext) {
						base64format.ext = ext;
					}
					else {
						base64format.ext = "";
					}
					base64format.encode = result[2] + ",";
					base64format.contents = arrstr[1];
				}
				else {
					if (isnodatacheck) {
						return null;
					}
					if (isinvaildskip) {
						base64format.data = "data:image";
						base64format.ext = "";
						base64format.encode = ";base64,";
						base64format.contents = arrstr[1];
					}
					else {
						return null;
					}
				}
				break;
			default:
				return null;
				break;
		}

		base64format.alldata = base64format.data + base64format.ext + base64format.encode + base64format.contents;
		return base64format;
	};


	nexacro._mergeUrl = function (left, right) {
		if (left && right) {
			if (left.charAt(left.length - 1) == '/') {
				if (right.charAt(0) == '/') {
					return left + right.substring(1);
				}
				else {
					return left + right;
				}
			}
			else {
				if (right.charAt(0) == '/') {
					return left + right;
				}
				else {
					return left + '/' + right;
				}
			}
		}
		else {
			return left || right;
		}
	};


	nexacro._findParentComponent = function (elem) {
		var _comp = elem.parent;
		while (_comp && !_comp._is_component) {
			_comp = _comp.parent;
		}
		return _comp;
	};
	nexacro._findParentForm = function (comp) {
		var ctx = comp.parent;
		while (ctx && !ctx._is_form) {
			ctx = ctx.parent;
		}
		return ctx;
	};
	nexacro._findReferenceForm = function (comp) {
		var ctx = comp;
		while (ctx && !ctx._is_form) {
			ctx = ctx.parent;
		}
		return ctx;
	};

	nexacro._findParentContext = function (comp) {
		var ctx = comp.parent;
		while (ctx && !ctx._is_context) {
			ctx = ctx.parent;
		}
		return ctx;
	};
	nexacro._findReferenceContext = function (comp) {
		var ctx = comp;
		while (ctx && !ctx._is_context) {
			ctx = ctx.parent;
		}
		return ctx;
	};

	nexacro._findParentFrame = function (comp) {
		var frame = comp.parent;
		while (frame && !frame._is_frame) {
			frame = frame.parent;
		}
		return frame;
	};
	nexacro._findParentWindow = function (comp) {
		var win = comp.parent;
		while (win && !win._is_window) {
			win = win.parent;
		}
		return win;
	};



	nexacro._setForwardingSystemEventHandlers = function (ptype) {
		var base = nexacro.Component.prototype;
		ptype._on_sys_focus = base._on_sys_focus_forward;
		ptype._on_sys_lbuttondown = base._on_sys_lbuttondown_forward;
		ptype._on_sys_lbuttonup = base._on_sys_lbuttonup_forward;
		ptype._on_sys_rbuttondown = base._on_sys_rbuttondown_forward;
		ptype._on_sys_rbuttonup = base._on_sys_rbuttonup_forward;
		ptype._on_sys_mouseenter = base._on_sys_mouseenter_forward;
		ptype._on_sys_mouseleave = base._on_sys_mouseleave_forward;
		ptype._on_sys_mousemove = base._on_sys_mousemove_forward;
		ptype._on_sys_keydown = base._on_sys_keydown_forward;
		ptype._on_sys_keypress = base._on_sys_keypress_forward;
		ptype._on_sys_keyup = base._on_sys_keyup_forward;
		ptype._on_sys_dblclick = base._on_sys_dblclick_forward;
		ptype._on_sys_mousewheel = base._on_sys_mousewheel_forward;
		ptype._on_sys_dragleave = base._on_sys_dragleave_forward;
		ptype._on_sys_drop = base._on_sys_drop_forward;
		ptype._on_sys_dragenter = base._on_sys_dragenter_forward;
		ptype._on_sys_dragmove = base._on_sys_dragmove_forward;
		ptype._on_sys_touch = base._on_sys_touch_forward;
	};








	nexacro._CommunicationStatusTable = 
		{
		"cancel_byuser" : 10400, 
		"stop_transaction_byesc" : 10401, 
		"duplication_svcid" : 10405, 
		"client_timeout" : 10408, 
		"server_timeout" : 10504, 
		"failunknown" : 10499, 
		"invalid_communication_format" : 10599
	};

	nexacro._CommunicationManager = {
	};
	nexacro._CacheList = {
	};
	nexacro._DataCacheList = {
	};
	nexacro._DataObjectCacheList = {
	};

	nexacro._ParametersCache = function (id, value) {
		this.id = id;
		this.value = value;
	};
	nexacro._DataSetCache = function (id, colinfos, constVars, rawRecords) {
		this.id = id;
		this.rawRecords = null;
		this.colinfos = null;
		this.constVars = null;

		if (rawRecords) {
			this.rawRecords = nexacro._cloneObject(rawRecords);
		}

		var i;
		if (colinfos) {
			this.colinfos = new nexacro.DSColumnInfoList();
			for (i = 0; i < colinfos.length; i++) {
				this.colinfos.add(colinfos[i].id, colinfos[i]);
			}
		}

		if (constVars) {
			this.constVars = new nexacro.VariableList();
			for (i = 0; i < constVars.length; i++) {
				this.constVars.add(constVars[i].id, constVars[i]);
			}
		}
	};

	nexacro._DataObjectCache = function (dataobject, last_modified, version, data, response_headers) {
		this.dataobject = dataobject;
		this.last_modified = last_modified;
		this.version = version;
		this.data = data;
		this.response_headers = response_headers;
	};
	var __pDataObjectCache = nexacro._createPrototype(nexacro.Object, nexacro._DataObjectCache);
	nexacro._DataObjectCache.prototype = __pDataObjectCache;
	__pDataObjectCache._type_name = "DataObjectCache";

	__pDataObjectCache._loadDataObject = function (loadItem) {
		var json;
		var data = this.data;
		var dataobject = this.dataobject;
		var errorinfo = [0, "SUCCESS"];
		try {
			if (data) {
				json = JSON.parse(data);
			}
			dataobject._addResponseInfo(data, this.response_headers);
		}
		catch (e) {
			errorinfo = [-1, ""];
		}

		return [errorinfo, dataobject, data, json, this.response_headers];
	};

	nexacro._DataCache = function (parametersCaches, datasetCaches, last_modified, version) {
		this.parameters = parametersCaches;
		this.datasets = datasetCaches;
		this.last_modified = last_modified;
		this.version = version;
	};
	var __pDataCache = nexacro._createPrototype(nexacro.Object, nexacro._DataCache);
	nexacro._DataCache.prototype = __pDataCache;
	__pDataCache._type_name = "DataCache";

	__pDataCache._loadData = function (loadItem) {
		var err_info = this._loadParametersFromCache(loadItem);
		this._loadDatasetsFromCache(loadItem, err_info[0], err_info[1]);

		return err_info;
	};

	__pDataCache._loadParametersFromCache = function (loadItem) {
		var params = this.parameters;
		var len = params.length;
		var form = loadItem.context;
		var id, val, code, message;

		for (var i = 0; i < len; i++) {
			id = params[i].id;
			val = params[i].value;

			if (id == "ErrorCode") {
				code = parseInt(val) | 0;
				if (isFinite(code) === false) {
					code = -1;
				}
			}
			else if (id == "ErrorMsg") {
				message = val;
			}
			else if (id in form) {
				if (typeof (form[id]) != "object") {
					form[id] = val;
				}
			}
			else {
				var app = nexacro.getApplication();
				if (app._existVariable(id)) {
					app[id] = val;
				}
			}
		}

		return [code, message];
	};

	__pDataCache._loadDatasetsFromCache = function (loadItem, errorcd, errormsg) {
		var datasets = this.datasets;
		var outputDatasets = loadItem.outputDatasets;

		if (!outputDatasets) {
			return;
		}

		var len = outputDatasets.length;
		var form = loadItem.context;
		var ds_cache, ds;
		var localId, constVars, colinfos, rawRecords;

		for (var i = 0; i < len; i++) {
			localId = outputDatasets[i].lval;
			ds_cache = datasets[localId];
			if (!ds_cache) {
				continue;
			}

			constVars = ds_cache.constVars;
			colinfos = ds_cache.colinfos;
			rawRecords = ds_cache.rawRecords;

			ds = form._getDatasetObject(localId);
			if (ds) {
				var target_colinfos = colinfos;

				if (ds.useclientlayout) {
					ds.clearData();
					target_colinfos = ds.colinfos;
				}
				else {
					ds.clear();
					ds._copyConstColList(constVars);
					ds._appendColList(colinfos);
				}

				if (rawRecords) {
					if (target_colinfos == colinfos) {
						ds._rawRecords = nexacro._cloneObject(rawRecords);
					}
					else {
						if (colinfos) {
							var colid, colidx, index;
							var expr = "(function(){ return function(arr) { var ret = new Array(); ";
							for (var j = 0; j < colinfos.length; j++) {
								colid = colinfos[j].id;
								colidx = target_colinfos._idxMap[colid];
								if (colidx >= 0) {
									index = target_colinfos[colidx]._index;
									expr += "ret[" + index + "] = arr[" + index + "];";
								}
							}

							expr += "return ret; };})();";

							var convertFn = nexacro._executeGlobalEvalStr(expr);
							for (var k = 0; k < rawRecords.length; k++) {
								ds._rawRecords[k] = convertFn(rawRecords[k]);
								ds._rawRecords[k]._rawidx = rawRecords[k]._rawidx;
								ds._rawRecords[k]._rtype = rawRecords[k]._rtype;
								if (rawRecords[k]._orgcolstrings) {
									ds._rawRecords[k]._orgcolstrings = convertFn(rawRecords[k]._orgcolstrings);
								}
							}
						}
					}

					ds._reFilter();
					ds._resetSortGroup();

					if (ds._eventstat) {
						ds.on_fire_onload(errorcd, errormsg, 0);
						if (ds._viewRecords.length > 0) {
							ds._forcesetRowPosition(0, 51);
						}
						else {
							ds._forcesetRowPosition(-1, 51);
						}
					}
					else if (ds._viewRecords.length > 0) {
						ds.rowposition = 0;
					}
				}
			}
		}
	};

	nexacro._ImgInfoCacheList = {
	};
	nexacro._getImageCacheMaps = function () {
		return nexacro._ImgInfoCacheList;
	};

	nexacro._getCSSMaps = function () {
		nexacro._dimension_maps = {
		};
		return nexacro._dimension_maps;
	};

	nexacro._setCSSMaps = function (map, extra) {
		if (!nexacro._dimension_maps) {
			nexacro._dimension_maps = map;
			nexacro._include_status_map = false;
			if (extra) {
				nexacro._include_status_map = extra.includeStatusMap;
				nexacro._has_listview_expand_status = extra.hasListViewExpandStatus;
			}
		}
		else {
			var cssmap = nexacro._dimension_maps, item, mapitem;
			for (item in map) {
				if (map.hasOwnProperty(item)) {
					mapitem = map[item];
					if (cssmap[item]) {
						nexacro._updateCSSMaps(cssmap[item], mapitem, item);
					}
					else {
						cssmap[item] = mapitem;
					}
				}
			}
		}
	};

	nexacro._updateCSSMaps = function (cssmap, updatemap, selfitem, parentitem) {
		var item, mapitem;
		if (parentitem == "self") {
			for (item in updatemap) {
				if (updatemap.hasOwnProperty(item)) {
					mapitem = updatemap[item];
					cssmap[item] = mapitem;
				}
			}
		}
		else if (selfitem == "class") {
			for (var i = 0, len = updatemap.length; i < len; i++) {
				var is_changed = false;
				var temp_updatemap = updatemap[i];
				var j, jlen;
				for (j = 0, jlen = cssmap.length; j < jlen; j++) {
					var temp_cssmap = cssmap[j];
					for (var upateitempitem in temp_updatemap) {
						if (temp_updatemap.hasOwnProperty(upateitempitem)) {
							if (temp_cssmap[upateitempitem]) {
								nexacro._updateCSSMaps(temp_cssmap, temp_updatemap, upateitempitem, selfitem);
								is_changed = true;
							}
						}
					}
				}
				if (!is_changed) {
					cssmap.push(temp_updatemap);
				}
			}
		}
		else {
			for (item in updatemap) {
				if (updatemap.hasOwnProperty(item)) {
					mapitem = updatemap[item];
					if (cssmap[item]) {
						nexacro._updateCSSMaps(cssmap[item], mapitem, item, selfitem);
					}
					else {
						cssmap[item] = mapitem;
					}
				}
			}
		}
	};

	nexacro._clearCSSMaps = function () {
		nexacro._dimension_maps = null;
	};

	nexacro._CommunicationItem = function (path, type, bcache, last_modified, version) {
		this.path = path;
		this.handle = null;
		this.callbackList = [];
		this.type = type;
		this.bcache = bcache;
		this.last_modified = last_modified;
		this.version = version ? version : "0";

		var ar = path.split("://");
		if (ar) {
			this.protocol = ar[0];
			switch (this.protocol) {
				case "http":
					this._protocol = 0;
					break;
				case "https":
					this._protocol = 1;
					break;
				case "file":
					this._protocol = 2;
					break;
				default:
					this._protocol = -1;
					break;
			}
		}

		this._addCookieFromCookieVariables();

		this._check_responseXML = false;
	};
	var __pCommunicationItem = nexacro._CommunicationItem.prototype;

	__pCommunicationItem.appendCallback = function (pthis, callbackFn) {
		var callbackList = this.callbackList;
		callbackList.push({
			target : pthis, 
			callback : callbackFn
		});
	};

	__pCommunicationItem.removeCallback = function (pthis, callbackFn) {
		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				if (item.pthis == pthis && item.callback == callbackFn) {
					callbackList.splice(i, 1);
					if (callbackList.length === 0) {
						if (this.handle) {
							nexacro.__cancelCommunication(this.handle);
						}
						this.handle = null;
						delete nexacro._CommunicationManager[this.path];
					}
					return true;
				}
			}
		}
		return false;
	};

	__pCommunicationItem._addCookieFromCookieVariables = function () {
		nexacro._addCookieFromCookieVariables();
	};
	__pCommunicationItem._addCookieFromEnvHeadVariables = function () {
	};

	__pCommunicationItem._addCookieToCookieVariable = function (cookieStr) {
		nexacro._addCookieToCookieVariable(cookieStr);
	};

	__pCommunicationItem.on_decrypt = function (data) {
		if (this._protocol < 0) {
			var protocoladp = nexacro._getProtocol(this.protocol);
			if (protocoladp) {
				data = protocoladp.decrypt(this.path, data);
			}
		}
		return data;
	};

	__pCommunicationItem.on_encrypt = function (data) {
		if (this._protocol < 0) {
			var protocoladp = nexacro._getProtocol(this.protocol);
			if (protocoladp) {
				data = protocoladp.encrypt(this.path, data);
			}
		}
		return data;
	};

	__pCommunicationItem.on_start = nexacro._emptyFn;
	__pCommunicationItem.on_load = nexacro._emptyFn;

	__pCommunicationItem.on_load_module = function (data, cookie, last_modified) {
		delete nexacro._CommunicationManager[this.path];
		var module;
		if (typeof (data) == "function") {
			module = data;
		}
		else if (typeof (data) == "undefined" && this.bcache) {
			var cache = nexacro._CacheList[this.path];
			module = cache.data;
		}
		else {
			if (this._protocol < 0) {
				data = this.on_decrypt(data);
			}

			this._addCookieToCookieVariable(cookie);

			module = nexacro._executeGlobalEvalStr(data, this.path);
			module.bcache = this.bcache;

			if (this.bcache) {
				var m_cache = nexacro._CacheList[this.path];

				if (!m_cache) {
					nexacro._CacheList[this.path] = {
						data : module, 
						last_modified : last_modified, 
						version : this.version
					};
				}
				else {
					m_cache.data = module;
					m_cache.last_modified = last_modified;
					m_cache.version = this.version;
				}
			}
		}

		var callbackList = this.callbackList;
		var item = null;

		if (callbackList.length > 0) {
			while (item = callbackList.pop()) {
				var target = item.target;
				if (target && target.context && target.context.on_fire_oninit) {
					target.context.on_fire_oninit(target.context);
				}

				item.callback.call(target, this.path, 0, module);
			}
		}

		this.handle = null;
	};

	__pCommunicationItem.on_load_text = function (data, cookie, last_modified) {
		delete nexacro._CommunicationManager[this.path];

		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToCookieVariable(cookie);

		if (this.bcache) {
			var m_cache = nexacro._CacheList[this.path];
			if (!m_cache) {
				nexacro._CacheList[this.path] = {
					data : data, 
					last_modified : last_modified, 
					version : this.version
				};
			}
			else {
				m_cache.data = data;
				m_cache.last_modified = last_modified;
				m_cache.version = this.version;
			}
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, 0, data);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};
	__pCommunicationItem.on_load_image = function (width, height) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, width, height);
				}
				else {
					nexacro._releaseImageUrl(this.path);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};
	__pCommunicationItem.on_load_update = function (data, cookie) {
		delete nexacro._CommunicationManager[this.path];
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToCookieVariable(cookie);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, 0, "");
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};
	__pCommunicationItem.on_load_data = function (data, cookie) {
		delete nexacro._CommunicationManager[this.path];
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToCookieVariable(cookie);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, 0, data);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};

	__pCommunicationItem.on_load_dataobject = function (data, cookie) {
		delete nexacro._CommunicationManager[this.path];
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToCookieVariable(cookie);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, 0, data);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};

	__pCommunicationItem.on_progress = nexacro._emptyFn;
	__pCommunicationItem.on_progress_data = function (status, data) {
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, 1, data);
				}
			}
		}
	};

	__pCommunicationItem.on_error = function (errstatus, fireerrorcode, returncode, locationuri, extramsg) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, errstatus, null, fireerrorcode, returncode, this.path, locationuri, extramsg);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};

	__pCommunicationItem.on_error_image = function (width, height, handle, errstatus, fireerrorcode, returncode, locationuri, extramsg) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive !== false) {
					item.callback.call(target, this.path, width, height, handle, errstatus, null, fireerrorcode, returncode, this.path, locationuri, extramsg);
				}
			}
			callbackList.splice(0, n);
		}
		this.handle = null;
	};

	__pCommunicationItem._destroy = nexacro._emptyFn;


	nexacro._loadJSModule = function (path, target, handler, bcache, service, async) {
		var loadItem;
		var last_modified = "";
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
				return loadItem.handle;
			}
		}

		var m_cache = nexacro._CacheList[path];

		if (service && m_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (m_cache.version >= service.version) {
					loadItem = new nexacro._CommunicationItem(path, "module", false);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;

					loadItem._handle = nexacro._startCommunication(loadItem, path, "default", async, service);
					return loadItem.handle;
				}
			}

			m_cache.version = service.version;
			last_modified = m_cache.last_modified;
		}

		bcache = true;
		if (!service || service.cachelevel == "none") {
			bcache = false;
		}

		loadItem = new nexacro._CommunicationItem(path, "module", bcache, last_modified, service ? service.version : "0");
		nexacro._CommunicationManager[path] = loadItem;
		loadItem.appendCallback(target, handler);

		loadItem.bcache = bcache;
		loadItem.handle = nexacro._startCommunication(loadItem, path, service ? service.cachelevel : "none", async, service);
		return loadItem.handle;
	};

	nexacro._loadJSText = function (path, target, handler, service, async) {
		var loadItem;
		var last_modified = "";
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
				return loadItem.handle;
			}
		}

		var m_cache = nexacro._CacheList[path];

		if (service && m_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (m_cache.version >= service.version) {
					loadItem = new nexacro._CommunicationItem(path, "module", false);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_module(m_cache.data, null);
					return loadItem.handle;
				}
			}

			m_cache.version = service.version;
			last_modified = m_cache.last_modified;
		}

		var bcache = true;
		if (!service || service.cachelevel == "none") {
			bcache = false;
		}

		loadItem = new nexacro._CommunicationItem(path, "text", bcache, last_modified, service ? service.version : "0");
		nexacro._CommunicationManager[path] = loadItem;
		loadItem.appendCallback(target, handler);

		loadItem.handle = nexacro._startCommunication(loadItem, path, service ? service.cachelevel : "none", async, service);
		return loadItem.handle;
	};

	nexacro._loadCSSModule = function (path, target, handler, bcache, service, async, cssreq, cssfiletype) {
		var loadItem;
		var last_modified = "";
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
				return loadItem.handle;
			}
		}

		var m_cache = nexacro._CacheList[path];

		if (service && m_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (m_cache.version >= service.version) {
					loadItem = new nexacro._CommunicationItem(path, "css", false);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_module(m_cache.data, null);
					return loadItem.handle;
				}
			}

			m_cache.version = service.version;
			last_modified = m_cache.last_modified;
		}

		bcache = false;

		loadItem = new nexacro._CommunicationItem(path, "css", bcache, last_modified, service ? service.version : "0");
		nexacro._CommunicationManager[path] = loadItem;
		loadItem.appendCallback(target, handler);

		loadItem.handle = nexacro._startCommunication(loadItem, path, service ? service.cachelevel : "none", async, service, path, cssreq, cssfiletype);
		return loadItem.handle;
	};

	nexacro._loadUpdateModule = function (path, target, handler, service, async, type, targetpath, ref, ver, failpass) {
		var loadItem;
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
				return loadItem.handle;
			}
			else {
				loadItem = new nexacro._CommunicationItem(path, "update");
				nexacro._CommunicationManager[path] = loadItem;
				loadItem.appendCallback(target, handler);
				loadItem.handle = nexacro._startCommunication(loadItem, path, "dynamic", true, service, null, type, targetpath, ref, ver, failpass);
				return loadItem.handle;
			}
		}
		else {
			loadItem = new nexacro._CommunicationItem(path, "update");
			loadItem.appendCallback(target, handler);
			nexacro._startCommunication(loadItem, path, "dynamic", false, service, null, type, targetpath, ref, ver, failpass);
		}

		handler.call(target, 0);
		return null;
	};

	nexacro._loadDataObject = function (path, target, handler, service, form, svcid, method, outdataobj, parameters, async, datatype, compress) {
		var loadItem;
		var last_modified = "";
		var servicecachelevel = service.cachelevel;
		var postdata;

		var d_cache = nexacro._DataObjectCacheList[path];
		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					loadItem = new nexacro.RESTAPIItem(path, form, svcid, method, outdataobj, parameters, datatype, async);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_dataobject(d_cache, "", "");
					return loadItem.handle;
				}
			}

			d_cache.version = service.version;
			last_modified = d_cache.last_modified;
		}

		loadItem = new nexacro.RESTAPIItem(path, form, svcid, method, outdataobj, parameters, datatype, async, last_modified, service.version);

		if (service && service.cachelevel != "none") {
			loadItem.bcache = true;
		}

		loadItem.last_modified = last_modified;

		loadItem.appendCallback(target, handler);
		loadItem.on_start();
		target.transactionList.push(loadItem);
		postdata = loadItem.postdata ? loadItem.postdata : null;
		service.cachelevel = servicecachelevel;
		return nexacro._startRESTAPICommunication(loadItem, path, service.cachelevel, async, service, (form ? form._url : ""), postdata, datatype, compress);
	};

	nexacro._loadData = function (path, target, handler, service, form, svcid, indatasets, outdatasets, parameters, async, datatype, compress) {
		var loadItem;
		var last_modified = "";
		var servicecachelevel = service.cachelevel;

		var d_cache = nexacro._DataCacheList[path];
		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					loadItem = new nexacro.TransactionItem(path, form, svcid, indatasets, outdatasets, parameters, datatype, async);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_data(d_cache, "", "");
					return loadItem.handle;
				}
			}

			d_cache.version = service.version;
			last_modified = d_cache.last_modified;
		}

		loadItem = new nexacro.TransactionItem(path, form, svcid, indatasets, outdatasets, parameters, datatype, async, last_modified, service.version);

		if (service && service.cachelevel != "none") {
			loadItem.bcache = true;
		}

		loadItem.last_modified = last_modified;

		loadItem.appendCallback(target, handler);
		loadItem.on_start();
		target.transactionList.push(loadItem);

		service.cachelevel = servicecachelevel;
		return nexacro._startCommunication(loadItem, path, service.cachelevel, async, service, (form ? form._url : ""), loadItem._sendData, datatype, compress);
	};

	nexacro._preloadData = function (path, target, handler, service, svcid, referer, args, async, datatype, compress) {
		var bcache = false;
		var last_modified = "";
		var d_cache = nexacro._DataCacheList[path];
		var loadItem;
		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					loadItem = new nexacro._CommunicationItem(svcid, "data");
					loadItem.bcache = bcache;
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_data(d_cache, "", "");

					return loadItem.handle;
				}
			}

			d_cache.version = service.version;
			last_modified = d_cache.last_modified;
		}

		if (service && service.cachelevel != "none") {
			bcache = true;
		}

		var tritem = new nexacro.TransactionItem(path, target.context, svcid, "", "", args, 0, async);

		if (async) {
			loadItem = new nexacro._CommunicationItem(svcid, "data");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			loadItem.handle = nexacro._startCommunication(loadItem, path, "none", true, service, referer, tritem._sendData, datatype, compress);
			return loadItem.handle;
		}
		else {
			loadItem = new nexacro._CommunicationItem(svcid, "data");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			nexacro._startCommunication(loadItem, path, "none", false, service, referer, tritem._sendData, datatype, compress);
		}
	};

	nexacro._preloadDataObject = function (path, target, handler, service, svcid, referer, args, async, datatype, compress) {
		var bcache = false;
		var last_modified = "";
		var d_cache = nexacro._DataCacheList[path];
		var loadItem;
		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					loadItem = new nexacro._CommunicationItem(svcid, "dataobject");
					loadItem.bcache = bcache;
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_dataobject(d_cache, "", "");

					return loadItem.handle;
				}
			}

			d_cache.version = service.version;
			last_modified = d_cache.last_modified;
		}

		if (service && service.cachelevel != "none") {
			bcache = true;
		}
		var tritem = new nexacro.RESTAPIItem(path, target.context, svcid, "", "", args, 0, async);

		if (async) {
			loadItem = new nexacro._CommunicationItem(svcid, "dataobject");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			loadItem.handle = nexacro._startRESTAPICommunication(loadItem, path, "none", true, service, referer, tritem._sendData, datatype, compress);
			return loadItem.handle;
		}
		else {
			loadItem = new nexacro._CommunicationItem(svcid, "dataobject");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			nexacro._startRESTAPICommunication(loadItem, path, "none", false, service, referer, tritem._sendData, datatype, compress);
		}
	};

	nexacro._startCommunication = function (loadItem, url, cachelevel, async, service, referer, data, ndatatype, compress, ver, failpass) {
		var path = url;
		var senddata = data;
		if (loadItem._protocol < 0) {
			var createadaptor = false;
			var protocoladp = nexacro._getProtocol(loadItem.protocol);
			if (!protocoladp) {
				var isprotocol = nexacro._isProtocol(loadItem.protocol);
				if (isprotocol) {
					var adptorclass = nexacro._executeGlobalEvalStr(loadItem.protocol);
					if (adptorclass) {
						protocoladp = new adptorclass;
						createadaptor = true;
					}
				}
			}

			if (protocoladp) {
				if (createadaptor && protocoladp.initialize) {
					protocoladp.initialize(url);
					nexacro._addProtocol(loadItem.protocol, protocoladp);
				}

				var protocol = protocoladp.getUsingProtocol(url);
				var sep = path.split("://");
				if (sep) {
					path = protocol + "://" + sep[1];
				}

				if (data && protocoladp.encrypt) {
					senddata = loadItem.on_encrypt(data);
				}

				if (protocoladp.getCommunicationHeaders) {
					var headers = protocoladp.getCommunicationHeaders(url);
					if (nexacro._isArray(headers)) {
						var len = headers.length;
						for (var i = 0; i < len; i++) {
							nexacro._setCookie(headers[i].id, headers[i].value);
						}
					}
				}
			}
		}
		return nexacro.__startCommunication(loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service);
	};

	nexacro._startRESTAPICommunication = function (loadItem, url, cachelevel, async, service, referer, data, ndatatype, compress, ver, failpass) {
		var path = url;
		var senddata = data;
		if (loadItem._protocol < 0) {
			var createadaptor = false;
			var protocoladp = nexacro._getProtocol(loadItem.protocol);
			if (!protocoladp) {
				var isprotocol = nexacro._isProtocol(loadItem.protocol);
				if (isprotocol) {
					var adptorclass = nexacro._executeGlobalEvalStr(loadItem.protocol);
					if (adptorclass) {
						protocoladp = new adptorclass;
						createadaptor = true;
					}
				}
			}

			if (protocoladp) {
				if (createadaptor && protocoladp.initialize) {
					protocoladp.initialize(url);
					nexacro._addProtocol(loadItem.protocol, protocoladp);
				}

				var protocol = protocoladp.getUsingProtocol(url);
				var sep = path.split("://");
				if (sep) {
					path = protocol + "://" + sep[1];
				}

				if (data && protocoladp.encrypt) {
					senddata = loadItem.on_encrypt(data);
				}

				if (protocoladp.getCommunicationHeaders) {
					var headers = protocoladp.getCommunicationHeaders(url);
					if (nexacro._isArray(headers)) {
						var len = headers.length;
						for (var i = 0; i < len; i++) {
							nexacro._setCookie(headers[i].id, headers[i].value);
						}
					}
				}
			}
		}
		return nexacro.__startRESTAPICommunication(loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service);
	};

	nexacro.__startRESTAPICommunication = function (loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service) {
		function getRESTAPI () {
			var xhrobj = {
			};
			xhrobj._destroy = nexacro._emptyFn;
			var xhr = new XMLHttpRequest();
			xhrobj.handle = xhr;
			return xhrobj;
		}
		;
		var rest = getRESTAPI();
		var rest_handle = rest.handle;

		var bindfn = null;
		var method = "GET";



		bindfn = nexacro.__bindLoadDataObjectHandler(rest, loadItem);
		method = loadItem.method ? loadItem.method : "GET";

		rest_handle.onreadystatechange = bindfn;

		if (rest_handle.onerror !== undefined) {
			rest_handle.onerror = bindfn;
		}

		if (method == "GET" || method == "HEAD") {
			senddata = null;
		}

		if (path) {
			var ar = path.split("://");
			if (ar.length > 0) {
				var protocol = ar[0];
				if (protocol == "file") {
					path = decodeURI(path);
				}
				else {
					path = encodeURI(path);
				}
			}
		}

		var httpretry = (loadItem._httpretry !== undefined) ? loadItem._httpretry : nexacro._httpretry;
		if (httpretry >= 1) {
			rest._path = path;
			rest._cachelevel = cachelevel;
			rest._async = async;
			rest._referer = referer;
			rest._senddata = senddata;
			rest._ndatatype = ndatatype;
			rest._compress = compress;
			rest._ver = ver;
			rest._failpass = failpass;
			rest._service = service;

			rest._httpretry = httpretry;
			rest._method = method;
			rest._bindfn = bindfn;
		}

		try {
			rest_handle.open(method, path, !!async);
		}
		catch (e) {
			var extrmsg = e.number + " " + e.message;
			loadItem.on_error(e.number, "comm_fail_loaddetail", nexacro._CommunicationStatusTable.failunknown, "", extrmsg);

			rest = null;
			return null;
		}


		if (async) {
			var env = nexacro.getEnvironment();
			if (env && env.networksecurelevel == "all") {
				if ((nexacro._Browser == "IE" && nexacro._BrowserVersion > 9) || nexacro._Browser != "IE") {
					rest_handle.withCredentials = true;
				}
			}
		}

		var protocoladp = nexacro._getProtocol(loadItem.protocol);
		if (protocoladp && protocoladp.version) {
			var protocolver = protocoladp.version();
			if (protocolver > "1.0") {
				var httpheaders = protocoladp.getHTTPHeader();
				var httpheaderlen = httpheaders.length;
				for (var i = 0; i < httpheaderlen; i++) {
					rest_handle.setRequestHeader(httpheaders[i].id, httpheaders[i].value);
				}
			}
		}

		var httpvariables = nexacro._getLocalStorageAll(5);
		if (httpvariables) {
			for (var prop in httpvariables) {
				if (httpvariables.hasOwnProperty(prop)) {
					rest_handle.setRequestHeader(prop, httpvariables[prop].value);
				}
			}
		}

		if (service) {
			if (service.cachelevel == "none") {
				rest_handle.setRequestHeader("cache-control", "no-cache, no-store");
				rest_handle.setRequestHeader("Pragma", "no-cache");
				rest_handle.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2000 00:00:00 GMT");
				rest_handle.setRequestHeader("Expires", -1);
			}
			else {
				rest_handle.setRequestHeader("cache-control", "no-cache");
				if (loadItem.last_modified) {
					rest_handle.setRequestHeader("If-Modified-Since", loadItem.last_modified);
				}
			}
		}
		try {
			var httptimeout = nexacro._httptimeout;

			if (async) {
				if (rest_handle.timeout != undefined && httptimeout >= 0 && httptimeout <= 2147483) {
					rest_handle.timeout = httptimeout *  1000;

					rest_handle.ontimeout = bindfn;
					rest_handle.onload = bindfn;
				}
			}

			var headers = loadItem.header;
			if (headers) {
				for (var prop in headers) {
					rest_handle.setRequestHeader(prop, headers[prop]);
				}
			}


			rest_handle.send(senddata ? senddata : null);

			if (!async) {
				bindfn(rest, loadItem);
			}
			else if (async && nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
				if (rest_handle.timeout === undefined && httptimeout >= 0 && httptimeout <= 2147483) {
					rest._timer_id = setInterval(function () {
						if (rest._httpretry >= 1) {
							var ret = nexacro.__retryCommunication(rest, loadItem);
							if (ret !== false) {
								return;
							}
						}
						else {
							clearInterval(rest._timer_id);
							loadItem.on_error(-1, "comm_fail_loaddetail", nexacro._CommunicationStatusTable.client_timeout, "", "");

							rest._destroy();
							rest = null;
							loadItem = null;
						}
					}, nexacro._httptimeout *  1000);
				}
			}
		}
		catch (e) {
			if (rest._user_aborted) {
				loadItem.on_error(e.number, "comm_stop_transaction_byesc", nexacro._CommunicationStatusTable.stop_transaction_byesc);
			}
			else {
				loadItem.on_error(e.number, "comm_fail_loaddetail", nexacro._CommunicationStatusTable.failunknown, "", e.number);
			}
			return null;
		}
		rest_handle = null;
		return rest;
	};

	nexacro._removedatalist = function (datalist, index) {
		return (index < 0 || index > datalist.length) ? datalist : datalist.slice(0, index).concat(datalist.slice(index + 1, datalist.length));
	};

	nexacro._cancelLoad = function (handle, url) {
		if (url) {
			if (nexacro._CommunicationManager[url]) {
				delete nexacro._CommunicationManager[url];
			}
		}
		if (handle) {
			nexacro.__cancelCommunication(handle);
		}
	};

	nexacro._stopTransaction = function (form, flag) {
		if (!form && flag != 2) {
			return;
		}

		var form_window;
		var ret = 0;
		var contextlist = nexacro._comm_contextlist.slice(0, nexacro._comm_contextlist.length);
		for (var i = 0; i < contextlist.length; i++) {
			var cur_context = contextlist[i];
			if (flag === 0) {
				if (cur_context == form) {
					return form._stopTransaction();
				}
			}
			else if (flag == 1) {
				if (!form_window) {
					form_window = form._getWindow();
				}
				if (form_window == cur_context._getWindow()) {
					ret = cur_context._stopTransaction();
				}
			}
			else if (flag == 2) {
				ret = cur_context._stopTransaction();
			}
		}
		return ret;
	};

	nexacro._stopTransactionAll = function () {
		nexacro._stopTransaction(null, 2);
	};

	nexacro._registerHotkeyComp = function (base, comp, hotkey, altKey, ctrlKey, shiftKey) {
		if (!hotkey) {
			return;
		}

		if (hotkey instanceof nexacro._HotKey) {
			base._hotkey_list.push([comp, hotkey._keycode, ((hotkey._modifierkey & 0x02) == 0x02), ((hotkey._modifierkey & 0x01) == 0x01), ((hotkey._modifierkey & 0x04) == 0x04)]);
			hotkey._is_registered = true;
		}
		else {
			var keycode = hotkey;
			base._hotkey_list.push([comp, keycode, altKey, ctrlKey, shiftKey]);
		}
	};

	nexacro._unregisterHotkeyComp = function (base, comp, hotkey, altKey, ctrlKey, shiftKey) {
		if (!hotkey) {
			return;
		}

		var keycode;
		if (hotkey instanceof nexacro._HotKey) {
			keycode = hotkey._keycode;
			altKey = ((hotkey._modifierkey & 0x02) == 0x02);
			ctrlKey = ((hotkey._modifierkey & 0x01) == 0x01);
			shiftKey = ((hotkey._modifierkey & 0x04) == 0x04);
		}
		else {
			keycode = hotkey;
		}

		var hotkey_list = base._hotkey_list;
		var cnt = hotkey_list.length;
		for (var i = 0; i < hotkey_list.length; i++) {
			var hotkey_info = hotkey_list[i];
			if (hotkey_info[1] == keycode && 
				hotkey_info[2] == altKey && 
				hotkey_info[3] == ctrlKey && 
				hotkey_info[4] == shiftKey) {
				for (var j = i; j < cnt - 1; j++) {
					hotkey_list[j] = hotkey_list[j + 1];
				}
				hotkey_list[cnt - 1] = null;
				hotkey_list.length = hotkey_list.length - 1;

				if (hotkey instanceof nexacro._HotKey) {
					hotkey._is_registered = false;
				}
				break;
			}
		}
	};


	nexacro._checkHighContrast = function () {
		return nexacro.__checkHighContrast();
	};

	nexacro._getFirstTouchInfo = function (touchinfos) {
		for (var i = 0; i < touchinfos.length; i++) {
			if (touchinfos[i].isfirst === true) {
				return touchinfos[i];
			}
		}
		return null;
	};

	nexacro._getElementRootComponent = function (elem) {
		var control_elem = elem;
		if (control_elem) {
			while (control_elem && !control_elem.linkedcontrol) {
				control_elem = control_elem.parent;
			}
			var comp = control_elem.linkedcontrol;
			while (comp && (comp._is_subcontrol || !comp._is_component)) {
				if (comp == comp.parent) {
					break;
				}
				comp = comp.parent;
			}
			return comp;
		}
	};

	nexacro._isDesktop = function () {
		var system_type = nexacro._SystemType.toLowerCase();
		switch (system_type) {
			case "win32":
			case "win64":
			case "mac":
			case "linux":
				return true;
			case "ipad":
			case "iphone":
			case "winphone":
			case "android":
				return false;
			default:
				break;
		}

		return true;
	};

	nexacro._isPortrait = function () {
		var orientation = nexacro._getMobileOrientation();
		if (orientation === 0 || orientation == 1) {
			return true;
		}
		return false;
	};

	nexacro._enableaccessibility = false;
	nexacro._accessibilitytype = 1;
	nexacro._accessibilitydescreadtype = 0x01;
	nexacro._accessibilitywholereadtype = 0;

	nexacro._setEnableAccessibility = nexacro._emptyFn;
	nexacro._setAccessibilityType = nexacro._emptyFn;
	nexacro._setAccessibilityDescReadType = nexacro._emptyFn;
	nexacro._setAccessibilityWholeReadType = nexacro._emptyFn;


	nexacro.ProtocolAdp = function () {
		nexacro.Object.call(this);
	};
	var _pProtocolAdp = nexacro._createPrototype(nexacro.Object, nexacro.ProtocolAdp);
	nexacro.ProtocolAdp.prototype = _pProtocolAdp;
	_pProtocolAdp._type_name = "ProtocolAdp";

	_pProtocolAdp.encrypt = function (strUrl, data) {
		return data;
	};
	_pProtocolAdp.decrypt = function (strUrl, data) {
		return data;
	};

	_pProtocolAdp.initialize = function () {
	};
	_pProtocolAdp.finalize = function () {
	};

	_pProtocolAdp.getUsingProtocol = function (strUrl) {
		return "http";
	};
	_pProtocolAdp.getCommunicationHeaders = function (strUrl) {
		return [];
	};

	nexacro.DeviceAdaptor = function (id) {
		nexacro._EventSinkObject.call(this, id);

		this._handle = null;
	};

	var _pDeviceAdaptor = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.DeviceAdaptor);
	nexacro.DeviceAdaptor.prototype = _pDeviceAdaptor;

	_pDeviceAdaptor.initialize = function (configs) {
		if (!nexacro.__isDesignMode || !nexacro.__isDesignMode()) {
			this._handle = this.init(configs);
		}
	};

	_pDeviceAdaptor.finalize = function () {
		this.destroy(this._handle);
	};

	_pDeviceAdaptor.getDeviceHandle = function () {
		return this._handle;
	};

	_pDeviceAdaptor.init = function (configs) {
	};

	_pDeviceAdaptor.processEvent = function (eventid, eventtype, data) {
		this.on_event(eventid, eventtype, data);
	};

	_pDeviceAdaptor.fireEvent = function (eventid, eventtype, deviceid, data) {
		var ret;
		var app = nexacro.getApplication();
		var _win = app._getActiveWindow();
		if (_win) {
			ret = _win._on_sys_onextendedcommand(eventid, eventtype, deviceid, data);
		}
		return ret;
	};

	_pDeviceAdaptor.callMethod = function () {
		var handle = this._handle;
		if (handle) {
			var arrArguments = [handle, 1
			];
			for (var i = 0; i < arguments.length; i++) {
				arrArguments.push(arguments[i]);
			}
			return nexacro._callExtensionLibraryMethod.apply(this, arrArguments);
		}
	};

	_pDeviceAdaptor.destroy = nexacro._emptyFn;
	_pDeviceAdaptor.on_event = function (eventid, eventtype, data) {
	};
	_pDeviceAdaptor.on_event_default_action = nexacro._emptyFn;

	nexacro.MakeError = function (type) {
		var _args = Array.prototype.slice.call(arguments, 1);
		return nexacro._MakeError(type, _args);
	};

	nexacro.MakeEvalError = function () {
		return nexacro._MakeError(EvalError, arguments);
	};

	nexacro.MakeRangeError = function () {
		return nexacro._MakeError(RangeError, arguments);
	};

	nexacro.MakeReferenceError = function () {
		return nexacro._MakeError(ReferenceError, arguments);
	};

	nexacro.MakeSyntaxError = function () {
		return nexacro._MakeError(SyntaxError, arguments);
	};

	nexacro.MakeTypeError = function () {
		return nexacro._MakeError(TypeError, arguments);
	};

	nexacro.MakeNativeError = function () {
		return nexacro._MakeError(nexacro.NativeError, arguments);
	};

	nexacro.MakeCommunicationError = function () {
		return nexacro._MakeError(nexacro.CommunicationError, arguments);
	};

	nexacro.MakeURIError = function () {
		return nexacro._MakeError(URIError, arguments);
	};

	nexacro._MakeError = function (type, args) {
		var _args = Array.prototype.slice.call(args, 1);
		var str = nexacro._getErrorMessge.apply(this, _args);
		var error;
		if (type && (typeof (type) == "function")) {
			error = new type(str);
		}
		else {
			error = new Error(str);
			error.name = type;
		}

		error.obj = args[0];
		return error;
	};

	nexacro.CommunicationError = function (message) {
		this.name = "CommunicationError";
		this.message = message;
		this.obj = null;
	};

	var _pCommunicationError = nexacro._createPrototype(Error, nexacro.CommunicationError);
	nexacro.CommunicationError.prototype = _pCommunicationError;
	nexacro.CommunicationError._type_name = "CommunicationError";

	nexacro.NativeError = function (message) {
		this.name = "NativeError";
		this.message = message;
		this.obj = null;
	};
	var _pNativeError = nexacro._createPrototype(Error, nexacro.NativeError);
	nexacro.NativeError.prototype = _pNativeError;
	nexacro.NativeError._type_name = "NativeError";

	if (!nexacro._AccessibilityUtil) {
		nexacro._AccessibilityUtil = {
		};
		nexacro._AccessibilityUtil.Hotkey = {
		};
		nexacro._AccessibilityUtil.Hotkey.NONE = 0;
		nexacro._AccessibilityUtil.Hotkey.FIRSTCELL = 1;
		nexacro._AccessibilityUtil.Hotkey.LASTCELL = 2;
		nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN = 3;
		nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN = 4;
		nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW = 5;
		nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW = 6;


		nexacro._AccessibilityUtil.GridHotkeyList = {
		};
		nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW;
		nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_UP] = nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro._AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_DOWN] = nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;

		nexacro._AccessibilityUtil.checkComponentHotkey = nexacro._emptyFn;
		nexacro._AccessibilityUtil.getAccessibilityLabel = nexacro._emptyFn;
		nexacro._AccessibilityUtil.getAccessibilityAction = nexacro._emptyFn;
		nexacro._AccessibilityUtil.getAccessibilityDescription = nexacro._emptyFn;
		nexacro._AccessibilityUtil.setDOMNodeLabel = nexacro._emptyFn;
		nexacro._AccessibilityUtil.supportMobileApplicationAccessibility = nexacro._emptyFn;
		nexacro._AccessibilityUtil.unsupportMobileApplicationAccessibility = nexacro._emptyFn;
		nexacro._AccessibilityUtil.cancelTouchEvent = nexacro._emptyFn;

		nexacro._AccessibilityUtil.isUseTooltipText = function () {
			return true;
		};
	}

	nexacro.loadJSLibraries = function (accessibilityjs) {
		if (accessibilityjs) {
			var strsource, script;
			if (typeof accessibilityjs == "object") {
				var i;
				for (i = 0; i < accessibilityjs.length; i++) {
					strsource = accessibilityjs[i];
					script = document.createElement("script");
					script.type = "text/javascript";
					script.src = strsource;
					document.getElementsByTagName('HEAD')[0].appendChild(script);
				}
				return true;
			}
			else if (typeof accessibilityjs == "string") {
				strsource = accessibilityjs;
				script = document.createElement("script");
				script.type = "text/javascript";
				script.src = strsource;
				document.getElementsByTagName('HEAD')[0].appendChild(script);
				return true;
			}
		}
		return false;
	};

	if (!nexacro.Locale) {
		nexacro.Locale = function () {
		};

		nexacro.Locale._type_name = "Locale";

		nexacro.Locale.getLocaleInfo = function (loc, default_flag) {
			if (loc) {
				loc = loc.toLowerCase().replace(/-/g, "_");
				var locale = nexacro.Locale[loc];
				if (locale) {
					return locale;
				}

				switch (loc) {
					case "aa_dj":
						nexacro.Locale.aa_dj = {
							name : "aa_DJ", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0044\u004A\u0046\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0061\u0063\u0061", "\u0065\u0074\u006C", "\u0074\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0061\u006D", "\u0067\u0075\u006D", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u0061\u0063\u0061", "\u0065\u0074\u006C", "\u0074\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0061\u006D", "\u0067\u0075\u006D", "\u0073\u0061\u0062"], 
							month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0069\u0069\u0071\u0065\u006E", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
							month_names_short : ["\u0071\u0075\u006E", "\u006E\u0061\u0068", "\u0063\u0069\u0067", "\u0061\u0067\u0064", "\u0063\u0061\u0078", "\u0071\u0061\u0073", "\u0071\u0061\u0064", "\u006C\u0065\u0071", "\u0077\u0061\u0079", "\u0064\u0069\u0074", "\u0078\u0069\u006D", "\u006B\u0061\u0078"], 
							month_names_narrow : ["\u0071\u0075\u006E", "\u006E\u0061\u0068", "\u0063\u0069\u0067", "\u0061\u0067\u0064", "\u0063\u0061\u0078", "\u0071\u0061\u0073", "\u0071\u0061\u0064", "\u006C\u0065\u0071", "\u0077\u0061\u0079", "\u0064\u0069\u0074", "\u0078\u0069\u006D", "\u006B\u0061\u0078"], 
							ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.aa_dj;
						break;
					case "aa_er":
						nexacro.Locale.aa_er = {
							name : "aa_ER", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0052\u004E\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004E\u0061\u0068\u0061\u0072\u0073\u0069\u0020\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0065\u0071\u0065\u0065\u006E\u0069", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
							month_names_short : ["\u0051\u0075\u006E", "\u004E\u0061\u0068", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
							month_names_narrow : ["\u0051\u0075\u006E", "\u004E\u0061\u0068", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
							ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.aa_er;
						break;
					case "aa_et":
						nexacro.Locale.aa_et = {
							name : "aa_ET", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0054\u0042\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0069\u0069\u0071\u0065\u006E", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
							month_names_short : ["\u0051\u0075\u006E", "\u004B\u0075\u0064", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
							month_names_narrow : ["\u0051\u0075\u006E", "\u004B\u0075\u0064", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
							ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.aa_et;
						break;
					case "af":
					case "af_za":
						nexacro.Locale.af = nexacro.Locale.af_za = {
							name : "af_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u0064\u0061\u0067", "\u004D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0044\u0069\u006E\u0073\u0064\u0061\u0067", "\u0057\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0044\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0056\u0072\u0079\u0064\u0061\u0067", "\u0053\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F", "\u004D\u0061", "\u0044\u0069", "\u0057\u006F", "\u0044\u006F", "\u0056\u0072", "\u0053\u0061"], 
							weekday_names_narrow : ["\u0053\u006F", "\u004D\u0061", "\u0044\u0069", "\u0057\u006F", "\u0044\u006F", "\u0056\u0072", "\u0053\u0061"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069\u0065", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0069\u0065", "\u004D\u0061\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E\u0069\u0065", "\u004A\u0075\u006C\u0069\u0065", "\u0041\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0072\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0072\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							ampm : ["\u0056\u004D", "\u004E\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.af_za;
						break;
					case "ar_ae":
						nexacro.Locale.ar_ae = {
							name : "ar_AE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0041\u0045\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0625\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A\u0020"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl", 
							locale_digits : ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"]
						};
						return nexacro.Locale.ar_ae;
						break;
					case "ar_bh":
						nexacro.Locale.ar_bh = {
							name : "ar_BH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0042\u0048\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0628\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_bh;
						break;
					case "ar_dz":
						nexacro.Locale.ar_dz = {
							name : "ar_DZ", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0044\u005A\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u062C\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_dz;
						break;
					case "ar_eg":
						nexacro.Locale.ar_eg = {
							name : "ar_EG", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0045\u0047\u0050\u0020", 
							currency_symbol : "\u062C\u002E\u0645\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_eg;
						break;
					case "ar_in":
						nexacro.Locale.ar_in = {
							name : "ar_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u20A8", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_in;
						break;
					case "ar_iq":
						nexacro.Locale.ar_IQ = {
							name : "ar_IQ", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0049\u0051\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0639\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644	", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_iq;
						break;
					case "ar_jo":
						nexacro.Locale.ar_jo = {
							name : "ar_JO", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004A\u004F\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0623\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_jo;
						break;
					case "ar_kw":
						nexacro.Locale.ar_kw = {
							name : "ar_KW", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004B\u0057\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0643\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_kw;
						break;
					case "ar_lb":
						nexacro.Locale.ar_lb = {
							name : "ar_LB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004C\u0042\u0050\u0020", 
							currency_symbol : "\u0644\u002E\u0644\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_lb;
						break;
					case "ar_ly":
						nexacro.Locale.ar_ly = {
							name : "ar_LY", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004C\u0059\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0644\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_ly;
						break;
					case "ar_ma":
						nexacro.Locale.ar_ma = {
							name : "ar_MA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004D\u0041\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u0645\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_ma;
						break;
					case "ar_om":
						nexacro.Locale.ar_om = {
							name : "ar_OM", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004F\u004D\u0052\u0020", 
							currency_symbol : "\u0631\u002E\u0639\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_om;
						break;
					case "ar_qa":
						nexacro.Locale.ar_qa = {
							name : "ar_QA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0051\u0041\u0052\u0020", 
							currency_symbol : "\u0631\u002E\u0642\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627	", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_qa;
						break;
					case "ar":
					case "ar_sa":
						nexacro.Locale.ar = nexacro.Locale.ar_sa = {
							name : "ar_SA", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [-1], 
							int_curr_symbol : "\u0053\u0041\u0052\u0020", 
							currency_symbol : "\u0631\u064A\u0627\u0644", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "", 
							mon_grouping : [-1], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0625\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0640\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0640\u0627\u0646", "\u0623\u064A\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0640\u0645\u0640\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0041\u0020\u0025\u002E\u0031\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							time_format : "\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0025\u0041\u0020\u0025\u002E\u0031\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0020\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u002F\u0025\u0042\u002F\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_sa;
						break;
					case "ar_sd":
						nexacro.Locale.ar_sd = {
							name : "ar_SD", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0053\u0044\u0044\u0020", 
							currency_symbol : "\u062C\u002E\u0633\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_sd;
						break;
					case "ar_sy":
						nexacro.Locale.ar_sy = {
							name : "ar_SY", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0053\u0059\u0050\u0020", 
							currency_symbol : "\u0644\u002E\u0633\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_sy;
						break;
					case "ar_tn":
						nexacro.Locale.ar_tn = {
							name : "ar_TN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0054\u004E\u0044\u0020", 
							currency_symbol : "\u062F\u002E\u062A\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_tn;
						break;
					case "ar_ye":
						nexacro.Locale.ar_ye = {
							name : "ar_YE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0059\u0045\u0052\u0020", 
							currency_symbol : "\u0631\u002E\u064A\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
							weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
							month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
							ampm : ["\u0635", "\u0645"], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
							time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.ar_ye;
						break;
					case "as":
					case "as_in":
						nexacro.Locale.as = nexacro.Locale.as_in = {
							name : "as_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u099F", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u09A6\u09C7\u0993\u09AC\u09BE\u09F0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09F0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09F0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09F0", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09F0", "\u09B6\u09C1\u0995\u09CD\u09F0\u09AC\u09BE\u09F0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09F0"], 
							weekday_names_short : ["\u09A6\u09C7\u0993", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09F0", "\u09B6\u09A8\u09BF"], 
							weekday_names_narrow : ["\u09A6\u09C7\u0993", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09F0", "\u09B6\u09A8\u09BF"], 
							month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B7\u09CD\u099F", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
							month_names_short : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
							month_names_narrow : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
							ampm : ["\u09AA\u09C2\u09F0\u09CD\u09AC\u09CD\u09AC\u09BE\u09B9\u09CD\u09A8", "\u0985\u09AA\u09F0\u09BE\u09B9\u09CD\u09A8"], 
							date_format : "\u0025\u0065\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070", 
							time_format_ampm : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0065\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u002C\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.as_in;
						break;
					case "az":
					case "az_az":
						nexacro.Locale.az = nexacro.Locale.az_az = {
							name : "az_AZ", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0041\u005A\u004D\u0020", 
							currency_symbol : "\u006D\u0061\u006E\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0062\u0061\u007A\u0061\u0072\u0020\u0067\u00FC\u006E\u00FC", "\u0062\u0061\u007A\u0061\u0072\u0020\u0065\u0072\u0074\u0259\u0073\u0069", "\u00E7\u0259\u0072\u015F\u0259\u006E\u0062\u0259\u0020\u0061\u0078\u015F\u0061\u006D\u0131", "\u00E7\u0259\u0072\u015F\u0259\u006E\u0062\u0259", "\u0063\u00FC\u006D\u0259\u0020\u0061\u0078\u015F\u0061\u006D\u0131", "\u0063\u00FC\u006D\u0259", "\u015F\u0259\u006E\u0062\u0259"], 
							weekday_names_short : ["\u0062\u0061\u007A", "\u0062\u0065\u0072", "\u00E7\u0061\u0078", "\u00E7\u0259\u0072", "\u0063\u0061\u0078", "\u0063\u00FC\u006D", "\u015F\u006E\u0062"], 
							weekday_names_narrow : ["\u0062\u0061\u007A", "\u0062\u0065\u0072", "\u00E7\u0061\u0078", "\u00E7\u0259\u0072", "\u0063\u0061\u0078", "\u0063\u00FC\u006D", "\u015F\u006E\u0062"], 
							month_names_long : ["\u0079\u0061\u006E\u0076\u0061\u0072", "\u0066\u0065\u0076\u0072\u0061\u006C", "\u006D\u0061\u0072\u0074", "\u0061\u0070\u0072\u0065\u006C", "\u006D\u0061\u0079", "\u0069\u0079\u0075\u006E", "\u0069\u0079\u0075\u006C", "\u0061\u0076\u0071\u0075\u0073\u0074", "\u0073\u0065\u006E\u0074\u0079\u0061\u0062\u0072", "\u006F\u006B\u0074\u0079\u0061\u0062\u0072", "\u006E\u006F\u0079\u0061\u0062\u0072", "\u0064\u0065\u006B\u0061\u0062\u0072"], 
							month_names_short : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0130\u0079\u006E", "\u0130\u0079\u006C", "\u0041\u0076\u0071", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
							month_names_narrow : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0130\u0079\u006E", "\u0130\u0079\u006C", "\u0041\u0076\u0071", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.az_az;
						break;
					case "be":
					case "be_by":
						nexacro.Locale.be = nexacro.Locale.be_by = {
							name : "be_BY", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0042\u0059\u0052\u0020", 
							currency_symbol : "\u0440\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u041D\u044F\u0434\u0437\u0435\u043B\u044F", "\u041F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A", "\u0410\u045E\u0442\u043E\u0440\u0430\u043A", "\u0421\u0435\u0440\u0430\u0434\u0430", "\u0427\u0430\u0446\u0432\u0435\u0440", "\u041F\u044F\u0442\u043D\u0456\u0446\u0430", "\u0421\u0443\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u041D\u044F\u0434", "\u041F\u0430\u043D", "\u0410\u045E\u0442", "\u0421\u0440\u0434", "\u0427\u0446\u0432", "\u041F\u044F\u0442", "\u0421\u0443\u0431"], 
							weekday_names_narrow : ["\u041D\u044F\u0434", "\u041F\u0430\u043D", "\u0410\u045E\u0442", "\u0421\u0440\u0434", "\u0427\u0446\u0432", "\u041F\u044F\u0442", "\u0421\u0443\u0431"], 
							month_names_long : ["\u0421\u0442\u0443\u0434\u0437\u0435\u043D\u044C", "\u041B\u044E\u0442\u044B", "\u0421\u0430\u043A\u0430\u0432\u0456\u043A", "\u041A\u0440\u0430\u0441\u0430\u0432\u0456\u043A", "\u0422\u0440\u0430\u0432\u0435\u043D\u044C", "\u0427\u044D\u0440\u0432\u0435\u043D\u044C", "\u041B\u0456\u043F\u0435\u043D\u044C", "\u0416\u043D\u0456\u0432\u0435\u043D\u044C", "\u0412\u0435\u0440\u0430\u0441\u0435\u043D\u044C", "\u041A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A", "\u041B\u0456\u0441\u0442\u0430\u043F\u0430\u0434", "\u0421\u043D\u0435\u0436\u0430\u043D\u044C"], 
							month_names_short : ["\u0421\u0442\u0434", "\u041B\u044E\u0442", "\u0421\u0430\u043A", "\u041A\u0440\u0441", "\u0422\u0440\u0430", "\u0427\u044D\u0440", "\u041B\u0456\u043F", "\u0416\u043D\u0432", "\u0412\u0440\u0441", "\u041A\u0441\u0442", "\u041B\u0456\u0441", "\u0421\u043D\u0436"], 
							month_names_narrow : ["\u0421\u0442\u0434", "\u041B\u044E\u0442", "\u0421\u0430\u043A", "\u041A\u0440\u0441", "\u0422\u0440\u0430", "\u0427\u044D\u0440", "\u041B\u0456\u043F", "\u0416\u043D\u0432", "\u0412\u0440\u0441", "\u041A\u0441\u0442", "\u041B\u0456\u0441", "\u0421\u043D\u0436"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.be_by;
						break;
					case "bg":
					case "bg_bg":
						nexacro.Locale.bg = nexacro.Locale.bg_bg = {
							name : "bg_BG", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0042\u0047\u004E\u0020", 
							currency_symbol : "\u043B\u0432", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u043D\u0435\u0434\u0435\u043B\u044F", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u044F\u0434\u0430", "\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A", "\u043F\u0435\u0442\u044A\u043A", "\u0441\u044A\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"], 
							weekday_names_narrow : ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"], 
							month_names_long : ["\u044F\u043D\u0443\u0430\u0440\u0438", "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438", "\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438", "\u043D\u043E\u0435\u043C\u0432\u0440\u0438", "\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"], 
							month_names_short : ["\u044F\u043D\u0443", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
							month_names_narrow : ["\u044F\u043D\u0443", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0065\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u006B\u002C\u0025\u004D\u002C\u0025\u0053", 
							time_format_ampm : "\u0025\u006C\u002C\u0025\u004D\u002C\u0025\u0053", 
							date_time_format : "\u0025\u0078\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0058\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 1, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0433\u002E", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059\u0020\u0433\u002E", 
							direction : "ltr"
						};
						return nexacro.Locale.bg_bg;
						break;
					case "bn_bd":
						nexacro.Locale.bn_bd = {
							name : "bn_BD", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0042\u0044\u0054\u0020", 
							currency_symbol : "\u09F3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0", "\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"], 
							weekday_names_short : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u0983", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
							weekday_names_narrow : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u0983", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
							month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
							month_names_short : ["\u099C\u09BE\u09A8\u09C1", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2", "\u0986\u0997", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7", "\u0985\u0995\u09CD\u099F\u09CB", "\u09A8\u09AD\u09C7", "\u09A1\u09BF\u09B8\u09C7"], 
							month_names_narrow : ["\u099C\u09BE\u09A8\u09C1", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2", "\u0986\u0997", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7", "\u0985\u0995\u09CD\u099F\u09CB", "\u09A8\u09AD\u09C7", "\u09A1\u09BF\u09B8\u09C7"], 
							ampm : ["\u09AA\u09C2\u09B0\u09CD\u09AC\u09BE\u09B9\u09CD\u09A3", "\u0985\u09AA\u09B0\u09BE\u09B9\u09CD\u09A3"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.bn_bd;
						break;
					case "bn":
					case "bn_in":
						nexacro.Locale.bn = nexacro.Locale.bn_in = {
							name : "bn_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u099F\u09BE\u0995\u09BE", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0", "\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"], 
							weekday_names_short : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
							weekday_names_narrow : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
							month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
							month_names_short : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
							month_names_narrow : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
							ampm : ["\u09AA\u09C2\u09B0\u09CD\u09AC\u09BE\u09B9\u09CD\u09A3", "\u0985\u09AA\u09B0\u09BE\u09B9\u09CD\u09A3"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.bn_in;
						break;
					case "br":
					case "br_fr":
						nexacro.Locale.br = nexacro.Locale.br_fr = {
							name : "br_FR", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075\u0072\u007A\u0068", "\u006D\u0065\u0072\u0063\u0027\u0068\u0065\u0072", "\u0079\u0061\u006F\u0075", "\u0067\u0077\u0065\u006E\u0065\u0072", "\u0073\u0061\u0064\u006F\u0072\u006E"], 
							weekday_names_short : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075", "\u006D\u0065\u0072", "\u0079\u0061\u006F", "\u0067\u0077\u0065", "\u0073\u0061\u0064"], 
							weekday_names_narrow : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075", "\u006D\u0065\u0072", "\u0079\u0061\u006F", "\u0067\u0077\u0065", "\u0073\u0061\u0064"], 
							month_names_long : ["\u0047\u0065\u006E\u0076\u0065\u0072", "\u0043\u0027\u0068\u0077\u0065\u0076\u0072\u0065\u0072", "\u004D\u0065\u0075\u0072\u007A\u0068", "\u0045\u0062\u0072\u0065\u006C", "\u004D\u0061\u0065", "\u004D\u0065\u007A\u0068\u0065\u0076\u0065\u006E", "\u0047\u006F\u0075\u0065\u0072\u0065", "\u0045\u006F\u0073\u0074", "\u0047\u0077\u0065\u006E\u0067\u006F\u006C\u006F", "\u0048\u0065\u0072\u0065", "\u0044\u0075", "\u004B\u0065\u0072\u007A\u0075"], 
							month_names_short : ["\u0047\u0065\u006E\u0020", "\u0043\u0027\u0068\u0077", "\u004D\u0065\u0075\u0020", "\u0045\u0062\u0072\u0020", "\u004D\u0061\u0065\u0020", "\u0045\u0076\u0065\u0020", "\u0047\u006F\u0075\u0020", "\u0045\u006F\u0073\u0020", "\u0047\u0077\u0065\u0020", "\u0048\u0065\u0072\u0020", "\u0044\u0075\u0020\u0020", "\u004B\u0065\u0072\u0020"], 
							month_names_narrow : ["\u0047\u0065\u006E\u0020", "\u0043\u0027\u0068\u0077", "\u004D\u0065\u0075\u0020", "\u0045\u0062\u0072\u0020", "\u004D\u0061\u0065\u0020", "\u0045\u0076\u0065\u0020", "\u0047\u006F\u0075\u0020", "\u0045\u006F\u0073\u0020", "\u0047\u0077\u0065\u0020", "\u0048\u0065\u0072\u0020", "\u0044\u0075\u0020\u0020", "\u004B\u0065\u0072\u0020"], 
							ampm : ["\u0020", "\u0020"], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u0065\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0044\u0027\u0061\u0072\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u0061\u0020\u0076\u0069\u007A\u0020\u0025\u0042\u0020\u0025\u0059", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.br_fr;
						break;
					case "bs":
					case "bs_ba":
						nexacro.Locale.bs = nexacro.Locale.bs_ba = {
							name : "bs_BA", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0042\u0041\u004D\u0020", 
							currency_symbol : "\u004B\u004D", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004E\u0065\u0064\u006A\u0065\u006C\u006A\u0061", "\u0050\u006F\u006E\u0065\u0064\u006A\u0065\u006C\u006A\u0061\u006B", "\u0055\u0074\u006F\u0072\u0061\u006B", "\u0053\u0072\u0069\u006A\u0065\u0064\u0061", "\u010C\u0065\u0074\u0076\u0072\u0074\u0061\u006B", "\u0050\u0065\u0074\u0061\u006B", "\u0053\u0075\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
							weekday_names_narrow : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u006A", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0061\u0072", "\u004F\u006B\u0074\u006F\u0062\u0061\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0061\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0061\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u006A", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u006A", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.bs_ba;
						break;
					case "ca_ad":
						nexacro.Locale.ca_ad = {
							name : "ca_AD", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
							weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ca_ad;
						break;
					case "ca":
					case "ca_es":
						nexacro.Locale.ca = nexacro.Locale.ca_es = {
							name : "ca_ES", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
							weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u002F\u0020\u0025\u0042\u0020\u002F\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ca_es;
						break;
					case "ca_fr":
						nexacro.Locale.ca_fr = {
							name : "ca_FR", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
							weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ca_fr;
						break;
					case "ca_it":
						nexacro.Locale.ca_it = {
							name : "ca_IT", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
							weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
							month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ca_it;
						break;
					case "cs":
					case "cs_cz":
						nexacro.Locale.cs = nexacro.Locale.cs_cz = {
							name : "cs_CZ", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0043\u005A\u004B\u0020", 
							currency_symbol : "\u004B\u010D", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004E\u0065\u0064\u011B\u006C\u0065", "\u0050\u006F\u006E\u0064\u011B\u006C\u00ED", "\u00DA\u0074\u0065\u0072\u00FD", "\u0053\u0074\u0159\u0065\u0064\u0061", "\u010C\u0074\u0076\u0072\u0074\u0065\u006B", "\u0050\u00E1\u0074\u0065\u006B", "\u0053\u006F\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u004E\u0065", "\u0050\u006F", "\u00DA\u0074", "\u0053\u0074", "\u010C\u0074", "\u0050\u00E1", "\u0053\u006F"], 
							weekday_names_narrow : ["\u004E\u0065", "\u0050\u006F", "\u00DA\u0074", "\u0053\u0074", "\u010C\u0074", "\u0050\u00E1", "\u0053\u006F"], 
							month_names_long : ["\u006C\u0065\u0064\u0065\u006E", "\u00FA\u006E\u006F\u0072", "\u0062\u0159\u0065\u007A\u0065\u006E", "\u0064\u0075\u0062\u0065\u006E", "\u006B\u0076\u011B\u0074\u0065\u006E", "\u010D\u0065\u0072\u0076\u0065\u006E", "\u010D\u0065\u0072\u0076\u0065\u006E\u0065\u0063", "\u0073\u0072\u0070\u0065\u006E", "\u007A\u00E1\u0159\u00ED", "\u0159\u00ED\u006A\u0065\u006E", "\u006C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0070\u0072\u006F\u0073\u0069\u006E\u0065\u0063"], 
							month_names_short : ["\u006C\u0065\u0064", "\u00FA\u006E\u006F", "\u0062\u0159\u0065", "\u0064\u0075\u0062", "\u006B\u0076\u011B", "\u010D\u0065\u006E", "\u010D\u0065\u0063", "\u0073\u0072\u0070", "\u007A\u00E1\u0159", "\u0159\u00ED\u006A", "\u006C\u0069\u0073", "\u0070\u0072\u006F"], 
							month_names_narrow : ["\u006C\u0065\u0064", "\u00FA\u006E\u006F", "\u0062\u0159\u0065", "\u0064\u0075\u0062", "\u006B\u0076\u011B", "\u010D\u0065\u006E", "\u010D\u0065\u0063", "\u0073\u0072\u0070", "\u007A\u00E1\u0159", "\u0159\u00ED\u006A", "\u006C\u0069\u0073", "\u0070\u0072\u006F"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0025\u0061\u00A0\u0025\u0065\u002E\u00A0\u0025\u0042\u00A0\u0025\u0059\u002C\u00A0\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u00A0\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 1, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.cs_cz;
						break;
					case "cy":
					case "cy_gb":
						nexacro.Locale.cy = nexacro.Locale.cy_gb = {
							name : "cy_GB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0042\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006C", "\u004C\u006C\u0075\u006E", "\u004D\u0061\u0077\u0072\u0074\u0068", "\u004D\u0065\u0072\u0063\u0068\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065\u006E\u0065\u0072", "\u0053\u0061\u0064\u0077\u0072\u006E"], 
							weekday_names_short : ["\u0053\u0075\u006C", "\u004C\u006C\u0075", "\u004D\u0061\u0077", "\u004D\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
							weekday_names_narrow : ["\u0053\u0075\u006C", "\u004C\u006C\u0075", "\u004D\u0061\u0077", "\u004D\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
							month_names_long : ["\u0049\u006F\u006E\u0061\u0077\u0072", "\u0043\u0068\u0077\u0065\u0066\u0072\u006F\u0072", "\u004D\u0061\u0077\u0072\u0074\u0068", "\u0045\u0062\u0072\u0069\u006C\u006C", "\u004D\u0061\u0069", "\u004D\u0065\u0068\u0065\u0066\u0069\u006E", "\u0047\u006F\u0072\u0066\u0066\u0065\u006E\u006E\u0061\u0066", "\u0041\u0077\u0073\u0074", "\u004D\u0065\u0064\u0069", "\u0048\u0079\u0064\u0072\u0065\u0066", "\u0054\u0061\u0063\u0068\u0077\u0065\u0064\u0064", "\u0052\u0068\u0061\u0067\u0066\u0079\u0072"], 
							month_names_short : ["\u0049\u006F\u006E", "\u0043\u0068\u0077", "\u004D\u0061\u0077", "\u0045\u0062\u0072", "\u004D\u0061\u0069", "\u004D\u0065\u0068", "\u0047\u006F\u0072", "\u0041\u0077\u0073", "\u004D\u0065\u0064", "\u0048\u0079\u0064", "\u0054\u0061\u0063\u0068", "\u0052\u0068\u0061"], 
							month_names_narrow : ["\u0049\u006F\u006E", "\u0043\u0068\u0077", "\u004D\u0061\u0077", "\u0045\u0062\u0072", "\u004D\u0061\u0069", "\u004D\u0065\u0068", "\u0047\u006F\u0072", "\u0041\u0077\u0073", "\u004D\u0065\u0064", "\u0048\u0079\u0064", "\u0054\u0061\u0063\u0068", "\u0052\u0068\u0061"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050\u0020\u0025\u005A", 
							date_time_format : "\u0044\u0079\u0064\u0064\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u006d\u0069\u0073\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.cy_gb;
						break;
					case "da":
					case "da_dk":
						nexacro.Locale.da = nexacro.Locale.da_dk = {
							name : "da_DK", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0044\u004B\u004B\u0020", 
							currency_symbol : "\u006B\u0072\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 2, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0074\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.da_dk;
						break;
					case "de_at":
						nexacro.Locale.de_at = {
							name : "de_AT", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							month_names_long : ["\u004A\u00E4\u006E\u006E\u0065\u0072", "\u0046\u0065\u0062\u0065\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u00E4\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u00E4\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.de_at;
						break;
					case "de_be":
						nexacro.Locale.de_be = {
							name : "de_BE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.de_be;
						break;
					case "de_ch":
						nexacro.Locale.de_ch = {
							name : "de_CH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u0027", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0043\u0048\u0046\u0020", 
							currency_symbol : "\u0046\u0072\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0027", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.de_ch;
						break;
					case "de":
					case "de_de":
						nexacro.Locale.de = nexacro.Locale.de_de = {
							name : "de_DE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
							weekday_names_narrow : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 1, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.de_de;
						break;
					case "de_lu":
						nexacro.Locale.de_lu = {
							name : "de_LU", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
							weekday_names_short : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
							weekday_names_narrow : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.de_lu;
						break;
					case "dz":
					case "dz_bt":
						nexacro.Locale.dz = nexacro.Locale.dz_bt = {
							name : "dz_BT", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0042\u0054\u004E\u0020", 
							currency_symbol : "\u0F51\u0F44\u0F74\u0F63\u0F0B\u0F40\u0FB2\u0F58\u0F0B", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F55\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F74\u0F62\u0F0B\u0F56\u0F74\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F55\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B"], 
							weekday_names_short : ["\u0F5F\u0FB3\u0F0B", "\u0F58\u0F72\u0F62\u0F0B", "\u0F63\u0FB7\u0F42\u0F0B", "\u0F54\u0F74\u0F62\u0F0B", "\u0F66\u0F44\u0F66\u0F0B", "\u0F66\u0FA4\u0F7A\u0F53\u0F0B", "\u0F49\u0F72\u0F0B"], 
							weekday_names_narrow : ["\u0F5F\u0FB3\u0F0B", "\u0F58\u0F72\u0F62\u0F0B", "\u0F63\u0FB7\u0F42\u0F0B", "\u0F54\u0F74\u0F62\u0F0B", "\u0F66\u0F44\u0F66\u0F0B", "\u0F66\u0FA4\u0F7A\u0F53\u0F0B", "\u0F49\u0F72\u0F0B"], 
							month_names_long : ["\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F55\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54\u0F0B"], 
							month_names_short : ["\u0F5F\u0FB3\u0F0B\u0F21", "\u0F5F\u0FB3\u0F0B\u0F22", "\u0F5F\u0FB3\u0F0B\u0F23", "\u0F5F\u0FB3\u0F0B\u0F24", "\u0F5F\u0FB3\u0F0B\u0F25", "\u0F5F\u0FB3\u0F0B\u0F26", "\u0F5F\u0FB3\u0F0B\u0F27", "\u0F5F\u0FB3\u0F0B\u0F28", "\u0F5F\u0FB3\u0F0B\u0F29", "\u0F5F\u0FB3\u0F0B\u0F21\u0F20", "\u0F5F\u0FB3\u0F0B\u0F21\u0F21", "\u0F5F\u0FB3\u0F0B\u0F21\u0F22"], 
							month_names_narrow : ["\u0F5F\u0FB3\u0F0B\u0F21", "\u0F5F\u0FB3\u0F0B\u0F22", "\u0F5F\u0FB3\u0F0B\u0F23", "\u0F5F\u0FB3\u0F0B\u0F24", "\u0F5F\u0FB3\u0F0B\u0F25", "\u0F5F\u0FB3\u0F0B\u0F26", "\u0F5F\u0FB3\u0F0B\u0F27", "\u0F5F\u0FB3\u0F0B\u0F28", "\u0F5F\u0FB3\u0F0B\u0F29", "\u0F5F\u0FB3\u0F0B\u0F21\u0F20", "\u0F5F\u0FB3\u0F0B\u0F21\u0F21", "\u0F5F\u0FB3\u0F0B\u0F21\u0F22"], 
							ampm : ["\u0F44\u0F66\u0F0B\u0F46", "\u0F55\u0FB1\u0F72\u0F0B\u0F46"], 
							date_format : "\u0F54\u0F66\u0FB1\u0F72\u0F0B\u0F63\u0F7C%y\u0F5F\u0F63%m\u0F5A\u0F7A\u0F66%d", 
							time_format : "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%   H\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S", 
							time_format_ampm : "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%I\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S %p", 
							date_time_format : "\u0F54\u0F66\u0FB1\u0F72\u0F0B\u0F63\u0F7C%y\u0F5F\u0F63%m\u0F5A\u0F7A\u0F66%d\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%H\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.dz_bt;
						break;
					case "el_cy":
						nexacro.Locale.el_cy = {
							name : "el_CY", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u0059\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 4, 
							frac_digits : 4, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE", "\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1", "\u03A4\u03C1\u03AF\u03C4\u03B7", "\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7", "\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7", "\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE", "\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF"], 
							weekday_names_short : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
							weekday_names_narrow : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
							month_names_long : ["\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2", "\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2", "\u039C\u03AC\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2", "\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2", "\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2"], 
							month_names_short : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
							month_names_narrow : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
							ampm : ["\u03C0\u03BC", "\u03BC\u03BC"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.el_cy;
						break;
					case "el":
					case "el_gr":
						nexacro.Locale.el = nexacro.Locale.el_gr = {
							name : "el_GR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 4, 
							frac_digits : 4, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE", "\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1", "\u03A4\u03C1\u03AF\u03C4\u03B7", "\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7", "\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7", "\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE", "\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF"], 
							weekday_names_short : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
							weekday_names_narrow : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
							month_names_long : ["\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2", "\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2", "\u039C\u03AC\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2", "\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2", "\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2"], 
							month_names_short : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
							month_names_narrow : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
							ampm : ["\u03C0\u03BC", "\u03BC\u03BC"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.el_gr;
						break;
					case "en_au":
						nexacro.Locale.en_au = {
							name : "en_AU", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0041\u0055\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_au;
						break;
					case "en_bw":
						nexacro.Locale.en_bw = {
							name : "en_BW", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0042\u0057\u0050\u0020", 
							currency_symbol : "\u0050\u0075", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.en_bw;
						break;
					case "en_ca":
						nexacro.Locale.en_ca = {
							name : "en_CA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0043\u0041\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0042\u002D\u0025\u0064\u002D\u0025\u0079", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_ca;
						break;
					case "en_dk":
						nexacro.Locale.en_dk = {
							name : "en_DK", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0044\u004B\u004B\u0020", 
							currency_symbol : "\u00A4", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064\u0054\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.en_dk;
						break;
					case "en_gb":
						nexacro.Locale.en_gb = {
							name : "en_GB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0042\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_gb;
						break;
					case "en_gh":
						nexacro.Locale.en_gh = {
							name : "en_GH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0048\u20B5\u0020", 
							currency_symbol : "\u20B5", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_gh;
						break;
					case "en_hk":
						nexacro.Locale.en_hk = {
							name : "en_HK", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0048\u004B\u0044\u0020", 
							currency_symbol : "\u0048\u004B\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0070\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059\u0020\u0025\u0070\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.en_hk;
						break;
					case "en_ie":
						nexacro.Locale.en_ie = {
							name : "en_IE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_ie;
						break;
					case "en_in":
						nexacro.Locale.en_in = {
							name : "en_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u20A8\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_in;
						break;
					case "en_jm":
						nexacro.Locale.en_jm = {
							name : "en_JM", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004A\u004D\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_jm;
						break;
					case "en_nz":
						nexacro.Locale.en_nz = {
							name : "en_NZ", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u005A\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "U0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_nz;
						break;
					case "en_ph":
						nexacro.Locale.en_ph = {
							name : "en_PH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0050\u0048\u0050\u0020", 
							currency_symbol : "\u0050\u0068\u0070", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0025\u0059", 
							shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_ph;
						break;
					case "en_sg":
						nexacro.Locale.en_sg = {
							name : "en_SG", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0053\u0047\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u002C\u0025\u0042\u002C\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u002C\u0025\u0042\u002C\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_sg;
						break;
					case "en":
					case "en_us":
						nexacro.Locale.en = nexacro.Locale.en_us = {
							name : "en_US", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u0053\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0059", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_us;
						break;
					case "en_za":
						nexacro.Locale.en_za = {
							name : "en_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.en_za;
						break;
					case "en_zw":
						nexacro.Locale.en_zw = {
							name : "en_ZW", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0057\u0044\u0020", 
							currency_symbol : "\u005A\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
							weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.en_zw;
						break;
					case "es_ar":
						nexacro.Locale.es_ar = {
							name : "es_AR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0041\u0052\u0053\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_ar;
						break;
					case "es_bo":
						nexacro.Locale.es_bo = {
							name : "es_BO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0042\u004F\u0042\u0020", 
							currency_symbol : "\u0024\u0062", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_bo;
						break;
					case "es_cl":
						nexacro.Locale.es_cl = {
							name : "es_CL", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u004C\u0050\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_cl;
						break;
					case "es_co":
						nexacro.Locale.es_co = {
							name : "es_CO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u004F\u0050\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_co;
						break;
					case "es_cr":
						nexacro.Locale.es_cr = {
							name : "es_CR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u0052\u0043\u0020", 
							currency_symbol : "\u20A1", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_cr;
						break;
					case "es_do":
						nexacro.Locale.es_do = {
							name : "es_DO", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0044\u004F\u0050\u0020", 
							currency_symbol : "\u0052\u0044\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_do;
						break;
					case "es_ec":
						nexacro.Locale.es_ec = {
							name : "es_EC", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0055\u0053\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_ec;
						break;
					case "es":
					case "es_es":
						nexacro.Locale.es = nexacro.Locale.es_es = {
							name : "es_ES", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_es;
						break;
					case "es_gt":
						nexacro.Locale.es_gt = {
							name : "es_GT", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0047\u0054\u0051\u0020", 
							currency_symbol : "\u0051", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_gt;
						break;
					case "es_hn":
						nexacro.Locale.es_hn = {
							name : "es_HN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0048\u004E\u004C\u0020", 
							currency_symbol : "\u004C\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 999], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_hn;
						break;
					case "es_mx":
						nexacro.Locale.es_mx = {
							name : "es_MX", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u004D\u0058\u004E\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_mx;
						break;
					case "es_ni":
						nexacro.Locale.es_ni = {
							name : "es_NI", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u004E\u0049\u004F\u0020", 
							currency_symbol : "\u0024\u0043", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_ni;
						break;
					case "es_pa":
						nexacro.Locale.es_pa = {
							name : "es_PA", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0050\u0041\u0042\u0020", 
							currency_symbol : "\u0042\u002F", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_pa;
						break;
					case "es_pe":
						nexacro.Locale.es_pe = {
							name : "es_PE", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0050\u0045\u004E\u0020", 
							currency_symbol : "\u0053\u002F\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_pe;
						break;
					case "es_pr":
						nexacro.Locale.es_pr = {
							name : "es_PR", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0055\u0053\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 999], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_pr;
						break;
					case "es_py":
						nexacro.Locale.es_py = {
							name : "es_PY", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0050\u0059\u0047\u0020", 
							currency_symbol : "\u0047\u0073", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_py;
						break;
					case "es_sv":
						nexacro.Locale.es_sv = {
							name : "es_SV", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0053\u0056\u0043\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 999], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_sv;
						break;
					case "es_us":
						nexacro.Locale.es_us = {
							name : "es_US", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 999], 
							int_curr_symbol : "\u0055\u0053\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_us;
						break;
					case "es_uy":
						nexacro.Locale.es_uy = {
							name : "es_UY", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0055\u0059\u0055\u0020", 
							currency_symbol : "\u0024\u0055", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.es_uy;
						break;
					case "es_ve":
						nexacro.Locale.es_ve = {
							name : "es_VE", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0056\u0045\u0042\u0020", 
							currency_symbol : "\u0042\u0073\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
							month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.es_ve;
						break;
					case "et":
					case "et_ee":
						nexacro.Locale.et = nexacro.Locale.et_ee = {
							name : "et_EE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0045\u004B\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0070\u00FC\u0068\u0061\u0070\u00E4\u0065\u0076", "\u0065\u0073\u006D\u0061\u0073\u0070\u00E4\u0065\u0076", "\u0074\u0065\u0069\u0073\u0069\u0070\u00E4\u0065\u0076", "\u006B\u006F\u006C\u006D\u0061\u0070\u00E4\u0065\u0076", "\u006E\u0065\u006C\u006A\u0061\u0070\u00E4\u0065\u0076", "\u0072\u0065\u0065\u0064\u0065", "\u006C\u0061\u0075\u0070\u00E4\u0065\u0076"], 
							weekday_names_short : ["\u0050", "\u0045", "\u0054", "\u004B", "\u004E", "\u0052", "\u004C"], 
							weekday_names_narrow : ["\u0050", "\u0045", "\u0054", "\u004B", "\u004E", "\u0052", "\u004C"], 
							month_names_long : ["\u006A\u0061\u0061\u006E\u0075\u0061\u0072", "\u0076\u0065\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0069\u006C\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0074\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u0061\u006E\u0020", "\u0076\u0065\u0065\u0062\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0020\u0020", "\u006D\u0061\u0069\u0020\u0020", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0020\u0020", "\u0073\u0065\u0070\u0074\u0020", "\u006F\u006B\u0074\u0020\u0020", "\u006E\u006F\u0076\u0020\u0020", "\u0064\u0065\u0074\u0073\u0020"], 
							month_names_narrow : ["\u006A\u0061\u0061\u006E\u0020", "\u0076\u0065\u0065\u0062\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0020\u0020", "\u006D\u0061\u0069\u0020\u0020", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0020\u0020", "\u0073\u0065\u0070\u0074\u0020", "\u006F\u006B\u0074\u0020\u0020", "\u006E\u006F\u0076\u0020\u0020", "\u0064\u0065\u0074\u0073\u0020"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0020\\\u0061\u002E", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.et_ee;
						break;
					case "eu":
					case "eu_es":
						nexacro.Locale.eu = nexacro.Locale.eu_es = {
							name : "eu_ES", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0069\u0067\u0061\u006E\u0064\u0065\u0061", "\u0061\u0073\u0074\u0065\u006C\u0065\u0068\u0065\u006E\u0061", "\u0061\u0073\u0074\u0065\u0061\u0072\u0074\u0065\u0061", "\u0061\u0073\u0074\u0065\u0061\u007A\u006B\u0065\u006E\u0061", "\u006F\u0073\u0074\u0065\u0067\u0075\u006E\u0061", "\u006F\u0073\u0074\u0069\u0072\u0061\u006C\u0061", "\u006C\u0061\u0072\u0075\u006E\u0062\u0061\u0074\u0061"], 
							weekday_names_short : ["\u0069\u0067\u002E", "\u0061\u006C\u002E", "\u0061\u0072\u002E", "\u0061\u007A\u002E", "\u006F\u0067\u002E", "\u006F\u0072\u002E", "\u006C\u0072\u002E"], 
							weekday_names_narrow : ["\u0069\u0067\u002E", "\u0061\u006C\u002E", "\u0061\u0072\u002E", "\u0061\u007A\u002E", "\u006F\u0067\u002E", "\u006F\u0072\u002E", "\u006C\u0072\u002E"], 
							month_names_long : ["\u0075\u0072\u0074\u0061\u0072\u0072\u0069\u006C\u0061", "\u006F\u0074\u0073\u0061\u0069\u006C\u0061", "\u006D\u0061\u0072\u0074\u0078\u006F\u0061", "\u0061\u0070\u0069\u0072\u0069\u006C\u0061", "\u006D\u0061\u0069\u0061\u0074\u007A\u0061", "\u0065\u006B\u0061\u0069\u006E\u0061", "\u0075\u007A\u0074\u0061\u0069\u006C\u0061", "\u0061\u0062\u0075\u007A\u0074\u0075\u0061", "\u0069\u0072\u0061\u0069\u006C\u0061", "\u0075\u0072\u0072\u0069\u0061", "\u0061\u007A\u0061\u0072\u006F\u0061", "\u0061\u0062\u0065\u006E\u0064\u0075\u0061"], 
							month_names_short : ["\u0075\u0072\u0074", "\u006F\u0074\u0073", "\u006D\u0061\u0072", "\u0061\u0070\u0069", "\u006D\u0061\u0069", "\u0065\u006B\u0061", "\u0075\u007A\u0074", "\u0061\u0062\u0075", "\u0069\u0072\u0061", "\u0075\u0072\u0072", "\u0061\u007A\u0061", "\u0061\u0062\u0065"], 
							month_names_narrow : ["\u0075\u0072\u0074", "\u006F\u0074\u0073", "\u006D\u0061\u0072", "\u0061\u0070\u0069", "\u006D\u0061\u0069", "\u0065\u006B\u0061", "\u0075\u007A\u0074", "\u0061\u0062\u0075", "\u0069\u0072\u0061", "\u0075\u0072\u0072", "\u0061\u007A\u0061", "\u0061\u0062\u0065"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0061\u002C\u0020\u0025\u0059\u002E\u0065\u006B\u006F\u0020\u0025\u0062\u0072\u0065\u006E\u0020\u0025\u0064\u0061", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0079\u002D\u0025\u006D\u002D\u0025\u0064\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0059\u002E\u0065\u006B\u006F\u0020\u0025\u0042\u0020\u0025\u0065", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.eu_es;
						break;
					case "fa":
					case "fa_ir":
						nexacro.Locale.fa = nexacro.Locale.fa_ir = {
							name : "fa_IR", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0049\u0052\u0052\u0020", 
							currency_symbol : "\u0631\u06CC\u0627\u0644", 
							mon_decimal_point : "\u066B", 
							mon_thousands_sep : "\u066C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
							weekday_names_short : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
							weekday_names_narrow : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
							month_names_long : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
							month_names_short : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
							month_names_narrow : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
							ampm : ["", ""], 
							date_format : "\u0025\u004F\u0079\u002F\u0025\u004F\u006D\u002F\u0025\u004F\u0064", 
							time_format : "\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053", 
							time_format_ampm : "", 
							date_time_format : "\u202B\u0025\u0041\u0020\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u060C\u0020\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u202C", 
							full_date_time_format : "\u202B\u0025\u0041\u0020\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u060C\u0020\u0633\u0627\u0639\u062A\u0020\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0028\u0025\u005A\u0029\u202C", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "rtl"
						};
						return nexacro.Locale.fa_ir;
						break;
					case "fi":
					case "fi_fi":
						nexacro.Locale.fi = nexacro.Locale.fi_fi = {
							name : "fi_FI", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 2, 
							n_cs_precedes : 0, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u006E\u0074\u0061\u0069", "\u006D\u0061\u0061\u006E\u0061\u006E\u0074\u0061\u0069", "\u0074\u0069\u0069\u0073\u0074\u0061\u0069", "\u006B\u0065\u0073\u006B\u0069\u0076\u0069\u0069\u006B\u006B\u006F", "\u0074\u006F\u0072\u0073\u0074\u0061\u0069", "\u0070\u0065\u0072\u006A\u0061\u006E\u0074\u0061\u0069", "\u006C\u0061\u0075\u0061\u006E\u0074\u0061\u0069"], 
							weekday_names_short : ["\u0073\u0075", "\u006D\u0061", "\u0074\u0069", "\u006B\u0065", "\u0074\u006F", "\u0070\u0065", "\u006C\u0061"], 
							weekday_names_narrow : ["\u0073\u0075", "\u006D\u0061", "\u0074\u0069", "\u006B\u0065", "\u0074\u006F", "\u0070\u0065", "\u006C\u0061"], 
							month_names_long : ["\u0074\u0061\u006D\u006D\u0069\u006B\u0075\u0075", "\u0068\u0065\u006C\u006D\u0069\u006B\u0075\u0075", "\u006D\u0061\u0061\u006C\u0069\u0073\u006B\u0075\u0075", "\u0068\u0075\u0068\u0074\u0069\u006B\u0075\u0075", "\u0074\u006F\u0075\u006B\u006F\u006B\u0075\u0075", "\u006B\u0065\u0073\u00E4\u006B\u0075\u0075", "\u0068\u0065\u0069\u006E\u00E4\u006B\u0075\u0075", "\u0065\u006C\u006F\u006B\u0075\u0075", "\u0073\u0079\u0079\u0073\u006B\u0075\u0075", "\u006C\u006F\u006B\u0061\u006B\u0075\u0075", "\u006D\u0061\u0072\u0072\u0061\u0073\u006B\u0075\u0075", "\u006A\u006F\u0075\u006C\u0075\u006B\u0075\u0075"], 
							month_names_short : ["\u0074\u0061\u006D\u006D\u0069\u00A0", "\u0068\u0065\u006C\u006D\u0069\u00A0", "\u006D\u0061\u0061\u006C\u0069\u0073", "\u0068\u0075\u0068\u0074\u0069\u00A0", "\u0074\u006F\u0075\u006B\u006F\u00A0", "\u006B\u0065\u0073\u00E4\u00A0\u00A0", "\u0068\u0065\u0069\u006E\u00E4\u00A0", "\u0065\u006C\u006F\u00A0\u00A0\u00A0", "\u0073\u0079\u0079\u0073\u00A0\u00A0", "\u006C\u006F\u006B\u0061\u00A0\u00A0", "\u006D\u0061\u0072\u0072\u0061\u0073", "\u006A\u006F\u0075\u006C\u0075\u00A0"], 
							month_names_narrow : ["\u0074\u0061\u006D\u006D\u0069\u00A0", "\u0068\u0065\u006C\u006D\u0069\u00A0", "\u006D\u0061\u0061\u006C\u0069\u0073", "\u0068\u0075\u0068\u0074\u0069\u00A0", "\u0074\u006F\u0075\u006B\u006F\u00A0", "\u006B\u0065\u0073\u00E4\u00A0\u00A0", "\u0068\u0065\u0069\u006E\u00E4\u00A0", "\u0065\u006C\u006F\u00A0\u00A0\u00A0", "\u0073\u0079\u0079\u0073\u00A0\u00A0", "\u006C\u006F\u006B\u0061\u00A0\u00A0", "\u006D\u0061\u0072\u0072\u0061\u0073", "\u006A\u006F\u0075\u006C\u0075\u00A0"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0020\u0025\u0042\u0074\u0061\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0064\u002E\u0025\u002D\u006D\u002E\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u007A", 
							first_weekday : 1, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fi_fi;
						break;
					case "fo":
					case "fo_fo":
						nexacro.Locale.fo = nexacro.Locale.fo_fo = {
							name : "fo_FO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0044\u004B\u004B\u0020", 
							currency_symbol : "\u006B\u0072\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 2, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u00E1\u006E\u0061\u0064\u0061\u0067\u0075\u0072", "\u0074\u00FD\u0073\u0064\u0061\u0067\u0075\u0072", "\u006D\u0069\u006B\u0075\u0064\u0061\u0067\u0075\u0072", "\u0068\u00F3\u0073\u0064\u0061\u0067\u0075\u0072", "\u0066\u0072\u00ED\u0067\u0067\u006A\u0061\u0064\u0061\u0067\u0075\u0072", "\u006C\u0065\u0079\u0067\u0061\u0072\u0064\u0061\u0067\u0075\u0072"], 
							weekday_names_short : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u0074\u00FD\u0073", "\u006D\u0069\u006B", "\u0068\u00F3\u0073", "\u0066\u0072\u00ED", "\u006C\u0065\u0079"], 
							weekday_names_narrow : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u0074\u00FD\u0073", "\u006D\u0069\u006B", "\u0068\u00F3\u0073", "\u0066\u0072\u00ED", "\u006C\u0065\u0079"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fo_fo;
						break;
					case "fr_be":
						nexacro.Locale.fr_be = {
							name : "fr_BE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fr_be;
						break;
					case "fr_ca":
						nexacro.Locale.fr_ca = {
							name : "fr_CA", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u0041\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.fr_ca;
						break;
					case "fr_ch":
						nexacro.Locale.fr_ch = {
							name : "fr_CH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u0027", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0043\u0048\u0046\u0020", 
							currency_symbol : "\u0066\u0072\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0027", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fr_ch;
						break;
					case "fr":
					case "fr_fr":
						nexacro.Locale.fr = nexacro.Locale.fr_fr = {
							name : "fr_FR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fr_fr;
						break;
					case "fr_lu":
						nexacro.Locale.fr_lu = {
							name : "fr_LU", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.fr_lu;
						break;
					case "fy":
					case "fy_nl":
						nexacro.Locale.fy = nexacro.Locale.fy_nl = {
							name : "fy_NL", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u0053\u006E\u0065\u0069\u006E", "\u004D\u006F\u0061\u006E\u0064\u0065\u0069", "\u0054\u0069\u0069\u0073\u0064\u0065\u0069", "\u0057\u006F\u0061\u006E\u0073\u0064\u0065\u0069", "\u0054\u006F\u006E\u0067\u0065\u0072\u0073\u0064\u0065\u0069", "\u0046\u0072\u0065\u0065\u0064", "\u0053\u006E\u0065\u006F\u006E"], 
							weekday_names_short : ["\u0053\u006E", "\u004D\u006F", "\u0054\u0069", "\u0057\u006F", "\u0054\u006F", "\u0046\u0072", "\u0053\u006E"], 
							weekday_names_narrow : ["\u0053\u006E", "\u004D\u006F", "\u0054\u0069", "\u0057\u006F", "\u0054\u006F", "\u0046\u0072", "\u0053\u006E"], 
							month_names_long : ["\u004A\u0061\u006E\u0061\u0072\u0069\u0073", "\u0046\u0065\u0062\u0072\u0065\u0077\u0061\u0072\u0069\u0073", "\u004D\u0061\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0061\u0069\u0065", "\u004A\u0075\u006E\u0079", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0069\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0069\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0069\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0061", "\u0041\u0070\u0072", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0061", "\u0041\u0070\u0072", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.fy_nl;
						break;
					case "ga":
					case "ga_ie":
						nexacro.Locale.ga = nexacro.Locale.ga_ie = {
							name : "ga_IE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u00E9\u0020\u0044\u006F\u006D\u0068\u006E\u0061\u0069\u0067\u0068", "\u0044\u00E9\u0020\u004C\u0075\u0061\u0069\u006E", "\u0044\u00E9\u0020\u004D\u00E1\u0069\u0072\u0074", "\u0044\u00E9\u0020\u0043\u00E9\u0061\u0064\u0061\u006F\u0069\u006E", "\u0044\u00E9\u0061\u0072\u0064\u0061\u006F\u0069\u006E", "\u0044\u00E9\u0020\u0068\u0041\u006F\u0069\u006E\u0065", "\u0044\u00E9\u0020\u0053\u0061\u0074\u0068\u0061\u0069\u0072\u006E"], 
							weekday_names_short : ["\u0044\u006F\u006D\u0068", "\u004C\u0075\u0061\u006E", "\u004D\u00E1\u0069\u0072\u0074", "\u0043\u00E9\u0061\u0064", "\u0044\u00E9\u0061\u0072", "\u0041\u006F\u0069\u006E\u0065", "\u0053\u0061\u0074\u0068"], 
							weekday_names_narrow : ["\u0044\u006F\u006D\u0068", "\u004C\u0075\u0061\u006E", "\u004D\u00E1\u0069\u0072\u0074", "\u0043\u00E9\u0061\u0064", "\u0044\u00E9\u0061\u0072", "\u0041\u006F\u0069\u006E\u0065", "\u0053\u0061\u0074\u0068"], 
							month_names_long : ["\u0045\u0061\u006E\u00E1\u0069\u0072", "\u0046\u0065\u0061\u0062\u0068\u0072\u0061", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062\u0072\u0065\u00E1\u006E", "\u004D\u00ED\u0020\u006E\u0061\u0020\u0042\u0065\u0061\u006C\u0074\u0061\u0069\u006E\u0065", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E\u0061\u0073\u0061", "\u004D\u0065\u00E1\u006E\u0020\u0046\u00F3\u006D\u0068\u0061\u0069\u0072", "\u0044\u0065\u0069\u0072\u0065\u0061\u0064\u0068\u0020\u0046\u00F3\u006D\u0068\u0061\u0069\u0072", "\u004D\u00ED\u0020\u006E\u0061\u0020\u0053\u0061\u006D\u0068\u006E\u0061", "\u004D\u00ED\u0020\u006E\u0061\u0020\u004E\u006F\u006C\u006C\u0061\u0067"], 
							month_names_short : ["\u0045\u0061\u006E", "\u0046\u0065\u0061\u0062\u0068", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062", "\u0042\u0065\u0061\u006C", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E", "\u004D\u0046\u00F3\u006D\u0068", "\u0044\u0046\u00F3\u006D\u0068", "\u0053\u0061\u006D\u0068", "\u004E\u006F\u006C\u006C"], 
							month_names_narrow : ["\u0045\u0061\u006E", "\u0046\u0065\u0061\u0062\u0068", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062", "\u0042\u0065\u0061\u006C", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E", "\u004D\u0046\u00F3\u006D\u0068", "\u0044\u0046\u00F3\u006D\u0068", "\u0053\u0061\u006D\u0068", "\u004E\u006F\u006C\u006C"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ga_ie;
						break;
					case "gd":
					case "gd_gb":
						nexacro.Locale.gd = nexacro.Locale.gd_gb = {
							name : "gd_GB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0042\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u0069\u0064\u00F2\u006D\u0068\u006E\u0061\u0069\u0063\u0068", "\u0044\u0069\u006C\u0075\u0061\u0069\u006E", "\u0044\u0069\u006D\u00E0\u0069\u0072\u0074", "\u0044\u0069\u0063\u0069\u0061\u0064\u0061\u0069\u006E", "\u0044\u0069\u0061\u0072\u0064\u0061\u006F\u0069\u006E", "\u0044\u0069\u0068\u0061\u006F\u0069\u006E\u0065", "\u0044\u0069\u0073\u0061\u0074\u0068\u0061\u0069\u0072\u006E\u0065"], 
							weekday_names_short : ["\u0044\u0069\u0064\u006F", "\u0044\u0069\u006C\u0075", "\u0044\u0069\u006D", "\u0044\u0069\u0063", "\u0044\u0069\u0061\u0072", "\u0044\u0069\u0068\u0061", "\u0044\u0069\u0073\u0061"], 
							weekday_names_narrow : ["\u0044\u0069\u0064\u006F", "\u0044\u0069\u006C\u0075", "\u0044\u0069\u006D", "\u0044\u0069\u0063", "\u0044\u0069\u0061\u0072", "\u0044\u0069\u0068\u0061", "\u0044\u0069\u0073\u0061"], 
							month_names_long : ["\u0041\u006D\u0020\u0046\u0061\u006F\u0069\u006C\u0074\u0065\u0061\u0063\u0068", "\u0041\u006E\u0020\u0047\u0065\u0061\u0072\u0072\u0061\u006E", "\u0041\u006D\u0020\u004D\u00E0\u0072\u0074", "\u0041\u006E\u0020\u0047\u0069\u0062\u006C\u0065\u0061\u006E", "\u0041\u0027\u0020\u004D\u0068\u00E0\u0069\u0067\u0068", "\u0041\u006E\u0020\u0074\u002D\u004D\u0068\u00EC\u006F\u0073", "\u0041\u006E\u0020\u0074\u002D\u006C\u0075\u0063\u0068\u0061\u0072", "\u0041\u006E\u0020\u004C\u00F9\u006E\u0061\u0073\u0064\u0061\u006C", "\u0041\u006E\u0020\u0074\u002D\u0053\u0075\u006C\u0074\u0061\u0069\u006E", "\u0041\u006E\u0020\u0044\u0061\u006D\u0068\u0061\u0069\u0072", "\u0041\u006E\u0020\u0074\u002D\u0053\u0061\u006D\u0068\u0061\u0069\u006E", "\u0041\u006E\u0020\u0044\u00F9\u0062\u0068\u006C\u0061\u0063\u0068\u0064"], 
							month_names_short : ["\u0046\u0061\u006F", "\u0047\u0065\u0061", "\u004D\u00E0\u0072", "\u0047\u0069\u0062", "\u004D\u0068\u00E0", "\u004F\u0067\u004D", "\u006C\u0075\u0063", "\u004C\u00F9\u006E", "\u0053\u0075\u006C", "\u0044\u0061\u006D", "\u0053\u0061\u006D", "\u0044\u00F9\u0062"], 
							month_names_narrow : ["\u0046\u0061\u006F", "\u0047\u0065\u0061", "\u004D\u00E0\u0072", "\u0047\u0069\u0062", "\u004D\u0068\u00E0", "\u004F\u0067\u004D", "\u006C\u0075\u0063", "\u004C\u00F9\u006E", "\u0053\u0075\u006C", "\u0044\u0061\u006D", "\u0053\u0061\u006D", "\u0044\u00F9\u0062"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.gd_gb;
						break;
					case "gl":
					case "gl_es":
						nexacro.Locale.gl = nexacro.Locale.gl_es = {
							name : "gl_ES", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u006F\u006D\u0069\u006E\u0067\u006F", "\u004C\u0075\u006E\u0073", "\u004D\u0061\u0072\u0074\u0065\u0073", "\u004D\u00E9\u0072\u0063\u006F\u0072\u0065\u0073", "\u0058\u006F\u0076\u0065\u0073", "\u0056\u0065\u006E\u0072\u0065\u0073", "\u0053\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0044\u006F\u006D", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u00E9\u0072", "\u0058\u006F\u0076", "\u0056\u0065\u006E", "\u0053\u00E1\u0062"], 
							weekday_names_narrow : ["\u0044\u006F\u006D", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u00E9\u0072", "\u0058\u006F\u0076", "\u0056\u0065\u006E", "\u0053\u00E1\u0062"], 
							month_names_long : ["\u0058\u0061\u006E\u0065\u0069\u0072\u006F", "\u0046\u0065\u0062\u0072\u0065\u0069\u0072\u006F", "\u004D\u0061\u0072\u007A\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0069\u006F", "\u0058\u0075\u00F1\u006F", "\u0058\u0075\u006C\u006C\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u004F\u0075\u0074\u0075\u0062\u0072\u006F", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0044\u0065\u0063\u0065\u006D\u0062\u0072\u006F"], 
							month_names_short : ["\u0058\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u0058\u0075\u00F1", "\u0058\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							month_names_narrow : ["\u0058\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u0058\u0075\u00F1", "\u0058\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.gl_es;
						break;
					case "gu":
					case "gu_in":
						nexacro.Locale.gu = nexacro.Locale.gu_in = {
							name : "gu_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0AB0\u0AC2", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0AB0\u0AB5\u0ABF\u0AB5\u0ABE\u0AB0", "\u0AB8\u0ACB\u0AAE\u0AB5\u0ABE\u0AB0", "\u0AAE\u0A82\u0A97\u0AB3\u0AB5\u0ABE\u0AB0", "\u0AAC\u0AC1\u0AA7\u0AB5\u0ABE\u0AB0", "\u0A97\u0AC1\u0AB0\u0AC1\u0AB5\u0ABE\u0AB0", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0\u0AB5\u0ABE\u0AB0", "\u0AB6\u0AA8\u0ABF\u0AB5\u0ABE\u0AB0"], 
							weekday_names_short : ["\u0AB0\u0AB5\u0ABF", "\u0AB8\u0ACB\u0AAE", "\u0AAE\u0A82\u0A97\u0AB3", "\u0AAC\u0AC1\u0AA7", "\u0A97\u0AC1\u0AB0\u0AC1", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0", "\u0AB6\u0AA8\u0ABF"], 
							weekday_names_narrow : ["\u0AB0\u0AB5\u0ABF", "\u0AB8\u0ACB\u0AAE", "\u0AAE\u0A82\u0A97\u0AB3", "\u0AAC\u0AC1\u0AA7", "\u0A97\u0AC1\u0AB0\u0AC1", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0", "\u0AB6\u0AA8\u0ABF"], 
							month_names_long : ["\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1\u0A86\u0AB0\u0AC0", "\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1\u0A86\u0AB0\u0AC0", "\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A", "\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF\u0AB2", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2\u0ABE\u0A87", "\u0A93\u0A97\u0AB8\u0ACD\u0A9F", "\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0", "\u0A93\u0A95\u0ACD\u0A9F\u0ACB\u0AAC\u0AB0", "\u0AA8\u0AB5\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0", "\u0AA1\u0ABF\u0AB8\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0"], 
							month_names_short : ["\u0A9C\u0ABE\u0AA8", "\u0AAB\u0AC7\u0AAC", "\u0AAE\u0ABE\u0AB0", "\u0A8F\u0AAA\u0ACD\u0AB0", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2", "\u0A93\u0A97", "\u0AB8\u0AAA\u0ACD\u0A9F", "\u0A93\u0A95\u0ACD\u0A9F", "\u0AA8\u0ACB\u0AB5", "\u0AA1\u0ABF\u0AB8"], 
							month_names_narrow : ["\u0A9C\u0ABE\u0AA8", "\u0AAB\u0AC7\u0AAC", "\u0AAE\u0ABE\u0AB0", "\u0A8F\u0AAA\u0ACD\u0AB0", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2", "\u0A93\u0A97", "\u0AB8\u0AAA\u0ACD\u0A9F", "\u0A93\u0A95\u0ACD\u0A9F", "\u0AA8\u0ACB\u0AB5", "\u0AA1\u0ABF\u0AB8"], 
							ampm : ["\u0AB8\u0AB5\u0ABE\u0AB0\u0AC7", "\u0AB8\u0ABE\u0A82\u0A9C\u0AC7"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.gu_in;
						break;
					case "gv":
					case "gv_gb":
						nexacro.Locale.gv = nexacro.Locale.gv_gb = {
							name : "gv_GB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0042\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004A\u0065\u0064\u006F\u006F\u006E\u0065\u0065", "\u004A\u0065\u006C\u0068\u0065\u0069\u006E", "\u004A\u0065\u006D\u0061\u0079\u0072\u0074", "\u004A\u0065\u0072\u0063\u0065\u0061\u006E", "\u004A\u0065\u0072\u0064\u0065\u0069\u006E", "\u004A\u0065\u0068\u0065\u0069\u006E\u0065\u0079", "\u004A\u0065\u0073\u0061\u0072\u006E"], 
							weekday_names_short : ["\u004A\u0065\u0064", "\u004A\u0065\u006C", "\u004A\u0065\u006D", "\u004A\u0065\u0072\u0063", "\u004A\u0065\u0072\u0064", "\u004A\u0065\u0068", "\u004A\u0065\u0073"], 
							weekday_names_narrow : ["\u004A\u0065\u0064", "\u004A\u0065\u006C", "\u004A\u0065\u006D", "\u004A\u0065\u0072\u0063", "\u004A\u0065\u0072\u0064", "\u004A\u0065\u0068", "\u004A\u0065\u0073"], 
							month_names_long : ["\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0067\u0065\u0075\u0072\u0065\u0065", "\u0054\u006F\u0073\u0068\u0069\u0061\u0067\u0068\u0074\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0065\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u0065\u0061\u006E\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u0065\u0061\u006E\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u0065\u0065\u0020\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u0065\u0065\u0020\u006E\u0079\u0020\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
							month_names_short : ["\u004A\u002D\u0067\u0075\u0065\u0072", "\u0054\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0072\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u002E\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u002E\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
							month_names_narrow : ["\u004A\u002D\u0067\u0075\u0065\u0072", "\u0054\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0072\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u002E\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u002E\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.gv_gb;
						break;
					case "he":
					case "he_il":
						nexacro.Locale.he = nexacro.Locale.he_il = {
							name : "he_IL", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0049\u004C\u0053\u0020", 
							currency_symbol : "\u20AA", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 2, 
							n_sign_posn : 2, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u05E8\u05D0\u05E9\u05D5\u05DF", "\u05E9\u05E0\u05D9", "\u05E9\u05DC\u05D9\u05E9\u05D9", "\u05E8\u05D1\u05D9\u05E2\u05D9", "\u05D7\u05DE\u05D9\u05E9\u05D9", "\u05E9\u05D9\u05E9\u05D9", "\u05E9\u05D1\u05EA"], 
							weekday_names_short : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
							weekday_names_narrow : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
							month_names_long : ["\u05D9\u05E0\u05D5\u05D0\u05E8", "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8\u05D9\u05DC", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8", "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8", "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8", "\u05D3\u05E6\u05DE\u05D1\u05E8"], 
							month_names_short : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
							month_names_narrow : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
							date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "rtl"
						};
						return nexacro.Locale.he_il;
						break;
					case "hi":
					case "hi_in":
						nexacro.Locale.hi = nexacro.Locale.hi_in = {
							name : "hi_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0930\u0942", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0930\u0935\u093F\u0935\u093E\u0930\u0020", "\u0938\u094B\u092E\u0935\u093E\u0930\u0020", "\u092E\u0902\u0917\u0932\u0935\u093E\u0930\u0020", "\u092C\u0941\u0927\u0935\u093E\u0930\u0020", "\u0917\u0941\u0930\u0941\u0935\u093E\u0930\u0020", "\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930\u0020", "\u0936\u0928\u093F\u0935\u093E\u0930\u0020"], 
							weekday_names_short : ["\u0930\u0935\u093F\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u0917\u0941\u0930\u0941\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
							weekday_names_narrow : ["\u0930\u0935\u093F\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u0917\u0941\u0930\u0941\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
							month_names_long : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							month_names_short : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							month_names_narrow : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							ampm : ["\u092A\u0942\u0930\u094D\u0935\u093E\u0939\u094D\u0928", "\u0905\u092A\u0930\u093E\u0939\u094D\u0928"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.hi_in;
						break;
					case "hr":
					case "hr_hr":
						nexacro.Locale.hr = nexacro.Locale.hr_hr = {
							name : "hr_HR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0048\u0052\u004B\u0020", 
							currency_symbol : "\u004B\u006E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004E\u0065\u0064\u006A\u0065\u006C\u006A\u0061", "\u0050\u006F\u006E\u0065\u0064\u006A\u0065\u006C\u006A\u0061\u006B", "\u0055\u0074\u006F\u0072\u0061\u006B", "\u0053\u0072\u0069\u006A\u0065\u0064\u0061", "\u010C\u0065\u0074\u0076\u0072\u0074\u0061\u006B", "\u0050\u0065\u0074\u0061\u006B", "\u0053\u0075\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
							weekday_names_narrow : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
							month_names_long : ["\u0053\u0069\u006A\u0065\u010D\u0061\u006E\u006A", "\u0056\u0065\u006C\u006A\u0061\u010D\u0061", "\u004F\u017E\u0075\u006A\u0061\u006B", "\u0054\u0072\u0061\u0076\u0061\u006E\u006A", "\u0053\u0076\u0069\u0062\u0061\u006E\u006A", "\u004C\u0069\u0070\u0061\u006E\u006A", "\u0053\u0072\u0070\u0061\u006E\u006A", "\u004B\u006F\u006C\u006F\u0076\u006F\u007A", "\u0052\u0075\u006A\u0061\u006E", "\u004C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0053\u0074\u0075\u0064\u0065\u006E\u0069", "\u0050\u0072\u006F\u0073\u0069\u006E\u0061\u0063"], 
							month_names_short : ["\u0053\u0069\u006A", "\u0056\u0065\u006C", "\u004F\u017E\u0075", "\u0054\u0072\u0061", "\u0053\u0076\u0069", "\u004C\u0069\u0070", "\u0053\u0072\u0070", "\u004B\u006F\u006C", "\u0052\u0075\u006A", "\u004C\u0069\u0073", "\u0053\u0074\u0075", "\u0050\u0072\u006F"], 
							month_names_narrow : ["\u0053\u0069\u006A", "\u0056\u0065\u006C", "\u004F\u017E\u0075", "\u0054\u0072\u0061", "\u0053\u0076\u0069", "\u004C\u0069\u0070", "\u0053\u0072\u0070", "\u004B\u006F\u006C", "\u0052\u0075\u006A", "\u004C\u0069\u0073", "\u0053\u0074\u0075", "\u0050\u0072\u006F"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059\u002E", 
							direction : "ltr"
						};
						return nexacro.Locale.hr_hr;
						break;
					case "hu":
					case "hu_hu":
						nexacro.Locale.hu = nexacro.Locale.hu_hu = {
							name : "hu_HU", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0048\u0055\u0046\u0020", 
							currency_symbol : "\u0046\u0074", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0076\u0061\u0073\u00E1\u0072\u006E\u0061\u0070", "\u0068\u00E9\u0074\u0066\u0151", "\u006B\u0065\u0064\u0064", "\u0073\u007A\u0065\u0072\u0064\u0061", "\u0063\u0073\u00FC\u0074\u00F6\u0072\u0074\u00F6\u006B", "\u0070\u00E9\u006E\u0074\u0065\u006B", "\u0073\u007A\u006F\u006D\u0062\u0061\u0074"], 
							weekday_names_short : ["\u0076", "\u0068", "\u006B", "\u0073\u007A\u0065", "\u0063\u0073", "\u0070", "\u0073\u007A\u006F"], 
							weekday_names_narrow : ["\u0076", "\u0068", "\u006B", "\u0073\u007A\u0065", "\u0063\u0073", "\u0070", "\u0073\u007A\u006F"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u00E1\u0072", "\u0066\u0065\u0062\u0072\u0075\u00E1\u0072", "\u006D\u00E1\u0072\u0063\u0069\u0075\u0073", "\u00E1\u0070\u0072\u0069\u006C\u0069\u0073", "\u006D\u00E1\u006A\u0075\u0073", "\u006A\u00FA\u006E\u0069\u0075\u0073", "\u006A\u00FA\u006C\u0069\u0075\u0073", "\u0061\u0075\u0067\u0075\u0073\u007A\u0074\u0075\u0073", "\u0073\u007A\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062\u0072", "\u006D\u00E1\u0072\u0063", "\u00E1\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u007A\u0065\u0070\u0074", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062\u0072", "\u006D\u00E1\u0072\u0063", "\u00E1\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u007A\u0065\u0070\u0074", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							time_format_ampm : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							date_time_format : "\u0025\u0059\u002E\u0020\u0025\u0062\u002E\u0020\u0025\u0065\u002E\u002C\u0020\u0025\u0041\u002C\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0059\u002E\u0020\u0025\u0062\u002E\u0020\u0025\u0065\u002E\u002C\u0020\u0025\u0041\u002C\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u002E\u0020\u0025\u0042\u0020\u0025\u0065", 
							shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
							direction : "ltr"
						};
						return nexacro.Locale.hu_hu;
						break;
					case "hy":
					case "hy_am":
						nexacro.Locale.hy = nexacro.Locale.hy_am = {
							name : "hy_AM", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0041\u004D\u0044\u0020", 
							currency_symbol : "\u0564\u0580\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u053F\u056B\u0580\u0561\u056F\u056B", "\u0535\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B", "\u0535\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B", "\u0549\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B", "\u0540\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B", "\u0548\u0582\u0580\u0562\u0561\u0569", "\u0547\u0561\u0562\u0561\u0569"], 
							weekday_names_short : ["\u053F\u0580\u056F", "\u0535\u0580\u056F", "\u0535\u0580\u0584", "\u0549\u0580\u0584", "\u0540\u0576\u0563", "\u0548\u0582\u0580", "\u0547\u0562\u0569"], 
							weekday_names_narrow : ["\u053F\u0580\u056F", "\u0535\u0580\u056F", "\u0535\u0580\u0584", "\u0549\u0580\u0584", "\u0540\u0576\u0563", "\u0548\u0582\u0580", "\u0547\u0562\u0569"], 
							month_names_long : ["\u0540\u0578\u0582\u0576\u057E\u0561\u0580\u056B", "\u0553\u0565\u057F\u0580\u057E\u0561\u0580\u056B", "\u0544\u0561\u0580\u057F\u056B", "\u0531\u057A\u0580\u056B\u056C\u056B", "\u0544\u0561\u0575\u056B\u057D\u056B", "\u0540\u0578\u0582\u0576\u056B\u057D\u056B", "\u0540\u0578\u0582\u056C\u056B\u057D\u056B", "\u0555\u0563\u0578\u057D\u057F\u0578\u057D\u056B", "\u054D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B", "\u0540\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B", "\u0546\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B", "\u0534\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B"], 
							month_names_short : ["\u0540\u0576\u057E", "\u0553\u057F\u0580", "\u0544\u0561\u0580", "\u0531\u057A\u0580", "\u0544\u0561\u0575", "\u0540\u0576\u057D", "\u0540\u056C\u057D", "\u0555\u0563\u057D", "\u054D\u0565\u057A", "\u0540\u0578\u056F", "\u0546\u0574\u0562", "\u0534\u0565\u056F"], 
							month_names_narrow : ["\u0540\u0576\u057E", "\u0553\u057F\u0580", "\u0544\u0561\u0580", "\u0531\u057A\u0580", "\u0544\u0561\u0575", "\u0540\u0576\u057D", "\u0540\u056C\u057D", "\u0555\u0563\u057D", "\u054D\u0565\u057A", "\u0540\u0578\u056F", "\u0546\u0574\u0562", "\u0534\u0565\u056F"], 
							ampm : ["", ""], 
							date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0079", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.hy_am;
						break;
					case "id":
					case "id_id":
						nexacro.Locale.id = nexacro.Locale.id_id = {
							name : "id_ID", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0049\u0044\u0052\u0020", 
							currency_symbol : "\u0052\u0070", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u004D\u0069\u006E\u0067\u0067\u0075", "\u0053\u0065\u006E\u0069\u006E", "\u0053\u0065\u006C\u0061\u0073\u0061", "\u0052\u0061\u0062\u0075", "\u004B\u0061\u006D\u0069\u0073", "\u004A\u0075\u006D\u0061\u0074", "\u0053\u0061\u0062\u0074\u0075"], 
							weekday_names_short : ["\u004D\u0069\u006E", "\u0053\u0065\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0061\u006D", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u004D\u0069\u006E", "\u0053\u0065\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0061\u006D", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0050\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u004D\u0061\u0072\u0065\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.id_id;
						break;
					case "is":
					case "is_is":
						nexacro.Locale.is = nexacro.Locale.is_is = {
							name : "is_IS", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0049\u0053\u004B\u0020", 
							currency_symbol : "\u006B\u0072\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u00E1\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u00FE\u0072\u0069\u00F0\u006A\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u0069\u00F0\u0076\u0069\u006B\u0075\u0064\u0061\u0067\u0075\u0072", "\u0066\u0069\u006D\u006D\u0074\u0075\u0064\u0061\u0067\u0075\u0072", "\u0066\u00F6\u0073\u0074\u0075\u0064\u0061\u0067\u0075\u0072", "\u006C\u0061\u0075\u0067\u0061\u0072\u0064\u0061\u0067\u0075\u0072"], 
							weekday_names_short : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u00FE\u0072\u0069", "\u006D\u0069\u00F0", "\u0066\u0069\u006D", "\u0066\u00F6\u0073", "\u006C\u0061\u0075"], 
							weekday_names_narrow : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u00FE\u0072\u0069", "\u006D\u0069\u00F0", "\u0066\u0069\u006D", "\u0066\u00F6\u0073", "\u006C\u0061\u0075"], 
							month_names_long : ["\u006A\u0061\u006E\u00FA\u0061\u0072", "\u0066\u0065\u0062\u0072\u00FA\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E\u00ED", "\u006A\u00FA\u006C\u00ED", "\u00E1\u0067\u00FA\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u00F3\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u00E1\u0067\u00FA", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u00F3\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u00E1\u0067\u00FA", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u00F3\u0076", "\u0064\u0065\u0073"], 
							ampm : ["\u0066\u0068", "\u0065\u0068"], 
							date_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0025\u0062\u0020\u0025\u0059\u002C\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.is_is;
						break;
					case "it_ch":
						nexacro.Locale.it_ch = {
							name : "it_CH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u0027", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0043\u0048\u0046\u0020", 
							currency_symbol : "\u0046\u0072\u002E", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0027", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0064\u006F\u006D\u0065\u006E\u0069\u0063\u0061", "\u006C\u0075\u006E\u0065\u0064\u00EC", "\u006D\u0061\u0072\u0074\u0065\u0064\u00EC", "\u006D\u0065\u0072\u0063\u006F\u006C\u0065\u0064\u00EC", "\u0067\u0069\u006F\u0076\u0065\u0064\u00EC", "\u0076\u0065\u006E\u0065\u0072\u0064\u00EC", "\u0073\u0061\u0062\u0061\u0074\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006D\u0065\u0072", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006D\u0065\u0072", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							month_names_long : ["\u0067\u0065\u006E\u006E\u0061\u0069\u006F", "\u0066\u0065\u0062\u0062\u0072\u0061\u0069\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0070\u0072\u0069\u006C\u0065", "\u006D\u0061\u0067\u0067\u0069\u006F", "\u0067\u0069\u0075\u0067\u006E\u006F", "\u006C\u0075\u0067\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0074\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.it_ch;
						break;
					case "it":
					case "it_it":
						nexacro.Locale.it = nexacro.Locale.it_it = {
							name : "it_IT", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0065\u006E\u0069\u0063\u0061", "\u006C\u0075\u006E\u0065\u0064\u00EC", "\u006D\u0061\u0072\u0074\u0065\u0064\u00EC", "\u006D\u0065\u0072\u0063\u006F\u006C\u0065\u0064\u00EC", "\u0067\u0069\u006F\u0076\u0065\u0064\u00EC", "\u0076\u0065\u006E\u0065\u0072\u0064\u00EC", "\u0073\u0061\u0062\u0061\u0074\u006F"], 
							weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u0067\u0069\u006F", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u0067\u0069\u006F", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							month_names_long : ["\u0067\u0065\u006E\u006E\u0061\u0069\u006F", "\u0066\u0065\u0062\u0062\u0072\u0061\u0069\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0070\u0072\u0069\u006C\u0065", "\u006D\u0061\u0067\u0067\u0069\u006F", "\u0067\u0069\u0075\u0067\u006E\u006F", "\u006C\u0075\u0067\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0074\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.it_it;
						break;
					case "iw":
					case "iw_il":
						nexacro.Locale.iw = nexacro.Locale.iw_il = {
							name : "iw_IL", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0049\u004C\u0053\u0020", 
							currency_symbol : "\u05E9\u05D7", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 2, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u05E8\u05D0\u05E9\u05D5\u05DF", "\u05E9\u05E0\u05D9", "\u05E9\u05DC\u05D9\u05E9\u05D9", "\u05E8\u05D1\u05D9\u05E2\u05D9", "\u05D7\u05DE\u05D9\u05E9\u05D9", "\u05E9\u05D9\u05E9\u05D9", "\u05E9\u05D1\u05EA"], 
							weekday_names_short : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
							weekday_names_narrow : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
							month_names_long : ["\u05D9\u05E0\u05D5\u05D0\u05E8", "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8\u05D9\u05DC", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8", "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8", "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8", "\u05D3\u05E6\u05DE\u05D1\u05E8"], 
							month_names_short : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
							month_names_narrow : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
							date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "rtl"
						};
						return nexacro.Locale.iw_il;
						break;
					case "ja":
					case "ja_jp":
						nexacro.Locale.ja = nexacro.Locale.ja_jp = {
							name : "ja_JP", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004A\u0050\u0059\u0020", 
							currency_symbol : "\uFFE5", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							mon_n_sign_posn : 1, 
							weekday_names_long : ["\u65E5\u66DC\u65E5", "\u6708\u66DC\u65E5", "\u706B\u66DC\u65E5", "\u6C34\u66DC\u65E5", "\u6728\u66DC\u65E5", "\u91D1\u66DC\u65E5", "\u571F\u66DC\u65E5"], 
							weekday_names_short : ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"], 
							weekday_names_narrow : ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"], 
							month_names_long : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							ampm : ["\u5348\u524D", "\u5348\u5F8C"], 
							date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
							time_format : "\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							time_format_ampm : "\u0025\u0070\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.ja_jp;
						break;
					case "ka":
					case "ka_ge":
						nexacro.Locale.ka = nexacro.Locale.ka_ge = {
							name : "ka_GE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0045\u004C\u0020", 
							currency_symbol : "\u004C\u0061\u0072\u0069", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u10D9\u10D5\u10D8\u10E0\u10D0", "\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8", "\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8"], 
							weekday_names_short : ["\u10D9\u10D5\u10D8", "\u10DD\u10E0\u10E8", "\u10E1\u10D0\u10DB", "\u10DD\u10D7\u10EE", "\u10EE\u10E3\u10D7", "\u10DE\u10D0\u10E0", "\u10E8\u10D0\u10D1"], 
							weekday_names_narrow : ["\u10D9\u10D5\u10D8", "\u10DD\u10E0\u10E8", "\u10E1\u10D0\u10DB", "\u10DD\u10D7\u10EE", "\u10EE\u10E3\u10D7", "\u10DE\u10D0\u10E0", "\u10E8\u10D0\u10D1"], 
							month_names_long : ["\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8", "\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8", "\u10DB\u10D0\u10E0\u10E2\u10D8", "\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8", "\u10DB\u10D0\u10D8\u10E1\u10D8", "\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8", "\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8", "\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD", "\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8"], 
							month_names_short : ["\u10D8\u10D0\u10DC", "\u10D7\u10D4\u10D1", "\u10DB\u10D0\u10E0", "\u10D0\u10DE\u10E0", "\u10DB\u10D0\u10D8", "\u10D8\u10D5\u10DC", "\u10D8\u10D5\u10DA", "\u10D0\u10D2\u10D5", "\u10E1\u10D4\u10E5", "\u10DD\u10E5\u10E2", "\u10DC\u10DD\u10D4", "\u10D3\u10D4\u10D9"], 
							month_names_narrow : ["\u10D8\u10D0\u10DC", "\u10D7\u10D4\u10D1", "\u10DB\u10D0\u10E0", "\u10D0\u10DE\u10E0", "\u10DB\u10D0\u10D8", "\u10D8\u10D5\u10DC", "\u10D8\u10D5\u10DA", "\u10D0\u10D2\u10D5", "\u10E1\u10D4\u10E5", "\u10DD\u10E5\u10E2", "\u10DC\u10DD\u10D4", "\u10D3\u10D4\u10D9"], 
							ampm : ["", ""], 
							date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0059\u0020\u10EC\u10DA\u10D8\u10E1\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u0020\u10EC\u10DA\u10D8\u10E1\u0020\u0025\u0064\u0020\u0025\u006D\u002C\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ka_ge;
						break;
					case "kk":
					case "kk_kz":
						nexacro.Locale.kk = nexacro.Locale.kk_kz = {
							name : "kk_KZ", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004B\u005A\u0054\u0020", 
							currency_symbol : "\u0422", 
							mon_decimal_point : "\u002D", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0416\u0435\u043A\u0441\u0435\u043D\u0431\u0456", "\u0414\u04AF\u0439\u0441\u0435\u043D\u0431\u0456", "\u0421\u0435\u0439\u0441\u0435\u043D\u0431\u0456", "\u0421\u04D9\u0440\u0441\u0435\u043D\u0431\u0456", "\u0411\u0435\u0439\u0441\u0435\u043D\u0431\u0456", "\u0416\u04B1\u043C\u0430", "\u0421\u0435\u043D\u0431\u0456"], 
							weekday_names_short : ["\u0416\u043A", "\u0414\u0441", "\u0421\u0441", "\u0421\u0440", "\u0411\u0441", "\u0416\u043C", "\u0421\u043D"], 
							weekday_names_narrow : ["\u0416\u043A", "\u0414\u0441", "\u0421\u0441", "\u0421\u0440", "\u0411\u0441", "\u0416\u043C", "\u0421\u043D"], 
							month_names_long : ["\u049A\u0430\u04A3\u0442\u0430\u0440", "\u0410\u049B\u043F\u0430\u043D", "\u041D\u0430\u0443\u0440\u044B\u0437", "\u0421\u04D9\u0443\u0456\u0440", "\u041C\u0430\u043C\u044B\u0440", "\u041C\u0430\u0443\u0441\u044B\u043C", "\u0428\u0456\u043B\u0434\u0435", "\u0422\u0430\u043C\u044B\u0437", "\u049A\u044B\u0440\u043A\u04AF\u0439\u0435\u043A", "\u049A\u0430\u0437\u0430\u043D", "\u049A\u0430\u0440\u0430\u0448\u0430", "\u0416\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D"], 
							month_names_short : ["\u049A\u0430\u04A3", "\u0410\u049B\u043F", "\u041D\u0430\u0443", "\u0421\u04D9\u0443", "\u041C\u0430\u043C", "\u041C\u0430\u0443", "\u0428\u0456\u043B", "\u0422\u0430\u043C", "\u049A\u044B\u0440", "\u049A\u0430\u0437", "\u049A\u0430\u0440", "\u0416\u0435\u043B"], 
							month_names_narrow : ["\u049A\u0430\u04A3", "\u0410\u049B\u043F", "\u041D\u0430\u0443", "\u0421\u04D9\u0443", "\u041C\u0430\u043C", "\u041C\u0430\u0443", "\u0428\u0456\u043B", "\u0422\u0430\u043C", "\u049A\u044B\u0440", "\u049A\u0430\u0437", "\u049A\u0430\u0440", "\u0416\u0435\u043B"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041\u0020\u0436\u002E", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.kk_kz;
						break;
					case "kl":
					case "kl_gl":
						nexacro.Locale.kl = nexacro.Locale.kl_gl = {
							name : "kl_GL", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0044\u004B\u004B\u0020", 
							currency_symbol : "\u006B\u0072", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 2, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u0061\u0062\u0061\u0061\u0074", "\u0061\u0074\u0061\u0061\u0073\u0069\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u006D\u0061\u0072\u006C\u0075\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0070\u0069\u006E\u0067\u0061\u0073\u0075\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0073\u0069\u0073\u0061\u006D\u0061\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0074\u0061\u006C\u006C\u0069\u006D\u0061\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0061\u0072\u0066\u0069\u006E\u0069\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071"], 
							weekday_names_short : ["\u0073\u0061\u0062", "\u0061\u0074\u0061", "\u006D\u0061\u0072", "\u0070\u0069\u006E", "\u0073\u0069\u0073", "\u0074\u0061\u006C", "\u0061\u0072\u0066"], 
							weekday_names_narrow : ["\u0073\u0061\u0062", "\u0061\u0074\u0061", "\u006D\u0061\u0072", "\u0070\u0069\u006E", "\u0073\u0069\u0073", "\u0074\u0061\u006C", "\u0061\u0072\u0066"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0074\u0073\u0069", "\u0061\u0070\u0072\u0069\u006C\u0069", "\u006D\u0061\u006A\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072\u0069", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072\u0069", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072\u0069", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072\u0069"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.kl_gl;
						break;
					case "km":
					case "km_kh":
						nexacro.Locale.km = nexacro.Locale.km_kh = {
							name : "km_KH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004B\u0048\u0052\u0020", 
							currency_symbol : "\u17DB", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 0, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u1790\u17D2\u1784\u17C3\u200B\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799", "\u1790\u17D2\u1784\u17C3\u200B\u1785\u17D0\u1793\u17D2\u1791", "\u1790\u17D2\u1784\u17C3\u200B\u17A2\u1784\u17D2\u1782\u17B6\u179A", "\u1790\u17D2\u1784\u17C3\u200B\u1796\u17BB\u1792", "\u1790\u17D2\u1784\u17C3\u200B\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD", "\u1790\u17D2\u1784\u17C3\u200B\u179F\u17BB\u1780\u17D2\u179A", "\u1790\u17D2\u1784\u17C3\u200B\u179F\u17C5\u179A\u17CD"], 
							weekday_names_short : ["\u17A2\u17B6", "\u1785", "\u17A2", "\u1796\u17BB", "\u1796\u17D2\u179A", "\u179F\u17BB", "\u179F"], 
							weekday_names_narrow : ["\u17A2\u17B6", "\u1785", "\u17A2", "\u1796\u17BB", "\u1796\u17D2\u179A", "\u179F\u17BB", "\u179F"], 
							month_names_long : ["\u1798\u1780\u179A\u17B6", "\u1780\u17BB\u1798\u17D2\u1797\u17C8", "\u1798\u17B7\u1793\u17B6", "\u1798\u17C1\u179F\u17B6", "\u17A7\u179F\u1797\u17B6", "\u1798\u17B7\u1790\u17BB\u1793\u17B6", "\u1780\u1780\u17D2\u1780\u178A\u17B6", "\u179F\u17B8\u17A0\u17B6", "\u1780\u1789\u17D2\u1789\u17B6", "\u178F\u17BB\u179B\u17B6", "\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6", "\u1792\u17D2\u1793\u17BC"], 
							month_names_short : ["\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9", "\u17E1\u17E0", "\u17E1\u17E1", "\u17E1\u17E2"], 
							month_names_narrow : ["\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9", "\u17E1\u17E0", "\u17E1\u17E1", "\u17E1\u17E2"], 
							ampm : ["\u1796\u17D2\u179A\u17B9\u1780", "\u179B\u17D2\u1784\u17B6\u1785"], 
							date_format : "%e %B %Y", 
							time_format : "%H:%M:%S", 
							time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
							date_time_format : "%A \u1790\u17D2\u1784\u17C3 %e \u1781\u17C2 %B \u1786\u17D2\u1793\u17B6\u17C6  %Y, %H \u1798\u17C9\u17C4\u1784 m \u1793\u17B6\u1791\u17B8 %S \u179C\u17B7\u1793\u17B6\u1791\u17B8\u200B", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062%\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D%\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.km_kh;
						break;
					case "kn":
					case "kn_in":
						nexacro.Locale.kn = nexacro.Locale.kn_in = {
							name : "kn_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0CB0\u0CC2", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0CB0\u0CB5\u0CBF\u0CB5\u0CBE\u0CB0", "\u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0", "\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0", "\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0", "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0", "\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0", "\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0"], 
							weekday_names_short : ["\u0CB0", "\u0CB8\u0CCB", "\u0CAE\u0C82", "\u0CAC\u0CC1", "\u0C97\u0CC1", "\u0CB6\u0CC1", "\u0CB6"], 
							weekday_names_narrow : ["\u0CB0", "\u0CB8\u0CCB", "\u0CAE\u0C82", "\u0CAC\u0CC1", "\u0C97\u0CC1", "\u0CB6\u0CC1", "\u0CB6"], 
							month_names_long : ["\u0C9C\u0CA8\u0CB5\u0CB0\u0CBF", "\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0\u0CB5\u0CB0\u0CBF", "\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A", "\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD", "\u0CAE\u0CC7", "\u0C9C\u0CC2\u0CA8\u0CCD", "\u0C9C\u0CC1\u0CB2\u0CBE\u0CAF\u0CBF", "\u0C86\u0C97\u0CB8\u0CCD\u0CA4\u0CC1", "\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82\u0CAC\u0CB0", "\u0C85\u0C95\u0CCD\u0CA4\u0CC2\u0CAC\u0CB0", "\u0CA8\u0CB5\u0CC6\u0C82\u0CAC\u0CB0", "\u0CA6\u0CB6\u0C82\u0CAC\u0CB0"], 
							month_names_short : ["\u0C9C", "\u0CAB\u0CC6", "\u0CAE\u0CBE", "\u0C8F", "\u0CAE\u0CC7", "\u0C9C\u0CC2", "\u0C9C\u0CC1", "\u0C86", "\u0CB8\u0CC6", "\u0C85", "\u0CA8", "\u0CA6"], 
							month_names_narrow : ["\u0C9C", "\u0CAB\u0CC6", "\u0CAE\u0CBE", "\u0C8F", "\u0CAE\u0CC7", "\u0C9C\u0CC2", "\u0C9C\u0CC1", "\u0C86", "\u0CB8\u0CC6", "\u0C85", "\u0CA8", "\u0CA6"], 
							ampm : ["\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CBE\u0CB9\u0CCD\u0CA8", "\u0C85\u0CAA\u0CB0\u0CBE\u0CB9\u0CCD\u0CA8"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.kn_in;
						break;
					case "ko":
					case "ko_kr":
						nexacro.Locale.ko = nexacro.Locale.ko_kr = {
							name : "ko_KR", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004B\u0052\u0057\u0020", 
							currency_symbol : "\uFFE6", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C", "\uD654\uC694\uC77C", "\uC218\uC694\uC77C", "\uBAA9\uC694\uC77C", "\uAE08\uC694\uC77C", "\uD1A0\uC694\uC77C"], 
							weekday_names_short : ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"], 
							weekday_names_narrow : ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"], 
							month_names_long : ["\u0031\uC6D4", "\u0032\uC6D4", "\u0033\uC6D4", "\u0034\uC6D4", "\u0035\uC6D4", "\u0036\uC6D4", "\u0037\uC6D4", "\u0038\uC6D4", "\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
							month_names_short : ["\u0020\u0031\uC6D4", "\u0020\u0032\uC6D4", "\u0020\u0033\uC6D4", "\u0020\u0034\uC6D4", "\u0020\u0035\uC6D4", "\u0020\u0036\uC6D4", "\u0020\u0037\uC6D4", "\u0020\u0038\uC6D4", "\u0020\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
							month_names_narrow : ["\u0020\u0031\uC6D4", "\u0020\u0032\uC6D4", "\u0020\u0033\uC6D4", "\u0020\u0034\uC6D4", "\u0020\u0035\uC6D4", "\u0020\u0036\uC6D4", "\u0020\u0037\uC6D4", "\u0020\u0038\uC6D4", "\u0020\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
							ampm : ["\uC624\uC804", "\uC624\uD6C4"], 
							date_format : "\u0025\u0059\uB144\u0020\u0025\u006D\uC6D4\u0020\u0025\u0064\uC77C", 
							time_format : "\u0025\u0048\uC2DC\u0020\u0025\u004D\uBD84\u0020\u0025\u0053\uCD08", 
							time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\uC2DC\u0020\u0025\u004D\uBD84\u0020\u0025\u0053\uCD08", 
							date_time_format : "\u0025\u0078\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0072", 
							full_date_time_format : "\u0025\u0059\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0064\u002E\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\uB144\u0020\u0025\u006E\uC6D4\u0020\u0025\u0065\uC77C\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.ko_kr;
						break;
					case "ku":
					case "ku_tr":
						nexacro.Locale.ku = nexacro.Locale.ku_tr = {
							name : "ku_TR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0054\u0052\u0059\u0020", 
							currency_symbol : "\u0059\u0054\u004C", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0079\u00EA\u006B\u0073\u00EA\u006D", "\u0064\u0075\u0073\u00EA\u006D", "\u0073\u00EA\u0073\u00EA\u006D", "\u00E7\u0061\u0072\u0073\u00EA\u006D", "\u0070\u00EA\u006E\u0063\u0073\u00EA\u006D", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070\u0074"], 
							weekday_names_short : ["\u0079\u00EA\u006B", "\u0064\u0075\u0073", "\u0073\u00EA\u0073", "\u00E7\u0061\u0072", "\u0070\u00EA\u006E", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070"], 
							weekday_names_narrow : ["\u0079\u00EA\u006B", "\u0064\u0075\u0073", "\u0073\u00EA\u0073", "\u00E7\u0061\u0072", "\u0070\u00EA\u006E", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070"], 
							month_names_long : ["\u00C7\u0069\u006C\u0065", "\u0053\u0069\u0062\u0061\u0074", "\u0041\u0064\u0061\u0072", "\u004E\u00EE\u0073\u0061\u006E", "\u0047\u0075\u006C\u0061\u006E", "\u0048\u0065\u007A\u00EE\u0072\u0061\u006E", "\u0054\u00EE\u0072\u006D\u0065\u0068", "\u0054\u0065\u0062\u0061\u0078", "\u00CE\u006C\u006F\u006E", "\u0043\u006F\u0074\u006D\u0065\u0068", "\u004D\u0069\u006A\u0064\u0061\u0072", "\u004B\u0061\u006E\u00FB\u006E"], 
							month_names_short : ["\u00C7\u0069\u006C", "\u0053\u0069\u0062", "\u0041\u0064\u0061", "\u004E\u00EE\u0073", "\u0047\u0075\u006C", "\u0048\u0065\u007A", "\u0054\u00EE\u0072", "\u0054\u0065\u0062", "\u00CE\u006C\u006F", "\u0043\u006F\u0074", "\u004D\u0069\u006A", "\u004B\u0061\u006E"], 
							month_names_narrow : ["\u00C7\u0069\u006C", "\u0053\u0069\u0062", "\u0041\u0064\u0061", "\u004E\u00EE\u0073", "\u0047\u0075\u006C", "\u0048\u0065\u007A", "\u0054\u00EE\u0072", "\u0054\u0065\u0062", "\u00CE\u006C\u006F", "\u0043\u006F\u0074", "\u004D\u0069\u006A", "\u004B\u0061\u006E"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ku_tr;
						break;
					case "kw":
					case "kw_gb":
						nexacro.Locale.kw = nexacro.Locale.kw_gb = {
							name : "kw_GB", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0047\u0042\u0050\u0020", 
							currency_symbol : "\u00A3", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u0065\u0020\u0053\u0075\u006C", "\u0044\u0065\u0020\u004C\u0075\u006E", "\u0044\u0065\u0020\u004D\u0065\u0072\u0074\u0068", "\u0044\u0065\u0020\u004D\u0065\u0072\u0068\u0065\u0072", "\u0044\u0065\u0020\u0059\u006F\u0077", "\u0044\u0065\u0020\u0047\u0077\u0065\u006E\u0065\u0072", "\u0044\u0065\u0020\u0053\u0061\u0064\u006F\u0072\u006E"], 
							weekday_names_short : ["\u0053\u0075\u006C", "\u004C\u0075\u006E", "\u004D\u0074\u0068", "\u004D\u0068\u0072", "\u0059\u006F\u0077", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
							weekday_names_narrow : ["\u0053\u0075\u006C", "\u004C\u0075\u006E", "\u004D\u0074\u0068", "\u004D\u0068\u0072", "\u0059\u006F\u0077", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
							month_names_long : ["\u004D\u0079\u0073\u0020\u0047\u0065\u006E\u0076\u0065\u0072", "\u004D\u0079\u0073\u0020\u0057\u0068\u0065\u0076\u0072\u0065\u006C", "\u004D\u0079\u0073\u0020\u004D\u0065\u0072\u0074\u0068", "\u004D\u0079\u0073\u0020\u0045\u0062\u0072\u0065\u006C", "\u004D\u0079\u0073\u0020\u004D\u0065", "\u004D\u0079\u0073\u0020\u0045\u0076\u0061\u006E", "\u004D\u0079\u0073\u0020\u0047\u006F\u0072\u0074\u0068\u0065\u0072\u0065\u006E", "\u004D\u0079\u0065\u0020\u0045\u0073\u0074", "\u004D\u0079\u0073\u0020\u0047\u0077\u0079\u006E\u0067\u0061\u006C\u0061", "\u004D\u0079\u0073\u0020\u0048\u0065\u0064\u0072\u0061", "\u004D\u0079\u0073\u0020\u0044\u0075", "\u004D\u0079\u0073\u0020\u004B\u0065\u0076\u0061\u0072\u0064\u0068\u0075"], 
							month_names_short : ["\u0047\u0065\u006E", "\u0057\u0068\u0065", "\u004D\u0065\u0072", "\u0045\u0062\u0072", "\u004D\u0065", "\u0045\u0076\u006E", "\u0047\u006F\u0072", "\u0045\u0073\u0074", "\u0047\u0077\u006E", "\u0048\u0065\u0064", "\u0044\u0075", "\u004B\u0065\u0076"], 
							month_names_narrow : ["\u0047\u0065\u006E", "\u0057\u0068\u0065", "\u004D\u0065\u0072", "\u0045\u0062\u0072", "\u004D\u0065", "\u0045\u0076\u006E", "\u0047\u006F\u0072", "\u0045\u0073\u0074", "\u0047\u0077\u006E", "\u0048\u0065\u0064", "\u0044\u0075", "\u004B\u0065\u0076"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.kw_gb;
						break;
					case "ky":
					case "ky_kg":
						nexacro.Locale.ky = nexacro.Locale.ky_kg = {
							name : "ky_KG", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004B\u0047\u0053\u0020", 
							currency_symbol : "\u0441\u043E\u043C", 
							mon_decimal_point : "\u002D", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0436\u0435\u043A\u0448\u0435\u043C\u0431\u0438", "\u0434\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF", "\u0448\u0435\u0439\u0448\u0435\u043C\u0431\u0438", "\u0448\u0430\u0440\u0448\u0435\u043C\u0431\u0438", "\u0431\u0435\u0439\u0448\u0435\u043C\u0431\u0438", "\u0436\u0443\u043C\u0430", "\u0438\u0448\u0435\u043C\u0431\u0438"], 
							weekday_names_short : ["\u0436\u043A", "\u0434\u0448", "\u0448\u0435", "\u0448\u0430", "\u0431\u0448", "\u0436\u043C", "\u0438\u0448"], 
							weekday_names_narrow : ["\u0436\u043A", "\u0434\u0448", "\u0448\u0435", "\u0448\u0430", "\u0431\u0448", "\u0436\u043C", "\u0438\u0448"], 
							month_names_long : ["\u044F\u043D\u0432\u0430\u0440\u044C", "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0435\u043B\u044C", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", "\u043D\u043E\u044F\u0431\u0440\u044C", "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"], 
							month_names_short : ["\u044F\u043D\u0432", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u0438\u044E\u043D", "\u0438\u044E\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043D", "\u043E\u043A\u0442", "\u043D\u043E\u044F", "\u0434\u0435\u043A"], 
							month_names_narrow : ["\u044F\u043D\u0432", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u0438\u044E\u043D", "\u0438\u044E\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043D", "\u043E\u043A\u0442", "\u043D\u043E\u044F", "\u0434\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0065\u002D\u0025\u0062\u0020\u0025\u0059\u0020\u0436\u002C\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002D\u0025\u0042\u0020\u0025\u0059\u002D\u0025\u0041\u0020\u0436\u002E", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.ky_kg;
						break;
					case "lg":
					case "lg_ug":
						nexacro.Locale.lg = nexacro.Locale.lg_ug = {
							name : "lg_UG", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u0047\u0058\u0020", 
							currency_symbol : "\u002F\u002D", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 0, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0061\u0062\u0069\u0069\u0074\u0069", "\u0042\u0061\u006C\u0061\u007A\u0061", "\u004C\u0077\u0061\u006B\u0075\u0062\u0069\u0072\u0069", "\u004C\u0077\u0061\u006B\u0075\u0073\u0061\u0074\u0075", "\u004C\u0077\u0061\u006B\u0075\u006E\u0061", "\u004C\u0077\u0061\u006B\u0075\u0074\u0061\u0061\u006E\u006F", "\u004C\u0077\u0061\u006D\u0075\u006B\u0061\u0061\u0067\u0061"], 
							weekday_names_short : ["\u0053\u0061\u0062", "\u0042\u0061\u006C", "\u004C\u0077\u0032", "\u004C\u0077\u0033", "\u004C\u0077\u0034", "\u004C\u0077\u0035", "\u004C\u0077\u0036"], 
							weekday_names_narrow : ["\u0053\u0061\u0062", "\u0042\u0061\u006C", "\u004C\u0077\u0032", "\u004C\u0077\u0033", "\u004C\u0077\u0034", "\u004C\u0077\u0035", "\u004C\u0077\u0036"], 
							month_names_long : ["\u004A\u0061\u006E\u0077\u0061\u006C\u0069\u0079\u006F", "\u0046\u0065\u0062\u0077\u0061\u006C\u0069\u0079\u006F", "\u004D\u0061\u0072\u0069\u0073\u0069", "\u0041\u0070\u0075\u006C\u0069", "\u004D\u0061\u0061\u0079\u0069", "\u004A\u0075\u0075\u006E\u0069", "\u004A\u0075\u006C\u0061\u0061\u0069", "\u0041\u0067\u0075\u0073\u0069\u0074\u006F", "\u0053\u0065\u0062\u0075\u0074\u0074\u0065\u006D\u0062\u0061", "\u004F\u006B\u0069\u0074\u006F\u0062\u0062\u0061", "\u004E\u006F\u0076\u0065\u006D\u0062\u0061", "\u0044\u0065\u0073\u0065\u006D\u0062\u0061"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0075", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0062", "\u004F\u006B\u0069", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0075", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0062", "\u004F\u006B\u0069", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.lg_ug;
						break;
					case "lo":
					case "lo_la":
						nexacro.Locale.lo = nexacro.Locale.lo_la = {
							name : "lo_LA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004C\u0041\u004B\u0020", 
							currency_symbol : "\u20AD", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 2, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0EAD\u0EB2\u0E97\u0EB4\u0E94", "\u0E88\u0EB1\u0E99", "\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99", "\u0E9E\u0EB8\u0E94", "\u0E9E\u0EB0\u0EAB\u0EB1\u0E94", "\u0EAA\u0EB8\u0E81", "\u0EC0\u0EAA\u0EBB\u0EB2"], 
							weekday_names_short : ["\u0EAD\u0EB2\u002E", "\u0E88\u002E", "\u0E84\u002E", "\u0E9E\u002E", "\u0E9E\u0EAB\u002E", "\u0EAA\u002E", "\u0EAA\u002E"], 
							weekday_names_narrow : ["\u0EAD\u0EB2\u002E", "\u0E88\u002E", "\u0E84\u002E", "\u0E9E\u002E", "\u0E9E\u0EAB\u002E", "\u0EAA\u002E", "\u0EAA\u002E"], 
							month_names_long : ["\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99", "\u0E81\u0EB8\u0EA1\u0E9F\u0EB2", "\u0EA1\u0EB5\u0E99\u0EB2", "\u0EC0\u0EA1\u0EAA\u0EB2", "\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2", "\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2", "\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94", "\u0EAA\u0EB4\u0E87\u0EAB\u0EB2", "\u0E81\u0EB1\u0E99\u0E8D\u0EB2", "\u0E95\u0EB8\u0EA5\u0EB2", "\u0E9E\u0EB0\u0E88\u0EB4\u0E81", "\u0E97\u0EB1\u0E99\u0EA7\u0EB2"], 
							month_names_short : ["\u0EA1\u002E\u0E81\u002E", "\u0E81\u002E\u0E9E\u002E", "\u0EA1\u002E\u0E99\u002E", "\u0EA1\u002E\u0EAA\u002E", "\u0E9E\u002E\u0E9E\u002E", "\u0EA1\u0EB4\u002E\u0E96\u002E", "\u0E81\u002E\u0EA5\u002E", "\u0EAA\u002E\u0EAB\u002E", "\u0E81\u002E\u0E8D\u002E", "\u0E95\u002E\u0EA5\u002E", "\u0E9E\u002E\u0E88\u002E", "\u0E97\u002E\u0EA7\u002E"], 
							month_names_narrow : ["\u0EA1\u002E\u0E81\u002E", "\u0E81\u002E\u0E9E\u002E", "\u0EA1\u002E\u0E99\u002E", "\u0EA1\u002E\u0EAA\u002E", "\u0E9E\u002E\u0E9E\u002E", "\u0EA1\u0EB4\u002E\u0E96\u002E", "\u0E81\u002E\u0EA5\u002E", "\u0EAA\u002E\u0EAB\u002E", "\u0E81\u002E\u0E8D\u002E", "\u0E95\u002E\u0EA5\u002E", "\u0E9E\u002E\u0E88\u002E", "\u0E97\u002E\u0EA7\u002E"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "%d\u002F%m\u002F%Ey", 
							time_format : "%H\u003A%M\u003A%S", 
							time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
							date_time_format : "%a\u0020%e\u0020%b\u0020%Ey\u002C\u0020%H\u003A%M\u003A%S", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.lo_la;
						break;
					case "lt":
					case "lt_lt":
						nexacro.Locale.lt = nexacro.Locale.lt_lt = {
							name : "lt_LT", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004C\u0054\u004C\u0020", 
							currency_symbol : "\u004C\u0074", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0065\u006B\u006D\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0050\u0069\u0072\u006D\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0041\u006E\u0074\u0072\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0054\u0072\u0065\u010D\u0069\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u004B\u0065\u0074\u0076\u0069\u0072\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0050\u0065\u006E\u006B\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0160\u0065\u0161\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073"], 
							weekday_names_short : ["\u0053\u006B", "\u0050\u0072", "\u0041\u006E", "\u0054\u0072", "\u004B\u0074", "\u0050\u006E", "\u0160\u0074"], 
							weekday_names_narrow : ["\u0053\u006B", "\u0050\u0072", "\u0041\u006E", "\u0054\u0072", "\u004B\u0074", "\u0050\u006E", "\u0160\u0074"], 
							month_names_long : ["\u0073\u0061\u0075\u0073\u0069\u006F", "\u0076\u0061\u0073\u0061\u0072\u0069\u006F", "\u006B\u006F\u0076\u006F", "\u0062\u0061\u006C\u0061\u006E\u0064\u017E\u0069\u006F", "\u0067\u0065\u0067\u0075\u017E\u0117\u0073", "\u0062\u0069\u0072\u017E\u0065\u006C\u0069\u006F", "\u006C\u0069\u0065\u0070\u006F\u0073", "\u0072\u0075\u0067\u0070\u006A\u016B\u010D\u0069\u006F", "\u0072\u0075\u0067\u0073\u0117\u006A\u006F", "\u0073\u0070\u0061\u006C\u0069\u006F", "\u006C\u0061\u0070\u006B\u0072\u0069\u010D\u0069\u006F", "\u0067\u0072\u0075\u006F\u0064\u017E\u0069\u006F"], 
							month_names_short : ["\u0053\u0061\u0075", "\u0056\u0061\u0073", "\u004B\u006F\u0076", "\u0042\u0061\u006C", "\u0047\u0065\u0067", "\u0042\u0069\u0072", "\u004C\u0069\u0065", "\u0052\u0067\u0070", "\u0052\u0067\u0073", "\u0053\u0070\u0061", "\u004C\u0061\u0070", "\u0047\u0072\u0064"], 
							month_names_narrow : ["\u0053\u0061\u0075", "\u0056\u0061\u0073", "\u004B\u006F\u0076", "\u0042\u0061\u006C", "\u0047\u0065\u0067", "\u0042\u0069\u0072", "\u004C\u0069\u0065", "\u0052\u0067\u0070", "\u0052\u0067\u0073", "\u0053\u0070\u0061", "\u004C\u0061\u0070", "\u0047\u0072\u0064"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0059\u0020\u006D\u002E\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u0064\u002E\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u0020\u0027\u006D\u0027\u002E\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u0027\u0064\u0027\u002E", 
							shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.lt_lt;
						break;
					case "lv":
					case "lv_lv":
						nexacro.Locale.lv = nexacro.Locale.lv_lv = {
							name : "lv_LV", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004C\u0056\u004C\u0020", 
							currency_symbol : "\u004C\u0073", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 3, 
							n_sign_posn : 3, 
							weekday_names_long : ["\u0073\u0076\u0113\u0074\u0064\u0069\u0065\u006E\u0061", "\u0070\u0069\u0072\u006D\u0064\u0069\u0065\u006E\u0061", "\u006F\u0074\u0072\u0064\u0069\u0065\u006E\u0061", "\u0074\u0072\u0065\u0161\u0064\u0069\u0065\u006E\u0061", "\u0063\u0065\u0074\u0075\u0072\u0074\u0064\u0069\u0065\u006E\u0061", "\u0070\u0069\u0065\u006B\u0074\u0064\u0069\u0065\u006E\u0061", "\u0073\u0065\u0073\u0074\u0064\u0069\u0065\u006E\u0061"], 
							weekday_names_short : ["\u0053\u0076", "\u0050\u00A0", "\u004F\u00A0", "\u0054\u00A0", "\u0043\u00A0", "\u0050\u006B", "\u0053\u00A0"], 
							weekday_names_narrow : ["\u0053\u0076", "\u0050\u00A0", "\u004F\u00A0", "\u0054\u00A0", "\u0043\u00A0", "\u0050\u006B", "\u0053\u00A0"], 
							month_names_long : ["\u006A\u0061\u006E\u0076\u0101\u0072\u0069\u0073", "\u0066\u0065\u0062\u0072\u0075\u0101\u0072\u0069\u0073", "\u006D\u0061\u0072\u0074\u0073", "\u0061\u0070\u0072\u012B\u006C\u0069\u0073", "\u006D\u0061\u0069\u006A\u0073", "\u006A\u016B\u006E\u0069\u006A\u0073", "\u006A\u016B\u006C\u0069\u006A\u0073", "\u0061\u0075\u0067\u0075\u0073\u0074\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0069\u0073", "\u006F\u006B\u0074\u006F\u0062\u0072\u0069\u0073", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0069\u0073", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0069\u0073"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u016B\u006E", "\u006A\u016B\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u016B\u006E", "\u006A\u016B\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "%A\u002C %Y\u002E \u0067\u0061\u0064\u0061 %e\u002E %B\u002C \u0070\u006C\u006B\u0073\u0074\u002E %H \u0075\u006E %M", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0059\u002E\u0020\u0027\u0067\u0061\u0064\u0061\u0027\u0020\u0025\u0065\u002E\u0020\u0025\u0042", 
							shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
							direction : "ltr"
						};
						return nexacro.Locale.lv_lv;
						break;
					case "mg":
					case "mg_mg":
						nexacro.Locale.mg = nexacro.Locale.mg_mg = {
							name : "mg_MG", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u004D\u0047\u0041\u0020", 
							currency_symbol : "\u0041\u0052", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0061\u006C\u0061\u0068\u0061\u0064\u0079", "\u0061\u006C\u0061\u0074\u0073\u0069\u006E\u0061\u0069\u006E\u0079", "\u0074\u0061\u006C\u0061\u0074\u0061", "\u0061\u006C\u0061\u0072\u006F\u0062\u0069\u0061", "\u0061\u006C\u0061\u006B\u0061\u006D\u0069\u0073\u0079", "\u007A\u006F\u006D\u0061", "\u0073\u0061\u0062\u006F\u0074\u0073\u0079"], 
							weekday_names_short : ["\u006C\u0068\u0064", "\u006C\u0074\u0073", "\u0074\u006C\u0074", "\u006C\u0072\u0062", "\u006C\u006B\u006D", "\u007A\u006F\u006D", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u006C\u0068\u0064", "\u006C\u0074\u0073", "\u0074\u006C\u0074", "\u006C\u0072\u0062", "\u006C\u006B\u006D", "\u007A\u006F\u006D", "\u0073\u0061\u0062"], 
							month_names_long : ["\u006A\u0061\u006E\u006F\u0061\u0072\u0079", "\u0066\u0065\u0062\u0072\u006F\u0061\u0072\u0079", "\u006D\u0061\u0072\u0074\u0073\u0061", "\u0061\u0070\u0072\u0069\u006C\u0079", "\u006D\u0065\u0079", "\u006A\u006F\u006E\u0061", "\u006A\u006F\u006C\u0061\u0079", "\u0061\u006F\u0067\u006F\u0073\u0069\u0074\u0072\u0061", "\u0073\u0065\u0070\u0074\u0061\u006D\u0062\u0072\u0061", "\u006F\u006B\u0074\u006F\u0062\u0072\u0061", "\u006E\u006F\u0076\u0061\u006D\u0062\u0072\u0061", "\u0064\u0065\u0073\u0061\u006D\u0062\u0072\u0061"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0065\u0079", "\u006A\u006F\u006E", "\u006A\u006F\u006C", "\u0061\u006F\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0065\u0079", "\u006A\u006F\u006E", "\u006A\u006F\u006C", "\u0061\u006F\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.mg_mg;
						break;
					case "mi":
					case "mi_nz":
						nexacro.Locale.mi = nexacro.Locale.mi_nz = {
							name : "mi_NZ", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u005A\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0052\u0101\u0074\u0061\u0070\u0075", "\u004D\u0061\u006E\u0065", "\u0054\u016B\u0072\u0065\u0069", "\u0057\u0065\u006E\u0065\u0072\u0065\u0069", "\u0054\u0101\u0069\u0074\u0065", "\u0050\u0061\u0072\u0061\u0069\u0072\u0065", "\u0048\u0101\u0074\u0061\u0072\u0065\u0069"], 
							weekday_names_short : ["\u0054\u0061", "\u004D\u0061", "\u0054\u016B", "\u0057\u0065", "\u0054\u0101\u0069", "\u0050\u0061", "\u0048\u0101"], 
							weekday_names_narrow : ["\u0054\u0061", "\u004D\u0061", "\u0054\u016B", "\u0057\u0065", "\u0054\u0101\u0069", "\u0050\u0061", "\u0048\u0101"], 
							month_names_long : ["\u004B\u006F\u0068\u0069\u002D\u0074\u0101\u0074\u0065\u0061", "\u0048\u0075\u0069\u002D\u0074\u0061\u006E\u0067\u0075\u0072\u0075", "\u0050\u006F\u0075\u0074\u016B\u002D\u0074\u0065\u002D\u0072\u0061\u006E\u0067\u0069", "\u0050\u0061\u0065\u006E\u0067\u0061\u002D\u0077\u0068\u0101\u0077\u0068\u0101", "\u0048\u0061\u0072\u0061\u0074\u0075\u0061", "\u0050\u0069\u0070\u0069\u0072\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065\u002D\u0074\u0075\u0072\u0069\u002D\u006B\u014D\u006B\u0101", "\u004D\u0061\u0068\u0075\u0072\u0075", "\u0057\u0068\u0069\u0072\u0069\u006E\u0067\u0061\u002D\u0101\u002D\u006E\u0075\u006B\u0075", "\u0057\u0068\u0069\u0072\u0069\u006E\u0067\u0061\u002D\u0101\u002D\u0072\u0061\u006E\u0067\u0069", "\u0048\u0061\u006B\u0069\u0068\u0065\u0061"], 
							month_names_short : ["\u004B\u006F\u0068\u0069", "\u0048\u0075\u0069", "\u0050\u006F\u0075", "\u0050\u0061\u0065", "\u0048\u0061\u0072\u0061", "\u0050\u0069\u0070\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065", "\u004D\u0061\u0068\u0075", "\u0057\u0068\u0069\u002D\u006E\u0075", "\u0057\u0068\u0069\u002D\u0072\u0061", "\u0048\u0061\u006B\u0069"], 
							month_names_narrow : ["\u004B\u006F\u0068\u0069", "\u0048\u0075\u0069", "\u0050\u006F\u0075", "\u0050\u0061\u0065", "\u0048\u0061\u0072\u0061", "\u0050\u0069\u0070\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065", "\u004D\u0061\u0068\u0075", "\u0057\u0068\u0069\u002D\u006E\u0075", "\u0057\u0068\u0069\u002D\u0072\u0061", "\u0048\u0061\u006B\u0069"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0054\u0065\u0020\u0025\u0041\u002C\u0020\u0074\u0065\u0020\u0025\u0064\u0020\u006F\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.mi_nz;
						break;
					case "mk":
					case "mk_mk":
						nexacro.Locale.mk = nexacro.Locale.mk_mk = {
							name : "mk_MK", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004D\u004B\u0044\u0020", 
							currency_symbol : "\u0434\u0435\u043D\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u043D\u0435\u0434\u0435\u043B\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A", "\u043F\u0435\u0442\u043E\u043A", "\u0441\u0430\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0432\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0430\u0431"], 
							weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0432\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0430\u0431"], 
							month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440\u0438", "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D\u0438", "\u0458\u0443\u043B\u0438", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438", "\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438", "\u043D\u043E\u0435\u043C\u0432\u0440\u0438", "\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"], 
							month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
							month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.mk_mk;
						break;
					case "ml":
					case "ml_in":
						nexacro.Locale.ml = nexacro.Locale.ml_in = {
							name : "ml_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0D15", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0D1E\u0D3E\u0D2F\u0D30\u0D4D\u200D", "\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D4D\u200D", "\u0D1A\u0D4A\u0D35\u0D4D\u0D35", "\u0D2C\u0D41\u0D27\u0D28\u0D4D\u200D", "\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02", "\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F", "\u0D36\u0D28\u0D3F"], 
							weekday_names_short : ["\u0D1E\u0D3E", "\u0D24\u0D3F", "\u0D1A\u0D4A", "\u0D2C\u0D41", "\u0D35\u0D4D\u0D2F\u0D3E", "\u0D35\u0D46", "\u0D36"], 
							weekday_names_narrow : ["\u0D1E\u0D3E", "\u0D24\u0D3F", "\u0D1A\u0D4A", "\u0D2C\u0D41", "\u0D35\u0D4D\u0D2F\u0D3E", "\u0D35\u0D46", "\u0D36"], 
							month_names_long : ["\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F", "\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F", "\u0D2E\u0D3E\u0D30\u0D4D\u200D\u0D1A\u0D4D\u0D1A\u0D4D", "\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D32\u0D4D\u200D\u0020", "\u0D2E\u0D46\u0D2F\u0D4D", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D30\u0D4D\u200D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D30\u0D4D\u200D", "\u0D28\u0D35\u0D02\u0D2C\u0D30\u0D4D\u200D", "\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D30\u0D4D\u200D"], 
							month_names_short : ["\u0D1C\u0D28\u0D41", "\u0D2B\u0D46\u0D2C\u0D4D", "\u0D2E\u0D3E\u0D30\u0D4D\u200D", "\u0D0F\u0D2A\u0D4D\u0D30", "\u0D2E\u0D46", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B", "\u0D28\u0D35\u0D02", "\u0D21\u0D3F\u0D38\u0D02"], 
							month_names_narrow : ["\u0D1C\u0D28\u0D41", "\u0D2B\u0D46\u0D2C\u0D4D", "\u0D2E\u0D3E\u0D30\u0D4D\u200D", "\u0D0F\u0D2A\u0D4D\u0D30", "\u0D2E\u0D46", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B", "\u0D28\u0D35\u0D02", "\u0D21\u0D3F\u0D38\u0D02"], 
							ampm : ["\u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46", "\u0D35\u0D48\u0D15\u0D41"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.ml_in;
						break;
					case "mn":
					case "mn_mn":
						nexacro.Locale.mn = nexacro.Locale.mn_mn = {
							name : "mn_MN", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004D\u004E\u0054\u0020", 
							currency_symbol : "\u20AE", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u041D\u044F\u043C", "\u0414\u0430\u0432\u0430\u0430", "\u041C\u044F\u0433\u043C\u0430\u0440", "\u041B\u0445\u0430\u0433\u0432\u0430", "\u041F\u04AF\u0440\u044D\u0432", "\u0411\u0430\u0430\u0441\u0430\u043D", "\u0411\u044F\u043C\u0431\u0430"], 
							weekday_names_short : ["\u041D\u044F", "\u0414\u0430", "\u041C\u044F", "\u041B\u0445", "\u041F\u04AF", "\u0411\u0430", "\u0411\u044F"], 
							weekday_names_narrow : ["\u041D\u044F", "\u0414\u0430", "\u041C\u044F", "\u041B\u0445", "\u041F\u04AF", "\u0411\u0430", "\u0411\u044F"], 
							month_names_long : ["\u0425\u0443\u043B\u0433\u0430\u043D\u0430\u0020\u0441\u0430\u0440\u044B\u043D", "\u04AE\u0445\u044D\u0440\u0020\u0441\u0430\u0440\u044B\u043D", "\u0411\u0430\u0440\u0020\u0441\u0430\u0440\u044B\u043D", "\u0422\u0443\u0443\u043B\u0430\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u041B\u0443\u0443\u0020\u0441\u0430\u0440\u044B\u043D", "\u041C\u043E\u0433\u043E\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u041C\u043E\u0440\u044C\u0020\u0441\u0430\u0440\u044B\u043D", "\u0425\u043E\u043D\u044C\u0020\u0441\u0430\u0440\u044B\u043D", "\u0411\u0438\u0447\u0020\u0441\u0430\u0440\u044B\u043D", "\u0422\u0430\u0445\u0438\u0430\u0020\u0441\u0430\u0440\u044B\u043D", "\u041D\u043E\u0445\u043E\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u0413\u0430\u0445\u0430\u0439\u0020\u0441\u0430\u0440\u044B\u043D"], 
							month_names_short : ["\u0425\u0443\u043B", "\u04AE\u0445\u044D", "\u0411\u0430\u0440", "\u0422\u0443\u0443", "\u041B\u0443\u0443", "\u041C\u043E\u0433", "\u041C\u043E\u0440", "\u0425\u043E\u043D", "\u0411\u0438\u0447", "\u0422\u0430\u0445", "\u041D\u043E\u0445", "\u0413\u0430\u0445"], 
							month_names_narrow : ["\u0425\u0443\u043B", "\u04AE\u0445\u044D", "\u0411\u0430\u0440", "\u0422\u0443\u0443", "\u041B\u0443\u0443", "\u041C\u043E\u0433", "\u041C\u043E\u0440", "\u0425\u043E\u043D", "\u0411\u0438\u0447", "\u0422\u0430\u0445", "\u041D\u043E\u0445", "\u0413\u0430\u0445"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u002C\u0020\u0025\u0061\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u005A\u0020\u0025\u0059\u0020\u043E\u043D\u044B\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0061\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.mn_mn;
						break;
					case "mr":
					case "mr_in":
						nexacro.Locale.mr = nexacro.Locale.mr_in = {
							name : "mr_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0930\u0941", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0930\u0935\u093F\u0935\u093E\u0930", "\u0938\u094B\u092E\u0935\u093E\u0930", "\u092E\u0902\u0917\u0933\u0935\u093E\u0930", "\u092E\u0902\u0917\u0933\u0935\u093E\u0930", "\u0917\u0941\u0930\u0941\u0935\u093E\u0930", "\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930", "\u0936\u0928\u093F\u0935\u093E\u0930"], 
							weekday_names_short : ["\u0930\u0935\u093F", "\u0938\u094B\u092E", "\u092E\u0902\u0917\u0933", "\u092C\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094D\u0930", "\u0936\u0928\u093F"], 
							weekday_names_narrow : ["\u0930\u0935\u093F", "\u0938\u094B\u092E", "\u092E\u0902\u0917\u0933", "\u092C\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094D\u0930", "\u0936\u0928\u093F"], 
							month_names_long : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
							month_names_short : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
							month_names_narrow : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
							ampm : ["\u092E\u002E\u092A\u0942\u002E", "\u092E\u002E\u0928\u0902\u002E"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.mr_in;
						break;
					case "ms":
					case "ms_my":
						nexacro.Locale.ms = nexacro.Locale.ms_my = {
							name : "ms_MY", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004D\u0059\u0052\u0020", 
							currency_symbol : "\u0052\u004D", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 0, 
							weekday_names_long : ["\u0041\u0068\u0061\u0064", "\u0049\u0073\u006E\u0069\u006E", "\u0053\u0065\u006C\u0061\u0073\u0061", "\u0052\u0061\u0062\u0075", "\u004B\u0068\u0061\u006D\u0069\u0073", "\u004A\u0075\u006D\u0061\u0061\u0074", "\u0053\u0061\u0062\u0074\u0075"], 
							weekday_names_short : ["\u0041\u0068\u0064", "\u0049\u0073\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0068\u0061", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0068\u0064", "\u0049\u0073\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0068\u0061", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u004D\u0061\u0063", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C\u0061\u0069", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0069\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0063", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0063", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ms_my;
						break;
					case "mt":
					case "mt_mt":
						nexacro.Locale.mt = nexacro.Locale.mt_mt = {
							name : "mt_MT", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004D\u0054\u004C\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0069\u006C\u002D\u0126\u0061\u0064\u0064", "\u0069\u0074\u002D\u0054\u006E\u0065\u006A\u006E", "\u0069\u0074\u002D\u0054\u006C\u0069\u0065\u0074\u0061", "\u006C\u002D\u0045\u0072\u0062\u0067\u0127\u0061", "\u0069\u006C\u002D\u0126\u0061\u006D\u0069\u0073", "\u0069\u006C\u002D\u0120\u0069\u006D\u0067\u0127\u0061", "\u0069\u0073\u002D\u0053\u0069\u0062\u0074"], 
							weekday_names_short : ["\u0126\u0061\u0064", "\u0054\u006E\u0065", "\u0054\u006C\u0069", "\u0045\u0072\u0062", "\u0126\u0061\u006D", "\u0120\u0069\u006D", "\u0053\u0069\u0062"], 
							weekday_names_narrow : ["\u0126\u0061\u0064", "\u0054\u006E\u0065", "\u0054\u006C\u0069", "\u0045\u0072\u0062", "\u0126\u0061\u006D", "\u0120\u0069\u006D", "\u0053\u0069\u0062"], 
							month_names_long : ["\u004A\u0061\u006E\u006E\u0061\u0072", "\u0046\u0072\u0061\u0072", "\u004D\u0061\u0072\u007A\u0075", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u006A\u006A\u0075", "\u0120\u0075\u006E\u006A\u0075", "\u004C\u0075\u006C\u006A\u0075", "\u0041\u0077\u0069\u0073\u0073\u0075", "\u0053\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0075", "\u004F\u0074\u0074\u0075\u0062\u0072\u0075", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u0075", "\u0044\u0069\u010B\u0065\u006D\u0062\u0072\u0075\u0020"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0072\u0061", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u006A", "\u0120\u0075\u006E", "\u004C\u0075\u006C", "\u0041\u0077\u0069", "\u0053\u0065\u0074", "\u004F\u0074\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u010B"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0072\u0061", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u006A", "\u0120\u0075\u006E", "\u004C\u0075\u006C", "\u0041\u0077\u0069", "\u0053\u0065\u0074", "\u004F\u0074\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u010B"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0074\u0061\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0074\u0061\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0074\u0061\u0027\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.mt_mt;
						break;
					case "my":
					case "my_mm":
						nexacro.Locale.my = nexacro.Locale.my_mm = {
							name : "my_MM", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004D\u004D\u004B\u0020", 
							currency_symbol : "\u004B", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 0, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031", "\u1010\u1014\u1004\u103A\u1039\u101C\u102C", "\u1021\u1004\u103A\u1039\u1002\u102B", "\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038", "\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038", "\u101E\u1031\u102C\u1000\u103C\u102C", "\u1005\u1014\u1031"], 
							weekday_names_short : ["\u1014\u103D\u1031", "\u101C\u102C", "\u1002\u102B", "\u101F\u1030\u1038", "\u1010\u1031\u1038", "\u101E\u1031\u102C", "\u1014\u1031"], 
							weekday_names_narrow : ["\u1014\u103D\u1031", "\u101C\u102C", "\u1002\u102B", "\u101F\u1030\u1038", "\u1010\u1031\u1038", "\u101E\u1031\u102C", "\u1014\u1031"], 
							month_names_long : ["\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E", "\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E", "\u1019\u1010\u103A", "\u1027\u1015\u103C\u102E", "\u1019\u1031", "\u1007\u103D\u1014\u103A", "\u1007\u1030\u101C\u102D\u102F\u1004\u103A", "\u1029\u1002\u102F\u1010\u103A", "\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C", "\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C", "\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C", "\u1012\u102E\u1007\u1004\u103A\u1018\u102C"], 
							month_names_short : ["\u1007\u1014\u103A", "\u1016\u1031", "\u1019\u1010\u103A", "\u1027\u1015\u103C\u102E", "\u1019\u1031", "\u1007\u103D\u1014\u103A", "\u1007\u1030", "\u1029", "\u1005\u1000\u103A", "\u1021\u1031\u102C\u1000\u103A", "\u1014\u102D\u102F", "\u1012\u102E"], 
							month_names_narrow : ["\u1007\u1014\u103A", "\u1016\u1031", "\u1019\u1010\u103A", "\u1027\u1015\u103C\u102E", "\u1019\u1031", "\u1007\u103D\u1014\u103A", "\u1007\u1030", "\u1029", "\u1005\u1000\u103A", "\u1021\u1031\u102C\u1000\u103A", "\u1014\u102D\u102F", "\u1012\u102E"], 
							ampm : ["\u1014\u1036\u1014\u1000\u103A", "\u100A\u1014\u1031"], 
							date_format : "\u0025\u004F\u0043\u0025\u004F\u0079\u0020\u0025\u0062\u0020\u0025\u004F\u0064\u0020\u0025\u0041", 
							time_format : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
							time_format_ampm : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u004F\u0043\u0025\u004F\u0079\u0020\u0025\u0062\u0020\u0025\u004F\u0064\u0020\u0025\u0041\u0020\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
							full_date_time_format : "\u0025\u004F\u0043\u0025\u004F\u0079\u0020\u0025\u0062\u0020\u0025\u004F\u0064\u0020\u0025\u0041\u0020\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							first_weekday : 1, 
							longdate_format : "\u0025\u004F\u0043\u0025\u004F\u0079\u0020\u0025\u0062\u0020\u0025\u004F\u0064\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.my_mm;
						break;
					case "nb":
					case "nb_no":
						nexacro.Locale.nb = nexacro.Locale.nb_no = {
							name : "nb_NO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u004F\u004B\u0020", 
							currency_symbol : "\u006B\u0072", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.nb_no;
						break;
					case "ne":
					case "ne_np":
						nexacro.Locale.ne = nexacro.Locale.ne_np = {
							name : "ne_NP", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0930\u0942", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0906\u0907\u0924\u092C\u093E\u0930\u0020", "\u0938\u094B\u092E\u092C\u093E\u0930\u0020", "\u092E\u0902\u0917\u0932\u092C\u093E\u0930\u0020", "\u092C\u0941\u0927\u092C\u093E\u0930\u0020", "\u092C\u093F\u0939\u093F\u092C\u093E\u0930\u0020", "\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930\u0020", "\u0936\u0928\u093F\u092C\u093E\u0930\u0020"], 
							weekday_names_short : ["\u0906\u0907\u0924\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u092C\u093F\u0939\u093F\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
							weekday_names_narrow : ["\u0906\u0907\u0924\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u092C\u093F\u0939\u093F\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
							month_names_long : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							month_names_short : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							month_names_narrow : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
							ampm : ["\u092A\u0942\u0930\u094D\u0935\u093E\u0939\u094D\u0928", "\u0905\u092A\u0930\u093E\u0939\u094D\u0928"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ne_np;
						break;
					case "nl_be":
						nexacro.Locale.nl_be = {
							name : "nl_BE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u007A\u006F\u006E\u0064\u0061\u0067", "\u006D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0064\u0069\u006E\u0073\u0064\u0061\u0067", "\u0077\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0064\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0076\u0072\u0069\u006A\u0064\u0061\u0067", "\u007A\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
							weekday_names_narrow : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0061\u0072\u0074", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0065\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.nl_be;
						break;
					case "nl":
					case "nl_nl":
						nexacro.Locale.nl = nexacro.Locale.nl_nl = {
							name : "nl_NL", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 2, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u007A\u006F\u006E\u0064\u0061\u0067", "\u006D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0064\u0069\u006E\u0073\u0064\u0061\u0067", "\u0077\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0064\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0076\u0072\u0069\u006A\u0064\u0061\u0067", "\u007A\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
							weekday_names_narrow : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0061\u0072\u0074", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0065\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002D\u0025\u006E\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.nl_nl;
						break;
					case "nn":
					case "nn_no":
						nexacro.Locale.nn = nexacro.Locale.nn_no = {
							name : "nn_NO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u004F\u004B\u0020", 
							currency_symbol : "\u006B\u0072", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 3, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u0075\u006E\u0064\u0061\u0067\u0020", "\u006D\u00E5\u006E\u0064\u0061\u0067\u0020", "\u0074\u0079\u0073\u0064\u0061\u0067\u0020", "\u006F\u006E\u0073\u0064\u0061\u0067\u0020", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067\u0020", "\u0066\u0072\u0065\u0064\u0061\u0067\u0020", "\u006C\u0061\u0075\u0072\u0064\u0061\u0067\u0020"], 
							weekday_names_short : ["\u0073\u0075\u0020", "\u006D\u00E5\u0020", "\u0074\u0079\u0020", "\u006F\u006E\u0020", "\u0074\u006F\u0020", "\u0066\u0072\u0020", "\u006C\u0061\u0075\u0020"], 
							weekday_names_narrow : ["\u0073\u0075\u0020", "\u006D\u00E5\u0020", "\u0074\u0079\u0020", "\u006F\u006E\u0020", "\u0074\u006F\u0020", "\u0066\u0072\u0020", "\u006C\u0061\u0075\u0020"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u006B\u006C\u0020\u0025\u0048\u002E\u0025\u004D\u0020\u0025\u005A", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u006B\u006C\u0020\u0025\u0048\u002E\u0025\u004D\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.nn_no;
						break;
					case "no":
					case "no_no":
						nexacro.Locale.no = nexacro.Locale.no_no = {
							name : "no_NO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u004F\u004B\u0020", 
							currency_symbol : "\u006B\u0072", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.no_no;
						break;
					case "nr":
					case "nr_za":
						nexacro.Locale.nr = nexacro.Locale.nr_za = {
							name : "nr_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0075\u0053\u006F\u006E\u0074\u006F", "\u0075\u004D\u0076\u0075\u006C\u006F", "\u0075\u004C\u0065\u0073\u0069\u0062\u0069\u006C\u0069", "\u006C\u0065\u0073\u0069\u0074\u0068\u0061\u0074\u0068\u0075", "\u0075\u004C\u0065\u0073\u0069\u006E\u0065", "\u006E\u0067\u006F\u004C\u0065\u0073\u0069\u0068\u006C\u0061\u006E\u0075", "\u0075\u006D\u0047\u0071\u0069\u0062\u0065\u006C\u006F"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0076\u0075", "\u0042\u0069\u006C", "\u0054\u0068\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u0047\u0071\u0069"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0076\u0075", "\u0042\u0069\u006C", "\u0054\u0068\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u0047\u0071\u0069"], 
							month_names_long : ["\u004A\u0061\u006E\u0061\u0062\u0061\u0072\u0069", "\u0075\u0046\u0065\u0062\u0065\u0072\u0062\u0061\u0072\u0069", "\u0075\u004D\u0061\u0074\u006A\u0068\u0069", "\u0075\u002D\u0041\u0070\u0072\u0065\u006C\u0069", "\u004D\u0065\u0079\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0061\u0079\u0069", "\u0041\u0072\u0068\u006F\u0073\u0074\u006F\u0073\u0069", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0061", "\u004F\u006B\u0074\u006F\u0062\u0061", "\u0055\u0073\u0069\u006E\u0079\u0069\u006B\u0068\u0061\u0062\u0061", "\u0044\u0069\u0073\u0065\u006D\u0062\u0061"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0072\u0068", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u0055\u0073\u0069", "\u0044\u0069\u0073"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0072\u0068", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u0055\u0073\u0069", "\u0044\u0069\u0073"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.nr_za;
						break;
					case "oc":
					case "oc_fr":
						nexacro.Locale.oc = nexacro.Locale.oc_fr = {
							name : "oc_FR", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u00F3\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0061\u0062\u0074\u0065"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0063", "\u006A\u00F3\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0063", "\u006A\u00F3\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
							month_names_long : ["\u0067\u0065\u006E\u0069\u00E8\u0072", "\u0066\u0065\u0062\u0072\u0069\u00E8\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u0061\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0068", "\u006A\u0075\u006C\u0068\u0065\u0074", "\u0061\u0067\u00F3\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u00F3", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u00F3", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.oc_fr;
						break;
					case "om":
					case "om_et":
						nexacro.Locale.om = nexacro.Locale.om_et = {
							name : "om_ET", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0054\u0042\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u0069\u006C\u0062\u0061\u0074\u0061", "\u0057\u0069\u0069\u0078\u0061\u0074\u0061", "\u0051\u0069\u0062\u0078\u0061\u0074\u0061", "\u0052\u006F\u006F\u0062\u0069\u0069", "\u004B\u0061\u006D\u0069\u0069\u0073\u0061", "\u004A\u0069\u006D\u0061\u0061\u0074\u0061", "\u0053\u0061\u006E\u0062\u0061\u0074\u0061"], 
							weekday_names_short : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
							weekday_names_narrow : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
							month_names_long : ["\u0041\u006D\u0061\u006A\u006A\u0069\u0069", "\u0047\u0075\u0072\u0061\u0061\u006E\u0064\u0068\u0061\u006C\u0061", "\u0042\u0069\u0074\u006F\u006F\u0074\u0065\u0065\u0073\u0073\u0061", "\u0045\u006C\u0062\u0061", "\u0043\u0061\u0061\u006D\u0073\u0061", "\u0057\u0061\u0078\u0061\u0062\u0061\u006A\u006A\u0069\u0069", "\u0041\u0064\u006F\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0048\u0061\u0067\u0061\u0079\u0079\u0061", "\u0046\u0075\u0075\u006C\u0062\u0061\u006E\u0061", "\u004F\u006E\u006B\u006F\u006C\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0053\u0061\u0064\u0061\u0061\u0073\u0061", "\u004D\u0075\u0064\u0064\u0065\u0065"], 
							month_names_short : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
							month_names_narrow : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
							ampm : ["\u0057\u0044", "\u0057\u0042"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.om_et;
						break;
					case "om_ke":
						nexacro.Locale.om_ke = {
							name : "om_KE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004B\u0045\u0053\u0020", 
							currency_symbol : "\u004B\u0073\u0068", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0044\u0069\u006C\u0062\u0061\u0074\u0061", "\u0057\u0069\u0069\u0078\u0061\u0074\u0061", "\u0051\u0069\u0062\u0078\u0061\u0074\u0061", "\u0052\u006F\u006F\u0062\u0069\u0069", "\u004B\u0061\u006D\u0069\u0069\u0073\u0061", "\u004A\u0069\u006D\u0061\u0061\u0074\u0061", "\u0053\u0061\u006E\u0062\u0061\u0074\u0061"], 
							weekday_names_short : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
							weekday_names_narrow : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
							month_names_long : ["\u0041\u006D\u0061\u006A\u006A\u0069\u0069", "\u0047\u0075\u0072\u0061\u0061\u006E\u0064\u0068\u0061\u006C\u0061", "\u0042\u0069\u0074\u006F\u006F\u0074\u0065\u0065\u0073\u0073\u0061", "\u0045\u006C\u0062\u0061", "\u0043\u0061\u0061\u006D\u0073\u0061", "\u0057\u0061\u0078\u0061\u0062\u0061\u006A\u006A\u0069\u0069", "\u0041\u0064\u006F\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0048\u0061\u0067\u0061\u0079\u0079\u0061", "\u0046\u0075\u0075\u006C\u0062\u0061\u006E\u0061", "\u004F\u006E\u006B\u006F\u006C\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0053\u0061\u0064\u0061\u0061\u0073\u0061", "\u004D\u0075\u0064\u0064\u0065\u0065"], 
							month_names_short : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
							month_names_narrow : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
							ampm : ["\u0057\u0044", "\u0057\u0042"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.om_ke;
						break;
					case "or":
					case "or_in":
						nexacro.Locale.or = nexacro.Locale.or_in = {
							name : "or_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0B1F", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0B30\u0B2C\u0B3F\u0B2C\u0B3E\u0B30", "\u0B38\u0B4B\u0B2E\u0B2C\u0B3E\u0B30", "\u0B2E\u0B19\u0B4D\u0B17\u0B33\u0B2C\u0B3E\u0B30", "\u0B2C\u0B41\u0B27\u0B2C\u0B3E\u0B30", "\u0B17\u0B41\u0B30\u0B41\u0B2C\u0B3E\u0B30", "\u0B36\u0B41\u0B15\u0B4D\u0B30\u0B2C\u0B3E\u0B30", "\u0B36\u0B28\u0B3F\u0B2C\u0B3E\u0B30"], 
							weekday_names_short : ["\u0B30\u0B2C\u0B3F", "\u0B38\u0B4B\u0B2E", "\u0B2E\u0B19\u0B4D\u0B17\u0B33", "\u0B2C\u0B41\u0B27", "\u0B17\u0B41\u0B30\u0B41", "\u0B36\u0B41\u0B15\u0B4D\u0B30", "\u0B36\u0B28\u0B3F"], 
							weekday_names_narrow : ["\u0B30\u0B2C\u0B3F", "\u0B38\u0B4B\u0B2E", "\u0B2E\u0B19\u0B4D\u0B17\u0B33", "\u0B2C\u0B41\u0B27", "\u0B17\u0B41\u0B30\u0B41", "\u0B36\u0B41\u0B15\u0B4D\u0B30", "\u0B36\u0B28\u0B3F"], 
							month_names_long : ["\u0B1C\u0B3E\u0B28\u0B41\u0B06\u0B30\u0B40", "\u0B2B\u0B47\u0B2C\u0B43\u0B06\u0B30\u0B40", "\u0B2E\u0B3E\u0B30\u0B4D\u0B1A\u0B4D\u0B1A", "\u0B05\u0B2A\u0B4D\u0B30\u0B47\u0B32", "\u0B2E\u0B07", "\u0B1C\u0B41\u0B28", "\u0B1C\u0B41\u0B32\u0B3E\u0B07", "\u0B05\u0B17\u0B37\u0B4D\u0B1F", "\u0B38\u0B47\u0B2A\u0B4D\u0B1F\u0B47\u0B2E\u0B4D\u0B2C\u0B30", "\u0B05\u0B15\u0B4D\u0B1F\u0B4B\u0B2C\u0B30", "\u0B28\u0B2D\u0B47\u0B2E\u0B4D\u0B2C\u0B30", "\u0B21\u0B3F\u0B38\u0B47\u0B2E\u0B4D\u0B2C\u0B30"], 
							month_names_short : ["\u0031", "\u0033", "\u0034", "\u0035", "\u0036", "\u0037", "\u0038", "\u0039", "\u0031\u0030", "\u0031\u0030", "\u0031\u0031", "\u0031\u0032"], 
							month_names_narrow : ["\u0031", "\u0033", "\u0034", "\u0035", "\u0036", "\u0037", "\u0038", "\u0039", "\u0031\u0030", "\u0031\u0030", "\u0031\u0031", "\u0031\u0032"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u004F\u0064\u002D\u0025\u004F\u006D\u002D\u0025\u004F\u0079", 
							time_format : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
							time_format_ampm : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u0020\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.or_in;
						break;
					case "pa":
					case "pa_in":
						nexacro.Locale.pa = nexacro.Locale.pa_in = {
							name : "pa_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0A30\u0A41", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0A10\u0A24\u0A35\u0A3E\u0A30\u0020", "\u0A38\u0A4B\u0A2E\u0A35\u0A3E\u0A30\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0A35\u0A3E\u0A30\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0A35\u0A3E\u0A30\u0020", "\u0A35\u0A40\u0A30\u0A35\u0A3E\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0A35\u0A3E\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0A35\u0A3E\u0A30\u0020"], 
							weekday_names_short : ["\u0A10\u0A24\u0020", "\u0A38\u0A4B\u0A2E\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0020", "\u0A35\u0A40\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0020"], 
							weekday_names_narrow : ["\u0A10\u0A24\u0020", "\u0A38\u0A4B\u0A2E\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0020", "\u0A35\u0A40\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0020"], 
							month_names_long : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
							month_names_short : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
							month_names_narrow : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
							ampm : ["\u0A38\u0A35\u0A47\u0A30\u0A47", "\u0A36\u0A3E\u0A2E"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.pa_in;
						break;
					case "pa_pk":
						nexacro.Locale.pa_pk = {
							name : "pa_PK", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0050\u004B\u0052\u0020", 
							currency_symbol : "\u0052\u0073", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 2, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							weekday_names_short : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							weekday_names_narrow : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							month_names_long : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							month_names_narrow : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							ampm : ["\u0635", "\u0634"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0050\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0648\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u062A\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.pa_pk;
						break;
					case "pl":
					case "pl_pl":
						nexacro.Locale.pl = nexacro.Locale.pl_pl = {
							name : "pl_PL", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0050\u004C\u004E\u0020", 
							currency_symbol : "\u007A\u0142", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u006E\u0069\u0065\u0064\u007A\u0069\u0065\u006C\u0061", "\u0070\u006F\u006E\u0069\u0065\u0064\u007A\u0069\u0061\u0142\u0065\u006B", "\u0077\u0074\u006F\u0072\u0065\u006B", "\u015B\u0072\u006F\u0064\u0061", "\u0063\u007A\u0077\u0061\u0072\u0074\u0065\u006B", "\u0070\u0069\u0105\u0074\u0065\u006B", "\u0073\u006F\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u006E\u0069\u0065", "\u0070\u006F\u006E", "\u0077\u0074\u006F", "\u015B\u0072\u006F", "\u0063\u007A\u0077", "\u0070\u0069\u0105", "\u0073\u006F\u0062"], 
							weekday_names_narrow : ["\u006E\u0069\u0065", "\u0070\u006F\u006E", "\u0077\u0074\u006F", "\u015B\u0072\u006F", "\u0063\u007A\u0077", "\u0070\u0069\u0105", "\u0073\u006F\u0062"], 
							month_names_long : ["\u0073\u0074\u0079\u0063\u007A\u0065\u0144", "\u006C\u0075\u0074\u0079", "\u006D\u0061\u0072\u007A\u0065\u0063", "\u006B\u0077\u0069\u0065\u0063\u0069\u0065\u0144", "\u006D\u0061\u006A", "\u0063\u007A\u0065\u0072\u0077\u0069\u0065\u0063", "\u006C\u0069\u0070\u0069\u0065\u0063", "\u0073\u0069\u0065\u0072\u0070\u0069\u0065\u0144", "\u0077\u0072\u007A\u0065\u0073\u0069\u0065\u0144", "\u0070\u0061\u017A\u0064\u007A\u0069\u0065\u0072\u006E\u0069\u006B", "\u006C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0067\u0072\u0075\u0064\u007A\u0069\u0065\u0144"], 
							month_names_short : ["\u0073\u0074\u0079", "\u006C\u0075\u0074", "\u006D\u0061\u0072", "\u006B\u0077\u0069", "\u006D\u0061\u006A", "\u0063\u007A\u0065", "\u006C\u0069\u0070", "\u0073\u0069\u0065", "\u0077\u0072\u007A", "\u0070\u0061\u017A", "\u006C\u0069\u0073", "\u0067\u0072\u0075"], 
							month_names_narrow : ["\u0073\u0074\u0079", "\u006C\u0075\u0074", "\u006D\u0061\u0072", "\u006B\u0077\u0069", "\u006D\u0061\u006A", "\u0063\u007A\u0065", "\u006C\u0069\u0070", "\u0073\u0069\u0065", "\u0077\u0072\u007A", "\u0070\u0061\u017A", "\u006C\u0069\u0073", "\u0067\u0072\u0075"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.pl_pl;
						break;
					case "pt_br":
						nexacro.Locale.pt_br = {
							name : "pt_BR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0042\u0052\u004C\u0020", 
							currency_symbol : "\u0052\u0024", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u0073\u0065\u0067\u0075\u006E\u0064\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0074\u0065\u0072\u00E7\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0061\u0072\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0069\u006E\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u0065\u0078\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
							weekday_names_narrow : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
							month_names_long : ["\u006A\u0061\u006E\u0065\u0069\u0072\u006F", "\u0066\u0065\u0076\u0065\u0072\u0065\u0069\u0072\u006F", "\u006D\u0061\u0072\u00E7\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u006F", "\u006A\u0075\u006E\u0068\u006F", "\u006A\u0075\u006C\u0068\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u006F\u0075\u0074\u0075\u0062\u0072\u006F", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0064\u0065\u007A\u0065\u006D\u0062\u0072\u006F"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.pt_br;
						break;
					case "pt":
					case "pt_pt":
						nexacro.Locale.pt = nexacro.Locale.pt_pt = {
							name : "pt_PT", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u0073\u0065\u0067\u0075\u006E\u0064\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0074\u0065\u0072\u00E7\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0061\u0072\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0069\u006E\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u0065\u0078\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
							weekday_names_narrow : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
							month_names_long : ["\u004A\u0061\u006E\u0065\u0069\u0072\u006F", "\u0046\u0065\u0076\u0065\u0072\u0065\u0069\u0072\u006F", "\u004D\u0061\u0072\u00E7\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0069\u006F", "\u004A\u0075\u006E\u0068\u006F", "\u004A\u0075\u006C\u0068\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u004F\u0075\u0074\u0075\u0062\u0072\u006F", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0044\u0065\u007A\u0065\u006D\u0062\u0072\u006F"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0042\u0020\u0027\u0064\u0065\u0027\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.pt_pt;
						break;
					case "ro":
					case "ro_ro":
						nexacro.Locale.ro_ro = {
							name : "ro_RO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0052\u004F\u004E\u0020", 
							currency_symbol : "\u006C\u0065\u0069", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0075\u006D\u0069\u006E\u0069\u0063\u0103", "\u006C\u0075\u006E\u0069", "\u006D\u0061\u0072\u0163\u0069", "\u006D\u0069\u0065\u0072\u0063\u0075\u0072\u0069", "\u006A\u006F\u0069", "\u0076\u0069\u006E\u0065\u0072\u0069", "\u0073\u00E2\u006D\u0062\u0103\u0074\u0103"], 
							weekday_names_short : ["\u0044\u0075", "\u004C\u0075", "\u004D\u0061", "\u004D\u0069", "\u004A\u006F", "\u0056\u0069", "\u0053\u0062"], 
							weekday_names_narrow : ["\u0044\u0075", "\u004C\u0075", "\u004D\u0061", "\u004D\u0069", "\u004A\u006F", "\u0056\u0069", "\u0053\u0062"], 
							month_names_long : ["\u0069\u0061\u006E\u0075\u0061\u0072\u0069\u0065", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069\u0065", "\u006D\u0061\u0072\u0074\u0069\u0065", "\u0061\u0070\u0072\u0069\u006C\u0069\u0065", "\u006D\u0061\u0069", "\u0069\u0075\u006E\u0069\u0065", "\u0069\u0075\u006C\u0069\u0065", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0069\u0065", "\u006F\u0063\u0074\u006F\u006D\u0062\u0072\u0069\u0065", "\u006E\u006F\u0069\u0065\u006D\u0062\u0072\u0069\u0065", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0069\u0065"], 
							month_names_short : ["\u0069\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u0069\u0075\u006E", "\u0069\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u0069\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u0069\u0075\u006E", "\u0069\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u007A", 
							full_date_time_format : "\u0025\u0041\u0020\u0025\u002D\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u002C\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ro_ro;
						break;
					case "ru":
					case "ru_ru":
						nexacro.Locale.ru = nexacro.Locale.ru_ru = {
							name : "ru_RU", 
							decimal_point : "\u002C", 
							thousands_sep : "\u2002", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0052\u0055\u0042\u0020", 
							currency_symbol : "\u0440\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u2002", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 0, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"], 
							month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041\u0020\u0433\u002E", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ru_ru;
						break;
					case "ru_ua":
						nexacro.Locale.ru_ua = {
							name : "ru_UA", 
							decimal_point : "\u002C", 
							thousands_sep : "\u2002", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u0041\u0048\u0020", 
							currency_symbol : "\u0433\u0440", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u043E", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0443\u0431"], 
							weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u043E", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0443\u0431"], 
							month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"], 
							month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ru_ua;
						break;
					case "rw":
					case "rw_rw":
						nexacro.Locale.rw = nexacro.Locale.rw_rw = {
							name : "rw_RW", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [-1], 
							int_curr_symbol : "\u0052\u0057\u0046\u0020", 
							currency_symbol : "\u0046\u0072\u0077", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004B\u0075\u0020\u0063\u0079\u0075\u006D\u0077\u0065\u0072\u0075", "\u004B\u0075\u0077\u0061\u0020\u006D\u0062\u0065\u0072\u0065", "\u004B\u0075\u0077\u0061\u0020\u006B\u0061\u0062\u0069\u0072\u0069", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u0074\u0075", "\u004B\u0075\u0077\u0061\u0020\u006B\u0061\u006E\u0065", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u006E\u0075", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u006E\u0064\u0061\u0074\u0075"], 
							weekday_names_short : ["\u004D\u0077\u0065", "\u004D\u0062\u0065", "\u004B\u0061\u0062", "\u0047\u0074\u0075", "\u004B\u0061\u006E", "\u0047\u006E\u0075", "\u0047\u006E\u0064"], 
							weekday_names_narrow : ["\u004D\u0077\u0065", "\u004D\u0062\u0065", "\u004B\u0061\u0062", "\u0047\u0074\u0075", "\u004B\u0061\u006E", "\u0047\u006E\u0075", "\u0047\u006E\u0064"], 
							month_names_long : ["\u004D\u0075\u0074\u0061\u0072\u0061\u006D\u0061", "\u0047\u0061\u0073\u0068\u0079\u0061\u006E\u0074\u0061\u0072\u0065", "\u0057\u0065\u0072\u0075\u0072\u0077\u0065", "\u004D\u0061\u0074\u0061", "\u0047\u0069\u0063\u0075\u0072\u0061\u006E\u0073\u0069", "\u004B\u0061\u006D\u0065\u006E\u0061", "\u004E\u0079\u0061\u006B\u0061\u006E\u0067\u0061", "\u004B\u0061\u006E\u0061\u006D\u0061", "\u004E\u007A\u0065\u006C\u0069", "\u0055\u006B\u0077\u0061\u006B\u0069\u0072\u0061", "\u0055\u0067\u0075\u0073\u0068\u0079\u0069\u006E\u0067\u006F", "\u0055\u006B\u0075\u0062\u006F\u007A\u0061"], 
							month_names_short : ["\u004D\u0075\u0074", "\u0047\u0061\u0073", "\u0057\u0065\u0072", "\u004D\u0061\u0074", "\u0047\u0069\u0063", "\u004B\u0061\u006D", "\u004E\u0079\u0061", "\u004B\u0061\u006E", "\u004E\u007A\u0065", "\u0055\u006B\u0077", "\u0055\u0067\u0075", "\u0055\u006B\u0075"], 
							month_names_narrow : ["\u004D\u0075\u0074", "\u0047\u0061\u0073", "\u0057\u0065\u0072", "\u004D\u0061\u0074", "\u0047\u0069\u0063", "\u004B\u0061\u006D", "\u004E\u0079\u0061", "\u004B\u0061\u006E", "\u004E\u007A\u0065", "\u0055\u006B\u0077", "\u0055\u0067\u0075", "\u0055\u006B\u0075"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.rw_rw;
						break;
					case "se":
					case "se_no":
						nexacro.Locale.se = nexacro.Locale.se_no = {
							name : "se_NO", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u004E\u004F\u004B\u0020", 
							currency_symbol : "\u0020\u0072\u0075", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u0073\u006F\u0074\u006E\u0061\u0062\u0065\u0061\u0069\u0076\u0069", "\u0076\u0075\u006F\u0073\u0073\u00E1\u0072\u0067\u0061", "\u006D\u0061\u014B\u014B\u0065\u0062\u0061\u0072\u0067\u0061", "\u0067\u0061\u0073\u006B\u0061\u0076\u0061\u0068\u006B\u006B\u0075", "\u0064\u0075\u006F\u0072\u0061\u0073\u0064\u0061\u0074", "\u0062\u0065\u0061\u0072\u006A\u0061\u0064\u0061\u0074", "\u006C\u00E1\u0076\u0076\u0061\u0072\u0064\u0061\u0074"], 
							weekday_names_short : ["\u0073\u006F\u0074\u006E", "\u0076\u0075\u006F\u0073", "\u006D\u0061\u014B", "\u0067\u0061\u0073\u006B", "\u0064\u0075\u006F\u0072", "\u0062\u0065\u0061\u0072", "\u006C\u00E1\u0076"], 
							weekday_names_narrow : ["\u0073\u006F\u0074\u006E", "\u0076\u0075\u006F\u0073", "\u006D\u0061\u014B", "\u0067\u0061\u0073\u006B", "\u0064\u0075\u006F\u0072", "\u0062\u0065\u0061\u0072", "\u006C\u00E1\u0076"], 
							month_names_long : ["\u006F\u0111\u0111\u0061\u006A\u0061\u0067\u0065\u006D\u00E1\u006E\u0075", "\u0067\u0075\u006F\u0076\u0076\u0061\u006D\u00E1\u006E\u0075", "\u006E\u006A\u0075\u006B\u010D\u0061\u006D\u00E1\u006E\u0075", "\u0063\u0075\u006F\u014B\u006F\u006D\u00E1\u006E\u0075", "\u006D\u0069\u0065\u0073\u0073\u0065\u006D\u00E1\u006E\u0075", "\u0067\u0065\u0061\u0073\u0073\u0065\u006D\u00E1\u006E\u0075", "\u0073\u0075\u006F\u0069\u0064\u006E\u0065\u006D\u00E1\u006E\u0075", "\u0062\u006F\u0072\u0067\u0065\u006D\u00E1\u006E\u0075", "\u010D\u0061\u006B\u010D\u0061\u006D\u00E1\u006E\u0075", "\u0067\u006F\u006C\u0067\u0067\u006F\u0074\u006D\u00E1\u006E\u0075", "\u0073\u006B\u00E1\u0062\u006D\u0061\u006D\u00E1\u006E\u0075", "\u006A\u0075\u006F\u0076\u006C\u0061\u006D\u00E1\u006E\u0075"], 
							month_names_short : ["\u006F\u0111\u0111\u006A", "\u0067\u0075\u006F\u0076", "\u006E\u006A\u0075\u006B", "\u0063\u0075\u006F\u014B", "\u006D\u0069\u0065\u0073", "\u0067\u0065\u0061\u0073", "\u0073\u0075\u006F\u0069", "\u0062\u006F\u0072\u0067", "\u010D\u0061\u006B\u010D", "\u0067\u006F\u006C\u0067", "\u0073\u006B\u00E1\u0062", "\u006A\u0075\u006F\u0076"], 
							month_names_narrow : ["\u006F\u0111\u0111\u006A", "\u0067\u0075\u006F\u0076", "\u006E\u006A\u0075\u006B", "\u0063\u0075\u006F\u014B", "\u006D\u0069\u0065\u0073", "\u0067\u0065\u0061\u0073", "\u0073\u0075\u006F\u0069", "\u0062\u006F\u0072\u0067", "\u010D\u0061\u006B\u010D", "\u0067\u006F\u006C\u0067", "\u0073\u006B\u00E1\u0062", "\u006A\u0075\u006F\u0076"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0062\u0020\u0025\u0065\u002E\u0020\u0062\u002E\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002E\u0020\u0062\u002E\u0020\u0025\u0059\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.se_no;
						break;
					case "si":
					case "si_lk":
						nexacro.Locale.si = nexacro.Locale.si_lk = {
							name : "si_LK", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u004C\u004B\u0052\u0020", 
							currency_symbol : "\u20A8", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0D89\u0DBB\u0DD2\u0DAF\u0DCF", "\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF", "\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF", "\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF", "\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF", "\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF", "\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF"], 
							weekday_names_short : ["\u0D89", "\u0DC3", "\u0D85", "\u0DB6", "\u0DB6\u0DCA\u200D\u0DBB", "\u0DC3\u0DD2", "\u0DC3\u0DD9"], 
							weekday_names_narrow : ["\u0D89", "\u0DC3", "\u0D85", "\u0DB6", "\u0DB6\u0DCA\u200D\u0DBB", "\u0DC3\u0DD2", "\u0DC3\u0DD9"], 
							month_names_long : ["\u0DA2\u0DB1\u0DC0\u0DCF\u0DBB\u0DD2", "\u0DB4\u0DD9\u0DB6\u0DBB\u0DC0\u0DCF\u0DBD\u0DD2", "\u0DB8\u0DCF\u0DBB\u0DCA\u0DAD\u0DD4", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2\u0DBA\u0DD9\u0DBD\u0DCA", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD\u0DC3\u0DCA\u0DAD\u0DD4", "\u0DC3\u0DD0\u0DB4\u0DCA\u0DAD\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA", "\u0D94\u0D9A\u0DCA\u0DAD\u0DDD\u0DB6\u0DBB\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA", "\u0DAF\u0DD9\u0DC3\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA"], 
							month_names_short : ["\u0DA2\u0DB1", "\u0DB4\u0DD9\u0DB6", "\u0DB8\u0DCF\u0DBB\u0DCA", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD", "\u0DC3\u0DD0\u0DB4\u0DCA", "\u0D94\u0D9A\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0", "\u0DAF\u0DD9\u0DC3\u0DD0"], 
							month_names_narrow : ["\u0DA2\u0DB1", "\u0DB4\u0DD9\u0DB6", "\u0DB8\u0DCF\u0DBB\u0DCA", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD", "\u0DC3\u0DD0\u0DB4\u0DCA", "\u0D94\u0D9A\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0", "\u0DAF\u0DD9\u0DC3\u0DD0"], 
							ampm : ["\u0DB4\u0DD9\u002E\u0DC0\u002E", "\u0DB4\u002E\u0DC0\u002E"], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
							full_date_time_format : "\u0025\u0059\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u0DC0\u0DD0\u0DB1\u0DD2\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.si_lk;
						break;
					case "sk":
					case "sk_sk":
						nexacro.Locale.sk = nexacro.Locale.sk_sk = {
							name : "sk_SK", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0053\u004B\u004B\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004E\u0065\u0064\u0065\u013E\u0061", "\u0050\u006F\u006E\u0064\u0065\u006C\u006F\u006B", "\u0055\u0074\u006F\u0072\u006F\u006B", "\u0053\u0074\u0072\u0065\u0064\u0061", "\u0160\u0074\u0076\u0072\u0074\u006F\u006B", "\u0050\u0069\u0061\u0074\u006F\u006B", "\u0053\u006F\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u004E\u0065", "\u0050\u006F", "\u0055\u0074", "\u0053\u0074", "\u0160\u0074", "\u0050\u0069", "\u0053\u006F"], 
							weekday_names_narrow : ["\u004E\u0065", "\u0050\u006F", "\u0055\u0074", "\u0053\u0074", "\u0160\u0074", "\u0050\u0069", "\u0053\u006F"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u00E1\u0072", "\u0066\u0065\u0062\u0072\u0075\u00E1\u0072", "\u006D\u0061\u0072\u0065\u0063", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0025\u0061\u00A0\u0025\u0065\u002E\u00A0\u0025\u0042\u00A0\u0025\u0059\u002C\u00A0\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u00A0\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0020\u0025\u006E\u002E\u0020\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.sk_sk;
						break;
					case "sl":
					case "sl_si":
						nexacro.Locale.sl = nexacro.Locale.sl_si = {
							name : "sl_SI", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u006E\u0065\u0064\u0065\u006C\u006A\u0061", "\u0070\u006F\u006E\u0065\u0064\u0065\u006C\u006A\u0065\u006B", "\u0074\u006F\u0072\u0065\u006B", "\u0073\u0072\u0065\u0064\u0061", "\u010D\u0065\u0074\u0072\u0074\u0065\u006B", "\u0070\u0065\u0074\u0065\u006B", "\u0073\u006F\u0062\u006F\u0074\u0061"], 
							weekday_names_short : ["\u006E\u0065\u0064", "\u0070\u006F\u006E", "\u0074\u006F\u0072", "\u0073\u0072\u0065", "\u010D\u0065\u0074", "\u0070\u0065\u0074", "\u0073\u006F\u0062"], 
							weekday_names_narrow : ["\u006E\u0065\u0064", "\u0070\u006F\u006E", "\u0074\u006F\u0072", "\u0073\u0072\u0065", "\u010D\u0065\u0074", "\u0070\u0065\u0074", "\u0073\u006F\u0062"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0065\u0063", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069\u006A", "\u006A\u0075\u006C\u0069\u006A", "\u0061\u0076\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0076\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0076\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.sl_si;
						break;
					case "so_dj":
						nexacro.Locale.so_dj = {
							name : "so_DJ", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0044\u004A\u0046\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0061\u0078\u0061", "\u0069\u0073\u006E", "\u0073\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0068\u0061", "\u006A\u0069\u006D", "\u0073\u0061\u0062"], 
							weekday_names_narrow : ["\u0061\u0078\u0061", "\u0069\u0073\u006E", "\u0073\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0068\u0061", "\u006A\u0069\u006D", "\u0073\u0061\u0062"], 
							month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
							month_names_short : ["\u006B\u006F\u0062", "\u006C\u0061\u0062", "\u0073\u0061\u0064", "\u0061\u0066\u0072", "\u0073\u0068\u0061", "\u006C\u0069\u0078", "\u0074\u006F\u0064", "\u0073\u0069\u0064", "\u0073\u0061\u0067", "\u0074\u006F\u0062", "\u006B\u0069\u0074", "\u006C\u0069\u0074"], 
							month_names_narrow : ["\u006B\u006F\u0062", "\u006C\u0061\u0062", "\u0073\u0061\u0064", "\u0061\u0066\u0072", "\u0073\u0068\u0061", "\u006C\u0069\u0078", "\u0074\u006F\u0064", "\u0073\u0069\u0064", "\u0073\u0061\u0067", "\u0074\u006F\u0062", "\u006B\u0069\u0074", "\u006C\u0069\u0074"], 
							ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.so_dj;
						break;
					case "so_et":
						nexacro.Locale.so_et = {
							name : "so_ET", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0054\u0042\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
							month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.so_et;
						break;
					case "so_ke":
						nexacro.Locale.so_ke = {
							name : "so_KE", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0054\u0042\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
							month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.so_ke;
						break;
					case "so":
					case "so_so":
						nexacro.Locale.so = nexacro.Locale.so_so = {
							name : "so_SO", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0053\u004F\u0053\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
							weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
							month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
							ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.so_so;
						break;
					case "sq":
					case "sq_al":
						nexacro.Locale.sq = nexacro.Locale.sq_al = {
							name : "sq_AL", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3], 
							int_curr_symbol : "\u0041\u004C\u004C\u0020", 
							currency_symbol : "\u004C\u0065\u006B", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 3, 
							frac_digits : 3, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0065\u0020\u0064\u0069\u0065\u006C\u0020", "\u0065\u0020\u0068\u00EB\u006E\u00EB\u0020", "\u0065\u0020\u006D\u0061\u0072\u0074\u00EB\u0020", "\u0065\u0020\u006D\u00EB\u0072\u006B\u0075\u0072\u00EB\u0020", "\u0065\u0020\u0065\u006E\u006A\u0074\u0065\u0020", "\u0065\u0020\u0070\u0072\u0065\u006D\u0074\u0065\u0020", "\u0065\u0020\u0073\u0068\u0074\u0075\u006E\u00EB\u0020"], 
							weekday_names_short : ["\u0044\u0069\u0065\u0020", "\u0048\u00EB\u006E\u0020", "\u004D\u0061\u0072\u0020", "\u004D\u00EB\u0072\u0020", "\u0045\u006E\u006A\u0020", "\u0050\u0072\u0065\u0020", "\u0053\u0068\u0074\u0020"], 
							weekday_names_narrow : ["\u0044\u0069\u0065\u0020", "\u0048\u00EB\u006E\u0020", "\u004D\u0061\u0072\u0020", "\u004D\u00EB\u0072\u0020", "\u0045\u006E\u006A\u0020", "\u0050\u0072\u0065\u0020", "\u0053\u0068\u0074\u0020"], 
							month_names_long : ["\u006A\u0061\u006E\u0061\u0072", "\u0073\u0068\u006B\u0075\u0072\u0074", "\u006D\u0061\u0072\u0073", "\u0070\u0072\u0069\u006C\u006C", "\u006D\u0061\u006A", "\u0071\u0065\u0072\u0073\u0068\u006F\u0072", "\u006B\u006F\u0072\u0072\u0069\u006B", "\u0067\u0075\u0073\u0068\u0074", "\u0073\u0068\u0074\u0061\u0074\u006F\u0072", "\u0074\u0065\u0074\u006F\u0072", "\u006E\u00EB\u006E\u0074\u006F\u0072", "\u0064\u0068\u006A\u0065\u0074\u006F\u0072"], 
							month_names_short : ["\u004A\u0061\u006E", "\u0053\u0068\u006B", "\u004D\u0061\u0072", "\u0050\u0072\u0069", "\u004D\u0061\u006A", "\u0051\u0065\u0072", "\u004B\u006F\u0072", "\u0047\u0073\u0068", "\u0053\u0068\u0074", "\u0054\u0065\u0074", "\u004E\u00EB\u006E", "\u0044\u0068\u006A"], 
							month_names_narrow : ["\u004A\u0061\u006E", "\u0053\u0068\u006B", "\u004D\u0061\u0072", "\u0050\u0072\u0069", "\u004D\u0061\u006A", "\u0051\u0065\u0072", "\u004B\u006F\u0072", "\u0047\u0073\u0068", "\u0053\u0068\u0074", "\u0054\u0065\u0074", "\u004E\u00EB\u006E", "\u0044\u0068\u006A"], 
							ampm : ["\u0050\u0044", "\u004D\u0044"], 
							date_format : "\u0025\u0059\u002D\u0025\u0062\u002D\u0025\u0064", 
							time_format : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0059\u002D\u0025\u0062\u002D\u0025\u0064\u0020\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.sq_al;
						break;
					case "sr_me":
						nexacro.Locale.sr_me = {
							name : "sr_ME", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u043D\u0435\u0434\u0458\u0435\u0459\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A", "\u0443\u0442\u043E\u0440\u0430\u043A", "\u0441\u0440\u0438\u0458\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A", "\u043F\u0435\u0442\u0430\u043A", "\u0441\u0443\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0438", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
							weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0438", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
							month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440", "\u0444\u0435\u0431\u0440\u0443\u0430\u0440", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440", "\u043E\u043A\u0442\u043E\u0431\u0430\u0440", "\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440", "\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440"], 
							month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
							month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059\u002E", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0054", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u002c\u0020\u0025\u0065\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u002E\u0020\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u000A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.sr_me;
						break;
					case "sr":
					case "sr_rs":
						nexacro.Locale.sr = nexacro.Locale.sr_rs = {
							name : "sr_RS", 
							decimal_point : "\u002C", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0052\u0053\u0044\u0020", 
							currency_symbol : "\u0434\u0438\u043D", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u043D\u0435\u0434\u0435\u0459\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A", "\u0443\u0442\u043E\u0440\u0430\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A", "\u043F\u0435\u0442\u0430\u043A", "\u0441\u0443\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
							weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
							month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440", "\u0444\u0435\u0431\u0440\u0443\u0430\u0440", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440", "\u043E\u043A\u0442\u043E\u0431\u0430\u0440", "\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440", "\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440"], 
							month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
							month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059\u002E", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0054", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0065\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u002E\u0020\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u000A", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.sr_rs;
						break;
					case "ss":
					case "ss_za":
						nexacro.Locale.ss = nexacro.Locale.ss_za = {
							name : "ss_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004C\u0069\u0073\u006F\u006E\u0074\u0066\u006F", "\u0075\u004D\u0073\u006F\u006D\u0062\u0075\u006C\u0075\u006B\u006F", "\u004C\u0065\u0073\u0069\u0062\u0069\u006C\u0069", "\u004C\u0065\u0073\u0069\u0074\u0073\u0061\u0074\u0066\u0075", "\u004C\u0065\u0073\u0069\u006E\u0065", "\u004C\u0065\u0073\u0069\u0068\u006C\u0061\u006E\u0075", "\u0075\u004D\u0067\u0063\u0069\u0062\u0065\u006C\u006F"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0073\u006F", "\u0042\u0069\u006C", "\u0054\u0073\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u0067\u0063"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0073\u006F", "\u0042\u0069\u006C", "\u0054\u0073\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u0067\u0063"], 
							month_names_long : ["\u0042\u0068\u0069\u006D\u0062\u0069\u0064\u0076\u0077\u0061\u006E\u0065", "\u0069\u004E\u0064\u006C\u006F\u0076\u0061\u006E\u0065", "\u0069\u004E\u0064\u006C\u006F\u0076\u0075\u006C\u0065\u006E\u006B\u0068\u0075\u006C\u0075", "\u004D\u0061\u0062\u0061\u0073\u0061", "\u0049\u006E\u006B\u0068\u0077\u0065\u006E\u006B\u0068\u0077\u0065\u0074\u0069", "\u0069\u004E\u0068\u006C\u0061\u0062\u0061", "\u004B\u0068\u006F\u006C\u0077\u0061\u006E\u0065", "\u0069\u004E\u0067\u0063\u0069", "\u0069\u004E\u0079\u006F\u006E\u0069", "\u0049\u006D\u0070\u0061\u006C\u0061", "\u004C\u0077\u0065\u0074\u0069", "\u0069\u004E\u0067\u006F\u006E\u0067\u006F\u006E\u0069"], 
							month_names_short : ["\u0042\u0068\u0069", "\u0056\u0061\u006E", "\u0056\u0075\u006C", "\u004D\u0061\u0062", "\u004B\u0068\u006B", "\u004E\u0068\u006C", "\u004B\u0068\u006F", "\u004E\u0067\u0063", "\u004E\u0079\u006F", "\u0049\u006D\u0070", "\u004C\u0077\u0065", "\u004E\u0067\u006F"], 
							month_names_narrow : ["\u0042\u0068\u0069", "\u0056\u0061\u006E", "\u0056\u0075\u006C", "\u004D\u0061\u0062", "\u004B\u0068\u006B", "\u004E\u0068\u006C", "\u004B\u0068\u006F", "\u004E\u0067\u0063", "\u004E\u0079\u006F", "\u0049\u006D\u0070", "\u004C\u0077\u0065", "\u004E\u0067\u006F"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ss_za;
						break;
					case "st":
					case "st_za":
						nexacro.Locale.st = nexacro.Locale.st_za = {
							name : "st_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u0074\u0061\u0068\u0061", "\u004D\u0061\u006E\u0074\u0061\u0068\u0061", "\u004C\u0061\u0062\u006F\u0062\u0065\u0064\u0069", "\u004C\u0061\u0062\u006F\u0072\u0061\u0072\u006F", "\u004C\u0061\u0062\u006F\u006E\u0065", "\u004C\u0061\u0062\u006F\u0068\u006C\u0061\u006E\u006F", "\u004D\u006F\u0071\u0065\u0062\u0065\u006C\u006F"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006D\u0061", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u006F\u0071"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006D\u0061", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u006F\u0071"], 
							month_names_long : ["\u0050\u0068\u0065\u0072\u0065\u006B\u0067\u006F\u006E\u0067", "\u0048\u006C\u0061\u006B\u006F\u006C\u0061", "\u0054\u006C\u0068\u0061\u006B\u0075\u0062\u0065\u006C\u0065", "\u004D\u006D\u0065\u0073\u0065", "\u004D\u006F\u0074\u0073\u0068\u0065\u0061\u006E\u006F\u006E\u0067", "\u0050\u0068\u0075\u0070\u006A\u0061\u006E\u0065", "\u0050\u0068\u0075\u0070\u0075", "\u0050\u0068\u0061\u0074\u006F", "\u004C\u0065\u006F\u0074\u0073\u0065", "\u004D\u0070\u0068\u0061\u006C\u0061\u006E\u0065", "\u0050\u0075\u0064\u0075\u006E\u0067\u0077\u0061\u006E\u0061", "\u0054\u0073\u0068\u0069\u0074\u0077\u0065"], 
							month_names_short : ["\u0050\u0068\u0065", "\u0048\u006C\u0061", "\u0054\u006C\u0048", "\u004D\u006D\u0065", "\u004D\u006F\u0074", "\u004A\u0061\u006E", "\u0055\u0070\u0075", "\u0050\u0068\u0061", "\u004C\u0065\u006F", "\u004D\u0070\u0068", "\u0050\u0075\u0064", "\u0054\u0073\u0068"], 
							month_names_narrow : ["\u0050\u0068\u0065", "\u0048\u006C\u0061", "\u0054\u006C\u0048", "\u004D\u006D\u0065", "\u004D\u006F\u0074", "\u004A\u0061\u006E", "\u0055\u0070\u0075", "\u0050\u0068\u0061", "\u004C\u0065\u006F", "\u004D\u0070\u0068", "\u0050\u0075\u0064", "\u0054\u0073\u0068"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.st_za;
						break;
					case "sv_fi":
						nexacro.Locale.sv_fi = {
							name : "sv_FI", 
							decimal_point : "\u002C", 
							thousands_sep : "\u00A0", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u00A0", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 2, 
							n_cs_precedes : 0, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0073\u00F6\u006E\u0064\u0061\u0067", "\u006D\u00E5\u006E\u0064\u0061\u0067", "\u0074\u0069\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F6\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
							weekday_names_narrow : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 1, 
							longdate_format : "\u0027\u0064\u0065\u006E\u0027\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.sv_fi;
						break;
					case "sv":
					case "sv_se":
						nexacro.Locale.sv = nexacro.Locale.sv_se = {
							name : "sv_SE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0053\u0045\u004B\u0020", 
							currency_symbol : "\u006B\u0072", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0073\u00F6\u006E\u0064\u0061\u0067", "\u006D\u00E5\u006E\u0064\u0061\u0067", "\u0074\u0069\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F6\u0072\u0064\u0061\u0067"], 
							weekday_names_short : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
							weekday_names_narrow : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
							month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
							month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 1, 
							longdate_format : "\u0027\u0064\u0065\u0027\u006E\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
							direction : "ltr"
						};
						return nexacro.Locale.sv_se;
						break;
					case "ta":
					case "ta_in":
						nexacro.Locale.ta = nexacro.Locale.ta_in = {
							name : "ta_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0BB0\u0BC2", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1", "\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD", "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD", "\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD", "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD", "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF", "\u0B9A\u0BA9\u0BBF"], 
							weekday_names_short : ["\u0B9E\u0BBE", "\u0BA4\u0BBF", "\u0B9A\u0BC6", "\u0BAA\u0BC1", "\u0BB5\u0BBF", "\u0BB5\u0BC6", "\u0B9A"], 
							weekday_names_narrow : ["\u0B9E\u0BBE", "\u0BA4\u0BBF", "\u0B9A\u0BC6", "\u0BAA\u0BC1", "\u0BB5\u0BBF", "\u0BB5\u0BC6", "\u0B9A"], 
							month_names_long : ["\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF", "\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF", "\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD", "\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD", "\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD", "\u0B85\u0B95\u0BCD\u0B9F\u0BCB\u0BAA\u0BB0\u0BCD", "\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD", "\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD"], 
							month_names_short : ["\u0B9C\u0BA9", "\u0BAA\u0BBF\u0BAA\u0BCD", "\u0BAE\u0BBE\u0BB0\u0BCD", "\u0B8F\u0BAA\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95", "\u0B9A\u0BC6\u0BAA\u0BCD", "\u0B85\u0B95\u0BCD", "\u0BA8\u0BB5", "\u0B9F\u0BBF\u0B9A"], 
							month_names_narrow : ["\u0B9C\u0BA9", "\u0BAA\u0BBF\u0BAA\u0BCD", "\u0BAE\u0BBE\u0BB0\u0BCD", "\u0B8F\u0BAA\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95", "\u0B9A\u0BC6\u0BAA\u0BCD", "\u0B85\u0B95\u0BCD", "\u0BA8\u0BB5", "\u0B9F\u0BBF\u0B9A"], 
							ampm : ["\u0B95\u0BBE\u0BB2\u0BC8", "\u0BAE\u0BBE\u0BB2\u0BC8"], 
							date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.ta_in;
						break;
					case "te":
					case "te_in":
						nexacro.Locale.te = nexacro.Locale.te_in = {
							name : "te_IN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 2], 
							int_curr_symbol : "\u0049\u004E\u0052\u0020", 
							currency_symbol : "\u0C30\u0C42", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 2], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 2, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 4, 
							weekday_names_long : ["\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02", "\u0C38\u0C4b\u0C2E\u0C35\u0C3E\u0C30\u0C02", "\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02", "\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02", "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02", "\u0C36\u0C41\u0C15\u0C4d\u0C30\u0C35\u0C3E\u0C30\u0C02", "\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02"], 
							weekday_names_short : ["\u0C06\u0C26\u0C3F", "\u0C38\u0C4b\u0C2E", "\u0C2E\u0C02\u0C17\u0C33", "\u0C2C\u0C41\u0C27", "\u0C17\u0C41\u0C30\u0C41", "\u0C36\u0C41\u0C15\u0C4D\u0C30", "\u0C36\u0C28\u0C3F"], 
							weekday_names_narrow : ["\u0C06\u0C26\u0C3F", "\u0C38\u0C4b\u0C2E", "\u0C2E\u0C02\u0C17\u0C33", "\u0C2C\u0C41\u0C27", "\u0C17\u0C41\u0C30\u0C41", "\u0C36\u0C41\u0C15\u0C4D\u0C30", "\u0C36\u0C28\u0C3F"], 
							month_names_long : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
							month_names_short : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2a\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
							month_names_narrow : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2a\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
							ampm : ["\u0C09\u002E", "\u0C38\u0C3E\u002E"], 
							date_format : "\u0025\u0042\u0020\u0025\u0064\u0020\u0025\u0041\u0020\u0025\u0059", 
							time_format : "\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
							date_time_format : "\u0025\u0042\u0020\u0025\u0064\u0020\u0025\u0041\u0020\u0025\u0059\u0020\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
							direction : "ltr"
						};
						return nexacro.Locale.te_in;
						break;
					case "tg":
					case "tg_tj":
						nexacro.Locale.tg = nexacro.Locale.tg_tj = {
							name : "tg_TJ", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0054\u004A\u0053\u0020", 
							currency_symbol : "\u0440\u0443\u0431", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044F", "\u0424\u0435\u0432\u0440\u0430\u043B\u044F", "\u041C\u0430\u0440\u0442\u0430", "\u0410\u043F\u0440\u0435\u043B\u044F", "\u041C\u0430\u044F", "\u0418\u044E\u043D\u044F", "\u0418\u044E\u043B\u044F", "\u0410\u0432\u0433\u0443\u0441\u0442\u0430", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u041E\u043A\u0442\u044F\u0431\u0440\u044F", "\u041D\u043E\u044F\u0431\u0440\u044F", "\u0414\u0435\u043A\u0430\u0431\u0440\u044F"], 
							month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.tg_tj;
						break;
					case "th":
					case "th_th":
						nexacro.Locale.th = nexacro.Locale.th_th = {
							name : "th_TH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0054\u0048\u0042\u0020", 
							currency_symbol : "\u0E3F", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							mon_n_sign_posn : 1, 
							weekday_names_long : ["\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C", "\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C", "\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23", "\u0E1E\u0E38\u0E18", "\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35", "\u0E28\u0E38\u0E01\u0E23\u0E4C", "\u0E40\u0E2A\u0E32\u0E23\u0E4C"], 
							weekday_names_short : ["\u0E2D\u0E32\u002E", "\u0E08\u002E", "\u0E2D\u002E", "\u0E1E\u002E", "\u0E1E\u0E24\u002E", "\u0E28\u002E", "\u0E2A\u002E"], 
							weekday_names_narrow : ["\u0E2D\u0E32\u002E", "\u0E08\u002E", "\u0E2D\u002E", "\u0E1E\u002E", "\u0E1E\u0E24\u002E", "\u0E28\u002E", "\u0E2A\u002E"], 
							month_names_long : ["\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21", "\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C", "\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21", "\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19", "\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21", "\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19", "\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21", "\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21", "\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19", "\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21", "\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19", "\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21"], 
							month_names_short : ["\u0E21\u002E\u0E04\u002E", "\u0E01\u002E\u0E1E\u002E", "\u0E21\u0E35\u002E\u0E04\u002E", "\u0E40\u0E21\u002E\u0E22\u002E", "\u0E1E\u002E\u0E04\u002E", "\u0E21\u0E34\u002E\u0E22\u002E", "\u0E01\u002E\u0E04\u002E", "\u0E2A\u002E\u0E04\u002E", "\u0E01\u002E\u0E22\u002E", "\u0E15\u002E\u0E04\u002E", "\u0E1E\u002E\u0E22\u002E", "\u0E18\u002E\u0E04\u002E"], 
							month_names_narrow : ["\u0E21\u002E\u0E04\u002E", "\u0E01\u002E\u0E1E\u002E", "\u0E21\u0E35\u002E\u0E04\u002E", "\u0E40\u0E21\u002E\u0E22\u002E", "\u0E1E\u002E\u0E04\u002E", "\u0E21\u0E34\u002E\u0E22\u002E", "\u0E01\u002E\u0E04\u002E", "\u0E2A\u002E\u0E04\u002E", "\u0E01\u002E\u0E22\u002E", "\u0E15\u002E\u0E04\u002E", "\u0E1E\u002E\u0E22\u002E", "\u0E18\u002E\u0E04\u002E"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "%d\u002F%m\u002F%Ey", 
							time_format : "%H\u003A%M\u003A%S", 
							time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
							date_time_format : "%a\u0020%e\u0020%b\u0020%Ey\u002C\u0020%H\u003A%M\u003A%S", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.th_th;
						break;
					case "ti_er":
						nexacro.Locale.ti_er = {
							name : "ti_ER", 
							decimal_point : "\u002E", 
							thousands_sep : "", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0052\u004E\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 0, 
							frac_digits : 0, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u1230\u1295\u1260\u1275", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							weekday_names_short : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							weekday_names_narrow : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							month_names_long : ["\u1325\u122A", "\u1208\u12AB\u1272\u1275", "\u1218\u130B\u1262\u1275", "\u121A\u12EB\u12DD\u12EB", "\u130D\u1295\u1266\u1275", "\u1230\u1290", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8\u1228\u121D", "\u1325\u1245\u121D\u1272", "\u1215\u12F3\u122D", "\u1273\u1215\u1233\u1235"], 
							month_names_short : ["\u1325\u122A\u0020", "\u1208\u12AB\u1272", "\u1218\u130B\u1262", "\u121A\u12EB\u12DD", "\u130D\u1295\u1266", "\u1230\u1290\u0020", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8", "\u1325\u1245\u121D", "\u1215\u12F3\u122D", "\u1273\u1215\u1233"], 
							month_names_narrow : ["\u1325\u122A\u0020", "\u1208\u12AB\u1272", "\u1218\u130B\u1262", "\u121A\u12EB\u12DD", "\u130D\u1295\u1266", "\u1230\u1290\u0020", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8", "\u1325\u1245\u121D", "\u1215\u12F3\u122D", "\u1273\u1215\u1233"], 
							ampm : ["\u1295\u1309\u1206> <U1230\u12D3\u1270", "\u12F5\u1215\u122D> <U1230\u12D3\u1275"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u1361\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u1361\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059\u0020\u12D3\u002F\u121D", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ti_er;
						break;
					case "ti":
					case "ti_et":
						nexacro.Locale.ti = nexacro.Locale.ti_et = {
							name : "ti_ET", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0045\u0054\u0042\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u1230\u1295\u1260\u1275", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							weekday_names_short : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							weekday_names_narrow : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
							month_names_long : ["\u1303\u1295\u12E9\u12C8\u122A", "\u134C\u1265\u1229\u12C8\u122A", "\u121B\u122D\u127D", "\u12A4\u1355\u1228\u120D", "\u121C\u12ED", "\u1301\u1295", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235\u1275", "\u1234\u1355\u1274\u121D\u1260\u122D", "\u12A6\u12AD\u1270\u12CD\u1260\u122D", "\u1296\u126C\u121D\u1260\u122D", "\u12F2\u1234\u121D\u1260\u122D"], 
							month_names_short : ["\u1303\u1295\u12E9", "\u134C\u1265\u1229", "\u121B\u122D\u127D", "\u12A4\u1355\u1228", "\u121C\u12ED\u0020", "\u1301\u1295\u0020", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235", "\u1234\u1355\u1274", "\u12A6\u12AD\u1270", "\u1296\u126C\u121D", "\u12F2\u1234\u121D"], 
							month_names_narrow : ["\u1303\u1295\u12E9", "\u134C\u1265\u1229", "\u121B\u122D\u127D", "\u12A4\u1355\u1228", "\u121C\u12ED\u0020", "\u1301\u1295\u0020", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235", "\u1234\u1355\u1274", "\u12A6\u12AD\u1270", "\u1296\u126C\u121D", "\u12F2\u1234\u121D"], 
							ampm : ["\u1295\u1309\u1206> <U1230\u12D3\u1270", "\u12F5\u1215\u122D> <U1230\u12D3\u1275"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u1363\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u1363\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059\u0020\u12D3\u002F\u121D", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ti_et;
						break;
					case "tl":
					case "tl_ph":
						nexacro.Locale.tl = nexacro.Locale.tl_ph = {
							name : "tl_PH", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0050\u0048\u0050\u0020", 
							currency_symbol : "\u0050\u0068\u0050", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u004C\u0069\u006E\u0067\u0067\u006F", "\u004C\u0075\u006E\u0065\u0073", "\u004D\u0061\u0072\u0074\u0065\u0073", "\u004D\u0069\u0079\u0065\u0072\u006B\u006F\u006C\u0065\u0073", "\u0048\u0075\u0077\u0065\u0062\u0065\u0073", "\u0042\u0069\u0079\u0065\u0072\u006E\u0065\u0073", "\u0053\u0061\u0062\u0061\u0064\u006F"], 
							weekday_names_short : ["\u004C\u0069\u006E", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u0069\u0079", "\u0048\u0075\u0077", "\u0042\u0069\u0079", "\u0053\u0061\u0062"], 
							weekday_names_narrow : ["\u004C\u0069\u006E", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u0069\u0079", "\u0048\u0075\u0077", "\u0042\u0069\u0079", "\u0053\u0061\u0062"], 
							month_names_long : ["\u0045\u006E\u0065\u0072\u006F", "\u0050\u0065\u0062\u0072\u0065\u0072\u006F", "\u004D\u0061\u0072\u0073\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0079\u006F", "\u0048\u0075\u006E\u0079\u006F", "\u0048\u0075\u006C\u0079\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0070\u0074\u0069\u0079\u0065\u006D\u0062\u0072\u0065", "\u004F\u006B\u0074\u0075\u0062\u0072\u0065", "\u004E\u006F\u0062\u0069\u0079\u0065\u006D\u0062\u0072\u0065", "\u0044\u0069\u0073\u0079\u0065\u006D\u0062\u0072\u0065"], 
							month_names_short : ["\u0045\u006E\u0065", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0079", "\u0048\u0075\u006E", "\u0048\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0062", "\u0044\u0069\u0073"], 
							month_names_narrow : ["\u0045\u006E\u0065", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0079", "\u0048\u0075\u006E", "\u0048\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0062", "\u0044\u0069\u0073"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0079", 
							time_format : "\u0025\u0072", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.tl_ph;
						break;
					case "tn":
					case "tn_za":
						nexacro.Locale.tn = nexacro.Locale.tn_za = {
							name : "tn_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u006C\u0061\u0054\u0073\u0068\u0069\u0070\u0069", "\u004D\u006F\u0073\u0075\u0070\u006F\u006C\u006F\u0067\u006F", "\u004C\u0061\u0062\u006F\u0062\u0065\u0064\u0069", "\u004C\u0061\u0062\u006F\u0072\u0061\u0072\u006F", "\u004C\u0061\u0062\u006F\u006E\u0065", "\u004C\u0061\u0062\u006F\u0074\u006C\u0068\u0061\u006E\u006F", "\u004C\u0061\u006D\u0061\u0074\u006C\u0068\u0061\u0074\u0073\u006F"], 
							weekday_names_short : ["\u0054\u0073\u0068", "\u004D\u006F\u0073", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0061\u0074"], 
							weekday_names_narrow : ["\u0054\u0073\u0068", "\u004D\u006F\u0073", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0061\u0074"], 
							month_names_long : ["\u0046\u0065\u0072\u0069\u006B\u0067\u006F\u006E\u0067", "\u0054\u006C\u0068\u0061\u006B\u006F\u006C\u0065", "\u004D\u006F\u0070\u0069\u0074\u006C\u0077\u0065", "\u004D\u006F\u0072\u0061\u006E\u0061\u006E\u0067", "\u004D\u006F\u0074\u0073\u0068\u0065\u0067\u0061\u006E\u006F\u006E\u0067", "\u0053\u0065\u0065\u0074\u0065\u0062\u006F\u0073\u0069\u0067\u006F", "\u0050\u0068\u0075\u006B\u0077\u0069", "\u0050\u0068\u0061\u0074\u0077\u0065", "\u004C\u0077\u0065\u0074\u0073\u0065", "\u0044\u0069\u0070\u0068\u0061\u006C\u0061\u006E\u0065", "\u004E\u0067\u0077\u0061\u006E\u0061\u0074\u0073\u0065\u006C\u0065", "\u0053\u0065\u0064\u0069\u006D\u006F\u006E\u0074\u0068\u006F\u006C\u0065"], 
							month_names_short : ["\u0046\u0065\u0072", "\u0054\u006C\u0068", "\u004D\u006F\u0070", "\u004D\u006F\u0072", "\u004D\u006F\u0074", "\u0053\u0065\u0065", "\u0050\u0068\u0075", "\u0050\u0068\u0061", "\u004C\u0077\u0065", "\u0044\u0069\u0070", "\u004E\u0067\u0077", "\u0053\u0065\u0064"], 
							month_names_narrow : ["\u0046\u0065\u0072", "\u0054\u006C\u0068", "\u004D\u006F\u0070", "\u004D\u006F\u0072", "\u004D\u006F\u0074", "\u0053\u0065\u0065", "\u0050\u0068\u0075", "\u0050\u0068\u0061", "\u004C\u0077\u0065", "\u0044\u0069\u0070", "\u004E\u0067\u0077", "\u0053\u0065\u0064"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.tn_za;
						break;
					case "tr_cy":
						nexacro.Locale.tr_cy = {
							name : "tr_CY", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0054\u0052\u0059\u0020", 
							currency_symbol : "\u0059\u0054\u004C", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0050\u0061\u007A\u0061\u0072", "\u0050\u0061\u007A\u0061\u0072\u0074\u0065\u0073\u0069", "\u0053\u0061\u006C\u0131", "\u00C7\u0061\u0072\u015F\u0061\u006D\u0062\u0061", "\u0050\u0065\u0072\u015F\u0065\u006D\u0062\u0065", "\u0043\u0075\u006D\u0061", "\u0043\u0075\u006D\u0061\u0072\u0074\u0065\u0073\u0069"], 
							weekday_names_short : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
							weekday_names_narrow : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
							month_names_long : ["\u004F\u0063\u0061\u006B", "\u015E\u0075\u0062\u0061\u0074", "\u004D\u0061\u0072\u0074", "\u004E\u0069\u0073\u0061\u006E", "\u004D\u0061\u0079\u0131\u0073", "\u0048\u0061\u007A\u0069\u0072\u0061\u006E", "\u0054\u0065\u006D\u006D\u0075\u007A", "\u0041\u011F\u0075\u0073\u0074\u006F\u0073", "\u0045\u0079\u006C\u00FC\u006C", "\u0045\u006B\u0069\u006D", "\u004B\u0061\u0073\u0131\u006D", "\u0041\u0072\u0061\u006C\u0131\u006B"], 
							month_names_short : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
							month_names_narrow : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
							ampm : ["\u00D6\u00D6", "\u00D6\u0053"], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.tr_cy;
						break;
					case "tr":
					case "tr_tr":
						nexacro.Locale.tr = nexacro.Locale.tr_tr = {
							name : "tr_TR", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0054\u0052\u0059\u0020", 
							currency_symbol : "\u0054\u004C", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0050\u0061\u007A\u0061\u0072", "\u0050\u0061\u007A\u0061\u0072\u0074\u0065\u0073\u0069", "\u0053\u0061\u006C\u0131", "\u00C7\u0061\u0072\u015F\u0061\u006D\u0062\u0061", "\u0050\u0065\u0072\u015F\u0065\u006D\u0062\u0065", "\u0043\u0075\u006D\u0061", "\u0043\u0075\u006D\u0061\u0072\u0074\u0065\u0073\u0069"], 
							weekday_names_short : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
							weekday_names_narrow : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
							month_names_long : ["\u004F\u0063\u0061\u006B", "\u015E\u0075\u0062\u0061\u0074", "\u004D\u0061\u0072\u0074", "\u004E\u0069\u0073\u0061\u006E", "\u004D\u0061\u0079\u0131\u0073", "\u0048\u0061\u007A\u0069\u0072\u0061\u006E", "\u0054\u0065\u006D\u006D\u0075\u007A", "\u0041\u011F\u0075\u0073\u0074\u006F\u0073", "\u0045\u0079\u006C\u00FC\u006C", "\u0045\u006B\u0069\u006D", "\u004B\u0061\u0073\u0131\u006D", "\u0041\u0072\u0061\u006C\u0131\u006B"], 
							month_names_short : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
							month_names_narrow : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
							ampm : ["\u00D6\u00D6", "\u00D6\u0053"], 
							date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.tr_tr;
						break;
					case "ts":
					case "ts_za":
						nexacro.Locale.ts = nexacro.Locale.ts_za = {
							name : "ts_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u006F\u006E\u0074\u006F", "\u004D\u0075\u0073\u0075\u006D\u0062\u0068\u0075\u006E\u0075\u006B\u0075", "\u0052\u0061\u0076\u0075\u006D\u0062\u0069\u0072\u0068\u0069", "\u0052\u0061\u0076\u0075\u006E\u0068\u0061\u0072\u0068\u0075", "\u0052\u0061\u0076\u0075\u006D\u0075\u006E\u0065", "\u0052\u0061\u0076\u0075\u006E\u0074\u006C\u0068\u0061\u006E\u0075", "\u004D\u0075\u0067\u0071\u0069\u0076\u0065\u006C\u0061"], 
							weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0075\u0073", "\u0042\u0069\u0072", "\u0048\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0075\u0067"], 
							weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0075\u0073", "\u0042\u0069\u0072", "\u0048\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0075\u0067"], 
							month_names_long : ["\u0053\u0075\u006E\u0067\u0075\u0074\u0069", "\u004E\u0079\u0065\u006E\u0079\u0065\u006E\u0079\u0061\u006E\u0069", "\u004E\u0079\u0065\u006E\u0079\u0061\u006E\u006B\u0075\u006C\u0075", "\u0044\u007A\u0069\u0076\u0061\u006D\u0069\u0073\u006F\u006B\u006F", "\u004D\u0075\u0064\u0079\u0061\u0078\u0069\u0068\u0069", "\u004B\u0068\u006F\u0074\u0061\u0076\u0075\u0078\u0069\u006B\u0061", "\u004D\u0061\u0077\u0075\u0077\u0061\u006E\u0069", "\u004D\u0068\u0061\u0077\u0075\u0072\u0069", "\u004E\u0064\u007A\u0068\u0061\u0074\u0069", "\u004E\u0068\u006C\u0061\u006E\u0067\u0075\u006C\u0061", "\u0048\u0075\u006B\u0075\u0072\u0069", "\u004E\u0027\u0077\u0065\u006E\u0064\u007A\u0061\u006D\u0068\u0061\u006C\u0061"], 
							month_names_short : ["\u0053\u0075\u006E", "\u0059\u0061\u006E", "\u004B\u0075\u006C", "\u0044\u007A\u0069", "\u004D\u0075\u0064", "\u004B\u0068\u006F", "\u004D\u0061\u0077", "\u004D\u0068\u0061", "\u004E\u0064\u007A", "\u004E\u0068\u006C", "\u0048\u0075\u006B", "\u004E\u0027\u0077"], 
							month_names_narrow : ["\u0053\u0075\u006E", "\u0059\u0061\u006E", "\u004B\u0075\u006C", "\u0044\u007A\u0069", "\u004D\u0075\u0064", "\u004B\u0068\u006F", "\u004D\u0061\u0077", "\u004D\u0068\u0061", "\u004E\u0064\u007A", "\u004E\u0068\u006C", "\u0048\u0075\u006B", "\u004E\u0027\u0077"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ts_za;
						break;
					case "tt":
					case "tt_ru":
						nexacro.Locale.tt = nexacro.Locale.tt_ru = {
							name : "tt_RU", 
							decimal_point : "\u002C", 
							thousands_sep : "\u2002", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0052\u0055\u0042\u0020", 
							currency_symbol : "\u0440\u002E", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u042F\u043A\u0448\u04D9\u043C\u0431\u0435", "\u0414\u044B\u0448\u04D9\u043C\u0431\u0435", "\u0421\u0438\u0448\u04D9\u043C\u0431\u0435", "\u0427\u04D9\u0440\u0448\u04D9\u04D9\u043C\u0431\u0435", "\u041F\u04D9\u043D\u0497\u0435\u0448\u043C\u0431\u0435", "\u0496\u043E\u043C\u0433\u0430", "\u0428\u0438\u043C\u0431\u04D9"], 
							weekday_names_short : ["\u042F\u043A\u0448", "\u0414\u044B\u0448", "\u0421\u0438\u0448", "\u0427\u04D9\u0440\u0448", "\u041F\u04D9\u043D\u0497", "\u0496\u043E\u043C", "\u0428\u0438\u043C"], 
							weekday_names_narrow : ["\u042F\u043A\u0448", "\u0414\u044B\u0448", "\u0421\u0438\u0448", "\u0427\u04D9\u0440\u0448", "\u041F\u04D9\u043D\u0497", "\u0496\u043E\u043C", "\u0428\u0438\u043C"], 
							month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044F", "\u0424\u0435\u0432\u0440\u0430\u043B\u044F", "\u041C\u0430\u0440\u0442\u0430", "\u0410\u043F\u0440\u0435\u043B\u044F", "\u041C\u0430\u044F", "\u0418\u044E\u043D\u044F", "\u0418\u044E\u043B\u044F", "\u0410\u0432\u0433\u0443\u0441\u0442\u0430", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u041E\u043A\u0442\u044F\u0431\u0440\u044F", "\u041D\u043E\u044F\u0431\u0440\u044F", "\u0414\u0435\u043A\u0430\u0431\u0440\u044F"], 
							month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.tt_ru;
						break;
					case "uk":
					case "uk_ua":
						nexacro.Locale.uk = nexacro.Locale.uk_ua = {
							name : "uk_UA", 
							decimal_point : "\u002C", 
							thousands_sep : "\u0020", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u0041\u0048\u0020", 
							currency_symbol : "\u20B4", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u0020", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 0, 
							n_cs_precedes : 0, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u041D\u0435\u0434\u0456\u043B\u044F", "\u041F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A", "\u0412\u0456\u0432\u0442\u043E\u0440\u043E\u043A", "\u0421\u0435\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440", "\u041F\u0027\u044F\u0442\u043D\u0438\u0446\u044F", "\u0421\u0443\u0431\u043E\u0442\u0430"], 
							weekday_names_short : ["\u041D\u0434\u043B", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							weekday_names_narrow : ["\u041D\u0434\u043B", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
							month_names_long : ["\u0421\u0456\u0447\u0435\u043D\u044C", "\u041B\u044E\u0442\u0438\u0439", "\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C", "\u041A\u0432\u0456\u0442\u0435\u043D\u044C", "\u0422\u0440\u0430\u0432\u0435\u043D\u044C", "\u0427\u0435\u0440\u0432\u0435\u043D\u044C", "\u041B\u0438\u043F\u0435\u043D\u044C", "\u0421\u0435\u0440\u043F\u0435\u043D\u044C", "\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C", "\u0416\u043E\u0432\u0442\u0435\u043D\u044C", "\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434", "\u0413\u0440\u0443\u0434\u0435\u043D\u044C"], 
							month_names_short : ["\u0421\u0456\u0447", "\u041B\u044E\u0442", "\u0411\u0435\u0440", "\u041A\u0432\u0456", "\u0422\u0440\u0430", "\u0427\u0435\u0440", "\u041B\u0438\u043F", "\u0421\u0435\u0440", "\u0412\u0435\u0440", "\u0416\u043E\u0432", "\u041B\u0438\u0441", "\u0413\u0440\u0443"], 
							month_names_narrow : ["\u0421\u0456\u0447", "\u041B\u044E\u0442", "\u0411\u0435\u0440", "\u041A\u0432\u0456", "\u0422\u0440\u0430", "\u0427\u0435\u0440", "\u041B\u0438\u043F", "\u0421\u0435\u0440", "\u0412\u0435\u0440", "\u0416\u043E\u0432", "\u041B\u0438\u0441", "\u0413\u0440\u0443"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0070\u002E", 
							shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.uk_ua;
						break;
					case "ur":
					case "ur_pk":
						nexacro.Locale.ur = nexacro.Locale.ur_pk = {
							name : "ur_PK", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0050\u004B\u0052\u0020", 
							currency_symbol : "\u0052\u0073", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 2, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							weekday_names_short : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							weekday_names_narrow : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
							month_names_long : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							month_names_short : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							month_names_narrow : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
							ampm : ["\u0635", "\u0634"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0050\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0648\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u062A\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "rtl"
						};
						return nexacro.Locale.ur_pk;
						break;
					case "uz":
					case "uz_uz":
						nexacro.Locale.uz = nexacro.Locale.uz_uz = {
							name : "uz_UZ", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u005A\u0053\u0020", 
							currency_symbol : "\u0073\u006F\u0027\u006D", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0059\u0061\u006B\u0073\u0068\u0061\u006E\u0062\u0061", "\u0044\u0075\u0073\u0068\u0061\u006E\u0062\u0061", "\u0053\u0065\u0073\u0068\u0061\u006E\u0062\u0061", "\u0043\u0068\u006F\u0072\u0073\u0068\u0061\u006E\u0062\u0061", "\u0050\u0061\u0079\u0073\u0068\u0061\u006E\u0062\u0061", "\u004A\u0075\u006D\u0061", "\u0053\u0068\u0061\u006E\u0062\u0061"], 
							weekday_names_short : ["\u0059\u0061\u006B", "\u0044\u0075", "\u0053\u0065", "\u0043\u0068\u006F", "\u0050\u0061\u0079", "\u004A\u0075", "\u0053\u0068\u0061"], 
							weekday_names_narrow : ["\u0059\u0061\u006B", "\u0044\u0075", "\u0053\u0065", "\u0043\u0068\u006F", "\u0050\u0061\u0079", "\u004A\u0075", "\u0053\u0068\u0061"], 
							month_names_long : ["\u0059\u0061\u006E\u0076\u0061\u0072", "\u0046\u0065\u0076\u0072\u0061\u006C", "\u004D\u0061\u0072\u0074", "\u0041\u0070\u0072\u0065\u006C", "\u004D\u0061\u0079", "\u0049\u0079\u0075\u006E", "\u0049\u0079\u0075\u006C", "\u0041\u0076\u0067\u0075\u0073\u0074", "\u0053\u0065\u006E\u0074\u0079\u0061\u0062\u0072", "\u004F\u006B\u0074\u0079\u0061\u0062\u0072", "\u004E\u006F\u0079\u0061\u0062\u0072", "\u0044\u0065\u006B\u0061\u0062\u0072"], 
							month_names_short : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0049\u0079\u006E", "\u0049\u0079\u006C", "\u0041\u0076\u0067", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
							month_names_narrow : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0049\u0079\u006E", "\u0049\u0079\u006C", "\u0041\u0076\u0067", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0054\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0079\u0069\u006C\u002C\u0020\u0025\u0041", 
							full_date_time_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0079\u0069\u006C\u002C\u0020\u0025\u0041", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.uz_uz;
						break;
					case "ve":
					case "ve_za":
						nexacro.Locale.ve = nexacro.Locale.ve_za = {
							name : "ve_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0053\u0077\u006F\u006E\u0064\u0061\u0068\u0061", "\u004D\u0075\u0073\u0075\u006D\u0062\u0075\u006C\u0075\u0077\u006F", "\u1E3C\u0061\u0076\u0068\u0075\u0076\u0068\u0069\u006C\u0069", "\u1E3C\u0061\u0076\u0068\u0075\u0072\u0061\u0072\u0075", "\u1E3C\u0061\u0076\u0068\u0075\u1E4B\u0061", "\u1E3C\u0061\u0076\u0068\u0075\u1E71\u0061\u006E\u0075", "\u004D\u0075\u0067\u0069\u0076\u0068\u0065\u006C\u0061"], 
							weekday_names_short : ["\u0053\u0077\u006F", "\u004D\u0075\u0073", "\u0056\u0068\u0069", "\u0052\u0061\u0072", "\u1E4B\u0061", "\u1E70\u0061\u006E", "\u004D\u0075\u0067"], 
							weekday_names_narrow : ["\u0053\u0077\u006F", "\u004D\u0075\u0073", "\u0056\u0068\u0069", "\u0052\u0061\u0072", "\u1E4B\u0061", "\u1E70\u0061\u006E", "\u004D\u0075\u0067"], 
							month_names_long : ["\u0050\u0068\u0061\u006E\u0064\u006F", "\u004C\u0075\u0068\u0075\u0068\u0069", "\u1E70\u0068\u0061\u0066\u0061\u006D\u0075\u0068\u0077\u0065", "\u004C\u0061\u006D\u0062\u0061\u006D\u0061\u0069", "\u0053\u0068\u0075\u006E\u0064\u0075\u006E\u0074\u0068\u0075\u006C\u0065", "\u0046\u0075\u006C\u0077\u0069", "\u0046\u0075\u006C\u0077\u0061\u006E\u0061", "\u1E70\u0068\u0061\u006E\u0067\u0075\u006C\u0065", "\u004B\u0068\u0075\u0062\u0076\u0075\u006D\u0065\u0064\u007A\u0069", "\u0054\u0073\u0068\u0069\u006D\u0065\u0064\u007A\u0069", "\u1E3C\u0061\u0072\u0061", "\u004E\u0079\u0065\u006E\u0064\u0061\u0076\u0068\u0075\u0073\u0069\u006B\u0075"], 
							month_names_short : ["\u0050\u0068\u0061", "\u004C\u0075\u0068", "\u0046\u0061\u006D", "\u004C\u0061\u006D", "\u0053\u0068\u0075", "\u004C\u0077\u0069", "\u004C\u0077\u0061", "\u004E\u0067\u0075", "\u004B\u0068\u0075", "\u0054\u0073\u0068", "\u1E3C\u0061\u0072", "\u004E\u0079\u0065"], 
							month_names_narrow : ["\u0050\u0068\u0061", "\u004C\u0075\u0068", "\u0046\u0061\u006D", "\u004C\u0061\u006D", "\u0053\u0068\u0075", "\u004C\u0077\u0069", "\u004C\u0077\u0061", "\u004E\u0067\u0075", "\u004B\u0068\u0075", "\u0054\u0073\u0068", "\u1E3C\u0061\u0072", "\u004E\u0079\u0065"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.ve_za;
						break;
					case "vi":
					case "vi_vn":
						nexacro.Locale.vi = nexacro.Locale.vi_vn = {
							name : "vi_VN", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0056\u004E\u0044\u0020", 
							currency_symbol : "\u20AB", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0043\u0068\u1EE7\u0020\u006E\u0068\u1EAD\u0074", "\u0054\u0068\u1EE9\u0020\u0068\u0061\u0069", "\u0054\u0068\u1EE9\u0020\u0062\u0061", "\u0054\u0068\u1EE9\u0020\u0074\u01B0", "\u0054\u0068\u1EE9\u0020\u006E\u0103\u006D", "\u0054\u0068\u1EE9\u0020\u0073\u00E1\u0075", "\u0054\u0068\u1EE9\u0020\u0062\u1EA3\u0079"], 
							weekday_names_short : ["\u0043\u004E", "\u0054\u0032", "\u0054\u0033", "\u0054\u0034", "\u0054\u0035", "\u0054\u0036", "\u0054\u0037"], 
							weekday_names_narrow : ["\u0043\u004E", "\u0054\u0032", "\u0054\u0033", "\u0054\u0034", "\u0054\u0035", "\u0054\u0036", "\u0054\u0037"], 
							month_names_long : ["\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u1ED9\u0074", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0068\u0061\u0069", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0062\u0061", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0074\u01B0", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006E\u0103\u006D", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0073\u00E1\u0075", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0062\u1EA3\u0079", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0074\u00E1\u006D", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0063\u0068\u00ED\u006E", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069\u0020\u006D\u1ED9\u0074", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069\u0020\u0068\u0061\u0069"], 
							month_names_short : ["\u0054\u0068\u0030\u0031", "\u0054\u0068\u0030\u0032", "\u0054\u0068\u0030\u0033", "\u0054\u0068\u0030\u0034", "\u0054\u0068\u0030\u0035", "\u0054\u0068\u0030\u0036", "\u0054\u0068\u0030\u0037", "\u0054\u0068\u0030\u0038", "\u0054\u0068\u0030\u0039", "\u0054\u0068\u0031\u0030", "\u0054\u0068\u0031\u0031", "\u0054\u0068\u0031\u0032"], 
							month_names_narrow : ["\u0054\u0068\u0030\u0031", "\u0054\u0068\u0030\u0032", "\u0054\u0068\u0030\u0033", "\u0054\u0068\u0030\u0034", "\u0054\u0068\u0030\u0035", "\u0054\u0068\u0030\u0036", "\u0054\u0068\u0030\u0037", "\u0054\u0068\u0030\u0038", "\u0054\u0068\u0030\u0039", "\u0054\u0068\u0031\u0030", "\u0054\u0068\u0031\u0031", "\u0054\u0068\u0031\u0032"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u0020\u0025\u0070", 
							date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u004E\u0103\u006D\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u006E\u0103\u006D\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
							shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.vi_vn;
						break;
					case "wa":
					case "wa_be":
						nexacro.Locale.wa = nexacro.Locale.wa_be = {
							name : "wa_BE", 
							decimal_point : "\u002C", 
							thousands_sep : "\u002E", 
							grouping : [0, 0], 
							int_curr_symbol : "\u0045\u0055\u0052\u0020", 
							currency_symbol : "\u20AC", 
							mon_decimal_point : "\u002C", 
							mon_thousands_sep : "\u002E", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 0, 
							p_sep_by_space : 1, 
							n_cs_precedes : 0, 
							n_sep_by_space : 1, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0064\u0069\u006D\u0065\u0067\u006E\u0065", "\u006C\u006F\u006E\u0064\u0069", "\u006D\u00E5\u0072\u0064\u0069", "\u006D\u0069\u0065\u0072\u006B\u0069\u0064\u0069", "\u0064\u006A\u0075\u0064\u0069", "\u0076\u00E9\u006E\u0072\u0064\u0069", "\u0073\u0065\u006D\u0064\u0069"], 
							weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u006F\u006E", "\u006D\u00E5\u0072", "\u006D\u0069\u0065", "\u0064\u006A\u0075", "\u0076\u00E9\u006E", "\u0073\u0065\u006D"], 
							weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u006F\u006E", "\u006D\u00E5\u0072", "\u006D\u0069\u0065", "\u0064\u006A\u0075", "\u0076\u00E9\u006E", "\u0073\u0065\u006D"], 
							month_names_long : ["\u0064\u006A\u0061\u006E\u0076\u00EE", "\u0066\u0065\u0076\u0072\u00EE", "\u006D\u00E5\u0073\u0073", "\u0061\u0076\u0072\u0069", "\u006D\u0061\u0079", "\u0064\u006A\u0075\u006E", "\u0064\u006A\u0075\u006C\u0065\u0074\u0065", "\u0061\u0077\u006F\u0075\u0073\u0073\u0065", "\u0073\u0065\u0074\u0069\u006D\u0062\u0065", "\u006F\u0063\u0074\u00F4\u0062\u0065", "\u006E\u00F4\u0076\u0069\u006D\u0062\u0065", "\u0064\u0065\u0063\u0069\u006D\u0062\u0065"], 
							month_names_short : ["\u0064\u006A\u0061", "\u0066\u0065\u0076", "\u006D\u00E5\u0073", "\u0061\u0076\u0072", "\u006D\u0061\u0079", "\u0064\u006A\u006E", "\u0064\u006A\u006C", "\u0061\u0077\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u00F4\u0076", "\u0064\u0065\u0063"], 
							month_names_narrow : ["\u0064\u006A\u0061", "\u0066\u0065\u0076", "\u006D\u00E5\u0073", "\u0061\u0076\u0072", "\u006D\u0061\u0079", "\u0064\u006A\u006E", "\u0064\u006A\u006C", "\u0061\u0077\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u00F4\u0076", "\u0064\u0065\u0063"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
							date_time_format : "\u004C\u0069\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u0064\u0069\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.wa_be;
						break;
					case "xh":
					case "xh_za":
						nexacro.Locale.xh = nexacro.Locale.xh_za = {
							name : "xh_ZA", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u005A\u0041\u0052\u0020", 
							currency_symbol : "\u0052", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u0069\u0043\u0061\u0077\u0061", "\u0075\u004D\u0076\u0075\u006C\u006F", "\u006C\u0077\u0065\u0073\u0069\u0042\u0069\u006E\u0069", "\u006C\u0077\u0065\u0073\u0069\u0054\u0068\u0061\u0074\u0068\u0075", "\u0075\u006C\u0077\u0065\u0053\u0069\u006E\u0065", "\u006C\u0077\u0065\u0073\u0069\u0048\u006C\u0061\u006E\u0075", "\u0075\u004D\u0067\u0071\u0069\u0062\u0065\u006C\u006F"], 
							weekday_names_short : ["\u0043\u0061\u0077", "\u004D\u0076\u0075", "\u0042\u0069\u006E", "\u0054\u0068\u0061", "\u0053\u0069\u006E", "\u0048\u006C\u0061", "\u004D\u0067\u0071"], 
							weekday_names_narrow : ["\u0043\u0061\u0077", "\u004D\u0076\u0075", "\u0042\u0069\u006E", "\u0054\u0068\u0061", "\u0053\u0069\u006E", "\u0048\u006C\u0061", "\u004D\u0067\u0071"], 
							month_names_long : ["\u0065\u0079\u006F\u004D\u0071\u0075\u006E\u0067\u0075", "\u0065\u0079\u006F\u004D\u0064\u0075\u006D\u0062\u0061", "\u0065\u0079\u006F\u004B\u0077\u0069\u006E\u0064\u006C\u0061", "\u0075\u0054\u0073\u0068\u0061\u007A\u0069\u006D\u0070\u0075\u007A\u0069", "\u0075\u0043\u0061\u006E\u007A\u0069\u0062\u0065", "\u0065\u0079\u0065\u0053\u0069\u006C\u0069\u006D\u0065\u006C\u0061", "\u0065\u0079\u0065\u004B\u0068\u0061\u006C\u0061", "\u0065\u0079\u0065\u0054\u0068\u0075\u0070\u0061", "\u0065\u0079\u006F\u004D\u0073\u0069\u006E\u0074\u0073\u0069", "\u0065\u0079\u0065\u0044\u0077\u0061\u0072\u0068\u0061", "\u0065\u0079\u0065\u004E\u006B\u0061\u006E\u0067\u0061", "\u0065\u0079\u006F\u004D\u006E\u0067\u0061"], 
							month_names_short : ["\u004D\u0071\u0075", "\u004D\u0064\u0075", "\u004B\u0077\u0069", "\u0054\u0073\u0068", "\u0043\u0061\u006E", "\u0053\u0069\u006C", "\u004B\u0068\u0061", "\u0054\u0068\u0075", "\u004D\u0073\u0069", "\u0044\u0077\u0061", "\u004E\u006B\u0061", "\u004D\u006E\u0067"], 
							month_names_narrow : ["\u004D\u0071\u0075", "\u004D\u0064\u0075", "\u004B\u0077\u0069", "\u0054\u0073\u0068", "\u0043\u0061\u006E", "\u0053\u0069\u006C", "\u004B\u0068\u0061", "\u0054\u0068\u0075", "\u004D\u0073\u0069", "\u0044\u0077\u0061", "\u004E\u006B\u0061", "\u004D\u006E\u0067"], 
							ampm : ["", ""], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
							time_format : "\u0025\u0054", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.xh_za;
						break;
					case "yi":
					case "yi_us":
						nexacro.Locale.yi = nexacro.Locale.yi_us = {
							name : "yi_US", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3, 3], 
							int_curr_symbol : "\u0055\u0053\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3, 3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 1, 
							n_cs_precedes : 1, 
							n_sep_by_space : 1, 
							p_sign_posn : 2, 
							n_sign_posn : 2, 
							weekday_names_long : ["\u05D6\u05D5\u05E0\u05D8\u05D9\u05E7", "\u05DE\u05D0\u05B8\u05E0\u05D8\u05D9\u05E7", "\u05D3\u05D9\u05E0\u05E1\u05D8\u05D9\u05E7", "\u05DE\u05D9\u05D8\u05F0\u05D0\u05B8\u05DA", "\u05D3\u05D0\u05B8\u05E0\u05E2\u05E8\u05E9\u05D8\u05D9\u05E7", "\u05E4\u05BF\u05E8\u05F2\u05B7\u05D8\u05D9\u05E7", "\u05E9\u05D1\u05EA"], 
							weekday_names_short : ["\u05D6\u05D5\u05E0\u0027", "\u05DE\u05D0\u05B8\u05E0\u0027", "\u05D3\u05D9\u05E0\u0027", "\u05DE\u05D9\u05D8\u0027", "\u05D3\u05D0\u05B8\u05E0\u0027", "\u05E4\u05BF\u05E8\u05F2\u05B7\u0027", "\u05E9\u05D1\u05EA"], 
							weekday_names_narrow : ["\u05D6\u05D5\u05E0\u0027", "\u05DE\u05D0\u05B8\u05E0\u0027", "\u05D3\u05D9\u05E0\u0027", "\u05DE\u05D9\u05D8\u0027", "\u05D3\u05D0\u05B8\u05E0\u0027", "\u05E4\u05BF\u05E8\u05F2\u05B7\u0027", "\u05E9\u05D1\u05EA"], 
							month_names_long : ["\u05D9\u05D0\u05B7\u05E0\u05D5\u05D0\u05B7\u05E8", "\u05E4\u05BF\u05E2\u05D1\u05E8\u05D5\u05D0\u05B7\u05E8", "\u05DE\u05D0\u05B7\u05E8\u05E5", "\u05D0\u05B7\u05E4\u05BC\u05E8\u05D9\u05DC", "\u05DE\u05F2\u05B7", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05F1\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E2\u05E4\u05BC\u05D8\u05E2\u05DE\u05D1\u05E2\u05E8", "\u05D0\u05B8\u05E7\u05D8\u05D0\u05B8\u05D1\u05E2\u05E8", "\u05E0\u05D0\u05B8\u05F0\u05E2\u05DE\u05D1\u05E2\u05E8", "\u05D3\u05E2\u05E6\u05E2\u05DE\u05D1\u05E2\u05E8"], 
							month_names_short : ["\u05D9\u05D0\u05B7\u05E0", "\u05E4\u05BF\u05E2\u05D1", "\u05DE\u05D0\u05B7\u05E8", "\u05D0\u05B7\u05E4\u05BC\u05E8", "\u05DE\u05F2\u05B7\u0020", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05F1\u05D2", "\u05E1\u05E2\u05E4\u05BC", "\u05D0\u05B8\u05E7\u05D8", "\u05E0\u05D0\u05B8\u05F0", "\u05D3\u05E2\u05E6"], 
							month_names_narrow : ["\u05D9\u05D0\u05B7\u05E0", "\u05E4\u05BF\u05E2\u05D1", "\u05DE\u05D0\u05B7\u05E8", "\u05D0\u05B7\u05E4\u05BC\u05E8", "\u05DE\u05F2\u05B7\u0020", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05F1\u05D2", "\u05E1\u05E2\u05E4\u05BC", "\u05D0\u05B8\u05E7\u05D8", "\u05E0\u05D0\u05B8\u05F0", "\u05D3\u05E2\u05E6"], 
							ampm : ["\u0041\u004D", "\u0050\u004D"], 
							date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
							time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
							date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "", 
							shortdate_format : "", 
							direction : "ltr"
						};
						return nexacro.Locale.yi_us;
						break;
					case "zh":
					case "zh_cn":
						nexacro.Locale.zh = nexacro.Locale.zh_cn = {
							name : "zh_CN", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0043\u004E\u0059\u0020", 
							currency_symbol : "\uFFE5", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 4, 
							n_sign_posn : 4, 
							weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
							weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
							date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
							time_format : "\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
							time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
							date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
							full_date_time_format : "\u0025\u0059\u5E74\u0020\u0025\u006D\u6708\u0020\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006E\u002F\u0025\u0065", 
							direction : "ltr"
						};
						return nexacro.Locale.zh_cn;
						break;
					case "zh_hk":
						nexacro.Locale.zh_hk = {
							name : "zh_HK", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0048\u004B\u0044\u0020", 
							currency_symbol : "\u0048\u004B\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
							weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							month_names_short : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							month_names_narrow : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
							date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041", 
							time_format : "\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
							time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
							date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.zh_hk;
						break;
					case "zh_sg":
						nexacro.Locale.zh_sg = {
							name : "zh_SG", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0053\u0047\u0044\u0020", 
							currency_symbol : "\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							mon_n_sign_posn : 0, 
							weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
							weekday_names_short : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
							weekday_names_narrow : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
							month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							month_names_short : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							month_names_narrow : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
							date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
							time_format : "\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
							time_format_ampm : "", 
							date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
							full_date_time_format : "", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
							shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
							direction : "ltr"
						};
						return nexacro.Locale.zh_sg;
						break;
					case "zh_tw":
						nexacro.Locale.zh_tw = {
							name : "zh_TW", 
							decimal_point : "\u002E", 
							thousands_sep : "\u002C", 
							grouping : [3], 
							int_curr_symbol : "\u0054\u0057\u0044\u0020", 
							currency_symbol : "\u004E\u0054\u0024", 
							mon_decimal_point : "\u002E", 
							mon_thousands_sep : "\u002C", 
							mon_grouping : [3], 
							positive_sign : "", 
							negative_sign : "\u002D", 
							int_frac_digits : 2, 
							frac_digits : 2, 
							p_cs_precedes : 1, 
							p_sep_by_space : 0, 
							n_cs_precedes : 1, 
							n_sep_by_space : 0, 
							p_sign_posn : 1, 
							n_sign_posn : 1, 
							weekday_names_long : ["\u9031\u65E5", "\u9031\u4E00", "\u9031\u4E8C", "\u9031\u4E09", "\u9031\u56DB", "\u9031\u4E94", "\u9031\u516D"], 
							weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
							month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
							month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
							ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
							date_format : "\u897F\u5143\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
							time_format : "\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							date_time_format : "\u897F\u5143\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0028\u0025\u0041\u0029\u0020\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
							full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
							first_weekday : 0, 
							longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
							shortdate_format : "\u0025\u0059\u002F\u0025\u006E\u002F\u0025\u0065", 
							direction : "ltr"
						};
						return nexacro.Locale.zh_tw;
						break;
					default:
						{

							if (default_flag) {
								return nexacro.Locale.getLocaleInfo("en");
							}
							else {
								return nexacro.Locale.getLocaleInfo(nexacro._getLocale(), true);
							}
						}
						break;
				}
			}
			return nexacro.Locale.getLocaleInfo(nexacro._getLocale());
		};


		nexacro.Locale._replaceLocaleDigits = function (locale, str) {
			var locale_info = nexacro.Locale.getLocaleInfo(locale);

			if (locale_info.locale_digits) {
				var locale_digits = locale_info.locale_digits;

				str = str.replace(/0/g, locale_digits[0]);
				str = str.replace(/1/g, locale_digits[1]);
				str = str.replace(/2/g, locale_digits[2]);
				str = str.replace(/3/g, locale_digits[3]);
				str = str.replace(/4/g, locale_digits[4]);
				str = str.replace(/5/g, locale_digits[5]);
				str = str.replace(/6/g, locale_digits[6]);
				str = str.replace(/7/g, locale_digits[7]);
				str = str.replace(/8/g, locale_digits[8]);
				str = str.replace(/9/g, locale_digits[9]);
			}
			return str;
		};

		nexacro.Locale._makeDateMaskString = function (locale, opt) {
			var locale_info = nexacro.Locale.getLocaleInfo(locale);
			var format_string = "";

			if (opt == "SHORTDATE") {
				format_string = locale_info.shortdate_format;
			}
			else if (opt == "LONGDATE") {
				format_string = locale_info.longdate_format;
			}

			if (format_string == "") {
				return "yyyy-MM-dd";
			}

			format_string = format_string.replace(/%a/g, "ddd");
			format_string = format_string.replace(/%A/g, "dddd");
			format_string = format_string.replace(/%b/g, "MMMM");
			format_string = format_string.replace(/%B/g, "MMMM");

			format_string = format_string.replace(/%y/g, "yy");
			format_string = format_string.replace(/%Y/g, "yyyy");
			format_string = format_string.replace(/%n/g, "M");
			format_string = format_string.replace(/%m/g, "MM");
			format_string = format_string.replace(/%d/g, "dd");
			format_string = format_string.replace(/%e/g, "d");

			return format_string;
		};

		nexacro.Locale._default_longdate_format = "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059";
		nexacro.Locale._default_shortdate_format = "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059";

		nexacro.makeLocaleFormatString = function (obj, locale) {
			var locale_string = "";
			var new_obj;
			if (obj instanceof Number) {
				new_obj = new nexacro.Number(obj);
				locale_string = new_obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Number) {
				locale_string = obj.toLocaleString(locale);
			}
			else if (obj instanceof Date) {
				new_obj = new nexacro.Date(obj);
				locale_string = new_obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Date) {
				locale_string = obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Decimal) {
				locale_string = obj.toLocaleString(locale);
			}
			else {
				locale_string = obj.toLocaleString();
			}

			return locale_string;
		};

		nexacro._setLocale = function (v) {
			nexacro._locale = v;
		};
	}

	nexacro._setTrackInfo = function (targetwin, target, windowX, windowY) {
		var trackData = target._on_starttrack();

		if (trackData === false) {
			return;
		}

		nexacro._cur_track_info = {
			"targetwin" : targetwin, 
			"target" : target, 
			"startX" : windowX, 
			"startY" : windowY, 
			"distX" : 0, 
			"distY" : 0, 
			"data" : trackData
		};
	};

	nexacro._setExtraTrackInfo = function (targetwin, target, windowX, windowY, screenX, screenY, keepstart) {
		var trackData = target._on_start_extratrack(windowX, windowY, screenX, screenY, keepstart);
		nexacro._cur_extra_track_info = {
			"targetwin" : targetwin, 
			"target" : target, 
			"startX" : windowX, 
			"startY" : windowY, 
			"screenX" : screenX, 
			"screenY" : screenY, 
			"distX" : 0, 
			"distY" : 0, 
			"data" : trackData
		};
	};

	nexacro._setDragInfo = function (targetwin, target_elem, startX, startY, currX, currY, dragimage, imagealign, filelist, datatype) {
		nexacro._cur_drag_info = {
			"targetwin" : targetwin, 
			"target_elem" : target_elem, 
			"target" : null, 
			"referTarget" : null, 
			"isDragging" : false, 
			"isSelfAction" : false, 
			"isDragover" : false, 
			"startX" : startX, 
			"startY" : startY, 
			"currX" : currX, 
			"currY" : currY, 
			"image" : dragimage, 
			"imagealign" : imagealign, 
			"data" : null, 
			"datatype" : datatype, 
			"userdata" : null, 
			"filelist" : filelist
		};
	};

	nexacro._initDragInfo = function () {
		nexacro._cur_drag_info = null;
	};

	nexacro._setRepeatInfo = function (target, win, refer_comp, windowX, windowY, canvasX, canvasY) {
		var handle = nexacro._getWindowHandle(win.handle);
		var ret = target._on_beforerepeat(refer_comp);

		if (ret && ret[0] === true) {
			var repeatData = target._on_startrepeat(refer_comp, canvasX, canvasY);

			if (win._cur_ldown_elem) {
				nexacro._cur_repeat_info = {
					"targetwin" : win, 
					"target" : target, 
					"startX" : windowX, 
					"startY" : windowY, 
					"distX" : 0, 
					"distY" : 0, 
					"startCanvasX" : canvasX, 
					"startCanvasY" : canvasY, 
					"canvasX" : canvasX, 
					"canvasY" : canvasY, 
					"data" : repeatData, 
					"refer_comp" : refer_comp, 
					"step" : "first", 
					"_repeatfunc" : null, 
					"_timer" : null
				};

				if (!nexacro._cur_repeat_info._repeatfunc) {
					nexacro._cur_repeat_info._repeatfunc = nexacro._nexacroBind(win, win._on_sys_repeat);
				}

				nexacro._cur_repeat_info._timer = nexacro._setSystemTimer(handle, nexacro._cur_repeat_info._repeatfunc, 500);
			}
		}

		if (ret && ret[1] === false) {
			return true;
		}

		return;
	};

	nexacro._getImageLocation = function (str, baseurl) {
		var url = str;
		var typedefinition_url = nexacro._typedefinition_url;

		if (!baseurl) {
			baseurl = nexacro._project_url;
		}


		return nexacro._transurl(baseurl, typedefinition_url, url, true);
	};

	nexacro._transfullurl = function (baseurl, url, bCheckVersion, type) {
		if (nexacro._isAbsolutePath(url) === true) {
			return url;
		}

		var env = nexacro.getEnvironment();
		var checkversion = env.checkversion & bCheckVersion;
		baseurl = nexacro._getBaseUrl(baseurl);

		var fullurl = null;

		if (baseurl.indexOf("?") >= 0) {
			fullurl = baseurl + url;
		}
		else {
			fullurl = nexacro._mergeUrl(baseurl, url);
		}

		if (checkversion) {
			fullurl += nexacro._getVersionQueryString(fullurl, type, env.version);
		}

		var urlarr = fullurl.split("/");

		var n = urlarr.length;


		var realpath = [];

		var i = 0;
		while (i < n) {
			if (urlarr[i] != "." && urlarr[i] != "..") {
				break;
			}
			realpath.push(urlarr[i]);
			i++;
		}

		while (i < n) {
			if (urlarr[i] != ".") {
				if (urlarr[i] == "..") {
					realpath.pop();
				}
				else {
					realpath.push(urlarr[i]);
				}
			}
			i++;
		}
		return realpath.join("/");
	};

	nexacro._addLocalCacheUrl = function (url, localurl) {
		if (url.indexOf("initvalue::") == 0) {
			if (url.length > 5) {
				var ext = url.substring(url.length - 4);
				if (ext == ".xml" || ext == ".xiv") {
					url = url + ".js";
				}
			}
		}

		if (localurl) {
			localurl = localurl.replace(/\\/g, "/");
		}
		if (!nexacro._localcaches) {
			nexacro._localcaches = {
			};
		}
		nexacro._localcaches[url] = localurl;
	};


	nexacro._hasLocalCacheUrl = function (url) {
		if (!nexacro._localcaches) {
			return false;
		}

		return (url in nexacro._localcaches);
	};

	nexacro._getLocalCacheUrl = function (url) {
		return this._localcaches[url];
	};

	nexacro._getService = function (prefix, typedefintion_url) {
		var env = nexacro.getEnvironment();
		if (env) {
			return env.services[prefix];
		}
	};


	nexacro._transurl = function (baseurl, typedefintionurl, url, makefullpath, bCheckVersion) {
		var exturl = url;
		if (bCheckVersion !== false) {
			bCheckVersion = true;
		}

		var env = nexacro.getEnvironment();
		var checkversion = env.checkversion && bCheckVersion;

		var bLocalCacheType, local_url, strA, suburl;
		if (exturl.indexOf("theme://") >= 0) {
			bLocalCacheType = false;
			if (nexacro._hasLocalCacheUrl(url)) {
				local_url = nexacro._getLocalCacheUrl(url);
				if (local_url) {
					return local_url;
				}

				bLocalCacheType = true;
			}

			strA = exturl.split("://");
			suburl = strA[1];

			var realpath = [];
			var separator = "/";

			var theme_uri = nexacro._theme_uri;
			realpath.push(theme_uri);

			if (theme_uri.charAt(theme_uri.length - 1) == "/") {
				separator = "";
			}
			realpath.push(suburl);

			exturl = realpath.join(separator).replace(/\\/g, "/");
			if (nexacro._isAbsolutePath(exturl) !== true) {
				if (bLocalCacheType) {
					exturl = nexacro._transfullurl(nexacro._localcache_path, exturl);
				}
				else {
					if (makefullpath) {
						exturl = nexacro._transfullurl(nexacro._project_absolutepath, exturl);
					}
					else {
						exturl = nexacro._transfullurl(nexacro._project_url, exturl);
					}
				}
			}

			if (checkversion) {
				exturl += nexacro._getVersionQueryString(exturl, "theme");
			}

			if (bLocalCacheType) {
				nexacro._addLocalCacheUrl(url, exturl);
			}
		}
		else {
			bLocalCacheType = false;
			if (nexacro._hasLocalCacheUrl(url)) {
				local_url = nexacro._getLocalCacheUrl(url);
				if (local_url) {
					return local_url;
				}

				bLocalCacheType = true;
			}

			if (exturl.indexOf("::") < 0) {
				if (bLocalCacheType) {
					baseurl = nexacro._localcache_path;
					exturl = nexacro._transfullurl(baseurl, exturl);
				}
				else if (nexacro._isAbsolutePath(exturl) !== true) {
					exturl = exturl.replace(/\\/g, "/");
					exturl = nexacro._transfullurl(baseurl, exturl);
				}
			}
			else {
				strA = exturl.split("::");
				suburl = strA[1];

				var prefix = strA[0];
				var service = nexacro._getService(prefix, typedefintionurl);
				if (service != null) {
					var serviceurl = service.url;
					if (serviceurl.charAt(serviceurl.length - 1) != "/") {
						serviceurl = serviceurl + "/";
					}
					if (suburl.charAt(0) == "/") {
						suburl = suburl.substring(1);
					}

					suburl = suburl.replace(/\\/g, "/");

					if (nexacro._isAbsolutePath(serviceurl) === true) {
						exturl = nexacro._transfullurl(serviceurl, suburl);
					}
					else {
						var basepath;
						if (bLocalCacheType) {
							basepath = nexacro._transfullurl(nexacro._localcache_path, serviceurl);
						}
						else {
							basepath = nexacro._transfullurl(typedefintionurl, serviceurl);
						}
						exturl = nexacro._transfullurl(basepath, suburl);
					}
				}
				else {
					exturl = exturl.replace(/\\/g, "/");
				}

				if (exturl.match(/\.xfdl$|\.xjs$/)) {
					exturl += ".js";
				}

				if (checkversion) {
					exturl += nexacro._getVersionQueryString(url, "service");
				}
			}

			if (bLocalCacheType) {
				nexacro._addLocalCacheUrl(url, exturl);
			}
		}

		return exturl;
	};

	nexacro._getVersionQueryString = function (url, type, version) {
		var ret = url ? url : "";
		var arr = ret.split("?");
		var qs = "";

		if (arr.length < 2) {
			qs = "?";
		}
		else {
			qs = "&";
		}

		var svc, ver;

		if (type == "theme") {
			svc = nexacro._getServiceObject("theme::");
		}
		else if (type == "service") {
			svc = nexacro._getServiceObject(url);
		}

		if (svc) {
			ver = svc.version;
		}
		else {
			ver = version;
		}

		if (!nexacro._isNull(ver) && ver !== "") {
			qs += "nexaversion=" + ver;
		}
		else {
			qs = "";
		}

		return qs;
	};

	nexacro._getServiceObject = function (url, bDefaultNone) {
		var serviceprefix = url.split("::");

		if (serviceprefix.length >= 2) {
			var service = nexacro._getService(serviceprefix[0]);
			if (service) {
				return service;
			}
		}

		if (!this._defaultservice) {
			nexacro._defaultservice = new nexacro._ServiceItem();
		}

		if (url.toLowerCase().indexOf("file://") >= 0 || bDefaultNone || nexacro._viewtoollog) {
			nexacro._defaultservice.cachelevel = "none";
		}
		else {
			nexacro._defaultservice.cachelevel = "session";
		}

		return nexacro._defaultservice;
	};

	nexacro._getServiceLocation = function (url, baseurl, typedefinition_url, bCheckVersion) {
		if (!typedefinition_url) {
			typedefinition_url = nexacro._typedefinition_url;
		}

		if (!baseurl) {
			baseurl = nexacro._project_absolutepath;
		}

		return nexacro._transurl(baseurl, typedefinition_url, url, null, bCheckVersion);
	};


	nexacro._getFDLLocation = function (fdlurl, baseurl) {
		if (!fdlurl || fdlurl.length <= 0) {
			return fdlurl;
		}

		var url = nexacro._getServiceLocation(fdlurl, baseurl);
		if (url.length > 5) {
			if (url.substring(url.length - 5) == ".xfdl") {
				url = url + ".js";
			}
		}

		return url;
	};

	nexacro._getScreenType = function (type, width, is_landscape, height) {
		var cur_type = "desktop";
		switch (type) {
			case "win32":
			case "win64":
			case "mac":
			case "linux":
				cur_type = "desktop";
				break;
			case "iphone":
			case "winphone":
				cur_type = "mobile_small";
				break;
			case "ipad":
				if (nexacro._MobileDesktopMode) {
					cur_type = "desktop";
				}
				else {
					cur_type = "mobile_large";
				}
				break;
			case "android":
				if (nexacro._Browser == "Runtime") {
					cur_type = "mobile_large";
					if (nexacro.__isPhone && nexacro.__isPhone()) {
						cur_type = this._getWidthType(is_landscape ? height : width);
					}
				}
				else {
					cur_type = this._getWidthType(is_landscape ? height : width);
				}
				break;
		}
		return cur_type;
	};

	nexacro._getScreenOS = function (os) {
		var cur_os = "win32";
		switch (os) {
			case "win32":
			case "win64":
			case "winphone":
				cur_os = "windows";
				break;
			case "ipad":
			case "iphone":
				cur_os = "ios";
				break;
			case "android":
				cur_os = "android";
				break;
		}
		return cur_os;
	};

	nexacro._getMornitorIndex = function () {
		var monitor_idx = 1;
		var monitor_cnt = nexacro._getMonitorCount();
		for (var i = 0; i < monitor_cnt; i++) {
			if (nexacro._isPrimaryMonitor(i)) {
				monitor_idx = i;
			}
		}
		return monitor_idx;
	};


	nexacro._getWidthType = function (w) {
		var width_type = "desktop";

		if (w < 490) {
			width_type = "mobile_small";
		}
		else if (w < 790) {
			width_type = "mobile_medium";
		}
		else if (w < 1290) {
			width_type = "mobile_large";
		}

		return width_type;
	};

	nexacro._getTypePriority = function (type) {
		var ret = 5;
		if (type == "desktop") {
			ret = 4;
		}
		else if (type == "mobile_large") {
			ret = 3;
		}
		else if (type == "mobile_medium") {
			ret = 2;
		}
		else if (type == "mobile_small") {
			ret = 1;
		}
		return ret;
	};

	nexacro._getTypeScreenWidth = function (type) {
		var ret = -1;
		if (type == "desktop" && this._allow_default_pinchzoom) {
			ret = nexacro._desktopscreenwidth;
		}
		else if (type == "mobile_large") {
			ret = 800;
		}
		else if (type == "mobile_medium") {
			ret = 640;
		}
		else if (type == "mobile_small") {
			ret = 480;
		}
		return ret;
	};

	nexacro._getTypeScreenHeight = function (type) {
		var ret = -1;
		if (type == "desktop" && this._allow_default_pinchzoom) {
			ret = nexacro._desktopscreenwidth;
		}
		else if (type == "mobile_large") {
			ret = 1280;
		}
		else if (type == "mobile_medium") {
			ret = 1024;
		}
		else if (type == "mobile_small") {
			ret = 768;
		}
		return ret;
	};

	nexacro._getTypeScreenWidthOrientation = function (type, landscape) {
		var ret = -1;
		if (landscape) {
			if (type == "mobile_large") {
				ret = 1280;
			}
			else if (type == "mobile_medium") {
				ret = 1024;
			}
			else if (type == "mobile_small") {
				ret = 768;
			}
		}
		else {
			if (type == "desktop" && this._allow_default_pinchzoom) {
				ret = nexacro._desktopscreenwidth;
			}
			else if (type == "mobile_large") {
				ret = 800;
			}
			else if (type == "mobile_medium") {
				ret = 640;
			}
			else if (type == "mobile_small") {
				ret = 480;
			}
		}

		return ret;
	};

	nexacro._getDeviceWidth = function () {
		if (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Chrome") {
			var is_portrait_device = nexacro._searchDeviceExceptionValue("is_portrait_device");
			if (is_portrait_device === true) {
				var orientation = nexacro._getMobileOrientation();
				var is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
				var is_delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
				if (orientation == 2 || orientation == 3) {
					if (is_swap_screen === true && !is_delayed_swap_screen) {
						if (screen.width < screen.height) {
							return screen.height;
						}
					}
				}
			}
		}

		if (nexacro._OS == "Android" && nexacro._Browser == "Runtime") {
			return nexacro._getScreenAvailWidth();
		}

		if (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser != "Chrome") {
			return document.documentElement.clientWidth;
		}
		return nexacro._getScreenAvailWidth();
	};

	nexacro._getDeviceHeight = function () {
		return nexacro._getScreenAvailHeight();
	};

	nexacro._getDeviceInfo = function (device_name) {
		var device_info = this._device_infos[device_name];
		if (device_info) {
			return device_info;
		}
		else if (device_name) {
			var device_infos = this._device_infos, prop, n;
			for (prop in device_infos) {
				n = device_name.indexOf(prop);
				if (n > -1) {
					return device_infos[prop];
				}
			}
		}
		return null;
	};

	nexacro._getDeviceName = function () {
		if (this._DeviceName) {
			return this._DeviceName;
		}
		var ua = this._getUserAgent();
		var i = 0, j, k, p, q, matches, match, result;
		var devices = this._device_regular_expression;
		while (i < devices.length && !matches) {
			var regex = devices[i], props = devices[i + 1];
			if (typeof result === 'undefined') {
				result = {
				};
				for (p in props) {
					if (props.hasOwnProperty(p)) {
						q = props[p];
						if (typeof q === 'object') {
							result[q[0]] = undefined;
						}
						else {
							result[q] = undefined;
						}
					}
				}
			}
			j = k = 0;
			while (j < regex.length && !matches) {
				matches = regex[j++].exec(ua);
				if (!!matches) {
					for (p = 0; p < props.length; p++) {
						match = matches[++k];
						q = props[p];
						if (typeof q === 'object' && q.length > 0) {
							if (q.length == 2) {
								if (typeof q[1] == 'function') {
									result[q[0]] = q[1].call(this, match);
								}
								else {
									result[q[0]] = q[1];
								}
							}
							else if (q.length == 3) {
								if (typeof q[1] === 'function' && !(q[1].exec && q[1].test)) {
									result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
								}
								else {
									result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
								}
							}
							else if (q.length == 4) {
								result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
							}
						}
						else {
							result[q] = match ? match : undefined;
						}
					}
				}
			}
			i += 2;
		}
		return result ? this._DeviceName = result.model : "";
	};


	nexacro._getOptimalScreenInfo = function (scr_info, cur_screen_type) {
		var len = scr_info.length;
		var optimal_screen = null, i, _screen;

		for (i = 0; i < len; i++) {
			_screen = scr_info[i];
			if (_screen._type <= cur_screen_type) {
				if (optimal_screen) {
					if (optimal_screen._type < _screen._type) {
						optimal_screen = _screen;
					}
				}
				else {
					optimal_screen = _screen;
				}
			}
		}

		if (!optimal_screen) {
			for (i = 0; i < len; i++) {
				_screen = scr_info[i];
				if (_screen._type >= cur_screen_type) {
					if (optimal_screen) {
						if (optimal_screen._type > _screen._type) {
							optimal_screen = _screen;
						}
					}
					else {
						optimal_screen = _screen;
					}
				}
			}
		}

		if (!optimal_screen) {
		}
		return optimal_screen;
	};


	nexacro._getScreen = function (screeninfo) {
		if (!screeninfo) {
			return;
		}

		var scr_info_list = screeninfo;
		var scr_len = scr_info_list.length;
		var matched_scrinfo = null;
		var cur_os = this._getScreenOS(nexacro._SystemType);
		var locale_info = nexacro.Locale.getLocaleInfo(nexacro._locale);
		var cur_locale = locale_info ? locale_info.name : nexacro._getLocale();
		var monitor_idx = this._getMornitorIndex();
		var cur_width = nexacro._getDeviceWidth(monitor_idx);
		var cur_height = nexacro._getDeviceHeight(monitor_idx);
		var is_landscape = cur_width > cur_height ? true : false;
		var cur_type = "";
		var temp;
		if (nexacro._OS == "Android") {
			var device_name = this._getDeviceName();
			var device_info = this._getDeviceInfo(device_name);
			if (device_info) {
				cur_width = +device_info.PortraitWidth;
				cur_height = +device_info.LandscapeWidth;
				cur_type = device_info.type;
				if (is_landscape) {
					temp = cur_width;
					cur_width = cur_height;
					cur_height = temp;
				}
			}
		}
		else if (nexacro._OS == "iOS" && nexacro._Browser != "MobileSafari") {
			var win_handle = nexacro._getMainWindowHandle();
			var win_width = nexacro._getWindowHandleClientWidth(win_handle);
			var win_height = nexacro._getWindowHandleClientHeight(win_handle);

			is_landscape = win_width > win_height ? true : false;

			if (is_landscape) {
				temp = cur_width;
				cur_width = cur_height;
				cur_height = temp;
			}
		}

		if (!cur_type) {
			cur_type = this._getScreenType(nexacro._SystemType.toLowerCase(), cur_width, is_landscape, cur_height);
		}

		var i, j;
		for (i = 0; i < scr_len; i++) {
			var type_found = false;
			var scr_info = scr_info_list[i];
			var device_width = is_landscape ? (cur_height ? cur_height : nexacro._getScreenAvailHeight(monitor_idx)) : (cur_width ? cur_width : nexacro._getScreenAvailWidth(monitor_idx));
			scr_info._device_width = device_width;
			var device_height = is_landscape ? (cur_width ? cur_width : nexacro._getScreenAvailWidth(monitor_idx)) : (cur_height ? cur_height : nexacro._getScreenAvailHeight(monitor_idx));

			scr_info._device_height = device_height;
			if (scr_info.id == nexacro._launch_screenid) {
				return scr_info;
			}

			scr_info._priority = 0;

			var type = scr_info.type;
			if (cur_type && type) {
				scr_info._type = this._getTypePriority(type);
				if (scr_info._type > 0) {
					scr_info._screen_width = this._getTypeScreenWidth(type);
					scr_info._screen_height = this._getTypeScreenHeight(type);
				}

				scr_info._priority = -100;

				if (type === cur_type) {
					scr_info._priority = 100;
					type_found = true;
				}
				if (!type_found) {
					continue;
				}
			}

			var os = scr_info.specifiedos;
			if (cur_os && os) {
				var os_list = os.toLowerCase().split(",");
				var os_cnt = os_list.length;
				for (j = 0; j < os_cnt; j++) {
					if (os_list[j] == cur_os) {
						scr_info._priority += 10;
						break;
					}
				}
			}

			var locale = scr_info.specifiedlocale;
			if (cur_locale && locale) {
				if (locale == cur_locale) {
					scr_info._priority += 1;
				}
			}
			if (scr_info._priority >= 100) {
				if (!matched_scrinfo) {
					matched_scrinfo = scr_info;
				}
				else if (matched_scrinfo._priority < scr_info._priority) {
					matched_scrinfo = scr_info;
				}
			}
		}

		if (matched_scrinfo) {
			matched_scrinfo._cur_type = cur_type;
		}
		else {
			var cur_screenpriority = this._getTypePriority(cur_type);
			matched_scrinfo = this._getOptimalScreenInfo(screeninfo, cur_screenpriority);
		}
		return matched_scrinfo;
	};

	nexacro._applySelectedScreen = function (curscreen) {
		if (!curscreen) {
			return;
		}

		var isScreenDesktop = curscreen.type == "desktop" ? true : false;

		var isMobileWeb = ((!nexacro._isDesktop() || nexacro._AndroidDesktopMode) && nexacro._Browser != "Runtime");
		if (isScreenDesktop && nexacro._isHybrid && !nexacro._isHybrid()) {
			var isSupportPinchZoom = (curscreen.userzoom == "true") ? true : false;
			if (isSupportPinchZoom && isMobileWeb) {
				this._allow_default_pinchzoom = true;
			}
		}

		var is_landscape;
		var cur_width = nexacro._getDeviceWidth();
		var cur_height = nexacro._getDeviceHeight();
		var cur_type;
		var cur_zoomfactortype = curscreen.zoomfactortype ? curscreen.zoomfactortype : nexacro._curscreenzoomfactortype;
		var zoom_fitting_width, zoom_fitting_height;

		is_landscape = cur_width > cur_height ? true : false;

		if (nexacro._OS == "Android" && nexacro._Browser == "Runtime") {
			var device_name = nexacro._getMobileProductType();
			var device_info = this._getDeviceInfo(device_name);
			var screen_height;


			if (device_info) {
				cur_width = +device_info.PortraitWidth;
				cur_height = +device_info.LandscapeWidth;

				if (is_landscape) {
					cur_width = cur_height;
				}
			}

			curscreen._device_width = cur_width ? cur_width : nexacro._getDeviceWidth();

			if (!curscreen.type) {
				cur_type = this._getScreenType(nexacro._SystemType.toLowerCase(), curscreen._device_width, is_landscape, nexacro._getDeviceHeight());
				curscreen.type = cur_type;
			}

			curscreen._screen_width = this._getTypeScreenWidthOrientation(curscreen.type, is_landscape);
			screen_height = this._getTypeScreenWidthOrientation(curscreen.type, !is_landscape);

			if (curscreen._screen_width !== undefined) {
				var zoom_factor = 0;

				if (nexacro.__setCurrentScreenInfo && nexacro.__getCurrentScreenScale) {
					var screen_temp, device_temp;
					var realDeviceWidth = nexacro._getScreenWidth();
					var realDeviceHeight = nexacro._getScreenHeight();

					switch (cur_zoomfactortype) {
						case "portrait":
							if (is_landscape) {
								screen_temp = screen_height;
								screen_height = curscreen._screen_width;
								curscreen._screen_width = screen_temp;

								device_temp = realDeviceHeight;
								realDeviceHeight = realDeviceWidth;
								realDeviceWidth = device_temp;
							}
							break;
						case "landscape":
							if (!is_landscape) {
								screen_temp = screen_height;
								screen_height = curscreen._screen_width;
								curscreen._screen_width = screen_temp;

								device_temp = realDeviceHeight;
								realDeviceHeight = realDeviceWidth;
								realDeviceWidth = device_temp;
							}
							break;
					}

					nexacro.__setCurrentScreenInfo(curscreen.type, curscreen._screen_width, is_landscape, true, 0, 0, curscreen._device_width, screen_height, realDeviceWidth, realDeviceHeight);

					var scale = nexacro.__getCurrentScreenScale();
					if (scale) {
						zoom_factor = scale *  100;
					}
				}

				if (zoom_factor == 0) {
					zoom_fitting_width = Math.abs(parseInt(curscreen._screen_width));
					zoom_factor = zoom_fitting_width *  100 / curscreen._device_width;
				}
				nexacro._zoom_factor = zoom_factor;
			}
			else {
				nexacro._onSystemWarning(nexacro._environment, "native_exist_screenwdith");
			}
		}
		else {
			if (nexacro._OS == "iOS") {
				var win_handle = nexacro._getMainWindowHandle();
				var win_width = nexacro._getWindowHandleClientWidth(win_handle);
				var win_height = nexacro._getWindowHandleClientHeight(win_handle);

				is_landscape = win_width > win_height ? true : false;
			}

			if (nexacro._zoom_factor) {
				return;
			}
			if (!curscreen._screen_width) {
				curscreen._screen_width = this._getTypeScreenWidth(curscreen.type);
			}

			if (curscreen._screen_width == -1) {
				nexacro._zoom_factor = 100;
			}
			else if (curscreen._screen_width !== undefined) {
				if (parseInt(curscreen._screen_width) <= 320 && nexacro._OS == "Android" && nexacro._Browser != "Chrome") {
					curscreen._screen_width = "321";
				}

				zoom_fitting_width = Math.abs(parseInt(curscreen._screen_width));
				zoom_fitting_height = Math.abs(parseInt(curscreen._screen_height));

				var zoom_fitting_val, device_val;

				switch (cur_zoomfactortype) {
					case "portrait":
						zoom_fitting_val = zoom_fitting_width;
						device_val = curscreen._device_width;
						break;
					case "landscape":
						zoom_fitting_val = zoom_fitting_height;
						device_val = curscreen._device_height;
						break;
					case "auto":
						zoom_fitting_val = is_landscape ? zoom_fitting_height : zoom_fitting_width;
						device_val = is_landscape ? curscreen._device_height : curscreen._device_width;
						break;
				}

				nexacro._zoom_factor = device_val *  100 / zoom_fitting_val;
			}
			else {
				nexacro._onSystemWarning(nexacro._environment, "native_exist_screenwdith");
			}
		}
	};

	nexacro._setCurrentScreen = function (curscreen) {
		nexacro._curscreenid = curscreen.id ? curscreen.id : "";
		nexacro._curscreentype = curscreen.type;
		if (curscreen.zoomfactortype) {
			nexacro._curscreenzoomfactortype = curscreen.zoomfactortype;
		}
		var env = nexacro.getEnvironment();
		if (env) {
			env._setCurrentScreen(curscreen);
		}
	};

	nexacro.getZoomFactorType = function () {
		return nexacro._curscreenzoomfactortype;
	};


	nexacro._getCurrentScreenID = function () {
		return nexacro._curscreenid;
	};

	nexacro._getCurrentScreenType = function () {
		return nexacro._curscreentype;
	};

	nexacro._removeLastPopupComponent = function () {
		nexacro._current_popups.pop();
	};
	nexacro._removePopupComponent = function (popup_comp) {
		if (!popup_comp || !popup_comp._is_popup_control) {
			nexacro._current_popups = [];
		}
		else {
			var popups = nexacro._current_popups;
			var cnt = popups.length;
			if (cnt > 0) {
				var cur_popup = null;
				for (var i = cnt; i > 0; i--) {
					cur_popup = popups[i - 1];
					if (!cur_popup) {
						break;
					}
					if (cur_popup == popup_comp) {
						nexacro._current_popups = popups.slice(0, i - 1);
						break;
					}
				}
			}
		}
	};

	nexacro._current_popups = [];
	nexacro._appendPopupComponent = function (popup_comp) {
		var cur_popup = null;
		if (!popup_comp || !popup_comp._is_popup_control) {
			cur_popup = nexacro._current_popups[0];
			if (cur_popup) {
				cur_popup._closePopup();
			}
			this._current_popups = [];
		}
		else {
			var popups = nexacro._current_popups;
			var cnt = popups.length;
			if (cnt > 0) {
				var is_contain = false;
				var last_popup = null, i;
				for (i = cnt; i > 0; i--) {
					cur_popup = popups[i - 1];
					if (!cur_popup) {
						break;
					}
					if (cur_popup._contains(popup_comp)) {
						is_contain = true;
						if (last_popup) {
							last_popup._closePopup();
						}
						nexacro._current_popups = popups.slice(0, i);
						break;
					}

					last_popup = cur_popup;
				}
				if (!is_contain) {
					var len = nexacro._current_popups.length;
					for (i = len - 1; i >= 0; i--) {
						last_popup = nexacro._current_popups[i];
						if (last_popup) {
							last_popup._closePopup();
						}
					}
					nexacro._current_popups = [];
				}
			}
			nexacro._current_popups.push(popup_comp);
		}
	};

	nexacro._checkClosePopupComponent = function (target_comp, bCheckSameParent) {
		var cur_popup = null, i, len;
		if (!target_comp) {
			len = nexacro._current_popups.length;
			for (i = len - 1; i >= 0; i--) {
				cur_popup = nexacro._current_popups[i];
				if (cur_popup) {
					cur_popup._closePopup();
				}
			}

			nexacro._current_popups = [];
		}
		else {
			var popups = nexacro._current_popups;
			var cnt = popups.length;
			if (cnt > 0) {
				var is_contain = false;
				var last_popup = null;
				var child_popups = [], popup;
				for (i = cnt; i > 0; i--) {
					cur_popup = popups[i - 1];
					if (!cur_popup) {
						break;
					}
					if (bCheckSameParent) {
						if (cur_popup._contains(target_comp)) {
							is_contain = true;

							for (var j = cnt; j >= i; j--) {
								popup = popups[j - 1];
								if (cur_popup != popup && cur_popup._contains(popup)) {
									child_popups.push(popups[j - 1]);
									popups.splice(j - 1);
								}
							}
						}
						else {
							var root_comp;
							root_comp = cur_popup._getPopupRootComponent(cur_popup);

							if (root_comp) {
								is_contain = root_comp._contains(target_comp);
								if (root_comp._is_frame) {
									is_contain = false;
								}
							}
						}
					}
					else {
						is_contain = cur_popup._contains(target_comp);
					}

					if (is_contain) {
						break;
					}
				}

				if (!is_contain) {
					len = nexacro._current_popups.length;
					for (i = len - 1; i >= 0; i--) {
						last_popup = nexacro._current_popups[i];
						if (last_popup) {
							last_popup._closePopup();
						}
					}
					nexacro._current_popups = [];
				}
				else if (child_popups.length > 0) {
					while (child_popups.length > 0) {
						popup = child_popups.shift();
						if (popup) {
							popup._closePopup();
						}
					}
				}
			}
		}
	};

	if (!nexacro.__isDesignMode || !nexacro.__isDesignMode()) {
		nexacro._loadExtensionLibrary = function (libpath) {
			if (nexacro._Browser == "Runtime") {
				if (nexacro._OS == "Windows" || nexacro._OS == "Android" || nexacro._OS == "OSX") {
					return nexacro.__loadLibraryExtensionAPI(libpath);
				}
			}
			else {
				if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
					return nexacro.Device.makeID();
				}
			}
		};
	}
	else {
		nexacro._loadExtensionLibrary = nexacro._emptyFn;
	}


	nexacro._unloadExtensionLibrary = function (handle) {
		return nexacro.__unloadLibraryExtensionAPI(handle);
	};

	nexacro._removeDeviceAdaptor = function (name) {
		var device_obj = nexacro._device_adaptor_list[name];
		if (device_obj) {
			device_obj.finalize();
			nexacro._device_adaptor_list[name] = null;
		}
	};

	nexacro._removeDeviceAdaptors = function () {
		for (var name in nexacro._device_adaptor_list) {
			var device_obj = nexacro._device_adaptor_list[name];
			if (device_obj) {
				device_obj.finalize();
				nexacro._device_adaptor_list[name] = null;
			}
		}
	};

	nexacro._getExtensionLoadErrorMessage = function () {
		return nexacro.__getLastErrorMessageExtensionAPI();
	};

	nexacro._setExtensionObjectEvent = function (handle, target, fn) {
		return nexacro.__setLocalEventExtensionAPI(handle, target, fn);
	};

	nexacro._device_infos = 
		{
		"SM-T715N0" : 
			{
			"model" : "SM-T715N0", 
			"type" : "mobile_medium", 
			"PortraitWidth" : "768", 
			"LandscapeWidth" : "1024"
		}, 
		"SM-T800" : 
			{
			"model" : "SM-T800", 
			"type" : "mobile_large"
		}, 
		"F100S" : 
			{
			"model" : "F100S", 
			"type" : "mobile_small", 
			"PortraitWidth" : "384", 
			"LandscapeWidth" : "512"
		}, 
		"SM-G900" : 
			{
			"model" : "SM-G900P", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"SM-G920L" : 
			{
			"model" : "SM-G920L", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"SHV-E250S" : 
			{
			"'model'" : "SHV-E250S", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640", 
			"type" : "mobile_small"
		}, 
		"SHV-E230S" : 
			{
			"'model'" : "SHV-E230S", 
			"PortraitWidth" : "800", 
			"LandscapeWidth" : "1280", 
			"type" : "mobile_large"
		}, 
		"SM-P605S" : 
			{
			"'model'" : "SM-P605S", 
			"PortraitWidth" : "800", 
			"LandscapeWidth" : "1280", 
			"type" : "mobile_large"
		}, 
		"GT-N7100" : 
			{
			"'model'" : "GT-N7100", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640", 
			"type" : "mobile_small"
		}, 
		"SHW-M440S" : 
			{
			"model" : "SHW-M440S", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"SHV-E330" : 
			{
			"model" : "SHV-E330", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"SHW-M380" : 
			{
			"model" : "SHW-M380", 
			"type" : "mobile_medium", 
			"PortraitWidth" : "800", 
			"LandscapeWidth" : "1280"
		}, 
		"Nexus 5X" : 
			{
			"model" : "Nexus 5X", 
			"type" : "mobile_small", 
			"PortraitWidth" : "412", 
			"LandscapeWidth" : "732"
		}, 
		"Nexus 10" : 
			{
			"model" : "Nexus 10", 
			"type" : "mobile_medium", 
			"PortraitWidth" : "800", 
			"LandscapeWidth" : "1280"
		}, 
		"Nexus 4" : 
			{
			"model" : "Nexus 4", 
			"type" : "mobile_small", 
			"PortraitWidth" : "384", 
			"LandscapeWidth" : "598"
		}, 
		"Nexus 5" : 
			{
			"model" : "Nexus 5", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "598"
		}, 
		"Nexus 6" : 
			{
			"'model'" : "Nexus 6", 
			"type" : "mobile_medium", 
			"PortraitWidth" : "412", 
			"LandscapeWidth" : "732"
		}, 
		"Nexus 7" : 
			{
			"model" : "Nexus 7", 
			"type" : "mobile_medium", 
			"PortraitWidth" : "601", 
			"LandscapeWidth" : "962"
		}, 
		"IM-A910" : 
			{
			"model" : "IM-A910", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"IM-A840" : 
			{
			"model" : "IM-A840", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "592"
		}, 
		"SM-N900" : 
			{
			"model" : "SM-N900", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640"
		}, 
		"SM-G935S" : 
			{
			"model" : "SM-G935S", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640", 
			"ZoomFactor" : "75"
		}, 
		"SM-G906K" : 
			{
			"model" : "SM-G906K", 
			"type" : "mobile_small", 
			"PortraitWidth" : "360", 
			"LandscapeWidth" : "640", 
			"ZoomFactor" : "75"
		}, 
		"F180" : 
			{
			"model" : "LG-F180S", 
			"type" : "mobile_small", 
			"PortraitWidth" : "384", 
			"LandscapeWidth" : "640"
		}
	};

	nexacro._openSystemCalendar = function (calendar, v, callbackFn) {
		nexacro.__openSystemCalendar(calendar, v, callbackFn);
	};

	nexacro._closeSystemCalendar = function () {
		nexacro.__closeSystemCalendar();
	};

	nexacro._isDeactivate = function () {
		return nexacro.__isDeactivate();
	};

	nexacro._setDeactivate = function (deactivate) {
		nexacro.__setDeactivate(deactivate);
	};

	nexacro._getDisplayTextfromDecorateText = function (text) {
		var strtemp = text;

		var expPrefixMap = [/<\/?ff\s+[v]\s*=['"].*?>/g, /<\/?fs\s+[v]\s*=['"].*?>/g, /<\/?fc\s+[v]\s*=['"].*?>/g, /<\/?b\s+[v].*?>/g, /<\/?i\s+[v].*?>/g, /<\/?u\s+[v].*?>/g, /<\/?s\s+[v].*?>/g, /<\/?l\s+[v].*?>/g];
		var expSufixMap = [/<\/ff>/g, /<\/fs>/g, /<\/fc>/g, /<\/b>/g, /<\/i>/g, /<\/u>/g, /<\/s>/g, /<\/l>/g];

		for (var i = 0; i <= expPrefixMap.length - 1; i++) {
			var preexp = expPrefixMap[i];
			var sufexp = expSufixMap[i];
			var preexec = preexp.exec(strtemp);

			while (preexec) {
				var sufexec = sufexp.exec(strtemp);
				var startidx = preexec.index;
				var endidx = sufexp.lastIndex;

				var frontstr = strtemp.substring(0, startidx);
				var endstr = strtemp.substring(endidx, strtemp.length);
				var changestr = strtemp.substring(startidx, endidx);

				changestr = changestr.replace(preexec[0], "");
				if (sufexec[0]) {
					changestr = changestr.replace(sufexec[0], "");
				}

				strtemp = frontstr + changestr + endstr;

				preexp.lastIndex = 0;
				sufexp.lastIndex = 0;
				preexec = preexp.exec(strtemp);
			}
		}

		return strtemp;
	};
	nexacro._CheckShowContextPrevented = function (comp, target) {
		var canceldecontextmenu = false;
		var listener;
		var rbuttonActiondevice = false;
		if (nexacro._enabletouchevent) {
			if (target.visible && target._isEnable()) {
				comp.on_fire_oncontextmenu(comp, target);
			}

			listener = comp.oncontextmenu;
			if (listener && listener.defaultprevented) {
				canceldecontextmenu = true;
			}
		}
		else {
			if (nexacro._OS == "Mac OS" && nexacro._Browser != "Runtime") {
				rbuttonActiondevice = true;
			}

			if (nexacro._OS == "Android" || nexacro._OS == "iOS") {
				rbuttonActiondevice = true;
			}

			if (nexacro._OS == "Windows" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
				rbuttonActiondevice = true;
			}

			if (rbuttonActiondevice) {
				listener = comp.onrbuttondown;
				if (listener && listener.defaultprevented) {
					canceldecontextmenu = true;
				}
				else {
					if (target.visible && target._isEnable()) {
						comp.on_fire_oncontextmenu(comp, target);
					}

					listener = comp.oncontextmenu;
					if (listener && listener.defaultprevented) {
						canceldecontextmenu = true;
					}
				}
			}
			else {
				listener = comp.onrbuttonup;
				if (listener && listener.defaultprevented) {
					canceldecontextmenu = true;
				}
				else {
					if (target.visible && target._isEnable()) {
						comp.on_fire_oncontextmenu(comp, target);
					}

					listener = comp.oncontextmenu;
					if (listener && listener.defaultprevented) {
						canceldecontextmenu = true;
					}
				}
			}
		}
		return canceldecontextmenu;
	};
	nexacro._checkShowContextMenu = function (comp) {
		var environment = nexacro.getEnvironment();
		var env_usecontextmenu = environment ? environment.usecontextmenu : "all";
		var bForm = (comp instanceof nexacro.Form);
		var bEdit = (comp instanceof nexacro.Edit || comp instanceof nexacro.MaskEdit || comp instanceof nexacro.TextArea);
		var bSketch = comp instanceof nexacro.Sketch;

		if (nexacro._Browser == "Runtime") {
			if (env_usecontextmenu == "all") {
				if (bEdit) {
					return comp.usecontextmenu;
				}
				return true;
			}
			else if (env_usecontextmenu == "form") {
				if (bForm) {
					return true;
				}
			}
			else if (env_usecontextmenu == "edit") {
				if (bEdit) {
					return comp.usecontextmenu;
				}
			}
		}
		else {
			if (env_usecontextmenu == "all" || env_usecontextmenu == "edit") {
				if (bEdit || bSketch) {
					return comp.usecontextmenu;
				}
			}
		}

		return false;
	};

	nexacro.setRenderingType = function (v) {
		nexacro._setRenderingType(v);
	};

	nexacro.gc = function () {
		nexacro._gc();
	};

	nexacro.getEnableWheelZoom = function (targetFrame) {
		return nexacro._getEnableWheelZoom(targetFrame);
	};

	nexacro.setEnableWheelZoom = function (targetFrame, newEnableWheelZoom) {
		nexacro._setEnableWheelZoom(targetFrame, newEnableWheelZoom);
	};

	nexacro.getWheelZoom = function (targetFrame) {
		return nexacro._getWheelZoom(targetFrame);
	};

	nexacro.setWheelZoom = function (targetFrame, newWheelZoom) {
		nexacro._setWheelZoom(targetFrame, nexacro._toInt(newWheelZoom));
	};

	nexacro._getParsedUri = function (uri) {
		if (!uri) {
			return null;
		}

		var ret = uri.match(/^((\w+):)?(\/\/((\w+)?(:(\w+))?@)?([^\/\?:]+)(:(\d+))?)?(\/?([^\/\?#][^\?#]*)?)?(\?([^#]+))?/);

		return ret && {
			url : ret[0], 
			protocol : ret[2], 
			username : ret[5], 
			password : ret[7], 
			host : ret[8], 
			port : ret[10], 
			pathname : ret[11], 
			querystring : ret[14]
		};
	};

	nexacro._isWebTypeComponent = function (comp) {
		if (comp && comp instanceof nexacro.WebBrowser
			 || comp instanceof nexacro.WebView) {
			return true;
		}
		return false;
	};
	nexacro._isWebTypeElement = function (elem) {
		if (elem && elem instanceof nexacro._WebBrowserPluginElement
			 || elem instanceof nexacro._WebViewPluginElement) {
			return true;
		}
		return false;
	};
	nexacro._isSameOrigin = function (v1, v2) {
		if (!v1 || !v2) {
			return false;
		}

		var uri1 = nexacro._getParsedUri(v1);
		var uri2 = nexacro._getParsedUri(v2);

		if (!uri1 || !uri2) {
			return false;
		}

		if (uri1.protocol != uri2.protocol) {
			return false;
		}

		if (uri1.host != uri2.host) {
			return false;
		}

		if (!nexacro._isSameDomain(uri1.host, uri2.host)) {
			return false;
		}

		if (uri1.port != uri2.port) {
			return false;
		}

		return true;
	};

	nexacro._getContentType = nexacro._emptyFn;

	nexacro._Deserializer = {
		"SSV" : function (strRecvData, target) {
			var variablelist = {
			};
			var datasetlist = [];

			var _rs_ = nexacro._getSSVRecordSeparator();
			var _cs_ = nexacro._getSSVUnitSeparator();

			var code = 0;
			var message = "SUCCESS";

			if (!strRecvData) {
				return [{
					"ErrorCode" : code, 
					"ErrorMsg" : message
				}, null];
			}


			var ssvLines = strRecvData.split(_rs_);
			var lineCnt = ssvLines.length;
			var curIdx = 1;
			var curStr;
			var paramStr, varInfo, val, sep_pos, id;
			for (; curIdx < lineCnt; curIdx++) {
				curStr = ssvLines[curIdx];
				if (curStr.substring(0, 7) != "Dataset") {
					var paramArr = curStr.split(_cs_);
					var paramCnt = paramArr.length;
					for (var i = 0; i < paramCnt; i++) {
						paramStr = paramArr[i];
						varInfo = paramStr;
						val = undefined;
						sep_pos = paramStr.indexOf("=");
						if (sep_pos >= 0) {
							varInfo = paramStr.substring(0, sep_pos);
							val = paramStr.substring(sep_pos + 1);
							if (val == String.fromCharCode(3)) {
								val = undefined;
							}
						}

						if (varInfo) {
							id = varInfo;
							sep_pos = varInfo.indexOf(":");
							if (sep_pos >= 0) {
								id = varInfo.substring(0, sep_pos);
							}

							if (id == "ErrorCode") {
								code = parseInt(val) | 0;
								if (isFinite(code) == false) {
									code = -1;
								}
								variablelist[id] = code;
							}
							else if (id == "ErrorMsg") {
								variablelist[id] = val;
							}
							else if (target) {
								target._setParamter(id, val);
							}
						}
					}
				}
				else {
					break;
				}
			}

			if (code <= -1) {
				ssvLines.length = 0;
				strRecvData = null;
				return [variablelist, null];
			}

			function __find_next_dataset_loopFn (i) {
				var curStr = ssvLines[i];
				if (curStr.substring(0, 7) == "Dataset") {
					return true;
				}
			}

			while (true) {
				curIdx = nexacro.__forLoop(this, curIdx, lineCnt, __find_next_dataset_loopFn);
				if (curIdx >= lineCnt) {
					break;
				}

				curStr = ssvLines[curIdx];
				sep_pos = curStr.indexOf(":");
				if (sep_pos >= 0) {
					var remoteId = curStr.substring(sep_pos + 1);
					if (remoteId && remoteId.length) {
						var ds = target && target._getDataset(remoteId);
						if (!ds) {
							ds = new nexacro.Dataset(remoteId);
						}

						ds.rowposition = -1;
						curIdx = ds.loadFromSSVArray(ssvLines, lineCnt, curIdx, true);
						datasetlist.push(ds);
					}
					else {
						curIdx++;
					}
				}
				else {
					curIdx++;
				}
			}

			ssvLines.length = 0;
			return [variablelist, datasetlist];
		}, 
		"XML" : function (doc, target) {
			var variablelist = {
			};
			var paramElems = doc.getElementsByTagName("Parameter");
			var code = 0;
			var i;
			if (paramElems && paramElems.length) {
				var varCnt = paramElems.length;
				for (i = 0; i < varCnt; i++) {
					var paramElem = paramElems[i];
					var id = paramElem.getAttribute("id");
					if (id && id.length) {
						var val = (paramElem.textContent || (paramElem.firstChild ? paramElem.firstChild.nodeValue : ""));

						if (id == "ErrorCode") {
							code = parseInt(val) | 0;
							if (isFinite(code) == false) {
								code = -1;
							}
							variablelist[id] = code;
						}
						else if (id == "ErrorMsg") {
							variablelist[id] = val;
						}
						else {
							if (target) {
								target._setParamter(id, val);
							}
						}
					}
				}
			}

			if (code < 0) {
				return [variablelist, null];
			}

			var datasetlist = [];
			var datasets = doc.getElementsByTagName("Dataset");
			if (datasets && datasets.length) {
				var dataCnt = datasets.length;
				for (i = 0; i < dataCnt; i++) {
					var remoteId = datasets[i].getAttribute("id");
					if (remoteId && remoteId.length) {
						var ds = target && target._getDataset(remoteId);
						if (!ds) {
							ds = new nexacro.Dataset(remoteId);
						}

						ds.rowposition = -1;
						ds.loadFromDOM(datasets[i]);
						datasetlist.push(ds);
					}
				}
			}
			return [variablelist, datasetlist];
		}
	};

	nexacro._addCookieToCookieVariable = function (cookieStr) {
		if (cookieStr) {
			var cookielist = cookieStr.split("; ");
			var cookievarCnt = cookielist.length;
			var sep_pos;
			var cookieid, cookievalue;
			for (var i = 0; i < cookievarCnt; i++) {
				sep_pos = cookielist[i].indexOf("=");
				if (sep_pos <= 0) {
					cookieid = cookielist[i];
				}
				else {
					cookieid = cookielist[i].substr(0, sep_pos);
					cookievalue = cookielist[i].substr(sep_pos + 1);
				}

				if (nexacro._addcookietovariable) {
					nexacro._setCookieVariable(cookieid, cookievalue, false);
				}
			}
		}
	};

	nexacro._addCookieFromCookieVariables = function () {
		var envcookies = nexacro._getCookieVariables(4);
		var prop;
		if (envcookies) {
			for (prop in envcookies) {
				nexacro._setCookie(prop, envcookies[prop].value, null, false);
			}
		}

		var envsecurecookies = nexacro._getCookieVariables(6);
		if (envsecurecookies) {
			for (prop in envsecurecookies) {
				nexacro._setCookie(prop, envsecurecookies[prop].value, null, true);
			}
		}
	};

	nexacro._getRTLCanvasXForMouseEvent = function (obj, refer_comp, canvasX) {
		var tempX = canvasX;

		if (obj == refer_comp) {
			tempX = obj._adjust_width - canvasX;
		}
		else {
			var comp = refer_comp;
			tempX = comp._adjust_left + comp._adjust_width - tempX + comp._adjust_left;
			comp = comp.parent;
			while (obj != comp) {
				tempX += comp._adjust_left + comp._adjust_left;
				comp = comp.parent;
			}
		}
		return tempX;
	};

	nexacro._cloneObject = function (obj) {
		var arr_nexacro_types = ["Decimal", "Date"];
		if (obj && obj._type_name && arr_nexacro_types.indexOf(obj._type_name) >= 0) {
			return obj.clone();
		}

		function extend (from, to) {
			if (from == null || typeof from != "object") {
				return from;
			}
			if (from.constructor == RegExp || from.constructor == Function || 
				from.constructor == String || from.constructor == Number || from.constructor == Boolean) {
				return new from.constructor(from);
			}
			else if (from.constructor == Date) {
				return new from.constructor(from.getTime());
			}

			if (from.constructor != Object && from.constructor != Array) {
				if (!from._type_name || arr_nexacro_types.indexOf(from._type_name) < 0) {
					return from;
				}
			}

			to = to || new from.constructor();

			for (var name in from) {
				to[name] = extend(from[name]);
			}

			return to;
		}

		return extend(obj);
	};

	if (!nexacro._ImageType) {
		nexacro._ImageType = {
		};
		nexacro._ImageType._imagetable = {
			"file" : 
				{
				"BMP" : 
					{
					"ntype" : 0, 
					"datatype" : "image/bmp", 
					"ext" : "bmp"
				}, 
				"BMP_MONO" : 
					{
					"ntype" : 5, 
					"datatype" : "image/bmp", 
					"ext" : "bmp"
				}, 
				"JPG" : 
					{
					"ntype" : 2, 
					"datatype" : "image/jpeg", 
					"ext" : "jpg"
				}, 
				"TIF" : 
					{
					"ntype" : 4, 
					"datatype" : "image/tiff", 
					"ext" : "tif"
				}, 
				"TIF_24" : 
					{
					"ntype" : 6, 
					"datatype" : "image/tiff", 
					"ext" : "tif"
				}, 
				"TIF_MONO" : 
					{
					"ntype" : 7, 
					"datatype" : "image/tiff", 
					"ext" : "tif"
				}, 
				"GIF" : 
					{
					"ntype" : 3, 
					"datatype" : "image/gif", 
					"ext" : "gif"
				}, 
				"PNG" : 
					{
					"ntype" : 1, 
					"datatype" : "image/png", 
					"ext" : "png"
				}
					
			}, 
			"base64" : 
				{
				"PNG" : 
					{
					"ntype" : 1, 
					"datatype" : "image/png"
				}, 
				"JPEG" : 
					{
					"ntype" : 2, 
					"datatype" : "image/jpeg"
				}, 
				"JPG" : 
					{
					"ntype" : 2, 
					"datatype" : "image/jpeg"
				}, 
				"GIF" : 
					{
					"ntype" : 3, 
					"datatype" : "image/gif"
				}, 
				"BMP" : 
					{
					"ntype" : 8, 
					"datatype" : "image/bmp"
				}, 
				"TIFF" : 
					{
					"ntype" : 4, 
					"datatype" : "image/tiff"
				}, 
				"TIF" : 
					{
					"ntype" : 4, 
					"datatype" : "image/tiff"
				}, 
				"X_ICON" : 
					{
					"ntype" : 1, 
					"datatype" : "image/x-icon"
				}, 
				"SVG_XML" : 
					{
					"ntype" : 1, 
					"datatype" : "image/svg+xml"
				}, 
				"WEBP" : 
					{
					"ntype" : 1, 
					"datatype" : "image/webp"
				}, 
				"TIF_24" : 
					{
					"ntype" : 6, 
					"datatype" : "image/tiff_24"
						
				}, 
				"TIF_MONO" : 
					{
					"ntype" : 7, 
					"datatype" : "image/tiff_mono"
						
				}, 
				"BMP_MONO" : 
					{
					"ntype" : 5, 
					"datatype" : "image/bmp_mono"
						
				}
			}
		};
		nexacro._ImageType.getImageType = function (format, type) {
			var obj;
			var result = null;
			if (format && (format === "file" || format === "base64")) {
				if (!type) {
					switch (format) {
						case "file":
							type = "BMP";
							break;
						case "base64":
							type = "PNG";
							break;
					}
				}
				obj = nexacro._ImageType._imagetable[format];
				if (obj && obj.hasOwnProperty(type)) {
					result = obj[type];
					result.type = type;
				}
				else if (obj) {
					switch (format) {
						case "file":
							result = obj["BMP"];
							result.type = "PNG";
							break;
						case "base64":
							result = obj["PNG"];
							result.type = "PNG";
							break;
					}
				}
			}
			return result;
		};
		nexacro._ImageType.calcImageQuality = function (datatype, option) {
			if (nexacro._Browser != "Runtime" && (datatype == "image/jpg" || datatype == "image/jpeg" || datatype == "image/webp")) {
				var result = 0.5;
				var str = option;
				var arrstr, length, item, filter, value, reg_exps0;
				if (typeof str == "string") {
					arrstr = str.split(';');
					length = arrstr.length;
					reg_exps0 = /\bcompress:\b/ig;
					for (var i = 0; i < length; i++) {
						item = arrstr[i].toLowerCase();
						filter = reg_exps0.exec(item);

						if (filter != null && filter.length == 1) {
							option = item.replace("compress:", "");
						}
					}
				}
				var opt = +option;
				if (!isNaN(opt)) {
					if (opt < 1) {
						result = ((opt) / 100).toFixed(2);
					}
					else {
						result = opt;
					}
				}
				return result;
			}
			else {
				return option;
			}
		};
	}
	nexacro._getJSONPathObjectFromURL = function (url, path) {
		var jsonobj, rootobj;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				var status = xhr.status;
				if (status === 0 || (status >= 200 && status < 400)) {
					var str = xhr.response;
					if (str) {
						jsonobj = JSON.parse(str);
					}
				}
			}
		};
		xhr.send(null);
		if (jsonobj) {
			rootobj = nexacro._JSONPath(jsonobj, path);
		}

		trace(rootobj, XMLHttpRequest.DONE);
		return rootobj;
	};



	nexacro._JSONPath = function (obj, expr, arg) {
		var P = {
			resultType : arg && arg.resultType || "VALUE", 
			result : [], 
			normalize : function (expr) {
				var subx = [];
				return expr.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
					return "[#" + (subx.push($1) - 1) + "]";
				}).replace(/'?\.'?|\['?/g, ";").replace(/;;;|;;/g, ";..;").replace(/;$|'?\]|'$/g, "").replace(/#([0-9]+)/g, function ($0, $1) {
					return subx[$1];
				});
			}, 
			asPath : function (path) {
				var x = path.split(";"), p = "$";
				for (var i = 1, n = x.length; i < n; i++) {
					p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
				}
				return p;
			}, 
			store : function (p, v) {
				if (p) {
					P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
				}
				return !!p;
			}, 
			trace : function (expr, val, path) {
				if (expr) {
					var x = expr.split(";"), loc = x.shift();
					x = x.join(";");
					if (val && val.hasOwnProperty(loc)) {
						P.trace(x, val[loc], path + ";" + loc);
					}
					else if (loc === "*") {
						P.walk(loc, x, val, path, function (m, l, x, v, p) {
							P.trace(m + ";" + x, v, p);
						});
					}
					else if (loc === "..") {
						P.trace(x, val, path);
						P.walk(loc, x, val, path, function (m, l, x, v, p) {
							typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
						});
					}
					else if (/,/.test(loc)) {
						for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++) {
							P.trace(s[i] + ";" + x, val, path);
						}
					}
					else if (/^\(.*?\)$/.test(loc)) {
						P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
					}
					else if (/^\?\(.*?\)$/.test(loc)) {
						P.walk(loc, x, val, path, function (m, l, x, v, p) {
							if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) {
								P.trace(m + ";" + x, v, p);
							}
						});
					}
					else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) {
						P.slice(loc, x, val, path);
					}
					else if (loc == "$") {
						P.store(loc, val);
					}
				}
				else {
					P.store(path, val);
				}
			}, 
			walk : function (loc, expr, val, path, f) {
				if (val instanceof Array) {
					for (var i = 0, n = val.length; i < n; i++) {
						if (i in val) {
							f(i, loc, expr, val, path);
						}
					}
				}
				else if (typeof val === "object") {
					for (var m in val) {
						if (val.hasOwnProperty(m)) {
							f(m, loc, expr, val, path);
						}
					}
				}
			}, 
			slice : function (loc, expr, val, path) {
				if (val instanceof Array) {
					var len = val.length, start = 0, end = len, step = 1;
					loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) {
						start = parseInt($1 || start);
						end = parseInt($2 || end);
						step = parseInt($3 || step);
					});
					start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
					end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
					for (var i = start; i < end; i += step) {
						P.trace(i + ";" + expr, val, path);
					}
				}
			}, 
			eval : function (x, _v, _vname) {
				try {
					return $ && _v && eval(x.replace(/@/g, "_v"));
				}
				catch (e) {
					throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
				}
			}
		};

		var $ = obj;
		if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
			P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
			return P.result.length ? P.result : false;
		}
	};
}



if (_process) {
	delete _process;

	delete _pFuncBinder;
	delete _pSetterBinder;
	delete _pIntSetterBinder;
	delete _pPropBinder;
	delete _pNumPropBinder;
	delete _pObject;
	delete _pCollection;
	delete _pError;
	delete _pEventSinkObject;
	delete _pEventListener;
	delete _pEvent;
	delete _pEventInfo;
	delete _pTimerEventInfo;
	delete _pErrorEventInfo;
	delete _pExitEventInfo;
	delete _pAccessibilityEventInfo;
	delete _pActivateEventInfo;
	delete _pSysCommandEventInfo;
	delete _pCloseEventInfo;
	delete _pLoadEventInfo;
	delete _pSetFocusEventInfo;
	delete _pKillFocusEventInfo;
	delete _pMoveEventInfo;
	delete _pSizeEventInfo;
	delete _pKeyEventInfo;
	delete _pMouseEventInfo;
	delete _pClickEventInfo;
	delete _pMouseWheelEventInfo;
	delete _pScrollEventInfo;
	delete _pDragEventInfo;
	delete _pDragDataObject;
	delete _pCharEventInfo;
	delete _pGestureEventInfo;
	delete _pTapEventInfo;
	delete _pLongPressEventInfo;
	delete _pSlideEventInfo;
	delete _pPinchEventInfo;
	delete _pFlingEventInfo;
	delete _pZoomEventInfo;
	delete _pOrientationChangeEventInfo;
	delete _pContextMenuEventInfo;
	delete _pExtendedCommandEventInfo;
	delete _pTouchInput;
	delete _pTouchInputInfo;
	delete _pTouchEventInfo;
	delete _pItemClickEventInfo;
	delete _pChangeEventInfo;
	delete _pChangedEventInfo;
	delete _pItemChangeEventInfo;
	delete _pDuplicateExecutionEventInfo;
	delete _pEventUserNotify;
	delete _pEventAppUserNotify;
	delete _pEventAddLog;
	delete _pEventCommunication;
	delete _pNotificationEventInfo;
	delete _pDevicePermissionEventInfo;
	delete __pDataCache;
	delete __pCommunicationItem;
	delete _pProtocolAdp;
	delete _pDeviceAdaptor;
	delete _pCommunicationError;
	delete _pNativeError;
}
