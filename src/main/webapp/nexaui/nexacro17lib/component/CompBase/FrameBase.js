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

if (!nexacro.Frame) {
	"use strict";
	var _process = true;
	nexacro.Frame = function (id, left, top, width, height, right, bottom, parent, is_main) {
		nexacro.FormBase.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		this._frames = new nexacro.Collection();

		if (parent) {
			this._is_top_frame = (parent._type_name == "Application");
		}

		this._is_main = is_main;
	};

	var _pFrame = nexacro._createPrototype(nexacro.FormBase, nexacro.Frame);
	nexacro.Frame.prototype = _pFrame;

	_pFrame._type_name = "Frame";

	_pFrame.titlebar = null;
	_pFrame.statusbar = null;
	_pFrame.openalign = "";

	_pFrame.openstatus = "normal";
	_pFrame.showcascadestatustext = false;
	_pFrame.showcascadetitletext = true;
	_pFrame.showstatusbar = false;
	_pFrame.showtitlebar = true;
	_pFrame.showtitleicon = true;
	_pFrame.statustext = "";
	_pFrame.titletext = "";
	_pFrame.topmost = false;
	_pFrame.statusbarheight = undefined;
	_pFrame.titlebarheight = undefined;
	_pFrame.titlebartype = "normal";

	_pFrame.titlebarbuttonsize = undefined;
	_pFrame.titlebarbuttongap = undefined;
	_pFrame.progressbardirection = undefined;
	_pFrame.progressbargap = undefined;
	_pFrame.progressbarsmooth = undefined;
	_pFrame.progressbarsize = undefined;


	_pFrame._event_list = 
		{
		"onactivate" : 1, 
		"ondeactivate" : 1, 
		"onbeforeclose" : 1, 
		"onclose" : 1, 
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
		"ondevicebuttondown" : 1, 
		"ondevicebuttonpush" : 1, 
		"ondevicebuttonup" : 1, 
		"onsyscommand" : 1, 
		"onorientationchange" : 1
	};


	_pFrame._state_openstatus = 0;
	_pFrame._is_click_openstatus = false;
	_pFrame._is_verticalmin = false;
	_pFrame._restore_position = null;
	_pFrame._starttrack_position = null;
	_pFrame._resizemode = null;
	_pFrame._defaulttitleheight = 20;
	_pFrame._defaultstatusheight = 20;
	_pFrame._titlebarheight = undefined;
	_pFrame._statusbarheight = undefined;
	_pFrame._is_frameset = false;
	_pFrame._is_frame = true;
	_pFrame._is_form = false;
	_pFrame._window = null;
	_pFrame._activate = false;
	_pFrame._window_type = -1;
	_pFrame.accessibilityrole = "none";
	_pFrame._is_scrollable = false;



	_pFrame.set_padding = function () {
	};

	_pFrame.set_titlebarheight = function (titlebarheight) {
		if (this.titlebarheight != titlebarheight) {
			this.titlebarheight = titlebarheight;
			this._titlebarheight = this._getAppliedTitleHeight(parseInt(titlebarheight));
			if (this._isShowTitleBar()) {
				this.on_apply_titlebarheight(this._titlebarheight);
			}
		}
	};

	_pFrame.on_apply_titlebarheight = function (titlebarheight) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setTitleBarControl(this.titlebar, titlebarheight);
		}
	};

	_pFrame.set_statusbarheight = function (statusbarheight) {
		if (this.statusbarheight != statusbarheight) {
			this.statusbarheight = statusbarheight;
			this._statusbarheight = this._getAppliedStatusHeight(parseInt(statusbarheight));
			this.on_apply_statusbarheight(this._statusbarheight);
		}
	};

	_pFrame.on_apply_statusbarheight = function (statusbarheight) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setStatusBarControl(this.statusbar, statusbarheight);
		}
	};


	_pFrame.set_titlebartype = function (titlebartype) {
		if (this.titlebartype != titlebartype) {
			this.titlebartype = titlebartype;
			this.on_apply_titlebartype(titlebartype);
		}
	};

	_pFrame.on_apply_titlebartype = function () {
	};

	_pFrame.set_titlebarbuttonsize = function (titlebarbuttonsize) {
		if (this.titlebarbuttonsize != titlebarbuttonsize) {
			this.titlebarbuttonsize = titlebarbuttonsize;
			this.on_apply_titlebarbuttonsize(titlebarbuttonsize);
		}
	};

	_pFrame.on_apply_titlebarbuttonsize = function (titlebarbuttonsize) {
		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar.set_buttonsize(titlebarbuttonsize);
		}
	};


	_pFrame.set_titlebarbuttongap = function (titlebarbuttongap) {
		titlebarbuttongap = parseInt(titlebarbuttongap);
		if (this.titlebarbuttongap != titlebarbuttongap) {
			this.titlebarbuttongap = titlebarbuttongap;
			this.on_apply_titlebarbuttongap(titlebarbuttongap);
		}
	};

	_pFrame.on_apply_titlebarbuttongap = function (titlebarbuttongap) {
		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar.set_buttongap(titlebarbuttongap);
		}
	};

	_pFrame.set_progressbardirection = function (progressbardirection) {
		if (this.progressbardirection != progressbardirection) {
			this.progressbardirection = progressbardirection;
			this.on_apply_progressbardirection(progressbardirection);
		}
	};

	_pFrame.on_apply_progressbardirection = function (progressbardirection) {
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar.set_progressbardirection(progressbardirection);
		}
	};

	_pFrame.set_progressbargap = function (progressbargap) {
		progressbargap = parseInt(progressbargap);
		if (this.progressbargap != progressbargap) {
			this.progressbargap = progressbargap;
			this.on_apply_progressbargap(progressbargap);
		}
	};
	_pFrame.on_apply_progressbargap = function (progressbargap) {
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar.set_progressbargap(progressbargap);
		}
	};

	_pFrame.set_progressbarsmooth = function (progressbarsmooth) {
		progressbarsmooth = nexacro._toBoolean(progressbarsmooth);
		if (this.progressbarsmooth != progressbarsmooth) {
			this.progressbarsmooth = progressbarsmooth;
			this.on_apply_progressbarsmooth(progressbarsmooth);
		}
	};

	_pFrame.on_apply_progressbarsmooth = function (progressbarsmooth) {
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar.set_progressbarsmooth(progressbarsmooth);
		}
	};

	_pFrame.set_progressbarsize = function (progressbarsize) {
		progressbarsize = parseInt(progressbarsize);
		if (this.progressbarsize != progressbarsize) {
			this.progressbarsize = progressbarsize;
			this.on_apply_progressbarsize(progressbarsize);
		}
	};

	_pFrame.on_apply_progressbarsize = function (progressbarsize) {
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar.set_progressbarsize(progressbarsize);
		}
	};

	_pFrame._on_window_loaded = nexacro._emptyFn;

	_pFrame.on_created_contents = function (win) {
		var titlebar = this.titlebar;
		if (this._isShowTitleBar() && titlebar) {
			this._applyTitleBarProperties();
			titlebar.on_created(win);
		}

		var statusbar = this.statusbar;
		if (statusbar) {
			this._applyStatusBarProperties();
			statusbar.on_created(win);
		}
	};

	_pFrame.createComponent = function (bCreateOnly) {
		var parent_elem = null;
		if (this._is_window == false) {
			parent_elem = this.parent._control_element;
			if (!parent_elem) {
				return false;
			}
		}
		else {
			if (this._window) {
				nexacro._checkWindowActive(this._window);
			}
		}

		var control_elem = this._control_element;
		if (!control_elem) {
			if (this._unique_id.length <= 0) {
				this._unique_id = (this.parent && this.parent._unique_id) ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
			}
			control_elem = this.on_create_control_element(parent_elem);

			this._initControl(control_elem);
			this._initContents(control_elem);

			if (nexacro._enableaccessibility) {
				this.on_apply_accessibility();
			}

			if (!bCreateOnly && parent_elem && parent_elem.handle) {
				this.on_created();
			}
		}
		return true;
	};

	_pFrame._isShowTitleBar = function () {
		return this.showtitlebar;
	};

	_pFrame._isShowStatusBar = function () {
		return this.showstatusbar;
	};

	_pFrame.on_create_contents = function () {
		this.titlebar = this._createTitleBar();
		if (this._isShowTitleBar()) {
			this._setNotifyTitleBar();
		}
		if (this._isShowStatusBar()) {
			this.statusbar = this._createStatusBar();
		}

		if (!nexacro._is_loaded_application) {
			this._on_focus(true);
		}
	};

	_pFrame.on_created = function (_window) {
		var is_created = this._is_created;
		var titlebar = this.titlebar;
		if (this._isShowTitleBar() && titlebar) {
			this._applyTitleBarProperties();
		}

		var statusbar = this.statusbar;
		if (statusbar) {
			this._applyStatusBarProperties();
		}

		if (nexacro._isEmbedded) {
			if (this.form) {
				if (this.form._control_element) {
					this.form._on_load(this, this._url);
				}
			}

			nexacro.FormBase.prototype.on_created.call(this, _window);
		}
		else {
			nexacro.FormBase.prototype.on_created.call(this, _window);

			if (this.form) {
				if (this.form._control_element) {
					this.form._on_load(this, this._url);
				}
			}
		}

		if (!is_created && this._state_openstatus != 0) {
			var cur_enableevent = this.enableevent;
			var cur_openstatus = this.openstatus;

			this.enableevent = false;
			this.openstatus = "normal";
			this._state_openstatus = 0;
			this._on_syscommand(this._control_element, cur_openstatus);

			this.enableevent = cur_enableevent;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem._setResizable(this._canDragResize());
		}

		if (this._is_window) {
			this._applyTitleText();
			this._applyStatusText();
		}
	};

	_pFrame.on_destroy_contents = function (callremovechild) {
		if (this.statusbar) {
			this.statusbar.destroyComponent(callremovechild);
			this.statusbar = null;
		}
		if (this.titlebar) {
			this.titlebar.destroyComponent(callremovechild);
			this.titlebar = null;
		}
	};

	_pFrame._createTitleBar = function () {
		var titlebar = this.titlebar;
		if (!titlebar) {
			titlebar = new nexacro.TitleBarControl("titlebar", 0, 0, this._adjust_width, 0, null, null, null, null, null, null, this);
		}

		if (this._isTopFrame()) {
			titlebar._hittest_type = "caption";
		}
		else {
			if (this && this._is_frame && this._is_window && this._dragmovetype != 0) {
				titlebar._hittest_type = "caption";
			}
		}
		titlebar.createComponent(true);
		return titlebar;
	};

	_pFrame._setNotifyTitleBar = function () {
		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar._setNotifyHandler(this, this._on_minbutton_click, this._on_maxbutton_click, this._on_normalbutton_click, this._on_closebutton_click, this._on_titlebar_dblclick);
		}
	};

	_pFrame._createStatusBar = function () {
		var statusbar;
		if (this._isTopFrame()) {
			statusbar = new nexacro._MainStatusBarControl("statusbar", 0, 0, this._adjust_width, 0, null, null, null, null, null, null, this);
		}
		else {
			statusbar = new nexacro.StatusBarControl("statusbar", 0, 0, this._adjust_width, 0, null, null, null, null, null, null, this);
		}

		statusbar.createComponent(true);

		return statusbar;
	};

	_pFrame._applyStatusBarProperties = function () {
		var statusbar = this.statusbar;
		if (statusbar) {
			var value = this.progressbardirection;
			if (value) {
				statusbar.set_progressbardirection(value);
			}

			value = this.progressbargap;
			if (value != undefined) {
				statusbar.set_progressbargap(value);
			}

			value = this.progressbarsmooth;
			if (value) {
				statusbar.set_progressbarsmooth(value);
			}

			value = this.progressbarsize;
			if (value != undefined) {
				statusbar.set_progressbarsize(value);
			}


			value = this._getStatusText(this.showcascadestatustext);
			if (value) {
				statusbar.set_text(value);
			}

			value = this._statusbarheight !== undefined ? this._statusbarheight : (this._statusbarheight = this._getAppliedStatusHeight(this._defaultstatusheight));
			if (value) {
				this.on_apply_statusbarheight(value);
			}

			statusbar.set_resizable(this._canDragResize());
		}
	};

	_pFrame._applyTitleBarProperties = function () {
		var titlebar = this.titlebar;
		if (titlebar) {
			var value = this.titlebarbuttonsize;
			if (value !== undefined) {
				titlebar.set_buttonsize(value);
			}

			titlebar.set_showtitleicon(this.showtitleicon);

			value = this.titlebarbuttongap;
			if (value !== undefined) {
				titlebar.set_buttongap(value);
			}

			value = this._getTitleText(this.showcascadetitletext);
			if (value) {
				titlebar.set_text(value);
			}

			value = this._titlebarheight !== undefined ? this._titlebarheight : (this._titlebarheight = this._getAppliedTitleHeight(this._defaulttitleheight));

			if (value) {
				this.on_apply_titlebarheight(value);
			}

			this._resetTitleAbsoluteStyle();
		}
	};

	_pFrame.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		if (changestatus == "mouseover") {
			return currentstatus;
		}

		if (changestatus == "deactivate") {
			this._changeStateActivate(value ? false : true);
			return value ? "deactivate" : "activate";
		}
		else {
			if (changestatus == "disabled" && value == true) {
				return "disabled";
			}
			if (changestatus == "focused") {
				if (value != false) {
					var win = this._getWindow();
					if (win._is_active_window == false) {
						this._changeStateFocus(true);
						return "deactivate";
					}
					else {
						this._changeStateActivate(true);
					}
				}
			}
			else {
				this._changeStateActivate(true);
			}
			return "enable";
		}
	};

	_pFrame.on_apply_status = function (status, userstatus) {
		if (status == "deactivate") {
			this._changeStateActivate(false);
		}
		else if (status == "enabled" || status == "focused" || userstatus == "pushed") {
			this._changeStateActivate(true);
		}
	};

	_pFrame.setFocus = function (bResetScroll) {
		var win = this._window;
		if (this._is_window && win && win.handle) {
			win._setFocus();
		}
		else {
			if (this._active_frame) {
				this._active_frame.setFocus();
			}
			else if (this.form) {
				this.form._setFocus();
			}
		}
	};

	_pFrame._update_position = function (bsize, bmove) {
		var old_left = this._left;
		var old_top = this._top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var update = false;

		if (this._is_window && this._window) {
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
		}
		else {
			if (this.parent) {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
			}
			else {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
			}
		}
		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;

			if (old_width == 0 || old_height == 0) {
				update = true;
			}
		}
		if (this._left != old_left || this._top != old_top) {
			bmove = true;
		}
		this.on_update_position(bsize, bmove);

		if (update) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	_pFrame._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		var val = null;

		var bRtl = this._isRtl();
		if (this._is_window && this._window) {
			width = parentWidth = width ? width : nexacro._getWindowHandleClientWidth(this._window.handle);
			height = parentHeight = height ? height : nexacro._getWindowHandleClientHeight(this._window.handle);
		}
		else {
			var parent = this.parent;
			if (parent) {
				parentWidth = parent._getClientWidth();
				parentHeight = parent._getClientHeight();
			}
		}

		var _left = left;
		var _right = right;

		for (var i = 0; i < 6; i++) {
			switch (i) {
				case 0:
					val = _left;
					if (_left != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(_left, parentWidth);
						}
						else {
							val = this._convToPixel(_left, parentHeight);
						}
					}
					if (isNumber(val) || val === null) {
						this.left = left;
						this._left = val;
						this._adjust_left = val;
					}
					break;
				case 1:
					val = top;
					if (top != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(top, parentWidth);
						}
						else {
							val = this._convToPixel(top, parentHeight);
						}
					}

					if (isNumber(val) || val === null) {
						this.top = top;
						this._top = val;
						this._adjust_top = val;
					}
					break;
				case 2:
					val = _right;
					if (_right != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(_right, parentWidth);
						}
						else {
							val = this._convToPixel(_right, parentHeight);
						}
					}

					if (isNumber(val) || val === null) {
						this.right = right;
						this._right = val;
					}

					break;
				case 3:
					val = bottom;
					if (bottom != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(bottom, parentWidth);
						}
						else {
							val = this._convToPixel(bottom, parentHeight);
						}
					}

					if (isNumber(val) || val === null) {
						this.bottom = bottom;
						this._bottom = val;
					}

					break;
				case 4:
					val = width;
					if (width != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(width, parentWidth);
						}
						else {
							val = this._convToPixel(width, parentHeight);
						}
					}

					if (isNumber(val) || val === null) {
						this.width = width;
						this._width = val;
					}

					break;
				case 5:
					val = height;
					if (height != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(height, parentWidth);
						}
						else {
							val = this._convToPixel(height, parentHeight);
						}
					}
					if (isNumber(val) || val === null) {
						this.height = height;
						this._height = val;
					}

					break;
			}
		}

		this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
		this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;

		if (this._is_window) {
			this._adjust_top = this._adjust_left = 0;
		}
		else {
			if (this._left != null || this._right != null) {
				this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;
			}
			else {
				this._adjust_left_ltr = this._adjust_left = 0;
			}
			if (this._top != null || this._bottom != null) {
				this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;
			}
			else {
				this._adjust_top = 0;
			}

			if (bRtl) {
				this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
			}
		}
	};

	_pFrame._waitCursor = function (wait_flag, context) {
		var owner_frame = this.getOwnerFrame();
		if (owner_frame) {
			owner_frame._waitCursor(wait_flag, context);
		}
	};

	_pFrame.on_get_accessibility_label = function () {
		return this._getTitleText(this.showcascadetitletext);
	};

	_pFrame.on_update_position = function (resize_flag, move_flag, update) {
		var ret = nexacro.FormBase.prototype.on_update_position.call(this, resize_flag, move_flag, update);

		if (this._is_window && nexacro._Browser == "Runtime") {
			var _window = this._window;
			if (_window) {
				this._initCSSSelector();

				if (resize_flag) {
					_window.setSize(this._adjust_width, this._adjust_height);
				}
				if (move_flag) {
					_window.moveTo(this._left, this._top);
				}
			}
		}

		return ret;
	};

	_pFrame.set_left = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_left.call(this, propVal);
	};

	_pFrame.set_top = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_top.call(this, propVal);
	};

	_pFrame.set_right = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_right.call(this, propVal);
	};

	_pFrame.set_bottom = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_bottom.call(this, propVal);
	};

	_pFrame.set_width = function (propVal) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.set_width.call(this, propVal);
	};

	_pFrame.set_height = function (propVal) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.set_height.call(this, propVal);
	};

	_pFrame.set_openstatus = function (v) {
		if (this.openstatus != v) {
			switch (v) {
				case "minimize":
				case "maximize":
					break;
				case "normal":
				default:
					if (this._state_openstatus == 2 || this._state_openstatus == 3) {
						v = "restore";
					}
					break;
			}
			this._on_syscommand(this._control_element, v);
		}
	};

	_pFrame.set_showcascadestatustext = function (v) {
		var showcascadestatustext = nexacro._toBoolean(v);
		if (this.showcascadestatustext != showcascadestatustext) {
			this.showcascadestatustext = showcascadestatustext;
			this._applyStatusText();
		}
	};

	_pFrame.set_showcascadetitletext = function (v) {
		var showcascadetitletext = nexacro._toBoolean(v);
		if (this.showcascadetitletext != showcascadetitletext) {
			this.showcascadetitletext = showcascadetitletext;
			this._applyTitleText();
		}
	};

	_pFrame.set_showstatusbar = function (v) {
		var showstatusbar = nexacro._toBoolean(v);
		if (this.showstatusbar != showstatusbar) {
			this.showstatusbar = showstatusbar;
			this.on_apply_showstatusbar(showstatusbar);
		}
	};

	_pFrame.on_apply_showstatusbar = function (bshow) {
		var statusbar = this.statusbar;
		if (bshow) {
			if (!statusbar) {
				if (this._isShowStatusBar()) {
					statusbar = this.statusbar = this._createStatusBar();
					this._applyStatusBarProperties();
					statusbar.on_created();
				}
			}
			else {
				statusbar.set_visible(true);
				this.on_apply_statusbarheight(this._statusbarheight);
			}
		}
		else {
			if (statusbar) {
				statusbar.set_visible(false);
				this.on_apply_statusbarheight(0);
			}
		}
	};

	_pFrame.set_showtitlebar = function (v) {
		var showtitlebar = nexacro._toBoolean(v);
		if (this.showtitlebar != showtitlebar) {
			this.showtitlebar = showtitlebar;
			this.on_apply_showtitlebar(showtitlebar);
		}
	};

	_pFrame.on_apply_showtitlebar = function (bshow) {
		var titlebar = this.titlebar;

		if (bshow) {
			if (this._isShowTitleBar()) {
				if (!titlebar || !titlebar._is_created) {
					titlebar = this.titlebar = this._createTitleBar();
				}

				if (!titlebar._is_created) {
					this._setNotifyTitleBar();
					this._applyTitleBarProperties();
					titlebar.on_created();
				}
			}

			titlebar.set_visible(true);
			this.on_apply_titlebarheight(this._titlebarheight);
		}
		else {
			if (titlebar) {
				titlebar.set_visible(false);
				this.on_apply_titlebarheight(0);
			}
		}

		this._applyDragMoveType();
	};

	_pFrame.set_showtitleicon = function (v) {
		var showtitleicon = nexacro._toBoolean(v);
		if (this.showtitleicon != showtitleicon) {
			this.showtitleicon = showtitleicon;
			this.on_apply_showtitleicon(showtitleicon);
		}
	};

	_pFrame.on_apply_showtitleicon = function (showtitleicon) {
		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar.set_showtitleicon(showtitleicon);
		}
	};


	_pFrame.set_statustext = function (v) {
		if (this.statustext != v) {
			this.statustext = v;
			this._applyStatusText();
		}
	};

	_pFrame.set_titletext = function (v) {
		if (this.titletext != v) {
			this.titletext = v;
			this._applyTitleText();
		}
	};

	_pFrame.set_topmost = function (v) {
		var topmost = nexacro._toBoolean(v);
		if (this.topmost != topmost) {
			this.topmost = topmost;

			if (!this._is_window) {
				return;
			}

			var _window = this._getWindow();
			if (_window) {
				nexacro._setWindowTopmost(_window.handle, topmost);
			}
		}
	};

	_pFrame._applyElementVisible = function (v) {
		this._control_element.setElementDisplay(v ? "" : "none");
	};

	_pFrame.set_visible = function (v) {
		nexacro.FormBase.prototype.set_visible.call(this, v);

		v = nexacro._toBoolean(v);

		if (this._is_window && nexacro._Browser == "Runtime") {
			var _window = this._getWindow();
			if (_window) {
				nexacro._setPopupWindowHandleVisible(_window.handle, v);
			}
		}

		if (this.visible != v) {
			var parent = this.parent;
			if (parent && parent._is_frameset && this._state_openstatus == 3 && !v) {
				var nextframe = parent._getNextOrderFrame(this);
				if (nextframe) {
					nextframe._changeOpenStatus(3);
				}
			}
		}
	};

	_pFrame.alert = function (strText, strCaption, strType) {
		nexacro._alert(this, strText, strCaption, strType);
	};

	_pFrame.confirm = function (strText, strCaption, strType) {
		return nexacro._confirm(this, strText, strCaption, strType);
	};

	_pFrame.getHandle = function () {
		return -1;
	};

	_pFrame.getNativeHandle = function () {
		if (nexacro._Browser == "Runtime") {
			var _win = this._getWindow();
			if (_win) {
				return nexacro._getWindowHwndHandle(_win.handle);
			}
		}

		return undefined;
	};

	_pFrame.getOwnerFrame = function () {
		if (this.parent && this.parent._is_frame) {
			return this.parent;
		}

		return null;
	};

	_pFrame.addChild = function (id, obj) {
		if (id && id.length <= 0) {
			return -1;
		}

		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (!obj._is_frame) {
			throw nexacro.MakeTypeError(this, "type_invalid", id);
		}

		obj.parent = this;

		if (!obj.id) {
			obj.id = obj.name = id;
		}
		else {
			obj.id = id;
		}

		this[id] = obj;
		this.all.add_item(id, obj);
		var idx = this._frames.add_item(id, obj);


		if (this._is_frameset) {
			this.frames.add_item(id, obj);
			this._zordermap.add_item(id, obj);

			if (this._max_frame && this._max_frame != obj && obj._state_openstatus == 3) {
				this._max_frame._changeOpenStatus(0);
			}

			if (this._state_openstatus == 2 || this._is_autorecalc_frame == true) {
				var control_elem = this._control_element;
				if (control_elem) {
					this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
				}
			}
		}

		return idx;
	};

	_pFrame.insertChild = function (idx, id, obj) {
		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (!obj._is_frame) {
			throw nexacro.MakeTypeError(this, "type_invalid", id);
		}

		obj.parent = this;
		if (!obj.id) {
			obj.id = obj.name = id;
		}
		else {
			obj.id = id;
		}

		this[id] = obj;
		this.all.add_item(id, obj);
		idx = this._frames.insert_item(idx, id, obj);


		if (this._is_frameset) {
			this.frames.insert_item(idx, id, obj);

			if (this._is_autorecalc_frame == true) {
				var control_elem = this._control_element;
				if (control_elem) {
					this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
				}
			}
		}

		return idx;
	};

	_pFrame.removeChild = function (id) {
		if (id && id.length <= 0) {
			return null;
		}
		if (!this[id]) {
			return null;
		}

		var obj = this[id];
		if (obj) {
			var _is_focused = false;
			var _window = this._getWindow();

			if (_window) {
				_is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
			}

			var nextframe = null;
			if (this._is_frameset && this._active_frame == obj) {
				nextframe = this._getNextOrderFrame(obj);
			}

			if (obj._is_frame) {
				if (obj._activate == true) {
					obj._changeStateActivate(false);
				}

				if (this._is_alive) {
					if (_window.id == obj._getWindow().id) {
						_window._removeFromCurrentFocusPath(obj, true);
						if (_is_focused) {
							_window._last_focused_elem = this._control_element;
						}
					}
				}

				if (_window.id != obj._getWindow().id) {
					if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
						if (obj._window_type == 5) {
							nexacro._unregisterPopupFrame(id, _window, undefined, true);
						}
						else {
							nexacro._unregisterPopupFrame(id, _window);
						}
					}
					else {
						nexacro._unregisterPopupFrame(id, _window);
					}

					nexacro._getLocalStorageforService();
				}
			}

			this._frames.remove_item(id);
			delete this[id];
			this.all.remove_item(id);
			if (this._is_frameset) {
				this.frames.remove_item(id);
				this._zordermap.remove_item(id);
			}

			if (this._is_alive && obj._control_element) {
				obj._control_element._removeFromContainer();
			}

			if (this._is_frameset) {
				var maximized = false;
				if (this._max_frame == obj) {
					this._max_frame = null;
					maximized = true;
				}

				if (this._active_frame == obj) {
					this._active_frame = null;
				}

				if (maximized && nextframe) {
					nextframe._changeOpenStatus(3);
				}
			}

			if (this._is_frameset && (this._state_openstatus == 2 || this._is_autorecalc_frame == true)) {
				var control_elem = this._control_element;
				if (control_elem) {
					this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
				}
			}

			if (nextframe) {
				nextframe.setFocus();
			}

			if (this._window_type < 0) {
				this._applyTitleText();
			}
		}
		return obj;
	};


	_pFrame.move = function (left, top, width, height, right, bottom) {
		if (!this._canMove()) {
			return;
		}

		this._move(left, top, width, height, right, bottom);
	};

	_pFrame._move = function (left, top, width, height, right, bottom) {
		var old_left = this._left;
		var old_top = this._top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;
		if (this._is_window && this._window) {
			this._adjustPosition(left, top, right, bottom, width, height, null, null);
		}
		else {
			if (this.parent) {
				this._adjustPosition(left, top, right, bottom, width, height, this.parent._getClientWidth(), this.parent._getClientHeight());
			}
			else {
				this._adjustPosition(left, top, right, bottom, width, height, null, null);
			}
		}
		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;
		}
		if (this._left != old_left || this._top != old_top) {
			bmove = true;
		}

		this.on_update_position(bsize, bmove, bmove ? false : this._isRtl(this.parent));
	};

	_pFrame.resize = function (w, h) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.resize.call(this, w, h);
	};


	_pFrame._on_titlebar_dblclick = function (obj, e) {
		if (this.resizable == false) {
			return;
		}

		switch (this._state_openstatus) {
			case 0:
				this._on_maxbutton_click();
				break;
			case 2:
			case 3:
				this._on_normalbutton_click();
				break;
		}
	};

	_pFrame._on_titlebar_starttrack = function () {
		if (!this._canDragMove()) {
			this._starttrack_position = null;
			return false;
		}

		this._starttrack_position = {
			left : this._adjust_left_ltr, 
			top : this._adjust_top, 
			width : this._adjust_width, 
			height : this._adjust_height
		};

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_starttrack(this);
		}
	};

	_pFrame._on_titlebar_endtrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_endtrack(this, x, y, dragdata);
		}

		delete this._starttrack_position;
	};

	_pFrame._on_titlebar_movetrack = function (x, y, dragdata, windowX, windowY) {
		var _pos = this._starttrack_position;
		if (_pos == null) {
			return;
		}
		if (this._window_type != 0) {
			windowX = windowX / nexacro._getDevicePixelRatio(this.titlebar.getElement());
			windowY = windowY / nexacro._getDevicePixelRatio(this.titlebar.getElement());
		}

		if (!this._is_window && (windowX != undefined && windowY != undefined)) {
			var mainframe;
			var _win = this._getWindow();
			if (_win) {
				mainframe = _win.frame;
			}
			mainframe = mainframe ? mainframe : nexacro.getApplication().mainframe;
			var mainframe_left = nexacro._toInt(mainframe.left);
			var mainframe_top = nexacro._toInt(mainframe.left);
			var mainframe_width = nexacro._toInt(mainframe._adjust_width);
			var mainframe_height = nexacro._toInt(mainframe._adjust_height);

			var winX = (windowX ? windowX : 0) + mainframe_left;
			var winY = (windowY ? windowY : 0) + mainframe_top;
			var r = mainframe_left + mainframe_width;
			var b = mainframe_top + mainframe_height;

			if (!(mainframe_left <= winX && r >= winX && mainframe_top <= winY && b >= winY)) {
				return;
			}
		}
		if (this._window_type != 0) {
			x = x *  nexacro._getDevicePixelRatio(this.titlebar.getElement());
			y = y *  nexacro._getDevicePixelRatio(this.titlebar.getElement());
		}

		if (!this._is_window) {
			this._move(_pos.left + x, _pos.top + y, _pos.width, _pos.height);
		}
		else if (this._is_window && (this._window_type == 5 || this._window_type == 2)) {
			var winPos = this._getWindow();
			this._move(winPos.left + x, winPos.top + y, _pos.width, _pos.height);
		}

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_movetrack(this, x, y, dragdata);
		}
	};

	_pFrame._on_border_starttrack = function (resize_cursor) {
		if (!this._canDragResize()) {
			this._starttrack_position = null;
			return false;
		}

		this._starttrack_position = {
			left : this._adjust_left, 
			top : this._adjust_top, 
			width : this._adjust_width, 
			height : this._adjust_height
		};

		this._resizemode = resize_cursor;
		if (this.form) {
			this.form._on_focus(true, "lbuttondown");
		}
	};

	_pFrame._on_border_endtrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}

		this._resizemode = null;

		delete this._starttrack_position;
	};

	_pFrame._on_border_movetrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}


		var left, top, width, height;
		left = this._starttrack_position.left;
		top = this._starttrack_position.top;
		width = this._starttrack_position.width;
		height = this._starttrack_position.height;

		var minmaxinfo = this._getMinMaxInfo();
		if (this._resizemode.value == "n-resize" || this._resizemode.value == "nw-resize" || this._resizemode.value == "ne-resize") {
			top += y;
			height -= y;
			if (height < minmaxinfo.cy) {
				top -= (minmaxinfo.cy - height);
				height = minmaxinfo.cy;
			}
		}
		if (this._resizemode.value == "s-resize" || this._resizemode.value == "sw-resize" || this._resizemode.value == "se-resize") {
			height += y;
			if (height < minmaxinfo.cy) {
				height += (minmaxinfo.cy - height);
			}
		}
		if (this._resizemode.value == "w-resize" || this._resizemode.value == "nw-resize" || this._resizemode.value == "sw-resize") {
			left += x;
			width -= x;
			if (width < minmaxinfo.cx) {
				left -= (minmaxinfo.cx - width);
				width = minmaxinfo.cx;
			}
		}
		if (this._resizemode.value == "e-resize" || this._resizemode.value == "ne-resize" || this._resizemode.value == "se-resize") {
			width += x;
			if (width < minmaxinfo.cx) {
				width += (minmaxinfo.cx - width);
			}
		}

		this._move(left, top, width, height);
	};

	_pFrame.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key) {
		this._changeStateActivate(true);
	};


	_pFrame._on_minbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this._on_syscommand(this._control_element, "minimize", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame._on_maxbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this._on_syscommand(this._control_element, "maximize", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame._on_normalbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this._on_syscommand(this._control_element, "restore", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame._on_closebutton_click = function (obj, e) {
		var confirm_message = this._on_beforeclose();
		if (this._checkAndConfirmClose(confirm_message) == false) {
			return;
		}

		this._on_close();

		var owner_frame = this.getOwnerFrame();
		var callremovechild = true;
		if (owner_frame) {
			owner_frame.removeChild(this.id);
			callremovechild = false;
			if (owner_frame._control_element) {
				owner_frame.on_change_containerRect(owner_frame._getClientWidth(), owner_frame._getClientHeight());
			}
		}
		else if (this._window && this._window._parentwindowforopen && this._window_type == 2) {
			if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
				nexacro._unregisterPopupFrame(this.id, this._window._parentwindowforopen, undefined, true);
			}
		}


		if (this._is_window && this._window && this._window._is_alive) {
			this._window.destroy();
		}
		else {
			this._destroy(callremovechild);
		}

		if (this._control_element) {
			this._control_element.destroy();
		}
		this._control_element = null;
	};

	_pFrame._on_beforeclose = function (root_closing_comp) {
		if (!root_closing_comp) {
			root_closing_comp = this;
		}
		var msg = "";
		var child_msg;
		if (this.form) {
			var form_msg = this.form._on_beforeclose(root_closing_comp);
			msg = this.form._appendBeforeCloseMsg(msg, form_msg);
		}

		if (this.frames) {
			var frames = this.frames;
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				child_msg = frames[i]._on_beforeclose(root_closing_comp);
				msg = this._appendBeforeCloseMsg(msg, child_msg);
			}
		}

		if (this.frame) {
			child_msg = this.frame._on_beforeclose(root_closing_comp);
			msg = this._appendBeforeCloseMsg(msg, child_msg);
		}

		var self_msg = this._on_bubble_beforeclose(root_closing_comp);
		msg = this._appendBeforeCloseMsg(msg, self_msg);

		return msg;
	};

	_pFrame._on_close = function () {
		if (this.form) {
			this.form._on_close();
		}

		if (this.frames) {
			var frames = this.frames;
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				if (frames[i]) {
					if (this._getWindow() != frames[i]._getWindow()) {
						continue;
					}

					frames[i]._on_close();
				}
			}
		}

		if (this.frame) {
			this.frame._on_close();
		}

		this._on_bubble_close();

		return true;
	};

	_pFrame._canMove = function () {
		if (this._state_openstatus != 0) {
			return false;
		}
		return true;
	};

	_pFrame._canDragMove = function () {
		if (!this._canMove()) {
			return false;
		}


		if (this._dragmovetype == 0) {
			return false;
		}

		if (!this._is_window) {
			if (this._window_type == 1 || this._window_type == 4) {
				return true;
			}

			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				if (owner_frame._on_child_starttrack == undefined) {
					return false;
				}
			}
		}

		return true;
	};

	_pFrame._canResize = function () {
		if (this._state_openstatus != 0) {
			return false;
		}
		return true;
	};

	_pFrame._canDragResize = function () {
		if (nexacro._isTouchInteraction) {
			return false;
		}

		if (!this._canResize()) {
			return false;
		}

		if (nexacro._Browser != "Runtime" && this._is_window) {
			return false;
		}

		if (this.resizable == false) {
			return false;
		}


		var owner_frame = this.getOwnerFrame();
		if (owner_frame && !this._is_window && (this._window_type != 1 && this._window_type != 4)) {
			if (owner_frame._is_autorecalc_frame) {
				return false;
			}
		}

		return true;
	};

	_pFrame._procSysCommand = function (systemcommand) {
		var statevalue = -1;
		switch (systemcommand) {
			case "restore":
				statevalue = 1;
				break;
			case "minimize":
				statevalue = 2;
				break;
			case "maximize":
				statevalue = 3;
				break;
		}

		if (this._is_window && this._window) {
			if (statevalue != (-1)) {
				this._window._procSysCommand(statevalue);
			}
		}

		if (statevalue == 1) {
			if (this._is_window && this._window && this._state_openstatus == 2) {
				systemcommand = ["normal", "restore", "minimize", "maximize"][this._prestate_openstatus];
				statevalue = this._prestate_openstatus;
			}
			else {
				systemcommand = "normal";
				statevalue = 0;
			}
		}

		if (statevalue != (-1)) {
			this.openstatus = systemcommand;
			this._changeOpenStatus(statevalue);
		}
	};

	_pFrame._on_syscommand = function (elem, systemcommand, event_bubbles, fire_comp, refer_comp) {
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			event_bubbles = this.on_fire_syscommand(this, systemcommand);
			if (event_bubbles === false) {
				return false;
			}
		}

		if ((event_bubbles !== false) && this.parent && !this.parent._is_application && !this.parent._is_form) {
			var ret = this.parent._on_syscommand(elem, systemcommand, false, fire_comp ? fire_comp : this, refer_comp);
			if (ret == false) {
				return false;
			}
		}

		if (fire_comp && fire_comp != this) {
			return true;
		}

		this._procSysCommand(systemcommand);
	};

	_pFrame._on_activate = function () {
		nexacro.FormBase.prototype._on_activate.call(this);

		if (this.form) {
			this.form._on_activate();
		}
		if (this.titlebar) {
			this.titlebar._changeStatus("deactivate", false);
		}

		return true;
	};

	_pFrame._on_deactivate = function () {
		if (this.form) {
			this.form._on_deactivate();
		}

		nexacro.FormBase.prototype._on_deactivate.call(this);
		if (this.titlebar) {
			this.titlebar._changeStatus("deactivate", true);
		}

		return true;
	};

	_pFrame._on_orientationchange = function (orientation) {
		this.on_fire_onorientationchange(orientation);

		var form = this.form;
		if (form) {
			form._on_orientationchange(orientation);
		}

		var frames = this.frames;
		if (frames) {
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				if (frames[i]) {
					if (this._getWindow() != frames[i]._getWindow()) {
						continue;
					}

					frames[i]._on_orientationchange(orientation);
				}
			}
		}

		var frame = this.frame;
		if (frame) {
			frame._on_orientationchange(orientation);
		}

		return true;
	};

	_pFrame._getRootLayerFrame = function () {
		var frame = this;
		while (frame) {
			if (frame._is_window) {
				return frame;
			}
			if (frame._window_type == 1 || frame._window_type == 4) {
				return frame;
			}
			if (frame.getOwnerFrame()) {
				frame = frame.getOwnerFrame();
			}
			else {
				break;
			}
		}
		return frame;
	};

	_pFrame._isRootLayerFrame = function () {
		if (this._is_window) {
			return true;
		}
		if (this._window_type == 1 || this._window_type == 4) {
			return true;
		}

		return false;
	};

	_pFrame.on_fire_syscommand = function (obj, systemcommand) {
		var evt, ret;

		if (this.onsyscommand && this.onsyscommand._has_handlers) {
			evt = new nexacro.SysCommandEventInfo(obj, "onsyscommand", systemcommand);
			ret = this.onsyscommand._fireCheckEvent(this, evt);
			if (!ret) {
				return false;
			}
		}
		if (this.form && this.form.onsyscommand && this.form.onsyscommand._has_handlers) {
			evt = new nexacro.SysCommandEventInfo(obj, "onsyscommand", systemcommand);
			ret = this.form.onsyscommand._fireCheckEvent(this.form, evt);
			if (!ret) {
				return false;
			}
		}

		return true;
	};

	_pFrame._applyDragMoveType = nexacro._emptyFn;
	_pFrame.lookup = nexacro._emptyFn;
	_pFrame.lookupSetter = nexacro._emptyFn;
	_pFrame.lookupFunc = nexacro._emptyFn;

	_pFrame._setVerticalMin = function (v) {
		if (this._is_verticalmin == v) {
			return;
		}

		this._is_verticalmin = v;
		var control_elem = this._control_element;
		var titlebar = this.titlebar;
		if (control_elem) {
			control_elem._is_verticalmin = v;
			if (titlebar) {
				control_elem.bringToFrontElement(titlebar.getElement());
			}
		}

		if (titlebar) {
			titlebar._setVerticalMin(v);
		}
	};

	_pFrame._resetTitleAbsoluteStyle = function () {
		var titlebar = this.titlebar;
		if (!titlebar) {
			return;
		}

		var _style = 0;
		var owner_frame = this.getOwnerFrame();
		var is_modal = (this._window_type == 1 || this._window_type == 4);
		if (!this.resizable) {
			if (this._isNested()) {
				_style |= 0x0020;
			}
			else {
				_style |= 0x0001 | 0x0002;
			}
		}
		else {
			_style |= 0x0100 | 0x0200;
		}

		if (owner_frame && !this._isRootLayerFrame()) {
			if (owner_frame._isTopFrame()) {
				_style |= 0x0010 | 0x0020 | 0x0040;
			}

			if (owner_frame.fullframemaximize == false) {
				_style |= 0x0001;
			}
		}

		if (is_modal) {
			_style |= 0x0001;
			if (!this.resizable) {
				_style |= 0x0002;
			}
		}

		titlebar._setAbsoluteStyle(_style, 0xffff);
	};

	_pFrame._getMinMaxInfo = function () {
		var cx = 110, cy = 0;
		var border = this._getCSSStyleValue("border", this._status, this._userstatus);

		if (border) {
			cx += border._getBorderWidth();
			cy += border._getBorderHeight();
		}

		if (this._isShowTitleBar()) {
			cy += this._titlebarheight;
		}
		if (this._isShowStatusBar()) {
			cy += this._statusbarheight;
		}

		return {
			cx : cx, 
			cy : cy
		};
	};

	_pFrame._isTopFrame = function () {
		return (this._is_top_frame);
	};

	_pFrame._getWindow = function () {
		if (this._is_window) {
			return this._window;
		}

		var parent = this.parent;
		if (parent) {
			return parent._getWindow();
		}

		return nexacro._findWindow(nexacro._getMainWindowHandle());
	};

	_pFrame._isEnable = function () {
		return nexacro.FormBase.prototype._isEnable.call(this);
	};

	_pFrame._isNested = function () {
		return !this._is_window;
	};

	_pFrame._getTitleText = function (brecursive) {
		return this.titletext;
	};

	_pFrame._applyTitleText = function () {
		if (this._control_element) {
			var cascade = this.showcascadetitletext;
			var titletext = this._getTitleText(cascade);
			var titlebar = this.titlebar;
			if (titlebar) {
				titlebar.set_text(titletext);
			}

			if (this._isNested()) {
				var parent = this.parent;
				if (parent && parent._is_frame) {
					parent._applyTitleText();
				}
			}

			if (this._is_window) {
				this._window._setTitleText(titletext);
			}
		}
	};

	_pFrame._applyStatusText = function () {
		if (this._control_element) {
			var cascade = this.showcascadestatustext;
			var statustext = this._getStatusText(cascade);
			var statusbar = this.statusbar;
			if (statusbar) {
				statusbar.set_text(statustext);
			}
			if (this._isNested()) {
				var parent = this.parent;
				if (parent && parent._is_frame) {
					parent._applyStatusText();
				}
			}
			if (this._is_window) {
				this._window._setStatusText(statustext);
			}
		}
	};

	_pFrame._changeOpenStatus = function (cur) {
		var pre = this._prestate_openstatus = this._state_openstatus;
		this._state_openstatus = cur;

		if (cur == 1) {
			return;
		}

		if (pre != cur) {
			var owner_frame = this.getOwnerFrame();
			var control_elem = this._control_element;
			if (pre == 2) {
				this._setVerticalMin(false);
			}

			if (pre == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frame == true && owner_frame._is_frameset == true) {
					owner_frame._max_frame = null;
				}
			}

			if (pre == 0 && (cur == 2 || cur == 3)) {
				if (!this._is_window) {
					if (this._restore_position) {
						this._restore_position = null;
					}

					if ((owner_frame && owner_frame._is_frameset && !owner_frame._is_autorecalc_frame) || (this._window_type == 1 || this._window_type == 4)) {
						this._restore_position = {
							left : this.left, 
							top : this.top, 
							width : this.width, 
							height : this.height, 
							right : this.right, 
							bottom : this.bottom
						};
					}
				}

				if (control_elem) {
					control_elem._setResizable(false);
				}
			}

			if ((pre == 2 || pre == 3) && cur == 0) {
				if (!this._is_window) {
					var restore = this._restore_position;
					if (restore) {
						if (pre == 2 || this._window_type == 1 || this._window_type == 4 || (owner_frame && owner_frame.restorechildpositiontype != "keepmaximizeposition")) {
							this._move(restore.left, restore.top, restore.width, restore.height, restore.right, restore.bottom);
						}

						this._restore_position = null;
					}
				}

				if (control_elem) {
					control_elem._setResizable(this._canDragResize());
				}
			}

			if (cur == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frame == true && owner_frame._is_frameset == true) {
					if (owner_frame._max_frame && owner_frame._max_frame != this) {
						owner_frame._max_frame._changeOpenStatus(0);
					}
					owner_frame._max_frame = this;
				}
				else if (this._window_type == 1 || this._window_type == 4) {
					var win = this._getWindow();
					this._move(0, 0, win.clientWidth, win.clientHeight);
				}
			}

			var titlebar = this.titlebar;
			if (titlebar && titlebar._is_created) {
				titlebar._changeOpenStatus(cur);
			}

			if (this._prestate_openstatus != this._state_openstatus) {
				if (owner_frame) {
					var ownerframe_elem = owner_frame.getElement();
					if (ownerframe_elem) {
						owner_frame.on_change_containerRect(owner_frame._getClientWidth(), owner_frame._getClientHeight());
					}
				}
			}

			if (cur == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frameset == true) {
					this.setFocus();
				}
			}

			this.openstatus = ["normal", "restore", "minimize", "maximize"][cur];
		}
	};

	_pFrame._changeStateActivate = function (cur) {
		if (this._activate == false && cur == true) {
			this._activate = cur;
			if (this._control_element) {
				var owner_frame = this.getOwnerFrame();
				if (owner_frame) {
					var _win = this._getWindow();
					var owner_win = owner_frame._getWindow();
					if (_win == owner_win && this._window_type != 1) {
						owner_frame._changeStateActivate(cur, this);
					}
				}


				this._applyTitleText();
				this._applyStatusText();
			}

			this._on_activate();
		}
		else if (this._activate == true && cur == false) {
			this._activate = cur;
			this._on_deactivate();
		}
	};

	_pFrame._changeStateFocus = function (cur) {
		if (this._activate == false && cur == true) {
			if (this._control_element) {
				var owner_frame = this.getOwnerFrame();
				if (owner_frame) {
					var _win = this._getWindow();
					var owner_win = owner_frame._getWindow();
					if (_win == owner_win && this._window_type != 1) {
						owner_frame._changeStateFocus(cur, this);
					}
				}

				this._applyTitleText();
				this._applyStatusText();
			}
		}
	};

	_pFrame._getAppliedTitleHeight = function (h) {
		if (h < 0) {
			return 0;
		}
		return nexacro._appliedTitleBarHeight(this, h);
	};

	_pFrame._getAppliedStatusHeight = function (h) {
		if (h < 0) {
			return 0;
		}
		return nexacro._appliedStatusBarHeight(this, h);
	};

	_pFrame._getWaitComponentElement = nexacro._emptyFn;
	_pFrame._accessibilityModalLock = nexacro._emptyFn;
	_pFrame._accessibilityModalUnLock = nexacro._emptyFn;

	nexacro.MainFrame = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Frame.call(this, id, left, top, width, height, right, bottom, parent, true);
		this._openalign = null;
		this._window = new nexacro._Window(id, null, true);
	};

	var _pMainFrame = nexacro._createPrototype(nexacro.Frame, nexacro.MainFrame);
	nexacro.MainFrame.prototype = _pMainFrame;

	_pMainFrame._type_name = "MainFrame";

	_pMainFrame.frame = null;
	_pMainFrame.resizable = true;
	_pMainFrame.layered = false;


	_pMainFrame._ref_comm = 0;
	_pMainFrame._defaulttitleheight = 30;
	_pMainFrame._defaultstatusheight = 30;
	_pMainFrame._is_window = true;
	_pMainFrame._is_autorecalc_frame = true;
	_pMainFrame.accessibilityrole = "none";


	_pMainFrame.getActiveFrame = function () {
		return this.frame;
	};


	_pMainFrame.on_createBodyFrame = nexacro._emptyFn;

	_pMainFrame.createComponent = function () {
		this.createWindow();

		if (nexacro._locale) {
			this._on_apply_locale(nexacro._locale);
		}

		return nexacro.Frame.prototype.createComponent.call(this);
	};

	_pMainFrame.createWindow = function () {
		var _win = this._window;
		if (_win == null) {
			_win = this._window = new nexacro._Window(this.name, null, true);
		}

		_win.create(null, this.name, this._width, this._height, this._left, this._top, this.resizable);
		_win.attachFrame(this, false);
		_win._setSystemMenuResizable(this.resizable);
		this._setSize(nexacro._getMainWindowWidth(_win), nexacro._getMainWindowHeight(_win));
	};

	_pMainFrame.createBodyFrame = function () {
		this.on_createBodyFrame();
	};

	_pMainFrame.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		if (this.frame) {
			this.frame._setPos(0, 0);
			this.frame._setSize(this._getClientWidth(), this._getClientHeight());
			this.frame.createComponent();

			this.frame._changeOpenStatus(3);
		}
	};

	_pMainFrame.on_created_contents = function (win) {
		nexacro.Frame.prototype.on_created_contents.call(this, win);

		if (this.frame) {
			this.frame.on_created(win);
		}

		var control_element = this._control_element;
		if (control_element) {
			control_element.setElementRtl(nexacro._rtl);
		}

		var width = this._adjust_width;
		var height = this._adjust_height;
		var after_align_pos = this._getOpenAlignPos(this._getWindow(), this._adjust_left, this._adjust_top, width, height);
		if (after_align_pos) {
			this._move(after_align_pos.left, after_align_pos.top, width, height);
		}

		if (win) {
			nexacro._refreshWindow(win.handle, true);
		}

		if (control_element) {
			nexacro._refreshWindowRegion(win.handle, control_element.handle);
		}
	};

	_pMainFrame.destroyComponent = function () {
		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}

		this._openalign = null;

		if (nexacro._com_waiting) {
			nexacro._com_waiting = false;
		}

		if (this._window && this._window._is_alive) {
			this._window.destroy();
			this._window = null;
		}
		else if (this._is_alive) {
			nexacro.Frame.prototype.destroyComponent.call(this);
		}

		return true;
	};

	_pMainFrame.on_destroy_contents = function () {
		nexacro.Frame.prototype.on_destroy_contents.call(this);
		if (this.frame) {
			this.frame.destroyComponent();
			this.frame = null;
		}
	};

	_pMainFrame._on_deactivate = function () {
		var window = this._getWindow();

		if (window) {
			window._keydown_element = null;
			window._keydown_element_list.clear();
		}

		return nexacro.Frame.prototype._on_deactivate.call(this);
	};

	_pMainFrame.on_change_containerPos = function (left, top) {
		var frame = this.frame;
		if (frame) {
			frame._setPos(0, 0);
		}
	};

	_pMainFrame.on_change_containerRect = function (width, height) {
		var frame = this.frame;
		if (frame) {
			frame._setSize(width, height);
		}
	};

	_pMainFrame.on_update_position = function (resize_flag, move_flag, update) {
		var ret = nexacro.FormBase.prototype.on_update_position.call(this, resize_flag, move_flag, update);

		if (this._is_window && (nexacro._Browser == "Runtime" || (nexacro._allow_default_pinchzoom && !nexacro._isDesktop()))) {
			var _window = this._window;
			if (_window) {
				if (resize_flag) {
					if (nexacro._isDesktop()) {
						_window.setSize(this._adjust_width, this._adjust_height);
					}
				}

				if (move_flag) {
					_window.moveTo(this._left, this._top);
				}
			}
		}

		return ret;
	};

	_pMainFrame._isShowTitleBar = function () {
		return nexacro._isShowTitleBar(this, this.showtitlebar);
	};

	_pMainFrame._isShowStatusBar = function () {
		return nexacro._isShowStatusBar(this, this.showstatusbar);
	};

	_pMainFrame._waitCursor = function (wait_flag, context) {
		if (this._window) {
			var waitcomp = this._waitcomp;
			if (wait_flag == true) {
				if (this._ref_comm == 0) {
					nexacro._com_waiting = true;

					if (waitcomp == null) {
						waitcomp = this._waitcomp = new nexacro._WaitControl("waitwindow", 0, 0, 0, 0, null, null, null, null, null, null, this);
						waitcomp.createComponent();

						waitcomp.on_created();
					}

					var waitcursor_imgurl = nexacro._getLoadingImageUrl();
					waitcomp.setImage(waitcursor_imgurl);

					this._window._updateWrapper(true);
					this._window._cancelEvent();
					this._window._blockImeInput(true);
					waitcomp.show();
				}
				waitcomp._addContext(context);
				this._ref_comm++;
			}
			else {
				this._window._updateWrapper(false);
				if (this._ref_comm > 0) {
					this._ref_comm--;
				}

				if (waitcomp) {
					waitcomp._removeContext(context);
					if (this._ref_comm <= 0) {
						this._ref_comm = 0;
						nexacro._com_waiting = false;
						this._window._blockImeInput(false);
						waitcomp.hide();
					}
				}
			}
		}
	};

	_pMainFrame.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);

			var _win = this._getRootWindow();
			if (_win && _win.handle) {
				nexacro._setPopupWindowHandleVisible(_win.handle, v);
			}
		}
	};

	_pMainFrame.set_openalign = function (v) {
		this.openalign = v;
		if (this._openalign == null || (this._openalign && this._openalign.value != v)) {
			this._openalign = nexacro.AlignObject(v);
			this.on_apply_prop_openalign(this._openalign);
		}
	};

	_pMainFrame.set_resizable = function (v) {
		var resizable = nexacro._toBoolean(v);
		if (this.resizable != resizable) {
			this.resizable = resizable;
			this._resetTitleAbsoluteStyle();

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem._setResizable(this._canDragResize());
			}

			var win = this._window;
			if (win) {
				win._setSystemMenuResizable(resizable);
			}
		}
	};

	_pMainFrame.set_layered = function (v) {
		v = nexacro._toBoolean(v);
		if (this.layered != v) {
			this.layered = v;
		}
	};


	_pMainFrame.on_apply_prop_openalign = function () {
		var openalign = this._openalign;
		if (!openalign && this._is_created) {
			var left = this._adjust_left;
			var top = this._adjust_top;
			var width = this._adjust_width;
			var height = this._adjust_height;

			var after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
			if (after_align_pos) {
				this._move(after_align_pos.left, after_align_pos.top, width, height);
			}
		}
	};

	_pMainFrame.on_apply_borderRadius = function (borderRadius) {
		nexacro.Component.prototype.on_apply_borderRadius.call(this, borderRadius);

		var control_element = this._control_element;
		var window = this._window;
		if (control_element && window) {
			nexacro._refreshWindowRegion(window.handle, control_element.handle);
		}
	};

	_pMainFrame._getParentEnable = function (v) {
		return true;
	};

	_pMainFrame.on_apply_prop_enable = function (v) {
		var frame = this.frame;
		if (frame) {
			frame._setEnable(v);
		}
	};




	_pMainFrame._on_beforeclose = function (root_closing_comp) {
		if (!root_closing_comp) {
			root_closing_comp = this;
		}
		var msg = nexacro.Frame.prototype._on_beforeclose.call(this, root_closing_comp);

		var application = nexacro.getApplication();
		if (application) {
			var application_msg = application.on_fire_onbeforeexit();
			msg = this._appendBeforeCloseMsg(msg, application_msg);
		}

		return msg;
	};

	_pMainFrame._on_syscommand = function (elem, systemcommand, event_bubbles, fire_comp, refer_comp) {
		if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
			if (this._inProcSysCommand === true) {
				return;
			}

			if (this._iscallfromresize !== true) {
				this.on_fire_syscommand(this, systemcommand);
			}
			if (fire_comp && fire_comp != this) {
				return true;
			}

			this._inProcSysCommand = true;
			this._procSysCommand(systemcommand);
			this._inProcSysCommand = false;
		}
		else {
			this.on_fire_syscommand(this, systemcommand);
			if (fire_comp && fire_comp != this) {
				return true;
			}

			this._procSysCommand(systemcommand);
		}
	};

	_pMainFrame._on_closebutton_click = function (obj, e) {
		var application = nexacro.getApplication();
		if (application) {
			application.exit();
		}
	};

	_pMainFrame._getOpenAlignPos = function (parent_win, left, top, width, height) {
		var openalign = this._openalign;
		if (openalign) {
			return nexacro._getWindowRectforOpenAlign(openalign.halign, openalign.valign, parent_win.left, parent_win.top, left, top, width, height);
		}

		return null;
	};

	_pMainFrame._changeStateActivate = function (cur) {
		if (cur == false) {
			var frame = this.frame;
			if (frame) {
				frame._changeStateActivate(false);
			}
		}


		nexacro.Frame.prototype._changeStateActivate.call(this, cur);
	};





	_pMainFrame._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			var frame = this.frame;
			if (frame) {
				var subtitletext = frame._getTitleText(true);
				if (subtitletext.length > 0) {
					if (titletext.length > 0) {
						titletext += " - ";
					}
					titletext += subtitletext;
				}
			}
		}
		return titletext;
	};

	_pMainFrame._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			var frame = this.frame;
			if (frame) {
				var substatustext = frame._getStatusText(true);
				if (substatustext.length > 0) {
					if (statustext.length > 0) {
						statustext += " - ";
					}
					statustext += substatustext;
				}
			}
		}
		return statustext;
	};

	_pMainFrame._getWaitComponentElement = function () {
		var waitComp = this._waitcomp;
		if (waitComp) {
			return waitComp.getElement();
		}
		return null;
	};

	_pMainFrame._on_apply_locale = function (v) {
		var frame = this.frame;
		if (frame) {
			frame._on_apply_locale(v);
		}
	};



	nexacro.ChildFrame = function (id, left, top, width, height, right, bottom, url, parent) {
		nexacro.Frame.call(this, id, left, top, width, height, right, bottom, parent);

		this.titlebar = new nexacro.TitleBarControl("titlebar", 0, 0, this._adjust_width, 0, null, null, null, null, null, null, this);
		this._openalign = null;
		if (url) {
			this.set_formurl(url);
		}
	};

	var _pChildFrame = nexacro._createPrototype(nexacro.Frame, nexacro.ChildFrame);
	nexacro.ChildFrame.prototype = _pChildFrame;

	_pChildFrame._type_name = "ChildFrame";
	_pChildFrame.opener = null;
	_pChildFrame.form = null;
	_pChildFrame.autosize = true;
	_pChildFrame.resizable = false;
	_pChildFrame.layered = false;
	_pChildFrame.showontaskbar = null;
	_pChildFrame.dragmovetype = "normal";
	_pChildFrame.overlaycolor = null;


	_pChildFrame._ref_comm = 0;
	_pChildFrame._waitcomp = null;
	_pChildFrame._window_type = 0;
	_pChildFrame._dragmovetype = 1;

	_pChildFrame._is_popup_frame = false;
	_pChildFrame._is_loadform_failed = false;
	_pChildFrame._init_openstatus = null;

	_pChildFrame._close_callback = null;
	_pChildFrame._close_argument = undefined;

	_pChildFrame.widget = false;

	nexacro.ChildFrame._default_overlaycolor = nexacro.BackgroundObject("rgba(0,0,0,0.5)");

	_pChildFrame.on_apply_prop_openalign = function () {
	};

	_pChildFrame.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}
	};

	_pChildFrame.set_overlaycolor = function (val) {
		this.overlaycolor = val;
		if (val) {
			if (this._overlaycolor == null || this._overlaycolor.value != val) {
				var background = nexacro.BackgroundObject(val);
				this._overlaycolor = background;
				this.on_apply_overlaycolor(background);
			}
		}
		else {
			if (this._overlaycolor) {
				this._overlaycolor = null;
				this.on_apply_overlaycolor(null);
			}
		}
	};

	_pChildFrame.on_apply_overlaycolor = function (overlaycolor) {
		var modal_overlay_elem = this._modal_overlay_elem;
		if (modal_overlay_elem) {
			modal_overlay_elem.setElementBackground(overlaycolor);
		}
	};


	_pChildFrame.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		if (this.form) {
			this.form._setPos(0, 0);
			this.form._setSize(this._getClientWidth(), this._getClientHeight());
			this.form.createComponent();
		}
	};

	_pChildFrame.destroyComponent = function (callremovechild) {
		if (this._window_type == 1 || this._window_type == 4) {
			this._setModalUnlock();
			this._runCallback();

			if (this._window_type == 4) {
				var _win = this._getWindow();
				var _virtual_handle = this._virtual_handle;

				nexacro._unblockScript(_win._handle, _virtual_handle);
				this._virtual_handle = null;
			}
		}
		else if (this._window_type == 5) {
			this._setModalUnlock();
		}
		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}

		this._openalign = null;

		if (nexacro._com_waiting) {
			nexacro._com_waiting = false;
		}

		if (this._window && this._window._is_alive) {
			this._window.destroy();
			this._window = null;
			return true;
		}
		else {
			return nexacro.Frame.prototype.destroyComponent.call(this, callremovechild);
		}
	};

	_pChildFrame.on_destroy_contents = function (callremovechild) {
		if (this._overlaycolor) {
			this._overlaycolor = null;
		}
		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}

		nexacro.Frame.prototype.on_destroy_contents.call(this, callremovechild);

		if (this._variables) {
			var len = this._variables.length;
			for (var i = 0; i < len; i++) {
				delete this[this._variables[i]];
			}
		}

		if (this.form) {
			this.form.destroyComponent(callremovechild);
			this.form = null;
		}
	};

	_pChildFrame._unregisterPopupFrame = function (win, closedpopupframeid) {
		if (this._window_type == 2) {
			nexacro._unregisterPopupFrame(closedpopupframeid, win, true);
		}
	};

	_pChildFrame._runCallback = function () {
		var callback = this._close_callback;
		if (callback) {
			if (typeof (callback) == "string") {
				if (this.opener) {
					var _call_callback_fn = this.opener[callback];
					if (_call_callback_fn) {
						_call_callback_fn.call(this.opener, this.name, this._close_argument);
					}
				}
			}
			else if (typeof (callback) == "function") {
				callback.call(this.opener, this.name, this._close_argument);
			}
		}
	};


	_pChildFrame.on_created_contents = function (win) {
		var left, top, calculated_size, width, height, after_align_pos, recalculated_pos;
		if (this._is_window && this._window) {
			var window = this._window;
			win = window;
			var delayedwindowpos = this._delayed_window_pos;

			if (delayedwindowpos && window.handle) {
				if (nexacro._OS == "Windows") {
					if (this._window_type == 5 && this.form && this.form._is_loaded == true && window._prepared_flag == false) {
						left = delayedwindowpos.left;
						top = delayedwindowpos.top;
						calculated_size = this._getAutosizedFrameSize(true);
						width = calculated_size.width;
						height = calculated_size.height;

						after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
						if (after_align_pos) {
							left = after_align_pos.left;
							top = after_align_pos.top;
						}

						recalculated_pos = this._recalcModalPosition(left, top, width, height);
						window.moveTo(delayedwindowpos.left, delayedwindowpos.top);

						this._move(delayedwindowpos.left, delayedwindowpos.top, recalculated_pos.width, recalculated_pos.height);
					}
					else {
						window.setSize(delayedwindowpos.left, delayedwindowpos.top);
					}
				}
				else {
					window.moveTo(delayedwindowpos.left, delayedwindowpos.top);
					window.setSize(delayedwindowpos.width, delayedwindowpos.height);

					if (this._window_type == 5 && this.form && this.form._is_loaded == true && window._prepared_flag == false) {
						this._move(delayedwindowpos.left, delayedwindowpos.top, delayedwindowpos.width, delayedwindowpos.height);
					}
				}

				delete this._delayed_window_pos;
			}

			if (window.handle) {
				window._setSystemMenuResizable(this.resizable);
			}
		}
		else if ((this._window_type == 1 || this._window_type == 4) && this.form && this.autosize) {
			left = this._adjust_left;
			top = this._adjust_top;
			calculated_size = this._getAutosizedFrameSize(true);
			width = calculated_size.width;
			height = calculated_size.height;

			after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}

			recalculated_pos = this._recalcModalPosition(left, top, width, height);
			this._move(recalculated_pos.left, recalculated_pos.top, recalculated_pos.width, recalculated_pos.height);
		}

		nexacro.Frame.prototype.on_created_contents.call(this, win);

		if (!this._formurl) {
			this._changeStateActivate(true);
		}

		this._createForm();
	};

	_pChildFrame.on_change_containerPos = function (left, top) {
		if (this.form) {
			this.form._setPos(0, 0);
		}
	};
	_pChildFrame.on_change_containerRect = function (width, height) {
		if (this.form) {
			this.form._setSize(width, height);
		}

		if (this.titlebar) {
			this.titlebar._update_position(false, true);
		}
	};

	_pChildFrame._isShowTitleBar = function () {
		return nexacro._isShowTitleBar(this, this.showtitlebar);
	};

	_pChildFrame._isShowStatusBar = function () {
		return nexacro._isShowStatusBar(this, this.showstatusbar);
	};

	_pChildFrame.createComponent = function (bCreateOnly) {
		if (this._window_type != 1 && this._window_type != 4) {
			return nexacro.Frame.prototype.createComponent.call(this, bCreateOnly);
		}

		var modal_overlay_elem = this._modal_overlay_elem;
		var parent_elem = modal_overlay_elem;
		var control_elem = this._control_element;
		if (!control_elem) {
			if (this._unique_id.length <= 0) {
				this._unique_id = this.parent._unique_id ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
			}

			control_elem = this.on_create_control_element(parent_elem);
			this._initControl(control_elem);
			this._initContents(control_elem);

			if (!bCreateOnly && parent_elem && parent_elem.handle) {
				this.on_created();
			}
		}
		return true;
	};

	_pChildFrame._checkValidLayout = function () {
		if (this.form != null) {
			this.form._checkValidLayout();
		}
	};

	_pChildFrame._waitCursor = function (wait_flag, context) {
		if (this._isNested()) {
			return nexacro.Frame.prototype._waitCursor.call(this, wait_flag, context);
		}

		if (this._window) {
			var waitcomp = this._waitcomp;
			if (wait_flag == true) {
				if (waitcomp == null) {
					waitcomp = this._waitcomp = new nexacro._WaitControl("waitwindow", 0, 0, 0, 0, null, null, null, null, null, null, this);
					waitcomp.createComponent();
					waitcomp.on_created(this._window);
				}

				this._window._updateWrapper(true);
				if (this._ref_comm == 0) {
					nexacro._com_waiting = true;

					var waitcursor_imgurl = nexacro._getLoadingImageUrl();
					waitcomp.setImage(waitcursor_imgurl);
					this._window._cancelEvent();
					this._window._blockImeInput(true);
					waitcomp.show();
				}
				waitcomp._addContext(context);
				this._ref_comm++;
			}
			else {
				this._window._updateWrapper(false);
				if (this._ref_comm > 0) {
					this._ref_comm--;
				}

				if (waitcomp) {
					waitcomp._removeContext(context);
					if (this._ref_comm <= 0) {
						this._ref_comm = 0;
						nexacro._com_waiting = false;
						this._window._blockImeInput(false);
						waitcomp.hide();
					}
				}
			}
		}
	};
	_pChildFrame.set_autosize = function (v) {
		if (this.autosize != v) {
			this.autosize = nexacro._toBoolean(v);
		}
	};

	_pChildFrame.set_dragmovetype = function (v) {
		if (this.dragmovetype != v) {
			switch (v) {
				case "all":
					this.dragmovetype = v;
					this._dragmovetype = 2;
					break;
				case "normal":
					this.dragmovetype = v;
					this._dragmovetype = 1;
					break;
				case "none":
					this.dragmovetype = v;
					this._dragmovetype = 0;
					break;
			}

			this._applyDragMoveType();
		}
	};

	_pChildFrame.set_openalign = function (v) {
		this.openalign = v;
		if (this._openalign == null || (this._openalign && this._openalign.value != v)) {
			this._openalign = nexacro.AlignObject(v);
		}
	};

	_pChildFrame.set_formurl = function (url) {
		var realurl = nexacro._getFDLLocation(url);
		if (this._formurl != realurl) {
			if (this.form && this.form._control_element) {
				var confirm_message = this._on_beforeclose();
				if (this._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				this._on_close();
			}

			this.formurl = url;
			this._formurl = realurl;
			this._is_loadform_failed = false;
			if (this._is_created) {
				this._createForm();
			}
		}
	};

	_pChildFrame.set_resizable = function (v) {
		var resizable = nexacro._toBoolean(v);
		if (this.resizable != resizable) {
			this.resizable = resizable;
			this._resetTitleAbsoluteStyle();

			if (this._control_element) {
				this._control_element._setResizable(this._canDragResize());
			}

			if (this._window) {
				this._window._setSystemMenuResizable(resizable);
			}
		}
	};

	_pChildFrame.set_layered = function (v) {
		var layered = nexacro._toBoolean(v);
		if (this.layered != layered) {
			this.layered = layered;
			nexacro._on_apply_layered(this, this.layered);
		}
	};

	_pChildFrame.set_showontaskbar = function (v) {
		var showontaskbar = nexacro._toBoolean(v);
		if (this.showontaskbar != showontaskbar) {
			this.showontaskbar = showontaskbar;
		}
	};

	_pChildFrame.set_widget = function (v) {
		var widget = nexacro._toBoolean(v);
		if (this.widget != widget) {
			this.widget = widget;
		}
	};

	_pChildFrame.init = function (id, left, top, width, height, right, bottom, strurl) {
		if (id) {
			this.id = this.name = id;
		}


		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;

		if (arguments.length >= 5) {
			if (this._is_window && this._window) {
				this._adjustPosition(left, top, right, bottom, width, height);
			}
			else {
				this._adjustPosition(left, top, right, bottom, width, height, this.parent ? this.parent._getClientWidth() : 0, this.parent ? this.parent._getClientHeight() : 0);
			}

			if (this._adjust_width != old_width || this._adjust_height != old_height) {
				bsize = true;
			}
			if (this._adjust_left != old_left || this._adjust_top != old_top) {
				bmove = true;
			}
			this.on_update_position(bsize, bmove);
		}

		if (strurl) {
			this.set_formurl(strurl);
		}
	};

	_pChildFrame._addVariable = function (id, val) {
		this[id] = val;
		if (!this._variables) {
			this._variables = [];
		}
		this._variables.push(id);
	};


	_pChildFrame.showModal = function (str_id, _parent_frame, arr_arg, opener, callback, is_async) {
		if (nexacro._current_popups.length > 0) {
			nexacro._checkClosePopupComponent(null);
		}



		var ret, parent_frame, id;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
			parent_frame = arguments[1];
			this._arg = arguments[2];
			this.opener = arguments[3];
			this._close_callback = arguments[4];
		}
		else {
			id = this.id;
			parent_frame = arguments[0];
			this._arg = arguments[1];
			this.opener = arguments[2];
			this._close_callback = arguments[3];
		}

		var _win = parent_frame ? parent_frame._getWindow() : this._getWindow();
		if (_win) {
			_win._updateWrapper(undefined, "hide");
		}

		var child_frame = null;

		if (parent_frame == null) {
			var application = nexacro.getApplication();
			if (application) {
				parent_frame = application.mainframe;
			}
		}
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			if (_win) {
				_win._updateWrapper(undefined, "show");
			}

			return false;
		}
		else {
			child_frame = this;
		}

		if (child_frame && child_frame._arg) {
			for (var param in child_frame._arg) {
				child_frame._addVariable(param, child_frame._arg[param]);
			}
		}

		var parent_window = parent_frame ? parent_frame._getWindow() : null;

		if (nexacro._registerPopupFrame(id, this, parent_window) < 0) {
			if (_win) {
				_win._updateWrapper(undefined, "show");
			}

			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		child_frame._is_window = false;
		child_frame._window_type = 1;

		var wheelZoomScale = 1.0;
		var _window = this._getWindow();
		if (_window && (_window._wheelZoom != undefined) && (_window._wheelZoom != 100)) {
			wheelZoomScale = _window._wheelZoom / 100.0;
		}

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;

		if (this.left == null) {
			if ((this.width || this.right) && !(isNaN(this.width) || isNaN(this.right))) {
				if (_window) {
					this.left = _window.clientWidth / wheelZoomScale - this.width - this.right;
				}
			}
		}
		if (this.top == null) {
			if ((this.height || this.bottom) && !(isNaN(this.height) || isNaN(this.bottom))) {
				if (_window) {
					this.top = _window.clientHeight / wheelZoomScale - this.height - this.bottom;
				}
			}
		}
		if (this.width == null) {
			if ((this.left || this.right) && !(isNaN(this.left) || isNaN(this.right))) {
				if (_window) {
					this.width = _window.clientWidth / wheelZoomScale - this.left - this.right;
				}
			}
		}
		if (this.height == null) {
			if ((this.top || this.bottom) && !(isNaN(this.top) || isNaN(this.bottom))) {
				if (_window) {
					this.height = _window.clientHeight / wheelZoomScale - this.top - this.bottom;
				}
			}
		}

		if (this.autosize) {
			var calculated_size = this._getAutosizedFrameSize(true);
			this.width = width = calculated_size.width;
			this.height = height = calculated_size.height;
		}

		var after_align_pos = child_frame._getOpenAlignPos(this._getWindow(), left, top, width, height);
		if (after_align_pos) {
			this.left = after_align_pos.left;
			this.top = after_align_pos.top;
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			var _focus_obj = null;
			if (parent_frame && parent_frame._focusManager) {
				_focus_obj = parent_frame._focusManager[0];
			}

			if (_focus_obj) {
				if (_focus_obj.parent._is_form) {
					this.opener = _focus_obj.parent;
				}
				else {
					this.opener = parent_frame.form;
				}
			}
			else {
				this.opener = parent_frame ? parent_frame.form : null;
			}
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		var mainframe = this._getMainFrame();
		if (mainframe) {
			mainframe._changeStateActivate(false, this);
		}

		var recalculated_pos = this._recalcModalPosition((this.left == null) ? null : this.left *  wheelZoomScale, (this.top == null) ? null : this.top *  wheelZoomScale, this.width, this.height);
		this.left = recalculated_pos.left;
		this.top = recalculated_pos.top;
		this.width = recalculated_pos.width;
		this.height = recalculated_pos.height;

		this._setModalLock();
		this._cancelTouchEvent();
		this.createComponent(true);
		this.on_created();

		if (_win) {
			_win._updateWrapper(undefined, "show");
		}

		if (wheelZoomScale != 1.0) {
			if (this.form._is_loaded) {
				var frameElem = this.getElement();
				if (frameElem) {
					frameElem.setElementZoom(_window._wheelZoom);
					frameElem.setElementSize(frameElem._unscaledwidth, frameElem._unscaledheight, false, true);
				}
			}
			else {
				this._isNotProcessedWheelZoom = true;
				this.set_visible(false);
			}
		}

		return true;
	};

	_pChildFrame._showModalSync = function (str_id, _parent_frame, arr_arg, opener) {
		var ret, parent_frame, id;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
			parent_frame = arguments[1];
			this._arg = arguments[2];
			this.opener = arguments[3];
		}
		else {
			id = this.id;
			parent_frame = arguments[0];
			this._arg = arguments[1];
			this.opener = arguments[2];
		}

		var child_frame = null;

		if (parent_frame == null) {
			var application = nexacro.getApplication();
			if (application) {
				parent_frame = application.mainframe;
			}
		}
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			return false;
		}
		else {
			child_frame = this;
		}

		if (child_frame && child_frame._arg) {
			for (var param in child_frame._arg) {
				child_frame._addVariable(param, child_frame._arg[param]);
			}
		}

		var parent_window = parent_frame ? parent_frame._getWindow() : null;

		if (nexacro._registerPopupFrame(id, this, parent_window) < 0) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		child_frame._is_window = false;
		child_frame._window_type = 4;

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;


		if (this.autosize) {
			var calculated_size = this._getAutosizedFrameSize(true);
			this.width = width = calculated_size.width;
			this.height = height = calculated_size.height;
		}

		var after_align_pos = child_frame._getOpenAlignPos(this._getWindow(), left, top, width, height);
		if (after_align_pos) {
			this.left = after_align_pos.left;
			this.top = after_align_pos.top;
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			var _focus_obj = null;
			if (parent_frame && parent_frame._focusManager) {
				_focus_obj = parent_frame._focusManager[0];
			}

			if (_focus_obj) {
				if (_focus_obj.parent._is_form) {
					this.opener = _focus_obj.parent;
				}
				else {
					this.opener = parent_frame.form;
				}
			}
			else {
				this.opener = parent_frame ? parent_frame.form : null;
			}
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		var _window = this._getWindow();
		var wheelZoomScale = 1.0;
		if (_window && (_window._wheelZoom != undefined) && (_window._wheelZoom != 100)) {
			wheelZoomScale = _window._wheelZoom / 100.0;
		}
		var recalculated_pos = this._recalcModalPosition((this.left == null) ? null : this.left *  wheelZoomScale, (this.top == null) ? null : this.top *  wheelZoomScale, this.width, this.height);
		this.left = recalculated_pos.left;
		this.top = recalculated_pos.top;
		this.width = recalculated_pos.width;
		this.height = recalculated_pos.height;

		this._setModalLock();
		this._cancelTouchEvent();
		this.createComponent(true);
		this.on_created();
		if (wheelZoomScale != 1.0) {
			var frameElem = this.getElement();
			frameElem.setElementZoom(_window._wheelZoom);
			frameElem.setElementSize(frameElem._unscaledwidth, frameElem._unscaledheight, false, true);
		}

		var win = this._getWindow();
		if (win && win.handle) {
			var _virtual_handle = nexacro._createVirtualWindowHandle(win.handle);
			this._virtual_handle = _virtual_handle;
			nexacro._blockScript(win.handle, _virtual_handle);
		}

		return true;
	};


	_pChildFrame._showModalWindow = function (str_id, _parent_frame, arr_arg, opener, _lockmode) {
		this._is_popup_frame = true;
		var ret, parent_frame, id, lockmode;
		var shift_argument = 0;

		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
		}
		else {
			shift_argument = -1;
			id = this.id;
		}

		parent_frame = arguments[1 + shift_argument];
		this._arg = arguments[2 + shift_argument];
		if (arguments[3 + shift_argument]) {
			this.opener = arguments[3 + shift_argument];
		}

		lockmode = 1;



		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (this && this._arg) {
			for (var param in this._arg) {
				this._addVariable(param, this._arg[param]);
			}
		}

		var parent_window = parent_frame ? parent_frame._getWindow() : null;
		if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
			if (nexacro._registerPopupFrame(id, this, parent_window) < 0) {
				throw nexacro.MakeNativeError(this, "native_exist_id", id);
			}
		}
		else {
			if (nexacro._registerPopupFrame(id, this) < 0) {
				throw nexacro.MakeNativeError(this, "native_exist_id", id);
			}
		}

		if (this._init_formurl) {
			this.set_formurl(this._init_formurl);
		}

		this._is_window = true;
		this._window_type = 5;

		var left = this._adjust_left;
		var top = this._adjust_top;
		var width = this._adjust_width;
		var height = this._adjust_height;

		if (parent_window) {
			if (this.autosize == false && (this._openalign == null || this._openalign && this._openalign.value == "")) {
			}
			else {
				left = parent_window.getLeft();
				top = parent_window.getTop();
			}
		}

		var is_form_loaded = false;
		if (this.autosize && this.form && this.form._control_element) {
			width = this.form._init_width;
			height = this.form._init_height;
			is_form_loaded = true;
		}

		parent_window = parent_frame ? parent_frame._getWindow() : null;
		if (!is_form_loaded) {
			var after_align_pos = this._getOpenAlignPos(parent_window, left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			this.opener = parent_frame ? parent_frame.form : null;
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		if (this.autosize && !is_form_loaded) {
			this._delayed_create_window = true;
			this._delayed_create_parent = parent_window;
		}

		this._window = new nexacro._Window(this.name, parent_window, false);
		this._window.attachFrame(this, false);

		if (this.form && this.form._load_manager.status >= 7) {
			this._loadedForm();
		}

		if (parent_frame && parent_frame._setModalLock) {
			this._setModalLock(this._overlaycolor);
		}
		return this._window.createModal(parent_window, this.id, width, height, left, top, this.resizable, this.layered, lockmode);
	};


	_pChildFrame._on_init = function () {
		if (this._is_popup_frame && this._window_type == 2) {
			var formurl;
			var openstyle;
			var parent_frame;
			var left, top, width, height;
			var arr_args;
			var name = this.name;

			var popupframeoption = nexacro._popupframeoption[name];
			if (popupframeoption) {
				delete nexacro._popupframeoption[name];

				formurl = popupframeoption._formurl;
				openstyle = popupframeoption._openstyles;
				parent_frame = popupframeoption._parentframe;
				left = popupframeoption._left;
				top = popupframeoption._top;
				width = popupframeoption._width;
				height = popupframeoption._height;
				arr_args = popupframeoption._args;
				this.opener = popupframeoption._opener;
			}
			if (parent_frame) {
				parent_frame.addChild(name, this);
			}

			if (arr_args) {
				for (var param in arr_args) {
					this._addVariable(param, arr_args[param]);
				}
			}

			if (openstyle) {
				var openlist = openstyle.split(" ");
				for (var i = 0, len = openlist.length; i < len; i++) {
					var prop = openlist[i].split("=");
					if (prop[0]) {
						if (prop[1] && prop[1].indexOf("'") > -1) {
							prop[1] = prop[1].replace("'", "");
							for (var j = i; j < len; j++) {
								var addstr = openlist[++i];
								if (addstr) {
									prop[1] += " " + addstr;
									if (addstr.indexOf("'") > -1) {
										prop[1] = prop[1].replace("'", "");
										break;
									}
								}
							}
						}
					}
					if (prop[0] == "openstatus") {
						this._init_openstatus = prop[1];
						continue;
					}

					if (this["set_" + prop[0]]) {
						this["set_" + prop[0]](prop[1]);
					}
				}
			}


			var locale = nexacro._locale ? nexacro._locale : nexacro._getLocale();
			if (locale) {
				this._setLocale(locale);
			}

			this.init(this.name, left, top, width, height, null, null, formurl);

			if (nexacro.__setViewportScale) {
				nexacro.__setViewportScale();
			}
		}
	};

	_pChildFrame._on_load = function () {
		this.createComponent();
		this._on_focus(true);
		this.on_created();
		this._changeStateActivate(true);
	};


	_pChildFrame._loadApplicationCSS = function () {
		if (nexacro._cssurls) {
			var url, len = nexacro._cssurls.length;
			for (var i = 0; i < len; i++) {
				url = nexacro._cssurls[i];
				if (url) {
					var loadurl = url.replace("::", "_");

					var cssurl, base_url;

					cssurl = nexacro._getServiceLocation("theme://" + loadurl, nexacro._project_absolutepath, null, false);
					if (nexacro._localcache_path) {
						base_url = cssurl.substring(nexacro._project_absolutepath.length, cssurl.length);
						cssurl = nexacro._localcache_path + base_url;
					}

					var cssmapurl = cssurl;
					var pos = cssurl.lastIndexOf('/');
					cssurl = cssurl.substring(0, pos + 1) + nexacro._getCSSFileName(cssurl.substring(pos + 1, cssurl.length - 5));

					pos = cssmapurl.lastIndexOf('.');
					cssmapurl = cssmapurl.substring(0, pos + 1) + "map.js";

					var service = nexacro._getServiceObject(url);
					var env = nexacro.getEnvironment();
					var checkversion = env.checkversion;

					if (checkversion) {
						var version = service.version;
						if (!nexacro._isNull(version) && version !== "") {
							cssurl += nexacro._getVersionQueryString(cssurl, null, version);
							cssmapurl += nexacro._getVersionQueryString(cssmapurl, null, version);
						}
					}

					this._load_manager.loadCssModule(cssurl, null, null, service, true, 1);
					this._load_manager.loadCssModule(cssmapurl, null, null, service);
				}
			}
		}
	};

	_pChildFrame._loadEnvironment = function () {
		this._loadTheme(nexacro._curthemeid);

		this._loadInitValueFile(nexacro._initvaluefileid);
	};

	_pChildFrame._loadTheme = function (themeid) {
		if (!themeid) {
			return;
		}

		var cssurl, base_url, service;

		var bLocalCacheType = false;

		if (nexacro._localcache_path && nexacro._hasLocalCacheUrl(themeid)) {
			cssurl = nexacro._getLocalCacheUrl(themeid);
			if (cssurl) {
				service = nexacro._getServiceObject(themeid);
				this._load_manager.loadCssModule(cssurl, null, null, service);
				return;
			}

			bLocalCacheType = true;
			base_url = nexacro._localcache_path;
		}


		cssurl = nexacro._theme_uri + "/" + nexacro._getCSSFileName("theme");
		cssurl = nexacro._getServiceLocation(cssurl, base_url);

		if (bLocalCacheType) {
			nexacro._addLocalCacheUrl(themeid, cssurl);
		}

		service = nexacro._getServiceObject(cssurl);
		this._load_manager.loadCssModule(cssurl, null, null, service, true, 0);

		cssurl = nexacro._theme_uri + "/theme.map";
		cssurl = nexacro._getServiceLocation(cssurl, base_url);
		cssurl += ".js";
		if (bLocalCacheType) {
			nexacro._addLocalCacheUrl(themeid, cssurl);
		}

		service = nexacro._getServiceObject(cssurl);
		this._load_manager.loadCssModule(cssurl, null, null, service);
	};



	_pChildFrame._loadInitValueFile = function (initvaluefile) {
		if (!initvaluefile) {
			return;
		}

		var initvalueurl, base_url, service;
		var localcachetype = false;

		if (nexacro._localcache_path && nexacro._hasLocalCacheUrl(initvaluefile)) {
			initvalueurl = nexacro._getLocalCacheUrl(initvaluefile);
			if (initvalueurl) {
				service = nexacro._getServiceObject(initvaluefile);
				this._load_manager.loadGlobalModule(initvaluefile, null, null, service);
				return;
			}

			localcachetype = true;
			base_url = nexacro._localcache_path;
		}

		initvalueurl = nexacro._getServiceLocation(initvaluefile, base_url);

		if (localcachetype) {
			nexacro._addLocalCacheUrl(initvaluefile, initvalueurl);
		}

		service = nexacro._getServiceObject(initvalueurl);
		this._load_manager.loadGlobalModule(initvalueurl, null, null, service);
	};

	_pChildFrame._showModeless = function (name, target_win) {
		this._is_popup_frame = true;
		this._is_window = true;
		this._window = target_win;
		this._window.frame = this;
		this._window_type = 2;

		this._load_manager.status = 2;
		this._load_manager._is_mainloaded = true;

		this._loadEnvironment();
		this._loadApplicationCSS();
	};

	_pChildFrame.hideModal = function () {
	};

	_pChildFrame.hideModeless = function () {
	};

	_pChildFrame.getForm = function () {
		return this.form ? this.form : null;
	};

	_pChildFrame.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_loadform_failed && this._isShowTitleBar() == false) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				owner_frame.removeChild(this.id);
				var ownerframe_elem = owner_frame.getElement();
				if (ownerframe_elem) {
					owner_frame.on_change_containerRect(owner_frame._getClientWidth(), owner_frame._getClientHeight());
				}
			}

			if (this._is_window && this._window && this._window._is_alive) {
				this._window.destroy();
			}
			else {
				this._destroy();
			}

			if (this._control_element) {
				this._control_element.destroy();
			}
			this._control_element = null;
		}

		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onrbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onrbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousedown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseenter.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseleave.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousemove.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};


	_pChildFrame.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onrbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onrbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onmouseup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onmousedown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onmouseenter.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onmouseleave.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._window_type == 1) {
			return true;
		}
		var ret = nexacro.Frame.prototype.on_fire_user_onmousemove.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_user_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Frame.prototype.on_fire_user_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		if (this._is_window) {
			return true;
		}
		return ret;
	};


	_pChildFrame._createForm = function () {
		var formurl = this.formurl;
		if (!formurl) {
			formurl = "";
		}

		var application = nexacro.getApplication();
		if (application) {
			if (application.key === "designform") {
				return null;
			}
		}

		var form = this.form;
		if (form) {
			if (form._url != this._formurl) {
				form.destroyComponent();
				form = new nexacro.Form("form", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, null, null, null, null, this);
				form.opener = this.opener;
				this.form = form;
				form.loadForm(formurl);
				if (this._control_element) {
					form.createComponent();
				}
			}
		}
		else {
			form = new nexacro.Form("form", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, null, null, null, null, this);
			form.opener = this.opener;
			this.form = form;
			if (this._formurl) {
				form.loadForm(formurl);
			}

			if (this._control_element) {
				form.createComponent();
			}
		}
		return form;
	};

	_pChildFrame._closeForm = function (arg) {
		var ownerframe;
		if (this._is_window) {
			if (arg !== undefined) {
				this._close_argument = arg;
				this._window.returnValue = arg;
			}

			var allobj = this.all;
			var allcnt = allobj.length - 1;
			for (var i = allcnt; i >= 0; i--) {
				var childid = allobj.get_id(i);
				var child = allobj[i];

				if (child && child._is_window && child._window && child._is_alive) {
					this.removeChild(childid);

					child._window.destroy();
					child._window = null;
				}
			}

			ownerframe = this.getOwnerFrame();
			if (ownerframe) {
				ownerframe.removeChild(this.id);
			}
			else if (this._window && this._window._parentwindowforopen && this._window_type == 2) {
				if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
					nexacro._unregisterPopupFrame(this.id, this._window._parentwindowforopen, undefined, true);
				}
			}

			if (this.form && this.form._is_alive) {
				this.form._destroy();
				this.form = null;
			}

			if (this._window && this._window._is_alive) {
				this._window.destroy();
				this._window = null;
			}
		}
		else {
			if (arg !== undefined) {
				this._close_argument = arg;
			}

			var callremovechild = true;
			ownerframe = this.getOwnerFrame();
			if (ownerframe) {
				ownerframe.removeChild(this.id);
				callremovechild = false;
			}

			if (this.form && this.form._is_alive) {
				this.form._destroy();
				this.form = null;
			}

			this._destroy(callremovechild);
		}
	};

	_pChildFrame._destroyForm = function () {
		if (this.form) {
			this.form._destroy();
			this.form = null;
		}
	};

	_pChildFrame._loadedForm = function () {
		this._setLastFocus(this.form);
		if (this._is_loadform_failed) {
			return;
		}

		this._applyDragMoveType();

		if (this.autosize) {
			var after_align_pos, parent_window = this._delayed_create_parent;
			var left = this._left;
			var top = this._top;
			var width;
			var height;
			var calculated_size, _adjust_width, _adjust_height;

			if (this._is_window && this._window_type == 2) {
				if (this._delayed_create_window) {
					calculated_size = this._getAutosizedFrameSize(nexacro._Browser == "Runtime");
					width = calculated_size.width;
					height = calculated_size.height;

					after_align_pos = this._getOpenAlignPos(parent_window, left, top, width, height);
					if (after_align_pos) {
						left = after_align_pos.left;
						top = after_align_pos.top;
					}

					this._move(this._adjust_left, this._adjust_top, width, height);

					var _window = this._window = new nexacro._Window(this.name, parent_window, false);
					_window.attachFrame(this, false);
					_window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);

					delete this._delayed_create_parent;
					delete this._delayed_create_window;
				}
				else {
					if (this._window) {
						calculated_size = this._getAutosizedFrameSize(nexacro._Browser == "Runtime");
						width = calculated_size.width;
						height = calculated_size.height;

						after_align_pos = this._getOpenAlignPos(this._window.parent, left, top, width, height);
						if (after_align_pos) {
							left = after_align_pos.left;
							top = after_align_pos.top;
						}

						this._move(left, top, width, height);

						if (this._init_openstatus) {
							this.set_openstatus(this._init_openstatus);
							if (this._init_openstatus != "normal") {
								this._init_openstatus = null;
								return;
							}
							this._init_openstatus = null;
						}

						_adjust_width = width + this._window._gap_client_width;
						_adjust_height = height + this._window._gap_client_height;

						if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
							function getWindowSize (win) {
								var win_handle = win.handle;
								var wW, wH;
								if (win_handle.outerWidth) {
									wW = win_handle.outerWidth;
									wH = win_handle.outerHeight;
								}
								else {
									win.setSize(_adjust_width, _adjust_height);
									var barsW = _adjust_width - nexacro._getWindowHandleOuterWidth(win_handle);
									var barsH = _adjust_height - nexacro._getWindowHandleOuterHeight(win_handle);

									wW = barsW + _adjust_width;
									wH = barsH + _adjust_height;
								}
								return {
									width : wW, 
									height : wH
								};
							}

							var win_rect = getWindowSize(this._window);

							if (win_rect.width != _adjust_width || win_rect.height != _adjust_height) {
								this._window.setSize(win_rect.width, win_rect.height);
							}
						}
						else {
							this._window.setSize(_adjust_width, _adjust_height);
						}
					}
				}
			}
			else if (this._window_type == 5) {
				if (this._delayed_create_window) {
					{

						calculated_size = this._getAutosizedFrameSize(nexacro._Browser == "Runtime");
						width = calculated_size.width;
						height = calculated_size.height;
					}

					after_align_pos = this._getOpenAlignPos(parent_window, left, top, width, height);
					if (after_align_pos) {
						left = after_align_pos.left;
						top = after_align_pos.top;
					}

					if (this._window.handle) {
						this._window.moveTo(left, top);
						if (this._state_openstatus == 0) {
							this._move(left, top, width, height);
						}
						else {
							this._restore_position = {
								left : left, 
								top : top, 
								width : width, 
								height : height, 
								right : this.right, 
								bottom : this.bottom
							};
						}
					}
					else {
						this._delayed_window_pos = {
							left : left, 
							top : top, 
							width : width, 
							height : height
						};
					}

					delete this._delayed_create_parent;
					delete this._delayed_create_window;
				}
				else {
					if (this._window) {
						calculated_size = this._getAutosizedFrameSize(nexacro._Browser == "Runtime");
						width = calculated_size.width;
						height = calculated_size.height;

						after_align_pos = this._getOpenAlignPos(this._window.parent, left, top, width, height);
						if (after_align_pos) {
							left = after_align_pos.left;
							top = after_align_pos.top;
						}
						this._move(left, top, width, height);

						_adjust_width = width + this._window._gap_client_width;
						_adjust_height = height + this._window._gap_client_height;
						this._window.setSize(_adjust_width, _adjust_height);
					}
				}
			}
			else if (this._window_type == 1 || this._window_type == 4) {
				calculated_size = this._getAutosizedFrameSize(true);
				width = calculated_size.width;
				height = calculated_size.height;

				after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
				if (after_align_pos) {
					left = after_align_pos.left;
					top = after_align_pos.top;
				}

				var recalculated_pos = this._recalcModalPosition(left, top, width, height);
				this._move(recalculated_pos.left, recalculated_pos.top, recalculated_pos.width, recalculated_pos.height);
			}
		}
	};

	_pChildFrame._on_window_loaded = function () {
		this._checkValidWindowSize();
		if (!this._is_created) {
			this.createComponent();
			this._on_focus(true);
			this.on_created();
		}

		if (this._lockmode) {
			delete this._lockmode;
			this._lockmode = null;
		}
	};

	_pChildFrame._onHttpSystemError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg) {
		this._is_loadform_failed = true;
	};

	_pChildFrame._createdForm = function () {
		var _window;
		if (this._window_type == 1) {
			if (this._isNotProcessedWheelZoom == true) {
				_window = this._getWindow();
				var wheelZoomScale = 1.0;
				if (_window && (_window._wheelZoom != undefined) && (_window._wheelZoom != 100)) {
					wheelZoomScale = _window._wheelZoom / 100.0;
				}
				var after_align_pos = this._getOpenAlignPos(_window, this.left, this.top, this.width, this.height);
				if (after_align_pos) {
					this.left = after_align_pos.left;
					this.top = after_align_pos.top;
				}
				var recalculated_pos = this._recalcModalPosition(this.left, this.top, this.width, this.height);
				this.left = recalculated_pos.left;
				this.top = recalculated_pos.top;
				this.width = recalculated_pos.width;
				this.height = recalculated_pos.height;
				if (wheelZoomScale != 1.0) {
					var frameElem = this.getElement();
					if (frameElem) {
						frameElem.setElementZoom(_window._wheelZoom);
						frameElem.setElementSize(recalculated_pos.width, recalculated_pos.height, false, true);
						this.set_visible(true);
					}
				}
			}
		}

		if (this._state_openstatus != 2) {
			var owner_frame = this.getOwnerFrame();
			var _win = this._getWindow();
			var is_active_layer;
			if (owner_frame) {
				var proc_focus = false;

				if (owner_frame._is_frameset && owner_frame._getTopOrderFrame() == this) {
					proc_focus = true;
				}
				else if (!owner_frame._is_frameset && owner_frame._is_frame) {
					proc_focus = true;
				}

				if (proc_focus) {
					if (this._getWindow() == owner_frame._getWindow()) {
						this._changeStateActivate(true);
					}
					else if (this._window_type == 5) {
						if (_win && _win._prepared_flag == true) {
							this._changeStateActivate(true);
						}
					}

					if (nexacro._enableaccessibility && (nexacro._accessibilitywholereadtype == 1 || 
						nexacro._accessibilitywholereadtype == 3)) {
						this._setFocus();
						this.form._playAccessibilityWholeReadLabel("wholeread");
					}
					else {
						is_active_layer = _win._isActiveLayerComponent(this.form);
						if (is_active_layer) {
							this.form._on_focus(true);
						}
					}
				}
			}
			else {
				this._changeStateActivate(true);

				if (nexacro._enableaccessibility && (nexacro._accessibilitywholereadtype == 1 || 
					nexacro._accessibilitywholereadtype == 3)) {
					this._setFocus();
					this.form._playAccessibilityWholeReadLabel("wholeread");
				}
				else {
					is_active_layer = _win._isActiveLayerComponent(this.form);
					if (is_active_layer) {
						this.form._on_focus(true);
					}
				}
			}
		}

		if (this._is_window && this.autosize != true) {
			this._checkValidWindowSize();
		}

		if (this.form && this.form._delayedfocuscomp) {
			if (this._window_type == 5) {
				_window = this._getWindow();
				if (_window && _window._prepared_flag == true) {
					this.form._delayedfocuscomp = null;
					delete this.form._delayedfocuscomp;
				}
			}
			else {
				this.form._delayedfocuscomp = null;
				delete this.form._delayedfocuscomp;
			}
		}
	};

	_pChildFrame._applyDragMoveType = function () {
		var form = this.form;
		if (form) {
			var allow_dragform = false;
			if (this._dragmovetype == 2 || (this._dragmovetype == 1 && !this._isShowTitleBar())) {
				allow_dragform = true;
			}

			{

				form._setDragMove(allow_dragform, this._is_window);
			}
		}

		if (this.titlebar) {
			this.titlebar._setDragMove(this._dragmovetype != 0, this._is_window);
		}
	};

	_pChildFrame._cancelTouchEvent = function () {
		var win = this._getWindow();
		var touch_manager = win ? win._gesture_manager : null;
		if (touch_manager) {
			var session = touch_manager._touch_session;
			if (session && session._cur_input) {
				session._cur_input.preventAction();
			}
		}
	};

	_pChildFrame._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			if (this.form && this.form.titletext.length > 0) {
				if (titletext.length > 0) {
					titletext += " - ";
				}
				titletext += this.form.titletext;
			}
		}
		return titletext;
	};

	_pChildFrame._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			if (this.form && this.form.statustext.length > 0) {
				if (statustext.length > 0) {
					statustext += " - ";
				}
				statustext += this.form.statustext;
			}
		}
		return statustext;
	};

	_pChildFrame._getOpenAlignPos = function (parent_win, left, top, width, height) {
		if (this._openalign) {
			if (parent_win == null) {
				return;
			}

			var _window = this._getWindow();
			var wheelZoomScale = 1.0;
			if (_window && (_window._wheelZoom != undefined) && (_window._wheelZoom != 100)) {
				wheelZoomScale = _window._wheelZoom / 100.0;
			}
			var is_modal = (this._window_type == 1 || this._window_type == 4);
			var p_l = is_modal ? 0 : (parent_win.left | 0);
			var p_t = is_modal ? 0 : (parent_win.top | 0);
			var p_w = parent_win.clientWidth;
			var p_h = parent_win.clientHeight;
			switch (this._openalign.halign) {
				case "left":
					left = p_l;
					break;
				case "center":
					left = p_l + Math.round((p_w - width *  wheelZoomScale) / 2);
					break;
				case "right":
					left = p_l + p_w - width *  wheelZoomScale;
					break;
			}
			switch (this._openalign.valign) {
				case "top":
					top = p_t;
					break;
				case "middle":
					top = p_t + Math.round((p_h - height *  wheelZoomScale) / 2);
					break;
				case "bottom":
					top = p_t + p_h - height *  wheelZoomScale;
					break;
			}
			return {
				left : left, 
				top : top
			};
		}
		return null;
	};

	if (nexacro._Browser == "IE" || nexacro._Browser == "Gecko" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		_pChildFrame._checkValidWindowSize = function () {
			var _window = this._window;
			if (!_window) {
				return;
			}

			var width = this._adjust_width;
			var height = this._adjust_height;
			if ((_window.clientWidth != width || _window.clientHeight != height) && (_window.clientWidth != 0 && _window.clientHeight != 0)) {
				if (this.autosize != true && this._control_element) {
					var control_elem = this._control_element;
					control_elem.setElementSize(width, height);
					control_elem.setElementSize(this._adjust_width, this._adjust_height);
				}

				this._move(this._adjust_left, this._adjust_top, _window.clientWidth, _window.clientHeight);

				if (this.autosize != true) {
					this.on_change_containerRect(this._adjust_width, this._adjust_height);
				}

				return false;
			}

			return true;
		};
	}
	else {
		_pChildFrame._checkValidWindowSize = nexacro._emptyFn;
	}

	_pChildFrame._setModalLock = function (modalWindowOverlayColor) {
		var win;
		if (this._window_type == 5) {
			win = this.parent ? this.parent._getWindow() : null;
		}
		else {
			win = this._getWindow();
		}
		if (!win) {
			win = nexacro._getMainWindowHandle() ? nexacro._getMainWindowHandle()._linked_window : null;
		}

		if (!win) {
			return;
		}

		var cur_focus_path = win.getCurrentFocusPaths() ? win.getCurrentFocusPaths().slice(0) : null;

		win._removeFromCurrentFocusPath(null, false);

		if (cur_focus_path) {
			var cur_focus_path_len = cur_focus_path.length;
			var comp;
			for (var i = cur_focus_path_len; i > 0; i--) {
				comp = cur_focus_path[i - 1];
				comp._changeStatus("mouseover", false);
			}
		}

		var overlaycolor = nexacro.ChildFrame._default_overlaycolor;
		if (modalWindowOverlayColor) {
			overlaycolor = modalWindowOverlayColor;
		}
		else if (this._overlaycolor) {
			overlaycolor = this._overlaycolor;
		}
		var zindex = nexacro._zindex_firstmodal;
		var modal_stack = win._modal_frame_stack;
		if (modal_stack.length > 0) {
			var modal_info = modal_stack[modal_stack.length - 1];
			zindex = modal_info[1] + 1;
		}

		var parent;
		if (this._window_type == 5) {
			parent = this.parent ? ((this.parent._window_type == 5) ? this.parent : this.parent.parent) : null;
		}
		else {
			parent = this.parent;
		}
		if (!parent) {
			var application = nexacro.getApplication();
			if (application) {
				parent = application.mainframe;
			}
		}


		var modal_overlay_elem;
		if (parent) {
			if (this._window_type == 5) {
				modal_overlay_elem = this._modal_overlay_elem = new nexacro.ModalOverlayElement(parent._control_element);
				modal_overlay_elem.setLinkedControl(parent);
				modal_overlay_elem.setElementZIndex(zindex);
				modal_overlay_elem.name = "modal_overlay";
				if (overlaycolor) {
					modal_overlay_elem.setElementBackground(overlaycolor);
				}
				modal_overlay_elem.create(win);

				parent._accessibilityModalLock(modal_stack);
				win._modal_frame_stack.push([this, zindex, cur_focus_path]);
			}
			else {
				modal_overlay_elem = this._modal_overlay_elem = new nexacro.ModalOverlayElement(parent._control_element);
				modal_overlay_elem.setLinkedControl(this);
				modal_overlay_elem.setElementZIndex(zindex);
				modal_overlay_elem.name = "modal_overlay";
				if (overlaycolor) {
					modal_overlay_elem.setElementBackground(overlaycolor);
				}
				modal_overlay_elem.create(win);

				this._accessibilityModalLock(modal_stack);
				win._modal_frame_stack.push([this, zindex, cur_focus_path]);
			}
		}
	};

	_pChildFrame._setModalUnlock = function () {
		var win;
		if (this._window_type == 5) {
			win = this.parent ? this.parent._getWindow() : null;
		}
		else {
			win = this._getWindow();
		}
		if (!win) {
			win = nexacro._getMainWindowHandle() ? nexacro._getMainWindowHandle()._linked_window : null;
		}
		if (!win) {
			return;
		}

		var modal_stack = win._modal_frame_stack;
		var modal_stack_len = modal_stack.length;
		var modal_info;
		for (var i = 0; i < modal_stack_len; i++) {
			modal_info = modal_stack[i];
			if (modal_info[0] == this) {
				for (var j = i; j < modal_stack_len - 1; j++) {
					modal_stack[j] = modal_stack[j + 1];
				}
				modal_stack.length = modal_stack_len - 1;
				break;
			}
		}

		nexacro._unregisterPopupFrame(this.id, win);

		this._accessibilityModalUnLock(modal_stack);

		if (modal_info) {
			var old_focus_path = modal_info[2];
			if (old_focus_path && old_focus_path.length > 0) {
				var old_focus_path_len = old_focus_path.length;
				for (i = 0; i < old_focus_path_len; i++) {
					var comp = old_focus_path[i];
					if (comp instanceof nexacro.ChildFrame) {
						comp._changeStateActivate(true);
						continue;
					}
					else if (comp._is_form) {
						comp._on_focus(true);
						break;
					}

					if (i == (old_focus_path_len - 1)) {
						comp._on_focus(true);
					}
				}
			}
		}

		if (this._modal_overlay_elem) {
			this._modal_overlay_elem.destroy();
			this._modal_overlay_elem = null;
		}
	};

	_pChildFrame._setModalOverlaySize = function (width, height) {
		this._modal_overlay_elem.setElementSize(width, height);

		if (this._state_openstatus == 3) {
			this._setSize(width, height);
		}
	};

	_pChildFrame._recalcModalPosition = function (left, top, width, height) {
		var _window = this._getWindow();
		var wheelZoomScale = 1.0;
		if (_window && (_window._wheelZoom != undefined) && (_window._wheelZoom != 100)) {
			wheelZoomScale = _window._wheelZoom / 100.0;
		}
		left = parseInt(left);
		top = parseInt(top);
		width = parseInt(width);
		height = parseInt(height);

		var win = this._getWindow();
		if (!win) {
			return {
				left : left, 
				top : top, 
				width : width, 
				height : height
			};
		}

		var titleheight = parseInt(this._titlebarheight | 0);
		if (titleheight <= 0) {
			titleheight = this._defaulttitleheight;
		}

		if (left + width *  wheelZoomScale > win.clientWidth) {
			left = win.clientWidth - width *  wheelZoomScale;
		}
		if (top + titleheight *  wheelZoomScale > win.clientHeight) {
			top = win.clientHeight - titleheight *  wheelZoomScale;
		}
		if (left < 0) {
			left = 0;
		}
		if (top < 0) {
			top = 0;
		}

		return {
			left : left, 
			top : top, 
			width : width, 
			height : height
		};
	};

	_pChildFrame._getAutosizedFrameSize = function (include_frame_nc) {
		var width = this._adjust_width;
		var height = this._adjust_height;

		var form = this.form;
		if (form && form._is_loading == false) {
			var layout = form._checkValidLayout();
			if (layout) {
				width = layout.width;
				height = layout.height;
			}
			else {
				width = form._init_width;
				height = form._init_height;
			}
		}

		if (include_frame_nc) {
			var titleheight = 0, statusheight = 0;
			if (this._isShowTitleBar()) {
				titleheight = parseInt(this._titlebarheight) | 0;
			}
			if (this._isShowStatusBar()) {
				statusheight = parseInt(this._statusbarheight) | 0;
			}

			height += titleheight + statusheight;
		}

		return {
			"width" : width, 
			"height" : height
		};
	};

	_pChildFrame._on_apply_locale = function (v) {
		var form = this.form;
		if (form) {
			form._setLocale(v);
		}
	};

	_pChildFrame._getMainFrame = function () {
		var pThis = this;
		while (pThis) {
			pThis = pThis.parent;
			if (pThis && pThis._is_main) {
				return pThis;
			}
		}
		return null;
	};

	nexacro.FrameSetBase = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Frame.call(this, id, left, top, width, height, right, bottom, parent);

		this.frames = new nexacro.Collection();
		this._zordermap = new nexacro.Collection();
		this._separatesize = [];
	};

	var _pFrameSetBase = nexacro._createPrototype(nexacro.Frame, nexacro.FrameSetBase);
	nexacro.FrameSetBase.prototype = _pFrameSetBase;

	_pFrameSetBase._type_name = "FrameSetBase";

	_pFrameSetBase.separatesize = "";
	_pFrameSetBase.keepseparatesizewhenswap = false;
	_pFrameSetBase.ctrltaborder = "active";
	_pFrameSetBase.ctrltabtype = "order";
	_pFrameSetBase.showstatusbar = false;
	_pFrameSetBase.showtitlebar = false;


	_pFrameSetBase._max_frame = null;
	_pFrameSetBase._track_frame = null;
	_pFrameSetBase._active_frame = null;
	_pFrameSetBase._is_frameset = true;
	_pFrameSetBase._is_autorecalc_frame = true;
	_pFrameSetBase.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		var cnt = this.frames.length;
		for (var i = 0; i < cnt; i++) {
			var frame = this.frames[i];
			if (frame.set_resizable) {
				frame.set_resizable(true);
			}
			frame.createComponent();
			this._zordermap.add_item(frame.name, frame);
		}
	};

	_pFrameSetBase.on_change_containerRect = function (width, height) {
		var control_elem = this._control_element;
		if (control_elem) {
		}
	};

	_pFrameSetBase.on_created_contents = function (win) {
		nexacro.Frame.prototype.on_created_contents.call(this, win);

		var lastx = 0, lasty = 0;
		var defaultwidth = 0, defaultheight = 0;
		var control_elem = this._control_element;
		if (control_elem) {
			defaultwidth = control_elem.client_width / 5 *  3;
			defaultheight = control_elem.client_height / 5 *  3;

			lasty = control_elem.client_top;
		}

		var cascadegap = this._titlebarheight;
		var cnt = this.frames.length;
		var frames = this.frames;
		for (var i = 0; i < cnt; i++) {
			var frame_item = frames[i];
			if (frame_item.position) {
				if (frame_item._adjust_width == 0 && frame_item._adjust_height == 0) {
					frame_item._move(lastx, lasty, defaultwidth, defaultheight);

					lastx += cascadegap;
					lasty += cascadegap;
				}
			}
			frame_item.on_created();
		}
	};

	_pFrameSetBase.on_destroy_contents = function () {
		nexacro.Frame.prototype.on_destroy_contents.call(this);

		var cnt = this.frames.length;
		for (var i = cnt - 1; i >= 0; i--) {
			var frame_item = this.frames[i];
			if (frame_item) {
				frame_item.destroyComponent();
			}
		}
		this.frames = null;
	};


	_pFrameSetBase.set_ctrltaborder = function () {
	};

	_pFrameSetBase.set_ctrltabtype = function () {
	};

	_pFrameSetBase.set_tabkeycirculation = nexacro._emptyFn;

	_pFrameSetBase.set_separatesize = function (v) {
		if (v && this.separatesize != v) {
			this.separatesize = v;
			this._separatesize = v.split(",");

			var control_elem = this._control_element;
			if (control_elem) {
				this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
			}
		}
	};

	_pFrameSetBase.set_keepseparatesizewhenswap = function (v) {
		var keepseparatesizewhenswap = nexacro._toBoolean(v);
		if (this.keepseparatesizewhenswap != keepseparatesizewhenswap) {
			this.keepseparatesizewhenswap = keepseparatesizewhenswap;
		}
	};

	_pFrameSetBase.set_minimizedchildposition = function (v) {
		var pre = this.minimizedchildposition;
		if (pre == v) {
			return;
		}

		switch (v) {
			case "left":
				this._minimizedchildposition = 0;
				this.minimizedchildposition = v;
				break;
			case "top":
				this._minimizedchildposition = 1;
				this.minimizedchildposition = v;
				break;
			case "right":
				this._minimizedchildposition = 2;
				this.minimizedchildposition = v;
				break;
			case "bottom":
				this._minimizedchildposition = 3;
				this.minimizedchildposition = v;
				break;
		}

		var control_elem = this._control_element;
		if (this.minimizedchildposition == v && control_elem) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};


	_pFrameSetBase._on_child_movetrack = function (child, x, y, dragdata) {
		var checkx = (this._type_name == "VFrameSet") ? false : true;
		var checky = (this._type_name == "HFrameSet") ? false : true;
		var curx = child._adjust_left + (child._adjust_width / 2);
		var cury = child._adjust_top + (child._adjust_height / 2);
		var hitidx = -1;

		var frames = this.frames;
		var len = frames.length;
		for (var i = 0; i < len; i++) {
			var frame = frames[i];
			if (frame == child) {
				continue;
			}

			if (frame._state_openstatus == 2) {
				continue;
			}

			if (checkx) {
				var loopleft = frame._adjust_left;
				var loopright = loopleft + frame._adjust_width;
				if (loopleft > curx) {
					continue;
				}

				if (loopright < curx) {
					continue;
				}
			}

			if (checky) {
				var looptop = frame._adjust_top;
				var loopbottom = looptop + frame._adjust_height;
				if (looptop > cury) {
					continue;
				}

				if (loopbottom < cury) {
					continue;
				}
			}

			hitidx = i;
			break;
		}

		if (hitidx != (-1)) {
			var curidx = frames.indexOf(child.name);
			var hitchild = frames[hitidx];

			frames.remove_item(hitchild.name);
			frames.insert_item(curidx, hitchild.name, hitchild);

			frames.remove_item(child.name);
			frames.insert_item(hitidx, child.name, child);



			if (this._control_element) {
				this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
			}
		}
	};

	_pFrameSetBase._on_child_starttrack = function (child, x, y, dragdata) {
		if (child) {
			this._track_frame = child;
		}
	};

	_pFrameSetBase._on_child_endtrack = function (child, x, y, dragdata) {
		this._track_frame = null;

		if (this._control_element) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};

	_pFrameSetBase._changeStateActivate = function (cur, activated_child) {
		if (cur == true) {
			if (activated_child) {
				var cur_active = this.getActiveFrame();
				if (cur_active && cur_active != activated_child) {
					cur_active._changeStateActivate(false, null);
				}

				this._active_frame = activated_child;
				if (activated_child._control_element) {
					if (this._zordermap.indexOf(activated_child) < 0) {
						this._zordermap.insert_item(0, activated_child, activated_child.id);
					}

					if (this._zordermap.length > 1) {
						if (this._control_element) {
							this._control_element.bringToFrontElement(activated_child._control_element);
						}

						this._zordermap.remove_item(activated_child.id);
						this._zordermap.add_item(activated_child.id, activated_child);
					}

					if (this._max_frame && this._max_frame != activated_child) {
						activated_child._changeOpenStatus(3);
					}
				}
			}
		}
		else if (cur == false) {
			var frames = this.frames;
			var frames_len = frames.length;
			for (var i = 0; i < frames_len; i++) {
				var child = frames[i];
				if (child._isNested()) {
					child._changeStateActivate(false);
				}
			}
		}

		nexacro.Frame.prototype._changeStateActivate.call(this, cur);
	};

	_pFrameSetBase._changeStateFocus = function (cur, activated_child) {
		if (cur == true) {
			if (activated_child) {
				var cur_active = this.getActiveFrame();
				if (cur_active && cur_active != activated_child) {
					cur_active._changeStateActivate(false, null);
				}

				this._active_frame = activated_child;
				if (activated_child._control_element) {
					if (this._zordermap.indexOf(activated_child) < 0) {
						this._zordermap.insert_item(0, activated_child, activated_child.id);
					}

					if (this._zordermap.length > 1) {
						if (this._control_element) {
							this._control_element.bringToFrontElement(activated_child._control_element);
						}

						this._zordermap.remove_item(activated_child.id);
						this._zordermap.add_item(activated_child.id, activated_child);
					}

					if (this._max_frame && this._max_frame != activated_child) {
						activated_child._changeOpenStatus(3);
					}
				}
			}
		}
		else if (cur == false) {
			var frames = this.frames;
			var frames_len = frames.length;
			for (var i = 0; i < frames_len; i++) {
				var child = frames[i];
				if (child._isNested()) {
					child._changeStateActivate(false);
				}
			}
		}

		nexacro.Frame.prototype._changeStateFocus.call(this, cur);
	};
	_pFrameSetBase.on_apply_prop_enable = function (v) {
		var frames = this.frames;
		var len = frames.length;
		for (var i = 0; i < len; i++) {
			var frame = frames[i];
			frame._setEnable(v);
		}
	};

	_pFrameSetBase.getActiveFrame = function () {
		if (this._active_frame) {
			return this._active_frame;
		}

		return this._getTopOrderFrame();
	};

	_pFrameSetBase.getHandle = function () {
	};


	_pFrameSetBase._getTopOrderFrame = function () {
		var len = this._zordermap.length;
		if (len > 0) {
			var obj = this._zordermap.get_item(len - 1);
			return obj;
		}

		return null;
	};

	_pFrameSetBase._getNextOrderFrame = function (target) {
		var len = this._zordermap.length;
		if (len > 0) {
			var idx = this._zordermap.indexOf(target.id);
			if (idx - 1 > len - 1 && idx - 1 < 0) {
				return null;
			}

			var obj = this._zordermap.get_item(idx - 1);
			return obj;
		}
		return null;
	};

	_pFrameSetBase._visibleFrameCount = function () {
		return this.frames.length;
	};

	_pFrameSetBase._getMinimizeFrameCount = function () {
		var cnt = 0;
		var frames = this.frames;
		var len = frames.length;
		for (var i = 0; i < len; i++) {
			if (this.frames[i]._state_openstatus == 2) {
				cnt++;
			}
		}
		return cnt;
	};

	_pFrameSetBase._recalcSeparateFrameSize = function (totalsize, inframecnt, inseparatecnt) {
		var separateframesize = [];

		var framecnt = ((inframecnt) ? inframecnt : this._visibleFrameCount());

		var dividecnt = 0, fixedcnt = 0;
		var totalfixedsize = 0, dividesize = 0;

		var separatesize = this._separatesize;
		var i;
		for (i = 0; i < framecnt; i++) {
			var str = separatesize[i];
			var pos = -1;
			var size = -1;
			if (str) {
				str.trim();
				pos = str.indexOf("*");
				size = ((pos < 0) && (str.length > 0)) ? nexacro._parseInt(str) : -1;
			}
			if (size == -1) {
				var ntimes = -1;
				if (str) {
					ntimes = nexacro._parseInt(str.substring(0, pos));
				}

				if (ntimes > 0) {
					dividecnt += ntimes;
					separateframesize[i] = ntimes *  size;
				}
				else {
					dividecnt++;
					separateframesize[i] = size;
				}
			}
			else {
				fixedcnt++;
				totalfixedsize += size;
				if (totalfixedsize <= totalsize) {
					separateframesize[i] = size;
				}
				else if (fixedcnt == 1) {
					separateframesize[i] = totalsize;
				}
				else {
					totalfixedsize -= size;
				}
			}
		}

		dividesize = dividecnt > 0 ? (totalsize - totalfixedsize) / dividecnt : 0;

		for (i = 0; i < framecnt; i++) {
			if (separateframesize[i] < 0) {
				separateframesize[i] = Math.abs(separateframesize[i]) *  dividesize;
			}
			else if (separateframesize[i] == undefined) {
				separateframesize[i] = 0;
			}
		}

		return separateframesize;
	};

	_pFrameSetBase._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			var activeframe = this.getActiveFrame();
			if (activeframe) {
				var subtitletext = activeframe._getTitleText(true);
				if (subtitletext && subtitletext.length > 0) {
					if (titletext.length > 0) {
						titletext += " - ";
					}
					titletext += subtitletext;
				}
			}
		}
		return titletext;
	};

	_pFrameSetBase._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			var activeframe = this.getActiveFrame();
			if (activeframe) {
				var substatustext = activeframe._getStatusText(true);
				if (substatustext.length > 0) {
					if (statustext.length > 0) {
						statustext += " - ";
					}
					statustext += substatustext;
				}
			}
		}
		return statustext;
	};

	_pFrameSetBase._getFocusChildFrame = function (frame) {
		var _tabkeycirculation = this._tabkeycirculation;
		var _last_focused = this._last_focused;
		if (this._is_frameset && 
			this instanceof nexacro.FrameSet) {
			if (_tabkeycirculation == 2 || _tabkeycirculation == 3) {
				if (((_tabkeycirculation == 2 || _tabkeycirculation == 3) && this._arrange == 0) || (_tabkeycirculation == 2 && this._arrange != 0)) {
					if (_last_focused) {
						if (_last_focused._isFocusAcceptable()) {
							return _last_focused;
						}
						else {
							if (frame._isFocusAcceptable()) {
								return frame;
							}
						}
					}
					else {
						if (frame._isFocusAcceptable()) {
							return frame;
						}
					}
				}
				else if (_tabkeycirculation == 3) {
					if (frame._isFocusAcceptable()) {
						return frame;
					}
				}
			}
			else {
				if (_tabkeycirculation == 0 || (_tabkeycirculation == 1 && frame._state_openstatus != 2)) {
					if (frame._isFocusAcceptable()) {
						return frame;
					}
				}
			}
		}
		else if (frame._isFocusAcceptable()) {
			return frame;
		}

		return null;
	};

	_pFrameSetBase._getNextChildFrame = function (frames) {
		var n = frames ? frames.length : 0;
		for (var i = 0; i < n; i++) {
			var frame_ = frames[i];
			if (frame_._is_frameset) {
				if (frame_._getNextChildFrame) {
					var ret = frame_._getNextChildFrame(frame_.frames);
					if (ret) {
						return ret;
					}
				}
			}
			else {
				if (frame_.parent._is_frameset) {
					var f = frame_.parent._getFocusChildFrame(frame_);
					if (f) {
						return f;
					}
					else {
						continue;
					}
				}
			}
		}

		return null;
	};

	_pFrameSetBase._getNextFrame = function (id, cycle) {
		var frames = this.frames;
		var n = frames ? frames.length : 0;
		var frame = null;
		for (var i = 0; i < n; i++) {
			if (frames[i]._is_frameset) {
				if (id != frames[i].id) {
					if (frames[i]._isFocusAcceptable()) {
						frame = frames[i]._getNextChildFrame(frames[i].frames);
						break;
					}
				}
			}
			else if (frames[i] instanceof nexacro.ChildFrame) {
				if (frames[i]._isFocusAcceptable()) {
					frame = this._getFocusChildFrame(frames[i]);
					break;
				}
				else {
					continue;
				}
			}
		}

		if (this.parent._is_frameset) {
			return this.parent._getNextFrame(this.parent.id, cycle);
		}
		else {
			if (cycle) {
				if (frame) {
					return frame;
				}
			}
			else {
				return null;
			}
		}

		return null;
	};
	_pFrameSetBase._getPrevChildFrame = function (frames) {
		var _frames = frames ? frames : null;
		if (_frames) {
			var n = _frames.length;
			for (var i = n - 1; i >= 0; i--) {
				var frame_ = _frames[i];
				if (frame_._getPrevChildFrame) {
					var ret = frame_._getPrevChildFrame(frame_.frames);
					if (ret) {
						return ret;
					}
				}
				else {
					if (frame_.parent._is_frameset) {
						var f = frame_.parent._getFocusChildFrame(frame_);
						if (f) {
							return f;
						}
						else {
							continue;
						}
					}
				}
			}
		}
		return null;
	};

	_pFrameSetBase._getPrevFrame_ = function (id, cycle) {
		var childframe_idx = -1;
		var frameset_idx = -1;
		var frames = this.frames;
		var n = frames ? frames.length : 0;
		var frame = null;
		for (var i = n - 1; i >= 0; i--) {
			if (frames[i]._is_frameset) {
				if (id == frames[i].id) {
					frameset_idx = i;
				}
				else {
					if (frames[i]._isFocusAcceptable()) {
						frame = frames[i]._getPrevChildFrame(frames[i].frames);
						break;
					}
				}
			}
			else if (frames[i] instanceof nexacro.ChildFrame) {
				if (childframe_idx == -1 && frames[i]._isFocusAcceptable()) {
					childframe_idx = i;
					frame = this._getFocusChildFrame(frames[i]);
					break;
				}
				else {
					continue;
				}
			}
		}

		if (childframe_idx != -1 && childframe_idx < frameset_idx) {
			{

				if (frame) {
					return frame;
				}
			}
		}
		else {
			if (this.parent._is_frameset) {
				return this.parent._getPrevFrame_(this.parent.id, cycle);
			}
			else {
				if (cycle) {
					if (frame) {
						return frame;
					}
				}
				else {
					return null;
				}
			}
		}

		return null;
	};
	_pFrameSetBase._on_apply_locale = function (v) {
		var frames = this.frames;
		if (frames) {
			var frame;
			for (var i = 0; i < frames.length; i++) {
				frame = frames[i];
				if (frame) {
					frame._on_apply_locale(v);
				}
			}
		}
	};



	nexacro.FrameSet = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, left, top, width, height, right, bottom, parent);

		this._separatesize = [];
	};

	var _pFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.FrameSet);
	nexacro.FrameSet.prototype = _pFrameSet;

	_pFrameSet._type_name = "FrameSet";

	_pFrameSet.separatesize = "";
	_pFrameSet.keepseparatesizewhenswap = false;
	_pFrameSet.ctrltaborder = 0;
	_pFrameSet.ctrltabtype = 0;
	_pFrameSet.minimizedchildposition = "bottom";
	_pFrameSet.tabkeycirculation = "all";
	_pFrameSet._tabkeycirculation = 0;
	_pFrameSet.restorechildpositiontype = "normal";
	_pFrameSet._minimizedchildposition = 3;
	_pFrameSet._is_autorecalc_frame = false;
	_pFrameSet._arrange = 0;


	_pFrameSet.set_tabkeycirculation = function (v) {
		this.tabkeycirculation = v;
		switch (v) {
			case "all,no_minimize":
				this._tabkeycirculation = 1;
				break;
			case "active_only":
				this._tabkeycirculation = 2;
				break;
			case "auto":
				this._tabkeycirculation = 3;
				break;
			default:
				this._tabkeycirculation = 0;
				this.tabkeycirculation = "all";
				break;
		}
	};

	_pFrameSet.set_minimizewidth = function (minimizewidth) {
		minimizewidth = parseInt(minimizewidth);
		this.minimizewidth = minimizewidth;
		this.on_apply_minimizewidth(minimizewidth);
	};

	_pFrameSet.on_apply_minimizewidth = function () {
		if (this._is_created) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};

	_pFrameSet.set_minimizeheight = function (minimizeheight) {
		minimizeheight = parseInt(minimizeheight);
		this.minimizeheight = minimizeheight;
		this.on_apply_minimizeheight(minimizeheight);
	};

	_pFrameSet.on_apply_minimizeheight = function () {
		if (this._is_created) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};



	_pFrameSet.set_restorechildpositiontype = function (val) {
		var restorechildpositiontype = val;

		if (this.restorechildpositiontype != restorechildpositiontype) {
			switch (restorechildpositiontype) {
				case "normal":
				case "keepmaximizeposition":
					this.restorechildpositiontype = restorechildpositiontype;
					break;
				default:
					break;
			}
		}
	};


	_pFrameSet.on_change_containerRect = function (width, height) {
		var control_elem = this._control_element;
		if (control_elem) {
			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();
			var frameleft = 0;
			var frametop = 0;
			var framewidth = client_width;
			var frameheight = client_height;
			var frameright = frameleft + client_width;
			var framebottom = frametop + client_height;

			if (this._max_frame) {
				this._max_frame._move(frameleft, frametop, framewidth, frameheight);
			}

			var i;
			var frames = this.frames;
			var len = frames.length;
			for (i = 0; i < len; i++) {
				var child = frames[i];
				if (child == this._max_frame) {
					continue;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					var minwidth = this.minimizewidth ? this.minimizewidth : 125;

					var minheight = this.minimizeheight;
					if (!minheight) {
						minheight = child._titlebarheight;
					}

					switch (this._minimizedchildposition) {
						case 0:
							framebottom = frametop + minheight;
							child._move(frameleft, frametop, minwidth, minheight);
							frametop = framebottom;
							break;
						case 1:
							frameright = frameleft + minwidth;
							child._move(frameleft, frametop, minwidth, minheight);
							frameleft = frameright;
							break;
						case 2:
							framebottom = frametop + minheight;
							child._move(frameright - minwidth, frametop, minwidth, minheight);
							frametop = framebottom;
							break;
						case 3:
							frameright = frameleft + minwidth;
							child._move(frameleft, framebottom - minheight, minwidth, minheight);
							frameleft = frameright;
							break;
					}
				}
			}
		}
	};




	_pFrameSet.arrange = function (v) {
		var max_frame = this._max_frame;
		if (max_frame) {
			max_frame._on_syscommand(max_frame.getElement(), "restore", true, max_frame, null);
		}

		var arrangecnt = 0;
		var frames = this.frames;
		var len = frames.length;
		var i, j, child, fixed, colcnt, rowcnt, left, col, rc, width, height, row;
		for (i = 0; i < len; i++) {
			child = this._zordermap[i];
			if (child.visible == false || child._state_openstatus == 2) {
				continue;
			}
			arrangecnt++;
		}

		var frameleft = 0;
		var frametop = 0;
		var framewidth = this._getClientWidth();
		var frameheight = this._getClientHeight();
		if (v == "cascade") {
			this._arrange = 0;
			var cascadecnt = 0;
			for (var temp = 100; ; cascadecnt++) {
				if (this._getClientHeight() < temp) {
					break;
				}
				temp += (60 + (cascadecnt *  10));
			}

			var cascadegapx = parseInt(this._titlebarheight) | this._defaulttitleheight;
			var cascadegapy = cascadegapx;
			framewidth = this._getClientWidth() - (cascadegapx *  cascadecnt);
			frameheight = this._getClientHeight() - (cascadegapy *  cascadecnt);
			for (i = 0, j = 0; i < this.frames.length; i++) {
				child = this._zordermap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				frameleft = cascadegapx *  (j % (cascadecnt + 1));
				frametop = cascadegapy *  (j % (cascadecnt + 1));

				child._move(frameleft, frametop, framewidth, frameheight);

				j++;
			}
		}
		if (v == "tilevertical") {
			this._arrange = 1;
			fixed = true;
			rowcnt = parseInt(Math.sqrt(arrangecnt)) | 0;
			colcnt = parseInt(arrangecnt / rowcnt) | 0;

			if ((arrangecnt % rowcnt) != 0) {
				rowcnt += 1;
				fixed = false;
			}

			left = arrangecnt;
			for (col = 0, i = 0; col < colcnt; col++) {
				for (row = 0; row < rowcnt; ) {
					child = this._zordermap[i];
					if (child.visible == false || child._state_openstatus == 2) {
						continue;
					}

					rc = {
						left : frameleft, 
						top : frametop, 
						right : frameleft + framewidth, 
						bottom : frametop + frameheight
					};
					rc.right = rc.left + ((rc.right - rc.left) / colcnt);
					rc.bottom = rc.top + ((rc.bottom - rc.top) / rowcnt);

					width = rc.right - rc.left;
					height = rc.bottom - rc.top;
					rc.left += (colcnt - col - 1) *  width;
					rc.top += (rowcnt - row - 1) *  height;
					rc.right += (colcnt - col - 1) *  width;
					rc.bottom += (rowcnt - row - 1) *  height;

					child._move(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top);
					row++;
					i++;
					left--;
				}

				if (!fixed && rowcnt > 2 && (left % (rowcnt - 1)) == 0) {
					rowcnt--;
					fixed = true;
				}
			}
		}
		if (v == "tilehorizontal") {
			this._arrange = 2;
			fixed = true;
			colcnt = parseInt(Math.sqrt(arrangecnt)) | 0;
			rowcnt = parseInt(arrangecnt / colcnt) | 0;

			if ((arrangecnt % colcnt) != 0) {
				rowcnt += 1;
				fixed = false;
			}

			left = arrangecnt;
			for (col = 0, i = 0; col < colcnt; col++) {
				for (row = 0; row < rowcnt; ) {
					child = this._zordermap[i];
					if (child.visible == false || child._state_openstatus == 2) {
						continue;
					}

					rc = {
						left : frameleft, 
						top : frametop, 
						right : frameleft + framewidth, 
						bottom : frametop + frameheight
					};
					rc.right = rc.left + ((rc.right - rc.left) / colcnt);
					rc.bottom = rc.top + ((rc.bottom - rc.top) / rowcnt);

					width = rc.right - rc.left;
					height = rc.bottom - rc.top;
					rc.left += (colcnt - col - 1) *  width;
					rc.top += (rowcnt - row - 1) *  height;
					rc.right += (colcnt - col - 1) *  width;
					rc.bottom += (rowcnt - row - 1) *  height;

					child._move(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top);
					row++;
					i++;
					left--;
				}

				if (!fixed && rowcnt > 2 && (left % (rowcnt - 1)) == 0) {
					rowcnt--;
					fixed = true;
				}
			}
		}
		if (v == "vertical") {
			this._arrange = 3;
			for (i = 0, j = 0; i < this.frames.length; i++) {
				child = this._zordermap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				child._move(frameleft + (j *  (framewidth / arrangecnt)), frametop, (framewidth / arrangecnt), frameheight);
				j++;
			}
		}
		if (v == "horizontal") {
			this._arrange = 4;
			var top = frametop;
			for (i = 0; i < this.frames.length; i++) {
				child = this._zordermap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				rc = {
					left : frameleft, 
					top : frametop, 
					right : frameleft + framewidth, 
					bottom : frametop + frameheight
				};
				rc.top = top;
				rc.bottom = rc.top + (frameheight / arrangecnt);

				var miny = 0;

				if (rc.bottom - rc.top < miny) {
					rc.bottom = rc.top + miny;
				}

				top = rc.bottom + 1;
				child._move(frameleft, rc.top, framewidth, rc.bottom - rc.top);
			}
		}
	};



	nexacro.VFrameSet = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, left, top, width, height, right, bottom, parent);
	};
	var _pVFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.VFrameSet);
	nexacro.VFrameSet.prototype = _pVFrameSet;

	_pVFrameSet._type_name = "VFrameSet";

	_pVFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framesize = this._recalcSeparateFrameSize(height);
			var cnt = this.frames.length;
			var frameleft = 0;
			var frametop = 0;
			var framebottom = 0;
			var frameright = frameleft + width;

			var maxframeheight = this._getClientHeight();
			var child, i, minheight, titleheight;
			if (this._max_frame) {
				var maxidx = -1;
				for (i = 0; i < cnt; i++) {
					child = this.frames[i];
					if (child == this._max_frame) {
						maxidx = i;
						continue;
					}
					if (child instanceof nexacro.FrameSetBase) {
						var h = child.frames ? child.frames[0]._titlebarheight : 0;
						titleheight = h;
					}
					else {
						titleheight = child._titlebarheight;
					}

					minheight = parseInt(titleheight) | 0;


					maxframeheight -= minheight;
					framesize[i] = minheight;
				}

				framesize[maxidx] = maxframeheight;
			}

			var preframe_minimized = false;
			var gap = 0;
			for (i = 0; i < cnt; i++) {
				child = this.frames[i];

				if (preframe_minimized) {
					frametop = framebottom;
					preframe_minimized = false;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					titleheight = child._titlebarheight;
					minheight = parseInt(titleheight) | 0;


					gap += framesize[i] - minheight;
					framesize[i] = minheight;
					preframe_minimized = true;
				}

				if (child._state_openstatus != 2) {
					framesize[i] += gap;
					gap = 0;
				}

				framebottom = framesize[i] + frametop;
				if (child != this._track_frame) {
					child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}
				frametop = framebottom;
			}
		}
	};

	_pVFrameSet.arrange = nexacro._emptyFn;

	_pVFrameSet.set_minimizedchildposition = nexacro._emptyFn;



	nexacro.HFrameSet = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, left, top, width, height, right, bottom, parent);
	};
	var _pHFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.HFrameSet);
	nexacro.HFrameSet.prototype = _pHFrameSet;

	_pHFrameSet._type_name = "HFrameSet";

	_pHFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framesize = this._recalcSeparateFrameSize(width);
			var cnt = this.frames.length;
			var frameleft = 0;
			var frametop = 0;
			var frameright = 0;
			var framebottom = frametop + height;

			var maxframewidth = this._getClientWidth();
			var child, i, minwidth, titleheight;
			if (this._max_frame) {
				var maxidx = -1;
				for (i = 0; i < cnt; i++) {
					child = this.frames[i];
					if (child == this._max_frame) {
						maxidx = i;
						continue;
					}
					titleheight = child._titlebarheight;
					minwidth = parseInt(titleheight) | 0;


					maxframewidth -= minwidth;
					framesize[i] = minwidth;
				}

				framesize[maxidx] = maxframewidth;
			}

			var preframe_minimized = false;
			var gap = 0;
			for (i = 0; i < cnt; i++) {
				child = this.frames[i];

				if (preframe_minimized) {
					frameleft = frameright;
					preframe_minimized = false;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(true);

					titleheight = child._titlebarheight;
					minwidth = parseInt(titleheight) | 0;


					gap += framesize[i] - minwidth;
					framesize[i] = minwidth;
					preframe_minimized = true;
				}

				if (child._state_openstatus != 2) {
					if (this._max_frame && child != this._max_frame) {
						child._setVerticalMin(true);
					}
					else {
						child._setVerticalMin(false);
					}

					framesize[i] += gap;
					gap = 0;
				}

				frameright = framesize[i] + frameleft;
				if (child != this._track_frame) {
					child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}
				frameleft = frameright;
			}
		}
	};

	_pHFrameSet.arrange = nexacro._emptyFn;

	_pHFrameSet.set_minimizedchildposition = nexacro._emptyFn;



	nexacro.TileFrameSet = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, left, top, width, height, right, bottom, parent);
	};
	var _pTileFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.TileFrameSet);
	nexacro.TileFrameSet.prototype = _pTileFrameSet;

	_pTileFrameSet._type_name = "TileFrameSet";
	_pTileFrameSet.separatetype = "horizontal";
	_pTileFrameSet.separatecount = 1;
	_pTileFrameSet.fullframemaximize = true;
	_pTileFrameSet.minimizedchildposition = "bottom";


	_pTileFrameSet._separatetype = 0;
	_pTileFrameSet._minimizedchildposition = 3;
	_pTileFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framecnt = this.frames.length;

			var fullframewidth = this._getClientWidth();
			var fullframeheight = this._getClientHeight();

			var i;
			if (this.fullframemaximize == false) {
				if (this._max_frame) {
					for (i = 0; i < this.frames.length; i++) {
						if (this._max_frame != this.frames[i] && this.frames[i]._state_openstatus != 2) {
							this.frames[i].openstatus = "minimize";
							this.frames[i]._changeOpenStatus(2);
						}
					}
				}
				else {
					for (i = 0; i < this.frames.length; i++) {
						if (this.frames[i]._state_openstatus == 2) {
							this.frames[i].openstatus = "normal";
							this.frames[i]._changeOpenStatus(0);
						}
					}
				}
			}

			var minimizeframecnt = this._getMinimizeFrameCount();
			var normalframecnt = (framecnt - minimizeframecnt) > 0 ? framecnt - minimizeframecnt : 1;
			var separatecnt = this.separatecount > 0 ? this.separatecount : 1;
			var framerowcnt = parseInt(normalframecnt / separatecnt) + (parseInt(normalframecnt % separatecnt) > 0 ? 1 : 0);

			var horzminarea = false;
			if (this._minimizedchildposition == 1 || this._minimizedchildposition == 3) {
				horzminarea = true;
			}

			var minareawidth = 0, minareaheight = 0;
			if (horzminarea) {
				minareawidth = width;
				if (minimizeframecnt > 0) {
					minareaheight = this._getMaxMinimizedHeight();
				}
			}
			else {
				minareaheight = height;
				if (minimizeframecnt > 0) {
					minareawidth = this._getMaxMinimizedWidth();
				}
			}

			var displayframewidth = 0, displayframeheight = 0;
			if (this._separatetype == 1) {
				displayframewidth = (width - (horzminarea ? 0 : minareawidth)) / framerowcnt;
				displayframeheight = height - (horzminarea ? minareaheight : 0);
			}
			else {
				displayframewidth = width - (horzminarea ? 0 : minareawidth);
				displayframeheight = (height - (horzminarea ? minareaheight : 0)) / framerowcnt;
			}

			var realcolcnt = normalframecnt - separatecnt > 0 ? separatecnt : normalframecnt;

			var realtotalsize = 0;
			if (this._separatetype == 1) {
				realtotalsize = height;
				if (horzminarea) {
					realtotalsize -= minareaheight;
				}
			}
			else {
				realtotalsize = width;
				if (!horzminarea) {
					realtotalsize -= minareawidth;
				}
			}

			var framesize = this._recalcSeparateFrameSize(realtotalsize, realcolcnt, realcolcnt);
			var frameleft = 0;
			var frametop = 0;
			var frameright = frameleft + width;
			var framebottom = frametop + height;
			if (minimizeframecnt > 0) {
				switch (this._minimizedchildposition) {
					case 0:
						frameleft += minareawidth;
						break;
					case 1:
						frametop += minareaheight;
						break;
					case 2:
						frameright -= minareawidth;
						break;
					case 3:
						framebottom -= minareaheight;
						break;
				}
			}

			if (this._separatetype == 1) {
				frameright = frameleft + displayframewidth;
			}
			else {
				framebottom = frametop + displayframeheight;
			}

			if (this._max_frame) {
				if (this.fullframemaximize) {
					this._max_frame._move(0, 0, fullframewidth, fullframeheight);
				}
				else {
					this._max_frame._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}

				if (this._control_element && this._max_frame._control_element) {
					this._control_element.bringToFrontElement(this._max_frame._control_element);
				}
			}
			else if (this.fullframemaximize == false) {
				for (i = 0; i < this.frames.length; i++) {
					if (this.frames[i]._state_openstatus == 2) {
						this.frames[i]._changeOpenStatus(1);
					}
				}
			}

			var j = 0, k = 0;
			var child;
			for (i = 0; i < framerowcnt; i++) {
				for (j = 0; j < realcolcnt && k < framecnt; k++) {
					child = this.frames[k];
					if (child == this._max_frame) {
						continue;
					}

					if (child._state_openstatus == 2) {
						continue;
					}

					if (this._separatetype == 1) {
						framebottom = framesize[j] + frametop;
					}
					else {
						frameright = framesize[j] + frameleft;
					}

					if (child != this._track_frame) {
						child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
					}

					if (this._separatetype == 1) {
						frametop = framebottom;
					}
					else {
						frameleft = frameright;
					}

					j++;
				}

				if (this._separatetype == 1) {
					frametop = 0;
					frameleft = frameright;
					frameright = frameleft + displayframewidth;

					if (this._minimizedchildposition == 1) {
						frametop += minareaheight;
					}
				}
				else {
					frameleft = 0;
					frametop = framebottom;
					framebottom = frametop + displayframeheight;

					if (this._minimizedchildposition == 0) {
						frameleft += minareawidth;
					}
				}
			}

			if (minimizeframecnt <= 0) {
				return;
			}

			var minframeleft = 0;
			var minframetop = 0;
			var minframeright = minframeleft + this._getClientWidth();
			var minframebottom = minframetop + this._getClientHeight();
			switch (this._minimizedchildposition) {
				case 0:
					minframeright = minframeleft + minareawidth;
					break;
				case 1:
					minframebottom = minframetop + minareaheight;
					break;
				case 2:
					minframeleft = minframeright - minareawidth;
					break;
				case 3:
					minframetop = minframebottom - minareaheight;
					break;
			}


			var defaultminwidth = this.minimizewidth ? this.minimizewidth : 150;
			var minwidth = width - (minimizeframecnt *  defaultminwidth);
			minwidth = minwidth > 0 ? defaultminwidth : (width / minimizeframecnt);
			minwidth = minwidth < 100 ? 100 : minwidth;

			for (i = 0; i < framecnt; i++) {
				child = this.frames[i];
				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					var minheight = this.minimizeheight;
					if (!minheight) {
						var titleheight = child._titlebarheight;
						minheight = parseInt(titleheight) | 0;

						var border = child._getCurrentStyleBorder();
						if (border) {
							minheight += border._getBorderHeight();
						}
					}

					switch (this._minimizedchildposition) {
						case 0:
						case 2:
							minframebottom = minframetop + minheight;
							child._move(minframeleft, minframetop, minframeright - minframeleft, minheight);
							minframetop = minframebottom;
							break;
						case 1:
						case 3:
							minframeright = minframeleft + minwidth;
							child._move(minframeleft, minframetop, minwidth, minframebottom - minframetop);
							minframeleft = minframeright;
							break;
					}
				}
			}
		}
	};

	_pTileFrameSet.set_separatetype = function (v) {
		if (this.separatetype != v) {
			this.separatetype = v;
			this._separatetype = (v == "vertical" ? 1 : 0);

			if (this._control_element) {
				this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
			}
		}
	};

	_pTileFrameSet.set_separatecount = function (v) {
		var separatecount = nexacro._parseInt(v);
		if (this.separatecount != separatecount) {
			if (separatecount < 0) {
				this.separatecount = 1;
			}
			else {
				this.separatecount = separatecount;
			}

			if (this._control_element) {
				this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
			}
		}
	};

	_pTileFrameSet.set_fullframemaximize = function (v) {
		var fullframemaximize = nexacro._toBoolean(v);
		if (this.fullframemaximize != fullframemaximize) {
			this.fullframemaximize = fullframemaximize;

			for (var i = 0; i < this.frames.length; i++) {
				var child = this.frames[i];
				if (child.titlebar) {
					if (fullframemaximize == false) {
						child.titlebar._setAbsoluteStyle(0x0001, 0);
					}
					else {
						child.titlebar._setAbsoluteStyle(0x0100, 0x0001);
						child.titlebar._setAbsoluteStyle(0, 0x0100);
					}
				}
			}

			if (this._control_element) {
				this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
			}
		}
	};

	_pTileFrameSet.set_minimizewidth = function (minimizewidth) {
		minimizewidth = parseInt(minimizewidth);
		this.minimizewidth = minimizewidth;
		this.on_apply_minimizewidth(minimizewidth);
	};

	_pTileFrameSet.on_apply_minimizewidth = function () {
		if (this._is_created) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};

	_pTileFrameSet.set_minimizeheight = function (minimizeheight) {
		minimizeheight = parseInt(minimizeheight);
		this.minimizeheight = minimizeheight;
		this.on_apply_minimizeheight(minimizeheight);
	};

	_pTileFrameSet.on_apply_minimizeheight = function () {
		if (this._is_created) {
			this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
		}
	};
	_pTileFrameSet.arrange = nexacro._emptyFn;



	_pTileFrameSet._getMaxMinimizedWidth = function () {
		return this.minimizewidth ? this.minimizewidth : 150;
	};

	_pTileFrameSet._getMaxMinimizedHeight = function () {
		var max = -1;
		for (var i = 0; i < this.frames.length; i++) {
			var child = this.frames[i];
			if (child._state_openstatus != 2) {
				continue;
			}

			var minheight = this.minimizeheight;
			if (!minheight) {
				var titleheight = child._titlebarheight;
				minheight = parseInt(titleheight) | 0;

				var border = child._getCurrentStyleBorder();
				if (border) {
					minheight += border._getBorderHeight();
				}

				if (minheight > max) {
					max = minheight;
				}
			}
		}

		return max > 0 ? max : (this.minimizeheight ? this.minimizeheight : 25);
	};




	if (!nexacro._MainStatusBarControl) {
		nexacro._MainStatusBarControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.StatusBarControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		};

		var __pMainStatusBarControl = nexacro._createPrototype(nexacro.StatusBarControl, nexacro._MainStatusBarControl);
		nexacro._MainStatusBarControl.prototype = __pMainStatusBarControl;

		__pMainStatusBarControl._type_name = "StatusBarControl";
		__pMainStatusBarControl._is_subcontrol = true;


		__pMainStatusBarControl._comm_progress_ref = 0;
		__pMainStatusBarControl._comm_progress_timer = null;



		if (nexacro._Browser == "Runtime") {
			__pMainStatusBarControl._beginCommProgress = function () {
				var cur_ref = ++this._comm_progress_ref;
				if (cur_ref == 1) {
					var progressbar = this.progressbar;
					if (progressbar) {
						progressbar.set_max(1000);
						progressbar.set_pos(0);
					}

					var progress_timer = new nexacro._CallbackTimer(this, function () {
						var progressbar = this.progressbar;
						if (!progressbar) {
							return;
						}

						var cur_pos = progressbar.pos;
						cur_pos += Math.max(1, (1000 - cur_pos) / (100 *  this._comm_progress_ref));
						if (cur_pos > 990) {
							cur_pos = 990;
						}

						progressbar.set_pos(cur_pos);
					}, 500);
					progress_timer.start();
					this._comm_progress_timer = progress_timer;
				}
			};

			__pMainStatusBarControl._stepCommProgress = function (current, overall) {
				var progressbar = this.progressbar;
				if (progressbar) {
					progressbar.set_max(overall);
					progressbar.set_pos(current);
				}
			};

			__pMainStatusBarControl._endCommProgress = function () {
				var cur_ref = --this._comm_progress_ref;
				if (cur_ref == 0) {
					var progressbar = this.progressbar;
					if (progressbar) {
						progressbar.set_pos(0);
					}

					if (this._comm_progress_timer) {
						this._comm_progress_timer.stop();
					}
				}
			};
		}
		else {
			__pMainStatusBarControl._beginCommProgress = nexacro._emptyFn;
			__pMainStatusBarControl._stepCommProgress = nexacro._emptyFn;
			__pMainStatusBarControl._endCommProgress = nexacro._emptyFn;
		}
	}
}
if (_process) {
	delete _process;
	delete _pFrame;
	delete _pMainFrame;
	delete _pChildFrame;
	delete _pFrameSetBase;
	delete _pFrameSet;
	delete _pVFrameSet;
	delete _pHFrameSet;
	delete _pTileFrameSet;
	delete __pMainStatusBarControl;
}

