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

if (!nexacro.DeviceI) {
	nexacro.DeviceI = function () {
		this.setup();
	};

	var _pDeviceI = nexacro.DeviceI.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.DeviceI);
	_pDeviceI._type_name = "Device";

	_pDeviceI.libraryversion = {
	};

	_pDeviceI.setup = function () {
	};

	_pDeviceI.execiOS = function () {
	};

	_pDeviceI.keyEvent = function (keytype) {
		var _keyKind = 1;

		var MENUKEY = 82;
		var BACKKEY = 4;

		if (keytype == MENUKEY) {
			_keyKind = 1;
		}
		else if (keytype == BACKKEY) {
			_keyKind = 2;
		}

		var app = nexacro.getApplication();
		var active_form = app.getActiveForm();
		if (!active_form) {
			return;
		}

		var focusedComp = active_form.getFocus();
		if (focusedComp) {
			return focusedComp._on_devicebuttonup(_keyKind);
		}
	};

	_pDeviceI.uniqueID = 0;

	_pDeviceI.makeID = function () {
		this.uniqueID++;

		var strMakeID = this.uniqueID.toString()
			 + Math.floor((nexacro._random() *  (1000 - 100 + 1)) + 100).toString();
		return parseInt(strMakeID);
	};

	_pDeviceI.runCallback = function (sid, sfunc, params) {
		var obj;

		if (nexacro.Device.curDevice == 0 || nexacro.Device.curDevice == DeviceType.MACOS) {
			obj = nexacro._executeGlobalEvalStr("(" + params + ")");
		}
		else {
			obj = params;
		}

		var willrunfunc = this._userCreatedObj[sid];

		if ((willrunfunc != undefined) && (typeof willrunfunc[sfunc] == "function")) {
			return willrunfunc[sfunc](obj);
		}
	};

	_pDeviceI.print = function (strPrint) {
		var element = document.getElementById('DeviceAPI_status');
		element.innerHTML = element.innerHTML + strPrint + '<br />';
	};

	_pDeviceI.publicNumCheck = function (v) {
		var strlength;
		try {
			strlength = v.toString().split(" ").join("");
		}
		catch (e) {
			return false;
		}

		if (strlength.length == 0) {
			return false;
		}

		var numberss;
		try {
			numberss = Number(v.toString());
		}
		catch (e) {
			return false;
		}

		var num = +numberss;
		if (num != num) {
			return false;
		}

		return true;
	};


	_pDeviceI.pramck_makeCall = function (strPhoneNumber, bAutoDialing) {
		if (strPhoneNumber == null || typeof (strPhoneNumber) == "undefined") {
			return false;
		}
		else {
			strPhoneNumber = strPhoneNumber.toString();
		}

		var number = "";
		try {
			number = strPhoneNumber.split("+").join("");
			number = number.split("-").join("");
		}
		catch (e) {
			return false;
		}

		var normalize = /[^0-9+-]/gi;
		if (normalize.test(strPhoneNumber) == true) {
			normalize.lastIndex = 0;
			return false;
		}

		if (typeof (bAutoDialing) != "boolean") {
			return false;
		}
		return true;
	};

	_pDeviceI.paramck_play = function (strFilePath) {
		if (strFilePath == null || typeof (strFilePath) != "string") {
			return false;
		}
		var strlength = strFilePath.split(" ").join("");
		if (strlength.length == 0) {
			return false;
		}
		return true;
	};



	_pDeviceI.pramck_contactString = function (strProperty) {
		if (strProperty == null || typeof (strProperty) != "string") {
			return false;
		}
		return true;
	};



	_pDeviceI.isConvertDateToString = function (dateString) {
		var dateStringSplit;
		var date = new Date();

		try {
			dateStringSplit = dateString.split('/');

			date.setYear(parseInt(dateStringSplit[0]) | 0);
			date.setMonth(parseInt(dateStringSplit[1]) | 0 - 1);
			date.setDate(parseInt(dateStringSplit[2]) | 0);
		}
		catch (e) {
			return date;
		}
		return date;
	};

	_pDeviceI.parseDateToInt = function (strDate) {
		if (strDate < 10) {
			strDate = "0" + strDate;
		}
		return strDate;
	};


	_pDeviceI.encodeString = function (source) {
		if (source === undefined || source === null) {
			return "";
		}
		if (typeof (source) != 'string') {
			return source;
		}
		var value = source;
		value = value.replace(/\&/g, "&amp;");
		value = value.replace(/\</g, "&lt;");
		value = value.replace(/\>/g, "&gt;");
		value = value.replace(/\"/g, "&quot;");
		value = value.replace(/\'/g, "&apos;");
		value = value.replace(/\ /g, "&#32;");
		value = value.replace(/\r/g, "&#13;");
		value = value.replace(/\n/g, "&#10;");
		value = value.replace(/\t/g, "&#9;");
		value = value.replace(/\\/g, "&#92;");
		value = value.replace(/\x1d/g, "&#029;");
		value = value.replace(/\x1e/g, "&#30;");
		value = value.replace(/\x1f/g, "&#31;");
		value = value.replace(/\x03/g, "&#3;");
		return value;
	};

	_pDeviceI.decodeString = function (source) {
		if (source === undefined || source === null) {
			return "";
		}
		if (typeof (source) != 'string') {
			return source;
		}
		var value = source;
		value = value.replace(/\&lt\;/g, "<");
		value = value.replace(/\&gt\;/g, ">");
		value = value.replace(/\&quot\;/g, "\"");
		value = value.replace(/\&apos\;/g, "'");
		value = value.replace(/\&\#32\;/g, " ");
		value = value.replace(/\&\#13\;/g, "\r");
		value = value.replace(/\&\#10\;/g, "\n");
		value = value.replace(/\&\#9\;/g, "\t");
		value = value.replace(/\&\#92\;/g, "\\");
		value = value.replace(/\&\#29\;/g, String.fromCharCode(29));
		value = value.replace(/\&\#30\;/g, String.fromCharCode(30));
		value = value.replace(/\&\#31\;/g, String.fromCharCode(31));
		value = value.replace(/\&\#3\;/g, String.fromCharCode(3));
		value = value.replace(/\&amp\;/g, "&");
		return value;
	};



	_pDeviceI.DatasetToJSONString = function (dataset) {
		if (dataset == undefined) {
			return '{"columnInfos":[], "rows":[]}';
		}

		var colSize = dataset.getColCount();
		var rowSize = dataset.getRowCount();

		var started = false;
		var jsonString = '{"columnInfos":[';
		var i, colInfo;
		for (i = 0; i < colSize; i++) {
			colInfo = dataset.getColumnInfo(i);
			if (started) {
				jsonString += (',{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			else {
				jsonString += ('{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			started = true;
		}

		started = false;
		jsonString += '],"rows":[';
		for (i = 0; i < rowSize; i++) {
			if (started) {
				jsonString += ',[';
			}
			else {
				jsonString += '[';
			}
			started = true;

			var colStarted = false;
			for (var j = 0; j < colSize; j++) {
				colInfo = dataset.getColumnInfo(j);
				var value = dataset.getColumn(i, colInfo.name);

				if (colStarted) {
					jsonString += ',';
				}
				colStarted = true;

				var valueString;
				if (value === null) {
					valueString = 'null';
				}
				else if (value === undefined) {
					valueString = 'undefined';
				}
				else {
					switch (colInfo.ntype) {
						case 2:
						case 3:
							valueString = nexacro.DataUtils.toTextFromDecimal(value);
							break;
						case 4:
							valueString = '"' + nexacro.DataUtils.toTextFromDecimal(value) + '"';
							break;
						case 5:
							valueString = '"' + nexacro.DataUtils.toTextFromDate(value) + '"';
							break;
						case 6:
							valueString = '"' + nexacro.DataUtils.toTextFromTime(value) + '"';
							break;
						case 7:
							if (value.dateObj == undefined) {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value) + '"';
							}
							else {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value.dateObj) + '"';
							}
							break;
						case 1:
							valueString = '"' + nexacro.Device.encodeString(value) + '"';
							break;
						case 0:
						case 8:
						case 9:
						default:
							valueString = '"' + value + '"';
							break;
					}
				}
				jsonString += valueString;
			}
			jsonString += ']';
		}
		jsonString += ']}';

		return jsonString;
	};

	_pDeviceI.DatasetToJSONObject = function (dataset) {
		return nexacro._executeEvalStr('(' + nexacro.Device.DatasetToJSONString(dataset) + ')');
	};

	_pDeviceI.JSONObjectToDataset = function (jsonObject, dataset) {
		if (jsonObject == undefined) {
			return dataset;
		}
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}
		var colInfos = jsonObject.columnInfos;
		var i;
		for (i = 0; i < colInfos.length; i++) {
			dataset.addColumn(colInfos[i].name, nexacro.DataUtils.toTypeName(colInfos[i].type));
		}
		var rows = jsonObject.rows;
		for (i = 0; i < rows.length; i++) {
			var ridx = dataset.addRow();
			for (var j = 0; j < colInfos.length; j++) {
				switch (colInfos[j].type) {
					case 1:
						dataset.setColumn(ridx, colInfos[j].name, nexacro.Device.decodeString(rows[i][j]));
						break;
					case 4:
						dataset.setColumn(ridx, colInfos[j].name, rows[i][j]);
						break;
					case 2:
					case 3:
					case 5:
					case 6:
					case 7:
					case 0:
					case 8:
					case 9:
					default:
						dataset.setColumn(ridx, colInfos[j].name, rows[i][j]);
						break;
				}
			}
		}
		return dataset;
	};

	_pDeviceI.JSONStringToDataset = function (jsonString, dataset) {
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}
		return nexacro.Device.JSONObjectToDataset(nexacro._executeEvalStr('(' + jsonString + ')'));
	};



	_pDeviceI.DatasetToJSONString2 = function (dataset) {
		if (dataset == undefined) {
			return '{"columnInfos":[], "rows":[]}';
		}

		var colSize = dataset.getColCount();
		var rowSize = dataset.getRowCount();

		var started = false;
		var jsonString = '{"columnInfos":[';
		var i, colInfo;
		for (i = 0; i < colSize; i++) {
			colInfo = dataset.getColumnInfo(i);
			if (started) {
				jsonString += (',{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			else {
				jsonString += ('{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			started = true;
		}

		started = false;
		jsonString += '],"rows":[';
		for (i = 0; i < rowSize; i++) {
			if (started) {
				jsonString += ',{';
			}
			else {
				jsonString += '{';
			}
			started = true;

			var colStarted = false;
			for (var j = 0; j < colSize; j++) {
				colInfo = dataset.getColumnInfo(j);
				var value = dataset.getColumn(i, colInfo.name);
				if (value == undefined) {
					continue;
				}

				if (colStarted) {
					jsonString += ',';
				}
				colStarted = true;

				jsonString += '"' + colInfo.name + '":';

				var valueString;

				{

					switch (colInfo.ntype) {
						case 2:
						case 3:
							valueString = nexacro.DataUtils.toTextFromDecimal(value);
							break;
						case 4:
							valueString = '"' + nexacro.DataUtils.toTextFromDecimal(value) + '"';
							break;
						case 5:
							valueString = '"' + nexacro.DataUtils.toTextFromDate(value) + '"';
							break;
						case 6:
							valueString = '"' + nexacro.DataUtils.toTextFromTime(value) + '"';
							break;
						case 7:
							if (value.dateObj == undefined) {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value) + '"';
							}
							else {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value.dateObj) + '"';
							}
							break;
						case 1:
							valueString = '"' + nexacro.Device.encodeString(value) + '"';
							break;
						case 0:
						case 8:
						case 9:
						default:
							valueString = '"' + value + '"';
							break;
					}
				}
				jsonString += valueString;
			}
			jsonString += '}';
		}
		jsonString += ']}';

		return jsonString;
	};

	_pDeviceI.DatasetToJSONObject2 = function (dataset) {
		return nexacro._executeEvalStr('(' + nexacro.Device.DatasetToJSONString2(dataset) + ')');
	};

	_pDeviceI.JSONObjectToDataset2 = function (jsonObject, dataset) {
		if (jsonObject == undefined) {
			return dataset;
		}
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}

		var colInfos = jsonObject.columnInfos;
		var i;
		for (i = 0; i < colInfos.length; i++) {
			dataset.addColumn(colInfos[i].name, nexacro.DataUtils.toTypeName(colInfos[i].type));
		}

		var rows = jsonObject.rows;
		for (i = 0; i < rows.length; i++) {
			var ridx = dataset.addRow();
			for (var j = 0; j < colInfos.length; j++) {
				switch (colInfos[j].type) {
					case 1:
						dataset.setColumn(ridx, colInfos[j].name, nexacro.Device.decodeString(rows[i][colInfos[j].name]));
						break;
					case 4:
						dataset.setColumn(ridx, colInfos[j].name, rows[i][colInfos[j].name]);
						break;
					case 2:
					case 3:
					case 5:
					case 6:
					case 7:
					case 0:
					case 8:
					case 9:
					default:
						dataset.setColumn(ridx, colInfos[j].name, rows[i][colInfos[j].name]);
						break;
				}
			}
		}
		return dataset;
	};

	_pDeviceI.JSONStringToDataset2 = function (jsonString, dataset) {
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}

		return nexacro.Device.JSONObjectToDataset2(nexacro._executeEvalStr('(' + jsonString + ')'), dataset);
	};

	_pDeviceI._isHybrid = function () {
		return this._is_hybrid;
	};

	_pDeviceI.exit = function (useCache) {
		var _useCache = false;

		if (arguments.length == 0) {
			_useCache = "false";
		}
		else {
			if (useCache == true || (typeof (useCache) == "string" && useCache == "true")) {
				_useCache = "true";
			}
			else if (useCache == false || (typeof (useCache) == "string" && useCache == "false")) {
				_useCache = "false";
			}
			else {
				return false;
			}
		}

		if (nexacro.Device.curDevice == DeviceType.IOS) {
			var jsonstr = "";
			jsonstr = "EXIT" + _useCache;
			nexacro.Device.exec(jsonstr);
		}
	};

	delete _pDeviceI;
}


if (nexacro.System) {
	nexacro.System.prototype = function () {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;

		this.enableevent = true;
		if (nexacro.Device.curDevice == DeviceType.IOS) {
			var osname = "iOS";
			var devicename, version;
			var iphone = navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
			var ipad = navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/);
			if (iphone) {
				devicename = "iphone";
				version = iphone[2].replace(/_/g, '.');
			}
			if (ipad) {
				devicename = "ipad";
				version = ipad[2].replace(/_/g, '.');
			}

			this.osversion = osname + " " + version;
			this.navigatorname = "nexacro";
			this.navigatorversion = "17";
			this.mobilephonenumber = "";
			this.mobileproducttype = devicename;
			this.mobileuniqueid = "";
			this.mobileorientation = "";
			this.taskbarsize = "20";
			this.userapppath = "";
		}
	};

	nexacro.System.prototype.set_osversion = function () {
	};
	nexacro.System.prototype.set_navigatorname = function () {
	};
	nexacro.System.prototype.set_navigatorversion = function () {
	};
	nexacro.System.prototype.set_mobilephonenumber = function () {
	};
	nexacro.System.prototype.set_mobileproducttype = function () {
	};
	nexacro.System.prototype.set_mobileuniqueid = function () {
	};
	nexacro.System.prototype.set_mobileorientation = function () {
	};
	nexacro.System.prototype.set_taskbarsize = function () {
	};
	nexacro.System.prototype.set_userapppath = function () {
	};
	nexacro.System.prototype.set_sdcardpath = function () {
	};

	nexacro.System.prototype.destroy = function () {
		delete nexacro.Device._userCreatedObj[this._id];
		return true;
	};



	nexacro.System.getSystemInfo = function () {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		nexacro.Device.exec('{"id":' + this._id + ', "div":"PhoneInfo","method":"getAll"}');
	};

	nexacro.System.recvPhoneInfo = function (params) {
		nexacro.System.osversion = params.osversion;
		nexacro.System.mobilephonenumber = params.mobilephonenumber;
		nexacro.System.mobileproducttype = params.mobileproducttype;
		nexacro.System.mobileuniqueid = params.mobileuniqueid;
		nexacro.System.mobileorientation = params.mobileorientation;
		this.userapppath = params.userapppath;
		this.sdcardpath = "";

		if (nexacro.Device.curDevice == DeviceType.IOS) {
			nexacro.Device.isphone = params.isIPhone;
			nexacro.System.computername = params.computername;
			nexacro.System.cpuarchitecture = params.cpuarchitecture;
			nexacro.System.cputype = params.cputype;
			nexacro.System.cpucount = params.cpucount;
			nexacro.Device.libraryversion[0] = params.libraryversion;

			if (params.preferences) {
				var localstorage = window.localStorage;
				if (localstorage) {
					var preferences = JSON.parse(params.preferences);
					for (var key in preferences) {
						var value = nexacro.Device.decodeString(preferences[key]);
						if (!localstorage[key]) {
							localstorage.setItem(key, value);
						}
						else {
							if (value != localstorage[key]) {
								nexacro._setPreferencesValue(key, localstorage[key]);
							}
						}
					}
				}
			}
		}
	};

	nexacro.System.setOrientation = function (nOrientation) {
		if (nOrientation == null) {
			return false;
		}

		if (typeof (nOrientation) == "string") {
			nOrientation = Number(nOrientation);
		}

		if (nOrientation < 0 || nOrientation > 3) {
			return false;
		}

		if (nexacro.Device.curDevice == DeviceType.ANDROID) {
			nexacro._setOrientation(nOrientation);
		}
		else {
			var jsonstr = "";
			jsonstr = "ORIENTATION:" + nOrientation;
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	nexacro.System._setOrientation = function (nOrientation) {
		this.mobileorientation = nOrientation;
		if (nexacro.Device.curDevice == DeviceType.IOS) {
			nexacro.System.mobileorientation = nOrientation;
		}
	};

	if (nexacro._OS == "Windows" || nexacro._OS == "Android") {
		nexacro._callExtensionLibraryMethod = function () {
			return nexacro.__callMethodExtensionAPI.apply(this, arguments);
		};
	}
}



this.DeviceType = 
	{
	ANDROID : 0, 
	IOS : 1, 
	WINDOWS : 2, 
	MACOS : 3
};

nexacro._initDeviceAPI = function () {
	nexacro.Device = new nexacro.DeviceI();

	if (nexacro.Device._isHybrid()) {
		if (window.system) {
			if (nexacro.Device.curDevice == DeviceType.IOS) {
				nexacro.System.prototype();

				nexacro.System.getSystemInfo();
			}
		}
	}
};

