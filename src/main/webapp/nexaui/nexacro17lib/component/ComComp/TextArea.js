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

if (!nexacro.TextArea) {
	nexacro.TextArea = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._onlydisplay = onlydisplay;

		if (onlydisplay) {
			this._apply_client_padding = true;
			this.readonly = true;
		}
	};

	var _pTextArea = nexacro._createPrototype(nexacro.Component, nexacro.TextArea);
	nexacro.TextArea.prototype = _pTextArea;
	nexacro.TextArea._TAB_CHAR = '\u0009';
	_pTextArea._type_name = "TextArea";


	_pTextArea.acceptstab = false;
	_pTextArea.autoselect = false;
	_pTextArea.autoskip = false;
	_pTextArea.displaynulltext = "";
	_pTextArea.displayinvalidtext = undefined;
	_pTextArea.usesoftkeyboard = true;
	_pTextArea.dragscrolltype = "both";
	_pTextArea.imemode = "none";
	_pTextArea.inputfilter = "none";
	_pTextArea.inputmode = "normal";
	_pTextArea.inputtype = "normal";
	_pTextArea.maxlength = 0;
	_pTextArea.readonly = false;
	_pTextArea.usecontextmenu = true;
	_pTextArea.useime = "global";
	_pTextArea.text = "";
	_pTextArea.value = undefined;
	_pTextArea._not_use_scrollTop = true;


	_pTextArea._input_element = null;

	_pTextArea._inputfilter_obj = null;
	_pTextArea._inputtype_obj = null;
	_pTextArea._undostack = null;

	_pTextArea._default_value = undefined;
	_pTextArea._default_text = "";

	_pTextArea._keypad_type = "text";
	_pTextArea._imedisable = false;
	_pTextArea._want_tab = true;
	_pTextArea._is_set_value = false;

	_pTextArea._update_scroll_lock = false;
	_pTextArea._processing_updateToDataset = false;
	_pTextArea._result_updateToDataset = true;
	_pTextArea._processing_canchange = false;
	_pTextArea._apply_filter = true;

	_pTextArea._onlydisplay = false;
	_pTextArea._apply_client_padding = false;
	_pTextArea._has_inputElement = true;
	_pTextArea._change_value = false;
	_pTextArea._processing_autoskip = false;

	_pTextArea._is_undo = false;


	_pTextArea._is_scrollable = true;
	_pTextArea._is_editable_control = true;
	_pTextArea._use_translate_scroll = false;
	_pTextArea._use_container_move = false;
	_pTextArea._use_readonly_status = true;

	if ((nexacro._Browser == "IE" && nexacro._BrowserVersion < 10) || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		_pTextArea._use_focus_caret = true;
		_pTextArea._caret_pos = -1;
	}
	else {
		_pTextArea._use_focus_caret = false;
		_pTextArea._caret_pos = -1;
	}


	_pTextArea._event_list = {
		"oneditclick" : 1, 
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
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"canchange" : 1, 
		"onchanged" : 1, 
		"oninput" : 1, 
		"onmousewheel" : 1, 
		"oncontextmenu" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};


	_pTextArea.accessibilityrole = "textarea";

	_pTextArea.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var input_elem;
			if (!this._onlydisplay) {
				input_elem = this._input_element = new nexacro.TextAreaElement(control, "textarea");
				input_elem.setElementAutoSkip(this.autoskip);
				input_elem.setElementAutoSelect(this.autoselect);
				input_elem.setElementUseIme(this.useime);
				input_elem.setElementImeMode(this.imemode);
				input_elem.setElementReadonly(this.readonly);
				input_elem.setElementDisplayNullText(this.displaynulltext);
				input_elem.setElementMaxLength(this.maxlength);
				if ((this.inputtype.indexOf("normal") >= 0) || (this.inputtype.indexOf("full") >= 0)) {
					input_elem._inputtype = "text";
				}
				else {
					input_elem._inputtype = "";
				}
				input_elem.setElementInputType(this._keypad_type, this._imedisable);
			}
			else {
				input_elem = this._input_element = new nexacro.TextBoxElement(control, "textarea");
				input_elem.setElementVerticalAlign("top");
			}

			input_elem.setElementPosition(this._getClientLeft(), this._getClientTop());
			input_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			input_elem.setElementTextDecoration(this._textdecoration);
			input_elem.setElementTextAlign(this.textAlign);
			input_elem.setElementPadding(this.padding);

			var wordwrap_info = this._getCSSStyleValue("wordWrap");
			if (wordwrap_info) {
				input_elem.setElementCSSMapInfo(wordwrap_info);
			}

			if (this.wordWrap) {
				input_elem.setElementWordWrap(this.wordWrap);
			}

			this._undostack = new nexacro._EditUndoStack(this);
		}
	};

	_pTextArea.on_created_contents = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			var wordwrap_info = this.wordWrap || this._getCSSStyleValue("wordWrap");
			if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && (wordwrap_info != "none" && wordwrap_info !== undefined)) {
				this._hscrollbartype = "none";
			}

			this.on_apply_padding(this._padding);
			this.on_apply_value(this.value);

			input_elem.create(win);

			this.set_usesoftkeyboard(this.usesoftkeyboard, true);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}

			if (nexacro._enableaccessibility) {
				if (this.readonly) {
					this._setAccessibilityFlagReadOnly(this.readonly);
				}
				this._setAccessibilityFlagMultiLine(true);
			}

			this.on_apply_scrollbartype();
			this._onResetScrollBar();
			this._onRecalcScrollSize();
		}
	};

	_pTextArea.on_destroy_contents = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.destroy();
			this._input_element = null;
		}

		var undostack = this._undostack;
		if (undostack) {
			undostack.destroy();
			this._undostack = null;
		}

		var inputfilterobj = this._inputfilter_obj;
		if (inputfilterobj) {
			this._inputfilter_obj = null;
		}

		var inputtypeobj = this._inputtype_obj;
		if (inputtypeobj) {
			this._inputtype_obj = null;
		}

		var vscroll_animationframe = this._vscroll_animationframe;
		if (vscroll_animationframe) {
			vscroll_animationframe.destroy();
		}

		var hscroll_animationframe = this._hscroll_animationframe;
		if (hscroll_animationframe) {
			hscroll_animationframe.destroy();
		}
	};

	_pTextArea.on_create_contents_command = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var wordwrap_info = this.wordWrap || this._getCSSStyleValue("wordWrap");
			if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && (wordwrap_info != "none" && wordwrap_info !== undefined)) {
				this._hscrollbartype = "none";
			}

			this.on_apply_padding(this._padding);

			return input_elem.createCommand();
		}

		return "";
	};

	_pTextArea.on_attach_contents_handle = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.attachHandle(win);

			this.on_apply_value(this.value);
			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
		}

		if (nexacro._enableaccessibility) {
			if (this.readonly) {
				this._setAccessibilityFlagReadOnly(this.readonly);
			}
			this._setAccessibilityFlagMultiLine(true);
		}

		this.on_apply_scrollbartype();
		this._onRecalcScrollSize();
		this._onResetScrollBar();
	};

	_pTextArea.on_change_containerRect = function (width, height) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSize(width, height);

			if (this._update_scroll_lock == true) {
				return false;
			}

			this._update_scroll_lock = true;

			this._onRecalcScrollSize();
			this._onResetScrollBar();

			this._update_scroll_lock = false;
		}
	};

	_pTextArea._apply_setfocus = function (evt_name, self_flag) {
		this._processing_updateToDataset = false;

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.on_apply_imeSet();
				input_elem.on_apply_force_imeSet();

				this._want_tab = true;
				if (evt_name) {
					this._default_value = this.value;
					this._default_text = this.text;
				}

				var win = this._getWindow();
				if (win) {
					var ldown_comp = win._cur_ldown_elem ? win._cur_ldown_elem.linkedcontrol : null;
					if (!(ldown_comp && ldown_comp instanceof nexacro.ScrollBarControl)) {
						input_elem.setElementFocus(evt_name, self_flag);
					}
				}

				this._changeUserStatus("nulltext", false);

				var text = input_elem.getElementText();
				if (text != this.text) {
					this._default_text = this.text = text;
				}

				if (nexacro._needAdjustScrollPosition(this._is_set_value)) {
					this._adjust_scrollPosition(input_elem, evt_name);
				}

				if (!this.autoselect) {
					if (this._use_focus_caret) {
						if (this._caret_pos == -1) {
							input_elem.setElementSetSelect(0, 0);
						}
						else {
							input_elem.setElementSetSelect(this._caret_pos.begin, this._caret_pos.end);
						}
					}
					else {
						if (this._caret_pos == -1) {
							if (this._change_value) {
								input_elem.setElementSetSelect(this.value ? this.value.length : 0);
							}
							else {
								input_elem.setElementSetSelect(0, 0);
							}
						}
					}
				}
			}
			else {
				this._want_tab = true;

				if (evt_name) {
					this._default_value = this.value;
					this._default_text = this.text;
				}

				if (nexacro._needAdjustScrollPosition(this._is_set_value)) {
					this._adjust_scrollPosition(input_elem, evt_name);
				}
			}
		}
	};

	_pTextArea.on_apply_status = function (status, userstatus) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this.wordWrap) {
				var wordwrap_info = this._getCSSStyleValue("wordWrap", status, userstatus);
				if (wordwrap_info) {
					input_elem.setElementCSSMapInfo(wordwrap_info);
				}
			}
		}
	};

	_pTextArea.on_getBindableProperties = function () {
		return "value";
	};

	_pTextArea.on_apply_prop_enable = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementEnable(v, this._getCSSStyleValue("color"));

				this._update_scroll_lock = true;

				this._onRecalcScrollSize();
				this._onResetScrollBar();

				this._update_scroll_lock = false;
			}
		}
	};

	_pTextArea.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			if (this._undostack) {
				this._undostack.clear();
			}

			this._setValue(undefined);
		}
	};

	_pTextArea.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var input_elem = this._input_element;

			var v = ds.getColumn(row, col);
			v = this._convertValueType(v, true);

			if (v == this.value) {
				return;
			}

			if (this._undostack) {
				this._undostack.clear();
			}

			var _bSetselect = false;
			if (this.value != v) {
				_bSetselect = true;
			}

			this._setValue(v);

			if (input_elem && _bSetselect && !this._onlydisplay) {
				input_elem.setElementSetSelect(this.value ? this.value.length : 0);

				this._caret_pos = input_elem.getElementCaretPos();
			}
		}
	};

	_pTextArea.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		if (value) {
			return changestatus;
		}
		else {
			return applyuserstatus;
		}
	};

	_pTextArea._onRecalcScrollSize = function () {
		if (this._onlydisplay) {
			return;
		}

		var control_elem = this.getElement();
		var input_elem = this._input_element;
		var target_arr = null;

		var client_width = control_elem.getClientWidth();
		var client_height = control_elem.getClientHeight();
		if (client_width <= 0 || client_height <= 0) {
			return;
		}

		if (control_elem && input_elem) {
			var max_width;
			var max_height;


			target_arr = nexacro._get_invisible_obj(this);
			nexacro._reset_invisible_obj(target_arr, true);

			var hscrollbar = this.hscrollbar;
			var vscrollbar = this.vscrollbar;
			var pre_vscrollmax = vscrollbar ? vscrollbar._max : 0;

			max_width = input_elem.getElementScrollWidth();
			max_height = input_elem.getElementScrollHeight();

			control_elem.setElementScrollMaxSize(max_width, max_height);


			var pos;
			var pThis = this;
			if (vscrollbar) {
				if (pre_vscrollmax != vscrollbar._max) {
					var textsize = nexacro._getTextSize("A", this._getCurrentStyleInheritValue("font"), false, undefined, "none", this._getCurrentStyleInheritValue("wordSpacing"), this._getCurrentStyleInheritValue("letterSpacing"));

					var padding = this._getCSSStyleValue("padding");

					var clientheight = control_elem.getClientHeight();
					var nodeheight = padding ? clientheight - (padding.top + padding.bottom) : clientheight;

					var caretline = this._getCaretLine();
					var viewstart = vscrollbar._pos ? vscrollbar._pos / textsize[1] : 0;
					var viewcount = clientheight / textsize[1];

					if (viewstart + viewcount < caretline) {
						vscrollbar.set_pos(textsize[1] *  caretline - nodeheight);
					}
				}
				else {
					pos = input_elem.getElementVScrollPos();
					if (vscrollbar._pos != pos) {
						vscrollbar.set_pos(pos);
					}
				}
			}

			if (hscrollbar) {
				pos = input_elem.getElementHScrollPos();
				if (hscrollbar._pos != pos) {
					var hscroll_animationframe = this._hscroll_animationframe;
					if (!hscroll_animationframe) {
						hscroll_animationframe = this._hscroll_animationframe = new nexacro.AnimationFrame(pThis, hscrollbar.set_pos(pos));
					}
					else {
						hscroll_animationframe._setCallback(hscrollbar.set_pos(pos));
					}
					if (hscroll_animationframe.callback) {
						hscroll_animationframe.start();
					}
				}
			}
		}

		if (target_arr) {
			nexacro._reset_invisible_obj(target_arr, false);
		}
	};

	_pTextArea._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_arrow = true;
		var elem;

		if (nexacro._enableaccessibility) {
			if (!this._onlydisplay) {
				if (keycode == nexacro.Event.KEY_UP) {
					elem = this._input_element;
					if ((elem && elem.isFirstCaretLine()) || !elem) {
						want_arrow = false;
					}
				}
				else if (keycode == nexacro.Event.KEY_DOWN) {
					elem = this._input_element;
					if (!this.enable || (elem && elem.isLastCaretLine()) || !elem) {
						want_arrow = false;
					}
				}
			}
		}
		if (keycode == nexacro.Event.KEY_TAB) {
			if (this.readonly) {
				this._want_tab = false;
			}
		}
		return {
			want_tab : this._want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pTextArea._getDragData = function () {
		return this.getSelectedText();
	};

	_pTextArea.on_get_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pTextArea.set_text = nexacro._emptyFn;

	_pTextArea.set_value = function (v) {
		v = this._convertValueType(v);

		if (v) {
			if (v.indexOf("\r\n") != -1 || v.indexOf("\n\r") != -1) {
				v = v.replace(/\r\n|\n\r/g, "\n");
			}

			if (v.indexOf("\r") != -1) {
				v = v.replace(/\r/g, "");
			}
		}

		if (this.value !== v) {
			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			this._setValue(v);
			this._is_set_value = true;
		}
	};

	_pTextArea.on_apply_value = function (value) {
		var input_elem = this._input_element;
		if (input_elem) {
			var pos = input_elem.getElementCaretPos();
			var text = this.text;
			value = value ? this.text : value;

			if (this._is_created && nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			else {
				this._changeUserStatus("nulltext", false);
			}

			if (!this._onlydisplay) {
				if (this._undostack) {
					if (pos && pos != -1) {
						this._undostack.push(value, pos.begin, pos.end);
					}
					else {
						this._undostack.push(value, 0, 0);
					}
				}

				input_elem.setElementValue(value);
				text = input_elem.getElementText();
			}
			else {
				if (this.displaynulltext && nexacro._isNull(this.value)) {
					input_elem.setElementText(this.displaynulltext);
				}
				else {
					input_elem.setElementText(value);
				}
			}

			if (this.text != text) {
				this.text = text;
			}

			this._updateAccessibilityLabel();
			this._default_value = this.value;
			this._default_text = this.text;

			if (this._is_created) {
				this._onRecalcScrollSize();
				this._onResetScrollBar();
			}

			pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				this._caret_pos = pos;
			}
			else {
				this._change_value = this._is_created ? true : false;
			}

			this._is_set_value = true;
		}
	};

	_pTextArea.set_displaynulltext = function (v) {
		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pTextArea.on_apply_displaynulltext = function (displaynulltext) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementDisplayNullText(displaynulltext);
			}
			else {
				this.on_apply_value(this.value);
			}
		}
	};

	_pTextArea.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pTextArea.on_apply_usesoftkeyboard = function (bforce) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementUseSoftKeyboard(this.usesoftkeyboard, bforce);
			}
		}
	};

	_pTextArea.set_readonly = function (v) {
		if (this._onlydisplay) {
			return;
		}

		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pTextArea.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementReadonly(readonly);
			}
		}
	};

	_pTextArea.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoselect != v) {
			this.autoselect = v;
			this.on_apply_autoselect(v);
		}
	};

	_pTextArea.on_apply_autoselect = function (autoselect) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementAutoSelect(autoselect);
			}
		}
	};

	_pTextArea.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoskip != v) {
			this.autoskip = v;
			this.on_apply_autoskip(v);
		}
	};

	_pTextArea.on_apply_autoskip = function (autoskip) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementAutoSkip(autoskip);
			}
		}
	};

	_pTextArea.set_inputmode = function (v) {
		var inputmode_enum = ["normal", "upper", "lower"];
		if (inputmode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.inputmode != v) {
			this.inputmode = v;
		}
	};

	_pTextArea.set_inputfilter = function (v) {
		if (v) {
			var inputfilter_arr = v.split(',');
			var inputfilter_enum = ["none", "alpha", "digit", "comma", "dot", "sign", "space", "symbol"];
			for (var i = 0, len = inputfilter_arr.length; i < len; i++) {
				if (inputfilter_enum.indexOf(inputfilter_arr[i]) == -1) {
					return;
				}
			}
		}
		else {
			return;
		}

		if (this.inputfilter != v) {
			this.inputfilter = v;
			this._inputfilter_obj = null;

			this.on_apply_inputfilter(v);
		}
	};

	_pTextArea.on_apply_inputfilter = function (inputfilter) {
		this._inputfilter_obj = new nexacro._EditInputFilter(inputfilter);
	};

	_pTextArea.set_inputtype = function (v) {
		if (v) {
			var inputtype_arr = v.split(',');
			var inputtype_enum = ["normal", "alpha", "english", "digit", "number", "comma", "dot", "sign", "space", "symbol", "half", "full", "numberandenglish"];
			for (var i = 0, len = inputtype_arr.length; i < len; i++) {
				if (inputtype_enum.indexOf(inputtype_arr[i]) == -1) {
					return;
				}
			}
		}
		else {
			return;
		}

		if (this.inputtype != v) {
			this.inputtype = v;
			this._inputtype_obj = null;

			this.on_apply_inputtype(v);
		}
	};

	_pTextArea.on_apply_inputtype = function (inputtype) {
		this._inputtype_obj = new nexacro._EditInputType(inputtype);

		if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
			this._imedisable = false;
		}
		else {
			this._imedisable = this._inputtype_obj.imedisable;
		}

		this._keypad_type = this._inputtype_obj.keypadtype;

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				if ((this.inputtype.indexOf("normal") >= 0) || (this.inputtype.indexOf("full") >= 0)) {
					input_elem._inputtype = "text";
				}
				else {
					input_elem._inputtype = "";
				}
				input_elem.setElementInputType(this.password ? "password" : this._keypad_type, this._imedisable);
			}
		}
	};

	_pTextArea.set_maxlength = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		if (this.maxlength != v) {
			this.maxlength = v;
			this.on_apply_maxlength(v);
		}
	};

	_pTextArea.on_apply_maxlength = function (maxlength) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementMaxLength(maxlength);
			}
		}
	};

	_pTextArea.set_useime = function (v) {
		v = nexacro._toBoolean(v);
		if (this.useime != v) {
			this.useime = v;
			this.on_apply_useime(v);
		}
	};

	_pTextArea.on_apply_useime = function (useime) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementUseIme(useime);
			}
		}
	};

	_pTextArea.set_imemode = function (v) {
		var imemode_enum = ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"];
		if (imemode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.imemode != v) {
			this.imemode = v;
			this.on_apply_imemode(v);
		}
	};

	_pTextArea.on_apply_imemode = function (imemode) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementImeMode(imemode);
			}
		}
	};

	_pTextArea.on_apply_wordWrap = function (wordWrap) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementWordWrap(wordWrap);
		}

		if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && (this.wordWrap != "none" && this.wordWrap === "")) {
			this._hscrollbartype = "none";
		}

		if (this._is_created) {
			this._onRecalcScrollSize();
		}
	};

	_pTextArea.set_scrollbartype = function (v) {
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

		if (this._is_created && new_hscrollbartype != "fixed") {
			var wordWrap = this.wordWrap || this._getCSSStyleValue("wordWrap");
			var bWordWrap = (wordWrap && wordWrap != "none" && wordWrap != "undefined");

			if (bWordWrap) {
				this._hscrollbartype = "none";
			}
		}

		this.on_apply_scrollbartype();

		return v;
	};

	_pTextArea.set_acceptstab = function (v) {
		v = nexacro._toBoolean(v);
		if (this.acceptstab != v) {
			this.acceptstab = v;
		}
	};

	_pTextArea.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pTextArea.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
		}
	};

	_pTextArea.set_cursor = function (v) {
		this.cursor = v;
		if (v) {
			if (this._cursor == null || this._cursor.value != v) {
				if (this.enable && v == "auto") {
					v = "text";
				}
				var cursor = nexacro.CursorObject(v);
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

	_pTextArea.on_apply_textAlign = function (halign) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextAlign(halign);
		}
	};

	_pTextArea.on_apply_padding = function (padding) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementPadding(padding);

			this._onRecalcScrollSize();
		}
	};

	_pTextArea.on_apply_textDecoration = function (textDecoration) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextDecoration(textDecoration);
		}
	};

	_pTextArea.getLength = function (v) {
		return (this.value ? this.value.length : 0);
	};

	_pTextArea.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				return pos.begin;
			}
		}

		return -1;
	};

	_pTextArea.setCaretPos = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				if (arguments.length == 0) {
					v = 0;
				}
				else {
					v = nexacro._toInt(v);
					if (v == -1) {
						if (v) {
							v = this.text.length;
						}
						else {
							v = 0;
						}
					}
				}

				input_elem.setElementSetSelect(v, v);

				if (v === 0) {
					this._setHscrollPos(0);
					this._setVscrollPos(0);
				}
			}

			return true;
		}
		return false;
	};

	_pTextArea.getSelect = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				return input_elem.getElementSelectionRange();
			}
		}
		return [0, 0];
	};

	_pTextArea.setSelect = function (start, end) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var txt = this.text ? this.text : "";
				var txt_len = txt.length;

				if (nexacro._isNull(start) || start === "") {
					start = 0;
				}
				if (nexacro._isNull(end) || end === "") {
					end = -1;
				}

				if (!nexacro._isNumber(start)) {
					start = nexacro._toInt(start);
				}
				if (!nexacro._isNumber(end)) {
					end = nexacro._toInt(end);
				}

				if (start == -1) {
					start = txt_len;
				}
				if (end == -1) {
					end = txt_len;
				}

				if (start > end) {
					var tmp = start;
					start = end;
					end = tmp;
				}

				input_elem.setElementSetSelect(start, end);
			}

			return true;
		}

		return false;
	};

	_pTextArea.getSelectedText = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var sel = input_elem.getElementSelectionRange();
				var start = sel[0], end = sel[1];
				var text = this.text;

				if (text && (start != end)) {
					return text.substring(start, end);
				}
			}
		}

		return "";
	};

	_pTextArea.setSelectedText = function (v) {
		if (/\r\n|\n\r/.test(v)) {
			v = v.replace(/\r\n|\n\r/g, "\n");
		}
		if (/\r/.test(v)) {
			v = v.replace(/\r/g, "");
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var sel = input_elem.getElementSelectionRange();
				var start = sel[0], end = sel[1];
				if (start == end) {
					return "";
				}

				var new_v = "";
				if (this._inputtype_obj) {
					var v_len = v.length;
					for (var i = 0; i < v_len; i++) {
						var ch = v[i];
						if (this._inputtype_obj.test(ch)) {
							new_v += ch;
						}
					}

					v = new_v;
				}

				var insertlen = v.length;
				var src = this.text.substring(start, end);
				var newtext = this.text;
				var newlen = newtext.length - (end - start) + insertlen;
				if (this.maxlength > 0 && newlen > this.maxlength) {
					v = v.substring(0, this.maxlength - insertlen);
				}
				newtext = newtext.substring(0, start) + v + newtext.substring(end);

				if (this.text != newtext) {
					this.set_value(newtext);
					input_elem.setElementSetSelect(start, start + insertlen);
				}

				return src;
			}
		}

		return "";
	};

	_pTextArea.insertText = function (insert_text, position) {
		insert_text = nexacro._toString(insert_text);
		if (insert_text == null || insert_text == "") {
			return;
		}

		var text = this.value || "";
		if (nexacro._isNull(position) || position === "") {
			position = text.length;
		}
		else {
			position = nexacro._toInt(position);
		}

		if (position < 0 || position > text.length) {
			position = text.length;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (insert_text != "") {
				if (/\r\n|\n\r/.test(insert_text)) {
					insert_text = insert_text.replace(/\r\n|\n\r/g, "\n");
				}

				if (/\r/.test(insert_text)) {
					insert_text = insert_text.replace(/\r/g, "");
				}
			}

			text = text.substring(0, position) + insert_text + text.substring(position);

			if (!this._onlydisplay) {
				this.set_value(text);
			}
			else {
			}
		}
	};

	_pTextArea.deleteText = function (start, count) {
		if (nexacro._isNull(start)) {
			start = 0;
		}
		else {
			start = nexacro._toInt(start);
		}

		if (nexacro._isNull(count)) {
			count = -1;
		}
		else {
			count = nexacro._toInt(count);
		}

		var input_value = this.value || "";
		var len = input_value.length;
		if (count == -1) {
			count = len - start;
		}

		if (count < 0 || start < 0 || start >= len) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var text = input_value.substring(0, start) + input_value.substring(start + count);

				this.set_value(text);
			}
			else {
			}
		}
	};

	_pTextArea.find = function (text, start) {
		start = nexacro._toInt(start) | 0;
		text = nexacro._toString(text);

		if (start == -1) {
			var input_elem = this._input_element;
			if (input_elem) {
				if (!this._onlydisplay) {
					var pos = input_elem.getElementCaretPos();
					if (pos && pos != -1) {
						start = pos.begin;
					}
				}
			}
		}
		if (start < 0) {
			return -1;
		}

		return text ? this.text.indexOf(text, start) : -1;
	};

	_pTextArea.replace = function (oldText, newText) {
		if (newText == null) {
			newText = "";
		}

		oldText = nexacro._toString(oldText);
		newText = nexacro._toString(newText);

		var cur_text = this.value || "";
		var input_elem = this._input_element;
		if (input_elem && oldText) {
			var split_buf = cur_text.split(oldText);
			if (split_buf.length > 1) {
				cur_text = split_buf.join(newText);
				split_buf.pop();

				var newpos = split_buf.join(newText).length;

				if (!this._onlydisplay) {
					if (cur_text != "") {
						if (/\r\n|\n\r/.test(cur_text)) {
							cur_text = cur_text.replace(/\r\n|\n\r/g, "\n");
						}

						if (/\r/.test(cur_text)) {
							cur_text = cur_text.replace(/\r/g, "");
						}
					}


					this.set_value(cur_text || "");
					if (input_elem._is_focused) {
						this.setCaretPos(newpos);
					}
				}
				else {
				}
			}
		}

		return this.value;
	};

	_pTextArea.updateToDataset = function () {
		if (this._result_updateToDataset = this.applyto_bindSource("value", this.value)) {
			this._default_value = this.value;
			this._default_text = this.text;
		}
		this._processing_updateToDataset = true;

		return this._result_updateToDataset;
	};

	_pTextArea.on_deactivate_process = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setCompositionComplete();

				var pos = input_elem.getElementCaretPos();
				input_elem.setElementSetSelect(pos.begin, pos.end);
			}
		}
	};

	_pTextArea._on_deactivate = function () {
		if (!this._is_alive) {
			return;
		}

		if (!this._isSelected()) {
			this._changeStatus("focused", false);
		}

		this.on_deactivate_process.call(this);
	};

	_pTextArea._on_value_change = function (pretext, prevalue, posttext, postvalue) {
		if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue)) {
			return false;
		}

		this._default_value = postvalue;
		this._default_text = posttext;
		var input_elem = this._input_element;
		var pos = input_elem.getElementCaretPos();
		if (pos && pos != -1) {
			this._caret_pos = pos;
		}

		if (this._processing_updateToDataset && !this._result_updateToDataset && prevalue === postvalue) {
			this._processing_updateToDataset = false;
			this._result_updateToDataset = true;
			return false;
		}
		else if (!this.applyto_bindSource("value", postvalue)) {
			return false;
		}

		this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

		return true;
	};

	_pTextArea._on_input_undo = function (item) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (item) {
				this._is_undo = true;
				var caret = item.end;
				if (item.value && item.value.length > caret) {
					caret = item.value.length;
				}
				input_elem.updateElementText(item.value, caret);
				input_elem.setElementSetSelect(item.start, item.end);
				return true;
			}
		}
	};

	_pTextArea._on_input_redo = function (item) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (item) {
				input_elem.updateElementText(item.value, item.end);
				input_elem.setElementSetSelect(item.start, item.end);
				return true;
			}
		}
	};

	_pTextArea.on_notify_vscroll_onscroll = function (obj, e) {
		this._scrollTo(this._hscroll_pos, e.pos, false, false, e.type, e._evtkind);

		if (this._input_element) {
			this._input_element.setElementVScrollPos(e.pos);
		}
	};

	_pTextArea.on_keydown_basic_before_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return true;
	};

	_pTextArea.on_keydown_basic_specialkey_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		var input_elem = this._input_element;

		if (nexacro._OS == "Mac OS" || nexacro._OS == "OSX" || nexacro._OS == "iOS") {
			ctrl_key = meta_key;
		}

		if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) {
			input_elem.stopSysEvent();
			return;
		}
		else if (!alt_key && !shift_key && ctrl_key && keycode == 90) {
			if (input_elem.isComposing()) {
				input_elem.setCompositionComplete();
			}

			if (this._undostack) {
				this._undostack.undo();
				input_elem._applyMaxlength();
				input_elem.stopSysEvent();
				return;
			}
		}
		else if (!alt_key && !shift_key && ctrl_key && keycode == 89) {
			if (this._undostack) {
				this._undostack.redo();
				input_elem.stopSysEvent();
				return;
			}
		}
		else if (keycode == nexacro.Event.KEY_TAB) {
			if (!alt_key && !shift_key && ((this.acceptstab && !ctrl_key) || (!this.acceptstab && ctrl_key))) {
				var pos = input_elem.getElementCaretPos();
				var text = input_elem.getElementText();

				text = text.substring(0, pos.begin) + nexacro.TextArea._TAB_CHAR + text.substring(pos.end);
				var newpos = pos.begin + nexacro.TextArea._TAB_CHAR.length;
				nexacro._OnceCallbackTimer.callonce(this, function () {
					input_elem.updateElementText(text, newpos);
				}, 0);
				input_elem.stopSysEvent();
			}
			else {
				this._want_tab = false;
			}
		}

		return true;
	};

	_pTextArea.on_keydown_basic_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		var input_elem = this._input_element;
		if (this._undostack && !input_elem.isComposing()) {
			var pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				this._undostack.update(pos.begin, pos.end);
			}
		}

		return true;
	};

	_pTextArea.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this.on_keydown_basic_before_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
				return;
			}
			if (!this.on_keydown_basic_specialkey_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
				return;
			}

			this.on_keydown_basic_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
		}
	};

	_pTextArea.on_keydown_default_before_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return true;
	};

	_pTextArea.on_keydown_default_specialkey_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN) {
			this._onRecalcScrollSize();
		}

		return true;
	};

	_pTextArea.on_keydown_default_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return true;
	};

	_pTextArea.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this.on_keydown_default_before_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
				return;
			}
			if (!this.on_keydown_default_specialkey_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
				return;
			}

			this.on_keydown_default_process.call(this, keycode);
		}
	};

	_pTextArea.on_keypress_basic_before_process = function (keycode, charcode, alt_key, ctrl_key) {
		return true;
	};

	_pTextArea.on_keypress_basic_specialkey_process = function (keycode, charcode, alt_key, ctrl_key) {
		if (keycode == nexacro.Event.KEY_ENTER || keycode == nexacro.Event.KEY_ESC) {
			return false;
		}

		return true;
	};

	_pTextArea.on_keypress_basic_process = function (keycode, charcode, alt_key, ctrl_key) {
		if (nexacro._OS == "iOS") {
			return true;
		}

		var input_elem = this._input_element;
		charcode = charcode || keycode;

		if (!ctrl_key && !alt_key && charcode) {
			var inputChar = String.fromCharCode(charcode);
			if (inputChar.length > 0 && this._isFilterChar(inputChar)) {
				input_elem.stopSysEvent();
				return false;
			}
		}

		return true;
	};

	_pTextArea.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key, shift_key, meta_key) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (keycode !== 0 && charcode === 0) {
				return true;
			}
			else {
				if (!this.on_keypress_basic_before_process.call(this, keycode, charcode, alt_key, ctrl_key, shift_key, meta_key)) {
					return;
				}
				if (!this.on_keypress_basic_specialkey_process.call(this, keycode, charcode, alt_key, ctrl_key, shift_key, meta_key)) {
					return;
				}

				if (!this.on_keypress_basic_process.call(this, keycode, charcode, alt_key, ctrl_key, shift_key, meta_key)) {
					return false;
				}
			}

			return true;
		}
	};

	_pTextArea.on_keyup_basic_before_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return true;
	};

	_pTextArea.on_keyup_basic_specialkey_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return true;
	};

	_pTextArea.on_keyup_default_process = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		this._onRecalcScrollSize();
		return true;
	};

	_pTextArea.on_keyup_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (!this.on_keyup_basic_before_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
			return;
		}
		if (!this.on_keyup_basic_specialkey_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
			return;
		}

		if (!this.on_keyup_default_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key)) {
			return false;
		}
	};

	_pTextArea.on_beforekeyinput_basic_action = function (value, status, begin, end, inputType) {
		if (this.readonly || !this._isEnable()) {
			return 0;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (input_elem._use_event_beforeinput) {
				return this._beforeinput_process_with_HTMLEvent(value, status, begin, end, inputType);
			}
			else {
				return this._beforeinput_process_with_NexacroInputEvent(value, status, begin, end);
			}
		}
	};

	_pTextArea.on_keyinput_basic_before_process = function (input_text) {
		return true;
	};

	_pTextArea.on_keyinput_basic_process = function (input_text) {
		var input_elem = this._input_element;
		var input_value = input_elem.value === null ? undefined : input_elem.value;
		input_text = input_text === undefined ? input_elem._getInputValue() : input_text;

		this.value = input_value;
		this.text = input_text;

		if (this._undostack && !input_elem.isComposing()) {
			var pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				this._undostack.push(input_value, pos.begin, pos.end);
			}
			else {
				this._undostack.push(input_value, 0, 0);
			}
		}

		return true;
	};

	_pTextArea.on_keyinput_basic_action = function (input_text) {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this.on_keyinput_basic_before_process.call(this, input_text)) {
				return false;
			}
			if (!this.on_keyinput_basic_process.call(this, input_text)) {
				return false;
			}


			this._onRecalcScrollSize();
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._onResetScrollBar();
			});
		}
		this._updateAccessibilityLabel();

		return true;
	};

	_pTextArea.on_killfocus_basic_process = function () {
		var input_elem = this._input_element;
		var cur_text;
		if (!this._onlydisplay) {
			if (input_elem.isComposing()) {
				cur_text = this.text;
				var filter_text = this.text;
				if (this._inputtype_obj) {
					filter_text = this._inputtype_obj.apply(cur_text);
				}
				if (this._inputfilter_obj) {
					filter_text = this._inputfilter_obj.apply(cur_text);
				}

				if (cur_text != filter_text) {
					input_elem.setCompositionCancel();
				}
				else {
					input_elem.setCompositionComplete();
				}
			}
		}

		var pre_value = this._default_value;
		var pre_text = this._default_text;

		var cur_value = this.value;
		cur_text = cur_value ? cur_value : "";

		if (pre_value != cur_value) {
			if (!this._processing_canchange) {
				var pos = input_elem.getElementCaretPos();
				if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
					var cur_text_len = cur_text ? cur_text.length : 0;
					var pre_text_len = pre_text ? pre_text.length : 0;
					if (pos != -1) {
						if (cur_text_len - pre_text_len >= 0) {
							pos.begin = pos.end = pos.begin - (cur_text_len - pre_text_len);
						}
						if (pos.begin < 0) {
							pos.begin = pos.end = 0;
						}

						this._caret_pos = pos;
					}
					else {
						this._caret_pos.begin = this._caret_pos.end = pre_value ? pre_value.length : 0;
					}
					this.value = pre_value;
					this.text = pre_text;

					if (!this._onlydisplay) {
						input_elem.setElementValue(pre_value);
					}
					else {
						input_elem.setElementText(pre_value);
					}

					input_elem.setElementSetSelect(this._caret_pos.begin, this._caret_pos.end);
				}
			}
		}
		else {
			this._caret_pos = input_elem.getElementCaretPos();
		}


		if (!this._onlydisplay) {
			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			this._adjust_scrollPosition(input_elem);
			var _win = this._getRootWindow();
			var idx = _win._indexOfCurrentFocusPaths(this);
			if (idx < 0) {
				input_elem.setElementBlur();
			}
		}
	};

	_pTextArea.on_killfocus_basic_action = function (new_focus, new_refer_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var _sel = input_elem.getElementSelectionRange();
				if (_sel[0] == _sel[1]) {
					input_elem._setElementLastSelectionRange();
				}
			}

			if (!this.on_killfocus_basic_process.call(this)) {
				return;
			}
		}
	};

	_pTextArea.on_click_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var _window = this._getWindow();
				if (_window && this._track_capture) {
					var capture_comp = _window._getCaptureComp(true, false, this);
					if (!capture_comp || capture_comp == this) {
						input_elem.setElementFocus(button, true);
					}
				}
			}
		}
	};

	_pTextArea.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var caretpos = this.getCaretPos();

			var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, this, meta_key);
			return this.oneditclick._fireEvent(this, evt);
		}

		return true;
	};

	_pTextArea.on_fire_canchange = function (obj, bText, bValue, aText, aValue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "canchange", bText, bValue, aText, aValue);

			this._processing_canchange = true;
			var ret = this.canchange._fireCheckEvent(this, evt);
			this._processing_canchange = false;

			return ret;
		}

		return true;
	};

	_pTextArea.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};

	_pTextArea.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pTextArea._convertValueType = function (v, bapplyrule) {
		var ret;
		if (bapplyrule) {
			ret = nexacro.Component.prototype._convertValueType.call(this, v);
		}
		else {
			ret = nexacro._isNull(v) ? v : nexacro._toString(v);
		}

		return ret;
	};

	_pTextArea._setValue = function (v) {
		this.text = nexacro._toString(v);
		this.value = v;

		this.on_apply_value(this.value);
	};

	_pTextArea._setDefaultCaret = nexacro._emptyFn;

	_pTextArea._setFocusToNextComponent = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._getForm().getNextComponent(root_comp, true);
		if (next_comp) {
			next_comp.setFocus();
			if (next_comp._is_editable_control) {
				next_comp._setDefaultCaret();
			}
		}
	};

	_pTextArea._setHscrollPos = function (v) {
		this._hscroll_pos = nexacro._toInt(v);

		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementHScrollPos(v);
		}
	};

	_pTextArea._setVscrollPos = function (v) {
		this._vscroll_pos = nexacro._toInt(v);

		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementVScrollPos(v);
		}
	};

	_pTextArea._setVScrollDefaultAction = function (wheelDelta) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.scrolltype == "none" || this.scrolltype == "horizontal") {
				return false;
			}

			var wheelline = -3;
			var lineheight = 20;
			if (wheelDelta >= 0) {
				wheelline = 3;
			}

			wheelDelta = lineheight *  wheelline;

			var old_value = this._vscroll_pos;
			var value = old_value - wheelDelta;
			var vscroll_limit = control_elem.vscroll_limit;
			if (value > vscroll_limit) {
				value = vscroll_limit;
			}

			this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");

			if (old_value != this._vscroll_pos) {
				return true;
			}
		}

		return false;
	};

	_pTextArea._getLineCount = function () {
		var line = 0;
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				line = input_elem.getElementTextLineCount(true);
			}
		}
		return line;
	};

	_pTextArea._getCaretLine = function () {
		var line = 0;
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				line = input_elem.getElementCaretLine();
			}
		}
		return line;
	};

	_pTextArea._isFilterChar = function (ch) {
		if (ch != "") {
			if (this._inputfilter_obj && this._inputfilter_obj.test(ch)) {
				return true;
			}

			if (this._inputtype_obj && !this._inputtype_obj.test(ch)) {
				return true;
			}
		}

		return false;
	};

	_pTextArea._isWheelScrollable = function (delta) {
		if (this._onlydisplay) {
			return true;
		}

		var input_elem = this._input_element;
		if (!input_elem) {
			return false;
		}

		var scroll_top = input_elem.getElementVScrollPos();
		var scroll_height = input_elem.getElementScrollHeight();
		var client_height = this._getClientHeight();

		if ((scroll_top + client_height >= scroll_height && delta < 0) || (scroll_top == 0 && delta > 0)) {
			return false;
		}
		return true;
	};

	_pTextArea.on_beforeinput_process_with_HTMLEvent = function (value, status, begin, end, inputType) {
		var input_elem = this._input_element;

		var update_value = value;
		var input_value = input_elem._getInputValue();
		var ret = [input_elem._BeforeinputState.PASS];
		var update_value_len = update_value ? update_value.length : 0;

		if (inputType == "deleteContentBackward" || inputType == "deleteContentForward" || inputType == "deleteByCut") {
			return ret;
		}

		if (this._inputtype_obj) {
			update_value = this._inputtype_obj.apply(update_value);
			if (value != update_value) {
				if (update_value && inputType == "insertFromPaste") {
					update_value_len = update_value.length;
					input_elem._beforeinput_result_data = update_value;
					input_elem._beforeinput_result_pos = {
						begin : begin + update_value_len, 
						end : begin + update_value_len
					};
					ret.push(input_elem._BeforeinputState.REPLACE);
				}
				else {
					ret.push(input_elem._BeforeinputState.CANCEL);
				}
			}
		}

		if (this._inputfilter_obj) {
			update_value = this._inputfilter_obj.apply(update_value);
			if (value != update_value) {
				if (update_value && inputType == "insertFromPaste") {
					update_value_len = update_value.length;
					input_elem._beforeinput_result_data = update_value;
					input_elem._beforeinput_result_pos = {
						begin : begin + update_value_len, 
						end : begin + update_value_len
					};
					ret.push(input_elem._BeforeinputState.REPLACE);
				}
				else {
					ret.push(input_elem._BeforeinputState.CANCEL);
				}
			}
		}

		if (inputType == "insertFromPaste") {
			if (update_value) {
				var maxlength = this.maxlength;
				update_value = update_value.replace(/&quot;/g, "\"");

				if (update_value.indexOf("\r\n") != -1 || update_value.indexOf("\n\r") != -1) {
					update_value = update_value.replace(/\r\n|\n\r/g, "\n");
				}

				if (update_value.indexOf("\r") != -1) {
					update_value = update_value.replace(/\r/g, "");
				}

				if (maxlength && begin + (input_value.length - end) + update_value_len > maxlength) {
					update_value = update_value.substring(0, maxlength - (begin + input_value.length - end));
				}

				input_elem._beforeinput_result_insert_data = update_value;

				update_value_len = update_value.length;
				update_value = input_value.substring(0, begin) + update_value + input_value.substring(end);
				input_elem._beforeinput_result_data = update_value;
				var pos = begin + update_value_len;
				input_elem._beforeinput_result_pos = {
					begin : pos, 
					end : pos
				};
				ret.push(input_elem._BeforeinputState.REPLACE);
			}
		}

		if (status == 0 || status == 3) {
			if (update_value) {
				switch (this.inputmode) {
					case "upper":
						ret.push(input_elem._BeforeinputState.CONVERT_UPPER);
						break;
					case "lower":
						ret.push(input_elem._BeforeinputState.CONVERT_LOWER);
						break;
				}
			}
		}

		if (this.maxlength > 0 && (status == 0 || status == 3)) {
			input_value = input_value ? input_value : input_elem._getInputValue();
			var check = input_elem._checkMaxLength(input_value + (update_value ? update_value : ""), end);
			if (check && check.ismax) {
				ret.push(input_elem._BeforeinputState.MAXLENGTH);
			}
		}

		if (this.maxlength > 0 && (status == 1 || status == 2)) {
			input_value = input_value ? input_value : input_elem._getInputValue();

			if (begin != end) {
				input_value = input_value.substring(0, begin);
			}
			if (inputType != "insertFromPaste") {
				update_value = input_value + update_value;
			}
			if (update_value.length > this.maxlength) {
				ret.push(input_elem._BeforeinputState.CANCEL);
				ret.push(input_elem._BeforeinputState.MAXLENGTH);
			}
		}
		return ret;
	};

	_pTextArea._beforeinput_process_with_HTMLEvent = function (value, status, begin, end, inputType) {
		var input_elem = this._input_element;
		if (input_elem) {
			return this.on_beforeinput_process_with_HTMLEvent.call(this, value, status, begin, end, inputType);
		}
	};

	_pTextArea.on_beforeinput_process_with_NexacroInputEvent = function (value, status, begin, end) {
		var input_elem = this._input_element;
		var bPaste = input_elem._paste_caret_pos ? true : false;
		var pre_value = input_elem.value;
		var input_text = value.substring(begin, end);
		if (input_text) {
			var update_value = input_text;
			if ((nexacro._is_hangul(update_value) || (status == nexacro._CompositionState.NONE || status == nexacro._CompositionState.END))) {
				if (this._inputtype_obj) {
					update_value = this._inputtype_obj.apply(update_value);
				}
				if (this._inputfilter_obj) {
					update_value = this._inputfilter_obj.apply(update_value);
				}
				if (this.inputmode == "upper") {
					update_value = update_value.toUpperCase();
				}
				else if (this.inputmode == "lower") {
					update_value = update_value.toLowerCase();
				}
			}

			if (update_value != input_text) {
				if (bPaste && !update_value) {
					var pre_value_length = pre_value ? pre_value.length : 0;
					var pos = begin + (input_text.length - (value.length - pre_value_length));
					input_elem.updateElementText(pre_value, pos);
				}
				else {
					input_elem.replaceElementText(update_value, begin, end);
				}
			}
		}
	};

	_pTextArea._beforeinput_process_with_NexacroInputEvent = function (value, status, begin, end) {
		var input_elem = this._input_element;
		if (input_elem) {
			return this.on_beforeinput_process_with_NexacroInputEvent.call(this, value, status, begin, end);
		}
	};

	_pTextArea._adjust_scrollPosition = function (input_elem, evt_name) {
		var h_pos = this.hscrollbar ? this.hscrollbar.pos : 0;
		var v_pos = this.vscrollbar ? this.vscrollbar.pos : 0;
		if (this._is_set_value && (evt_name == "tabkey" || evt_name == "shifttabkey" || (this.taborder == 0 && !this._is_subcontrol && evt_name != "lbuttondown" && evt_name != "lbutton"))) {
			if (!this._change_value && this._caret_pos == -1) {
				if (this.vscrollbar) {
					v_pos = 0;
				}
				if (this.hscrollbar) {
					h_pos = 0;
				}
			}
			else {
				if (this.vscrollbar) {
					v_pos = nexacro._getTextAreaElementVscrollPos(input_elem);
				}
				if (this.hscrollbar) {
					h_pos = nexacro._getTextAreaElementHscrollPos(input_elem);
				}
			}
		}
		var pThis = this;
		nexacro._OnceCallbackTimer.callonce(pThis, function () {
			if (pThis.hscrollbar) {
				pThis.hscrollbar.set_pos(h_pos);
			}
			if (pThis.vscrollbar) {
				pThis.vscrollbar.set_pos(v_pos);
			}
		});
		this._is_set_value = false;
	};



	_pTextArea._on_input_compositionend = function (value, _pos) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this._undostack) {
				var pos = _pos ? _pos : input_elem.getElementCaretPos();
				if (pos && pos != -1) {
					this._undostack.push(value, pos.begin, pos.end);
				}
				else {
					this._undostack.push(value, 0, 0);
				}
			}
		}
	};

	_pTextArea.on_apply_imeSet = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var i, len;
			var _locale = input_elem._imelocale.getLocale();
			if (_locale && nexacro._cache_textarea_set[_locale]) {
				for (var prop in nexacro._cache_textarea_set[_locale]) {
					this[prop] = nexacro._cache_textarea_set[_locale][prop];
				}

				for (i = 0, len = nexacro._edit_user_override_func.length; i < len; i++) {
					if (!nexacro._cache_textarea_set[_locale][nexacro._edit_user_override_func[i]]) {
						this[nexacro._edit_user_override_func[i]] = nexacro.TextArea.prototype[nexacro._edit_user_override_func[i]];
					}
				}
			}
			else {
				for (i = 0, len = nexacro._edit_user_override_func.length; i < len; i++) {
					this[nexacro._edit_user_override_func[i]] = nexacro.TextArea.prototype[nexacro._edit_user_override_func[i]];
				}
			}
		}
	};

	_pTextArea = null;
}
