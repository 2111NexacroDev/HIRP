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

if (!nexacro.DatePickerControl) {
	nexacro.DatePickerControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pDatePickerControl = nexacro._createPrototype(nexacro.Component, nexacro.DatePickerControl);
	nexacro.DatePickerControl.prototype = _pDatePickerControl;
	_pDatePickerControl._type_name = "DatePickerControl";
	_pDatePickerControl.accessibilityrole = "datepicker";
	_pDatePickerControl._is_subcontrol = true;


	_pDatePickerControl.head = null;
	_pDatePickerControl.body = null;




	_pDatePickerControl._selected_year = "";
	_pDatePickerControl._selected_month = "";
	_pDatePickerControl._selected_day = "";


	_pDatePickerControl._use_readonly_status = true;
	_pDatePickerControl._is_locale_control = true;


	_pDatePickerControl._event_list = {
		"onclick" : 1, 
		"ondayclick" : 1, 
		"onspin" : 1, 
		"oncloseup" : 1
	};


	_pDatePickerControl.accessibilityrole = "datepicker";
	_pDatePickerControl._has_accessibility_value = false;

	_pDatePickerControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var head = this.head = new nexacro._DatePickerHeadControl("head", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var body = this.body = new nexacro._DatePickerBodyControl("body", 0, 0, 0, 0, null, null, null, null, null, null, this);

			head.createComponent(true);
			body.createComponent(true);
		}
	};

	_pDatePickerControl.on_created_contents = function (win) {
		var control_elem = this.getElement();
		if (control_elem) {
			var head = this.head;
			var body = this.body;

			head._setEventHandler("onclick", this._on_head_onheadclick, this);
			head._setEventHandler("onspin", this._on_head_onheadspin, this);
			head._setEventHandler("onkeydown", this._on_head_onkeydown, this);

			body._setEventHandler("ondayclick", this._on_body_ondayclick, this);
			body._setEventHandler("onkeydown", this._on_body_onkeydown, this);

			head.on_created(win);
			body.on_created(win);

			this._recalcLayout();
		}
	};

	_pDatePickerControl.on_create_contents_command = function () {
		var head = this.head;
		var body = this.body;

		var str = "";
		if (head) {
			str += head.createCommand();
		}
		if (body) {
			str += body.createCommand();
		}

		return str;
	};

	_pDatePickerControl.on_attach_contents_handle = function (win) {
		var head = this.head;
		var body = this.body;

		head._setEventHandler("onclick", this._on_head_onheadclick, this);
		head._setEventHandler("onspin", this._on_head_onheadspin, this);
		head._setEventHandler("onkeydown", this._on_head_onkeydown, this);

		body._setEventHandler("ondayclick", this._on_body_ondayclick, this);
		body._setEventHandler("onkeydown", this._on_body_onkeydown, this);

		body.attachHandle(win);
		head.attachHandle(win);

		this._recalcLayout();
	};

	_pDatePickerControl.on_destroy_contents = function () {
		if (this.head) {
			this.head.destroy();
			this.head = null;
		}
		if (this.body) {
			this.body.destroy();
			this.body = null;
		}
	};

	_pDatePickerControl.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};

	_pDatePickerControl.on_apply_prop_enable = function (v) {
		var head = this.head;
		var body = this.body;

		if (head) {
			head._setEnable(v);
		}

		if (body) {
			body._setEnable(v);
		}
	};

	_pDatePickerControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pDatePickerControl.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var head = this.head;
		if (head) {
			head.set_readonly(readonly);
		}

		var body = this.body;
		if (body) {
			body.set_readonly(readonly);
		}
	};


	_pDatePickerControl._on_head_onkeydown = function (obj, e) {
		var keycode = e.keycode;
		var enableaccessibility = nexacro._enableaccessibility;

		if ((e.fromreferenceobject.id == "spinedit") && keycode != 13) {
			return;
		}

		this._changeDate(obj, e);

		if (!enableaccessibility) {
			if (!(obj instanceof nexacro._CalendarEditControl) && (keycode == 13 || keycode == 37 || keycode == 38 || keycode == 39 || keycode == 40)) {
				this.on_fire_ondayclick(obj);
			}
		}
	};

	_pDatePickerControl._on_head_onheadclick = function (obj, e) {
		var calendar = this.parent;
		if (calendar && calendar._onlydisplay == true) {
			calendar.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, calendar, obj, e.meta_key);
			return false;
		}

		if (!this.enable || this.readonly) {
			return false;
		}

		var head = this.head;
		var body = this.body;

		body._setDate(head._date.str_year, head._date.str_month, body._date.str_day);
	};

	_pDatePickerControl._on_head_onheadspin = function (obj, e) {
		var calendar = this.parent;
		if (calendar && calendar._onlydisplay == true) {
			return false;
		}

		if (!this.enable || this.readonly == true) {
			return false;
		}

		var head = this.head;
		var body = this.body;

		body._setDate(head._date.str_year, head._date.str_month, body._date.str_day);
	};

	_pDatePickerControl._on_body_ondayclick = function (obj, e) {
		this.on_fire_ondayclick(obj, e);
	};

	_pDatePickerControl._on_body_onkeydown = function (obj, e) {
		var keycode = e.keycode;
		var enableaccessibility = nexacro._enableaccessibility;

		this._changeDate(obj, e);

		if (!enableaccessibility) {
			if (!(obj instanceof nexacro._CalendarEditControl || obj instanceof nexacro._CalendarDropButtonControl) && (keycode == 37 || keycode == 38 || keycode == 39 || keycode == 40)) {
				this.on_fire_ondayclick(obj);
			}
		}
	};

	_pDatePickerControl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key) {
		var control_name = refer_comp.name;
		if (control_name == "head" || control_name == "prevbutton" || control_name == "nextbutton" || 
			control_name == "body" || control_name == "weekband" || control_name.indexOf("weekitem") > -1 || control_name.indexOf("dayitem") > -1) {
			this._refreshSpindate();
		}
	};

	_pDatePickerControl.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) {
		var control_name = refer_comp.name;
		if (control_name == "head" || control_name == "prevbutton" || control_name == "nextbutton" || 
			control_name == "body" || control_name == "weekband" || control_name.indexOf("weekitem") > -1 || control_name.indexOf("dayitem") > -1) {
			this._refreshSpindate();
		}
	};

	_pDatePickerControl.on_fire_oncloseup = function (obj) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			return this.oncloseup._fireEvent(this);
		}
		return false;
	};

	_pDatePickerControl.on_fire_ondayclick = function (obj, e) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			if (!e) {
				var item = this.body._getDayItem(this._selected_day);
				e = new nexacro.CalendarDayClickEventInfo(item, "ondayclick", this._value);
			}
			return this.ondayclick._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerControl._on_button_onnextlbuttondown = function () {
		var calendar = this.parent;
		if (calendar && calendar._onlydisplay == true) {
			return false;
		}

		var head = this.head;
		if (!head.enable || head.readonly) {
			return false;
		}

		var year = head._date.int_year;
		var month = head._date.int_month;
		if ((month += 1) > 12) {
			month = 1;
			if ((year += 1) > 9999) {
				year = 0;
			}
		}

		head._setDate(year, month);
		head._refreshSpindate();

		this._on_head_onheadclick();
	};

	_pDatePickerControl._on_button_onprevlbuttondown = function () {
		var calendar = this.parent;
		if (calendar && calendar._onlydisplay == true) {
			return false;
		}

		var head = this.head;
		if (!head.enable || head.readonly) {
			return false;
		}

		var year = head._date.int_year;
		var month = head._date.int_month;
		if ((month -= 1) <= 0) {
			month = 12;
			if ((year -= 1) < 0) {
				year = 9999;
			}
		}

		head._setDate(year, month);
		head._refreshSpindate();

		this._on_head_onheadclick();
	};

	_pDatePickerControl._setValue = function (v) {
		this._value = v;
		this.on_apply_value(v);
	};

	_pDatePickerControl.on_apply_value = function (value) {
		var year = value.substr(0, 4);
		var month = value.substr(4, 2);
		var day = value.substr(6, 2);

		this._selected_year = year;
		this._selected_month = month;
		this._selected_day = day;

		var head = this.head;
		if (head) {
			head._setDate(year, month);
			head._recalcLayout();
		}

		var body = this.body;
		if (body) {
			body._setDate(year, month, day);
		}
	};

	_pDatePickerControl._setHeadformatText = function () {
		var head = this.head;
		if (head) {
			head._setDate(head._date.str_year, head._date.str_month);
			head._recalcLayout();
		}
	};

	_pDatePickerControl._setWeekformatText = function () {
		var body = this.body;
		if (body) {
			body._setWeekformatText();
		}
	};

	_pDatePickerControl._getInnerDataset = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.getInnerDataset();
		}

		return null;
	};

	_pDatePickerControl._getBackgroundcolumn = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.backgroundcolumn;
		}

		return null;
	};

	_pDatePickerControl._getBordercolumn = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.bordercolumn;
		}

		return null;
	};

	_pDatePickerControl._getDatecolumn = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.datecolumn;
		}

		return null;
	};

	_pDatePickerControl._getTextcolorcolumn = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.textcolorcolumn;
		}

		return null;
	};

	_pDatePickerControl._getHeadheight = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.headheight;
		}

		return null;
	};

	_pDatePickerControl._getDaysize = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.daysize;
		}

		return "";
	};

	_pDatePickerControl._getHeadformat = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.headformat;
		}

		return null;
	};

	_pDatePickerControl._getWeekformat = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.weekformat;
		}

		return null;
	};

	_pDatePickerControl._getUsetrailingday = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.usetrailingday;
		}

		return false;
	};

	_pDatePickerControl._getShowmonthspin = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.showmonthspin;
		}

		return false;
	};

	_pDatePickerControl._getShowyearspin = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar.showyearspin;
		}

		return false;
	};

	_pDatePickerControl._getCurrentDate = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar._getCurrentDate();
		}

		return "";
	};

	_pDatePickerControl._getEndDay = function (year, month) {
		var calendar = this.parent;
		if (calendar) {
			return calendar._getEndDay(year, month);
		}

		return "";
	};


	_pDatePickerControl._changeDate = function (obj, e) {
		var body = this.body;
		var body_date = body._date;
		var year = body_date.int_year;
		var month = body_date.int_month;
		var day = body_date.int_day;
		var endday = this._getEndDay(year, month);

		var is_full_changed = false;
		var inc_month = false;
		var inc_day = false;
		var dec_month = false;
		var dec_day = false;
		var enableaccessibility = nexacro._enableaccessibility;
		var keycode = e.keycode;

		if (keycode == 37 || keycode == 38 || keycode == 39 || keycode == 40 || keycode == 13) {
			switch (keycode) {
				case 13:
					var date = new nexacro.Date(year, month - 1, day);
					year = date.getFullYear();
					month = date.getMonth() + 1;
					day = date.getDate();
					break;
				case 37:
					if (e.ctrlkey) {
						dec_month = true;
					}
					else {
						dec_day = true;
					}

					if (dec_day) {
						day -= 1;
						if (day <= 0) {
							dec_month = true;
						}
					}

					if (dec_month) {
						month -= 1;
						if (month <= 0) {
							if (year <= 0) {
								year = 9999;
							}
							else {
								year -= 1;
							}

							month = 12;
						}

						if (!e.ctrlkey) {
							day += this._getEndDay(year, month);
						}
						is_full_changed = true;
					}
					break;
				case 38:
					if (e.ctrlkey) {
						year -= 1;
						is_full_changed = true;
					}
					else if (!enableaccessibility) {
						day -= 7;
						if (day <= 0) {
							if (month <= 1) {
								month = 12;

								if (year <= 0) {
									year = 9999;
								}
								else {
									year -= 1;
								}
							}
							else {
								month -= 1;
							}

							day += this._getEndDay(year, month);
						}
					}
					break;
				case 39:
					if (e.ctrlkey) {
						inc_month = true;
					}
					else {
						inc_day = true;
					}

					if (inc_day) {
						day += 1;
						if (day > endday) {
							inc_month = true;
						}
					}

					if (inc_month) {
						month += 1;
						if (month > 12) {
							if (year >= 9999) {
								year = 0;
							}
							else {
								year += 1;
							}

							month = 1;
						}

						if (inc_day) {
							day -= endday;
						}
						is_full_changed = true;
					}
					break;
				case 40:
					if (e.ctrlkey) {
						year += 1;
						is_full_changed = true;
					}
					else if (!enableaccessibility) {
						day += 7;
						if (day > endday) {
							if (month >= 12) {
								month = 1;

								if (year >= 9999) {
									year = 0;
								}
								else {
									year += 1;
								}
							}
							else {
								month += 1;
							}

							day -= endday;
						}
					}
					break;
			}

			year = nexacro._toString(year).padLeft(4, "0");
			month = nexacro._toString(month).padLeft(2, "0");
			day = nexacro._toString(day).padLeft(2, "0");
			this._setValue(year + month + day);

			if (nexacro._enableaccessibility) {
				if (is_full_changed) {
					var item = this.body._getDayItem(this._selected_day);
					item._setAccessibilityLabel(year + " " + month + " " + day);
				}
				var calendar = this.parent;
				if (calendar) {
					var calendaredit = calendar.calendaredit;
					if (calendaredit) {
						calendaredit._setAccessibilityLabel(is_full_changed ? year + " " + month + " " + day : day);
					}
				}
			}
		}

		if (enableaccessibility) {
			if (keycode == 13) {
				this.on_fire_ondayclick(obj);
			}
			else if (keycode == 27) {
				this.parent._closePopup();
			}
		}
	};

	_pDatePickerControl._recalcLayout = function () {
		if (this._is_created_contents) {
			var headheight = this._getHeadheight();

			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			if (!headheight) {
				headheight = client_height / 8;
			}

			var body_l = 0;
			var body_t = 0 + headheight;
			var body_w = client_width;
			var body_h = client_height - headheight;

			var head_l = 0;
			var head_t = 0;
			var head_w = client_width;
			var head_h = headheight;

			this.body.move(body_l, body_t, body_w, body_h, null, null);
			this.head.move(head_l, head_t, head_w, head_h, null, null);
		}
	};

	_pDatePickerControl._refreshSpindate = function () {
		var head = this.head;
		if (this._is_created) {
			if (head) {
				head._refreshSpindate();
			}
		}
	};

	_pDatePickerControl._refreshDay = function () {
		var body = this.body;
		if (this._is_created) {
			if (body) {
				body._refreshDay();
			}
		}
	};

	_pDatePickerControl._on_beforerepeat = function (refer_comp) {
		var head = this.head;
		if (head) {
			return head._on_beforerepeat(refer_comp);
		}
	};

	delete _pDatePickerControl;

	nexacro._DatePickerHeadControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._date = {
			str_year : "", 
			str_month : "", 
			int_year : 0, 
			int_month : 0
		};
	};

	var _pDatePickerHeadControl = nexacro._createPrototype(nexacro.Component, nexacro._DatePickerHeadControl);
	nexacro._DatePickerHeadControl.prototype = _pDatePickerHeadControl;
	_pDatePickerHeadControl._type_name = "DatePickerHeadControl";
	_pDatePickerHeadControl._is_subcontrol = true;


	_pDatePickerHeadControl.prevbutton = null;
	_pDatePickerHeadControl.nextbutton = null;
	_pDatePickerHeadControl.yearstatic = null;
	_pDatePickerHeadControl.monthstatic = null;
	_pDatePickerHeadControl.yearspin = null;
	_pDatePickerHeadControl.monthspin = null;




	_pDatePickerHeadControl._use_readonly_status = true;


	_pDatePickerHeadControl._event_list = {
		"onclick" : 1, 
		"onspin" : 1, 
		"onkeydown" : 1
	};

	_pDatePickerHeadControl.on_create_contents = function () {
		var prevbutton = this.prevbutton = new nexacro.Button("prevbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
		var nextbutton = this.nextbutton = new nexacro.Button("nextbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
		var yearstatic = this.yearstatic = new nexacro.Static("yearstatic", 0, 0, 0, 0, null, null, null, null, null, null, this);
		var monthstatic = this.monthstatic = new nexacro.Static("monthstatic", 0, 0, 0, 0, null, null, null, null, null, null, this);
		var yearspin = this.yearspin = new nexacro._YearSpinControl("yearspin", 0, 0, 0, 0, null, null, null, null, null, null, this);
		var monthspin = this.monthspin = new nexacro._MonthSpinControl("monthspin", 0, 0, 0, 0, null, null, null, null, null, null, this);

		prevbutton._setControl();
		nextbutton._setControl();
		yearstatic._setControl();
		monthstatic._setControl();
		yearspin._setControl();
		monthspin._setControl();

		prevbutton.createComponent(true);
		nextbutton.createComponent(true);
		yearstatic.createComponent(true);
		monthstatic.createComponent(true);
		yearspin.createComponent(true);
		monthspin.createComponent(true);

		yearspin.set_visible(false);
		yearspin.set_min("0");
		yearspin.set_max("9999");
		yearspin.set_circulation(true);
		yearspin.set_displaycomma(false);

		monthspin.set_visible(false);
		monthspin.set_min("1");
		monthspin.set_max("12");
		monthspin.set_circulation(true);
		monthspin.set_displaycomma(false);
	};

	_pDatePickerHeadControl.on_created_contents = function (win) {
		this.on_apply_prop_enable(this.enable);

		var prevbutton = this.prevbutton;
		var nextbutton = this.nextbutton;
		var yearstatic = this.yearstatic;
		var monthstatic = this.monthstatic;
		var yearspin = this.yearspin;
		var monthspin = this.monthspin;

		if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
			yearstatic._setEventHandler("onclick", this._on_static_mobile_onclick, this);
			monthstatic._setEventHandler("onclick", this._on_static_mobile_onclick, this);
		}
		yearstatic._setEventHandler("onlbuttondown", this._on_static_onlbuttondown, this);
		monthstatic._setEventHandler("onlbuttondown", this._on_static_onlbuttondown, this);
		prevbutton._setEventHandler("onclick", this._on_button_onprevclick, this);
		nextbutton._setEventHandler("onclick", this._on_button_onnextclick, this);
		yearspin._setEventHandler("onspin", this._on_spin_onspin, this);
		monthspin._setEventHandler("onspin", this._on_spin_onspin, this);
		yearspin._setEventHandler("onkeydown", this._on_spin_onkeydown, this);
		monthspin._setEventHandler("onkeydown", this._on_spin_onkeydown, this);

		prevbutton.on_created(win);
		nextbutton.on_created(win);
		yearstatic.on_created(win);
		monthstatic.on_created(win);
		yearspin.on_created(win);
		monthspin.on_created(win);

		yearspin.set_value(this._date.str_year);
		monthspin.set_value(this._date.str_month);

		if (this.parent._is_popupcontains) {
			yearspin._setEnableView(false);
			monthspin._setEnableView(false);
		}
		this._refreshSpindate();
	};

	_pDatePickerHeadControl.on_create_contents_command = function () {
		this._refreshSpindate();

		var str = "";
		if (this.prevbutton) {
			str += this.prevbutton.createCommand();
		}
		if (this.nextbutton) {
			str += this.nextbutton.createCommand();
		}
		if (this.yearstatic) {
			str += this.yearstatic.createCommand();
		}
		if (this.monthstatic) {
			str += this.monthstatic.createCommand();
		}
		if (this.yearspin) {
			str += this.yearspin.createCommand();
		}
		if (this.monthspin) {
			str += this.monthspin.createCommand();
		}

		return str;
	};

	_pDatePickerHeadControl.on_attach_contents_handle = function (win) {
		var prevbutton = this.prevbutton;
		var nextbutton = this.nextbutton;
		var yearstatic = this.yearstatic;
		var monthstatic = this.monthstatic;
		var yearspin = this.yearspin;
		var monthspin = this.monthspin;

		if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
			yearstatic._setEventHandler("onclick", this._on_static_mobile_onclick, this);
			monthstatic._setEventHandler("onclick", this._on_static_mobile_onclick, this);
		}

		yearstatic._setEventHandler("onlbuttondown", this._on_static_onlbuttondown, this);
		monthstatic._setEventHandler("onlbuttondown", this._on_static_onlbuttondown, this);
		prevbutton._setEventHandler("onclick", this._on_button_onprevclick, this);
		nextbutton._setEventHandler("onclick", this._on_button_onnextclick, this);
		yearspin._setEventHandler("onspin", this._on_spin_onspin, this);
		monthspin._setEventHandler("onspin", this._on_spin_onspin, this);
		yearspin._setEventHandler("onkeydown", this._on_spin_onkeydown, this);
		monthspin._setEventHandler("onkeydown", this._on_spin_onkeydown, this);

		prevbutton.attachHandle(win);
		nextbutton.attachHandle(win);
		yearstatic.attachHandle(win);
		monthstatic.attachHandle(win);
		yearspin.attachHandle(win);
		monthspin.attachHandle(win);

		yearspin.set_value(this._date.str_year);
		monthspin.set_value(this._date.str_month);

		if (this.parent._is_popupcontains) {
			yearspin._setEnableView(false);
			monthspin._setEnableView(false);
		}
	};

	_pDatePickerHeadControl.on_destroy_contents = function () {
		this._date = null;

		if (this.prevbutton) {
			this.prevbutton.destroy();
			this.prevbutton = null;
		}
		if (this.nextbutton) {
			this.nextbutton.destroy();
			this.nextbutton = null;
		}
		if (this.yearstatic) {
			this.yearstatic.destroy();
			this.yearstatic = null;
		}
		if (this.monthstatic) {
			this.monthstatic.destroy();
			this.monthstatic = null;
		}
		if (this.yearspin) {
			this.yearspin.destroy();
			this.yearspin = null;
		}
		if (this.monthspin) {
			this.monthspin.destroy();
			this.monthspin = null;
		}
	};

	_pDatePickerHeadControl.on_change_containerRect = function (widht, height) {
		this._recalcLayout();
	};

	_pDatePickerHeadControl.on_apply_prop_enable = function (v) {
		if (this.prevbutton) {
			this.prevbutton._setEnable(v);
		}
		if (this.nextbutton) {
			this.nextbutton._setEnable(v);
		}
		if (this.yearstatic) {
			this.yearstatic._setEnable(v);
		}
		if (this.monthstatic) {
			this.monthstatic._setEnable(v);
		}
		if (this.yearspin) {
			this.yearspin._setEnable(v);
		}
		if (this.monthspin) {
			this.monthspin._setEnable(v);
		}
	};

	_pDatePickerHeadControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pDatePickerHeadControl.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var control_elem = this.getElement();
		if (control_elem) {
			var yearspin = this.yearspin;
			if (yearspin) {
				yearspin.set_readonly(readonly);
			}
			var monthspin = this.monthspin;
			if (monthspin) {
				monthspin.set_readonly(readonly);
			}
		}
	};

	_pDatePickerHeadControl._on_static_mobile_onclick = function (obj, e) {
		var calendar = this.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			calendar.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, calendar, obj, e.meta_key);
			return false;
		}
		var yearstatic = this.yearstatic;
		var monthstatic = this.monthstatic;
		var yearspin = this.yearspin;
		var monthspin = this.monthspin;

		var control_name = obj.name;
		if (control_name == "yearstatic") {
			yearstatic.set_visible(false);
			yearspin.set_visible(true);
		}
		else if (control_name == "monthstatic") {
			monthstatic.set_visible(false);
			monthspin.set_visible(true);
		}
	};

	_pDatePickerHeadControl._on_static_onlbuttondown = function (obj, e) {
		var calendar = this.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			return false;
		}

		var yearstatic = this.yearstatic;
		var monthstatic = this.monthstatic;
		var yearspin = this.yearspin;
		var monthspin = this.monthspin;

		var comp_name = obj.name;
		if (comp_name == "yearstatic") {
			yearstatic.set_visible(false);
			yearspin.set_visible(true);
		}
		else if (comp_name == "monthstatic") {
			monthstatic.set_visible(false);
			monthspin.set_visible(true);
		}
	};

	_pDatePickerHeadControl._on_button_onprevclick = function (obj, e) {
		var calendar = this.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			calendar.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, calendar, obj, e.meta_key);
		}

		if (!this.enable || this.readonly) {
			return false;
		}

		var year = this._date.int_year;
		var month = this._date.int_month;
		if ((month -= 1) <= 0) {
			month = 12;
			if ((year -= 1) < 0) {
				year = 9999;
			}
		}

		this._setDate(year, month);
		this._refreshSpindate();

		this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, obj, e.meta_key);
	};

	_pDatePickerHeadControl._on_button_onnextclick = function (obj, e) {
		var calendar = this.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			calendar.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, calendar, obj, e.meta_key);
			return false;
		}

		if (!this.enable || this.readonly) {
			return false;
		}

		var year = this._date.int_year;
		var month = this._date.int_month;
		if ((month += 1) > 12) {
			month = 1;
			if ((year += 1) > 9999) {
				year = 0;
			}
		}

		this._setDate(year, month);
		this._refreshSpindate();

		this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, obj, e.meta_key);
	};

	_pDatePickerHeadControl._on_spin_onspin = function (obj, e) {
		var v = nexacro._toString(e.postvalue);

		var year = this._date.str_year;
		var month = this._date.str_month;

		var control_name = obj.name;
		if (control_name == "yearspin") {
			year = v;
		}
		else if (control_name == "monthspin") {
			month = v;
		}

		this._setDate(year, month);
		this.on_fire_onspin(obj, e);
	};

	_pDatePickerHeadControl._on_spin_onkeydown = function (obj, e) {
		if (e.keycode == nexacro.Event.KEY_ENTER) {
			var year = this._date.str_year;
			var month = this._date.str_month;

			var control_name = obj.name;
			if (control_name == "yearspin") {
				year = obj.text;
			}
			else if (control_name == "monthspin") {
				month = obj.text;
			}

			this._setDate(year, month);
			this.on_fire_onspin(obj, e);
		}
	};

	_pDatePickerHeadControl.on_fire_onspin = function (obj, preText, preValue, postText, postValue, isUp) {
		if (this.onspin && this.onspin._has_handlers) {
			var evt = new nexacro.SpinEventInfo(obj, "onspin", preText, preValue, postText, postValue, isUp);
			return this.onspin._fireEvent(this, evt);
		}
		return true;
	};

	_pDatePickerHeadControl._refreshSpindate = function () {
		var yearstatic = this.yearstatic;
		var monthstatic = this.monthstatic;
		var yearspin = this.yearspin;
		var monthspin = this.monthspin;
		if (yearstatic || monthstatic) {
			var bShowyear = this._getShowyearspin();
			var bShowmonth = this._getShowmonthspin();
			if (bShowyear) {
				if (bShowmonth) {
					yearstatic.set_visible(false);
					monthstatic.set_visible(false);
					yearspin.set_visible(true);
					monthspin.set_visible(true);
				}
				else {
					yearstatic.set_visible(false);
					monthstatic.set_visible(true);
					yearspin.set_visible(true);
					monthspin.set_visible(false);
				}
			}
			else {
				if (bShowmonth) {
					yearstatic.set_visible(true);
					monthstatic.set_visible(false);
					yearspin.set_visible(false);
					monthspin.set_visible(true);
				}
				else {
					yearstatic.set_visible(true);
					monthstatic.set_visible(true);
					yearspin.set_visible(false);
					monthspin.set_visible(false);
				}
			}
		}
	};

	_pDatePickerHeadControl._recalcLayout = function () {
		if (this._is_created_contents) {
			var headformat = this._getHeadformat();

			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();

			var year_size = 0, year_l = 0, year_w = 0;
			var month_size = 0, month_l = 0, month_w = 0;

			var prevbutton = this.prevbutton;
			if (prevbutton) {
				prevbutton.move(0, 0, client_h, client_h, null, null);
			}

			var nextbutton = this.nextbutton;
			if (nextbutton) {
				nextbutton.move(client_w - client_h, 0, client_h, client_h, null, null);
			}

			var yearstatic = this.yearstatic;
			if (yearstatic) {
				year_size = yearstatic._on_getFitSize();
				year_w = year_size[0];
			}

			var monthstatic = this.monthstatic;
			if (monthstatic) {
				month_size = monthstatic._on_getFitSize();
				month_w = month_size[0];
			}

			var offset_x = ((client_w / 2) - ((year_w + month_w) / 2));

			if (headformat == "MM.yyyy") {
				month_l = offset_x;
				year_l = offset_x + month_w;
			}
			else {
				year_l = offset_x;
				month_l = offset_x + year_w;
			}

			if (yearstatic) {
				yearstatic.move(year_l, 0, year_w, client_h, null, null);
			}

			if (monthstatic) {
				monthstatic.move(month_l, 0, month_w, client_h, null, null);
			}

			var yearspin = this.yearspin;
			if (yearspin) {
				year_size = this._getSpinControlSize("year");
				year_w = year_size + client_h;
			}

			var monthspin = this.monthspin;
			if (monthspin) {
				month_size = this._getSpinControlSize("month");
				month_w = month_size + client_h;
			}

			offset_x = ((client_w / 2) - ((year_w + month_w) / 2));

			if (headformat == "MM.yyyy") {
				month_l = offset_x;
				year_l = offset_x + month_w;
			}
			else {
				year_l = offset_x;
				month_l = offset_x + year_w;
			}

			if (yearspin) {
				yearspin.move(year_l, 0, year_w, client_h, null, null);
			}

			if (monthspin) {
				monthspin.move(month_l, 0, month_w, client_h, null, null);
			}
		}
	};

	_pDatePickerHeadControl._on_beforerepeat = function (refer_comp) {
		if (refer_comp == this.prevbutton || refer_comp == this.nextbutton || refer_comp instanceof nexacro._SpinButtonControl) {
			return [true, true];
		}

		return [false, true];
	};

	_pDatePickerHeadControl._setDate = function (year, month) {
		var date = this._date;
		if (date) {
			date.str_year = nexacro._toString(year).padLeft(4, "0");
			date.str_month = nexacro._toString(month).padLeft(2, "0");
			date.int_year = +year;
			date.int_month = +month;
		}

		var yearstatic = this.yearstatic;
		var yearspin = this.yearspin;
		var monthstatic = this.monthstatic;
		var monthspin = this.monthspin;

		if (this._getHeadformat() == "MM.yyyy") {
			yearstatic.set_text(date.str_year);
			monthstatic.set_text(date.str_month + ".");
		}
		else {
			yearstatic.set_text(date.str_year + ".");
			monthstatic.set_text(date.str_month);
		}

		yearspin.set_value(date.str_year);
		monthspin.set_value(date.str_month);
	};

	_pDatePickerHeadControl._getHeadheight = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getHeadheight();
		}

		return null;
	};

	_pDatePickerHeadControl._getHeadformat = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getHeadformat();
		}

		return null;
	};

	_pDatePickerHeadControl._getShowyearspin = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar._getShowyearspin();
		}

		return null;
	};

	_pDatePickerHeadControl._getShowmonthspin = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getShowmonthspin();
		}

		return null;
	};

	_pDatePickerHeadControl._getSpinControlSize = function (type) {
		var control;
		switch (type) {
			case "year":
				control = this.yearspin;
				break;
			case "month":
				control = this.monthspin;
				break;
		}

		var total_w = 0;
		if (control) {
			var border = control._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
			}

			var padding = control._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
			}

			var spinedit = control.spinedit;
			if (spinedit) {
				var tmp = spinedit.text;
				if (tmp.length == 1 && type == "month") {
					spinedit.text += ".0";
				}
				else if (tmp.length < 4 && type == "year") {
					spinedit.text = "0000.";
				}
				else {
					spinedit.text += ".";
				}
				total_w += spinedit._on_getFitSize()[0];
				spinedit.text = tmp;
			}
		}

		return total_w;
	};

	nexacro._DatePickerBodyControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._weekitems = [];
		this._dayitems = [];
		this._changedDays = [];

		this._date = {
			str_year : "", 
			str_month : "", 
			str_day : "", 
			int_year : 0, 
			int_month : 0, 
			int_day : 0
		};
	};

	var _pDatePickerBodyControl = nexacro._createPrototype(nexacro.Component, nexacro._DatePickerBodyControl);
	nexacro._DatePickerBodyControl.prototype = _pDatePickerBodyControl;
	_pDatePickerBodyControl._type_name = "DatePickerBodyControl";


	_pDatePickerBodyControl.weekband = null;


	_pDatePickerBodyControl._preday = "";
	_pDatePickerBodyControl._maxWeek = 7;
	_pDatePickerBodyControl._maxDay = 42;


	_pDatePickerBodyControl._is_subcontrol = true;
	_pDatePickerBodyControl._use_readonly_status = true;
	_pDatePickerBodyControl._is_locale_control = true;


	_pDatePickerBodyControl._event_list = {
		"onclick" : 1, 
		"ondayclick" : 1, 
		"onkeydown" : 1
	};

	_pDatePickerBodyControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var weekband = this.weekband = new nexacro.Static("weekband", 0, 0, 0, 0, null, null, null, null, null, null, this);
			weekband._setControl();
			weekband.createComponent(true);

			var weekformat = this._getWeekformat();
			var weeks = this._weekitems;
			var days = this._dayitems;
			var maxWeek = this._maxWeek;
			var maxDay = this._maxDay;
			var weekstatic, daystatic;
			for (var i = 0; i < maxWeek; i++) {
				weekstatic = weeks[i] = new nexacro._DatePickerWeekItemControl("weekitem" + i, 0, 0, 0, 0, null, null, null, null, null, null, this);
				weekstatic.set_text(weekformat[i]);
				weekstatic._setDaysOfWeek(i % 7);

				weekstatic.createComponent(true);
			}

			for (i = 0; i < maxDay; i++) {
				daystatic = days[i] = new nexacro._DatePickerDayItemControl("dayitem" + i, 0, 0, 0, 0, null, null, null, null, null, null, this);
				daystatic._setDaysOfWeek(i % 7);

				daystatic.createComponent(true);
			}
		}
	};

	_pDatePickerBodyControl.on_created_contents = function (win) {
		var control_elem = this.getElement();
		if (control_elem) {
			var weeks = this._weekitems;
			var days = this._dayitems;
			var maxWeek = this._maxWeek;
			var maxDay = this._maxDay;

			this.weekband.on_created(win);

			for (var i = 0; i < maxWeek; i++) {
				weeks[i].on_created(win);
			}
			for (i = 0; i < maxDay; i++) {
				days[i]._setEventHandler("onclick", this._on_dayitem_ondayclick, this);
				days[i].on_created(win);
			}
		}
	};

	_pDatePickerBodyControl.on_create_contents_command = function () {
		var weekband = this.weekband;
		var weeks = this._weekitems;
		var days = this._dayitems;
		var maxWeek = this._maxWeek;
		var maxDay = this._maxDay;

		var str = "";
		str += weekband.createCommand();
		for (var i = 0; i < maxWeek; i++) {
			str += weeks[i].createCommand();
		}

		for (i = 0; i < maxDay; i++) {
			str += days[i].createCommand();
		}

		return str;
	};

	_pDatePickerBodyControl.on_attach_contents_handle = function (win) {
		var weekband = this.weekband;
		var weeks = this._weekitems;
		var days = this._dayitems;
		var maxWeek = this._maxWeek;
		var maxDay = this._maxDay;

		weekband.attachHandle(win);

		for (var i = 0; i < maxWeek; i++) {
			weeks[i].attachHandle(win);
		}
		for (i = 0; i < maxDay; i++) {
			days[i]._setEventHandler("onclick", this._on_dayitem_ondayclick, this);
			days[i].attachHandle(win);
		}
	};

	_pDatePickerBodyControl.on_destroy_contents = function () {
		if (this.weekband) {
			this.weekband.destroy();
			this.weekband = null;
		}

		var weeks = this._weekitems;
		var days = this._dayitems;
		var maxWeek = this._maxWeek;
		var maxDay = this._maxDay;

		for (var i = 0; i < maxWeek; i++) {
			weeks[i].destroy();
		}

		for (i = 0; i < maxDay; i++) {
			days[i].destroy();
		}

		this._weekitems = null;
		this._dayitems = null;
		this._changedDays = null;
		this._date = null;
	};

	_pDatePickerBodyControl.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};

	_pDatePickerBodyControl.on_apply_prop_enable = function (enable) {
		var i;
		var weeks = this._weekitems;
		var days = this._dayitems;
		var maxWeek = this._maxWeek;
		var maxDay = this._maxDay;

		if (this.weekband) {
			this.weekband._setEnable(enable);
		}

		for (i = 0; i < maxWeek; i++) {
			weeks[i]._setEnable(enable);
		}

		for (i = 0; i < maxDay; i++) {
			days[i]._setEnable(enable);
		}
	};

	_pDatePickerBodyControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pDatePickerBodyControl.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var weeks = this._weekitems;
		var days = this._dayitems;
		var maxWeek = this._maxWeek;
		var maxDay = this._maxDay;

		for (var i = 0; i < maxWeek; i++) {
			weeks[i].set_readonly(readonly);
		}

		for (i = 0; i < maxDay; i++) {
			days[i].set_readonly(readonly);
		}
	};

	_pDatePickerBodyControl._on_dayitem_ondayclick = function (obj, e) {
		var calendar = this.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			calendar.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, calendar, obj, e.meta_key);
			return false;
		}

		this.on_fire_ondayclick(obj, e);
	};

	_pDatePickerBodyControl.on_fire_ondayclick = function (obj, e) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			return this.ondayclick._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerBodyControl._recalcLayout = function () {
		if (this._is_created_contents) {
			var weeks = this._weekitems;
			var days = this._dayitems;
			var maxWeek = this._maxWeek;
			var maxDay = this._maxDay;

			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();
			var client_l = this._getClientLeft();
			var client_t = this._getClientTop();

			var daysize = this._getDaysize();

			var item_w = daysize.width;
			var item_h = daysize.height;

			var drawWidth_daysize = item_w *  7;
			var drawHeight_daysize = item_h *  7;

			var blankWidth = 0;
			var blankHeight = 0;
			if (drawWidth_daysize < client_w) {
				blankWidth = (client_w - drawWidth_daysize) / 14;
			}
			if (drawHeight_daysize < client_h) {
				blankHeight = (client_h - drawHeight_daysize) / 8;
			}

			var week_l = client_l + blankWidth;
			var week_t = client_t + (blankHeight / 2);

			this.weekband.move(client_l, week_t, client_w, item_h, null, null);
			var i;
			for (i = 0; i < maxWeek; i++) {
				weeks[i].move(week_l, week_t, item_w, item_h, null, null);
				week_l = week_l + item_w + (blankWidth *  2);
			}

			var day_l = client_l + blankWidth;
			var day_t = week_t + item_h + blankHeight;
			for (i = 0; i < maxDay; i++) {
				days[i].move(day_l, day_t, item_w, item_h, null, null);
				day_l = day_l + item_w + (blankWidth *  2);
				if (((i + 1) % 7) == 0) {
					day_l = client_l + blankWidth;
					day_t = day_t + item_h + blankHeight;
				}
			}
		}
	};

	_pDatePickerBodyControl._refreshDay = function () {
		var day, control_elem = this.getElement();
		if (control_elem) {
			var dayInfo = {
			};
			var trailingdayinfo = {
			};

			var date = this._date;
			var year = date.int_year;
			var month = date.int_month;
			day = date.int_day;

			var tempDate = new Date(year, month - 1, 1);

			if (year < 100) {
				tempDate.setFullYear(year);
			}

			var N = nexacro.Calendar.EndDayNormal;
			var L = nexacro.Calendar.EndDayLeap;

			var firstDay = tempDate.getDay();
			var endDay = this._getLeapYear(year) ? L[month - 1] : N[month - 1];

			var usetrailingday = this._getUsetrailingday();
			if (usetrailingday) {
				trailingdayinfo = this._getUseTrailingDayInfo(year, month, tempDate, endDay);
			}

			var days = this._dayitems;
			var maxDay = this._maxDay;
			var dayCount = 1;
			var daysofweek = -1;

			for (var i = 0; i < maxDay; i++) {
				if (firstDay <= i && endDay >= dayCount) {
					dayInfo = this._getDayInfo(dayCount, false, true, year, month);

					this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);

					daysofweek = i % 7;
					if (daysofweek == 0) {
						days[i]._changeUserStatus("sunday", true);
					}
					else if (daysofweek == 6) {
						days[i]._changeUserStatus("saturday", true);
					}
					else {
						if (this._isToday(dayInfo.day)) {
							days[i]._changeUserStatus("today", true);
						}
						else {
							days[i]._changeUserStatus("day", true);
						}
					}

					dayCount++;
				}
				else {
					if (usetrailingday) {
						if (trailingdayinfo.idx >= 0) {
							dayInfo = this._getDayInfo(trailingdayinfo.pre_endDay - trailingdayinfo.idx, true, true, trailingdayinfo.prev_year, trailingdayinfo.prev_month);
							trailingdayinfo.idx--;
						}
						else {
							dayInfo = this._getDayInfo(trailingdayinfo.next_beginDay, true, true, trailingdayinfo.next_year, trailingdayinfo.next_month);
							trailingdayinfo.next_beginDay++;
							trailingdayinfo.endWeek++;
						}

						this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);

						days[i]._changeUserStatus("trailingday", true);
					}
					else {
						dayInfo = this._getDayInfo("", false, false, "", "");
						this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);
					}
				}
			}
		}

		this._initChangedDays();

		var dataset = this._getInnerDataset();
		if (dataset) {
			this._setDatasetStyle(dataset);
		}

		if (this._isSelectedDay(day)) {
			this._on_apply_day(true);
		}
		else {
			this._on_apply_day(false);
		}

		this._setCalendarAccessibility();
	};

	_pDatePickerBodyControl._on_apply_day = function (flag) {
		var preDay = this._preday;
		var currDay = this._date.str_day;
		var predayObj = this._getDayItem(preDay);
		var dayObj = this._getDayItem(currDay);

		this._preday = currDay;

		if (predayObj) {
			predayObj._changeUserStatus("selected", false);
			if (predayObj._daysofweek == 6) {
				predayObj._changeUserStatus("saturday", true);
			}
			else if (predayObj._daysofweek == 0) {
				predayObj._changeUserStatus("sunday", true);
			}
			else {
				predayObj._changeUserStatus("day", true);
			}
		}

		if (dayObj) {
			if (flag) {
				dayObj._changeUserStatus("selected", true);
			}
			else {
				dayObj._changeUserStatus("selected", false);
				if (dayObj._daysofweek == 6) {
					dayObj._changeUserStatus("saturday", true);
				}
				else if (dayObj._daysofweek == 0) {
					dayObj._changeUserStatus("sunday", true);
				}
				else {
					dayObj._changeUserStatus("day", true);
				}
			}
		}

		var currtDate = new Date();
		var today = currtDate.getDate();

		if (this._isToday(today)) {
			today = nexacro._toString(today).padLeft(2, "0");
			var todayObj = this._getDayItem(today);

			if (flag) {
				if (todayObj != dayObj) {
					todayObj._changeUserStatus("today", true);
				}
			}
			else {
				todayObj._changeUserStatus("today", true);
			}
		}
	};

	_pDatePickerBodyControl._initChangedDays = function () {
		var len = this._changedDays.length;
		for (var i = (len - 1); i >= 0; i--) {
			this._changedDays[i].set_background(null);
			this._changedDays[i].set_color(null);
			this._changedDays[i].set_border(null);

			this._changedDays.pop();
		}
	};

	_pDatePickerBodyControl._setDate = function (year, month, day) {
		var date = this._date;
		if (date.str_year != (year = year.padLeft(4, "0"))) {
			date.str_year = year;
			date.int_year = +year;
		}
		if (date.str_month != (month = month.padLeft(2, "0"))) {
			date.str_month = month;
			date.int_month = +month;
		}
		if (date.str_day != (day = day.padLeft(2, "0"))) {
			this._preday = date.str_day;
			date.str_day = day;
			date.int_day = +day;
		}

		this._refreshDay();
	};

	_pDatePickerBodyControl._setDayItemInfo = function (day, text, visible, year, month, trailingday) {
		day.set_text(text);
		day.set_wordWrap("none");
		day.set_visible(visible);

		day._year = year;
		day._month = month;
		day._trailingday = trailingday;
	};

	_pDatePickerBodyControl._setWeekformatText = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var weekformat = this._getWeekformat();
			var weeks = this._weekitems;
			var weeks_len = weeks.length;

			for (var i = 0; i < weeks_len; i++) {
				weeks[i].set_text(weekformat[i]);
			}
		}
	};

	_pDatePickerBodyControl._setDatasetStyle = function (ds) {
		var day_item, date;
		var day_items = this._dayitems;
		var maxDay = this._maxDay;
		var cols = this._getInnerDatasetColumns();
		var background, border, color;

		var rowCount = ds.getRowCount();
		for (var i = 0; i < rowCount; i++) {
			date = ds.getColumn(i, cols.datecolumn);

			for (var j = 0; j < maxDay; j++) {
				day_item = day_items[j];
				var currDate = day_item._year + day_item._month + day_item.text.padLeft(2, "0");
				if (currDate == date) {
					background = ds.getColumn(i, cols.backgroundcolumn);
					border = ds.getColumn(i, cols.bordercolumn);
					color = ds.getColumn(i, cols.textcolorcolumn);

					if (background) {
						day_item.set_background(background);
					}
					if (border) {
						day_item.set_border(border);
					}
					if (color) {
						day_item.set_color(color);
					}
					this._changedDays[this._changedDays.length] = day_item;
				}
			}
		}
	};

	_pDatePickerBodyControl._getLeapYear = function (year) {
		if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
			return true;
		}

		return false;
	};

	_pDatePickerBodyControl._getCurrentDate = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getCurrentDate();
		}

		return;
	};

	_pDatePickerBodyControl._getWeekformat = function () {
		var datepicker = this.parent;
		if (datepicker) {
			var format = datepicker._getWeekformat();
			if (format) {
				if (format === " ") {
					return [" ", " ", " ", " ", " ", " ", " "];
				}
				else {
					return format.split(/\s+/);
				}
			}
			else {
				var locale = this._getLocale();
				var locale_info = nexacro.Locale.getLocaleInfo(locale);
				return locale_info.weekday_names_short;
			}
		}

		return null;
	};

	_pDatePickerBodyControl._getDaysize = function () {
		var width = 0;
		var height = 0;

		var datepicker = this.parent;
		if (datepicker) {
			var size = datepicker._getDaysize();
			if (!size) {
				size = (this._getClientWidth() / 7) + " " + (this._getClientHeight() / 7);
			}

			size = size.split(/\s+/);

			width = +size[0];
			height = size[1] ? +size[1] : width;
		}

		return {
			width : width, 
			height : height
		};
	};

	_pDatePickerBodyControl._getDayInfo = function (text, trailingday, visible, year, month) {
		year = nexacro._toString(year);
		year = year ? year.padLeft(4, "0") : "";

		month = nexacro._toString(month);
		month = month ? month.padLeft(2, "0") : "";

		var day = nexacro._toString(text);
		day = day ? day.padLeft(2, "0") : "";

		return {
			text : text, 
			trailingday : trailingday, 
			visible : visible, 
			year : year, 
			month : month, 
			day : day
		};
	};

	_pDatePickerBodyControl._getDayItem = function (day) {
		if (day == -1) {
			return null;
		}

		var days = this._dayitems;
		var maxDay = this._maxDay;
		for (var i = 0; i < maxDay; i++) {
			if (!days[i]._trailingday && day == days[i].text.padLeft(2, "0")) {
				return days[i];
			}
		}

		return null;
	};

	_pDatePickerBodyControl._getUsetrailingday = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getUsetrailingday();
		}

		return null;
	};

	_pDatePickerBodyControl._getUseTrailingDayInfo = function (year, month, dateObj, endDay) {
		var prev_year = year;
		var next_year = year;
		var prev_month = month;
		var next_month = month;

		if (month == 1) {
			prev_year -= 1;
			prev_month = 12;

			next_month += 1;
		}
		else {
			prev_month -= 1;
			if (month == 12) {
				next_year += 1;
				next_month = 1;
			}
			else {
				next_month += 1;
			}
		}

		var idx = dateObj.getDay() - 1;

		dateObj.setDate(endDay);
		var endWeek = dateObj.getDay();

		var N = nexacro.Calendar.EndDayNormal;
		var L = nexacro.Calendar.EndDayLeap;

		var is_pre_leapyear = this._getLeapYear(prev_year);
		var pre_endDay = is_pre_leapyear ? L[prev_month - 1] : N[prev_month - 1];
		var next_beginDay = 1;

		return {
			prev_year : prev_year, 
			next_year : next_year, 
			prev_month : prev_month, 
			next_month : next_month, 
			endWeek : endWeek, 
			idx : idx, 
			pre_endDay : pre_endDay, 
			next_beginDay : next_beginDay
		};
	};

	_pDatePickerBodyControl._getInnerDataset = function () {
		var datepicker = this.parent;
		if (datepicker) {
			return datepicker._getInnerDataset();
		}
		return null;
	};

	_pDatePickerBodyControl._getInnerDatasetColumns = function () {
		var datepicker = this.parent;
		if (datepicker) {
			var background = datepicker._getBackgroundcolumn();
			var border = datepicker._getBordercolumn();
			var date = datepicker._getDatecolumn();
			var textcolor = datepicker._getTextcolorcolumn();

			return {
				backgroundcolumn : background, 
				bordercolumn : border, 
				datecolumn : date, 
				textcolorcolumn : textcolor
			};
		}

		return null;
	};

	_pDatePickerBodyControl._isToday = function (v) {
		var year = this._date.int_year;
		var month = this._date.int_month;
		var day = parseInt(v, 10);
		var currDate = this._getCurrentDate();

		if (year == currDate.year && month == currDate.month && day == currDate.day) {
			return true;
		}

		return false;
	};

	_pDatePickerBodyControl._isSelectedDay = function (v) {
		v = parseInt(v, 10);
		var year = this._date.int_year;
		var month = this._date.int_month;
		if (year == this.parent._selected_year && month == this.parent._selected_month && v == this.parent._selected_day) {
			return true;
		}
		return false;
	};

	_pDatePickerBodyControl._setCalendarAccessibility = function () {
		if (nexacro._enableaccessibility) {
			var calendar = this.parent.parent;
			var date = this._date;
			var cal_value = date.str_year + date.str_month + date.str_day;
			var accessibility_value = calendar._masktypeobj.applyMask(cal_value);
			this.parent._setAccessibilityLabel(accessibility_value);
			this._setAccessibilityLabel(accessibility_value);
			nexacro._notifyAccessibilityValue(this._control_element, accessibility_value, "daychange");
		}
	};
	_pDatePickerBodyControl.on_get_accessibility_label = function () {
		var date = this._date;
		var cal_value = date.str_year + date.str_month + date.str_day;
		return cal_value;
	};

	delete _pDatePickerBodyControl;

	nexacro._DatePickerDayItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._flag_dataset = -1;
		this._dataset_background = "";
		this._refObj = parent.parent;
	};

	var _pDatePickerDayItemControl = nexacro._createPrototype(nexacro.Button, nexacro._DatePickerDayItemControl);
	nexacro._DatePickerDayItemControl.prototype = _pDatePickerDayItemControl;
	_pDatePickerDayItemControl._type_name = "DatePickerDayItemControl";
	_pDatePickerDayItemControl._is_subcontrol = true;
	_pDatePickerDayItemControl.accessibilityrole = "gridcell";

	_pDatePickerDayItemControl._trailingday = false;

	_pDatePickerDayItemControl._year = "";
	_pDatePickerDayItemControl._month = "";

	_pDatePickerDayItemControl._daysofweek = -1;

	_pDatePickerDayItemControl._use_readonly_status = true;

	_pDatePickerDayItemControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pDatePickerDayItemControl.on_apply_readonly = function () {
		var v = this.readonly;

		this._changeStatus("readonly", v);
	};

	_pDatePickerDayItemControl._setDaysOfWeek = function (daysofweek) {
		if (this._daysofweek != daysofweek) {
			this._daysofweek = daysofweek;
			this._on_apply_daysofweek(daysofweek);
		}
	};

	_pDatePickerDayItemControl._on_apply_daysofweek = function (v) {
		var text = v;
		if (text && text.length > 0) {
			if (this.trailingday) {
				this._changeUserStatus("trailingday", true);
			}
			else if (this.parent._isSelectedDay(text)) {
				this._changeUserStatus("selected", true);
			}
			else if (this.parent._isToday(text)) {
				this._changeUserStatus("today", true);
			}
			else if (this._daysofweek == 6) {
				this._changeUserStatus("saturday", true);
			}
			else if (this._daysofweek == 0) {
				this._changeUserStatus("sunday", true);
			}
		}
	};

	_pDatePickerDayItemControl.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		var calendar = this.parent.parent.parent;
		if (calendar && calendar._onlydisplay == true) {
			if (applystatus != "disabled") {
				return "enabled";
			}
		}
		else {
			return applystatus;
		}
	};

	_pDatePickerDayItemControl.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		if (value) {
			return changestatus;
		}
		else {
			return applyuserstatus;
		}
	};

	_pDatePickerDayItemControl.on_getIDCSSSelector = function () {
		return "dayitem";
	};

	_pDatePickerDayItemControl.on_keydown_basic_action = function () {
		if (nexacro._enableaccessibility) {
			nexacro.Button.prototype.on_apply_accessibility.call(this);
		}
	};

	delete _pDatePickerDayItemControl;

	nexacro._DatePickerWeekItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Static.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._refObj = parent.parent;
	};

	var _pDatePickerWeekItemControl = nexacro._createPrototype(nexacro.Static, nexacro._DatePickerWeekItemControl);
	nexacro._DatePickerWeekItemControl.prototype = _pDatePickerWeekItemControl;
	_pDatePickerWeekItemControl._type_name = "DatePickerWeekItemControl";
	_pDatePickerWeekItemControl._is_subcontrol = true;
	_pDatePickerWeekItemControl._daysofweek = -1;

	_pDatePickerWeekItemControl._use_readonly_status = true;

	_pDatePickerWeekItemControl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pDatePickerWeekItemControl.on_apply_readonly = function () {
		var v = this.readonly;

		this._changeStatus("readonly", v);
	};

	_pDatePickerWeekItemControl._setDaysOfWeek = function (daysofweek) {
		if (this._daysofweek != daysofweek) {
			this._daysofweek = daysofweek;
			this._on_apply_daysofweek(daysofweek);
		}
	};

	_pDatePickerWeekItemControl._on_apply_daysofweek = function (v) {
		if (v == 0) {
			this._changeUserStatus("sunday", true);
		}
		else if (v == 6) {
			this._changeUserStatus("saturday", true);
		}
	};

	_pDatePickerWeekItemControl.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		return changestatus;
	};

	_pDatePickerWeekItemControl.on_getIDCSSSelector = function () {
		return "weekitem";
	};

	delete _pDatePickerWeekItemControl;

	nexacro._YearSpinControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Spin.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pYearSpinControl = nexacro._createPrototype(nexacro.Spin, nexacro._YearSpinControl);
	nexacro._YearSpinControl.prototype = _pYearSpinControl;
	_pYearSpinControl._type_name = "Spin";
	_pYearSpinControl._default_mask = "9999";
	_pYearSpinControl._is_subcontrol = true;

	_pYearSpinControl.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var spinedit = this.spinedit = new nexacro._SpinEditControl("spinedit", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spinupbutton = this.spinupbutton = new nexacro._SpinButtonControl("spinupbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spindownbutton = this.spindownbutton = new nexacro._SpinButtonControl("spindownbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			spinedit.set_limitbymask("both");

			spinedit.createComponent(true);
			spinupbutton.createComponent(true);
			spindownbutton.createComponent(true);
		}
	};

	_pYearSpinControl = null;


	nexacro._MonthSpinControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Spin.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pMonthSpinControl = nexacro._createPrototype(nexacro.Spin, nexacro._MonthSpinControl);
	nexacro._MonthSpinControl.prototype = _pMonthSpinControl;
	_pMonthSpinControl._type_name = "Spin";
	_pMonthSpinControl._is_subcontrol = true;
	_pMonthSpinControl._default_mask = "99";

	_pMonthSpinControl.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var spinedit = this.spinedit = new nexacro._SpinEditControl("spinedit", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spinupbutton = this.spinupbutton = new nexacro._SpinButtonControl("spinupbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var spindownbutton = this.spindownbutton = new nexacro._SpinButtonControl("spindownbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			spinedit.set_limitbymask("both");

			spinedit.createComponent(true);
			spinupbutton.createComponent(true);
			spindownbutton.createComponent(true);
		}
	};

	_pMonthSpinControl = null;
}
