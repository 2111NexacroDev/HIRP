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

if (!nexacro.WebView) {
	if (!nexacro.WebLoadCompEventInfo) {
		nexacro.WebLoadCompEventInfo = function (obj, url, id) {
			this.id = this.eventid = id || "onloadcompleted";
			this.fromobject = this.fromreferenceobject = obj;
			this.url = url;
		};
		var _pWebLoadCompEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.WebLoadCompEventInfo);
		nexacro.WebLoadCompEventInfo.prototype = _pWebLoadCompEventInfo;
		_pWebLoadCompEventInfo._type_name = "WebLoadCompEventInfo";

		delete _pWebLoadCompEventInfo;
	}

	if (!nexacro.WebUserNotifyEventInfo) {
		nexacro.WebUserNotifyEventInfo = function (obj, userdata, id) {
			this.id = this.eventid = id || "onusernotify";
			this.fromobject = this.fromreferenceobject = obj;

			this.userdata = userdata;
		};
		var _pWebUserNotifyEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.WebUserNotifyEventInfo);
		nexacro.WebUserNotifyEventInfo.prototype = _pWebUserNotifyEventInfo;
		_pWebUserNotifyEventInfo._type_name = "WebUserNotifyEventInfo";

		delete _pWebUserNotifyEventInfo;
	}




	nexacro.WebView = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};


	var _pWebView = nexacro._createPrototype(nexacro.Component, nexacro.WebView);
	nexacro.WebView.prototype = _pWebView;

	_pWebView._type_name = "WebView";
	_pWebView._ifrm_elem = null;

	_pWebView.window = null;
	_pWebView.document = null;
	_pWebView.url = "";
	_pWebView.setupurl = "";
	_pWebView.useurlhistory = true;
	_pWebView._url = "";
	_pWebView._setupUrl = "";
	_pWebView._blockLoadFlag = false;
	_pWebView._current_url = "";
	_pWebView.accessibilityrole = "webview";
	_pWebView.accessibilityleavemessage = "";
	_pWebView._scriptcallbacklist = [];
	_pWebView._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"oncontextmenu" : 1, 
		"onloadcompleted" : 1, 
		"onusernotify" : 1, 
		"ondevicebuttonup" : 1
	};

	_pWebView.on_get_accessibility_label = function () {
		return this.id;
	};


	_pWebView.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._ifrm_elem = new nexacro._WebViewPluginElement(control_elem);
			this._ifrm_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
		}
	};
	_pWebView.on_create_contents_command = function () {
		return "";
	};
	_pWebView.on_attach_contents_handle = function (win) {
		this.on_created_contents(win);
		return;
	};
	_pWebView.on_created_contents = function (win) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.component = this;

			ifrm_elem.create(win);
			ifrm_elem.initEvent();
			this.document = ifrm_elem._document;
			this.window = ifrm_elem._winodw;

			nexacro._observeSysEvent(ifrm_elem.handle, "mouseover", "onmouseover", this._webview_mouseover);
		}
		if (this._url === "") {
			this._url = "about:blank";
		}
		this.on_apply_url();
		this.on_apply_setupurl();
		this._on_apply_accessibilityleavemessage();
	};
	_pWebView.on_destroy_contents = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			nexacro._stopSysObserving(ifrm_elem.handle, "mouseover", "onmouseover", this._webview_mouseover);

			this.window = null;
			this.document = null;
			ifrm_elem.destroy();
			this._ifrm_elem = null;
		}
	};
	_pWebView.on_update_position = function (resize_flag, move_flag, update) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag, update);
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.on_update_position();
		}
	};



	_pWebView.on_change_containerRect = function (width, height) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.setElementSize(width, height);
		}
	};

	_pWebView.on_fire_onloadcompleted = function (obj, url) {
		if (this.onloadcompleted && this.onloadcompleted._has_handlers) {
			var evt = new nexacro.WebLoadCompEventInfo(obj, url);
			evt.eventid = "onloadcompleted";
			return this.onloadcompleted._fireEvent(this, evt);
		}
		return true;
	};
	_pWebView.fireUserNotify = function (msg) {
		if (msg.target) {
			msg.target.on_fire_onusernotify(msg.target, msg.data);
		}
	};
	_pWebView.on_fire_onusernotify = function (obj, userdata) {
		if (this.onusernotify && this.onusernotify._has_handlers) {
			var evt = new nexacro.WebUserNotifyEventInfo(obj, userdata);
			evt.eventid = "onusernotify";
			return this.onusernotify._fireEvent(this, evt);
		}
		return true;
	};

	_pWebView.on_ondevicebuttonup_default_action = function (button) {
		if (button == 2) {
			this.goBack();
		}
	};


	_pWebView._getDlgCode = function (keycode) {
		var _ifrm_elem = this._ifrm_elem;
		if (_ifrm_elem) {
			if ((!_ifrm_elem._prev_outfocus_message_elem || (_ifrm_elem._prev_outfocus_message_elem._killfocus_flag == true && keycode == nexacro.Event.KEY_UP)) || (!_ifrm_elem._next_outfocus_message_elem || (_ifrm_elem._next_outfocus_message_elem._killfocus_flag == true && keycode == nexacro.Event.KEY_DOWN))) {
				this._want_arrow = false;
			}
			else {
				this._want_arrow = true;
			}
		}
		return {
			want_tab : true, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrow
		};
	};

	_pWebView.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var E = nexacro.Event;
		if (keycode == E.KEY_TAB) {
			this._getWindow()._keydown_element._event_stop = false;
		}
		else if (nexacro._enableaccessibility) {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem._setElementInternalFocus(keycode);
			}
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pWebView._apply_setfocus = function (evt_name) {
		if (nexacro._enableaccessibility) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem._setElementFocus();
		}
	};


	_pWebView._webview_mouseover = function () {
		if (this._linked_element && !this._linked_element._document) {
			nexacro._initDragInfo();
			nexacro._cur_track_info = null;
		}
	};




	_pWebView.set_text = function (v) {
		v = nexacro._toString(v);

		if (v && v != this.text) {
			this.text = v;
			this._displaytext = v.replace(/ /g, "\u00a0");
			this.on_apply_text(v);
		}
	};

	_pWebView.set_enable = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enable != v) {
			this.enable = v;

			if (this._is_created) {
				var enable_flag = (this.parent._real_enable && v);
				if (this._real_enable != enable_flag) {
					this._real_enable = enable_flag;
					this._changeStatus("disabled", !enable_flag);
					this.on_apply_prop_enable(this._real_enable);
				}
			}
		}
	};

	_pWebView.callMethod = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			return nexacro._WebViewPluginElement.prototype.callMethod.apply(ifrm_elem, arguments);
		}
	};


	_pWebView.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		v = nexacro._toBoolean(v);

		nexacro.Component.prototype.set_visible.call(this, v);

		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.setElementVisible(v);
		}
	};

	_pWebView.set_cookiesynctype = function () {
	};

	_pWebView.set_url = function (v) {
		if (v == undefined) {
			return;
		}

		var val = v.toString();

		if (val != "about:blank" && val.match(/http:\/\/|file:\/\/|https:\/\//gi) == null) {
			val = "http://" + val;
		}

		this._url = val;
		this.url = v;

		this.on_apply_url();
	};
	_pWebView.set_setupurl = function (v) {
		if (v == undefined) {
			return;
		}

		var val = v.toString();

		if (val != "about:blank" && val.match(/http:\/\/|file:\/\/|https:\/\//gi) == null) {
			val = "http://" + val;
		}

		this._setupurl = val;
		this.setupurl = v;

		this.on_apply_setupurl();
	};

	_pWebView.set_useurlhistory = function (v) {
		this.useurlhistory = nexacro._toBoolean(v);
	};

	_pWebView.set_accessibilityleavemessage = function (v) {
		this.accessibilityleavemessage = v;
		this._on_apply_accessibilityleavemessage();
	};

	_pWebView.on_apply_url = function () {
		if (this._url === "http://" || this._url === "file://" || this._url === "https://" || this._url === "") {
			return;
		}

		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			this._blockLoadFlag = false;
			ifrm_elem._setUrl(this._url, this.useurlhistory);
		}
	};
	_pWebView.on_apply_setupurl = function () {
		if (this._setupurl === "http://" || this._setupurl === "file://" || this._setupurl === "https://" || this._setupurl === "") {
			return;
		}

		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem._setInstallUrl(this._setupurl);
		}
	};
	_pWebView.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);
		this._on_apply_accessibilityleavemessage();
	};

	_pWebView.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._ifrm_elem) {
			this._ifrm_elem.setElementEnable(v);
		}
	};

	_pWebView.reload = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (this._isCrossDomain(this._current_url)) {
				var tmp_url = this._url;
				ifrm_elem._setUrl("");
				ifrm_elem._setUrl(tmp_url);
			}
			else {
				ifrm_elem._setGo();
			}
		}
	};

	_pWebView.goBack = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (!this._isCrossDomain(this._current_url)) {
				return ifrm_elem._setBack();
			}
		}
	};

	_pWebView.goForward = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (!this._isCrossDomain(this._current_url)) {
				return ifrm_elem._setForward();
			}
		}
	};

	_pWebView.on_load_handler = function (docurl) {
		if (this._blockLoadFlag) {
			return;
		}
		this._current_url = docurl;
		this.document = this._ifrm_elem._getDoc();
		if (docurl != "about:blank") {
			this._blockLoadFlag = true;
			this.on_fire_onloadcompleted(this, docurl == "" ? this.url : docurl);
		}
	};

	_pWebView.callScript = function (func) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			{

				return nexacro._WebViewPluginElement.prototype.injectScript.apply(ifrm_elem, arguments);
			}
		}
	};


	_pWebView.addScriptOnDocumentCreated = function () {
	};
	_pWebView.removeScriptOnDocumentCreated = function () {
	};
	_pWebView.clearScriptOnDocumentCreated = function () {
	};







	_pWebView.addEventHandler = function (evt_id, func, target) {
		if (evt_id in this._event_list == false) {
			this._event_list[evt_id] = 1;
		}
		return nexacro.Component.prototype.addEventHandler.call(this, evt_id, func, target);
	};

	_pWebView.removeEventHandler = function (evt_id, func, target) {
		return nexacro.Component.prototype.removeEventHandler.call(this, evt_id, func, target);
	};


	_pWebView._isCrossDomain = function (target) {
		if (target == "") {
			return true;
		}

		var base = this._getRefFormBaseUrl();
		if (base.match(/^(file):\/\//)) {
			return false;
		}

		var regExp = /^(https?):\/\/([^:\/\s]+)(:([^\/]*))?((\/[^\s/\/]+)*)?\/?([^#\s\?]*)(\?([^#\s]*))?(#(\w*))?$/;
		var u1 = target.match(regExp);
		var u2 = base.match(regExp);

		if (!u1 || !u2) {
			return true;
		}

		if (u1[2] != u2[2]) {
			return true;
		}
		return false;
	};

	_pWebView._on_apply_accessibilityleavemessage = function () {
		var leavemessage = this.accessibilityleavemessage;
		if (leavemessage) {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem._setElementLeaveMessage(leavemessage);
			}
		}
	};

	_pWebView.updateWindow = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.updateWindow();
		}
	};


	delete _pWebView;
}

