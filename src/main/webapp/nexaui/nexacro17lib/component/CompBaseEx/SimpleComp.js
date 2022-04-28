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


if (!nexacro._ExprInfo) {
	nexacro._ExprInfo = function () {
		this.baseid = "";
		this.basesq = -1;
		this.target = null;
		this.setter = "";
		this.values = null;

		this.exprcx = "";
		this.exprix = -1;
	};

	var _pExprInfo = nexacro._createPrototype(Object, nexacro._ExprInfo);
	nexacro._ExprInfo.prototype = _pExprInfo;
	_pExprInfo._type_name = "_ExprInfo";



	_pExprInfo._isSetExprCtx = function () {
		return this.exprcx != "";
	};
	_pExprInfo._isSetExprIdx = function () {
		return this.exprix >= 0;
	};

	_pExprInfo._setExprFuncCtx = function (funcctx) {
		this.exprcx = funcctx;
	};
	_pExprInfo._setExprFuncIdx = function (funcidx) {
		this.exprix = funcidx;
	};
	_pExprInfo._setExprInfo = function (exprinfo) {
		this.exprif = exprinfo;
	};

	_pExprInfo._clear = function () {
		this.target = null;
		this.values = null;

		this.exprif = null;
		this.exprcx = "";
		this.exprix = -1;
	};

	delete _pExprInfo;
}


if (!nexacro._ExprData) {
	nexacro._ExprData = function (valueexpr, dataexpr, fullexpr) {
		this._setExprType(valueexpr, dataexpr, fullexpr);

		this._exprparser = null;
		this._exprtarget = null;

		this._exprinfo = [];
		this._exprfunc = [];
	};

	var _pExprData = nexacro._createPrototype(Object, nexacro._ExprData);
	nexacro._ExprData.prototype = _pExprData;
	_pExprData._type_name = "_ExprData";



	_pExprData._setExprType = function (valueexpr, dataexpr, fullexpr, xmlexpr, jsonexpr) {
		this._exprtype = (valueexpr ? 0x01 : 0) + (dataexpr ? 0x02 : 0) + (xmlexpr ? 0x04 : 0) + (jsonexpr ? 0x08 : 0) + (fullexpr ? 0x10 : 0);
	};

	_pExprData._isValueExpr = function () {
		return (this._exprtype & 0x01) != 0;
	};
	_pExprData._isInnerExpr = function () {
		return (this._exprtype & 0x02) != 0;
	};
	_pExprData._isFullExpr = function () {
		return (this._exprtype & 0x10) != 0;
	};
	_pExprData._isDataExpr = function () {
		return (this._exprtype & 0x1E) != 0;
	};
	_pExprData._isXMLExpr = function () {
		return (this._exprtype & 0x04) != 0;
	};
	_pExprData._isJSONExpr = function () {
		return (this._exprtype & 0x08) != 0;
	};

	_pExprData._initExprParser = function () {
		this._exprparser = new nexacro.ExprParser();
	};
	_pExprData._initExprOwner = function (owner) {
		this._exprowner = owner;
	};
	_pExprData._initExprTarget = function (target) {
		this._exprtarget = target;
	};

	_pExprData._getExprInfos = function () {
		return this._exprinfo;
	};
	_pExprData._initExprInfo = function (exprinfo) {
		if (exprinfo && this._exprparser && this._exprtarget) {
			var exprcx = exprinfo.exprcx;
			var exprfn = nexacro._createInlineFunc(this._exprparser.makeExpr(this._exprtarget, exprcx));

			if (exprfn) {
				exprinfo._setExprFuncIdx(this.setExprFunc(exprcx, exprfn));
			}
		}
	};
	_pExprData._initExprInfoArray = function (exprinfos) {
		if (exprinfos) {
			for (var i = 0, l = exprinfos.length; i < l; i++) {
				this._initExprInfo(exprinfos[i]);
			}
		}
	};
	_pExprData._pushExprInfoArray = function (exprinfos) {
		if (exprinfos) {
			for (var i = 0, l = exprinfos.length; i < l; i++) {
				this._exprinfo.push(exprinfos[i]);
				exprinfos[i] = null;
			}
		}
	};
	_pExprData._pushInfoArray = function (infos, array) {
		if (infos && array) {
			for (var i = 0, l = infos.length; i < l; i++) {
				array.push(infos[i]);
				infos[i] = null;
			}
		}
	};
	_pExprData._setExprInfos = function (exprinfos) {
		this._clearExprInfos();
		this._clearExprFuncs();

		this._addExprInfo(exprinfos);
	};
	_pExprData._addExprInfo = function (exprinfo) {
		if (exprinfo.length) {
			this._initExprInfoArray(exprinfo);
			this._pushExprInfoArray(exprinfo);
		}
		else {
			this._initExprInfo(exprinfo);
			this._exprinfo.push(exprinfo);
		}
	};
	_pExprData.setExprFunc = function (exprctx, exprfunc) {
		var expridx = this._exprfunc.length;

		this._exprfunc.push(exprfunc);



		return expridx;
	};
	_pExprData.getExprFuncByIdx = function (index) {
		return index >= 0 && index < this._exprfunc.length ? this._exprfunc[index] : null;
	};
	_pExprData.getExprFuncByCtx = function (ctx) {
	};



	_pExprData._getExprData = function (index) {
		var infos = this._exprinfo;

		if (infos) {
			for (var i = 0, l = infos.length; i < l; i++) {
				var info = infos[i];

				if (info) {
					info.values = this._fetchExprData(info.exprix, index);
				}
			}
		}

		return this;
	};

	_pExprData._fetchExprData = function (exprix, index) {
		if (exprix >= 0) {
			{

				var exprfn = this._exprfunc[exprix];

				if (exprfn) {
					return exprfn.call(this._exprowner, this._exprtarget);
				}
			}
		}

		return undefined;
	};

	_pExprData._clearExprTarget = function () {
		this._exprtarget = null;
	};
	_pExprData._clearExprParser = function () {
		if (this._exprparser) {
			delete this._exprparser;
			this._exprparser = null;
		}
	};
	_pExprData._clearExprInfos = function () {
		for (var i = 0, l = this._exprinfo.length; i < l; i++) {
			if (this._exprinfo[i]) {
				this._exprinfo[i]._clear();
				delete this._exprinfo[i];
				this._exprinfo[i] = null;
			}
		}

		this._exprinfo = [];
	};
	_pExprData._clearExprFuncs = function () {
		for (var i = 0, l = this._exprfunc.length; i < l; i++) {
			if (this._exprfunc[i]) {
				delete this._exprfunc[i];
				this._exprfunc[i] = null;
			}
		}

		this._exprfunc = [];
	};



	_pExprData._clear = function () {
		this._clearExprInfos();
		this._clearExprFuncs();
		this._clearExprParser();
		this._clearExprTarget();
	};

	delete _pExprData;
}

