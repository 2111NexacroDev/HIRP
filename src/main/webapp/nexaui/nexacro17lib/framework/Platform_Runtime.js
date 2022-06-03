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

if (nexacro._Browser == "Runtime") {
	if (!nexacro._init_platform_runtime) {
		nexacro._init_platform_runtime = true;
		nexacro._isTouchInteraction = (nexacro._getOS() == "Android");
		nexacro._SupportTouch = nexacro.__getSupportTouch();
		nexacro._SupportTouchEvent = true;
		nexacro._SupportAnimationFrame = true;
		nexacro._resize_popup_inbound = false;

		nexacro._getPopupFrames = function (winobj) {
			var window = _application._parentwindow;
			if (winobj) {
				window = winobj;
			}

			if (!window) {
				return null;
			}

			if (window._popupframes) {
				return window._popupframes;
			}
			else {
				return window._popupframes = new nexacro.Collection();
			}
		};

		nexacro._isPopupFrame = function (id) {
			var window = _application._parentwindow;
			if (!window) {
				return false;
			}

			if (window._popupframes && window._popupframes.get_item(id) != null) {
				return true;
			}
			return false;
		};

		nexacro._registerPopupFrame = function (id, frame, winobj) {
			var window = _application._parentwindow;
			if (winobj) {
				window = winobj;
			}

			if (!window) {
				return -1;
			}

			if (!window._popupframes) {
				window._popupframes = new nexacro.Collection();
			}

			if (window._popupframes.get_item(id) != null) {
				return -1;
			}

			return window._popupframes.add_item(id, frame);
		};

		nexacro._unregisterPopupFrame = function (id, winobj, usehtmlonly, use_argwin) {
			if (_application._parentwindow && _application._parentwindow._parentwindowforopen) {
				nexacro._isRunBaseWindow(_application._parentwindow._parentwindowforopen);
			}

			var context = winobj ? winobj : _application._parentwindow;
			if (use_argwin == true && winobj) {
				context = winobj;
			}

			if (!context) {
				return;
			}


			if (context._popupframes) {
				if (context._popupframes.get_item(id) != null) {
					context._popupframes.delete_item(id);
					if (context._popupframes.length == 0) {
						context._popupframes = null;
					}
				}
			}
		};
		nexacro._cleanupPopupFrame = nexacro._emptyFn;

		nexacro._syshandler_onmessage_forward = function (_window, id) {
			return _window._on_sys_message(id);
		};
		nexacro._syshandler_onlbuttondown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			var last_focused = _window._last_focused_elem;
			var isComposing = false;
			if (last_focused && last_focused.isInputElement()) {
				isComposing = last_focused.isComposing();
			}
			if (_window._touch_list && _window._touch_list.length > 0) {
				return;
			}
			else if (_window._touch_end) {
				_window._cancelEvent();
				return;
			}
			var ret = _window._on_sys_lbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);

			if (isComposing && !(elem.isInputElement() && elem.enable)) {
				last_focused.on_complete_composition_value();
			}

			return ret;
		};
		nexacro._syshandler_onlbuttonup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			if (_window._touch_list && _window._touch_list.length > 0) {
				return;
			}
			else if (_window._touch_end) {
				_window._touch_end = false;
				_window._cancelEvent();
				return;
			}
			var ret = _window._on_sys_lbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);

			if (elem && elem._use_decoration) {
				var firecur_comp = _window._findComponentForEvent(elem);

				if (firecur_comp) {
					var elem_pos = nexacro._getElementXYInWindow(firecur_comp._control_element.handle);
					var canvasX = windowX - elem_pos[0];
					var canvasY = windowY - elem_pos[1];
					var clientXY = firecur_comp._getClientXY(canvasX, canvasY);
					ret = nexacro.__hitTestByDecorateText(elem.handle, clientXY[0], clientXY[1], function (v) {
						if (v) {
							if (v.indexOf("tel") < 0 || !nexacro._isDesktop()) {
								nexacro._execBrowser(v);
							}
						}
					});
				}
			}

			return ret;
		};
		nexacro._syshandler_onrbuttondown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			var last_focused = _window._last_focused_elem;
			var isComposing = false;
			if (last_focused && last_focused.isInputElement()) {
				isComposing = last_focused.isComposing();
			}
			if (_window._touch_list && _window._touch_list.length > 0) {
				return;
			}
			else if (_window._touch_end) {
				_window._cancelEvent();
				return;
			}
			var ret = _window._on_sys_rbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);

			if (isComposing && !(elem.isInputElement() && elem.enable)) {
				last_focused.on_complete_composition_value();
			}

			return ret;
		};
		nexacro._syshandler_onrbuttonup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			if (_window._touch_list && _window._touch_list.length > 0) {
				return;
			}
			else if (_window._touch_end) {
				_window._touch_end = false;
				_window._cancelEvent();
				return;
			}
			return _window._on_sys_rbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onmousedown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			var last_focused = _window._last_focused_elem;
			var isComposing = false;
			if (last_focused && last_focused.isInputElement()) {
				isComposing = last_focused.isComposing();
			}
			if (_window._touch_list && _window._touch_list.length > 0 || _window._touch_end) {
				return;
			}

			var ret = _window._on_sys_mousedown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);

			if (isComposing && !(elem.isInputElement() && elem.enable)) {
				last_focused.on_complete_composition_value();
			}

			return ret;
		};
		nexacro._syshandler_onmouseup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			if (_window._touch_list && _window._touch_list.length > 0 || _window._touch_end) {
				return;
			}
			return _window._on_sys_mouseup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onmousemove_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			if (_window._touch_list && _window._touch_list.length > 0 || _window._touch_end) {
				return;
			}

			return _window._on_sys_mousemove(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onmouseenter_forward = function (_window, elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			if (!from_elem) {
				nexacro._initDragInfo();
			}

			return _window._on_sys_mouseenter(elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onmouseleave_forward = function (_window, elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			return _window._on_sys_mouseleave(elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onmousewheel_forward = function (_window, elem, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			var ret;
			if (nexacro._nCountAlertConfirm <= 0) {
				ret = _window._on_sys_mousewheel(elem, 0, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
				if (ret != false && ctrlKey && wheelDelta != 0) {
					nexacro._checkClosePopupComponent(null);
					var zoomframeElement = _window.frame._is_popup_frame != true ? _window.frame.frame.getElement() : _window.frame.getElement();
					var currentZoom = zoomframeElement.zoom == undefined ? 100 : zoomframeElement.zoom;
					var zoomDelta = wheelDelta > 0 ? 10 : -10;
					var newZoom = currentZoom + zoomDelta;
					if (_window && _window._enableWheelZoom) {
						_window._setWheelZoom(newZoom);
					}
				}
			}
			return ret;
		};
		nexacro._syshandler_ondragenter_forward = function (_window, elem, fromElem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, filelist, metaKey) {
			_window._on_sys_dragenter(elem, fromElem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, filelist, metaKey);
		};
		nexacro._syshandler_ondragleave_forward = function (_window, elem, toElem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, metaKey) {
			_window._on_sys_dragleave(elem, toElem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, undefined, metaKey);
		};
		nexacro._syshandler_ondragover_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, metaKey) {
			_window._on_sys_dragover(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, undefined, metaKey);
		};
		nexacro._syshandler_ondrop_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, filelist, metaKey) {
			_window._on_sys_drop(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, offsetX, offsetY, filelist, metaKey);
		};
		nexacro._syshandler_ontouchstart_forward = function (_window, elem, touchid, time) {
			var touches = arguments[2], changedTouches = arguments[3];
			time = arguments[4];

			if (!_window._touch_list) {
				_window._touch_list = new nexacro.Collection();
			}
			_window._touch_end = false;
			var last_focused = _window._last_focused_elem;
			var isComposing = false;
			if (last_focused && last_focused.isInputElement()) {
				isComposing = last_focused.isComposing();
			}
			if (touches.length > 0) {
				_window._touch_list.add(touches[0].id.toString(), touches);
			}
			else if (changedTouches.length > 0) {
				_window._touch_list.add(changedTouches[0].id.toString(), changedTouches);
			}





			var ret = nexacro._syshandler_ongesture_touchstart_forward(_window, elem, touches, changedTouches, time);

			if (isComposing && !(elem.isInputElement() && elem.enable)) {
				last_focused.on_complete_composition_value();
			}

			return ret;
		};
		nexacro._syshandler_ontouchmove_forward = function (_window, elem, touchid, time) {
			var touches = arguments[2], changedTouches = arguments[3];
			time = arguments[4];



			if (touches.length > 0) {
				_window._touch_list.add(touches[0].id.toString(), touches);
			}
			else if (changedTouches.length > 0) {
				_window._touch_list.add(changedTouches[0].id.toString(), changedTouches);
			}



			return nexacro._syshandler_ongesture_touchmove_forward(_window, elem, touches, changedTouches, time);
		};
		nexacro._syshandler_ontouchend_forward = function (_window, elem, touchid, time) {
			var touches = arguments[2], changedTouches = arguments[3];
			time = arguments[4];


			if (touches.length > 0) {
				_window._touch_list.remove(touches[0].id.toString());
			}
			else if (changedTouches.length > 0) {
				_window._touch_list.remove(changedTouches[0].id.toString());
			}

			_window._touch_end = true;

			var ret = nexacro._syshandler_ongesture_touchend_forward(_window, elem, touches, changedTouches, time);

			if (elem && elem._use_decoration) {
				var firecur_comp = _window._findComponentForEvent(elem);

				if (firecur_comp) {
					var elem_pos = nexacro._getElementXYInWindow(firecur_comp._control_element.handle);

					var touch;
					var touch_len = changedTouches.length;

					for (var i = 0; i < touch_len; i++) {
						touch = changedTouches[i];

						changedTouches.clientX = touch.clientX;
						changedTouches.clientY = touch.clientY;
					}

					var canvasX = changedTouches.clientX - elem_pos[0];
					var canvasY = changedTouches.clientY - elem_pos[1];

					var clientXY = firecur_comp._getClientXY(canvasX, canvasY);

					ret = nexacro.__hitTestByDecorateText(elem.handle, clientXY[0], clientXY[1], function (v) {
						if (v) {
							nexacro._execBrowser(v);
						}
					});
				}
			}

			return ret;
		};
		nexacro._syshandler_ongesture_touchstart_forward = function (_window, elem, touches, changedTouches, time) {
			var curTime = (time || Date().now());

			var touch_len = touches.length, change_len = changedTouches.length;

			var touch, touch_info, changed;
			var changed_ids = {
			}, touch_infos = [], changed_touch_infos = [];
			var i;
			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				changed_ids[touch.id] = true;
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];
				changed = changed_ids[touch.id];

				touch_info = new nexacro.Touch(touch.id, "touchstart", touch.timeStamp, touch.target, changed, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
				touch_infos.push(touch_info);
				if (changed) {
					changed_touch_infos.push(touch_info);
				}
			}

			return _window._on_gesture_sys_touchstart(elem, touch_infos, changed_touch_infos, curTime);
		};
		nexacro._syshandler_ongesture_touchmove_forward = function (_window, elem, touches, changedTouches, time) {
			var curTime = (time || Date().now());

			var touch_len = touches.length, change_len = changedTouches.length;

			var touch, touch_info, changed;
			var changed_ids = {
			}, touch_infos = [], changed_touch_infos = [];
			var i;
			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				changed_ids[touch.id] = true;

				touch_info = new nexacro.Touch(touch.id, "touchmove", touch.timeStamp, touch.target, changed, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
				changed_touch_infos.push(touch_info);
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];
				changed = changed_ids[touch.id];

				touch_info = new nexacro.Touch(touch.id, "touchmove", touch.timeStamp, touch.target, changed, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
				touch_infos.push(touch_info);
			}

			return _window._on_gesture_sys_touchmove(elem, touch_infos, changed_touch_infos, curTime);
		};
		nexacro._syshandler_ongesture_touchend_forward = function (_window, elem, touches, changedTouches, time) {
			var curTime = (time || Date().now());

			var touch_len = touches.length, change_len = changedTouches.length;

			var touch, touch_info;
			var touch_infos = [], changed_touch_infos = [];
			var i;
			for (i = 0; i < change_len; i++) {
				touch = changedTouches[i];
				touch_info = new nexacro.Touch(touch.id, "touchend", touch.timeStamp, touch.target, true, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
				changed_touch_infos.push(touch_info);
			}

			for (i = 0; i < touch_len; i++) {
				touch = touches[i];
				touch_info = new nexacro.Touch(touch.id, "touchend", touch.timeStamp, touch.target, false, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
				touch_infos.push(touch_info);
			}

			return _window._on_gesture_sys_touchend(elem, touch_infos, changed_touch_infos, curTime);
		};
		nexacro._syshandler_onmousehover_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, metaKey) {
			if (elem && elem.handle) {
				nexacro.__showElementHandleTooltip(elem.handle, windowX, windowY);
			}
		};
		nexacro._syshandler_ondblclick_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, metaKey) {
			return _window._on_sys_dblclick(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, undefined, undefined, metaKey);
		};
		nexacro._syshandler_onkeydown_forward = function (_window, elem, keycode, altKey, ctrlKey, shiftKey, metaKey) {
			return _window._on_sys_keydown(elem, keycode, altKey, ctrlKey, shiftKey, metaKey);
		};
		nexacro._syshandler_onkeypress_forward = function (_window, elem, keycode, charcode, altKey, ctrlKey, shiftKey, metaKey) {
			return _window._on_sys_keypress(elem, keycode, charcode, altKey, ctrlKey, shiftKey, metaKey);
		};
		nexacro._syshandler_onkeyup_forward = function (_window, elem, keycode, altKey, ctrlKey, shiftKey, metaKey) {
			return _window._on_sys_keyup(elem, keycode, altKey, ctrlKey, shiftKey, metaKey);
		};
		nexacro._syshandler_oncontextmenu_forward = function (_window, elem) {
			return _window._on_sys_contextmenu(elem);
		};
		nexacro._syshandler_onresize_forward = function (_window, width, height, wparam) {
			return _window._on_sys_resize(width, height, wparam);
		};
		nexacro._syshandler_onmove_forward = function (_window, left, top) {
			return _window._on_sys_move(left, top);
		};
		nexacro._syshandler_ongetminmaxinfo_forward = function (_window) {
			return _window._on_sys_getminmaxinfo();
		};
		nexacro._syshandler_onactivate_forward = function (_window) {
			return _window._on_sys_activate();
		};
		nexacro._syshandler_ondeactivate_forward = function (_window) {
			return _window._on_sys_deactivate();
		};
		nexacro._syshandler_onclose_forward = function (_window) {
			var bRet = _window._on_sys_close();
			if (bRet) {
				nexacro._stopWindowEventHandler(_window);
			}
			return bRet;
		};
		nexacro._syshandler_onbeforeclose_forward = function (_window) {
			var confirm_message = _window._on_sys_beforeclose();
			if (confirm_message !== undefined && confirm_message !== "") {
				return nexacro._confirm(_window.frame, confirm_message);
			}

			return true;
		};

		nexacro._syshandler_onreload_forward = function (_window, elem) {
			return _window._on_sys_reload(elem);
		};

		nexacro._syshandler_onviewsource_forward = function (_window, elem) {
			if (elem) {
				var comp = _window.findComponent(elem);
				if (comp) {
					var formurl, ref_form = comp;

					while (ref_form && ((ref_form._type_name != "Form" && !ref_form.url) || (ref_form._type_name == "Form" && !ref_form.url && !ref_form._url))) {
						if (ref_form._is_frame) {
							break;
						}

						ref_form = ref_form.parent;
					}

					if (ref_form) {
						var owner = ref_form.parent;
						if (comp.url) {
							formurl = comp.url;
						}
						else if (ref_form._is_frame) {
							formurl = ref_form.formurl;
						}
						else if (owner._is_frame) {
							formurl = owner.formurl;
						}
						else {
							if (ref_form._url) {
								formurl = ref_form._url.replace("xfdl.js", "xfdl");
								formurl = formurl.substring(0, formurl.indexOf(".xfdl")) + ".xfdl";
								formurl = "./" + formurl.substr(nexacro._project_url.length);
							}
						}
						nexacro.__simulatorViewSource(formurl);
					}
				}
			}
		};

		nexacro._syshandler_onsyscommand_forward = function (_window, elem, command) {
			var ret = _window._on_sys_syscommand(command);
			if (_window.handle) {
				nexacro.__refreshDirtyWindow(_window.handle);
			}
			return ret;
		};

		nexacro._syshandler_onncmousedown_forward = function () {
			return nexacro._checkClosePopupComponent();
		};

		nexacro._syshandler_onload_forward = function (_window) {
			return _window._on_sys_load(_window);
		};

		nexacro._syshandler_onduplicateexecution_forward = function (_window, _globalvalue) {
			return _application.on_fire_onduplicateexecution(_globalvalue);
		};

		nexacro._syshandler_onorientationchange_forward = function (_window, orientation) {
			return _window._on_sys_orientationchange(orientation);
		};

		nexacro._syshandler_onaccessibilitygesture_forward = function (_window, direction) {
			return _window._on_sys_accessibilitygesture(direction);
		};

		nexacro._syshandler_onaccessibilityhover_forward = function (_window, elem, windowX, windowY, screenX, screenY) {
			return _window._on_sys_accessibilityhover(elem, windowX, windowY, screenX, screenY);
		};

		nexacro._syshandler_onextmodule_forward = function (_win, handle, eventinfoarray) {
			_win._on_sys_onextmodule(handle, eventinfoarray);
		};


		nexacro._initWindowEventHandler = function (_window, handle) {
			var win_handle = (handle ? handle : _window.handle);
			if (win_handle) {
				nexacro._observeSysEvent(win_handle, "message", "onmessage", nexacro._syshandler_onmessage_forward);
				nexacro._observeSysEvent(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
				nexacro._observeSysEvent(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
				nexacro._observeSysEvent(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
				nexacro._observeSysEvent(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
				nexacro._observeSysEvent(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
				nexacro._observeSysEvent(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

				nexacro._observeSysEvent(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
				nexacro._observeSysEvent(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
				nexacro._observeSysEvent(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
				nexacro._observeSysEvent(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
				nexacro._observeSysEvent(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

				nexacro._observeSysEvent(win_handle, "dragenter", "ondragenter", nexacro._syshandler_ondragenter_forward);
				nexacro._observeSysEvent(win_handle, "dragover", "ondragover", nexacro._syshandler_ondragover_forward);
				nexacro._observeSysEvent(win_handle, "dragleave", "ondragleave", nexacro._syshandler_ondragleave_forward);
				nexacro._observeSysEvent(win_handle, "drop", "ondrop", nexacro._syshandler_ondrop_forward);

				if (nexacro._SupportTouchEvent) {
					nexacro._observeSysEvent(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
					nexacro._observeSysEvent(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
					nexacro._observeSysEvent(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
				}

				nexacro._observeSysEvent(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

				nexacro._observeSysEvent(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
				nexacro._observeSysEvent(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
				nexacro._observeSysEvent(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

				nexacro._observeSysEvent(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
				nexacro._observeSysEvent(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
				nexacro._observeSysEvent(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
				nexacro._observeSysEvent(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

				nexacro._observeSysEvent(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
				nexacro._observeSysEvent(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
				nexacro._observeSysEvent(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
				nexacro._observeSysEvent(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

				nexacro._observeSysEvent(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

				nexacro._observeSysEvent(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
				nexacro._observeSysEvent(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

				nexacro._observeSysEvent(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

				nexacro._observeSysEvent(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

				nexacro._observeSysEvent(win_handle, "duplicateexecution", "onduplicateexecution", nexacro._syshandler_onduplicateexecution_forward);

				nexacro._observeSysEvent(win_handle, "orientationchange", "onorientationchange", nexacro._syshandler_onorientationchange_forward);

				nexacro._observeSysEvent(win_handle, "accessibilitygesture", "onaccessibilitygesture", nexacro._syshandler_onaccessibilitygesture_forward);
				nexacro._observeSysEvent(win_handle, "accessibilityhover", "onaccessibilityhover", nexacro._syshandler_onaccessibilityhover_forward);

				nexacro._observeSysEvent(win_handle, "extmodule", "onextmodule", nexacro._syshandler_onextmodule_forward);

				nexacro.__refreshDirtyWindow(win_handle);
			}
		};

		nexacro._stopWindowEventHandler = function (_window) {
			var win_handle = _window.handle;
			if (win_handle) {
				nexacro._stopSysObserving(win_handle, "message", "onmessage", nexacro._syshandler_onmessage_forward);
				nexacro._stopSysObserving(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
				nexacro._stopSysObserving(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
				nexacro._stopSysObserving(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
				nexacro._stopSysObserving(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
				nexacro._stopSysObserving(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
				nexacro._stopSysObserving(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

				nexacro._stopSysObserving(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
				nexacro._stopSysObserving(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
				nexacro._stopSysObserving(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
				nexacro._stopSysObserving(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
				nexacro._stopSysObserving(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

				nexacro._stopSysObserving(win_handle, "dragenter", "ondragenter", nexacro._syshandler_ondragenter_forward);
				nexacro._stopSysObserving(win_handle, "dragover", "ondragover", nexacro._syshandler_ondragover_forward);
				nexacro._stopSysObserving(win_handle, "dragleave", "ondragleave", nexacro._syshandler_ondragleave_forward);
				nexacro._stopSysObserving(win_handle, "drop", "ondrop", nexacro._syshandler_ondrop_forward);

				if (nexacro._SupportTouchEvent) {
					nexacro._stopSysObserving(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
					nexacro._stopSysObserving(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
					nexacro._stopSysObserving(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
				}

				nexacro._stopSysObserving(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

				nexacro._stopSysObserving(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
				nexacro._stopSysObserving(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
				nexacro._stopSysObserving(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

				nexacro._stopSysObserving(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
				nexacro._stopSysObserving(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
				nexacro._stopSysObserving(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
				nexacro._stopSysObserving(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

				nexacro._stopSysObserving(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
				nexacro._stopSysObserving(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
				nexacro._stopSysObserving(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
				nexacro._stopSysObserving(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

				nexacro._stopSysObserving(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

				nexacro._stopSysObserving(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
				nexacro._stopSysObserving(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

				nexacro._stopSysObserving(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

				nexacro._stopSysObserving(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

				nexacro._stopSysObserving(win_handle, "duplicateexecution", "onduplicateexecution", nexacro._syshandler_onduplicateexecution_forward);

				nexacro._stopSysObserving(win_handle, "orientationchange", "onorientationchange", nexacro._syshandler_onorientationchange_forward);

				nexacro._stopSysObserving(win_handle, "accessibilitygesture", "onaccessibilitygesture", nexacro._syshandler_onaccessibilitygesture_forward);
				nexacro._stopSysObserving(win_handle, "accessibilityhover", "onaccessibilityhover", nexacro._syshandler_onaccessibilityhover_forward);

				nexacro._stopSysObserving(win_handle, "extmodule", "onextmodule", nexacro._syshandler_onextmodule_forward);
			}
		};

		nexacro._calculateZoomLevel = nexacro._emptyFn;

		nexacro.__bindEventWindowLoadHandler = function (_window) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (_window) {
					var handle;
					if (!_window.handle) {
						handle = v2;
						_window.attachHandle(handle);
					}
					nexacro._initWindowEventHandler(_window);
					if (nexacro.__mainwindow_handle) {
						nexacro._syshandler_onload_forward(_window);
					}

					var width = nexacro._getWindowHandleOuterWidth(handle);
					var height = nexacro._getWindowHandleOuterHeight(handle);
					if (_window.width != width || _window.height != height) {
						_window._on_default_sys_resize(width, height);
					}
				}
			};
		};

		nexacro.__bindEventPopupWindowLoadHandler = function (_window, parent_win) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (_window) {
					if (!_window.handle) {
						var handle = v2;
						_window.attachHandle(handle);
					}
					nexacro._initWindowEventHandler(_window);
					var childframe = new nexacro.ChildFrame(_window.id);
					var parent_window = parent_win ? parent_win : _application._parentwindow;
					if (parent_window) {
						if (parent_window._popupframes) {
							parent_window._popupframes.set_item(_window.id, childframe);
						}
					}
					childframe._showModeless(_window.id, _window);
				}
			};
		};

		nexacro.__bindEventModalWindowLoadHandler = function (_window, handle) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (handle == null) {
					handle = v2;
				}

				if (_window) {
					_window.attachHandle(handle);

					nexacro._initWindowEventHandler(_window);
					nexacro._syshandler_onload_forward(_window);

					_window._onPrepareModalWindowHandle();
				}
			};
		};

		nexacro.__bindEventModalAsyncWindowLoadHandler = function (_window) {
			return function () {
				if (_window) {
					nexacro._initWindowEventHandler(_window);
					nexacro._syshandler_onload_forward(_window);
				}
			};
		};

		nexacro.__mainwindow_handle = null;
		nexacro._createWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, taskbar, is_main) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win.handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventWindowLoadHandler(_window);
			var handle;
			if (!nexacro.__isDesignMode || !nexacro.__isDesignMode()) {
				handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
			}
			else {
				handle = nexacro.__createDesignWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
			}

			_window.attachHandle(handle);

			nexacro._setViewportScale(_window);

			if (is_main && handle) {
				nexacro._isRunBaseWindow(_window);
				nexacro.__mainwindow_handle = handle;
			}
		};

		nexacro._createModalWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, lockmode) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win.handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var popup_root_win_list = new Array();
			var root_win = _window;
			while (root_win.parent) {
				root_win = root_win.parent;
			}

			var i;
			if (lockmode == 1) {
				var popupframes = nexacro._getPopupFrames(parent_win);
				if (popupframes) {
					var len = popupframes.length;
					for (i = 0; i < len; i++) {
						var popup_frame = popupframes[i];
						var popup_win = popup_frame._window;
						if (popup_win == this) {
							continue;
						}

						if (popup_win == null) {
							continue;
						}

						var popup_root = popup_win;
						while (popup_root.parent) {
							popup_root = popup_root.parent;
						}
						if (popup_root == root_win) {
							continue;
						}
						if (nexacro._indexOf(popup_root_win_list, popup_root) < 0) {
							popup_root_win_list.push(popup_root);
						}
					}
				}
			}

			nexacro.__setWindowHandleLock(parent_handle, true, null, false);
			if (popup_root_win_list.length > 0) {
				for (i = 0; i < popup_root_win_list.length; i++) {
					nexacro.__setWindowHandleLock(popup_root_win_list[i].handle, true, null, false);
				}
			}

			_window._parentwindowforopen = parent_win;

			var callback = nexacro.__bindEventModalWindowLoadHandler(_window, null);
			var handle = nexacro.__createModalWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);

			if (popup_root_win_list.length > 0) {
				for (i = 0; i < popup_root_win_list.length; i++) {
					nexacro.__setWindowHandleLock(popup_root_win_list[i].handle, false, handle, false);
				}
			}


			delete popup_root_win_list;

			return _window.returnValue;
		};

		nexacro._createModalAsyncWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, lockmode) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win.handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventModalAsyncWindowLoadHandler(_window);
			var handle = nexacro.__createModalAsyncWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);
			_window.attachHandle(handle);

			return handle;
		};

		nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame) {
			if (frame._window_type != 3) {
				return;
			}

			var main_handle = nexacro._getMainWindowHandle();

			var timer_handle = nexacro._setSystemTimer(main_handle, function () {
				var is_prepared = nexacro.__isWindowHandlePrepared(_win_handle);
				if (_win_handle && is_prepared === false) {
					nexacro._removeModalAsyncCallbackHandler(frame);

					frame._runCallback();
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
					nexacro._clearSystemTimer(main_handle, list_item[1]);

					for (var j = i; j < list_length - 1; j++) {
						list[j] = list[j + 1];
					}
					list.pop();
					break;
				}
			}
		};

		nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main, parentframe, frameopener, arr_arg, ext_options) {
			var popupframeoption = nexacro._popupframeoption[name];
			if (popupframeoption) {
				popupframeoption._opener = frameopener;
				popupframeoption._parentwindow = parent_win;
				popupframeoption._parentframe = parentframe;
				popupframeoption._args = arr_arg;
			}

			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win.handle;
			}


			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var _window = new nexacro._Window(name, parent_win, false);
			if (parent_win) {
				parent_win.addChild(_window);
			}

			_window._parentwindowforopen = nexacro._findWindow(nexacro._getMainWindowHandle());

			var callback = nexacro.__bindEventPopupWindowLoadHandler(_window, parent_win);

			var ext_opt = ext_options.split(",");
			var bnoactivate = false;
			var i, opt;
			for (i = 0; i < ext_opt.length; i++) {
				opt = ext_opt[i].split("=");
				if (opt[0] == "noactivate") {
					bnoactivate = nexacro._toBoolean(opt[1]);
					_window._bnoactivate = bnoactivate;
					break;
				}
			}

			var handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, false, callback, bnoactivate);
			_window.attachHandle(handle);

			if (handle) {
				for (i = 0; i < ext_opt.length; i++) {
					opt = ext_opt[i].split("=");
					if (opt[0] == "topmost") {
						var btopmost = nexacro._toBoolean(opt[1]);
						nexacro.__setWindowHandleTopmost(handle, btopmost);
						break;
					}
				}
			}

			return handle;
		};

		nexacro._refreshWindow = function (handle, drawBitmap) {
			if (drawBitmap == true) {
				nexacro.__refreshDirtyRect(handle, drawBitmap);
			}
			else {
				nexacro.__refreshDirtyWindow(handle);
			}
		};

		nexacro._isWindowHandlePrepared = function (handle) {
			return nexacro.__isWindowHandlePrepared(handle);
		};
		nexacro._closeWindowHandle = function (handle) {
			if (nexacro.__mainwindow_handle == handle) {
				nexacro.__mainwindow_handle = null;
			}
			nexacro.__closeWindowHandle(handle);
		};

		nexacro._setLinkedWindow = function () {
		};
		nexacro._getMainWindowHandle = function () {
			return nexacro.__mainwindow_handle;
		};

		nexacro._getWindowHandle = function (handle) {
			return handle;
		};

		nexacro._getWindowDocumentHandle = function (handle) {
			return handle;
		};
		nexacro._getWindowDestinationHandle = function (handle) {
			return handle;
		};

		nexacro._getWindowHwndHandle = function (_handle) {
			if (_handle) {
				return nexacro.__getWindowHwndHandle(_handle);
			}
			return _handle;
		};

		nexacro._getWindowHandlePosX = function (handle) {
			return nexacro.__getWindowHandlePosX(handle);
		};
		nexacro._getWindowHandlePosY = function (handle) {
			return nexacro.__getWindowHandlePosY(handle);
		};

		nexacro._getWindowHandleOuterWidth = function (handle) {
			return nexacro.__getWindowHandleOuterWidth(handle);
		};
		nexacro._getWindowHandleOuterHeight = function (handle) {
			return nexacro.__getWindowHandleOuterHeight(handle);
		};

		nexacro._getWindowHandleClientWidth = function (handle) {
			return nexacro.__getWindowHandleClientWidth(handle);
		};
		nexacro._getWindowHandleClientHeight = function (handle) {
			return nexacro.__getWindowHandleClientHeight(handle);
		};

		nexacro._setWindowHandleArea = function (handle, x, y, w, h) {
			nexacro.__setWindowHandleArea(handle, x, y, w, h);
		};
		nexacro._setWindowHandlePos = function (handle, x, y) {
			nexacro.__setWindowHandlePos(handle, x, y);
		};
		nexacro._setWindowHandleSize = function (handle, w, h) {
			nexacro.__setWindowHandleSize(handle, w, h);
		};
		nexacro._setWindowHandleZIndex = function () {
		};
		nexacro._findWindow = function (_win_handle) {
			return nexacro.__getWindowFromWindowHandle(_win_handle);
		};

		nexacro._flashWindow = function (hWnd, strType, nCount, nInterval) {
			return nexacro.__flashWindow(hWnd, strType, nCount, nInterval);
		};

		nexacro._setWindowHandleText = function (_win_handle, titletext) {
			return nexacro.__setWindowHandleText(_win_handle, titletext);
		};

		nexacro._setWindowHandleStatusText = nexacro._emptyFn;

		nexacro._setWindowHandleIconObject = function (_win_handle, icon) {
			var env = nexacro.getEnvironment();
			if (env && env.icon) {
				var appicon = env.icon;
				icon = nexacro.UrlObject(appicon);
			}
			return nexacro.__setWindowHandleIconObject(_win_handle, icon);
		};

		nexacro._getMainWindowWidth = function (_win) {
			var win_width = _win.clientWidth;
			if (_win._zoom_factor) {
				win_width = win_width *  _win._zoom_factor / 100.0;
			}
			return win_width;
		};

		nexacro._getMainWindowHeight = function (_win) {
			var win_height = _win.clientHeight;
			if (_win._zoom_factor) {
				win_height = win_height *  _win._zoom_factor / 100.0;
			}
			return win_height;
		};

		nexacro._createPopupWindowHandle = function (parent_win, target_win, name, left, top, width, height) {
			var parent_handle = parent_win.handle;

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventWindowLoadHandler(target_win);
			var handle = nexacro.__createPopupWindowHandle(parent_handle, target_win, name, left, top, width, height, callback);
			target_win.attachHandle(handle);
		};
		nexacro._closePopupWindowHandle = function (handle) {
			nexacro.__closeWindowHandle(handle);
		};

		nexacro._getPopupWindowDocumentHandle = function (handle) {
			return handle;
		};
		nexacro._getPopupWindowDestinationHandle = function (handle) {
			return handle;
		};

		nexacro._getPopupWindowHandlePosX = function (handle) {
			return nexacro._getWindowHandlePosX(handle);
		};
		nexacro._getPopupWindowHandlePosY = function (handle) {
			return nexacro._getWindowHandlePosY(handle);
		};

		nexacro._getPopupWindowHandleOuterWidth = function (handle) {
			return nexacro._getWindowHandleOuterWidth(handle);
		};
		nexacro._getPopupWindowHandleOuterHeight = function (handle) {
			return nexacro._getWindowHandleOuterHeight(handle);
		};

		nexacro._getPopupWindowHandleClientWidth = function (handle) {
			return nexacro._getWindowHandleClientWidth(handle);
		};
		nexacro._getPopupWindowHandleClientHeight = function (handle) {
			return nexacro._getWindowHandleClientHeight(handle);
		};

		nexacro._setPopupWindowHandleArea = function (handle, x, y, w, h) {
			nexacro._setWindowHandleArea(handle, x, y, w, h);
		};
		nexacro._setPopupWindowHandlePos = function (handle, x, y) {
			nexacro._setWindowHandlePos(handle, x, y);
		};

		nexacro._setPopupWindowHandleSize = function (handle, w, h) {
			nexacro._setWindowHandleSize(handle, w, h);
		};

		nexacro._setPopupWindowHandleVisible = function (handle, visible_flag) {
			nexacro.__setWindowHandleVisible(handle, visible_flag);
			nexacro.__refreshDirtyWindow(handle);
		};

		nexacro._createVirtualWindowHandle = function (_handle) {
			return nexacro.__createVirtualWindowHandle(_handle);
		};

		nexacro._closeVirtualWindowHandle = function (_handle) {
			nexacro.__closeVirtualWindowHandle(_handle);
		};

		nexacro._blockScript = function (handle, _virtual_handle) {
			nexacro.__blockScript(handle, _virtual_handle);
		};

		nexacro._unblockScript = function (handle, _virtual_handle) {
			nexacro.__unblockScript(handle, _virtual_handle);
		};

		nexacro._hasCookieVariables = function () {
			return (nexacro._getCookieVariables(4) || nexacro._getCookieVariables(6)) ? true : false;
		};


		nexacro._setLocalStorageforService = nexacro._emptyFn;
		nexacro._getLocalStorageforService = nexacro._emptyFn;

		nexacro._clearLocalStorage = function () {
			if (nexacro._enginevar) {
				nexacro._enginevar = null;
			}
		};

		nexacro._removeLocalStorage = function (key, type, global) {
			if (type > 1) {
				if (!nexacro._enginevar) {
					return;
				}

				if (!nexacro._enginevar[type]) {
					return;
				}

				delete nexacro._enginevar[type][key];
				return;
			}
		};
		nexacro._setLocalStorage = function (key, varValue, type, global) {
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

			if (type > 1) {
				if (!nexacro._enginevar) {
					nexacro._enginevar = {
					};
				}

				if (!nexacro._enginevar[type]) {
					nexacro._enginevar[type] = {
					};
				}

				nexacro._enginevar[type][key] = {
					"type" : vartype, 
					"value" : varValue
				};
				return;
			}
			else {
				var value = vartype + ":" + varValue;
				return nexacro.__setPrivateProfile(key, value, global);
			}
		};

		nexacro._getLocalStorageAll = function (type) {
			if (type > 1) {
				if (!nexacro._enginevar) {
					return;
				}

				return nexacro._enginevar[type] ? nexacro._enginevar[type] : undefined;
			}
		};


		nexacro._getLocalStorage = function (key, type, global) {
			if (type > 1) {
				if (!nexacro._enginevar) {
					return;
				}

				var enginevar = nexacro._enginevar[type];
				if (enginevar) {
					var enginevalue = enginevar[key];
					if (enginevalue) {
						return enginevalue.value;
					}
				}
				return undefined;
			}

			var retvalue = nexacro.__getPrivateProfile(key, global);
			if (retvalue) {
				var index = retvalue.indexOf(":");
				var vartype = retvalue.substring(0, index);
				var value = retvalue.substring(index + 1);

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
					return value;
				}
			}
		};

		nexacro._hasLocalStorage = function (key, type) {
			if (type > 1) {
				if (!nexacro._enginevar) {
					return;
				}

				var enginevar = nexacro._enginevar[type];
				if (enginevar) {
					var enginevalue = enginevar[key];
					if (enginevalue) {
						return enginevalue.type ? true : false;
					}
				}
			}
			return false;
		};

		nexacro._getGlobalValueData = function () {
			return nexacro._globalvalue;
		};

		nexacro._getSystemFont = function () {
			return new nexacro._FontObject("12pt Verdana");
		};

		nexacro._showQuickviewMenu = function (comp, sx, sy) {
			var control_element = comp.getElement();
			if (control_element && control_element.handle) {
				var window = comp._getWindow();
				var _win_handle = (window ? window.handle : nexacro._getMainWindowHandle());
				var elem_handle = control_element.handle;
				return nexacro.__showQuickviewMenu(_win_handle, elem_handle, sx, sy);
			}
		};

		nexacro._setSystemMenuResizable = function (handle, resizable) {
			nexacro.__setSystemMenuResizable(handle, resizable);
		};

		nexacro._procSysCommand = function (handle, command) {
			nexacro.__procSysCommand(handle, command);
		};

		nexacro._setMouseHovertime = function (mousehovertime) {
			nexacro.__setMouseHovertime(mousehovertime);
		};

		nexacro._setWindowHandleLock = function (handle, is_lock, _except_handle, is_modal_async) {
			nexacro.__setWindowHandleLock(handle, is_lock, _except_handle, is_modal_async);
		};

		nexacro._requestAnimationFrame = function (_window, callback) {
			if (!_window) {
				return;
			}
			var win_handle = _window.handle;
			if (!win_handle) {
				return;
			}

			var requestid = nexacro.__requestAnimationFrame(win_handle, callback);
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

			nexacro.__cancelAnimationFrame(win_handle, requestid);
		};

		nexacro._deleteTraceLogFile = function () {
			nexacro.__deleteTraceLogFile();
		};

		nexacro._setLogLevel = function (v) {
			nexacro.__setLogLevel(v);
		};
		nexacro._setTraceMode = function (v) {
			nexacro.__setTraceMode(v);
		};
		nexacro._setTraceDuration = function (v) {
			nexacro.__setTraceDuration(v);
		};
		nexacro._getLogFilePath = function () {
			return nexacro.__getLogFilePath();
		};

		nexacro._writeTraceLog = function (msglevel, message, bsystemlog, loglevel) {
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
			var cnt = 16 - data.length;
			for (var i = 0; i < cnt; i++) {
				data += " ";
			}

			data += message;

			var traceduration = nexacro._traceduration || -1;
			var tracemode = nexacro._tracemode || "none";

			nexacro.__writeTraceLog(data, loglevel, tracemode, traceduration, msglevel);
			if (console && console.log) {
				console.log(data);
			}
		};

		nexacro._loadImageBase64 = function (source, target, handler) {
			return nexacro.__loadImageBase64(source, target, handler);
		};

		nexacro._setUseHttpKeepAlive = function (v) {
			nexacro.__setUseHttpKeepAlive(v);
		};

		nexacro._setHttpTimeout = function (v) {
			nexacro.__setHttpTimeout(v);
		};

		nexacro._setHttpRetry = function (v) {
			nexacro.__setHttpRetry(v);
		};

		nexacro._applicationExit = nexacro._emptyFn;

		nexacro._checkWindowActive = function (_window) {
			var is_active;
			var win_handle = _window.handle;
			if (win_handle) {
				is_active = nexacro.__checkWindowHandleActive(win_handle);
				_window._is_active_window = is_active;
			}

			return is_active;
		};

		nexacro._setWindowHandleFocus = function (win_handle) {
			nexacro.__setWindowHandleActivate(win_handle);
			nexacro.__setWindowHandleFocus(win_handle);
		};

		nexacro._setWindowHandleActivate = function (win_handle) {
			nexacro.__setWindowHandleActivate(win_handle);
		};

		nexacro._setWindowHandleForeground = function (win_handle) {
			nexacro.__setWindowHandleForeground(win_handle);
		};



		nexacro._addExtensionModule = function (modulepath) {
			return nexacro.__addExtensionModule(modulepath);
		};


		nexacro._clearExtensionModule = function (modulepath) {
			nexacro.__clearExtensionModule(modulepath);
		};

		nexacro._deleteCacheDB = function () {
			nexacro.__deleteCacheDB();
		};

		nexacro._searchDeviceExceptionValue = function (exception_type) {
			if (exception_type == "swap_screen") {
				return true;
			}
			return undefined;
		};

		nexacro._setViewportScale = function (_window) {
			if (!_window) {
				return;
			}

			var handle = _window.handle;

			var use_autozoom = (nexacro._zoom_factor === 0 ? false : true);
			var ratio = (use_autozoom ? nexacro._zoom_factor / 100 : 1.0);
			var minimum_scale = nexacro._minimum_scale;
			var maximum_scale = nexacro._maximum_scale;
			var is_scalable = (minimum_scale < maximum_scale ? 1 : 0);
			if (minimum_scale == undefined && maximum_scale == undefined) {
				is_scalable = (use_autozoom ? false : true);
			}

			if (nexacro._isDesktop()) {
				ratio = 1.0;
				is_scalable = false;
			}

			if (is_scalable) {
			}
			else {
				if (minimum_scale == undefined) {
					minimum_scale = 1;
				}
				if (maximum_scale == undefined) {
					maximum_scale = 1;
				}
			}

			nexacro.__setWindowHandleViewportScale(handle, is_scalable, ratio, (minimum_scale !== undefined) ? (ratio *  minimum_scale) : ratio, (maximum_scale !== undefined) ? (ratio *  maximum_scale) : ratio, null);

			_window._zoom_factor = nexacro._zoom_factor;
			if (nexacro._zoom_factor !== 0 && isNaN(nexacro._zoom_factor) == false) {
				_window._zoom_factor = nexacro._zoom_factor;
				nexacro.__setWindowHandleZoom(handle, nexacro._zoom_factor);
			}
		};

		nexacro._createTrayHandle = function (icon, tooltip) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__createTrayHandle(main_handle, icon, tooltip);
		};

		nexacro._removeTrayHandle = function (tray_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__removeTrayHandle(main_handle, tray_handle);
		};

		nexacro._setTrayIconHandle = function (tray_handle, icon) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayIconHandle(main_handle, tray_handle, icon);
		};

		nexacro._setTrayTooltipHandle = function (tray_handle, tooltip) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayTooltipHandle(main_handle, tray_handle, tooltip);
		};

		nexacro._showTrayBalloonTipHandle = function (tray_handle, titleicon, title, text, timeout, nosound) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__showTrayBalloonTipHandle(main_handle, tray_handle, titleicon, title, text, timeout, nosound);
		};

		nexacro._hideTrayBalloonTipHandle = function (tray_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__hideTrayBalloonTipHandle(main_handle, tray_handle);
		};

		nexacro._createTrayPopupMenuHandle = function (tray_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__createTrayPopupMenuHandle(main_handle, tray_handle);
		};

		nexacro._destroyTrayPopupMenuHandle = function (tray_handle, menu_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__destroyTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
		};

		nexacro._setTrayPopupMenuItemHandle = function (tray_handle, menu_handle, flags, id, caption, icon) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayPopupMenuItemHandle(main_handle, tray_handle, menu_handle, flags, id, caption, icon);
		};

		nexacro._displayTrayPopupMenuHandle = function (tray_handle, menu_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__displayTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
		};

		nexacro._syshandler_ontray_forward = function (_window, type, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, meta_key, hidereason) {
			var is_runbase = nexacro._isRunBaseWindow(this);
			var application, tray;
			if (type == "lbuttonup") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, meta_key);
					}
				}
			}
			else if (type == "rbuttonup") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, meta_key);
					}
				}
			}
			else if (type == "dblclick") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, meta_key);
					}
				}
			}
			else if (type == "menuclick") {
				if (nexacro._current_tray_popup) {
					var traypopup = nexacro._current_tray_popup;
					if (traypopup) {
						traypopup.on_fire_onmenuclick(id);
					}
				}
			}
			else if (type == "balloontipshow") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_onballoontipshow();
					}
				}
			}
			else if (type == "balloontiphide") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_onballoontiphide(hidereason);
					}
				}
			}
			else if (type == "balloontipclick") {
				application = nexacro.getApplication();
				if (application) {
					tray = application.trays[id];
					if (tray) {
						tray.on_fire_onballoontipclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, meta_key);
					}
				}
			}
			if (is_runbase) {
				nexacro._setRunBaseWindow(null);
			}
		};

		nexacro._getCSSFileName = function (cssfile) {
			return cssfile + "_runtime" + nexacro._getCSSFileType();
		};
		nexacro._getCSSFileType = function () {
			return ".css";
		};
		nexacro._getCSSTypeCode = function (cssreq) {
			return cssreq ? 11 : 10;
		};
		nexacro._getSelectedScreen = function () {
		};

		nexacro._getWindowRectforOpenAlign = function (halign, valign, parentleft, parenttop, left, top, width, height) {
			if (nexacro._Browser == "Runtime" && nexacro._isDesktop()) {
				var monitor_idx = nexacro._getMonitorIndex(parentleft + width / 2, parenttop + height / 2);
				var screen_rect = nexacro._getScreenRect(monitor_idx);

				var p_l = screen_rect.left;
				var p_t = screen_rect.top;
				var p_w = nexacro._getScreenWidth(monitor_idx);
				var p_h = nexacro._getScreenHeight(monitor_idx);



				switch (halign) {
					case "left":
						left = p_l;
						break;
					case "center":
						left = p_l + Math.round((p_w - width) / 2);
						break;
					case "right":
						left = p_l + p_w - width;
						break;
				}
				switch (valign) {
					case "top":
						top = p_t;
						break;
					case "middle":
						top = p_t + Math.round((p_h - height) / 2);
						break;
					case "bottom":
						top = p_t + p_h - height;
						break;
				}

				return {
					left : left, 
					top : top
				};
			}
			return null;
		};

		nexacro._isRunBaseWindow = function (_window) {
			_application._parentwindow = _window;
			if (_application._runbase_window) {
				return false;
			}

			_application._runbase_window = _window;
			return true;
		};

		nexacro._setRunBaseWindow = function (_window) {
			_application._parentwindow = _window;
			_application._runbase_window = _window;
		};

		nexacro._on_apply_layered = function (frame, layered) {
			if (layered) {
				frame.set_background("transparent");
			}
		};

		nexacro._postMessage = function (id, _window) {
			nexacro.__postMessage(_window.handle, id);
		};

		nexacro._flushCommand = function (_window) {
			nexacro.__flushCommand(_window.handle);
		};

		nexacro._setApplicationIcon = function (v) {
		};

		nexacro._updateWrapper = function (handle, brun, action) {
			nexacro.__updateWrapperBitmap(handle, brun, action);
		};

		nexacro._setWindowTopmost = function (handle, btopmost) {
			nexacro.__setWindowHandleTopmost(handle, btopmost);
		};
	}
}
