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

if (!nexacro.VideoPlayer) {
	nexacro.VideoPlayStateChangedEventInfo = function (obj, id, newstate) {
		this.id = this.eventid = id || "onplaystatuschanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.newstate = newstate;
	};
	var _pPlayStatusChangedInfo = nexacro._createPrototype(nexacro.Event, nexacro.VideoPlayStateChangedEventInfo);
	nexacro.VideoPlayStateChangedEventInfo.prototype = _pPlayStatusChangedInfo;
	_pPlayStatusChangedInfo._type_name = "VideoPlayStatusChangedInfo";

	delete _pPlayStatusChangedInfo;

	nexacro.VideoCurrentTimeChangedEventInfo = function (obj, id, currenttime) {
		this.id = this.eventid = id || "oncurrenttimechanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.currenttime = currenttime;
	};
	var _pCurrentTimeChangedInfo = nexacro._createPrototype(nexacro.Event, nexacro.VideoCurrentTimeChangedEventInfo);
	nexacro.VideoCurrentTimeChangedEventInfo.prototype = _pCurrentTimeChangedInfo;
	_pCurrentTimeChangedInfo._type_name = "VideoCurrentTimeChangedInfo";

	delete _pCurrentTimeChangedInfo;

	nexacro.VideoErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, undefined, undefined);
	};
	var _pVideoErrorInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.VideoErrorEventInfo);
	nexacro.VideoErrorEventInfo.prototype = _pVideoErrorInfo;
	_pVideoErrorInfo._type_name = "VideoErrorInfo";

	delete _pVideoErrorInfo;

	nexacro.VideoPlayer = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pVideo = nexacro.VideoPlayer.prototype = nexacro._createPrototype(nexacro.Component, nexacro.VideoPlayer);

	_pVideo._type_name = "VideoPlayer";

	_pVideo.codebase = "";
	_pVideo.mimetype = "";
	_pVideo.url = "";
	_pVideo._url = "";

	_pVideo.adjustalpha = false;
	_pVideo.aspectratio = "";
	_pVideo.currenttime = 0;
	_pVideo._new_currenttime = 0;
	_pVideo.duration = 0;
	_pVideo.mute = false;
	_pVideo.repeat = false;
	_pVideo.showcontrolbar = false;
	_pVideo.videosize = {
	};
	_pVideo.autoplay = false;
	_pVideo.status = "stop";
	_pVideo.volume = 50;
	_pVideo.vr360mode = false;
	_pVideo._is_simple_control = true;

	_pVideo._obj_id = "";
	_pVideo._obj_elem = null;
	_pVideo._params = null;

	_pVideo._event_list = 
		{
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"ondrag" : 1, 
		"ondrop" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmousewheel" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onsuccess" : 1, 
		"onerror" : 1, 
		"onappenditem" : 1, 
		"ondeleteitem" : 1, 
		"onitemclick" : 1, 
		"onfindclick" : 1, 
		"onitemchanged" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"oncurrenttimechanged" : 1, 
		"onplaystatuschanged" : 1
	};

	_pVideo.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var obj_elem = this._obj_elem = new nexacro._VideoPlayerPluginElement(control_elem);
			obj_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
		}
	};


	_pVideo.on_create_contents_command = function () {
		this.on_apply_mute();
		this.on_apply_volume();
		this.on_apply_repeat();
		this.on_apply_autoplay();
		this.on_apply_showcontrolbar();
		this.on_apply_url();
		this.on_apply_vr360mode();

		return this._obj_elem.createCommand();
	};

	_pVideo.on_attach_contents_handle = function (win) {
		if (this._obj_elem) {
			this._obj_elem.attachHandle(win);
		}
	};

	_pVideo.on_created_contents = function (win) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.component = this;

			obj_elem.create(win);
			obj_elem.initEvent();

			this.on_apply_adjustalpha();
			this.on_apply_mute();
			this.on_apply_volume();
			this.on_apply_repeat();
			this.on_apply_autoplay();
			this.on_apply_showcontrolbar();
			this.on_apply_url();
			this.on_apply_vr360mode();
		}
	};

	_pVideo.on_destroy_contents = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.destroy();
			this._obj_elem = null;
		}
	};

	_pVideo.on_update_position = function (resize_flag, move_flag, update) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag, update);
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.on_update_position();
		}
	};

	_pVideo.on_change_containerRect = function (width, height) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementSize(width, height);
		}
	};

	_pVideo.set_duration = nexacro._emptyFn;
	_pVideo.set_status = nexacro._emptyFn;
	_pVideo.set_videosize = nexacro._emptyFn;

	_pVideo.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		v = nexacro._toBoolean(v);
		nexacro.Component.prototype.set_visible.call(this, v);

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			if (obj_elem.setElementVisible != null) {
				obj_elem.setElementVisible(v);
			}
		}
	};

	_pVideo.set_codebase = function (v) {
		this.codebase = v;
		this.on_apply_codebase();
	};

	_pVideo.on_apply_codebase = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			var codebase = this.codebase;
			if (codebase) {
				obj_elem.setElementCodebase(codebase);
			}
		}
	};

	_pVideo.set_url = function (v) {
		if (this.url != v) {
			this.url = v;
			v = nexacro._getURIValue(v);

			if (v == system.convertRealPath(v) || undefined === system.convertRealPath(v)) {
				v = nexacro._getServiceLocation(v, this._getRefFormBaseUrl());
			}
			else {
				v = system.convertRealPath(v);
			}

			if (this._url != v) {
				this._url = v;
				this.on_apply_url();
			}
		}
	};

	_pVideo.on_apply_url = function () {
		if (this._url === "") {
			return;
		}

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoUrl("URL", this._url);
		}
	};

	_pVideo.set_adjustalpha = function (v) {
		v = nexacro._toBoolean(v);
		if (this.adjustalpha != v) {
			this.adjustalpha = v;
			this.on_apply_adjustalpha();
		}
	};

	_pVideo.on_apply_adjustalpha = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementAdjustAlpha(this.adjustalpha);
		}
	};

	_pVideo.set_currenttime = function (v) {
		v = +v;
		if (isNaN(v)) {
			return;
		}
		if (v < 0) {
			v = 0;
		}
		else if (v > this.duration) {
			v = this.duration;
		}

		this._new_currenttime = v;
		this.on_apply_currenttime();
	};

	_pVideo.on_apply_currenttime = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			var _new_currenttime = this._new_currenttime;
			if (_new_currenttime > -1) {
				obj_elem._setVideoCurrentTime("currentPosition", _new_currenttime);
			}
		}
	};

	_pVideo.set_mute = function (v) {
		v = nexacro._toBoolean(v);
		if (this.mute != v) {
			this.mute = v;
			this.on_apply_mute();
		}
	};

	_pVideo.on_apply_mute = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoMute("settings", this.mute);
		}
	};

	_pVideo.set_repeat = function (v) {
		v = nexacro._toBoolean(v);
		if (this.repeat != v) {
			this.repeat = v;
			this.on_apply_repeat();
		}
	};

	_pVideo.on_apply_repeat = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoLoop("AutoRewind", this.repeat);
		}
	};

	_pVideo.set_showcontrolbar = function (v) {
		v = nexacro._toBoolean(v);
		if (this.showcontrolbar != v) {
			this.showcontrolbar = v;
			this.on_apply_showcontrolbar();
		}
	};

	_pVideo.on_apply_showcontrolbar = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoShowControlBar("uiMode", this.showcontrolbar);
		}
	};

	_pVideo.set_autoplay = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoplay != v) {
			this.autoplay = v;
			this.on_apply_autoplay();
		}
	};

	_pVideo.on_apply_autoplay = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoAutoPlay("AutoStart", this.autoplay);
		}
	};

	_pVideo.set_volume = function (v) {
		v = +v;
		if (isNaN(v)) {
			return;
		}

		if (v < 0) {
			v = 0;
		}
		else if (v > 100) {
			v = 100;
		}

		if (this.volume != v) {
			this.volume = v;
			this.on_apply_volume();
		}
	};

	_pVideo.on_apply_volume = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideoVolume("Volume", this.volume);
		}
	};

	_pVideo.on_apply_prop_enable = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			var enable = this.enable;
			if (enable != null) {
				obj_elem._setVideoEnable("Enabled", enable);
			}
		}
	};

	_pVideo.set_vr360mode = function (v) {
		v = nexacro._toBoolean(v);
		if (this.vr360mode != v) {
			this.vr360mode = v;
			this.on_apply_vr360mode();
		}
	};

	_pVideo.on_apply_vr360mode = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._setVideo360VRMode("VRMode", this.vr360mode);
		}
	};

	_pVideo.play = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._play();
		}
	};

	_pVideo.pause = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._pause();
		}
	};

	_pVideo.rewind = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._rewind();
		}
	};

	_pVideo.stop = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem._stop();
		}
	};

	_pVideo.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.VideoErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode);
			return this.onerror._fireEvent(this, evt);
		}
	};

	_pVideo.on_fire_oncurrenttimechanged = function (obj, new_currenttime) {
		if (this.oncurrenttimechanged && this.oncurrenttimechanged._has_handlers) {
			var evt = new nexacro.VideoCurrentTimeChangedEventInfo(obj, "oncurrenttimechanged", new_currenttime);
			return this.oncurrenttimechanged._fireEvent(this, evt);
		}
	};

	_pVideo.on_fire_onplaystatuschanged = function (obj, new_state) {
		if (this.onplaystatuschanged && this.onplaystatuschanged._has_handlers) {
			var evt = new nexacro.VideoPlayStateChangedEventInfo(obj, "onplaystatuschanged", new_state);
			return this.onplaystatuschanged._fireEvent(this, evt);
		}
	};

	_pVideo._on_currenttimechanged = function (new_currenttime) {
		var old_currenttime = this.currenttime;
		if (old_currenttime != new_currenttime) {
			this.on_fire_oncurrenttimechanged(this, new_currenttime);
		}
		this.currenttime = new_currenttime;
	};

	_pVideo._on_volumechangechanged = function (new_volume, new_muted) {
		this.volume = new_volume;
		this.mute = new_muted;
	};

	_pVideo._on_statuschanged = function (new_state) {
		var old_state = this.status;
		if (old_state != new_state) {
			this.status = new_state;
			this.on_fire_onplaystatuschanged(this, new_state);
		}
	};

	_pVideo._on_error = function (errortype, errormsg, statuscode) {
		this.on_fire_onerror(this, errortype, errormsg, this, statuscode);
	};

	delete _pVideo;
}
