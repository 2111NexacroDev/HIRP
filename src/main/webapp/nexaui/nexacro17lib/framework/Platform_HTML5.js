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

if (nexacro._Browser != "Runtime" && !nexacro._init_platform_HTML5) {
	"use strict";

	var _process = true;
	nexacro._init_platform_HTML5 = true;

	nexacro._isTouchInteraction = (nexacro._Browser == "MobileSafari" || nexacro._OS == "Android" || nexacro._OS == "iOS" || nexacro._OS == "Windows Phone");
	nexacro._SupportOrientation = ((typeof window.orientation != 'undefined') && ('onorientationchange' in window));
	nexacro._SupportTouch = ("ontouchstart" in window || ((window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && (window.navigator.maxTouchPoints > 0) ? true : false));
	nexacro._SupportTouchEvent = (nexacro._SupportTouch || typeof TouchEvent !== 'undefined' || (nexacro._Browser == "IE" && typeof PointerEvent !== 'undefined'));
	nexacro._SupportAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) ? true : false;
	nexacro._resize_popup_inbound = true;
	nexacro._is_first_touch = true;
	nexacro._last_eventname = "";

	if (nexacro._Browser == "IE" || nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge") {
		nexacro._createSysEvent_ForwardFuncs = function (_cur_win) {
			_cur_win._is_capture = false;
			_cur_win._touch_list = new nexacro.Collection();

			nexacro._calculateZoomLevel = function () {
				var _doc = _cur_win.document;
				var body = _doc.body;

				var docBox = body.getBoundingClientRect();
				var physicalW = docBox.right - docBox.left;
				var logicalW = body.offsetWidth;

				nexacro._zoomfactor = Math.round((physicalW / logicalW) *  100) / 100;
			};
			nexacro._calculateZoomLevel();

			_cur_win._syshandler_onmessage_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmessage(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onmousedown_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (_cur_win._touch_list && _cur_win._touch_list.length > 0) {
					return;
				}

				var elem = nexacro.__findParentElement(evt.srcElement);

				if (nexacro._Browser == "IE") {
					if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON && !_cur_win._is_capture && !elem.isInputElement()) {
						_cur_win.document.body.setCapture(false);
						_cur_win._is_capture = true;
					}
				}

				return nexacro._syshandler_onmousedown(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_onmouseup_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (_cur_win._touch_list && _cur_win._touch_list.length > 0) {
					return;
				}

				if (_cur_win._is_capture) {
					_cur_win._is_capture = false;
					_cur_win.document.body.releaseCapture();
				}

				return nexacro._syshandler_onmouseup(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_lock_onmouseup_forward = nexacro._emptyFn;
			_cur_win._syshandler_onmousemove_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (_cur_win._touch_list && _cur_win._touch_list.length > 0) {
					return;
				}

				return nexacro._syshandler_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_lock_onmousemove_forward = nexacro._emptyFn;

			_cur_win._syshandler_onlosecapture_forward = function (evt) {
				var ret = true;

				if (_cur_win._is_capture) {
					evt = _cur_win.event || evt;

					_cur_win._is_capture = false;

					var win = nexacro._findWindow(_cur_win.nexacro_HTMLSysEvent._cur_win);
					var elem = nexacro.__findParentElement(evt.srcElement);

					_cur_win.document.body.releaseCapture();
					_cur_win.__clearGC();

					ret = win._on_sys_lbuttonup(win._cur_ldown_elem, evt.button, evt.alt, evt.ctrl, evt.shift, evt.wx, evt.wy, evt.sx, evt.sy);

					if (!elem.isInputElement()) {
						nexacro._stopSysEvent(evt);
					}
				}
				return ret;
			};

			_cur_win._syshandler_ontouchstart_forward = function (evt) {
				if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
					return;
				}

				evt.changedTouches = [];

				var touch = {
				};
				touch.clientX = evt.clientX;
				touch.clientY = evt.clientY;
				touch.screenX = evt.screenX;
				touch.screenY = evt.screenY;
				touch.timeStamp = evt.timeStamp;
				touch.identifier = evt.pointerId;

				this._touch_list.add(evt.pointerId.toString(), touch);
				evt.touches = Array.prototype.slice.call(this._touch_list, 0);
				evt.changedTouches.push(touch);

				return nexacro._syshandler_ontouchstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_ontouchend_forward = function (evt) {
				if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
					return;
				}

				evt.changedTouches = [];

				var touch = {
				};
				touch.clientX = evt.clientX;
				touch.clientY = evt.clientY;
				touch.screenX = evt.screenX;
				touch.screenY = evt.screxxY;
				touch.timeStamp = evt.timeStamp;
				touch.identifier = evt.pointerId;

				this._touch_list.remove(evt.pointerId.toString());
				evt.touches = Array.prototype.slice.call(this._touch_list, 0);
				evt.changedTouches.push(touch);

				return nexacro._syshandler_ontouchend(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_ontouchmove_forward = function (evt) {
				if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
					return;
				}

				evt.changedTouches = [];

				var touch = {
				};
				touch.clientX = evt.clientX;
				touch.clientY = evt.clientY;
				touch.screenX = evt.screenX;
				touch.screenY = evt.screenY;
				touch.timeStamp = evt.timeStamp;
				touch.identifier = evt.pointerId;

				this._touch_list.add(evt.pointerId.toString(), touch);
				evt.touches = Array.prototype.slice.call(this._touch_list, 0);
				evt.changedTouches.push(touch);

				return nexacro._syshandler_ontouchmove(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};
			_cur_win._syshandler_ontouchcancel_forward = function (evt) {
				if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
					return;
				}

				evt.changedTouches = [];

				var touch = {
				};
				touch.clientX = evt.clientX;
				touch.clientY = evt.clientY;
				touch.screenX = evt.screenX;
				touch.screenY = evt.screenY;
				touch.timeStamp = evt.timeStamp;
				touch.identifier = evt.pointerId;

				this._touch_list.remove(evt.pointerId.toString());

				evt.touches = Array.prototype.slice.call(this._touch_list, 0);
				evt.changedTouches.push(touch);

				return nexacro._syshandler_ontouchcancel(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondblclick_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_ondblclick(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onmouseover_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmouseover(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.fromElement, evt);
			};
			_cur_win._syshandler_onmouseout_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmouseout(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.toElement, evt);
			};

			_cur_win._syshandler_onkeydown_forward = function (evt) {
				evt = _cur_win.event || evt;

				if (_cur_win._linked_window && _cur_win._linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116) {
					evt.keyCode = 0;
					evt.cancelBubble = true;
					evt.returnValue = false;
				}

				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeydown(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onkeypress_forward = function (evt) {
				evt = _cur_win.event || evt;

				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeypress(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onkeyup_forward = function (evt) {
				evt = _cur_win.event || evt;

				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeyup(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onmousewheel_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmousewheel(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_oncontextmenu_forward = function (evt) {
				evt = _cur_win.event || evt;
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 11) {
					document.execCommand('ms-clearUndoStack');
				}

				return nexacro._syshandler_oncontextmenu(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondragstart_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondragenter_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragenter(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.fromElement, evt);
			};

			_cur_win._syshandler_ondragleave_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragleave(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.toElement, evt);
			};

			_cur_win._syshandler_ondragover_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragover(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondrop_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondrop(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onselectstart_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onselectstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onactivate_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onactivate(_cur_win.nexacro_HTMLSysEvent, evt);
			};

			if (nexacro._BrowserVersion <= 8) {
				_cur_win._syshandler_ondeactivate_forward = function (evt) {
					try {
						evt = _cur_win.event || evt;
						if (evt.toElement || evt.relatedTarget) {
							return true;
						}
						return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
					}
					catch (e) {
						nexacro._settracemsg(e);
					}
				};
			}
			else {
				_cur_win._syshandler_ondeactivate_forward = function (evt) {
					evt = _cur_win.event || evt;
					if (evt.toElement || evt.relatedTarget) {
						return true;
					}
					return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
				};
			}

			_cur_win._syshandler_onbeforeclose_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onbeforeclose(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onclose_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onclose(_cur_win.nexacro_HTMLSysEvent, evt);
			};

			_cur_win._syshandler_onresize_forward = function (evt) {
				evt = _cur_win.event || evt;
				nexacro._calculateZoomLevel();
				return nexacro._syshandler_onresize(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onorientationchange_forward = function (evt) {
				evt = _cur_win.event || evt;
				nexacro._calculateZoomLevel();
				return nexacro._syshandler_onorientationchange(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onmove_forward = function (evt) {
				_cur_win.nexacro_HTMLSysEvent._stopDetectWindowMove();
				try {
					var oldX = _cur_win._old_screenx;
					var oldY = _cur_win._old_screeny;

					if (oldX != _cur_win.screenLeft || oldY != _cur_win.screenTop) {
						_cur_win._old_screenx = _cur_win.screenLeft;
						_cur_win._old_screeny = _cur_win.screenTop;

						evt = _cur_win.event || evt;

						var ret = nexacro._syshandler_onmove(_cur_win.nexacro_HTMLSysEvent, evt);
						_cur_win.nexacro_HTMLSysEvent._move_detect_timer = setTimeout(_cur_win.nexacro_HTMLSysEvent._syshandler_onmove_forward, 500);

						return ret;
					}
				}
				catch (e) {
					nexacro._settracemsg(e);
				}
				_cur_win.nexacro_HTMLSysEvent._move_detect_timer = setTimeout(_cur_win.nexacro_HTMLSysEvent._syshandler_onmove_forward, 500);
			};
			_cur_win._syshandler_onload_forward = function (evt) {
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onload(_cur_win.nexacro_HTMLSysEvent, evt);
			};
		};
	}
	else if (nexacro._Browser != "IE") {
		nexacro._createSysEvent_ForwardFuncs = function (_cur_win) {
			nexacro._calculateZoomLevel = nexacro._emptyFn;

			_cur_win._syshandler_onmessage_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmessage(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onmousedown_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (nexacro._Browser == "Gecko") {
					window.event = evt;
				}

				if (nexacro._isTouchInteraction) {
					var elem = nexacro.__findParentElement(evt.target);
					if (nexacro._OS == "Android") {
						var win = nexacro._findWindow(_cur_win);

						if (elem) {
							if (elem.isInputElement() && elem.enable) {
							}
							else {
								var last_focused_elem = win._last_focused_elem;
								if (!last_focused_elem || !(last_focused_elem.isInputElement() && last_focused_elem.enable)) {
									evt.preventDefault();
								}
							}
						}
						if (nexacro._Browser != "Chrome" || nexacro._BrowserVersion < 58 || nexacro._is_touch_flag) {
							nexacro._is_touch_flag = false;
							return false;
						}
					}
					else {
						if (nexacro._SystemTypeEx == "ProforMouseEvent") {
							var win = nexacro._findWindow(_cur_win);
							if (elem._is_accept_touch) {
								if (!elem._is_accept_touch(win)) {
									nexacro._stopSysEvent(evt);
									return false;
								}
							}
							else if (elem.parent) {
								if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
									if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
								else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
									if (!elem.parent._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
							}
						}

						var prevent = true;
						if (nexacro._OS == "iOS" && nexacro._SystemType == "ipad" && nexacro._SystemTypeEx == "ProforMouseEvent") {
							if (evt.buttons > 0) {
								var win = nexacro._findWindow(_cur_win);
								var last_focused_elem = win._last_focused_elem;
								if (last_focused_elem && last_focused_elem.isInputElement() && last_focused_elem.isComposing()) {
									prevent = true;
								}
								else {
									prevent = false;
								}
							}
						}

						if (prevent) {
							if (elem && !elem.isInputElement()) {
								evt.stopPropagation();
								evt.preventDefault();
							}
							return false;
						}
					}
				}
				return nexacro._syshandler_onmousedown(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_onmouseup_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (nexacro._Browser == "Gecko") {
					window.event = evt;
				}

				if (nexacro._isTouchInteraction) {
					if (nexacro._OS != "Android") {
						if (nexacro._SystemTypeEx == "ProforMouseEvent") {
							var win = nexacro._findWindow(_cur_win);
							var elem = nexacro.__findParentElement(evt.target);
							if (elem._is_accept_touch) {
								if (!elem._is_accept_touch(win)) {
									nexacro._stopSysEvent(evt);
									return false;
								}
							}
							else if (elem.parent) {
								if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
									if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
								else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
									if (!elem.parent._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
							}
						}

						evt.stopPropagation();
						evt.preventDefault();
					}

					return false;
				}

				return nexacro._syshandler_onmouseup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_lock_onmouseup_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					window.event = evt;
				}

				return nexacro._syshandler_lock_onmouseup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_onmousemove_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}

				if (nexacro._Browser == "Gecko") {
					window.event = evt;
				}

				if (nexacro._isTouchInteraction) {
					if (nexacro._OS != "Android") {
						if (nexacro._SystemTypeEx == "ProforMouseEvent") {
							var win = nexacro._findWindow(_cur_win);
							var elem = nexacro.__findParentElement(evt.target);
							if (elem._is_accept_touch) {
								if (!elem._is_accept_touch(win)) {
									nexacro._stopSysEvent(evt);
									return false;
								}
							}
							else if (elem.parent) {
								if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
									if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
								else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
									if (!elem.parent._input_element._is_accept_touch(win)) {
										nexacro._stopSysEvent(evt);
										return false;
									}
								}
							}
						}

						evt.stopPropagation();
					}
					if (nexacro._OS == "iOS" && nexacro._SystemType == "ipad" && nexacro._SystemTypeEx == "ProforMouseEvent") {
						return nexacro._syshandler_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
					}
					else {
						return false;
					}
				}
				return nexacro._syshandler_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_lock_onmousemove_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					window.event = evt;
				}

				return nexacro._syshandler_lock_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onlosecapture_forward = nexacro._emptyFn;

			_cur_win._syshandler_ontouchstart_forward = function (evt) {
				nexacro._is_touch_flag = true;
				var elem = nexacro.__findParentElement(evt.target);
				var win = nexacro._findWindow(_cur_win);
				if (elem._is_accept_touch) {
					if ((!(elem instanceof nexacro.TextBoxElement) || (elem instanceof nexacro.TextBoxElement && elem.parent.parent._isEditableComponent && elem.parent.parent._isEditableComponent())) && !elem._is_accept_touch(win)) {
						var comp1 = win.findComponent(elem);
						var comp2 = win._last_focused_elem ? win.findComponent(win._last_focused_elem) : null;
						if (elem instanceof nexacro.TextBoxElement && comp1._getRootComponent(comp1) instanceof nexacro.Combo && comp2 && comp2._getRootComponent(comp2) instanceof nexacro.Combo) {
						}
						else {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}
				else if (elem.parent) {
					if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
						if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
					else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
						if (!elem.parent._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}

				if (elem.isInputElement() && elem.enable) {
					elem._is_input_touchstart = true;
					elem._on_sys_touchstart(evt);
				}

				return nexacro._syshandler_ontouchstart(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_ontouchend_forward = function (evt) {
				var elem = nexacro.__findParentElement(evt.target);
				var win = nexacro._findWindow(_cur_win);

				if (elem._is_accept_touch) {
					if ((!(elem instanceof nexacro.TextBoxElement) || (elem instanceof nexacro.TextBoxElement && elem.parent.parent._isEditableComponent && elem.parent.parent._isEditableComponent())) && !elem._is_accept_touch(win)) {
						var comp1 = win.findComponent(elem);
						var comp2 = win._last_focused_elem ? win.findComponent(win._last_focused_elem) : null;

						if (elem instanceof nexacro.TextBoxElement && comp1._getRootComponent(comp1) instanceof nexacro.Combo && comp2 && comp2._getRootComponent(comp2) instanceof nexacro.Combo) {
						}
						else {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}
				else if (elem.parent) {
					if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
						if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
					else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
						if (!elem.parent._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}

				if (elem.isInputElement() && elem.enable) {
					elem._on_sys_touchend(evt);
				}
				return nexacro._syshandler_ontouchend(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_ontouchmove_forward = function (evt) {
				var elem = nexacro.__findParentElement(evt.target);
				var win = nexacro._findWindow(_cur_win);

				if (elem._is_accept_touch) {
					if ((!(elem instanceof nexacro.TextBoxElement) || (elem instanceof nexacro.TextBoxElement && elem.parent.parent._isEditableComponent && elem.parent.parent._isEditableComponent())) && !elem._is_accept_touch(win)) {
						var comp1 = win.findComponent(elem);
						var comp2 = win._last_focused_elem ? win.findComponent(win._last_focused_elem) : null;

						if (elem instanceof nexacro.TextBoxElement && comp1._getRootComponent(comp1) instanceof nexacro.Combo && comp2 && comp2._getRootComponent(comp2) instanceof nexacro.Combo) {
						}
						else {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}
				else if (elem.parent) {
					if (nexacro._ListViewCellControl && elem.parent instanceof nexacro._ListViewCellControl && elem.parent._subComp && elem.parent._subComp._isEditableComponent && elem.parent._subComp._isEditableComponent() && elem.parent._subComp._input_element && elem.parent._subComp._input_element._is_accept_touch) {
						if (!elem.parent._subComp._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
					else if (elem.parent._isEditableComponent && elem.parent._isEditableComponent() && elem.parent._input_element && elem.parent._input_element._is_accept_touch) {
						if (!elem.parent._input_element._is_accept_touch(win)) {
							nexacro._stopSysEvent(evt);
							return false;
						}
					}
				}

				if (elem.isInputElement() && elem.enable) {
					elem._on_sys_touchmove(evt);
				}

				if (nexacro._OS == "iOS" && nexacro._Browser == "Chrome") {
					evt.preventDefault();
				}

				var ret = nexacro._syshandler_ontouchmove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);

				if (elem instanceof nexacro.CanvasElement) {
					if (nexacro._Browser == "Chrome" && (nexacro._OS == "Android" || nexacro._BrowserExtra == "SamsungBrowser")) {
						nexacro._stopSysEvent(evt);
					}
					else if (nexacro._OS == "iOS") {
						nexacro._stopSysEvent(evt);
					}
				}

				return ret;
			};
			_cur_win._syshandler_ontouchcancel_forward = function (evt) {
				var elem = nexacro.__findParentElement(evt.target);
				if (elem.isInputElement() && elem.enable) {
					return;
				}
				return nexacro._syshandler_ontouchcancel(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_ongesturestart_forward = function (evt) {
				if (!nexacro._allow_default_pinchzoom) {
					evt.preventDefault();
				}
			};

			_cur_win._syshandler_ondblclick_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				if (nexacro._isTouchInteraction) {
					if (nexacro._OS != "Android") {
						evt.stopPropagation();
						evt.preventDefault();
					}
					return false;
				}
				return nexacro._syshandler_ondblclick(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onmouseover_forward = function (evt) {
				return nexacro._syshandler_onmouseover(_cur_win.nexacro_HTMLSysEvent, evt.target, evt.relatedTarget, evt);
			};
			_cur_win._syshandler_onmouseout_forward = function (evt) {
				return nexacro._syshandler_onmouseout(_cur_win.nexacro_HTMLSysEvent, evt.target, evt.relatedTarget, evt);
			};

			_cur_win._syshandler_onkeydown_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win) || (_cur_win._linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeydown(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onkeypress_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeypress(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};
			_cur_win._syshandler_onkeyup_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onkeyup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onmousewheel_forward = function (evt) {
				if (!nexacro.__getWindowHandleEnable(_cur_win)) {
					nexacro._stopSysEvent(evt);
					return;
				}
				return nexacro._syshandler_onmousewheel(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_oncontextmenu_forward = function (evt) {
				return nexacro._syshandler_oncontextmenu(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_ondragstart_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					_cur_win.event = evt;
				}

				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondragenter_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					_cur_win.event = evt;
				}

				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragenter(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.relatedTarget ? evt.relatedTarget : null, evt);
			};

			_cur_win._syshandler_ondragleave_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					_cur_win.event = evt;
				}

				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragleave(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.relatedTarget ? evt.relatedTarget : null, evt);
			};

			_cur_win._syshandler_ondragover_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					_cur_win.event = evt;
				}

				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondragover(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_ondrop_forward = function (evt) {
				if (nexacro._Browser == "Gecko") {
					_cur_win.event = evt;
				}

				evt = _cur_win.event || evt;
				return nexacro._syshandler_ondrop(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
			};

			_cur_win._syshandler_onselectstart_forward = function (evt) {
				return nexacro._syshandler_onselectstart(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
			};

			_cur_win._syshandler_onactivate_forward = function (evt) {
				return nexacro._syshandler_onactivate(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_ondeactivate_forward = function (evt) {
				return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onbeforeclose_forward = function (evt) {
				return nexacro._syshandler_onbeforeclose(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onclose_forward = function (evt) {
				return nexacro._syshandler_onclose(_cur_win.nexacro_HTMLSysEvent, evt);
			};

			_cur_win._syshandler_onresize_forward = function (evt) {
				return nexacro._syshandler_onresize(_cur_win.nexacro_HTMLSysEvent, evt);
			};
			_cur_win._syshandler_onorientationchange_forward = function (evt) {
				var reset_viewport = nexacro._searchDeviceExceptionValue("orientationchange_reset_viewport");
				if (reset_viewport) {
					var _tester = nexacro._device_exception_tester;
					if (_tester.screen_checked && _tester.screen_swap_checked === false) {
						if (_tester.is_init_screen_portrait != nexacro._isPortrait()) {
							_tester.swap_screen = (_tester.init_screen_width == nexacro._getScreenWidth()) ? false : true;
							_tester.screen_swap_checked = true;
						}
					}

					var delayed_swap_screen = (_tester.delayed_swap_screen === undefined) ? nexacro._searchDeviceExceptionValue("delayed_swap_screen") : _tester.delayed_swap_screen;
					if (delayed_swap_screen === true) {
						_tester.swap_screen_timer = setInterval(function () {
							var p_w = _tester.portrait_screen_width;
							var l_w = _tester.landscape_screen_width;
							var s_w = nexacro._getScreenWidth();

							if (nexacro._isPortrait()) {
								if ((l_w && l_w != s_w) || (p_w && p_w == s_w)) {
									clearInterval(_tester.swap_screen_timer);
									_tester.swap_screen_timer = null;

									nexacro.__setViewportScale();
								}
							}
							else {
								if ((p_w && p_w != s_w) || (l_w && l_w == s_w)) {
									clearInterval(_tester.swap_screen_timer);
									_tester.swap_screen_timer = null;

									nexacro.__setViewportScale();
								}
							}
						}, 100);
					}
					else {
						var reset_viewport_delay = nexacro._searchDeviceExceptionValue("reset_viewport_delay");
						if (reset_viewport_delay == 0) {
							nexacro.__setViewportScale();
						}
						else {
							setTimeout(function () {
								nexacro.__setViewportScale();
							}, reset_viewport_delay);
						}

						if (_tester.swap_screen === false && _tester.delayed_swap_screen_checked === false) {
							_tester.delayed_swap_screen_check_cnt = 0;

							if (_tester.swap_screen_timer) {
								clearInterval(_tester.swap_screen_timer);
							}

							_tester.swap_screen_timer = setInterval(function () {
								var p_w = _tester.portrait_screen_width;
								var l_w = _tester.landscape_screen_width;
								var is_changed = false;
								if (nexacro._isPortrait()) {
									if ((l_w && l_w != nexacro._getScreenWidth()) || (p_w && p_w == nexacro._getScreenWidth())) {
										is_changed = true;
									}
								}
								else {
									if ((p_w && p_w != nexacro._getScreenWidth()) || (l_w && l_w == nexacro._getScreenWidth())) {
										is_changed = true;
									}
								}

								if (is_changed || _tester.delayed_swap_screen_check_cnt == 10) {
									clearInterval(_tester.swap_screen_timer);
									_tester.swap_screen_timer = null;
									_tester.delayed_swap_screen = is_changed;
									_tester.delayed_swap_screen_checked = true;

									if (is_changed) {
										nexacro.__setViewportScale();
									}

									return;
								}

								_tester.delayed_swap_screen_check_cnt++;
							}, 100);
						}
					}
				}
				evt = _cur_win.event || evt;
				return nexacro._syshandler_onorientationchange(_cur_win.nexacro_HTMLSysEvent, evt);
			};

			_cur_win._syshandler_onmove_forward = function (evt) {
				_cur_win.nexacro_HTMLSysEvent._stopDetectWindowMove();
				try {
					var oldX = _cur_win._old_screenx;
					var oldY = _cur_win._old_screeny;

					if (oldX != _cur_win.screenX || oldY != _cur_win.screenY) {
						_cur_win._old_screenx = _cur_win.screenX;
						_cur_win._old_screeny = _cur_win.screenY;

						evt = _cur_win.event || evt;

						var ret = nexacro._syshandler_onmove(_cur_win.nexacro_HTMLSysEvent, evt);
						_cur_win.nexacro_HTMLSysEvent._move_detect_timer = setTimeout(_cur_win.nexacro_HTMLSysEvent._syshandler_onmove_forward, 500);
						return ret;
					}
				}
				catch (e) {
					return false;
				}
				_cur_win.nexacro_HTMLSysEvent._move_detect_timer = setTimeout(_cur_win.nexacro_HTMLSysEvent._syshandler_onmove_forward, 500);
			};
			_cur_win._syshandler_onload_forward = function (evt) {
				return nexacro._syshandler_onload(_cur_win.nexacro_HTMLSysEvent, evt);
			};
		};
	}

	nexacro.HTMLSysEvent = function (_win_win, _win_doc, _cur_win, _cur_doc) {
		this._win_win = _win_win;
		this._win_doc = _win_doc;
		this._cur_win = _cur_win;
		this._cur_doc = _cur_doc;

		this._cur_over_elem = null;

		this._syshandler_onmessage_forward = _cur_win._syshandler_onmessage_forward;
		this._syshandler_onmousedown_forward = _cur_win._syshandler_onmousedown_forward;
		this._syshandler_onmouseup_forward = _cur_win._syshandler_onmouseup_forward;
		this._syshandler_lock_onmouseup_forward = _cur_win._syshandler_lock_onmouseup_forward;
		this._syshandler_onmousemove_forward = _cur_win._syshandler_onmousemove_forward;
		this._syshandler_lock_onmousemove_forward = _cur_win._syshandler_lock_onmousemove_forward;
		this._syshandler_onlosecapture_forward = _cur_win._syshandler_onlosecapture_forward;
		this._syshandler_ontouchstart_forward = _cur_win._syshandler_ontouchstart_forward;
		this._syshandler_ontouchend_forward = _cur_win._syshandler_ontouchend_forward;
		this._syshandler_ontouchmove_forward = _cur_win._syshandler_ontouchmove_forward;
		this._syshandler_ontouchcancel_forward = _cur_win._syshandler_ontouchcancel_forward;
		this._syshandler_ondblclick_forward = _cur_win._syshandler_ondblclick_forward;
		this._syshandler_onmouseover_forward = _cur_win._syshandler_onmouseover_forward;
		this._syshandler_onmouseout_forward = _cur_win._syshandler_onmouseout_forward;
		this._syshandler_onkeydown_forward = _cur_win._syshandler_onkeydown_forward;
		this._syshandler_onkeypress_forward = _cur_win._syshandler_onkeypress_forward;
		this._syshandler_onkeyup_forward = _cur_win._syshandler_onkeyup_forward;
		this._syshandler_onmousewheel_forward = _cur_win._syshandler_onmousewheel_forward;
		this._syshandler_oncontextmenu_forward = _cur_win._syshandler_oncontextmenu_forward;
		this._syshandler_ondragstart_forward = _cur_win._syshandler_ondragstart_forward;
		this._syshandler_ondragenter_forward = _cur_win._syshandler_ondragenter_forward;
		this._syshandler_ondragover_forward = _cur_win._syshandler_ondragover_forward;
		this._syshandler_ondragleave_forward = _cur_win._syshandler_ondragleave_forward;
		this._syshandler_ondrop_forward = _cur_win._syshandler_ondrop_forward;
		this._syshandler_onselectstart_forward = _cur_win._syshandler_onselectstart_forward;
		this._syshandler_onactivate_forward = _cur_win._syshandler_onactivate_forward;
		this._syshandler_ondeactivate_forward = _cur_win._syshandler_ondeactivate_forward;
		this._syshandler_onbeforeclose_forward = _cur_win._syshandler_onbeforeclose_forward;
		this._syshandler_onclose_forward = _cur_win._syshandler_onclose_forward;
		this._syshandler_onresize_forward = _cur_win._syshandler_onresize_forward;
		this._syshandler_onorientationchange_forward = _cur_win._syshandler_onorientationchange_forward;
		this._syshandler_onmove_forward = _cur_win._syshandler_onmove_forward;
		this._syshandler_onload_forward = _cur_win._syshandler_onload_forward;
		this._syshandler_ongesturestart_forward = _cur_win._syshandler_ongesturestart_forward;

		_cur_win._syshandler_onmessage_forward = null;
		_cur_win._syshandler_onmousedown_forward = null;
		_cur_win._syshandler_onmouseup_forward = null;
		_cur_win._syshandler_lock_onmouseup_forward = null;
		_cur_win._syshandler_onmousemove_forward = null;
		_cur_win._syshandler_lock_onmousemove_forward = null;
		_cur_win._syshandler_onlosecapture_forward = null;
		_cur_win._syshandler_ontouchstart_forward = null;
		_cur_win._syshandler_ontouchend_forward = null;
		_cur_win._syshandler_ontouchmove_forward = null;
		_cur_win._syshandler_ontouchcancel_forward = null;
		_cur_win._syshandler_ondblclick_forward = null;
		_cur_win._syshandler_onmouseover_forward = null;
		_cur_win._syshandler_onmouseout_forward = null;
		_cur_win._syshandler_onkeydown_forward = null;
		_cur_win._syshandler_onkeypress_forward = null;
		_cur_win._syshandler_onkeyup_forward = null;
		_cur_win._syshandler_onmousewheel_forward = null;
		_cur_win._syshandler_oncontextmenu_forward = null;
		_cur_win._syshandler_ondragstart_forward = null;
		_cur_win._syshandler_ondragenter_forward = null;
		_cur_win._syshandler_ondragover_forward = null;
		_cur_win._syshandler_ondragleave_forward = null;
		_cur_win._syshandler_ondrop_forward = null;
		_cur_win._syshandler_onselectstart_forward = null;
		_cur_win._syshandler_onactivate_forward = null;
		_cur_win._syshandler_ondeactivate_forward = null;
		_cur_win._syshandler_onbeforeclose_forward = null;
		_cur_win._syshandler_onclose_forward = null;
		_cur_win._syshandler_onresize_forward = null;
		_cur_win._syshandler_onorientationchange_forward = null;
		_cur_win._syshandler_onmove_forward = null;
		_cur_win._syshandler_onload_forward = null;
	};
	var _pHTMLSysEvent = nexacro.HTMLSysEvent.prototype;

	_pHTMLSysEvent.KEY_BACKSPACE = 8;
	_pHTMLSysEvent.KEY_TAB = 9;
	_pHTMLSysEvent.KEY_RETURN = 13;
	_pHTMLSysEvent.KEY_ESC = 27;
	_pHTMLSysEvent.KEY_SPACE = 32;
	_pHTMLSysEvent.KEY_LEFT = 37;
	_pHTMLSysEvent.KEY_UP = 38;
	_pHTMLSysEvent.KEY_RIGHT = 39;
	_pHTMLSysEvent.KEY_DOWN = 40;
	_pHTMLSysEvent.KEY_DELETE = 46;
	_pHTMLSysEvent.KEY_HOME = 36;
	_pHTMLSysEvent.KEY_END = 35;
	_pHTMLSysEvent.KEY_PAGEUP = 33;
	_pHTMLSysEvent.KEY_PAGEDOWN = 34;
	_pHTMLSysEvent.KEY_INSERT = 45;

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11) {
		_pHTMLSysEvent.MOUSE_LBUTTON = 1;
		_pHTMLSysEvent.MOUSE_MBUTTON = 4;
		_pHTMLSysEvent.MOUSE_RBUTTON = 2;
	}
	else {
		_pHTMLSysEvent.MOUSE_LBUTTON = 0;
		_pHTMLSysEvent.MOUSE_MBUTTON = 1;
		_pHTMLSysEvent.MOUSE_RBUTTON = 2;
	}

	if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		_pHTMLSysEvent._initDocEventHandler = function () {
			var _cur_win = this._cur_win;
			var _cur_doc = this._cur_doc;
			var body = _cur_doc.body;
			nexacro._observeSysEvent(_cur_win, "message", "onmessage", this._syshandler_onmessage_forward);
			nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
			nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
			nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
			nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
			nexacro._observeSysEvent(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
			if (nexacro._SupportTouchEvent) {
				if ((nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
					nexacro._observeSysEvent(_cur_win, "pointerdown", "onpointerdown", this._syshandler_ontouchstart_forward);
					nexacro._observeSysEvent(_cur_win, "pointerup", "onpointerup", this._syshandler_ontouchend_forward);
					nexacro._observeSysEvent(_cur_win, "pointermove", "onpointermove", this._syshandler_ontouchmove_forward);
					nexacro._observeSysEvent(_cur_win, "pointercancel", "onpointercancel", this._syshandler_ontouchcancel_forward);
				}
				else {
					nexacro._observeSysEvent(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
					nexacro._observeSysEvent(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
					nexacro._observeSysEvent(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
					nexacro._observeSysEvent(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
				}
			}
			nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
			nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
			nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
			nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
			nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
			nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);
			nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
			nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_ondragstart_forward);
			nexacro._observeSysEvent(body, "dragenter", "ondragenter", this._syshandler_ondragenter_forward);
			nexacro._observeSysEvent(body, "dragover", "ondragover", this._syshandler_ondragover_forward);
			nexacro._observeSysEvent(body, "dragleave", "ondragleave", this._syshandler_ondragleave_forward);
			nexacro._observeSysEvent(body, "drop", "ondrop", this._syshandler_ondrop_forward);

			nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
			nexacro._observeSysEvent(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
			nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
			nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
			nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
			nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

			nexacro._observeSysEvent(body, "wheel", "onwheel", this._syshandler_onmousewheel_forward);

			nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);

			this._startDetectWindowMove();
		};
		_pHTMLSysEvent._stopDocEventHandler = function () {
			var _cur_win = this._cur_win;
			var _cur_doc = this._cur_doc;
			var body = _cur_doc.body;

			this._stopDetectWindowMove();

			nexacro._stopSysObserving(_cur_win, "message", "onmessage", this._syshandler_onmessage_forward);
			nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
			nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
			nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
			nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
			nexacro._stopSysObserving(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
			if (nexacro._SupportTouchEvent) {
				if ((nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
					nexacro._stopSysObserving(_cur_win, "pointerdown", "onpointerdown", this._syshandler_ontouchstart_forward);
					nexacro._stopSysObserving(_cur_win, "pointerup", "onpointerup", this._syshandler_ontouchend_forward);
					nexacro._stopSysObserving(_cur_win, "pointermove", "onpointermove", this._syshandler_ontouchmove_forward);
					nexacro._stopSysObserving(_cur_win, "pointercancel", "onpointercancel", this._syshandler_ontouchcancel_forward);
				}
				else {
					nexacro._stopSysObserving(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
					nexacro._stopSysObserving(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
					nexacro._stopSysObserving(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
					nexacro._stopSysObserving(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
				}
			}
			nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
			nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
			nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
			nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
			nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
			nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
			nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
			nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_ondragstart_forward);
			nexacro._stopSysObserving(body, "dragenter", "ondragenter", this._syshandler_ondragenter_forward);
			nexacro._stopSysObserving(body, "dragover", "ondragover", this._syshandler_ondragover_forward);
			nexacro._stopSysObserving(body, "dragleave", "ondragleave", this._syshandler_ondragleave_forward);
			nexacro._stopSysObserving(body, "drop", "ondrop", this._syshandler_ondrop_forward);

			nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
			nexacro._stopSysObserving(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
			nexacro._stopSysObserving(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
			nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
			nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
			nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

			nexacro._stopSysObserving(body, "wheel", "onwheel", this._syshandler_onmousewheel_forward);

			nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
		};

		_pHTMLSysEvent.lockMouseMove = function () {
		};
		_pHTMLSysEvent.unloackMouseMove = function () {
		};
	}
	else if (nexacro._Browser != "IE") {
		_pHTMLSysEvent._initDocEventHandler = function () {
			var _cur_win = this._cur_win;
			var body = this._cur_doc.body;

			nexacro._observeSysEvent(_cur_win, "message", "onmessage", this._syshandler_onmessage_forward);
			nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
			nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
			nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
			nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
			if (nexacro._SupportTouchEvent) {
				nexacro._observeSysEvent(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
				nexacro._observeSysEvent(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
				nexacro._observeSysEvent(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
				nexacro._observeSysEvent(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);

				if (nexacro._Browser == "MobileSafari") {
					nexacro._observeSysEvent(body, "gesturestart", "ongesturestart", this._syshandler_ongesturestart_forward);
				}
			}
			nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
			nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
			nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
			nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
			nexacro._observeSysEvent(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
			nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
			nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);
			nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
			nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);
			nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_ondragstart_forward);
			nexacro._observeSysEvent(body, "dragenter", "ondragenter", this._syshandler_ondragenter_forward);
			nexacro._observeSysEvent(body, "dragover", "ondragover", this._syshandler_ondragover_forward);
			nexacro._observeSysEvent(body, "dragleave", "ondragleave", this._syshandler_ondragleave_forward);
			nexacro._observeSysEvent(body, "drop", "ondrop", this._syshandler_ondrop_forward);

			nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
			nexacro._observeSysEvent(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
			nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
			nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);

			nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);

			if (nexacro._SupportOrientation) {
				nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
			}

			if (nexacro._Browser == "Gecko" && nexacro._BrowserVersion >= 57) {
				nexacro._observeSysEvent(body, "wheel", "onwheel", this._syshandler_onmousewheel_forward);
			}

			this._startDetectWindowMove();
		};
		_pHTMLSysEvent._stopDocEventHandler = function () {
			var _cur_win = this._cur_win;
			var body = this._cur_doc.body;

			this._stopDetectWindowMove();

			nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
			nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
			nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
			nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
			if (nexacro._SupportTouchEvent) {
				nexacro._stopSysObserving(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
				nexacro._stopSysObserving(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
				nexacro._stopSysObserving(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
				nexacro._stopSysObserving(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);

				if (nexacro._Browser == "MobileSafari") {
					nexacro._stopSysObserving(body, "gesturestart", "ongesturestart", this._syshandler_ongesturestart_forward);
				}
			}
			nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
			nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
			nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
			nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
			nexacro._stopSysObserving(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
			nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
			nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
			nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
			nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
			nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
			nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_ondragstart_forward);
			nexacro._stopSysObserving(body, "dragenter", "ondragenter", this._syshandler_ondragenter_forward);
			nexacro._stopSysObserving(body, "dragover", "ondragover", this._syshandler_ondragover_forward);
			nexacro._stopSysObserving(body, "dragleave", "ondragleave", this._syshandler_ondragleave_forward);
			nexacro._stopSysObserving(body, "drop", "ondrop", this._syshandler_ondrop_forward);

			nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
			nexacro._stopSysObserving(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
			nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
			nexacro._stopSysObserving(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
			nexacro._stopSysObserving(_cur_win, "message", "onmessage", this._syshandler_onmessage_forward);
			nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);

			if (nexacro._SupportOrientation) {
				nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
			}

			if (nexacro._Browser == "Gecko" && nexacro._BrowserVersion >= 57) {
				nexacro._stopSysObserving(body, "wheel", "onwheel", this._syshandler_onmousewheel_forward);
			}
		};

		_pHTMLSysEvent.lockMouseMove = function () {
			var _cur_body = this._cur_doc.body;
			nexacro._stopSysObserving(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._stopSysObserving(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			nexacro._observeSysEvent(this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
			nexacro._observeSysEvent(this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
		};
		_pHTMLSysEvent.unlockMouseMove = function () {
			var _cur_body = this._cur_doc.body;
			nexacro._stopSysObserving(this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
			nexacro._stopSysObserving(this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
			nexacro._observeSysEvent(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
			nexacro._observeSysEvent(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		};
	}

	_pHTMLSysEvent._move_detect_timer = -1;
	_pHTMLSysEvent._startDetectWindowMove = function () {
		var _cur_win = this._cur_win;
		_cur_win._old_screenx = _cur_win.screenX ? _cur_win.screenX : _cur_win.screenLeft;
		_cur_win._old_screeny = _cur_win.screenY ? _cur_win.screenY : _cur_win.screenTop;

		var timeout = setTimeout(this._syshandler_onmove_forward, 500);
		this._move_detect_timer = timeout;
	};
	_pHTMLSysEvent._stopDetectWindowMove = function () {
		if (this._move_detect_timer) {
			clearTimeout(this._move_detect_timer);
			this._move_detect_timer = null;
		}
	};

	_pHTMLSysEvent.clearAll = function () {
		this._stopDetectWindowMove();

		this._win_win = null;
		this._win_doc = null;
		this._cur_win = null;
		this._cur_doc = null;

		this._cur_over_elem = null;

		this._syshandler_onmessage_forward = null;
		this._syshandler_onmousedown_forward = null;
		this._syshandler_onmouseup_forward = null;
		this._syshandler_lock_onmouseup_forward = null;
		this._syshandler_onmousemove_forward = null;
		this._syshandler_lock_onmousemove_forward = null;
		this._syshandler_ontouchstart_forward = null;
		this._syshandler_ontouchend_forward = null;
		this._syshandler_ontouchmove_forward = null;
		this._syshandler_ontouchcancel_forward = null;
		this._syshandler_ondblclick_forward = null;
		this._syshandler_onmouseover_forward = null;
		this._syshandler_onmouseout_forward = null;
		this._syshandler_onkeydown_forward = null;
		this._syshandler_onkeypress_forward = null;
		this._syshandler_onkeyup_forward = null;
		this._syshandler_onmousewheel_forward = null;
		this._syshandler_oncontextmenu_forward = null;
		this._syshandler_ondragstart_forward = null;
		this._syshandler_ondragenter_forward = null;
		this._syshandler_ondragover_forward = null;
		this._syshandler_ondragleave_forward = null;
		this._syshandler_ondrop_forward = null;
		this._syshandler_onselectstart_forward = null;
		this._syshandler_onactivate_forward = null;
		this._syshandler_ondeactivate_forward = null;
		this._syshandler_onbeforeclose_forward = null;
		this._syshandler_onclose_forward = null;
		this._syshandler_onresize_forward = null;
		this._syshandler_onorientationchange_forward = null;
		this._syshandler_onmove_forward = null;
		this._syshandler_onload_forward = null;
	};


	nexacro.__getRealWindowHandle = function (_cur_win) {
		var _cur_nexacro = _cur_win.nexacro;
		var p = _cur_win;
		try {
			while (true) {
				if (p.parent && p != p.parent && p.parent.nexacro && p.parent.nexacro == _cur_nexacro) {
					p = p.parent;
				}
				else {
					break;
				}
			}
		}
		catch (e) {
			if (e && e.message) {
				trace(e.message);
			}
		}

		return p;
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 6) {
		nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc) {
			document.execCommand('BackgroundImageCache', false, true);

			var _win_win = nexacro.__getRealWindowHandle(_cur_win);
			var _win_doc = _win_win ? _win_win.document : document;

			nexacro._createWindowGC_Funcs(_cur_win);
			_cur_win.__createGC();

			nexacro._createSysEvent_ForwardFuncs(_cur_win);
			var _sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
			_sysEvent._initDocEventHandler();
		};
	}
	else {
		nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc) {
			var _win_win = nexacro.__getRealWindowHandle(_cur_win);
			var _win_doc = _win_win ? _win_win.document : document;

			nexacro._createWindowGC_Funcs(_cur_win);
			_cur_win.__createGC();

			nexacro._initHTMLSysTimerManager(_cur_win);

			nexacro.__setDOMStyle_overscrollBehavior(nexacro._getWindowDestinationHandle(_win_win).style);

			nexacro._createSysEvent_ForwardFuncs(_cur_win);
			var _sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
			_sysEvent._initDocEventHandler();
		};
	}

	nexacro._finalizeHTMLSysEvent = function (_cur_win) {
		_cur_win.__createGC = null;
		_cur_win.__clearGC = null;
		_cur_win.__destroyGC = null;

		_cur_win.nexacro_HTMLSysEvent = null;
	};

	nexacro._preparePopupFrame = function (_cur_win, _cur_doc, urlparams, fontface_info) {
		function onloadpopupframe () {
			nexacro._createPopupFrame(_cur_win, urlparams);
		}

		nexacro._initHTMLSysEvent(_cur_win, _cur_doc);

		if (urlparams) {
			nexacro._prepareManagerFrame(onloadpopupframe, fontface_info);
		}
		else {
			nexacro._prepareManagerFrame();
		}
	};

	nexacro._createPopupFrame = function (_cur_win, urlparams) {
		nexacro._is_loaded_application = true;
		var name = urlparams.framename;
		nexacro._uniquestoragevalue = urlparams.loadtime;

		nexacro._initScreenInfo();
		var parent_handle = _cur_win.opener || parent;
		var parent_win = nexacro._findWindow(_cur_win.opener || parent);
		var _win = new nexacro._Window(name, parent_win);
		_win.setLinkedWindow(_cur_win);

		var env = nexacro.getEnvironment();

		env.loadVariables = nexacro._emptyFn;

		env._load();

		nexacro._getLocalStorageforService();


		if (parent_win) {
			parent_win.addChild(_win);
		}

		var storagekey = "popupframeoption" + name;
		var popupframe = nexacro._getLocalStorage(storagekey, 2);

		nexacro._popupframeoption = {
		};
		nexacro._popupframeoption[name] = JSON.parse(popupframe);

		if (parent_win) {
			var popupframeoption = nexacro._popupframeoption[name];

			if (parent_handle._nexacro_popupframeoption) {
				var _popup_opt = parent_handle._nexacro_popupframeoption[storagekey];
				if (_popup_opt) {
					popupframeoption._args = _popup_opt._popuparrarg;
					popupframeoption._parentframe = _popup_opt._popupparentframe;
					popupframeoption._opener = _popup_opt._popupframeopener;

					_popup_opt._popupparentframe = null;
					_popup_opt._popuparrarg = null;
					_popup_opt._popupframeopener = null;

					parent_handle._nexacro_popupframeoption[storagekey] = null;
					delete parent_handle._nexacro_popupframeoption[storagekey];
				}
			}
		}

		nexacro._removeLocalStorage(storagekey, 2);

		var cssurls = nexacro._getLocalStorage("cssurls", 2);
		if (cssurls) {
			nexacro._cssurls = cssurls.split(",");
		}

		var childframe = new nexacro.ChildFrame(name);
		if (parent_handle.nexacro) {
			var pNexacro = parent_handle.nexacro;
			pNexacro._registerPopupFrame(name, childframe, parent_win);
		}
		childframe._showModeless(name, _win);
	};

	nexacro._getPopupFrames = function (winobj) {
		var context = window;

		if (winobj) {
			context = winobj.handle;
		}

		if (context._popupframes) {
			return context._popupframes;
		}
		else {
			return context._popupframes = new nexacro.Collection();
		}
	};

	nexacro._isPopupFrame = function (id) {
		var popupframes = window._popupframes;
		if (popupframes && popupframes.get_item(id) != null) {
			return true;
		}
		return false;
	};

	nexacro._registerPopupFrame = function (id, frame, winobj) {
		var context = window;
		if (winobj) {
			context = winobj.handle;
		}

		if (!context._popupframes) {
			context._popupframes = new nexacro.Collection();
		}

		if (context._popupframes.get_item(id) != null) {
			return -1;
		}

		return context._popupframes.add_item(id, frame);
	};

	nexacro._unregisterPopupFrame = function (id, winobj, isparentnull) {
		var context;
		if (winobj && winobj.parent && isparentnull) {
			context = winobj.parent.handle;
			context.nexacro._unregisterPopupFrame(id);
			context.nexacro._getLocalStorageforService();
		}
		else {
			context = window;
			if (winobj) {
				context = winobj.handle;
			}
			if (context._popupframes) {
				context._popupframes.delete_item(id);
				if (context._popupframes.length == 0) {
					context._popupframes = null;
				}
			}
		}
	};

	nexacro._cleanupPopupFrame = function (id, parentframe) {
		var target;
		var _type = 0;
		if (parentframe && parentframe[id]) {
			target = parentframe[id];
			_type = 1;
		}
		else if (nexacro._isPopupFrame(id)) {
			var popupframes = window._popupframes;
			target = popupframes.get_item(id);
			_type = 2;
		}
		if (target) {
			try {
				var wnd = target._getWindow();
				if (wnd) {
					var handle = wnd.handle;
					if (handle && handle.closed) {
						nexacro._unregisterPopupFrame(id);
						target._is_alive = true;
						wnd._is_alive = true;
						wnd.destroy();
					}
				}
			}
			catch (e) {
				switch (_type) {
					case 1:
						parentframe.removeChild(id);
						break;
					case 2:
						nexacro._unregisterPopupFrame(id);
						break;
				}
			}
		}
	};

	nexacro._setLastEventName = function (evtName) {
		nexacro._last_eventname = evtName;
	};
	nexacro._getLastEventName = function () {
		return nexacro._last_eventname;
	};

	if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		nexacro._syshandler_lock_onmouseup = nexacro._emptyFn;
		nexacro._syshandler_lock_onmousemove = nexacro._emptyFn;

		nexacro._syshandler_onmessage = function (_sysEvent, node, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);

			win._on_sys_message(evt.data);
		};

		nexacro._syshandler_onmousedown = function (_sysEvent, node, evt) {
			var ret = false;
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (!win || !elem) {
				return ret;
			}

			var last_focused_elem = win._last_focused_elem;
			var last_focused_elem_composing = (last_focused_elem && last_focused_elem.isInputElement() && last_focused_elem.isComposing()) ? true : false;

			_sysEvent._cur_win.__clearGC();

			if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON) {
				if (win._is_active_window === false) {
					win._on_sys_activate();
				}

				if (_sysEvent._cur_win.document.hasFocus && _sysEvent._cur_win.document.hasFocus() === false) {
					_sysEvent._cur_win.focus();
				}

				ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				if (nexacro._SystemLang != "ja") {
					if (last_focused_elem && last_focused_elem.parent && last_focused_elem.isInputElement() && (last_focused_elem != elem)) {
						last_focused_elem._on_sys_mousedown("lbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
					}
				}

				if (!(elem.isInputElement() && elem.enable) || (elem.isInputElement() && elem == last_focused_elem && (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge"))) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}
				}

				if (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge") {
					if (nexacro._isSameComponent(elem, last_focused_elem) && 
						!(elem.isInputElement() && elem.enable) && 
						!(last_focused_elem instanceof nexacro._WebBrowserPluginElement)) {
						nexacro._stopSysEvent(evt);
					}
				}
				else {
					if (!(elem.isInputElement() && elem.enable) && !(nexacro._isWebTypeElement(last_focused_elem))) {
						nexacro._stopSysEvent(evt);
					}
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}
			}
			else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON || evt.button === 0) {
				ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				if (last_focused_elem && last_focused_elem.parent && last_focused_elem.isInputElement() && (last_focused_elem != elem)) {
					last_focused_elem._on_sys_mousedown("rbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
				}

				if (!(elem.isInputElement() && elem.enable) || (elem.isInputElement() && elem == last_focused_elem && (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge"))) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}
				}

				if (!(elem.isInputElement() && elem.enable)) {
					nexacro._stopSysEvent(evt);
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}
			}
			else {
				ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				if (nexacro._SystemLang != "ja" && nexacro._OSVersion >= 6.0) {
					if (last_focused_elem && last_focused_elem.parent && last_focused_elem.isInputElement() && (last_focused_elem != elem)) {
						win._last_focused_elem._on_sys_mousedown("mbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
					}
				}

				if (!(elem.isInputElement() && elem.enable) || (elem.isInputElement() && elem == last_focused_elem && (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge"))) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}
				}

				if (!(elem.isInputElement() && elem.enable)) {
					nexacro._stopSysEvent(evt);
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}
			}

			return ret;
		};
		nexacro._syshandler_onmouseup = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._cur_win);
			var elem = nexacro.__findParentElement(node);
			if (!win) {
				return false;
			}

			if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON) {
				return win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
			}
			else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON) {
				return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
			}
			else {
				return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
			}
		};
		nexacro._syshandler_onmousemove = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._cur_win);
			var elem = nexacro.__findParentElement(node);
			if (!win) {
				return false;
			}

			var w_x = nexacro._getWindowHandlePosX(win.handle);
			var w_y = nexacro._getWindowHandlePosY(win.handle);
			var w_width = nexacro._getMainWindowWidth(win);
			var w_height = nexacro._getMainWindowHeight(win);

			if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
				return false;
			}
			else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height)) {
				if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBarControl) {
					return false;
				}
			}
			else {
				win._cur_screen_pos.x = evt.screenX;
				win._cur_screen_pos.y = evt.screenY;
			}

			var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));
			_sysEvent._cur_win.__clearGC();

			if (win._cur_ldown_elem) {
				if (win._cur_ldown_elem instanceof nexacro.InputElement) {
					var cur_point_elem = nexacro.__getElementFromPoint(win.handle, evt.clientX, evt.clientY);

					win._on_sys_mousemove(cur_point_elem == elem || nexacro._cur_drag_info ? cur_point_elem : null, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

					return true;
				}
				else {
					win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				}
			}
			else if (elem) {
				win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				return true;
			}

			return false;
		};
		nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt) {
			var ret = false;
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (!win || !elem) {
				return ret;
			}

			_sysEvent._cur_win.__clearGC();

			if (this._Browser == "Edge" && this._BrowserType == "Edge") {
				if (win._cur_wheel_pos.x == evt.screenX && win._cur_wheel_pos.y == evt.screenY) {
					win._cur_wheel_pos.x = null;
					win._cur_wheel_pos.y = null;
					return false;
				}
				else {
					win._cur_wheel_pos.x = evt.screenX;
					win._cur_wheel_pos.y = evt.screenY;
				}
			}

			ret = win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({
				button : 4, 
				which : 2
			}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

			if (ret === false) {
				nexacro._stopSysEvent(evt);
			}

			return ret;
		};
	}
	else if (nexacro._Browser != "IE") {
		nexacro._compositionComplete = function (win, elem) {
			var last_focused = win._last_focused_elem;
			if (last_focused != elem) {
				if (nexacro._OS == "iOS" || nexacro._OS == "Mac OS") {
					if (elem.isInputElement()) {
						var input_handle = last_focused.handle;
						input_handle.blur();
						return;
					}
				}
			}
		};

		nexacro._syshandler_onmessage = function (_sysEvent, node, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);

			win._on_sys_message(evt.data);
		};

		nexacro._syshandler_onmousedown = function (_sysEvent, node, evt) {
			var ret = false;
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (!win || !elem) {
				return ret;
			}

			var last_focused_elem = win._last_focused_elem;
			var last_focused_elem_composing = (last_focused_elem && last_focused_elem.isInputElement() && last_focused_elem.isComposing()) ? true : false;

			if (win._is_active_window == false) {
				win._on_sys_activate();
			}

			if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON) {
				ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				_sysEvent.lockMouseMove(node);

				if (!(elem.isInputElement() && elem.enable)) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}

					if (!(nexacro._isWebTypeElement(last_focused_elem))) {
						nexacro._stopSysEvent(evt);
					}
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}

				nexacro._compositionComplete(win, elem);
			}
			else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON) {
				ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				if (!(elem.isInputElement() && elem.enable)) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}

					nexacro._stopSysEvent(evt);
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}

				nexacro._compositionComplete(win, elem);
			}
			else {
				ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

				if (!(elem.isInputElement() && elem.enable)) {
					if (last_focused_elem_composing) {
						last_focused_elem.on_complete_composition_value();
					}

					nexacro._stopSysEvent(evt);
				}

				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}

				nexacro._compositionComplete(win, elem);
			}

			return ret;
		};
		nexacro._syshandler_onmouseup = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (win && elem) {
				if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON) {
					return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				}
				else {
					return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				}
			}
			return false;
		};
		nexacro._syshandler_lock_onmouseup = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			_sysEvent.unlockMouseMove(node);
			var ret = false;
			if (win) {
				if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON) {
					ret = win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				}
			}
			return ret;
		};
		nexacro._syshandler_onmousemove = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (!win) {
				return false;
			}



			if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
				return false;
			}
			else {
				win._cur_screen_pos.x = evt.screenX;
				win._cur_screen_pos.y = evt.screenY;
			}
			var button = (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"));

			if (elem) {
				win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				return true;
			}
			return false;
		};
		nexacro._syshandler_lock_onmousemove = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (!win) {
				return false;
			}


			var w_x = nexacro._getWindowHandlePosX(win.handle);
			var w_y = nexacro._getWindowHandlePosY(win.handle);
			var w_width = nexacro._getMainWindowWidth(win);
			var w_height = nexacro._getMainWindowHeight(win);

			if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
				return false;
			}
			else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height)) {
				if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBarControl) {
					return false;
				}
			}

			win._cur_screen_pos.x = evt.screenX;
			win._cur_screen_pos.y = evt.screenY;

			if (elem) {
				win._on_sys_mousemove(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				return true;
			}
			else {
				win._on_sys_mousemove(null, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
			}
			return false;
		};
		nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElement(node);
			if (win && elem) {
				var ret = win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({
					button : 1, 
					which : 2
				}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				if (ret === false) {
					nexacro._stopSysEvent(evt);
				}
				return;
			}
			return false;
		};
	}

	nexacro._syshandler_ontouchstart = function (_sysEvent, node, evt) {
		if (evt.stopped === true) {
			return;
		}


		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (!win || win._isFrozen) {
			return;
		}

		var touch, touchid, screenX, screenY, curTime, i;
		if (elem) {
			var last_focused_elem = win._last_focused_elem;

			var _doc = elem._getRootWindowHandle();
			var active_dom = _doc.activeElement;
			if (nexacro._Browser == "MobileSafari") {
				if (nexacro._isHybrid && nexacro._isHybrid()) {
					if (win._is_active_window === false) {
						win._on_sys_activate();
					}
				}

				if (last_focused_elem && last_focused_elem != elem) {
					if (!(elem.isInputElement() || elem instanceof nexacro.TextAreaElement) && (active_dom && (active_dom.tagName == "INPUT" || active_dom.tagName == "TEXTAREA"))) {
						if (!nexacro._isSameComponent(last_focused_elem, elem)) {
							var start = 0, end = 0;
							if (last_focused_elem.isInputElement()) {
								var pos = last_focused_elem.getElementCaretPos();
								if (pos !== -1) {
									start = pos.begin;
									end = pos.end;
								}
							}
							var input_handle = last_focused_elem.handle;
							nexacro.__setDOMNode_SetSelect(_doc, input_handle, start, end);
						}
					}
				}
			}

			curTime = (evt.timeStamp || (new Date()).getTime());

			var touches = evt.touches, changedTouches = evt.changedTouches;
			var touch_len = touches.length, change_len = changedTouches.length;
			var type = evt.type || "touchstart";

			var touch_node, touch_elem, touch_info, windowX, windowY, changed;
			var changed_ids = {
			}, touch_infos = [], changed_touch_infos = [];

			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				changed_ids[touch.identifier] = true;
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];
				touch_node = touch.target;
				if (touch_node && touch_node != node) {
					touch_elem = nexacro.__findParentElement(touch_node);
				}
				else {
					touch_elem = elem;
				}

				touchid = touch.identifier;
				changed = changed_ids[touchid];
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, changed, windowX, windowY, screenX, screenY);
				touch_infos.push(touch_info);
				if (changed) {
					changed_touch_infos.push(touch_info);
				}
			}

			win._on_gesture_sys_touchstart(elem, touch_infos, changed_touch_infos, curTime);
		}

		return false;
	};
	nexacro._syshandler_ontouchend = function (_sysEvent, node, evt) {
		if (this._is_first_touch) {
			this._is_first_touch = false;
		}

		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (!win || win._isFrozen) {
			return;
		}

		var ret = false;
		var touch, touchid, screenX, screenY, curTime, i;
		if (elem) {
			curTime = (evt.timeStamp || (new Date()).getTime());

			if (nexacro._OS == "iOS" && parseFloat(nexacro._OSVersion) >= 9) {
				if (nexacro._last_touchend_time && (curTime - nexacro._last_touchend_time) < 400) {
					evt.preventDefault();
					if (evt.srcElement instanceof HTMLInputElement) {
						if (!evt.srcElement.readOnly) {
							evt.srcElement.focus();
						}
					}
				}
				nexacro._last_touchend_time = curTime;
			}
			var touches = evt.touches, changedTouches = evt.changedTouches;
			var touch_len = touches.length, change_len = changedTouches.length;

			var touch_elem, touch_info;
			var windowX, windowY;
			var type = evt.type || "touchend";

			var touch_infos = [], changed_touch_infos = [];

			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];

				touchid = touch.identifier;
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);

				touch_elem = nexacro.__getElementFromPoint(win.handle, windowX, windowY);

				if (elem.windowed) {
					if (elem.linkedcontrol && nexacro._isWebTypeComponent(elem.linkedcontrol)) {
						if (elem.linkedcontrol._ifrm_elem && elem.linkedcontrol._ifrm_elem._window) {
							touch_elem = nexacro.__getElementFromPoint(elem.linkedcontrol._ifrm_elem._window, windowX, windowY);
						}
					}
				}

				if (touch_elem) {
					elem = touch_elem;
				}

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, true, windowX, windowY, screenX, screenY);
				changed_touch_infos.push(touch_info);
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];

				touchid = touch.identifier;
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);

				touch_elem = nexacro.__getElementFromPoint(win.handle, windowX, windowY);

				if (elem.windowed) {
					if (elem.linkedcontrol && nexacro._isWebTypeComponent(elem.linkedcontrol)) {
						if (elem.linkedcontrol._ifrm_elem && elem.linkedcontrol._ifrm_elem._window) {
							touch_elem = nexacro.__getElementFromPoint(elem.linkedcontrol._ifrm_elem._window, windowX, windowY);
						}
					}
				}

				if (touch_elem) {
					elem = touch_elem;
				}

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, false, windowX, windowY, screenX, screenY);
				touch_infos.push(touch_info);
			}

			nexacro._setLastEventName("touchend");

			ret = win._on_gesture_sys_touchend(elem, touch_infos, changed_touch_infos, curTime);
			if (ret) {
				nexacro._stopSysEvent(evt);
				return true;
			}
			else {
				return;
			}
		}

		var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
		for (i = 0; i < touchlen; i++) {
			touch = evt.changedTouches ? evt.changedTouches[i] : evt;
			var clientX = nexacro.__getWindowX(touch);
			var clientY = nexacro.__getWindowY(touch);
			screenX = nexacro.__getScreenX(touch);
			screenY = nexacro.__getScreenY(touch);
			curTime = (evt.timeStamp || new Date().getTime());
			var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
			touchid = touch.identifier;
			elem = nexacro.__getElementFromPoint(win.handle, clientX, clientY);

			ret |= win._on_sys_touchend(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
		}

		if (ret) {
			nexacro._stopSysEvent(evt);
			return true;
		}
	};
	nexacro._syshandler_ontouchmove = function (_sysEvent, node, evt) {
		var ret = false;
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (!win && win._isFrozen) {
			return;
		}


		var touch, touchid, screenX, screenY, curTime, i;
		if (elem) {
			curTime = (evt.timeStamp || Date.now());



			var touches = evt.touches, changedTouches = evt.changedTouches;
			var touch_len = touches.length, change_len = changedTouches.length;

			var touch_elem, touch_info;
			var changed, windowX, windowY;
			var type = evt.type || "touchmove";

			var changed_ids = {
			}, touch_infos = [], changed_touch_infos = [];

			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				changed_ids[touch.identifier] = true;
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];


				touchid = touch.identifier;
				changed = changed_ids[touchid];
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);
				touch_elem = nexacro.__getElementFromPoint(win.handle, windowX, windowY);
				if (touch_elem) {
					elem = touch_elem;
				}

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, changed, windowX, windowY, screenX, screenY);
				touch_infos.push(touch_info);
				if (changed) {
					changed_touch_infos.push(touch_info);
				}
			}

			ret = win._on_gesture_sys_touchmove(elem, touch_infos, changed_touch_infos, curTime);
		}


		if (ret) {
			nexacro._stopSysEvent(evt);
			return true;
		}
		return false;
	};
	nexacro._syshandler_ontouchcancel = function (_sysEvent, node, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (!win || win._isFrozen) {
			return;
		}

		var touch, touchid, screenX, screenY, curTime, i;
		if (elem) {
			evt.preventDefault();
			curTime = (evt.timeStamp || new Date().getTime());

			var touches = evt.touches, changedTouches = evt.changedTouches;
			var touch_len = touches.length, change_len = changedTouches.length;

			var touch_node, touch_elem, touch_info;
			var windowX, windowY;
			var type = evt.type || "touchcancel";
			var touch_infos = [], changed_touch_infos = [];

			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				touch_node = touch.target;
				if (touch_node && touch_node != node) {
					touch_elem = nexacro.__findParentElement(touch_node);
				}
				else {
					touch_elem = elem;
				}

				touchid = touch.identifier;
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, true, windowX, windowY, screenX, screenY);
				changed_touch_infos.push(touch_info);
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];
				touch_node = touch.target;
				if (touch_node && touch_node != node) {
					touch_elem = nexacro.__findParentElement(touch_node);
				}
				else {
					touch_elem = elem;
				}

				touchid = touch.identifier;
				windowX = nexacro.__getWindowX(touch);
				windowY = nexacro.__getWindowY(touch);
				screenX = nexacro.__getScreenX(touch);
				screenY = nexacro.__getScreenY(touch);

				touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, false, windowX, windowY, screenX, screenY);
				touch_infos.push(touch_info);
			}

			win._on_gesture_sys_touchcancel(elem, touch_infos, changed_touch_infos, curTime);
			return;
		}

		var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
		var ret = false;
		for (i = 0; i < touchlen; i++) {
			touch = evt.changedTouches ? evt.changedTouches[i] : evt;
			var clientX = touch.pageX || touch.clientX;
			var clientY = touch.pageY || touch.clientY;
			screenX = nexacro.__getScreenX(touch);
			screenY = nexacro.__getScreenY(touch);
			curTime = (evt.timeStamp || new Date().getTime());
			var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
			touchid = touch.identifier;
			var pointX = clientX;
			var pointY = clientY;

			if (window.pageXOffset > 0) {
				pointX -= window.pageXOffset;
			}
			if (window.pageYOffset > 0) {
				pointY -= window.pageYOffset;
			}

			var hover_elem = nexacro.__getElementFromPoint(win.handle, pointX, pointY);
			if (hover_elem) {
				elem = hover_elem;
			}

			ret |= win._on_sys_touchcancel(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
		}
	};


	nexacro._syshandler_ondblclick = function (_sysEvent, node, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (win && elem) {
			_sysEvent._cur_win.__clearGC();
			var ret = win._on_sys_dblclick(elem, nexacro._getSysEventBtnString({
				button : 1, 
				which : 1
			}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);

			return ret;
		}
		return false;
	};

	nexacro._syshandler_onmouseover = function (_sysEvent, node, fromnode, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		var from_elem = nexacro.__findParentElement(fromnode);
		var end_elem;

		if (!from_elem) {
			var dragInfo = nexacro._cur_drag_info;
			if (dragInfo && !dragInfo.isDragover) {
				nexacro._initDragInfo();
			}
		}

		if (win && elem && elem != from_elem) {
			var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));
			var ret;

			if (from_elem) {
				end_elem = win._findCommonParentElement(elem, from_elem);
			}
			else {
				end_elem = win._findRootElement();
			}

			if (!end_elem) {
				end_elem = win._findPopupElement(elem);
			}
			if (!end_elem) {
				end_elem = win._findRootElement();
			}

			if (end_elem) {
				var fire_elem = [];

				for (; elem && elem != end_elem; elem = elem.parent_elem) {
					if (elem.linkedcontrol) {
						fire_elem.push(elem);
					}
				}
				for (var i = fire_elem.length - 1; i >= 0; i--) {
					ret = win._on_sys_mouseenter(fire_elem[i], from_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
				}
			}
			return ret;
		}
		return false;
	};

	nexacro._syshandler_onmouseout = function (_sysEvent, node, tonode, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		var to_elem = nexacro.__findParentElement(tonode);
		var end_elem;

		if (win && elem && elem != to_elem) {
			var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));
			var ret;

			if (to_elem) {
				end_elem = win._findCommonParentElement(elem, to_elem);
			}
			else {
				end_elem = win._findRootElement();
			}

			if (!end_elem) {
				end_elem = win._findPopupElement(elem);
			}
			if (!end_elem) {
				end_elem = win._findRootElement();
			}


			if (end_elem) {
				for (; elem && elem != end_elem; elem = elem.parent_elem) {
					if (elem.linkedcontrol) {
						ret = win._on_sys_mouseleave(elem, to_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, evt.metaKey);
					}
				}
			}
			return ret;
		}
		return false;
	};

	if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._OSVersion >= 6.0)) {
		nexacro._syshandler_onkeydown = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElementForKeyEvent(node, win);
			var keycode = nexacro._getSysEventKeyCode(evt);
			if (win && elem) {
				nexacro._setKeydownInfo(evt);
				_sysEvent._cur_win.__clearGC();
				win._on_sys_keydown(elem, keycode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
				if (elem._event_stop) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
					return true;
				}
				else if (nexacro._Browser == "IE" && keycode == nexacro.Event.KEY_BACKSPACE) {
					if (!(elem instanceof nexacro.InputElement || elem instanceof nexacro.TextAreaElement) || ((elem instanceof nexacro.InputElement || elem instanceof nexacro.TextAreaElement) && elem.readonly)) {
						nexacro._stopSysEvent(evt);
					}
				}

				return true;
			}
			return false;
		};
	}
	else {
		nexacro._syshandler_onkeydown = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win);
			var elem = nexacro.__findParentElementForKeyEvent(node, win);
			if (win && elem) {
				_sysEvent._cur_win.__clearGC();
				var keycode = nexacro._getSysEventKeyCode(evt);
				win._on_sys_keydown(elem, keycode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
				if (elem._event_stop) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
					return true;
				}

				return true;
			}
			return false;
		};
	}
	nexacro._syshandler_onkeypress = function (_sysEvent, node, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElementForKeyEvent(node, win);
		if (win && elem) {
			_sysEvent._cur_win.__clearGC();
			var ret = win._on_sys_keypress(elem, evt.keyCode, evt.charCode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
			if (elem._event_stop) {
				nexacro._stopSysEvent(evt);
				elem._event_stop = false;
				return true;
			}

			return ret;
		}
		return false;
	};
	nexacro._syshandler_onkeyup = function (_sysEvent, node, evt) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElementForKeyEvent(node, win);
		if (win && elem) {
			var keycode = nexacro._getSysEventKeyCode(evt);
			if (keycode === 0) {
				var keydown_info = nexacro._getKeydownInfo();
				if (keydown_info) {
					keycode = nexacro._getSysEventKeyCode(keydown_info);
				}
			}
			return win._on_sys_keyup(elem, keycode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.metaKey);
		}
		return false;
	};

	nexacro._syshandler_onactivate = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		if (win && win._on_sys_activate) {
			_sysEvent._cur_win.__clearGC();
			var ret = win._on_sys_activate();
			win._fire_activate = true;
			return ret;
		}
		return false;
	};

	nexacro._syshandler_ondeactivate = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._win_win);

		if (nexacro._Browser != "IE") {
			win._fire_activate = true;
		}

		if (win && win._fire_activate) {
			win._fire_activate = false;
			var doc = win._dest_doc;
			if (doc) {
				var active_node = win._dest_doc.activeElement;

				if (active_node) {
					var active_elem = active_node._linked_element;
					if (active_elem && nexacro._isWebTypeElement(active_elem)) {
						if (win._is_alive) {
							var comp = active_elem.component ? active_elem.component : active_elem.owner_elem ? active_elem.owner_elem.linkedcontrol : null;
							nexacro._checkClosePopupComponent(comp, true);
							nexacro.__setLastFocusedElement(active_elem);
						}
						return false;
					}
				}
			}

			if (win._on_sys_deactivate) {
				_sysEvent._cur_win.__clearGC();
				var ret = win._on_sys_deactivate();

				return ret;
			}
		}
		return false;
	};

	nexacro._syshandler_onbeforeclose = function (_sysEvent, evt) {
		var win = nexacro._findWindow(_sysEvent._cur_win);
		var confirm_message;
		if (win && win._on_sys_beforeclose) {
			confirm_message = win._on_sys_beforeclose();
		}

		if (confirm_message !== undefined && confirm_message !== "" && confirm_message !== null) {
			if (evt) {
				evt.returnValue = confirm_message;
			}
			return confirm_message;
		}
	};

	nexacro._syshandler_onclose = function (_sysEvent) {
		_sysEvent._stopDetectWindowMove();

		var win = nexacro._findWindow(_sysEvent._cur_win);
		if (win) {
			var _cur_win = _sysEvent._cur_win;
			_sysEvent._stopDocEventHandler();
			_sysEvent.clearAll();

			var ret = false;
			if (win._on_sys_close) {
				if (win._is_main && _application) {
					_application.on_fire_onexit();
				}

				ret = win._on_sys_close();
			}
			_cur_win.__destroyGC();

			nexacro._finalizeHTMLSysTimerManager(_cur_win);
			nexacro._finalizeHTMLSysEvent(_cur_win);
			nexacro._finalizeGlobalObjects(_cur_win);


			return ret;
		}
		return false;
	};

	nexacro._syshandler_onresize = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		var ret = false;
		if (win) {
			var w = nexacro._getWindowHandleClientWidth(win.handle);
			var h = nexacro._getWindowHandleClientHeight(win.handle);

			if (w != win.clientWidth || h != win.clientHeight) {
				var layoutmanger = nexacro._getLayoutManager();
				var last_focused_elem = win._last_focused_elem;

				var is_active = win._is_active_window;
				var is_web_elem = win._doc ? nexacro._isWebTypeElement(win._doc.activeElement._linked_element) : false;

				if (layoutmanger && (is_active || is_web_elem)) {
					var addressbar_height = 100;
					var is_keypad_switch = false;
					var do_scrollintoview = true;
					var is_input_focused = last_focused_elem && last_focused_elem.isInputElement() ? true : false;
					if (nexacro._OS == "Android" || nexacro._AndroidDesktopMode == true) {
						is_keypad_switch = (is_input_focused || is_web_elem) && (w == win.clientWidth && h < win.clientHeight - addressbar_height);

						layoutmanger._cancelChangeLayout = is_keypad_switch ? true : undefined;

						if (is_keypad_switch) {
							if (nexacro._BrowserExtra == "SamsungBrowser") {
								if (win._previous_client_height && (win._previous_client_height <= h || win._previous_client_height - h < addressbar_height)) {
									do_scrollintoview = false;
								}
							}
							if (last_focused_elem instanceof nexacro.TextAreaElement) {
								if (win.clientHeight < last_focused_elem.height) {
									do_scrollintoview = false;
								}
							}

							if (do_scrollintoview) {
								var handle = last_focused_elem.handle;
								if (handle) {
									nexacro._requestAnimationFrame(win, function () {
										nexacro.__setDOMNode_ScrollintoView(handle, false);
									});
								}
							}
						}
					}
					else if (nexacro._OS == "iOS") {
						if (nexacro._Browser == "MobileSafari") {
							if (nexacro._SystemType == "ipad" && (parseFloat(nexacro._OSVersion) >= 13) || nexacro._MobileDesktopMode) {
								var is_touchend_reason = nexacro._getLastEventName() == "touchend" ? true : false;

								if (is_input_focused || is_web_elem || is_touchend_reason) {
									nexacro._setLastEventName("");

									if (w == win.clientWidth) {
										if (h < win.clientHeight) {
											is_keypad_switch = true;
										}
										else if (h != win.clientHeight && win._previous_client_height == win.clientHeight) {
											is_keypad_switch = true;
										}
									}
								}
							}
							else {
								is_keypad_switch = (is_input_focused || is_web_elem) && (w == win.clientWidth && h < win.clientHeight - addressbar_height);
							}

							layoutmanger._cancelChangeLayout = is_keypad_switch ? true : undefined;
						}
					}

					if (is_keypad_switch) {
						win._previous_client_height = h;
						return false;
					}
				}

				_sysEvent._cur_win.__clearGC();
				ret = win._on_sys_resize(w, h);

				if (nexacro._OS == "iOS" && parseFloat(nexacro._OSVersion) >= 8) {
					if (window.innerWidth == nexacro._getWindowHandleClientWidth(win.handle) && 
						window.innerHeight == nexacro._getWindowHandleClientHeight(win.handle)) {
						document.body.scrollLeft = 0;
					}
				}
			}

			win._previous_client_height = h;
		}

		return ret;
	};

	nexacro._syshandler_onmove = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		if (win) {
			var x = nexacro._getWindowHandlePosX(win.handle);
			var y = nexacro._getWindowHandlePosY(win.handle);

			if (x != win.left || y != win.top) {
				return win._on_sys_move(x, y);
			}
		}
		return false;
	};

	nexacro._syshandler_onload = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._cur_win);
		if (win) {
			var _cur_win = _sysEvent._cur_win;

			var ret = false;
			if (win._on_sys_load) {
				ret = win._on_sys_load(_cur_win);
			}
			_cur_win.__destroyGC();
			return ret;
		}
		return false;
	};

	nexacro._syshandler_oncontextmenu = function (_sysEvent, node, evt) {
		var ret = true;
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (win && elem) {
			ret = win._on_sys_contextmenu(elem);
			if (!ret || (win.frame._is_popup_frame && node.tagName != "INPUT" && node.tagName != "IMG")) {
				ret = nexacro._stopSysEvent(evt);
			}
			else {
				ret = true;
			}
		}
		return ret;
	};

	nexacro._syshandler_ondragstart = function (_sysEvent, node, evt) {
		return nexacro._stopSysEvent(evt);
	};

	nexacro._syshandler_ondragenter = function (_sysEvent, node, fromnode, evt) {
		var ret = true;
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		var from_elem = nexacro.__findParentElement(fromnode);
		if (win && elem) {
			var end_elem = from_elem ? win._findCommonParentElement(elem, from_elem) : win._findRootElement();
			if (!end_elem && !(end_elem = win._findPopupElement(elem))) {
				end_elem = win._findRootElement();
			}

			for (var fire_elem = []; elem && elem != end_elem; elem = elem.parent_elem) {
				if (elem.linkedcontrol) {
					fire_elem.push(elem);
				}
			}

			var filelist = evt.dataTransfer ? evt.dataTransfer.files : null;
			for (var i = fire_elem.length - 1; i >= 0; i--) {
				ret = win._on_sys_dragenter(fire_elem[i], from_elem, evt.button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, filelist, evt.metaKey);
			}
		}
		return ret;
	};

	nexacro._syshandler_ondragleave = function (_sysEvent, node, tonode, evt) {
		var ret = true;
		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		var to_elem = nexacro.__findParentElement(tonode);
		if (win && elem) {
			var end_elem = to_elem ? win._findCommonParentElement(elem, to_elem) : win._findRootElement();
			if (!end_elem && !(end_elem = win._findPopupElement(elem))) {
				end_elem = win._findRootElement();
			}

			var filelist = evt.dataTransfer ? evt.dataTransfer.files : null;
			for (; elem && elem != end_elem; elem = elem.parent_elem) {
				if (elem.linkedcontrol) {
					ret = win._on_sys_dragleave(elem, to_elem, evt.button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, filelist, evt.metaKey);
				}
			}
		}

		return ret;
	};

	nexacro._syshandler_ondragover = function (_sysEvent, node, evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (win && elem) {
			var filelist = evt.dataTransfer ? evt.dataTransfer.files : null;
			return win._on_sys_dragover(elem, evt.button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, filelist, evt.metaKey);
		}
		return true;
	};

	nexacro._syshandler_ondrop = function (_sysEvent, node, evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (win && elem) {
			var filelist = evt.dataTransfer ? evt.dataTransfer.files : null;
			return win._on_sys_drop(elem, evt.button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY, evt.offsetX, evt.offsetY, filelist, evt.metaKey);
		}
		return true;
	};

	nexacro._syshandler_onorientationchange = function (_sysEvent) {
		var win = nexacro._findWindow(_sysEvent._win_win);
		if (win) {
			win._on_sys_orientationchange(nexacro._getMobileOrientation());
		}
	};

	nexacro._syshandler_onselectstart = function (_sysEvent, node, evt) {
		if (node && ((node.tagName == "INPUT" && (node.type == "text" || node.type == "password")) || 
			node.tagName == "TEXTAREA")) {
			return true;
		}
		return nexacro._stopSysEvent(evt);
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
		nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\" xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>\n"
			 + "<head>\n"
			 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
			 + "<style>\n"
			 + "v\\:shape{behavior:url(#default#VML);}\n"
			 + "v\\:fill{behavior:url(#default#VML);}\n"
			 + "v\\:path{behavior:url(#default#VML);}\n"
			 + "v\\:line{behavior:url(#default#VML);}\n"
			 + "v\\:textpath{behavior:url(#default#VML);}\n"
			 + "o\\:opacity2{behavior:url(#default#VML);}\n"
			 + "</style>\n"
			 + "</head>\n"
			 + "<body style='margin:0;border:none;background:transparent;'>\n"
			 + "<script type='text/javascript'>\n"
			 + "var nexacro;"
			 + "if (window.dialogArguments) nexacro = window.dialogArguments.nexacro;\n"
			 + "if (!nexacro) nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro && window.opener) nexacro = window.opener.nexacro;"
			 + "nexacro_HTMLSysEvent={};\n"
			 + "nexacro._initHTMLSysEvent(window, document);"
			 + "nexacro._preparePopupManagerFrame(window);"
			 + 'function _inputDOM_nodeClick(_input){ _input.click();}'
			 + "</script>\n"
			 + "</body>\n"
			 + "</html>";
	}
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9) {
		nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
			 + "<head>\n"
			 + "</head>\n"
			 + "<body style='margin:0;border:none;'>\n"
			 + "<script type='text/javascript'>\n"
			 + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
			 + "nexacro_HTMLSysEvent={};\n"
			 + "nexacro._initHTMLSysEvent(window, document);"
			 + "nexacro._preparePopupManagerFrame(window);"
			 + 'function _inputDOM_nodeClick(_input){ _input.click();}'
			 + "</script>\n"
			 + "</body>\n"
			 + "</html>";
	}
	else if (nexacro._isTouchInteraction) {
		nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
			 + "<head>\n"
			 + "<style>\n"
			 + "div {\n"
			 + "-moz-user-select:none;\n"
			 + "-webkit-user-select:none;\n"
			 + "-webkit-touch-callout:none;\n"
			 + "-webkit-appearance:none;\n"
			 + "-webkit-tap-highlight-color:rgba(0,0,0,0);\n"
			 + "outline: none;\n"
			 + "}\n"
			 + "</style>\n"
			 + "</head>\n"
			 + "<body style='margin:0;border:none;'>\n"
			 + "<script type='text/javascript'>\n"
			 + "nexacro = parent.nexacro;"
			 + "window.nexacro_HTMLSysEvent={};\n"
			 + "nexacro._initHTMLSysEvent(window, document);"
			 + "</script>\n"
			 + "</body>\n"
			 + "</html>";
	}
	else {
		nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
			 + "<head>\n"
			 + "<style>\n"
			 + "div {\n"
			 + "outline: none;\n"
			 + "}\n"
			 + "</style>\n"
			 + "</head>\n"
			 + "<body style='margin:0;border:none;'>\n"
			 + "<script type='text/javascript'>\n"
			 + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
			 + "window.nexacro_HTMLSysEvent={};\n"
			 + "nexacro._initHTMLSysEvent(window, document);"
			 + "nexacro._preparePopupManagerFrame(window);"
			 + "</script>\n"
			 + "</body>\n"
			 + "</html>";
	}



	nexacro._createWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, taskbar, is_main) {
		var _win_handle = null;
		if (is_main == true) {
			_win_handle = nexacro._getMainWindowHandle();
			nexacro._mainwindow_handle = _win_handle;
		}
		else {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win.dest_handle;
			}
			_win_handle = nexacro.__createWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, taskbar);

			if (!_win_handle) {
				return;
			}
		}

		if (nexacro._allow_default_pinchzoom) {
			nexacro._applyDesktopScreenWidth();
		}
		else if (nexacro._Browser == "MobileSafari") {
			nexacro.__setDOMStyle_Fixed(document.documentElement.style);
		}


		nexacro.__setViewportScale();
		nexacro.__insertInputtypeDateCSSStyle();

		_win_handle._linked_window = target_win;
		target_win.attachHandle(_win_handle);
		if (!is_main) {
			setTimeout(function () {
				nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload');
			}, 10);
		}
	};

	nexacro._setLinkedWindow = function (handle, target_win) {
		handle._linked_window = target_win;
	};

	nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main, parentframe, frameopener, arr_arg, ext_openstyles) {
		var parent_handle = null;
		if (parent_win) {
			parent_handle = parent_win.dest_handle;
		}
		return nexacro.__createOpenWindowHandle(parent_handle, name, formurl, left, top, width, height, resizable, layered, taskbar, parent_win, parentframe, frameopener, arr_arg, ext_openstyles);
	};



	nexacro._setLocalStorageforService = function (prefixid, url, cachelevel) {
		var servicedata = nexacro._getLocalStorage("service", 2);
		if (servicedata) {
			servicedata = JSON.parse(servicedata);
		}
		else {
			servicedata = {
			};
		}

		if (!servicedata.prefixid) {
			servicedata[prefixid] = {
			};
		}

		servicedata[prefixid].url = url;
		servicedata[prefixid].cachelevel = cachelevel;

		var servicestr = JSON.stringify(servicedata);
		nexacro._setLocalStorage("service", servicestr, 2);
	};

	nexacro._getLocalStorageforService = function () {
		var env = nexacro.getEnvironment();
		var servicelist = nexacro._getLocalStorage("service", 2);
		if (servicelist) {
			var servicedata = JSON.parse(servicelist);
			for (var prefix in servicedata) {
				var serviceitem = servicedata[prefix];
				if (serviceitem) {
					var envservice = env.services[prefix];
					if (envservice) {
						if (serviceitem.url != envservice.url) {
							envservice.url = serviceitem.url;
						}
						if (serviceitem.cachelevel) {
							envservice.set_cachelevel(serviceitem.cachelevel);
						}
					}
				}
			}
		}
	};

	nexacro._setLocalStorageforOpen = function (id, parentwin, parentframe, frameopener, arrarg) {
		if (nexacro._cssurls) {
			nexacro._setLocalStorage("cssurls", nexacro._cssurls, 2);
		}

		if (nexacro._popupframeoption[id]) {
			var value = JSON.stringify(nexacro._popupframeoption[id]);
			var key = "popupframeoption" + id;
			nexacro._setLocalStorage(key, value, 2);
			if (!parentwin) {
				parentwin = window;
			}

			{

				if (!parentwin._nexacro_popupframeoption) {
					parentwin._nexacro_popupframeoption = {
					};
				}

				var _popup_opt = parentwin._nexacro_popupframeoption[key] = {
				};

				_popup_opt._popupparentframe = parentframe;
				_popup_opt._popupframeopener = frameopener;
				_popup_opt._popuparrarg = arrarg;
			}
		}
	};

	nexacro.__createOpenWindowHandle = function (_handleParent, name, formurl, left, top, width, height, resizable, layered, taskbar, parentwin, parentframe, frameopener, arr_arg, ext_openstyles) {
		if (left == null) {
			left = Math.floor((screen.availWidth - width) / 2);
		}

		if (top == null) {
			top = Math.floor((screen.availHeight - height) / 2);
		}

		var dochandle = _handleParent ? _handleParent.ownerDocument : null;
		var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : null;
		if (!_parent_win) {
			var _window = nexacro._findWindow(nexacro._getMainWindowHandle());
			_parent_win = _window ? _window.handle : window;
		}
		var _win_handle;


		var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
			 + "directories=no,scrollbars=no,"
			 + "resizable=" + (resizable ? "yes" : "no");

		opt += "," + ext_openstyles;

		var popupurl = "./popup.html";

		if (formurl) {
			popupurl += "?formname=" + encodeURIComponent(formurl);
			popupurl += "&framename=" + name;
			popupurl += "&loadtime=" + nexacro._uniquestoragevalue;
		}

		nexacro._setLocalStorageforOpen(name, _parent_win, parentframe, frameopener, arr_arg);

		var url = nexacro._transfullurl(nexacro._project_absolutepath, popupurl);
		_win_handle = _parent_win.open(url, name, opt);

		if (!_win_handle) {
			return null;
		}

		nexacro.__createOpenWindowHandleAfter(_win_handle);

		return _win_handle;
	};

	if (nexacro._OS == "iOS") {
		nexacro.__createOpenWindowHandleAfter = function (_win) {
			if (!_win) {
				return;
			}

			var callback_load = function () {
				var timeout = 5000;
				var open_doc = _win.document;
				var open_frame = _win._linked_window;

				if (open_doc && open_frame && open_frame._is_active_window !== true) {
					var start_time = new Date().getTime();
					var start_node = open_doc.all.length;

					var timer_id = setInterval(function () {
						var end_time = new Date().getTime();
						var end_node = open_doc.all.length;
						if (start_node != end_node) {
							clearInterval(timer_id);
							open_frame._on_sys_activate();
							open_frame.setFocus();
						}
						else {
							if ((end_time - start_time) > timeout) {
								clearInterval(timer_id);
							}
						}
					}, 100);
				}
			};
			_win.addEventListener("load", callback_load);
		};
	}
	else {
		nexacro.__createOpenWindowHandleAfter = nexacro._emptyFn;
	}


	nexacro.__createWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, layered, taskbar) {
		if (left == null) {
			left = Math.floor((screen.availWidth - width) / 2);
		}

		if (top == null) {
			top = Math.floor((screen.availHeight - height) / 2);
		}

		var dochandle = _handleParent ? _handleParent.ownerDocument : null;
		var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
		var _win_handle, opt;

		{

			opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
				 + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
				 + "resizable=" + (resizable ? "yes" : "no");
			_win_handle = _parent_win.open("", name, opt);
		}

		if (!_win_handle) {
			return null;
		}

		_win_handle.nexacro = _parent_win.nexacro;
		_win_handle.system = _parent_win.system;
		_win_handle._application = _parent_win._application;

		_win_handle._linked_window = target_win;

		_win_handle.document.open();


		_win_handle.document.write(nexacro._doc_init_html);
		_win_handle.document.close();

		return _win_handle;
	};

	nexacro._createModalWindowHandle = function () {
	};

	nexacro._createModalAsyncWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, lockmode) {
		var parent_handle = null;
		if (parent_win) {
			parent_handle = parent_win.dest_handle;
		}
		var _win_handle = nexacro.__createModalAsyncWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, lockmode);

		if (!_win_handle) {
			return;
		}

		_win_handle.document.body.style.overflow = "visible";
		_win_handle._linked_window = target_win;


		target_win.attachHandle(_win_handle);
		setTimeout(function () {
			nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload');
		}, 10);
	};

	nexacro.__createModalAsyncWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, layered, lockmode) {
		if (left == null) {
			left = Math.floor((screen.availWidth - width) / 2);
		}
		if (top == null) {
			top = Math.floor((screen.availHeight - height) / 2);
		}

		var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
			 + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
			 + "resizable=" + (resizable ? "yes" : "no");

		var dochandle = _handleParent ? _handleParent.ownerDocument : null;
		var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
		var _win_handle = _parent_win.open("", name, opt);

		if (!_win_handle) {
			return null;
		}


		if (_parent_win) {
			_win_handle.nexacro = _parent_win.nexacro;
			_win_handle.system = _parent_win.system;
			_win_handle._application = _parent_win._application;
		}

		_win_handle._linked_window = target_win;

		_win_handle.document.open();
		_win_handle.document.write(nexacro._doc_init_html);
		_win_handle.document.close();

		return _win_handle;
	};

	nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame) {
		if (frame._window_type != 3) {
			return;
		}

		var main_handle = nexacro._getMainWindowHandle();

		var timer_handle = main_handle.setInterval(function () {
			if (_win_handle && _win_handle.closed) {
				frame._runCallback();

				nexacro._removeModalAsyncCallbackHandler(frame);
			}
		}, 100);

		if (!nexacro._closedmodalasync_list) {
			nexacro._closedmodalasync_list = [];
		}

		nexacro._closedmodalasync_list.push([frame, timer_handle]);
	};

	nexacro._removeModalAsyncCallbackHandler = function (frame) {
		if (!nexacro._closedmodalasync_list) {
			return;
		}

		var list = nexacro._closedmodalasync_list;
		var list_length = list.length;
		for (var i = 0; i < list_length; i++) {
			var list_item = list[i];
			if (list_item[0] == frame) {
				var main_handle = nexacro._getMainWindowHandle();
				main_handle.clearInterval(list_item[1]);

				for (var j = i; j < list_length - 1; j++) {
					list[j] = list[j + 1];
				}
				list.pop();
				break;
			}
		}
	};

	nexacro._isWindowHandlePrepared = function (_win_handle) {
		return (_win_handle.document.body !== null);
	};

	nexacro._closeWindowHandle = function (_win_handle) {
		if (_win_handle) {
			if (nexacro._getMainWindowHandle() != _win_handle) {
				_win_handle.open('', '_self');
				_win_handle.close();
			}
		}
	};

	nexacro._refreshWindow = nexacro._emptyFn;

	nexacro._getMainWindowHandle = function () {
		if (nexacro._mainwindow_handle) {
			return nexacro._mainwindow_handle;
		}
		else {
			if (window._popup === true) {
				return window.opener || window.parent;
			}
			return window;
		}
	};

	nexacro._getWindowHandle = function (_win_handle) {
		var link_window = _win_handle._linked_window;
		if (link_window && link_window._is_main) {
			return _win_handle;
		}
		return window;
	};

	nexacro._getWindowDocumentHandle = function (_win_handle) {
		return _win_handle.document;
	};

	nexacro._getWindowDestinationHandle = function (_win_handle) {
		return _win_handle.document.body;
	};

	nexacro._getWindowHwndHandle = nexacro._emptyFn;

	if (nexacro._Browser == "Gecko") {
		nexacro._getWindowHandlePosX = function (_win_handle) {
			return _win_handle.mozInnerScreenX;
		};
		nexacro._getWindowHandlePosY = function (_win_handle) {
			return _win_handle.mozInnerScreenY;
		};
	}
	else if (nexacro._Browser == "IE") {
		nexacro._getWindowHandlePosX = function (_win_handle) {
			return _win_handle.screenLeft;
		};
		nexacro._getWindowHandlePosY = function (_win_handle) {
			return _win_handle.screenTop;
		};
	}
	else {
		nexacro._getWindowHandlePosX = function () {
			return nexacro._gap_client_width;
		};
		nexacro._getWindowHandlePosY = function () {
			return nexacro._gap_client_height;
		};
	}

	if ((nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) || (nexacro._OS == "iOS" && parseFloat(nexacro._OSVersion) >= 8)) {
		nexacro._getWindowHandleOuterWidth = function (_win_handle) {
			return _win_handle.document.documentElement.offsetWidth;
		};
		nexacro._getWindowHandleOuterHeight = function (_win_handle) {
			return _win_handle.document.documentElement.offsetHeight;
		};
	}
	else {
		nexacro._getWindowHandleOuterWidth = function (_win_handle) {
			return _win_handle.outerWidth;
		};
		nexacro._getWindowHandleOuterHeight = function (_win_handle) {
			return _win_handle.outerHeight;
		};
	}


	if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 8) {
		nexacro._getWindowHandleClientWidth = function (_win_handle) {
			return _win_handle.document.documentElement.clientWidth;
		};
		nexacro._getWindowHandleClientHeight = function (_win_handle) {
			return _win_handle.document.documentElement.clientHeight;
		};
	}
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8) {
		nexacro._getWindowHandleClientWidth = function (_win_handle) {
			return _win_handle.document.documentElement.offsetWidth;
		};
		nexacro._getWindowHandleClientHeight = function (_win_handle) {
			return _win_handle.document.documentElement.offsetHeight;
		};
	}
	else if (nexacro._Browser == "IE") {
		nexacro._getWindowHandleClientWidth = function (_win_handle) {
			return _win_handle.innerWidth;
		};
		nexacro._getWindowHandleClientHeight = function (_win_handle) {
			return _win_handle.innerHeight;
		};
	}
	else if (nexacro._OS == "iOS" && (nexacro._Browser == "MobileSafari" || nexacro._Browser == "Chrome")) {
		if (nexacro._BrowserVersion > 11.2 || nexacro._MobileDesktopMode) {
			nexacro._getWindowHandleClientHeight = function (_win_handle) {
				return _win_handle.document.documentElement.clientHeight;
			};

			nexacro._getWindowHandleClientWidth = function (_win_handle) {
				return _win_handle.document.documentElement.clientWidth;
			};
		}
		else {
			nexacro._getWindowHandleClientHeight = function (_win_handle) {
				var _tester = nexacro._device_exception_tester;
				var clientheight = _win_handle.document.documentElement.clientHeight;
				var innerheight = _win_handle.innerHeight;
				if (nexacro._SystemType == "ipad" && nexacro._isHybrid()) {
					return clientheight;
				}
				else if (!nexacro._isHybrid() && (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize))) {
					return clientheight;
				}
				else {
					return innerheight;
				}
			};

			nexacro._getWindowHandleClientWidth = function (_win_handle) {
				var _tester = nexacro._device_exception_tester;
				var clientwidth = _win_handle.document.documentElement.clientWidth;
				var innerwidth = _win_handle.innerWidth;
				if (nexacro._SystemType == "ipad" && nexacro._isHybrid()) {
					return clientwidth;
				}
				else if (!nexacro._isHybrid() && (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize))) {
					return clientwidth;
				}
				else {
					return innerwidth;
				}
			};
		}
	}
	else if (nexacro._BrowserExtra == "SamsungBrowser") {
		nexacro._getWindowHandleClientWidth = function (_win_handle) {
			var _tester = nexacro._searchDeviceExceptionTable();
			var clientwidth = _win_handle.document.body.clientWidth;
			var innerwidth = _win_handle.innerWidth;
			if (nexacro._allow_default_pinchzoom) {
				var clientWidth = _win_handle.document.body.clientWidth;
				return clientWidth;
			}
			else if ((_tester && _tester.use_windowsize_as_bodysize)) {
				return clientwidth;
			}
			else {
				return innerwidth;
			}
		};
		nexacro._getWindowHandleClientHeight = function (_win_handle) {
			var _tester = nexacro._searchDeviceExceptionTable();
			var clientheight = _win_handle.document.body.clientHeight;
			var innerheight = _win_handle.innerHeight;
			if (nexacro._allow_default_pinchzoom) {
				var clientHeight = _win_handle.document.body.clientHeight;
				return clientHeight;
			}
			else if ((_tester && _tester.use_windowsize_as_bodysize)) {
				return clientheight;
			}
			else {
				return innerheight;
			}
		};
	}

	else {
		nexacro._getWindowHandleClientWidth = function (_win_handle) {
			var _tester = nexacro._device_exception_tester;
			if (nexacro._allow_default_pinchzoom) {
				var clientWidth = _win_handle.document.body.clientWidth;
				var innerWidth = _win_handle.innerWidth;
				return clientWidth > innerWidth ? clientWidth : innerWidth;
			}
			else if (_tester && _tester.use_windowsize_as_bodysize) {
				return _win_handle.document.body.clientWidth;
			}
			else {
				return _win_handle.innerWidth;
			}
		};
		nexacro._getWindowHandleClientHeight = function (_win_handle) {
			var _tester = nexacro._device_exception_tester;
			if (nexacro._allow_default_pinchzoom) {
				var clientHeight = _win_handle.document.body.clientHeight;
				var innerHeight = _win_handle.innerHeight;
				return clientHeight > innerHeight ? clientHeight : innerHeight;
			}
			else if (_tester && _tester.use_windowsize_as_bodysize) {
				return _win_handle.document.body.clientHeight;
			}
			else {
				return _win_handle.innerHeight;
			}
		};
	}

	nexacro._setWindowHandleArea = function (_win_handle, x, y, w, h) {
		_win_handle.moveTo(x, y);
		_win_handle.resizeTo(w, h);
	};
	nexacro._setWindowHandlePos = function (_win_handle, x, y) {
		_win_handle.moveTo(x, y);
	};
	nexacro._setWindowHandleSize = function (_win_handle, w, h) {
		_win_handle.resizeTo(w, h);
	};

	nexacro._setWindowHandleZIndex = function (_win_handle, zindex) {
		if (_win_handle.style) {
			_win_handle.style.zIndex = zindex;
		}
	};

	nexacro._findWindow = function (_win_handle) {
		return _win_handle._linked_window;
	};
	nexacro._findDocumentWindow = function (_doc) {
		var _win_handle = (_doc.defaultView || _doc.parentWindow);
		return _win_handle._linked_window;
	};

	nexacro._flashWindow = function () {
	};

	nexacro._setMouseHovertime = function () {
	};

	nexacro._setWindowHandleText = function (_win_handle, titletext) {
		var doc = _win_handle.document;

		if (doc) {
			return doc.title = titletext;
		}
	};

	nexacro._setWindowHandleStatusText = function (_win_handle, statustext) {
		if (window) {
			return window.status = statustext;
		}
	};

	nexacro._setWindowHandleIconObject = nexacro._emptyFn;

	if (!nexacro._isTouchInteraction) {
		nexacro._getMainWindowWidth = function (_win) {
			return _win.clientWidth;
		};
		nexacro._getMainWindowHeight = function (_win) {
			return _win.clientHeight;
		};
	}
	else {
		nexacro._getMainWindowWidth = function (_win) {
			var client_width = nexacro._getWindowHandleClientWidth(_win.handle);
			if (client_width !== 0) {
				return client_width;
			}

			var doc = _win._doc;
			if (doc) {
				var doc_elem = doc.documentElement;
				var width = 0;
				if (nexacro._OS == "iOS") {
					if (doc_elem.clientWidth) {
						width = doc_elem.clientWidth;
					}
					else if (_win.innerWidth) {
						width = doc.body.clientWidth;
					}
					else if (doc.body.clientWidth > 0) {
						width = _win.innerWidth;
					}
				}
				else {
					var w1 = _win.innerWidth ? _win.innerWidth : 0;
					var w2;
					var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;

					if (doc_elem && doc_elem.clientWidth) {
						w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
					}

					if (w1 < w2) {
						if (w2 < w3) {
							width = doc.body.clientWidth;
						}
						else {
							width = doc_elem.clientWidth;
						}
					}
					else {
						if (w1 < w3) {
							width = doc.body.clientWidth;
						}
						else {
							width = _win.innerWidth;
						}
					}
				}


				return width;
			}
			return _win.clientWidth;
		};

		nexacro._getMainWindowHeight = function (_win) {
			var client_height = nexacro._getWindowHandleClientHeight(_win.handle);
			if (client_height !== 0) {
				return client_height;
			}

			var doc = _win._doc;
			if (doc) {
				var doc_elem = doc.documentElement;
				var height = 0;
				if (nexacro._OS == "iOS") {
					if (doc_elem.clientHeight) {
						height = doc_elem.clientHeight;
					}
					else if (_win.innerHeight) {
						height = doc.body.clientHeight;
					}
					else if (doc.body.clientHeight > 0) {
						height = _win.innerHeight;
					}
				}
				else {
					var w1 = _win.innerWidth ? _win.innerWidth : 0;
					var w2;
					var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;

					if (doc_elem && doc_elem.clientWidth) {
						w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
					}

					if (w1 < w2) {
						if (w2 < w3) {
							height = doc.body.clientHeight;
						}
						else {
							height = doc_elem.clientHeight;
						}
					}
					else {
						if (w1 < w3) {
							height = doc.body.clientHeight;
						}
						else {
							height = _win.innerHeight;
						}
					}
				}
				return height;
			}
			return _win.clientHeight;
		};
	}


	nexacro._hasCookieVariables = function () {
		var cookieVariables4 = nexacro._getCookieVariables(4);
		if (cookieVariables4 && Object.keys(cookieVariables4).length > 0) {
			return true;
		}
		var cookieVariables6 = nexacro._getCookieVariables(6);
		if (cookieVariables6 && Object.keys(cookieVariables6).length > 0) {
			return true;
		}
		return false;
	};




	nexacro._getLocalStorageKey = function (type, global) {
		if (!nexacro._uniquestoragevalue) {
			nexacro._uniquestoragevalue = new Date().getTime();
		}

		var localstoragekey = "";
		var projectpath = nexacro._project_absolutepath ? nexacro._project_absolutepath : nexacro._getProjectBaseURL();
		if (global) {
			localstoragekey = window.location.href;
		}
		else {
			var env = nexacro.getEnvironment();
			if (type < 3) {
				localstoragekey = env.key + projectpath;
			}
			else {
				localstoragekey = nexacro._uniquestoragevalue + env.key + projectpath;
			}
		}

		switch (type) {
			case 1:
				return localstoragekey + "user";
			case 2:
				return nexacro._uniquestoragevalue + projectpath + "engine";
			case 3:
				return localstoragekey + "envvar";
			case 4:
				return localstoragekey + "envcookie";
			case 5:
				return localstoragekey + "envhttp";
			case 6:
				return localstoragekey + "envsecurecookie";
		}
	};


	if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 6) {
		nexacro._setLocalStorage = nexacro._emptyFn;
		nexacro._getLocalStorage = nexacro._emptyFn;
		nexacro._removeLocalStorage = nexacro._emptyFn;
		nexacro._hasLocalStorage = nexacro._emptyFn;
		nexacro._clearLocalStorage = nexacro._emptyFn;
		nexacro._initLocalStorage = nexacro._emptyFn;
	}
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 7) {
		nexacro._setLocalStorage = function (key, varValue, type, global) {
			var localstoragekey = nexacro._getLocalStorageKey(type, global);

			var iframenode = nexacro._managerFrameNode;
			if (iframenode) {
				var value;
				var vartype = (typeof varValue);
				if (vartype == "object") {
					if (varValue instanceof nexacro.Date) {
						vartype = "nexacrodate";
					}
					else if (varValue instanceof Date) {
						vartype = "date";
					}
					else if (varValue instanceof nexacro.Decimal) {
						vartype = "decimal";
					}
				}
				value = vartype + ":" + varValue;

				iframenode.setAttribute(key, value);
				iframenode.save(localstoragekey);
				return true;
			}
			return false;
		};

		nexacro._getLocalStorageAll = function (type) {
			var localstoragekey = nexacro._getLocalStorageKey(type, false);

			var iframenode = nexacro._managerFrameNode;
			if (iframenode) {
				iframenode.load(localstoragekey);
			}
		};


		nexacro._getLocalStorage = function (key, type, global) {
			var localstoragekey = nexacro._getLocalStorageKey(type, global);

			var iframenode = nexacro._managerFrameNode;
			if (iframenode) {
				iframenode.load(localstoragekey);
				var attribute = iframenode.getAttribute(key);
				if (attribute) {
					var index = attribute.indexOf(":");
					var vartype = attribute.substring(0, index);
					var value = attribute.substring(index + 1);

					if (vartype && value) {
						if (vartype == "number") {
							return Number(value);
						}
						else if (vartype == "boolean") {
							return (value == "true") ? true : false;
						}
						else if (vartype == "nexacrodate") {
							var year = value.substring(0, 4);
							var month = value.substring(4, 6);
							var date = value.substring(6, 8);
							var hour = value.substring(8, 10);
							var minute = value.substring(10, 12);
							var second = value.substring(12, 14);
							var millisecond = value.substring(14, 16);
							return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
						}
						else if (vartype == "date") {
							return new Date(value);
						}
						else if (vartype == "decimal") {
							return new nexacro.Decimal(value);
						}
						else if (vartype == "undefined") {
							return "undefined";
						}
						return value;
					}
				}
			}
		};

		nexacro._hasLocalStorage = function (key, type, global) {
			var localstoragekey = nexacro._getLocalStorageKey(type, global);

			var iframenode = nexacro._managerFrameNode;
			if (iframenode) {
				iframenode.load(localstoragekey);
				var attribute = iframenode.getAttribute(key);
				if (attribute) {
					return true;
				}
			}
			return false;
		};

		nexacro._removeLocalStorage = function (key, type, global) {
			var localstoragekey = nexacro._getLocalStorageKey(type, global);

			var iframenode = nexacro._managerFrameNode;
			if (iframenode) {
				iframenode.load(localstoragekey);
				var attribute = iframenode.getAttribute(key);
				if (attribute) {
					iframenode.removeAttribute(key);
				}

				iframenode.save(localstoragekey);
				return true;
			}
			return false;
		};

		nexacro._clearLocalStorage = function () {
		};

		nexacro._initLocalStorage = nexacro._emptyFn;
	}
	else {
		nexacro._getLocalStorageObject = function () {
			if (nexacro._isLocalStorageSupport()) {
				return window.localStorage;
			}
			else {
				if (!nexacro._enginevar) {
					nexacro._enginevar = new nexacro.Collection();
					nexacro._enginevar.removeItem = function (key) {
						return this.remove_item(key);
					};
				}

				return nexacro._enginevar;
			}
		};
		nexacro._setLocalStorage = function (key, varValue, type, global) {
			var localstorage = nexacro._getLocalStorageObject();
			if (localstorage) {
				var localstoragekey = nexacro._getLocalStorageKey(type, global);

				if (localstoragekey) {
					var localstoragedata = localstorage.getItem(localstoragekey);
					var jsondata = {
					};
					if (localstoragedata) {
						jsondata = JSON.parse(localstoragedata);
					}

					var vartype, findkey = jsondata[key];
					if (findkey) {
						vartype = (typeof varValue);
						if (vartype == "object") {
							if (varValue instanceof nexacro.Date) {
								vartype = "nexacrodate";
							}
							else if (varValue instanceof Date) {
								vartype = "date";
							}
						}
						if (findkey.type == vartype && findkey.value == varValue) {
							return true;
						}

						findkey.type = vartype;
						findkey.value = varValue + "";
					}
					else {
						vartype = (typeof varValue);
						if (vartype == "object") {
							if (varValue instanceof nexacro.Date) {
								vartype = "nexacrodate";
							}
							else if (varValue instanceof Date) {
								vartype = "date";
							}
							else if (varValue instanceof nexacro.Decimal) {
								vartype = "decimal";
							}
						}

						jsondata[key] = {
							"type" : vartype, 
							"value" : varValue + ""
						};
					}

					if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
						nexacro._setPreferencesValue(localstoragekey, JSON.stringify(jsondata));
					}

					localstorage.setItem(localstoragekey, JSON.stringify(jsondata));

					return true;
				}
			}
			return false;
		};

		nexacro._getLocalStorageAll = function (type) {
			var localstorage = nexacro._getLocalStorageObject();
			if (localstorage) {
				var localstoragekey = nexacro._getLocalStorageKey(type, false);

				if (localstoragekey) {
					var localstoragedata = localstorage.getItem(localstoragekey);
					if (localstoragedata) {
						return JSON.parse(localstoragedata);
					}
				}
			}
		};

		nexacro._getLocalStorage = function (key, type, global) {
			var localstorage = nexacro._getLocalStorageObject();
			if (localstorage) {
				var localstoragekey = nexacro._getLocalStorageKey(type, global);

				if (localstoragekey) {
					var localstoragedata = localstorage.getItem(localstoragekey);
					var jsondata = {
					};
					if (localstoragedata) {
						if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
							nexacro._setPreferencesValue(localstoragekey, localstoragedata);
						}
						jsondata = JSON.parse(localstoragedata);
					}

					var findkey = jsondata[key];
					if (findkey) {
						var vartype = findkey.type;
						var value = findkey.value;
						if (value && vartype) {
							if (vartype == "number") {
								return Number(value);
							}
							else if (vartype == "boolean") {
								return (value == "true") ? true : false;
							}
							else if (vartype == "nexacrodate") {
								var year = value.substring(0, 4);
								var month = value.substring(4, 6);
								var date = value.substring(6, 8);
								var hour = value.substring(8, 10);
								var minute = value.substring(10, 12);
								var second = value.substring(12, 14);
								var millisecond = value.substring(14, 16);
								return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
							}
							else if (vartype == "date") {
								return new Date(value);
							}
							else if (vartype == "decimal") {
								return new nexacro.Decimal(value);
							}
							else if (vartype == "undefined") {
								return "undefined";
							}
							return value;
						}
					}
				}
			}
		};

		nexacro._hasLocalStorage = function (key, type, global) {
			var localstorage = nexacro._getLocalStorageObject();
			if (localstorage) {
				var localstoragekey = nexacro._getLocalStorageKey(type, global);

				if (localstoragekey) {
					var localstoragedata = localstorage.getItem(localstoragekey);
					var jsondata = {
					};
					if (localstoragedata) {
						jsondata = JSON.parse(localstoragedata);
					}

					var findkey = jsondata[key];
					if (findkey) {
						return true;
					}
				}
			}
			return false;
		};

		nexacro._removeLocalStorage = function (key, type, global) {
			var localstorage = nexacro._getLocalStorageObject();
			if (localstorage) {
				var localstoragekey = nexacro._getLocalStorageKey(type, global);

				if (localstoragekey) {
					var localstoragedata = localstorage.getItem(localstoragekey);

					var jsondata = {
					};
					if (localstoragedata) {
						jsondata = JSON.parse(localstoragedata);
					}

					var findkey = jsondata[key];
					if (findkey) {
						delete jsondata[key];
					}
					localstorage.setItem(localstoragekey, JSON.stringify(jsondata));
				}
			}
		};

		nexacro._deleteLocalStorage = function (type, global) {
			var localstorage = nexacro._getLocalStorageObject();
			var localstoragekey = nexacro._getLocalStorageKey(type, global);
			if (localstoragekey) {
				var localstoragedata = localstorage.getItem(localstoragekey);
				if (localstoragedata) {
					localstorage.removeItem(localstoragekey);
				}
			}
		};
		nexacro._clearLocalStorage = function () {
			nexacro._deleteLocalStorage(2);
			nexacro._deleteLocalStorage(3);
			nexacro._deleteLocalStorage(4);
			nexacro._deleteLocalStorage(5);
			nexacro._deleteLocalStorage(6);
		};

		nexacro._copyLocalStorage = function (parentwin) {
			var storage = nexacro._getLocalStorageObject();
			var winkey = window.location.href;

			while (parentwin.parent != null) {
				parentwin = parentwin.parent;
			}

			var storagedata = storage.getItem(parentwin._handle.location.href);

			if (storagedata) {
				storage.setItem(winkey, storagedata);
			}
		};

		nexacro._initLocalStorage = function () {
			var storage = nexacro._getLocalStorageObject();

			if (storage && storage.length > 0) {
				var pos = -1, key, type;
				var projectpath = nexacro._project_absolutepath ? nexacro._project_absolutepath : nexacro._getProjectBaseURL();
				for (var i = 0; i < storage.length; i++) {
					key = storage.key(i);
					pos = key.indexOf(projectpath);
					if (pos >= 0) {
						type = key.substr(pos + projectpath.length);
						if (type != "user") {
							storage.removeItem(key);
							i--;
						}
					}
				}
			}
		};
	}

	if (!window.postMessage || (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)) {
		nexacro._postMessage = function (id, win, target_comp) {
			nexacro._OnceCallbackTimer.callonce(target_comp, function () {
				win._on_sys_message(id);
			}, 10);
		};
	}
	else {
		nexacro._postMessage = function (id, win) {
			if (win && win.postMessage) {
				win.postMessage(id, "*");
			}
			else {
				window.postMessage(id, "*");
			}
		};
	}

	nexacro._getGlobalValueData = function (key, url) {
		if (nexacro._globalvalue) {
			return nexacro._globalvalue;
		}

		if (window.name && key && url) {
			var globalvars = "";
			var items = window.name.split(',');
			if (items.length) {
				var fields = items[0].split(':');
				if (fields[0] == key && unescape(fields[1]) == url) {
					globalvars = items.splice(1, items.length - 1).join(',');
				}
			}
			nexacro._globalvalue = globalvars;
			return globalvars;
		}
	};

	nexacro._getSystemFont = function () {
		return new nexacro._FontObject("12pt Verdana");
	};

	nexacro._createPopupWindowHandle = function (parent_win, target_win, name, left, top, width, height) {
		var _doc = parent_win._dest_doc;
		var dest_handle;

		var parent_width = parent_win.clientWidth;
		var parent_height = parent_win.clientHeight;

		var handle = null;
		if (left == null) {
			left = Math.floor((parent_width - width) / 2);
		}
		if (top == null) {
			top = Math.floor((parent_height - height) / 2);
		}

		handle = _doc.createElement("div");
		handle.id = 'popupwindow_' + name;

		var layer_info;
		var frame;
		if (target_win.comp && target_win.comp instanceof nexacro._WaitControl) {
			layer_info = {
			};
			layer_info.popup_zindex = nexacro._zindex_waitcursor;
		}
		else if (target_win.comp) {
			layer_info = target_win._getComponentLayerInfo(target_win.comp);
		}

		if (layer_info) {
			if (layer_info.is_modal) {
				frame = layer_info.frame;
				var overlay_elem = frame._modal_overlay_elem;
				dest_handle = overlay_elem.handle;
				dest_handle.appendChild(handle);
			}
			else {
				if (layer_info.ref_first_modal_frame) {
					frame = layer_info.ref_first_modal_frame;
					var _ref_handle = frame._modal_overlay_elem.handle;
					dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
					dest_handle.insertBefore(handle, _ref_handle);
				}
				else {
					dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
					dest_handle.appendChild(handle);
				}
			}
		}
		else {
			dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
			dest_handle.appendChild(handle);
		}

		handle.dest_handle = dest_handle;
		handle._linked_window = target_win;

		var handle_style = handle.style;
		handle_style.position = "absolute";
		handle_style.overflow = "hidden";
		handle_style.margin = "0px";
		handle_style.border = "0px";

		handle_style.left = (left | 0) + "px";
		handle_style.top = (top | 0) + "px";
		handle_style.width = (width | 0) + "px";
		handle_style.height = (height | 0) + "px";

		handle_style.zIndex = layer_info ? layer_info.popup_zindex : nexacro._zindex_popup;

		target_win.attachHandle(handle);
	};
	nexacro._closePopupWindowHandle = function (handle) {
		if (handle) {
			var dest_handle = handle.dest_handle;
			if (dest_handle) {
				nexacro.__removeDOMNode(dest_handle, handle);
			}
			handle._linked_window = null;
		}
	};

	nexacro._getPopupWindowDocumentHandle = function (handle) {
		var _doc = (handle.ownerDocument || handle.document);
		return _doc;
	};

	nexacro._getPopupWindowDestinationHandle = function (handle) {
		var _doc = (handle.ownerDocument || handle.document);
		return _doc.body;
	};

	if (nexacro._Browser == "IE") {
		nexacro.__getRootWindowHandleOfPopupWindow = function (handle) {
			var _doc = (handle.ownerDocument || handle.document);
			return _doc.parentWindow;
		};
	}
	else {
		nexacro.__getRootWindowHandleOfPopupWindow = function (handle) {
			var _doc = (handle.ownerDocument || handle.document);
			return _doc.defaultView;
		};
	}

	nexacro._getPopupWindowHandlePosX = function (handle) {
		var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
		return nexacro._getWindowHandlePosX(_win_handle) + handle.offsetLeft;
	};
	nexacro._getPopupWindowHandlePosY = function (handle) {
		var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
		return nexacro._getWindowHandlePosY(_win_handle) + handle.offsetTop;
	};

	nexacro._getPopupWindowHandleOuterWidth = function (handle) {
		return handle.offsetWidth;
	};
	nexacro._getPopupWindowHandleOuterHeight = function (handle) {
		return handle.offsetHeight;
	};

	nexacro._getPopupWindowHandleClientWidth = function (handle) {
		return handle.clientWidth;
	};
	nexacro._getPopupWindowHandleClientHeight = function (handle) {
		return handle.clientHeight;
	};

	nexacro._setPopupWindowHandleArea = function (handle, x, y, w, h) {
		if (handle) {
			var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
			x -= nexacro._getWindowHandlePosX(_win_handle);
			y -= nexacro._getWindowHandlePosY(_win_handle);

			var handle_style = handle.style;
			handle_style.left = (x | 0) + "px";
			handle_style.top = (y | 0) + "px";
			handle_style.width = (w | 0) + "px";
			handle_style.height = (h | 0) + "px";
		}
	};
	nexacro._setPopupWindowHandlePos = function (handle, x, y) {
		if (handle) {
			var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
			x -= nexacro._getWindowHandlePosX(_win_handle);
			y -= nexacro._getWindowHandlePosY(_win_handle);

			var handle_style = handle.style;
			handle_style.left = (x | 0) + "px";
			handle_style.top = (y | 0) + "px";
		}
	};

	nexacro._setPopupWindowHandleSize = function (handle, w, h) {
		if (handle) {
			var handle_style = handle.style;
			handle_style.width = (w | 0) + "px";
			handle_style.height = (h | 0) + "px";
		}
	};

	nexacro._blockScript = function () {
	};

	nexacro._unblockScript = function () {
	};

	nexacro._setPopupWindowHandleVisible = function (handle, visible_flag) {
		if (handle) {
			var handle_style = handle.style;
			if (handle_style) {
				handle_style.visibility = (visible_flag === true) ? "" : "hidden";
			}
		}
	};

	nexacro._showQuickviewMenu = function () {
	};
	nexacro._setSystemMenuResizable = function () {
	};
	nexacro._procSysCommand = function () {
	};
	nexacro._setWindowHandleLock = function (handle, is_lock, _except_handle, is_modal_async) {
		nexacro.__setWindowHandleLock(handle, is_lock, _except_handle, is_modal_async);
	};

	nexacro.__setWindowHandleLock = function (handle, is_lock, _except_handle) {
		var __handle = handle;
		if (__handle == null) {
			__handle = window;
		}

		var _window = __handle._linked_window;
		while (_window) {
			if (_window.parent) {
				_window = _window.parent;
			}
			else {
				break;
			}
		}

		if (_window == null) {
			return;
		}

		var _except_window = _except_handle ? _except_handle._linked_window : null;
		nexacro.__setWindowHandleEnableByRef(_window, !is_lock, _except_window, true, true);
	};

	nexacro.__setWindowHandleEnableByRef = function (_window, is_enable, _except_window, is_recursive) {
		if (_window != _except_window) {
			if (is_enable) {
				_window._disable_ref--;
				if (_window._disable_ref === 0) {
					_window._coverUnlock(_except_window);
				}
			}
			else {
				if (_window._disable_ref === 0) {
					_window._coverLock(_except_window);
				}
				_window._disable_ref++;
			}
		}

		if (is_recursive) {
			for (var i = 0; i < _window._child_list.length; i++) {
				var child = _window._child_list[i];
				if (child.frame) {
					nexacro.__setWindowHandleEnableByRef(child, is_enable, _except_window, true, true);
				}
			}
		}
	};

	nexacro._requestAnimationFrame = function (_window, callback) {
		if (!_window) {
			return;
		}
		var win_handle = _window.handle;
		if (!win_handle) {
			return;
		}
		var requestAnimationFrame = win_handle.requestAnimationFrame || win_handle.mozRequestAnimationFrame || win_handle.webkitRequestAnimationFrame || win_handle.msRequestAnimationFrame;
		if (!requestAnimationFrame) {
			return;
		}
		var requestid = requestAnimationFrame.call(win_handle, callback);
		return requestid;
	};

	nexacro._cancelAnimationFrame = function (_window, requestid) {
		if (!_window) {
			return;
		}
		var win_handle = _window.handle;
		if (!win_handle) {
			return;
		}
		var cancelAnimationFrame = win_handle.cancelAnimationFrame || win_handle.mozCancelAnimationFrame || win_handle.webkitCancelAnimationFrame;
		if (cancelAnimationFrame) {
			cancelAnimationFrame.call(win_handle, requestid);
		}
	};

	nexacro._checkExceptionDevice = function (_tester) {
		var orientation_str = nexacro._isPortrait() ? "portrait" : "landscape";
		_tester.init_screen_width = nexacro._getScreenWidth();
		_tester.is_init_screen_portrait = nexacro._isPortrait();
		_tester[orientation_str + "_screen_width"] = nexacro._getScreenWidth();
		_tester.screen_checked = true;
	};

	nexacro.__setViewportScale = function () {
		var _tester = nexacro._device_exception_tester;
		if (_tester.screen_checked === false) {
			nexacro._checkExceptionDevice(_tester);
		}

		var ratio = nexacro._zoom_factor / 100;
		var scalable_val = "0";

		if (!nexacro._isDesktop() || nexacro._AndroidDesktopMode) {
			if (nexacro._allow_default_pinchzoom) {
				scalable_val = "1";
			}
		}

		var elems = document.getElementsByName("viewport");
		var viewport = elems.length ? elems[0] : null;
		if (!viewport) {
			viewport = document.createElement("meta");
			viewport.name = "viewport";
			document.querySelector("head").appendChild(viewport);
		}

		var contents = viewport.content.split(",");

		function __set_attribute (attr_name, attr_value) {
			var content = attr_value ? attr_name + "=" + attr_value : null;
			var is_found = false;

			for (var i = 0; i < contents.length; i++) {
				var name = nexacro.trim(contents[i].split("=")[0]);
				if (name == attr_name) {
					is_found = true;
					if (content) {
						contents[i] = content;
					}
					else {
						contents.splice(i, 1);
					}
					break;
				}
			}

			if (!is_found && content) {
				contents.push(content);
			}
		}

		__set_attribute("user-scalable", scalable_val);
		__set_attribute("initial-scale", ratio);

		if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
			__set_attribute("minimum-scale", ratio);
		}

		if (!nexacro._allow_default_pinchzoom && nexacro._getDeviceName() == "iPhone") {
			__set_attribute("minimum-scale", ratio);
			__set_attribute("maximum-scale", ratio);
		}

		if (nexacro._OS == "Android") {
			__set_attribute("target-densitydpi", "device-dpi");
			if (nexacro._isWebView()) {
				if (ratio > 1) {
					__set_attribute("initial-scale", 1);
					__set_attribute("minimum-scale", 1);
				}
			}
			else {
				__set_attribute("width", "");
			}
		}
		else {
			__set_attribute("width", "");
		}

		var _win = window._linked_window;
		if (nexacro._OS == "iOS") {
			if (!_win) {
				var deviceName = nexacro._getDeviceName();
				if ((deviceName == "iPhone" && nexacro._BrowserVersion >= 10 && nexacro._BrowserVersion != 12) || (nexacro._Browser == "Chrome" && nexacro._BrowserVersion >= 73) || (deviceName == "iPad" && nexacro._BrowserVersion < 11)) {
					var win_handle = window;
					var win = win_handle._linked_window;
					var old_window_width = nexacro._getWindowHandleClientWidth(win_handle);
					var delayTime = 5;
					var checkMaximumCnt = 200;
					if (deviceName == "iPad") {
						checkMaximumCnt = 400;
					}
					if (win_handle.innerWidth == win_handle.document.body.clientWidth) {
						var _timeout = 0;
						_tester._viewport_resize_observer = setInterval(function () {
							var cur_window_width = nexacro._getWindowHandleClientWidth(win_handle);

							if (old_window_width != cur_window_width || _timeout > checkMaximumCnt) {
								if (!win) {
									win = win_handle._linked_window;
								}
								if (win) {
									var width = nexacro._getWindowHandleClientWidth(win_handle);
									var height = nexacro._getWindowHandleClientHeight(win_handle);
									win.setSize(width, height);
									win.frame._setSize(width, height, 0);
								}
								if (deviceName == "iPad") {
									if (parseInt(document.body.style.width) == cur_window_width || _timeout > checkMaximumCnt) {
										clearInterval(_tester._viewport_resize_observer);
										_tester._viewport_resize_observer = null;
									}
								}
								else {
									clearInterval(_tester._viewport_resize_observer);
									_tester._viewport_resize_observer = null;
								}
							}
							_timeout++;
						}, delayTime);
					}
				}
				var use_windowsize_as_bodysize = nexacro._searchDeviceExceptionValue("use_windowsize_as_bodysize");
				if (use_windowsize_as_bodysize) {
					_tester.use_windowsize_as_bodysize = true;
				}
			}
		}

		if (nexacro._BrowserExtra == "SamsungBrowser" || (nexacro._OS == "Android" && nexacro._Browser == "Chrome")) {
			var tbl = nexacro._searchDeviceExceptionTable();
			if (tbl && tbl.firsttouch_onlyonce_proc && !nexacro._is_first_touch) {
				document.addEventListener("touchstart", function (evt) {
					var curTime = (evt.timeStamp || new Date().getTime());

					if (!nexacro._last_doc_touchstart_time || (nexacro._last_doc_touchstart_time && (curTime - nexacro._last_doc_touchstart_time) < 400)) {
						evt.preventDefault();
						if (evt.srcElement instanceof HTMLInputElement) {
							setTimeout((function (n) {
								return function () {
									n.focus();
								};
							})(evt.srcElement), 500);
						}
					}

					nexacro._last_doc_touchstart_time = curTime;
				});
				tbl.firsttouch_onlyonce_proc = false;
			}

			if (_win) {
				var adjust_screen_width = nexacro._getMainWindowWidth(_win);
				var adjust_screen_height = nexacro._getMainWindowHeight(_win);

				var orientation_info = screen.orientation;
				if (orientation_info && (orientation_info.type.indexOf("portrait") > -1)) {
					adjust_screen_width = Math.round(screen.width / ratio);


					var _doc_elem = _win._doc ? _win._doc.documentElement : null;
					if (_doc_elem && adjust_screen_height != _doc_elem.clientHeight) {
						adjust_screen_height = Math.round(_doc_elem.clientHeight / ratio);
					}
				}

				_win.frame._setSize(adjust_screen_width, adjust_screen_height);
			}
		}
		else if (nexacro._BrowserExtra == "NaverBrowser" || nexacro._BrowserExtra == "MiuiBrowser") {
			__set_attribute("width", "device-width");
		}
		else if (nexacro._isHybrid()) {
			if (!nexacro._allow_default_pinchzoom) {
				__set_attribute("minimum-scale", ratio);
				__set_attribute("maximum-scale", ratio);
			}
		}

		if (nexacro._OS == "iOS" && !nexacro._isHybrid() && nexacro._getDeviceName() != "iPhone") {
			setTimeout(function () {
				viewport.setAttribute('content', contents.toString());

				var win = window;
				var _window = win._linked_window;
				var _frame = window._linked_window ? window._linked_window.frame : null;

				if (_frame) {
					var _w = nexacro._getWindowHandleClientWidth(win);
					var _h = nexacro._getWindowHandleClientHeight(win);
					_frame._setSize(_w, _h);
					_window.setSize(_w, _h);
				}
			});
		}
		else {
			viewport.setAttribute('content', contents.toString());
		}

		window.scrollTo(0, 0);

		if (nexacro._OS == "iOS") {
			setTimeout(function () {
				var win = window;
				var _window = win._linked_window;
				var _frame = window._linked_window ? window._linked_window.frame : null;

				if (_frame) {
					var _w = nexacro._getWindowHandleClientWidth(win);
					var _h = nexacro._getWindowHandleClientHeight(win);
					_frame._setSize(_w, _h);
					_window.setSize(_w, _h);
				}
			}, 500);
		}
	};

	nexacro._applyDesktopScreenWidth = function () {
		nexacro._zoom_factor = (nexacro._getDeviceWidth() *  100) / Math.abs(parseInt(nexacro._desktopscreenwidth));
	};

	nexacro._device_regular_expression = 
		[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i
	], ['model', 'vendor', ['type', 'tablet']], [/applecoremedia\/[\w\.]+ \((ipad)/
	], ['model', ['vendor', 'Apple'], ['type', 'tablet']], [/(apple\s{0,1}tv)/i
	], [['model', 'Apple TV'], ['vendor', 'Apple']], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i
	], ['vendor', 'model', ['type', 'tablet']], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i
	], ['model', ['vendor', 'Amazon'], ['type', 'tablet']], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i
	], [['model', "", {
		'Fire Phone' : ['SD', 'KF']
	}], ['vendor', 'Amazon'], ['type', 'mobile']], [/\((ip[honed|\s\w*]+);.+(apple)/i
	], ['model', 'vendor', ['type', 'mobile']], [/\((ip[honed|\s\w*]+);/i
	], ['model', ['vendor', 'Apple'], ['type', 'mobile']], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i
	], ['vendor', 'model', ['type', 'mobile']], [/\(bb10;\s(\w+)/i
	], ['model', ['vendor', 'BlackBerry'], ['type', 'mobile']], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i
	], ['model', ['vendor', 'Asus'], ['type', 'tablet']], [/(sony)\s('tablet'\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i
	], [['vendor', 'Sony'], ['model', 'Xperia tablet'], ['type', 'tablet']], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i
	], [['vendor', 'Sony'], ['model', 'Xperia Phone'], ['type', 'mobile']], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i
	], ['vendor', 'model', ['type', 'console']], [/android.+;\s(shield)\sbuild/i
	], ['model', ['vendor', 'Nvidia'], ['type', 'console']], [/(playstation\s[34portablevi]+)/i
	], ['model', ['vendor', 'Sony'], ['type', 'console']], [/(sprint\s(\w+))/i
	], [['vendor', "", {
		'HTC' : 'APA', 
		'Sprint' : 'Sprint'
	}], ['model', "", {
		'Evo Shift 4G' : '7373KT'
	}], ['type', 'mobile']], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i
	], ['vendor', 'model', ['type', 'tablet']], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	], ['vendor', ['model', /_/g, ' '], ['type', 'mobile']], [/(nexus\s9)/i
	], ['model', ['vendor', 'HTC'], ['type', 'tablet']], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i
	], ['model', ['vendor', 'Microsoft'], ['type', 'console']], [/(kin\.[onetw]{3})/i
	], [['model', /\./g, ' '], ['vendor', 'Microsoft'], ['type', 'mobile']], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s[6])/i
	], ['model', ['vendor', 'Motorola'], ['type', 'mobile']], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
	], ['model', ['vendor', 'Motorola'], ['type', 'tablet']], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i
	], [['vendor', 'Samsung'], 'model', ['type', 'tablet']], [/((s[cgp]h-\w+|SHW-\w+|SHV-\w+|gt-\w+|galaxy\snexus|sm-\w+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i
	], [['vendor', 'Samsung'], 'model', ['type', 'mobile']], [/(samsung);'smarttv'/i
	], ['vendor', 'model', ['type', 'smarttv']], [/\(dtv[\);].+(aquos)/i
	], ['model', ['vendor', 'Sharp'], ['type', 'smarttv']], [/sie-(\w+)*/i
	], ['model', ['vendor', 'Siemens'], ['type', 'mobile']], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i
	], [['vendor', 'Nokia'], 'model', ['type', 'mobile']], [/android\s3\.[\s\w;-]{10}(a\d{3})/i
	], ['model', ['vendor', 'Acer'], ['type', 'tablet']], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i
	], [['vendor', 'LG'], 'model', ['type', 'tablet']], [/(lg) netcast\.tv/i
	], ['vendor', 'model', ['type', 'smarttv']], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i, /(IM-\w+)/i
	], ['model', ['vendor', 'LG'], ['type', 'mobile']], [/android.+(ideatab[a-z0-9\-\s]+)/i
	], ['model', ['vendor', 'Lenovo'], ['type', 'tablet']], [/linux;.+((jolla));/i
	], ['vendor', 'model', ['type', 'mobile']], [/((pebble))app\/[\d\.]+\s/i
	], ['vendor', 'model', ['type', 'wearable']], [/android.+;\s(glass)\s\d/i
	], ['model', ['vendor', 'Google'], ['type', 'wearable']], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i
	], [['model', /_/g, ' '], ['vendor', 'Xiaomi'], ['type', 'mobile']], [/\s('tablet')[;\/]/i, /\s('mobile')[;\/]/i
	], [['type', ""], 'vendor', 'model']
		
		
		
	];

	nexacro._setLogLevel = nexacro._emptyFn;
	nexacro._setTraceMode = nexacro._emptyFn;
	nexacro._setTraceDuration = nexacro._emptyFn;
	nexacro._deleteTraceLogFile = nexacro._emptyFn;
	nexacro._getLogFilePath = nexacro._emptyFn;
	nexacro._writeTraceLog = function (msglevel, message, bsystemlog) {
		var data;
		data = (bsystemlog === true) ? "S" : "U";

		if (msglevel === 0) {
			data += "F";
		}
		else if (msglevel == 1) {
			data += "E";
		}
		else if (msglevel == 2) {
			data += "W";
		}
		else if (msglevel == 3) {
			data += "I";
		}
		else {
			data += "D";
		}

		var curdate = new nexacro.Date();
		var millisec = curdate.getMilliseconds();

		data = data + " " + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds() + ":" + curdate.toZeroDigitString(millisec, 3) + " ";
		data += message;

		if (window.console) {
			window.console.log(data);
		}
	};


	nexacro._applicationExit = function (is_close_window) {
		window.system = null;
		window._application = null;

		if (is_close_window === true) {
			window.open('', '_self');
			window.close();
		}

		if (nexacro.Device) {
			nexacro.Device.exit();
		}
	};

	nexacro._setUseHttpKeepAlive = nexacro._emptyFn;
	nexacro._setHttpTimeout = nexacro._emptyFn;
	nexacro._setHttpRetry = nexacro._emptyFn;


	nexacro.__getWindowHandleEnable = function (win_handle) {
		if (!win_handle) {
			return false;
		}

		var _window = win_handle._linked_window;
		if (!_window) {
			return false;
		}

		if (_window._disable_ref > 0) {
			return false;
		}

		return true;
	};

	nexacro._setWindowHandleFocus = function (win_handle) {
		return;
	};
	nexacro._setWindowHandleActivate = nexacro._emptyFn;
	nexacro._setWindowHandleForeground = nexacro._emptyFn;
	if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
		if (nexacro._BrowserExtra == "SamsungBrowser") {
			nexacro.__getElementFromPoint = function (_win_handle, x, y) {
				var doc = _win_handle.document;
				if (!nexacro._isDesktop() && nexacro._BrowserVersion < 43) {
					x -= _win_handle.scrollX;
					y -= _win_handle.scrollY;
				}
				var elem_handle = doc.elementFromPoint(x, y);
				if (elem_handle) {
					return nexacro.__findParentElement(elem_handle);
				}
				return null;
			};
		}
		else {
			nexacro.__getElementFromPoint = function (_win_handle, x, y) {
				var doc = _win_handle.document;
				if (!nexacro._isDesktop()) {
					x -= _win_handle.scrollX;
					y -= _win_handle.scrollY;
				}
				var elem_handle = doc.elementFromPoint(x, y);
				if (elem_handle) {
					return nexacro.__findParentElement(elem_handle);
				}
				return null;
			};
		}
	}
	else {
		nexacro.__getElementFromPoint = function (_win_handle, x, y) {
			var doc = _win_handle.document;
			if (!nexacro._isDesktop()) {
				x -= _win_handle.scrollX;
				y -= _win_handle.scrollY;
			}
			var elem_handle = doc.elementFromPoint(x, y);
			if (elem_handle) {
				return nexacro.__findParentElement(elem_handle);
			}
			return null;
		};
	}

	nexacro._addExtensionModule = nexacro._emptyFn;
	nexacro._loadExtensionModules = nexacro._emptyFn;
	nexacro._deleteCacheDB = nexacro._emptyFn;
	nexacro._getLogFilePath = nexacro._emptyFn;




	nexacro._device_exception_tester = {
		init_screen_width : undefined, 
		is_init_screen_portrait : undefined, 
		screen_checked : false, 
		screen_swap_checked : false, 
		delayed_swap_screen_checked : false, 
		swap_screen : undefined, 
		delayed_swap_screen : undefined, 
		swap_screen_timer : null, 
		use_windowsize_as_bodysize : false
	};
	nexacro._device_exception_table = [{
		orientationchange_reset_viewport : (nexacro._OS == "Android") ? true : false, 
		swap_screen : (nexacro._OS == "Android") ? true : false, 
		delayed_reset_viewport : false, 
		delayed_swap_screen : false, 
		is_portrait_device : (nexacro._OS == "Android") ? (((nexacro._Browser == "Runtime" && nexacro.__isPhone && nexacro.__isPhone()) || (nexacro._Browser != "Runtime" && nexacro._isMobile())) ? (true) : (undefined)
)
			 : (undefined), 
		reset_viewport_delay : 0, 
		use_windowsize_as_bodysize : false, 
		force_swap : false
	}, {
		model : "SM-G935S", 
		browser : "Chrome", 
		use_windowsize_as_bodysize : true
	}, {
		model : "SM-T800", 
		browser : "stock", 
		is_portrait_device : true, 
		force_swap : true
	}, {
		model : "SM-T800", 
		browser : "Chrome", 
		is_portrait_device : true, 
		force_swap : true
	}, {
		model : "SM-T820", 
		browser : "samsungstock", 
		is_portrait_device : true, 
		use_windowsize_as_bodysize : false, 
		force_swap : true
	}, {
		model : "ALL", 
		browser : "samsungstock", 
		os_version : "6.0.1", 
		reset_viewport_delay : 300, 
		check_overversion : true, 
		is_portrait_device : true, 
		use_windowsize_as_bodysize : false, 
		firsttouch_onlyonce_proc : true
	}, {
		model : "SHW-M380S", 
		browser : "stock", 
		is_portrait_device : false
	}, {
		model : "SHW-M380S", 
		browser : "Chrome", 
		is_portrait_device : false
	}, {
		model : "LG-F320S", 
		browser : "stock", 
		swap_screen : false
	}, {
		model : "LG-F320S", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
		model : "LG-F320L", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
		model : "LG-F320K", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
		model : "SHW-M440S", 
		browser : "stock", 
		os_version : "4.3", 
		swap_screen : false
	}, {
		model : "SHV-E250S", 
		browser : "stock", 
		os_version : "4.4.2", 
		swap_screen : false, 
		use_windowsize_as_bodysize : true
	}, {
		model : "SHV-E250K", 
		browser : "stock", 
		os_version : "4.4.2", 
		swap_screen : false
	}, {
		model : "SHV-E250L", 
		browser : "stock", 
		os_version : "4.4.2", 
		swap_screen : false
	}, {
		model : "SM-N900S", 
		browser : "samsungstock", 
		use_windowsize_as_bodysize : true, 
		swap_screen : false
	}, {
		model : "LG-F400K", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
		model : "SAMSUNG SHV-E300S", 
		browser : "Chrome", 
		reset_viewport_delay : 0
	}, {
		model : "SAMSUNG SHV-E300K", 
		browser : "Chrome", 
		reset_viewport_delay : 0
	}, {
		model : "SAMSUNG SHV-E300L", 
		browser : "Chrome", 
		reset_viewport_delay : 0
	}, {
		model : "SHV-E300S", 
		browser : "Chrome", 
		reset_viewport_delay : 300, 
		is_portrait_device : true
	}, {
		model : "SHV-E300K", 
		browser : "Chrome", 
		reset_viewport_delay : 300, 
		is_portrait_device : true
	}, {
		model : "SHV-E300L", 
		browser : "Chrome", 
		reset_viewport_delay : 300, 
		is_portrait_device : true
	}, {
		model : "SAMSUNG SHV-E330S", 
		browser : "Chrome", 
		reset_viewport_delay : 0
	}, {
		model : "SHV-E330S", 
		browser : "Chrome", 
		reset_viewport_delay : 300, 
		is_portrait_device : true
	}, {
		model : "LG-F240L", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
		model : "IM-A910K", 
		browser : "Chrome", 
		delayed_swap_screen : true
	}, {
	}
	];

	nexacro._searchDeviceExceptionTable = function () {
		if (nexacro._OS != "Android") {
			return null;
		}

		var browser;
		if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
			if (nexacro._BrowserExtra == "SamsungBrowser") {
				browser = "samsungstock";
			}
			else {
				browser = nexacro._Browser;
			}
		}
		else {
			browser = "stock";
		}

		var table = nexacro._device_exception_table;
		var len = table.length;
		for (var i = 0; i < len; i++) {
			if (table[i].model === undefined) {
				continue;
			}

			if (browser != table[i].browser) {
				continue;
			}

			if (table[i].os_version) {
				if (table[i].check_overversion) {
					if (table[i].os_version > nexacro._OSVersion) {
						continue;
					}
				}
				else {
					if (table[i].os_version != nexacro._OSVersion) {
						continue;
					}
				}
			}
			if (table[i].model == "ALL") {
				return table[i];
			}
			var userAgent = nexacro._getUserAgent();
			if (userAgent.indexOf(table[i].model) >= 0) {
				return table[i];
			}
		}

		return null;
	};

	nexacro._searchDeviceExceptionValue = function (exception_type) {
		var exception = nexacro._searchDeviceExceptionTable();
		if (exception && exception[exception_type] !== undefined) {
			return exception[exception_type];
		}

		exception = nexacro._device_exception_table[0];
		return exception[exception_type];
	};


	nexacro._createTrayHandle = nexacro._emptyFn;
	nexacro._removeTrayHandle = nexacro._emptyFn;
	nexacro._setTrayIconHandle = nexacro._emptyFn;
	nexacro._setTrayTooltipHandle = nexacro._emptyFn;
	nexacro._showTrayBalloonTipHandle = nexacro._emptyFn;
	nexacro._hideTrayBalloonTipHandle = nexacro._emptyFn;
	nexacro._createTrayPopupMenuHandle = nexacro._emptyFn;
	nexacro._destroyTrayPopupMenuHandle = nexacro._emptyFn;
	nexacro._setTrayPopupMenuItemHandle = nexacro._emptyFn;
	nexacro._displayTrayPopupMenuHandle = nexacro._emptyFn;
	nexacro._syshandler_ontray_forward = nexacro._emptyFn;

	nexacro._getCSSFileName = function (cssfile) {
		if (nexacro._Browser == "Gecko") {
			cssfile += "_firefox";
		}
		else if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
			cssfile += "_chrome";
		}
		else {
			if (nexacro._BrowserType == "WebKit") {
				cssfile += "_safari";
			}
			else {
				if (nexacro._Browser == "IE") {
					if (nexacro._BrowserVersion <= 8) {
						cssfile += "_" + nexacro._Browser.toLowerCase() + "8";
					}
					else {
						cssfile += "_" + nexacro._Browser.toLowerCase() + nexacro._BrowserVersion;
					}
				}
				else if (nexacro._Browser == "Edge") {
					if (nexacro._BrowserType == "Edge") {
						cssfile += "_" + "ie11";
					}
				}
				else {
					cssfile += "_" + nexacro._Browser.toLowerCase();
				}
			}
		}
		return cssfile + ".css";
	};

	nexacro._getSelectedScreen = function () {
	};
	nexacro._getWindowRectforOpenAlign = function () {
		return null;
	};

	nexacro._setApplicationIcon = function (v) {
		var favicon = nexacro.UrlObject(v);
		if (favicon) {
			var handle = document.createElement("link");
			handle.rel = "shortcut icon";
			handle.href = favicon._sysurl;
			var headnode = document.getElementsByTagName('head')[0];
			headnode.appendChild(handle);
		}
	};

	nexacro._isRunBaseWindow = nexacro._emptyFn;
	nexacro._setRunBaseWindow = nexacro._emptyFn;
	nexacro._on_apply_layered = nexacro._emptyFn;
	nexacro._flushCommand = nexacro._emptyFn;
	nexacro._updateWrapper = nexacro._emptyFn;
	nexacro._setWindowTopmost = nexacro._emptyFn;
}


if (_process) {
	delete _process;

	delete _pHTMLSysEvent;
}
