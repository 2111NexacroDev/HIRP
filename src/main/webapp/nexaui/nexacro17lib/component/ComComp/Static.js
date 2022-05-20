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

if (!nexacro._IconText) {
	nexacro._IconText = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pIconText = nexacro._createPrototype(nexacro.Component, nexacro._IconText);
	nexacro._IconText.prototype = _pIconText;
	_pIconText._type_name = "IconText";


	_pIconText._cell_elem = null;


	_pIconText.text = "";
	_pIconText.icon = "";
	_pIconText.iconPosition = "";
	_pIconText.textPadding = "";
	_pIconText.textwidth = undefined;
	_pIconText.tabstop = false;


	_pIconText._textpadding = null;


	_pIconText._is_focus_accept = false;
	_pIconText._is_simple_control = true;
	_pIconText._is_eventinfo_control = false;
	_pIconText._is_fiticonsize = false;
	_pIconText._icon_width = 0;
	_pIconText._icon_height = 0;

	_pIconText.accessibilityrole = "Icon";

	_pIconText.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = this._cell_elem = new nexacro.IconTextElement(control_elem, "icontext", this._is_fiticonsize);

			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);


			if (this.textAlign) {
				cellElem.setElementTextAlign(this.textAlign);
			}
			if (this.verticalAlign) {
				cellElem.setElementVerticalAlign(this.verticalAlign);
			}

			var wordwrap_info = this._getCSSStyleValue("wordWrap");
			if (wordwrap_info) {
				cellElem.setElementCSSMapInfo(wordwrap_info);
			}

			if (this.wordWrap) {
				cellElem.setElementWordWrap(this.wordWrap);
			}

			var textPadding = this._textpadding || this._getCSSStyleValue("textPadding");
			if (textPadding) {
				cellElem.setElementTextPadding(textPadding);
			}

			if (this.textwidth != null) {
				cellElem.setElementTextWidth(this.textwidth);
			}

			if (this._textdecoration) {
				cellElem.setElementTextDecoration(this._textdecoration);
			}

			if (this._displaytext) {
				cellElem.setElementText(this._displaytext);
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon) {
				cellElem.setElementIcon(icon);
			}

			var icon_pos = this.iconPosition || this._getCSSStyleValue("iconPosition");
			cellElem.setElementIconPos(icon_pos);
		}
	};

	_pIconText.on_created_contents = function (win) {
		if (this.expr) {
			this._on_apply_expr(this.expr);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pIconText.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}

		if (this._textpadding) {
			this._textpadding = null;
		}

		if (this._icon) {
			this._icon = null;
		}
	};

	_pIconText.on_create_contents_command = function () {
		if (this.expr) {
			this._on_apply_expr(this.expr);
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			return cellElem.createCommand();
		}

		return "";
	};

	_pIconText.on_attach_contents_handle = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.attachHandle(win);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}
	};

	_pIconText.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pIconText.on_change_containerPos = function (left, top) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pIconText.on_apply_status = function (status, userstatus) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			if (!this.textPadding) {
				cellElem.setElementTextPadding(this._getCSSStyleValue("textPadding", status, userstatus));
			}
			if (!this.icon) {
				cellElem.setElementIcon(this._getCSSStyleValue("icon", status, userstatus));
			}
			if (!this.iconPosition) {
				cellElem.setElementIconPos(this._getCSSStyleValue("iconPosition", status, userstatus));
			}

			var wordwrap_info = this._getCSSStyleValue("wordWrap", status, userstatus);
			if (wordwrap_info) {
				cellElem.setElementCSSMapInfo(wordwrap_info);
			}
		}
	};

	_pIconText.on_get_accessibility_label = function () {
		return this.text;
	};

	_pIconText._on_getFitSize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var text;
			if (this._displaytext && this._displaytext !== "") {
				text = this._displaytext;
			}
			else {
				text = this.text;
			}
			if (text) {
				var font = this._getCurrentStyleInheritValue("font");
				var wordspace = this._getCurrentStyleInheritValue("wordSpacing");
				var letterspace = this._getCurrentStyleInheritValue("letterSpacing");
				var wordwrap = "none";
				var width;

				var multiline = false;
				if (text.search("\n") > -1) {
					multiline = true;
				}

				if (this.fittocontents == "height") {
					wordwrap = this.wordWrap || this._getCSSStyleValue("wordWrap");
					if (wordwrap && wordwrap != "none") {
						multiline = true;
					}

					width = this._adjust_width - total_w;
				}

				var text_size = nexacro._getTextSize(text, font, multiline, width, wordwrap, wordspace, letterspace);

				total_w += Math.ceil(this.textwidth != null ? this.textwidth : text_size[0]);
				total_h += Math.ceil(text_size[1]);
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon) {
				var textpadding = this._textpadding || this._getCSSStyleValue("textPadding");
				var icon_pos = this.iconPosition || this._getCSSStyleValue("iconPosition");

				var icon_size;
				if (this._icon_width != 0 && this._icon_height != 0) {
					icon_size = {
						width : this._icon_width, 
						height : this._icon_height
					};
				}
				else {
					icon_size = nexacro._getImageSize(icon.url, this._on_icon_onload, this, undefined, this.image) || {
						width : this._icon_width, 
						height : this._icon_height
					};
				}

				if (icon_pos == "top" || icon_pos == "bottom") {
					total_h += icon_size.height;
					total_w = Math.max(total_w, icon_size.width);
				}
				else {
					total_w += icon_size.width;
					total_h = Math.max(total_h, icon_size.height);
				}

				if (textpadding) {
					total_w += textpadding.left + textpadding.right;
					total_h += textpadding.top + textpadding.bottom;
				}
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pIconText._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pIconText.set_icon = function (v) {
		this.icon = v;
		if (v) {
			if (this._icon == null || this._icon.value != v) {
				var icon = nexacro.UrlObject(v, this);
				this._icon = icon;
				this.on_apply_icon(icon);
			}
		}
		else {
			if (this._icon) {
				this._icon = null;
				this.on_apply_icon(null);
			}
		}

		this._icon_width = 0;
		this._icon_height = 0;
	};

	_pIconText.on_apply_icon = function (icon) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementIcon(icon || this._getCSSStyleValue("icon", this._status, this._userstatus));
		}
	};

	_pIconText.set_iconPosition = function (v) {
		if (this.iconPosition != v) {
			this.iconPosition = v;
			this.on_apply_iconPosition(v);
		}
	};

	_pIconText.on_apply_iconPosition = function (iconpos) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementIconPos(iconpos || this._getCSSStyleValue("iconPosition", this._status, this._userstatus));
		}
	};

	_pIconText.set_textPadding = function (v) {
		this.textPadding = v;
		if (v) {
			if (this._textpadding == null || this._textpadding.value != v) {
				var textPadding = nexacro.PaddingObject(v);
				this._textpadding = textPadding;
				this.on_apply_textPadding(textPadding);
			}
		}
		else {
			if (this._textpadding) {
				this._textpadding = null;
				this.on_apply_textPadding(null);
			}
		}
	};

	_pIconText.on_apply_textPadding = function (textPadding) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextPadding(textPadding || this._getCSSStyleValue("textPadding", this._status, this._userstatus));
		}
	};

	_pIconText.set_textwidth = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.textwidth != v) {
			this.textwidth = v;
			this.on_apply_textwidth(v);
		}
	};

	_pIconText.on_apply_textwidth = function (textwidth) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextWidth(textwidth);
		}
	};

	_pIconText.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementText(text);
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityLabel(this._getAccessibilityLabel());
		}
	};

	_pIconText.on_apply_textAlign = function (halign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextAlign(halign);
		}
	};

	_pIconText.on_apply_verticalAlign = function (valign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementVerticalAlign(valign);
		}
	};

	_pIconText.on_apply_wordWrap = function (wordwrap) {
		if (!this._isEnableRedraw()) {
			return;
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementWordWrap(wordwrap);

			if (this.fittocontents != "none") {
				this._update_position();
			}
		}
	};

	_pIconText.on_apply_textDecoration = function (textDecoration) {
		if (!this._isEnableRedraw()) {
			return;
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextDecoration(textDecoration);
		}
	};

	_pIconText._on_icon_onload = function (url, width, height) {
		if (this.fittocontents !== "none" && (this._icon_width != width || this._icon_height != height)) {
			this._icon_width = width;
			this._icon_height = height;

			this._update_position();
		}
	};

	_pIconText._getCurrentIcon = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			return cellElem.icon;
		}

		return null;
	};

	delete _pIconText;
}

