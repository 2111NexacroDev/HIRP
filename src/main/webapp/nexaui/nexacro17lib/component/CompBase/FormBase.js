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

if (!nexacro.Form) {
	nexacro.LayoutChangeEventInfo = function (obj, id, curlayout_name, newlayout_name, cur_width, new_width, cur_height, new_height) {
		this.id = this.eventid = id || "onlayoutchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.bubbles = true;

		this.oldlayout = curlayout_name;
		this.newlayout = newlayout_name;
		this.oldlayoutwidth = cur_width;
		this.newlayoutwidth = new_width;
		this.oldlayoutheight = cur_height;
		this.newlayoutheight = new_height;
	};

	var _pLayoutChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.LayoutChangeEventInfo);
	nexacro.LayoutChangeEventInfo.prototype = _pLayoutChangeEventInfo;

	_pLayoutChangeEventInfo._type_name = "LayoutChangeEventInfo";

	delete _pLayoutChangeEventInfo;


	nexacro.DeviceButtonEventInfo = function (obj, id, button, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "ondevicebuttonup";
		this.fromobject = from_comp || obj;
		this.fromreferenceobject = from_refer_comp || obj;
		this.button = button;
		this._prevented = false;
		this.cancelable = true;
		this.bubbles = true;
	};
	var _pDeviceButtonEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DeviceButtonEventInfo);
	nexacro.DeviceButtonEventInfo.prototype = _pDeviceButtonEventInfo;

	_pDeviceButtonEventInfo._type_name = "DeviceButtonEventInfo";

	delete _pDeviceButtonEventInfo;

	nexacro.TriggerManager = function (form) {
		nexacro.Object.call(this);


		this._form = form;
		this._triggers = {
			"len" : 0
		};
		this._inittriggers = [];
	};

	var _pTriggerManager = nexacro.TriggerManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro.TriggerManager);
	_pTriggerManager._type_name = "TriggerManager";

	_pTriggerManager.destroy = function () {
		this._form = null;
		this._triggers = null;
		this._inittriggers = null;

		nexacro.Object.prototype.destroy.call(this);
	};

	_pTriggerManager._settriggerinfo = function (contents) {
		if (!contents) {
			return;
		}

		var len = contents.length;
		var triggerobj;

		for (var i = 0; i < len; i++) {
			triggerobj = contents[i].triggerobj;

			if (nexacro._isArray(this._triggers[triggerobj])) {
				this._triggers[triggerobj].push(contents[i]);
			}
			else {
				this._triggers[triggerobj] = [contents[i]];
			}
		}
		this._triggers.len = len;
		this._inittriggers = contents;
	};

	_pTriggerManager.inittriggerinfo = function () {
		var triggers = this._inittriggers;
		if (!triggers || triggers.len <= 0) {
			return;
		}

		var parent = this._form;
		if (!parent) {
			return;
		}

		var triggertype;
		var triggerobj;
		var triggerview;

		for (var i = 0; i < triggers.length; i++) {
			triggertype = nexacro._trigger_type_table[triggers[i].triggertype];
			if (triggertype) {
				if (triggertype == "onmodelloadsuccess" || triggertype == "onmodelloadfail") {
					triggerview = this._getTriggerView(triggers[i].triggerview);
					triggerview._ismodeltrigger = true;
				}
				else {
					triggerview = this._getTriggerView(triggers[i].triggerview);
					if (triggerview && triggertype == "onload") {
						triggerobj = triggerview;
					}
					else {
						triggerobj = this._getTriggerObj(triggerview, triggers[i].triggerobj);
					}

					if (triggerview && triggerobj) {
						if (triggerview.on_notifytrigger && triggerobj._findEventHandler(triggertype, triggerview.on_notifytrigger, triggerview)) {
							triggerobj._addEventHandler(triggertype, triggerview.on_notifytrigger, triggerview);
						}
					}
				}
			}
		}
	};

	_pTriggerManager._getTriggerView = function (obj) {
		var form = this._form;
		if (!form) {
			return;
		}

		var triggerview = obj;
		var targetview = null;
		var ret = null;

		targetview = form[triggerview];

		if (!targetview) {
			targetview = form;
		}

		if (targetview._is_view || targetview._is_form) {
			ret = targetview;
		}

		return ret;
	};

	_pTriggerManager._getTriggerObj = function (obj, triggerobj) {
		var form = this._form;
		if (!form) {
			return;
		}

		var triggerview = obj;
		var targetobj = null;

		if (!triggerview || !triggerobj) {
			return;
		}

		if (triggerview._is_view) {
			targetobj = triggerview.form[triggerobj];
		}
		else if (triggerview._is_form) {
			targetobj = triggerview[triggerobj];
		}

		if (targetobj === undefined) {
			if (triggerview.name == triggerobj) {
				targetobj = triggerview;
			}
		}

		return targetobj;
	};

	_pTriggerManager._findTrigger = function (triggertype, triggerobj, triggerview) {
		var triggers = this._triggers;
		var targetobj = triggers[triggerobj];
		var targettrigger = [];

		if (!targetobj) {
			return;
		}
		for (var i = 0; i < targetobj.length; i++) {
			if (targetobj[i].targetaction) {
				if (triggertype == targetobj[i].triggertype && triggerview == targetobj[i].triggerview) {
					targettrigger.push(targetobj[i]);
				}
			}
		}

		return targettrigger;
	};

	_pTriggerManager._getAction = function (straction) {
		var form = this._form;
		if (!straction || !form) {
			return undefined;
		}

		straction = straction.toString();
		var ret = form[straction];

		if (ret && ret instanceof nexacro.Action) {
			return ret;
		}

		return undefined;
	};

	_pTriggerManager._notifyTrigger = function (triggertype, triggerobj, triggerview) {
		if (!triggertype || !triggerobj || !triggerview) {
			return;
		}

		var targettrigger = this._findTrigger(triggertype, triggerobj.name, triggerview.name);
		if (!targettrigger || targettrigger.length <= 0) {
			return;
		}

		var len = targettrigger.length;
		var ret = true;

		for (var i = 0; i < len; i++) {
			if (targettrigger[i].condition) {
				var condition = targettrigger[i].condition;
				var exprfn = this._createExprFunc(condition, triggerview._viewdataset);

				ret = exprfn.call(this._form, triggerview, triggerobj, this._form);
			}

			if (ret) {
				var action = this._getAction(targettrigger[i].targetaction);
				if (action) {
					action.run();
				}
			}
			else {
				ret = true;
			}
		}
	};

	_pTriggerManager._createExprFunc = function (expr_str, ds) {
		if (expr_str == null) {
			return nexacro._NullFn;
		}

		var parser = new nexacro.ExprParser();
		var conv_expr = expr_str;
		if (ds) {
			conv_expr = parser.makeExpr(ds, expr_str);
		}

		var exprfn = nexacro._createInlineFunc(conv_expr, ["triggerview", "triggerobj", "form"]);
		return exprfn;
	};

	delete _pTriggerManager;

	nexacro.BindingValueChangedEventInfo = function (obj, id, row, col, colidx, columnid, oldvalue, newvalue) {
		this.id = this.eventid = id || "onbindingvaluechanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.row = row;
		this.col = col;
		this.colidx = colidx;
		this.columnid = columnid;
		this.oldvalue = oldvalue;
		this.newvalue = newvalue;
	};
	var _pBindingValueChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.BindingValueChangedEventInfo);
	nexacro.BindingValueChangedEventInfo.prototype = _pBindingValueChangedEventInfo;
	_pBindingValueChangedEventInfo._type_name = "BindingValueChangedEventInfo";

	delete _pBindingValueChangedEventInfo;

	nexacro.BindItem = function (name, compid, propid, dsid, columnid) {
		nexacro.Object.call(this);
		this.name = name || "";
		this.compid = compid || "";
		this.propid = propid || "";
		this.datasetid = dsid || "";
		this.columnid = columnid || "";


		this._en_type = 1;
		this._dataset = null;
		this._comp = null;
	};

	var _pBindItem = nexacro.BindItem.prototype = nexacro._createPrototype(nexacro.Object, nexacro.BindItem);
	_pBindItem._type_name = "BindItem";


	_pBindItem.set_compid = function (v) {
		if (v && this.compid != v) {
			this.compid = v;
		}
	};

	_pBindItem.set_propid = function (v) {
		if (v && this.propid != v) {
			this.propid = v;
		}
	};

	_pBindItem.set_datasetid = function (v) {
		if (v && this.datasetid != v) {
			this.datasetid = v;
		}
	};

	_pBindItem.set_columnid = function (v) {
		if (v && this.columnid != v) {
			this.columnid = v;
		}
	};

	_pBindItem.init = function (name, compid, propid, datasetid, columnid) {
		this.set_name(name);
		this.set_compid(compid);
		this.set_propid(propid);
		this.set_datasetid(datasetid);
		this.set_columnid(columnid);
	};

	_pBindItem.destroy = function () {
		this._dataset = null;
		this._comp = null;

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pBindItem.bind = function () {
		if (this.parent && !this.parent._is_loading) {
			if (this.compid == "" || this.propid == "" || this.datasetid == "" || this.columnid == "") {
				return;
			}
			this.parent._bind_manager._setBinditem(this, false);
			this.parent._bind_manager._notify(this);
		}
	};

	_pBindItem._checkType = function (propid) {
		var bindprops = propid;
		if (bindprops && typeof (bindprops) == "object") {
			propid = bindprops[0];
		}

		if (typeof propid == "string" && propid == this.propid) {
			this._en_type = 2;
		}
	};
	delete _pBindItem;

	nexacro.BindManager = function (form) {
		nexacro.Object.call(this);
		this.datasets = {
		};
		this.exception = "";


		this._form = form;
	};

	var _pBindManager = nexacro.BindManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro.BindManager);

	_pBindManager._type_name = "BindManager";


	_pBindManager.destroy = function () {
		this.datasets = null;
		this._form = null;

		nexacro.Object.prototype.destroy.call(this);
	};


	_pBindManager.on_changevalue = function (obj, e) {
		var prop_id = e.propid;
		var bind_item = this._findBindItem(obj, prop_id);
		var val = e.val;
		if (bind_item && bind_item._en_type == 2) {
			this.exception = obj;

			var ds = bind_item._dataset;
			var row_idx = ds.rowposition;
			var col = ds.getColIndex(bind_item.columnid);
			if (col !== undefined) {
				var ret = ds.setColumn(row_idx, col, val);
				if (ret == true) {
					this.exception = null;
					return true;
				}
				else {
					this.exception = null;
					return false;
				}
			}
		}
		this.exception = null;
		return true;
	};

	_pBindManager.on_binddestroy = function (obj, e) {
		if (e.reason == 91) {
			if (obj.parent != this._form) {
				if (this._form) {
					var _form = this._form;
					var binds = _form.binds;
					var len = binds.length;

					for (var i = 0; i < len; i++) {
						var bindname = binds.get_id(i);
						_form._bind_manager._setBinditem(binds.get_item(bindname), true);
						_form[bindname] = null;
					}
				}
			}
		}
	};

	_pBindManager.on_valuechanged = function (obj, e) {
		var ds = obj;
		var row = e.row;
		var col = e.col;
		var col_id = e.columnid;
		var val = e.newvalue;
		if (ds.rowposition == row || row < 0) {
			var ret = false;
			if (col < 0) {
				ret = this._notifyAll(ds.name, null, -1, true, null);
			}
			else {
				ret = this._notifyAll(ds.name, col_id, col, false, val);
			}
			var form = this._form;
			if (form) {
				form.on_notify_onbindingvaluechanged(obj, e);
			}
			return ret;
		}
		return true;
	};


	_pBindManager._delayBinds = function () {
		var len = this._form.binds.length;
		for (var sx = 0; sx < len; sx++) {
			var bind_item = this._form.binds[sx];
			if (bind_item._dataset) {
				continue;
			}

			this._setBinditem(bind_item, false);
			this._notify(bind_item);
		}
	};

	_pBindManager._setBinditem = function (bind_item, close_flag) {
		if (!bind_item) {
			return;
		}

		var ds_id = bind_item.datasetid;

		var ds = bind_item._dataset;
		var comp = bind_item._comp;
		if (!bind_item._dataset) {
			var view = this._form.parent;
			var form = this._form;
			if (view && view.getSourceView && view.getSourceView()) {
				var sourceview = view.getSourceView();
				form = sourceview.form;
				ds_id = sourceview.viewdataset;
				ds = form._getDatasetObject(ds_id);
			}
			else {
				ds = form._getDatasetObject(bind_item.datasetid);
			}
		}

		if (!bind_item._comp) {
			if (this._form._findChildObject) {
				comp = this._form._findChildObject(bind_item.compid);
			}
		}

		if (!ds || !comp) {
			return;
		}

		if (!close_flag) {
			bind_item._dataset = ds;
			bind_item._comp = comp;
			bind_item._checkType(comp.on_getBindableProperties());

			if (this.datasets[ds_id]) {
				this.datasets[ds_id].push(bind_item);
			}
			else {
				this.datasets[ds_id] = [];
				this.datasets[ds_id].push(bind_item);
				ds.setEventHandler("onvaluechanged", this.on_valuechanged, this);
				ds._addEventHandler("onload", this.on_binddestroy, this);
			}

			if (!comp._bind_event) {
				comp._bind_event = new nexacro.EventListener("onbinditem");
				comp._bind_event._setHandler(this, this.on_changevalue);
			}
		}
		else {
			if (this.datasets[ds_id]) {
				var cidx = nexacro._indexOf(this.datasets[ds_id], bind_item);
				if (cidx > -1) {
					this.datasets[ds_id].splice(cidx, 1);
					if (this.datasets[ds_id].length == 0) {
						ds.removeEventHandler("onvaluechanged", this.on_valuechanged, this);
						delete this.datasets[ds_id];
					}
				}
			}
			if (comp._bind_event) {
				comp._bind_event._removeHandler(this, this.on_changevalue);
				delete comp._bind_event;
			}
		}
	};

	_pBindManager._findBindItem = function (comp, propid) {
		for (var sx = 0; sx < this._form.binds.length; sx++) {
			var bind_item = this._form.binds[sx];
			if (bind_item._comp == comp && bind_item.propid == propid && bind_item.datasetid && bind_item.columnid) {
				return bind_item;
			}
		}
		return null;
	};

	_pBindManager._dettachSBindItem = function (comp) {
		if (!comp._bind_event) {
			return;
		}

		comp._bind_event._removeHandler(this);
		var binds = this._form.binds;
		var cnt = binds.length;
		for (var i = 0; i < cnt; i++) {
			if (binds[i]._comp == comp) {
				var datasetid = binds[i].datasetid;
				if (this.datasets[datasetid]) {
					var cidx = nexacro._indexOf(this.datasets[datasetid], binds[i]);
					if (cidx > -1) {
						this.datasets[datasetid][cidx].destroy();
						this.datasets[datasetid].splice(cidx, 1);
					}
					binds[i]._comp = null;
				}
			}
		}
	};


	_pBindManager._notify = function (bindItem) {
		var ds = bindItem._dataset;
		var comp = bindItem._comp;
		var col;
		if (ds && comp) {
			var row_idx = ds.rowposition;

			if (bindItem._en_type == 2) {
				if (comp.enable && comp.parent._isEnable()) {
					if (row_idx < 0) {
						comp._setEnable(false);
					}
					else {
						comp._setEnable(true);
					}
				}
				col = ds.getColIndex(bindItem.columnid);
				if (col >= 0 && comp.on_change_bindSource) {
					comp.on_change_bindSource(bindItem.propid, bindItem._dataset, row_idx, col);
				}
			}
			else {
				if (bindItem.columnid && bindItem.columnid != "") {
					col = ds.getColIndex(bindItem.columnid);
					var val = ds.getColumn(row_idx, col);
					if (bindItem.propid) {
						if (comp["set_" + bindItem.propid]) {
							comp["set_" + bindItem.propid](val);
						}
					}
				}
			}
		}
	};

	_pBindManager._notifyAll = function (ds_id, col_id, col, all_flag, val) {
		var arr_bind = this.datasets[ds_id];
		var bind_item = null;
		var row_idx = -1;

		if (!arr_bind) {
			return true;
		}

		for (var sx = 0; sx < arr_bind.length; sx++) {
			bind_item = arr_bind[sx];
			if (!bind_item._dataset) {
				continue;
			}

			if (bind_item.columnid == "") {
				continue;
			}

			var ds = bind_item._dataset;
			row_idx = ds.rowposition;
			var comp = bind_item._comp;

			if (comp && comp._is_alive) {
				if (bind_item._en_type == 2) {
					if (all_flag) {
						if (comp.enable && comp.parent._isEnable()) {
							if (row_idx < 0) {
								comp._setEnable(false);
							}
							else {
								comp._setEnable(true);
							}
						}

						col = ds.getColIndex(bind_item.columnid);

						if (col >= 0) {
							if (comp.on_change_bindSource) {
								comp.on_change_bindSource(bind_item.propid, bind_item._dataset, row_idx, col);
							}
						}
						else {
							if (comp.on_init_bindSource) {
								comp.on_init_bindSource(bind_item.columnid, bind_item.propid, bind_item._dataset);
							}
						}
					}
					else {
						if (col >= 0) {
							if (bind_item.columnid == col_id && comp.on_change_bindSource) {
								comp.on_change_bindSource(bind_item.propid, bind_item._dataset, row_idx, col);
							}
						}
						else {
							if (bind_item.columnid == col_id && comp.on_init_bindSource) {
								comp.on_init_bindSource(bind_item.columnid, bind_item.propid, bind_item._dataset);
							}
						}
					}
				}
				else {
					var val0;
					if (all_flag) {
						col = ds.getColIndex(bind_item.columnid);
						val0 = ds.getColumn(row_idx, col);
					}
					else {
						if (col_id == bind_item.columnid) {
							val0 = val;
						}
						else {
							continue;
						}
					}
					if (bind_item.propid) {
						if (comp["set_" + bind_item.propid]) {
							comp["set_" + bind_item.propid](val0);
						}
					}
				}
			}
		}
		return true;
	};

	delete _pBindManager;

	nexacro.FormBase = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._refform = this;

		this.all = new nexacro.Collection();
		this.components = new nexacro.Collection();
		this.objects = new nexacro.Collection();
		this.binds = new nexacro.Collection();

		this._bind_manager = new nexacro.BindManager(this);
		this._load_manager = new nexacro._LoadManager(this);
		this._timerManager = new nexacro._TimerManager(this);

		this._child_list = [];
		this._hotkey_list = [];
		this._layout_list = new nexacro.Collection();
		this._includescriptlist = [];
		this._load_callbacklist = [];
	};

	var _pFormBase = nexacro.FormBase.prototype = nexacro._createPrototype(nexacro.Component, nexacro.FormBase);
	_pFormBase._type_name = "FormBase";


	_pFormBase.stepselector = null;


	_pFormBase.scrollbars = "autoboth";
	_pFormBase.dragscrolltype = "all";


	_pFormBase._url = "";
	_pFormBase._orgurl = "";
	_pFormBase._base_url = "";
	_pFormBase._async = true;
	_pFormBase._asyncformload = true;

	_pFormBase._hittest_type = "";
	_pFormBase._last_focused = null;
	_pFormBase._obj_mousemove = null;
	_pFormBase._delayedfocuscomp = null;


	_pFormBase._is_form = true;
	_pFormBase._is_loaded = false;
	_pFormBase._is_completed = false;
	_pFormBase._is_scrollable = true;


	_pFormBase._default_layout = null;
	_pFormBase._current_layout_name = "default";
	_pFormBase._cur_real_layout = "default";

	_pFormBase._searchNextHeadingFocus = nexacro._emptyFn;
	_pFormBase._searchPrevHeadingFocus = nexacro._emptyFn;
	_pFormBase._getHeadingOrderNext = nexacro._emptyFn;
	_pFormBase._getHeadingOrderFirst = nexacro._emptyFn;
	_pFormBase._getHeadingOrderLast = nexacro._emptyFn;

	_pFormBase.on_create = nexacro._emptyFn;
	_pFormBase.createComponent = function (bCreateOnly) {
		if (this._is_loading) {
			return;
		}

		var parent_elem = null;
		if (!this._is_window) {
			parent_elem = this.parent._control_element;
			if (!parent_elem) {
				return false;
			}
		}
		var layout_list;
		var control_elem = this._control_element;
		var _window;
		if (!control_elem) {
			if (this._unique_id.length <= 0) {
				this._unique_id = this.parent._unique_id ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
			}
			control_elem = this.on_create_control_element(parent_elem);
			if (this._is_nc_control) {
				control_elem._is_nc_element = true;
			}


			this._initControl(control_elem);

			layout_list = this._layout_list;
			if (layout_list && layout_list.length >= 1 && !(layout_list.length == 1 && layout_list[0] == this._default_layout)) {
				this._initLayoutManager();
			}
			else {
				nexacro._getLayoutManager().loadLayout(this, null, this._default_layout, this._default_layout);
				this._current_layout_name = this._cur_real_layout = "default";
			}

			this._initContents(control_elem);

			if (!nexacro._isNull(this.tooltiptext)) {
				this.on_apply_prop_tooltip();
			}

			if (nexacro._enableaccessibility) {
				this.on_apply_accessibility();
			}

			this.on_apply_positionstep();

			if (this._hittest_type) {
				this.on_apply_hittesttype();
			}

			if (!bCreateOnly && (this._is_window || (parent_elem && parent_elem.handle))) {
				_window = this._getWindow();
				var ret = this.on_created(_window);

				if (ret) {
					this._on_activate();
				}
			}
		}
		else {
			var _oldscrollleft = control_elem.scroll_left;
			var _oldscrolltop = control_elem.scroll_top;

			if (parent_elem && parent_elem.handle) {
				parent_elem.appendChildElement(control_elem);
				control_elem.parent = this;

				this._initControl(control_elem);
				layout_list = this._layout_list;

				if (layout_list && layout_list.length >= 1 && !(layout_list.length == 1 && layout_list[0] == this._default_layout)) {
					this._initLayoutManager();
				}
				else if (!this._is_created) {
					nexacro._getLayoutManager().loadLayout(this, null, this._default_layout, this._default_layout);
					this._current_layout_name = this._cur_real_layout = "default";
				}
				this._initContents(control_elem);

				if (this._hittest_type) {
					this.on_apply_hittesttype();
				}


				if (!nexacro._isNull(this.tooltiptext)) {
					this.on_apply_prop_tooltip();
				}

				if (!bCreateOnly) {
					var window = this._getWindow();
					this.on_created(window);
				}
			}
			else {
				this._initControl(control_elem);
				layout_list = this._layout_list;
				if (layout_list && layout_list.length >= 1 && !(layout_list.length == 1 && layout_list[0] == this._default_layout)) {
					this._initLayoutManager();
				}
				else {
					nexacro._getLayoutManager().loadLayout(this, null, this._default_layout, this._default_layout);
					this._current_layout_name = this._cur_real_layout = "default";
				}

				this._initContents(control_elem);
				if (this._hittest_type) {
					this.on_apply_hittesttype();
				}

				if (!nexacro._isNull(this.tooltiptext)) {
					this.on_apply_prop_tooltip();
				}
			}
			if (this._delayedfocuscomp) {
				if (this._is_scrollable && this.parent && this.parent._is_frame && this.parent._window_type == 5) {
					if (this._getWindow()) {
						if (_oldscrollleft != undefined && _oldscrollleft != control_elem.scroll_left) {
							control_elem.scroll_left = _oldscrollleft;
						}

						if (_oldscrolltop != undefined && _oldscrolltop != control_elem.scroll_top) {
							control_elem.scroll_top = _oldscrolltop;
						}

						this._onResetScrollBar();
					}
				}
			}
		}
		if (this._delayedfocuscomp) {
			_window = this._getWindow();
			if (this.parent
				 && this.parent._is_frame
				 && this.parent._window_type == 5
				 && _window
				 && _window._prepared_flag != true) {
			}
			else {
				this._delayedfocuscomp = null;
				delete this._delayedfocuscomp;
			}
		}
		return true;
	};

	_pFormBase.on_create_contents = function () {
		var comps = this.components;
		var len = comps.length;

		for (var i = 0; i < len; i++) {
			var comp = comps[i];
			comp.createComponent(true);

			if (this._locale && comp._is_locale_control) {
				comp._setLocale(this._locale);
			}
		}
	};

	_pFormBase.on_created_contents = function (win) {
		var len = this.objects.length;
		var i;
		for (i = 0; i < len; i++) {
			this.objects[i].on_created();
		}

		if (this._cssclass_exprfn) {
			nexacro._toString(this._cssclass_exprfn.call(null, this));
		}

		nexacro._createdContents(this);

		if (this.binds) {
			for (i = 0; i < this.binds.length; i++) {
				this.binds[i].bind();
			}
		}

		if (this.stepselector) {
			this.stepselector.on_created(win);
		}

		this.resetScroll();

		if (this._is_scrollable) {
			var control_elem = this._control_element;
			if (control_elem && this.stepselector) {
				control_elem.setElementHScrollPos(control_elem.client_width *  control_elem._step_index);
			}
		}

		nexacro._refreshWindow(this._getWindow().handle);
	};

	_pFormBase.on_destroy_contents = function () {
		if (this._timerManager) {
			this._timerManager.destroy();
			this._timerManager = null;
		}

		var i;
		if (this._load_manager) {
			var load_manager = this._load_manager;
			var tr_list = load_manager.transactionList;
			if (tr_list) {
				for (i = tr_list.length - 1; i >= 0; i--) {
					var tr_item = tr_list[i];
					if (tr_item._usewaitcursor) {
						tr_item._hideWaitCursor(this);
					}
				}
			}
			this._load_manager.destroy();
			this._load_manager = null;
		}

		var binds = this.binds;
		var len = binds.length;
		for (i = 0; i < len; i++) {
			var bindname = binds.get_id(i);
			this._bind_manager._setBinditem(binds.get_item(bindname), true);
			this[bindname] = null;
		}

		var components = this.components;
		len = components.length;

		for (i = len - 1; i >= 0; i--) {
			var compname = components.get_id(i);
			if (this[compname]) {
				if (this[compname]._destroy) {
					this[compname]._destroy();
					this[compname] = null;
				}
			}
		}

		var objects = this.objects;
		len = objects.length;
		for (i = len - 1; i >= 0; i--) {
			var objname = objects.get_id(i);
			if (this[objname]) {
				if (this == this[objname].parent) {
					if (this[objname].destroy) {
						this[objname].destroy();
					}
				}

				objects.delete_item(objname);
				delete this[objname];
				this[objname] = null;
			}
		}

		var layouts = this._layout_list;
		len = layouts.length;
		for (i = len - 1; i >= 0; i--) {
			var layout = layouts.get_id(i);
			if (layout) {
				if (layouts[layout].destroy) {
					layouts[layout].destroy();
				}
				layouts.delete_item(layout);
			}
		}

		if (this._bind_manager) {
			this._bind_manager.destroy();
			this._bind_manager = null;
		}

		this.all.clear();
		this.all = null;
		this.components.clear();
		this.components = null;
		this.objects.clear();
		this.objects = null;
		this.binds.clear();
		this.binds = null;
		this._layout_list.clear();
		this._layout_list = null;
		this._child_list = null;

		this._includescriptlist = null;
		this._hotkey_list = null;
		this._load_callbacklist = null;
		this._is_fired_onload = false;

		if (this._default_layout) {
			if (this._default_layout.destroy) {
				this._default_layout.destroy();
			}
			this._default_layout = null;
		}

		this._obj_mousemove = null;
	};

	_pFormBase._clearUserFunctions = function () {
		var objPrototype = null;
		if (this._type_name == "Div") {
			objPrototype = nexacro.Div.prototype;
		}
		else if (this._type_name == "Tab") {
			objPrototype = nexacro.Tab.prototype;
		}
		else if (this._type_name == "Tabpage") {
			objPrototype = nexacro.Tabpage.prototype;
		}
		else if (this._type_name == "PopupDiv") {
			objPrototype = nexacro.PopupDiv.prototype;
		}
		else if (this instanceof nexacro.Tab) {
			objPrototype = nexacro.Tab.prototype;
		}
		else if (this instanceof nexacro.Tabpage) {
			objPrototype = nexacro.Tabpage.prototype;
		}
		else if (this instanceof nexacro.PopupDiv) {
			objPrototype = nexacro.PopupDiv.prototype;
		}
		else if (this instanceof nexacro.Div) {
			objPrototype = nexacro.Div.prototype;
		}
		else if (this instanceof nexacro.Form) {
			objPrototype = nexacro.Form.prototype;
		}
		else if (this instanceof nexacro.Frame) {
			objPrototype = nexacro.Frame.prototype;
		}

		for (var func in this) {
			if (typeof this[func] === "function" && objPrototype && !objPrototype[func]) {
				this[func] = null;
			}
		}
	};

	_pFormBase._clear = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._clearEventListeners();

			if (this._timerManager && this._timerManager.timerList.length > 0) {
				this._timerManager.clearAll();
			}

			control_elem.clearContents();

			if (this.stepselector) {
				this.stepselector.destroy();
				this.stepselector = null;
			}

			var binds = this.binds;
			var i, len = binds.length;
			for (i = 0; i < len; i++) {
				var bindname = binds.get_id(i);
				this._bind_manager._setBinditem(binds.get_item(bindname), true);
				delete this[bindname];
			}


			var components = this.components;
			var objects = this.objects;

			this.all = new nexacro.Collection();
			this.components = new nexacro.Collection();
			this.objects = new nexacro.Collection();

			len = components.length;
			for (i = 0; i < len; i++) {
				var compname = components.get_id(i);
				if (this[compname]) {
					if (this[compname]._destroy) {
						this[compname]._destroy();
					}
				}
			}
			components.clear();

			len = objects.length;
			for (i = 0; i < len; i++) {
				var objname = objects.get_id(i);
				if (this[objname]) {
					if (this[objname].destroy) {
						this[objname].destroy();
					}
					delete this[objname];
				}
			}
			objects.clear();
			this.all.clear();
			this.components.clear();
			this.objects.clear();
			this.binds.clear();

			if (this._is_scrollable) {
				this._onRecalcScrollSize();
				this._onResetScrollBar();
			}
		}
		this._is_loaded = false;
		this._is_created = false;
		this._default_layout = null;
		this._is_fired_onload = false;
		this._current_layout_name = "";
		this._cur_real_layout = "";
	};

	_pFormBase._InitManagerObject = function () {
		this._bind_manager = new nexacro.BindManager(this);
		this._load_manager = new nexacro._LoadManager(this);
		this._timerManager = new nexacro._TimerManager(this);
	};

	_pFormBase._InitCollectionObject = function () {
		this.all = new nexacro.Collection();
		this.components = new nexacro.Collection();
		this.objects = new nexacro.Collection();
		this.binds = new nexacro.Collection();

		this._layout_list = new nexacro.Collection();
	};

	_pFormBase._initProperties = function () {
		this._refform = this;

		this._child_list = [];
		this._hotkey_list = [];
		this._includescriptlist = [];
		this._load_callbacklist = [];
	};

	_pFormBase._clearManagerObject = function () {
		var bindname = "";
		var len = this.binds.length;
		for (var i = 0; i < len; i++) {
			bindname = this.binds.get_id(i);
			this._bind_manager._setBinditem(this.binds.get_item(bindname), true);

			delete this[bindname];
		}

		if (this._load_manager) {
			this._load_manager.clearAllLoad();
		}

		if (this._timerManager) {
			this._timerManager.clearAll();
		}
	};

	_pFormBase._clearCollectionObject = function () {
		var i;
		var objname = "";
		var len = this.components.length;

		for (i = len - 1; i >= 0; i--) {
			objname = this.components.get_id(i);
			if (this[objname]) {
				if (this[objname]._destroy) {
					this[objname]._destroy();
				}

				delete this[objname];
			}
		}

		len = this.objects.length;
		for (i = len - 1; i >= 0; i--) {
			objname = this.objects.get_id(i);
			if (this[objname]) {
				if (this[objname].destroy) {
					this[objname].destroy();
				}

				delete this[objname];
			}
		}

		var layout;
		var layouts = this._layout_list;
		len = this._layout_list.length;
		for (i = len - 1; i >= 0; i--) {
			layout = layouts.get_id(i);
			if (layout) {
				if (layouts[layout].destroy) {
					layouts[layout].destroy();
				}
				layouts.delete_item(layout);
			}
		}

		this.components.clear();
		this.objects.clear();
		this.binds.clear();
		this.all.clear();

		this._layout_list.clear();
	};

	_pFormBase._clearContents = function () {
		if (this.stepselector) {
			this.stepselector.destroy();
		}
		this.stepselector = null;

		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}
	};

	_pFormBase._clearProperties = function () {
		var prop;
		var props = [];
		if (Object.keys) {
			props = Object.keys(this);

			while (props.length) {
				if (prop = props.pop()) {
					delete this[prop];
				}
			}
		}
		else {
			for (prop in this) {
				if (this.hasOwnProperty(prop)) {
					delete this[prop];
				}
			}
		}
	};

	_pFormBase._beforeClearProperties = function () {
		var ret = {
		};

		if (this.parent) {
			ret["parent"] = this.parent;
		}
		if (this.opener) {
			ret["opener"] = this.opener;
		}

		ret["_async"] = this._async;

		return ret;
	};

	_pFormBase._afterClearProperties = function (recovery_props) {
		for (var i in recovery_props) {
			this[i] = recovery_props[i];
		}
	};


	_pFormBase.on_initEvent = nexacro._emptyFn;
	_pFormBase._init = nexacro._emptyFn;
	_pFormBase.loadIncludeScript = nexacro._emptyFn;
	_pFormBase.loadPreloadList = nexacro._emptyFn;
	_pFormBase._onHttpSystemError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg) {
		this.on_create = nexacro._emptyFn;

		if (this.parent._onHttpSystemError) {
			this.parent._onHttpSystemError(obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg);
		}
	};

	_pFormBase._onHttpTransactionError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg, svcid) {
		var ret = false;
		var commerrorobj = nexacro.MakeCommunicationError(this, errortype, url, returncode, requesturi, locationuri, extramsg);
		if (bfireevent) {
			ret = this.on_fire_onerror(obj, commerrorobj.name, commerrorobj.message, errorobj, returncode, requesturi, locationuri, svcid);
			if (!ret) {
				var environment = nexacro.getEnvironment();
				if (environment) {
					ret = environment.on_fire_onerror(obj, commerrorobj.name, commerrorobj.message, errorobj, returncode, requesturi, locationuri, svcid);
				}
			}
		}

		return ret;
	};

	_pFormBase.create = function () {
		this.on_create();
	};

	_pFormBase.initEvent = function () {
		this._init_status = 1;
		this.on_initEvent();
	};

	_pFormBase._on_init = function () {
		if (this._is_created) {
			this._clear();
		}

		if (this._is_loading) {
			this._clearEventListeners();
		}

		this._init();
		this.create();

		this._is_loading = false;

		if (this.parent && this.parent.form == this) {
			this.parent._loadedForm();
		}

		this._executeScript(this);
		this.initEvent();

		this._is_loaded = true;
	};

	_pFormBase._addPreloadList = function (type, url, id, args) {
		if (!url) {
			return;
		}

		var fullurl;
		var service = nexacro._getServiceObject(url);
		if (type == "data" || type == "dataobject") {
			fullurl = nexacro._getServiceLocation(url);
			this._load_manager.addPreloadItem(type, fullurl, id, args, service);
		}
		else {
			fullurl = nexacro._getFDLLocation(url);
			this._load_manager.addPreloadItem(type, fullurl, this, null, service);
		}
	};

	_pFormBase._loadInclude = function (mainurl, url, asyncmode, service_url) {
		var service;
		if (service_url && service_url.length > 0) {
			service = nexacro._getServiceObject(service_url);
		}
		else {
			service = nexacro._getServiceObject(url);
		}

		this._load_manager.loadIncludeModule(url, null, asyncmode, service);
	};

	_pFormBase.executeIncludeScript = function (url, scriptstr) {
		var suburl;
		if (scriptstr) {
			suburl = nexacro._getServiceLocation(url);

			var moudle = nexacro._executeScript(scriptstr);
			var async = this._async;
			this._async = false;
			moudle.call(this, suburl);
			this._executeScript(this, suburl);
			this._async = async;
		}
		else {
			suburl = nexacro._getServiceLocation(url);

			var scriptlist = this._includescriptlist;
			var len = scriptlist.length;
			var item;
			for (var i = 0; i < len; i++) {
				item = scriptlist[i];
				if (item.url == suburl && !item.isexecuted) {
					item.isexecuted = true;
					item.fn.call(this);

					break;
				}
			}
		}
	};


	_pFormBase._executeScript = function (context) {
		if (context && context._registerscriptfn) {
			context._registerscriptfn.call(context);
		}

		context._registerscriptfn = null;
		context._includescriptlist.length = 0;
	};

	_pFormBase.registerScript = function (filename, fn) {
		var scriptlist = this._includescriptlist;
		var len = scriptlist.length;

		for (var i = 0; i < len; i++) {
			if (scriptlist[i].url == filename) {
				scriptlist[i].fn = fn;
				return;
			}
		}

		this._registerscriptfn = fn;
	};

	_pFormBase.addIncludeScript = function (mainurl, url) {
		if (url && this._is_loading) {
			var _svcurl;
			if (nexacro._Browser == "Runtime" && (nexacro._SystemType.toLowerCase() == "win32" || nexacro._SystemType.toLowerCase() == "win64")) {
				_svcurl = url;
			}

			var suburl = nexacro._getServiceLocation(url);


			var includescript;
			var len = this._includescriptlist.length;
			for (var i = 0; i < len; i++) {
				includescript = this._includescriptlist[i];
				if (includescript.url == suburl) {
					return;
				}
			}

			this._includescriptlist.push({
				target : mainurl, 
				url : suburl, 
				fn : nexacro._emptyFn, 
				isload : false, 
				isexecuted : false, 
				service_url : _svcurl
			});
		}
	};

	_pFormBase.loadIncludeScript = function (mainurl) {
		var includescript;
		var len = this._includescriptlist.length;

		for (var i = 0; i < len; i++) {
			includescript = this._includescriptlist[i];

			if (includescript.isload == false) {
				includescript.isload = true;

				if (nexacro._viewtoollog == true
					 && this._asyncformload != this._async
					 && this._asyncformload != undefined) {
					this._loadInclude.call(this, mainurl, includescript.url, this._asyncformload, includescript.service_url);
				}
				else {
					this._loadInclude.call(this, mainurl, includescript.url, this._async, includescript.service_url);
				}
			}
		}
	};

	_pFormBase.setFocus = function (bResetScroll, bInnerFocus) {
		if (this.parent._is_frame) {
			var win = this._getRootWindow();
			if (!this.getElement()) {
				return;
			}

			if (win && win._is_active_window == false) {
				if (win._is_active_window == false) {
					win._setFocus();
				}
			}
		}

		return nexacro.Component.prototype.setFocus.call(this, bResetScroll, bInnerFocus);
	};




	_pFormBase._findForm = function () {
		return this;
	};

	_pFormBase._getReferenceContext = function () {
		return this;
	};

	_pFormBase._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var last_focused_comp = this._getLastFocused();
		if (last_focused_comp && last_focused_comp != this) {
			return last_focused_comp._getDlgCode(keycode, altKey, ctrlKey, shiftKey);
		}
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	_pFormBase.setSize = function (width, height) {
		if (this._adjust_width != width || this._adjust_height != height) {
			this._adjustPosition(this.left, this.top, null, null, width, height, this.parent._getClientWidth(), this.parent._getClientHeight());
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementSize(width, height);
			}
		}
	};

	_pFormBase._waitCursor = function (wait_flag, context) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._waitCursor(wait_flag, context);
		}
	};

	_pFormBase._destroy = function (callremovechild) {
		if (!this._is_alive) {
			return;
		}

		return this.destroyComponent(callremovechild);
	};

	_pFormBase.destroy = function () {
		if (!this._is_alive) {
			return;
		}

		var confirm_message = this._on_beforeclose();
		if (this._checkAndConfirmClose(confirm_message) == false) {
			return false;
		}

		if (this._window) {
			this._window._ignore_close_confirm = true;
		}

		this._on_close();

		this._is_fired_onload = false;

		return this.destroyComponent();
	};

	_pFormBase.loadCss = function (url, base_url, async) {
		if (!base_url) {
			base_url = this._base_url;
		}

		var cssurl = nexacro._getServiceLocation(url, base_url, null, false);
		var cssmapurl = cssurl;

		var pos = cssurl.lastIndexOf('/');
		cssurl = cssurl.substring(0, pos + 1) + nexacro._getCSSFileName(cssurl.substring(pos + 1, cssurl.length - 4));

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

		this._load_manager.loadCssModule(cssurl, null, async, service, true, 1);
		this._load_manager.loadCssModule(cssmapurl, null, async, service);
	};

	_pFormBase.move = function (left, top, width, height, right, bottom) {
		nexacro.Component.prototype.move.call(this, left, top, width, height, right, bottom);

		if (this._layout_list && this._layout_list.length > 0) {
			this._checkValidLayout();
		}
	};

	_pFormBase.resize = function (w, h) {
		if (w < 0 || h < 0) {
			return;
		}

		if (w == this._adjust_width && h == this._adjust_height) {
			return;
		}
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

		var bsize = false;
		if (old_width != this._adjust_left + w || old_height != this._adjust_top + h) {
			this.width = w;
			this.height = h;
			bsize = true;
		}

		this._update_position(bsize, false);

		if (this._layout_list && this._layout_list.length > 0) {
			this._checkValidLayout();
		}
	};

	_pFormBase.confirm = function (strText, strCaption, strType) {
		var win = this._getWindow();
		if (!win) {
			return;
		}

		nexacro._skipDragEventAfterMsgBox = true;

		return nexacro._confirm(win.frame, strText, strCaption, strType);
	};

	_pFormBase.alert = function (strText, strCaption, strType) {
		var win = this._getWindow();
		if (!win) {
			return;
		}

		nexacro._skipDragEventAfterMsgBox = true;

		nexacro._alert(win.frame, strText, strCaption, strType);
	};

	_pFormBase.getOwnerFrame = function () {
		var frame = null;
		if (this.parent && !(this.parent instanceof nexacro.Frame)) {
			frame = this.parent.getOwnerFrame();
		}
		else {
			frame = this.parent;
		}
		return frame;
	};

	_pFormBase.lookup = function (name) {
		for (var f = this; (f != null); f = (f.opener || f.parent)) {
			if (name in f) {
				return f[name];
			}
		}
	};

	_pFormBase.lookupSetter = function (name, fnname) {
		if (!fnname) {
			fnname = "set_" + name;
		}
		for (var f = this; (f != null); f = (f.opener || f.parent)) {
			var fn = f[fnname];
			if (fn) {
				return new nexacro.SetterBinder(f, name, fn);
			}
			if (name in f) {
				return new nexacro.PropBinder(f, name);
			}
		}
		return null;
	};

	_pFormBase.lookupFunc = function (name) {
		for (var f = this; (f != null); f = (f.opener || f.parent)) {
			var fn = f[name];
			if (fn) {
				return new nexacro.FuncBinder(f, fn);
			}
		}
		return null;
	};

	_pFormBase.getLayoutInfo = function (name, key) {
		var layout = this._layout_list[name];
		if (layout) {
			return layout[key];
		}
		return;
	};

	_pFormBase._on_activate = function () {
		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_onactivate();
		}
	};

	_pFormBase._on_deactivate = function () {
		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_ondeactivate();
		}
	};

	_pFormBase.on_fire_onactivate = function () {
		if (this.onactivate && this.onactivate._has_handlers) {
			var evt = new nexacro.ActivateEventInfo(this, "onactivate", true, this, this);
			this.onactivate._fireEvent(this, evt);
		}
	};

	_pFormBase.on_fire_ondeactivate = function () {
		if (this.ondeactivate && this.ondeactivate._has_handlers) {
			var evt = new nexacro.ActivateEventInfo(this, "ondeactivate", false, this, this);
			this.ondeactivate._fireEvent(this, evt);
		}
	};

	_pFormBase._on_beforeclose = function (root_closing_comp) {
		if (!this._is_alive || (this._is_form && !this._is_loaded)) {
			return;
		}

		if (!root_closing_comp) {
			root_closing_comp = this;
		}
		var msg = "";

		var components = this.components;
		var len = components.length;
		for (var i = 0; i < len; i++) {
			var comp = components[i];
			if (!(comp instanceof nexacro.FormBase)) {
				continue;
			}

			var comp_msg = comp._on_beforeclose(root_closing_comp);
			msg = this._appendBeforeCloseMsg(msg, comp_msg);
		}

		var self_msg = this._on_bubble_beforeclose(root_closing_comp);
		msg = this._appendBeforeCloseMsg(msg, self_msg);

		return msg;
	};

	_pFormBase._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
		var first_call = false;
		if (event_bubbles === undefined) {
			first_call = true;
			fire_comp = this;
			if (!refer_comp) {
				refer_comp = this;
			}
		}

		var msg = "";
		if (this.visible && this._isEnable()) {
			if (this.enableevent) {
				if (first_call) {
					event_bubbles = false;
				}

				msg = this.on_fire_onbeforeclose(this, fire_comp, refer_comp, root_closing_comp);
			}
		}

		var bubbled_msg = "";
		if ((!this.onbeforeclose || (this.onbeforeclose && !this.onbeforeclose.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
			bubbled_msg = this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
		}

		return this._appendBeforeCloseMsg(msg, bubbled_msg);
	};

	_pFormBase._on_close = function () {
		if (!this._is_alive || (this._is_form && !this._is_loaded)) {
			return true;
		}

		this._last_focused = null;

		var components = this.components;
		var len = components.length;
		for (var i = 0; i < len; i++) {
			var comp = components[i];
			if (!(comp instanceof nexacro.FormBase)) {
				continue;
			}

			comp._on_close();
		}

		this._on_bubble_close();
	};

	_pFormBase._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
		var first_call = false;
		if (event_bubbles === undefined) {
			first_call = true;
			fire_comp = this;
			if (!refer_comp) {
				refer_comp = this;
			}
		}

		if (this.visible && this._isEnable()) {
			if (this.enableevent) {
				if (first_call) {
					event_bubbles = false;
				}

				this.on_fire_onclose(this, fire_comp, refer_comp);
			}
		}

		var parent = this.parent;
		if (parent) {
			if ((!this.onclose || (this.onclose && !this.onclose.stoppropagation)) && event_bubbles !== true && !parent._is_application) {
				return parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
			}
		}
	};

	_pFormBase.on_fire_onbeforeclose = function (obj, from_comp, refer_comp, root_closing_comp) {
		if (this.onbeforeclose && this.onbeforeclose._has_handlers) {
			var evt = new nexacro.CloseEventInfo(obj, "onbeforeclose", from_comp, refer_comp, root_closing_comp);
			return this.onbeforeclose._fireEvent(this, evt);
		}
	};

	_pFormBase.on_fire_onclose = function (obj, from_comp, refer_comp) {
		if (this.onclose && this.onclose._has_handlers) {
			var evt = new nexacro.CloseEventInfo(obj, "onclose", from_comp, refer_comp);
			return this.onclose._fireEvent(this, evt);
		}
		return true;
	};

	_pFormBase.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, errordata) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.ErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, errordata);
			return this.onerror._fireEvent(this, evt);
		}
		return false;
	};

	_pFormBase.on_notify_onbindingvaluechanged = function (obj, event_info) {
		return this.on_fire_onbindingvaluechanged(obj, event_info.fromobject, event_info.fromreferenceobject, event_info.row, event_info.col, event_info.colidx, event_info.columnid, event_info.oldvalue, event_info.newvalue);
	};

	_pFormBase.on_fire_onbindingvaluechanged = function (obj, from_obj, refer_obj, row, col, colidx, columnid, oldvalue, newvalue) {
		if (this.onbindingvaluechanged && this.onbindingvaluechanged._has_handlers) {
			var evt = new nexacro.BindingValueChangedEventInfo(obj, "onbindingvaluechanged", row, col, colidx, columnid, oldvalue, newvalue);
			return this.onbindingvaluechanged._fireEvent(this, evt);
		}
	};

	_pFormBase.loadForm = function (formurl, async, reload, baseurl) {
		if (!this._load_manager) {
			return;
		}

		var pThis = this.parent;
		var url = nexacro._getFDLLocation(formurl, baseurl);
		var service = nexacro._getServiceObject(formurl);

		this._url = url;
		this._orgurl = formurl;
		this._base_url = nexacro._getBaseUrl(url);

		this._is_loading = true;
		this._asyncformload = async;

		if (pThis._is_frame && pThis._window_type != 2) {
			if (pThis.form == this) {
				var application = nexacro.getApplication();
				if (application) {
					application._registerLoadforms(this);
				}
			}
		}

		this._load_manager.loadMainModule(url, undefined, async, reload, service);
	};

	_pFormBase.getParentContext = function () {
	};

	_pFormBase._getFormBaseUrl = function () {
		return this._base_url;
	};

	_pFormBase._findChildObject = function (queryid) {
		var npos = queryid.indexOf(".");
		if (npos > 0) {
			var querythis = queryid.substring(0, npos).trim();
			var pthis = this;
			var findobj;
			while (querythis && pthis) {
				findobj = pthis[querythis];
				queryid = queryid.substring(npos + 1, queryid.length).trim();
				npos = queryid.indexOf(".");
				if (npos > 0) {
					querythis = queryid.substring(0, npos).trim();
				}
				else {
					return findobj ? findobj[queryid] : null;
				}

				pthis = findobj;
			}
		}
		else {
			if (queryid == "this") {
				return this;
			}
			return this[queryid];
		}
	};

	_pFormBase._getDatasetObject = function (queryid) {
		var _ds = queryid ? this[queryid] : null;
		var p = (this.opener || this.parent);
		if (_ds == null && p && !p._is_application) {
			while (p.parent && (p._is_container || p._is_containerset)) {
				p = p.parent;
			}

			_ds = p._getDatasetObject ? p._getDatasetObject(queryid) : null;
		}

		if (_ds == null && queryid) {
			var application = nexacro.getApplication();
			if (application) {
				_ds = application[queryid];
			}
		}

		if (_ds && _ds._isDataset && !_ds._isDataset()) {
			_ds = null;
		}

		return _ds;
	};

	_pFormBase._getTabOrderLast = function (filter_type) {
		if (nexacro._isNull(filter_type)) {
			filter_type = 4;
		}

		var ar = this._getComponentsByTaborder(this, filter_type);
		if (ar && ar.length > 0) {
			return ar[ar.length - 1];
		}

		return null;
	};

	_pFormBase._getTabOrderFirst = function (filter_type) {
		if (nexacro._isNull(filter_type)) {
			filter_type = 4;
		}

		var ar = this._getComponentsByTaborder(this, filter_type);
		if (ar && ar.length > 0) {
			return ar[0];
		}

		return null;
	};

	_pFormBase._getTabOrderNext = function (current, direction, filter_type) {
		if (nexacro._isNull(filter_type)) {
			filter_type = 4;
		}

		var ar = this._getComponentsByTaborder(this, filter_type);
		var cur_idx = nexacro._indexOf(ar, current._getRootComponent(current));
		if (cur_idx < 0) {
			var ar_all = this._getComponentsByTaborder(this, nexacro._enableaccessibility ? (8 + 7) : 7);
			var cur_all_idx = nexacro._indexOf(ar_all, current._getRootComponent(current));
			var comp, i;

			if (cur_all_idx < 0) {
				return null;
			}

			i = cur_all_idx;
			while (((i + direction) >= 0 && (i + direction) < ar_all.length)) {
				comp = ar_all[i + direction];
				cur_idx = nexacro._indexOf(ar, comp._getRootComponent(comp));
				if (cur_idx >= 0) {
					return comp;
				}

				i += direction;
			}

			return null;
		}


		return ar[cur_idx + direction];
	};

	_pFormBase._getComponentsByTaborder = function (p, filter_type, include_not_created) {
		if (filter_type === undefined) {
			filter_type = 4;
		}

		var ar = [];
		var comps = p.components;
		if (comps) {
			var comp_len = comps.length;
			for (var i = 0; i < comp_len; i++) {
				var comp = comps[i];
				if (!comp || (!include_not_created && !comp._is_created) || !comp.visible || ((comp._isEnable && !comp._isEnable() || !comp.enable) && !(filter_type & 2)) || comp._popup) {
					continue;
				}

				if (!(filter_type & 1) && !comp.on_get_prop_tabstop()) {
					continue;
				}

				if (((filter_type & 8) ? !comp._isAccessibilityEnable() : false)) {
					if (!comp._hasContainer() && !comp._is_listtype) {
						continue;
					}
				}

				var cur_stepindx = this.getStepIndex();
				if (cur_stepindx === -1 || cur_stepindx === comp.positionstep || comp.positionstep === -1) {
					var tabidx = comp.taborder;
					if (tabidx < 0) {
						tabidx = 0;
					}
					var j = ar.length;
					while (j > 0 && ar[j - 1].taborder > tabidx) {
						ar[j] = ar[j - 1];
						j--;
					}
					ar[j] = comp;
				}
			}
		}
		return ar;
	};

	_pFormBase.addLayout = function (name, obj) {
		if (!obj) {
			return;
		}

		if (name == "default") {
			this._default_layout = obj;
		}

		var curscreenid = nexacro._getCurrentScreenID();
		if (curscreenid) {
			if (!obj.screenid || obj.screenid == "") {
				this._layout_list.add_item(name, obj);
				return;
			}

			var screenid_list = obj.screenid.split(',');
			var cnt = screenid_list.length;
			for (var i = 0; i < cnt; i++) {
				if (curscreenid == screenid_list[i]) {
					this._layout_list.add_item(name, obj);
					break;
				}
			}
		}
	};


	_pFormBase._setPos = function (left, top) {
		if (this._adjust_left != left || this._adjust_top != top) {
			this._adjust_left = this.left = left;
			this._adjust_top = this.top = top;

			if (this.parent) {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
			}
			else {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
			}

			this.on_update_position(false, true);
		}
	};

	_pFormBase._setSize = function (width, height, update) {
		if ((this._adjust_width != width || this._adjust_height != height) || nexacro.__isDeactivate()) {
			this._adjust_width = this.width = width;
			this._adjust_height = this.height = height;

			if (this.parent) {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
			}
			else {
				this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
			}

			this.on_update_position(true, false, update);
		}
	};

	_pFormBase._initLayoutManager = function () {
		var layout_name = "default";
		var layout_list_len = this._layout_list.length;
		if (layout_list_len >= 1) {
			var old_layout_name = this._current_layout_name;
			this._current_layout_name = "";
			this._cur_real_layout = "";

			var xy = {
				cx : this._adjust_width, 
				cy : this._adjust_height
			};
			var idx = nexacro._getLayoutManager().checkValid(this, xy);

			var ret;
			var old_layout = this._layout_list[old_layout_name];
			var new_layout = this._layout_list[idx];
			var oldwidth = 0, oldheight = 0;
			oldwidth = old_layout ? old_layout.width : 0;
			oldheight = old_layout ? old_layout.height : 0;

			if (old_layout_name != new_layout.name) {
				ret = this.on_fire_canlayoutchange(this, "canlayoutchange", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);

				if (ret === true || ret === undefined) {
					nexacro._getLayoutManager().loadLayout(this, null, new_layout);

					if (old_layout_name != new_layout.name) {
						this.on_fire_onlayoutchanged(this, "onlayoutchanged", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);
					}

					this._current_layout_name = new_layout.name;
					this._cur_real_layout = new_layout.name;
				}
				else {
					if (old_layout_name) {
						layout_name = old_layout_name;
					}

					this._current_layout_name = layout_name;
					this._cur_real_layout = layout_name;
				}
			}
			else {
				nexacro._getLayoutManager().refreshStepControl(this, null, new_layout);
				this._current_layout_name = new_layout.name;
				this._cur_real_layout = new_layout.name;
			}
		}
	};

	_pFormBase._checkValidLayout = function () {
		var pManager = nexacro._getLayoutManager();
		if (pManager) {
			var old_layout_name = this._current_layout_name;
			var new_layout = null;
			var xy = {
				cx : this._adjust_width, 
				cy : this._adjust_height
			};
			var new_idx = pManager.checkValid(this, xy);

			if (new_idx > -1) {
				new_layout = this._layout_list[new_idx];
			}
			else {
				return pManager.getCurrentLayout(this);
			}

			if (new_layout && old_layout_name != new_layout.name) {
				var len = this.all.length;
				for (var i = 0; i < len; i++) {
					if (this.all[i]._is_form && this.all[i]._layout_list.length > 0) {
						this.all[i]._checkValidLayout(xy);
					}
				}

				var old_layout = this._layout_list[old_layout_name];
				var oldwidth = 0, oldheight = 0;
				oldwidth = old_layout ? old_layout.width : 0;
				oldheight = old_layout ? old_layout.height : 0;
				var ret = this.on_fire_canlayoutchange(this, "canlayoutchange", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);
				if (ret === true || ret === undefined) {
					if (new_layout.name != "default") {
						pManager.changeLayout(this, this._default_layout);
					}

					pManager.changeLayout(this, new_layout);

					this.on_fire_onlayoutchanged(this, "onlayoutchanged", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);
				}

				if (this._is_scrollable) {
					this.resetScroll();
				}

				return new_layout;
			}
		}
	};

	_pFormBase._on_prepare_stepcontents = function (old_stepcount, old_stepindex, new_stepcount, new_stepindex) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._is_created && (old_stepcount > 0 || new_stepcount > 0)) {
				var comps = this.components;
				var comp_len = comps.length;
				for (var i = 0; i < comp_len; i++) {
					var comp_elem = comps[i].getElement();
					control_elem.removeChildElement(comp_elem);
				}
			}

			control_elem.setElementStepCount(new_stepcount);
			control_elem.setElementStepIndex(new_stepindex);
			if (new_stepindex > -1 && control_elem._step_count > new_stepindex) {
				control_elem.setElementHScrollPos(control_elem.client_width *  new_stepindex);
			}
		}
	};

	_pFormBase._on_refresh_stepcontents = function (old_stepcount, old_stepindex, new_stepcount, new_stepindex) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._is_created && (old_stepcount > 0 || new_stepcount > 0)) {
				var comps = this.components;
				var comp_len = comps.length;
				for (var i = 0; i < comp_len; i++) {
					if ((comps[i].positionstep < new_stepcount) || new_stepcount == 0) {
						if (!comps[i]._is_created || comps[i].positionstep >= old_stepcount) {
							comps[i].on_created();
						}
						var comp_elem = comps[i].getElement();
						control_elem.appendChildElement(comp_elem);
					}
				}
			}
		}

		if (new_stepcount > 0) {
			if (!this.stepselector) {
				this._createStepControl(new_stepcount, new_stepindex);
				if (this._is_created) {
					this.stepselector.on_created();
				}
			}
			else {
				if (this.stepselector.stepcount != new_stepcount) {
					this.stepselector.set_stepcount(new_stepcount);
					this.stepselector.set_stepindex(new_stepindex);
				}
			}
		}
		else if (old_stepcount != new_stepcount) {
			this.stepselector.set_stepcount(new_stepcount);
			this.stepselector.set_stepindex(new_stepindex);
		}
	};

	_pFormBase._on_restore_stepscroll = function (obj) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._onRecalcScrollSize();
			this._onResetScrollBar();
			var stepindex = obj.stepindex;
			var client_elem = control_elem.getContainerElement(stepindex);
			var client_scroll_pos = client_elem._scroll_top;

			if (this._vscroll_pos != client_scroll_pos) {
				this._scrollTo(null, client_scroll_pos, undefined, undefined, undefined, "stepchange");
			}
		}
	};


	_pFormBase._createStepControl = function (stepcnt, stepidx) {
		if (!this.stepselector) {
			var step_ctrl = this.stepselector = new nexacro.StepControl("stepselector", 0, 0, 0, 0, null, null, null, null, null, null, this);
			step_ctrl.set_stepcount(stepcnt);
			step_ctrl.set_stepindex(stepidx);
			step_ctrl.set_stepitemsize(this.stepitemsize);
			step_ctrl.set_stepitemgap(this.stepitemgap);

			step_ctrl.createComponent(true);

			this._setEventHandler("onstepchanged", this._on_stepchanged, this);
		}
	};

	_pFormBase._recalcStepLayout = function () {
		var control_elem = this.getElement();
		var step_ctrl = this.stepselector;
		if (control_elem && step_ctrl) {
			var form_width = this._getClientWidth();
			var form_height = this._getClientHeight();
			var step_area = step_ctrl._getItemAreaSize();

			var parts = this.stepalign.split(/\s+/);
			var halign = parts[0];
			var valign = parts[1];

			var left, top;
			var border = this._getCurrentStyleBorder();
			var border_l = 0, border_t = 0, border_r = 0, border_b = 0;
			if (border) {
				border_l = border.left._width;
				border_t = border.top._width;
				border_r = border.right._width;
				border_b = border.bottom._width;
			}

			switch (halign) {
				case "left":
					left = border_l;
					break;
				case "center":
					left = (form_width - step_area.width - border_l - border_r) / 2;
					break;
				case "right":
					left = form_width - step_area.width - border_r;
					break;
			}

			switch (valign) {
				case "top":
					top = 0;
					break;
				case "middle":
					top = (form_height - step_area.height - border_t - border_b) / 2;
					break;
				case "bottom":
					top = form_height - step_area.height - border_b;
					break;
			}

			step_ctrl.move(left, top, step_area.width, step_area.height, null, null);
			if (nexacro._Browser != "Runtime") {
				if (control_elem.handle) {
					var client_elem_handle = control_elem._client_elem ? control_elem._client_elem.handle : null;
					if (client_elem_handle) {
						if (control_elem._step_count > 0) {
							nexacro.__setDOMStyle_ScrollLimitX(client_elem_handle.style, 0);
						}
						else {
							nexacro.__setDOMStyle_ScrollLimitX(client_elem_handle, control_elem._scroll_type & 0x10);
						}
					}
				}
			}
		}
	};

	_pFormBase._on_stepchanged = function () {
		var stepselector = this.stepselector;
		var control_elem = this.getElement();
		if (stepselector && control_elem) {
			var zoomFactor = this._getZoom() / 100;
			var client_width = control_elem.client_width / zoomFactor;

			var is_invalid_pos = (control_elem.scroll_left != (client_width *  stepselector.stepindex));
			if (!is_invalid_pos) {
				return;
			}

			this._createStepChangeAnimation(stepselector.stepindex, 400);
		}
	};

	_pFormBase.on_fire_sys_onflingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		return nexacro.Component.prototype.on_fire_sys_onflingstart.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
	};

	_pFormBase.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		if (this.stepselector) {
			this._is_step_vscrolling = false;
			this._is_step_hscrolling = false;

			if (this._stepchange_info) {
				this._on_cancel_stepchange_animation();
			}

			var control_elem = this.getElement();
			if (control_elem) {
				control_elem.setElementTranslateStart();
			}
		}
		return nexacro.Component.prototype.on_fire_sys_onslidestart.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pFormBase.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		var control_elem;
		if (touch_manager && touch_manager._scroll_comp == this) {
			control_elem = this.getElement();
			var stepselector = this.stepselector;
			if (!control_elem || !stepselector) {
				return;
			}

			control_elem.setElementTranslateEnd();

			var client_width = control_elem.client_width;

			var is_invalid_pos = (control_elem.scroll_left != (client_width *  stepselector.stepindex));
			if (!is_invalid_pos) {
				return;
			}



			var target_pos = control_elem.scroll_left - (client_width / 2);
			var session = touch_manager._touch_session;
			if (session) {
				var cur_scale = session._scale;
				var data = session._cur_data;
				if (data) {
					target_pos -= (data.distanceX *  cur_scale);
				}
			}
			var target_index = nexacro.round(target_pos / (client_width) + 0.5);
			var cur_stepindex = stepselector.stepindex;
			var next_stepindex = cur_stepindex;
			if (target_index == cur_stepindex) {
				this._createStepChangeAnimation(target_index, 600);
			}
			else {
				if (xaccvalue > 0) {
					next_stepindex--;
				}
				else {
					next_stepindex++;
				}
			}



			var ret = stepselector.set_stepindex(next_stepindex);

			if (ret) {
				if (nexacro._OS != "Android" && nexacro._Browser != "Runtime") {
					control_elem.setElementHScrollPos(client_width *  stepselector.stepindex);
				}
			}

			touch_manager._touch_session._fling_blocked = true;
		}
		else {
			control_elem = this.getElement();
			if (control_elem && this.stepselector) {
				control_elem.setElementTranslateEnd();
			}
			return nexacro.Component.prototype.on_fire_sys_onslideend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
		}

		return false;
	};

	_pFormBase._createStepChangeAnimation = function (target_index, duration) {
		if (this._stepchange_info) {
			this._on_cancel_stepchange_animation();
		}

		var control_elem = this.getElement();
		if (control_elem) {
			var info = {
			};
			info.is_alive = true;
			info.target_index = target_index;
			info.starttime = new Date().getTime();
			info.duration = duration;
			var hscroll_step = control_elem.hscroll_limit / (control_elem._step_count - 1);
			info.startpos = control_elem.scroll_left;
			info.endpos = hscroll_step *  target_index;

			if (this.stepshowtype == "action") {
				var stepselector = this.stepselector;
				if (stepselector) {
					stepselector.set_visible(true);
				}
			}

			var comps = this.components;
			var comp_len = comps.length;
			for (var i = 0; i < comp_len; i++) {
				comps[i].on_apply_positionstep();
			}

			var pThis = this;
			info.timer = new nexacro.AnimationFrame(this, function () {
				pThis._on_stepchange_animation();
			});
			info.timer.start();

			this._stepchange_info = info;
		}
	};

	_pFormBase._on_stepchange_animation = function () {
		var control_elem = this.getElement();
		if (!control_elem) {
			return;
		}

		var info = this._stepchange_info;
		if (info && info.is_alive) {
			var t = new Date().getTime() - info.starttime;
			var d = info.duration;
			var q = t / d - 1;
			var c = Math.min((q *  q *  q + 1), 1);
			var curpos = info.startpos + ((info.endpos - info.startpos) *  c);

			control_elem.setElementHScrollPos(curpos);
			if (t >= info.duration) {
				this._on_end_stepchange_animation();
			}
			else {
				info.timer.start();
			}
		}
	};

	_pFormBase._on_end_stepchange_animation = function () {
		var info = this._stepchange_info;
		if (!info) {
			return;
		}

		info.is_alive = false;
		if (info.timer) {
			info.timer.stop();
		}

		var control_elem = this.getElement();
		var stepselector = this.stepselector;
		if (control_elem && stepselector) {
			var new_index = info.target_index;
			delete info;

			var hscroll_step = control_elem.hscroll_limit / (control_elem._step_count - 1);
			control_elem.setElementHScrollPos(hscroll_step *  new_index);

			this.on_apply_stepshowtype(this.stepshowtype);
			this._stepchange_info = null;
			this.resetScroll();
		}
	};

	_pFormBase._on_cancel_stepchange_animation = function () {
		var info = this._stepchange_info;
		if (!info) {
			return;
		}

		info.is_alive = false;
		if (info.timer) {
			info.timer.stop();
		}
		delete info;
		this._stepchange_info = null;
	};

	_pFormBase._searchNextTabFocus = function (current, b_search_from_first, opt_force_cycle, filter_type) {
		if (filter_type === undefined) {
			filter_type = 4;
		}

		var tabkeycirculation = nexacro._tabkeycirculation;
		var opt_cycle = (opt_force_cycle == undefined) ? (tabkeycirculation == 0 || tabkeycirculation == 2) : opt_force_cycle;

		var ret, next;
		var my_tapstop_childs = this._getComponentsByTaborder(this, filter_type);
		var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

		var parent = this.parent;
		while ((parent && parent._hasContainer && !parent._hasContainer() && !parent._is_frame)) {
			parent = parent.parent;
		}

		if (my_tabstop_child_cnt > 0 && current && !b_search_from_first) {
			next = this._getTabOrderNext(current, 1, filter_type);
			if (opt_cycle && !next && this._isPopupVisible()) {
				next = this._getTabOrderFirst(filter_type);
			}
			if (!next) {
				var parent_tabstop_childs = parent._getComponentsByTaborder(parent, filter_type);
				var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
				if (!opt_cycle && (parent._is_frame || this._is_window) && (tabkeycirculation != 2 && tabkeycirculation != 3 || this._is_window)) {
					ret = [null, this, 1];
				}
				else if ((parent._hasContainer() && parent_tabstop_child_cnt > 0) || ((tabkeycirculation == 2 || tabkeycirculation == 3) && 
					parent instanceof nexacro.ChildFrame && 
					!(this.parent._window_type > 0 && this.parent._window_type < 6))) {
					ret = parent._searchNextTabFocus(this, false, opt_cycle, filter_type);
				}
				else {
					next = this._getTabOrderFirst(filter_type);
				}
			}
		}
		else {
			next = this._getTabOrderFirst(filter_type);
			if (!next) {
				if (!nexacro._isNull(parent) && parent._hasContainer && this.parent._is_form) {
					ret = parent._searchNextTabFocus(this, false, opt_cycle, filter_type);
				}
				else if ((tabkeycirculation == 2 || tabkeycirculation == 3) && this.parent && this.parent._is_frameset) {
					var _tabkeycirculation = this.parent._tabkeycirculation;
					var _frames = this.parent.frames;
					var n = _frames ? _frames.length : 0;
					var _childframe = null;
					var _frameset_idx = -1;
					var _idx = -1;
					for (var i = 0; i < n; i++) {
						if (_frames[i] instanceof nexacro.ChildFrame) {
							if (this.id == _frames[i].id) {
								_idx = i;
							}
							else if (_idx != -1) {
								if (_frames[i]._isFocusAcceptable()) {
									if (!(this.parent instanceof nexacro.FrameSet) || (this.parent instanceof nexacro.FrameSet && ((_tabkeycirculation == 3 && this.parent._arrange != 0) || 
										_tabkeycirculation == 0 || (_tabkeycirculation == 1 && _frames[i]._state_openstatus != 2)) || 
										_tabkeycirculation == 2 && _frames[i]._activate)) {
										_childframe = _frames[i];
										break;
									}
								}
							}
						}
						else if (_frames[i]._is_frameset && _frames[i]._isFocusAcceptable()) {
							if (_idx < i) {
								_frameset_idx = i;
							}
						}
					}

					if (!_childframe) {
						var _next_frame_ = null;
						if (_frameset_idx != -1) {
							_childframe = _frames[_frameset_idx]._getNextChildFrame(_frames[_frameset_idx].frames);
							if (_childframe) {
								next = _childframe.form ? _childframe.form._getTabOrderFirst() : null;
							}
							else {
								var pp = this.parent.parent;
								if (pp && pp._getNextFrame) {
									_next_frame_ = pp._getNextFrame(this.parent.id, opt_cycle);
								}
								if (_next_frame_) {
									if (_next_frame_ instanceof nexacro.ChildFrame) {
										next = _next_frame_.form ? _next_frame_.form._getTabOrderFirst() : null;
									}
									else {
										ret = _next_frame_._searchNextTabFocus(_next_frame_, false, opt_cycle, filter_type);
									}
								}
							}
						}
						else {
							var pp = this.parent.parent;
							if (pp && pp._getNextFrame) {
								_next_frame_ = pp._getNextFrame(this.parent.id, opt_cycle);
							}
							else {
								if (tabkeycirculation == 2) {
									if ((_tabkeycirculation == 1 && this.parent._state_openstatus == 2)
										 || (_tabkeycirculation == 2 && this.parent._activate)
										 || (_tabkeycirculation == 3 && this.parent._arrange == 0)) {
										next = this.form ? this.form._getTabOrderFirst() : null;
									}
									else {
										if (this.parent._getNextChildFrame) {
											_next_frame_ = this.parent._getNextChildFrame(this.parent.frames);
										}
									}
								}
								else {
									ret = null;
								}
							}
							if (_next_frame_) {
								if (_next_frame_ instanceof nexacro.ChildFrame) {
									next = _next_frame_.form ? _next_frame_.form._getTabOrderFirst() : null;
								}
								else {
									ret = _next_frame_._searchNextTabFocus(_next_frame_, false, opt_cycle, filter_type);
								}
							}
						}
					}
					else {
						next = _childframe.form ? _childframe.form._getTabOrderFirst() : null;
					}
				}
				else {
					if (parent && parent._searchNextTabFocus) {
						ret = parent._searchNextTabFocus(this, undefined, undefined, filter_type);
					}
					else {
						ret = null;
					}
				}
			}
		}

		if (next) {
			var next_tabstop_childs = (next._hasContainer() ? next._getComponentsByTaborder(next, filter_type) : null);
			var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;
			if (next._hasContainer() && next._checkContainerTabFocus() == true && (filter_type & 4) && ((filter_type & 8) ? next._isAccessibilityEnable() : true)) {
				ret = [next];
			}
			else if (next._hasContainer() && next_tabstop_child_cnt > 0) {
				ret = next._searchNextTabFocus(null, true, undefined, filter_type);
			}
			else {
				ret = [next];
			}
		}

		return ret;
	};


	_pFormBase._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
		var tabkeycirculation = nexacro._tabkeycirculation;
		var opt_cycle = (opt_force_cycle == undefined) ? (tabkeycirculation == 0 || tabkeycirculation == 2) : opt_force_cycle;

		var ret, next;
		var my_tapstop_childs = this._getComponentsByTaborder(this, filter_type);
		var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

		var parent = this.parent;
		while ((parent && parent._hasContainer && !parent._hasContainer() && !parent._is_frame)) {
			parent = parent.parent;
		}

		if (my_tabstop_child_cnt && current && !bSearchFromLast) {
			next = this._getTabOrderNext(current, -1, filter_type);

			if (opt_cycle && !next && this._isPopupVisible()) {
				next = this._getTabOrderLast(filter_type);
			}
			if (!next) {
				if (filter_type & 4 && parent._hasContainer()) {
					next = parent;
				}
				else {
					var parent_tabstop_childs = parent._getComponentsByTaborder(parent, filter_type);
					var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
					if (opt_cycle == false && (parent._is_frame || this._is_window) && (tabkeycirculation != 2 && tabkeycirculation != 3 || this._is_window)) {
						ret = [null, this, -1];
					}
					else if ((parent._hasContainer() && parent_tabstop_child_cnt > 0) || ((tabkeycirculation == 2 || tabkeycirculation == 3) && 
						this.parent instanceof nexacro.ChildFrame && !this.parent._window)) {
						ret = parent._searchPrevTabFocus(this, undefined, undefined, filter_type);
					}
					else {
						next = this._getTabOrderLast(filter_type);
					}
				}
			}
		}
		else {
			if (!bSearchFromLast) {
				if (this instanceof nexacro.PopupDiv) {
					next = this._getTabOrderLast(filter_type);
				}
				else if (this.parent._is_form) {
					ret = this.parent._searchPrevTabFocus(this, undefined, undefined, filter_type);
				}
				else {
					ret = null;
				}
			}

			if (!ret) {
				next = this._getTabOrderLast(filter_type);
				if (!next) {
					if (ret !== null) {
						if (this._checkContainerTabFocus() == true) {
							ret = [this];
						}
						else {
							ret = parent._searchPrevTabFocus(this, undefined, undefined, filter_type);
						}
					}
					else {
						if (this._checkContainerTabFocus() == true) {
							ret = [this];
						}
						else if ((tabkeycirculation == 2 || tabkeycirculation == 3) && this.parent && this.parent._is_frameset) {
							var _tabkeycirculation = this.parent._tabkeycirculation;
							var _frames = this.parent.frames;
							var n = _frames ? _frames.length : 0;
							var _childframe = null;
							var _frameset_idx = -1;
							var _idx = -1;
							for (var i = n - 1; i >= 0; i--) {
								if (_frames[i] instanceof nexacro.ChildFrame) {
									if (this.id == _frames[i].id) {
										_idx = i;
									}
									else if (_idx != -1) {
										if (_frames[i]._isFocusAcceptable()) {
											if (!(this.parent instanceof nexacro.FrameSet) || (this.parent instanceof nexacro.FrameSet && ((_tabkeycirculation == 3 && this.parent._arrange != 0) || 
												_tabkeycirculation == 0 || (_tabkeycirculation == 1 && _frames[i]._state_openstatus != 2)) || 
												_tabkeycirculation == 2 && _frames[i]._activate)) {
												_childframe = _frames[i];
												break;
											}
										}
									}
								}
								else if (_frames[i]._is_frameset && _frames[i]._isFocusAcceptable()) {
									if (_idx > i) {
										_frameset_idx = i;
									}
								}
							}

							if (!_childframe) {
								var _prev_frame_ = null;
								if (_frameset_idx != -1) {
									_childframe = _frames[_frameset_idx]._getPrevChildFrame(_frames[_frameset_idx].frames);
									if (_childframe) {
										next = _childframe.form ? _childframe.form._getTabOrderLast() : null;
									}
								}
								else {
									var pp = this.parent.parent;
									if (pp && pp._getPrevFrame_) {
										_prev_frame_ = pp._getPrevFrame_(this.parent.id, opt_cycle);
									}
									else {
										if (tabkeycirculation == 2) {
											if (this.parent._getPrevChildFrame) {
												_prev_frame_ = this.parent._getPrevChildFrame(this.parent.frames);
											}
										}
									}
									if (_prev_frame_) {
										if (_prev_frame_ instanceof nexacro.ChildFrame) {
											if (tabkeycirculation == 3) {
												if (this.form == _prev_frame_.form) {
													next = _prev_frame_.form ? _prev_frame_.form._getTabOrderFirst() : null;
												}
												else {
													next = _prev_frame_.form ? _prev_frame_.form._getTabOrderLast() : null;
												}
											}
											else {
												next = _prev_frame_.form ? _prev_frame_.form._getTabOrderLast() : null;
											}
										}
										else {
											ret = _prev_frame_._searchPrevTabFocus(_prev_frame_, undefined, undefined, filter_type);
										}
									}
									else {
									}
								}
							}
							else {
								next = _childframe.form ? _childframe.form._getTabOrderLast() : null;
							}
						}
						else {
							if (parent && parent._searchPrevTabFocus) {
								ret = parent._searchPrevTabFocus(this, undefined, undefined, filter_type);
							}
							else {
								ret = null;
							}
						}
					}
				}
			}
		}

		if (next) {
			var next_tabstop_childs = (next._hasContainer() ? next._getComponentsByTaborder(next, filter_type) : null);
			var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;
			if (next._hasContainer() && next_tabstop_child_cnt > 0) {
				if (this.parent === next) {
					return [next];
				}

				ret = next._searchPrevTabFocus(null, true, undefined, filter_type);
			}
			else {
				ret = [next];
			}
		}

		return ret;
	};


	_pFormBase._processArrowKey = function (bdown, newfocus_comp) {
		if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
			var win = this._getWindow();
			win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
		}
		var dir = 2;
		if (!bdown) {
			dir = 3;
		}
		newfocus_comp[0]._setFocus(true, dir, false);
		var env = nexacro.getEnvironment(), comp, _label;
		if (env.accessibilityfirstovermessage && newfocus_comp[0] == this._getTabOrderFirst()) {
			comp = newfocus_comp[0];
			_label = comp._getAccessibilityReadLabel() + " " + env.accessibilityfirstovertext;
			comp.getElement().notifyAccessibility(_label, "focus");
		}
		else if (env.accessibilitylastovermessage && newfocus_comp[0] == this._getTabOrderLast()) {
			comp = newfocus_comp[0];
			_label = comp._getAccessibilityReadLabel() + " " + env.accessibilitylastovertext;
			comp.getElement().notifyAccessibility(_label, "focus");
		}
	};

	_pFormBase._processHotkey = function (keycode, altKey, ctrlKey, shiftKey, obj) {
		var parent = null;
		if (obj) {
			parent = obj.parent;
		}

		var hotkey_list = this._hotkey_list;
		for (var i = 0; i < hotkey_list.length; i++) {
			var hotkey_info = hotkey_list[i];
			if (hotkey_info[1] == keycode && 
				hotkey_info[2] == altKey && 
				hotkey_info[3] == ctrlKey && 
				hotkey_info[4] == shiftKey) {
				var comp = hotkey_info[0];
				if (parent && parent instanceof nexacro.Tabpage && obj != comp && comp.parent instanceof nexacro.Tabpage) {
					continue;
				}

				if (!comp.enable) {
					return true;
				}

				comp._on_hotkey(keycode, altKey, ctrlKey, shiftKey);
				return true;
			}
		}

		if (this._is_frame && this._is_window && (this._window_type == 1 || this._window_type == 4)) {
			return;
		}

		var owner_frame = this.getOwnerFrame();
		if (owner_frame) {
			return owner_frame._processHotkey(keycode, altKey, ctrlKey, shiftKey);
		}
	};

	_pFormBase._appendBeforeCloseMsg = function (current_message, new_message) {
		if (typeof (new_message) == "boolean") {
			new_message = nexacro._toString(new_message);
		}

		if (new_message === undefined || new_message == "" || new_message === null) {
			return current_message;
		}

		if (current_message === undefined || current_message === null) {
			current_message = "";
		}
		else if (current_message != "") {
			current_message += "\n";
		}

		return (current_message + new_message);
	};

	_pFormBase._checkAndConfirmClose = function (confirm_message) {
		if (confirm_message === undefined || confirm_message == "" || confirm_message === null) {
			return true;
		}

		if (this._window && this._window._ignore_close_confirm) {
			return true;
		}

		return nexacro._confirm(this, confirm_message);
	};

	delete _pFormBase;


	nexacro.Form = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.FormBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._chk_recalc_scroll = [];

		this._trigger_manager = new nexacro.TriggerManager(this);
	};

	var _pForm = nexacro._createPrototype(nexacro.FormBase, nexacro.Form);
	nexacro.Form.prototype = _pForm;
	_pForm._type_name = "Form";


	_pForm.layout = "";
	_pForm.opener = null;
	_pForm.resizebutton = null;
	_pForm.statustext = "";
	_pForm.titletext = "";
	_pForm.stepalign = "center bottom";
	_pForm.stepitemgap = undefined;
	_pForm.stepitemsize = undefined;
	_pForm.stepshowtype = "always";
	_pForm.locale = "";



	_pForm._url = "";
	_pForm._locale = "";
	_pForm._init_width = 0;
	_pForm._init_height = 0;
	_pForm._defaultbutton = null;
	_pForm._escapebutton = null;
	_pForm.accessibilityrole = "none";
	_pForm._zoomFactor = undefined;
	_pForm._autofittedZoomFactor = undefined;
	_pForm._init_status = 0;
	_pForm._is_fired_onload = false;



	_pForm._event_list = {
		"onbindingvaluechanged" : 1, 
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onkeypress" : 1, 
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
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"ontouch" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"onactivate" : 1, 
		"onbeforeclose" : 1, 
		"onclose" : 1, 
		"ondeactivate" : 1, 
		"onsyscommand" : 1, 
		"ontimer" : 1, 
		"oninit" : 1, 
		"onload" : 1, 
		"canlayoutchange" : 1, 
		"canstepchange" : 1, 
		"onlayoutchanged" : 1, 
		"onstepchanged" : 1, 
		"ondevicebuttonup" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"onorientationchange" : 1, 
		"oncontextmenu" : 1, 
		"onerror" : 1, 
		"onextendedcommand" : 1
	};

	_pForm._getPrevHeadingComponent = nexacro._emptyFn;
	_pForm._getNextHeadingComponent = nexacro._emptyFn;
	if ((nexacro._Browser == "IE" && nexacro._BrowserVersion > 8) || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		_pForm._use_translate_scroll = false;
	}
	_pForm.on_created = function (_window) {
		var ret = nexacro.FormBase.prototype.on_created.call(this, _window);
		if (ret) {
			if (this._init_status == 1) {
				this.on_fire_oninit(this);
			}

			this.on_fire_onload(this, this._url);
		}

		return ret;
	};

	_pForm.on_change_containerRect = function (width, height) {
		var chk = this._chk_recalc_scroll;

		for (var i = 0, n = chk.length; i < n; i++) {
			if (chk[i].w == width && chk[i].h == height) {
				return;
			}
		}

		chk.push({
			w : width, 
			h : height
		});

		var comp;
		var comps = this.components;
		var _move_scroll = false;
		var comp_bottom, comp_scroll_pos, last_comp, form_bottom;

		if (nexacro._OS == "Android" && this.vscrollbar && this.vscrollbar.visible) {
			_move_scroll = true;
			last_comp = this._getLastFocused();
			form_bottom = this.getOffsetBottom();
		}

		var rtl = this._isRtl();
		for (i = 0, n = comps.length; i < n; i++) {
			comp = comps[i];
			if (comp._control_element) {
				if (_move_scroll && comp instanceof nexacro.Edit) {
					comp_bottom = comp.getOffsetBottom();
					comp_scroll_pos = comp_bottom - form_bottom;
					if (this.vscrollbar.pos < comp_scroll_pos && form_bottom < comp_bottom && last_comp == comp) {
						this.vscrollbar.set_pos(comp_scroll_pos);
					}
				}
				comp._update_position(rtl);
			}
		}

		if (this.stepselector) {
			this._recalcStepLayout();
			var control_elem = this.getElement();
			if (control_elem) {
				var stepcount = this.stepselector.stepcount;
				var stepindex = this.stepselector.stepindex;
				if (stepcount > 0 && stepindex >= 0) {
					control_elem.setElementHScrollPos(control_elem.client_width *  this.stepselector.stepindex);
				}
			}
		}

		if (this._is_scrollable) {
			this._onRecalcScrollSize();
			this._onResetScrollBar();
		}

		this._chk_recalc_scroll = [];
	};

	_pForm.on_destroy_contents = function () {
		nexacro.FormBase.prototype.on_destroy_contents.call(this);

		this._chk_recalc_scroll = null;

		if (this._trigger_manager) {
			this._trigger_manager.destroy();
			this._trigger_manager = null;
		}
	};

	_pFormBase._InitManagerObject = function () {
		this._bind_manager = new nexacro.BindManager(this);
		this._load_manager = new nexacro._LoadManager(this);
		this._timerManager = new nexacro._TimerManager(this);
		this._trigger_manager = new nexacro.TriggerManager(this);
	};

	_pForm._initProperties = function () {
		this._refform = this;

		this.init("form", 0, 0, this.parent._getClientWidth(), this.parent._getClientHeight());

		this._child_list = [];
		this._hotkey_list = [];
		this._includescriptlist = [];
		this._load_callbacklist = [];

		this._chk_recalc_scroll = [];
	};

	_pForm._on_load = function (obj, url) {
		if (!this._load_callbacklist) {
			return;
		}

		var parent_foraddcallback = this.parent;
		if (this.parent && this.parent.form == this) {
			parent_foraddcallback = nexacro;
		}

		if (parent_foraddcallback && parent_foraddcallback._addLoadCallbacklist) {
			var pthis = this;
			var ret = parent_foraddcallback._addLoadCallbacklist({
				target : pthis, 
				callback : pthis._on_loadcallback, 
				url : this.url
			});
			if (!ret) {
				this._on_loadcallback(obj, url);
			}
		}
	};

	_pForm._addLoadCallbacklist = function (item) {
		if (!this._is_loaded && this._url && this._url.length > 0) {
			if (!this.parent._load_callbacklist) {
				this.parent._load_callbacklist = [];
			}
			this._load_callbacklist.push(item);
			return true;
		}
		return false;
	};

	_pForm._on_loadcallback = function () {
		var callbacklist = this._load_callbacklist;
		var target;
		var n = callbacklist.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbacklist[i];
				target = item.target;
				var _url = item.url;
				if (target._is_alive != false) {
					item.callback.call(target, target, _url);
				}
			}
			callbacklist.splice(0, n);
		}

		this.createComponent(true);

		this.on_fire_oninit(this);

		var _window, ret;
		if (!this._is_created) {
			_window = this._getWindow();
			ret = this.on_created(_window);
		}

		if (ret && !(this instanceof nexacro.Tabpage) && !_window._bnoactivate) {
			this._on_activate();
		}

		var parent = this.parent;
		if (parent) {
			if (parent._is_frame && parent.form == this) {
				parent._createdForm();
				if (parent._window_type != 2) {
					var application = nexacro.getApplication();
					if (application) {
						application._notifyLoadforms(this);
					}
				}
			}
			else {
				if (!_window) {
					_window = this._getRootWindow();
				}

				if (_window && _window.frame && _window.frame._activate == true) {
					var cur_focus_paths = _window.getCurrentFocusPaths();
					target = this;
					if (this instanceof nexacro._InnerForm) {
						target = parent;
					}

					if (cur_focus_paths && nexacro._indexOf(cur_focus_paths, target) > -1) {
						if (nexacro._enableaccessibility && nexacro._accessibilitywholereadtype > 1) {
							this._playAccessibilityWholeReadLabel("wholeread");
						}

						this._on_focus(true);
					}
					else if (nexacro._enableaccessibility && nexacro._accessibilitywholereadtype > 1) {
						this._playAccessibilityWholeReadLabel("wholeread");
					}
				}
			}
		}
		return ret;
	};

	_pForm.on_update_position = function (resize_flag, move_flag, update) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(this._adjust_left, this._adjust_top);

			if (resize_flag) {
				var val = this._calcScrollMaxSize();
				control_elem.container_maxwidth = val.w;
				control_elem.container_maxheight = val.h;
			}

			control_elem.setElementSize(this._adjust_width, this._adjust_height, update);


			if (this._init_status < 2) {
				if (this.parent && this.parent._window_type == 5) {
					return;
				}
			}

			if (move_flag) {
				this.on_fire_onmove(this._adjust_left, this._adjust_top);
			}
			if (resize_flag) {
				this.on_fire_onsize(this._adjust_width, this._adjust_height);
			}
		}
	};

	_pForm.on_get_accessibility_label = function () {
		return this.titletext ? this.titletext : "";
	};

	_pForm.set_opener = nexacro._emptyFn;

	_pForm.set_layout = nexacro._emptyFn;

	_pForm.set_statustext = function (v) {
		var parent = this.parent;
		if (parent && parent._is_frame) {
			if (this.statustext != v) {
				this.statustext = v;
				parent._applyStatusText();
			}
		}
		else {
			this.statustext = v;
		}
	};

	_pForm.set_titletext = function (v) {
		if (this.parent && this.parent._is_frame) {
			if (this.titletext != v) {
				this.titletext = v;
				this.parent._applyTitleText();
			}
		}
		else {
			this.titletext = v;
		}
	};

	_pForm.set_dragscrolltype = function (v) {
		var dragscrolltype_enum = ["none", "vert", "horz", "both", "all"];
		if (dragscrolltype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.dragscrolltype != v) {
			this.dragscrolltype = v;
		}
	};

	_pForm.set_locale = function (v) {
		if (this.locale != v) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);
		}
	};

	_pForm.on_apply_locale = function (locale) {
		var i, n, comp;
		var comps = this.components;

		for (i = 0, n = comps.length; i < n; i++) {
			comp = comps[i];
			if (comp._is_locale_control) {
				comp._setLocale(locale);
			}
		}
	};

	_pForm.set_stepalign = function (v) {
		var halign_enum = ["left", "center", "right"];
		var valign_enum = ["top", "middle", "bottom"];

		var parts1 = v.split(/\s+/);
		var parts2 = this.stepalign.split(/\s+/);

		if (halign_enum.indexOf(parts1[0]) > -1) {
			parts2[0] = parts1[0];
		}

		if (valign_enum.indexOf(parts1[1]) > -1) {
			parts2[1] = parts1[1];
		}

		v = parts2.join(" ");

		if (this.stepalign != v) {
			this.stepalign = v;
			this.on_apply_stepalign(v);
		}
	};

	_pForm.on_apply_stepalign = function () {
		this._recalcStepLayout();
	};

	_pForm.set_stepitemgap = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.stepitemgap != v) {
			this.stepitemgap = v;
			this.on_apply_stepitemgap(v);
		}
	};

	_pForm.on_apply_stepitemgap = function (stepitemgap) {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			step_ctrl.set_stepitemgap(stepitemgap);
		}
	};

	_pForm.set_stepitemsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.stepitemsize != v) {
			this.stepitemsize = v;
			this.on_apply_stepitemsize(v);
		}
	};

	_pForm.on_apply_stepitemsize = function (stepitemsize) {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			step_ctrl.set_stepitemsize(stepitemsize);
		}
	};

	_pForm.set_stepshowtype = function (v) {
		var stepshowtype_enum = ["always", "action"];
		if (stepshowtype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.stepshowtype != v) {
			this.stepshowtype = v;
			this.on_apply_stepshowtype(v);
		}
	};

	_pForm.on_apply_stepshowtype = function (stepshowtype) {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			switch (stepshowtype) {
				case "action":
					step_ctrl.set_visible(false);
					break;
				case "always":
				default:
					step_ctrl.set_visible(true);
					break;
			}
		}
	};

	_pForm.on_apply_prop_enable = function (enable) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, enable);

		var i, n, comp;
		var comps = this.components;

		for (i = 0, n = comps.length; i < n; i++) {
			comp = comps[i];
			comp._setEnable(enable);
		}

		if (enable == true) {
			var root_form = this._getRootForm();
			var form = this;
			while (form) {
				var binds = form.binds;
				if (binds && binds.length > 0) {
					this._applyBinditemEnable(binds);
				}
				if (root_form == form || form instanceof nexacro.ChildFrame) {
					break;
				}
				form = form._getParentForm();
			}
		}
	};






	_pForm._on_activate = function () {
		if (!this.parent) {
			return;
		}

		var owner_frame = this.getOwnerFrame();
		if (!owner_frame || !owner_frame._activate) {
			return;
		}

		nexacro.FormBase.prototype._on_activate.call(this);
	};

	_pForm._on_deactivate = function () {
		if (!this.parent) {
			return;
		}

		var owner_frame = this.getOwnerFrame();
		if (!owner_frame || owner_frame._activate) {
			return;
		}

		nexacro.FormBase.prototype._on_deactivate.call(this);
	};

	_pForm._on_starttrack = function () {
		if (!this._is_alive) {
			return false;
		}
		if (nexacro._isTouchInteraction) {
			return false;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			return ownerframe._on_titlebar_starttrack();
		}

		return false;
	};

	_pForm._on_endtrack = function (x, y, dragdata) {
		if (!this._is_alive) {
			return;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._on_titlebar_endtrack(x, y, dragdata);
		}
	};

	_pForm._on_movetrack = function (x, y, dragdata, windowX, windowY) {
		if (!this._is_alive) {
			return;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._on_titlebar_movetrack(x, y, dragdata, windowX, windowY);
		}
	};

	_pForm._on_orientationchange = function (orientation) {
		this.on_fire_onorientationchange(orientation);

		var i, n, comp;
		var comps = this.components;

		for (i = 0, n = comps.length; i < n; i++) {
			comp = comps[i];
			if (comp._hasContainer() && comp._on_orientationchange) {
				comp._on_orientationchange(orientation);
			}
		}
	};

	_pForm.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_sys_onrbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		nexacro._quickview_mode = true;
		if (nexacro._quickview_mode && ret !== true && this.parent instanceof nexacro.ChildFrame) {
			if (from_refer_comp && !from_refer_comp._input_element) {
				return nexacro._showQuickviewMenu(this, screenX, screenY);
			}
		}
		return ret;
	};

	_pForm.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		var newfocus_comp;
		var lastfocus_comp = this._last_focused;
		var focusedComp = refer_comp;

		if (!focusedComp) {
			focusedComp = this.getFocus();
		}
		if (!focusedComp) {
			focusedComp = this;
		}
		if (focusedComp) {
			focusedComp = focusedComp._getRootComponent(focusedComp);
			if (!focusedComp) {
				return;
			}
		}

		var win = this._getWindow();
		var root_win = this._getRootWindow();
		var env = nexacro.getEnvironment();

		var keydown_elem = root_win._keydown_element;
		var dlgc = focusedComp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);

		if (keycode == nexacro.Event.KEY_TAB) {
			if (!dlgc.want_tab) {
				if (keydown_elem) {
					keydown_elem._event_stop = true;
				}

				if (!shift_key) {
					newfocus_comp = this._searchNextTabFocus(this._last_focused, undefined, undefined, 0);
				}
				else {
					newfocus_comp = this._searchPrevTabFocus(this._last_focused, undefined, undefined, 0);
				}

				if (newfocus_comp) {
					if (newfocus_comp[0]) {
						if (newfocus_comp[0]._hasContainer() && newfocus_comp[0]._last_focused) {
							win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
						}

						newfocus_comp[0]._setFocus(true, (!shift_key ? 0 : 1), true);
					}
					else if (newfocus_comp[2] == -1) {
						if (lastfocus_comp) {
							lastfocus_comp.getElement().notifyAccessibility(env.accessibilityfirstovertext, "notify", true);
						}
					}
					else if (newfocus_comp[2] == 1) {
						if (lastfocus_comp) {
							lastfocus_comp.getElement().notifyAccessibility(env.accessibilitylastovertext, "notify", true);
						}
					}
				}

				return true;
			}
		}
		else if (keycode == nexacro.Event.KEY_RETURN) {
			if (!dlgc.want_return) {
				if (this instanceof nexacro.Form) {
					var defaultbutton = this._defaultbutton;
					if (!focusedComp._isPopupVisible()) {
						if (defaultbutton && defaultbutton.enableevent && defaultbutton._isEnable()) {
							defaultbutton._click(keycode);
						}
					}
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_ESC) {
			if (nexacro._stopTransaction(this, 1) <= 0 && !dlgc.want_escape) {
				if (this instanceof nexacro.Form) {
					var escapebutton = this._escapebutton;
					if (escapebutton && escapebutton.enableevent && escapebutton._isEnable()) {
						escapebutton._click(keycode);
					}
				}
			}
		}

		if (nexacro._enableaccessibility) {
			var filter_type;
			if (keycode == nexacro.Event.KEY_DOWN && !alt_key && !ctrl_key && !shift_key) {
				filter_type = 7 + 8;

				if (!dlgc.want_arrows) {
					if (lastfocus_comp && lastfocus_comp._hasContainer()) {
						newfocus_comp = lastfocus_comp._searchNextTabFocus(null, true, undefined, filter_type);
					}
					else {
						newfocus_comp = this._searchNextTabFocus(lastfocus_comp, undefined, undefined, filter_type);
					}
					if (newfocus_comp && newfocus_comp[0]) {
						if (newfocus_comp[0]._hasContainer() && newfocus_comp[0]._last_focused) {
							var _win = this._getWindow();
							_win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
						}

						newfocus_comp[0]._setFocus(true, 2, true);
					}

					if (keydown_elem) {
						keydown_elem._event_stop = true;
					}

					return true;
				}
			}
			else if (keycode == nexacro.Event.KEY_UP && !alt_key && !ctrl_key && !shift_key) {
				if (!dlgc.want_arrows) {
					filter_type = 7;
					var first_comp = this._getTabOrderFirst(7);

					filter_type += 8;

					if (this instanceof nexacro._InnerForm && first_comp == lastfocus_comp) {
						if (this.parent._isAccessibilityEnable()) {
							newfocus_comp = [this.parent];
						}
						else {
							var refform = this.parent._getForm();
							if (this.parent instanceof nexacro.PopupDiv) {
								refform = this.parent;
							}

							newfocus_comp = refform._searchPrevTabFocus(this.parent, undefined, undefined, filter_type);
						}
					}
					else {
						newfocus_comp = this._searchPrevTabFocus(lastfocus_comp, undefined, undefined, filter_type);
					}

					if (newfocus_comp && newfocus_comp[0]) {
						if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
							win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
						}
						newfocus_comp[0]._setFocus(true, 3, true);
					}

					if (keydown_elem) {
						keydown_elem._event_stop = true;
					}

					return true;
				}
			}
		}

		var ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, this, refer_comp, meta_key);

		if (!this.onkeydown || (this.onkeydown && !this.onkeydown.defaultprevented)) {
			var line;
			if (keycode == nexacro.Event.KEY_LEFT || keycode == nexacro.Event.KEY_RIGHT) {
				var hscrollbar = this.hscrollbar;
				if (hscrollbar && hscrollbar.visible && ctrl_key == true) {
					if (!dlgc.want_arrows) {
						line = hscrollbar.line;
						if (line <= 0) {
							line = hscrollbar._linedown;
						}
						if (keycode == nexacro.Event.KEY_LEFT) {
							line *= -1;
						}

						hscrollbar.set_pos(hscrollbar.pos + line);
						return true;
					}
				}
			}
			else if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
				var vscrollbar = this.vscrollbar;
				if (vscrollbar && vscrollbar.visible && ctrl_key == true) {
					if (!dlgc.want_arrows) {
						line = vscrollbar.line;
						if (line <= 0) {
							line = vscrollbar._linedown;
						}
						if (keycode == nexacro.Event.KEY_UP) {
							line *= -1;
						}

						vscrollbar.set_pos(vscrollbar.pos + line);
						return true;
					}
				}
			}
		}

		return ret;
	};

	_pForm.on_fire_sys_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

		if (from_comp == from_refer_comp) {
			if (nexacro._OS == "iOS") {
				var _win = this._getWindow();
				var cur_focus_paths = _win.getCurrentFocusPaths();
				var focused_comp = cur_focus_paths[cur_focus_paths.length - 1];
				var input_elem = focused_comp ? focused_comp._input_element : null;

				if (input_elem) {
					nexacro._deleteRefreshNode();
					nexacro._refreshCaret();
				}
			}
		}

		return ret;
	};

	_pForm.on_fire_oninit = function (obj) {
		if (this._init_status != 1) {
			return true;
		}

		this._init_status = 2;

		if (this.oninit && this.oninit._has_handlers) {
			var evt = new nexacro.Event(obj, "oninit");
			return this.oninit._fireEvent(this, evt);
		}
		return true;
	};

	_pForm.on_fire_canstepchange = function (obj) {
		if (this.canstepchange && this.canstepchange._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "canstepchange", obj._prestepindex, obj._poststepindex);
			return this.canstepchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pForm.on_fire_onstepchanged = function (obj) {
		this._on_restore_stepscroll(obj);
		if (this.onstepchanged && this.onstepchanged._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "onstepchanged", obj._prestepindex, obj._poststepindex);
			return this.onstepchanged._fireEvent(this, evt);
		}
	};

	_pForm.on_fire_canlayoutchange = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight) {
		if (this.canlayoutchange && this.canlayoutchange._has_handlers) {
			var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
			return this.canlayoutchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pForm.on_fire_onlayoutchanged = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight) {
		if (this.onlayoutchanged && this.onlayoutchanged._has_handlers) {
			var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
			return this.onlayoutchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pForm.on_fire_onbeforelayoutchange = function (obj, eventid, curlayout, newlayout) {
		if (this.onbeforelayoutchange && this.onbeforelayoutchange._has_handlers) {
			var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayout, newlayout);
			return this.onbeforelayoutchange._fireEvent(this, evt);
		}
		return true;
	};

	_pForm.on_fire_onload = function (obj, url) {
		if (this._is_fired_onload) {
			return true;
		}

		if (this.onload && this.onload._has_handlers) {
			this._bFireLoadEvent = true;
			var evt = new nexacro.LoadEventInfo(obj, "onload", url);
			var ret = this.onload._fireEvent(this, evt);
			this._bFireLoadEvent = false;
			evt.destroy();

			if (!this._is_loading) {
				this._is_fired_onload = true;
			}

			return ret;
		}
		return true;
	};

	_pForm.on_fire_onorientationchange = function (orientation) {
		if (this.onorientationchange && this.onorientationchange._has_handlers) {
			var evt = new nexacro.OrientationChangeEventInfo(this, "onorientationchange", orientation);
			this.onorientationchange._fireEvent(this, evt);
		}
	};

	_pForm.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		var _window = this._getWindow();
		var comp = null;

		var filter_type;
		var my_tapstop_childs, my_tapstop_childs_cnt;
		var new_comp;
		if (!direction) {
			filter_type = 3 + 8;
			comp = this._searchPrevTabFocus(_window._accessibility_last_focused_comp, undefined, undefined, filter_type);

			while (comp && comp[0] && comp[0]._hasContainer()) {
				my_tapstop_childs = comp[0]._searchPrevTabFocus(null, undefined, undefined, filter_type);
				my_tapstop_childs_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;
				if (my_tapstop_childs_cnt == 0) {
					break;
				}

				new_comp = comp[0]._searchPrevTabFocus(null, undefined, undefined, filter_type);
				if (comp[0] == new_comp[0]) {
					comp = new_comp;
					break;
				}
				comp = new_comp;
			}
		}
		else {
			filter_type = 3 + 8;
			comp = this._searchNextTabFocus(_window._accessibility_last_focused_comp, undefined, undefined, filter_type);

			while (comp && comp[0] && comp[0]._hasContainer()) {
				my_tapstop_childs = comp[0]._searchNextTabFocus(null, undefined, undefined, filter_type);
				my_tapstop_childs_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

				if (my_tapstop_childs_cnt == 0) {
					break;
				}

				new_comp = comp[0]._searchNextTabFocus(null, undefined, undefined, filter_type);
				if (comp[0] == new_comp[0]) {
					comp = new_comp;
					break;
				}
				comp = new_comp;
			}
		}

		if (comp && comp[0]) {
			comp[0]._setAccessibilityNotifyEvent(direction);
			return true;
		}

		return false;
	};

	_pForm.addChild = function (id, obj) {
		var ret = -1;

		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		var is_component = false;
		var oldwindow, newwindow;

		if (obj._is_component) {
			is_component = true;
		}

		if (is_component) {
			oldwindow = obj._getWindow();
		}

		if (!obj.id) {
			obj.id = obj.name = id;
		}
		else {
			obj.id = id;
		}

		obj.parent = this;
		obj._refform = this;

		if (is_component) {
			newwindow = obj._getWindow();
		}

		this[id] = obj;
		this.all.add_item(id, obj);

		if (this.visible && !this._real_visible) {
			obj._real_visible = false;
		}
		else {
			obj._real_visible = this.visible;
		}

		if (is_component) {
			ret = this.components.add_item(id, obj);
			this._child_list.push(obj);

			if (oldwindow != newwindow) {
			}
			else if (obj._is_alive && obj._is_created) {
				this._control_element.appendChildElement(obj.getElement());
			}
		}
		else if (obj instanceof nexacro.BindItem) {
			ret = this.binds.add_item(id, obj);
		}
		else {
			ret = this.objects.add_item(id, obj);
		}
		return ret;
	};

	_pForm.resetScroll = function () {
		if (this._is_created_contents) {
			var comp;
			var comps = this.components;
			for (var i = 0, n = comps.length; i < n; i++) {
				comp = comps[i];
				if (comp._arrange_info || (comp.fittocontents != "none")) {
					comp._update_position();
				}
			}
		}

		if (this._is_scrollable) {
			this._onRecalcScrollSize();
			this._onResetScrollBar();
		}
	};

	_pForm.close = function (arg) {
		if (this._closing) {
			return;
		}

		if (!this.parent || !this.parent._is_frame) {
			return;
		}

		this.setWaitCursor(false, null);

		var childframe = this.parent;

		var confirm_message = childframe._on_beforeclose();
		if (childframe._checkAndConfirmClose(confirm_message) == false) {
			return false;
		}

		if (childframe._window) {
			childframe._window._ignore_close_confirm = true;
		}

		this._closing = true;
		childframe._on_close();
		this._closing = null;

		if (typeof (arg) == "object") {
			arg = null;
		}

		if (this.parent) {
			this.parent._closeForm(arg);
		}
	};

	_pForm.getFirstComponent = function (no_composite_flag) {
		if (no_composite_flag !== true) {
			no_composite_flag = false;
		}
		var ar = this._getComponentsByTaborder(this, 6);

		var comp = null;
		if (ar && ar.length > 0) {
			comp = ar[0];
		}

		if (no_composite_flag) {
			var first = comp;
			while (first && first._hasContainer()) {
				first = first._getTabOrderFirst(6);
				if (!first) {
					break;
				}

				comp = first;
			}
		}

		if (comp && comp instanceof nexacro.Tabpage) {
			comp = comp.parent;
		}

		return comp;
	};

	_pForm.getLastComponent = function (no_composite_flag) {
		if (no_composite_flag !== true) {
			no_composite_flag = false;
		}
		var ar = this._getComponentsByTaborder(this, 6);

		var comp = null;
		if (ar && ar.length > 0) {
			comp = ar[ar.length - 1];
		}

		if (no_composite_flag) {
			var last = comp;
			while (last && last._hasContainer()) {
				last = last._getTabOrderLast(6);
				if (!last) {
					break;
				}

				comp = last;
			}
		}

		if (comp && comp instanceof nexacro.Tabpage) {
			comp = comp.parent;
		}

		return comp;
	};

	_pForm._getNextComponent = function (comp, no_composite_flag, only_enable_flag) {
		if (no_composite_flag !== true) {
			no_composite_flag = false;
		}
		if (only_enable_flag !== true) {
			only_enable_flag = false;
		}

		var tabstop_ar = this._getComponentsByTaborder(this, 6);
		var all_ar = this._getComponentsByTaborder(this, 7);

		var cur_idx = nexacro._indexOf(tabstop_ar, comp._getRootComponent(comp));
		if (cur_idx < 0) {
			var cur_all_idx = nexacro._indexOf(all_ar, comp._getRootComponent(comp));
			var i;

			if (cur_all_idx < 0) {
				return null;
			}

			i = cur_all_idx - 1;
			while ((i >= 0 && i < all_ar.length)) {
				comp = all_ar[i];
				cur_idx = nexacro._indexOf(tabstop_ar, comp._getRootComponent(comp));
				if (cur_idx >= 0) {
					break;
				}

				i--;
			}
		}

		var next;
		if (only_enable_flag) {
			next = this._searchNextTabFocus(comp, false, undefined, no_composite_flag ? 0 : 4);
		}
		else {
			next = this._searchNextTabFocus(comp, false, undefined, no_composite_flag ? 2 : 6);
		}

		if (next && next.length > 0) {
			return next[0];
		}

		return null;
	};
	_pForm.getNextComponent = function (comp, no_composite_flag) {
		return this._getNextComponent(comp, no_composite_flag, true);
	};

	_pForm._getPrevComponent = function (comp, no_composite_flag, only_enable_flag) {
		if (no_composite_flag !== true) {
			no_composite_flag = false;
		}
		if (only_enable_flag !== true) {
			only_enable_flag = false;
		}

		var tabstop_ar = this._getComponentsByTaborder(this, 6);
		var all_ar = this._getComponentsByTaborder(this, 7);

		var cur_idx = nexacro._indexOf(tabstop_ar, comp._getRootComponent(comp));
		if (cur_idx < 0) {
			var cur_all_idx = nexacro._indexOf(all_ar, comp._getRootComponent(comp));
			var i;

			if (cur_all_idx < 0) {
				var parent = (comp.parent instanceof nexacro._InnerForm) ? comp.parent.parent : comp.parent;
				var parent_form = parent._getForm();
				if (parent_form instanceof nexacro.ChildFrame) {
					return null;
				}
				return parent_form._getPrevComponent(parent, no_composite_flag, only_enable_flag);
			}

			i = cur_all_idx + 1;
			while ((i >= 0 && i < all_ar.length)) {
				comp = all_ar[i];
				cur_idx = nexacro._indexOf(tabstop_ar, comp._getRootComponent(comp));
				if (cur_idx >= 0) {
					break;
				}

				i++;
			}
		}

		var prev = null;

		if (only_enable_flag) {
			if (no_composite_flag) {
				prev = this._searchPrevTabFocus(comp, false, undefined, 0);
			}
			else {
				prev = this._searchPrevTabFocus(comp, false, undefined, 4);
			}
		}
		else {
			if (no_composite_flag) {
				prev = this._searchPrevTabFocus(comp, false, undefined, 2);
			}
			else {
				if (cur_idx > 0) {
					prev = tabstop_ar[cur_idx - 1];
				}
				else if (cur_idx == 0) {
					prev = tabstop_ar[tabstop_ar.length - 1];
				}
			}
		}

		if (prev && prev.length > 0) {
			return prev[0];
		}

		return prev;
	};

	_pForm.getPrevComponent = function (comp, no_composite_flag) {
		return this._getPrevComponent(comp, no_composite_flag);
	};



	_pForm.getFocus = function () {
		var last_focus = this._find_lastFocused();
		if (last_focus == null) {
			return this;
		}
		return last_focus;
	};

	_pForm.go = function (strUrl) {
		if (this._orgurl != strUrl) {
			if (this._orgurl != "") {
				var confirm_message = this._on_beforeclose();

				if (this._checkAndConfirmClose(confirm_message) == false) {
					return;
				}

				this._on_close();
			}

			this._clearComponent();
			this._initComponent();

			if (strUrl) {
				this.loadForm(strUrl, this._async, true);
				this.set_visible(true);
			}
		}
	};

	_pForm.hasPopupFrame = function () {
		var frame;
		var i, len;
		var popupframes = nexacro.getPopupFrames(this);
		if (popupframes) {
			for (i = 0, len = popupframes.length; i < len; i++) {
				frame = popupframes[i];
				if (frame && this === frame.opener) {
					return true;
				}
			}
		}

		var win = this._getWindow();
		var modalframes = win._modal_frame_stack;
		var modal_info;

		if (modalframes) {
			for (i = 0, len = modalframes.length; i < len; i++) {
				modal_info = modalframes[i];
				frame = modal_info[0];
				if (frame && this === frame.opener) {
					return true;
				}
			}
		}

		return false;
	};

	_pForm.insertChild = function (idx, id, obj) {
		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			return -1;
		}
		if (this[id]) {
			return -1;
		}

		if (!obj.id) {
			obj.id = obj.name = id;
		}
		else {
			obj.id = id;
		}

		obj.parent = this;
		obj._refform = this;

		this[id] = obj;
		this.all.add_item(id, obj);
		var ret;
		if (obj._is_component) {
			ret = this.components.insert_item(idx, id, obj);
			this._child_list.push(obj);
			if (obj._is_alive && obj._is_created) {
				var beforecomp = this.components[idx + 1];
				this._control_element.insertChildElement(obj.getElement(), beforecomp ? beforecomp.getElement() : null);
			}
		}
		else if (obj instanceof nexacro.BindItem) {
			ret = this.binds.insert_item(idx, id, obj);
		}
		else {
			ret = this.objects.insert_item(idx, id, obj);
		}


		return ret;
	};

	_pForm.isValidObject = function (target) {
		if (typeof target == "string") {
			if (this[target]) {
				return true;
			}
		}
		else if (target instanceof Object) {
			var len = this.all.length;
			for (var i = 0; i < len; i++) {
				if (this.all[i] == target) {
					return true;
				}
			}
		}
		else {
			if (nexacro._indexOf(this.all, target) > -1) {
				return true;
			}
		}
		return false;
	};

	_pForm.killTimer = function (nTimerID) {
		this._timerManager.deleteTimer(nTimerID);
	};

	_pForm.setTimer = function (nTimerID, nElapse) {
		var timer = new nexacro._EventTimer(this, nTimerID, nElapse);
		timer.start();
	};

	_pForm.loadStyle = function (url, bclear) {
		if ((typeof (url) != "string") || url.length == 0) {
			return;
		}
		bclear = bclear == false ? false : true;
		var exceptcssselector = true;

		if (bclear) {
			exceptcssselector = false;
		}

		this._clearCssInfo(exceptcssselector);

		var base_url = this._base_url;
		var cssurl = [];
		cssurl.push(nexacro._getServiceLocation(url, base_url));
		cssurl.push(".js");

		var service = nexacro._getServiceObject(url);
		this._load_manager.reloadCssModule(cssurl.join(""), null, false, service);

		this._resetFormStatus(this);
	};

	_pForm.reload = function () {
		var strUrl = this._orgurl ? this._orgurl : this.parent._formurl;

		this._clearComponent();
		this._initComponent();

		if (strUrl) {
			this.loadForm(strUrl, this._async, true);
			this.set_visible(true);
		}
	};

	_pForm.removeChild = function (id) {
		if (!id || id.length <= 0) {
			return null;
		}

		var obj = this[id];
		if (!obj) {
			return null;
		}

		if (obj._is_component) {
			var is_focused = false;
			var _window = this._getWindow();
			if (_window) {
				is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
			}

			if (this._defaultbutton == obj) {
				this._defaultbutton = null;
			}
			if (this._escapebutton == obj) {
				this._escapebutton = null;
			}


			if (this._bind_manager) {
				this._bind_manager._dettachSBindItem(obj);
			}

			this.components.delete_item(id);
			var cidx = nexacro._indexOf(this._child_list, obj);
			if (cidx > -1) {
				this._child_list.splice(cidx, 1);
			}

			if (this._is_alive && obj._control_element) {
				if (obj._control_element) {
					obj._control_element._removeFromContainer();
				}

				if (is_focused) {
					if (obj instanceof nexacro.Form) {
						obj._on_deactivate();
					}

					_window._removeFromCurrentFocusPath(obj, true);
					_window._last_focused_elem = this._control_element;

					this._on_focus(true);
				}
			}
		}
		else if (obj instanceof nexacro.BindItem) {
			this._bind_manager._setBinditem(obj, true);
			this.binds.delete_item(id);
		}
		else {
			this.objects.delete_item(id);
		}

		obj.parent = null;
		delete this[id];
		this.all.delete_item(id);

		return obj;
	};


	_pForm.setWaitCursor = function (wait_flag, forcely_flag) {
		var wait = wait_flag;
		var forcely = forcely_flag;
		if (wait == undefined) {
			wait = true;
		}
		if (forcely == undefined) {
			forcely = false;
		}

		if (!forcely && !nexacro._usewaitcursor) {
			return;
		}



		this._waitCursor(wait, null);
	};

	_pForm.sleep = function (nMilliseconds) {
		var then = new Date().getTime();
		var now = then;

		while ((now - then) < nMilliseconds) {
			now = new Date().getTime();
		}
	};

	_pForm.transaction = function (id, url, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress) {
		var realurl = nexacro._getServiceLocation(url, this._base_url, null, false);
		var service = nexacro._getServiceObject(url, true);

		this._load_manager.loadDataModule(realurl, id, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress, service);
	};

	_pForm.cancelTransaction = function (id) {
		if (!this._load_manager) {
			return -1;
		}
		var datalist = this._load_manager.dataList;
		if (!datalist) {
			return -1;
		}

		if (id != undefined) {
			var datalistid = (typeof id == "string") ? id.split(",") : id;
			if (datalistid.length > 0) {
				var datalistfilter = [];
				for (var k = 0; k < datalist.length; k++) {
					datalistfilter[k] = datalist[k].url;
				}

				var j, i, datalistfiltered = [];
				for (j = 0; datalistfilter.length > j; j++) {
					var datalistfound = false;
					for (i = 0; datalistid.length > i; i++) {
						if (datalistid[i] == datalistfilter[j]) {
							datalistfound = true;
							break;
						}
					}
					if (!datalistfound) {
						datalistfiltered.push(datalistfilter[j]);
					}
				}

				for (j = datalistfiltered.length - 1; j >= 0; j--) {
					for (i = datalist.length - 1; i >= 0; i--) {
						if (datalist[i].url == datalistfiltered[j]) {
							datalist = nexacro._removedatalist(datalist, i);
						}
					}
				}
			}
		}

		this._stopTransaction(true);
	};

	_pForm.updateWindow = function () {
	};

	_pForm.getStepCount = function () {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			return step_ctrl.stepcount;
		}

		return 0;
	};

	_pForm.setStepCount = function (cnt) {
		if (isNaN(cnt = +cnt) || cnt < 0) {
			return;
		}

		var idx, pre_idx, pre_cnt, xy, idx, layout;
		var layout_list_len = this._layout_list.length;
		if (layout_list_len >= 1) {
			xy = {
				cx : this._adjust_width, 
				cy : this._adjust_height
			};
			idx = nexacro._getLayoutManager().checkValid(this, xy);
			layout = this._layout_list[idx];
		}

		if (!this.stepselector) {
			if (!cnt) {
				return;
			}
			this._createStepControl(cnt, 0);
			this.stepselector.on_created();

			this._on_prepare_stepcontents(0, -1, cnt, 0);
			this._on_refresh_stepcontents(0, -1, cnt, 0);
		}
		else {
			var step_ctrl = this.stepselector;

			if (step_ctrl) {
				idx = step_ctrl.stepindex;
				pre_idx = step_ctrl.stepindex;
				pre_cnt = step_ctrl.stepcount;

				if (pre_idx >= cnt) {
					idx = cnt - 1 >= 0 ? cnt - 1 : 0;
				}

				if (idx < 0 && cnt > 0) {
					idx = 0;
				}

				this._on_prepare_stepcontents(pre_cnt, pre_idx, cnt, idx);
				this._on_refresh_stepcontents(pre_cnt, pre_idx, cnt, idx);
			}
		}

		if (this.stepselector && layout) {
			layout.set_stepcount(this.stepselector.stepcount);
		}
	};

	_pForm.setStepIndex = function (index) {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			return step_ctrl.set_stepindex(index);
		}

		return false;
	};

	_pForm.getStepIndex = function () {
		var step_ctrl = this.stepselector;
		if (step_ctrl) {
			return step_ctrl.stepindex;
		}

		return -1;
	};

	_pForm.applyChange = function () {
		var comp = this._last_focused;
		if (!comp) {
			return;
		}
		comp.applyto_bindSource("value", comp.value);

		var binds = this.binds;
		var len = binds.length;
		for (var i = 0; i < len; i++) {
			var bind_item = binds[i];
			if (bind_item._comp == comp && bind_item.propid == "value") {
				this._bind_manager._notify(bind_item);
				return;
			}
		}
	};

	_pForm.getCurrentLayoutID = function () {
		return this._current_layout_name;
	};


	_pForm.getViewDataset = nexacro._emptyFn;
	_pForm._onRecalcScrollSize = function (fromComp) {
		var control_elem = this._control_element;
		if (this._is_scrollable && control_elem) {
			var w = 0, h = 0;
			var container_width = control_elem.getContainerElement(control_elem._step_index).width;
			var container_height = control_elem.getContainerElement(control_elem._step_index).height;

			var container_maxwidth = control_elem.container_maxwidth;
			var container_maxheight = control_elem.container_maxheight;
			var zoom_factor = this._getZoom() / 100;
			var offsetbottom;
			container_width = container_width / zoom_factor;
			container_height = container_height / zoom_factor;

			container_maxwidth = container_maxwidth / zoom_factor;
			container_maxheight = container_maxheight / zoom_factor;

			if (!fromComp) {
				var i, n, comp, comps = this.components;
				if (this.stepselector && this.stepselector.stepcount > 0) {
					var cur_stepindex = this.stepselector.stepindex;
					for (i = 0, n = comps.length; i < n; i++) {
						comp = comps[i];
						if (comp && comp.visible && comp.positionstep < this.stepselector.stepcount) {
							offsetbottom = comp.getOffsetBottom();

							h = Math.max(h, offsetbottom);
						}
					}
					var _width = this.width;
					if (nexacro._isString(_width)) {
						_width = nexacro._toInt(_width);
					}
					w = _width *  this.stepselector._poststepcount;
				}
				else {
					for (i = 0, n = comps.length; i < n; i++) {
						comp = comps[i];
						if (comp && comp.visible) {
							var offsetright = comp.getOffsetRight();
							offsetbottom = comp.getOffsetBottom();

							w = Math.max(w, offsetright);
							h = Math.max(h, offsetbottom);
						}
					}
				}

				w = Math.max(w, container_width);
				if (!this.stepselector) {
					h = Math.max(h, container_height);
				}
				h = Math.max(h, container_height);

				control_elem.setElementScrollMaxSize(w, h);
			}
			else if (fromComp.visible) {
				var offsetRight = fromComp.getOffsetRight();
				var offsetBottom = fromComp.getOffsetBottom();

				if (container_maxwidth < offsetRight || container_maxheight < offsetBottom) {
					w = Math.max(container_maxwidth, offsetRight);
					h = Math.max(container_maxheight, offsetBottom);
					control_elem.setElementScrollMaxSize(w, h);
				}
			}
		}
	};

	_pForm._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._is_frame) {
				return;
			}

			var parent = this.parent;

			var hscroll = this.hscrollbar;
			var vscroll = this.vscrollbar;

			var hpos = 0;
			var vpos = 0;
			var form_left = (this instanceof nexacro._InnerForm) ? parent._adjust_left : this._adjust_left;
			var form_top = (this instanceof nexacro._InnerForm) ? parent._adjust_top : this._adjust_top;
			var client_width = control_elem.getClientWidth();
			var client_height = control_elem.getClientHeight();

			if (hscroll && (hscroll.visible || (hscroll instanceof nexacro.ScrollIndicatorControl))) {
				hpos = hscroll.pos;
				if (this.scrolltype != "vertical" && this.scrolltype != "none") {
					if (left - hpos < client_width && right - hpos > client_width) {
						if (focus_direction == 1 && right - left > client_width) {
							hscroll.set_pos(right - client_width);
						}
						else {
							hscroll.set_pos(left);
						}
					}
					else if (hpos > left || (left - hpos > client_width)) {
						var _hpos;
						if (focus_direction == 1 && right - left > client_width) {
							_hpos = right - client_width;
						}
						else {
							_hpos = left;
						}
						hscroll.set_pos(_hpos);
					}
				}
				hpos = hscroll.pos;
			}

			if (vscroll && (vscroll.visible || (vscroll instanceof nexacro.ScrollIndicatorControl))) {
				vpos = vscroll.pos;
				if (this.scrolltype != "horizontal" && this.scrolltype != "none") {
					if (top - vpos < client_height && bottom - vpos > client_height) {
						if (focus_direction == 1 && bottom - top > client_height) {
							vscroll.set_pos(bottom - client_height);
						}
						else {
							vscroll.set_pos(top);
						}
					}
					else if ((vpos > top) || (top - vpos >= client_height)) {
						var _vpos;
						if (focus_direction == 1 && bottom - top > client_height) {
							_vpos = bottom - client_height;
						}
						else {
							_vpos = top;
						}
						vscroll.set_pos(_vpos);
					}
				}
				vpos = vscroll.pos;
			}

			left = form_left + left - hpos;
			top = form_top + top - vpos;
			right = form_left + right - hpos;
			bottom = form_top + bottom - vpos;

			if (!this._is_popup_control && parent && parent != this) {
				parent._resetScrollPos(this, left, top, right, bottom, focus_direction);
			}
		}
	};

	_pForm._resetFormStatus = function (obj) {
		var i, n, comp;
		var comps = obj.components;

		for (i = 0, n = comps.length; i < n; i++) {
			comp = comps[i];
			if (comp) {
				if (comp._is_form) {
					comp._apply_status("");
					this._resetFormStatus(comp);
				}
				else {
					comp._apply_status("");
				}
			}
		}

		this._apply_status("");
	};

	_pForm._calcScrollMaxSize = function () {
		var control_elem = this._control_element;
		if (this._is_scrollable && control_elem) {
			var _w = 0, _h = 0;
			var comps = this.components;
			for (var i = 0, n = comps.length; i < n; i++) {
				var comp = comps[i];
				if (comp && comp.visible) {
					var offsets = comp._getFixedOffsetValue();
					_w = Math.max(_w, offsets.right);
					_h = Math.max(_h, offsets.bottom);
				}
			}

			return {
				w : _w, 
				h : _h
			};
		}
		return {
			w : -1, 
			h : -1
		};
	};

	_pForm._setSize = function (width, height) {
		if (this._adjust_width != width || this._adjust_height != height) {
			var keyboardheight = this._height - height;
			var focused_comp = null;

			this.width = this._width = width;
			this.height = this._height = height;

			this._adjustPosition();
			var bAdjustVScroll = false;

			if (this._layout_list && this._layout_list.length > 0) {
				var layoutmanger = nexacro._getLayoutManager();
				if (layoutmanger && layoutmanger._cancelChangeLayout !== undefined) {
					if (this.getOwnerFrame()._activate) {
						layoutmanger._cancelChangeLayout = false;
					}
					focused_comp = this._last_focused;

					var input_top = 0, input_height = 0;
					if (focused_comp) {
						input_top = focused_comp._adjust_top;
						input_height = focused_comp._adjust_height;

						while (focused_comp.form) {
							if (!focused_comp.form._last_focused) {
								break;
							}
							focused_comp = focused_comp.form._last_focused;
							input_top += focused_comp._adjust_top;
							input_height = focused_comp._adjust_height;
						}
					}

					bAdjustVScroll = this._vscroll_pos + height < input_top + input_height;
				}
				else {
					var layout = this._checkValidLayout();
					if (layout) {
						var control_elem = layout._form.getElement();
						if (control_elem) {
							control_elem.setElementSize(width, height);
						}
					}
				}
			}

			this.on_update_position(true, false);
			if (bAdjustVScroll) {
				this.getElement().setElementVScrollPos(this._vscroll_pos + keyboardheight);

				if (this.getOwnerFrame()._activate) {
					focused_comp.setFocus();
				}
			}
		}
	};

	_pForm._setZoom = function (v) {
		var prevZoomFactor = this._getZoom();
		if (typeof v == "string" && v.charAt(v.length - 1) == "%") {
			v = v.slice(0, v.length - 1);
		}

		v = parseFloat(v) | 0;
		if (v <= 0 || v == prevZoomFactor) {
			return prevZoomFactor;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			this._zoomFactor = v;

			control_elem.container_maxwidth = 0;
			control_elem.container_maxheight = 0;
			control_elem.setElementScrollMaxSize(0, 0);


			this._client_width = 0;
			this._client_height = 0;

			control_elem.setElementZoom(v);
			nexacro._applyZoomEdge(control_elem, v);

			var popups = nexacro._current_popups;
			var len = popups.length;
			for (var i = 0; i < len; i++) {
				if (this._contains(popups[i])) {
					popups[i].parent._applyZoomPopup();
				}
			}
		}

		this.on_fire_onzoom(v, this, this);

		return prevZoomFactor;
	};

	_pForm._getZoom = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			return (this._zoomFactor !== undefined) ? this._zoomFactor : control_elem.zoom;
		}

		return 100;
	};

	_pForm._setFormPosition = function (width, height) {
		this._init_width = width;
		this._init_height = height;
	};

	_pForm._setDragMove = function (v, is_windowframe) {
		if (v && is_windowframe) {
			this._hittest_type = "caption";
		}
		else {
			this._hittest_type = "none";
		}

		this.on_apply_hittesttype();
	};

	_pForm._stopTransaction = function (is_cancel) {
		if (!this._load_manager) {
			return -1;
		}
		var datalist = this._load_manager.dataList;
		if (!datalist) {
			return -1;
		}

		var trlist = this._load_manager.transactionList;
		var idx = 0;
		var pre_len = datalist.length;
		var canceledCnt = 0;
		var tritem;
		while (idx < datalist.length) {
			var dataitem = datalist[idx];
			if (!dataitem) {
				idx++;
				continue;
			}

			var dataitem_handle = dataitem.handle;
			if (!dataitem_handle) {
				idx++;
				continue;
			}

			if (dataitem._is_cancel || dataitem._is_process) {
				idx++;
				pre_len = datalist.length;
				continue;
			}

			if (!is_cancel) {
				dataitem_handle._user_aborted = false;
				tritem = trlist[idx];
				if (tritem) {
					var ret = tritem.on_error(-1, "comm_stop_transaction_byesc", nexacro._CommunicationStatusTable.stop_transaction_byesc, "");
					if (ret) {
						dataitem._is_process = true;
						dataitem_handle._user_aborted = undefined;
						idx++;
						continue;
					}
				}
			}

			dataitem_handle._user_aborted = true;
			dataitem._is_cancel = true;


			if (nexacro._Browser == "Runtime") {
				nexacro._cancelLoad(dataitem_handle);
			}
			else {
				tritem = trlist[idx];
				nexacro._cancelLoad(dataitem_handle);
				if (tritem) {
					tritem.on_error(0, "comm_cancel_byuser", nexacro._CommunicationStatusTable.cancel_byuser);
				}
			}

			canceledCnt++;

			if (pre_len == datalist.length) {
				idx++;
			}
			else {
				idx = 0;
				pre_len = datalist.length;
			}
		}


		return canceledCnt;
	};

	_pForm._dragEnd = function (info) {
		var control_elem = this.getElement();
		if (control_elem) {
			var stepselector = this.stepselector;
			if (stepselector) {
				var step_count = control_elem._step_count;
				var step_index = control_elem._step_index;
				var direction = info.direction;
				if (step_count > 0) {
					var new_index = -1;
					if (direction == "L") {
						new_index = step_index + 1;
					}
					else if (direction == "R") {
						new_index = step_index - 1;
					}
					if (new_index < 0 || new_index >= step_count) {
						return;
					}
					stepselector.set_stepindex(new_index);
				}
			}
		}
	};

	_pForm._getDefaultButton = function () {
		var comps = this.components;
		if (comps) {
			var comp;
			for (var i = 0; i < comps.length; i++) {
				comp = comps[i];
				if (comp._is_form) {
					var btn = comp._getDefaultButton();
					if (btn) {
						return btn;
					}
				}
				else if (nexacro._toBoolean(comp.defaultbutton)) {
					return comp;
				}
			}
		}
		return null;
	};

	_pForm._getEscapeButton = function () {
		var comps = this.components;
		if (comps) {
			var comp;
			for (var i = 0; i < comps.length; i++) {
				comp = comps[i];
				if (comp._is_form) {
					var btn = comp._getEscapeButton();
					if (btn) {
						return btn;
					}
				}
				else if (nexacro._toBoolean(comp.escapebutton)) {
					return comp;
				}
			}
		}
		return null;
	};

	_pForm._getAccessibilityWholeReadLabel = function () {
		var readlabel = "";
		var comp, ar = this._getSortedDecendants(this, true, true);
		for (var i = 0; i < ar.length; i++) {
			comp = ar[i];
			if (comp._isAccessibilityEnable()) {
				var label = comp._getAccessibilityReadLabel(true);
				if (label) {
					label = label.trim();
					if (label && label.length > 0) {
						readlabel += label + " ";
					}
				}
			}
		}
		return readlabel;
	};

	_pForm._playAccessibilityWholeReadLabel = function (type) {
		if (!nexacro._isDesktop()) {
			return;
		}

		var control = this.getElement();
		if (control) {
			var label = this._getAccessibilityWholeReadLabel();
			control.notifyAccessibility(label, type);
		}
	};

	_pForm._getSortedDecendants = function (p, include_not_tabstop, bAccessibility) {
		if (include_not_tabstop === undefined) {
			include_not_tabstop = false;
		}

		var ar = [];
		var comps = p.components;
		if (comps) {
			var comp_len = comps.length;
			for (var i = 0; i < comp_len; i++) {
				var comp = comps[i];

				if (!comp || !comp._is_created || !comp.visible || ((comp._isEnable && !comp._isEnable() || !comp.enable) && (!nexacro._enableaccessibility || nexacro._accessibilitytype != 5)) || comp._popup) {
					continue;
				}

				if (!bAccessibility && !include_not_tabstop && !comp.on_get_prop_tabstop()) {
					continue;
				}

				var tabidx = comp._taborder;
				if (tabidx < 0) {
					tabidx = 0;
				}
				var j = ar.length;
				while (j > 0 && ar[j - 1]._taborder > tabidx) {
					ar[j] = ar[j - 1];
					j--;
				}
				ar[j] = comp;
			}
		}
		return ar;
	};

	_pForm._getAsync = function () {
		return this._async;
	};
	_pForm.on_notifytrigger = function (obj, info) {
		if (info) {
			var manager = this._trigger_manager;
			var triggertype = info.eventid;
			for (var v in nexacro._trigger_type_table) {
				if (nexacro._trigger_type_table[v] == info.eventid) {
					triggertype = v;
					break;
				}
			}

			var triggerobj = obj;
			var triggerview = this;

			if (manager) {
				manager._notifyTrigger(triggertype, triggerobj, triggerview);
			}
		}
	};

	_pForm._setTriggerInfo = function (contents) {
		if (this._trigger_manager) {
			this._trigger_manager._settriggerinfo(contents);
			this._trigger_manager.inittriggerinfo();
		}
	};


	_pForm._applyBinditemEnable = function (binds) {
		for (var i = 0, n = binds.length; i < n; i++) {
			var bindItem = binds[i];
			var ds = bindItem._dataset;
			var comp = bindItem._comp;
			if (ds && comp) {
				var row_idx = ds.rowposition;
				if (bindItem._en_type == 2) {
					if (comp.enable && comp.parent._isEnable()) {
						if (row_idx < 0) {
							comp._setEnable(false);
						}
					}
				}
			}
		}
	};


	delete _pForm;

	if (!nexacro._InnerForm) {
		nexacro._InnerForm = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.Form.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		};

		var _pInnerForm = nexacro._createPrototype(nexacro.Form, nexacro._InnerForm);
		nexacro._InnerForm.prototype = _pInnerForm;
		_pInnerForm._type_name = "Form";

		_pInnerForm._is_subcontrol = false;

		_pInnerForm.on_created_contents = function (win) {
			nexacro.FormBase.prototype.on_created_contents.call(this, win);
			this._changeUserStatus("contents", true);
		};

		_pInnerForm._initProperties = function () {
			this._refform = this;

			this.init("_inner_form", 0, 0, this.parent._getClientWidth(), this.parent._getClientHeight());

			this._child_list = [];
			this._hotkey_list = [];
			this._includescriptlist = [];
			this._load_callbacklist = [];

			this._chk_recalc_scroll = [];
		};

		_pInnerForm.on_update_position = function (resize_flag, move_flag, update) {
			nexacro.Form.prototype.on_update_position.call(this, resize_flag, move_flag, update);
		};

		_pInnerForm.on_changeUserStatus = function (changestatus, value, applyuserstatus) {
			if (value) {
				return changestatus;
			}

			return applyuserstatus;
		};

		_pInnerForm._on_load = function (obj, url) {
			nexacro.Form.prototype._on_load.call(this, obj, url);

			if (this.parent) {
				this.parent.applyTransitionEffect();
			}
		};

		_pInnerForm.set_url = function (v) {
			this.parent.set_url(v);
		};

		_pInnerForm.loadForm = function (formurl, async, reload, baseurl) {
			var parent_context = this.getParentContext();
			var is_async;

			if (async) {
				while (parent_context && parent_context._is_form) {
					is_async = parent_context._getAsync();
					if (!parent_context._is_fired_onload && is_async === false) {
						async = false;
						break;
					}
					parent_context = parent_context.getParentContext();
				}
			}

			if (this._load_manager) {
				var url = nexacro._getFDLLocation(formurl, baseurl);

				var parent = this.parent;
				while (parent && !parent._is_frame) {
					if (parent._is_form) {
						var _p_url = parent._url;
						if (url == _p_url) {
							trace("[ERROR] can not use same url with parent form");
							return;
						}
					}
					parent = parent.parent;
				}

				this._url = url;
				this._orgurl = formurl;

				this._base_url = nexacro._getBaseUrl(url);

				if (this._load_manager) {
					this._load_manager.clearAllLoad();
				}

				this._clearUserFunctions();

				this._is_loading = true;
				if (this.parent._is_frame && this.parent.form == this) {
					var application = nexacro.getApplication();
					if (application) {
						application._registerLoadforms(this);
					}
				}

				var service = nexacro._getServiceObject(formurl);

				if (this.parent._urlchangeeffect) {
					this.parent.beginTransitionEffect(this.parent._urlchangeeffect);
					this._load_manager._use_transition_effect = true;
				}

				this._asyncformload = async;
				this._load_manager.loadMainModule(url, undefined, async, reload, service);
			}
		};

		_pInnerForm.addChild = function (id, obj) {
			var ret = -1;

			if (id && id.length <= 0) {
				return -1;
			}
			if (!obj) {
				throw nexacro.MakeReferenceError(this, "reference_not_define", id);
			}

			if (this[id]) {
				throw nexacro.MakeNativeError(this, "native_exist_id", id);
			}

			if (!obj.id) {
				obj.id = obj.name = id;
			}
			else {
				obj.id = id;
			}

			obj.parent = this;
			obj._refform = this;

			this[id] = obj;
			this.all.add_item(id, obj);


			if (this.visible && !this._real_visible) {
				obj._real_visible = false;
			}
			else {
				obj._real_visible = this.visible;
			}

			if (obj._is_component) {
				ret = this.components.add_item(id, obj);
				this._child_list.push(obj);
				if (obj._is_alive && obj._is_created) {
					this._control_element.appendChildElement(obj.getElement());
				}
			}
			else if (obj instanceof nexacro.BindItem) {
				ret = this.binds.add_item(id, obj);
			}
			else {
				ret = this.objects.add_item(id, obj);
			}

			if (obj._is_component) {
				this.parent._destroyTextElement();
			}

			return ret;
		};

		_pInnerForm.insertChild = function (idx, id, obj) {
			var ret = nexacro.Form.prototype.insertChild.call(this, idx, id, obj);
			if (ret != -1) {
				if (obj._is_component) {
					this.parent._destroyTextElement();
				}
			}

			return ret;
		};

		_pInnerForm.removeChild = function (id) {
			var ret = nexacro.Form.prototype.removeChild.call(this, id);

			if (this.parent) {
				this.parent.on_apply_text();
			}

			if (this._last_focused) {
				if (this._last_focused.id == id) {
					this._last_focused = null;
				}
			}

			return ret;
		};

		_pInnerForm.go = function (strUrl) {
			if (this._orgurl != strUrl) {
				if (this._orgurl != "") {
					var confirm_message = this._on_beforeclose();

					if (this._checkAndConfirmClose(confirm_message) == false) {
						return;
					}

					this._on_close();
				}

				this._clearComponent();
				this._initComponent();

				if (strUrl) {
					this.parent.url = strUrl;
					this.loadForm(strUrl, this._async, true);
					this.set_visible(true);
				}
			}
		};

		_pInnerForm.reload = function () {
			this.parent.reload();
		};

		_pInnerForm.getOwnerFrame = function () {
			var frame = null;
			if (this.parent && !(this.parent instanceof nexacro.Frame)) {
				frame = this.parent.getOwnerFrame();
			}
			else {
				frame = this.parent;
			}
			return frame;
		};

		_pInnerForm.getParentContext = function () {
			return this.parent.getParentContext();
		};

		_pInnerForm.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
			this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		};

		_pInnerForm.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
			this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		};

		_pInnerForm.on_fire_onhscroll = function (eventid, pos, strType, evtkind) {
			nexacro.Component.prototype.on_fire_onhscroll.call(this, eventid, pos, strType, evtkind);
			nexacro.Component.prototype.on_fire_onhscroll.call(this.parent, eventid, pos, strType, evtkind);
		};

		_pInnerForm.on_fire_onvscroll = function (eventid, pos, strType, evtkind) {
			nexacro.Component.prototype.on_fire_onvscroll.call(this, eventid, pos, strType, evtkind);
			nexacro.Component.prototype.on_fire_onvscroll.call(this.parent, eventid, pos, strType, evtkind);
		};

		_pInnerForm._parseArrangeInfo = nexacro._emptyFn;

		delete _pInnerForm;
	}

	if (!nexacro._CompositeComponent) {
		nexacro._CompositeComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

			this.form = new nexacro._CompositeForm("form", 0, 0, width, height, null, null, null, null, null, null, this);
		};

		var _pCompositeComponent = nexacro._CompositeComponent.prototype = nexacro._createPrototype(nexacro.Component, nexacro._CompositeComponent);

		_pCompositeComponent._type_name = "CompositeComponent";


		_pCompositeComponent._apply_client_padding = false;
		_pCompositeComponent._is_simple_control = true;
		_pCompositeComponent._is_container = true;


		_pCompositeComponent.accessibilityrole = "form";

		_pCompositeComponent._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"onkeypress" : 1, 
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
			"oncontextmenu" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onmouseup" : 1, 
			"onmousedown" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"ondevicebuttonup" : 1
		};

		_pCompositeComponent._getFormPosition = function () {
			var left = 0;
			var top = 0;
			var width = 0;
			var height = 0;

			width = this._getClientWidth();
			height = this._getClientHeight();

			this._initCSSSelector();

			return {
				left : left, 
				top : top, 
				width : width, 
				height : height
			};
		};

		_pCompositeComponent.getParentContext = function () {
			return this.parent;
		};

		_pCompositeComponent.getOwnerFrame = function () {
			return this._getOwnerFrame();
		};

		_pCompositeComponent._destroyTextElement = function () {
		};

		_pCompositeComponent._destroyFormControl = function () {
			if (this.form) {
				this.form._destroy();
				this.form = null;
			}
		};

		_pCompositeComponent.on_create_contents = function () {
			this._load_module();
		};

		_pCompositeComponent.on_created_contents = function (win) {
			var form = this.form;
			if (form._is_loaded && !form._is_created) {
				form.createComponent();
			}

			this._recalcLayout();
		};

		_pCompositeComponent._load_module = function () {
			var refform = this._refform;
			if (refform) {
				var baseurl = refform._getRefFormBaseUrl();
				var form = this.form;

				var module = this._get_form_module();
				if (module) {
					var url = nexacro._getFDLLocation("CompositeInner.xfdl", baseurl);
					form.loadModule(url, module);
				}
			}
		};

		_pCompositeComponent.on_destroy_contents = function () {
			this._destroyFormControl();
		};

		_pCompositeComponent.on_create_contents_command = function () {
			var str = "";

			return str;
		};

		_pCompositeComponent.on_attach_contents_handle = function (win) {
			var form = this.form;

			if (form._is_loaded && !form._is_created) {
				form.createComponent();
			}

			this._recalcLayout();
		};

		_pCompositeComponent.on_change_containerRect = function (width, height) {
			this._recalcLayout();
		};

		_pCompositeComponent.on_change_containerPos = function () {
		};

		_pCompositeComponent.on_apply_prop_enable = function (v) {
			if (this.form) {
				this.form._setEnable(v);
			}
		};

		_pCompositeComponent.set_padding = nexacro._emptyFn;
		_pCompositeComponent.set_scrollbarbarminsize = function (scrollbarbarminsize) {
			if (scrollbarbarminsize !== undefined) {
				scrollbarbarminsize = parseInt(scrollbarbarminsize);
				if (isNaN(scrollbarbarminsize)) {
					return;
				}
			}

			if (this.scrollbarbarminsize != scrollbarbarminsize) {
				this.scrollbarbarminsize = scrollbarbarminsize;
				nexacro.Component.prototype.set_scrollbarbarminsize.call(this.form, scrollbarbarminsize);
			}
		};

		_pCompositeComponent.set_scrollbarbaroutsize = function (scrollbarbaroutsize) {
			if (scrollbarbaroutsize !== undefined) {
				scrollbarbaroutsize = parseInt(scrollbarbaroutsize);
				if (isNaN(scrollbarbaroutsize)) {
					return;
				}
			}

			if (this.scrollbarbaroutsize != scrollbarbaroutsize) {
				this.scrollbarbaroutsize = scrollbarbaroutsize;
				nexacro.Component.prototype.set_scrollbarbaroutsize.call(this.form, scrollbarbaroutsize);
			}
		};

		_pCompositeComponent.set_scrollbardecbuttonsize = function (scrollbardecbuttonsize) {
			if (scrollbardecbuttonsize !== undefined) {
				scrollbardecbuttonsize = parseInt(scrollbardecbuttonsize);
				if (isNaN(scrollbardecbuttonsize)) {
					return;
				}
			}

			if (this.scrollbardecbuttonsize != scrollbardecbuttonsize) {
				this.scrollbardecbuttonsize = scrollbardecbuttonsize;
				nexacro.Component.prototype.set_scrollbardecbuttonsize.call(this.form, scrollbardecbuttonsize);
			}
		};

		_pCompositeComponent.set_scrollbarincbuttonsize = function (scrollbarincbuttonsize) {
			if (scrollbarincbuttonsize !== undefined) {
				scrollbarincbuttonsize = parseInt(scrollbarincbuttonsize);
				if (isNaN(scrollbarincbuttonsize)) {
					return;
				}
			}

			if (this.scrollbarincbuttonsize != scrollbarincbuttonsize) {
				this.scrollbarincbuttonsize = scrollbarincbuttonsize;
				nexacro.Component.prototype.set_scrollbarincbuttonsize.call(this.form, scrollbarincbuttonsize);
			}
		};

		_pCompositeComponent.set_scrollbarsize = function (scrollbarsize) {
			if (scrollbarsize !== undefined) {
				scrollbarsize = parseInt(scrollbarsize);
				if (isNaN(scrollbarsize)) {
					return;
				}
			}

			if (this.scrollbarsize != scrollbarsize) {
				this.scrollbarsize = scrollbarsize;
				nexacro.Component.prototype.set_scrollbarsize.call(this.form, scrollbarsize);
			}
		};

		_pCompositeComponent.set_scrollbartrackbarsize = function (scrollbartrackbarsize) {
			if (scrollbartrackbarsize !== undefined) {
				scrollbartrackbarsize = parseInt(scrollbartrackbarsize);
				if (isNaN(scrollbartrackbarsize)) {
					return;
				}
			}

			if (this.scrollbartrackbarsize != scrollbartrackbarsize) {
				this.scrollbartrackbarsize = scrollbartrackbarsize;
				nexacro.Component.prototype.set_scrollbartrackbarsize.call(this.form, scrollbartrackbarsize);
			}
		};

		_pCompositeComponent.set_scrollbartype = function (scrollbartype) {
			if (this.scrollbartype != scrollbartype) {
				this.scrollbartype = nexacro.Component.prototype.set_scrollbartype.call(this.form, scrollbartype);
			}
		};

		_pCompositeComponent.set_scrollindicatorsize = function (scrollindicatorsize) {
			if (scrollindicatorsize !== undefined) {
				scrollindicatorsize = parseInt(scrollindicatorsize);
				if (isNaN(scrollindicatorsize)) {
					return;
				}
			}

			if (this.scrollindicatorsize != scrollindicatorsize) {
				this.scrollindicatorsize = scrollindicatorsize;
				nexacro.Component.prototype.set_scrollindicatorsize.call(this.form, scrollindicatorsize);
			}
		};

		_pCompositeComponent.set_scrolltype = function (scrolltype) {
			if (this.scrolltype != scrolltype) {
				this.scrolltype = nexacro.Component.prototype.set_scrolltype.call(this.form, scrolltype);
			}
		};


		_pCompositeComponent.getFocus = function () {
			return this.parent ? this.parent.getFocus() : null;
		};


		_pCompositeComponent._on_activate = function () {
			nexacro.Component.prototype._on_activate.call(this);

			if (this.form) {
				this.form._on_activate();
			}

			return true;
		};

		_pCompositeComponent._on_deactivate = function () {
			nexacro.Component.prototype._on_deactivate.call(this);

			if (this.form) {
				this.form._on_deactivate();
			}

			return true;
		};

		_pCompositeComponent._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
			return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
		};

		_pCompositeComponent._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
			return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
		};

		_pCompositeComponent._clearUserFunctions = nexacro._emptyFn;

		_pCompositeComponent._loadedForm = nexacro._emptyFn;

		_pCompositeComponent._closeForm = function () {
			this._destroyFormControl();
		};

		_pCompositeComponent._recalcLayout = function () {
			var form = this.form;
			if (form) {
				var pos = this._getFormPosition();

				form._setPos(pos.left, pos.top);
				form._setSize(pos.width, pos.height);
			}
		};

		_pCompositeComponent._on_orientationchange = function (orientation) {
			if (this.form) {
				this.form._on_orientationchange(orientation);
			}
		};

		_pCompositeComponent._getComponentsByTaborder = function () {
			if (!this.form._isEnable() || !this.form._child_list || this.form._child_list.length == 0) {
				return null;
			}

			return [this.form];
		};

		_pCompositeComponent._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, filter_type) {
			var ret = nexacro.FormBase.prototype._searchNextTabFocus.call(this, current, bSearchFromFirst, opt_force_cycle, filter_type);

			if (bSearchFromFirst && ret && ret[0] === this.form) {
				return this.parent._searchNextTabFocus(this, undefined, undefined, filter_type);
			}

			return ret;
		};

		_pCompositeComponent._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
			var ret = nexacro.FormBase.prototype._searchPrevTabFocus.call(this, current, bSearchFromLast, opt_force_cycle, filter_type);

			if (bSearchFromLast && ret && ret[0] === this.form) {
				return [this];
			}

			return ret;
		};

		_pCompositeComponent._getTabOrderNext = function (current, direction, filter_type) {
			return nexacro.FormBase.prototype._getTabOrderNext.call(this, current, direction, filter_type);
		};

		_pCompositeComponent._getTabOrderFirst = function (filter_type) {
			return nexacro.FormBase.prototype._getTabOrderFirst.call(this, filter_type);
		};

		_pCompositeComponent._getTabOrderLast = function (filter_type) {
			return nexacro.FormBase.prototype._getTabOrderLast.call(this, filter_type);
		};


		delete _pCompositeComponent;

		nexacro._CompositeForm = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro._InnerForm.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		};

		var _pCompositeForm = nexacro._createPrototype(nexacro._InnerForm, nexacro._CompositeForm);
		nexacro._CompositeForm.prototype = _pCompositeForm;
		_pCompositeForm._type_name = "Form";

		_pCompositeForm._is_subcontrol = false;

		_pCompositeForm.loadModule = function (url, module) {
			this._url = url;
			this._base_url = nexacro._getBaseUrl(url);

			this._load_manager.loadMainModuleByScript(url, module);
		};

		delete _pCompositeForm;

		if (nexacro._LoadManager) {
			var __pLoadManager = nexacro._LoadManager.prototype;
			if (__pLoadManager) {
				__pLoadManager.loadMainModuleByScript = function (url, module) {
					this.main_url = url;
					this.status = 1;

					this.on_load_main(url, 0, module);
				};
			}
		}
	}
}
