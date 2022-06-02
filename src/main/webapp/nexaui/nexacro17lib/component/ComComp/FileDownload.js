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

if (!nexacro.FileDownload) {
	nexacro.FileDownloadEventInfo = function (obj, id, url, targetfullpath) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;
		this.url = url;
		this.targetfullpath = targetfullpath;
	};

	var _pFileDownloadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileDownloadEventInfo);
	nexacro.FileDownloadEventInfo.prototype = _pFileDownloadEventInfo;
	_pFileDownloadEventInfo._type_name = "FileDownloadEventInfo";

	delete _pFileDownloadEventInfo;

	nexacro.FileDownloadErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
	};

	var _pFileDownloadErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileDownloadErrorEventInfo);
	nexacro.FileDownloadErrorEventInfo.prototype = _pFileDownloadErrorEventInfo;
	_pFileDownloadErrorEventInfo._type_name = "FileDownloadErrorEventInfo";

	delete _pFileDownloadErrorEventInfo;

	nexacro.FileDownload = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._IconText.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pFileDownload = nexacro._createPrototype(nexacro._IconText, nexacro.FileDownload);
	nexacro.FileDownload.prototype = _pFileDownload;
	_pFileDownload._type_name = "FileDownload";


	_pFileDownload.tabstop = true;
	_pFileDownload.downloadurl = "";
	_pFileDownload.downloadfilename = "";

	_pFileDownload.filefilter = "";
	_pFileDownload.filefilterindex = 0;


	_pFileDownload._is_simple_control = true;
	_pFileDownload._is_focus_accept = true;
	_pFileDownload._use_pushed_status = true;


	_pFileDownload._event_list = 
		{
		"onclick" : 1, 
		"ondblclick" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragmove" : 1, 
		"ondragleave" : 1, 
		"ondrop" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmousemove" : 1, 
		"onmouseleave" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onsuccess" : 1, 
		"onerror" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};


	_pFileDownload.accessibilityrole = "button";

	_pFileDownload.on_create_contents = function () {
		nexacro._IconText.prototype.on_create_contents.call(this);

		nexacro._create_hidden_frame("", this._on_download_onload, this, "filedownload");
	};

	_pFileDownload.on_destroy_contents = function () {
		nexacro._IconText.prototype.on_destroy_contents.call(this);

		nexacro._destroy_hidden_frame("", this, "filedownload");
	};

	_pFileDownload._getDlgCode = function () {
		return {
			want_tab : false, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	_pFileDownload._isFocusAcceptable = function () {
		return this._is_focus_accept;
	};

	_pFileDownload.set_downloadurl = function (v) {
		if (v != this.downloadurl) {
			this.downloadurl = v;
		}
	};

	_pFileDownload.set_downloadfilename = function (v) {
		if (v != this.downloadfilename) {
			this.downloadfilename = v;
		}
	};

	_pFileDownload.set_filefilter = function (v) {
		this.filefilter = v;
	};

	_pFileDownload.set_filefilterindex = function (v) {
		this.filefilterindex = v;
	};


	_pFileDownload.download = function (url, targetpath) {
		var ret = null;
		var downloadurl = this.downloadurl;
		var initname = this.downloadfilename;
		if (targetpath != undefined) {
			targetpath = nexacro._toString(targetpath);
		}

		var owner_frame = this._getOwnerFrame();
		var is_popup_frame = owner_frame ? owner_frame._is_popup_frame : false;

		if (url != undefined) {
			url = nexacro._toString(url);
			url = nexacro._getImageLocation(url);

			ret = nexacro._download(url, is_popup_frame, this._hidden_frame_handle, initname, targetpath, this.filefilter, this.filefilterindex);
		}
		else if (downloadurl != undefined && downloadurl != "") {
			downloadurl = nexacro._getServiceLocation(downloadurl);
			ret = nexacro._download(downloadurl, is_popup_frame, this._hidden_frame_handle, initname, targetpath, this.filefilter, this.filefilterindex);
		}
		return ret === null ? false : true;
	};

	_pFileDownload._on_download_onload = function (status, data, url, errcode, httpcode, errmsg, extramsg) {
		if (status < 0) {
			nexacro._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null, extramsg);
			var commerrorobj = nexacro.MakeCommunicationError(this, errcode, url, httpcode, url, null, extramsg);
			this.on_fire_onerror(this, "ObjectError", commerrorobj.message, this, 9901, null, null);
		}
		else {
			this.on_fire_onsuccess(url, data);
		}
	};

	_pFileDownload.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);

		if (key_code == 13 || key_code == 32) {
			this.on_fire_onclick("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
		}

		return ret;
	};

	_pFileDownload.on_fire_onsuccess = function (url, targetfullpath) {
		var application = nexacro.getApplication();
		if (application) {
			application._endCommProgress();
		}

		if (this.onsuccess && this.onsuccess._has_handlers && url != "") {
			var evt = new nexacro.FileDownloadEventInfo(this, "onsuccess", url, targetfullpath);
			return this.onsuccess._fireEvent(this, evt);
		}
	};

	_pFileDownload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		var application = nexacro.getApplication();
		if (application) {
			application._endCommProgress();
		}

		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileDownloadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
			return this.onerror._fireEvent(this, evt);
		}
	};

	_pFileDownload.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this.download();
		return ret;
	};

	delete _pFileDownload;
}
