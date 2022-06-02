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

if (!nexacro.BluetoothLE) {
	nexacro.BluetoothLE = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.handle = nexacro._createBluetoothLEConnectionObject(this);

		this._event_list = {
			"onscanresult" : 1, 
			"onsubscriberesult" : 1, 
			"onsuccess" : 1, 
			"onerror" : 1
		};


		this.onscanresult = null;
		this.onsubscriberesult = null;
		this.onsuccess = null;
		this.onerror = null;

		this.osSpecifiedJSONString = this._makeOSSpecifiedJSONString(this);

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"BluetoothLE", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pBluetoothLE = nexacro.BluetoothLE.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.BluetoothLE);
	_pBluetoothLE._type_name = "BluetoothLE";

	_pBluetoothLE.destroy = function () {
		nexacro._destroyBluetoothLEConnectionObject(this.handle);

		delete nexacro.Device._userCreatedObj[this._id];



		return true;
	};

	_pBluetoothLE.scanStart = function (duration, service_uuid) {
		var params = '{ "duration":"' + duration;
		params += '", "service_uuid":"' + service_uuid;
		params += '"}';
		var jsonstr = this.makeJSONString('"scanStart"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.scanStop = function () {
		var params = '""';
		var jsonstr = this.makeJSONString('"scanStop"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.connect = function (device_address) {
		var params = '{ "device_address":"' + device_address;
		params += '"}';
		var jsonstr = this.makeJSONString('"connect"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.disconnect = function () {
		var params = '""';
		var jsonstr = this.makeJSONString('"disconnect"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.discoverService = function (device_address) {
		var params = '""';
		var jsonstr = this.makeJSONString('"discoverServices"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.subscribe = function (service_uuid, characteristic_uuid) {
		var params = '{ "service_uuid":"' + service_uuid;
		params += '", "characteristic_uuid":"' + characteristic_uuid;
		params += '"}';
		var jsonstr = this.makeJSONString('"subscribe"', params);
		nexacro.Device.exec(jsonstr);
	};


	_pBluetoothLE.unsubscribe = function (service_uuid, characteristic_uuid) {
		var params = '{ "service_uuid":"' + service_uuid;
		params += '", "characteristic_uuid":"' + characteristic_uuid;
		params += '"}';
		var jsonstr = this.makeJSONString('"unsubscribe"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.writeCharacteristic = function (service_uuid, characteristic_uuid, value, valuetype) {
		var params = '{  "service_uuid":"' + service_uuid;
		params += '", "characteristic_uuid":"' + characteristic_uuid;
		params += '", "value":"' + value;
		params += '"}';
		var jsonstr = this.makeJSONString('"writeCharacteristic"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.readCharacteristic = function (service_uuid, characteristic_uuid) {
		var params = '{  "service_uuid":"' + service_uuid;
		params += '", "characteristic_uuid":"' + characteristic_uuid;
		params += '"}';
		var jsonstr = this.makeJSONString('"readCharacteristic"', params);
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.test = function (device_address) {
		var params = '{  device_address:"' + device_address;
		params += '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"BluetoothLE", "windows_platform":"WIN32", "method":"test", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pBluetoothLE.makeJSONString = function (method, params) {
		var jsonstr = '{"id":' + this._id;
		jsonstr += ', "div":"BluetoothLE"';
		jsonstr += ', "method":' + method;
		jsonstr += this.osSpecifiedJSONString;
		jsonstr += ', "params":' + params + '}';
		return jsonstr;
	};

	_pBluetoothLE._makeOSSpecifiedJSONString = function (target) {
		var OSSpecifiedJSONString = '';
		if (nexacro._OS == "Windows") {
			OSSpecifiedJSONString += ', "windowhandle":' + target.parent._getWindow().handle;
			OSSpecifiedJSONString += ', "objecthandle":' + target.handle;
			OSSpecifiedJSONString += ', "windows_platform":"WIN32"';
		}
		else {
		}
		return OSSpecifiedJSONString;
	};

	_pBluetoothLE.hasBluetoothLE = function () {
		if (nexacro.Device.curDevice == DeviceType.ANDROID) {
			return nexacro.__hasBluetoothLE();
		}
		else {
			return (nexacro.Device.isphone == 1);
		}
	};


	_pBluetoothLE._onscanresult = function (objData) {
		var e;

		if (nexacro._OS == "Windows") {
			var objDataParsed = JSON.parse(objData);
			e = new nexacro.BluetoothLEScanDeviceEventInfo("onscanresult", objDataParsed.devicename, objDataParsed.deviceaddress);
		}
		else {
			e = new nexacro.BluetoothLEScanDeviceEventInfo("onscanresult", objData.devicename, objData.deviceaddress);
		}
		this._fire_onscanresult(this, e);
	};

	_pBluetoothLE._fire_onscanresult = function (objBluetoothLE, eBluetoothLEScanDeviceEventInfo) {
		if (this.onscanresult && this.onscanresult._has_handlers) {
			return this.onscanresult._fireEvent(this, eBluetoothLEScanDeviceEventInfo);
		}
	};




	_pBluetoothLE._onsubscriberesult = function (objData) {
		var e;

		if (nexacro._OS == "Windows") {
			var objDataParsed = JSON.parse(objData);
			e = new nexacro.BluetoothLEEventInfo(objDataParsed.eventid, objDataParsed.reason, objDataParsed.service_uuid, objDataParsed.message);
		}
		else {
			e = new nexacro.BluetoothLEEventInfo(objData.eventid, objData.reason, objData.service_uuid, objData.message);
		}

		this._fire_onsubscriberesult(this, e);
	};

	_pBluetoothLE._fire_onsubscriberesult = function (objBluetoothLE, eBluetoothLEEventInfo) {
		if (this.onsubscriberesult && this.onsubscriberesult._has_handlers) {
			return this.onsubscriberesult._fireEvent(this, eBluetoothLEEventInfo);
		}
		return true;
	};


	_pBluetoothLE._onsuccess = function (objData) {
		var e;

		if (nexacro._OS == "Windows") {
			var objDataParsed = JSON.parse(objData);
			e = new nexacro.BluetoothLEEventInfo(objDataParsed.eventid, objDataParsed.reason, objDataParsed.service_uuid, objDataParsed.message);
		}
		else {
			e = new nexacro.BluetoothLEEventInfo(objData.eventid, objData.reason, objData.service_uuid, objData.message);
		}

		this._fire_onsuccess(this, e);
	};

	_pBluetoothLE._fire_onsuccess = function (objBluetoothLE, eBluetoothLEEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eBluetoothLEEventInfo);
		}
		return true;
	};

	_pBluetoothLE._onerror = function (objData) {
		var e;

		if (nexacro._OS == "Windows") {
			var objDataParsed = JSON.parse(objData);
			e = new nexacro.BluetoothLEErrorEventInfo(objDataParsed.eventid, objDataParsed.reason, objDataParsed.errormsg);
		}
		else {
			e = new nexacro.BluetoothLEErrorEventInfo(objData.eventid, objData.reason, objData.errormsg);
		}

		this._fire_onerror(this, e);
	};

	_pBluetoothLE._fire_onerror = function (objBluetoothLE, BluetoothLEErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, BluetoothLEErrorEventInfo);
		}
		return true;
	};

	delete _pBluetoothLE;
}

if (!nexacro.BluetoothLEScanDeviceEventInfo) {
	nexacro.BluetoothLEScanDeviceEventInfo = function (strEventId, strDeviceName, strDeviceAdress) {
		this.eventid = strEventId;
		this.device_name = strDeviceName;
		this.device_address = strDeviceAdress;
	};
	var _pBluetoothLEScanDeviceEventInfo = nexacro.BluetoothLEScanDeviceEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.BluetoothLEScanDeviceEventInfo);
	_pBluetoothLEScanDeviceEventInfo._type_name = "BluetoothLEScanDeviceEventInfo";

	delete _pBluetoothLEScanDeviceEventInfo;
}

if (!nexacro.BluetoothLEEventInfo) {
	nexacro.BluetoothLEEventInfo = function (strEventId, strReason, strServiceUuid, strMessage) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.service_uuid = strServiceUuid;
		this.message = strMessage;
	};
	var _pBluetoothLEEventInfo = nexacro.BluetoothLEEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.BluetoothLEEventInfo);
	_pBluetoothLEEventInfo._type_name = "BluetoothLEEventInfo";

	delete _pBluetoothLEEventInfo;
}

