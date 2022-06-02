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

if (!nexacro.GroupBox) {
	nexacro.GroupBox = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pGroupBox = nexacro._createPrototype(nexacro.Component, nexacro.GroupBox);
	nexacro.GroupBox.prototype = _pGroupBox;
	_pGroupBox._type_name = "GroupBox";


	_pGroupBox._titlecontrol = null;
	_pGroupBox._boxcontrol = null;


	_pGroupBox.titlealign = "topleft";
	_pGroupBox.titlegap = undefined;
	_pGroupBox.tabstop = false;


	_pGroupBox._title_adjust_width = 8;


	_pGroupBox._is_focus_accept = false;
	_pGroupBox.accessibilityrole = "groupbox";


	_pGroupBox._event_list = {
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};


	_pGroupBox._accessibility_role = "groupbox";

	_pGroupBox.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var boxcontrol = this._boxcontrol = new nexacro.Static("groupboxcontents", 0, 0, 0, 0, null, null, null, null, null, null, this);
			boxcontrol._setControl();
			boxcontrol.createComponent(true);

			var titlecontrol = this._titlecontrol = new nexacro._IconText("groupboxtitle", 0, 0, 0, 0, null, null, null, null, null, null, this);
			titlecontrol._setControl();
			titlecontrol.set_text(this._displaytext);
			titlecontrol.createComponent(true);
		}
	};

	_pGroupBox.on_created_contents = function (win) {
		this._recalcLayout();

		var boxcontrol = this._boxcontrol;
		if (boxcontrol) {
			boxcontrol.on_created(win);
		}

		var titlecontrol = this._titlecontrol;
		if (titlecontrol) {
			titlecontrol.on_created(win);
		}
	};

	_pGroupBox.on_destroy_contents = function () {
		if (this._boxcontrol) {
			this._boxcontrol.destroy();
			this._boxcontrol = null;
		}

		if (this._titlecontrol) {
			this._titlecontrol.destroy();
			this._titlecontrol = null;
		}
	};

	_pGroupBox.on_create_contents_command = function () {
		this._recalcLayout();

		var boxcontrol = this._boxcontrol;
		var titlecontrol = this._titlecontrol;

		var str = "";
		if (boxcontrol) {
			str += boxcontrol.createCommand();
		}
		if (titlecontrol) {
			str += titlecontrol.createCommand();
		}

		return str;
	};

	_pGroupBox.on_attach_contents_handle = function (win) {
		var boxcontrol = this._boxcontrol;
		var titlecontrol = this._titlecontrol;

		if (boxcontrol) {
			boxcontrol.attachHandle(win);
		}

		if (titlecontrol) {
			titlecontrol.attachHandle(win);
		}
	};

	_pGroupBox.on_change_containerRect = function () {
		if (this._is_created_contents) {
			this._recalcLayout();
		}
	};

	_pGroupBox.on_change_containerPos = function () {
	};

	_pGroupBox.on_get_prop_tabstop = function () {
		if (nexacro._enableaccessibility) {
			var accessibility = this.accessibility;
			if (accessibility && accessibility.enable && accessibility.role == "link") {
				return true;
			}
		}
		return false;
	};

	_pGroupBox._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pGroupBox.on_apply_prop_enable = function (v) {
		var boxcontrol = this._boxcontrol;
		if (boxcontrol) {
			boxcontrol.set_enable(v);
		}

		var titlecontrol = this._titlecontrol;
		if (titlecontrol) {
			titlecontrol.set_enable(v);
		}
	};

	_pGroupBox.set_titlealign = function (v) {
		var titlealign_enum = ["topleft", "topcenter", "topright", "lefttop", "leftcenter", "leftbottom", "righttop", "rightcenter", "rightbottom", "bottomleft", "bottomcenter", "bottomright"];
		if (titlealign_enum.indexOf(v) == -1) {
			return;
		}

		if (this.titlealign != v) {
			this.titlealign = v;
			this.on_apply_titlealign(v);
		}
	};

	_pGroupBox.on_apply_titlealign = function () {
		this._recalcLayout();
	};

	_pGroupBox.set_titlegap = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v) || v < 0) {
				return;
			}
		}

		if (this.titlegap != v) {
			this.titlegap = v;
			this.on_apply_titlegap(v);
		}
	};

	_pGroupBox.on_apply_titlegap = function () {
		this._recalcLayout();
	};

	_pGroupBox.on_apply_text = function (text) {
		var titlecontrol = this._titlecontrol;
		if (titlecontrol) {
			titlecontrol.set_text(text);

			this._recalcLayout();
		}
	};

	_pGroupBox.on_apply_font = function (font) {
		nexacro.Component.prototype.on_apply_font.call(this, font);

		this._recalcLayout();
	};

	_pGroupBox.on_apply_prop_cssclass = function () {
		var titlecontrol = this._titlecontrol;
		if (titlecontrol) {
			titlecontrol.on_apply_cssclass();
		}

		var boxcontrol = this._boxcontrol;
		if (boxcontrol) {
			boxcontrol.on_apply_cssclass();
		}
		this._recalcLayout();
	};

	_pGroupBox._recalcLayout = function () {
		var control_elem = this.getElement();
		if (control_elem && this._is_created_contents) {
			var titlecontrol = this._titlecontrol;
			var boxcontrol = this._boxcontrol;

			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();

			var titlealign = this.titlealign;
			var titlegap = this.titlegap;
			if (!titlegap) {
				titlegap = 10;
			}

			var title_size = titlecontrol._on_getFitSize();
			var title_w = title_size[0] + this._title_adjust_width;
			var title_h = title_size[1];

			var title_l, title_t;
			var box_l, box_t, box_w, box_h;

			if (titlealign.indexOf("top") == 0) {
				box_l = 0;
				box_t = title_h / 2;
				box_w = client_w;
				box_h = client_h - (title_h / 2);

				title_t = 0;
				if (titlealign == "topleft") {
					title_l = titlegap;
				}
				else if (titlealign == "topcenter") {
					title_l = (client_w / 2) - (title_w / 2);
				}
				else if (titlealign == "topright") {
					title_l = client_w - title_w - titlegap;
				}
			}
			else if (titlealign.indexOf("left") == 0) {
				box_l = title_w / 2;
				box_t = 0;
				box_w = client_w - (title_w / 2);
				box_h = client_h;

				title_l = 0;
				if (titlealign == "lefttop") {
					title_t = titlegap;
				}
				else if (titlealign == "leftcenter") {
					title_t = (client_h / 2) - (title_h / 2);
				}
				else if (titlealign == "leftbottom") {
					title_t = client_h - title_h - titlegap;
				}
			}
			else if (titlealign.indexOf("right") == 0) {
				box_l = 0;
				box_t = 0;
				box_w = client_w - (title_w / 2);
				box_h = client_h;

				title_l = client_w - title_w;
				if (titlealign == "righttop") {
					title_t = titlegap;
				}
				else if (titlealign == "rightcenter") {
					title_t = (client_h / 2) - (title_h / 2);
				}
				else if (titlealign == "rightbottom") {
					title_t = client_h - title_h - titlegap;
				}
			}
			else if (titlealign.indexOf("bottom") == 0) {
				box_l = 0;
				box_t = 0;
				box_w = client_w;
				box_h = client_h - (title_h / 2);

				title_t = client_h - title_h;
				if (titlealign == "bottomleft") {
					title_l = titlegap;
				}
				else if (titlealign == "bottomcenter") {
					title_l = (client_w / 2) - (title_w / 2);
				}
				else if (titlealign == "bottomright") {
					title_l = client_w - title_w - titlegap;
				}
			}

			titlecontrol.move(title_l, title_t, title_w, title_h);
			boxcontrol.move(box_l, box_t, box_w, box_h);
		}
	};

	delete _pGroupBox;
}
