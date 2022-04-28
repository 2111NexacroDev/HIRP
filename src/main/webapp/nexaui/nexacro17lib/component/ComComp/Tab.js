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

nexacro.TabIndexChangeEventInfo = function (obj, id, postindex, preindex) {
	this.id = this.eventid = id || "ontabindexchange";
	this.fromobject = this.fromreferenceobject = obj;

	this.postindex = postindex;
	this.preindex = preindex;
};
var _pTabIndexChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangeEventInfo);
nexacro.TabIndexChangeEventInfo.prototype = _pTabIndexChangeEventInfo;
_pTabIndexChangeEventInfo._type_name = "TabIndexChangeEventInfo";

delete _pTabIndexChangeEventInfo;

nexacro.TabMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
	nexacro.MouseEventInfo.call(this, obj, id || "onextrabuttonclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

	this.index = index;
};
var _pTabMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseEventInfo);
nexacro.TabMouseEventInfo.prototype = _pTabMouseEventInfo;
_pTabMouseEventInfo._type_name = "TabMouseEventInfo";

delete _pTabMouseEventInfo;

if (!nexacro.Tab) {
	nexacro.Tab = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._tabbuttonitems = [];
		this.tabpages = new nexacro.Collection();
	};
	var _pTab = nexacro._createPrototype(nexacro.Component, nexacro.Tab);
	nexacro.Tab.prototype = _pTab;

	_pTab._type_name = "Tab";
	_pTab.prevbutton = null;
	_pTab.nextbutton = null;


	_pTab.multiline = false;
	_pTab.tabindex = -1;
	_pTab.focusacceptable = false;
	_pTab.usecontrolkey = true;
	_pTab.rotatetext = false;
	_pTab.tabjustify = false;
	_pTab.selectchangetype = "down";
	_pTab.tabposition = "top";
	_pTab.extrabutton = null;
	_pTab.preload = false;


	_pTab.accessibilityrole = "tab";

	_pTab._default_spinbutton_size = {
		width : 14, 
		height : 14
	};
	_pTab._extrabutton_size = null;

	_pTab._prevbutton_size = null;
	_pTab._nextbutton_size = null;
	_pTab._is_containerset = true;
	_pTab._is_changed_focus = false;
	_pTab._init_tabindex = 0;
	_pTab._next_button_idx = 0;

	_pTab._event_list = 
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
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"oncontextmenu" : 1, 
		"onchanged" : 1, 
		"onspin" : 1, 
		"canchange" : 1, 
		"oneditclick" : 1, 
		"onextrabuttonclick" : 1, 
		"onmouseup" : 1, 
		"onmousedown" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};



	_pTab.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementSize(this._getClientWidth(), this._getClientHeight());

			this._createSpinButton(true);
			this._createTabpages(true);
			this._createTabButtons(true);
		}
	};

	_pTab.on_created_contents = function (_window) {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;
		for (var i = 0; i < tabpages_length; i++) {
			tabpages[i].on_created(_window);
			if (this.preload) {
				tabpages[i]._on_apply_url();
			}
		}
		for (i = 0; i < tabbuttonitems_length; i++) {
			tabbuttonitems[i].on_created(_window);
		}

		if (this.nextbutton) {
			this.nextbutton.on_created(_window);
		}

		if (this.prevbutton) {
			this.prevbutton.on_created(_window);
		}
		this._is_created = true;

		this.on_apply_tabindex(this._init_tabindex);
		this._rearrangeContents();
	};

	_pTab.on_destroy_contents = function () {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;


		if (this.nextbutton) {
			this.nextbutton.destroy();
			this.nextbutton = null;
		}

		if (this.prevbutton) {
			this.prevbutton.destroy();
			this.prevbutton = null;
		}

		for (var i = tabbuttonitems_length - 1; i >= 0; i--) {
			tabbuttonitems[i].destroy();
			tabbuttonitems.splice(i, 1);
		}

		for (i = tabpages_length - 1; i >= 0; i--) {
			tabpages[i].destroy();
		}

		this.tabpages.clear();

		this.tabpages = null;
		this._tabbuttonitems = null;

		this._prevbutton_size = null;
		this._nextbutton_size = null;
	};

	_pTab.on_create_contents_command = function () {
		var str = "";

		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;

		for (var i = 0; i < tabpages_length; i++) {
			str += tabpages[i].createCommand();
		}

		for (i = 0; i < tabbuttonitems_length; i++) {
			str += tabbuttonitems[i].createCommand();
		}

		if (this.nextbutton) {
			str += this.nextbutton.createCommand();
		}

		if (this.prevbutton) {
			str += this.prevbutton.createCommand();
		}


		return str;
	};

	_pTab.on_attach_contents_handle = function (win) {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;

		if (this.nextbutton) {
			this.nextbutton.attachHandle(win);
		}

		if (this.prevbutton) {
			this.prevbutton.attachHandle(win);
		}

		for (var i = 0; i < tabpages_length; i++) {
			tabpages[i].attachHandle(win);
			if (this.preload) {
				tabpages[i]._on_apply_url();
			}
		}

		for (i = 0; i < tabbuttonitems_length; i++) {
			tabbuttonitems[i].attachHandle(win);
		}

		this._is_created = true;

		this.on_apply_tabindex(this._init_tabindex);
		this._rearrangeContents();

		this._init_tabindex = -1;
	};

	_pTab.on_change_containerRect = function (width, height) {
		this._rearrangeContents();
	};



	_pTab._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_activate = function () {
		nexacro.Component.prototype._on_activate.call(this);

		var tabpage = this.tabpages[this.tabindex];
		if (tabpage && tabpage.form) {
			tabpage.form._on_activate();
		}

		return true;
	};

	_pTab._on_deactivate = function () {
		nexacro.Component.prototype._on_deactivate.call(this);

		var tabpage = this.tabpages[this.tabindex];
		if (tabpage && tabpage.form) {
			tabpage.form._on_deactivate();
		}

		return true;
	};

	_pTab.getOwnerFrame = function () {
		return this._getOwnerFrame();
	};

	_pTab.on_apply_prop_enable = function (v) {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabpage;
		var prevbutton = this.prevbutton;
		var nextbutton = this.nextbutton;

		for (var i = 0; i < tabpages_length; i++) {
			tabpage = tabpages[i];
			tabpage._setEnable(v);
		}

		if (prevbutton) {
			prevbutton._setEnable(v);
		}
		if (nextbutton) {
			nextbutton._setEnable(v);
		}
	};

	_pTab.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var next_obj = null;
		var tabindex = this._getTabIndex();

		if (direction) {
			if (this._accessibility_tabindex == tabindex) {
				next_obj = this._child_list[tabindex];
			}
			else {
				this._accessibility_tabindex++;
				if (this._accessibility_tabindex < this.tabpages.length) {
					next_obj = this._tabButtons[this._accessibility_tabindex];
				}
				else {
					this._accessibility_tabindex = -1;
					this._accessibility_is_next = true;
					next_obj = this.parent._searchNextTabFocus(this, undefined, undefined, 3)[0];
				}
			}
		}
		else {
			if (this._accessibility_tabindex == tabindex) {
				this._accessibility_tabindex--;
				next_obj = this._tabButtons[this._accessibility_tabindex];
			}
			else {
				this._accessibility_tabindex--;
				if (this._accessibility_tabindex >= 0) {
					if (this._accessibility_tabindex == tabindex) {
						next_obj = this._child_list[tabindex];
					}
					else {
						next_obj = this._tabButtons[this._accessibility_tabindex];
					}
				}
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
			return true;
		}
		return false;
	};

	_pTab._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		if (!this._is_popup_control && this.parent && this.parent != this) {
			var form_top = this._adjust_top;
			var form_left = this._adjust_left;
			top += form_top;
			left += form_left;
			bottom += form_top;
			right += form_left;
			this.parent._resetScrollPos(this, left, top, right, bottom, focus_direction);
		}
	};

	_pTab.set_multiline = function (v) {
		v = nexacro._toBoolean(v);
		if (this.multiline != v) {
			this.multiline = v;
			this.on_apply_multiline(v);
		}
	};

	_pTab.on_apply_multiline = function (v) {
		this._rearrangeContents();
	};

	_pTab.set_tabindex = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		var post_idx = parseInt(v, 10) | 0;
		var pre_idx = this.tabindex;

		if (post_idx != pre_idx) {
			this._oldtabindex = pre_idx;

			if (!this._is_created) {
				this._init_tabindex = post_idx;
			}
			else {
				this.on_apply_tabindex(post_idx);
				this._rearrangeContents();
			}
		}
	};

	_pTab.on_apply_tabindex = function (v) {
		var is_apply_focus = false;

		var form = this._getForm();
		if (form._getTabOrderFirst() instanceof nexacro.Tab && this.parent._last_focused && this.parent._last_focused.name == this.name) {
			is_apply_focus = true;
		}

		var bcanchange = this._changeTabIndex(v, is_apply_focus);
		if (bcanchange) {
			this._last_focused = null;
			this._tabbutton_obj = this._tabbuttonitems[v];

			if (this.enableevent && this._is_created && this._oldtabindex > -1) {
				this.on_fire_onchanged(this, v, this._oldtabindex);
			}

			this._rearrangeContents(-1);
		}
	};

	_pTab.set_focusacceptable = function (v) {
		var _v = nexacro._toBoolean(v);
		if (this.focusacceptable != _v) {
			this.focusacceptable = _v;
		}
	};

	_pTab.set_usecontrolkey = function (v) {
		this.usecontrolkey = nexacro._toBoolean(v);
	};

	_pTab.set_rotatetext = function (v) {
		this.rotatetext = v;
	};

	_pTab.on_apply_rotatetext = function (v) {
	};

	_pTab.set_tabjustify = function (v) {
		v = nexacro._toBoolean(v);
		if (this.tabjustify != v) {
			this.tabjustify = v;
			this.on_apply_tabjustify(v);
		}
	};
	_pTab.on_apply_tabjustify = function (v) {
		this._rearrangeContents();
	};

	_pTab.set_selectchangetype = function (v) {
		switch (v) {
			case "down":
			case "up":
				this.selectchangetype = v;
				break;
			default:
				break;
		}
	};

	_pTab.set_tabposition = function (v) {
		var pre_value = nexacro._toString(this.tabposition);
		var post_value = nexacro._toString(v);
		switch (post_value) {
			case "left":
			case "top":
			case "right":
			case "bottom":
				if (pre_value != post_value) {
					this.tabposition = post_value;
					this.on_apply_tabposition(post_value);
				}
				break;
			default:
				return;
		}
	};
	_pTab.on_apply_tabposition = function (v) {
		this._rearrangeContents();
	};

	_pTab.set_showextrabutton = function (v) {
		v = nexacro._toBoolean(v);
		if (this.showextrabutton != v) {
			this.showextrabutton = v;
			this.on_apply_showextrabutton(v);
		}
	};
	_pTab.on_apply_showextrabutton = function (v) {
		this._rearrangeContents();
	};

	_pTab.set_preload = function (v) {
		v = nexacro._toBoolean(v);
		if (this.preload != v) {
			this.preload = v;
			this.on_apply_preload(v);
		}
	};

	_pTab.on_apply_preload = function (v) {
	};

	_pTab.set_tabbuttonwidth = function (v) {
		if (this.tabbuttonwidth != v) {
			this.tabbuttonwidth = (v === undefined) ? v : (parseInt(v) | 0);
			this._rearrangeContents();
		}
	};

	_pTab.set_tabbuttonheight = function (v) {
		if (this.tabbuttonheight != v) {
			this.tabbuttonheight = (v === undefined) ? v : (parseInt(v) | 0);
			this._rearrangeContents();
		}
	};

	_pTab.set_selectedtabbuttonwidth = function (v) {
		if (this.selectedtabbuttonwidth != v) {
			this.selectedtabbuttonwidth = (v === undefined) ? v : (parseInt(v) | 0);
			this._rearrangeContents();
		}
	};

	_pTab.set_selectedtabbuttonheight = function (v) {
		if (this.selectedtabbuttonheight != v) {
			this.selectedtabbuttonheight = (v === undefined) ? v : (parseInt(v) | 0);
			this._rearrangeContents();
		}
	};

	_pTab.set_extrabuttonsize = function (v) {
		v = nexacro._toString(v).replace(/\s+/, " ").trim();

		if (this.extrabuttonsize == v) {
			return;
		}

		this.extrabuttonsize = v;

		this._extrabutton_size = null;
		this._rearrangeContents();
	};

	_pTab.getParentContext = function () {
		return this.parent;
	};

	_pTab.addChild = function (id, obj) {
		this._addChild(id, obj, false);
	};

	_pTab.insertTabpage = function (strId, nIndex, strUrl, strText, tabbuttonwidth, tabbuttonheight) {
		var idx = parseInt(nIndex) | 0;

		var tabpages = this.tabpages;
		var tabpages_len = tabpages.length;
		var tabbuttonitems = this._tabbuttonitems;

		var tabpage;
		var oldtabindex;

		for (var i = 0; i < tabpages_len; i++) {
			tabpage = this.tabpages[i];
			if (strId == tabpage.text) {
				return -1;
			}
		}

		tabpage = new nexacro.Tabpage(strId, this);
		tabpage._refobj = this;

		if (strText) {
			tabpage.set_text(strText);
		}
		else {
			tabpage.set_text(strId);
		}

		if (tabbuttonwidth) {
			tabpage.set_tabbuttonwidth(tabbuttonwidth);
		}

		if (tabbuttonheight) {
			tabpage.set_tabbuttonheight(tabbuttonheight);
		}

		tabpage._preload = this.preload;
		tabpage.createComponent(false);

		if (idx > tabpages_len) {
			idx = -1;
		}

		this.on_fire_canchange(this, this.tabindex, this.tabpages.length);

		if (this._is_canchange) {
			oldtabindex = this.tabindex;

			if (this[strId]) {
				if (this[strId].name == tabpage.name) {
					tabpage.destroy();
					return -1;
				}
			}

			var oldtabpage = oldtabindex > -1 ? tabpages[oldtabindex] : undefined;
			var oldtabtn = oldtabindex > -1 ? this._tabbuttonitems[oldtabindex] : undefined;

			if (oldtabpage && oldtabtn) {
				if (oldtabpage.enable) {
					oldtabtn._changeStatus("enabled", true);
				}
				else {
					oldtabtn._changeStatus("disabled", true);
				}

				oldtabtn._changeUserStatus("selected", false);
				oldtabpage.set_visible(false);

				oldtabtn._setAccessibilityStatSelected(false);
			}
		}

		if (idx == -1) {
			this.tabindex = idx = this.tabpages.length;
			this._addChild(strId, tabpage);
		}
		else {
			for (i = tabpages_len; i > idx; i--) {
				tabbuttonitems[i] = tabbuttonitems[i - 1];
				tabbuttonitems[i]._tabindex += 1;
			}

			this._addChild(strId, tabpage, true, idx);

			if (this._is_canchange) {
				this.tabindex = idx;
			}
			else {
				if (this.tabindex >= idx) {
					this.tabindex = this.tabindex + 1;
				}
			}
		}

		var newtabbtn;
		if (this._is_canchange) {
			newtabbtn = this._tabbutton_obj = tabbuttonitems[idx] = this._createTabbutton(idx, tabpage, false);
			if (strUrl && !this.preload) {
				tabpage.set_url(strUrl);
			}

			tabpage.set_visible(true);

			newtabbtn._changeUserStatus("selected", true);
			newtabbtn._setAccessibilityStatSelected(true);

			this._last_focused = null;
		}
		else {
			newtabbtn = tabbuttonitems[idx] = this._createTabbutton(idx, tabpage, false);
			newtabbtn._changeUserStatus("selected", false);
			newtabbtn._setAccessibilityStatSelected(false);
		}

		this._rearrangeContents();

		if (this.enableevent && this._is_canchange) {
			this.on_fire_onchanged(this, this.tabindex, this._oldtabindex);
		}
		return idx;
	};

	_pTab.removeTabpage = function (nIndex) {
		var idx = parseInt(nIndex) | 0;
		var tabpages = this.tabpages;

		var tabpages_len = tabpages.length;
		if (tabpages_len == 0) {
			return -1;
		}

		var tabbuttonitems, tabbuttonitems_len = 0;
		if (tabpages_len > 0) {
			var tabpage = tabpages[idx];

			if (!tabpage) {
				return -1;
			}

			var confirm_message = tabpage.form._on_beforeclose();
			if (tabpage.form._checkAndConfirmClose(confirm_message) == false) {
				return -1;
			}

			if (tabpage == this._last_focused) {
				this._last_focused = null;
			}

			tabpage.form._on_close();

			this[tabpage.id] = null;
			delete this[tabpage.id];
			tabpages.delete_item(tabpage.id);

			tabpage.destroy();

			tabbuttonitems = this._tabbuttonitems;
			var tabbuttonitem = tabbuttonitems[idx];
			if (tabbuttonitem != undefined) {
				if (tabbuttonitem == this._tabbutton_obj) {
					this._tabbutton_obj = null;
				}
				if (tabbuttonitem == this._last_focused) {
					this._last_focused = null;
				}

				tabbuttonitem.destroy();
			}

			tabbuttonitems.splice(idx, 1);

			tabbuttonitems_len = tabbuttonitems.length;
			for (var i = 0; i < tabbuttonitems_len; i++) {
				tabbuttonitems[i]._tabindex = i;
			}
		}

		var is_changed_tabpage = false;
		if (this.tabindex == idx) {
			is_changed_tabpage = true;
		}
		if (idx != 0 && this.tabindex == idx && this.tabindex == tabbuttonitems_len) {
			this.tabindex = idx - 1;
		}
		else if (this.tabindex > idx || tabbuttonitems_len == 0) {
			this.tabindex -= 1;
		}

		var newtabpage = tabpages[this.tabindex];
		if (newtabpage) {
			newtabpage.set_visible(true);
			if (!this.preload) {
				newtabpage._on_apply_url();
			}

			if (tabbuttonitems) {
				tabbuttonitems[this.tabindex]._changeUserStatus("selected", true);
			}

			if (this.enableevent && is_changed_tabpage) {
				this.on_fire_onchanged(this, this.tabindex, this._oldtabindex);
			}
		}

		if (tabbuttonitems_len > 0) {
			this._rearrangeContents();
		}

		return 0;
	};

	_pTab.moveTabpage = function (nFromIndex, nToIndex) {
		var tabpages = this.tabpages;
		var tabpages_len = tabpages.length;
		if (nToIndex < 0 || tabpages_len <= nToIndex || tabpages_len <= nFromIndex || nFromIndex < 0) {
			return -1;
		}

		if (nFromIndex == nToIndex) {
			return -1;
		}

		var tabindex = this.tabindex;
		var tabpage = tabpages[tabindex];

		var cur_tabpage_id = tabpage.id;

		var fromtabpage = tabpages[nFromIndex];

		var tabbuttonitems = this._tabbuttonitems;
		var frombutton = tabbuttonitems[nFromIndex];

		tabpages.delete_item(nFromIndex);
		tabpages.insert_item(nToIndex, fromtabpage.id, fromtabpage);
		var i;
		if (nFromIndex < nToIndex) {
			for (i = nFromIndex + 1; i < tabpages_len; i++) {
				tabbuttonitems[i - 1] = tabbuttonitems[i];
				tabbuttonitems[i - 1]._tabindex = i - 1;

				if (i == nToIndex) {
					tabbuttonitems[i] = frombutton;
					tabbuttonitems[i]._tabindex = i;
					break;
				}
			}
		}
		else {
			for (i = nFromIndex; i > nToIndex; i--) {
				tabbuttonitems[i] = tabbuttonitems[i - 1];
				tabbuttonitems[i]._tabindex = i;
			}

			tabbuttonitems[nToIndex] = frombutton;
			tabbuttonitems[nToIndex]._tabindex = nToIndex;
		}

		for (i = 0; i < tabpages_len; i++) {
			if (cur_tabpage_id == tabpages[i].id) {
				this.tabindex = i;
			}
		}

		this._rearrangeContents();

		return 0;
	};

	_pTab.getTabpageCount = function () {
		return this.tabpages.length;
	};

	_pTab.getIndex = function (nXPos, nYPos) {
		var tabindex = this._getTabIndex(parseInt(nXPos, 10), parseInt(nYPos, 10));
		return tabindex;
	};

	_pTab.setContents = function (str) {
		var ret = this._setContents(str);
		return ret;
	};


	_pTab.on_fire_user_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey);
			return this.onmousedown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onmouseup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

		if (!this._focusobj) {
			this._setTabFocusObj(this);
		}
	};

	_pTab.on_killfocus_basic_action = function (new_focus, new_ref_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		if (new_focus === this) {
			return;
		}

		if (new_focus == null && new_ref_focus == null) {
			return;
		}

		this._focusobj = null;
	};

	_pTab.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = false;
		if (!this.onkeydown || (this.onkeydown && !this.onkeydown.defaultprevented)) {
			if (key_code == nexacro.Event.KEY_TAB || key_code == nexacro.Event.KEY_RIGHT || key_code == nexacro.Event.KEY_LEFT || key_code == nexacro.Event.KEY_BACKSPACE) {
				if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp, meta_key)) {
					if (this._getWindow()._keydown_element) {
						this._getWindow()._keydown_element._event_stop = true;
					}

					return true;
				}
			}
			else if (nexacro._enableaccessibility) {
				if (key_code == nexacro.Event.KEY_DOWN || key_code == nexacro.Event.KEY_UP) {
					if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp, meta_key)) {
						return true;
					}
				}
			}
		}
		ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		return ret;
	};

	_pTab.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp, meta_key);
			return this.onkeydown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp, meta_key);
			return this.onkeyup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp, meta_key);
			return this.onkeyup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key);

		if (!this.visible || this._isEnable() == false) {
			return ret;
		}

		this._is_changed_focus = false;

		if (refer_comp && ((refer_comp instanceof nexacro._TabButtonItemControl) || refer_comp.parent instanceof nexacro._TabButtonItemControl)) {
			var tabbutton_obj = this._tabbutton_obj;
			if (tabbutton_obj && tabbutton_obj.name == "extrabutton") {
				if (this._tabbuttonitems[tabbutton_obj._tabindex]) {
					this._tabbuttonitems[tabbutton_obj._tabindex]._setFocus();
				}
			}


			if (tabbutton_obj && this.selectchangetype == "down") {
				var idx = tabbutton_obj._tabindex;

				var oldindex = this.tabindex;
				var focusobj = this._focusobj;

				var bcanchange = this._changeTabIndex(idx, true, true);
				if (bcanchange) {
					if (this.enableevent && oldindex != this.tabindex) {
						this.on_fire_onchanged(tabbutton_obj, idx, oldindex);
					}

					if (focusobj != this._focusobj) {
						this._is_changed_focus = true;
					}
				}

				this._rearrangeContents(-1);
			}
		}

		return ret;
	};

	_pTab.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (from_refer_comp.name == "extrabutton") {
			var tabbutton = from_refer_comp.parent;
			var idx = tabbutton._tabindex;
			if (idx >= 0) {
				this.on_fire_onextrabuttonclick(tabbutton, idx, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
		}

		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onlbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_lbuttonup_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_lbuttonup_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key);

		if (!this.visible || this._isEnable() == false) {
			return ret;
		}

		if (refer_comp && ((refer_comp instanceof nexacro._TabButtonItemControl) || refer_comp.parent instanceof nexacro._TabButtonItemControl)) {
			if (this._tabbutton_obj && this.selectchangetype == "up") {
				var tabbutton_obj = this._tabbutton_obj;
				var idx = tabbutton_obj._tabindex;

				var oldindex = this.tabindex;
				var bcanchange = this._changeTabIndex(idx, true, true);
				if (bcanchange) {
					if (this.enableevent && oldindex != this.tabindex) {
						this.on_fire_onchanged(tabbutton_obj, idx, oldindex);
					}
				}

				this._rearrangeContents(-1);
			}
		}
	};

	_pTab.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos) {
		var ret = nexacro.Component.prototype.on_touchend_basic_action.call(this, touch_manager, touchinfos, changedtouchinfos);

		var control = this._getControlFromElement(touch_manager._start_elem);

		if (control) {
			var idx;

			if (control instanceof nexacro._TabExtraButtonControl) {
				var tabbuttonitem = control.parent;
				idx = tabbuttonitem._tabindex;

				var screenX, screenY, canvasX, canvasY, clientX, clientY;
				if (touchinfos && touchinfos.length > 0) {
					screenX = touchinfos[0].screenx;
					screenY = touchinfos[0].screeny;
					canvasX = touchinfos[0].canvasx;
					canvasY = touchinfos[0].canvasy;
					clientX = touchinfos[0].clientx;
					clientY = touchinfos[0].clienty;
				}

				if (idx >= 0) {
					this.on_fire_onextrabuttonclick(tabbuttonitem, idx, "touch", null, null, null, screenX, screenY, canvasX, canvasY, clientX, clientY, this, control);
				}
				var curindex = this.tabindex;
				if (curindex == idx) {
					return ret;
				}
				else {
					control = control.parent;
				}
			}

			if (control instanceof nexacro._TabButtonItemControl) {
				this._tabbutton_obj = control;

				var tabbutton_obj = this._tabbutton_obj;
				idx = tabbutton_obj._tabindex;

				var oldindex = this.tabindex;
				var bcanchange = this._changeTabIndex(idx, true, true);
				if (bcanchange) {
					if (this.enableevent && oldindex != this.tabindex) {
						this.on_fire_onchanged(tabbutton_obj, idx, oldindex);
					}
				}

				this._rearrangeContents(-1);
			}
		}

		return ret;
	};

	_pTab.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onlbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onrbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onrbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_onextrabuttonclick = function (obj, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onextrabuttonclick && this.onextrabuttonclick._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onextrabuttonclick", index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, this, meta_key);
			return this.onextrabuttonclick._fireEvent(this, evt);
		}
		return true;
	};

	_pTab.on_notify_prevbutton_onclick = function (obj, e) {
		this._adjustSpinPosition(-1);
	};

	_pTab.on_notify_nextbutton_onclick = function (obj, e) {
		this._adjustSpinPosition(1);
	};

	_pTab.on_fire_canchange = function (obj, postindex, preindex) {
		this._is_canchange = true;

		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.TabIndexChangeEventInfo(obj, "canchange", postindex, preindex);

			this._is_canchange = this.canchange._fireCheckEvent(this, evt);
			return this._is_canchange;
		}

		return true;
	};

	_pTab.on_fire_onchanged = function (obj, postindex, preindex) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.TabIndexChangeEventInfo(this, "onchanged", postindex, preindex);
			return this.onchanged._fireEvent(this, evt);
		}

		return true;
	};
	_pTab.on_apply_prop_cssclass = function () {
		var nextbutton = this.nextbutton;
		if (nextbutton) {
			nextbutton.on_apply_cssclass();
		}
		var prevbutton = this.prevbutton;
		if (prevbutton) {
			prevbutton.on_apply_cssclass();
		}
		var tabbuttonitems = this._tabbuttonitems;
		var tabpages_len = tabbuttonitems.length;

		var i;
		for (i = 0; i < tabpages_len; i++) {
			var tabbuttonitem = tabbuttonitems[i];
			if (tabbuttonitem) {
				tabbuttonitem.on_apply_cssclass();
			}
		}
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabpage;

		for (i = 0; i < tabpages_length; i++) {
			tabpage = tabpages[i];
			if (tabpage) {
				tabpage.on_apply_cssclass();
			}
		}
	};


	_pTab._createSpinButton = function (bCreateOnly) {
		if (!this.nextbutton) {
			this.nextbutton = new nexacro.Button("nextbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.nextbutton._setControl();
			this.nextbutton.createComponent(bCreateOnly);
			this.nextbutton.set_visible(false);
			this.nextbutton._setEventHandler("onclick", this.on_notify_nextbutton_onclick, this);
		}

		if (!this.prevbutton) {
			this.prevbutton = new nexacro.Button("prevbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.prevbutton._setControl();
			this.prevbutton.createComponent(bCreateOnly);
			this.prevbutton.set_visible(false);
			this.prevbutton._setEventHandler("onclick", this.on_notify_prevbutton_onclick, this);
		}
	};

	_pTab._createTabpages = function (bCreateOnly) {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var tabpage;
		var tabindex = this.tabindex;

		for (var i = 0; i < tabpages_length; i++) {
			tabpage = tabpages[i];



			tabpage._refobj = this;

			tabpage._preload = this.preload;

			if (tabindex != i) {
				tabpage.set_visible(false);
			}

			if (!tabpage._is_created) {
				tabpage.createComponent(bCreateOnly);
			}
		}
	};

	_pTab._createTabButtons = function (bCreateOnly) {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		if (tabpages_length <= 0) {
			return;
		}

		for (var i = 0; i < tabpages_length; i++) {
			var tabbutton = this._createTabbutton(i, tabpages[i], bCreateOnly);
			this._tabbuttonitems.push(tabbutton);
		}
	};

	_pTab._createTabbutton = function (idx, tabpage, bCreateOnly) {
		if (!tabpage) {
			return null;
		}

		var button_idx = this._next_button_idx++;
		var tabpage_text = tabpage.text;
		var tabindex = idx;

		var btn = new nexacro._TabButtonItemControl("tabbutton_" + button_idx, 0, 0, 1, 1, null, null, null, null, null, null, this);

		btn.createComponent(bCreateOnly);
		btn.set_text(tabpage_text);
		btn._tabindex = tabindex;
		btn._tabpage = tabpage;
		tabpage._tabbuttonitem = btn;

		return btn;
	};


	_pTab._getTabIndex = function (nX, nY) {
		var tabindex = -1;
		var tabpages_len = this.tabpages.length;
		if (tabpages_len <= 0) {
			return tabindex;
		}

		if (nX < 0 || nY < 0) {
			return tabindex;
		}


		var l = 0, t = 0, r = 0, b = 0;
		var tabbuttonitems, tabbuttonitem;

		tabbuttonitems = this._tabbuttonitems;
		for (var i = 0; i < tabpages_len; i++) {
			tabbuttonitem = tabbuttonitems[i];
			if (tabbuttonitem.visible) {
				l = tabbuttonitem._position.left;
				t = tabbuttonitem._position.top;
				b = t + tabbuttonitem._position.height;
				r = l + tabbuttonitem._position.width;

				if (nX >= l && nX <= r && nY >= t && nY <= b) {
					tabindex = i;
					break;
				}
			}
		}

		return tabindex;
	};

	_pTab._isSpinButtonVisible = function () {
		return this.nextbutton.visible || this.prevbutton.visible;
	};

	_pTab._getPrevButtonSize = function () {
		if (!this._prevbutton_size) {
			var width = 0;
			var height = 0;

			var border = this.prevbutton._getCSSStyleValue("border");
			var padding = this.prevbutton._getCSSStyleValue("padding");

			if (border) {
				width = border.left._width + border.right._width;
				height = border.top._width + border.bottom._width;
			}

			if (padding) {
				width += padding.left + padding.right;
				height += padding.top + padding.bottom;
			}

			var icon = this.prevbutton._getCSSStyleValue("icon");
			if (icon instanceof Object) {
				icon = icon.value;
			}

			this._prevbutton_size = {
				width : width, 
				height : height
			};

			if (!icon) {
				var size = this._default_spinbutton_size;
				this._prevbutton_size.width += size.width;
				this._prevbutton_size.height += size.height;
			}
			else {
				var iconsize = nexacro._getImageSize(icon, this._onload_prevbutton_iconimage, this);
				if (iconsize) {
					this._prevbutton_size.width += iconsize.width;
					this._prevbutton_size.height += iconsize.height;
				}
				else {
					return null;
				}
			}
		}

		return this._prevbutton_size;
	};

	_pTab._getNextButtonSize = function () {
		if (!this._nextbutton_size) {
			var width = 0;
			var height = 0;

			var border = this.nextbutton._getCSSStyleValue("border");
			var padding = this.nextbutton._getCSSStyleValue("padding");

			if (border) {
				width = border.left._width + border.right._width;
				height = border.top._width + border.bottom._width;
			}

			if (padding) {
				width += padding.left + padding.right;
				height += padding.top + padding.bottom;
			}

			var icon = this.nextbutton._getCSSStyleValue("icon");
			if (icon instanceof Object) {
				icon = icon.value;
			}

			this._nextbutton_size = {
				width : width, 
				height : height
			};

			if (!icon) {
				var size = this._default_spinbutton_size;

				this._nextbutton_size.width += size.width;
				this._nextbutton_size.height += size.height;
			}
			else {
				var iconsize = nexacro._getImageSize(icon, this._onload_nextbutton_iconimage, this);
				if (iconsize) {
					this._nextbutton_size.width += iconsize.width;
					this._nextbutton_size.height += iconsize.height;
				}
				else {
					return null;
				}
			}
		}

		return this._nextbutton_size;
	};

	_pTab._getTabpageBorder = function () {
		var border;
		var len = this.tabpages.length;
		var tabpage;
		if (len > 0) {
			tabpage = this.tabpages[0];
			border = tabpage._getCSSStyleValue("border");
		}

		return border;
	};

	_pTab._addChild = function (id, obj, bInsert, nIndex) {
		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			return -1;
		}

		if (this[id]) {
			return -1;
		}
		if (!(obj instanceof nexacro.Tabpage)) {
			return -1;
		}

		obj._refform = this;

		if (!obj.id) {
			obj.id = obj.name = id;
		}
		else {
			obj.id = id;
		}

		this[id] = obj;
		if (bInsert && nIndex >= 0) {
			this.tabpages.insert_item(nIndex, id, obj);
		}
		else {
			this.tabpages.add_item(id, obj);
		}

		if (this.preload || (this._init_tabindex >= 0 && this.tabpages[this._init_tabindex] == obj)) {
			obj._on_apply_url();
		}

		if (!obj._url) {
			var _form = obj.form;
			if (_form) {
				_form._is_loaded = true;
			}
		}
	};

	_pTab._getFirstTabbuttonIndex = function () {
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_len = tabbuttonitems.length;
		var tabbuttonitem;
		var v = -1;

		for (var i = 0; i < tabbuttonitems_len; i++) {
			tabbuttonitem = tabbuttonitems[i];
			if (tabbuttonitem.visible) {
				v = i;
				break;
			}
		}

		return v;
	};

	_pTab._adjustSpinPosition = function (v) {
		var tabbuttonitems_len = this._tabbuttonitems.length;
		var begin_idx = parseInt(v);
		var first_indext = this._getFirstTabbuttonIndex();
		if (first_indext >= 0) {
			begin_idx += first_indext;
		}

		if (begin_idx < 0) {
			begin_idx = 0;
		}

		if (begin_idx >= tabbuttonitems_len) {
			begin_idx = tabbuttonitems_len - 1;
		}

		this._rearrangeContents(begin_idx);
	};

	_pTab._changeTabIndex = function (index, is_apply_focus, is_mouse_action) {
		var nindex = +index;
		if (!this._is_created || this.tabindex == index || (nindex != nindex) || index < 0 || (this.tabpages && index >= this.tabpages.length)) {
			return;
		}

		var oldindex = this.tabindex;
		if (oldindex > -1 && this.enableevent) {
			var ret = this.on_fire_canchange(this, index, oldindex);
			if (ret == false) {
				this._tabbuttonitems[index]._changeUserStatus("selected", false);

				return false;
			}
		}

		var oldtabpage = oldindex > -1 ? this.tabpages[oldindex] : undefined;
		var newtabpage = this.tabpages[index];

		var oldtabtn = oldindex > -1 ? this._tabbuttonitems[oldindex] : undefined;
		var newtabbtn = this._tabbuttonitems[index];

		if (oldtabpage && oldtabtn) {
			if (oldtabpage.enable) {
				oldtabtn._changeStatus("enabled", true);
			}
			else {
				oldtabtn._changeStatus("disabled", true);
			}

			if (oldtabtn.visible) {
				oldtabtn._changeUserStatus("selected", false);
				if (is_mouse_action) {
					oldtabtn._changeStatus("mouseover", false);
				}
			}
			oldtabpage.set_visible(false);

			oldtabtn._setAccessibilityStatSelected(false);
		}

		this._oldtabindex = oldindex;
		this.tabindex = index;

		if (newtabpage) {
			if (!newtabpage.visible) {
				newtabpage.set_visible(true);
			}

			if (!this.preload) {
				newtabpage._on_apply_url(false);
			}

			if (!newtabbtn.visible) {
				newtabbtn.set_visible(true);
			}

			newtabbtn._changeUserStatus("selected", true);
			newtabbtn._setAccessibilityStatSelected(true);

			if (is_apply_focus) {
				newtabbtn._on_focus(true);
			}
			if (newtabpage.enable) {
				newtabpage._changeStatus("enabled", true);
			}
			else {
				newtabpage._changeStatus("disabled", true);
			}
		}
		else {
			if (oldtabpage && oldtabtn) {
				if (oldtabtn.enable) {
					oldtabtn._changeStatus("focused", true);
				}
				else {
					oldtabtn._changeStatus("disabled", true);
				}

				oldtabtn._changeUserStatus("selected", true);
				oldtabpage.set_visible(true);
			}
		}

		return true;
	};

	_pTab._rearrangeContents = function (beginTabindex) {
		if (!this._is_created) {
			return;
		}

		var tabposition = this.tabposition;
		var bmultiline = this.multiline;
		var btabjustify = this.tabjustify;

		var bshowextrabutton = this.showextrabutton;
		var extrabutton_size;
		var extrabutton_width = 0;
		var extrabutton_height = 0;

		if (bshowextrabutton) {
			if (!this._extrabutton_size) {
				extrabutton_size = this._getExtraButtonSize();
				if (extrabutton_size) {
					if (extrabutton_size.width != 0 || extrabutton_size.height != 0) {
						this._extrabutton_size = extrabutton_size;
					}

					extrabutton_width = extrabutton_size.width;
					extrabutton_height = extrabutton_size.height;
				}
			}
			else {
				extrabutton_width = this._extrabutton_size.width;
				extrabutton_height = this._extrabutton_size.height;
			}
		}

		var tabindex = this.tabindex;

		var bshowspin = false;
		var prevbutton;
		var nextbutton;
		var prevbutton_size;
		var nextbutton_size;
		var nextbutton_enable = false;
		var prevbutton_enable = false;

		var tabpage_position = {
			left : 0, 
			top : 0, 
			width : 0, 
			height : 0
		};

		var cur_line_width = 0;
		var cur_line_height = 0;
		var cur_line_index = 0;
		var line_count = 0;

		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_len = tabbuttonitems.length;
		var tabbuttonitem;
		var tabbuttonitem_sizeinfo, tabbuttonitem_pos;

		var tab_width = this._getClientWidth();
		var tab_height = this._getClientHeight();

		var tabpages = this.tabpages;
		var tabpages_len = tabpages.length;
		var tabpage;

		var tabpage_border = this._getTabpageBorder();
		var tabpage_border_l = 0, tabpage_border_t = 0, tabpage_border_r = 0, tabpage_border_b = 0;

		if (tabpage_border) {
			if (tabpage_border.left) {
				tabpage_border_l = tabpage_border.left._width;
			}
			if (tabpage_border.top) {
				tabpage_border_t = tabpage_border.top._width;
			}
			if (tabpage_border.right) {
				tabpage_border_r = tabpage_border.right._width;
			}
			if (tabpage_border.bottom) {
				tabpage_border_b = tabpage_border.bottom._width;
			}
		}

		var tab_max_width = tab_width;
		var tab_max_height = tab_height;

		if (tab_max_width <= 0 || tab_max_height <= 0) {
			return;
		}

		tabpage_position.width = tab_width;
		tabpage_position.height = tab_height;

		var tab_buttonwidth = this.tabbuttonwidth;
		var tab_buttonheight = this.tabbuttonheight;

		var tab_selectedbuttonwidth = this.selectedtabbuttonwidth;
		var tab_selectedbuttonheight = this.selectedtabbuttonheight;



		this._setTabButtonItemsSizeInfo();

		var tabbuttonitem_max_size = this._getTabbuttonItemsMaxSize();
		var tabbuttonitem_max_width = tabbuttonitem_max_size[0];
		var tabbuttonitem_max_height = tabbuttonitem_max_size[1];




		var begin_index = 0;
		var end_index = 0;

		var bovered = false;
		var blastitem = false;
		var bovered_cur_line = false;

		var i;
		for (i = 0; i < tabbuttonitems_len; i++) {
			tabbuttonitem = tabbuttonitems[i];
			tabpage = tabbuttonitem._tabpage;

			tabbuttonitem_sizeinfo = tabbuttonitem._sizeinfo;
			tabbuttonitem_pos = tabbuttonitem._position;

			var tabbuttonitem_width = tabbuttonitem_sizeinfo.width;
			var tabbuttonitem_height = tabbuttonitem_sizeinfo.height;

			var prop_tabbuttonitemwidth = tabpage.tabbuttonwidth;
			var prop_tabbuttonitemheight = tabpage.tabbuttonheight;

			var each_tabbuttonitemwidth = undefined;
			var each_tabbuttonitemheight = undefined;

			if (!bmultiline) {
				if (btabjustify) {
					if (tabposition == "top" || tabposition == "bottom") {
						if (tab_buttonheight !== undefined) {
							each_tabbuttonitemheight = tab_buttonheight;
						}

						if (prop_tabbuttonitemheight !== undefined) {
							each_tabbuttonitemheight = prop_tabbuttonitemheight;
						}

						if (tabbuttonitem._tabindex == tabindex) {
							if (tab_selectedbuttonheight !== undefined) {
								each_tabbuttonitemheight = tab_selectedbuttonheight;
							}
						}
					}
					else {
						if (tab_buttonwidth !== undefined) {
							each_tabbuttonitemwidth = tab_buttonwidth;
						}

						if (prop_tabbuttonitemwidth !== undefined) {
							each_tabbuttonitemwidth = prop_tabbuttonitemwidth;
						}

						if (tabbuttonitem._tabindex == tabindex) {
							if (tab_selectedbuttonwidth !== undefined) {
								each_tabbuttonitemwidth = tab_selectedbuttonwidth;
							}
						}
					}
				}
				else {
					if (tab_buttonwidth !== undefined) {
						each_tabbuttonitemwidth = tab_buttonwidth;
					}
					if (tab_buttonheight !== undefined) {
						each_tabbuttonitemheight = tab_buttonheight;
					}

					if (prop_tabbuttonitemwidth !== undefined) {
						each_tabbuttonitemwidth = prop_tabbuttonitemwidth;
					}
					if (prop_tabbuttonitemheight !== undefined) {
						each_tabbuttonitemheight = prop_tabbuttonitemheight;
					}

					if (tabbuttonitem._tabindex == tabindex) {
						if (tab_selectedbuttonwidth !== undefined) {
							each_tabbuttonitemwidth = tab_selectedbuttonwidth;
						}
						if (tab_selectedbuttonheight !== undefined) {
							each_tabbuttonitemheight = tab_selectedbuttonheight;
						}
					}
				}
			}

			if (bshowextrabutton) {
				if (!each_tabbuttonitemwidth) {
					if (extrabutton_width) {
						tabbuttonitem_width += extrabutton_width;
					}
					else {
						tabbuttonitem_width += tabbuttonitem_max_height;
					}
				}
			}

			if (each_tabbuttonitemwidth !== undefined) {
				if (each_tabbuttonitemwidth < 0) {
					tabbuttonitem_width = 0;
				}
				else {
					tabbuttonitem_width = each_tabbuttonitemwidth;
				}
			}
			if (each_tabbuttonitemheight !== undefined) {
				if (each_tabbuttonitemheight < 0) {
					tabbuttonitem_height = 0;
				}
				else {
					tabbuttonitem_height = each_tabbuttonitemheight;
				}
			}

			if (tabposition == "top" || tabposition == "bottom") {
				tabbuttonitem_pos.width = tabbuttonitem_width;
				if (each_tabbuttonitemheight === undefined) {
					tabbuttonitem_pos.height = tabbuttonitem_max_height;
				}
				else {
					tabbuttonitem_pos.height = each_tabbuttonitemheight;
				}
			}
			else {
				if (each_tabbuttonitemwidth === undefined) {
					tabbuttonitem_pos.width = tabbuttonitem_max_width;
				}
				else {
					tabbuttonitem_pos.width = each_tabbuttonitemwidth;
				}

				tabbuttonitem_pos.height = tabbuttonitem_height;
			}

			tabbuttonitem._line_index = 0;

			cur_line_width += tabbuttonitem_width;
			cur_line_height += tabbuttonitem_height;

			blastitem = ((i + 1) == tabbuttonitems_len);

			if (tabposition == "top" || tabposition == "bottom") {
				bovered_cur_line = cur_line_width > tab_max_width;
			}
			else {
				bovered_cur_line = cur_line_height > tab_max_height;
			}



			if (bovered_cur_line || blastitem) {
				if (!bmultiline && bovered_cur_line && !bshowspin) {
					bshowspin = true;

					prevbutton_size = this._getPrevButtonSize();
					nextbutton_size = this._getNextButtonSize();

					if (!prevbutton_size || !nextbutton_size) {
						return;
					}

					if (tabposition == "top" || tabposition == "bottom") {
						tab_max_width -= (prevbutton_size.width + nextbutton_size.width);
						if (prevbutton_size.height > tabbuttonitem_max_height || nextbutton_size.height > tabbuttonitem_max_height) {
							tabbuttonitem_max_height = (prevbutton_size.height > nextbutton_size.height) ? prevbutton_size.height : nextbutton_size.height;
						}
					}
					else {
						tab_max_height -= (prevbutton_size.height + nextbutton_size.height);
						if (prevbutton_size.width > tabbuttonitem_max_width || nextbutton_size.height > tabbuttonitem_max_width) {
							tabbuttonitem_max_width = (prevbutton_size.width > nextbutton_size.width) ? prevbutton_size.width : nextbutton_size.width;
						}
					}


					i = -1;
					cur_line_index = 0;
					cur_line_width = 0;
					cur_line_height = 0;

					continue;
				}

				if (bovered_cur_line) {
					end_index = i;
					cur_line_width -= tabbuttonitem_width;
					cur_line_height -= tabbuttonitem_height;

					bovered = true;
				}
				else {
					end_index = i + 1;
				}

				if (bshowspin && btabjustify) {
					btabjustify = false;

					i = -1;
					cur_line_index = 0;
					cur_line_width = 0;
					cur_line_height = 0;

					continue;
				}

				if (btabjustify || (bmultiline && bovered)) {
					var extra_width = tab_max_width - cur_line_width;
					var extra_height = tab_max_height - cur_line_height;

					var remainning = 0;
					if (tabposition == "top" || tabposition == "bottom") {
						remainning = extra_width;
					}
					else {
						remainning = extra_height;
					}

					var ratio = 1;

					for (var j = begin_index; j < end_index; j++) {
						tabbuttonitem = tabbuttonitems[j];
						if (bmultiline) {
							tabbuttonitem._line_index = cur_line_index;
						}
						else {
							tabbuttonitem._line_index = 0;
						}

						tabbuttonitem_pos = tabbuttonitem._position;
						if (tabposition == "top" || tabposition == "bottom") {
							ratio = tabbuttonitem_pos.width / cur_line_width;
							if ((j + 1) == end_index) {
								tabbuttonitem_pos.width += remainning;
							}
							else {
								tabbuttonitem_pos.width += Math.ceil(extra_width *  ratio);
							}

							remainning -= Math.ceil(extra_width *  ratio);
						}
						else {
							ratio = tabbuttonitem_pos.height / cur_line_height;
							if ((j + 1) == end_index) {
								tabbuttonitem_pos.height += remainning;
							}
							else {
								tabbuttonitem_pos.height += Math.ceil(extra_height *  ratio);
							}

							remainning -= Math.ceil(extra_height *  ratio);
						}
					}
				}

				if (end_index == tabbuttonitems_len || begin_index == end_index) {
					break;
				}

				cur_line_width = 0;
				cur_line_height = 0;

				begin_index = i;
				cur_line_index++;
				i--;

				continue;
			}
		}

		line_count = cur_line_index + 1;






		if (beginTabindex < 0) {
			beginTabindex = this._getFirstTabbuttonIndex();
		}

		if (beginTabindex == undefined || beginTabindex == null) {
			var temp_width = 0;
			var temp_height = 0;
			for (i = tabindex; i >= 0; i--) {
				tabbuttonitem = tabbuttonitems[i];
				tabbuttonitem_pos = tabbuttonitem._position;
				temp_width += tabbuttonitem_pos.width;
				temp_height += tabbuttonitem_pos.height;

				if (tabposition == "top" || tabposition == "bottom") {
					if (temp_width <= tab_max_width) {
						beginTabindex = i;
					}
					else {
						break;
					}
				}
				else {
					if (temp_height <= tab_max_height) {
						beginTabindex = i;
					}
					else {
						break;
					}
				}
			}
		}



		var left = 0;
		var top = 0;
		var pre_tabbuttonitem;
		var pre_line_index = 0;
		var start_line_index = 0;

		if (tabindex > 0) {
			tabbuttonitem = tabbuttonitems[tabindex];
			start_line_index = tabbuttonitem._line_index;
		}

		for (i = 0; i < tabbuttonitems_len; i++) {
			tabbuttonitem = tabbuttonitems[i];
			tabbuttonitem_pos = tabbuttonitem._position;
			cur_line_index = tabbuttonitem._line_index;

			if (bmultiline) {
				cur_line_index = (cur_line_index - start_line_index);
				if (cur_line_index < 0) {
					cur_line_index += line_count;
				}
			}
			else {
				cur_line_index = 0;
			}

			if (tabposition == "top" || tabposition == "bottom") {
				if (pre_line_index != cur_line_index) {
					left = 0;
				}

				if (tabposition == "top") {
					if (bmultiline) {
						top = tabbuttonitem_max_height *  (line_count - cur_line_index - 1);
					}
					else {
						top = tabbuttonitem_max_height - tabbuttonitem_pos.height;
					}

					tabbuttonitem_pos.height += tabpage_border_t;
				}
				else {
					if (bmultiline) {
						top = tab_max_height - tabbuttonitem_max_height *  (line_count - cur_line_index);
					}
					else {
						top = tab_max_height - tabbuttonitem_max_height;
					}

					top -= tabpage_border_b;
				}

				tabbuttonitem_pos.left = left;
				tabbuttonitem_pos.top = top;

				if (nextbutton_enable || (!bmultiline && (tabbuttonitem_pos.left + tabbuttonitem_pos.width) > tab_max_width)) {
					tabbuttonitem.set_visible(false);
					nextbutton_enable = true;
				}
				else {
					tabbuttonitem.set_visible(true);
					if (tabindex != tabbuttonitem._tabindex) {
						tabbuttonitem._changeUserStatus("selected", false);
					}
				}

				if (tabbuttonitem.visible) {
					pre_tabbuttonitem = tabbuttonitems[i - 1];
					if (pre_tabbuttonitem && !pre_tabbuttonitem.visible) {
						prevbutton_enable = true;
					}

					if (!bmultiline && tabbuttonitem._tabindex < beginTabindex) {
						tabbuttonitem.set_visible(false);
					}
					else {
						left = tabbuttonitem_pos.left + tabbuttonitem_pos.width;
					}
				}
			}
			else {
				if (pre_line_index != cur_line_index) {
					top = 0;
				}

				if (tabposition == "left") {
					if (bmultiline) {
						left = tabbuttonitem_max_width *  (line_count - (cur_line_index + 1));
					}
					else {
						left = tabbuttonitem_max_width - tabbuttonitem_pos.width;
					}

					tabbuttonitem_pos.width += tabpage_border_l;
				}
				else {
					if (bmultiline) {
						left = tab_max_width - tabbuttonitem_max_width *  (line_count - cur_line_index);
					}
					else {
						left = tab_max_width - tabbuttonitem_max_width;
					}

					left -= tabpage_border_r;
				}

				tabbuttonitem_pos.left = left;
				tabbuttonitem_pos.top = top;

				if (nextbutton_enable || (!bmultiline && (tabbuttonitem_pos.top + tabbuttonitem_pos.height) > tab_max_height)) {
					tabbuttonitem.set_visible(false);
					nextbutton_enable = true;
				}
				else {
					tabbuttonitem.set_visible(true);
					if (tabindex != tabbuttonitem._tabindex) {
						tabbuttonitem._changeUserStatus("selected", false);
					}
				}

				if (tabbuttonitem.visible) {
					pre_tabbuttonitem = tabbuttonitems[i - 1];
					if (pre_tabbuttonitem && !pre_tabbuttonitem.visible) {
						prevbutton_enable = true;
					}
					if (!bmultiline && tabbuttonitem._tabindex < beginTabindex) {
						tabbuttonitem.set_visible(false);
					}
					else {
						top = tabbuttonitem_pos.top + tabbuttonitem_pos.height;
					}
				}
			}

			pre_line_index = cur_line_index;

			if (bmultiline) {
				tabbuttonitem.set_visible(true);
				if (tabindex != tabbuttonitem._tabindex) {
					tabbuttonitem._changeUserStatus("selected", false);
				}
			}


			if (tabbuttonitem.visible) {
				tabbuttonitem.move(tabbuttonitem_pos.left, tabbuttonitem_pos.top, tabbuttonitem_pos.width, tabbuttonitem_pos.height);
				tabbuttonitem._showExtraButton(bshowextrabutton, extrabutton_width, (extrabutton_height > tabbuttonitem_pos.height ? tabbuttonitem_pos.height : extrabutton_height));
				tabbuttonitem.set_cssclass(tabbuttonitem._tabpage.tabbuttoncssclass);
			}
		}




		var adjust_count = line_count;
		if (!bmultiline || line_count <= 1) {
			adjust_count = 1;
		}

		if (tabposition == "top" || tabposition == "bottom") {
			tabpage_position.height -= tabbuttonitem_max_height *  adjust_count;
			if (tabposition == "top") {
				tabpage_position.top += tabbuttonitem_max_height *  adjust_count;
			}
		}
		else {
			tabpage_position.width -= tabbuttonitem_max_width *  adjust_count;
			if (tabposition == "left") {
				tabpage_position.left += tabbuttonitem_max_width *  adjust_count;
			}
		}

		for (i = 0; i < tabpages_len; i++) {
			tabpage = tabpages[i];

			tabpage.move(tabpage_position.left, tabpage_position.top, tabpage_position.width, tabpage_position.height);
			if (tabpage.form && tabpage.form._is_loaded == true && (!tabpage.url || tabpage.url.length <= 0)) {
				tabpage.form.resetScroll();
			}
		}


		prevbutton = this.prevbutton;
		nextbutton = this.nextbutton;
		if (!bshowspin) {
			prevbutton.set_visible(false);
			nextbutton.set_visible(false);
		}
		else {
			var nextbutton_pos = {
				left : 0, 
				top : 0, 
				width : 0, 
				height : 0
			};
			var prevbutton_pos = {
				left : 0, 
				top : 0, 
				width : 0, 
				height : 0
			};

			nextbutton_pos.width = nextbutton_size.width;
			nextbutton_pos.height = nextbutton_size.height;

			prevbutton_pos.width = prevbutton_size.width;
			prevbutton_pos.height = prevbutton_size.height;

			if (tabposition == "top" || tabposition == "bottom") {
				prevbutton_pos.left = tab_max_width;
				nextbutton_pos.left = prevbutton_pos.left + prevbutton_pos.width;

				if (tabposition == "top") {
					prevbutton_pos.top = tabpage_position.top - prevbutton_size.height;
					nextbutton_pos.top = tabpage_position.top - nextbutton_size.height;
				}
				else {
					prevbutton_pos.top = tabpage_position.height;
					nextbutton_pos.top = tabpage_position.height;
				}
			}
			else {
				prevbutton_pos.top = tab_max_height;
				nextbutton_pos.top = prevbutton_pos.top + prevbutton_pos.height;

				if (tabposition == "left") {
					prevbutton_pos.left = tabpage_position.left - prevbutton_size.width;
					nextbutton_pos.left = tabpage_position.left - nextbutton_size.width;
				}
				else {
					prevbutton_pos.left = tabpage_position.width;
					nextbutton_pos.left = tabpage_position.width;
				}
			}

			prevbutton.move(prevbutton_pos.left, prevbutton_pos.top, prevbutton_pos.width, prevbutton_pos.height);
			nextbutton.move(nextbutton_pos.left, nextbutton_pos.top, nextbutton_pos.width, nextbutton_pos.height);
			if (!prevbutton.visible) {
				prevbutton.set_visible(true);
			}
			if (!nextbutton.visible) {
				nextbutton.set_visible(true);
			}

			prevbutton._setEnable(prevbutton_enable);
			nextbutton._setEnable(nextbutton_enable);

			if (!prevbutton_enable) {
				prevbutton._changeStatus("mouseover", false);
			}
			if (!nextbutton_enable) {
				nextbutton._changeStatus("mouseover", false);
			}
		}
	};

	_pTab._getExtraButtonSize = function () {
		var extrabuttonsize, extrabuttonsize_w, extrabuttonsize_h;
		if (this.extrabuttonsize) {
			extrabuttonsize = this.extrabuttonsize.split(" ");

			extrabuttonsize_w = +extrabuttonsize[0];

			if (!isNaN(extrabuttonsize_w)) {
				extrabuttonsize_h = +extrabuttonsize[1];
				if (isNaN(extrabuttonsize_h)) {
					extrabuttonsize_h = extrabuttonsize_w;
				}

				return {
					width : extrabuttonsize_w, 
					height : extrabuttonsize_h
				};
			}
		}

		var tabbuttonitem = this._tabbuttonitems ? this._tabbuttonitems[0] : null;
		if (!tabbuttonitem) {
			return null;
		}

		return tabbuttonitem._getExtraButtonSize(this.showextrabutton);
	};

	_pTab._getTabbuttonItemsMaxSize = function () {
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;
		var tabbuttonitem, size;
		var max_width = 0;
		var max_height = 0;
		var bshowextrabutton = this.showextrabutton;
		var width = 0, height = 0;

		var tabindex = this.tabindex;
		var bmultiline = this.multiline;
		var btabjustify = this.tabjustify;
		var tabposition = this.tabposition;
		var tab_buttonwidth = this.tabbuttonwidth;
		var tab_buttonheight = bmultiline ? undefined : this.tabbuttonheight;
		var tab_selectedbuttonwidth = this.selectedtabbuttonwidth;
		var tab_selectedbuttonheight = this.selectedtabbuttonheight;
		var prop_tabbuttonitemwidth, prop_tabbuttonitemheight;
		var each_tabbuttonitemwidth, each_tabbuttonitemheight;
		var each_tabbuttonitem_maxwidth = 0;
		var each_tabbuttonitem_maxheight = 0;

		var tabpage;
		for (var i = 0; i < tabbuttonitems_length; i++) {
			tabbuttonitem = tabbuttonitems[i];
			tabpage = tabbuttonitem._tabpage;

			size = tabbuttonitem._sizeinfo;
			if (size) {
				width = size.width;
				height = size.height;
			}

			prop_tabbuttonitemwidth = tabpage.tabbuttonwidth;
			prop_tabbuttonitemheight = tabpage.tabbuttonheight;
			each_tabbuttonitemwidth = 0;
			each_tabbuttonitemheight = 0;

			if (!bmultiline) {
				if (btabjustify) {
					if (tabposition == "top" || tabposition == "bottom") {
						if (tab_buttonheight) {
							each_tabbuttonitemheight = tab_buttonheight;
						}

						if (prop_tabbuttonitemheight) {
							each_tabbuttonitemheight = prop_tabbuttonitemheight;
						}

						if (tabbuttonitem._tabindex == tabindex) {
							if (tab_selectedbuttonheight) {
								each_tabbuttonitemheight = tab_selectedbuttonheight;
							}
						}
					}
					else {
						if (tab_buttonwidth) {
							each_tabbuttonitemwidth = tab_buttonwidth;
						}

						if (prop_tabbuttonitemwidth) {
							each_tabbuttonitemwidth = prop_tabbuttonitemwidth;
						}

						if (tabbuttonitem._tabindex == tabindex) {
							if (tab_selectedbuttonwidth) {
								each_tabbuttonitemwidth = tab_selectedbuttonwidth;
							}
						}
					}
				}
				else {
					if (tab_buttonwidth) {
						each_tabbuttonitemwidth = tab_buttonwidth;
					}
					if (tab_buttonheight) {
						each_tabbuttonitemheight = tab_buttonheight;
					}

					if (prop_tabbuttonitemwidth) {
						each_tabbuttonitemwidth = prop_tabbuttonitemwidth;
					}
					if (prop_tabbuttonitemheight) {
						each_tabbuttonitemheight = prop_tabbuttonitemheight;
					}

					if (tabbuttonitem._tabindex == tabindex) {
						if (tab_selectedbuttonwidth) {
							each_tabbuttonitemwidth = tab_selectedbuttonwidth;
						}
						if (tab_selectedbuttonheight) {
							each_tabbuttonitemheight = tab_selectedbuttonheight;
						}
					}
				}
			}

			if (each_tabbuttonitemheight > each_tabbuttonitem_maxheight) {
				each_tabbuttonitem_maxheight = each_tabbuttonitemheight;
			}
			if (each_tabbuttonitemwidth > each_tabbuttonitem_maxwidth) {
				each_tabbuttonitem_maxwidth = each_tabbuttonitemwidth;
			}

			if (tab_buttonwidth) {
				width = tab_buttonwidth;
			}
			if (tab_buttonheight) {
				height = tab_buttonheight;
			}

			if (height > max_height) {
				max_height = height;
			}
			if (width > max_width) {
				max_width = width;
			}
		}

		if (bshowextrabutton) {
			var extrabutton_size = this._extrabutton_size;
			if (extrabutton_size) {
				if (!each_tabbuttonitem_maxheight && extrabutton_size.height > max_height) {
					max_height = extrabutton_size.height;
				}

				if (!tab_buttonwidth) {
					max_width += extrabutton_size.width;
				}
			}
			else {
				if (!tab_buttonwidth) {
					max_width += max_height;
				}
			}
		}

		if (each_tabbuttonitem_maxwidth > max_width) {
			max_width = each_tabbuttonitem_maxwidth;
		}

		if (each_tabbuttonitem_maxheight > max_height) {
			max_height = each_tabbuttonitem_maxheight;
		}

		return [max_width, max_height];
	};

	_pTab._setTabButtonItemsSizeInfo = function () {
		var tabbuttonitems = this._tabbuttonitems;
		var tabbuttonitems_length = tabbuttonitems.length;
		var tabbuttonitem;

		var item_size;
		for (var i = 0; i < tabbuttonitems_length; i++) {
			tabbuttonitem = tabbuttonitems[i];

			item_size = tabbuttonitem._getItemSize();
			if (item_size) {
				tabbuttonitem._sizeinfo.width = item_size[0];
				tabbuttonitem._sizeinfo.height = item_size[1];
			}
		}
	};

	_pTab._on_get_extrabutton_iconsize = function (width, height) {
		this._extrabutton_size = null;
		this._rearrangeContents();
	};

	_pTab._onload_prevbutton_iconimage = function (url, width, height) {
		if (this._prevbutton_size) {
			if (width == 0 || height == 0) {
				var size = this._default_spinbutton_size;
				width = size.width;
				height = size.height;
			}
			this._prevbutton_size.width += width;
			this._prevbutton_size.height += width;
		}
		this._rearrangeContents();
	};

	_pTab._onload_nextbutton_iconimage = function (url, width, height) {
		if (this._nextbutton_size) {
			if (width == 0 || height == 0) {
				var size = this._default_spinbutton_size;
				width = size.width;
				height = size.height;
			}
			this._nextbutton_size.width += width;
			this._nextbutton_size.height += width;
		}

		this._rearrangeContents();
	};

	_pTab._keydown_filter = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, meta_key) {
		var tabpagecnt = this.tabpages.length;
		if (tabpagecnt <= 0) {
			return false;
		}

		var tabindex = this.tabindex;
		var oldtabindex = this.tabindex;

		var resettabindex = -1;
		var comp, newcomp = [], newcompobj;
		var tabpage, tabpage_form;
		var page_first_comp, page_last_comp;
		var focusobj;

		switch (keycode) {
			case 9:
				if (ctrl_key == true && this.usecontrolkey) {
					if (shift_key != true) {
						if (tabindex < tabpagecnt - 1) {
							resettabindex = tabindex + 1;
						}
						else {
							resettabindex = 0;
						}
					}
					else {
						if (tabindex > 0) {
							resettabindex = tabindex - 1;
						}
						else {
							resettabindex = tabpagecnt - 1;
						}
					}

					if (this._focusobj instanceof nexacro._TabButtonItemControl) {
						this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
					}
					else if (this._focusobj instanceof nexacro.Tabpage) {
						this._setTabFocusObj(this.tabpages[resettabindex]);
					}
					break;
				}
				else {
					var newfocus_comp;

					if (this._focusobj instanceof nexacro.Tab) {
						var env;
						var text;
						var control_elem;
						var win;

						if (shift_key == false) {
							if (this.focusacceptable) {
								this._setTabFocusObj(this._tabbuttonitems[tabindex]);
								this._tabbuttonitems[tabindex]._setFocus(false, 0);
							}
							else {
								tabpage = this.tabpages[tabindex];
								page_first_comp = tabpage.form._getTabOrderFirst();
								if (page_first_comp) {
									if (tabpage.form._last_focused) {
										win = this._getWindow();
										win._removeFromCurrentFocusPath(tabpage.form._last_focused);
									}
									page_first_comp._setFocus(false, 0);
									this._setTabFocusObj(tabpage);
								}
								else {
									newfocus_comp = this.parent._searchNextTabFocus(this, null, null, 0);
									if (newfocus_comp) {
										if (newfocus_comp[0] == null) {
											if (newfocus_comp[2] == 1) {
												env = nexacro.getEnvironment();
												if (env) {
													text = env.accessibilitylastovertext;
													control_elem = this._control_element;
													control_elem.notifyAccessibility(text, "notify", true);
												}
											}
											else if (newfocus_comp[2] == -1) {
												env = nexacro.getEnvironment();
												if (env) {
													text = env.accessibilityfirstovertext;
													control_elem = this._control_element;
													control_elem.notifyAccessibility(text, "notify", true);
												}
											}
										}
										else {
											if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
												win = this._getWindow();
												win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
											}

											newfocus_comp[0]._setFocus(true, 1, true);
										}
									}
								}
							}
						}
						else {
							newfocus_comp = this.parent._searchPrevTabFocus(this);
							if (newfocus_comp) {
								if (newfocus_comp[0] == null) {
									if (newfocus_comp[2] == 1) {
										env = nexacro.getEnvironment();
										if (env) {
											text = env.accessibilitylastovertext;
											control_elem = this._control_element;
											control_elem.notifyAccessibility(text, "notify", true);
										}
									}
									else if (newfocus_comp[2] == -1) {
										env = nexacro.getEnvironment();
										if (env) {
											text = env.accessibilityfirstovertext;
											control_elem = this._control_element;
											control_elem.notifyAccessibility(text, "notify", true);
										}
									}
								}
								else {
									if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
										win = this._getWindow();
										win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
									}

									newfocus_comp[0]._setFocus(true, 1, true);
								}
							}
						}
					}
					else if (this._focusobj instanceof nexacro._TabButtonItemControl) {
						if (shift_key == false) {
							newfocus_comp = this._searchNextTabFocus(this._focusobj, false, false, 0);

							if (newfocus_comp && newfocus_comp[0]) {
								newfocus_comp[0]._setFocus(true, 0, true);
							}
							this._setTabFocusObj(newfocus_comp[0]);
						}
						else {
							newfocus_comp = this._searchPrevTabFocus(this._focusobj, false, false, 0);

							if (newfocus_comp && newfocus_comp[0]) {
								newfocus_comp[0]._setFocus(true, 0, true);
							}
						}
					}
					else if (this._focusobj instanceof nexacro.Tabpage) {
						tabpage = this._focusobj;
						page_last_comp = tabpage.form._getLastFocused();
						page_first_comp = tabpage.form._getTabOrderFirst(0);

						if (shift_key == false) {
							if (page_last_comp) {
								comp = this._focusobj.form._searchNextTabFocus(page_last_comp, undefined, undefined, 0);
								if (comp && comp[0]) {
									comp[0]._setFocus(true, 0, true);
								}
							}
							else if (page_first_comp) {
								page_first_comp._setFocus(true, 0, true);
							}
						}
						else {
							if (!page_last_comp || page_last_comp == page_first_comp) {
								if (this.focusacceptable) {
									newcomp.push(this._tabbuttonitems[tabindex]);
								}
								else {
									newcomp = this.parent._searchPrevTabFocus(this, undefined, undefined, 0);
								}

								if (newcomp[0]) {
									newcomp[0]._setFocus(true, 1, true);
								}
							}
							else {
								comp = this._focusobj.form._searchPrevTabFocus(page_last_comp, undefined, undefined, 0);
								if (comp && comp[0]) {
									comp[0]._setFocus(true, 0, true);
								}
							}
						}
					}
					return true;
				}
				break;
			case 8:
				if (ctrl_key == true && this.usecontrolkey) {
					this.on_fire_onextrabuttonclick(this, tabindex, "", false, false, false, -1, -1, -1, -1, -1, -1, this, this);

					return true;
				}
				break;
			case 38:
				{

					if (nexacro._enableaccessibility) {
						focusobj = this._focusobj;
						newcompobj = null;

						if (focusobj instanceof nexacro.Tab) {
							newcompobj = this.parent._searchPrevTabFocus(focusobj, undefined, undefined, 7 + 8);
						}
						else if (focusobj instanceof nexacro._TabButtonItemControl) {
							if (this._isAccessibilityEnable()) {
								newcomp = this;
							}
							else {
								newcompobj = this.parent._searchPrevTabFocus(this, undefined, undefined, 7 + 8);
							}
						}
						else if (focusobj instanceof nexacro.Tabpage) {
							tabpage_form = focusobj.form;
							page_last_comp = tabpage_form._getLastFocused();



							if (!ctrl_key) {
								if (page_last_comp) {
									comp = tabpage_form._searchPrevTabFocus(page_last_comp, undefined, undefined, 7 + 8);
									if (comp && comp[0]) {
										newcomp = comp[0];
									}
								}
								else {
									if (this.focusacceptable) {
										newcomp = this._tabbuttonitems[focusobj.parent.tabindex];
									}
									else {
										if (!this._isAccessibilityEnable()) {
											newcompobj = this.parent._searchPrevTabFocus(this, undefined, undefined, 7 + 8);
											if (newcompobj && newcompobj[0]) {
												newcomp = newcompobj[0];
											}
										}
										else {
											newcomp = this;
										}
									}
								}
							}
						}

						if (newcompobj && newcompobj[0]) {
							newcomp = newcompobj[0];
							newcomp._setFocus(true, 3, true);
						}
						else {
							if (newcomp && !(newcomp instanceof Array)) {
								newcomp._setFocus(true, 3, true);
								this._setTabFocusObj(newcomp);
							}
						}

						return true;
					}
				}
				break;
			case 40:
				{

					if (nexacro._enableaccessibility) {
						focusobj = this._focusobj;
						newcompobj = null;
						if (focusobj instanceof nexacro.Tab) {
							if (this.focusacceptable) {
								newcomp = this._tabbuttonitems[this.tabindex];
							}
							else {
								newcomp = this.tabpages[this.tabindex];
								if (newcomp._last_focused) {
									newcomp._last_focused = null;
								}
								if (!newcomp._isAccessibilityEnable()) {
									newcompobj = newcomp.form._searchNextTabFocus(focusobj._last_focused, false, false, 7 + 8);
								}
							}
						}
						else if (focusobj instanceof nexacro._TabButtonItemControl) {
							tabpage = this.tabpages[this.tabindex];
							if (tabpage._last_focused) {
								tabpage._last_focused = null;
							}
							if (!tabpage._isAccessibilityEnable()) {
								newcompobj = tabpage._searchNextTabFocus(null, true, false, 7 + 8);

								if (!newcompobj) {
									comp = this.parent._searchNextTabFocus(this, undefined, undefined, 7 + 8);
									if (comp && comp[0]) {
										comp[0]._setFocus(true, 2, true);
									}
								}
							}
							else {
								newcomp = tabpage;
							}
						}
						else if (focusobj instanceof nexacro.Tabpage) {
							tabpage = focusobj;
							tabpage_form = tabpage.form;
							page_first_comp = tabpage_form._getTabOrderFirst(7 + 8);
							page_last_comp = tabpage_form._getLastFocused();

							if (!ctrl_key && !alt_key && !shift_key) {
								if (page_last_comp) {
									comp = tabpage_form._searchNextTabFocus(page_last_comp, undefined, undefined, 7 + 8);
									if (comp && comp[0]) {
										comp[0]._setFocus(true, 2, true);
									}
								}
								else if (page_first_comp) {
									newcomp = page_first_comp;
								}
								else {
									newcompobj = this.parent._searchNextTabFocus(this, undefined, undefined, 7 + 8);
								}
							}
						}

						if (newcompobj && newcompobj[0]) {
							newcomp = newcompobj[0];
							newcomp._setFocus(true, 2, true);
						}
						else {
							if (newcomp && !(newcomp instanceof Array)) {
								newcomp._setFocus(true, 2, true);
								this._setTabFocusObj(newcomp);
							}
						}
						return true;
					}
				}
				break;
			case 39:
				if (this.focusacceptable && ctrl_key == false) {
					focusobj = this._focusobj;
					if (focusobj instanceof nexacro._TabButtonItemControl) {
						if (tabindex < tabpagecnt - 1) {
							resettabindex = tabindex + 1;
						}
						else {
							resettabindex = 0;
						}
						this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
					}
				}
				break;
			case 37:
				if (this.focusacceptable && ctrl_key == false) {
					focusobj = this._focusobj;
					if (focusobj instanceof nexacro._TabButtonItemControl) {
						if (tabindex > 0) {
							resettabindex = tabindex - 1;
						}
						else {
							resettabindex = tabpagecnt - 1;
						}
						this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
					}
				}
				break;
			default:
				break;
		}

		if (resettabindex > -1) {
			if (this._changeTabIndex(resettabindex, true) == true) {
				if (this.enableevent) {
					this.on_fire_onchanged(this, resettabindex, oldtabindex);
				}

				this._rearrangeContents();
			}
		}
	};
	_pTab._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var focusobj = this._focusobj;
		if (focusobj && !(focusobj instanceof nexacro.Tab || focusobj instanceof nexacro._TabButtonItemControl || focusobj instanceof nexacro.Tabpage)) {
			return focusobj._getDlgCode(keycode, altKey, ctrlKey, shiftKey);
		}
		else {
			return {
				want_tab : true, 
				want_return : false, 
				want_escape : false, 
				want_chars : false, 
				want_arrows : this._isEnable()
			};
		}
	};

	_pTab._setTabFocusObj = function (focusobj) {
		this._focusobj = focusobj;
	};

	_pTab._getTabFocusObj = function () {
		return this._focusobj;
	};

	_pTab._getComponentsByTaborder = function (p, filter_type) {
		if (filter_type === undefined) {
			filter_type = 4;
		}

		if (p && p !== this) {
			return nexacro.FormBase._getComponentsByTaborder.call(this, p, filter_type);
		}

		if (!this._isEnable()) {
			return null;
		}

		var tabpage = this.tabpages[this.tabindex];
		var tabbuttonitem = this._tabbuttonitems[this.tabindex];

		var comp;
		var comps = (this.focusacceptable && tabbuttonitem) ? [tabbuttonitem] : [];

		if ((filter_type & 4) || (tabpage && tabpage.form._child_list && tabpage.form._child_list.length > 0)) {
			comps.push(tabpage);
		}

		var comp_len = comps.length;
		for (var i = 0, ar = []; i < comp_len; i++) {
			comp = comps[i];
			if (!comp || !comp._is_created || !comp.visible || ((comp._isEnable && !comp._isEnable() || !comp.enable) && !(filter_type & 2)) || comp._popup) {
				continue;
			}

			if (!(filter_type & 1) && !comp.on_get_prop_tabstop()) {
				continue;
			}

			ar[ar.length] = comp;
		}

		return ar;
	};

	_pTab._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchNextTabFocus.call(this, current, bSearchFromFirst, opt_force_cycle, filter_type);

		if (ret && bSearchFromFirst && ret[0] instanceof nexacro.Tabpage) {
			if (ret[0].form._child_list == 0 && !(filter_type & 4)) {
				return [this];
			}
		}
		return ret;
	};

	_pTab._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchPrevTabFocus.call(this, current, bSearchFromLast, opt_force_cycle, filter_type);

		if (ret && bSearchFromLast) {
			var next = ret[0];
			if (next instanceof nexacro.Tabpage) {
				if (next.form._child_list == 0 && !(filter_type & 4)) {
					return [this];
				}
			}
		}

		return ret;
	};

	_pTab._getTabOrderNext = function (current, direction, filter_type) {
		var tabbuttonitem = this._tabbuttonitems[this.tabindex];
		var tabpage = this.tabpages[this.tabindex];

		if (nexacro._isNull(filter_type)) {
			filter_type = 4;
		}

		if (direction > 0) {
			if (current === tabpage) {
				return null;
			}
			else if (current === tabbuttonitem) {
				if (filter_type & 4) {
					return tabpage;
				}
				else {
					return tabpage.form._getTabOrderFirst(filter_type);
				}
			}
		}
		else {
			if (current === tabpage && this.focusacceptable) {
				return tabbuttonitem;
			}
			else if (current === tabbuttonitem) {
				if (filter_type & 4) {
					return this;
				}
			}
		}

		return null;
	};

	_pTab._getTabOrderFirst = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderFirst.call(this, filter_type);
	};

	_pTab._getTabOrderLast = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderLast.call(this, filter_type);
	};

	_pTab._getControlFromElement = function (elem) {
		var ret = null;
		var p = elem;
		while (p && p !== this) {
			if (p instanceof nexacro._TabButtonItemControl || p instanceof nexacro._TabExtraButtonControl) {
				return p;
			}

			p = p.parent;
		}

		return ret;
	};

	_pTab._on_orientationchange = function (orientation) {
		var tabpage = this.tabpages[this.tabindex];
		if (tabpage) {
			tabpage._on_orientationchange(orientation);
		}
	};

	_pTab._setContents = function (str) {
		var doc = nexacro._parseXMLDocument(str);

		var tabpages = doc.getElementsByTagName("Tabpages")[0];
		if (!tabpages) {
			return false;
		}

		var i, i_len;
		var j, j_len;
		var name, val;
		var cur_tabindex = this.tabindex;

		for (i = 0, i_len = this.tabpages.length; i < i_len; i++) {
			this.removeTabpage(0);
		}

		var tabpage_nodes = tabpages.getElementsByTagName("Tabpage");
		var tabpage_node;
		var tabpage_obj;
		var init_tabpage_props = {
		};
		var set_tabpage_props = {
		};

		var layout_node;
		var contents_node;
		var contents_obj;
		var init_contents_props = {
		};
		var set_contents_props = {
		};

		var class_name, fn_constructor;

		for (i = 0; i < tabpage_nodes.length; i++) {
			tabpage_node = tabpage_nodes[i];
			init_tabpage_props = {
			};
			set_tabpage_props = {
			};

			for (j = 0, j_len = tabpage_node.attributes.length; j < j_len; j++) {
				name = tabpage_node.attributes[j].name;
				val = tabpage_node.attributes[j].value;
				if (/^(id|text|)$/.test(name)) {
					init_tabpage_props[name] = val;
				}
				else {
					set_tabpage_props[name] = val;
				}
			}


			tabpage_obj = new nexacro.Tabpage(init_tabpage_props["id"], this);

			tabpage_obj._refobj = this;
			tabpage_obj._preload = this.preload;

			tabpage_obj.set_text(init_tabpage_props["text"] || init_tabpage_props["id"]);

			for (name in set_tabpage_props) {
				if (tabpage_obj["set_" + name]) {
					tabpage_obj["set_" + name](set_tabpage_props[name]);
				}
				else {
					tabpage_obj[name] = set_tabpage_props[name];
				}
			}

			tabpage_obj.createComponent(false);

			this._addChild(init_tabpage_props["id"], tabpage_obj);

			if (!set_tabpage_props["url"]) {
				layout_node = tabpage_node.getElementsByTagName("Layout")[0];
				if (!layout_node) {
					continue;
				}

				contents_node = layout_node.firstChild;
				while (contents_node) {
					if (contents_node.nodeType != 1) {
						contents_node = contents_node.nextSibling;
						continue;
					}

					class_name = nexacro._getRegisterClass(contents_node.tagName);
					if (!class_name) {
						return false;
					}

					fn_constructor = nexacro._executeGlobalEvalStr(class_name);
					if (!fn_constructor) {
						return false;
					}

					if (fn_constructor.prototype && fn_constructor.prototype._is_component) {
						init_contents_props = {
						};
						set_contents_props = {
						};
						for (j = 0; j < contents_node.attributes.length; j++) {
							name = contents_node.attributes[j].name;
							val = contents_node.attributes[j].value;
							if (/^(id|left|top|width|height|right|bottom|minwidth|maxwidth|minheight|maxheight|)$/.test(name)) {
								init_contents_props[name] = val;
							}
							else {
								set_contents_props[name] = val;
							}
						}

						contents_obj = new fn_constructor(init_contents_props["id"], init_contents_props["left"], init_contents_props["top"], init_contents_props["width"], init_contents_props["height"], init_contents_props["right"], init_contents_props["bottom"], init_contents_props["minwidth"], init_contents_props["maxwidth"], init_contents_props["minheight"], init_contents_props["maxheight"], tabpage_obj.form);

						for (name in set_contents_props) {
							if (contents_obj["set_" + name]) {
								contents_obj["set_" + name](set_contents_props[name]);
							}
							else {
								contents_obj[name] = set_contents_props[name];
							}
						}

						if (contents_node.firstChild) {
							var childnode = contents_node.firstChild;

							var strXML = "";
							while (childnode) {
								if (childnode.nodeType == 1) {
									strXML += nexacro._documentToXml(childnode);
								}
								childnode = childnode.nextSibling;
							}

							if (!contents_obj._setContents(strXML)) {
								return false;
							}
						}

						tabpage_obj.form.addChild(contents_obj.id, contents_obj);
						contents_obj.show();
					}

					contents_node = contents_node.nextSibling;
				}
			}
		}

		if (this._is_created) {
			this._createSpinButton(false);
			this._createTabButtons(false);
			this.on_apply_tabindex(cur_tabindex);
			this._rearrangeContents();
		}

		return true;
	};

	_pTab._applyMultiContainerScrollPos = function () {
		var tabpages = this.tabpages;
		var tabpages_length = tabpages.length;
		var i = 0;
		var tabpage;
		for (i = tabpages_length - 1; i >= 0; i--) {
			tabpage = tabpages[i];
			if (tabpage && tabpage.form) {
				tabpage.form._applyScrollPos();
			}
		}
	};
	delete _pTab;
}