if (!nexacro._Icon) {
	nexacro._Icon = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pIcon = nexacro._createPrototype(nexacro.Component, nexacro._Icon);
	nexacro._Icon.prototype = _pIcon;
	_pIcon._type_name = "Icon";


	_pIcon._cell_elem = null;


	_pIcon.icon = "";
	_pIcon.padding = "";
	_pIcon.textAlign = "";
	_pIcon.verticalAlign = "";
	_pIcon.tabstop = false;


	_pIcon._icon = null;


	_pIcon._is_focus_accept = false;
	_pIcon._is_simple_control = true;
	_pIcon._is_eventinfo_control = false;
	_pIcon._is_fiticonsize = false;

	_pIcon.accessibilityrole = "Icon";

	_pIcon.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = new nexacro.IconElement(control_elem, "icon", this._is_fiticonsize);
			this._cell_elem = cellElem;

			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);


			if (this.textAlign) {
				cellElem.setElementTextAlign(this.textAlign);
			}
			if (this.verticalAlign) {
				cellElem.setElementVerticalAlign(this.verticalAlign);
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon) {
				cellElem.setElementIcon(icon);
			}
		}
	};

	_pIcon.on_created_contents = function (win) {
		if (this.fittocontents != "none") {
			this._update_position();
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pIcon.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}

		if (this._icon) {
			this._icon = null;
		}
	};

	_pIcon.on_create_contents_command = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			return cellElem.createCommand();
		}

		return "";
	};

	_pIcon.on_attach_contents_handle = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.attachHandle(win);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}
	};

	_pIcon.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pIcon.on_change_containerPos = function (left, top) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pIcon.on_apply_status = function (status, userstatus) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			if (!this.icon) {
				cellElem.setElementIcon(this._getCSSStyleValue("icon", status, userstatus));
			}
		}
	};

	_pIcon._on_getFitSize = function () {
		var elem = this.getElement();
		if (elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon) {
				var icon_pos = this.iconPosition || this._getCSSStyleValue("iconPosition");
				var icon_size = nexacro._getImageSize(icon.url, this._on_icon_onload, this, undefined, this.image) || {
					width : 0, 
					height : 0
				};

				if (icon_pos == "left" || icon_pos == "right") {
					total_w += icon_size.width;
					total_h = Math.max(total_h, icon_size.height);
				}
				else {
					total_h += icon_size.height;
					total_w = Math.max(total_w, icon_size.width);
				}
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pIcon._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pIcon.set_icon = function (v) {
		this.icon = v;
		if (v) {
			if (this._icon == null || this._icon.value != v) {
				var icon = nexacro.UrlObject(v, this);
				this._icon = icon;
				this.on_apply_icon(icon);
			}
		}
		else {
			if (this._icon) {
				this._icon = null;
				this.on_apply_icon(null);
			}
		}
	};

	_pIcon.on_apply_icon = function (icon) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementIcon(icon || this._getCSSStyleValue("icon", this._status, this._userstatus));
		}
	};

	_pIcon.on_apply_textAlign = function (halign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextAlign(halign);
		}
	};

	_pIcon.on_apply_verticalAlign = function (valign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementVerticalAlign(valign);
		}
	};

	_pIcon._on_icon_onload = function (url, width, height) {
		if (this.fittocontents !== "none") {
			this._update_position();
		}
	};

	_pIcon._getCurrentIcon = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			return cellElem.icon;
		}

		return null;
	};

	delete _pIcon;
}