if (!nexacro._SelectInfo) {
	nexacro._SelectConst = 
		{
		SELECTTYPE_NONE : 0x00, 
		SELECTTYPE_VALUE : 0x01, 
		SELECTTYPE_TEXT : 0x02, 
		SELECTTYPE_COMP : 0x04, 
		SELECTTYPE_ITEM : 0x08, 
		SELECTTYPE_USER : 0xFF
	};

	nexacro._SelectInfo = function (selecttype, positcount, rangecount, multicount, unselvalue) {
		this._initSelect(selecttype, positcount, rangecount, multicount, unselvalue);
	};

	var _pSelectInfo = nexacro._createPrototype(nexacro.Object, nexacro._SelectInfo);
	nexacro._SelectInfo.prototype = _pSelectInfo;
	_pSelectInfo._type_name = "_SelectInfo";



	_pSelectInfo._initSelect = function (selecttype, positcount, rangecount, multicount, unselvalue) {
		this._selectlist = [];
		this._unselvalue = unselvalue;

		this._selecttype = selecttype ? selecttype : nexacro._SelectConst.SELECTTYPE_NONE;

		this._positcount = positcount ? positcount : 1;
		this._rangecount = rangecount ? rangecount : 1;
		this._multicount = multicount ? multicount : 1;

		this._currselect = this._multicount >= 0 ? this._multicount - 1 : -1;
	};

	_pSelectInfo._setSelectEvent = function (target) {
		this.eventtarget = target;
	};
	_pSelectInfo._clearSelectEvent = function () {
		this.eventtarget = null;
	};

	_pSelectInfo._getCurrentSelect = function () {
		if (this._currselect < 0 || this._currselect >= this._selectlist.length) {
			return this._unselvalue;
		}
		else {
			return this._selectlist[this._currselect];
		}
	};
	_pSelectInfo._setCurrentSelect = function (select) {
		this._currselect = this._currselect < 0 ? 0 : this._currselect;
		this._selectlist.length = this._currselect + 1;

		var old = this._selectlist[this._currselect];
		if (this._checkSelectChange(old, select)) {
			this._selectlist[this._currselect] = select;

			if (this.eventtarget) {
				this.eventtarget._onChangeSelect(this, this._selecttype, old, select);
			}
		}
	};
	_pSelectInfo._addMultiSelect = function (select) {
		if (this._multicount < 0) {
			this._currselect++;
			this._selectlist.length = this._currselect + 1;
			this._selectlist[this._currselect] = select;

			if (this.eventtarget) {
				this.eventtarget._onChangeSelect(this, this._selecttype, null, select);
			}
		}
		else if (this._multicount > 0) {
			if (this._currselect + 1 < this._multicount) {
				this._currselect++;
				this._selectlist[this._currselect] = select;

				if (this.eventtarget) {
					this.eventtarget._onChangeSelect(this, this._selecttype, null, select);
				}
			}
		}
	};
	_pSelectInfo._popMultiSelect = function () {
		if (this._multicount < 0) {
			this._currselect--;
			this._selectlist.length = this._currselect - 1;

			if (this.eventtarget) {
				this.eventtarget._onChangeSelect(this, this._selecttype, null, null);
			}
		}
		else if (this._multicount > 0) {
			if (this._currselect - 1 >= 0) {
				this._selectlist[this._currselect] = this._unselvalue;
				this._currselect--;
			}
		}
	};

	_pSelectInfo._clearCurrentSelect = function () {
		if (this._multicount) {
			this._selectlist[this._currselect] = this._unselvalue;
		}
		else {
			this._clear();
		}

		if (this.eventtarget) {
			this.eventtarget._onChangeSelect(this, this._selecttype, this._currselect, null);
		}
	};
	_pSelectInfo._clearCurrentSelectPos = function () {
		this._selectlist = [];
		this._currselect = this._multicount >= 0 ? this._multicount - 1 : -1;
	};
	_pSelectInfo._clearMultiSelectList = function () {
		this._selectlist = [];
		this._selectlist.length = this._multicount > 0 ? this._multicount : 0;
		this._currselect = this._multicount > 0 ? this._multicount - 1 : -1;

		for (var i = 0, n = this._multicount; i < n; i++) {
			this._selectlist[i] = this._unselvalue;
		}

		if (this.eventtarget) {
			this.eventtarget._onChangeSelect(this, this._selecttype, this._currselect, null);
		}
	};

	_pSelectInfo._checkAboveCurrentSelect = function (idx1, idx2) {
	};
	_pSelectInfo._checkAboveMultiSelectList = function (idx1, idx2) {
	};
	_pSelectInfo._checkSelectChange = function (oldselect, newselect) {
		if (this.eventtarget) {
			return this.eventtarget._onCheckSelectChange(oldselect, newselect);
		}
	};

	_pSelectInfo._getMultiSelectCount = function () {
		return this._multicount ? this._multicount : this._selectlist.length;
	};
	_pSelectInfo._getMultiSelectList = function () {
		return this._selectlist;
	};

	_pSelectInfo._clear = function () {
		this._selectlist = [];
		this._unselvalue = null;
		this._eventtarget = null;
		this._currselect = -1;
	};

	delete _pSelectInfo;
}

