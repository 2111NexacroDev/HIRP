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


if (!nexacro._BindInfo) {
	nexacro._BindConst = 
		{
		BINDINDEX_ROWINDEX : -99, 
		BINDINDEX_ROWLEVEL : -98, 
		BINDINDEX_ROWGROUP : -97, 
		BINDINDEX_NODENAME : -60, 
		BINDINDEX_NODETYPE : -61, 
		BINDINDEX_NODEVALUE : -62, 
		BINDINDEX_ATTRIBUTE : -70, 
		BINDINDEX_COLBEGIN : 0, 
		BINDINDEX_COLUNSET : -1
	};


	nexacro._BindInfo = function () {
		nexacro._ExprInfo.call(this);



		this.bindid = "";
		this.colidx = -1;
	};

	var _pBindInfo = nexacro._createPrototype(nexacro._ExprInfo, nexacro._BindInfo);
	nexacro._BindInfo.prototype = _pBindInfo;
	_pBindInfo._type_name = "_BindInfo";



	_pBindInfo._isSetBindCtx = function () {
		return this.bindid != "";
	};
	_pBindInfo._isSetBindIdx = function () {
		return this.colidx != -1;
	};

	_pBindInfo._setBindColCtx = function (bindcolctx) {
		this.bindid = bindcolctx;
	};
	_pBindInfo._setBindColIdx = function (bindcolidx) {
		this.colidx = bindcolidx;
	};

	_pBindInfo._clear = function () {
		nexacro._ExprInfo.prototype._clear.call(this);

		this.bindid = "";
		this.colidx = -1;
	};

	delete _pBindInfo;
}

if (!nexacro._BindData) {
	nexacro._BindData = function (valuebind, databind, xmlbind, jsonbind, fullbind, levelbind, dataexpr, fullexpr, xmlexpr, jsonexpr) {
		nexacro._ExprData.call(this, false, dataexpr, fullexpr, xmlexpr, jsonexpr);

		this._setBindType(valuebind, databind, xmlbind, jsonbind, fullbind, levelbind);

		this._strdataset = "";
		this._strdatactx = "";
		this._binddataset = null;
		this._binddatactx = null;
		this._binddatalist = null;
		this._binddatacurr = -1;

		this._colsinfo = ["", "", ""];
		this._propinfo = ["", "", ""];
		this._bindinfo = [null, null, null];
		this._bindinfostart = -1;
	};

	var _pBindData = nexacro._createPrototype(nexacro._ExprData, nexacro._BindData);
	nexacro._BindData.prototype = _pBindData;
	_pBindData._type_name = "_BindData";



	_pBindData._setBindType = function (valuebind, databind, xmlbind, jsonbind, fullbind, levelbind) {
		this._bindtype = (valuebind ? 0x01 : 0) + (databind ? 0x02 : 0) + (xmlbind ? 0x04 : 0) + (jsonbind ? 0x08 : 0) + (fullbind ? 0x10 : 0) + (levelbind ? 0x20 : 0);
	};
	_pBindData._setBindTypeXml = function () {
		this._bindtype |= 0x04;
	};
	_pBindData._setBindTypeJson = function () {
		this._bindtype |= 0x08;
	};

	_pBindData._isValueBind = function () {
		return (this._bindtype & 0x01) != 0;
	};
	_pBindData._isInnerBind = function () {
		return (this._bindtype & 0x02) != 0;
	};
	_pBindData._isFullBind = function () {
		return (this._bindtype & 0x10) != 0;
	};
	_pBindData._isDataBind = function () {
		return (this._bindtype & 0x1E) != 0;
	};
	_pBindData._isXmlBind = function () {
		return (this._bindtype & 0x04) != 0;
	};
	_pBindData._isJsonBind = function () {
		return (this._bindtype & 0x08) != 0;
	};
	_pBindData._isLevelBind = function () {
		return (this._bindtype & 0x20) != 0;
	};

	_pBindData._isDataSetEnableEvent = function () {
		return this._binddataset && this._binddataset.enableevent;
	};
	_pBindData._isDataCtxEnableEvent = function () {
		return true;
	};

	_pBindData._setBindDataSet = function (dataset, target) {
		if (!target) {
			return;
		}

		if (!dataset) {
			return this._clearBindDataSet(target);
		}

		this._detachBindDataSet(target);

		if (dataset instanceof nexacro.Dataset || (typeof dataset == "object" && dataset._type_name == "Dataset")) {
			this._strdataset = dataset.id;
			this._binddataset = dataset;
		}
		else {
			this._strdataset = dataset.replace("@", "");
			this._binddataset = target._findDataset(this._strdataset);
		}

		this._attachBindDataSet(target);
	};
	_pBindData._getBindDataSetStr = function () {
		return this._strdataset;
	};
	_pBindData._getBindDataSetObj = function () {
		return this._binddataset;
	};
	_pBindData._getBindDataSetColInfos = function () {
		return this._binddataset ? this._binddataset.colinfos : null;
	};

	_pBindData._attachBindDataSet = function (target) {
		if (this._binddataset && target) {
			this._binddataset._setEventHandler("onload", target._callback_onload, target);
			this._binddataset._setEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
			this._binddataset._setEventHandler("oncolumnchanged", target._callback_oncolumnchanged, target);
			this._binddataset._setEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
			this._binddataset._setEventHandler("onrowposchanged", target._callback_onrowposchanged, target);
		}
	};

	_pBindData._detachBindDataSet = function (target) {
		if (this._binddataset && target) {
			this._binddataset._removeEventHandler("onload", target._callback_onload, target);
			this._binddataset._removeEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
			this._binddataset._removeEventHandler("oncolumnchanged", target._callback_oncolumnchanged, target);
			this._binddataset._removeEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
			this._binddataset._removeEventHandler("onrowposchanged", target._callback_onrowposchanged, target);
		}
	};

	_pBindData._clearBindDataSet = function (target) {
		if (!target) {
			return;
		}

		this._detachBindDataSet(target);

		this._strdataset = "";
		this._binddataset = null;
	};

	_pBindData._appendDataSetRow = function (rowindex, newrec, newowner) {
		var curr = rowindex ? this._binddataset.insertRow(rowindex) : this._binddataset.addRow();

		return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
	};
	_pBindData._insertDataSetRow = function (rowindex, newrec, newowner) {
		var curr = rowindex ? this._binddataset.insertRow(rowindex) : this._binddataset.addRow();

		return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
	};
	_pBindData._subaddDataSetRow = function (rowindex, newrec, newowner) {
		var curr = rowindex ? this._binddataset.insertRow(rowindex + 1) : this._binddataset.addRow();

		return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
	};
	_pBindData._subinsDataSetRow = function (rowindex, newrec, newowner) {
		var curr = rowindex ? this._binddataset.insertRow(rowindex + 1) : this._binddataset.addRow();

		return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
	};
	_pBindData._deleteDataSetRow = function (rowindex) {
		return this._binddataset.deleteRow(rowindex);
	};

	_pBindData._setBindDataCtx = function (datactx, datakey, target) {
		if (!target) {
			return;
		}

		if (!datactx) {
			return this._clearBindDataCtx(target);
		}

		if (this._isXmlBind() && datactx.getElementsByTagName) {
			this._strdatactx = datactx.id;
			this._binddatactx = datactx;
			this._binddatakey = datakey;
			this._binddatalist = this._convertXdom2DataList(datactx, datakey);
		}
		else if (this._isJsonBind() && nexacro._isObject(datactx)) {
			this._strdatactx = datactx.id;
			this._binddatactx = datactx;
			this._binddatakey = datakey;
			this._binddatalist = this._convertJson2DataList(datactx, datakey);
		}
		else {
			var c = datactx.charAt(0);

			if (c == '<') {
				this._strdatactx = datactx;
				this._binddatactx = this._convertXml2Xdom(datactx);
				this._binddatakey = datakey;
				this._binddatalist = this._convertXdom2DataList(this._binddatactx, datakey);
				this._setBindTypeXml();
			}
			else if (c == '{' || c == '[') {
				this._strdatactx = datactx;
				this._binddatactx = this._convertStr2Json(datactx);
				this._binddatakey = datakey;
				this._binddatalist = this._convertJson2DataList(this._binddatactx, datakey);
				this._setBindTypeJson();
			}
			else {
				this._strdatactx = datactx.replace("@", "");
				this._binddatactx = target._findObject(this._strdatactx);
				this._binddatakey = datakey;

				if (nexacro._isObject(this._binddatactx)) {
					this._resetBindDataList();
				}
			}
		}

		this._attachBindDataCtx(target);
	};
	_pBindData._resetBindDataList = function (init) {
		if (init) {
			if (this._isXmlBind() && this._binddatactx.getElementsByTagName) {
				return this._binddatalist = this._convertXdom2DataList(this._binddatactx, this._binddatakey);
			}
			if (this._isJsonBind()) {
				return this._binddatalist = this._convertJson2DataList(this._binddatactx, this._binddatakey);
			}
		}
	};
	_pBindData._getBindDataCtxStr = function (convert) {
		if (convert) {
			if (this._isXmlBind()) {
				return this._convertXdom2Xml(this._getBindDataCtxObj(convert));
			}
			if (this._isJsonBind()) {
				return this._convertJson2Str(this._getBindDataCtxObj(convert));
			}
		}
		return this._strdatactx;
	};
	_pBindData._getBindDataCtxObj = function (convert) {
		if (convert) {
			if (this._isXmlBind()) {
				return this._convertDataList2Xdom(this._binddatalist);
			}
			if (this._isJsonBind()) {
				return this._convertDataList2Json(this._binddatalist);
			}
		}
		return this._binddatactx;
	};
	_pBindData._fetchBindDataCtxStr = function () {
		return this._strdatactx = this._getBindDataCtxStr(true);
	};
	_pBindData._fetchBindDataCtxObj = function () {
		return this._binddatactx = this._getBindDataCtxObj(true);
	};

	_pBindData._getBindDataCtxKeyInfos = function () {
		return this._binddatakey;
	};

	_pBindData._attachBindDataCtx = function (target) {
		if (this._binddatactx && target) {
			this._initDataCtxEventHandler();
			this._addDataCtxEventHandler("onload", target._callback_onload, target);
			this._addDataCtxEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
			this._addDataCtxEventHandler("oncolumnchanged", target._callback_oncolumnchanged, target);
			this._addDataCtxEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
			this._addDataCtxEventHandler("onrowposchanged", target._callback_onrowposchanged, target);
		}
	};

	_pBindData._detachBindDataCtx = function (target) {
		if (this._binddatactx && target) {
			this._removeDataCtxEventHandler("onload", target._callback_onload, target);
			this._removeDataCtxEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
			this._removeDataCtxEventHandler("oncolumnchanged", target._callback_oncolumnchanged, target);
			this._removeDataCtxEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
			this._removeDataCtxEventHandler("onrowposchanged", target._callback_onrowposchanged, target);
			this._uninitDataCtxEventHandler();
		}
	};

	_pBindData._clearBindDataCtx = function (target) {
		if (!target) {
			return;
		}

		this._detachBindDataCtx(target);

		if (this._binddatalist) {
			delete this._binddatalist;
		}
		if (this._binddatactx) {
			delete this._binddatactx;
		}

		this._strdatactx = "";
		this._binddatactx = null;
		this._binddatalist = null;

		if (this._document) {
			delete this._document;
		}
	};

	_pBindData._newXdomItem = function (typename) {
		if (!this._document) {
			this._document = nexacro._parseXMLDocument("<Root/>");
		}
		return this._document.createElement(typename);
	};
	_pBindData._newJsonItem = function (json, type, key, parent, child) {
		return {
			_type : type, 
			__key : key, 
			__parent : parent ? parent : null, 
			__child : child ? child : [], 
			__value : json
		};
	};

	_pBindData._convertXdom2DataList = function (ctx, key) {
		return ctx ? ctx.getElementsByTagName(key) : null;
	};
	_pBindData._convertJson2DataList = function (ctx, key) {
		var arr = [];

		function arraychild (o, p) {
			if (p && p.__c) {
				p.__c.push(o);
			}
		}
		function arrayconvert (b, x, a) {
			var n = x.__v ? x.__v : x;
			var p = x.__v ? x : null;
			var o;

			for (var k in n) {
				var v = n[k];

				if (nexacro._isArray(v)) {
					for (var i = 0, l = v.length, w = v[i]; i < l; w = v[++i]) {
						o = this._newJsonItem(w, "array", k, p);
						a.push(o);
						arraychild(o, p);
						arrayconvert(o, a);
					}
					continue;
				}
				if (nexacro._isObject(v)) {
					{

						o = this._newJsonItem(v, "array", k, p);
						a.push(o);
						arraychild(o, p);
						arrayconvert(o, a);
					}
					continue;
				}
			}

			return a;
		}

		return arrayconvert(ctx, arr);
	};
	_pBindData._convertDataList2Xdom = function (list) {
		return this._binddatactx;
	};
	_pBindData._convertDataList2Json = function (list) {
		return this._binddatactx;
	};
	_pBindData._convertXml2Xdom = function (xmlstr) {
		return nexacro._parseXMLDocument(xmlstr);
	};
	_pBindData._convertStr2Json = function (jsonstr) {
		return nexacro._executeEvalStr('(' + jsonstr + ')');
	};
	_pBindData._convertXdom2Xml = function (xdomobj) {
		return nexacro._documentToXml(xdomobj);
	};
	_pBindData._convertJson2Str = function (jsonobj) {
		return JSON.stringify(jsonobj);
	};
	_pBindData._cloneXdom = function (xdomobj) {
		return xdomobj.cloneNode();
	};
	_pBindData._cloneJson = function (jsonobj) {
		return JSON.parse(JSON.stringify(jsonobj));
	};

	_pBindData._getXdomCtxIndex = function (ctx, index) {
		return index;
	};
	_pBindData._getXdomCtxLevel = function (ctx, index) {
		var c = -1;
		for (var p = ctx.parentNode; p; p = p.parentNode) {
			c++;
		}
		return c;
	};
	_pBindData._getXdomCtxGroup = function (ctx, index) {
		return ctx ? ctx.childNodes ? 1 : 0 : -1;
	};
	_pBindData._getXdomCtxAttrb = function (ctx, att, nil) {
		return ctx ? ctx.getAttribute(att) : nil;
	};
	_pBindData._setXdomCtxAttrb = function (ctx, att, val) {
		if (ctx) {
			ctx.setAttribute(att, val);
		}
	};
	_pBindData._getXdomCtxParent = function (ctx, nil) {
		return ctx ? ctx.parentNode : nil;
	};
	_pBindData._getXdomCtxChild = function (ctx, index) {
		return ctx ? ctx.childNodes[index] : null;
	};
	_pBindData._getXdomCtxFirstChild = function (ctx) {
		return ctx ? ctx.firstChild : null;
	};
	_pBindData._getXdomCtxLastChild = function (ctx) {
		return ctx ? ctx.lastChild : null;
	};
	_pBindData._appendXdomCtxChild = function (ctx, child) {
		if (ctx) {
			ctx.appendChild(child);
		}
	};
	_pBindData._insertXdomCtxChild = function (ctx, before, child) {
		if (ctx) {
			ctx.insertBefore(child, before);
		}
	};
	_pBindData._deleteXdomCtxChild = function (ctx, child) {
		if (ctx) {
			ctx.removeChild(child);
		}
	};

	_pBindData._getJsonCtxIndex = function (ctx, index) {
		return index;
	};
	_pBindData._getJsonCtxLevel = function (ctx, index) {
		var c = -1;
		for (var p = ctx; p; p = this._getJsonCtxParent(p)) {
			c++;
		}
		return c;
	};
	_pBindData._getJsonCtxGroup = function (ctx, index) {
		return ctx ? this._getJsonCtxChild(ctx) ? 1 : 0 : -1;
	};
	_pBindData._getJsonCtxAttrb = function (ctx, att, nil) {
		return ctx && ctx.__value ? ctx.__value[att] : nil;
	};
	_pBindData._setJsonCtxAttrb = function (ctx, att, val) {
		if (ctx && ctx.__value) {
			ctx.__value[att] = val;
		}
	};
	_pBindData._getJsonCtxParent = function (ctx, nil) {
		return ctx ? ctx.__parent : nil;
	};
	_pBindData._getJsonCtxChild = function (ctx, index) {
		return ctx && ctx.__child ? ctx.__child[index] : null;
	};
	_pBindData._getJsonCtxFirstChild = function (ctx) {
		return ctx && ctx.__child ? ctx.__child[0] : null;
	};
	_pBindData._getJsonCtxLastChild = function (ctx) {
		return ctx && ctx.__child ? ctx.__child[ctx.__child.length - 1] : null;
	};
	_pBindData._appendJsonCtxChild = function (ctx, type, key, child) {
		if (ctx && ctx.__child && ctx.__value && key) {
			ctx.__child.push(this._newJsonItem(ctx, type, key, child));

			if (type == "object") {
				if (ctx.__value[key]) {
					ctx.__value[key] = null;
				}

				ctx.__value[key] = child;
			}
			if (type == "array") {
				if (!ctx.__value[key]) {
					ctx.__value[key] = [];
				}

				ctx.__value[key].push(child);
			}
		}
	};
	_pBindData._insertJsonCtxChild = function (ctx, type, key, before, child) {
		if (ctx && ctx.__child && ctx.__value && key) {
			var index = before ? ctx.__child.indexOf(before) : 0;

			ctx.__child.splice(index, 0, this._newJsonCtxChild(ctx, key, child));

			if (type == "object") {
				if (ctx.__value[key]) {
					ctx.__value[key] = null;
				}

				ctx.__value[key] = child;
			}
			if (type == "array") {
				if (!ctx.__value[key]) {
					ctx.__value[key] = [];
				}

				ctx.__value[key].splice(index, 0, child);
			}
		}
	};
	_pBindData._deleteJsonCtxChild = function (ctx, type, child) {
		if (ctx && ctx.__child) {
			var index = child ? ctx.__child.indexOf(child) : -1;
			if (index >= 0) {
				ctx.__child.splice(index, 1);
			}
		}
	};

	_pBindData._appendDataListChild = function (index, child) {
		var target = this._getBindRow(index);
		if (target) {
			if (this._isXmlBind()) {
				this._insertXdomCtxChild(this._getXdomCtxParent(target, this._binddatactx), null, child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
			if (this._isJsonBind()) {
				this._insertJsonCtxChild(this._getJsonCtxParent(target, this._binddatactx), "array", null, null, child);
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
		}

		return this._binddatacurr;
	};
	_pBindData._insertDataListChild = function (index, child, key) {
		var target = this._getBindRow(index);
		if (target) {
			if (this._isXmlBind()) {
				this._insertXdomCtxChild(this._getXdomCtxParent(target, this._binddatactx), target, child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
			else {
				this._insertJsonCtxChild(this._getXdomJsonParent(target, this._binddatactx), "array", key, target, child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
		}
		return this._binddatacurr;
	};
	_pBindData._subaddDataListChild = function (index, child, key) {
		var target = this._getBindRow(index);
		if (target) {
			if (this._isXmlBind()) {
				this._appendXdomCtxChild(target, child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
			else {
				this._appendJsonCtxChild(target, "array", key, child);
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
		}
		return this._binddatacurr;
	};
	_pBindData._subinsDataListChild = function (index, child, key) {
		var target = this._getBindRow(index);
		if (target) {
			if (this._isXmlBind()) {
				this._insertXdomCtxChild(target, this._getXdomCtxFirstChild(target), child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
			else {
				this._insertJsonCtxChild(target, "array", 0, child, key);
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
		}
		return this._binddatacurr;
	};
	_pBindData._deleteDataListChild = function (index) {
		var child = this._getBindRow(index);
		if (child) {
			if (this._isXmlBind()) {
				this._deleteXdomCtxChild(this._getXdomCtxParent(child, this._binddatactx), child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
			else {
				this._deleteJsonCtxChild(this._getJsonCtxParent(child, this._binddatactx), child);
				this._resetBindDataList(nexacro._Browser == "Runtime");
				this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
				this._fireDataCtxOnRowsetChangedEvent();
			}
		}
		return this._binddatacurr;
	};


	_pBindData._initDataCtxEventHandler = function () {
		this._binddatactxevent = new nexacro._EventSinkObject("ctxevent");
		this._binddatactxevent._event_list = {
			"onload" : 1, 
			"onrowsetchanged" : 1, 
			"onvaluechanged" : 1
		};
	};
	_pBindData._uninitDataCtxEventHandler = function () {
		if (this._binddatactxevent) {
			delete this._binddatactxevent;
		}
	};
	_pBindData._setDataCtxEventHandler = function (eventid, handler, target) {
		this._binddatactxevent.setEventHandler(eventid, handler, target);
	};
	_pBindData._addDataCtxEventHandler = function (eventid, handler, target) {
		this._binddatactxevent.addEventHandler(eventid, handler, target);
	};
	_pBindData._removeDataCtxEventHandler = function (eventid, handler, target) {
		this._binddatactxevent.removeEventHandler(eventid, handler, target);
	};
	_pBindData._getDataCtxEvent = function (eventid) {
		return this._binddatactxevent[eventid];
	};

	_pBindData._fireDataCtxOnLoadEvent = function () {
		var event = this._getDataCtxEvent("onload");
		if (event && event._has_handlers) {
			var evt = new nexacro.DSLoadEventInfo(this, "onload", 0, "", 0);
			event._fireEvent(this, evt);
		}
	};
	_pBindData._fireDataCtxOnRowsetChangedEvent = function () {
		var event = this._getDataCtxEvent("onrowsetchanged");
		if (event && event._has_handlers) {
			var evt = new nexacro.DSRowsetChangeEventInfo(this, "onrowsetchanged", this._binddatacurr, 1, 0);
			event._fireEvent(this, evt);
		}
	};
	_pBindData._fireDataCtxOnValueChanged = function () {
		var event = this._getDataCtxEvent("onvaluechanged");
		if (event && event._has_handlers) {
			var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this._binddatacurr, -1, -1, "", undefined, undefined);
			event._fireEvent(this, evt);
		}
	};

	_pBindData._setCodeColumn = function (column, propid) {
		if (this._isInnerBind()) {
			this._colsinfo[0] = column;
			this._propinfo[0] = propid;
		}
	};
	_pBindData._getCodeColumn = function () {
		if (this._isInnerBind()) {
			return this._colsinfo[0];
		}
	};
	_pBindData._clearCodeColumn = function () {
		this._colsinfo[0] = "";
		this._propinfo[0] = "";
	};

	_pBindData._setLevelColumn = function (column, propid) {
		if (this._isDataBind()) {
			this._colsinfo[1] = column;
			this._propinfo[1] = propid;
		}
	};
	_pBindData._getLevelColumn = function () {
		if (this._isDataBind()) {
			return this._colsinfo[1];
		}
	};
	_pBindData._clearLevelColumn = function () {
		this._colsinfo[1] = "";
		this._propinfo[1] = "";
	};

	_pBindData._setGroupColumn = function (column, propid) {
		if (this._isDataBind()) {
			this._colsinfo[2] = column;
			this._propinfo[2] = propid;
		}
	};
	_pBindData._getGroupColumn = function () {
		if (this._isDataBind()) {
			return this._colsinfo[2];
		}
	};
	_pBindData._clearGroupColumn = function () {
		this._colsinfo[2] = "";
		this._propinfo[2] = "";
	};

	_pBindData._setDataColumn = function (cols, props) {
		if (this._isDataBind()) {
			this._clearDataColumn();

			if (cols) {
				if (cols.length) {
					this._pushInfoArray(cols, this._colsinfo);
				}
				else {
					this._colsinfo.push(cols);
				}
			}

			if (props) {
				if (props.length) {
					this._pushInfoArray(props, this._propinfo);
				}
				else {
					this._propinfo.push(props);
				}
			}
		}
	};

	_pBindData._clearDataColumn = function () {
		this._propinfo.splice(3, this._propinfo.length);
		this._colsinfo.splice(3, this._colsinfo.length);
	};

	_pBindData._getBindRow = function (index, nil) {
		if (this._binddataset) {
		}
		if (this._binddatalist) {
			if (index && index >= 0 && index < this._binddatalist.length) {
				return this._binddatalist[index];
			}
		}

		return nil;
	};
	_pBindData._getBindRowCount = function () {
		if (this._binddataset) {
			return this._binddataset.getRowCount();
		}
		if (this._binddatalist) {
			return this._binddatalist.length;
		}
		return 0;
	};
	_pBindData._getBindRowCurrent = function () {
		if (this._binddataset) {
			return this._binddataset.rowposition;
		}
		if (this._binddatalist) {
			return this._binddatacurr;
		}
	};
	_pBindData._setBindRowCurrent = function (rowindex) {
		if (this._binddataset) {
			this._binddataset.set_rowposition(rowindex);
		}
		if (this._binddatalist) {
			this._binddatacurr = rowindex;
		}
	};
	_pBindData._appendBindRow = function (rowindex, newitem, newowner) {
		if (this._binddataset) {
			return this._appendDataSetRow(rowindex, newitem, newowner);
		}
		if (this._binddatalist) {
			return this._appendDataListChild(rowindex, newitem, newowner);
		}
	};
	_pBindData._insertBindRow = function (rowindex, newitem, newowner) {
		if (this._binddataset) {
			return this._insertDataSetRow(rowindex, newitem, newowner);
		}
		if (this._binddatalist) {
			return this._insertDataListChild(rowindex, newitem, newowner);
		}
	};
	_pBindData._subaddBindRow = function (rowindex, newitem, newowner) {
		if (this._binddataset) {
			return this._subaddDataSetRow(rowindex, newitem, newowner);
		}
		if (this._binddatalist) {
			return this._subaddDataListChild(rowindex, newitem, newowner);
		}
	};
	_pBindData._subinsBindRow = function (rowindex, newitem, newowner) {
		if (this._binddataset) {
			return this._subinsDataSetRow(rowindex, newitem, newowner);
		}
		if (this._binddatalist) {
			return this._subinsDataListChild(rowindex, newitem, newowner);
		}
	};
	_pBindData._deleteBindRow = function (rowindex) {
		if (this._binddataset) {
			return this._deleteDataSetRow(rowindex);
		}
		if (this._binddatalist) {
			return this._deleteDataListChild(rowindex);
		}
	};
	_pBindData._copyBindRow = function (rowindex, srcitem, srcowner) {
		if (this._binddataset) {
			this._binddataset.copyRow(rowindex, srcowner, srcitem);
		}
		if (this._binddatalist) {
			this._binddatalist[rowindex] = nexacro._clone(srcitem);
		}
		return rowindex;
	};
	_pBindData._moveBindRow = function (rowindex, tarindex) {
		if (this._binddataset) {
			return this._binddataset.deleteRow(rowindex);
		}
		if (this._binddatalist) {
			this._binddatalist.splice(rowindex, 1);

			return this._binddatacurr = Math.min(rowindex, this._binddatalist.length - 1);
		}
	};
	_pBindData._exchangeBindRow = function (rowindex, tarindex) {
		if (this._binddataset) {
			return this._binddataset.deleteRow(rowindex);
		}
		if (this._binddatalist) {
			this._binddatalist.splice(rowindex, 1);

			return this._binddatacurr = Math.min(rowindex, this._binddatalist.length - 1);
		}
	};
	_pBindData._searchBindRow = function (colindex, data) {
	};

	_pBindData._getBindColIndex = function (colid) {
		if (colid && colid.charAt(0) == '#') {
			switch (colid) {
				case "#rowindex":
					return nexacro._BindConst.BINDINDEX_ROWINDEX;
				case "#rowlevel":
					return nexacro._BindConst.BINDINDEX_ROWLEVEL;
				case "#rowgroup":
					return nexacro._BindConst.BINDINDEX_ROWGROUP;
				case "#nodename":
					return nexacro._BindConst.BINDINDEX_NODENAME;
				case "#nodetype":
					return nexacro._BindConst.BINDINDEX_NODETYPE;
				case "#nodevalue":
					return nexacro._BindConst.BINDINDEX_NODEVALUE;
				case "#nodechild":
					return nexacro._BindConst.BINDINDEX_NODECHILD;
			}
			return nexacro._BindConst.BINDINDEX_COLUNSET;
		}
		else {
			if (this._binddataset) {
				return this._binddataset.getColIndex(colid);
			}
			else {
				return nexacro._BindConst.BINDINDEX_ATTRIBUTE;
			}
		}
	};

	_pBindData._getBindColName = function (propid) {
		{

			var index = this._propinfo.indexOf(propid);

			if (index >= 0 && index < this._colsinfo.length) {
				return this._colsinfo[index];
			}
		}
	};

	_pBindData._applyBindDataSet = function (colindex, rowindex, data) {
		{

			return this._binddataset.setColumn(rowindex, colindex, data);
		}
	};
	_pBindData._fetchBindDataSet = function (colindex, rowindex) {
		{

			{

				switch (colindex) {
					case -60:
					case -61:
					case -62:
					case -63:
						return;
					case -97:
					case -98:
						return this._binddataset.getRowLevel(rowindex);
					case -99:
						return rowindex;
					case -70:
					case -1:
						return;
					default:
						return this._binddataset.getColumn(rowindex, colindex);
				}
			}
		}
	};
	_pBindData._applyBindDataCtx = function (attr, rowindex, data) {
		{

			var ctx = this._binddatalist[rowindex];
			var att = attr ? (attr.colidx ? attr.colidx : (attr.bindid ? attr.bindid : attr)) : null;

			if (att) {
				if (this._isXmlBind()) {
					switch (att) {
						case -60:
						case -61:
							return;
						case -62:
							return ctx.nodeValue = data;
						case -63:
							return;
						case -97:
						case -98:
						case -99:
							return;
						case -70:
						default:
							return this._setXdomCtxAttrb(ctx, att, data);
					}
				}
				else {
					switch (att) {
						case -60:
						case -61:
							return;
						case -62:
						case -63:
							return;
						case -97:
						case -98:
						case -99:
							return;
						case -70:
						default:
							return this._setJsonCtxAttrb(ctx, att, data);
					}
				}
			}
		}
	};
	_pBindData._fetchBindDataCtx = function (bindinfo, rowindex) {
		{

			var ctx = this._binddatalist[rowindex];
			var chk = bindinfo.colidx ? bindinfo.colidx : 0;
			var att = bindinfo.bindid ? bindinfo.bindid : bindinfo;

			if (ctx) {
				if (this._isXmlBind()) {
					switch (chk) {
						case -60:
							return ctx.nodeName;
						case -61:
							return ctx.nodeType;
						case -62:
							return ctx.nodeValue;
						case -63:
							return ctx.childNodes;
						case -97:
							return this._getXdomCtxGroup(ctx, rowindex);
						case -98:
							return this._getXdomCtxLevel(ctx, rowindex);
						case -99:
							return this._getXdomCtxIndex(ctx, rowindex);
						case -70:
						default:
							return this._getXdomCtxAttrb(ctx, att, "");
					}
				}
				else {
					switch (chk) {
						case -60:
						case -61:
						case -62:
							return;
						case -63:
							return ctx.__childs;
						case -97:
							return this._getJsonCtxGroup(ctx, rowindex);
						case -98:
							return this._getJsonCtxLevel(ctx, rowindex);
						case -99:
							return this._getJsonCtxIndex(ctx, rowindex);
						case -70:
						default:
							return this._getJsonCtxAttrb(ctx, att, "");
					}
				}
			}
		}
	};
	_pBindData._fetchExprDataSet = function (exprix, index) {
		if (exprix >= 0) {
			{

				var exprfn = this._exprfunc[exprix];

				if (exprfn) {
					if (this._isFullExpr()) {
						return exprfn.call(this._exprowner, index, index, this._exprtarget, this._binddataset, this._binddataset._viewRecords, this._binddataset._viewRecords[index], []);
					}
					else {
						return exprfn.call(this._exprowner, this._exprtarget);
					}
				}
			}
		}

		return undefined;
	};
	_pBindData._fetchExprDataCtx = function (exprix, index) {
		if (exprix >= 0) {
		}

		return undefined;
	};

	_pBindData._getBindInfos = function () {
		return this._bindinfo;
	};
	_pBindData._initBindInfo = function (bindinfo) {
		if (bindinfo) {
			bindinfo.exprix = -1;
			bindinfo.colidx = -1;

			var bindid = bindinfo.bindid;
			var exprcx = bindinfo.exprcx;

			if (this._isDataExpr()) {
				if (exprcx != "") {
					var exprfn = null;



					if (this._isFullExpr() && this._binddataset) {
						exprfn = this._binddataset._createExprFunc(exprcx);
					}
					else if (this._exprparser && this._exprtarget) {
						exprfn = nexacro._createInlineFunc(this._exprparser.makeExpr(this._exprtarget, exprcx));
					}

					if (exprfn) {
						bindinfo.exprix = this.setExprFunc(exprcx, exprfn);
					}
				}
				else if (bindid != "") {
					if (this._isFullBind()) {
						bindinfo.colidx = this._getBindColIndex(bindid);
					}
					else {
						bindinfo.colidx = this._getBindColIndex(this._getBindColName(bindid));
					}
				}
			}
			else {
				if (bindid != "") {
					if (this._isFullBind()) {
						bindinfo.colidx = this._getBindColIndex(bindid);
					}
					else {
						bindinfo.colidx = this._getBindColIndex(this._getBindColName(bindid));
					}
				}
			}
		}
	};

	_pBindData._initBindInfoArray = function (bindinfos) {
		{

			if (bindinfos) {
				for (var i = 0, l = bindinfos.length; i < l; i++) {
					this._initBindInfo(bindinfos[i]);
				}
			}
		}
	};
	_pBindData._pushBindInfoArray = function (bindinfos) {
		{

			if (bindinfos) {
				for (var i = 0, l = bindinfos.length; i < l; i++) {
					this._bindinfo.push(bindinfos[i]);
					bindinfos[i] = null;
				}
			}
		}
	};


	_pBindData._setBindInfos = function (codebindinfo, levelbindinfo, groupbindinfo, databindinfos) {
		{

			this._clearBindInfos(true);

			if (databindinfos) {
				this._bindinfostart = 3;
				this._addDataBindInfo(databindinfos);
			}
			if (groupbindinfo) {
				this._bindinfostart = 2;
				this._initBindInfo(groupbindinfo);
				this._bindinfo[2] = groupbindinfo;
			}
			if (levelbindinfo) {
				this._bindinfostart = 1;
				this._initBindInfo(levelbindinfo);
				this._bindinfo[1] = levelbindinfo;
			}
			if (codebindinfo) {
				this._bindinfostart = 0;
				this._initBindInfo(codebindinfo);
				this._bindinfo[0] = codebindinfo;
			}
		}
	};
	_pBindData._addDataBindInfo = function (bindinfo) {
		{

			if (bindinfo.length) {
				this._initBindInfoArray(bindinfo);
				this._pushBindInfoArray(bindinfo);
			}
			else {
				this._initBindInfo(bindinfo);
				this._bindinfo.push(bindinfo);
			}
		}
	};
	_pBindData._chkBindInfos = function () {
		return this._bindinfostart;
	};

	_pBindData._clearBindInfos = function (reset) {
		if (this._isDataExpr()) {
			this._clearExprFuncs();
		}



		if (reset) {
			this._bindinfo = [null, null, null];
		}
		else {
			this._bindinfo = [];
		}

		this._bindinfostart = -1;
	};

	_pBindData._setBindData = function (rowindex, bindinfo, data) {
		if (this._isDataBind()) {
			if (this._binddataset && bindinfo && bindinfo.colidx >= 0) {
				return this._applyBindDataSet(bindinfo.colidx, rowindex, data);
			}
			if (this._binddatactx && bindinfo && bindinfo.colidx != -1) {
				return this._applyBindDataCtx(bindinfo, rowindex, data);
			}
		}
	};
	_pBindData._setBindColumn = function (rowindex, colidx, data) {
		if (this._isDataBind()) {
			if (this._binddataset && colidx >= 0) {
				return this._applyBindDataSet(colidx, rowindex, data);
			}
			if (this._binddatactx && colidx != -1) {
				return this._applyBindDataCtx(colidx, rowindex, data);
			}
		}
	};
	_pBindData._setBindColumnByID = function (rowindex, colid, data) {
		if (this._isDataBind()) {
			if (this._binddataset && colid) {
				return this._applyBindDataSet(this._getBindColIndex(colid), rowindex, data);
			}
			if (this._binddatactx && colid) {
				return this._applyBindDataCtx(colid, rowindex, data);
			}
		}
	};

	_pBindData._getBindData = function (rowindex) {
		if (this._isDataBind()) {
			var infos = this._bindinfo;
			if (infos) {
				var i;
				var info;
				var infos_len = infos.length;

				if (this._binddataset) {
					for (i = 0; i < infos_len; i++) {
						info = infos[i];
						if (info) {
							if (info.bindid) {
								info.values = this._fetchBindDataSet(info.colidx, rowindex);
								continue;
							}
							if (info.exprcx) {
								info.values = this._fetchExprDataSet(info.exprix, rowindex);
								continue;
							}
						}
					}

					return this;
				}
				if (this._binddatactx) {
					for (i = 0; i < infos_len; i++) {
						info = infos[i];
						if (info) {
							{

								info.values = this._fetchBindDataCtx(info, rowindex);
								continue;
							}
						}
					}

					return this;
				}
			}
		}

		return null;
	};
	_pBindData._getBindInfo = function (rowindex, bindindex) {
		if (this._isDataBind()) {
			var infos = this._bindinfo;
			if (infos) {
				if (bindindex >= 0 && bindindex < infos.length) {
					var info = infos[rowindex];
					if (info) {
						if (this._binddataset) {
							if (info.colidx != -1) {
								info.values = this._fetchBindDataSet(info.colidx, rowindex);
							}
							else if (info.exprix != -1) {
								info.values = this._fetchExprDataSet(info.exprix, rowindex);
							}
						}
						if (this._binddatactx) {
							if (info.colidx != -1) {
								info.values = this._fetchBindDataCtx(info.colidx, rowindex);
							}
							else if (info.exprix != -1) {
								info.values = this._fetchExprDataCtx(info.exprix, rowindex);
							}
						}
					}

					return info;
				}
			}
		}

		return null;
	};
	_pBindData._getBindColumn = function (row, col) {
		if (this._isDataBind()) {
			if (this._binddataset) {
				return this._fetchBindDataSet(nexacro._isNumber(col) ? col : this._getBindColIndex(col), row);
			}
			if (this._binddatactx) {
				return this._fetchBindDataCtx(col, row);
			}
		}
	};
	_pBindData._fetchBindValue = function (rowindex, bindinfo) {
		if (bindinfo) {
			if (bindinfo.colidx >= 0) {
				return bindinfo.values = this._fetchBindDataSet(bindinfo.colidx, rowindex);
			}
			if (bindinfo.exprix >= 0) {
				return bindinfo.values = this._fetchExprDataSet(bindinfo.exprix, rowindex);
			}
			if (bindinfo.colidx < 0) {
				return bindinfo.values = this._fetchBindDataCtx(bindinfo, rowindex);
			}
			if (bindinfo.exprix < -1) {
				return bindinfo.values = this._fetchExprDataCtx(bindinfo, rowindex);
			}
		}

		return undefined;
	};
	_pBindData._fetchCodeBindValue = function (rowindex) {
		return this._fetchBindValue(rowindex, this._bindinfo[0]);
	};
	_pBindData._fetchLevelBindValue = function (rowindex) {
		return this._fetchBindValue(rowindex, this._bindinfo[1]);
	};
	_pBindData._fetchGroupBindValue = function (rowindex) {
		return this._fetchBindValue(rowindex, this._bindinfo[2]);
	};
	_pBindData._fetchDataBindValue = function (rowindex, bindindex) {
		return this._fetchBindValue(rowindex, this._bindinfo[bindindex && bindindex > 0 ? bindindex + 3 : 3]);
	};

	_pBindData._getCodeValue = function () {
		var bind = this._bindinfo[0];

		return bind ? bind.values : undefined;
	};
	_pBindData._getLevelValue = function () {
		var bind = this._bindinfo[1];

		return bind ? bind.values : undefined;
	};
	_pBindData._getGroupValue = function () {
		var bind = this._bindinfo[2];

		return bind ? bind.values : undefined;
	};
	_pBindData._getDataValue = function (idx) {
		idx = idx ? idx + 3 : 3;

		if (idx >= 0 && idx < this._bindinfo.length) {
			var bind = this._bindinfo[idx];

			return bind ? bind.values : null;
		}
		return null;
	};
	_pBindData._getDataValueByPropID = function (propid) {
		var idx = this._propinfo.indexOf(propid) + 3;

		return this._getDataValue(idx);
	};

	_pBindData._clear = function () {
		this._setBindType(false, false, false, false, false, false);

		this._clearCodeColumn();
		this._clearLevelColumn();
		this._clearDataColumn();
		this._clearBindInfos();
		this._clearBindDataCtx();
		this._clearBindDataSet();
	};

	delete _pBindData;
}

if (!nexacro._Formats) {
	nexacro._FormatsConst = 
		{
		FORMATMODE_UNDEFINE : -1, 
		FORMATMODE_XML : 0, 
		FORMATMODE_JSON : 1, 

		FORMATTYPE_ROWCOL : 0, 
		FORMATTYPE_POSITION : 1, 

		FORMATBIND_NONE : 0, 
		FORMATBIND_BIND : 1, 
		FORMATBIND_EXPR : 2, 

		FORMATBANDIDX_HEAD : -1, 
		FORMATBANDIDX_TAIL : -2, 
		FORMATBANDIDX_SUMM : -2, 
		FORMATBANDIDX_BODY : 0, 
		FORMATBANDIDX_DETAIL : 0, 
		FORMATBANDIDX_MARK : -3, 
		FORMATBANDIDX_TRACK : -3, 
		FORMATBANDIDX_NULL : -4, 

		FORMATBANDTYPE_DEFAULT : 0, 
		FORMATBANDTYPE_BODY : 0, 
		FORMATBANDTYPE_CONTENT : 0, 
		FORMATBANDTYPE_HEAD : 1, 
		FORMATBANDTYPE_TITLE : 1, 
		FORMATBANDTYPE_TAIL : 2, 
		FORMATBANDTYPE_SUMMRY : 2, 
		FORMATBANDTYPE_DETAIL : 3, 
		FORMATBANDTYPE_MARK : 4, 
		FORMATBANDTYPE_TRACK : 4, 
		FORMATBANDTYPE_NULL : 5, 

		FORMATBANDPOSTYPE_RELATIVE : 0, 
		FORMATBANDPOSTYPE_ABSOLUTE : 1, 
		FORMATBANDPOSTYPE_OPPOSITE : 2, 
		FORMATBANDBASETYPE_CLIENT : 0, 
		FORMATBANDBASETYPE_BODYBAND : 1, 
		FORMATBANDBASETYPE_POPUP : 2, 
		FORMATBANDREPEATTYPE_SINGLE : 0, 
		FORMATBANDREPEATTYPE_REPEAT : 1, 
		FORMATBANDFIXTYPE_FIXED : 0, 
		FORMATBANDFIXTYPE_TRACK : 1, 
		FORMATBANDFIXTYPE_SCROLL : 2, 
		FORMATBANDEDITTYPE_READONLY : 0, 
		FORMATBANDEDITTYPE_EDITABLE : 1, 
		FORMATBANDEDITTYPE_RESIZABLE : 2, 
		FORMATBANDSHOWTYPE_ALWAYS : 0, 
		FORMATBANDSHOWTYPE_SCROLLSTART : 1, 
		FORMATBANDSHOWTYPE_SCROLLING : 2, 
		FORMATBANDSHOWTYPE_SCROLLEND : 3, 

		FORMATBAND_DEFWIDTH : 82, 
		FORMATBAND_DEFHEIGHT : 26, 
		FORMATBANDCHILD_DEFWIDTH : "100%", 
		FORMATBANDCHILD_DEFHEIGHT : "100%"
	};

	nexacro._FormatItem = function () {
		this._bands = {
		};
		this._binds = [];
		this._bprop = {
		};
	};

	var _pFormatItem = nexacro._createPrototype(Object, nexacro._FormatItem);
	nexacro._FormatItem.prototype = _pFormatItem;
	_pFormatItem._type_name = "_FormatItem";



	_pFormatItem._setType = function (item, format, typename, deftypename) {
		item._typename = format ? format._findType(typename) : typename;
		item._construc = nexacro._getTypeConstructor(item._typename, deftypename);
		item._setts = {
		};
	};

	_pFormatItem._addBind = function (bandsq, baseid, targetid, targetprop, bindvalue) {
		var bindinfo = new nexacro._BindInfo();

		bindinfo.baseid = baseid;
		bindinfo.basesq = bandsq;
		bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
		bindinfo.bindid = nexacro._nvl(bindvalue, false) ? bindvalue : "";

		this._binds.push(bindinfo);
		this._bprop[targetprop] = bindinfo;
	};
	_pFormatItem._addExpr = function (bandsq, baseid, targetid, targetprop, exprvalue) {
		var exprinfo = new nexacro._BindInfo();

		exprinfo.baseid = baseid;
		exprinfo.basesq = bandsq;
		exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
		exprinfo.exprcx = nexacro._nvl(exprvalue, false) ? exprvalue : "";

		this._binds.push(exprinfo);
	};
	_pFormatItem._addSett = function (item, name, value) {
		item[name] = value;
		item._setts[name] = item._construc.prototype["set_" + name];
	};
	_pFormatItem._addAttr = function (item, attrs, bandsq, bandid, basename, bindexpr) {
		var i;
		var attr, name, text;
		var attrs_len = attrs.length;

		if (bindexpr) {
			for (i = 0; i < attrs_len; i++) {
				attr = attrs[i];
				name = attr.name;
				text = attr.value;

				if (!nexacro._isNull(text)) {
					if (nexacro._isString(text)) {
						switch (text.substr(0, 5).toLowerCase()) {
							case "bind:":
								this._addBind(bandsq, bandid, basename, name, text.substr(5));
								this._arrBind(item);
								break;
							case "expr:":
								this._addExpr(bandsq, bandid, basename, name, text.substr(5));
								this._arrExpr(item);
								break;
						}
					}

					this._addSett(item, name, text);
				}
			}
		}
		else {
			for (i = 0; i < attrs_len; i++) {
				attr = attrs[i];
				name = attr.name;

				if (!nexacro._isNull(attr.value)) {
					this._addSett(item, name, attr.value);
				}
			}
		}

		this._arrAttr(item);
		this._arrSett(item);

		return attrs.length > 0;
	};

	_pFormatItem._changeBind = function (targetprop, bindvalue, bindinfo) {
		bindinfo.bindid = bindvalue;
		this._bprop[targetprop] = bindinfo;
	};
	_pFormatItem._changeExpr = function (exprvalue, bindinfo) {
		bindinfo.exprcx = exprvalue;
	};
	_pFormatItem._changeSett = function (item, name, value) {
		item[name] = value;
	};
	_pFormatItem._changeAttr = function (item, attrs, bandsq, bandid, basename, bindexpr) {
		var i;
		var attr, name, text;
		var attrs_len = attrs.length;

		if (bindexpr) {
			for (i = 0; i < attrs_len; i++) {
				attr = attrs[i];
				name = attr.name;
				text = attr.value;

				if (!nexacro._isNull(text)) {
					if (nexacro._isString(text)) {
						var bind = this._getBind(bandsq, bandid, basename, name);

						switch (text.substr(0, 5)) {
							case "bind:":
								{

									if (!bind) {
										this._addBind(bandsq, bandid, basename, name, text.substr(5));
									}
									else {
										this._changeBind(name, text.substr(5), bind);
									}

									this._arrBind(item);
									break;
								}
							case "expr:":
								{

									if (!bind) {
										this._addExpr(bandsq, bandid, basename, name, text.substr(5));
									}
									else {
										this._changeExpr(text.substr(5), bind);
									}

									this._arrExpr(item);
									break;
								}
						}
					}

					this._changeSett(item, name, text);
				}
			}
		}
		else {
			for (i = 0; i < attrs_len; i++) {
				attr = attrs[i];
				name = attr.name;

				if (!nexacro._isNull(attr.value)) {
					this._changeSett(item, name, attr.value);
				}
			}
		}

		this._arrAttr(item);

		return attrs.length > 0;
	};

	_pFormatItem._arrBind = function (item) {
		if (item._construc.prototype._onGetBindableProperties) {
			item._valuebind = this._bprop[item._construc.prototype._onGetBindableProperties.call(item)];
		}
	};
	_pFormatItem._arrExpr = function (item) {
	};
	_pFormatItem._arrSett = function (item) {
	};
	_pFormatItem._arrAttr = function (item) {
	};

	_pFormatItem._addBand = function (bandsq, bandid, bandElem, format) {
		if (bandElem && bandElem.attributes) {
			var band = this._getBand(bandid);
			var tname = bandElem.nodeName;
			var attrs = bandElem.attributes;

			if (format) {
				this._setType(band, format, tname, "nexacro.ComplexComponent");
			}

			if (attrs) {
				this._addAttr(band, attrs, bandsq, bandid, "", format._format_bind);
			}

			this._arrBand(band, bandsq);

			return band;
		}

		return null;
	};
	_pFormatItem._addBandChild = function (bandsq, bandid, childidx, childElem, format) {
		if (childElem) {
			var i;

			var band = this._getBand(bandid);

			var attrs = childElem.attributes;
			var tname = childElem.nodeName;
			var cname = childElem.getAttribute("id");

			var bname = cname ? cname : "" + childidx;

			var item = band._items[childidx] = {
			};

			if (format) {
				this._setType(item, format, tname, "nexacro.ComplexComponent");
			}

			if (attrs) {
				this._addAttr(item, attrs, bandsq, bandid, bname, format._format_bind);
			}

			var subchilds = childElem.childNodes;
			var subchilds_len = subchilds ? subchilds.length : 0;
			if (subchilds_len) {
				item._items = [];

				for (i = 0; i < subchilds_len; i++) {
					var subchild = subchilds[i];

					this._addBandSubChild(bandsq, bandid, bname, item, i, subchild, format);
				}
			}

			this._arrBandChild(item, childidx);

			return item;
		}

		return null;
	};
	_pFormatItem._addBandSubChild = function (bandsq, bandid, baseid, item, childidx, childElem, format) {
		if (childElem) {
			var attrs = childElem.attributes;
			var tname = childElem.nodeName;
			var cname = childElem.getAttribute("id");
			var bname = baseid + "." + cname ? cname : childidx;

			var citem = item._items[childidx] = {
			};

			if (format) {
				this._setType(citem, format, tname, "nexacro.ComplexComponent");
			}

			if (attrs) {
				this._addAttr(citem, attrs, bandsq, bandid, bname, format._format_bind);
			}



			this._arrBandSubChild(citem, childidx);

			return citem;
		}
		else {
			return null;
		}
	};
	_pFormatItem._addAutoBand = function (bandsq, bandid, format) {
		if (!format) {
			return;
		}

		if (bandid == "head") {
		}
		if (bandid == "tail") {
		}
		if (bandid == "mark") {
		}
		if (bandid == "null") {
			var band = this._getBand(bandid);

			var tname = "Band";
			var conts = "nexacro.ComplexComponent";
			var attrs = [{
				"name" : "id", 
				"value" : "nullband"
			}, {
				"name" : "left", 
				"value" : "0"
			}, {
				"name" : "top", 
				"value" : "0"
			}, {
				"name" : "width", 
				"value" : "100%"
			}, {
				"name" : "height", 
				"value" : "100%"
			}, {
				"name" : "scrolltype", 
				"value" : "none"
			}, {
				"name" : "expanddirtype", 
				"value" : "none"
			}, {
				"name" : "background", 
				"value" : "transparent"
			}
			];

			this._setType(band, format, tname, conts);

			this._addAttr(band, attrs, bandsq, bandid, "", format._format_bind);
		}
	};
	_pFormatItem._addAutoBandChild = function (bandsq, bandid, childidx, format) {
		if (!format) {
			return;
		}

		if (bandid == "head") {
		}
		if (bandid == "tail") {
		}
		if (bandid == "mark") {
		}
		if (bandid == "null") {
			var band = this._getBand(bandid);

			var tname = "nexacro._IconText";
			var conts = "nexacro._IconText";
			var attrs = [{
				"name" : "id", 
				"value" : "nullctrl"
			}, {
				"name" : "cssclass", 
				"value" : bandid
			}, {
				"name" : "left", 
				"value" : "0"
			}, {
				"name" : "top", 
				"value" : "0"
			}, {
				"name" : "width", 
				"value" : "100%"
			}, {
				"name" : "height", 
				"value" : "100%"
			}, {
				"name" : "text", 
				"value" : "nodatatext"
			}, {
				"name" : "textAlign", 
				"value" : "center"
			}, {
				"name" : "background", 
				"value" : "transparent"
			}
			];

			var item = band._items[childidx] = {
			};

			this._setType(item, format, tname, conts);

			this._addAttr(item, attrs, bandsq, bandid, conts, format._format_bind);

			item._id = item.id;
		}
	};

	_pFormatItem._makeAutoHeadBand = function (makebandid, basebandid, keyinfos) {
		var headband = this._bands[makebandid];
		var bodyband = this._bands[basebandid];

		if (!headband && bodyband) {
		}
	};
	_pFormatItem._makeAutoTailBand = function (makebandid, basebandid, keyinfos) {
		var tailband = this._bands[makebandid];
		var bodyband = this._bands[basebandid];

		if (!tailband && bodyband) {
		}
	};
	_pFormatItem._makeAutoMarkBand = function (makebandid, basebandid, keyinfos, format) {
		var markband = this._bands[makebandid];
		var bodyband = this._bands[basebandid];

		if (!markband && bodyband) {
			if (this._format_type == nexacro._FormatsConst.FORMATTYPE_ROWCOL) {
			}
			else {
				if (keyinfos) {
				}
				else {
					var makeband = this._copyBand(makebandid, basebandid, format);
					var makecell = this._copyBandChild(makebandid, basebandid, 0, format);

					if (makeband) {
						if (makecell) {
							makecell._pos[2] = nexacro._FormatsConst.FORMATBANDCHILD_DEFWIDTH;
							makecell._pos[3] = nexacro._FormatsConst.FORMATBANDCHILD_DEFHEIGHT;

							this._addSett(makecell, "cssclass", makebandid);
						}
						{

							makeband._pos[2] = nexacro._FormatsConst.FORMATBAND_DEFWIDTH;
							makeband._pos[3] = nexacro._FormatsConst.FORMATBAND_DEFHEIGHT;

							this._addSett(makeband, "background", "#ffffff");
							this._addSett(makeband, "scrolltype", "none");
							this._addSett(makeband, "expandtype", "none");
						}
					}
				}
			}
		}
	};
	_pFormatItem._makeAutoNullBand = function (makebandid, keyinfos, format) {
		var nullband = this._bands[makebandid];
		if (!nullband) {
			if (this._format_type == nexacro._FormatsConst.FORMATTYPE_ROWCOL) {
			}
			else {
				if (keyinfos) {
				}
				else {
					this._addAutoBand(0, "null", format);
					this._addAutoBandChild(0, "null", 0, format);
				}
			}
		}
	};
	_pFormatItem._copyBand = function (targetbandid, sourcebandid, format) {
		var targetband = this._getBand(targetbandid, true);
		var sourceband = this._getBand(sourcebandid, false);

		if (targetband && sourceband) {
			var basename = "";
			var bandname = format._getBaseName(targetband, targetbandid);
			var attrlist = format._getAttrList(sourceband, []);

			var bandseq = format._getBandSeq(bandname);
			var bindfmt = format._format_bind;

			targetband._typename = sourceband._typename;
			targetband._construc = sourceband._construc;
			targetband._setts = {
			};

			this._addAttr(targetband, attrlist, bandseq, bandname, basename, bindfmt);
			this._addSett(targetband, "name", targetbandid);
			this._arrBand(targetband, bandseq);
		}

		return targetband;
	};
	_pFormatItem._copyBandChild = function (targetbandid, sourcechildid, sourceindex, format) {
		var makechild;

		var targetband = this._getBand(targetbandid);
		var sourcecell = this._getBandChildFromIndex(sourcechildid, sourceindex);
		if (targetband && sourcecell) {
			var basename = format._getBaseName(sourcecell, sourceindex);
			var attrlist = format._getAttrList(sourcecell, []);

			var bandseq = format._getBandSeq(targetbandid);
			var bindfmt = format._format_bind;

			makechild = targetband._items[sourceindex] = {
			};

			makechild._typename = sourcecell._typename;
			makechild._construc = sourcecell._construc;
			makechild._setts = {
			};

			this._addAttr(makechild, attrlist, bandseq, targetbandid, basename, bindfmt);
			this._arrBandChild(makechild, sourceindex);
		}

		return makechild;
	};

	_pFormatItem._getBands = function () {
		return this._bands;
	};
	_pFormatItem._getBand = function (bandid, make) {
		var _band = this._bands[bandid];

		if (!_band && make != false) {
			this._bands[bandid] = {
			};
			_band = this._bands[bandid];

			_band._items = [];
			_band._setts = {
			};

			_band._id = bandid;
		}

		return _band;
	};
	_pFormatItem._getBandChilds = function (bandid) {
		var _band = this._bands[bandid];
		if (_band) {
			return _band._items;
		}
	};

	_pFormatItem._getBandChildFromIndex = function (bandid, childidx) {
		var _band = this._bands[bandid];
		var _item = null;

		if (_band) {
			var items = _band._items;

			if (childidx >= 0 && childidx < items.length) {
				_item = items[childidx];
			}
		}

		return _item;
	};

	_pFormatItem._getBandChildFromId = function (bandid, childid) {
		var band = this._bands[bandid];
		var item = null;
		if (band) {
			var items = band._items;
			for (var i = 0; i < items.length; i++) {
				if (items[i].id == childid) {
					item = items[i];
					break;
				}
			}
		}

		return item;
	};
	_pFormatItem._getBandProperty = function (bandid, propid) {
		var _band = this._getBand(bandid);
		if (_band) {
			return _band[propid];
		}
	};
	_pFormatItem._setBandProperty = function (bandid, propid, propval, format) {
		var band = this._getBand(bandid);
		if (band) {
			var attrobj = this._makeAttr(propid, propval);
			var bandseq = format._getBandSeq(bandid);
			var bindtype = format._format_bind;

			if (band.hasOwnProperty(propid)) {
				if (band[propid] != propval) {
					return this._changeAttr(band, attrobj, bandseq, bandid, "", bindtype);
				}
			}
			else {
				return this._addAttr(band, attrobj, bandseq, bandid, "", bindtype);
			}
		}
		else {
			return false;
		}
	};
	_pFormatItem._getBandChildProperty = function (bandid, childid, propid) {
		var child = this._getBandChildFromId(bandid, childid);
		if (child) {
			return child[propid];
		}
	};
	_pFormatItem._getBandChildCount = function (bandid) {
		var childs = this._getBandChilds(bandid);
		if (childs) {
			return childs.length;
		}
		else {
			return 0;
		}
	};
	_pFormatItem._setBandChildProperty = function (bandid, childid, propid, propval, format) {
		var child = this._getBandChildFromId(bandid, childid);
		if (child) {
			var attrobj = this._makeAttr(propid, propval);
			var bandseq = format._getBandSeq(bandid);
			var basename = format._getBaseName(child, childid);
			var bindtype = format._format_bind;

			if (child.hasOwnProperty(propid)) {
				if (child[propid] != propval) {
					return this._changeAttr(child, attrobj, bandseq, bandid, basename, bindtype);
				}
			}
			else {
				return this._addAttr(child, attrobj, bandseq, bandid, basename, bindtype);
			}
		}
		return false;
	};

	_pFormatItem._makeAttr = function (propid, propval) {
		return [{
			name : propid, 
			value : propval
		}];
	};

	_pFormatItem._getBinds = function () {
		return this._binds;
	};

	_pFormatItem._getBind = function (bandsq, bandid, basename, targetprop) {
		var binds = this._getBinds();
		var bind = null;

		if (binds) {
			if (!binds.find) {
				for (var i = 0; i < binds.length; i++) {
					var _bindinfo = binds[i];
					var target = nexacro._isArray(_bindinfo.target) ? _bindinfo.target[0] : _bindinfo.target;

					if (bandid == _bindinfo.baseid && bandsq == _bindinfo.basesq && basename == target && ("set_" + targetprop) == _bindinfo.setter) {
						bind = _bindinfo;
						break;
					}
				}
			}
			else {
				bind = this._binds.find(function (bind, index, arr) {
					var target = nexacro._isArray(bind.target) ? bind.target[0] : bind.target;

					if (this[0] == bind.baseid && this[1] == bind.basesq && this[2] == target && ("set_" + this[3]) == bind.setter) {
						return bind;
					}
				}, [bandid, bandsq, basename, targetprop]);
			}
		}
		return bind;
	};
	_pFormatItem._getArrPos = function (item) {
	};

	_pFormatItem._clearBand = function () {
		this._bands = {
		};
	};
	_pFormatItem._clearBind = function () {
		var i, prop;

		var binds_len = this._binds.length;

		for (i = 0; i < binds_len; i++) {
			if (this._binds[i]) {
				delete this._binds[i];
				this._binds[i] = null;
			}
		}
		for (prop in this._bprop) {
			if (prop) {
				delete this._bprop[prop];
				this._bprop[prop] = null;
			}
		}
		this._binds = [];
		this._bprop = {
		};
	};
	_pFormatItem._clearType = function () {
	};

	_pFormatItem._clear = function () {
		this._clearBand();
		this._clearBind();
		this._clearType();
	};

	delete _pFormatItem;


	nexacro._FormatItemRowCol = function () {
		nexacro._FormatItem.call(this);

		this._col_sizes = [];
		this._col_bands = {
		};
		this._row_sizes = [];
		this._row_bands = {
		};
	};

	var _pFormatItemRowCol = nexacro._createPrototype(nexacro._FormatItem, nexacro._FormatItemRowCol);
	nexacro._FormatItemRowCol.prototype = _pFormatItemRowCol;
	_pFormatItemRowCol._type_name = "_FormatItemRowCol";


	_pFormatItemRowCol._getColSizes = function () {
		return this._cols_sizes;
	};
	_pFormatItemRowCol._getRowSizes = function () {
		return this._rows_sizes;
	};
	_pFormatItemRowCol._getColSizes = function (index, band) {
		if (index && band) {
			var _band = this._col_bands[band];
			if (_band) {
				index += _band._bound;
			}
		}

		if (index && index >= 0 && index < this._cols_sizes.length) {
			return this._col_sizes[index];
		}
	};
	_pFormatItemRowCol._getRowSizes = function (index, band) {
		if (index && band) {
			var _band = this._row_bands[band];
			if (_band) {
				index += _band._bound;
			}
		}

		if (index && index >= 0 && index < this._row_bands.length) {
			return this._row_bands[index];
		}
	};

	_pFormatItemRowCol._addColSize = function (index, band, size) {
		var _size = parseInt(size);
		var _band = this._col_bands[band];
		if (_band) {
			_band._size += _size;
			_band._bound = Math.min(_band._bound, index);
			_band._count++;
		}
		else {
			this._col_bands[band] = {
			};
			_band = this._col_bands[band];
			_band._size = _size;
			_band._bound = index;
			_band._count++;
		}

		this._col_sizes.push(_size);
	};
	_pFormatItemRowCol._addRowSize = function (index, band, size) {
		var _size = parseInt(size);
		var _band = this._row_bands[band];

		if (_band) {
			_band._size += _size;
			_band._bound = Math.min(_band._bound, index);
			_band._count++;
		}
		else {
			this._row_bands[band] = {
			};
			_band = this._row_bands[band];
			_band._size = _size;
			_band._bound = index;
			_band._count++;
		}

		this._row_sizes.push(_size);
	};

	_pFormatItemRowCol._arrAttr = function (item) {
		if (item) {
			var _col = parseInt(item["col"]);
			var _row = parseInt(item["row"]);
			var _colspan = parseInt(item["colspan"]);
			var _rowspan = parseInt(item["rowspan"]);

			item._col = isNaN(_col) ? 0 : _col;
			item._row = isNaN(_row) ? 0 : _row;
			item._colspan = isNaN(_colspan) ? 0 : _colspan;
			item._rowspan = isNaN(_rowspan) ? 0 : _rowspan;

			item.__ap = [item._row, item._col, item._rowspan, item._colspan];
		}
	};
	_pFormatItemRowCol._arrSett = function (item) {
		delete item._setts["col"];
		delete item._setts["row"];
		delete item._setts["colspan"];
		delete item._setts["rowspan"];

		item._setts["__ap"] = null;
	};
	_pFormatItemRowCol._arrBandChild = function (item, childIdx) {
		if (item) {
			item._id = item.id ? item.id : "" + childIdx;
			item._index = childIdx;
		}
	};
	_pFormatItemRowCol._arrBandSubChild = function (item, childidx) {
		if (item) {
			item._id = item.id ? item.id : "" + childidx;
			item._index = childidx;
		}
	};

	_pFormatItemRowCol._getArrPos = function (item) {
		return item ? item.__ap : null;
	};

	_pFormatItemRowCol._clear = function () {
		nexacro._FormatItem.prototype._clear.call(this);

		this._col_sizes = [];
		this._col_bands = {
		};
		this._row_sizes = [];
		this._row_bands = {
		};
	};

	delete _pFormatItemRowCol;


	nexacro._FormatItemPos = function () {
		nexacro._FormatItem.call(this);
	};

	var _pFormatItemPos = nexacro._createPrototype(nexacro._FormatItem, nexacro._FormatItemPos);
	nexacro._FormatItemPos.prototype = _pFormatItemPos;
	_pFormatItemPos._type_name = "_FormatItemPos";



	_pFormatItemPos._addSett = function (item, name, value) {
		item[name] = value;
		item._setts[name] = item._construc.prototype["set_" + name];
	};

	_pFormatItemPos._arrAttr = function (item) {
		if (item) {
			var _left = item["left"];
			var _top = item["top"];
			var _right = item["right"];
			var _bottom = item["bottom"];
			var _width = item["width"];
			var _height = item["height"];

			if (_left === "" && (_right !== "" && _width !== "")) {
				_left = item["left"] = undefined;
			}
			if (_right === "" && (_left !== "" && _width !== "")) {
				_right = item["right"] = undefined;
			}
			if (_width === "" && (_left !== "" && _right !== "")) {
				_width = item["width"] = undefined;
			}
			if (_top === "" && (_bottom !== "" && _height !== "")) {
				_top = item["top"] = undefined;
			}
			if (_bottom === "" && (_top !== "" && _height !== "")) {
				_bottom = item["bottom"] == undefined;
			}
			if (_height === "" && (_top !== "" && _bottom !== "")) {
				_height = item["height"] = undefined;
			}

			if (_left === undefined && !(_right !== undefined && _width !== undefined)) {
				_left = item["left"] = 0;
			}
			if (_top === undefined && !(_bottom !== undefined && _height !== undefined)) {
				_top = item["top"] = 0;
			}

			if (_left !== undefined && (_right !== undefined && _width !== undefined)) {
				_right = item["right"] = undefined;
			}
			if (_top !== undefined && (_bottom !== undefined && _height !== undefined)) {
				_bottom = item["bottom"] = undefined;
			}

			item._pos = [_left, _top, _width, _height, _right, _bottom];
			item.__ap = [_left, _top, _width, _height, _right, _bottom, false];

			var i;

			var pos_len = item.__ap.length;

			for (i = 0; i < pos_len; i++) {
				var pos_item = item.__ap[i];
				if (pos_item && (typeof pos_item === "string")) {
					if (pos_item.indexOf("%") >= 0) {
						item.__ap[i] = parseFloat(pos_item) / 10000;
						item.__ap[6] = true;
					}
					else {
						item.__ap[i] = parseInt(pos_item);
					}
				}
			}
		}
	};
	_pFormatItemPos._arrSett = function (item) {
		delete item._setts["left"];
		delete item._setts["top"];
		delete item._setts["right"];
		delete item._setts["bottom"];
		delete item._setts["width"];
		delete item._setts["height"];

		item._setts["_pos"] = item._construc.prototype["move"];
	};
	_pFormatItemPos._arrBand = function (item, index) {
		if (item) {
			item._bound = index;
		}
	};
	_pFormatItemPos._arrBandChild = function (item, childidx) {
		if (item) {
			item._id = item.id ? item.id : "" + childidx;
		}
	};
	_pFormatItemPos._addBandSubChild = function (item, childidx) {
		if (item) {
			item._id = item.id ? item.id : "" + childidx;
		}
	};

	_pFormatItemPos._getArrPos = function (item) {
		return item ? item.__ap : null;
	};

	_pFormatItemPos._clear = function () {
		nexacro._FormatItem.prototype._clear.call(this);
	};

	delete _pFormatItemPos;


	nexacro._Formats = function () {
		this._format_parsed = false;
		this._format_mode = 0;
		this._format_type = 0;
		this._format_bind = 0;
		this._format_items = [];
		this._current_id = "";
		this._default_id = "default";
		this._default_size = "0";
		this._default_band = "body";
		this._head_bands = ["head"];
		this._body_bands = ["body"];
		this._tail_bands = ["tail"];
		this._mark_bands = ["mark"];
		this._null_bands = ["null"];
		this._auto_bands = ["mark", "null"];
		this._type_names = {
		};
	};

	var _pFormats = nexacro._createPrototype(Object, nexacro._Formats);
	nexacro._Formats.prototype = _pFormats;
	_pFormats._type_name = "_Formats";



	_pFormats._initFormats = function (mode, type, bind, heads, bodys, tails, marks, nulls, autos, types) {
		this._format_mode = mode;
		this._format_type = type;
		this._format_bind = bind;

		if (heads) {
			this._head_bands = heads;
		}
		if (bodys) {
			this._body_bands = bodys;
		}
		if (tails) {
			this._tail_bands = tails;
		}
		if (marks) {
			this._mark_bands = marks;
		}
		if (nulls) {
			this._null_bands = nulls;
		}
		if (autos) {
			this._auto_bands = autos;
		}
		if (types) {
			this._type_names = types;
		}
	};

	_pFormats._parseFormats = function (formats, databind) {
		if (this._format_mode == nexacro._FormatsConst.FORMATMODE_UNDEFINE) {
			var c = formats.charAt(0);

			if (c == '<') {
				this._format_mode = nexacro._FormatsConst.FORMATMODE_XML;
			}
			else if (c == '{' || c == '[') {
				this._format_mode = nexacro._FormatsConst.FORMATMODE_JSON;
			}
		}

		if (this._format_mode == nexacro._FormatsConst.FORMATMODE_XML) {
			this._parseFormatsFromXml(formats, databind);
		}
		else {
			this._parseFormatsFromJson(formats, databind);
		}
	};

	_pFormats._parseFormatsFromJson = function (formats, databind) {
		var items = nexacro._executeEvalStr('(' + formats + ')');
		if (items) {
			if (nexacro._isArray(items)) {
				this._format_items = items;
			}
			else if (items.id) {
				this._format_items[items.id] = items;
			}
			else {
				this._format_items[this._default_id] = items;
			}

			this._makeAutoBands(databind);
			this._format_parsed = true;
		}
		else {
			this._format_parsed = false;
		}
	};

	_pFormats._parseFormatsFromXml = function (formats, databind) {
		var contentsElem = nexacro._parseXMLDocument(formats);
		if (!contentsElem) {
			return;
		}

		var formatElems = contentsElem.getElementsByTagName("Format");
		if (formatElems) {
			var i;

			var formatElems_len = formatElems.length;

			if (formatElems_len) {
				for (i = 0; i < formatElems_len; i++) {
					var formatElem = formatElems[i];

					var formatID = formatElem.getAttribute("id");
					if (formatID == null || formatID == "") {
						formatID = this._default_id;
					}

					this._loadFormatFromDOM(formatID, formatElem);
				}
			}
			else {
				this._loadFormatFromDOM(this._default_id, "");
			}

			this._makeAutoBands(databind);
			this._format_parsed = true;
		}
		else {
			this._format_parsed = false;
		}
	};

	_pFormats._getFormatsStringFromXml = function (formatString, formatID) {
		if (!formatString) {
			return;
		}

		var contentsElem = nexacro._parseXMLDocument(formatString);
		if (!contentsElem) {
			return;
		}

		if (!formatID) {
			formatID = this._getCurrentID();
		}

		var formatElems = contentsElem.getElementsByTagName("Format");
		if (formatElems) {
			var i;

			var formatElems_len = formatElems.length;

			for (i = 0; i < formatElems_len; i++) {
				var formatElem = formatElems[i];

				if (formatID == formatElem.getAttribute("id")) {
					formatString = nexacro._documentToXml(formatElem);
					break;
				}
			}
		}

		return formatString;
	};

	_pFormats._getFormatsStringFromContext = function (formatID) {
		if (!formatID) {
			formatID = this._getCurrentID();
		}

		var formatString = "<Format id=\"" + formatID + "\">";

		var item = this._getItem(formatID);
		if (item) {
			var bands = item._getBands();
			if (bands) {
				var i, j, prop;

				if (this._body_bands.length) {
					for (i in this._body_bands) {
						var band = bands[this._body_bands[i]];
						if (band) {
							if (band._items && band._items.length) {
								formatString += "<Band";

								for (prop in band) {
									if (band.hasOwnProperty(prop)) {
										if (prop.charAt(0) != "_") {
											formatString += " " + prop + "=\"" + band[prop] + "\"";
										}
									}
								}

								formatString += ">";

								for (j in band._items) {
									formatString += "<Cell";

									for (prop in band._items[j]) {
										if (band._items[j].hasOwnProperty(prop)) {
											if (prop.charAt(0) != "_") {
												formatString += " " + prop + "=\"" + band._items[j][prop] + "\"";
											}
										}
									}


									formatString += "/>";
								}

								formatString += "</Band>";
							}
							else {
								formatString += "<Band";

								for (prop in band) {
									if (band.hasOwnProperty(prop)) {
										if (prop.charAt(0) != "_") {
											formatString += " " + prop + "=\"" + band[prop] + "\"";
										}
									}
								}


								formatString += "/>";
							}
						}
					}
				}
			}
		}

		formatString += "</Format>";

		return formatString;
	};

	_pFormats._loadFormatFromDOM = function (formatID, formatElem) {
		if (formatID) {
			var i, j;

			var n, m;

			var item;

			if (formatElem) {
				var bands, childs;
				var bandid, bandsq;
				var colElem, rowElem, bandElem, childElem;

				if (this._format_type == nexacro._FormatsConst.FORMATTYPE_ROWCOL) {
					var bandstr, sizestr;

					item = new nexacro._FormatItemRowCol();

					var cols = formatElem.getElementsByTagName("Column");
					if (!cols || !cols.length) {
						cols = formatElem.getElementsByTagName("Col");
					}

					if (cols) {
						for (i = 0, n = cols.length; i < n; i++) {
							colElem = cols[i];

							bandstr = nexacro._nvl(colElem.getAttribute("band"), this._default_band);
							sizestr = nexacro._nvl(colElem.getAttribute("size"), this._default_size);

							item._addColSize(i, bandstr, sizestr);
						}
					}

					var rows = formatElem.getElementsByTagName("Row");

					for (i = 0, n = rows.length; i < n; i++) {
						rowElem = rows[i];

						bandstr = nexacro._nvl(rowElem.getAttribute("band"), this._default_band);
						sizestr = nexacro._nvl(rowElem.getAttribute("size"), this._default_size);

						item._addRowSize(i, bandstr, sizestr);
					}



					this._format_items[formatID] = item;

					bands = formatElem.getElementsByTagName("Band");
					if (bands) {
						for (i = 0, n = bands.length; i < n; i++) {
							bandElem = bands[i];

							bandid = nexacro._nvl(bandElem.getAttribute("id"), this._default_band);
							bandsq = this._getBandSeq(bandid);

							item._addBand(bandsq, bandid, bandElem, this);

							childs = bandElem.getElementsByTagName("Cell");
							if (childs) {
								for (j = 0, m = childs.length; j < m; j++) {
									childElem = childs[j];

									item._addBandChild(bandsq, bandid, j, childElem, this);
								}
							}
						}
					}
				}
				else {
					item = new nexacro._FormatItemPos();

					this._format_items[formatID] = item;

					bands = formatElem.getElementsByTagName("Band");
					if (bands) {
						for (i = 0, n = bands.length; i < n; i++) {
							bandElem = bands[i];

							bandid = nexacro._nvl(bandElem.getAttribute("id"), this._default_band);
							bandsq = this._getBandSeq(bandid);

							item._addBand(bandsq, bandid, bandElem, this);

							childs = bandElem.getElementsByTagName("Cell");
							if (childs) {
								for (j = 0, m = childs.length; j < m; j++) {
									childElem = childs[j];

									item._addBandChild(bandsq, bandid, j, childElem, this);
								}
							}
						}
					}
				}
			}
			else {
				item = new nexacro._FormatItemPos();

				this._format_items[formatID] = item;
			}
		}
	};

	_pFormats._makeFormatsString = function (databind, levelbind) {
		var fmts = "<Formats>";
		fmts += this._makeFormatString(databind, levelbind);
		fmts += "</Formats>";

		return fmts;
	};

	_pFormats._makeFormatString = function (databind, levelbind) {
		if (databind) {
			if (databind._isDataBind()) {
				return this._makeFormatStringByColInfos(databind._getBindDataSetColInfos(), databind._getBindDataCtxKeyInfos(), levelbind);
			}
			if (databind._isXmlBind()) {
				return this._makeFormatStringByKeyInfos(databind._getBindDataCtxKeyInfos(), levelbind);
			}
			if (databind._isJsonBind()) {
				return this._makeFormatStringByKeyInfos(databind._getBindDataCtxKeyInfos(), levelbind);
			}
		}
	};

	_pFormats._makeFormatStringByColInfos = function (colinfos, keyinfos, levelbind) {
		var _makeFormatStringByCol = function (colinfo, type, name, l, r, t, b, w, h) {
			var fmt = "<" + type + " id=\"" + name + "\"";

			if (l != null) {
				fmt += " left=\"" + l + "\"";
			}
			if (r != null) {
				fmt += " right=\"" + r + "\"";
			}
			if (t != null) {
				fmt += " top=\"" + t + "\"";
			}
			if (b != null) {
				fmt += " bottom=\"" + b + "\"";
			}
			if (w != null) {
				fmt += " width=\"" + w + "\"";
			}
			if (h != null) {
				fmt += " height=\"" + h + "\"";
			}

			fmt += " text=\"bind:" + colinfo.id + "\"";
			fmt += "/>";

			return fmt;
		};

		var fmt = "<Format id=\"" + this._default_id + "\">";

		if (colinfos && colinfos.length) {
			var colinfo;
			var bandtype = this._type_names.length > 0 ? this._type_names[0] : "Band";
			var celltype = this._type_names.length > 1 ? this._type_names[1] : "Cell";
			var cellname = celltype;
			var nameidx;
			var defhsize = "24px";
			var i, n, c, l, w;

			if (levelbind && this._body_bands.length >= 2) {
				fmt += "<" + bandtype + " id=\"" + this._body_bands[0] + "\" width=\"100%\" height=\"" + defhsize + "\">";

				l = 0;
				n = Math.min(colinfos.length / 2, 5);
				c = Math.min(colinfos.length / 2, 5);
				w = Math.round(100 / c);

				for (i = 0; i < n; i++, l += w) {
					colinfo = colinfos[i];
					nameidx = cellname + (i < 10 ? "0" + i : i);

					if (i == 0) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
					}
					else if (i + 1 < n) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
					}
					else {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
					}
				}

				fmt += "</" + bandtype + ">";
				fmt += "<" + bandtype + " id=\"" + this._body_bands[1] + "\" width=\"100%\" height=\"" + defhsize + "\">";

				l = 0;
				n = Math.min(colinfos.length, 10);
				c = n - c;
				w = Math.round(100 / c);

				for (i = 0; i < c; i++, l += w) {
					colinfo = colinfos[i];
					nameidx = cellname + (i < 10 ? "0" + i : i);

					if (i == 0) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
					}
					else if (i + 1 < n) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
					}
					else {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
					}
				}

				fmt += "</" + bandtype + ">";
			}
			else {
				fmt += "<" + bandtype + " id=\"" + this._body_bands[0] + "\" width=\"100%\" height=\"" + defhsize + "\">";

				l = 0;
				n = Math.min(colinfos.length, 10);
				c = Math.min(colinfos.length, 10);
				w = Math.round(100 / c);

				for (i = 0; i < n; i++, l += w) {
					colinfo = colinfos[i];
					nameidx = cellname + (i < 10 ? "0" + i : i);

					if (i == 0) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
					}
					else if (i + 1 < n) {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
					}
					else {
						fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
					}
				}

				fmt += "</" + bandtype + ">";
			}
		}

		fmt += "</Format>";

		return fmt;
	};

	_pFormats._makeFormatStringByKeyInfos = function (keyinfos) {
	};

	_pFormats._makeAutoBands = function (databind) {
		if (this._auto_bands) {
			var keyinfos = databind ? databind._getBindDataCtxKeyInfos() : null;

			for (var i = 0, l = this._auto_bands.length; i < l; i++) {
				var autobandid = this._auto_bands[i];

				var isautohead = this._head_bands.indexOf(autobandid) >= 0;
				var isautotail = this._tail_bands.indexOf(autobandid) >= 0;
				var isautomark = this._mark_bands.indexOf(autobandid) >= 0;
				var isautonull = this._null_bands.indexOf(autobandid) >= 0;
				var bodybandid = this._body_bands[0];

				for (var formatid in this._format_items) {
					if (this._format_items.hasOwnProperty(formatid)) {
						var formatit = this._format_items[formatid];

						if (isautohead) {
							formatit._makeAutoHeadBand(autobandid, bodybandid, keyinfos, this);
						}
						if (isautotail) {
							formatit._makeAutoTailBand(autobandid, bodybandid, keyinfos, this);
						}
						if (isautomark) {
							formatit._makeAutoMarkBand(autobandid, bodybandid, keyinfos, this);
						}
						if (isautonull) {
							formatit._makeAutoNullBand(autobandid, keyinfos, this);
						}
					}
				}
			}
		}
	};

	_pFormats._setCurrentID = function (id) {
		this._current_id = nexacro._nvl(id, this._default_id);
	};
	_pFormats._getCurrentID = function () {
		return this._current_id;
	};

	_pFormats._getItem = function (id) {
		if (nexacro._isNull(id) || id == "") {
			return this._format_items[this._getCurrentID()];
		}
		else {
			return this._format_items[id];
		}
	};
	_pFormats._getCurrentItem = function () {
		return this._getItem();
	};
	_pFormats._isInvalid = function () {
		var item = this._getCurrentItem();

		return item === undefined || item == null;
	};
	_pFormats._getBindInfos = function (id) {
		var item = this._getItem(id);
		if (item) {
			return item._getBinds();
		}
	};
	_pFormats._findType = function (type) {
		return nexacro._nvl(this._type_names[type], type);
	};

	_pFormats._getBandSeq = function (bandid) {
		var body = this._body_bands;
		if (body) {
			for (var i = 0, n = body.length; i < n; i++) {
				if (body[i] == bandid) {
					return i;
				}
			}
		}
		return -1;
	};
	_pFormats._getBaseName = function (item, defname) {
		return item && item["id"] ? item["id"] : "" + defname;
	};
	_pFormats._getAttrList = function (item, defret) {
		var ret = [];

		if (item && item._setts) {
			for (var propid in item._setts) {
				ret.push({
					name : propid, 
					value : item[propid]
				});
			}

			return ret;
		}

		return defret;
	};

	_pFormats._getBandProperty = function (bandid, propid) {
		var formatitem = this._getCurrentItem();
		if (formatitem) {
			return formatitem._getBandProperty(bandid, propid);
		}
	};
	_pFormats._setBandProperty = function (bandid, propid, propval) {
		var formatitem = this._getCurrentItem();
		if (formatitem) {
			return formatitem._setBandProperty(bandid, propid, propval, this);
		}
		else {
			return false;
		}
	};
	_pFormats._getBandChildProperty = function (bandid, childid, propid) {
		var formatitem = this._getCurrentItem();
		if (formatitem) {
			return formatitem._getBandChildProperty(bandid, childid, propid);
		}
	};
	_pFormats._setBandChildProperty = function (bandid, childid, propid, propval) {
		var formatitem = this._getCurrentItem();
		if (formatitem) {
			return formatitem._setBandChildProperty(bandid, childid, propid, propval, this);
		}
		else {
			return false;
		}
	};
	_pFormats._getBandChildCount = function (bandid) {
		var formatitem = this._getCurrentItem();
		if (formatitem) {
			return formatitem._getBandChildCount(bandid);
		}
	};

	_pFormats._clear = function () {
		for (var i = this._format_items.length - 1; i >= 0; i--) {
			if (this._format_items[i]) {
				this._format_items[i]._clear();
				delete this._format_items[i];
			}
		}

		this._format_items = [];
		this._format_parsed = false;
		this._current_id = "";
	};

	delete _pFormats;
}

if (!nexacro._PanelPopupControl) {
	nexacro._PanelPopupConst = 
		{
	};

	nexacro._PanelPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._popup_origin = null;
		this._popup_owner = null;
		this._popup_root = null;
		this._popup_index = -1;
		this._start_index = 0;
		this._start_level = 0;
	};

	var _pPanelPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._PanelPopupControl);
	nexacro._PanelPopupControl.prototype = _pPanelPopupControl;
	_pPanelPopupControl._type_name = "_PanelPopupControl";


	_pPanelPopupControl._is_subcontrol = true;



	_pPanelPopupControl._attach = function (comp) {
		return nexacro.PopupControl.prototype._attach.call(this, comp);
	};
	_pPanelPopupControl._detach = function (comp) {
		return nexacro.PopupControl.prototype._detach.call(this, comp);
	};
	_pPanelPopupControl._getAttachedComponent = function () {
		return this._attached_comp;
	};
	_pPanelPopupControl._getRootComponent = function (popup) {
		return popup._popup_root ? popup._popup_root : nexacro.PopupControl.prototype._getRootComponent.call(this, popup);
	};
	_pPanelPopupControl._getMainFrame = function () {
		var pThis = this;
		while (pThis && !pThis._is_main) {
			pThis = pThis.parent;
		}
		return pThis;
	};
	_pPanelPopupControl._getOrigin = function (ismain) {
		var origin = this._popup_origin;
		if (origin) {
			if (nexacro._isArray(origin)) {
				if (origin.length > 1) {
					if (ismain) {
						return origin[0];
					}
					else {
						return origin[1];
					}
				}
				else {
					return origin[0];
				}
			}
			else {
				return origin;
			}
		}

		return;
	};
	_pPanelPopupControl._isPopup = function () {
		return this._is_popup();
	};
	_pPanelPopupControl._showPopup = function (place, band) {
		var comp = this._getAttachedComponent();
		var origin = this._getOrigin(true);
		var owner = this._popup_owner;

		if (!comp || !origin || !owner) {
			return;
		}

		var size = owner._getPopupChildSize ? owner._getPopupChildSize(this) : [0, 0];
		var pos = owner._getPopupChildPosition ? owner._getPopupChildPosition(this) : [0, 0];

		var left = pos[0];
		var top = pos[1];
		var width = size[0];
		var height = size[1];

		comp.move(0, 0, width, height);
		comp.set_visible(true);

		owner.on_notify_popup_onpopup(this._popup_index, this._start_index, this._start_level);

		this._popupBy(origin, left, top, width, height);

		var _window = owner._getWindow();
		if (_window && owner._track_capture) {
			_window._setCaptureLock(owner, true, false);
		}
	};
	_pPanelPopupControl._closePopup = function () {
		var comp = this._getAttachedComponent();
		if (comp) {
			comp.set_visible(false);
		}

		var owner = this._popup_owner;
		if (owner) {
			owner.on_notify_popup_onclose(this._popup_index, this._start_index, this._start_level);

			nexacro.PopupControl.prototype._closePopup.call(this);

			var _window = owner._getWindow();
			if (_window && owner._track_capture) {
				_window._releaseCaptureLock(owner);
			}
		}
	};

	_pPanelPopupControl._initInfo = function (owner, origin, rootcomp, popupindex, startindex, startlevel) {
		this._popup_origin = origin;
		this._popup_owner = owner;
		this._popup_root = rootcomp;
		this._popup_index = popupindex;
		this._start_index = startindex;
		this._start_level = startlevel;
	};
	_pPanelPopupControl._clear = function () {
		this._popup_origin = null;
		this._popup_owner = null;
		this._popup_root = null;
		this._popup_index = -1;
		this._start_index = 0;
		this._start_level = 0;
	};

	delete _pPanelPopupControl;
}


if (!nexacro._PanelSelectControl) {
	nexacro._PanelSelectConst = 
		{
		TYPE_NONE : 0x0000, 
		TYPE_LINE : 0x0001, 
		TYPE_AREA : 0x0002, 
		TYPE_MASK : 0x000F, 

		DIR_HORZ : 0x0000, 
		DIR_VERT : 0x0010, 
		DIR_LEAD : 0x0000, 
		DIR_TAIL : 0x0020, 
		DIR_MASK : 0x0030, 
		DIR_MASK_HV : 0x0010, 
		DIR_MASK_LT : 0x0020, 

		ALIGN_OUTER : 0x0000, 
		ALIGN_INNER : 0x0040, 
		ALIGN_MIDDL : 0x0080, 
		ALIGN_MASK : 0x00C0, 

		POINT_8P : 0xFF00, 
		POINT_4P : 0x3300, 
		POINT_LT : 0x0100, 
		POINT_RT : 0x0200, 
		POINT_CT : 0x0400, 
		POINT_CL : 0x0800, 
		POINT_LB : 0x1000, 
		POINT_RB : 0x2000, 
		POINT_CB : 0x4000, 
		POINT_CR : 0x8000, 
		POINT_NO : 0x0000, 
		POINT_MASK : 0xFF00, 

		ACT_DISPLAY : 0x00000, 
		ACT_RESIZER : 0x10000, 
		ACT_POINTER : 0x20000, 
		ACT_CARRIER : 0x40000, 
		ACT_MASK : 0xF0000
	};

	nexacro._PanelSelectControl = function (id, type, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this._select_name = id;
		this._select_type = type;
		this._select_show = false;
		this._assist_show = false;
		this._select_ctrls = null;
		this._assist_ctrls = null;
		this._select_owner = parent;
		this._select_begin = null;
		this._select_final = null;
		this._source_index = -1;
		this._target_index = -1;
		this._source_level = -1;
		this._target_level = -1;
		this._border_width = 10;
		this._pointer_size = 10;

		this._initSelector();
		this._initEvents();
	};

	var _pPanelSelectControl = nexacro._createPrototype(nexacro._EventSinkObject, nexacro._PanelSelectControl);
	nexacro._PanelSelectControl.prototype = _pPanelSelectControl;
	_pPanelSelectControl._type_name = "_PanelSelectControl";



	_pPanelSelectControl._initSelector = function () {
		switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK) {
			case nexacro._PanelSelectConst.TYPE_LINE:
				this._initSelectorLine();
				break;
			case nexacro._PanelSelectConst.TYPE_AREA:
				this._initSelectorArea();
				break;
		}
	};
	_pPanelSelectControl._initSelectorLine = function () {
		this._createSelector(1);
	};
	_pPanelSelectControl._initSelectorArea = function () {
		this._createSelector(8);
	};

	_pPanelSelectControl._initEvents = function () {
		if (!this._event_list) {
			this._event_list = {
			};
		}

		this._event_list["onresize"] = 1;
	};

	_pPanelSelectControl._createSelector = function (count) {
		this._clearAssistor();
		this._clearSelector();

		this._select_ctrls = new Array(count);

		var owner = this._select_owner;
		var ctrls = this._select_ctrls;
		var ctrl;

		if (ctrls && count) {
			for (var i = 0, l = count; i < l; i++) {
				if (ctrl = new nexacro.Button(this._select_name + i, 0, 0, 0, 0, null, null, null, null, null, null, owner)) {
					if (count == 1) {
						switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV) {
							case nexacro._PanelSelectConst.DIR_HORZ:
								ctrl.set_cursor("row-resize");
								break;
							case nexacro._PanelSelectConst.DIR_VERT:
								ctrl.set_cursor("col-resize");
								break;
						}
						ctrl.set_opacity("0");
					}
					else {
						ctrl.set_cursor("resize");
					}


					ctrl._setEventHandler("onclick", this.on_notify_select_onclick, this);

					ctrl._setEventHandler("onlbuttondown", this.on_notify_select_ondrag, this);
					ctrl._setEventHandler("onmousemove", this.on_notify_select_ondragmove, this);
					ctrl._setEventHandler("onlbuttonup", this.on_notify_select_ondrop, this);


					ctrl._index = i;

					ctrls[i] = ctrl;
				}
			}
		}
	};
	_pPanelSelectControl._recreateSelector = function () {
		this._initSelector();
		this._recalcSelector();
	};

	_pPanelSelectControl._setControl = function (typename) {
		var ctrls = this._select_ctrls;

		if (ctrls) {
			if (ctrls.length) {
				for (var i = 0, l = ctrls.length; i < l; i++) {
					var ctrl = ctrls[i];
					if (ctrl) {
						ctrl._setControl(ctrl.typename);
					}
				}
			}
			else {
				ctrls._setControl(ctrls.typename);
			}
		}
	};
	_pPanelSelectControl.createComponent = function (bCreateOnly) {
		var ctrls = this._select_ctrls;

		if (ctrls) {
			if (ctrls.length) {
				for (var i = 0, l = ctrls.length; i < l; i++) {
					var ctrl = ctrls[i];
					if (ctrl) {
						ctrl.createComponent(bCreateOnly);
					}
				}
			}
			else {
				ctrls.createComponent(bCreateOnly);
			}

			return true;
		}

		return false;
	};
	_pPanelSelectControl.destroy = function () {
		this._clearSelector();
		this._clearAssistor();
	};

	_pPanelSelectControl._createdSelector = function () {
		return this._createdControls(this._select_ctrls);
	};
	_pPanelSelectControl._createdAssistor = function () {
		return this._createdControls(this._assist_ctrls);
	};
	_pPanelSelectControl._createdControls = function (controls) {
		if (controls) {
			if (controls.length) {
				for (var i = 0, l = controls.length; i < l; i++) {
					var ctrl = controls[i];
					if (ctrl) {
						ctrl.on_created();
					}
				}
			}
			else {
				controls.on_created();
			}
		}
	};

	_pPanelSelectControl._clearSelector = function () {
		return this._clearControls(this._select_ctrls);
	};
	_pPanelSelectControl._clearAssistor = function () {
		return this._clearControls(this._assist_ctrls);
	};
	_pPanelSelectControl._clearControls = function (controls) {
		if (controls) {
			if (controls.length) {
				for (var i = controls.length - 1; i >= 0; i--) {
					if (controls[i]) {
						controls[i].destroy();
						delete controls[i];
						controls[i] = null;
					}
				}
				controls.length = 0;
			}
			else {
				delete controls;
				controls = null;
			}
		}
	};

	_pPanelSelectControl._attachSelect = function (begin, final) {
		if (this._select_begin != begin || this._select_final != final) {
			this._select_begin = begin;
			this._select_final = final;

			this._recalcSelector();
		}
	};
	_pPanelSelectControl._detachSelect = function () {
		if (this._select_begin || this._select_final) {
			this._select_begin = null;
			this._select_final = null;

			this._recalcSelector();
		}
	};
	_pPanelSelectControl._getAttachedSelect = function () {
		return [this._select_begin, this._select_final];
	};
	_pPanelSelectControl._isAttachSelect = function () {
		return this._select_begin != null && this._select_final != null;
	};

	_pPanelSelectControl._attachAssist = function (assist) {
		if (this._assist_ctrls != assist) {
			this._assist_ctrls = assist;

			this._recalcSelector();
		}
	};
	_pPanelSelectControl._detachSelect = function () {
		if (this._assist_ctrls) {
			this._assist_ctrls = null;

			this._recalcSelector();
		}
	};
	_pPanelSelectControl._getAttachedAssist = function () {
		return this._assist_ctrls;
	};
	_pPanelSelectControl._isAttachAssist = function () {
		return this._assist_ctrls != null;
	};

	_pPanelSelectControl._isShowSelect = function () {
		return this._select_show == true;
	};
	_pPanelSelectControl._isShowAssist = function () {
		return this._assist_show == true;
	};

	_pPanelSelectControl._recalcSelector = function () {
		var bound = this._getBoundArea();

		switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK) {
			case nexacro._PanelSelectConst.TYPE_LINE:
				this._recalcSelectorLine(bound);
				break;
			case nexacro._PanelSelectConst.TYPE_AREA:
				this._recalcSelectorArea(bound);
				break;
		}
	};
	_pPanelSelectControl._recalcSelectorLine = function (bound) {
		var ctrls = this._select_ctrls;

		if (!bound || !bound.length == 6) {
			return;
		}
		if (!ctrls || !ctrls.length == 1) {
			return;
		}

		var bs = this._border_width, bh = this._border_width / 2;

		switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_LT) {
			case nexacro._PanelSelectConst.DIR_LEAD:
				break;
			case nexacro._PanelSelectConst.DIR_TAIL:
				break;
		}

		var il = bound[0];
		var it = bound[1];
		var ir = bound[4];
		var ib = bound[5];
		var iw = bound[2];
		var ih = bound[3];

		var bl = il;
		var bt = it;
		var br = ir - bs;
		var bb = ib - bs;

		switch (this._select_type & nexacro._PanelSelectConst.ALIGN_MASK) {
			case nexacro._PanelSelectConst.ALIGN_INNER:
				break;
			case nexacro._PanelSelectConst.ALIGN_OUTER:
				br = ir;
				bb = ib;
				break;
			case nexacro._PanelSelectConst.ALIGN_MIDDL:
				br += bh;
				bb += bh;
				break;
		}

		switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV) {
			case nexacro._PanelSelectConst.DIR_HORZ:
				ctrls[0].move(bl, bb, iw, bs);
				break;
			case nexacro._PanelSelectConst.DIR_VERT:
				ctrls[0].move(br, bt, bs, ih);
				break;
		}

		if (this._assist_ctrls) {
			this._recalcAssist();
		}
	};
	_pPanelSelectControl._recalcSelectorArea = function (bound) {
		var ctrls = this._select_ctrls;

		if (!bound || !bound.length == 6) {
			return;
		}
		if (!ctrls || !ctrls.length == 8) {
			return;
		}

		var bs = this._border_width, bh = this._border_width / 2;
		var ps = this._pointer_size, ph = this._pointer_size / 2;
		var pd = ps - bs;

		switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_LT) {
			case nexacro._PanelSelectConst.DIR_LEAD:
				break;
			case nexacro._PanelSelectConst.DIR_TAIL:
				break;
		}
		switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV) {
			case nexacro._PanelSelectConst.DIR_HORZ:
				break;
			case nexacro._PanelSelectConst.DIR_VERT:
				break;
		}

		var il = bound[0];
		var it = bound[1];
		var ir = bound[4];
		var ib = bound[5];
		var iw = bound[2];
		var ih = bound[3];

		var bl = il - bs;
		var bt = it - bs;
		var br = ir - bs;
		var bb = ib - bs;

		switch (this._select_type & nexacro._PanelSelectConst.ALIGN_MASK) {
			case nexacro._PanelSelectConst.ALIGN_INNER:
				bl = il;
				bt = it;
				break;
			case nexacro._PanelSelectConst.ALIGN_OUTER:
				br = ir;
				bb = ib;
				break;
			case nexacro._PanelSelectConst.ALIGN_MIDDL:
				bl += bh;
				bt += bh;
				br += bh;
				bb += bh;
				break;
		}

		var pl = bl - pd;
		var pt = bt - pd;
		var pr = br - pd;
		var pb = bb - pd;
		var ch = il + iw / 2 - ph;
		var cv = it + ih / 2 - ph;

		if (this._select_type & nexacro._PanelSelectConst.POINT_LT) {
			ctrls[0].move(pl, pt, ps, ps);
		}
		else {
			ctrls[0].move(bl, bt, bs, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_RT) {
			ctrls[2].move(pr, pt, ps, ps);
		}
		else {
			ctrls[2].move(br, bt, bs, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_LB) {
			ctrls[4].move(pr, pb, ps, ps);
		}
		else {
			ctrls[4].move(br, bb, bs, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_RB) {
			ctrls[6].move(pl, pb, ps, ps);
		}
		else {
			ctrls[6].move(bl, bb, bs, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_CT) {
			ctrls[1].move(ch, pt, ps, ps);
		}
		else {
			ctrls[1].move(il, bt, iw, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_CR) {
			ctrls[3].move(pr, cv, ps, ps);
		}
		else {
			ctrls[3].move(br, it, bs, ih);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_CB) {
			ctrls[5].move(ch, pb, ps, ps);
		}
		else {
			ctrls[5].move(il, bb, iw, bs);
		}
		if (this._select_type & nexacro._PanelSelectConst.POINT_CL) {
			ctrls[7].move(pl, cv, ps, ps);
		}
		else {
			ctrls[7].move(bl, it, bs, ih);
		}

		if (this._assist_ctrls) {
			this._recalcAssist(bound);
		}
	};

	_pPanelSelectControl._recalcAssist = function (bound) {
		if (this._select_owner && this._select_owner.onRecalcSelectAssist) {
			this._select_owner.onRecalcSelectAssist(bound);
		}
	};

	_pPanelSelectControl._resizeSelect = function (offsetX, offsetY, changeattach) {
		var ctrlIdx = this._select_ctrls.indexOf(this._dragbase);

		switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK) {
			case nexacro._PanelSelectConst.TYPE_LINE:
				this._resizeSelectLine(ctrlIdx, offsetX, offsetY, changeattach);
				break;
			case nexacro._PanelSelectConst.TYPE_AREA:
				this._resizeSelectArea(ctrlIdx, offsetX, offsetY, changeattach);
				break;
		}
	};
	_pPanelSelectControl._resizeSelectLine = function (ctrlIdx, offsetX, offsetY, notify) {
		var bound = this._getBoundArea();
		var ctrls = this._select_ctrls;

		if (!bound || !bound.length == 6) {
			return;
		}
		if (!ctrls || !ctrls.length == 1) {
			return;
		}

		var ctrl = ctrls[ctrlIdx];

		if (ctrl) {
			var newX = ctrl.getOffsetLeft();
			var newY = ctrl.getOffsetTop();

			switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV) {
				case nexacro._PanelSelectConst.DIR_HORZ:
					newY += offsetY;
					break;
				case nexacro._PanelSelectConst.DIR_VERT:
					newX += offsetX;
					break;
			}

			ctrl.move(newX, newY);
		}

		if (notify) {
			this._notifyChange(offsetX, offsetY);
		}
	};
	_pPanelSelectControl._resizeSelectArea = function (ctrlIdx, offsetX, offsetY, notify) {
		var bound = this._getBoundArea();
		var ctrls = this._select_ctrls;

		if (!bound || !bound.length == 6) {
			return;
		}
		if (!ctrls || !ctrls.length == 8) {
			return;
		}

		var ctrlRT, ctrlRB;
		var ctrlLT, ctrlLB;
		var ctrlCL, ctrlCT, ctrlCR, ctrlCB;

		var newX, newY;

		switch (ctrlIdx) {
			case 0:
				{

					ctrlRT = ctrls[2];
					ctrlCT = ctrls[1];
					ctrlLT = ctrls[0];
					ctrlCL = ctrls[7];
					ctrlLB = ctrls[4];

					ctrlLT.move(ctrlLT.getOffsetLeft() + offsetX, ctrlLT.getOffsetTop() + offsetY);
					ctrlRT.move(ctrlRT.getOffsetLeft(), ctrlRT.getOffsetTop() + offsetY);
					ctrlLB.move(ctrlLB.getOffsetLeft() + offsetX, ctrlLB.getOffsetTop());
					ctrlCT.move(ctrlCT.getOffsetLeft() + offsetX, ctrlCT.getOffsetTop() + offsetY, ctrlCT.getOffsetWidth() - offsetX, ctrlCT.getOffsetHeight());
					ctrlCL.move(ctrlCL.getOffsetLeft() + offsetX, ctrlCL.getOffsetTop(), ctrlCL.getOffsetWidth(), ctrlCL.getOffsetHeight() - offsetY);

					break;
				}
			case 1:
				{

					ctrlLT = ctrls[0];
					ctrlCT = ctrls[1];
					ctrlRT = ctrls[2];

					newY = ctrlLT.getOffsetTop() + offsetY;

					ctrlLT.move(ctrlLT.getOffsetLeft(), newY);
					ctrlCT.move(ctrlCT.getOffsetLeft(), newY);
					ctrlRT.move(ctrlRT.getOffsetLeft(), newY);

					break;
				}
			case 2:
				{

					ctrlLT = ctrls[0];
					ctrlCT = ctrls[1];
					ctrlRT = ctrls[2];
					ctrlCR = ctrls[3];
					ctrlRB = ctrls[6];

					ctrlRT.move(ctrlRT.getOffsetLeft() + offsetX, ctrlRT.getOffsetTop() + offsetY);
					ctrlLT.move(ctrlLT.getOffsetLeft(), ctrlLT.getOffsetTop() + offsetY);
					ctrlRB.move(ctrlRB.getOffsetLeft() + offsetX, ctrlRB.getOffsetTop());
					ctrlCT.move(ctrlCT.getOffsetLeft(), ctrlCT.getOffsetTop() + offsetY, ctrlCT.getOffsetWidth() + offsetX, ctrlCT.getOffsetHeight());
					ctrlCR.move(ctrlCR.getOffsetLeft() + offsetX, ctrlCR.getOffsetTop() + offsetY, ctrlCR.getOffsetWidth(), ctrlCR.getOffsetHeight() - offsetY);

					break;
				}
			case 3:
				{

					ctrlRT = ctrls[2];
					ctrlCR = ctrls[3];
					ctrlRB = ctrls[6];

					newX = ctrlCR.getOffsetLeft() + offsetX;

					ctrlRT.move(newX, ctrlRT.getOffsetTop());
					ctrlCR.move(newX, ctrlCR.getOffsetTop());
					ctrlRB.move(newX, ctrlRB.getOffsetTop());

					break;
				}
			case 4:
				{

					ctrlLT = ctrls[0];
					ctrlLB = ctrls[4];
					ctrlCB = ctrls[5];
					ctrlRB = ctrls[6];

					ctrlLB.move(ctrlLB.getOffsetLeft() + offsetX, ctrlLB.getOffsetTop() + offsetY);
					ctrlRB.move(ctrlRB.getOffsetLeft(), ctrlRB.getOffsetTop() + offsetY);
					ctrlLT.move(ctrlLT.getOffsetLeft() + offsetX, ctrlLT.getOffsetTop());
					ctrlCB.move(ctrlCB.getOffsetLeft() + offsetX, ctrlCB.getOffsetTop() + offsetY, ctrlCB.getOffsetWidth() - offsetX, ctrlCB.getOffsetHeight());

					break;
				}
			case 5:
				{

					ctrlLB = ctrls[4];
					ctrlCB = ctrls[5];
					ctrlRB = ctrls[6];

					newY = ctrlCB.getOffsetTop() + offsetY;

					ctrlLB.move(ctrlLB.getOffsetLeft(), newY);
					ctrlCB.move(ctrlCB.getOffsetLeft(), newY);
					ctrlRB.move(ctrlRB.getOffsetLeft(), newY);

					break;
				}
			case 6:
				{

					ctrlRT = ctrls[2];
					ctrlCB = ctrls[5];
					ctrlRB = ctrls[6];
					ctrlCR = ctrls[3];
					ctrlLB = ctrls[4];

					ctrlRB.move(ctrlRB.getOffsetLeft() + offsetX, ctrlRB.getOffsetTop() + offsetY);
					ctrlLB.move(ctrlLB.getOffsetLeft(), ctrlLB.getOffsetTop() + offsetY);
					ctrlRT.move(ctrlRT.getOffsetLeft() + offsetX, ctrlRT.getOffsetTop());
					ctrlCB.move(ctrlCB.getOffsetLeft(), ctrlCB.getOffsetTop() + offsetY, ctrlCB.getOffsetWidth() - offsetX, ctrlCB.getOffsetHeight());
					ctrlCR.move(ctrlCR.getOffsetLeft() + offsetX, ctrlCR.getOffsetTop(), ctrlCR.getOffsetWidth(), ctrlCR.getOffsetHeight() - offsetY);

					break;
				}
			case 7:
				{

					ctrlLT = ctrls[0];
					ctrlCL = ctrls[7];
					ctrlLB = ctrls[4];

					newX = ctrlCL.getOffsetLeft() + offsetX;

					ctrlLT.move(newX, ctrlLT.getOffsetTop());
					ctrlCL.move(newX, ctrlCL.getOffsetTop());
					ctrlLB.move(newX, ctrlLB.getOffsetTop());

					break;
				}
		}

		if (notify) {
			this._notifyChange(offsetX, offsetY);
		}
	};

	_pPanelSelectControl._showSelector = function (show) {
		return this._showControls(this._select_ctrls, show);
	};
	_pPanelSelectControl._showAssistor = function (show) {
		return this._showControls(this._assist_ctrls, show);
	};
	_pPanelSelectControl._showControls = function (control, show) {
		var visible = show ? show : true;

		if (control) {
			if (control.length) {
				for (var i = 0, l = control.length; i < l; i++) {
					var ctrl = control[i];
					if (ctrl) {
						ctrl.set_visible(visible);
					}
				}
			}
			else {
				control.set_visible(visible);
			}
		}
	};
	_pPanelSelectControl._hideSelector = function () {
		return this._showSelector(false);
	};
	_pPanelSelectControl._hideAssistor = function () {
		return this._showAssistor(false);
	};

	_pPanelSelectControl._convPosOffset = function (pos, base, offsetfn) {
		for (; base && base.parent && base.parent != this._select_owner; base = base.parent) {
			pos += base[offsetfn]();
		}

		return pos;
	};
	_pPanelSelectControl._getBoundArea = function () {
		var barea = [0, 0, 0, 0, 0, 0];
		var begin = this._select_begin ? this._select_begin : null;
		var final = this._select_final ? this._select_final : begin;

		if (!begin || !final) {
			return;
		}

		if (begin.getOffsetLeft && final.getOffsetLeft) {
			barea[0] = this._convPosOffset(begin.getOffsetLeft(), begin, "getOffsetLeft");
			barea[1] = this._convPosOffset(begin.getOffsetTop(), begin, "getOffsetTop");
			barea[4] = this._convPosOffset(final.getOffsetRight(), final, "getOffsetRight");
			barea[5] = this._convPosOffset(final.getOffsetBottom(), final, "getOffsetBottom");
			barea[2] = barea[4] - barea[0];
			barea[3] = barea[5] - barea[1];

			return barea;
		}
		if (begin._getSlotSize && final._getSlotSize) {
			var sizeb = begin._getSlotSize(begin._isSlotStatusBandMax());
			var sizef = final._getSlotSize(final._isSlotStatusBandMax());

			barea[0] = sizeb[0];
			barea[1] = sizeb[1];
			barea[4] = sizef[4];
			barea[5] = sizef[5];
			barea[2] = barea[4] - barea[0];
			barea[3] = barea[5] - barea[1];

			return barea;
		}

		return barea;
	};

	_pPanelSelectControl._initInfo = function (owner, begin, final, sourceindex, targetindex, sourcelevel, targetlevel, borderwidth, pointersize) {
		this._select_owner = owner;

		this._select_begin = begin;
		this._select_final = final;
		this._begin_index = begin && begin._getSlotIndex ? begin._getSlotIndex() : -1;
		this._final_index = final && final._getSlotIndex ? final._getSlotIndex() : -1;

		if (!nexacro._isNull(sourceindex)) {
			this._source_index = sourceindex;
		}
		if (!nexacro._isNull(targetindex)) {
			this._target_index = targetindex;
		}
		if (!nexacro._isNull(sourcelevel)) {
			this._source_level = sourcelevel;
		}
		if (!nexacro._isNull(targetlevel)) {
			this._target_level = targetlevel;
		}

		if (borderwidth) {
			this._border_width = borderwidth;
		}
		if (pointersize) {
			this._pointer_size = pointersize;
		}
	};
	_pPanelSelectControl._clear = function () {
		this._clearAssistor();
		this._clearSelector();

		this._select_type = nexacro._PanelSelectConst.TYPE_NONE;
		this._select_show = false;
		this._select_ctrls = null;
		this._select_owner = null;
		this._select_begin = null;
		this._select_final = null;
		this._begin_index = -1;
		this._final_index = -1;
		this._source_index = -1;
		this._target_index = -1;
		this._source_level = -1;
		this._target_level = -1;
	};


	_pPanelSelectControl._notifyChange = function (offsetX, offsetY) {
		if (this.onresize && this.onresize._has_handlers) {
			var evt = new nexacro.SizeEventInfo(this, "onresize", offsetX, offsetY);
			this.onresize._fireEvent(this, evt);
		}
	};

	_pPanelSelectControl.on_notify_select_onclick = function (obj, e) {
		this._actionSelector(e, "selectclick");
	};
	_pPanelSelectControl.on_notify_select_ondrag = function (obj, e) {
		this._actionSelector(e, "selectdrag");

		return true;
	};
	_pPanelSelectControl.on_notify_select_ondragmove = function (obj, e) {
		this._actionSelector(e, "selectmove");
	};
	_pPanelSelectControl.on_notify_select_ondrop = function (obj, e) {
		this._actionSelector(e, "selectdrop");
	};

	_pPanelSelectControl._actionSelector = function (e, trigger) {
		switch (trigger) {
			case "selectclick":
				{

					this._clickSelect(e);
					break;
				}
			case "selectdrag":
				{

					this._dragSelect(e);
					break;
				}
			case "selectmove":
				{

					if (this._dragmode) {
						this._moveSelect(e);
					}
					break;
				}
			case "selectdrop":
				{

					if (this._dragmode) {
						this._dropSelect(e);
					}
					break;
				}
		}
	};
	_pPanelSelectControl._clickSelect = function (e) {
	};
	_pPanelSelectControl._dragSelect = function (e) {
		this._dragmode = true;

		this._dragbase = e.fromobject;
		this._dragorgx = e.screenx;
		this._dragorgy = e.screeny;
		this._dragchgx = e.screenx;
		this._dragchgy = e.screeny;
	};
	_pPanelSelectControl._moveSelect = function (e) {
		this._dragoffx = e.screenx - this._dragchgx;
		this._dragoffy = e.screeny - this._dragchgy;

		this._resizeSelect(this._dragoffx, this._dragoffy, false);

		this._dragchgx = e.screenx;
		this._dragchgy = e.screeny;
	};
	_pPanelSelectControl._dropSelect = function (e) {
		this._dragoffx = e.screenx - this._dragchgx;
		this._dragoffy = e.screeny - this._dragchgy;

		this._resizeSelect(this._dragoffx, this._dragoffy, false);

		this._dragoffx = e.screenx - this._dragorgx;
		this._dragoffy = e.screeny - this._dragorgy;

		this._notifyChange(this._dragoffx, this._dragoffy);

		this._dragorgx = 0;
		this._dragorgy = 0;
		this._dragchgx = 0;
		this._dragchgy = 0;
		this._dragoffx = 0;
		this._dragoffy = 0;

		this._dragbase = null;
		this._dragmode = false;
	};

	_pPanelSelectControl._moveControl = function (e) {
		this._dragmode = false;
	};

	delete _pPanelSelectControl;
}


if (!nexacro._PanelSlot) {
	nexacro._PanelSlotConst = 
		{
		HORZALIGN_FULLFIT : 0, 
		HORZALIGN_LEFT : 1, 
		HORZALIGN_RIGHT : 2, 
		HORZALIGN_CENTER : 3, 
		VERTALIGN_FULLFIT : 0, 
		VERTALIGN_TOP : 1, 
		VERTALIGN_BOTTOM : 2, 
		VERTALIGN_MIDDLE : 3, 

		GROUP_ITEM : 0, 
		GROUP_TITLE : 1, 
		GROUP_SPLIT : -1, 

		STATUS_CURRENT : -9, 
		STATUS_NONE : 0, 
		STATUS_COLLPASE : -1, 
		STATUS_EXPAND : 1, 
		STATUS_POPUP : 2
	};

	nexacro._PanelSlot = function (_target, _static) {
		this._slot_target = _target;
		this._slot_static = _static;
		this._slot_visible = true;
		this._slot_status = 0;
		this._slot_multi = 0;
		this._slot_halign = 0;
		this._slot_valign = 0;
		this._slot_level = -1;
		this._slot_group = -1;
		this._slot_index = -1;
	};

	var _pPanelSlot = nexacro._createPrototype(Object, nexacro._PanelSlot);
	nexacro._PanelSlot.prototype = _pPanelSlot;
	_pPanelSlot._type_name = "_PanelSlot";



	_pPanelSlot._getSlotTarget = function () {
		return this._slot_target;
	};
	_pPanelSlot._setSlotTarget = function (_target) {
		this._slot_target = _target;
	};
	_pPanelSlot._getSlotTargetBand = function (bandsq) {
		return this._slot_target.length ? this._slot_target[bandsq] : null;
	};
	_pPanelSlot._placeSlotTarget = function (_target) {
		this._slot_target = _target;

		if (this._slot_cshadj) {
			this._adjustSlotPosition.apply(this, this._getSlotCachedPos());
		}
		else {
			this._setSlotSize.apply(this, this._getSlotCachedPos());
		}
	};
	_pPanelSlot._clearSlotTarget = function (nullset) {
		this._slot_target = null;
	};

	_pPanelSlot._getSlotStatic = function () {
		return this._slot_static;
	};
	_pPanelSlot._setSlotStatic = function (_static) {
		this._slot_static = _static;
	};
	_pPanelSlot._clearSlotStatic = function (unlink) {
		if (!unlink && this._slot_static) {
			delete this._slot_static;
		}

		this._slot_static = null;
	};

	_pPanelSlot._setSlotVisible = function (show) {
		this._slot_visible = show;

		if (this._slot_static) {
			this._slot_static.set_visible(show);
		}

		if (this._slot_target) {
			if (this._slot_target.length) {
				var i;

				var n;

				var target;

				switch (this._slot_multi) {
					case -1:
					case 2:
						{

							target = this._slot_target[0];
							if (target) {
								target.set_visible(show);
							}

							if (show) {
								for (i = 1, n = target.length; i < n; i++) {
									target = this._slot_target[i];
									if (target) {
										target.set_visible(false);
									}
								}
							}
							break;
						}
					case 1:
					case 0:
					default:
						{

							for (i = 0, n = 0; i < n; i++) {
								target = this._slot_target[i];
								if (target) {
									target.set_visible(show);
								}
							}
							break;
						}
				}
			}
			else {
				this._slot_target.set_visible(show);
			}
		}
	};
	_pPanelSlot._isVisible = function () {
		return this._slot_visible;
	};

	_pPanelSlot._isNonEmptyTarget = function (_target) {
		if (nexacro._isArray(_target)) {
			for (var i = 0, l = _target.length; i < l; i++) {
				if (_target[i]) {
					return true;
				}
			}

			return false;
		}
		else {
			return !!_target;
		}
	};
	_pPanelSlot._isNonEmptyStatic = function (_static) {
		return !!_static;
	};
	_pPanelSlot._isEmptyTarget = function (_target) {
		return !this._isNonEmptyTarget(_target);
	};
	_pPanelSlot._isEmptyStatic = function (_static) {
		return !this._isNonEmptyStatic(_static);
	};

	_pPanelSlot._setSlotStatus = function (slotstat) {
		this._slot_status = slotstat;
	};
	_pPanelSlot._getSlotStatus = function () {
		return this._slot_status;
	};
	_pPanelSlot._setSlotStatusBand = function (bandstat) {
		this._slot_multi = bandstat;
	};
	_pPanelSlot._getSlotStatusBand = function () {
		return this._slot_multi;
	};
	_pPanelSlot._isSlotStatusMin = function () {
		return this._slot_status != nexacro._PanelSlotConst.STATUS_EXPAND;
	};
	_pPanelSlot._isSlotStatusMax = function () {
		return this._slot_status == nexacro._PanelSlotConst.STATUS_EXPAND;
	};
	_pPanelSlot._isSlotStatusBandMin = function () {
		return this._slot_multi != nexacro._PanelSlotConst.STATUS_EXPAND;
	};
	_pPanelSlot._isSlotStatusBandMax = function () {
		return this._slot_multi == nexacro._PanelSlotConst.STATUS_EXPAND;
	};
	_pPanelSlot._setSlotStatusSet = function (slotstat, bandstat) {
		this._slot_status = slotstat;
		this._slot_multi = bandstat;
	};
	_pPanelSlot._getSlotStatusSet = function () {
		return [this._slot_status, this._slot_multi];
	};

	_pPanelSlot._setSlotIndex = function (index) {
		this._slot_index = index;
	};
	_pPanelSlot._getSlotIndex = function () {
		return this._slot_index;
	};
	_pPanelSlot._setSlotLevel = function (level) {
		this._slot_level = level;
	};
	_pPanelSlot._getSlotLevel = function () {
		return this._slot_level;
	};
	_pPanelSlot._setSlotGroup = function (group) {
		this._slot_group = group;
	};
	_pPanelSlot._getSlotGroup = function () {
		return this._slot_group;
	};

	_pPanelSlot._getSlotAlignHorz = function () {
		return this._slot_halign;
	};
	_pPanelSlot._getSlotAlignVert = function () {
		return this._slot_valign;
	};
	_pPanelSlot._getSlotAlign = function () {
		return [this._slot_halign, this._slot_valign];
	};
	_pPanelSlot._setSlotAlignHorz = function (halign) {
		this._slot_halign = halign;
	};
	_pPanelSlot._setSlotAlignVert = function (valign) {
		this._slot_valign = valign;
	};
	_pPanelSlot._setSlotAlign = function (halign, valign) {
		this._slot_halign = halign;
		this._slot_valign = valign;
	};

	_pPanelSlot._setStaticSize = function (_static, left, top, width, height, right, bottom, show) {
		if (show) {
			_static.move(left, top, width, height, right, bottom);
			_static.set_visible(true);
		}
		else {
			_static.move(left, top, width, height, right, bottom);
		}
	};
	_pPanelSlot._setTargetSize = function (_target, left, top, width, height, right, bottom, show) {
		if (!this._slot_halign && !this._slot_valign) {
			if (show) {
				_target.move(left, top, width, height, right, bottom);
				_target.set_visible(true);
			}
			else {
				_target.move(left, top, width, height, right, bottom);
			}
		}
		else {
			var l = left != null ? left : null;
			var t = top != null ? top : null;
			var r = right != null ? right : null;
			var b = bottom != null ? bottom : null;
			var w = _target.getPixelWidth();
			var h = _target.getPixelHeight();

			if (l) {
				switch (this._slot_halign) {
					case nexacro._PanelSlotConst.HORZALIGN_FULLFIT:
						w = width;
					case nexacro._PanelSlotConst.HORZALIGN_LEFT:
						l = 0;
						break;
					case nexacro._PanelSlotConst.HORZALIGN_RIGHT:
						l = (width - w);
						break;
					case nexacro._PanelSlotConst.HORZALIGN_CENTER:
						l = (width - w) / 2;
						break;
				}
			}
			else {
				switch (this._slot_halign) {
					case nexacro._PanelSlotConst.HORZALIGN_FULLFIT:
						w = width;
					case nexacro._PanelSlotConst.HORZALIGN_RIGHT:
						r = 0;
						break;
					case nexacro._PanelSlotConst.HORZALIGN_LEFT:
						r = (width + w);
						break;
					case nexacro._PanelSlotConst.HORZALIGN_CENTER:
						r = (width + w) / 2;
						break;
				}
			}

			if (t) {
				switch (this._slot_valign) {
					case nexacro._PanelSlotConst.VERTALIGN_FULLFIT:
						h = height;
					case nexacro._PanelSlotConst.VERTALIGN_TOP:
						t = 0;
						break;
					case nexacro._PanelSlotConst.VERTALIGN_BOTTOM:
						t = (height - h);
						break;
					case nexacro._PanelSlotConst.VERTALIGN_MIDDLE:
						t = (height - h) / 2;
						break;
				}
			}
			else {
				switch (this._slot_valign) {
					case nexacro._PanelSlotConst.VERTALIGN_FULLFIT:
						h = height;
					case nexacro._PanelSlotConst.VERTALIGN_BOTTOM:
						b = 0;
						break;
					case nexacro._PanelSlotConst.VERTALIGN_TOP:
						b = (height + h);
						break;
					case nexacro._PanelSlotConst.VERTALIGN_MIDDLE:
						b = (height + h) / 2;
						break;
				}
			}

			if (show) {
				_target.move(l, t, w, h, r, b);
				_target.set_visible(true);
			}
			else {
				_target.move(l, t, w, h, r, b);
			}
		}
	};
	_pPanelSlot._getControlSize = function (control) {
		if (control) {
			var l = control.getOffsetLeft();
			var t = control.getOffsetTop();
			var r = control.getOffsetRight();
			var b = control.getOffsetBottom();
			var w = r - l;
			var h = b - t;

			return [l, t, w, h, r, b];
		}
	};
	_pPanelSlot._getStaticSize = function () {
		return this._getControlSize(this._slot_static);
	};
	_pPanelSlot._getTargetSize = function (idx, max) {
		var target = this._slot_target;
		if (target) {
			if (target.length) {
				if (idx >= 0 && idx < target.length) {
					return this._getControlSize(target[idx]);
				}

				var stsize = this._getControlSize(target[0]);
				var pos = max ? this._getSlotMaxPosition() : this._getSlotMinPosition();

				return [stsize[0], stsize[1], pos[2], pos[3], stsize[0] + pos[2], stsize[1] + pos[3]];
			}

			return this._getControlSize(target);
		}
	};

	_pPanelSlot._getSlotMinPosition = function () {
		return this._slot_minpos;
	};
	_pPanelSlot._getSlotMaxPosition = function () {
		return this._slot_maxpos;
	};
	_pPanelSlot._getSlotMinWidth = function () {
		return this._slot_minpos ? this._slot_minpos[2] : 0;
	};
	_pPanelSlot._getSlotMaxWidth = function () {
		return this._slot_maxpos ? this._slot_maxpos[2] : 0;
	};
	_pPanelSlot._getSlotMinHeight = function () {
		return this._slot_minpos ? this._slot_minpos[3] : 0;
	};
	_pPanelSlot._getSlotMaxHeight = function () {
		return this._slot_maxpos ? this._slot_maxpos[3] : 0;
	};

	_pPanelSlot._setSlotMinPosition = function (minpos) {
		if (minpos) {
			minpos[4] = minpos[5] = null;
		}

		this._slot_minpos = minpos;
	};
	_pPanelSlot._setSlotMaxPosition = function (maxpos) {
		if (maxpos) {
			maxpos[4] = maxpos[5] = null;
		}

		this._slot_maxpos = maxpos;
	};
	_pPanelSlot._adjustMinPosition = function (min, pos, cw, ch) {
		if (min) {
			var positw = nexacro._isNull(pos[2]) ? pos[4] - pos[0] : pos[2];
			var posith = nexacro._isNull(pos[3]) ? pos[5] - pos[1] : pos[3];
			var positr = nexacro._isNull(pos[4]) ? pos[0] + positw : cw - pos[4];
			var positb = nexacro._isNull(pos[5]) ? pos[1] + posith : ch - pos[5];
			var positl = nexacro._isNull(pos[0]) ? positr - positw : pos[0];
			var positt = nexacro._isNull(pos[1]) ? positb - posith : pos[1];

			min[0] = nexacro._nvl(Math.min(min[0], positl), 0);
			min[1] = nexacro._nvl(Math.min(min[1], positt), 0);
			min[4] = nexacro._nvl(Math.max(min[4], positr), 0);
			min[5] = nexacro._nvl(Math.max(min[5], positb), 0);
			min[2] = min[4] - min[0];
			min[3] = min[5] - min[1];
		}
	};
	_pPanelSlot._adjustMaxPosition = function (max, pos, cw, ch) {
		if (max) {
			var positw = nexacro._isNull(pos[2]) ? pos[4] - pos[0] : pos[2];
			var posith = nexacro._isNull(pos[3]) ? pos[5] - pos[1] : pos[3];
			var positr = nexacro._isNull(pos[4]) ? pos[0] + positw : cw - pos[4];
			var positb = nexacro._isNull(pos[5]) ? pos[1] + posith : ch - pos[5];
			var positl = nexacro._isNull(pos[0]) ? positr - positw : pos[0];
			var positt = nexacro._isNull(pos[1]) ? positb - posith : pos[1];

			max[0] = nexacro._nvl(Math.min(max[0], positl), 0);
			max[1] = nexacro._nvl(Math.min(max[1], positt), 0);
			max[4] = nexacro._nvl(Math.max(max[4], positr), 0);
			max[5] = nexacro._nvl(Math.max(max[5], positb), 0);
			max[2] = max[4] - max[0];
			max[3] = max[5] - max[1];
		}
	};
	_pPanelSlot._adjustArrPosition = function (arr, pos, cw, ch) {
		if (arr) {
			if (arr[0] !== undefined && pos[0] !== undefined) {
				arr[0] += pos[0];
			}
			if (arr[1] !== undefined && pos[1] !== undefined) {
				arr[1] += pos[1];
			}
			if (arr[2] !== undefined && pos[2] !== undefined) {
				arr[2] += pos[2];
			}
			if (arr[3] !== undefined && pos[3] !== undefined) {
				arr[3] += pos[3];
			}
			if (arr[4] !== undefined && pos[4] !== undefined) {
				arr[4] += pos[4];
			}
			if (arr[5] !== undefined && pos[5] !== undefined) {
				arr[5] += pos[5];
			}
		}
	};
	_pPanelSlot._adjustPrePosition = function (acc, pos, cw, ch) {
		if (acc) {
			acc[1] += pos[3];
		}
	};

	_pPanelSlot._isSetSlotCalcSize = function () {
		return this._slot_width && this._slot_height;
	};
	_pPanelSlot._isSetSlotCalcRect = function () {
		return this._slot_left || this._slot_top || this._slot_right || this._slot_bottom;
	};
	_pPanelSlot._isSetSlotCalc = function () {
		return this._isSetSlotCalcSize() || this._isSetSlotCalcRect();
	};

	_pPanelSlot._setSlotCalcSize = function (width, height) {
		this._slot_width = width;
		this._slot_height = height;
	};
	_pPanelSlot._setSlotCalcWidth = function (width) {
		this._slot_width = width;
	};
	_pPanelSlot._setSlotCalcHeight = function (height) {
		this._slot_height = height;
	};
	_pPanelSlot._getSlotCalcSize = function () {
		return [this._slot_width, this._slot_height];
	};
	_pPanelSlot._getSlotCalcWidth = function () {
		return this._slot_width;
	};
	_pPanelSlot._getSlotCalcHeight = function () {
		return this._slot_height;
	};
	_pPanelSlot._setSlotCalcRect = function (left, top, right, bottom) {
		this._slot_left = left;
		this._slot_top = top;
		this._slot_right = right;
		this._slot_bottom = bottom;
	};
	_pPanelSlot._setSlotCalcLeft = function (left) {
		this._slot_left = left;
	};
	_pPanelSlot._setSlotCalcTop = function (top) {
		this._slot_top = top;
	};
	_pPanelSlot._setSlotCalcRight = function (right) {
		this._slot_right = right;
	};
	_pPanelSlot._setSlotCalcBottom = function (bottom) {
		this._slot_bottom = bottom;
	};
	_pPanelSlot._getSlotCalcRect = function () {
		return [this._slot_left, this._slot_top, this._slot_right, this._slot_bottom];
	};
	_pPanelSlot._getSlotCalcLeft = function () {
		return this._slot_left;
	};
	_pPanelSlot._getSlotCalcTop = function () {
		return this._slot_top;
	};
	_pPanelSlot._getSlotCalcRight = function () {
		return this._slot_right;
	};
	_pPanelSlot._getSlotCalcBottom = function () {
		return this._slot_bottom;
	};
	_pPanelSlot._setSlotCalc = function (left, top, width, height, right, bottom) {
		this._slot_left = left;
		this._slot_top = top;
		this._slot_right = right;
		this._slot_bottom = bottom;
		this._slot_width = width;
		this._slot_height = height;
	};
	_pPanelSlot._getSlotCalc = function () {
		return [this._slot_left, this._slot_top, this._slot_width, this._slot_height, this._slot_right, this._slot_bottom];
	};

	_pPanelSlot._setSlotPosition = function (posits) {
		var usearr = false;

		if (posits) {
			for (var i = 0, l = posits.length; i < l; i++) {
				if (posits[i][6]) {
					usearr = true;
					break;
				}
			}
		}
		else {
			this._setSlotCalcRect(0, 0, 0, 0);
			this._setSlotCalcSize(0, 0);
		}

		this._slot_usearr = usearr;
		this._slot_posits = posits;
	};
	_pPanelSlot._getSlotPosition = function () {
		return this._slot_posits;
	};

	_pPanelSlot._arrSlotPosition = function (parentwidth, parentheight) {
		var posits = this._slot_posits;

		if (posits && posits.length && this._slot_usearr) {
			this._slot_arrpos = Array(posits.length);

			for (var i = 0, l = posits.length; i < l; i++) {
				var pos = posits[i];
				var cnt = Math.min(pos.length, 6);
				var arr = Array(cnt);

				for (var c = 0, n = cnt; c < n; c++) {
					var p = pos[c];

					if (p != 0 && -1 < p && p < 1) {
						arr[c] = Math.floor(p *  100 *  (c % 2 ? parentheight : parentwidth));
					}
					else {
						arr[c] = p;
					}
				}

				this._slot_arrpos[i] = arr;
			}

			return this._slot_arrpos;
		}
		else {
			return this._slot_posits;
		}
	};
	_pPanelSlot._getSlotArrangePos = function () {
		return this._slot_arrpos ? this._slot_arrpos : this._slot_posits;
	};
	_pPanelSlot._setSlotCachedPos = function (pos, adjust) {
		this._slot_cshpos = pos;
		this._slot_cshadj = adjust;
	};
	_pPanelSlot._getSlotCachedPos = function () {
		return this._slot_cshpos;
	};

	_pPanelSlot._calcSlotPosition = function (left, top, right, bottom, clientwidth, clientheight) {
		var _posits = this._arrSlotPosition(clientwidth, clientheight);
		if (_posits && _posits.length) {
			var _width = clientwidth;
			var _height = clientheight;
			var _poslen = _posits.length;
			var _arrpos, _pos;
			var _index, _limit;

			var _minpos = [0, 0, 0, 0, 0, 0];
			var _maxpos = [0, 0, 0, 0, 0, 0];

			switch (this._slot_multi) {
				case -1:
				case 2:
				case 1:
					{

						if (_poslen > 1) {
							_index = 0;
							_limit = 1;

							for (; _index < _limit; _index++) {
								_arrpos = _posits[_index].slice();

								this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
								this._adjustMinPosition(_minpos, _arrpos, _width, _height);
								this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
							}
							for (; _index < _poslen; _index++) {
								_arrpos = _posits[_index].slice();

								this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
								this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
							}
						}
						else {
							_arrpos = _posits[0];

							this._adjustMinPosition(_minpos, _arrpos, _width, _height);
							this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
						}

						this._setSlotMinPosition(_minpos);
						this._setSlotMaxPosition(_maxpos);

						_pos = this._slot_multi != 1 ? this._getSlotMinPosition() : this._getSlotMaxPosition();

						this._setSlotCalcRect(_pos[0] + (left ? left : 0), _pos[1] + (top ? top : 0), _pos[4] + (right ? right : 0), _pos[5] + (bottom ? bottom : 0));
						this._setSlotCalcSize(_pos[2], _pos[3]);

						break;
					}
				default:
					{

						if (_poslen) {
							_index = 0;

							for (; _index < _poslen; _index++) {
								_arrpos = _posits[_index].slice();

								this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
								this._adjustMinPosition(_minpos, _arrpos, _width, _height);
								this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
							}
						}
						else {
							_arrpos = _posits[0];

							this._adjustMinPosition(_minpos, _arrpos, _width, _height);
							this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
						}

						this._setSlotMinPosition(_minpos);
						this._setSlotMaxPosition(_maxpos);

						_pos = this._getSlotMaxPosition();

						this._setSlotCalcRect(_pos[0] + (left ? left : 0), _pos[1] + (top ? top : 0), _pos[4] + (right ? right : 0), _pos[5] + (bottom ? bottom : 0));
						this._setSlotCalcSize(_pos[2], _pos[3]);

						break;
					}
			}
		}
	};
	_pPanelSlot._adjustSlotPosition = function (left, top, clientwidth, clientheight, right, bottom) {
		var _posits = this._getSlotArrangePos();

		if (_posits && _posits.length) {
			var _static = this._slot_static;
			var _target = this._slot_target;

			var _left = left ? left : 0;
			var _top = top ? top : 0;
			var _right = right ? right : 0;
			var _bottom = bottom ? bottom : 0;
			var _width = clientwidth;
			var _height = clientheight;

			var l, n;
			var count, index;
			var _pos, _tar;

			var _nilpos = [0, 0, 0, 0, 0, 0];
			var _accpos = [0, 0, 0, 0, 0, 0];
			var _clcpos = [_left, _top, 0, 0, _right, _bottom];

			switch (this._slot_multi) {
				case -1:
				case 2:
					{

						if (this._isNonEmptyTarget(_target)) {
							if (_target.length) {
								count = 1;
								index = 0;

								for (l = Math.min(count, _target.length); index < l; index++) {
									_pos = _posits[index % _posits.length];
									_tar = _target[index];
									if (_tar && _tar.move) {
										_tar.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
										_tar.set_visible(true);

										if (index == 0) {
											this._setSlotCachedPos([_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom], true);
										}
									}
								}

								for (l = _target.length; index < l; index++) {
									_tar = _target[index];
									if (_tar && _tar.move) {
										_tar = _target[index];

										_tar.move.apply(_tar, _nilpos);
										_tar.set_visible(false);
									}
								}
							}
							else {
								if (_target && _target.move) {
									_pos = _posits[0];

									_target.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
									_target.set_visible(true);

									this._setSlotCachedPos([_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom], true);
								}
							}
						}
						else {
							this._setSlotCachedPos([_left, _top, _width, _height, _right, _bottom], true);
						}

						if (_static && _static.move) {
							_pos = this._getSlotMaxPosition();

							_static.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
							_static.set_visible(true);

							this._setSlotCachedPos([_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom], true);
						}

						break;
					}
				case 1:
				default:
					{

						if (this._isNonEmptyTarget(_target)) {
							if (_target.length) {
								for (index = 0, l = _target.length, n = _posits.length; index < l; index++) {
									var _curtar = _target[index];
									var _curpos = _posits[index % n];
									var _arrpos = _curpos.slice();
									var _indent = _curtar._onGetItemIndentSize(_curtar);

									this._adjustArrPosition(_arrpos, _clcpos, _width, _height);
									this._adjustArrPosition(_arrpos, _accpos, _width, _height);
									this._adjustArrPosition(_arrpos, _indent, _width, _height);

									if (_curtar && _curtar.move) {
										_curtar.move.apply(_curtar, _arrpos);
										_curtar.set_visible(true);
									}

									if (index == 0) {
										this._setSlotCachedPos(_arrpos, true);
									}

									this._adjustPrePosition(_accpos, _curpos, _width, _height);
								}
							}
							else {
								if (_target && _target.move) {
									_pos = _posits[0];
									_target.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
									_target.set_visible(true);

									this._setSlotCachedPos([_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom], true);
								}
							}
						}
						else {
							this._setSlotCachedPos([_left, _top, _width, _height, _right, _bottom], true);
						}

						if (_static && _static.move) {
							_pos = this._getSlotMaxPosition();
							_static.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);

							this._setSlotCachedPos([_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom], true);
						}

						break;
					}
			}
		}
	};


	_pPanelSlot._setSlotSize = function (left, top, width, height, right, bottom) {
		var _static = this._slot_static;
		var _target = this._slot_target;

		if (this._isNonEmptyStatic(_static)) {
			this._setStaticSize(_static, left, top, width, height, right, bottom);
		}

		if (this._isNonEmptyTarget(_target)) {
			if (_target.length) {
				switch (this._slot_multi) {
					case -1:
					case 2:
					case 1:
					default:
						{

							for (var i = 0, l = _target.length; i < l; i++) {
								var _tar = this._slot_target[i];
								if (_tar) {
									this._setTargetSize(_tar, left, top, width, height, right, bottom);
								}
							}

							break;
						}
				}
			}
			else {
				this._setTargetSize(_target, left, top, width, height, right, bottom);
			}
		}
		else {
			this._setSlotCachedPos([left, top, width, height, right, bottom], false);
		}
	};
	_pPanelSlot._shiftSlotSize = function (left, top, right, bottom, parentwidth, parentheight) {
		var sl = this._slot_left + (left ? left : 0);
		var st = this._slot_top + (top ? top : 0);
		var sr = null;
		var sb = null;

		if (this._slot_posits) {
			this._adjustSlotPosition(sl, st, parentwidth, parentheight, sr, sb);
		}
		else {
			this._setSlotSize(sl, st, this._slot_width, this._slot_height, sr, sb);
		}
	};
	_pPanelSlot._getSlotSize = function (max) {
		if (this._slot_static) {
			return this._getStaticSize();
		}
		if (this._slot_target) {
			return this._getTargetSize(-1, max);
		}
		return [0, 0, 0, 0, 0, 0];
	};

	_pPanelSlot._setSlotRowCol = function (rowcol) {
		var cnt = rowcol ? rowcol.length : 0;

		var row = cnt > 0 ? rowcol[0] : -1;
		var col = cnt > 1 ? rowcol[1] : -1;
		var rowspan = cnt > 2 ? rowcol[2] : 1;
		var colspan = cnt > 3 ? rowcol[3] : 1;

		this._slot_rowidx = row ? row : -1;
		this._slot_colidx = col ? col : -1;
		this._slot_rowspan = rowspan ? rowspan : 1;
		this._slot_colspan = colspan ? colspan : 1;
	};
	_pPanelSlot._setSlotRowCols = function (rowcols) {
		if (rowcols && rowcols.length) {
			this._slot_rowcols = rowcols;
			this._setSlotRowCol(rowcols[0]);
		}
		else {
			this._slot_rowcols = [];
			this._setSlotRowCol();
		}
	};

	_pPanelSlot._getSlotRowIndex = function () {
		return this._slot_rowidx;
	};
	_pPanelSlot._getSlotColIndex = function () {
		return this._slot_colidx;
	};
	_pPanelSlot._getSlotRowSpan = function () {
		return this._slot_rowspan;
	};
	_pPanelSlot._getSlotColSpan = function () {
		return this._slot_colspan;
	};
	_pPanelSlot._isIndexedRow = function () {
		return this._slot_rowidx >= 0;
	};
	_pPanelSlot._isIndexedCol = function () {
		return this._slot_colidx >= 0;
	};
	_pPanelSlot._isMergedRow = function () {
		return this._slot_rowspan > 1;
	};
	_pPanelSlot._isMergedCol = function () {
		return this._slot_colspan > 1;
	};

	_pPanelSlot._clearSlotPosSize = function () {
		if (this._slot_rowcols) {
			this._slot_rowcols = [];
		}
		if (this._slot_posits) {
			this._slot_posits = [];
		}
		if (this._slot_arrpos) {
			this._slot_arrpos = [];
		}
	};

	_pPanelSlot._hasSlotPopup = function () {
		return this._subpopup ? true : false;
	};
	_pPanelSlot._getSlotPopup = function () {
		return this._subpopup;
	};
	_pPanelSlot._setSlotPopup = function (popup) {
		return this._subpopup = popup;
	};
	_pPanelSlot._clearSlotPopup = function () {
		this._subpopup = null;
	};

	_pPanelSlot._clear = function () {
		this._clearSlotTarget();
		this._clearSlotStatic();
		this._clearSlotPopup();
	};

	delete _pPanelSlot;
}

if (!nexacro._Panel) {
	nexacro._PanelConst = 
		{
		LAYOUTSTYLE_DEFAULT : 0, 
		LAYOUTSTYLE_ROWCOL : 0, 
		LAYOUTSTYLE_POSITION : 1, 
		LAYOUTSTYLE_CUSTOM : -1, 

		SIZEINFO_REFSTYLE_NOLINK : 0, 
		SIZEINFO_REFSTYLE_ROWLINK : 1, 
		SIZEINFO_REFSTYLE_COLLINK : 2, 

		SLOT_ARRANGETYPE_DEFAULT : 0x0000, 
		SLOT_ARRANGETYPE_COLFIRST : 0x0000, 
		SLOT_ARRANGETYPE_ROWFIRST : 0x1000, 
		SLOT_ARRANGETYPE_DIR_MASK : 0xF000, 
		SLOT_ARRANGETYPE_HORZLEAD : 0x0000, 
		SLOT_ARRANGETYPE_HORZTAIL : 0x0001, 
		SLOT_ARRANGETYPE_HORZAMID : 0x0002, 
		SLOT_ARRANGETYPE_HORZINVT : 0x0004, 
		SLOT_ARRANGETYPE_HORZARND : 0x0010, 
		SLOT_ARRANGETYPE_HORZGAPD : 0x0020, 
		SLOT_ARRANGETYPE_VERTLEAD : 0x0000, 
		SLOT_ARRANGETYPE_VERTTAIL : 0x0100, 
		SLOT_ARRANGETYPE_VERTAMID : 0x0200, 
		SLOT_ARRANGETYPE_VERTINVT : 0x0400, 
		SLOT_ARRANGETYPE_VERTARND : 0x1000, 
		SLOT_ARRANGETYPE_VERTGAPD : 0x2000, 
		SLOT_ARRANGETYPE_HORZ_MASK : 0x00FF, 
		SLOT_ARRANGETYPE_VERT_MASK : 0xFF00, 
		SLOT_ARRANGETYPE_HORZ_RLOC : 0x0037, 
		SLOT_ARRANGETYPE_VERT_RLOC : 0x3700, 
		SLOT_ARRANGETYPE_BASE_MASK : 0xFFFF, 

		SLOT_VISIBLETYPE_HIDESLOT : 0, 
		SLOT_VISIBLETYPE_SHOWSLOT : 1, 

		SLOT_OVERFLOWTYPE_NONE : 0x0000, 
		SLOT_OVERFLOWTYPE_SCROLL : 0x0001, 
		SLOT_OVERFLOWTYPE_PAGING : 0x0002, 
		SLOT_OVERFLOWTYPE_POPUP : 0x0003, 
		SLOT_OVERFLOWTYPE_OVER_MASK : 0x000F, 
		SLOT_OVERFLOWTYPE_WRAPSLOT : 0x0010, 
		SLOT_OVERFLOWTYPE_WRAP_MASK : 0x0010, 
		SLOT_OVERFLOWTYPE_FULLSLOT : 0x0000, 
		SLOT_OVERFLOWTYPE_PARTSLOT : 0x0020, 
		SLOT_OVERFLOWTYPE_PART_MASK : 0x0020, 

		SLOT_AUTOSIZETYPE_DEFAULT : 0x0000, 
		SLOT_AUTOSIZETYPE_HORZAUTO : 0x0001, 
		SLOT_AUTOSIZETYPE_VERTAUTO : 0x0002, 
		SLOT_AUTOSIZETYPE_AUTOMIN : 0x0010, 
		SLOT_AUTOSIZETYPE_AUTOMAX : 0x0020, 
		SLOT_AUTOSIZETYPE_AUTOSIZE_MASK : 0x00FF, 
		SLOT_AUTOSIZETYPE_HORZFIT : 0x0100, 
		SLOT_AUTOSIZETYPE_VERTFIT : 0x0200, 
		SLOT_AUTOSIZETYPE_AUTOFIT_MASK : 0x0F00, 

		SLOT_AUTOFILLTYPE_DEFAULT : 0x0000, 
		SLOT_AUTOFILLTYPE_HORZFILL : 0x0001, 
		SLOT_AUTOFILLTYPE_VERTFILL : 0x0002, 
		SLOT_AUTOFILLTYPE_AUTOFILL_MASK : 0x000F, 

		SLOT_SELECTORTYPE_NONE : nexacro._PanelSelectConst.TYPE_NONE, 
		SLOT_SELECTORTYPE_LINE : nexacro._PanelSelectConst.TYPE_LINE, 
		SLOT_SELECTORTYPE_AREA : nexacro._PanelSelectConst.TYPE_AREA, 
		SLOT_SELECTORTYPE_MORPH_MASK : nexacro._PanelSelectConst.TYPE_MASK, 
		SLOT_SELECTORTYPE_DISPLAY : nexacro._PanelSelectConst.ACT_DISPLAY, 
		SLOT_SELECTORTYPE_RESIZER : nexacro._PanelSelectConst.ACT_RESIZER, 
		SLOT_SELECTORTYPE_POINTER : nexacro._PanelSelectConst.ACT_POINTER, 
		SLOT_SELECTORTYPE_CARRIER : nexacro._PanelSelectConst.ACT_CARRIER, 
		SLOT_SELECTORTYPE_ACTION_MASK : nexacro._PanelSelectConst.ACT_MASK, 

		SLOT_SIZEMOVETYPE_NONE : 0x0000, 
		SLOT_SIZEMOVETYPE_ROWSIZE : 0x0001, 
		SLOT_SIZEMOVETYPE_COLSIZE : 0x0002, 
		SLOT_SIZEMOVETYPE_SIZE_MASK : 0x000F, 
		SLOT_SIZEMOVETYPE_ROWMOVE : 0x0010, 
		SLOT_SIZEMOVETYPE_COLMOVE : 0x0020, 
		SLOT_SIZEMOVETYPE_MOVE_MASK : 0x00F0, 

		SLOT_SIZEMOVEEFFECT_DEFAULT : 0x0000, 
		SLOT_SIZEMOVEEFFECT_RESIZE : 0x0001, 
		SLOT_SIZEMOVEEFFECT_SIZE_MASK : 0x000F, 
		SLOT_SIZEMOVEEFFECT_PREMOVE : 0x0010, 
		SLOT_SIZEMOVEEFFECT_MOVE_MASK : 0x00F0, 

		GROUPING_SUBSTYLE_NONE : 0x0000, 
		GROUPING_SUBSTYLE_BAND_POPUP : 0x0001, 
		GROUPING_SUBSTYLE_BAND_EXPAND : 0x0002, 
		GROUPING_SUBSTYLE_BAND_COLLAPSE : 0x0004, 
		GROUPING_SUBSTYLE_BAND_ACCORDION : 0x0008, 
		GROUPING_SUBSTYLE_BAND_MASK : 0x000F, 
		GROUPING_SUBSTYLE_GROUP_POPUP : 0x0010, 
		GROUPING_SUBSTYLE_GROUP_EXPAND : 0x0020, 
		GROUPING_SUBSTYLE_GROUP_COLLAPSE : 0x0040, 
		GROUPING_SUBSTYLE_GROUP_ACCORDION : 0x0080, 
		GROUPING_SUBSTYLE_GROUP_MASK : 0x00F0, 
		GROUPING_SUBSTYLE_TITLE : 0x0100, 
		GROUPING_SUBSTYLE_TITLE_CONTROL : 0x0200, 
		GROUPING_SUBSTYLE_TITLE_MASK : 0x0F00, 
		GROUPING_SUBSTYLE_SPLIT : 0x1000, 
		GROUPING_SUBSTYLE_SPLIT_CONTROL : 0x2000, 
		GROUPING_SUBSTYLE_SPLIT_MASK : 0xF000, 

		GROUPING_SUBPLACE_NONE : 0, 
		GROUPING_SUBPLACE_CENTER : 0, 
		GROUPING_SUBPLACE_DOWN : 1, 
		GROUPING_SUBPLACE_UP : 2, 
		GROUPING_SUBPLACE_LEAD : 4, 
		GROUPING_SUBPLACE_TAIL : 8, 
		GROUPING_SUBPLACE_PREV : 16, 
		GROUPING_SUBPLACE_NEXT : 32, 
		GROUPING_SUBPLACE_INPLACE : 64, 
		GROUPING_SUBPLACE_FIT : 128, 
		GROUPING_SUBPLACE_USER : -1, 

		PANEL_MAXHEIGHT_IE : 1533000, 
		PANEL_MAXHEIGHT_GECKO : 17895000, 
		PANEL_MAXHEIGHT_DEFAULT : 33550000
	};

	nexacro._Panel = function (owner) {
		this._panel_owner = owner;

		this._panel_slots = [];


		this._panel_layout = 0;

		this._panel_colfirst = false;
		this._panel_slotbase = 0;
		this._panel_eachsize = [];

		this._ref_panel = null;
		this._ref_style = 0;

		this._panel_rowsizes = [];
		this._panel_colsizes = [];
		this._panel_rowcount = 0;
		this._panel_colcount = 0;
		this._panel_defrsize = 0;
		this._panel_defcsize = 0;
		this._panel_defritms = 0;
		this._panel_defcitms = 0;

		this._panel_fixrlead = 0;
		this._panel_fixrtail = 0;
		this._panel_fixclead = 0;
		this._panel_fixctail = 0;
		this._panel_fixslead = 0;
		this._panel_fixstail = 0;
		this._panel_fixsband = [1, 0, 1];

		this._panel_minleft = 0;
		this._panel_mintop = 0;
		this._panel_maxwidth = 0;
		this._panel_maxheight = 0;
		this._panel_overflow = 0;
		this._panel_partslot = 0;
		this._panel_overprev = 0;



		this._panel_limitheight = Infinity;
		this._panel_limitoverheight = [];

		this._sub_panel = null;
		this._sub_place = 0;

		this._panel_defstats = 0;
		this._panel_subgroup = 0;
		this._panel_subtitle = 0;
		this._panel_subsplit = 0;
		this._panel_titlesize = 0;
		this._panel_splitsize = 0;
		this._panel_titlecnt = 0;
		this._panel_splitcnt = 0;

		if (owner && owner._getPanelStartIndex) {
			this._panel_idxstart = owner._getPanelStartIndex();
			this._panel_lvlstart = owner._getPanelStartLevel();
			this._panel_lvlindent = owner._getPanelLevelIndent();
		}
		else {
			this._panel_idxstart = 0;
			this._panel_lvlstart = 0;
			this._panel_lvlindent = 0;
		}

		this._panel_autosize = 0;
		this._panel_autofill = 0;

		this._panel_selectortype = 0;
		this._panel_selector = {
		};

		this._panel_sizetype = 0;
		this._panel_movetype = 0;


		this._target_count = [0, 1, 0];

		this._expaned_slot = [];
	};

	var _pPanel = nexacro._createPrototype(Object, nexacro._Panel);
	nexacro._Panel.prototype = _pPanel;
	_pPanel._type_name = "_Panel";



	_pPanel._isColFirst = function () {
		return this._panel_colfirst;
	};
	_pPanel._isRowFirst = function () {
		return !this._panel_colfirst;
	};
	_pPanel._isShowSlot = function () {
		return this._panel_showslot;
	};
	_pPanel._isPartSlot = function () {
		return this._panel_partslot;
	};

	_pPanel._setLayoutType = function (type) {
		this._panel_layout = type;
	};
	_pPanel._setSlotArrangeType = function (type) {
		this._panel_colfirst = (type & nexacro._PanelConst.SLOT_ARRANGETYPE_DIR_MASK) == nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST;
		this._panel_slotbase = (type & nexacro._PanelConst.SLOT_ARRANGETYPE_BASE_MASK);
	};
	_pPanel._setSlotVisibleType = function (type) {
		this._panel_showslot = type == nexacro._PanelConst.SLOT_VISIBLETYPE_SHOWSLOT;
	};
	_pPanel._setSlotOverFlowType = function (type) {
		this._panel_overflow = (type & nexacro._PanelConst.SLOT_OVERFLOWTYPE_OVER_MASK);
		this._panel_partslot = (type & nexacro._PanelConst.SLOT_OVERFLOWTYPE_PART_MASK);
	};
	_pPanel._setSlotAutoSizeType = function (type) {
		this._panel_autosize = (type & nexacro._PanelConst.SLOT_AUTOSIZETYPE_AUTOSIZE_MASK);
		this._panel_autosize |= (type & nexacro._PanelConst.SLOT_AUTOSIZETYPE_AUTOFIT_MASK);
	};
	_pPanel._setSlotAutoFillType = function (type) {
	};
	_pPanel._setSlotSelectorType = function (type) {
		this._panel_selectortype = type;
	};
	_pPanel._getSlotSelectorType = function (mask) {
		return mask ? this._panel_selectortype & mask : this._panel_selectortype;
	};
	_pPanel._setSlotSizeMoveType = function (type, effect) {
		this._panel_sizetype = (type & nexacro._PanelConst.SLOT_SIZEMOVETYPE_SIZE_MASK);
		this._panel_movetype = (type & nexacro._PanelConst.SLOT_SIZEMOVETYPE_MOVE_MASK);
	};
	_pPanel._setSlotDefaultStatus = function (status) {
		this._panel_substats = status;
	};
	_pPanel._setPanelFixedRowCount = function (lead, tail) {
		this._panel_fixrlead = lead;
		this._panel_fixrtail = tail;
	};
	_pPanel._setPanelFixedColCount = function (lead, tail) {
		this._panel_fixclead = lead;
		this._panel_fixctail = tail;
	};
	_pPanel._setPanelFixedSlotCount = function (lead, tail) {
		this._setPanelFixedSlotCountLead(lead);
		this._setPanelFixedSlotCountTail(tail);
	};
	_pPanel._setPanelFixedSlotCountLead = function (lead) {
		return this._panel_fixslead = Math.min(lead, lead *  this._panel_fixsband[0], this._panel_fixsband[1] ? lead : this._panel_fixsband[0]);
	};
	_pPanel._setPanelFixedSlotCountTail = function (tail) {
		return this._panel_fixstail = Math.min(tail, tail *  this._panel_fixsband[2], this._panel_fixsband[1] ? tail : this._panel_fixsband[2]);
	};
	_pPanel._getPanelFixedSlotCountLead = function () {
		return this._panel_fixslead;
	};
	_pPanel._getPanelFixedSlotCountTail = function () {
		return this._panel_fixstail;
	};
	_pPanel._setSlotBandFixType = function (lead, body, tail) {
		this._panel_fixsband = body ? lead || tail ? [lead, body, tail] : [true, body, true] : [lead, body, tail];
	};
	_pPanel._getSlotBandFixType = function (index) {
		if (index >= 0) {
			return this._panel_fixsband[1] == true;
		}
		if (index == -2) {
			return this._panel_fixsband[2] == true;
		}
		if (index == -1) {
			return this._panel_fixsband[0] == true;
		}
	};
	_pPanel._setSlotTargetCount = function (lead, body, tail) {
		this._target_count = [lead, body, tail];
	};
	_pPanel._getSlotTargetCount = function (index) {
		if (index >= 0) {
			return this._target_count[1];
		}
		if (index == -2) {
			return this._target_count[2];
		}
		if (index == -1) {
			return this._target_count[0];
		}
	};
	_pPanel._getPanelOwner = function () {
		return this._panel_owner;
	};
	_pPanel._clearPanelOwner = function () {
		this._panel_owner = null;
	};

	_pPanel._getPanelSlots = function () {
		return this._panel_slots;
	};
	_pPanel._getPanelSlotIndex = function (idx) {
		if (idx === undefined || idx === null) {
			return -1;
		}
		if (idx >= 0 && this._target_count[1]) {
			return idx + (this._target_count[0] ? 1 : 0);
		}
		if (idx == -1 && this._target_count[0]) {
			return 0;
		}
		if (idx == -2 && this._target_count[2]) {
			return this._panel_slots.length - 1;
		}
	};
	_pPanel._getPanelSlot = function (index, make) {
		var idx = this._getPanelSlotIndex(index);
		if (idx < 0) {
			return null;
		}

		if (make) {
			if (idx >= this._panel_slots.length) {
				this._panel_slots.length = idx + 1;
			}

			var slot = this._panel_slots[idx];
			if (slot) {
				return slot;
			}
			else {
				return this._panel_slots[idx] = new nexacro._PanelSlot(null, null);
			}
		}
		else {
			if (idx >= 0 && idx < this._panel_slots.length) {
				return this._panel_slots[idx];
			}
			else {
				return null;
			}
		}
	};
	_pPanel._setPanelSlot = function (index, slot) {
		var idx = this._getPanelSlotIndex(index);
		if (idx < 0) {
			return null;
		}

		if (idx >= this._panel_slots.length) {
			this._panel_slots.length = idx + 1;
		}

		var old = this._panel_slots[idx];
		if (old != slot) {
			delete old;
		}

		this._panel_slots[idx] = slot;
	};
	_pPanel._addPanelSlot = function (slot) {
		this._panel_slots.push(slot);
	};
	_pPanel._clearPanelSlot = function (count) {
		for (var i = this._panel_slots.length - 1; i >= 0; i--) {
			if (this._panel_slots[i]) {
				this._panel_slots[i]._clear();
				delete this._panel_slots[i];
			}
		}

		if (count) {
			this._panel_slots.length = count;
		}
		else {
			this._panel_slots = [];
		}
	};

	_pPanel._initPanelEachSize = function (count) {
		this._panel_eachsize.length = count ? count : 0;
	};
	_pPanel._addPanelEachSize = function (slots, count, width, height) {
		var size = this._panel_eachsize;
		var curr = size.length;

		size.length += 4;

		size[curr++] = slots;
		size[curr++] = count;
		size[curr++] = width > 0 ? width : 0;
		size[curr++] = height > 0 ? height : 0;

		return curr / 4 - 1;
	};
	_pPanel._setPanelEachSize = function (index, slots, count, width, height) {
		var size = this._panel_eachsize;
		var curr = index *  4;

		if (curr < (size.length - 4)) {
			size[curr++] = slots;
			size[curr++] = count;
			size[curr++] = width;
			size[curr] = height;
		}
	};
	_pPanel._getPanelEachSize = function (index) {
		var curr = index *  4;

		return [this._panel_eachsize[curr], this._panel_eachsize[curr + 1], this._panel_eachsize[curr + 2], this._panel_eachsize[curr + 3]];
	};
	_pPanel._getPanelEachCount = function () {
		return this._panel_eachsize.length / 4;
	};
	_pPanel._getPanelEachSizeSlots = function (index) {
		return index >= 0 ? this._panel_eachsize[index *  4] : undefined;
	};
	_pPanel._getPanelEachSizeCount = function (index) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 1] : undefined;
	};
	_pPanel._getPanelEachSizeWidth = function (index) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 2] : undefined;
	};
	_pPanel._getPanelEachSizeHeight = function (index) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 3] : undefined;
	};
	_pPanel._setPanelEachSizeSlots = function (index, slots) {
		return index >= 0 ? this._panel_eachsize[index *  4] = slots : undefined;
	};
	_pPanel._setPanelEachSizeCount = function (index, count) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 1] = count : undefined;
	};
	_pPanel._setPanelEachSizeWidth = function (index, width) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 2] = width : undefined;
	};
	_pPanel._setPanelEachSizeHeight = function (index, height) {
		return index >= 0 ? this._panel_eachsize[index *  4 + 3] = height : undefined;
	};
	_pPanel._accPanelEachSizeSlots = function (index, acc) {
		return (index >= 0 && this._panel_eachsize[index *  4] !== undefined) ? this._panel_eachsize[index *  4] += acc : undefined;
	};
	_pPanel._accPanelEachSizeCount = function (index, acc) {
		return (index >= 0 && this._panel_eachsize[index *  4 + 1] !== undefined) ? this._panel_eachsize[index *  4 + 1] += acc : undefined;
	};
	_pPanel._accPanelEachSizeWidth = function (index, acc) {
		return (index >= 0 && this._panel_eachsize[index *  4 + 2] !== undefined) ? this._panel_eachsize[index *  4 + 2] += acc : undefined;
	};
	_pPanel._accPanelEachSizeHeight = function (index, acc) {
		return (index >= 0 && this._panel_eachsize[index *  4 + 3] !== undefined) ? this._panel_eachsize[index *  4 + 3] += acc : undefined;
	};
	_pPanel._clearPanelEachSize = function () {
		this._panel_eachsize = [];
	};

	_pPanel._relocPanelSlotSize = function (hr, vr, hi, vi, hs, vs, cw, ch) {
		var slot;
		var slots = this._panel_slots;
		var sn = slots.length;
		var en = this._getPanelEachCount();

		if (sn <= 0 || en <= 0) {
			return;
		}

		var i, n, s;
		var sl = 0, dl = 0, fl = 0, ml = 0;
		var st = 0, dt = 0, ft = 0, mt = 0;

		var cn;
		var nn;
		var ew, eh;
		var sw, sh;

		if (this._isColFirst()) {
			if (vs > 0) {
				switch (vr) {
					case 0x0200:
						{

							st = vs / 2;
							dt = 0;
							mt = st;
							break;
						}
					case 0x0400:
						{

							st = vs;
							dt = 0;
							mt = st;
							break;
						}
					case 0x1000:
						{

							st = vs / (en + 1);
							dt = st;
							mt = vs;
							break;
						}
					case 0x2000:
						{

							st = 0;
							dt = en > 2 ? vs / (en - 1) : 0;
							mt = vs;
							break;
						}
				}

				if (vi) {
					st = -st;
					dt = -dt;
					mt = 0;
				}
			}
			if (hs > 0) {
				if (!hi) {
					ml = hs;
				}
			}

			for (i = 0, s = 0, ft = st; i < en; i++, ft += dt) {
				cn = this._getPanelEachSizeSlots(i) || 0;
				nn = this._getPanelEachSizeCount(i) || 0;
				ew = this._getPanelEachSizeWidth(i) || 0;
				sw = cw - ew;

				if (sw > 0 && nn > 0) {
					switch (hr) {
						case 0x0002:
							{

								sl = sw / 2;
								dl = 0;
								break;
							}
						case 0x0004:
							{

								sl = sw;
								dl = 0;
								break;
							}
						case 0x0010:
							{

								ew += (ew / nn) *  (cn - nn);
								sw = cw - ew;
								nn = cn;
							}
						case 0x0012:
							{

								sl = sw / (nn + 1);
								dl = sl;
								break;
							}
						case 0x0020:
							{

								ew += (ew / nn) *  (cn - nn);
								sw = cw - ew;
								sl = 0;
								dl = nn > 1 ? sw / (cn - 1) : 0;
								break;
							}
						case 0x0022:
							{

								sl = 0;
								dl = nn > 2 ? sw / (nn - 1) : 0;
								nn--;
								break;
							}
					}
					if (hi) {
						sl = -sl;
						dl = -dl;
						ml = 0;
					}
				}
				else {
					sl = 0;
					dl = 0;
				}

				if (vr == 0x2000 && i == en - 1) {
					slot = slots[s];
					if (slot && slot._isVisible()) {
						ft = vi ? -slot._getSlotCalcTop() : ch - slot._getSlotCalcTop() - slot._getSlotCalcHeight();
					}
				}

				for (n = 0, fl = sl; n < nn && s < sn; s++, n++) {
					slot = slots[s];
					if (slot && slot._isVisible()) {
						slot._shiftSlotSize(fl, ft, null, null, cw, ch);

						fl += dl;
					}
				}
			}
		}
		else {
			if (hs > 0) {
				switch (hr) {
					case 0x0002:
						{

							sl = hs / 2;
							dl = 0;
							ml = sl;
							break;
						}
					case 0x0004:
						{

							sl = hs;
							dl = 0;
							ml = sl;
							break;
						}
					case 0x0008:
						{

							sl = hs / (en + 1);
							dl = sl;
							ml = hs;
							break;
						}
					case 0x000A:
						{

							sl = 0;
							dl = en > 2 ? hs / (en - 1) : 0;
							ml = hs;
							break;
						}
				}

				if (hi) {
					sl = -sl;
					dl = -dl;
					ml = 0;
				}
			}
			if (vs > 0) {
				if (!vi) {
					mt = vs;
				}
			}

			for (i = 0, s = 0, fl = sl; i < en; i++, fl += dl) {
				cn = this._getPanelEachSizeSlots(i);
				nn = this._getPanelEachSizeCount(i);
				eh = this._getPanelEachSizeHeight(i);
				sh = ch - eh;

				if (sh > 0 && nn > 0) {
					switch (vr) {
						case 0x0200:
							{

								st = sh / 2;
								dt = 0;
								break;
							}
						case 0x0400:
							{

								st = sh;
								dt = 0;
								break;
							}
						case 0x1000:
							{

								eh += (eh / nn) *  (cn - nn);
								sh = ch - eh;
								nn = cn;
							}
						case 0x1200:
							{

								st = sh / (nn + 1);
								dt = st;
								break;
							}
						case 0x2000:
							{

								eh += (eh / nn) *  (cn - nn);
								sh = ch - eh;
								nn = cn;
							}
						case 0x2200:
							{

								st = 0;
								dt = nn > 2 ? sh / (nn - 1) : 0;
								nn--;
								break;
							}
					}

					if (vi) {
						st = -st;
						dt = -dt;
						mt = 0;
					}
				}
				else {
					st = 0;
					dt = 0;
				}

				if (hr == 0x0020 && i == en - 1) {
					slot = slots[s];
					if (slot && slot._isVisible()) {
						fl = hi ? -slot._getSlotCalcLeft() : cw - slot._getSlotCalcLeft() - slot._getSlotCalcWidth();
					}
				}

				for (n = 0, ft = st; n < nn && s < sn; s++, n++) {
					slot = slots[s];
					if (slot && slot._isVisible()) {
						slot._shiftSlotSize(fl, ft, null, null, cw, ch);

						ft += dt;
					}
				}

				if (vr == 0x2000 && s < sn) {
					slot = slots[s++];
					if (slot && slot._isVisible()) {
						var lt = (nn) ? (vi ? -slot._getSlotCalcTop() : ch - slot._getSlotCalcTop() - slot._getSlotCalcHeight()) : st;

						slot._shiftSlotSize(fl, lt, null, null, cw, ch);
					}
				}
			}
		}

		if (ml || mt) {
			this._shiftPanelMaxSize(ml, mt);
		}
	};

	_pPanel._recalcPanelSlotPosition = function (clientwidth, clientheight, item, partitemover) {
		if (clientwidth <= 0 || clientheight <= 0) {
			return;
		}

		var sl = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZTAIL) ? clientwidth : 0;
		var st = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERTTAIL) ? clientheight : 0;
		var hr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZ_RLOC);
		var vr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERT_RLOC);




		var i;

		var n;

		var slot;

		if (item) {
			this._initPanelMinPos(clientwidth, clientheight);
			this._initPanelMaxSize();
			this._initPanelLimitSize();
			this._initPanelEachSize();

			var pow = this._getPanelPrevOverWidth();
			var now = this._getPanelNextOverWidth();
			var poh = this._getPanelPrevOverHeight();
			var noh = this._getPanelNextOverHeight();

			var lh = this._getPanelLimitHeight();
			var th = 0;

			var l = sl ? clientwidth : 0;
			var t = st ? clientheight : 0;
			var w = 0, W = 0;
			var h = 0, H = 0;

			var o = true;
			var d = 0;

			var k = hr || vr;
			var a = !k;

			var cn = 0;
			var rn = 0;

			var ix = 0;

			var hs;
			var vs;

			if (this._isColFirst()) {
				this._setPanelMaxSize(pow, poh);

				for (i = 0, n = this._panel_slots.length; i < n; i++) {
					slot = this._panel_slots[i];
					if (slot && slot._isVisible()) {
						slot._calcSlotPosition(l, t, null, null, clientwidth, clientheight);

						{

							if (sl) {
								w = slot._getSlotCalcWidth() || 0;
								l -= w;

								if (l < 0) {
									o = true;
								}
							}
							else {
								l += w;
								w = slot._getSlotCalcWidth() || 0;

								if ((l + w) > clientwidth) {
									o = true;
								}
							}

							if (k) {
								cn++;
							}
						}

						if (o) {
							if (st) {
								h = slot._getSlotCalcHeight() || 0;
								t -= H;
							}
							else {
								t += H;
								h = slot._getSlotCalcHeight() || 0;
							}

							if (k && i) {
								this._accPanelEachSizeHeight(ix, d);
								ix = this._addPanelEachSize((cn - 1), (cn - 1), (sl ? clientwidth - (l + w) : l), h);
								cn = 1;
								rn++;
							}

							th += h;

							l = sl ? (sl - w) : sl;
							o = false;
							H = h;
							d = 0;
						}
						else {
							h = slot._getSlotCalcHeight() || 0;
							H = Math.max(h, H);
							d = Math.max(d, H - h);
						}

						if (a) {
							slot._adjustSlotPosition(l, t, clientwidth, clientheight, null, null);
						}
						else {
							slot._setSlotCalc(l, t, w, h, null, null);
						}

						this._setPanelMinPos(l, t);
						this._setPanelMaxSize(l + w, t + h);

						if (th + h > lh) {
							this._addPanelLimitOverHeight(th);
							th = 0;
						}
					}
				}

				this._setPanelMaxSize(now, noh + this._getPanelMaxHeight());
				this._addPanelLimitOverHeight(th);

				if (k) {
					if (cn) {
						this._addPanelEachSize(w ? Math.floor(clientwidth / w) : 1, cn, sl ? (clientwidth - l) : (l + w), h);
					}

					vs = vr ? (st ? (t < 0 ? 0 : t) : (t > (clientheight - h) ? 0 : clientheight - (t + h))) : 0;
					hs = hr ? (sl ? (this._getPanelMinLeft()) : (clientwidth - this._getPanelMaxWidth())) : 0;

					this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
				}
			}
			else {
				this._setPanelMaxSize(pow, poh);

				for (i = 0, n = this._panel_slots.length; i < n; i++) {
					slot = this._panel_slots[i];
					if (slot && slot._isVisible()) {
						slot._calcSlotPosition(l, t, null, null, clientwidth, clientheight);

						{

							if (st) {
								h = slot._getSlotCalcHeight() || 0;
								t -= h;

								if (t < 0) {
									o = true;
								}
							}
							else {
								t += h;
								h = slot._getSlotCalcHeight() || 0;

								if ((t + h) > clientheight) {
									o = true;
								}
							}

							if (k) {
								rn++;
							}
						}

						if (o) {
							if (sl) {
								w = slot._getSlotCalcWidth() || 0;
								l -= W;
							}
							else {
								l += W;
								w = slot._getSlotCalcWidth() || 0;
							}

							if (k && i) {
								this._accPanelEachSizeWidth(ix, d);
								ix = this._addPanelEachSize((rn - 1), (rn - 1), w, st ? (clientheight - (t + h)) : t);
								rn = 1;
								cn++;
							}

							t = st ? (st - h) : st;
							o = false;
							W = w;
							d = 0;
						}
						else {
							w = slot._getSlotCalcWidth() || 0;
							W = Math.max(w, W);
							d = Math.max(d, W - w);
						}

						if (a) {
							slot._adjustSlotPosition(l, t, clientwidth, clientheight, null, null);
						}
						else {
							slot._setSlotCalc(l, t, w, h, null, null);
						}

						this._setPanelMinPos(l, t);
						this._setPanelMaxSize(l + w, t + h);
					}
				}

				this._setPanelMaxSize(now + this._getPanelMaxWidth(), noh);

				if (k) {
					if (rn) {
						this._addPanelEachSize(h ? Math.floor(clientheight / h) : 1, rn, w, st ? (clientheight - t) : (t + h));
					}

					hs = hr ? (sl ? (l < 0 ? 0 : l) : (l > (clientwidth - w) ? 0 : clientwidth - (l + w))) : 0;
					vs = vr ? (st ? (this._getPanelMinTop()) : (clientheight - this._getPanelMaxHeight())) : 0;

					this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
				}
			}
		}
		else {
			for (i = 0, n = this._panel_slots.length; i < n; i++) {
				slot = this._panel_slots[i];
				if (slot && slot._isVisible()) {
					slot._adjustSlotPosition(0, 0, clientwidth, clientheight, null, null);

					this._setPanelMinPos(0, 0);
					this._setPanelMaxSize(slot._getSlotCalcWidth(), slot._getSlotCalcHeight());
				}
			}
		}
	};

	_pPanel._recalcPanelSlotRowCol = function (clientwidth, clientheight, repeat) {
		if (clientwidth <= 0 || clientheight <= 0 || !this._panel_slots.length) {
			return;
		}

		var rpanel = this._getRowSizeInfoPanel();
		var cpanel = this._getColSizeInfoPanel();

		var rowcnt = rpanel._getPanelRowSizeCount();
		var colcnt = cpanel._getPanelColSizeCount();

		if (rowcnt <= 0) {
			rowcnt = 1;
			rpanel._resetPanelRowSize(rowcnt);
			rpanel._setPanelDefaultRowSize(clientheight);
		}
		if (colcnt <= 0) {
			colcnt = 1;
			cpanel._resetPanelColSize(colcnt);
			cpanel._setPanelDefaultColSize(clientwidth);
		}

		var sl = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZTAIL) ? clientwidth : 0;
		var st = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERTTAIL) ? clientheight : 0;
		var hr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZ_RLOC);
		var vr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERT_RLOC);


		var hf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
		var vf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_VERTFIT);

		if (hf) {
			this._setOwnerLayoutAutoFitFlag(cpanel._setPanelColSizeWidthFit(clientwidth));
		}
		if (vf) {
			this._setOwnerLayoutAutoFitFlag(rpanel._setPanelRowSizeHeightFit(clientheight));
		}

		this._initPanelMinPos(clientwidth, clientheight);
		this._initPanelMaxSize();
		this._initPanelEachSize();

		var i, s;
		var slot;

		var pow = repeat ? this._getPanelPrevOverWidth() : 0;
		var now = repeat ? this._getPanelNextOverWidth() : 0;
		var poh = repeat ? this._getPanelPrevOverHeight() : 0;
		var noh = repeat ? this._getPanelNextOverHeight() : 0;



		var l = sl ? clientwidth : 0;
		var t = st ? clientheight : 0;
		var w = 0;
		var h = 0;
		var c = -1;
		var r = -1;
		var o = true;

		var k = hr || vr;
		var a = !k;
		var cn = 0, rn = 0;

		var vs;
		var hs;

		if (this._isColFirst()) {
			this._setPanelMaxSize(pow, poh);

			for (i = 0, s = this._panel_slots.length; i < s; i++) {
				slot = this._panel_slots[i];
				if (slot && slot._isVisible()) {
					{

						c = slot._isIndexedCol() ? slot._getSlotColIndex() : i;

						if (sl) {
							w = cpanel._getPanelColSize(c, slot._getSlotColSpan(), slot._getSlotGroup());
							l -= w;

							if (l < 0) {
								o = true;
							}
						}
						else {
							l += w;
							w = cpanel._getPanelColSize(c, slot._getSlotColSpan(), slot._getSlotGroup());

							if ((l + w) > clientwidth) {
								o = true;
							}
						}

						if (k) {
							cn++;
						}
					}

					if (o) {
						if (slot._isIndexedRow()) {
							r = slot._getSlotRowIndex();
						}
						else {
							++r;
						}

						if (st) {
							h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan());
							t -= h;
						}
						else {
							t += h;
							h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan());
						}

						if (k && i) {
							this._addPanelEachSize((cn - 1), (cn - 1), (sl ? clientwidth - (l + w) : l), h);
							cn = 1;
							rn++;
						}

						l = sl ? (sl - w) : sl;
						o = false;
					}

					if (a) {
						slot._setSlotSize(l, t, w, h, null, null);
					}
					else {
						slot._setSlotCalc(l, t, w, h, null, null);
					}

					this._setPanelMinPos(l, t);
					this._setPanelMaxSize(l + w, t + h);
				}
			}

			this._setPanelMaxSize(now, noh + this._getPanelMaxHeight());



			if (k) {
				if (cn) {
					this._addPanelEachSize(w ? Math.floor(clientwidth / w) : 1, cn, sl ? (clientwidth - l) : (l + w), h);
				}

				vs = vr ? (st ? (t < 0 ? 0 : t) : (t > (clientheight - h) ? 0 : clientheight - (t + h))) : 0;
				hs = hr ? (sl ? (this._getPanelMinLeft()) : (clientwidth - this._getPanelMaxWidth())) : 0;

				this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
			}
		}
		else {
			this._setPanelMaxSize(pow, poh);

			for (i = 0, s = this._panel_slots.length; i < s; i++) {
				slot = this._panel_slots[i];
				if (slot && slot._isVisible()) {
					{

						r = slot._isIndexedRow() ? slot._getSlotRowIndex() : i;

						if (st) {
							h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan(), slot._getSlotGroup());
							t -= h;

							if (t < 0) {
								o = true;
							}
						}
						else {
							t += h;
							h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan(), slot._getSlotGroup());

							if ((t + h) > clientheight) {
								o = true;
							}
						}

						if (k) {
							rn++;
						}
					}

					if (o) {
						if (slot._isIndexedCol()) {
							c = slot._getSlotColIndex();
						}
						else {
							++c;
						}

						if (sl) {
							w = cpanel._getPanelColSize(c, slot._getSlotColSpan());
							l -= w;
						}
						else {
							l += w;
							w = cpanel._getPanelColSize(c, slot._getSlotColSpan());
						}

						if (k && i) {
							this._addPanelEachSize((rn - 1), (rn - 1), w, st ? (clientheight - (t + h)) : t);
							rn = 1;
							cn++;
						}

						t = st ? (st - h) : st;
						o = false;
					}

					if (a) {
						slot._setSlotSize(l, t, w, h, null, null);
					}
					else {
						slot._setSlotCalc(l, t, w, h, null, null);
					}

					this._setPanelMinPos(l, t);
					this._setPanelMaxSize(l + w, t + h);
				}
			}

			this._setPanelMaxSize(now + this._getPanelMaxWidth(), noh);



			if (k) {
				if (rn) {
					this._addPanelEachSize(h ? Math.floor(clientheight / h) : 1, rn, w, st ? (clientheight - t) : (t + h));
				}

				hs = hr ? (sl ? (l < 0 ? 0 : l) : (l > (clientwidth - w) ? 0 : clientwidth - (l + w))) : 0;
				vs = vr ? (st ? (this._getPanelMinTop()) : (clientheight - this._getPanelMaxHeight())) : 0;

				this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
			}
		}
	};

	_pPanel._getPanelRowSizeCount = function () {
		return this._panel_rowcount < 0 ? this._panel_rowcount *  (-1) : this._panel_rowcount;
	};
	_pPanel._getPanelColSizeCount = function () {
		return this._panel_colcount < 0 ? this._panel_colcount *  (-1) : this._panel_colcount;
	};

	_pPanel._resetPanelRowSize = function (count, size, defsize, leadfix, tailfix) {
		this._panel_rowsizes = [];
		this._panel_rowcount = count;

		var cnt = count < 0 ? count *  (-1) : count;

		this._panel_fixrlead = nexacro._isNull(leadfix) ? 0 : leadfix;
		this._panel_fixrtail = nexacro._isNull(tailfix) ? 0 : tailfix;
		this._panel_defrsize = nexacro._isNull(defsize) ? 0 : defsize;
		this._panel_defritms = nexacro._isNull(size) ? cnt : 0;

		for (var i = 0; i < cnt; i++) {
			this._panel_rowsizes.push(size);
		}
	};
	_pPanel._resetPanelColSize = function (count, size, defsize, leadfix, tailfix) {
		this._panel_colsizes = [];
		this._panel_colcount = count;

		var cnt = count < 0 ? count *  (-1) : count;

		this._panel_fixclead = nexacro._isNull(leadfix) ? 0 : leadfix;
		this._panel_fixctail = nexacro._isNull(tailfix) ? 0 : tailfix;
		this._panel_defcsize = nexacro._isNull(defsize) ? 0 : defsize;
		this._panel_defcitms = nexacro._isNull(size) ? cnt : 0;

		for (var i = 0; i < cnt; i++) {
			this._panel_colsizes.push(size);
		}
	};

	_pPanel._resetPanelRowSizeArray = function (count, sizearray, defsize, leadfix, tailfix) {
		if (sizearray) {
			this._panel_rowsizes = [];
			this._panel_rowcount = count;

			var cnt = count < 0 ? count *  (-1) : count;
			var lmt = sizearray.length;

			this._panel_fixrlead = nexacro._isNull(leadfix) ? 0 : leadfix;
			this._panel_fixrtail = nexacro._isNull(tailfix) ? 0 : tailfix;
			this._panel_defrsize = nexacro._isNull(defsize) ? 0 : defsize;
			this._panel_defritms = 0;

			for (var i = 0; i < cnt; i++) {
				var size = sizearray[i % lmt];

				if (nexacro._isNull(size)) {
					this._panel_defritms++;
				}

				this._panel_rowsizes.push(size);
			}
		}
	};
	_pPanel._resetPanelColSizeArray = function (count, sizearray, defsize, leadfix, tailfix) {
		if (sizearray) {
			this._panel_colsizes = [];
			this._panel_colcount = count;

			var cnt = count < 0 ? count *  (-1) : count;
			var lmt = sizearray.length;

			this._panel_fixclead = nexacro._isNull(leadfix) ? 0 : leadfix;
			this._panel_fixctail = nexacro._isNull(tailfix) ? 0 : tailfix;
			this._panel_defcsize = nexacro._isNull(defsize) ? 0 : defsize;
			this._panel_defcitms = 0;

			for (var i = 0; i < cnt; i++) {
				var size = sizearray[i % lmt];

				if (nexacro._isNull(size)) {
					this._panel_defcitms++;
				}

				this._panel_colsizes.push(size);
			}
		}
	};

	_pPanel._addPanelRowSize = function (size) {
		if (nexacro._isNull(size)) {
			this._panel_defritms++;
		}

		this._panel_rowsizes.push(size);

		if (this._panel_rowcount < 0) {
			this._panel_rowcount--;
		}
		else {
			this._panel_rowcount++;
		}
	};
	_pPanel._addPanelColSize = function (size) {
		if (nexacro._isNull(size)) {
			this._panel_defcitms++;
		}

		this._panel_colsizes.push(size);

		if (this._panel_colcount < 0) {
			this._panel_colcount--;
		}
		else {
			this._panel_colcount++;
		}
	};

	_pPanel._setPanelRowSize = function (index, size) {
		if (nexacro._isNull(size)) {
			this._panel_defritms++;
		}

		if (index >= 0 && index < this._panel_rowsizes.length) {
			this._panel_rowsizes[index] = size;
		}
	};
	_pPanel._setPanelColSize = function (index, size) {
		if (nexacro._isNull(size)) {
			this._panel_defcitms++;
		}

		if (index >= 0 && index < this._panel_colsizes.length) {
			this._panel_colsizes[index] = size;
		}
	};

	_pPanel._getPanelRowSize = function (_index, count, group) {
		var bound = this._panel_rowsizes.length;
		var ret = 0;
		var size;
		var start = 0;
		var index = _index;

		if (group) {
			if (group > 0 && this._panel_subtitle) {
				return this._panel_titlesize;
			}
			if (group < 0 && this._panel_subsplit) {
				return this._panel_splitsize;
			}
		}

		if (index < this._panel_fixrlead) {
			bound = this._panel_fixrlead;
		}
		else {
			bound -= this._panel_fixrlead;
			start = this._panel_fixrlead;
			index -= start;
		}


		if (bound == 0) {
			return 0;
		}

		if (bound < 0) {
			bound = this._panel_rowsizes.length - this._panel_fixrtail;
		}

		if (bound == 1) {
			size = this._panel_rowsizes[start];

			return nexacro._isNull(size) ? this._panel_defrsize *  count : size *  count;
		}

		for (var i = index, l = index + count; i < l; i++) {
			size = this._panel_rowsizes[(i % bound) + start];

			ret += nexacro._isNull(size) ? this._panel_defrsize : size;
		}

		return ret;
	};
	_pPanel._getPanelColSize = function (_index, count, group) {
		var bound = this._panel_colsizes.length;
		var ret = 0;
		var size;
		var start = 0;
		var index = _index;

		if (group) {
			if (group > 0 && this._panel_subtitle) {
				return this._panel_titlesize;
			}
			if (group < 0 && this._panel_subsplit) {
				return this._panel_splitsize;
			}
		}

		if (index < this._panel_fixclead) {
			bound = this._panel_fixclead;
		}
		else {
			bound -= this._panel_fixclead;
			start = this._panel_fixclead;
			index -= start;
		}


		if (bound <= 0) {
			return 0;
		}

		if (bound == 1) {
			size = this._panel_colsizes[start];

			return nexacro._isNull(size) ? this._panel_defcsize *  count : size *  count;
		}

		for (var i = index, l = index + count; i < l; i++) {
			size = this._panel_colsizes[(i % bound) + start];

			ret += nexacro._isNull(size) ? this._panel_defcsize : size;
		}

		return ret;
	};
	_pPanel._getPanelAllRowSize = function (defsize) {
		var bound = this._panel_rowsizes.length;
		var count = this._panel_rowcount;
		var ret = 0;
		var size;

		count = count < 0 ? count *  (-1) : count;

		if (bound <= 0) {
			return 0;
		}

		if (bound == 1) {
			size = this._panel_rowsizes[0];

			return nexacro._isNull(size) ? defsize *  count : size *  count;
		}

		for (var i = 0, l = count; i < l; i++) {
			size = this._panel_rowsizes[i % bound];

			ret += nexacro._isNull(size) ? defsize : size;
		}

		return ret;
	};
	_pPanel._getPanelAllColSize = function (defsize) {
		var bound = this._panel_colsizes.length;
		var count = this._panel_colcount;
		var ret = 0;
		var size;

		count = count < 0 ? count *  (-1) : count;

		if (bound <= 0) {
			return 0;
		}

		if (bound == 1) {
			size = this._panel_colsizes[0];

			return nexacro._isNull(size) ? defsize *  count : size *  count;
		}

		for (var i = 0, l = count; i < l; i++) {
			size = this._panel_colsizes[i % bound];

			ret += nexacro._isNull(size) ? defsize : size;
		}

		return ret;
	};

	_pPanel._setPanelDefaultRowSize = function (size) {
		this._panel_defrsize = nexacro._isNull(size) ? 0 : size;
	};
	_pPanel._setPanelDefaultColSize = function (size) {
		this._panel_defcsize = nexacro._isNull(size) ? 0 : size;
	};
	_pPanel._getPanelDefaultRowSize = function () {
		return this._panel_defrsize;
	};
	_pPanel._getPanelDefaultColSize = function () {
		return this._panel_defcsize;
	};
	_pPanel._getPanelDefaultRowCount = function () {
		return this._panel_defritms;
	};
	_pPanel._getPanelDefaultColCount = function () {
		return this._panel_defcitms;
	};

	_pPanel._setPanelRowSizeHeightFit = function (height) {
		var defsize = height - this._getPanelAllRowSize(0);
		var defitms = this._getPanelDefaultRowCount();

		if (defsize > 0 && defitms > 0) {
			this._setPanelDefaultRowSize(defsize / defitms);

			return true;
		}
		else {
			return false;
		}
	};
	_pPanel._setPanelColSizeWidthFit = function (width) {
		var defsize = width - this._getPanelAllColSize(0);
		var defitms = this._getPanelDefaultColCount();

		if (defsize > 0 && defitms > 0) {
			this._setPanelDefaultColSize(defsize / defitms);

			return true;
		}
		else {
			return false;
		}
	};

	_pPanel._getPanelMinLeft = function () {
		return this._panel_minleft;
	};
	_pPanel._getPanelMinTop = function () {
		return this._panel_mintop;
	};
	_pPanel._setPanelMinLeft = function (left) {
		this._panel_minleft = Math.max(left, this._panel_minleft);
	};
	_pPanel._setPanelMinTop = function (top) {
		this._panel_mintop = Math.max(top, this._panel_mintop);
	};
	_pPanel._setPanelMinPos = function (left, top) {
		this._panel_minleft = Math.min(left, this._panel_minleft);
		this._panel_mintop = Math.min(top, this._panel_mintop);
	};
	_pPanel._shiftPanelMinPos = function (left, top) {
		this._panel_minleft += left;
		this._panel_mintop += top;
	};
	_pPanel._initPanelMinPos = function (left, top) {
		this._panel_minleft = left ? left : Number.MAX_VALUE;
		this._panel_mintop = top ? top : Number.MAX_VALUE;
	};

	_pPanel._getPanelMaxWidth = function () {
		return this._panel_maxwidth;
	};
	_pPanel._getPanelMaxHeight = function () {
		return this._panel_maxheight;
	};
	_pPanel._setPanelMaxWidth = function (width) {
		this._panel_maxwidth = Math.max(width, this._panel_maxwidth);
	};
	_pPanel._setPanelMaxHeight = function (height) {
		this._panel_maxheight = Math.max(height, this._panel_maxheight);
	};
	_pPanel._setPanelMaxSize = function (width, height) {
		this._panel_maxwidth = Math.max(width, this._panel_maxwidth);
		this._panel_maxheight = Math.max(height, this._panel_maxheight);
	};
	_pPanel._shiftPanelMaxSize = function (width, height) {
		this._panel_maxwidth += width;
		this._panel_maxheight += height;
	};
	_pPanel._initPanelMaxSize = function (width, height) {
		this._panel_maxwidth = width ? width : 0;
		this._panel_maxheight = height ? height : 0;
	};

	_pPanel._getPanelPrevOverWidth = function () {
		return this._pow ? this._pow : 0;
	};
	_pPanel._getPanelNextOverWidth = function () {
		return this._now ? this._now : 0;
	};
	_pPanel._getPanelPrevOverHeight = function () {
		return this._poh ? this._poh : 0;
	};
	_pPanel._getPanelNextOverHeight = function () {
		return this._noh ? this._noh : 0;
	};
	_pPanel._setPanelPrevOverWidth = function (w) {
		this._pow = w;
	};
	_pPanel._setPanelNextOverWidth = function (w) {
		this._now = w;
	};
	_pPanel._setPanelPrevOverHeight = function (h) {
		this._poh = h;
	};
	_pPanel._setPanelNextOverHeight = function (h) {
		this._noh = h;
	};

	_pPanel._getPanelLimitWidth = function () {
		return this._panel_limitwidth;
	};
	_pPanel._getPanelLimitHeight = function () {
		return this._panel_limitheight;
	};
	_pPanel._getPanelLimitOverWidth = function () {
		return this._panel_limitoverwidth;
	};
	_pPanel._getPanelLimitOverHeight = function () {
		return this._panel_limitoverheight;
	};
	_pPanel._setPanelLimitWidth = function (width) {
		this._panel_limitwidth = width;
	};
	_pPanel._setPanelLimitHeight = function (height) {
		this._panel_limitheight = height;
	};
	_pPanel._addPanelLimitOverWidth = function (width) {
		var last_elem = this._panel_limitoverwidth.slice(-1);
		if (last_elem.length) {
			width += last_elem[0];
		}

		this._panel_limitoverwidth.push(width);
	};
	_pPanel._addPanelLimitOverHeight = function (height) {
		var last_elem = this._panel_limitoverheight.slice(-1);
		if (last_elem.length) {
			height += last_elem[0];
		}

		this._panel_limitoverheight.push(height);
	};
	_pPanel._clearPanelLimitOverWidth = function () {
		this._panel_limitoverwidth = [];
	};
	_pPanel._clearPanelLimitOverHeight = function () {
		this._panel_limitoverheight = [];
	};
	_pPanel._initPanelLimitSize = function () {
		this._panel_limitoverwidth = [];
		this._panel_limitoverheight = [];
	};

	_pPanel._clearPanelCachSize = function () {
		this._panel_minleft = 0;
		this._panel_mintop = 0;
		this._panel_maxwidth = 0;
		this._panel_maxheight = 0;

		this._pow = this._now = 0;
		this._poh = this._noh = 0;
	};

	_pPanel._clearPanelSize = function () {
		this._panel_rowsizes = [];
		this._panel_colsizes = [];
		this._panel_rowcount = 0;
		this._panel_colcount = 0;
		this._panel_defrsize = 0;
		this._panel_defcsize = 0;
		this._panel_defritms = 0;
		this._panel_defcitms = 0;
	};

	_pPanel._setSizeInfoRefPanel = function (panel, style) {
		this._ref_panel = panel;
		this._ref_style = style;
	};
	_pPanel._getSizeInfoRefPanel = function () {
		return this._ref_panel;
	};
	_pPanel._getRowSizeInfoPanel = function () {
		return this._ref_panel && (this._ref_style & nexacro._PanelConst.SIZEINFO_REFSTYLE_ROWLINK) ? this._ref_panel : this;
	};
	_pPanel._getColSizeInfoPanel = function () {
		return this._ref_panel && (this._ref_style & nexacro._PanelConst.SIZEINFO_REFSTYLE_COLLINK) ? this._ref_panel : this;
	};
	_pPanel._clearSizeInfoRefPanel = function () {
		this._ref_panel = null;
	};

	_pPanel._setGroupingSubPanel = function (panel, style, place) {
		this._sub_panel = panel;
		this._sub_place = place;

		this._panel_subgroup = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK | nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK);
		this._panel_subtitle = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_TITLE_MASK);
		this._panel_subsplit = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_SPLIT_MASK);

		this._panel_defstats = this._setDefSlotStat(this._panel_subgroup);
	};
	_pPanel._getGroupingSubPanel = function () {
		return this._sub_panel ? this._sub_panel : this;
	};
	_pPanel._clearGroupingSubPanel = function () {
		if (this._sub_panel && this._sub_panel != this) {
			delete this._sub_panel;
		}

		this._sub_panel = null;
	};
	_pPanel._setPanelTitleSize = function (size) {
		return this._panel_titlesize = size;
	};
	_pPanel._setPanelSplitSize = function (size) {
		return this._panel_splitsize = size;
	};
	_pPanel._getPanelTitleSize = function () {
		return this._panel_titlesize;
	};
	_pPanel._getPanelSplitSize = function () {
		return this._panel_splitsize;
	};
	_pPanel._setDefSlotStat = function (subgroup) {
		switch (subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) {
			case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND:
				return nexacro._PanelSlotConst.STATUS_EXPAND;
			case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE:
			case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION:
			case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP:
				return nexacro._PanelSlotConst.STATUS_COLLPASE;
		}
		switch (subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) {
			case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND:
				return nexacro._PanelSlotConst.STATUS_EXPAND;
			case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE:
			case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION:
			case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP:
				return nexacro._PanelSlotConst.STATUS_COLLPASE;
		}
		return nexacro._PanelSlotConst.STATUS_NONE;
	};
	_pPanel._getDefSlotStat = function () {
		return this._panel_defstats;
	};

	_pPanel._isPopup = function () {
		return this._isGroupPopup() || this._isBandPopup();
	};
	_pPanel._isGroupPopup = function () {
		return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP;
	};
	_pPanel._isBandPopup = function () {
		return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP;
	};
	_pPanel._isPopuped = function () {
		return this._isGroupPopup() || this._isBandPopup();
	};
	_pPanel._isAccordion = function () {
		return this._isGroupAccordion() || this._isBandAccordion();
	};
	_pPanel._isGroupAccordion = function () {
		return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION;
	};
	_pPanel._isBandAccordion = function () {
		return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION;
	};

	_pPanel._makePanelPopup = function (slot) {
		return this._panel_owner && this._panel_owner._createPanelPopup ? this._panel_owner._createPanelPopup(slot) : null;
	};
	_pPanel._getPanelPopup = function (slot) {
		return slot && slot._hasSlotPopup() ? slot._getSlotPopup() : this._makePanelPopup(slot);
	};
	_pPanel._showPanelPopup = function (slot) {
		var popup = slot ? slot._getSlotPopup() : null;

		if (popup && !popup._isPopup()) {
			popup._showPopup(this._sub_place);
		}
	};
	_pPanel._closePanelPopup = function (slot) {
		var popup = slot ? slot._getSlotPopup() : null;

		if (popup && popup._isPopup()) {
			popup._closePopup();
		}
	};

	_pPanel._makePanelBandPopup = function (slot) {
		return this._panel_owner && this._panel_owner._createPanelPopup ? this._panel_owner._createPanelPopup(slot, true) : null;
	};
	_pPanel._getPanelBandPopup = function (slot) {
		return slot && slot._hasSlotPopup() ? slot._getSlotPopup() : this._makePanelBandPopup(slot);
	};
	_pPanel._showPanelBandPopup = function (slot) {
		var popup = slot ? slot._getSlotPopup() : null;

		if (popup && !popup._isPopup()) {
			popup._showPopup(this._sub_place, true);
		}
	};
	_pPanel._closePanelBandPopup = function (slot) {
		var popup = slot ? slot._getSlotPopup() : null;

		if (popup && popup._isPopup()) {
			popup._closePopup();
		}
	};


	_pPanel._useSelector = function () {
		return this._isLineSelector() || this._isAreaSelector();
	};
	_pPanel._isLineSelector = function () {
		return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_LINE;
	};
	_pPanel._isAreaSelector = function () {
		return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_AREA;
	};
	_pPanel._isSelectResizer = function () {
		return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_RESIZER;
	};
	_pPanel._isSelectPointer = function () {
		return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_POINTER;
	};
	_pPanel._isSelectCarrier = function () {
		return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_CARRIER;
	};

	_pPanel._setPanelSelector = function (selector) {
		return this._addPanelSelector(selector);
	};
	_pPanel._addPanelSelector = function (selector) {
		return selector ? this._panel_selector[this._getPanelSelectorKey(selector)] = selector : null;
	};

	_pPanel._getPanelSelectorKey = function (selector) {
		if (nexacro._isArray(selector)) {
			return "s" + selector.join("s");
		}
		if (nexacro._isNumber(selector)) {
			return "s" + selector;
		}
		if (nexacro._isObject(selector)) {
			return "s" + selector._begin_index + "s" + selector._final_index;
		}
		return "";
	};
	_pPanel._getPanelSelectorIdxRange = function (selectorkey) {
		return selectorkey.split("s").slice(1).map(Number);
	};
	_pPanel._getPanelSelectorIdxParts = function (selectorkey) {
		return selectorkey.split("s").slice(1).map(Number);
	};
	_pPanel._makePanelSelector = function (selectidx) {
		return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidx, selectidx, false)) : null;
	};
	_pPanel._makePanelSelectorRange = function (selectidxbegin, selectidxfinal) {
		return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidxbegin, selectidxfinal, false)) : null;
	};
	_pPanel._makePanelSelectorParts = function (selectidxmain, selectidxpart) {
		return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidxmain, selectidxpart, true)) : null;
	};
	_pPanel._hasPanelSelector = function (selectkey) {
		return !nexacro._isNull(selectkey) ? this._panel_selector[selectkey] != null : false;
	};
	_pPanel._getPanelSelector = function (selectkey, make) {
		return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelector.apply(this, this._getPanelSelectorIdxRange(selectkey));
	};
	_pPanel._getPanelSelectorRange = function (selectkey, make) {
		return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelectorRange.apply(this, this._getPanelSelectorIdxRange(selectkey));
	};
	_pPanel._getPanelSelectorParts = function (selectkey, make) {
		return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelectorParts.apply(this, this._getPanelSelectorIdxParts(selectkey));
	};
	_pPanel._showPanelSelector = function (selectkey) {
		var selector = this._getPanelSelector(selectkey);

		if (selector && selector._showSelector) {
			selector._showSelector();
		}
	};
	_pPanel._hidePanelSelector = function (selectkey) {
		var selector = this._getPanelSelector(selectkey);

		if (selector && selector._hideSelector) {
			selector._hideSelector();
		}
	};
	_pPanel._clearPanelSelector = function () {
		this._panel_selector = {
		};
	};

	_pPanel._setPanelSlotVisible = function (index, count, show) {
		count = count ? count : 1;

		for (var i = index, l = index + count; i < l; i++) {
			var slot = this._getPanelSlot(index);
			if (slot) {
				slot._setSlotVisible(show);
			}
		}
	};
	_pPanel._showPanelSlot = function (index, count) {
		this._setPanelSlotVisible(index, count, true);
	};
	_pPanel._hidePanelSlot = function (index, count) {
		this._setPanelSlotVisible(index, count, false);
	};


	_pPanel._getPanelSlotStatus = function (index) {
		var slot = this._getPanelSlot(index);

		return slot ? slot._getSlotStatus() : nexacro._PanelSlotConst.STATUS_NONE;
	};
	_pPanel._setPanelSlotStatusNoAction = function (index, status) {
		var slot = this._getPanelSlot(index);

		if (slot) {
			var slvl = slot._getSlotLevel();
			var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;

			slot._setSlotStatus(status);

			this._setExpandedSlotIndex(slvl, index, show);
		}
	};
	_pPanel._setPanelSlotStatus = function (index, status, all) {
		var slot = this._getPanelSlot(index);

		if (slot) {
			var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;
			var slvl = slot._getSlotLevel();
			var nlvl = slvl + 1;
			var sidx = index >= 0 ? index + 1 : this._panel_slots.length;

			if (this._isGroupPopup()) {
				if (show) {
					this._showPanelPopup(slot);
				}
				else {
					this._closePanelPopup(slot);
				}

				slot._setSlotStatus(status);
			}
			else {
				if (this._isGroupAccordion()) {
					if (show) {
						var expandidx = this._getExpandedSlotIndex(slvl);

						this._setPanelSlotStatusCollapse(expandidx, true);
					}
				}

				for (var i = sidx, l = this._panel_slots.length; i < l; i++) {
					var subslot = this._getPanelSlot(index);

					if (subslot) {
						var clvl = subslot._getSlotLevel();

						if (slvl < clvl) {
							if (all) {
								subslot._setSlotStatus(status);
								subslot._setSlotVisible(show);
							}
							else if (show) {
								if (nlvl == clvl) {
									subslot._setSlotVisible(show);
								}
							}
							else {
								subslot._setSlotVisible(show);
							}
						}
						else {
							break;
						}
					}
				}

				slot._setSlotStatus(status);
			}

			this._setExpandedSlotIndex(slvl, index, show);
		}
	};
	_pPanel._setPanelSlotStatusExpand = function (index, all) {
		this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_EXPAND, all);
	};
	_pPanel._setPanelSlotStatusCollapse = function (index, all) {
		this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
	};
	_pPanel._setPanelSlotStatusPopup = function (index) {
		this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_POPUP, false);
	};
	_pPanel._setPanelSlotStatusClose = function (index) {
		this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_COLLPASE, true);
	};
	_pPanel._setPanelSlotStatusToggle = function (index) {
		var stat = this._getPanelSlotStatus(index);

		if (this._isGroupPopup()) {
			if (stat >= nexacro._PanelSlotConst.STATUS_EXPAND) {
				return this._setPanelSlotStatusClose(index);
			}
			if (stat == nexacro._PanelSlotConst.STATUS_COLLPASE) {
				return this._setPanelSlotStatusPopup(index);
			}
		}
		else {
			this._setPanelSlotStatus(index, stat *  (-1), false);
		}
	};

	_pPanel._getPanelSlotStatusBand = function (index) {
		var slot = this._getPanelSlot(index);

		return slot ? slot._getSlotStatusBand() : this._getDefSlotStat();
	};
	_pPanel._setPanelSlotStatusBandNoAction = function (index, status) {
		var slot = this._getPanelSlot(index);

		if (slot) {
			var slvl = slot._getSlotLevel();
			var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;

			slot._setSlotStatusBand(status);

			this._setExpandedSlotIndex(slvl, index, show);
		}
	};
	_pPanel._setPanelSlotStatusBand = function (index, status, all) {
		var slot = this._getPanelSlot(index);

		if (slot) {
			var slvl = slot._getSlotLevel();
			var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;

			if (this._isBandPopup()) {
				if (show) {
					var popupslot = this._getExpandedSlot(slvl);

					this._closePanelBandPopup(popupslot);

					this._getPanelBandPopup(slot);

					this._showPanelBandPopup(slot);
				}
				else {
					this._closePanelBandPopup(slot);
				}

				slot._setSlotStatusBand(status);
			}
			else {
				if (this._isBandAccordion()) {
					if (show) {
						var expandidx = this._getExpandedSlotIndex(slvl);

						this._setPanelSlotStatusBandCollapse(expandidx, true);
					}
				}

				slot._setSlotStatusBand(status);
			}

			this._setExpandedSlotIndex(slvl, index, show);
		}
	};
	_pPanel._setPanelSlotStatusBandExpand = function (index, all) {
		this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_EXPAND, all);
	};
	_pPanel._setPanelSlotStatusBandCollapse = function (index, all) {
		this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
	};
	_pPanel._setPanelSlotStatusBandPopup = function (index, all) {
		this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_POPUP, all);
	};
	_pPanel._setPanelSlotStatusBandClose = function (index, all) {
		this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
	};
	_pPanel._setPanelSlotStatusBandToggle = function (index, all) {
		var stat = this._getPanelSlotStatusBand(index);

		if (this._isBandPopup()) {
			if (stat >= nexacro._PanelSlotConst.STATUS_EXPAND) {
				return this._setPanelSlotStatusBandClose(index);
			}
			if (stat == nexacro._PanelSlotConst.STATUS_COLLPASE) {
				return this._setPanelSlotStatusBandPopup(index);
			}
		}
		else {
			this._setPanelSlotStatusBand(index, stat *  (-1), all);
		}
	};

	_pPanel._setExpandedSlotIndex = function (level, index, expand) {
		var lvl = level < 0 ? 0 : level;
		var lst = lvl - this._panel_lvlstart;

		if (expand) {
			this._expaned_slot[lst++] = index;
		}

		this._expaned_slot.length = lst;
	};
	_pPanel._getExpandedSlotIndex = function (level) {
		var lvl = level < 0 ? 0 : level;

		if (lvl < this._expaned_slot.length) {
			return this._expaned_slot[lvl];
		}
		else {
			return -1;
		}
	};
	_pPanel._getExpandedSlot = function (level) {
		var index = this._getExpandedSlotIndex(level);

		if (index >= 0 && index < this._panel_slots.length) {
			return this._getPanelSlot(index);
		}
		else {
			return null;
		}
	};

	_pPanel._setOwnerLayoutAutoFitFlag = function (flag) {
		this._panel_owner && this._panel_owner._setLayoutAutoFit ? this._panel_owner._setLayoutAutoFit(flag) : null;
	};

	_pPanel._clear = function () {
		this._clearPanelSize();
		this._clearPanelSlot();
		this._clearPanelEachSize();
		this._clearPanelCachSize();
		this._clearSizeInfoRefPanel();
		this._clearGroupingSubPanel();
		this._clearPanelSelector();
	};

	delete _pPanel;
}

if (!nexacro._ScrollManager) {
	nexacro._ScrollConst = 
		{
		SCROLLMODE_NONE : 0x0000, 
		SCROLLMODE_COUNT : 0x0010, 
		SCROLLMODE_INDEX : 0x0020, 
		SCROLLMODE_POSIT : 0x0030, 
		SCROLLMODE_SLIDE : 0x0040, 
		SCROLLMODE_FLICK : 0x0080, 
		SCROLLMODE_TOUCH : 0x00C0, 
		SCROLLMODE_FRAME : 0x0100, 
		SCROLLMODE_DEBND : 0x0200, 
		SCROLLMODE_THRTL : 0x0300, 
		SCROLLMODE_MASK : 0x03F0, 
		SCROLLTRTTYPE_CONVERT : 
			{
			"none" : 0x0000, 
			"aniframe" : 0x0100, 
			"debound" : 0x0200, 
			"throttle" : 0x0300
		}, 

		SCROLLCTRL_NONE : 0x0000, 
		SCROLLCTRL_HORZ : 0x0001, 
		SCROLLCTRL_VERT : 0x0002, 
		SCROLLCTRL_MASK : 0x0003, 

		SCROLLSTAT_INIT : 0, 
		SCROLLSTAT_READY : 1, 
		SCROLLSTAT_START : 2, 
		SCROLLSTAT_SCROLL : 3, 
		SCROLLSTAT_UPDATE : 4, 
		SCROLLSTAT_FINISH : 5, 
		SCROLLSTAT_FINAL : 0, 
		SCROLLSTAT_CONVERT : 
			{
			"trackstart" : 2, 
			"track" : 3, 
			"trackfirst" : 3, 
			"trackfirstover" : 3, 
			"tracklast" : 3, 
			"tracklastover" : 3, 
			"trackend" : 5, 
			"flingstart" : 2, 
			"fling" : 3, 
			"flingend" : 5, 
			"slidestart" : 4, 
			"slide" : 4, 
			"slideend" : 4, 
			"linedown" : 4, 
			"lineup" : 4, 
			"lineleft" : 4, 
			"lineright" : 4, 
			"pagedown" : 4, 
			"pageup" : 4, 
			"pageleft" : 4, 
			"pageright" : 4, 
			"first" : 4, 
			"firstover" : 4, 
			"last" : 4, 
			"lastover" : 4, 
			"none" : 4
		}, 

		SCROLLPOSTYPE_PIXEL : 0, 
		SCROLLPOSTYPE_ITEM : 1, 
		SCROLLPOSTYPE_PAGE : 2, 
		SCROLLPOSTYPE_CONVERT : 
			{
			"pixel" : 0x0000, 
			"item" : 0x0001, 
			"page" : 0x0002
		}, 

		SCROLLDIRTYPE_NONE : 0, 
		SCROLLDIRTYPE_HORZ : 1, 
		SCROLLDIRTYPE_VERT : 2, 
		SCROLLDIRTYPE_BOTH : 3, 
		SCROLLDIRTYPE_CONVERT : 
			{
			"none" : 0x0000, 
			"horz" : 0x0001, 
			"horzental" : 0x0001, 
			"vert" : 0x0002, 
			"vertical" : 0x0002, 
			"both" : 0x0003
		}, 

		SCROLLCTRLSET_NONE : 0x0000, 
		SCROLLCTRLSET_SCROLLBAR : 0x0001, 
		SCROLLCTRLSET_INDICATEBAR : 0x0004, 
		SCROLLCTRLSET_SPINBAR : 0x0010, 
		SCROLLCTRLSET_STEPBAR : 0x0040, 
		SCROLLCTRLSET_CONVERT : 
			{
			"none" : 0x0000, 
			"scrollbar" : 0x0001, 
			"indicatebar" : 0x0002, 
			"spinbar" : 0x0003, 
			"stepbar" : 0x0004
		}, 

		SCROLLVISIBLE_NONE : 0x0000, 
		SCROLLVISIBLE_HORZAUTO : 0x0001, 
		SCROLLVISIBLE_VERTAUTO : 0x0002, 
		SCROLLVISIBLE_BOTHAUTO : 0x0003, 
		SCROLLVISIBLE_HORZALWAYS : 0x0004, 
		SCROLLVISIBLE_VERTALWAYS : 0x0008, 
		SCROLLVISIBLE_HORZCONST : 0x0010, 
		SCROLLVISIBLE_VERTCONST : 0x0020, 

		SCROLLVISIBLE_DEFAULT : 0x1000, 
		SCROLLVISIBLE_CONVERT : 
			{
			"none" : 0x0000, 
			"auto" : 0x0001, 
			"fixed" : 0x0040, 
			"const" : 0x0100, 
			"default" : 0x1000
		}, 

		SCROLLARRANGE_DEFAULT : 0, 
		SCROLLARRANGE_OPPSITE : 1, 
		SCROLLARRANGE_CLABOVE : 2, 
		SCROLLARRANGE_CONVERT : 
			{
			"default" : 0x0000, 
			"opposite" : 0x0001, 
			"above" : 0x0040
		}, 

		SCROLLTRACKCOVER_NONE : 0, 
		SCROLLTRACKCOVER_AUTO : 1, 
		SCROLLTRACKCOVER_IMAGE : 2, 
		SCROLLTRACKCOVER_BAND : 3, 
		SCROLLTRACKCOVER_BLUR : 4, 
		SCROLLTRACKCOVER_CONVERT : 
			{
			"none" : 0, 
			"auto" : 1, 
			"image" : 2, 
			"band" : 3, 
			"blur" : 4
		}, 



		SCROLLTRACKEVENT_SHOWALWAYS : 0, 
		SCROLLTRACKEVENT_TRACKINIT : 0, 
		SCROLLTRACKEVENT_TRACKBEGUN : 1, 
		SCROLLTRACKEVENT_TRACKMOVED : 2, 
		SCROLLTRACKEVENT_TRACKWHEEL : 2, 
		SCROLLTRACKEVENT_TRACKENDED : 3, 
		SCROLLTRACKEVENT_TRACKPAUSE : 4, 
		SCROLLTRACKEVENT_CONVERT : 
			{
			"showalways" : 0, 
			"trackinit" : 0, 
			"trackbegun" : 1, 
			"trackmoved" : 2, 
			"trackwheel" : 2, 
			"trackended" : 3, 
			"trackpause" : 4
		}, 

		SCROLLTRACKPOS_NONE : 0x0000, 
		SCROLLTRACKPOS_LEAD : 0x0001, 
		SCROLLTRACKPOS_TAIL : 0x0002, 
		SCROLLTRACKPOS_CENTER : 0x0003, 
		SCROLLTRACKPOS_HORZMASK : 0x000F, 
		SCROLLTRACKPOS_TOP : 0x0010, 
		SCROLLTRACKPOS_BOTTOM : 0x0020, 
		SCROLLTRACKPOS_MIDDLE : 0x0030, 
		SCROLLTRACKPOS_TRACKTOP : 0x0100, 
		SCROLLTRACKPOS_TRACKBOTTOM : 0x0200, 
		SCROLLTRACKPOS_TRACKMIDDLE : 0x0300, 
		SCROLLTRACKPOS_TRACKMASK : 0x0F00, 
		SCROLLTRACKPOS_VERTMASK : 0x0FF0, 
		SCROLLTRACKPOS_CONVERT : 
			{
			"none" : 0x0000, 
			"lead" : 0x0001, 
			"tail" : 0x0002, 
			"center" : 0x0003, 
			"top" : 0x0010, 
			"bottom" : 0x0020, 
			"middle" : 0x0030, 
			"tracktop" : 0x0100, 
			"trackbottom" : 0x0200, 
			"trackmiddle" : 0x0300
		}, 
		SCROLLSTICKTYPE_CONVERT : 
			{
			"default" : 0x0000
		}, 
		SCROLLSTICKTYPE_DEFAULT : 0x0000, 

		SCROLLCONST_END : -1
	};

	nexacro._ScrollManager = function (owner) {
		this.rowfirst = false;

		this.scrolltype = 0;
		this.scrollunit = 0;
		this.scrollstat = 0;
		this.recurrtype = 0;

		this.ctrlsettype = 0;

		this.ctrlvisible = 0;
		this.hctrllayout = 0;
		this.vctrllayout = 0;

		this.hscrollctrl = null;
		this.vscrollctrl = null;
		this.eventtarget = null;
		this.eventthrott = 0;

		this.scrollctxt = null;
		this.hscrollinfo = null;
		this.vscrollinfo = null;

		this.viewstart = 0;
		this.viewcount = -1;
		this.prevcount = 0;
		this.nextcount = 0;
		this.fullstart = 0;
		this.fullcount = 0;
		this.fixlcount = -1;
		this.fixtcount = -1;

		this.parttrack = false;
		this.covertype = 0;
		this.trackband = [];
		this.tracktype = [];
		this.trackloct = [];

		this.appertime = 300;
		this.covertime = 300;
		this.tracktime = 500;
		this.readytime = 800;
		this.sticktime = 0;

		this._setcoverbimg = false;
		this._setcoversize = false;
		this._setbandslist = false;
		this._setbandssize = false;
		this._setstickitem = false;
		this._setsticksize = false;

		this._owner = owner;
		this._trackcoverow = null;
		this._trackbandsow = null;
		this._stickitemsow = null;

		this._trackcoverem = null;
		this._trackcovereb = null;
		this._trackbandlst = [];
		this._trackbandalw = [];
		this._trackbandout = [];
		this._trackbandstt = [];
		this._trackbandtrk = [];
		this._trackbandend = [];
		this._stickitemlead = [];
		this._stickitemtail = [];

		this._appertimer = null;
		this._pausetimer = null;
		this._closetimer = null;
		this._readytimer = null;
		this._sticktimer = null;

		this._trackcoverwd = 0;
		this._trackcoverht = 0;
		this._trackbandbwd = 0;
		this._trackbandbht = 0;
		this._trackbarbase = 0;
		this._trackbarsize = 0;
		this._stickitembwd = 0;
		this._stickitembht = 0;

		this._framemanager = null;
	};

	var _pScrollManager = nexacro._createPrototype(Object, nexacro._ScrollManager);
	nexacro._ScrollManager.prototype = _pScrollManager;
	_pScrollManager._type_name = "_ScrollManager";



	_pScrollManager.isInited = function () {
		return this.scrollstat != 0;
	};
	_pScrollManager.isReady = function () {
		return this.scrollstat == 1;
	};
	_pScrollManager.isStarting = function () {
		return this.scrollstat == 2;
	};
	_pScrollManager.isScrolling = function () {
		return this.scrollstat == 3;
	};
	_pScrollManager.isUpdating = function () {
		return this.scrollstat == 4;
	};
	_pScrollManager.isFinished = function () {
		return this.scrollstat == 5;
	};
	_pScrollManager.isTracking = function () {
		return this.scrollstat >= 2 && this.parttrack;
	};
	_pScrollManager.isEventFrame = function () {
		return this.eventthrott != 0;
	};

	_pScrollManager._convertScrollDirType = function (scrolldirtype) {
		return nexacro._ScrollConst.SCROLLDIRTYPE_CONVERT[scrolldirtype];
	};
	_pScrollManager._convertScrollPosType = function (scrollpostype) {
		return nexacro._ScrollConst.SCROLLPOSTYPE_CONVERT[scrollpostype];
	};
	_pScrollManager._convertScrollTrtType = function (scrolltrttype) {
		return nexacro._ScrollConst.SCROLLTRTTYPE_CONVERT[scrolltrttype];
	};
	_pScrollManager._convertScrollCtrlSet = function (ctrlset) {
		var arr = nexacro._toString(ctrlset).toLowerCase().split(" ");
		if (!arr) {
			return 0;
		}

		var v, h;

		if (arr.length == 1) {
			h = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[0]];

			return h | (h << 1);
		}
		else {
			h = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[0]];
			v = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[1]];

			return h | v;
		}
	};
	_pScrollManager._convertScrollVisible = function (ctrlvisible) {
		var arr = nexacro._toString(ctrlvisible).toLowerCase().split(" ");
		if (!arr) {
			return 0;
		}

		var v, h;

		if (arr.length == 1) {
			h = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[0]];

			return h | (h << 1);
		}
		else {
			h = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[0]];
			v = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[1]];

			return h | v;
		}
	};
	_pScrollManager._convertScrollArrange = function (ctrllayout) {
		return nexacro._ScrollConst.SCROLLARRANGE_CONVERT[ctrllayout];
	};
	_pScrollManager._convertScrollEventStat = function (scrolleventstat) {
		return nexacro._ScrollConst.SCROLLSTAT_CONVERT[scrolleventstat];
	};
	_pScrollManager._convertScrollCoverType = function (scrollcovertype) {
		return nexacro._ScrollConst.SCROLLTRACKCOVER_CONVERT[scrollcovertype];
	};
	_pScrollManager._convertScrollTrackEvt = function (item, index) {
		return nexacro._ScrollConst.SCROLLTRACKEVENT_CONVERT[item];
	};
	_pScrollManager._convertScrollTrackPos = function (item, index) {
		var arr = nexacro._toString(item).toLowerCase().split(" ");
		var ret = 0;

		for (var i = 0, l = arr.length; i < l; i++) {
			ret |= nexacro._ScrollConst.SCROLLTRACKPOS_CONVERT[arr[i]];
		}

		return ret;
	};
	_pScrollManager._convertScrollStickType = function (scrollsticktype) {
		return nexacro._ScrollConst.SCROLLSTICKTYPE_CONVERT[scrollsticktype];
	};

	_pScrollManager.setScroll = function (stat, type, hinfo, vinfo) {
		if (this.scrollstat == stat) {
			return this.onRecurrStatus(stat, type, hinfo, vinfo);
		}
		else {
			return this.onChangeStatus(this.scrollstat, stat, type, hinfo, vinfo);
		}
	};

	_pScrollManager._checkRecurring = function (type, hinfo, vinfo) {
		if (this.isEventFrame()) {
			var hrecurr = this.hscrollinfo && hinfo && this.hscrollinfo.pos != hinfo.pos;
			var vrecurr = this.vscrollinfo && vinfo && this.vscrollinfo.pos != vinfo.pos;

			if (hrecurr) {
				this.recurrtype |= nexacro._ScrollConst.SCROLLDIRTYPE_HORZ;
				this.hscrollinfo = hinfo;
			}

			if (vrecurr) {
				this.recurrtype |= nexacro._ScrollConst.SCROLLDIRTYPE_VERT;
				this.vscrollinfo = vinfo;
			}

			return true;
		}
		else {
			return false;
		}
	};

	_pScrollManager.onRecurrStatus = function (curstat, type, hinfo, vinfo) {
		if (this._checkRecurring(type, hinfo, vinfo)) {
			return false;
		}

		switch (curstat) {
			case 0:
				this._setScrollClear();
				break;
			case 1:
				this._setScrollReady(type, hinfo, vinfo);
				break;
			case 2:
				this._setScrollStart(type, hinfo, vinfo);
				break;
			case 3:
				this._setScrollScroll(type, hinfo, vinfo);
				break;
			case 4:
				this._setScrollUpdate(type, hinfo, vinfo);
				break;
			case 5:
				this._setScrollFinish(type, hinfo, vinfo);
				break;
		}

		return true;
	};

	_pScrollManager.onChangeStatus = function (oldstat, newstat, type, hinfo, vinfo) {
		switch (oldstat) {
			case 0:
				{

					switch (newstat) {
						case 1:
							this._setScrollReady(type, hinfo, vinfo);
							break;
						case 2:
							this._setScrollReady(type, hinfo, vinfo);
							this._setScrollStart(type, hinfo, vinfo);
							break;
						case 3:
							this._setScrollReady(type, hinfo, vinfo);
							this._setScrollStart(type, hinfo, vinfo);
							this._setScrollScroll(type, hinfo, vinfo);
							break;
						case 4:
							this._setScrollReady(type, hinfo, vinfo);
							this._setScrollUpdate(type, hinfo, vinfo);
							break;
						case 5:
							this._setScrollFinish(type, hinfo, vinfo);
							break;
					}
					break;
				}
			case 5:
			case 1:
				{

					switch (newstat) {
						case 2:
							this._setScrollStart(type, hinfo, vinfo);
							break;
						case 3:
							this._setScrollStart(type, hinfo, vinfo);
							this._setScrollScroll(type, hinfo, vinfo);
							break;
						case 4:
							this._setScrollUpdate(type, hinfo, vinfo);
							break;
						case 5:
							this._setScrollFinish(type, hinfo, vinfo);
							break;
						case 0:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							break;
					}
					break;
				}
			case 2:
				{

					switch (newstat) {
						case 3:
							this._setScrollScroll(type, hinfo, vinfo);
							break;
						case 4:
							this._setScrollUpdate(type, hinfo, vinfo);
							break;
						case 5:
							this._setScrollFinish(type, hinfo, vinfo);
							break;
						case 0:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							break;
						case 1:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							this._setScrollReady(type, hinfo, vinfo);
							break;
					}
					break;
				}
			case 3:
				{

					switch (newstat) {
						case 2:
							this._setScrollStart(type, hinfo, vinfo);
							break;
						case 4:
							this._setScrollUpdate(type, hinfo, vinfo);
							break;
						case 5:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							this._setScrollReady(type, hinfo, vinfo);
							break;
						case 0:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							break;
						case 1:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							this._setScrollReady(type, hinfo, vinfo);
							break;
					}
					break;
				}
			case 4:
				{

					switch (newstat) {
						case 2:
							this._setScrollStart(type, hinfo, vinfo);
							break;
						case 3:
							this._setScrollScroll(type, hinfo, vinfo);
							break;
						case 5:
							this._setScrollFinish(type, hinfo, vinfo);
							break;
						case 0:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							break;
						case 1:
							this._setScrollFinish(type, hinfo, vinfo);
							this._setScrollClear();
							this._setScrollReady(type, hinfo, vinfo);
							break;
					}
					break;
				}
		}
	};

	_pScrollManager._setScrollLayout = function (rowfirst, scrolltype, scrollunit, ctrlset, ctrlvisible, hctrllayout, vctrllayout) {
		this.rowfirst = rowfirst;

		this.scrolltype = this._convertScrollDirType(scrolltype);
		this.scrollunit = this._convertScrollPosType(scrollunit);

		this.ctrlsettype = this._convertScrollCtrlSet(ctrlset);

		this.ctrlvisible = this._convertScrollVisible(ctrlvisible);
		this.hctrllayout = this._convertScrollArrange(hctrllayout);
		this.vctrllayout = this._convertScrollArrange(vctrllayout);
	};
	_pScrollManager._setScrollControl = function (hctrl, vctrl) {
		this.hscrollctrl = hctrl;
		this.vscrollctrl = vctrl;
	};
	_pScrollManager._setScrollContext = function (ctxt) {
		this.scrollctxt = ctxt;
	};
	_pScrollManager._setScrollEvent = function (eventtarget, eventthrot) {
		this.eventtarget = eventtarget;
		this.eventthrott = this._convertScrollTrtType(eventthrot);
	};
	_pScrollManager._setScrollInfo = function (ctxt, hinfo, vinfo) {
		this.hscrollinfo = hinfo;
		this.vscrollinfo = vinfo;
	};
	_pScrollManager._setScrollTrack = function (covertype, trackband, tracktype, trackloct, appertime, covertime, tracktime, readytime) {
		this.covertype = this._convertScrollCoverType(covertype);
		this.trackband = trackband && trackband.length ? trackband.slice() : [];
		this.tracktype = tracktype && tracktype.length ? tracktype.map(this._convertScrollTrackEvt) : [];
		this.trackloct = trackloct && trackloct.length ? trackloct.map(this._convertScrollTrackPos) : [];
		this.appertime = nexacro._isNumber(appertime) ? appertime : this.appertime;
		this.covertime = nexacro._isNumber(covertime) ? covertime : this.covertime;
		this.tracktime = nexacro._isNumber(tracktime) ? tracktime : this.tracktime;
		this.readytime = nexacro._isNumber(readytime) ? readytime : this.readytime;

		this.parttrack = (this.covertype != 0) || (this.trackband && this.trackband.length);
	};
	_pScrollManager._setScrollTrackCover = function (covertype) {
		this.covertype = this._convertScrollCoverType(covertype);

		this.parttrack = (this.covertype != 0);
	};
	_pScrollManager._setScrollTrackBands = function (trackband, tracktype, trackloct) {
		this.trackband = trackband && trackband.length ? trackband.slice() : [];
		this.tracktype = tracktype && tracktype.length ? tracktype.map(this._convertScrollTrackEvt) : [];
		this.trackloct = trackloct && trackloct.length ? trackloct.map(this._convertScrollTrackPos) : [];

		this.parttrack = (this.trackband && this.trackband.length);
	};
	_pScrollManager._setScrollTrackTimes = function (appertime, covertime, tracktime, readytime) {
		this.appertime = nexacro._isNumber(appertime) ? appertime : this.appertime;
		this.covertime = nexacro._isNumber(covertime) ? covertime : this.covertime;
		this.tracktime = nexacro._isNumber(tracktime) ? tracktime : this.tracktime;
		this.readytime = nexacro._isNumber(readytime) ? readytime : this.readytime;
	};
	_pScrollManager._setScrollStick = function (sticktype, sticktime) {
		this.sticktype = this._convertScrollStickType(sticktype);
		this.sticktime = nexacro._isNumber(sticktime) ? sticktime : this.sticktime;
	};

	_pScrollManager._clear = function () {
		this._setEventFrameFinish();

		this.setScroll(0);

		this._clearScrollControl();
		this._clearScrollContext();
		this._clearScrollEvent();
		this._clearScrollInfo();
		this._clearScrollPart();
		this._clearScrollTrack();
		this._clearScrollStick();

		this._owner = null;
	};

	_pScrollManager._clearScrollControl = function () {
		this.hscrollctrl = null;
		this.vscrollctrl = null;
	};
	_pScrollManager._clearScrollContext = function () {
		this.scrollctxt = null;
	};
	_pScrollManager._clearScrollEvent = function () {
		this.eventtarget = null;
	};
	_pScrollManager._clearScrollInfo = function () {
		this.hscrollinfo = null;
		this.vscrollinfo = null;
	};
	_pScrollManager._clearScrollPart = function () {
		this.viewstart = 0;
		this.viewcount = -1;
		this.prevcount = 0;
		this.nextcount = 0;
		this.fullstart = 0;
		this.fullcount = 0;
	};
	_pScrollManager._clearScrollTrack = function () {
		this._clearScrollTrackBands();
		this._clearScrollTrackCover();
		this._clearScrollTrackTimer();

		this.covertype = 0;
		this.trackband = [];
		this.tracktype = [];
		this.trackloct = [];
		this.appertime = 0;
		this.covertime = 0;
		this.tracktime = 0;
		this.readytime = 0;
	};
	_pScrollManager._clearScrollTrackBands = function () {
		if (this._trackbandlst) {
			this._trackbandalw = [];
			this._trackbandout = [];
			this._trackbandstt = [];
			this._trackbandtrk = [];
			this._trackbandend = [];

			for (var i = 0, l = this._trackbandlst.length; i < l; i++) {
				var item = this._trackbandlst[i];
				if (item && item.destroy) {
					item.destroy();
					delete item;
				}
				this._trackbandlst[i] = null;
			}

			this._trackbandlst = [];
		}
		this._setbandslist = false;
		this._setbandssize = false;
		this._trackbandbwd = 0;
		this._trackbandbht = 0;
		this._trackbandsow = null;
	};
	_pScrollManager._clearScrollTrackCover = function () {
		if (this._trackcoverem) {
			this._trackcoverem.destroy();
			this._trackcoverem = null;
		}
		if (this._trackcovereb) {
			this._trackcovereb.destroy();
			this._trackcovereb = null;
		}
		this._trackcoverow = null;
		this._setcoverbimg = false;
		this._setcoversize = false;
		this._trackcoverwd = 0;
		this._trackcoverht = 0;
	};
	_pScrollManager._clearScrollStick = function () {
		this._clearStickItems();
		this._clearStickTimer();

		this.sticktype = 0;
		this.sticktime = 0;
		this.fixlcount = -1;
		this.fixtcount = -1;
	};
	_pScrollManager._clearScrollTrackTimer = function () {
		this._clearTrackTimerPause();
		this._clearTrackTimerApper();
		this._clearTrackTimerClose();
		this._clearTrackTimerReady();
	};
	_pScrollManager._clearTrackTimerPause = function () {
		if (this._pausetimer) {
			this._pausetimer.destroy();
			delete this._pausetimer;
			this._pausetimer = null;
		}
	};
	_pScrollManager._clearTrackTimerApper = function () {
		if (this._appertimer) {
			this._appertimer.destroy();
			delete this._appertimer;
			this._appertimer = null;
		}
	};
	_pScrollManager._clearTrackTimerClose = function () {
		if (this._closetimer) {
			this._closetimer.destroy();
			delete this._closetimer;
			this._closetimer = null;
		}
	};
	_pScrollManager._clearTrackTimerReady = function () {
		if (this._readytimer) {
			this._readytimer.destroy();
			delete this._readytimer;
			this._readytimer = null;
		}
	};

	_pScrollManager._getCommandString = function () {
		var str = "";

		if (this.hscrollctrl) {
			str += this.hscrollctrl.createCommand();
		}
		if (this.vscrollctrl) {
			str += this.vscrollctrl.createCommand();
		}

		return str;
	};
	_pScrollManager._setAttachHandle = function (win) {
		if (this.hscrollctrl) {
			this.hscrollctrl.attachHandle(win);
		}
		if (this.vscrollctrl) {
			this.vscrollctrl.attachHandle(win);
		}
	};

	_pScrollManager._setEventFrameReady = function () {
		if (this.isReady()) {
			this._setEventFrameStart();
		}
	};
	_pScrollManager._setEventFrameStart = function () {
		var that = this;

		if (!this._framemanager) {
			this._framemanager = new nexacro.AnimationFrame(this.eventtarget, function () {
				that._callbackFrame();
			});
		}

		if (this._framemanager) {
			this._framemanager.start();
		}
	};
	_pScrollManager._setEventFrameStop = function () {
		if (this._framemanager) {
			this._framemanager.stop();
		}
	};
	_pScrollManager._setEventFrameFinish = function () {
		if (!this.isReady()) {
			this._setEventFrameStop();
		}

		if (this._framemanager) {
			delete this._framemanager;
			this._framemanager = null;
		}
	};

	_pScrollManager._callbackFrame = function () {
		if (this.isScrolling() || this.isUpdating()) {
			this._setScrollScroll(this.recurrtype, this.hscrollinfo, this.vscrollinfo);
			this.recurrtype = nexacro._ScrollConst.SCROLLDIRTYPE_NONE;
		}
	};

	_pScrollManager._getPartItemViewStart = function () {
		return this.viewstart;
	};
	_pScrollManager._getPartItemViewCount = function () {
		return this.viewcount;
	};
	_pScrollManager._getPartItemPrevCount = function () {
		return this.prevcount;
	};
	_pScrollManager._getPartItemNextCount = function () {
		return this.nextcount;
	};
	_pScrollManager._getPartItemFullStart = function () {
		return this.fullstart;
	};
	_pScrollManager._getPartItemFullCount = function () {
		return this.fullcount;
	};
	_pScrollManager._setPartItemViewStart = function (index) {
		this.viewstart = index;
	};
	_pScrollManager._setPartItemViewCount = function (count) {
		this.viewcount = count;
	};
	_pScrollManager._setPartItemPrevCount = function (count) {
		this.prevcount = count;
	};
	_pScrollManager._setPartItemNextCount = function (count) {
		this.nextcount = count;
	};
	_pScrollManager._setPartItemFullStart = function (index) {
		this.fullstart = index;
	};
	_pScrollManager._setPartItemFullCount = function (count) {
		this.fullcount = count;
	};

	_pScrollManager._getItemScrollFixLeadCount = function () {
		return this.fixlcount;
	};
	_pScrollManager._getItemScrollFixTailCount = function () {
		return this.fixtcount;
	};
	_pScrollManager._setItemScrollFixLeadCount = function (count) {
		return this.fixlcount = count;
	};
	_pScrollManager._setItemScrollFixTailCount = function (count) {
		return this.fixtcount = count;
	};

	_pScrollManager._setScrollClear = function () {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_INIT;
	};
	_pScrollManager._setScrollReady = function (type, hinfo, vinfo) {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_READY;

		if (this.isEventFrame()) {
			this._setEventFrameReady();
		}

		var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
		var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

		if (ctrl & 1) {
			this.eventtarget._onHScrollReady(this.hscrollctrl, mode, this.hscrollinfo = hinfo);
		}
		if (ctrl & 2) {
			this.eventtarget._onVScrollReady(this.vscrollctrl, mode, this.vscrollinfo = vinfo);
		}
	};
	_pScrollManager._setScrollStart = function (type, hinfo, vinfo) {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_START;


		var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
		var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

		if (ctrl & 1) {
			this.eventtarget._onHScrollStart(this.hscrollctrl, mode, this.hscrollinfo = hinfo);
		}
		if (ctrl & 2) {
			this.eventtarget._onVScrollStart(this.vscrollctrl, mode, this.vscrollinfo = vinfo);
		}

		if (this.isEventFrame()) {
			this._setEventFrameStart();
		}
	};
	_pScrollManager._setScrollScroll = function (type, hinfo, vinfo) {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_SCROLL;


		var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
		var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

		if (ctrl & 1) {
			this.eventtarget._onHScrollScroll(this.hscrollctrl, mode, this.hscrollinfo = hinfo);
		}
		if (ctrl & 2) {
			this.eventtarget._onVScrollScroll(this.vscrollctrl, mode, this.vscrollinfo = vinfo);
		}

		if (this.isEventFrame()) {
			this._setEventFrameStart();
		}
	};
	_pScrollManager._setScrollUpdate = function (type, hinfo, vinfo) {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_UPDATE;


		if (this.isEventFrame()) {
			this._setEventFrameStop();
		}

		var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
		var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

		if (ctrl & 1) {
			this.eventtarget._onHScrollUpdate(this.hscrollctrl, mode, this.hscrollinfo = hinfo);
		}
		if (ctrl & 2) {
			this.eventtarget._onVScrollUpdate(this.vscrollctrl, mode, this.vscrollinfo = vinfo);
		}



		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_READY;
	};
	_pScrollManager._setScrollFinish = function (type, hinfo, vinfo) {
		this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_FINISH;

		if (this.isEventFrame()) {
			this._setEventFrameFinish();
		}

		var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
		var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

		if (ctrl & 1) {
			this.eventtarget._onHScrollFinish(this.hscrollctrl, mode, this.hscrollinfo);
		}
		if (ctrl & 2) {
			this.eventtarget._onVScrollFinish(this.vscrollctrl, mode, this.vscrollinfo);
		}
	};

	_pScrollManager._isInitTrackCover = function () {
		return this._setcoverbimg && this._setcoversize;
	};
	_pScrollManager._isInitTrackBands = function () {
		return this._setbandslist && this._setbandssize;
	};
	_pScrollManager._isInitStickItems = function () {
		return this._setstickitem && this._setsticksize;
	};

	_pScrollManager._fetchTrackBarSize = function () {
		if (this.rowfirst) {
			this._trackbarsize = this.hscrollctrl ? this.hscrollctrl.trackbar.getPixelWidth() : 0;
		}
		else {
			this._trackbarsize = this.vscrollctrl ? this.vscrollctrl.trackbar.getPixelHeight() : 0;
		}
	};
	_pScrollManager._fetchTrackBarBase = function () {
		if (this.rowfirst) {
			this._trackbarbase = this.hscrollctrl ? this.hscrollctrl.trackbar.getOffsetLeft() : 0;
		}
		else {
			this._trackbarbase = this.vscrollctrl ? this.vscrollctrl.trackbar.getOffsetTop() : 0;
		}
	};

	_pScrollManager._getTrackBandLeft = function (band, halign) {
		this._fetchTrackBarSize();
		this._fetchTrackBarBase();

		var bwidth = band.getPixelWidth();
		var bleft = band.left ? band.left : 0;
		var bright = band.right ? band.right : 0;

		if (this.rowfirst) {
			switch (halign) {
				case nexacro._ScrollConst.SCROLLTRACKPOS_TOP:
					{
						return bleft;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM:
					{
						return this._trackbandbwd - bwidth - bright;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE:
					{
						return this._trackbandbwd / 2 - bwidth / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP:
					{
						return this._trackbarbase;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM:
					{
						return this._trackbarbase + this._trackbarsize - bwidth;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE:
					{
						return this._trackbarbase + this._trackbarsize / 2 - bwidth / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_NONE:
				default:
			}
		}
		else {
			switch (halign) {
				case nexacro._ScrollConst.SCROLLTRACKPOS_LEAD:
					{
						return bleft;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TAIL:
					{
						return this._trackbandbwd - bwidth - bright;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_CENTER:
					{
						return this._trackbandbwd / 2 - bwidth / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_NONE:
				default:
			}
		}
	};
	_pScrollManager._getTrackBandTop = function (band, valign) {
		this._fetchTrackBarSize();
		this._fetchTrackBarBase();

		var bheight = band.getPixelHeight();
		var btop = band.top ? band.top : 0;
		var bbottom = band.bottom ? band.bottom : 0;

		if (this.rowfirst) {
			switch (valign) {
				case nexacro._ScrollConst.SCROLLTRACKPOS_LEAD:
					{
						return btop;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TAIL:
					{
						return this._trackbandbht - bheight - bbottom;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_CENTER:
					{
						return this._trackbandbht / 2 - bheight / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_NONE:
				default:
			}
		}
		else {
			switch (valign) {
				case nexacro._ScrollConst.SCROLLTRACKPOS_TOP:
					{
						return btop;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM:
					{
						return this._trackbandbht - bheight - bbottom;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE:
					{
						return this._trackbandbht / 2 - bheight / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP:
					{
						return this._trackbarbase;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM:
					{
						return this._trackbarbase + this._trackbarsize - bheight;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE:
					{
						return this._trackbarbase + this._trackbarsize / 2 - bheight / 2;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_NONE:
				default:
			}
		}
	};

	_pScrollManager._initTrackCover = function (owner, background, width, height) {
		if (!owner) {
			return;
		}
		this._owner = owner;

		switch (this.covertype) {
			case 0:
				this._clearScrollTrackCover();
				break;
			case 1:
			case 2:
			case 3:
				{

					if (!this._trackcoverem) {
						this._trackcoverow = owner.getElement();
						this._trackcoverem = new nexacro.ControlElement(owner._control_element);
						this._trackcovereb = new nexacro.ControlElement(owner._control_element);
						this._trackcoverem.name = "trackcover";
						this._trackcovereb.name = "trackback";
						this._trackcoverem._is_simple_control = true;
						this._trackcovereb._is_simple_control = true;
						this._trackcoverem._is_nc_element = false;
						this._trackcovereb._is_nc_element = false;
						this._trackcoverem.create(owner._getWindow());
						this._trackcovereb.create(owner._getWindow());
					}

					if (this._trackcoverem && this._trackcovereb) {
						if (nexacro._Browser == "Runtime") {
							if (!this._setcoverbimg && background) {
								this._trackcoverem.setElementBackground(background);
								this._trackcoverem.setElementOpacity(nexacro.OpacityObject(0.5));
								this._trackcovereb.setElementBackground(nexacro.BackgroundObject("white", owner));
								this._trackcovereb.setElementOpacity(nexacro.OpacityObject(1.0));
								this._setcoverbimg = true;
							}
							if (!this._setcoversize) {
								this._trackcovereb.setElementZIndex(1);
								this._trackcoverem.setElementZIndex(2);
								this._trackcovereb.setElementSize(width, height);
								this._trackcoverem.setElementSize(width, height);
								this._setcoversize = true;
							}
						}
						else {
							if (!this._setcoverbimg && background) {
								this._trackcoverem.setElementBackground(background);
								this._trackcoverem.setElementOpacity(nexacro.OpacityObject(0.5));
								this._trackcovereb.setElementBackground(nexacro.BackgroundObject("white", owner));
								this._trackcovereb.setElementOpacity(nexacro.OpacityObject(1.0));
								this._setcoverbimg = true;
							}
							if (!this._setcoversize) {
								this._trackcoverow.bringToFrontElement(this._trackcovereb);
								this._trackcoverow.bringToFrontElement(this._trackcoverem);
								this._trackcovereb.setElementSize(width, height);
								this._trackcoverem.setElementSize(width, height);
								this._setcoversize = true;
							}
						}

						this._trackcoverwd = width;
						this._trackcoverht = height;
					}
					break;
				}
			case 4:
				{

					if (!this._trackcoverow) {
						this._trackcoverow = owner.getElement();
					}

					if (!this._trackcovereb) {
						this._trackcovereb = new nexacro.ControlElement(owner._control_element);
						this._trackcovereb.name = "trackback";
						this._trackcovereb._is_simple_control = true;
						this._trackcovereb._is_nc_element = false;
						this._trackcovereb.create(owner._getWindow());

						this._trackcovereb.setElementBackground(nexacro.BackgroundObject("white", owner));
						this._trackcovereb.setElementOpacity(nexacro.OpacityObject(0.8));

						this._setcoverbimg = true;
					}

					if (!this._setcoversize) {
						this._trackcoverow.bringToFrontElement(this._trackcovereb);
						this._trackcovereb.setElementSize(width, height);

						this._setcoversize = true;
					}

					this._trackcoverwd = width;
					this._trackcoverht = height;

					break;
				}
		}

		this._actionTrackCover("trackinit");
	};
	_pScrollManager._actionTrackCover = function (trigger) {
		switch (trigger) {
			case "trackinit":
			case "trackend":
			case "trackended":
				{

					this._hideTrackCover();
					break;
				}
			case "trackstart":
			case "trackbegun":
			case "trackmove":
			case "trackmoved":
			case "trackwheel":
			case "trackpause":
				{

					this._showTrackCover();
					break;
				}
		}
	};
	_pScrollManager._showTrackCover = function () {
		if (this._trackcovereb) {
			this._trackcovereb.setElementVisible(true);
		}

		if (this._trackcoverem) {
			this._trackcoverem.setElementVisible(true);
		}
	};
	_pScrollManager._moveTrackCover = function () {
		if (this._trackcoverow) {
			if (this._trackcovereb) {
				this._trackcoverow.bringToFrontElement(this._trackcovereb);
			}

			if (this._trackcoverem) {
				this._trackcoverow.bringToFrontElement(this._trackcoverem);
			}
		}
	};
	_pScrollManager._hideTrackCover = function () {
		if (this._trackcovereb) {
			this._trackcovereb.setElementVisible(false);
		}

		if (this._trackcoverem) {
			this._trackcoverem.setElementVisible(false);
		}
	};
	_pScrollManager._sizeTrackCover = function (width, height) {
		if (this._trackcovereb) {
			this._trackcovereb.setElementSize(width, height);
		}

		if (this._trackcoverem) {
			this._trackcoverem.setElementSize(width, height);
		}
	};

	_pScrollManager._initTrackBands = function (bandowner, bandlist, basewidth, baseheight) {
		if (!bandowner) {
			return;
		}
		this._owner = bandowner;

		if (!this._setbandslist && bandlist) {
			this._clearScrollTrackBands();

			this._trackbandsow = bandowner;
			this._trackbandlst = bandlist;

			var nt = this.tracktype.length;
			var nl = this.trackloct.length;

			for (var i = 0, l = bandlist.length; i < l; i++) {
				var band = bandlist[i];
				var type = nt ? this.tracktype[i % nt] : 0;
				var loct = nl ? this.trackloct[i % nl] : 0;
				var haln = loct & nexacro._ScrollConst.SCROLLTRACKPOS_HORZMASK;
				var valn = loct & nexacro._ScrollConst.SCROLLTRACKPOS_VERTMASK;
				var item = {
					band : band, 
					type : type, 
					halign : haln, 
					valign : valn
				};

				if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS) {
					this._trackbandalw.push(item);
				}
				if (type != nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS) {
					this._trackbandout.push(item);
				}
				if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN) {
					this._trackbandstt.push(item);
				}
				if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED) {
					this._trackbandtrk.push(item);
				}
				if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED) {
					this._trackbandend.push(item);
				}
			}

			this._setbandslist = true;
		}

		if (!this._setbandssize) {
			var child = bandowner._getItemChildByIndex(this._getPartItemViewStart(), 0, 0);

			var trackbandwidth = child ? child.getOffsetWidth() : 0;
			var trackbandheight = child ? child.getOffsetHeight() : 0;

			if (this._trackbandalw.length) {
				this._sizeTrackBands(this._trackbandalw, trackbandwidth, trackbandheight);
			}
			if (this._trackbandout.length) {
				this._sizeTrackBands(this._trackbandout, trackbandwidth, trackbandheight);
			}
			if (this._trackbandstt.length) {
				this._sizeTrackBands(this._trackbandstt, trackbandwidth, trackbandheight);
			}
			if (this._trackbandtrk.length) {
				this._sizeTrackBands(this._trackbandtrk, trackbandwidth, trackbandheight);
			}
			if (this._trackbandend.length) {
				this._sizeTrackBands(this._trackbandend, trackbandwidth, trackbandheight);
			}

			this._setbandssize = true;
		}

		this._trackbandbwd = basewidth;
		this._trackbandbht = baseheight;

		this._actionTrackBands("trackinit");
	};
	_pScrollManager._actionTrackBands = function (trigger) {
		switch (trigger) {
			case "trackinit":
				{

					if (this._trackbandalw.length) {
						this._takeTrackBands(this._trackbandalw);
						this._moveTrackBands(this._trackbandalw);
						this._showTrackBands(this._trackbandalw);
					}
					if (this._trackbandout.length) {
						this._hideTrackBands(this._trackbandout);
					}
					break;
				}
			case "trackstart":
			case "trackbegun":
				{

					if (this._trackbandstt.length) {
						this._takeTrackBands(this._trackbandstt);
						this._moveTrackBands(this._trackbandstt);
						this._showTrackBands(this._trackbandstt);
					}
					break;
				}
			case "trackmove":
			case "trackmoved":
			case "trackwheel":
			case "trackpause":
				{

					if (this._trackbandtrk.length) {
						this._takeTrackBands(this._trackbandtrk);
						this._moveTrackBands(this._trackbandtrk);
						this._showTrackBands(this._trackbandtrk);
					}
					break;
				}
			case "trackend":
			case "trackended":
				{

					if (this._trackbandout.length) {
						this._hideTrackBands(this._trackbandout);
					}
					if (this._trackbandend.length) {
						this._takeTrackBands(this._trackbandend);
						this._moveTrackBands(this._trackbandend);
						this._showTrackBands(this._trackbandend);
					}
					break;
				}
		}
	};
	_pScrollManager._showTrackBands = function (bands) {
		if (bands) {
			if (bands.length) {
				for (var i = 0, l = bands.length; i < l; i++) {
					this._showTrackBands(bands[i]);
				}
			}
			else if (bands.band) {
				bands.band.set_visible(true);
			}
		}
	};
	_pScrollManager._hideTrackBands = function (bands) {
		if (bands) {
			if (bands.length) {
				for (var i = 0, l = bands.length; i < l; i++) {
					this._hideTrackBands(bands[i]);
				}
			}
			else if (bands.band) {
				bands.band.set_visible(false);
			}
		}
	};
	_pScrollManager._sizeTrackBands = function (bands, basew, baseh) {
		if (bands) {
			if (bands.length) {
				for (var i = 0, l = bands.length; i < l; i++) {
					this._sizeTrackBands(bands[i], basew, baseh);
				}
			}
			else if (bands.band) {
				bands.band.resize(basew, baseh);
			}
		}
	};
	_pScrollManager._moveTrackBands = function (bands, movel, movet) {
		if (bands) {
			if (bands.length) {
				for (var i = 0, l = bands.length; i < l; i++) {
					this._moveTrackBands(bands[i], movel, movet);
				}
			}
			else if (bands.band) {
				bands.band.move(movel != undefined ? movel : this._getTrackBandLeft(bands.band, bands.halign), movet != undefined ? movet : this._getTrackBandTop(bands.band, bands.valign));
			}
		}
	};
	_pScrollManager._takeTrackBands = function (bandlist) {
		if (this._trackbandsow && bandlist) {
			for (var i = 0, l = bandlist.length; i < l; i++) {
				var item = bandlist[0];
				if (!item) {
					continue;
				}

				var loc = this.rowfirst ? item.halign : item.valign;
				var idx = this._trackbandsow._getScrollTrackIndex(loc);

				this._trackbandsow._updateItem(item.band, idx);
			}
		}
	};

	_pScrollManager._actionTrack = function (action, owner, callbackApper, callbackPause, callbackClose) {
		this._actionTrackCover(action);
		this._actionTrackBands(action);

		var async = action != "trackend";
		var short = action == "trackwheel";

		if (short) {
			this._callbackApper(owner, callbackApper, async);
		}
		else {
			this._callbackApper(owner, callbackApper, async);
			this._callbackPause(owner, callbackPause, async);
			this._callbackClose(owner, callbackClose, async);
		}
	};

	_pScrollManager._actionReady = function (action, owner, callbackReady) {
		this._actionTrackCover(action);
		this._actionTrackBands(action);

		this._callbackReady(owner, callbackReady, true);
	};


	_pScrollManager._callbackApper = function (owner, callback, async) {
		this._clearTrackTimerApper();

		if (async) {
			this._appertimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.appertime);
		}
		else {
			callback.call(owner);
		}
	};
	_pScrollManager._callbackPause = function (owner, callback, async) {
		this._clearTrackTimerPause();

		if (async) {
			this._pausetimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.covertime);
		}
		else {
			callback.call(owner);
		}
	};
	_pScrollManager._callbackClose = function (owner, callback, async) {
		this._clearTrackTimerClose();

		if (async) {
			this._closetimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.tracktime);
		}
		else {
			callback.call(owner);
		}
	};
	_pScrollManager._callbackReady = function (owner, callback, async) {
		this._clearTrackTimerReady();

		if (async) {
			this._readytimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.readytime);
		}
		else {
			callback.call(owner);
		}
	};

	_pScrollManager._initStickItems = function (itemowner, leaditemlist, tailitemlist, basewidth, baseheight) {
		if (!itemowner) {
			return;
		}
		this._owner = itemowner;

		if (!this._setstickitem) {
			this._stickitemsow = itemowner.getElement();
			this._stickitemlead = leaditemlist;
			this._stickitemtail = tailitemlist;

			this._setstickitem = true;
		}

		if (!this._setsticksize) {
			this._sizeStickItems(leaditemlist, basewidth, baseheight);
			this._sizeStickItems(tailitemlist, basewidth, baseheight);

			this._setsticksize = true;
		}

		this._stickitembwd = basewidth;
		this._stickitembht = baseheight;

		this._actionStickItems("stickinit");
	};
	_pScrollManager._actionStickItems = function (trigger) {
		switch (trigger) {
			case "stickinit":
			case "stickstart":
				{

					this._showStickItemLead();
					this._showStickItemTail();
					break;
				}
			case "showsticklead":
				{

					this._showStickItemLead();
					break;
				}
			case "showsticktail":
				{

					this._showStickItemTail();
					break;
				}
			case "hidesticklead":
				{

					this._hideStickItemLead();
					break;
				}
			case "hidesticktail":
				{

					this._hideStickItemTail();
					break;
				}
			case "stickend":
				{

					this._hideStickItemLead();
					this._hideStickItemTail();
					break;
				}
		}
	};
	_pScrollManager._showStickItemLead = function (vpos, hpos) {
		var owne = this._stickitemsow;
		var lead = this._stickitemlead;
		var flxl = this.fixlcount;

		if (lead && flxl && owne) {
			var l = this.rowfirst ? hpos : 0;
			var t = this.rowfirst ? 0 : vpos;

			for (var i = 0, n = Math.min(lead.length, flxl); i < n; i++) {
				var items = this._getOwnerItem(lead[i]);
				if (items) {
					for (var c = 0, m = items.length; c < m; c++) {
						var item = items[c];
						if (item && item._setPositionFixed) {
							var elem = item.getElement();
							if (elem) {
								item._setPositionFixed(item.parent, l, t);
								elem.setElementVisible(true);
							}
						}
					}
				}
			}
		}
	};
	_pScrollManager._showStickItemTail = function (vpos, hpos) {
		var owne = this._stickitemsow;
		var tail = this._stickitemtail;
		var flxt = this.fixtcount;

		if (tail && flxt && owne) {
			var l = this.rowfirst ? hpos : 0;
			var t = this.rowfirst ? 0 : vpos;

			for (var i = 0, n = Math.min(tail.length, flxt); i < n; i++) {
				var items = this._getOwnerItem(tail[i]);
				if (items) {
					for (var c = 0, m = items.length; c < m; c++) {
						var item = items[c];
						if (item && item._setPositionFixed) {
							var elem = item.getElement();
							if (elem) {
								item._setPositionFixed(item.parent, l, t);
								elem.setElementVisible(true);
							}
						}
					}
				}
			}
		}
	};
	_pScrollManager._hideStickItemLead = function (vpos, hpos) {
		var lead = this._stickitemlead;
		var flxl = this.fixlcount;

		if (lead && flxl) {
			for (var i = 0, n = Math.min(lead.length, flxl); i < n; i++) {
				var index = lead[i];
				var items = this._getOwnerItem(index);
				if (items) {
					for (var c = 0, m = items.length; c < m; c++) {
						var item = items[c];
						if (item && item._setPositionAbsolute) {
							var elem = item.getElement();
							if (elem) {
								item._setPositionAbsolute(item.parent, index);
								elem.setElementVisible(false);
							}
						}
					}
				}
			}
		}
	};
	_pScrollManager._hideStickItemTail = function (vpos, hpos) {
		var tail = this._stickitemtail;
		var flxt = this.fixtcount;

		if (tail && flxt) {
			for (var i = 0, n = Math.min(tail.length, flxt); i < n; i++) {
				var index = tail[i];
				var items = this._getOwnerItem(index);
				if (items) {
					for (var c = 0, m = items.length; c < m; c++) {
						var item = items[c];
						if (item && item._setPositionAbsolute) {
							var elem = item.getElement();
							if (elem) {
								item._setPositionAbsolute(item.parent, index);
								elem.setElementVisible(false);
							}
						}
					}
				}
			}
		}
	};
	_pScrollManager._sizeStickItems = function (items, width, height) {
		if (this._stickitemlead && this._stickitemtail) {
		}
	};
	_pScrollManager._clearStickItems = function () {
		if (this._stickitemlead) {
			this._stickitemlead = [];
		}
		if (this._stickitemtail) {
			this._stickitemtail = [];
		}

		this._stickitemsow = null;
		this._setstickitem = false;
		this._setsticksize = false;
		this._stickitembwd = 0;
		this._stickitembht = 0;
	};
	_pScrollManager._actionStick = function (action, owner, callbackStick) {
		this._actionStickItems(action);

		this._callbackStick(owner, callbackStick, true);
	};
	_pScrollManager._callbackStick = function (owner, callback, async) {
		this._clearStickTimer();

		if (async) {
			this._sticktimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.sticktime);
		}
		else {
			callback.call(owner);
		}
	};
	_pScrollManager._clearStickTimer = function () {
		if (this._sticktimer) {
			this._sticktimer.destroy();
			delete this._sticktimer;
			this._sticktimer = null;
		}
	};

	_pScrollManager._recalcLayout = function () {
		if (this._owner) {
			if (this._owner._resetLayoutTrack) {
				this._owner._resetLayoutTrack();
			}
			if (this._owner._resetLayoutStick) {
				this._owner._resetLayoutStick();
			}
		}
	};
	_pScrollManager._resetLayoutSize = function () {
	};
	_pScrollManager._resetLayoutBImg = function () {
		this._setcoversize = false;
		this._setcoverbimg = false;
	};
	_pScrollManager._resetLayoutBand = function () {
		this._setbandslist = false;
		this._setbandssize = false;
	};

	_pScrollManager._getOwnerItem = function (index) {
		if (this._owner && this._owner._getItem) {
			var item = this._owner._getItem(index, true);
			if (item) {
				return nexacro._isArray(item) ? item : [item];
			}
		}
		return null;
	};

	delete _pScrollManager;
}

if (!nexacro._ExpandManager) {
	nexacro._ExpandConst = 
		{
		EXPANDSTAT_INIT : 0, 
		EXPANDSTAT_READY : 1, 
		EXPANDSTAT_EXPAND : 2, 
		EXPANDSTAT_UPDATE : 3, 
		EXPANDSTAT_FINISH : 4, 
		EXPANDSTAT_FINAL : 0, 

		EXPANDDIRTYPE_NONE : 0, 
		EXPANDDIRTYPE_HORZ : 1, 
		EXPANDDIRTYPE_VERT : 2, 
		EXPANDDIRTYPE_CONR : 3, 
		EXPANDDIRTYPE_CONVERT : 
			{
			"none" : 0x0000, 
			"horz" : 0x0001, 
			"horzental" : 0x0001, 
			"vert" : 0x0002, 
			"vertical" : 0x0002, 
			"corner" : 0x0003
		}, 

		EXPANDACTTYPE_NONE : 0x0000, 
		EXPANDACTTYPE_CLICK : 0x0010, 
		EXPANDACTTYPE_HOVER : 0x0020, 
		EXPANDACTTYPE_POPUP : 0x0040, 
		EXPANDACTTYPE_MASK : 0x00F0, 
		EXPANDACTTYPE_CONVERT : 
			{
			"none" : 0x0000, 
			"click" : 0x0010, 
			"hover" : 0x0020, 
			"popup" : 0x0040
		}, 

		EXPANDCTRLSET_NONE : 0, 
		EXPANDCTRLSET_BUTTON : 1, 
		EXPANDCTRLSET_CHECK : 2, 
		EXPANDCTRLSET_CUSTOM : 3, 
		EXPANDCTRLSET_CONVERT : 
			{
			"none" : 0x0000, 
			"button" : 0x0001, 
			"check" : 0x0002, 
			"custom" : 0x0003
		}, 

		EXPANDVISIBLE_NONE : 0x0000, 
		EXPANDVISIBLE_AUTO : 0x0001, 
		EXPANDVISIBLE_FIXED : 0x0004, 
		EXPANDVISIBLE_CONST : 0x0010, 
		EXPANDVISIBLE_NOSCROLL : 0x0040, 
		EXPANDVISIBLE_DEFAULT : 0x1000, 
		EXPANDVISIBLE_CONVERT : 
			{
			"none" : 0x0000, 
			"auto" : 0x0001, 
			"fixed" : 0x0040, 
			"const" : 0x0100, 
			"default" : 0x1000
		}, 

		EXPANDARRANGE_DEFAULT : 0, 
		EXPANDARRANGE_OPPSITE : 1, 
		EXPANDARRANGE_CLABOVE : 2, 
		EXPANDARRANGE_CONVERT : 
			{
			"default" : 0x0000, 
			"opposite" : 0x0001, 
			"above" : 0x0002
		}, 

		EXPANDCONST_END : -1
	};

	nexacro._ExpandManager = function () {
		this.expandtype = 0;
		this.expandmode = 0;
		this.expandstat = 0;

		this.ctrlsettype = 0;

		this.ctrlvisible = 0;
		this.ctrlarrange = 0;

		this.expandctrl = null;
		this.eventtarget = null;

		this.expandctxt = null;
		this.expandinfo = null;
	};

	var _pExpandManager = nexacro._createPrototype(Object, nexacro._ExpandManager);
	nexacro._ExpandManager.prototype = _pExpandManager;
	_pExpandManager._type_name = "_ExpandManager";




	_pExpandManager.isInited = function () {
		return this.expandstat != 0;
	};
	_pExpandManager.isReady = function () {
		return this.expandstat == 1;
	};
	_pExpandManager.isExpanding = function () {
		return this.expandstat == 2;
	};

	_pExpandManager._convertExpandDirType = function (dirtype) {
		return dirtype ? nexacro._ExpandConst.EXPANDDIRTYPE_CONVERT[dirtype] : nexacro._ExpandConst.EXPANDDIRTYPE_NONE;
	};
	_pExpandManager._convertExpandActType = function (acttype) {
		return acttype ? nexacro._ExpandConst.EXPANDACTTYPE_CONVERT[acttype] : nexacro._ExpandConst.EXPANDACTTYPE_CLICK;
	};
	_pExpandManager._convertExpandCtrlSet = function (ctrlset) {
		return ctrlset ? nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[ctrlset] : nexacro._ExpandConst.EXPANDCTRLSET_BUTTON;
	};
	_pExpandManager._convertExpandVisible = function (visible) {
		return visible ? nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[visible] : nexacro._ExpandConst.EXPANDVISIBLE_CONST;
	};
	_pExpandManager._convertExpandArrange = function (arrange) {
		return arrange ? nexacro._ExpandConst.EXPANDARRANGE_CONVERT[arrange] : nexacro._ExpandConst.EXPANDARRANGE_DEFAULT;
	};

	_pExpandManager.setExpand = function (stat, type, info) {
		if (this.expandstat == stat) {
			return this.onRecurrStatus(stat, type, info);
		}
		else {
			return this.onChangeStatus(this.expandstat, stat, type, info);
		}
	};

	_pExpandManager._checkRecurring = function (type, hinfo, vinfo) {
		return false;
	};

	_pExpandManager.onRecurrStatus = function (curstat, type, info) {
		if (this._checkRecurring(type, info)) {
			return false;
		}

		switch (curstat) {
			case 0:
				this._setExpandClear();
				break;
			case 1:
				this._setExpandReady(type, info);
				break;
			case 2:
				this._setExpandExpand(type, info);
				break;
			case 3:
				this._setExpandUpdate(type, info);
				break;
			case 4:
				this._setExpandFinish(type, info);
				break;
		}
	};

	_pExpandManager.onChangeStatus = function (oldstat, newstat, type, info) {
		switch (oldstat) {
			case 4:
			case 0:
				{

					switch (newstat) {
						case 1:
							this._setExpandReady(type, info);
							break;
						case 2:
							this._setExpandReady(type, info);
							this._setExpandExpand(type, info);
							break;
						case 3:
							this._setExpandReady(type, info);
							this._setExpandUpdate(type, info);
							break;
						case 4:
							this._setExpandFinish(type, info);
							break;
					}
					break;
				}
			case 1:
				{

					switch (newstat) {
						case 2:
							this._setExpandExpand(type, info);
							break;
						case 3:
							this._setExpandUpdate(type, info);
							break;
						case 4:
							this._setExpandFinish(type, info);
							break;
						case 0:
							this._setExpandFinish(type, info);
							this._setExpandClear();
							break;
					}
					break;
				}
			case 2:
				{

					switch (newstat) {
						case 3:
							this._setExpandUpdate(type, info);
							break;
						case 1:
						case 4:
							this._setExpandFinish(type, info);
							break;
						case 0:
							this._setExpandFinish(type, info);
							this._setExpandClear();
							break;
					}
					break;
				}
			case 3:
				{

					switch (newstat) {
						case 2:
							this._setExpandExpand(type, info);
							break;
						case 1:
						case 4:
							this._setExpandFinish(type, info);
							break;
						case 0:
							this._setExpandFinish(type, info);
							this._setExpandClear();
							break;
					}
					break;
				}
		}
	};

	_pExpandManager._setExpandLayout = function (expandtype, expandmode, ctrlset, ctrlvisible, ctrlarrange) {
		if (this.isInited()) {
			return;
		}

		this.expandtype = this._convertExpandDirType(expandtype);
		this.expandmode = this._convertExpandActType(expandmode);

		this.ctrlsettype = this._convertExpandCtrlSet(ctrlset);

		this.ctrlvisible = this._convertExpandVisible(ctrlvisible);
		this.ctrlarrange = this._convertExpandArrange(ctrlarrange);
	};
	_pExpandManager._setExpandControl = function (ctrl) {
		this.expandctrl = ctrl;
	};
	_pExpandManager._setExpandContext = function (ctxt) {
		this.expandctxt = ctxt;
	};
	_pExpandManager._setExpandEvent = function (target) {
		this.eventtarget = target;
	};
	_pExpandManager._setExpandInfo = function (info) {
		this.expandinfo = info;
	};
	_pExpandManager._clearExpandControl = function () {
		this.expandctrl = null;
	};
	_pExpandManager._clearExpandContext = function () {
		this.expandctxt = null;
	};
	_pExpandManager._clearExpandEvent = function () {
		this.eventtarget = null;
	};
	_pExpandManager._clearExpandInfo = function () {
		this.expnadinfo = null;
	};

	_pExpandManager._getCommandString = function () {
		var str = "";

		if (this.expandctrl) {
			str += this.expandctrl.createCommand();
		}

		return str;
	};
	_pExpandManager._setAttachHandle = function (win) {
		if (this.expandctrl) {
			this.expandctrl.attachHandle(win);
		}
	};


	_pExpandManager._setExpandClear = function () {
		this.expandstat = nexacro._ExpandConst.EXPANDSTAT_INIT;
	};

	_pExpandManager._setExpandReady = function (type, info) {
		this.expandstat = nexacro._ExpandConst.EXPANDSTAT_READY;


		this.eventtarget._onExpandReady(this.expandctrl, type, this.expandinfo = info);
	};
	_pExpandManager._setExpandFinish = function (type, info) {
		this.expandstat = nexacro._ExpandConst.EXPANDSTAT_FINISH;


		this.eventtarget._onExpandFinish(this.expandctrl, type, this.expandinfo);

		this._setExpandReady(type, info);
	};
	_pExpandManager._setExpandExpand = function (type, info) {
		this.expandstat = nexacro._ExpandConst.EXPANDSTAT_EXPAND;


		this.eventtarget._onExpandExpand(this.expandctrl, type, this.expandinfo = info);
	};
	_pExpandManager._setExpandUpdate = function (type, info) {
		this.expandstat = nexacro._ExpandConst.EXPANDSTAT_UPDATE;


		this.eventtarget._onExpandUpdate(this.expandctrl, type, this.expandinfo = info);
	};

	_pExpandManager._recalcLayout = function () {
		this._resetLayoutSize();
	};
	_pExpandManager._resetLayoutSize = function () {
	};
	_pExpandManager._resetLayoutBImg = function () {
	};
	_pExpandManager._resetLayoutBand = function () {
	};

	_pExpandManager._clear = function () {
		this.setExpand(0);

		this._clearExpandControl();
		this._clearExpandContext();
		this._clearExpandEvent();
		this._clearExpandInfo();
	};

	delete _pExpandManager;
}


if (!nexacro._SelectManager) {
}


if (!nexacro.ComplexComponent) {
	nexacro.ComplexComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		this._setInnerFlags();

		nexacro.SimpleComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pComplexComponent = nexacro._createPrototype(nexacro.SimpleComponent, nexacro.ComplexComponent);
	nexacro.ComplexComponent.prototype = _pComplexComponent;

	_pComplexComponent._type_name = "ComplexComponent";

	_pComplexComponent._is_simple_control = false;

	_pComplexComponent._is_format_layout = false;
	_pComplexComponent._is_panel_layout = false;
	_pComplexComponent._is_child = true;
	_pComplexComponent._is_items = false;


	_pComplexComponent._is_nc_layout = false;





	_pComplexComponent._use_translate_scroll = false;
	_pComplexComponent._use_translate_move = false;
	_pComplexComponent._use_container_move = false;
	_pComplexComponent._use_container_multi = false;












	_pComplexComponent._setInnerFlags = function () {
		this._setUseItems(false, false, false, false, false);

		this._setUseParts(false, 1, 1);

		this._setUseSelect(false);

		this._setUseScroll(false, false);
		this._setUseScrollCover(true);
		this._setUseScrollTrack(true);
		this._setUseScrollStick(true);
		this._setUseScrollTimer(300, 300, 600, 300, 0);

		this._setUseExpand(false, false);
		this._setUseExpandStatus(false);

		this._setUseBind(false, false, false, false, false);
		this._setUseExpr(false, false);
	};

	_pComplexComponent._setUseItems = function (usehead, usetail, usemark, usenull, useclient) {
		this._setUseHead(usehead);
		this._setUseTail(usetail);
		this._setUseMark(usemark);
		this._setUseNull(usenull);
		this._setUseClient(useclient);
	};
	_pComplexComponent._setUseParts = function (usepart, addpart, accpart) {
		this._setUsePart(usepart);

		this._add_partitem = addpart;
		this._acc_partitem = accpart;
	};

	_pComplexComponent._setUseHead = function (usehead) {
		this._use_headitem = usehead;
	};
	_pComplexComponent._setUseTail = function (usetail) {
		this._use_tailitem = usetail;
	};
	_pComplexComponent._setUseMark = function (usemark) {
		this._use_markitem = usemark;
	};
	_pComplexComponent._setUseNull = function (usenull) {
		this._use_nullitem = usenull;
	};
	_pComplexComponent._setUsePart = function (usepart) {
		this._use_partitem = usepart;
	};
	_pComplexComponent._setUseClient = function (useclient) {
		this._use_clientem = useclient;
	};

	_pComplexComponent._setUseSelect = function (useselect) {
		this._use_select = useselect;
		this._use_selected_status = useselect;
	};

	_pComplexComponent._setUseScroll = function (usencscroll, usemanager) {
		this._is_nc_scroll = usencscroll;

		this._is_scrollable = usemanager;
		this._use_scrollmanager = usemanager;
	};
	_pComplexComponent._setUseScrollCover = function (usecover) {
		this._use_scrollcover = usecover;
	};
	_pComplexComponent._setUseScrollTrack = function (usetrack) {
		this._use_scrolltrack = usetrack;
	};
	_pComplexComponent._setUseScrollStick = function (usestick) {
		this._use_scrollstick = usestick;
	};
	_pComplexComponent._setUseScrollTimer = function (appertime, covertime, tracktime, readytime, sticktime) {
		this._timeout_apper = appertime;
		this._timeout_cover = covertime;
		this._timeout_track = tracktime;
		this._timeout_ready = readytime;

		this._timeout_stick = sticktime;
	};

	_pComplexComponent._setUseExpand = function (usencexpand, usemanager) {
		this._is_nc_expand = usencexpand;

		this._is_expandable = usemanager;
		this._use_expandmanager = usemanager;
	};

	_pComplexComponent._setUseExpandStatus = function (useexpandstatus) {
		this._use_expand_status = useexpandstatus;
	};

	_pComplexComponent._setUseBind = function (usedatabind, uselevelbind, usexmlbind, usejsonbind, usefullbind, usedataexpr, usefullexpr) {
		this._is_databind = usedatabind;
		this._is_levelbind = uselevelbind;

		this._is_xmlbind = usexmlbind;
		this._is_jsonbind = usejsonbind;

		this._is_fullbind = usefullbind;
	};
	_pComplexComponent._setUseExpr = function (usedataexpr, usefullexpr) {
		this._is_dataexpr = usedataexpr;
		this._is_fullexpr = usefullexpr;
	};

	_pComplexComponent._default_scrolleventthrottle = nexacro._Browser == "Runtime" ? "none" : "aniframe";
	_pComplexComponent._default_scrollcovertype = "auto";
	_pComplexComponent._default_scrolltracktype = ["trackbegun", "trackmoved"];
	_pComplexComponent._default_scrolltrackalign = ["tail tracktop"];



	_pComplexComponent.onCreateComponent = function () {
		var parentElem = this._getParentElement();

		if (parentElem) {
			var control_elem = this._control_element;
			if (!control_elem) {
				if (this._createControlElement(parentElem)) {
					this._initControlElement();

					this._applyProperties();
					this._applyAccessibility();

					this._initLayouts();
					this._initNCChild();
					this._initBindInfo();
					this._initExprInfo();
					this._initContents();
				}
			}

			return true;
		}
		else {
			return false;
		}
	};

	_pComplexComponent.onCreated = function (window) {
		if (this._is_loading) {
			return;
		}

		var parentElem = this._getParentElement();

		if (parentElem) {
			window = window || this._getWindow();

			if (this._createdControlElement(window)) {
				this._initHotKey();

				if (!this._is_created) {
					this._createdContents(window);
					this._createdNCChild(window);

					this._is_created = true;
				}

				this._initSubLayouts();
				this._recalcLayout(true);

				this._resetStatus();
			}
		}
	};

	_pComplexComponent.onDestroyComponent = function () {
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

		this._destroyPopup();
		this._destroyPopupChild();
		this._destroySelector();
		this._destroySelectorAssist();
		this._destroyNCChild();
		this._destroyLayouts();

		this._destroyControlElement();
	};












	_pComplexComponent._initNCChild = function () {
		this._createNCChild();
	};

	_pComplexComponent._createNCChild = function () {
		if (this._is_nc_scroll) {
			this._createScroll();
		}
		if (this._is_nc_expand) {
			this._createExpand();
		}

		if (this._is_nc_layout) {
			if (this._is_nc_head) {
				this.onCreateNCHeadControl();
			}
			if (this._is_nc_foot) {
				this.onCreateNCFootControl();
			}
			if (this._is_nc_lead) {
				this.onCreateNCLeadControl();
			}
			if (this._is_nc_tail) {
				this.onCreateNCTailControl();
			}

			if (this._is_nc_leadtop) {
				this.onCreateNCLeadTopControl();
			}
			if (this._is_nc_leadbottom) {
				this.onCreateNCLeadBottomControl();
			}
			if (this._is_nc_tailtop) {
				this.onCreateNCTailTopControl();
			}
			if (this._is_nc_tailbottom) {
				this.onCreateNCTailBottomControl();
			}
		}
	};

	_pComplexComponent.onCreateNCHeadControl = function () {
	};
	_pComplexComponent.onCreateNCFootControl = function () {
	};
	_pComplexComponent.onCreateNCLeadControl = function () {
	};
	_pComplexComponent.onCreateNCTailControl = function () {
	};
	_pComplexComponent.onCreateNCLeadTopControl = function () {
	};
	_pComplexComponent.onCreateNCLeadBottomControl = function () {
	};
	_pComplexComponent.onCreateNCTailTopControl = function () {
	};
	_pComplexComponent.onCreateNCTailBottomControl = function () {
	};

	_pComplexComponent.createNCHeadControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._nchead = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCFootControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._ncfoot = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCLeadControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._nclead = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCTailControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._nctail = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCLeadTopControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._ncleadtop = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCLeadBottomControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._ncleadbottom = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCTailTopControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._nctailtop = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};
	_pComplexComponent.createNCTailBottomControl = function (ctrl) {
		if (ctrl && ctrl.createComponent(true)) {
			this._nctailbottom = ctrl;
			return ctrl;
		}
		else {
			return null;
		}
	};

	_pComplexComponent._createdNCChild = function (window) {
		if (this._is_nc_scroll) {
			this._createdScroll(window);
		}
		if (this._is_nc_expand) {
			this._createdExpand(window);
		}

		if (this._is_nc_layout) {
			this._onCreatedNCChild(window);
		}
	};

	_pComplexComponent._onCreatedNCChild = function (window) {
		if (this._is_nc_head && this._nchead) {
			this._nchead.onCreated(window);
		}
		if (this._is_nc_foot && this._ncfoot) {
			this._ncfoot.onCreated(window);
		}
		if (this._is_nc_lead && this._nclead) {
			this._nclead.onCreated(window);
		}
		if (this._is_nc_tail && this._nctail) {
			this._nctail.onCreated(window);
		}

		if (this._is_nc_leadtop && this._nclt) {
			this._nclt.onCreated(window);
		}
		if (this._is_nc_leadbottom && this._nclb) {
			this._nclb.onCreated(window);
		}
		if (this._is_nc_tailtop && this._ncrt) {
			this._ncrt.onCreated(window);
		}
		if (this._is_nc_tailbottom && this._ncrb) {
			this._ncrb.onCreated(window);
		}
	};

	_pComplexComponent._updateNCChild = function () {
	};

	_pComplexComponent._resetNCChild = function (before) {
		var r = before;

		if (this._is_scrollable && this._is_nc_scroll) {
			r = this._resetScroll(before) || r;
		}
		if (this._is_expandable && this._is_nc_expand) {
			r = this._resetExpand(before) || r;
		}
		if (this._is_nc_layout) {
			r = this._onResetNCChild(before) || r;
		}

		return r;
	};

	_pComplexComponent._onResetNCChild = function (before) {
		return false;
	};
	_pComplexComponent._onGetNCHeadControlHeight = function (before) {
		return this._nchead.getPixelHeight();
	};
	_pComplexComponent._onGetNCFootControlHeight = function (before) {
		return this._ncfoot.getPixelHeight();
	};
	_pComplexComponent._onGetNCLeadControlWidth = function (before) {
		return this._nclead.getPixelWidth();
	};
	_pComplexComponent._onGetNCTailControlWidth = function (before) {
		return this._nclead.getPixelWidth();
	};

	_pComplexComponent._getNCChildren = function () {
		var children = [];

		if (this._is_nc_scroll) {
			if (this.vscrollbar && this.vscrollbar.visible) {
				children.push(this.vscrollbar);
			}
			if (this.hscrollbar && this.hscrollbar.visible) {
				children.push(this.hscrollbar);
			}
		}
		if (this._is_nc_expand) {
			if (this.expandbar && this.expandbar.visible) {
				children.push(this.expandbar);
			}
		}

		if (this._is_nc_head && this._nchead) {
			children.push(this._nchead);
		}
		if (this._is_nc_foot && this._ncfoot) {
			children.push(this._ncfoot);
		}
		if (this._is_nc_lead && this._nclead) {
			children.push(this._nclead);
		}
		if (this._is_nc_tail && this._nctail) {
			children.push(this._nctail);
		}

		if (this._is_nc_leadtop && this._nclt) {
			children.push(this._nclt);
		}
		if (this._is_nc_leadbottom && this._nclb) {
			children.push(this._nclb);
		}
		if (this._is_nc_tailtop && this._ncrt) {
			children.push(this._ncrt);
		}
		if (this._is_nc_tailbottom && this._ncrb) {
			children.push(this._ncrb);
		}

		return children;
	};
	_pComplexComponent._destroyNCChild = function () {
		if (this._is_nc_scroll) {
			this._destroyScroll();
		}
		if (this._is_nc_expand) {
			this._destroyExpand();
		}

		if (this._is_nc_layout) {
			this._onDestroyNCChild();
		}
	};

	_pComplexComponent._onDestroyNCChild = function () {
		if (this._is_nc_head && this._nchead) {
			this.onDestroyNCHeadControl();
			this._nchead = null;
		}
		if (this._is_nc_foot && this._ncfoot) {
			this.onDestroyNCFootControl();
			this._ncfoot = null;
		}
		if (this._is_nc_lead && this._nclead) {
			this.onDestroyNCLeadControl();
			this._nclead = null;
		}
		if (this._is_nc_tail && this._nctail) {
			this.onDestroyNCTailControl();
			this._nctail = null;
		}

		if (this._is_nc_leadtop && this._nclt) {
			this.onDestroyNCLeadTopControl();
			this._nclt = null;
		}
		if (this._is_nc_leadbottom && this._nclb) {
			this.onDestroyNCLeadBottomControl();
			this._nclb = null;
		}
		if (this._is_nc_tailtop && this._ncrt) {
			this.onDestroyNCTailTopControl();
			this._ncrt = null;
		}
		if (this._is_nc_tailbottom && this._ncrb) {
			this.onDestroyNCTailBottomControl();
			this._ncrb = null;
		}
	};

	_pComplexComponent.onDestroyNCHeadControl = function () {
		delete this._nchead;
	};
	_pComplexComponent.onDestroyNCFootControl = function () {
		delete this._ncfoot;
	};
	_pComplexComponent.onDestroyNCLeadControl = function () {
		delete this._nclead;
	};
	_pComplexComponent.onDestroyNCTailControl = function () {
		delete this._nctail;
	};
	_pComplexComponent.onDestroyNCLeadTopControl = function () {
		delete this._nclt;
	};
	_pComplexComponent.onDestroyNCLeadBottomControl = function () {
		delete this._nclb;
	};
	_pComplexComponent.onDestroyNCTailTopControl = function () {
		delete this._ncrt;
	};
	_pComplexComponent.onDestroyNCTailBottomControl = function () {
		delete this._ncrb;
	};







	_pComplexComponent._getContentsMaxWidth = function (before) {
		if (this._is_panel_layout && this._panel) {
			return this._panel._getPanelMaxWidth();
		}
		if (this._is_child || this._is_items) {
			return this._onGetContentsMaxWidth(before);
		}

		return this._onGetContainerMaxWidth(before);
	};
	_pComplexComponent._getContentsMaxHeight = function (before) {
		if (this._is_panel_layout && this._panel) {
			return this._panel._getPanelMaxHeight();
		}
		if (this._is_child || this._is_items) {
			return this._onGetContentsMaxHeight(before);
		}

		return this._onGetContainerMaxHeight(before);
	};
	_pComplexComponent._setContentsMaxSize = function (width, height, before) {
		var control_elem = this._control_element;

		if (control_elem && this._is_scrollable) {
			if (!nexacro._isNull(width) && nexacro._isNumber(width) && 
				!nexacro._isNull(height) && nexacro._isNumber(height)) {
				control_elem.setElementScrollMaxSize(width, height);
			}
		}
	};



	_pComplexComponent.onCreateContents = function () {
		this._createFormats();

		this._createChild();

		this._createItems();

		if (this._use_clientem) {
			nexacro.SimpleComponent.prototype.onCreateContents.call(this);
		}
	};

	_pComplexComponent.onCreatedContents = function (_window) {
		this._update_position();

		this._createdFormats();

		this._createdChild(_window);

		this._createdItems(_window);

		if (this._use_clientem) {
			nexacro.SimpleComponent.prototype.onCreatedContents.call(this, _window);
		}
	};

	_pComplexComponent.onClearContents = function () {
		this._clearPanel();

		this._destroyChild();
		this._destroyItems();

		this._clearScrollManager();
		this._clearExpandManager();

		nexacro.SimpleComponent.prototype.onClearContents.call(this);
	};

	_pComplexComponent.onDestroyContents = function () {
		this._onClearFormats();

		this.onClearContents();
	};

	_pComplexComponent._onSetContents = function (strContents) {
		if (this._is_format_layout && this.set_formats) {
			return this.set_formats(strContents);
		}
	};

	_pComplexComponent._onGetContentsMaxWidth = function (before) {
		return this.container_maxwidth ? this.container_maxwidth : this._onGetContainerInnerWidth();
	};
	_pComplexComponent._onGetContentsMaxHeight = function (before) {
		return this.container_maxheight ? this.container_maxheight : this._onGetContainerInnerHeight();
	};
	_pComplexComponent._onGetContainerMaxWidth = function (before) {
		var control_elem = this._control_element;
		if (control_elem && this._is_scrollable) {
			return control_elem.container_maxwidth;
		}
		else {
			return this._onGetContentsMaxWidth(before);
		}
	};
	_pComplexComponent._onGetContainerMaxHeight = function (before) {
		var control_elem = this._control_element;
		if (control_elem && this._is_scrollable) {
			return control_elem.container_maxheight;
		}
		else {
			return this._onGetContentsMaxHeight(before);
		}
	};
	_pComplexComponent._onGetContainerInnerWidth = function (before) {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.inner_width;
		}
	};
	_pComplexComponent._onGetContainerInnerHeight = function (before) {
		var control_elem = this._control_element;
		if (control_elem) {
			return control_elem.inner_height;
		}
	};






	_pComplexComponent._recreateContents = function () {
		this._clearContents();

		this._initPanelLayout();
		this._initContents();
		this._createdContents(this._getWindow());

		this._recalcLayout(true);
	};
	_pComplexComponent._recreateChild = function () {
		if (this._is_created) {
			this._recreateContents();
		}
	};
	_pComplexComponent._recreateItems = function () {
		if (this._is_created) {
			this._recreateContents();
		}
	};

	_pComplexComponent._recreateSelector = function () {
		var selectors = this._selectlist;
		if (selectors) {
			for (var i = 0, l = selectors.length; i < l; i++) {
				selectors[i]._recreateSelector();
			}
		}
	};




	_pComplexComponent.onPrepareCommand = function () {
		this._applyProperties();

		this._update_position();

		this._createFormats();

		this._recalcLayout(true);
	};

	_pComplexComponent.onCreateContentsCommand = function () {
		var str = "";


		str += nexacro.SimpleComponent.prototype.onCreateContentsCommand.call(this);

		if (this._is_child && this._children) {
			str += this.onCreateCommandChild();
		}

		if (this._is_items && this._items) {
			str += this.onCreateCommandItems();
		}



		return str;
	};

	_pComplexComponent.onCreateCommandChild = function () {
		var str = "";
		var child = this._getChildren();
		var count = child ? child.length : 0;

		for (var i = 0; i < count; i++) {
			var item = child[i];
			if (item) {
				str += item.createCommand();
			}
		}

		return str;
	};

	_pComplexComponent.onCreateCommandItems = function () {
		var str = "";
		var items = this._getItems();
		var count = items ? items.length : 0;

		for (var i = 0; i < count; i++) {
			var item = items[i];
			if (item) {
				str += item.createCommand();
			}
		}

		return str;
	};

	_pComplexComponent.onCreateCommandNCChild = function () {
		var str = "";

		if (this._is_nc_scroll) {
			if (this._use_scrollmanager) {
				if (this._scrollmanager) {
					str += this._scrollmanager._getCommandString();
				}
			}
			else {
				if (this.vscrollbar) {
					str += this.vscrollbar.createCommand();
				}
				if (this.hscrollbar) {
					str += this.hscrollbar.createCommand();
				}
			}
		}
		if (this._is_nc_expand) {
			if (this._use_expandmanager) {
				if (this._expandmanager) {
					str += this._expandmanager._getCommandString();
				}
			}
			else {
				if (this.expandbar) {
					str += this.expandbar.createCommand();
				}
			}
		}

		if (this._is_nc_layout) {
			if (this._is_nc_head && this._nchead) {
				str += this._nchead.createCommand();
			}
			if (this._is_nc_foot && this._ncfoot) {
				str += this._ncfoot.createCommand();
			}
			if (this._is_nc_lead && this._nclead) {
				str += this._nclead.createCommand();
			}
			if (this._is_nc_tail && this._nctail) {
				str += this._nctail.createCommand();
			}

			if (this._is_nc_leadtop && this._nclt) {
				str += this._nclt.createCommand();
			}
			if (this._is_nc_leadbottom && this._nclb) {
				str += this._nclb.createCommand();
			}
			if (this._is_nc_tailtop && this._ncrt) {
				str += this._ncrt.createCommand();
			}
			if (this._is_nc_tailbottom && this._ncrb) {
				str += this._ncrb.createCommand();
			}
		}

		return str;
	};

	_pComplexComponent.onAttachContentsHandle = function (win) {
		nexacro.SimpleComponent.prototype.onAttachContentsHandle.call(this, win);

		if (this._is_child && this._children) {
			this.onAttachHandleChild(win);
		}

		if (this._is_items && this._items) {
			this.onAttachHandleItems(win);
		}



		if (this._is_nc_scroll || this._is_nc_expand || this._is_nc_layout) {
			this._resetNCChild(false);
		}
	};

	_pComplexComponent.onAttachHandleChild = function (win) {
		var child = this._getChildren();
		var count = child ? child.length : 0;

		for (var i = 0; i < count; i++) {
			var item = child[i];
			if (item) {
				item.attachHandle(win);
			}
		}
	};

	_pComplexComponent.onAttachHandleItems = function (win) {
		var items = this._getItems();
		var count = items ? items.length : 0;

		for (var i = 0; i < count; i++) {
			var item = items[i];
			if (item) {
				item.attachHandle(win);
			}
		}
	};

	_pComplexComponent.onAttachHandleNCChild = function (win) {
		if (this._is_nc_scroll) {
			if (this._use_scrollmanager) {
				if (this._scrollmanager) {
					this._scrollmanager._setAttachHandle(win);
				}
			}
			else {
				if (this.vscrollbar) {
					this.vscrollbar.attachHandle(win);
				}
				if (this.hscrollbar) {
					this.hscrollbar.attachHandle(win);
				}
			}
		}
		if (this._is_nc_expand) {
			if (this._use_expandmanager) {
				if (this._expandmanager) {
					this._expandmanager._setAttachHandle(win);
				}
			}
			else {
				if (this.expandbar) {
					this.expandbar.setAttachHandle(win);
				}
			}
		}
		if (this._is_nc_layout) {
			if (this._is_nc_head && this._nchead) {
				this._nchead.attachHandle(win);
			}
			if (this._is_nc_foot && this._ncfoot) {
				this._ncfoot.attachHandle(win);
			}
			if (this._is_nc_lead && this._nclead) {
				this._nclead.attachHandle(win);
			}
			if (this._is_nc_tail && this._nctail) {
				this._nctail.attachHandle(win);
			}

			if (this._is_nc_leadtop && this._nclt) {
				this._nclt.attachHandle(win);
			}
			if (this._is_nc_leadbottom && this._nclb) {
				this._nclb.attachHandle(win);
			}
			if (this._is_nc_tailtop && this._ncrt) {
				this._ncrt.attachHandle(win);
			}
			if (this._is_nc_tailbottom && this._ncrb) {
				this._ncrb.attachHandle(win);
			}
		}
	};




	_pComplexComponent._initLayouts = function () {
		this.onCreateLayouts();
	};

	_pComplexComponent._initSubLayouts = function () {
		if (this._is_format_layout) {
			this._initSubFormatsLayout();
		}
		if (this._is_panel_layout) {
			this._initSubPanelLayout();
		}
		if (this._is_child) {
		}
		if (this._is_items) {
		}
	};
	_pComplexComponent._initPopupSubLayouts = function (parent, startindex, startlevel) {
		if (!parent) {
			return;
		}

		if (startindex == undefined || startlevel == undefined) {
		}
		{

			var popup = parent._getCurrentPopup();

			if (popup) {
				startindex = popup._start_index;
				startlevel = popup._start_level;
			}
		}

		if (this._is_format_layout) {
			this._initPopupSubFormatLayout(parent, startindex, startlevel);
		}
		if (this._is_panel_layout) {
			this._initPopupSubPanelLayout(parent, startindex, startlevel);
		}
		if (this._is_child) {
		}
		if (this._is_items) {
		}
	};

	_pComplexComponent.onCreateLayouts = function () {
		if (this._is_format_layout) {
			this._formats = new nexacro._Formats();
			this._initFormatsLayout();
		}
		if (this._is_panel_layout) {
			this._panel = new nexacro._Panel(this);
			this._initPanelLayout();
		}
		if (this._is_child) {
			this._children = [];
			this._childlst = {
			};
			this._leadchild = null;
			this._initChildLayout();
		}
		if (this._is_items) {
			this._items = [];
			this._initItemsLayout();
		}
	};

	_pComplexComponent._clearLayouts = function () {
	};
	_pComplexComponent._destroyLayouts = function () {
		this.onDestroyLayouts();
	};

	_pComplexComponent.onDestroyLayouts = function () {
		if (this._is_format_layout) {
			if (this._formats) {
				this._formats._clear();
				delete this._formats;
				this._formats = null;
			}
			if (this._ctxtdata) {
				this._clearCtxtBaseInfo();
			}
		}
		if (this._is_panel_layout) {
			if (this._panel) {
				this._panel._clear();
				delete this._panel;
				this._panel = null;
			}
		}
		if (this._is_child) {
			if (this._childlst) {
				this._childlst = null;
			}
			if (this._children) {
				this._children = null;
			}
			if (this._leadchild) {
				this._leadchild = null;
			}
		}
		if (this._is_items) {
			if (this._items) {
				this._items = null;
			}
		}
	};


	_pComplexComponent._initChildLayout = function () {
		this._onInitChildLayout();
	};
	_pComplexComponent._initItemsLayout = function () {
		this._onInitItemsLayout();
	};
	_pComplexComponent._initSubChildLayout = function () {
		this._onInitSubChildLayout();
	};
	_pComplexComponent._initSubItemsLayout = function () {
		this._onInitSubItemsLayout();
	};

	_pComplexComponent._onInitChildLayout = function () {
	};
	_pComplexComponent._onInitItemsLayout = function () {
	};
	_pComplexComponent._onInitSubChildLayout = function () {
	};
	_pComplexComponent._onInitSubItemsLayout = function () {
	};




	_pComplexComponent._initPanelLayout = function () {
		{

			this._onInitPanelLayout();
		}
	};
	_pComplexComponent._initSubPanelLayout = function () {
		if (this._panel) {
			if (this._is_nc_layout) {
				this._initSubPanelNCChildLayout();
			}
			if (this._is_child) {
				this._initSubPanelChildLayout();
			}
			if (this._is_items) {
				this._initSubPanelItemsLayout();
			}
		}
	};
	_pComplexComponent._initPopupSubPanelLayout = function (parent, startindex, startlevel) {
		this._initPanelSubStartInfo(startindex, startlevel);

		if (this._panel) {
			if (this._is_nc_layout) {
				this._initPopupSubPanelNCChildLayout(parent, startindex, startlevel);
			}
			if (this._is_child) {
				this._initPopupSubPanelChildLayout(parent, startindex, startlevel);
			}
			if (this._is_items) {
				this._initPopupSubPanelItemsLayout(parent, startindex, startlevel);
			}
		}
	};
	_pComplexComponent._initPopupSubFormatLayout = function (parent, startindex, startlevel) {
	};


	_pComplexComponent._onInitPanelLayout = function () {
		var panel = this._panel;

		if (panel) {
			panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_DEFAULT);
			panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
			panel._setGroupingSubPanel(null, nexacro._PanelConst.GROUPING_SUBSTYLE_NONE, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
			panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
			panel._setSlotArrangeType(nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST);
			panel._setSlotOverFlowType(nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL | nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT);
			panel._setSlotSelectorType(nexacro._PanelConst.SLOT_SELECTORTYPE_NONE);
			panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_DEFAULT);
			panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);

			panel._setSlotBandFixType(true, false, true);
			panel._setSlotTargetCount(1, 1, 1);

			panel._resetPanelColSize(0, 0);
			panel._resetPanelRowSize(0, 0);

			panel._setPanelLimitHeight(this._getPanelLimitHeight());
		}
	};

	_pComplexComponent._initSubPanelNCChildLayout = function () {
		if (this._nchead && this._nchead._is_panel_layout) {
			this._onInitSubPanelNCChildLayout(this._nchead, this.panel);
		}
		if (this._ncfoot && this._ncfoot._is_panel_layout) {
			this._onInitSubPanelNCChildLayout(this._ncfoot, this.panel);
		}
		if (this._nclead && this._nclead._is_panel_layout) {
			this._onInitSubPanelNCChildLayout(this._nclead, this.panel);
		}
		if (this._nctail && this._nctail._is_panel_layout) {
			this._onInitSubPanelNCChildLayout(this._nctail, this.panel);
		}
	};
	_pComplexComponent._initSubPanelChildLayout = function () {
		var child = this._getChildren();
		var count = child ? child.length : 0;

		for (var i = 0; i < count; i++) {
			var item = child[i];
			if (item && item._is_panel_layout) {
				this._onInitSubPanelChildLayout(item, this.panel);
			}
		}
	};
	_pComplexComponent._initSubPanelItemsLayout = function () {
		var items = this._getItems();
		var count = items ? items.length : 0;

		for (var i = 0; i < count; i++) {
			var item = items[i];
			if (item && item._is_panel_layout) {
				this._onInitSubPanelItemsLayout(item, this.panel);
			}
		}
	};
	_pComplexComponent._setChildSubLayoutInfo = function (child) {
		if (child && child._is_panel_layout) {
			this._onInitSubPanelChildLayout(child, this.panel);
		}
	};
	_pComplexComponent._setItemSubLayoutInfo = function (item, binddata, index) {
		if (item && item._is_panel_layout) {
			this._onInitSubPanelItemsLayout(item, this.panel, binddata, index);
		}
	};

	_pComplexComponent._onInitSubPanelNCChildLayout = function (child, panel) {
	};
	_pComplexComponent._onInitSubPanelChildLayout = function (child, panel) {
	};
	_pComplexComponent._onInitSubPanelItemsLayout = function (item, panel) {
	};


	_pComplexComponent._initPopupSubPanelNCChildLayout = function (parent, startindex, startlevel) {
		return this._onInitPopupSubPanelNCChildLayout(parent, startindex, startlevel);
	};
	_pComplexComponent._initPopupSubPanelChildLayout = function (parent, startindex, startlevel) {
		return this._onInitPopupSubPanelChildLayout(parent, startindex, startlevel);
	};
	_pComplexComponent._initPopupSubPanelItemsLayout = function (parent, startindex, startlevel) {
		return this._onInitPopupSubPanelItemsLayout(parent, startindex, startlevel);
	};

	_pComplexComponent._createPanel = function () {
	};
	_pComplexComponent._clearPanel = function () {
		var panel = this._panel;
		if (panel) {
			panel._clear();
		}
	};

	_pComplexComponent._onInitPopupSubPanelNCChildLayout = function (parent, startindex, startlevel) {
	};
	_pComplexComponent._onInitPopupSubPanelChildLayout = function (parent, startindex, startlevel) {
	};
	_pComplexComponent._onInitPopupSubPanelItemsLayout = function (parent, startindex, startlevel) {
	};

	_pComplexComponent._getPanel = function () {
		return this._panel;
	};
	_pComplexComponent._getPanelSlot = function (idx) {
		var panel = this._getPanel();
		if (panel) {
			return panel._getPanelSlot(idx);
		}

		return null;
	};
	_pComplexComponent._getPanelLimitHeight = function () {
		if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
			return nexacro._PanelConst.PANEL_MAXHEIGHT_IE;
		}
		if (nexacro._Browser == "Gecko") {
			return nexacro._PanelConst.PANEL_MAXHEIGHT_GECKO;
		}

		return nexacro._PanelConst.PANEL_MAXHEIGHT_DEFAULT;
	};

	_pComplexComponent._clearPanelSlot = function () {
		var panel = this._panel;

		if (panel) {
			if (panel._isPartSlot()) {
				panel._clearPanelSlot(this._getBindCount() + this._head_count + this._tail_count);
			}
			else {
				panel._clearPanelSlot();
			}
		}
	};

	_pComplexComponent._isRowFirst = function () {
		return this._panel ? this._panel._isRowFirst() : this._isColFirst != true;
	};
	_pComplexComponent._isColFirst = function () {
		return this._panel ? this._panel._isColFirst() : this._isColFirst == true;
	};

	_pComplexComponent._resetPanelSlot = function (ctrls, start, count, prevc, nextc, over) {
		var panel = this._panel;

		if (panel) {
			var slot;
			var headslot, tailslot;

			var leveled = this._is_levelbind && this._databind != null;
			var formats = this._is_format_layout && this._formats != null;
			var childpan = this._is_child && ctrls == this._children;
			var partitem = this._is_items && ctrls == this._items && this._use_partitem;
			var indexed = panel._panel_layout == 0;
			var startidx = panel._panel_idxstart ? panel._panel_idxstart : 0;
			var startlvl = panel._panel_lvlstart ? panel._panel_lvlstart : 0;
			var slotstat = nexacro._PanelSlotConst.STATUS_NONE;
			var bandstat = nexacro._PanelSlotConst.STATUS_NONE;
			var collapse = false;
			var slotpopup = false;


			switch (panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) {
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND:
					slotstat = nexacro._PanelSlotConst.STATUS_EXPAND;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE:
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION:
					slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE;
					collapse = true;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP:
					slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE;
					collapse = true;
					slotpopup = true;
					break;
			}
			switch (panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) {
				case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND:
					bandstat = nexacro._PanelSlotConst.STATUS_EXPAND;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE:
					bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION:
					bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP:
					bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE;
					break;
			}

			var slotindex = 0;
			var bindindex = 0;
			var ctrlindex = 0;
			var baseindex = 0;

			var ctrlcount = ctrls ? ctrls.length : 0;
			var bindcount = this._getBindCount();
			var nullcount = bindcount ? 0 : this._null_count;
			var slotcount = 0;
			var headcount;
			var tailcount;

			if (childpan) {
				slotindex = 0;
				slotcount = ctrlcount;
			}
			else {
				bindcount = bindcount ? bindcount : nullcount;

				headslot = start < 0 || count < 0;
				tailslot = start < 0 || count < 0;

				if (over) {
					if (over < 0) {
						if (over < -count) {
							slotindex = start - prevc;
							if (slotindex < 0) {
								slotindex = 0;
							}

							slotcount = slotindex + count + prevc + nextc;
							if (slotcount >= bindcount) {
								slotcount = bindcount;
							}
						}
						else {
							slotindex = start - prevc + (over + 1);
							if (slotindex < 0) {
								slotindex = 0;
							}

							slotcount = slotindex + count;
							if (slotcount >= bindcount) {
								slotcount = bindcount;
							}
						}
					}
					if (over > 0) {
						if (over > count) {
							slotindex = start - prevc;
							if (slotindex < 0) {
								slotindex = 0;
							}

							slotcount = slotindex + count + prevc + nextc;
							if (slotcount >= bindcount) {
								slotcount = bindcount;
							}
						}
						else {
							slotindex = start + count - (over - 1);
							if (slotindex >= bindcount) {
								slotindex = bindcount;
							}

							slotcount = slotindex + count;
							if (slotcount >= bindcount) {
								slotcount = bindcount;
							}
						}
					}

					bindindex = nullcount ? -4 : slotindex - (this._head_count ? this._head_count : 0);
					ctrlindex = 0;

					if (slotindex >= 0) {
						ctrlindex = this._use_headitem ? this._getPanelSlotTargetCount(-1) : 0;
						ctrlindex += bindindex > 0 ? bindindex *  this._getPanelSlotTargetCount(0) : 0;
					}
				}
				else {
					headcount = this._use_headitem && this._head_count ? this._head_count : 0;
					tailcount = this._use_tailitem && this._tail_count ? this._tail_count : 0;

					slotindex = (!start || start < 0 || headslot || tailslot) ? (baseindex - headcount) : Math.max(baseindex + start - prevc, 0);
					slotcount = (!count || count < 0 || headslot || tailslot) ? (bindcount + tailcount) : Math.min(slotindex + count + prevc + nextc, bindcount);

					bindindex = nullcount ? -4 : slotindex;
					ctrlindex = 0;

					if (!headslot && !tailslot) {
						ctrlindex = headcount *  this._getPanelSlotTargetCount(-1);
						ctrlindex += bindindex > 0 ? bindindex *  this._getPanelSlotTargetCount(0) : 0;
					}
				}
			}

			if (!panel._panel_showslot) {
				var c;
				var curlvl, rowcols, position;

				if (formats) {
					if (slotpopup && leveled && collapse) {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							curlvl = this._fetchLevelBindValue(bindindex);
							if (curlvl == startlvl || bindindex < startidx) {
								slot = panel._getPanelSlot(slotindex, true);
								if (slot) {
									slot._setSlotIndex(bindindex < startidx ? -1 : bindindex);
									slot._setSlotLevel(curlvl);
									slot._setSlotStatusSet(slotstat, bandstat);

									if (indexed) {
										rowcols = this._fetchFormatsRowCols(bindindex);
										c = rowcols.length;

										slot._setSlotRowCols(rowcols);
									}
									else {
										position = this._fetchFormatsPosition(bindindex);
										c = position.length;

										slot._setSlotPosition(position);
									}

									if (c > 1) {
										slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
										ctrlindex += c;
									}
									else {
										slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
										ctrlindex++;
									}
								}
								else {
									ctrlindex++;
								}
							}
							else if (curlvl > startlvl) {
								continue;
							}
							else {
								break;
							}
						}
					}
					else {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							slot = panel._getPanelSlot(slotindex, true);
							if (slot) {
								slot._setSlotIndex(bindindex);
								slot._setSlotStatusSet(slotstat, bandstat);

								if (leveled) {
									curlvl = this._fetchLevelBindValue(bindindex);

									slot._setSlotLevel(curlvl);
									slot._setSlotVisible(!collapse || curlvl <= startlvl);
								}

								if (indexed) {
									rowcols = this._fetchFormatsRowCols(bindindex);
									c = rowcols.length;

									slot._setSlotRowCols(rowcols);
								}
								else {
									position = this._fetchFormatsPosition(bindindex);
									c = position.length;

									slot._setSlotPosition(position);
								}

								if (c > 1) {
									slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
									ctrlindex += c;
								}
								else {
									slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
									ctrlindex++;
								}
							}
							else {
								ctrlindex++;
							}
						}
					}

					for (; slotindex < slotcount; slotindex++) {
						slot = panel._getPanelSlot(slotindex, true);
						if (slot) {
							if (indexed) {
								slot._setSlotRowCols();
							}
							else {
								slot._setSlotPosition();
							}
						}
					}
				}
				else {
					if (slotpopup && leveled && collapse) {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							curlvl = this._fetchLevelBindValue(bindindex);
							if (curlvl == startlvl || bindindex < startidx) {
								slot = panel._getPanelSlot(slotindex, true);
								if (slot) {
									slot._setSlotIndex(bindindex < startidx ? -1 : bindindex);
									slot._setSlotLevel(curlvl);
									slot._setSlotStatusSet(slotstat, bandstat);

									if (indexed) {
										slot._setSlotRowCols();
									}
									else {
										slot._setSlotPosition();
									}

									c = this._getPanelSlotTargetCount(bindindex);

									if (c > 1) {
										slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
										ctrlindex += c;
									}
									else {
										slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
										ctrlindex++;
									}
								}
								else {
									ctrlindex++;
								}
							}
							else if (curlvl > startlvl) {
								continue;
							}
							else {
								break;
							}
						}
					}
					else {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							slot = panel._getPanelSlot(slotindex, true);
							if (slot) {
								slot._setSlotIndex(bindindex);
								slot._setSlotStatusSet(slotstat, bandstat);

								if (leveled) {
									curlvl = this._fetchLevelBindValue(bindindex);

									slot._setSlotLevel(curlvl);
									slot._setSlotVisible(!collapse || curlvl <= startlvl);
								}

								if (indexed) {
									slot._setSlotRowCols();
								}
								else {
									slot._setSlotPosition();
								}

								c = this._getPanelSlotTargetCount(bindindex);

								if (c > 1) {
									slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
									ctrlindex += c;
								}
								else {
									slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
									ctrlindex++;
								}
							}
						}
					}

					for (; slotindex < slotcount; slotindex++) {
						slot = panel._getPanelSlot(slotindex, true);
						if (slot) {
							if (indexed) {
								slot._setSlotRowCols();
							}
							else {
								slot._setSlotPosition();
							}
						}
					}
				}
			}
			else {
				slot = new nexacro._PanelSlot(null, new nexacro._IconText("view"));
				if (slot) {
					panel._addPanelSlot(slot);
				}
			}
		}
	};

	_pComplexComponent._showPanelItemSlot = function (ctrls, start, count, prevc, nextc, over, show, band) {
		var panel = this._panel;
		if (panel && this._use_partitem && ctrls) {
			var leveled = this._is_levelbind && this._databind != null;
			var formats = this._is_format_layout && this._formats != null;
			var startidx = panel._panel_idxstart ? panel._panel_idxstart : 0;
			var startlvl = panel._panel_lvlstart ? panel._panel_lvlstart : 0;
			var collapse = false;
			var slotpopup = false;

			switch (panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) {
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND:
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE:
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION:
					collapse = true;
					break;
				case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP:
					collapse = true;
					slotpopup = true;
					break;
			}

			var slotindex = 0;
			var bindindex = 0;
			var ctrlindex = 0;
			var baseindex = 0;

			var ctrlcount = ctrls.length;
			var bindcount = this._getBindCount();
			var slotcount = 0;

			var headcount = this._use_headitem && this._head_count ? this._head_count : 0;

			slotindex = (!start || start < 0) ? baseindex : Math.max(baseindex + start - prevc, 0);
			slotcount = (!count || count < 0) ? bindcount : Math.min(slotindex + count + prevc + nextc, bindcount);

			bindindex = slotindex;
			ctrlindex = headcount *  this._getPanelSlotTargetCount(-1) + bindindex *  this._getPanelSlotTargetCount(0);



			if (!panel._panel_showslot) {
				var curlvl;
				var slot;

				if (formats) {
					if (slotpopup && leveled && collapse) {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							curlvl = this._fetchLevelBindValue(bindindex);
							if (curlvl == startlvl || bindindex < startidx) {
								slot = panel._getPanelSlot(slotindex, true);
								if (slot) {
									if (show === false) {
										slot._clearSlotTarget(this._delItem(bindindex, true));
									}
									else {
										slot._placeSlotTarget(this._getItem(bindindex, true));
									}

									ctrlindex += this._getPanelSlotTargetCount(bindindex);
								}
								else {
									ctrlindex++;
								}
							}
							else if (curlvl > startlvl) {
								continue;
							}
							else {
								break;
							}
						}
					}
					else {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							slot = panel._getPanelSlot(slotindex, true);
							if (slot) {
								if (show === false) {
									slot._clearSlotTarget(this._delItem(bindindex, true));
								}
								else {
									slot._placeSlotTarget(this._getItem(bindindex, true));
								}

								ctrlindex += this._getPanelSlotTargetCount(bindindex);
							}
							else {
								ctrlindex++;
							}
						}
					}
				}
				else {
					if (slotpopup && leveled && collapse) {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							curlvl = this._fetchLevelBindValue(bindindex);
							if (curlvl == startlvl || bindindex < startidx) {
								slot = panel._getPanelSlot(slotindex, true);
								if (slot) {
									if (show === false) {
										slot._clearSlotTarget(this._delItem(bindindex, true));
									}
									else {
										slot._placeSlotTarget(this._getItem(bindindex, true));
									}

									ctrlindex += this._getPanelSlotTargetCount(bindindex);
								}
								else {
									ctrlindex++;
								}
							}
							else if (curlvl > startlvl) {
								continue;
							}
							else {
								break;
							}
						}
					}
					else {
						for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++) {
							slot = panel._getPanelSlot(slotindex, true);
							if (slot) {
								if (show === false) {
									slot._clearSlotTarget(this._delItem(bindindex, true));
								}
								else {
									slot._placeSlotTarget(this._getItem(bindindex, true));
								}

								ctrlindex += this._getPanelSlotTargetCount(bindindex);
							}
						}
					}
				}
			}
			else {
			}
		}
	};
	_pComplexComponent._hidePanelItemSlot = function (ctrls, start, count, prevc, nextc, over) {
		if (this._use_partitem) {
			var prevs = 0;
			var preve = start - prevc;
			var nexts = start + count + nextc;
			var nexte = this._getBindCount();

			if (preve && prevs < preve) {
				this._showPanelItemSlot(ctrls, prevs, preve, 0, 0, 0, false, 0);
			}

			if (nexte && nexts < nexte) {
				this._showPanelItemSlot(ctrls, nexts, nexte, 0, 0, 0, false, 0);
			}
		}
	};
	_pComplexComponent._makePanelItemSlot = function (ctrls, start, count, prevc, nextc, band, rowfirst) {
		if (this._use_partitem && ctrls && ctrls.length) {
			var headcnt = this._head_count ? this._head_count : 0;
			var tailcnt = this._tail_count ? this._tail_count : 0;
			var bindcnt = this._getBindCount();

			if (!band) {
				var mkcnt = count *  this._add_partitem *  this._acc_partitem;
				var views = start;
				var viewf = start + count;
				var dscnt = bindcnt;

				if (views - prevc > headcnt) {
					var _prevs = views - mkcnt;
					var _prevc = mkcnt - prevc;

					if (_prevs < headcnt) {
						_prevc += _prevs;
						_prevs = 0;
					}

					if (_prevc > headcnt) {
						this._showPanelItemSlot(ctrls, _prevs, _prevc, 0, 0, 0, true, 0);

						this._setItemScrollPrevCount(_prevc + prevc);
						this._resetItemScrollFullSize(rowfirst);
					}
				}

				if (viewf + nextc < dscnt) {
					var _nexts = viewf + nextc;
					var _nexto = dscnt - (viewf + mkcnt);
					var _nextc = mkcnt - nextc;

					if (_nexto < tailcnt) {
						_nextc += _nexto;
					}

					if (_nextc > tailcnt) {
						this._showPanelItemSlot(ctrls, _nexts, _nextc, 0, 0, 0, true, 0);

						this._setItemScrollNextCount(_nextc + nextc);
						this._resetItemScrollFullSize(rowfirst);
					}
				}

				return true;
			}
			if (band == -1) {
				var heads = 0;
				var headc = headcnt;
				if (headc > 0) {
					this._showPanelItemSlot(ctrls, heads, headc, 0, 0, 0, true, -1);
				}

				return true;
			}
			if (band == -2) {
				var tails = headcnt + bindcnt;
				var tailc = tailcnt;
				if (tailc > 0) {
					this._showPanelItemSlot(ctrls, tails, tailc, 0, 0, 0, true, -2);
				}

				return true;
			}
		}
	};
	_pComplexComponent._makePanelItemTrackCover = function (ctrls, start, count, prevc, nextc, band, rowfirst) {
		if (this._scrollmanager._setcoverbimg || !this._is_created) {
			return;
		}

		if (this._use_partitem && ctrls && ctrls.length) {
			var covertype = this._onGetScrollCoverType();
			switch (covertype) {
				case "none":
				case "blur":
					break;
				case "auto":
					{









					}
					break;
			}
		}
	};
	_pComplexComponent._makePanelItemTrackBands = function (ctrls, start, count, prevc, nextc, band, rowfirst) {
		if (this._scrollmanager._setbandslist || !this._is_created) {
			return null;
		}

		if (this._use_partitem && ctrls && ctrls.length) {
			var index = 0;

			var ctxt = this._getCtxtData(-3);
			var bind = this._getBindData(index);

			if (!ctxt || !ctxt.length) {
				return null;
			}

			var item = this.onCreateItem(ctxt, bind, index, true);

			if (item) {
				this._setItemIndex(item, index);
				this._setCtxtItemInfo(item, ctxt, index);
				this._setBindItemInfo(item, bind, index);
				this._setItemSubLayoutInfo(item, bind, index);


				this._createdItem(item, this._getWindow());

				return item.length ? item : [item];
			}
		}

		return null;
	};
	_pComplexComponent._makePanelItemStickItems = function (ctrls, start, count, rowfirst) {
		if (this._scrollmanager._setstickitem) {
			return null;
		}

		var items = [];
		var headc = this._head_count && this._use_headitem ? this._head_count : 0;

		if (ctrls && ctrls.length) {
			for (var i = start, l = Math.min(start + count, ctrls.length); i < l; i++) {
				var item = ctrls[i];
				if (item) {
					items.push(i - headc);
				}
			}
		}

		return items;
	};

	_pComplexComponent._trackPanelItemSlot = function (action) {
		if (this._scrollmanager) {
			return this._scrollmanager._actionTrack(action, this, this._callbackApper, this._callbackPause, this._callbackClose);
		}
		if (this._expandmanager) {
			return this._expandmanager._actionTrack(action, this, this._callbackApper, this._callbackPause, this._callbackClose);
		}
	};
	_pComplexComponent._readyPanelItemSlot = function (action) {
		if (this._scrollmanager) {
			return this._scrollmanager._actionReady(action, this, this._callbackReady);
		}
		if (this._expandmanager) {
			return this._expandmanager._actionReady(action, this, this._callbackReady);
		}
	};
	_pComplexComponent._apperPanelItemSlot = function (action, over) {
		this._callbackApper(over ? over : null);
	};
	_pComplexComponent._stickPanelItemSlot = function (action) {
		this._callbackStick(action ? true : false);
	};
	_pComplexComponent._callbackPause = function () {
		if (this._use_partitem) {
			if (this._use_scrollmanager && this._scrollmanager) {
				this._scrollmanager._actionTrackCover("trackend");
			}
			{
			}
		}
	};
	_pComplexComponent._callbackClose = function () {
		if (this._use_partitem) {
			if (this._use_scrollmanager && this._scrollmanager) {
				this._scrollmanager._actionTrackBands("trackend");
			}
			{
			}
		}
	};
	_pComplexComponent._callbackApper = function (over) {
		if (this._use_partitem) {
			if (over === undefined) {
				over = this._isRowFirst() ? 
					this._calcItemScrollInfo(this._hscroll_pos, true) : 
					this._calcItemScrollInfo(this._vscroll_pos, false);
			}

			if (over !== 0) {
				var viewstart = this._getItemScrollViewStart();
				var viewcount = this._getItemScrollViewCount();
				var prevcount = this._getItemScrollPrevCount();
				var nextcount = this._getItemScrollNextCount();


				this._showPanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, over);
			}
		}
	};
	_pComplexComponent._callbackReady = function () {
		if (this._use_partitem) {
			var rowfirst = this._isRowFirst();

			var viewstart = this._getItemScrollViewStart();
			var viewcount = this._getItemScrollViewCount();
			var prevcount = this._getItemScrollPrevCount();
			var nextcount = this._getItemScrollNextCount();


			if (this._use_headitem) {
				this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, -1, rowfirst);
			}

			if (this._use_tailitem) {
				this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, -2, rowfirst);
			}

			if (this._use_partitem) {
				this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst);

				prevcount = this._getItemScrollPrevCount();
				nextcount = this._getItemScrollNextCount();

				this._hidePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst);
			}

			this._resetLayoutTrack();
			this._resetScrollStatus();
		}
	};
	_pComplexComponent._callbackStick = function (show) {
		if (this._use_headitem || this._use_tailitem || this._use_fixitem) {
			if (this._use_scrollmanager && this._scrollmanager) {
				if (show) {
					this._scrollmanager._showStickItemLead(this._vscroll_pos, this._hscroll_pos);
					this._scrollmanager._showStickItemTail(this._vscroll_pos, this._hscroll_pos);
				}
				else {
					this._scrollmanager._hideStickItemLead(this._vscroll_pos, this._hscroll_pos);
					this._scrollmanager._hideStickItemTail(this._vscroll_pos, this._hscroll_pos);
				}
			}
			{
			}
		}
	};

	_pComplexComponent._resetLayoutTrack = function () {
		if (!this._is_created) {
			return;
		}

		if (this._use_scrollmanager && this._scrollmanager) {
			var rowfirst = this._isRowFirst();

			var viewstart = this._getItemScrollViewStart();
			var viewcount = this._getItemScrollViewCount();
			var prevcount = this._getItemScrollPrevCount();
			var nextcount = this._getItemScrollNextCount();

			this._scrollmanager._resetLayoutBand();
			this._scrollmanager._resetLayoutBImg();

			if (this._use_scrollcover && !this._scrollmanager._isInitTrackCover()) {
				this._scrollmanager._initTrackCover(this, this._makePanelItemTrackCover(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst), this._getContentsMaxWidth(), this._getContentsMaxHeight());
			}

			if (this._use_scrolltrack && !this._scrollmanager._isInitTrackBands()) {
				this._scrollmanager._initTrackBands(this, this._makePanelItemTrackBands(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst), this._getClientWidth(), this._getClientHeight());
			}
		}
	};
	_pComplexComponent._resetLayoutStick = function () {
		var rowfirst = this._isRowFirst();

		var items = this._getItems();
		if (!items || items.length <= 0) {
			return;
		}

		var fixlcount = this._getItemScrollFixLeadCount();
		var fixtcount = this._getItemScrollFixTailCount();
		var startlead = 0;
		var starttail = items.length - fixtcount - 1;

		this._setsticksize = false;

		if (this._use_scrollstick && !this._scrollmanager._isInitStickItems()) {
			this._scrollmanager._initStickItems(this, this._makePanelItemStickItems(items, startlead, fixlcount, rowfirst), this._makePanelItemStickItems(items, starttail, fixtcount, rowfirst), this._getClientWidth(), this._getClientHeight());
		}
	};

	_pComplexComponent._recalcPanelChildSlot = function () {
		var panel = this._panel;

		if (panel) {
			switch (panel._panel_layout) {
				case 0:
					{

						panel._recalcPanelSlotRowCol(this._onGetChildAreaWidth(), this._onGetChildAreaHeight(), false);
						break;
					}
				case 1:
					{

						panel._recalcPanelSlotPosition(this._onGetChildAreaWidth(), this._onGetChildAreaHeight(), false);
						break;
					}
				default:
					{

						this._onRecalcPanelChildSlot();
						break;
					}
			}
		}
	};
	_pComplexComponent._recalcPanelItemSlot = function (itemover) {
		var panel = this._panel;
		if (panel) {
			switch (panel._panel_layout) {
				case 0:
					{

						panel._recalcPanelSlotRowCol(this._onGetItemsAreaWidth(), this._onGetItemsAreaHeight(), true, itemover);
						break;
					}
				case 1:
					{

						panel._recalcPanelSlotPosition(this._onGetItemsAreaWidth(), this._onGetItemsAreaHeight(), true, itemover);
						break;
					}
				default:
					{

						this._onRecalcPanelItemsSlot(itemover);
						break;
					}
			}
		}
	};

	_pComplexComponent._onRecalcPanelChildLayout = function (reset) {
	};
	_pComplexComponent._onRecalcPanelItemsLayout = function (reset) {
	};

	_pComplexComponent._onRecalcPanelChildSlot = function () {
	};
	_pComplexComponent._onRecalcPanelItemsSlot = function (over) {
	};

	_pComplexComponent._setPanelCtxtInfo = function (ctxtinfo, formattype) {
		if (ctxtinfo) {
			var panel = this._panel;
			var ch, cb, ct, cn;

			switch (panel._panel_layout) {
				case 0:
				case 1:
					{

						panel._clearPanelSize();

						switch (formattype) {
							case 0:
								{

									var rowsize = ctxtinfo._getRowSizes();
									var colsize = ctxtinfo._getColSizes();

									if (rowsize) {
										panel._resetPanelRowSizeArray(rowsize.length, rowsize);
									}
									if (colsize) {
										panel._resetPanelColSizeArray(colsize.length, colsize);
									}



									ch = this._fetchFormatsRowCols(-1).length;
									cb = this._fetchFormatsRowCols(0).length;
									ct = this._fetchFormatsRowCols(-2).length;

									panel._setSlotTargetCount(ch, cb, ct);

									panel._setPanelFixedSlotCount(ch ? 1 : 0, ct ? 1 : 0);

									break;
								}
							case 1:
								{

									ch = this._fetchFormatsPosition(-1).length;
									cb = this._fetchFormatsPosition(0).length;
									ct = this._fetchFormatsPosition(-2).length;
									cn = this._fetchFormatsPosition(-4).length;

									panel._setSlotTargetCount(ch, cb ? cb : cb + cn, ct);

									panel._setPanelFixedSlotCount(ch ? 1 : 0, ct ? 1 : 0);

									break;
								}
							default:
								{

									break;
								}
						}
						break;
					}
				default:
					{

						this._onSetPanelCtxtInfo(ctxtinfo);
						break;
					}
			}
		}
	};
	_pComplexComponent._onSetPanelCtxtInfo = function () {
	};

	_pComplexComponent._setPanelSizeRefInfoLink = function (ctrl, option) {
		if (ctrl) {
			var this_panel = this._panel;
			var ctrl_panel = ctrl._panel;

			if (this_panel && ctrl_panel) {
				this_panel._setSizeInfoRefPanel(ctrl_panel, option);
			}
		}
	};
	_pComplexComponent._setPanelGroupSubInfoLink = function (ctrl, option) {
		if (ctrl) {
			var this_panel = this._panel;
			var ctrl_panel = ctrl._panel;

			if (this_panel && ctrl_panel) {
				this_panel._setGroupingSubPanel(ctrl_panel, option);
			}
		}
	};

	_pComplexComponent._setPanelGroupExpand = function (index, all, recalc) {
		var panel = this._panel;

		if (panel) {
			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;

			panel._setPanelSlotStatusExpand(index + headcount, all);
		}

		if (recalc != false) {
			this._recalcLayout(false);
		}
	};
	_pComplexComponent._setPanelGroupCollapase = function (index, all, recalc) {
		var panel = this._panel;

		if (panel) {
			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;

			panel._setPanelSlotStatusCollapse(index + headcount, all);
		}

		if (recalc != false) {
			this._recalcLayout(false);
		}
	};
	_pComplexComponent._setPanelGroupToggle = function (index, all, recalc) {
		var panel = this._panel;

		if (panel) {
			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;

			panel._setPanelSlotStatusToggle(index + headcount, all);
		}

		if (recalc != false) {
			this._recalcLayout(false);
		}
	};

	_pComplexComponent._isPanelSubGroupExpand = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND : false;
	};
	_pComplexComponent._isPanelSubGroupCollapse = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE : false;
	};
	_pComplexComponent._isPanelSubGroupPopup = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP : false;
	};

	_pComplexComponent._setPanelBandExpand = function (index, all, recalc) {
		var panel = this._panel;

		if (panel && panel._panel_subgroup && index !== undefined) {
			if (nexacro._isArray(index)) {
				for (var i = 0, l = index.length; i < l; i++) {
					panel._setPanelSlotStatusBandExpand(index[i] + this._head_count, all);
				}
			}
			else {
				panel._setPanelSlotStatusBandExpand(index + this._head_count, all);
			}

			if (recalc != false) {
				this._recalcLayout(false);
			}
		}
	};
	_pComplexComponent._setPanelBandCollapse = function (index, all, recalc) {
		var panel = this._panel;

		if (panel && panel._panel_subgroup && index !== undefined) {
			if (nexacro._isArray(index)) {
				for (var i = 0, l = index.length; i < l; i++) {
					panel._setPanelSlotStatusBandCollapse(index[i] + this._head_count, all);
				}
			}
			else {
				panel._setPanelSlotStatusBandCollapse(index + this._head_count, all);
			}

			if (recalc != false) {
				this._recalcLayout(false);
			}
		}
	};
	_pComplexComponent._setPanelBandToggle = function (index, all, recalc) {
		var panel = this._panel;

		if (panel && panel._panel_subgroup && index !== undefined) {
			if (nexacro._isArray(index)) {
				for (var i = 0, l = index.length; i < l; i++) {
					panel._setPanelSlotStatusBandToggle(index[i], all);
				}
			}
			else {
				panel._setPanelSlotStatusBandToggle(index, all);
			}

			if (recalc != false) {
				this._recalcLayout(false);
			}
		}
	};
	_pComplexComponent._setPanelBandPopup = function (index, all, recalc) {
		var panel = this._panel;

		if (panel && panel._panel_subgroup && index !== undefined) {
			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;

			if (nexacro._isArray(index)) {
				for (var i = 0, l = index.length; i < l; i++) {
					panel._setPanelSlotStatusBandPopup(index[i] + headcount, all);
				}
			}
			else {
				panel._setPanelSlotStatusBandPopup(index + headcount, all);
			}

			if (recalc != false) {
				this._recalcLayout(false);
			}
		}
	};
	_pComplexComponent._setPanelBandClose = function (index, all, recalc) {
		var panel = this._panel;

		if (panel && panel._panel_subgroup && index !== undefined) {
			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;

			if (nexacro._isArray(index)) {
				for (var i = 0, l = index.length; i < l; i++) {
					panel._setPanelSlotStatusBandClose(index[i] + headcount, all);
				}
			}
			else {
				panel._setPanelSlotStatusBandClose(index + headcount, all);
			}

			if (recalc != false) {
				this._recalcLayout(false);
			}
		}
	};

	_pComplexComponent._isPanelSubBandExpand = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND : false;
	};
	_pComplexComponent._isPanelSubBandCollapse = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE : false;
	};
	_pComplexComponent._isPanelSubBandPopup = function () {
		return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP : false;
	};

	_pComplexComponent._setPanelStartIndex = function (idx) {
		if (this._panel) {
			this._panel._panel_idxstart = idx;
		}
	};
	_pComplexComponent._setPanelStartLevel = function (lvl) {
		if (this._panel) {
			this._panel._panel_lvlstart = lvl;
		}
	};
	_pComplexComponent._initPanelSubStartInfo = function (idx, lvl) {
		this.__panel_idxstart = idx;
		this.__panel_lvlstart = lvl;

		this._setPanelStartIndex(idx);
		this._setPanelStartLevel(lvl);
	};

	_pComplexComponent._getPanelStartIndex = function () {
		if (this.__panel_idxstart) {
			return this.__panel_idxstart;
		}
		return this._panel ? this._panel._panel_idxstart : 0;
	};
	_pComplexComponent._getPanelStartLevel = function () {
		if (this.__panel_lvlstart) {
			return this.__panel_lvlstart;
		}
		return this._panel ? this._panel._panel_lvlstart : 0;
	};
	_pComplexComponent._getPanelLevelIndent = function () {
		return 0;
	};
	_pComplexComponent._getPanelSlotTargetCount = function (index) {
		return this._panel ? this._panel._getSlotTargetCount(index) : 1;
	};




	_pComplexComponent._createPanelPopup = function (slot, isband) {
		var popup = this._createPopup(slot, isband);
		var child = this._createPopupChild(slot, isband);

		if (popup) {
			if (child) {
				popup._attach(child);
			}
			popup.on_created();
		}

		if (child) {
			child.on_created();
		}

		return popup;
	};

	_pComplexComponent._createPopup = function (slot, isband) {
		var popup = this._onCreatePopup();

		if (popup && slot) {
			var isIndexPopup = slot._slot_multi ? 0 : 1;

			var popupindex = this._popuplist ? this._popuplist.length - 1 : -1;
			var startindex = slot._getSlotIndex() + isIndexPopup;
			var startlevel = slot._getSlotIndex() + isIndexPopup;

			popup._initInfo(this, slot._getSlotTarget(), this, popupindex, startindex, startlevel);

			slot._setSlotPopup(popup);

			this._setCurrentPopup(popup, popupindex, startindex, startlevel);
		}

		return popup;
	};
	_pComplexComponent._destroyPopup = function () {
		if (this._popuplist) {
			this._onDestroyPopup();

			this._clearPopup();
		}
	};
	_pComplexComponent._clearPopup = function () {
		if (this._popuplist) {
			this._setCurrentPopup(null);

			var items = this._popuplist;
			var count = items.length;

			for (var i = count - 1; i >= 0; i--) {
				if (items[i]) {
					items[i]._clear();
					items[i].destroy();
					delete items[i];
				}
			}

			this._popuplist.length = 0;
			this._popuplist = null;
		}
	};

	_pComplexComponent._createPopupControl = function (popup) {
		if (popup) {
			if (popup.createComponent(true)) {
				if (!this._popuplist) {
					this._popuplist = [];
				}

				this._popuplist.push(popup);

				return popup;
			}
		}

		return null;
	};
	_pComplexComponent._onCreatePopup = function () {
		var popup = null;

		if (popup = this._createPopupControl(new nexacro._PanelPopupControl("panelpopup", 0, 0, 0, 0, null, null, null, null, null, null, this))) {
			popup._type_name = "popup" + this._type_name;

			return popup;
		}
	};
	_pComplexComponent._onDestroyPopup = function () {
	};

	_pComplexComponent._createPopupChild = function (slot, isband) {
		var child = this._onCreatePopupChild(slot, isband);

		if (child) {
		}

		return child;
	};
	_pComplexComponent._destroyPopupChild = function () {
		if (this._grouplist) {
			this._onDestroyPopupChild();

			this._clearPopupChild();
		}
	};
	_pComplexComponent._clearPopupChild = function () {
		if (this._grouplist) {
			var items = this._grouplist;
			var count = items.length;

			for (var i = count - 1; i >= 0; i--) {
				if (items[i]) {
					items[i].destroy();
					delete items[i];
				}
			}

			this._grouplist.length = 0;
			this._grouplist = null;
		}
	};
	_pComplexComponent._createPopupChildControl = function (child) {
		if (child) {
			child._setControl(child._type_name);
			child._setPopupContains(true);

			child._initPopupSubLayouts(this);

			if (child.onCreateComponent()) {
				if (!this._grouplist) {
					this._grouplist = [];
				}

				this._grouplist.push(child);

				return child;
			}
		}

		return null;
	};
	_pComplexComponent._createPopupCloneControl = function (child) {
		if (child) {
			child._setControl(child._type_name);
			child._setPopupContains(true);

			child._initComponentClone(this);
			child._initPopupSubLayouts(this);

			if (child.onCreateComponent()) {
				if (!this._grouplist) {
					this._grouplist = [];
				}

				this._grouplist.push(child);

				return child;
			}
		}

		return null;
	};

	_pComplexComponent._onCreatePopupChild = function (slot, isband) {
		var child = null;

		if (child = this._createPopupCloneControl(new this.constructor("popupchild", 0, 0, 0, 0, null, null, null, null, null, null, this))) {
			return child;
		}
	};
	_pComplexComponent._onDestroyPopupChild = function () {
	};
	_pComplexComponent._onCloneProperities = function (source) {
	};

	_pComplexComponent.on_notify_popup_onpopup = function (popupindex, startindex, startlevel) {
	};
	_pComplexComponent.on_notify_popup_onclose = function (popupindex, startindex, startlevel) {
		var panel = this._getPanel();
		if (panel) {
			if (panel._isGroupPopup()) {
				panel._setPanelSlotStatusNoAction(startindex, nexacro._PanelSlotConst.STATUS_COLLPASE);
			}
			if (panel._isBandPopup()) {
				panel._setPanelSlotStatusBandNoAction(startindex, nexacro._PanelSlotConst.STATUS_COLLPASE);
			}
		}
	};

	_pComplexComponent._setCurrentPopup = function (popup, popupindex, startindex, startlevel) {
		this.__current_popupcontrol = popup;
		this.__current_popupindex = popupindex;
		this.__current_startindex = startindex;
		this.__current_startlevel = startlevel;
	};
	_pComplexComponent._getCurrentPopup = function () {
		return this.__current_popupcontrol;
	};
	_pComplexComponent._getCurrentPopupIndex = function () {
		return this.__current_popupindex;
	};
	_pComplexComponent._getCurrentPopupStart = function () {
		return this.__current_startindex;
	};
	_pComplexComponent._getCurrentPopupLevel = function () {
		return this.__current_startlevel;
	};

	_pComplexComponent._getPopupChildSize = function (popup) {
		return this._onGetPopupChildSize(popup);
	};
	_pComplexComponent._getPopupChildPosition = function (popup) {
		return this._onGetPopupChildPosition(popup);
	};

	_pComplexComponent._onGetPopupChildSize = function (popup) {
		var sizew = this.getPixelWidth();
		var sizeh = this.getPixelHeight();

		return [sizew, sizeh];
	};
	_pComplexComponent._onGetPopupChildPosition = function (popup) {
		var origin = popup._getOrigin(true);
		var attach_comp = popup._getAttachedComponent();

		var indent = this._onGetItemIndentSize(attach_comp);

		var posl = 0 + indent[0];
		var post = origin.getPixelHeight() + indent[1];

		return [posl, post];
	};



	_pComplexComponent._createPanelSelector = function (beginidx, finalidx, parts) {
		var selector = this._createSelector(beginidx, finalidx);
		var assistor = this._createSelectorAssist(beginidx, finalidx);

		if (selector) {
			var begincomp = null;
			var finalcomp = null;

			{

				begincomp = finalcomp = this._getRawItem([beginidx, finalidx]);
			}

			selector._attachSelect(begincomp, finalcomp);
			selector._attachAssist(assistor);

			selector._createdSelector();

			selector._setEventHandler("onresize", this.on_notify_selector_onresize, this);
		}
		if (assistor) {
			selector._createdAssistor();
		}

		return selector;
	};

	_pComplexComponent._createSelector = function (begin, final, itemslot) {
		var selector = this._onCreateSelector(itemslot);

		if (selector) {
			selector._initInfo(this, begin, final);
			this._setCurrentSelector(selector);
		}

		return selector;
	};
	_pComplexComponent._createSelectorAssist = function (begin, final, itemslot) {
		var child = this._onCreateSelectorAssist(itemslot);

		if (child) {
		}

		return child;
	};


	_pComplexComponent._destroySelector = function () {
		if (this._selectlist) {
			this._onDestroySelector();

			this._clearSelector();
		}
	};
	_pComplexComponent._destroySelectorAssist = function () {
		this._onDestroySelectorAssist();

		this._clearSelectorAssist();
	};

	_pComplexComponent._clearPanelSelector = function () {
		var panel = this._getPanel();

		if (panel) {
			panel._clearPanelSelector();
		}
	};
	_pComplexComponent._clearSelector = function () {
		if (this._selectlist) {
			this._setCurrentSelector(null);

			var ctrls = this._selectlist;
			var count = ctrls.length;

			for (var i = count - 1; i >= 0; i--) {
				if (ctrls[i]) {
					ctrls[i]._clearSelector();
					ctrls[i].destroy();
					delete ctrls[i];
				}
			}

			this._selectlist.length = 0;
			this._selectlist = null;
		}
	};
	_pComplexComponent._clearSelectorAssist = function () {
		if (this._assistlist) {
			var ctrls = this._assistlist;
			var count = ctrls.length;

			for (var i = count - 1; i >= 0; i--) {
				if (ctrls[i]) {
					ctrls[i].destroy();
					delete ctrls[i];
				}
			}

			this._assistlist.length = 0;
			this._assistlist = null;
		}
	};

	_pComplexComponent._createSelectControl = function (select) {
		if (select) {
			select._setControl(select._type_name);

			if (select.createComponent(true)) {
				if (!this._selectlist) {
					this._selectlist = [];
				}

				this._selectlist.push(select);

				return select;
			}
		}

		return null;
	};
	_pComplexComponent._createSelectAssistControl = function (child) {
		if (child) {
			child._setControl(child._type_name);

			if (child.createComponent(true)) {
				if (!this._assistlist) {
					this._assistlist = [];
				}

				this._assistlist.push(child);

				return child;
			}
		}

		return null;
	};

	_pComplexComponent._takeSelector = function (index, make) {
		var panel = this._getPanel();

		if (panel && panel._useSelector()) {
			if (index.length) {
				if (this._use_partsselector) {
					return panel._getPanelSelectorParts(panel._getPanelSelectorKey(index), make);
				}
				else {
					return panel._getPanelSelectorRange(panel._getPanelSelectorKey(index), make);
				}
			}
			else {
				return panel._getPanelSelector(panel._getPanelSelectorKey(index), make);
			}
		}
		return null;
	};

	_pComplexComponent._showSelector = function (index, select, notify) {
		if (select) {
			var idx = -1;
			var selector = null;

			if (index.length) {
				if (this._use_multiselector) {
					for (var i = 0, l = index.length; i < l; i++) {
						if (selector = this._takeSelector(index[i], select)) {
							selector._showSelector(select);
						}
					}
					return;
				}
				if (this._use_partsselector) {
					if (selector = this._takeSelector(index, select)) {
						selector._showSelector(select);
					}

					return;
				}

				idx = index[index.length - 1];
			}
			else {
				idx = index;
			}

			if (selector = this._takeSelector(idx, select)) {
				selector._showSelector(select);
			}
		}
		else {
			this._hideSelector(-1, null);
		}

		if (notify) {
			this.on_notify_selector_onchange(index, select);
		}
	};

	_pComplexComponent._hideSelector = function (index, selector) {
		this._clearSelector();
		this._clearSelectorAssist();
	};

	_pComplexComponent._setCurrentSelector = function (select) {
		this.__current_selectcontrol = select;
	};
	_pComplexComponent._getCurrentSelect = function () {
		return this.__current_selectcontrol;
	};


	_pComplexComponent._onCreateSelector = function () {
		var selecttype = this._panel ? this._panel._getSlotSelectorType() : nexacro._PanelSelectConst.TYPE_AREA;
		var selector = this._createSelectControl(new nexacro._PanelSelectControl("panelselector", selecttype, this));
		if (selector) {
		}
		return selector;
	};
	_pComplexComponent._onCreateSelectorAssist = function () {
		var assist = null;

		return assist;
	};
	_pComplexComponent._onDestroySelector = function () {
	};
	_pComplexComponent._onDestroySelectorAssist = function () {
	};


	_pComplexComponent.on_notify_selector_onchange = function (index, select) {
		this._on_basic_onselectorchange(index, select);
		this._on_fire_onselectorchange(index, select);
		this._on_default_onselectorchange(index, select);
	};
	_pComplexComponent._on_basic_onselectorchange = function (index, select) {
	};
	_pComplexComponent._on_default_onselectorchange = function (index, select) {
	};
	_pComplexComponent._on_fire_onselectorchange = function (index, select) {
	};

	_pComplexComponent.on_notify_selector_onresize = function (obj, e) {
		this._on_basic_onselectorresize(obj, e);
		this._on_fire_onselectorresize(obj, e);
		this._on_default_onselectorresize(obj, e);
	};
	_pComplexComponent._on_basic_onselectorresize = function (obj, e) {
	};
	_pComplexComponent._on_default_onselectorresize = function (obj, e) {
	};
	_pComplexComponent._on_fire_onselectorresize = function (obj, e) {
	};










	_pComplexComponent._layoutflag = 0x0007;

	_pComplexComponent._setLayoutFlag = function (flag) {
		this._layoutflag = flag;
	};
	_pComplexComponent._setLayoutContent = function (f) {
		f ? this._layoutflag |= 1 : this._layoutflag &= ~1;
	};
	_pComplexComponent._setLayoutAllowNC = function (f) {
		f ? this._layoutflag |= 2 : this._layoutflag &= ~2;
	};
	_pComplexComponent._setLayoutUnFixNC = function (f) {
		f ? this._layoutflag |= 4 : this._layoutflag &= ~4;
	};
	_pComplexComponent._setLayoutAutoFit = function (f) {
		f ? this._layoutflag |= 8 : this._layoutflag &= ~8;
	};

	_pComplexComponent._isContentLayout = function () {
		return this._layoutflag & 1;
	};
	_pComplexComponent._isAllowNCLayout = function () {
		return this._layoutflag & 2;
	};
	_pComplexComponent._isUnFixNCLayout = function () {
		return this._layoutflag & 4;
	};
	_pComplexComponent._isAutoFitLayout = function () {
		return this._layoutflag & 8;
	};

	_pComplexComponent._beginRecalcLayout = function () {
		return !(this.__recalcLayout ? false : this.__recalcLayout = true);
	};
	_pComplexComponent._finalRecalcLayout = function () {
		return !(this.__recalcLayout = false);
	};
	_pComplexComponent._recalcLayout = function (reset) {
		if (this._beginRecalcLayout()) {
			return;
		}

		if (this._is_created || reset) {
			var r = false;

			if (this._isContentLayout()) {
				if (this._isAllowNCLayout()) {
					r = this._resetNCChild(true);
				}
				if (r || reset) {
					this._onRecalcLayout(reset);
				}
			}
			if (this._isUnFixNCLayout()) {
				r = this._resetNCChild(false);
				if (r) {
					this._onRecalcLayout(false);
				}
			}
			if (r) {
				r = this._resetNCChild(false);
				if (r) {
					this._onRecalcLayout(false);
				}
			}
			if (r) {
				r = this._resetNCChild(false);
				if (r) {
					this._onRecalcLayout(false);
				}
			}
		}

		if (this._finalRecalcLayout()) {
			return;
		}
	};

	_pComplexComponent._onRecalcLayout = function (reset) {
		if (this._is_format_layout && this._ctxtdata) {
			if (this._is_panel_layout && this._panel) {
				if (reset || reset == undefined) {
					this._clearPanelSlot();
				}

				this._recalcFormatPanelLayout(reset);

				if (this._is_child && this._children) {
					this._recalcPanelChildLayout(reset);
				}

				if (this._is_items && this._items) {
					this._recalcPanelItemsLayout(reset);
				}
			}
			else {
				if (this._is_child && this._children) {
					this._onRecalcFormatChildLayout(reset);
				}

				if (this._is_items && this._items) {
					this._onRecalcFormatItemsLayout(reset);
				}
			}
		}
		else {
			if (this._is_panel_layout && this._panel) {
				if (reset || reset == undefined) {
					this._clearPanelSlot();
				}

				if (this._is_child && this._children) {
					this._recalcPanelChildLayout(reset);
				}

				if (this._is_items && this._items) {
					this._recalcPanelItemsLayout(reset);
				}
			}
			else {
				if (this._is_child && this._children) {
					this._onRecalcChildLayout(reset);
				}

				if (this._is_items && this._items) {
					this._onRecalcItemsLayout(reset);
				}
			}
		}

		if (this._use_container_multi) {
			this._onRecalcContainerSize();
		}

		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._recalcLayout();
		}

		if (this._use_expandmanager && this._expandmanager) {
			this._expandmanager._recalcLayout();
		}
	};

	_pComplexComponent._recalcFormatPanelLayout = function (reset) {
		var ctxts = this._ctxtdata;
		var panel = this._panel;

		if (ctxts && panel) {
		}
	};
	_pComplexComponent._onRecalcFormatChildLayout = function (reset) {
		var ctxts = this._ctxtdata;

		if (ctxts) {
			var child = this._getChildren();
			var count = child ? child.length : 0;


			{

				for (var i = 0; i < count; i++) {
					var item = child[i];
					if (item && item._update_position) {
						item._update_position(true, true);
					}
				}
			}

			this._updateChildScrollInfo(true);
		}
	};
	_pComplexComponent._onRecalcFormatItemsLayout = function (reset) {
		var ctxts = this._ctxtdata;

		if (ctxts) {
			this._updateItemScrollInfo("reset", true);
		}
	};

	_pComplexComponent._recalcPanelChildLayout = function (reset) {
		var panel = this._panel;

		if (panel) {
			if (panel._panel_layout >= 0) {
				if (reset || reset == undefined) {
					var child = this._getChildren();

					this._resetPanelSlot(child, -1, -1);
				}

				this._recalcPanelChildSlot();
			}
			else {
				this._onRecalcPanelChildLayout(reset);
			}

			this._updateChildScrollInfo(true);
		}
	};

	_pComplexComponent._recalcPanelItemsLayout = function (reset) {
		var panel = this._panel;

		if (panel) {
			if (panel._panel_layout >= 0) {
				if (reset || reset === undefined) {
					var items = this._getItems();

					if (!panel._isPartSlot()) {
						this._resetPanelSlot(items, -1, -1);
					}
					else {
						this._calcItemScrollInfo(-1, panel._isRowFirst());

						var viewstart = this._getItemScrollViewStart();
						var viewcount = this._getItemScrollViewCount();
						var prevcount = this._getItemScrollPrevCount();
						var nextcount = this._getItemScrollNextCount();

						this._resetPanelSlot(items, viewstart, viewcount, prevcount, nextcount);
					}
				}

				this._recalcPanelItemSlot();
			}
			else {
				this._onRecalcPanelItemsLayout(reset);
			}

			if (reset) {
				this._resetItemScrollInfo();
			}
		}
	};

	_pComplexComponent._onRecalcChildLayout = function (reset) {
		var i;

		var ctrl;
		var ctrl_left, ctrl_top;
		var ctrl_full, ctrl_calc, ctrl_size;

		var children = this._getChildren();
		var children_len = children.length;

		var leadchild = this._getLeadChild();

		var client_left = this._getClientLeft();
		var client_top = this._getClientTop();
		var client_width = this._getClientWidth();
		var client_height = this._getClientHeight();

		if (children_len <= 0) {
			return;
		}
		else if (children_len == 1) {
			ctrl = children[0];

			ctrl.move(client_left, client_top, client_width, client_height, null, null);

			return;
		}
		else {
			if (leadchild) {
				var lead_size;

				if (client_width > client_height) {
					lead_size = client_width / 2;
					ctrl_calc = children_len - 1;
					ctrl_size = client_height;
					ctrl_full = client_height *  ctrl_calc;
					ctrl_left = client_left;

					if (lead_size < ctrl_full) {
						ctrl_size = lead_size / ctrl_calc;
					}
					else {
						lead_size = client_width - ctrl_full;
					}

					for (i = 0; i < children_len; i++) {
						ctrl = children[i];
						if (ctrl) {
							if (ctrl == leadchild) {
								ctrl.move(ctrl_left, client_top, lead_size, client_height, null, null);
								ctrl_left += lead_size;
							}
							else {
								ctrl.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
								ctrl_left += ctrl_size;
							}
						}
					}
				}
				else {
					lead_size = client_height / 2;
					ctrl_calc = children_len - 1;
					ctrl_size = client_width;
					ctrl_full = client_width *  ctrl_calc;
					ctrl_top = client_top;

					if (lead_size < ctrl_full) {
						ctrl_size = lead_size / ctrl_calc;
					}
					else {
						lead_size = client_height - ctrl_full;
					}

					for (i = 0; i < children_len; i++) {
						ctrl = children[i];
						if (ctrl) {
							if (ctrl == leadchild) {
								ctrl.move(client_left, ctrl_top, client_width, lead_size, null, null);
								ctrl_top += lead_size;
							}
							else {
								ctrl.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
								ctrl_top += ctrl_size;
							}
						}
					}
				}
			}
			else {
				if (client_width > client_height) {
					ctrl_size = client_width / children_len;
					ctrl_left = client_left;

					for (i = 0; i < children_len; i++, ctrl_left += ctrl_size) {
						ctrl = children[i];
						if (ctrl) {
							ctrl.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
						}
					}
				}
				else {
					ctrl_size = client_height / children_len;
					ctrl_top = client_top;

					for (i = 0; i < children_len; i++, ctrl_top += ctrl_size) {
						ctrl = children[i];
						if (ctrl) {
							ctrl.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
						}
					}
				}
			}
		}

		this._updateChildScrollInfo(true);
	};

	_pComplexComponent._onRecalcItemsLayout = function (reset) {
		var i;
		var item;
		var items = this._getItems();
		var count = items ? items.length : 0;

		var client_left = this._getClientLeft();
		var client_top = this._getClientTop();
		var client_width = this._getClientWidth();
		var client_height = this._getClientHeight();

		var ctrl_left, ctrl_top;
		var ctrl_size;

		if (count <= 0) {
			return;
		}
		else {
			if (client_width > client_height) {
				this._isColFirst = false;

				ctrl_size = client_width / count;
				ctrl_left = client_left;

				for (i = 0; i < count; i++, ctrl_left += ctrl_size) {
					item = items[i] ? items[i] : this._getPartItem(i);
					if (item) {
						item.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
					}
				}
			}
			else {
				this._isColFirst = true;

				ctrl_size = client_height / count;
				ctrl_top = client_top;

				for (i = 0; i < count; i++, ctrl_top += ctrl_size) {
					item = items[i] ? items[i] : this._getPartItem(i);
					if (item) {
						item.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
					}
				}
			}

			return;
		}
	};

	_pComplexComponent._onRecalcContainerSize = function () {
		var panel = this._getPanel();
		var control_elem = this.getElement();
		if (control_elem && panel) {
			control_elem._setInnerElementScrollMaxTops(panel._getPanelLimitOverHeight());
		}
	};

	_pComplexComponent._onChangeContainerRect = function (width, height) {
		nexacro.SimpleComponent.prototype._onChangeContainerRect.call(this, width, height);
	};






	_pComplexComponent._getChildren = function () {
		return this._children;
	};
	_pComplexComponent._getChild = function (index) {
		return this._children ? this._children[index] : null;
	};
	_pComplexComponent._getLeadChild = function () {
		return this._leadchild ? this._leadchild : (this._children && this._children.length ? this._children[0] : null);
	};
	_pComplexComponent._getCurrChild = function () {
		return this._currchild;
	};
	_pComplexComponent._getPrevChild = function (curr, focus, edit) {
		var children = this._children;
		if (!children || !curr) {
			return null;
		}
		var curridx = children.indexOf(curr);

		for (var i = curridx - 1; i >= 0; i--) {
			var child = children[i];
			if (!child) {
				continue;
			}

			if (!edit && !focus) {
				return child;
			}

			var focusable = !focus || child._isFocusAcceptable();
			var editable = !edit || child._isEditableComponent();

			if (focusable && editable) {
				return child;
			}
		}
	};
	_pComplexComponent._getNextChild = function (curr, focus, edit) {
		var children = this._children;
		if (!children || !curr) {
			return null;
		}
		var curridx = children.indexOf(curr);

		for (var i = curridx + 1, l = children.length; i < l; i++) {
			var child = children[i];
			if (!child) {
				continue;
			}

			if (!edit && !focus) {
				return child;
			}

			var focusable = !focus || child._isFocusAcceptable();
			var editable = !edit || child._isEditableComponent();

			if (focusable && editable) {
				return child;
			}
		}
	};
	_pComplexComponent._getLastChild = function () {
		var children = this._children;
		if (children) {
			return children[children.length - 1];
		}

		return null;
	};
	_pComplexComponent._setLeadChild = function (child) {
		this._leadchild = child;
	};
	_pComplexComponent._setCurrChild = function (child) {
		this._currchild = child;
	};

	_pComplexComponent._onGetChildAreaWidth = function () {
		return this._getClientWidth();
	};

	_pComplexComponent._onGetChildAreaHeight = function () {
		return this._getClientHeight();
	};

	_pComplexComponent._addChildCollection = function (childid, child) {
		if (this._childlst) {
			this._childlst[childid] = child;
		}
	};
	_pComplexComponent._findChildCollection = function (childid) {
		return this._childlst ? this._childlst[childid] : null;
	};
	_pComplexComponent._findChildCollectIndex = function (child) {
		return this._children ? this._children.indexOf(child) : -1;
	};
	_pComplexComponent._findChild = function (childid) {
		var child = this[childid];

		if (child) {
			return child;
		}
		else {
			return this._findChildCollection(childid);
		}
	};
	_pComplexComponent._findChildIndex = function (child) {
		return this._findChildCollectIndex(child);
	};
	_pComplexComponent._getChildId = function (child) {
		return child ? child.id ? child.id : child.name : "";
	};

	_pComplexComponent._createChild = function () {
		if (this._is_child && this._children) {
			{

				this.onCreateChild(this._getCtxtData());
			}
		}
	};
	_pComplexComponent._createdChild = function (window) {
		if (this._is_child && this._children) {
			this.onCreatedChild(window);
		}
	};
	_pComplexComponent._updateChild = function (child) {
		if (this._is_child && this._children) {
			this.onUpdateChild(child);
		}
	};
	_pComplexComponent._destroyChild = function () {
		if (this._is_child && this._children) {
			this.onDestroyChild();

			this._clearChild();
		}
	};
	_pComplexComponent._clearChild = function () {
		if (this._is_child && this._children) {
			if (this._childlst) {
				this._childlst = {
				};
			}

			var child = this._children;
			var count = child.length;

			for (var i = count - 1; i >= 0; i--) {
				if (child[i]) {
					child[i].destroy();
					delete child[i];
				}
			}

			this._children.length = 0;
			this._children = [];
		}
	};

	_pComplexComponent.createChildControl = function (child) {
		if (child) {
			child._setControl(child._type_name);

			if (child.createComponent(true)) {
				this._children.push(child);
			}

			return child;
		}

		return null;
	};
	_pComplexComponent.createNCChild = function (child) {
		if (child) {
			child._is_nc_control = true;

			if (child.createComponent(true)) {
				return child;
			}
		}

		return null;
	};
	_pComplexComponent.createNCChildControl = function (child) {
		if (child) {
			child._is_nc_control = true;
			child._setControl();

			if (child.createComponent(true)) {
				return child;
			}
		}

		return null;
	};
	_pComplexComponent.createCloneChildControl = function (child) {
		if (child) {
			child._setControl(child._type_name);

			child._initComponentClone(this);

			if (child.onCreateComponent()) {
				this._children.push(child);

				return child;
			}
		}

		return null;
	};
	_pComplexComponent.createChildCtxtControl = function (ctxt) {
		if (ctxt) {
			var ctxtchild = ctxt._items;
			if (ctxtchild) {
				var i, n;
				var child;
				var childs = [];

				if (nexacro._isArray(ctxtchild)) {
					for (i = 0, n = ctxtchild.length; i < n; i++) {
						child = this.createCtxtControl(ctxtchild[i], i, true);

						childs.push(this.createChildControl(child));
					}

					return childs;
				}
				else {
					child = this.createCtxtControl(ctxtchild);

					return this.createChildControl(child);
				}
			}
		}

		return null;
	};

	_pComplexComponent.onCreatedChild = function (window) {
		{

			var child = this._getChildren();
			var count = child ? child.length : 0;

			for (var i = 0; i < count; i++) {
				child[i].on_created(window);
			}
		}
	};



	_pComplexComponent.onCreateChild = function (contextdata) {
		if (this._is_format_layout && contextdata) {
			var ctrls = this.createChildCtxtControl(contextdata);
			var child = ctrls;



			return child;
		}
		else {
			if (this.child = this.createChildControl(new nexacro.Button("child", 0, 0, 0, 0, null, null, null, null, null, null, this))) {
				this.child._setEventHandler("onclick", this.on_notify_child_onclick, this);
				this.child._setEventHandler("onsetfocus", this.on_notify_child_onsetfocus, this);
				this.child._setEventHandler("onkillfocus", this.on_notify_child_onkillfocus, this);
			}
		}
	};

	_pComplexComponent.onUpdateChild = function (child) {
	};

	_pComplexComponent.onDestroyChild = function () {
	};





	_pComplexComponent.on_notify_child_onclick = function (obj, e) {
		this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject, e.meta_key);
	};

	_pComplexComponent.on_notify_child_ondblclick = function (obj, e) {
		this.on_fire_ondblclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject, e.meta_key);
	};

	_pComplexComponent.on_notify_child_onsetfocus = function (obj, e) {
		this.on_fire_onsetfocus(e.oldcomponent, e.oldreferencecomponent);
	};
	_pComplexComponent.on_notify_child_onkillfocus = function (obj, e) {
		this.on_fire_onkillfocus(e.newcomponent, e.newreferencecomponent);
	};



	_pComplexComponent._getItems = function () {
		return this._items;
	};
	_pComplexComponent._getItem = function (index, partcreate) {
		var items = this._getItems();
		var count = items.length;

		if (items && count) {
			var ret;

			var i;

			var n;

			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;
			var tailcount = this._tail_count && this._use_tailitem ? this._tail_count : 0;
			var bodycount = this._body_count ? this._body_count : 1;

			var c = index *  bodycount + headcount;

			if (index >= 0 && index < count) {
				if (this._use_partitem) {
					if (c >= count || !items[c]) {
						if (partcreate) {
							this._createPartItem(index);
						}
					}

					if (this._body_count > 1) {
						ret = new Array(bodycount);
						for (i = 0, n = bodycount; i < n; i++, c++) {
							ret[i] = items[c];
						}

						return ret;
					}
					else {
						return items[c];
					}
				}
				else {
					if (this._body_count > 1) {
						ret = new Array(bodycount);
						for (i = 0, n = bodycount; i < n; i++, c++) {
							ret[i] = items[c];
						}

						return ret;
					}
					else {
						return items[c];
					}
				}
			}
			if (index == -1 && this._use_headitem && headcount) {
				if (headcount > 1) {
					ret = new Array(headcount);
					for (i = 0, n = headcount; i < n; i++) {
						ret[i] = items[i];
					}

					return ret;
				}
				else {
					return items[0];
				}
			}
			if (index == -2 && this._use_tailitem && tailcount) {
				c = count - tailcount;

				if (tailcount > 1) {
					ret = new Array(tailcount);
					for (i = 0; c < count; i++, c++) {
						ret[i] = items[c];
					}

					return ret;
				}
				else {
					return items[c];
				}
			}
		}

		return null;
	};

	_pComplexComponent._getItemChildByIndex = function (index, subindex, childindex) {
		var item = this._getItem(index);
		if (item) {
			if (nexacro._isArray(item)) {
				item = item[subindex];
			}

			if (item) {
				if (item._is_child && item._getChild) {
					return item._getChild(childindex);
				}

				if (item._is_items && item._getItem) {
					return item._getItem(childindex);
				}
			}
		}

		return null;
	};

	_pComplexComponent._getItemChildById = function (index, subid, childid) {
		var item = this._getItem(index);
		if (item) {
			if (nexacro._isArray(item)) {
				for (var i = 0; i < item.length; i++) {
					if (item[i] && item[i]._band == subid) {
						item = item[i];
					}
				}
			}

			if (item) {
				if (item._is_child && item._getChild) {
					return item._findChild(childid);
				}
			}
		}

		return null;
	};

	_pComplexComponent._getItemChildInPopup = function (index, subindex, childindex) {
		var slot = this._getPanelSlot(index);
		if (slot) {
			var popup = slot._getSlotPopup();
			if (popup) {
				var comp = popup._getAttachedComponent();
				if (comp && comp._getChild) {
					return comp._getChild(childindex);
				}
			}
		}

		return null;
	};

	_pComplexComponent._getRawItem = function (index) {
		if (index.length) {
			return this._getRawItemInItems(this._getItem(index[0]), index[1]);
		}
		else {
			return this._getRawItemInItems(this._getItem(index), 0);
		}
	};
	_pComplexComponent._getRawItemInItems = function (items, index) {
		var count = items ? items.length : 0;
		if (count) {
			if (index && index < count) {
				return items[index];
			}
			else {
				return items[0];
			}
		}
		return items;
	};

	_pComplexComponent._delItem = function (index, destroy) {
		var items = this._getItems();
		var count = items.length;

		if (items && count) {
			var i;

			var n;

			var headcount = this._head_count && this._use_headitem ? this._head_count : 0;
			var tailcount = this._tail_count && this._use_tailitem ? this._tail_count : 0;
			var bodycount = this._body_count ? this._body_count : 1;

			var c = index *  bodycount + headcount;

			if (index >= 0 && index < count) {
				if (bodycount > 1) {
					for (i = 0, n = bodycount; i < n; i++, c++) {
						if (items[c]) {
							if (items[c].destroy) {
								items[c].destroy();
							}
							items[c] = null;
						}
					}
				}
				else {
					if (items[c]) {
						if (items[c].destroy) {
							items[c].destroy();
						}
						items[c] = null;
					}
				}

				return bodycount;
			}
			if (index == -1 && this._use_headitem && headcount) {
				c = 0;

				if (headcount > 1) {
					for (i = 0, n = headcount; i < n; i++, c++) {
						if (items[c]) {
							if (items[c].destroy) {
								items[c].destroy();
							}
							items[c] = null;
						}
					}
				}
				else {
					if (items[c]) {
						if (items[c].destroy) {
							items[c].destroy();
						}
						items[c] = null;
					}
				}

				return headcount;
			}
			if (index == -2 && this._use_tailitem && tailcount) {
				c = count - tailcount;

				if (tailcount > 1) {
					for (i = 0; c < count; i++, c++) {
						if (items[c]) {
							if (items[c].destroy) {
								items[c].destroy();
							}
							items[c] = null;
						}
					}
				}
				else {
					if (items[c]) {
						if (items[c].destroy) {
							items[c].destroy();
						}
						items[c] = null;
					}
				}

				return tailcount;
			}
		}

		return 0;
	};

	_pComplexComponent._getItemsCount = function () {
		if (this._is_databind) {
			return this._items.length;
		}
		else {
			return this._onGetItemsCount();
		}
	};

	_pComplexComponent._onGetItemsCount = function () {
		return this.itemcount ? this.itemcount : 0;
	};

	_pComplexComponent._onGetItemsAreaWidth = function () {
		return Math.max(this._getClientWidth(), 0);
	};

	_pComplexComponent._onGetItemsAreaHeight = function () {
		return Math.max(this._getClientHeight(), 0);
	};



	_pComplexComponent._createItems = function () {
		if (this._is_items && this._items) {
			if (this._is_databind) {
				this._createBindItems();
			}
			else {
				this._createRepeatItems();
			}
		}
	};
	_pComplexComponent._createdItems = function (window) {
		if (this._is_items && this._items) {
			this.onCreatedItems(window);
		}
	};
	_pComplexComponent._createPartItemList = function (count) {
		if (this._is_items && this._items) {
			this._items.length = count > 0 ? count *  (this._body_count ? this._body_count : 1) : 0;
		}
	};
	_pComplexComponent._createPartItem = function (index) {
		{

			var bind = this._getBindData(index);
			var ctxt = this._getCtxtData(index);

			var item = this.onCreateItem(ctxt, bind, index);


			if (item) {
				this._setItemIndex(item, index);
				this._setCtxtItemInfo(item, ctxt, index);
				this._setBindItemInfo(item, bind, index);
				this._setItemSubLayoutInfo(item, bind, index);

				this._createdItem(item, this._getWindow());

				this._setItemZIndex(item, 0);

				this._setItemIndentSize(item, this._onGetIndentSize());
			}
		}
	};

	_pComplexComponent._createdItem = function (item, window) {
		if (item) {
			if (nexacro._isArray(item)) {
				for (var i = 0, l = item.length; i < l; i++) {
					var itm = item[i];
					if (itm) {
						itm.onCreated(window);
					}
				}
			}
			else {
				item.onCreated(window);
			}
		}
	};
	_pComplexComponent._updateItems = function (index, count, info) {
		if (this._is_items && this._items) {
			if (index >= 0) {
				var i, j;

				var n, m;

				for (i = index, n = !count || count < 0 ? this._getItemsCount() : index + count; i < n; i++) {
					var item = this._getItem(i);
					var bind = this._getBindData(i);

					if (item) {
						this._setBindItemInfo(item, bind, i);

						if (nexacro._isArray(item)) {
							for (j = 0, m = item.length; j < m; j++) {
								var band = item[j];
								if (band && band.onUpdateItem) {
									band.onUpdateItem(i, info);
								}
							}
						}
						else {
							if (item && item.onUpdateItem) {
								item.onUpdateItem(i, info);
							}
						}
					}
				}
			}
		}
	};
	_pComplexComponent._updateItem = function (item, index, info) {
		if (item) {
			this._setBindItemInfo(item, this._getBindData(index), index);

			if (nexacro._isArray(item)) {
				for (var i = 0; i < item.length; i++) {
					var band = item[i];
					if (band && band.onUpdateItem) {
						band.onUpdateItem(index, info);
					}
				}
			}
			else {
				if (item && item.onUpdateItem) {
					item.onUpdateItem(index, info);
				}
			}
		}
	};
	_pComplexComponent._destroyItems = function () {
		if (this._is_items && this._items) {
			this.onDestroyItems();

			this._clearItems();
		}
	};
	_pComplexComponent._clearItems = function () {
		if (this._is_items && this._items) {
			var items = this._getItems();
			var count = items.length;

			for (var i = count - 1; i >= 0; i--) {
				if (items[i]) {
					items[i].destroy();
					delete items[i];
				}
			}

			items.length = 0;
		}
	};

	_pComplexComponent._createBindItems = function () {
		{

			var i, s;
			var n;

			var bind, ctxt;
			var item;
			var clvl, sidx, slvl;

			if (this._use_headitem) {
				ctxt = this._getCtxtData(-1);

				item = this.onCreateItemBegin(ctxt);
				if (item) {
					this._setItemIndex(item, -1);
					this._setCtxtItemInfo(item, ctxt, -1);
					this._head_count = nexacro._isArray(item) ? item.length : 1;
				}
			}

			var bindcount = this._getBindCount();
			if (bindcount) {
				if (this._use_partitem) {
					this._createPartItemList(bindcount);
				}
				else if (this._isPanelSubGroupPopup()) {
					sidx = this._getPanelStartIndex();
					slvl = this._getPanelStartLevel();

					for (i = sidx, n = bindcount, s = 0; i < n; i++) {
						bind = this._getBindData(i);
						if (!bind) {
							continue;
						}

						clvl = bind._getLevelValue();

						if (clvl == slvl || clvl == undefined) {
							ctxt = this._getCtxtData(i);

							item = this.onCreateItem(ctxt, bind, i);


							if (item) {
								this._setItemIndex(item, s++);
								this._setCtxtItemInfo(item, ctxt, i);
								this._setBindItemInfo(item, bind, i);
								this._setItemSubLayoutInfo(item, bind, i);
								this._setItemIndentSize(item, this._onGetIndentSize());
							}
						}
						else if (clvl > slvl) {
							continue;
						}
						else {
							break;
						}
					}
				}
				else {
					for (i = 0, n = bindcount; i < n; i++) {
						bind = this._getBindData(i);
						ctxt = this._getCtxtData(i);

						item = this.onCreateItem(ctxt, bind, i);


						if (item) {
							this._setItemIndex(item, i);
							this._setCtxtItemInfo(item, ctxt, i);
							this._setBindItemInfo(item, bind, i);
							this._setItemSubLayoutInfo(item, bind, i);
							this._setItemIndentSize(item, this._onGetIndentSize());
						}
					}
				}
			}
			else if (this._use_nullitem) {
				ctxt = this._getCtxtData(-4);

				item = this.onCreateItemNull(ctxt);
				if (item) {
					this._setItemIndex(item, -4);
					this._setCtxtItemInfo(item, ctxt, -4);
					this._null_count = nexacro._isArray(item) ? item.length : 1;
				}
			}

			{

				ctxt = this._getCtxtData(-2);

				item = this.onCreateItemFinal(ctxt);
				if (item) {
					this._setItemIndex(item, -2);
					this._setCtxtItemInfo(item, ctxt, -2);
					this._tail_count = nexacro._isArray(item) ? item.length : 1;
				}
			}
		}
	};

	_pComplexComponent._createRepeatItems = function () {
		{

			var i;

			var n;

			var ctxt;
			var item;

			{

				ctxt = this._getCtxtData(-1);

				this.onCreateItemBegin(ctxt);
			}

			for (i = 0, n = this._getItemsCount(); i < n; i++) {
				ctxt = this._getCtxtData(i);

				item = this.onCreateItem(ctxt, null, i);
				if (item) {
					this._setItemSubLayoutInfo(item, null, i);
				}
			}

			{

				ctxt = this._getCtxtData(-2);

				this.onCreateItemFinal(ctxt);
			}
		}
	};
	_pComplexComponent.createItemNCControl = function (item, rowindex, subindex) {
		if (item) {
			item._is_nc_control = true;

			item._setControl(item._type_name);

			if (item.createComponent(true)) {
				return item;
			}
		}

		return null;
	};
	_pComplexComponent.createItemControl = function (item, rowindex, subindex) {
		if (item) {
			var typename = item._getItemTypeName();

			item._setControl(typename);

			if (item.createComponent(true)) {
				if (this._use_partitem && rowindex >= -2) {
					var pos = rowindex ? rowindex : 0;
					var sub = subindex ? subindex : 0;
					var len = this._items.length;

					var headcount = this._head_count ? this._head_count : 0;
					var bodycount = this._body_count ? this._body_count : 1;
					var tailcount = this._tail_count ? this._tail_count : 0;

					switch (pos) {
						case -1:
							pos = (this._use_headitem ? sub : -1);
							break;
						case -2:
							pos = (this._use_tailitem ? (len - tailcount + sub) : -1);
							break;
						default:
							pos = (this._use_headitem ? headcount : 0) + (pos *  bodycount) + sub;
							break;
					}


					if (pos >= len) {
						this._items.length = pos + 1;
					}
					if (pos >= 0) {
						this._items[pos] = item;
					}
				}
				else {
					this._items.push(item);
				}
			}

			return item;
		}

		return null;
	};
	_pComplexComponent.createItemCtxtControl = function (ctxt, index, nc) {
		if (ctxt) {
			var i;

			var n;

			var items, item;

			if (nexacro._isArray(ctxt)) {
				items = [];

				for (i = 0, n = ctxt.length; i < n; i++) {
					item = this.createCtxtControl(ctxt[i], index);

					items.push(nc ? this.createItemNCControl(item, index, i) : this.createItemControl(item, index, i));
				}

				return items;
			}
			else {
				item = this.createCtxtControl(ctxt, index);

				return nc ? this.createItemNCControl(item, index) : this.createItemControl(item, index);
			}
		}

		return null;
	};

	_pComplexComponent.onCreatedItems = function (window) {
		var items = this._getItems();
		var count = items ? items.length : 0;

		for (var i = 0; i < count; i++) {
			var item = items[i];
			if (item) {
				item.onCreated(window);
			}
		}
	};

	_pComplexComponent._getItemTypeName = function () {
		return this._type_name;
	};
	_pComplexComponent._setItemIndex = function (item, index) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._onSetItemIndex(item[i], index);
			}
		}
		else {
			this._onSetItemIndex(item, index);
		}
	};
	_pComplexComponent._getItemIndex = function (item) {
		return this._onGetItemIndex(item);
	};
	_pComplexComponent._setItemSubIndex = function (item, subindex) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._setItemSubIndex(item[i], subindex);
			}
		}
		else {
			this._onSetItemSubIndex(item, subindex);
		}
	};
	_pComplexComponent._getItemSubIndex = function (item) {
		return this._onGetItemSubIndex(item);
	};
	_pComplexComponent._setItemId = function (item, itemid) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._onSetItemId(item[i], itemid);
			}
		}
		else {
			this._onSetItemId(item, itemid);
		}
	};
	_pComplexComponent._getItemId = function (item) {
		return this._onGetItemId ? this._onGetItemId(item) : item ? item.id ? item.id : item.name : "";
	};
	_pComplexComponent._setItemValue = function (item, itemvalue) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._onSetItemValue(item[i], itemvalue);
			}
		}
		else {
			this._onSetItemValue(item, itemvalue);
		}
	};
	_pComplexComponent._getItemValue = function (item) {
		return this._onGetItemValue(item);
	};
	_pComplexComponent._setItemZIndex = function (item, zindex) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._onSetItemZIndex(item[i], zindex);
			}
		}
		else {
			this._onSetItemZIndex(item, zindex);
		}
	};
	_pComplexComponent._setItemIndentSize = function (item, indentsize) {
		if (nexacro._isArray(item)) {
			for (var i = 0, l = item.length; i < l; i++) {
				this._onSetItemIndentSize(item[i], indentsize);
			}
		}
		else {
			this._onSetItemIndentSize(item, indentsize);
		}
	};

	_pComplexComponent._getItemLeft = function (index, stat) {
		return this._onGetItemLeft(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
	};
	_pComplexComponent._getItemTop = function (index, stat) {
		return this._onGetItemTop(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
	};
	_pComplexComponent._getItemWidth = function (index, stat) {
		return this._onGetItemWidth(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
	};
	_pComplexComponent._getItemHeight = function (index, stat) {
		return this._onGetItemHeight(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
	};
	_pComplexComponent._getItemArrWidth = function (index, stat, width) {
		return this._onGetItemArrWidth(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE, width);
	};
	_pComplexComponent._getItemArrHeight = function (index, stat, height) {
		return this._onGetItemArrHeight(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE, height);
	};

	_pComplexComponent._getItemRect = function (rowindex, bandseq, stat) {
		return this._onGetItemRect(rowindex, bandseq, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
	};
	_pComplexComponent._getItemChildRect = function (rowindex, bandseq, childidex) {
		return this._onGetItemChildRect(rowindex, bandseq, childidex);
	};

	_pComplexComponent._getItemViewCountRow = function (rowfirst) {
		var rc;

		var ih = this._getItemHeight(0);
		if (ih <= 0) {
			return 0;
		}
		var ch = this._getClientHeight();
		if (ch <= 0) {
			return 0;
		}

		if (rowfirst) {
			rc = Math.floor(ch / ih);

			return rc > 0 ? rc : 1;
		}
		else {
			rc = Math.ceil(ch / (ih *  this._getItemViewCountCol(false)));

			return rc > 0 ? rc : 0;
		}
	};
	_pComplexComponent._getItemViewCountCol = function (rowfirst) {
		var cc;

		var iw = this._getItemWidth(0);
		if (iw <= 0) {
			return 0;
		}
		var cw = this._getClientWidth();
		if (cw <= 0) {
			return 0;
		}

		if (rowfirst) {
			cc = Math.round(cw / (iw *  this._getItemViewCountRow(true)));

			return cc > 0 ? cc : 0;
		}
		else {
			cc = Math.floor(cw / iw);

			return cc > 0 ? cc : 1;
		}
	};
	_pComplexComponent._getItemViewIndexRow = function (pos, rowfirst) {
		var rc;

		var ih = this._getItemHeight(0, rowfirst);
		if (ih > 0) {
			rc = Math.floor(pos / ih) *  this._getItemViewCountCol(false);

			return rc > 0 ? rc : 0;
		}
		else {
			return 0;
		}
	};
	_pComplexComponent._getItemViewIndexCol = function (pos, rowfirst) {
		var cc;

		var iw = this._getItemWidth(0);
		if (iw > 0) {
			cc = Math.floor(pos / iw) *  this._getItemViewCountRow(true);

			return cc > 0 ? cc : 0;
		}
		else {
			return 0;
		}
	};
	_pComplexComponent._showItem = function (index, select) {
		if (!select) {
			return;
		}

		var panel = this._getPanel();
		if (panel) {
			if (panel._isColFirst()) {
				var vp = this.getVScrollPos();
				var it = this._getItemTop(index, -9);
				var ih = this._getItemHeight(index, -9);
				var ib = it + ih;
				var ch = this._getClientHeight();

				if (ch <= ih) {
					this.scrollTo(0, it);
					this._updateItemScrollInfo("itemshow", true);
					return;
				}
				else {
					if (it < vp) {
						this.scrollTo(0, it);
						this._updateItemScrollInfo("itemshow", true);
						return;
					}
					if (ib > vp + ch) {
						this.scrollTo(0, ib - ch);
						this._updateItemScrollInfo("itemshow", true);
						return;
					}
				}
			}
			else {
				var hp = this.getHScrollPos();
				var lp = this._getItemLeft(index);
				var iw = this._getItemWidth(index);
				var cw = this._getClientWidth();

				if (lp < hp || lp > hp + cw) {
					this.scrollTo(lp, 0);
					this._updateItemScrollInfo("itemshow", true);
					return;
				}
				if (lp + iw > hp + cw) {
					this.scrollTo(lp + iw - cw, 0);
					this._updateItemScrollInfo("itemshow", true);
					return;
				}
			}
		}
	};
	_pComplexComponent._isShowBand = function (index, vp, ch) {
		var panel = this._getPanel();
		if (panel) {
			var slot = panel._getPanelSlot(index);
			if (slot) {
				var bandstat = slot._getSlotStatusBand();
				var targets = slot._getSlotTarget();
				if (targets) {
					var vt = vp;
					var vb = vt + ch;
					var tt = 0;
					var tb = 0;

					if (nexacro._isArray(targets)) {
						for (var i = 0; i < targets.length; i++) {
							var target = targets[i];
							if (bandstat > 0) {
								if (i == 0) {
									tt = target.getOffsetTop();
								}
								if (i == (targets.length - 1)) {
									tb = target.getOffsetBottom();
								}
							}
							else {
								if (i == 0) {
									tt = target.getOffsetTop();
									tb = target.getOffsetBottom();

									break;
								}
							}
						}
					}
					else {
						tt = targets.getOffsetTop();
						tb = targets.getOffsetBottom();
					}

					if (vt < tt && vb > tb) {
						return true;
					}
				}
			}
		}

		return false;
	};
	_pComplexComponent._focusItem = function (index) {
		var item = this._getItem(index);

		if (item && item.length) {
			item = item[0];
		}
		if (item && item.setFocus) {
			item.setFocus(true, true);
		}

		this._showItem(index, true);
	};
	_pComplexComponent._focusItemChild = function (index, subindex, childindex) {
		var child = this._getItemChildByIndex(index, subindex, childindex);

		if (child && child.setFocus) {
			child.setFocus(true, true);
		}
	};

	_pComplexComponent.onCreateItem = function (ctxtdata, binddata, index, nc) {
		var i;

		var n;

		var item;

		if (this._is_format_layout && ctxtdata) {
			item = this.createItemCtxtControl(ctxtdata, index, nc);
			if (item) {
				if (nexacro._isArray(item)) {
					for (i = 0, n = item.length; i < n; i++) {
						var each = item[i];
						if (!each) {
							continue;
						}

						each._setEventHandler("onclick", this.on_notify_item_onclick, this);
					}
				}
				else {
					item._setEventHandler("onclick", this.on_notify_item_onclick, this);
				}
			}

			return item;
		}
		else {
			item = this.createItemControl(new nexacro.Button("item", 0, 0, 0, 0, null, null, null, null, null, null, this), index);
			if (item) {
				item.set_text("text");
				item._setEventHandler("onclick", this.on_notify_item_onclick, this);
			}

			return item;
		}
	};
	_pComplexComponent.onCreateItemBegin = function (ctxtdata, binddata, nc) {
		if (this._is_format_layout && ctxtdata) {
			var item = this.createItemCtxtControl(ctxtdata, -1, nc);

			if (item) {
				item._setEventHandler("onclick", this.on_notify_item_onclick, this);
			}

			return item;
		}
	};
	_pComplexComponent.onCreateItemFinal = function (ctxtdata, bindinfo, nc) {
		if (this._is_format_layout && ctxtdata) {
			var item = this.createItemCtxtControl(ctxtdata, -2, nc);

			if (item) {
				item._setEventHandler("onclick", this.on_notify_item_onclick, this);
			}

			return item;
		}
	};
	_pComplexComponent.onCreateItemNull = function (ctxtdata, nc) {
		{

			var item = this.createItemCtxtControl(ctxtdata, -4, nc);

			if (item) {
			}

			return item;
		}
	};

	_pComplexComponent.onUpdateItem = function (index, info) {
	};

	_pComplexComponent.onDestroyItems = function () {
		return;
	};


	_pComplexComponent._onSetItemIndex = function (item, index) {
		return item ? item._itemindex = index : undefined;
	};
	_pComplexComponent._onGetItemIndex = function (item) {
		return item ? item._itemindex : undefined;
	};
	_pComplexComponent._onSetItemSubIndex = function (item, subindex) {
		return item ? item._itemsubidx = subindex : undefined;
	};
	_pComplexComponent._onGetItemSubIndex = function (item) {
		return item ? item._itemsubidx : undefined;
	};
	_pComplexComponent._onSetItemId = function (item, itemid) {
		return item ? item._itemid = itemid : "";
	};
	_pComplexComponent._onGetItemId = function (item) {
		return item ? item._itemid ? item._itemid : item.id ? item.id : item.name : "";
	};
	_pComplexComponent._onSetItemValue = function (item, itemvalue) {
		return item ? item._itemvalue = itemvalue : undefined;
	};
	_pComplexComponent._onGetItemValue = function (item) {
		return item ? item._itemvalue : undefined;
	};
	_pComplexComponent._onSetItemZIndex = function (item, zindex) {
		return item && item._control_element ? item._control_element.setElementZIndex(zindex) : 0;
	};
	_pComplexComponent._onSetItemIndentSize = function (item, indentsize) {
		return item ? item._itemindentsize = indentsize : undefined;
	};

	_pComplexComponent._onGetItemIndentSize = function (item) {
		return item._itemindentsize ? item._itemindentsize : [0, 0, 0, 0, 0, 0];
	};

	_pComplexComponent._onGetIndentSize = function () {
		return this.indentsize ? this.indentsize : 0;
	};

	_pComplexComponent._onGetItemLeft = function (index, stat) {
		var pos = 0;

		var items = this._getItem(index);
		if (items) {
			if (nexacro._isArray(items)) {
				var i, n;
				var item;

				switch (stat) {
					case -9:
						{

							for (i = 0, n = items.length; i < n; i++) {
								item = items[i];
								if (item) {
									pos = item.visible ? Math.max(pos, item.getOffsetLeft()) : pos;
								}
							}
							break;
						}
					case -1:
					case 2:
						{

							for (i = 0, n = 1; i < n; i++) {
								item = items[i];
								if (item) {
									pos = Math.max(pos, item.getOffsetLeft());
								}
							}
							break;
						}
					case 1:
					default:
						{

							for (i = 0, n = items.length; i < n; i++) {
								item = items[i];
								if (item) {
									pos = Math.max(pos, item.getOffsetLeft());
								}
							}
							break;
						}
				}
			}
			else {
				pos = items.getOffsetLeft();
			}
		}

		return pos;
	};
	_pComplexComponent._onGetItemTop = function (index, stat) {
		var pos;

		var items = this._getItem(index);
		if (items) {
			if (nexacro._isArray(items)) {
				var i, n;
				var item;

				switch (stat) {
					case -9:
						{

							for (i = 0, n = items.length; i < n; i++) {
								item = items[i];
								if (item) {
									pos = pos !== undefined ? item.visible ? Math.min(pos, item.getOffsetTop()) : pos : item.getOffsetTop();
								}
							}
							break;
						}
					case -1:
					case 2:
						{

							for (i = 0, n = 1; i < n; i++) {
								item = items[i];
								if (item) {
									pos = pos !== undefined ? Math.min(pos, item.getOffsetTop()) : item.getOffsetTop();
								}
							}
							break;
						}
					case 1:
					default:
						{

							for (i = 0, n = items.length; i < n; i++) {
								item = items[i];
								if (item) {
									pos = pos !== undefined ? Math.min(pos, item.getOffsetTop()) : item.getOffsetTop();
								}
							}
							break;
						}
				}
			}
			else {
				pos = items.getOffsetTop();
			}
		}

		return pos;
	};

	_pComplexComponent._onGetItemWidth = function (index, stat) {
		var panel = this._getPanel();
		if (panel) {
			if (stat == -9) {
				stat = panel._getPanelSlotStatusBand(index);
			}

			switch (panel._panel_layout) {
				case 0:
					{

						switch (stat) {
							case -1:
							case 2:
								{

									return this._panel._getPanelColSize(index, 1);
								}
							case 1:
							default:
								{

									return this._panel._getPanelColSize(index, -1);
								}
						}
					}
				case 1:
					{

						var slot = this._panel._getPanelSlot(index, true);

						switch (stat) {
							case -1:
							case 2:
								{

									return slot._getSlotMinWidth();
								}
							case 1:
							default:
								{

									return slot._getSlotMaxWidth();
								}
						}
					}
			}
		}

		var size = 0;

		var item = this._getItem(index);
		if (item) {
			var i, n;
			if (nexacro._isArray(item)) {
				switch (stat) {
					case -9:
						{

							for (i = 0, n = item.length; i < n; i++) {
								size = item[i].visible ? Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft()) : size;
							}

							break;
						}
					case -1:
					case 2:
						{

							for (i = 0, n = 1; i < n; i++) {
								size = Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft());
							}

							break;
						}
					case 1:
					default:
						{

							for (i = 0, n = item.length; i < n; i++) {
								size = Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft());
							}

							break;
						}
				}
			}
			else {
				size = item.getOffsetRight() - item.getOffsetLeft();
			}
		}

		return size;
	};
	_pComplexComponent._onGetItemHeight = function (index, stat) {
		var panel = this._getPanel();
		if (panel) {
			if (stat == -9) {
				stat = panel._getPanelSlotStatusBand(index);
			}

			switch (panel._panel_layout) {
				case 0:
					{

						switch (stat) {
							case -1:
							case 2:
								{

									return this._panel._getPanelRowSize(index, 1);
								}
							case 1:
							default:
								{

									return this._panel._getPanelRowSize(index, -1);
								}
						}
					}
				case 1:
					{

						var slot = this._panel._getPanelSlot(index, true);

						switch (stat) {
							case -1:
							case 2:
								{

									return slot._getSlotMinHeight();
								}
							case 1:
							default:
								{

									return slot._getSlotMaxHeight();
								}
						}
					}
			}
		}

		var size = 0;

		var item = this._getItem(index);
		if (item) {
			var i, n;
			if (nexacro._isArray(item)) {
				var base = item[0].getOffsetTop();

				switch (stat) {
					case -9:
						{

							for (i = 0, n = item.length; i < n; i++) {
								size = item[i].visible ? Math.max(size, size + item[i].getOffsetBottom() - base) : size;
							}

							break;
						}
					case -1:
					case 2:
						{

							for (i = 0, n = 1; i < n; i++) {
								size = Math.max(size, item[i].getOffsetBottom() - base);
							}

							break;
						}
					case 1:
					default:
						{

							for (i = 0, n = item.length; i < n; i++) {
								size = Math.max(size, size + item[i].getOffsetBottom() - base);
							}

							break;
						}
				}
			}
			else {
				size = item.getOffsetBottom() - item.getOffsetTop();
			}
		}

		return size;
	};
	_pComplexComponent._onGetItemArrWidth = function (index, stat, width) {
		var panel = this._getPanel();
		if (panel) {
			if (stat == -9) {
				stat = panel._getPanelSlotStatusBand(index);
			}

			switch (panel._panel_layout) {
				case 0:
					{

						switch (stat) {
							case -1:
							case 2:
								{

									return this._panel._getPanelColSize(index, 1);
								}
							case 1:
							default:
								{

									return this._panel._getPanelColSize(index, -1);
								}
						}
					}
				case 1:
					{

						var slot = this._panel._getPanelSlot(index);

						if (!slot || !slot._isSetSlotCalcSize()) {
							this._resetPanelSlot(this._getItems(), index, 1, 0, 0, 0);
							slot._calcSlotPosition(0, 0, 0, 0, width, 0);
						}

						switch (stat) {
							case -1:
							case 2:
								{

									return slot._getSlotMinWidth();
								}
							case 1:
							default:
								{

									return slot._getSlotMaxWidth();
								}
						}
					}
			}
		}

		return this._onGetItemWidth(index, stat);
	};
	_pComplexComponent._onGetItemArrHeight = function (index, stat, height) {
		var panel = this._getPanel();
		if (panel) {
			if (stat == -9) {
				stat = panel._getPanelSlotStatusBand(index);
			}

			switch (panel._panel_layout) {
				case 0:
					{

						switch (stat) {
							case -1:
							case 2:
								{

									return this._panel._getPanelRowSize(index, 1);
								}
							case 1:
							default:
								{

									return this._panel._getPanelRowSize(index, -1);
								}
						}
					}
				case 1:
					{

						var slot = panel._getPanelSlot(index, true);

						if (!slot || !slot._isSetSlotCalcSize()) {
							this._resetPanelSlot(this._getItems(), index, 1, 0, 0, 0);
							slot._calcSlotPosition(0, 0, 0, 0, 0, height);
						}

						switch (stat) {
							case -1:
							case 2:
								{

									return slot._getSlotMinHeight();
								}
							case 1:
							default:
								{

									return slot._getSlotMaxHeight();
								}
						}
					}
			}
		}

		return this._onGetItemHeight(index, stat);
	};

	_pComplexComponent._onGetItemRect = function (index, bandseq, stat) {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};

		var items = this._getItem(index);
		if (items) {
			var i, n;
			var item;

			if (nexacro._isArray(items)) {
				var sole = (bandseq != undefined) ? true : false;

				switch (stat) {
					case -9:
						{

							rect.left = Infinity;
							rect.top = Infinity;

							for (i = bandseq ? bandseq : 0, n = sole ? i + 1 : items.length; i < n; i++) {
								item = items[i];
								if (item && item.visible) {
									rect.left = Math.min(rect.left, item.getOffsetLeft());
									rect.top = Math.min(rect.top, item.getOffsetTop());
									rect.right = Math.max(rect.right, item.getOffsetRight());
									rect.bottom = Math.max(rect.bottom, rect.bottom + item.getOffsetBottom());
								}
							}
							break;
						}
					case -1:
					case 2:
						{

							sole = true;
						}
					case 1:
					default:
						{

							rect.left = Infinity;
							rect.top = Infinity;

							for (i = bandseq ? bandseq : 0, n = sole ? i + 1 : items.length; i < n; i++) {
								item = items[i];
								if (item) {
									rect.left = Math.min(rect.left, item.getOffsetLeft());
									rect.top = Math.min(rect.top, item.getOffsetTop());
									rect.right = Math.max(rect.right, item.getOffsetRight());
									rect.bottom = Math.max(rect.bottom, rect.bottom + item.getOffsetBottom());
								}
							}
							break;
						}
				}

				if (rect.left == Infinity) {
					rect.left = 0;
				}

				if (rect.top == Infinity) {
					rect.top = 0;
				}
			}
			else {
				rect.left = items.getOffsetLeft();
				rect.top = items.getOffsetTop();
				rect.right = items.getOffsetRight();
				rect.bottom = items.getOffsetBottom();
			}

			rect.width = rect.right - rect.left;
			rect.height = rect.bottom - rect.top;
		}

		return rect;
	};

	_pComplexComponent._onGetItemChildRect = function (rowindex, bandseq, cellindex) {
		var base = this._onGetItemRect(rowindex, bandseq);
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};

		var child = this._getItemChildByIndex(rowindex, bandseq, cellindex);
		if (child) {
			rect.left = child.getOffsetLeft() + base.left;
			rect.top = child.getOffsetTop() + base.top;
			rect.right = child.getOffsetRight() + base.left;
			rect.bottom = child.getOffsetBottom() + base.top;
			rect.width = rect.right - rect.left;
			rect.height = rect.bottom - rect.top;
		}

		return rect;
	};


	_pComplexComponent.on_notify_item_onclick = function (obj, e) {
		this._on_basic_onitemclick(obj, e);
		this._on_fire_onitemclick(obj, e);
		this._on_default_onitemclick(obj, e);
	};

	_pComplexComponent._on_basic_onitemclick = function (obj, e) {
	};
	_pComplexComponent._on_default_onitemclick = function (obj, e) {
	};
	_pComplexComponent._on_fire_onitemclick = function (obj, e) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var itemindex = this._getItemIndex(e.fromobject);
			var itemtext = this._getItemId(e.fromobject);
			var itemvalue = this._getItemValue(e.fromobject);

			return this.onitemclick._fireEvent(this, new nexacro.ItemClickEventInfo(this, "onitemclick", itemindex, itemtext, itemvalue, e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.from_refer_comp, e.meta_key));
		}
		return true;
	};



	_pComplexComponent._initFormatsLayout = function () {
		{

			this._onInitFormatsLayout();
		}
	};
	_pComplexComponent._initSubFormatsLayout = function () {
		{

			if (this._is_child) {
				this._initSubFormatChildLayout();
			}
			if (this._is_items) {
				this._initSubFormatItemsLayout();
			}
		}
	};

	_pComplexComponent._onInitFormatsLayout = function () {
		var formats = this._formats;

		if (formats) {
			formats._initFormats(nexacro._FormatsConst.FORMATMODE_XML, nexacro._FormatsConst.FORMATTYPE_ROWCOL, nexacro._FormatsConst.FORMATBIND_BIND | nexacro._FormatsConst.FORMATBIND_EXPR, ["head"], ["body"], ["tail"], ["mark"], ["null"], ["mark", "null"], {
				"Band" : "nexacro.ComplexComponent"
			}
			);
		}
	};

	_pComplexComponent._initSubFormatChildLayout = function () {
		var child = this._getChildren();
		var count = child ? child.length : 0;

		for (var i = 0; i < count; i++) {
			var item = child[i];
			if (item && item._is_format_layout) {
				this._onInitSubFormatChildLayout(item, this.panel);
			}
		}
	};
	_pComplexComponent._initSubFormatItemsLayout = function () {
		var items = this._getItems();
		var count = items ? items.length : 0;

		for (var i = 0; i < count; i++) {
			var item = items[i];
			if (item && item._is_format_layout) {
				this._onInitSubFormatItemsLayout(item, this.panel);
			}
		}
	};

	_pComplexComponent._onInitSubFormatChildLayout = function (child, panel) {
	};
	_pComplexComponent._onInitSubFormatItemsLayout = function (item, panel) {
	};


	_pComplexComponent._setFormats = function (formats) {
		if (this._is_format_layout && this._formats) {
			if (formats) {
				this._parseFormats(formats);
			}
			else {
				this._clearFormats();
			}
		}
	};

	_pComplexComponent._createFormats = function () {
		if (this._is_format_layout && this.formats) {
			this._onCreateFormats();
			this._onChangeFormat(this.formatid);
		}
		else {
			this._onCreateCtxtInfo();
		}
	};
	_pComplexComponent._createdFormats = function () {
		return this._createFormats();
	};
	_pComplexComponent._clearFormats = function () {
		if (this._is_format_layout && this.formats) {
			this._onClearFormats();
			this._onChangeFormat(this.formatid);
		}
		else {
			this._onClearFormats();
			this._clearCtxtBaseInfo();
		}
	};
	_pComplexComponent._updateFormats = function () {
		this._clearFormats();
		this._createFormats();
	};
	_pComplexComponent._parseFormats = function (formats) {
		this._onClearFormats();

		this._onParseFormats(formats);
	};
	_pComplexComponent._changeFormatId = function (id) {
		if (this._is_format_layout && this.formats) {
			this._onChangeFormat(id);
		}
	};
	_pComplexComponent._clearFormatId = function (id) {
	};

	_pComplexComponent._onGetStrFormats = function () {
		return this.formats;
	};
	_pComplexComponent._onCreateFormats = function () {
		if (this._formats && !this._formats._format_parsed) {
			this._parseFormats(this._onGetStrFormats());
		}
	};
	_pComplexComponent._onParseFormats = function (formats) {
		if (this._formats) {
			this._formats._parseFormats(formats, this._databind);
		}
	};
	_pComplexComponent._onChangeFormat = function (id) {
		var formats = this._formats;

		if (formats && formats._format_parsed) {
			var applyid = nexacro._nvl(id, this._formats._default_id);

			if (formats._getCurrentID() == applyid) {
				return;
			}

			this._clearCtxtBaseInfo();

			formats._setCurrentID(applyid);

			var formatctxt = formats._getCurrentItem();
			var formattype = formats._format_type;

			if (formatctxt) {
				this._setCtxtBaseInfo(formatctxt, formattype);
			}

			var panel = this._getPanel();

			if (panel) {
				this._setPanelCtxtInfo(formatctxt, formattype);
			}

			this._applyBindInfos();

			this._applyValue();
		}
	};
	_pComplexComponent._onCreateCtxtInfo = function () {
		if (this._is_panel_layout && this._panel) {
			var panel = this._panel;

			this._null_ctxts = this._use_nullitem ? this._onGetContextDataNull() : null;

			this._head_count = panel._getSlotTargetCount(-1);
			this._body_count = panel._getSlotTargetCount(0);
			this._tail_count = panel._getSlotTargetCount(-2);

			if (!this._head_count || this._head_count < 0) {
				this._head_count = 0;
			}
			if (!this._body_count || this._body_count < 0) {
				this._body_count = 0;
			}
			if (!this._tail_count || this._tail_count < 0) {
				this._tail_count = 0;
			}

			this._null_count = this._use_nullitem && nexacro._isArray(this._null_ctxts) ? this._null_ctxts.length : (this._null_ctxts ? 1 : undefined);
		}
		else {
			this._onClearCtxtInfo();
		}
	};

	_pComplexComponent._onClearFormats = function (id) {
		if (this._ctxtdata) {
			this._clearCtxtBaseInfo();
		}

		if (this._formats) {
			this._formats._clear();
		}
	};
	_pComplexComponent._onClearCtxtInfo = function () {
		this._head_count = 0;
		this._body_count = 0;
		this._tail_count = 0;
	};

	_pComplexComponent._fetchFormatsRowCols = function (index) {
		var arrd = [-1, -1, 1, 1];
		var base = this._getCtxtBaseInfo();
		if (!base) {
			return [arrd];
		}
		var ctxt = this._getCtxtData(index);
		if (!ctxt) {
			return [arrd];
		}

		if (nexacro._isArray(ctxt)) {
			var arrs = Array(ctxt.length);

			for (var i = 0, l = ctxt.length; i < l; i++) {
				arrs[i] = ctxt[i] ? base._getArrPos(ctxt[i]) : arrd;
			}

			return arrs;
		}
		else {
			return [ctxt ? base._getArrPos(ctxt) : arrd];
		}
	};
	_pComplexComponent._fetchFormatsPosition = function (index) {
		var arrd = [0, 0, 0, 0, 0, 0];
		var base = this._getCtxtBaseInfo();
		if (!base) {
			return [arrd];
		}
		var ctxt = this._getCtxtData(index);
		if (!ctxt) {
			return [arrd];
		}

		if (nexacro._isArray(ctxt)) {
			var arrs = Array(ctxt.length);

			for (var i = 0, l = ctxt.length; i < l; i++) {
				arrs[i] = ctxt[i] ? base._getArrPos(ctxt[i]) : arrd;
			}

			return arrs;
		}
		else {
			return [ctxt ? base._getArrPos(ctxt) : arrd];
		}
	};

	_pComplexComponent._setCtxtBaseInfo = function (ctxtinfo, formattype) {
		if (!this._is_format_layout) {
			this._is_format_layout = true;
		}

		this._clearCtxtBaseInfo();

		if (ctxtinfo) {
			this._ctxtdata = ctxtinfo;

			this._body_cache = [];
			this._body_ctxts = this._onGetContextDataBody();
			this._head_ctxts = this._use_headitem ? this._onGetContextDataHead() : null;
			this._tail_ctxts = this._use_tailitem ? this._onGetContextDataTail() : null;
			this._mark_ctxts = this._use_markitem ? this._onGetContextDataMark() : null;
			this._null_ctxts = this._use_nullitem ? this._onGetContextDataNull() : null;

			this._body_count = !this._is_levelbind && nexacro._isArray(this._body_ctxts) ? this._body_ctxts.length : (this._body_ctxts ? 1 : undefined);
			this._head_count = this._use_headitem && nexacro._isArray(this._head_ctxts) ? this._head_ctxts.length : (this._head_ctxts ? 1 : undefined);
			this._tail_count = this._use_tailitem && nexacro._isArray(this._tail_ctxts) ? this._tail_ctxts.length : (this._tail_ctxts ? 1 : undefined);
			this._mark_count = this._use_markitem && nexacro._isArray(this._mark_ctxts) ? this._mark_ctxts.length : (this._mark_ctxts ? 1 : undefined);
			this._null_count = this._use_nullitem && nexacro._isArray(this._null_ctxts) ? this._null_ctxts.length : (this._null_ctxts ? 1 : undefined);
		}

		this._onSetCtxtBaseInfo();
	};
	_pComplexComponent._clearCtxtBaseInfo = function () {
		this._onClearCtxtBaseInfo();

		if (this._body_cache) {
			this._body_cache = null;
		}
		if (this._body_ctxts) {
			this._body_ctxts = null;
		}
		if (this._head_ctxts) {
			this._head_ctxts = null;
		}
		if (this._tail_ctxts) {
			this._tail_ctxts = null;
		}
		if (this._mark_ctxts) {
			this._mark_ctxts = null;
		}
		if (this._null_ctxts) {
			this._null_ctxts = null;
		}

		if (this._body_count) {
			this._body_count = 0;
		}
		if (this._head_count) {
			this._head_count = 0;
		}
		if (this._tail_count) {
			this._tail_count = 0;
		}
		if (this._mark_count) {
			this._mark_count = 0;
		}
		if (this._null_count) {
			this._null_count = 0;
		}

		if (this._ctxtdata) {
			this._ctxtdata = null;
		}
	};
	_pComplexComponent._getCtxtBaseInfo = function () {
		if (this._ctxtdata) {
			return this._ctxtdata;
		}
		else {
			return null;
		}
	};


	_pComplexComponent._getCtxtData = function (index) {
		if (index == undefined) {
			return this._onGetContextData();
		}
		if (index >= 0) {
			return this._body_ctxts ? this._is_levelbind ? this._onGetContextDataLevel(index) : this._body_ctxts : this._onGetContextDataBody(index);
		}
		if (index == -1) {
			return this._head_ctxts ? this._head_ctxts : this._onGetContextDataHead();
		}
		if (index == -2) {
			return this._tail_ctxts ? this._tail_ctxts : this._onGetContextDataTail();
		}
		if (index == -3) {
			return this._mark_ctxts ? this._mark_ctxts : this._onGetContextDataMark();
		}
		if (index == -4) {
			return this._null_ctxts ? this._null_ctxts : this._onGetContextDataNull();
		}
	};

	_pComplexComponent._setCtxtItemInfo = function (item, ctxtdata, index, subindex) {
		if (item && ctxtdata) {
			var i, n, m;

			if (nexacro._isArray(item)) {
				if (nexacro._isArray(ctxtdata)) {
					for (i = 0, n = item.length, m = ctxtdata.length; i < n; i++) {
						this._setCtxtItemInfo(item[i], ctxtdata[i % m], index, i);
					}
				}
				else {
					for (i = 0, n = item.length; i < n; i++) {
						this._setCtxtItemInfo(item[i], ctxtdata, index, i);
					}
				}
			}
			else {
				var ctxt = nexacro._isArray(ctxtdata) ? ctxtdata[0] : ctxtdata;
				var cset = ctxt._setts;
				var csub = ctxt._items;
				var isub = item._children;

				if (item._setItemId) {
					item._setItemId(item, ctxt._id);
				}
				if (item._setItemSubIndex) {
					item._setItemSubIndex(item, subindex);
				}

				if (cset) {
					for (var prop in cset) {
						var func = cset[prop];
						var data = ctxt[prop];

						if (!func) {
							continue;
						}

						if (Array.isArray(data)) {
							func.apply(item, data);
						}
						else {
							func.call(item, data);
						}
					}
				}

				if (csub && isub) {
					for (i = 0, n = isub.length, m = csub.length; i < n; i++) {
						this._setCtxtItemInfo(isub[i], csub[i % m], index, i);
					}
				}
			}
		}
	};

	_pComplexComponent.createCtxtControl = function (ctxt, seq, is_child) {
		if (ctxt) {
			var _name;
			if (is_child) {
				_name = ctxt._id;
			}
			else {
				_name = seq != undefined ? ctxt._id + seq : ctxt._id;
			}

			var _posa = ctxt._pos ? ctxt._pos : null;
			var _item = null;

			var _construc = ctxt._construc;

			if (!_construc) {
				_construc = ctxt._construc = nexacro._getTypeConstructor(ctxt._typename, "nexacro.ComplexComponent");
			}

			if (_construc) {
				if (_posa) {
					_item = new _construc(_name, _posa[0], _posa[1], _posa[2], _posa[3], _posa[4], _posa[5], null, null, null, null, this);
				}
				else {
					_item = new _construc(_name, 0, 0, 0, 0, null, null, null, null, null, null, this);
				}
			}

			if (_item) {
				if (is_child) {
					this._addChildCollection(_name, _item);
				}

				if (_item._setCtxtBaseInfo) {
					_item._setCtxtBaseInfo(ctxt);
				}

				this.onCreateCtxtControl(_item, ctxt, seq);
			}

			return _item;
		}
	};



	_pComplexComponent._onSetCtxtBaseInfo = function () {
	};
	_pComplexComponent._onClearCtxtBaseInfo = function () {
		this._ctxtdata = null;
	};

	_pComplexComponent.onCreateCtxtControl = function (item, ctxt, seq) {
		if (item && ctxt) {
			if (item._setAddedCreateInfo) {
				item._setAddedCreateInfo(this, ctxt, seq);
			}

			if (item._setEventHandler) {
				item._setEventHandler("onclick", this.on_notify_item_onclick, this);
			}
		}

		return item;
	};

	_pComplexComponent._onGetContextData = function () {
		return this._ctxtdata;
	};
	_pComplexComponent._onGetBandIndexByLevel = function (index) {
		return this._fetchLevelBindValue(index);
	};
	_pComplexComponent._onGetContextDataBand = function (bands, index) {
		if (this._ctxtdata) {
			if (!this._ctxtdata._getBand || !bands || bands.length <= 0) {
				return null;
			}

			var data = [];

			for (var i = 0, l = bands.length; i < l; i++) {
				var band = this._ctxtdata._getBand(bands[i], false);
				if (band) {
					data.push(band);
				}
			}

			if (!data.length) {
				bands = this._ctxtdata._getBands();
				if (bands && bands.length) {
					data.push(bands[0]);
				}
			}

			return data;
		}
		return null;
	};

	_pComplexComponent._onGetContextDataHead = function (index) {
		return this._formats ? this._onGetContextDataBand(this._formats._head_bands, index) : null;
	};
	_pComplexComponent._onGetContextDataTail = function (index) {
		return this._formats ? this._onGetContextDataBand(this._formats._tail_bands, index) : null;
	};
	_pComplexComponent._onGetContextDataBody = function (index) {
		return this._formats ? this._onGetContextDataBand(this._formats._body_bands, index) : null;
	};
	_pComplexComponent._onGetContextDataMark = function (index) {
		return this._formats ? this._onGetContextDataBand(this._formats._mark_bands, index) : null;
	};
	_pComplexComponent._onGetContextDataNull = function (index) {
		return this._formats ? this._onGetContextDataBand(this._formats._null_bands, index) : null;
	};
	_pComplexComponent._onGetContextDataLevel = function (index) {
		var level = this._onGetBandIndexByLevel(index) % this._body_ctxts.length;

		return this._body_ctxts[level];
	};

	_pComplexComponent._getContextSize = function (parentwidth, parentheight) {
		return this._ctxtdata ? [this._getContextWidth(parentwidth), this._getContextHeight(parentheight)] : [0, 0];
	};
	_pComplexComponent._getContextWidth = function (parentwidth) {
		if (this._ctxtdata && this._ctxtdata.__ap) {
			var a = this._ctxtdata.__ap;
			var c = parentwidth !== undefined ? parentwidth : this.parent ? this.parent._getClientWidth() : this._getClientWidth();

			var l = a[0];
			if (l != 0 && -1 < l && l < 1) {
				l = Math.floor(l *  100 *  c);
			}
			var w = a[2];
			if (w != 0 && -1 < w && w < 1) {
				w = Math.floor(w *  100 *  c);
			}
			var r = a[4];
			if (r != 0 && -1 < r && r < 1) {
				r = Math.floor(r *  100 *  c);
			}

			if (w === undefined) {
				if (l !== undefined && r != undefined) {
					w = c - r - l;
				}
			}

			return w;
		}

		return 10;
	};
	_pComplexComponent._getContextHeight = function (parentheight) {
		if (this._ctxtdata && this._ctxtdata.__ap) {
			var a = this._ctxtdata.__ap;
			var c = parentheight !== undefined ? parentheight : this.parent ? this.parent._getClientHeight() : this._getClientHeight();

			var t = a[1];
			if (t != 0 && -1 < t && t < 1) {
				t = Math.floor(t *  100 *  c);
			}
			var h = a[3];
			if (h != 0 && -1 < h && h < 1) {
				h = Math.floor(h *  100 *  c);
			}
			var b = a[5];
			if (b != 0 && -1 < b && b < 1) {
				b = Math.floor(b *  100 *  c);
			}

			if (h === undefined) {
				if (t !== undefined && b != undefined) {
					h = c - b - t;
				}
			}

			return h;
		}

		return 5;
	};


	_pComplexComponent.formats = "";
	_pComplexComponent.formatid = "";






	_pComplexComponent._initBind = function () {
		if (this._is_databind) {
			this._databind = new nexacro._BindData(this._is_valuebind, this._is_databind, this._is_xmlbind, this._is_jsonbind, this._is_fullbind, this._is_levelbind, this._is_dataexpr, this._is_fullexpr);

			this._databind._initExprTarget(this);
		}
	};

	_pComplexComponent._initBindInfo = function (reset) {
		if (this._is_databind && this._databind) {
			this._setBindDataSource();

			if (!this._is_format_layout || reset) {
				this._applyBindInfos();

				this._applyValue();
			}
		}
	};
	_pComplexComponent._applyBindInfos = function () {
		this._setBindInfos(this._onGetCodeBindInfo(), this._onGetLevelBindInfo(), this._onGetGroupBindInfo(), this._onGetDataBindInfos()
		);
	};
	_pComplexComponent._clearBindInfo = function () {
		if (this._is_databind && this._databind) {
			this._clearBindInfos(true);

			this._clearBindDataSource();
		}
	};

	_pComplexComponent._resetBindInfo = function () {
		this._clearBindInfo();
		this._initBindInfo(true);
	};

	_pComplexComponent._clearBind = function () {
		if (this._databind) {
			this._databind._clear();

			delete this._databind;
			this._databind = null;
		}
	};

	_pComplexComponent._getBindDataSet = function () {
		if (this._databind) {
			return this._databind._getBindDataSetObj();
		}
	};
	_pComplexComponent._getBindDataCtx = function (convert) {
		if (this._databind) {
			return this._databind._getBindDataCtxObj(convert);
		}
	};

	_pComplexComponent._setBindDataSource = function () {
		this._clearBindDataSource();

		if (this._databind) {
			if (this._is_xmlbind || this._is_jsonbind) {
				return this._databind._setBindDataCtx(this._onGetBindDataSource(), this._onGetBindDataKey(), this);
			}
			else {
				return this._databind._setBindDataSet(this._onGetBindDataSource(), this);
			}
		}
	};
	_pComplexComponent._clearBindDataSource = function () {
		if (this._databind) {
			if (this._is_xmlbind || this._is_jsonbind) {
				return this._databind._clearBindDataCtx(this);
			}
			else {
				return this._databind._clearBindDataSet(this);
			}
		}
	};

	_pComplexComponent._setCodeColumn = function () {
		if (this._databind) {
			return this._databind._setCodeColumn(this._onGetCodeColumn(), this._onGetCodeProp());
		}
	};
	_pComplexComponent._clearCodeColumn = function () {
		if (this._databind) {
			return this._databind._clearCodeColumn();
		}
	};

	_pComplexComponent._setLevelColumn = function () {
		if (this._databind) {
			return this._databind._setLevelColumn(this._onGetLevelColumn(), this._onGetLevelProp());
		}
	};
	_pComplexComponent._clearLevelColumn = function () {
		if (this._databind) {
			return this._databind._clearLevelColumn();
		}
	};

	_pComplexComponent._setGroupColumn = function () {
		if (this._databind) {
			return this._databind._setGroupColumn(this._onGetGroupColumn(), this._onGetGroupProp());
		}
	};
	_pComplexComponent._clearGroupColumn = function () {
		if (this._databind) {
			return this._databind._clearGroupColumn();
		}
	};

	_pComplexComponent._setDataColumn = function () {
		if (this._databind) {
			return this._databind._setDataColumn(this._onGetDataColumns(), this._onGetDataProps());
		}
	};
	_pComplexComponent._clearDataColumn = function () {
		if (this._databind) {
			return this._databind._clearDataColumn();
		}
	};

	_pComplexComponent._getBindCount = function () {
		if (this._databind) {
			return this._databind._getBindRowCount();
		}
		else {
			return 0;
		}
	};
	_pComplexComponent._getBindCurrentPos = function () {
		if (this._databind) {
			return this._databind._getBindRowCurrent();
		}
		else {
			return -1;
		}
	};

	_pComplexComponent._getBindItem = function (index) {
		return this._getItem(index);
	};

	_pComplexComponent.createCodeBindInfo = function (targetid, targetprop, bindprop) {
		var bindinfo = new nexacro._BindInfo();

		bindinfo.baseid = "";
		bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_" + this._onGetBindableProperties();
		bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetCodeProp();

		return bindinfo;
	};
	_pComplexComponent.createLevelBindInfo = function (targetid, targetprop, bindprop) {
		var bindinfo = new nexacro._BindInfo();

		bindinfo.baseid = "";
		bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "";
		bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetLevelProp();

		return bindinfo;
	};
	_pComplexComponent.createGroupBindInfo = function (targetid, targetprop, bindprop) {
		var bindinfo = new nexacro._BindInfo();

		bindinfo.baseid = "";
		bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "";
		bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetGroupProp();

		return bindinfo;
	};
	_pComplexComponent.createDataBindInfo = function (baseid, targetid, targetprop, bindprop) {
		var bindinfo = new nexacro._BindInfo();

		bindinfo.baseid = baseid;
		bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
		bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetDataProps()[0];

		return bindinfo;
	};
	_pComplexComponent.createDataExprInfo = function (baseid, targetid, targetprop, exprprop) {
		var exprinfo = new nexacro._BindInfo();

		exprinfo.baseid = baseid;
		exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
		exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
		exprinfo.exprid = nexacro._nvl(exprprop, false) ? exprprop : this._onGetExprProp();

		return exprinfo;
	};

	_pComplexComponent.createItemBindInfo = function (targetprop, bindprop) {
		return this.createDataBindInfo(null, null, targetprop, bindprop);
	};
	_pComplexComponent.createItemSubControlBindInfo = function (targetid, targetprop, bindprop) {
		return this.createDataBindInfo(null, targetid, targetprop, bindprop);
	};
	_pComplexComponent.createItemExprInfo = function (targetprop, exprprop) {
		return this.createDataExprInfo(null, null, targetprop, exprprop);
	};
	_pComplexComponent.createItemSubControlExprInfo = function (targetid, targetprop, exprprop) {
		return this.createDataExprInfo(null, targetid, targetprop, exprprop);
	};

	_pComplexComponent._setBindInfos = function (codebindinfo, levelbindinfo, groupbindinfo, databindinfos) {
		if (this._databind) {
			return this._databind._setBindInfos(codebindinfo, levelbindinfo, groupbindinfo, databindinfos);
		}
	};
	_pComplexComponent._clearBindInfos = function (reset) {
		if (this._databind) {
			return this._databind._clearBindInfos(reset);
		}
	};

	_pComplexComponent._getBindInfo = function (rowindex, bindindex) {
		if (this._databind) {
			return this._databind._getBindInfo(rowindex, bindindex);
		}
	};
	_pComplexComponent._getCodeBindInfo = function () {
		if (this._databind) {
			return this._databind._getBindInfo(0);
		}
	};
	_pComplexComponent._getLevelBindInfo = function () {
		if (this._databind) {
			return this._databind._getBindInfo(1);
		}
	};
	_pComplexComponent._getGroupBindInfo = function () {
		if (this._databind) {
			return this._databind._getBindInfo(2);
		}
	};
	_pComplexComponent._getDataBindInfo = function (bindindex) {
		if (this._databind) {
			return this._databind._getBindInfo(bindindex + 2);
		}
	};

	_pComplexComponent._fetchCodeBindValue = function (rowindex) {
		return this._databind._fetchCodeBindValue(rowindex);
	};
	_pComplexComponent._fetchLevelBindValue = function (rowindex) {
		return this._databind._fetchLevelBindValue(rowindex);
	};
	_pComplexComponent._fetchGroupBindValue = function (rowindex) {
		return this._databind._fetchGroupBindValue(rowindex);
	};
	_pComplexComponent._fetchDataBindValue = function (rowindex, bindindex) {
		return this._databind._fetchDataBindValue(rowindex, bindindex);
	};
	_pComplexComponent._fetchBindDataCtxObj = function () {
		return this._databind._fetchBindDataCtxObj();
	};
	_pComplexComponent._fetchBindDataCtxStr = function () {
		return this._databind._fetchBindDataCtxStr();
	};
	_pComplexComponent._fetchBindDataCtxRow = function (index) {
		return this._databind._getBindRow(index);
	};
	_pComplexComponent._fetchBindDataCtx = function (index, attr) {
		return this._databind._fetchBindValue(index, attr);
	};

	_pComplexComponent._getBindData = function (rowindex) {
		if (this._databind) {
			return this._databind._getBindData(rowindex);
		}
	};
	_pComplexComponent._getBindColumn = function (row, col) {
		return this._databind._getBindColumn(row, col);
	};
	_pComplexComponent._getBindRow = function (rowindex) {
		return this._databind._getBindRow(rowindex);
	};

	_pComplexComponent._setBindData = function (rowindex, bindinfo, data) {
		if (this._databind) {
			return this._databind._setBindData(rowindex, bindinfo, data);
		}
	};
	_pComplexComponent._setBindColumn = function (rowindex, colindex, data) {
		if (this._databind) {
			return this._databind._setBindColumn(rowindex, colindex, data);
		}
	};
	_pComplexComponent._setBindColumnByID = function (rowindex, colid, data) {
		if (this._databind) {
			return this._databind._setBindColumn(rowindex, colid, data);
		}
	};

	_pComplexComponent._appendBindRow = function (rowindex, rowitem) {
		if (this._databind) {
			return this._databind._appendBindRow(rowindex, rowitem);
		}
	};
	_pComplexComponent._insertBindRow = function (rowindex, rowitem) {
		if (this._databind) {
			return this._databind._insertBindRow(rowindex, rowitem);
		}
	};
	_pComplexComponent._subsetBindRow = function (rowindex, rowitem, addlast) {
		if (this._databind) {
			return addlast ? 
				this._databind._subaddBindRow(rowindex, rowitem) : 
				this._databind._subinsBindRow(rowindex, rowitem);
		}
	};
	_pComplexComponent._deleteBindRow = function (rowindex) {
		if (this._databind) {
			return this._databind._deleteBindRow(rowindex);
		}
	};
	_pComplexComponent._moveBindRow = function (rowindex, tarindex) {
		if (this._databind) {
			return this._databind._moveBindRow(rowindex, tarindex);
		}
	};
	_pComplexComponent._exchangeBindRow = function (rowindex, tarindex) {
		if (this._databind) {
			return this._databind._exchangeBindRow(rowindex, tarindex);
		}
	};
	_pComplexComponent._searchBindRow = function (colid, val) {
		if (this._databind) {
			return this._databind._searchBindRow(this._databind._getBindColIndex(colid), val);
		}
	};

	_pComplexComponent._getBindBase = function (item, basesq) {
		return basesq >= 0 ? item[basesq] : null;
	};
	_pComplexComponent._getBindFunc = function (comp, setter) {
		return comp[setter];
	};
	_pComplexComponent._getBindComp = function (base, target) {
		if (nexacro._isArray(target)) {
			var basis = base;

			for (var i = 0, l = target.length; i < l && basis; i++) {
				basis = basis._findChild ? basis._findChild(target[i]) : basis[target[i]];
			}

			return basis;
		}
		else {
			return base._findChild ? base._findChild(target) : base[target];
		}
	};

	_pComplexComponent._setBindItemInfo = function (item, binddata, index, bandseq) {
		if (item && binddata) {
			var i, n;

			var infos = binddata._getBindInfos();
			var start = binddata._chkBindInfos();

			var info, base, comp, func, data;

			if (nexacro._isArray(item)) {
				for (i = start, n = infos.length; i < n; i++) {
					info = infos[i];
					if (!info) {
						continue;
					}

					base = nexacro._nvl(info.baseid, false) ? this._getBindBase(item, info.basesq) : null;
					if (!base) {
						continue;
					}

					comp = nexacro._nvl(info.target, false) ? this._getBindComp(base, info.target) : base;
					if (!comp) {
						continue;
					}

					func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null;
					if (!func) {
						continue;
					}

					data = info.values;

					if (nexacro._isArray(data)) {
						func.apply(comp, data);
					}
					else {
						func.call(comp, data);
					}
				}
			}
			else if (bandseq) {
				for (i = start, n = infos.length; i < n; i++) {
					info = infos[i];
					if (!info || info.basesq != bandseq) {
						continue;
					}

					comp = nexacro._nvl(info.target, false) ? this._getBindComp(item, info.target) : item;
					if (!comp) {
						continue;
					}

					func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null;
					if (!func) {
						continue;
					}

					data = info.values;

					if (nexacro._isArray(data)) {
						func.apply(comp, data);
					}
					else {
						func.call(comp, data);
					}
				}
			}
			else {
				for (i = start, n = infos.length; i < n; i++) {
					info = infos[i];
					if (!info) {
						continue;
					}

					comp = nexacro._nvl(info.target, false) ? this._getBindComp(item, info.target) : item;
					if (!comp) {
						continue;
					}

					func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null;
					if (!func) {
						continue;
					}

					data = info.values;

					if (nexacro._isArray(data)) {
						func.apply(comp, data);
					}
					else {
						func.call(comp, data);
					}
				}
			}
		}
	};

	_pComplexComponent._onGetBindableProperties = function () {
		return "value";
	};

	_pComplexComponent._onGetBindDataSource = function () {
		if (this._is_fullbind) {
			return this.binddataset ? this.binddataset : this.binddatasource;
		}
		if (this._is_databind) {
			return this.innerdataset ? this.innerdataset : this.binddatasource;
		}
		return null;
	};
	_pComplexComponent._onGetBindDataKey = function () {
		return "*";
	};

	_pComplexComponent._onGetCodeColumn = function () {
		return this.codecolumn ? this.codecolumn : "#rowindex";
	};
	_pComplexComponent._onGetLevelColumn = function () {
		return this.levelcolumn ? this.levelcolumn : "#rowlevel";
	};
	_pComplexComponent._onGetGroupColumn = function () {
		return this.groupcolumn ? this.groupcolumn : "#rowgroup";
	};
	_pComplexComponent._onGetDataColumns = function () {
		return [this.datacolumn ? this.datacolumn : "#nodename"];
	};
	_pComplexComponent._onGetCodeProp = function () {
		return this._is_fullbind ? "#rowindex" : "codecolumn";
	};
	_pComplexComponent._onGetLevelProp = function () {
		return this._is_fullbind ? "#rowlevel" : "levelcolumn";
	};
	_pComplexComponent._onGetGroupProp = function () {
		return this._is_fullbind ? "#rowgroup" : "groupcolumn";
	};
	_pComplexComponent._onGetDataProps = function () {
		return ["datacolumn"];
	};
	_pComplexComponent._onGetCodeBindInfo = function () {
		return this._is_databind && !this._is_fullbind ? this.createCodeBindInfo() : null;
	};
	_pComplexComponent._onGetLevelBindInfo = function () {
		return this._is_databind && this._is_levelbind ? this.createLevelBindInfo() : null;
	};
	_pComplexComponent._onGetGroupBindInfo = function () {
		return this._is_databind && this._is_levelbind ? this.createGroupBindInfo() : null;
	};
	_pComplexComponent._onGetDataBindInfos = function () {
		if (this._is_databind) {
			if (this._is_fullbind) {
				return this._onGetFullBindInfos();
			}

			var bindinfo = this.createDataBindInfo();
			if (bindinfo) {
				return [bindinfo];
			}
		}

		return null;
	};
	_pComplexComponent._onGetFullBindInfos = function () {
		if (this._formats) {
			var bindinfos = this._formats._getBindInfos();
			if (bindinfos && bindinfos.length) {
				return nexacro._clone(bindinfos);
			}
		}

		return null;
	};

	_pComplexComponent._onInitBindSource = function (columnid, propid, ds) {
		if (this._is_created) {
			if (this._is_databind) {
				this._resetBindInfo();
			}

			this._clearItems();
		}

		nexacro.SimpleComponent.prototype._onInitBindSource.call(this);
	};

	_pComplexComponent._onChangeBindSource = function (propid, ds, row, col) {
		if (this._is_created) {
			if (this._is_databind) {
				this._resetBindInfo();
				this._recreateItems();
			}
		}

		nexacro.SimpleComponent.prototype._onChangeBindSource.call(this, propid, ds, row, col);
	};

	_pComplexComponent._callback_onload = function (obj, e) {
		if (this._is_databind && this._is_created) {
			this._resetBindInfo();
			this._recreateItems();
		}
	};
	_pComplexComponent._callback_onvaluechanged = function (obj, e) {
		if (this._is_databind && this._is_created) {
			this._updateItems(e.row, 1, e);
		}
	};
	_pComplexComponent._callback_oncolumnchanged = function (obj, e) {
	};
	_pComplexComponent._callback_onrowsetchanged = function (obj, e) {
		if (this._is_databind && this._is_created) {
			if (this._databind._isDataSetEnableEvent()) {
				this._resetBindInfo();
				this._recreateItems();
			}
		}
	};
	_pComplexComponent._callback_onrowposchanged = function (obj, e) {
	};

	_pComplexComponent.innerdataset = null;
	_pComplexComponent.codecolumn = "";
	_pComplexComponent.datacolumn = "";
	_pComplexComponent.levelcolumn = "";
	_pComplexComponent.groupcolumn = "";






	_pComplexComponent.multiselect = false;
	_pComplexComponent.rangeselect = false;
	_pComplexComponent.selectscrollmode = "default";

	_pComplexComponent._use_selector = false;
	_pComplexComponent._use_multiselector = false;
	_pComplexComponent._use_partsselector = false;

	_pComplexComponent.getSelectCount = function () {
		return this._onGetMultiSelectCount();
	};
	_pComplexComponent.getSelectList = function () {
		return this._onGetMultiSelectList();
	};
	_pComplexComponent.getSelectIndex = function () {
		return this._onGetCurrentSelect();
	};
	_pComplexComponent.setSelect = function (select, subselect) {
		var sel = this._onGetSelectArgument(select, subselect);

		if (this.multiselect) {
			this._onClearMultiSelectList();
			return this._onSetCurrentSelect(sel);
		}
		else {
			return this._onSetCurrentSelect(sel);
		}
	};
	_pComplexComponent.addSelect = function (select, subselect) {
		var sel = this._onGetSelectArgument(select, subselect);

		return this._onAddMultiSelect(sel);
	};
	_pComplexComponent.popSelect = function () {
		return this._onPopMultiSelect();
	};
	_pComplexComponent.clearSelect = function () {
		return this._onClearMultiSelectList();
	};
	_pComplexComponent.isAboveSelected = function (idx1, idx2) {
		return this._onCheckAboveMultiSelectList(idx1, idx2);
	};

	_pComplexComponent._onInitSelect = function (selecttype, positcount, rangecount, multicount, unselvalue) {
		if (this._selectinfo) {
			if (!selecttype) {
				if (this._is_items) {
					selecttype = nexacro._SelectConst.SELECTTYPE_ITEM;
				}
				else {
					selecttype = nexacro._SelectConst.SELECTTYPE_COMP;
				}
			}

			this._selectinfo._initSelect(selecttype, positcount, rangecount, multicount, unselvalue);
		}
	};

	_pComplexComponent._onGetSelectArgument = function (select, subselect) {
		if (this._use_partsselector) {
			return !nexacro._isNull(subselect) && !nexacro._isArray(select) ? [select, subselect] : select;
		}
		else {
			return select;
		}
	};
	_pComplexComponent._onGetMultiSelectCount = function () {
		if (this._selectinfo) {
			return this._selectinfo._getMultiSelectCount();
		}
	};
	_pComplexComponent._onGetMultiSelectList = function () {
		if (this._selectinfo) {
			return this._selectinfo._getMultiSelectList();
		}
	};
	_pComplexComponent._onAddMultiSelect = function (select) {
		if (this._selectinfo) {
			return this._selectinfo._addMultiSelect(select);
		}
	};
	_pComplexComponent._onPopMultiSelect = function () {
		if (this._selectinfo) {
			return this._selectinfo._popMultiSelect();
		}
	};
	_pComplexComponent._onClearMultiSelectList = function () {
		if (this._selectinfo) {
			return this._selectinfo._clearMultiSelectList();
		}
	};
	_pComplexComponent._onCheckAboveMultiSelectList = function (idx1, idx2) {
		if (this._selectinfo) {
			return this._selectinfo._checkAboveMultiSelectList(idx1, idx2);
		}
	};

	_pComplexComponent._setItemPartsSelect = function (item, select) {
		if (item && item.setSelect) {
			item.setSelect(select);
		}
	};
	_pComplexComponent._setItemArraySelect = function (items, select) {
		if (items) {
			if (nexacro._isArray(items)) {
				for (var s = 0, l = items.length; s < l; s++) {
					this._setItemPartsSelect(items[s], select);
				}
			}
			else {
				this._setItemPartsSelect(items, select);
			}
		}
	};
	_pComplexComponent._setItemRangeSelect = function (index, select) {
		if (index) {
			if (nexacro._isArray(index)) {
				for (var s = 0, l = index.length; s < l; s++) {
					var idx = index[s];
					if (!idx) {
						continue;
					}

					if (idx.length) {
						for (var i = idx[0], n = idx[idx.length - 1]; i < n; i++) {
							this._setItemArraySelect(this._getItem(idx[i]));
						}
					}
				}
			}
			else {
				this._setItemArraySelect(this._getItem(index));
			}
		}
	};

	_pComplexComponent._setItemSelect = function (index, select, show) {
		if (index == null) {
			return;
		}

		var i, n;

		if (index.length) {
			if (this.rangeselect) {
				if (this._use_multiselector) {
					for (i = 0, n = index.length; i < n; i++) {
						this._setItemRangeSelect(index[i], select);
						this._showSelector(index[i], select);
					}
					if (show != false) {
						this._showItem(index[index.length - 1], select);
					}
					return;
				}
				if (this._use_partsselector) {
					return;
				}
				else {
					for (i = 0, n = index.length; i < n; i++) {
						this._setItemRangeSelect(index[i], select);
					}
					if (this._use_selector) {
						this._showSelector(index[index.length - 1], select);
					}
					if (show != false) {
						this._showItem(index[index.length - 1], select);
					}
					return;
				}
			}
			else {
				if (this._use_multiselector) {
					for (i = 0, n = index.length; i < n; i++) {
						this._setItemArraySelect(this._getItem(index[i]), select);
						this._showSelector(index[i], select);
					}
					if (show != false) {
						this._showItem(index[index.length - 1], select);
					}

					return;
				}
				if (this._use_partsselector) {
					if (this._use_selector) {
						this._setItemPartsSelect(this._getRawItem(index), select);
						this._showSelector(index, select);
					}
					else {
						this._setItemPartsSelect(this._getRawItem(index), select);
					}
					return;
				}
				else {
					for (i = 0, n = index.length; i < n; i++) {
						this._setItemArraySelect(this._getItem(index[i]), select);
					}
					if (this._use_selector) {
						this._showSelector(index[index.length - 1], select);
					}
					if (show != false) {
						this._showItem(index[index.length - 1], select);
					}

					return;
				}
			}
		}

		if (index == -9) {
			var count = this._getItemsCount();
			var final = this._getBindCount() - 1;

			if (this.rangeselect) {
				var range = [0, count - 1];

				if (this._use_selector) {
					this._setItemRangeSelect(range, select);
					this._showSelector(range, select);
				}
				else {
					this._setItemRangeSelect(range, select);
				}
			}
			else {
				if (this._use_multiselector) {
					for (i = 0; i < count; i++) {
						this._setItemArraySelect(this._getItem(i), select);
						this._showSelector(i, select);
					}
				}
				else {
					for (i = 0; i < count; i++) {
						this._setItemArraySelect(this._getItem(i), select);
					}
					if (this._use_selector) {
						this._showSelector(count - 1, select);
					}
				}
			}

			if (show != false) {
				this._showItem(final, select);
			}

			return;
		}
		else {
			if (this.rangeselect) {
				this._setItemRangeSelect(index, select);
			}
			else {
				this._setItemArraySelect(this._getItem(index), select);
			}

			if (this._use_selector) {
				this._showSelector(index, select);
			}

			if (show != false) {
				this._showItem(index, select);
			}

			return;
		}
	};

	_pComplexComponent._findNextSelectIndex = function (keycode, alt_key, ctrl_key, shift_key) {
		var panel = this._getPanel();
		if (!panel) {
			return;
		}
		var count = this._getBindCount() - 1;
		if (count <= 0) {
			return;
		}
		var viewc = panel._isColFirst() ? this._getItemViewCountCol(false) : 1;
		var viewr = panel._isRowFirst() ? this._getItemViewCountRow(true) : 1;
		var viewp = viewc *  viewr;

		var select = this.getSelectIndex();
		if (select === undefined || select === null) {
			select = -1;
		}

		var oldpos = select.length ? select[0] : select;
		if (oldpos === undefined || oldpos === null || oldpos < 0) {
			oldpos = -1;
		}
		var newpos = oldpos;

		switch (keycode) {
			case nexacro.Event.KEY_TAB:
				if (shift_key) {
					newpos = (oldpos - viewc);
				}
				else {
					newpos = (oldpos + viewc);
				}
				break;
			case nexacro.Event.KEY_UP:
				newpos = (oldpos - viewc);
				break;
			case nexacro.Event.KEY_DOWN:
				newpos = (oldpos + viewc);
				break;
			case nexacro.Event.KEY_LEFT:
				newpos = (oldpos - viewr);
				break;
			case nexacro.Event.KEY_RIGHT:
				newpos = (oldpos + viewr);
				break;
			case nexacro.Event.KEY_PAGE_UP:
				newpos = (oldpos - viewp);
				break;
			case nexacro.Event.KEY_PAGE_DOWN:
				newpos = (oldpos + viewp);
				break;
		}

		if (newpos < 0 || newpos > count) {
			newpos = oldpos;
		}

		return newpos != oldpos ? newpos : oldpos;
	};
	_pComplexComponent._findNextSelectItem = function (keycode, alt_key, ctrl_key, shift_key) {
		var oldindex = this.getSelectIndex();
		var newindex = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);

		return newindex != oldindex ? this._getItem(newindex) : null;
	};
	_pComplexComponent._findNextSelectChild = function (keycode, alt_key, ctrl_key, shift_key) {
		var oldchild = this._getCurrChild();
		var newchild = oldchild;

		if (keycode == nexacro.Event.KEY_TAB) {
			if (shift_key) {
				newchild = this._getPrevChild(this._getCurrChild(), true);
			}
			else {
				newchild = this._getNextChild(this._getCurrChild(), true);
			}
		}

		return newchild != oldchild ? newchild : null;
	};

	_pComplexComponent._checkActionKeyInfo = function (keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp) {
		var ret = "custom";

		if (refer_comp && check_comp) {
			if (refer_comp._checkProcessedKey && refer_comp._checkProcessedKey(keycode, alt_key, ctrl_key, shift_key, refer_comp, refer_comp)) {
				return ret;
			}
			if (check_comp._checkProcessedKey && check_comp._checkProcessedKey(keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp)) {
				return ret;
			}
		}

		var expand = this._is_expandable && this._is_nc_expand ? "expand" : "";
		var scroll = this._is_scrollable && this._is_nc_scroll ? "scroll" : "";
		var select = this._is_items && this._use_select ? "select" : "";

		switch (keycode) {
			case nexacro.Event.KEY_TAB:
				ret = select;
				break;
			case nexacro.Event.KEY_DOWN:
			case nexacro.Event.KEY_UP:
			case nexacro.Event.KEY_LEFT:
			case nexacro.Event.KEY_RIGHT:
			case nexacro.Event.KEY_PAGE_UP:
			case nexacro.Event.KEY_PAGE_DOWN:
				if (!alt_key && ctrl_key && !shift_key) {
					ret = scroll;
				}
				else {
					ret = select;
				}

				break;
			case 69:
				if (alt_key && ctrl_key && !shift_key) {
					ret = expand;
				}

				break;
		}
		return ret;
	};

	_pComplexComponent._selectItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key) {
		switch (keycode) {
			case nexacro.Event.KEY_DOWN:
			case nexacro.Event.KEY_UP:
			case nexacro.Event.KEY_LEFT:
			case nexacro.Event.KEY_RIGHT:
			case nexacro.Event.KEY_PAGE_UP:
			case nexacro.Event.KEY_PAGE_DOWN:
				var select = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);
				if (select == null || select < 0) {
					return false;
				}

				if (shift_key) {
					this.addSelect(select);
				}

				this.setSelect(select);

				this._focusItem(select);

				break;
			case nexacro.Event.KEY_TAB:
				if (this._is_child) {
					var child = this._findNextSelectChild(keycode, alt_key, ctrl_key, shift_key);
					if (child == null) {
						return false;
					}

					child.setFocus();
				}
				else {
					var index = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);
					if (index == null || index < 0) {
						return false;
					}

					this.setSelect(index);
				}
				break;
			case nexacro.Event.KEY_ENTER:
				break;
		}

		return true;
	};

	_pComplexComponent._scrollItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key) {
		var start = this._getItemScrollViewStart();
		var stats = nexacro._PanelSlotConst.STATUS_CURRENT;

		switch (keycode) {
			case nexacro.Event.KEY_UP:
				{

					if (ctrl_key) {
						this.scrollBy(0, -this._getItemHeight(start - 1, stats));
					}

					break;
				}
			case nexacro.Event.KEY_DOWN:
				{

					if (ctrl_key) {
						this.scrollBy(0, this._getItemHeight(start, stats));
					}

					break;
				}
			case nexacro.Event.KEY_LEFT:
				{

					if (ctrl_key) {
						this.scrollBy(-this._getItemWidth(start - 1, stats), 0);
					}

					break;
				}
			case nexacro.Event.KEY_RIGHT:
				{

					if (ctrl_key) {
						this.scrollBy(this._getItemWidth(start, stats), 0);
					}

					break;
				}
			case nexacro.Event.KEY_PAGE_UP:
				{

					if (ctrl_key) {
						this.scrollBy(0, -this._getClientHeight());
					}

					break;
				}
			case nexacro.Event.KEY_PAGE_DOWN:
				{

					if (ctrl_key) {
						this.scrollBy(0, this._getClientHeight());
					}

					break;
				}
		}

		this._updateItemScrollInfo("itemshow", true);
	};

	_pComplexComponent._expandItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key) {
		var stat = nexacro._ExpandConst.EXPANDSTAT_EXPAND;
		var type = nexacro._ExpandConst.EXPANDMODE_INDEX;
		var info = new nexacro.Event(this, "expand");

		if (this._expandmanager) {
			this._expandmanager.setExpand(stat, type, info);
		}
		else {
			this._onExpandExpand(this, type, info);
		}
	};

	_pComplexComponent._customItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key) {
	};


	_pComplexComponent._on_basic_onselect = function (oldvalue, newvalue) {
		if (this._selectinfo) {
			switch (this._selectinfo._selecttype) {
				case 0x08:
					{

						if (this._items) {
							this._setItemSelect(oldvalue, false);
							this._setItemSelect(newvalue, true);
						}
						return;
					}
				case 0xFF:
					{

						return;
					}
			}
		}

		nexacro.SimpleComponent.prototype._on_basic_onselect.call(this, oldvalue, newvalue);
	};






	_pComplexComponent.on_apply_prop_enable = function (v) {
		nexacro.SimpleComponent.prototype.on_apply_prop_enable.call(this, v);

		if (this._is_scrollable == true) {
			if (this.vscrollbar) {
				this.vscrollbar._setEnable(v);
			}
			if (this.hscrollbar) {
				this.hscrollbar._setEnable(v);
			}
		}

		if (this._is_expandable == true) {
			if (this.expandbar) {
				this.expandbar._setEnable(v);
			}
		}
	};



	_pComplexComponent.readonly = false;





	_pComplexComponent._initOverflow = function () {
		if (this._is_scrollable) {
			if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
				this._use_native_scroll = true;
				this._use_translate_scroll = false;
				this._use_translate_move = false;
				this._use_container_move = true;
				this._use_container_multi = false;
			}
			else {
				this._use_native_scroll = false;
				this._use_translate_scroll = true;
				this._use_translate_move = true;
				this._use_container_move = true;
				this._use_container_multi = false;
			}
		}
	};






	_pComplexComponent._createScroll = function () {
		if (this._is_nc_scroll) {
			this._createScrollManager();
		}
	};
	_pComplexComponent._createScrollManager = function () {
		if (this._use_scrollmanager) {
			this._scrollmanager = new nexacro._ScrollManager(this);
		}
	};
	_pComplexComponent._createScrollControl = function () {
	};

	_pComplexComponent._createdScroll = function (win) {
	};



	_pComplexComponent._destroyScroll = function () {
		this._destroyScrollManager();

		this._destroyScrollControl();
	};
	_pComplexComponent._destroyScrollManager = function () {
		if (this._scrollmanager) {
			this._scrollmanager._clear();
			delete this._scrollmanager;
			this._scrollmanager = null;
		}
	};
	_pComplexComponent._clearScrollManager = function () {
		if (this._scrollmanager) {
			this._scrollmanager._clearScrollInfo();
			this._scrollmanager._clearScrollPart();
		}
	};

	_pComplexComponent._destroyScrollControl = function () {
		if (this.hscrollbar) {
			this.hscrollbar.destroy();
			this.hscrollbar = null;
		}
		if (this.vscrollbar) {
			this.vscrollbar.destroy();
			this.vscrollbar = null;
		}
	};

	_pComplexComponent._resetScroll = function (before) {
		var prev = this._checkScrollControl();

		this._recalcScrollSize(before);
		this._resetScrollControl(before);
		this._resetScrollManager(before);

		var curr = this._checkScrollControl();

		return prev != curr;
	};

	_pComplexComponent._recalcScrollSize = function (before) {
		this._onRecalcScrollSize(before);
	};

	_pComplexComponent._resetScrollControl = function (before) {
		this._onResetScrollBar(before);
	};
	_pComplexComponent._checkScrollControl = function (before) {
		var hscrollbar = this.hscrollbar;
		var vscrollbar = this.vscrollbar;

		return (hscrollbar && hscrollbar.visible && hscrollbar._height) << 1 | (vscrollbar && vscrollbar.visible && vscrollbar._width);
	};

	_pComplexComponent._getScrollType = function () {
		var scrolltype = this.scrolltype;

		if (scrolltype == "" || nexacro._isNull(scrolltype)) {
			scrolltype = this._default_scrolltype;
		}



		return scrolltype;
	};
	_pComplexComponent._getScrollBarType = function () {
		var scrollbartype = this.scrollbartype;

		if (scrollbartype == "" || nexacro._isNull(scrollbartype)) {
			scrollbartype = this._default_scrollbartype;
		}



		return scrollbartype;
	};
	_pComplexComponent._getScrollEvtType = function () {
		var scrollevttype = this.scrolleventthrottle;

		if (scrollevttype == "" || nexacro._isNull(scrollevttype)) {
			scrollevttype = this._default_scrolleventthrottle;
		}



		return scrollevttype;
	};
	_pComplexComponent._getScrollCoverType = function () {
		var scrollcovertype = this.scrollcovertype;

		if (scrollcovertype == "" || nexacro._isNull(scrollcovertype)) {
			scrollcovertype = this._default_scrollcovertype;
		}



		return scrollcovertype;
	};
	_pComplexComponent._getScrollTrackType = function () {
		var scrolltracktype = this.scrolltracktype;

		if (scrolltracktype == "" || nexacro._isNull(scrolltracktype)) {
			scrolltracktype = this._default_scrolltracktype;
		}



		return scrolltracktype;
	};
	_pComplexComponent._getScrollTrackLoct = function () {
		var scrolltrackloct = this.scrolltrackalign;

		if (scrolltrackloct == "" || nexacro._isNull(scrolltrackloct)) {
			scrolltrackloct = this._default_scrolltrackalign;
		}



		return scrolltrackloct;
	};
	_pComplexComponent._getScrollTrackBand = function () {
		var trackbandlist = [];

		if (this._is_format_layout && this._formats) {
			trackbandlist = this._formats._mark_bands;
		}

		return trackbandlist;
	};
	_pComplexComponent._getScrollApperTime = function () {
		return this._timeout_apper ? this._timeout_apper : 300;
	};
	_pComplexComponent._getScrollCoverTime = function () {
		return this._timeout_cover ? this._timeout_cover : 300;
	};
	_pComplexComponent._getScrollTrackTime = function () {
		return this._timeout_track ? this._timeout_track : 600;
	};
	_pComplexComponent._getScrollReadyTime = function () {
		return this._timeout_ready ? this._timeout_ready : 300;
	};

	_pComplexComponent._getScrollStickType = function () {
		var scrollsticktype = this.scrollsticktype;

		if (scrollsticktype == "" || nexacro._isNull(scrollsticktype)) {
			scrollsticktype = this._default_scrollsticktype;
		}



		return scrollsticktype;
	};
	_pComplexComponent._getScrollStickTime = function () {
		return this._timeout_stick ? this._timeout_stick : 0;
	};

	_pComplexComponent._resetScrollManager = function (before) {
		if (this._use_scrollmanager && before) {
			if (!this._scrollmanager) {
				this._createScrollManager();
			}

			var manager = this._scrollmanager;

			manager._setScrollContext(this.control_elem);
			manager._setScrollInfo(null, null);
			manager._setScrollControl(this.hscrollbar, this.vscrollbar);
			manager._setScrollLayout(this._isRowFirst(), this._onGetScrollDirType(), this._onGetScrollPosType(), this._onGetScrollCtrlSet(), this._onGetScrollVisible(), this._onGetHScrollLayout(), this._onGetVScrollLayout()
			);
			manager._setScrollEvent(this, this._onGetScrollEvtType());

			if (this._use_scrollcover) {
				manager._setScrollTrackCover(this._onGetScrollCoverType());
			}

			if (this._use_scrolltrack) {
				manager._setScrollTrackBands(this._onGetScrollTrackBand(), this._onGetScrollTrackType(), this._onGetScrollTrackLoct());
			}

			if (this._use_scrollcover || this._use_scrolltrack) {
				manager._setScrollTrackTimes(this._onGetScrollApperTime(), this._onGetScrollCoverTime(), this._onGetScrollTrackTime(), this._onGetScrollReadyTime());
			}

			if (this._use_scrollstick) {
				manager._setScrollStick(this._onGetScrollStickType(), this._onGetScrollStickTime());
			}

			this._resetScrollStatus();
		}
	};
	_pComplexComponent._resetScrollStatus = function () {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager.setScroll(0);
			this._scrollmanager.setScroll(1);
		}
	};

	_pComplexComponent._setNCScrollBarSize = function (hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, before) {
		var control_elem = this._control_element;

		if (control_elem && this._is_scrollable) {
			control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this._getScrollType());
		}
	};
	_pComplexComponent._setContentsScrollInfo = function (info, before) {
	};

	_pComplexComponent._setPanelPrevOverWidth = function (width) {
		if (this._panel) {
			this._panel._setPanelPrevOverWidth(width);
		}
	};
	_pComplexComponent._setPanelNextOverWidth = function (width) {
		if (this._panel) {
			this._panel._setPanelNextOverWidth(width);
		}
	};
	_pComplexComponent._setPanelPrevOverHeight = function (height) {
		if (this._panel) {
			this._panel._setPanelPrevOverHeight(height);
		}
	};
	_pComplexComponent._setPanelNextOverHeight = function (height) {
		if (this._panel) {
			this._panel._setPanelNextOverHeight(height);
		}
	};

	_pComplexComponent._getItemScrollViewStart = function () {
		return this._is_items ? this._onGetItemScrollViewStart() : 0;
	};
	_pComplexComponent._getItemScrollViewCount = function () {
		return this._is_items ? this._onGetItemScrollViewCount() : 0;
	};
	_pComplexComponent._getItemScrollPrevCount = function () {
		return this._is_items ? this._onGetItemScrollPrevCount() : 0;
	};
	_pComplexComponent._getItemScrollNextCount = function () {
		return this._is_items ? this._onGetItemScrollNextCount() : 0;
	};
	_pComplexComponent._getItemScrollFullStart = function () {
		return this._is_items ? this._onGetItemScrollFullStart() : 0;
	};
	_pComplexComponent._getItemScrollFullCount = function () {
		return this._is_items ? this._onGetItemScrollFullCount() : 0;
	};
	_pComplexComponent._getItemScrollFixLeadCount = function () {
		return this._is_items ? this._onGetItemScrollFixLeadCount() : 0;
	};
	_pComplexComponent._getItemScrollFixTailCount = function () {
		return this._is_items ? this._onGetItemScrollFixTailCount() : 0;
	};

	_pComplexComponent._setItemScrollViewStart = function (start) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemViewStart(start);
		}
	};
	_pComplexComponent._setItemScrollViewCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemViewCount(count);
		}
	};
	_pComplexComponent._setItemScrollPrevCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemPrevCount(count);
		}
	};
	_pComplexComponent._setItemScrollNextCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemNextCount(count);
		}
	};
	_pComplexComponent._setItemScrollFullStart = function (start) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemFullStart(start);
		}
	};
	_pComplexComponent._setItemScrollFullCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setPartItemFullCount(count);
		}
	};
	_pComplexComponent._setItemScrollFixLeadCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setItemScrollFixLeadCount(count);
		}
	};
	_pComplexComponent._setItemScrollFixTailCount = function (count) {
		if (this._use_scrollmanager && this._scrollmanager) {
			this._scrollmanager._setItemScrollFixTailCount(count);
		}
	};

	_pComplexComponent._resetItemScrollFullSize = function (rowfirst) {
		var start = this._getItemScrollViewStart();
		var viewc = this._getItemScrollViewCount();
		var prevc = this._getItemScrollPrevCount();
		var nextc = this._getItemScrollNextCount();

		this._setItemScrollFullStart(start - prevc);
		this._setItemScrollFullCount(start + viewc + nextc);

		var fullc = this._getItemScrollFullCount();
		var rowvc = this._getItemViewCountRow(rowfirst);
		var colvc = this._getItemViewCountCol(rowfirst);

		var sz, pc, nc;
		var pw, ph;
		var nw, nh;

		if (rowfirst) {
			sz = this._getItemWidth(0);
			pc = (start - prevc) / rowvc;
			nc = (fullc - (start + viewc + nextc)) / rowvc;
			pw = sz *  pc;
			nw = sz *  nc;

			this._setPanelPrevOverWidth(pw > 0 ? pw : 0);
			this._setPanelNextOverWidth(nw > 0 ? nw : 0);
			this._setPanelPrevOverHeight(0);
			this._setPanelNextOverHeight(0);
		}
		else {
			sz = this._getItemHeight(0);
			pc = (start - prevc) / colvc;
			nc = (fullc - (start + viewc + nextc)) / colvc;
			ph = sz *  pc;
			nh = sz *  nc;

			this._setPanelPrevOverHeight(ph > 0 ? ph : 0);
			this._setPanelNextOverHeight(nh > 0 ? nh : 0);
			this._setPanelPrevOverWidth(0);
			this._setPanelNextOverWidth(0);
		}
	};

	_pComplexComponent._calcItemScrollViewStart = function (pos, row, col, rowfirst) {
		if (this._use_scrollmanager && this._scrollmanager) {
			if (rowfirst) {
				var iw = this._getItemWidth(0);

				if (iw <= 0) {
					return 0;
				}
				else {
					return Math.floor(pos / iw) *  (row ? row : 1);
				}
			}
			else {
				var ih = this._getItemHeight(0);

				if (ih <= 0) {
					return 0;
				}
				else {
					return Math.floor(pos / ih) *  (col ? col : 1);
				}
			}
		}
	};
	_pComplexComponent._calcItemScrollViewCount = function (pos, row, col, rowfirst) {
		if (this._use_scrollmanager && this._scrollmanager) {
			if (rowfirst) {
				var cw = this._getClientWidth();
				var iw = this._getItemArrWidth(0, -9, cw);

				if (cw <= 0 || iw <= 0) {
					return 0;
				}
				else {
					return Math.ceil(cw / iw) *  (row ? row : 1);
				}
			}
			else {
				var ch = this._getClientHeight();
				var ih = this._getItemArrHeight(0, -9, ch);

				if (ch <= 0 || ih <= 0) {
					return 0;
				}
				else {
					return Math.ceil(ch / ih) *  (col ? col : 1);
				}
			}
		}
	};
	_pComplexComponent._calcItemScrollInfo = function (pos, rowfirst) {
		if (this._use_scrollmanager && this._scrollmanager) {
			var cn = this._getItemViewCountRow(rowfirst);
			var co = this._getItemViewCountCol(rowfirst);

			if (!cn || !co) {
				return undefined;
			}

			var fullc = this._getBindCount();
			var start = this._getItemScrollViewStart();
			var viewc = this._getItemScrollViewCount();
			var prevc = this._getItemScrollPrevCount();
			var nextc = this._getItemScrollNextCount();
			var overc = 0;

			if (start < 0) {
				start = 0;
			}

			if (pos >= 0 && viewc >= 0) {
				var newps = this._calcItemScrollViewStart(pos, cn, co, rowfirst);

				var diffc = newps - start;

				if (diffc == 0) {
					return 0;
				}

				start = newps;

				prevc += diffc;
				nextc -= diffc;
				overc = nextc < 0 || prevc < 0 ? diffc : 0;

				if (overc) {
					if (prevc <= 0) {
						overc = prevc - 1;
					}
					if (nextc <= 0) {
						overc = -nextc + 1;
					}

					prevc = viewc;

					var diffp = start - prevc;
					if (diffp <= 0) {
						prevc += diffp;
					}
					if (prevc <= 0) {
						prevc = 0;
					}

					nextc = viewc;

					var diffn = fullc - (start + viewc + nextc);
					if (diffn <= 0) {
						nextc += diffn;
					}
					if (nextc <= 0) {
						nextc = 0;
					}
				}
			}
			else {
				var index = 0;
				var count = 0;


				{

					if (viewc < 0) {
						if (cn <= 0) {
							cn = 1;
						}
						if (co <= 0) {
							co = 1;
						}

						viewc = this._calcItemScrollViewCount(-1, cn, co, rowfirst);
						nextc = viewc *  this._add_partitem;
						prevc = 0;
					}
					else {
						viewc = cn *  co;
						prevc = nextc = viewc *  this._add_partitem;
					}

					index = start - prevc;
					count = viewc + prevc + nextc;
				}


				if (index < 0) {
					count += index;
					prevc += index;
					if (prevc < 0) {
						prevc = 0;
					}

					index = 0;
				}

				overc = (index + count) - fullc;

				if (overc > 0) {
					nextc -= overc;
					if (nextc < 0) {
						nextc = 0;
					}
				}

				overc = undefined;
			}

			this._setItemScrollViewStart(start);
			this._setItemScrollViewCount(viewc);
			this._setItemScrollPrevCount(prevc);
			this._setItemScrollNextCount(nextc);

			this._resetItemScrollFullSize(rowfirst);

			return overc;
		}

		return 0;
	};

	_pComplexComponent._getScrollTrackIndex = function (tracktype) {
		var rowfirst = this._isRowFirst();

		var vc = this._getItemScrollViewCount();
		var cn = this._getItemViewCountRow(rowfirst);
		var co = this._getItemViewCountCol(rowfirst);

		var pos;
		var st;

		if (rowfirst) {
			pos = this._scrollmanager && this._scrollmanager.hscrollinfo ? this._scrollmanager.hscrollinfo.pos : this._hscroll_pos;
			st = this._calcItemScrollViewStart(pos, cn, co, rowfirst);

			return st;
		}
		else {
			pos = this._scrollmanager && this._scrollmanager.vscrollinfo ? this._scrollmanager.vscrollinfo.pos : this._vscroll_pos;
			st = this._calcItemScrollViewStart(pos, cn, co, rowfirst);

			switch (tracktype) {
				case nexacro._ScrollConst.SCROLLTRACKPOS_TOP:
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP:
					{

						return st;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM:
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM:
					{

						return st + vc;
					}
				case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE:
				case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE:
					{

						return st + Math.round(vc / 2);
					}
			}
		}
	};

	_pComplexComponent._changeItemHScrollInfo = function (pos, trigger, ready) {
		if (this._use_scrollmanager && this._scrollmanager && this._is_panel_layout && this._panel) {
			{

				if (this._is_items) {
					var fixl = this._scrollmanager._getItemScrollFixLeadCount();
					var fixt = this._scrollmanager._getItemScrollFixTailCount();

					if (fixl || fixt) {
						if (pos == -1) {
							this._stickPanelItemSlot("stickinit");
						}
					}
				}
				else {
				}
			}
		}
		else {
		}
	};
	_pComplexComponent._changeItemVScrollInfo = function (pos, trigger, ready) {
		if (this._use_scrollmanager && this._scrollmanager && this._is_panel_layout && this._panel) {
			{

				if (this._is_items) {
					var fixl = this._scrollmanager._getItemScrollFixLeadCount();
					var fixt = this._scrollmanager._getItemScrollFixTailCount();

					if (fixl || fixt) {
						if (pos == -1) {
							this._stickPanelItemSlot("stickinit");
						}
					}
				}
				else {
				}
			}
		}
		else {
		}
	};

	_pComplexComponent._updateItemHScrollInfo = function (pos, trigger, ready) {
		if (this._use_scrollmanager && this._scrollmanager && this._is_panel_layout && this._panel) {
			if (this._panel._isRowFirst()) {
				if (this._panel._isPartSlot()) {
					var track = this._scrollmanager.isTracking();

					if (track) {
						if (trigger) {
							this._trackPanelItemSlot(trigger);
						}
						if (ready) {
							this._readyPanelItemSlot(trigger);
						}
					}
					else {
						var over = this._calcItemScrollInfo(pos, false);

						if (trigger) {
							this._apperPanelItemSlot(trigger, over);
						}
						if (ready) {
							this._readyPanelItemSlot(trigger);
						}
					}
				}
				else {
				}
			}
		}
		else {
		}
	};
	_pComplexComponent._updateItemVScrollInfo = function (pos, trigger, ready) {
		if (this._use_scrollmanager && this._scrollmanager && this._is_panel_layout && this._panel) {
			if (this._panel._isColFirst()) {
				if (this._panel._isPartSlot()) {
					var track = this._scrollmanager.isTracking();

					if (track) {
						if (trigger) {
							this._trackPanelItemSlot(trigger);
						}
						if (ready) {
							this._readyPanelItemSlot(trigger);
						}
					}
					else {
						var over = this._calcItemScrollInfo(pos, false);

						if (trigger) {
							this._apperPanelItemSlot(trigger, over);
						}
						if (ready) {
							this._readyPanelItemSlot(trigger);
						}
					}
				}
				else {
				}
			}
		}
		else {
		}
	};
	_pComplexComponent._updateItemScrollInfo = function (trigger, ready) {
		if (this._isColFirst()) {
			this._updateItemVScrollInfo(this._vscroll_pos, trigger, ready);
			this._changeItemVScrollInfo(this._vscroll_pos, trigger, ready);
		}
		else {
			this._updateItemHScrollInfo(this._hscroll_pos, trigger, ready);
			this._changeItemVScrollInfo(this._hscroll_pos, trigger, ready);
		}
	};
	_pComplexComponent._resetItemScrollInfo = function () {
		var trigger = "trackinit";

		if (this._isColFirst()) {
			this._updateItemVScrollInfo(-1, trigger, true);
			this._changeItemVScrollInfo(-1, trigger, true);
		}
		else {
			this._updateItemHScrollInfo(-1, trigger, true);
			this._changeItemHScrollInfo(-1, trigger, true);
		}
	};
	_pComplexComponent._updateChildScrollInfo = function (trigger) {
	};
	_pComplexComponent._resetChildScrollInfo = function () {
	};

	_pComplexComponent._onVScrollReady = function (obj, type, info) {
		return this._on_ready_onvscroll(obj, info);
	};
	_pComplexComponent._onVScrollStart = function (obj, type, info) {
		return this._on_start_onvscroll(obj, info);
	};
	_pComplexComponent._onVScrollScroll = function (obj, type, info) {
		this._on_scroll_onvscroll(obj, info);

		this._on_basic_onvscroll(obj, info);
		this._on_fire_onvscroll(obj, info);
		this._on_default_onvscroll(obj, info);

		this._on_change_onvscroll(obj, info);
	};
	_pComplexComponent._onVScrollUpdate = function (obj, type, info) {
		this._on_update_onvscroll(obj, info);

		this._on_basic_onvscroll(obj, info);
		this._on_fire_onvscroll(obj, info);
		this._on_default_onvscroll(obj, info);

		this._on_change_onvscroll(obj, info);
	};
	_pComplexComponent._onVScrollFinish = function (obj, type, info) {
		return this._on_finish_onvscroll(obj, info);
	};

	_pComplexComponent._onHScrollReady = function (obj, type, info) {
		return this._on_ready_onhscroll(obj, info);
	};
	_pComplexComponent._onHScrollStart = function (obj, type, info) {
		return this._on_start_onhscroll(obj, info);
	};
	_pComplexComponent._onHScrollScroll = function (obj, type, info) {
		this._on_scroll_onhscroll(obj, info);

		this._on_basic_onhscroll(obj, info);
		this._on_fire_onhscroll(obj, info);
		this._on_default_onhscroll(obj, info);

		this._on_change_onhscroll(obj, info);
	};
	_pComplexComponent._onHScrollUpdate = function (obj, type, info) {
		this._on_update_onhscroll(obj, info);

		this._on_basic_onhscroll(obj, info);
		this._on_fire_onhscroll(obj, info);
		this._on_default_onhscroll(obj, info);

		this._on_change_onhscroll(obj, info);
	};
	_pComplexComponent._onHScrollFinish = function (obj, type, info) {
		return this._on_finish_onhscroll(obj, info);
	};


	_pComplexComponent.on_notify_vscroll_onscroll = function (obj, e) {
		if (this._use_scrollmanager && this._scrollmanager) {
			var stat = this._scrollmanager._convertScrollEventStat(e.type);
			var type = nexacro._ScrollConst.SCROLLCTRL_VERT;

			this._scrollmanager.setScroll(stat, type, null, e);
		}
		else {
			this._scrollTo(this._hscroll_pos, e.pos, false, false, e.type, e._evtkind);
		}
	};

	_pComplexComponent.on_notify_hscroll_onscroll = function (obj, e) {
		if (this._use_scrollmanager && this._scrollmanager) {
			var stat = this._scrollmanager._convertScrollEventStat(e.type);
			var type = nexacro._ScrollConst.SCROLLCTRL_HORZ;

			this._scrollmanager.setScroll(stat, type, e, null);
		}
		else {
			this._scrollTo(e.pos, this._vscroll_pos, false, false, e.type, e._evtkind);
		}

		return true;
	};



	_pComplexComponent._apply_scrolltype_scrollbartype = function () {
		if (this.scrolltype == "none") {
			this._setLayoutAllowNC(false);
			this._setLayoutUnFixNC(false);
		}
		else {
			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			if (hscrollbartype == vscrollbartype) {
				switch (vscrollbartype) {
					case "auto":
						{

							this._setLayoutAllowNC(true);
							this._setLayoutUnFixNC(true);
							break;
						}
					case "none":
						{

							this._setLayoutAllowNC(false);
							this._setLayoutUnFixNC(false);
							break;
						}
					default:
						{

							this._setLayoutAllowNC(true);
							this._setLayoutUnFixNC(false);
							break;
						}
				}
			}
			else {
				if (hscrollbartype == "auto" || vscrollbartype == "auto") {
					this._setLayoutAllowNC(true);
					this._setLayoutUnFixNC(true);
				}
				else {
					this._setLayoutAllowNC(true);
					this._setLayoutUnFixNC(false);
				}
			}
		}
	};

	_pComplexComponent.on_apply_scrolltype = function () {
		this._apply_scrolltype_scrollbartype();

		nexacro.SimpleComponent.prototype.on_apply_scrolltype.call(this);

		if (this._is_created) {
			this._recalcLayout();
		}
	};
	_pComplexComponent.on_apply_scrollbartype = function () {
		this._apply_scrolltype_scrollbartype();

		nexacro.SimpleComponent.prototype.on_apply_scrollbartype.call(this);

		if (this._is_created) {
			this._recalcLayout();
		}
	};


	_pComplexComponent._onGetScrollPosType = function () {
		return this._getScrollType();
	};
	_pComplexComponent._onGetScrollDirType = function () {
		return this._getScrollType();
	};
	_pComplexComponent._onGetScrollEvtType = function () {
		return this._getScrollEvtType();
	};
	_pComplexComponent._onGetScrollCtrlSet = function () {
		return this._getScrollBarType();
	};
	_pComplexComponent._onGetScrollVisible = function () {
		return this._getScrollBarType();
	};
	_pComplexComponent._onGetHScrollLayout = function () {
		return this._getScrollBarType();
	};
	_pComplexComponent._onGetVScrollLayout = function () {
		return this._getScrollBarType();
	};

	_pComplexComponent._onGetScrollCoverType = function () {
		return this._getScrollCoverType();
	};
	_pComplexComponent._onGetScrollTrackBand = function () {
		return this._getScrollTrackBand();
	};
	_pComplexComponent._onGetScrollTrackType = function () {
		return this._getScrollTrackType();
	};
	_pComplexComponent._onGetScrollTrackLoct = function () {
		return this._getScrollTrackLoct();
	};
	_pComplexComponent._onGetScrollApperTime = function () {
		return this._getScrollApperTime();
	};
	_pComplexComponent._onGetScrollCoverTime = function () {
		return this._getScrollCoverTime();
	};
	_pComplexComponent._onGetScrollTrackTime = function () {
		return this._getScrollTrackTime();
	};
	_pComplexComponent._onGetScrollReadyTime = function () {
		return this._getScrollReadyTime();
	};

	_pComplexComponent._onGetScrollStickType = function () {
		return this._getScrollStickType();
	};
	_pComplexComponent._onGetScrollStickTime = function () {
		return this._getScrollStickTime();
	};

	_pComplexComponent._onRecalcScrollSize = function (before) {
		if (this._is_scrollable) {
			this._setContentsMaxSize(this._getContentsMaxWidth(before), this._getContentsMaxHeight(before), before
			);
			this._setNCScrollBarSize(this._getHScrollBarSize(), this._getVScrollBarSize(), this._getHScrollBarType(), this._getVScrollBarType(), before
			);
		}
	};

	_pComplexComponent._onGetItemScrollViewStart = function () {
		if (this._use_scrollmanager && this._scrollmanager) {
			return this._scrollmanager._getPartItemViewStart();
		}
		else {
			return 0;
		}
	};
	_pComplexComponent._onGetItemScrollViewCount = function () {
		if (this._use_scrollmanager && this._scrollmanager) {
			return this._scrollmanager._getPartItemViewCount();
		}
		else {
			if (this._is_databind) {
				return this._getBindCount();
			}
			if (this._items) {
				return this._items.length;
			}

			return 0;
		}
	};
	_pComplexComponent._onGetItemScrollPrevCount = function () {
		return (this._use_scrollmanager && this._scrollmanager) ? this._scrollmanager._getPartItemPrevCount() : 0;
	};
	_pComplexComponent._onGetItemScrollNextCount = function () {
		return (this._use_scrollmanager && this._scrollmanager) ? this._scrollmanager._getPartItemNextCount() : 0;
	};
	_pComplexComponent._onGetItemScrollFullStart = function () {
		return (this._use_scrollmanager && this._scrollmanager) ? this._scrollmanager._getPartItemFullStart() : this._onGetItemScrollViewStart();
	};
	_pComplexComponent._onGetItemScrollFullCount = function () {
		return (this._use_scrollmanager && this._scrollmanager) ? this._scrollmanager._getPartItemFullCount() : this._onGetItemScrollViewCount();
	};
	_pComplexComponent._onGetItemScrollFixLeadCount = function () {
		var fixc = 0;

		if (this._use_scrollmanager && this._scrollmanager) {
			fixc = this._scrollmanager._getItemScrollFixLeadCount();
		}
		if (fixc != -1) {
			return fixc;
		}
		if (this._panel) {
			fixc = this._panel._getPanelFixedSlotCountLead();
		}
		if (this._use_scrollmanager && this._scrollmanager) {
			fixc = this._scrollmanager._setItemScrollFixLeadCount(fixc);
		}

		return fixc;
	};
	_pComplexComponent._onGetItemScrollFixTailCount = function () {
		var fixc = 0;

		if (this._use_scrollmanager && this._scrollmanager) {
			fixc = this._scrollmanager._getItemScrollFixTailCount();
		}
		if (fixc != -1) {
			return fixc;
		}
		if (this._panel) {
			fixc = this._panel._getPanelFixedSlotCountTail();
		}
		if (this._use_scrollmanager && this._scrollmanager) {
			fixc = this._scrollmanager._setItemScrollFixTailCount(fixc);
		}

		return fixc;
	};

	_pComplexComponent._on_fire_onvscroll = function (obj, e) {
		return this._fire_event(this.onvscroll, obj, e);
	};

	_pComplexComponent._on_fire_onhscroll = function (obj, e) {
		return this._fire_event(this.onhscroll, obj, e);
	};

	_pComplexComponent._on_basic_onvscroll = function (obj, info) {
	};
	_pComplexComponent._on_default_onvscroll = function (obj, info) {
		this._control_element.setElementVScrollPos(info.pos);
	};
	_pComplexComponent._on_ready_onvscroll = function (obj, info) {
		this._updateItemVScrollInfo(info.pos, "trackinit", true);
	};
	_pComplexComponent._on_start_onvscroll = function (obj, info) {
		this._updateItemVScrollInfo(info.pos, "trackstart", false);
	};
	_pComplexComponent._on_scroll_onvscroll = function (obj, info) {
		this._updateItemVScrollInfo(info.pos, "trackmove", false);
	};
	_pComplexComponent._on_update_onvscroll = function (obj, info) {
		this._updateItemVScrollInfo(info.pos, "trackmove", true);
	};
	_pComplexComponent._on_change_onvscroll = function (obj, info) {
		this._changeItemVScrollInfo(info.pos, "trackchange", false);
	};
	_pComplexComponent._on_finish_onvscroll = function (obj, info) {
		this._updateItemVScrollInfo(info.pos, "trackend", true);
	};

	_pComplexComponent._on_basic_onhscroll = function (obj, info) {
	};
	_pComplexComponent._on_default_onhscroll = function (obj, info) {
		this._control_element.setElementHScrollPos(info.pos);
	};
	_pComplexComponent._on_ready_onhscroll = function (obj, info) {
		this._updateItemHScrollInfo(info.pos, "trackinit", true);
	};
	_pComplexComponent._on_start_onhscroll = function (obj, info) {
		this._updateItemHScrollInfo(info.pos, "trackmove", false);
	};
	_pComplexComponent._on_scroll_onhscroll = function (obj, info) {
		this._updateItemHScrollInfo(info.pos, "trackmove", false);
	};
	_pComplexComponent._on_update_onhscroll = function (obj, info) {
		this._updateItemHScrollInfo(info.pos, "trackmove", true);
	};
	_pComplexComponent._on_change_onhscroll = function (obj, info) {
		this._changeItemHScrollInfo(info.pos, "trackchange", false);
	};
	_pComplexComponent._on_finish_onhscroll = function (obj, info) {
		this._updateItemHScrollInfo(info.pos, "trackend", true);
	};







	_pComplexComponent._default_expandtype = "none";
	_pComplexComponent._default_expandbartype = false;
	_pComplexComponent._default_expandbarsize = [17, 17];

	_pComplexComponent._createExpand = function () {
		if (this._is_nc_expand) {
			this._createExpandManager();
		}
	};
	_pComplexComponent._createExpandManager = function () {
		if (this._use_expandmanager) {
			this._expandmanager = new nexacro._ExpandManager();

			this._expandmanager._setExpandLayout(this._onGetExpandDirType(), this._onGetExpandActType(), this._onGetExpandCtrlSet(), this._onGetExpandVisible(), this._onGetExpandArrange());
			this._expandmanager._setExpandEvent(this);
		}
	};
	_pComplexComponent._createExpandControl = function () {
	};

	_pComplexComponent._createExpandBar = function (expandbartype, expandbarsize) {
		var ctrlsettype;
		var ctrlvisible;
		var ctrlacttype;

		if (this._use_expandmanager && this._expandmanager) {
			ctrlsettype = this._expandmanager.ctrlsettype;
			ctrlvisible = this._expandmanager.ctrlvisible;
			ctrlacttype = this._expandmanager.expandmode;
		}
		else {
			ctrlsettype = nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[expandbartype];
			ctrlvisible = nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[expandbartype];
		}

		if (nexacro._isNull(ctrlsettype)) {
			ctrlsettype = nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[this._default_expandbartype];
		}
		if (nexacro._isNull(ctrlvisible)) {
			ctrlvisible = nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[this._default_expandbartype];
		}

		var clientwidth = this._getClientWidth();
		var clientheight = this._getClientHeight();

		switch (ctrlsettype) {
			case nexacro._ExpandConst.EXPANDCTRLSET_CHECK:
				{

					if (this.expandbar && this.expandbar._type_name != "CheckBox") {
						this._destroyExpandBar();
					}
					if (this.expandbar == null) {
						this.expandbar = this.createNCChildControl(new nexacro.CheckBox("expandbar", clientwidth, 0, expandbarsize[0], expandbarsize[1], null, null, null, null, null, null, this));
					}
					break;
				}
			case nexacro._ExpandConst.EXPANDCTRLSET_BUTTON:
			default:
				{

					if (this.expandbar && this.expandbar._type_name != "Button") {
						this._destroyExpandBar();
					}
					if (this.expandbar == null) {
						this.expandbar = this.createNCChildControl(new nexacro.Button("expandbar", clientwidth, 0, expandbarsize[0], expandbarsize[1], null, null, null, null, null, null, this));
					}
					break;
				}
			case nexacro._ExpandConst.EXPANDCTRLSET_CUSTOM:
				{

					var control = this._createExpandBarCustom("expandbar", clientwidth, 0, expandbarsize[0], expandbarsize[1]);
					if (control._is_subcontrol) {
						this.expandbar = this.createNCChild(control);
					}
					else {
						this.expandbar = this.createNCChildControl(control);
					}
					break;
				}
		}


		switch (ctrlacttype) {
			case nexacro._ExpandConst.EXPANDACTTYPE_CLICK:
				{

					this.expandbar._setEventHandler("onclick", this.on_notify_expand_onclick, this);
					break;
				}
			case nexacro._ExpandConst.EXPANDACTTYPE_NONE:
			default:
				{

					break;
				}
		}

		var hscrable = this._control_element.hscroll_limit > 0;
		var vscrable = this._control_element.vscroll_limit > 0;
		var overflow = hscrable || vscrable;

		switch (ctrlvisible) {
			case nexacro._ExpandConst.EXPANDVISIBLE_AUTO:
				{

					this.expandbar.set_visible(overflow);
					this.expandbar.set_enable(overflow);
					break;
				}
			case nexacro._ExpandConst.EXPANDVISIBLE_FIXED:
				{

					this.expandbar.set_enable(overflow);
					break;
				}
			case nexacro._ExpandConst.EXPANDVISIBLE_CONST:
			default:
				{

					break;
				}
		}

		var el = clientwidth;
		var et = 0;
		var ew = +expandbarsize[0];
		var eh = +expandbarsize[1];

		if (ew > clientwidth) {
			ew = clientwidth;
		}
		if (eh > clientheight) {
			eh = clientheight;
		}
		else if (eh < clientheight) {
			et = (clientheight - eh) / 2;
		}





		this.expandbar.move(el, et, ew, eh, null, null);

		if (!this.expandbar._is_created) {
			this.expandbar.on_created(this._getWindow());
		}
	};
	_pComplexComponent._createExpandBarCustom = function () {
	};

	_pComplexComponent._createdExpand = function (win) {
	};
	_pComplexComponent._createdExpandControl = function (win) {
	};
	_pComplexComponent._createdExpandBar = function (win) {
	};




	_pComplexComponent._destroyExpand = function () {
		this._destroyExpandManager();

		this._destroyExpandControl();
	};
	_pComplexComponent._destroyExpandManager = function () {
		if (this._expandmanager) {
			this._expandmanager._clear();
			delete this._expandmanager;
			this._expandmanager = null;
		}
	};
	_pComplexComponent._clearExpandManager = function () {
		if (this._expandmanager) {
			this._expandmanager._clearExpandInfo();
		}
	};
	_pComplexComponent._destroyExpandControl = function () {
		this._destroyExpandBar();
	};
	_pComplexComponent._destroyExpandBar = function () {
		if (this.expandbar) {
			this.expandbar.destroy();
			this.expandbar = null;
		}
	};

	_pComplexComponent._resetExpand = function (before) {
		var prev = this._checkExpandControl();

		this._recalcExpandSize(before);
		this._resetExpandControl(before);
		this._resetExpandManager(before);

		var next = this._checkExpandControl();

		return prev != next;
	};

	_pComplexComponent._recalcExpandSize = function (before) {
		this._onRecalcExpandSize(before);
	};

	_pComplexComponent._resetExpandControl = function (before) {
		this._onResetExpandBar(before);
	};

	_pComplexComponent._resetExpandManager = function (before) {
		if (this._use_expandmanager && !before) {
			if (!this._expandmanager) {
				this._createExpandManager();
			}

			this._expandmanager.setExpand(0);

			this._expandmanager._setExpandControl(this.expandbar);
			this._expandmanager._setExpandContext(this._control_element);
			this._expandmanager._setExpandInfo(null);
		}
	};

	_pComplexComponent._getExpandType = function () {
		var expandtype = this.expandtype;

		if (expandtype == "" || nexacro._isNull(expandtype)) {
			expandtype = this._default_expandtype;
		}



		return expandtype;
	};
	_pComplexComponent._getExpandActType = function () {
		var expandtype = this._getExpandType();

		if (nexacro._ExpandConst.EXPANDACTTYPE_CONVERT[expandtype]) {
			return expandtype;
		}
		else {
			return "click";
		}
	};
	_pComplexComponent._getExpandDirType = function () {
		var expandtype = this.expanddirtype;

		if (nexacro._ExpandConst.EXPANDDIRTYPE_CONVERT[expandtype]) {
			return expandtype;
		}
		else {
			return "none";
		}
	};
	_pComplexComponent._getExpandBarType = function () {
		var expandbartype = this.expandbartype;

		if (expandbartype == "" || nexacro._isNull(expandbartype)) {
			expandbartype = this._default_expandbartype;
		}

		return expandbartype;
	};
	_pComplexComponent._getExpandArrange = function () {
		var expandbartype = this._getExpandBarType();

		if (nexacro._ExpandConst.EXPANDARRANGE_CONVERT[expandbartype]) {
			return expandbartype;
		}
		else {
			return "default";
		}
	};
	_pComplexComponent._getExpandVisible = function () {
		var expandbartype = this._getExpandBarType();

		if (nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[expandbartype]) {
			return expandbartype;
		}
		else {
			return "const";
		}
	};

	_pComplexComponent._getExpandBarSize = function () {
		var expandbarsize = this.expandbarsize;

		if (!nexacro._isNull(expandbarsize)) {
			expandbarsize = expandbarsize.split(" ");
			expandbarsize.length == 1 ? expandbarsize.push(expandbarsize[0]) : void 0;

			return expandbarsize;
		}

		return this._default_expandbarsize;
	};


	_pComplexComponent._checkExpandControl = function (before) {
		return this.expandbar && this.expandbar.visible;
	};

	_pComplexComponent._setNCExpandBarSize = function (expandbarsize, expandbartype, before) {
		var control_elem = this._control_element;

		if (control_elem && this._is_expandable) {
			control_elem.setElementExpandbarSize(expandbarsize, expandbartype, this._getExpandDirType(), this._getExpandVisible(), this._getExpandArrange());
		}
	};

	_pComplexComponent._getContentsExpandIndex = function () {
		return nexacro._isNull(this._contents_expanded) ? -1 : this._contents_expanded;
	};
	_pComplexComponent._getContentsExpandSizes = function () {
		return this._contents_expanded && this._contents_expanded.length ? this._contents_expanded : [-1, -1];
	};

	_pComplexComponent._setContentsExpandIndex = function (index, before) {
		this._contents_expanded = index;
	};
	_pComplexComponent._setContentsExpandSizes = function (sizes, before) {
		this._contents_expanded = sizes;
	};

	_pComplexComponent._getItemExpandIndex = function (width, height, before) {
		return this._is_items ? this._onGetItemExpandIndex(width, height, before) : -1;
	};
	_pComplexComponent._getItemExpandSizes = function (width, height, before) {
		return this._is_child ? this._onGetItemExpandSizes(width, height, before) : [-1, -1];
	};

	_pComplexComponent._onExpandReady = function (obj, type, info) {
		return this._on_ready_onexpand(obj, info);
	};
	_pComplexComponent._onExpandFinish = function (obj, type, info) {
		return this._on_finish_onexpand(obj, info);
	};
	_pComplexComponent._onExpandUpdate = function (obj, type, info) {
		return this._on_update_onexpand(obj, info);
	};
	_pComplexComponent._onExpandExpand = function (obj, type, info) {
		this._on_basic_onexpand(obj, info);
		this._on_fire_onexpand(obj, info);
		this._on_default_onexpand(obj, info);
	};

	_pComplexComponent.on_notify_expand_onclick = function (obj, e) {
		this._on_fire_onexpandclick(obj, e);

		if (this._use_expandmanager) {
			var stat = nexacro._ExpandConst.EXPANDSTAT_EXPAND;
			var type = nexacro._ExpandConst.EXPANDMODE_INDEX;

			this._expandmanager.setExpand(stat, type, e);
		}
		else {
			this._onExpandExpand(obj, e);
		}

		return true;
	};


	_pComplexComponent._onGetExpandDirType = function () {
		return this._getExpandDirType();
	};
	_pComplexComponent._onGetExpandActType = function () {
		return this._getExpandActType();
	};
	_pComplexComponent._onGetExpandCtrlSet = function () {
		return this._getExpandBarType();
	};
	_pComplexComponent._onGetExpandVisible = function () {
		return this._getExpandVisible();
	};
	_pComplexComponent._onGetExpandArrange = function () {
		return this._getExpandArrange();
	};

	_pComplexComponent._onRecalcExpandSize = function (before) {
		var maxwidth = this._getContentsMaxWidth(before);
		var maxheight = this._getContentsMaxHeight(before);

		if (this._is_expandable) {
			this._setContentsMaxSize(maxwidth, maxheight, before);
			this._setNCExpandBarSize(this._getExpandBarSize(), this._getExpandBarType(), before
			);
		}

		if (this._is_items) {
			this._setContentsExpandIndex(this._getItemExpandIndex(maxwidth, maxheight, before), before);
		}
		if (this._is_child) {
			this._setContentsExpandSizes(this._getItemExpandSizes(maxwidth, maxheight, before), before);
		}
	};

	_pComplexComponent._onResetExpandBar = function (before) {
		var control_elem = this._control_element;
		if (control_elem) {
			var expandbarsize = this._getExpandBarSize();
			var expandbartype = this._getExpandBarType();
			var bcreateexpand = expandbartype != "none";

			if (bcreateexpand) {
				this._createExpandBar(expandbartype, expandbarsize);
			}
			else {
				this._destroyExpandBar();
			}

			if (this.expandbar) {
				if (!this.expandbar._is_created) {
					this.expandbar.on_created(this._getWindow());
				}
			}
		}
	};

	_pComplexComponent._onGetItemExpandIndex = function (width, height, before) {
		if (this._is_databind) {
			return this._getBindCount();
		}
		if (this._items) {
			return this._items.length;
		}
		return -1;
	};
	_pComplexComponent._onGetItemExpandSizes = function (width, height, before) {
		if (this._children) {
			return [-1, -1];
		}

		return [-1, -1];
	};

	_pComplexComponent._on_fire_onexpand = function (obj, e) {
		if (this.onexpand && this.onexpand._has_handlers) {
			e.fromobject = this;
			this.onexpand._fireEvent(this, e);
		}
		return true;
	};
	_pComplexComponent._on_fire_onexpandclick = function (obj, e) {
		if (this.onexpandclick && this.onexpandclick._has_handlers) {
			e.fromobject = this;
			this.onexpandclick._fireEvent(this, e);
		}
		return true;
	};
	_pComplexComponent._on_basic_onexpand = function (obj, e) {
	};
	_pComplexComponent._on_default_onexpand = function (obj, e) {
	};
	_pComplexComponent._on_ready_onexpand = function (obj, e) {
	};
	_pComplexComponent._on_finish_onexpand = function (obj, e) {
	};
	_pComplexComponent._on_update_onexpand = function (obj, e) {
	};



	_pComplexComponent._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : true, 
			want_return : true, 
			want_escape : true, 
			want_chars : true, 
			want_arrows : true
		};
	};

	_pComplexComponent._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return this._onGetDlgCode(keycode, altKey, ctrlKey, shiftKey);
	};

	_pComplexComponent._onGetDragData = function () {
		return this.getSelectedText();
	};

	_pComplexComponent._onGetTabstop = function () {
		if (nexacro._enableaccessibility) {
			var accessibility = this.accessibility;
			if (accessibility && accessibility.enable && accessibility.role == "link") {
				return true;
			}
		}
		return false;
	};

	_pComplexComponent._onGetFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pComplexComponent._onHotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.click();
	};












	_pComplexComponent._onInitStatus = function () {
	};

	_pComplexComponent._spreadStatus = function (statusname, statusstat) {
		if (this._is_child) {
			this._onSpreadStatusChild(statusname, statusstat);
		}
		if (this._is_items) {
			this._onSpreadStatusItems(statusname, statusstat);
		}
	};

	_pComplexComponent._onSpreadStatusChild = function (statusname, statusstat) {
		var children = this._getChildren();
		if (children) {
			var start = 0;
			var final = children.length;

			var child, func;
			var setter = "_changeStatus";

			for (var i = start, l = final; i < l; i++) {
				if (!(child = children[i])) {
					continue;
				}

				if (!(func = child[setter])) {
					continue;
				}

				func.call(child, statusname, statusstat);
			}
		}
	};

	_pComplexComponent._onSpreadStatusItems = function (statusname, statusstat) {
		var items = this._getItems();
		if (items) {
			var start = 0;
			var final = items.length;

			var item, func;
			var setter = "_changeStatus";

			for (var i = start, l = final; i < l; i++) {
				if (!(item = items[i])) {
					continue;
				}

				if (!(func = item[setter])) {
					continue;
				}

				func.call(item, statusname, statusstat);
				item._spreadStatus(statusname, statusstat);
			}
		}
	};






	_pComplexComponent.onInitProperties = function () {
		this.property1 = true;
	};
	_pComplexComponent.onApplyProperties = function () {
		this.on_apply_property1();
	};
	_pComplexComponent.onClearProperties = function () {
		this.on_clear_property1();
	};

	_pComplexComponent.set_property1 = function (v) {
		if (this.property1 != v) {
			this.property1 = nexacro._toBoolean(v);

			this.on_apply_property1();
		}
	};

	_pComplexComponent.on_apply_property1 = function () {
		if (!this._is_created) {
			return;
		}
	};

	_pComplexComponent.on_clear_property1 = function () {
	};



	_pComplexComponent.click = function () {
		this.on_fire_event1("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
	};

	_pComplexComponent.getAMethod = function () {
		return this._A;
	};

	_pComplexComponent.setAStatus = function (v) {
		var ret = this._A;
		this._A = v;

		this._changeUserStatus("Status1", v);

		return ret;
	};




	_pComplexComponent._initEvents = function () {
		nexacro.SimpleComponent.prototype._initEvents.call(this);

		if (this._is_nc_scroll) {
			this._event_list["onhscroll"] = 1;
			this._event_list["onvscroll"] = 1;
		}
		if (this._is_nc_expand) {
			this._event_list["onexpand"] = 1;
			this._event_list["onexpandclick"] = 1;
		}
	};

	_pComplexComponent._fire_event = function (event, obj, e) {
		var r = true;
		if (event && event._has_handlers) {
			e.fromobject = this;
			r = event._fireEvent(this, e);
			e.fromobject = obj;
		}
		return r;
	};









	_pComplexComponent.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onlbuttondown._fireSysEvent(this, evt);
		}
		return false;
	};
	_pComplexComponent.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComplexComponent.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			return this.onmouseup._fireSysEvent(this, new nexacro.MouseEventInfo(this._getRootComponent(from_comp), "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key));
		}
		return false;
	};
	_pComplexComponent.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			return this.onmouseup._fireUserEvent(this, new nexacro.MouseEventInfo(this._getRootComponent(from_comp), "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key));
		}
		return false;
	};


	_pComplexComponent._setVScrollDefaultAction = function (wheelDelta) {
		var ret = nexacro.SimpleComponent.prototype._setVScrollDefaultAction.call(this, wheelDelta);

		if (ret) {
			this._updateItemVScrollInfo(this._vscroll_pos, "trackwheel", true);
			this._changeItemVScrollInfo(this._vscroll_pos, "trackwheel", false);
		}

		return ret;
	};
	_pComplexComponent._setHScrollDefaultAction = function (wheelDelta) {
		var ret = nexacro.SimpleComponent.prototype._setHScrollDefaultAction.call(this, wheelDelta);

		if (ret) {
			this._updateItemHScrollInfo(this._hscroll_pos, "trackwheel", true);
			this._changeItemVScrollInfo(this._hscroll_pos, "trackwheel", false);
		}

		return ret;
	};



	_pComplexComponent.on_slidestart_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_slidestart_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp);

		this._updateItemScrollInfo("slidestart", true);

		return ret;
	};

	_pComplexComponent.on_slide_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_slide_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp);

		this._updateItemScrollInfo("slidemove", false);

		return ret;
	};

	_pComplexComponent.on_slideend_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_slideend_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, refer_comp);

		this._updateItemScrollInfo("slideend", true);

		return ret;
	};


	_pComplexComponent.on_flingstart_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_flingstart_basic_action.call(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

		this._updateItemScrollInfo("trackstart", true);

		return ret;
	};

	_pComplexComponent.on_fling_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_fling_basic_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

		this._updateItemScrollInfo("trackmove", false);

		return ret;
	};

	_pComplexComponent.on_flingend_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) {
		var ret = nexacro.SimpleComponent.prototype.on_flingend_basic_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

		this._updateItemScrollInfo("trackend", true);

		return ret;
	};




	_pComplexComponent.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_keydown_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
	};
	_pComplexComponent.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_keydown_default_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
	};
	_pComplexComponent.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_fire_user_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};
	_pComplexComponent.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		switch (this._checkActionKeyInfo(key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key)) {
			case "select":
				this._selectItemKeyInfo(key_code, alt_key, ctrl_key, shift_key);
				break;
			case "scroll":
				this._scrollItemKeyInfo(key_code, alt_key, ctrl_key, shift_key);
				break;
			case "expand":
				this._expandItemKeyInfo(key_code, alt_key, ctrl_key, shift_key);
				break;
			case "custom":
				this._customItemKeyInfo(key_code, alt_key, ctrl_key, shift_key);
				break;
		}

		return nexacro.SimpleComponent.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};

	_pComplexComponent.on_keyup_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_keyup_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
	};
	_pComplexComponent.on_keyup_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_keyup_default_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
	};
	_pComplexComponent.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};
	_pComplexComponent.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return nexacro.SimpleComponent.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};






	_pComplexComponent._onGetAccessibilityLabel = function () {
		var label = this.text ? this.text : this.value;
		return label;
	};
	_pComplexComponent._onGetAccessibilityAdditionalRole = function () {
		return " addrole";
	};








	delete _pComplexComponent;
}