if (!nexacro.BluetoothLEErrorEventInfo) {
	nexacro.BluetoothLEErrorEventInfo = function (strEventId, strReason, strErrorMsg) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.errortype = "ObjectError";
		this.errormsg = strErrorMsg;
	};
	var _pBluetoothLEErrorEventInfo = nexacro.BluetoothLEErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.BluetoothLEErrorEventInfo);
	_pBluetoothLEErrorEventInfo._type_name = "BluetoothLEErrorEventInfo";

	delete _pBluetoothLEErrorEventInfo;
}

if (nexacro._Browser == "Runtime") {
	if (nexacro._OS == "Windows") {
		nexacro._createBluetoothLEConnectionObject = function (target) {
			return nexacro.__createBluetoothLEObject(target, target.on_success, target._onconnect, target._onservicediscovered, target.on_error, target._oncharacteristicchanged);
		};

		nexacro._destroyBluetoothLEConnectionObject = function (target) {
		};
	}

	else if (nexacro._OS == "Android" || nexacro._OS == "OSX") {
		nexacro._createBluetoothLEConnectionObject = function (target) {
		};
		nexacro._destroyBluetoothLEConnectionObject = function (target) {
		};
	}
}
else {
	if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
		nexacro._createBluetoothLEConnectionObject = function (target) {
		};

		nexacro._destroyBluetoothLEConnectionObject = function (target) {
		};
	}
}
