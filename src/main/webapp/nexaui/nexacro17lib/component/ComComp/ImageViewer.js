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

if (!nexacro.ImageViewer) {
	nexacro.ImageViewer = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pImageViewer = nexacro._createPrototype(nexacro.Component, nexacro.ImageViewer);
	nexacro.ImageViewer.prototype = _pImageViewer;
	_pImageViewer._type_name = "ImageViewer";


	_pImageViewer._image = null;
	_pImageViewer._imagetext = null;


	_pImageViewer.text = "";
	_pImageViewer.image = undefined;
	_pImageViewer.imagealign = "center middle";
	_pImageViewer.imagewidth = 0;
	_pImageViewer.imageheight = 0;
	_pImageViewer.stretch = "none";


	_pImageViewer.accessibilityrole = "image";

	_pImageViewer._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"oninput" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
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
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onload" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};

	_pImageViewer.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.image) {
				this._createImageControl();
			}

			if (this._displaytext) {
				this._createImageTextControl();
			}
		}
	};

	_pImageViewer.on_created_contents = function (win) {
		this.on_apply_stretch();

		if (this._image) {
			this._image.on_created(win);
		}

		if (this._imagetext) {
			this._imagetext.on_created(win);
		}
	};

	_pImageViewer.on_create_contents_command = function () {
		this.on_apply_stretch();

		var str = "";
		if (this._image) {
			str += this._image.createCommand();
		}

		if (this._imagetext) {
			str += this._imagetext.createCommand();
		}

		return str;
	};

	_pImageViewer.on_attach_contents_handle = function (win) {
		if (this._image) {
			this._image.attachHandle(win);
		}

		if (this._imagetext) {
			this._imagetext.attachHandle(win);
		}
	};

	_pImageViewer.on_destroy_contents = function () {
		if (this._image) {
			var image_width = this._image.width;
			var image_height = this._image.height;

			var image_url = nexacro._toString(this._image.image);
			if (image_url) {
				if (this._image._getImageType() == "url") {
					image_url = nexacro._getURIValue(image_url);
					image_url = nexacro._getImageLocation(image_url, this._getRefFormBaseUrl());
				}
			}

			var _stretch_val = this._image._getstretchedmode(this.fittocontents);
			nexacro._releaseImageViewUrl(image_url, image_width, image_height, _stretch_val);

			this._image.destroy();
			this._image = null;
		}

		if (this._imagetext) {
			this._imagetext.destroy();
			this._imagetext = null;
		}
	};

	_pImageViewer.on_change_containerRect = function (width, height) {
		if (this._image) {
			this._image.resize(width, height);

			nexacro._resizeImageViewManager(this);
		}

		if (this._imagetext) {
			this._imagetext.resize(width, height);
		}
	};

	_pImageViewer._on_getFitSize = function () {
		var elem = this.getElement();
		if (elem) {
			var text_size = [0, 0];
			var img_size = [0, 0];

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
			if (text && this._imagetext) {
				text_size = this._imagetext._on_getFitSize();
			}

			var image = this._image;
			if (image) {
				img_size = image.getOriginalImageSize();
			}

			total_w += Math.ceil(Math.max(text_size[0], img_size[0]));
			total_h += Math.ceil(Math.max(text_size[1], img_size[1]));

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pImageViewer.set_imagewidth = nexacro._emptyFn;
	_pImageViewer.set_imageheight = nexacro._emptyFn;

	_pImageViewer.on_apply_text = function () {
		var text = this._displaytext;
		var text_control = this._imagetext;
		var control_elem = this.getElement();
		if (control_elem && text) {
			this._createImageTextControl(false);
		}

		if (text_control) {
			text_control.set_text(text);
			if (!text) {
				text_control.set_visible(false);
			}
			else {
				text_control.set_visible(true);
			}
		}
	};

	_pImageViewer.set_image = function (v) {
		v = this._convertImageValue(v);
		if (this.image != v) {
			this.image = v;
			this.on_apply_image();
		}
	};

	_pImageViewer.on_apply_image = function () {
		var control_elem = this.getElement();
		if (control_elem && this.image) {
			if (!this._image) {
				this._createImageControl(false);
			}
		}

		if (this._image) {
			this._image.set_image(this.image);
		}
	};

	_pImageViewer.set_stretch = function (v) {
		var stretch_enum = ["none", "fit", "fixaspectratio"];
		if (stretch_enum.indexOf(v) == -1) {
			return;
		}

		if (this.stretch != v) {
			this.stretch = v;
			this.on_apply_stretch();
		}
	};

	_pImageViewer.on_apply_stretch = function () {
		var image = this._image;
		if (image) {
			var image_width = this._image.width;
			var image_height = this._image.height;

			var image_url = nexacro._toString(this._image.image);
			if (image_url) {
				if (this._image._getImageType() == "url") {
					image_url = nexacro._getURIValue(image_url);
					image_url = nexacro._getImageLocation(image_url, this._getRefFormBaseUrl());
				}
			}

			var _stretch_val = image._getstretchedmode(this.fittocontents);
			nexacro._releaseImageViewUrl(image_url, image_width, image_height, _stretch_val);

			image.set_stretch(this.stretch);
		}
	};

	_pImageViewer.set_imagealign = function (v) {
		if (this.imagealign != v) {
			this.imagealign = v;
			this.on_apply_imagealign();
		}
	};

	_pImageViewer.on_apply_imagealign = function () {
		var image = this._image;
		if (image) {
			image.set_imagealign(this.imagealign);
		}
	};

	_pImageViewer.on_apply_textAlign = function (halign) {
		if (this._imagetext) {
			this._imagetext.set_textAlign(halign);
		}
	};

	_pImageViewer.on_apply_verticalAlign = function (valign) {
		if (this._imagetext) {
			this._imagetext.set_verticalAlign(valign);
		}
	};

	_pImageViewer.getImageCount = function () {
		var image_control = this._image;
		if (image_control) {
			return image_control.getImageCount();
		}

		return 0;
	};

	_pImageViewer.setImageIndex = function (nIndex) {
		var image_control = this._image;
		if (image_control) {
			image_control.setImageIndex(parseInt(nIndex) | 0);
		}
	};

	_pImageViewer._on_element_swap = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._imagetext ? this._imagetext.getElement() : null;
			var image_elem = this._image ? this._image.getElement() : null;
			if (text_elem && image_elem) {
				control_elem.sendToBackElement(image_elem);
			}
		}
	};

	_pImageViewer._on_image_onclick = function (obj, e) {
		return this.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, this, obj, e.metakey);
	};

	_pImageViewer.on_fire_onload = function (obj, url) {
		if (this.onload && this.onload._has_handlers) {
			var evt = new nexacro.LoadEventInfo(obj, "onload", url);
			var ret = this.onload._fireEvent(this, evt);
			return ret;
		}
		return true;
	};

	_pImageViewer.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		var window = this._getWindow();
		this._cur_ldown_elem = window._cur_ldown_elem || window._keydown_element;
		return ret;
	};

	_pImageViewer.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		var window = this._getWindow();
		var elem = window._cur_ldown_elem || window._keydown_element;

		if (!this._is_subcontrol) {
			if (elem == this._cur_ldown_elem) {
				if (key_code == 13 || key_code == 32) {
					this.on_fire_onclick("none", alt_key, ctrl_key, shift_key, -1, -1, -1, -1, -1, -1, this, this, meta_key);
				}
			}
		}
		this._cur_ldown_elem = null;
		return ret;
	};

	_pImageViewer._createImageControl = function (bCreateOnly) {
		var image_control = this._image;
		if (!image_control) {
			image_control = this._image = new nexacro._ImageAreaControl("imagearea", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, null, null, null, null, this);

			image_control.set_image(this.image);
			image_control.set_imagealign(this.imagealign);
			image_control.set_stretch(this.stretch);
			image_control._setNotifyFn(this, this._setImageSize);

			image_control.createComponent(bCreateOnly);

			image_control._setEventHandler("onclick", this._on_image_onclick, this);
		}

		return image_control;
	};

	_pImageViewer._createImageTextControl = function (bCreateOnly) {
		var imagetext_control = this._imagetext;
		if (!imagetext_control) {
			imagetext_control = this._imagetext = new nexacro.Static("imagetext", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, null, null, null, null, this);
			imagetext_control._setControl();
			imagetext_control.set_accessibilityrole("image");

			imagetext_control.set_text(this._displaytext);

			imagetext_control.createComponent(bCreateOnly);

			imagetext_control._setEventHandler("onclick", this._on_image_onclick, this);
		}

		return imagetext_control;
	};

	_pImageViewer._convertImageValue = function (v) {
		if (v) {
			if (v instanceof nexacro.Image) {
				v = v._base64str;
			}
			else {
				v = v.toString();
				var format = nexacro._transImageBase64StringFormat(v);
				if (format) {
					v = format.alldata;
				}
			}
		}

		return v;
	};

	_pImageViewer._setImageSize = function (width, height) {
		if (this.imagewidth != width || this.imageheight != height) {
			if (this.fittocontents != "none") {
				this._update_position();
			}
		}

		this.imagewidth = width;
		this.imageheight = height;
	};

	delete _pImageViewer;

	nexacro._ImageAreaControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pImageAreaControl = nexacro._createPrototype(nexacro.Component, nexacro._ImageAreaControl);
	nexacro._ImageAreaControl.prototype = _pImageAreaControl;
	_pImageAreaControl._type_name = "ImageAreaControl";
	_pImageAreaControl._is_subcontrol = true;


	_pImageAreaControl.image = "";
	_pImageAreaControl.imagealign = "center middle";
	_pImageAreaControl.imagewidth = 0;
	_pImageAreaControl.imageheight = 0;
	_pImageAreaControl.stretch = "none";


	_pImageAreaControl._img_elem = null;
	_pImageAreaControl._imagealign = null;
	_pImageAreaControl._notifyTarget = null;
	_pImageAreaControl._notifyFn = null;
	_pImageAreaControl._orgwidth = 0;
	_pImageAreaControl._orgheight = 0;


	_pImageAreaControl._is_simple_control = true;
	_pImageAreaControl._is_focus_accept = false;

	_pImageAreaControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._img_elem = new nexacro.ImageElement(control_elem, "image");
		}
	};

	_pImageAreaControl.on_created_contents = function (win) {
		if (this._img_elem) {
			this._img_elem.create(win);
		}

		this.on_apply_image();
	};

	_pImageAreaControl.on_create_contents_command = function () {
		var ret = "";
		var img_elem = this._img_elem;
		if (img_elem) {
			ret = img_elem.createCommand();
		}

		return ret;
	};

	_pImageAreaControl.on_attach_contents_handle = function (win) {
		var img_elem = this._img_elem;
		if (img_elem) {
			img_elem.attachHandle(win);
			this.on_apply_image();
		}
	};

	_pImageAreaControl.on_destroy_contents = function () {
		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}

		this._imagealign = null;
		this._notifyTarget = null;
		this._notifyFn = null;
	};

	_pImageAreaControl.on_change_containerRect = function () {
		if (this._img_elem) {
			this._updateElementPositions();
		}
	};

	_pImageAreaControl.set_image = function (v) {
		v = this._convertImageValue(v);
		if (this.image != v) {
			this.chk_on_fire_onload = true;

			this.image = v;
			this.on_apply_image();
		}
	};

	_pImageAreaControl.on_apply_image = function () {
		this._load_image();
	};

	_pImageAreaControl.set_imagealign = function (v) {
		if (this.imagealign != v) {
			this.imagealign = v;
			this.on_apply_imagealign();
		}
	};

	_pImageAreaControl.on_apply_imagealign = function () {
		this._imagealign = nexacro.AlignObject(this.imagealign);

		if (this._img_elem) {
			this._updateElementPositions();
		}
	};

	_pImageAreaControl.set_stretch = function (v) {
		if (this.stretch != v) {
			this.stretch = v;
			this.on_apply_stretch();
		}
	};

	_pImageAreaControl.on_apply_stretch = function () {
		this._load_image();
		this._updateElementPositions();
	};

	_pImageAreaControl._convertImageValue = function (v) {
		if (v) {
			if (v instanceof nexacro.Image) {
				v = v._base64str;
			}
			else {
				v = v.toString();
				var format = nexacro._transImageBase64StringFormat(v);
				if (format) {
					v = format.alldata;
				}
			}
		}

		return v;
	};

	_pImageAreaControl._on_load_image = function (imgurl, w, h) {
		this._orgwidth = w;
		this._orgheight = h;

		this._setImageSize(w, h);

		if (this.parent instanceof nexacro.ImageViewer) {
			var pos = imgurl.indexOf("?size=");
			if (pos > 0) {
				var url = imgurl.substring(pos + 6);

				var x = url.split(":")[0].split("x")[0];
				var y = url.split(":")[0].split("x")[1];
				var s = url.split(":")[1];

				var _stretch_val = this._getstretchedmode(this.parent.fittocontents);
				if (x != this.width || y != this.height || s != _stretch_val) {
					nexacro._releaseImageViewUrl(nexacro._removeImageViewUrl(imgurl), x, y, s);
				}
			}
		}
		this._load_image_completed(imgurl, w, h);
	};

	_pImageAreaControl._load_image = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var v = nexacro._toString(this.image);
			var img_elem = this._img_elem;
			if (v) {
				if (this._getImageType() == "url") {
					v = nexacro._getURIValue(v);
					v = nexacro._getImageLocation(v, this._getRefFormBaseUrl());
				}
				var image_size = 0;
				if (this.parent instanceof nexacro.ImageViewer) {
					var _stretch_val = this._getstretchedmode(this.parent.fittocontents);
					image_size = nexacro._getImageViewSize(v, this._on_load_image, this, undefined, this.image, true, this.width, this.height, _stretch_val);
				}
				else {
					image_size = nexacro._getImageSize(v, this._on_load_image, this, undefined, this.image);
				}

				if (image_size) {
					this._orgwidth = image_size.width;
					this._orgheight = image_size.height;
					this._load_image_completed(v, image_size.width, image_size.height);
				}
			}
			else {
				if (img_elem) {
					img_elem.setElementVisible(false);
					img_elem.setElementImage("");
					this._updateElementPositions();
					this._setImageSize(0, 0);
				}
			}
		}
	};

	_pImageAreaControl._load_image_completed = function (url, w, h) {
		var img_elem = this._img_elem;
		if (img_elem) {
			var bChange = true;
			var v = this.image;
			if (!v || (w == 0 && h == 0)) {
				img_elem.setElementVisible(false);
				img_elem.setElementImage("");
				this._updateElementPositions();
				this._setImageSize(0, 0);
			}
			else {
				var _stretch_val = this.stretch;
				if (this.parent instanceof nexacro.ImageViewer) {
					_stretch_val = this._getstretchedmode(this.parent.fittocontents);
				}

				v = v.toString();
				if (this._getImageType() == "url") {
					if (v.substring(0, 4).toLowerCase() == "url(") {
						v = v.substring(5, v.length - 2);
					}

					v = nexacro._getImageLocation(v, this._getRefFormBaseUrl());
					url = nexacro._removeImageViewUrl(url);
					if (v != url) {
						bChange = false;

						nexacro._releaseImageViewUrl(url, this.width, this.height, _stretch_val);
					}
				}

				if (bChange) {
					url = nexacro.UrlObject(url);
					img_elem.setElementVisible(true);

					img_elem.setElementImage(url, w, h, _stretch_val, this);
					this._updateElementPositions();
				}
			}
		}

		var imageviewer = this.parent;
		if (imageviewer instanceof nexacro.ImageViewer) {
			imageviewer._on_element_swap();

			if (this.chk_on_fire_onload == true) {
				this.chk_on_fire_onload = false;
				imageviewer.on_fire_onload(imageviewer, url);
			}
		}
	};

	_pImageAreaControl._updateElementPositions = function () {
		var img_elem = this._img_elem;
		if (img_elem) {
			this._recalcImageSize();

			var halign = this._imagealign ? this._imagealign.halign : "center";
			var valign = this._imagealign ? this._imagealign.valign : "middle";

			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			var imgw = this.imagewidth;
			var imgh = this.imageheight;

			var imgpos_x, imgpos_y;

			switch (halign) {
				case "left":
					imgpos_x = 0;
					break;
				case "right":
					imgpos_x = client_width - imgw;
					break;
				default:
					imgpos_x = Math.floor((client_width - imgw) / 2);
					break;
			}

			switch (valign) {
				case "top":
					imgpos_y = 0;
					break;
				case "bottom":
					imgpos_y = client_height - imgh;
					break;
				default:
					imgpos_y = Math.floor((client_height - imgh) / 2);
					break;
			}

			img_elem.setElementPosition(imgpos_x, imgpos_y);
			img_elem.setElementSize(imgw, imgh);
		}
	};

	_pImageAreaControl._recalcImageSize = function () {
		var stretch = this.stretch;
		if (!stretch) {
			return;
		}

		var width = 0, height = 0;
		var image_width = 0, image_height = 0;
		var span_width = this._getClientWidth();
		var span_height = this._getClientHeight();

		if (stretch == "fit") {
			width = span_width;
			height = span_height;
		}
		else if (stretch == "fixaspectratio") {
			image_width = this._orgwidth;
			image_height = this._orgheight;

			if (image_width || image_height) {
				var widthPer = image_width ? (span_width / image_width) : image_width;
				var heightPer = image_height ? (span_height / image_height) : image_height;

				if (widthPer <= heightPer) {
					width = span_width;
					height = Math.floor(image_height *  widthPer);
				}
				else {
					width = Math.floor(image_width *  heightPer);
					height = span_height;
				}
			}
			else {
				width = image_width;
				height = image_height;
			}
		}
		else {
			width = this._orgwidth;
			height = this._orgheight;
		}

		this._setImageSize(width, height);
	};

	_pImageAreaControl._setNotifyFn = function (target, fn) {
		this._notifyTarget = target;
		this._notifyFn = fn;
	};

	_pImageAreaControl._setImageSize = function (w, h) {
		this.imagewidth = w;
		this.imageheight = h;

		if (this._notifyTarget && this._notifyFn) {
			this._notifyFn.call(this._notifyTarget, w, h);
		}
	};

	_pImageAreaControl._getImageType = function () {
		var ret = "url";
		var v = this.image;
		if (v) {
			var format = nexacro._transImageBase64StringFormat(v, false, true);
			if (format && format.encode === ";base64,") {
				ret = "base64";
			}
		}

		return ret;
	};

	_pImageAreaControl.getImageCount = function () {
		var img_elem = this._img_elem;
		if (img_elem) {
			return img_elem.getImageCount();
		}

		return 0;
	};

	_pImageAreaControl.getOriginalImageSize = function () {
		return [this._orgwidth, this._orgheight];
	};

	_pImageAreaControl.setImageIndex = function (nIndex) {
		var img_elem = this._img_elem;
		if (img_elem) {
			img_elem.setImageIndex(parseInt(nIndex) | 0);
		}
	};
	_pImageAreaControl._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pImageAreaControl._getstretchedmode = function (_imageViewer_fittocontents, _stretch) {
		var _stretch_val = _stretch;
		if (_stretch == undefined) {
			_stretch_val = this.stretch;
		}

		if (nexacro && nexacro._Browser == "Runtime") {
			if (_stretch_val == "fixaspectratio" && _imageViewer_fittocontents && _imageViewer_fittocontents != "none") {
				_stretch_val = "none";
			}
		}
		return _stretch_val;
	};
	delete _pImageAreaControl;
}
