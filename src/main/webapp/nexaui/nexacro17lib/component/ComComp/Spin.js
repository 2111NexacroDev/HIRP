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

if (!nexacro.Spin) {
	nexacro.SpinEventInfo = function (obj, id, beforeText, beforeValue, afterText, afterValue, isUp) {
		this.id = this.eventid = id || "onspin";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = beforeText;
		this.prevalue = beforeValue;
		this.posttext = afterText;
		this.postvalue = afterValue;
		this.up = isUp;
	};

	var _pSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SpinEventInfo);
	nexacro.SpinEventInfo.prototype = _pSpinEventInfo;
	_pSpinEventInfo._type_name = "SpinEventInfo";

	delete _pSpinEventInfo;
	_pSpinEventInfo = null;

	nexacro.Spin = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pSpin = nexacro._createPrototype(nexacro.Component, nexacro.Spin);
	nexacro.Spin.prototype = _pSpin;
	_pSpin._type_name = "Spin";


	_pSpin.spinedit = null;
	_pSpin.spinupbutton = null;
	_pSpin.spindownbutton = null;


	_pSpin.buttonposition = "right";
	_pSpin.buttonsize = undefined;
	_pSpin.circulation = false;
	_pSpin.displaycomma = false;
	_pSpin.displaynulltext = "";
	_pSpin.displayinvalidtext = "invalid value";
	_pSpin.increment = 1;
	_pSpin.locale = "";
	_pSpin.max = 10000;
	_pSpin.min = 0;
	_pSpin.readonly = false;
	_pSpin.text = "";
	_pSpin.type = "normal";
	_pSpin.usecontextmenu = true;
	_pSpin.value = undefined;
	_pSpin.usesoftkeyboard = true;


	_pSpin._default_value = undefined;
	_pSpin._default_text = "";
	_pSpin._default_mask = "9.9";
	_pSpin._default_commamask = "9,999.9";
	_pSpin._want_arrow = true;
	_pSpin._has_inputElement = true;


	_pSpin._use_readonly_status = true;
	_pSpin._is_locale_control = true;
	_pSpin._is_editable_control = true;

	_pSpin._event_list = {
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
		"onspin" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};


	_pSpin.accessibilityrole = "spin";
	_pSpin._is_compound = true;

	_pSpin.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var spinedit = this.spinedit = new nexacro._SpinEditControl("spinedit", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spinupbutton = this.spinupbutton = new nexacro._SpinButtonControl("spinupbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spindownbutton = this.spindownbutton = new nexacro._SpinButtonControl("spindownbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);

			spinedit.set_limitbymask("none");

			spinedit.createComponent(true);
			spinupbutton.createComponent(true);
			spindownbutton.createComponent(true);
		}
	};

	_pSpin.on_created_contents = function () {
		this._setEventHandlerToCalendarEdit();
		this._setEventHandlerToSpinButtons();

		this.on_apply_displaycomma(this.displaycomma);
		this.on_apply_type(this.type);
		this.on_apply_readonly(this.readonly);
		this.on_apply_value(this.value);
		this.on_apply_usecontextmenu(this.usecontextmenu);

		this.spinupbutton.on_created();
		this.spindownbutton.on_created();
		this.spinedit.on_created();

		this.on_apply_displaynulltext(this.displaynulltext);
		this.on_apply_displayinvalidtext(this.displayinvalidtext);

		this._recalcLayout();
		this._updateButton();
		this._setDefaultProp();

		if (this.spinedit) {
			this.spinedit.set_usesoftkeyboard(this.usesoftkeyboard, true);
		}

		var maskobj = this._getMaskObj();
		if (maskobj) {
			maskobj._is_intpart_zero = true;
		}
	};

	_pSpin.on_destroy_contents = function () {
		if (this.spinedit) {
			this.spinedit.destroy();
			this.spinedit = null;
		}

		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}

		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}
	};

	_pSpin.on_create_contents_command = function () {
		this._setEventHandlerToCalendarEdit();
		this._setEventHandlerToSpinButtons();

		this.on_apply_displaycomma(this.displaycomma);
		this.on_apply_type(this.type);
		this.on_apply_readonly(this.readonly);
		this.on_apply_value(this.value);
		this.on_apply_usecontextmenu(this.usecontextmenu);

		var str = "";

		if (this.spinedit) {
			str += this.spinedit.createCommand();
		}
		if (this.spinupbutton) {
			str += this.spinupbutton.createCommand();
		}
		if (this.spindownbutton) {
			str += this.spindownbutton.createCommand();
		}

		var maskobj = this._getMaskObj();
		if (maskobj) {
			maskobj._is_intpart_zero = true;
		}

		return str;
	};

	_pSpin.on_attach_contents_handle = function (win) {
		if (this.spinedit) {
			this.spinedit.attachHandle(win);
		}
		if (this.spinupbutton) {
			this.spinupbutton.attachHandle(win);
		}
		if (this.spindownbutton) {
			this.spindownbutton.attachHandle(win);
		}

		this.on_apply_displaynulltext(this.displaynulltext);
		this.on_apply_displayinvalidtext(this.displayinvalidtext);

		this._setEventHandlerToCalendarEdit();
		this._setEventHandlerToSpinButtons();

		this._recalcLayout();
		this._updateButton();
		this._setDefaultProp();
	};

	_pSpin.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};

	_pSpin._apply_setfocus = function (evt_name) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit._on_focus(true, evt_name);
		}
	};

	_pSpin.on_apply_prop_cssclass = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.on_apply_cssclass();
		}
		var spinupbutton = this.spinupbutton;
		if (spinupbutton) {
			spinupbutton.on_apply_cssclass();
		}
		var spindownbutton = this.spindownbutton;
		if (spindownbutton) {
			spindownbutton.on_apply_cssclass();
		}
	};

	_pSpin.on_apply_prop_enable = function (v) {
		if (this.spinedit) {
			this.spinedit._setEnable(v);
		}
		if (this.spinupbutton && !this.readonly) {
			this.spinupbutton._setEnable(v);
		}
		if (this.spindownbutton && !this.readonly) {
			this.spindownbutton._setEnable(v);
		}
	};

	_pSpin.on_getBindableProperties = function () {
		return "value";
	};

	_pSpin.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this._setValue(undefined);
		}
	};

	_pSpin.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var ds_val = ds.getColumn(row, col);
			var conv_val = this._convertValueType(ds_val, true);

			if (isNaN(conv_val)) {
				this._setValue(ds_val);
			}
			else {
				this._setValue(conv_val);
			}
		}
	};

	_pSpin.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);
		if (this.spinedit) {
			this.spinedit.on_apply_accessibility();
		}
	};

	_pSpin._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this.spinedit._input_element && this._status != "focus") {
			if (!this.spinedit._input_element._wantAccessibilityAdditionalLabel || !this.spinedit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return _readlabel;
	};

	_pSpin._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_arrow = this._want_arrow;
		if ((keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) && (ctrlKey || altKey)) {
			want_arrow = true;
		}
		this._want_arrow = false;
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pSpin.set_text = nexacro._emptyFn;

	_pSpin.set_value = function (v) {
		v = this._convertValueType(v);
		if (this.value !== v) {
			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			this._setValue(v);
		}
	};

	_pSpin.on_apply_value = function (value) {
		if (nexacro._isNull(value) || (value.date || value.time || value.blob || value.datetime)) {
			value = undefined;
		}

		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.set_value(value);
			if (nexacro._isNull(value)) {
				this.text = "";
			}
			else {
				this.text = spinedit.text;
			}

			this._setAccessibilityInfoValueCur(spinedit.text);
			this._updateAccessibilityLabel();
			spinedit._updateAccessibilityLabel();
			this._notifyAccessibility(spinedit.text);
		}
	};

	_pSpin.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pSpin.on_apply_usesoftkeyboard = function (bforce) {
		if (this.spinedit) {
			this.spinedit.set_usesoftkeyboard(this.usesoftkeyboard, bforce);
		}
	};

	_pSpin.set_displaynulltext = function (v) {
		var isNull = nexacro._isNull(v);
		if (isNull) {
			v = "";
		}
		else {
			v = nexacro._toString(v).replace(/&quot;/g, "\"");
		}

		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pSpin.on_apply_displaynulltext = function (displaynulltext) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.set_displaynulltext(displaynulltext);
		}
	};

	_pSpin.set_displayinvalidtext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displayinvalidtext != v) {
			this.displayinvalidtext = v;
			this.on_apply_displayinvalidtext(v);
		}
	};

	_pSpin.on_apply_displayinvalidtext = function (v) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.set_displayinvalidtext(v);
		}
	};

	_pSpin.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pSpin.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var spinedit = this.spinedit;
		if (spinedit) {
			if (this.type == "noneditable") {
				spinedit.set_readonly(true);
			}
			else {
				spinedit.set_readonly(readonly);
			}
		}

		var spinupbutton = this.spinupbutton;
		if (spinupbutton) {
			spinupbutton._setEnable(this.enable && !readonly);
		}

		var spindownbutton = this.spindownbutton;
		if (spindownbutton) {
			spindownbutton._setEnable(this.enable && !readonly);
		}
	};

	_pSpin.set_type = function (v) {
		var type_enum = ["noneditable", "normal", "spinonly"];
		if (type_enum.indexOf(v) == -1) {
			return;
		}

		if (this.type != v) {
			this.type = v;
			this.on_apply_type(v);
			this.on_apply_readonly(this.readonly);
			this._recalcLayout();
		}
	};

	_pSpin.on_apply_type = function (type) {
		var spinedit = this.spinedit;
		if (spinedit) {
			switch (type) {
				case "spinonly":
					spinedit.set_visible(false);
					break;
				case "noneditable":
					spinedit.set_visible(true);
					break;
				case "normal":
				default:
					spinedit.set_visible(true);
					break;
			}
		}
	};

	_pSpin.set_locale = function (v) {
		if (this.locale != v) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);
		}
	};

	_pSpin.on_apply_locale = function (locale) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit._setLocale(locale);
		}
	};

	_pSpin.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu(v);
		}
	};

	_pSpin.on_apply_usecontextmenu = function (usecontextmenu) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.set_usecontextmenu(usecontextmenu);
		}
	};

	_pSpin.set_buttonposition = function (v) {
		var buttonposition_enum = ["left", "right"];
		if (buttonposition_enum.indexOf(v) == -1) {
			return;
		}

		if (this.buttonposition != v) {
			this.buttonposition = v;
			this.on_apply_buttonposition(v);
		}
	};

	_pSpin.on_apply_buttonposition = function (buttonposition) {
		this._recalcLayout();
	};

	_pSpin.set_buttonsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.buttonsize != v) {
			this.buttonsize = v;
			this.on_apply_buttonsize(v);
		}
	};

	_pSpin.on_apply_buttonsize = function (buttonsize) {
		this._recalcLayout();
	};

	_pSpin.set_circulation = function (v) {
		v = nexacro._toBoolean(v);
		if (this.circulation != v) {
			this.circulation = v;

			this.on_apply_circulation(v);
			this._updateButton();
		}
	};

	_pSpin.on_apply_circulation = function (circulation) {
		this._updateButton();
	};

	_pSpin.set_displaycomma = function (v) {
		v = nexacro._toBoolean(v);
		if (this.displaycomma != v) {
			this.displaycomma = v;

			this.on_apply_displaycomma(v);
			this.on_apply_value(this.value);
			this._setDefaultText();
		}
	};

	_pSpin.on_apply_displaycomma = function (displaycomma) {
		var spinedit = this.spinedit;
		if (spinedit) {
			if (!displaycomma) {
				spinedit.set_format(this._default_mask);
			}
			else {
				spinedit.set_format(this._default_commamask);
			}

			var maskobj = this._getMaskObj();
			if (maskobj) {
				maskobj._is_intpart_zero = true;
			}
		}
	};

	_pSpin.set_increment = function (v) {
		if (isNaN(v = +v)) {
			return;
		}

		if (this.increment != v) {
			this.increment = v;
		}
	};

	_pSpin.set_max = function (v) {
		if (isNaN(v = +v)) {
			return;
		}

		if (this.max != v) {
			this.max = v;

			this._setAccessibilityInfoValueMax(v);
			this.on_apply_max(v);
			this.on_apply_value(this.value);
			this._updateButton();
			this._setDefaultProp();
		}
	};

	_pSpin.on_apply_max = function (max) {
		if (this.value > max) {
			this.value = max;
		}

		if (max < this.min) {
			this.min = max;
		}
	};

	_pSpin.set_min = function (v) {
		if (isNaN(v = +v)) {
			return;
		}

		if (this.min != v) {
			this.min = v;

			this._setAccessibilityInfoValueMin(v);
			this.on_apply_min(v);
			this.on_apply_value(this.value);
			this._updateButton();
			this._setDefaultProp();
		}
	};

	_pSpin.on_apply_min = function (min) {
		if (this.value < min) {
			this.value = min;
		}

		if (this.max < min) {
			this.max = min;
		}
	};

	_pSpin.setRange = function (min, max) {
		this.set_min(min);
		this.set_max(max);

		if (this.min > this.max) {
			var swap = this.min;
			this.min = this.max;
			this.max = swap;
		}
	};

	_pSpin.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit.getCaretPos();
		}

		return -1;
	};

	_pSpin.setCaretPos = function (v) {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit.setCaretPos(v);
		}

		return false;
	};

	_pSpin.getSelect = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit.getSelect();
		}

		return [0, 0];
	};

	_pSpin.setSelect = function (start, end) {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit.setSelect(start, end);
		}

		return false;
	};

	_pSpin.getSelectedText = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit.getSelectedText();
		}

		return "";
	};

	_pSpin.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pSpin._on_value_change = function () {
		var spinedit = this.spinedit;

		var max = this.max;
		var min = this.min;

		var pre_value = this._default_value;
		var pre_text = this._default_text;

		var cur_value = spinedit.value;
		var cur_text = spinedit.text;

		if (spinedit && spinedit.text) {
			cur_value = parseFloat(spinedit.text.replace(/\,/g, ''));
		}

		if (cur_value > max) {
			cur_value = max;
		}
		else if (cur_value < min) {
			cur_value = min;
		}
		else if (!cur_value) {
			cur_value = min;
		}

		if (!this.on_fire_canchange(this, pre_text, pre_value, cur_text, cur_value) || 
			!this.applyto_bindSource("value", cur_value)) {
			this._setValue(pre_value);
			return false;
		}

		this._setValue(cur_value);

		this.on_fire_onchanged(this, pre_text, pre_value, cur_text, cur_value);

		return true;
	};

	_pSpin._on_spin_up = function () {
		if (this.readonly) {
			return false;
		}

		var maskobj = this._getMaskObj();

		var increment = this.increment;
		var max = this.max;
		var min = this.min;

		var pre_value = parseFloat(this.spinedit.value);
		var pre_text = this.text;

		if (nexacro._isNull(pre_value) || isNaN(pre_value)) {
			pre_value = 0;
		}

		var cur_value = this._calcValue(pre_value, increment, true);

		if (this.circulation) {
			if (increment >= 0) {
				cur_value = (cur_value > max) ? min : cur_value;
			}
			else {
				cur_value = (cur_value < min) ? max : cur_value;
			}
		}
		else {
			cur_value = (cur_value > max) ? max : (cur_value < min) ? min : cur_value;
		}

		var cur_text = maskobj.applyMask(cur_value);

		if (!this.on_fire_onspin(this, pre_text, pre_value, cur_text, cur_value, true)) {
			cur_value = pre_value;
		}

		this.value = cur_value;

		this.on_apply_value(cur_value);

		this._updateButton();
	};

	_pSpin._on_spin_down = function () {
		if (this.readonly) {
			return false;
		}

		var maskobj = this._getMaskObj();

		var increment = this.increment;
		var max = this.max;
		var min = this.min;

		var pre_value = parseFloat(this.spinedit.value);
		var pre_text = this.text;

		if (nexacro._isNull(pre_value) || isNaN(pre_value)) {
			pre_value = 0;
		}

		var cur_value = this._calcValue(pre_value, increment, false);

		if (this.circulation) {
			if (increment >= 0) {
				cur_value = (cur_value < min) ? max : cur_value;
			}
			else {
				cur_value = (cur_value > max) ? min : cur_value;
			}
		}
		else {
			cur_value = (cur_value < min) ? min : (cur_value > max) ? max : cur_value;
		}

		var cur_text = maskobj.applyMask(cur_value);

		if (!this.on_fire_onspin(this, pre_text, pre_value, cur_text, cur_value, false)) {
			cur_value = pre_value;
		}

		this.value = cur_value;

		this.on_apply_value(cur_value);

		this._updateButton();
	};

	_pSpin._on_edit_oneditclick = function (obj, e) {
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey);
	};

	_pSpin._on_edit_onkeydown = function (obj, e) {
		switch (e.keycode) {
			case nexacro.Event.KEY_UP:
				this._on_spin_up();
				break;
			case nexacro.Event.KEY_DOWN:
				this._on_spin_down();
				break;
			case nexacro.Event.KEY_ENTER:
				if (this._default_value !== this.spinedit.value) {
					this._on_value_change();
				}
				break;
		}
	};

	_pSpin._on_edit_oninput = function (obj, e) {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		this.on_fire_oninput();

		var val = parseFloat(this.spinedit.value);
		if (isNaN(val)) {
			this.value = this.min;
		}
	};

	_pSpin._on_upbutton_onclick = function (obj, e) {
		this._on_spin_up();
	};

	_pSpin._on_downbutton_onclick = function (obj, e) {
		this._on_spin_down();
	};

	_pSpin.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._changeStatus("focused", true);

		if (!(refer_new_focus instanceof nexacro.MaskEdit)) {
			var spinedit = this.spinedit;
			if (spinedit) {
				spinedit._on_focus(true, evt_name);
			}
		}
	};

	_pSpin.on_killfocus_basic_action = function (new_focus, new_refer_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		if (this._default_value != this.spinedit.value) {
			this._on_value_change();
		}
	};

	_pSpin.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key);
			return this.oneditclick._fireEvent(this, evt);
		}

		return false;
	};

	_pSpin.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pSpin.on_fire_onspin = function (obj, pretext, prevalue, posttext, postvalue, isUp) {
		if (this.onspin && this.onspin._has_handlers) {
			var evt = new nexacro.SpinEventInfo(obj, "onspin", pretext, prevalue, posttext, postvalue, isUp);
			return this.onspin._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin._recalcLayout = function () {
		if (this._is_created_contents) {
			var spinedit = this.spinedit;
			var spinupbutton = this.spinupbutton;
			var spindownbutton = this.spindownbutton;

			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			var buttonsize_w = this.buttonsize;
			if (buttonsize_w == null) {
				buttonsize_w = client_height;
			}
			else if (buttonsize_w > client_width) {
				buttonsize_w = client_width;
			}

			var buttonsize_h = Math.floor(client_height / 2);

			switch (this.type) {
				case "spinonly":
					buttonsize_w = client_width;

					spinupbutton.move(0, 0, buttonsize_w, buttonsize_h, null, null);
					spindownbutton.move(0, client_height - buttonsize_h, buttonsize_w, buttonsize_h, null, null);
					break;
				case "normal":
				case "noneditable":
				default:
					switch (this.buttonposition) {
						case "left":
							spinedit.move(buttonsize_w, 0, client_width - buttonsize_w, client_height, null, null);
							spinupbutton.move(0, 0, buttonsize_w, buttonsize_h, null, null);
							spindownbutton.move(0, client_height - buttonsize_h, buttonsize_w, buttonsize_h, null, null);
							break;
						case "right":
						default:
							var w = client_width - buttonsize_w;

							spinedit.move(0, 0, w, client_height, null, null);
							spinupbutton.move(w, 0, buttonsize_w, buttonsize_h, null, null);
							spindownbutton.move(w, client_height - buttonsize_h, buttonsize_w, buttonsize_h, null, null);
							break;
					}
					break;
			}
		}
	};

	_pSpin._updateButton = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var spinedit = this.spinedit;
			var spinupbutton = this.spinupbutton;
			var spindownbutton = this.spindownbutton;

			var v = spinedit.value;
			var max = this.max;
			var min = this.min;

			if (!this._isEnable()) {
				spinedit._setEnable(false);
				spinupbutton._setEnable(false);
				spindownbutton._setEnable(false);
			}
			else {
				spinedit._setEnable(true);

				if (!this.circulation) {
					if (nexacro._isNull(v) || this._isInvalidValue(v)) {
						spindownbutton._setEnable(false);
						spinupbutton._setEnable(!this.readonly);
					}
					else {
						if (this.increment >= 0) {
							if (max > v) {
								spinupbutton._setEnable(!this.readonly);
							}
							else {
								spinupbutton._setEnable(false);
								spinupbutton._changeStatus("mouseover", false);
							}

							if (min < v) {
								spindownbutton._setEnable(!this.readonly);
							}
							else {
								spindownbutton._setEnable(false);
								spindownbutton._changeStatus("mouseover", false);
							}
						}
						else {
							if (max > v) {
								spindownbutton._setEnable(!this.readonly);
							}
							else {
								spindownbutton._setEnable(false);
								spindownbutton._changeStatus("mouseover", false);
							}

							if (min < v) {
								spinupbutton._setEnable(!this.readonly);
							}
							else {
								spinupbutton._setEnable(false);
								spinupbutton._changeStatus("mouseover", false);
							}
						}
					}
				}
				else {
					spinupbutton._setEnable(!this.readonly);
					spindownbutton._setEnable(!this.readonly);
				}
			}
		}
	};

	_pSpin._calcValue = function (val, inc, bAdd) {
		var addConst = 1;
		var strVal = val.toString();
		var strInc = inc.toString();
		var bPointVal = strVal.indexOf(".");
		var bPointInc = strInc.indexOf(".");

		if (bPointVal > -1 || bPointInc > -1) {
			var decVal = bPointVal > -1 ? strVal.substring(bPointVal + 1, strVal.length) : "";
			var decInc = bPointInc > -1 ? strInc.substring(bPointInc + 1, strInc.length) : "";
			var maxLength = decVal.length >= decInc.length ? decVal.length : decInc.length;
			addConst = Math.pow(10, maxLength);

			val = Math.round(val *  addConst);
			inc = Math.round(inc *  addConst);
		}

		if (bAdd) {
			return (val + inc) / addConst;
		}
		else {
			return (val - inc) / addConst;
		}
	};

	_pSpin._convertValueType = function (v, bapplyrule) {
		if (v === "") {
			return v;
		}
		else {
			if (bapplyrule) {
				return nexacro.Component.prototype._convertValueType.call(this, v, 2);
			}
			else {
				return nexacro._isNull(v) ? v : parseFloat(v);
			}
		}
	};

	_pSpin._setValue = function (v) {
		this.value = v;

		this.on_apply_value(v);
		this._updateButton();
		this._setDefaultProp();
	};

	_pSpin._setDefaultProp = function () {
		this._setDefaultValue();
		this._setDefaultText();
	};

	_pSpin._setDefaultValue = function () {
		this._default_value = this.value;
	};

	_pSpin._setDefaultText = function () {
		this._default_text = this.text;
	};

	_pSpin._setLocale = function (v) {
		if (!this.locale && v != this._locale) {
			this._locale = v;
			this.on_apply_locale(v);
			this.on_apply_value(this.value);
			this._setDefaultText();
		}
	};

	_pSpin._setEnableView = function (v) {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit._setEnableView(v);
		}
	};

	_pSpin._setEventHandlerToCalendarEdit = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit._setEventHandler("oneditclick", this._on_edit_oneditclick, this);
			spinedit._setEventHandler("onkeydown", this._on_edit_onkeydown, this);
			spinedit._setEventHandler("oninput", this._on_edit_oninput, this);
		}
	};

	_pSpin._setEventHandlerToSpinButtons = function () {
		var spinupbutton = this.spinupbutton;
		if (spinupbutton) {
			spinupbutton._setEventHandler("onclick", this._on_upbutton_onclick, this);
		}

		var spindownbutton = this.spindownbutton;
		if (spindownbutton) {
			spindownbutton._setEventHandler("onclick", this._on_downbutton_onclick, this);
		}
	};

	_pSpin._getMaskObj = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit._getMaskObj();
		}

		return null;
	};

	_pSpin._isInvalidValue = function (v) {
		if (nexacro._isNull(v) || v === "") {
			return false;
		}

		v = parseFloat(nexacro._toString(v).replace(/\,/g, ''));

		if (!isFinite(+v) || isNaN(+v)) {
			return true;
		}

		return false;
	};

	_pSpin._on_getDisplayText = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			return spinedit._on_getDisplayText();
		}
	};

	delete _pSpin;

	nexacro._SpinEditControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.MaskEdit.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay);
		this._setControl();
	};

	var _pSpinEditControl = nexacro._createPrototype(nexacro.MaskEdit, nexacro._SpinEditControl);
	nexacro._SpinEditControl.prototype = _pSpinEditControl;

	_pSpinEditControl._getFromComponent = function (comp) {
		var parent = comp.parent;
		if (parent && parent._isPopupVisible()) {
			return parent;
		}
		else {
			return nexacro.Component.prototype._getFromComponent.call(this, comp);
		}
	};

	_pSpinEditControl._isInvalidValue = function (v) {
		return this.parent._isInvalidValue(v);
	};

	_pSpinEditControl._apply_setfocus = function (evt_name) {
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

	delete _pSpinEditControl;

	nexacro._SpinButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pSpinButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._SpinButtonControl);
	nexacro._SpinButtonControl.prototype = _pSpinButtonControl;
	_pSpinButtonControl._type_name = "ButtonControl";
	_pSpinButtonControl._is_subcontrol = true;

	_pSpinButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var spin = this.parent;
		if (spin) {
			spin._apply_setfocus(evt_name);
		}
	};

	delete _pSpinButtonControl;
}