if (!nexacro.Tabpage) {
	nexacro.Tabpage = function (id, parent) {
		nexacro.Div.call(this, id, 0, 0, 0, 0, null, null, null, null, null, null, parent);
	};

	var _pTabpage = nexacro._createPrototype(nexacro.Div, nexacro.Tabpage);
	nexacro.Tabpage.prototype = _pTabpage;

	_pTabpage._type_name = "TabpageControl";
	_pTabpage._is_subcontrol = true;
	_pTabpage.accessibilityrole = "tabpage";

	_pTabpage.tabbuttonwidth = undefined;
	_pTabpage.tabbuttonheight = undefined;
	_pTabpage.tabbuttoncssclass = "";

	_pTabpage._preload = false;
	_pTabpage._tabbuttonitem = null;

	_pTabpage.bringToFront = nexacro._emptyFn;
	_pTabpage.bringToPrev = nexacro._emptyFn;
	_pTabpage.moveToNext = nexacro._emptyFn;
	_pTabpage.moveToPrev = nexacro._emptyFn;
	_pTabpage.sendToBack = nexacro._emptyFn;
	_pTabpage.sendToNext = nexacro._emptyFn;

	_pTabpage.on_apply_text = function (text) {
		var tab = this.parent;
		if (tab) {
			var btn;
			if (tab._tabbuttonitems) {
				var btn_len = tab._tabbuttonitems.length;
				for (var i = 0; i < btn_len; i++) {
					btn = tab._tabbuttonitems[i];
					if (btn._tabpage === this) {
						btn.set_text(this.text);
					}
				}
			}
			tab._rearrangeContents();
		}
	};

	_pTabpage._getForm = function () {
		var form = this._refform;
		if (form instanceof nexacro.Tab) {
			return form._refform;
		}

		return this._refform;
	};

	_pTabpage.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext);
		}
		this.on_apply_prop_accessibilitydescription();
		this._updateAccessibilityLabel();
	};

	_pTabpage.set_tabbuttonwidth = function (v) {
		this.tabbuttonwidth = (v === null || v === undefined) ? undefined : parseInt(v) | 0;

		var tab = this.parent;
		if (tab) {
			tab._rearrangeContents();
		}
	};

	_pTabpage.set_tabbuttonheight = function (v) {
		this.tabbuttonheight = (v === null || v === undefined) ? undefined : parseInt(v) | 0;

		var tab = this.parent;
		if (tab) {
			tab._rearrangeContents();
		}
	};

	_pTabpage.set_tabbuttoncssclass = function (v) {
		v = nexacro._toString(v);
		if (this.tabbuttoncssclass != v) {
			this.tabbuttoncssclass = v;
		}

		var tabbuttonitem = this._tabbuttonitem;
		if (tabbuttonitem) {
			tabbuttonitem.set_cssclass(v);
		}
	};

	_pTabpage.on_created = function (win) {
		this._registerHotkey();
		return nexacro.Div.prototype.on_created.call(this, win);
	};

	_pTabpage.createCommand = function () {
		this._registerHotkey();
		return nexacro.Div.prototype.createCommand.call(this);
	};

	_pTabpage.set_url = function (v) {
		if (v && v.substring(0, 4).toLowerCase() == "url(") {
			v = v.substring(4, v.length - 1);
		}

		if (v != this.url) {
			this.url = v;
			if (this.parent._is_created == true) {
				this.url = v;
				this.on_apply_url();
			}
		}
	};

	_pTabpage._on_apply_url = function () {
		if (!this._is_loadedform && !this.form._is_loading && this.url && this.url.length > 0) {
			this.on_apply_url(false);
		}
	};

	_pTabpage._setTabFocusObj = function (focusobj) {
		this.parent._focusobj = focusobj;
	};

	_pTabpage._getTabFocusObj = function () {
		return this.parent._getTabFocusObj();
	};

	_pTabpage.getParentContext = function () {
		return this.parent.getParentContext();
	};

	_pTabpage.on_getIDCSSSelector = function () {
		return "tabpage";
	};

	_pTabpage.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}

		var tabbuttonitem = this._tabbuttonitem;
		if (tabbuttonitem) {
			tabbuttonitem._setEnable(v);
		}
	};


	_pTabpage._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

		if (nexacro._enableAccessibility && new_focus && this._contains(new_focus)) {
			this._setTabFocusObj(new_focus);
		}
		else {
			this._setTabFocusObj(this);
		}
	};

	_pTabpage.on_killfocus_basic_action = function (new_focus, new_ref_focus) {
		nexacro.Component.prototype.on_killfocus_basic_action.call(this);

		if (new_focus === this) {
			return;
		}

		if (new_focus == null && new_ref_focus == null) {
			return;
		}
	};

	_pTabpage.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || key_code == nexacro.Event.KEY_TAB) {
			return;
		}

		return nexacro.Div.prototype.on_fire_user_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};

	_pTabpage.on_destroy_contents = function () {
		nexacro.Div.prototype.on_destroy_contents.call(this);

		this._tabbuttonitem = null;
	};

	_pTabpage.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var next_obj = null;
		var tab_comp = this.parent;
		var index = tab_comp._getTabIndex();
		var button_len = tab_comp._tabButtons.length;

		var _window = this._getWindow();
		var last_notify = _window._accessibility_last_focused_comp;
		if (direction) {
			next_obj = this._searchNextTabFocus(last_notify, undefined, undefined, 3)[0];
			if (next_obj.parent != fire_comp) {
				index++;
				tab_comp._accessibility_tabindex = index;
				next_obj = (button_len > index) ? tab_comp._tabButtons[index] : next_obj;
			}
		}
		else {
			next_obj = this._searchPrevTabFocus(last_notify, undefined, undefined, true)[0];
			if (next_obj == fire_comp) {
				next_obj = tab_comp._tabButtons[index];
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
			return true;
		}
		return false;
	};

	_pTabpage._setAccessibilityNotifyEvent = function (direction) {
		var next_obj = null;
		var index = this._index;
		var tab_comp = this.parent;
		var tabindex = tab_comp._getTabIndex();

		if (direction) {
			if (index != tabindex) {
				next_obj = tab_comp._tabButtons[index];
			}
			else {
				next_obj = this._getTabOrderFirst(true, false);
			}
		}
		else {
			if (index != tabindex) {
				next_obj = tab_comp._tabButtons[index];
			}
			else {
				next_obj = this._getTabOrderLast(true, false);
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
		}
	};

	delete _pTabpage;
}

