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

if (!nexacro.FileDownTransfer) {
	nexacro.FileDownTransferEventInfo = function (obj, id, url, fullpath) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;

		this.url = url;
		this.targetfullpath = fullpath;
	};

	var _pFileDownTransferEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileDownTransferEventInfo);
	nexacro.FileDownTransferEventInfo.prototype = _pFileDownTransferEventInfo;
	_pFileDownTransferEventInfo._type_name = "FileDownTransferEventInfo";

	delete _pFileDownTransferEventInfo;

	nexacro.FileDownTransferErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
	};

	var _pFileDownTransferErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileDownTransferErrorEventInfo);
	nexacro.FileDownTransferErrorEventInfo.prototype = _pFileDownTransferErrorEventInfo;
	_pFileDownTransferErrorEventInfo._type_name = "FileDownTransferErrorEventInfo";

	delete _pFileDownTransferErrorEventInfo;

	nexacro.FileDownTransfer = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this.postdatalist = new nexacro.Collection();
	};
	var _pFileDownTransfer = nexacro.FileDownTransfer.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.FileDownTransfer);
	_pFileDownTransfer._type_name = "FileDownTransfer";


	_pFileDownTransfer.url = "";
	_pFileDownTransfer.downloadfilename = "";




	_pFileDownTransfer._event_list = {
		"onsuccess" : 1, 
		"onerror" : 1
	};

	_pFileDownTransfer.destroy = function () {
		this.postdatalist = null;

		return true;
	};

	_pFileDownTransfer.set_postdatalist = nexacro._emptyFn;
	_pFileDownTransfer.set_url = function (v) {
		if (this.url != v) {
			this.url = v;
		}
	};
	_pFileDownTransfer.set_downloadfilename = function (v) {
		if (this.downloadfilename != v) {
			this.downloadfilename = v;
		}
	};
	_pFileDownTransfer.setPostData = function (strKey, value) {
		if (!strKey) {
			return;
		}

		this.postdatalist.setItem(strKey, value);
	};

	_pFileDownTransfer.removePostData = function (strKey) {
		this.postdatalist.delete_item(strKey);
	};

	_pFileDownTransfer.getPostData = function (strKey) {
		return this.postdatalist.getItem(strKey);
	};

	_pFileDownTransfer.clearPostDataList = function () {
		this.postdatalist.clear();
	};

	_pFileDownTransfer.download = function (strUrl, strTargetPath) {
		strUrl = strUrl ? nexacro._getImageLocation(strUrl) : (this.url ? nexacro._getServiceLocation(this.url, null, null, false) : "");
		strTargetPath = nexacro._toString(strTargetPath);

		if (!strUrl) {
			return;
		}

		var postdatalist = {
		};
		for (var i = 0, len = this.postdatalist.length; i < len; i++) {
			postdatalist[this.postdatalist._idArray[i]] = this.postdatalist[i];
		}

		nexacro._downloadTransfer(postdatalist, strUrl, strTargetPath, this);
	};

	_pFileDownTransfer.on_load = function (status, data, url, errcode, httpcode, errmsg, extramsg) {
		if (data) {
			if (!nexacro._isArray(data)) {
				if (status < 0) {
					return this.on_fire_onerror("ObjectError", errmsg, this, httpcode, url, url);
				}
				else {
					return this.on_fire_onsuccess(url, data);
				}
			}
			else {
			}
		}

		return this.on_fire_onerror("ObjectError", "fail to get", this, 9901, url, url);
	};

	_pFileDownTransfer.on_error = function (url, errorcode, httpcode, errormsg) {
		this.on_fire_onerror("ObjectError", errormsg, this, httpcode, url, url);
	};

	_pFileDownTransfer.on_fire_onsuccess = function (url, fullpath) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			var evt = new nexacro.FileDownTransferEventInfo(this, "onsuccess", url, fullpath);
			this.onsuccess._fireEvent(this, evt);
		}
	};

	_pFileDownTransfer.on_fire_onerror = function (errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileDownTransferErrorEventInfo(this, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};


	_pFileDownTransfer._getForm = function () {
		if (this.parent instanceof nexacro.Form) {
			return this.parent;
		}
		return null;
	};

	delete _pFileDownTransfer;
}
