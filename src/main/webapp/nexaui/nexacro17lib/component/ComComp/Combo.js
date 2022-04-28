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

if (!nexacro.Combo) {
	nexacro.ComboCloseUpEventInfo = function (obj, id, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, is_select) {
		this.id = this.eventid = id || "oncloseup";
		this.fromobject = this.fromreferenceobject = obj;

		this.preindex = beforeIndex;
		this.postindex = afterIndex;
		this.pretext = beforeText;
		this.posttext = afterText;
		this.prevalue = beforeValue;
		this.postvalue = afterValue;

		this.isselect = is_select;
	};

	var _pComboCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ComboCloseUpEventInfo);
	nexacro.ComboCloseUpEventInfo.prototype = _pComboCloseUpEventInfo;
	_pComboCloseUpEventInfo._type_name = "ComboCloseUpEventInfo";

	delete _pComboCloseUpEventInfo;

	nexacro.Combo = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._onlydisplay = onlydisplay;
	};

	var _pCombo = nexacro._createPrototype(nexacro.Component, nexacro.Combo);
	nexacro.Combo.prototype = _pCombo;
	_pCombo._type_name = "Combo";


	_pCombo.comboedit = null;
	_pCombo.dropbutton = null;
	_pCombo.combolist = null;
	_pCombo._popupcontrol = null;


	_pCombo.value = undefined;
	_pCombo.index = -1;
	_pCombo.text = "";

	_pCombo.codecolumn = "";
	_pCombo.datacolumn = "";
	_pCombo.innerdataset = "";

	_pCombo.autoselect = false;
	_pCombo.autoskip = false;
	_pCombo.usesoftkeyboard = true;
	_pCombo.displaynulltext = "";
	_pCombo.imemode = "none";
	_pCombo.readonly = false;
	_pCombo.usecontextmenu = true;

	_pCombo.displayrowcount = undefined;
	_pCombo.buttonsize = undefined;
	_pCombo.itemheight = undefined;
	_pCombo.type = "dropdown";
	_pCombo.popuptype = "normal";
	_pCombo.popupsize = undefined;
	_pCombo.acceptvaluetype = "allowinvalid";


	_pCombo._is_close_popup_by_select = false;
	_pCombo._isFiredOnInput = false;
	_pCombo._innerdataset = "";
	_pCombo._filtereddataset = "";
	_pCombo._default_value = undefined;
	_pCombo._default_text = "";
	_pCombo._default_index = -1;
	_pCombo._has_inputElement = true;
	_pCombo._processing_keyfilter = false;


	_pCombo._use_readonly_status = true;
	_pCombo._is_editable_control = true;


	_pCombo._event_list = {
		"oneditclick" : 1, 
		"onitemclick" : 1, 
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
		"onmousemove" : 1, 
		"onmouseleave" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"canitemchange" : 1, 
		"onitemchanged" : 1, 
		"oninput" : 1, 
		"onmousewheel" : 1, 
		"oncontextmenu" : 1, 
		"ondropdown" : 1, 
		"oncloseup" : 1, 
		"oninnerdatachanged" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};


	_pCombo.accessibilityrole = "combobox";

	_pCombo.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			this.comboedit = new nexacro._ComboEditControl("comboedit", 0, 0, 0, 0, null, null, null, null, null, null, this, this._onlydisplay);
			this.dropbutton = new nexacro._ComboButtonControl("dropbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);

			this.comboedit.createComponent();
			this.dropbutton.createComponent();
		}
	};

	_pCombo.on_created_contents = function (win) {
		if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset(this._innerdataset);
		}
		this.on_apply_autoskip(this.autoskip);
		this.on_apply_displaynulltext(this.displaynulltext);
		this.on_apply_imemode(this.imemode);
		this.on_apply_autoselect(this.autoselect);
		this.on_apply_usecontextmenu(this.usecontextmenu);

		if (!this._onlydisplay) {
			var init_comobovalue = (this.value == undefined && this.index == -1);
			if (init_comobovalue) {
				this.on_apply_value(this.value);
			}
			else {
				if (this.index > -1) {
					this.on_apply_index(this.index);
				}
				else if (this.value !== undefined) {
					this.on_apply_value(this.value);
				}
				else if (this.text !== "") {
					this.on_apply_text(this.text);
				}
			}
		}

		this.redraw();
		this._recalcLayout();
		this._setDefaultProps(this.index, this.value, this.text);

		this._setEventHandlerToComboEdit();
		this._setEventHandlerToDropButton();

		this.comboedit.on_created(win);
		this.dropbutton.on_created(win);

		if (this.type == "dropdown") {
			this.comboedit._setReadonlyView(true);
		}

		if (nexacro._enableaccessibility) {
			this._want_arrows = false;
			this._setAccessibilityStatAutoComplete("list");

			if (!nexacro._isDesktop()) {
				this.comboedit._setAccessibilityStatHidden(true);
				this.dropbutton._setAccessibilityStatHidden(true);
			}

			if (this.type == "dropdown" && !this.readonly) {
				if (this.comboedit) {
					this.comboedit._setAccessibilityReadOnly(false);
				}
			}
		}

		if (this.comboedit) {
			this.comboedit.set_usesoftkeyboard(this.usesoftkeyboard, true);
		}
		this.on_apply_type(this.type);
	};

	_pCombo.on_destroy_contents = function () {
		if (this.comboedit) {
			this.comboedit.destroy();
			this.comboedit = null;
		}

		if (this.dropbutton) {
			this.dropbutton.destroy();
			this.dropbutton = null;
		}

		if (this.combolist) {
			this.combolist.destroy();
			this.combolist = null;
		}

		if (this._popupcontrol) {
			this._popupcontrol.destroy();
			this._popupcontrol = null;
		}

		this._removeEventHandlerToInnerDataset();
	};

	_pCombo._removeEventHandlerToInnerDataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
			this._innerdataset = null;
		}

		if (this._filtereddataset) {
			this._filtereddataset.destroy();
			this._filtereddataset = null;
		}
	};

	_pCombo.on_create_contents_command = function () {
		this.on_apply_autoskip(this.autoskip);
		this.on_apply_displaynulltext(this.displaynulltext);
		this.on_apply_imemode(this.imemode);
		this.on_apply_autoselect(this.autoselect);
		this.on_apply_usecontextmenu(this.usecontextmenu);

		var init_comobovalue = (this.value == undefined && this.index == -1);
		if (init_comobovalue) {
			this.on_apply_value(this.value);
		}
		else {
			if (this.index > -1) {
				this.on_apply_index(this.index);
			}
			else if (this.value !== undefined) {
				this.on_apply_value(this.value);
			}
			else if (this.text !== "") {
				this.on_apply_text(this.text);
			}
		}

		this.redraw();
		this._recalcLayout();

		this._setEventHandlerToComboEdit();
		this._setEventHandlerToDropButton();

		var str = "";

		if (this.comboedit) {
			str += this.comboedit.createCommand();
		}

		if (this.dropbutton) {
			str += this.dropbutton.createCommand();
		}

		return str;
	};

	_pCombo.on_attach_contents_handle = function (win) {
		if (this.comboedit) {
			this.comboedit.attachHandle(win);
			if (nexacro._enableaccessibility && !nexacro._isDesktop()) {
				this.comboedit._setAccessibilityStatHidden(true);
			}
			if (this.type == "dropdown") {
				this.comboedit._setReadonlyView(true);
			}
		}

		if (this.dropbutton) {
			this.dropbutton.attachHandle(win);
			this.dropbutton._setAccessibilityStatHidden(true);
		}

		if (nexacro._enableaccessibility) {
			this._want_arrows = false;
			this._setAccessibilityStatAutoComplete("list");

			if (this.type == "dropdown" && !this.readonly) {
				if (this.comboedit) {
					this.comboedit._setAccessibilityReadOnly(false);
				}
			}
		}

		this._setDefaultProps(this.index, this.value, this.text);
		this.on_apply_type(this.type);
	};

	_pCombo.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};

	_pCombo.on_change_containerPos = function (left, top) {
		this._recalcLayout();
	};

	_pCombo._apply_setfocus = function (evt_name) {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit._changeStatus("focused", true);

			if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
				if (this.type == "dropdown") {
					var control_elem = this.getElement();
					if (control_elem) {
						control_elem.setElementFocus(true);
					}
					else {
						comboedit._on_focus(true, evt_name);
					}
				}
				else {
					comboedit._on_focus(true, evt_name);
				}
			}
			else {
				comboedit._on_focus(true, evt_name);
			}
		}
	};

	_pCombo.on_apply_prop_enable = function (v) {
		v = (v != null) ? v : this._isEnable();

		if (this.comboedit) {
			this.comboedit._setEnable(v);
		}
		if (this.dropbutton && !this._isReadOnly()) {
			this.dropbutton._setEnable(v);
		}
		if (this.combolist) {
			this.combolist._setEnable(v);
		}
	};

	_pCombo.on_apply_prop_cssclass = function () {
		if (this.comboedit) {
			this.comboedit.on_apply_cssclass();
		}
		if (this.dropbutton) {
			this.dropbutton.on_apply_cssclass();
		}
		if (this.combolist) {
			this.combolist.on_apply_cssclass();
		}
	};

	_pCombo.on_init_bindSource = function (columnid, propid, ds) {
		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			this._createFilteredDataset();
		}

		this._setValue(undefined);
		this._setIndex(-1);
		this._setText("");

		this.redraw();
	};

	_pCombo.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
				this._createFilteredDataset();
			}

			var idx = -1;
			var txt = "";
			var val = ds.getColumn(row, col);

			val = this._convertValueType(val, true);

			if (this.value == val) {
				return;
			}

			this._setValue(val);

			ds = this._selectDataset();
			if (ds) {
				idx = this._getIndexFromValue(ds, val);
				if (idx > -1) {
					txt = this._getItemText(idx);
				}

				this._setIndex(idx);
				this._setText(txt);
			}

			this.redraw();
			this._setDefaultProps(this.index, this.value, this.text);
		}
	};

	_pCombo.on_getBindableProperties = function () {
		return "value";
	};

	_pCombo._getDragData = function () {
		var comboedit = this.comboedit;
		if (comboedit) {
			return comboedit.getSelectedText();
		}
	};

	_pCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		if ((keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) && (ctrlKey || altKey)) {
			return {
				want_tab : false, 
				want_return : false, 
				want_escape : false, 
				want_chars : false, 
				want_arrows : true
			};
		}

		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrows
		};
	};

	_pCombo.on_get_accessibility_label = function () {
		return "";
	};

	_pCombo._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this.comboedit._input_element && this._status != "focus") {
			if (!this.comboedit._input_element._wantAccessibilityAdditionalLabel || !this.comboedit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}

		return _readlabel;
	};

	_pCombo.set_text = function (v) {
		v = nexacro._toString(v);
		if (this.text != v) {
			this.text = v;
			this.on_apply_text(v);
		}
	};

	_pCombo.on_apply_text = function (text) {
		var control_elem = this.getElement();
		if (control_elem) {
			var value = this.value;

			var ds = this._selectDataset();
			if (!ds || (!this.datacolumn && !this.codecolumn)) {
				if (value) {
					this._setEditValue(text);
				}
				else {
					if (this.displaynulltext || text == "") {
						this._setEditValue(undefined);
					}
					else {
						this._setEditValue(text);
					}
				}
			}
			else {
				var idx = this._getIndexFromText(ds, text);

				this._setIndex(idx);
				if (idx > -1) {
					this._setValue(this._getItemValue(idx));
				}
				else {
					this._setValue(undefined);
					this._setText("");
				}
				this.redraw();
			}

			this._setDefaultProps(this.index, this.value, this.text);
		}
	};

	_pCombo.set_value = function (v) {
		if (!this._is_created && (v === undefined || v === null || v === "")) {
			return;
		}

		v = this._convertValueType(v);

		if (this.value !== v) {
			if (this.acceptvaluetype == "ignoreinvalid") {
				var idx = -1;
				var ds = this._selectDataset();
				if (ds) {
					idx = this._getIndexFromValue(ds, v);
					if (idx < 0) {
						return;
					}
				}
			}

			if (this.applyto_bindSource("value", v)) {
				this.value = v;
				this.on_apply_value(v);
				this.redraw();
			}
		}
	};

	_pCombo.on_apply_value = function (value) {
		var control_elem = this.getElement();
		if (control_elem) {
			var idx = -1;
			var txt = "";
			var ds = this._selectDataset();
			if (ds) {
				idx = this._getIndexFromValue(ds, value);
				if (idx > -1) {
					txt = this._getItemText(idx);
				}

				this._setIndex(idx);
				this._setText(txt);

				if (nexacro._enableaccessibility) {
					this._updateAccessibilityLabel();
				}
			}

			this._setDefaultProps(this.index, this.value, this.text);
		}
	};

	_pCombo.set_index = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.index != v) {
			this.index = v;
			this.on_apply_index(v);
			this.redraw();
		}
	};

	_pCombo.on_apply_index = function (idx) {
		var control_elem = this.getElement();
		if (control_elem) {
			var val;
			var txt = "";

			var ds = this._innerdataset;
			if (ds) {
				if (idx !== null && idx >= 0 && idx < ds.getRowCount()) {
					val = this._getItemValue(idx);
					txt = this._getItemText(idx);
				}
				else {
					idx = -1;
				}

				if (this.applyto_bindSource("value", val)) {
					this._setValue(val);
					this._setText(txt);
					if (this.index != idx) {
						this._setIndex(-1);
					}
				}
				else {
					var result = "restore";

					var form = this._getForm();
					var item = form._bind_manager._findBindItem(this, "value");
					if (item) {
						var bind_ds = item._dataset;
						if (bind_ds.rowcount > 0) {
							if (val == this.value) {
								if (txt == this.text) {
									result = "change";
								}
							}
						}
					}

					if (result == "restore") {
						this._setIndex(this._default_index);
						this._setValue(this._default_value);
						this._setText(this._default_text);
					}
					else if (result == "change") {
						this._setIndex(idx);
						this._setValue(val);
						this._setText(txt);
					}
				}
			}
			else {
				this._setIndex(-1);
				this._setValue(undefined);
				this._setText("");
			}

			this._setDefaultProps(this.index, this.value, this.text);
		}
	};

	_pCombo.set_displaynulltext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pCombo.on_apply_displaynulltext = function (displaynulltext) {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit.set_displaynulltext(displaynulltext);
		}
	};

	_pCombo.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pCombo._isReadOnly = function () {
		return this.readonly;
	};

	_pCombo.on_apply_readonly = function () {
		var readonly = this._isReadOnly();
		this._changeStatus("readonly", readonly);

		var comboedit = this.comboedit;
		if (comboedit) {
			if (!this._onlydisplay) {
				comboedit.set_readonly(readonly);
			}
			else {
				comboedit._changeStatus("readonly", readonly);
			}
			if (this.type == "dropdown") {
				comboedit._setReadonlyView(true);
				if (nexacro._enableaccessibility) {
					comboedit._setAccessibilityReadOnly(readonly);
				}
			}
			else {
				if (readonly == true) {
					comboedit._setReadonlyView(true);
				}
				else {
					comboedit._setReadonlyView(false);
				}
			}
		}

		var dropbutton = this.dropbutton;
		if (dropbutton) {
			dropbutton._setEnable(this._isEnable() && !readonly);
		}

		var combolist = this.combolist;
		if (combolist) {
			combolist.set_readonly(readonly);
		}
	};

	_pCombo.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoselect != v) {
			this.autoselect = v;
			this.on_apply_autoselect(v);
		}
	};

	_pCombo.on_apply_autoselect = function (autoselect) {
		var comboedit = this.comboedit;
		if (comboedit) {
			if (this.type != "dropdown") {
				comboedit.set_autoselect(autoselect);
			}
			else {
				comboedit.set_autoselect(false);
			}
		}
	};

	_pCombo.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoskip != v) {
			this.autoskip = v;
			this.on_apply_autoskip(v);
		}
	};

	_pCombo.on_apply_autoskip = function (autoskip) {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit.set_autoskip(autoskip);
		}
	};

	_pCombo.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pCombo.on_apply_usesoftkeyboard = function (bforce) {
		if (this.comboedit) {
			this.comboedit.set_usesoftkeyboard(this.usesoftkeyboard, bforce);
		}
	};

	_pCombo.set_imemode = function (v) {
		var imemode_enum = ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"];
		if (imemode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.imemode != v) {
			this.imemode = v;
			this.on_apply_imemode(v);
		}
	};

	_pCombo.on_apply_imemode = function (imemode) {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit.set_imemode(imemode);
		}
	};

	_pCombo.set_type = function (v) {
		var type_enum = ["dropdown", "search", "filter", "filterlike", "caseisearch", "caseifilter", "caseifilterlike"];
		if (type_enum.indexOf(v) == -1) {
			return;
		}

		if (this.type != v) {
			this.type = v;
			this.on_apply_type(v);
		}
	};

	_pCombo.on_apply_type = function (type) {
		if (this._filtereddataset) {
			this._filtereddataset.filter("");
		}

		this.on_apply_readonly();
		this.on_apply_autoselect(this.autoselect);
	};

	_pCombo.set_popuptype = function (v) {
		var popuptype_enum = ["normal", "center", "system", "none"];
		if (popuptype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.popuptype != v) {
			this.popuptype = v;
			this.on_apply_popuptype(v);
		}
	};

	_pCombo.on_apply_popuptype = function (popuptype) {
		var popupcontrol = this._popupcontrol;
		if (popupcontrol) {
			popupcontrol._setType(popuptype);
		}
	};

	_pCombo.set_popupsize = function (v) {
		if (this.popupsize != v) {
			this.popupsize = v;
		}
	};

	_pCombo.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu(v);
		}
	};

	_pCombo.set_acceptvaluetype = function (v) {
		var type_enum = ["allowinvalid", "ignoreinvalid"];

		if (type_enum.indexOf(v) == -1) {
			return;
		}
		this.acceptvaluetype = v;
	};

	_pCombo.on_apply_usecontextmenu = function (usecontextmenu) {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit.set_usecontextmenu(usecontextmenu);
		}
	};

	_pCombo.set_innerdataset = function (v) {
		if (typeof v != "string") {
			this.setInnerDataset(v);
			return;
		}

		if (this.innerdataset != v) {
			this._removeEventHandlerToInnerDataset();

			if (!v) {
				this._innerdataset = null;
				this.innerdataset = "";
			}
			else {
				v = v.replace("@", "");
				var _v = this._findDataset(v);
				this._innerdataset = _v ? _v : "";
				this.innerdataset = v;
			}
			this.on_apply_innerdataset(this._innerdataset);
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pCombo.on_apply_innerdataset = function (ds) {
		if (this.combolist) {
			this.combolist.setInnerDataset(ds);
		}

		if (ds) {
			ds._setEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);

			if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
				this._createFilteredDataset();
			}

			if (this.index > -1) {
				this._recheckIndex();
			}
			else if (this.value !== undefined) {
				this._recheckValue();
			}
			else if (this.text !== "") {
				this._recheckText();
			}

			this.redraw();
		}
	};

	_pCombo.set_codecolumn = function (v) {
		if (this.codecolumn != v) {
			this.codecolumn = v;
			this.on_apply_codecolumn(v);
		}
	};

	_pCombo.on_apply_codecolumn = function (codecolumn) {
		if (this.combolist) {
			this.combolist.set_codecolumn(codecolumn);
		}

		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			this._createFilteredDataset();
		}

		if (this._is_created) {
			if (this.index > -1) {
				this._recheckIndex();
			}
			else if (this.value !== undefined) {
				this._recheckValue();
			}
			else if (this.text !== "") {
				this._recheckText();
			}
			this._setDefaultProps(this.index, this.value, this.text);
			this.redraw();
		}
	};

	_pCombo.set_datacolumn = function (v) {
		if (this.datacolumn != v) {
			this.datacolumn = v;
			this.on_apply_datacolumn(v);
		}
	};

	_pCombo.on_apply_datacolumn = function (datacolumn) {
		var combolist = this.combolist;
		if (combolist) {
			combolist.set_datacolumn(this.datacolumn);
		}

		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			this._createFilteredDataset();
		}

		if (this._is_created) {
			if (this.index > -1) {
				this._recheckIndex();
			}
			else if (this.value !== undefined) {
				this._recheckValue();
			}
			else if (this.text !== "") {
				this._recheckText();
			}
			this._setDefaultProps(this.index, this.value, this.text);
			this.redraw();
		}
	};

	_pCombo.set_buttonsize = function (v) {
		if (this.buttonsize != v) {
			this.buttonsize = v;
			this.on_apply_buttonsize(v);
		}
	};

	_pCombo.on_apply_buttonsize = function (buttonsize) {
		this._recalcLayout();
	};

	_pCombo.set_displayrowcount = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v) || v < 0) {
				return;
			}
		}

		if (this.displayrowcount != v) {
			this.displayrowcount = v;
		}
	};

	_pCombo.set_itemheight = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.itemheight != v) {
			this.itemheight = v;
			this.on_apply_itemheight(v);
		}
	};

	_pCombo.on_apply_itemheight = function (itemheight) {
		var combolist = this.combolist;
		if (combolist) {
			combolist.set_itemheight(itemheight);
		}
	};

	_pCombo.set_visible = function (v) {
		nexacro.Component.prototype.set_visible.call(this, v);

		if (!this.visible && this._isPopupVisible()) {
			this._closePopup();
		}
	};

	_pCombo.set_scrollbarbarminsize = function (scrollbarbarminsize) {
		if (scrollbarbarminsize !== undefined) {
			scrollbarbarminsize = parseInt(scrollbarbarminsize);
			if (isNaN(scrollbarbarminsize)) {
				return;
			}
		}
		if (this.scrollbarbarminsize != scrollbarbarminsize) {
			this.scrollbarbarminsize = scrollbarbarminsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbarbarminsize(scrollbarbarminsize);
			}
		}
	};

	_pCombo.set_scrollbardecbuttonsize = function (scrollbardecbuttonsize) {
		if (scrollbardecbuttonsize !== undefined) {
			scrollbardecbuttonsize = parseInt(scrollbardecbuttonsize);
			if (isNaN(scrollbardecbuttonsize)) {
				return;
			}
		}

		if (this.scrollbardecbuttonsize != scrollbardecbuttonsize) {
			this.scrollbardecbuttonsize = scrollbardecbuttonsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbardecbuttonsize(scrollbardecbuttonsize);
			}
		}
	};

	_pCombo.set_scrollbarbaroutsize = function (scrollbarbaroutsize) {
		if (scrollbarbaroutsize !== undefined) {
			scrollbarbaroutsize = parseInt(scrollbarbaroutsize);
			if (isNaN(scrollbarbaroutsize)) {
				return;
			}
		}

		if (this.scrollbarbaroutsize != scrollbarbaroutsize) {
			this.scrollbarbaroutsize = scrollbarbaroutsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbarbaroutsize(scrollbarbaroutsize);
			}
		}
	};

	_pCombo.set_scrollbarincbuttonsize = function (scrollbarincbuttonsize) {
		if (scrollbarincbuttonsize !== undefined) {
			scrollbarincbuttonsize = parseInt(scrollbarincbuttonsize);
			if (isNaN(scrollbarincbuttonsize)) {
				return;
			}
		}

		if (this.scrollbarincbuttonsize != scrollbarincbuttonsize) {
			this.scrollbarincbuttonsize = scrollbarincbuttonsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbarincbuttonsize(scrollbarincbuttonsize);
			}
		}
	};

	_pCombo.set_scrollbarsize = function (scrollbarsize) {
		if (scrollbarsize !== undefined) {
			scrollbarsize = parseInt(scrollbarsize);
			if (isNaN(scrollbarsize)) {
				return;
			}
		}

		if (this.scrollbarsize != scrollbarsize) {
			this.scrollbarsize = scrollbarsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbarsize(scrollbarsize);
			}
		}
	};

	_pCombo.set_scrollbartrackbarsize = function (scrollbartrackbarsize) {
		if (scrollbartrackbarsize !== undefined) {
			scrollbartrackbarsize = parseInt(scrollbartrackbarsize);
			if (isNaN(scrollbartrackbarsize)) {
				return;
			}
		}

		if (this.scrollbartrackbarsize != scrollbartrackbarsize) {
			this.scrollbartrackbarsize = scrollbartrackbarsize;

			var combolist = this.combolist;
			if (combolist) {
				combolist.set_scrollbartrackbarsize(scrollbartrackbarsize);
			}
		}
	};

	_pCombo.dropdown = function () {
		var ds;

		if (!this.enable || this.readonly || !this.visible) {
			return false;
		}

		var comboedit = this.comboedit;
		var input_elem = comboedit ? comboedit._input_element : null;
		if (input_elem && input_elem._is_accept_touch && !input_elem._is_accept_touch()) {
			return false;
		}

		if (!this.isDropdown()) {
			ds = this._selectDataset(true);

			if ((this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") && ds.rowcount == 0) {
				ds = this._innerdataset;
			}
		}
		else {
			return false;
		}

		var lastfocus = this._find_lastFocused();
		if (lastfocus instanceof nexacro.Div) {
			lastfocus = lastfocus._getLastFocused();
		}

		if (lastfocus != this) {
			this.setFocus(false);
		}

		this._showPopup(ds, this.index, 1);
	};

	_pCombo.isDropdown = function () {
		return this._isPopupVisible();
	};

	_pCombo.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var comboedit = this.comboedit;
		if (comboedit) {
			return comboedit.getCaretPos();
		}

		return -1;
	};

	_pCombo.getSelect = function () {
		if (this.getElement() && this.comboedit) {
			return this.comboedit.getSelect();
		}

		return [this.getCaretPos(), this.getCaretPos()];
	};

	_pCombo.setSelect = function (start, end) {
		var comboedit = this.comboedit;
		if (comboedit) {
			return this.comboedit.setSelect(start, end);
		}

		return false;
	};

	_pCombo.getSelectedText = function () {
		if (this.getElement() && this.comboedit) {
			return this.comboedit.getSelectedText();
		}

		return "";
	};

	_pCombo.setSelectedText = function (v) {
		if (this.getElement() && this.comboedit && this.type != "dropdown") {
			return this.comboedit.setSelectedText(v);
		}
	};

	_pCombo.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pCombo.setInnerDataset = function (obj) {
		this._removeEventHandlerToInnerDataset();

		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset(null);
		}
		else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset")) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset(obj);
			if (this._is_created) {
				this._recheckIndex();
				this.redraw();
			}
		}
	};

	_pCombo.getCount = function () {
		if (this.getElement()) {
			if (this.combolist) {
				return this.combolist.getCount();
			}
			else if (this._innerdataset) {
				return this._innerdataset.getRowCount();
			}
		}

		return 0;
	};

	_pCombo.redraw = function () {
		if (this.text || !nexacro._isNull(this.value)) {
			if (this._onlydisplay) {
				if (this.index < 0 && this.text == "") {
					this._setEditValue(undefined);
				}
				else {
					this._setEditValue(this.text);
				}
			}
			else {
				this._setEditValue(this.text);
			}
		}
		else {
			this._setEditValue(undefined);
		}
		this._setDefaultCaret();
	};

	_pCombo.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pCombo._on_activate = function () {
		nexacro.Component.prototype._on_activate.call(this);

		var comboedit = this.comboedit;
		if (comboedit) {
			nexacro.Edit.prototype._on_activate.call(comboedit);
		}
	};

	_pCombo._on_dropdown = function () {
		if (this.readonly) {
			return;
		}

		var comboedit = this.comboedit;
		var input_elem = comboedit ? comboedit._input_element : null;
		if (input_elem && input_elem._is_accept_touch && !input_elem._is_accept_touch()) {
			return false;
		}

		var ds = this._selectDataset(true);
		var idx = this.index;

		if (this._isPopupVisible()) {
			this._closePopup();
			this._setEditValue(this._getItemText(this.index));
		}
		else {
			var comboedit = this.comboedit;
			if (comboedit) {
				comboedit.setSelect(0, 0);
			}

			if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
				this._clearFilteredDataset();
			}

			this._showPopup(ds, idx, 1);
		}
	};

	_pCombo._on_value_change = function (preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!this.on_fire_canitemchange(this, preindex, pretext, prevalue, postindex, posttext, postvalue)) {
			return false;
		}

		var ds = this._selectDataset();
		var before_index = ds ? this._getIndexFromValue(ds, postvalue) : this.index;

		var bind_applied = this.applyto_bindSource("value", postvalue);
		if (bind_applied) {
			var after_index = ds ? this._getIndexFromValue(ds, postvalue) : this.index;
			if (before_index == after_index) {
				this.value = postvalue;
				this.text = posttext;
				this.index = postindex;
			}
		}
		else {
			if (prevalue == postvalue) {
				if (preindex != postindex) {
					this.value = postvalue;
					this.text = posttext;
					this.index = postindex;
				}
			}
			else {
				return false;
			}
		}

		if (nexacro._enableaccessibility) {
			this._updateAccessibilityLabel();
		}

		this.on_fire_onitemchanged(this, preindex, pretext, prevalue, postindex, posttext, postvalue);

		return true;
	};

	_pCombo._on_dataset_onvaluechanged = function (obj, e) {
		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			this._createFilteredDataset();
		}

		this._recheckValue();
		this.redraw();

		if (this._is_created) {
			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};

	_pCombo._on_dataset_onrowsetchanged = function (obj, e) {
		if (e.reason == nexacro.NormalDataset.REASON_FILTER) {
			if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
				this._createFilteredDataset();
			}

			this._recheckValue();
			this.redraw();

			return;
		}
		else if (e.reason == nexacro.NormalDataset.REASON_ASSIGN) {
			this.set_index(-1);
			this._recheckIndex();
			this.redraw();
		}
		else if (e.reason == nexacro.NormalDataset.REASON_COPY || 
			e.reason == nexacro.NormalDataset.REASON_ENABLEEVENT) {
			if (this.index > -1) {
				this._recheckIndex();
			}
			else if (this.value !== undefined) {
				this._recheckValue();
			}
			else if (this.text !== "") {
				this._recheckText();
			}

			this.redraw();
			this._setDefaultProps(this.index, this.value, this.text);
		}
	};

	_pCombo._on_edit_onlbuttondown = function (obj, e) {
		if (this.readonly || (nexacro._isTouchInteraction && nexacro._SupportTouch)) {
			return;
		}

		var comboedit = this.comboedit;
		var input_elem = comboedit ? comboedit._input_element : null;
		if (input_elem && input_elem._is_accept_touch && !input_elem._is_accept_touch()) {
			return false;
		}

		var ds = this._selectDataset(true);
		var idx = this.index;

		if (this._isPopupVisible()) {
			this._closePopup();
			this._setEditValue(this._getItemText(this.index));
		}
		else {
			if (this.type == "dropdown") {
				this._showPopup(ds, idx, 1);
			}
		}
	};

	_pCombo._on_edit_onkeydown = function (obj, e) {
		var combolist = this.combolist;

		if (this.readonly) {
			return false;
		}

		var ds = this._selectDataset();
		var datacol = this.datacolumn;
		var codecol = this.codecolumn;

		if (!ds || (!datacol && !codecol)) {
			return;
		}

		var keycode = e.keycode;

		var pre_value = this._default_value;
		var pre_text = this._default_text;
		var pre_index = this._default_index;

		var cur_value = this.value;
		var cur_text = this.text;
		var cur_index = this.index;

		var nextidx;
		var rawidx;
		var curobj = null;
		var text = "";
		var rowcnt = ds.getRowCount();

		var enableaccessibility = nexacro._enableaccessibility;

		if (this._isPopupVisible()) {
			curobj = combolist._get_rowobj_status("mouseover", "status") || combolist._get_rowobj_status("selected", "userstatus");
			if (curobj) {
				cur_index = curobj.index;
			}
		}

		if (keycode == nexacro.Event.KEY_ESC) {
			if (this._isPopupVisible()) {
				text = this._getItemText(this.index);

				this._closePopup();
				this._setEditValue(text);
			}
		}
		else if (keycode == nexacro.Event.KEY_UP) {
			nextidx = cur_index - 1;
			if (this._isPopupVisible()) {
				if (!e.altkey) {
					if (nextidx < 0) {
						nextidx = 0;
					}

					text = ds.getColumn(nextidx, datacol || codecol);

					this._setEditValue(text);
					combolist._refreshScroll(nextidx, 1);
					combolist._change_status_item_from_key(cur_index, nextidx);
				}
			}
			else {
				if (!enableaccessibility || e.ctrlkey) {
					if (nextidx < 0) {
						nextidx = 0;
					}

					if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
						rawidx = this._getRawIndex(ds, nextidx);
						rawidx = (rawidx == -1) ? nextidx : rawidx;
						this._clearFilteredDataset();

						nextidx = rawidx;
					}

					if (this.index != nextidx) {
						cur_value = this._getItemValue(nextidx);
						cur_text = this._getItemText(nextidx);
						cur_index = nextidx;

						if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value)) {
							cur_value = pre_value;
							cur_text = pre_text;
							cur_index = pre_index;
						}

						this._setDefaultProps(cur_index, cur_value, cur_text);
						this.redraw();
					}
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_DOWN) {
			nextidx = cur_index + 1;

			if (this._isPopupVisible()) {
				if (!e.altkey) {
					if (nextidx < rowcnt) {
						text = ds.getColumn(nextidx, datacol || codecol);
						text = text == undefined ? "" : text;

						this._setEditValue(text);
						combolist._refreshScroll(nextidx, 0);
						combolist._change_status_item_from_key(cur_index, nextidx);
					}
				}
			}
			else {
				var comboedit = this.comboedit;
				var input_elem = comboedit ? comboedit._input_element : null;
				if (e.altkey && (!input_elem || (input_elem && (!input_elem._is_accept_touch || (input_elem._is_accept_touch && input_elem._is_accept_touch()))))) {
					this._showPopup(ds, cur_index, 1);
				}
				else if (!e.altkey) {
					if (!enableaccessibility || e.ctrlkey) {
						if (nextidx >= rowcnt) {
							nextidx = rowcnt - 1;
						}

						if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
							rawidx = this._getRawIndex(ds, nextidx);
							rawidx = (rawidx == -1) ? nextidx : rawidx;
							this._clearFilteredDataset();

							nextidx = rawidx;
						}

						if (this.index != nextidx) {
							cur_value = this._getItemValue(nextidx);
							cur_text = this._getItemText(nextidx);
							cur_index = nextidx;

							if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value)) {
								cur_value = pre_value;
								cur_text = pre_text;
								cur_index = pre_index;
							}

							this._setDefaultProps(cur_index, cur_value, cur_text);
							this.redraw();
						}
					}
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_ENTER) {
			if (cur_index >= 0) {
				if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
					rawidx = this._getRawIndex(ds, cur_index);
					rawidx = (rawidx == -1) ? cur_index : rawidx;
					ds.set_filterstr("");
				}
				else {
					rawidx = cur_index;
				}
			}
			else {
				rawidx = cur_index;
			}

			if (this.index != rawidx) {
				cur_value = this._getItemValue(rawidx);
				cur_text = this._getItemText(rawidx);
				cur_index = rawidx;

				if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value)) {
					this._setEditValue(this.text);
					cur_value = pre_value;
					cur_text = pre_text;
					cur_index = pre_index;
				}
			}

			this.redraw();

			if (this._isPopupVisible()) {
				this._is_close_popup_by_select = true;
				this._closePopup();
				this._is_close_popup_by_select = false;

				if (this.autoskip) {
					this._setFocusToNextComponent();
				}
			}

			this._setDefaultProps(cur_index, cur_value, cur_text);
		}
	};

	_pCombo._on_edit_oninput = function (obj, e) {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		this._isFiredOnInput = true;
		this.on_fire_oninput();

		var comboedit = this.comboedit;

		var input_elem = comboedit ? comboedit._input_element : null;
		if (input_elem && (input_elem._is_accept_touch && !input_elem._is_accept_touch())) {
			if (this._isPopupVisible()) {
				this._closePopup();
			}
			return false;
		}


		var ds = this._selectDataset();
		if (ds && comboedit._processing_keyfilter) {
			var col = this.datacolumn || this.codecolumn;
			var edit_val = comboedit.text;

			var type = this.type;
			if (type != "dropdown") {
				if (!this.combolist) {
					this._createPopupListBoxControl(ds);
				}
			}

			switch (type) {
				case "search":
				case "caseisearch":
					var index;
					if (this.type == "caseisearch") {
						edit_val = new nexacro.ExprParser()._transferWhitespace(edit_val);
						index = ds.findRowExpr(col + ".match(/^" + edit_val + "/i)");
					}
					else {
						index = ds.findRowAs(col, edit_val);
					}

					if (index >= 0) {
						this._showPopup(ds, index);
					}
					else {
						if (this._isPopupVisible()) {
							this._closePopup();
						}
					}
					break;
				case "filter":
				case "filterlike":
				case "caseifilter":
				case "caseifilterlike":
					var regExp;
					var parse_val = "";
					var trans_val = "";
					var edit_val_len = edit_val.length;

					for (var i = 0; i < edit_val_len; i++) {
						regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
						var c = edit_val.charAt(i);

						if (regExp.test(c)) {
							parse_val += "\\";
						}
						parse_val += c;
					}

					trans_val = new nexacro.ExprParser()._transferWhitespace(parse_val);

					if (this.type == "filter") {
						ds.set_filterstr(col + ".match(/^(" + trans_val + ")/)");
					}
					else if (this.type == "filterlike") {
						ds.set_filterstr(col + ".indexOf('" + parse_val + "') > -1");
					}
					else if (this.type == "caseifilter") {
						ds.set_filterstr(col + ".match(/^(" + trans_val + ")/i)");
					}
					else {
						ds.set_filterstr(col + ".match(/(" + trans_val + ")/i)");
					}

					if (edit_val && ds.getRowCount() > 0) {
						this._showPopup(ds, 0);

						var win = this._getWindow();
						if (win) {
							if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
								nexacro._flushCommand(win);
							}
						}
					}
					else {
						if (this._isPopupVisible()) {
							this._closePopup();
						}
					}
					break;
				default:
					break;
			}
		}
	};

	_pCombo._on_edit_oneditclick = function (obj, e) {
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, obj, obj, e.metakey);
	};

	_pCombo._on_edit_mobile_oneditclick = function (obj, e) {
		if (!this.readonly) {
			var comboedit = this.comboedit;
			var input_elem = comboedit ? comboedit._input_element : null;
			if (input_elem && input_elem._is_accept_touch && !input_elem._is_accept_touch()) {
			}
			else {
				var ds = this._selectDataset(true);
				var idx = this.index;

				if (this._isPopupVisible()) {
					this._closePopup();
					this._setEditValue(this._getItemText(this.index));
				}
				else {
					if (this.type == "dropdown") {
						this._showPopup(ds, idx, 1);
					}
				}
			}
		}
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, obj, obj, e.metakey);
	};

	_pCombo._on_drop_onlbuttondown = function (obj, e) {
		if (e.button == "lbutton") {
			this._on_dropdown();
		}
	};

	_pCombo._on_drop_mobile_onclick = function (obj, e) {
		this._on_dropdown();
	};

	_pCombo._on_drop_onclick = function (obj, e) {
		if (e.button == "touch") {
			this._on_dropdown();
		}
	};

	_pCombo._on_list_onitemclick = function (obj, e) {
		if (!this.combolist || !this.comboedit) {
			return false;
		}

		var pre_value = this.value;
		var pre_text = this.text;
		var pre_index = this.index;

		var cur_index = e.index;
		var cur_text = e.itemtext;
		var cur_value = e.itemvalue;

		this.on_fire_onitemclick(obj, cur_index, cur_text, cur_value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.metakey);

		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			var ds = this._selectDataset();
			cur_index = this._getRawIndex(ds, e.index);
			if (cur_index != this.index) {
				cur_text = this._getItemText(cur_index);
				cur_value = this._getItemValue(cur_index);
			}
		}

		this._is_close_popup_by_select = true;
		if (cur_index != this.index) {
			if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value)) {
				this.value = cur_value = pre_value;
				this.text = cur_text = pre_text;
				this.index = cur_index = pre_index;
			}

			this.redraw();

			if (this._isPopupVisible()) {
				this._closePopup();

				if (this.autoskip) {
					this._setFocusToNextComponent();
				}
			}

			this._setDefaultProps(cur_index, cur_value, cur_text);
		}
		else {
			this.redraw();

			if (this._isPopupVisible()) {
				this._closePopup();
			}
		}
		this._is_close_popup_by_select = false;
	};

	_pCombo._on_list_oncloseup = function (obj, e) {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		if (!this._isFiredOnInput) {
			if (this.displaynulltext != "" && nexacro._isNull(this.value)) {
				this._setEditValue(undefined);
			}
			else {
				this._setEditValue(this.text);
			}
		}

		this._isFiredOnInput = false;
		this._changeStatus("mouseover", false);
		this.comboedit._changeStatus("mouseover", false);
		this.dropbutton._changeStatus("mouseover", false);

		this.on_fire_oncloseup(this, this._default_index, this._default_text, this._default_value, this.index, this.text, this.value, this._is_close_popup_by_select);
	};

	_pCombo.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._changeStatus("focused", true);

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFocus(evt_name);
		}

		this._apply_setfocus(evt_name);
	};

	_pCombo.on_killfocus_basic_action = function (new_focus, new_refer_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit._changeStatus("focused", false);
			if (nexacro._enableaccessibility) {
				if (nexacro._Browser == "Runtime") {
					comboedit._is_subfocused = false;
				}
			}

			if (this.text != this.comboedit.text) {
				comboedit.setCaretPos(0);
			}
		}

		this.redraw();

		if (this._isPopupVisible()) {
			this._closePopup();
		}
	};

	_pCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp, meta_key) {
		if (this.readonly) {
			return false;
		}

		var ds = this._selectDataset();
		if (!ds) {
			return false;
		}

		var last_focus = this._find_lastFocused();
		if ((!this._is_subcontrol && this != last_focus) || (this._is_subcontrol && this._getRootComponent(this) != last_focus)) {
			return false;
		}

		var popupcontrol = this._popupcontrol;
		if (!popupcontrol || !popupcontrol._is_popup()) {
			var curidx = this.index;
			var nextidx = 0;

			if (wheelDeltaY > 0) {
				if (curidx > 0) {
					nextidx = curidx - 1;
				}
			}
			else {
				nextidx = curidx + 1;
			}

			if (this.index != nextidx && nextidx < ds.getRowCount()) {
				var pre_index = this.index;
				var pre_text = this.text;
				var pre_value = this.value;

				var cur_index = nextidx;
				var cur_text = this._getItemText(nextidx);
				var cur_value = this._getItemValue(nextidx);

				var ret = this.on_fire_canitemchange(this, pre_index, pre_text, pre_value, cur_index, cur_text, cur_value);
				if (ret) {
					this.set_index(nextidx);

					this.on_fire_onitemchanged(this, pre_index, pre_text, pre_value, cur_index, cur_text, cur_value);

					this._setDefaultProps(this.index, this.value, this.text);
				}
			}
		}

		return true;
	};

	_pCombo.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		if (this._isPopupVisible()) {
			var combolist = this.combolist;
			var item = null;
			var item_len = combolist._getContentsCount();
			if (item_len) {
				if (direction) {
					combolist._overeditemindex++;
				}
				else {
					combolist._overeditemindex--;
				}

				if (combolist._overeditemindex < 0 || combolist._overeditemindex > item_len - 1) {
					if (this._isPopupVisible()) {
						this._closePopup();
					}
					combolist._overeditemindex = -1;
				}
				else {
					item = combolist._getItem(combolist._overeditemindex);
				}
			}

			if (item) {
				ret = true;
				item._setAccessibilityNotifyEvent();
			}
		}
		return ret;
	};

	_pCombo.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		return (this._popupcontrol && this._popupcontrol._is_popup()) ? true : false;
	};

	_pCombo.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

		return (this._popupcontrol && this._popupcontrol._is_popup()) ? true : false;
	};

	_pCombo.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var evt = new nexacro.EditClickEventInfo(obj, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key);
			return this.oneditclick._fireEvent(this, evt);
		}

		return true;
	};

	_pCombo.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);
			this.onitemclick._fireEvent(this, evt);
		}

		return false;
	};

	_pCombo.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.canitemchange._fireCheckEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
			this.onitemchanged._fireEvent(this, evt);
		}
	};

	_pCombo.on_fire_oncloseup = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue, is_select) {
		var ret;
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.ComboCloseUpEventInfo(this, "oncloseup", preindex, pretext, prevalue, postindex, posttext, postvalue, is_select);
			ret = this.oncloseup._fireEvent(this, evt);
			ret = nexacro._toBoolean(ret);
		}

		return ret;
	};

	_pCombo.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = new nexacro.EventInfo(this, "ondropdown");
			return this.ondropdown._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pCombo.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pCombo.on_fire_oninnerdatachanged = function (obj, oldvalue, newvalue, columnid, col, row) {
		if (this.oninnerdatachanged && this.oninnerdatachanged._has_handlers) {
			var evt = new nexacro.InnerdataChangedEventInfo(obj, "oninnerdatachanged", oldvalue, newvalue, columnid, col, row);
			return this.oninnerdatachanged._fireEvent(this, evt);
		}

		return true;
	};

	_pCombo.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (this.isDropdown()) {
			var sel_info_list = this.combolist._selectinfo_list;

			if (this._scroll_proc) {
				if (sel_info_list.length) {
					var last = sel_info_list.length - 1;
					var info = sel_info_list[last];

					if (info.index != this.index) {
						info.obj._stat_change("notselect", "normal");
						sel_info_list.splice(last, 1);
					}
				}
				return;
			}

			while (sel_info_list.length) {
				var down_item = sel_info_list[0].obj;
				if (down_item) {
					if (!down_item.selected) {
						down_item._stat_change("notselect", "normal");
					}
				}
				sel_info_list.shift();
			}
		}
		return;
	};


	_pCombo._createListBoxControl = function (ds) {
		if (!this._isUsableDataset(ds)) {
			return;
		}

		var datacol = this.datacolumn;
		var codecol = this.codecolumn;
		var combolist = this.combolist;

		if (!combolist) {
			combolist = this.combolist = new nexacro._ComboListControl("combolist", 0, 0, 0, 0, null, null, null, null, null, null, this);

			combolist.set_scrolltype("vertical");
			var vscrollbartype = this._getVScrollBarType() || "auto";

			combolist.set_scrollbartype("none " + vscrollbartype);
			combolist.setInnerDataset(ds);
			combolist.set_codecolumn(codecol);
			combolist.set_datacolumn(datacol);
			combolist.set_index(this.index);
			combolist.set_itemheight(this.itemheight);
			combolist.set_cssclass(this.cssclass);
			combolist.set_scrollbarbarminsize(this.scrollbarbarminsize);
			combolist.set_scrollbardecbuttonsize(this.scrollbardecbuttonsize);
			combolist.set_scrollbarbaroutsize(this.scrollbarbaroutsize);
			combolist.set_scrollbarincbuttonsize(this.scrollbarincbuttonsize);
			combolist.set_scrollbarsize(this.scrollbarsize);
			combolist.set_scrollbartrackbarsize(this.scrollbartrackbarsize);

			combolist._setPopupContains(true);
			combolist.createComponent(true);
		}
		else {
			if (combolist._is_created) {
				if (combolist._innerdataset != ds) {
					combolist.setInnerDataset(ds);
				}
			}
		}
	};

	_pCombo._createdListBoxControl = function (ds) {
		var combolist = this.combolist;
		if (combolist && !combolist._is_created) {
			combolist._setEventHandler("oncloseup", this._on_list_oncloseup, this);
			combolist._setEventHandler("onitemclick", this._on_list_onitemclick, this);

			combolist.on_created();
		}
	};

	_pCombo._createPopupControl = function () {
		var popupcontrol = this._popupcontrol;
		if (!popupcontrol) {
			popupcontrol = this._popupcontrol = new nexacro._ComboPopupControl("combopopup", 0, 0, 0, 0, null, null, null, null, null, null, this);
			popupcontrol._setType(this.popuptype);

			popupcontrol.createComponent(true);
		}
	};

	_pCombo._createdPopupControl = function (attach_comp) {
		var popupcontrol = this._popupcontrol;
		if (popupcontrol && !popupcontrol._is_created) {
			popupcontrol._attach(attach_comp);
			popupcontrol.on_created();
		}
	};

	_pCombo._createPopupListBoxControl = function (ds) {
		if (!this._isUsableDataset(ds)) {
			return;
		}

		this._createPopupControl();
		this._createListBoxControl(ds);

		this._createdPopupControl(this.combolist);
		this._createdListBoxControl();
	};

	_pCombo._createFilteredDataset = function () {
		var ids = this._innerdataset;
		var fds = this._filtereddataset;
		var codecol = this.codecolumn;
		var datacol = this.datacolumn;
		var combolist = this.combolist;

		if (ids && (!(codecol in ids.colinfos) || !(datacol in ids.colinfos))) {
			return;
		}

		if (!this._isUsableDataset(ids)) {
			return;
		}

		if (!fds) {
			fds = this._filtereddataset = new nexacro.Dataset("filter_" + this.id);
		}

		fds.set_enableevent(false);

		fds.clear();
		fds.addColumn(codecol, "string");
		fds.addColumn(datacol, "string");

		for (var i = 0, cnt = ids.getRowCount(); i < cnt; i++) {
			fds.insertRow(i);
			fds.setColumn(i, codecol, ids.getColumn(i, codecol));
			fds.setColumn(i, datacol, ids.getColumn(i, datacol));
		}

		fds.set_enableevent(true);

		if (combolist) {
			combolist._redrawListBoxContents(false);
			combolist._onRecalcScrollSize();
		}
	};

	_pCombo._recalcLayout = function () {
		if (this._is_created_contents) {
			var comboedit = this.comboedit;
			var dropbutton = this.dropbutton;

			var client_left = this._getClientLeft();
			var client_top = this._getClientTop();
			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			var buttonsize = this.buttonsize;
			var buttonsize_w, buttonsize_h;

			if (buttonsize == undefined) {
				buttonsize_w = client_height;
				buttonsize_h = client_height;
			}
			else {
				if (typeof (buttonsize) == "number") {
					buttonsize_w = buttonsize_h = buttonsize;
				}
				else {
					buttonsize = buttonsize.split(" ");
					buttonsize_w = +buttonsize[0];
					buttonsize_h = (buttonsize[1]) ? +buttonsize[1] : client_height;
				}
			}

			if (buttonsize_w > client_width) {
				buttonsize_w = client_width;
			}
			if (buttonsize_h > client_height) {
				buttonsize_h = client_height;
			}

			if (dropbutton) {
				var btn_left = client_width - buttonsize_w;
				var btn_top = client_top;

				if (buttonsize_h < client_height) {
					btn_top = (client_height - buttonsize_h) / 2;
				}

				dropbutton.move(btn_left, btn_top, buttonsize_w, buttonsize_h, null, null);
			}

			if (comboedit) {
				var edit_width = client_width - buttonsize_w;

				comboedit.move(client_left, client_top, edit_width, client_height, null, null);
			}
		}
	};

	_pCombo._recheckIndex = function () {
		var idx = this.index;
		var txt = "";
		var val;

		var ds = this._innerdataset;
		if (ds) {
			var rowcount = ds.getRowCount();
			if (idx > -1 && rowcount > 0 && idx < rowcount) {
				val = this._getItemValue(idx);
				txt = this._getItemText(idx);
			}
			else {
				idx = -1;
			}
		}
		else {
			idx = -1;
		}

		this._setValue(val);
		this._setText(txt);
		this._setIndex(idx);
	};

	_pCombo._recheckValue = function () {
		var idx = -1;
		var txt = "";
		var val = this.value;
		var column = this.codecolumn || this.datacolumn;

		var ds = this._innerdataset;
		if (ds) {
			var rowcount = ds.getRowCount();
			if (rowcount > 0 && ds._isValidColumn(column)) {
				for (var i = 0; i < rowcount; i++) {
					if (val == this._getItemValue(i)) {
						idx = i;
						txt = this._getItemText(i);
						break;
					}
				}
			}
		}
		else {
			val = undefined;
		}

		this._setValue(val);
		this._setText(txt);
		this._setIndex(idx);
	};

	_pCombo._recheckText = function () {
		var idx = -1;
		var txt = this.text;
		var val;

		var ds = this._innerdataset;
		if (ds) {
			var rowcount = ds.getRowCount();
			if (rowcount > 0) {
				for (var i = 0; i < rowcount; i++) {
					if (txt == this._getItemText(i)) {
						idx = i;
						val = this._getItemValue(i);
						break;
					}
				}
			}
			else {
				txt = "";
			}
		}
		else {
			txt = "";
		}

		this._setValue(val);
		this._setText(txt);
		this._setIndex(idx);
	};

	_pCombo._selectDataset = function (bInit) {
		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			if (!this._filtereddataset) {
				this._createFilteredDataset();
			}
			else {
				if (bInit) {
					this._clearFilteredDataset();
				}
			}

			return this._filtereddataset;
		}
		else {
			return this._innerdataset;
		}
	};

	_pCombo._showPopup = function (ds, index, use_timer) {
		if (!nexacro._isDesktop() && !(nexacro._Browser == "Runtime" && nexacro._OS == "Android") && use_timer) {
			var thisP = this;

			setTimeout(function () {
				thisP._on_showPopup(ds, index);
			}, 200);
		}
		else {
			this._on_showPopup(ds, index);
		}
	};

	_pCombo._on_showPopup = function (ds, index) {
		if (!this.visible) {
			return;
		}

		if (this._isPopupVisible()) {
			this._closePopup();
		}

		var win = this._getWindow();
		var rowcnt = this._innerdataset.rowcount;

		if (this.on_fire_ondropdown(this)) {
			if ((this.ondropdown && this.dropdown.preventable && this.ondropdown.defaultprevented) || !this._isUsableDataset(ds) || this._getPopupType() == "none") {
				return;
			}

			index = (rowcnt == this._innerdataset.rowcount) ? index : this.index;

			this._createPopupListBoxControl(ds);

			var combolist = this.combolist;
			var comboedit = this.comboedit;

			var popupcontrol = this._popupcontrol;
			if (popupcontrol) {
				popupcontrol._popupAuto();
			}

			combolist._redrawListBoxContents(false);
			combolist._onRecalcScrollSize();

			if (combolist) {
				combolist.set_index(index);
				combolist._refreshScroll(index, 1);

				if (win) {
					win._setCaptureLock(this, true, false);
				}

				if (nexacro._enableaccessibility) {
					this._setAccessibilityStatExpanded(true);

					if (nexacro._accessibilitytype == 4) {
						combolist.setFocus(false);
					}
					else if (nexacro._accessibilitytype == 5) {
						this._want_arrows = true;
						combolist._setAccessibilityNotifyEvent();
					}

					if (nexacro._Browser == "Runtime") {
						if (comboedit) {
							comboedit._setAccessibilityLabel(this.text);
							comboedit._setAccessibilityDescription("");
							comboedit._setAccessibilityAction("");
							comboedit.setFocus(true);
						}
					}
				}
			}
		}
	};

	_pCombo._applyZoomPopup = function () {
		if (this._popupcontrol && this._popupcontrol._is_popup()) {
			if (this.enable === false || this.readonly === true || this.visible === false) {
				return;
			}

			var ds = this._selectDataset();
			if (ds) {
				if (ds.getRowCount() <= 0) {
					ds = this._innerdataset;
				}

				this._showPopup(ds, this.index);
			}
		}
	};

	_pCombo._closePopup = function () {
		var _window = this._getWindow();
		if (_window) {
			_window._releaseCaptureLock(this);
		}

		var popupcontrol = this._popupcontrol;
		if (popupcontrol) {
			popupcontrol._closePopup();
			nexacro._refreshWindow(_window.handle);
		}

		if (nexacro._enableaccessibility) {
			this._want_arrows = false;
			this._setAccessibilityStatExpanded(false);

			var combolist = this.combolist;
			if (combolist) {
				combolist._overeditemindex = -1;
			}

			if (nexacro._Browser == "Runtime") {
				var comboedit = this.comboedit;
				if (comboedit) {
					comboedit.on_apply_accessibility();
				}
			}
		}
	};

	_pCombo._setContents = function (str) {
		var doc = nexacro._parseXMLDocument(str);
		var node = doc.getElementsByTagName("Dataset")[0];

		if (!node) {
			return false;
		}

		var idstr = node.attributes[0].value;

		var normalDataset = new nexacro.NormalDataset(idstr, this);

		if (node.firstChild) {
			var childnode = node.firstChild;

			var strXML = "";
			while (childnode) {
				if (node.nodeType == 1) {
					strXML += nexacro._documentToXml(childnode);
				}
				childnode = childnode.nextSibling;
			}
			normalDataset._setContents(strXML);
		}

		this.set_innerdataset(normalDataset);

		return true;
	};

	_pCombo._convertValueType = function (v, bapplyrule) {
		var ret;
		if (bapplyrule) {
			ret = nexacro.Component.prototype._convertValueType.call(this, v);
		}
		else {
			ret = nexacro._isNull(v) ? v : nexacro._toString(v);
		}

		return ret;
	};

	_pCombo._setValue = function (v) {
		this.value = v;
	};

	_pCombo._setEditValue = function (v) {
		var comboedit = this.comboedit;
		if (comboedit) {
			var text = comboedit.text;
			if (text != v) {
				comboedit._setValue(v);
				if (nexacro._enableaccessibility) {
					comboedit._updateAccessibilityLabel();
					if (v) {
						if (nexacro._Browser == "Runtime" && comboedit._status == "focused") {
							comboedit._setAccessibilityLabel(v);
							comboedit._notifyAccessibility(v, "notify");
						}
					}
				}
			}
		}
	};

	_pCombo._setIndex = function (v) {
		this.index = v;
	};

	_pCombo._setText = function (v) {
		this.text = v;
	};

	_pCombo._setDefaultProps = function (index, value, text) {
		this._default_value = value;
		this._default_text = text;
		this._default_index = index;
	};
	_pCombo._setEventHandlerToComboEdit = function () {
		var comboedit = this.comboedit;
		if (comboedit) {
			var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
			if (bMobile) {
				comboedit._setEventHandler("oneditclick", this._on_edit_mobile_oneditclick, this);
				this._setEventHandler("onkeydown", this._on_edit_onkeydown, this);
			}
			else {
				comboedit._setEventHandler("onlbuttondown", this._on_edit_onlbuttondown, this);
				comboedit._setEventHandler("oneditclick", this._on_edit_oneditclick, this);
				comboedit._setEventHandler("onkeydown", this._on_edit_onkeydown, this);
			}


			comboedit._setEventHandler("oninput", this._on_edit_oninput, this);
		}
	};

	_pCombo._setEventHandlerToDropButton = function () {
		var dropbutton = this.dropbutton;
		if (dropbutton) {
			if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
				dropbutton._setEventHandler("onclick", this._on_drop_mobile_onclick, this);
			}
			else {
				dropbutton._setEventHandler("onclick", this._on_drop_onclick, this);
				dropbutton._setEventHandler("onlbuttondown", this._on_drop_onlbuttondown, this);
			}
		}
	};

	_pCombo._setEventHandlerToListBox = function () {
		var combolist = this.combolist;
		if (combolist) {
			combolist._setEventHandler("onitemclick", this._on_list_onitemclick, this);
			combolist._setEventHandler("canitemchange", this.on_notify_list_canitemchange, this);
			combolist._setEventHandler("onitemchanged", this.on_notify_list_onitemchanged, this);
		}
	};

	_pCombo._setInnerDatasetStr = function (str) {
		this._removeEventHandlerToInnerDataset();

		if (str) {
			str = str.replace("@", "");
			var _v = this._findDataset(str);
			this._innerdataset = _v ? _v : "";
			this.innerdataset = str;
		}
		else {
			this._innerdataset = null;
			this.innerdataset = "";
		}
	};

	_pCombo._setDefaultCaret = function () {
		var edit = this.comboedit;
		if (edit) {
			edit.setCaretPos(0);
		}
	};

	_pCombo._setFocusToNextComponent = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._getForm().getNextComponent(root_comp, true);
		if (next_comp) {
			next_comp.setFocus();
			if (next_comp._is_editable_control) {
				next_comp._setDefaultCaret();
			}
		}
	};

	_pCombo._getItemValue = function (index) {
		var ds = this._innerdataset;
		var column = this.codecolumn || this.datacolumn;

		if (ds && column) {
			var rtn = ds.getColumn(index, column);
			if (rtn == undefined && (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") && this._filtereddataset) {
				rtn = this._filtereddataset.getColumn(index, column);
			}

			return this._convertValueType(rtn, true);
		}

		return null;
	};

	_pCombo._getItemText = function (index) {
		var ds = this._innerdataset;
		var column = this.datacolumn || this.codecolumn;

		if (ds && column) {
			var rtn = ds.getColumn(index, column);
			if (rtn == undefined && (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") && this._filtereddataset) {
				rtn = this._filtereddataset.getColumn(index, column);
			}

			return nexacro._toString(rtn);
		}

		return null;
	};

	_pCombo._getIndexFromValue = function (ds, value) {
		if (value instanceof nexacro.Decimal) {
			value = value.toString();
		}

		var column = this.codecolumn || this.datacolumn;
		if (!ds._isValidColumn(column)) {
			return -1;
		}

		var row_count = ds.getRowCount();
		for (var i = 0; i < row_count; i++) {
			var v = this._getItemValue(i);
			if (v instanceof nexacro.Decimal) {
				v = v.toString();
			}

			if (value == v) {
				var newval = value;
				var preval = v;

				if (newval === 0) {
					newval = newval + "";
				}
				if (preval === 0) {
					preval = preval + "";
				}

				if (newval == preval) {
					return i;
				}
			}
		}

		return -1;
	};

	_pCombo._getIndexFromText = function (ds, text) {
		var row_count = ds.getRowCount();
		for (var i = 0; i < row_count; i++) {
			if (this._getItemText(i) == this.text) {
				return i;
			}
		}

		return -1;
	};

	_pCombo._getRawToListindex = function (idx) {
		if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
			var fds = this._getFilteredDataset();
			var fdsArr = fds._viewRecords;
			var row_count = fdsArr.length;

			for (var i = 0; i < row_count; i++) {
				if (fdsArr[i]._rawidx == idx) {
					return i;
				}
			}
		}
		return idx;
	};

	_pCombo._getRawIndex = function (fds, idx) {
		var ids = this._innerdataset;

		if (idx == -1 || (fds._viewRecords.length <= idx)) {
			return -1;
		}

		var rawidx = fds._viewRecords[idx]._rawidx;
		var idsArr = ids._rawRecords;
		var row_count = idsArr.length;

		for (var i = 0; i < row_count; i++) {
			if (idsArr[i]._rawidx == rawidx) {
				return rawidx;
			}
		}

		return -1;
	};

	_pCombo._getPopupType = function () {
		return this.popuptype ? this.popuptype : "normal";
	};

	_pCombo._isUsableDataset = function (ds) {
		if (!ds) {
			return false;
		}
		else {
			if (ds.getRowCount <= 0) {
				return false;
			}
			if (!this.datacolumn && !this.codecolumn) {
				return false;
			}
		}

		return true;
	};

	_pCombo._isPopupVisible = function () {
		var popupcontrol = this._popupcontrol;
		if (popupcontrol) {
			return popupcontrol._is_popup();
		}

		return false;
	};

	_pCombo._clearFilteredDataset = function () {
		if (this._filtereddataset) {
			this._filtereddataset.set_filterstr("");
		}
	};

	_pCombo._setAccessibilityInfoByHover = function (control) {
		if (this._isPopupVisible()) {
			var combolist = this.combolist;
			return combolist._setAccessibilityInfoByHover(control);
		}
		else {
			return this._setAccessibilityNotifyEvent();
		}
	};

	_pCombo._clearAccessibilityInfoByHover = function () {
		var combolist = this.combolist;
		if (combolist) {
			combolist._clearAccessibilityInfoByHover();
		}
	};

	_pCombo._getPopupSizeArr = function () {
		var size = this.popupsize;
		if (!size) {
			return;
		}
		size = size.split(/\s+/);
		var width = +size[0];
		var height = size[1] ? +size[1] : undefined;
		return {
			width : width, 
			height : height
		};
	};

	_pCombo._cancelEvent = function () {
		this._processing_keyfilter = false;
	};

	delete _pCombo;

	nexacro._ComboEditControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Edit.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay);
	};

	var _pComboEditControl = nexacro._createPrototype(nexacro.Edit, nexacro._ComboEditControl);
	nexacro._ComboEditControl.prototype = _pComboEditControl;
	_pComboEditControl._type_name = "EditControl";



	_pComboEditControl._is_subcontrol = true;
	_pComboEditControl._is_subfocused = false;




	_pComboEditControl.accessibilityrole = "combobox";



	_pComboEditControl._getFromComponent = function (comp) {
		var parent = comp.parent;
		if (parent && parent._isPopupVisible()) {
			return parent;
		}
		else {
			return nexacro.Component.prototype._getFromComponent.call(this, comp);
		}
	};

	_pComboEditControl.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			this._processing_keyfilter = true;

			if (nexacro._enableaccessibility) {
				if (nexacro._Browser == "Runtime") {
					this._is_subfocused = true;
				}
			}

			if (nexacro._OS == "Mac OS" || nexacro._OS == "OSX") {
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

				if (this._undostack && this.parent.type != "dropdown") {
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

	if (nexacro._Browser == "Runtime") {
		_pComboEditControl.on_keyup_basic_action = function () {
			this._processing_keyfilter = false;
		};
	}
	else {
		_pComboEditControl.on_keyup_basic_action = function () {
			this._processing_keyfilter = true;
		};
	}

	_pComboEditControl.set_value = function (v) {
		nexacro.Edit.prototype.set_value.call(this, v);

		this._setAccessibilityValue(this.text, false);
	};

	_pComboEditControl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, from_refer_comp, meta_key);
	};

	delete _pComboEditControl;

	nexacro._ComboButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pComboButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._ComboButtonControl);
	nexacro._ComboButtonControl.prototype = _pComboButtonControl;
	_pComboButtonControl._type_name = "ButtonControl";


	_pComboButtonControl._is_subcontrol = true;
	_pComboButtonControl._is_focus_accept = false;


	_pComboButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var combo = this.parent;
		if (combo) {
			var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
			if (bMobile) {
				nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			}
			else {
				combo._apply_setfocus(evt_name);
			}
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFocus(evt_name);
		}
	};

	_pComboButtonControl._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this.parent._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key);
			this.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key);
		}
	};

	delete _pComboButtonControl;

	nexacro._ComboListControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.ListBox.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._overedItem = null;
	};

	var _pComboListControl = nexacro._createPrototype(nexacro.ListBox, nexacro._ComboListControl);
	nexacro._ComboListControl.prototype = _pComboListControl;
	_pComboListControl._type_name = "ListBoxControl";
	_pComboListControl._is_subcontrol = true;




	_pComboListControl._overeditemindex = -1;




	_pComboListControl._event_list = {
		"onitemclick" : 1, 
		"onitemdblclick" : 1, 
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
		"canitemchange" : 1, 
		"onitemchanged" : 1, 
		"oncloseup" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"ondevicebuttonup" : 1
	};





	_pComboListControl.on_notify_item_onlbuttondown = function (obj, e) {
		this._do_select(obj.index, false);
	};

	_pComboListControl.on_notify_item_onlbuttonup = function (obj, e) {
		var up_item = this._upitem;
		if (up_item) {
			var rowobj;

			if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
				var win = this._getWindow();
				var touch_manager = win ? win._gesture_manager : null;
				if (touch_manager && touch_manager._is_ondrag) {
					rowobj = this._get_rowobj_status("selected", "userstatus");
					if (rowobj) {
						this._do_deselect(rowobj.index);
					}

					return;
				}
			}

			if ((up_item.index >= 0) && this._contains(up_item)) {
				obj = up_item;
			}
			else {
				rowobj = this._get_rowobj_status("selected", "userstatus");
				if (rowobj) {
					this._do_deselect(rowobj.index);
				}
				return;
			}

			this.on_fire_onitemclick(obj, obj.index, obj.text, obj.value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.metakey);
		}
	};

	_pComboListControl.on_notify_item_ontouchstart = function (obj, e) {
		this._do_select(obj.index, false);
	};

	_pComboListControl.on_notify_item_ontouchend = function (obj, e) {
		var info = (e.changedtouchinputinfos && e.changedtouchinputinfos[0]) ? e.changedtouchinputinfos[0] : null;
		if (info) {
			e.button = "lbutton";
			e.altkey = false;
			e.ctrlkey = false;
			e.shiftkey = false;
			e.metakey = false;
			e.screenx = info.screenx;
			e.screeny = info.screeny;
			e.canvasx = info.canvasx;
			e.canvasy = info.canvasy;
			e.clientx = info.clientx;
			e.clienty = info.clienty;
		}

		this.on_notify_item_onlbuttonup(obj, e);
	};

	_pComboListControl.on_notify_listbox_onkeydown = function (obj, e) {
	};

	_pComboListControl.on_notify_item_onmouseenter = function (obj, e) {
	};

	_pComboListControl.on_notify_item_onmouseleave = function (obj, e) {
	};

	_pComboListControl.on_notify_item_onmousemove = function (obj, e) {
		if (this._overeditemindex > -1) {
			var rowobj = this._getItem(this._overeditemindex);
			if (rowobj) {
				rowobj._changeStatus("mouseover", false);
			}
		}
	};

	_pComboListControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var combo = this.parent;
		if (combo) {
			if (nexacro._enableaccessibility) {
				combo._setAccessibilityStatFocus(evt_name);
			}

			combo._apply_setfocus(evt_name);
		}
	};

	_pComboListControl.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);
	};

	_pComboListControl.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pComboListControl.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
	};

	_pComboListControl.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pComboListControl.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pComboListControl.on_fire_sys_ontouchcancel = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
	};

	_pComboListControl.on_fire_oncloseup = function (obj) {
		var rowobj = this._get_rowobj_status("mouseover", "status");
		if (rowobj) {
			rowobj._changeStatus("mouseover", false);
		}

		if (this.oncloseup && this.oncloseup._has_handlers) {
			return this.oncloseup._fireEvent(this);
		}

		return false;
	};

	_pComboListControl._redrawListBoxContentsAfter = nexacro._emptyFn;

	_pComboListControl._createListItem = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		return new nexacro._ComboListItemControl(id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	_pComboListControl._createListItemControl = function (index) {
		var ds = this._innerdataset;

		if (!ds) {
			return null;
		}

		var dataCol = this.datacolumn ? this.datacolumn : this._datacolumn;
		var codeCol = this.codecolumn ? this.codecolumn : this._codecolumn;
		var txt = ds.getColumn(index, dataCol);
		txt = nexacro._toString(txt);
		var val = ds.getColumn(index, codeCol);
		val = this._convertValueType(val, true);

		var itemheight = this._getItemHeight();
		var client_w = this._getClientWidth();

		var item = this._createListItem("item_" + index, 0, index *  itemheight, Math.max(this._contents_maxwidth, client_w), itemheight, null, null, null, null, null, null, this);
		item.set_value(val);
		item.set_text(txt);
		item.set_index(index);
		item.set_selected(false);
		item.set_readonly(this.readonly);

		if (nexacro._enableaccessibility) {
			this._setItemAccessibility(item);
		}

		item._setEventHandler("onlbuttondown", this.on_notify_item_onlbuttondown, this);
		item._setEventHandler("onlbuttonup", this.on_notify_item_onlbuttonup, this);
		item._setEventHandler("ontouchstart", this.on_notify_item_ontouchstart, this);
		item._setEventHandler("ontouchend", this.on_notify_item_ontouchend, this);
		item._setEventHandler("onmouseenter", this.on_notify_item_onmouseenter, this);
		item._setEventHandler("onmouseleave", this.on_notify_item_onmouseleave, this);
		item._setEventHandler("onmousemove", this.on_notify_item_onmousemove, this);

		item.createComponent(this._is_created ? false : true);

		if (this.index == index) {
			item.set_selected(true);
		}

		return item;
	};

	_pComboListControl._change_status_item_from_key = function (curidx, nextidx) {
		var currowobj = this._getItem(curidx);
		var rowobj = this._getItem(nextidx);

		if (currowobj) {
			currowobj._changeStatus("mouseover", false);
		}
		if (rowobj) {
			rowobj._changeStatus("mouseover", true);
			this._overeditemindex = rowobj.index;
		}
	};

	_pComboListControl._setAccessibilityNotifyEvent = function (direction) {
		if (this._is_accessibility_changeIdx) {
			this._is_accessibility_changeIdx = false;
			return this.parent._setAccessibilityNotifyEvent(direction);
		}
		else {
			return nexacro.ListBox.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pComboListControl._changeIndex = function (v) {
		if (this.index != v) {
			var dataset = this._innerdataset;
			var postindex = parseInt(v, 10) | 0;

			if (dataset && (this.codecolumn || this.datacolumn)) {
				var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
				var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

				var posttext = datavalue == undefined ? "" : nexacro._toString(datavalue);
				var postvalue = codevalue;

				this._accessibility_index = this.index = postindex;
				this.text = posttext;
				this.value = postvalue;

				this._selectinfo.obj = null;
				this._selectinfo.index = postindex;
				this._selectinfo.text = posttext;
				this._selectinfo.value = postvalue;

				return true;
			}
		}

		return false;
	};

	_pComboListControl._get_rowobj_status = function (status, flag) {
		var buffer_pages = this._buffer_pages;
		if (buffer_pages) {
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					for (var j = 0, jlen = rowobjs.length; j < jlen; j++) {
						rowobj = rowobjs[j];
						if (rowobj && ((flag == "status" && rowobj._status == status) || (flag == "userstatus" && rowobj._userstatus == status))) {
							return rowobj;
						}
					}
				}
			}
		}

		return null;
	};

	_pComboListControl._get_all_rowobj_status = function (status, flag) {
		var ret = [];
		var buffer_pages = this._buffer_pages;
		if (buffer_pages) {
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					for (var j = 0, jlen = rowobjs.length; j < jlen; j++) {
						rowobj = rowobjs[j];
						if (rowobj && ((flag == "status" && rowobj._status == status) || (flag == "userstatus" && rowobj._userstatus == status))) {
							ret.push(rowobj);
						}
					}
				}
			}
		}

		return ret;
	};

	delete _pComboListControl;

	nexacro._ComboListItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ListBoxItemControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pComboListItemControl = nexacro._createPrototype(nexacro._ListBoxItemControl, nexacro._ComboListItemControl);
	nexacro._ComboListItemControl.prototype = _pComboListItemControl;










	_pComboListItemControl.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		var list = this.parent;
		if (list) {
			var window = this._getWindow();
			var comp = window.findComponent(from_elem);

			list._upitem = comp;
		}
		return nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
	};

	_pComboListItemControl.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var list = this.parent;
		if (list) {
			var comp;
			var window = this._getWindow();
			var touchinfo = touchinfos ? touchinfos[0] : null;
			if (touchinfo) {
				var elem = touchinfo.target;
				comp = window.findComponent(elem);
			}
			else {
				comp = window.findComponent(from_comp);
			}

			list._upitem = comp;
		}
		return nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};
	_pComboListItemControl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) {
		return;
	};


	delete _pComboListItemControl;

	nexacro._ComboPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pComboPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._ComboPopupControl);
	nexacro._ComboPopupControl.prototype = _pComboPopupControl;
	_pComboPopupControl._type_name = "popupCombo";





	_pComboPopupControl._popupAuto = function () {
		var pos = {
		};
		if (this._type == "center") {
			pos = this._getPopupPositionCenter();

			var root_frame = this._getRootFrame();
			if (root_frame) {
				this._popupBy(root_frame, pos.left, pos.top, pos.width, pos.height, true);
			}
		}
		else {
			pos = this._getPopupPosition();

			this._popupBy(this.parent, pos.left, pos.top, pos.width, pos.height);
		}
	};

	_pComboPopupControl._setType = function (type) {
		this._type = type;
	};

	_pComboPopupControl._getElementPosition = function () {
		var combo = this.parent;
		if (combo) {
			return nexacro._getElementPositionInFrame(combo.getElement());
		}

		return {
		};
	};
	_pComboPopupControl._getPopupParentPos = function () {
		var combo = this.parent;
		var combo_size = [combo._adjust_width, combo._adjust_height];
		var combo_elem_pos = nexacro._getElementPositionInFrame(combo.getElement());

		var xgap = 0, ygab = 0;

		if (nexacro._Browser == "MobileSafari") {
			var rootframe = this._getRootFrame();
			if (rootframe) {
				var rootframe_pos = nexacro._getElementPositionInFrame(rootframe.getElement());
				ygab = rootframe_pos.y < 0 ? rootframe_pos.y *  (-1) : 0;
			}
		}

		return {
			"x" : combo_elem_pos.x, 
			"y" : combo_elem_pos.y, 
			"width" : combo_size[0], 
			"height" : combo_size[1], 
			"xgap" : xgap, 
			"ygap" : ygab
		};
	};
	_pComboPopupControl._getPopupPosition = function () {
		var popup_left = 0;
		var popup_top = 0;
		var popup_width = 0;
		var popup_height = 0;
		var xgap = 0;
		var ygap = 0;

		var combo = this.parent;
		var combolist = this._attached_comp;
		var rootframe = this._getRootFrame();
		if (combo && combolist && rootframe) {
			var win = this._getWindow();

			var minimum_row = 3;

			var combopos = this._getPopupParentPos();
			var combo_elem_pos = {
				"x" : combopos.x, 
				"y" : combopos.y
			};
			var combo_size = [combopos.width, combopos.height];
			xgap = combopos.xgap;
			ygap = combopos.ygap;

			var combo_vscrollsize = combo._getVScrollBarSize();
			var combo_displayrowcount = combo.displayrowcount;
			var combo_roucount = combo._selectDataset() ? combo._selectDataset().getRowCount() : 0;
			var combo_popupsize = combo._getPopupSizeArr();

			var combolist_size = combolist._on_getFitSize();
			var combolist_itemheight = combolist._getItemHeight();

			var combolist_bordersize = combolist._getCurrentStyleBorder();
			combolist_bordersize = combolist_bordersize ? combolist_bordersize._getBorderHeight() : 0;

			var combolist_paddingsize = combolist._getCurrentStylePadding();
			combolist_paddingsize = combolist_paddingsize ? combolist_paddingsize.top + combolist_paddingsize.bottom : 0;

			var combolist_stylesize = combolist_bordersize + combolist_paddingsize;
			var combolist_minimum_height;
			var combolist_height;

			var screen_height = nexacro._getScreenAvailHeight();

			var rootframe_elem_pos = nexacro._getElementPositionInFrame(rootframe.getElement());
			var rootframe_screen_pos = nexacro._getElementScreenPosition(rootframe.getElement());


			var win_left = nexacro._allow_default_pinchzoom ? nexacro._getWindowOffsetPosition(win).left : rootframe_elem_pos.x;
			var window_width = win ? nexacro._getWindowHandleClientWidth(win.handle) : 0;
			var window_height = win ? nexacro._getWindowHandleClientHeight(win.handle) : 0;

			if (nexacro._Browser != "Runtime") {
				window_width = Math.round(window_width *  nexacro._getDevicePixelRatio(rootframe.getElement()));
				window_height = Math.round(window_height *  nexacro._getDevicePixelRatio(rootframe.getElement()));
			}
			var view_height;
			if ((window_height + rootframe_screen_pos.y) <= screen_height) {
				view_height = window_height;
			}
			else {
				view_height = screen_height - rootframe_screen_pos.y;
			}
			view_height = Math.round(view_height / nexacro._getDevicePixelRatio(rootframe.getElement()));
			var upper_space_height = combo_elem_pos.y;
			var below_space_height = view_height - (combo_elem_pos.y + combo_size[1]);

			popup_top = combo_size[1];

			if (combo_popupsize) {
				popup_width = combo_popupsize.width;
				popup_height = combo_popupsize.height ? combo_popupsize.height : popup_height;
			}
			else {
				popup_width = Math.max(combo_size[0], combolist_size[0]);
			}

			if (combo_displayrowcount == null) {
				combolist_minimum_height = (combo_roucount < minimum_row ? combo_roucount : minimum_row) *  combolist_itemheight + combolist_stylesize;
				combolist_height = popup_height ? popup_height : (combo_roucount *  combolist_itemheight) + combolist_stylesize;

				if (below_space_height > combolist_minimum_height) {
					if (below_space_height > combolist_height) {
						popup_height = combolist_height;
					}
					else {
						popup_height = below_space_height;

						if (!combo_popupsize) {
							if (popup_width == combolist_size[0]) {
								popup_width += combo_vscrollsize;
							}
						}
					}
				}
				else {
					if (upper_space_height > combolist_minimum_height) {
						if (upper_space_height > combolist_height) {
							popup_top = -combolist_height;
							popup_height = combolist_height;
						}
						else {
							popup_top = -upper_space_height;
							popup_height = upper_space_height;
						}
					}
					else {
						if (below_space_height > upper_space_height) {
							popup_height = below_space_height;
						}
						else {
							popup_top = -upper_space_height;
							popup_height = upper_space_height;
						}
					}
				}
			}
			else {
				if (combo_roucount > combo_displayrowcount) {
					combo_roucount = combo_displayrowcount;

					if (!combo_popupsize && popup_width <= combolist_size[0] + combo_vscrollsize) {
						popup_width = combolist_size[0] + combo_vscrollsize;
					}
				}

				combolist_minimum_height = combo_roucount *  combolist_itemheight + combolist_stylesize;

				if (below_space_height > combolist_minimum_height) {
					if (popup_height == 0) {
						popup_height = combolist_minimum_height;
					}
				}
				else {
					if (upper_space_height > combolist_minimum_height) {
						popup_top = -combolist_minimum_height;
						popup_height = combolist_minimum_height;
					}
					else {
						if (below_space_height > upper_space_height) {
							popup_height = below_space_height;
						}
						else {
							popup_top = -upper_space_height;
							popup_height = upper_space_height;
						}
					}
				}
			}


			var client_width = win ? nexacro._getWindowHandleClientWidth(win.handle) : 0;

			if (combo_elem_pos.x < win_left) {
				popup_left += win_left - combo_elem_pos.x;
			}
			else if (combo_elem_pos.x + popup_width > win_left + client_width) {
				popup_left -= (combo_elem_pos.x + popup_width) - (win_left + client_width);

				if (popup_left < (win_left - combo_elem_pos.x)) {
					popup_left = win_left - combo_elem_pos.x;
				}
			}
		}

		return {
			left : popup_left + xgap, 
			top : popup_top + ygap, 
			width : popup_width, 
			height : popup_height
		};
	};

	_pComboPopupControl._getPopupPositionCenter = function () {
		var popup_left = 0;
		var popup_top = 0;
		var popup_width = 0;
		var popup_height = 0;

		var window_width = 0;
		var window_height = 0;

		var combo = this.parent;
		var combolist = this._attached_comp;
		if (combo && combolist) {
			var add_addressbar_height = 0;
			var win = this._getWindow();
			if (win) {
				if (nexacro._OS == "iOS" && nexacro._Browser == "MobileSafari") {
					window_width = win.handle.innerWidth;
					window_height = win.handle.innerHeight;
					var body_scroll = nexacro._getWindowDestinationHandle(win.handle).scrollTop;
					if (body_scroll > 0) {
						add_addressbar_height += body_scroll *  2;
					}
				}
				else {
					window_width = nexacro._getWindowHandleClientWidth(win.handle);
					window_height = nexacro._getWindowHandleClientHeight(win.handle);
				}
			}
			if (nexacro._Browser == "Runtime") {
				window_width = Math.round(window_width / nexacro._getDevicePixelRatio(combo.getElement()));
				window_height = Math.round(window_height / nexacro._getDevicePixelRatio(combo.getElement()));
			}
			var combo_vscrollsize = combo._getVScrollBarSize();
			var combo_displayrowcount = combo.displayrowcount;
			var combo_roucount = combo._selectDataset() ? combo._selectDataset().getRowCount() : 0;
			var combo_popupsize = combo._getPopupSizeArr();

			var combolist_size = combolist._on_getFitSize();
			var combolist_itemheight = combolist._getItemHeight();

			var combolist_bordersize = combolist._getCurrentStyleBorder();
			combolist_bordersize = combolist_bordersize ? combolist_bordersize._getBorderHeight() : 0;

			var combolist_paddingsize = combolist._getCurrentStylePadding();
			combolist_paddingsize = combolist_paddingsize ? combolist_paddingsize.top + combolist_paddingsize.bottom : 0;

			var combolist_stylesize = combolist_bordersize + combolist_paddingsize;

			popup_width = combo_popupsize ? combo_popupsize.width : combolist_size[0];
			if (combo_popupsize && combo_popupsize.height) {
				popup_height = combo_popupsize.height;
			}
			else {
				popup_height = (combo_roucount *  combolist_itemheight) + combolist_stylesize;
			}

			if (combo_displayrowcount == null) {
				if (popup_height > window_height) {
					popup_height = window_height;
					popup_width += combo_vscrollsize;
				}
			}
			else {
				if (combo_roucount > combo_displayrowcount) {
					popup_height = (combo_displayrowcount *  combolist_itemheight) + combolist_stylesize;

					if (popup_height > window_height) {
						popup_height = window_height;
					}

					popup_width += combo_vscrollsize;
				}
				else {
					if (popup_height > window_height) {
						popup_height = window_height;
						popup_width += combo_vscrollsize;
					}
				}
			}

			popup_left = ((window_width / 2) - (popup_width / 2));
			popup_top = ((window_height / 2) - (popup_height / 2));
			popup_top = popup_top < 0 ? 0 : popup_top;
			popup_top += add_addressbar_height;
		}

		return {
			left : popup_left, 
			top : popup_top, 
			width : popup_width, 
			height : popup_height
		};
	};

	_pComboPopupControl._setZoom = function (scale) {
		var elem = this.getElement();
		if (elem.setElementZoom) {
			elem.setElementZoom(scale *  100);
		}
		else if (nexacro.ScrollableControlElement.prototype.setElementZoom) {
			nexacro.ScrollableControlElement.prototype.setElementZoom.call(elem, scale *  100);
		}
	};

	delete _pComboPopupControl;
}
