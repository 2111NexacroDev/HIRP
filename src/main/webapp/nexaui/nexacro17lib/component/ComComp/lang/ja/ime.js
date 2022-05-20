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

if (nexacro.Edit) {
	nexacro._defineImeLocaleEdit("ja", {
		"Edit" : {
			on_deactivate_process : function () {
				var input_elem = this._input_element;
				if (input_elem) {
					if (!this._onlydisplay && input_elem.isComposing()) {
						this._killfocus_fix_composition();
					}
				}
				return true;
			}, 
			on_keydown_basic_specialkey_process : function (keycode, alt_key, ctrl_key, shift_key, meta_key) {
				var input_elem = this._input_element;

				if (nexacro._OS == "Mac OS" || nexacro._OS == "OSX" || nexacro._OS == "iOS") {
					ctrl_key = meta_key;
				}

				if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) {
					this._killfocus_fix_composition();
					var input_handle = input_elem.handle;
					if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
						input_handle.blur();
						input_handle.focus();
					}
					else if (nexacro._Browser == "Runtime") {
						input_elem.setCompositionComplete();
					}
					return;
				}
				else if (((ctrl_key && keycode == 86) || (shift_key && keycode == 45)) && input_elem.isComposing()) {
					input_elem.stopSysEvent();
					return;
				}
				else if (!alt_key && !shift_key && ctrl_key && keycode == 90) {
					if (input_elem.isComposing()) {
						input_elem.setCompositionComplete();
					}

					if (this._undostack) {
						this._undostack.undo();
						input_elem._applyMaxlength();
						input_elem.stopSysEvent();
						return;
					}
				}
				else if (!alt_key && !shift_key && ctrl_key && keycode == 89) {
					if (this._undostack) {
						this._undostack.redo();
						input_elem.stopSysEvent();
						return;
					}
				}
				return true;
			}, 
			on_keydown_basic_process : function (keycode, alt_key, ctrl_key, shift_key, meta_key) {
				var input_elem = this._input_element;
				if (this._undostack && !input_elem.isComposing()) {
					var pos = input_elem.getElementCaretPos();
					if (pos && pos != -1) {
						this._undostack.update(pos.begin, pos.end);
					}
				}
				if ((nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge"))) {
					if (input_elem.isComposing() && (keycode == 37 || keycode == 39)) {
						input_elem.stopSysEvent();
						return false;
					}
				}
				return true;
			}, 
			on_keyinput_basic_before_process : function (input_text) {
				var input_elem = this._input_element;
				var input_value = input_elem.value === null ? undefined : input_elem.value;
				input_text = input_text === undefined ? input_elem._getInputValue() : input_text;

				if (this.value === input_value && this.text === input_text) {
					return false;
				}
				return true;
			}, 

			on_beforeinput_process_with_HTMLEvent : function (value, status, begin, end, inputType) {
				var input_elem = this._input_element;

				var update_value = value ? value.replace(/\r\n/g, "") : value;
				var input_value = input_elem._getInputValue();
				var update_value_len = update_value ? update_value.length : 0;
				var ret = [input_elem._BeforeinputState.PASS];

				if (inputType == "deleteContentBackward" || inputType == "deleteContentForward" || inputType == "deleteByCut") {
					return ret;
				}

				if (this._inputtype_obj) {
					update_value = this._inputtype_obj.apply(update_value);
					if (value != update_value) {
						if (update_value) {
							update_value_len = update_value.length;

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.REPLACE);
						}
						else {
							ret.push(input_elem._BeforeinputState.CANCEL);
						}
					}
				}

				if (this._inputfilter_obj) {
					update_value = this._inputfilter_obj.apply(update_value);
					if (value != update_value) {
						if (update_value) {
							update_value_len = update_value.length;

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.REPLACE);
						}
						else {
							ret.push(input_elem._BeforeinputState.CANCEL);
						}
					}
				}

				if (status == 0 || status == 3) {
					switch (this.inputmode) {
						case "upper":
							update_value = update_value.toUpperCase();

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.CONVERT_UPPER);
							break;
						case "lower":
							update_value = update_value.toLowerCase();

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.CONVERT_LOWER);
							break;
					}
				}


				if (this.maxlength > 0 && ((status == 0 || status == 3) || inputType == "insertFromPaste")) {
					input_value = input_value ? input_value : input_elem._getInputValue();

					var new_value = input_value.substring(0, begin) + (update_value ? update_value : "") + input_value.substring(end);
					var caret_pos = inputType == "insertFromPaste" ? begin + update_value.length : end - (value.length - update_value.length) + 1;
					var check = input_elem._checkMaxLength(new_value, caret_pos);
					if (check && check.ismax) {
						var newpos = check.pos;

						update_value = update_value.substring(0, newpos - begin);

						input_elem._beforeinput_result_insert_data = update_value;
						input_elem._beforeinput_result_pos = {
							begin : newpos, 
							end : newpos
						};


						ret.push(input_elem._BeforeinputState.REPLACE);
						ret.push(input_elem._BeforeinputState.MAXLENGTH);
					}
				}
				return ret;
			}, 

			_killfocus_fix_composition : function () {
				var input_elem = this._input_element;
				var value = input_elem._getInputValue();

				var beginOffset = input_elem._composer.startOffset;
				var endOffset = input_elem._composer.endOffset;
				var new_value = this._fix_composition(value, beginOffset, endOffset);

				var caretpos = endOffset;
				var newpos = -1;
				var ismax = false;
				var check = input_elem._checkMaxLength(new_value, caretpos - (value.length - new_value.length), true);

				if (this.maxlength > 0) {
					if (check) {
						ismax = check.ismax;
						newpos = check.pos;

						if (ismax) {
							new_value = new_value.substring(0, newpos) + value.substring(caretpos);
						}
					}
					else {
						newpos = caretpos - (value.length - new_value.length);
					}
				}
				else {
					newpos = caretpos - (value.length - new_value.length);
				}

				value = new_value;

				input_elem._updateElementValue(value);

				if (!this._set_node_value) {
					input_elem._updateInputValue(value);
				}
				else {
					nexacro.__setDOMNode_Value(input_elem.handle, value);
				}



				if (newpos != -1 && beginOffset == newpos) {
					input_elem.setCompositionCancel(newpos, true);
				}
				else {
					input_elem.setCompositionComplete(newpos, true);
				}

				input_elem.setElementSetSelect(newpos, newpos);

				value = input_elem._getInputValue();

				return value;
			}, 

			on_killfocus_basic_process : function () {
				var input_elem = this._input_element;
				if (!this._onlydisplay) {
					var value = input_elem.value;

					if (input_elem.isComposing()) {
						value = this._killfocus_fix_composition();
					}

					var pre_value = this._default_value;
					var pre_text = this._default_text;

					var cur_value = input_elem.value;
					var cur_text = cur_value ? cur_value : "";

					var pos = input_elem.getElementCaretPos();
					if (pre_value != cur_value) {
						if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
							var cur_text_len = cur_text ? cur_text.length : 0;
							var pre_text_len = pre_text ? pre_text.length : 0;
							if (pos != -1) {
								if (cur_text_len - pre_text_len >= 0) {
									pos.begin = pos.end = pos.begin - (cur_text_len - pre_text_len);
								}
								if (pos.begin < 0) {
									pos.begin = pos.end = 0;
								}

								this._caret_pos = pos;
							}
							else {
								this._caret_pos.begin = this._caret_pos.end = pre_value ? pre_value.length : 0;
							}

							this.value = pre_value;
							this.text = pre_text;


							value = pre_value;

							input_elem.setElementValue(pre_value);
							input_elem.setElementSetSelect(this._caret_pos.begin, this._caret_pos.end);
						}
						else {
							value = input_elem.value;
						}
					}
					else {
						this._caret_pos = input_elem.getElementCaretPos();
					}

					input_elem._updateElementValue(value);
					this._setValue(input_elem.value === null ? undefined : input_elem.value);

					if (nexacro._isNull(this.value)) {
						this._changeUserStatus("nulltext", true);
					}

					if (nexacro._enableaccessibility && nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5) {
						this._setAccessibilityStatKillFocus();
					}

					var _win = this._getRootWindow();
					var idx = _win._indexOfCurrentFocusPaths(this);
					if (idx < 0) {
						input_elem.setElementBlur();
					}
				}
				else {
					if (nexacro._isNull(this.value)) {
						this._changeUserStatus("nulltext", true);
					}
				}

				return true;
			}, 

			_fix_composition : function (value, begin, end) {
				var input_text = value.substring(begin, end);
				if (input_text) {
					var update_value = input_text;

					if (this._inputtype_obj) {
						update_value = this._inputtype_obj.apply(update_value);
					}
					if (this._inputfilter_obj) {
						update_value = this._inputfilter_obj.apply(update_value);
					}
					if (this.inputmode == "upper") {
						update_value = update_value.toUpperCase();
					}
					else if (this.inputmode == "lower") {
						update_value = update_value.toLowerCase();
					}

					return value.substring(0, begin) + update_value + value.substring(end);
				}
				else {
					return value;
				}
			}
		}, 
		"TextArea" : {
			on_deactivate_process : function () {
				var input_elem = this._input_element;
				if (input_elem) {
					if (!this._onlydisplay && input_elem.isComposing()) {
						this._killfocus_fix_composition();
					}
				}
				return true;
			}, 
			on_keydown_basic_specialkey_process : function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
				var input_elem = this._input_element;

				if (nexacro._OS == "Mac OS" || nexacro._OS == "OSX" || nexacro._OS == "iOS") {
					ctrl_key = meta_key;
				}

				if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) {
					this._killfocus_fix_composition();
					var input_handle = input_elem.handle;
					if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
						input_handle.blur();
						input_handle.focus();
					}
					else if (nexacro._Browser == "Runtime") {
						input_elem.setCompositionComplete();
					}

					return;
				}
				else if (((ctrl_key && keycode == 86) || (shift_key && keycode == 45)) && input_elem.isComposing()) {
					input_elem.stopSysEvent();
					return;
				}
				else if (!alt_key && !shift_key && ctrl_key && keycode == 90) {
					if (input_elem.isComposing()) {
						input_elem.setCompositionComplete();
					}

					if (this._undostack) {
						this._undostack.undo();
						input_elem._applyMaxlength();
						input_elem.stopSysEvent();
						return;
					}
				}
				else if (!alt_key && !shift_key && ctrl_key && keycode == 89) {
					if (this._undostack) {
						this._undostack.redo();
						input_elem.stopSysEvent();
						return;
					}
				}
				else if (keycode == nexacro.Event.KEY_TAB) {
					if (!alt_key && !shift_key && ((this.acceptstab && !ctrl_key) || (!this.acceptstab && ctrl_key))) {
						var pos = input_elem.getElementCaretPos();
						var text = input_elem.getElementText();

						text = text.substring(0, pos.begin) + nexacro.TextArea._TAB_CHAR + text.substring(pos.end);
						var newpos = pos.begin + nexacro.TextArea._TAB_CHAR.length;
						nexacro._OnceCallbackTimer.callonce(this, function () {
							input_elem.updateElementText(text, newpos);
						}, 0);
						input_elem.stopSysEvent();
					}
					else {
						this._want_tab = false;
					}
				}

				return true;
			}, 
			on_keydown_basic_process : function (keycode, alt_key, ctrl_key, shift_key, meta_key) {
				var input_elem = this._input_element;
				if (this._undostack && !input_elem.isComposing()) {
					var pos = input_elem.getElementCaretPos();
					if (pos && pos != -1) {
						this._undostack.update(pos.begin, pos.end);
					}
				}
				if ((nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge"))) {
					if (input_elem.isComposing() && (keycode == 37 || keycode == 39)) {
						input_elem.stopSysEvent();
						return false;
					}
				}

				return true;
			}, 
			on_keydown_default_specialkey_process : function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
				var input_elem = this._input_element;

				if (keycode == nexacro.Event.KEY_RETURN) {
					if (input_elem.isComposing()) {
						var pos = input_elem.getElementCaretPos();
						var beginOffset = input_elem._composer.startOffset;
						var endOffset = pos.end;

						if (endOffset === undefined) {
							endOffset = input_elem._composer.endOffset;
						}

						var value = input_elem._getInputValue();

						var new_value = this._fix_composition(value, beginOffset, endOffset);

						var caretpos = endOffset;
						var newpos = -1;
						var ismax = false;
						var check = input_elem._checkMaxLength(new_value, caretpos - (value.length - new_value.length), true);

						if (this.maxlength > 0) {
							if (check) {
								ismax = check.ismax;
								newpos = check.pos;

								if (ismax) {
									new_value = new_value.substring(0, newpos) + value.substring(caretpos);
								}
							}
							else {
								newpos = caretpos - (value.length - new_value.length);
							}
						}
						else {
							newpos = caretpos - (value.length - new_value.length);
						}

						value = new_value;

						input_elem._updateElementValue(value);

						if (nexacro._Browser == "IE" || nexacro._Browser == "Runtime") {
							input_elem._updateInputValue(value);
						}
						else {
							nexacro.__setDOMNode_Value(input_elem.handle, value);
						}

						if (newpos != -1 && beginOffset == newpos && nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
							input_elem.setCompositionCancel(newpos);
						}
						else if (newpos != -1 && beginOffset == newpos) {
							input_elem.setCompositionCancel(newpos, true);
						}
						else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
							input_elem.setCompositionComplete(newpos);
						}
						else {
							input_elem.setCompositionComplete(newpos, true);
						}

						input_elem.setElementSetSelect(newpos, newpos);

						value = input_elem._getInputValue();

						if (ismax) {
							if (input_elem.autoskip) {
								if (input_elem.value && value.length >= input_elem.maxlength) {
									input_elem._go_next_focus();
								}
							}

							if (this._on_input_autoskip) {
								this._on_input_autoskip();
							}
						}
					}
				}

				return nexacro.TextArea.prototype.on_keydown_default_specialkey_process.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);
			}, 
			on_keyinput_basic_before_process : function (input_text) {
				var input_elem = this._input_element;
				var input_value = input_elem.value === null ? undefined : input_elem.value;
				input_text = input_text === undefined ? input_elem._getInputValue() : input_text;
				if (this.value === input_value && this.text === input_text) {
					return false;
				}

				return true;
			}, 
			on_killfocus_basic_process : function () {
				var input_elem = this._input_element;
				var cur_text;
				if (!this._onlydisplay) {
					var pos = null;
					var value = input_elem.value;

					if (input_elem.isComposing()) {
						pos = [input_elem._composer.startOffset, input_elem._composer.endOffset];
						value = input_elem._getInputValue();
						var new_value = this._killfocus_fix_composition();
						pos[0] = pos[1] = pos[1] - (value.length - new_value.length);
						value = new_value;
					}
					else {
						var caretpos = input_elem.getElementCaretPos();

						if (caretpos && caretpos != -1) {
							pos = caretpos;
						}
					}


					var pre_value = this._default_value;
					var pre_text = this._default_text;


					var cur_value = input_elem.value;
					cur_text = cur_value ? cur_value : "";
					if (!pos) {
						pos = input_elem.getElementCaretPos();
					}
					if (pre_value != cur_value) {
						if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
							var cur_text_len = cur_text ? cur_text.length : 0;
							var pre_text_len = pre_text ? pre_text.length : 0;
							if (pos != -1) {
								if (cur_text_len - pre_text_len >= 0) {
									pos.begin = pos.end = pos.begin - (cur_text_len - pre_text_len);
								}
								if (pos.begin < 0) {
									pos.begin = pos.end = 0;
								}

								this._caret_pos = pos;
							}
							else {
								this._caret_pos.begin = this._caret_pos.end = pre_value ? pre_value.length : 0;
							}

							this.value = pre_value;
							this.text = pre_text;
							value = pre_value;

							if (!this._onlydisplay) {
								input_elem.setElementValue(pre_value);
							}
							else {
								input_elem.setElementText(pre_value);
							}

							input_elem.setElementSetSelect(this._caret_pos.begin, this._caret_pos.end);


							input_elem._need_reset_update_value = true;
						}
						else {
							value = input_elem.value;
						}
					}
					else {
						this._caret_pos = input_elem.getElementCaretPos();
					}


					input_elem._updateElementValue(value);
					this._setValue(input_elem.value === null ? undefined : input_elem.value);


					if (nexacro._isNull(this.value)) {
						this._changeUserStatus("nulltext", true);
					}




					var _win = this._getRootWindow();
					var idx = _win._indexOfCurrentFocusPaths(this);
					if (idx < 0) {
						input_elem.setElementBlur();
					}
				}
				return true;
			}, 
			on_beforeinput_process_with_HTMLEvent : function (value, status, begin, end, inputType) {
				var input_elem = this._input_element;

				var update_value = value;
				var input_value = input_elem._getInputValue();
				var update_value_len = update_value ? update_value.length : 0;
				var ret = [input_elem._BeforeinputState.PASS];

				if (inputType == "deleteContentBackward" || inputType == "deleteContentForward" || inputType == "deleteByCut") {
					return ret;
				}


				if (/\r\n|\n\r/.test(update_value)) {
					update_value = update_value.replace(/\r\n|\n\r/g, "\n");
				}

				if (/\r/.test(update_value)) {
					update_value = update_value.replace(/\r/g, "");
				}
				if (this._inputtype_obj) {
					update_value = this._inputtype_obj.apply(update_value);
					if (value != update_value) {
						if (update_value) {
							update_value_len = update_value.length;

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.REPLACE);
						}
						else {
							ret.push(input_elem._BeforeinputState.CANCEL);
						}
					}
				}

				if (this._inputfilter_obj) {
					update_value = this._inputfilter_obj.apply(update_value);
					if (value != update_value) {
						if (update_value) {
							update_value_len = update_value.length;

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.REPLACE);
						}
						else {
							ret.push(input_elem._BeforeinputState.CANCEL);
						}
					}
				}

				if (status == 0 || status == 3) {
					switch (this.inputmode) {
						case "upper":
							update_value = update_value.toUpperCase();

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.CONVERT_UPPER);
							break;
						case "lower":
							update_value = update_value.toLowerCase();

							input_elem._beforeinput_result_insert_data = update_value;
							input_elem._beforeinput_result_pos = {
								begin : begin + update_value_len, 
								end : begin + update_value_len
							};
							ret.push(input_elem._BeforeinputState.CONVERT_LOWER);
							break;
					}
				}


				if (this.maxlength > 0 && ((status == 0 || status == 3) || inputType == "insertFromPaste")) {
					input_value = input_value ? input_value : input_elem._getInputValue();

					var new_value = input_value.substring(0, begin) + (update_value ? update_value : "") + input_value.substring(end);
					var caret_pos = inputType == "insertFromPaste" ? begin + update_value.length : end - (value.length - update_value.length) + 1;
					var check = input_elem._checkMaxLength(new_value, caret_pos);
					if (check && check.ismax) {
						var newpos = check.pos;

						update_value = update_value.substring(0, newpos - begin);

						input_elem._beforeinput_result_insert_data = update_value;
						input_elem._beforeinput_result_pos = {
							begin : newpos, 
							end : newpos
						};


						ret.push(input_elem._BeforeinputState.REPLACE);
						ret.push(input_elem._BeforeinputState.MAXLENGTH);
					}
				}
				return ret;
			}, 
			_killfocus_fix_composition : function () {
				var input_elem = this._input_element;
				var value = input_elem._getInputValue();

				var beginOffset = input_elem._composer.startOffset;
				var endOffset = input_elem._composer.endOffset;
				var new_value = this._fix_composition(value, beginOffset, endOffset);

				var caretpos = endOffset;
				var newpos = -1;
				var ismax = false;
				var check = input_elem._checkMaxLength(new_value, caretpos - (value.length - new_value.length), true);

				if (this.maxlength > 0) {
					if (check) {
						ismax = check.ismax;
						newpos = check.pos;

						if (ismax) {
							new_value = new_value.substring(0, newpos) + value.substring(caretpos);
						}
					}
					else {
						newpos = caretpos - (value.length - new_value.length);
					}
				}
				else {
					newpos = caretpos - (value.length - new_value.length);
				}

				value = new_value;

				input_elem._updateElementValue(value);

				if (nexacro._Browser == "IE" || nexacro._Browser == "Runtime") {
					input_elem._updateInputValue(value);
				}
				else {
					nexacro.__setDOMNode_Value(input_elem.handle, value);
				}

				if (newpos != -1 && beginOffset == newpos && nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
					input_elem.setCompositionCancel(newpos);
				}
				else if (newpos != -1 && beginOffset == newpos) {
					input_elem.setCompositionCancel(newpos, true);
				}
				else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
					input_elem.setCompositionComplete(newpos);
				}
				else {
					input_elem.setCompositionComplete(newpos, true);
				}

				input_elem.setElementSetSelect(newpos, newpos);

				value = input_elem._getInputValue();

				return value;
			}, 
			_fix_composition : function (value, begin, end) {
				var input_text = value.substring(begin, end);

				if (input_text) {
					if (/\r\n|\n\r/.test(input_text)) {
						input_text = input_text.replace(/\r\n|\n\r/g, "\n");
					}

					if (/\r/.test(input_text)) {
						input_text = input_text.replace(/\r/g, "");
					}

					var update_value = input_text;

					if (this._inputtype_obj) {
						update_value = this._inputtype_obj.apply(update_value);
					}
					if (this._inputfilter_obj) {
						update_value = this._inputfilter_obj.apply(update_value);
					}
					if (this.inputmode == "upper") {
						update_value = update_value.toUpperCase();
					}
					else if (this.inputmode == "lower") {
						update_value = update_value.toLowerCase();
					}

					return value.substring(0, begin) + update_value + value.substring(end);
				}
				else {
					return value;
				}
			}
		}
	});
}

