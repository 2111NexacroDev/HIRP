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

if (!nexacro.StepControl) {
	nexacro.StepChangeEventInfo = function (obj, id, preindex, postindex) {
		this.id = this.eventid = id || "onstepchanged";
		this.fromobject = obj._form || obj;
		this.fromreferenceobject = obj;

		this.preindex = preindex;
		this.postindex = postindex;
	};

	var _pEventStepChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepChangeEventInfo);
	nexacro.StepChangeEventInfo.prototype = _pEventStepChangeEventInfo;
	_pEventStepChangeEventInfo._type_name = "StepChangeEventInfo";

	delete _pEventStepChangeEventInfo;

	nexacro.StepMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		nexacro.ClickEventInfo.call(this, obj, id || "onstepmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);

		this.index = index < 0 ? -1 : index;
	};

	var _pEventStepMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepMouseEventInfo);
	nexacro.StepMouseEventInfo.prototype = _pEventStepMouseEventInfo;
	_pEventStepMouseEventInfo._type_name = "StepMouseEventInfo";

	delete _pEventStepMouseEventInfo;

	nexacro.StepDragEventInfo = function (obj, id, index, dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key) {
		nexacro.DragEventInfo.call(this, obj, id || "onstepdrag", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);
		this.index = index ? -1 : index;
	};

	var _pEventStepDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.StepDragEventInfo);
	nexacro.StepDragEventInfo.prototype = _pEventStepDragEventInfo;
	_pEventStepDragEventInfo._type_name = "StepDragEventInfo";

	delete _pEventStepDragEventInfo;

	nexacro.StepControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._items = [];
		this._icon_info = 
			{
			width : 0, 
			height : 0, 
			isloaded : false
		};
		this._form = parent;
	};

	var _pStepControl = nexacro._createPrototype(nexacro.Component, nexacro.StepControl);
	nexacro.StepControl.prototype = _pStepControl;
	_pStepControl._type_name = "StepControl";


	_pStepControl.stepcount = 0;
	_pStepControl.stepindex = 0;
	_pStepControl.stepitemsize = undefined;
	_pStepControl.stepitemgap = undefined;


	_pStepControl._itemid = "stepitem";

	_pStepControl._prestepindex = null;
	_pStepControl._poststepindex = null;
	_pStepControl._prestepcount = null;
	_pStepControl._poststepcount = null;

	_pStepControl._stepiconsize = undefined;


	_pStepControl._is_nc_control = true;
	_pStepControl._is_subcontrol = true;
	_pStepControl.accessibilityrole = "step";


	_pStepControl._event_list = 
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
		"ondragend" : 1, 
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
		"canstepchange" : 1, 
		"onstepchanged" : 1
	};

	_pStepControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var items = this._items;
			var stepButton;
			var stepcount = this.stepcount;
			for (var i = 0; i < stepcount; i++) {
				stepButton = items[i] = new nexacro.StepImageButtonControl(this._itemid + i, 0, 0, 0, 0, null, null, null, null, null, null, this);
				stepButton._is_focus_accept = false;
				stepButton._setEventHandler("onclick", this._on_button_onclick, this);
				stepButton.createComponent();
			}
		}
	};

	_pStepControl.on_created_contents = function () {
		var stepbutton = this._items.length ? this._items[0] : null;
		var img = stepbutton ? stepbutton._getCSSStyleValue("icon") : null;
		if (img) {
			var info = this._icon_info;
			var size = nexacro._getImageSize(img.url, this._on_icon_onload, this);
			if (size) {
				info.width = size.width;
				info.height = size.height;
				info.isloaded = true;

				this._setStepIconSize(size.width, size.height);
			}
		}

		this._redrawStepButton();
		this._updateStepLayout();
	};

	_pStepControl.on_destroy_contents = function () {
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].destroy();
			items[i] = null;
		}
		this._items = [];
	};

	_pStepControl.on_create_contents_command = nexacro._emptyFn;

	_pStepControl.on_attach_contents_handle = nexacro._emptyFn;

	_pStepControl.on_change_containerRect = function () {
		if (this._is_created) {
			this._redrawStepButton();
		}
	};

	_pStepControl.on_change_containerPos = nexacro._emptyFn;

	_pStepControl._on_getAccessibilityAdditionalLabel = function () {
		return this.stepindex + " " + this.stepcount;
	};


	_pStepControl.set_stepitemsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.stepitemsize != v) {
			this.stepitemsize = v;
			this.on_apply_stepitemsize();
		}
	};

	_pStepControl.on_apply_stepitemsize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._redrawStepButton();
			this._updateStepLayout();
		}
	};

	_pStepControl.set_stepitemgap = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.stepitemgap != v) {
			this.stepitemgap = v;
			this.on_apply_stepitemgap();
		}
	};

	_pStepControl.on_apply_stepitemgap = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._redrawStepButton();
			this._updateStepLayout();
		}
	};

	_pStepControl.set_stepcount = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		this._prestepindex = this.stepindex;
		this._prestepcount = this.stepcount;

		this._poststepcount = v;

		if (this.stepcount != v) {
			this.stepcount = v;

			if (this.stepindex >= v) {
				this.stepindex = v - 1;
			}

			this.on_apply_stepcount(v);
		}
	};

	_pStepControl.on_apply_stepcount = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._redrawStepButton();
			this._updateStepLayout();
		}
	};

	_pStepControl.set_stepindex = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		if (this.stepindex != v) {
			var check_count = this.stepcount <= v || v < 0;
			if (!check_count) {
				this._prestepindex = this.stepindex;
				this._poststepindex = v;

				var ret = this.on_fire_canstepchange(this);
				if (ret) {
					var form = this._form;
					if (form) {
						ret = form.on_fire_canstepchange(this);
						if (ret) {
							this.stepindex = v;
							this.on_apply_stepindex(v);

							this.on_fire_onstepchanged(this);
							form.on_fire_onstepchanged(this);

							return true;
						}
						else {
							var _form = this._form;
							if (_form) {
								_form._createStepChangeAnimation(this._prestepindex, 600);
							}
							var cur_button = this._items[v];
							if (cur_button) {
								cur_button._changeStatus("focused", false);
							}
						}
					}
				}
			}
		}

		return false;
	};

	_pStepControl.on_apply_stepindex = function (stepindex) {
		var control_elem = this.getElement();
		if (control_elem) {
			var pre_idx = this._prestepindex;
			if (pre_idx != stepindex) {
				var pre_button = this._items[pre_idx];
				if (pre_button) {
					pre_button._changeUserStatus("selected", false);
				}
				else {
					for (var i = 0; i < this._items.length; i++) {
						if (this._items[i]._userstatus == "selected") {
							this._items[i]._changeUserStatus("selected", false);
						}
					}
				}

				var cur_button = this._items[stepindex];
				if (cur_button) {
					cur_button._changeUserStatus("selected", true);
				}

				var form = this._form;
				if (form) {
					var form_control_elem = form.getElement();
					if (form_control_elem) {
						form_control_elem.setElementStepIndex(stepindex);
						form._setHscrollPos(form_control_elem.client_width *  stepindex);

						var comp;
						var comps = form.components;
						var comp_len = comps.length;
						for (var i = 0; i < comp_len; i++) {
							comp = comps[i];

							comp.on_apply_positionstep();
							comp._update_position();
						}
					}

					var layoutmanager = nexacro._getLayoutManager();
					if (layoutmanager) {
						layoutmanager.setStepIndex(form, stepindex);
					}
				}
			}
		}
	};

	_pStepControl.getStepCount = function () {
		return this.stepcount;
	};

	_pStepControl.stepIt = function (forward, rotate) {
		var stepindex = this.stepindex;
		var max_step = this.stepcount;
		if (forward == undefined) {
			forward = true;
		}
		else {
			forward = nexacro._toBoolean(forward);
		}

		rotate = nexacro._toBoolean(rotate);
		if (forward) {
			stepindex++;
			if (stepindex >= max_step) {
				stepindex = max_step - 1;
				if (rotate) {
					stepindex = 0;
				}
			}
		}
		else {
			stepindex--;
			if (stepindex < 0) {
				stepindex = 0;
				if (rotate) {
					stepindex = max_step - 1;
				}
			}
		}

		return this.set_stepindex(stepindex);
	};

	_pStepControl._on_icon_onload = function (url, width, height) {
		var info = this._icon_info;
		if (!info.isloaded) {
			info.width = width;
			info.height = height;
			info.isloaded = true;

			this._setStepIconSize(width, height);

			this._redrawStepButton();
			this._updateStepLayout();
		}
	};

	_pStepControl._on_button_onclick = function (obj) {
		var itemid = nexacro._toString(obj.id);
		var itemindex = itemid.slice(this._itemid.length);

		this.set_stepindex(itemindex);
	};

	_pStepControl.on_fire_canstepchange = function (obj) {
		if (this.canstepchange && this.canstepchange._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "canstepchange", obj._prestepindex, obj._poststepindex);
			return this.canstepchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pStepControl.on_fire_onstepchanged = function (obj) {
		if (this.onstepchanged && this.onstepchanged._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "onstepchanged", obj._prestepindex, obj._poststepindex);
			return this.onstepchanged._fireEvent(this, evt);
		}
	};

	_pStepControl._redrawStepButton = function () {
		var stepcount = this.stepcount;
		if (stepcount > 0) {
			var items = this._items;
			var items_len = items.length;

			var stepindex = this.stepindex;
			var stepitemsize = this._getStepItemSize();
			var stepitemgap = this._getStepItemGap();

			var btn_l = 0;
			var stepbutton, removed_item;
			for (var i = 0; i < stepcount; i++) {
				stepbutton = items[i];
				if (!stepbutton) {
					stepbutton = items[i] = new nexacro.StepImageButtonControl("stepitem" + i, btn_l, 0, stepitemsize, stepitemsize, null, null, null, null, null, null, this);
					stepbutton._is_focus_accept = false;
					stepbutton._setEventHandler("onclick", this._on_button_onclick, this);
					stepbutton.createComponent();
				}
				else {
					stepbutton.move(btn_l, 0, stepitemsize, stepitemsize);
				}

				if (!stepbutton._is_created) {
					stepbutton.on_created();
				}

				stepbutton.on_apply_icon();
				stepbutton.on_apply_iconPosition();

				btn_l = btn_l + stepitemsize + stepitemgap;

				if (stepindex == i) {
					stepbutton._changeUserStatus("selected", true);
				}
			}

			if (items_len > stepcount) {
				while (items.length != stepcount) {
					removed_item = items.pop();
					removed_item.destroy();
				}
			}
		}
	};

	_pStepControl._updateStepLayout = function () {
		var form = this._form;
		if (form) {
			form._recalcStepLayout();
		}
	};

	_pStepControl._setStepIconSize = function (width, height) {
		var items = this._items;
		if (items.length) {
			var item = items[0];
			var total_w = 0;
			var total_h = 0;

			var border = item._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = item._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			this._stepiconsize = Math.max(width + total_w, height + total_h);
		}
	};

	_pStepControl._getStepItemSize = function () {
		var stepitemsize = this.stepitemsize;
		var stepiconsize = this._stepiconsize;
		if (nexacro._isNull(stepitemsize) && !nexacro._isNull(stepiconsize)) {
			return stepiconsize;
		}

		var maxsize = 0;
		var items = this._items;
		if (items.length && stepitemsize != 0) {
			var item = items[0];
			var total_w = 0;
			var total_h = 0;

			var border = item._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = item._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var info = this._icon_info;
			if (!nexacro._isNull(stepitemsize)) {
				maxsize = stepitemsize + Math.max(total_w, total_h);
			}
			else {
				maxsize = Math.max(info.width + total_w, info.height + total_h);
			}
		}

		return maxsize;
	};

	_pStepControl._getStepItemGap = function () {
		return this.stepitemgap ? this.stepitemgap : 3;
	};

	_pStepControl._getItemAreaSize = function () {
		var total_w = 0;
		var total_h = 0;

		var padding = this._getCurrentStylePadding();
		if (padding) {
			total_w += padding.left + padding.right;
			total_h += padding.top + padding.bottom;
		}

		var border = this._getCurrentStyleBorder();
		if (border) {
			total_w += border._getBorderWidth();
			total_h += border._getBorderHeight();
		}

		var stepcount = this.stepcount;
		var stepitemsize = this._getStepItemSize();
		var stepitemgap = this._getStepItemGap();

		total_w += stepitemsize *  stepcount + stepitemgap *  (stepcount - 1);
		total_h += stepitemsize;

		return {
			width : total_w, 
			height : total_h
		};
	};

	delete _pStepControl;
}