if (!nexacro.Static) {
	nexacro.Static = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pStatic = nexacro._createPrototype(nexacro.Component, nexacro.Static);
	nexacro.Static.prototype = _pStatic;
	_pStatic._type_name = "Static";


	_pStatic._cell_elem = null;


	_pStatic.text = "";
	_pStatic.usedecorate = false;
	_pStatic.tabstop = false;


	_pStatic._is_focus_accept = false;
	_pStatic._is_simple_control = true;
	_pStatic._apply_client_padding = true;

	_pStatic.accessibilityrole = "static";


	_pStatic._event_list = 
		{
		"onclick" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onlongpress" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onsize" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"oncontextmenu" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1
	};

	_pStatic.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = this._cell_elem = new nexacro.TextBoxElement(control_elem, "text");
			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);


			if (this.textAlign) {
				cellElem.setElementTextAlign(this.textAlign);
			}
			if (this.verticalAlign) {
				cellElem.setElementVerticalAlign(this.verticalAlign);
			}

			var wordwrap_info = this._getCSSStyleValue("wordWrap");
			if (wordwrap_info) {
				cellElem.setElementCSSMapInfo(wordwrap_info);
			}

			if (this.wordWrap) {
				cellElem.setElementWordWrap(this.wordWrap);
			}

			if (this._textdecoration) {
				cellElem.setElementTextDecoration(this._textdecoration);
			}

			if (this._displaytext) {
				if (this.usedecorate) {
					cellElem.setElementDecorateText(this._displaytext);
				}
				else {
					cellElem.setElementText(this._displaytext);
				}

				cellElem.setElementPointerEvents();
			}
		}
	};

	_pStatic.on_created_contents = function (win) {
		if (this.expr) {
			this._on_apply_expr(this.expr);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pStatic.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}
	};

	_pStatic.on_create_contents_command = function () {
		if (this.expr) {
			this._on_apply_expr(this.expr);
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			return cellElem.createCommand();
		}

		return "";
	};

	_pStatic.on_attach_contents_handle = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.attachHandle(win);
		}

		if (this.fittocontents != "none") {
			this._update_position();
		}
	};

	_pStatic.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pStatic.on_change_containerPos = function (left, top) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pStatic.on_apply_status = function (status, userstatus) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			var wordwrap_info = this._getCSSStyleValue("wordWrap", status, userstatus);
			if (wordwrap_info) {
				cellElem.setElementCSSMapInfo(wordwrap_info);
			}
		}
	};

	_pStatic.on_get_prop_tabstop = function () {
		if (nexacro._enableaccessibility) {
			if (this.accessibilityenable && this.accessibilityrole == "link") {
				return true;
			}
		}

		return false;
	};

	_pStatic.on_get_accessibility_label = function () {
		if (this.usedecorate) {
			return nexacro._getDisplayTextfromDecorateText(this._displaytext);
		}

		return this._displaytext;
	};

	_pStatic._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pStatic._on_getDisplayText = function () {
		if (this.usedecorate) {
			return nexacro._getDisplayTextfromDecorateText(this._displaytext);
		}
		return this._displaytext;
	};

	_pStatic._on_getFitSize = function () {
		var elem = this.getElement();
		if (elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var text;
			if (this._displaytext && this._displaytext !== "") {
				text = this._displaytext;
			}
			else {
				text = this.text;
			}
			if (text) {
				var font = this._getCurrentStyleInheritValue("font");
				var wordspace = this._getCurrentStyleInheritValue("wordSpacing");
				var letterspace = this._getCurrentStyleInheritValue("letterSpacing");
				var wordwrap = "none";
				var width;

				var multiline = false;
				if (text.search("\n") > -1) {
					multiline = true;
				}

				if (this.fittocontents == "height") {
					wordwrap = this.wordWrap || this._getCSSStyleValue("wordWrap");
					if (wordwrap && wordwrap != "none") {
						multiline = true;
					}

					width = this._adjust_width - total_w;
				}

				var b_decoration = this.usedecorate;

				var text_size = nexacro._getTextSize(text, font, multiline, width, wordwrap, wordspace, letterspace, b_decoration);

				total_w += Math.ceil(this.textwidth != null ? this.textwidth : text_size[0]);
				total_h += Math.ceil(text_size[1]);
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pStatic.set_usedecorate = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usedecorate != v) {
			this.usedecorate = v;
			this.on_apply_usedecorate(v);
		}
	};

	_pStatic.on_apply_usedecorate = function (usedecorate) {
		if (this._displaytext) {
			this.on_apply_text(this._displaytext);
		}
	};

	_pStatic.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			if (this.usedecorate) {
				cellElem.setElementDecorateText(text);
			}
			else {
				cellElem.setElementText(text);
			}

			cellElem.setElementPointerEvents();
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityLabel(this._getAccessibilityLabel());
		}
	};

	_pStatic.on_apply_textAlign = function (halign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextAlign(halign);
		}
	};

	_pStatic.on_apply_verticalAlign = function (valign) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementVerticalAlign(valign);
		}
	};

	_pStatic.on_apply_wordWrap = function (wordwrap) {
		if (!this._isEnableRedraw()) {
			return;
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementWordWrap(wordwrap);

			if (this.fittocontents != "none") {
				this._update_position();
			}
		}
	};

	_pStatic.on_apply_textDecoration = function (textDecoration) {
		if (!this._isEnableRedraw()) {
			return;
		}

		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementTextDecoration(textDecoration);
		}
	};

	delete _pStatic;
}

if (!nexacro._TitleBarIconTextControl) {
	nexacro._TitleBarIconTextControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._IconText.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pTitleBarIconTextControl = nexacro._createPrototype(nexacro._IconText, nexacro._TitleBarIconTextControl);
	nexacro._TitleBarIconTextControl.prototype = _pTitleBarIconTextControl;
	_pTitleBarIconTextControl._type_name = "TitleBarIconTextControl";


	_pTitleBarIconTextControl._is_subcontrol = true;
	_pTitleBarIconTextControl._is_fiticonsize = true;

	delete _pTitleBarIconTextControl;
}
