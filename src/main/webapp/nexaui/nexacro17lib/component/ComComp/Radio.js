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

if (!nexacro.Radio) {
	nexacro.RadioClickEventInfo = function (obj, id, index, itemText, itemValue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		nexacro.ClickEventInfo.call(this, obj, id || "onradioclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);

		this.index = index;
		this.itemtext = itemText;
		this.itemvalue = itemValue;
	};

	var _pRadioClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.RadioClickEventInfo);
	nexacro.RadioClickEventInfo.prototype = _pRadioClickEventInfo;
	_pRadioClickEventInfo._type_name = "RadioClickEventInfo";

	delete _pRadioClickEventInfo;

	nexacro.Radio = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._items = [];
		this._iconsize = {
		};
	};

	var _pRadio = nexacro._createPrototype(nexacro.Component, nexacro.Radio);
	nexacro.Radio.prototype = _pRadio;
	_pRadio._type_name = "Radio";


	_pRadio._text_elem = null;


	_pRadio.codecolumn = "";
	_pRadio.columncount = 0;
	_pRadio.datacolumn = "";
	_pRadio.direction = "horizontal";
	_pRadio.index = -1;
	_pRadio.innerdataset = null;
	_pRadio.readonly = false;
	_pRadio.rowcount = 0;
	_pRadio.value = undefined;
	_pRadio.text = "";
	_pRadio.acceptvaluetype = "allowinvalid";


	_pRadio._default_value = undefined;
	_pRadio._default_text = "";
	_pRadio._default_index = -1;
	_pRadio._want_tab = false;
	_pRadio._want_arrow = true;
	_pRadio._is_listtype = true;

	_pRadio._use_readonly_status = true;

	_pRadio.accessibilityrole = "radio";


	_pRadio._is_first_focus = false;
	_pRadio._accessibility_index = -1;
	_pRadio.accessibility = null;
	_pRadio.itemaccessibility = null;
	_pRadio.itemaccessibilityenable = true;


	_pRadio._event_list = 
		{
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"ondrag" : 1, 
		"ondrop" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondragend" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onitemclick" : 1, 
		"onitemchanged" : 1, 
		"canitemchange" : 1, 
		"oninnerdatachanged" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};

	_pRadio.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this.innerdataset) {
				this._createRadioTextElement();
			}
			else {
				this._redrawRadioItem();
			}
		}
	};

	_pRadio.on_created_contents = function (win) {
		if (!this._innerdataset && this.innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create(win);
		}

		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].on_created(win);
		}


		if (nexacro._enableaccessibility) {
			this.on_apply_prop_accessibilitylabel();
			this.on_apply_prop_itemaccessibilityenable();
		}
	};

	_pRadio.on_destroy_contents = function () {
		this._destroyRadioTextElement();
		this._destroyRadioItemControl();

		this._removeEventHandlerToInnerDataset();
	};

	_pRadio._removeEventHandlerToInnerDataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
			this._innerdataset = null;
		}
	};

	_pRadio.on_create_contents_command = function () {
		if (!this._innerdataset && this.innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
		}

		var str = "";
		var text_elem = this._text_elem;
		if (text_elem) {
			str += text_elem.createCommand();
		}

		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			str += items[i].createCommand();
		}
		return str;
	};

	_pRadio.on_attach_contents_handle = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].attachHandle(win);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}


		if (nexacro._enableaccessibility) {
			this.on_apply_prop_accessibilitylabel();
			this.on_apply_prop_itemaccessibilityenable();
		}
	};

	_pRadio.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var textElem = this._text_elem;
			if (textElem) {
				textElem.setElementSize(width, height);
			}
			else {
				this._recalcLayout();
			}
		}
	};

	_pRadio.on_change_containerPos = function () {
	};

	_pRadio.on_getBindableProperties = function () {
		return "value";
	};

	_pRadio.on_apply_prop_cssclass = function () {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_cssclass();
			}
		}
	};

	_pRadio.on_apply_prop_enable = function (enable) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i]._setEnable(enable);
			}
		}
	};

	_pRadio.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this.value = undefined;
			this.text = "";
			this.index = -1;

			this._doDeselect(this.index);
		}
	};

	_pRadio.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var val = ds.getColumn(row, col);
			val = this._convertValueType(val, true);

			this._setValue(val);

			var inner_ds = this._innerdataset;
			if (!inner_ds) {
				return true;
			}

			var post_index = inner_ds.findRow(this.codecolumn, val);

			this._block_read_aria_stat = true;
			this._doDeselect(this.index);

			this._setIndex(post_index);
			this._doSelect(post_index);

			if (!this._select_act) {
				this._default_value = val;
				this._default_index = post_index;
			}
			this._block_read_aria_stat = false;
		}
	};

	_pRadio._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab, _want_arrow;

		if (keycode && (keycode == nexacro.Event.KEY_TAB)) {
			want_tab = this._getPreCalculateWantTab(keycode, shiftKey);
		}
		else {
			_want_arrow = this._want_arrow;
		}

		if (this._is_first_focus) {
			this._is_first_focus = false;
		}

		return {
			want_tab : want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};

	_pRadio._setFocus = function (bResetScroll, dir) {
		this._focus_direction = dir;
		var retn = this.setFocus(bResetScroll);
		this._focus_direction = -1;
		return retn;
	};

	_pRadio._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var retn = false;
		var focusdir = this._focus_direction;
		if (evt_name == "tabkey") {
			focusdir = 0;
		}
		else if (evt_name == "shifttabkey") {
			focusdir = 1;
		}
		else if (evt_name == "downkey") {
			focusdir = 2;
		}
		else if (evt_name == "upkey") {
			focusdir = 3;
		}

		if (self_flag == false) {
			this._focus_direction = -1;
			if (this._isEnable()) {
				this._want_arrow = true;
			}
			else {
				this._want_arrow = false;
			}
		}

		if (focusdir >= 0) {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (self_flag == false) {
				var comp, items = this._items;
				if (focusdir < 2) {
					if (focusdir == 0) {
						this._accessibility_index = -1;
					}
					else {
						this._accessibility_index = items.length - 1;
					}

					if (items.length > 0) {
						this._is_first_focus = true;
						if (this.index > -1) {
							comp = items[this.index];
							if (comp) {
								this._accessibility_index = this.index;
								comp._on_focus(true);
								comp._changeUserStatus("selected", true);
							}
						}
					}
				}
				else {
					if (nexacro._enableaccessibility) {
						if (!this.readonly) {
							if (focusdir == 2) {
								items = this._items;
								this._is_first_focus = true;

								if (!this._isAccessibilityEnable()) {
									this._accessibility_index = 0;
									comp = items[this._accessibility_index];
									if (comp) {
										comp._on_focus(true);
									}
								}
								else {
									this._accessibility_index = -1;
								}
							}
							else if (focusdir == 3) {
								items = this._items;
								this._is_first_focus = true;

								this._accessibility_index = items.length - 1;
								comp = items[this._accessibility_index];
								if (comp) {
									comp._on_focus(true);
								}
							}
						}
					}
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		}
		return retn;
	};

	_pRadio._on_getAccessibilityAdditionalLabel = function () {
		if (this._isAccessibilityEnable() && !this._is_first_focus) {
			var count = 0;
			var items = this._items;
			if (items) {
				count = items.length;
			}
			return (+this.index + 1) + " " + count;
		}
		return "";
	};

	_pRadio._on_getAccessibilityAdditionalRole = function () {
		var _role = "";
		if (!this._is_first_focus && this._getAccessibilityRole(this.accessibility == "radio")) {
			_role = " radio";
		}
		return _role;
	};

	_pRadio.on_get_accessibility_label = function () {
		var label = "";
		if (!this._is_first_focus) {
			label = this.text ? this.text : this.value;
		}
		return label;
	};

	_pRadio._on_getFitSize = function () {
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

			var ds = this._innerdataset;
			var items = this._items;
			var item_len = items.length;
			if (ds && item_len) {
				var dir = this.direction;
				var priority_matrix;

				var radio_columncount = this.columncount;
				var radio_rowcount = this.rowcount;
				var ds_rowcount = ds.getRowCount();
				var apply_colcnt = 0;
				var apply_rowcnt = 0;

				var i, j;
				var item_size;
				var item_index = 0;

				if (radio_columncount == -1 && radio_rowcount == -1) {
					for (i = 0; i < item_len; i++) {
						item_size = items[i]._on_getFitSize();
						if (dir == "horizontal") {
							total_h = Math.max(total_h, item_size[1]);
							total_w += item_size[0];
						}
						else {
							total_h += item_size[1];
							total_w = Math.max(total_w, item_size[0]);
						}
					}
				}
				else {
					if (dir == "horizontal") {
						priority_matrix = "col";

						if (radio_columncount > 0) {
							apply_colcnt = radio_columncount;
						}
						else if ((radio_columncount == -1 && (radio_rowcount == -1 || radio_rowcount == 0)) || (radio_columncount == 0 && (radio_rowcount == 0 || radio_rowcount == ds_rowcount))) {
							apply_colcnt = 1;
						}
						else if (radio_columncount == -1 && radio_rowcount > 1) {
							apply_colcnt = Math.round(ds_rowcount / radio_rowcount);
						}
						else if (radio_rowcount > 0) {
							apply_colcnt = Math.ceil(ds_rowcount / radio_rowcount);
							if ((apply_colcnt *  radio_rowcount) < ds_rowcount) {
								apply_colcnt++;
							}
						}
						else {
							apply_colcnt = ds_rowcount;
						}

						if (apply_colcnt > ds_rowcount) {
							apply_colcnt = ds_rowcount;
						}

						apply_rowcnt = parseInt(ds_rowcount / apply_colcnt) | 0;

						if ((ds_rowcount > apply_colcnt) && (ds_rowcount % apply_colcnt) > 0) {
							apply_rowcnt++;
						}
					}
					else {
						if (radio_rowcount > 0) {
							apply_rowcnt = radio_rowcount;
						}
						else if (radio_columncount > 0) {
							apply_rowcnt = parseInt(ds_rowcount / radio_columncount);
							if ((radio_columncount *  apply_rowcnt) < ds_rowcount) {
								apply_rowcnt++;
							}
						}
						else {
							apply_rowcnt = 1;
						}

						if (apply_rowcnt > 0) {
							priority_matrix = "row";
							apply_colcnt = parseInt(ds_rowcount / apply_rowcnt) | 0;
						}
						else {
							priority_matrix = "col";
							apply_colcnt = radio_columncount;
						}

						if (apply_colcnt <= 0) {
							apply_colcnt = 1;
						}
						if (priority_matrix == "row" && (ds_rowcount > apply_rowcnt) && (ds_rowcount % apply_rowcnt) > 0) {
							apply_colcnt++;
						}
					}

					var maxsize_col = [];
					for (i = 0; i < apply_colcnt; i++) {
						maxsize_col[i] = 0;
					}

					if (priority_matrix == "col") {
						for (i = 0; i < apply_rowcnt; i++) {
							for (j = 0; j < apply_colcnt; j++) {
								if (ds_rowcount <= item_index) {
									break;
								}

								item_size = items[item_index]._on_getFitSize();
								if (maxsize_col[j] < item_size[0]) {
									maxsize_col[j] = item_size[0];
								}

								item_index++;
							}
						}
					}
					else {
						for (i = 0; i < apply_colcnt; i++) {
							for (j = 0; j < apply_rowcnt; j++) {
								if (ds_rowcount <= item_index) {
									break;
								}

								item_size = items[item_index]._on_getFitSize();
								if (maxsize_col[i] < item_size[0]) {
									maxsize_col[i] = item_size[0];
								}

								item_index++;
							}
						}
					}

					for (i = 0; i < apply_colcnt; i++) {
						total_w += maxsize_col[i];
					}
					if (item_size) {
						total_h += item_size[1] *  apply_rowcnt;
					}
				}
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pRadio.on_fire_sys_onaccessibilitygesture = function (direction) {
		var ret = false;
		var items = this._items;

		if (items && items.length > 0) {
			if (this._accessibility_index == undefined && this.index > -1) {
				this._accessibility_index = this.index;
			}

			if (direction > 0) {
				this._accessibility_index++;
			}
			else {
				this._accessibility_index--;
			}

			if (items[this._accessibility_index]) {
				ret = true;
				items[this._accessibility_index]._setAccessibilityNotifyEvent();
			}
		}

		return ret;
	};

	_pRadio._setAccessibilityNotifyEvent = function (direction) {
		var items = this._items;

		if (items && items.length > 0) {
			var obj = null;

			this._accessibility_index = -1;

			if (this._accessibility_index < 0 || this._accessibility_index >= items.length) {
				if (direction == undefined) {
					direction = 1;
				}

				if (direction > 0) {
					this._accessibility_index = 0;
				}
				else {
					this._accessibility_index = items.length - 1;
				}
			}

			obj = items[this._accessibility_index];
			if (obj) {
				return obj._setAccessibilityNotifyEvent();
			}
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pRadio._setAccessibilityInfoByHover = function (control) {
		if (control) {
			if (control.parent instanceof nexacro._RadioItemControl) {
				control = control.parent;
			}
			this._accessibility_index = control._index;
			return control._setAccessibilityNotifyEvent();
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this);
		}
	};


	_pRadio.set_text = nexacro._emptyFn;


	_pRadio._convertValueType = function (v, bapplyrule) {
		var ret;
		if (bapplyrule) {
			ret = nexacro.Component.prototype._convertValueType.call(this, v);
		}
		else {
			ret = nexacro._isNull(v) ? v : nexacro._toString(v);
		}

		return ret;
	};

	_pRadio.set_value = function (v) {
		v = this._convertValueType(v);

		if (this.value != v) {
			if (this.acceptvaluetype == "ignoreinvalid") {
				var ds = this._innerdataset;
				var code = this.codecolumn;
				var index = -1;
				if (ds && code) {
					index = ds.findRow(code, v);
					if (index < 0) {
						return;
					}
				}
			}

			this._select_act = true;
			if (!this.applyto_bindSource("value", v)) {
				this._select_act = false;
				return;
			}
			this._select_act = false;

			this.value = v;
			this.on_apply_value(v);
		}
	};
	_pRadio.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};
	_pRadio.on_apply_value = function (value) {
		var ds = this._innerdataset;
		var code = this.codecolumn;
		if (ds && code) {
			var index = ds.findRow(code, value);

			this._setIndex(index);
			this._block_read_aria_stat = true;
			this._doDeselect(this._default_index);
			this._doSelect(index);
			this._block_read_aria_stat = false;

			if (index >= 0) {
				this._default_value = value;
			}

			this._default_index = this.index;
		}
	};

	_pRadio.set_index = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.index != v) {
			this.index = v;
			this.on_apply_index(v);
		}
	};

	_pRadio.on_apply_index = function (index) {
		var ds = this._innerdataset;
		var code = this.codecolumn ? this.codecolumn : this.datacolumn;
		var val;
		if (ds && code) {
			if (!nexacro._isNull(index) && index >= 0 && index < ds.getRowCount()) {
				val = ds.getColumn(index, code);
				val = this._convertValueType(val, true);
			}
			else {
				index = this.index = -1;
			}

			if (this.value != val) {
				this._select_act = true;
				if (!this.applyto_bindSource("value", val)) {
					this.index = this._default_index;
					this._select_act = false;
					return;
				}
				this._select_act = false;

				this._setValue(val);
			}

			this._doDeselect(this._default_index);
			this._doSelect(index);

			this._default_value = val;
			this._default_index = index;

			if (this._isAccessibilityEnable()) {
				this.on_apply_accessibility();
			}
		}
	};

	_pRadio.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pRadio.on_apply_readonly = function (readonly) {
		var items = this._items;
		var item_len = items.length;
		var bReadonly = readonly ? true : false;

		this._changeStatus("readonly", bReadonly);

		for (var i = 0; i < item_len; i++) {
			items[i]._changeStatus("readonly", bReadonly);
		}
	};

	_pRadio.set_datacolumn = function (v) {
		if (this.datacolumn != v) {
			this.datacolumn = v;
			this.on_apply_datacolumn(v);
		}
	};

	_pRadio.on_apply_datacolumn = function (datacolumn) {
		var control_elem = this.getElement();
		var ds = this._innerdataset;
		if (control_elem && ds) {
			var val;
			var data = datacolumn == "" ? this.codecolumn : datacolumn;

			var i, n;
			var items = this._items;
			for (i = 0, n = items.length; i < n; i++) {
				val = ds.getColumn(i, data);
				if (val) {
					items[i].set_text(val);
					if (this.index == i) {
						this._setText(val);
					}
				}
				else {
					items[i].set_text("");
					this._setText("");
				}
			}
			this._updateItemInfo();
		}
	};

	_pRadio.set_codecolumn = function (v) {
		if (this.codecolumn != v) {
			this.codecolumn = v;
			this.on_apply_codecolumn(v);
		}
	};

	_pRadio.on_apply_codecolumn = function (codecolumn) {
		var control_elem = this.getElement();
		var ds = this._innerdataset;
		if (control_elem && ds) {
			this.on_apply_index(this.index);

			if (!this.datacolumn) {
				this.on_apply_datacolumn(this.datacolumn);
			}

			this._updateItemInfo();
		}
	};

	_pRadio.set_innerdataset = function (v) {
		if (typeof v != "string") {
			this.setInnerDataset(v);
			return;
		}

		if (this.innerdataset != v || (this.innerdataset && !this._innerdataset)) {
			this._setInnerDatasetStr(v);
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pRadio.on_apply_innerdataset = function (ds) {
		if (ds) {
			ds._setEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
		}

		var control_elem = this.getElement();
		if (control_elem) {
			this._destroyRadioItemControl();

			if (ds) {
				this._redrawRadioItem();
				if (this.index < 0) {
					this._default_value = this.value = undefined;
				}
			}
			else {
				this._createRadioTextElement();
			}
		}
	};

	_pRadio.set_columncount = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.columncount != v) {
			this.columncount = v;
			this.on_apply_columncount(v);
		}
	};

	_pRadio.on_apply_columncount = function () {
		this._recalcLayout();
	};

	_pRadio.set_rowcount = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.rowcount != v) {
			this.rowcount = v;
			this.on_apply_rowcount(v);
		}
	};

	_pRadio.on_apply_rowcount = function () {
		this._recalcLayout();
	};

	_pRadio.set_direction = function (v) {
		var direction_enum = ["horizontal", "vertical"];
		if (direction_enum.indexOf(v) == -1) {
			return;
		}

		if (this.direction != v) {
			this.direction = v;
			this.on_apply_direction(v);
		}
	};

	_pRadio.on_apply_direction = function () {
		this._recalcLayout();
	};

	_pRadio.set_itemaccessibilityrole = function (val) {
		if (val) {
			this.itemaccessibilityrole = val;
			this.on_apply_itemaccessibilityrole(val);
		}
		else {
			this.itemaccessibilityrole = "";
			this.on_apply_itemaccessibilityrole(" ");
		}
	};

	_pRadio.on_apply_itemaccessibilityrole = function (val) {
		var items = this._items;
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].set_accessibilityrole(val ? val : this.itemaccessibilityrole);
			}
		}
	};

	_pRadio.set_itemaccessibilitylabel = function (val) {
		if (val) {
			this.itemaccessibilitylabel = val;
			this.on_apply_itemaccessibilitylabel(val);
		}
		else {
			this.itemaccessibilitylabel = "";
			this.on_apply_itemaccessibilitylabel(" ");
		}
	};

	_pRadio.on_apply_itemaccessibilitylabel = function (val) {
		var items = this._items;
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].set_accessibilitylabel(val ? val : this.itemaccessibilitylabel);
			}
		}
	};

	_pRadio.set_itemaccessibilitydescription = function (val) {
		if (val) {
			this.itemaccessibilitydescription = val;
			this.on_apply_itemaccessibilitydescription(val);
		}
		else {
			this.itemaccessibilitydescription = "";
			this.on_apply_itemaccessibilitydescription(" ");
		}
	};

	_pRadio.on_apply_itemaccessibilitydescription = function (val) {
		var items = this._items;
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].set_accessibilitydescription(val ? val : this.itemaccessibilitydescription);
			}
		}
	};

	_pRadio.set_itemaccessibilityaction = function (val) {
		if (val) {
			this.itemaccessibilityaction = val;
			this.on_apply_itemaccessibilityaction(val);
		}
		else {
			this.itemaccessibilityaction = "";
			this.on_apply_itemaccessibilityaction(" ");
		}
	};

	_pRadio.on_apply_itemaccessibilityaction = function (val) {
		var items = this._items;
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].set_accessibilityaction(val ? val : this.itemaccessibilityaction);
			}
		}
	};

	_pRadio.set_itemaccessibilitydesclevel = function (val) {
		if (val) {
			this.itemaccessibilitydesclevel = val;
			this.on_apply_itemaccessibilitydesclevel(val);
		}
		else {
			this.itemaccessibilitydesclevel = "";
			this.on_apply_itemaccessibilitydesclevel(" ");
		}
	};

	_pRadio.on_apply_itemaccessibilitydesclevel = function (val) {
		var items = this._items;
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].set_accessibilitydesclevel(val ? val : this.itemaccessibilitydesclevel);
			}
		}
	};

	_pRadio.set_acceptvaluetype = function (v) {
		var type_enum = ["allowinvalid", "ignoreinvalid"];

		if (type_enum.indexOf(v) == -1) {
			return;
		}
		this.acceptvaluetype = v;
	};

	_pRadio.getCount = function () {
		return this._items.length;
	};

	_pRadio.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pRadio.setInnerDataset = function (obj) {
		this._removeEventHandlerToInnerDataset();

		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset(this._innerdataset);
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset(obj);
		}
	};


	_pRadio.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		var items = this._items;

		if (keycode == nexacro.Event.KEY_SPACE) {
			if (!this.readonly) {
				if (this._accessibility_index > -1) {
					items[this._accessibility_index]._changeUserStatus("focus", true);
					this.set_index(this._accessibility_index);
				}
			}
		}
		else {
			if (nexacro._enableaccessibility) {
				if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
					var accIdx = this._accessibility_index;
					var count = items.length;
					var comp;

					if (keycode == nexacro.Event.KEY_UP) {
						if (accIdx < 0) {
							this._want_arrow = false;
						}
						else {
							this._accessibility_index = accIdx += -1;
							comp = items[accIdx];
							if (comp) {
								comp._on_focus(true, "keyup");
							}
							else {
								if (accIdx == -1) {
									var last_focused = this._last_focused;
									if (last_focused) {
										this._doDefocus(last_focused, true);
									}
									else {
										this._doDefocus(this);
									}

									this._on_focus(true, "keyup");
								}
							}
						}
					}
					else {
						if ((accIdx + 1) >= count) {
							this._want_arrow = false;
						}
						else {
							this._accessibility_index = accIdx += 1;
							comp = items[accIdx];
							if (comp) {
								comp._on_focus(true, "keydown");
							}
						}
					}
				}
			}
		}

		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);
	};

	_pRadio._on_radioitem_onclick = function (obj) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		var pre_index = this._default_index;
		var pre_value = this._default_value;
		var pre_text = this._default_text;



		this.on_fire_onitemclick(obj, obj._index, obj.text, obj._value);
		if (this.index != obj._index) {
			var post_index = obj._index;
			var post_value = obj._value;
			var post_text = obj.text;

			var ret = this.on_fire_canitemchange(obj, pre_index, pre_text, pre_value, post_index, post_text, post_value);
			if (ret) {
				this.set_index(post_index);

				if (this.index != pre_index || pre_index == -1) {
					this.on_fire_onitemchanged(obj, pre_index, pre_text, pre_value, post_index, post_text, post_value);
				}

				if (nexacro._enableaccessibility) {
					this._accessibility_index = obj._index;
					obj._on_focus(true);
				}
			}
		}
	};

	_pRadio._on_icon_onload = function () {
		this._recalcLayout();
	};

	_pRadio._on_dataset_onvaluechanged = function (obj, e) {
		if (this._is_created) {
			this._redrawRadioItem();

			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};

	_pRadio._on_dataset_onrowsetchanged = function () {
		this._redrawRadioItem();
	};


	_pRadio.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
			return this.canitemchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pRadio.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
			return this.onitemchanged._fireEvent(this, evt);
		}
	};

	_pRadio.on_fire_onitemclick = function (obj, index, text, value) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(this, "onitemclick", index, text, value);
			return this.onitemclick._fireEvent(this, evt);
		}
		return false;
	};

	_pRadio.on_fire_oninnerdatachanged = function (obj, oldvalue, newvalue, columnid, col, row) {
		if (this.oninnerdatachanged && this.oninnerdatachanged._has_handlers) {
			var evt = new nexacro.InnerdataChangedEventInfo(obj, "oninnerdatachanged", oldvalue, newvalue, columnid, col, row);
			return this.oninnerdatachanged._fireEvent(this, evt);
		}

		return true;
	};

	_pRadio.on_keydown_basic_action = function () {
	};

	_pRadio.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp) {
		var E = nexacro.Event;
		var obj = this;
		if (nexacro._enableaccessibility) {
			if (keycode == E.KEY_UP || keycode == E.KEY_DOWN) {
				return false;
			}
		}

		if (keycode == nexacro.Event.KEY_TAB) {
			this._want_tab = false;
			this._is_first_focus = false;
		}
		else if (keycode == E.KEY_LEFT || keycode == E.KEY_RIGHT || keycode == E.KEY_UP || keycode == E.KEY_DOWN) {
			var ds = this._innerdataset;
			if (!ds || this.readonly) {
				return false;
			}

			var row_cnt = ds.getRowCount();
			if (row_cnt < 1) {
				return false;
			}

			var pre_index = this._default_index;
			var pre_value = this._default_value;
			var pre_text = this._default_text;

			var op = (keycode == E.KEY_LEFT || keycode == E.KEY_UP) ? -1 : (keycode == E.KEY_RIGHT || keycode == E.KEY_DOWN) ? 1 : 0;

			var idx = this.index + op;
			if (idx >= row_cnt) {
				idx = 0;
			}
			else if (idx < 0) {
				idx = row_cnt - 1;
			}
			var radioitem = this._getItem(idx);
			var ret = this.on_fire_canitemchange(obj, pre_index, pre_text, pre_value, idx, radioitem.text, radioitem._value);
			if (ret) {
				this._accessibility_index = idx;
				if (row_cnt != idx && row_cnt >= idx && 0 <= idx) {
					this.set_index(idx);
					if (idx != pre_index) {
						this.on_fire_onitemchanged(obj, pre_index, pre_text, pre_value, idx, radioitem.text, radioitem._value);
					}
				}

				if (nexacro._enableaccessibility) {
					radioitem._on_focus(true, op == -1 ? "keyleft" : (op == 1 ? "keyright" : undefined));
					radioitem._changeUserStatus("selected", true);
				}
			}
		}
		return false;
	};

	_pRadio._createRadioItemControl = function () {
		var ds = this._innerdataset;
		if (ds) {
			var rows = ds.getRowCount();
			if (rows > 0) {
				var item, text, value;
				var create_only = this._is_created ? false : true;
				var codecolumn = this.codecolumn;
				var datacolumn = this.datacolumn == "" ? codecolumn : this.datacolumn;
				for (var i = 0; i < rows; i++) {
					text = ds.getColumn(i, datacolumn);
					value = ds.getColumn(i, codecolumn);
					value = this._convertValueType(value, true);

					item = new nexacro._RadioItemControl("radioitem" + i, 0, 0, 0, 0, null, null, null, null, null, null, this);
					item.set_text(text);
					item._setItemInfo(i, value);

					item.createComponent(create_only);
					item._setEventHandler("onclick", this._on_radioitem_onclick, this);

					if (nexacro._enableaccessibility) {
						item._setAccessibilityInfoIndex(i);
						item._setAccessibilityInfoCount(rows);
					}

					this._items[i] = item;
				}
			}
		}
	};

	_pRadio._updateItemInfo = function () {
		var ds = this._innerdataset;
		if (!ds) {
			return;
		}

		var rows = ds.getRowCount();
		if (rows > 0) {
			var codecolumn = this.codecolumn;

			for (var i = 0; i < rows; i++) {
				var value = ds.getColumn(i, codecolumn);
				value = this._convertValueType(value, true);

				var item = this._items[i];
				item._setItemInfo(i, value);

				if (nexacro._enableaccessibility) {
					item._setAccessibilityInfoIndex(i);
					item._setAccessibilityInfoCount(rows);
				}

				this._items[i] = item;
			}
		}
	};

	_pRadio._createRadioTextElement = function () {
		var control_elem = this.getElement();
		var text_elem = this._text_elem;
		if (!text_elem && control_elem) {
			text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
			text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());

			if (this.textAlign) {
				text_elem.setElementTextAlign(this.textAlign);
			}
			if (this.verticalAlign) {
				text_elem.setElementVerticalAlign(this.verticalAlign);
			}

			text_elem.setElementText(this.name);

			if (this._is_created) {
				text_elem.create(this._getWindow());
			}
		}
	};

	_pRadio._destroyRadioItemControl = function () {
		var i, n;
		var items = this._items;
		for (i = 0, n = items.length; i < n; i++) {
			items[i].destroy();
			items[i] = null;
		}

		this._items = [];
	};

	_pRadio._destroyRadioTextElement = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}
	};

	_pRadio._recalcLayout = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var ds = this._innerdataset;
			var items = this._items;
			var item_len = items.length;
			if (ds && item_len) {
				var priority_matrix;
				var fittocontents = this.fittocontents;
				var dir = this.direction;

				var radio_columncount = this.columncount;
				var radio_rowcount = this.rowcount;
				var ds_rowcount = ds.getRowCount();
				var apply_colcnt = 1;
				var apply_rowcnt = ds_rowcount;

				var client_width = this._getClientWidth();
				var client_height = this._getClientHeight();
				var item_left = 0;
				var item_top = 0;
				var item_width, item_height;

				var i, j;
				var item, item_size, item_index = 0;
				var max_columnsize = [];
				var max_rowsize = [];
				var max_col = 1;

				if (radio_columncount == -1 && radio_rowcount == -1) {
					apply_rowcnt = 1;
					apply_colcnt = 0;
					var sum_width = 0;

					for (i = 0; i < item_len; i++) {
						item_size = items[i]._on_getFitSize();
						sum_width += item_size[0];

						if (client_width < sum_width) {
							apply_rowcnt++;
							sum_width = item_size[0];
							apply_colcnt = 1;
						}
						else {
							apply_colcnt++;
							max_col = max_col > apply_colcnt ? max_col : apply_colcnt;
						}
					}

					apply_colcnt = max_col;
					item_index = 0;
					for (i = 0; i < apply_rowcnt; i++) {
						item_left = 0;
						for (j = 0; j < apply_colcnt; j++) {
							if (ds_rowcount <= item_index) {
								break;
							}
							item = items[item_index];
							item_size = item._on_getFitSize();
							item_height = client_height / apply_rowcnt;

							item.move(item_left, item_top, item_size[0], item_height);

							item_left += item_size[0];

							if (item_left > client_width) {
								break;
							}

							item_index++;
						}

						item_top += item_height;
					}
				}
				else {
					if (dir == "horizontal") {
						if (radio_columncount > 0) {
							apply_colcnt = radio_columncount;
						}
						else if ((radio_columncount < 0 && radio_rowcount < 0) || (radio_columncount < 0 && radio_rowcount == 0) || (radio_columncount == 0 && radio_rowcount == 0) || (radio_columncount == 0 && radio_rowcount == ds_rowcount)) {
							apply_colcnt = 1;
						}
						else if (radio_columncount < 0 && (radio_columncount < radio_rowcount) && (radio_rowcount > 1)) {
							apply_colcnt = Math.round(apply_rowcnt / radio_rowcount);
						}
						else if (radio_rowcount > 0) {
							apply_colcnt = Math.ceil(apply_rowcnt / radio_rowcount);
							if ((apply_colcnt *  radio_rowcount) < apply_rowcnt) {
								apply_colcnt++;
								apply_rowcnt = (((apply_colcnt *  radio_rowcount) - apply_rowcnt) >= apply_colcnt) ? radio_rowcount - 1 : radio_rowcount;
							}
						}
						else {
							apply_colcnt = apply_rowcnt;
						}

						if (apply_colcnt > apply_rowcnt) {
							apply_colcnt = apply_rowcnt;
						}

						priority_matrix = "col";
						apply_rowcnt = parseInt(ds_rowcount / apply_colcnt) | 0;

						if ((ds_rowcount > apply_colcnt) && (ds_rowcount % apply_colcnt) > 0) {
							apply_rowcnt++;
						}
					}
					else {
						if (radio_rowcount > 0) {
							apply_rowcnt = radio_rowcount;
						}
						else if (radio_columncount > 0) {
							apply_rowcnt = parseInt(ds_rowcount / radio_columncount);
							if ((radio_columncount *  apply_rowcnt) < ds_rowcount) {
								apply_rowcnt++;
							}
						}
						else {
							apply_rowcnt = 1;
						}

						if (apply_rowcnt > 0) {
							priority_matrix = "row";
							apply_colcnt = parseInt(ds_rowcount / apply_rowcnt) | 0;
						}
						else {
							apply_colcnt = radio_columncount;
							priority_matrix = "col";
						}

						if (apply_colcnt <= 0) {
							apply_colcnt = 1;
						}
						if (priority_matrix == "row" && (ds_rowcount > apply_rowcnt) && (ds_rowcount % apply_rowcnt) > 0) {
							apply_colcnt++;
						}
					}

					item_width = client_width / apply_colcnt;
					item_height = client_height / apply_rowcnt;

					if (priority_matrix == "col") {
						if (fittocontents == "none") {
							for (i = 0; i < apply_rowcnt; i++) {
								for (j = 0; j < apply_colcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];
									item.move((item_width *  j), (item_height *  i), item_width, item_height);
									item_index++;
								}
								item_top += item_height;
							}
						}
						else {
							for (i = 0; i < apply_rowcnt; i++) {
								for (j = 0; j < apply_colcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];
									item_size = item._on_getFitSize();

									max_columnsize[j] = max_columnsize[j] ? Math.max(max_columnsize[j], item_size[0]) : item_size[0];
									max_rowsize[i] = max_rowsize[i] ? Math.max(max_rowsize[i], item_size[1]) : item_size[1];

									item_index++;
								}
							}

							item_index = 0;

							for (i = 0; i < apply_rowcnt; i++) {
								for (j = 0; j < apply_colcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];

									if (fittocontents == "both") {
										item.move(item_left, item_top, max_columnsize[j], max_rowsize[i]);
										item_left += max_columnsize[j];
									}
									else if (fittocontents == "width") {
										item.move(item_left, (item_height *  i), max_columnsize[j], item_height);
										item_left += max_columnsize[j];
									}
									else if (fittocontents == "height") {
										item.move((item_width *  j), item_top, item_width, max_rowsize[i]);
									}

									item_index++;
								}

								item_left = 0;
								if (fittocontents == "both" || fittocontents == "height") {
									item_top += max_rowsize[i];
								}
								else {
									item_top += item_height;
								}
							}
						}
					}
					else {
						if (fittocontents == "none") {
							for (i = 0; i < apply_colcnt; i++) {
								for (j = 0; j < apply_rowcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];
									item.move((item_width *  i), (item_height *  j), item_width, item_height);
									item_index++;
								}
								item_top += item_height;
							}
						}
						else {
							for (i = 0; i < apply_colcnt; i++) {
								for (j = 0; j < apply_rowcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];
									item_size = item._on_getFitSize();

									max_columnsize[i] = max_columnsize[i] ? Math.max(max_columnsize[i], item_size[0]) : item_size[0];
									max_rowsize[j] = max_rowsize[j] ? Math.max(max_rowsize[j], item_size[1]) : item_size[1];

									item_index++;
								}
							}

							item_index = 0;

							for (i = 0; i < apply_colcnt; i++) {
								for (j = 0; j < apply_rowcnt; j++) {
									if (ds_rowcount <= item_index) {
										break;
									}

									item = items[item_index];

									if (fittocontents == "both") {
										item.move(item_left, item_top, max_columnsize[i], max_rowsize[j]);
										item_top += max_rowsize[i];
									}
									else if (fittocontents == "width") {
										item.move(item_left, (item_height *  j), max_columnsize[i], item_height);
										item_top += max_rowsize[i];
									}
									else if (fittocontents == "height") {
										item.move((item_width *  i), item_top, item_width, max_rowsize[j]);
									}

									item_index++;
								}

								item_top = 0;
								if (fittocontents == "both" || fittocontents == "width") {
									item_left += max_columnsize[i];
								}
								else {
									item_left += item_width;
								}
							}
						}
					}
				}
			}
		}
	};

	_pRadio._redrawRadioItem = function () {
		this._destroyRadioTextElement();
		this._destroyRadioItemControl();
		this._createRadioItemControl();

		if (this.value !== undefined) {
			this.on_apply_value(this.value);
		}
		else if (this.index > -1) {
			this.on_apply_index(this.index);
		}

		this.on_apply_readonly(this.readonly);

		this._recalcLayout();
	};

	_pRadio._doSelect = function (index) {
		var item = this._getItem(index);
		if (item) {
			item._block_read_aria_stat = this._block_read_aria_stat;
			item._changeUserStatus("selected", true);
			item._block_read_aria_stat = false;

			this._setText(item.text);
		}
		else {
			this._setText("");
		}
	};

	_pRadio._doDeselect = function (index) {
		var item = this._getItem(index);
		if (item) {
			item._block_read_aria_stat = this._block_read_aria_stat;
			item._changeUserStatus("selected", false);
			item._block_read_aria_stat = false;
		}
	};

	_pRadio._doDefocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, false);
		}
	};

	_pRadio._setContents = function (str) {
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

	_pRadio._setValue = function (v) {
		if (v === null) {
			v = "";
		}

		this.value = (v === undefined) ? v : v.toString();
	};

	_pRadio._setIndex = function (v) {
		if ((v > 0) && (v >= this._items.length)) {
			v = -1;
		}

		this.index = v;
	};

	_pRadio._setText = function (v) {
		this.text = v;
		this._default_text = v;
	};

	_pRadio._setInnerDatasetStr = function (str) {
		this._removeEventHandlerToInnerDataset();

		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = this._findDataset(str);
			this.innerdataset = str;
		}
	};

	_pRadio._getItem = function (index) {
		var ret;
		var items = this._items;
		if (items.length > 0 && index >= 0) {
			ret = items[index];
		}

		return ret;
	};

	_pRadio._getPreCalculateWantTab = function (keycode, shift_key) {
		var ds = this._innerdataset;
		if (ds) {
			if (this.index > -1) {
				var idx = this.index;
				if (idx == this._accessibility_index) {
					return false;
				}
			}
			else {
				var index = this._accessibility_index;
				if (shift_key) {
					if (index < 0) {
						return false;
					}
				}
				else {
					var totalcnt = ds.getRowCount();
					if (index + 1 > totalcnt) {
						return false;
					}
				}
			}
		}
		return this._want_tab;
	};

	_pRadio._getPreCalculateWantArrow = function (keycode) {
		if (!this._isEnable()) {
			return false;
		}

		var ds = this._innerdataset;
		var index = nexacro._enableaccessibility ? this._accessibility_index : this.index;

		if (ds) {
			var totalcnt = ds.getRowCount();

			if (keycode == nexacro.Event.KEY_UP) {
				if (!this._isAccessibilityEnable()) {
					return false;
				}
				else if ((index - 1) < 0) {
					return false;
				}
			}
			else if (keycode == nexacro.Event.KEY_DOWN) {
				if (!this._isAccessibilityEnable()) {
					return false;
				}
				else if ((index + 1) >= totalcnt) {
					return false;
				}
			}
		}
		else {
			return false;
		}

		return this._want_arrow;
	};

	delete _pRadio;
}

