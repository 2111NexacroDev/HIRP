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

if (!nexacro.NormalDataset) {
	nexacro.NormalDataset = function (id, parent) {
		nexacro.Dataset.call(this, id, parent);

		this.url = "";
		this.arguments = "";
		this.serverdatasetid = "";
		this.firefirstcount = 0;
		this.firenextcount = 0;
		this.progressload = false;
		this.preload = false;

		this._is_preloaded = false;
		this._is_created = false;
	};

	var _pNormalDataset = nexacro._createPrototype(nexacro.Dataset, nexacro.NormalDataset);
	nexacro.NormalDataset.prototype = _pNormalDataset;

	nexacro.NormalDataset.ROWTYPE_EMPTY = 0;
	nexacro.NormalDataset.ROWTYPE_NORMAL = 1;
	nexacro.NormalDataset.ROWTYPE_INSERT = 2;
	nexacro.NormalDataset.ROWTYPE_UPDATE = 4;
	nexacro.NormalDataset.ROWTYPE_DELETE = 8;
	nexacro.NormalDataset.ROWTYPE_GROUP = 16;

	nexacro.NormalDataset.REASON_LOAD = 0;
	nexacro.NormalDataset.REASON_LOADPROCESS = 1;
	nexacro.NormalDataset.REASON_RESET = 2;
	nexacro.NormalDataset.REASON_LOADCONTENT = 3;

	nexacro.NormalDataset.REASON_ASSIGN = 10;
	nexacro.NormalDataset.REASON_COPY = 11;
	nexacro.NormalDataset.REASON_APPEND = 12;
	nexacro.NormalDataset.REASON_MERGE = 13;
	nexacro.NormalDataset.REASON_DELETE = 20;
	nexacro.NormalDataset.REASON_DELETEALL = 22;
	nexacro.NormalDataset.REASON_CLEARDATA = 23;
	nexacro.NormalDataset.REASON_CLEAR = 24;
	nexacro.NormalDataset.REASON_SORTGROUP = 30;
	nexacro.NormalDataset.REASON_FILTER = 31;
	nexacro.NormalDataset.REASON_MOVE = 32;
	nexacro.NormalDataset.REASON_EXCHANGE = 33;
	nexacro.NormalDataset.REASON_CHANGELAYOUT = 34;
	nexacro.NormalDataset.REASON_CHANGESTATUS = 40;
	nexacro.NormalDataset.REASON_ENABLEEVENT = 41;

	nexacro.NormalDataset.REASON_ROWCHANGE = 51;
	nexacro.NormalDataset.REASON_ROWINDEXCHANGE = 52;
	nexacro.NormalDataset.REASON_ROWOBJECTCHANGE = 53;

	nexacro.NormalDataset.REASON_BINDSOURCE = 90;

	nexacro.NormalDataset.REASON_BINDDATAOBJECT_UPDATE = 70;

	_pNormalDataset.on_created = function () {
		if (this.binddataobject && !this._binddataobject) {
			this._binddataobject = this._findDataObject(this.binddataobject);
			this._loadDataObject(false);
		}

		if (this.url == "" || this.preload == false) {
			if (this.colcount > 0) {
				this._endLoad(0, "SUCCESS", 3);
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
					var data = loadmanager.getPreloadDataModule(this.id);
					if (data) {
						var serverdatasetid = this.serverdatasetid;
						if (!serverdatasetid) {
							serverdatasetid = "output";
						}
						var outds = this.id + "=" + serverdatasetid;
						var tritem = new nexacro.TransactionItem(url, this.parent, svcid, "", outds, "", 0, true);
						tritem._usewaitcursor = false;
						tritem._loadFromData(data);
						this._is_preloaded = true;
					}
				}
			}
		}

		if (!this._is_created) {
			this._defaultKeyStr = this.keystring;
			this._defaultFilterStr = this.filterstr;
		}
		this._is_created = true;
	};

	_pNormalDataset.destroy = function () {
		nexacro.Dataset.prototype.destroy.call(this);
		this._refform = null;
	};



	_pNormalDataset.set_url = function (v) {
		this.url = v;
	};
	_pNormalDataset.set_arguments = function (v) {
		this.arguments = v;
	};

	_pNormalDataset.set_firefirstcount = function (v) {
		v = parseInt(v) | 0;
		if (isFinite(v)) {
			this.firefirstcount = v;
		}
	};

	_pNormalDataset.set_firenextcount = function (v) {
		v = parseInt(v) | 0;
		if (isFinite(v)) {
			this.firenextcount = v;
		}
	};

	_pNormalDataset.set_progressload = function (v) {
		this.progressload = nexacro._toBoolean(v);
	};

	_pNormalDataset.set_preload = function (v) {
		this.preload = nexacro._toBoolean(v);
	};
	_pNormalDataset.set_serverdatasetid = function (v) {
		this.serverdatasetid = v;
	};

	_pNormalDataset._getRowcount = function () {
		return this.rowcount;
	};

	_pNormalDataset.on_notify_onload_dataobject = function () {
		this._loadDataObject(true, 0);
	};

	_pNormalDataset.set_binddataobject = function (str) {
		if (str != this.binddataobject) {
			var binddataobject = this._binddataobject;
			if (binddataobject) {
				binddataobject._removeEventHandler("onload", this.on_notify_onload_dataobject, this);
			}
			if (!str) {
				this._binddataobject = null;
				this.binddataobject = "";
			}
			else {
				binddataobject = this._binddataobject = this._findDataObject(str);
				if (binddataobject) {
					binddataobject._setEventHandler("onload", this.on_notify_onload_dataobject, this);
				}
				this.binddataobject = str;
			}
			this.on_apply_binddataobject();
		}
		return this.binddataobject;
	};

	_pNormalDataset.on_apply_binddataobject = function () {
		if (this._is_created) {
			this._loadDataObject(true, 3);
		}
	};

	_pNormalDataset.set_dataobjectpath = function (v) {
		this.dataobjectpath = v;
		this.on_apply_dataobjectpath();
	};

	_pNormalDataset.on_apply_dataobjectpath = function (v) {
		var dataobject = this._binddataobject;
		if (this._is_created && dataobject) {
			this._loadDataObject(true, 3);
		}
	};

	_pNormalDataset.load = function (async, datatype) {
		var baseurl;
		if (this._refform) {
			baseurl = this._refform._getRefFormBaseUrl();
		}
		var url = nexacro._getServiceLocation(this.url, baseurl);

		if (url.length && this.parent) {
			var svcid = "__normaldataset_loadurl_" + this.id;
			var loadmanager = this.parent._load_manager;
			if (loadmanager) {
				var serverdatasetid = this.serverdatasetid;
				if (!serverdatasetid) {
					serverdatasetid = "output";
				}
				var outds = this.id + "=" + serverdatasetid;
				var service = nexacro._getServiceObject(this.url, true);
				loadmanager.loadDataModule(url, svcid, "", outds, this.arguments, null, async, datatype, false, service);
			}
		}
		else {
			this._endLoad(-1, "empty url", 3);
		}
	};


	_pNormalDataset.append = function (url) {
		this._append(url, true, 0);
	};

	_pNormalDataset._append = function (svcurl, async, datatype) {
		var baseurl;
		if (this._refform) {
			baseurl = this._refform._getRefFormBaseUrl();
		}

		var serviceurl = svcurl ? svcurl : this.url;

		if (!serviceurl) {
			this._endLoad(-1, "empty url", 0);
			return;
		}

		var url = nexacro._getServiceLocation(serviceurl, baseurl);
		if (url && url.length && this.parent) {
			var svcid = "__normaldataset_appendurl_" + this.id;
			var loadmanager = this.parent._load_manager;
			if (loadmanager) {
				var serverdatasetid = this.serverdatasetid;
				if (!serverdatasetid) {
					serverdatasetid = "output";
				}
				var outds = this.id + "=" + serverdatasetid + ":P";
				var service = nexacro._getServiceObject(url, true);

				loadmanager.loadDataModule(url, svcid, "", outds, this.arguments, null, async, datatype, false, service);
			}
		}
		else {
			this._endLoad(-1, "empty url", 0);
		}
	};

	_pNormalDataset.on_preload_data = function (url, errstatus, data, fireerrorcode, returncode, requesturi, locationuri, extramsg) {
		if (errstatus != 0) {
			nexacro._onHttpSystemError(this, true, this, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
		}
		else if (data && !this._is_preloaded) {
			var keys = [];
			keys.push("__preload");
			keys.push(this.url);
			keys.push(this.id);
			keys.push(this.serverdatasetid);
			var svcid = keys.join('_');

			var serverdatasetid = this.serverdatasetid;
			if (!serverdatasetid) {
				serverdatasetid = "output";
			}
			var outds = this.id + "=" + serverdatasetid;
			var tritem = new nexacro.TransactionItem(this.url, this.parent, svcid, "", outds, "", 0, true);
			tritem._usewaitcursor = false;
			tritem._loadFromData(data);
			this._is_preloaded = true;
		}
	};

	_pNormalDataset._findDataObject = function (id) {
		if (id && id.length > 0) {
			var dataobj;
			var parent = this.parent;
			if (parent) {
				dataobj = parent[id];
				if (dataobj && (dataobj._type_name == "DataObject")) {
					return dataobj;
				}
			}

			if (this._refform) {
				dataobj = this._refform.lookup(id);
				if (dataobj && (dataobj._type_name == "DataObject")) {
					return dataobj;
				}
			}
		}
		return undefined;
	};

	_pNormalDataset._loadDataObject = function (fireevent, reason) {
		var data = null;
		var binddataobject = this.binddataobject;
		var _binddataobject = this._binddataobject;
		if (binddataobject && !_binddataobject) {
			_binddataobject = this._binddataobject = this._findDataObject(binddataobject);
		}
		if (_binddataobject) {
			data = _binddataobject.data;
		}
		this._loadFromJSONObj(data);
		if (fireevent !== false && this._is_created) {
			this._endLoad(0, "SUCCESS", reason ? reason : 0);
		}
		if (reason == 0 || reason == 3) {
			var view = nexacro.Component.prototype._getRootComponent.call(this, this.parent);
			if (view && view._is_view && view._ismodeltrigger) {
				if (this.name == view.viewdataset) {
					var form = view.parent;
					var manager = form._trigger_manager;
					var triggertype = "";
					var triggerview = view;
					var triggerobj = view.getViewDataset();
					triggertype = "Model Load Success";
					manager._notifyTrigger(triggertype, triggerobj, triggerview);
				}
			}
		}
	};

	delete _pNormalDataset;
}
