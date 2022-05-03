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

if (nexacro._OS == "iOS" && (window.location.pathname.split("/").pop() == "Run.html" || window.location.pathname.split("/").pop() == "nexacro.html")) {
	nexacro.DeviceI.prototype.setup = function () {
		this._userCreatedObj = {
		};
		this.isphone = 0;
		this._is_hybrid = true;
		this._protocolparameters = {
		};

		if (!!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.nexacro) {
			this._use_wkwebview = true;
		}
		else {
			this._use_wkwebview = false;
		}

		if (nexacro._OS == "iOS") {
			this.curDevice = DeviceType.IOS;

			if (!this._use_wkwebview) {
				if (!this.bridge && this._isHybrid()) {
					this.bridge = document.createElement("IFRAME");
					this.bridge.setAttribute("height", "0px");
					this.bridge.setAttribute("width", "0px");
					this.bridge.setAttribute("frameborder", "0");
					this.bridge.style.display = "none";
					document.documentElement.appendChild(this.bridge);
					this.msgqueue = [];
					this.msgqueue.length = 0;
					setInterval("nexacro.Device.execiOS()", 20);
				}
			}
		}
	};

	nexacro.DeviceI.prototype.execiOS = function () {
		if (this.msgqueue.length > 0 && this.curDevice == DeviceType.IOS) {
			this.msgqueue.reverse();
			this.bridge.src = "nexacro://?" + encodeURI(this.msgqueue.pop());
			this.msgqueue.reverse();
		}
	};

	nexacro.DeviceI.prototype.exec = function (method, sync) {
		if (this._isHybrid() == false) {
			return;
		}

		if (this._use_wkwebview) {
			if (!sync) {
				window.webkit.messageHandlers.nexacro.postMessage(method);
			}
			else {
				return prompt("nexacro", method);
			}
		}
		else {
			this.msgqueue.push(method);
		}
	};

	nexacro._convertRealPath = function (strAlias) {
		if (nexacro.Device._isHybrid() == undefined || !nexacro.Device._isHybrid()) {
			return strAlias;
		}

		if (strAlias === undefined || strAlias === null) {
			return "";
		}
		var rootPathCheck = strAlias.substring(0, 9);
		var iosFilePath = "";
		if (rootPathCheck.toLowerCase() == "%userapp%") {
			iosFilePath = strAlias.substring(9, strAlias.length);
			if (iosFilePath.charAt(0) != "/") {
				iosFilePath = "/" + iosFilePath;
			}

			return nexacro.System.userapppath + iosFilePath;
		}
		else {
			return strAlias;
		}
	};

	nexacro._closeWindowHandle = function (_win_handle) {
		if (nexacro._getMainWindowHandle() == _win_handle) {
			nexacro._destroyManagerFrame(_win_handle);
			nexacro._destroyManagerShadow(_win_handle);
			nexacro.Device.exit();
			_win_handle.open("", "_self");
		}
		_win_handle.close();
	};

	nexacro._setEnableCookie = function (enable) {
		nexacro.Device.exec("COOKIE::" + enable);
	};

	nexacro._setEnableCache = function (enable) {
		nexacro.Device.exec("CACHE::" + enable);
	};

	nexacro._isHybrid = function () {
		return nexacro.Device._isHybrid();
	};

	nexacro._checkDevicePermission = function (permission_types) {
		if (permission_types === undefined || permission_types === null) {
			return;
		}

		var params = '{"permissions":' + JSON.stringify(permission_types) + '}';
		var jsonstr = '{"id":null, "div":"Permission", "method":"checkDevicePermission", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	nexacro._requestDevicePermission = function (permission_types, description) {
		if (permission_types === undefined || permission_types === null) {
			return;
		}

		var params;
		if (description === undefined || description === null) {
			params = '{"permissions":' + JSON.stringify(permission_types) + ',"description":null}';
		}
		else {
			params = '{"permissions":' + JSON.stringify(permission_types) + ',"description":"' + description + '"}';
		}
		var jsonstr = '{"id":null, "div":"Permission", "method":"requestDevicePermission", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	nexacro._convertDatasetSSVToBIN = function (ssvdata) {
		return ssvdata;
	};

	nexacro._convertDatasetBINToSSV = function (bindata) {
		return bindata;
	};

	nexacro._convertStreamSSVToBIN = function (ssvdata) {
		return ssvdata;
	};

	nexacro._convertStreamBINToSSV = function (bindata) {
		return bindata;
	};

	nexacro._setProtocolVar = function (name, key, val) {
		var protocol = nexacro.Device._protocolparameters[name];

		if (protocol == undefined) {
			nexacro.Device._protocolparameters[name] = {
			};
			protocol = nexacro.Device._protocolparameters[name];
		}

		protocol[key] = val;

		return true;
	};

	nexacro._execBrowser = function (strUrl) {
		this._id = nexacro.Device.makeID();

		if (strUrl == null) {
			return false;
		}

		var params = '{"url":"' + strUrl + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"Browser", "method":"execBrowser", "params":' + params + "}";

		nexacro.Device.exec(jsonstr);

		return true;
	};

	nexacro._execDefaultBrowser = function (url) {
		return nexacro._execBrowser(url);
	};

	nexacro._setPreferencesValue = function (key, value) {
		if (!key) {
			return false;
		}

		var params;

		if (value) {
			params = '{"key":"' + key + '","value":"' + nexacro.Device.encodeString(value) + '"}';
		}
		else {
			params = '{"key":"' + key + '","value":undefined}';
		}

		var jsonstr = '{"id":0, "div":"Preferences", "method":"setPreferencesValue", "params":' + params + '}';

		nexacro.Device.exec(jsonstr);

		return true;
	};

	nexacro._callExtensionLibraryMethod = function () {
		return nexacro.__callMethodExtensionAPI.apply(this, arguments);
	};
	nexacro._initDeviceAPI();
}
