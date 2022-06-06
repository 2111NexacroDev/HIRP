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

if (!nexacro.GoogleMap) {
	nexacro.GoogleMapEventInfo = function (obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
		this.id = this.eventid = id;
		this.fromobject = this.fromreferenceobject = obj;
		this.centerlatitude = centerlocation.latitude;
		this.centerlongitude = centerlocation.longitude;
		this.latitude = coordinates.latitude;
		this.longitude = coordinates.longitude;
		this.viewmode = viewmode;
		this.zoomlevel = zoomlevel;
		this.addresses = addresses;
	};

	var _pGoogleMapEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GoogleMapEventInfo);
	nexacro.GoogleMapEventInfo.prototype = _pGoogleMapEventInfo;
	_pGoogleMapEventInfo._type_name = "GoogleMapEventInfo";

	delete _pGoogleMapEventInfo;

	nexacro.GoogleMapErrorEventInfo = function (obj, id, errorcode, errormsg) {
		this.id = this.eventid = id;
		this.fromobject = this.fromreferenceobject = obj;
		this.errortype = "ObjectError";
		this.statuscode = errorcode;
		this.errormsg = errormsg;
	};

	var _pGoogleMapErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GoogleMapErrorEventInfo);
	nexacro.GoogleMapErrorEventInfo.prototype = _pGoogleMapErrorEventInfo;
	_pGoogleMapErrorEventInfo._type_name = "GoogleMapErrorEventInfo";

	delete _pGoogleMapErrorEventInfo;

	nexacro.GoogleMapClickEventInfo = function (obj, id, location) {
		this.id = this.eventid = id;
		this.fromobject = this.fromreferenceobject = obj;
		this.latitude = location.latitude;
		this.longitude = location.longitude;
	};

	var _pGoogleMapClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GoogleMapClickEventInfo);
	nexacro.GoogleMapClickEventInfo.prototype = _pGoogleMapClickEventInfo;
	_pGoogleMapClickEventInfo._type_name = "GoogleMapClickEventInfo";

	delete _pGoogleMapClickEventInfo;

	nexacro.GoogleMapDragEventInfo = function (obj, id, location) {
		this.id = this.eventid = id;
		this.fromobject = this.fromreferenceobject = obj;
		this.latitude = location.latitude;
		this.longitude = location.longitude;
	};

	var _pGoogleMapDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GoogleMapDragEventInfo);
	nexacro.GoogleMapDragEventInfo.prototype = _pGoogleMapDragEventInfo;
	_pGoogleMapDragEventInfo._type_name = "GoogleMapDragEventInfo";

	delete _pGoogleMapDragEventInfo;

	if (nexacro.Device && nexacro._OS == "Android") {
		nexacro.GoogleMap = function (id, left, top, width, height, right, bottom, parent) {
			nexacro.Component.call(this, id, left, top, width, height, right, bottom, parent);

			this._ifrm_elem = null;
			this.window = null;
			this.document = null;
			this.latitude = 0;
			this.longitude = 0;
			this.centerlocation = {
				latitude : 0, 
				longitude : 0
			};
			this.location = {
				latitude : 0, 
				longitude : 0
			};
			this.showmode = 0;
			this.zoomlevel = 15;
			this.showzoom = false;
			this.showmode = false;
			this.shownavigator = false;
			this.viewmode = 0;
			this.language = undefined;
			this.region = undefined;

			this.items = [];
			this.itemsname = [];
			this._itemsname = [];
			this._items = [];
			this._infowindowname = [];
			this._infowindow = [];
			this.bSensor = false;
			this.bLoaded = false;

			this._event_list = {
				"onclick" : 1, 
				"ondblclick" : 1, 
				"onkeypress" : 1, 
				"onkeydown" : 1, 
				"onkeyup" : 1, 
				"onkillfocus" : 1, 
				"onsetfocus" : 1, 
				"ondrag" : 1, 
				"ondragenter" : 1, 
				"ondragleave" : 1, 
				"ondragmove" : 1, 
				"ondrop" : 1, 
				"onlbuttondown" : 1, 
				"onlbuttonup" : 1, 
				"onmouseenter" : 1, 
				"onmouseleave" : 1, 
				"onmousemove" : 1, 
				"onmove" : 1, 
				"onsize" : 1, 
				"onrbuttondown" : 1, 
				"onrbuttonup" : 1, 
				"onload" : 1, 
				"onerror" : 1, 
				"onrecvsuccess" : 1, 
				"oncenterchanged" : 1, 
				"onmapdragstart" : 1, 
				"onmapdrag" : 1, 
				"onmapdragend" : 1, 
				"ondevicebuttonup" : 1
			};

			this._location = {
				latitude : 0, 
				longitude : 0
			};
			this._pixel = {
				x : 0, 
				y : 0
			};
		};

		var _pGoogleMap = nexacro._createPrototype(nexacro.Component, nexacro.GoogleMap);
		nexacro.GoogleMap.prototype = _pGoogleMap;
		_pGoogleMap._type_name = "GoogleMap";

		_pGoogleMap.on_create_contents = function () {
			var control_elem = this.getElement();
			if (control_elem) {
				this._ifrm_elem = new nexacro._GoogleMapPluginElement(control_elem);
				this._ifrm_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			}
		};

		_pGoogleMap.on_create_contents_command = function () {
			var control_elem = this.getElement();
			if (control_elem) {
				this._ifrm_elem = new nexacro._GoogleMapPluginElement(control_elem);
				this._ifrm_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				return this._ifrm_elem.createCommand();
			}
			return "";
		};

		_pGoogleMap.on_attach_contents_handle = function (win) {
			if (this._ifrm_elem) {
				this._ifrm_elem.attachHandle(win);
			}
		};

		_pGoogleMap.on_created_contents = function (win) {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem.create(win);

				ifrm_elem.initEvent();
				this.document = ifrm_elem._document;
				this.window = ifrm_elem._winodw;
			}
		};

		_pGoogleMap.on_destroy_contents = function () {
			var ifrm_elem = this._ifrm_elem;

			if (ifrm_elem) {
				this.window = null;
				this.document = null;
				ifrm_elem.destroy();
				this._ifrm_elem = null;
			}

			this.items = null;
			this.itemsname = null;
			this._itemsname = null;
			this._items = null;
			this._infowindowname = null;
			this._infowindow = null;
		};

		_pGoogleMap.on_update_position = function (resize_flag, move_flag, update) {
			nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag, update);
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem.on_update_position();
			}
		};

		_pGoogleMap.on_change_containerRect = function (width, height) {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem.setElementSize(width, height);
			}
		};

		_pGoogleMap.on_fire_onload = function (obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
			if (this.onload && this.onload._has_handlers) {
				var evt = new nexacro.GoogleMapEventInfo(obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses);
				return this.onload._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onerror = function (obj, id, errorcode, errormsg) {
			if (this.onerror && this.onerror._has_handlers) {
				var evt = new nexacro.GoogleMapErrorEventInfo(obj, id, errorcode, errormsg);
				return this.onerror._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onrecvsuccess = function (obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
			if (this.onrecvsuccess && this.onrecvsuccess._has_handlers) {
				var evt = new nexacro.GoogleMapEventInfo(obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses);
				return this.onrecvsuccess._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_oncenterchanged = function (obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
			this.centerlocation = centerlocation;
			this.latitude = this.centerlocation.latitude;
			this.longitude = this.centerlocation.longitude;
			this.zoomlevel = zoomlevel;

			if (this.oncenterchanged && this.oncenterchanged._has_handlers) {
				var evt = new nexacro.GoogleMapEventInfo(obj, id, centerlocation, coordinates, viewmode, zoomlevel, addresses);
				return this.oncenterchanged._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onclick = function (obj, id, location) {
			if (this.onclick && this.onclick._has_handlers) {
				var evt = new nexacro.GoogleMapClickEventInfo(obj, id, location);
				return this.onclick._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_ondrag = function (obj, id, location) {
			if (this.ondrag && this.ondrag._has_handlers) {
				var evt = new nexacro.GoogleMapDragEventInfo(obj, id, location);
				return this.ondrag._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onmapdragstart = function (obj, id, location) {
			if (this.onmapdragstart && this.onmapdragstart._has_handlers) {
				var evt = new nexacro.GoogleMapDragEventInfo(obj, id, location);
				return this.onmapdragstart._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onmapdrag = function (obj, id, location) {
			if (this.onmapdrag && this.onmapdrag._has_handlers) {
				var evt = new nexacro.GoogleMapDragEventInfo(obj, id, location);
				return this.onmapdrag._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap.on_fire_onmapdragend = function (obj, id, location) {
			if (this.onmapdragend && this.onmapdragend._has_handlers) {
				var evt = new nexacro.GoogleMapDragEventInfo(obj, id, location);
				return this.onmapdragend._fireEvent(this, evt);
			}
			return true;
		};

		_pGoogleMap._apply_setfocus = function () {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem.setElementFocus(true);
			}
		};

		_pGoogleMap.set_text = function (v) {
			v = nexacro._toString(v);
			if (v && v != this.text) {
				this.text = v;
				this._displaytext = v.replace(/ /g, "\u00a0");
			}
		};

		_pGoogleMap.set_viewmode = function (v) {
			if (v != null) {
				this.viewmode = v;

				var ifrm_elem = this._ifrm_elem;
				if (ifrm_elem) {
					var params = '{"value":"' + this.viewmode + '"}';
					ifrm_elem.setElementParam("viewmode", params);
				}
			}
			else {
				return false;
			}
		};

		_pGoogleMap.set_zoomlevel = function () {
		};

		_pGoogleMap.set_showzoom = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showzoom = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showzoom = false;
				}
				else {
					return false;
				}

				var ifrm_elem = this._ifrm_elem;
				if (ifrm_elem) {
					var params = '{"value":"' + this.showzoom + '"}';
					ifrm_elem.setElementParam("showzoom", params);
				}

				return true;
			}
		};

		_pGoogleMap.set_shownavigator = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.shownavigator = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.shownavigator = false;
				}
				else {
					return false;
				}

				var ifrm_elem = this._ifrm_elem;
				if (ifrm_elem) {
					var params = '{"value":"' + this.shownavigator + '"}';
					ifrm_elem.setElementParam("shownavigator", params);
				}
				return true;
			}
		};

		_pGoogleMap.set_showmapscale = function () {
		};
		_pGoogleMap.set_showmode = function () {
		};

		_pGoogleMap.set_showcompass = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showcompass = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showcompass = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					var ifrm_elem = this._ifrm_elem;
					if (ifrm_elem) {
						var params = '{"value":"' + this.showcompass + '"}';
						ifrm_elem.setElementParam("showcompass", params);
					}
				}
				return true;
			}
		};

		_pGoogleMap.set_apikey = nexacro._emptyFn;

		_pGoogleMap.set_language = nexacro._emptyFn;
		_pGoogleMap.set_region = nexacro._emptyFn;

		_pGoogleMap.set_enable = function (v) {
			v = nexacro._toBoolean(v);
			if (this.enable != v) {
				this.enable = v;

				if (this._is_created) {
					var enable_flag = (this.parent._real_enable && v);
					if (this._ifrm_elem) {
						this._ifrm_elem.setElementEnable(enable_flag);
					}
				}
			}
		};

		_pGoogleMap.set_visible = function (v) {
			if (v === undefined || v === null) {
				return;
			}
			v = nexacro._toBoolean(v);

			nexacro.Component.prototype.set_visible.call(this, v);

			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				if (ifrm_elem.setElementVisible != null) {
					ifrm_elem.setElementVisible(v);
				}
			}
		};

		_pGoogleMap.load = function (bUseSensor, nLatitude, nLongitude, constViewMode, nZoomLevel) {
			var strlength = 0;
			if (nZoomLevel != null) {
				try {
					strlength = nZoomLevel.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}

				if (nZoomLevel.length == 0) {
					return false;
				}

				var nzoom = 0;
				try {
					nzoom = Number(nZoomLevel.toString());
				}
				catch (e) {
					return false;
				}

				if (nzoom >= 0) {
					this.zoomlevel = nzoom;
				}
				else {
					return false;
				}
			}

			if ((nLatitude != null) && (nLongitude != null)) {
				strlength = 0;
				try {
					strlength = nLatitude.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}

				if (strlength.length == 0) {
					return false;
				}

				try {
					strlength = nLongitude.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}

				if (strlength.length == 0) {
					return false;
				}

				var nlat = 0;
				var nlon = 0;
				try {
					nlat = Number(nLatitude.toString());
				}
				catch (e) {
					return false;
				}

				if (nlat != nlat) {
					return false;
				}
				try {
					nlon = Number(nLongitude.toString());
				}
				catch (e) {
					return false;
				}

				if (nlon != nlon) {
					return false;
				}
				this.centerlocation.latitude = nlat;
				this.centerlocation.longitude = nlon;
				this.latitude = nlat;
				this.longitude = nlon;

				_pGoogleMap.centerlocation = {
					latitude : nlat, 
					longitude : nlon
				};
			}

			if (constViewMode != null) {
				if (constViewMode == 0 || (typeof (constViewMode) == "string" && constViewMode == "0")) {
					this.viewmode = 0;
				}
				else if (constViewMode == 1 || (typeof (constViewMode) == "string" && constViewMode == "1")) {
					this.viewmode = 1;
				}
				else if (constViewMode == 2 || (typeof (constViewMode) == "string" && constViewMode == "2")) {
					this.viewmode = 2;
				}
				else if (constViewMode == 3 || (typeof (constViewMode) == "string" && constViewMode == "3")) {
					this.viewmode = 3;
				}
				else {
					return false;
				}
			}
			else {
				this.viewmode = 0;
			}

			if (bUseSensor != null) {
				if (bUseSensor == true || (typeof (bUseSensor) == "string" && bUseSensor == "true")) {
					this.bSensor = true;
				}
				else if (bUseSensor == false || (typeof (bUseSensor) == "string" && bUseSensor == "false")) {
					this.bSensor = false;
				}
				else {
					return false;
				}
			}
			else if (bUseSensor == null) {
				this.bSensor = false;
			}

			var params = '{"bUseSensor":"' + this.bSensor + '","nLatitude":"' + this.centerlocation.latitude + '","nLongitude":"' + this.centerlocation.longitude + '","constViewMode":"' + this.viewmode + '","nZoomLevel":"' + this.zoomlevel + '"}';

			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem._setLoad(params);
			}
			this.bLoaded = true;
			return true;
		};

		_pGoogleMap.setMarkerLoc = function (strItemID, lat, lng) {
			this.items[strItemID].location.latitude = lat;
			this.items[strItemID].location.longitude = lng;
		};

		_pGoogleMap.getAddress = function (nLatitude, nLongitude, nMaxResultCount, enumLocale) {
			if (nLatitude == null || nLongitude == null || nMaxResultCount < 0) {
				return false;
			}

			if (nMaxResultCount == null) {
				nMaxResultCount = 1;
			}

			var params = '{"nLatitude":"' + nLatitude + '","nLongitude":"' + nLongitude + '","nMaxResultCount":"' + nMaxResultCount + '","strLocale":"' + enumLocale + '"}';

			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem._getAddress(params);
			}
			return true;
		};

		_pGoogleMap.getCoordinates = function (strAddress) {
			if (strAddress == null || strAddress == "") {
				return false;
			}

			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				ifrm_elem._getCoordinates(strAddress);
			}
			return true;
		};

		var _itemsname = [];
		var _items = [];
		var _infowindowname = [];
		var _infowindow = [];

		_pGoogleMap.addItem = function (strItemID, objComponent) {
			var ifrm_elem = this._ifrm_elem;

			if (strItemID == null || objComponent == null) {
				return false;
			}

			if (strItemID == "" || objComponent == "" || objComponent == "undefined" || strItemID.trim() == "") {
				return false;
			}

			if (typeof (this.items[strItemID]) != "undefined") {
				this.on_fire_onerror(this, "onerror", "1501", "item is already exist.");
				return false;
			}

			if (objComponent instanceof nexacro.GoogleMapMarker || objComponent instanceof nexacro.GoogleMapPolyline || objComponent instanceof nexacro.GoogleMapPolygon || objComponent instanceof nexacro.GoogleMapCircle) {
				this.items[strItemID] = objComponent;
				this.items.push(strItemID);

				if (this.bLoaded) {
					if (objComponent._type == 0 || objComponent._type == 1) {
						_pGoogleMap.addMarker(ifrm_elem, strItemID, objComponent);
					}
					else if (objComponent._type == 2) {
						_pGoogleMap.addPolyline(ifrm_elem, strItemID, objComponent);
					}
					else if (objComponent._type == 3) {
						_pGoogleMap.addPolygon(ifrm_elem, strItemID, objComponent);
					}
					else if (objComponent._type == 4) {
						_pGoogleMap.addCircle(ifrm_elem, strItemID, objComponent);
					}
				}
				return true;
			}
			else {
				return false;
			}
		};

		_pGoogleMap.addMarker = function (elem, markName, markObj) {
			if (markObj.imageurl.length > 0) {
				var _v = markObj.imageurl.toString().split(" ").join("");

				if (_v.substring(0, 9).toLowerCase() != "%userapp%" && _v.substring(0, 9).toLowerCase() != "%sd_card%") {
					var _filecache = nexacro._getFileCache(_v);
					if (null == _filecache) {
						return false;
					}
				}
			}

			_itemsname.push(markName);
			_items[markName] = "marker";
			markObj._map = this;
			markObj._name = markName;

			var params = '{"itemName":"' + markName + '","nLatitude":"' + markObj.latitude + '","nLongitude":"' + markObj.longitude + '","text":"' + markObj.text + '","visible":"' + markObj.visible + '","imageurl":"' + markObj.imageurl + '","draggable":"' + markObj.draggable + '"}';

			if (elem) {
				elem._setMarker(params);
			}
		};

		_pGoogleMap.addPolygon = function (elem, polygonName, polygonObj) {
			var _lat_lng_arr, _lat, _lng, i;
			var arr_lat = [];
			var arr_lng = [];

			_lat_lng_arr = polygonObj.locationdata.toString().split("]");
			for (i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);

				if (_lat.length > 0 && _lng.length > 0) {
					arr_lat.push(_lat);
					arr_lng.push(_lng);
				}
			}

			_itemsname.push(polygonName);
			_items[polygonName] = "polygon";

			polygonObj._map = this;
			polygonObj._name = polygonName;


			var params = '{"itemName":"' + polygonName + '","nLatitude":' + JSON.stringify(arr_lat) + ',"nLongitude":' + JSON.stringify(arr_lng) + ',"visible":"' + polygonObj.visible + '","linecolor":"' + polygonObj.linecolor + '","linewidth":"' + polygonObj.linewidth + '","fillbrushcolor":"' + polygonObj.fillbrushcolor + '"}';

			if (elem) {
				elem._setPolygon(params);
			}
		};

		_pGoogleMap.addPolyline = function (elem, polylineName, polylineObj) {
			var _lat_lng_arr, _lat, _lng, i;
			var arr_lat = [];
			var arr_lng = [];

			_lat_lng_arr = polylineObj.locationdata.toString().split("]");
			for (i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);

				if (_lat.length > 0 && _lng.length > 0) {
					arr_lat.push(_lat);
					arr_lng.push(_lng);
				}
			}

			_itemsname.push(polylineName);
			_items[polylineName] = "polyline";

			polylineObj._map = this;
			polylineObj._name = polylineName;

			var params = '{"itemName":"' + polylineName + '","nLatitude":' + JSON.stringify(arr_lat) + ',"nLongitude":' + JSON.stringify(arr_lng) + ',"visible":"' + polylineObj.visible + '","linecolor":"' + polylineObj.linecolor + '","linewidth":"' + polylineObj.linewidth + '"}';

			if (elem) {
				elem._setPolyline(params);
			}
		};

		_pGoogleMap.addCircle = function (elem, circleName, circleObj) {
			_itemsname.push(circleName);
			_items[circleName] = "circle";

			circleObj._map = this;
			circleObj._name = circleName;

			var params = '{"itemName":"' + circleName + '","nLatitude":' + circleObj.latitude + ',"nLongitude":' + circleObj.longitude + ',"radius":' + circleObj.radius + ',"visible":"' + circleObj.visible + '"}';

			if (elem) {
				elem._setCircle(params);
			}
		};

		_pGoogleMap.removeItem = function (strItemID) {
			var ifrm_elem = this._ifrm_elem;

			if (strItemID == null) {
				return false;
			}

			if (strItemID == "") {
				return false;
			}

			if (typeof (this.items[strItemID]) == "undefined") {
				this.on_fire_onerror(this, "onerror", "1502", "item is not exist.");
				return false;
			}
			else {
				delete this.items[strItemID];

				for (var i = 0; i < this.items.length; i++) {
					if (this.items[i] == strItemID) {
						var position = this.items.indexOf(this.items[i]);
						this.items.splice(position, i + 1);
					}
				}

				if (this.bLoaded) {
					_pGoogleMap._removeItem(ifrm_elem, strItemID);
				}

				return true;
			}
		};

		_pGoogleMap._removeItem = function (elem, itemname) {
			var params = '{"item":"' + _items[itemname] + '","itemname":"' + itemname + '"}';

			if (elem) {
				elem._setRemove(params);
			}

			delete _items[itemname];
			for (var i = 0; i < _itemsname.length; i++) {
				if (_itemsname[i] == itemname) {
					_itemsname.splice(i + 1, i + 1);
				}
			}
			return true;
		};

		_pGoogleMap.on_load_handler = function (id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
			this.on_fire_onload(this, id, centerlocation, coordinates, viewmode, zoomlevel, addresses);
		};

		_pGoogleMap.on_error_handler = function (id, code, msg) {
			this.on_fire_onerror(this, id, code, msg);
		};

		_pGoogleMap.on_recvsuccess_handler = function (id, centerlocation, coordinates, viewmode, zoomlevel, addresses) {
			this.on_fire_onrecvsuccess(this, id, centerlocation, coordinates, viewmode, zoomlevel, addresses);
		};

		_pGoogleMap.on_centerchanged_handler = function (id, centerlocation, viewmode, zoomlevel, addresses) {
			this.on_fire_oncenterchanged(this, id, centerlocation, viewmode, zoomlevel, addresses);
		};

		_pGoogleMap.on_click_handler = function (id, location) {
			this.on_fire_onclick(this, id, location);
		};

		_pGoogleMap.on_drag_handler = function (id, location) {
			this.on_fire_ondrag(this, id, location);
		};

		_pGoogleMap.on_mapdragstart_handler = function (id, location) {
			this.on_fire_onmapdragstart(this, id, location);
		};

		_pGoogleMap.on_mapdrag_handler = function (id, location) {
			this.on_fire_onmapdrag(this, id, location);
		};

		_pGoogleMap.on_mapdragend_handler = function (id, location) {
			this.on_fire_onmapdragend(this, id, location);
		};

		_pGoogleMap.callMethod = function (func) {
			if (this._ifrm_elem) {
				this._ifrm_elem.callScriptMethod(func);
			}
		};

		if (!nexacro.GoogleMapMarker) {
			nexacro.GoogleMapMarker = function (name) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;

				this.name = name || "";
				this._type = 0;
				this.longitude = 0;
				this.latitude = 0;
				this.text = "";
				this.imageurl = "";
				this.visible = true;
				this.draggable = false;

				this.style = {
					_GoogleMapMarkerID : 0, 
					set_parentID : function (_id) {
						this._GoogleMapMarkerID = _id;
					}, 
					align : {
						_GoogleMapMarkerID : 0, 
						set_parentID : function (_id) {
							this._GoogleMapMarkerID = _id;
						}, 
						halign : "center", 
						valign : "middle", 
						set_halign : function (v) {
							var _v = v.toString().split(" ").join("").toLowerCase();
							if (_v == "left" || _v == "center" || _v == "right") {
								this.halign = _v;

								return true;
							}
							else {
								return false;
							}
						}, 
						set_valign : function (v) {
							var _v = v.toString().split(" ").join("").toLowerCase();
							if (_v == "top" || _v == "middle" || _v == "bottom") {
								this.valign = _v;

								return true;
							}
							else {
								return false;
							}
						}, 
						$s : function (name, fnname, val) {
							this[name] = val;
						}
					}, 

					set_align : function (v) {
						var v_arr = v.split(" ");
						var ret = true;
						if (v_arr.length != 2) {
							return false;
						}
						ret = this.align.set_halign(v_arr[0]);
						if (!ret) {
							return ret;
						}
						ret = this.align.set_valign(v_arr[1]);

						return ret;
					}, 
					$s : function (name, fnname, val) {
						this[name] = val;
					}
				};

				this._name = null;
			};

			var _pGoogleMapMarker = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapMarker);
			nexacro.GoogleMapMarker.prototype = _pGoogleMapMarker;
			_pGoogleMapMarker._type_name = "GoogleMapMarker";

			_pGoogleMapMarker.set_longitude = function (v) {
				try {
					this.longitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapMarker.set_latitude = function (v) {
				try {
					this.latitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapMarker.set_text = function (v) {
				this.text = v;
				return true;
			};

			_pGoogleMapMarker.set_imageurl = function (v) {
				if (v) {
					this._type = 1;
				}
				else {
					this._type = 0;
				}
				this.imageurl = v;
				return true;
			};

			_pGoogleMapMarker.set_draggable = function (v) {
				if (v == null) {
					return false;
				}
				else if (v) {
					if (v == true || (typeof (v) == "string" && v == "true")) {
						this.draggable = true;
					}
					else if (v == false || (typeof (v) == "string" && v == "false")) {
						this.draggable = false;
					}
				}
				else {
					return false;
				}
			};

			_pGoogleMapMarker.set_visible = function (v) {
				this.visible = nexacro._toBoolean(v);
				return true;
			};
		}

		if (!nexacro.GoogleMapPolyline) {
			nexacro.GoogleMapPolyline = function (name) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";

				this._type = 2;
				this.locationdata = "";
				this.visible = true;
				this.linewidth = "";
				this.linecolor = "";

				this._name = null;
			};

			var _pGoogleMapPolyline = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolyline);
			nexacro.GoogleMapPolyline.prototype = _pGoogleMapPolyline;
			_pGoogleMapPolyline._type_name = "GoogleMapPolyline";

			_pGoogleMapPolyline.set_locationdata = function (v) {
				var _lat_lng_arr = v.toString().split("]");
				if (_lat_lng_arr.length < 2) {
					return false;
				}

				this.locationdata = v;
				return true;
			};

			_pGoogleMapPolyline.set_linewidth = function (v) {
				try {
					this.linewidth = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapPolyline.set_linecolor = function (v) {
				this.linecolor = v;
				return true;
			};

			_pGoogleMapPolyline.set_visible = function (v) {
				this.visible = nexacro._toBoolean(v);
				return true;
			};
		}

		if (!nexacro.GoogleMapPolygon) {
			nexacro.GoogleMapPolygon = function (name) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";

				this._type = 3;

				this.locationdata = "";
				this.visible = true;
				this.linewidth = "";
				this.linecolor = "";
				this.fillbrushcolor = "";

				this._name = null;
			};

			var _pGoogleMapPolygon = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolygon);
			nexacro.GoogleMapPolygon.prototype = _pGoogleMapPolygon;
			_pGoogleMapPolygon._type_name = "GoogleMapPolygon";

			_pGoogleMapPolygon.set_locationdata = function (v) {
				var _lat_lng_arr = v.toString().split("]");
				if (_lat_lng_arr.length < 2) {
					return false;
				}

				this.locationdata = v;
				return true;
			};

			_pGoogleMapPolygon.set_linewidth = function (v) {
				try {
					this.linewidth = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapPolygon.set_linecolor = function (v) {
				this.linecolor = v;
				return true;
			};

			_pGoogleMapPolygon.set_fillbrushcolor = function (v) {
				this.fillbrushcolor = v;
				return true;
			};

			_pGoogleMapPolygon.set_visible = function (v) {
				this.visible = nexacro._toBoolean(v);
				return true;
			};
		}

		if (!nexacro.GoogleMapCircle) {
			nexacro.GoogleMapCircle = function (name) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";

				this._type = 4;
				this.longitude = 0;
				this.latitude = 0;

				this.radius = 100;
				this.visible = true;
				this._name = null;
			};

			var _pGoogleMapCircle = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapCircle);
			nexacro.GoogleMapCircle.prototype = _pGoogleMapCircle;
			_pGoogleMapCircle._type_name = "GoogleMapCircle";

			_pGoogleMapCircle.set_longitude = function (v) {
				try {
					this.longitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapCircle.set_latitude = function (v) {
				try {
					this.latitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}
				return true;
			};

			_pGoogleMapCircle.set_visible = function (v) {
				this.visible = nexacro._toBoolean(v);
				return true;
			};

			_pGoogleMapCircle.set_radius = function (v) {
				this.radius = (v == null) ? 100 : Number(v.toString());
			};
		}
	}
	else if ((nexacro.Device && nexacro._OS != "Windows") || nexacro._Browser != "Runtime" && !(nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)) {
		nexacro.googlemaps_loaded = false;
		nexacro.googlemaps_callback = function () {
			nexacro.googlemaps_loaded = true;
		};

		nexacro.load_googlemaps = function (googleapikey, language, region) {
			if (nexacro.googlemaps_loaded) {
				return;
			}

			var script = document.createElement("script");
			var params = "";
			script.type = "text/javascript";

			if (googleapikey) {
				params += "key=" + googleapikey + "&";
			}
			if (language) {
				params += "language=" + language + "&";
			}
			if (region) {
				params += "region=" + region + "&";
			}

			params += "callback=nexacro.googlemaps_callback";

			script.src = "https://maps.googleapis.com/maps/api/js?" + params;

			document.body.appendChild(script);
		};

		nexacro.GoogleMap = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = id || "";

			this.latitude = 0;
			this.longitude = 0;
			this.centerlocation = {
				latitude : 0, 
				longitude : 0
			};

			this.location = {
				latitude : 0, 
				longitude : 0
			};

			this.coordinates = {
				latitude : 0, 
				longitude : 0
			};

			this._map_elem = null;
			this._google_map = null;
			this.maptype = 0;
			this.viewmode = 0;
			this.zoomlevel = 15;
			this.zoomalign_halign = "left";
			this.zoomalign_valign = "top";
			this.showmode = false;
			this.showzoom = false;
			this.shownavigator = false;
			this.showmapscale = false;
			this.enableevent = true;

			this.apikey = null;

			this.language = undefined;
			this.region = undefined;

			this.items = [];
			this.itemsname = [];

			this._itemsname = [];
			this._items = [];
			this._infowindowname = [];
			this._infowindow = [];

			this.bSensor = false;

			this.bLoaded = false;
			this.enable = true;
			this.draggable = false;
			this.googleloaded = null;

			this._event_list = {
				"onclick" : 1, 
				"ondblclick" : 1, 
				"onkeypress" : 1, 
				"onkeydown" : 1, 
				"onkeyup" : 1, 
				"onkillfocus" : 1, 
				"onsetfocus" : 1, 
				"ondragstart" : 1, 
				"ondrag" : 1, 
				"ondragenter" : 1, 
				"ondragleave" : 1, 
				"ondragmove" : 1, 
				"ondragend" : 1, 
				"ondrop" : 1, 
				"onlbuttondown" : 1, 
				"onlbuttonup" : 1, 
				"onmouseenter" : 1, 
				"onmouseleave" : 1, 
				"onmousemove" : 1, 
				"onmove" : 1, 
				"onsize" : 1, 
				"onrbuttondown" : 1, 
				"onrbuttonup" : 1, 
				"onload" : 1, 
				"onrecvsuccess" : 1, 
				"onoverlayclick" : 1, 
				"oncenterchanged" : 1, 
				"onviewmodechanged" : 1, 
				"onzoomchanged" : 1, 
				"onmapdragstart" : 1, 
				"onmapdrag" : 1, 
				"onmapdragend" : 1, 
				"onerror" : 1, 
				"ondevicebuttonup" : 1
			};
		};

		var _pGoogleMap = nexacro._createPrototype(nexacro.Component, nexacro.GoogleMap);
		nexacro.GoogleMap.prototype = _pGoogleMap;
		_pGoogleMap._type_name = "GoogleMap";

		_itemsname = [];
		_items = [];
		_infowindowname = [];
		_infowindow = [];

		_pGoogleMap.on_create_contents = function () {
			var control_elem = this.getElement();
			if (control_elem) {
				this._map_elem = new nexacro.Element(control_elem);
				this._map_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			}
		};

		_pGoogleMap.on_create_contents_command = function () {
			var control_elem = this.getElement();
			if (control_elem) {
				this._map_elem = new nexacro.Element(control_elem);
				this._map_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				this._map_elem.setElementTypeCSSSelector("nexamap");

				return this._map_elem.createCommand();
			}
			return "";
		};

		_pGoogleMap.on_attach_contents_handle = function (win) {
			if (this._map_elem) {
				this._map_elem.attachHandle(win);
			}
		};

		_pGoogleMap.on_created_contents = function (win) {
			var map_elem = this._map_elem;
			if (map_elem) {
				map_elem.setElementTypeCSSSelector("nexamap");
				map_elem.create(win);

				this.document = map_elem._document;
				this.window = map_elem._winodw;
			}
		};

		_pGoogleMap.on_destroy_contents = function () {
			var map_elem = this._map_elem;
			if (map_elem) {
				map_elem.destroy();
				this._map_elem = null;
			}
		};

		_pGoogleMap.on_change_containerRect = function (width, height) {
			var map_elem = this._map_elem;
			if (map_elem) {
				map_elem.setElementSize(width, height);
			}
		};

		_pGoogleMap.on_apply_text = function () {
			var control_elem = this._control_element;
			if (this._control_element) {
				var text_elem = this._text_elem;
				if (!text_elem) {
					text_elem = new nexacro.TextBoxElement(control_elem);
					this._text_elem = text_elem;
					text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
					text_elem.setElementColor(this.currentstyle.color);
					text_elem.setElementFont(this.currentstyle.font);
					text_elem.setElementAlign(this.currentstyle.align);

					if (this._is_created) {
						text_elem.create();
					}
				}

				if (this.text != "") {
					text_elem.setElementText(this.text);
					this._text_width = -1;
					this._text_height = -1;
					if (this._img_elem) {
						this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
					}
				}
				else {
					text_elem.setElementText("");
					this._text_width = 0;
					this._text_height = 0;
					if (this._img_elem) {
						this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
					}
				}
			}
		};

		_pGoogleMap.on_apply_expr = function () {
			var control = this.getElement();
			var expr = this.expr;

			if (control && expr.length > 0) {
				expr = expr.trim().split(":");
				var len = expr.length;
				var parser = new nexacro.ExprParser();
				var conv_expr, exprfn;
				var str;

				if (len == 1) {
					str = expr[0];
				}
				else {
					if (expr[0].trim().toUpperCase() != "EXPR") {
						str = expr.join(":");
					}
					else {
						str = expr.slice(1).join(":");
					}
				}

				conv_expr = parser.makeExpr(this, str);
				exprfn = nexacro._createInlineFunc(conv_expr, []);

				if (exprfn) {
					try {
						this.set_text(exprfn.call(this));
					}
					catch (e) {
						return;
					}
				}
			}
		};

		_pGoogleMap.on_apply_prop_taborder = function () {
			var textElem = this._text_elem;
			if (textElem) {
				if (this.tabstop) {
					textElem.setElementTabIndex(this.taborder);
				}
				else {
					textElem.setElementTabIndex(-1);
				}
			}
		};

		_pGoogleMap.set_draggable = function (v) {
			if (v == null) {
				return false;
			}
			else if (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.draggable = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.draggable = false;
				}
			}
			else {
				return false;
			}
		};

		_pGoogleMap.set_zoomalign = function (name, val) {
			if (name == "halign") {
				this.zoomalign_halign = val;
			}
			else if (name == "valign") {
				this.zoomalign_valign = val;
			}
			else {
				return false;
			}

			this.zoomalign = this._getalign(this.zoomalign_halign, this.zoomalign_valign);

			this._google_map_option_test = {
				zoomControlOptions : {
					position : this.zoomalign, 
					style : google.maps.ZoomControlStyle.DEFAULT
				}
			};

			return true;
		};

		_pGoogleMap.set_enableevent = function (v) {
			this.enableevent = nexacro._toBoolean(v);
			return v;
		};

		_pGoogleMap.set_viewmode = function (v) {
			if (v != null) {
				this.viewmode = v;
				if (this.bLoaded) {
					this._google_map_option = {
						mapTypeId : this._getMapType(this.viewmode)
					};
					this._google_map.setOptions(this._google_map_option);
				}
				return true;
			}
			else {
				return false;
			}
		};

		_pGoogleMap.set_showmode = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showmode = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showmode = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					this._google_map_option_test = {
						mapTypeControl : this.showmode, 
						mapTypeControlOptions : {
							style : google.maps.MapTypeControlStyle.DEFAULT, 
							position : this.modealign
						}
					};

					this._google_map.setOptions(this._google_map_option_test);
				}
				return true;
			}
		};

		_pGoogleMap.set_showmapscale = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showmapscale = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showmapscale = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					this._google_map_option_test = {
						mapTypeControl : this.showmapscale
					};

					this._google_map.setOptions(this._google_map_option_test);
				}
				return true;
			}
		};

		_pGoogleMap.set_showmapscale = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showmapscale = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showmapscale = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					this._google_map_option_test = {
						scaleControl : this.showmapscale
					};
					this._google_map.setOptions(this._google_map_option_test);
				}
				return true;
			}
		};

		_pGoogleMap.set_shownavigator = function (v) {
			if (v != null) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.shownavigator = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.shownavigator = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					this._google_map_option_test = {
						panControl : this.shownavigator
					};
					this._google_map.setOptions(this._google_map_option_test);
				}
				return true;
			}
		};

		_pGoogleMap.set_apikey = function (v) {
			if (v == null) {
				return false;
			}

			this.apikey = v;
		};

		_pGoogleMap.set_language = function (v) {
			v = nexacro._toString(v);
			this.language = v;
		};

		_pGoogleMap.set_region = function (v) {
			v = nexacro._toString(v);
			this.region = v;
		};

		_pGoogleMap.set_zoomlevel = function (v) {
			this.zoomlevel = Number(v.toString());
		};

		_pGoogleMap.set_enable = function (v) {
			if (v == null) {
				return false;
			}
			else if (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.enable = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.enable = false;
				}
				if (this.bLoaded) {
					this._google_map_option = {
						draggable : this.enable
					};
					this._google_map.setOptions(this._google_map_option);
				}
				return true;
			}
			else {
				return false;
			}
		};

		_pGoogleMap.set_showzoom = function (v) {
			if (v == null) {
				return false;
			}

			if (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.showzoom = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.showzoom = false;
				}
				else {
					return false;
				}

				if (this.bLoaded) {
					this._google_map_option_test = {
						center : new google.maps.LatLng(this.centerlocation.latitude, this.centerlocation.longitude), 
						zoomControl : this.showzoom
					};
					this._google_map.setOptions(this._google_map_option_test);
				}
				return true;
			}
		};

		_pGoogleMap.load = function (bUseSensor, nLatitude, nLongitude, constViewMode, nZoomLevel, retry) {
			var google_map = this._google_map;
			if (nexacro.googlemaps_loaded == false) {
				if (!retry) {
					nexacro.load_googlemaps(this.apikey, this.language, this.region);
				}

				var target = this;
				nexacro._OnceCallbackTimer.callonce(target, function () {
					target.load(bUseSensor, nLatitude, nLongitude, constViewMode, nZoomLevel, true);
				}, 500);

				return;
			}

			this._id = nexacro.Device.makeID();
			var parentMap = nexacro.Device._userCreatedObj[this._id] = this;

			var strlength = 0;
			var myLatlng;

			if (nZoomLevel) {
				try {
					strlength = nZoomLevel.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}

				if (nZoomLevel.length == 0) {
					return false;
				}

				var nzoom = 0;
				try {
					nzoom = Number(nZoomLevel.toString());
				}
				catch (e) {
					return false;
				}

				if (nzoom >= 0) {
					this.zoomlevel = nzoom;
				}
				else {
					return false;
				}
			}

			if (constViewMode) {
				if (constViewMode == 0 || (typeof (constViewMode) == "string" && constViewMode == "0")) {
					this.viewmode = 0;
				}
				else if (constViewMode == 1 || (typeof (constViewMode) == "string" && constViewMode == "1")) {
					this.viewmode = 1;
				}
				else if (constViewMode == 2 || (typeof (constViewMode) == "string" && constViewMode == "2")) {
					this.viewmode = 2;
				}
				else if (constViewMode == 3 || (typeof (constViewMode) == "string" && constViewMode == "3")) {
					this.viewmode = 3;
				}
				else {
					return false;
				}
			}
			else {
				this.viewmode = 0;
			}

			if (nLatitude && nLongitude) {
				strlength = 0;
				try {
					strlength = nLatitude.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}
				if (strlength.length == 0) {
					return false;
				}
				try {
					strlength = nLongitude.toString().split(" ").join("");
				}
				catch (e) {
					return false;
				}
				if (strlength.length == 0) {
					return false;
				}

				var nlat = 0;
				var nlon = 0;
				try {
					nlat = Number(nLatitude.toString());
				}
				catch (e) {
					return false;
				}

				if (nlat != nlat) {
					return false;
				}
				try {
					nlon = Number(nLongitude.toString());
				}
				catch (e) {
					return false;
				}

				if (nlon != nlon) {
					return false;
				}
				this.centerlocation.latitude = nlat;
				this.centerlocation.longitude = nlon;
				this.latitude = nlat;
				this.longitude = nlon;

				_pGoogleMap.centerlocation = {
					latitude : nlat, 
					longitude : nlon
				};
			}

			if (bUseSensor) {
				if (bUseSensor == true || (typeof (bUseSensor) == "string" && bUseSensor == "true")) {
					this.bSensor = true;
				}
				else {
					this.bSensor = false;
				}

				if (constViewMode == null) {
					this.viewmode = 0;
				}
			}
			else {
				this.bSensor = false;
			}

			var map_elem = this._map_elem;
			if (map_elem) {
				map_elem.create();
			}

			if (this.bSensor) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						google_map.setCenter(initialLocation);
					}, function () {
						parentMap._apply_onerror({
							errorcode : "1503", 
							errormsg : "Device provider disable"
						});
					});
				}
				else if (google.gears) {
					var geo = google.gears.factory.create('beta.geolocation');
					geo.getCurrentPosition(function (position) {
						var initialLocation = new google.maps.LatLng(position.latitude, position.longitude);

						myLatlng = new google.maps.LatLng(position.latitude, position.longitude);
						google_map.setCenter(initialLocation);
					}, function () {
						parentMap._apply_onerror({
							errorcode : "1503", 
							errormsg : "Device provider disable"
						});
					});
					return false;
				}
			}
			else {
				myLatlng = new google.maps.LatLng(this.centerlocation.latitude, this.centerlocation.longitude);
			}

			this._google_map_option = {
				center : myLatlng, 
				panControl : this.shownavigator, 
				zoomControl : this.showzoom, 
				mapTypeControl : this.showmode, 
				scaleControl : this.showmapscale, 
				zoom : this.zoomlevel, 
				disableDefaultUI : true, 
				draggable : this.enable, 
				mapTypeId : _pGoogleMap._getMapType(this.viewmode)
			};

			google_map = new google.maps.Map(map_elem.handle, this._google_map_option);
			this._google_map = google_map;
			_pGoogleMap._google_map = this._google_map;

			for (var i = 0; i < this.itemsname.length; i++) {
				if (this.items[this.itemsname[i]]._type == 0 || this.items[this.itemsname[i]]._type == 1) {
					_pGoogleMap.addMarker(this.itemsname[i], this.items[this.itemsname[i]]);
				}
				else if (this.items[this.itemsname[i]]._type == 2) {
					_pGoogleMap.addPolyline(this.itemsname[i], this.items[this.itemsname[i]]);
				}
				else if (this.items[this.itemsname[i]]._type == 3) {
					_pGoogleMap.addPolygon(this.itemsname[i], this.items[this.itemsname[i]]);
				}
				else if (this.items[this.itemsname[i]]._type == 4) {
					_pGoogleMap.addCircle(this.itemsname[i], this.items[this.itemsname[i]]);
				}
			}

			google.maps.event.addListener(google_map, 'click', function (e) {
				if (parentMap.onclick && parentMap.onclick._has_handlers && parentMap.enableevent) {
					parentMap.location.latitude = e.latLng.lat();
					parentMap.location.longitude = e.latLng.lng();

					var evt = new nexacro.GoogleMapClickEventInfo(parentMap, "onclick", parentMap.location);

					parentMap.onclick._fireEvent(this, evt);
				}
				return true;
			});

			google.maps.event.addListenerOnce(google_map, 'tilesloaded', function () {
				parentMap.bLoaded = true;
				parentMap._apply_onload();

				google.maps.event.addListenerOnce(google_map, 'tilesloaded', function () {
				});
			});

			google.maps.event.addListener(google_map, 'dragstart', function (e) {
			});

			google.maps.event.addListener(google_map, 'mouseout', function (e) {
			});

			google.maps.event.addListener(google_map, 'dragenter', function (e) {
			});

			google.maps.event.addListener(google_map, 'drag', function (e) {
			});

			google.maps.event.addListener(google_map, 'dragend', function (e) {
			});

			google.maps.event.addListener(google_map, 'center_changed', function (e) {
				var center_lat = google_map.getCenter().lat();
				var center_lng = google_map.getCenter().lng();

				parentMap.centerlocation.latitude = center_lat;
				parentMap.centerlocation.longitude = center_lng;
				parentMap.latitude = center_lat;
				parentMap.longitude = center_lng;

				if (parentMap.oncenterchanged && parentMap.oncenterchanged._has_handlers && parentMap.enableevent) {
					var evt = new nexacro.GoogleMapEventInfo(parentMap, "oncenterchanged", parentMap.centerlocation, parentMap.coordinates, parentMap.viewmode, parentMap.zoomlevel, parentMap.addresses);

					parentMap.oncenterchanged._fireEvent(this, evt);
				}
				return true;
			});

			google.maps.event.addListener(google_map, 'maptypeid_changed', function (e) {
				if (parentMap.onviewmodechanged && parentMap.onviewmodechanged._has_handlers && parentMap.enableevent) {
					var evt = new nexacro.GoogleMapEventInfo(parentMap, "onviewmodechanged", parentMap.centerlocation, parentMap.coordinates, parentMap.viewmode, parentMap.zoomlevel, parentMap.addresses);

					parentMap.onviewmodechanged._fireEvent(this, evt);
				}
				return true;
			});

			google.maps.event.addListener(google_map, 'zoom_changed', function (e) {
				if (parentMap.onzoomchanged && parentMap.onzoomchanged._has_handlers && parentMap.enableevent) {
					parentMap.zoomlevel = google_map.getZoom();

					var evt = new nexacro.GoogleMapEventInfo(parentMap, "onzoomchanged", parentMap.centerlocation, parentMap.coordinates, parentMap.viewmode, parentMap.zoomlevel, parentMap.addresses);

					parentMap.onzoomchanged._fireEvent(this, evt);
				}
				return true;
			});

			return true;
		};

		_pGoogleMap.setMarkerLoc = function (strItemID, lat, lng) {
			this.items[strItemID].location.latitude = lat;

			this.items[strItemID].location.longitude = lng;
		};

		_pGoogleMap.getAddress = function (nLatitude, nLongitude, nMaxResultCount, strLocale) {
			if (nLatitude == null || nLongitude == null || nMaxResultCount < 0) {
				return false;
			}


			if (nMaxResultCount == null) {
				nMaxResultCount = 1;
			}

			var params = '{"nLatitude":"' + nLatitude + '","nLongitude":"' + nLongitude + '","nMaxResultCount":"' + nMaxResultCount + '","strLocale":"' + strLocale + '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"NexacroMap", "method":"getAddress", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		};

		_pGoogleMap.getCoordinates = function (strAddress) {
			if (strAddress == null || strAddress == "") {
				return false;
			}

			var params = '{"straddress":"' + strAddress + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"NexacroMap", "method":"getCoordinates", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);

			return true;
		};

		_pGoogleMap.addItem = function (strItemID, objItem) {
			this._id = nexacro.Device.makeID();
			var parentMap = nexacro.Device._userCreatedObj[this._id] = this;

			if (strItemID == null || objItem == null) {
				return false;
			}

			if (strItemID == "" || objItem == "" || objItem == "undefined" || strItemID.trim() == "") {
				return false;
			}

			if (typeof (this.items[strItemID]) != "undefined") {
				this._apply_onerror({
					errorcode : "1501", 
					errormsg : "item is already exist."
				});
				return false;
			}

			if (objItem instanceof nexacro.GoogleMapMarker || objItem instanceof nexacro.GoogleMapPolyline || objItem instanceof nexacro.GoogleMapPolygon || objItem instanceof nexacro.GoogleMapCircle) {
				this.items[strItemID] = objItem;
				this.items.push(strItemID);

				if (this.bLoaded) {
					if (objItem._type == 0 || objItem._type == 1) {
						_pGoogleMap.addMarker(strItemID, objItem, parentMap, this);
					}
					else if (objItem._type == 2) {
						_pGoogleMap.addPolyline(strItemID, objItem);
					}
					else if (objItem._type == 3) {
						_pGoogleMap.addPolygon(strItemID, objItem);
					}
					else if (objItem._type == 4) {
						_pGoogleMap.addCircle(strItemID, objItem);
					}
				}
				return true;
			}
			else {
				return false;
			}
		};

		_pGoogleMap.setMarkerOptions = function (markName, markObj) {
			if (typeof (_infowindow[markName]) == "undefined") {
				var temp_infowindow = new google.maps.InfoWindow({
					content : ""
				});
				_infowindowname.push(markName);
				_infowindow[markName] = temp_infowindow;
			}

			var markerOpt;
			if (markObj.imageurl.length > 0) {
				var _v = markObj.imageurl.toString().split(" ").join("");
				var img_path = "";

				if (_v.substring(0, 9).toLowerCase() == "%userapp%") {
					img_path = "../" + _v.substring(9, _v.length);
				}
				else {
					img_path = _v;
				}

				markerOpt = {
					position : new google.maps.LatLng(markObj._location.latitude, markObj._location.longitude), 
					title : markObj.text, 
					visible : markObj.visible, 
					icon : img_path, 
					draggable : markObj.draggable
				};
			}
			else {
				markerOpt = {
					position : new google.maps.LatLng(markObj._location.latitude, markObj._location.longitude), 
					title : markObj.text, 
					visible : markObj.visible, 
					draggable : markObj.draggable
				};
			}

			var contentString = "<div title=\"\" style='width:100%;height:100%;'><div title=\"\" style='vertical-align:" + markObj.style.align.valign + ";text-align:" + markObj.style.align.halign + ";'>" + markObj.text + "</div></div>";
			_infowindow[markName].setContent(contentString);

			google.maps.event.addListener(_items[markName], 'click', function (e) {
				if (_items[markName].title.length > 0) {
					_infowindow[markName].open(_pGoogleMap._google_map, _items[markName]);
				}
			});

			google.maps.event.addListener(_items[markName], 'drag', function (e) {
			});

			google.maps.event.addListener(_pGoogleMap._google_map, 'click', function (e) {
				_infowindow[markName].close();
			});

			if (!markerOpt.visible && _infowindow[markName] != null) {
				_infowindow[markName].close();
			}

			_items[markName].setOptions(markerOpt);
		};

		_pGoogleMap.addMarker = function (markName, markObj, parentMap, obj) {
			if (typeof (_infowindow[markName]) == "undefined") {
				var temp_infowindow = new google.maps.InfoWindow({
					content : ""
				});
				_infowindowname.push(markName);
				_infowindow[markName] = temp_infowindow;
			}

			var contentString = "<div title=\"\" style='width:100%;height:100%;'><div title=\"\" style='vertical-align:" + markObj.style.align.valign + ";text-align:" + markObj.style.align.halign + ";'>" + markObj.text + "</div></div>";
			_infowindow[markName].setContent(contentString);

			var marker;
			if (markObj.imageurl.length > 0) {
				var _v = markObj.imageurl.toString().split(" ").join("");
				var img_path = "";

				if (_v.substring(0, 9).toLowerCase() == "%userapp%") {
					img_path = _v.substring(9, _v.length);
					if (img_path.charAt(0) != "/") {
						img_path = "/" + img_path;
					}
					img_path = nexacro.System.userapppath + img_path;
				}
				else {
					img_path = _v;
				}

				marker = new google.maps.Marker({
					position : new google.maps.LatLng(markObj._location.latitude, markObj._location.longitude), 
					title : markObj.text, 
					visible : markObj.visible, 
					icon : img_path, 
					draggable : markObj.draggable
				});
			}
			else {
				marker = new google.maps.Marker({
					position : new google.maps.LatLng(markObj._location.latitude, markObj._location.longitude), 
					title : markObj.text, 
					visible : markObj.visible, 
					draggable : markObj.draggable
				});
			}

			google.maps.event.addListener(marker, 'dragstart', function (e) {
				if (parentMap.onmapdragstart && parentMap.onmapdragstart._has_handlers && parentMap.enableevent) {
					markObj._location.latitude = marker.getPosition().lat();
					markObj._location.longitude = marker.getPosition().lng();

					var evt = new nexacro.GoogleMapDragEventInfo(parentMap, "onmapdragstart", markObj._location);
					parentMap.onmapdragstart._fireEvent(obj, evt);
				}
			});

			google.maps.event.addListener(marker, 'drag', function (e) {
				if (parentMap.onmapdrag && parentMap.onmapdrag._has_handlers && parentMap.enableevent) {
					markObj._location.latitude = marker.getPosition().lat();
					markObj._location.longitude = marker.getPosition().lng();

					var evt = new nexacro.GoogleMapDragEventInfo(parentMap, "onmapdrag", markObj._location);
					parentMap.onmapdrag._fireEvent(obj, evt);
				}
			});

			google.maps.event.addListener(marker, 'dragend', function (e) {
				if (parentMap.onmapdragend && parentMap.onmapdragend._has_handlers && parentMap.enableevent) {
					markObj._location.latitude = marker.getPosition().lat();
					markObj._location.longitude = marker.getPosition().lng();

					var evt = new nexacro.GoogleMapDragEventInfo(parentMap, "onmapdragend", markObj._location);
					parentMap.onmapdragend._fireEvent(obj, evt);
				}
			});

			google.maps.event.addListener(marker, 'click', function (e) {
				if (marker.title.length > 0) {
					_infowindow[markName].open(_pGoogleMap._google_map, marker);
				}
				_pGoogleMap.gmap_onoverlayclick(markObj, e.latLng.lat(), e.latLng.lng(), e.pixel.x, e.pixel.y);
			});

			google.maps.event.addListener(marker, 'drag', function (e) {
			});

			marker.setMap(_pGoogleMap._google_map);
			_pGoogleMap._google_map.setCenter(marker.getPosition());
			_itemsname.push(markName);
			_items[markName] = marker;
			markObj._map = this;
			markObj._name = markName;
		};

		_pGoogleMap.setPolygonOptions = function (polygonName, polygonObj) {
			var _path = [];
			var _lat_lng_arr, _lat, _lng, i;

			_lat_lng_arr = polygonObj.locationdata.toString().split("]");
			for (i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);
				if (_lat.length > 0 && _lng.length > 0) {
					_path.push(new google.maps.LatLng(Number(_lat), Number(_lng)));
				}
			}
			var _color_stroke;
			if (typeof (this.parent.nexacro._xreNamedColorList[polygonObj.linecolor]) != "undefined") {
				_color_stroke = this.parent.nexacro._xreNamedColorList[polygonObj.linecolor] + "FF";
			}
			else {
				_color_stroke = polygonObj.linecolor;
			}

			var _color_fill;
			if (typeof (this.parent.nexacro._xreNamedColorList[polygonObj.fillbrushcolor]) != "undefined") {
				_color_fill = this.parent.nexacro._xreNamedColorList[polygonObj.fillbrushcolor] + "FF";
			}
			else {
				_color_fill = polygonObj.fillbrushcolor;
			}

			var _alpha_stroke_1;
			var _alpha_stroke = 1.0;
			if (_color_stroke.length > 7) {
				_alpha_stroke_1 = parseInt(_color_stroke.substring(7), 16);
				_alpha_stroke = _alpha_stroke_1 / 255.0;
			}
			var _alpha_fill_1;
			var _alpha_fill = 1.0;
			if (_color_fill.length > 7) {
				_alpha_fill_1 = parseInt(_color_fill.substring(7), 16);
				_alpha_fill = _alpha_fill_1 / 255.0;
			}

			var polygonOpt = {
				paths : _path, 
				strokeColor : _color_stroke.substring(0, 7), 
				strokeOpacity : _alpha_stroke, 
				strokeWeight : polygonObj.linewidth, 
				fillColor : _color_fill.substring(0, 7), 
				fillOpacity : _alpha_fill, 
				visible : polygonObj.visible
			};

			google.maps.event.addListener(_items[polygonName], 'click', function (e) {
				_pGoogleMap.gmap_onoverlayclick(_items[polygonName], e.latLng.lat(), e.latLng.lng(), 0, 0);
			});
			_items[polygonName].setOptions(polygonOpt);
		};

		_pGoogleMap.addPolygon = function (polygonName, polygonObj) {
			var _path = [];
			var _lat_lng_arr, _lat, _lng;

			_lat_lng_arr = polygonObj.locationdata.toString().split("]");
			for (var i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);
				if (_lat.length > 0 && _lng.length > 0) {
					_path.push(new google.maps.LatLng(Number(_lat), Number(_lng)));
				}
			}

			var _color_stroke;
			if (typeof (nexacro._xreNamedColorList[polygonObj.linecolor]) != "undefined") {
				_color_stroke = nexacro._xreNamedColorList[polygonObj.linecolor] + "FF";
			}
			else {
				_color_stroke = polygonObj.linecolor;
			}

			var _color_fill;
			if (typeof (nexacro._xreNamedColorList[polygonObj.fillbrushcolor]) != "undefined") {
				_color_fill = nexacro._xreNamedColorList[polygonObj.fillbrushcolor] + "FF";
			}
			else {
				_color_fill = polygonObj.fillbrushcolor;
			}

			var _alpha_stroke_1;
			var _alpha_stroke = 1.0;
			if (_color_stroke.length > 7) {
				_alpha_stroke_1 = parseInt(_color_stroke.substring(7), 16);
				_alpha_stroke = _alpha_stroke_1 / 255.0;
			}
			var _alpha_fill_1;
			var _alpha_fill = 1.0;
			if (_color_fill.length > 7) {
				_alpha_fill_1 = parseInt(_color_fill.substring(7), 16);
				_alpha_fill = _alpha_fill_1 / 255.0;
			}

			var polygonPath = new google.maps.Polygon({
				paths : _path, 
				strokeColor : _color_stroke.substring(0, 7), 
				strokeOpacity : _alpha_stroke, 
				strokeWeight : polygonObj.linewidth, 
				fillColor : _color_fill.substring(0, 7), 
				fillOpacity : _alpha_fill, 
				visible : polygonObj.visible
			});

			polygonPath.setMap(_pGoogleMap._google_map);

			_itemsname.push(polygonName);
			_items[polygonName] = polygonPath;

			polygonObj._map = this;
			polygonObj._name = polygonName;

			google.maps.event.addListener(_items[polygonName], 'click', function (e) {
				_pGoogleMap.gmap_onoverlayclick(polygonObj, e.latLng.lat(), e.latLng.lng(), 0, 0);
			});
		};

		_pGoogleMap.setPolylineOptions = function (polylineName, polylineObj) {
			var _path = [];
			var _lat_lng_arr, _lat, _lng;

			_lat_lng_arr = polylineObj.locationdata.toString().split("]");
			for (var i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);
				if (_lat.length > 0 && _lng.length > 0) {
					_path.push(new google.maps.LatLng(Number(_lat), Number(_lng)));
				}
			}

			var _color;
			if (typeof (this.parent.nexacro._xreNamedColorList[polylineObj.linecolor]) != "undefined") {
				_color = this.parent.nexacro._xreNamedColorList[polylineObj.linecolor] + "FF";
			}
			else {
				_color = polylineObj.linecolor;
			}

			var _alpha_1;
			var _alpha = 1.0;
			if (_color.length > 7) {
				_alpha_1 = parseInt(_color.substring(7), 16);
				_alpha = _alpha_1 / 255.0;
			}
			var polyLineOpt = {
				path : _path, 
				strokeColor : _color.substring(0, 7), 
				strokeOpacity : _alpha, 
				strokeWeight : polylineObj.linewidth, 
				visible : polylineObj.visible
			};

			google.maps.event.addListener(_items[polylineName], 'click', function (e) {
				_pGoogleMap.gmap_onoverlayclick(_items[polylineName], e.latLng.lat(), e.latLng.lng(), 0, 0);
			});

			_items[polylineName].setOptions(polyLineOpt);
		};

		_pGoogleMap.addPolyline = function (polylineName, polylineObj) {
			var _path = [];
			var _lat_lng_arr, _lat, _lng;

			_lat_lng_arr = polylineObj.locationdata.toString().split("]");
			for (var i = 0; i < (_lat_lng_arr.length - 1); i++) {
				_lat = _lat_lng_arr[i].toString().split(",")[0].split(" ").join().substring(1);
				_lng = _lat_lng_arr[i].toString().split(",")[1].split(" ").join().substring(1);
				if (_lat.length > 0 && _lng.length > 0) {
					_path.push(new google.maps.LatLng(Number(_lat), Number(_lng)));
				}
			}

			var _color;
			if (typeof (nexacro._xreNamedColorList[polylineObj.linecolor]) != "undefined") {
				_color = nexacro._xreNamedColorList[polylineObj.linecolor] + "FF";
			}
			else {
				_color = polylineObj.linecolor;
			}

			var _alpha_1;
			var _alpha = 1.0;
			if (_color.length > 7) {
				_alpha_1 = parseInt(_color.substring(7), 16);
				_alpha = _alpha_1 / 255.0;
			}
			var polyLinePath = new google.maps.Polyline({
				path : _path, 
				strokeColor : _color.substring(0, 7), 
				strokeOpacity : _alpha, 
				strokeWeight : polylineObj.linewidth, 
				visible : polylineObj.visible
			});

			polyLinePath.setMap(_pGoogleMap._google_map);

			_itemsname.push(polylineName);
			_items[polylineName] = polyLinePath;

			polylineObj._map = this;
			polylineObj._name = polylineName;

			google.maps.event.addListener(_items[polylineName], 'click', function (e) {
				_pGoogleMap.gmap_onoverlayclick(polylineObj, e.latLng.lat(), e.latLng.lng(), 0, 0);
			});
		};

		_pGoogleMap.setCircleOptions = function (circleName, ciecleObj) {
			_items[circleName].setOptions(ciecleObj);
		};

		_pGoogleMap.addCircle = function (circleName, ciecleObj) {
			var circle = new google.maps.Circle({
				fillOpacity : 0, 
				strokeWeight : 1.5, 
				center : new google.maps.LatLng(ciecleObj.latitude, ciecleObj.longitude), 
				radius : ciecleObj.radius, 
				visible : ciecleObj.visible
			});

			circle.setMap(_pGoogleMap._google_map);

			_itemsname.push(circleName);
			_items[circleName] = circle;

			ciecleObj._map = this;
			ciecleObj._name = circleName;
		};

		_pGoogleMap.removeItem = function (strItemID) {
			if (strItemID == null) {
				return false;
			}
			if (strItemID == "") {
				return false;
			}

			if (typeof (this.items[strItemID]) == "undefined") {
				this._apply_onerror({
					errorcode : "1502", 
					errormsg : "item is not exist."
				});
				return false;
			}
			else {
				delete this.items[strItemID];

				for (var i = 0; i < this.items.length; i++) {
					if (this.items[i] == strItemID) {
						var position = this.items.indexOf(this.items[i]);
						this.items.splice(position, i + 1);
					}
				}

				if (this.bLoaded) {
					_pGoogleMap._removeItem(strItemID);
				}

				return true;
			}
		};

		_pGoogleMap.gmap_ondrag = function (lat, lng) {
			this.on_fire_ondragstart(this, new nexacro.GoogleMapDragEventInfo("ondrag"));
		};

		_pGoogleMap.gmap_ondragenter = function (objData) {
			this._fire_ondragenter(this, new nexacro.GoogleMapDragEventInfo("ondragenter"));
		};

		_pGoogleMap.gmap_ondragmove = function (lat, lng) {
			this._location.latitude = lat;
			this._location.longitude = lng;

			this.centerlocation.latitude = this._location.latitude;
			this.centerlocation.longitude = this._location.longitude;
			this.latitude = this._location.latitude;
			this.longitude = this._location.longitude;
		};

		_pGoogleMap.gmap_ondragleave = function (objData) {
			this._fire_ondragleave(this, new nexacro.GoogleMapDragEventInfo("ondragleave"));
		};

		_pGoogleMap.gmap_dragend = function (lat, lng) {
			this._location.latitude = lat;
			this._location.longitude = lng;
		};

		_pGoogleMap.gmap_onclick = function (lat, lng, x, y) {
			this._location.latitude = lat;
			this._location.longitude = lng;
			this._pixel.x = x;
			this._pixel.y = y;
			this.kindClick = "normalclick";
		};

		_pGoogleMap.gmap_onoverlayclick = function (fromobj, lat, lng, x, y) {
			this._location.latitude = lat;
			this._location.longitude = lng;
			this._pixel.x = x;
			this._pixel.y = y;
			this.overlayfromobj = fromobj;
			this.kindClick = "overlayclick";
		};

		_pGoogleMap._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		};

		_pGoogleMap._on_sys_click = function (node, e, bubble) {
			var event = e.changedTouches ? e.changedTouches[0] : e;
			nexacro.ajaxlog("_on_sys_click" + event.screenx + "," + event.screeny + ":" + node + ":" + event + ":" + bubble + "]");

			if (this.$IsReadyFireEvent() && this.$isEnable() && this.enableevent) {
				if (this.kindClick == "normalclick") {
					this._fire_onclick(node._comp, event);
				}
				else {
					if (this.kindClick == "overlayclick" && typeof (this.overlayfromobj) != "undefined") {
						this._fire_onoverlayclick(node._comp, event);
					}
				}
			}
			return true;
		};

		_pGoogleMap._fire_onclick = function (obj, e) {
			if (this.onclick._has_handlers && this.enableevent) {
				this.bClicked = false;
				var evt = new nexacro.GoogleMapClickEventInfo(this, obj, "onclick", e, this._location, this._pixel);
				return this.onclick._fireEvent(this, evt);
			}
			else {
				this.bClicked = true;
			}

			return false;
		};

		_pGoogleMap._fire_onoverlayclick = function (obj, e) {
			if (this.onoverlayclick && this.onoverlayclick._has_handlers && this.enableevent) {
				var evt = new nexacro.GoogleMapClickEventInfo(this, this.overlayfromobj, "onoverlayclick", e, this._location, this._pixel);
				return this.onoverlayclick._fireEvent(this, evt);
			}
		};

		_pGoogleMap._apply_onload = function () {
			if (this.enable == false) {
			}
			else if (this.enable == true) {
			}

			this.on_fire_onload(this);
		};

		_pGoogleMap.on_fire_onload = function (obj) {
			if (this.onload && this.onload._has_handlers && this.enableevent) {
				var evt = new nexacro.GoogleMapEventInfo(obj, "onload", this.centerlocation, this.coordinates, this.viewmode, this.zoomlevel, this.addresses);
				return this.onload._fireEvent(this, evt);
			}
		};

		_pGoogleMap._onrecvsuccess = function (objData) {
			if (this.enableevent) {
				if (objData.latitude == undefined || objData.latitude == null || objData.latitude == "" || objData.longitude == undefined || objData.longitude == null || objData.longitude == "") {
					this.on_fire_onrecvsuccess(this, objData.eventid, objData.addresses, this.coordinates);
				}
				else {
					this.coordinates.latitude = objData.latitude;
					this.coordinates.longitude = objData.longitude;

					this.on_fire_onrecvsuccess(this, objData.eventid, objData.addresses, this.coordinates);
				}
			}
		};

		_pGoogleMap.on_fire_onrecvsuccess = function (obj, id, addresses, coordinates) {
			if (this.enableevent) {
				var evt = new nexacro.GoogleMapEventInfo(obj, id, this.centerlocation, this.coordinates, this.viewmode, this.zoomlevel, addresses);
				return this.onrecvsuccess._fireEvent(this, evt);
			}
		};

		_pGoogleMap._apply_onerror = function (objData) {
			if (this.enableevent) {
				var _objData = nexacro._executeGlobalEvalStr(objData);
				this.on_fire_onerror(this, _objData);
			}
		};

		_pGoogleMap.on_fire_onerror = function (obj, e) {
			if (this.enableevent) {
				var evt = new nexacro.GoogleMapErrorEventInfo(this, "onerror", e.errorcode, e.errormsg);
				return this.onerror._fireEvent(this, evt);
			}
		};

		_pGoogleMap.__onDragEnter = function (obj, e) {
			console.debug("__ondragEnter");
		};


		_pGoogleMap._getalign = function (h, v) {
			if (h == "left") {
				if (v == "top") {
					return google.maps.ControlPosition.TOP_LEFT;
				}
				else if (v == "middle") {
					return google.maps.ControlPosition.LEFT;
				}
				else if (v == "bottom") {
					return google.maps.ControlPosition.LEFT_BOTTOM;
				}
			}
			else if (h == "center") {
				if (v == "top") {
					return google.maps.ControlPosition.TOP;
				}
				else if (v == "bottom") {
					return google.maps.ControlPosition.BOTTOM;
				}
			}
			else if (h == "right") {
				if (v == "top") {
					return google.maps.ControlPosition.TOP_LEFT;
				}
				else if (v == "middle") {
					return google.maps.ControlPosition.RIGHT;
				}
				else if (v == "bottom") {
					return google.maps.ControlPosition.RIGHT_BOTTOM;
				}
			}
		};

		_pGoogleMap._getMapType = function (v) {
			var __maptype;

			switch (v) {
				default:
				case 0:
					__maptype = google.maps.MapTypeId.ROADMAP;
					break;
				case 1:
					__maptype = google.maps.MapTypeId.SATELLITE;
					break;
				case 2:
					__maptype = google.maps.MapTypeId.HYBRID;
					break;
				case 3:
					__maptype = google.maps.MapTypeId.TERRAIN;
					break;
			}
			return __maptype;
		};

		_pGoogleMap.__map = function () {
			var obj = document.getElementById(this._id);
			var objDoc = obj.contentWindow || obj.contentDocument;
			return objDoc;
		};

		_pGoogleMap._set_option = function () {
			var _mapType = this._getMapType();

			return {
				center : new google.maps.LatLng(this.centerlocation.latitude, this.centerlocation.longitude), 
				mapTypeId : _mapType, 
				zoom : this.zoomlevel, 
				disableDefaultUI : true, 
				mapTypeControl : this.showmode, 
				mapTypeControlOptions : {
					style : google.maps.MapTypeControlStyle.DEFAULT, 
					position : this.modealign
				}, 
				scaleControl : this.showmapscale, 
				scaleControlOptions : {
					position : this.mapscalealign
				}, 
				panControl : this.shownavigator, 
				panControlOptions : {
					position : this.navigatoralign
				}, 
				zoomControl : this.showzoom, 
				zoomControlOptions : {
					position : this.zoomalign, 
					style : google.maps.ZoomControlStyle.SMALL
				}
			};
		};

		_pGoogleMap.map_starter = function (v) {
			this._google_map.setOptions(this.setOptions());
		};

		_pGoogleMap.__onTextchanged = function () {
		};

		_pGoogleMap._removeItem = function (itemname) {
			_items[itemname].setMap(null);
			var i;
			if (typeof (_items[itemname].title) != "undefined") {
				delete _infowindow[itemname];
				for (i = 0; i < _infowindow.length; i++) {
					if (_infowindowname[i] == itemname) {
						_infowindowname.splice(i + 1, i + 1);
					}
				}
			}
			delete _items[itemname];

			for (i = 0; i < _itemsname.length; i++) {
				if (_itemsname[i] == itemname) {
					_itemsname.splice(i + 1, i + 1);
				}
			}
			return true;
		};

		if (!nexacro.GoogleMapMarker) {
			nexacro.GoogleMapMarker = function (name, obj) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";
				this._type = 0;
				this.enableevent = true;
				this.longitude = 0;
				this.latitude = 0;

				this._location = {
					latitude : 0, 
					longitude : 0
				};

				this.text = "";
				this.visible = true;
				this.draggable = false;
				this.imageurl = "";

				this.style = {
					_GoogleMapMarkerID : 0, 
					set_parentID : function (_id) {
						this._GoogleMapMarkerID = _id;
					}, 
					align : {
						_GoogleMapMarkerID : 0, 
						set_parentID : function (_id) {
							this._GoogleMapMarkerID = _id;
						}, 
						halign : "center", 
						valign : "middle", 
						set_halign : function (v) {
							var _v = v.toString().split(" ").join("").toLowerCase();
							if (_v == "left" || _v == "center" || _v == "right") {
								this.halign = _v;
								var __parent = nexacro.Device._userCreatedObj[this._GoogleMapMarkerID];

								if (__parent._map != null) {
									__parent._map.setMarkerOptions(__parent._name, __parent);
								}
								return true;
							}
							else {
								return false;
							}
						}, 
						set_valign : function (v) {
							var _v = v.toString().split(" ").join("").toLowerCase();
							if (_v == "top" || _v == "middle" || _v == "bottom") {
								this.valign = _v;
								var __parent = nexacro.Device._userCreatedObj[this._GoogleMapMarkerID];
								if (__parent._map != null) {
									__parent._map.setMarkerOptions(__parent._name, __parent);
								}
								return true;
							}
							else {
								return false;
							}
						}, 
						$s : function (name, fnname, val) {
							var fn = this[fnname];
							if (fn) {
								return fn.call(this, val);
							}

							return (this[name] = val);
						}
					}, 
					image : "", 

					set_align : function (v) {
						var v_arr = v.split(" ");
						var ret = true;
						if (v_arr.length != 2) {
							return false;
						}
						ret = this.align.set_halign(v_arr[0]);
						if (!ret) {
							return ret;
						}
						ret = this.align.set_valign(v_arr[1]);
						var __parent = nexacro.Device._userCreatedObj[this._GoogleMapMarkerID];
						if (__parent._map != null) {
							__parent._map.setMarkerOptions(__parent._name, __parent);
						}
						return ret;
					}, 
					$s : function (name, fnname, val) {
						var fn = this[fnname];
						if (fn) {
							return fn.call(this, val);
						}

						return (this[name] = val);
					}
				};

				this._map = null;
				this._name = null;

				this.style.set_parentID(this._id);
				this.style.align.set_parentID(this._id);
			};
			var _pGoogleMapMarker = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapMarker);
			nexacro.GoogleMapMarker.prototype = _pGoogleMapMarker;
			_pGoogleMapMarker._type_name = "GoogleMapMarker";

			_pGoogleMapMarker.set_longitude = function (v) {
				try {
					this.longitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (this.longitude != this.longitude) {
					return false;
				}

				this._location.longitude = this.longitude;

				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}

				return true;
			};

			_pGoogleMapMarker.set_latitude = function (v) {
				try {
					this.latitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (this.latitude != this.latitude) {
					return false;
				}

				this._location.latitude = this.latitude;

				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}

				return true;
			};

			_pGoogleMapMarker.set_text = function (v) {
				this.text = v;
				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapMarker.set_draggable = function (v) {
				if (v == null) {
					return false;
				}
				else if (v) {
					if (v == true || (typeof (v) == "string" && v == "true")) {
						this.draggable = true;
					}
					else if (v == false || (typeof (v) == "string" && v == "false")) {
						this.draggable = false;
					}
				}
				else {
					return false;
				}
			};

			_pGoogleMapMarker.set_visible = function (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.visible = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.visible = false;
				}
				else {
					return false;
				}
				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapMarker.set_imageurl = function (v) {
				this._type = 1;
				this.imageurl = v;

				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}

				return true;
			};

			_pGoogleMapMarker.set_style = function (v) {
				var v_arr = v.split(";");
				var i;
				var _v_arr;
				var ret = true;
				for (i = 0; i < v_arr.length; i++) {
					_v_arr = v_arr[i].split(":");
					if (_v_arr.length != 2) {
						return false;
					}
					else if (_v_arr[0].split(" ").join("").toLowerCase() == "align") {
						ret = this.style.set_align(_v_arr[1]);
					}
					else {
						ret = false;
					}

					if (!ret) {
						return ret;
					}
				}
				if (this._map != null) {
					this._map.setMarkerOptions(this._name, this);
				}
				return ret;
			};

			nexacro._addRegisterClass("GoogleMapMarker", "nexacro.GoogleMapMarker");
		}

		if (!nexacro.GoogleMapPolyline) {
			nexacro.GoogleMapPolyline = function (name, obj) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";

				this._type = 2;
				this.locationdata = "";
				this.visible = true;
				this.linewidth = "";
				this.linecolor = "";
				this.enableevent = true;

				this._map = null;
				this._name = null;
			};

			var _pGoogleMapPolyline = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolyline);
			nexacro.GoogleMapPolyline.prototype = _pGoogleMapPolyline;
			_pGoogleMapPolyline._type_name = "GoogleMapPolyline";

			_pGoogleMapPolyline.set_locationdata = function (v) {
				var _lat_lng_arr;

				_lat_lng_arr = v.toString().split("]");

				if (_lat_lng_arr.length < 2) {
					return false;
				}

				this.locationdata = v;

				if (this._map != null) {
					this._map.setPolylineOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapPolyline.set_visible = function (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.visible = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.visible = false;
				}
				else {
					return false;
				}

				if (this._map != null) {
					this._map.setPolylineOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapPolyline.set_linewidth = function (v) {
				var nWidth = 0;
				try {
					nWidth = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (nWidth != nWidth) {
					return false;
				}
				this.linewidth = nWidth;

				if (this._map != null) {
					this._map.setPolylineOptions(this._name, this);
				}

				return true;
			};

			_pGoogleMapPolyline.set_linecolor = function (v) {
				this.linecolor = v;
				return true;
			};
		}

		if (!nexacro.GoogleMapPolygon) {
			nexacro.GoogleMapPolygon = function (name, obj) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";

				this._type = 3;
				this.locationdata = "";
				this.visible = true;
				this.linewidth = "";
				this.linecolor = "";
				this.fillbrushcolor = "";
				this.enableevent = true;

				this._map = null;
				this._name = null;
			};

			var _pGoogleMapPolygon = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolygon);
			nexacro.GoogleMapPolygon.prototype = _pGoogleMapPolygon;
			_pGoogleMapPolygon._type_name = "GoogleMapPolygon";

			_pGoogleMapPolygon.set_locationdata = function (v) {
				var _lat_lng_arr;

				_lat_lng_arr = v.toString().split("]");

				if (_lat_lng_arr.length < 2) {
					return false;
				}

				this.locationdata = v;
				if (this._map != null) {
					this._map.setPolygonOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapPolygon.set_visible = function (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.visible = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.visible = false;
				}
				else {
					return false;
				}

				if (this._map != null) {
					this._map.setPolygonOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapPolygon.set_linewidth = function (v) {
				var nWidth = 0;
				try {
					nWidth = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (nWidth != nWidth) {
					return false;
				}
				this.linewidth = nWidth;

				if (this._map != null) {
					this._map.setPolygonOptions(this._name, this);
				}

				return true;
			};

			_pGoogleMapPolygon.set_linecolor = function (v) {
				this.linecolor = v;
				return true;
			};

			_pGoogleMapPolygon.set_fillbrushcolor = function (v) {
				this.fillbrushcolor = v;
				return true;
			};
		}

		if (!nexacro.GoogleMapCircle) {
			nexacro.GoogleMapCircle = function (name, obj) {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
				this.name = name || "";
				this._type = 4;
				this.longitude = 0;
				this.latitude = 0;
				this.enableevent = true;
				this.visible = true;

				this._map = null;
				this._name = null;
				this.radius = 100;
			};
			var _pGoogleMapCircle = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapCircle);
			nexacro.GoogleMapCircle.prototype = _pGoogleMapCircle;
			_pGoogleMapCircle._type_name = "GoogleCircle";

			_pGoogleMapCircle.set_longitude = function (v) {
				try {
					this.longitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (this.longitude != this.longitude) {
					return false;
				}

				if (this._map != null) {
					this._map.setCircleOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapCircle.set_latitude = function (v) {
				try {
					this.latitude = Number(v.toString());
				}
				catch (e) {
					return false;
				}

				if (this.latitude != this.latitude) {
					return false;
				}

				if (this._map != null) {
					this._map.setCircleOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapCircle.set_visible = function (v) {
				if (v == true || (typeof (v) == "string" && v == "true")) {
					this.visible = true;
				}
				else if (v == false || (typeof (v) == "string" && v == "false")) {
					this.visible = false;
				}
				else {
					return false;
				}

				if (this._map != null) {
					this._map.setCircleOptions(this._name, this);
				}
				return true;
			};

			_pGoogleMapCircle.set_radius = function (v) {
				if (v == null) {
					this.radius = 100;
				}
				else {
					this.radius = Number(v.toString());
				}
			};
		}
	}
	else {
		nexacro.GoogleMap = function (id, left, top, width, height, right, bottom, parent) {
			nexacro.Component.call(this, id, left, top, width, height, right, bottom, parent);
		};

		var _pGoogleMap = nexacro._createPrototype(nexacro.Component, nexacro.GoogleMap);
		nexacro.GoogleMap.prototype = _pGoogleMap;
		_pGoogleMap._type_name = "GoogleMap";


		_pGoogleMap.showzoom = false;
		_pGoogleMap.language = undefined;
		_pGoogleMap.region = undefined;


		_pGoogleMap.set_viewmode = function (v) {
		};
		_pGoogleMap.set_zoomlevel = function (v) {
		};
		_pGoogleMap.set_showzoom = function (v) {
			v = nexacro._toBoolean(v);
			this.showzoom = v;
		};

		_pGoogleMap.set_shownavigator = function (v) {
		};
		_pGoogleMap.set_showcompass = function (v) {
		};
		_pGoogleMap.set_showmapscale = function (v) {
		};
		_pGoogleMap.set_centerlocation = function (v) {
		};
		_pGoogleMap.set_showmode = function (v) {
		};
		_pGoogleMap.set_zoomalign = function (v) {
		};
		_pGoogleMap.set_navigatoralign = function (v) {
		};
		_pGoogleMap.set_mapscalealign = function (v) {
		};
		_pGoogleMap.set_draggable = function (v) {
		};
		_pGoogleMap.set_apikey = function (v) {
			this.apikey = v;
		};

		_pGoogleMap.set_language = nexacro._emptyFn;
		_pGoogleMap.set_region = nexacro._emptyFn;

		_pGoogleMap.load = function (bUseSensor, nLatitude, nLongitude, constViewMode, nZoomLevel) {
		};
		_pGoogleMap.setMarkerLoc = function (strItemID, lat, lng) {
		};
		_pGoogleMap.getAddress = function (nLatitude, nLongitude, nMaxResultCount, strLocale) {
		};
		_pGoogleMap.getCoordinates = function (straddress) {
		};
		_pGoogleMap.addItem = function (strItemID, objComponent) {
		};
		_pGoogleMap.setMarkerOptions = function (markName, markObj) {
		};
		_pGoogleMap.addMarker = function (elem, markName, markObj) {
		};
		_pGoogleMap.addPolyline = function (elem, polylineName, polylineObj) {
		};
		_pGoogleMap.removeItem = function (strItemID) {
		};

		_pGoogleMap.on_fire_onclick = function () {
		};


		_pGoogleMap._removeItem = function (elem, itemname) {
		};

		if (!nexacro.GoogleMapMarker) {
			nexacro.GoogleMapMarker = function (name, obj) {
			};

			var _pGoogleMapMarker = nexacro.GoogleMapMarker.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapMarker);
			_pGoogleMapMarker._type_name = "GoogleMapMarker";

			_pGoogleMapMarker.set_latitude = function (v) {
			};
			_pGoogleMapMarker.set_longitude = function (v) {
			};
			_pGoogleMapMarker.set_text = function (v) {
			};
			_pGoogleMapMarker.set_draggable = function (v) {
			};
			_pGoogleMapMarker.set_visible = function (v) {
			};
			_pGoogleMapMarker.set_style = function (v) {
			};
		}

		if (!nexacro.GoogleMapPolyline) {
			nexacro.GoogleMapPolyline = function (name, obj) {
			};

			var _pGoogleMapPolyline = nexacro.GoogleMapPolyline.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolyline);
			_pGoogleMapPolyline._type_name = "GoogleMapPolyline";

			_pGoogleMapPolyline.set_locationdata = function (v) {
			};
			_pGoogleMapPolyline.set_linewidth = function (v) {
			};
			_pGoogleMapPolyline.set_linecolor = function (v) {
			};
			_pGoogleMapPolyline.set_visible = function (v) {
			};
		}

		if (!nexacro.GoogleMapPolygon) {
			nexacro.GoogleMapPolygon = function (name, obj) {
			};

			var _pGoogleMapPolygon = nexacro.GoogleMapPolygon.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapPolygon);
			_pGoogleMapPolygon._type_name = "GoogleMapPolygon";

			_pGoogleMapPolygon.set_locationdata = function (v) {
			};
			_pGoogleMapPolygon.set_linewidth = function (v) {
			};
			_pGoogleMapPolygon.set_linecolor = function (v) {
			};
			_pGoogleMapPolygon.set_fillbrushcolor = function (v) {
			};
			_pGoogleMapPolygon.set_visible = function (v) {
			};
		}

		if (!nexacro.GoogleMapCircle) {
			nexacro.GoogleMapCircle = function (name, obj) {
			};

			var _pGoogleMapCircle = nexacro.GoogleMapCircle.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.GoogleMapCircle);
			_pGoogleMapCircle._type_name = "GoogleMapCircle";

			_pGoogleMapCircle.set_latitude = function (v) {
			};
			_pGoogleMapCircle.set_longitude = function (v) {
			};
			_pGoogleMapCircle.set_radius = function (v) {
			};
			_pGoogleMapCircle.set_visible = function (v) {
			};
		}
	}

	delete _pGoogleMap;
	delete _pGoogleMapMarker;
	delete _pGoogleMapPolyline;
	delete _pGoogleMapPolygon;
	delete _pGoogleMapCircle;
}