if (!nexacro._RadioItemControl) {
	nexacro._RadioItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._IconText.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pRadioItemControl = nexacro._createPrototype(nexacro._IconText, nexacro._RadioItemControl);
	nexacro._RadioItemControl.prototype = _pRadioItemControl;
	_pRadioItemControl._type_name = "RadioItemControl";


	_pRadioItemControl._index = -1;
	_pRadioItemControl._value = undefined;


	_pRadioItemControl._is_subcontrol = true;
	_pRadioItemControl._use_selected_status = true;
	_pRadioItemControl._use_readonly_status = true;

	_pRadioItemControl.accessibilityrole = "radioitem";

	_pRadioItemControl.on_getIDCSSSelector = function () {
		return "radioitem";
	};

	_pRadioItemControl._on_getAccessibilityAdditionalLabel = function () {
		if (this._isAccessibilityEnable() && !this.parent._is_first_focus) {
			if (this._index > -1) {
				return (+this._index + 1) + " " + this.parent._items.length;
			}
		}
		return "";
	};

	_pRadioItemControl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		if (this.parent._is_first_focus) {
			var parent = this.parent;
			var p_accessibility = parent.accessibility;
			label = parent._getAccessibilityParentValue(p_accessibility);
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pRadioItemControl._setItemInfo = function (index, value) {
		this._index = index;
		this._value = value;
	};

	delete _pRadioItemControl;
}