if (!nexacro.SimpleComponent) {
	nexacro.SimpleComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._initProperties();
		this._initEvents();
	};

	var _pSimpleComponent = nexacro._createPrototype(nexacro.Component, nexacro.SimpleComponent);
	nexacro.SimpleComponent.prototype = _pSimpleComponent;

	_pSimpleComponent._type_name = "SimpleComponent";
	_pSimpleComponent._is_simple_control = true;
















	_pSimpleComponent.create = function () {
		if (this._is_created) {
			return;
		}

		this.createComponent();
	};

	_pSimpleComponent.createComponent = function (bCreateOnly) {
		this._initComponent();

		if (this.onCreateComponent()) {
			var parent_elem = this._getParentElement();
			if (!bCreateOnly && parent_elem && parent_elem.handle) {
				this.onCreated(this._getWindow());
			}

			return true;
		}
		else {
			return false;
		}
	};

	_pSimpleComponent.onCreateComponent = function () {
		var parentElem = this._getParentElement();

		if (parentElem) {
			if (this._createControlElement(parentElem)) {
				this._initControlElement();

				this._applyProperties();
				this._applyAccessibility();

				this._initBindInfo();
				this._initExprInfo();
				this._initContents();
			}

			return true;
		}
		else {
			return false;
		}
	};

	_pSimpleComponent.on_created = function (_window) {
		this.onCreated(_window);
	};

	_pSimpleComponent.onCreated = function (window) {
		if (this._is_loading) {
			return;
		}

		var parentElem = this._getParentElement();

		if (parentElem) {
			window = window || this._getWindow();

			if (this._createdControlElement(window)) {
				this._initHotKey();
				this._resetStatus();

				if (!this._is_created) {
					this._createdContents(window);
					this._is_created = true;
				}

				this._recalcLayout();
			}
		}
	};

	_pSimpleComponent._initComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight) {
		var control_elem = this._control_element;
		if (!control_elem) {
			this._initUniqueID();
			this._initOverflow();
			this._initBind();
			this._initExpr();
			this._initSelect();
			this._initStatus();
			this._initAccessibility();
		}
	};
	_pSimpleComponent._initComponentClone = function (source) {
		this._initUniqueID();
		this._initOverflow();
		this._initBind();
		this._initExpr();
		this._initSelect();
		this._initStatus();
		this._cloneProperties(source);
		this._initAccessibility();
	};
	_pSimpleComponent._initUniqueID = function () {
		if (this._unique_id.length <= 0) {
			this._unique_id = this.parent && this.parent._unique_id ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
		}
	};

	_pSimpleComponent._cloneProperties = function (source) {
		if (source) {
			this._onCloneProperities(source);
		}
	};

	_pSimpleComponent._uninitComponent = function () {
		this._clearInitValue();
		this._clearEventListeners();
		this._clearCaptureLock();
		this._clearParentsList();
		this._clearInnerVars();
		this._clearStyleVars();
	};

	_pSimpleComponent._clearInitValue = function () {
		if (this._setpropinitfn) {
			delete this._setpropinitfn;
			this._setpropinitfn = null;
		}
	};

	_pSimpleComponent._clearCaptureLock = function () {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
			_window._releaseCaptureLock(this._attached_comp);
			this._track_capture = false;
		}
	};

	_pSimpleComponent._clearParentsList = function () {
		if (this.parent && this.parent.removeChild) {
			this.parent.removeChild(this.id);
		}
		else {
			var win = this._getWindow();
			if (win) {
				win._removeFromCurrentFocusPath(this);
			}
		}
	};

	_pSimpleComponent._clearInnerVars = function () {
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
	};

	_pSimpleComponent._clearStyleVars = function () {
		this._clearStyleObject();
	};

	_pSimpleComponent.onDestroyComponent = function () {
		{

			this._is_created = false;
			this.onDestroyContents();
		}

		this._clearHotKey();
		this._clearBind();
		this._clearExpr();
		this._clearSelect();
		this._clearStatus();

		this._clearAccessibility();
		this._clearProperties();

		this._destroyControlElement();
	};

	_pSimpleComponent.destroyComponent = function () {
		{

			this._is_alive = false;

			this._uninitComponent();

			this.onDestroyComponent();

			return true;
		}
	};

	_pSimpleComponent.destroy = function () {
		if (!this._is_alive) {
			return false;
		}

		return this.destroyComponent();
	};





	_pSimpleComponent._createControlElement = function (parentElem) {
		var controlElem = this._control_element;
		if (!controlElem) {
			controlElem = this._onCreateControlElement(parentElem);
			controlElem._is_nc_element = this._is_nc_control;
		}

		return controlElem;
	};

	_pSimpleComponent._onCreateControlElement = function (parentElem) {
		return this.on_create_control_element(parentElem);
	};

	_pSimpleComponent._initControlElement = function () {
		this._initControlElementInfo();
		this._initControlElementStatus();
		this._initControlElementRTL();
		this._initControlElementCssInfo();
		this._initControlElementPositionSize();
		this._initControlElementStyleProps();
	};

	_pSimpleComponent._initControlElementInfo = function () {
		this._control_element.initElementInfo();
	};

	_pSimpleComponent._initControlElementStatus = function () {
		if (!this.visible) {
			this._control_element.setElementVisible(false);
		}
		else {
			this._control_element.setElementVisible(true);
		}
	};

	_pSimpleComponent._initControlElementRTL = function () {
		this.on_apply_prop_rtl();
	};

	_pSimpleComponent._initControlElementCssInfo = function () {
		if (!this._is_initcssselector) {
			this._setControlElementCssSelector();

			this._makeCSSMapInfo();

			this._setControlElementCssMapInfo();

			this._is_initcssselector = true;
		}
	};

	_pSimpleComponent._setControlElementCssMapInfo = function () {
		var enabledselector = this._cssselector.enabled;
		if (enabledselector) {
			this._control_element.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);
		}
	};

	_pSimpleComponent._initControlElementPositionSize = function () {
		this._calcArrangePosition();
		this._adjustPosition();

		this._control_element.setElementPosition(this._adjust_left, this._adjust_top);
		this._control_element.setElementSize(this._adjust_width, this._adjust_height);
	};

	_pSimpleComponent._initControlElementStyleProps = function () {
		this._initNormalStyleProperty(this._control_element);
	};

	_pSimpleComponent._createdControlElement = function (_window) {
		var controlElem = this._control_element;
		if (controlElem) {
			controlElem.create(_window);


			return controlElem.handle;
		}
		return null;
	};

	_pSimpleComponent._destroyControlElement = function () {
		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}
	};





	_pSimpleComponent._createClientElement = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._onCreateClientElement(control_elem);

			if (this._client_elem) {
				this._initClientElement();
			}
		}
	};
	_pSimpleComponent._onCreateClientElement = function (parent_elem) {
		this._client_elem = new nexacro.IconTextElement(parent_elem);
	};

	_pSimpleComponent._initClientElement = function () {
		this._initClientElementPositionSize();
		this._initClientElementStyleProps();
		this._initClientElementValueProps();
	};

	_pSimpleComponent._initClientElementPositionSize = function () {
		this._client_elem.setElementPosition(0, 0);
		this._client_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
	};

	_pSimpleComponent._initClientElementStyleProps = function () {
		if (this.textAlign) {
			this._client_elem.setElementTextAlign(this.textAlign);
		}
		if (this.verticalAlign) {
			this._client_elem.setElementVerticalAlign(this.verticalAlign);
		}
	};

	_pSimpleComponent._initClientElementValueProps = function () {
	};

	_pSimpleComponent._getClientElement = function () {
		return this._client_elem;
	};
	_pSimpleComponent._setClientElementText = function (text) {
		this._client_elem.setElementText(text);
	};

	_pSimpleComponent._createdClientElement = function (_window) {
		if (this._client_elem) {
			this._client_elem.create(_window);
		}
	};

	_pSimpleComponent._destroyClientElement = function () {
		if (this._client_elem) {
			this._client_elem.destroy();
			this._client_elem = null;
		}
	};



	_pSimpleComponent._initOverflow = function () {
	};



	_pSimpleComponent._initContents = function () {
		this.onCreateContents();

		this._is_created_contents = true;
		this._is_loading = false;
	};
	_pSimpleComponent._createdContents = function (_window) {
		this.onCreatedContents(_window);
	};

	_pSimpleComponent._clearContents = function () {
		this.onClearContents();
	};

	_pSimpleComponent._setContents = function (strContents) {
		this._onSetContents(strContents);
	};


	_pSimpleComponent.onCreateContents = function (created) {
		this._createClientElement();
	};

	_pSimpleComponent.on_created_contents = function (_window) {
		this.onCreatedContents(_window);
	};
	_pSimpleComponent.onCreatedContents = function (_window) {
		this._createdClientElement(_window);
	};

	_pSimpleComponent.onClearContents = function () {
		this._destroyClientElement();
	};
	_pSimpleComponent.onDestroyContents = function () {
		this._clearContents();
	};

	_pSimpleComponent._onSetContents = function (strContents) {
	};




	_pSimpleComponent._recreateContents = function () {
		this._clearContents();
		this._initContents();
		this._createdContents(this._getWindow());

		this._recalcLayout(true);
	};
	_pSimpleComponent._recreateComponent = function () {
		this.destroyComponent();
		this.createComponent();
	};
	_pSimpleComponent._recreate = function () {
		this.destroy();
		this.create();
	};






	_pSimpleComponent.createCommand = function () {
		return this._createCommand();
	};
	_pSimpleComponent.attachHandle = function (win) {
		return this._attachHandle(win);
	};

	_pSimpleComponent._createCommand = function () {
		var str = "";
		var controlElem = this._control_element;
		if (controlElem && !this._is_loading) {
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

			this.onPrepareCommand();

			str = controlElem.createCommandStart();
			if (str) {
				str += this.onCreateContentsCommand();
				str += controlElem.createCommandEnd();
			}

			this._is_create_commandstr = true;
		}
		return str;
	};

	_pSimpleComponent.onPrepareCommand = function () {
		this._applyProperties();

		this._update_position();

		this._recalcLayout(true);
	};

	_pSimpleComponent.onCreateContentsCommand = function () {
		return this._client_elem ? this._client_elem.createCommand() : "";
	};

	_pSimpleComponent._attachHandle = function (win) {
		if (!this._is_created && this._is_create_commandstr) {
			this.onAttachControlHandle(win);
			this.onAttachContentsHandle(win);

			this._resetStatus();

			this._is_created = true;
		}
	};

	_pSimpleComponent.onAttachControlHandle = function (win) {
		var controlElem = this._control_element;
		if (controlElem) {
			controlElem.attachHandle(win);
		}
	};
	_pSimpleComponent.onAttachContentsHandle = function (win) {
		var clientElem = this._client_elem;
		if (clientElem) {
			clientElem.attachHandle(win);
		}
	};





	_pSimpleComponent.on_change_containerPos = function (left, top) {
		this._onChangeContainerPos(left, top);
	};
	_pSimpleComponent.on_change_containerRect = function (width, height) {
		this._onChangeContainerRect(width, height);
	};

	_pSimpleComponent._onChangeContainerPos = function (left, top) {
	};

	_pSimpleComponent._onChangeContainerRect = function (width, height) {
		this._setContainerSize(width, height);

		this._recalcLayout(false);
	};

	_pSimpleComponent._setContainerPos = function (left, top) {
		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementPosition(left, top);
		}
	};
	_pSimpleComponent._setContainerSize = function (width, height) {
		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementSize(width, height);
		}
	};

	_pSimpleComponent._recalcLayout = function (reset) {
		if (this._is_created || reset) {
			this._onRecalcLayout(reset);
		}
	};



	_pSimpleComponent._onRecalcLayout = function (reset) {
	};





	_pSimpleComponent._is_valuebind = false;
	_pSimpleComponent._is_valueexpr = false;


	_pSimpleComponent._initBind = function () {
	};
	_pSimpleComponent._initBindInfo = function () {
	};
	_pSimpleComponent._clearBind = function () {
	};

	_pSimpleComponent._initExpr = function () {
		if (this._is_valueexpr) {
			this._exprdata = new nexacro._ExprData(true, false, false);

			this._exprdata._initExprParser();
			this._exprdata._initExprTarget(this);
		}
	};
	_pSimpleComponent._initExprInfo = function () {
		if (this._is_valueexpr) {
			this._applyExprInfos();

			this._applyValue();
		}
	};
	_pSimpleComponent._applyExprInfos = function () {
		if (this._exprdata) {
			this._exprdata._setExprInfos(this._onGetExprInfos());
		}
	};
	_pSimpleComponent._clearExpr = function () {
		if (this._exprdata) {
			this._exprdata._clear();
			delete this._exprdata;
			this._exprdata = null;
		}
	};

	_pSimpleComponent._getExprFuncByCtx = function (ctx) {
		if (this._exprdata) {
			return this._exprdata.getExprFuncByCtx(ctx);
		}
	};
	_pSimpleComponent._setExprFuncByCtx = function (ctx, func) {
		if (this._exprdata) {
			return this._exprdata.setExprCacheIdx(ctx, this._exprdata.setExprFunc(ctx, func));
		}
	};

	_pSimpleComponent.createExprInfo = function (baseid, targetid, targetprop, exprprop) {
		var exprinfo = new nexacro._ExprInfo();

		exprinfo.baseid = baseid;
		exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
		exprinfo.exprid = nexacro._nvl(exprprop, false) ? exprprop : this._onGetExprProp();

		return exprinfo;
	};
	_pSimpleComponent._onGetExprProp = function () {
		return "expr";
	};

	_pSimpleComponent._onGetExprInfos = function () {
		if (this._is_valueexpr) {
			return [this.createExprInfo()];
		}

		return null;
	};

	_pSimpleComponent._onGetBindableProperties = function () {
		return "value";
	};

	_pSimpleComponent.on_init_bindSource = function (columnid, propid, ds) {
		return this._onInitBindSource(columnid, propid, ds);
	};
	_pSimpleComponent._onInitBindSource = function (columnid, propid, ds) {
		if (this._is_valuebind && propid == this._onGetBindableProperties()) {
			this._setValue(undefined);
			this._applyVaule();
		}
		if (this._is_valueexpr && propid == this._onGetExprProperty()) {
			this._setValue(undefined);
			this._applyVaule();
		}
	};

	_pSimpleComponent.on_change_bindSource = function (propid, ds, row, col) {
		return this._onChangeBindSource(propid, ds, row, col);
	};
	_pSimpleComponent._onChangeBindSource = function (propid, ds, row, col) {
		if (this._is_created) {
			if (this._is_valuebind && propid == this._onGetBindableProperties()) {
				this._setValue(ds.getColumn(row, col));
				this._applyValue();
			}
			if (this._is_valueexpr && propid == this._onGetExprProperty()) {
				this._setValue(this._getExprData(row));
				this._applyValue();
			}
		}
	};

	_pSimpleComponent._applyToBindSource = function (propid, Val) {
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

	_pSimpleComponent._setValue = function (v) {
		this[this._onGetBindableProperties()] = v;
	};

	_pSimpleComponent._getValue = function (v) {
		return this[this._onGetBindableProperties()];
	};

	_pSimpleComponent._applyValue = function () {
		this.on_apply_value();
	};

	_pSimpleComponent.on_apply_value = function () {
		if (this._client_elem) {
			var value = this._getValue();
			if (value != null) {
				this._client_elem.setElementText(value);
			}
		}
	};







	_pSimpleComponent._use_select = false;
	_pSimpleComponent.selectdragmode = "default";

	_pSimpleComponent.getSelect = function () {
		return this._onGetCurrentSelect();
	};
	_pSimpleComponent.setSelect = function (select, subselect) {
		return this._onSetCurrentSelect(this._onGetSelectArgument(select, subselect));
	};
	_pSimpleComponent.clearSelect = function () {
		return this._onClearCurrentSelect();
	};
	_pSimpleComponent.isAboveSelected = function (idx1, idx2) {
		return this._onCheckAboveCurrentSelect(idx1, idx2);
	};

	_pSimpleComponent._initSelect = function () {
		if (this._use_select) {
			this._selectinfo = new nexacro._SelectInfo();

			this._selectinfo._setSelectEvent(this);

			this._onInitSelect();
		}
	};
	_pSimpleComponent._onInitSelect = function (selecttype, positcount, rangecount, multicount, unselvalue) {
		if (this._selectinfo) {
			this._selectinfo._initSelect(nexacro._SelectConst.SELECTTYPE_COMP, positcount, rangecount, multicount, unselvalue);
		}
	};

	_pSimpleComponent._clearSelect = function () {
		this._onClearSelect();

		if (this._selectinfo) {
			this._selectinfo._clear();
			delete this._selectinfo;
			this._selectinfo = null;
		}
	};
	_pSimpleComponent._onClearSelect = function () {
	};


	_pSimpleComponent._onGetSelectArgument = function (select, subselect) {
		return select;
	};
	_pSimpleComponent._onGetCurrentSelect = function () {
		if (this._selectinfo) {
			return this._selectinfo._getCurrentSelect();
		}
	};
	_pSimpleComponent._onSetCurrentSelect = function (select) {
		if (this._selectinfo) {
			return this._selectinfo._setCurrentSelect(select);
		}
	};
	_pSimpleComponent._onClearCurrentSelect = function () {
		if (this._selectinfo) {
			return this._selectinfo._clearCurrentSelectPos();
		}
	};
	_pSimpleComponent._onCheckAboveCurrentSelect = function (idx1, idx2) {
		if (this._selectinfo) {
			return this._selectinfo._checkAboveCurrentSelect(idx1, idx2);
		}
	};
	_pSimpleComponent._onCheckSelectChange = function (oldvalue, newvalue) {
		return oldvalue != newvalue;
	};
	_pSimpleComponent._onCheckSelectable = function () {
		if (this._use_selected_status) {
			return true;
		}
	};

	_pSimpleComponent._onChangeSelect = function (obj, type, oldvalue, newvalue) {
		this._on_basic_onselect(oldvalue, newvalue);
		this._on_fire_onselect(oldvalue, newvalue);
		this._on_default_onselect(oldvalue, newvalue);
	};

	_pSimpleComponent._on_fire_onselect = function (oldvalue, newvalue) {
		if (this.onselect && this.onselect._has_handlers) {
			this.onselect._fireEvent(this, null);
		}
		return true;
	};
	_pSimpleComponent._on_basic_onselect = function (oldvalue, newvalue) {
		if (this._selectinfo) {
			switch (this._selectinfo._selecttype) {
				case 0x04:
					{

						if (this._use_selected_status) {
							this._changeUserStatus("selected", newvalue ? (this._onCheckSelectable() ? true : false) : false);
						}

						break;
					}
				case 0x02:
				case 0x01:
				case 0xFF:
					{

						break;
					}
			}
		}
	};
	_pSimpleComponent._on_default_onselect = function (oldvalue, newvalue) {
	};




	_pSimpleComponent._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : true, 
			want_return : true, 
			want_escape : true, 
			want_chars : true, 
			want_arrows : true
		};
	};

	_pSimpleComponent._onGetDragData = function () {
		return this.id;
	};

	_pSimpleComponent._onGetTabstop = function () {
		if (nexacro._enableaccessibility) {
			var accessibility = this.accessibility;
			if (accessibility && accessibility.enable && accessibility.role == "link") {
				return true;
			}
		}
		return false;
	};

	_pSimpleComponent._onGetFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pSimpleComponent._initHotKey = function (keycode, altKey, ctrlKey, shiftKey) {
		if (!this._is_subcontrol) {
			this._registerHotkey();
		}
	};
	_pSimpleComponent._clearHotKey = function () {
		if (!this._is_subcontrol) {
			this._unregisterHotkey();
		}
	};
	_pSimpleComponent._onHotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.click();
	};










	_pSimpleComponent._initStatus = function () {
		this._onInitStatus();
	};

	_pSimpleComponent._onInitStatus = function () {
	};

	_pSimpleComponent._resetStatus = function () {
		this._resetSysStatus();
		this._resetUserStatus();
	};
	_pSimpleComponent._resetSysStatus = function () {
		return this._onResetSysStatus();
	};
	_pSimpleComponent._resetUserStatus = function () {
		return this._onResetUserStatus();
	};

	_pSimpleComponent._onResetSysStatus = function () {
		this._onResetSysEnable();
		if (this._use_readonly_status) {
			this._onResetSysReadOnly();
		}
	};
	_pSimpleComponent._onResetUserStatus = function () {
	};

	_pSimpleComponent._onResetSysEnable = function () {
		var parent = this.parent;
		if (parent) {
			this._real_enable = parent._real_enable != false && this.enable;
			this._changeSysStatus("disabled", !this._real_enable);
			this._spreadSysStatus("disabled", !this._real_enable);
		}
	};
	_pSimpleComponent._onResetSysReadOnly = function () {
		var parent = this.parent;
		if (parent) {
			this._real_readonly = parent._real_readonly == true || this.readonly;
			this._changeSysStatus("readonly", this._real_readonly);
			this._spreadSysStatus("readonly", this._real_readonly);
		}
	};


	_pSimpleComponent._changeSysStatus = function (status, value) {
		return this._onChangeSysStatus(status, value);
	};
	_pSimpleComponent._changeUserStatus = function (status, value) {
		return this._onChangeUserStatus(status, value);
	};

	_pSimpleComponent._onChangeSysStatus = function (status, value) {
		this._oldstatus = this._status;
		this._statusmap[status] = value;

		var statusmap = this._statusmap;
		var applystatus = "enabled";

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
			return;
		}

		if (this._oldstatus != this._status) {
			this._apply_status_toelement(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFlag(this._status, this._userstatus);
		}
	};
	_pSimpleComponent._onChangeUserStatus = function (status, value) {
		this._olduserstatus = this._userstatus;
		this._userstatusmap[status] = value;

		var statusmap = this._userstatusmap;
		var applystatus = "";

		if (this._use_pushed_status && statusmap.pushed) {
			applystatus = "pushed";
		}
		else if (this._use_selected_status && statusmap.selected) {
			applystatus = "selected";
		}

		this._userstatus = this.on_changeUserStatus(status, value, applystatus, this._status, this._userstatus);

		if (this._olduserstatus != this._userstatus) {
			this._apply_status_toelement(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFlag(this._status, this._userstatus);
		}
	};

	_pSimpleComponent._clearStatus = function () {
	};



	_pSimpleComponent._spreadStatus = function (statusname, statusstat) {
	};
	_pSimpleComponent._spreadSysStatus = function (statusname, statusstat) {
		return this._spreadStatus(statusname, statusstat);
	};
	_pSimpleComponent._spreadUserStatus = function (statusname, statusstat) {
		return this._spreadStatus(statusname, statusstat);
	};




	_pSimpleComponent.on_apply_prop_enable = function (enable) {
		this._changeStatus("disabled", !enable);
		this._spreadStatus("disabled", !enable);
	};

	_pSimpleComponent._isEnable = function () {
		return this.parent ? this.parent._real_enable && this.enable : this.enable;
	};
	_pSimpleComponent._isDisable = function () {
		return !this._isEnable();
	};



	_pSimpleComponent._is_editable_control = false;
	_pSimpleComponent._use_readonly_status = false;
	_pSimpleComponent.readonly = undefined;

	_pSimpleComponent.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v !== this.readonly || v !== this._real_readonly) {
			this.readonly = v;
			this._real_readonly = this.readonly || (this.parent ? (this.parent._real_readonly ? true : false) : false);

			this.on_apply_readonly(this._real_readonly);
		}
	};
	_pSimpleComponent.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);
		this._spreadStatus("readonly", readonly);
	};

	_pSimpleComponent._isReadOnly = function () {
		return this._is_editable_control && this.readonly == true || this._real_readonly == true;
	};
	_pSimpleComponent._isEditable = function () {
		return this._is_editable_control && this.readonly != true && this._real_readonly != true;
	};
	_pSimpleComponent._isEditableComponent = function () {
		return this._is_editable_control || this.readonly !== undefined;
	};
	_pSimpleComponent._checkProcessedKey = function (keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp) {
		return check_comp && refer_comp && refer_comp._isEditableComponent() && refer_comp._isEnable() && check_comp._isEnable();
	};



	_pSimpleComponent._initProperties = function () {
		this.onInitProperties();

		this._onInitValueProp();
	};
	_pSimpleComponent._applyProperties = function () {
		this.on_apply_prop_taborder();

		if (!nexacro._isNull(this.tooltiptext)) {
			this.on_apply_prop_tooltip();
		}

		this.on_apply_positionstep();

		this.on_apply_hittesttype();
		this.on_apply_readonly();

		this.onApplyProperties();
	};
	_pSimpleComponent._clearProperties = function () {
		this.onClearProperties();
	};


	_pSimpleComponent._onInitValueProp = function () {
	};

	_pSimpleComponent.onInitProperties = function () {
	};
	_pSimpleComponent.onApplyProperties = function () {
	};
	_pSimpleComponent.onClearProperties = function () {
	};









	_pSimpleComponent._initEvents = function () {
		this._event_list = 
			{
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"oninput" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onclick" : 1, 
			"ondblclick" : 1, 
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
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"oncontextmenu" : 1
				
		};
	};


	_pSimpleComponent._on_basic_onclick = function (obj, e) {
		return this.on_click_basic_action(null, e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.meta_key);
	};
	_pSimpleComponent._on_default_onclick = function (obj, e) {
	};
	_pSimpleComponent._on_fire_onclick = function (obj, e) {
		if (this.onclick && this.onclick._has_handlers) {
			return this.onclick._fireEvent(this, new nexacro.ClickEventInfo(this, "onclick", e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.from_refer_comp, e.meta_key));
		}
		return true;
	};





	_pSimpleComponent._initAccessibility = function () {
		this._accessibility_role = "RoleName";
	};

	_pSimpleComponent._getAccessibilityRole = function () {
		var role = this.accessibilityrole ? this.accessibilityrole : this._accessibility_role;
		if (!role) {
			role = "none";
		}
		return role;
	};

	_pSimpleComponent._getAccessibilityLabel = function () {
		var label = this._getLinkedLabel(this.accessibilitylabel);
		return label ? label : this._onGetAccessibilityLabel();
	};

	_pSimpleComponent._applyAccessibility = function () {
		if (nexacro._enableaccessibility) {
			this.on_apply_accessibility();
		}
	};
	_pSimpleComponent._clearAccessibility = function () {
		if (nexacro._enableaccessibility) {
			var application = nexacro.getApplication();
			if (application && application._accessibilityHistoryList) {
				application._remove_accessibility_history(this);
			}
		}
	};


	_pSimpleComponent._onGetAccessibilityLabel = function () {
		var label = this.text ? this.text : this.value;
		return label;
	};
	_pSimpleComponent._onGetAccessibilityAdditionalRole = function () {
		return " addrole";
	};



	_pSimpleComponent._getParentElement = function () {
		return (!this._is_window && this.parent) ? this.parent._control_element : null;
	};


	_pSimpleComponent._clone = function () {
		return nexacro._clone(this);
	};
	_pSimpleComponent._onCloneProperities = function (source) {
	};

	_pSimpleComponent._setPositionOrigin = function () {
		var elem = this.getElement();
		if (elem && elem.handle) {
			var l = this.getOffsetLeft();
			var t = this.getOffsetTop();

			elem.setElementPosition(l, t);
		}
	};
	_pSimpleComponent._setPositionAdjust = function (l, t) {
		var elem = this.getElement();
		if (elem && elem.handle) {
			l += this.getOffsetLeft();
			t += this.getOffsetTop();

			elem.setElementPosition(l, t);
		}
	};
	_pSimpleComponent._setPositionAbsolute = function (ownc, zorder) {
		if (!ownc) {
			return;
		}

		var elem = this.getElement();
		var owne = ownc.getElement();

		if (elem && owne && elem.handle && owne.handle) {
			var ownt = owne.getContainerElement(elem.position_step);
			if (ownt) {
				this._moveElementNode(elem, elem.owner_elem, ownt, false, true);
			}
			else {
				elem.setElementZIndex(zorder);
			}

			this._setPositionOrigin();
		}
	};
	_pSimpleComponent._setPositionFixed = function (ownc, l, t, above) {
		if (!ownc) {
			return;
		}

		var elem = this.getElement();
		var owne = ownc.getElement();

		if (elem && owne && elem.handle && owne.handle) {
			if (above || above === undefined) {
				this._moveElementNode(elem, elem.owner_elem, owne, true, false);
			}
			else {
				owne.bringToFrontElement(elem);
			}

			this._setPositionAdjust(l, t);
		}
	};

	if (nexacro._Browser == "Runtime") {
		_pSimpleComponent._moveElementNode = function (elem, srce, tare, srcc, tarc) {
			if (elem.owner_elem != tare) {
				elem.owner_elem = tare;

				var setn = elem.handle;
				var srcn = srcc ? srce.dest_handle : srce.handle;
				var tarn = tarc ? tare.dest_handle : tare.handle;

				if (srcn && tarn) {
					nexacro.__unlinkElementHandle(srcn, setn);
					nexacro.__appendElementHandle(tarn, setn);
				}
			}
		};
	}
	else {
		_pSimpleComponent._moveElementNode = function (elem, srce, tare, srcc, tarc) {
			if (elem.owner_elem != tare) {
				elem.owner_elem = tare;

				var setn = elem.handle;
				var srcn = srcc ? srce.dest_handle : srce.handle;
				var tarn = tarc ? tare.dest_handle : tare.handle;

				if (srcn && tarn) {
					nexacro.__unlinkDOMNode(srcn, setn);
					nexacro.__appendDOMNode(tarn, setn);
				}
			}
		};
	}


	_pSimpleComponent._getSubArray = function (array, start, count) {
		var ret = [];
		for (var i = Math.max(start, 0), l = Math.min(start + count, array.length); i < l; i++) {
			ret.push(array[i]);
		}
		return ret;
	};

	delete _pSimpleComponent;
}


