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

if (!nexacro.Div) {
	nexacro.Div = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.form = new nexacro._InnerForm("form", 0, 0, width, height, null, null, null, null, null, null, this);
	};

	var _pDiv = nexacro._createPrototype(nexacro.Component, nexacro.Div);
	nexacro.Div.prototype = _pDiv;
	_pDiv._type_name = "Div";


	_pDiv._cell_elem = null;


	_pDiv.async = true;
	_pDiv.url = "";
	_pDiv.urlchangeeffect = "";
	_pDiv.text = "";
	_pDiv.textAlign = "center";
	_pDiv.verticalAlign = "middle";

	_pDiv.formscrollbarbarminsize = undefined;
	_pDiv.formscrollbarbaroutsize = undefined;
	_pDiv.formscrollbardecbuttonsize = undefined;
	_pDiv.formscrollbarincbuttonsize = undefined;
	_pDiv.formscrollbarsize = undefined;
	_pDiv.formscrollbartrackbarsize = undefined;
	_pDiv.formscrollbartype = undefined;
	_pDiv.formscrollindicatorsize = undefined;
	_pDiv.formscrolltype = undefined;


	_pDiv._urlchangeeffect = null;
	_pDiv._is_loadedform = false;


	_pDiv._apply_client_padding = false;
	_pDiv._is_simple_control = true;
	_pDiv._is_container = true;


	_pDiv.accessibilityrole = "form";

	_pDiv._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmousewheel" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"oncontextmenu" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"onmouseup" : 1, 
		"onmousedown" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};

	_pDiv.on_create_contents = function () {
		if (!this.url) {
			this.form.createComponent(true);
		}
	};

	_pDiv._applyElementVisible = function (v) {
		this._control_element.setElementDisplay(v ? "" : "none");
		this._applyScrollPos();
	};

	_pDiv.on_created_contents = function (win) {
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (!form._url) {
				if (this.parent && this.parent instanceof nexacro.Tab && this.parent.preload == false) {
				}
				else {
					form.loadForm(this.url, this.async, true, this._url);
				}
			}

			if (form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}

		this.on_apply_text();
		this._recalcLayout();
	};

	_pDiv.on_destroy_contents = function () {
		this._destroyTextElement();
		this._destroyFormControl();

		this._user_property_list = null;
	};

	_pDiv.on_create_contents_command = function () {
		var str = "";

		return str;
	};

	_pDiv.on_attach_contents_handle = function (win) {
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (this.url && form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}

		this.on_apply_text();
		this._recalcLayout();
	};

	_pDiv.on_change_containerRect = function (width, height) {
		if (this._cell_elem) {
			this._cell_elem.setElementSize(width, height);
		}

		this._recalcLayout();
	};

	_pDiv.on_change_containerPos = function () {
	};

	_pDiv.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}
	};

	_pDiv.on_apply_text = function (text) {
		var form = this.form;
		if (form && ((form._child_list && form._child_list.length > 0) || this.url) || !this._is_alive) {
			return;
		}

		var control_elem = form.getElement();
		if (control_elem) {
			if (!text) {
				text = this._displaytext;
			}

			var cell_elem = this._cell_elem;
			if (!cell_elem && text) {
				var win = this._getWindow();
				cell_elem = this._cell_elem = new nexacro.TextBoxElement(control_elem);
				cell_elem.create(win);
			}

			if (cell_elem) {
				cell_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				cell_elem.setElementVerticalAlign(this.verticalAlign);
				cell_elem.setElementTextAlign(this.textAlign);
				cell_elem.setElementText(text);
			}
		}
	};

	_pDiv.set_url = function (v) {
		if (this.url != v) {
			this.url = v;
			this.on_apply_url();
		}
	};

	_pDiv.on_apply_url = function (reload) {
		var form = this.form;
		if (!form) {
			return;
		}

		var url = this.url;
		var confirm_message, pos;

		if (url && url.length > 0) {
			nexacro._getLayoutManager().clearLayout(form);

			if (this._is_loadedform && form._is_loaded && reload != true) {
				confirm_message = form._on_beforeclose();
				if (form._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				var async = form._async;
				form._on_close();
				form.set_tooltiptext("");

				this._destroyFormControl();
				pos = this._getFormPosition();
				form = this.form = new nexacro._InnerForm("form", pos.left, pos.top, pos.width, pos.height, null, null, null, null, null, null, this);
				form._async = async;
				form.createComponent();

				this._is_loadedform = false;
			}

			var _parent = this.parent;
			if (_parent != null) {
				while (!_parent._url) {
					_parent = _parent.parent;
				}

				form.loadForm(url, this.async, true, _parent._url);
			}

			this._destroyTextElement();
		}
		else {
			if (form._is_loaded) {
				confirm_message = form._on_beforeclose();
				if (form._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				form._on_close();
				form.set_tooltiptext("");

				this._is_loadedform = false;
			}

			this._destroyFormControl();

			pos = this._getFormPosition();
			form = this.form = new nexacro._InnerForm("form", pos.left, pos.top, pos.width, pos.height, null, null, null, null, null, null, this);
			form.createComponent();

			this._destroyTextElement();

			this.on_apply_text();
		}
	};

	_pDiv.set_urlchangeeffect = function (v) {
		this.urlchangeeffect = v;
		if (v) {
			if (this._urlchangeeffect == null || this._urlchangeeffect.value != v) {
				var urlchangeeffect = nexacro.TransitionEffectObject(v);
				this._urlchangeeffect = urlchangeeffect;
			}
		}
		else {
			if (this._urlchangeeffect) {
				this._urlchangeeffect = null;
			}
		}
	};

	_pDiv.set_async = function (v) {
		v = nexacro._toBoolean(v);
		if (this.async != v) {
			this.async = v;
			if (this.form) {
				this.form._async = v;
			}
		}
	};

	_pDiv._on_apply_formscroll = function () {
		if (this.formscrollbarbarminsize !== undefined) {
			nexacro.Component.prototype.set_scrollbarbarminsize.call(this.form, this.formscrollbarbarminsize);
		}

		if (this.formscrollbarbaroutsize !== undefined) {
			nexacro.Component.prototype.set_scrollbarbaroutsize.call(this.form, this.formscrollbarbaroutsize);
		}

		if (this.formscrollbardecbuttonsize !== undefined) {
			nexacro.Component.prototype.set_scrollbardecbuttonsize.call(this.form, this.formscrollbardecbuttonsize);
		}

		if (this.formscrollbarincbuttonsize !== undefined) {
			nexacro.Component.prototype.set_scrollbarincbuttonsize.call(this.form, this.formscrollbarincbuttonsize);
		}

		if (this.formscrollbarsize !== undefined) {
			nexacro.Component.prototype.set_scrollbarsize.call(this.form, this.formscrollbarsize);
		}

		if (this.formscrollbartrackbarsize !== undefined) {
			nexacro.Component.prototype.set_scrollbartrackbarsize.call(this.form, this.formscrollbartrackbarsize);
		}

		if (this.formscrollbartype !== undefined) {
			nexacro.Component.prototype.set_scrollbartype.call(this.form, this.formscrollbartype);
		}

		if (this.formscrollindicatorsize !== undefined) {
			nexacro.Component.prototype.set_scrollindicatorsize.call(this.form, this.formscrollindicatorsize);
		}

		if (this.formscrolltype !== undefined) {
			nexacro.Component.prototype.set_scrolltype.call(this.form, this.formscrolltype);
		}
	};
	_pDiv.set_padding = nexacro._emptyFn;

	_pDiv.reload = function () {
		this.on_apply_url(true);
	};

	_pDiv.getFocus = function () {
		return this.parent ? this.parent.getFocus() : null;
	};

	_pDiv.getParentContext = function () {
		return this.parent;
	};

	_pDiv.getSetter = function (name, fnname) {
		if (!this._user_property_list) {
			this._user_property_list = [];
		}
		this._user_property_list[name] = 1;
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	_pDiv.addEventHandler = function (evt_id, func, target) {
		var retn = nexacro.Component.prototype.addEventHandler.call(this, evt_id, func, target);

		var form = this.form;

		switch (evt_id) {
			case "oncontextmenu":
				this._context_func = func;
				form._addEventHandler(evt_id, this.on_fire_innerFormContextmenu, target);
				break;
		}
		return retn;
	};

	_pDiv.on_fire_innerFormContextmenu = function (obj, e) {
		var target = this;

		if (obj instanceof nexacro._InnerForm) {
			obj.parent._context_func.call(target, obj.parent, e);
		}
	};

	_pDiv.getOwnerFrame = function () {
		return this._getOwnerFrame();
	};

	_pDiv.addChild = function (id, obj) {
		var form = this.form;
		var ret = form.addChild(id, obj);

		return ret;
	};

	_pDiv.insertChild = function (idx, id, obj) {
		var form = this.form;
		var ret = form.insertChild(idx, id, obj);

		return ret;
	};

	_pDiv.removeChild = function (id) {
		var obj = null;
		if (!this._is_alive && id === "form") {
			obj = this.form;
			if (obj) {
				var is_focused = false;
				var _window = this._getWindow();
				if (_window) {
					is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
				}

				if (obj._control_element) {
					if (obj._control_element) {
						obj._control_element._removeFromContainer();
					}

					if (is_focused) {
						if (obj instanceof nexacro.Form) {
							obj._on_deactivate();
						}

						_window._removeFromCurrentFocusPath(obj, true);
					}
				}
			}

			delete this[id];
		}
		else {
			var form = this.form;
			obj = form.removeChild(id);
		}

		return obj;
	};

	_pDiv.addLayout = function (name, obj) {
		var form = this.form;
		if (form) {
			form.addLayout(name, obj);
		}
	};

	_pDiv.setContents = function (str) {
		var ret = this._setContents(str);
		return ret;
	};

	_pDiv.getCurrentLayoutID = nexacro._emptyFn;

	_pDiv.set_formscrollbarbarminsize = function (formscrollbarbarminsize) {
		if (formscrollbarbarminsize !== undefined) {
			formscrollbarbarminsize = parseInt(formscrollbarbarminsize);
			if (isNaN(formscrollbarbarminsize) || formscrollbarbarminsize < 0) {
				return;
			}
		}

		if (this.formscrollbarbarminsize != formscrollbarbarminsize) {
			this.formscrollbarbarminsize = formscrollbarbarminsize;
			nexacro.Component.prototype.set_scrollbarbarminsize.call(this.form, formscrollbarbarminsize);
		}
	};

	_pDiv.set_formscrollbarbaroutsize = function (formscrollbarbaroutsize) {
		if (formscrollbarbaroutsize !== undefined) {
			formscrollbarbaroutsize = parseInt(formscrollbarbaroutsize);
			if (isNaN(formscrollbarbaroutsize) || formscrollbarbaroutsize < 0) {
				return;
			}
		}

		if (this.formscrollbarbaroutsize != formscrollbarbaroutsize) {
			this.formscrollbarbaroutsize = formscrollbarbaroutsize;
			nexacro.Component.prototype.set_scrollbarbaroutsize.call(this.form, formscrollbarbaroutsize);
		}
	};

	_pDiv.set_formscrollbardecbuttonsize = function (formscrollbardecbuttonsize) {
		if (formscrollbardecbuttonsize !== undefined) {
			formscrollbardecbuttonsize = parseInt(formscrollbardecbuttonsize);
			if (isNaN(formscrollbardecbuttonsize)) {
				return;
			}
		}

		if (this.formscrollbardecbuttonsize != formscrollbardecbuttonsize) {
			this.formscrollbardecbuttonsize = formscrollbardecbuttonsize;
			nexacro.Component.prototype.set_scrollbardecbuttonsize.call(this.form, formscrollbardecbuttonsize);
		}
	};

	_pDiv.set_formscrollbarincbuttonsize = function (formscrollbarincbuttonsize) {
		if (formscrollbarincbuttonsize !== undefined) {
			formscrollbarincbuttonsize = parseInt(formscrollbarincbuttonsize);
			if (isNaN(formscrollbarincbuttonsize)) {
				return;
			}
		}

		if (this.formscrollbarincbuttonsize != formscrollbarincbuttonsize) {
			this.formscrollbarincbuttonsize = formscrollbarincbuttonsize;
			nexacro.Component.prototype.set_scrollbarincbuttonsize.call(this.form, formscrollbarincbuttonsize);
		}
	};

	_pDiv.set_formscrollbarsize = function (formscrollbarsize) {
		if (formscrollbarsize !== undefined) {
			formscrollbarsize = parseInt(formscrollbarsize);
			if (isNaN(formscrollbarsize)) {
				return;
			}
		}

		if (this.formscrollbarsize != formscrollbarsize) {
			this.formscrollbarsize = formscrollbarsize;
			nexacro.Component.prototype.set_scrollbarsize.call(this.form, formscrollbarsize);
		}
	};

	_pDiv.set_formscrollbartrackbarsize = function (formscrollbartrackbarsize) {
		if (formscrollbartrackbarsize !== undefined) {
			formscrollbartrackbarsize = parseInt(formscrollbartrackbarsize);
			if (isNaN(formscrollbartrackbarsize) || formscrollbartrackbarsize < -1) {
				return;
			}
		}

		if (this.formscrollbartrackbarsize != formscrollbartrackbarsize) {
			this.formscrollbartrackbarsize = formscrollbartrackbarsize;
			nexacro.Component.prototype.set_scrollbartrackbarsize.call(this.form, formscrollbartrackbarsize);
		}
	};

	_pDiv.set_formscrollbartype = function (formscrollbartype) {
		if (this.formscrollbartype != formscrollbartype) {
			this.formscrollbartype = nexacro.Component.prototype.set_scrollbartype.call(this.form, formscrollbartype);
		}
	};

	_pDiv.set_formscrollindicatorsize = function (formscrollindicatorsize) {
		if (formscrollindicatorsize !== undefined) {
			formscrollindicatorsize = parseInt(formscrollindicatorsize);
			if (isNaN(formscrollindicatorsize)) {
				return;
			}
		}

		if (this.formscrollindicatorsize != formscrollindicatorsize) {
			this.formscrollindicatorsize = formscrollindicatorsize;
			nexacro.Component.prototype.set_scrollindicatorsize.call(this.form, formscrollindicatorsize);
		}
	};

	_pDiv.set_formscrolltype = function (formscrolltype) {
		if (this.formscrolltype != formscrolltype) {
			this.formscrolltype = nexacro.Component.prototype.set_scrolltype.call(this.form, formscrolltype);
		}
	};

	_pDiv.scrollTo = function (x, y) {
		if (this.form) {
			this.form.scrollTo(x, y);
		}
	};

	_pDiv._on_activate = function () {
		nexacro.Component.prototype._on_activate.call(this);

		if (this.form) {
			this.form._on_activate();
		}

		return true;
	};

	_pDiv._on_deactivate = function () {
		nexacro.Component.prototype._on_deactivate.call(this);

		if (this.form) {
			this.form._on_deactivate();
		}

		return true;
	};

	_pDiv._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
	};

	_pDiv._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
	};

	_pDiv._clearUserFunctions = nexacro._emptyFn;

	_pDiv._loadedForm = function () {
		if (this._getLastFocused()) {
			this._last_focused = this.form;
		}
		this._on_apply_formscroll();
		this._is_loadedform = true;
	};

	_pDiv._destroyTextElement = function () {
		if (this._cell_elem) {
			this._cell_elem.destroy();
			this._cell_elem = null;
		}
	};

	_pDiv._destroyFormControl = function () {
		if (this.form) {
			this.form._destroy();
			this.form = null;
		}
	};

	_pDiv._loadInclude = function (mainurl, url, notuseasync, service_url) {
		var asyncmode = this.async;
		var parent_context = this.getParentContext();
		var is_async;

		if (asyncmode) {
			while (parent_context && parent_context._is_form) {
				is_async = parent_context._getAsync();
				if (!parent_context._is_fired_onload && is_async === false) {
					asyncmode = false;
					break;
				}
				parent_context = parent_context.getParentContext();
			}
		}

		if (!this._is_created) {
		}

		this._loadIncludeJS.call(this, mainurl, url, asyncmode, service_url);
	};

	_pDiv._loadIncludeJS = function (mainurl, url, asyncmode, service_url) {
		var service;
		if (service_url && service_url.length > 0) {
			service = nexacro._getServiceObject(service_url);
		}
		else {
			service = nexacro._getServiceObject(url);
		}

		this._load_manager.loadIncludeModule(url, null, asyncmode, service);
	};

	_pDiv._closeForm = function () {
		this._destroyFormControl();
	};

	_pDiv._recalcLayout = function () {
		var form = this.form;
		if (form) {
			var pos = this._getFormPosition();

			form._setPos(pos.left, pos.top);
			form._setSize(pos.width, pos.height);
		}
	};

	_pDiv._on_orientationchange = function (orientation) {
		if (this.form) {
			this.form._on_orientationchange(orientation);
		}
	};

	_pDiv._setContents = function (str) {
		var doc = nexacro._parseXMLDocument(str);
		var layouts = doc.getElementsByTagName("Layouts")[0];

		if (!layouts) {
			layouts = doc;
		}

		var layout = layouts.getElementsByTagName("Layout")[0];

		if (!layout) {
			return false;
		}

		var ret = true;

		var node = layout.firstChild;

		while (node) {
			if (node.nodeType == 1) {
				var className = nexacro._getRegisterClass(node.tagName);
				if (!className) {
					return false;
				}
				var fnConstructor = nexacro._executeGlobalEvalStr(className);
				if (!fnConstructor) {
					return false;
				}

				if (fnConstructor.prototype && fnConstructor.prototype._is_component) {
					var attr = {
					};
					var attr_props = {
					};
					for (var i = 0; i < node.attributes.length; i++) {
						var name = node.attributes[i].name;
						if (/^(id|left|top|width|height|right|bottom|minwidth|maxwidth|minheight|maxheight|)$/.test(name)) {
							attr[name] = node.attributes[i].value;
						}
						else {
							attr_props[name] = node.attributes[i].value;
						}
					}

					var obj = new fnConstructor(attr["id"], attr["left"], attr["top"], attr["width"], attr["height"], attr["right"], attr["bottom"], attr["minwidth"], attr["maxwidth"], attr["minheight"], attr["maxheight"], this.form);

					for (var v in attr_props) {
						if (obj["set_" + v]) {
							obj["set_" + v](attr_props[v]);
						}
						else {
							obj[v] = attr_props[v];
						}
					}

					if (node.firstChild) {
						var childnode = node.firstChild;

						var strXML = "";
						while (childnode) {
							if (node.nodeType == 1) {
								strXML += nexacro._documentToXml(childnode);
							}

							childnode = childnode.nextSibling;
						}
						ret = obj._setContents(strXML);
					}

					if (!ret) {
						return ret;
					}

					this.form.addChild(obj.id, obj);

					obj.show();
				}
			}
			node = node.nextSibling;
		}

		return ret;
	};

	_pDiv._getFormPosition = function () {
		var left = 0;
		var top = 0;
		var width = 0;
		var height = 0;

		width = this._getClientWidth();
		height = this._getClientHeight();

		this._initCSSSelector();

		return {
			left : left, 
			top : top, 
			width : width, 
			height : height
		};
	};

	_pDiv._getComponentsByTaborder = function () {
		if (!this.form._isEnable() || !this.form._child_list || this.form._child_list.length == 0) {
			return null;
		}

		return [this.form];
	};

	_pDiv._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchNextTabFocus.call(this, current, bSearchFromFirst, opt_force_cycle, filter_type);

		if (bSearchFromFirst && ret && ret[0] === this.form) {
			return this.parent._searchNextTabFocus(this, undefined, undefined, filter_type);
		}

		return ret;
	};

	_pDiv._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchPrevTabFocus.call(this, current, bSearchFromLast, opt_force_cycle, filter_type);

		if (bSearchFromLast && ret && ret[0] === this.form) {
			return [this];
		}

		return ret;
	};

	_pDiv._getTabOrderNext = function (current, direction, filter_type) {
		return nexacro.FormBase.prototype._getTabOrderNext.call(this, current, direction, filter_type);
	};

	_pDiv._getTabOrderFirst = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderFirst.call(this, filter_type);
	};

	_pDiv._getTabOrderLast = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderLast.call(this, filter_type);
	};

	delete _pDiv;
}
