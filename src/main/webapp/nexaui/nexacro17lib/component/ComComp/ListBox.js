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

if (!nexacro.ListBox) {
	nexacro.ListBox = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._selectinfo = {
			index : -1, 
			text : "", 
			value : undefined, 
			obj : null
		};
		this._scroll_vpos_queue = [];
		this._select_multi = {
			"items" : [], 
			"map" : {
			}, 
			"keys" : [], 
			"length" : 0, 
			"lastselected" : null
		};
		this._selectinfo_list = [];

		this._buffer_pages = [];

		this._initInnerdatasetInfo();
	};

	var _pListBox = nexacro._createPrototype(nexacro.Component, nexacro.ListBox);
	nexacro.ListBox.prototype = _pListBox;
	_pListBox._type_name = "ListBox";


	_pListBox._temp_item = null;


	_pListBox.codecolumn = "";
	_pListBox.datacolumn = "";
	_pListBox.multiselect = false;
	_pListBox.innerdataset = null;
	_pListBox.readonly = false;
	_pListBox.index = -1;
	_pListBox.text = "";
	_pListBox.value = undefined;
	_pListBox.dragscrolltype = "all";
	_pListBox.selectscrollmode = "default";
	_pListBox.itemheight = undefined;
	_pListBox.acceptvaluetype = "allowinvalid";


	_pListBox._innerdataset = null;
	_pListBox._contents_maxwidth = 0;
	_pListBox._contents_maxheight = 0;
	_pListBox._page_rowcount = 0;
	_pListBox._page_rowcount_min = 0;

	_pListBox._shiftKey = false;
	_pListBox._ctrlKey = false;
	_pListBox._altKey = false;

	_pListBox._lbtnDownIdx = -1;

	_pListBox._want_tab = false;
	_pListBox._want_arrow = true;
	_pListBox._shift_select_base_index = null;
	_pListBox._is_first_focus = false;
	_pListBox._calc_scroll = false;
	_pListBox._cnt_resetscroll = 0;
	_pListBox._keep_scrolling = false;
	_pListBox._is_listtype = true;
	_pListBox._touch_scrolling = false;


	_pListBox._is_scrollable = true;
	_pListBox._use_readonly_status = true;


	_pListBox._accessibility_index = -1;
	_pListBox.accessibilityrole = "listbox";

	_pListBox.accessibilityaction = "";
	_pListBox.accessibilitydesclevel = "all";
	_pListBox.accessibilitydescription = "";
	_pListBox.accessibilityenable = true;
	_pListBox.accessibilitylabel = "";

	_pListBox.itemaccessibilityrole = "listboxitem";
	_pListBox.itemaccessibilityenable = true;
	_pListBox.itemaccessibilitylabel = "";
	_pListBox.itemaccessibilitydescription = "";
	_pListBox.itemaccessibilityaction = "";
	_pListBox.itemaccessibilitydesclevel = "all";
	_pListBox._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";

	_pListBox._event_list = 
		{
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
		"onlongpress" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onitemclick" : 1, 
		"onitemdblclick" : 1, 
		"canitemchange" : 1, 
		"onitemchanged" : 1, 
		"oninnerdatachanged" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"oncontextmenu" : 1, 
		"onitemmouseenter" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmousewheel" : 1
	};

	_pListBox.on_create_contents = function () {
		this._temp_item = new nexacro._ListBoxItemControl("_temp_item", 0, 0, 0, 0, null, null, null, null, null, null, this);
		this._temp_item.createComponent();
	};

	_pListBox.on_created_contents = function (win) {
		if (this.innerdataset) {
			if (!this._innerdataset) {
				this._setInnerDatasetStr(this.innerdataset);
			}

			this.on_apply_innerdataset(this._innerdataset);
		}

		this._redrawListBoxContents(true);

		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].on_created(win);
		}

		this._selectinfo.obj = null;
		this._selectinfo.index = this.index;
		this._selectinfo.text = this.text;
		this._selectinfo.value = this.value;


		if (nexacro._enableaccessibility) {
			this._want_arrow = true;
			this.on_apply_prop_accessibilitylabel();
		}

		this._is_created = true;
		this._onRecalcScrollSize();
	};

	_pListBox.on_destroy_contents = function () {
		var item = this._temp_item;
		if (item) {
			item.destroy();
		}
		this._temp_item = null;

		this._destroyListBoxContents();
		this._buffer_pages = null;

		this._removeEventHandlerToInnerDataset();

		this._selectinfo = null;
		this._select_multi = null;
		this._selectinfo_list.length = 0;
		this._scroll_vpos_queue = null;
	};

	_pListBox._removeEventHandlerToInnerDataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onload", this._on_dataset_onload, this);
			this._innerdataset._removeEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);

			this._innerdataset = null;
		}
	};

	_pListBox.on_create_contents_command = function () {
		if (this.innerdataset) {
			if (!this._innerdataset) {
				this._setInnerDatasetStr(this.innerdataset);
			}

			this._parseInnerDataset();
		}

		this._redrawListBoxContents(true);

		var str = "";
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			str += items[i].createCommand();
		}

		return str;
	};

	_pListBox.on_attach_contents_handle = function (win) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].attachHandle(win);
		}

		this._selectinfo.obj = null;
		this._selectinfo.index = this.index;
		this._selectinfo.text = this.text;
		this._selectinfo.value = this.value;


		if (nexacro._enableaccessibility) {
			this.on_apply_prop_accessibilitylabel();
		}

		this._is_created = true;
		this._onRecalcScrollSize();
	};

	_pListBox.on_change_containerRect = function () {
		if (this._is_created_contents) {
			var itemheight = this._getItemHeight();
			var client_h = this._getClientHeight();
			var page_rowcount = itemheight ? client_h / itemheight : 0;

			if (this._page_rowcount != page_rowcount) {
				this._redrawListBoxContents(false);
			}
			else {
				this._recalcLayout();
			}

			if (!this._calc_scroll) {
				this._onRecalcScrollSize();
			}
			else {
				this._cnt_resetscroll++;
				this._onResetScrollBar();
			}
		}
	};

	_pListBox.on_change_containerPos = function () {
	};

	_pListBox.on_getBindableProperties = function () {
		return "value";
	};

	_pListBox.on_killfocus_basic_action = function () {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		if (nexacro._enableaccessibility) {
			var accidx = this._accessibility_index;

			var rowobj = this._getItem(accidx);

			if (rowobj) {
				rowobj._changeStatus("mouseover", false);
			}
		}
	};

	_pListBox.on_apply_prop_enable = function (enable) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, enable);

		if (!enable) {
			enable = this.enable;
		}

		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i]._setEnable(enable);
		}
	};

	_pListBox.on_apply_prop_cssclass = function () {
		var items = this._getContentsItem();
		var itemlen = items.length;
		for (var i = 0; i < itemlen; i++) {
			items[i].on_apply_cssclass();
		}
	};

	_pListBox.on_init_bindSource = function (columnid, propid, ds) {
		if (this._is_created) {
			this._redrawListBoxContents(true);
			this._onRecalcScrollSize();
		}

		if (propid == "value") {
			this.set_value(undefined);
		}
	};

	_pListBox.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var val = ds.getColumn(row, col);
			val = this._convertValueType(val, true);

			if (this.value != val) {
				ds = this._innerdataset;
				var codecolumn = this.codecolumn;
				var datacolumn = this.datacolumn == "" ? codecolumn : this.datacolumn;
				if (ds && codecolumn) {
					var index = ds.findRow(codecolumn, val);
					var text = val;
					if (index > -1) {
						text = ds.getColumn(index, datacolumn);
					}
					else {
						this._do_not_change_value = true;
					}

					this._setValue(val);
					this._setIndex(index);
					this._setText(text);

					this._doSelect(index, false);

					this._do_not_change_value = false;
				}

				if (this._is_created) {
					this._redrawListBoxContents(true);
					this._onRecalcScrollSize();
				}
			}
		}
	};

	_pListBox._onRecalcScrollSize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();

			var scrollWidth = Math.max(this._contents_maxwidth, client_w);
			var scrollHeight = Math.max(this._contents_maxheight, client_h);

			this._calc_scroll = true;

			control_elem.setElementScrollMaxSize(scrollWidth, scrollHeight);

			if (!this._cnt_resetscroll) {
				this._onResetScrollBar();
			}

			this._calc_scroll = false;
			this._cnt_resetscroll = 0;
		}
	};

	_pListBox._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab, _want_arrow;
		var hscrollbar = this.hscrollbar;
		var vscrollbar = this.vscrollbar;

		if (keycode && (keycode == nexacro.Event.KEY_TAB)) {
			want_tab = this._want_tab;
		}
		else {
			_want_arrow = this._want_arrow;
		}

		if (nexacro._enableaccessibility) {
			this._want_arrow = true;
		}

		if (this._is_first_focus) {
			this._is_first_focus = false;
		}

		if (ctrlKey) {
			if (keycode == nexacro.Event.KEY_LEFT) {
				if (hscrollbar) {
					_want_arrow = hscrollbar.pos > hscrollbar.min ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_UP) {
				if (vscrollbar) {
					_want_arrow = vscrollbar.pos > vscrollbar.min ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_RIGHT) {
				if (hscrollbar) {
					_want_arrow = hscrollbar.pos < hscrollbar.max ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_DOWN) {
				if (vscrollbar) {
					_want_arrow = vscrollbar.pos < vscrollbar.max ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
		}
		return {
			want_tab : want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};

	_pListBox._setFocus = function (bResetScroll, dir, bInner) {
		this._focus_direction = dir;
		var retn = this.setFocus(bResetScroll, bInner);
		this._focus_direction = -1;
		return retn;
	};

	_pListBox._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
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

		if (self_flag === false) {
			this._focus_direction = -1;
			this._want_arrow = true;
		}

		if (focusdir >= 0) {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (self_flag == false) {
				if (this._last_focused) {
					this._do_defocus(this._last_focused, false);
				}

				var comp, item;
				var item_len = this._getInnerdatasetInfo("_rowcount");

				if (nexacro._enableaccessibility) {
					this._accessibility_index = -1;
					if (item_len) {
						if (focusdir < 2) {
							if (focusdir === 0) {
								this._accessibility_index = 0;
							}
							else {
								this._accessibility_index = item_len - 1;
							}

							this._is_first_focus = true;
							this._refreshScroll(this._accessibility_index, focusdir);
							item = this._getItem(this._accessibility_index);
							if (item) {
								item._on_focus(true);
							}
						}
						else {
							if (focusdir == 2) {
								this._is_first_focus = true;

								if (!this._isAccessibilityEnable()) {
									this._accessibility_index = 0;
									comp = this._getItem(this._accessibility_index);
									if (comp) {
										comp._on_focus(true);
									}
								}
								else {
									this._accessibility_index = -1;
								}
							}
							else if (focusdir == 3) {
								this._is_first_focus = true;

								this._accessibility_index = item_len - 1;
								comp = this._getItem(this._accessibility_index);
								if (comp) {
									comp._on_focus(true);
								}
							}
						}
					}
					this._shift_select_base_index = this._accessibility_index;
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (this._last_focused) {
				this._do_defocus(this._last_focused, false);
			}
			else if (this._select_multi.lastselected === undefined && this._accessibility_index > -1) {
				this._getItem(this._accessibility_index)._changeStatus("focused", false);
			}
		}

		return retn;
	};

	_pListBox._on_getFitSize = function () {
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

			var rowcount = this._getInnerdatasetInfo("_rowcount");
			var data_maxwidth = this._getInnerdatasetInfo("_max_width");
			var data_maxheight = this._getInnerdatasetInfo("_max_height");

			total_w += data_maxwidth;
			total_h += data_maxheight *  rowcount;

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pListBox.on_get_accessibility_label = function () {
		var label = "";
		if (!this._is_first_focus) {
			label = this.text ? this.text : this.value;
		}
		return label ? label : "";
	};

	_pListBox.set_text = nexacro._emptyFn;

	_pListBox._convertValueType = function (v, bapplyrule) {
		var ret;
		if (bapplyrule) {
			ret = nexacro.Component.prototype._convertValueType.call(this, v);
		}
		else {
			ret = nexacro._isNull(v) ? v : nexacro._toString(v);
		}

		return ret;
	};

	_pListBox.set_value = function (v) {
		v = this._convertValueType(v);

		if (this.value != v) {
			if (this.acceptvaluetype == "ignoreinvalid") {
				var idx = -1;
				var ds = this._innerdataset;
				var codecolumn = this.codecolumn;
				if (ds) {
					idx = ds.findRow(codecolumn, v);
					if (idx < 0) {
						return;
					}
				}
			}

			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			this.value = v;
			this.on_apply_value(v);

			if (this.value == undefined) {
				this.value = v;
			}
		}
	};

	_pListBox.on_apply_value = function (value) {
		var ds = this._innerdataset;
		var codecolumn = this.codecolumn;
		var datacolumn = this.datacolumn == "" ? codecolumn : this.datacolumn;
		if (ds && codecolumn) {
			var index = ds.findRow(codecolumn, value);
			var text = "";
			if (index > -1) {
				text = ds.getColumn(index, datacolumn);
			}


			this._setIndex(index);
			this._setText(text);

			this._doSelect(index, false);
		}
	};

	_pListBox.set_index = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		var ds = this._innerdataset;
		if (ds && (v > ds.getRowCount() - 1)) {
			v = -1;
		}

		if (this.index != v) {
			this.index = v;
			this.on_apply_index(v);
		}
		else {
			this.on_apply_index(v);
			this._on_last_selectfocuschanged(this.index, true);
		}
	};

	_pListBox.on_apply_index = function (index) {
		var text = "";
		var value;

		var data = this._getInnerdatasetInfo("_rows", index);
		if (data) {
			value = data.value;
			text = data.text;
		}

		if (this.value != value) {
			if (!this.applyto_bindSource("value", value)) {
				this.index = this._default_index;
				return;
			}

			this._setValue(value);
			this._setText(text);
		}

		if (this._innerdataset) {
			this._doSelect(index, false);
		}
	};

	_pListBox.set_innerdataset = function (v) {
		if (typeof v != "string") {
			this.setInnerDataset(v);
			return;
		}

		if (this.innerdataset != v || (this.innerdataset && !this._innerdataset)) {
			this._setInnerDatasetStr(v);
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pListBox.on_apply_innerdataset = function (ds) {
		if (ds) {
			ds._setEventHandler("onload", this._on_dataset_onload, this);
			ds._setEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
		}

		this._parseInnerDataset();

		var control_elem = this.getElement();
		if (control_elem) {
			this._redrawListBoxContents(!this._keep_scrolling);
			this._onRecalcScrollSize();
		}
	};

	_pListBox.set_codecolumn = function (v) {
		if (this.codecolumn != v) {
			this.codecolumn = v;
			this.on_apply_codecolumn(v);
		}
	};

	_pListBox.on_apply_codecolumn = function (codecolumn) {
		if (this._is_created) {
			this._parseInnerDataset();
			this._redrawListBoxContents(!this._keep_scrolling);
			this._onRecalcScrollSize();
		}
	};

	_pListBox.set_datacolumn = function (v) {
		if (this.datacolumn != v) {
			this.datacolumn = v;
			this.on_apply_datacolumn(v);
		}
	};

	_pListBox.on_apply_datacolumn = function (datacolumn) {
		if (this._is_created) {
			this._parseInnerDataset();
			this._redrawListBoxContents(!this._keep_scrolling);
			this._onRecalcScrollSize();
		}
	};

	_pListBox.set_multiselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.multiselect != v) {
			this.multiselect = v;
			this.on_apply_multiselect(v);
		}
	};

	_pListBox.on_apply_multiselect = function (multiselect) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._select_clear();
			this._shiftKey = false;
			this._ctrlKey = false;
			this.setSelect(this.index, true);
		}
	};

	_pListBox.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
			this._setAccessibilityFlagReadOnly(v);
		}
	};

	_pListBox.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_readonly(readonly);
		}
	};

	_pListBox.set_itemheight = function (v) {
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

	_pListBox.on_apply_itemheight = function (itemheight) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._redrawListBoxContents(false);
			this._onRecalcScrollSize();
		}
	};

	_pListBox.set_dragscrolltype = function (v) {
		var dragscrolltype_enum = ["none", "vert", "horz", "both", "all"];
		if (dragscrolltype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.dragscrolltype != v) {
			this.dragscrolltype = v;
		}
	};

	_pListBox.set_selectscrollmode = function (v) {
		switch (v) {
			case "select":
			case "scroll":
				this._selectscrollmode = this.selectscrollmode = v;
				break;
			case "default":
				this.selectscrollmode = v;
				this._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";
				break;
		}
	};

	_pListBox.set_itemaccessibilityrole = function (val) {
		if (val) {
			this.itemaccessibilityrole = val;
			this.on_apply_itemaccessibilityrole(val);
		}
		else {
			this.itemaccessibilityrole = "";
			this.on_apply_itemaccessibilityrole(" ");
		}
	};

	_pListBox.on_apply_itemaccessibilityrole = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilityrole(val ? val : this.itemaccessibilityrole);
		}
	};

	_pListBox.set_itemaccessibilitylabel = function (val) {
		if (val) {
			this.itemaccessibilitylabel = val;
			this.on_apply_itemaccessibilitylabel(val);
		}
		else {
			this.itemaccessibilitylabel = "";
			this.on_apply_itemaccessibilitylabel(" ");
		}
	};

	_pListBox.on_apply_itemaccessibilitylabel = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilitylabel(val ? val : this.itemaccessibilitylabel);
		}
	};

	_pListBox.set_itemaccessibilityenable = function (val) {
		if (val) {
			this.itemaccessibilityenable = val;
			this.on_apply_itemaccessibilityenable(val);
		}
		else {
			this.itemaccessibilityenable = true;
			this.on_apply_itemaccessibilityenable(true);
		}
	};

	_pListBox.on_apply_itemaccessibilityenable = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilityenable(val ? val : this.itemaccessibilityenable);
		}
	};

	_pListBox.set_itemaccessibilitydescription = function (val) {
		if (val) {
			this.itemaccessibilitydescription = val;
			this.on_apply_itemaccessibilitydescription(val);
		}
		else {
			this.itemaccessibilitydescription = "";
			this.on_apply_itemaccessibilitydescription(" ");
		}
	};

	_pListBox.on_apply_itemaccessibilitydescription = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilitydescription(val ? val : this.itemaccessibilitydescription);
		}
	};

	_pListBox.set_itemaccessibilityaction = function (val) {
		if (val) {
			this.itemaccessibilityaction = val;
			this.on_apply_itemaccessibilityaction(val);
		}
		else {
			this.itemaccessibilityaction = "";
			this.on_apply_itemaccessibilityaction(" ");
		}
	};

	_pListBox.on_apply_itemaccessibilityaction = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilityaction(val ? val : this.itemaccessibilityaction);
		}
	};

	_pListBox.set_itemaccessibilitydesclevel = function (val) {
		if (val) {
			this.itemaccessibilitydesclevel = val;
			this.on_apply_itemaccessibilitydesclevel(val);
		}
		else {
			this.itemaccessibilitydesclevel = "";
			this.on_apply_itemaccessibilitydesclevel(" ");
		}
	};

	_pListBox.on_apply_itemaccessibilitydesclevel = function (val) {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_accessibilitydesclevel(val ? val : this.itemaccessibilitydesclevel);
		}
	};

	_pListBox.set_acceptvaluetype = function (v) {
		var type_enum = ["allowinvalid", "ignoreinvalid"];

		if (type_enum.indexOf(v) == -1) {
			return;
		}
		this.acceptvaluetype = v;
	};
	_pListBox.getCount = function () {
		return this._getInnerdatasetInfo("_rowcount");
	};

	_pListBox.getSelectedCount = function () {
		return this._select_multi.length;
	};

	_pListBox.getSelect = function (v) {
		if (v < 0 || v >= this.getCount()) {
			return false;
		}
		var selectedItems = this._select_multi.items;
		var selectedCount = this._select_multi.length;

		for (var i = 0; i < selectedCount; i++) {
			if (selectedItems[i] == v) {
				return true;
			}
		}
		return false;
	};

	_pListBox.getSelectedItems = function () {
		if (this._select_multi && this._select_multi.length > 0) {
			var obj = this._select_multi.items;
			var objsorted = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				objsorted[i] = obj[i];
			}
			objsorted.sort(function (a, b) {
				return a - b;
			});
			return objsorted;
		}
		else {
			return [];
		}
	};

	_pListBox.clearSelect = function () {
		if (this._select_multi && this._select_multi.length > 0) {
			this._change_by_script = true;
			this._selectinfo.index = -1;

			if (this._changeIndex(-1)) {
				this.on_apply_index(-1);
			}
			this._select_clear();
			this._change_by_script = false;
		}
	};

	_pListBox.redraw = function () {
		this._redrawListBoxContents(true);
		this._onRecalcScrollSize();
	};

	_pListBox.setSelect = function (index, select) {
		select = nexacro._toBoolean(select);
		index = parseInt(index) | 0;
		var item = this._getItem(index);

		this._change_by_script = true;

		if (index >= 0) {
			if (select == true) {
				if (!this.multiselect) {
					if (this._changeIndex(index)) {
						this._deselect_all(true);

						if (!item) {
							this._clearListBoxBufferPage();
						}
						this.on_apply_index(index);
					}
					else {
						this._doSelect(index, false);
					}
				}
				else {
					if (item) {
						item.set_selected(select);
					}
					this._select_add(index);
					this._changeIndex(index);
				}
			}
			else {
				if (item) {
					item.set_selected(false);
				}
				var changeidx = this.index;
				var currentidx;
				if (this._select_multi && this._select_multi.length > 0) {
					if (this.index == index) {
						var obj = this._select_multi.items;

						currentidx = obj.indexOf(this.index);
						if (currentidx > 0) {
							changeidx = obj[currentidx - 1];
						}
					}
				}
				this._select_remove(index);
				if (this._select_multi && this._select_multi.length == 0) {
					this._changeIndex(-1);
				}
				else if (this._select_multi && this._select_multi.length > 0) {
					this._changeIndex(changeidx);
				}
			}
		}
		else {
			if (this._changeIndex(-1)) {
				this.on_apply_index(-1);
			}

			this._select_clear();
		}

		this._change_by_script = false;
	};

	_pListBox.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pListBox.setInnerDataset = function (obj) {
		this._removeEventHandlerToInnerDataset();

		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset(this._innerdataset);
		}
		else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset")) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this._keep_scrolling = (this.innerdataset != obj.id) ? false : true;
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pListBox.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pListBox._on_dataset_onload = function (obj, e) {
		if (e.reason == 0) {
			this._redrawListBoxContents(true);
			this._onRecalcScrollSize();

			if (this.index > -1) {
				if (this._changeIndex(this.index)) {
					this.on_apply_index(this.index);
				}
			}
			else if (this.value !== "") {
				var row = this._innerdataset.findRow(this.codecolumn, this.value);
				if (this._changeIndex(row)) {
					this.on_apply_index(row);
				}
			}
		}
	};

	_pListBox._on_dataset_onvaluechanged = function (obj, e) {
		this._parseInnerDataset();

		if (this._is_created) {
			this._redrawListBoxContents(true);
			this._onRecalcScrollSize();

			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};

	_pListBox._on_dataset_onrowsetchanged = function (obj, e) {
		this._parseInnerDataset();

		if (this._is_created) {
			this._redrawListBoxContents(true);
			this._onRecalcScrollSize();
		}
	};

	_pListBox._on_item_onlbuttondown = function (obj, e) {
		if (this.readonly) {
			return false;
		}

		if (nexacro._enableaccessibility) {
			if (this._accessibility_index > -1) {
				var item = this._getItem(this._accessibility_index);
				if (item._status == "focused") {
					item._changeStatus("focused", false);
				}
			}
		}

		var focused = this._statusmap ? this._statusmap['focused'] : false;
		obj._changeUserStatus("selected", true);
		if (focused) {
			obj._changeStatus("focused", true);
		}

		this._shiftKey = e.shiftkey;
		this._ctrlKey = e.ctrlkey;
		this._altKey = e.altkey;
		this._selectinfo.obj = obj;
		this._selectinfo.index = obj.index;
		this._selectinfo.text = obj.text;
		this._selectinfo.value = obj.value;

		if (nexacro._isTouchInteraction) {
			this._selectinfo_list[this._selectinfo_list.length] = this._selectinfo;
		}

		if (!this._shiftKey) {
			this._shift_select_base_index = obj.index;
		}

		this._lbtnDownIdx = obj.index;
	};

	_pListBox._on_item_ondblclick = function (obj, e) {
		if (this.readonly || !this.enableevent) {
			return false;
		}

		return this.on_fire_onitemdblclick(this, this.index, this.text, this.value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty);
	};

	_pListBox._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind) {
		if (evttype == "trackstart" || evttype == "tracklastover" || evttype == "trackfirstover") {
			return true;
		}

		if (nexacro._Browser == "Runtime" || (navigator.userAgent.indexOf("Android 4.1") > -1 || navigator.userAgent.indexOf("Android 4.2") > -1 || navigator.userAgent.indexOf("Android 4.3") > -1)) {
			this._adjustScrollRows_callback(true, postvpos);
		}
		else {
			if (evtkind == "fling" || evtkind == "slide" || evttype == "track") {
				if (!this._aniframe_rowscroll) {
					var pThis = this;
					this._scroll_vpos_queue = [];

					this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
						pThis._adjustScrollRows_callback();
					});
				}

				var cnt = this._scroll_vpos_queue.push(postvpos);

				if (cnt == 1) {
					this._aniframe_rowscroll.start();
				}
			}
			else {
				this._adjustScrollRows_callback(true, postvpos);
			}
		}

		return true;
	};

	_pListBox._adjustScrollRows_callback = function (no_ani, pos) {
		if (pos == undefined) {
			pos = this.vscrollbar ? this.vscrollbar._pos : 0;
		}
		if (no_ani) {
			this._scroll_vpos_queue = [];
		}
		else {
			this._scroll_vpos_queue.pop();

			if (this._scroll_vpos_queue.length > 0) {
				this._aniframe_rowscroll.start();
			}
		}

		var itemheight = this._getItemHeight();
		var rowcount = this._getInnerdatasetInfo("_rowcount");
		var visible_start = itemheight ? Math.floor(pos / itemheight) : 0;
		var visible_end = visible_start + this._page_rowcount;
		if (visible_end >= rowcount) {
			visible_end = rowcount - 1;
		}

		if (this._touch_scrolling) {
			this._createListBoxContents(visible_start, visible_end, true);
			this._control_element.setElementVScrollPos(pos);
		}
		else {
			this._createListBoxContents(visible_start, visible_end);
			this._control_element.setElementVScrollPos(pos);
		}

		if (this.index > -1) {
			if (this.multiselect) {
				var selectindex = this._selectinfo.index;
				var pages = this._buffer_pages;
				for (var i = 0; i < pages.length; i++) {
					for (var j = 0; j < pages[i].length; j++) {
						var index = pages[i][j].index;
						if (index == selectindex) {
							this._doSelect(this.index, true);
						}
					}
				}
			}
			else {
				this._doSelect(this.index, false);
			}
		}
	};

	_pListBox._setVScrollDefaultAction = function (wheelDeltaY) {
		if (this.scrolltype == "none" || this.scrolltype == "horizontal") {
			return false;
		}

		var control_elem = this.getElement();
		if (control_elem) {
			var itemheight = this._getItemHeight();

			var old_value = this._vscroll_pos;
			var value = old_value + itemheight;
			if (wheelDeltaY > 0) {
				value = old_value - itemheight;
				if (value < 0) {
					value = 0;
				}
			}

			if (value > control_elem.vscroll_limit) {
				value = control_elem.vscroll_limit;
			}

			this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");

			if (old_value != this._vscroll_pos) {
				return true;
			}
		}
		return false;
	};

	_pListBox.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
			if (nexacro._enableaccessibility) {
				var item;
				var accIdx = this._accessibility_index;
				var rowcount = this._getInnerdatasetInfo("_rowcount");

				if (keycode == nexacro.Event.KEY_UP) {
					if (accIdx < 0) {
						this._want_arrow = false;
					}
					else {
						this._accessibility_index = accIdx += -1;
						this._refreshScroll(accIdx, shift_key ? 1 : 0);
						item = this._getItem(accIdx);
						if (item) {
							item._on_focus(true);
						}
						else {
							if (accIdx == -1) {
								if (this._isAccessibilityEnable()) {
									var last_focused = this._last_focused;
									if (last_focused) {
										this._do_defocus(last_focused, true);
									}
									else {
										this._do_defocus(this);
									}

									this._on_focus(true);
								}
								else {
									this._want_arrow = false;
								}
							}
						}
					}
				}
				else {
					if ((accIdx + 1) >= rowcount) {
						this._want_arrow = false;
					}
					else {
						this._accessibility_index = accIdx += 1;
						this._refreshScroll(accIdx, shift_key ? 1 : 0);
						item = this._getItem(accIdx);
						if (item) {
							item._on_focus(true);
						}
					}
				}
			}
		}



		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);
	};

	_pListBox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pListBox.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarControl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarControl))) {
			return;
		}

		var up_obj = this._getWindow().findComponent(from_elem);
		var sel_info = this._selectinfo;

		var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);

		var down_item = sel_info.obj;
		if (down_item) {
			var change_item;

			if (this._contains(from_elem)) {
				this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);

				if (nexacro._enableaccessibility) {
					if (this._accessibility_index > -1) {
						var sel_item = this._getItem(this._accessibility_index);
						if (sel_info.index != this._accessibility_index && sel_item && sel_item._selected == true) {
							this._deselect_all(true);
							sel_item._changeUserStatus("selected", false);
						}
					}
					else {
						if (sel_info) {
							this._accessibility_index = sel_info.index;
						}
					}
				}

				change_item = down_item;

				var change_index = change_item.index;

				if (this.multiselect) {
					if (this._shiftKey == true || this._ctrlKey == true) {
						this._select_withmouseevent(change_index);
					}
					else {
						this._do_select(change_index, false);
					}
				}
				else {
					if (this._changeIndex(change_index)) {
						this.on_apply_index(change_index);
					}
					else {
						if (!down_item.selected) {
							down_item._changeUserStatus("selected", false);
						}
					}

					if (down_item != up_obj) {
						down_item._changeStatus("mouseover", false);
					}
				}
			}
			else {
				if (!down_item.selected) {
					down_item._changeUserStatus("selected", false);
				}
			}
		}

		return ret;
	};

	_pListBox.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this._touch_scrolling = true;

		return nexacro.Component.prototype.on_fire_sys_onslidestart.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pListBox.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		if (this.selectscrollmode == "select" && this.multiselect) {
			if (this._innerdataset) {
				var idx = -1;
				if (touchinfos[0].target && touchinfos[0].target.parent) {
					idx = touchinfos[0].target.parent.index;
				}

				if (this._lbtnDownIdx > -1 && idx > -1) {
					this._deselect_all(true);

					var startRow = this._lbtnDownIdx;
					var endRow = idx;
					var finalRow = idx;

					if (!nexacro._isNumber(startRow)) {
						startRow = 0;
					}
					if (!nexacro._isNumber(endRow)) {
						endRow = this._getInnerdatasetInfo("_rowcount");
					}

					if (startRow > endRow) {
						var tmp = endRow;
						endRow = startRow;
						startRow = tmp;
						finalRow = tmp;
					}

					var rows = [];
					for (var i = startRow; i <= endRow; i++) {
						rows.push(i);
					}
					this._doMultiSelect(rows, true);
					this._changeIndex(finalRow);
				}
			}

			return true;
		}

		return ret;
	};

	_pListBox.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this._touch_scrolling = false;

		return nexacro.Component.prototype.on_fire_sys_onslideend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pListBox.on_fire_sys_onflingstart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this._touch_scrolling = true;

		return nexacro.Component.prototype.on_fire_sys_onflingstart.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pListBox.on_fire_sys_onflingend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this._touch_scrolling = false;

		return nexacro.Component.prototype.on_fire_sys_onflingend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pListBox.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		if (this.readonly) {
			return false;
		}

		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);
			var ret = this.onitemclick._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.canitemchange._fireCheckEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pListBox.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!this._selectinfo) {
			return false;
		}

		this._selectinfo.obj = null;
		this._selectinfo.index = obj.index;
		this._selectinfo.text = obj.text;
		this._selectinfo.value = obj.value;

		var sel_info = this._selectinfo;
		sel_info.index = postindex;
		sel_info.text = posttext;
		sel_info.value = postvalue;

		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.onitemchanged._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox.on_fire_onitemdblclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		if (this.readonly) {
			return false;
		}

		if (this.onitemdblclick && this.onitemdblclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemdblclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);
			var ret = this.onitemdblclick._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox.on_fire_oninnerdatachanged = function (obj, oldvalue, newvalue, columnid, col, row) {
		if (this.oninnerdatachanged && this.oninnerdatachanged._has_handlers) {
			var evt = new nexacro.InnerdataChangedEventInfo(obj, "oninnerdatachanged", oldvalue, newvalue, columnid, col, row);
			return this.oninnerdatachanged._fireEvent(this, evt);
		}

		return true;
	};

	_pListBox.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		var items = this._getContentsItem();

		if (items && items.length > 0) {
			var obj = null;

			if (direction > 0) {
				this._overeditemindex++;
			}
			else {
				this._overeditemindex--;
			}

			obj = this._getItemByRealIdx(items, this._overeditemindex).obj;

			if (obj) {
				ret = true;
				obj._setAccessibilityNotifyEvent();
			}
		}

		return ret;
	};

	_pListBox.on_keydown_basic_action = function () {
	};

	_pListBox.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp) {
		if (this.readonly) {
			return;
		}

		var rowcount = this._getInnerdatasetInfo("_rowcount");
		if (!rowcount) {
			return;
		}

		this._shiftKey = shift_key;
		this._ctrlKey = ctrl_key;
		this._altKey = alt_key;

		if (!this._shiftKey) {
			this._shift_select_base_index = this.index;
		}

		var nextidx;
		var multi_info = this._select_multi;

		this._last_keydown_keycode = keycode;

		if (keycode == nexacro.Event.KEY_UP) {
			if (ctrl_key) {
				this._do_scroll("up");
				return true;
			}

			if (!nexacro._enableaccessibility) {
				if (this.multiselect) {
					this._select_withkeyupevent(shift_key);
					nextidx = multi_info.items[multi_info.length - 1];

					if (nextidx != null) {
						if (nextidx > -1) {
							if (this._last_focused) {
								this._do_defocus(this._last_focused);
							}
							this._changeIndex(nextidx);
						}
					}
				}
				else {
					nextidx = +this.index - 1;
					if (nextidx < 0) {
						nextidx = rowcount - 1;
					}
					else if (nextidx >= rowcount) {
						nextidx = 0;
					}

					if (nextidx > -1) {
						if (this._changeIndex(nextidx)) {
							if (this._last_focused) {
								this._do_defocus(this._last_focused);
							}
							this.on_apply_index(nextidx);
						}
					}
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_DOWN) {
			if (ctrl_key) {
				this._do_scroll("down");
				return true;
			}
			if (!nexacro._enableaccessibility) {
				if (this.multiselect) {
					this._select_withkeydownevent(shift_key);
					nextidx = multi_info.items[multi_info.length - 1];

					if (nextidx != null) {
						if (nextidx < rowcount) {
							this._changeIndex(nextidx);
						}
					}
				}
				else {
					nextidx = +this.index + 1;

					if (nextidx < 0) {
						nextidx = rowcount - 1;
					}
					else if (nextidx >= rowcount) {
						nextidx = 0;
					}

					if (nextidx < rowcount) {
						if (this._changeIndex(nextidx)) {
							this.on_apply_index(nextidx);
						}
					}
				}
			}
		}
		else if (keycode === nexacro.Event.KEY_SPACE) {
			if (this.multiselect) {
				var cur_item = this._getItem(this._select_multi.lastselected);
				var is_same = false;
				this._sellist = this._select_multi.items;
				var len = this._sellist.length;
				var del_idx, iv;

				for (var i = 0; i < len; i++) {
					iv = this._sellist[i];

					if (this._select_multi.lastselected == iv) {
						is_same = true;
						cur_item = this._getItem(iv);
						del_idx = iv;
					}
				}

				if (is_same !== true) {
					if (cur_item) {
						cur_item.set_selected(true);
					}
					this._select_add(this._select_multi.lastselected);
				}
				else {
					this._do_deselect(del_idx, true);
				}
			}
			else {
				nextidx = this._accessibility_index;
				if (nextidx > -1) {
					if (this._changeIndex(nextidx)) {
						if (this._last_focused) {
							this._do_defocus(this._last_focused);
						}
						this.on_apply_index(nextidx);
					}
				}
			}
		}
	};

	_pListBox._redrawListBoxContents = function (bScrollChange) {
		this._redrawListBoxContentsBefore();

		var rowcount = this._getInnerdatasetInfo("_rowcount");
		if (rowcount) {
			var itemheight = this._getItemHeight();
			var client_h = this._getClientHeight();
			var page_rowcount = itemheight ? client_h / itemheight : 0;

			if (nexacro._enableaccessibility && (nexacro._isMobile && nexacro._isMobile())) {
				page_rowcount = rowcount;
			}
			this._page_rowcount = Math.ceil(page_rowcount);
			this._page_rowcount_min = Math.floor(page_rowcount);

			var start_index = 0;
			var end_index = 0;
			if (bScrollChange) {
				end_index = rowcount - 1;

				if (end_index >= this._page_rowcount) {
					end_index = this._page_rowcount > 0 ? this._page_rowcount - 1 : 0;
				}
			}
			else {
				start_index = this._get_first_visible_row();
				end_index = this._get_last_visible_row(true);
			}

			this._recalcContentsMaxSize();
			this._createListBoxContents(start_index, end_index);

			if (this.value !== undefined) {
				this.on_apply_value(this.value);
			}
			else if (this.index > -1) {
				this.on_apply_index(this.index);
			}
		}

		this._redrawListBoxContentsAfter();
	};

	_pListBox._redrawListBoxContentsBefore = function () {
		this._destroyListBoxContents();
	};

	_pListBox._redrawListBoxContentsAfter = function () {
		if (this._status == "focused") {
			var comp = this._getItem(this._accessibility_index);
			if (comp) {
				comp._on_focus(true);
			}
		}
	};

	_pListBox._createListBoxContents = function (start, end, createonly) {
		var buffer_state = this._isRange(start, end);

		var rowcount = this._getInnerdatasetInfo("_rowcount");
		var page_rowcount = this._page_rowcount;
		var pages = this._buffer_pages;
		var page, index;
		var firstitem, lastitem;
		var i, len;
		var max_index = rowcount - 1;
		if (createonly) {
			switch (buffer_state) {
				case 0:
					if (page_rowcount == 0) {
						return;
					}

					if (end == max_index || (end < page_rowcount - 1)) {
						len = 1;
					}
					else {
						len = 2;
					}

					for (i = 0; i < len; i++) {
						index = start + (i *  page_rowcount);
						if (index + page_rowcount > max_index) {
							page_rowcount = max_index - index + 1;
						}
						this._addListBoxBufferPage(page_rowcount, index);
					}
					break;
				case 1:
					do {
						page = pages[0];
						firstitem = page[0];

						if (firstitem.index < page_rowcount) {
							index = 0;
							page_rowcount = firstitem.index;
						}
						else {
							index = firstitem.index - page_rowcount;
						}

						this._insertListBoxBufferPage(0, page_rowcount, index);
					} while (index > start);
					break;
				case 2:
					page = pages[pages.length - 1];
					lastitem = page[page.length - 1];

					index = lastitem.index + 1;
					if (index + page_rowcount > max_index) {
						page_rowcount = max_index - lastitem.index;
					}

					this._addListBoxBufferPage(page_rowcount, index);
					break;
			}
		}
		else {
			switch (buffer_state) {
				case 0:
					if (page_rowcount == 0) {
						return;
					}

					if (end == max_index || (end < page_rowcount - 1)) {
						len = 1;
					}
					else {
						len = 2;
					}

					this._clearListBoxBufferPage();

					for (i = 0; i < len; i++) {
						index = start + (i *  page_rowcount);
						if (index + page_rowcount > max_index) {
							page_rowcount = max_index - index + 1;
						}
						this._addListBoxBufferPage(page_rowcount, index);
					}
					break;
				case 1:
					page = pages[0];
					firstitem = page[0];

					index = start - page_rowcount + 1;
					if (index < 0) {
						index = 0;
						page_rowcount = firstitem.index;
					}

					if (pages.length == 2) {
						this._removeListBoxBufferPage(this._buffer_pages.length - 1);
						this._insertListBoxBufferPage(0, page_rowcount, index);
						this._adjustListBoxBufferPage(0);
					}
					else if (pages.length == 1) {
						this._insertListBoxBufferPage(0, page_rowcount, index);
						this._adjustListBoxBufferPage(0);
					}
					break;
				case 2:
					if (pages.length == 2) {
						this._removeListBoxBufferPage(0);

						page = pages[0];
						lastitem = page[page.length - 1];

						index = lastitem.index + 1;
						if (index + page_rowcount > max_index) {
							page_rowcount = max_index - lastitem.index;
						}

						this._addListBoxBufferPage(page_rowcount, index);
					}
					break;
				case 3:
					this._resetListBoxBufferPage(start, end);
					break;
			}
		}
	};

	_pListBox._destroyListBoxContents = function () {
		this._clearListBoxBufferPage();

		this._contents_maxwidth = 0;
		this._contents_maxheight = 0;
	};

	_pListBox._createListItemControl = function (index) {
		var data = this._getInnerdatasetInfo("_rows", index);
		if (data) {
			var itemheight = this._getItemHeight();
			var client_w = this._getClientWidth();

			var item = this._createListItem("item_" + index, 0, index *  itemheight, Math.max(this._contents_maxwidth, client_w), itemheight, null, null, null, null, null, null, this);
			item.set_value(data.value);
			item.set_text(data.text);
			item.set_index(index);
			item.set_selected(false);
			item.set_readonly(this.readonly);

			if (nexacro._enableaccessibility) {
				this._setItemAccessibility(item);
			}

			item._setEventHandler("onlbuttondown", this._on_item_onlbuttondown, this);
			item._setEventHandler("ontouchstart", this._on_item_onlbuttondown, this);
			item._setEventHandler("ondblclick", this._on_item_ondblclick, this);

			item.createComponent(this._is_created ? false : true);

			if (this.multiselect) {
				var selItems = this._select_multi.items;
				var len = this._select_multi.length;

				for (var i = 0; i < len; i++) {
					if (index == selItems[i]) {
						item.set_selected(true);
						break;
					}
				}
			}
			else {
				if (this.index == index) {
					item.set_selected(true);
					this._set_last_selectfocused(index);
				}
			}

			return item;
		}
	};

	_pListBox._createListItem = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		return new nexacro._ListBoxItemControl(id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	_pListBox._addListBoxBufferPage = function (itemcount, itemindex) {
		var i, item;
		var page = [];

		for (i = 0; i < itemcount; i++) {
			item = this._createListItemControl(itemindex);
			page.push(item);

			itemindex++;
		}
		this._buffer_pages.push(page);
	};

	_pListBox._insertListBoxBufferPage = function (pageindex, itemcount, itemindex) {
		var i, item;
		var page = [];
		for (i = 0; i < itemcount; i++) {
			item = this._createListItemControl(itemindex);
			page.push(item);

			itemindex++;
		}
		this._buffer_pages.splice(pageindex, 0, page);
	};

	_pListBox._adjustListBoxBufferPage = function (pageindex) {
		var curr_page = this._buffer_pages[pageindex];
		var prev_page = this._buffer_pages[pageindex - 1];
		var next_page = this._buffer_pages[pageindex + 1];

		var prev_page_firstidx, prev_page_lastidx;
		var curr_page_firstidx, curr_page_lastidx;
		var next_page_firstidx;

		if (prev_page) {
			curr_page_firstidx = curr_page[0].index;
			prev_page_lastidx = prev_page[prev_page.length - 1].index;

			if (curr_page_firstidx - 1 != prev_page_lastidx) {
				prev_page_firstidx = curr_page_firstidx - this._page_rowcount;

				this._removeListBoxBufferPage(pageindex - 1);
				this._insertListBoxBufferPage(pageindex - 1, this._page_rowcount, prev_page_firstidx);
			}
		}

		if (next_page) {
			curr_page_lastidx = curr_page[curr_page.length - 1].index;
			next_page_firstidx = next_page[0].index;
			if (curr_page_lastidx + 1 != next_page_firstidx) {
				this._removeListBoxBufferPage(pageindex + 1);
				this._insertListBoxBufferPage(pageindex + 1, this._page_rowcount, curr_page_lastidx + 1);
			}
		}
	};

	_pListBox._removeListBoxBufferPage = function (pageindex) {
		if (this._buffer_pages[pageindex]) {
			var del_page = this._buffer_pages.splice(pageindex, 1)[0];
			for (var i in del_page) {
				if (del_page.hasOwnProperty(i)) {
					if (del_page[i]) {
						del_page[i].destroy();
						del_page[i] = null;
					}
				}
			}
		}
	};

	_pListBox._clearListBoxBufferPage = function () {
		var i, j;
		var pages = this._buffer_pages;
		for (i in pages) {
			if (pages.hasOwnProperty(i)) {
				for (j in pages[i]) {
					if (pages[i].hasOwnProperty(j)) {
						if (pages[i][j]) {
							pages[i][j].destroy();
							pages[i][j] = null;
						}
					}
				}
			}
			pages[i] = null;
		}

		this._buffer_pages = [];
	};

	_pListBox._resetListBoxBufferPage = function (startindex, endindex) {
		var page;
		var pages = this._buffer_pages;
		var pages_len = pages.length;
		if (pages_len > 2) {
			var i;
			var startpage, endpage;
			for (i = 0; i < pages_len; i++) {
				page = pages[i];
				if (page[0].index <= startindex && page[page.length - 1].index >= startindex) {
					startpage = i;
				}
				if (page[0].index <= endindex && page[page.length - 1].index >= endindex) {
					endpage = i;
				}
			}

			if (startpage == endpage) {
				if (startpage == 0) {
					endpage += 1;
				}
				else {
					if (endpage == (pages_len - 1)) {
						startpage -= 1;
					}
				}
			}
			while (pages_len) {
				pages_len--;
				if (startpage != pages_len && endpage != pages_len) {
					this._removeListBoxBufferPage(pages_len);
				}
			}
		}
	};

	_pListBox._recalcLayout = function () {
		var itemheight = this._getItemHeight();
		var client_w = this._getClientWidth();

		var item;
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			item = items[i];
			if (item) {
				item.move(0, item.index *  itemheight, Math.max(this._contents_maxwidth, client_w), itemheight);
			}
		}
	};

	_pListBox._recalcContentsMaxSize = function () {
		var client_w = this._getClientWidth();
		var client_h = this._getClientHeight();
		if (client_w == 0 || client_h == 0) {
			this._contents_maxwidth = 0;
			this._contents_maxheight = 0;

			return;
		}

		var itemheight = this._getItemHeight();
		var rowcount = this._getInnerdatasetInfo("_rowcount");
		var data_maxwidth = this._getInnerdatasetInfo("_max_width");
		var data_maxheight = this._getInnerdatasetInfo("_max_height");

		this._scroll_default_value = data_maxheight;

		if (this._contents_maxwidth != data_maxwidth || this._contents_maxheight != (itemheight *  rowcount)) {
			this._contents_maxwidth = data_maxwidth;
			this._contents_maxheight = itemheight *  rowcount;

			if (this._is_created) {
				this._onRecalcScrollSize();
			}
		}
	};

	_pListBox._parseInnerDataset = function () {
		this._initInnerdatasetInfo();

		var ds = this._innerdataset;
		if (ds) {
			var codecolumn = this.codecolumn;
			var datacolumn = this.datacolumn;

			var rowcount = ds.getRowCount();
			if (rowcount && (codecolumn || datacolumn)) {
				codecolumn = codecolumn == "" ? datacolumn : codecolumn;
				datacolumn = datacolumn == "" ? codecolumn : datacolumn;

				var tmp_item = this._temp_item;
				var font = tmp_item ? tmp_item._getCurrentStyleInheritValue("font") : null;

				var max_text = "";
				var max_width = 0;
				var text_size = [0, 0];

				for (var i = 0, text, value; i < rowcount; i++) {
					text = ds.getColumn(i, datacolumn);
					value = ds.getColumn(i, codecolumn);
					value = this._convertValueType(value, true);

					this._setInnerdatasetInfoRowData({
						text : text, 
						value : value
					});

					if (font) {
						text_size = nexacro._getTextSize(text, font);
					}

					if (max_width < text_size[0]) {
						max_width = text_size[0];
						max_text = text;
					}
				}

				if (tmp_item) {
					tmp_item.set_text(max_text);

					text_size = tmp_item._on_getFitSize();
					max_width = text_size[0];

					this._setInnerdatasetInfoMaxSize(max_width, text_size[1]);
				}

				this._setInnerdatasetInfoRowCount(rowcount);
			}
		}
	};

	_pListBox._doSelect = function (rows, keepExisting, isNotFireEvent) {
		if (this.readonly) {
			return false;
		}

		if (!this.multiselect) {
			this._doSingleSelect(rows, isNotFireEvent);
		}
		else {
			if (typeof rows === "number") {
				rows = [rows];
			}

			this._doMultiSelect(rows, keepExisting, isNotFireEvent);
		}
	};

	_pListBox._doSingleSelect = function (idx, isNotFireEvent) {
		var params = [false];
		this._on_select_change(idx, true, "singleselect", params, isNotFireEvent);

		if (params[0]) {
			if (!isNotFireEvent) {
				this._set_last_selectfocused(idx);
			}
		}
	};

	_pListBox._doMultiSelect = function (rows, keepExisting, isNotFireEvent) {
		var sel_row = rows[0];

		var len = rows.length;

		var info = this._select_multi;
		var info_len = info.length;

		if (!keepExisting && info_len) {
			var items = info.items;

			var range = [];
			var start = 0;
			var end = info.length - 1;

			if (start <= end) {
				for (; start <= end; start++) {
					range[range.length] = items[start];
				}
			}
			else {
				for (; start >= end; start--) {
					range[range.length] = items[start];
				}
			}

			if (this._do_deselect(range, isNotFireEvent) === false) {
				return;
			}
		}

		var params = [false];
		var i = 0, idx;


		for (; i < len; i++) {
			idx = rows[i];
			if (keepExisting && this._is_selected(idx)) {
				continue;
			}
			this._on_select_change(idx, true, "multiselect", params, isNotFireEvent);
		}
		this._set_last_selectfocused(sel_row, isNotFireEvent);
	};

	_pListBox._select_withmouseevent = function (idx) {
		var str_multiselect = this.multiselect ? "multi" : "single";
		switch (str_multiselect) {
			case 'multi':
				var sel = this._select_multi;
				var len = sel ? sel.length : 0;
				if (this._shiftKey) {
					if (!this._ctrlKey) {
						this._deselect_all(true);
					}
					this._select_range(this._shift_select_base_index, idx, this._shiftKey);
				}
				else if (this._ctrlKey) {
					var item = this._getItem(idx);
					if (item) {
						item.set_selected(!item.selected);
					}

					if (item.selected === false) {
						var changeidx = this.index;
						var currentidx;
						if (this._select_multi && this._select_multi.length > 0) {
							if (this.index == idx) {
								var obj = this._select_multi.items;

								currentidx = obj.indexOf(this.index);
								if (currentidx > 0) {
									changeidx = obj[currentidx - 1];
								}
							}
						}
						for (var i = 0; i < len; i++) {
							if (idx === sel.items[i]) {
								this._select_remove(idx);
							}
						}
						if (this._select_multi && this._select_multi.length == 0) {
							this._changeIndex(-1);
						}
						else if (this._select_multi && this._select_multi.length > 0) {
							this._changeIndex(changeidx);
						}
					}
					else {
						this._select_add(idx);
					}
					this._set_last_selectfocused(idx);
				}
				else if (this._is_selected(idx) && !this._shiftKey && !this._ctrlKey && len > 1) {
					this._do_select(idx, false);
				}
				else {
					this._do_select(idx, false);
				}
				break;
			case 'single':
				this._do_select(idx, false);
				break;
		}
	};

	_pListBox._select_withkeyupevent = function (shiftkey) {
		var lastidx = this._select_multi.lastselected == null ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;

		if (lastidx > 0) {
			var idx = lastidx - 1;
			if (shiftkey && lastidx) {
				if (this._is_selected(lastidx) && this._is_selected(idx)) {
					this._do_deselect(lastidx, true);
					this._set_last_selectfocused(idx);

					if (this._isAccessibilityEnable()) {
						var item = this._getItem(idx);
						if (item) {
							item._setFocus(true);
						}
					}
				}
				else if (!this._is_selected(lastidx)) {
					this._do_select(lastidx, true);
					this._do_select(idx, true);
				}
				else {
					this._do_select(idx, true);
				}
			}
			else {
				this._shift_select_base_index = null;
				this._deselect_all(true);
				this._do_select(idx, false);
			}
		}
	};

	_pListBox._select_withkeydownevent = function (shiftkey) {
		var lastidx = this._select_multi.lastselected == null ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;
		var rowcount = this._getInnerdatasetInfo("_rowcount");

		if (lastidx + 1 < rowcount) {
			var idx = lastidx === null ? 0 : lastidx + 1;
			if (shiftkey && lastidx >= 0) {
				if (this._shift_select_base_index == lastidx) {
					this._deselect_all(true);
					this._do_select(this._shift_select_base_index, true);
				}
				if (this._is_selected(lastidx) && this._is_selected(idx)) {
					this._do_deselect(lastidx, true);
					this._set_last_selectfocused(idx);
				}
				else if (!this._is_selected(lastidx)) {
					this._do_select(lastidx, true);
					this._do_select(idx, true);
				}
				else {
					this._do_select(idx, true);
				}
			}
			else {
				this._shift_select_base_index = null;
				this._deselect_all(true);
				this._do_select(idx, false);
			}
		}
	};

	_pListBox._do_scroll = function (dir) {
		var visible_start = this._get_first_visible_row();
		var rowheight = this._getItemHeight();

		var vscrollbar = this.vscrollbar;
		var vscroll_pos = this._vscroll_pos;
		if (vscrollbar) {
			var idx = visible_start;

			if (dir == "down") {
				idx += 1;
			}
			else {
				if (vscroll_pos <= idx *  rowheight) {
					idx -= 1;
				}
			}

			if (idx > -1) {
				this._scrollTo(null, idx *  rowheight);
			}
		}
	};

	_pListBox._select_add = function (selectIdx, isNotFireEvent) {
		if (selectIdx < 0 || selectIdx > this._innerdataset.getRowCount() - 1) {
			return;
		}
		var k = selectIdx + "";
		var info = this._select_multi;
		var old = info.map[k];

		if (typeof old != 'undefined') {
			return this._select_replace(k, selectIdx);
		}
		info.map[k] = selectIdx;
		info.length++;
		info.items.push(selectIdx);
		info.keys.push(k);

		this._changeIndex(selectIdx, undefined, isNotFireEvent);
	};

	_pListBox._select_replace = function (k, selectIdx) {
		var idx = this._select_indexOfkey(k);
		var info = this._select_multi;
		info.items[idx] = selectIdx;
		info.map[k] = selectIdx;
	};

	_pListBox._select_indexOfkey = function (k) {
		k += "";
		return nexacro._indexOf(this._select_multi.keys, k);
	};

	_pListBox._select_remove = function (selectIdx) {
		var idx = this._select_indexOfkey(selectIdx);
		var info = this._select_multi;
		if (idx < info.length && idx >= 0) {
			info.length--;
			info.items.splice(idx, 1);
			var k = info.keys[idx];
			if (typeof k != 'undefined') {
				info.map[k] = undefined;
			}
			info.keys.splice(idx, 1);
			if (!this.multiselect && info.length == 0) {
				this.index = -1;
				this.text = "";

				if (!this._do_not_change_value) {
					this.value = undefined;
				}
			}

			return selectIdx;
		}

		return false;
	};

	_pListBox._select_indexOf = function (selectIdx) {
		if (!this.multiselect) {
			return this._selectinfo ? this._selectinfo.index == selectIdx : -1;
		}
		else {
			return nexacro._indexOf(this._select_multi.items, selectIdx);
		}
	};

	_pListBox._select_clear = function () {
		var items = this._getContentsItem();
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].set_selected(false);
		}

		this._select_multi = {
			"items" : [], 
			"map" : {
			}, 
			"keys" : [], 
			"length" : 0, 
			"lastselected" : null
		};
	};

	_pListBox._select_range = function (startRow, endRow, keepExisting, dir) {
		if (!keepExisting) {
			this._deselect_all(true);
		}


		var i;
		var rows = [];
		var FinalRow = endRow;

		if (!nexacro._isNumber(startRow)) {
			startRow = 0;
		}
		if (!nexacro._isNumber(endRow)) {
			endRow = this._getInnerdatasetInfo("_rowcount");
		}



		if (startRow > endRow) {
			for (i = startRow; endRow <= i; i--) {
				rows.push(i);
			}
		}
		else {
			for (i = startRow; i <= endRow; i++) {
				rows.push(i);
			}
		}

		this._doMultiSelect(rows, true, true);
		this._changeIndex(FinalRow);
	};

	_pListBox._deselect_all = function (isNotFireEvent) {
		var rowcount = this._getInnerdatasetInfo("_rowcount");
		for (var i = 0; i < rowcount; i++) {
			this._do_deselect(i, isNotFireEvent);
		}
	};

	_pListBox._do_select = function (rows, keepExisting, isNotFireEvent) {
		if (this.readonly) {
			return false;
		}

		if (typeof rows === "number") {
			rows = [rows];
		}

		if (!this.multiselect && rows) {
			var idx = rows.length ? rows[0] : rows;
			this._doSingleSelect(idx, isNotFireEvent);
		}
		else {
			this._doMultiSelect(rows, keepExisting, isNotFireEvent);
		}
	};

	_pListBox._do_deselect = function (rows, isNotFireEvent) {
		if (nexacro._isNumber(rows)) {
			rows = [rows];
		}
		else if (!nexacro._isArray(rows)) {
			rows = [rows];
		}

		var len = rows.length;
		var idx, i = 0, attempted = 0;
		var params = [0];

		for (; i < len; i++) {
			idx = rows[i];
			if (this._is_selected(idx)) {
				++attempted;
				this._on_select_change(idx, false, "deselect", params, isNotFireEvent);
			}
		}

		return params[0] === attempted;
	};

	_pListBox._select_commit = function (jobgbn, row, params, isNotFireEvent) {
		var info = this._select_multi;
		var len = info.length;
		switch (jobgbn) {
			case "deselect":
				++(params[0]);
				this._select_remove(row);
				break;
			case "singleselect":
				var last_select_row = info.lastselected;
				this._select_add(row);
				if (last_select_row != row && len > 0 && this._do_deselect(last_select_row) === false) {
					return false;
				}
				params[0] = true;
				break;
			case "multiselect":
				this._select_add(row, isNotFireEvent);
				params[0] = true;
				break;
		}
	};

	_pListBox._set_last_selectfocused = function (idx, isNotFireEvent) {
		var rowBeforeLast = this._select_multi.lastselected;
		this._select_multi.lastselected = idx;

		if (idx !== rowBeforeLast) {
			this._on_last_selectfocuschanged(idx, isNotFireEvent);
		}
	};

	_pListBox._on_select_change = function (idx, isSelected, jobgbn, params, isNotFireEvent) {
		if (this._select_commit(jobgbn, idx, params, isNotFireEvent) !== false) {
			var rowobj = this._getItem(idx);
			if (rowobj) {
				if (isSelected) {
					rowobj.set_selected(true);
				}
				else {
					rowobj.set_selected(false);
				}

				if (nexacro._enableaccessibility) {
					rowobj._setAccessibilityInfoIndex(idx + 1);
					rowobj._setAccessibilityInfoCount(this._getInnerdatasetInfo("_rowcount"));
				}
			}
		}
	};

	_pListBox._on_last_selectfocuschanged = function (newFocused, isNotFireEvent) {
		if (newFocused > -1) {
			var control_elem = this.getElement();
			if (control_elem) {
				var visible_start = this._get_first_visible_row();
				var visible_end = this._get_last_visible_row(true);

				var vscrollbar = this.vscrollbar;
				if (vscrollbar) {
					var new_pos = vscrollbar.pos;
					if (newFocused <= visible_start) {
						new_pos = newFocused *  this._getItemHeight();
					}
					else if (newFocused >= visible_end) {
						new_pos = (newFocused + 1) *  this._getItemHeight() - control_elem.client_height;
					}

					if (vscrollbar.pos != new_pos) {
						vscrollbar.set_pos(new_pos);
					}
				}
				else {
					var item = this._getItem(newFocused);
					if (item) {
						var item_control_elem = item.getElement();
						if (item_control_elem) {
							item_control_elem.setElementFocus();
						}
					}
				}
			}
		}
	};

	_pListBox._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, true);
		}
	};

	_pListBox._changeIndex = function (v, change_by_script, isNotFireEvent) {
		if (this.index != v && !isNotFireEvent) {
			var dataset = this._innerdataset;
			var postindex = parseInt(v, 10) | 0;

			var preidx = this.index;
			var pretext = this.text;
			var prevalue = this.value;
			var column = (this.codecolumn || this.datacolumn);
			if (dataset && column) {
				var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
				var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);
				codevalue = this._convertValueType(codevalue, true);

				var posttext = datavalue == undefined ? "" : datavalue;
				var postvalue = codevalue;

				if (change_by_script == undefined) {
					change_by_script = this._change_by_script;
				}

				if (change_by_script != true) {
					if (this.on_fire_canitemchange(this, preidx, pretext, prevalue, postindex, posttext, postvalue) != false) {
						this._accessibility_index = this.index = postindex;
						this.text = posttext;
						if (!this._is_value_setting) {
							this.value = postvalue;
						}
						this.applyto_bindSource("value", codevalue);
						this.on_fire_onitemchanged(this, preidx, pretext, prevalue, postindex, posttext, postvalue);
						return true;
					}
				}
				else {
					this._accessibility_index = this.index = postindex;
					this.text = posttext;
					if (!this._is_value_setting) {
						this.value = postvalue;
					}
					this.applyto_bindSource("value", codevalue);
					return true;
				}
			}
		}

		return false;
	};

	_pListBox._setContents = function (str) {
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

	_pListBox._setValue = function (v) {
		if (v === null) {
			v = "";
		}

		this.value = (v === undefined) ? v : v.toString();
	};

	_pListBox._setIndex = function (v) {
		this.index = v;
	};

	_pListBox._setText = function (v) {
		this.text = v;
	};

	_pListBox._setInnerDatasetStr = function (str) {
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

	_pListBox._setItemAccessibility = function (item) {
		var role;
		if (nexacro._Browser == "Runtime") {
			role = this._getAccessibilityRole();
		}
		else {
			role = this.itemaccessibilityrole;
		}

		if (role) {
			item.set_accessibilityrole(role);
		}

		var enable = this.itemaccessibilityenable;
		if (enable !== undefined) {
			item.set_accessibilityenable(enable);
		}

		var label = this.itemaccessibilitylabel;
		if (label !== undefined) {
			item.set_accessibilitylabel(label);
		}

		var description = this.itemaccessibilitydescription;
		if (description) {
			item.set_accessibilitydescription(description);
		}

		var action = this.itemaccessibilityaction;
		if (action) {
			item.set_accessibilityaction(action);
		}

		var desclevel = this.itemaccessibilitydesclevel;
		if (desclevel) {
			item.set_accessibilitydesclevel(desclevel);
		}
	};

	_pListBox._getItem = function (index) {
		var pages = this._buffer_pages;
		var page, item;
		var i, j;

		for (i in pages) {
			page = pages[i];
			for (j in page) {
				item = page[j];
				if (item && (item.index == index)) {
					return item;
				}
			}
		}

		return null;
	};

	_pListBox._getItemHeight = function () {
		var itemheight = this.itemheight;
		if (itemheight !== undefined) {
			return itemheight;
		}

		var item = this._temp_item;
		if (item) {
			return item._on_getFitSize()[1];
		}

		return 0;
	};

	_pListBox._getContentsItem = function () {
		var ret = [];
		var pages = this._buffer_pages;
		for (var i in pages) {
			if (pages[i] && pages.hasOwnProperty(i)) {
				ret = ret.concat(pages[i]);
			}
		}

		return ret;
	};

	_pListBox._getContentsCount = function () {
		var ret = 0;
		var pages = this._buffer_pages;
		for (var i in pages) {
			if (pages[i]) {
				ret += pages[i].length;
			}
		}

		return ret;
	};

	_pListBox._isRange = function (start, end) {
		var ret = 0;
		var page, item;
		var pages = this._buffer_pages;

		for (var i in pages) {
			page = pages[i];
			for (var j in page) {
				item = page[j];
				if (item) {
					if (item.index == end) {
						ret += 1;
					}
					if (item.index == start) {
						ret += 2;
					}
				}
			}
		}

		return ret;
	};

	_pListBox._get_first_visible_row = function () {
		var itemheight = this._getItemHeight();
		var scrollTop = (this.vscrollbar) ? this.vscrollbar.pos : 0;

		return itemheight ? Math.floor(scrollTop / itemheight) : 0;
	};

	_pListBox._get_last_visible_row = function (bPrecision) {
		var rowcount = this._getInnerdatasetInfo("_rowcount");
		var change_idnex = bPrecision ? this._page_rowcount - 1 : this._page_rowcount_min - 1;

		var last_index = this._get_first_visible_row() + change_idnex;
		var max_index = rowcount - 1;

		if (last_index >= max_index) {
			last_index = max_index;
		}

		return last_index;
	};

	_pListBox._get_page_from_rowidx = function (rowidx) {
		var row_count = this._page_rowcount;
		return row_count ? Math.floor(rowidx / this._page_rowcount) + 1 : 1;
	};

	_pListBox._refreshScroll = function (rowidx, direction) {
		var control_elem = this.getElement();
		if (control_elem) {
			var currVScrollTopPos = control_elem.scroll_top == undefined ? 0 : control_elem.scroll_top;
			var vpos, nextTopPos, nextBottom;
			var itemheight = this._getItemHeight();
			var rowcount = this._getInnerdatasetInfo("_rowcount");

			if (rowidx >= rowcount) {
				return;
			}

			nextTopPos = (rowidx < 0 ? 0 : rowidx) *  itemheight;
			nextBottom = nextTopPos + itemheight;

			if ((nextBottom > this._getClientHeight() + currVScrollTopPos) && direction === 0) {
				vpos = currVScrollTopPos + itemheight;
			}
			else if (nextTopPos < currVScrollTopPos) {
				vpos = nextTopPos;
			}

			if (this.vscrollbar && vpos >= 0) {
				this.vscrollbar.set_pos(vpos);
			}
		}
	};

	_pListBox._getNextAccessibilityOrderIndex = function (direction) {
		var rowcount = this._getInnerdatasetInfo("_rowcount");
		var next_idx = this._accessibility_index + direction;

		if (next_idx < 0 || next_idx >= rowcount) {
			next_idx = -1;
		}

		return next_idx;
	};

	_pListBox._is_selected = function (idx) {
		return this._select_indexOf(idx) !== -1;
	};

	_pListBox._initInnerdatasetInfo = function () {
		this._innerdataset_info = {
			_rowcount : 0, 
			_rows : [], 
			_max_width : 0, 
			_max_height : 0
		};
	};

	_pListBox._getInnerdatasetInfo = function (prop) {
		if (this._innerdataset_info && this._innerdataset_info[prop]) {
			if (prop == "_rows") {
				if (arguments.length == 2) {
					return this._innerdataset_info["_rows"][arguments[1]];
				}
			}
			else {
				return this._innerdataset_info[prop];
			}
		}

		return null;
	};

	_pListBox._setInnerdatasetInfoRowCount = function (v) {
		this._innerdataset_info._rowcount = v;
	};

	_pListBox._setInnerdatasetInfoRowData = function (v) {
		this._innerdataset_info._rows.push(v);
	};

	_pListBox._setInnerdatasetInfoMaxSize = function (w, h) {
		this._innerdataset_info._max_width = w;
		this._innerdataset_info._max_height = h;
	};

	nexacro._ListBoxItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Static.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pListBoxItemControl = nexacro._createPrototype(nexacro.Static, nexacro._ListBoxItemControl);
	nexacro._ListBoxItemControl.prototype = _pListBoxItemControl;
	_pListBoxItemControl._type_name = "ListBoxItemControl";


	_pListBoxItemControl.index = "";
	_pListBoxItemControl.value = undefined;
	_pListBoxItemControl.selected = false;
	_pListBoxItemControl.wordWrap = "none";


	_pListBoxItemControl._is_subcontrol = true;
	_pListBoxItemControl._use_selected_status = true;
	_pListBoxItemControl._use_readonly_status = true;

	_pListBoxItemControl.accessibilityrole = "listboxitem";


	_pListBoxItemControl._event_list = 
		{
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onflingstart" : 1, 
		"onfling" : 1, 
		"onflingend" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onlongpress" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"oncontextmenu" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1
	};

	_pListBoxItemControl.on_getIDCSSSelector = function () {
		return "listboxitem";
	};

	_pListBoxItemControl._apply_setfocus = function (evt_name) {
		if (!this.parent._is_subcontrol && this.parent._status == "focused") {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pListBoxItemControl.on_get_accessibility_label = function () {
		return this.text ? this.text : "";
	};

	_pListBoxItemControl._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pListBoxItemControl._getAccessibilityLabel = function () {
		var flag = this.parent._is_first_focus;
		var label = "";
		if (flag && this._isAccessibilityEnable()) {
			var parent = this.parent;
			var p_accessibility = parent.accessibility;
			label = parent._getAccessibilityParentValue(p_accessibility);
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this);
		return label;
	};

	_pListBoxItemControl._getAccessibilityRole = function () {
		var role = "";
		if (this._isAccessibilityEnable()) {
			var parent = this.parent;
			if (parent._is_first_focus) {
				return parent._getAccessibilityRole();
			}
			else {
				role = nexacro.Component.prototype._getAccessibilityRole.call(this);
			}
		}
		return role;
	};

	_pListBoxItemControl._setAccessibilityStatFocus = function (evt_name) {
		var list = this.parent;

		if (!list._is_subcontrol) {
			if (list.multiselect && list._shift_select_base_index && list._shift_select_base_index != this.index) {
				var item = list._getItem(list._shift_select_base_index);
				if (item && item._status == "selected") {
					var label = item._getAccessibilityLabel();
					label += " " + this._getAccessibilityLabel();
					this._setAccessibilityLabel(label);
				}
			}

			if (!evt_name) {
				var keycode = list._last_keydown_keycode;
				switch (keycode) {
					case nexacro.Event.KEY_DOWN:
						evt_name = "downkey";
						break;
					case nexacro.Event.KEY_UP:
						evt_name = "upkey";
						break;
					case nexacro.Event.KEY_TAB:
						evt_name = "tabkey";
						break;
					case nexacro.Event.KEY_SHIFT:
						evt_name = "shiftkey";
						break;
				}
			}

			return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
		}
	};

	_pListBoxItemControl._on_getFitSize = function () {
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
			var font = this._getCurrentStyleInheritValue("font");
			var wordspace = this._getCurrentStyleInheritValue("wordSpacing");
			var letterspace = this._getCurrentStyleInheritValue("letterSpacing");

			var text_size = nexacro._getTextSize(text ? text : "<가", font, false, undefined, "none", wordspace, letterspace);

			total_w += Math.ceil(this.textwidth != null ? this.textwidth : text_size[0]);
			total_h += Math.ceil(text_size[1]);

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};


	_pListBoxItemControl.on_tap_default_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) {
		var listbox = this.parent;
		var up_obj = this._getWindow().findComponent(elem);
		var sel_info_list = listbox._selectinfo_list;
		while (sel_info_list.length) {
			var down_item = sel_info_list[0].obj;
			if (down_item) {
				var change_item;
				if (this._contains(up_obj)) {
					if (elem) {
						var border = listbox._getCurrentStyleBorder();
						var c_l_border = border ? border._getBorderLeftWidth() : 0;
						var c_t_border = border ? border._getBorderTopWidth() : 0;
						canvasX = canvasX - ((elem.scroll_left ? elem.scroll_left : 0) - c_l_border);
						canvasY = canvasY - ((elem.scroll_top ? elem.scroll_top : 0) - c_t_border);

						if (canvasX < 0) {
							canvasX = c_l_border;
						}
						if (canvasY < 0) {
							canvasY = c_t_border;
						}
					}

					var clientXY = listbox._getClientXY(canvasX, canvasY);
					listbox.on_fire_onitemclick(listbox, up_obj.index, up_obj.text, up_obj.value, undefined, listbox._altKey, listbox._ctrlKey, listbox._shiftKey, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1]);
					change_item = down_item;

					var change_index = change_item.index;

					if (listbox.multiselect) {
						if (listbox._shiftKey === true || listbox._ctrlKey === true) {
							listbox._select_withmouseevent(change_index);
						}
						else {
							listbox._do_select(change_index, false);
						}
					}
					else {
						if (listbox._changeIndex(change_index)) {
							listbox.on_apply_index(change_index);
						}
						else {
							if (!down_item.selected) {
								down_item._changeUserStatus("selected", false);
							}
						}
					}
				}
				else {
					if (!down_item.selected) {
						down_item._changeUserStatus("selected", false);
					}
				}
			}
			sel_info_list.shift();
		}
	};

	_pListBoxItemControl.set_index = function (v) {
		if (v !== this.index) {
			this.index = parseInt(v, 10);
		}
	};

	_pListBoxItemControl.set_value = function (v) {
		if (v !== this.value) {
			this.value = v;
		}
	};

	_pListBoxItemControl.set_selected = function (v) {
		if (v != this.selected) {
			this.selected = v;
			this.on_apply_selected();
		}
	};

	_pListBoxItemControl.on_apply_selected = function () {
		var bfocused = this.parent._statusmap ? this.parent._statusmap['focused'] : false;
		if (this.selected) {
			this._changeUserStatus("selected", true);
			if (bfocused) {
				this._changeStatus("focused", true);
			}
		}
		else {
			if (this._status == "focused") {
				this._changeStatus("focused", false);
			}

			this._changeUserStatus("selected", false);
		}
	};

	_pListBoxItemControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pListBoxItemControl.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);
	};

	_pListBoxItemControl.on_fire_sys_onflingstart = function (elem, touch_manager, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		return false;
	};

	delete _pListBoxItemControl;
}
