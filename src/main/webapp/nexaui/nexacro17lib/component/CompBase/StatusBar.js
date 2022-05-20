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

if (!nexacro.StatusBarControl) {
	nexacro.StatusBarControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Form.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pStatusBarControl = nexacro._createPrototype(nexacro.Form, nexacro.StatusBarControl);
	nexacro.StatusBarControl.prototype = _pStatusBarControl;

	_pStatusBarControl._type_name = "StatusBarControl";


	_pStatusBarControl.statustext = null;
	_pStatusBarControl.progressbar = null;
	_pStatusBarControl.resizegrip = null;

	_pStatusBarControl.resizable = false;

	_pStatusBarControl.progressbardirection = "forward";
	_pStatusBarControl.progressbargap = undefined;
	_pStatusBarControl.progressbarsize = undefined;
	_pStatusBarControl._progressbargap = 1;
	_pStatusBarControl._progressbarsize = 200;
	_pStatusBarControl.progressbarsmooth = false;




	_pStatusBarControl._is_nc_control = true;
	_pStatusBarControl._is_scrollable = false;

	_pStatusBarControl._is_subcontrol = true;

	nexacro.StatusBarControl._default_progressbarwidth = 200;
	nexacro.StatusBarControl._default_progressbarheight = 19;
	nexacro.StatusBarControl._default_progressbargap = 1;



	_pStatusBarControl.set_progressbarsize = function (val) {
		if (this.progressbarsize != val) {
			this.progressbarsize = val;
			this._progressbarsize = parseInt(val);
			if (this._progressbarsize < 0) {
				this._progressbarsize = 0;
			}
			this.on_apply_progressbar();
		}
	};


	_pStatusBarControl.set_progressbargap = function (val) {
		if (this.progressbargap != val) {
			this.progressbargap = val;
			this._progressbargap = parseInt(val);
			if (this._progressbargap < 0) {
				this._progressbargap = 0;
			}
			this.on_apply_progressbar();
		}
	};

	_pStatusBarControl.on_apply_progressbar = function () {
		var progressbar = this.progressbar;
		if (progressbar && progressbar.visible && this._is_created) {
			this._recalcLayout(this._getClientWidth(), this._getClientHeight());
		}
	};

	_pStatusBarControl.set_progressbardirection = function (val) {
		if (this.progressbardirection != val) {
			this.progressbardirection = val;
			this.on_apply_progressbardirection(val);
		}
	};

	_pStatusBarControl.on_apply_progressbardirection = function (v) {
		var progressbar = this.progressbar;
		if (progressbar) {
			progressbar.set_direction(v);
		}
	};

	_pStatusBarControl.set_progressbarsmooth = function (val) {
		if (this.progressbarsmooth != val) {
			this.progressbarsmooth = val;
			this.on_apply_progressbarsmooth(val);
		}
	};

	_pStatusBarControl.on_apply_progressbarsmooth = function (v) {
		var progressbar = this.progressbar;
		if (progressbar) {
			progressbar.set_smooth(v);
		}
	};


	_pStatusBarControl.set_resizable = function (val) {
		val = nexacro._toBoolean(val);
		if (this.resizable != val) {
			this.resizable = val;
			this.on_apply_resizable(val);
		}
	};

	_pStatusBarControl._createResizeGrip = function () {
		var resizegrip = this.resizegrip = new nexacro._Icon("resizegrip", 0, 0, 0, 0, null, null, null, null, null, null, this);
		resizegrip._on_starttrack = this._on_starttrack;
		resizegrip._on_movetrack = this._on_movetrack;
		resizegrip._on_endtrack = this._on_endtrack;
		resizegrip._setControl();
		resizegrip.createComponent();
		return resizegrip;
	};

	_pStatusBarControl.on_apply_resizable = function (resizable) {
		var resizegrip = this.resizegrip;
		var ownerframe = this.getOwnerFrame();
		if (this._is_created && resizable && !resizegrip) {
			resizegrip = this._createResizeGrip();
			resizegrip.on_created(this._getWindow());
		}

		if (ownerframe && resizegrip) {
			resizegrip._is_track = resizable;



			resizegrip.set_cursor(resizable ? "se-resize" : "arrow");
			var resizegrip_controlelem = resizegrip.getElement();
			if (resizegrip_controlelem) {
				resizegrip_controlelem.setElementHittestType(resizable && ownerframe._is_window ? "resizingborder_bottomright" : undefined);
			}
		}

		this._recalcLayout(this._getClientWidth(), this._getClientHeight());
	};

	_pStatusBarControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var statustext = this.statustext = new nexacro.Static("statustext", 0, 0, 0, 0, null, null, null, null, null, null, this);
			statustext._setControl();

			if (this._displaytext) {
				statustext.set_text(this._displaytext);
			}
			statustext.createComponent();

			var progressbar = this.progressbar = new nexacro.ProgressBar("progressbar", 0, 0, 0, 0, null, null, null, null, null, null, this);
			progressbar._setControl();
			progressbar.createComponent();


			this._createResizeGrip();
		}
	};
	_pStatusBarControl.on_created_contents = function (win) {
		this.on_apply_resizable(this.resizable);
		this.statustext.on_created(win);
		this.progressbar.on_created(win);
		this.resizegrip.on_created(win);
	};

	_pStatusBarControl.on_destroy_contents = function (callremovechild) {
		var statustext = this.statustext;
		var progressbar = this.progressbar;
		var resizegrip = this.resizegrip;

		if (statustext) {
			statustext.destroy(callremovechild);
			this.statustext = null;
		}
		if (progressbar) {
			progressbar.destroy(callremovechild);
			this.progressbar = null;
		}
		if (resizegrip) {
			resizegrip.destroy(callremovechild);
			this.resizegrip = null;
		}
	};


	_pStatusBarControl.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			nexacro.Form.prototype.on_change_containerRect.call(this, width, height);
			this._recalcLayout(width, height);
		}
	};


	_pStatusBarControl.on_apply_text = function (text) {
		if (this.statustext) {
			this.statustext.set_text(text);
		}
	};




	_pStatusBarControl._on_load_resizegripicon = function () {
	};


	_pStatusBarControl._recalcLayout = function (width, height) {
		var left = width;
		var top = this._getClientTop();

		var resizegrip = this.resizegrip;
		if (resizegrip) {
			var resizegripwidth = 0;
			if (this.resizable) {
				var padding = resizegrip._getCurrentStylePadding();
				var border = resizegrip._getCurrentStyleBorder();
				var icon = resizegrip.icon ? resizegrip.icon : resizegrip._getCSSStyleValue("icon");

				if (border) {
					resizegripwidth = border._getBorderWidth();
				}
				if (padding) {
					resizegripwidth += padding.left + padding.right;
				}
				if (icon) {
					var iconsize = nexacro._getImageSize(icon.value, this._on_load_resizegripicon, this);
					if (iconsize) {
						resizegripwidth += iconsize.width;
					}
				}

				left = width - resizegripwidth;
			}
			resizegrip.move(left, top, resizegripwidth, height);
		}

		var progressbar = this.progressbar;
		if (progressbar) {
			var progressbarwidth = this._progressbarsize;
			left -= (this._progressbargap + progressbarwidth);
			progressbar.move(left, top, progressbarwidth, height);
		}

		var statustext = this.statustext;
		if (statustext) {
			statustext.move(this._getClientLeft(), top, left, height);
		}
	};
	_pStatusBarControl._on_starttrack = function () {
		var ownerframe = this.parent.getOwnerFrame();
		ownerframe._on_border_starttrack(this.cursor);
	};

	_pStatusBarControl._on_endtrack = function (x, y, dragdata) {
		var ownerframe = this.parent.getOwnerFrame();
		ownerframe._on_border_endtrack(x, y, dragdata);
	};


	_pStatusBarControl._on_movetrack = function (x, y, dragdata) {
		var ownerframe = this.parent.getOwnerFrame();
		ownerframe._on_border_movetrack(x, y, dragdata);
	};
	delete _pStatusBarControl;
}

