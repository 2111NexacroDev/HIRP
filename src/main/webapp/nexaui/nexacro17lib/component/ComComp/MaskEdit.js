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

if (!nexacro.MaskEdit) {
	nexacro.MaskEdit = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._onlydisplay = onlydisplay;

		if (onlydisplay) {
			this._apply_client_padding = true;
			this.readonly = true;
		}
	};

	var _pMaskEdit = nexacro._createPrototype(nexacro.Component, nexacro.MaskEdit);
	nexacro.MaskEdit.prototype = _pMaskEdit;
	_pMaskEdit._type_name = "MaskEdit";


	_pMaskEdit.value = undefined;
	_pMaskEdit.displaynulltext = "";
	_pMaskEdit.displayinvalidtext = "invalid value";
	_pMaskEdit.readonly = false;
	_pMaskEdit.autoselect = false;
	_pMaskEdit.autoskip = false;
	_pMaskEdit.type = "number";
	_pMaskEdit.trimtype = "none";
	_pMaskEdit.limitbymask = "decimal";
	_pMaskEdit.clipmode = "includespace";
	_pMaskEdit.format = "";
	_pMaskEdit.maskchar = "_";
	_pMaskEdit.text = "";
	_pMaskEdit.usecontextmenu = true;
	_pMaskEdit.locale = "";
	_pMaskEdit.usesoftkeyboard = true;
	_pMaskEdit.postfixtext = "";
	_pMaskEdit.imeaction = "none";


	_pMaskEdit._input_element = null;

	_pMaskEdit._masktypeobj = null;
	_pMaskEdit._undostack = null;

	_pMaskEdit._default_value = undefined;
	_pMaskEdit._default_text = "";
	_pMaskEdit._locale = "";
	_pMaskEdit._imedisable = true;

	_pMaskEdit._processing_updateToDataset = false;
	_pMaskEdit._result_updateToDataset = true;
	_pMaskEdit._processing_canchange = false;

	_pMaskEdit._onlydisplay = false;
	_pMaskEdit._apply_client_padding = false;
	_pMaskEdit._has_inputElement = true;
	_pMaskEdit._processing_autoskip = false;


	_pMaskEdit._is_simple_control = true;
	_pMaskEdit._is_editable_control = true;
	_pMaskEdit._is_locale_control = true;
	_pMaskEdit._use_readonly_status = true;

	_pMaskEdit._caret_pos = -1;

	_pMaskEdit._event_list = {
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
		"onimeaction" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};


	_pMaskEdit.accessibilityrole = "edit";

	_pMaskEdit.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var input_elem;
			if (!this._onlydisplay) {
				input_elem = this._input_element = new nexacro.InputElement(control, "input");
				input_elem.setElementAutoSkip(this.autoskip);
				input_elem.setElementAutoSelect(this.autoselect);
				input_elem.setElementUseIme("none");
				input_elem.setElementImeMode("disabled");
				input_elem.setElementImeAction(this.imeaction);
				input_elem.setElementReadonly(this.readonly);
			}
			else {
				input_elem = this._input_element = new nexacro.TextBoxElement(control, "input");
				input_elem.setElementVerticalAlign("middle");
			}

			input_elem.setElementPosition(this._getClientLeft(), this._getClientTop());
			input_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			input_elem.setElementTextDecoration(this._textdecoration);
			input_elem.setElementTextAlign(this.textAlign);
			input_elem.setElementPadding(this.padding);

			this._undostack = new nexacro._EditUndoStack(this);

			if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
				this._imedisable = false;
			}
		}
	};

	_pMaskEdit.on_created_contents = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_type(this.type);
			this.on_apply_limitbymask(this.limitbymask);
			this.on_apply_clipmode(this.clipmode);
			this.on_apply_maskchar(this.maskchar);
			this._on_apply_format(this.format);
			this.on_apply_locale(this._getLocale());
			this.on_apply_postfixtext(this.postfixtext);
			this.on_apply_value(this.value);

			input_elem.create(win);

			this.on_apply_displaynulltext(this.displaynulltext);
			this.on_apply_displayinvalidtext(this.displayinvalidtext);

			this.set_usesoftkeyboard(this.usesoftkeyboard, true);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			else {
				this._changeUserStatus("nulltext", false);
				if (this._isInvalidValue(this.value)) {
					this._changeUserStatus("invalidtext", true);
				}
				else {
					this._changeUserStatus("invalidtext", false);
				}
			}
		}
	};

	_pMaskEdit.on_destroy_contents = function () {
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

		var masktypeobj = this._masktypeobj;
		if (masktypeobj) {
			this._masktypeobj = null;
		}
	};

	_pMaskEdit.on_create_contents_command = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_type(this.type);
			this.on_apply_limitbymask(this.limitbymask);
			this.on_apply_clipmode(this.clipmode);
			this.on_apply_maskchar(this.maskchar);
			this._on_apply_format(this.format);
			this.on_apply_locale(this._getLocale());
			this.on_apply_postfixtext(this.postfixtext);
			this.on_apply_value(this.value);
			this.on_apply_prop_enable(this._real_enable);

			return input_elem.createCommand();
		}

		return "";
	};

	_pMaskEdit.on_attach_contents_handle = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.attachHandle(win);

			this.on_apply_displaynulltext(this.displaynulltext);
			this.on_apply_displayinvalidtext(this.displayinvalidtext);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			else {
				this._changeUserStatus("nulltext", false);
				if (this._isInvalidValue(this.value)) {
					this._changeUserStatus("invalidtext", true);
				}
				else {
					this._changeUserStatus("invalidtext", false);
				}
			}
		}
	};

	_pMaskEdit.on_change_containerRect = function (width, height) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSize(width, height);
		}
	};

	_pMaskEdit.on_change_containerPos = function (left, top) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementPosition(left, top);
		}
	};

	_pMaskEdit._apply_setfocus = function (evt_name) {
		this._processing_updateToDataset = false;

		var input_elem = this._input_element;
		if (input_elem) {
			var value = this.value;
			var text = "";
			var emptytext = "";

			var maskobj = this._getMaskObj();
			if (maskobj) {
				if (!this._onlydisplay) {
					maskobj.setEditStatus(true);
				}

				emptytext = this._getEmptyText();
				if (this._isInvalidValue(value)) {
					text = maskobj.applyMask("");
				}
				else {
					text = maskobj.applyMask(value);
				}

				if (evt_name) {
					this._default_value = value;
					this._default_text = text;
				}

				if (!this._onlydisplay) {
					this._changeUserStatus("nulltext", false);
					this._changeUserStatus("invalidtext", false);

					if (nexacro._isNull(value)) {
						input_elem.setElementDefaultValue(emptytext);
						input_elem.setElementValue(null);
					}
					else {
						if (this._isInvalidValue(value)) {
							input_elem.setElementDefaultValue(emptytext);
						}

						input_elem.setElementValue(text);
					}
				}
			}

			if (!this._onlydisplay) {
				input_elem.setElementFocus(evt_name);

				text = input_elem.getElementText();
				if (text != this.text) {
					this._default_text = this.text = text;
				}
			}
		}
	};

	_pMaskEdit.on_getBindableProperties = function () {
		return "value";
	};

	_pMaskEdit.on_apply_prop_enable = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			var color = this._getCSSStyleValue("color");

			if (!this._onlydisplay) {
				input_elem.setElementEnable(v, color);
			}
		}
	};

	_pMaskEdit.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			if (this._undostack) {
				this._undostack.clear();
			}

			this._setValue(undefined);
		}
	};

	_pMaskEdit.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var v = ds.getColumn(row, col);
			v = this._convertValueType(v, true);

			if (v === this.value) {
				return;
			}

			if (this._undostack) {
				this._undostack.clear();
			}

			this._setValue(v);
		}
	};

	_pMaskEdit.on_changeUserStatus = function (changestatus, value, applyuserstatus) {
		if (value) {
			return changestatus;
		}
		else {
			return applyuserstatus;
		}
	};

	_pMaskEdit._getDlgCode = function () {
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	_pMaskEdit._getDragData = function () {
		return this.getSelectedText();
	};

	_pMaskEdit.on_get_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pMaskEdit._on_getAccessibilityAdditionalLabel = function () {
		var input_elem = this._input_element;
		if (input_elem && input_elem._wantAccessibilityAdditionalLabel) {
			if (input_elem._wantAccessibilityAdditionalLabel()) {
				if (this.text !== undefined && this.value !== undefined) {
					return this.text;
				}
			}
		}
		if (!this.text) {
			return this.displaynulltext ? this.displaynulltext : "";
		}
		return "";
	};

	_pMaskEdit._on_getFitSize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var text;
			if (this._displaytext && this._displaytext !== "") {
				text = this._displaytext;
			}
			else {
				text = this.text;
			}
			if (text) {
				var font = this._getCurrentStyleInheritValue("font");
				var wordspace = this._getCurrentStyleInheritValue("wordSpacing");
				var letterspace = this._getCurrentStyleInheritValue("letterSpacing");

				var text_size = nexacro._getTextSize(this.text, font, false, undefined, "none", wordspace, letterspace);

				total_w += Math.ceil(text_size[0]);
				total_h += Math.ceil(text_size[1]);
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pMaskEdit.set_text = nexacro._emptyFn;

	_pMaskEdit.set_value = function (v) {
		v = this._convertValueType(v);
		if (this.value !== v) {
			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			this._setValue(v);
			this._updateAccessibilityLabel();
		}
	};

	_pMaskEdit.on_apply_value = function (value) {
		var input_elem = this._input_element;
		var text;
		var is_invalidvalue = false;
		if (input_elem) {
			text = this.text;
			is_invalidvalue = this._isInvalidValue(value);
			if (this._is_created) {
				if (nexacro._isNull(value)) {
					this._changeUserStatus("nulltext", true);
				}
				else {
					this._changeUserStatus("nulltext", false);
					if (is_invalidvalue) {
						this._changeUserStatus("invalidtext", true);
					}
					else {
						this._changeUserStatus("invalidtext", false);
					}
				}
			}
			else {
				this._changeUserStatus("nulltext", false);
				this._changeUserStatus("invalidtext", false);
			}


			var maskobj = this._getMaskObj();
			if (maskobj) {
				if (is_invalidvalue) {
					text = this.text = maskobj.applyMask("");
				}
				else {
					text = this.text = maskobj.applyMask(value);
				}
			}

			if (!this._onlydisplay) {
				var pos = input_elem.getElementCaretPos();
				if (this._undostack) {
					if (pos && pos != -1) {
						this._undostack.push(text, pos.begin, pos.end);
					}
					else {
						this._undostack.push(text, 0, 0);
					}
				}

				if (nexacro._isNull(value)) {
					input_elem.setElementDefaultValue(text);
					if (is_invalidvalue) {
						input_elem.setElementValue(text, is_invalidvalue);
					}
					else {
						input_elem.setElementValue(value, is_invalidvalue);
					}
				}
				else {
					input_elem.setElementValue(text, is_invalidvalue);
				}

				this._displaytext = input_elem.getElementText();
				input_elem.setElementSetSelect((pos && pos != -1) ? pos.begin : 0, pos ? pos.end : 0);
			}
			else {
				if (this.displaynulltext && nexacro._isNull(value)) {
					input_elem.setElementText(this.displaynulltext);
				}
				else {
					if (this._isInvalidValue(value)) {
						text = this.displayinvalidtext;
					}

					input_elem.setElementText(text);
				}
			}

			if (this.text != text) {
				this.text = text;
			}

			this._default_value = this.value;
			this._default_text = this.text;
		}
	};

	_pMaskEdit.set_displaynulltext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pMaskEdit.on_apply_displaynulltext = function (displaynulltext) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this._onlydisplay) {
				this.on_apply_value(this.value);
			}
			else {
				if (displaynulltext == "") {
					input_elem.setElementDisplayNullText(displaynulltext, this._getEmptyText());
				}
				else {
					input_elem.setElementDisplayNullText(displaynulltext);
				}
				this._displaytext = input_elem.getElementText();
			}
		}
	};

	_pMaskEdit.set_displayinvalidtext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displayinvalidtext != v) {
			this.displayinvalidtext = v;
			this.on_apply_displayinvalidtext(v);
		}
	};

	_pMaskEdit.on_apply_displayinvalidtext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");

		var input_elem = this._input_element;
		if (input_elem) {
			if (this._onlydisplay) {
				this.on_apply_value(this.value);
			}
			else {
				input_elem.setElementDisplayInvalidText(v);
				this._displaytext = input_elem.getElementText();
			}
		}
	};

	_pMaskEdit.set_readonly = function (v) {
		if (this._onlydisplay) {
			return;
		}

		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pMaskEdit.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementReadonly(readonly);
			}
		}
	};

	_pMaskEdit.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoselect != v) {
			this.autoselect = v;
			this.on_apply_autoselect(v);
		}
	};

	_pMaskEdit.on_apply_autoselect = function (autoselect) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementAutoSelect(autoselect);
		}
	};

	_pMaskEdit.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoskip != v) {
			this.autoskip = v;
			this.on_apply_autoskip(v);
		}
	};

	_pMaskEdit.on_apply_autoskip = function (autoskip) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementAutoSkip(autoskip);
		}
	};

	_pMaskEdit.set_clipmode = function (v) {
		var clipmode_enum = ["includespace", "excludespace"];
		if (clipmode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.clipmode != v) {
			this.clipmode = v;
			this.on_apply_clipmode(v);
		}
	};

	_pMaskEdit.on_apply_clipmode = function (clipmode) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			if (this.type == "string") {
				if (clipmode == "includespace") {
					maskobj.setFillChar(' ');
				}
				else {
					maskobj.setFillChar('');
				}
			}
		}
	};

	_pMaskEdit.set_limitbymask = function (v) {
		var limitbymask_enum = ["none", "integer", "decimal", "both"];
		if (limitbymask_enum.indexOf(v) == -1) {
			return;
		}

		if (this.limitbymask != v) {
			this.limitbymask = v;
			this.on_apply_limitbymask(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit.on_apply_limitbymask = function (limitbymask) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			if (this.type == "number") {
				maskobj.setLimitType(limitbymask);
			}
		}
	};

	_pMaskEdit.set_format = function (v) {
		v = nexacro._toString(v);
		if (this.format != v) {
			this.format = v;
			this._on_apply_format(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit._on_apply_format = function (mask) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			mask = mask ? mask.replace(/^\s\s*/, '') : "";
			maskobj.setMask(mask);

			this._on_apply_inputtype();
		}
	};

	_pMaskEdit.set_maskchar = function (v) {
		v = nexacro._toString(v);
		if (v == "") {
			v = "_";
		}

		if (this.maskchar != v) {
			this.maskchar = v;
			this.on_apply_maskchar(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit.on_apply_maskchar = function (maskchar) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			maskobj.setMaskChar(maskchar);
		}
	};

	_pMaskEdit.set_trimtype = function (v) {
		var trimtype_enum = ["none", "left", "right", "both"];
		if (trimtype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.trimtype != v) {
			this.trimtype = v;
		}
	};

	_pMaskEdit.set_type = function (v) {
		var type_enum = ["number", "string"];
		if (type_enum.indexOf(v) == -1) {
			return;
		}

		if (this.type != v) {
			this.type = v;
			this.on_apply_type(v);

			this.on_apply_limitbymask(this.limitbymask);
			this.on_apply_maskchar(this.maskchar);
			this.on_apply_clipmode(this.clipmode);
			this._on_apply_format(this.format);
			this.on_apply_locale(this._getLocale());
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit.on_apply_type = function (type) {
		this._masktypeobj = null;

		if (type == "number") {
			this._masktypeobj = new nexacro._EditMaskTypeNumber();
		}
		else if (type == "string") {
			this._masktypeobj = new nexacro._EditMaskTypeString();
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (type == "number") {
				input_elem.setElementTextAlignByClassCSSSelector("right");
			}
			else {
				input_elem.setElementTextAlignByClassCSSSelector("left");
			}
		}
	};

	_pMaskEdit.set_locale = function (v) {
		if (this.locale != v) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit.on_apply_locale = function (locale) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			maskobj.setLocale(locale);
		}
	};

	_pMaskEdit.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pMaskEdit.on_apply_usesoftkeyboard = function (bforce) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementUseSoftKeyboard(this.usesoftkeyboard, bforce);
		}
	};

	_pMaskEdit.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
		}
	};

	_pMaskEdit.set_cursor = function (v) {
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

	_pMaskEdit.on_apply_textAlign = function (halign) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextAlign(halign);
		}
	};

	_pMaskEdit.on_apply_padding = function (padding) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementPadding(padding);
		}
	};

	_pMaskEdit.on_apply_textDecoration = function (textDecoration) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextDecoration(textDecoration);
		}
	};

	_pMaskEdit.set_postfixtext = function (v) {
		v = nexacro._toString(v);

		if (this.postfixtext != v) {
			this.postfixtext = v;
			this.on_apply_postfixtext(v);
		}
	};

	_pMaskEdit.on_apply_postfixtext = function (v) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			maskobj.setPostfixtext(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit.set_imeaction = function (v) {
		if (v) {
			var imeaction_arr = v.split(',');
			var imeaction_enum = ["none", "done", "go", "search", "send", "next", "previous"];
			for (var i = 0, len = imeaction_arr.length; i < len; i++) {
				if (imeaction_enum.indexOf(imeaction_arr[i]) == -1) {
					return;
				}
			}
		}
		else {
			return;
		}

		if (this.imeaction != v) {
			this.imeaction = v;
			this.on_apply_imeaction(v);
		}
	};

	_pMaskEdit.on_apply_imeaction = function (imeaction) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementImeAction(imeaction);
		}
	};

	_pMaskEdit.getLength = function () {
		var val = this.value;

		if (this.type == "number") {
			var regExp = /[.,\-+]/gi;
			if (regExp.test(val)) {
				val = val.replace(regExp, "");
			}
		}

		return val ? val.length : 0;
	};

	_pMaskEdit.getCaretPos = function () {
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

	_pMaskEdit.setCaretPos = function (v) {
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
			}

			return true;
		}

		return false;
	};

	_pMaskEdit.getSelect = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				return input_elem.getElementSelectionRange();
			}
		}
		return [0, 0];
	};

	_pMaskEdit.setSelect = function (start, end) {
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

	_pMaskEdit.getSelectedText = function () {
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

	_pMaskEdit.updateToDataset = function () {
		this._result_updateToDataset = this.applyto_bindSource("value", this.value);
		if (this._result_updateToDataset) {
			this._default_value = this.value;
			this._default_text = this.text;
		}
		this._processing_updateToDataset = true;

		return this._result_updateToDataset;
	};

	_pMaskEdit._on_value_change = function (pretext, prevalue, posttext, postvalue) {
		var ret = true;
		if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue)) {
			ret = false;
		}

		if (ret) {
			this._default_value = postvalue;
			this._default_text = posttext;

			if (this._processing_updateToDataset && !this._result_updateToDataset && prevalue === postvalue) {
				this._processing_updateToDataset = false;
				this._result_updateToDataset = true;
				return false;
			}
			else if (!this.applyto_bindSource("value", postvalue)) {
				ret = false;
			}

			if (ret) {
				this._default_text = posttext;
				if (this.text != posttext) {
					var input_elem = this._input_element;
					var pos = input_elem.getElementCaretPos();

					input_elem.setElementValue(posttext);
					input_elem.setElementSetSelect(pos.begin, pos.end);
				}
				this.text = posttext;
				this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);
				this._updateAccessibilityLabel();
			}
		}

		if (!ret) {
			this._default_value = prevalue;
			this._default_text = pretext;
		}
		return ret;
	};

	_pMaskEdit._on_input_undo = function (item) {
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

	_pMaskEdit._on_input_redo = function (item) {
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

	_pMaskEdit._on_input_autoskip = function () {
		var maskobj = this._getMaskObj();
		if (maskobj) {
			if (this.autoskip && maskobj.isFilled()) {
				this._setFocusToNextComponent();
			}
		}
	};

	_pMaskEdit.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		if (nexacro._OS == "Mac OS" || nexacro._OS == "OSX" || nexacro._OS == "iOS") {
			ctrl_key = meta_key;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!alt_key && !shift_key && ctrl_key && keycode == 90) {
				if (this._undostack) {
					this._undostack.undo();
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

			if (this._undostack) {
				var pos = input_elem.getElementCaretPos();
				if (pos && pos != -1) {
					this._undostack.update(pos.begin, pos.end);
				}
			}
		}
	};

	_pMaskEdit.on_keydown_default_action = function (keycode) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var maskobj = this._getMaskObj();

			var input_value = input_elem.value;
			var pos = input_elem.getElementCaretPos();
			var idx, ch;

			if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) {
				var input_handle = input_elem.handle;

				if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
					input_handle.blur();
					input_handle.focus();
				}
				input_elem.stopSysEvent();
			}
			else if (keycode == nexacro.Event.KEY_RETURN) {
				var pre_value = this._default_value;
				var pre_text = this._default_text;

				var cur_value = this.value;
				var cur_text = this.text;

				if (maskobj && this.type == "string") {
					cur_text = maskobj.applyMask(cur_value);
				}

				if (pre_value != cur_value || cur_text != pre_text) {
					if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
						this.value = pre_value;
						this.text = pre_text;
					}

					input_elem.setElementValue(this.text);
				}
			}
			else if (keycode == nexacro.Event.KEY_BACKSPACE) {
				if (maskobj && input_value) {
					if (pos.end > 0 && pos.begin == pos.end) {
						idx = pos.end - 1;
						while ((ch = input_value.charAt(idx))) {
							if (maskobj.isDeletableChar(ch, idx) || idx == 0) {
								break;
							}
							idx--;
						}
						if (idx != (pos.end - 1)) {
							input_elem.setElementSetSelect(idx + 1, idx + 1);
						}
					}
				}
			}
			else if (keycode == nexacro.Event.KEY_DEL) {
				if (maskobj && input_value) {
					var len = input_value.length;
					if (pos.end < len && pos.begin == pos.end) {
						idx = pos.end;
						while ((ch = input_value.charAt(idx))) {
							if (maskobj.isDeletableChar(ch, idx) || idx == len) {
								break;
							}
							idx++;
						}
						if (idx != pos.end) {
							input_elem.setElementSetSelect(idx, idx);
						}
					}
				}
			}
		}
	};

	_pMaskEdit.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (keycode == nexacro.Event.KEY_TAB) {
				if (!this._getDlgCode().want_tab) {
					input_elem.stopSysEvent();
					return;
				}
			}

			if (keycode !== 0 && charcode === 0) {
				return true;
			}
			else {
				if (keycode == nexacro.Event.KEY_ENTER || keycode == nexacro.Event.KEY_ESC) {
					return true;
				}
			}

			charcode = charcode || keycode;
			if (!ctrl_key && !alt_key && charcode) {
				var input_char = String.fromCharCode(charcode);
				if (input_char.length > 0) {
					var maskobj = this._getMaskObj();
					var pos = input_elem.getElementCaretPos();
					var input_pos = maskobj.findNearEditablePos(pos.begin, 1);
					if (input_pos < 0 || maskobj.isFilterChar(input_char, input_pos, pos.end)) {
						input_elem.stopSysEvent();
						this._on_input_autoskip();
						return;
					}

					maskobj.keyPressed(input_char, input_pos);
				}
			}
		}
	};

	_pMaskEdit.on_beforekeyinput_basic_action = function (value, status, begin, end, inputType) {
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

	_pMaskEdit.on_keyinput_basic_action = function () {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var input_value = input_elem.value;
			var input_text = input_value ? input_value : "";

			var maskobj = this._getMaskObj();
			if (maskobj) {
				input_value = maskobj.removeMask(input_text);
			}

			if (this.clipmode == "includespace") {
				var trimtype = this.trimtype;
				if (trimtype == "both") {
					input_value = input_value.replace(/^\s+|\s+$/g, "");
				}
				else if (trimtype == "left") {
					input_value = input_value.replace(/^\s+/, "");
				}
				else if (trimtype == "right") {
					input_value = input_value.replace(/\s+$/, "");
				}
			}
			if (!input_value && !this._default_value && !this._default_text) {
				this.value = this._default_value;
			}
			else {
				this.value = input_value;
			}
			this.text = input_text;

			if (this._undostack) {
				var pos = input_elem.getElementCaretPos();
				if (pos && pos != -1) {
					this._undostack.push(input_text, pos.begin, pos.end);
				}
				else {
					this._undostack.push(input_text, 0, 0);
				}
			}
		}
	};

	_pMaskEdit.on_keyinput_default_action = function () {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			this._on_input_autoskip();
		}
	};

	_pMaskEdit.on_killfocus_basic_action = function (new_focus, new_refer_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		var root_comp = this._getRootComponent(this);
		if (root_comp == new_focus) {
			if (this.parent && (!this.parent._is_subcontrol || this.parent == new_refer_focus.parent)) {
				return;
			}
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var maskobj = this._getMaskObj();
			var pre_value = this._default_value;
			var pre_text = this._default_text;

			var cur_value = this.value;
			var cur_text = maskobj ? maskobj.applyMask(cur_value) : this.text;

			if (pre_value != cur_value || cur_text != pre_text) {
				if (!this._processing_canchange) {
					if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
						this.value = pre_value;
					}
				}
			}

			this._caret_pos = input_elem.getElementCaretPos();

			cur_value = this.value;

			var is_invalidvalue = this._isInvalidValue(cur_value);
			if (maskobj) {
				maskobj.setEditStatus(false);
				if (is_invalidvalue) {
					cur_text = maskobj.applyMask("");
				}
				else {
					cur_text = maskobj.applyMask(cur_value);
				}

				this.text = cur_text;

				if (!this._onlydisplay) {
					if (nexacro._isNull(cur_value)) {
						input_elem.setElementDefaultValue(cur_text);
						cur_text = cur_value;
					}

					input_elem.setElementValue(cur_text, is_invalidvalue);
				}
				else {
					if (this.displaynulltext && nexacro._isNull(cur_value)) {
						input_elem.setElementText(this.displaynulltext);
					}
					else {
						if (this.displayinvalidtext && is_invalidvalue) {
							input_elem.setElementText(this.displayinvalidtext);
						}
						else {
							input_elem.setElementText(cur_text);
						}
					}
				}
			}

			if (!this._onlydisplay) {
				if (nexacro._isNull(this.value)) {
					this._changeUserStatus("nulltext", true);
				}
				else {
					this._changeUserStatus("nulltext", false);
					if (this._isInvalidValue(this.value)) {
						this._changeUserStatus("invalidtext", true);
					}
					else {
						this._changeUserStatus("invalidtext", false);
					}
				}

				var _sel = input_elem.getElementSelectionRange();
				if (_sel[0] == _sel[1]) {
					input_elem._setElementLastSelectionRange();
				}

				if (nexacro._enableaccessibility && nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5) {
					this._setAccessibilityStatKillFocus();
				}

				var _win = this._getRootWindow();
				var idx = _win._indexOfCurrentFocusPaths(this);
				if (idx < 0) {
					input_elem.setElementBlur();
				}
			}
		}
	};

	_pMaskEdit.on_click_basic_action = function (elem, button) {
		var input_elem = this._input_element;
		if (input_elem) {
			var _window = this._getWindow();
			if (_window && this._track_capture) {
				var capture_comp = _window._getCaptureComp(true, false, this);
				if (!this._onlydisplay && (!capture_comp || capture_comp == this)) {
					input_elem.setElementFocus(button);
				}
			}
		}
	};

	_pMaskEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var caretpos = this.getCaretPos();
			var clientXY = this._getClientXY(canvasX, canvasY);

			var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key);
			return this.oneditclick._fireEvent(this, evt);
		}
		return true;
	};

	_pMaskEdit.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pMaskEdit.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "canchange", pretext, prevalue, posttext, postvalue);

			this._processing_canchange = true;
			var ret = this.canchange._fireCheckEvent(this, evt);
			this._processing_canchange = false;

			return ret;
		}

		return true;
	};

	_pMaskEdit.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};

	_pMaskEdit._convertValueType = function (v, bapplyrule) {
		if (nexacro._isNull(v)) {
			return v;
		}

		var ret;
		var datatyperule = nexacro._getDatatypeRule();

		if (bapplyrule) {
			if (datatyperule == "1.0") {
				return v;
			}
		}

		ret = nexacro._toString(v).replace(/&quot;/g, "\"");

		return ret;
	};

	_pMaskEdit._setValue = function (v) {
		var text = "";
		if (!nexacro._isNull(v)) {
			text = nexacro._toString(v);
		}

		this.text = text;
		this.value = v;

		this.on_apply_value(v);
	};

	_pMaskEdit._setLocale = function (v) {
		if (!this.locale && v != this._locale) {
			this._locale = v;
			this.on_apply_locale(v);
			this.on_apply_value(this.value);
		}
	};

	_pMaskEdit._setEnableView = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementEnable(v);
			}
		}
	};

	_pMaskEdit._setDefaultCaret = nexacro._emptyFn;

	_pMaskEdit._setFocusToNextComponent = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._getForm()._getNextComponent(root_comp, true, true);
		if (next_comp) {
			next_comp.setFocus();
			if (!next_comp.autoselect && next_comp._is_editable_control) {
				next_comp._setDefaultCaret();
			}
		}
	};

	_pMaskEdit._on_apply_inputtype = function () {
		var maskobj = this._getMaskObj();
		var input_elem = this._input_element;
		if (maskobj && input_elem) {
			var mode = maskobj.getInputMode();

			if (!this._onlydisplay) {
				input_elem.setElementInputType(mode, true);
			}
		}
	};

	_pMaskEdit._getMaskObj = function () {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			return maskobj;
		}

		return null;
	};

	_pMaskEdit._getEmptyText = function () {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			return maskobj.applyMask("");
		}

		return "";
	};

	_pMaskEdit._beforeinput_process_with_HTMLEvent = function (value, status, begin, end, inputType) {
		var input_elem = this._input_element;
		var maskobj = this._getMaskObj();
		var ret = [];

		if (maskobj) {
			var input_value = input_elem._getInputValue();
			var front_text, rear_text, update_value, result, input_pos;

			switch (inputType) {
				case "deleteContentBackward":
					if (begin == end) {
						front_text = input_value.substring(0, begin - 1);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						result = maskobj.arrangeMask(update_value, begin - 1, begin - 1);

						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					else {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						if ((end - begin == input_value.length)) {
							input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
							input_elem._beforeinput_result_pos = {
								begin : begin, 
								end : begin
							};
						}
						else {
							result = maskobj.arrangeMask(update_value, begin, begin);

							input_elem._beforeinput_result_data = result.text;
							input_elem._beforeinput_result_pos = {
								begin : result.pos, 
								end : result.pos
							};
						}
					}

					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "deleteContentForward":
					if (begin == end) {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end + 1);

						update_value = front_text + rear_text;
						result = maskobj.arrangeMask(update_value, begin, begin);

						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					else {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						if ((end - begin == input_value.length)) {
							input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
							input_elem._beforeinput_result_pos = {
								begin : begin, 
								end : begin
							};
						}
						else {
							result = maskobj.arrangeMask(update_value, begin, begin);

							input_elem._beforeinput_result_data = result.text;
							input_elem._beforeinput_result_pos = {
								begin : result.pos, 
								end : result.pos
							};
						}
					}

					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "deleteByCut":
					front_text = input_value.substring(0, begin);
					rear_text = input_value.substring(end);

					update_value = front_text + rear_text;
					if ((end - begin == input_value.length)) {
						input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
						input_elem._beforeinput_result_pos = {
							begin : begin, 
							end : begin
						};
					}
					else {
						result = maskobj.arrangeMask(update_value, begin, begin);

						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "insertText":
				case "insertCompositionText":
					value = value ? value : "";
					input_pos = maskobj.findNearEditablePos(begin, 1);
					if (input_pos < 0 || maskobj.isFilterChar(value, input_pos)) {
						ret.push(input_elem._BeforeinputState.CANCEL);
					}
					else {
						if (this.type == "number") {
							update_value = input_value.substring(0, begin) + value + input_value.substring(end);
							result = maskobj.arrangeMask(update_value, begin, end + value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else if (result.text != update_value) {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : result.pos, 
									end : result.pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
							else {
								ret.push(input_elem._BeforeinputState.PASS);
							}
						}
						else {
							if (begin == end) {
								update_value = input_value.substring(0, begin) + value + input_value.substring(end);
								end = end + value.length;
							}
							else {
								update_value = input_value.substring(0, begin) + value + input_value.substring(end, input_value.length);
								end = begin + value.length;
							}

							result = maskobj.arrangeMask(update_value, begin, end);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_pos = maskobj.findNearEditablePos(result.pos, 1);

								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : input_pos, 
									end : input_pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
					}
					break;
				case "insertFromPaste":
					input_pos = maskobj.findNearEditablePos(begin, 1);
					if (input_pos < 0 || maskobj.isFilterChar(value, input_pos)) {
						ret.push(input_elem._BeforeinputState.CANCEL);
					}
					else {
						if (this.type == "number") {
							update_value = input_value.substring(0, begin) + value + input_value.substring(end);
							result = maskobj.arrangeMask(update_value, begin, end + value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else if (result.text != update_value) {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : result.pos, 
									end : result.pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
							else {
								ret.push(input_elem._BeforeinputState.PASS);
							}
						}
						else {
							if (begin == end) {
								update_value = input_value.substring(0, begin) + value + input_value.substring(end);
								end = end + value.length;
							}
							else {
								update_value = input_value.substring(0, begin) + value + input_value.substring(begin);
								end = begin + value.length;
							}

							result = maskobj.arrangeMask(update_value, begin, end);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_pos = maskobj.findNearEditablePos(result.pos, 1);

								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : input_pos, 
									end : input_pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
					}
					break;
				default:
					ret.push(input_elem._BeforeinputState.PASS);
					break;
			}
		}

		return ret;
	};

	_pMaskEdit._beforeinput_process_with_NexacroInputEvent = function (value, status, begin, end) {
		var input_elem = this._input_element;
		var bPaste = input_elem._paste_caret_pos ? true : false;
		var input_text = value ? value : "";

		var maskobj = this._getMaskObj();
		if (maskobj) {
			var result = maskobj.arrangeMask(input_text, begin, end);
			if (result == null) {
				input_elem.replaceElementText("", begin, end);
				input_elem.stopSysEvent();
			}
			else {
				var input_pos = maskobj.findNearEditablePos(result.pos, 1);

				if (bPaste && result.text == this.text) {
					input_elem._event_stop = true;
					input_pos = begin;
				}

				if (result.text != input_text || result.pos != input_pos) {
					input_elem.updateElementText(result.text, input_pos);
				}

				if (result.text == this.text) {
					var input_value = maskobj.removeMask(result.text);

					if (this.clipmode == "includespace") {
						var trimtype = this.trimtype;
						if (trimtype == "both") {
							input_value = input_value.replace(/^\s+|\s+$/g, "");
						}
						else if (trimtype == "left") {
							input_value = input_value.replace(/^\s+/, "");
						}
						else if (trimtype == "right") {
							input_value = input_value.replace(/\s+$/, "");
						}
					}

					this.value = input_value;
				}
			}
		}
	};

	_pMaskEdit._isInvalidValue = function (v) {
		if (nexacro._isNull(v) || v === "") {
			return false;
		}


		if (this.type == "number") {
			if (!isFinite(+v) || isNaN(+v)) {
				return true;
			}
		}
		else {
			v = v + "";

			var maskobj = this._getMaskObj();

			if (maskobj) {
				maskobj.applyMask(v);
				if (maskobj._is_mismatch) {
					return true;
				}
			}
		}

		return false;
	};


	_pMaskEdit._on_input_compositionend = function (value) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this._undostack) {
				var pos = input_elem.getElementCaretPos();
				if (pos && pos != -1) {
					this._undostack.push(value, pos.begin, pos.end);
				}
				else {
					this._undostack.push(value, 0, 0);
				}
			}
		}
	};
	_pMaskEdit = null;
}
