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

if (!nexacro.ScrollBarControl) {
	nexacro.ScrollBarControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._rectshaft = new nexacro.Rect();
	};

	nexacro.ScrollBarControl.TRACKBAR_SIZE_MIN = 6;
	nexacro.ScrollBarControl.TRACKFIRSTOVER = 1;
	nexacro.ScrollBarControl.TRACKLASTOVER = 2;

	var _pScrollBar = nexacro._createPrototype(nexacro.Component, nexacro.ScrollBarControl);
	nexacro.ScrollBarControl.prototype = _pScrollBar;

	_pScrollBar._type_name = "ScrollBarControl";

	_pScrollBar.incbutton = null;
	_pScrollBar.decbutton = null;
	_pScrollBar.trackbar = null;
	_pScrollBar.barminsize = undefined;
	_pScrollBar.baroutsize = undefined;
	_pScrollBar.decbuttonsize = undefined;
	_pScrollBar.imgoutsize = -1;
	_pScrollBar.incbuttonsize = undefined;
	_pScrollBar.trackbarsize = undefined;
	_pScrollBar.direction = "vertical";
	_pScrollBar.line = 1;
	_pScrollBar.page = 3;
	_pScrollBar.view = -1;
	_pScrollBar.max = 0;
	_pScrollBar.min = 0;
	_pScrollBar.pos = 0;


	_pScrollBar._event_list = {
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onsize" : 1, 
		"onscroll" : 1, 
		"ondevicebuttonup" : 1
	};


	_pScrollBar._mousepoint = {
	};
	_pScrollBar._max = 0;
	_pScrollBar._min = 0;
	_pScrollBar._orgmax = 0;
	_pScrollBar._trackbarsize = -1;
	_pScrollBar._pos = 0;
	_pScrollBar._lineup = 1;
	_pScrollBar._linedown = 1;
	_pScrollBar._pageup = 3;
	_pScrollBar._pagedown = 3;
	_pScrollBar._trackover = 0;
	_pScrollBar._is_repeat = true;
	_pScrollBar._start_page_navi = null;
	_pScrollBar._is_tracking = false;
	_pScrollBar._reset_trackbar_fix = false;
	_pScrollBar._set_real = false;
	_pScrollBar._is_nc_control = true;
	_pScrollBar._is_focus_accept = false;
	_pScrollBar._is_subcontrol = true;



	_pScrollBar.on_get_css_assumedtypename = function () {
		if (this.direction == "vertical") {
			return "VScrollBarControl";
		}
		else if (this.direction == "horizontal") {
			return "HScrollBarControl";
		}

		return this._type_name;
	};

	_pScrollBar.on_create_contents = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this.decbutton = new nexacro.Button("decbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.decbutton.accessibilityenable = false;
			this.incbutton = new nexacro.Button("incbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.incbutton.accessibilityenable = false;
			this.trackbar = new nexacro.Button("trackbar", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.trackbar._use_translate_move = true;
			this.trackbar.accessibilityenable = false;

			this.decbutton._setControl();
			this.incbutton._setControl();
			this.trackbar._setControl();

			this.trackbar._is_track = true;
			this.trackbar._on_starttrack = this._on_starttrack;
			this.trackbar._on_movetrack = this._on_movetrack;
			this.trackbar._on_endtrack = this._on_endtrack;

			if (!nexacro._allow_default_pinchzoom) {
				this.trackbar._no_slide_scroll = true;
			}

			this.decbutton.createComponent();
			this.trackbar.createComponent();
			this.incbutton.createComponent();
		}
	};

	_pScrollBar.on_created_contents = function (win) {
		var decbutton = this.decbutton;
		if (decbutton) {
			decbutton.on_created(win);
		}



		var incbutton = this.incbutton;
		if (incbutton) {
			incbutton.on_created(win);
		}

		this._recalcLayout();
	};

	_pScrollBar.on_destroy_contents = function () {
		if (this.decbutton) {
			this.decbutton.destroy();
			this.decbutton = null;
		}

		if (this.trackbar) {
			this.trackbar.destroy();
			this.trackbar = null;
		}

		if (this.incbutton) {
			this.incbutton.destroy();
			this.incbutton = null;
		}

		this._rectshaft = null;
		this._mousepoint = null;
	};

	_pScrollBar.on_create_contents_command = function () {
		this._recalcLayout();
		var str = "";
		if (this.decbutton) {
			str += this.decbutton.createCommand();
		}
		if (this.trackbar) {
			str += this.trackbar.createCommand();
		}
		if (this.incbutton) {
			str += this.incbutton.createCommand();
		}
		return str;
	};

	_pScrollBar.on_attach_contents_handle = function (win) {
		if (this.decbutton) {
			this.decbutton.attachHandle(win);
		}
		if (this.trackbar) {
			this.trackbar.attachHandle(win);
		}
		if (this.incbutton) {
			this.incbutton.attachHandle(win);
		}
	};

	_pScrollBar.on_change_containerRect = function () {
		this._recalcLayout();
	};

	_pScrollBar._on_repeat = function (fromComp, x, y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		if (!this._is_alive) {
			return;
		}

		var fromObject = fromComp;
		var btn, left, top, width, height;
		if (fromObject == this.decbutton) {
			btn = this.decbutton;
			left = btn._adjust_left;
			top = btn._adjust_top;
			width = btn._adjust_width *  scale;
			height = btn._adjust_height *  scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_decbutton_lbuttondown(this);
			}
		}
		else if (fromObject == this.incbutton) {
			btn = this.incbutton;
			left = btn._adjust_left;
			top = btn._adjust_top;
			width = btn._adjust_width *  scale;
			height = btn._adjust_height *  scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_incbutton_lbuttondown(this);
			}
		}
		else if (fromObject == this) {
			this.on_page_click(this, x, y);
		}
	};

	_pScrollBar._on_startrepeat = function (fromComp, x, y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		if (!this._is_alive) {
			return;
		}


		var btn, fromObject = fromComp;
		var left, top, width, height;
		if (fromObject == this.decbutton) {
			btn = this.decbutton;
			left = btn._adjust_left;
			top = btn._adjust_top;
			width = btn._adjust_width *  scale;
			height = btn._adjust_height *  scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_decbutton_lbuttondown(this, null);
			}
		}
		else if (fromObject == this.incbutton) {
			btn = this.incbutton;
			left = btn._adjust_left;
			top = btn._adjust_top;
			width = btn._adjust_width *  scale;
			height = btn._adjust_height *  scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_incbutton_lbuttondown(this, null);
			}
		}
		else if (fromObject == this) {
			btn = this.trackbar;
			left = btn._adjust_left;
			top = btn._adjust_top;
			width = btn._adjust_width *  scale;
			height = btn._adjust_height *  scale;

			var eType = "";
			if (this.direction == "vertical") {
				if (y < top) {
					eType = "pageup";
				}
				else if (y > (top + height)) {
					eType = "pagedown";
				}
			}
			else {
				if (x < left) {
					eType = "pageleft";
				}
				else if (x > (left + width)) {
					eType = "pageright";
				}
			}
			this._start_page_navi = eType;
			this.on_page_click(this, x, y);
		}
	};



	_pScrollBar.set_barminsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.barminsize != v) {
			this.barminsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_baroutsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.baroutsize != v) {
			this.baroutsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_decbuttonsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.decbuttonsize != v) {
			this.decbuttonsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_imgoutsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.imgoutsize != v) {
			this.imgoutsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_incbuttonsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.incbuttonsize != v) {
			this.incbuttonsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_trackbarsize = function (v) {
		if (v != undefined) {
			v = nexacro._toInt(v);
		}

		if (this.trackbarsize != v) {
			this.trackbarsize = v;
			this._recalcLayout();
		}
	};

	_pScrollBar.set_pos = function (v) {
		this._setPos(v);
	};

	_pScrollBar.on_apply_resize = function () {
		this._recalcLayout();
		this.on_fire_onsize(this._adjust_width, this._adjust_height);
	};

	_pScrollBar.on_apply_move = function () {
		this._recalcLayout();
		this.on_fire_onmove(this._adjust_left, this._adjust_top);
	};

	_pScrollBar.on_apply_prop_enable = function (v) {
		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		if (this.incbutton) {
			this.incbutton._setEnable(enable);
		}
		if (this.decbutton) {
			this.decbutton._setEnable(enable);
		}
		if (this.trackbar) {
			this.trackbar._setEnable(enable);
		}
	};


	_pScrollBar.on_fire_onscroll = function (pos, strType, isscrolling, sdir, evtkind) {
		if (this.onscroll && this.onscroll._has_handlers) {
			pos = (pos + 0.5) | 0;
			var eventid = (this.direction == "vertical") ? "onvscroll" : "onhscroll";
			var evt = new nexacro.ScrollEventInfo(this, eventid, pos, strType, this, this.parent);
			if (isscrolling !== undefined) {
				evt.touchscrolling = isscrolling;
				evt.touchscrolldir = sdir;
			}
			evt._evtkind = evtkind;
			var ret = this.onscroll._fireEvent(this, evt);
			return ret;
		}
		return true;
	};

	_pScrollBar.on_incbutton_lbuttondown = function (obj) {
		var max = this._max;
		var pos = this._pos;
		var nInc = this.line;
		if (nInc == -1) {
			nInc = this._lineup;
		}
		var newpos = pos + nInc;

		var temp = this._getIncNewPosPixel();
		if (temp !== undefined) {
			newpos = temp;
		}

		var posarr;
		if (pos >= max) {
			posarr = this._scroll_reverse_convert(max);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, "lastover", undefined, undefined, this.direction);
		}
		else if (newpos >= max) {
			posarr = this._scroll_reverse_convert(max);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vertical" ? "linedown" : (this._isRtl() ? "lineleft" : "lineright")), undefined, undefined, this.direction);

			this.on_fire_onscroll(this.pos, "last", undefined, undefined, this.direction);
		}
		else {
			posarr = this._scroll_reverse_convert(newpos);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vertical" ? "linedown" : (this._isRtl() ? "lineleft" : "lineright")), undefined, undefined, this.direction);
		}
		var rc = this._rectshaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};

	_pScrollBar.on_decbutton_lbuttondown = function (obj) {
		var min = this._min;
		var pos = this._pos;
		var nDec = this.line;
		if (nDec == -1) {
			nDec = this._linedown;
		}
		var newpos = pos - nDec;

		var temp = this._getDecNewPosPixel();
		if (temp !== undefined) {
			newpos = temp;
		}

		var posarr;
		if (pos <= min) {
			posarr = this._scroll_reverse_convert(min);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, "firstover", undefined, undefined, this.direction);
		}
		else if (newpos <= min) {
			posarr = this._scroll_reverse_convert(min);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vertical" ? "lineup" : (this._isRtl() ? "lineright" : "lineleft")), undefined, undefined, this.direction);
			this.on_fire_onscroll(this.pos, "first", undefined, undefined, this.direction);
		}
		else {
			posarr = this._scroll_reverse_convert(newpos);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vertical" ? "lineup" : (this._isRtl() ? "lineright" : "lineleft")), undefined, undefined, this.direction);
		}

		var rc = this._rectshaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};

	_pScrollBar._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		p._mousepoint = {
			x : 0, 
			y : 0
		};
		nexacro.ScrollBarControl.prototype._starttrack.call(p);
		p._is_tracking = true;
	};

	_pScrollBar._on_endtrack = function () {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		nexacro.ScrollBarControl.prototype._endtrack.call(p);
		p._is_tracking = false;
	};


	_pScrollBar._on_movetrack = function (x, y) {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		nexacro.ScrollBarControl.prototype._movetrack.call(p, x, y);
	};


	_pScrollBar.on_page_click = function (obj, nX, nY) {
		var min = this._min;
		var max = this._max;
		var pos = this._pos;
		var page = this.page;
		var pageup = this._pageup;
		var pagedown = this._pagedown;

		if (page != -1) {
			pageup = page;
			pagedown = page;
		}

		var trackbar = this.trackbar;
		if (trackbar._adjust_width <= 0 || trackbar._adjust_height <= 0) {
			return;
		}

		var top = trackbar._adjust_top;
		var left = trackbar._adjust_left;
		var right = trackbar._adjust_left + trackbar._adjust_width;
		var bottom = trackbar._adjust_top + trackbar._adjust_height;

		var newpos = pos, eType;

		if (this.direction == "vertical") {
			if (this._start_page_navi == "pageup" && nY < top) {
				newpos = (pos - pageup);
				newpos = (newpos < min ? min : newpos);
				eType = "pageup";
			}
			else if (this._start_page_navi == "pagedown" && nY > bottom) {
				newpos = (pos + pagedown);
				newpos = (newpos > max ? max : newpos);
				eType = "pagedown";
			}
			else {
				eType = "";
			}
		}
		else {
			if (this._start_page_navi == "pageleft" && nX < left) {
				newpos = (pos - pageup);
				newpos = (newpos < min ? min : newpos);
				eType = "pageleft";
			}
			else if (this._start_page_navi == "pageright" && nX > right) {
				newpos = (pos + pagedown);
				newpos = (newpos > max ? max : newpos);
				eType = "pageright";
			}
			else {
				eType = "";
			}

			if (this._isRtl() && eType) {
				if (eType == "pageleft") {
					eType = "pageright";
				}
				else {
					eType = "pageleft";
				}
			}
		}

		if (this._pos == newpos) {
			return;
		}

		var posarr = this._scroll_reverse_convert(newpos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		this.on_fire_onscroll(this.pos, eType, undefined, undefined, this.direction);

		if (this.direction == "vertical") {
			if (nY < top && newpos == min) {
				this.on_fire_onscroll(this.pos, "first", undefined, undefined, this.direction);
			}
			else if (nY > bottom && newpos == max) {
				this.on_fire_onscroll(this.pos, "last", undefined, undefined, this.direction);
			}
			else {
				if (newpos == min) {
					this.on_fire_onscroll(this.pos, "first", undefined, undefined, this.direction);
				}
				else if (newpos == max) {
					this.on_fire_onscroll(this.pos, "last", undefined, undefined, this.direction);
				}
			}
		}
		else {
			if (nX < left && newpos == min) {
				this.on_fire_onscroll(this.pos, "first", undefined, undefined, this.direction);
			}
			else if (nX > right && newpos == max) {
				this.on_fire_onscroll(this.pos, "last", undefined, undefined, this.direction);
			}
			else {
				if (newpos == min) {
					this.on_fire_onscroll(this.pos, "first", undefined, undefined, this.direction);
				}
				else if (newpos == max) {
					this.on_fire_onscroll(this.pos, "last", undefined, undefined, this.direction);
				}
			}
		}
		var rc = this._rectshaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};


	_pScrollBar.set_direction = function (v) {
		if (this.direction != v) {
			switch (v) {
				case "vertical":
				case "horizontal":
					this.direction = v;
					this._recalcLayout();
					break;
			}
		}
		return v;
	};

	_pScrollBar._scroll_convert_pixel = function (v) {
		return v;
	};

	_pScrollBar._scroll_reverse_convert = function (v) {
		return [v, v];
	};

	_pScrollBar._setPos = function (v, evtkind, bfireevent) {
		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
			var rc = this._rectshaft;
			this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
		}

		if (bfireevent !== false) {
			this.on_fire_onscroll(this.pos, "none", undefined, undefined, evtkind);
		}
	};

	_pScrollBar._setScrollPos = function (si_pos) {
		if (this._is_tracking) {
			return;
		}

		var posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}

		this._recalcLayout();
	};


	_pScrollBar.set_min = function (min) {
		min = parseInt(min);
		var posarr = this._scroll_reverse_convert(min);
		this.min = posarr[0];
		this._min = posarr[1];
		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}

		this._recalcLayout();
	};

	_pScrollBar.set_max = function (max) {
		max = parseInt(max);
		var posarr = this._scroll_reverse_convert(max);
		this.max = posarr[0];
		this._max = posarr[1];

		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}

		this._recalcLayout();
	};

	_pScrollBar._setScrollInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_enable, si_pos) {
		var posarr = this._scroll_reverse_convert(si_min);
		this.min = posarr[0];
		this._min = posarr[1];

		posarr = this._scroll_reverse_convert(si_max, false, true);
		this.max = posarr[0];
		this._max = posarr[1];
		this._orgmax = si_max;

		this.line = si_line;
		this.page = si_page;
		this.view = si_view;

		posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}

		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

		var bsize = false;

		if (old_left != left || old_top != top || old_width != width || old_height != height) {
			bsize = true;
		}

		if (bsize) {
			this.move(left, top, width, height, null, null);

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementPosition(this._adjust_left, this._adjust_top);
				control_elem.setElementSize(this._adjust_width, this._adjust_height);

				if (old_left != this._adjust_left || old_top != this._adjust_top) {
					this.on_fire_onmove(this._adjust_left, this._adjust_top);
				}
				if (old_width != this._adjust_width || old_height != this._adjust_height) {
					this.on_fire_onsize(this._adjust_width, this._adjust_height);
				}
			}
		}
		this._recalcLayout();
		this._setEnable(si_enable);
	};



	_pScrollBar._recalcLayout = function () {
		var control_elem = this._control_element;
		if (control_elem && this._is_created_contents) {
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			if (client_width <= 0 || client_height <= 0) {
				return;
			}

			var client_left = this._getClientLeft();
			var client_top = this._getClientTop();
			var l = 0, r = 0, t = 0, b = 0;

			var decsize = this.decbuttonsize != undefined ? this.decbuttonsize : -1;
			var incsize = this.incbuttonsize != undefined ? this.incbuttonsize : -1;
			var tracksize = 0, diff;
			var shaftsize, view, barminsize, baroutsize, size;
			if (this.direction == "vertical") {
				if (decsize < 0) {
					decsize = client_width;
				}
				if (incsize < 0) {
					incsize = client_width;
				}

				diff = client_height - (decsize + incsize);

				if (diff < 0) {
					decsize = ((client_height + (client_height % 2)) / 2) | 0;
					incsize = client_height - decsize;
				}

				var client_bottom = client_top + client_height;

				l = client_left;
				r = l + client_width;
				t = client_top + decsize;
				b = client_bottom - incsize;

				if (decsize == 0) {
					this.decbutton.move(l, -100, client_width, decsize);
				}
				else {
					this.decbutton.move(l, client_top, client_width, decsize);
				}

				if (incsize == 0) {
					this.incbutton.move(l, -100, client_width, client_height - b);
				}
				else {
					this.incbutton.move(l, b, client_width, client_height - b);
				}

				shaftsize = b - t;
				if (shaftsize > 0) {
					view = this.view;
					barminsize = this.barminsize != undefined ? this.barminsize : -1;
					baroutsize = this.baroutsize != undefined ? this.baroutsize : -1;
					size = this._max - this._min;

					if (baroutsize < 0) {
						baroutsize = r - l;
					}
					if (barminsize < 0) {
						barminsize = ((r - l) *  0.60) | 0;
						if (barminsize < nexacro.ScrollBarControl.TRACKBAR_SIZE_MIN) {
							barminsize = nexacro.ScrollBarControl.TRACKBAR_SIZE_MIN;
						}
					}
					if (view < 0) {
						view = 1;
					}

					if (shaftsize > baroutsize) {
						if (this.trackbarsize != undefined && this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							tracksize = (shaftsize *  (view / (view + size))) | 0;
							this._trackbarsize = (tracksize < barminsize) ? barminsize : tracksize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (shaftsize < this._trackbarsize) {
					this._trackbarsize = shaftsize;
				}
			}
			else {
				if (decsize < 0) {
					decsize = client_height;
				}
				if (incsize < 0) {
					incsize = client_height;
				}

				diff = client_width - (decsize + incsize);

				if (diff < 0) {
					decsize = ((client_width + (client_width % 2)) / 2) | 0;
					incsize = client_width - decsize;
				}

				var client_right = client_left + client_width;
				l = client_left + decsize;
				r = client_right - incsize;
				t = client_top;
				b = client_top + client_height;


				if (decsize == 0) {
					this.decbutton.move(client_left, -100, decsize, client_height);
				}
				else {
					this.decbutton.move(client_left, t, decsize, client_height);
				}

				if (incsize == 0) {
					this.incbutton.move(r, -100, client_width - r, client_height);
				}
				else {
					this.incbutton.move(r, t, client_width - r, client_height);
				}

				shaftsize = r - l;
				if (shaftsize > 0) {
					view = this.view;
					barminsize = this.barminsize != undefined ? this.barminsize : -1;
					baroutsize = this.baroutsize != undefined ? this.baroutsize : -1;
					size = this._max - this._min;

					if (baroutsize < 0) {
						baroutsize = b - t;
					}
					if (barminsize < 0) {
						barminsize = parseInt((b - t) *  0.60);
						if (barminsize < nexacro.ScrollBarControl.TRACKBAR_SIZE_MIN) {
							barminsize = nexacro.ScrollBarControl.TRACKBAR_SIZE_MIN;
						}
					}
					if (view < 0) {
						view = 1;
					}

					this._barminsize = barminsize;
					this._baroutsize = baroutsize;

					if (shaftsize > baroutsize) {
						if (this.trackbarsize != undefined && this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							tracksize = (shaftsize *  (view / (view + size))) | 0;
							this._trackbarsize = (tracksize < barminsize) ? barminsize : tracksize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (shaftsize < this._trackbarsize) {
					this._trackbarsize = shaftsize;
				}
			}
			this._rectshaft.set(l, t, r - l, b - t);
			this._resetTrackBar(l, t, r, b);
		}
	};

	_pScrollBar._resetTrackBar = function (l, t, r, b) {
		if (this._trackbarsize <= 0) {
			if (this.trackbar) {
				this.trackbar.set_visible(false);
			}
			return;
		}

		if (this.trackbar._is_created != true) {
			this.trackbar.on_created(this._getWindow());
		}

		this.trackbar.set_visible(true);

		var rl = 0, rt = 0, rr = 0, rb = 0;

		var min = this._min;
		var pos = this._pos;
		var tracksize = this._trackbarsize;
		var size = this._max - this._min;

		if (size > 0) {
			var shaftsize, trackstart;
			if (this.direction == "vertical") {
				shaftsize = b - t;
				trackstart = ((pos - min) *  (shaftsize - tracksize) / size) | 0;

				rl = l;
				rr = r;
				rt = t + trackstart;
				rb = rt + tracksize;

				if (rb > b) {
					rb = b;
					rt = b - tracksize;
				}
			}
			else {
				shaftsize = r - l;
				trackstart = parseInt((pos - min) *  (shaftsize - tracksize) / size);

				rl = l + trackstart;
				rr = rl + tracksize;
				rt = t;
				rb = b;

				if (rr > r) {
					rr = r;
					rl = r - tracksize;
				}
			}
		}

		if ((rl <= 0 && rt <= 0 && rr - rl <= 0 && rb - rt <= 0)) {
			this._set_real = true;
			this._setRealEnable(false);
			this.trackbar.set_visible(false);
		}
		else if (this._set_real) {
			this._set_real = false;
			this._setRealEnable(true);
			this.trackbar.set_visible(true);
		}

		if (!this._reset_trackbar_fix) {
			this.trackbar.move(rl, rt, rr - rl, rb - rt);
		}

		this._reset_trackbar_fix = false;
	};

	_pScrollBar._setRealEnable = function (enable) {
		if (enable == undefined) {
			enable = this.enable;
		}

		if (this._real_enable != enable) {
			this._real_enable = enable;

			this._is_enable_changing = true;
			this._changeStatus("disabled", !enable);
			this._is_enable_changing = false;

			if (this.incbutton) {
				this.incbutton._setEnable(enable);
			}
			if (this.decbutton) {
				this.decbutton._setEnable(enable);
			}
			if (this.trackbar) {
				this.trackbar._setEnable(enable);
			}
		}
	};

	_pScrollBar._moveTrackBar = function (rctrack, rcbound) {
		var width = rctrack.right - rctrack.left;
		var height = rctrack.bottom - rctrack.top;

		if (rctrack.left < rcbound.left) {
			rctrack.left = rcbound.left;
			rctrack.right = rctrack.left + width;
		}
		if (rctrack.right > rcbound.right) {
			rctrack.right = rcbound.right;
			rctrack.left = rctrack.right - width;
		}
		if (rctrack.top < rcbound.top) {
			rctrack.top = rcbound.top;
			rctrack.bottom = rctrack.top + height;
		}
		if (rctrack.bottom > rcbound.bottom) {
			rctrack.bottom = rcbound.bottom;
			rctrack.top = rctrack.bottom - height;
		}
		this.trackbar.move(rctrack.left, rctrack.top, rctrack.right - rctrack.left, rctrack.bottom - rctrack.top);
	};

	_pScrollBar._starttrack = function () {
		this.on_fire_onscroll(this.pos, "trackstart", undefined, undefined, this.direction);
	};
	_pScrollBar._endtrack = function () {
		this.on_fire_onscroll(this.pos, "trackend", undefined, undefined, this.direction);
		var rc = this._rectshaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};
	_pScrollBar._movetrack = function (x, y) {
		var nX = x;
		var nY = y;

		var min = this._min;
		var max = this._max;
		var pos = this._pos;

		var nDiff = 0;
		var size = max - min;
		var newpos = pos;

		var trackbar = this.trackbar;
		var rctrackorigin = {
			left : trackbar._adjust_left, 
			top : trackbar._adjust_top, 
			right : trackbar._adjust_left + trackbar._adjust_width, 
			bottom : trackbar._adjust_top + trackbar._adjust_height
		};

		var w = rctrackorigin.right - rctrackorigin.left;
		var h = rctrackorigin.bottom - rctrackorigin.top;
		if (w <= 0 || h <= 0) {
			return;
		}

		var rctrack = {
			left : rctrackorigin.left, 
			top : rctrackorigin.top, 
			right : rctrackorigin.right, 
			bottom : rctrackorigin.bottom
		};

		var rc;
		if (this.direction == "vertical") {
			rc = this._rectshaft;
			nDiff = nY - this._mousepoint.y;
			if ((nDiff < 0 && rctrackorigin.top > rc.top) || (nDiff > 0 && rctrackorigin.bottom < rc.bottom)) {
				rctrack.top += nDiff;
				rctrack.bottom += nDiff;

				newpos = (size *  (rctrack.top - rc.top) / ((rc.bottom - rc.top) - (rctrack.bottom - rctrack.top)));
				this._moveTrackBar(rctrack, rc);

				if (trackbar._adjust_top - rctrackorigin.top == 0) {
					this._mousepoint.x = nX;
					this._mousepoint.y = nY;
				}
				else {
					this._mousepoint.x = nX;
					this._mousepoint.y = this._mousepoint.y + (trackbar._adjust_top - rctrackorigin.top);
				}
			}
		}
		else {
			rc = this._rectshaft;
			nDiff = nX - this._mousepoint.x;
			if ((nDiff < 0 && rctrackorigin.left > rc.left) || (nDiff > 0 && rctrackorigin.right < rc.right)) {
				rctrack.left += nDiff;
				rctrack.right += nDiff;

				newpos = parseInt(size *  ((rctrack.left - rc.left) / ((rc.right - rc.left) - (rctrack.right - rctrack.left))));
				this._moveTrackBar(rctrack, rc);
				if (trackbar._adjust_left - rctrackorigin.left == 0) {
					this._mousepoint.x = nX;
					this._mousepoint.y = nY;
				}
				else {
					this._mousepoint.x = this._mousepoint.x + (trackbar._adjust_left - rctrackorigin.left);
					this._mousepoint.y = nY;
				}
			}
		}
		var posarr;
		if (newpos <= min) {
			posarr = this._scroll_reverse_convert(min);
			this.pos = posarr[0];
			this._pos = posarr[1];

			if (!(this._trackover & nexacro.ScrollBarControl.TRACKFIRSTOVER)) {
				this.on_fire_onscroll(this.pos, "trackfirst", undefined, undefined, this.direction);
				this._trackover = nexacro.ScrollBarControl.TRACKFIRSTOVER;
			}
			else {
				this.on_fire_onscroll(this.pos, "trackfirstover", undefined, undefined, this.direction);
			}
		}
		else if (newpos >= max) {
			posarr = this._scroll_reverse_convert(max);
			this.pos = posarr[0];
			this._pos = posarr[1];

			if (!(this._trackover & nexacro.ScrollBarControl.TRACKLASTOVER)) {
				this.on_fire_onscroll(this.pos, "tracklast", undefined, undefined, this.direction);
				this._trackover = nexacro.ScrollBarControl.TRACKLASTOVER;
			}
			else {
				this.on_fire_onscroll(this.pos, "tracklastover", undefined, undefined, this.direction);
			}
		}
		else {
			posarr = this._scroll_reverse_convert(newpos);
			this.pos = posarr[0];
			this._pos = posarr[1];

			this.on_fire_onscroll(this.pos, "track", undefined, undefined, this.direction);
			this._trackover = 0;
		}
	};

	_pScrollBar._getIncNewPosPixel = function () {
	};
	_pScrollBar._getDecNewPosPixel = function () {
	};


	delete _pScrollBar;
}

if (!nexacro.ScrollIndicatorControl) {
	nexacro.ScrollIndicatorControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.ScrollBarControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pScrollIndicatorControl = nexacro._createPrototype(nexacro.ScrollBarControl, nexacro.ScrollIndicatorControl);
	nexacro.ScrollIndicatorControl.prototype = _pScrollIndicatorControl;

	_pScrollIndicatorControl.accessibilityenable = false;

	_pScrollIndicatorControl._type_name = "ScrollIndicatorControl";
	_pScrollIndicatorControl._is_subcontrol = true;
	_pScrollIndicatorControl._is_repeat = false;

	_pScrollIndicatorControl.on_get_css_assumedtypename = function () {
		if (this.direction == "vertical") {
			return "VScrollIndicatorControl";
		}
		else if (this.direction == "horizontal") {
			return "HScrollIndicatorControl";
		}

		return this._type_name;
	};

	_pScrollIndicatorControl.on_create_contents = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this.trackbar = new nexacro.Button("trackbar", 0, 0, 0, 0, null, null, null, null, null, null, this);
			this.trackbar._use_translate_move = true;
			this.trackbar.accessibilityenable = false;

			this.trackbar._setControl();
			this.trackbar.createComponent();
		}
	};

	_pScrollIndicatorControl.on_created_contents = function () {
		this._recalcLayout();
	};

	_pScrollIndicatorControl.on_destroy_contents = function () {
		if (this.trackbar) {
			this.trackbar.destroy();
			this.trackbar = null;
		}

		this._rectshaft = null;
		this._mousepoint = null;
	};

	_pScrollIndicatorControl.on_create_contents_command = function () {
		this._recalcLayout();
		var str = "";

		if (this.trackbar) {
			str += this.trackbar.createCommand();
		}

		return str;
	};

	_pScrollIndicatorControl.on_attach_contents_handle = function (win) {
		if (this.trackbar) {
			this.trackbar.attachHandle(win);
		}
	};

	_pScrollIndicatorControl.set_pos = function (v) {
		this._setPos(v);
	};

	_pScrollIndicatorControl.on_apply_prop_enable = function (v) {
		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		if (this.trackbar) {
			this.trackbar._setEnable(enable);
		}
	};

	_pScrollIndicatorControl._setRealEnable = function (enable) {
		if (enable == undefined) {
			enable = this.enable;
		}

		if (this._real_enable != enable) {
			this._real_enable = enable;

			if (this.trackbar) {
				this.trackbar._setEnable(enable);
			}
		}
	};

	_pScrollIndicatorControl._recalcLayout = function () {
		var control_elem = this._control_element;
		if (control_elem && this._is_created_contents) {
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			if (client_width <= 0 || client_height <= 0) {
				return;
			}

			var client_left = this._getClientLeft();
			var client_top = this._getClientTop();

			var l = 0, r = 0, t = 0, b = 0;

			var shaftsize, tracksize = 0;
			var view, barminsize, baroutsize, size;
			if (this.direction == "vertical") {
				l = client_left;
				r = l + client_width;
				t = client_top;
				b = client_top + client_height;

				shaftsize = client_height;
				if (shaftsize > 0) {
					view = this.view;
					barminsize = this.barminsize != undefined ? this.barminsize : -1;
					baroutsize = this.baroutsize != undefined ? this.baroutsize : -1;
					size = this._max - this._min;

					if (baroutsize < 0) {
						baroutsize = client_width;
					}
					if (barminsize < 0) {
						barminsize = (client_width *  0.60) | 0;
						if (barminsize < nexacro.ScrollIndicatorControl.TRACKBAR_SIZE_MIN) {
							barminsize = nexacro.ScrollIndicatorControl.TRACKBAR_SIZE_MIN;
						}
					}
					if (view < 0) {
						view = 1;
					}

					if (shaftsize > baroutsize) {
						if (this.trackbarsize != undefined && this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							tracksize = (shaftsize *  (view / (view + size))) | 0;
							this._trackbarsize = (tracksize < barminsize) ? barminsize : tracksize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (shaftsize < this._trackbarsize) {
					this._trackbarsize = shaftsize;
				}
			}
			else {
				l = client_left;
				r = l + client_width;
				t = client_top;
				b = client_top + client_height;

				shaftsize = client_width;
				if (shaftsize > 0) {
					view = this.view;
					barminsize = this.barminsize != undefined ? this.barminsize : -1;
					baroutsize = this.baroutsize != undefined ? this.baroutsize : -1;
					size = this._max - this._min;

					if (baroutsize < 0) {
						baroutsize = client_height;
					}
					if (barminsize < 0) {
						barminsize = parseInt(client_height *  0.60) | 0;
						if (barminsize < nexacro.ScrollIndicatorControl.TRACKBAR_SIZE_MIN) {
							barminsize = nexacro.ScrollIndicatorControl.TRACKBAR_SIZE_MIN;
						}
					}
					if (view < 0) {
						view = 1;
					}

					this._barminsize = barminsize;
					this._baroutsize = baroutsize;

					if (shaftsize > baroutsize) {
						if (this.trackbarsize != undefined && this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							tracksize = (shaftsize *  (view / (view + size))) | 0;
							this._trackbarsize = (tracksize < barminsize) ? barminsize : tracksize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (shaftsize < this._trackbarsize) {
					this._trackbarsize = shaftsize;
				}
			}
			this._rectshaft.set(l, t, r - l, b - t);
			this._resetTrackBar(l, t, r, b);
		}
	};


	_pScrollBar.set_imgoutsize = nexacro._emptyFn;

	_pScrollIndicatorControl._on_repeat = nexacro._emptyFn;
	_pScrollIndicatorControl._on_startrepeat = nexacro._emptyFn;
	_pScrollIndicatorControl._on_starttrack = nexacro._emptyFn;
	_pScrollIndicatorControl._on_endtrack = nexacro._emptyFn;
	_pScrollIndicatorControl._on_movetrack = nexacro._emptyFn;
	_pScrollIndicatorControl.on_page_click = nexacro._emptyFn;



	_pScrollIndicatorControl._getIncNewPosPixel = function () {
	};
	_pScrollIndicatorControl._getDecNewPosPixel = function () {
	};


	delete _pScrollIndicatorControl;
}