if (nexacro._Browser != "Runtime") {
	if (nexacro.InputElement) {
		nexacro._defineImeLocaleEdit("ja", {
			"InputElement" : {
				_ignore_input_event_once : false, 
				setCompositionComplete_process : function (end_pos, is_composing) {
					var value = this._getInputValue();
					var _is_composing = is_composing || this._composer.isComposing();
					if (_is_composing) {
						var offset = this._composer.getOffset();
						end_pos = end_pos === undefined ? offset.end : end_pos;
						this._composer.setStatus(nexacro._CompositionState.END, end_pos);
						this._updateInputValue(value, !this._processing_oninput, end_pos);
					}
					return true;
				}, 
				setCompositionCancel_process : function (end_pos, is_composing) {
					var _is_composing = is_composing || this._composer.isComposing();
					if (_is_composing) {
						var value = this._getInputValue();
						var offset = this._composer.getOffset();
						end_pos = end_pos === undefined ? offset.end : end_pos;
						this._composer.setStatus(nexacro._CompositionState.END, offset.begin);
						this._updateInputValue(value.substring(0, offset.begin) + value.substring(end_pos), !this._processing_oninput, offset.begin);
					}
					return true;
				}, 
				on_sys_keydown_before_process : function (evt) {
					var input_handle = evt.srcElement;
					var pThis = input_handle._linked_element;
					if (input_handle) {
						if (pThis) {
							pThis._ignore_input_event_once = false;
						}
					}

					return nexacro.InputElement.prototype.on_sys_keydown_before_process.call(pThis, evt);
				}, 

				on_sys_keyup_before_process : function (evt) {
					var input_handle = evt.srcElement;
					var pThis = input_handle._linked_element;
					if (input_handle) {
						if (pThis) {
							pThis._ignore_input_event_once = false;
						}
					}

					return nexacro.InputElement.prototype.on_sys_keyup_before_process.call(pThis, evt);
				}, 

				on_sys_keyup_specialkey_process : function (evt) {
					var pThis = this;
					var is_composing = pThis._composer.isComposing();
					if (is_composing) {
						var ctrlkey = evt.ctrlKey;
						var keycode = nexacro._getSysEventKey(evt);
						var value = pThis._getInputValue();
						var pos;

						if (keycode == nexacro.Event.KEY_RETURN || (ctrlkey && keycode == 77) || (ctrlkey && keycode == 90)) {
							pos = pThis.getElementCaretPos();

							var beginOffset = pThis._composer.startOffset;
							pThis._composer.setStatus(nexacro._CompositionState.END, pos.end);

							var comp = pThis.parent_elem.linkedcontrol;

							var endOffset = pos.end;
							var ismax = false;

							if (pThis._composing_start !== undefined && pThis._composing_end !== undefined) {
								beginOffset = pThis._composing_start;
							}

							var newpos = -1;

							var new_value = comp._fix_composition(value, beginOffset, endOffset);
							var caretpos = endOffset;

							if (comp.maxlength > 0) {
								var check = pThis._checkMaxLength(new_value, caretpos - (value.length - new_value.length));

								if (check) {
									ismax = check.ismax;
									newpos = check.pos;

									if (ismax) {
										new_value = new_value.substring(0, newpos) + value.substring(caretpos);
									}
								}
								else {
									newpos = caretpos - (value.length - new_value.length);
								}
							}
							else {
								newpos = caretpos - (value.length - new_value.length);
							}

							value = new_value;

							pThis._updateInputValue(value, true, newpos);

							value = pThis._getInputValue();

							if (ismax) {
								pThis.setCompositionComplete();

								if (pThis.autoskip && pThis._is_focused) {
									if (pThis.value && value.length >= pThis.maxlength) {
										pThis._go_next_focus();
									}
								}

								if (comp._on_input_autoskip) {
									comp._on_input_autoskip();
								}
							}

							pThis._composing_start = pThis._composing_end = undefined;

							comp = pThis.parent.linkedcontrol;
							if (comp) {
								comp._on_input_compositionend(value);
							}

							pThis._setElementLastSelectionRange();
						}
						else if (keycode >= nexacro.Event.KEY_F6 && keycode <= nexacro.Event.KEY_F10) {
							if ((nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
								pos = pThis.getElementCaretPos();
								pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
							}
						}
					}

					return true;
				}, 
				on_sys_propertychange_process : function (evt) {
					var input_handle = evt.srcElement;
					if (input_handle) {
						var pThis = input_handle._linked_element;

						if (pThis) {
							var sel = pThis.getElementSelectionRange();
							if (!pThis._processing_oninput) {
								if (pThis._ignore_input_event_once) {
									pThis._ignore_input_event_once = false;
									return false;
								}
								else if (sel[0] == sel[1] && pThis.isComposing()) {
									pThis._ignore_input_event_once = true;
								}
							}
						}

						return nexacro.InputElement.prototype.on_sys_propertychange_process.call(pThis, evt);
					}
				}, 

				on_sys_beforeinput_forward_process : function (evt) {
					var pThis = this;
					var comp = pThis.parent_elem.linkedcontrol;

					var beforeinput_data = evt.data;
					var beforeinput_type = evt.inputType;

					var input_value = pThis._getInputValue();
					var input_pos = pThis.getElementCaretPos();
					var composing_status = pThis.getCompositionStatus();
					var beginOffset = input_pos.begin;
					var endOffset = input_pos.end;

					var _win = comp._getWindow();
					var capture_comp;
					if (comp) {
						capture_comp = _win._getCaptureComp(false, true, comp);
					}

					if (capture_comp && capture_comp != comp) {
						pThis._beforeinput_result = [pThis._BeforeinputState.CANCEL];
						pThis._beforeinput_result_data = input_value;
						pThis._beforeinput_result_pos = {
							begin : beginOffset, 
							end : endOffset
						};

						pThis._b_beforeinput_forcedcancle = true;
						return false;
					}
					else {
						pThis._b_beforeinput_forcedcancle = false;
					}

					if (!pThis._composer.isComposing() || evt.inputType == "insertFromPaste") {
						{

							if (beforeinput_data == null && beforeinput_type == "insertLineBreak") {
								beforeinput_data = "\n";
							}
							else if (beforeinput_type == "insertCompositionText") {
								pThis._composing_start = beginOffset;
								pThis._composing_end = endOffset;
							}

							pThis._beforeinput_result = comp._on_beforekeyinput(pThis, beforeinput_data, composing_status, beginOffset, endOffset, beforeinput_type);


							if (pThis._beforeinput_result) {
								pThis._beforeinput_result.forEach(function (state) {
									switch (state) {
										case pThis._BeforeinputState.PASS:
											break;
										case pThis._BeforeinputState.CANCEL:
											pThis._beforeinput_result_data = input_value;
											pThis._beforeinput_result_pos = {
												begin : beginOffset, 
												end : endOffset
											};

											break;
										case pThis._BeforeinputState.MAXLENGTH:
											break;
										case pThis._BeforeinputState.REPLACE:
										case pThis._BeforeinputState.CONVERT_UPPER:
										case pThis._BeforeinputState.CONVERT_LOWER:
											pThis._beforeinput_result_data = input_value.substring(0, beginOffset) + 
												pThis._beforeinput_result_insert_data + 
												input_value.substring(endOffset);
											break;
										default:
											break;
									}
								}, pThis);
							}
						}
					}
					return true;
				}, 
				_on_sys_keyinput_process_use_event_beforeinput : function (evt) {
					var pThis = this;
					var comp = pThis.parent_elem.linkedcontrol;

					var value;
					var pos;
					var ismax = false;


					if (pThis._beforeinput_result && (pThis._b_beforeinput_forcedcancle || (!pThis._composer.isComposing() || evt.inputType == "insertFromPaste"))) {
						var bcancle = false;
						pThis._beforeinput_result.forEach(function (state) {
							switch (state) {
								case nexacro.InputElement.prototype._BeforeinputState.PASS:
									break;
								case nexacro.InputElement.prototype._BeforeinputState.CANCEL:
									pThis._updateInputValue(pThis._beforeinput_result_data, false, pThis._beforeinput_result_pos.end, pThis._beforeinput_result_pos.end);
									bcancle = true;
									break;
								case nexacro.InputElement.prototype._BeforeinputState.CONVERT_UPPER:
								case nexacro.InputElement.prototype._BeforeinputState.CONVERT_LOWER:
								case nexacro.InputElement.prototype._BeforeinputState.REPLACE:
									if (pThis._beforeinput_result_data != null) {
										pThis._updateInputValue(pThis._beforeinput_result_data, false, pThis._beforeinput_result_pos.begin, pThis._beforeinput_result_pos.end);
									}
									break;
								case nexacro.InputElement.prototype._BeforeinputState.MAXLENGTH:
									ismax = true;
									break;
							}
						}, pThis);

						if (bcancle) {
							return;
						}
					}

					value = pThis._getInputValue();
					pos = pThis.getElementCaretPos();

					if (comp._is_undo && this.maxlength > 0) {
						var check = pThis._checkMaxLength(value, pos.end);
						if (check && check.ismax) {
							value = value.substring(0, check.pos);
							pThis._updateInputValue(value, false, "", check.end);
						}
						comp._is_undo = false;
					}


					if (pThis._composer.isComposing()) {
						pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
					}
					else {
						pThis._updateElementValue(value);
					}


					if (comp._on_keyinput && evt.inputType != "deleteCompositionText") {
						comp._on_keyinput(pThis);
					}
					var cur_status = pThis._composer.status;


					pThis._setElementLastSelectionRange();


					if (pThis.autoskip && pThis._is_focused) {
						if (ismax) {
							if (pThis.value && value.length >= pThis.maxlength) {
								pThis._go_next_focus();
							}
						}
						if (comp._on_input_autoskip) {
							comp._on_input_autoskip();
						}
					}

					pThis._composer._prev_status = cur_status;

					return true;
				}, 
				_on_sys_keyinput_process_no_use_event_beforeinput : function (evt) {
					var input_handle = (evt.target || evt.srcElement);

					var pThis = this;
					var comp = pThis.parent_elem.linkedcontrol;

					var composing_status = pThis._composer.status;

					var value = pThis._getInputValue();

					var pos = pThis.getElementCaretPos();
					if (pos && pos != -1) {
						var beginOffset, endOffset;
						beginOffset = pThis._paste_caret_pos ? pThis._paste_caret_pos.begin : pThis._composer.startOffset;
						endOffset = pThis._paste_caret_pos ? pThis._paste_caret_pos.end : pos.end;




						if (beginOffset > endOffset) {
							beginOffset = endOffset;
						}

						var bBackspace = pThis._checkBackspaceKeyInKeyInput(pThis.value, value, beginOffset, endOffset);
						var bSelect = pThis._checkSelectionInKeyInput(pThis.value, value, beginOffset, endOffset);

						if (bBackspace) {
							nexacro.__fireHTMLEvent(input_handle, "keydown", "onkeydown");
						}

						if (bSelect !== false) {
							beginOffset = bSelect;
						}


						if (comp._on_beforekeyinput && !pThis._composer.isComposing()) {
							comp._on_beforekeyinput(pThis, value, composing_status, beginOffset, endOffset);
							if (pThis._event_stop) {
								nexacro._stopSysEvent(evt);
								pThis._event_stop = false;
								return false;
							}
						}
					}

					var new_value = pThis._getInputValue();
					pos = pThis.getElementCaretPos();

					if (nexacro._OS == "Android" && nexacro._Browser == "Chrome" && nexacro._BrowserVersion > "34") {
						if (comp instanceof nexacro.MaskEdit) {
							pThis._beforeinput_result_pos = {
								begin : pos.begin, 
								end : pos.end
							};
						}
					}

					var ismax = false;

					if (pThis.maxlength > 0 && !pThis._composer.isComposing()) {
						var caretpos = pThis._paste_caret_pos ? pThis._paste_caret_pos.end - (value.length - new_value.length) : pos.end;
						var check = pThis._checkMaxLength(new_value, caretpos);

						if (check) {
							ismax = check.ismax;
							var newpos = check.pos;

							if (ismax) {
								if (caretpos != newpos) {
									new_value = new_value.substring(0, newpos) + new_value.substring(caretpos);

									pThis._updateInputValue(new_value, false, newpos);

									pos = pThis.getElementCaretPos();
								}

								pThis.setCompositionComplete();
							}
						}
					}

					value = new_value;


					if (pThis._composer.isComposing()) {
						pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
					}
					else {
						pThis._updateElementValue(value);
					}

					var cur_status = pThis._composer.status;


					if (ismax) {
						if (comp._on_input_autoskip && pThis._is_focused) {
							comp._on_input_autoskip();
						}
					}

					pThis._composer._prev_status = cur_status;


					if (comp._on_keyinput && evt.inputType != "deleteCompositionText") {
						comp._on_keyinput(pThis);
					}

					if (pThis._event_stop) {
						nexacro._stopSysEvent(evt);
						pThis._event_stop = false;
						return false;
					}


					pThis._setElementLastSelectionRange();

					if (pThis.autoskip && pThis._is_focused) {
						if (ismax) {
							if (nexacro._Browser == "Safari") {
								setTimeout(function () {
									if (pThis._is_focused) {
										pThis._go_next_focus();
									}
								}, 0);
							}
							else {
								pThis._go_next_focus();
							}
						}
					}
					return true;
				}, 

				on_sys_keyinput_process : function (evt) {
					if (this._use_event_beforeinput) {
						return this._on_sys_keyinput_process_use_event_beforeinput(evt);
					}
					else {
						return this._on_sys_keyinput_process_no_use_event_beforeinput(evt);
					}
				}, 

				on_sys_compositionupdate_process : function (evt) {
					var _skip_caret = false;
					if (nexacro._Browser == "Chrome" || nexacro._Browser == "Gecko" || nexacro._OS == "iOS" || (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
						_skip_caret = true;
					}

					var pos = this.getElementCaretPos();

					this._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end, _skip_caret);

					return true;
				}, 

				on_sys_compositionend_process : function (evt) {
					var input_handle = (evt.target || evt.srcElement);
					var pThis = input_handle._linked_element;

					var composing_status = pThis.getCompositionStatus();
					if (composing_status != nexacro._CompositionState.COMPOSING) {
						return;
					}


					if (pThis._is_focused) {
						var value = pThis._getInputValue();
						var pos = pThis.getElementCaretPos();
						var beginOffset = pThis._composer.startOffset;
						pThis._composer.setStatus(nexacro._CompositionState.END, pos.end);

						var comp = pThis.parent_elem.linkedcontrol;

						var beforeinput_data = evt.data;
						var endOffset = pos.end;
						var ismax = false;
						var check;

						if (pThis._composing_start !== undefined && pThis._composing_end !== undefined) {
							beginOffset = pThis._composing_start;
						}

						if (endOffset == undefined) {
							endOffset = beginOffset + beforeinput_data.length;
						}
						var caretpos = endOffset;
						var newpos = -1;
						var new_value;

						if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
							new_value = comp._fix_composition(value, beginOffset, endOffset);

							if (comp.maxlength > 0) {
								check = pThis._checkMaxLength(new_value, caretpos - (value.length - new_value.length));

								if (check) {
									ismax = check.ismax;
									newpos = check.pos;

									if (ismax) {
										if (caretpos != newpos) {
											new_value = new_value.substring(0, newpos) + value.substring(caretpos);
										}
									}
								}
								else {
									newpos = caretpos - (value.length - new_value.length);
								}
							}
							else {
								newpos = caretpos - (value.length - new_value.length);
							}

							var changed = false;

							if (value !== new_value) {
								changed = true;
							}

							value = new_value;

							pThis._updateElementValue(value);
							if ((changed || pThis.value !== value) && comp._on_keyinput) {
								comp._on_keyinput(pThis, value);
							}
							if (!ismax || !pThis.autoskip) {
								setTimeout(function () {
									pThis._updateInputValue(value, true, newpos);
								}, 0);
							}
						}
						else {
							new_value = comp._fix_composition(value, beginOffset, endOffset);

							if (comp.maxlength > 0) {
								caretpos = pThis._paste_caret_pos ? pThis._paste_caret_pos.end : endOffset;
								check = pThis._checkMaxLength(new_value, caretpos - (value.length - new_value.length));

								if (check) {
									ismax = check.ismax;
									newpos = check.pos;

									if (ismax) {
										new_value = new_value.substring(0, newpos) + value.substring(caretpos);
									}
								}
								else {
									newpos = caretpos - (value.length - new_value.length);
								}
							}
							else {
								newpos = caretpos - (value.length - new_value.length);
							}

							value = new_value;
							var old_value = pThis.value;

							if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
								pThis._updateElementValue(value);
							}

							if (!pThis._evtfire_oninput_after_compositionend || 
								pThis._evtorder_compositionend_is_last || pThis._use_event_beforeinput) {
								pThis._updateInputValue(value, true, newpos);
							}
							else {
								pThis._updateInputValue(value, false, newpos);
							}

							if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 10 && old_value != value && comp._on_keyinput) {
								comp._on_keyinput(pThis);
							}

							if (ismax) {
								pThis.setCompositionComplete();
							}
						}

						pThis._composing_start = pThis._composing_end = undefined;

						comp = pThis.parent.linkedcontrol;
						if (comp) {
							comp._on_input_compositionend(value);
						}

						pThis._setElementLastSelectionRange();

						if (pThis.autoskip && pThis._is_focused) {
							if (ismax) {
								if (nexacro._Browser == "Chrome" || nexacro._Browser == "Edge" || (nexacro._Browser == "IE" && nexacro._BrowserVersion == 11)) {
									pThis._go_next_focus();
								}
								else {
									setTimeout(function () {
										if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
											pThis._updateInputValue(value, true, newpos);
										}
										if (pThis._is_focused) {
											pThis._go_next_focus();
										}
									}, 0);
								}
							}
							if (comp._on_input_autoskip) {
								comp._on_input_autoskip();
							}
						}
					}
					return true;
				}, 
				on_sys_touchend_process : function (evt) {
					return false;
				}, 
				on_sys_paste_before_process : function (evt) {
					if (nexacro._OS == "iOS" && this.isComposing()) {
						nexacro._stopSysEvent(evt);
						return false;
					}
					return true;
				}, 
				on_complete_composition_value_process : function () {
					if ((nexacro._OS === "iOS" && nexacro._Browser === "MobileSafari") || nexacro._Browser === "Gecko" || nexacro._Browser === "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
						if (this.handle) {
							this.handle.blur();
							this.handle.focus();
							if ((nexacro._Browser === "IE" && nexacro._BrowserVersion <= 8) || (nexacro._OS === "iOS" && nexacro._Browser === "MobileSafari")) {
								var comp = this.parent_elem.linkedcontrol;
								var beginOffset = this._composer.startOffset;
								var endOffset = this._composer.endOffset;
								if (nexacro._OS === "iOS" && nexacro._Browser === "MobileSafari") {
									var pos = this.getElementCaretPos();
									endOffset = pos.end;
								}

								var newpos = -1;
								var value = this._getInputValue();
								var new_value = comp._fix_composition(value, beginOffset, endOffset);
								var caretpos = endOffset;
								if (comp.maxlength > 0) {
									var check = this._checkMaxLength(new_value, endOffset - (value.length - new_value.length));
									if (check) {
										newpos = check.pos;
										if (check.ismax) {
											new_value = new_value.substring(0, newpos) + value.substring(caretpos);
										}
									}
									else {
										newpos = endOffset - (value.length - new_value.length);
									}
								}
								else {
									newpos = endOffset - (value.length - new_value.length);
								}
								this._updateInputValue(new_value, false, newpos);
								this.setCompositionComplete(newpos, true);
							}
						}
					}
					return true;
				}, 

				on_updateEvtOrder_process : function () {
					if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 11) {
						this._evtorder_compositionend_is_last = true;
					}
					else {
						this._evtorder_compositionend_is_last = false;
					}
				}, 

				on_apply_ime_environment_process : function (evt) {
					var input_handle = evt ? (evt.target || evt.srcElement) : this.handle;
					var pThis = input_handle ? input_handle._linked_element : this;

					pThis._use_html_maxlength = false;
					nexacro.__setDOMNode_MaxLength(input_handle, 0);

					pThis.on_updateEvtOrder_process();
					return true;
				}
			}, 
			"TextAreaElement" : {
				on_reset_update_value : function (resetpos) {
					if (this._need_reset_update_value) {
						this._need_reset_update_value = false;
						var save = this._processing_oninput;
						this._processing_oninput = true;
						var pos;
						if (resetpos) {
							pos = this.getElementCaretPos();
						}
						var val = nexacro.__getDOMNodeValue(this.handle);

						if (val == '') {
							nexacro.__setDOMNode_Value(this.handle, ' ');
						}
						nexacro.__setDOMNode_Value(this.handle, val);
						if (resetpos && pos) {
							this.setElementSetSelect(pos.begin, pos.end);
						}
						this._processing_oninput = save;
					}
				}
			}
		});
	}
}
else {
	if (nexacro.InputElement) {
		nexacro._defineImeLocaleEdit("ja", {
			"InputElement" : {
				setCompositionComplete_process : function (end_pos, is_composing) {
					var pos = this.getElementCaretPos();
					var value = this._getInputValue();

					var _is_composing = is_composing || this._composer.isComposing();
					if (_is_composing) {
						this._composer.setStatus(nexacro._CompositionState.END, pos.end);
						this._updateInputValue(value, !this._processing_oninput);
					}
					return true;
				}, 
				setCompositionCancel_process : function (end_pos, is_composing) {
					var _is_composing = is_composing || this._composer.isComposing();
					if (_is_composing) {
						var value = this._getInputValue();
						var offset = this._composer.getOffset();

						this._composer.setStatus(nexacro._CompositionState.END, offset.begin);
						this._updateInputValue(value.substring(0, offset.begin), !this._processing_oninput);
					}
					return true;
				}, 
				on_sys_keyup_specialkey_process : function (keycode, altkey, ctrlkey) {
					var pos = this.getElementCaretPos();
					var is_composing = this._composer.isComposing();
					if (is_composing) {
						if (keycode == nexacro.Event.KEY_RETURN || (ctrlkey && keycode == 77) || (ctrlkey && keycode == 90)) {
							this._composer.setStatus(nexacro._CompositionState.END, pos.end);

							var value = this._getInputValue();
							this._updateInputValue(value, true);
						}
					}
					return true;
				}, 
				on_sys_keyinput_process : function () {
					var composing_status = this._composer.status;
					var beginOffset, endOffset;

					var value = this._getInputValue();

					var pos = this.getElementCaretPos();
					var paste_pos = this._paste_caret_pos;

					beginOffset = this._paste_caret_pos ? this._paste_caret_pos.begin : this._composer.startOffset;
					endOffset = this._paste_caret_pos ? this._paste_caret_pos.end : pos.end;


					if (beginOffset > endOffset) {
						beginOffset = endOffset;
					}

					var comp = this.parent_elem.linkedcontrol;



					if (comp._on_beforekeyinput && !this._composer.isComposing()) {
						comp._on_beforekeyinput(this, value, composing_status, beginOffset, endOffset);
						if (this._event_stop) {
							this._event_stop = false;
							return false;
						}
					}

					var new_value = this._getInputValue();
					pos = this.getElementCaretPos();

					var ismax = false;


					if (this.maxlength > 0 && !this._composer.isComposing()) {
						var caretpos = paste_pos ? paste_pos.end : pos.end;
						var check = this._checkMaxLength(value, caretpos);
						if (check) {
							ismax = check.ismax;
							var newpos = check.pos;

							if (ismax && caretpos != newpos) {
								new_value = value.substring(0, newpos) + value.substring(caretpos);
								this._updateInputValue(new_value);
								this.setElementSetSelect(newpos, newpos);

								pos = this.getElementCaretPos();
							}

							this.setCompositionComplete();
						}
					}

					value = new_value;


					if (this._composer.isComposing()) {
						this._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
					}
					else {
						this._updateElementValue(value);
					}

					var cur_status = this._composer.status;


					if (ismax) {
						if (comp._on_input_autoskip && this._is_focused) {
							comp._on_input_autoskip();
						}
					}


					this._composer._prev_status = cur_status;

					if (comp._on_keyinput) {
						comp._on_keyinput(this);
					}

					if (this._event_stop) {
						this._event_stop = false;
						return false;
					}


					this._setElementLastSelectionRange();

					if (this.autoskip && this._is_focused && ismax) {
						this._go_next_focus();
					}
					return true;
				}, 
				on_sys_compositionend_process : function () {
					if (this._is_focused) {
						var value = this._getInputValue();
						var pos = this.getElementCaretPos();
						var beginOffset = this._composer.startOffset;
						this._composer.setStatus(nexacro._CompositionState.END, pos.end);

						var comp = this.parent_elem.linkedcontrol;

						var endOffset = pos.end;
						var ismax = false;

						if (this._composing_start !== undefined && this._composing_end !== undefined) {
							beginOffset = this._composing_start;
						}

						if (endOffset == undefined) {
							endOffset = beginOffset;
						}

						var newpos = -1;

						var new_value = comp._fix_composition(value, beginOffset, endOffset);

						var caretpos = endOffset;

						if (comp.maxlength > 0) {
							var check = this._checkMaxLength(new_value, caretpos - (value.length - new_value.length));

							if (check) {
								ismax = check.ismax;
								newpos = check.pos;

								if (ismax) {
									new_value = new_value.substring(0, newpos) + value.substring(caretpos);
								}
							}
							else {
								newpos = caretpos - (value.length - new_value.length);
							}
						}
						else {
							newpos = caretpos - (value.length - new_value.length);
						}

						value = new_value;

						this._updateInputValue(value, false, newpos);

						if (newpos != -1 && caretpos != newpos) {
							this.setElementSetSelect(newpos, newpos);

							value = this._getInputValue();
							pos = this.getElementCaretPos();
						}


						if (ismax) {
							this.setCompositionComplete();
						}


						this._composer.setStatus(nexacro._CompositionState.END, pos.end);
						comp = this.parent.linkedcontrol;
						if (comp) {
							comp._on_input_compositionend(value);
						}
					}

					return;
				}, 
				on_complete_composition_value_process : function () {
					this.setCompositionComplete();

					return true;
				}
			}
		});
	}
}

{

	var regexp_nipon = "[\u0000-\u007F]|[\u0370-\u03FF]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]|[\uFF01-\uFFEF]|[\u3000-\u3002]|[\u300C]|[\u300D]|[\u309B]|[\u309C]|[\u2010-\u201F]";
	nexacro._addImeLocaleInfo("ja", regexp_nipon);
}

