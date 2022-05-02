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

"use strict";

if (!nexacro.DataObject) {
	nexacro.DataObjectLoadEventInfo = function (obj, id, url, reason) {
		this.id = this.eventid = id || "onload";
		this.fromobject = this.fromreferenceobject = obj;

		this.url = url;
		this.reason = reason;
	};
	var _pDataObjectLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DataObjectLoadEventInfo);
	nexacro.DataObjectLoadEventInfo.prototype = _pDataObjectLoadEventInfo;
	_pDataObjectLoadEventInfo._type_name = "DataObjectLoadEventInfo";

	_pDataObjectLoadEventInfo = null;

	nexacro.DataObjectErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, errordata) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, errordata);
	};

	var _pDataObjectErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.DataObjectErrorEventInfo);
	nexacro.DataObjectErrorEventInfo.prototype = _pDataObjectErrorEventInfo;
	_pDataObjectErrorEventInfo._type_name = "DataObjectErrorEventInfo";

	_pDataObjectErrorEventInfo = null;

	nexacro.DataObjectEventInfo = function (obj, id, response, svcid, url, reason, method, statuscode) {
		this.id = this.eventid = id || "onload";
		this.fromobject = this.fromreferenceobject = obj;

		this.response = response;
		this.serviceid = svcid;
		this.url = url;
		this.reason = reason;

		this.cancelable = true;
		this.method = method;
		this.statuscode = statuscode;
	};
	var _pDataObjectEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DataObjectEventInfo);
	nexacro.DataObjectEventInfo.prototype = _pDataObjectEventInfo;
	_pDataObjectEventInfo._type_name = "DataObjectEventInfo";

	nexacro.DataObject = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this._context_list = [];
	};

	var _pDataObject = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.DataObject);
	nexacro.DataObject.prototype = _pDataObject;
	_pDataObject._type_name = "DataObject";

	_pDataObject.url = "";
	_pDataObject.preload = false;
	_pDataObject.data = null;

	_pDataObject._is_preloaded = false;
	_pDataObject._response = undefined;
	_pDataObject._response_headers = undefined;

	_pDataObject._event_list = 
		{
		"onsuccess" : 1, 
		"onload" : 1, 
		"onerror" : 1
	};



	nexacro.DataObject.REASON_LOAD = 0;
	nexacro.DataObject.REASON_LOADCONTENT = 1;
	nexacro.DataObject.REASON_REQUEST = 2;



	_pDataObject.create = function () {
	};


	_pDataObject.on_created = function () {
		if (this.url == "" || this.preload == false) {
			if (this.data) {
				this._endLoad(0, "SUCCESS", 1);
			}
		}

		if (!nexacro.isDesignMode && this.preload && !this._is_preloaded) {
			if (this.url && this.parent) {
				var keys = [];
				keys.push("__preload");
				keys.push(this.url);
				keys.push(this.id);
				keys.push(this.serverdatasetid);
				var svcid = keys.join('_');

				var url = nexacro._getServiceLocation(this.url);

				var loadmanager = this.parent._load_manager;
				if (loadmanager) {
					var data = loadmanager.getPreloadDataObjectModule(this.id);
					if (data) {
						var tritem = new nexacro.RESTAPIItem(url, this.parent, svcid, "", this, "", 0, true);
						tritem._usewaitcursor = false;
						tritem._loadFromDataObject(data, this);
						this._is_preloaded = true;
					}
				}
			}
		}

		this._is_created = true;
	};

	_pDataObject.destroy = function () {
		this.data = null;
		this._context_list = null;
		this._is_created = null;

		this._response = null;
		this._response_headers = null;
		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		this.parent = null;

		nexacro._EventSinkObject.prototype.destroy.call(this);
	};



	_pDataObject.set_data = function (data) {
		try {
			if (data) {
				if (typeof data == "string") {
					this.data = JSON.parse(data);
				}
				else if (typeof data == "object") {
					this.data = data;
				}
			}
			if (!this.data) {
				this.data = undefined;
			}
		}
		catch (err) {
			this.data = undefined;
		}
		finally {
			this.on_apply_data();
		}
	};

	_pDataObject.on_apply_data = function () {
		this._endLoad(0, "SUCCESS", 1);
	};

	_pDataObject.set_url = function (url) {
		if (this.url != url) {
			this.url = url;
			this.on_apply_url();
		}
	};

	_pDataObject.on_apply_url = function () {
	};




	_pDataObject.set_preload = function (v) {
		this.preload = nexacro._toBoolean(v);
	};


	_pDataObject.serializeToString = function (replacer, space) {
		var data = this.data;
		if (data) {
			return JSON.stringify(data, replacer, space);
		}
		return "";
	};

	_pDataObject.load = function (async) {
		var _url = this.url;
		var baseurl;
		async = async === undefined ? true : async;
		if (this._refform) {
			baseurl = this._refform._getRefFormBaseUrl();
		}

		_url = nexacro._getServiceLocation(_url, baseurl);

		if (_url.length && this.parent) {
			var svcid = "";
			var loadmanager = this.parent._load_manager;
			if (loadmanager) {
				var service = nexacro._getServiceObject(this.url, true);
				loadmanager.loadDataObjectModule(_url, svcid, "", this, null, async, undefined, false, service);
			}
		}
		else {
			this._endLoad(-1, "empty url", 1);
		}
	};

	_pDataObject.getObject = function () {
		return this.data;
	};

	_pDataObject.getObjectByPath = function (path) {
		return this._jsonPath(path);
	};


	_pDataObject.request = function (svcid, method, url, jsonparam) {
		var baseurl;
		if (this._refform) {
			baseurl = this._refform._getRefFormBaseUrl();
		}
		var _url = nexacro._getServiceLocation(url, baseurl);
		if (url.length && this.parent) {
			var loadmanager = this.parent._load_manager;
			if (loadmanager) {
				var service = nexacro._getServiceObject(url, true);
				var async = jsonparam && jsonparam.async != undefined ? jsonparam.async : true;
				loadmanager.loadDataObjectModule(_url, svcid, method, this, jsonparam, async, undefined, false, service);
			}
		}
		else {
			this._endLoad(-1, "empty url", 1);
		}
	};

	_pDataObject.getAllResponseHeaders = function () {
		if (this._response_headers) {
			return this._parseResponseHeaders(this._response_headers);
		}
		return undefined;
	};

	_pDataObject.getResponse = function () {
		return this._response;
	};


	_pDataObject.on_fire_onload = function (errcode, errmsg, reason, url) {
		if (errcode >= 0) {
			errcode = 0;
			errmsg = "SUCCESS";
		}

		var event = this.onload;
		if (event && event._has_handlers) {
			var evt = new nexacro.DataObjectLoadEventInfo(this, "onload", url, reason);
			event._fireEvent(this, evt);
		}
	};


	_pDataObject.on_fire_onsuccess = function (response, svcid, url, reason, method, statuscode) {
		var event = this.onsuccess;
		if (event && event._has_handlers) {
			var evt = new nexacro.DataObjectEventInfo(this, "onsuccess", response, svcid, url, reason, method, statuscode);
			event._fireEvent(this, evt);
		}
	};

	_pDataObject.on_fire_onerror = function (errortype, errormsg, errorobj, statuscode, requesturi, locationuri, svcid) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.DataObjectErrorEventInfo(this, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, svcid);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};


	_pDataObject._on_success = function (response, svcid, url, jsonobj, method, statuscode) {
		var pThis = this;
		var ret = this.on_fire_onsuccess(response, svcid, url, 2, method, statuscode);
		if (!pThis.onsuccess || (pThis.onsuccess && !pThis.onsuccess.defaultprevented) && method != "HEAD") {
			this.on_onsuccess_default_action(jsonobj, url);
		}
		return ret;
	};

	_pDataObject.on_onsuccess_default_action = function (jsonobj, url) {
		this._setContents(jsonobj, 2, url);
	};


	_pDataObject._setContents = function (data, reason, url) {
		if (data) {
			if (typeof data == "string") {
				this.data = JSON.parse(data);
			}
			else {
				this.data = data;
			}

			this._endLoad(0, "SUCCESS", reason != undefined ? reason : 1, url ? url : "");
		}
	};

	_pDataObject._parse = function (strobj) {
		return JSON.parse(strobj);
	};

	_pDataObject._jsonPath = function (expr) {
		var jsonobj = this.data;
		if (jsonobj) {
			return nexacro._JSONPath(jsonobj, expr);
		}
		else {
			return null;
		}
	};

	_pDataObject._endLoad = function (errorcode, errormsg, reason, url) {
		this.on_fire_onload(errorcode, errormsg, reason, url);
	};


	_pDataObject.on_preload_dataobject = function (url, errstatus, data, fireerrorcode, returncode, requesturi, locationuri, extramsg) {
		if (errstatus != 0) {
			this._onDataObjectRequestError(this, true, this, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
		}
		else if (data && !this._is_preloaded) {
			var keys = [];
			keys.push("__preload");
			keys.push(this.url);
			keys.push(this.id);
			keys.push(this.serverdatasetid);
			var svcid = keys.join('_');


			var tritem = new nexacro.RESTAPIItem(this.url, this.parent, svcid, "", this, "", 0, true);
			tritem._usewaitcursor = false;
			tritem._loadFromDataObject(data, this);
			this._is_preloaded = true;
		}
	};

	_pDataObject._onDataObjectRequestError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg, svcid, response, response_headers) {
		var ret = false;
		var commerrorobj = nexacro.MakeCommunicationError(this, errortype, url, returncode, requesturi, locationuri, extramsg);
		this._addResponseInfo(response, response_headers);
		if (bfireevent) {
			var environment = nexacro.getEnvironment();
			if (environment) {
				environment.on_fire_onerror(obj, "ObjectError", commerrorobj.message, errorobj, returncode, requesturi, locationuri, svcid);
			}
			ret = this.on_fire_onerror("ObjectError", commerrorobj.message, errorobj, returncode, requesturi, locationuri, svcid);
		}

		return ret;
	};



	_pDataObject._addResponseInfo = function (response, response_headers) {
		this._response = response;
		this._response_headers = response_headers;
	};

	_pDataObject._clearResponseInfo = function () {
		this._response = undefined;
		this._response_headers = undefined;
	};

	_pDataObject._parseResponseHeaders = function (allheaders) {
		var arr = allheaders.trim().replace(/\0[\s\S]*$/g, '').split(/[\r\n]+/);
		var headerMap = {
		};
		for (var i = 0; i < arr.length; i++) {
			var parts = arr[i].split(': ');
			if (parts) {
				var name = parts[0];
				if (name && name.indexOf("HTTP/") > -1) {
					continue;
				}
				var header = parts.shift();
				if (header) {
					headerMap[header] = parts.join(': ');
				}
			}
		}

		return headerMap;
	};

	_pDataObject = null;


	nexacro.RESTAPIItem = function (path, context, svcid, method, outDataobject, argsJSONParam, datatype, async, last_modified, version) {
		nexacro._CommunicationItem.call(this, path, this.type, false, last_modified, version);

		this.context = context;
		this.method = method;
		this.svcid = svcid;
		this.outputdataobj = this._parseDOParam(outDataobject);
		this.JSONParm = argsJSONParam;
		this._parseJSONParam();
		this.datatype = (!datatype ? 0 : datatype);

		this._sendData = this._serializeData();

		this._usewaitcursor = async && nexacro._usewaitcursor;
		this._remain_data = null;

		this._progress_data = null;
		this._is_unknowntype_data = false;
		this._recieved_data = null;
		this._async_progress_timer_id = null;


		if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8) {
			this._check_responseXML = true;
		}
		else {
			this._check_responseXML = false;
		}

		var hascookie = nexacro._hasCookieVariables();
	};
	var _pRESTAPIItem = nexacro._createPrototype(nexacro.TransactionItem, nexacro.RESTAPIItem);
	nexacro.RESTAPIItem.prototype = _pRESTAPIItem;

	_pRESTAPIItem.handle = null;
	_pRESTAPIItem.callbackList = [];
	_pRESTAPIItem.type = "dataobject";
	_pRESTAPIItem.bcache = false;

	_pRESTAPIItem._type_name = "RESTAPIItem";

	_pRESTAPIItem.on_load_dataobject = function (data, cookie, last_modified, response_header, status) {
		var dataobject = this.outputdataobj;
		var errorinfo;
		var bcache = this.bcache;
		var ret = null;
		var jsonobj = null;

		this._addCookieToCookieVariable(cookie);

		if (data && data._type_name == "DataObjectCache") {
			bcache = false;
			ret = data._loadDataObject(this);
			errorinfo = ret[0];
			data = ret[2];
			jsonobj = ret[3];
		}
		else {
			if (dataobject) {
				dataobject._addResponseInfo(data, response_header);
			}

			if (data && this._protocol < 0) {
				data = this.on_decrypt(data);
			}

			ret = this._deserializeData(data);
			if (bcache) {
				dataobject = ret[1];
			}

			errorinfo = ret[0];
			jsonobj = ret[2];
		}

		if (bcache) {
			var d_cache = nexacro._DataObjectCacheList[this.path];
			if (!d_cache) {
				nexacro._DataObjectCacheList[this.path] = new nexacro._DataObjectCache(dataobject, last_modified, this.version, data, response_header);
			}
			else {
				d_cache.dataobject = dataobject;
				d_cache.last_modified = last_modified ? last_modified : "";
				d_cache.version = this.version;
				d_cache.data = data;
			}
		}

		if (this._usewaitcursor) {
			this._hideWaitCursor(this.context);
		}

		nexacro._removeCommContext(this.context);

		var application = nexacro.getApplication();
		if (application) {
			application.on_fire_oncommunication(application, 1);
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			var errorcode = errorinfo ? errorinfo[0] : 0;
			var errormsg = errorinfo ? errorinfo[1] : "SUCCESS";

			var loadmanager = this.context._load_manager;
			var dataitem = loadmanager ? loadmanager.getDataItem(this.svcid) : null;
			if (dataitem) {
				dataitem._is_cancel = undefined;
			}

			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					if (this._is_unknowntype_data) {
						item.callback.call(target, this.svcid, errorcode, errormsg, "comm_fail_loaddetail", 10599, this.path, this.path);
					}
					else {
						item.callback.call(target, this.svcid, errorcode, data);
					}
				}
			}
			callbackList.splice(0, n);
		}

		var method = this.method;
		if (dataobject) {
			if (method) {
				dataobject._on_success(data, this.svcid, this.path, jsonobj, method, status);
			}
			else {
				dataobject._setContents(jsonobj, 0, this.path);
			}

			dataobject._clearResponseInfo();
		}

		this.handle = null;
	};

	_pRESTAPIItem._parseDOParam = function (outdataobj) {
		var obj;
		if (outdataobj) {
			if (typeof outdataobj == "object") {
				obj = outdataobj;
			}
			else if (this.context) {
				obj = this.context[outdataobj];
			}
		}
		return obj;
	};

	_pRESTAPIItem._parseJSONParam = function () {
		var jsonparam = this.JSONParm;
		if (!jsonparam) {
			return;
		}



		if (jsonparam.postdata) {
			this.postdata = jsonparam.postdata;
		}

		if (jsonparam.httpheader) {
			this.header = jsonparam.httpheader;
		}
	};

	_pRESTAPIItem._deserializeData = function (strRecvData) {
		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], [], new nexacro.Collection()];
		}
		if (strRecvData.charAt(0) == " ") {
			strRecvData = strRecvData.trim();
		}

		return this.__deserializeJSON(strRecvData);
	};

	_pRESTAPIItem._loadFromDataObject = function (data, dataobject) {
		var ret = this._deserializeData(data);
		var errorcode = 0;
		var errormsg = "SUCCESS";
		var bcache = this.bcache;
		var last_modified = this.last_modified;

		var errorinfo = ret[0];
		if (errorinfo) {
			errorcode = errorinfo[0];
			errormsg = errorinfo[1];
		}

		if (bcache) {
			dataobject = ret[1];
			var d_cache = nexacro._DataObjectCacheList[this.path];
			if (!d_cache) {
				nexacro._DataObjectCacheList[this.path] = new nexacro._DataObjectCache(dataobject, last_modified, this.version);
			}
			else {
				d_cache.dataobject = dataobject;
				d_cache.last_modified = last_modified ? last_modified : "";
				d_cache.version = this.version;
			}
		}

		var jsonobj = ret[2];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.svcid, errorcode, errormsg);
				}
			}
			callbackList.splice(0, n);
		}

		var method = this.method;
		if (dataobject) {
			if (method) {
				dataobject._on_success(data, this.svcid, this.path, jsonobj, method);
			}
			else {
				dataobject._setContents(jsonobj, 0, this.path);
			}
			dataobject._clearResponseInfo();
		}

		this.handle = null;
	};


	_pRESTAPIItem.__deserializeJSON = function (strRecvData, doc) {
		var code = 0;
		var message = "SUCCESS";
		var dataobbj = this.outputdataobj ? this.outputdataobj : null;
		var json;

		if (strRecvData.length > 0) {
			try {
				json = JSON.parse(strRecvData);
			}
			catch (e) {
				this._is_unknowntype_data = true;
				return [[-1, "invalid nexacro communication format"], dataobbj];
			}
		}
		var errorinfo = [code, message];
		return [errorinfo, dataobbj, json];
	};


	_pRESTAPIItem.on_error = function (errstatus, fireerrorcode, returncode, locationurl, extramsg, response, responseheaders) {
		var dataobj = this.outputdataobj;
		if (this._usewaitcursor) {
			this._hideWaitCursor(this.context);
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		var ret = false;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					ret = item.callback.call(target, this.svcid, -1, "FAILED", fireerrorcode, returncode, this.path, locationurl, extramsg, dataobj, response, responseheaders);
					if (ret) {
						if (this._usewaitcursor) {
							this._showWaitCursor(this.context);
						}
						continue;
					}
				}
			}

			if (ret) {
				return true;
			}
		}

		var loadmanager = this.context._load_manager;
		var dataitem = loadmanager ? loadmanager.getDataItem(this.svcid) : null;


		if (dataitem && !dataitem._is_cancel) {
			return;
		}

		callbackList.splice(0, n);

		nexacro._removeCommContext(this.context);

		var application = nexacro.getApplication();
		if (application) {
			application.on_fire_oncommunication(application, 1);
		}

		this.handle = null;
	};

	_pRESTAPIItem = null;
}
