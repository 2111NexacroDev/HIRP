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

if (!nexacro.ExcelImportObject) {
	nexacro.ExcelImportEventInfo = function (obj, id, url, refferObj, importid) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = obj;
		this.fromreferenceobject = refferObj;
		this.url = url;
		this.importid = importid;
	};
	var _pExcelImportEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExcelImportEventInfo, nexacro.ExcelImportEventInfo);
	nexacro.ExcelImportEventInfo.prototype = _pExcelImportEventInfo;
	_pExcelImportEventInfo._type_name = "ExcelImportEventInfo";

	delete _pExcelImportEventInfo;


	nexacro.ExcelImportErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;
		this.errortype = errortype;
		this.errormsg = errormsg;
		this.statuscode = statuscode;
	};
	var _pExcelImportErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.ExcelImportErrorEventInfo);
	nexacro.ExcelImportErrorEventInfo.prototype = _pExcelImportErrorEventInfo;
	_pExcelImportErrorEventInfo._type_name = "ExcelImportErrorEventInfo";

	delete _pExcelImportErrorEventInfo;

	nexacro.ImportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500, 
		TXT : 0x0510
	};


	nexacro.ExcelImportObject = function (name, parent) {
		this.id = this.name = name;

		if (!parent) {
			var app = nexacro.getApplication();
			if (app) {
				parent = app.getActiveForm();
				if (!parent) {
					parent = app.mainframe.childframe.form;
				}
			}
		}
		this.parent = parent;

		var unique_id = this._unique_id = this.parent._unique_id + "_" + this.id;

		if (nexacro._get_hidden_frame(unique_id, this._hidden_frame_handle)) {
			nexacro._destroy_hidden_frame(unique_id, this._hidden_frame_handle);
		}

		nexacro._create_hidden_frame(unique_id, this._uploadComplete, this, "import");
		nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
		nexacro._append_hidden_textitem(unique_id, "ds_command");

		this.onerror = new nexacro.EventListener("onerror");
		this.onsuccess = new nexacro.EventListener("onsuccess");
	};

	var _pExcelImport = nexacro.ExcelImportObject.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExcelImportObject);
	_pExcelImport._type_name = "ExcelImportObject";

	_pExcelImport._hidden_frame_handle = null;

	_pExcelImport.importfilemode = "local";
	_pExcelImport._importfilemode = 0;
	_pExcelImport.commcompress = "none";
	_pExcelImport._commcompress = false;
	_pExcelImport.importtype = nexacro.ImportTypes.EXCEL;
	_pExcelImport.importurl = "";
	_pExcelImport._importurl = "";
	_pExcelImport._uploadurl = "";
	_pExcelImport._uploadservlet = "";
	_pExcelImport.separator = "";
	_pExcelImport.quotechar = "default";
	_pExcelImport._defaultseparator = "0x2c";

	_pExcelImport._fileurl = "";
	_pExcelImport._range = "";
	_pExcelImport._applyAllsheet = false;

	_pExcelImport._responseData = "";
	_pExcelImport._responseRVal = null;
	_pExcelImport._responseLVal = null;
	_pExcelImport.userawdatevalue = false;
	_pExcelImport._userawdatevalue = false;
	_pExcelImport.userawnumbervalue = true;
	_pExcelImport._userawnumbervalue = true;
	_pExcelImport._user_data = null;
	_pExcelImport._file_password = null;
	_pExcelImport._usehtmltag = true;

	_pExcelImport._importSheet = "";
	_pExcelImport._importStartCell = null;
	_pExcelImport._importEndCell = null;

	_pExcelImport._tran_item = null;
	_pExcelImport._file_url_ds = null;
	_pExcelImport._iscors = false;
	_pExcelImport._importid = "";
	_pExcelImport._importid_list = [];

	_pExcelImport.filefilter = "";
	_pExcelImport.filefilterindex = 0;


	_pExcelImport._event_list = 
		{
		"onerror" : 1, 
		"onsuccess" : 1
	};



	_pExcelImport.set_importtype = function (v) {
		switch ((v + "").toUpperCase()) {
			case "EXCEL":
				v = 0x0100;
				break;
			case "EXCEL97":
				v = 0x0110;
				break;
			case "EXCEL2007":
				v = 0x0120;
				break;
			case "HANCELL2010":
				v = 0x0400;
				break;
			case "HANCELL2014":
				v = 0x0410;
				break;
			case "CSV":
				v = 0x0500;
				break;
			case "TXT":
				v = 0x0510;
				break;
		}
		if (v != this.importtype) {
			this.importtype = v;
		}
		return v;
	};

	_pExcelImport.set_separator = function (v) {
		var checkinvalid = false;
		if (v.length == 4) {
			if ((v.substr(0, 2) == "0x") || (v.substr(0, 2) == "0X")) {
				v = parseInt(v, 16);
			}
			else {
				checkinvalid = true;
			}
		}

		v = parseInt(v);
		var pattern16 = /^(0|3|10|13|29|34|39|40|41|58|61)$/g;
		if (checkinvalid || pattern16.test(v) || v >= 0x80 || v <= 0x00) {
			this.separator = v = this._defaultseparator;
		}

		if (v != this.separator && nexacro._isInt(v)) {
			this.separator = v.toString(16);
		}

		return v;
	};

	_pExcelImport.set_quotechar = function (v) {
		var quotechar_enum = ['"', "'", "none", "default"];
		if (quotechar_enum.indexOf(v) == -1) {
			this.quotechar = v = "default";
		}

		if (v != this.quotechar) {
			this.quotechar = v;
		}
		return v;
	};

	_pExcelImport.set_importurl = function (v) {
		if (v != this.importurl) {
			this.importurl = v;
			if (v == null) {
				this._importurl = "";
			}
			else {
				var uploadservlet = this._uploadservlet = nexacro._getServiceLocation(v, this.parent._getFormBaseUrl());
				var baseurl = uploadservlet.substring(0, uploadservlet.lastIndexOf("/") + 1);
				this._importurl = baseurl + "XExportImport";
			}
		}
		return v;
	};

	_pExcelImport.set_commcompress = function (v) {
		if (v != this.commcompress) {
			this.commcompress = v;

			v = v.toString().toUpperCase();
			if (v == "COMPRESS") {
				this._commcompress = true;
			}
			else {
				this._commcompress = false;
			}
		}
		return v;
	};

	_pExcelImport.set_importfilemode = function (v) {
		if (this.importfilemode != v) {
			this.importfilemode = v;
			this._importfilemode = v == "server" ? 1 : 0;
		}
		return v;
	};

	_pExcelImport.set_userawdatevalue = function (v) {
		if (this.userawdatevalue != v) {
			this.userawdatevalue = v;
			this._userawdatevalue = nexacro._toBoolean(v);
		}
		return v;
	};

	_pExcelImport.set_userawnumbervalue = function (v) {
		if (this.userawnumbervalue != v) {
			this.userawnumbervalue = v;
			this._userawnumbervalue = nexacro._toBoolean(v);
		}
		return v;
	};

	_pExcelImport.set_filefilter = function (v) {
		this.filefilter = v;
	};

	_pExcelImport.set_filefilterindex = function (v) {
		this.filefilterindex = v;
	};
	_pExcelImport._setImportRange = function (range) {
		var obj = {
		};
		if (range) {
			if (range.indexOf("!") >= 0) {
				var rg = range.split("!");
				obj.sheet = rg[0];
				var cells = rg[1];
				var temp;
				if (cells.indexOf(":") >= 0) {
					cells = cells.split(":");
					temp = this._getExcelRowCol(cells[0]);
					obj.startRow = temp[1] ? temp[1] : "";
					obj.startCol = temp[0] ? temp[0] : "";
					temp = this._getExcelRowCol(cells[1]);
					obj.endRow = temp[1] ? temp[1] : "";
					obj.endCol = temp[0] ? temp[0] : "";
				}
				else {
					temp = this._getExcelRowCol(cells);
					obj.startRow = temp[1] ? temp[1] : "";
					obj.startCol = temp[0] ? temp[0] : "";
					obj.endRow = "";
					obj.endCol = "";
				}
			}
		}
		else {
			obj.sheet = "";
			obj.startRow = "";
			obj.startCol = "";
			obj.endRow = "";
			obj.endCol = "";
		}
		this._range.push(obj);
	};

	_pExcelImport.importData = function (fileurl, range, responseData, userData) {
		this._file_password = null;
		this._fileurl = "";

		if (arguments.length < 3) {
			return false;
		}

		if (!this.importurl) {
			return false;
		}

		var mode = this.importfilemode.toLowerCase();
		if (mode != "server" || !fileurl) {
			this._importfilemode = 0;
		}
		else {
			this._importfilemode = 1;
		}


		if (range) {
			this._range = range;
		}
		else {
			this._range = "";
		}
		var i, r_len, u_len;
		if (responseData) {
			this._responseLVal = [];
			this._responseRVal = [];
			var temp_response = "";

			var responseDatas = responseData.split(",");
			if (responseDatas.length <= 1 && responseDatas[0]) {
				responseDatas = responseDatas[0].split(" ");
			}

			for (i = 0, r_len = responseDatas.length; i < r_len; i++) {
				if (responseDatas[i].length) {
					var responArr = responseDatas[i].match(/[_A-Za-z0-9]+/g);
					this._responseLVal.push(responArr[0]);
					if (responArr[1] == null) {
						responArr[1] = "output" + (i + 1);
					}
					this._responseRVal.push(responArr[1]);
					temp_response += " " + responArr[0] + "=" + responArr[1];
				}
			}
			this._responseData = temp_response;
		}

		if (userData) {
			var userDatas = nexacro.replaceAll(userData, " ", "").split(",");
			for (i = 0, u_len = userDatas.length; i < u_len; i++) {
				var dataArr = userDatas[i].split("=");
				if (dataArr[0] == "filepassword") {
					this._file_password = dataArr[1];
					userDatas.splice(i, 1);
					userData = userDatas.join(",");
					break;
				}
			}
		}
		this._user_data = userData;

		if (!this._importfilemode) {
			nexacro._change_inputnode_name(this._input_node, "upfile");
			nexacro._findclick(this._unique_id, "upfile", this, this._hidden_frame_handle, this.filefilter, this.filefilterindex);
		}
		else {
			nexacro._change_inputnode_name(this._input_node, "");
			if (this._checkFileName(fileurl)) {
				this._fileurl = fileurl;
				this._requestImport(fileurl);
			}
			else {
				var errormsg = "the file extension is wrong";
				var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
				this.on_fire_onerror(this, evt);
				return false;
			}
		}

		return true;
	};

	_pExcelImport.importDataEx = function (importid, fileurl, range, responseData, userData) {
		this._importid = importid;
		this.importData(fileurl, range, responseData, userData);
	};

	_pExcelImport._addImportId = function (v) {
		var list = this._importid_list;
		var cnt = list ? list.length : 0;
		var id;
		for (var i = 0; i < cnt; i++) {
			id = list[i];
			if (id == v) {
				return false;
			}
		}

		list.push(v);

		return true;
	};

	_pExcelImport._removeImportId = function (v) {
		var list = this._importid_list;
		var cnt = list ? list.length : 0;
		var id;
		for (var i = 0; i < cnt; i++) {
			id = list[i];
			if (id == v) {
				return list.splice(i, 1);
			}
		}

		return null;
	};

	_pExcelImport.destroy = function () {
		var unique_id = this._unique_id;
		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		if (this._hidden_frame_handle) {
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._remove_hidden_item(unique_id, "ds_command", this._hidden_frame_handle);
			nexacro._destroy_hidden_frame(unique_id, this, "import");
		}

		this._hidden_frame_handle = null;
		this.parent = null;

		return true;
	};

	_pExcelImport.on_fire_onerror = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onerror;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};

	_pExcelImport.on_fire_onsuccess = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onsuccess;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};


	_pExcelImport._getExcelRowCol = function (cell) {
		var strLen = cell.length;
		var arr = [];
		for (var i = 0; i < strLen; i++) {
			if (!isNaN(cell[i])) {
				arr.push(cell.substring(0, i));
				arr.push(cell.substring(i));
				break;
			}
		}
		return arr;
	};

	_pExcelImport._transaction = function (id, url, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress) {
		this._load_manager = new nexacro._LoadManager(this);
		var service = nexacro._getServiceObject(url, true);
		this._load_manager.loadDataModule(url, id, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress, service);
	};

	_pExcelImport._getDataset = function (ds_id) {
		var r_val = this._responseRVal;
		var l_val = this._responseLVal;
		var len = r_val.length;

		for (var i = 0; i < len; i++) {
			if (r_val[i] == ds_id) {
				return this._getDatasetObject(l_val[i]);
			}
			else if (ds_id == "IMPORTFILES") {
				return this._getDatasetObject("_file_url_ds");
			}
		}
		return null;
	};

	_pExcelImport._waitCursor = nexacro._emptyFn;
	_pExcelImport._setParamter = nexacro._emptyFn;
	_pExcelImport._getDatasetObject = function (queryid) {
		var _ds = this[queryid];
		var app = nexacro.getApplication();
		if (_ds == null && this.parent && this.parent != app) {
			_ds = this.parent._getDatasetObject(queryid);
		}

		if (_ds == null) {
			_ds = app[queryid];
		}

		return _ds;
	};

	_pExcelImport._getForm = function () {
		var app = nexacro.getApplication();
		var form;
		if (app) {
			form = app.getActiveForm();
			if (!form) {
				var mainframe = app.getActiveFrame();
				var pThis = this;
				while (pThis && mainframe != pThis) {
					if (!pThis._is_frame) {
						pThis = pThis.parent;
					}
					else if (pThis.form) {
						return pThis.form;
					}
				}
			}
		}
		return form;
	};

	_pExcelImport._isPopupFrame = function () {
		return false;
	};


	_pExcelImport._makeImportFormat = function () {
		var str = "<Import>";
		str += "<Sheets>";

		var sheets = this._range.split("]");
		var s_len = sheets.length - 1;
		s_len = s_len == 0 ? 1 : s_len;
		var properties, property;
		var output_num = 1;

		for (var i = 0; i < s_len; i++) {
			str += "<Sheet ";

			properties = sheets[i].match(/[_A-Za-z0-9]+=[\(\)_!:A-Za-z0-9가-힣 \.\-\,]+/g);
			if (properties == null) {
				var range = sheets[i];
				if (range.indexOf("!") >= 0) {
					var range_arr = range.split("!");
					if (range_arr[1].indexOf(":") >= 0) {
						var sheet = range_arr[0];
						var rangeitem = range_arr[1].split(":");
						var start_row = rangeitem[0].match(/[0-9]+/);
						var start_col = rangeitem[0].match(/[A-Z]+/);

						var end_row = rangeitem[1].match(/[0-9]+/);
						var end_col = rangeitem[1].match(/[A-Z]+/);

						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" head=\"' + sheet + '!' + start_col + start_row + ':' + end_col + start_row + '\" body=\"' + sheet + '!' + start_col + (+start_row + 1) + ':' + end_col + end_row + '\" />';
					}
					else {
						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
					}
				}
				else {
					str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
				}
			}
			else {
				var flag = false;
				for (var j = 0, p_len = properties.length; j < p_len; j++) {
					property = properties[j].match(/[\(\)_!:A-Za-z0-9가-힣 \.\-\,]+/g);

					var property_name = property[0].toLowerCase();
					if (property_name != "command") {
						if (j == 0) {
							str += 'command=\"getsheetdata\" ';
						}
						if (property_name == "output") {
							flag = true;
						}
					}
					str += property_name + "=\"" + property[1] + "\" ";
				}
				if (!flag) {
					str += 'output=\"output' + output_num + '\" ';
					output_num++;
				}
				str += "/>";
			}
		}

		str += "</Sheets>";
		str += "</Import>";

		return str;
	};

	_pExcelImport._requestImport = function (fileUrl) {
		if (nexacro._Browser != "Runtime") {
			if (!nexacro._isSameOrigin(this._importurl, nexacro._project_url)) {
				this._iscors = true;
			}
		}

		var ds_command = this._ds_command = new nexacro.NormalDataset("COMMAND");

		ds_command.addColumn("command", "String", 32);
		ds_command.addColumn("type", "int", 32);
		ds_command.addColumn("url", "String", 256);
		ds_command.addColumn("format", "String", 256);
		ds_command.addColumn("filemode", "String", 256);
		ds_command.addColumn("password", "String", 256);
		ds_command.addColumn("rawdatevalue", "String", 256);
		ds_command.addColumn("rawnumbervalue", "String", 256);
		ds_command.addColumn("importid", "String", 256);
		ds_command.addColumn("usehtmltag", "String", 256);
		ds_command.addColumn("separator", "String", 256);
		ds_command.addColumn("quotechar", "String", 256);

		ds_command.addRow();

		ds_command.setColumn(0, "command", "import");
		ds_command.setColumn(0, "type", this._importType);
		ds_command.setColumn(0, "url", fileUrl);
		ds_command.setColumn(0, "format", this._makeImportFormat());
		ds_command.setColumn(0, "filemode", this._importfilemode ? "server" : "local");
		ds_command.setColumn(0, "password", this._file_password);
		ds_command.setColumn(0, "rawdatevalue", this._userawdatevalue);
		ds_command.setColumn(0, "rawnumbervalue", this._userawnumbervalue);
		ds_command.setColumn(0, "importid", this._importid);
		ds_command.setColumn(0, "usehtmltag", this._usehtmltag);
		ds_command.setColumn(0, "separator", this.separator ? this.separator : this._defaultseparator);
		ds_command.setColumn(0, "quotechar", this.quotechar);

		if (this._iscors) {
			ds_command.addColumn("responsetype", "String", 256);
			ds_command.setColumn(0, "responsetype", 1);
		}

		if (this._ds_response) {
			delete this._ds_response;
		}

		var evt;
		var datasets = this._responseLVal;
		if (datasets) {
			for (var i = 0, d_len = datasets.length; i < d_len; i++) {
				var reponseDS = this.parent[datasets[i]];
				if (reponseDS) {
				}
				else {
					evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "Dataset is null", this, -2011);
					this.on_fire_onerror(this, evt);
					return;
				}
			}
		}
		else {
			evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "Dataset is null", this, -2011);
			this.on_fire_onerror(this, evt);
			return;
		}

		this._file_url_ds = new nexacro.NormalDataset("_file_url_ds", this);
		this._tran_item = new nexacro.TransactionItem(this._importurl, this, this.id, "COMMAND=_ds_command", this._responseData + ", _file_url_ds=IMPORTFILES", this._user_data, 0, true);

		nexacro._setImportCommand(this._unique_id, "ds_command", this, this._hidden_frame_handle, this._tran_item._sendData);
		nexacro._submit(this._unique_id, this._uploadservlet, this._hidden_frame_handle, this._tran_item._sendData, fileUrl);
	};

	if (nexacro._Browser == "Runtime") {
		_pExcelImport._uploadComplete = function (status, data, url, errcode, httpcode, locationurl, extramsg) {
			var application = nexacro.getApplication();
			if (application) {
				application._endCommProgress();
			}

			var evt, error_info, fileUrl, unique_id = this._unique_id, code = -1, msg = "", result = null, importid, statuscode = 9901;
			if (status < 0) {
				nexacro._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null, extramsg);

				var commerrorobj = nexacro.MakeCommunicationError(this, errcode, url, httpcode, url, null, extramsg);
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", commerrorobj.message, this, statuscode);
				this.on_fire_onerror(this, evt);
			}
			else {
				if (data) {
					if (data.indexOf("<noscript>") >= 0) {
						data = data.substr(data.indexOf("<noscript>") + 10);
						data = data.substr(0, data.indexOf("</noscript>"));
					}

					this.context = this.parent;

					var fstr = data.slice(0, 10).toUpperCase();
					if (fstr.indexOf("SSV") == 0) {
						result = nexacro._Deserializer["SSV"](data, this);
					}
					else if (fstr.indexOf("<?XML") == 0) {
						var xmldoc = nexacro._getXMLDocument(this._unique_id, data, url);
						result = nexacro._Deserializer["XML"](xmldoc, this);
					}

					error_info = result ? result[0] : null;
					if (error_info) {
						code = error_info["ErrorCode"];
						msg = error_info["ErrorMsg"];
					}
				}

				if (code < 0) {
					if (code <= -2001 && code >= -2020) {
						statuscode = code;
					}
					if (status != 4) {
						evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, statuscode);
						this.on_fire_onerror(this, evt);
					}
				}
				else {
					fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
					importid = this._file_url_ds ? this._file_url_ds.getColumn(0, "importid") : null;

					this._file_url_ds = null;
					evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this, importid);
					this.on_fire_onsuccess(this, evt);

					this._removeImportId(importid);
				}
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
		};
	}
	else {
		_pExcelImport._uploadComplete = function (status, data, url) {
			var code = -1;
			var msg = "";
			var unique_id = this._unique_id;
			var evt, result, importid, statuscode = 9901;
			try {
				if (this._iscors) {
					nexacro._setPostMessage(this._unique_id, this);
					this._iscors = false;
				}
				else {
					var xmldoc = nexacro._getXMLDocument(unique_id);
					url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
					if (url == "about:blank") {
						return;
					}

					data = nexacro._getDataFromDOM(xmldoc);
					if (!data || data.length <= 0) {
						var node = xmldoc.childNodes[0];
						if (node) {
							if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
								data = node.innerHTML;
							}
							else {
								data = xmldoc.head.innerHTML;
							}

							data = nexacro._decodeXml(data);
						}
					}

					if (data.indexOf("<noscript>") >= 0) {
						data = data.substr(data.indexOf("<noscript>") + 10);
						data = data.substr(0, data.indexOf("</noscript>"));
					}

					this.context = this.parent;

					var fstr = data.substring(0, 3).toUpperCase();
					switch (fstr) {
						case "XML":
							xmldoc = nexacro._getXMLDocument(unique_id, data, url);
							result = nexacro._Deserializer["XML"](xmldoc, this);
							break;
						case "SSV":
							result = nexacro._Deserializer["SSV"](data, this);
							break;
						default:
							break;
					}

					if (result) {
						code = result[0]["ErrorCode"];
						msg = result[0]["ErrorMsg"];
					}

					if (code < 0) {
						if (code <= -2001 && code >= -2020) {
							statuscode = code;
						}
						evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, statuscode);
						this.on_fire_onerror(this, evt);
					}
					else {
						this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
						importid = this._file_url_ds ? this._file_url_ds.getColumn(0, "importid") : null;

						this._file_url_ds = null;
						evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", this._fileurl, this, importid);
						this.on_fire_onsuccess(this, evt);

						this._removeImportId(importid);
					}
				}
			}
			catch (e) {
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "failed to get", this, statuscode);
				this.on_fire_onerror(this, evt);
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
		};
	}


	_pExcelImport.on_after_load = function (messageObj) {
		var str = messageObj.message;
		var result, evt, fstr, url, code = -1, msg = "", data = "";
		var fileUrl, importid, statuscode = 9901;
		try {
			var type = str.slice(0, 10).toUpperCase();
			if (type.indexOf("SSV" >= 0)) {
				result = nexacro._Deserializer["SSV"](str, this);
			}
			else {
				str = decodeURIComponent(str.replace(/\+/g, " "));
				var xmldoc = nexacro._parseXMLDocument(str);
				url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
				if (url == "about:blank") {
					return;
				}

				if (nexacro._getContentType(xmldoc) == "XML") {
					result = nexacro._Deserializer["XML"](xmldoc, this);
				}
				else {
					data = nexacro._getDataFromDOM(xmldoc, this);
					data = nexacro.trimLeft(data);
					fstr = data.substring(0, 3).toUpperCase();

					if (fstr == "SSV") {
						result = nexacro._Deserializer["SSV"](data, this);
					}
				}
			}

			if (result) {
				var error_info = result[0];
				if (error_info["ErrorCode"] != null) {
					code = error_info["ErrorCode"];
				}
				if (error_info["ErrorMsg"] != null) {
					msg = error_info["ErrorMsg"];
				}
			}
			else {
				msg = data;
			}

			if (code < 0) {
				if (code <= -2001 && code >= -2020) {
					statuscode = code;
				}
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, statuscode);
				this.on_fire_onerror(this, evt);
			}
			else {
				fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
				importid = this._file_url_ds ? this._file_url_ds.getColumn(0, "importid") : null;

				this._file_url_ds = null;
				evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this, importid);
				this.on_fire_onsuccess(this, evt);

				this._removeImportId(importid);
			}
		}
		catch (e) {
			evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "failed to get", this, statuscode);
			this.on_fire_onerror(this, evt);
		}
	};

	_pExcelImport._checkFileName = function (str) {
		if (str == null) {
			return false;
		}
		var checkExcel = false;
		var extension = "";
		var index = str.lastIndexOf("\\");
		var filename = str.substring(index + 1);
		var _split = filename.split(".");
		var len = _split.length;
		if (len > 1) {
			extension = _split[len - 1];
			extension = extension.toLowerCase();
			switch (extension) {
				case "xls":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL97;
					break;
				case "xlsx":
				case "xlsm":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL2007;
					break;
				case "cell":
					checkExcel = true;
					this._importType = this.importtype;
					break;
				case "csv":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.CSV;
					break;
				case "txt":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.TXT;
					break;
			}
		}
		return checkExcel;
	};

	_pExcelImport._checkUploadFile = function (excel) {
		this._setWaitCursor(true);
		if (this._checkFileName(excel)) {
			this._requestImport(excel);
		}
		else {
			var errormsg = "the file extension is wrong";
			var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
			this.on_fire_onerror(this, evt);
		}
	};

	_pExcelImport._setWaitCursor = function (wait_flag) {
		var form = this._getForm();
		if (form) {
			form.setWaitCursor(wait_flag, true);
		}
	};

	_pExcelImport._getWindow = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindow();
		}
		return null;
	};

	_pExcelImport._getWindowHandle = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindowHandle();
		}
		return null;
	};

	_pExcelImport._changeFiles = nexacro._emptyFn;

	delete _pExcelImport;
}
