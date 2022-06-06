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

if (!nexacro.FileUpTransfer) {
	nexacro.FileUpTransferEventInfo = function (obj, id, dsArray, code, message, url, index) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;

		this.datasets = dsArray;
		this.code = code;
		this.message = message;
		this.url = url;
	};

	var _pFileUpTransferEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUpTransferEventInfo);
	nexacro.FileUpTransferEventInfo.prototype = _pFileUpTransferEventInfo;
	_pFileUpTransferEventInfo._type_name = "FileUpTransferEventInfo";

	delete _pFileUpTransferEventInfo;

	nexacro.FileUpTransferErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
	};

	var _pFileUpTransferErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileUpTransferErrorEventInfo);
	nexacro.FileUpTransferErrorEventInfo.prototype = _pFileUpTransferErrorEventInfo;
	_pFileUpTransferErrorEventInfo._type_name = "FileUpTransferErrorEventInfo";

	delete _pFileUpTransferErrorEventInfo;

	nexacro.FileUpTransferProgressEventInfo = function (obj, id, loaded, total, index) {
		this.id = this.eventid = id || "onprogress";
		this.fromobject = this.fromreferenceobject = obj;

		this.loaded = loaded;
		this.total = total;
	};

	var _pFileUpTransferProgressEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileUpTransferProgressEventInfo);
	nexacro.FileUpTransferProgressEventInfo.prototype = _pFileUpTransferProgressEventInfo;
	_pFileUpTransferProgressEventInfo._type_name = "FileUpTransferProgressEventInfo";

	delete _pFileUpTransferProgressEventInfo;

	nexacro.FileUpTransfer = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this.filelist = new nexacro.Collection();
		this.postdatalist = new nexacro.Collection();
	};
	var _pFileUpTransfer = nexacro.FileUpTransfer.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.FileUpTransfer);
	_pFileUpTransfer._type_name = "FileUpTransfer";


	_pFileUpTransfer.url = "";


	_pFileUpTransfer._handle = null;
	_pFileUpTransfer._aborted = false;
	_pFileUpTransfer._user_aborted = false;

	_pFileUpTransfer._TransferType = 
		{
		ALL : 1, 
		PART : 2, 
		PARTALL : 3
	};


	_pFileUpTransfer._event_list = {
		"onsuccess" : 1, 
		"onerror" : 1, 
		"onprogress" : 1
	};

	_pFileUpTransfer.destroy = function () {
		if (this.filelist) {
			this.filelist.destroy();
			this.filelist = null;
		}

		if (this.postdatalist) {
			this.postdatalist.destroy();
			this.postdatalist = null;
		}

		return true;
	};

	_pFileUpTransfer.set_filelist = nexacro._emptyFn;
	_pFileUpTransfer.set_postdatalist = nexacro._emptyFn;
	_pFileUpTransfer.set_url = function (v) {
		if (this.url != v) {
			this.url = v;
		}
	};

	_pFileUpTransfer.setFile = function (nIndex, vFile) {
		if (!vFile || !(vFile instanceof nexacro.VirtualFile)) {
			return false;
		}

		return this.filelist.set_item(nIndex, vFile);
	};

	_pFileUpTransfer.addFile = function (id, vFile) {
		if (id === null || id === undefined || id === "" || this.filelist[id]) {
			return -1;
		}

		if (!vFile || !(vFile instanceof nexacro.VirtualFile)) {
			return -1;
		}

		return this.filelist.add_item(id, vFile);
	};

	_pFileUpTransfer.removeFile = function (id) {
		return this.filelist.delete_item(id);
	};

	_pFileUpTransfer.removeFileByIndex = function (nIndex) {
		nIndex = nIndex | 0;
		if (nIndex < 0 || nIndex >= this.filelist.length) {
			return -1;
		}

		return this.filelist.delete_item(nIndex);
	};

	_pFileUpTransfer.getFileArrayByFileName = function (strFileName) {
		var ret = null;

		for (var i = 0, file, filelist = this.filelist, len = filelist.length; i < len; i++) {
			file = filelist[i];
			if (strFileName == file.filename) {
				if (!ret) {
					ret = [];
				}

				ret.push(file);
			}
		}

		return ret;
	};

	_pFileUpTransfer.getIndexArrayByFileName = function (strFileName) {
		var ret = null;

		for (var i = 0, filelist = this.filelist, len = filelist.length; i < len; i++) {
			if (strFileName == filelist[i].filename) {
				if (!ret) {
					ret = [];
				}

				ret.push(i);
			}
		}

		return ret;
	};

	_pFileUpTransfer.existFile = function (vFile) {
		var ret = false;

		if (!vFile || !(vFile instanceof nexacro.VirtualFile)) {
			return ret;
		}

		for (var i = 0, filelist = this.filelist, len = filelist.length; i < len; i++) {
			if (nexacro._isEqualTransferFile(filelist[i], vFile)) {
				ret = true;
				break;
			}
		}

		return ret;
	};

	_pFileUpTransfer.setPostData = function (strKey, value) {
		if (!strKey) {
			return;
		}

		this.postdatalist.setItem(strKey, value);
	};

	_pFileUpTransfer.removePostData = function (strKey) {
		this.postdatalist.delete_item(strKey);
	};

	_pFileUpTransfer.getPostData = function (strKey) {
		return this.postdatalist.getItem(strKey);
	};

	_pFileUpTransfer.clearFileList = function () {
		this.filelist.clear();
	};

	_pFileUpTransfer.clearPostDataList = function () {
		this.postdatalist.clear();
	};

	_pFileUpTransfer.upload = function (strUrl) {
		this._aborted = false;
		this._user_aborted = false;

		strUrl = strUrl ? nexacro._getServiceLocation(strUrl, null, null, false) : (this.url ? nexacro._getServiceLocation(this.url, null, null, false) : "");
		if (!strUrl) {
			return;
		}

		nexacro._uploadTransfer(this.filelist, this.postdatalist, strUrl, -1, this);
	};

	_pFileUpTransfer.on_load = function (data, url, index) {
		if (data) {
			var info = data[0];
			var datasets = data[1];

			if (info) {
				var errorcode = info["ErrorCode"];
				var errormsg = info["ErrorMsg"];

				if (errorcode < 0) {
					return this.on_fire_onerror("ObjectError", errormsg, this, 9901, url, url, index);
				}
				else {
					return this.on_fire_onsuccess(datasets, errorcode, errormsg, url, index);
				}
			}
		}

		return this.on_fire_onerror("ObjectError", "fail to get", this, 9901, url, url, index);
	};

	_pFileUpTransfer.on_message = function (e) {
		var request_url = e.data[0];
		var request_index = e.data[1];

		var data = e.message;
		if (data) {
			data = nexacro.trimLeft(decodeURIComponent(data.replace(/\+/g, " ")));
			var fstr = data.substring(0, 3).toUpperCase();
			if (fstr == "SSV") {
				data = nexacro._Deserializer["SSV"](data);
			}
			else {
				var xmldoc = nexacro._parseXMLDocument(data);
				if (nexacro._getContentType(xmldoc) == "XML") {
					data = nexacro._Deserializer["XML"](xmldoc);
				}
			}
		}

		this.on_load(data, request_url, request_index);
	};

	_pFileUpTransfer.on_error = function (errorcode, errormsg, httpcode, url, index) {
		this.on_fire_onerror("ObjectError", errormsg, this, httpcode || errorcode, url, url, index);
	};

	_pFileUpTransfer.on_progress = function (loaded, total, index) {
		this.on_fire_onprogress(loaded, total, index);
	};

	_pFileUpTransfer.on_fire_onsuccess = function (datasets, code, msg, url, index) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			var evt = new nexacro.FileUpTransferEventInfo(this, "onsuccess", datasets, code, msg, url, index);
			this.onsuccess._fireEvent(this, evt);
		}
	};

	_pFileUpTransfer.on_fire_onerror = function (errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileUpTransferErrorEventInfo(this, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index);
			this.onerror._fireEvent(this, evt);
		}
	};

	_pFileUpTransfer.on_fire_onprogress = function (loaded, total, index) {
		if (this.onprogress && this.onprogress._has_handlers) {
			var evt = new nexacro.FileUpTransferProgressEventInfo(this, "onprogress", loaded, total, index);
			return this.onprogress._fireEvent(this, evt);
		}
		return true;
	};


	_pFileUpTransfer._getForm = function () {
		if (this.parent instanceof nexacro.Form) {
			return this.parent;
		}
		return null;
	};

	_pFileUpTransfer._getTransferType = function () {
		return this._TransferType[this.type.toUpperCase()] || 0;
	};

	delete _pFileUpTransfer;
}
