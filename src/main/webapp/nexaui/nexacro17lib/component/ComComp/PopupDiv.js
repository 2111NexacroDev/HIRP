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

if (!nexacro.PopupDiv) {
	nexacro.PopupDiv = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Div.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._attached_comp = this;
	};

	var _pPopupDiv = nexacro._createPrototype(nexacro.Div, nexacro.PopupDiv);
	nexacro.PopupDiv.prototype = _pPopupDiv;
	_pPopupDiv._type_name = "PopupDiv";




	_pPopupDiv.returnvalue = "";
	_pPopupDiv.visible = false;


	_pPopupDiv._callbackfunction = null;
	_pPopupDiv._callbackcontext = null;

	_pPopupDiv._eventclear_flag = false;
	_pPopupDiv._default_zindex = nexacro._zindex_popup;


	_pPopupDiv._is_window = true;
	_pPopupDiv._is_popup_control = true;
	_pPopupDiv._is_selfclose = true;
	_pPopupDiv._is_trackpopup = false;
	_pPopupDiv._track_capture = true;
	_pPopupDiv._is_fired_onsize = false;


	_pPopupDiv.accessibilityrole = "form";

	_pPopupDiv._event_list = {
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
		"onload" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"oncloseup" : 1, 
		"onpopup" : 1, 
		"onlayoutchanged" : 1, 
		"canlayoutchange" : 1, 
		"onmousewheel" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ondevicebuttonup" : 1
	};

	_pPopupDiv.on_create_control_element = function (parent_elem) {
		var control_elem;
		if (this._is_scrollable) {
			control_elem = this.on_create_popupscrollable_control_element(parent_elem);
		}
		else {
			control_elem = this.on_create_popup_control_element(parent_elem);
		}

		if (control_elem && this._default_zindex > 0) {
			control_elem.setElementZIndex(this._default_zindex);
		}

		return control_elem;
	};

	_pPopupDiv.on_created = function (win) {
		nexacro.Div.prototype.on_created.call(this, win);

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(-5000, 0);
		}
	};

	_pPopupDiv.destroyComponent = function () {
		nexacro.PopupControl.prototype.destroyComponent.call(this);
		nexacro.Div.prototype.destroyComponent.call(this);

		this._callbackfunction = null;
		this._callbackcontext = null;

		return true;
	};

	_pPopupDiv.on_created_contents = function (win) {
		nexacro.Div.prototype.on_created_contents.call(this, win);

		var control_elem = this._control_element;
		if (!this.visible && control_elem) {
			control_elem.setElementPosition(-5000, 0);
			control_elem.setElementFont(this._getCurrentStyleInheritValue("font"));
			control_elem.setElementColor(this._getCurrentStyleInheritValue("color"));
			control_elem.setElementWordSpacing(this._getCurrentStyleInheritValue("wordSpacing"));
			control_elem.setElementLetterSpacing(this._getCurrentStyleInheritValue("letterSpacing"));
		}
	};

	_pPopupDiv.on_create_contents_command = function () {
		return "";
	};

	_pPopupDiv.on_attach_contents_handle = function (win) {
		nexacro.Div.prototype.on_created.call(this, win);

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(-5000, 0);
		}
	};

	_pPopupDiv._applyElementVisible = function (v) {
		nexacro.Component.prototype._applyElementVisible.call(this, v);
	};

	_pPopupDiv.on_update_position = function (resize_flag, move_flag, update) {
		if (this.visible || !nexacro._allow_default_pinchzoom) {
			nexacro.Div.prototype.on_update_position.call(this, resize_flag, move_flag, update);
		}
		else {
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementPosition(-5000, 0);

				if (move_flag) {
					this.on_fire_onmove(this._adjust_left, this._adjust_top);
				}
				if (resize_flag) {
					this.on_fire_onsize(this._adjust_width, this._adjust_height);
				}
			}
		}
	};

	_pPopupDiv._clearEventListener = function (evt_id) {
		var application = nexacro.getApplication();
		if (this._eventclear_flag && application && application.getActiveForm()) {
			var formEventList = application.getActiveForm()._event_list;
			if (!formEventList[evt_id]) {
				return;
			}
		}
		nexacro._EventSinkObject.prototype._clearEventListener.apply(this, arguments);
	};


	_pPopupDiv.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		return nexacro.Form.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);
	};

	_pPopupDiv.set_visible = function (v) {
		if (this._is_trackpopup) {
			nexacro.PopupControl.prototype.set_visible.apply(this, arguments);
		}
	};

	_pPopupDiv.trackPopup = function (left, top, width, height, callbackfn, bcapture) {
		if (this._is_trackpopup) {
			return;
		}

		this.returnvalue = "";
		this._track_capture = bcapture === false ? false : true;

		left = +left;
		top = +top;

		if (width == null) {
			width = this._adjust_width;
		}
		else {
			width = +width;
		}

		if (height == null) {
			height = this._adjust_height;
		}
		else {
			height = +height;
		}

		var win = this._getWindow();
		var frame_w = 0;
		var frame_h = 0;
		if (win) {
			frame_w = win.frame._adjust_width;
			frame_h = win.frame._adjust_height;
		}

		var popup_r = left + width;
		if (popup_r > frame_w) {
			if (width <= frame_w) {
				left = frame_w - width;
			}
			else {
				left = 0;
				width = frame_w;
			}
		}

		var popup_b = top + height;
		if (popup_b > frame_h) {
			if (height <= frame_h) {
				top = frame_h - height;
			}
			else {
				top = 0;
				height = frame_h;
			}
		}

		if (this._is_fired_onsize == false && this.form) {
			this.form.on_fire_onsize(this._adjust_width, this._adjust_height);
			this._is_fired_onsize = true;
		}

		this._is_trackpopup = true;
		if (this._is_loading) {
			this._wait_pop_position = {
				obj : null, 
				left : left, 
				top : top, 
				width : width, 
				height : height
			};
		}
		else {
			this._popup(left, top, width, height);
		}

		if (callbackfn && typeof callbackfn == "string") {
			var parent = this.parent;
			var callbackfunc = parent[callbackfn];
			while (!callbackfunc && !(parent._is_form && parent._is_loaded)) {
				parent = parent.parent;
				callbackfunc = parent[callbackfn];
			}

			if (callbackfunc) {
				this._callbackfunction = callbackfunc;
				this._callbackcontext = parent;
			}
		}
		else {
			this._callbackfunction = null;
			this._callbackcontext = null;
		}

		this.setFocus();
		this.on_fire_onpopup(this);

		return (this.async ? true : this.returnvalue);
	};

	_pPopupDiv.trackPopupByComponent = function (obj, left, top, width, height, callbackfn, bcapture) {
		if (this._is_trackpopup) {
			return;
		}

		this.returnvalue = "";
		this._track_capture = bcapture === false ? false : true;

		if (width == null && height == null) {
			width = this._adjust_width;
			height = this._adjust_height;
		}

		left = +left;
		top = +top;

		var p = nexacro._getElementPositionInFrame(obj.getElement());
		var win_left = p.x;
		var win_top = p.y;

		var _window = this._getWindow();
		var m_c_width = _window.clientWidth;
		var m_c_height = _window.clientHeight;

		if (win_left + left + width > m_c_width) {
			var l_temp = m_c_width - width;
			if (l_temp < 0) {
				left = -win_left;
				if (width > m_c_width) {
					width = m_c_width;
				}
			}
			else {
				left = l_temp - win_left;
			}
		}

		if (win_top + top + height > m_c_height) {
			var t_temp = m_c_height - height;
			if (t_temp < 0) {
				top = -win_top;
				height = m_c_height;
			}
			else {
				top = t_temp - win_top;
			}
		}

		if (callbackfn && typeof callbackfn == "string") {
			var parent = this.parent;
			var callbackfunc = parent[callbackfn];
			while (!callbackfunc && !(parent._is_form && parent._is_loaded)) {
				parent = parent.parent;
				callbackfunc = parent[callbackfn];
			}

			if (callbackfunc) {
				this._callbackfunction = callbackfunc;
				this._callbackcontext = parent;
			}
		}
		else {
			this._callbackfunction = null;
			this._callbackcontext = null;
		}

		if (this._is_fired_onsize == false && this.form) {
			this.form.on_fire_onsize(this._adjust_width, this._adjust_height);
			this._is_fired_onsize = true;
		}
		this._is_trackpopup = true;
		if (this._is_loading) {
			this._wait_pop_position = {
				obj : obj, 
				left : left, 
				top : top, 
				width : width, 
				height : height
			};
		}
		else {
			this._popupBy(obj, left, top, width, height, true);
		}
		this.setFocus();

		this.on_fire_onpopup(this);

		return (this.async ? true : this.returnvalue);
	};

	_pPopupDiv.closePopup = function (retvalue) {
		this.returnvalue = retvalue;
		if (this.visible) {
			this._closePopup(true);
			return true;
		}
		return false;
	};

	_pPopupDiv.isPopup = nexacro.PopupControl.prototype._is_popup;

	_pPopupDiv._on_init = function () {
		this._eventclear_flag = true;
		nexacro.FormBase.prototype._on_init.apply(this, arguments);
		this._eventclear_flag = false;
	};

	_pPopupDiv._on_load = function () {
		var ret = nexacro.Form.prototype._on_load.apply(this, arguments);

		var popup_info = this._wait_pop_position;
		if (popup_info) {
			if (popup_info.obj) {
				this._popupBy(popup_info.obj, popup_info.left, popup_info.top, popup_info.width, popup_info.height);
			}
			else {
				this._popup(popup_info.left, popup_info.top, popup_info.width, popup_info.height);
			}

			delete this._wait_pop_position;
		}

		return ret;
	};

	_pPopupDiv._on_bubble_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll, meta_key) {
		if (!this._is_alive) {
			return;
		}

		var clientXY, pThis, ret, vscrollbar, old_vpos, new_vpos, hscrollbar, old_hpos, new_hpos;

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				clientXY = this._getClientXY(canvasX, canvasY);
				event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], this, refer_comp, meta_key);

				pThis = this._getFromComponent(this);

				if (event_bubbles !== true) {
					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented)) {
						ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], this, refer_comp, meta_key);

						if (ret) {
							return;
						}
						if (!ctrl_key) {
							if (wheelDeltaY) {
								if (this.vscrollbar && this.vscrollbar.enable) {
									vscrollbar = this.vscrollbar;
									old_vpos = vscrollbar._pos;
									this._setVScrollDefaultAction(vscrollbar, wheelDeltaY);
									new_vpos = vscrollbar._pos;
									if (old_vpos != new_vpos) {
										return;
									}
								}
							}

							if (wheelDeltaX) {
								if (nexacro._OSVersion == "Mac OS") {
									if (this.hscrollbar && this.hscrollbar.enable) {
										hscrollbar = this.hscrollbar;
										old_hpos = hscrollbar._pos;
										this._setHScrollDefaultAction(hscrollbar, wheelDeltaX);
										new_hpos = hscrollbar._pos;
										if (old_hpos != new_hpos) {
											return;
										}
									}
								}
							}
						}
						return;
					}

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}

					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation)) {
						if (this.parent && !this.parent._is_application) {
							var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

							canvasX = canvas[0];
							canvasY = canvas[1];

							if (this._is_subcontrol) {
								return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bScroll, meta_key);
							}
							else {
								return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bScroll, meta_key);
							}
						}
					}
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				clientXY = this._getClientXY(canvasX, canvasY);

				event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp, meta_key);

				pThis = this._getFromComponent(this);

				if (event_bubbles !== true) {
					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented)) {
						ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp, meta_key);

						if (ret) {
							return;
						}

						if (!ctrl_key) {
							if (wheelDeltaY) {
								if (this._isWheelScrollable(wheelDeltaY) && this.vscrollbar && this.vscrollbar.enable) {
									vscrollbar = this.vscrollbar;
									old_vpos = vscrollbar._pos;
									this._setVScrollbarDefaultAction(vscrollbar, wheelDeltaY);
									new_vpos = vscrollbar._pos;
									if (old_vpos != new_vpos) {
										return;
									}
								}
							}

							if (wheelDeltaX) {
								if (nexacro._OSVersion == "Mac OS") {
									if (this._isWheelScrollable(wheelDeltaX) && this.hscrollbar && this.hscrollbar.enable) {
										hscrollbar = this.hscrollbar;
										old_hpos = hscrollbar._pos;
										this._setHScrollDefaultAction(hscrollbar, wheelDeltaX);
										new_hpos = hscrollbar._pos;
										if (old_hpos != new_hpos) {
											return;
										}
									}
								}
							}
						}
						return;
					}
					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation)) {
						if (this.parent && !this.parent._is_application) {
							canvasX += this._adjust_left - this._scroll_left || 0;
							canvasY += this._adjust_top - this._scroll_top || 0;
							return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bScroll, meta_key);
						}
					}
				}
			}
		}
	};

	_pPopupDiv.on_fire_onpopup = function (obj) {
		if (this.onpopup && this.onpopup._has_handlers) {
			var evt = new nexacro.EventInfo(obj, "onpopup");
			return this.onpopup._fireEvent(this, evt);
		}
		return false;
	};

	_pPopupDiv.on_fire_onmove = function (left, top) {
		if (this.onmove && this.onmove._has_handlers) {
			var evt = new nexacro.MoveEventInfo(this, "onmove", left, top);
			return this.onmove._fireEvent(this, evt);
		}
		return false;
	};

	_pPopupDiv.on_fire_oncloseup = function (obj) {
		if (this._callbackfunction) {
			this._callbackfunction.call(this._callbackcontext, this.id, this.returnvalue);
		}
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.EventInfo(obj);
			evt.eventid = "oncloseup";
			return this.oncloseup._fireEvent(this, evt);
		}
		return false;
	};

	_pPopupDiv.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv.on_fire_sys_onflingstart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv.on_fire_sys_onfling = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv.on_fire_sys_onflingend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return true;
	};

	_pPopupDiv._detach = function (comp) {
		this._attached_comp = null;
	};

	_pPopupDiv._popup = nexacro.PopupControl.prototype._popup;

	_pPopupDiv._popupBy = nexacro.PopupControl.prototype._popupBy;

	_pPopupDiv._closePopup = function () {
		nexacro.PopupControl.prototype._closePopup.apply(this, arguments);
		this._is_trackpopup = false;
	};

	_pPopupDiv._getWindow = nexacro.PopupControl.prototype._getWindow;

	_pPopupDiv._getWindowHandle = nexacro.PopupControl.prototype._getWindowHandle;

	_pPopupDiv._findOwnerElementHandle = nexacro.PopupControl.prototype._findOwnerElementHandle;

	_pPopupDiv._isPopupVisible = function () {
		return this.visible;
	};

	delete _pPopupDiv;
}