if (!nexacro._CompUtil) {
	nexacro._CompUtil = true;

	nexacro._getGlobalScope = function () {
		return nexacro.__getOSType ? null : window;
	};
	nexacro._getCustomScope = function (scope) {
		return nexacro;
	};

	nexacro._getTypeConstructor = function (_type, _deftype) {
		if (!_type) {
			_type = _deftype;
		}


		{

			var parts = _type.split('.');
			var index = 0;
			var final = parts.length - 1;
			var tname = parts[final];
			var scope = nexacro._getGlobalScope();

			if (!scope) {
				scope = nexacro._getCustomScope(parts[0]);
				index = 1;
			}

			if (scope) {
				for (; index < final; index++) {
					scope = scope[parts[index]];
				}

				return scope[tname];
			}
		}

		return null;
	};

	nexacro._clone = function (obj) {
		function extend (from, to) {
			if (from == null || typeof from != "object") {
				return from;
			}
			if (from.constructor != Object && from.constructor != Array) {
				return from;
			}
			if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || 
				from.constructor == String || from.constructor == Number || from.constructor == Boolean) {
				return new from.constructor(from);
			}

			to = to || new from.constructor();

			for (var name in from) {
				to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
			}

			return to;
		}

		return extend(obj);
	};

	var _use_savetoimage_runtime = false;
	var _use_savetoimage_html = false;

	if (nexacro._Browser == "Runtime" && _use_savetoimage_runtime || _use_savetoimage_html) {
		nexacro._drawElement2Canvas = function (canvas, elem, left, top) {
			if (canvas && elem) {
				var l = left || 0;
				var t = top || 0;

				var image = nexacro.__saveToImageObject(elem);
				if (image) {
					canvas.drawImage(image, l, t, image.width, image.height);
				}
			}
		};
		nexacro._drawComponent2Canvas = function (canvas, comp, left, top) {
			if (canvas && comp) {
				var l = left || 0;
				var t = top || 0;

				var image = nexacro.System.saveToImageObject(comp);
				if (image) {
					canvas.drawImage(image, l, t, image.width, image.height);
				}
			}
		};
	}
	else {
		nexacro._getCurrentStyleObject = function (elem) {
			if (!elem) {
				return null;
			}

			if (nexacro._Browser == "Runtime") {
				return {
					curr : null, 
					elem : elem, 
					type : "runtime"
				};
			}
			else {
				var _doc = elem._getRootWindowHandle();
				var _win = _doc.defaultView || _doc.parentWindow;
				var _cps = _win.getComputedStyle || 0;
				var _obj = _cps ? _win.getComputedStyle(elem.handle) : elem.handle.currentStyle;

				return _cps ? {
					curr : _obj, 
					elem : elem, 
					type : "compute"
				}
					 : {
					curr : _obj, 
					elem : elem, 
					type : "current"
				};
			}
		};
		nexacro._getCurrentStyleValue = function (style, prop) {
			if (prop == "font") {
				if (style.type == "runtime") {
					return style.elem._getComputedStyle("font");
				}
				else {
					var font = [];
					font.push(nexacro._getCurrentStyleValue(style, "font-style"));
					font.push(nexacro._getCurrentStyleValue(style, "font-variant"));
					font.push(nexacro._getCurrentStyleValue(style, "font-weight"));
					font.push(nexacro._getCurrentStyleValue(style, "font-size"));
					font.push(nexacro._getCurrentStyleValue(style, "font-family"));
					return font.join(' ');
				}
			}
			else {
				var r;
				if (style.type == "runtime") {
					r = prop.split('-');
					if (r.length > 1 && r[0] == "background") {
						return style.elem._getComputedStyleSubValue(r[0], prop);
					}
					else {
						return style.elem._getComputedStyleValue(prop);
					}
				}
				else if (style.type == "current") {
					r = prop.split('-');
					for (var i = 1, l = r.length; i < l; i++) {
						var s = r[i];
						if (s.length) {
							s[0] = s[0].toUpperCase();
						}
					}
					var p = r.join('');

					return style.curr[p];
				}
				else if (style.type == "compute") {
					return style.curr.getPropertyValue(prop);
				}
			}
		};

		nexacro._clipAdd2Canvas = function (canvas, left, top, width, height) {
			if (!canvas) {
				return;
			}

			var l = left, t = top, w = width, h = height;
			var a = canvas._cliprectarray;
			if (!a || !a.length) {
				canvas._cliprectarray = [[l, t, w, h]];
			}
			else {
				var r = a[a.length - 1];

				l = Math.max(r[0], left);
				t = Math.max(r[1], top);
				w = Math.min(r[0] + r[2], left + width) - l;
				h = Math.min(r[1] + r[3], top + height) - t;

				a.push([l, t, w, h]);
			}

			canvas.save();
			canvas.beginPath();
			canvas.rect(l, t, w, h);
			canvas.clip();
		};
		nexacro._clipPop2Canvas = function (canvas) {
			if (!canvas) {
				return;
			}

			var a = canvas._cliprectarray;
			if (a) {
				a.pop();
				if (a.length <= 0) {
					delete canvas._cliprectarray;
				}
			}

			canvas.restore();
		};

		nexacro._drawElement2Canvas = function (canvas, elem, left, top, optxt, opimg) {
			if (canvas && elem) {
				var l = left || 0;
				var t = top || 0;
				var w = elem.width;
				var h = elem.height;

				var style = nexacro._getCurrentStyleObject(elem);

				var bkcolor = nexacro._getCurrentStyleValue(style, "background-color");
				var bkimage = nexacro._getCurrentStyleValue(style, "background-image");
				var bkposit = nexacro._getCurrentStyleValue(style, "background-position");
				var bkrepeat = nexacro._getCurrentStyleValue(style, "background-repeat");

				var halign = nexacro._getCurrentStyleValue(style, "text-align");
				var font = nexacro._getCurrentStyleValue(style, "font");
				var color = nexacro._getCurrentStyleValue(style, ("color"));

				var drawImg, drawBox, drawIco, drawTxt;
				var image;

				nexacro._clipAdd2Canvas(canvas, l, t, w, h);

				switch (elem._type_name) {
					case "ControlElement":
					case "ScrollableControlElement":
					case "FrameControlElement":
					case "GridScrollableControlElement":
					case "GridBandControlElement":
					case "GridRowControlElement":
						{

							var border = elem.border ? elem.border : elem._border_info;
							var radius = elem.borderRadius ? elem.borderRadius : null;

							if (border) {
								var offset;

								var rx = radius ? radius.x : 0;
								var ry = radius ? radius.y : 0;

								var tw = border.top._width;
								var rw = border.right._width;
								var bw = border.bottom._width;
								var lw = border.left._width;

								if (rx && ry) {
									if (tw) {
										canvas._setLineStyle(border.top);
										canvas.drawStrokeInsetRoundRect(l, t, w, h, rx, ry);

										l += tw;
										t += tw;
										w -= tw;
										h -= tw;
									}
								}
								else if (border._single) {
									if (tw) {
										canvas._setLineStyle(border.top);
										canvas.drawStrokeInsetRect(l, t, w, h);

										l += tw;
										t += tw;
										w -= tw;
										h -= tw;
									}
								}
								else {
									if (border.top._isValid()) {
										offset = t + tw / 2;
										canvas._setLineStyle(border.top);
										canvas.drawStrokeLine(l, offset, l + w, offset);
										t += tw;
									}
									if (border.right._isValid()) {
										offset = l + w - rw / 2;
										canvas._setLineStyle(border.right);
										canvas.drawStrokeLine(offset, t, offset, t + h);
										w -= rw;
									}
									if (border.bottom._isValid()) {
										offset = t + h - bw / 2;
										canvas._setLineStyle(border.bottom);
										canvas.drawStrokeLine(l, offset, l + w, offset);
										h -= bw;
									}
									if (border.left._isValid()) {
										offset = l + lw / 2;
										canvas._setLineStyle(border.left);
										canvas.drawStrokeLine(offset, t, offset, t + h);
										l += lw;
									}
								}
							}

							if (bkrepeat) {
								if (bkimage && bkimage != "none") {
									canvas.drawImage(elem, 0, 0, bkimage.width, bkimage.height);
								}
								else {
									canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
									canvas.drawFillRect(l, t, w, h);
								}
							}
							else {
								if (bkimage && bkimage != "none") {
									canvas.drawImage(bkimage, 0, 0, bkimage.width, bkimage.height);
								}
								else {
									canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
									canvas.drawFillRect(l, t, w, h);
								}
							}

							break;
						}
					case "IconElement":
					case "ImageElement":
						{

							drawImg = !opimg || opimg == "drawImg";
							drawBox = opimg && opimg == "drawBox";

							if (drawImg) {
								if (style.type == "runtime") {
									image = new nexacro.Image();
									if (elem.icon) {
										image.set_src(elem.icon.value);
									}
									if (elem.image) {
										image.set_src(elem.image.url);
									}

									canvas.drawImage(image, l, t, w, h);
								}
								else {
									canvas.drawImage(elem, l, t, w, h);
								}
							}
							if (drawBox) {
								canvas.setElementStrokeStyle(canvas.color);
								canvas.drawStrokeInsetRect(l, t, w, h);
							}

							break;
						}
					case "IconTextElement":
						{

							drawBox = elem._box_node || 0;
							drawIco = elem._icon_node || elem.icon;

							if (drawBox) {
								if (bkcolor) {
									canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
									canvas.drawFillRect(l, t, w, h);
								}
								if (bkimage && bkimage != "none") {
									image = new nexacro.Image();
									image.set_src(bkimage);

									var ix = l, iy = t;
									var iw = image.width, ih = image.height;

									if (bkposit && elem.parent_elem) {
										var pw = elem.parent_elem.width;
										var ph = elem.parent_elem.height;

										ix += Math.max((pw - iw) / 2, 0);
										iy += Math.max((ph - ih) / 2, 0);
									}

									canvas.drawImage(image, ix, iy, iw, ih);
								}
							}
							if (drawIco) {
								if (style.type == "runtime" && elem.icon) {
									image = new nexacro.Image();
									image.set_src(elem.icon.value);

									canvas.drawImage(image, l, t, image.width, image.height);
								}
								else if (elem._icon_node) {
									canvas.drawImage(elem._icon_node, l, t, elem._icon_node.width, elem._icon_node.height);
								}
							}
							{

								break;
							}
						}
					case "TextBoxElement":
					case "InputElement":
					case "TextAreaElement":
						{

							drawBox = (optxt && optxt == "drawBox") && elem.text;
							drawTxt = (!optxt || optxt == "drawTxt") && elem.text;

							var padding = elem.textPadding;
							if (padding) {
								l += padding.left;
								t += padding.top;
							}
							if (halign) {
								canvas.setElementTextAlign(halign);
							}
							if (font) {
								canvas.setElementFont(nexacro.FontObject(font));
							}
							if (color) {
								canvas.setElementFillStyle(nexacro.ColorObject(color));
							}

							var x;
							if (drawTxt) {
								var text = elem.text;
								switch (halign) {
									case "right":
										x = l + w;
										break;
									case "center":
										x = l + w / 2;
										break;
									case "left":
										x = l;
										break;
								}

								canvas.fillText(text, x, t);
							}
							if (drawBox) {
								var n = elem.text.length;
								var c = 6, r = 8, s = 1;
								x = Math.max(w - (c + s) *  n - s, 0);

								switch (halign) {
									case "right":
										break;
									case "center":
										x /= 2;
										break;
									case "left":
										x = 0;
										break;
								}

								l = l + x;
								t = (h - r) / 2;

								for (var i = 0; i < n && l + c < l + w; i++, l += c + s) {
									canvas.drawFillRect(l, t, c, r);
								}
							}

							break;
						}
					case "CanvasElement":
					case "PluginElement":
					case "WebBrowserPluginElement":
					case "VideoPlayerPluginElement":
					case "GoogleMapElement":
					case "ContainerElement":
					case "ModalOverlayElement":
						{

							break;
						}
				}

				nexacro._clipPop2Canvas(canvas);
			}
		};
		nexacro._drawComponent2Canvas = function (canvas, comp, left, top, optxt, opimg) {
			if (canvas && comp) {
				var l = left || 0;
				var t = top || 0;
				var w = comp.getOffsetWidth();
				var h = comp.getOffsetHeight();

				nexacro._clipAdd2Canvas(canvas, l, t, w, h);

				var control_elem = comp.getElement();
				if (control_elem && control_elem.handle) {
					var i, n;
					var items, item, children, child;

					var cl, ct;
					var el, et;

					var b = comp._getCurrentStyleBorder();
					var bl = b ? b.left._width : 0;
					var bt = b ? b.top._width : 0;

					nexacro._drawElement2Canvas(canvas, control_elem, l, t, optxt, opimg);

					l += bl;
					t += bt;

					var child_elem = control_elem.getContainerElement();
					child_elem = comp._getClientElement ? comp._getClientElement() : child_elem;
					child_elem = comp._cell_elem ? comp._cell_elem : child_elem;
					child_elem = comp._text_elem ? comp._text_elem : child_elem;
					child_elem = comp._img_elem ? comp._img_elem : child_elem;
					child_elem = comp._input_element ? comp._input_element : child_elem;

					if (child_elem && child_elem != control_elem && child_elem.handle) {
						el = child_elem.left;
						et = child_elem.top;

						canvas.setElementFont(comp._getCurrentStyleInheritValue("font"));
						canvas.setElementColor(comp._getCurrentStyleInheritValue("color"));

						nexacro._drawElement2Canvas(canvas, child_elem, l + el, t + et, optxt, opimg);
					}

					children = comp._getChildren ? comp._getChildren() : null;
					if (children) {
						for (i = 0, n = children.length; i < n; i++) {
							child = children[i];
							if (child) {
								cl = child.getOffsetLeft();
								ct = child.getOffsetTop();

								nexacro._drawComponent2Canvas(canvas, child, l + cl, t + ct, optxt, opimg);
							}
						}
					}

					items = comp._getItems ? comp._getItems() : null;
					if (items) {
						for (i = 0, n = items.length; i < n; i++) {
							item = items[i];
							if (item) {
								cl = item.getOffsetLeft();
								ct = item.getOffsetTop();

								nexacro._drawComponent2Canvas(canvas, item, l + cl, t + ct, optxt, opimg);
							}
						}
					}

					var ncchild = comp._getNCChildren ? comp._getNCChildren() : null;
					if (ncchild) {
						for (i = 0, n = ncchild.length; i < n; i++) {
							child = ncchild[i];
							if (child) {
								cl = child.getOffsetLeft();
								ct = child.getOffsetTop();

								nexacro._drawComponent2Canvas(canvas, child, l + cl, t + ct, optxt, opimg);
							}
						}
					}
				}

				nexacro._flushCommand(canvas.linked_control ? canvas.linked_control._getWindow() : canvas.parent ? canvas.parent._getWindow() : null);
				nexacro._clipPop2Canvas(canvas);
			}
		};
	}

	nexacro._setNotifyType = function (type, comp) {
		this._notifytype = type;
		this._notifycomp = comp;
	};
	nexacro._errorV8CallStack = function () {
		Error.stackTraceLimit = 30;

		var traceFn = nexacro.__onNexacroStudioError ? nexacro.__onNexacroStudioError : Error ? trace : null;
		if (traceFn) {
			var e = new Error();
			var stack = e.stack;
			var str = "";

			var i, j;
			var frame, func, argstr, tempstr;
			var _this, _obname, _fnname;

			try {
				for (i = 1; i < stack.length; i++) {
					frame = stack[i];
					func = frame.getFunction();
					argstr = "";
					for (j = 0; j < func.arguments.length; j++) {
						tempstr = func.arguments[j] + ", ";
						if (tempstr.length > 30) {
							argstr += "[LONG STR], ";
						}
						else {
							argstr += tempstr;
						}
					}

					_this = frame.getThis();
					_obname = _this.id ? _this.id : _this.name;
					_fnname = frame.getFunctionName();
					str += "\n   " + _this + _obname + "." + _fnname + "(arg: " + argstr + ")";
				}

				var mode = 0;

				switch (mode) {
					case 0:
						traceFn("\n===[callstack(" + (stack.length - 1) + ")]==============================\n" + str + "\n============================================");
						break;
					case 1:
						{

							traceFn("\n===[callstack(" + (stack.length - 1) + ")]==============================");
							var strlist = str.split("\n");
							for (i = 0; i < strlist.length; i++) {
								traceFn(strlist[i]);
							}
							traceFn("============================================");
						}
						break;
				}
			}
			catch (e) {
				nexacro._settracemsg(e);
			}
		}
	};
}
