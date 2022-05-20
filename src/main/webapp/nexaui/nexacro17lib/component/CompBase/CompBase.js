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

if (!nexacro.Component) {
	"use strict";

	var _process = true;

	nexacro.Component = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		if (parent) {
			this._refform = this._findForm(parent);
		}

		var horz = 0;
		var vert = 0;

		if (left != null) {
			horz++;
		}
		if (width != null) {
			horz++;
		}
		if (right != null) {
			horz++;
		}
		if (top != null) {
			vert++;
		}
		if (height != null) {
			vert++;
		}
		if (bottom != null) {
			vert++;
		}

		if (horz >= 2 && vert >= 2) {
			this.left = left;
			this.top = top;
			this.width = width;
			this.height = height;
			if (!(left != undefined && width != undefined && right != undefined)) {
				this.right = right;
			}
			if (!(top != undefined && height != undefined && bottom != undefined)) {
				this.bottom = bottom;
			}

			this._setMaxwidth(maxwidth);
			this._setMinwidth(minwidth);
			this._setMaxheight(maxheight);
			this._setMinheight(minheight);

			this._parseArrangeInfo(left, top, right, bottom, width, height);
			this._calcArrangePosition();
		}

		this._makeStatusMap();
	};

	var _pComponent = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.Component);
	nexacro.Component.prototype = _pComponent;
	_pComponent._type_name = "Component";


	_pComponent.hscrollbar = null;
	_pComponent.vscrollbar = null;
	_pComponent._control_element = null;


	_pComponent.expr = "";
	_pComponent.cssclass = "";
	_pComponent.visible = true;
	_pComponent.enable = true;
	_pComponent.taborder = 0;
	_pComponent.tabstop = true;
	_pComponent.hotkey = "";
	_pComponent.transparenthittest = false;
	_pComponent.enableredraw = true;
	_pComponent.enableevent = true;
	_pComponent.tooltiptype = "default";
	_pComponent.tooltiptext = undefined;
	_pComponent.fittocontents = "none";

	_pComponent.hotkey = null;
	_pComponent.rtl = undefined;
	_pComponent.positionstep = 0;

	_pComponent.scrollbartype = undefined;
	_pComponent.scrolltype = "both";
	_pComponent.scrollbarsize = undefined;
	_pComponent.scrollindicatorsize = undefined;
	_pComponent.scrollbarbarminsize = undefined;
	_pComponent.scrollbarbaroutsize = undefined;
	_pComponent.scrollbardecbuttonsize = undefined;
	_pComponent.scrollbarincbuttonsize = undefined;
	_pComponent.scrollbartrackbarsize = undefined;

	_pComponent.left = null;
	_pComponent.top = null;
	_pComponent.right = null;
	_pComponent.bottom = null;
	_pComponent.width = null;
	_pComponent.height = null;

	_pComponent.minwidth = null;
	_pComponent.maxwidth = null;
	_pComponent.minheight = null;
	_pComponent.maxheight = null;

	_pComponent.color = "";
	_pComponent.font = "";
	_pComponent.wordSpacing = "";
	_pComponent.letterSpacing = "";
	_pComponent.textDecoration = "";
	_pComponent.wordWrap = "";

	_pComponent.borderRadius = "";
	_pComponent.border = "";
	_pComponent.background = "";
	_pComponent.edge = "";

	_pComponent.cursor = "";
	_pComponent.opacity = "";
	_pComponent.boxShadow = "";

	_pComponent.margin = "";
	_pComponent.padding = "";
	_pComponent.textAlign = "";
	_pComponent.verticalAlign = "";

	_pComponent.accessibilityrole = "";
	_pComponent.accessibilityenable = true;
	_pComponent.accessibilitylabel = "";
	_pComponent.accessibilitydescription = "";
	_pComponent.accessibilityaction = "";
	_pComponent.accessibilitydesclevel = "all";
	_pComponent.itemaccessibilityenable = true;


	nexacro._is_enable_setting = false;

	_pComponent._left = null;
	_pComponent._top = null;
	_pComponent._right = null;
	_pComponent._bottom = null;
	_pComponent._width = null;
	_pComponent._height = null;

	_pComponent._minwidth = null;
	_pComponent._maxwidth = null;
	_pComponent._minheight = null;
	_pComponent._maxheight = null;

	_pComponent._adjust_left = -1;
	_pComponent._adjust_top = -1;
	_pComponent._adjust_width = -1;
	_pComponent._adjust_height = -1;

	_pComponent._bind_event = null;
	_pComponent._statusmap = null;
	_pComponent._userstatusmap = null;

	_pComponent._unique_id = "";
	_pComponent._displaytext = "";

	_pComponent._status = "";
	_pComponent._userstatus = "";
	_pComponent._oldstatus = "";
	_pComponent._olduserstatus = "";

	_pComponent._real_enable = null;
	_pComponent._real_visible = false;
	_pComponent._last_focused = null;
	_pComponent._hotkey = null;
	_pComponent._track_capture = true;
	_pComponent._focus_direction = -1;
	_pComponent._rtl = undefined;
	_pComponent._is_enable_changing = false;
	_pComponent._block_inner_focus = false;

	_pComponent._vscrollbartype = undefined;
	_pComponent._hscrollbartype = undefined;
	_pComponent._hscroll_pos = 0;
	_pComponent._vscroll_pos = 0;
	_pComponent._hscrollbar_id = "hscrollbar";
	_pComponent._vscrollbar_id = "vscrollbar";
	_pComponent._hscrollindicator_id = "hscrollindicator";
	_pComponent._vscrollindicator_id = "vscrollindicator";

	_pComponent._scroll_top = 0;
	_pComponent._scroll_left = 0;
	_pComponent._scroll_height = 0;
	_pComponent._scroll_default_value = 30;

	_pComponent._color = null;
	_pComponent._font = null;
	_pComponent._wordspacing = null;
	_pComponent._letterspacing = null;
	_pComponent._textdecoration = null;
	_pComponent._borderradius = null;
	_pComponent._border = null;
	_pComponent._background = null;
	_pComponent._edge = null;
	_pComponent._cursor = null;
	_pComponent._opacity = null;
	_pComponent._boxshadow = null;
	_pComponent._padding = null;

	_pComponent._is_view = false;

	_pComponent._default_scrollbarsize = 17;
	_pComponent._default_scrollindicatorsize = 6;
	if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
		_pComponent._default_scrollbartype = "autoindicator";
	}
	else {
		_pComponent._default_scrollbartype = "auto";
	}


	_pComponent._is_loading = false;
	_pComponent._is_create_commandstr = false;
	_pComponent._is_created = false;
	_pComponent._is_created_contents = false;
	_pComponent._is_initcssselector = false;
	_pComponent._is_alive = true;

	_pComponent._is_component = true;
	_pComponent._is_subcontrol = false;
	_pComponent._is_form = false;
	_pComponent._is_frame = false;
	_pComponent._is_window = false;
	_pComponent._is_nc_control = false;
	_pComponent._is_simple_control = false;
	_pComponent._is_scrollable = false;
	_pComponent._is_popup_control = false;
	_pComponent._is_focus_accept = true;
	_pComponent._is_eventinfo_control = true;
	_pComponent._is_locale_control = false;
	_pComponent._is_editable_control = false;
	_pComponent._is_track = false;

	_pComponent._is_container = false;
	_pComponent._is_containerset = false;
	_pComponent._is_listtype = false;

	_pComponent._use_pushed_status = false;
	_pComponent._use_selected_status = false;
	_pComponent._use_readonly_status = false;

	_pComponent._use_translate_move = false;
	_pComponent._use_container_move = true;
	_pComponent._use_container_multi = false;

	_pComponent._apply_client_padding = true;

	_pComponent._block_read_aria_stat = true;
	_pComponent._is_compound = false;

	_pComponent._computed_prop_list = ["cssclass", "color", "font", "wordSpacing", "letterSpacing", "textDecoration", "wordWrap", "borderRadius", "border", "background", "edge", "cursor", "opacity", "boxShadow", "padding", "textAlign", "verticalAlign", "icon", "iconPosition"
	];

	_pComponent._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"oninput" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
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
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};

	_pComponent.createComponent = function (bCreateOnly) {
		var parent_elem = null;
		if (!this._is_window) {
			parent_elem = this.parent ? this.parent._control_element : null;
			if (!parent_elem) {
				return false;
			}
		}

		var control_elem = this._control_element;
		if (!control_elem) {
			if (this._unique_id.length <= 0) {
				this._unique_id = this.parent._unique_id ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
			}

			control_elem = this.on_create_control_element(parent_elem);
			if (this._is_nc_control) {
				control_elem._is_nc_element = true;
			}

			this._initControl(control_elem);
			this._initContents(control_elem);

			this.on_apply_prop_taborder();

			if (!nexacro._isNull(this.tooltiptext)) {
				this.on_apply_prop_tooltip();
			}

			this.on_apply_accessibility();

			this.on_apply_positionstep();
			if (this._hittest_type) {
				this.on_apply_hittesttype();
			}

			if (!bCreateOnly && parent_elem && parent_elem.handle) {
				var window = this._getWindow();
				this.on_created(window);
			}
		}

		return true;
	};

	_pComponent.destroyComponent = function (callremovechild) {
		if (!this._is_alive) {
			return;
		}

		this._is_alive = false;
		if (!this._is_subcontrol) {
			this._unregisterHotkey();
		}

		if (nexacro._enableaccessibility) {
			var application = nexacro.getApplication();
			if (application && application._accessibilityHistoryList) {
				application._remove_accessibility_history(this);
			}
		}

		this._clearEventListeners();

		if (this.parent && this.parent.removeChild) {
			if (callremovechild != false) {
				this.parent.removeChild(this.id);
			}
		}
		else {
			var win = this._getWindow();
			if (win) {
				win._removeFromCurrentFocusPath(this);
			}

			if (this._unregisterPopupFrame) {
				if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
					this._unregisterPopupFrame(win._parentwindowforopen, this.id);
				}
				else {
					this._unregisterPopupFrame(win, this.id);
				}
			}
		}
		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}

		if (this.vscrollbar) {
			this.vscrollbar.destroy();
			this.vscrollbar = null;
		}
		if (this.hscrollbar) {
			this.hscrollbar.destroy();
			this.hscrollbar = null;
		}

		this.on_destroy_contents(callremovechild);

		this._is_created = false;
		this._arrange_info = null;

		if (this._refform) {
			this._refform = null;
		}
		if (this.parent) {
			this.parent = null;
		}
		if (this._refobj) {
			this._refobj = null;
		}

		if (this.hotkey) {
			this.hotkey = null;
		}

		if (this._event_list) {
			this._event_list = null;
		}
		if (this._last_focused) {
			this._last_focused = null;
		}
		if (this._cssselector) {
			this._cssselector = null;
		}

		this._clearStyleObject();
		if (this._cssclass) {
			this._cssclass = null;
		}

		if (this._statusmap) {
			this._statusmap = null;
		}

		if (this._userstatusmap) {
			this._userstatusmap = null;
		}

		return true;
	};

	_pComponent.on_created = function (win) {
		if (!this._is_loading) {
			var parent_elem = null;
			if (!this._is_window) {
				parent_elem = this.parent ? this.parent._control_element : null;
				if (!parent_elem) {
					return false;
				}
			}

			win = win || this._getWindow();
			var enable = this._isEnable();


			if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable)) {
				this._real_enable = enable;
				this._changeStatus("disabled", !enable);
				this.on_apply_prop_enable(enable);
			}
			else {
				this._real_enable = enable;
			}

			if (this._status || this._userstatus) {
				this._apply_status_toelement("", this._status, "", this._userstatus);
			}

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.create(win);
				if (!control_elem.handle) {
					return false;
				}
			}

			if (!this._is_subcontrol) {
				this._registerHotkey();
			}

			if (!this._is_created) {
				this.on_created_contents(win);
				this._is_created = true;

				return true;
			}
		}

		return false;
	};

	_pComponent.createCommand = function () {
		var str = "";
		if (!this._is_loading) {
			var enable = this._isEnable();

			if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable)) {
				this._real_enable = enable;
				this._changeStatus("disabled", !enable);
				this.on_apply_prop_enable(enable);
			}
			else {
				this._real_enable = enable;
				this._setAccessibilityStatFlag(this._status, this._userstatus);
			}

			if (this._status || this._userstatus) {
				this._apply_status_toelement("", this._status, "", this._userstatus);
			}

			var control_elem = this._control_element;
			if (control_elem) {
				str = control_elem.createCommandStart();
				if (str) {
					str += this.on_create_contents_command();
					str += control_elem.createCommandEnd();
				}
			}

			if (!this._is_subcontrol) {
				this._registerHotkey();
			}

			this._is_create_commandstr = true;
		}
		return str;
	};

	_pComponent.attachHandle = function (win, bContainer) {
		if (!this._is_created && this._is_create_commandstr) {
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.attachHandle(win);
			}
			if (!bContainer) {
				this.on_attach_contents_handle(win);

				this._is_created = true;
			}
		}
	};

	_pComponent.on_create_contents = function () {
	};

	_pComponent.on_created_contents = function (win) {
	};

	_pComponent.on_destroy_contents = function () {
	};

	_pComponent.on_create_contents_command = function () {
		return "";
	};

	_pComponent.on_attach_contents_handle = function (win) {
	};

	_pComponent.on_change_containerRect = function (width, height) {
		this._onResetScrollBar();
	};

	_pComponent.on_change_containerPos = function (left, top) {
	};

	_pComponent.on_create_normal_control_element = function (parent_elem) {
		var control_elem = new nexacro.ControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_scrollable_control_element = function (parent_elem) {
		var control_elem = new nexacro.ScrollableControlElement(parent_elem, this._use_container_multi);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_frame_control_element = function (parent_elem) {
		var control_elem = new nexacro.FrameControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_tablecell_control_element = function (parent_elem) {
		var control_elem = new nexacro.CellControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_popup_control_element = function (parent_elem) {
		var control_elem = new nexacro.ControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_popupscrollable_control_element = function (parent_elem) {
		var control_elem = new nexacro.ScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pComponent.on_create_control_element = function (parent_elem) {
		var control_elem = null;

		if (this._is_tablecell) {
			control_elem = this.on_create_tablecell_control_element(parent_elem);
		}
		else if (this._is_frame) {
			control_elem = this.on_create_frame_control_element(parent_elem);
		}
		else if (this._is_scrollable || this._is_expandable) {
			control_elem = this.on_create_scrollable_control_element(parent_elem);
		}
		else if (this._is_popup_control) {
			control_elem = this.on_create_popup_control_element(parent_elem);
		}
		else {
			control_elem = this.on_create_normal_control_element(parent_elem);
		}

		return control_elem;
	};

	_pComponent._initControl = function (control_elem) {
		control_elem.initElementInfo();
		this._applyElementVisible(this.visible);

		this.on_apply_prop_rtl();

		this._initCSSSelector();

		var enabledselector = this._cssselector.enabled;
		if (enabledselector) {
			var edge = enabledselector.edge;
			if (edge && this._rtl && enabledselector.rtlEdgeImage) {
				edge = enabledselector.rtlEdgeImage;
			}
			control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, edge);
		}



		this._calcArrangePosition();
		this._adjustPosition();

		control_elem.setElementPosition(this._adjust_left, this._adjust_top);
		control_elem.setElementSize(this._adjust_width, this._adjust_height);

		this._initNormalStyleProperty(control_elem);
	};

	_pComponent._initContents = function () {
		this.on_create_contents();

		this._is_created_contents = true;
		this._is_loading = false;
	};

	_pComponent._initCSSSelector = function () {
		if (!this._is_initcssselector) {
			var ret = this._setControlElementCssSelector();

			this._makeCSSMapInfo();

			this._is_initcssselector = ret;
		}
	};

	_pComponent._initNormalStyleProperty = function (control_elem) {
		if (this._color) {
			control_elem.setElementColor(this._color);
		}
		if (this._font) {
			control_elem.setElementFont(this._font);
		}
		if (this._wordspacing) {
			control_elem.setElementWordSpacing(this._wordspacing);
		}
		if (this._letterspacing) {
			control_elem.setElementLetterSpacing(this._letterspacing);
		}


		if (this._borderradius) {
			control_elem.setElementBorderRadius(this._borderradius);
		}
		if (this._border) {
			control_elem.setElementBorder(this._border);
		}

		if (this._background) {
			control_elem.setElementBackground(this._background);
		}

		if (this._padding) {
			control_elem.setElementPadding(this._padding);
		}

		if (this._cursor) {
			control_elem.setElementCursor(this._cursor);
		}
		if (this._opacity) {
			control_elem.setElementOpacity(this._opacity);
		}
		if (this._boxshadow) {
			control_elem.setElementBoxShadow(this._boxshadow);
		}

		if (this._edge) {
			control_elem.setElementEdge(this._edge);
		}

		if (!nexacro._isNull(this.tooltiptext)) {
			control_elem.setElementToolTip(this.tooltiptext);
		}
	};

	_pComponent._clearStyleObject = function () {
		if (this._color) {
			this._color = null;
		}
		if (this._font) {
			this._font = null;
		}
		if (this._wordspacing) {
			this._wordspacing = null;
		}
		if (this._letterspacing) {
			this._letterspacing = null;
		}
		if (this._textdecoration) {
			this._textdecoration = null;
		}
		if (this._borderradius) {
			this._borderradius = null;
		}
		if (this._border) {
			this._border = null;
		}
		if (this._background) {
			this._background = null;
		}
		if (this._edge) {
			this._edge = null;
		}
		if (this._cursor) {
			this._cursor = null;
		}
		if (this._opacity) {
			this._opacity = null;
		}
		if (this._boxshadow) {
			this._boxshadow = null;
		}
		if (this._padding) {
			this._padding = null;
		}
	};

	_pComponent.on_apply_cssselector = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());

			if (this._is_subcontrol) {
				var idselector = this.on_getIDCSSSelector();
				if (this.parent && !this.parent._is_subcontrol && (this.parent._is_containerset || this.parent._is_form || this.parent._is_frame)) {
					idselector = idselector + this.parent.on_get_css_assumedtypename();
					var parentidselector = idselector;
					var parentcssclass = this.parent._getClassCSSSelector();
					if (parentcssclass) {
						var len = parentcssclass.length;
						idselector = parentidselector + " ";
						for (var i = 0; i < len; i++) {
							idselector += parentidselector + parentcssclass[i];
						}
					}
				}

				control_elem.setElementIDCSSSelector(idselector);
			}
			else {
				control_elem.setElementIDCSSSelector(this._getIDCSSSelector());
			}

			var cssclass = this._getElementClassCSSSelector();
			if (cssclass) {
				control_elem.setElementClassCSSSelector(cssclass.join(" "));
			}
			else {
				control_elem.setElementClassCSSSelector("");
			}

			return true;
		}

		return false;
	};




	_pComponent._initComponent = function () {
		this._InitManagerObject();
		this._InitCollectionObject();
		this._initStatus();

		this._initProperties();
	};

	_pComponent._InitManagerObject = nexacro._emptyFn;
	_pComponent._InitCollectionObject = nexacro._emptyFn;
	_pComponent._initStatus = function () {
		this._makeStatusMap();
	};
	_pComponent._initProperties = nexacro._emptyFn;

	_pComponent._clearComponent = function () {
		this._clearEventListeners();
		this._clearFocus();
		this._clearManagerObject();
		this._clearCollectionObject();
		this._clearContents();

		var ret = this._beforeClearProperties();
		this._clearProperties();
		this._afterClearProperties(ret);
	};

	_pComponent._clearFocus = function () {
		var win = this._getWindow();
		if (win) {
			win._removeFromCurrentFocusPath(this);
		}
	};
	_pComponent._clearManagerObject = nexacro._emptyFn;
	_pComponent._clearCollectionObject = nexacro._emptyFn;
	_pComponent._clearContents = nexacro._emptyFn;
	_pComponent._clearProperties = nexacro._emptyFn;
	_pComponent._beforeClearProperties = nexacro._emptyFn;
	_pComponent._afterClearProperties = nexacro._emptyFn;

	_pComponent.set_initvalueid = function (initvalueid) {
		if (!this._is_created) {
			this.initvalueid = initvalueid;
			var fn = this._type_name + initvalueid;
			if (nexacro_init[fn]) {
				nexacro_init[fn].call(this, this);
			}
		}
	};

	_pComponent.set_hittesttype = function (hittesttype) {
		if (this._hittest_type != hittesttype) {
			this._hittest_type = hittesttype;
			this.on_apply_hittesttype();
		}
	};

	_pComponent.on_apply_hittesttype = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementHittestType(this._hittest_type);
		}
	};

	_pComponent.set_positionstep = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.positionstep != v) {
			this.positionstep = v;
			this.on_apply_positionstep();
		}
	};

	_pComponent.on_apply_positionstep = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementPositionStep(this.positionstep);
		}
	};

	_pComponent.set_cssclass = function (cssname) {
		if (this.cssclass != cssname) {
			this.cssclass = cssname;
			var cssclass = new nexacro.BindableValue();
			cssclass._set(cssname);
			this._cssclass = cssclass;
			if (cssclass._bindtype == 2) {
				this._cssclass_exprfn = this._makeExprFn(cssclass._value);
			}

			this.on_apply_cssclass();
		}
	};

	_pComponent.on_apply_cssclass = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var cssclassselector;
			var expr = this._cssclass_exprfn;
			if (expr) {
				try {
					cssclassselector = nexacro._toString(expr.call(null, this));
				}
				catch (e) {
					nexacro._settracemsg(e);
				}
				this._cssclass_exprfn = null;
				this._cssclass_expr = cssclassselector;
			}

			cssclassselector = this._getElementClassCSSSelector();
			if (cssclassselector) {
				control_elem.setElementClassCSSSelector(cssclassselector.join(" "));
			}
			else {
				control_elem.setElementClassCSSSelector("");
			}

			this._makeCSSMapInfo();

			if (this._is_scrollable) {
				this._onResetScrollBar();
			}
		}
		this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus, true);
		this.on_apply_prop_cssclass();

		this._setControlElementCssSelector();
	};

	_pComponent.set_name = function (v) {
		if (this.name != v) {
			this.name = v;
		}
	};

	_pComponent.set_text = function (v) {
		v = nexacro._toString(v);
		if (this.text != v) {
			this.text = v;
			this._on_apply_text(v);
		}
	};

	_pComponent._on_apply_text = function (text) {
		var exprfn = this._expr_fn;
		if (exprfn) {
			try {
				text = nexacro._toString(exprfn.call(null, this));
			}
			catch (e) {
				if (e && e.message) {
					trace(e.message);
				}
			}
		}
		this._displaytext = text;

		if (nexacro._enableaccessibility) {
			this.on_apply_prop_accessibilitylabel();
		}

		this.on_apply_text(text);
	};

	_pComponent.on_apply_text = function (text) {
	};

	_pComponent.set_expr = function (v) {
		v = nexacro._toString(v);
		if (this.expr != v) {
			this.expr = v;
			this._on_apply_expr(v);
		}
	};

	_pComponent._on_apply_expr = function (expr) {
		if (expr) {
			this._expr_fn = null;
			this._expr_fn = this._makeExprFn(expr);
			this._on_apply_text(this.text);
		}
		else {
			this._expr_fn = null;
			this._on_apply_text(this.text);
		}
	};

	_pComponent.on_apply_expr = function () {
	};

	_pComponent._applyElementVisible = function (v) {
		this._control_element.setElementVisible(v);
	};

	_pComponent.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		v = nexacro._toBoolean(v);
		if (this.visible != v) {
			var _window = this._getWindow();
			var newfocus_comp;
			if (!v && this._is_created && this.parent) {
				if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
					var cur_tabstop = this.tabstop;
					this.tabstop = false;
					newfocus_comp = this._getForm()._searchNextTabFocus();
					this.tabstop = cur_tabstop;
				}
			}

			this.visible = v;

			var control_elem = this._control_element;
			if (control_elem) {
				this._applyElementVisible(v);

				if (nexacro._enableaccessibility) {
					this._setAccessibilityStatHidden(!v);
				}

				var parent = this.parent;
				if (this.visible) {
					if (!this._is_subcontrol && this._is_created && parent && parent._is_created && !parent._getLastFocused()) {
						if (_window && _window._focus_list && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1) {
							this._on_focus(true);
						}
					}
					this._apply_status("", this._status, "", this._userstatus, true);
				}
				else {
					if (!this._is_subcontrol && parent) {
						if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
							_window._removeFromCurrentFocusPath(this, false);
							if (newfocus_comp && newfocus_comp[0]) {
								newfocus_comp[0]._on_focus(true);
							}
						}
					}

					if (this._status === "mouseover") {
						this._changeStatus("mouseover", false);
					}
				}
			}
		}
	};

	_pComponent.set_enable = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enable != v) {
			var _window = this._getWindow();
			var newfocus_comp;
			if (!this._is_subcontrol && !v && this._is_created && this.parent) {
				if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
					var cur_tabstop = this.tabstop;
					this.tabstop = false;
					newfocus_comp = this._getForm()._searchNextTabFocus();
					this.tabstop = cur_tabstop;
				}
			}

			this.enable = v;
			if (this._is_created) {
				var enable_flag = (this._getParentEnable() && v);
				if (this._real_enable != enable_flag) {
					nexacro._is_enable_setting = true;
					this._setEnable(enable_flag);
					nexacro._is_enable_setting = false;
					var parent = this.parent;
					if (!this._is_subcontrol && this._is_created && parent && parent._is_created) {
						if (enable_flag) {
							if (_window && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1
								 && !parent._last_focused) {
								this._on_focus(true);
							}
						}
						else {
							if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
								if (newfocus_comp && newfocus_comp[0]) {
									newfocus_comp[0]._on_focus(true);
								}
								else {
									_window._removeFromCurrentFocusPath(this, false);
								}
							}
						}
					}
				}
			}
		}
	};

	_pComponent.set_taborder = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		if (this.taborder != v) {
			this.taborder = v;
			this.on_apply_prop_taborder();
		}
	};

	_pComponent.set_tabstop = function (v) {
		v = nexacro._toBoolean(v);
		if (this.tabstop != v) {
			this.tabstop = v;
			this.on_apply_prop_taborder();
		}
	};

	_pComponent.set_tooltiptext = function (v) {
		if (nexacro._isNull(v)) {
			this.tooltiptext = v;
			this.on_apply_prop_tooltip();
		}
		else {
			v = nexacro._toString(v);
			if (this.tooltiptext != v) {
				this.tooltiptext = v;
				this.on_apply_prop_tooltip();
			}
		}
	};

	_pComponent.set_tooltiptype = function (v) {
		var tooltiptype_enum = ["default", "hover", "inplace", "default,mouseleave", "hover,mouseleave", "inplace,mouseleave"];
		if (tooltiptype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.tooltiptype != v) {
			this.tooltiptype = v;
			this.on_apply_prop_tooltip();
		}
	};

	_pComponent.set_enableevent = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableevent != v) {
			this.enableevent = v;
		}
	};

	_pComponent.set_enableredraw = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableredraw != v) {
			this.enableredraw = v;
			this.on_apply_enableredraw();
		}
	};

	_pComponent.on_apply_enableredraw = function () {
		this.on_apply_color(this._color);
		this.on_apply_font(this._font);
		this.on_apply_wordSpacing(this._wordspacing);
		this.on_apply_letterSpacing(this._letterSpacing);
		this.on_apply_borderRadius(this._borderradius);
		this.on_apply_border(this._border);
		this.on_apply_background(this._background);
		this.on_apply_edge(this._edge);
		this.on_apply_margin();
		this.on_apply_opacity(this._opacity);
		this.on_apply_boxShadow(this._boxshadow);
	};

	_pComponent.set_hotkey = function (v) {
		var cur_hotkey = this._hotkey;
		if (cur_hotkey) {
			this._unregisterHotkey();
		}

		var hotkey = new nexacro._HotKey(v);
		if (hotkey._isEmpty()) {
			this.hotkey = null;
			this._hotkey = null;
		}
		else {
			this.hotkey = hotkey._toString();
			this._hotkey = hotkey;

			if (this._is_created) {
				this._registerHotkey();
			}
		}
	};

	_pComponent.set_rtl = function (v) {
		if (this.rtl != v) {
			this.rtl = v;
			this._rtl = nexacro._isBoolean(v) ? nexacro._toBoolean(v) : undefined;
			this.on_apply_prop_rtl();
		}
	};

	_pComponent.set_transparenthittest = nexacro._emptyFn;

	_pComponent.set_locale = nexacro._emptyFn;

	_pComponent.on_apply_locale = nexacro._emptyFn;

	_pComponent.set_left = function (v) {
		this._setLeft(v);
		this._update_position();
	};

	_pComponent.set_top = function (v) {
		this._setTop(v);
		this._update_position();
	};

	_pComponent.set_right = function (v) {
		this._setRight(v);
		this._update_position();
	};

	_pComponent.set_bottom = function (v) {
		this._setBottom(v);
		this._update_position();
	};

	_pComponent.set_width = function (v) {
		this._setWidth(v);
		this._update_position();
	};

	_pComponent.set_height = function (v) {
		this._setHeight(v);
		this._update_position();
	};

	_pComponent.set_minwidth = function (v) {
		this._setMinwidth(v);
		this._update_position();
	};

	_pComponent.set_maxwidth = function (v) {
		this._setMaxwidth(v);
		this._update_position();
	};

	_pComponent.set_minheight = function (v) {
		this._setMinheight(v);
		this._update_position();
	};

	_pComponent.set_maxheight = function (v) {
		this._setMaxheight(v);
		this._update_position();
	};

	_pComponent.set_fittocontents = function (v) {
		var fittocontents_enum = ["none", "width", "height", "both"];
		if (fittocontents_enum.indexOf(v) == -1) {
			return;
		}

		if (this.fittocontents != v) {
			this.fittocontents = v;

			if (this._is_created) {
				if (this.fittocontents == "height") {
					var fittemp = this.fittocontents;
					this.fittocontents = "none";
					this._calcArrangePosition();
					this._adjustPosition();
					this.fittocontents = fittemp;
				}
				this._update_position();
			}
		}
	};

	_pComponent.set_scrollbartype = function (v) {
		v = nexacro._toString(v).trim();

		var new_vscrollbartype;
		var new_hscrollbartype;
		var arr = v.toLowerCase().split(" ");

		this.scrollbartype = v;

		for (var i = 0; i < arr.length; i++) {
			switch (arr[i]) {
				case "none":
				case "auto":
				case "fixed":
				case "autoindicator":
				case "indicator":
				case "default":
					if (i == 0) {
						new_hscrollbartype = arr[i];
					}
					else if (i == 1) {
						new_vscrollbartype = arr[i];
					}
					break;
				default:
					break;
			}
		}

		if (!new_hscrollbartype && !new_vscrollbartype) {
			this._hscrollbartype = undefined;
			this._vscrollbartype = undefined;
		}
		else {
			if (!new_hscrollbartype || new_hscrollbartype == "default") {
				this._hscrollbartype = new_hscrollbartype = undefined;
			}
			else {
				this._hscrollbartype = new_hscrollbartype;
			}

			if (!new_vscrollbartype) {
				this._vscrollbartype = new_hscrollbartype;
			}
			else if (new_vscrollbartype == "default") {
				this._vscrollbartype = undefined;
			}
			else {
				this._vscrollbartype = new_vscrollbartype;
			}
		}

		this.on_apply_scrollbartype();

		return v;
	};

	_pComponent.on_apply_scrollbartype = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var hscrollbarsize = this._getHScrollBarSize();
			var vscrollbarsize = this._getVScrollBarSize();

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
			this._onResetScrollBar();
		}
	};

	_pComponent.set_scrolltype = function (v) {
		v = nexacro._toString(v);

		if (!nexacro._isNull(v)) {
			v = v.toLowerCase();
		}

		switch (v) {
			case "none":
			case "both":
			case "horizontal":
			case "vertical":
				this.scrolltype = v;

				this.on_apply_scrolltype();
				break;
			default:
				break;
		}

		return v;
	};

	_pComponent.on_apply_scrolltype = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var hscrollbarsize = this._getHScrollBarSize();
			var vscrollbarsize = this._getVScrollBarSize();

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
			this._onResetScrollBar();
		}
	};

	_pComponent.set_scrollbarbarminsize = function (scrollbarbarminsize) {
		if (!this._is_scrollable) {
			return;
		}

		if (scrollbarbarminsize !== undefined) {
			scrollbarbarminsize = parseInt(scrollbarbarminsize);
			if (isNaN(scrollbarbarminsize)) {
				return;
			}
		}

		if (this.scrollbarbarminsize != scrollbarbarminsize) {
			this.scrollbarbarminsize = scrollbarbarminsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar) {
				scrollbar.set_barminsize(scrollbarbarminsize);
			}

			scrollbar = this.hscrollbar;
			if (scrollbar) {
				scrollbar.set_barminsize(scrollbarbarminsize);
			}
		}
	};

	_pComponent.set_scrollbardecbuttonsize = function (scrollbardecbuttonsize) {
		if (!this._is_scrollable) {
			return;
		}

		if (scrollbardecbuttonsize !== undefined) {
			scrollbardecbuttonsize = parseInt(scrollbardecbuttonsize);
			if (isNaN(scrollbardecbuttonsize)) {
				return;
			}
		}

		if (this.scrollbardecbuttonsize != scrollbardecbuttonsize) {
			this.scrollbardecbuttonsize = scrollbardecbuttonsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar) {
				scrollbar.set_decbuttonsize(scrollbardecbuttonsize);
			}

			scrollbar = this.hscrollbar;
			if (scrollbar) {
				scrollbar.set_decbuttonsize(scrollbardecbuttonsize);
			}
		}
	};

	_pComponent.set_scrollbarbaroutsize = function (scrollbarbaroutsize) {
		if (!this._is_scrollable) {
			return;
		}

		if (scrollbarbaroutsize !== undefined) {
			scrollbarbaroutsize = parseInt(scrollbarbaroutsize);
			if (isNaN(scrollbarbaroutsize)) {
				return;
			}
		}

		if (this.scrollbarbaroutsize != scrollbarbaroutsize) {
			this.scrollbarbaroutsize = scrollbarbaroutsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar) {
				scrollbar.set_baroutsize(scrollbarbaroutsize);
			}

			scrollbar = this.hscrollbar;
			if (scrollbar) {
				scrollbar.set_baroutsize(scrollbarbaroutsize);
			}
		}
	};

	_pComponent.set_scrollbarincbuttonsize = function (scrollbarincbuttonsize) {
		if (!this._is_scrollable) {
			return;
		}
		if (scrollbarincbuttonsize !== undefined) {
			if (isNaN(scrollbarincbuttonsize)) {
				return;
			}
		}

		if (this.scrollbarincbuttonsize != scrollbarincbuttonsize) {
			this.scrollbarincbuttonsize = scrollbarincbuttonsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar) {
				scrollbar.set_incbuttonsize(scrollbarincbuttonsize);
			}
			scrollbar = this.hscrollbar;
			if (scrollbar) {
				scrollbar.set_incbuttonsize(scrollbarincbuttonsize);
			}
		}
	};

	_pComponent.set_scrollbarsize = function (scrollbarsize) {
		if (!this._is_scrollable) {
			return;
		}

		if (scrollbarsize !== undefined) {
			scrollbarsize = parseInt(scrollbarsize);
			if (isNaN(scrollbarsize)) {
				return;
			}
		}

		if (this.scrollbarsize != scrollbarsize) {
			this.scrollbarsize = scrollbarsize;
			this.on_apply_scrollbarsize();
		}
	};

	_pComponent.on_apply_scrollbarsize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var hscrollbarsize = this._getHScrollBarSize();
			var vscrollbarsize = this._getVScrollBarSize();

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
		}

		this._onResetScrollBar();
	};

	_pComponent.set_scrollindicatorsize = function (scrollindicatorsize) {
		if (!this._is_scrollable) {
			return;
		}
		if (scrollindicatorsize !== undefined) {
			scrollindicatorsize = parseInt(scrollindicatorsize);
			if (isNaN(scrollindicatorsize)) {
				return;
			}
		}

		if (this.scrollindicatorsize != scrollindicatorsize) {
			this.scrollindicatorsize = scrollindicatorsize;
			this.on_apply_scrollbarsize();
		}
	};

	_pComponent.set_scrollbartrackbarsize = function (scrollbartrackbarsize) {
		if (!this._is_scrollable) {
			return;
		}

		if (scrollbartrackbarsize !== undefined) {
			scrollbartrackbarsize = parseInt(scrollbartrackbarsize);
			if (isNaN(scrollbartrackbarsize)) {
				return;
			}
		}

		if (this.scrollbartrackbarsize != scrollbartrackbarsize) {
			this.scrollbartrackbarsize = scrollbartrackbarsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar) {
				scrollbar.set_trackbarsize(scrollbartrackbarsize);
			}
			scrollbar = this.hscrollbar;
			if (scrollbar) {
				scrollbar.set_trackbarsize(scrollbartrackbarsize);
			}
		}
	};

	_pComponent.set_accessibilityrole = function (accessibilityrole) {
		if (this.accessibilityrole != accessibilityrole) {
			this.accessibilityrole = accessibilityrole;
			this.on_apply_prop_accessibilityrole();
		}
	};

	_pComponent.on_apply_prop_accessibilityrole = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityRole(this._getAccessibilityRole());
		}
	};

	_pComponent.set_accessibilityenable = function (accessibilityenable) {
		var accenable = nexacro._toBoolean(accessibilityenable);
		if (this.accessibilityenable != accenable) {
			this.accessibilityenable = accenable;
			this.on_apply_prop_accessibilityenable();
		}
	};

	_pComponent.on_apply_prop_accessibilityenable = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityEnable(this.accessibilityenable);
		}
	};

	_pComponent.set_accessibilitylabel = function (accessibilitylabel) {
		if (this.accessibilitylabel != accessibilitylabel) {
			this.accessibilitylabel = accessibilitylabel;
			this.on_apply_prop_accessibilitylabel();
		}
	};

	_pComponent.on_apply_prop_accessibilitylabel = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityLabel(this._getAccessibilityLabel());
		}
	};

	_pComponent.set_accessibilitydescription = function (accessibilitydescription) {
		if (this.accessibilitydescription != accessibilitydescription) {
			this.accessibilitydescription = accessibilitydescription;
			this.on_apply_prop_accessibilitydescription();
		}
	};

	_pComponent.on_apply_prop_accessibilitydescription = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityDescription(this._getAccessibilityDescription());
		}
	};

	_pComponent.set_accessibilityaction = function (accessibilityaction) {
		if (this.accessibilityaction != accessibilityaction) {
			this.accessibilityaction = accessibilityaction;
			this.on_apply_prop_accessibilityaction();
		}
	};

	_pComponent.on_apply_prop_accessibilityaction = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityAction(this._getAccessibilityAction());
		}
	};

	_pComponent.set_accessibilitydesclevel = function (accessibilitydesclevel) {
		if (this.accessibilitydesclevel != accessibilitydesclevel) {
			this.accessibilitydesclevel = accessibilitydesclevel;
			this.on_apply_prop_accessibilitydesclevel();
		}
	};

	_pComponent.on_apply_prop_accessibilitydesclevel = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._setAccessibilityDescLevel(this._getAccessibilityDescLevel());
		}
	};

	_pComponent.on_apply_accessibility = function () {
		this.on_apply_prop_accessibilityrole();
		this.on_apply_prop_accessibilityenable();
		this.on_apply_prop_accessibilitylabel();
		this.on_apply_prop_accessibilitydescription();
		this.on_apply_prop_accessibilityaction();
		this.on_apply_prop_accessibilitydesclevel();
	};

	_pComponent.set_itemaccessibilityenable = function (accessibilityenable) {
		var accenable = nexacro._toBoolean(accessibilityenable);
		if (this.itemaccessibilityenable != accenable) {
			this.itemaccessibilityenable = accenable;
			this.on_apply_prop_itemaccessibilityenable();
		}
	};

	_pComponent.set_color = function (val) {
		this.color = val;

		if (val) {
			if (this._color == null || this._color.value != val) {
				var color = nexacro.ColorObject(val);
				this._color = color;
				this.on_apply_color(color);
			}
		}
		else {
			if (this._color) {
				this._color = null;
				this.on_apply_color(null);
			}
		}
	};

	_pComponent.on_apply_color = function (color) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementColor(color);
		}
	};

	_pComponent.set_font = function (val) {
		this.font = val;
		if (val) {
			if (this._font == null || this._font.value != val) {
				var font = nexacro.FontObject(val);
				this._font = font;
				this.on_apply_font(font);
			}
		}
		else {
			if (this._font) {
				this._font = null;
				this.on_apply_font(null);
			}
		}
	};

	_pComponent.on_apply_font = function (font) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementFont(font);
		}
	};

	_pComponent.set_textDecoration = function (val) {
		this.textDecoration = val;
		if (val) {
			if (this._textdecoration == null || this._textdecoration.value != val) {
				var textDecoration = nexacro.TextDecorationObject(val);
				this._textdecoration = textDecoration;
				this.on_apply_textDecoration(textDecoration);
			}
		}
		else {
			if (this._textdecoration) {
				this._textdecoration = null;
				this.on_apply_textDecoration(null);
			}
		}
	};

	_pComponent.on_apply_textDecoration = function (textDecoration) {
	};

	_pComponent.set_wordSpacing = function (val) {
		val = nexacro._toString(val);
		this.wordSpacing = val;
		if (val) {
			if (this._wordspacing == null || this._wordspacing.value != val) {
				var wordSpacing = nexacro.CSSValueObject(val);
				this._wordspacing = wordSpacing;
				this.on_apply_wordSpacing(wordSpacing);
			}
		}
		else {
			if (this._wordspacing) {
				this._wordspacing = null;
				this.on_apply_wordSpacing(null);
			}
		}
	};

	_pComponent.on_apply_wordSpacing = function (wordSpacing) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementWordSpacing(wordSpacing);
		}
	};

	_pComponent.set_letterSpacing = function (val) {
		val = nexacro._toString(val);
		this.letterSpacing = val;
		if (val) {
			if (this._letterspacing == null || this._letterspacing.value != val) {
				var letterSpacing = nexacro.CSSValueObject(val);
				this._letterspacing = letterSpacing;
				this.on_apply_letterSpacing(letterSpacing);
			}
		}
		else {
			if (this._letterspacing) {
				this._letterspacing = null;
				this.on_apply_letterSpacing(null);
			}
		}
	};

	_pComponent.on_apply_letterSpacing = function (letterSpacing) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementLetterSpacing(letterSpacing);
		}
	};

	_pComponent.set_wordWrap = function (val) {
		if (val) {
			if (this.wordWrap == null || this.wordWrap != val) {
				var wordWrap = val;
				this.wordWrap = wordWrap;
				this.on_apply_wordWrap(wordWrap);
			}
		}
		else {
			if (this.wordWrap) {
				this.wordWrap = null;
				this.on_apply_wordWrap(null);
			}
		}
	};

	_pComponent.on_apply_wordWrap = function (wordWrap) {
	};

	_pComponent.set_borderRadius = function (val) {
		this.borderRadius = val;
		if (val) {
			if (this._borderradius == null || this._borderradius.value != val) {
				var borderRadius = nexacro.BorderRadiusObject(val);
				this._borderradius = borderRadius;
				this.on_apply_borderRadius(borderRadius);
			}
		}
		else {
			if (this._borderradius) {
				this._borderradius = null;
				this.on_apply_borderRadius(null);
			}
		}
	};

	_pComponent.on_apply_borderRadius = function (borderRadius) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBorderRadius(borderRadius);
		}
	};

	_pComponent.set_border = function (val) {
		this.border = val;
		if (val) {
			if (this._border == null || !this._border._single || this._border.value != val) {
				var border = nexacro.BorderObject(val);
				this._border = border;
				this.on_apply_border(border);
			}
		}
		else {
			if (this._border) {
				this._border = null;
				this.on_apply_border(null);
			}
		}
	};

	_pComponent.on_apply_border = function (border) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBorder(border);
		}
	};

	_pComponent.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var backgroud = nexacro.BackgroundObject(val, this);
				this._background = backgroud;
				this.on_apply_background(backgroud);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}
	};

	_pComponent.on_apply_background = function (background) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBackground(background);
		}
	};

	_pComponent.set_edge = function (val) {
		this.edge = val;
		if (val) {
			if (this._edge == null || this._edge.value != val) {
				var edge = nexacro.EdgeImageObject(val, this);
				this._edge = edge;
				this.on_apply_edge(edge);
			}
		}
		else {
			if (this._edge) {
				this._edge = null;
				this.on_apply_edge(null);
			}
		}
	};

	_pComponent.on_apply_edge = function (edge) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementEdge(edge);
		}
	};

	_pComponent.set_margin = function (val) {
		if (val) {
			if (this.margin == null || this.margin.value != val) {
				var margin = nexacro._getCachedMarginObject(val);
				this.margin = margin;
				this.on_apply_margin(margin);
			}
		}
		else {
			if (this.margin) {
				this.margin = null;
				this.on_apply_margin(null);
			}
		}
	};

	_pComponent.on_apply_margin = function () {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			this._adjustPosition();

			control_elem.setElementVisible(this.visible);
			control_elem.setElementPosition(this._adjust_left, this._adjust_top);
			control_elem.setElementSize(this._adjust_width, this._adjust_height);
		}
	};

	_pComponent.set_padding = function (val) {
		this.padding = val;
		if (val) {
			if (this._padding == null || this._padding.value != val) {
				var padding = nexacro.PaddingObject(val);
				this._padding = this.padding = padding;
				this._on_apply_padding(padding);
			}
		}
		else {
			if (this._padding) {
				this._padding = null;
				this._on_apply_padding(null);
			}
		}
	};

	_pComponent._on_apply_padding = function (padding) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPadding(padding);
			this.on_apply_padding(padding);
		}
	};

	_pComponent.on_apply_padding = function (padding) {
	};

	_pComponent.set_textAlign = function (val) {
		if (val) {
			if (this.textAlign == null || this.textAlign != val) {
				this.textAlign = val;
				this.on_apply_textAlign(val);
			}
		}
		else {
			if (this.textAlign) {
				this.textAlign = null;
				this.on_apply_textAlign(null);
			}
		}
	};

	_pComponent.on_apply_textAlign = function (halign) {
	};

	_pComponent.set_verticalAlign = function (val) {
		if (val) {
			if (this.verticalAlign == null || this.verticalAlign != val) {
				this.verticalAlign = val;
				this.on_apply_verticalAlign(val);
			}
		}
		else {
			if (this.verticalAlign) {
				this.verticalAlign = null;
				this.on_apply_verticalAlign(null);
			}
		}
	};

	_pComponent.on_apply_verticalAlign = function (valign) {
	};

	_pComponent.set_cursor = function (val) {
		this.cursor = val;
		if (val) {
			if (this._cursor == null || this._cursor.value != val) {
				var cursor = nexacro.CursorObject(val);
				this._cursor = cursor;
				this.on_apply_cursor(cursor);
			}
		}
		else {
			if (this._cursor) {
				this._cursor = null;
				this.on_apply_cursor(null);
			}
		}
	};

	_pComponent.on_apply_cursor = function (cursor) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementCursor(cursor);
		}
	};

	_pComponent._updateCursor = function (cursor) {
		if (nexacro._cur_track_info || nexacro._cur_extra_track_info) {
			return;
		}

		var cursorobj = this._cursor;
		if (cursor) {
			cursorobj = nexacro.CursorObject(cursor);
		}

		this.on_apply_cursor(cursorobj);
	};

	_pComponent.set_opacity = function (val) {
		this.opacity = val;
		if (0 === val || val) {
			if (this._opacity == null || this._opacity.value != val) {
				var opacity = nexacro.OpacityObject(val);
				this._opacity = opacity;
				this.on_apply_opacity(opacity);
			}
		}
		else {
			if (this._opacity) {
				this._opacity = null;
				this.on_apply_opacity(null);
			}
		}
	};

	_pComponent.on_apply_opacity = function (opacity) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementOpacity(opacity);
		}
	};

	_pComponent.set_boxShadow = function (val) {
		this.boxShadow = val;
		if (val) {
			if (this._boxshadow == null || this._boxshadow.value != val) {
				var shadow = nexacro.ShadowObject(val);
				this._boxshadow = shadow;
				this.on_apply_boxShadow(shadow);
			}
		}
		else {
			if (this._boxshadow) {
				this._boxshadow = null;
				this.on_apply_boxShadow(null);
			}
		}
	};

	_pComponent.on_apply_boxShadow = function (shadow) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBoxShadow(shadow);
		}
	};

	_pComponent.bringToFront = function () {
		if (this.parent) {
			var parent = this.parent;
			var parent_child_list = parent._child_list;

			var len = parent_child_list.length;
			var last_Idx = len - 1;

			var cur_Index = nexacro._indexOf(parent_child_list, this);

			if (cur_Index >= 0 && cur_Index < last_Idx) {
				parent_child_list.splice(cur_Index, 1);
				parent_child_list.splice(last_Idx, 0, this);

				var parent_elem = parent.getElement();
				var cur_elem = this._control_element;



				parent_elem.bringToFrontElement(cur_elem);
				this._applyScrollPos();
			}
		}
	};

	_pComponent.bringToPrev = function () {
		if (this.parent) {
			var parent = this.parent;
			var parent_child_list = parent._child_list;

			var len = parent_child_list.length;
			var last_Idx = len - 1;

			var cur_Index = nexacro._indexOf(parent_child_list, this);

			if (cur_Index >= 0 && cur_Index < last_Idx) {
				this.moveToPrev(parent_child_list[cur_Index + 1]);
			}
		}
	};

	_pComponent.moveToNext = function (objOrId) {
		if (this.parent) {
			var parent = this.parent;
			var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

			if (target == null) {
				return;
			}

			var child_list = parent._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			var target_idx = nexacro._indexOf(child_list, target);

			if (cur_idx < 0 || target_idx < 0) {
				return;
			}

			if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx - 1) {
				child_list.splice(cur_idx, 1);
				var idx = nexacro._indexOf(child_list, target);

				child_list.splice(idx, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.moveToNextElement(this._control_element, target.getElement());
				this._applyScrollPos();
			}
		}
	};

	_pComponent.moveToPrev = function (objOrId) {
		if (this.parent) {
			var parent = this.parent;
			var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

			if (target == null) {
				return;
			}

			var child_list = parent._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			var target_idx = nexacro._indexOf(child_list, target);

			if (cur_idx < 0 || target_idx < 0) {
				return;
			}

			if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx + 1) {
				child_list.splice(cur_idx, 1);

				var index = nexacro._indexOf(child_list, target);
				child_list.splice(index + 1, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.moveToPrevElement(this._control_element, target.getElement());
				this._applyScrollPos();
			}
		}
	};

	_pComponent.sendToBack = function () {
		if (this.parent) {
			var parent = this.parent;
			var child_list = parent._child_list;

			var cur_idx = nexacro._indexOf(child_list, this);
			if (cur_idx > 0) {
				child_list.splice(cur_idx, 1);
				child_list.splice(0, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.sendToBackElement(this._control_element);
				this._applyScrollPos();
			}
		}
	};

	_pComponent.sendToNext = function () {
		if (this.parent) {
			var p = this.parent;
			var child_list = p._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			if (cur_idx > 0) {
				this.moveToNext(child_list[cur_idx - 1]);
			}
		}
	};

	_pComponent.beginTransitionEffect = function (obj) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.beginTransitionEffect(obj);
		}
	};

	_pComponent.applyTransitionEffect = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.applyTransitionEffect();
		}
	};

	_pComponent.cancelTransitionEffect = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.cancelTransitionEffect();
		}
	};

	_pComponent.create = function () {
		this.initProperties();
		this.initEvents();
	};

	_pComponent.destroy = function (callremovechild) {
		if (!this._is_alive) {
			return;
		}

		return this.destroyComponent(callremovechild);
	};

	_pComponent.init = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight) {
		if (id) {
			this.id = this.name = id;
		}

		if (left != undefined && width != undefined && right != undefined) {
			right = null;
		}
		if (top != undefined && height != undefined && bottom != undefined) {
			bottom = null;
		}

		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;

		var horz = 0;
		var vert = 0;

		if (left != null) {
			horz++;
		}
		if (width != null) {
			horz++;
		}
		if (right != null) {
			horz++;
		}
		if (top != null) {
			vert++;
		}
		if (height != null) {
			vert++;
		}
		if (bottom != null) {
			vert++;
		}

		if (horz >= 2 && vert >= 2) {
			this.left = left;
			this.top = top;
			this.width = width;
			this.height = height;
			this.right = right;
			this.bottom = bottom;

			this._setMaxwidth(maxwidth);
			this._setMinwidth(minwidth);
			this._setMaxheight(maxheight);
			this._setMinheight(minheight);

			this._parseArrangeInfo(left, top, right, bottom, width, height);
			this._calcArrangePosition();

			if (arguments.length >= 5) {
				this._adjustPosition();

				if (this._adjust_width != old_width || this._adjust_height != old_height) {
					bsize = true;
				}
				if (this._adjust_left != old_left || this._adjust_top != old_top) {
					bmove = true;
				}

				this.on_update_position(bsize, bmove);
			}
		}
	};

	_pComponent.move = function (left, top, width, height, right, bottom) {
		switch (arguments.length) {
			case 1:
				return;
			case 2:
				width = this.width;
			case 3:
				height = this.height;
			case 4:
				right = this.right;
			case 5:
				bottom = this.bottom;
			default:
				if (width == undefined && right == undefined) {
					(this.width != undefined) ? width = this.width : right = this.right;
				}
				if (height == undefined && bottom == undefined) {
					(this.height != undefined) ? height = this.height : bottom = this.bottom;
				}
				break;
		}

		var horz = 0;
		var vert = 0;

		if (left != null) {
			horz++;
		}
		if (width != null) {
			horz++;
		}
		if (right != null) {
			horz++;
		}
		if (top != null) {
			vert++;
		}
		if (height != null) {
			vert++;
		}
		if (bottom != null) {
			vert++;
		}

		if (horz < 2 || vert < 2) {
			return;
		}

		if (left != undefined && width != undefined && right != undefined) {
			right = null;
		}
		if (top != undefined && height != undefined && bottom != undefined) {
			bottom = null;
		}

		var update = false;

		if (this.left != left) {
			update = true;
			this.left = left;
		}
		if (this.top != top) {
			update = true;
			this.top = top;
		}
		if (this.width != width) {
			update = true;
			this.width = width;
		}
		if (this.height != height) {
			update = true;
			this.height = height;
		}
		if (this.right != right) {
			update = true;
			this.right = right;
		}
		if (this.bottom != bottom) {
			update = true;
			this.bottom = bottom;
		}

		if (update) {
			this._parseArrangeInfo(this.left, this.top, this.right, this.bottom, this.width, this.height);
		}

		this._update_position(this._isRtl());
	};

	_pComponent.resize = function (w, h) {
		if (w < 0 || h < 0) {
			return;
		}

		if (w == this._adjust_width && h == this._adjust_height) {
			return;
		}

		if (this.width != w || this.height != h) {
			this._parseArrangeInfoProp("width", w);
			this._parseArrangeInfoProp("height", h);
			this.width = w;
			this.height = h;

			if (this.left != null && this.right != null) {
				this._setRight(null);
			}
			if (this.top != null && this.bottom != null) {
				this._setBottom(null);
			}
		}

		this._update_position();
	};

	_pComponent.show = function () {
		var parent = this.parent;
		if (parent) {
			var control_element = this._control_element;
			if (!control_element) {
				if (this.createComponent(true)) {
					this.on_created(this._getWindow());
				}
			}
			else {
			}
		}
	};

	_pComponent.redraw = function () {
	};

	_pComponent.setFocus = function (bResetScroll, bInnerFocus) {
		var win = this._getRootWindow();
		if (!this.getElement()) {
			return;
		}
		var is_active_layer = win._isActiveLayerComponent(this);
		if (!is_active_layer) {
			return;
		}

		var focus_direction = this._focus_direction;

		if (nexacro._enableaccessibility) {
			if (!this._isEnable()) {
				if (focus_direction != 2 && focus_direction != 3) {
					return;
				}
			}
			if (!this._isVisible() || !this._isFocusAcceptable()) {
				return;
			}
		}
		else {
			if (!this._isVisible() || !this._isEnable() || !this._isFocusAcceptable()) {
				return;
			}
		}

		if (bResetScroll === undefined) {
			bResetScroll = true;
		}


		if (bInnerFocus === undefined) {
			bInnerFocus = true;
		}

		var bContainerFocus = !bInnerFocus;

		var block_inner, from_child = false;
		if (bContainerFocus) {
			if (this._hasContainer()) {
				if (this._block_inner_focus) {
					block_inner = true;
				}
				this._block_inner_focus = true;

				if (this._last_focused) {
					if (win._indexOfCurrentFocusPaths(this._last_focused) >= 0) {
						from_child = true;
						win._removeFromCurrentFocusPath(this._last_focused);
					}
					else {
						this._last_focused = null;
					}
				}
			}
		}

		if (bResetScroll) {
			if (this.parent && this.parent._is_form && bInnerFocus == true && !this._block_inner_focus) {
				if (this.parent._bFireLoadEvent == true) {
					if (this.parent.parent && this.parent.parent._is_frame && this.parent.parent._window_type == 5) {
						var _window = this.parent._getWindow();
						if (_window && _window._prepared_flag != true) {
							this.parent._delayedfocuscomp = this;
						}
					}
				}
			}



			var c = this, c_temp, target_comp = this;
			if (!this._block_inner_focus) {
				while (c) {
					c_temp = c._getLastFocused();
					if (!c_temp) {
						c_temp = c._getTabOrderFirst();
					}
					if (c_temp) {
						target_comp = c_temp;
					}
					c = c_temp;
				}

				target_comp._resetScrollPos(target_comp, target_comp._adjust_left, target_comp._adjust_top, target_comp._adjust_left + target_comp._adjust_width, target_comp._adjust_top + target_comp._adjust_height, focus_direction);
			}
			else {
				nexacro.Component.prototype._resetScrollPos.call(this, this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, focus_direction);
			}
		}

		var last_focused = this._find_lastFocused();
		var evt_name = "focus";

		if (focus_direction == 0) {
			evt_name = "tabkey";
		}
		else if (focus_direction == 1) {
			evt_name = "shifttabkey";
		}
		else if (focus_direction == 2) {
			evt_name = "downkey";
		}
		else if (focus_direction == 3) {
			evt_name = "upkey";
		}
		this._focus_direction = -1;

		this._on_focus(true, evt_name);
		if (from_child) {
			this._apply_setfocus(evt_name);
		}

		if (this._block_inner_focus && !block_inner) {
			this._block_inner_focus = false;
		}

		return last_focused;
	};

	_pComponent.scrollTo = function (x, y) {
		this._scrollTo(x, y);
	};

	_pComponent.scrollBy = function (x, y) {
		this._scrollBy(x, y);
	};

	_pComponent.getHScrollPos = function () {
		return this._hscroll_pos;
	};

	_pComponent.getVScrollPos = function () {
		return this._vscroll_pos;
	};

	_pComponent.getDisplayText = function () {
		return this._on_getDisplayText();
	};

	_pComponent.getPixelLeft = function () {
		return this._left;
	};
	_pComponent.getPixelTop = function () {
		return this._top;
	};
	_pComponent.getPixelRight = function () {
		return this._right;
	};
	_pComponent.getPixelBottom = function () {
		return this._bottom;
	};
	_pComponent.getPixelWidth = function () {
		return this._width;
	};
	_pComponent.getPixelHeight = function () {
		return this._height;
	};

	_pComponent.getOffsetLeft = function () {
		return this._adjust_left;
	};
	_pComponent.getOffsetTop = function () {
		return this._adjust_top;
	};
	_pComponent.getOffsetRight = function () {
		return this._adjust_left + this._adjust_width;
	};
	_pComponent.getOffsetBottom = function () {
		return this._adjust_top + this._adjust_height;
	};
	_pComponent.getOffsetWidth = function () {
		return this._adjust_width;
	};
	_pComponent.getOffsetHeight = function () {
		return this._adjust_height;
	};

	_pComponent.setOffsetLeft = function (v) {
		return this.set_left(v);
	};
	_pComponent.setOffsetTop = function (v) {
		this.set_top(v);
	};
	_pComponent.setOffsetRight = function (v) {
		this.set_width((v | 0) - this._adjust_left);
	};
	_pComponent.setOffsetBottom = function (v) {
		this.set_height((v | 0) - this._adjust_top);
	};
	_pComponent.setOffsetWidth = function (v) {
		this.set_width(v);
	};
	_pComponent.setOffsetHeight = function (v) {
		this.set_height(v);
	};

	_pComponent._on_afterHideWaitComp = function (status) {
		if (this._status != status) {
			this._changeStatus(this._status, true);
		}
	};

	_pComponent.on_notify_hscroll_onscroll = function (obj, e) {
		this._scrollTo(e.pos, this._vscroll_pos, false, false, e.type, e._evtkind);
	};

	_pComponent.on_notify_vscroll_onscroll = function (obj, e) {
		this._scrollTo(this._hscroll_pos, e.pos, false, false, e.type, e._evtkind);
	};

	_pComponent.on_apply_prop_cssclass = function () {
	};

	_pComponent.on_apply_prop_enable = function (v) {
		if (this._is_scrollable == true) {
			if (this.vscrollbar) {
				this.vscrollbar._setEnable(v);
			}
			if (this.hscrollbar) {
				this.hscrollbar._setEnable(v);
			}
		}
	};

	_pComponent.on_apply_prop_taborder = function () {
		if (this.tabstop) {
			this._setAccessibilityFlagFocusable(true);
		}
	};

	_pComponent.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext, this.tooltiptype);
		}
		this.on_apply_prop_accessibilitydescription();
		this._updateAccessibilityLabel();
	};

	_pComponent.on_apply_prop_rtl = function () {
		if (!nexacro._SupportRTL) {
			return;
		}

		this._rtl = this._isRtl();
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementRtl(this._rtl);
		}
	};

	_pComponent._apply_setfocus = function (evt_name) {
		var control_elem = this._control_element;
		if (control_elem) {
			var selffocus = ((evt_name == "lbutton") ? false : nexacro._enableaccessibility);
			control_elem.setElementFocus(selffocus);
		}
	};

	_pComponent.on_get_popupControlTypeName = function () {
		var rootcomp = this._getRootComponent(this);
		return rootcomp.on_get_css_assumedtypename();
	};

	_pComponent.on_get_prop_tabstop = function () {
		return this.tabstop;
	};

	_pComponent._on_getFitSize = function () {
		return [this._adjust_width, this._adjust_height];
	};

	_pComponent._on_getDisplayText = function () {
		return this._displaytext;
	};
	_pComponent._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false, 
			want_touchstart : false, 
			want_touchmove : false
		};
	};

	_pComponent.applyto_bindSource = function (propid, Val) {
		if (!this._bind_event) {
			return true;
		}

		var evt = {
			propid : propid, 
			val : Val
		};
		var ret = this._bind_event._fireEvent(this, evt);
		return ret;
	};

	_pComponent.on_getBindableProperties = function () {
		return [];
	};

	_pComponent.on_init_bindSource = function (columnid, propid, ds) {
		return;
	};

	_pComponent.on_change_bindSource = function (propid, ds, row, col) {
		return;
	};

	_pComponent.on_getIDCSSSelector = function () {
		return this.name;
	};

	_pComponent.on_get_css_assumedtypename = function () {
		return this._type_name;
	};

	_pComponent.initProperties = nexacro._emptyFn;
	_pComponent.initEvents = nexacro._emptyFn;
	_pComponent._resizePopupInbound = nexacro._emptyFn;

	_pComponent._cancelEvent = nexacro._emptyFn;
	_pComponent._applyZoomPopup = nexacro._emptyFn;

	_pComponent._getComponentsByTaborder = nexacro._emptyFn;
	_pComponent._getTabOrderNext = nexacro._emptyFn;
	_pComponent._getTabOrderFirst = nexacro._emptyFn;
	_pComponent._getTabOrderLast = nexacro._emptyFn;
	_pComponent._searchNextTabFocus = nexacro._emptyFn;
	_pComponent._searchPrevTabFocus = nexacro._emptyFn;
	_pComponent._getMainFrame = nexacro._emptyFn;

	_pComponent._getHeadingOrderNext = nexacro._emptyFn;
	_pComponent._getHeadingOrderFirst = nexacro._emptyFn;
	_pComponent._getHeadingOrderLast = nexacro._emptyFn;
	_pComponent._searchNextHeadingFocus = nexacro._emptyFn;
	_pComponent._searchPrevHeadingFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoByHover = nexacro._emptyFn;
	_pComponent._setAccessibilityNotifyEvent = nexacro._emptyFn;

	_pComponent._on_getAccessibilityAdditionalLabel = function () {
		return "";
	};

	_pComponent._on_getAccessibilityAdditionalRole = function () {
		return "";
	};

	_pComponent.on_get_accessibility_label = function () {
		return "";
	};

	_pComponent.on_get_accessibility_description = function () {
		return "";
	};

	_pComponent.on_get_accessibility_action = function () {
		return "";
	};

	_pComponent._getAccessibilityRole = nexacro._emptyFn;
	_pComponent._getAccessibilityLabel = nexacro._emptyFn;
	_pComponent._getAccessibilityDescLevel = nexacro._emptyFn;
	_pComponent._getAccessibilityDescription = nexacro._emptyFn;
	_pComponent._getAccessibilityAction = nexacro._emptyFn;
	_pComponent._getAccessibilityReadLabel = nexacro._emptyFn;
	_pComponent._getLinkedLabel = nexacro._emptyFn;
	_pComponent._getLinkedDescription = nexacro._emptyFn;
	_pComponent._getDescLevel = nexacro._emptyFn;
	_pComponent._getLinkedAction = nexacro._emptyFn;
	_pComponent._getAccessibilityParentValue = nexacro._emptyFn;
	_pComponent._getNextAccessibilityOrderIndex = nexacro._emptyFn;

	_pComponent._setAccessibilityRole = nexacro._emptyFn;
	_pComponent._setAccessibilityLabel = nexacro._emptyFn;
	_pComponent._setAccessibilityEnable = nexacro._emptyFn;
	_pComponent._setAccessibilityDescription = nexacro._emptyFn;
	_pComponent._setAccessibilityAction = nexacro._emptyFn;
	_pComponent._setAccessibilityDescLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityStatDisabled = nexacro._emptyFn;
	_pComponent._setAccessibilityStatHidden = nexacro._emptyFn;
	_pComponent._setAccessibilityStatChecked = nexacro._emptyFn;
	_pComponent._setAccessibilityStatPressed = nexacro._emptyFn;
	_pComponent._setAccessibilityStatSelected = nexacro._emptyFn;
	_pComponent._setAccessibilityStatExpanded = nexacro._emptyFn;
	_pComponent._setAccessibilityStatAutoComplete = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagHasPopup = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagFocusable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagReadOnly = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagPassword = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagDefaultButton = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiLine = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoCount = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoIndex = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMax = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMin = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueCur = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityHotKey = nexacro._emptyFn;
	_pComponent._setAccessibilityActiveDescendant = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFlag = nexacro._emptyFn;
	_pComponent._setAccessibilityValue = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityStatKillFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityStatLive = nexacro._emptyFn;
	_pComponent._updateAccessibilityLabel = nexacro._emptyFn;

	_pComponent._notifyAccessibility = nexacro._emptyFn;

	_pComponent._isAccessibilityEnable = nexacro._echoFn;
	_pComponent._isItemAccessibilityEnable = nexacro._echoFn;
	_pComponent._isAccessibilityRoleHeading = nexacro._emptyFn;

	_pComponent._makeStatusMap = function () {
		this._statusmap = {
			disabled : false, 
			mouseover : false, 
			focused : false, 
			deactivate : false
		};
		if (this._use_readonly_status) {
			this._statusmap.readonly = false;
		}

		this._userstatusmap = {
		};
		if (this._use_pushed_status) {
			this._userstatusmap.pushed = false;
		}

		if (this._use_selected_status) {
			this._userstatusmap.selected = false;
		}
	};


	_pComponent._makeCSSMapInfo = function () {
		var findcssmap = [];
		var typeselector = this.on_get_css_assumedtypename();

		var mapfortypename = nexacro._dimension_maps[typeselector];
		if (mapfortypename) {
			var mapfortypename_self = mapfortypename.self;
			if (mapfortypename_self) {
				findcssmap.push(mapfortypename_self);
			}
		}

		var arr_mapfortypename_class;
		if (mapfortypename) {
			arr_mapfortypename_class = mapfortypename["class"];
		}

		var cssselectors = this._getClassCSSSelector();
		var len, i, j, jlen, matchcount = 0;
		if (arr_mapfortypename_class && cssselectors) {
			len = cssselectors.length;
			jlen = arr_mapfortypename_class.length;
			for (j = 0; j < jlen; j++) {
				if (len == matchcount) {
					break;
				}
				var mapfortypename_class = arr_mapfortypename_class[j];
				var mapforclass;
				for (i = 0; i < len; i++) {
					var cssselector = cssselectors[i];
					if (cssselector) {
						mapforclass = mapfortypename_class[cssselector.trim()];
						if (mapforclass) {
							var mapforclass_self = mapforclass.self;
							if (mapforclass_self) {
								findcssmap.push(mapforclass_self);
							}
							matchcount++;
							break;
						}
					}
				}
			}
		}

		if (this._is_subcontrol && this.parent && this.parent._is_component) {
			var idselector = this._getIDCSSSelector();
			if (idselector) {
				var searchmapdata;
				var mapforid = nexacro._dimension_maps[idselector];
				if (mapforid) {
					searchmapdata = [];
					searchmapdata.push(mapforid);
				}

				if (mapforid) {
					this._getCSSMapParent()._makeRefCSSMapInfo(findcssmap, searchmapdata, cssselectors);
				}
			}
		}



		var pitem;
		len = findcssmap.length;

		this._cssselector = {
			enabled : {
			}
		};
		var selector = this._cssselector;
		for (i = len - 1; i >= 0; i--) {
			var findselector = findcssmap[i];
			for (var status in findselector) {
				if (!findselector.hasOwnProperty(status)) {
					continue;
				}
				var item = findselector[status];

				if (nexacro._include_status_map) {
					if (!selector[status]) {
						selector[status] = {
						};
					}
				}

				for (var attr in item) {
					if (selector[status] && selector[status][attr]) {
						continue;
					}

					if (!item.hasOwnProperty(attr)) {
						continue;
					}
					pitem = item[attr];

					if (!selector[status]) {
						selector[status] = {
						};
					}
					selector[status][attr] = pitem;
				}
			}
		}
	};

	_pComponent._getCSSMapParent = function () {
		return this.parent;
	};



	_pComponent._makeRefCSSMapInfo = function (cssmap, searchmapdata, sub_cssselectors) {
		var len, i, j, jlen, matchcount = 0;
		var mapforclass, cssselector;
		var typeselector = this.on_get_css_assumedtypename();
		var idselector = this._getIDCSSSelector();
		var cssselectors = this._getClassCSSSelector();

		var mapforid_parent = searchmapdata.shift();
		var findmaplist = [];
		var mapforid_class = null;

		while (mapforid_parent) {
			var _mapforid_parent = mapforid_parent.parent;
			if (_mapforid_parent) {
				var mapforid;
				if (idselector) {
					mapforid = _mapforid_parent[idselector];
					if (mapforid) {
						findmaplist.push(mapforid);
						mapforid_class = mapforid["class"];
						if (mapforid_class && cssselectors) {
							len = cssselectors.length;
							for (i = 0; i < len; i++) {
								cssselector = cssselectors[i];
								if (cssselector) {
									mapforclass = mapforid_class[cssselector.trim()];
									if (mapforclass) {
										findmaplist.push(mapforclass);
									}
								}
							}
						}
					}
				}

				var mapfortypename = _mapforid_parent[typeselector];

				if (mapfortypename) {
					var mapfortypename_self = mapfortypename.self;
					if (mapfortypename_self) {
						cssmap.push(mapfortypename_self);
					}

					var arr_mapfortypename_class = mapfortypename["class"];
					if (arr_mapfortypename_class && cssselectors) {
						len = cssselectors.length;
						jlen = arr_mapfortypename_class.length;
						matchcount = 0;
						for (j = 0; j < jlen; j++) {
							if (len == matchcount) {
								break;
							}

							var mapfortypename_class = arr_mapfortypename_class[j];
							for (i = 0; i < len; i++) {
								cssselector = cssselectors[i];
								if (cssselector) {
									mapforclass = mapfortypename_class[cssselector.trim()];
									if (mapforclass && mapforclass.self) {
										cssmap.push(mapforclass.self);
										matchcount++;
									}
								}
							}
						}
					}
				}
			}

			var arr_mapforid_class = mapforid_parent["class"];
			if (arr_mapforid_class && sub_cssselectors) {
				jlen = arr_mapforid_class.length;
				len = sub_cssselectors.length;
				matchcount = 0;
				for (j = 0; j < jlen; j++) {
					if (len == matchcount) {
						break;
					}
					for (i = 0; i < len; i++) {
						cssselector = sub_cssselectors[i];
						if (cssselector) {
							mapforid_class = arr_mapforid_class[j];
							mapforclass = mapforid_class[cssselector.trim()];
							if (mapforclass && mapforclass.parent) {
								var mapforclass_parent_id = mapforclass.parent[idselector];
								if (mapforclass_parent_id) {
									findmaplist.push(mapforclass_parent_id);
									matchcount++;
								}
								else if (!this._is_subcontrol) {
									cssmap.push(mapforclass.parent[typeselector].self);
								}
							}
						}
					}
				}
			}

			mapforid_parent = searchmapdata.shift();
		}

		var parent = this._getCSSMapParent();
		if (findmaplist.length > 0 && parent && parent._is_component) {
			parent._makeRefCSSMapInfo(cssmap, findmaplist, cssselectors);
		}
	};

	_pComponent._setControlElementCssSelector = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());

			if (this._is_subcontrol) {
				var idselector = this.on_getIDCSSSelector();
				if (this.parent && !this.parent._is_subcontrol && (this.parent._is_containerset || this.parent._is_form || this.parent._is_frame)) {
					idselector = idselector + this.parent.on_get_css_assumedtypename();
					var parentidselector = idselector;
					var parentcssclass = this.parent._getClassCSSSelector();
					if (parentcssclass) {
						var len = parentcssclass.length;
						idselector = parentidselector + " ";
						for (var i = 0; i < len; i++) {
							idselector += parentidselector + parentcssclass[i];
						}
					}
				}

				control_elem.setElementIDCSSSelector(idselector);
			}
			else {
				control_elem.setElementIDCSSSelector(this._getIDCSSSelector());
			}

			var cssclass = this._getElementClassCSSSelector();
			if (cssclass) {
				control_elem.setElementClassCSSSelector(cssclass.join(" "));
			}
			else {
				control_elem.setElementClassCSSSelector("");
			}

			return true;
		}

		return false;
	};

	_pComponent._changeStatus = function (status, value) {
		this._on_changeStatus(status, value);
	};

	_pComponent.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		return applystatus;
	};

	_pComponent._on_changeStatus = function (status, value) {
		if (!this._is_alive) {
			return;
		}

		this._oldstatus = this._status;
		var applystatus = "enabled";

		this._statusmap[status] = value;
		var statusmap = this._statusmap;
		if (statusmap.disabled) {
			applystatus = "disabled";
		}
		else if (statusmap.readonly && this._use_readonly_status) {
			applystatus = "readonly";
		}
		else if (statusmap.mouseover) {
			applystatus = "mouseover";
		}
		else if (statusmap.focused) {
			applystatus = "focused";
		}
		else if (statusmap.deactivate) {
			applystatus = "deactivate";
		}

		this._status = this.on_changeStatus(status, value, applystatus, this._status, this._userstatus);

		if (this._status == "mouseover" && nexacro._cur_track_info) {
			this._status = this._oldstatus;
			return;
		}

		if (this._oldstatus != this._status) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus, undefined, status, value);
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFlag(this._status, this._userstatus);
		}
	};

	_pComponent._changeUserStatus = function (changestatus, value) {
		return this._on_changeUserStatus(changestatus, value);
	};

	_pComponent.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		return applyuserstatus;
	};

	_pComponent._on_changeUserStatus = function (status, value) {
		this._olduserstatus = this._userstatus;
		var applystatus = "";

		this._userstatusmap[status] = value;
		var statusmap = this._userstatusmap;

		if (this._use_pushed_status && statusmap.pushed) {
			applystatus = "pushed";
		}
		else if (this._use_selected_status && statusmap.selected) {
			applystatus = "selected";
		}

		this._userstatus = this.on_changeUserStatus(status, value, applystatus, this._status, this._userstatus);
		if (this._olduserstatus != this._userstatus) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus, undefined, status, value);
		}

		this._setAccessibilityStatFlag(this._status, this._userstatus);
	};

	_pComponent.on_apply_status = function (status, userstatus, status_param, value_param) {
	};

	_pComponent._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus) {
		if (apply || (oldstatus != status) || (olduserstatus != userstatus)) {
			this.on_apply_status(status, userstatus, status_param, value_param);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			if (oldstatus != status) {
				control_elem.setElementStatus(applycssstatus);
			}

			if (olduserstatus != userstatus || applycssuserstatus === "") {
				control_elem.setElementUserStatus(applycssuserstatus);
			}
		}
	};

	_pComponent._apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param) {
		var enable = (nexacro._is_enable_setting) ? this.enable : this.enable && this._real_enable;

		var form;
		if (!this._is_frame || (this._is_frame && !this._is_popup_frame)) {
			form = this.parent;
		}

		while (form != null) {
			if (!form._is_frame || (form._is_frame && !form._is_popup_frame)) {
				if (form._is_subcontrol == false) {
					if (form._real_enable == false || form.enable == false) {
						enable = false;
						break;
					}
				}
				form = form.parent;
			}
			else {
				break;
			}
		}

		if (this._setEnable(enable)) {
			return;
		}

		this._apply_status_toelement(oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param);
	};

	_pComponent._apply_status_toelement = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param) {
		var control_elem = this._control_element;
		if (this.visible && control_elem) {
			var multistatus = "";
			if (status != "enabled" && status && userstatus) {
				multistatus = status + "_" + userstatus;
			}

			var settingstatus = false;
			var settinguserstatus = false;

			var border = null;
			var padding = null;
			var edge = null;

			var cssselector;
			if (multistatus) {
				cssselector = this._cssselector[multistatus];
				if (cssselector) {
					settingstatus = true;
					settinguserstatus = true;

					border = cssselector.border;
					padding = cssselector.padding;
					edge = cssselector.edge;
				}
			}

			var disabled_status = false;
			if (status === "disabled") {
				disabled_status = true;
				cssselector = this._cssselector[status];
				if (cssselector) {
					settingstatus = true;

					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}

			if (userstatus) {
				cssselector = this._cssselector[userstatus];
				if (cssselector) {
					settinguserstatus = true;
					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}

			if (!disabled_status && status != "enabled") {
				cssselector = this._cssselector[status];
				if (cssselector) {
					settingstatus = true;

					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}

			var enableselector = this._cssselector.enabled;
			if (!border) {
				border = enableselector.border;
			}
			if (!padding) {
				padding = enableselector.padding;
			}
			if (!edge) {
				edge = enableselector.edge;
			}

			if (edge && this._isRtl() && enableselector.rtlEdgeImage) {
				edge = enableselector.rtlEdgeImage;
			}

			control_elem.setElementCSSMapInfo(border, padding, edge);

			var applycssstatus = status;
			var applycssuserstatus = userstatus;

			if (nexacro._include_status_map) {
				applycssstatus = (settingstatus ? status : "");
				applycssuserstatus = (settinguserstatus ? userstatus : "");
			}

			this._on_apply_status(oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);
		}
	};

	_pComponent._adjustPosition = function () {
		var parent = this.parent ? this.parent : this._getForm();
		var fittocontents = this.fittocontents;
		var info = this._arrange_info;
		var target1, target2;

		var left = this._left;
		var top = this._top;
		var right = this._right;
		var bottom = this._bottom;
		var width = this._width;
		var height = this._height;

		var minwidth = this._minwidth;
		var maxwidth = this._maxwidth;
		var minheight = this._minheight;
		var maxheight = this._maxheight;

		var p_width = parent ? parent._getClientWidth() : 0;
		var p_height = parent ? parent._getClientHeight() : 0;

		var calc_pos;
		var calc_left = 0, calc_top = 0, calc_right = 0, calc_bottom = 0;

		if (left != null) {
			if (info && (target1 = this._getArrangeComp("left"))) {
				calc_pos = target1._adjust_left + target1._adjust_width;
			}
			else {
				calc_pos = 0;
			}

			calc_left = calc_pos + left;

			if (right != null) {
				if (info && (target2 = this._getArrangeComp("right"))) {
					calc_pos = target2._adjust_left;
				}
				else {
					calc_pos = p_width;
				}

				if (fittocontents == "width" || fittocontents == "both") {
					calc_right = calc_left + width;
				}
				else {
					calc_right = calc_pos - right;
				}

				if (!target1 && target2) {
					if (minwidth != null && ((calc_right - calc_left) < minwidth)) {
						calc_left = calc_right - minwidth;
					}
					else if (maxwidth != null && ((calc_right - calc_left) > maxwidth)) {
						calc_left = calc_right - maxwidth;
					}
				}
			}
			else {
				calc_right = calc_left + width;
			}
		}
		else {
			if (info && (target2 = this._getArrangeComp("right"))) {
				calc_pos = target2._adjust_left;
			}
			else {
				calc_pos = p_width;
			}

			calc_right = calc_pos - right;
			calc_left = calc_right - width;

			if (minwidth != null && (width < minwidth)) {
				calc_left = calc_right - minwidth;
			}
			else if (maxwidth != null && (width > maxwidth)) {
				calc_left = calc_right - maxwidth;
			}
		}

		if (top != null) {
			if (info && (target1 = this._getArrangeComp("top"))) {
				calc_pos = target1._adjust_top + target1._adjust_height;
			}
			else {
				calc_pos = 0;
			}

			calc_top = calc_pos + top;

			if (bottom != null) {
				if (info && (target2 = this._getArrangeComp("bottom"))) {
					calc_pos = target2._adjust_top;
				}
				else {
					calc_pos = p_height;
				}

				if (fittocontents == "height" || fittocontents == "both") {
					calc_bottom = calc_top + height;
				}
				else {
					calc_bottom = calc_pos - bottom;
				}

				if (!target1 && target2) {
					if (minheight != null && ((calc_bottom - calc_top) < minheight)) {
						calc_top = calc_bottom - minheight;
					}
					else if (maxheight != null && ((calc_bottom - calc_top) > maxheight)) {
						calc_top = calc_bottom - maxheight;
					}
				}
			}
			else {
				calc_bottom = calc_top + height;
			}
		}
		else {
			if (info && (target2 = this._getArrangeComp("bottom"))) {
				calc_pos = target2._adjust_top;
			}
			else {
				calc_pos = p_height;
			}

			calc_bottom = calc_pos - bottom;
			calc_top = calc_bottom - height;

			if (minheight != null && (height < minheight)) {
				calc_top = calc_bottom - minheight;
			}
			else if (maxheight != null && (height > maxheight)) {
				calc_top = calc_bottom - maxheight;
			}
		}

		this._adjust_left = calc_left;

		this._adjust_top = calc_top;

		calc_pos = calc_right - calc_left;
		if (calc_pos < 0) {
			calc_pos = 0;
		}

		if (minwidth != null && (calc_pos < minwidth)) {
			calc_pos = (minwidth < 0) ? 0 : minwidth;
		}
		else if (maxwidth != null && (calc_pos > maxwidth)) {
			calc_pos = (maxwidth < 0) ? 0 : maxwidth;
		}

		this._adjust_width = calc_pos;

		calc_pos = calc_bottom - calc_top;
		if (calc_pos < 0) {
			calc_pos = 0;
		}

		if (minheight != null && (calc_pos < minheight)) {
			calc_pos = (minheight < 0) ? 0 : minheight;
		}
		else if (maxheight != null && (calc_pos > maxheight)) {
			calc_pos = (maxheight < 0) ? 0 : maxheight;
		}

		this._adjust_height = calc_pos;
	};

	_pComponent._setLeft = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.left != propVal) {
			this.left = propVal;
			this._parseArrangeInfoProp("left", propVal);

			if (propVal == null) {
				if (this.width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this.right == null) {
					var right = this.parent._adjust_width - (this._adjust_left + this._adjust_width);
					this._setRight(right);
				}
			}
			else {
				if (this.right != null && this.width != null) {
					this._setRight(null);
				}
			}
		}
	};

	_pComponent._setTop = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.top != propVal) {
			this.top = propVal;
			this._parseArrangeInfoProp("top", propVal);

			if (propVal == null) {
				if (this.height == null) {
					this._setHeight(this._adjust_height);
				}
				else if (this.bottom == null) {
					var bottom = this.parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				if (this.bottom != null && this.height != null) {
					this._setBottom(null);
				}
			}
		}
	};

	_pComponent._setRight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.right != propVal) {
			this.right = propVal;
			this._parseArrangeInfoProp("right", propVal);

			if (propVal == null) {
				if (this.width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this.left == null) {
					this._setLeft(this._adjust_left);
				}
			}
			else {
				if (this.left != null && this.width != null) {
					this._setWidth(null);
				}
			}
		}
	};

	_pComponent._setBottom = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.bottom != propVal) {
			this.bottom = propVal;
			this._parseArrangeInfoProp("bottom", propVal);

			if (propVal == null) {
				if (this.height == null) {
					this._setHeight(this._adjust_height);
				}
				else if (this.top == null) {
					this._setTop(this._adjust_top);
				}
			}
			else {
				if (this.top != null && this.height != null) {
					this._setHeight(null);
				}
			}
		}
	};

	_pComponent._setWidth = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.width != propVal) {
			this.width = propVal;
			this._parseArrangeInfoProp("width", propVal);

			if (propVal == null) {
				if (this.left == null) {
					this._setLeft(this._adjust_left);
				}
				else if (this.right == null) {
					var right = this.parent._adjust_width - (this._adjust_left + this._adjust_width);
					this._setRight(right);
				}
			}
			else {
				if (this.left != null && this.right != null) {
					this._setRight(null);
				}
			}
		}
	};

	_pComponent._setHeight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.height != propVal) {
			this.height = propVal;
			this._parseArrangeInfoProp("height", propVal);

			if (propVal == null) {
				if (this.top == null) {
					this._setTop(this._adjust_top);
				}
				else if (this.bottom == null) {
					var bottom = this.parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				if (this.top != null && this.bottom != null) {
					this._setBottom(null);
				}
			}
		}
	};

	_pComponent._setMinwidth = function (v) {
		if (v != null && isNaN(parseInt(v))) {
			return;
		}

		if (this.minwidth != v) {
			if (v == null) {
				this.minwidth = null;
				this._minwidth = null;
			}
			else {
				this.minwidth = v;
				this._minwidth = parseInt(v);
			}

			if ((v && this.maxwidth) && (this._minwidth > this._maxwidth)) {
				this._setMaxwidth(this._minwidth);
			}
		}
	};

	_pComponent._setMaxwidth = function (v) {
		if (v != null && isNaN(parseInt(v))) {
			return;
		}

		if (this.maxwidth != v) {
			if (v == null) {
				this.maxwidth = null;
				this._maxwidth = null;
			}
			else {
				this.maxwidth = v;
				this._maxwidth = parseInt(v);
			}

			if ((v && this.minwidth) && (this._maxwidth < this._minwidth)) {
				this._setMinwidth(this._maxwidth);
			}
		}
	};

	_pComponent._setMinheight = function (v) {
		if (v != null && isNaN(parseInt(v))) {
			return;
		}

		if (this.minheight != v) {
			if (v == null) {
				this.minheight = null;
				this._minheight = null;
			}
			else {
				this.minheight = v;
				this._minheight = parseInt(v);
			}

			if ((v && this.maxheight) && (this._minheight > this._maxheight)) {
				this._setMaxheight(this._minheight);
			}
		}
	};

	_pComponent._setMaxheight = function (v) {
		if (v != null && isNaN(parseInt(v))) {
			return;
		}

		if (this.maxheight != v) {
			if (v == null) {
				this.maxheight = null;
				this._maxheight = null;
			}
			else {
				this.maxheight = v;
				this._maxheight = parseInt(v);
			}

			if ((v && this.minheight) && (this._maxheight < this.minheight)) {
				this._setMinheight(this._maxheight);
			}
		}
	};

	_pComponent.on_update_position = function (resize_flag, move_flag, update) {
		var control_elem = this._control_element;
		if (control_elem) {
			if (move_flag) {
				control_elem.setElementPosition(this._adjust_left, this._adjust_top);
				this.on_fire_onmove(this._adjust_left, this._adjust_top);
			}
			if (resize_flag || update) {
				control_elem.setElementSize(this._adjust_width, this._adjust_height, update);
				if (resize_flag) {
					this.on_fire_onsize(this._adjust_width, this._adjust_height);
				}
			}
		}
	};


	_pComponent._update_position = function (isrtl) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var update = false;
		var bsize = false, bmove = false;

		this._calcArrangePosition();
		this._adjustPosition();

		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;

			if (old_width == 0 || old_height == 0) {
				update = true;
			}
		}
		if (this._adjust_left != old_left || this._adjust_top != old_top) {
			bmove = true;
		}

		this.on_update_position(bsize, bmove, bmove ? false : isrtl);

		if (update) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	_pComponent._convToPixel = function (val, parentsize) {
		if (typeof (val) == "string" && val.indexOf("%") >= 0) {
			return parseInt((parentsize *  parseFloat(val)) / 100);
		}

		return (parseInt(val) | 0);
	};

	_pComponent._parseArrangeVal = function (val) {
		var info = null;

		if (val && typeof val == "string") {
			var arr = val.split(":");

			if (arr.length == 2) {
				if (!isNaN(parseFloat(arr[1]))) {
					info = {
						compid : arr[0], 
						distance : arr[1]
					};
				}
			}
			else if (val.indexOf("%") >= 0) {
				if (!isNaN(parseFloat(val))) {
					info = {
						compid : null, 
						distance : val
					};
				}
			}
		}
		return info;
	};

	_pComponent._parseArrangeInfoProp = function (prop_name, val) {
		var info_obj = this._arrange_info;
		var info;

		if (val != undefined) {
			if (!info_obj) {
				info_obj = {
				};
			}

			info = this._parseArrangeVal(val);
			if (info) {
				info_obj[prop_name] = info;
			}
			else {
				info_obj[prop_name] = undefined;
				delete info_obj[prop_name];
			}
		}
		else {
			if (info_obj) {
				info_obj[prop_name] = undefined;
				delete info_obj[prop_name];
			}
		}

		if (info_obj) {
			this._arrange_info = info_obj;

			for (info in info_obj) {
				break;
			}

			if (!info) {
				this._arrange_info = null;
			}
		}
	};

	_pComponent._parseArrangeInfo = function (left, top, right, bottom, width, height) {
		if (left == undefined && top == undefined && right == undefined && bottom == undefined && width == undefined && height == undefined) {
			this._arrange_info = null;
			return;
		}

		var info;
		var info_obj = {
		};

		if (left && (info = this._parseArrangeVal(left))) {
			info_obj.left = info;
		}
		if (top && (info = this._parseArrangeVal(top))) {
			info_obj.top = info;
		}
		if (right && (info = this._parseArrangeVal(right))) {
			info_obj.right = info;
		}
		if (bottom && (info = this._parseArrangeVal(bottom))) {
			info_obj.bottom = info;
		}
		if (width && (info = this._parseArrangeVal(width))) {
			info_obj.width = info;
		}
		if (height && (info = this._parseArrangeVal(height))) {
			info_obj.height = info;
		}

		this._arrange_info = info_obj;

		for (info in this._arrange_info) {
			break;
		}

		if (!info) {
			this._arrange_info = null;
		}
	};

	_pComponent._calcArrangePosition = function () {
		var info = this._arrange_info;
		var form = this._is_subcontrol ? this.parent : this._getForm();
		var comp, comp_width, comp_height, obj, parsePosition;

		var size;
		var fittocontents = this.fittocontents;
		if (fittocontents != "none") {
			size = this._on_getFitSize();
		}

		if (info && (obj = info.left)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
					comp_width = comp._getClientWidth();
				}
				else {
					comp_width = comp._adjust_width;
				}
				this._left = this._convToPixel(obj.distance, comp_width);
			}
		}
		else {
			if (this.left != null) {
				this._left = isNaN(parsePosition = parseFloat(this.left)) ? this._left : parsePosition;
			}
			else {
				this._left = null;
			}
		}

		if (info && (obj = info.top)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
					comp_height = comp._getClientHeight();
				}
				else {
					comp_height = comp._adjust_height;
				}

				this._top = this._convToPixel(obj.distance, comp_height);
			}
		}
		else {
			if (this.top != null) {
				this._top = isNaN(parsePosition = parseFloat(this.top)) ? this._top : parsePosition;
			}
			else {
				this._top = null;
			}
		}

		if (info && (obj = info.right)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
					comp_width = comp._getClientWidth();
				}
				else {
					comp_width = comp._adjust_width;
				}

				this._right = this._convToPixel(obj.distance, comp_width);
			}
		}
		else {
			if (this.right != null) {
				this._right = isNaN(parsePosition = parseFloat(this.right)) ? this._right : parsePosition;
			}
			else {
				this._right = null;
			}
		}

		if (info && (obj = info.bottom)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
					comp_height = comp._getClientHeight();
				}
				else {
					comp_height = comp._adjust_height;
				}

				this._bottom = this._convToPixel(obj.distance, comp_height);
			}
		}
		else {
			if (this.bottom != null) {
				this._bottom = isNaN(parsePosition = parseFloat(this.bottom)) ? this._bottom : parsePosition;
			}
			else {
				this._bottom = null;
			}
		}

		if (fittocontents == "width" || fittocontents == "both") {
			if (size) {
				this._width = size[0];
			}
		}
		else {
			if (info && (obj = info.width)) {
				if (form && form._is_created_contents) {
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						comp = form;
						comp_width = comp._getClientWidth();
					}
					else {
						comp_width = comp._adjust_width;
					}
					this._width = this._convToPixel(obj.distance, comp_width);
				}
			}
			else {
				if (this.width != null) {
					this._width = isNaN(parsePosition = parseFloat(this.width)) ? this._width : parsePosition;
				}
				else {
					this._width = null;
				}
			}
		}

		if (fittocontents == "height" || fittocontents == "both") {
			if (size) {
				this._height = size[1];
			}
		}
		else {
			if (info && (obj = info.height)) {
				if (form && form._is_created_contents) {
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						comp = form;
						comp_height = comp._getClientHeight();
					}
					else {
						comp_height = comp._adjust_height;
					}
					this._height = this._convToPixel(obj.distance, comp_height);
				}
			}
			else {
				if (this.height != null) {
					this._height = isNaN(parsePosition = parseFloat(this.height)) ? this._height : parsePosition;
				}
				else {
					this._height = null;
				}
			}
		}
	};

	_pComponent._getArrangeComp = function (position_prop) {
		switch (position_prop) {
			case "left":
			case "top":
			case "width":
			case "height":
			case "right":
			case "bottom":
				break;
			default:
				return undefined;
		}

		var info = this._arrange_info;

		if (!info) {
			return null;
		}

		var info_obj = info[position_prop];
		if (!info_obj) {
			return null;
		}

		return this._findComponentForArrange(info_obj.compid);
	};

	_pComponent._findComponentForArrange = function (compid) {
		var comp = null;
		var form = null;
		var comps, this_idx, target_idx, source_idx;
		if (compid) {
			if (!this._is_subcontrol) {
				form = this._getForm();
				if (form) {
					comps = form.components;
					this_idx = comps.indexOf(this.id);
					target_idx = comps.indexOf(compid);

					if (this_idx < target_idx) {
						return null;
					}

					var target_comp = comps[compid];
					if (target_comp) {
						if ((this.positionstep != target_comp.positionstep) || 
							this.positionstep == -1 || target_comp.positionstep == -1) {
							return null;
						}
					}

					comp = comps[target_idx];
				}
			}
			else {
				var parent = this.parent;
				if (parent._findChild) {
					var target = parent._findChild(compid);

					if (!target || target.taborder > this.taborder) {
						return null;
					}

					comp = target;
				}
				else {
					form = this._getForm();
					if (form) {
						comps = form.components;
						source_idx = comps.indexOf(this.id);
						target_idx = comps.indexOf(compid);

						if (source_idx < target_idx) {
							return null;
						}

						comp = comps[target_idx];
					}
				}
			}
		}

		return comp;
	};

	_pComponent._onRecalcScrollSize = nexacro._emptyFn;

	_pComponent._onResetScrollBar = function () {
		if (!this._is_scrollable) {
			return;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			var hscrollbar_size = this._getHScrollBarSize();
			var vscrollbar_size = this._getVScrollBarSize();

			var bcreatevscroll = false;
			var bcreatehscroll = false;

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			var scrolltype = this.scrolltype;
			if (scrolltype == "none") {
			}
			else {
				if (scrolltype != "vertical" && hscrollbartype != "none") {
					bcreatehscroll = true;
				}

				if (scrolltype != "horizontal" && vscrollbartype != "none") {
					bcreatevscroll = true;
				}

				if (this._is_form && this.getStepCount() > 0) {
					bcreatehscroll = false;
				}
			}

			var client_left = control_elem.client_left;
			var client_top = control_elem.client_top;
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			var zclient_width = control_elem._zclient_width;
			var zclient_height = control_elem._zclient_height;

			var paddingleft = 0, paddingtop = 0, paddingright = 0, paddingbottom = 0;
			var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;

			var vscroll_enable = false;
			var hscroll_enable = false;

			if (control_elem._apply_client_padding && padding) {
				paddingleft = padding.left;
				paddingtop = padding.top;
				paddingright = padding.right;
				paddingbottom = padding.bottom;
			}

			var hscroll_left = client_left - paddingleft;
			var hscroll_top = client_height + paddingtop + paddingbottom;
			var hscroll_width = client_width + paddingleft + paddingright;

			var vscroll_left = client_width + paddingleft + paddingright;
			var vscroll_top = client_top - paddingtop;
			var vscroll_height = client_height + paddingtop + paddingbottom;

			if (bcreatehscroll) {
				this._createHScrollBar(hscrollbar_size);

				if (hscrollbar_size > 0) {
					if (control_elem.hscroll_limit <= 0 && hscrollbartype != "fixed") {
						hscrollbar_size = 0;
					}

					if (hscrollbartype == "autoindicator") {
						hscroll_top -= hscrollbar_size;
						this.hscrollbar.set_visible(false);
					}
					else {
						this.hscrollbar.set_visible(true);
					}
				}
			}
			else {
				if (this.hscrollbar) {
					this.hscrollbar.destroy();
					this.hscrollbar = null;
				}
			}

			if (bcreatevscroll) {
				this._createVScrollBar(vscrollbar_size);

				if (vscrollbar_size > 0) {
					if (control_elem.vscroll_limit <= 0 && vscrollbartype != "fixed") {
						vscrollbar_size = 0;
					}

					if (vscrollbartype == "autoindicator") {
						vscroll_left -= vscrollbar_size;
						this.vscrollbar.set_visible(false);
					}
					else {
						this.vscrollbar.set_visible(true);
					}
				}
			}
			else {
				if (this.vscrollbar) {
					this.vscrollbar.destroy();
					this.vscrollbar = null;
				}
			}

			if (this.hscrollbar) {
				if (this._isEnable() && hscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "vertical") && control_elem.hscroll_limit > 0) {
					hscroll_enable = true;
				}

				this.hscrollbar._setScrollInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, hscroll_enable, control_elem.scroll_left);

				if (!this.hscrollbar._is_created) {
					this.hscrollbar.on_created(this._getWindow());
				}
			}

			if (this.vscrollbar) {
				if (this._isEnable() && vscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "horizontal") && control_elem.vscroll_limit > 0) {
					vscroll_enable = true;
				}

				this.vscrollbar._setScrollInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, vscroll_enable, control_elem.scroll_top);
				if (!this.vscrollbar._is_created) {
					this.vscrollbar.on_created(this._getWindow());
				}
			}
		}
	};

	_pComponent._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind) {
		return true;
	};

	_pComponent._scrollBy = function (x, y, bapplyscrollbar, bautohidetimer, evttype, evtkind) {
		x = parseInt(x) + this._hscroll_pos;
		y = parseInt(y) + this._vscroll_pos;

		this._scrollTo(x, y, bapplyscrollbar, bautohidetimer, evttype, evtkind);
	};

	_pComponent._scrollTo = function (hpos, vpos, bapplyscrollbar, bautohidetimer, evttype, evtkind) {
		if (nexacro._isNull(bapplyscrollbar)) {
			bapplyscrollbar = true;
		}
		if (nexacro._isNull(bautohidetimer)) {
			bautohidetimer = false;
		}

		var control_elem = this.getElement();

		if (!control_elem) {
			return false;
		}

		var scrolltype = this.scrolltype;
		var evttype_h, evttype_v;

		if (scrolltype == "none") {
			return;
		}

		var hscrollbartype = this._getHScrollBarType();
		var vscrollbartype = this._getVScrollBarType();

		var hscroll_limit = control_elem.hscroll_limit;
		var vscroll_limit = control_elem.vscroll_limit;

		var current_hpos = this._hscroll_pos;
		var current_vpos = this._vscroll_pos;
		var bchange_hscroll_pos = false;
		var bchange_vscroll_pos = false;

		if (nexacro._isNull(hpos) || scrolltype == "vertical") {
			hpos = current_hpos;
		}
		if (nexacro._isNull(vpos) || scrolltype == "horizontal") {
			vpos = current_vpos;
		}

		hpos = parseInt(hpos) | 0;
		vpos = parseInt(vpos) | 0;

		hpos = hpos < 0 ? 0 : hpos;
		vpos = vpos < 0 ? 0 : vpos;

		var bscroll = this._on_beforescroll(current_hpos, current_vpos, hpos, vpos, evttype, evtkind);

		hpos = hpos > hscroll_limit ? hscroll_limit : hpos;
		vpos = vpos > vscroll_limit ? vscroll_limit : vpos;

		if ((evtkind == "slide" || evtkind == "fling") && this.stepselector && this.stepselector.stepcount > 0) {
			var hmove = Math.abs(current_hpos - hpos);
			var vmove = Math.abs(current_vpos - vpos);
			if (this._is_step_vscrolling) {
				hpos = current_hpos;
			}
			else if (this._is_step_hscrolling) {
				vpos = current_vpos;
			}
			else {
				if (hmove < vmove) {
					hpos = current_hpos;
					this._is_step_vscrolling = true;
				}
				else {
					vpos = current_vpos;
					this._is_step_hscrolling = true;
				}
			}
		}

		if (hpos != current_hpos && vpos != current_vpos) {
			bchange_hscroll_pos = true;
			bchange_vscroll_pos = true;

			if (bscroll) {
				control_elem.setElementScrollPos(hpos, vpos);
			}

			this._hscroll_pos = hpos;
			this._vscroll_pos = vpos;
		}
		else if (hpos != current_hpos) {
			bchange_hscroll_pos = true;
			if (bscroll) {
				control_elem.setElementHScrollPos(hpos);
			}
			this._hscroll_pos = hpos;
		}
		else if (vpos != current_vpos) {
			bchange_vscroll_pos = true;
			if (bscroll) {
				control_elem.setElementVScrollPos(vpos);
			}
			this._vscroll_pos = vpos;
		}

		if (evtkind != "vertical" && evtkind != "page_v" && evtkind != "mousewheel_v") {
			if (evttype) {
				evttype_h = evttype;
			}
			else {
				evttype_h = this._getScrollEventType(current_hpos, hpos, 0, hscroll_limit, "h");
			}
		}

		if (bchange_hscroll_pos || evttype_h) {
			if (evttype_h && evtkind == "mousewheel_h") {
				evttype_h = "wheel" + evttype_h;
			}
			else if (evtkind == "page_h" && (evttype_h == "left" || evttype_h == "right")) {
				evttype_h = "page" + evttype_h;
			}
			else if (evtkind == "slide" || evtkind == "fling") {
				if (evttype_h == "first" || evttype_h == "firstover" || evttype_h == "last" || evttype_h == "lastover") {
					evttype_h = "slide" + evttype_h;
				}
				else if (evttype_h == "left" || evttype_h == "right") {
					evttype_h = "slidescroll" + evttype_h;
				}
				else {
					evttype_h = "slide";
				}
			}

			if (evttype_h == "left" || evttype_h == "right") {
				evttype_h = "none";
			}

			if (bchange_hscroll_pos || evttype_h != "none") {
				this.on_fire_onhscroll("onhscroll", hpos, evttype_h ? evttype_h : evttype, evtkind);
			}
		}

		if (evtkind != "horizontal" && evtkind != "page_h" && evtkind != "mousewheel_h") {
			if (evttype) {
				evttype_v = evttype;
			}
			else {
				evttype_v = this._getScrollEventType(current_vpos, vpos, 0, vscroll_limit, "v");
			}
		}

		if (bchange_vscroll_pos || evttype_v) {
			if (evttype_v && evtkind == "mousewheel_v") {
				evttype_v = "wheel" + evttype_v;
			}
			else if (evtkind == "page_v" && (evttype_v == "up" || evttype_v == "down")) {
				evttype_v = "page" + evttype_v;
			}
			else if (evtkind == "slide" || evtkind == "fling") {
				if (evttype_v == "first" || evttype_v == "firstover" || evttype_v == "last" || evttype_v == "lastover") {
					evttype_v = "slide" + evttype_v;
				}
				else if (evttype_v == "up" || evttype_v == "down") {
					evttype_v = "slidescroll" + evttype_v;
				}
				else {
					evttype_v = "slide";
				}
			}

			if (evttype_v == "up" || evttype_v == "down") {
				evttype_v = "none";
			}

			if ((bchange_vscroll_pos || evttype_v != "none") && evtkind != "stepchange") {
				this.on_fire_onvscroll("onvscroll", vpos, evttype_v ? evttype_v : evttype, evtkind);
			}
		}


		if (bapplyscrollbar) {
			var hscrollbar = this.hscrollbar;
			if (hscrollbar && hscrollbar.enable && bchange_hscroll_pos) {
				if (hscrollbartype == "autoindicator") {
					hscrollbar.set_visible(true);

					if (bautohidetimer) {
						nexacro._OnceCallbackTimer.callonce(this, function () {
							this.hscrollbar.set_visible(false);
						}, 500);
					}
				}

				hscrollbar._setPos(hpos, evtkind, false);
			}

			var vscrollbar = this.vscrollbar;
			if (vscrollbar && vscrollbar.enable && bchange_vscroll_pos) {
				if (vscrollbartype == "autoindicator") {
					vscrollbar.set_visible(true);

					if (bautohidetimer) {
						nexacro._OnceCallbackTimer.callonce(this, function () {
							this.vscrollbar.set_visible(false);
						}, 500);
					}
				}

				vscrollbar._setPos(vpos, evtkind, false);
			}
		}

		return true;
	};

	_pComponent._createVScrollBar = function (scroll_size) {
		var vscrollbartype = this._getVScrollBarType();
		var vscrollbar;

		if (vscrollbartype == "autoindicator" || vscrollbartype == "indicator") {
			if (this.vscrollbar && (this.vscrollbar.id != this._vscrollindicator_id)) {
				this.vscrollbar.destroy();
				this.vscrollbar = null;
			}

			if (!this.vscrollbar) {
				this.vscrollbar = new nexacro.ScrollIndicatorControl(this._vscrollindicator_id, 0, 0, scroll_size, this._getClientWidth(), null, null, null, null, null, null, this);
			}
		}
		else {
			if (this.vscrollbar && (this.vscrollbar.id != this._vscrollbar_id)) {
				this.vscrollbar.destroy();
				this.vscrollbar = null;
			}

			if (!this.vscrollbar) {
				this.vscrollbar = new nexacro.ScrollBarControl(this._vscrollbar_id, 0, 0, scroll_size, this._getClientWidth(), null, null, null, null, null, null, this);
			}
		}

		vscrollbar = this.vscrollbar;

		if (!nexacro._isNull(this.scrollbarbaroutsize)) {
			vscrollbar.set_baroutsize(this.scrollbarbaroutsize);
		}
		if (!nexacro._isNull(this.scrollbarincbuttonsize)) {
			vscrollbar.set_incbuttonsize(this.scrollbarincbuttonsize);
		}
		if (!nexacro._isNull(this.scrollbardecbuttonsize)) {
			vscrollbar.set_decbuttonsize(this.scrollbardecbuttonsize);
		}
		if (!nexacro._isNull(this.scrollbarbarminsize)) {
			vscrollbar.set_barminsize(this.scrollbarbarminsize);
		}
		if (!nexacro._isNull(this.scrollbartrackbarsize)) {
			vscrollbar.set_trackbarsize(this.scrollbartrackbarsize);
		}

		if (!vscrollbar._is_created_contents) {
			vscrollbar.set_direction("vertical");
			vscrollbar._setEventHandler("onscroll", this.on_notify_vscroll_onscroll, this);
			vscrollbar.createComponent(true);
		}

		vscrollbar.on_apply_cssclass();

		vscrollbar.move(0, 0, scroll_size, this._getClientWidth(), null, null);
	};

	_pComponent._createHScrollBar = function (scroll_size) {
		var hscrollbar;
		var hscrollbartype = this._getHScrollBarType();

		if (hscrollbartype == "autoindicator" || hscrollbartype == "indicator") {
			if (this.hscrollbar && (this.hscrollbar.id != this._hscrollindicator_id)) {
				this.hscrollbar.destroy();
				this.hscrollbar = null;
			}

			if (!this.hscrollbar) {
				this.hscrollbar = new nexacro.ScrollIndicatorControl(this._hscrollindicator_id, 0, 0, this._getClientHeight(), scroll_size, null, null, null, null, null, null, this);
			}
		}
		else {
			if (this.hscrollbar && (this.hscrollbar.id != this._hscrollbar_id)) {
				this.hscrollbar.destroy();
				this.hscrollbar = null;
			}

			if (!this.hscrollbar) {
				this.hscrollbar = new nexacro.ScrollBarControl(this._hscrollbar_id, 0, 0, this._getClientHeight(), scroll_size, null, null, null, null, null, null, this);
			}
		}

		hscrollbar = this.hscrollbar;

		if (!nexacro._isNull(this.scrollbarbaroutsize)) {
			hscrollbar.set_baroutsize(this.scrollbarbaroutsize);
		}
		if (!nexacro._isNull(this.scrollbarincbuttonsize)) {
			hscrollbar.set_incbuttonsize(this.scrollbarincbuttonsize);
		}
		if (!nexacro._isNull(this.scrollbardecbuttonsize)) {
			hscrollbar.set_decbuttonsize(this.scrollbardecbuttonsize);
		}
		if (!nexacro._isNull(this.scrollbarbarminsize)) {
			hscrollbar.set_barminsize(this.scrollbarbarminsize);
		}
		if (!nexacro._isNull(this.scrollbartrackbarsize)) {
			hscrollbar.set_trackbarsize(this.scrollbartrackbarsize);
		}

		if (!hscrollbar._is_created_contents) {
			hscrollbar.set_direction("horizontal");
			hscrollbar._setEventHandler("onscroll", this.on_notify_hscroll_onscroll, this);
			hscrollbar.createComponent(true);
		}

		hscrollbar.on_apply_cssclass();

		hscrollbar.move(0, 0, this._getClientHeight(), scroll_size, null, null);
	};

	_pComponent._registerHotkey = function () {
		var hotkey = this._hotkey;
		if (!hotkey || hotkey._is_registered) {
			return;
		}

		this._setAccessibilityHotKey(this.hotkey);

		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._registerHotkeyComp(owner_frame, this, hotkey);
			}
		}
		else {
			if (_form) {
				nexacro._registerHotkeyComp(_form, this, hotkey);
			}
		}
	};

	_pComponent._unregisterHotkey = function () {
		var hotkey = this._hotkey;
		if (!hotkey || !hotkey._is_registered) {
			return;
		}
		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._unregisterHotkeyComp(owner_frame, this, hotkey);
			}
		}
		else {
			if (_form) {
				nexacro._unregisterHotkeyComp(_form, this, hotkey);
			}
			else {
				delete this._hotkey;
				this._hotkey = null;
			}
		}
	};

	_pComponent._processHotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		var _form = this._getMainForm();
		if (!this._is_frame && this != _form) {
			if (_form) {
				return _form._processHotkey(keycode, altKey, ctrlKey, shiftKey, this);
			}
		}
	};

	_pComponent._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.setFocus();
	};

	_pComponent._destroy = function (callremovechild) {
		return this.destroy(callremovechild);
	};

	_pComponent._applyScrollPos = function () {
		var child_list;
		var comp;
		var i;
		if (this.form) {
			child_list = this.form._child_list;
		}
		else {
			child_list = this._child_list;
		}

		if (child_list != null) {
			for (i = 0; i < child_list.length; i++) {
				comp = child_list[i];
				comp._applyScrollPos();
			}
		}
		if ((this._is_scrollable && this._use_container_move) || this._applyMultiContainerScrollPos) {
			if (this._applyMultiContainerScrollPos) {
				this._applyMultiContainerScrollPos();
			}
			else {
				if (this._control_element) {
					this._control_element._reset_scrollpos = true;

					this._control_element.setElementHScrollPos(this._control_element.scroll_left);
					this._control_element.setElementVScrollPos(this._control_element.scroll_top);
					this._control_element._reset_scrollpos = false;
				}
			}
		}
	};
	_pComponent._makeExprFn = function (expr) {
		expr = expr.trim().split(":");
		var len = expr.length;
		var parser = new nexacro.ExprParser();
		var conv_expr, exprfn;
		var str;

		if (len == 1) {
			str = expr[0];
		}
		else {
			if (expr[0].trim().toUpperCase() != "EXPR") {
				str = expr.join(":");
			}
			else {
				str = expr.slice(1).join(":");
			}
		}

		conv_expr = parser.makeExpr(this, str);
		exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);
		return exprfn;
	};

	_pComponent._closePopup = function () {
		var popup = this._popupcontrol;
		if (popup) {
			popup._closePopup();
		}
	};

	_pComponent._on_beforerepeat = function () {
		return [true, false];
	};

	_pComponent.getElement = function () {
		return this._control_element;
	};

	_pComponent._getOwnerFrame = function () {
		var form = this;
		while (form && !form._is_frame) {
			form = form.parent;
		}
		return form;
	};

	_pComponent._getWindow = function () {
		var parent = this.parent;
		if (parent) {
			return parent._getWindow();
		}

		var form = this._refform;
		if (form && form != this) {
			return form._getWindow();
		}

		return nexacro._findWindow(nexacro._getMainWindowHandle());
	};

	_pComponent._getRootWindow = function () {
		var _window = this._getWindow();
		while (_window) {
			if (_window.frame) {
				return _window;
			}

			_window = _window.parent;
		}

		return this._getWindow();
	};

	_pComponent._getWindowHandle = function () {
		var _window = this._getWindow();
		if (_window) {
			return _window.handle;
		}
		return null;
	};

	_pComponent._getForm = function () {
		return this._refform;
	};

	_pComponent._getRootForm = function () {
		var form = this._refform;
		while ((form && form._is_form == false) || (form && form._is_form && (form instanceof nexacro._InnerForm))) {
			form = form.parent;
		}

		return form;
	};

	_pComponent._getMainForm = function () {
		var comp = this;
		while (comp) {
			if (comp._is_frame) {
				return comp.form;
			}
			if (!comp._is_form && comp._refform) {
				comp = comp._refform;
			}
			else if (comp.parent) {
				comp = comp.parent;
			}
			else {
				if (comp._is_form) {
					return comp;
				}
				return null;
			}
		}

		return null;
	};

	_pComponent._getParentForm = function () {
		var p = this.parent;
		if (!p) {
			return null;
		}

		while (p) {
			if (p._is_form && !p._is_frame) {
				return p;
			}
			p = p.parent;
		}
		return null;
	};

	_pComponent._getLastFocused = function () {
		return this._last_focused;
	};

	_pComponent._getRefFormBaseUrl = function () {
		if (this._refform) {
			return this._refform._getFormBaseUrl();
		}
	};

	_pComponent._getFormChildById = function (id) {
		var form = this._getForm();
		if (form) {
			return form[id];
		}

		return null;
	};

	_pComponent._getRootComponent = function (component) {
		var comp = component;
		while (comp && (comp._is_subcontrol || !comp._is_component || comp instanceof nexacro._InnerForm)) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}

		return comp;
	};

	_pComponent._getPopupRootComponent = function (component) {
		var comp = component;
		while (comp && (comp._is_subcontrol || !comp._is_component || comp instanceof nexacro._InnerForm) && !comp._popupcontrol) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}

		return comp;
	};

	_pComponent._getEventInfoComponent = function () {
		return this;
	};

	_pComponent._getFocusAcceptableComponent = function (component) {
		var comp = component;
		while (comp && comp._is_subcontrol && !comp._is_focus_accept) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}
		return comp;
	};

	_pComponent._getReferenceContext = function () {
		return this._refform;
	};

	_pComponent._getCSSStyleValue = function (prop, status, userstatus) {
		if (status === undefined) {
			status = this._status;
		}
		if (userstatus === undefined) {
			userstatus = this._userstatus;
		}

		var multistatus = "";
		if (status != "enabled" && status && userstatus) {
			multistatus = status + "_" + userstatus;
		}

		if (!this._cssselector) {
			return;
		}

		var bRtl = this._isRtl();
		var rtlprop = (prop == "icon" ? "rtlIcon" : prop);

		var cssselector;
		if (multistatus && this._cssselector[multistatus]) {
			cssselector = this._cssselector[multistatus];
			if (cssselector && cssselector[prop]) {
				if (bRtl && prop == "icon" && cssselector[rtlprop]) {
					return cssselector[rtlprop];
				}
				else {
					return cssselector[prop];
				}
			}
		}

		var value;
		var rtlvalue;
		var disabled_status = false;
		if (status === "disabled" && this._cssselector[status]) {
			disabled_status = true;
			value = this._cssselector[status][prop];
			rtlvalue = this._cssselector[status][rtlprop];

			if (value) {
				if (bRtl && rtlvalue) {
					return rtlvalue;
				}
				else {
					return value;
				}
			}
		}

		if (userstatus && this._cssselector[userstatus]) {
			value = this._cssselector[userstatus][prop];
			rtlvalue = this._cssselector[userstatus][rtlprop];


			if (value) {
				if (bRtl && rtlvalue) {
					return rtlvalue;
				}
				else {
					return value;
				}
			}
		}
		if (!disabled_status && this._cssselector[status]) {
			value = this._cssselector[status][prop];
			rtlvalue = this._cssselector[status][rtlprop];

			if (value) {
				if (bRtl && rtlvalue) {
					return rtlvalue;
				}
				else {
					return value;
				}
			}
		}

		value = this._cssselector["enabled"][prop];
		rtlvalue = this._cssselector["enabled"][rtlprop];

		if (value && bRtl && rtlvalue) {
			return rtlvalue;
		}
		else {
			return value;
		}
	};

	_pComponent._getCurrentStyleInheritValue = function (prop, status, userstatus) {
		if (this[prop]) {
			switch (prop) {
				case "font":
					return this._getSettedFontObject();
				case "color":
					return this._getSettedColorObject();
				case "wordSpacing":
					return this._getSettedWordSpacingObject();
				case "letterSpacing":
					return this._getSettedLetterSpacingObject();
				default:
					return this["_" + prop];
			}
		}

		var value = this._getCSSStyleValue(prop, status, userstatus);
		if (!value && (prop == "font" || prop == "color" || prop == "wordSpacing" || prop == "letterSpacing")) {
			if (this.parent && this.parent._is_component) {
				value = this.parent._getCurrentStyleInheritValue(prop, status, userstatus);
			}
			else {
				if (prop == "font") {
					value = nexacro._getSystemFont();
				}
			}
		}

		return value;
	};

	_pComponent._getCSSSelector = function () {
		return this._cssselector;
	};

	_pComponent._getClassCSSSelector = function () {
		var cssclassselector = this.cssclass || this._cssclass_expr;

		if (cssclassselector) {
			return cssclassselector.trim().split(",");
		}
		return "";
	};

	_pComponent._getElementClassCSSSelector = function () {
		var cssclassselector = this.cssclass || this._cssclass_expr;

		if (this._isPopupContains()) {
			cssclassselector = this._getPopupContainerCSSSelector();
		}

		if (cssclassselector) {
			return cssclassselector.trim().split(",");
		}
		return "";
	};

	_pComponent._getIDCSSSelector = function () {
		if (this._is_subcontrol) {
			return this.on_getIDCSSSelector();
		}

		return "";
	};



	_pComponent._getPopupContainerCSSSelector = function () {
		var popupcontrol = this.parent._getPopupControl();
		if (popupcontrol) {
			var i, len;
			var cssselector_str = "";
			var popupcomp_type_name = "popup" + popupcontrol.on_get_popupControlTypeName();
			var dummystr = "dummy";

			var parentid = "", subidselector = "";
			var parent = this.parent;

			var dummycount = 1;
			var userclassselectors, userclassdummy;
			var parentidselector;
			var userclassselector_str;

			while (parent) {
				if (parent._is_subcontrol) {
					cssselector_str += "popup" + parent.on_get_css_assumedtypename() + parentid + this.on_getIDCSSSelector() + ",";
				}
				else {
					if (!userclassselectors) {
						cssselector_str += popupcomp_type_name + parentid + this.on_getIDCSSSelector() + ",";
					}
					break;
				}

				subidselector = parentid + this.on_getIDCSSSelector();
				parentidselector = parent.on_getIDCSSSelector();
				parentid = parentidselector + parentid;

				if (userclassselectors || parent.cssclass) {
					if (!userclassselectors) {
						userclassselectors = [];
						userclassdummy = [];
					}

					if (userclassselectors.length == 0) {
						userclassselectors.push(parentidselector + subidselector);
						if (parent.cssclass) {
							userclassselectors.push(parentidselector + parent.cssclass + subidselector);
						}
						userclassdummy.push(2);
					}
					else {
						var tempuserclassselectors = [];
						while (userclassselectors.length != 0) {
							userclassselector_str = userclassselectors.pop();
							tempuserclassselectors.push(parentidselector + userclassselector_str);
							if (parent.cssclass) {
								tempuserclassselectors.push(parentidselector + parent.cssclass + userclassselector_str);
							}
						}


						len = userclassdummy.length;
						for (i = 0; i < len; i++) {
							var classdummycnt = userclassdummy[i];
							userclassdummy[i] = classdummycnt + 1;
						}
						if (parent.cssclass) {
							userclassdummy.push(2);
						}
						userclassselectors = tempuserclassselectors;
					}
				}
				dummycount++;

				parent = parent.parent;
			}

			if (userclassselectors && userclassselectors.length > 0) {
				while (userclassselectors.length > 0) {
					userclassselector_str = userclassselectors.pop();
					cssselector_str += "," + popupcomp_type_name + userclassselector_str;
					if (parent.cssclass) {
						cssselector_str += "," + popupcomp_type_name + parent.cssclass + userclassselector_str;
					}
				}

				if (parent.cssclass) {
					dummycount++;
				}

				len = userclassdummy.length;
				for (i = 0; i < len; i++) {
					dummycount += userclassdummy[i];
				}
			}
			else if (parent.cssclass) {
				cssselector_str += popupcomp_type_name + parent.cssclass + parentid + this.on_getIDCSSSelector();
				dummycount++;
			}

			for (i = 0; i < dummycount; i++) {
				cssselector_str += "," + dummystr;
			}



			return cssselector_str;
		}
	};

	_pComponent._getScreenPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var elem_pos = nexacro._getElementScreenPosition(control_elem);

			var screenLeft = elem_pos.x;
			var screenTop = elem_pos.y;
			return {
				x : screenLeft, 
				y : screenTop
			};
		}
		return {
			x : 0, 
			y : 0
		};
	};

	_pComponent._getWindowPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var border = this._getCurrentStyleBorder();
			var elem_pos = nexacro._getElementXYInWindow(control_elem.handle);
			var windowLeft = elem_pos[0] - (border ? border._getBorderLeftWidth() : 0);
			var windowTop = elem_pos[1] - (border ? border._getBorderTopWidth() : 0);
			return {
				x : windowLeft, 
				y : windowTop
			};
		}
		return {
			x : 0, 
			y : 0
		};
	};

	_pComponent._getClientWidth = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getClientWidth();
		}
		return 0;
	};

	_pComponent._getClientHeight = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getClientHeight();
		}
		return 0;
	};

	_pComponent._getClientLeft = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getClientLeft();
		}
		return 0;
	};

	_pComponent._getInnerWidth = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var width = control_elem.inner_width;
			if (control_elem._apply_client_padding) {
				var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;
				if (padding) {
					width -= padding.left + padding.right;
				}
			}

			return width;
		}

		return 0;
	};

	_pComponent._getInnerHeight = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var height = control_elem.inner_height;
			if (control_elem._apply_client_padding) {
				var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;
				if (padding) {
					height -= padding.top + padding.bottom;
				}
			}

			return height;
		}
		return 0;
	};

	_pComponent._getClientTop = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getClientTop();
		}
		return 0;
	};

	_pComponent._getCumulativeZoomFactor = function () {
		var comp = this;
		var zoomfactor = 100;
		while (comp && !(comp instanceof nexacro.Frame)) {
			if (comp._getZoom) {
				var value = comp._getZoom();
				if (value != 100) {
					zoomfactor *= (value / 100.0);
				}
			}
			comp = comp.parent;
		}

		return zoomfactor;
	};

	_pComponent._getFixedOffsetValue = function () {
		var r, b, val;

		if (this.right != null) {
			r = 0;
		}
		else if (this.width != null) {
			val = this.width;
			if (typeof (val) == "string" && val.indexOf("%") >= 0) {
				if (parseFloat(val) <= 100) {
					r = 0;
				}
				else {
					r = this.getOffsetRight();
				}
			}
			else {
				r = this.getOffsetRight();
			}
		}

		if (this.bottom != null) {
			b = 0;
		}
		else if (this.height != null) {
			val = this.height;
			if (typeof (val) == "string" && val.indexOf("%") >= 0) {
				if (parseFloat(val) <= 100) {
					b = 0;
				}
				else {
					b = this.getOffsetBottom();
				}
			}
			else {
				b = this.getOffsetBottom();
			}
		}

		return {
			right : r, 
			bottom : b
		};
	};

	_pComponent._getScrollEventType = function (oldpos, newpos, min, max, dir) {
		var type;

		if (min == max) {
			return type;
		}

		if (oldpos > newpos && newpos > min) {
			if (dir == "h") {
				type = "left";
			}
			else {
				type = "up";
			}
		}
		else if (oldpos < newpos && newpos < max) {
			if (dir == "h") {
				type = "right";
			}
			else {
				type = "down";
			}
		}
		else if (newpos == min) {
			if (oldpos == newpos) {
				type = "firstover";
			}
			else {
				type = "first";
			}
		}
		else if (newpos == max) {
			if (oldpos == newpos) {
				type = "lastover";
			}
			else {
				type = "last";
			}
		}

		return type;
	};

	_pComponent._getScrollBarSize = function () {
		var scrollbarsize = this.scrollbarsize;

		if (!nexacro._isNull(scrollbarsize)) {
			return scrollbarsize;
		}

		var env = nexacro.getEnvironment();
		scrollbarsize = env.scrollbarsize;

		if (!nexacro._isNull(scrollbarsize)) {
			return scrollbarsize;
		}

		return this._default_scrollbarsize;
	};

	_pComponent._getScrollIndicatorSize = function () {
		var scrollindicatorsize = this.scrollindicatorsize;

		if (!nexacro._isNull(scrollindicatorsize)) {
			return scrollindicatorsize;
		}

		var env = nexacro.getEnvironment();
		scrollindicatorsize = env.scrollindicatorsize;

		if (!nexacro._isNull(scrollindicatorsize)) {
			return scrollindicatorsize;
		}

		return this._default_scrollindicatorsize;
	};

	_pComponent._getHScrollBarSize = function () {
		var scrollbartype = this._getHScrollBarType();
		if (scrollbartype == "autoindicator" || scrollbartype == "indicator") {
			return this._getScrollIndicatorSize();
		}
		else {
			return this._getScrollBarSize();
		}
	};

	_pComponent._getVScrollBarSize = function () {
		var scrollbartype = this._getVScrollBarType();
		if (scrollbartype == "autoindicator" || scrollbartype == "indicator") {
			return this._getScrollIndicatorSize();
		}
		else {
			return this._getScrollBarSize();
		}
	};

	_pComponent._getHScrollBarType = function () {
		var hscrollbartype = this._hscrollbartype;
		if (hscrollbartype != "" && !nexacro._isNull(hscrollbartype)) {
			return hscrollbartype;
		}
		var scrollbartype = this.scrollbartype;
		var env = nexacro.getEnvironment();

		function _splitScrollBarType (str) {
			var ret = new Array(2);
			var h, v;

			if (scrollbartype) {
				var arr = nexacro._toString(scrollbartype).toLowerCase().split(" ");

				for (var i = 0; i < arr.length; i++) {
					switch (arr[i]) {
						case "none":
						case "auto":
						case "fixed":
						case "autoindicator":
						case "indicator":
						case "default":
							if (i == 0) {
								h = arr[i];
							}
							else if (i == 1) {
								v = arr[i];
							}
							break;
						default:
							break;
					}
				}

				if (!v) {
					v = h;
				}

				ret[0] = h;
				ret[1] = v;
			}

			return ret;
		}

		var types = _splitScrollBarType(scrollbartype);

		hscrollbartype = types[0];

		if (!hscrollbartype || hscrollbartype == "default") {
			if (env) {
				scrollbartype = env.scrollbartype;
			}

			if (scrollbartype == "" || nexacro._isNull(scrollbartype)) {
				scrollbartype = this._default_scrollbartype;
			}

			types = _splitScrollBarType(scrollbartype);

			hscrollbartype = types[0];
		}

		return hscrollbartype;
	};

	_pComponent._getVScrollBarType = function () {
		var vscrollbartype = this._vscrollbartype;
		if (vscrollbartype != "" && !nexacro._isNull(vscrollbartype)) {
			return vscrollbartype;
		}

		var scrollbartype = this.scrollbartype;
		var env = nexacro.getEnvironment();

		function _splitScrollBarType (str) {
			var ret = new Array(2);
			var h, v;

			if (scrollbartype) {
				var arr = nexacro._toString(scrollbartype).toLowerCase().split(" ");

				for (var i = 0; i < arr.length; i++) {
					switch (arr[i]) {
						case "none":
						case "auto":
						case "fixed":
						case "autoindicator":
						case "indicator":
						case "default":
							if (i == 0) {
								h = arr[i];
							}
							else if (i == 1) {
								v = arr[i];
							}
							break;
						default:
							break;
					}
				}

				if (!v) {
					v = h;
				}

				ret[0] = h;
				ret[1] = v;
			}

			return ret;
		}


		var types = _splitScrollBarType(scrollbartype);

		vscrollbartype = types[1];

		if (!vscrollbartype || vscrollbartype == "default") {
			if (env) {
				scrollbartype = env.scrollbartype;
			}

			if (scrollbartype == "" || nexacro._isNull(scrollbartype)) {
				scrollbartype = this._default_scrollbartype;
			}

			types = _splitScrollBarType(scrollbartype);

			vscrollbartype = types[1];
		}

		return vscrollbartype;
	};

	_pComponent._getScrollable = function () {
		if (!this._is_scrollable || !this._isEnable()) {
			return false;
		}
		if (this.scrolltype != "none") {
			return true;
		}

		return false;
	};

	_pComponent._getScrollWidth = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			if (this._is_scrollable) {
				return this._getClientWidth();
			}

			return control_elem.getElementScrollWidth();
		}
		return 0;
	};

	_pComponent._getScrollHeight = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			if (this._is_scrollable) {
				return this._getClientHeight();
			}

			return control_elem.getElementScrollHeight();
		}
		return 0;
	};

	_pComponent._getScrollLeft = function () {
		if (!this._is_scrollable) {
			return 0;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getElementScrollLeft();
		}
		return 0;
	};

	_pComponent._getScrollTop = function () {
		if (!this._is_scrollable) {
			return 0;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.getElementScrollTop();
		}
		return 0;
	};

	_pComponent._getDragData = function () {
		var ret = null;

		if (this.text) {
			ret = this.text;
		}

		return ret;
	};

	_pComponent._getParentEnable = function () {
		return this.parent._real_enable;
	};

	_pComponent._getPopupControl = function () {
		return this._popupcontrol;
	};

	_pComponent._is_popup = function () {
		return false;
	};

	_pComponent._getLocale = function () {
		if (!this._is_locale_control) {
			return;
		}

		var locale = nexacro._locale ? nexacro._locale : nexacro._getLocale();
		var pThis = this;

		while (pThis) {
			if (pThis._locale) {
				locale = pThis._locale;
				break;
			}
			pThis = pThis.parent;
		}

		return locale;
	};

	_pComponent._isRtl = function (comp) {
		if (!comp) {
			comp = this;
		}


		while (comp) {
			if (comp._rtl !== undefined) {
				return comp._rtl;
			}
			comp = comp.parent;
		}

		return nexacro._rtl;
	};
	_pComponent._getCurrentStylePadding = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.padding ? control_elem.padding : control_elem._padding_info;
		}
		return undefined;
	};

	_pComponent._getCurrentStyleBorder = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var border = control_elem.border ? control_elem.border : control_elem._border_info;
			if (control_elem.borderLeftNone || control_elem.borderRightNone || control_elem.borderTopNone || control_elem.borderBottomNone) {
				if (border) {
					var values = [border.top.value, border.right.value, border.bottom.value, border.left.value];

					if (control_elem.borderLeftNone) {
						values[3] = "0px solid transparent";
					}
					if (control_elem.borderRightNone) {
						values[1] = "0px solid transparent";
					}
					if (control_elem.borderTopNone) {
						values[0] = "0px solid transparent";
					}
					if (control_elem.borderBottomNone) {
						values[2] = "0px solid transparent";
					}

					values = values.join(",");
					return nexacro.BorderObject(values);
				}
			}
			return border;
		}
		return undefined;
	};

	_pComponent._getCurrentStyleEdge = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.edge ? control_elem.edge : control_elem._edge_info;
		}
		return undefined;
	};

	_pComponent._getSettedColorObject = function () {
		return this._color;
	};

	_pComponent._getSettedFontObject = function () {
		return this._font;
	};

	_pComponent._getSettedWordSpacingObject = function () {
		return this._wordspacing;
	};

	_pComponent._getSettedLetterSpacingObject = function () {
		return this._letterspacing;
	};

	_pComponent._getSettedTextDecorationObject = function () {
		return this._textdecoration;
	};

	_pComponent._getSettedBorderRadiustObject = function () {
		return this._borderradius;
	};

	_pComponent._getSettedBorderObject = function () {
		return this._border;
	};

	_pComponent._getSettedBackgroundObject = function () {
		return this._background;
	};

	_pComponent._getSettedEdgeObject = function () {
		return this._edge;
	};

	_pComponent._getSettedCursorObject = function () {
		return this._cursor;
	};

	_pComponent._getSettedOpacityObject = function () {
		return this._opacity;
	};

	_pComponent._getSettedBoxShadowObject = function () {
		return this._boxshadow;
	};

	_pComponent._isVisible = function () {
		var form = this;
		while (form != null) {
			if (form.visible == false) {
				return false;
			}
			if (form._is_window) {
				break;
			}

			form = form.parent;
		}
		return true;
	};

	_pComponent._isEnable = function () {
		var form = this;
		while (form != null) {
			if (form._is_frame && form._is_popup_frame) {
				break;
			}

			if (form._real_enable == false || form.enable == false) {
				return false;
			}

			form = form.parent;
		}
		return true;
	};

	_pComponent._isEnableRedraw = function () {
		var comp = this._getFromComponent(this);

		if (!comp) {
			return true;
		}

		return comp.enableredraw;
	};

	_pComponent._isEditableComponent = function (edittype) {
		if (this.readonly !== undefined) {
			if (edittype && edittype.match(this._type_name)) {
				if (this._type_name == "Edit") {
					var obj = edittype.split(",");
					for (var i = 0; i < obj.length; i++) {
						if (obj[i].trim() == this._type_name) {
							return true;
						}
					}
				}
				else {
					return true;
				}
			}
			else if (edittype === undefined || edittype == "" || edittype == "All") {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	};

	_pComponent._isFocusAcceptable = function () {
		return this._is_focus_accept;
	};

	_pComponent._isPopupVisible = function () {
		return false;
	};

	_pComponent._isPopupContains = function () {
		return this._is_popupcontains ? this._is_popupcontains : false;
	};

	_pComponent._isWheelScrollable = function (delta) {
		var control_elem = this._control_element;
		if (!control_elem) {
			return false;
		}

		var st = control_elem.scroll_top;
		var sh = control_elem.container_maxheight;
		var ch = this._getClientHeight();

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}
		return true;
	};


	_pComponent._findForm = function (comp) {
		var form = comp;
		while (form && form._is_form == false) {
			form = form.parent;
		}
		return form;
	};

	_pComponent._findDataset = function (id) {
		if (id && id.length > 0) {
			var ds = this[id];

			if (ds && (ds._type_name == "Dataset")) {
				return ds;
			}

			if (this._refform) {
				var refform = this._refform;
				if (refform.parent && refform.parent._is_view) {
					if (refform.parent.viewdataset == id) {
						return refform.parent.getViewDataset();
					}
					else {
						ds = refform[id];
					}
				}
				else {
					ds = refform[id];
				}

				if (ds && (ds._type_name == "Dataset")) {
					return ds;
				}

				var _p = refform.opener || refform.parent;
				if (_p && _p._findDataset) {
					return _p._findDataset(id);
				}
				else if (_p) {
					return _p.lookup(id);
				}
			}
		}

		return undefined;
	};

	_pComponent._find_lastFocused = function () {
		var form = this._getMainForm();
		if (!form) {
			return null;
		}

		var last_focus = form._last_focused;
		while (last_focus && last_focus._hasContainer()) {
			var child_last_focus = last_focus._getLastFocused();
			if (!child_last_focus) {
				break;
			}
			last_focus = child_last_focus;
		}

		return last_focus;
	};

	_pComponent._hasContainer = function () {
		if (this._is_form || this._is_container || this._is_containerset) {
			return true;
		}

		return false;
	};

	_pComponent._contains = function (oDescendant) {
		while (oDescendant && !oDescendant._window) {
			if (oDescendant == this) {
				return true;
			}
			oDescendant = oDescendant.parent;
		}

		return false;
	};

	_pComponent._setControl = function (typename) {
		this._is_subcontrol = true;
		if (typename) {
			this._type_name = typename;
		}
		else {
			this._type_name = this.on_get_css_assumedtypename() + "Control";
		}
	};

	_pComponent._setFocus = function (bResetScroll, calledby, block_inner_focus) {
		var win = this._getRootWindow();
		var is_active_layer = win._isActiveLayerComponent(this);
		if (!is_active_layer) {
			return;
		}

		if (calledby > -1 || calledby < 4) {
			this._focus_direction = calledby;
		}
		else {
			this._focus_direction = -1;
		}

		if (block_inner_focus == true) {
			this._block_inner_focus = true;

			if (nexacro._enableaccessibility) {
				var bInnerFocus = (this._is_container || this instanceof nexacro.Tab) && this._focus_direction == 3 ? false : true;
				this.setFocus(bResetScroll, bInnerFocus);
			}
			else {
				this.setFocus(bResetScroll);
			}

			this._block_inner_focus = false;
		}
		else {
			return this.setFocus(bResetScroll);
		}
	};

	_pComponent._setHscrollPos = function (v) {
		this._hscroll_pos = nexacro._toInt(v);
	};

	_pComponent._setVscrollPos = function (v) {
		this._vscroll_pos = nexacro._toInt(v);
	};

	_pComponent._setEnable = function (v) {
		if (this._is_enable_changing) {
			return false;
		}

		var enable_flag = (v && this.enable);
		if (this._real_enable != enable_flag) {
			this._real_enable = enable_flag;

			this._is_enable_changing = true;
			this._changeStatus("disabled", !enable_flag);
			this._is_enable_changing = false;

			this.on_apply_prop_enable(this._real_enable);

			return true;
		}
		return false;
	};

	_pComponent._setLocale = function (v) {
		if (!this.locale && v != this._locale) {
			this._locale = v;
			this.on_apply_locale(v);
		}
	};

	_pComponent._setPopupContains = function (is_popupcontains) {
		this._is_popupcontains = is_popupcontains;
	};

	_pComponent._setInheritStyleValues = function (parent_comp) {
		if (this._control_element) {
			if (parent_comp) {
				this._control_element.setElementFont(parent_comp._getCurrentStyleInheritValue("font"));
				this._control_element.setElementColor(parent_comp._getCurrentStyleInheritValue("color"));
				this._control_element.setElementWordSpacing(parent_comp._getCurrentStyleInheritValue("wordSpacing"));
				this._control_element.setElementLetterSpacing(parent_comp._getCurrentStyleInheritValue("letterSpacing"));
			}
		}
	};

	_pComponent._checkContainerTabFocus = function () {
		if (this._hasContainer() && !(this instanceof nexacro._InnerForm)) {
			return true;
		}

		return false;
	};

	_pComponent._checkContainerHeadingFocus = function () {
		if (this._hasContainer() && nexacro._enableaccessibility && this._isAccessibilityEnable() == true && this._isAccessibilityRoleHeading()) {
			return true;
		}

		return false;
	};

	_pComponent._isInvalidValue = function (v) {
		return false;
	};

	_pComponent._convertValueType = function (v, type, fn) {
		var datatyperule = nexacro._getDatatypeRule();
		if (datatyperule == "1.0") {
			return v;
		}

		if (nexacro._isNull(v)) {
			return v;
		}

		if (fn && (typeof fn) == "function") {
			return fn(v);
		}

		var ret;
		switch (type) {
			case 1:
				ret = parseInt(v);
				break;
			case 2:
				ret = parseFloat(v);
				break;
			default:
				ret = nexacro._toString(v);
				break;
		}

		return ret;
	};

	nexacro.PopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pPopupControl = nexacro.PopupControl.prototype = nexacro._createPrototype(nexacro.Component, nexacro.PopupControl);
	_pPopupControl._type_name = "PopupControl";


	_pPopupControl._attached_comp = null;
	_pPopupControl._call_comp = null;


	_pPopupControl.visible = false;


	_pPopupControl._is_window = true;
	_pPopupControl._is_subcontrol = true;
	_pPopupControl._is_popup_control = true;
	_pPopupControl._is_simple_control = true;
	_pPopupControl._is_selfclose = true;

	_pPopupControl._default_zindex = nexacro._zindex_popup;
	_pPopupControl._track_capture = true;


	_pPopupControl.on_create_control_element = function (parent_elem) {
		var control_elem = this.on_create_popup_control_element(parent_elem);
		if (control_elem && this._default_zindex > 0) {
			control_elem.setElementZIndex(this._default_zindex);
		}
		return control_elem;
	};

	_pPopupControl.on_created = function (_window) {
		if (!this._is_created) {
			nexacro.Component.prototype.on_created.call(this, _window);
		}

		var control_elem = this._control_element;
		if (!this.visible && control_elem) {
			control_elem.setElementPosition(0, 0);
			control_elem.setElementSize(1, 1);
		}
	};

	_pPopupControl.on_created_contents = function (win) {
		var control_elem = this._control_element;
		if (!this.visible && control_elem) {
			control_elem.setElementPosition(0, 0);
			control_elem.setElementSize(1, 1);

			this._setInheritStyleValues(this);
		}
	};

	_pPopupControl.destroyComponent = function () {
		this._is_alive = false;

		if (this.visible) {
			nexacro._removePopupComponent(this);
			this.visible = false;
		}

		if (nexacro._enableaccessibility) {
			var application = nexacro.getApplication();
			if (application && application._accessibilityHistoryList && !this._is_subcontrol) {
				application._remove_accessibility_history(this);
			}
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
			_window._releaseCaptureLock(this._attached_comp);
			this._track_capture = false;
		}

		if (this._attached_comp) {
			this._detach(this._attached_comp);
		}
		this._call_comp = null;

		if (this.parent && this.parent.removeChild) {
			this.parent.removeChild(this.id);
		}
		else if (_window) {
			_window._removeFromCurrentFocusPath(this);
		}

		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}
		this._clearEventListeners();
		this.on_destroy_contents();

		this._is_created = false;

		if (this.parent) {
			this.parent = null;
		}

		return true;
	};

	_pPopupControl.on_change_containerRect = function (container_width, container_height) {
		var comp = this._attached_comp;
		if (comp && comp != this) {
			if (!this._is_created || this.visible) {
				comp.move(0, 0, container_width, container_height);
			}
		}
	};

	_pPopupControl._contains = function (oDescendant) {
		while (oDescendant) {
			if (oDescendant == this._attached_comp) {
				return true;
			}
			oDescendant = oDescendant.parent;
		}
		return false;
	};

	_pPopupControl.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		if (this.visible != v) {
			this.visible = v;

			var control_elem = this._control_element;
			if (!control_elem) {
				return;
			}

			var comp = this._attached_comp;
			var _window = this._getWindow();

			v = nexacro._toBoolean(v);

			control_elem.setElementVisible(v);

			if (this.visible) {
				if (comp && comp != this) {
					comp.move(this._adjust_left, this._adjust_top, this._getClientWidth(), this._getClientHeight());
				}

				if (!this._is_subcontrol) {
					this._call_comp = this.parent._last_focused ? this.parent._last_focused : this.parent;
				}
			}
			else {
				control_elem.setElementPosition(-5000, 0);
			}

			if (nexacro._enableaccessibility) {
				this._setAccessibilityStatHidden(!v);

				if (comp) {
					comp._setAccessibilityStatExpanded(v);
					comp._setAccessibilityStatHidden(!v);
				}
			}

			if (this._is_selfclose) {
				if (!v) {
					if (comp && comp.on_fire_oncloseup) {
						comp.on_fire_oncloseup(comp);
					}

					nexacro._removePopupComponent(this);
					_window._removeFromCurrentFocusPath(this, false);

					if (!this._is_subcontrol) {
						this._call_comp._on_focus(true);
					}
				}
				else {
					nexacro._appendPopupComponent(this);

					control_elem.setElementZIndex(nexacro._zindex_popup + nexacro._current_popups.length - 1);
				}
			}
		}
	};

	_pPopupControl._attach = function (comp) {
		this._attached_comp = comp;
		if (!comp._isPopupContains()) {
			comp._setPopupContains(true);
		}
		var contrl_element = this._control_element;
		if (comp && comp != this && comp._control_element && contrl_element) {
			var sub_control_element = comp._control_element;
			if (sub_control_element) {
				var sub_parent = sub_control_element.parent_elem;
				if (comp._is_created && sub_parent != contrl_element) {
					sub_control_element._removeFromContainer();
				}

				sub_control_element.parent_elem = contrl_element;
			}

			if (comp._is_created) {
				sub_control_element._appendToContainer(contrl_element);
			}
		}
	};

	_pPopupControl._detach = function (comp) {
		if (this._attached_comp == comp && comp != this) {
			this._attached_comp = null;
			comp._setPopupContains(false);
			var contrl_element = this._control_element;
			var sub_control_element = comp._control_element;
			if (sub_control_element && contrl_element) {
				if (comp._is_created) {
					sub_control_element._removeFromContainer();
				}
				sub_control_element.parent_elem = null;
			}
		}
	};

	_pPopupControl._is_popup = function () {
		return this.visible;
	};

	_pPopupControl._popup = function (left, top, width, height) {
		if (!this._attached_comp) {
			return;
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			var capture_comp = _window._getCaptureComp(true, false, this._attached_comp);
			if (capture_comp != this._attached_comp) {
				_window._setCaptureLock(this._attached_comp, true, false);
			}
		}

		var control_elem = this._control_element;
		_window = this._getWindow();
		if (_window && (_window._wheelZoom != undefined)) {
			control_elem.setElementZoom(_window._wheelZoom);
			if (_window._wheelZoom != 100) {
				left = left *  nexacro._getDevicePixelRatio(control_elem);
				top = top *  nexacro._getDevicePixelRatio(control_elem);
			}
		}
		if (control_elem) {
			control_elem.setElementPosition(left, top);
			control_elem.setElementSize(width, height);
		}

		this.set_visible(true);
	};

	_pPopupControl._popupBy = function (from_comp, left, top, width, height, center) {
		if (!this._attached_comp || !from_comp) {
			return;
		}
		var p;
		var _window = this._getWindow();
		if (_window) {
			nexacro._flushCommand(_window);

			if (this._track_capture) {
				var capture_comp = _window._getCaptureComp(true, false, this._attached_comp);
				if (capture_comp != this._attached_comp) {
					_window._setCaptureLock(this._attached_comp, true, false);
				}
			}
		}

		if (center) {
			p = nexacro._getElementPositionInFrame(from_comp.getElement());

			left += p.x;
			top += p.y;
		}
		else {
			p = nexacro._getPopupElementPositionInFrame(from_comp.getElement(), left, top, width, height, true);



			left = p.x;
			top = p.y;
		}

		var control_elem = this._control_element;

		if (_window && (_window._wheelZoom != undefined)) {
			control_elem.setElementZoom(_window._wheelZoom);
			if (_window._wheelZoom != 100) {
				left = left *  nexacro._getDevicePixelRatio(from_comp.getElement());
				top = top *  nexacro._getDevicePixelRatio(from_comp.getElement());
			}
		}
		if (control_elem) {
			control_elem.setElementPosition(left, top);
			control_elem.setElementSize(width, height);
		}

		this.set_visible(true);
	};

	_pPopupControl._closePopup = function () {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this._attached_comp);
		}

		this.set_visible(false);
	};


	_pPopupControl._findOwnerElementHandle = function () {
		var frame;
		var ret = {
		};
		ret.owner_handle = null;
		ret.is_append = true;
		ret.ref_handle = null;

		var win = this._getWindow();
		if (win) {
			var layer_info;
			if (this instanceof nexacro._WaitControl) {
				layer_info = {
				};
				layer_info.popup_zindex = nexacro._zindex_waitcursor;
			}
			else {
				layer_info = win._getComponentLayerInfo(this);
			}

			if (layer_info.is_modal) {
				frame = layer_info.frame;
				var overlay_elem = frame._modal_overlay_elem;
				ret.owner_handle = overlay_elem.handle;
				ret.is_append = true;
			}
			else {
				if (layer_info.ref_first_modal_frame) {
					frame = layer_info.ref_first_modal_frame;
					if (win.dest_handle && win.dest_handle._linked_element) {
						ret.owner_handle = win.dest_handle._linked_element.dest_handle;
					}
					else {
						ret.owner_handle = win.dest_handle;
					}

					ret.is_append = false;
					ret.ref_handle = frame._modal_overlay_elem.handle;
				}
				else {
					ret.owner_handle = win.dest_handle;
					if (win.dest_handle._linked_element) {
						ret.ref_handle = win.dest_handle._linked_element.dest_handle;
					}
					ret._is_append = true;
				}
			}
		}

		return ret;
	};

	_pPopupControl._getRootFrame = function () {
		var root_frame;
		var owner_frame = this._getOwnerFrame();
		if (owner_frame) {
			var win = owner_frame._getWindow();
			if (win) {
				root_frame = win.frame;
			}
		}

		return root_frame;
	};

	nexacro._WaitControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this.visible = false;

		this._context_list = [];
		this._is_subcontrol = false;
		this._is_simple_control = true;

		this._img_elem = null;
		this._image_width = 0;
		this._image_height = 0;
	};

	var __pWaitControl = nexacro._WaitControl.prototype = nexacro._createPrototype(nexacro.PopupControl, nexacro._WaitControl);
	__pWaitControl._type_name = "WaitControl";

	__pWaitControl._is_selfclose = false;
	__pWaitControl._default_zindex = nexacro._zindex_waitcursor;
	__pWaitControl._is_focus_accept = false;

	__pWaitControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._img_elem = new nexacro.ImageElement(control_elem);
		}
	};

	__pWaitControl.on_created_contents = function (_window) {
		var control_elem = this.getElement();
		if (control_elem) {
			var img_elem = this._img_elem;
			if (img_elem) {
				img_elem.setElementVisible(true);
				img_elem.create(_window);
			}
		}

		this.on_apply_accessibility();
		this._setAccessibilityStatHidden(true);
	};

	__pWaitControl.on_change_containerRect = function (container_width, container_height) {
		var img_elem = this._img_elem;
		if (img_elem) {
			var left = Math.round((container_width - this._image_width) / 2);
			var top = Math.round((container_height - this._image_height) / 2);

			img_elem.setElementPosition(left, top);
			img_elem.setElementSize(this._image_width, this._image_height);
		}
	};

	__pWaitControl._getAccessibilityLabel = function () {
		return "Wait Cursor";
	};

	__pWaitControl._on_loadimage = function (imgurl, w, h) {
		if (!this._is_alive) {
			return;
		}

		var img_elem = this._img_elem;
		if (img_elem && w > 0 && h > 0) {
			this._image_width = w;
			this._image_height = h;

			var bw = this._adjust_width;
			var bh = this._adjust_height;
			var left = Math.round((bw - w) / 2);
			var top = Math.round((bh - h) / 2);

			img_elem.setElementPosition(left, top);
			img_elem.setElementSize(w, h);

			img_elem.setElementImage(nexacro.UrlObject(imgurl));
		}
	};

	__pWaitControl.setImage = function (imageurl) {
		var img_elem = this._img_elem;
		if (img_elem) {
			var imagesize = nexacro._getImageSize(imageurl, this._on_loadimage, this);
			if (imagesize) {
				this._image_width = imagesize.width;
				this._image_height = imagesize.height;

				var bw = this._adjust_width;
				var bh = this._adjust_height;

				var left = Math.round((bw - imagesize.width) / 2);
				var top = Math.round((bh - imagesize.height) / 2);

				img_elem.setElementPosition(left, top);
				img_elem.setElementSize(imagesize.width, imagesize.height);
				img_elem.setElementImage(nexacro.UrlObject(imageurl));
			}
		}
	};

	__pWaitControl.show = function () {
		if (!this._is_created || !this.parent) {
			return;
		}

		var _window = this._getWindow();
		if (_window) {
			var width, height;

			if (_window.frame) {
				var frame = _window.frame;
				width = frame.getOffsetWidth();
				height = frame.getOffsetHeight();
			}
			else {
				width = _window.getClientWidth();
				height = _window.getClientHeight();
			}

			_window._setCaptureLock(this, true, true);

			this.move(0, 0, width, height);

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementPosition(0, 0);
				control_elem.setElementSize(width, height);
			}

			this.set_visible(true);
		}
	};
	__pWaitControl.hide = function () {
		var _window = this._getWindow();
		if (_window) {
			_window._updateWrapper(false);
			_window._releaseCaptureLock(this);

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementSize(1, 1);
			}
		}

		if (this._is_created && this._is_alive) {
			var form = this.parent;

			while (form) {
				if (form._is_form) {
					break;
				}

				form = form._last_focused;
			}

			this.set_visible(false);

			if (form) {
				var last_focus = form._last_focused;
				if (last_focus) {
					if (form._obj_mousemove && (form._obj_mousemove != last_focus)) {
						last_focus._on_afterHideWaitComp("enabled");
					}
					else {
						last_focus._on_afterHideWaitComp(last_focus._pseudo);
					}
				}
			}
		}
	};

	__pWaitControl._addContext = function (context) {
		if (context) {
			this._context_list.push(context);
		}
	};

	__pWaitControl._removeContext = function (context) {
		if (!context) {
			return;
		}
		var idx = nexacro._indexOf(this._context_list, context);
		if (idx >= 0) {
			this._context_list[idx] = null;
			delete this._context_list[idx];
			this._context_list.splice(idx, 1);
		}
	};

	__pWaitControl.on_fire_onlbuttondown = function () {
		return true;
	};

	__pWaitControl._on_keydown = function (elem, keycode) {
		if (keycode == nexacro.Event.KEY_TAB) {
			elem._event_stop = true;
		}
		else if (keycode == nexacro.Event.KEY_ESC) {
			var context_list = this._context_list;
			var len = context_list.length;
			for (var i = 0; i < len; i++) {
				var context = context_list[i];
				if (context && (context._is_form || context._is_application)) {
					context._stopTransaction();
				}
			}
		}

		return true;
	};


	nexacro.CanvasComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.id = this.name = id || null;

		this.enableevent = false;

		this._apply_client_padding = false;
		this._canvas = null;
		this._drawn = false;

		this._control_element = null;
		this._inner_elem = null;
	};
	var _pCanvasComponent = nexacro._createPrototype(nexacro.Component, nexacro.CanvasComponent);
	nexacro.CanvasComponent.prototype = _pCanvasComponent;
	_pCanvasComponent._type_name = "CanvasComp";

	_pCanvasComponent.on_create_contents = function () {
		var control = this.getElement();
		var tcanvas = new nexacro.CanvasElement(control);
		tcanvas.setElementPosition(0, 0);
		tcanvas.setElementSize(this._getClientWidth(), this._getClientHeight());
		this._canvas = tcanvas;
	};

	_pCanvasComponent.on_created_contents = function (_window) {
		var pCanvas = this._canvas;
		if (pCanvas) {
			pCanvas.create(_window);
		}
		this.ondraw(pCanvas);
	};

	_pCanvasComponent._initInner = function () {
		this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
	};

	_pCanvasComponent.on_destroy_contents = function () {
		if (this._canvas) {
			this._canvas.destroy();
			this._canvas = null;
		}
	};

	_pCanvasComponent.on_change_containerRect = function (width, height) {
		if (this._canvas) {
			this._canvas._moveCanvas(0, 0, width, height);
			this._drawn = false;
			this.ondraw(this._canvas);
		}
	};

	_pCanvasComponent.ondraw = function () {
	};
	_pCanvasComponent.redraw = function () {
		this.ondraw(this._canvas);
	};
}

if (_process) {
	delete _process;
	delete __pPosition9xObj;
	delete __pPosition29xObj;
	delete _pComponent;
	delete _pPopupControl;
	delete __pWaitControl;
	delete _pCanvasComponent;
}