if (!nexacro._TabButtonItemControl) {
	nexacro._TabButtonItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._sizeinfo = {
			width : 0, 
			height : 0
		};
		this._position = {
			left : 0, 
			top : 0, 
			width : 0, 
			height : 0
		};
	};
	var _pTabButtonItemControl = nexacro._createPrototype(nexacro.Component, nexacro._TabButtonItemControl);
	nexacro._TabButtonItemControl.prototype = _pTabButtonItemControl;

	_pTabButtonItemControl._type_name = "TabButtonItemControl";
	_pTabButtonItemControl._is_subcontrol = true;
	_pTabButtonItemControl._use_selected_status = true;
	_pTabButtonItemControl._extrabutton = null;
	_pTabButtonItemControl._tabindex = -1;
	_pTabButtonItemControl._tabpage = null;
	_pTabButtonItemControl._extrabutton_iconsize = null;
	_pTabButtonItemControl._line_index = 0;

	_pTabButtonItemControl.accessibilityrole = "tabitem";

	_pTabButtonItemControl.on_created_contents = function (win) {
		if (this._tabbuttonitemtext) {
			this._tabbuttonitemtext.on_created(win);
		}

		if (this._extrabutton) {
			this._extrabutton.on_created(win);
		}
	};

	_pTabButtonItemControl.on_create_contents_command = function (win) {
		var str = "";

		if (this._tabbuttonitemtext) {
			str += this._tabbuttonitemtext.createCommand();
		}

		if (this._extrabutton) {
			str += this._extrabutton.createCommand();
		}

		return str;
	};

	_pTabButtonItemControl.on_attach_contents_handle = function (win) {
		if (this._tabbuttonitemtext) {
			this._tabbuttonitemtext.attachHandle(win);
		}

		if (this._extrabutton) {
			this._extrabutton.attachHandle(win);
		}
	};

	_pTabButtonItemControl.on_destroy_contents = function () {
		if (this._tabbuttonitemtext) {
			this._tabbuttonitemtext.destroy();
			this._tabbuttonitemtext = null;
		}

		if (this._extrabutton) {
			this._extrabutton.destroy();
			this._extrabutton = null;
		}

		this._tabpage = null;
		this._extrabutton_iconsize = null;
	};

	_pTabButtonItemControl.on_apply_text = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			var tabbuttonitemtext = this._tabbuttonitemtext;
			var extrabutton_width = 0;

			if (this._extrabutton) {
				extrabutton_width = this._extrabutton._adjust_width;
			}

			var client_width = this._getClientWidth() - extrabutton_width;
			var client_height = this._getClientHeight();
			if (!v) {
				v = this._displaytext;
			}

			if (!tabbuttonitemtext) {
				tabbuttonitemtext = this._tabbuttonitemtext = new nexacro.Static("tabbuttonitemtext", 0, 0, client_width, client_height, null, null, null, null, null, null, this);
				tabbuttonitemtext._setControl();
				tabbuttonitemtext.set_text(v);
				tabbuttonitemtext.createComponent();
			}
			else {
				tabbuttonitemtext.set_text(v);
				tabbuttonitemtext.move(0, 0, client_width, client_height, null, null);

				if (!tabbuttonitemtext._is_created) {
					tabbuttonitemtext.on_created();
				}
			}
		}
	};

	_pTabButtonItemControl.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		return applystatus;
	};
	_pTabButtonItemControl.on_changeUserStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		return applystatus;
	};
	_pTabButtonItemControl.on_apply_status = function (status, userstatus) {
	};
	_pTabButtonItemControl.on_change_containerRect = function (width, height) {
		var tabbuttonitemtext = this._tabbuttonitemtext;
		if (tabbuttonitemtext) {
			var extrabutton_width = 0;
			if (this._extrabutton) {
				extrabutton_width = this._extrabutton._getClientWidth();
			}

			var client_width = this._getClientWidth() - extrabutton_width;
			var client_height = this._getClientHeight();

			tabbuttonitemtext.move(0, 0, client_width, client_height, null, null);
		}
	};

	_pTabButtonItemControl.on_apply_prop_enable = function (v) {
		var extrabutton = this._extrabutton;
		if (extrabutton) {
			extrabutton._setEnable(v);
		}
		var tabbuttonitemtext = this._tabbuttonitemtext;
		if (tabbuttonitemtext) {
			tabbuttonitemtext._setEnable(v);
		}
	};


	_pTabButtonItemControl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key) {
		this.parent._tabbutton_obj = this;
		var ret = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key);

		return ret;
	};

	_pTabButtonItemControl._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		if (this.parent.tabindex != this._tabindex) {
			return;
		}

		var win = this._getWindow();

		var last_modalframe = win._getLastModalFrame();
		if (last_modalframe && !last_modalframe._contains(this)) {
			var form = this._getParentForm();
			if (form) {
				form._setLastFocus(this);
			}
		}
		else {
			if (!this.parent._is_changed_focus) {
				nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
				this._setTabFocusObj(this);
			}
		}

		this.parent._is_changed_focus = false;
	};

	_pTabButtonItemControl._setTabFocusObj = function (focusobj) {
		if (!this._is_alive) {
			return;
		}

		this.parent._setTabFocusObj(focusobj);
	};

	_pTabButtonItemControl._getTabFocusObj = function () {
		if (!this._is_alive) {
			return;
		}

		return this.parent._getTabFocusObj();
	};

	_pTabButtonItemControl.on_getIDCSSSelector = function () {
		return "tabbuttonitem";
	};

	_pTabButtonItemControl._onload_extra_iconimage = function (imgurl, width, height) {
		if (!this._extrabutton_iconsize) {
			this._extrabutton_iconsize = {
				imageurl : imgurl, 
				width : width, 
				height : height
			};
		}
		else {
			var extrabutton_iconsize = this._extrabutton_iconsize;
			if (extrabutton_iconsize.imageurl != imgurl || extrabutton_iconsize.width != width || extrabutton_iconsize.height != height) {
				this._extrabutton_iconsize = {
					imageurl : imgurl, 
					width : width, 
					height : height
				};
			}
			else {
				return;
			}
		}
		this.parent._on_get_extrabutton_iconsize(width, height);
	};

	_pTabButtonItemControl._showExtraButton = function (v, button_width, button_height) {
		v = nexacro._toBoolean(v);

		if (v) {
			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			var width = button_width || client_height;
			var height = button_height || client_height;

			var extrabutton_l = client_width - width;
			var extrabutton_t = (client_height - height) / 2;
			var extrabutton_w = width;
			var extrabutton_h = height;




			if (!this._extrabutton) {
				this._extrabutton = new nexacro._TabExtraButtonControl("extrabutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
				this._extrabutton.createComponent();
			}
			else {
				if (!this._extrabutton.is_created) {
					this._extrabutton.on_created(this._getWindow());
				}
			}

			this._extrabutton.move(extrabutton_l, extrabutton_t, extrabutton_w, extrabutton_h);
		}
		else {
			if (this._extrabutton) {
				this._extrabutton.destroy();
				this._extrabutton = null;
			}
		}

		this.on_apply_text();
	};

	_pTabButtonItemControl._getItemSize = function () {
		var width = 0;
		var height = 0;

		var padding = this._getCSSStyleValue("padding");
		var border = this._getCSSStyleValue("border");

		var padding_l = 0, padding_r = 0, padding_t = 0, padding_b = 0;

		if (padding) {
			padding_l = padding.left || 0;
			padding_r = padding.right || 0;
			padding_t = padding.top || 0;
			padding_b = padding.bottom || 0;
		}

		var border_w = 0;
		var border_h = 0;
		if (border) {
			border_w = border._getBorderWidth() || 0;
			border_h = border._getBorderHeight() || 0;
		}

		width = padding_l + padding_r + border_w;
		height = padding_t + padding_b + border_h;

		var textsize = this._getItemTextSize();
		if (textsize) {
			width += textsize[0];
			height += textsize[1];
		}

		return [width, height];
	};
	_pTabButtonItemControl._getItemTextSize = function () {
		var ret = [0, 0];
		if (!this._tabbuttonitemtext) {
			return ret;
		}

		var tabbuttonitemtext = this._tabbuttonitemtext;
		var padding = tabbuttonitemtext._getCSSStyleValue("padding");
		var border = tabbuttonitemtext._getCSSStyleValue("border");
		var padding_l = 0, padding_r = 0, padding_t = 0, padding_b = 0;

		if (padding) {
			padding_l = padding.left || 0;
			padding_r = padding.right || 0;
			padding_t = padding.top || 0;
			padding_b = padding.bottom || 0;
		}

		var border_w = 0;
		var border_h = 0;
		if (border) {
			border_w = border._getBorderWidth() || 0;
			border_h = border._getBorderHeight() || 0;
		}

		ret[0] += padding_l + padding_r + border_w;
		ret[1] += padding_t + padding_b + border_h;

		var strText = this._displaytext;

		var font = tabbuttonitemtext._getCurrentStyleInheritValue("font");
		var wordspace = tabbuttonitemtext._getCurrentStyleInheritValue("wordSpacing");
		var letterspace = tabbuttonitemtext._getCurrentStyleInheritValue("letterSpacing");

		if (font) {
			var idx, multi = false;
			if (strText) {
				idx = strText.search("\n");
			}
			multi = (idx == -1) ? false : true;

			var size = nexacro._getTextSize(strText, font, multi, null, "none", wordspace, letterspace);

			ret[0] += (Math.ceil(size[0]) | 0);
			ret[1] += (Math.ceil(size[1]) | 0);
		}

		return ret;
	};

	_pTabButtonItemControl._getExtraButtonSize = function (bshowextrabutton) {
		if (!this._extrabutton) {
			this._extrabutton = new nexacro._TabExtraButtonControl("extrabutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this._extrabutton.createComponent();
		}

		var ret = {
			width : 0, 
			height : 0
		};
		var padding = this._extrabutton._getCSSStyleValue("padding");
		var border = this._extrabutton._getCSSStyleValue("border");
		var padding_l = 0, padding_r = 0, padding_t = 0, padding_b = 0;

		if (padding) {
			padding_l = padding.left || 0;
			padding_r = padding.right || 0;
			padding_t = padding.top || 0;
			padding_b = padding.bottom || 0;
		}

		var border_w = 0;
		var border_h = 0;
		if (border) {
			border_w = border._getBorderWidth() || 0;
			border_h = border._getBorderHeight() || 0;
		}

		ret.width += padding_l + padding_r + border_w;
		ret.height += padding_t + padding_b + border_h;

		var extrabutton_iconsize = this._getExtraButtonIconSize();
		if (extrabutton_iconsize) {
			ret.width += extrabutton_iconsize.width;
			ret.height += extrabutton_iconsize.height;
		}

		if (!bshowextrabutton) {
			this._extrabutton.destroy();
			this._extrabutton = null;
		}

		return ret;
	};


	_pTabButtonItemControl._getExtraButtonIconSize = function () {
		var icon = this._extrabutton._getCSSStyleValue("icon");
		if (icon instanceof Object) {
			icon = icon.value;
		}

		if (icon) {
			var extrabutton_iconsize = this._extrabutton_iconsize;
			if (extrabutton_iconsize) {
				var iconurl = icon;
				if (iconurl.substring(0, 4).toLowerCase() == "url(") {
					iconurl = iconurl.substring(5, iconurl.length - 2);
				}
				iconurl = nexacro._getImageLocation(iconurl, this._getRefFormBaseUrl());
				if (extrabutton_iconsize.imageurl == iconurl) {
					return {
						width : extrabutton_iconsize.width, 
						height : extrabutton_iconsize.height
					};
				}
			}

			var imagesize = nexacro._getImageSize(icon, this._onload_extra_iconimage, this);
			if (imagesize) {
				return {
					width : imagesize.width, 
					height : imagesize.height
				};
			}
		}

		return null;
	};

	delete _pTabButtonItemControl;
}

if (!nexacro._TabExtraButtonControl) {
	nexacro._TabExtraButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};
	var _pTabExtraButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._TabExtraButtonControl);
	nexacro._TabExtraButtonControl.prototype = _pTabExtraButtonControl;

	_pTabExtraButtonControl._type_name = "TabExtraButtonControl";
	_pTabExtraButtonControl._is_subcontrol = true;



	_pTabExtraButtonControl.on_getIDCSSSelector = function () {
		return "extrabutton";
	};

	delete _pTabExtraButton;
}
